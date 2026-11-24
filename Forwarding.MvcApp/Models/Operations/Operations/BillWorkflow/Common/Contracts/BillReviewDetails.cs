using System;
using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class BillReviewDetails
    {
        public Guid DocumentReviewId { get; set; }
        public Guid BillReviewId { get; set; }
        public int BillIndex { get; set; }
        public int Version { get; set; }
        public BillReviewStatus ReviewStatus { get; set; }
        public long? CreatedOperationID { get; set; }
        public BillOfLading Bill { get; set; }
        public List<ValidationIssue> Issues { get; set; }
        public IReadOnlyList<BillReferenceLookup> ReferenceLookups { get; internal set; }
        public string NextLookupKey { get; internal set; }
        public IReadOnlyList<ResolvedReference> ResolvedReferences { get; internal set; }
    }

    public class ResolvedReference
    {
        public ResolvedReference(string lookupKey, string role, int id, string name, ResolutionMethod? resolutionMethod,
            string searchValue, string sourceParty)
        {
            LookupKey = lookupKey;
            Role = role;
            Id = id;
            Name = name;
            ResolutionMethod = resolutionMethod;
            SearchValue = searchValue;
            SourceParty = sourceParty;
        }

        public string LookupKey { get; private set; }
        public string Role { get; private set; }
        public int Id { get; private set; }
        public string Name { get; private set; }
        public ResolutionMethod? ResolutionMethod { get; private set; }
        public string SearchValue { get; private set; }
        public string SourceParty { get; private set; }
    }
}
