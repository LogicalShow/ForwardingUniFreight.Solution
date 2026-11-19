using System;
using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class BillReviewProgress
    {
        public Guid BillReviewId { get; set; }
        public int Version { get; set; }
        public BillReviewStatus ReviewStatus { get; set; }
        public IReadOnlyList<string> ReferenceRoles { get; set; }
        public IReadOnlyList<ResolvedReference> ResolvedReferences { get; set; }
        public string NextRole { get; set; }
    }
}
