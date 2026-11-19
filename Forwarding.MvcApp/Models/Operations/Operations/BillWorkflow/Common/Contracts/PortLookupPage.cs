using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class PortLookupPage
    {
        public PortLookupPage()
        {
            Ports = new List<PortRecord>();
        }

        public int Page { get; set; }
        public int PageSize { get; set; }
        public bool HasMore { get; set; }
        public List<PortRecord> Ports { get; set; }
    }
}
