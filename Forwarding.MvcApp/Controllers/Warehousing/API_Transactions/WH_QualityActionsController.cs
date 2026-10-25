using Forwarding.MvcApp.Entities.Warehousing;
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
	public class WH_QualityActionsController : ApiController
	{
		[HttpGet, HttpPost]
		public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, bool pIsPallet, bool pHasRequest)
		{
			int _RowCount = 0;
			Exception checkException = null;

			CvwWH_QualityActions objCvwWH_QualityActions = new CvwWH_QualityActions();
			var status = new List<SelectListOption>();
			var palletClass = new List<SelectListOption>();
			var receives = new List<SelectListOption>();
			var items = new List<SelectListOption>();

			if (pHasRequest)
			{
				checkException = objCvwWH_QualityActions.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

				if (pIsLoadArrayOfObjects)
				{
					var table = pIsPallet ? "PalletStatus" : "BatchStatus";
					CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

					status.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM {table} Order By Name", typeof(SelectListOption)).Cast<SelectListOption>());

					if (pIsPallet)
						palletClass.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM PalletClassification Order By Name", typeof(SelectListOption)).Cast<SelectListOption>());

					receives.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select distinct ReceiveID ID, ReceiveCode Code from vwWH_ReceiveDetails where Quantity>0 and (IsFinalized=1 or RD_IsFinalized=1)", typeof(SelectListOption)).Cast<SelectListOption>());
					items.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select distinct PurchaseItemID ID, PurchaseItemCode Code, PurchaseItemName Name from vwWH_ItemBalance where Quantity>0", typeof(SelectListOption)).Cast<SelectListOption>());
				}
			}
			else
			{
				checkException = objCvwWH_QualityActions.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

				if (pIsLoadArrayOfObjects)
				{
					CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
					
					receives.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select distinct ReceiveID ID, ReceiveCode Code from vwWH_ReceiveDetails where IsFinalized=1 and Quantity>0 and IsNull(PickedQuantity,0)=0 ", typeof(SelectListOption)).Cast<SelectListOption>());
					items.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select distinct PurchaseItemID ID, PurchaseItemCode Code, PurchaseItemName Name from vwWH_ReceiveDetails where IsFinalized=1 and Quantity>0 and IsNull(PickedQuantity,0)=0", typeof(SelectListOption)).Cast<SelectListOption>());
				}
			}
			

            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				serializer.Serialize(objCvwWH_QualityActions.lstCVarvwWH_QualityActions)
				, _RowCount
				,serializer.Serialize(status)
				,serializer.Serialize(palletClass)
				,serializer.Serialize(receives)
				,serializer.Serialize(items)
            };
		}

		[HttpGet,HttpPost]
		public object UpdateBatch(string pOldBatchNumber, string pBatchNumber, string pProductionDate, string pExpirationDate)
		{
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var done = objWH_ItemBalance.Update($"update WH_ItemBalance set ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), BatchNumber='{pBatchNumber}', ProductionDate='{DateTime.ParseExact(pProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd")}', ExpirationDate='{DateTime.ParseExact(pExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd")}' where BatchNumber='{pOldBatchNumber}'");
			return done;
		}
		[HttpGet, HttpPost]
		public object Save([FromBody]WhQualityActionMaster pData)
		{
			if (pData?.Pallets?.Count == 0)
				return "No Data To Update";
			var done = false;
			Exception checkException = null;
			StringBuilder updateClause = new StringBuilder();

			if (pData.IsPallet)
			{
				string updateStatus = "PalletStatusID=PalletStatusID";
				if (pData.PalletStatusID > 0)
				{
					updateStatus = $"PalletStatusID={pData.PalletStatusID}";
				}
				string updateClass = "PalletClassID=PalletClassID";
				if (pData.PalletClassID > 0)
					updateClass = $"PalletClassID={pData.PalletClassID}";

				string wherePallet = $"PalletID";

				foreach (var item in pData.Pallets)
				{
					updateClause.AppendLine($"update WH_ItemBalance set ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), {updateStatus}, {updateClass} where LocationID={item.LocationID} and {wherePallet}='{item.PalletID}';");
				}
			}
			else
			{
				string updateStatus = "BatchStatusID=BatchStatusID";

				if (pData.PalletStatusID > 0)
				{
					updateStatus = $"BatchStatusID={pData.PalletStatusID}";
				}
				string wherePallet = $"BatchNumber";

				foreach (var item in pData.Pallets)
				{
					updateClause.AppendLine($"update WH_ItemBalance set ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), {updateStatus} where {wherePallet}='{item.PalletID}';");
				}
			}

			if (updateClause.Length > 0)
			{
				WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
				done = objWH_ItemBalance.Update(updateClause.ToString());

			}
			
			if (done)
			{
				if (string.IsNullOrEmpty(pData.Reason))
					pData.Reason = "";

				var now = DateTime.Now;
				CWH_QualityActionsLog objCWH_QualityActionsLog = new CWH_QualityActionsLog();
				foreach (var item in pData.Pallets)
				{
					objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Add(new CVarWH_QualityActionsLog
					{
						ReceiveID = item.ReceiveID,
						LocationID = item.LocationID,
						PalletID = item.PalletID,
						PalletStatusID = pData.PalletStatusID,
						PalletClassID = pData.PalletClassID,
						Reason = pData.Reason,
						IsPallet = pData.IsPallet,
						CreatorUserID = WebSecurity.CurrentUserId,
						CreationDate = now
					});
				}
				checkException = objCWH_QualityActionsLog.SaveMethod(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog);
			}

			return checkException == null || done ? "": checkException.Message;
		}

		[HttpGet, HttpPost]
		public object GetPalletItems(string pQuery)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var items = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(pQuery
			   , typeof(CVarvwWH_ReceiveDetails)).Cast<CVarvwWH_ReceiveDetails>();
			return new JavaScriptSerializer { MaxJsonLength=int.MaxValue}.Serialize(items);
		}

		[HttpGet, HttpPost]
		public object[] GetItemBalance(int pPageNumber, int pPageSize, string pWhereClause, string pOrderBy, bool pHasRequest)
		{
			int rowsCount = 0;
			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			if (pHasRequest)
			{
				CvwWH_ItemBalance objCvwWH_ItemBalance = new CvwWH_ItemBalance();
				objCvwWH_ItemBalance.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out rowsCount);

				return new object[] {
				serializer.Serialize(objCvwWH_ItemBalance.lstCVarvwWH_ItemBalance),
				rowsCount
				};
			}
			else
			{
				CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
				objCvwWH_ReceiveDetails.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out rowsCount);

				return new object[] {
				serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails),
				rowsCount
				};
			}

		}
		[HttpGet, HttpPost]
		public object UpdateItem([FromBody] ItemUpdate pData)
		{
			if (pData.HasRequest)
			{
				var done = false;
				WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
				foreach (var item in pData.Items)
				{
					done = objWH_ItemBalance.Update($"update WH_ItemBalance set ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), PalletID=N'{item.PalletID}', BatchNumber='{item.BatchNumber}', ProductionDate='{DateTime.ParseExact(item.strProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd")}', ExpirationDate='{DateTime.ParseExact(item.strExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd")}' where ID={item.ID}");
				}
				return done;
			}
			else
			{
				Exception exception = null;
				CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
				foreach (var item in pData.Items)
				{
					exception = objCWH_ReceiveDetails.UpdateList($"ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), PalletID=N'{item.PalletID}', BatchNumber='{item.BatchNumber}', ExpirationDate='{DateTime.ParseExact(item.strExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd")}' where ID={item.ID}");
				}
				return exception==null;
			}
		
			
		}
	}
	public class WhQualityActionMaster
	{
		public int PalletStatusID { get; set; }
		public int PalletClassID { get; set; }
		public string Reason { get; set; }
		public bool IsPallet { get; set; }
		public List<WhQualityActionLog> Pallets { get; set; }
	}
	public class WhQualityActionLog
	{
		public int ReceiveID { get; set; }
		public int LocationID { get; set; }
		public string PalletID { get; set; }
	}
	public class ItemUpdate
	{
		public bool HasRequest { get; set; }
		public List<ItemBalance> Items { get; set; }
	}
}
