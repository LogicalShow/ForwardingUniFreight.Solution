using System;
using System.Collections.Generic;
using System.Linq;

namespace BillWorkflow.Common.Contracts
{
    public class BillReviewDetails
    {
        public Guid DocumentReviewId { get; set; }
        public Guid BillReviewId { get; set; }
        public int Version { get; set; }
        public BillReviewStatus ReviewStatus { get; set; }
        public BillOfLading Bill { get; set; }
        public List<ValidationIssue> Issues { get; set; }

        // This summary is derived from the internal results, not stored separately.
        public IReadOnlyList<ResolvedReference> ResolvedReferences
        {
            get
            {
                if (ReferenceResolutions == null)
                    return new List<ResolvedReference>().AsReadOnly();

                return ReferenceResolutions.Where(result => result.Reference != null &&
                    result.Reference.Id > 0)
                    .Select(result => new ResolvedReference(result.Reference.Role, result.Reference.Id.Value,
                        result.Reference.Name, result.ResolutionMethod)).ToList().AsReadOnly();
            }
        }

        internal string SourceProfile { get; set; }
        internal BillContext Context { get; set; }
        internal List<ReferenceResolution> ReferenceResolutions { get; set; }
        internal bool RememberAlias { get; set; }
        internal int? CompletedBy { get; set; }
        internal DateTime? CompletedAt { get; set; }
    }

    // Public saved-reference summary; persistence keeps its reference and method separately.
    public class ResolvedReference
    {
        public ResolvedReference(string role, int id, string name, ResolutionMethod? resolutionMethod)
        {
            Role = role;
            Id = id;
            Name = name;
            ResolutionMethod = resolutionMethod;
        }

        public string Role { get; private set; }
        public int Id { get; private set; }
        public string Name { get; private set; }
        public ResolutionMethod? ResolutionMethod { get; private set; }
    }
}
