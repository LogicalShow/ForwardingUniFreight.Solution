namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    // Current master values used to prepare a house. 
    public class MasterOperationContext
    {
        public long MasterOperationID { get; set; }
        public string Version { get; set; }
        public int DirectionType { get; set; }
        public int TransportType { get; set; }
        public int? ShipmentType { get; set; }
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
    }
}
