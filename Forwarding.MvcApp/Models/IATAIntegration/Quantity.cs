using System;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public class Quantity
    {
        public string ShipmentDescriptionCode { get; set; }
        public long numberOfPieces { get; set; }
        public Weight weight { get; set; }
    }
}
