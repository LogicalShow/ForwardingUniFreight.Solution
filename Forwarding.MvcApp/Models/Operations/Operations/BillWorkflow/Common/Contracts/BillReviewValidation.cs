using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class BillReviewValidation
    {
        public List<ReferenceResolution> ValidReferences { get; set; }
        public List<ValidationIssue> Issues { get; set; }
    }
}
