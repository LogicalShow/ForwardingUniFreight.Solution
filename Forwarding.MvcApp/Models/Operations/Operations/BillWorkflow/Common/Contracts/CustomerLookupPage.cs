using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class CustomerLookupPage
    {
        public CustomerLookupPage()
        {
            Customers = new List<CustomerRecord>();
        }

        public int Page { get; set; }
        public int PageSize { get; set; }
        public bool HasMore { get; set; }
        public List<CustomerRecord> Customers { get; set; }
    }
}
