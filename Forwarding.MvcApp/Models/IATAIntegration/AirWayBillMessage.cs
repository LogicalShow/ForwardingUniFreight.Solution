using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public class AirWayBillMessage : Message
    {
        public string airWaybillNumber { get; set; }
        public string origin { get; set; }
        public string destination { get; set; }
        public int totalConsignmentNumberOfPieces { get; set; }
        public Weight weight { get; set; }
        public Volume volume { get; set; }
        public List<Routing> route { get; set; }
        public AccountContact shipper { get; set; }
        public AccountContact consignee { get; set; }
        public CarriersExecution carriersExecution { get; set; }
        public ReferenceInfo senderReference { get; set; }
        public ChargeDeclarations chargeDeclarations { get; set; }
        public List<ChargeItem> chargeItems { get; set; }
    }
}
