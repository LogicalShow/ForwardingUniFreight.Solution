using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public class ConsolidationListMessage : Message
    {
        public string airWaybillNumber { get; set; }
        public OriginAndDestination originAndDestination { get; set; }
        public Quantity quantity { get; set; }
        public List<HouseWaybillSummary> houseWaybillSummaries { get; set; }
        public AccountContact shipper { get; set; }
        public AccountContact consignee { get; set; }
    }
}
