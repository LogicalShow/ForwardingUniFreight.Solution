namespace BillWorkflow.Common.Contracts
{
    public class BillContext
    {
        public string ParentReference { get; set; }
        public string Direction { get; set; }
        public string Version { get; set; }
    }
}
