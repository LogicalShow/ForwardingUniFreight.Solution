using System;
using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class BillOfLading
    {
        public string BillOfLadingNumber { get; set; }
        public string BookingNumber { get; set; }
        public string ShipperName { get; set; }
        public string ShipperAddress { get; set; }
        public string ConsigneeName { get; set; }
        public string ConsigneeAddress { get; set; }
        public string NotifyParty { get; set; }
        public string VesselName { get; set; }
        public string VoyageNumber { get; set; }
        public string PortOfLoading { get; set; }
        public string PortOfDischarge { get; set; }
        public decimal? TotalGrossWeightKg { get; set; }
        public DateTime? DateOfIssue { get; set; }
        public string HSCode { get; set; }
        public string FreightTerms { get; set; }
        public List<Container> Containers { get; set; }
    }

    public class Container
    {
        public string ContainerNo { get; set; }
        public string SealNo { get; set; }
        public string Type { get; set; }
        public int? Packages { get; set; }
        public decimal? GrossWeightKg { get; set; }
        public decimal? MeasurementCbm { get; set; }
    }
}
