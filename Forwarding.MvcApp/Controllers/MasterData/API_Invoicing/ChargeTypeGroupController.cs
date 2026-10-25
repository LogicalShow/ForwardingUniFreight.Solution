using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{ 
    public class ChargeTypeGroupController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
            objCChargeTypeGroup.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCChargeTypeGroup.lstCVarChargeTypeGroup) };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
            objCChargeTypeGroup.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCChargeTypeGroup.lstCVarChargeTypeGroup)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName, string pNotes)
        {
            bool _result = false;

            CVarChargeTypeGroup objCVarChargeTypeGroup = new CVarChargeTypeGroup();

            objCVarChargeTypeGroup.Code = pCode;
            objCVarChargeTypeGroup.Name = pName;
            objCVarChargeTypeGroup.Notes = pNotes;

            CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
            objCChargeTypeGroup.lstCVarChargeTypeGroup.Add(objCVarChargeTypeGroup);
            Exception checkException = objCChargeTypeGroup.SaveMethod(objCChargeTypeGroup.lstCVarChargeTypeGroup);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, string pNotes)
        {
            bool _result = false;

            CVarChargeTypeGroup objCVarChargeTypeGroup = new CVarChargeTypeGroup();

            objCVarChargeTypeGroup.ID = pID;
            objCVarChargeTypeGroup.Code = pCode;
            objCVarChargeTypeGroup.Name = pName;
            objCVarChargeTypeGroup.Notes = pNotes;

            CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
            objCChargeTypeGroup.lstCVarChargeTypeGroup.Add(objCVarChargeTypeGroup);
            Exception checkException = objCChargeTypeGroup.SaveMethod(objCChargeTypeGroup.lstCVarChargeTypeGroup);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pChargeTypeGroupIDs)
        {
            bool _result = true;
            CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
            Exception checkException = null;
            foreach (var currentID in pChargeTypeGroupIDs.Split(','))
            {
                objCChargeTypeGroup.lstDeletedCPKChargeTypeGroup.Add(new CPKChargeTypeGroup() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCChargeTypeGroup.DeleteItem(objCChargeTypeGroup.lstDeletedCPKChargeTypeGroup);
                if (checkException != null)
                    _result = false;
            }

            return _result;
        }

    }
}
