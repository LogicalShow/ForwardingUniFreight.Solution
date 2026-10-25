using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Customized;
using Forwarding.MvcApp.Models.Warehousing.Reports.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
    public class StockLedgerController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] GetStatisticsFilter()
        {
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var owners = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from Owners Order By CustomerID,Name", typeof(SelectListOption)).Cast<SelectListOption>().ToList();
			var items = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code, Name from PurchaseItem Order By OwnerID,Code", typeof(SelectListOption)).Cast<SelectListOption>().ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(items)
                ,serializer.Serialize(owners)
            };
        }
        [HttpGet, HttpPost]
        public object[] LoadData(DateTime pFrom, DateTime pTo, int pCustomerID, string pOwnersIDs, string pPurchaseItemIDs, bool pIsSupressForZero, bool pHasRequest)
        {
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

			if (pHasRequest)
			{
				var where = "Quantity>0";
				if (!string.IsNullOrWhiteSpace(pOwnersIDs) && pOwnersIDs != "0")
					where += $" and OwnerID in ({pOwnersIDs})";
				if (!string.IsNullOrWhiteSpace(pPurchaseItemIDs)&& pPurchaseItemIDs!="0")
					where += $" and PurchaseItemID in ({pPurchaseItemIDs})";

				WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
				var ItemsBalance = objWH_ItemBalance.Get("*", where);
				return new object[]
			{
				 serializer.Serialize(ItemsBalance)
			};
			}
			else
			{
				CRepvwWH_ProductLog objCRepvwWH_ProductLog = new CRepvwWH_ProductLog();
				objCRepvwWH_ProductLog.GetList(pFrom, pTo, pCustomerID);
				if (!string.IsNullOrWhiteSpace(pPurchaseItemIDs) && pPurchaseItemIDs != "0")
				{
					objCRepvwWH_ProductLog.lstCVarRepvwWH_ProductLog = objCRepvwWH_ProductLog.lstCVarRepvwWH_ProductLog.Where(x => x.PurchaseItemID.ToString() == pPurchaseItemIDs).ToList();
				}
				if (pIsSupressForZero)
				{
					objCRepvwWH_ProductLog.lstCVarRepvwWH_ProductLog = objCRepvwWH_ProductLog.lstCVarRepvwWH_ProductLog.Where(x => x.DispatchQty > 0 || x.ReceiptQty > 0 || x.OpeningQty > 0).ToList();
				}
				CRepvwWH_ProductLogDetails objCRepvwWH_ProductLogDetails = new CRepvwWH_ProductLogDetails();
				objCRepvwWH_ProductLogDetails.GetList(pFrom, pTo, pCustomerID);
				if (!string.IsNullOrWhiteSpace(pPurchaseItemIDs) && pPurchaseItemIDs != "0")
				{
					objCRepvwWH_ProductLogDetails.lstCVarRepvwWH_ProductLogDetails = objCRepvwWH_ProductLogDetails.lstCVarRepvwWH_ProductLogDetails.Where(x => x.PurchaseItemID.ToString() == pPurchaseItemIDs).ToList();
				}
				
				return new object[]
				{
				 serializer.Serialize(objCRepvwWH_ProductLog.lstCVarRepvwWH_ProductLog)
				,serializer.Serialize(objCRepvwWH_ProductLogDetails.lstCVarRepvwWH_ProductLogDetails)
				};
			}
        
        }

    }
}
