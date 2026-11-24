using System;

namespace BillWorkflow.Common.Contracts
{
    public class BillCompletionResult
    {
        public Guid BillReviewId { get; set; }
        public int Version { get; set; }
        public BillReviewStatus ReviewStatus { get; set; }
        public long CreatedOperationID { get; set; }
        public string OperationCode { get; set; }
    }
}
