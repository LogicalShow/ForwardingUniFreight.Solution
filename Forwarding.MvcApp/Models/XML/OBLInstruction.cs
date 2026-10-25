using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.XML
{
    public class OBLInstruction
    {
        public XMLEnvelope OBLInstructionEnvelope { get; set; }
        public OBLInstructionDetails OBLInstructionDetails { get; set; }
    }
    public class OBLInstructionDetails
    {
        public string ApplicationType { get; set; }
        public string BookingNumber { get; set; }
        public string CustomerControlCode { get; set; }
        public string CommunicationReference { get; set; }
        public string CustomerReference { get; set; }
        public string ShipperReference { get; set; }
        public string ForwarderReference { get; set; }
        public string ConsigneeReference { get; set; }
        public string CustomerContact { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
        public List<BLRemarks> BLRemarksAll { get; set; }
        public Instruction Instruction { get; set; }
        public List<Address> AddressAll { get; set; }
        public Routing Routing { get; set; }
        public string CarrierSeal { get; set; }
        public string CustomsSeal { get; set; }
        public string QuarantineAgencySeal { get; set; }
        public string ShipperSeal { get; set; }
        public string TerminalOperatorSeal { get; set; }
        public List<CargoDescription> CargoDescriptionAll { get; set; }
    }

    public class Instruction
    {
        public string TransportType { get; set; }
        public string OBLType { get; set; }
        public string OBLNumber { get; set; }
        public string AESNumber { get; set; }
        public string FPI { get; set; }
        public DocumentationDetails DocumentationDetails { get; set; }
        public string DisbursementCurrency { get; set; }
        public string DisbursementAmount { get; set; }
        public string PlaceofIssueCode { get; set; }
        public string PlaceofIssueName { get; set; }
        public string BookingOffice { get; set; }
        public string DateofIssue { get; set; }
    }
    public class DocumentationDetails
    {
        public string DocumentationDetailsType { get; set; }
        public string NumberOfDocuments { get; set; }
        public string DocumentsRated { get; set; }
    }
    public partial class Address
    {
        public string AddressID { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string AddressLine4 { get; set; }
        public string AddressLine5 { get; set; }
        public string AddressLine6 { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
    }
    public class Routing
    {
        public string VesselVoyageID { get; set; }
        public string VesselName { get; set; }
        public string ETD { get; set; }
        public string ETA { get; set; }
        public string Voyage { get; set; }
        public string OriginOfGoods { get; set; }
        public string PrecarriageBy { get; set; }
        public string PlaceofReceiptCode { get; set; }
        public string PlaceofReceiptName { get; set; }
        public string CFSOriginCode { get; set; }
        public string CFSOriginName { get; set; }
        public string PortofLoadingCode { get; set; }
        public string PortofLoadingName { get; set; }
        public string PortofTransshipmentCode { get; set; }
        public string PortofTransshipmentName { get; set; }
        public string PortofDischargeCode { get; set; }
        public string PortofDischargeName { get; set; }
        public string CFSDestinationCode { get; set; }
        public string CFSDestinationName { get; set; }
        public string PlaceofDeliveryCode { get; set; }
        public string PlaceofDeliveryName { get; set; }
    }
    public partial class CargoDescription
    {
        public string CargoID { get; set; }
        public string Level { get; set; }
        public string PackageCount { get; set; }
        public string PackageType { get; set; }
        public List<HSCode> HSCodeAll { get; set; }
        public string UOM { get; set; }
        public string Weight { get; set; }
        public string Volume { get; set; }
        //public List<Commodity> CommodityAll { get; set; }
        //public List<Marks> MarksAll { get; set; }

        public string Fumigation { get; set; }
        public string HazardousFlag { get; set; }
    }
    
}
