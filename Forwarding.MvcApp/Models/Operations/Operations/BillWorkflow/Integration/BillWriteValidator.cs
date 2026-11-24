using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Globalization;
using System.Linq;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Extraction;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    // Solution-specific, read-only rules. ID eligibility is checked during preparation;
    // duplicate bills and master-container reuse must be checked in the write transaction.
    public class BillWriteValidator
    {
        private const decimal MaximumAmount = 9999999999.99999m;

        public List<ValidationIssue> Validate(BillWriteSources sources)
        {
            var issues = new List<ValidationIssue>();
            if (!HasRequiredSources(sources))
            {
                AddIssue(issues, BillWorkflowCodes.BillWriteSourcesRequired, "",
                    BillWorkflowMessages.BillWriteSourcesRequired);
                return issues;
            }

            ValidateMaster(sources, issues);
            ValidateParties(sources, issues);
            ValidatePort(sources.PortOfLoading, "PortOfLoading", issues);
            ValidatePort(sources.PortOfDischarge, "PortOfDischarge", issues);
            ValidateBill(sources.Review.Bill, issues);
            ValidateContainers(sources, issues);
            return issues;
        }

        private static bool HasRequiredSources(BillWriteSources sources)
        {
            return sources != null && sources.Review != null && sources.Review.Bill != null &&
                sources.Review.Context != null && sources.Master != null &&
                sources.PortOfLoading != null && sources.PortOfDischarge != null &&
                sources.Review.Bill.Containers != null && sources.ContainerTypeIds != null;
        }

        private static void ValidateMaster(BillWriteSources sources, List<ValidationIssue> issues)
        {
            var review = sources.Review;
            var master = sources.Master;
            if (review.DocumentReviewId == Guid.Empty || review.BillReviewId == Guid.Empty || review.Version <= 0)
                AddIssue(issues, BillWorkflowCodes.BillWriteSourcesRequired, "BillReviewId",
                    BillWorkflowMessages.BillWriteSourcesRequired);

            long masterId;
            if (master.MasterOperationID <= 0 || string.IsNullOrWhiteSpace(master.Version) ||
                !long.TryParse(review.Context.ParentReference, NumberStyles.None, CultureInfo.InvariantCulture, out masterId) ||
                masterId != master.MasterOperationID || master.Version != review.Context.Version ||
                review.Context.Direction != (master.DirectionType == 1 ? "Import" : "Export"))
                AddIssue(issues, BillWorkflowCodes.MasterContextChanged, "Master",
                    BillWorkflowMessages.MasterContextChanged);
            if (master.DirectionType != 1 && master.DirectionType != 2)
                AddIssue(issues, BillWorkflowCodes.UnsupportedDirection, "Master.DirectionType",
                    BillWorkflowMessages.UnsupportedDirection);
            if (master.TransportType != 1)
                AddIssue(issues, BillWorkflowCodes.BillWriteTransportNotSupported, "Master.TransportType",
                    BillWorkflowMessages.BillWriteTransportNotSupported);
            if (!master.ShipmentType.HasValue || master.ShipmentType.Value <= 0)
                AddIssue(issues, BillWorkflowCodes.BillWriteShipmentTypeRequired, "Master.ShipmentType",
                    BillWorkflowMessages.BillWriteShipmentTypeRequired);
        }

        private static void ValidateParties(BillWriteSources sources, List<ValidationIssue> issues)
        {
            if (sources.ShipperID <= 0)
                AddIssue(issues, BillWorkflowCodes.RequiredReferencesNotConfirmed, "ShipperID",
                    string.Format(CultureInfo.InvariantCulture, BillWorkflowMessages.RequiredReferencesNotConfirmed, "Shipper"));
            if (sources.ConsigneeID <= 0)
                AddIssue(issues, BillWorkflowCodes.RequiredReferencesNotConfirmed, "ConsigneeID",
                    string.Format(CultureInfo.InvariantCulture, BillWorkflowMessages.RequiredReferencesNotConfirmed, "Consignee"));
        }

        private static void ValidatePort(PortRecord port, string field, List<ValidationIssue> issues)
        {
            if (port.Id <= 0)
                AddIssue(issues, BillWorkflowCodes.PortNotAvailable, field, BillWorkflowMessages.PortNotAvailable);
            if (!port.CountryID.HasValue || port.CountryID.Value <= 0)
                AddIssue(issues, BillWorkflowCodes.BillWritePortCountryRequired, field + ".CountryID",
                    BillWorkflowMessages.BillWritePortCountryRequired);
        }

        private static void ValidateBill(BillOfLading bill, List<ValidationIssue> issues)
        {
            ValidateText(bill.BillOfLadingNumber, "BillOfLadingNumber", 50, true, issues);
            ValidateText(bill.BookingNumber, "BookingNumber", 200, false, issues);
            ValidateAmount(bill.TotalGrossWeightKg, "TotalGrossWeightKg", issues);
            if (bill.DateOfIssue.HasValue &&
                (bill.DateOfIssue.Value < SqlDateTime.MinValue.Value || bill.DateOfIssue.Value > SqlDateTime.MaxValue.Value))
                AddIssue(issues, BillWorkflowCodes.BillWriteDateOutOfRange, "DateOfIssue",
                    BillWorkflowMessages.BillWriteDateOutOfRange);
        }

        private static void ValidateContainers(BillWriteSources sources, List<ValidationIssue> issues)
        {
            var containers = sources.Review.Bill.Containers;
            if (containers.Count > BillOfLadingJsonAdapter.MaxContainersPerBill)
            {
                AddIssue(issues, BillWorkflowCodes.InvalidContainers, "Containers", BillWorkflowMessages.InvalidContainers);
                return;
            }

            var numbers = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            for (int index = 0; index < containers.Count; index++)
                ValidateContainer(containers[index], index, sources.ContainerTypeIds, numbers, issues);

            if (sources.ContainerTypeIds.Keys.Any(index => index < 0 || index >= containers.Count))
                AddIssue(issues, BillWorkflowCodes.ContainerTypeAssignmentsInvalid, "ContainerTypeIds",
                    BillWorkflowMessages.ContainerTypeAssignmentsInvalid);
            if (containers.Count > 0 && containers.All(container => container != null))
                ValidateTotals(sources.Review.Bill, issues);
        }

        private static void ValidateContainer(Container container, int index, IReadOnlyDictionary<int, int> types,
            HashSet<string> numbers, List<ValidationIssue> issues)
        {
            var field = "Containers[" + index.ToString(CultureInfo.InvariantCulture) + "]";
            if (container == null)
            {
                AddIssue(issues, BillWorkflowCodes.InvalidContainers, field, BillWorkflowMessages.InvalidContainers);
                return;
            }

            ValidateText(container.ContainerNo, field + ".ContainerNo", 50, true, issues);
            ValidateText(container.SealNo, field + ".SealNo", 15, false, issues);
            if (!string.IsNullOrWhiteSpace(container.ContainerNo) && !numbers.Add(container.ContainerNo.Trim()))
                AddIssue(issues, BillWorkflowCodes.DuplicateBillContainer, field + ".ContainerNo",
                    BillWorkflowMessages.DuplicateBillContainer);
            int typeId;
            if (!types.TryGetValue(index, out typeId) || typeId <= 0)
                AddIssue(issues, BillWorkflowCodes.ContainerTypeNotAvailable, field + ".Type",
                    BillWorkflowMessages.ContainerTypeNotAvailable);
            if (container.Packages.HasValue && container.Packages.Value < 0)
                AddIssue(issues, BillWorkflowCodes.BillWritePackagesOutOfRange, field + ".Packages",
                    BillWorkflowMessages.BillWritePackagesOutOfRange);
            ValidateAmount(container.GrossWeightKg, field + ".GrossWeightKg", issues);
            ValidateAmount(container.MeasurementCbm, field + ".MeasurementCbm", issues);
        }

        private static void ValidateTotals(BillOfLading bill, List<ValidationIssue> issues)
        {
            var containers = bill.Containers;
            // Only derive a total when every contributing value is known and individually valid.
            if (!bill.TotalGrossWeightKg.HasValue && containers.All(c => IsValidAmount(c.GrossWeightKg) && c.GrossWeightKg.HasValue))
                ValidateAmount(containers.Sum(c => c.GrossWeightKg.Value), "GrossWeight", issues);
            if (containers.All(c => IsValidAmount(c.MeasurementCbm) && c.MeasurementCbm.HasValue))
                ValidateAmount(containers.Sum(c => c.MeasurementCbm.Value), "Volume", issues);
            if (containers.All(c => c.Packages.HasValue && c.Packages.Value >= 0) &&
                containers.Sum(c => (long)c.Packages.Value) > int.MaxValue)
                AddIssue(issues, BillWorkflowCodes.BillWritePackagesOutOfRange, "NumberOfPackages",
                    BillWorkflowMessages.BillWritePackagesOutOfRange);
        }

        private static void ValidateText(string value, string field, int maximumLength, bool required,
            List<ValidationIssue> issues)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                if (required)
                    AddIssue(issues, BillWorkflowCodes.BillWriteFieldRequired, field,
                        BillWorkflowMessages.BillWriteFieldRequired);
                return;
            }
            if (value.Trim().Length > maximumLength)
                AddIssue(issues, BillWorkflowCodes.BillWriteTextTooLong, field,
                    string.Format(CultureInfo.InvariantCulture, BillWorkflowMessages.BillWriteTextTooLong, maximumLength));
        }

        private static void ValidateAmount(decimal? value, string field, List<ValidationIssue> issues)
        {
            if (!IsValidAmount(value))
                AddIssue(issues, BillWorkflowCodes.BillWriteAmountOutOfRange, field,
                    BillWorkflowMessages.BillWriteAmountOutOfRange);
        }

        private static bool IsValidAmount(decimal? value)
        {
            return !value.HasValue || (value.Value >= 0 && value.Value <= MaximumAmount &&
                decimal.Round(value.Value, 5) == value.Value);
        }

        private static void AddIssue(List<ValidationIssue> issues, string code, string field, string message)
        {
            issues.Add(new ValidationIssue { Code = code, FieldPath = field, Message = message });
        }
    }
}
