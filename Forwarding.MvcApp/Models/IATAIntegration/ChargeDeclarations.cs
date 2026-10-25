using System;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public class ChargeDeclarations
    {
        public string isoCurrencyCode { get; set; }
        public string chargeCode { get; set; }
        public decimal declaredValueForCarriage { get; set; }
        public decimal declaredValueForCustoms { get; set; }
        public decimal declaredValueForInsurance { get; set; }
    }
}
