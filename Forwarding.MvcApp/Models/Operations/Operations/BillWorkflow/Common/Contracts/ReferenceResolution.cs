using System;
using Newtonsoft.Json;

namespace BillWorkflow.Common.Contracts
{
    [JsonConverter(typeof(BillWorkflowEnumConverter))]
    public enum ResolutionMethod
    {
        AutomaticExactMatch = 1,
        AutomaticAliasMatch = 2,
        SuggestedSelection = 3,
        ManualSelection = 4
    }

    public class ReferenceResolution
    {
        public BillReferenceSummary Reference { get; set; }
        public string ResolverKey { get; set; }
        public string SourceParty { get; set; }
        public string SourceField { get; set; }
        public string SearchValue { get; set; }
        public ResolutionMethod? ResolutionMethod { get; set; }
        public int? ConfirmedBy { get; set; }
        public DateTime? ConfirmedAt { get; set; }
    }
}
