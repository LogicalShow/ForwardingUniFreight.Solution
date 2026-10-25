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
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
	public class WH_TransServicesController : ApiController
	{
		[HttpGet, HttpPost]
		public object LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, bool pHasRequest)
		{
			if(pHasRequest)
			{
				int _RowCount = 0;

				CvwWH_TransServices objCvwWH_TransServices = new CvwWH_TransServices();
				objCvwWH_TransServices.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
				var services = new List<Service>();
				var warehouses = new List<CVarWH_Warehouse>();
				if (pIsLoadArrayOfObjects)
				{
					services.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select ID, Name, Cost, Selling, CalcTypeID, CalcTypeName from vwWH_Services", typeof(Service)).Cast<Service>());
					warehouses.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select ID, Name from WH_Warehouse", typeof(CVarWH_Warehouse)).Cast<CVarWH_Warehouse>());
				}

				var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

				return new object[] {
				serializer.Serialize(objCvwWH_TransServices.lstCVarvwWH_TransServices)
				, _RowCount
				,  serializer.Serialize(services)
				,  serializer.Serialize(warehouses)
			};
			}
			else
			{
				int _RowCount = 0;

				CvwWH_TransForServices objCvwWH_TransForServices = new CvwWH_TransForServices();
				objCvwWH_TransForServices.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
				var services = new List<Service>();
				if (pIsLoadArrayOfObjects)
				{
					services.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select ID, Name, Cost, Selling, CalcTypeID, CalcTypeName from vwWH_Services"
					   , typeof(Service)).Cast<Service>());
				}

				var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

				return new object[] {
				serializer.Serialize(objCvwWH_TransForServices.lstCVarvwWH_TransForServices)
				, _RowCount
				,  serializer.Serialize(services)
			};
			}
		
		}

		[HttpGet, HttpPost]
		public object LoadTransServices(string pWhereClause)
		{
			CvwWH_TransServices objCvwWH_TransServices = new CvwWH_TransServices();
			objCvwWH_TransServices.GetList(pWhereClause);
			var serializer = new JavaScriptSerializer();
			return new { Data = serializer.Serialize(objCvwWH_TransServices.lstCVarvwWH_TransServices) };
		}

		[HttpGet, HttpPost]
		public object LoadOrders(string pWhereClause)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			
			var orders = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select * from (select concat('r-',ID) Name,Code,WarehouseID,CustomerID,OwnerID from WH_Receive where IsFinalized=1 union all select concat('p-',ID) Name,Code,WarehouseID,CustomerID,OwnerID from WH_Pickup where IsFinalized=1) as o {pWhereClause}", typeof(SelectListOption)).Cast<SelectListOption>();

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return serializer.Serialize(orders);
		}

		[HttpGet, HttpPost]
		public object Save([FromBody]TransService pTransService)
		{
			Exception checkException = null;
			if (pTransService == null|| pTransService.Details==null || pTransService.Details.Count==0)
			{
				checkException = new Exception("No Data To Save");
				return new { Result = false, Exception = checkException };
			}
			CWH_TransServices objCWH_TransServices = new CWH_TransServices();

			if (pTransService.HasRequest)
			{

				foreach (var detail in pTransService.Details)
				{
					objCWH_TransServices.lstCVarWH_TransServices.Add(new CVarWH_TransServices
					{
						TransSourceID = detail.TransSourceID,
						Direction = detail.Direction,
						ServiceID = detail.ServiceID,
						Quantity = detail.Quantity,
						Notes = pTransService.Notes,
						CreationDate = DateTime.Now,
						CreatorUserID = WebSecurity.CurrentUserId
					});
					Common.Common.ReplaceNull(objCWH_TransServices.lstCVarWH_TransServices[objCWH_TransServices.lstCVarWH_TransServices.Count - 1]);
				}

				checkException = objCWH_TransServices.SaveMethod(objCWH_TransServices.lstCVarWH_TransServices);
			}
			else
			{
				int TransSourceID = pTransService.Details[0].TransSourceID;
				int Direction = pTransService.Details[0].Direction;

				CWH_InvoiceDetails objCWH_InvoiceDetails = new CWH_InvoiceDetails();
				objCWH_InvoiceDetails.GetList($"where {(Direction == 1 ? "ReceiveID" : "PickupID")} = {TransSourceID}");
				if (objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails.Count > 0)
				{
					checkException = new Exception("This Transaction Is Invoiced");
					return new { Result = false, Exception = checkException };
				}

				string IDs = string.Join(",", pTransService.Details.Select(a => a.ID));
				checkException = objCWH_TransServices.DeleteList($"where TransSourceID = {TransSourceID} and Direction = {Direction} and ID not in ({IDs})");

				foreach (var detail in pTransService.Details)
				{
					objCWH_TransServices.lstCVarWH_TransServices.Add(new CVarWH_TransServices
					{
						ID = detail.ID,
						TransSourceID = TransSourceID,
						Direction = Direction,
						ServiceID = detail.ServiceID,
						ServiceCost = detail.ServiceCost,
						ServiceSelling = detail.ServiceSelling,
						Quantity = detail.Quantity,
						Notes = detail.Notes,
						CreationDate = DateTime.Now,
						CreatorUserID = WebSecurity.CurrentUserId
					});
					Common.Common.ReplaceNull(objCWH_TransServices.lstCVarWH_TransServices[objCWH_TransServices.lstCVarWH_TransServices.Count - 1]);
				}

				checkException = objCWH_TransServices.SaveMethod(objCWH_TransServices.lstCVarWH_TransServices);
			}
	

			return new {
                 Result = checkException==null
				,Exception = checkException
			};
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)
        {
            bool _result = false;
			CWH_TransServices objCWH_TransServices = new CWH_TransServices();
            foreach (var currentID in pIDs.Split(','))
            {
				objCWH_TransServices.lstDeletedCPKWH_TransServices.Add(new CPKWH_TransServices() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_TransServices.DeleteItem(objCWH_TransServices.lstDeletedCPKWH_TransServices);
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
	
}
