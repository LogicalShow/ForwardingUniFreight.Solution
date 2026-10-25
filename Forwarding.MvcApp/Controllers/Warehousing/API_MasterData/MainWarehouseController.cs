using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_MasterData
{
    public class MainWarehouseController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CWH_MainWarehouses objCWH_MainWarehouse = new CWH_MainWarehouses();
            objCWH_MainWarehouse.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCWH_MainWarehouse.lstCVarWH_MainWarehouses)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName, string pAddress, string pNotes)
        {
            bool _result = false;

            CVarWH_MainWarehouses objCVarWH_MainWarehouse = new CVarWH_MainWarehouses();

            objCVarWH_MainWarehouse.Code = pCode;
            objCVarWH_MainWarehouse.Name = pName;
            objCVarWH_MainWarehouse.LocalName = pName;

            objCVarWH_MainWarehouse.Address = pAddress;
            objCVarWH_MainWarehouse.Notes = pNotes;

            CWH_MainWarehouses objCWH_MainWarehouse = new CWH_MainWarehouses();
            objCWH_MainWarehouse.lstCVarWH_MainWarehouses.Add(objCVarWH_MainWarehouse);
            Exception checkException = objCWH_MainWarehouse.SaveMethod(objCWH_MainWarehouse.lstCVarWH_MainWarehouses);
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
        public bool Update(Int32 pID, string pCode, string pName, string pAddress, string pNotes)
        {
            bool _result = false;

            CVarWH_MainWarehouses objCVarWH_MainWarehouse = new CVarWH_MainWarehouses();

            objCVarWH_MainWarehouse.ID = pID;
            objCVarWH_MainWarehouse.Code = pCode;
            objCVarWH_MainWarehouse.Name = pName;
            objCVarWH_MainWarehouse.LocalName = pName;
            objCVarWH_MainWarehouse.Address = pAddress;
            objCVarWH_MainWarehouse.Notes = pNotes;

            CWH_MainWarehouses objCWH_MainWarehouse = new CWH_MainWarehouses();
            objCWH_MainWarehouse.lstCVarWH_MainWarehouses.Add(objCVarWH_MainWarehouse);
            Exception checkException = objCWH_MainWarehouse.SaveMethod(objCWH_MainWarehouse.lstCVarWH_MainWarehouses);
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
        public bool Delete(String pMainWarehouseIDs)
        {
            bool _result = true;
            CWH_MainWarehouses objCWH_MainWarehouse = new CWH_MainWarehouses();
            Exception checkException = null;
            foreach (var currentID in pMainWarehouseIDs.Split(','))
            {
                objCWH_MainWarehouse.lstDeletedCPKWH_MainWarehouses.Add(new CPKWH_MainWarehouses() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCWH_MainWarehouse.DeleteItem(objCWH_MainWarehouse.lstDeletedCPKWH_MainWarehouses);
                if (checkException != null)
                    _result = false;
            }

            return _result;
        }

    }
}
