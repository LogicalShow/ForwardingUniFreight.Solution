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
    public class JVTypesController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CA_JVTypes objCA_JVTypes = new CA_JVTypes();
            objCA_JVTypes.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCA_JVTypes.lstCVarA_JVTypes)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName)
        {
            bool _result = false;

            CVarA_JVTypes objCVarA_JVTypes = new CVarA_JVTypes();

            objCVarA_JVTypes.Name = pName.ToUpper();
            objCVarA_JVTypes.USER_ID = WebSecurity.CurrentUserId;

            CA_JVTypes objCA_JVTypes = new CA_JVTypes();
            objCA_JVTypes.lstCVarA_JVTypes.Add(objCVarA_JVTypes);
            Exception checkException = objCA_JVTypes.SaveMethod(objCA_JVTypes.lstCVarA_JVTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                //CallCustomizedSP
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JVTypes", objCVarA_JVTypes.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName)
        {
            bool _result = false;

            CVarA_JVTypes objCVarA_JVTypes = new CVarA_JVTypes();

            objCVarA_JVTypes.ID = pID;
            objCVarA_JVTypes.Name = pName.ToUpper();
            objCVarA_JVTypes.USER_ID = WebSecurity.CurrentUserId;

            CA_JVTypes objCA_JVTypes = new CA_JVTypes();
            objCA_JVTypes.lstCVarA_JVTypes.Add(objCVarA_JVTypes);
            Exception checkException = objCA_JVTypes.SaveMethod(objCA_JVTypes.lstCVarA_JVTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JVTypes", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pJVTypesIDs)
        {
            bool _result = true;
            CA_JVTypes objCA_JVTypes = new CA_JVTypes();
            Exception checkException = null;
            foreach (var currentID in pJVTypesIDs.Split(','))
            {
                objCA_JVTypes.lstDeletedCPKA_JVTypes.Add(new CPKA_JVTypes() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCA_JVTypes.DeleteItem(objCA_JVTypes.lstDeletedCPKA_JVTypes);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JVTypes", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }

    }
}
