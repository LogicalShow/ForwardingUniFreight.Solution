using System.Collections.Generic;
using BillWorkflow.Common.Contracts;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    // Data prepared without writes; not database rows and not an API request.
    public class BillWriteSources
    {
        // Review.Bill.BillOfLadingNumber -> Operations.HouseNumber;
        // BookingNumber -> BookingNumber; DateOfIssue -> IssuingDate.
        // ContainerNo -> ContainerNumber; SealNo -> CarrierSeal;
        // Packages -> NumberOfPackagesOnContainer; GrossWeightKg -> GrossWeight;
        public ConfirmedBill Review { get; set; }
        public MasterOperationContext Master { get; set; }

        // Both IDs come from saved Shipper/Consignee lookups. Direction identifies the operation client later.
        public int ShipperID { get; set; }
        public int ConsigneeID { get; set; }

        // POL/POD and their countries come from accepted scanned references, not master ports.
        public PortRecord PortOfLoading { get; set; }
        public PortRecord PortOfDischarge { get; set; }

        // Key = position in the stored bill's Containers list. Value = master-data ContainerTypeID.
        // Master containers belong to Master.MasterOperationID; the future writer creates house links.
        public IReadOnlyDictionary<int, int> ContainerTypeIds { get; set; }
    }
}
