using ExcelDataReader;
using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Windows.Media.Animation;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
    public class ReserveController : ApiController
    {
        #region Reserve
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_Reserve objCvwWH_Reserve = new CvwWH_Reserve();
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCWH_Warehouse.GetList("ORDER BY Name");
                checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE Quantity>PickedQuantity AND IsFinalized=1 AND (AllProductsReserved = 0 OR AllProductsReserved IS NULL)", "ID", out _RowCount);
            }
            var pCustomerList = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
                .Select(s => new
                {
                    ID = s.CustomerID
                    ,
                    Name = s.CustomerName
                })
                .Distinct().OrderBy(o => o.Name).ToList();
            checkException = objCvwWH_Reserve.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var pAllCustomersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Customers", typeof(CVarCustomers)).Cast<CVarCustomers>().ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Reserve.lstCVarvwWH_Reserve)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[2]
                , serializer.Serialize(pCustomerList) //pCustomer=pData[3]
                , serializer.Serialize(pAllCustomersList) //pAllCustomers = pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int64 pHeaderID)
        {
            CvwWH_Reserve objCvwWH_Reserve = new CvwWH_Reserve();
            CContacts objCContacts = new CContacts();
            CvwWH_ReserveDetails objCvwWH_ReserveDetails = new CvwWH_ReserveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CDefaults objCDefaults = new CDefaults();
            Exception checkException = null;
            int _RowCount = 0;
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            checkException = objCvwWH_Reserve.GetListPaging(999999, 1, "WHERE ReserveID=" + pHeaderID.ToString(), "ReserveID", out _RowCount);
            checkException = objCvwWH_ReserveDetails.GetListPaging(999999, 1, "WHERE ReserveID=" + pHeaderID.ToString(), "ID", out _RowCount);
            #region Get Customers with available storage or the customer in the Reserve
            checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE CustomerID=" + objCvwWH_Reserve.lstCVarvwWH_Reserve[0].CustomerID + " OR (Quantity>PickedQuantity AND IsFinalized=1)", "ID", out _RowCount);
            var pCustomerList = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
                .Select(s => new
                {
                    ID = s.CustomerID
                    ,
                    Name = s.CustomerName
                })
                .Distinct().OrderBy(o => o.Name).ToList();
            #endregion Get Customers with available storage or the customer in the Reserve
            #region Get Products with available storage or products in the Reserve
            checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE PurchaseItemID IN (SELECT PurchaseItemID FROM vwWH_ReserveDetailsLocation WHERE ReserveID=" + pHeaderID + ") OR (CustomerID=" + objCvwWH_Reserve.lstCVarvwWH_Reserve[0].CustomerID + " AND Quantity>PickedQuantity AND IsFinalized=1)", "ID", out _RowCount);
            var pPurchaseItemList = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
                .Select(s => new
                {
                    ID = s.PurchaseItemID
                    ,
                    Code = s.PurchaseItemCode
                    ,
                    Name = s.PurchaseItemName
                })
                .Distinct().OrderBy(o => o.Code).ToList();
            #endregion Get Products with available storage or products in the Reserve
            #region Get PersonInCharge
            checkException = objCContacts.GetListPaging(999999, 1, "WHERE PartnerTypeID=1 AND PartnerID=" + objCvwWH_Reserve.lstCVarvwWH_Reserve[0].CustomerID, "Name", out _RowCount);
            #endregion Get PersonInCharge
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Reserve.lstCVarvwWH_Reserve[0]) //pData[0]
                , new JavaScriptSerializer().Serialize(objCvwWH_ReserveDetails.lstCVarvwWH_ReserveDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(pCustomerList) //pCustomerList = pData[2]
                , new JavaScriptSerializer().Serialize(pPurchaseItemList) //pPurchaseItemList = pData[3]
                , new JavaScriptSerializer().Serialize(objCContacts.lstCVarContacts) //pPersonInChargeList = pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save(Int64 pID, Int32 pWarehouseID, Int32 pCustomerID, Int32 pEndUserID
            , string pReservationDate, string pNotes)
        {
            string strMessage = "";
            Exception checkException = null;
            CWH_Reserve objCWH_Reserve = new CWH_Reserve();
            CvwWH_Reserve objCvwWH_Reserve = new CvwWH_Reserve();
            CWH_ReserveDetails objCWH_ReserveDetails = new CWH_ReserveDetails();
            CvwWH_ReserveDetails objCvwWH_ReserveDetails = new CvwWH_ReserveDetails();
            CVarWH_Reserve objCVarWH_Reserve = new CVarWH_Reserve();
            int _RowCount = 0;
            string _UpdateClause = "";
            #region Insert
            if (pID == 0) //Insert
            {
                objCVarWH_Reserve.Code = "0";
                objCVarWH_Reserve.WarehouseID = pWarehouseID;
                objCVarWH_Reserve.CustomerID = pCustomerID;
                objCVarWH_Reserve.EndUserID = pEndUserID;
                objCVarWH_Reserve.ReservationDate = DateTime.ParseExact(pReservationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Reserve.Notes = pNotes;
                objCVarWH_Reserve.CreatorUser = WebSecurity.CurrentUserId;
                objCVarWH_Reserve.CreationDate = DateTime.Now;
                objCWH_Reserve.lstCVarWH_Reserve.Add(objCVarWH_Reserve);
                checkException = objCWH_Reserve.SaveMethod(objCWH_Reserve.lstCVarWH_Reserve);
                if (checkException == null)
                    pID = objCVarWH_Reserve.ID;
                else
                    strMessage = checkException.Message;
            }
            #endregion Insert
            #region Update
            else //update
            {
                _UpdateClause = pWarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pWarehouseID) + " \n";
                _UpdateClause += pCustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pCustomerID) + " \n";
                _UpdateClause += pEndUserID == 0 ? ",EndUserID=null" : (",EndUserID=" + pEndUserID) + " \n";
                _UpdateClause += pReservationDate == "01/01/1900" ? " ,ReservationDate = NULL " : (" ,ReservationDate = '" + (DateTime.ParseExact(pReservationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                _UpdateClause += pNotes == "0" ? ",Notes=null" : (",Notes=N'" + pNotes + "'") + " \n";
                _UpdateClause += " WHERE ID = " + pID.ToString();

                checkException = objCWH_Reserve.UpdateList(_UpdateClause);
                if (checkException == null)
                {
                    //i think done in details and not header
                    //TODO Update location if used or not used
                    //checkException = objCvwWH_ReserveDetails.GetListPaging(99999, 1, "WHERE ReserveID=" + objCVarWH_Reserve.ID, "Code", out _RowCount);
                }
                else
                    strMessage = checkException.Message;
            }
            #endregion Update
            if (strMessage == "")
                checkException = objCvwWH_Reserve.GetListPaging(1, 1, "WHERE ReserveID=" + pID.ToString(), "ReserveID", out _RowCount);
            return new object[] {
                strMessage
                , pID //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Reserve.lstCVarvwWH_Reserve[0]) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pReserveIDs)
        {
            Exception checkException = new Exception();
            bool _result = false;
            CWH_Reserve objCWH_Reserve = new CWH_Reserve();
            CWH_ReserveDetails objCWH_ReserveDetails = new CWH_ReserveDetails();
            CWH_ReserveDetailsLocation objCWH_ReserveDetailsLocation = new CWH_ReserveDetailsLocation();
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            //Delete from WH_Reserve
            foreach (var currentID in pReserveIDs.Split(','))
            {
                //Delete from WH_ReserveDetails
                objCWH_ReserveDetails.GetList("WHERE ReserveID = " + currentID);
                var ReserveDetailsIDs = objCWH_ReserveDetails.lstCVarWH_ReserveDetails.Select(x => x.ID).ToList();
                foreach (var currentReserveDetailID in ReserveDetailsIDs)
                {
                    //Update WH_ReceiveDetailsSerial
                    objCWH_ReceiveDetailsSerial.UpdateList("ReserveDetailsLocationID = null WHERE ReserveDetailsLocationID = " + currentReserveDetailID);

                    //Delete from WH_ReserveDetailsLocation
                    objCWH_ReserveDetailsLocation.GetList("WHERE ReserveDetailID = " + currentReserveDetailID);
                    var ReserveDetailsLocationIDs = objCWH_ReserveDetailsLocation.lstCVarWH_ReserveDetailsLocation.Select(x => x.ID).ToList();
                    foreach (var currentReserveDetailsLocationID in ReserveDetailsLocationIDs)
                    {
                        objCWH_ReserveDetailsLocation.lstDeletedCPKWH_ReserveDetailsLocation.Add(new CPKWH_ReserveDetailsLocation() { ID = currentReserveDetailsLocationID });
                    }
                    checkException = objCWH_ReserveDetailsLocation.DeleteItem(objCWH_ReserveDetailsLocation.lstDeletedCPKWH_ReserveDetailsLocation);

                    objCWH_ReserveDetails.lstDeletedCPKWH_ReserveDetails.Add(new CPKWH_ReserveDetails() { ID = currentReserveDetailID });
                }
                objCWH_Reserve.lstDeletedCPKWH_Reserve.Add(new CPKWH_Reserve() { ID = int.Parse(currentID.Trim()) });
                checkException = objCWH_ReserveDetails.DeleteItem(objCWH_ReserveDetails.lstDeletedCPKWH_ReserveDetails);
            }
            checkException = objCWH_Reserve.DeleteItem(objCWH_Reserve.lstDeletedCPKWH_Reserve);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the Receives were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }


        [HttpGet, HttpPost]
        public object[] Print(Int64 pPrintedReserveID)
        {
            //string _ReturnedMessage = "";
            //Exception checkException = null;
            //int _RowCount = 0;
            //CvwWH_Reserve objCvwWH_Reserve = new CvwWH_Reserve();
            //CvwWH_ReserveDetailsLocation objCvwWH_ReserveDetailsLocation = new CvwWH_ReserveDetailsLocation();
            //CvwWH_ReserveDetailsLocationSerial objCvwWH_ReserveDetailsLocationSerial = new CvwWH_ReserveDetailsLocationSerial();
            //checkException = objCvwWH_Reserve.GetList("WHERE ID=" + pPrintedReserveID);
            //checkException = objCvwWH_ReserveDetailsLocation.GetListPaging(999999, 1, "WHERE ReserveID=" + pPrintedReserveID, "ID", out _RowCount);
            //checkException = objCvwWH_ReserveDetailsLocationSerial.GetListPaging(999999, 1, "WHERE ReserveID=" + pPrintedReserveID, "ID", out _RowCount);
            //var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                //_ReturnedMessage //pData[0]
                //, new JavaScriptSerializer().Serialize(objCvwWH_Reserve.lstCVarvwWH_Reserve[0]) //pData[1]
                //, serializer.Serialize(objCvwWH_ReserveDetailsLocationSerial.lstCVarvwWH_ReserveDetailsLocationSerial) //pData[2]
            };
        }
        //not used till now
        [HttpGet, HttpPost]
        public string ValidateReserve(Int64 pReserveIDToValidate)
        {
            string _MessageReturned = "";
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_ReserveDetails objCvwWH_ReserveDetails = new CvwWH_ReserveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            checkException = objCvwWH_ReserveDetails.GetListPaging(999999, 1, "WHERE ReserveID=" + pReserveIDToValidate, "ID", out _RowCount);
            for (int i = 0; i < objCvwWH_ReserveDetails.lstCVarvwWH_ReserveDetails.Count; i++)
            {
            }
            return _MessageReturned;
        }
#endregion Reserve

        #region ReserveDetails
        [HttpGet, HttpPost]
        public object[] ReserveDetails_Save([FromBody] ReserveDetails_SaveParamters ReserveDetails_SaveParamters)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            CVarWH_ReserveDetails objCVarWH_ReserveDetails = new CVarWH_ReserveDetails();
            CWH_ReserveDetails objCWH_ReserveDetails = new CWH_ReserveDetails();
            CvwWH_ReserveDetails objCvwWH_ReserveDetails = new CvwWH_ReserveDetails();
            CWH_Reserve objCWH_Reserve = new CWH_Reserve();
            CvwWH_Reserve objCvwWH_Reserve = new CvwWH_Reserve();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            Int64 pReserveDetailsID = 0;
            string _UpdateClause = "";
            #region Save ReserveHeader
            _UpdateClause = ReserveDetails_SaveParamters.pWarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + ReserveDetails_SaveParamters.pWarehouseID) + " \n";
            _UpdateClause += ReserveDetails_SaveParamters.pCustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + ReserveDetails_SaveParamters.pCustomerID) + " \n";
            _UpdateClause += ReserveDetails_SaveParamters.pReservationDate == "01/01/1900" ? " ,ReservationDate = NULL " : (" ,ReservationDate = '" + (DateTime.ParseExact(ReserveDetails_SaveParamters.pReservationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");       
            _UpdateClause += " WHERE ID = " + ReserveDetails_SaveParamters.pReserveID;
            checkException = objCWH_Reserve.UpdateList(_UpdateClause);
            #endregion Save ReserveHeader
            #region Save Details
            if (checkException == null)
            {
                objCVarWH_ReserveDetails.ID = (int)ReserveDetails_SaveParamters.pReserveDetailsID;
                objCVarWH_ReserveDetails.ReserveID = (int)ReserveDetails_SaveParamters.pReserveID;
                objCVarWH_ReserveDetails.PurchaseItemID = ReserveDetails_SaveParamters.pPurchaseItemID;
                if (ReserveDetails_SaveParamters.pReserveDetailsID != 0) //update so save original creator & creation date
                {
                    CWH_ReserveDetails objCGetCreationInformation = new CWH_ReserveDetails();
                    objCGetCreationInformation.GetItem((int)ReserveDetails_SaveParamters.pReserveDetailsID);
                    objCVarWH_ReserveDetails.CreatorUser = objCGetCreationInformation.lstCVarWH_ReserveDetails[0].CreatorUser;
                    objCVarWH_ReserveDetails.CreationDate = objCGetCreationInformation.lstCVarWH_ReserveDetails[0].CreationDate;
                }
                else
                {
                    objCVarWH_ReserveDetails.CreatorUser = WebSecurity.CurrentUserId;
                    objCVarWH_ReserveDetails.CreationDate = DateTime.Now;
                }


                objCWH_ReserveDetails.lstCVarWH_ReserveDetails.Add(objCVarWH_ReserveDetails);
                checkException = objCWH_ReserveDetails.SaveMethod(objCWH_ReserveDetails.lstCVarWH_ReserveDetails);
                if (checkException == null)
                {
                    pReserveDetailsID = objCVarWH_ReserveDetails.ID;
                    #region Save ReserveDetailsLocations
                    var _ArrReceiveDetailsID = ReserveDetails_SaveParamters.pReceiveDetailsIDList.Split(',');
                    int _ReceiveDetailsIDLength = _ArrReceiveDetailsID.Length;
                    var _ArrReservedQuantity = ReserveDetails_SaveParamters.pReceiveDetailsReservedQuantityList.Split(',');
                    CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
                    CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
                    CvwWH_ReserveDetailsLocation objCvwWH_ReserveDetailsLocation = new CvwWH_ReserveDetailsLocation();
                    for (int i = 0; i < _ReceiveDetailsIDLength; i++)
                    {
                        CWH_ReserveDetailsLocation objCWH_ReserveDetailsLocation = new CWH_ReserveDetailsLocation();
                        CVarWH_ReserveDetailsLocation objCVarWH_ReserveDetailsLocation = new CVarWH_ReserveDetailsLocation();
                        checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ID=" + _ArrReceiveDetailsID[i], "ID", out _RowCount);
                        checkException = objCWH_ReserveDetailsLocation.GetListPaging(999999, 1, "WHERE ReserveDetailID=" + ReserveDetails_SaveParamters.pReserveDetailsID + " AND ReceiveDetailID=" + _ArrReceiveDetailsID[i], "ID", out _RowCount);
                        checkException = objCvwWH_ReserveDetailsLocation.GetListPaging(999999, 1, "WHERE ReserveDetailID=" + ReserveDetails_SaveParamters.pReserveDetailsID + " AND ReceiveDetailID=" + _ArrReceiveDetailsID[i], "ID", out _RowCount);
                        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
                        if (_RowCount > 0)
                        { //if number of checked serials is not equal to picked quantity or no serials then abort
                            int _TempRowCount = 0;
                            checkException = objCWH_ReceiveDetailsSerial.GetListPaging(999999, 1, "WHERE ReserveDetailsLocationID=" + objCvwWH_ReserveDetailsLocation.lstCVarvwWH_ReserveDetailsLocation[0].ID, "ID", out _TempRowCount);
                            if (objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count > 0
                                && decimal.Parse(_ArrReservedQuantity[i]) < objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count)
                                _MessageReturned = "Please, checked number of selected serials for location " + objCvwWH_ReserveDetailsLocation.lstCVarvwWH_ReserveDetailsLocation[0].LocationCode + ".";
                        }

                        if (decimal.Parse(_ArrReservedQuantity[i]) == 0 && _RowCount > 0 && _MessageReturned == "") //i have a picked item from location turned to 0 so delete
                        {
                            checkException = objCWH_ReserveDetailsLocation.DeleteList("WHERE ID=" + objCvwWH_ReserveDetailsLocation.lstCVarvwWH_ReserveDetailsLocation[0].ID);
                        }
                        else if (decimal.Parse(_ArrReservedQuantity[i]) > 0 && _MessageReturned == "") //i have quantity so either insert or update ReserveLocation
                        {
                            if (objCvwWH_ReserveDetailsLocation.lstCVarvwWH_ReserveDetailsLocation.Count == 0)
                            {
                                objCVarWH_ReserveDetailsLocation.ID = 0;
                                objCVarWH_ReserveDetailsLocation.CreatorUser = WebSecurity.CurrentUserId;
                                objCVarWH_ReserveDetailsLocation.CreationDate = DateTime.Now;
                            }
                            else //Update
                            {
                                objCVarWH_ReserveDetailsLocation.ID = objCvwWH_ReserveDetailsLocation.lstCVarvwWH_ReserveDetailsLocation[0].ID;
                                objCVarWH_ReserveDetailsLocation.ReservedQty = objCvwWH_ReserveDetailsLocation.lstCVarvwWH_ReserveDetailsLocation[0].ReservedQty + decimal.Parse(_ArrReservedQuantity[i]);
                            }
                            objCVarWH_ReserveDetailsLocation.ReservedQty = decimal.Parse(_ArrReservedQuantity[i]);
                            objCVarWH_ReserveDetailsLocation.ReserveDetailID = (int)pReserveDetailsID;
                            objCVarWH_ReserveDetailsLocation.ReceiveDetailID = long.Parse(_ArrReceiveDetailsID[i]);
                            objCVarWH_ReserveDetailsLocation.CreationDate = DateTime.Now;
                            objCWH_ReserveDetailsLocation.lstCVarWH_ReserveDetailsLocation.Add(objCVarWH_ReserveDetailsLocation);
                            checkException = objCWH_ReserveDetailsLocation.SaveMethod(objCWH_ReserveDetailsLocation.lstCVarWH_ReserveDetailsLocation);
                        } //else if (decimal.Parse(_ArrPickedQuantity[i]) > 0)
                        if (checkException != null)
                            _MessageReturned = checkException.Message;
                    }

                    #endregion Save ReserveDetailsLocations
                }
                checkException = objCvwWH_Reserve.GetList("WHERE ReserveID=" + ReserveDetails_SaveParamters.pReserveID.ToString());
                checkException = objCvwWH_ReserveDetails.GetList("WHERE ReserveID=" + ReserveDetails_SaveParamters.pReserveID.ToString() + " ORDER BY ID");
            }
            #endregion Save Details

            return new object[] {
                checkException == null ? true : false
                , new JavaScriptSerializer().Serialize(objCvwWH_ReserveDetails.lstCVarvwWH_ReserveDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Reserve.lstCVarvwWH_Reserve[0]) //pData[2]
                , pReserveDetailsID //pData[3]
                , _MessageReturned //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] ReserveDetails_FillModalTables(Int64 pReserveID, Int64 pPurchaseItemID, int pCustomerID, int pWarehouseID)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_ReserveDetailsLocation objCvwWH_ReserveDetailsLocation = new CvwWH_ReserveDetailsLocation();
            CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            CvwWH_ReserveDetails objCvwWH_ReserveDetails = new CvwWH_ReserveDetails();

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            checkException = objCvwWH_ReserveDetailsLocation.GetListPaging(99999, 1, "WHERE ReserveID=" + pReserveID + " AND PurchaseItemID=" + pPurchaseItemID, "LocationCode", out _RowCount);
            var PurchaseItemAvailableQty = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"EXEC WH_PurchaseItemAvailableQty {pPurchaseItemID},{pCustomerID},{pWarehouseID}",typeof(PurchaseItemAvailableQty)).Cast<PurchaseItemAvailableQty>().ToList();
            objCvwWH_ReserveDetails.GetList("WHERE ReserveID = " + pReserveID + " AND PurchaseItemID = " + pPurchaseItemID);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                serializer.Serialize(PurchaseItemAvailableQty) //pData[0]
                , serializer.Serialize(objCvwWH_ReserveDetailsLocation.lstCVarvwWH_ReserveDetailsLocation) //pData[1]
                , serializer.Serialize(objCvwWH_ReserveDetails.lstCVarvwWH_ReserveDetails) //pData[2]
            };
        }
        
        [HttpGet, HttpPost]
        public object[] ReserveDetails_GetAvailablePurchaseItemsForCustomer(Int32 pCustomerID, bool pIsExcludeVehicle)
        {
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE CustomerID=" + pCustomerID + " AND Quantity>PickedQuantity AND IsFinalized=1 " + (pIsExcludeVehicle ? " AND OperationVehicleID IS NULL " : ""), "ID", out _RowCount);
            var pPurchaseItemList = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
                .Select(s => new
                {
                    ID = s.PurchaseItemID
                    ,
                    Code = s.PurchaseItemCode
                    ,
                    Name = s.PurchaseItemName
                })
                .Distinct().OrderBy(o => o.Code).ToList();
            return new object[] {
                new JavaScriptSerializer().Serialize(pPurchaseItemList) //pPurchaseItemList = pData[0]
            };
        }

        [HttpGet, HttpPost]
        public object[] ReserveDetails_Delete(string pReserveDetailsIDsToDelete, Int64 pReserveID)
        {
            Exception checkException = null;
            bool _Result = true;
            CWH_ReserveDetails objCWH_ReserveDetails = new CWH_ReserveDetails();
            CvwWH_ReserveDetails objCvwWH_ReserveDetails = new CvwWH_ReserveDetails();
            CvwWH_Reserve objCvwWH_Reserve = new CvwWH_Reserve();
            int _NumberOfRecords = pReserveDetailsIDsToDelete.Split(',').Length;
            for (int i = 0; i < _NumberOfRecords; i++)
            {
                Int64 _ReserveDetailsID = Int64.Parse(pReserveDetailsIDsToDelete.Split(',')[i]);
                checkException = objCWH_ReserveDetails.DeleteList("WHERE ID=" + _ReserveDetailsID.ToString());
                if (checkException != null)
                    _Result = false;
            }
            objCvwWH_ReserveDetails.GetList("WHERE ReserveID=" + pReserveID.ToString());
            objCvwWH_Reserve.GetList("WHERE ID=" + pReserveID.ToString());
            return new object[] {
                _Result
                , new JavaScriptSerializer().Serialize(objCvwWH_ReserveDetails.lstCVarvwWH_ReserveDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Reserve.lstCVarvwWH_Reserve[0]) //pData[2]
            };
        }
        #endregion ReserveDetails

        #region ReserveDetailsSerial
        [HttpGet, HttpPost]
        public object[] ReserveDetailsSerial_FillModal(Int64 pReserveDetailsLocationID, Int64 pReceiveDetailsID)
        {
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID=" + pReceiveDetailsID
                + " AND (ReserveDetailsLocationID IS NULL OR ReserveDetailsLocationID= " + pReserveDetailsLocationID + ")"
                + " ORDER BY Serial");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
            };
        }
        [HttpGet, HttpPost]
        public object[] ReserveDetailsSerial_Save([FromBody] ReserveDetailsSerial_SaveParameters ReserveDetailsSerial_SaveParameters)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            Int64 _ReserveDetailsLocationID = ReserveDetailsSerial_SaveParameters.pReserveDetailsLocationID;
            checkException = objCWH_ReceiveDetailsSerial.UpdateList("ReserveDetailsLocationID=NULL WHERE ReserveDetailsLocationID=" + ReserveDetailsSerial_SaveParameters.pReserveDetailsLocationID);
            if (checkException == null)
                checkException = objCWH_ReceiveDetailsSerial.UpdateList("ReserveDetailsLocationID=" + _ReserveDetailsLocationID + " WHERE ID IN (" + ReserveDetailsSerial_SaveParameters.pReceiveDetailsSerialIDList + ")");
            else
                _MessageReturned = checkException.Message;
            return new object[] {
                _MessageReturned
            };
        }
        #endregion ReserveDetailsSerial

        #region UploadExcel
        [HttpGet, HttpPost]
        public object UploadExcel()
        {
            int ResultCode = 1;
            int pID = 0;
            int.TryParse(HttpContext.Current.Request.Form[0], out pID);
            bool AllExcelRowsAreValid = true;
            List<string> MissingFields = new List<string>();
            string InvalidQuantityMessage = "";
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
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        CPurchaseItem objCPurchaseItem = new CPurchaseItem();
                        objCPurchaseItem.GetList(" WHERE 1=1");
                        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
                        objCWH_ReceiveDetailsSerial.GetList(" WHERE 1=1");
                        CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
                        objCWH_Warehouse.GetList(" WHERE 1=1");
                        CWH_Reserve objCWH_Reserve = new CWH_Reserve();
                        objCWH_Reserve.GetItem(pID);
                        var ReserveHeader = objCWH_Reserve.lstCVarWH_Reserve[0];
                        CWH_ReserveDetails objCWH_ReserveDetails = new CWH_ReserveDetails();
                        CWH_ReserveDetailsLocation objCWH_ReserveDetailsLocation = new CWH_ReserveDetailsLocation();

                        List<ReserveProductExcelRow> ExcelRowsToBeInserted = new List<ReserveProductExcelRow>();
                        int count = 1;
                        foreach (DataRow row in result.Tables[0].Rows)
                        {
                            ReserveProductExcelRow ReserveProducExcelRow = new ReserveProductExcelRow
                            {
                                pIndex = count,
                                pPurchaseItemID = 0,
                                pReceiveDetailID = 0,
                                pCustomerID = ReserveHeader.CustomerID,
                                pWarehouseID = ReserveHeader.WarehouseID,
                                pPartNumber = row["Part Number"] == DBNull.Value ? "" : Convert.ToString(row["Part Number"]),
                                pQuantity = row["Qty"] == DBNull.Value ? 0 : int.Parse(row["Qty"].ToString()),
                                pSerialNumber = row["Serial Number"] == DBNull.Value ? "" : Convert.ToString(row["Serial Number"])
                            };
                            count++;

                            var ValidationCheck = CheckExcelRowValidation(ReserveProducExcelRow, objCWH_ReceiveDetailsSerial, objCPurchaseItem) as ReturnedObjectAfterValidation;
                            ExcelRowsToBeInserted.Add(ReserveProducExcelRow);
                            ReserveProducExcelRow.pPurchaseItemID = ValidationCheck.PurchaseItemID;
                            ReserveProducExcelRow.pReceiveDetailID = ValidationCheck.ReceiveDetailIDForSerial;
                            MissingFields.Add(ValidationCheck.MissingFields);
                            InvalidQuantityMessage = ValidationCheck.InvalidQuantityMessage;
                            if (!ValidationCheck.IsValid)
                            {
                                AllExcelRowsAreValid = false;
                                break;
                            }
                        }
                        if (AllExcelRowsAreValid)
                        {
                            foreach (ReserveProductExcelRow row in ExcelRowsToBeInserted)
                            {
                                decimal pickedQty = 0m;
                                int index = 0;
                                decimal remainingDemand = 0m;
                                //Available quantity based on first in first out
                                List<PurchaseItemAvailableQty> PurchaseItemAvailableQty = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($" EXEC WH_PurchaseItemAvailableQty {row.pPurchaseItemID},{row.pCustomerID}, {row.pWarehouseID}", typeof(PurchaseItemAvailableQty)).Cast<PurchaseItemAvailableQty>().ToList();                              
                                objCWH_ReserveDetails.GetList($" WHERE ReserveID = {pID} AND PurchaseItemID = {row.pPurchaseItemID}");
                                var ExistedDetail = objCWH_ReserveDetails.lstCVarWH_ReserveDetails;
                                objCWH_ReserveDetails.SaveMethod(new List<CVarWH_ReserveDetails>
                                {
                                    new CVarWH_ReserveDetails
                                    {
                                        ID = ExistedDetail.Count > 0 ? ExistedDetail[0].ID : 0,
                                        ReserveID = pID,
                                        PurchaseItemID = row.pPurchaseItemID,
                                        CreatorUser = WebSecurity.CurrentUserId,
                                        CreationDate = DateTime.Now
                                    }
                                });

                                while (pickedQty < row.pQuantity)
                                {
                                    remainingDemand = row.pQuantity - pickedQty;
                                    if (row.pReceiveDetailID == 0)
                                        pickedQty += PurchaseItemAvailableQty[index].AvailableQuantity >= remainingDemand ? remainingDemand : PurchaseItemAvailableQty[index].AvailableQuantity;
                                    else
                                        pickedQty += 1;
                                    objCWH_ReserveDetailsLocation.GetList($" WHERE ReserveDetailID = {(ExistedDetail.Count > 0 ? ExistedDetail[0].ID : 0)} AND ReceiveDetailID = {(row.pReceiveDetailID == 0 ? PurchaseItemAvailableQty[index].ID : row.pReceiveDetailID)}");
                                    var ExistedReserveDetailLocation = objCWH_ReserveDetailsLocation.lstCVarWH_ReserveDetailsLocation;
                                    objCWH_ReserveDetailsLocation.SaveMethod(new List<CVarWH_ReserveDetailsLocation>
                                {
                                    new CVarWH_ReserveDetailsLocation
                                    {
                                        ID = ExistedReserveDetailLocation.Count > 0 ? ExistedReserveDetailLocation[0].ID : 0,
                                        ReserveDetailID = int.Parse(objCCustomizedDBCall.CallStringFunction(" SELECT TOP(1)ID FROM WH_ReserveDetails ORDER BY ID DESC")),
                                        ReceiveDetailID = row.pReceiveDetailID == 0 ? PurchaseItemAvailableQty[index].ID : row.pReceiveDetailID,
                                        ReservedQty = row.pReceiveDetailID == 0 ? (PurchaseItemAvailableQty[index].AvailableQuantity >= remainingDemand ? remainingDemand + (ExistedReserveDetailLocation.Count > 0 ? ExistedReserveDetailLocation[0].ReservedQty : 0) : PurchaseItemAvailableQty[index].AvailableQuantity) : 1,
                                        CreatorUser = WebSecurity.CurrentUserId,
                                        CreationDate = DateTime.Now
                                    }
                                });

                                    objCCustomizedDBCall.CallStringFunction(" UPDATE WH_ReceiveDetailsSerial SET ReserveDetailsLocationID = (SELECT TOP(1)ID FROM WH_ReserveDetailsLocation ORDER BY ID DESC) WHERE Serial = '" + row.pSerialNumber + "'");

                                    index++;
                                }
                            }
                        }
                        else
                            ResultCode = 0;
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
                MissingFields = string.Join(",", MissingFields),
                InvalidQuantityMessage = string.Join(",", InvalidQuantityMessage),
                exception
            };
        }

        private object CheckExcelRowValidation(ReserveProductExcelRow row, CWH_ReceiveDetailsSerial ReceiveDetailsSerials, CPurchaseItem PurchaseItems)
        {
            CCustomizedDBCall objCustomizedDBCall = new CCustomizedDBCall();
            List<string> MissingFields = new List<string>();
            ReturnedObjectAfterValidation obj = new ReturnedObjectAfterValidation();

            //PartNumber
            if (row.pPartNumber == "" || PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.PartNumber == row.pPartNumber)?.ID == null)
            {
                MissingFields.Add("PartNumber");
                obj.IsValid = false;
            }
            else
                obj.PurchaseItemID = (int)PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.PartNumber == row.pPartNumber)?.ID;

            //SerialNumber
            if (row.pSerialNumber != "")
            {
                if (ReceiveDetailsSerials.lstCVarWH_ReceiveDetailsSerial.FirstOrDefault(x => x.Serial == row.pSerialNumber)?.ReceiveDetailsID == null)
                {
                    MissingFields.Add("SerialNumber");
                    obj.IsValid = false;
                }
                else
                {
                    obj.ReceiveDetailIDForSerial = (int)ReceiveDetailsSerials.lstCVarWH_ReceiveDetailsSerial.FirstOrDefault(x => x.Serial == row.pSerialNumber)?.ReceiveDetailsID;
                    CWH_Receive objCWH_Receive = new CWH_Receive();
                    objCWH_Receive.GetItem(long.Parse(objCustomizedDBCall.CallStringFunction("SELECT ReceiveID FROM WH_ReceiveDetails WHERE ID = " + obj.ReceiveDetailIDForSerial)));
                    if (!objCWH_Receive.lstCVarWH_Receive[0].IsFinalized)
                    {
                        MissingFields.Add("SerialNumber");
                        obj.IsValid = false;
                    }
                }
            }
            //Quantity
            if (!(row.pQuantity > 0))
            {
                obj.IsValid = false;
                MissingFields.Add("Quantity");
            }
            else if (obj.PurchaseItemID != 0)
            {
                //check if the demanded quantity <= available quantity
                List<PurchaseItemAvailableQty> PurchaseItemAvailableQty = objCustomizedDBCall.ExecuteQuery_ListOfObjects($" EXEC WH_PurchaseItemAvailableQty {obj.PurchaseItemID},{row.pCustomerID}, {row.pWarehouseID}", typeof(PurchaseItemAvailableQty)).Cast<PurchaseItemAvailableQty>().ToList();
                if (PurchaseItemAvailableQty.Select(x => x.AvailableQuantity).Sum() < row.pQuantity)
                {
                    obj.IsValid = false;
                    obj.InvalidQuantityMessage = $"There is no enough quantity for item in row {row.pIndex} ";
                }
            }

            obj.MissingFields = MissingFields.Count == 0 ? "" : $"Row {row.pIndex} has invalid {string.Join(",", MissingFields)}";

            return obj;
        }

        class ReturnedObjectAfterValidation
        {
            public bool IsValid { get; set; } = true;
            public string MissingFields { get; set; } = "";
            public string InvalidQuantityMessage { get; set; } = "";
            public int PurchaseItemID { get; set; } = 0;
            public int ReceiveDetailIDForSerial { get; set; } = 0;
        }
        class ReserveProductExcelRow
        {
            public int pIndex { get; set; }
            public int pPurchaseItemID { get; set; }
            public int pReceiveDetailID { get; set; }
            public int pCustomerID { get; set; }
            public int pWarehouseID { get; set; }
            public string pPartNumber { get; set; }
            public int pQuantity { get; set; }
            public string pSerialNumber { get; set; }
            public string pCustomer { get; set; }
            public string pWarehouse { get; set; }
            public string pNotes { get; set; }
        }
        class PurchaseItemAvailableQty
        {
            public long ID { get; set; }
            public string ReceiveCode { get; set; }
            public long PurchaseItemID { get; set; }
            public string PurchaseItemCode { get; set; }
            public decimal AvailableQuantity { get; set; }
            public decimal ReservedQuantity { get; set; }
            public decimal PickedQuantity { get; set; }
            public decimal AvailableQuantityBeforeReserve { get; set; }
            public decimal AvailableQuantityBeforePickup { get; set; }
            public long ReceiveID { get; set; }
            public long LocationID { get; set; }
            public string LocationCode { get; set; }
            public string BarCode { get; set; }
            public string PalletID { get; set; }
            public string PackageTypeName { get; set; }
        }
        #endregion

        #region Full Reservation
        //[HttpGet]
        //public object[] FullReservationInitialize()
        //{
        //    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
        //    var CustomerList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Customers", typeof(CVarCustomers)).Cast<CVarCustomers>().ToList();
        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
        //    return new object[]
        //    {
        //        serializer.Serialize(CustomerList)
        //    };
        //}
        [HttpGet]
        public object[] FullReservationSet(string pAction, int pCustomerID, string pReservationReason)
        {
            string UpdateClause = "";
            bool StatusCode = true;
            Exception Ex = new Exception();
            string ReturnedMessage = "";
            CCustomers objCCustomers = new CCustomers();

            Ex = objCCustomers.GetItem(pCustomerID);

            if (Ex == null) {
                if (pAction == "Reserve")
                {
                    ReturnedMessage += (objCCustomers.lstCVarCustomers[0].AllProductsReserved ? "Customer products are already reserved!" : "");
                    UpdateClause += "AllProductsReserved = 1, ReservationReason = N'" + pReservationReason + "' WHERE ID = " + pCustomerID;
                }
                else if (pAction == "Release")
                {
                    ReturnedMessage += (!objCCustomers.lstCVarCustomers[0].AllProductsReserved ? "Customer products are already Released!" : "");
                    UpdateClause += "AllProductsReserved = 0, ReservationReason = N'' WHERE ID = " + pCustomerID;
                }
                Ex = objCCustomers.UpdateList(UpdateClause);
            }
            else
                StatusCode = false;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                StatusCode, //pData[0]
                Ex, //pData[1]
                ReturnedMessage //pData[2]
            };
        }
        #endregion

        #region GeneratePickup
        [HttpGet]
        public object GeneratePickup(int pReserveID)
        {
            var Ex = new Exception();
            var StatusCode = 1;
            var ExceptionMessage = "";
            //Getting reserve order data
            CWH_Reserve objCWH_Reserve = new CWH_Reserve();
            Ex = objCWH_Reserve.GetItem(pReserveID);
            var Reserve = objCWH_Reserve.lstCVarWH_Reserve;
            CWH_ReserveDetails objCWH_ReserveDetails = new CWH_ReserveDetails();
            Ex = objCWH_ReserveDetails.GetList(" WHERE ReserveID = " + pReserveID);
            var ReserveDetails = objCWH_ReserveDetails.lstCVarWH_ReserveDetails;
            CWH_ReserveDetailsLocation objCWH_ReserveDetailsLocation = new CWH_ReserveDetailsLocation();
            Ex = objCWH_ReserveDetailsLocation.GetList(" WHERE ReserveDetailID IN (SELECT ID FROM WH_ReserveDetails WHERE ReserveID = " + pReserveID + ") ");

            //inserting into WH_Pickup
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            Ex = objCWH_Pickup.SaveMethod(new List<CVarWH_Pickup>
            {
                new CVarWH_Pickup
                {
                    Code = "0",
                    CustomerID = Reserve[0].CustomerID,
                    BillTo = Reserve[0].CustomerID,
                    OrderDate = DateTime.Now,
                    RequiredDate = DateTime.Now,
                    IsFinalized = false,
                    FinalizeDate = DateTime.ParseExact("01/01/1900" + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
                    WarehouseID = Reserve[0].WarehouseID,
                    Notes = Reserve[0].Notes,
                    CreatorUserID = WebSecurity.CurrentUserId,
                    CreationDate = DateTime.Now,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    ModificationDate = DateTime.Now,
                    InvoiceID = 0,
                    OperationID = 0,
                    EndUserID = Reserve[0].EndUserID,
                    RMANumber = "0",
                    PersonInChargeID = 0,
                    PDIReceiveDetailsID = 0,
                    EquipmentID = 0,
                    DriverName = "0",
                }
            });

            objCWH_Pickup.GetList("WHERE ID = (SELECT MAX(ID) FROM WH_Pickup)");
            var InsertedPickupID = objCWH_Pickup.lstCVarWH_Pickup[0].ID;
            var InsertedPickupCode = objCWH_Pickup.lstCVarWH_Pickup[0].Code;
            //inserting into WH_PickupDetails
            if (ReserveDetails.Count > 0 && Ex == null)
            {
                CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
                foreach (var ReserveDetail in ReserveDetails)
                {
                    Ex = objCWH_PickupDetails.SaveMethod(new List<CVarWH_PickupDetails>
                    {
                        new CVarWH_PickupDetails
                        {
                            PickupID = InsertedPickupID,
                            PurchaseItemID = ReserveDetail.PurchaseItemID,
                            DemandedQuantity = 0,
                            Notes = "0",
                            CreatorUserID = WebSecurity.CurrentUserId,
                            CreationDate = DateTime.Now,
                            ModificatorUserID = WebSecurity.CurrentUserId,
                            ModificationDate = DateTime.Now
                        }
                    });
                    objCWH_PickupDetails.GetList("WHERE ID = (SELECT MAX(ID) FROM WH_PickupDetails)");
                    var InsertedPickupDetailsID = objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID;
                    var ReserveDetailsLocations = objCWH_ReserveDetailsLocation.lstCVarWH_ReserveDetailsLocation.Where(x => x.ReserveDetailID == ReserveDetail.ID).ToList();
                    //inserting into WH_PickupDetailsLocations
                    if (ReserveDetailsLocations.Count > 0 && Ex == null) {
                        foreach (var ReserveDetailLocation in ReserveDetailsLocations)
                        {
                            CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                            Ex = objCWH_PickupDetailsLocation.SaveMethod(new List<CVarWH_PickupDetailsLocation>
                        {
                            new CVarWH_PickupDetailsLocation
                            {
                                PickupDetailsID = InsertedPickupDetailsID,
                                ReceiveDetailsID = ReserveDetailLocation.ReceiveDetailID,
                                PickedQuantity = ReserveDetailLocation.ReservedQty,
                                Notes = "0",
                                CreatorUserID = WebSecurity.CurrentUserId,
                                CreationDate = DateTime.Now,
                                ModificatorUserID = WebSecurity.CurrentUserId,
                                ModificationDate = DateTime.Now,
                                VehicleActionID = 0
                            }
                        });

                            objCWH_PickupDetailsLocation.GetList("WHERE ID = (SELECT MAX(ID) FROM WH_PickupDetailsLocation)");
                            var InsertedPickupDetailsLocationID = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ID;

                            //Setting ReceiveDetailsSerial
                            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
                            objCWH_ReceiveDetailsSerial.UpdateList(" PickupDetailsLocationID = " + InsertedPickupDetailsLocationID + " WHERE ReserveDetailsLocationID = " + ReserveDetailLocation.ID);
                        }
                    }
                }
            }

            if(Ex != null)
            {
                StatusCode = 0;
                ExceptionMessage = Ex.Message;
            }
            return new
            {
                StatusCode,
                ExceptionMessage,
                InsertedPickupCode
            };
        }
        #endregion
        #region Static Functions
        //[HttpGet, HttpPost]
        public static Int64 ReserveCheckEnoughQuantity(Int32 pCustomerID, Int32 pLocationID
            , Int64 pPurchaseItemID, int pQuantity)
        {
            //string pReturnedMessage = "";
            string pWhereClause = "";
            int _RowCount = 0;
            Int64 pReceiveDetailsID = 0;
            Exception checkException = null;
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            pWhereClause = "WHERE IsFinalized=1 AND OperationVehicleID IS NULL" + " \n";
            pWhereClause += "AND LocationID=" + pLocationID + " \n";
            pWhereClause += "AND PurchaseItemID=" + pPurchaseItemID + " \n";
            pWhereClause += "AND CustomerID=" + pCustomerID + " \n";
            //pWhereClause += "AND WarehouseID=" + ReserveExcelParam.pWarehouseID + " \n"; //already LocationID fulfills
            pWhereClause += "AND (Quantity - FinalizedPickedQuantity) > " + pQuantity + " \n";

            checkException = objCvwWH_ReceiveDetails.GetListPaging(1, 1, pWhereClause, "ID", out _RowCount);
            if (_RowCount > 0)
                pReceiveDetailsID = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ID;
            return pReceiveDetailsID;
        }
        #endregion Static Functions
    }
    #region POST Parameters
    public class ReserveDetails_SaveParamters
    {
        //HeaderParameters
        public Int64 pReserveID { get; set; }
        public Int32 pWarehouseID { get; set; }
        public Int32 pCustomerID { get; set; }
        public long pEndUserID { get; set; }
        public string pReservationDate { get; set; }
        public Int64 pReserveDetailsID { get; set; }
        public Int64 pPurchaseItemID { get; set; }
        public decimal pReservedQuantity { get; set; }
        public string pReceiveDetailsIDList { get; set; }
        public string pReceiveDetailsReservedQuantityList { get; set; }
    }
    public class ReserveDetailsSerial_SaveParameters
    {
        public Int64 pReserveDetailsLocationID { get; set; }
        public Int64 pReceiveDetailsID { get; set; }
        public string pReceiveDetailsSerialIDList { get; set; }
    }
    #endregion POST Parameters
}
