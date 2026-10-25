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
        public class WH_MTY_GateInController : ApiController
        {

            [HttpGet, HttpPost]
            // agnet isline=1 or ContainerType IsLine=0
            public Object[] WH_MTY_GateIn_LoadAll(string pOrderBy)
            {
                CvwWH_MTY_GateIn objVwWH_MTY_GateIn = new CvwWH_MTY_GateIn();
                objVwWH_MTY_GateIn.GetList(" order by " + pOrderBy);
                return new Object[] { new JavaScriptSerializer().Serialize(objVwWH_MTY_GateIn.lstCVarvwWH_MTY_GateIn) };
            }

            [HttpGet, HttpPost]
            public object[] WH_MTY_GateIn_LoadItem(string pID)
            {
                bool _result = false;
                Exception checkException = null;
                Int32 _RowCount = 0;

                CvwWH_MTY_GateIn objCvwWH_MTY_GateIn = new CvwWH_MTY_GateIn();
                CWH_Area objCWH_Area = new CWH_Area();
                CWH_Row objCWH_Row = new CWH_Row();
                CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
                checkException = objCvwWH_MTY_GateIn.GetList("WHERE ID = " + pID);

                if (checkException == null)
                {
                    _result = true;
                    _RowCount = objCvwWH_MTY_GateIn.lstCVarvwWH_MTY_GateIn.Count;

                }
                // Getting Areas list
                objCWH_Area.GetList(string.Format(" where 1=1 and WarehouseID = {0} ", objCvwWH_MTY_GateIn.lstCVarvwWH_MTY_GateIn[0].WarehouseID));
                var pAreasList = objCWH_Area.lstCVarWH_Area
                    .Select(s => new
                    {
                        ID = s.ID
                        ,
                        Name = s.Name
                    })
                    .Distinct().OrderBy(o => o.Name).ToList();

                // Getting Rows list
                objCWH_Row.GetList(string.Format(" where 1=1  and  AreaID = {0} ", objCvwWH_MTY_GateIn.lstCVarvwWH_MTY_GateIn[0].AreaID));
                var pRowsList = objCWH_Row.lstCVarWH_Row
                    .Select(s => new
                    {
                        ID = s.ID
                        ,
                        Name = s.Name
                    })
                    .Distinct().OrderBy(o => o.Name).ToList();

                // Getting RowLocation list
                objCWH_RowLocation.GetList(string.Format(" where 1=1 and  RowID = {0} ", objCvwWH_MTY_GateIn.lstCVarvwWH_MTY_GateIn[0].RowID));
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
                ,serializer.Serialize(_RowCount == 0 ? null :objCvwWH_MTY_GateIn.lstCVarvwWH_MTY_GateIn[0]) //data[1]
                ,serializer.Serialize(pAreasList) //2
                ,serializer.Serialize(pRowsList) //3
                ,serializer.Serialize(pRowLocationsList) //4

            };
            }

            [HttpGet, HttpPost]
            public Object[] WH_MTY_GateIn_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
            {
                bool _result = false;
                Exception checkException = null;
                int _RowCount = 0;

                CvwWH_MTY_GateIn objCvwWH_MTY_GateIn = new CvwWH_MTY_GateIn();

                pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());

                checkException = objCvwWH_MTY_GateIn.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

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
                new JavaScriptSerializer().Serialize(objCvwWH_MTY_GateIn.lstCVarvwWH_MTY_GateIn) //0
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
            public object[] WH_MTY_GateIn_Save([FromBody] InsertMTYGateIn InsertGateIn)
            {
                bool _result = false;
                int _RowCount = 0;
            if (InsertGateIn.pWarehouseID == "")
            {
                InsertGateIn.pWarehouseID = null;
            }
            ///////////////////////////add to WH_CntrStock////////////////////////
            CVarWH_CntrStock objCVarWH_CntrStock = new CVarWH_CntrStock();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CWH_CntrStock objCWH_CntrStock = new CWH_CntrStock();
                objCWH_CntrStock.GetList(string.Format(" where ContainerNumber like '%{0}%'", InsertGateIn.pContainerNumber.Trim()));
                objCVarWH_CntrStock.ID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? 0 : objCWH_CntrStock.lstCVarWH_CntrStock.First().ID;


            objCVarWH_CntrStock.ContainerNumber = (InsertGateIn.pContainerNumber == null ? "0" : InsertGateIn.pContainerNumber.Trim().ToUpper());
            objCVarWH_CntrStock.ContainerTypesID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? (InsertGateIn.pContainerTypesID == null ? int.Parse("0") : int.Parse(InsertGateIn.pContainerTypesID)) : objCWH_CntrStock.lstCVarWH_CntrStock.First().ContainerTypesID;
            objCVarWH_CntrStock.isOwn = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? false : objCWH_CntrStock.lstCVarWH_CntrStock.First().isOwn;
            objCVarWH_CntrStock.WH_WarehouseID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? (InsertGateIn.pWarehouseID == null ? int.Parse("0") : int.Parse(InsertGateIn.pWarehouseID)) : objCWH_CntrStock.lstCVarWH_CntrStock.First().WH_WarehouseID;
            objCWH_CntrStock.lstCVarWH_CntrStock.Add(objCVarWH_CntrStock);

            Exception checkExceptionC = objCWH_CntrStock.SaveMethod(objCWH_CntrStock.lstCVarWH_CntrStock);
            //////////////////////////////end add to WH_CntrStock///////////////////////////////////////


                ////////////////////////////check container is in inventory? ///////////
                CWH_Inventory objCWH_InventoryCHk = new CWH_Inventory();
                objCWH_InventoryCHk.GetList(string.Format(" where OperationID is null and StorageEndDate is null and EmptyContainerID ={0}", objCVarWH_CntrStock.ID));

                CWH_Inventory objCWH_InventoryCHkWthDate = new CWH_Inventory();
                objCWH_InventoryCHkWthDate.GetList(string.Format(" where OperationID is null and StorageEndDate is null and EntryDate is null and EmptyContainerID ={0}", objCVarWH_CntrStock.ID));


                CVarWH_Inventory objCVarWH_Inventory = new CVarWH_Inventory();
                CvwWH_MTY_GateIn objCvwWH_MTY_GateIn = new CvwWH_MTY_GateIn();
                String ValidateMsg = "";
                if (objCWH_InventoryCHkWthDate.lstCVarWH_Inventory.Count > 0 && InsertGateIn.pEntryDate.Year != 1900)
                {
                    ////////////////////////////check hire and close ////////////////////
                    CVarWH_Hire objCVarWH_Hire = new CVarWH_Hire();

                    CWH_Hire objCWH_Hire = new CWH_Hire();
                    if (objCVarWH_CntrStock.ID != 0)
                    {


                        objCWH_Hire.GetList(string.Format(" where WH_CntrStockID={0}", objCVarWH_CntrStock.ID));
                        objCVarWH_Hire.ID = objCWH_Hire.lstCVarWH_Hire.Count == 0 ? 0 : objCWH_Hire.lstCVarWH_Hire.Last().IsHire == true ? 0 : objCWH_Hire.lstCVarWH_Hire.Last().ID;

                        objCVarWH_Hire.Remarks = "";
                        objCVarWH_Hire.WH_CntrStockID = objCVarWH_CntrStock.ID;
                        objCVarWH_Hire.WH_WarehouseID = objCWH_CntrStock.lstCVarWH_CntrStock.Count == 0 ? (InsertGateIn.pWarehouseID == null ? int.Parse("0") : int.Parse(InsertGateIn.pWarehouseID)) : objCWH_CntrStock.lstCVarWH_CntrStock.First().WH_WarehouseID;
                        objCVarWH_Hire.CustomerID = objCWH_Hire.lstCVarWH_Hire.Count == 0 ? int.Parse("0") : objCWH_Hire.lstCVarWH_Hire.Last().CustomerID;
                        objCVarWH_Hire.TransactionDate = InsertGateIn.pEntryDate.Year == 1900 ? DateTime.Parse("1-1-1900") : InsertGateIn.pEntryDate;
                        objCVarWH_Hire.IsHire = false;
                        objCWH_Hire.lstCVarWH_Hire.Add(objCVarWH_Hire);

                        Exception checkExceptionH = objCVarWH_Hire.ID == 0 ? objCWH_Hire.SaveMethod(objCWH_Hire.lstCVarWH_Hire) : null;
                    }
                    //////////////////////////////end check hire and close///////////////////////////////////////
                    ////////////////////////////end check container is in inventory? ///////
                     ////////////////////////////add inventory ////////////////////
                    Boolean isNew = (int.Parse(InsertGateIn.pID) == 0 ? false : true);

                    CWH_Inventory objCWH_Inventory = new CWH_Inventory();
                    objCWH_Inventory.GetItem(int.Parse(InsertGateIn.pID));
                    objCVarWH_Inventory.ID = int.Parse(InsertGateIn.pID);


                    objCVarWH_Inventory.EntryDate = InsertGateIn.pEntryDate.Year == 1900 ? DateTime.Parse("1-1-1900") : InsertGateIn.pEntryDate;
                    objCVarWH_Inventory.OperationID = InsertGateIn.pOperationID == null ? 0 : long.Parse(InsertGateIn.pOperationID);
                    objCVarWH_Inventory.ContainerID = 0;
                    objCVarWH_Inventory.HouseBillID = InsertGateIn.pHouseBillID == null ? 0 : long.Parse(InsertGateIn.pHouseBillID);
                    objCVarWH_Inventory.WarehouseID = InsertGateIn.pWarehouseID == null ? 0 : int.Parse(InsertGateIn.pWarehouseID);
                    objCVarWH_Inventory.AreaID = InsertGateIn.pAreaID == "" ? 0 : int.Parse(InsertGateIn.pAreaID);
                    objCVarWH_Inventory.RowID = InsertGateIn.pRowID == "" ? 0 : int.Parse(InsertGateIn.pRowID);
                    objCVarWH_Inventory.RowLocationID = InsertGateIn.pRowLocationID == "" ? 0 : int.Parse(InsertGateIn.pRowLocationID);
                    objCVarWH_Inventory.WarehouseNoteID = InsertGateIn.pWarehouseNoteID == null ? 0 : int.Parse(InsertGateIn.pWarehouseNoteID);
                    objCVarWH_Inventory.EmptyContainerID = objCVarWH_CntrStock.ID;
                    objCVarWH_Inventory.OtherRemarks = InsertGateIn.pOtherRemarks == "" ? "" : InsertGateIn.pOtherRemarks.Trim().ToString();
                    objCVarWH_Inventory.StorageEndDate = DateTime.Parse("1-1-1900");
                    objCVarWH_Inventory.DriverNameIn = InsertGateIn.pDriverNameIn == "" ? "" : InsertGateIn.pDriverNameIn;
                    objCVarWH_Inventory.TruckNoIn = InsertGateIn.pTruckNoIn == "" ? "" : InsertGateIn.pTruckNoIn;

                    objCVarWH_Inventory.AddedBy = InsertGateIn.pAddedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
                    objCVarWH_Inventory.AddedAt = DateTime.Now;
                    objCVarWH_Inventory.UpdatedBy = InsertGateIn.pUpdatedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
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

                    ////////////////////////////end add inventory ////////////////////
                    if (checkException == null)
                    {
                        if (InsertGateIn.pEntryDate.Year != 1900)
                        {
                            CWH_CYInvoices objCWH_CYInvoices = new CWH_CYInvoices();
                            objCWH_CYInvoices.GetList(string.Format(" where WH_InventoryID={0}", objCWH_Inventory.lstCVarWH_Inventory[0].ID));
                            if (objCWH_CYInvoices.lstCVarWH_CYInvoices.Count == 0)
                            {
                                ////////////////////////////add invoice ////////////////////
                                CVarWH_CYInvoices ObjCVarWH_CYInvoices = new CVarWH_CYInvoices();
                                ObjCVarWH_CYInvoices.ID = 0;
                                ObjCVarWH_CYInvoices.InvoiceNumber = 0;
                                ObjCVarWH_CYInvoices.InvoiceTypeID = 0;
                                ObjCVarWH_CYInvoices.CustomerID = InsertGateIn.pCustomerID == "" ? 0 : int.Parse(InsertGateIn.pCustomerID);
                                ObjCVarWH_CYInvoices.CurrencyID = 0;
                                ObjCVarWH_CYInvoices.ExchangeRate = 1;
                                ObjCVarWH_CYInvoices.InvoiceDate = DateTime.Now;
                                ObjCVarWH_CYInvoices.AmountWithoutVAT = InsertGateIn.pAmountWithoutVAT == "" ? 0 : Decimal.Parse(InsertGateIn.pAmountWithoutVAT);
                                ObjCVarWH_CYInvoices.TaxTypeID = 0;
                                ObjCVarWH_CYInvoices.TaxPercentage = 14;
                                ObjCVarWH_CYInvoices.TaxAmount = ObjCVarWH_CYInvoices.AmountWithoutVAT != 0 ? ObjCVarWH_CYInvoices.AmountWithoutVAT * ObjCVarWH_CYInvoices.TaxPercentage / 100 : 0;
                                ObjCVarWH_CYInvoices.Amount = ObjCVarWH_CYInvoices.AmountWithoutVAT + ObjCVarWH_CYInvoices.TaxAmount;
                                ObjCVarWH_CYInvoices.PaidAmount = 0;
                                ObjCVarWH_CYInvoices.RemainingAmount = ObjCVarWH_CYInvoices.Amount;
                                ObjCVarWH_CYInvoices.InvoiceStatusID = 0;
                                ObjCVarWH_CYInvoices.IsApproved = false;
                                ObjCVarWH_CYInvoices.IsDeleted = false;
                                ObjCVarWH_CYInvoices.ApprovingUserID = 0;
                                ObjCVarWH_CYInvoices.CreatorUserID = WebSecurity.CurrentUserId;
                                ObjCVarWH_CYInvoices.CreationDate = DateTime.Now;
                                ObjCVarWH_CYInvoices.ModificatorUserID = 0;
                                ObjCVarWH_CYInvoices.ModificationDate = DateTime.Parse("1-1-1900");
                                ObjCVarWH_CYInvoices.GRT = "0";
                                ObjCVarWH_CYInvoices.DWT = "0";
                                ObjCVarWH_CYInvoices.NRT = "0";
                                ObjCVarWH_CYInvoices.LOA = "0";
                                ObjCVarWH_CYInvoices.WH_CntrStockID = objCVarWH_CntrStock.ID;
                                ObjCVarWH_CYInvoices.WH_InventoryID = objCWH_Inventory.lstCVarWH_Inventory[0].ID;
                                objCWH_CYInvoices.lstCVarWH_CYInvoices.Add(ObjCVarWH_CYInvoices);
                                Exception checkExceptionInv = objCWH_CYInvoices.SaveMethod(objCWH_CYInvoices.lstCVarWH_CYInvoices);
                                ////////////////////////////end add invoice ////////////////

                                if (checkExceptionInv == null)
                                {
                                    CWH_CYReceivables objCWH_CYReceivables = new CWH_CYReceivables();
                                    objCWH_CYReceivables.GetList(string.Format(" where WH_CYInvoicesID={0}", objCWH_CYInvoices.lstCVarWH_CYInvoices[0].ID));
                                    if (objCWH_CYReceivables.lstCVarWH_CYReceivables.Count == 0)
                                    {
                                        ////////////////////////////add Receivables ////////////////////
                                        Exception checkExceptionRec = objCWH_CYReceivables.CalculateMTYInv(InsertGateIn.pContainerNumber.Trim());
                                        if (checkExceptionRec == null)
                                        {
                                            _result = true;
                                            for (int i = 0; i < objCWH_CYReceivables.lstCVarWH_CYReceivables.Count; i++)
                                            {
                                                objCWH_CYReceivables.lstCVarWH_CYReceivables[i].WH_CYInvoicesID = objCWH_CYInvoices.lstCVarWH_CYInvoices[0].ID;
                                            }
                                        }
                                        Exception checkExceptionRES = objCWH_CYReceivables.SaveMethod(objCWH_CYReceivables.lstCVarWH_CYReceivables);
                                        ////////////////////////////end add recceivables ////////////////
                                    }
                                }
                            }
                        }

                        _result = true;
                        objCvwWH_MTY_GateIn.GetListPaging(InsertGateIn.pPageSize, InsertGateIn.pPageNumber, InsertGateIn.pWhereClauseWH_MTY_GateIn, InsertGateIn.pOrderBy, out _RowCount);
                    }

                }
                else if (objCWH_InventoryCHk.lstCVarWH_Inventory.Count >= 0)
                {
                    ////////////////////////////add inventory ////////////////////
                    Boolean isNew = (int.Parse(InsertGateIn.pID) == 0 ? false : true);

                    CWH_Inventory objCWH_Inventory = new CWH_Inventory();
                    objCWH_Inventory.GetItem(int.Parse(InsertGateIn.pID));
                    objCVarWH_Inventory.ID = int.Parse(InsertGateIn.pID);


                    objCVarWH_Inventory.EntryDate = InsertGateIn.pEntryDate.Year == 1900 || InsertGateIn.pEntryDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertGateIn.pEntryDate;
                    objCVarWH_Inventory.OperationID = InsertGateIn.pOperationID == null ? 0 : long.Parse(InsertGateIn.pOperationID);
                    objCVarWH_Inventory.ContainerID = 0;
                    objCVarWH_Inventory.HouseBillID = InsertGateIn.pHouseBillID == null ? 0 : long.Parse(InsertGateIn.pHouseBillID);
                    objCVarWH_Inventory.WarehouseID = InsertGateIn.pWarehouseID == null ? 0 : int.Parse(InsertGateIn.pWarehouseID);
                    objCVarWH_Inventory.AreaID = InsertGateIn.pAreaID == "" ? 0 : int.Parse(InsertGateIn.pAreaID);
                    objCVarWH_Inventory.RowID = InsertGateIn.pRowID == "" ? 0 : int.Parse(InsertGateIn.pRowID);
                    objCVarWH_Inventory.RowLocationID = InsertGateIn.pRowLocationID == "" ? 0 : int.Parse(InsertGateIn.pRowLocationID);
                    objCVarWH_Inventory.WarehouseNoteID = InsertGateIn.pWarehouseNoteID == null ? 0 : int.Parse(InsertGateIn.pWarehouseNoteID);
                    objCVarWH_Inventory.EmptyContainerID = objCVarWH_CntrStock.ID;
                    objCVarWH_Inventory.OtherRemarks = InsertGateIn.pOtherRemarks == "" ? "" : InsertGateIn.pOtherRemarks.Trim().ToString();
                    objCVarWH_Inventory.StorageEndDate = DateTime.Parse("1-1-1900");
                    objCVarWH_Inventory.DriverNameIn = InsertGateIn.pDriverNameIn == "" ? "" : InsertGateIn.pDriverNameIn.Trim().ToString();
                    objCVarWH_Inventory.TruckNoIn = InsertGateIn.pTruckNoIn == "" ? "" : InsertGateIn.pTruckNoIn.Trim().ToString();

                    objCVarWH_Inventory.AddedBy = InsertGateIn.pAddedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
                    objCVarWH_Inventory.AddedAt = DateTime.Now;
                    objCVarWH_Inventory.UpdatedBy = InsertGateIn.pUpdatedBy == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
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

                ////////////////////////////end add inventory ////////////////////
                if (checkException == null)
                {
                    _result = true;
                    objCvwWH_MTY_GateIn.GetListPaging(InsertGateIn.pPageSize, InsertGateIn.pPageNumber, InsertGateIn.pWhereClauseWH_MTY_GateIn, InsertGateIn.pOrderBy, out _RowCount);

                }
                else
                {
                    ValidateMsg = "Successful save and record entry date and warehouse to add the container to inventory";
                }


                }
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_Inventory.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_MTY_GateIn.lstCVarvwWH_MTY_GateIn) : null //pData[2]
                , _RowCount //pData[3]
                ,ValidateMsg// pData[4]
            };
            }




            // [Route("/api/ContainerTypes/Delete/{pContainerTypesIDs}")]
            [HttpGet, HttpPost]
            public object[] WH_MTY_GateIn_DeleteList(String pWH_MTY_GateInIDs, string pWhereClauseWH_MTY_GateIn,
                Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
            {
                bool _result = false;
                Int32 _RowCount = 0;
                CWH_Inventory objCWH_Inventory = new CWH_Inventory();
                foreach (var pWH_MTY_GateInID in pWH_MTY_GateInIDs.Split(','))
                {
                    objCWH_Inventory.lstDeletedCPKWH_Inventory.Add(new CPKWH_Inventory() { ID = Int32.Parse(pWH_MTY_GateInID.Trim()) });
                }
                Exception checkException = objCWH_Inventory.DeleteItem(objCWH_Inventory.lstDeletedCPKWH_Inventory);
                CvwWH_MTY_GateIn objCvwWH_MTY_GateIn = new CvwWH_MTY_GateIn();
                if (checkException == null)
                    _result = true;
                objCvwWH_MTY_GateIn.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_MTY_GateIn, pOrderBy, out _RowCount);
                return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwWH_MTY_GateIn.lstCVarvwWH_MTY_GateIn) //pData[1]
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
        public Object[] GetCntrInfo(string pContainerNumber, string PInvId)
        {
            bool _result = false;
            Exception checkException = null;
            Exception checkException2 = null;
            int _RowCount = 0;
            int _RowCount2 = 0;

            CVwGateInCntrInfo GateInCntrInfo = new CVwGateInCntrInfo();


            checkException = GateInCntrInfo.GetList(string.Format(" where ContainerNumber='{0}'", pContainerNumber));

            _RowCount = GateInCntrInfo.lstCVarVwGateInCntrInfo.Count;
            CWH_Inventory objCWH_Inventory = new CWH_Inventory();
            checkException2 = objCWH_Inventory.GetList(string.Format(" where 1=1 and ID !={0} and  (ContainerID ={1} or EmptyContainerID ={2}) and StorageEndDate is null ", (PInvId==null? 0: Int32.Parse(PInvId)), (_RowCount == 0 ? 0 : GateInCntrInfo.lstCVarVwGateInCntrInfo.Last().WH_CntrStockID), (_RowCount == 0 ? 0 : GateInCntrInfo.lstCVarVwGateInCntrInfo.Last().WH_CntrStockID)));
            if (checkException == null && _RowCount != 0)
            {
                _result = true;

            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize((_RowCount==0?null:GateInCntrInfo.lstCVarVwGateInCntrInfo.Last())) //0
                , _RowCount//1
                ,_result//2
                ,objCWH_Inventory.lstCVarWH_Inventory.Count //3
            };
        }


            #endregion
        }
    }


    public class InsertMTYGateIn
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
        public String pCustomerID { get; set; }
        public String pAmountWithoutVAT { get; set; }
        public String pDriverNameIn { get; set; }
        public String pTruckNoIn { get; set; }
        public String pAddedBy { get; set; }

        public DateTime pAddedAt { get; set; }

        public String pUpdatedBy { get; set; }

        public DateTime pUpdatedAt { get; set; }


        /*****************************/
        public string pWhereClauseWH_MTY_GateIn { get; set; }
        public Int32 pPageSize { get; set; }
        public Int32 pPageNumber { get; set; }
        public string pOrderBy { get; set; }
    }
