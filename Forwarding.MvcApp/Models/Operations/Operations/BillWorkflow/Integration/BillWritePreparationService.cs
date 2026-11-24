using System;
using System.Linq;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Services;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class BillWritePreparationService
    {
        private readonly int userId;
        private readonly DocumentReviewService reviews;
        private readonly BillContextProvider contexts;
        private readonly IPortDirectory ports;
        private readonly TemporaryContainerTypeProvider containerTypes;

        public BillWritePreparationService(int userId, DocumentReviewService reviews, BillContextProvider contexts,
            IPortDirectory ports, TemporaryContainerTypeProvider containerTypes)
        {
            if (reviews == null || contexts == null || ports == null || containerTypes == null)
                throw new ArgumentNullException(BillWorkflowMessages.ServiceDependenciesRequired);
            this.userId = userId;
            this.reviews = reviews;
            this.contexts = contexts;
            this.ports = ports;
            this.containerTypes = containerTypes;
        }

        public BillWriteSet Prepare(Guid billReviewId, int expectedVersion)
        {
            var sources = LoadSources(billReviewId, expectedVersion);
            return new BillWriteSetBuilder().Build(sources);
        }

        private BillWriteSources LoadSources(Guid billReviewId, int expectedVersion)
        {
            // Preserves the existing review, access, source, reference and version checkpoints.
            var review = reviews.GetConfirmedBill(billReviewId, expectedVersion);
            var master = contexts.LoadMasterOperationContext(review.Context, userId);
            if (master.TransportType != 1)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.BillWriteTransportNotSupported, BillWorkflowMessages.BillWriteTransportNotSupported);

            var shipperId = GetAcceptedId(review, "Shipper");
            var consigneeId = GetAcceptedId(review, "Consignee");
            var loadingPort = RequirePort(review, "PortOfLoading");
            var dischargePort = RequirePort(review, "PortOfDischarge");
            var typeIds = containerTypes.GetContainerTypeIds(review.Bill.Containers);
            return new BillWriteSources
            {
                Review = review, Master = master, ShipperID = shipperId, ConsigneeID = consigneeId,
                PortOfLoading = loadingPort, PortOfDischarge = dischargePort, ContainerTypeIds = typeIds
            };
        }

        private PortRecord RequirePort(ConfirmedBill review, string role)
        {
            var selected = ports.GetById(GetAcceptedId(review, role), review.Context, userId);
            if (selected == null)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.PortNotAvailable, BillWorkflowMessages.PortNotAvailable);
            return selected;
        }

        private static int GetAcceptedId(ConfirmedBill review, string role)
        {
            var saved = review.ReferenceResolutions.SingleOrDefault(result => result.Reference.Role == role);
            if (saved == null || !saved.Reference.Id.HasValue || saved.Reference.Id.Value <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.RequiredReferencesNotConfirmed,
                    string.Format(BillWorkflowMessages.RequiredReferencesNotConfirmed, role));
            return saved.Reference.Id.Value;
        }
    }
}
