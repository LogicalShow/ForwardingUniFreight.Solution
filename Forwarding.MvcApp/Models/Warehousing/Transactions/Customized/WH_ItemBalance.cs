using Forwarding.MvcApp.Models.Customized;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Customized
{
	public class ItemBalance
	{
		public long ID { get; set; }
		public int PurchaseItemID { get; set; }
		public int PackageTypeID { get; set; }
		public decimal Quantity { get; set; }
		public int LocationID { get; set; }
		public string PalletID { get; set; }
		public int PalletStatusID { get; set; }
		public int PalletClassID { get; set; }
		public string BatchNumber { get; set; }
		public int BatchStatusID { get; set; }
		public DateTime ReceiveDate { get; set; }
		public DateTime ProductionDate { get; set; }
		public DateTime ExpirationDate { get; set; }
		public string strProductionDate { get; set; }
		public string strExpirationDate { get; set; }
		public bool IsPicked { get; set; }
		public int CreatorUserID { get; set; }
		public DateTime CreationDate { get; set; }
		public int ModificatorUserID { get; set; }
		public DateTime ModificationDate { get; set; }
		public long ReceiveDetailsID { get; set; }
	}
	public class vwItemBalance: ItemBalance
	{
		public string PurchaseItemCode { get; set; }
		public string PurchaseItemName { get; set; }
		public string PackageTypeCode { get; set; }
		public string PackageTypeName { get; set; }
		public string LocationCode { get; set; }
		public int CustomerID { get; set; }
		public int OwnerID { get; set; }
		public int WarehouseID { get; set; }
		public decimal PDL_DemandedQuantity { get; set; }
		public int LocationTypeID { get; set; }
		public bool IsPalletHeld { get; set; }
		public bool IsBatchHeld { get; set; }
		public bool BySerialNo { get; set; }
		public bool ByExpireDate { get; set; }
		public bool ByLotNo { get; set; }
		public long ItemBalanceID { get; set; }

	}
	public class WH_ItemBalance
	{
		string _tblColumns = "PurchaseItemID,PackageTypeID,Quantity,LocationID,PalletID,PalletStatusID,PalletClassID,BatchNumber,BatchStatusID,ReceiveDate,ProductionDate,ExpirationDate,IsPicked,ReceiveDetailsID,CreatorUserID,CreationDate,ModificatorUserID,ModificationDate";
		public List<vwItemBalance> Get(string pSelectClause="*", string pWhereClause="Quantity>IsNull(PDL_DemandedQuantity,0) and IsNull(IsPicked,0)=0")
		{
			int currentUserId = WebSecurity.CurrentUserId;
			Task.Run(() => { Update($"update WH_ItemBalance set ModificatorUserID={currentUserId}, ModificationDate=GetDate(), PalletStatusID=(select top 1 ID from PalletStatus where Held=1) where ID in (select ID from vwWH_ItemBalance where ByExpireDate=1 and Cast(ExpirationDate as date)<Cast(GetDate() as date))"); });

			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			List<vwItemBalance> items = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select {pSelectClause} from vwWH_ItemBalance where {pWhereClause}", typeof(vwItemBalance)).Cast<vwItemBalance>().ToList();

			return items;
		}
		public List<vwItemBalance> GetAvailable(int pWarehouseID, int pCustomerID, int pOwnerID, string pItemsIDs=null)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			string itemFilter = string.IsNullOrWhiteSpace(pItemsIDs) ? "" : $" and PurchaseItemID in ({pItemsIDs})";
			string query = $@"select distinct PurchaseItemID, PurchaseItemCode, PurchaseItemName, PackageTypeID, PackageTypeName, Sum(Quantity-isnull(PDL_DemandedQuantity,0)) Quantity
from vwWH_ItemBalance where WarehouseID={pWarehouseID} and CustomerID={pCustomerID} and OwnerID={pOwnerID} and Quantity-isnull(PDL_DemandedQuantity,0)>0 and IsNull(LocationTypeID,0)=0 and IsNull(IsPalletHeld,0)=0 and IsNull(IsBatchHeld,0)=0 {itemFilter}
Group By PurchaseItemID, PurchaseItemCode, PurchaseItemName, PackageTypeID, PackageTypeName";
			List<vwItemBalance> items = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(query, typeof(vwItemBalance)).Cast<vwItemBalance>().ToList();

			return items;
		}
		public	List<vwItemBalance> GetItemsBalanceToMove(string pWhereClause)
		{
			string query = $@"With P(ItemBalanceID, PDL_DemandedQuantity)
as
(
	select PDL.ItemBalanceID, Sum(case when P.StatusID in(10,60,70) then 0 else PDL.PDL_DemandedQuantity end)
	from WH_Pickup P join WH_PickupDetails PD on 
	P.ID = PD.PickupID
	left join WH_PickupDetailsLocation PDL on
	PD.ID=PDL.PickupDetailsID
	group by PDL.ItemBalanceID
)
select * from (
select 
IB.*, A.WarehouseID, P.ItemBalanceID, P.PDL_DemandedQuantity
from WH_ItemBalance IB
left join WH_RowLocation RL on
IB.LocationID=RL.ID
left join WH_Row R on RL.RowID=R.ID
left join WH_Area A on R.AreaID=A.ID
left join P on
IB.ID = P.ItemBalanceID
) as IB where
{pWhereClause}";

			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var items = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(query, typeof(vwItemBalance)).Cast<vwItemBalance>().ToList();

			return items;
		}
		public bool Add(List<ItemBalance> pItems)
		{
			if (pItems == null || pItems?.Count == 0)
			{
				return false;
			}
			string[] arr = new string[pItems.Count];
			var i = 0;
			foreach (var item in pItems)
			{
				if(item.CreatorUserID==0)
					item.CreatorUserID = WebSecurity.CurrentUserId;
				Common.Common.ReplaceNull(item);
				arr[i] = item.PurchaseItemID + "," + item.PackageTypeID + "," + item.Quantity + "," + item.LocationID + ",'" + item.PalletID + "'," + item.PalletStatusID + "," + item.PalletClassID + ",'" + item.BatchNumber + "'," + item.BatchStatusID + ",'" + item.ReceiveDate.ToString("yyyyMMdd") + "','" + item.ProductionDate.ToString("yyyyMMdd") + "','" + item.ExpirationDate.ToString("yyyyMMdd") + "'," + (item.IsPicked?1:0) + "," + item.ReceiveDetailsID + "," + item.CreatorUserID + ",GETDATE(),NULL,NULL";
				i++;
			}
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			NonQueryResult result = objCCustomizedDBCall.Insert("WH_ItemBalance", arr, _tblColumns);
			DeleteDuplication();
			return result.RowsAffected > 0;
		}


		public bool Update(string pUpdates)
		{
			if (string.IsNullOrWhiteSpace(pUpdates))
			{
				return false;
			}
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			NonQueryResult result = objCCustomizedDBCall.Update(pUpdates);
			return result.RowsAffected > 0;
		}
		public bool Delete(string pWhereClause)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			NonQueryResult result = objCCustomizedDBCall.Delete("WH_ItemBalance", pWhereClause);
			return result.RowsAffected>0;
		}
		public bool DeleteZeroQty()
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			NonQueryResult result = objCCustomizedDBCall.Delete("WH_ItemBalance", " Quantity=0");
			return result.RowsAffected > 0;
		}
		public bool DeleteDuplication()
		{
			string whereClause = @"ID in (
select ID from (
select ID, ReceiveDetailsID, Row_Number() Over(Partition By ReceiveDetailsID Order By ID)  RowNo
from WH_ItemBalance ) as IB where IB.RowNo>1 and ReceiveDetailsID>0
)";
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			NonQueryResult result = objCCustomizedDBCall.Delete("WH_ItemBalance", whereClause);
			return result.RowsAffected > 0;
		}
	}
}