using System.Collections.Generic;
using System.Linq;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class BillWriteSetBuilder
    {
        public BillWriteSet Build(BillWriteSources sources)
        {
            RequireValidSources(sources);
            return new BillWriteSet
            {
                DocumentReviewId = sources.Review.DocumentReviewId,
                BillReviewId = sources.Review.BillReviewId,
                ExpectedReviewVersion = sources.Review.Version,
                MasterContextVersion = sources.Master.Version,
                VoyageNumber = TrimOptional(sources.Review.Bill.VoyageNumber),
                Operation = CreateOperation(sources),
                Partners = CreatePartners(sources),
                Containers = CreateContainers(sources)
            };
        }

        private static void RequireValidSources(BillWriteSources sources)
        {
            var issues = new BillWriteValidator().Validate(sources);
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillWriteValidationFailed, BillWorkflowMessages.BillWriteValidationFailed, issues);
        }

        private static BillOperationWrite CreateOperation(BillWriteSources sources)
        {
            var master = sources.Master;
            var bill = sources.Review.Bill;
            return new BillOperationWrite
            {
                MasterOperationID = master.MasterOperationID,
                BLType = 2, // House.
                DirectionType = master.DirectionType, TransportType = master.TransportType,
                ShipmentType = master.ShipmentType.Value == 5 ? 2 : master.ShipmentType.Value,
                BranchID = master.BranchID, SalesmanID = master.SalesmanID,
                OperationManID = master.OperationManID, CurrencyID = master.CurrencyID,
                AgentID = master.AgentID, ShippingLineID = master.ShippingLineID,
                VesselID = master.VesselID, OperationStageID = master.OperationStageID,
                DirectionIconName = master.DirectionIconName, DirectionIconStyle = master.DirectionIconStyle,
                TransportIconName = master.TransportIconName, TransportIconStyle = master.TransportIconStyle,
                ShipperID = sources.ShipperID, ConsigneeID = sources.ConsigneeID,
                POL = sources.PortOfLoading.Id, POLCountryID = sources.PortOfLoading.CountryID.Value,
                POD = sources.PortOfDischarge.Id, PODCountryID = sources.PortOfDischarge.CountryID.Value,
                HouseNumber = bill.BillOfLadingNumber.Trim(), BookingNumber = TrimOptional(bill.BookingNumber),
                IssuingDate = bill.DateOfIssue,
                GrossWeight = GetGrossWeight(bill), Volume = GetVolume(bill.Containers),
                NumberOfPackages = GetPackageCount(bill.Containers)
            };
        }

        private static List<BillPartnerWrite> CreatePartners(BillWriteSources sources)
        {
            return new List<BillPartnerWrite>
            {
                new BillPartnerWrite
                {
                    OperationPartnerTypeID = 1, CustomerID = sources.ShipperID,
                    IsOperationClient = sources.Master.DirectionType == 2
                },
                new BillPartnerWrite
                {
                    OperationPartnerTypeID = 2, CustomerID = sources.ConsigneeID,
                    IsOperationClient = sources.Master.DirectionType == 1
                }
            };
        }

        private static List<BillContainerWrite> CreateContainers(BillWriteSources sources)
        {
            var result = new List<BillContainerWrite>();
            var containers = sources.Review.Bill.Containers;
            for (int index = 0; index < containers.Count; index++)
            {
                var container = containers[index];
                result.Add(new BillContainerWrite
                {
                    ContainerIndex = index, ContainerTypeID = sources.ContainerTypeIds[index],
                    ContainerNumber = container.ContainerNo.Trim(), CarrierSeal = TrimOptional(container.SealNo),
                    Quantity = 1, NumberOfPackagesOnContainer = container.Packages,
                    GrossWeight = container.GrossWeightKg, Volume = container.MeasurementCbm
                });
            }
            return result;
        }

        private static decimal? GetGrossWeight(BillOfLading bill)
        {
            // Prefer the declared bill total. Never treat an incomplete container total as complete.
            if (bill.TotalGrossWeightKg.HasValue) return bill.TotalGrossWeightKg;
            if (bill.Containers.Count == 0 || bill.Containers.Any(c => !c.GrossWeightKg.HasValue)) return null;
            return bill.Containers.Sum(c => c.GrossWeightKg.Value);
        }

        private static decimal? GetVolume(List<Container> containers)
        {
            if (containers.Count == 0 || containers.Any(c => !c.MeasurementCbm.HasValue)) return null;
            return containers.Sum(c => c.MeasurementCbm.Value);
        }

        private static int? GetPackageCount(List<Container> containers)
        {
            if (containers.Count == 0 || containers.Any(c => !c.Packages.HasValue)) return null;
            return containers.Sum(c => c.Packages.Value);
        }

        private static string TrimOptional(string value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }
    }
}
