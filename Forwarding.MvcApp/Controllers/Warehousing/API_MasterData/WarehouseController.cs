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
    public class WarehouseController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(string pWhereClause)
        {
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            objCWH_Warehouse.GetList(pWhereClause);

            return new object[] { new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            
            CWH_MainWarehouses objCWH_MainWarehouses = new CWH_MainWarehouses();
            if (pIsLoadArrayOfObjects)
            {
                objCWH_MainWarehouses.GetListPaging(999999, 1, pWhereClause, pOrderBy, out _RowCount);
            }
            CvwWH_Warehouse objCvwWH_Warehouse = new CvwWH_Warehouse();
            objCvwWH_Warehouse.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Warehouse.lstCVarvwWH_Warehouse)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCWH_MainWarehouses.lstCVarWH_MainWarehouses) //pMainWarehouse = pData[2];
            };
        }
        
        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName, string pPhone, string pFax, string pAddress, string pNotes,string pMainWarehouseID,string pWarehouseType,bool pIsAir)
        {
            bool _result = false;

            CVarWH_Warehouse objCVarWH_Warehouse = new CVarWH_Warehouse();

            objCVarWH_Warehouse.Code = pCode;
            objCVarWH_Warehouse.Name = pName;
            objCVarWH_Warehouse.LocalName = pName;
            objCVarWH_Warehouse.Phone = pPhone;
            objCVarWH_Warehouse.Fax = pFax;
            objCVarWH_Warehouse.Address = pAddress;
            objCVarWH_Warehouse.Notes = pNotes;
            objCVarWH_Warehouse.MainWarehouseID = int.Parse(pMainWarehouseID);
            objCVarWH_Warehouse.WarehouseType = int.Parse(pWarehouseType);
            objCVarWH_Warehouse.IsAir = pIsAir;

            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            objCWH_Warehouse.lstCVarWH_Warehouse.Add(objCVarWH_Warehouse);
            Exception checkException = objCWH_Warehouse.SaveMethod(objCWH_Warehouse.lstCVarWH_Warehouse);
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
        public bool Update(Int32 pID, string pCode, string pName, string pPhone, string pFax, string pAddress, string pNotes, string pMainWarehouseID, string pWarehouseType,bool pIsAir)
        {
            bool _result = false;

            CVarWH_Warehouse objCVarWH_Warehouse = new CVarWH_Warehouse();

            objCVarWH_Warehouse.ID = pID;
            objCVarWH_Warehouse.Code = pCode;
            objCVarWH_Warehouse.Name = pName;
            objCVarWH_Warehouse.LocalName = pName;
            objCVarWH_Warehouse.Phone = pPhone;
            objCVarWH_Warehouse.Fax = pFax;
            objCVarWH_Warehouse.Address = pAddress;
            objCVarWH_Warehouse.Notes = pNotes;
            objCVarWH_Warehouse.MainWarehouseID = int.Parse(pMainWarehouseID);
            objCVarWH_Warehouse.WarehouseType = int.Parse(pWarehouseType);
            objCVarWH_Warehouse.IsAir = pIsAir;

            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            objCWH_Warehouse.lstCVarWH_Warehouse.Add(objCVarWH_Warehouse);
            Exception checkException = objCWH_Warehouse.SaveMethod(objCWH_Warehouse.lstCVarWH_Warehouse);
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
        public bool Delete(String pWarehouseIDs)
        {
            bool _result = true;
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            Exception checkException = null;
            foreach (var currentID in pWarehouseIDs.Split(','))
            {
                objCWH_Warehouse.lstDeletedCPKWH_Warehouse.Add(new CPKWH_Warehouse() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCWH_Warehouse.DeleteItem(objCWH_Warehouse.lstDeletedCPKWH_Warehouse);
                if (checkException != null)
                    _result = false;
            }

            return _result;
        }

    }
}
