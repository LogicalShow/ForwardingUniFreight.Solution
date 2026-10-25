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
    public class JVDefaultsController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            //   CJVDefaults objCJVDefaults = new CJVDefaults();
            // objCJVDefaults.GetListPaging(pPageSize, pPageNumber, "where 1=1", "TransTypeID", out _RowCount);
            CvwJVDefaults objCvwJVDefaults = new CvwJVDefaults();
            objCvwJVDefaults.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);

            CA_JVTypes objCA_JVTypes = new CA_JVTypes();
            objCA_JVTypes.GetList("Where 1=1");

            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            objCA_JournalTypes.GetList("Where 1=1");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                 serializer.Serialize(objCvwJVDefaults.lstCVarvwJVDefaults)
                    , _RowCount
               , serializer.Serialize(objCA_JVTypes.lstCVarA_JVTypes)
               , serializer.Serialize(objCA_JournalTypes.lstCVarA_JournalTypes)

            };
        }
        [HttpGet, HttpPost]
        public bool Insert(String pTransTypeName, Int32 pJournalTypeID, Int32 pJVTypeID)
        {
            bool _result = false;

            CVarJVDefaults objCVarJVDefaults = new CVarJVDefaults();

            objCVarJVDefaults.JournalTypeID = pJournalTypeID;
            objCVarJVDefaults.JVTypeID = pJVTypeID;

            CJVDefaults objCJVDefaults = new CJVDefaults();
            objCJVDefaults.lstCVarJVDefaults.Add(objCVarJVDefaults);
            Exception checkException = objCJVDefaults.SaveMethod(objCJVDefaults.lstCVarJVDefaults);
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
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "JVDefaults", objCVarJVDefaults.TransTypeID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, String pTransTypeName, Int32 pJournalTypeID, Int32 pJVTypeID)
        {
            bool _result = false;

            CVarJVDefaults objCVarJVDefaults = new CVarJVDefaults();

            objCVarJVDefaults.TransTypeID = pID;
            objCVarJVDefaults.JournalTypeID = pJournalTypeID;
            objCVarJVDefaults.JVTypeID = pJVTypeID;
            objCVarJVDefaults.TransTypeName = pTransTypeName;

            CJVDefaults objCJVDefaults = new CJVDefaults();
            objCJVDefaults.lstCVarJVDefaults.Add(objCVarJVDefaults);
            Exception checkException = objCJVDefaults.SaveMethod(objCJVDefaults.lstCVarJVDefaults);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "JVDefaults", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pJVTypesIDs)
        {
            bool _result = true;
            CJVDefaults objCJVDefaults = new CJVDefaults();
            Exception checkException = null;
            foreach (var currentID in pJVTypesIDs.Split(','))
            {
                objCJVDefaults.lstDeletedCPKJVDefaults.Add(new CPKJVDefaults() { TransTypeID = Int32.Parse(currentID.Trim()) });
                checkException = objCJVDefaults.DeleteItem(objCJVDefaults.lstDeletedCPKJVDefaults);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "JVDefaults", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }
    }
}
