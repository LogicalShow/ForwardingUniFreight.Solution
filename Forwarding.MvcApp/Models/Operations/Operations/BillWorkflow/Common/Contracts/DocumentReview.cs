using System;
using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    // One source document/extraction result, with shared context and one review per bill.
    public class DocumentReview
    {
        public Guid DocumentReviewId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string SourceProfile { get; set; }
        public BillContext Context { get; set; }
        public List<BillReview> BillReviews { get; set; }
    }
}
