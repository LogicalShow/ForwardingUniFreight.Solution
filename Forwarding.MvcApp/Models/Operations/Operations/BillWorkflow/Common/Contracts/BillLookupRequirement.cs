namespace BillWorkflow.Common.Contracts
{
    public class BillLookupRequirement
    {
        public string Role { get; set; }
        public string ResolverKey { get; set; }
        public string SourceParty { get; set; }
        public string SourceField { get; set; }
        public string SearchValue { get; set; }
        public bool IsRequired { get; set; }
    }
}
