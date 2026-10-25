using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Customized;
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
	public class WH_ItemKittingController : ApiController
	{
		[HttpGet, HttpPost]
		public object LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
		{
			int _RowCount = 0;


			CWH_ItemKitting objCWH_ItemKitting = new CWH_ItemKitting();
			objCWH_ItemKitting.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var items = new List<SelectListOption>();
			if (pIsLoadArrayOfObjects)
			{
				items.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select ID, Name, LocalName from PurchaseItem"
				   , typeof(SelectListOption)).Cast<SelectListOption>());
			}

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				serializer.Serialize(objCWH_ItemKitting.lstCVarWH_ItemKitting)
				, _RowCount
				,  serializer.Serialize(items)
			};
		}

		[HttpGet, HttpPost]
		public object LoadDetails(string pWhereClause)
		{
			CWH_ItemKittingDetails objCWH_ItemKittingDetails = new CWH_ItemKittingDetails();
			objCWH_ItemKittingDetails.GetList(pWhereClause);
			var serializer = new JavaScriptSerializer();
			return new { Data = serializer.Serialize(objCWH_ItemKittingDetails.lstCVarWH_ItemKittingDetails) };
		}

		[HttpGet, HttpPost]
		public object Save(ItemKitting pKitting)
		{
			Exception checkException = null;
			if (pKitting == null)
			{
				checkException = new Exception("No Data To Save");
				return new { Result = false, Exception = checkException };
			}
			CWH_ItemKitting objCWH_ItemKitting = new CWH_ItemKitting();
			if (pKitting.ID > 0)
				objCWH_ItemKitting.GetItem(pKitting.ID);

			if (objCWH_ItemKitting.lstCVarWH_ItemKitting.Count == 0)
				objCWH_ItemKitting.lstCVarWH_ItemKitting.Add(new CVarWH_ItemKitting());

			objCWH_ItemKitting.lstCVarWH_ItemKitting[0].ItemID = pKitting.ItemID;
			objCWH_ItemKitting.lstCVarWH_ItemKitting[0].Name = pKitting.Name;
			objCWH_ItemKitting.lstCVarWH_ItemKitting[0].LocalName = pKitting.LocalName;
			objCWH_ItemKitting.lstCVarWH_ItemKitting[0].Notes = pKitting.Notes;
			objCWH_ItemKitting.lstCVarWH_ItemKitting[0].DateFrom = pKitting.DateFrom;
			objCWH_ItemKitting.lstCVarWH_ItemKitting[0].DateTo = pKitting.DateTo;

			if(pKitting.ID>0)
			{
				objCWH_ItemKitting.lstCVarWH_ItemKitting[0].ModificationDate = DateTime.Now;
				objCWH_ItemKitting.lstCVarWH_ItemKitting[0].ModificatorUserID = WebSecurity.CurrentUserId;
			}
			else
			{
				objCWH_ItemKitting.lstCVarWH_ItemKitting[0].CreationDate = objCWH_ItemKitting.lstCVarWH_ItemKitting[0].ModificationDate = DateTime.Now;
				objCWH_ItemKitting.lstCVarWH_ItemKitting[0].CreatorUserID = objCWH_ItemKitting.lstCVarWH_ItemKitting[0].ModificatorUserID = WebSecurity.CurrentUserId;
			}

			Common.Common.ReplaceNull(objCWH_ItemKitting.lstCVarWH_ItemKitting[0]);
			checkException = objCWH_ItemKitting.SaveMethod(objCWH_ItemKitting.lstCVarWH_ItemKitting);

			if (checkException == null)
			{
				CWH_ItemKittingDetails objCWH_ItemKittingDetails = new CWH_ItemKittingDetails();

				pKitting.ID = objCWH_ItemKitting.lstCVarWH_ItemKitting[0].ID;

				var DetailIDs = string.Join(",", pKitting.Details.Select(a => a.ID));
				checkException = objCWH_ItemKittingDetails.DeleteList($"where MasterID={pKitting.ID} and ID not in ({DetailIDs})");

				foreach (var item in pKitting.Details)
				{
					objCWH_ItemKittingDetails.lstCVarWH_ItemKittingDetails.Add(new CVarWH_ItemKittingDetails {
						ID=item.ID,
						DetailItemID = item.DetailItemID,
						MasterID = pKitting.ID,
						Qty=item.Qty
					});
					Common.Common.ReplaceNull(objCWH_ItemKittingDetails.lstCVarWH_ItemKittingDetails[objCWH_ItemKittingDetails.lstCVarWH_ItemKittingDetails.Count - 1]);
				}
				checkException = objCWH_ItemKittingDetails.SaveMethod(objCWH_ItemKittingDetails.lstCVarWH_ItemKittingDetails);
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
			CWH_ItemKitting objCWH_ItemKitting = new CWH_ItemKitting();
			foreach (var currentID in pIDs.Split(','))
			{
				objCWH_ItemKitting.lstDeletedCPKWH_ItemKitting.Add(new CPKWH_ItemKitting() { ID = Int32.Parse(currentID.Trim()) });
			}

			Exception checkException = objCWH_ItemKitting.DeleteItem(objCWH_ItemKitting.lstDeletedCPKWH_ItemKitting);
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
