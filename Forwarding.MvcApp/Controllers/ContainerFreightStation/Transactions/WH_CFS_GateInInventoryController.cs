
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using Forwarding.MvcApp.Models.ContainerFreightStation.Transactions;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using WebMatrix.WebData;
using static Forwarding.MvcApp.Controllers.ContainerFreightStation.Transactions.WH_CFS_GateInController;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.ContainerFreightStation.Transactions
{
    public class WH_CFS_GateInInventoryController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] WH_CFS_GateInInventory_LoadItem(string pInventoryID)
        {
            bool _result = false;
            Exception checkException = null;
            Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");
            var IsHOld="0" ;
            CvwWH_CFS_GateInInventory objCvwWH_CFS_GateInInventory = new CvwWH_CFS_GateInInventory();

            checkException = objCvwWH_CFS_GateInInventory.GetList("WHERE InventoryID = " + pInventoryID);

            if (checkException == null)
            {
                _result = true;
                _RowCount = objCvwWH_CFS_GateInInventory.lstCVarvwWH_CFS_GateInInventory.Count;

            }
            CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "UNF")
            {
             IsHOld = cCustomizedDBCall.CallStringFunction($"select IsHold from operations where HouseNumber='{objCvwWH_CFS_GateInInventory.lstCVarvwWH_CFS_GateInInventory[0].HouseNumber}'");
            }
            CvwRoutings objCvwRoutings = new CvwRoutings();
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "UNF" && checkException == null && _RowCount == 1)
            {
                objCvwRoutings.GetList($"WHERE RoutingTypeID=30 AND OperationID={objCvwWH_CFS_GateInInventory.lstCVarvwWH_CFS_GateInInventory[0].OperationID}");
            }
            CRoutings cRoutings = new CRoutings();
            cRoutings.GetList("WHERE OperationID = " + objCvwWH_CFS_GateInInventory.lstCVarvwWH_CFS_GateInInventory[0].HouseBillID);
            var RoadNumber = cRoutings.lstCVarRoutings[0].RoadNumber;

            CvwWH_HouseBillPackagesAllocation objCvwWH_HouseBillPackagesAllocation = new CvwWH_HouseBillPackagesAllocation();
            if (_RowCount > 0)
            {
                objCvwWH_HouseBillPackagesAllocation.GetList("WHERE HouseBillID = " + objCvwWH_CFS_GateInInventory.lstCVarvwWH_CFS_GateInInventory[0].HouseBillID);
            }
            else
            {
                objCvwWH_HouseBillPackagesAllocation.GetList("WHERE 1 = 0 ");
            }
            


            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CWH_Area objCWH_Area = new CWH_Area();
            CWH_Row objCWH_Row = new CWH_Row();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            CWH_Notes objCWH_Notes = new CWH_Notes();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            CvwWH_AvailableEmptyContainers objCvwWH_AvailableEmptyContainers = new CvwWH_AvailableEmptyContainers();

            // Getting Warehouses list                
            objCWH_Warehouse.GetList(" where 1=1 ");
            var pWarehousesList = objCWH_Warehouse.lstCVarWH_Warehouse
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting Areas list
            objCWH_Area.GetList(" where 1=1 ");
            var pAreasList = objCWH_Area.lstCVarWH_Area
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting Rows list
            objCWH_Row.GetList(" where 1=1 ");
            var pRowsList = objCWH_Row.lstCVarWH_Row
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting RowLocation list
            objCWH_RowLocation.GetList(" where 1=1 ");
            var pRowLocationsList = objCWH_RowLocation.lstCVarWH_RowLocation
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.Code
                })
                .Distinct().OrderBy(o => o.Code).ToList();

            // Getting Warehouse Notes list
            objCWH_Notes.GetList(" where IsForStoring = 1 ");
            var pWarehouseNotesList = objCWH_Notes.lstCVarWH_Notes
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting Container Types list
            objCContainerTypes.GetList(" where 1=1 ");

            var pContainerTypesList = objCContainerTypes.lstCVarContainerTypes
                .Select(ss => new
                {
                    ID = ss.ID,
                    Name = ss.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting Available Empty Containers list
            objCvwWH_AvailableEmptyContainers.GetList(" where 1=1 ");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                _result
                ,serializer.Serialize(_RowCount == 0 ? null :objCvwWH_CFS_GateInInventory.lstCVarvwWH_CFS_GateInInventory[0]) //data[1]
                ,serializer.Serialize(pWarehousesList) //2
                ,serializer.Serialize(pAreasList) //3
                ,serializer.Serialize(pRowsList) //4
                ,serializer.Serialize(pRowLocationsList) //5
                ,serializer.Serialize(pWarehouseNotesList) //6
                ,serializer.Serialize(pContainerTypesList) //7
                ,serializer.Serialize(objCvwWH_AvailableEmptyContainers.lstCVarvwWH_AvailableEmptyContainers) //8
                ,serializer.Serialize(objCvwWH_HouseBillPackagesAllocation.lstCVarvwWH_HouseBillPackagesAllocation)//9
                ,serializer.Serialize(RoadNumber) //10
                ,serializer.Serialize(objCvwRoutings.lstCVarvwRoutings) //11
                ,IsHOld //12
            };
        }

        [HttpGet, HttpPost]
        public Object[] WH_CFS_GateInInventory_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CvwWH_CFS_GateInInventory objCvwWH_CFS_GateInInventory = new CvwWH_CFS_GateInInventory();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());

            checkException = objCvwWH_CFS_GateInInventory.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            if (checkException == null)
            {
                _result = true;
            }
            return new Object[] {
                _result
                , _RowCount
                ,new JavaScriptSerializer().Serialize(objCvwWH_CFS_GateInInventory.lstCVarvwWH_CFS_GateInInventory) //0
                };
        }

        [HttpGet, HttpPost]
        public object[] WH_CFS_GateInInventory_Update([FromBody] InsertGateInInventory InsertGateInInventory)
        {
            bool _result = false;
            int _RowCount = 0;
            CVarWH_Inventory objCVarWH_Inventory = new CVarWH_Inventory();

            objCVarWH_Inventory.ID = InsertGateInInventory.pInventoryID == "" ? 0 : long.Parse(InsertGateInInventory.pInventoryID);
            objCVarWH_Inventory.EntryDate = InsertGateInInventory.pEntryDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertGateInInventory.pEntryDate;
            objCVarWH_Inventory.OperationID = InsertGateInInventory.pOperationID == "" ? 0 : long.Parse(InsertGateInInventory.pOperationID);
            objCVarWH_Inventory.ContainerID = InsertGateInInventory.pContainerID == "" ? 0 : long.Parse(InsertGateInInventory.pContainerID);
            objCVarWH_Inventory.HouseBillID = InsertGateInInventory.pHouseBillID == "" ? 0 : long.Parse(InsertGateInInventory.pHouseBillID);
            objCVarWH_Inventory.BookingPartyID = InsertGateInInventory.pBookingPartyID == "" ? 0 : int.Parse(InsertGateInInventory.pBookingPartyID);
            objCVarWH_Inventory.WarehouseID = InsertGateInInventory.pWarehouseID == "" ? 0 : int.Parse(InsertGateInInventory.pWarehouseID);
            objCVarWH_Inventory.AreaID = InsertGateInInventory.pAreaID == "" ? 0 : int.Parse(InsertGateInInventory.pAreaID);
            objCVarWH_Inventory.RowID = InsertGateInInventory.pRowID == "" ? 0 : int.Parse(InsertGateInInventory.pRowID);
            objCVarWH_Inventory.RowLocationID = InsertGateInInventory.pRowLocationID == "" ? 0 : int.Parse(InsertGateInInventory.pRowLocationID);
            objCVarWH_Inventory.WarehouseNoteID = InsertGateInInventory.pWarehouseNoteID == "" ? 0 : int.Parse(InsertGateInInventory.pWarehouseNoteID);
            objCVarWH_Inventory.EmptyContainerID = InsertGateInInventory.pEmptyContainerID == "" ? 0 : long.Parse(InsertGateInInventory.pEmptyContainerID);
            objCVarWH_Inventory.OtherRemarks = InsertGateInInventory.pOtherRemarks == null ? "0" : InsertGateInInventory.pOtherRemarks.Trim().ToString();
            objCVarWH_Inventory.StorageEndDate = InsertGateInInventory.pStorageEndDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertGateInInventory.pStorageEndDate;
            objCVarWH_Inventory.KalmarOnCount = 0;
            objCVarWH_Inventory.KalmarOffCount = 0;

            // nour 09052022
            objCVarWH_Inventory.DriverNameIn = "";
            objCVarWH_Inventory.DriverNameOut = "";
            objCVarWH_Inventory.TruckNoIn = "";
            objCVarWH_Inventory.TruckNoOut = "";

            objCVarWH_Inventory.HasDamage = InsertGateInInventory.pHasDamage;
            objCVarWH_Inventory.DamageDescription = InsertGateInInventory.pDamageDescription == null ? "0" : InsertGateInInventory.pDamageDescription.Trim().ToString();

            objCVarWH_Inventory.CustomsSealNumber = InsertGateInInventory.pCustomsSealNumber == null ? "0" : InsertGateInInventory.pCustomsSealNumber.Trim().ToString();
            objCVarWH_Inventory.CustomsCertificateNumber = InsertGateInInventory.pCustomsCertificateNumber == null ? "0" : InsertGateInInventory.pCustomsCertificateNumber.Trim().ToString();
            objCVarWH_Inventory.CustomsFeesAmount = InsertGateInInventory.pCustomsFeesAmount == "" ? 0 : Decimal.Parse(InsertGateInInventory.pCustomsFeesAmount);
            objCVarWH_Inventory.CustomsFeesVAT = InsertGateInInventory.pCustomsFeesVAT == "" ? 0 : Decimal.Parse(InsertGateInInventory.pCustomsFeesVAT);
            objCVarWH_Inventory.CustomsFeesTotal = InsertGateInInventory.pCustomsFeesTotal == "" ? 0 : Decimal.Parse(InsertGateInInventory.pCustomsFeesTotal);

            objCVarWH_Inventory.AddedBy = InsertGateInInventory.pAddedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
            objCVarWH_Inventory.AddedAt = DateTime.Now;
            objCVarWH_Inventory.UpdatedBy = InsertGateInInventory.pUpdatedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
            objCVarWH_Inventory.UpdatedAt = DateTime.Now;

            objCVarWH_Inventory.CustomsBrokerName = InsertGateInInventory.pCustomsBrokerName;
            objCVarWH_Inventory.CertificationNumber = InsertGateInInventory.pCertificationNumber;
            objCVarWH_Inventory.PermissionNumber = InsertGateInInventory.pPermissionNumber;
            objCVarWH_Inventory.MarkingDate = InsertGateInInventory.pMakingDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertGateInInventory.pMakingDate;
            objCVarWH_Inventory.AdditionalLocations = InsertGateInInventory.pAdditionalLocations;
            objCVarWH_Inventory.CustomsBrokerID = InsertGateInInventory.pCustomBrokerID;
            objCVarWH_Inventory.WithMarking = InsertGateInInventory.pWithMarking;
            objCVarWH_Inventory.WithoutMarking = InsertGateInInventory.pWithoutMarking;
            objCVarWH_Inventory.IsCalculatedFromATAPOD = false;

            CWH_Inventory objCWH_Inventory = new CWH_Inventory();
            objCWH_Inventory.lstCVarWH_Inventory.Add(objCVarWH_Inventory);

            Exception checkException = objCWH_Inventory.SaveMethod(objCWH_Inventory.lstCVarWH_Inventory);

            CvwWH_CFS_GateInInventory objCvwWH_CFS_GateInInventory = new CvwWH_CFS_GateInInventory();
            if (checkException == null)
            {
                _result = true;
                objCvwWH_CFS_GateInInventory.GetListPaging(InsertGateInInventory.pPageSize, InsertGateInInventory.pPageNumber, InsertGateInInventory.pWhereClause, InsertGateInInventory.pOrderBy, out _RowCount);


                // Insert House Bill Packages details
                CVarWH_HouseBillPackagesAllocation objCVarWH_HouseBillPackagesAllocation = new CVarWH_HouseBillPackagesAllocation();
                CWH_HouseBillPackagesAllocation objCWH_HouseBillPackagesAllocation = new CWH_HouseBillPackagesAllocation();

                JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
                List<CVarWH_HouseBillPackagesAllocation> listofCVarWH_HouseBillPackagesAllocation = jsonSerialiser.Deserialize<List<CVarWH_HouseBillPackagesAllocation>>(InsertGateInInventory.pHouseBillPackages);
                objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation = listofCVarWH_HouseBillPackagesAllocation;
                int Count = listofCVarWH_HouseBillPackagesAllocation.Count();

                for (int i = 0; i < Count; i++)
                {
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].ID = listofCVarWH_HouseBillPackagesAllocation[i].ID;
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].HouseBillID = Int64.Parse(InsertGateInInventory.pHouseBillID);
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].WarehouseID = Int32.Parse(InsertGateInInventory.pWarehouseID);
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].AreaID = Int32.Parse(InsertGateInInventory.pAreaID);
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].RowID = Int32.Parse(InsertGateInInventory.pRowID);

                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].OperationContainersAndPackageID = listofCVarWH_HouseBillPackagesAllocation[i].OperationContainersAndPackageID;
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].RowLocationID = listofCVarWH_HouseBillPackagesAllocation[i].RowLocationID;
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].HasDamage = listofCVarWH_HouseBillPackagesAllocation[i].HasDamage;
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].DamageDescription = (listofCVarWH_HouseBillPackagesAllocation[i].HasDamage ? listofCVarWH_HouseBillPackagesAllocation[i].DamageDescription : "");
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].Remarks = listofCVarWH_HouseBillPackagesAllocation[i].Remarks;
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].AddedBy = WebSecurity.CurrentUserId;
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].AddedAt = DateTime.Now;
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].UpdatedBy = WebSecurity.CurrentUserId;
                    objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation[i].UpdatedAt = DateTime.Now;

                }
                checkException = objCWH_HouseBillPackagesAllocation.SaveMethod(objCWH_HouseBillPackagesAllocation.lstCVarWH_HouseBillPackagesAllocation);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_Inventory.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_CFS_GateInInventory.lstCVarvwWH_CFS_GateInInventory) : null //pData[2]
                , _RowCount //pData[3]
            };
        }



        public class InsertGateInInventory
        {
            public String pInventoryID { get; set; }

            public String pOperationID { get; set; }

            public String pContainerID { get; set; }

            public String pHouseBillID { get; set; }

            public String pBookingPartyID { get; set; }

            public String pWarehouseID { get; set; }

            public String pAreaID { get; set; }

            public String pRowID { get; set; }

            public String pRowLocationID { get; set; }

            public String pWarehouseNoteID { get; set; }

            public String pEmptyContainerID { get; set; }

            public DateTime pEntryDate { get; set; }

            public DateTime pStorageEndDate { get; set; }

            public String pOtherRemarks { get; set; }
            public Boolean pHasDamage { get; set; }
            public String pDamageDescription { get; set; }
            public String pCustomsSealNumber { get; set; }
            public String pCustomsCertificateNumber { get; set; }
            public String pCustomsFeesAmount { get; set; }
            public String pCustomsFeesVAT { get; set; }
            public String pCustomsFeesTotal { get; set; }
            public String pHouseBillPackages { get; set; }
            public String pCustomsBrokerName { get; set; }
            public Int32 pPermissionNumber { get; set; }
            public Int32 pCertificationNumber { get; set; }
            public DateTime pMakingDate { get; set; }

            public string pCustomBrokerID { get; set; } = "0";
            public string pAdditionalLocations { get; set; } = "0";
            public Boolean pWithMarking { get; set; } = false;
            public Boolean pWithoutMarking { get; set; } = false;
            public String pAddedBy { get; set; }

            public DateTime pAddedAt { get; set; }

            public String pUpdatedBy { get; set; }

            public DateTime pUpdatedAt { get; set; }


            /*****************************/
            public string pWhereClause { get; set; }
            public Int32 pPageSize { get; set; }
            public Int32 pPageNumber { get; set; }
            public string pOrderBy { get; set; }
        }

        #region O T H E R  F U N C T I O N S
        [HttpGet, HttpPost]
        public Object[] GetWarehouseAreas(Int32 pWarehouseID)
        {
            bool _result = false;
            Exception checkException = null;

            CWH_Area objCWH_Area = new CWH_Area();

            // Getting Areas list
            checkException = objCWH_Area.GetList(" where WarehouseID = " + pWarehouseID.ToString());

            if (checkException == null)
            {
                _result = true;
            }
            var pAreasList = objCWH_Area.lstCVarWH_Area
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();


            return new Object[]
            {
                _result // 0
                ,new JavaScriptSerializer().Serialize(pAreasList) // 1
            };
        }

        [HttpGet, HttpPost]
        public Object[] GetAreaRows(Int32 pAreaID)
        {
            bool _result = false;
            Exception checkException = null;

            CWH_Row objCWH_Row = new CWH_Row();

            // Getting Rows list
            checkException = objCWH_Row.GetList(" where AreaID = " + pAreaID.ToString());

            if (checkException == null)
            {
                _result = true;
            }
            var pRowsList = objCWH_Row.lstCVarWH_Row
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();


            return new Object[]
            {
                _result // 0
                ,new JavaScriptSerializer().Serialize(pRowsList) // 1
            };
        }

        [HttpGet, HttpPost]
        public Object[] GetRowLocations(Int32 pRowID)
        {
            bool _result = false;
            Exception checkException = null;

            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();

            // Getting Locations list
            checkException = objCWH_RowLocation.GetList(" where RowID = " + pRowID.ToString());

            if (checkException == null)
            {
                _result = true;
            }
            var pRowLocation = objCWH_RowLocation.lstCVarWH_RowLocation
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.Code
                })
                .Distinct().OrderBy(o => o.Code).ToList();

            return new Object[]
            {
                _result // 0
                ,new JavaScriptSerializer().Serialize(pRowLocation) // 1
            };
        }


        [HttpGet, HttpPost]
        public Object[] CalculateStorage(string pInventoryID, string pStorageEndDate, bool pIsCalculatedFromATAPOD = false)
        {
            bool _result = false;
            Exception checkException = null;
            Decimal StorageAmount = 0;

            CWH_Inventory objCWH_Inventory = new CWH_Inventory();

            // Getting Locations list
            checkException = objCWH_Inventory.CalculateStorage(pInventoryID, pStorageEndDate, pIsCalculatedFromATAPOD, out StorageAmount);

            if (checkException == null)
            {
                _result = true;
            }

            return new Object[]
            {
                _result // 0
                ,StorageAmount // 1
            };
        }

        #endregion
    }
}
