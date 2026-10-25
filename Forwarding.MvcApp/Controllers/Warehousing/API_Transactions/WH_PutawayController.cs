using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Transactions
{
	public class WH_PutawayController : ApiController
	{
		[HttpGet, HttpPost]
		public object LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
		{
			int _RowCount = 0;

			CvwWH_PutawayDetails objCvwWH_PutawayDetails = new CvwWH_PutawayDetails();
			objCvwWH_PutawayDetails.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);


			CWH_Receive objCWH_Receive = new CWH_Receive();
			if(pIsLoadArrayOfObjects)
				objCWH_Receive.GetList($"where ID in (select distinct ReceiveID from vwWH_PalletToPutaway) Order By ID desc");

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				serializer.Serialize(objCvwWH_PutawayDetails.lstCVarvwWH_PutawayDetails)
				, _RowCount
				, serializer.Serialize(objCWH_Receive.lstCVarWH_Receive)
			};
		}
		

		[HttpGet, HttpPost]
		public object LoadDetails(int pPutawayID)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var locations = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code from vwWH_RowLocation where WarehouseID=(select WarehouseID from WH_Receive where ID=(select ReceiveID from WH_Putaway where ID={pPutawayID}))", typeof(SelectListOption)).Cast<SelectListOption>();

			CvwWH_PutawayDetails objCvwWH_PutawayDetails = new CvwWH_PutawayDetails();
			objCvwWH_PutawayDetails.GetList($"where PutawayID={pPutawayID}");
			
			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new
			{
				Details = serializer.Serialize(objCvwWH_PutawayDetails.lstCVarvwWH_PutawayDetails),
				Locations = serializer.Serialize(locations)
			};
		}

		[HttpGet, HttpPost]
		public object LoadReceiveDetails(string pWhereClause, string pWhereClauseLocations)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			
			var details = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select OwnerName, WarehouseName, PalletID, LocationID ReceiveLocationID, LocationCode ReceiveLocationCode from vwWH_PalletToPutaway {pWhereClause}", typeof(PutawayDetail)).Cast<PutawayDetail>();
			var locations = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code from vwWH_RowLocation {pWhereClauseLocations}", typeof(SelectListOption)).Cast<SelectListOption>();

			var serializer = new JavaScriptSerializer { MaxJsonLength=int.MaxValue};
			return new { Details = serializer.Serialize(details),
				Locations = serializer.Serialize(locations)
			};
		}

		[HttpGet, HttpPost]
		public object Save(Putaway pPutaway)
		{
			Exception checkException = null;
			if (pPutaway == null || pPutaway.Details == null || pPutaway.Details.Count == 0)
			{
				checkException = new Exception("No Data To Save");
				return new { Result = false, Exception = checkException };
			}

			CWH_Putaway objCWH_Putaway = new CWH_Putaway();
			if (pPutaway.ID > 0)
				objCWH_Putaway.GetItem(pPutaway.ID);
			if (objCWH_Putaway.lstCVarWH_Putaway.Count == 0)
				objCWH_Putaway.lstCVarWH_Putaway.Add(new CVarWH_Putaway());

			objCWH_Putaway.lstCVarWH_Putaway[0].ID = pPutaway.ID;
			objCWH_Putaway.lstCVarWH_Putaway[0].ReceiveID = pPutaway.ReceiveID;

			if(pPutaway.ID>0)
			{
				objCWH_Putaway.lstCVarWH_Putaway[0].ModificatorUserID = WebSecurity.CurrentUserId;
				objCWH_Putaway.lstCVarWH_Putaway[0].ModificationDate = DateTime.Now;
			}
			else
			{
				objCWH_Putaway.lstCVarWH_Putaway[0].CreatorUserID = objCWH_Putaway.lstCVarWH_Putaway[0].ModificatorUserID = WebSecurity.CurrentUserId;
				objCWH_Putaway.lstCVarWH_Putaway[0].CreationDate = objCWH_Putaway.lstCVarWH_Putaway[0].ModificationDate = DateTime.Now;
			}
			Common.Common.ReplaceNull(objCWH_Putaway.lstCVarWH_Putaway[0]);
			checkException = objCWH_Putaway.SaveMethod(objCWH_Putaway.lstCVarWH_Putaway);
			if(checkException==null)
			{
				pPutaway.ID = objCWH_Putaway.lstCVarWH_Putaway[0].ID;

				CWH_PutawayDetails objCWH_PutawayDetails = new CWH_PutawayDetails();
				var IDs = string.Join(",", pPutaway.Details.Select(a => a.ID));
				checkException = objCWH_PutawayDetails.DeleteList($"where PutawayID={pPutaway.ID} and ID not in ({IDs})");

				foreach (var item in pPutaway.Details)
				{
					objCWH_PutawayDetails.lstCVarWH_PutawayDetails.Add(new CVarWH_PutawayDetails
					{
						ID = item.ID,
						PutawayID = pPutaway.ID,
						PalletID = item.PalletID,
						ReceiveLocationID = item.ReceiveLocationID,
						PutawayLocationID = item.PutawayLocationID,
						CreationDate = DateTime.Now,
						CreatorUserID = WebSecurity.CurrentUserId
					});
					Common.Common.ReplaceNull(objCWH_PutawayDetails.lstCVarWH_PutawayDetails[objCWH_PutawayDetails.lstCVarWH_PutawayDetails.Count - 1]);
				}
				checkException = objCWH_PutawayDetails.SaveMethod(objCWH_PutawayDetails.lstCVarWH_PutawayDetails);

				if (checkException == null)
				{
					StringBuilder str = new StringBuilder();
					foreach (var item in pPutaway.Details)
					{
						str.AppendLine($"update WH_ItemBalance set ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), LocationID={item.PutawayLocationID} where PalletID='{item.PalletID}' and LocationID={item.ReceiveLocationID};");
					}
						WH_ItemBalance itemBalance = new WH_ItemBalance();
						var ex = itemBalance.Update(str.ToString());
				}

			}
			

			return new {
                 Result = checkException==null
				,Exception = checkException
			};
        }

   

		
    }
	
	public class Putaway
	{
		public int ID { get; set; }
		public int ReceiveID { get; set; }
		public int UserID { get; set; }
		public List<PutawayDetail> Details { get; set; }
	}
	public class PutawayDetail
	{
		public int ID { get; set; }
		public string PalletID { get; set; }
		public int ReceiveLocationID { get; set; }
		public string ReceiveLocationCode { get; set; }
		public int PutawayLocationID { get; set; }
		public string PutawayLocationCode { get; set; }
		//
		public long ReceiveID { get; set; }
		public string ReceiveCode { get; set; }
		public int WarehouseID { get; set; }
		public string WarehouseName { get; set; }
		public string CustomerName { get; set; }
		public string OwnerName { get; set; }

	}
}
