using System;

namespace BillWorkflow.Common.Contracts
{
    public class BillReferenceConfirmation
    {
        public Guid BillReviewId { get; set; }
        public bool RememberAlias { get; set; }
    }
}
