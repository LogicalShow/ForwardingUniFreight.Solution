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
    public class WH_CntrStocksController : ApiController
    {
        [HttpGet, HttpPost]
        // agnet isline=1 or ContainerType IsLine=0
        public Object[] WH_CntrStock_LoadAll(string pOrderBy)
        {
            CVw_WH_CntrStock objVw_WH_CntrStocks = new CVw_WH_CntrStock();
            objVw_WH_CntrStocks.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objVw_WH_CntrStocks.lstCVarVw_WH_CntrStock) };
        }

        [HttpGet, HttpPost]
        public Object[] WH_CntrStock_LoadItem(Int64 pWHFCLTariffIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_CntrStock objWH_CntrStocks = new CWH_CntrStock();
            objWH_CntrStocks.GetListPaging(1, 1, "WHERE ID = " + pWHFCLTariffIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objWH_CntrStocks.lstCVarWH_CntrStock[0])
            };
        }


        // [Route("/api/ContainerTypes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] WH_CntrStocks_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CVw_WH_CntrStock objVw_WH_CntrStocks = new CVw_WH_CntrStock();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());
            Int32 _RowCount = objVw_WH_CntrStocks.lstCVarVw_WH_CntrStock.Count;
            objVw_WH_CntrStocks.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            CVwWH_Hire objVwWH_Hire = new CVwWH_Hire();
            pWhereClause = " Where 1=1  and isOwn=1 and ishire=1 and (select count(*) from WH_Hire wh where wh.ishire=0 and wh.id>VwWH_Hire.id and wh.WH_CntrStockID=VwWH_Hire.WH_CntrStockID)=0";
            Int32 _RowCount2 = objVwWH_Hire.lstCVarVwWH_Hire.Count();
            objVwWH_Hire.GetListPaging(10, 1, pWhereClause, pOrderBy, out _RowCount2);

            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetList(" where 1=1 ");

            var pContainerTypesList = objCContainerTypes.lstCVarContainerTypes
                .Select(ss => new
                {
                    ID = ss.ID,
                    Name = ss.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            objCWH_Warehouse.GetList(" where 1=1 ");
            var pWarehouseList = objCWH_Warehouse.lstCVarWH_Warehouse
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
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

            CWH_CntrStock objCWH_CntrStock = new CWH_CntrStock();
            //objCWH_CntrStock.GetList(" WHERE 1 = 1 ishire = 1 and(select count(*) from WH_Hire wh where wh.ishire = 0 and wh.id > VwWH_Hire.id) > 0");
            objCWH_CntrStock.GetList("WHERE 1=1  and id not in (select  WH_CntrStockID from WH_Hire where ishire=1 and (select count(*) from WH_Hire wh where wh.ishire=0 and wh.id>WH_Hire.id)=0) ");
            var pWH_CntrStockList = objCWH_CntrStock.lstCVarWH_CntrStock
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.ContainerNumber
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            return new Object[] { new JavaScriptSerializer().Serialize(objVw_WH_CntrStocks.lstCVarVw_WH_CntrStock),//0
                                _RowCount, //1
                                new JavaScriptSerializer().Serialize(pContainerTypesList),//2
                                new JavaScriptSerializer().Serialize(objVwWH_Hire.lstCVarVwWH_Hire),//3
                                _RowCount2,//4
                                new JavaScriptSerializer().Serialize(pWarehouseList),//5
                                new JavaScriptSerializer().Serialize(pCustomerList),//6
                                new JavaScriptSerializer().Serialize(pWH_CntrStockList),//7
            };
        }

        // [Route("/api/ContainerTypes/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public object[] WH_CntrStock_Save([FromBody] UpdateWH_CntrStock UpdateWH_CntrStocks)
        {
            bool _result = false;
            int _RowCount = 0;
            string errorMsg = "";

            CVarWH_CntrStock objCVarWH_CntrStock = new CVarWH_CntrStock();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CWH_CntrStock objCWH_CntrStock = new CWH_CntrStock();
            objCWH_CntrStock.GetItem(int.Parse(UpdateWH_CntrStocks.pID));
            objCVarWH_CntrStock.ID = int.Parse(UpdateWH_CntrStocks.pID);

            objCVarWH_CntrStock.ContainerNumber = (UpdateWH_CntrStocks.pContainerNumber == null ? "0" : UpdateWH_CntrStocks.pContainerNumber.Trim().ToUpper());
            objCVarWH_CntrStock.ContainerTypesID = UpdateWH_CntrStocks.pContainerTypesID == null ? int.Parse("0") : int.Parse(UpdateWH_CntrStocks.pContainerTypesID);
            objCVarWH_CntrStock.isOwn = true;
            objCVarWH_CntrStock.WH_WarehouseID = UpdateWH_CntrStocks.pWH_WarehouseID == null ? int.Parse("0") : int.Parse(UpdateWH_CntrStocks.pWH_WarehouseID);
            objCWH_CntrStock.lstCVarWH_CntrStock.Add(objCVarWH_CntrStock);

            Exception checkException = objCWH_CntrStock.SaveMethod(objCWH_CntrStock.lstCVarWH_CntrStock);
            CVw_WH_CntrStock objCVw_WH_CntrStock = new CVw_WH_CntrStock();
            if (checkException == null)
            {
                _result = true;
                ///////////////WH_Inventory////////////////////
                if (UpdateWH_CntrStocks.pID == "0")
                {

                    CVarWH_Inventory objCVarWH_Inventory = new CVarWH_Inventory();
                    objCVarWH_Inventory.EntryDate = DateTime.Now;
                    objCVarWH_Inventory.OperationID =  0;
                    objCVarWH_Inventory.ContainerID = 0;
                    objCVarWH_Inventory.HouseBillID = 0 ;
                    objCVarWH_Inventory.WarehouseID = UpdateWH_CntrStocks.pWH_WarehouseID == null ? int.Parse("0") : int.Parse(UpdateWH_CntrStocks.pWH_WarehouseID); ;
                    objCVarWH_Inventory.AreaID =0;
                    objCVarWH_Inventory.RowID = 0;
                    objCVarWH_Inventory.RowLocationID = 0;
                    objCVarWH_Inventory.WarehouseNoteID =0;
                    objCVarWH_Inventory.EmptyContainerID = objCWH_CntrStock.lstCVarWH_CntrStock.Last().ID;
                    objCVarWH_Inventory.OtherRemarks = "";
                    objCVarWH_Inventory.StorageEndDate = DateTime.Parse("1-1-1900");
                    objCVarWH_Inventory.DriverNameIn =  "" ;
                    objCVarWH_Inventory.TruckNoIn =  "";


                    objCVarWH_Inventory.AddedBy = WebSecurity.CurrentUserId;
                    objCVarWH_Inventory.AddedAt = DateTime.Now;
                    objCVarWH_Inventory.UpdatedBy = WebSecurity.CurrentUserId;
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


                    CWH_Inventory objCWH_Inventory = new CWH_Inventory();
                    objCWH_Inventory.lstCVarWH_Inventory.Add(objCVarWH_Inventory);

                    Exception checkException1 = objCWH_Inventory.SaveMethod(objCWH_Inventory.lstCVarWH_Inventory);
                }

                ///////////////////////////////////
                objCVw_WH_CntrStock.GetListPaging(UpdateWH_CntrStocks.pPageSize, UpdateWH_CntrStocks.pPageNumber, UpdateWH_CntrStocks.pWhereClauseWH_CntrStock, UpdateWH_CntrStocks.pOrderBy, out _RowCount);
            }
            else if (checkException.ToString().Contains("ContainerNumberUQ"))
            {
                _result = false;
                errorMsg = "Failed Save Container number , it's duplicated ";
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_CntrStock.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCVw_WH_CntrStock.lstCVarVw_WH_CntrStock) : null //pData[2]
                , _RowCount //pData[3]
                , errorMsg//4
            };
        }


        // [Route("/api/ContainerTypes/Delete/{pContainerTypesIDs}")]
        [HttpGet, HttpPost]
        public object[] WH_CntrStock_DeleteList(String pWH_CntrStockIDs, string pWhereClauseWH_CntrStock,
            Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_CntrStock objCWH_CntrStock = new CWH_CntrStock();
            foreach (var pWH_CntrStockID in pWH_CntrStockIDs.Split(','))
            {
                objCWH_CntrStock.lstDeletedCPKWH_CntrStock.Add(new CPKWH_CntrStock() { ID = Int32.Parse(pWH_CntrStockID.Trim()) });
            }
            Exception checkException = objCWH_CntrStock.DeleteItem(objCWH_CntrStock.lstDeletedCPKWH_CntrStock);
            CVw_WH_CntrStock objCvw_WH_CntrStock = new CVw_WH_CntrStock();
            if (checkException == null)
                _result = true;
            objCvw_WH_CntrStock.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_CntrStock, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvw_WH_CntrStock.lstCVarVw_WH_CntrStock) //pData[1]
            };
        }
        ////////////////////////////////////////
        /////////////////VwWH_Hire//////////////
        ////////////////////////////////////////
        [HttpGet, HttpPost]
        // agnet isline=1 or ContainerType IsLine=0
        public Object[] WH_Hire_LoadAll(string pOrderBy)
        {
            CVwWH_Hire objVw_WH_Hires = new CVwWH_Hire();
            objVw_WH_Hires.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objVw_WH_Hires.lstCVarVwWH_Hire) };
        }

        [HttpGet, HttpPost]
        public Object[] WH_Hire_LoadItem(Int64 pWHFCLTariffIDForModal, string pWhereClause)
        {
            Int32 _RowCount = 0;
            CWH_Hire objWH_Hires = new CWH_Hire();
            objWH_Hires.GetListPaging(1, 1, "WHERE ID = " + pWHFCLTariffIDForModal.ToString(), "ID", out _RowCount);
            CWH_CntrStock objCWH_CntrStock = new CWH_CntrStock();
            objCWH_CntrStock.GetList(pWhereClause);
            var pWH_CntrStockList = objCWH_CntrStock.lstCVarWH_CntrStock
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.ContainerNumber
                })
                .Distinct().OrderBy(o => o.Name).ToList();
            return new Object[] {
                new JavaScriptSerializer().Serialize(objWH_Hires.lstCVarWH_Hire[0]),//0
                new JavaScriptSerializer().Serialize(pWH_CntrStockList),//1
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_Hire_Save([FromBody] UpdateWH_Hire UpdateWH_Hires)
        {
            bool _result = false;
            int _RowCount = 0;

            CVarWH_Hire objCVarWH_Hire = new CVarWH_Hire();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CWH_Hire objCWH_Hire = new CWH_Hire();
            objCWH_Hire.GetItem(int.Parse(UpdateWH_Hires.pID));
            objCVarWH_Hire.ID = int.Parse(UpdateWH_Hires.pID);

            objCVarWH_Hire.Remarks = (UpdateWH_Hires.pRemarks == null ? "0" : UpdateWH_Hires.pRemarks.Trim().ToUpper());
            objCVarWH_Hire.WH_CntrStockID = UpdateWH_Hires.pWH_CntrStockID == null ? int.Parse("0") : int.Parse(UpdateWH_Hires.pWH_CntrStockID);
            objCVarWH_Hire.WH_WarehouseID = UpdateWH_Hires.pWH_WarehouseID == null ? int.Parse("0") : int.Parse(UpdateWH_Hires.pWH_WarehouseID);
            objCVarWH_Hire.CustomerID = UpdateWH_Hires.pCustomerID == null ? int.Parse("0") : int.Parse(UpdateWH_Hires.pCustomerID);
            objCVarWH_Hire.TransactionDate = UpdateWH_Hires.pID == "0" ?DateTime.Now: DateTime.Parse(objCWH_Hire.lstCVarWH_Hire[0].TransactionDate.ToString("MM/dd/yyyy"));
            objCVarWH_Hire.IsHire =  UpdateWH_Hires.pIsHire = true;
            objCWH_Hire.lstCVarWH_Hire.Add(objCVarWH_Hire);

            Exception checkException = objCWH_Hire.SaveMethod(objCWH_Hire.lstCVarWH_Hire);
            CVwWH_Hire objCVw_WH_Hire = new CVwWH_Hire();
            CVw_WH_CntrStock objVw_WH_CntrStocks = new CVw_WH_CntrStock();
            Int32 _RowCountCS = 0;
            if (checkException == null)
            {
                _result = true;

                objCVw_WH_Hire.GetListPaging(UpdateWH_Hires.pPageSize, UpdateWH_Hires.pPageNumber, UpdateWH_Hires.pWhereClauseWH_Hire, UpdateWH_Hires.pOrderBy, out _RowCount);

                string pWhereClauseCS = "WHERE 1=1 and isOwn=1 and id not in (select  WH_CntrStockID from WH_Hire where ishire=1 and (select count(*) from WH_Hire wh where wh.ishire=0 and wh.id>WH_Hire.id)=0) ";
                _RowCountCS = objVw_WH_CntrStocks.lstCVarVw_WH_CntrStock.Count;
                objVw_WH_CntrStocks.GetListPaging(10, 1, pWhereClauseCS, " ID DESC ", out _RowCountCS);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_Hire.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCVw_WH_Hire.lstCVarVwWH_Hire) : null //pData[2]
                , _RowCount //pData[3]
                ,_result ? serializer.Serialize(objVw_WH_CntrStocks.lstCVarVw_WH_CntrStock):null //pData[4]
                , _RowCountCS // pData[5]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_Hire_DeleteList(String pWH_HireIDs, string pWhereClauseWH_Hire,
    Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_Hire objCWH_Hire = new CWH_Hire();
            foreach (var pWH_HireID in pWH_HireIDs.Split(','))
            {
                objCWH_Hire.lstDeletedCPKWH_Hire.Add(new CPKWH_Hire() { ID = Int32.Parse(pWH_HireID.Trim()) });
            }
            Exception checkException = objCWH_Hire.DeleteItem(objCWH_Hire.lstDeletedCPKWH_Hire);
            CVwWH_Hire objCvw_WH_Hire = new CVwWH_Hire();
            if (checkException == null)
                _result = true;
            objCvw_WH_Hire.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_Hire, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvw_WH_Hire.lstCVarVwWH_Hire) //pData[1]
            };
        }

        public Object[] GetWH_CntrStockID(string pWhereClause)
        {
            CWH_CntrStock objCWH_CntrStock = new CWH_CntrStock();
            objCWH_CntrStock.GetList(pWhereClause);
            var pWH_CntrStockList = objCWH_CntrStock.lstCVarWH_CntrStock
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.ContainerNumber
                })
                .Distinct().OrderBy(o => o.Name).ToList();
            return new Object[] {
                new JavaScriptSerializer().Serialize(pWH_CntrStockList),//0
            };
        }

    }
}

public class UpdateWH_CntrStock
{
    public String pID { get; set; }
    public String pContainerNumber { get; set; }
    public String pContainerTypesID { get; set; }
    public string pWH_WarehouseID { get; set; }

    /*****************************/
    public string pWhereClauseWH_CntrStock { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}

public class UpdateWH_Hire
{
    public String pID { get; set; }
    public String pRemarks { get; set; }
    public String pWH_CntrStockID { get; set; }
    public String pWH_WarehouseID { get; set; }
    public String pCustomerID { get; set; }
    public String pTransactionDate { get; set; }
    public Boolean pIsHire { get; set; }

    /*****************************/
    public string pWhereClauseWH_Hire { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}