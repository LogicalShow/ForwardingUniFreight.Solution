namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public class HouseWaybillSummary
    {
        public string serialNumber { get; set; }
        public string origin { get; set; }
        public string destination { get; set; }
        public int numberOfPieces { get; set; }
        public Weight weight { get; set; }
        public string natureOfGoods { get; set; }
        public string freeTextDescriptionOfGoods { get; set; }
    }
}
