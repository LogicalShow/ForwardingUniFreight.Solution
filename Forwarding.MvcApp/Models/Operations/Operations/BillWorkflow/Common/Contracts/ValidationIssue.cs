namespace BillWorkflow.Common.Contracts
{
    public class ValidationIssue
    {
        public string Code { get; set; }
        public string FieldPath { get; set; }
        public string Message { get; set; }
    }
}
