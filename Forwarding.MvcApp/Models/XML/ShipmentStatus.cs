using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.XML
{
    public class ShipmentStatus
    {
        public XMLEnvelope Envelope { get; set; }
        public ShipmentStatusDetails ShipmentStatusDetails { get; set; }
    }
    public class ShipmentStatusDetails
    {
        public string ApplicationType { get; set; }
        public string TypeOfMove { get; set; }
        public string ShipperReference { get; set; }
        public string ForwarderReference { get; set; }
        public string ConsigneeReference { get; set; }
        public string CommunicationReference { get; set; }
        public string PickupReference { get; set; }
        public string BookingNumber { get; set; }
        public string WWAShipmentReference { get; set; }
        public string LotNumber { get; set; }
        public string HouseBillOfLadingNumber { get; set; }
        public string CarrierBookingNumber { get; set; }
        public string CarrierBillofladingNumber { get; set; }
        public string FileNumber { get; set; }
        public string ReleaseType { get; set; }
        public string ArrivalNoticeNumber { get; set; }
        public string ContainerNumber { get; set; }
        public string ContainerSize { get; set; }
        public string ContainerType { get; set; }
        public string ContainerCode { get; set; }
        public string SealNumber { get; set; }
        public string OceanVessel { get; set; }
        public string Voyage { get; set; }
        public string IMONumber { get; set; }
        public string CustomerAlias { get; set; }
        public string StatusCode { get; set; }
        public string StatusLocationCode { get; set; }
        public string StatusLocationName { get; set; }
        public RoutingDetailsForShipmentStatus RoutingDetails { get; set; }
        public StatusDateTimeDetails StatusDateTimeDetails { get; set; }
        public CargoDetailsForShipmentStatus CargoDetails { get; set; }
        public DocumentationDetailsForShipmentStatus DocumentationDetails { get; set; }
    }
    public class RoutingDetailsForShipmentStatus
    {
        public string ReceivingWarehouse { get; set; }
        public string CutoffReceivingWarehouse { get; set; }
        public string PlaceOfReceipt { get; set; }
        public string ETSPlaceOfReceipt { get; set; }
        public string PortOfLoading { get; set; }
        public string ETSPortOfLoading { get; set; }
        public string PortOfDischarge { get; set; }
        public string ETAPortOfDischarge { get; set; }
        public string PlaceOfDelivery { get; set; }
        public string ETAPlaceOfDelivery { get; set; }
    }
    public class StatusDateTimeDetails
    {
        public string Date { get; set; }
        public string Time { get; set; }
        public string TimeZone { get; set; }
    }
    public class CargoDetailsForShipmentStatus
    {
        public string Pieces { get; set; }
        public string WeightLBS { get; set; }
        public string VolumeCBF { get; set; }
        public string WeightKG { get; set; }
        public string VolumeCBM { get; set; }
        public string HazardousFlag { get; set; }
    }
    public class DocumentationDetailsForShipmentStatus
    {
        public string Image { get; set; }
        public string ContentType { get; set; }
    }
}
