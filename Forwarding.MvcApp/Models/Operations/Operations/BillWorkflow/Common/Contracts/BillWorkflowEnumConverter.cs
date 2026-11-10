using Newtonsoft.Json.Converters;

namespace BillWorkflow.Common.Contracts
{
    public class BillWorkflowEnumConverter : StringEnumConverter
    {
        public BillWorkflowEnumConverter()
        {
            AllowIntegerValues = false;
        }
    }
}
