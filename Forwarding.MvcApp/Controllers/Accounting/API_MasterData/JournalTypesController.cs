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
    public class JournalTypesController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            objCA_JournalTypes.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCA_JournalTypes.lstCVarA_JournalTypes)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName)
        {
            bool _result = false;

            CVarA_JournalTypes objCVarA_JournalTypes = new CVarA_JournalTypes();

            objCVarA_JournalTypes.Name = pName.ToUpper();
            objCVarA_JournalTypes.USER_ID = WebSecurity.CurrentUserId;

            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            objCA_JournalTypes.lstCVarA_JournalTypes.Add(objCVarA_JournalTypes);
            Exception checkException = objCA_JournalTypes.SaveMethod(objCA_JournalTypes.lstCVarA_JournalTypes);
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
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JournalTypes", objCVarA_JournalTypes.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName)
        {
            bool _result = false;

            CVarA_JournalTypes objCVarA_JournalTypes = new CVarA_JournalTypes();

            objCVarA_JournalTypes.ID = pID;
            objCVarA_JournalTypes.Name = pName.ToUpper();
            objCVarA_JournalTypes.USER_ID = WebSecurity.CurrentUserId;

            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            objCA_JournalTypes.lstCVarA_JournalTypes.Add(objCVarA_JournalTypes);
            Exception checkException = objCA_JournalTypes.SaveMethod(objCA_JournalTypes.lstCVarA_JournalTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JournalTypes", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pJournalTypesIDs)
        {
            bool _result = true;
            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            Exception checkException = null;
            foreach (var currentID in pJournalTypesIDs.Split(','))
            {
                objCA_JournalTypes.lstDeletedCPKA_JournalTypes.Add(new CPKA_JournalTypes() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCA_JournalTypes.DeleteItem(objCA_JournalTypes.lstDeletedCPKA_JournalTypes);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JournalTypes", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }

    }
}
