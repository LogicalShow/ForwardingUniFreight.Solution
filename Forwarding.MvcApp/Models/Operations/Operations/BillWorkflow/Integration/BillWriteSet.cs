using System;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    // Planned business writes, not saved database records yet.
    public class BillWriteSet
    {
        public Guid DocumentReviewId { get; set; }
        public Guid BillReviewId { get; set; }
        public int ExpectedReviewVersion { get; set; }
        public string MasterContextVersion { get; set; }
        public string VoyageNumber { get; set; }
        public BillOperationWrite Operation { get; set; }
        public List<BillPartnerWrite> Partners { get; set; }

        public List<BillContainerWrite> Containers { get; set; }
    }

    public class BillOperationWrite
    {
        public long MasterOperationID { get; set; }
        public int BLType { get; set; }
        public int DirectionType { get; set; }
        public int TransportType { get; set; }
        public int ShipmentType { get; set; }
        public int? BranchID { get; set; }
        public int? SalesmanID { get; set; }
        public int? OperationManID { get; set; }
        public int? CurrencyID { get; set; }
        public int? AgentID { get; set; }
        public int? ShippingLineID { get; set; }
        public int? VesselID { get; set; }
        public int? OperationStageID { get; set; }
        public string DirectionIconName { get; set; }
        public string DirectionIconStyle { get; set; }
        public string TransportIconName { get; set; }
        public string TransportIconStyle { get; set; }
        public int ShipperID { get; set; }
        public int ConsigneeID { get; set; }
        public int POL { get; set; }
        public int POLCountryID { get; set; }
        public int POD { get; set; }
        public int PODCountryID { get; set; }
        public string HouseNumber { get; set; }
        public string BookingNumber { get; set; }
        public DateTime? IssuingDate { get; set; }
        public decimal? GrossWeight { get; set; }
        public decimal? Volume { get; set; }
        public int? NumberOfPackages { get; set; }
    }

    public class BillPartnerWrite
    {
        public int OperationPartnerTypeID { get; set; }
        public int CustomerID { get; set; }
        public bool IsOperationClient { get; set; }
    }

    public class BillContainerWrite
    {
        public int ContainerIndex { get; set; }
        public int ContainerTypeID { get; set; }
        public string ContainerNumber { get; set; }
        public string CarrierSeal { get; set; }
        public int Quantity { get; set; }
        public int? NumberOfPackagesOnContainer { get; set; }
        public decimal? GrossWeight { get; set; }
        public decimal? Volume { get; set; }
    }
}
