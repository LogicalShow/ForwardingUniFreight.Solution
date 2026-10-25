using System.Collections.Generic;
using System.Xml.Serialization;

namespace Forwarding.MvcApp.Models.XML
{
    public class FileBL
    {
        public XMLEnvelope FileBLEnvelope { get; set; }
        public FileBLDetails FileBLDetails { get; set; }
    }
    public class FileBLDetails
    {
        public string FileNumber { get; set; }
        public string TypeOfMove { get; set; }
        public string Coload { get; set; }
        public string Mode { get; set; }
        public string MasterBLNumber { get; set; }
        public string SenderEmail { get; set; }
        public string MasterBarcodeNumber { get; set; }
        public SailingDetails SailingDetails { get; set; }
        public RoutingDetailsForFileBL RoutingDetails { get; set; }
        public List<ContainerDetailsMaster> ContainerDetailsAllMaster { get; set; }
        public List<BillOfLadingDetails> BillOfLadingDetailsAll { get; set; }
    }
    public class SailingDetails
    {
        public string ImoNumber { get; set; }
        public string SCAC { get; set; }
        public string VesselName { get; set; }
        public string Voyage { get; set; }
        public string EtdOrigin { get; set; }
        public string EtsLoadPort { get; set; }
        public string EtaTransshipmentPort1 { get; set; }
        public string EtaTransshipmentPort2 { get; set; }
        public string EtaTransshipmentPort3 { get; set; }
        public string EtaDischarge { get; set; }
        public string EtaFinalDestination { get; set; }
    }
    public class RoutingDetailsForFileBL
    {
        public string OriginCode { get; set; }
        public string OriginName { get; set; }
        public string LoadCode { get; set; }
        public string LoadName { get; set; }
        public string TransshipmentPort1 { get; set; }
        public string TransshipmentPort1Name { get; set; }
        public string TransshipmentPort2 { get; set; }
        public string TransshipmentPort2Name { get; set; }
        public string TransshipmentPort3 { get; set; }
        public string TransshipmentPort3Name { get; set; }
        public string DischargeCode { get; set; }
        public string DischargeName { get; set; }
        public string DestinationCode { get; set; }
        public string DestinationName { get; set; }
    }
    public class ContainerDetailsMaster
    {
        public string ContainerNumber { get; set; }
        public string SealNumber { get; set; }
        public string ContainerSize { get; set; }
        public string ContainerType { get; set; }
        public string Weight { get; set; }
        public string Volume { get; set; }
        public string UOM { get; set; }
    }
    public class BillOfLadingDetails
    {
        public string BillOfLadingNumber { get; set; }
        public string CustomerAlias { get; set; }
        public string Type { get; set; }
        public string ReleaseType { get; set; }
        public string FPI { get; set; }
        public string NumberOfOriginals { get; set; }
        public string Terms { get; set; }
        public string BLReleasePoint { get; set; }
        public string HBLDocumentURL { get; set; }
        public DocumentationDetailsForFileBL DocumentationDetails { get; set; }
        public ReferenceDetails ReferenceDetails { get; set; }
        public string ACIDFlag { get; set; }
        public ACIDDetails ACIDDetails { get; set; }
        public List<AddressDetails> AddressDetailsAll { get; set; }
        public RoutingDetailsForBillOfLadingDetails RoutingDetails { get; set; }
        [XmlArray("ContainerDetailsAll")]
        public List<ContainerDetailsForBillOfLadingDetails> ContainerDetailsAll { get; set; }
        public GeneralBlDetails GeneralBlDetails { get; set; }
        public FileBlChargeDetails ChargeDetails { get; set; }
        public CommentDetails CommentDetails { get; set; }
    }
    public class DocumentationDetailsForFileBL
    {
        public string DocumentType { get; set; }
        public string ContentType { get; set; }
        public string ImageURL { get; set; }
    }
    public class ReferenceDetails
    {
        public string ShipperReference { get; set; }
        public string ConsigneeReference { get; set; }
        public string NotifyReference { get; set; }
        public string ForwarderReference { get; set; }
        public string CustomsReference { get; set; }
    }
    public class ACIDDetails
    {
        public string ACID { get; set; }
        public string ExporterRegistry { get; set; }
        public string ImporterVat { get; set; }
        public string ExporterVAT { get; set; }
        public string ExporterCountryCode { get; set; }
    }
    public class AddressDetails
    {
        public string AddressID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string CityName { get; set; }
        public string StateProvince { get; set; }
        public string PostalCode { get; set; }
        public string CountryName { get; set; }
        public GovtReferenceNumber GovtReferenceNumber { get; set; }
    }
    public class GovtReferenceNumber
    {
        public string GovtRefType { get; set; }
        public string GovtRefValue { get; set; }
    }
    public class RoutingDetailsForBillOfLadingDetails
    {
        public string OriginCode { get; set; }
        public string OriginName { get; set; }
        public string EtdOrigin { get; set; }
        public string LoadCode { get; set; }
        public string LoadName { get; set; }
        public string EtsLoadPort { get; set; }
        public string TransshipmentPort1 { get; set; }
        public string TransshipmentPort1Name { get; set; }
        public string EtaTransshipmentPort1 { get; set; }
        public string TransshipmentPort2 { get; set; }
        public string TransshipmentPort2Name { get; set; }
        public string EtaTransshipmentPort2 { get; set; }
        public string TransshipmentPort3 { get; set; }
        public string TransshipmentPort3Name { get; set; }
        public string EtaTransshipmentPort3 { get; set; }
        public string DischargeCode { get; set; }
        public string DischargeName { get; set; }
        public string EtaDischarge { get; set; }
        public string DestinationCode { get; set; }
        public string DestinationName { get; set; }
        public string EtaDestination { get; set; }
    }
    [System.Xml.Serialization.XmlType("ContainerDetails", IncludeInSchema = true)]
    public class ContainerDetailsForBillOfLadingDetails
    {
        public string ContainerNumber { get; set; }
        public BookingDetails BookingDetails { get; set; }
        public CargoDetails CargoDetails { get; set; }
    }
    public class BookingDetails
    {
        public string BookingStation { get; set; }
        public string BookingNumber { get; set; }
        public string WWAShipmentReference { get; set; }
        public string LotNo { get; set; }
    }
    public class CargoDetails
    {
        public string Pieces { get; set; }
        public string BarcodeNumber { get; set; }
        public string Packaging { get; set; }
        public List<Commodity> CommodityAll { get; set; }
        public string HSCode { get; set; }
        public string NCM { get; set; }
        public string Weight { get; set; }
        public string Volume { get; set; }
        public string UOM { get; set; }
        public List<Marks> MarksAll { get; set; }
        public string CargoImageURL { get; set; }
        public string HazardousFlag { get; set; }
        public HazardousDetails HazardousDetails { get; set; }
    }
    public class HazardousDetails
    {
        public string HazardousClass { get; set; }
        public string Flashpoint { get; set; }
        public string FlashpointFlag { get; set; }
        public string HazardousContent { get; set; }
        public string ShippingName { get; set; }
        public string UNNumber { get; set; }
        public string PackingGroup { get; set; }
        public string PackageCount { get; set; }
        public string PackageType { get; set; }
        public string NetWeight { get; set; }
        public string EmergencyPhoneNumber { get; set; }
        public string HazCargoImageURL { get; set; }
    }
    public class GeneralBlDetails
    {
        public List<Marks> MarksAll { get; set; }
        public List<Description> DescriptionAll { get; set; }
        public string TaxID { get; set; }
    }
    public class FileBlChargeDetails
    {
        public string ChargeCode { get; set; }
        public string ChargeName { get; set; }
        public string ChargeDescription { get; set; }
        public string PrepaidCollect { get; set; }
        public string Rate { get; set; }
        public string Basis { get; set; }
        public string ForeignAmount { get; set; }
        public string ExchangeRate { get; set; }
        public string LocalAmount { get; set; }
        public string Currency { get; set; }
        public string PCName { get; set; }
    }
    public class CommentDetails
    {
        public string Remarks { get; set; }
    }
    
}
