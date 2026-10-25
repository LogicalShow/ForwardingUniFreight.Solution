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
    public class FreightGroupController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
          
            CFrightGroup objCFreightGroup = new CFrightGroup();
            objCFreightGroup.GetList(pWhereClause);
          
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCFreightGroup.lstCVarFrightGroup) };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            CFrightGroup objCFreightGroup = new CFrightGroup();
            objCFreightGroup.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);


            return new object[] {
                new JavaScriptSerializer().Serialize(objCFreightGroup.lstCVarFrightGroup)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName)
        {
            bool _result = false;

            CVarFrightGroup  objCVarFreightGroup =  new CVarFrightGroup();
            objCVarFreightGroup.Code = pCode;
            objCVarFreightGroup.Name = pName;
            CFrightGroup  objCFreightGroup = new CFrightGroup();
            objCFreightGroup.lstCVarFrightGroup.Add(objCVarFreightGroup);
            Exception checkException = objCFreightGroup.SaveMethod(objCFreightGroup.lstCVarFrightGroup);
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
        public bool Update(Int32 pID, string pCode, string pName)
        {
            bool _result = false;

            CVarChargeTypeGroup objCVarChargeTypeGroup = new CVarChargeTypeGroup();
            CVarFrightGroup objCVarFreightGroup = new CVarFrightGroup();

            objCVarFreightGroup.ID = pID;
            objCVarFreightGroup.Code = pCode;
            objCVarFreightGroup.Name = pName;

            CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
            CFrightGroup objCFreightGroup = new CFrightGroup();

            objCFreightGroup.lstCVarFrightGroup.Add(objCVarFreightGroup);
            Exception checkException = objCFreightGroup.SaveMethod(objCFreightGroup.lstCVarFrightGroup);
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
        public bool Delete(String pFreightGroupIDs)
        {
            bool _result = true;
            CFrightGroup objCFreightGroup = new CFrightGroup();
            Exception checkException = null;
            foreach (var currentID in pFreightGroupIDs.Split(','))
            {
                objCFreightGroup.lstDeletedCPKFrightGroup.Add(new CPKFrightGroup() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCFreightGroup.DeleteItem(objCFreightGroup.lstDeletedCPKFrightGroup);
                if (checkException != null)
                    _result = false;
            }

            return _result;
        }

    }
}
