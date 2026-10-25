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
    public class SuppliersOtherController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CSuppliersOther objCSuppliersOther = new CSuppliersOther();
            objCSuppliersOther.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCSuppliersOther.lstCVarSuppliersOther)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName, string pLocalName, string pAddress, string pNotes)
        {
            bool _result = false;

            CVarSuppliersOther objCVarSuppliersOther = new CVarSuppliersOther();

            objCVarSuppliersOther.Name = pName;
            objCVarSuppliersOther.LocalName = pLocalName;
            objCVarSuppliersOther.Address = pAddress;
            objCVarSuppliersOther.Notes = pNotes;



            CSuppliersOther objCSuppliersOther = new CSuppliersOther();
            objCSuppliersOther.lstCVarSuppliersOther.Add(objCVarSuppliersOther);
            Exception checkException = objCSuppliersOther.SaveMethod(objCSuppliersOther.lstCVarSuppliersOther);
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
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SuppliersOther", objCVarSuppliersOther.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName, string pLocalName, string pAddress, string pNotes)
        {
            bool _result = false;

            CVarSuppliersOther objCVarSuppliersOther = new CVarSuppliersOther();

            objCVarSuppliersOther.ID = pID;
            objCVarSuppliersOther.Name = pName;
            objCVarSuppliersOther.LocalName = pLocalName;
            objCVarSuppliersOther.Address = pAddress;
            objCVarSuppliersOther.Notes = pNotes;

            CSuppliersOther objCSuppliersOther = new CSuppliersOther();
            objCSuppliersOther.lstCVarSuppliersOther.Add(objCVarSuppliersOther);
            Exception checkException = objCSuppliersOther.SaveMethod(objCSuppliersOther.lstCVarSuppliersOther);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SuppliersOther", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pSuppliersOtherIDs)
        {
            bool _result = true;
            CSuppliersOther objCSuppliersOther = new CSuppliersOther();
            Exception checkException = null;
            foreach (var currentID in pSuppliersOtherIDs.Split(','))
            {
                objCSuppliersOther.lstDeletedCPKSuppliersOther.Add(new CPKSuppliersOther() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCSuppliersOther.DeleteItem(objCSuppliersOther.lstDeletedCPKSuppliersOther);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SuppliersOther", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }

    }
}
