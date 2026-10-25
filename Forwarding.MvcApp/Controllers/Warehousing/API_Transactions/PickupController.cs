using ExcelDataReader;
using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Transactions
{
    public class PickupController : ApiController
    {
        #region Pickup
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CvwOperationsToRestoreInvoices objCOperations = new CvwOperationsToRestoreInvoices();
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCWH_Warehouse.GetList("ORDER BY Name");
                checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE Quantity>PickedQuantity AND IsFinalized=1 AND (AllProductsReserved = 0 OR AllProductsReserved IS NULL)", "ID", out _RowCount);
                checkException = objCOperations.GetList("WHERE BLType <> 2");
            }
            var pCustomerList = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
                .Select(s => new
                {
                    ID = s.CustomerID,
                    Name = s.CustomerName
                })
                .Distinct().OrderBy(o => o.Name).ToList();
            var pOperationsList = objCOperations.lstCVarvwOperationsToRestoreInvoices
                .Select(s => new
                {
                    ID = s.ID,
                    Code = s.EffectiveOperationCode
                }).ToList().OrderByDescending(o => o.ID);
            checkException = objCvwWH_Pickup.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var pEquipmentList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM TRCK_Equipments", typeof(CVarTRCK_Equipments)).Cast<CVarTRCK_Equipments>().ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[2]
                , serializer.Serialize(pCustomerList) //pCustomer=pData[3]
                , serializer.Serialize(pOperationsList) //pOperation=pData[4]
                , serializer.Serialize(pEquipmentList) //pEquipment=pData[5]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int64 pHeaderID)
        {
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            CContacts objCContacts = new CContacts();
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CDefaults objCDefaults = new CDefaults();
            Exception checkException = null;
            int _RowCount = 0;
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            checkException = objCvwWH_Pickup.GetListPaging(999999, 1, "WHERE ID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = objCvwWH_PickupDetails.GetListPaging(999999, 1, "WHERE PickupID=" + pHeaderID.ToString(), "ID", out _RowCount);
            #region Get Customers with available storage or the customer in the Pickup
            checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE CustomerID=" + objCvwWH_Pickup.lstCVarvwWH_Pickup[0].CustomerID + " OR (Quantity>PickedQuantity AND IsFinalized=1)", "ID", out _RowCount);
            var pCustomerList = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
                .Select(s => new
                {
                    ID = s.CustomerID
                    ,
                    Name = s.CustomerName
                })
                .Distinct().OrderBy(o => o.Name).ToList();
            #endregion Get Customers with available storage or the customer in the Pickup
            #region Get Products with available storage or products in the Pickup
            checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE PurchaseItemID IN (SELECT PurchaseItemID FROM vwWH_PickupDetailsLocation WHERE PickupID=" + pHeaderID + ") OR (CustomerID=" + objCvwWH_Pickup.lstCVarvwWH_Pickup[0].CustomerID + " AND Quantity>PickedQuantity AND IsFinalized=1)", "ID", out _RowCount);
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
            #endregion Get Products with available storage or products in the Pickup
            #region Get PersonInCharge
            checkException = objCContacts.GetListPaging(999999, 1, "WHERE PartnerTypeID=1 AND PartnerID=" + objCvwWH_Pickup.lstCVarvwWH_Pickup[0].CustomerID, "Name", out _RowCount);
            #endregion Get PersonInCharge
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[0]
                , new JavaScriptSerializer().Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(pCustomerList) //pCustomerList = pData[2]
                , new JavaScriptSerializer().Serialize(pPurchaseItemList) //pPurchaseItemList = pData[3]
                , new JavaScriptSerializer().Serialize(objCContacts.lstCVarContacts) //pPersonInChargeList = pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save([FromBody] WhPickup pWhPickup)
        {
            string strMessage = "";
            Exception checkException = null;
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
            CVarWH_Pickup objCVarWH_Pickup = new CVarWH_Pickup();
            int _RowCount = 0;
            string _UpdateClause = "";
            #region Insert
            if (pWhPickup.ID == 0) //Insert
            {
                objCVarWH_Pickup.Code = "0";
                objCVarWH_Pickup.WarehouseID = pWhPickup.WarehouseID;
                objCVarWH_Pickup.CustomerID = pWhPickup.CustomerID;
                objCVarWH_Pickup.BillTo = pWhPickup.BillTo;
                objCVarWH_Pickup.EndUserID = pWhPickup.EndUserID;
                objCVarWH_Pickup.OrderDate = DateTime.ParseExact(pWhPickup.OrderDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Pickup.RequiredDate = DateTime.ParseExact(pWhPickup.RequiredDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Pickup.IsFinalized = pWhPickup.IsFinalized;
                objCVarWH_Pickup.FinalizeUserID = pWhPickup.IsFinalized ?WebSecurity.CurrentUserId:0;
                objCVarWH_Pickup.FinalizeDate = DateTime.ParseExact(pWhPickup.FinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Pickup.Notes = pWhPickup.Notes;
                objCVarWH_Pickup.InvoiceID = 0;
                objCVarWH_Pickup.OperationID = pWhPickup.OperationID;
                objCVarWH_Pickup.RMANumber = pWhPickup.RMANumber;
                objCVarWH_Pickup.PersonInChargeID = pWhPickup.PersonInChargeID;
                objCVarWH_Pickup.PDIReceiveDetailsID = pWhPickup.PDIReceiveDetailsID;
                objCVarWH_Pickup.EquipmentID = pWhPickup.EquipmentID;
                objCVarWH_Pickup.DriverName = pWhPickup.DriverName;
				objCVarWH_Pickup.Location = pWhPickup.Location;
				objCVarWH_Pickup.Cards = pWhPickup.Cards;
				objCVarWH_Pickup.Rep = pWhPickup.Rep;
				objCVarWH_Pickup.CreatorUserID = objCVarWH_Pickup.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_Pickup.CreationDate = objCVarWH_Pickup.ModificationDate = DateTime.Now;
				objCVarWH_Pickup.CreationSource = CreationSource.web.ToString();
				Common.Common.ReplaceNull(objCVarWH_Pickup);
                objCWH_Pickup.lstCVarWH_Pickup.Add(objCVarWH_Pickup);
                checkException = objCWH_Pickup.SaveMethod(objCWH_Pickup.lstCVarWH_Pickup);
                if (checkException == null)
					pWhPickup.ID = objCVarWH_Pickup.ID;
                else
                    strMessage = checkException.Message;
            }
            #endregion Insert
            #region Update
            else //update
            {
                _UpdateClause = pWhPickup.WarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pWhPickup.WarehouseID) + " \n";
                _UpdateClause += pWhPickup.CustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pWhPickup.CustomerID) + " \n";
                _UpdateClause += pWhPickup.BillTo == 0 ? ",BillTo=null" : (",BillTo=" + pWhPickup.BillTo) + " \n";
                _UpdateClause += pWhPickup.EndUserID == 0 ? ",EndUserID=null" : (",EndUserID=" + pWhPickup.EndUserID) + " \n";
                _UpdateClause += pWhPickup.OrderDate == "01/01/1900" ? " ,OrderDate = NULL " : (" ,OrderDate = '" + (DateTime.ParseExact(pWhPickup.OrderDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                _UpdateClause += pWhPickup.RequiredDate == "01/01/1900" ? " ,RequiredDate = NULL " : (" ,RequiredDate = '" + (DateTime.ParseExact(pWhPickup.RequiredDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                ////Set from the Finalize btn or when update details for putaway
                //_UpdateClause += pStatusID == 0 ? ",StatusID=null" : (",StatusID=" + pStatusID) + " \n";
                //_UpdateClause += " , IsFinalized = " + (pIsFinalized ? "1" : "0") + " \n";
                //_UpdateClause += pFinalizeDate == "01/01/1900" ? " ,FinalizeDate = NULL " : (" ,FinalizeDate = '" + (DateTime.ParseExact(pFinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                _UpdateClause += pWhPickup.Notes == "0" ? ",Notes=null" : (",Notes=N'" + pWhPickup.Notes + "'") + " \n";
                _UpdateClause += pWhPickup.OperationID == 0 ? ",OperationID=null" : (",OperationID=" + pWhPickup.OperationID) + " \n";
                _UpdateClause += pWhPickup.RMANumber == "0" ? ",RMANumber=null" : (",RMANumber=N'" + pWhPickup.RMANumber + "'") + " \n";
                _UpdateClause += pWhPickup.DriverName == "0" ? ",DriverName=null" : (",DriverName=N'" + pWhPickup.DriverName + "'") + " \n";
                _UpdateClause += pWhPickup.Location == "0" ? ",Location=null" : (",Location=N'" + pWhPickup.Location + "'") + " \n";
                _UpdateClause += pWhPickup.Cards == "0" ? ",Cards=null" : (",Cards=N'" + pWhPickup.Cards + "'") + " \n";
                _UpdateClause += pWhPickup.Rep == "0" ? ",Rep=null" : (",Rep=N'" + pWhPickup.Rep + "'") + " \n";
                _UpdateClause += pWhPickup.EquipmentID == 0 ? ",EquipmentID=null" : (",EquipmentID=" + pWhPickup.EquipmentID) + " \n";
                _UpdateClause += pWhPickup.PersonInChargeID == 0 ? ",PersonInChargeID=null" : (",PersonInChargeID=" + pWhPickup.PersonInChargeID) + " \n";
                _UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                _UpdateClause += " , ModificationDate = GETDATE() ";
                _UpdateClause += " WHERE ID = " + pWhPickup.ID.ToString();

                checkException = objCWH_Pickup.UpdateList(_UpdateClause);
                if (checkException == null)
                {
                    //i think done in details and not header
                    //TODO Update location if used or not used
                    //checkException = objCvwWH_PickupDetails.GetListPaging(99999, 1, "WHERE PickupID=" + objCVarWH_Pickup.ID, "Code", out _RowCount);
                }
                else
                    strMessage = checkException.Message;
            }
            #endregion Update
            if (strMessage == "")
                checkException = objCvwWH_Pickup.GetListPaging(1, 1, "WHERE ID=" + pWhPickup.ID.ToString(), "ID", out _RowCount);
            return new object[] {
                strMessage
                , pWhPickup.ID //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[2]
                //, new JavaScriptSerializer().Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails) //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pPickupIDs)
        {
            bool _result = false;
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            foreach (var currentID in pPickupIDs.Split(','))
            {
                objCWH_Pickup.lstDeletedCPKWH_Pickup.Add(new CPKWH_Pickup() { ID = Int64.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_Pickup.DeleteItem(objCWH_Pickup.lstDeletedCPKWH_Pickup);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the Pickups were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] Finalize(Int64 pFinalizedPickupID, Int32 pIsFinalize)
        {
            string strMessage = "";
            Exception checkException = null;
            string _PickedLocationIDList = "0";
            string _ReleasedLocationIDList = "0";
            int _RowCount = 0;
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            CvwWH_Inventory objCvwWH_Inventory = new CvwWH_Inventory();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            #region Finalize
            if (pIsFinalize == 1)
            {
                checkException = objCWH_Pickup.UpdateList($"IsFinalized=1, FinalizeUserID={WebSecurity.CurrentUserId}, FinalizeDate=GETDATE() WHERE ID={pFinalizedPickupID.ToString()}");
                if (checkException == null)
                {
                    #region Set IsUsed=0 in locations for released ones
                    checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupID=" + pFinalizedPickupID, "ID", out _RowCount);
                    for (int i = 0; i < objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count; i++)
                        _PickedLocationIDList += "," + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[i].LocationID;
                    if (_PickedLocationIDList != "0")
                        checkException = objCvwWH_Inventory.GetListPaging(999999, 1, "WHERE AvailableQuantity=0 AND LocationID IN (" + _PickedLocationIDList + ")", "LocationID", out _RowCount);
                    for (int i = 0; i < objCvwWH_Inventory.lstCVarvwWH_Inventory.Count; i++)
                        _ReleasedLocationIDList += "," + objCvwWH_Inventory.lstCVarvwWH_Inventory[i].LocationID;
                    if (_ReleasedLocationIDList != "0")
                        checkException = objCWH_RowLocation.UpdateList("IsUsed=0 ,StatusID = 10 WHERE ID IN (" + _ReleasedLocationIDList + ")");
                    #endregion Set IsUsed=0 in locations for released ones
                }
            }
            #endregion Finalize
            #region UnFinalize
            else
            {
				checkException = objCWH_Pickup.UpdateList($"IsFinalized=0, FinalizeUserID=null, FinalizeDate=null WHERE ID={pFinalizedPickupID.ToString()}");

				if (checkException == null)
                {
                    #region Set IsUsed=0 in locations for released ones
                    checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupID=" + pFinalizedPickupID, "ID", out _RowCount);
                    for (int i = 0; i < objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count; i++)
                        _PickedLocationIDList += "," + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[i].LocationID;
                    if (_PickedLocationIDList != "0")
                        checkException = objCvwWH_Inventory.GetListPaging(999999, 1, "WHERE AvailableQuantity>0 AND LocationID IN (" + _PickedLocationIDList + ")", "LocationID", out _RowCount);
                    for (int i = 0; i < objCvwWH_Inventory.lstCVarvwWH_Inventory.Count; i++)
                        _ReleasedLocationIDList += "," + objCvwWH_Inventory.lstCVarvwWH_Inventory[i].LocationID;
                    if (_ReleasedLocationIDList != "0")
                        checkException = objCWH_RowLocation.UpdateList("IsUsed=1 WHERE ID IN (" + _ReleasedLocationIDList + ")");
                    #endregion Set IsUsed=0 in locations for released ones
                }
            }
            #endregion UnFinalize
            return new object[] {
                strMessage
            };
        }

        [HttpGet, HttpPost]
        public object[] Print(Int64 pPrintedPickupID, bool pIsPicklist)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

			CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
			checkException = objCvwWH_Pickup.GetList("WHERE ID=" + pPrintedPickupID);

			if (pIsPicklist)
			{
				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
				var picklist = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"Rep_3PLPickList 'WHERE P.ID={pPrintedPickupID}'", typeof(Picklist)).Cast<Picklist>().ToList();
				return new object[] {
				_ReturnedMessage //pData[0]
                , serializer.Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[1]
                , serializer.Serialize(picklist) //pData[2]
				};
			}
			else
			{
				//CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
				CvwWH_PickupDetailsLocationSerial objCvwWH_PickupDetailsLocationSerial = new CvwWH_PickupDetailsLocationSerial();
				//checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupID=" + pPrintedPickupID, "ID", out _RowCount);
				checkException = objCvwWH_PickupDetailsLocationSerial.GetListPaging(999999, 1, "WHERE PickupID=" + pPrintedPickupID, "ID", out _RowCount);
				return new object[] {
				_ReturnedMessage //pData[0]
                , serializer.Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[1]
                , serializer.Serialize(objCvwWH_PickupDetailsLocationSerial.lstCVarvwWH_PickupDetailsLocationSerial) //pData[2]
				};
			}
        }
        //not used till now
        [HttpGet, HttpPost]
        public string ValidatePickup(Int64 pPickupIDToValidate)
        {
            string _MessageReturned = "";
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            checkException = objCvwWH_PickupDetails.GetListPaging(999999, 1, "WHERE PickupID=" + pPickupIDToValidate, "ID", out _RowCount);
            for (int i = 0; i < objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails.Count; i++)
            {
            }
            return _MessageReturned;
        }
        #endregion Pickup

        #region PickupDetails
        [HttpGet, HttpPost]
        public object[] PickupDetails_Save([FromBody] PickupDetails_SaveParamters pickupDetails_SaveParamters)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            CVarWH_PickupDetails objCVarWH_PickupDetails = new CVarWH_PickupDetails();
            CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            Int64 pPickupDetailsID = 0;
            string _UpdateClause = "";
            #region Save PickupHeader
            _UpdateClause = pickupDetails_SaveParamters.pWarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pickupDetails_SaveParamters.pWarehouseID) + " \n";
            _UpdateClause += pickupDetails_SaveParamters.pCustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pickupDetails_SaveParamters.pCustomerID) + " \n";
            _UpdateClause += pickupDetails_SaveParamters.pBillTo == 0 ? ",BillTo=null" : (",BillTo=" + pickupDetails_SaveParamters.pBillTo) + " \n";
            _UpdateClause += pickupDetails_SaveParamters.pEndUserID == 0 ? ",EndUserID=null" : (",EndUserID=" + pickupDetails_SaveParamters.pEndUserID) + " \n";
            _UpdateClause += pickupDetails_SaveParamters.pOrderDate == "01/01/1900" ? " ,OrderDate = NULL " : (" ,OrderDate = '" + (DateTime.ParseExact(pickupDetails_SaveParamters.pOrderDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
            _UpdateClause += pickupDetails_SaveParamters.pRequiredDate == "01/01/1900" ? " ,RequiredDate = NULL " : (" ,RequiredDate = '" + (DateTime.ParseExact(pickupDetails_SaveParamters.pRequiredDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
            ////Set from the Finalize btn or when update details for putaway
            //_UpdateClause += pStatusID == 0 ? ",StatusID=null" : (",StatusID=" + pStatusID) + " \n";
            //_UpdateClause += " , IsFinalized = " + (pIsFinalized ? "1" : "0") + " \n";
            //_UpdateClause += pFinalizeDate == "01/01/1900" ? " ,FinalizeDate = NULL " : (" ,FinalizeDate = '" + (DateTime.ParseExact(pFinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
            _UpdateClause += pickupDetails_SaveParamters.pHeaderNotes == "0" ? ",Notes=null" : (",Notes=N'" + pickupDetails_SaveParamters.pHeaderNotes + "'") + " \n";
            _UpdateClause += pickupDetails_SaveParamters.pOperationID == 0 ? ",OperationID=null" : (",OperationID=" + pickupDetails_SaveParamters.pOperationID) + " \n";
            _UpdateClause += pickupDetails_SaveParamters.pPersonInChargeID == 0 ? ",PersonInChargeID=null" : (",PersonInChargeID=" + pickupDetails_SaveParamters.pPersonInChargeID) + " \n";
            _UpdateClause += pickupDetails_SaveParamters.pRMANumber == "0" ? ",RMANumber=null" : (",RMANumber=N'" + pickupDetails_SaveParamters.pRMANumber + "'") + " \n";
            _UpdateClause += pickupDetails_SaveParamters.pDriverName == "0" ? ",DriverName=null" : (",DriverName=N'" + pickupDetails_SaveParamters.pDriverName + "'") + " \n";
            _UpdateClause += pickupDetails_SaveParamters.pEquipmentID == 0 ? ",EquipmentID=null" : (",EquipmentID=" + pickupDetails_SaveParamters.pEquipmentID) + " \n";
            _UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
            _UpdateClause += " , ModificationDate = GETDATE() ";
            _UpdateClause += " WHERE ID = " + pickupDetails_SaveParamters.pPickupID;
            checkException = objCWH_Pickup.UpdateList(_UpdateClause);
            #endregion Save PickupHeader
            #region Save Details
            if (checkException == null)
            {
                objCVarWH_PickupDetails.ID = pickupDetails_SaveParamters.pPickupDetailsID;
                objCVarWH_PickupDetails.PickupID = pickupDetails_SaveParamters.pPickupID;
                objCVarWH_PickupDetails.PurchaseItemID = pickupDetails_SaveParamters.pPurchaseItemID;
                objCVarWH_PickupDetails.DemandedQuantity = pickupDetails_SaveParamters.pDemandedQuantity;
                objCVarWH_PickupDetails.Notes = pickupDetails_SaveParamters.pNotes;
                if (pickupDetails_SaveParamters.pPickupDetailsID != 0) //update so save original creator & creation date
                {
                    CWH_PickupDetails objCGetCreationInformation = new CWH_PickupDetails();
                    objCGetCreationInformation.GetItem(pickupDetails_SaveParamters.pPickupDetailsID);
                    objCVarWH_PickupDetails.CreatorUserID = objCGetCreationInformation.lstCVarWH_PickupDetails[0].CreatorUserID;
                    objCVarWH_PickupDetails.CreationDate = objCGetCreationInformation.lstCVarWH_PickupDetails[0].CreationDate;
                }
                else
                {
                    objCVarWH_PickupDetails.CreatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_PickupDetails.CreationDate = DateTime.Now;
                }
                objCVarWH_PickupDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_PickupDetails.ModificationDate = DateTime.Now;
				Common.Common.ReplaceNull(objCVarWH_PickupDetails);
				objCWH_PickupDetails.lstCVarWH_PickupDetails.Add(objCVarWH_PickupDetails);
                checkException = objCWH_PickupDetails.SaveMethod(objCWH_PickupDetails.lstCVarWH_PickupDetails);
                if (checkException == null)
                {
                    pPickupDetailsID = objCVarWH_PickupDetails.ID;
                    #region Save PickupDetailsLocations
                    var _ArrReceiveDetailsID = pickupDetails_SaveParamters.pReceiveDetailsIDList.Split(',');
                    int _ReceiveDetailsIDLength = _ArrReceiveDetailsID.Length;
                    var _ArrPickedQuantity = pickupDetails_SaveParamters.pReceiveDetailsPickedQuantityList.Split(',');
                    CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
                    CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
                    CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
                    for (int i = 0; i < _ReceiveDetailsIDLength; i++)
                    {
                        CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                        CVarWH_PickupDetailsLocation objCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
                        checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ID=" + _ArrReceiveDetailsID[i], "ID", out _RowCount);
                        checkException = objCWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupDetailsID=" + pickupDetails_SaveParamters.pPickupDetailsID + " AND ReceiveDetailsID=" + _ArrReceiveDetailsID[i], "ID", out _RowCount);
                        checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupDetailsID=" + pickupDetails_SaveParamters.pPickupDetailsID + " AND ReceiveDetailsID=" + _ArrReceiveDetailsID[i], "ID", out _RowCount);
                        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
                        if (_RowCount > 0)
                        { //if number of checked serials is not equal to picked quantity or no serials then abort
                            int _TempRowCount = 0;
                            checkException = objCWH_ReceiveDetailsSerial.GetListPaging(999999, 1, "WHERE PickupDetailsLocationID=" + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID, "ID", out _TempRowCount);
                            if (objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count > 0
                                && decimal.Parse(_ArrPickedQuantity[i]) < objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count) 
                                _MessageReturned = "Please, checked number of selected serials for location " + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].LocationCode + ".";
                        }

                        if (decimal.Parse(_ArrPickedQuantity[i]) == 0 && _RowCount > 0 && _MessageReturned == "") //i have a picked item from location turned to 0 so delete
                        {
                            checkException = objCWH_PickupDetailsLocation.DeleteList("WHERE ID=" + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID);
                        }
                        else if (decimal.Parse(_ArrPickedQuantity[i]) > 0 && _MessageReturned =="") //i have quantity so either insert or update pickupLocation
                        {
                            if (objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count == 0)
                            {
                                objCVarWH_PickupDetailsLocation.ID = 0;
                                objCVarWH_PickupDetailsLocation.CreatorUserID = WebSecurity.CurrentUserId;
                                objCVarWH_PickupDetailsLocation.CreationDate = objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;
                                //objCVarWH_PickupDetailsLocation.VehicleActionID = pVehicleActionID;
                                //objCVarWH_PickupDetailsLocation.PickedQuantity = decimal.Parse(_ArrPickedQuantity[i]);
                            }
                            else //Update
                            {
                                objCVarWH_PickupDetailsLocation.ID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID;
                                objCVarWH_PickupDetailsLocation.CreatorUserID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].CreatorUserID;
                                objCVarWH_PickupDetailsLocation.CreationDate = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].CreationDate;
                                objCVarWH_PickupDetailsLocation.VehicleActionID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].VehicleActionID;
                                //objCVarWH_PickupDetailsLocation.PickedQuantity = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PickedQuantity + decimal.Parse(_ArrPickedQuantity[i]);
                            }
                            objCVarWH_PickupDetailsLocation.PickedQuantity = decimal.Parse(_ArrPickedQuantity[i]);
                            objCVarWH_PickupDetailsLocation.PickupDetailsID = pPickupDetailsID;
                            objCVarWH_PickupDetailsLocation.ReceiveDetailsID = Int64.Parse(_ArrReceiveDetailsID[i]);
                            objCVarWH_PickupDetailsLocation.Notes = "0";
                            objCVarWH_PickupDetailsLocation.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;

							//CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
							Common.Common.ReplaceNull(objCVarWH_PickupDetailsLocation);
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(objCVarWH_PickupDetailsLocation);
                            checkException = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
                        } //else if (decimal.Parse(_ArrPickedQuantity[i]) > 0)
                        if (checkException != null)
                            _MessageReturned = checkException.Message;
                    } //for (int i=0;i<_ReceiveDetailsIDLength; i++) {

                    #endregion Save PickupDetailsLocations
                }
                checkException = objCvwWH_Pickup.GetList("WHERE ID=" + pickupDetails_SaveParamters.pPickupID.ToString());
                checkException = objCvwWH_PickupDetails.GetList("WHERE PickupID=" + pickupDetails_SaveParamters.pPickupID.ToString() + " ORDER BY ID");
            }
            #endregion Save Details

            return new object[] {
                checkException == null ? true : false
                , new JavaScriptSerializer().Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[2]
                , pPickupDetailsID //pData[3]
                , _MessageReturned //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] PickupDetails_FillModalTables(Int64 pPickupID, Int64 pPurchaseItemID, string pWhereClauseReceiveDetails)
        {
            int _RowCount = 0;
            Exception checkException = null;
            Int64 pPickupDetailsID = 0;
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
            checkException = objCvwWH_PickupDetails.GetListPaging(99999, 1, "WHERE PickupID=" + pPickupID + " AND PurchaseItemID=" + pPurchaseItemID, "ID", out _RowCount);
            if (_RowCount > 0)
                pPickupDetailsID = objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails[0].ID;
            checkException = objCvwWH_ReceiveDetails.GetListPaging(99999, 1, pWhereClauseReceiveDetails, "LocationCode", out _RowCount);
            checkException = objCvwWH_PickupDetailsLocation.GetListPaging(99999, 1, "WHERE PickupID=" + pPickupID + " AND PurchaseItemID=" + pPurchaseItemID, "LocationCode", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[0]
                , serializer.Serialize(objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation) //pData[1]
                , pPickupDetailsID == 0 ? null : serializer.Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails[0])
            };
        }

        [HttpGet, HttpPost]
        public object[] PickupDetails_GetAvailablePurchaseItemsForCustomer(Int32 pCustomerID, bool pIsExcludeVehicle)
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
        public object[] PickupDetails_Delete(string pPickupDetailsIDsToDelete, Int64 pPickupID)
        {
            Exception checkException = null;
            bool _Result = true;
            CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            int _NumberOfRecords = pPickupDetailsIDsToDelete.Split(',').Length;
            for (int i = 0; i < _NumberOfRecords; i++)
            {
                Int64 _PickupDetailsID = Int64.Parse(pPickupDetailsIDsToDelete.Split(',')[i]);
                checkException = objCWH_PickupDetails.DeleteList("WHERE ID=" + _PickupDetailsID.ToString());
                if (checkException != null)
                    _Result = false;
            }
            objCvwWH_PickupDetails.GetList("WHERE PickupID=" + pPickupID.ToString());
            objCvwWH_Pickup.GetList("WHERE ID=" + pPickupID.ToString());
            return new object[] {
                _Result
                , new JavaScriptSerializer().Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] PickupDetails_Export(Int32 pPageNumber, Int32 pPageSize, string pWhereClauseExportPickupDetails, string pOrderBy
            ,string pCalledFrom)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_PickupDetails objvwCWH_PickupDetails = new CvwWH_PickupDetails();
            CvwWH_PickupDetailsLocation objvwCWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            object pPickupDetailsList = null;
            if (pCalledFrom == "WithLocationDetails")
            {
                checkException = objvwCWH_PickupDetailsLocation.GetListPaging(pPageSize, pPageNumber, pWhereClauseExportPickupDetails, pOrderBy, out _RowCount);
                pPickupDetailsList = objvwCWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation
                //.GroupBy(g => g.PickupID)
                .Select(s => new
                {
                    PickupCode = s.Code
                    ,
                    ProductCode = s.PurchaseItemCode//s.First().PurchaseItemCode
                    ,
                    ProductName = s.PurchaseItemName
                    ,
                    Quantity = s.PickedQuantity
                    ,
                    IsFinalized = s.IsFinalized
                    ,
                    Notes = s.Notes
                    ,
                    LocationCode = s.LocationCode
                    ,
                    PalletID = s.PalletID
                    ,
                    LotNo = s.LotNo //Serial
                }).ToList();
            }
            else
            {
                checkException = objvwCWH_PickupDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseExportPickupDetails, pOrderBy, out _RowCount);
                pPickupDetailsList = objvwCWH_PickupDetails.lstCVarvwWH_PickupDetails
                    //.GroupBy(g => g.PickupID)
                    .Select(s => new
                    {
                        PickupCode = s.Code
                        ,
                        ProductCode = s.PurchaseItemCode//s.First().PurchaseItemCode
                        ,
                        ProductName = s.PurchaseItemName
                        ,
                        Quantity = s.PickedQuantity
                        ,
                        IsFinalized = s.IsFinalized
                        ,
                        Notes = s.Notes
                    }).ToList();
            }
            return new object[] {
                new JavaScriptSerializer().Serialize(pPickupDetailsList)
            };
        }
        
        #endregion PickupDetails

        #region PickupDetailsSerial
        [HttpGet, HttpPost]
        public object[] PickupDetailsSerial_FillModal(Int64 pPickupDetailsLocationID, Int64 pReceiveDetailsID)
        {
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID="+pReceiveDetailsID
                + " AND (PickupDetailsLocationID IS NULL OR PickupDetailsLocationID= "+pPickupDetailsLocationID+ ")"
                + " ORDER BY Serial");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
            };
        }
        [HttpGet, HttpPost]
        public object[] PickupDetailsSerial_Save([FromBody] PickupDetailsSerial_SaveParameters pickupDetailsSerial_SaveParameters)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            Int64 _PickupDetailsLocationID = pickupDetailsSerial_SaveParameters.pPickupDetailsLocationID;
            checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID=NULL WHERE PickupDetailsLocationID=" + pickupDetailsSerial_SaveParameters.pPickupDetailsLocationID);
            if (checkException == null)
                checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID=" + _PickupDetailsLocationID + " WHERE ID IN (" + pickupDetailsSerial_SaveParameters.pReceiveDetailsSerialIDList + ")");
            else
                _MessageReturned = checkException.Message;
            return new object[] {
                _MessageReturned
            };
        }
        #endregion PickupDetailsSerial

        #region PickupDetailsLocation
        [HttpGet, HttpPost]
        public object PickupDetailsLocation_PrintPDI(string pWhereClausePickupDetailsLocation)
        {
            string _ReturnedMessage = "";
            int _RowCount = 0;
            Exception checkException = null;

            CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, pWhereClausePickupDetailsLocation, "ID", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _ReturnedMessage
                , serializer.Serialize(objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation)
            };
        }
        #endregion PickupDetailsLocation

        #region ImportPickupFromExcel
        [HttpGet, HttpPost]
        public object[] PickupDetails_ImportFromExcel([FromBody] PickupExcelParam pickupExcelParam)
        {
            string pReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;

            var arrPurchaseItemCode = pickupExcelParam.pPurchaseItemCodeList.Split(',');
            var arrFromLocationCode = pickupExcelParam.pFromLocationList.Split(',');
            var arrQuantity = pickupExcelParam.pQuantityList.Split(',');
            int numberOfRows = arrPurchaseItemCode.Length;
            Int64 pPickupDetailsID = 0;
            Int64 pReceiveDetailsID = 0;
            string pWhereClause = "";
            string pUpdateClause = "";

            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CVarWH_PickupDetails objCVarWH_PickupDetails = new CVarWH_PickupDetails();
            #region check eligibility [1st iteration / it doesn't handle if the quantity exceeded in multiple rows so check again in second iteration]
            for (int i = 0; i < numberOfRows; i++)
            {
                #region Check data is written correctly
                checkException = objCPurchaseItem.GetList("WHERE Code=N'" + arrPurchaseItemCode[i] + "'");
                checkException = objCvwWH_RowLocation.GetList("WHERE WarehouseID=" + pickupExcelParam.pWarehouseID + " AND Code=N'" + arrFromLocationCode[i] + "'");
                if (objCvwWH_RowLocation.lstCVarvwWH_RowLocation.Count == 0
                    || objCPurchaseItem.lstCVarPurchaseItem.Count == 0)
                {
                    pReturnedMessage = "Please check item and locations at row " + (i + 2);
                    return new object[] { pReturnedMessage };
                }
                #endregion Check data is written correctly
                #region check ReceiveDetails is found
                else
                {
                    pReceiveDetailsID = PickupCheckEnoughQuantity(pickupExcelParam.pCustomerID
                        , objCvwWH_RowLocation.lstCVarvwWH_RowLocation[0].ID
                        , objCPurchaseItem.lstCVarPurchaseItem[0].ID, int.Parse(arrQuantity[i]));
                    if (pReceiveDetailsID == 0)
                    {
                        pReturnedMessage = "Please, check row " + (i + 2);
                        return new object[] { pReturnedMessage };
                    }
                }
                #endregion check ReceiveDetails is found
            } //for (int i = 0; i < numberOfRows; i++)
            #endregion check eligibility

            #region Save Header
            pUpdateClause = "CustomerID=" + pickupExcelParam.pCustomerID + " \n";
            pUpdateClause += ",WarehouseID=" + pickupExcelParam.pWarehouseID + " \n";
            pUpdateClause += "WHERE ID=" + pickupExcelParam.pPickupID + " \n";
            checkException = objCWH_Pickup.UpdateList(pUpdateClause);
            #endregion Save Header

            #region Picking
            for (int i = 0; i < numberOfRows; i++)
            {
                checkException = objCPurchaseItem.GetList("WHERE Code=N'" + arrPurchaseItemCode[i] + "'");
                checkException = objCvwWH_RowLocation.GetList("WHERE WarehouseID=" + pickupExcelParam.pWarehouseID + " AND Code=N'" + arrFromLocationCode[i] + "'");
                Int64 currentPurchaseItemID = objCPurchaseItem.lstCVarPurchaseItem[0].ID;
                Int32 currentLocationID = objCvwWH_RowLocation.lstCVarvwWH_RowLocation[0].ID;

                #region check current quantity
                pReceiveDetailsID = PickupCheckEnoughQuantity(pickupExcelParam.pCustomerID
                    , objCvwWH_RowLocation.lstCVarvwWH_RowLocation[0].ID
                    , objCPurchaseItem.lstCVarPurchaseItem[0].ID, int.Parse(arrQuantity[i]));
                if (pReceiveDetailsID == 0)
                {
                    pReturnedMessage = "Stopped at row " + (i + 2) + ". Previous rows are saved, please remove them and check quantities for the rest.";
                    return new object[] { pReturnedMessage };
                }
                #endregion check current quantity

                #region Row is OK so get needed data
                pWhereClause = "WHERE PickupID=" + pickupExcelParam.pPickupID + " \n";
                pWhereClause += "AND PurchaseItemID=" + currentPurchaseItemID + " \n";
                CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
                checkException = objCWH_PickupDetails.GetList(pWhereClause);
                
                if (objCWH_PickupDetails.lstCVarWH_PickupDetails.Count == 0) //Insert
                    pPickupDetailsID = 0;
                else //Update
                    pPickupDetailsID = objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID;
                #endregion Row is OK

                #region SavePickupDetailsHeader
                objCVarWH_PickupDetails.ID = pPickupDetailsID;
                objCVarWH_PickupDetails.PickupID = pickupExcelParam.pPickupID;
                objCVarWH_PickupDetails.PurchaseItemID = currentPurchaseItemID;
                if (pPickupDetailsID != 0) //update so save original creator & creation date
                {
                    CWH_PickupDetails objCGetCreationInformation = new CWH_PickupDetails();
                    objCGetCreationInformation.GetItem(pPickupDetailsID);
                    objCVarWH_PickupDetails.DemandedQuantity = (objCVarWH_PickupDetails.DemandedQuantity + int.Parse(arrQuantity[i]));
                    objCVarWH_PickupDetails.Notes = objCGetCreationInformation.lstCVarWH_PickupDetails[0].Notes;
                    objCVarWH_PickupDetails.CreatorUserID = objCGetCreationInformation.lstCVarWH_PickupDetails[0].CreatorUserID;
                    objCVarWH_PickupDetails.CreationDate = objCGetCreationInformation.lstCVarWH_PickupDetails[0].CreationDate;
                }
                else
                {
                    objCVarWH_PickupDetails.DemandedQuantity = int.Parse(arrQuantity[i]);
                    objCVarWH_PickupDetails.Notes = "0";
                    objCVarWH_PickupDetails.CreatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_PickupDetails.CreationDate = DateTime.Now;
                }
                objCVarWH_PickupDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_PickupDetails.ModificationDate = DateTime.Now;
                CWH_PickupDetails objCWH_PickupDetails_Save = new CWH_PickupDetails();
				Common.Common.ReplaceNull(objCVarWH_PickupDetails);
                objCWH_PickupDetails_Save.lstCVarWH_PickupDetails.Add(objCVarWH_PickupDetails);
                checkException = objCWH_PickupDetails_Save.SaveMethod(objCWH_PickupDetails_Save.lstCVarWH_PickupDetails);
                #endregion SavePickupDetailsHeader

                #region SavePickupDetailsLocation
                if (checkException == null)
                {
                    pPickupDetailsID = objCVarWH_PickupDetails.ID;
                    CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();

                    CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
                    //for (int i = 0; i < _ReceiveDetailsIDLength; i++)
                    {
                        CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                        CVarWH_PickupDetailsLocation objCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
                        checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ID=" + pReceiveDetailsID, "ID", out _RowCount);
                        checkException = objCWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupDetailsID=" + pPickupDetailsID + " AND ReceiveDetailsID=" + pReceiveDetailsID, "ID", out _RowCount);
                        checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupDetailsID=" + pPickupDetailsID + " AND ReceiveDetailsID=" + pReceiveDetailsID, "ID", out _RowCount);
                        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
                        if (_RowCount > 0)
                        { //if number of checked serials is not equal to picked quantity or no serials then abort
                            int _TempRowCount = 0;
                            checkException = objCWH_ReceiveDetailsSerial.GetListPaging(999999, 1, "WHERE PickupDetailsLocationID=" + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID, "ID", out _TempRowCount);
                            if (objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count > 0
                                && decimal.Parse(arrQuantity[i]) < objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count)
                            {
                                pReturnedMessage = "Please, checked number of selected serials for location " + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].LocationCode + " at row " + (i + 2);
                                return new object[] { pReturnedMessage };
                            }
                        }

                        if (decimal.Parse(arrQuantity[i]) == 0 && _RowCount > 0 && pReturnedMessage == "") //i have a picked item from location turned to 0 so delete
                        {
                            checkException = objCWH_PickupDetailsLocation.DeleteList("WHERE ID=" + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID);
                        }
                        else if (decimal.Parse(arrQuantity[i]) > 0 && pReturnedMessage == "") //i have quantity so either insert or update pickupLocation
                        {
                            if (objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count == 0)
                            {
                                objCVarWH_PickupDetailsLocation.ID = 0;
                                objCVarWH_PickupDetailsLocation.CreatorUserID = WebSecurity.CurrentUserId;
                                objCVarWH_PickupDetailsLocation.CreationDate = objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;
                                //objCVarWH_PickupDetailsLocation.VehicleActionID = pVehicleActionID;
                                //objCVarWH_PickupDetailsLocation.PickedQuantity = decimal.Parse(_ArrPickedQuantity[i]);
                            }
                            else //Update
                            {
                                objCVarWH_PickupDetailsLocation.ID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID;
                                objCVarWH_PickupDetailsLocation.CreatorUserID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].CreatorUserID;
                                objCVarWH_PickupDetailsLocation.CreationDate = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].CreationDate;
                                objCVarWH_PickupDetailsLocation.VehicleActionID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].VehicleActionID;
                                //objCVarWH_PickupDetailsLocation.PickedQuantity = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PickedQuantity + decimal.Parse(_ArrPickedQuantity[i]);
                            }
                            objCVarWH_PickupDetailsLocation.PickedQuantity = decimal.Parse(arrQuantity[i]);
                            objCVarWH_PickupDetailsLocation.PickupDetailsID = pPickupDetailsID;
                            objCVarWH_PickupDetailsLocation.ReceiveDetailsID = pReceiveDetailsID;
                            objCVarWH_PickupDetailsLocation.Notes = "0";
                            objCVarWH_PickupDetailsLocation.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;
							Common.Common.ReplaceNull(objCVarWH_PickupDetailsLocation);
                            //CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                            objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(objCVarWH_PickupDetailsLocation);
                            checkException = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
                        } //else if (decimal.Parse(_ArrPickedQuantity[i]) > 0)
                        if (checkException != null)
                            pReturnedMessage = checkException.Message;
                    } //for (int i=0;i<_ReceiveDetailsIDLength; i++) {

                }

                #endregion SavePickupDetailsLocation

            } //for (int i = 0; i < numberOfRows; i++)
            #endregion Picking

            return new object[] {
                pReturnedMessage
            };
        }
        #endregion ImportPickupFromExcel

        #region UploadExcel
        [HttpGet, HttpPost]
        public object UploadExcel()
        {
            int ResultCode = 1;
            long pID = 0;
            bool AllExcelRowsAreValid = true;
            List<string> MissingFields = new List<string>();
            List<string> DefectedItemsMessage = new List<string>();
            string InvalidQuantityMessage = "";
            long.TryParse(HttpContext.Current.Request.Form[0], out pID);
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
                        CPurchaseItem objCPurchaseItem = new CPurchaseItem();
                        objCPurchaseItem.GetList(" WHERE 1=1");
                        CWH_Pickup objCWH_Pickup = new CWH_Pickup();
                        objCWH_Pickup.GetItem(pID);
                        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
                        objCWH_ReceiveDetailsSerial.GetList(" WHERE 1=1");
                        CCustomizedDBCall objCustomizedDBCall = new CCustomizedDBCall();
                        CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
                        CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                        List<PickupDetailsExcelRow> ExcelRowsToBeInserted = new List<PickupDetailsExcelRow>();
                        int count = 1;
                        foreach (DataRow row in result.Tables[0].Rows)
                        {
                            PickupDetailsExcelRow pickupDetailsExcelRow = new PickupDetailsExcelRow
                            {
                                pIndex = count,
                                pPurchaseItemID = 0,
                                pReceiveDetailID = 0,
                                pReceiveDetailsSerialID = 0,
                                pPartNumber = row["Part Number"] == DBNull.Value ? "" : Convert.ToString(row["Part Number"]),
                                pQuantity = row["Quantity"] == DBNull.Value ? 0 : int.Parse(row["Quantity"].ToString()),
                                pSerialNumber = row["Serial Number"] == DBNull.Value ? "" : Convert.ToString(row["Serial Number"]),
                                pBatchNo = row["Batch Number"] == DBNull.Value ? "" : Convert.ToString(row["Batch Number"]),
                                pPO = row["PO"] == DBNull.Value ? "" : Convert.ToString(row["PO"]),
                            };
                            count++;

                            var ValidationCheck = CheckExcelRowValidation(pickupDetailsExcelRow, objCWH_ReceiveDetailsSerial, objCPurchaseItem, objCWH_Pickup) as ReturnedObjectAfterValidation;
                            ExcelRowsToBeInserted.Add(pickupDetailsExcelRow);
                            pickupDetailsExcelRow.pPurchaseItemID = ValidationCheck.PurchaseItemID;
                            pickupDetailsExcelRow.pReceiveDetailID = ValidationCheck.ReceiveDetailIDForSerial;
                            pickupDetailsExcelRow.pReceiveDetailsSerialID = ValidationCheck.ReceiveDetailSerialID;
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
                            ExcelRowsToBeInserted = ExcelRowsToBeInserted
                                .OrderBy(x => x.pPartNumber)
                                .ThenBy(x => x.pQuantity)
                                .ThenByDescending(x => x.pSerialNumber)
                                .ToList();
                            foreach (PickupDetailsExcelRow row in ExcelRowsToBeInserted)
                            {
                                decimal pickedQty = 0m;
                                int index = 0;
                                decimal remainingDemand = 0m;
                                List<PurchaseItemAvailableQty> PurchaseItemAvailableQty = new List<PurchaseItemAvailableQty>();
                                List<PurchaseItemAvailableQty> PurchaseItemAvailableQtyTemp = new List<PurchaseItemAvailableQty>();
                                //Available quantity based on first in first out
                                PurchaseItemAvailableQty = objCustomizedDBCall.ExecuteQuery_ListOfObjects($" EXEC WH_PurchaseItemAvailableQty {row.pPurchaseItemID},{objCWH_Pickup.lstCVarWH_Pickup[0].CustomerID}, {objCWH_Pickup.lstCVarWH_Pickup[0].WarehouseID}", typeof(PurchaseItemAvailableQty)).Cast<PurchaseItemAvailableQty>().ToList();
                                if (row.pQuantity == 1 && row.pSerialNumber == "")
                                { 
                                    PurchaseItemAvailableQtyTemp = objCustomizedDBCall.ExecuteQuery_ListOfObjects($" EXEC WH_PurchaseItemAvailableSerials {row.pPurchaseItemID},{objCWH_Pickup.lstCVarWH_Pickup[0].CustomerID}, {objCWH_Pickup.lstCVarWH_Pickup[0].WarehouseID}", typeof(PurchaseItemAvailableQty)).Cast<PurchaseItemAvailableQty>().ToList();
                                    if (PurchaseItemAvailableQtyTemp.Count > 0)
                                    {
                                        PurchaseItemAvailableQty = PurchaseItemAvailableQtyTemp;
                                        row.pSerialNumber = PurchaseItemAvailableQty[0].Serial;
                                        PurchaseItemAvailableQty[0].AvailableQuantity = 1;
                                        row.pReceiveDetailsSerialID = (int)PurchaseItemAvailableQty[0].ReceiveDetailsSerialID;
                                    }
                                }
                                else if(row.pBatchNo != "") 
                                {
                                    PurchaseItemAvailableQty = PurchaseItemAvailableQty
                                                                .OrderByDescending(x => x.BatchNumber == row.pBatchNo)
                                                                .ThenBy(x => x)
                                                                .ToList();
                                }
                                else if (row.pPO != "")
                                {
                                    PurchaseItemAvailableQty = PurchaseItemAvailableQty
                                                                .OrderByDescending(x => x.PO == row.pPO)
                                                                .ThenBy(x => x)
                                                                .ToList();
                                }
                                if (PurchaseItemAvailableQty.Count > 0 && PurchaseItemAvailableQty[0].DefectionReason != ""){
                                    DefectedItemsMessage.Add(PurchaseItemAvailableQty[0].DefectionReason + " in product " + PurchaseItemAvailableQty[0].PurchaseItemName + " in receive order " + PurchaseItemAvailableQty[0].ReceiveCode);
                                }
                                int PickupDetailID = 0;
                                objCWH_PickupDetails.GetList(" WHERE PickupID = " + pID + " AND PurchaseItemID = " + row.pPurchaseItemID);
                                if (objCWH_PickupDetails.lstCVarWH_PickupDetails.Count == 0)
                                {
									objCWH_PickupDetails.lstCVarWH_PickupDetails.Add(new CVarWH_PickupDetails
									{
										PickupID = pID,
										PurchaseItemID = row.pPurchaseItemID,
										DemandedQuantity = 0m,
										Notes = "",
										CreatorUserID = WebSecurity.CurrentUserId,
										CreationDate = DateTime.Now,
										ModificatorUserID = WebSecurity.CurrentUserId,
										ModificationDate = DateTime.Now
									});
									Common.Common.ReplaceNull(objCWH_PickupDetails.lstCVarWH_PickupDetails[objCWH_PickupDetails.lstCVarWH_PickupDetails.Count - 1]);
									objCWH_PickupDetails.SaveMethod(objCWH_PickupDetails.lstCVarWH_PickupDetails);
                                    PickupDetailID = int.Parse(objCustomizedDBCall.CallStringFunction(" SELECT TOP(1)ID FROM WH_PickupDetails ORDER BY ID DESC"));
                                }
                                else
                                {
                                    PickupDetailID = (int)objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID;
                                }

                                while (pickedQty < row.pQuantity)
                                {
                                    remainingDemand = row.pQuantity - pickedQty;
                                    if (row.pReceiveDetailID == 0)
                                        pickedQty += PurchaseItemAvailableQty[index].AvailableQuantity >= remainingDemand ? remainingDemand : PurchaseItemAvailableQty[index].AvailableQuantity;
                                    else
                                        pickedQty += 1;

                                    objCWH_PickupDetailsLocation.GetList(" WHERE PickupDetailsID = " + PickupDetailID + " AND ReceiveDetailsID = " + (row.pReceiveDetailID == 0 ? PurchaseItemAvailableQty[index].ID : row.pReceiveDetailID));

                                    var ExistedPickupDetailsLocation = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation;

                                    if (ExistedPickupDetailsLocation.Count == 0)
                                    {
										objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(new CVarWH_PickupDetailsLocation
										{
										PickupDetailsID = PickupDetailID,
										ReceiveDetailsID = row.pReceiveDetailID == 0 ? PurchaseItemAvailableQty[index].ID : row.pReceiveDetailID,
										PickedQuantity = row.pReceiveDetailID == 0 ? (PurchaseItemAvailableQty[index].AvailableQuantity >= remainingDemand ? remainingDemand : PurchaseItemAvailableQty[index].AvailableQuantity) : 1,
										Notes = "",
										CreatorUserID = WebSecurity.CurrentUserId,
										CreationDate = DateTime.Now,
										ModificatorUserID = WebSecurity.CurrentUserId,
										ModificationDate = DateTime.Now,
										VehicleActionID = 0
										});
										Common.Common.ReplaceNull(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Count - 1]);
										objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
									}
                                    else
                                    {
                                        objCWH_PickupDetailsLocation.UpdateList(" PickedQuantity = " + (pickedQty + ExistedPickupDetailsLocation[0].PickedQuantity + " WHERE ID = " + ExistedPickupDetailsLocation[0].ID));
                                    }

                                    if(row.pSerialNumber != "")
                                        objCustomizedDBCall.CallStringFunction(" UPDATE WH_ReceiveDetailsSerial SET PickupDetailsLocationID = (SELECT TOP(1)ID FROM WH_PickupDetailsLocation ORDER BY ID DESC) WHERE ID = '" + row.pReceiveDetailsSerialID + "'");

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
                exception,
                DefectedItemsMessage = string.Join(",", DefectedItemsMessage)
            };
        }

        private object CheckExcelRowValidation(PickupDetailsExcelRow row, CWH_ReceiveDetailsSerial ReceiveDetailsSerials, CPurchaseItem PurchaseItems, CWH_Pickup Pickup)
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
                if (ReceiveDetailsSerials.lstCVarWH_ReceiveDetailsSerial.FirstOrDefault(x => x.Serial == row.pSerialNumber && x.PickupDetailsLocationID == 0 && x.ReserveDetailsLocationID == 0)?.ReceiveDetailsID == null)
                {
                    MissingFields.Add("SerialNumber");
                    obj.IsValid = false;
                }
                else
                {
                    obj.ReceiveDetailIDForSerial = (int)ReceiveDetailsSerials.lstCVarWH_ReceiveDetailsSerial.FirstOrDefault(x => x.Serial == row.pSerialNumber)?.ReceiveDetailsID;
                    obj.ReceiveDetailSerialID = (int)ReceiveDetailsSerials.lstCVarWH_ReceiveDetailsSerial.FirstOrDefault(x => x.Serial == row.pSerialNumber)?.ID;
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
                
                List<PurchaseItemAvailableQty> PurchaseItemAvailableQty = objCustomizedDBCall.ExecuteQuery_ListOfObjects($" EXEC WH_PurchaseItemAvailableQty {obj.PurchaseItemID},{Pickup.lstCVarWH_Pickup[0].CustomerID}, {Pickup.lstCVarWH_Pickup[0].WarehouseID}", typeof(PurchaseItemAvailableQty)).Cast<PurchaseItemAvailableQty>().ToList();
                if (PurchaseItemAvailableQty.Select(x => x.AvailableQuantity).Sum() < row.pQuantity)
                {
                    obj.IsValid = false;
                    obj.InvalidQuantityMessage = $"There is no enough quantity for item in row {row.pIndex} (available:{PurchaseItemAvailableQty.Select(x => x.AvailableQuantity).Sum()})";
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
            public int ReceiveDetailSerialID { get; set; } = 0;
        }
        class PickupDetailsExcelRow
        {
            public int pIndex { get; set; }
            public int pPurchaseItemID { get; set; }
            public int pReceiveDetailID { get; set; }
            public string pPartNumber { get; set; }
            public int pQuantity { get; set; }
            public string pSerialNumber { get; set; }
            public int pReceiveDetailsSerialID { get; set; }
            public string pBatchNo { get; set; }
            public string pPO { get; set; }
        }
        class PurchaseItemAvailableQty
        {
            public long ID { get; set; }
            public string ReceiveCode { get; set; }
            public long PurchaseItemID { get; set; }
            public string PurchaseItemCode { get; set; }
            public decimal AvailableQuantity { get; set; }
            public long ReceiveDetailsSerialID { get; set; }
            public string Serial { get; set; }
            public string DefectionReason { get; set; }
            public string PurchaseItemName { get; set; }
            public string BatchNumber { get; set; }
            public string PO { get; set; }

        }
        #endregion

        #region Static Functions
        //[HttpGet, HttpPost]
        public static Int64 PickupCheckEnoughQuantity(Int32 pCustomerID, Int32 pLocationID
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
            //pWhereClause += "AND WarehouseID=" + pickupExcelParam.pWarehouseID + " \n"; //already LocationID fulfills
            pWhereClause += "AND (Quantity - FinalizedPickedQuantity) > " + pQuantity + " \n";

            checkException = objCvwWH_ReceiveDetails.GetListPaging(1, 1, pWhereClause, "ID", out _RowCount);
            if (_RowCount > 0)
                pReceiveDetailsID = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ID;
            return pReceiveDetailsID;
        }
        #endregion Static Functions
    }

    #region POST Parameters
    public class PickupDetails_SaveParamters
    {
        //HeaderParameters
        public Int64 pPickupID { get; set; }
        public Int32 pWarehouseID { get; set; }
        public Int32 pCustomerID { get; set; }
        public Int32 pBillTo { get; set; }
        public Int32 pEndUserID { get; set; }
        public string pOrderDate { get; set; }
        public string pRequiredDate { get; set; }
        public bool pIsFinalized { get; set; }
        public string pFinalizeDate { get; set; }
        public string pHeaderNotes { get; set; }
        public Int64 pOperationID { get; set; }
        public string pRMANumber { get; set; }
        public Int32 pPersonInChargeID { get; set; }
        //PickupDetailsParameters
        public Int64 pPickupDetailsID { get; set; }
        public Int64 pPurchaseItemID { get; set; }
        public Decimal pDemandedQuantity { get; set; }
        public string pNotes { get; set; }
        //PickupDetailsLocationsParameters
        public string pReceiveDetailsIDList { get; set; }
        public string pReceiveDetailsPickedQuantityList { get; set; }
        public string pDriverName { get; set; }
        public int pEquipmentID { get; set; }
    }
    public class PickupDetailsSerial_SaveParameters
    {
        public Int64 pPickupDetailsLocationID { get; set; }
        public Int64 pReceiveDetailsID { get; set; }
        public string pReceiveDetailsSerialIDList { get; set; }
    }
    public class PickupExcelParam
    {
        //public string pCustomerNameList { get; set; }
        public Int64 pPickupID;
        public Int32 pWarehouseID;
        public Int32 pCustomerID;
        public string pPurchaseItemCodeList { get; set; }
        public string pFromLocationList { get; set; }
        public string pQuantityList { get; set; }
    }
    #endregion POST Parameters
	class Picklist: CVarvwWH_PickupDetailsLocationSerial
	{
		public decimal AvailableQuantity { get; set; }
	}
}
