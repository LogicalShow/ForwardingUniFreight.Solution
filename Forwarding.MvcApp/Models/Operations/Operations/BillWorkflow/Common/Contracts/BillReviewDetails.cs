using System;
using System.Collections.Generic;
using System.Linq;

namespace BillWorkflow.Common.Contracts
{
    public class BillReviewDetails
    {
        public Guid DocumentReviewId { get; set; }
        public Guid BillReviewId { get; set; }
        public int BillIndex { get; set; }
        public int Version { get; set; }
        public BillReviewStatus ReviewStatus { get; set; }
        public BillOfLading Bill { get; set; }
        public List<ValidationIssue> Issues { get; set; }
        public IReadOnlyList<string> ReferenceRoles { get; internal set; }
        public string NextRole { get; internal set; }

        // Saved decisions for scanned bill fields; operation context is kept separately.
        public IReadOnlyList<ResolvedReference> ResolvedReferences
        {
            get
            {
                return (ReferenceResolutions ?? new List<ReferenceResolution>())
                    .Where(result => result != null && result.Reference != null && result.Reference.Id > 0)
                    .Select(result => new ResolvedReference(result.Reference.Role, result.Reference.Id.Value,
                        result.Reference.Name, result.ResolutionMethod, result.SearchValue, result.SourceParty)).ToList().AsReadOnly();
            }
        }

        internal BillContext Context { get; set; }
        internal List<ReferenceResolution> ReferenceResolutions { get; set; }
        internal bool RememberAlias { get; set; }
        internal int? CompletedBy { get; set; }
        internal DateTime? CompletedAt { get; set; }
    }

    public class ResolvedReference
    {
        public ResolvedReference(string role, int id, string name, ResolutionMethod? resolutionMethod,
            string searchValue, string sourceParty)
        {
            Role = role;
            Id = id;
            Name = name;
            ResolutionMethod = resolutionMethod;
            SearchValue = searchValue;
            SourceParty = sourceParty;
        }

        public string Role { get; private set; }
        public int Id { get; private set; }
        public string Name { get; private set; }
        public ResolutionMethod? ResolutionMethod { get; private set; }
        public string SearchValue { get; private set; }
        public string SourceParty { get; private set; }
    }
}
