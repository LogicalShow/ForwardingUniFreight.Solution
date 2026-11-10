using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class CustomerRecord
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LocalName { get; set; }
        internal string MatchedAlias { get; set; }
    }

    public class CustomerSearchResult
    {
        public CustomerSearchResult()
        {
            Customers = new List<CustomerRecord>();
        }

        public List<CustomerRecord> Customers { get; set; }
        public bool IsLimited { get; set; }
    }
}
