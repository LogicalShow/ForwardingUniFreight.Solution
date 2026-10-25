using System.Collections.Generic;
using System.Xml.Serialization;

namespace Forwarding.MvcApp.Models.XML
{
    public class Invoice
    {
        public XMLEnvelope Envelope { get; set; }
        public InvoiceDetails InvoiceDetails { get; set; }
    }
    public class InvoiceDetails
    {
        public string SCAC { get; set; }
        public string InvoiceOfficeCode { get; set; }
        public string InvoiceNumber { get; set; }
        public string Type { get; set; }
        public string InvoiceMode { get; set; }
        public string InvoiceApplyTo { get; set; }
        public string ReferenceType { get; set; }
        public string PayorReference { get; set; }
        public string InvoiceDate { get; set; }
        public string InvoiceDueDays { get; set; }
        public string InvoiceDueDate { get; set; }
        public string InvoiceAmount { get; set; }
        public string InvoiceCurrency { get; set; }
        public string ROE { get; set; }
        public string LocalCurrency { get; set; }
        public string Comments { get; set; }
        public string FileNumber { get; set; }
        public string MasterBillOfLadingNumber { get; set; }
        public string HouseBillOfLadingNumber { get; set; }
        public string ArrivalNoticeNumber { get; set; }
        public InvoicePartnerDetails InvoicePartnerDetails { get; set; }
        public List<ChargeDetails> ChargeDetailsAll { get; set; }
        public TotalAmountDetails TotalAmountDetails { get; set; }
        [XmlArray("CargoDetailsAll")]
        public List<CargoDetailsForInvoice> CargoDetailsAll { get; set; }
        public InvoiceDocumentation InvoiceDocumentation { get; set; }
    }
    public class InvoicePartnerDetails
    {
        public IssuerDetails IssuerDetails { get; set; }
        public PayorDetails PayorDetails { get; set; }
    }
    public class IssuerDetails
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string DeliverTo { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string StateProvince { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
    public class PayorDetails
    {
        public string Name { get; set; }
        public string PayorContact { get; set; }
        public string Address { get; set; }
        public string DeliverTo { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string StateProvince { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
    public class ChargeDetails
    {
        public string ChargeCode { get; set; }
        public string ChargeName { get; set; }
        public string ChargeDescription { get; set; }
        public string Rate { get; set; }
        public string Quantity { get; set; }
        public string Basis { get; set; }
        public string ForeignCurrency { get; set; }
        public string ROE { get; set; }
        public string LocalCurrency { get; set; }
        public string LocalAmount { get; set; }
        public string Tax { get; set; }
    }
    public class TotalAmountDetails
    {
        public string LocalCurrency { get; set; }
        public string LocalAmountExclTax { get; set; }
        public string LocalAmount { get; set; }
        public string ROE { get; set; }
        public string ForeignCurrency { get; set; }
    }
    [System.Xml.Serialization.XmlType("CargoDetails", IncludeInSchema = true)]
    public class CargoDetailsForInvoice
    {
        public string Pieces { get; set; }
        public string Packaging { get; set; }
        public string Commodity { get; set; }
        public string Weight { get; set; }
        public string Volume { get; set; }
        public string UOM { get; set; }
    }
    public class InvoiceDocumentation
    {
        public string ImageLink { get; set; }
        public string Image { get; set; }
        public string ContentType { get; set; }
    }
}
