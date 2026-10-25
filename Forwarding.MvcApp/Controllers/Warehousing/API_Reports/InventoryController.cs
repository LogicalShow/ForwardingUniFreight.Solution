using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
    public class InventoryController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, bool pHasRequest = false, bool pBySerial=false)
        {
			if(pHasRequest)
			{
				int _RowCount = 0;
				Exception checkException = null;

				CvwWH_Inventory_rpt objCvwWH_Inventory_rpt = new CvwWH_Inventory_rpt();
				CvwWH_InventoryBySerial_rpt CvwWH_InventoryBySerial_rpt = new CvwWH_InventoryBySerial_rpt();
				if (pBySerial)
					checkException = CvwWH_InventoryBySerial_rpt.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
				else
					checkException = objCvwWH_Inventory_rpt.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

				List<SelectListOption> warehhouses = new List<SelectListOption>();
				List<SelectListOption> locations = new List<SelectListOption>();
				List<SelectListOption> customers = new List<SelectListOption>();
				if (pIsLoadArrayOfObjects)
				{
					CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

					warehhouses.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code, Name from WH_Warehouse ORDER BY Name", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
					//locations.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code from WH_RowLocation ORDER BY Code", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
					customers.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select distinct CustomerID ID, CustomerName Name from vwWH_ItemBalance where Quantity>0 ORDER BY CustomerName", typeof(SelectListOption)).Cast<SelectListOption>().ToList());

				}
				
				
				var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
				return new object[] {
				pBySerial? serializer.Serialize(CvwWH_InventoryBySerial_rpt.lstCVarvwWH_InventoryBySerial_rpt): serializer.Serialize(objCvwWH_Inventory_rpt.lstCVarvwWH_Inventory_rpt)
				, _RowCount
				, serializer.Serialize(warehhouses) //pData[2]
                , serializer.Serialize(null) //pData[3]
                , serializer.Serialize(customers) //pData[4]
                , serializer.Serialize(locations) //pData[5]
            };
			}
			else
			{
				CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
				CvwPurchaseItem objCvwPurchaseItem = new CvwPurchaseItem();
				CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
				CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
				int _RowCount = 0;
				Exception checkException = null;
				if (pIsLoadArrayOfObjects)
				{
					checkException = objCWH_Warehouse.GetList("ORDER BY Name");
					//checkException = objCvwPurchaseItem.GetList("ORDER BY Code");
					checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE Quantity>PickedQuantity AND IsFinalized=1 " + (WebSecurity.CurrentUserName == "BG EGYPT" ? (" AND CustomerName=N'" + WebSecurity.CurrentUserName) + "'" : ""), "ID", out _RowCount);
					if (objCWH_Warehouse.lstCVarWH_Warehouse.Count > 0)
						checkException = objCvwWH_RowLocation.GetList("ORDER BY Code");
				}
				var pLocationList = objCvwWH_RowLocation.lstCVarvwWH_RowLocation
					.Select(s => new
					{
						ID = s.ID
						,
						Code = s.Code
					})
					//.Distinct()
					.OrderBy(o => o.Code).ToList();
				var pCustomerList = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
					.Select(s => new
					{
						ID = s.CustomerID
						,
						Name = s.CustomerName
					})
					.Distinct().OrderBy(o => o.Name).ToList();
				CvwWH_Inventory objCvwWH_Inventory = new CvwWH_Inventory();
				objCvwWH_Inventory.GetListPaging(pPageSize, pPageNumber, pWhereClause + (WebSecurity.CurrentUserName == "BG EGYPT" ? (" AND CustomerName=N'" + WebSecurity.CurrentUserName) + "'" : ""), pOrderBy, out _RowCount);
				var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
				return new object[] {
				new JavaScriptSerializer().Serialize(objCvwWH_Inventory.lstCVarvwWH_Inventory)
				, _RowCount
				, new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pData[2]
                , serializer.Serialize(objCvwPurchaseItem.lstCVarvwPurchaseItem) //pData[3]
                , serializer.Serialize(pCustomerList) //pData[4]
                , serializer.Serialize(pLocationList) //pData[5]
            };
			}
           
        }

        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, bool pIsShowSerial, bool pHasRequest=false)
        {
            int _RowCount = 0;
            Exception checkException = null;
			if(pHasRequest)
			{
				CvwWH_Inventory_rpt objCvwWH_Inventory_rpt = new CvwWH_Inventory_rpt();
				CvwWH_InventoryBySerial_rpt CvwWH_InventoryBySerial_rpt = new CvwWH_InventoryBySerial_rpt();
				if (pIsShowSerial)
					checkException = CvwWH_InventoryBySerial_rpt.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
				else
					checkException = objCvwWH_Inventory_rpt.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

				var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
				return new object[] {
				pIsShowSerial ? serializer.Serialize(CvwWH_InventoryBySerial_rpt.lstCVarvwWH_InventoryBySerial_rpt)
							  : serializer.Serialize(objCvwWH_Inventory_rpt.lstCVarvwWH_Inventory_rpt)
				, _RowCount
			};
			}
			else
			{
				CvwWH_Inventory objCvwWH_Inventory = new CvwWH_Inventory();
				CvwWH_InventoryWithSerial objCvwWH_InventoryWithSerial = new CvwWH_InventoryWithSerial();
				if (pIsShowSerial)
					checkException = objCvwWH_InventoryWithSerial.GetListPaging(pPageSize, pPageNumber, pWhereClause + (WebSecurity.CurrentUserName == "BG EGYPT" ? (" AND CustomerName=N'" + WebSecurity.CurrentUserName) + "'" : ""), pOrderBy, out _RowCount);
				else
					checkException = objCvwWH_Inventory.GetListPaging(pPageSize, pPageNumber, pWhereClause + (WebSecurity.CurrentUserName == "BG EGYPT" ? (" AND CustomerName=N'" + WebSecurity.CurrentUserName) + "'" : ""), pOrderBy, out _RowCount);
				var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
				return new object[] {
				pIsShowSerial ? serializer.Serialize(objCvwWH_InventoryWithSerial.lstCVarvwWH_InventoryWithSerial)
							  : serializer.Serialize(objCvwWH_Inventory.lstCVarvwWH_Inventory)
				, _RowCount
			};
			}
          
        }

    }
}
