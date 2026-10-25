using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Customized
{
	public class WhPickup
	{
		public long ID { get; set; }
		public int WarehouseID { get; set; }
		public int WarehouseToID { get; set; }
		public int CustomerID { get; set; }
		public int BillTo { get; set; }
		public int EndUserID { get; set; }
		public string OrderDate { get; set; }
		public string RequiredDate { get; set; }
		public bool IsFinalized { get; set; }
		public string FinalizeDate { get; set; }
		public string Notes { get; set; }
		public long OperationID { get; set; }
		public string RMANumber { get; set; }
		public long PersonInChargeID { get; set; }
		public long PDIReceiveDetailsID { get; set; }
		public int EquipmentID { get; set; }
		public string DriverName { get; set; }
		public string DriverIdentity { get; set; }
		public string TruckNo { get; set; }
		public string ContainerNo { get; set; }
		public string SealNo { get; set; }
		public int OwnerID { get; set; }
		public int StatusID { get; set; }
		public bool SaveMasterOnly { get; set; }
		public string Location { get; set; }
		public string Cards { get; set; }
		public string Rep { get; set; }
		public List<WhPickupDetail> Details { get; set; }
	}
	public class WhPickupDetail
	{
		public int ID { get; set; }
		public int PickupID { get; set; }
		public int PurchaseItemID { get; set; }
		public decimal DemandedQuantity { get; set; }
		public decimal PD_AvailableQuantity { get; set; }
		public int PD_PackageTypeID { get; set; }
		public DateTime CreationDate { get; set; }
		public int CreatorUserID { get; set; }
	}
}