using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class PortRecord
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string LocalName { get; set; }
        public int? CountryID { get; set; }
        internal string MatchedAlias { get; set; }
    }

    public class PortSearchResult
    {
        public PortSearchResult()
        {
            Ports = new List<PortRecord>();
        }

        public List<PortRecord> Ports { get; set; }
        public bool IsLimited { get; set; }
    }
}
