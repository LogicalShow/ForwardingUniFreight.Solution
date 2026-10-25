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
    public class Wh_ServicesController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
           
			CWH_Services objCWH_Services = new CWH_Services();
			
			Exception checkException = objCWH_Services.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

			var calcTypes = new List<SelectListOption>();
			var chargeTypes = new List<SelectListOption>();
			if (pIsLoadArrayOfObjects)
			{
				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

				calcTypes.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID, Name FROM WH_CalculationTypes"
				   , typeof(SelectListOption)).Cast<SelectListOption>());

				chargeTypes.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID, Name FROM ChargeTypes Order By Name"
				   , typeof(SelectListOption)).Cast<SelectListOption>());
			}

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				serializer.Serialize(objCWH_Services.lstCVarWH_Services)
                , _RowCount
				,serializer.Serialize(calcTypes)
				,serializer.Serialize(chargeTypes)
            };
        }
		
        [HttpGet, HttpPost]
        public object Save(int pID, string pName, string pNameLocal, decimal pCost, decimal pSelling, int pCalcTypeID, int pChargeTypeID)
        {
			CWH_Services objCWH_Services = new CWH_Services();

			if (pID > 0)
				objCWH_Services.GetItem(pID);

			if (objCWH_Services.lstCVarWH_Services.Count == 0)
				objCWH_Services.lstCVarWH_Services.Add(new CVarWH_Services());

			objCWH_Services.lstCVarWH_Services[0].Name = pName;
			objCWH_Services.lstCVarWH_Services[0].NameLocal = pNameLocal;
			objCWH_Services.lstCVarWH_Services[0].Cost = pCost;
			objCWH_Services.lstCVarWH_Services[0].Selling = pSelling;
			objCWH_Services.lstCVarWH_Services[0].CalcTypeID = pCalcTypeID;
			objCWH_Services.lstCVarWH_Services[0].ChargeTypeID = pChargeTypeID;

			if(pID>0)
			{
				objCWH_Services.lstCVarWH_Services[0].ModificationDate = DateTime.Now;
				objCWH_Services.lstCVarWH_Services[0].ModificatorUserID = WebSecurity.CurrentUserId;
			}
			else
			{
				objCWH_Services.lstCVarWH_Services[0].CreationDate = objCWH_Services.lstCVarWH_Services[0].ModificationDate = DateTime.Now;
				objCWH_Services.lstCVarWH_Services[0].CreatorUserID = WebSecurity.CurrentUserId;
			}
			Exception checkException = objCWH_Services.SaveMethod(objCWH_Services.lstCVarWH_Services);
			pID = objCWH_Services.lstCVarWH_Services[0].ID;

			return new {
                 ID = pID
				,Exception = checkException
			};
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)
        {
            bool _result = false;
			CWH_Services objCWH_Services = new CWH_Services();
            foreach (var currentID in pIDs.Split(','))
            {
				objCWH_Services.lstDeletedCPKWH_Services.Add(new CPKWH_Services() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_Services.DeleteItem(objCWH_Services.lstDeletedCPKWH_Services);
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
