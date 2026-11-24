using System;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Services;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class BillWriteService
    {
        private readonly int userId;
        private readonly DocumentReviewService reviews;
        private readonly BillWritePreparationService preparation;
        private readonly BillWriteStore store;

        public BillWriteService(int userId, DocumentReviewService reviews,
            BillWritePreparationService preparation, BillWriteStore store)
        {
            if (reviews == null || preparation == null || store == null)
                throw new ArgumentNullException(BillWorkflowMessages.ServiceDependenciesRequired);
            this.userId = userId;
            this.reviews = reviews;
            this.preparation = preparation;
            this.store = store;
        }

        public BillCompletionResult CompleteBill(Guid billReviewId, int expectedVersion)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidBillCompletionRequest, BillWorkflowMessages.InvalidBillCompletionRequest);

            // Authorize reads/retries through the same operation visibility rules as review.
            var review = reviews.GetBillReview(billReviewId);
            if (review.ReviewStatus == BillReviewStatus.Completed)
                return store.GetCompletionResult(billReviewId);

            var writeSet = preparation.Prepare(billReviewId, expectedVersion);
            return store.Insert(writeSet, userId);
        }
    }
}
