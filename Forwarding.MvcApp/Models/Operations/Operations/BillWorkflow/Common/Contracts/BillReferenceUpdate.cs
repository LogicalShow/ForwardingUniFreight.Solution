using System;

namespace BillWorkflow.Common.Contracts
{
    public class BillReferenceUpdate
    {
        public Guid BillReviewId { get; set; }
        public ReferenceResolution ReferenceResolution { get; set; }
    }
}
