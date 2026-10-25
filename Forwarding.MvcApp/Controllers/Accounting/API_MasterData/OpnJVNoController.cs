using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_MasterData
{
    public class OpnJVNoController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CA_OpnJVNo objCA_OpnJVNo = new CA_OpnJVNo();
            objCA_OpnJVNo.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCA_OpnJVNo.lstCVarA_OpnJVNo)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, Int32 pFiscal_Year_ID)
        {
            bool _result = false;

            CVarA_OpnJVNo objCVarA_OpnJVNo = new CVarA_OpnJVNo();

            objCVarA_OpnJVNo.ID = pID;
            objCVarA_OpnJVNo.Code = pCode;
            objCVarA_OpnJVNo.Name = pName;
            objCVarA_OpnJVNo.Fiscal_Year_ID = pFiscal_Year_ID;

            CA_OpnJVNo objCA_OpnJVNo = new CA_OpnJVNo();
            objCA_OpnJVNo.lstCVarA_OpnJVNo.Add(objCVarA_OpnJVNo);
            Exception checkException = objCA_OpnJVNo.SaveMethod(objCA_OpnJVNo.lstCVarA_OpnJVNo);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_OpnJVNo", pID, "U");
            }
            return _result;
        }
        
    }
}
