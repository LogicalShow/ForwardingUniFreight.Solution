using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BillWorkflow.Common.Contracts
{
    // Lookup outcome only; 
    [JsonConverter(typeof(BillWorkflowEnumConverter))]
    public enum MatchStatus
    {
        AutoMatched = 1,
        SuggestionsFound = 2,
        NoMatch = 3
    }

    public class BillReferenceResolution
    {
        public Guid BillReviewId { get; set; }
        public int Version { get; set; }
        public string Role { get; set; }
        public string SourceParty { get; set; }
        // Saved bill value used for matching, before normalization.
        public string SearchValue { get; set; }
        public MatchStatus MatchStatus
        {
            get
            {
                if (Match != null) return MatchStatus.AutoMatched;
                if (Candidates != null && Candidates.Count > 0) return MatchStatus.SuggestionsFound;
                return MatchStatus.NoMatch;
            }
        }
        // How the reference ID was obtained: automatically or through user selection.
        public ResolutionMethod? ResolutionMethod { get; set; }
        public ReferenceOption Match { get; set; }
        public List<ReferenceOption> Candidates { get; set; }
        public string NextRole { get; set; }
    }

    public class ReferenceOption
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LocalName { get; set; }
    }
}
