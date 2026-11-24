using System;
using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class BillReviewState
    {
        public Guid DocumentReviewId { get; set; }
        public Guid BillReviewId { get; set; }
        public int BillIndex { get; set; }
        public int Version { get; set; }
        public BillReviewStatus ReviewStatus { get; set; }
        public long? CreatedOperationID { get; set; }
        public BillOfLading Bill { get; set; }
        public List<ValidationIssue> Issues { get; set; }
        public BillContext Context { get; set; }
        public List<ReferenceResolution> ReferenceResolutions { get; set; }
        public int? ReferencesConfirmedBy { get; set; }
        public DateTime? ReferencesConfirmedAt { get; set; }
        public int? CompletedBy { get; set; }
        public DateTime? CompletedAt { get; set; }
    }

    public class BillReviewStatePage
    {
        public BillReviewStatePage()
        {
            Items = new List<BillReviewState>();
        }

        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public List<BillReviewState> Items { get; set; }
        public bool ReviewStarted { get; set; }
        public BillContext Context { get; set; }
    }
}
