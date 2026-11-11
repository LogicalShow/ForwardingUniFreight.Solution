using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BillWorkflow.Common.Contracts
{
    // Overall review progress for one bill.
    [JsonConverter(typeof(BillWorkflowEnumConverter))]
    public enum BillReviewStatus
    {
        NotStarted = 0,
        InReview = 1,
        ReferencesConfirmed = 2
    }

    public class StoredBillReadResult
    {
        public StoredBillReadResult() { Issues = new List<ValidationIssue>(); }
        public BillOfLading Bill { get; set; }
        public List<ValidationIssue> Issues { get; set; }
    }

    public class StoredExtraction
    {
        public Guid ID { get; set; }
        public string ExtractionStatus { get; set; }
        public string BillsStatus { get; set; }
        public string ResultType { get; set; }
        public string EntityName { get; set; }
        public long? EntityID { get; set; }
    }

    public class ConfirmedBill
    {
        public Guid DocumentReviewId { get; set; }
        public Guid BillReviewId { get; set; }
        public int Version { get; set; }
        public BillContext Context { get; set; }
        public BillOfLading Bill { get; set; }
        public List<ReferenceResolution> ReferenceResolutions { get; set; }
        public int CompletedBy { get; set; }
        public DateTime CompletedAt { get; set; }
    }
}
