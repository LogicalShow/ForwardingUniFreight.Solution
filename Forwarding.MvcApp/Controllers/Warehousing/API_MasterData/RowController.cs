using ExcelDataReader;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_MasterData
{
    public class RowController : ApiController
    {
        #region Row

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CNoAccessLocationStatus objCNoAccessLocationStatus = new CNoAccessLocationStatus();
            CNoAccessLocationPickupMethod objCNoAccessLocationPickupMethod = new CNoAccessLocationPickupMethod();
            CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
            var constLengthUnitTypeID = 10;
            var constWeightUnitTypeID = 20;
            //var constAreaUnitTypeID = 30;
            var constVolumeUnitTypeID = 40;
            //var constTemperatureUnitTypeID = 50;
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CvwWH_Area objCWH_Area = new CvwWH_Area();
            if (pIsLoadArrayOfObjects)
            {
                objCWH_Warehouse.GetList("ORDER BY Name");
                objCvwNoAccessUnit.GetList("ORDER BY Code");
                objCNoAccessLocationStatus.GetList("ORDER BY Name");
                objCNoAccessLocationPickupMethod.GetList("ORDER BY Name");
                if (objCWH_Warehouse.lstCVarWH_Warehouse.Count == 1)
                    objCWH_Area.GetList("ORDER BY Name");
            }
            var objCWeightUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constWeightUnitTypeID);
            var objCVolumeUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constVolumeUnitTypeID);
            var objCLengthUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constLengthUnitTypeID);

            CvwWH_Row objCvwWH_Row = new CvwWH_Row();
            objCvwWH_Row.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Row.lstCVarvwWH_Row)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse = pData[2];
                , new JavaScriptSerializer().Serialize(objCWeightUnit) //pWeightUnit = pData[3];
                , new JavaScriptSerializer().Serialize(objCVolumeUnit) //pVolumeUnit = pData[4];
                , new JavaScriptSerializer().Serialize(objCNoAccessLocationStatus.lstCVarNoAccessLocationStatus) //pLocationStatus = pData[5];
                , new JavaScriptSerializer().Serialize(objCNoAccessLocationPickupMethod.lstCVarNoAccessLocationPickupMethod) //pLocationPickupMethod = pData[6];
                , new JavaScriptSerializer().Serialize(objCWH_Area.lstCVarvwWH_Area) //pArea = pData[7];
                , new JavaScriptSerializer().Serialize(objCLengthUnit) //pLengthUnit = pData[8];
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int32 pHeaderID)
        {
            CvwWH_Row objCvwWH_Row = new CvwWH_Row();
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            CvwWH_Area objCvwWH_Area = new CvwWH_Area();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCvwWH_Row.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID.ToString(), "Name", out _RowCount);
            checkException = objCvwWH_Area.GetListPaging(99999, 1, "WHERE WarehouseID=" + objCvwWH_Row.lstCVarvwWH_Row[0].WarehouseID, "Name", out _RowCount);
            checkException = objCvwWH_RowLocation.GetListPaging(99999, 1, "WHERE RowID=" + pHeaderID.ToString(), "Code", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Row.lstCVarvwWH_Row[0]) //pData[0]
                , serializer.Serialize(objCvwWH_RowLocation.lstCVarvwWH_RowLocation) //pData[1]
                , serializer.Serialize(objCvwWH_Area.lstCVarvwWH_Area) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save(Int32 pID, string pName, Int32 pAreaID, Int32 pNumberOfLevelsPerRow, Int32 pNumberOfTraysPerLevel
            , decimal pLocationLength, decimal pLocationWidth, Int32 pLengthUnitID
            , decimal pMaxWeight, Int32 pWeightUnitID, decimal pMaxVolume, Int32 pVolumeUnitID
            , Int32 pStatusID, Int32 pPickupMethodID, Int32 pWarehouseID, bool pUploadManually)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            CWH_Row objCWH_Row = new CWH_Row();
            CvwWH_Row objCvwWH_Row = new CvwWH_Row();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            CVarWH_Row objCVarWH_Row = new CVarWH_Row();
            int _RowCount = 0;
            #region check Uniquess for GBL as i removed the constraint
            CvwWH_Row objCvwWH_Row_tmp = new CvwWH_Row();
            string pWhereClause = "";
            if (pID == 0)
                pWhereClause = "WHERE Name=N'" + pName + "' AND WarehouseID=" + pWarehouseID;
            else
            {
                pWhereClause = "WHERE Name=N'" + pName + "' AND WarehouseID=" + pWarehouseID + " AND ID<>" + pID;
            }
            checkException = objCvwWH_Row_tmp.GetList(pWhereClause);
            if (objCvwWH_Row_tmp.lstCVarvwWH_Row.Count > 0)
                _ReturnedMessage = "Sorry, uniqueness violated.";
            #endregion check Uniquess for GBL as i removed the constraint
            if (_ReturnedMessage == "")
            {
                #region Insert
                if (pID == 0) //Insert
                {
                    objCVarWH_Row.Name = pName;
                    objCVarWH_Row.AreaID = pAreaID;
                    objCVarWH_Row.NumberOfLevelsPerRow = pNumberOfLevelsPerRow;
                    objCVarWH_Row.NumberOfTraysPerLevel = pNumberOfTraysPerLevel;
                    objCVarWH_Row.LocationLength = pLocationLength;
                    objCVarWH_Row.LocationWidth = pLocationWidth;
                    objCVarWH_Row.LengthUnitID = pLengthUnitID;
                    objCVarWH_Row.MaxWeight = pMaxWeight;
                    objCVarWH_Row.WeightUnitID = pWeightUnitID;
                    objCVarWH_Row.MaxVolume = pMaxVolume;
                    objCVarWH_Row.VolumeUnitID = pVolumeUnitID;
                    objCVarWH_Row.CreatorUserID = objCVarWH_Row.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_Row.CreationDate = objCVarWH_Row.ModificationDate = DateTime.Now;
                    objCWH_Row.lstCVarWH_Row.Add(objCVarWH_Row);
                    checkException = objCWH_Row.SaveMethod(objCWH_Row.lstCVarWH_Row);
                    if (checkException == null)
                    {
                        objCvwWH_Row.GetListPaging(999999, 1, "WHERE ID=" + objCVarWH_Row.ID, "ID", out _RowCount);
						if (!pUploadManually)
						{
							for (int _levelNo = 0; _levelNo < pNumberOfLevelsPerRow; _levelNo++)
							{
								for (int _trayNo = 0; _trayNo < pNumberOfTraysPerLevel; _trayNo++)
								{
									CVarWH_RowLocation objCVarWH_RowLocation = new CVarWH_RowLocation();
									objCVarWH_RowLocation.RowID = objCVarWH_Row.ID;
									objCVarWH_RowLocation.LevelNumber = (_levelNo + 1).ToString();
									objCVarWH_RowLocation.TrayNumber = (_trayNo + 1).ToString();
									objCVarWH_RowLocation.Code = //pName + "-" + objCVarWH_RowLocation.LevelNumber + "-" + objCVarWH_RowLocation.TrayNumber;
										(objCvwWH_Row.lstCVarvwWH_Row[0].MainWarehouseID == 0 ? "" : objCvwWH_Row.lstCVarvwWH_Row[0].MainWarehouseCode)
									+ (objCvwWH_Row.lstCVarvwWH_Row[0].WarehouseID == 0 ? "" : ((objCvwWH_Row.lstCVarvwWH_Row[0].MainWarehouseID == 0 ? "" : "-") + objCvwWH_Row.lstCVarvwWH_Row[0].WarehouseCode))
									+ "-" + objCvwWH_Row.lstCVarvwWH_Row[0].AreaName
									+ "-" + pName + "-" + objCVarWH_RowLocation.LevelNumber + (pNumberOfTraysPerLevel > 1 ? ("-" + objCVarWH_RowLocation.TrayNumber) : "");
									objCVarWH_RowLocation.LocationLength = pLocationLength;
									objCVarWH_RowLocation.LocationWidth = pLocationWidth;
									objCVarWH_RowLocation.LengthUnitID = pLengthUnitID;
									objCVarWH_RowLocation.MaxWeight = pMaxWeight;
									objCVarWH_RowLocation.WeightUnitID = pWeightUnitID;
									objCVarWH_RowLocation.MaxVolume = pMaxVolume;
									objCVarWH_RowLocation.VolumeUnitID = pVolumeUnitID;
									objCVarWH_RowLocation.StatusID = (pStatusID == 0 ? 10 : pStatusID);
									objCVarWH_RowLocation.PickupMethodID = pPickupMethodID;
									objCVarWH_RowLocation.CreatorUserID = objCVarWH_RowLocation.ModificatorUserID = WebSecurity.CurrentUserId;
									objCVarWH_RowLocation.CreationDate = objCVarWH_RowLocation.ModificationDate = DateTime.Now;
									objCWH_RowLocation.lstCVarWH_RowLocation.Add(objCVarWH_RowLocation);
								} //for (int _trayNo = 0; _trayNo < pNumberOfTraysPerLevel; _trayNo++)
							} //for (int _levelNo = 0; _levelNo < pNumberOfLevelsPerRow; _levelNo++)
							checkException = objCWH_RowLocation.SaveMethod(objCWH_RowLocation.lstCVarWH_RowLocation);
						}
					
                        if (checkException == null)
                        {
                            pID = objCVarWH_Row.ID;
                        }
                        else
                            _ReturnedMessage = checkException.Message;
                    }
                    else
                        _ReturnedMessage = checkException.Message;
                }
                #endregion Insert
                #region Update
                else //update
                {
                    objCVarWH_Row.ID = pID;
                    objCVarWH_Row.Name = pName;
                    objCVarWH_Row.AreaID = pAreaID;
                    objCVarWH_Row.NumberOfLevelsPerRow = pNumberOfLevelsPerRow;
                    objCVarWH_Row.NumberOfTraysPerLevel = pNumberOfTraysPerLevel;
                    objCVarWH_Row.LocationLength = pLocationLength;
                    objCVarWH_Row.LocationWidth = pLocationWidth;
                    objCVarWH_Row.LengthUnitID = pLengthUnitID;
                    objCVarWH_Row.MaxWeight = pMaxWeight;
                    objCVarWH_Row.WeightUnitID = pWeightUnitID;
                    objCVarWH_Row.MaxVolume = pMaxVolume;
                    objCVarWH_Row.VolumeUnitID = pVolumeUnitID;
                    objCVarWH_Row.CreatorUserID = objCVarWH_Row.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_Row.CreationDate = objCVarWH_Row.ModificationDate = DateTime.Now;
                    objCWH_Row.lstCVarWH_Row.Add(objCVarWH_Row);
                    checkException = objCWH_Row.SaveMethod(objCWH_Row.lstCVarWH_Row);
                    if (checkException != null)
                        _ReturnedMessage = checkException.Message;
                }
                #endregion Update
            }
            checkException = objCvwWH_RowLocation.GetListPaging(99999, 1, "WHERE RowID=" + pID, "Code", out _RowCount);
            return new object[] {
                _ReturnedMessage
                , pID //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_RowLocation.lstCVarvwWH_RowLocation) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pRowIDs)
        {
            bool _result = false;
            CWH_Row objCWH_Row = new CWH_Row();
            foreach (var currentID in pRowIDs.Split(','))
            {
                objCWH_Row.lstDeletedCPKWH_Row.Add(new CPKWH_Row() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_Row.DeleteItem(objCWH_Row.lstDeletedCPKWH_Row);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] Row_Copy(Int32 pRowToCopyID, string pNewRowName)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            CvwWH_Row objCvwWH_Row = new CvwWH_Row();
            CWH_Row objCWH_Row = new CWH_Row();

            #region Check Uniqueness For GBL because the constaint is removed from GBL
            checkException = objCvwWH_Row.GetListPaging(999999, 1, "WHERE ID=" + pRowToCopyID, "ID", out _RowCount);
            checkException = objCvwWH_Row.GetListPaging(999999, 1, "WHERE Name=N'" + pNewRowName + "' AND WarehouseID=" + objCvwWH_Row.lstCVarvwWH_Row[0].WarehouseID, "ID", out _RowCount);
            if (objCvwWH_Row.lstCVarvwWH_Row.Count > 0)
                _MessageReturned = "Sorry, uniqueness violated.";
            #endregion Check Uniqueness For GBL
            #region Copy
            else if (_MessageReturned == "")
            {
                #region Add Header
                checkException = objCvwWH_Row.GetListPaging(999999, 1, "WHERE ID=" + pRowToCopyID, "ID", out _RowCount);
                CVarWH_Row objCVarWH_Row = new CVarWH_Row();
                objCVarWH_Row.Name = pNewRowName;
                objCVarWH_Row.AreaID = objCvwWH_Row.lstCVarvwWH_Row[0].AreaID;
                objCVarWH_Row.NumberOfLevelsPerRow = objCvwWH_Row.lstCVarvwWH_Row[0].NumberOfLevelsPerRow;
                objCVarWH_Row.NumberOfTraysPerLevel = objCvwWH_Row.lstCVarvwWH_Row[0].NumberOfTraysPerLevel;
                objCVarWH_Row.MaxWeight = objCvwWH_Row.lstCVarvwWH_Row[0].MaxWeight;
                objCVarWH_Row.WeightUnitID = objCvwWH_Row.lstCVarvwWH_Row[0].WeightUnitID;
                objCVarWH_Row.MaxVolume = objCvwWH_Row.lstCVarvwWH_Row[0].MaxVolume;
                objCVarWH_Row.VolumeUnitID = objCvwWH_Row.lstCVarvwWH_Row[0].VolumeUnitID;
                objCVarWH_Row.CreatorUserID = objCVarWH_Row.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_Row.CreationDate = objCVarWH_Row.ModificationDate = DateTime.Now;
                objCVarWH_Row.LocationLength = objCvwWH_Row.lstCVarvwWH_Row[0].LocationLength;
                objCVarWH_Row.LocationWidth = objCvwWH_Row.lstCVarvwWH_Row[0].LocationWidth;
                objCVarWH_Row.LengthUnitID = objCvwWH_Row.lstCVarvwWH_Row[0].LengthUnitID;
                CWH_Row objCWH_Row_temp = new CWH_Row();
                objCWH_Row.lstCVarWH_Row.Add(objCVarWH_Row);
                checkException = objCWH_Row.SaveMethod(objCWH_Row.lstCVarWH_Row);
                if (checkException != null)
                    _MessageReturned = checkException.Message;
                #endregion Add Header
                #region Add Locations
                if (_MessageReturned == "")
                {
                    CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
                    CWH_RowLocation objCWH_RowLocation_ToSave = new CWH_RowLocation();
                    checkException = objCWH_RowLocation.GetListPaging(999999, 1, "WHERE RowID=" + pRowToCopyID, "ID", out _RowCount);
                    for (int i = 0; i < objCWH_RowLocation.lstCVarWH_RowLocation.Count; i++)
                    {
                        CVarWH_RowLocation objCVarWH_RowLocation = new CVarWH_RowLocation();
                        objCVarWH_RowLocation.RowID = objCVarWH_Row.ID;
                        objCVarWH_RowLocation.LevelNumber = objCWH_RowLocation.lstCVarWH_RowLocation[i].LevelNumber;
                        objCVarWH_RowLocation.TrayNumber = objCWH_RowLocation.lstCVarWH_RowLocation[i].TrayNumber;
                        objCVarWH_RowLocation.Code = //pName + "-" + objCWH_RowLocation.lstCVarWH_RowLocation[i].LevelNumber + "-" + objCWH_RowLocation.lstCVarWH_RowLocation[i].TrayNumber;
                                    (objCvwWH_Row.lstCVarvwWH_Row[0].MainWarehouseID == 0 ? "" : objCvwWH_Row.lstCVarvwWH_Row[0].MainWarehouseCode)
                                + (objCvwWH_Row.lstCVarvwWH_Row[0].WarehouseID == 0 ? "" : ((objCvwWH_Row.lstCVarvwWH_Row[0].MainWarehouseID == 0 ? "" : "-") + objCvwWH_Row.lstCVarvwWH_Row[0].WarehouseCode))
                                + "-" + objCvwWH_Row.lstCVarvwWH_Row[0].AreaName
                                + "-" + pNewRowName + "-" + objCWH_RowLocation.lstCVarWH_RowLocation[i].LevelNumber + (objCvwWH_Row.lstCVarvwWH_Row[0].NumberOfTraysPerLevel > 1 ? ("-" + objCWH_RowLocation.lstCVarWH_RowLocation[i].TrayNumber) : "");
                        objCVarWH_RowLocation.MaxWeight = objCWH_RowLocation.lstCVarWH_RowLocation[i].MaxWeight;
                        objCVarWH_RowLocation.WeightUnitID = objCWH_RowLocation.lstCVarWH_RowLocation[i].WeightUnitID;
                        objCVarWH_RowLocation.MaxVolume = objCWH_RowLocation.lstCVarWH_RowLocation[i].MaxVolume;
                        objCVarWH_RowLocation.VolumeUnitID = objCWH_RowLocation.lstCVarWH_RowLocation[i].VolumeUnitID;
                        objCVarWH_RowLocation.StatusID = 0;
                        objCVarWH_RowLocation.PickupMethodID = objCWH_RowLocation.lstCVarWH_RowLocation[i].PickupMethodID;
                        objCVarWH_RowLocation.CreatorUserID = objCVarWH_RowLocation.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarWH_RowLocation.CreationDate = objCVarWH_RowLocation.ModificationDate = DateTime.Now;
                        objCVarWH_RowLocation.IsUsed = false;
                        objCVarWH_RowLocation.LocationLength = objCWH_RowLocation.lstCVarWH_RowLocation[i].LocationLength;
                        objCVarWH_RowLocation.LocationWidth = objCWH_RowLocation.lstCVarWH_RowLocation[i].LocationWidth;
                        objCWH_RowLocation_ToSave.lstCVarWH_RowLocation.Add(objCVarWH_RowLocation);
                    }
                    checkException = objCWH_RowLocation_ToSave.SaveMethod(objCWH_RowLocation_ToSave.lstCVarWH_RowLocation);
                }
                #endregion Add Locations
            }
            #endregion Copy
            return new object[]
            {
                _MessageReturned
            };
        }
        #endregion Row

        #region RowLocation
        [HttpGet, HttpPost]
        public object[] RowLocation_LoadAll(string pRowLocationWhereClause, string pOrderBy)
        {
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCvwWH_RowLocation.GetListPaging(999999, 1, pRowLocationWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwWH_RowLocation.lstCVarvwWH_RowLocation)
            };
        }

        [HttpGet, HttpPost]
        public object[] RowLocation_LoadAllWithMinimalColumns(string pRowLocationWhereClauseWithMinimalColumns, string pOrderBy, Int32 pWarehouseID)
        {
            CvwWH_RowLocationWithMinimalColumns objCvwWH_RowLocation = new CvwWH_RowLocationWithMinimalColumns();
            CWH_Area objCWH_Area = new CWH_Area();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCWH_Area.GetListPaging(999999, 1, "WHERE WarehouseID=" + pWarehouseID, "Name", out _RowCount);
            checkException = objCvwWH_RowLocation.GetListPaging(999999, 1, pRowLocationWhereClauseWithMinimalColumns, pOrderBy, out _RowCount);
            var pLocationList = objCvwWH_RowLocation.lstCVarvwWH_RowLocationWithMinimalColumns
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.Code
					,
					IsDefault=s.IsDefault
                })
                //.Distinct()
                .OrderBy(o => o.Code).ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(pLocationList)
                , new JavaScriptSerializer().Serialize(objCWH_Area.lstCVarWH_Area)
            };
        }
        
        [HttpGet, HttpPost]
        public object[] RowLocation_Export(string pRowLocationWhereClause_Export, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            checkException = objCvwWH_RowLocation.GetListPaging(999999, 1, pRowLocationWhereClause_Export, pOrderBy, out _RowCount);
            var pRowLocationList = objCvwWH_RowLocation.lstCVarvwWH_RowLocation
                //.GroupBy(g => g.ReceiveID)
                .Select(s => new
                {
                    WarehouseName = s.WarehouseName
                    ,
                    AreaName = s.AreaName
                    ,
                    RowName = s.RowName
                    ,
                    LocationCode = s.Code
                }).ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(pRowLocationList)
            };
        }

        [HttpGet,HttpPost]
        public object[] RowLocation_ApplyToLocations(Int32 pRowID, string pSelectedRowLocationIDs
            , decimal pLocationLength, decimal pLocationWidth, Int32 pLengthUnitID
            , decimal pMaxWeight, Int32 pWeightUnitID, decimal pMaxVolume, Int32 pVolumeUnitID, Int32 pStatusID, Int32 pPickupMethodID)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            Int32 _RowCount = 0;
            string _UpdateClause = "";
            _UpdateClause = pMaxWeight == 0 ? "MaxWeight=null" : ("MaxWeight=" + pMaxWeight) + " \n";
            _UpdateClause += pWeightUnitID == 0 ? ",WeightUnitID=null" : (",WeightUnitID=" + pWeightUnitID) + " \n";
            _UpdateClause += pMaxVolume == 0 ? ",MaxVolume=null" : (",MaxVolume=" + pMaxVolume) + " \n";
            _UpdateClause += pVolumeUnitID == 0 ? ",VolumeUnitID=null" : (",VolumeUnitID=" + pVolumeUnitID) + " \n";
            _UpdateClause += pLocationLength == 0 ? ",LocationLength=null" : (",LocationLength=" + pLocationLength) + " \n";
            _UpdateClause += pLocationWidth == 0 ? ",LocationWidth=null" : (",LocationWidth=" + pLocationWidth) + " \n";
            _UpdateClause += pLengthUnitID == 0 ? ",LengthUnitID=null" : (",LengthUnitID=" + pLengthUnitID) + " \n";
            _UpdateClause += pStatusID == 0 ? ",StatusID=10" : (",StatusID=" + pStatusID) + " \n";
            _UpdateClause += pPickupMethodID == 0 ? ",PickupMethodID=null" : (",PickupMethodID=" + pPickupMethodID) + " \n";
            _UpdateClause += ",ModificatorUserID=" + WebSecurity.CurrentUserId.ToString();
            _UpdateClause += ",ModificationDate=GETDATE()" + " \n";
            _UpdateClause += "WHERE ID IN(" + pSelectedRowLocationIDs + ")" + " \n";
            checkException = objCWH_RowLocation.UpdateList(_UpdateClause);
            if (checkException == null)
                objCvwWH_RowLocation.GetListPaging(99999, 1, "WHERE RowID=" + pRowID.ToString(), "Code", out _RowCount);
            else
                _ReturnedMessage = checkException.Message;
            return new object[] {
                _ReturnedMessage
                , new JavaScriptSerializer().Serialize(objCvwWH_RowLocation.lstCVarvwWH_RowLocation) //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] RowLocation_Save(Int32 pRowLocationID, Int32 pRowID, string pCode, string pLevelNumber, string pTrayNumber
            , decimal pLocationLength, decimal pLocationWidth, Int32 pLengthUnitID
            , decimal pMaxWeight, Int32 pWeightUnitID, decimal pMaxVolume, Int32 pVolumeUnitID, Int32 pStatusID
            , Int32 pPickupMethodID, decimal pMaxHeat, int pTypeID, bool pIsDefault)
		{
            string _ReturnedMessage = "";
            Exception checkException = null;
            CVarWH_RowLocation objCVarWH_RowLocation = new CVarWH_RowLocation();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            int _RowCount = 0;

            #region check Uniquess
            CvwWH_Row objCvwWH_Row_temp = new CvwWH_Row();
            checkException = objCvwWH_Row_temp.GetListPaging(1, 1, "WHERE ID=" + pRowID, "ID", out _RowCount);
            CvwWH_RowLocation objCvwWH_RowLocation_tmp = new CvwWH_RowLocation();
            string pWhereClause = "";
            if (pRowLocationID == 0)
                pWhereClause = "WHERE Code=N'" + pCode + "' AND WarehouseID=" + objCvwWH_Row_temp.lstCVarvwWH_Row[0].WarehouseID;
            else
            {
                pWhereClause = "WHERE Code=N'" + pCode + "' AND WarehouseID=" + objCvwWH_Row_temp.lstCVarvwWH_Row[0].WarehouseID + " AND ID<>" + pRowLocationID;
            }
            checkException = objCvwWH_RowLocation_tmp.GetList(pWhereClause);
            if (objCvwWH_RowLocation_tmp.lstCVarvwWH_RowLocation.Count > 0)
                _ReturnedMessage = "Sorry, uniqueness violated.";
            #endregion check Uniquess

            if (_ReturnedMessage == "")
            {
				if (pIsDefault)
				{
					objCWH_RowLocation.UpdateList($"IsDefault=0 where TypeID={pTypeID} and RowID in (select ID from WH_Row where AreaID = (select AreaID from WH_Row where ID={pRowID}))");
				}

				objCVarWH_RowLocation.ID = pRowLocationID;
                objCVarWH_RowLocation.RowID = pRowID;
                objCVarWH_RowLocation.Code = pCode;
                objCVarWH_RowLocation.LevelNumber = pLevelNumber;
                objCVarWH_RowLocation.TrayNumber = pTrayNumber;
                objCVarWH_RowLocation.LocationLength = pLocationLength;
                objCVarWH_RowLocation.LocationWidth = pLocationWidth;
                objCVarWH_RowLocation.LengthUnitID = pLengthUnitID;
                objCVarWH_RowLocation.MaxWeight = pMaxWeight;
                objCVarWH_RowLocation.WeightUnitID = pWeightUnitID;
                objCVarWH_RowLocation.MaxVolume = pMaxVolume;
                objCVarWH_RowLocation.VolumeUnitID = pVolumeUnitID;
                objCVarWH_RowLocation.StatusID = (pStatusID == 0 ? 10 : pStatusID);
                objCVarWH_RowLocation.PickupMethodID = pPickupMethodID;
                objCVarWH_RowLocation.MaxHeat = pMaxHeat;
                objCVarWH_RowLocation.TypeID = pTypeID;
                objCVarWH_RowLocation.IsDefault = pIsDefault;
                if (pRowLocationID != 0) //update so save original creator & creation date
                {
                    CWH_RowLocation objCGetCreationInformation = new CWH_RowLocation();
                    objCGetCreationInformation.GetItem(pRowLocationID);
                    objCVarWH_RowLocation.CreatorUserID = objCGetCreationInformation.lstCVarWH_RowLocation[0].CreatorUserID;
                    objCVarWH_RowLocation.CreationDate = objCGetCreationInformation.lstCVarWH_RowLocation[0].CreationDate;
                    objCVarWH_RowLocation.IsUsed = objCGetCreationInformation.lstCVarWH_RowLocation[0].IsUsed;
                }
                else
                {
                    objCVarWH_RowLocation.CreatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_RowLocation.CreationDate = DateTime.Now;
                    objCVarWH_RowLocation.IsUsed = false;
                }
                objCVarWH_RowLocation.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_RowLocation.ModificationDate = DateTime.Now;

                objCWH_RowLocation.lstCVarWH_RowLocation.Add(objCVarWH_RowLocation);
                checkException = objCWH_RowLocation.SaveMethod(objCWH_RowLocation.lstCVarWH_RowLocation);
                checkException = objCvwWH_RowLocation.GetList("WHERE RowID=" + pRowID.ToString() + " ORDER BY Code");
            } //if (_ReturnedMessage != "")
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                _ReturnedMessage
                , serializer.Serialize(objCvwWH_RowLocation.lstCVarvwWH_RowLocation)
            };
        }

        [HttpGet, HttpPost]
        public object[] RowLocation_DefaultLocations(Int32 pRestoredRowID, string pName, Int32 pAreaID
            , Int32 pNumberOfLevelsPerRow, Int32 pNumberOfTraysPerLevel
            , decimal pLocationLength, decimal pLocationWidth, Int32 pLengthUnitID
            , decimal pMaxWeight, Int32 pWeightUnitID
            , decimal pMaxVolume, Int32 pVolumeUnitID, Int32 pStatusID, Int32 pPickupMethodID)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            CVarWH_Row objCVarWH_Row = new CVarWH_Row();
            CWH_Row objCWH_Row = new CWH_Row();
            CvwWH_Row objCvwWH_Row = new CvwWH_Row();
            int _RowCount = 0;
            //TODO: check if Row Location is used
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "UNF")
            {
                checkException = objCWH_RowLocation.DeleteList("WHERE RowID=" + pRestoredRowID);
            }

            if (checkException == null)
            {
                #region UpdateRestored Row Header
                objCVarWH_Row.ID = pRestoredRowID;
                objCVarWH_Row.Name = pName;
                objCVarWH_Row.AreaID = pAreaID;
                objCVarWH_Row.NumberOfLevelsPerRow = pNumberOfLevelsPerRow;
                objCVarWH_Row.NumberOfTraysPerLevel = pNumberOfTraysPerLevel;
                objCVarWH_Row.LocationLength = pLocationLength;
                objCVarWH_Row.LocationWidth = pLocationWidth;
                objCVarWH_Row.LengthUnitID = pLengthUnitID;
                objCVarWH_Row.MaxWeight = pMaxWeight;
                objCVarWH_Row.WeightUnitID = pWeightUnitID;
                objCVarWH_Row.MaxVolume = pMaxVolume;
                objCVarWH_Row.VolumeUnitID = pVolumeUnitID;
                objCVarWH_Row.CreatorUserID = objCVarWH_Row.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_Row.CreationDate = objCVarWH_Row.ModificationDate = DateTime.Now;
                objCWH_Row.lstCVarWH_Row.Add(objCVarWH_Row);
                checkException = objCWH_Row.SaveMethod(objCWH_Row.lstCVarWH_Row);
                if (checkException == null)
                {
                    checkException = objCvwWH_Row.GetListPaging(99999, 1, "WHERE ID=" + pRestoredRowID, "Name", out _RowCount);
                    checkException = objCvwWH_RowLocation.GetListPaging(99999, 1, "WHERE RowID=" + pRestoredRowID, "Code", out _RowCount);
                }
                else
                    _ReturnedMessage = checkException.Message;
                #endregion UpdateRestored Row Header

                for (int _levelNo = 0; _levelNo < pNumberOfLevelsPerRow; _levelNo++)
                {
                    for (int _trayNo = 0; _trayNo < pNumberOfTraysPerLevel; _trayNo++)
                    {
                        CVarWH_RowLocation objCVarWH_RowLocation = new CVarWH_RowLocation();
                        objCVarWH_RowLocation.RowID = pRestoredRowID;
                        objCVarWH_RowLocation.LevelNumber = (_levelNo + 1).ToString();
                        objCVarWH_RowLocation.TrayNumber = (_trayNo + 1).ToString();
                        objCVarWH_RowLocation.Code = 
                            (objCvwWH_Row.lstCVarvwWH_Row[0].MainWarehouseID == 0 ? "" : objCvwWH_Row.lstCVarvwWH_Row[0].MainWarehouseCode)
                            + (objCvwWH_Row.lstCVarvwWH_Row[0].WarehouseID == 0 ? "" : ((objCvwWH_Row.lstCVarvwWH_Row[0].MainWarehouseID == 0 ? "" : "-") + objCvwWH_Row.lstCVarvwWH_Row[0].WarehouseCode))
                            + "-" + objCvwWH_Row.lstCVarvwWH_Row[0].AreaName
                            + "-" + pName + "-" + objCVarWH_RowLocation.LevelNumber + (pNumberOfTraysPerLevel > 1 ? ("-" + objCVarWH_RowLocation.TrayNumber) : "");
                        objCVarWH_RowLocation.LocationLength = pLocationLength;
                        objCVarWH_RowLocation.LocationWidth = pLocationWidth;
                        objCVarWH_RowLocation.LengthUnitID = pLengthUnitID;
                        objCVarWH_RowLocation.MaxWeight = pMaxWeight;
                        objCVarWH_RowLocation.WeightUnitID = pWeightUnitID;
                        objCVarWH_RowLocation.MaxVolume = pMaxVolume;
                        objCVarWH_RowLocation.VolumeUnitID = pVolumeUnitID;
                        objCVarWH_RowLocation.StatusID = (pStatusID == 0 ? 10 : pStatusID);
                        objCVarWH_RowLocation.PickupMethodID = pPickupMethodID;
                        objCVarWH_RowLocation.IsUsed = false;
                        objCVarWH_RowLocation.CreatorUserID = objCVarWH_RowLocation.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarWH_RowLocation.CreationDate = objCVarWH_RowLocation.ModificationDate = DateTime.Now;
                        objCWH_RowLocation.lstCVarWH_RowLocation.Add(objCVarWH_RowLocation);
                    } //for (int _trayNo = 0; _trayNo < pNumberOfTraysPerLevel; _trayNo++)
                } //for (int _levelNo = 0; _levelNo < pNumberOfLevelsPerRow; _levelNo++)
                checkException = objCWH_RowLocation.SaveMethod(objCWH_RowLocation.lstCVarWH_RowLocation);
                if (checkException == null)
                {
                    checkException = objCvwWH_RowLocation.GetListPaging(99999, 1, "WHERE RowID=" + pRestoredRowID.ToString(), "Code", out _RowCount);
                }
                else
                    _ReturnedMessage = checkException.Message;
            }
            else
                _ReturnedMessage = checkException.Message;

            return new object[] {
                _ReturnedMessage
                , new JavaScriptSerializer().Serialize(objCvwWH_RowLocation.lstCVarvwWH_RowLocation) //pData[1]
            };
        }

		[HttpGet, HttpPost]
		public object RowLocation_UploadFromExcel()
		{
			int ResultCode = 1;

			int pID = Convert.ToInt32(HttpContext.Current.Request.Form[0]);
			int pLengthUnitID = Convert.ToInt32(HttpContext.Current.Request.Form[1]);
			int pWeightUnitID = Convert.ToInt32(HttpContext.Current.Request.Form[2]);
			int pVolumeUnitID = Convert.ToInt32(HttpContext.Current.Request.Form[3]);
			string pPrefix = Convert.ToString(HttpContext.Current.Request.Form[4]);

			List<string> MissingFields = new List<string>();
			List<string> MissingForeignKeys = new List<string>();
			string exception = "";
			try
			{
				if (HttpContext.Current.Request.Files.AllKeys.Any())
				{
					// Get the uploaded file from the Files collection
					var httpPostedFile = HttpContext.Current.Request.Files[0];

					if (httpPostedFile != null)
					{
						Stream stream = httpPostedFile.InputStream;
						IExcelDataReader reader = null;
						if (httpPostedFile.FileName.EndsWith(".xls"))
						{
							reader = ExcelReaderFactory.CreateBinaryReader(stream);
						}
						else if (httpPostedFile.FileName.EndsWith(".xlsx"))
						{
							reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
						}
						else
						{
							ModelState.AddModelError("File", "This file format is not supported");
						}
						DataSet result = reader.AsDataSet(new ExcelDataSetConfiguration()
						{
							ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
							{
								UseHeaderRow = true
							}
						});
						
						var types = new Dictionary<int, string>();
						types.Add(1, "Receiving");
						types.Add(2, "Picking");
						types.Add(3, "Damage");

						var status = new Dictionary<int, string>();
						status.Add(10, "Active");
						status.Add(20, "InActive");

						var pickupMethods = new Dictionary<int, string>();
						pickupMethods.Add(10, "NORMAL EQUIP");
						pickupMethods.Add(20, "SPECIAL EQUIP");

						List<Location> Locations = new List<Location>();
						int count = 1;
						foreach (DataRow row in result.Tables[0].Rows)
						{
							Location location = new Location
							{
								LocationCode = row["Location"] == DBNull.Value ? pPrefix+ count : pPrefix+Convert.ToString(row["Location"]),
								//LevelNumber = row["Level"] == DBNull.Value ?"" : Convert.ToString(row["Level"]),
								//TrayNumber = row["Tray"] == DBNull.Value ?"" : Convert.ToString(row["Tray"]),
								LocationLength = row["Length"] == DBNull.Value ?0 : Convert.ToDecimal(row["Length"]),
								LocationWidth = row["Width"] == DBNull.Value ?0 : Convert.ToDecimal(row["Width"]),
								MaxWeight = row["MaxWeight"] == DBNull.Value ?0 : Convert.ToDecimal(row["MaxWeight"]),
								MaxVolume = row["MaxVolume"] == DBNull.Value ?0 : Convert.ToDecimal(row["MaxVolume"]),
								MaxHeat = row["MaxHeat"] == DBNull.Value ?0 : Convert.ToDecimal(row["MaxHeat"]),
								PickupMethodID = row["PickupMethod"] == DBNull.Value ? 0 : pickupMethods.FirstOrDefault(a=>a.Value== Convert.ToString(row["PickupMethod"])).Key ,
								StatusID = row["Status"] == DBNull.Value ? status.First().Key : status.FirstOrDefault(a=>a.Value== Convert.ToString(row["Status"])).Key ,
								TypeID = row["Type"] == DBNull.Value ? 0 : types.FirstOrDefault(a=>a.Value== Convert.ToString(row["Type"])).Key ,
								RowID = pID,
								LengthUnitID=pLengthUnitID,
								WeightUnitID = pWeightUnitID,
								VolumeUnitID=pVolumeUnitID,
							};
							Locations.Add(location);
							count++;
						}

						Exception checkException = null;
						if (Locations == null || Locations?.Count == 0)
							return new object[] { "No Data To Save" };
						int RowID = Locations[0].RowID;
						CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
						string locationCodes = string.Join(",", Locations.Select(a => a.LocationCode));
						locationCodes = "'" + locationCodes.Replace(",", "','") + "'";
						objCWH_RowLocation.GetList($"where Code in ({locationCodes})");
						#region Update
						foreach (var item in objCWH_RowLocation.lstCVarWH_RowLocation)
						{
							var loc = Locations.FirstOrDefault(a => a.LocationCode == item.Code);

							//item.LevelNumber = loc.LevelNumber;
							//item.TrayNumber = loc.TrayNumber;
							item.LocationLength = loc.LocationLength;
							item.LocationWidth = loc.LocationWidth;
							item.MaxWeight = loc.MaxWeight;
							item.MaxVolume = loc.MaxVolume;
							item.MaxHeat = loc.MaxHeat;
							item.PickupMethodID = loc.PickupMethodID;
							item.StatusID = loc.StatusID;
							item.TypeID = loc.TypeID;
							item.WeightUnitID = loc.WeightUnitID;
							item.VolumeUnitID = loc.VolumeUnitID;
							item.LengthUnitID = loc.LengthUnitID;
							Locations.Remove(loc);
						}
						#endregion

						#region Insert
						foreach (var loc in Locations)
						{
							objCWH_RowLocation.lstCVarWH_RowLocation.Add(new CVarWH_RowLocation
							{
								RowID = loc.RowID,
								Code = loc.LocationCode,
								//LevelNumber = loc.LevelNumber,
								//TrayNumber = loc.TrayNumber,
								LocationLength= loc.LocationLength,
								LocationWidth = loc.LocationWidth,
								MaxWeight= loc.MaxWeight,
								MaxVolume= loc.MaxVolume,
								MaxHeat= loc.MaxHeat,
								PickupMethodID = loc.PickupMethodID,
								StatusID = loc.StatusID,
								TypeID = loc.TypeID,
								WeightUnitID = loc.WeightUnitID,
								VolumeUnitID = loc.VolumeUnitID,
								LengthUnitID = loc.LengthUnitID,
							});
							Common.Common.ReplaceNull(objCWH_RowLocation.lstCVarWH_RowLocation[objCWH_RowLocation.lstCVarWH_RowLocation.Count - 1]);
						}
						#endregion

						checkException = objCWH_RowLocation.SaveMethod(objCWH_RowLocation.lstCVarWH_RowLocation);

						CvwWH_Row objCvwWH_Row = new CvwWH_Row();
						CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
						if (checkException == null)
						{
							objCvwWH_Row.GetList($"where ID={RowID}");
							objCvwWH_RowLocation.GetList($"where RowID={RowID}");
						}

						var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
						return new object[] {
				  checkException==null?"":checkException.Message
				, serializer.Serialize(objCvwWH_RowLocation.lstCVarvwWH_RowLocation) //pData[1]
                , serializer.Serialize(objCvwWH_Row.lstCVarvwWH_Row[0]) //pData[2]
            };

					}
				}
			}
			catch (Exception ex)
			{
				exception = ex.Message;
				ResultCode = 0;
			}
			return new
			{
				ResultCode,
				MissingFields = MissingFields.Count > 0 ? string.Join(",", MissingFields) : "",
				MissingForeignKeys = MissingForeignKeys.Count > 0 ? string.Join(",", MissingForeignKeys) : "",
				exception
			};
		}

		[HttpGet, HttpPost]
		public object[] RowLocation_ImportFromExcel([FromBody] InsertList insertList)
		{
			Exception checkException = null;
			CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
			CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
			CvwWH_Row objCvwWH_Row = new CvwWH_Row();
			var constRowLocationStatusNormal = 10;
			int _RowCount = 0;
			string _ReturnedMessage = "";
			var _ArrCode = insertList.pCodeList.Split(',');
			int _NumberOfRows = _ArrCode.Length;
			checkException = objCvwWH_Row.GetList("WHERE ID=" + insertList.pRowID.ToString());
			int _WarehouseID = objCvwWH_Row.lstCVarvwWH_Row[0].WarehouseID;

			#region check Uniquess
			for (int i = 0; i < _NumberOfRows && _ReturnedMessage == ""; i++)
			{
				CvwWH_Row objCvwWH_Row_temp = new CvwWH_Row();
				checkException = objCvwWH_Row_temp.GetListPaging(1, 1, "WHERE ID=" + insertList.pRowID, "ID", out _RowCount);
				CvwWH_RowLocation objCvwWH_RowLocation_tmp = new CvwWH_RowLocation();
				string pWhereClause = "WHERE Code=N'" + _ArrCode[i] + "' AND WarehouseID=" + objCvwWH_Row_temp.lstCVarvwWH_Row[0].WarehouseID;
				if (_ArrCode[i] != "0")
				{
					checkException = objCvwWH_RowLocation_tmp.GetList(pWhereClause);
					if (objCvwWH_RowLocation_tmp.lstCVarvwWH_RowLocation.Count > 0)
						_ReturnedMessage = "Sorry, uniqueness violated.";
				}
			}
			#endregion check Uniquess

			#region Save
			if (_ReturnedMessage == "")
			{
				for (int i = 0; i < _NumberOfRows; i++)
				{
					CVarWH_RowLocation objCVarWH_RowLocation = new CVarWH_RowLocation();
					objCVarWH_RowLocation.ID = 0;
					objCVarWH_RowLocation.RowID = insertList.pRowID;
					objCVarWH_RowLocation.Code = _ArrCode[i];
					objCVarWH_RowLocation.LevelNumber = "0";
					objCVarWH_RowLocation.TrayNumber = "0";
					objCVarWH_RowLocation.LocationLength = 0;
					objCVarWH_RowLocation.LocationWidth = 0;
					objCVarWH_RowLocation.LengthUnitID = insertList.pLengthUnitID;
					objCVarWH_RowLocation.MaxWeight = 0;
					objCVarWH_RowLocation.WeightUnitID = insertList.pWeightUnitID;
					objCVarWH_RowLocation.MaxVolume = 0;
					objCVarWH_RowLocation.VolumeUnitID = insertList.pVolumeUnitID;
					objCVarWH_RowLocation.StatusID = constRowLocationStatusNormal;
					objCVarWH_RowLocation.PickupMethodID = 0;
					objCVarWH_RowLocation.CreatorUserID = objCVarWH_RowLocation.ModificatorUserID = WebSecurity.CurrentUserId;
					objCVarWH_RowLocation.CreationDate = objCVarWH_RowLocation.ModificationDate = DateTime.Now;
					if (_ArrCode[i] != "0")
						objCWH_RowLocation.lstCVarWH_RowLocation.Add(objCVarWH_RowLocation);
				} //for (int i = 0; i < _ArrQuantity.Count; i++)
				checkException = objCWH_RowLocation.SaveMethod(objCWH_RowLocation.lstCVarWH_RowLocation);
			} //if (_ReturnedMessage == "")
			if (checkException != null)
				_ReturnedMessage = checkException.Message;
			#endregion Save

			checkException = objCvwWH_Row.GetList("WHERE ID=" + insertList.pRowID.ToString());
			checkException = objCvwWH_RowLocation.GetListPaging(999999, 1, "WHERE RowID=" + insertList.pRowID.ToString(), "ID", out _RowCount);
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[] {
				_ReturnedMessage
				, serializer.Serialize(objCvwWH_RowLocation.lstCVarvwWH_RowLocation) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Row.lstCVarvwWH_Row[0]) //pData[2]
            };
		}

		[HttpGet, HttpPost]
        public object[] RowLocation_DeleteList([FromBody] DeleteList_RowLocation deleteList_RowLocation)
        {
            Exception checkException = null;
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            checkException = objCWH_RowLocation.DeleteList("WHERE ID IN (" + deleteList_RowLocation.pRowLocationIDsToDelete + ")");
            objCvwWH_RowLocation.GetList("WHERE RowID=" + deleteList_RowLocation.pRowID.ToString());
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                checkException == null ? true : false
                , serializer.Serialize(objCvwWH_RowLocation.lstCVarvwWH_RowLocation)
            };
        }

        #endregion RowLocation
    }
    public class Location
    {
        public int RowID { get; set; }
        public string LocationCode { get; set; }
        public string LevelNumber { get; set; }
        public string TrayNumber { get; set; }
        public decimal LocationLength { get; set; }
        public decimal LocationWidth { get; set; }
        public decimal MaxWeight { get; set; }
        public decimal MaxVolume { get; set; }
        public decimal MaxHeat { get; set; }
        public int PickupMethodID { get; set; }
        public int StatusID { get; set; }
        public int TypeID { get; set; }
        public int LengthUnitID { get; set; }
        public int WeightUnitID { get; set; }
        public int VolumeUnitID { get; set; }
	}
	public class InsertList
	{
		public Int32 pRowID { get; set; }
		public string pCodeList { get; set; }
		public Int32 pLengthUnitID { get; set; }
		public Int32 pWeightUnitID { get; set; }
		public Int32 pVolumeUnitID { get; set; }
	}
	public class DeleteList_RowLocation
    {
        public string pRowLocationIDsToDelete { get; set; }
        public Int32 pRowID { get; set; }
    }
}
