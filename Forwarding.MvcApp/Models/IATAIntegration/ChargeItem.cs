using System;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public class ChargeItem
    {
        public decimal numberOfPieces { get; set; }
        public Weight grossWeight { get; set; }
        public string goodsDescription { get; set; }
    }
}
