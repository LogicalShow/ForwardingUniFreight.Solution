namespace BillWorkflow.Common.Contracts
{
    public class BillReferenceSelection
    {
        public BillReferenceSelection()
        {
            ResolutionMethod = ResolutionMethod.ManualSelection;
        }

        public string LookupKey { get; set; }
        public int Id { get; set; }
        public ResolutionMethod ResolutionMethod { get; set; }
    }

    public class BillReferenceSummary
    {
        public BillReferenceSummary(string lookupKey, string role, int? id, string name)
        {
            LookupKey = lookupKey;
            Role = role;
            Id = id;
            Name = name;
        }

        public string LookupKey { get; private set; }
        public string Role { get; private set; }
        public int? Id { get; private set; }
        public string Name { get; private set; }
    }
}
