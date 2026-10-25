using Forwarding.MvcApp.Models.ContainerFreightStation.Transactions;
using Forwarding.MvcApp.Models.ContainerYard.Transactions;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
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
    public class WH_MTY_InventoryController : ApiController
    {

        [HttpGet, HttpPost]
        // agnet isline=1 or ContainerType IsLine=0
        public Object[] WH_MTY_Inventory_LoadAll(string pOrderBy)
        {
            CvwWH_MTY_Inventory objVwvwWH_MTY_Inventory = new CvwWH_MTY_Inventory();
            objVwvwWH_MTY_Inventory.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objVwvwWH_MTY_Inventory.lstCVarvwWH_MTY_Inventory) };
        }

        [HttpGet, HttpPost]
        public object[] WH_MTY_Inventory_LoadItem(string pID)
        {
            bool _result = false;
            Exception checkException = null;
            Int32 _RowCount = 0;

            CvwWH_MTY_Inventory objCvwWH_MTY_Inventory = new CvwWH_MTY_Inventory();
            CWH_Area objCWH_Area = new CWH_Area();
            CWH_Row objCWH_Row = new CWH_Row();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            checkException = objCvwWH_MTY_Inventory.GetList("WHERE ID = " + pID);

            if (checkException == null)
            {
                _result = true;
                _RowCount = objCvwWH_MTY_Inventory.lstCVarvwWH_MTY_Inventory.Count;

            }
            // Getting Areas list
            objCWH_Area.GetList(string.Format(" where 1=1 and WarehouseID = {0} ", objCvwWH_MTY_Inventory.lstCVarvwWH_MTY_Inventory[0].WarehouseID));
            var pAreasList = objCWH_Area.lstCVarWH_Area
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting Rows list
            objCWH_Row.GetList(string.Format(" where 1=1  and  AreaID = {0} ", objCvwWH_MTY_Inventory.lstCVarvwWH_MTY_Inventory[0].AreaID));
            var pRowsList = objCWH_Row.lstCVarWH_Row
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            // Getting RowLocation list
            objCWH_RowLocation.GetList(string.Format(" where 1=1 and  RowID = {0} ", objCvwWH_MTY_Inventory.lstCVarvwWH_MTY_Inventory[0].RowID));
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
                ,serializer.Serialize(_RowCount == 0 ? null :objCvwWH_MTY_Inventory.lstCVarvwWH_MTY_Inventory[0]) //data[1]
                ,serializer.Serialize(pAreasList) //2
                ,serializer.Serialize(pRowsList) //3
                ,serializer.Serialize(pRowLocationsList) //4

            };
        }


        [HttpGet, HttpPost]
        public Object[] WH_MTY_Inventory_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CvwWH_MTY_Inventory objCvwWH_MTY_Inventory = new CvwWH_MTY_Inventory();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());

            checkException = objCvwWH_MTY_Inventory.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

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
            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_MTY_Inventory.lstCVarvwWH_MTY_Inventory) //0
                , _RowCount//1
                ,_result//2
                ,serializer.Serialize(pWarehousesList) //3
                ,serializer.Serialize(pAreasList) //4
                ,serializer.Serialize(pRowsList) //5
                ,serializer.Serialize(pRowLocationsList) //6
                ,serializer.Serialize(pWarehouseNotesList) //7
                ,serializer.Serialize(pContainerTypesList) //8
                };
        }


        [HttpGet, HttpPost]
        public object[] WH_MTY_Inventory_Save([FromBody] InsertMTYInventory InsertInventory)
        {
            bool _result = false;
            int _RowCount = 0;

            ///////////////////////////add to WH_CntrStock////////////////////////
            CVarWH_CntrStock objCVarWH_CntrStock = new CVarWH_CntrStock();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CWH_CntrStock objCWH_CntrStock = new CWH_CntrStock();
            objCWH_CntrStock.GetList(string.Format(" where ContainerNumber like '%{0}%'", InsertInventory.pContainerNumber.Trim()));
            objCVarWH_CntrStock.ID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? 0 : objCWH_CntrStock.lstCVarWH_CntrStock.First().ID;
            if (InsertInventory.pWarehouseID == "")
            {
                InsertInventory.pWarehouseID = null;
            }
            ////////////////////////////check hire and close ////////////////////
            CVarWH_Hire objCVarWH_Hire = new CVarWH_Hire();

            CWH_Hire objCWH_Hire = new CWH_Hire();
            if (objCVarWH_CntrStock.ID != 0)
            {


                objCWH_Hire.GetList(string.Format(" where WH_CntrStockID={0}", objCVarWH_CntrStock.ID));
                objCVarWH_Hire.ID = objCWH_Hire.lstCVarWH_Hire.Count == 0 ? 0 : objCWH_Hire.lstCVarWH_Hire.Last().IsHire == true ? 0 : objCWH_Hire.lstCVarWH_Hire.Last().ID;

                objCVarWH_Hire.Remarks = "";
                objCVarWH_Hire.WH_CntrStockID = objCVarWH_CntrStock.ID;
                objCVarWH_Hire.WH_WarehouseID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? (InsertInventory.pWarehouseID == null ? int.Parse("0") : int.Parse(InsertInventory.pWarehouseID)) : objCWH_CntrStock.lstCVarWH_CntrStock.First().WH_WarehouseID;
                objCVarWH_Hire.CustomerID = objCWH_Hire.lstCVarWH_Hire.Count == 0 ? int.Parse("0") : objCWH_Hire.lstCVarWH_Hire.Last().CustomerID;
                objCVarWH_Hire.TransactionDate = InsertInventory.pEntryDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertInventory.pEntryDate;
                objCVarWH_Hire.IsHire = false;
                objCWH_Hire.lstCVarWH_Hire.Add(objCVarWH_Hire);

                Exception checkExceptionH = objCVarWH_Hire.ID == 0 ? objCWH_Hire.SaveMethod(objCWH_Hire.lstCVarWH_Hire) : null;
            }
            //////////////////////////////end check hire and close///////////////////////////////////////

            objCVarWH_CntrStock.ContainerNumber = (InsertInventory.pContainerNumber == null ? "0" : InsertInventory.pContainerNumber.Trim().ToUpper());
            objCVarWH_CntrStock.ContainerTypesID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? (InsertInventory.pContainerTypesID == null ? int.Parse("0") : int.Parse(InsertInventory.pContainerTypesID)) : objCWH_CntrStock.lstCVarWH_CntrStock.First().ContainerTypesID;
            objCVarWH_CntrStock.isOwn = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? false : objCWH_CntrStock.lstCVarWH_CntrStock.First().isOwn;
            objCVarWH_CntrStock.WH_WarehouseID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? (InsertInventory.pWarehouseID == null ? int.Parse("0") : int.Parse(InsertInventory.pWarehouseID)) : objCWH_CntrStock.lstCVarWH_CntrStock.First().WH_WarehouseID;
            objCWH_CntrStock.lstCVarWH_CntrStock.Add(objCVarWH_CntrStock);

            Exception checkExceptionC = objCWH_CntrStock.SaveMethod(objCWH_CntrStock.lstCVarWH_CntrStock);
            //////////////////////////////end add to WH_CntrStock///////////////////////////////////////


            CVarWH_Inventory objCVarWH_Inventory = new CVarWH_Inventory();

            CWH_Inventory objCWH_Inventory = new CWH_Inventory();
            objCWH_Inventory.GetItem(int.Parse(InsertInventory.pID));
            objCVarWH_Inventory.ID = int.Parse(InsertInventory.pID);


            objCVarWH_Inventory.EntryDate = InsertInventory.pEntryDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertInventory.pEntryDate;
            objCVarWH_Inventory.OperationID = InsertInventory.pOperationID == null ? 0 : long.Parse(InsertInventory.pOperationID);
            objCVarWH_Inventory.ContainerID = 0;
            objCVarWH_Inventory.HouseBillID = InsertInventory.pHouseBillID == null ? 0 : long.Parse(InsertInventory.pHouseBillID);
            objCVarWH_Inventory.WarehouseID = InsertInventory.pWarehouseID == null ? 0 : int.Parse(InsertInventory.pWarehouseID);
            objCVarWH_Inventory.AreaID = InsertInventory.pAreaID == "" ? 0 : int.Parse(InsertInventory.pAreaID);
            objCVarWH_Inventory.RowID = InsertInventory.pRowID == "" ? 0 : int.Parse(InsertInventory.pRowID);
            objCVarWH_Inventory.RowLocationID = InsertInventory.pRowLocationID == "" ? 0 : int.Parse(InsertInventory.pRowLocationID);
            objCVarWH_Inventory.WarehouseNoteID = InsertInventory.pWarehouseNoteID == null ? 0 : int.Parse(InsertInventory.pWarehouseNoteID);
            objCVarWH_Inventory.EmptyContainerID = objCVarWH_CntrStock.ID;
            objCVarWH_Inventory.OtherRemarks = InsertInventory.pOtherRemarks == "" ? "" : InsertInventory.pOtherRemarks.Trim().ToString();
            objCVarWH_Inventory.StorageEndDate = DateTime.Parse("1-1-1900");
            objCVarWH_Inventory.DriverNameIn = InsertInventory.pDriverNameIn == "" ? "" : InsertInventory.pDriverNameIn.Trim().ToString();
            objCVarWH_Inventory.TruckNoIn = InsertInventory.pTruckNoIn == "" ? "" : InsertInventory.pTruckNoIn.Trim().ToString();

            objCVarWH_Inventory.AddedBy = InsertInventory.pAddedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
            objCVarWH_Inventory.AddedAt = DateTime.Now;
            objCVarWH_Inventory.UpdatedBy = InsertInventory.pUpdatedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
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

            CvwWH_MTY_Inventory objCvwWH_MTY_Inventory = new CvwWH_MTY_Inventory();
            if (checkException == null)
            {
                _result = true;
                objCvwWH_MTY_Inventory.GetListPaging(InsertInventory.pPageSize, InsertInventory.pPageNumber, InsertInventory.pWhereClauseWH_MTY_Inventory, InsertInventory.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_Inventory.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_MTY_Inventory.lstCVarvwWH_MTY_Inventory) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        // [Route("/api/ContainerTypes/Delete/{pContainerTypesIDs}")]
        [HttpGet, HttpPost]
        public object[] WH_MTY_Inventory_DeleteList(String pWH_MTY_InventoryIDs, string pWhereClauseWH_MTY_Inventory,
            Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_Inventory objCWH_Inventory = new CWH_Inventory();
            foreach (var pWH_MTY_InventoryID in pWH_MTY_InventoryIDs.Split(','))
            {
                objCWH_Inventory.lstDeletedCPKWH_Inventory.Add(new CPKWH_Inventory() { ID = Int32.Parse(pWH_MTY_InventoryID.Trim()) });
            }
            Exception checkException = objCWH_Inventory.DeleteItem(objCWH_Inventory.lstDeletedCPKWH_Inventory);
            CvwWH_MTY_Inventory objCvwWH_MTY_Inventory = new CvwWH_MTY_Inventory();
            if (checkException == null)
                _result = true;
            objCvwWH_MTY_Inventory.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_MTY_Inventory, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwWH_MTY_Inventory.lstCVarvwWH_MTY_Inventory) //pData[1]
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
        public Object[] CalculateInvItms(string pContainerNumber)
        {
            bool _result = false;
            Exception checkException = null;
            Decimal InvAmount = 0;

            CWH_CYReceivables objCWH_CYReceivables = new CWH_CYReceivables();

            // Getting Locations list
            checkException = objCWH_CYReceivables.CalculateMTYInv(pContainerNumber);

            if (checkException == null)
            {
                _result = true;
                for (int i = 0; i < objCWH_CYReceivables.lstCVarWH_CYReceivables.Count; i++)
                {
                    InvAmount += objCWH_CYReceivables.lstCVarWH_CYReceivables[i].SaleAmount;
                }
            }

            return new Object[]
            {
                _result // 0
                ,InvAmount // 1
                , new JavaScriptSerializer().Serialize(objCWH_CYReceivables.lstCVarWH_CYReceivables) //2

            };
        }


        #endregion

    }
}

public class InsertMTYInventory
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
    public String pDriverNameIn { get; set; }
    public String pTruckNoIn { get; set; }

    public String pAddedBy { get; set; }

    public DateTime pAddedAt { get; set; }

    public String pUpdatedBy { get; set; }

    public DateTime pUpdatedAt { get; set; }


    /*****************************/
    public string pWhereClauseWH_MTY_Inventory { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}