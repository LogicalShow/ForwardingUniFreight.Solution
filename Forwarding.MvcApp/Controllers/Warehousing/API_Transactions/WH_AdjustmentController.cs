using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
	public class WH_AdjustmentController : ApiController
	{
		[HttpGet, HttpPost]
		public object LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
		{
			int _RowCount = 0;


			CvwWH_AdjustmentDetails objCvwWH_AdjustmentDetails = new CvwWH_AdjustmentDetails();
			objCvwWH_AdjustmentDetails.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var pallets = new List<vwItemBalance>();
			if (pIsLoadArrayOfObjects)
			{
				//pallets.AddRange(objWH_ItemBalance.Get("distinct PalletID","1=1"));
			}

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				serializer.Serialize(objCvwWH_AdjustmentDetails.lstCVarvwWH_AdjustmentDetails)
				, _RowCount
				,  serializer.Serialize(pallets)
			};
		}
		[HttpGet, HttpPost]
		public object LoadPallets(string pWhereClause)
		{
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var pallets = objWH_ItemBalance.Get("distinct PalletID", pWhereClause);
			
			var serializer = new JavaScriptSerializer { MaxJsonLength=int.MaxValue};
			return new { Data = serializer.Serialize(pallets) };
		}
		[HttpGet, HttpPost]
		public object LoadPalletItems(string pWhereClause)
		{
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var ItemsBalance = objWH_ItemBalance.Get("*",pWhereClause);
			var serializer = new JavaScriptSerializer();
			return new { Data = serializer.Serialize(ItemsBalance) };
		}

		[HttpGet, HttpPost]
		public object Save(Adjustment pAdjustment)
		{
			Exception checkException = null;
			if (pAdjustment == null || pAdjustment.Details?.Count == 0)
			{
				checkException = new Exception("No Data To Save");
				return new { Result = false, Exception = checkException };
			}



			CWH_Adjustment objCWH_Adjustment = new CWH_Adjustment();
			objCWH_Adjustment.lstCVarWH_Adjustment.Add(new CVarWH_Adjustment
			{
				PalletID = pAdjustment.PalletID,
				Reason = pAdjustment.Reason,
				CreationDate = DateTime.Now,
				CreatorUserID = WebSecurity.CurrentUserId
			});
			Common.Common.ReplaceNull(objCWH_Adjustment.lstCVarWH_Adjustment[objCWH_Adjustment.lstCVarWH_Adjustment.Count - 1]);

			checkException = objCWH_Adjustment.SaveMethod(objCWH_Adjustment.lstCVarWH_Adjustment);
			if (checkException == null)
			{
				CWH_AdjustmentDetails objCWH_AdjustmentDetails = new CWH_AdjustmentDetails();

				foreach (var item in pAdjustment.Details)
				{
					objCWH_AdjustmentDetails.lstCVarWH_AdjustmentDetails.Add(new CVarWH_AdjustmentDetails
					{
						AdjustID = objCWH_Adjustment.lstCVarWH_Adjustment[0].ID,
						PurchaseItemID = item.PurchaseItemID,
						PackageTypeID = item.PackageTypeID,
						OldQuantity = item.OldQuantity,
						NewQuantity = item.NewQuantity,
						LocationID = item.LocationID,
						BatchNumber = item.BatchNumber,
						ReceiveDate = DateTime.ParseExact(item.ReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
						ProductionDate = DateTime.ParseExact(item.ProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
						ExpirationDate = DateTime.ParseExact(item.ExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
						ItemBalanceID= item.ItemBalanceID,
						CreationDate = DateTime.Now,
						CreatorUserID = WebSecurity.CurrentUserId
					});
					Common.Common.ReplaceNull(objCWH_AdjustmentDetails.lstCVarWH_AdjustmentDetails[objCWH_AdjustmentDetails.lstCVarWH_AdjustmentDetails.Count - 1]);
				}
				checkException = objCWH_AdjustmentDetails.SaveMethod(objCWH_AdjustmentDetails.lstCVarWH_AdjustmentDetails);

				if(checkException==null)
				{
					StringBuilder str = new StringBuilder();
					foreach (var item in pAdjustment.Details)
					{
						//str.AppendLine($"update WH_ItemBalance set ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), Quantity={item.NewQuantity+item.DemandedQuantity} where PurchaseItemID={item.PurchaseItemID} and PackageTypeID={item.PackageTypeID} and LocationID={item.LocationID} and PalletID='{pAdjustment.PalletID}' and IsNull(BatchNumber,'')='{item.BatchNumber}' and cast(ReceiveDate as date)='{Convert.ToDateTime(item.ReceiveDate).ToString("yyyy-MM-dd")}' and cast(ProductionDate as date)='{Convert.ToDateTime(item.ProductionDate).ToString("yyyy-MM-dd")}' and cast(ExpirationDate as date)='{Convert.ToDateTime(item.ExpirationDate).ToString("yyyy-MM-dd")}';");
						str.AppendLine($"update WH_ItemBalance set ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), Quantity={item.NewQuantity+item.DemandedQuantity} where ID={item.ItemBalanceID};");
					}
					WH_ItemBalance itemBalance = new WH_ItemBalance();
					var ex = itemBalance.Update(str.ToString());
				}
			}


			return new
			{
				Result = checkException == null
				,
				Exception = checkException
			};
		}

		[HttpGet, HttpPost]
		public bool Delete(String pIDs)
		{
			bool _result = false;
			CWH_Adjustment objCWH_Adjustment = new CWH_Adjustment();
			foreach (var currentID in pIDs.Split(','))
			{
				objCWH_Adjustment.lstDeletedCPKWH_Adjustment.Add(new CPKWH_Adjustment() { ID = Int32.Parse(currentID.Trim()) });
			}

			Exception checkException = objCWH_Adjustment.DeleteItem(objCWH_Adjustment.lstDeletedCPKWH_Adjustment);
			if (checkException != null) // an exception is caught in the model
			{
				if (checkException.Message.Contains("DELETE")) // some or all of the Contracts were not deleted due to dependencies
					_result = false;
			}
			else //deleted successfully
				_result = true;
			return _result;
		}



	}

	public class Adjustment
	{
		public int ID { get; set; }
		public string PalletID { get; set; }
		public string Reason { get; set; }
		public List<AdjustmentDetail> Details { get; set; }
	}
	public class AdjustmentDetail
	{
		public long ItemBalanceID { get; set; }
		public int PurchaseItemID { get; set; }
		public int PackageTypeID { get; set; }
		public decimal OldQuantity { get; set; }
		public decimal NewQuantity { get; set; }
		public int LocationID { get; set; }
		public string BatchNumber { get; set; }
		public string ReceiveDate { get; set; }
		public string ProductionDate { get; set; }
		public string ExpirationDate { get; set; }
		//
		public decimal DemandedQuantity { get; set; }
	}

}
