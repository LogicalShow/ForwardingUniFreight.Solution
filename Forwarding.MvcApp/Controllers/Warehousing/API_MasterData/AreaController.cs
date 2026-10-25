using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_MasterData
{
    public class AreaController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
            //var constLengthUnitTypeID = 10;
            var constWeightUnitTypeID = 20;
            //var constAreaUnitTypeID = 30;
            var constVolumeUnitTypeID = 40;
            //var constTemperatureUnitTypeID = 50;
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CvwWH_Area objCWH_Area = new CvwWH_Area();
            if (pIsLoadArrayOfObjects)
            {
                objCWH_Warehouse.GetList("ORDER BY Code");
                objCvwNoAccessUnit.GetList("ORDER BY Code");
            }
            var objCWeightUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constWeightUnitTypeID);
            var objCVolumeUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constVolumeUnitTypeID);

            objCWH_Area.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            
            return new object[] {
                new JavaScriptSerializer().Serialize(objCWH_Area.lstCVarvwWH_Area)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse = pData[2];
                , new JavaScriptSerializer().Serialize(objCWeightUnit) //pWeightUnit = pData[3];
                , new JavaScriptSerializer().Serialize(objCVolumeUnit) //pVolumeUnit = pData[4];
            };
        }
        
        [HttpGet, HttpPost]
        public bool Insert(string pName, Int32 pWarehouseID, Int32 pWeightUnitID, Int32 pVolumeUnitID, bool pIsDefault)
        {
            bool _result = false;

            CWH_Area objCWH_Area = new CWH_Area();
			if (pIsDefault)
			{
				objCWH_Area.UpdateList($"IsDefault=0 where WarehouseID={pWarehouseID}");
			}
			CVarWH_Area objCVarWH_Area = new CVarWH_Area();

            objCVarWH_Area.Name = pName;
            objCVarWH_Area.WarehouseID = pWarehouseID;
            objCVarWH_Area.WeightUnitID = pWeightUnitID;
            objCVarWH_Area.VolumeUnitID = pVolumeUnitID;
            objCVarWH_Area.IsDefault = pIsDefault;

            objCWH_Area.lstCVarWH_Area.Add(objCVarWH_Area);
            Exception checkException = objCWH_Area.SaveMethod(objCWH_Area.lstCVarWH_Area);
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
        public bool Update(Int32 pID, string pName, Int32 pWarehouseID, Int32 pWeightUnitID, Int32 pVolumeUnitID, bool pIsDefault)
		{
            bool _result = false;

            CWH_Area objCWH_Area = new CWH_Area();
			if(pIsDefault)
			{
				objCWH_Area.UpdateList($"IsDefault=0 where WarehouseID={pWarehouseID}");
			}
            CVarWH_Area objCVarWH_Area = new CVarWH_Area();
            objCVarWH_Area.ID = pID;
            objCVarWH_Area.Name = pName;
            objCVarWH_Area.WarehouseID = pWarehouseID;
            objCVarWH_Area.WeightUnitID = pWeightUnitID;
            objCVarWH_Area.VolumeUnitID = pVolumeUnitID;
            objCVarWH_Area.IsDefault = pIsDefault;

            objCWH_Area.lstCVarWH_Area.Add(objCVarWH_Area);
            Exception checkException = objCWH_Area.SaveMethod(objCWH_Area.lstCVarWH_Area);
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
        public bool Delete(String pAreaIDs)
        {
            bool _result = true;
            CWH_Area objCWH_Area = new CWH_Area();
            Exception checkException = null;
            foreach (var currentID in pAreaIDs.Split(','))
            {
                objCWH_Area.lstDeletedCPKWH_Area.Add(new CPKWH_Area() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCWH_Area.DeleteItem(objCWH_Area.lstDeletedCPKWH_Area);
                if (checkException != null)
                    _result = false;
            }

            return _result;
        }

    }
}
