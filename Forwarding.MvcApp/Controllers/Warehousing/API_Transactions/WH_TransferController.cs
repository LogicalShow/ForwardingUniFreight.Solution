using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
	public class WH_TransferController : ApiController
	{
		[HttpGet, HttpPost]
		public object LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, string pWhereClause_Warehouse)
		{
			int _RowCount = 0;

			CvwWH_Transfer objCvwWH_Transfer = new CvwWH_Transfer();
			objCvwWH_Transfer.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

			var warehouses = new List<SelectListOption>();
			var fromOwners = new List<SelectListOption>();
			var ToOwners = new List<SelectListOption>();
			if (pIsLoadArrayOfObjects)
			{
				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
				warehouses.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from WH_Warehouse {pWhereClause_Warehouse}", typeof(SelectListOption)).Cast<SelectListOption>());
				fromOwners.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from Owners where ID in (select OwnerID from vwWH_ItemBalance where Quantity>IsNull(PDL_DemandedQuantity,0))", typeof(SelectListOption)).Cast<SelectListOption>());
				ToOwners.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from Owners where 1=1", typeof(SelectListOption)).Cast<SelectListOption>());
			}

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				serializer.Serialize(objCvwWH_Transfer.lstCVarvwWH_Transfer)
				, _RowCount
				, serializer.Serialize(warehouses)
				, serializer.Serialize(fromOwners)
				, serializer.Serialize(ToOwners)
			};
		}

		[HttpGet, HttpPost]
		public object LoadItems(string pWhereClause, bool pFrom)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var items = new List<CVarPurchaseItem>();
			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			if (pFrom)
			{
				items.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select distinct PurchaseItemID ID, PurchaseItemCode Code, PurchaseItemName Name, ByExpireDate, BySerialNo, ByLotNo  from vwWH_ItemBalance {pWhereClause}", typeof(CVarPurchaseItem)).Cast<CVarPurchaseItem>());
			}
			else
			{
				items.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select distinct ID, Code, Name from PurchaseItem {pWhereClause}", typeof(CVarPurchaseItem)).Cast<CVarPurchaseItem>());
			}
			return serializer.Serialize(items);
		}
		[HttpGet, HttpPost]
		public object LoadItemStock(string pWhereClause)
		{
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var items = objWH_ItemBalance.Get("*",pWhereClause);

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return serializer.Serialize(items);
		}

		[HttpGet, HttpPost]
		public object Save(WhTransfer pData)
		{
			Exception checkException = null;
			var done = false;
			var now = DateTime.Now;
			var userId = WebSecurity.CurrentUserId;
			StringBuilder str = new StringBuilder();

			if (pData == null || pData.Details?.Count == 0)
			{
				checkException = new Exception("No Data To Save");
				return new { Result = false, Exception = checkException };
			}

			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			List<vwItemBalance> ItemsBalance = new List<vwItemBalance>();

			CWH_TransferDetails objCWH_TransferDetails = new CWH_TransferDetails();
			var IDs = string.Join(",", pData.Details.Select(a => a.ItemBalanceID));
			ItemsBalance.AddRange(objWH_ItemBalance.Get("*", $"ID in ({IDs})"));
			List<ItemBalance> lst = new List<ItemBalance>();
			foreach (var item in pData.Details)
			{
				var itemBalance = ItemsBalance.Find(a => a.ID == item.ItemBalanceID);


				str.AppendLine($"update WH_ItemBalance set ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), Quantity={item.CurrentQuantity - item.TransferQuantity} where ID={itemBalance.ID};");


				lst.Add(new ItemBalance
				{
					LocationID = itemBalance.LocationID,
					PalletID = itemBalance.PalletID,
					PalletStatusID = itemBalance.PalletStatusID,
					Quantity = item.TransferQuantity,
					PurchaseItemID = pData.ToItemID,
					PackageTypeID = itemBalance.PackageTypeID,
					BatchNumber = itemBalance.BatchNumber,
					BatchStatusID = itemBalance.BatchStatusID,
					PalletClassID = itemBalance.PalletClassID,
					ReceiveDate = itemBalance.ReceiveDate,
					ProductionDate = itemBalance.ProductionDate,
					ExpirationDate = itemBalance.ExpirationDate,
				});

				objCWH_TransferDetails.lstCVarWH_TransferDetails.Add(new CVarWH_TransferDetails
				{
					PackageTypeID = itemBalance.PackageTypeID,
					Quantity = item.TransferQuantity,
					PalletID = itemBalance.PalletID,
					BatchNumber = itemBalance.BatchNumber,
					ProductionDate = itemBalance.ProductionDate,
					ExpirationDate = itemBalance.ExpirationDate,
					LocationID = itemBalance.LocationID,
					CreationDate = now,
					CreatorUserID = userId
				});
				Common.Common.ReplaceNull(objCWH_TransferDetails.lstCVarWH_TransferDetails[objCWH_TransferDetails.lstCVarWH_TransferDetails.Count - 1]);

			}

			done = objWH_ItemBalance.Update(str.ToString());
			if(done)
				done = objWH_ItemBalance.Add(lst);

			if (done && objCWH_TransferDetails.lstCVarWH_TransferDetails.Count > 0)
				{

					CWH_Transfer objCWH_Transfer = new CWH_Transfer();
					if (pData.ID > 0)
						objCWH_Transfer.GetItem(pData.ID);
					if (objCWH_Transfer.lstCVarWH_Transfer.Count == 0)
						objCWH_Transfer.lstCVarWH_Transfer.Add(new CVarWH_Transfer());

					objCWH_Transfer.lstCVarWH_Transfer[0].ID = pData.ID;
					objCWH_Transfer.lstCVarWH_Transfer[0].WarehouseID = pData.WarehouseID;
					objCWH_Transfer.lstCVarWH_Transfer[0].FromItemID = pData.FromItemID;
					objCWH_Transfer.lstCVarWH_Transfer[0].ToItemID = pData.ToItemID;

					if (pData.ID > 0)
					{
						objCWH_Transfer.lstCVarWH_Transfer[0].ModificatorUserID = userId;
						objCWH_Transfer.lstCVarWH_Transfer[0].ModificationDate = now;
					}
					else
					{
						objCWH_Transfer.lstCVarWH_Transfer[0].CreatorUserID = objCWH_Transfer.lstCVarWH_Transfer[0].ModificatorUserID = userId;
						objCWH_Transfer.lstCVarWH_Transfer[0].CreationDate = objCWH_Transfer.lstCVarWH_Transfer[0].ModificationDate = now;
					}
					Common.Common.ReplaceNull(objCWH_Transfer.lstCVarWH_Transfer[0]);
					checkException = objCWH_Transfer.SaveMethod(objCWH_Transfer.lstCVarWH_Transfer);

					if (checkException == null)
					{
						pData.ID = objCWH_Transfer.lstCVarWH_Transfer[0].ID;
						foreach (var item in objCWH_TransferDetails.lstCVarWH_TransferDetails)
						{
							item.TransferID = pData.ID;
						}
						checkException = objCWH_TransferDetails.SaveMethod(objCWH_TransferDetails.lstCVarWH_TransferDetails);
					}
				}
			
			return new
			{
				Result = checkException == null && done
				,
				Exception = checkException
			};
		}

	}
	public class WhTransfer
	{
		public int ID { get; set; }
		public int WarehouseID { get; set; }
		public int FromItemID { get; set; }
		public int ToItemID { get; set; }
		public List<WhTransferDetail> Details { get; set; }
	}
	public class WhTransferDetail
	{
		public long ItemBalanceID { get; set; }
		public int PackageTypeID { get; set; }
		public string PalletID { get; set; }
		public string BatchNumber { get; set; }
		public decimal TransferQuantity { get; set; }
		public decimal CurrentQuantity { get; set; }
		public string ProductionDate { get; set; }
		public string ExpirationDate { get; set; }
	}
}
