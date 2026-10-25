using Forwarding.MvcApp.Models.ContainerFreightStation.Transactions;
using Forwarding.MvcApp.Models.ContainerYard.Transactions;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ContainerYard.Transactions
{
    public class WH_MTY_GateOutController : ApiController
    {
        [HttpGet, HttpPost]
        // agnet isline=1 or ContainerType IsLine=0
        public Object[] WH_MTY_GateOut_LoadAll(string pOrderBy)
        {
            CvwWH_MTY_GateOut objVwWH_MTY_GateOut = new CvwWH_MTY_GateOut();
            objVwWH_MTY_GateOut.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objVwWH_MTY_GateOut.lstCVarvwWH_MTY_GateOut) };
        }

        [HttpGet, HttpPost]
        public object[] WH_MTY_GateOut_LoadItem(string pID)
        {
            bool _result = false;
            Exception checkException = null;
            Int32 _RowCount = 0;

            CvwWH_MTY_GateOut objCvwWH_MTY_GateOut = new CvwWH_MTY_GateOut();
            CWH_Area objCWH_Area = new CWH_Area();
            CWH_Row objCWH_Row = new CWH_Row();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            checkException = objCvwWH_MTY_GateOut.GetList("WHERE ID = " + pID);

            if (checkException == null)
            {
                _result = true;
                _RowCount = objCvwWH_MTY_GateOut.lstCVarvwWH_MTY_GateOut.Count;

            }
            // Getting Areas list
            objCWH_Area.GetList(string.Format(" where 1=1 and WarehouseID = {0} ", objCvwWH_MTY_GateOut.lstCVarvwWH_MTY_GateOut[0].WarehouseID));
            var pAreasList = objCWH_Area.lstCVarWH_Area
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting Rows list
            objCWH_Row.GetList(string.Format(" where 1=1  and  AreaID = {0} ", objCvwWH_MTY_GateOut.lstCVarvwWH_MTY_GateOut[0].AreaID));
            var pRowsList = objCWH_Row.lstCVarWH_Row
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting RowLocation list
            objCWH_RowLocation.GetList(string.Format(" where 1=1 and  RowID = {0} ", objCvwWH_MTY_GateOut.lstCVarvwWH_MTY_GateOut[0].RowID));
            var pRowLocationsList = objCWH_RowLocation.lstCVarWH_RowLocation
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.Code
                })
                .Distinct().OrderBy(o => o.Code).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                _result
                ,serializer.Serialize(_RowCount == 0 ? null :objCvwWH_MTY_GateOut.lstCVarvwWH_MTY_GateOut[0]) //data[1]
                ,serializer.Serialize(pAreasList) //2
                ,serializer.Serialize(pRowsList) //3
                ,serializer.Serialize(pRowLocationsList) //4

            };
        }

        [HttpGet, HttpPost]
        public Object[] WH_MTY_GateOut_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CvwWH_MTY_GateOut objCvwWH_MTY_GateOut = new CvwWH_MTY_GateOut();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());

            checkException = objCvwWH_MTY_GateOut.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            if (checkException == null)
            {
                _result = true;
            }
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CWH_Area objCWH_Area = new CWH_Area();
            CWH_Row objCWH_Row = new CWH_Row();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            CWH_Notes objCWH_Notes = new CWH_Notes();
            CContainerTypes objCContainerTypes = new CContainerTypes();

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
            objCWH_Area.GetList(" where 1=2 ");
            var pAreasList = objCWH_Area.lstCVarWH_Area
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting Rows list
            objCWH_Row.GetList(" where 1=2 ");
            var pRowsList = objCWH_Row.lstCVarWH_Row
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting RowLocation list
            objCWH_RowLocation.GetList(" where 1=2 ");
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

            CCustomers objCCustomer = new CCustomers();
            objCCustomer.GetList(" where 1=1 ");

            var pCustomerList = objCCustomer.lstCVarCustomers
                            .Select(s => new
                            {
                                ID = s.ID
                                ,
                                Name = s.Name
                            })
                  .Distinct().OrderBy(o => o.Name).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_MTY_GateOut.lstCVarvwWH_MTY_GateOut) //0
                , _RowCount//1
                ,_result//2
                ,serializer.Serialize(pWarehousesList) //3
                ,serializer.Serialize(pAreasList) //4
                ,serializer.Serialize(pRowsList) //5
                ,serializer.Serialize(pRowLocationsList) //6
                ,serializer.Serialize(pWarehouseNotesList) //7
                ,serializer.Serialize(pContainerTypesList) //8
                ,new JavaScriptSerializer().Serialize(pCustomerList)//9
                };
        }

        [HttpGet, HttpPost]
        public object[] WH_MTY_GateOut_Save([FromBody] InsertMTYGateOut InsertGateOut)
        {
            bool _result = false;
            int _RowCount = 0;

            ///////////////////////////add to WH_CntrStock////////////////////////
            CVarWH_CntrStock objCVarWH_CntrStock = new CVarWH_CntrStock();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CWH_CntrStock objCWH_CntrStock = new CWH_CntrStock();
            objCWH_CntrStock.GetList(string.Format(" where ContainerNumber like '%{0}%'", InsertGateOut.pContainerNumber.Trim()));
            objCVarWH_CntrStock.ID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? 0 : objCWH_CntrStock.lstCVarWH_CntrStock.First().ID;
            if (InsertGateOut.pWarehouseID == "")
            {
                InsertGateOut.pWarehouseID = null;
            }
            ////////////////////////////check hire and close ////////////////////
            //CVarWH_Hire objCVarWH_Hire = new CVarWH_Hire();

            //CWH_Hire objCWH_Hire = new CWH_Hire();
            //if (objCVarWH_CntrStock.ID != 0)
            //{


            //    objCWH_Hire.GetList(string.Format(" where WH_CntrStockID={0}", objCVarWH_CntrStock.ID));
            //    objCVarWH_Hire.ID = objCWH_Hire.lstCVarWH_Hire.Count == 0 ? 0 : objCWH_Hire.lstCVarWH_Hire.Last().IsHire == true ? 0 : objCWH_Hire.lstCVarWH_Hire.Last().ID;

            //    objCVarWH_Hire.Remarks = "";
            //    objCVarWH_Hire.WH_CntrStockID = objCVarWH_CntrStock.ID;
            //    objCVarWH_Hire.WH_WarehouseID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? (InsertInventory.pWarehouseID == null ? int.Parse("0") : int.Parse(InsertInventory.pWarehouseID)) : objCWH_CntrStock.lstCVarWH_CntrStock.First().WH_WarehouseID;
            //    objCVarWH_Hire.CustomerID = objCWH_Hire.lstCVarWH_Hire.Count == 0 ? int.Parse("0") : objCWH_Hire.lstCVarWH_Hire.Last().CustomerID;
            //    objCVarWH_Hire.TransactionDate = InsertInventory.pEntryDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertInventory.pEntryDate;
            //    objCVarWH_Hire.IsHire = false;
            //    objCWH_Hire.lstCVarWH_Hire.Add(objCVarWH_Hire);

            //    Exception checkExceptionH = objCVarWH_Hire.ID == 0 ? objCWH_Hire.SaveMethod(objCWH_Hire.lstCVarWH_Hire) : null;
            //}
            //////////////////////////////end check hire and close///////////////////////////////////////

            //objCVarWH_CntrStock.ContainerNumber = (InsertInventory.pContainerNumber == null ? "0" : InsertInventory.pContainerNumber.Trim().ToUpper());
            //objCVarWH_CntrStock.ContainerTypesID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? (InsertInventory.pContainerTypesID == null ? int.Parse("0") : int.Parse(InsertInventory.pContainerTypesID)) : objCWH_CntrStock.lstCVarWH_CntrStock.First().ContainerTypesID;
            //objCVarWH_CntrStock.isOwn = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? false : objCWH_CntrStock.lstCVarWH_CntrStock.First().isOwn;
            //objCVarWH_CntrStock.WH_WarehouseID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? (InsertInventory.pWarehouseID == null ? int.Parse("0") : int.Parse(InsertInventory.pWarehouseID)) : objCWH_CntrStock.lstCVarWH_CntrStock.First().WH_WarehouseID;
            //objCWH_CntrStock.lstCVarWH_CntrStock.Add(objCVarWH_CntrStock);

            //Exception checkExceptionC = objCWH_CntrStock.SaveMethod(objCWH_CntrStock.lstCVarWH_CntrStock);
            //////////////////////////////end add to WH_CntrStock///////////////////////////////////////


            CVarWH_Inventory objCVarWH_Inventory = new CVarWH_Inventory();

            CWH_Inventory objCWH_Inventory = new CWH_Inventory();
            objCWH_Inventory.GetItem(int.Parse(InsertGateOut.pID));
            objCVarWH_Inventory.ID = int.Parse(InsertGateOut.pID);


            objCVarWH_Inventory.EntryDate = objCWH_Inventory.lstCVarWH_Inventory[0].EntryDate;
            objCVarWH_Inventory.OperationID = InsertGateOut.pOperationID == null ? 0 : long.Parse(InsertGateOut.pOperationID);
            objCVarWH_Inventory.ContainerID = 0;
            objCVarWH_Inventory.HouseBillID = InsertGateOut.pHouseBillID == null ? 0 : long.Parse(InsertGateOut.pHouseBillID);
            objCVarWH_Inventory.WarehouseID = objCWH_Inventory.lstCVarWH_Inventory[0].WarehouseID;
            objCVarWH_Inventory.AreaID = objCWH_Inventory.lstCVarWH_Inventory[0].AreaID;
            objCVarWH_Inventory.RowID = objCWH_Inventory.lstCVarWH_Inventory[0].RowID;
            objCVarWH_Inventory.RowLocationID = objCWH_Inventory.lstCVarWH_Inventory[0].RowLocationID;
            objCVarWH_Inventory.WarehouseNoteID = InsertGateOut.pWarehouseNoteID == null ? 0 : int.Parse(InsertGateOut.pWarehouseNoteID);
            objCVarWH_Inventory.EmptyContainerID = objCVarWH_CntrStock.ID;
            objCVarWH_Inventory.OtherRemarks = InsertGateOut.pOtherRemarks == "" ? "" : InsertGateOut.pOtherRemarks.Trim().ToString();
            objCVarWH_Inventory.StorageEndDate = InsertGateOut.pStorageEndDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertGateOut.pStorageEndDate;
            //objCVarWH_Inventory.DriverNameIn = objCWH_Inventory.lstCVarWH_Inventory[0].DriverNameIn;
            //objCVarWH_Inventory.TruckNoIn = objCWH_Inventory.lstCVarWH_Inventory[0].TruckNoIn;
            //objCVarWH_Inventory.DriverNameOut = InsertGateOut.pDriverNameOut == "" ? "" : InsertGateOut.pDriverNameOut.Trim().ToString();
            //objCVarWH_Inventory.TruckNoOut = InsertGateOut.pTruckNoOut == "" ? "" : InsertGateOut.pTruckNoOut.Trim().ToString();

            objCVarWH_Inventory.AddedBy = InsertGateOut.pAddedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
            objCVarWH_Inventory.AddedAt = DateTime.Now;
            objCVarWH_Inventory.UpdatedBy = InsertGateOut.pUpdatedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
            objCVarWH_Inventory.UpdatedAt = DateTime.Now;
            objCVarWH_Inventory.CustomsBrokerName = "";
            objCVarWH_Inventory.CertificationNumber = 0;
            objCVarWH_Inventory.PermissionNumber = 0;
            objCVarWH_Inventory.MarkingDate = DateTime.Now;
            objCVarWH_Inventory.AdditionalLocations = "0";
            objCVarWH_Inventory.CustomsBrokerID = "0";
            objCVarWH_Inventory.WithMarking = false;
            objCVarWH_Inventory.WithoutMarking = false;
            objCVarWH_Inventory.IsCalculatedFromATAPOD = false;


            objCWH_Inventory.lstCVarWH_Inventory.Add(objCVarWH_Inventory);

            Exception checkException = objCWH_Inventory.SaveMethod(objCWH_Inventory.lstCVarWH_Inventory);

            CvwWH_MTY_GateOut objCvwWH_MTY_GateOut = new CvwWH_MTY_GateOut();
            if (checkException == null)
            {
                _result = true;
                objCvwWH_MTY_GateOut.GetListPaging(InsertGateOut.pPageSize, InsertGateOut.pPageNumber, InsertGateOut.pWhereClauseWH_MTY_GateOut, InsertGateOut.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_Inventory.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_MTY_GateOut.lstCVarvwWH_MTY_GateOut) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        // [Route("/api/ContainerTypes/Delete/{pContainerTypesIDs}")]
        [HttpGet, HttpPost]
        public object[] WH_MTY_GateOut_DeleteList(String pWH_MTY_GateOutIDs, string pWhereClauseWH_MTY_GateOut,
            Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_Inventory objCWH_Inventory = new CWH_Inventory();
            foreach (var pWH_MTY_GateOutID in pWH_MTY_GateOutIDs.Split(','))
            {
                objCWH_Inventory.lstDeletedCPKWH_Inventory.Add(new CPKWH_Inventory() { ID = Int32.Parse(pWH_MTY_GateOutID.Trim()) });
            }
            Exception checkException = objCWH_Inventory.DeleteItem(objCWH_Inventory.lstDeletedCPKWH_Inventory);
            CvwWH_MTY_GateOut objCvwWH_MTY_GateOut = new CvwWH_MTY_GateOut();
            if (checkException == null)
                _result = true;
            objCvwWH_MTY_GateOut.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_MTY_GateOut, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwWH_MTY_GateOut.lstCVarvwWH_MTY_GateOut) //pData[1]
            };
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
        public Object[] GetCntrInfo(string pContainerNumber)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CVwGateOutCntrInfo GateOutCntrInfo = new CVwGateOutCntrInfo();


            checkException = GateOutCntrInfo.GetList(string.Format(" where ContainerNumber='{0}'", pContainerNumber));

            _RowCount = GateOutCntrInfo.lstCVarVwGateOutCntrInfo.Count;
            if (checkException == null && _RowCount != 0)
            {
                _result = true;

            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize((_RowCount==0?null:GateOutCntrInfo.lstCVarVwGateOutCntrInfo.Last())) //0
                , _RowCount//1
                ,_result//2
                };
        }
        #endregion
    }
}


public class InsertMTYGateOut
{
    public String pID { get; set; }
    public String pOperationID { get; set; }

    public String pContainerNumber { get; set; }
    public string pContainerTypesID { get; set; }
    public String pHouseBillID { get; set; }

    public String pWarehouseID { get; set; }

    public String pAreaID { get; set; }

    public String pRowID { get; set; }

    public String pRowLocationID { get; set; }

    public String pWarehouseNoteID { get; set; }

    public String pEmptyContainerID { get; set; }

    public DateTime pEntryDate { get; set; }

    public String pOtherRemarks { get; set; }
    public DateTime pStorageEndDate { get; set; }
    public String pDriverNameOut { get; set; }
    public String pTruckNoOut { get; set; }

    public String pAddedBy { get; set; }

    public DateTime pAddedAt { get; set; }

    public String pUpdatedBy { get; set; }

    public DateTime pUpdatedAt { get; set; }


    /*****************************/
    public string pWhereClauseWH_MTY_GateOut { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}
