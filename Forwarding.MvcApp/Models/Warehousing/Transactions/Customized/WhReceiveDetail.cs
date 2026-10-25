using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Customized
{
	public class WhReceive
	{
		public long ID { get; set; }
		public int WarehouseID { get; set; }
		public int CustomerID { get; set; }
		public int OwnerID { get; set; }
		public int EquipmentID { get; set; }
		public string ReceiveDate { get; set; }
		public string ETD { get; set; }
		public string ETA { get; set; }
		public string ArrivalDate { get; set; }
		public int StatusID { get; set; }
		public bool IsFinalized { get; set; }
		public string FinalizeDate { get; set; }
		public string Notes { get; set; }
		public string ContainerNumber { get; set; }
		public string PO { get; set; }
		public string MasterFile { get; set; }
		public string Invoice { get; set; }
		public string Reason { get; set; }
		public string ReceiveFrom { get; set; }
		public string DriverName { get; set; }
		public string Location { get; set; }
		public string Cards { get; set; }
		public string Rep { get; set; }
		public bool GenerateOrderByMissing { get; set; }
		public bool SaveMasterOnly { get; set; }
		public List<WhReceiveDetail> Details { get; set; }
	}
	public class WhReceiveDetail
	{
		public long ID { get; set; }
		public int StatusID { get; set; }
		public int OldLocationID { get; set; }
		public int LocationID { get; set; }
		public long ReceiveDetailsID { get; set; }
		public long ReceiveID { get; set; }
		public long PurchaseItemID { get; set; }
		public decimal SplitQuantity { get; set; }
		public decimal Quantity { get; set; }
		public decimal ExpectedQuantity { get; set; }
		public decimal WeightInTons { get; set; }
		public string BarCode { get; set; }
		public string PalletID { get; set; }
		public int PalletClassID { get; set; }
		public int PalletStatusID { get; set; }
		public string Notes { get; set; }
		public string BatchNumber { get; set; }
		public string Serial { get; set; }
		public string ImportedBy { get; set; }
		public string PO { get; set; }
		public string File { get; set; }
		public string Invoice { get; set; }
		public string ContainerNumber { get; set; }
		public string ReceiveDate { get; set; }
		public string LotNo { get; set; }
		public string Extra1 { get; set; }
		public string Extra2 { get; set; }
		public string Extra3 { get; set; }
		public string Extra4 { get; set; }
		public string Extra5 { get; set; }
		public string Extra6 { get; set; }
		public string Extra7 { get; set; }
		public string Extra8 { get; set; }
		public string Extra9 { get; set; }
		public int LocationCount { get; set; }
		public string DefectionReason { get; set; }
		public bool IsDefected { get; set; }
		public string DetailFile { get; set; }
		public DateTime ExpireDate { get; set; }
		public int CreatorUserID { get; set; }
		public string CreationDate { get; set; }
		public DateTime PickupWithoutInvoiceDate { get; set; }
		public long OperationVehicleID { get; set; }
		public long VehicleActionID { get; set; }
		public bool IsPickupAddedToInvoice { get; set; }
		public bool IsExcluded { get; set; }
		public string ProductionDate { get; set; }
		public string ExpectedProductionDate { get; set; }
		public string ExpirationDate { get; set; }
		public string ExpectedExpirationDate { get; set; }
		public int RD_PackageTypeID { get; set; }
		public bool RD_IsFinalized { get; set; }
		//
		public bool IsSplitLine { get; set; }
		public int UpdateLineID { get; set; }
		public decimal UpdateLineQty { get; set; }
		public int UserID { get; set; }
		public int WarehouseID { get; set; }
	}			
}