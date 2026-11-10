using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BillWorkflow.Common.Contracts
{
    // Overall review progress for one bill.
    [JsonConverter(typeof(BillWorkflowEnumConverter))]
    public enum BillReviewStatus
    {
        InReview = 1,
        ReferencesConfirmed = 2
    }

    // Adapted source data used when inserting one bill into a document review.
    public class BillReview
    {
        public BillReview()
        {
            ReferenceResolutions = new List<ReferenceResolution>();
            Issues = new List<ValidationIssue>();
            ReviewStatus = BillReviewStatus.InReview;
        }

        public Guid BillReviewId { get; set; }
        public int SourceIndex { get; set; }
        public int Version { get; set; }
        public BillReviewStatus ReviewStatus { get; set; }
        public string OriginalJson { get; set; }
        public BillOfLading Bill { get; set; }
        public List<ReferenceResolution> ReferenceResolutions { get; set; }
        public List<ValidationIssue> Issues { get; set; }
    }

    public class ConfirmedBill
    {
        public Guid DocumentReviewId { get; set; }
        public Guid BillReviewId { get; set; }
        public int Version { get; set; }
        public string SourceProfile { get; set; }
        public BillContext Context { get; set; }
        public BillOfLading Bill { get; set; }
        public List<ReferenceResolution> ReferenceResolutions { get; set; }
        public int CompletedBy { get; set; }
        public DateTime CompletedAt { get; set; }
    }
}
