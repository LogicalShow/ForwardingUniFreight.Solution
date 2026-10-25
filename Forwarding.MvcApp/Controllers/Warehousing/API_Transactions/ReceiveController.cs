using ExcelDataReader;
using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
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
using OfficeOpenXml;
using OfficeOpenXml.DataValidation;
using OfficeOpenXml.DataValidation.Contracts;
using static AutoMapper.Internal.ExpressionFactory;
using System.IO.Packaging;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using System.Text.RegularExpressions;
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Transactions
{
    public class ReceiveController : ApiController
    {
        #region Receive
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            CNoAccessReceiveDetailsStatus objCNoAccessReceiveDetailsStatus = new CNoAccessReceiveDetailsStatus();
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCWH_Warehouse.GetList("ORDER BY Name");
                //checkException = objCPurchaseItem.GetList("ORDER BY Code"); //to improve performance
                checkException = objCNoAccessReceiveDetailsStatus.GetList("WHERE IsInactive=0");
            }
            objCTRCK_Equipments.GetList(" WHERE 1=1");
            #region Get Minimal Data
            var pPurchaseItemList = objCPurchaseItem.lstCVarPurchaseItem
                .Select(s => new {
                    ID = s.ID
                    ,
                    Code = s.Code
                    ,
                    Name = s.Name
                })
                .ToList();
            #endregion Get Minimal Data
            checkException = objCvwWH_Receive.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive)
                , _RowCount
                , serializer.Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[2]
                , serializer.Serialize(objCPurchaseItem.lstCVarPurchaseItem) //pPurchaseItem=pData[3]
                , serializer.Serialize(objCNoAccessReceiveDetailsStatus.lstCVarNoAccessReceiveDetailsStatus) //pWarehouse=pData[4]
                , serializer.Serialize(objCTRCK_Equipments.lstCVarTRCK_Equipments) //pEquipments=pData[5]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int64 pHeaderID)
        {
            CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCvwWH_Receive.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = objCvwWH_ReceiveDetails.GetListPaging(99999, 1, "WHERE ReceiveID=" + pHeaderID.ToString(), "ID", out _RowCount);

			List<string> pDocsInFileNames = new List<string>();
			string[] imageExtensions = { "*.jpg", "*.jpeg", "*.png", "*.gif", "*.bmp", "*.tiff" };
			var strPath = HttpContext.Current.Server.MapPath($"~/DocsInFiles//Receive//{pHeaderID}");
			if (Directory.Exists(strPath))
			{
				foreach (var extension in imageExtensions)
				{
					string[] files = Directory.GetFiles(strPath, extension, SearchOption.TopDirectoryOnly);

					foreach (var file in files)
					{
						pDocsInFileNames.Add(file.Substring(file.LastIndexOf('\\') + 1));
					}
				}
			}
			
			return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[0]
                , new JavaScriptSerializer().Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
				,               new JavaScriptSerializer().Serialize(pDocsInFileNames) //pData[2]
			};
        }

        [HttpGet, HttpPost]
        public object[] Save([FromBody]WhReceive pWhReceive)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            CWH_Receive objCWH_Receive = new CWH_Receive();
            CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CVarWH_Receive objCVarWH_Receive = new CVarWH_Receive();
            int _RowCount = 0;
            string _UpdateClause = "";
            #region Insert
            if (pWhReceive.ID == 0) //Insert
            {
                objCVarWH_Receive.Code = "0";
                objCVarWH_Receive.WarehouseID = pWhReceive.WarehouseID;
                objCVarWH_Receive.CustomerID = pWhReceive.CustomerID;
                objCVarWH_Receive.ReceiveDate = DateTime.ParseExact(pWhReceive.ReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.ETD = objCVarWH_Receive.ReceiveDate; //DateTime.ParseExact(pETD + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.ETA = objCVarWH_Receive.ReceiveDate; //DateTime.ParseExact(pETA + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.ArrivalDate = objCVarWH_Receive.ReceiveDate; //DateTime.ParseExact(pArrivalDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.StatusID = pWhReceive.StatusID;
                objCVarWH_Receive.IsFinalized = pWhReceive.IsFinalized;
                objCVarWH_Receive.FinalizeUserID = pWhReceive.IsFinalized ?WebSecurity.CurrentUserId:0;
                objCVarWH_Receive.FinalizeDate = DateTime.ParseExact(pWhReceive.FinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.Notes = pWhReceive.Notes;
                objCVarWH_Receive.EquipmentID = pWhReceive.EquipmentID;
                objCVarWH_Receive.ContainerNumber = pWhReceive.ContainerNumber;
                objCVarWH_Receive.PO = pWhReceive.PO;
                objCVarWH_Receive.MasterFile = pWhReceive.MasterFile;
                objCVarWH_Receive.Invoice = pWhReceive.Invoice;
                objCVarWH_Receive.ReceiveFrom = pWhReceive.ReceiveFrom;
                objCVarWH_Receive.DriverName = pWhReceive.DriverName;
                objCVarWH_Receive.Location = pWhReceive.Location;
                objCVarWH_Receive.Cards = pWhReceive.Cards;
                objCVarWH_Receive.Rep = pWhReceive.Rep;

                objCVarWH_Receive.InvoiceID = 0;
                objCVarWH_Receive.OperationID = 0;

                objCVarWH_Receive.CreatorUserID = objCVarWH_Receive.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_Receive.CreationDate = objCVarWH_Receive.ModificationDate = DateTime.Now;
				objCVarWH_Receive.CreationSource = CreationSource.web.ToString();
				Common.Common.ReplaceNull(objCVarWH_Receive);
				objCWH_Receive.lstCVarWH_Receive.Add(objCVarWH_Receive);
                checkException = objCWH_Receive.SaveMethod(objCWH_Receive.lstCVarWH_Receive);
                if (checkException == null)
					pWhReceive.ID = objCVarWH_Receive.ID;
                else
                    _ReturnedMessage = checkException.Message;
            }
            #endregion Insert
            #region Update
            else //update
            {
                _UpdateClause = pWhReceive.WarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pWhReceive.WarehouseID) + " \n";
                _UpdateClause += pWhReceive.CustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pWhReceive.CustomerID) + " \n";
                _UpdateClause += pWhReceive.EquipmentID == 0 ? ",EquipmentID=null" : (",EquipmentID=" + pWhReceive.EquipmentID) + " \n";
                _UpdateClause += pWhReceive.ReceiveDate == "01/01/1900" ? " ,ReceiveDate = NULL " : (" ,ReceiveDate = '" + (DateTime.ParseExact(pWhReceive.ReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                _UpdateClause += pWhReceive.ReceiveDate == "01/01/1900" ? " ,ETD = NULL " : (" ,ETD = '" + (DateTime.ParseExact(pWhReceive.ReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'"); //pETD == "01/01/1900" ? " ,ETD = NULL " : (" ,ETD = '" + (DateTime.ParseExact(pETD + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                _UpdateClause += pWhReceive.ReceiveDate == "01/01/1900" ? " ,ETA = NULL " : (" ,ETA = '" + (DateTime.ParseExact(pWhReceive.ReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'"); //pETA == "01/01/1900" ? " ,ETA = NULL " : (" ,ETA = '" + (DateTime.ParseExact(pETA + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                _UpdateClause += pWhReceive.ReceiveDate == "01/01/1900" ? " ,ArrivalDate = NULL " : (" ,ArrivalDate = '" + (DateTime.ParseExact(pWhReceive.ReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'"); //pArrivalDate == "01/01/1900" ? " ,ArrivalDate = NULL " : (" ,ArrivalDate = '" + (DateTime.ParseExact(pArrivalDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                ////Set from the Finalize btn or when update details for putaway
                //_UpdateClause += pStatusID == 0 ? ",StatusID=null" : (",StatusID=" + pStatusID) + " \n";
                //_UpdateClause += " , IsFinalized = " + (pIsFinalized ? "1" : "0") + " \n";
                //_UpdateClause += pFinalizeDate == "01/01/1900" ? " ,FinalizeDate = NULL " : (" ,FinalizeDate = '" + (DateTime.ParseExact(pFinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                _UpdateClause += pWhReceive.Notes == "0" ? ",Notes=null" : (",Notes=N'" + pWhReceive.Notes + "'") + " \n";
                _UpdateClause += pWhReceive.ContainerNumber == "0" ? ",ContainerNumber=null" : (",ContainerNumber=N'" + pWhReceive.ContainerNumber + "'") + " \n";
                _UpdateClause += pWhReceive.PO == "0" ? ",PO=null" : (",PO=N'" + pWhReceive.PO + "'") + " \n";
                _UpdateClause += pWhReceive.MasterFile == "0" ? ",MasterFile=null" : (",MasterFile=N'" + pWhReceive.MasterFile + "'") + " \n";
                _UpdateClause += pWhReceive.Invoice == "0" ? ",Invoice=null" : (",Invoice=N'" + pWhReceive.Invoice + "'") + " \n";
                _UpdateClause += pWhReceive.ReceiveFrom == "0" ? ",ReceiveFrom=null" : (",ReceiveFrom=N'" + pWhReceive.ReceiveFrom + "'") + " \n";
                _UpdateClause += pWhReceive.Location == "0" ? ",Location=null" : (",Location=N'" + pWhReceive.Location + "'") + " \n";
                _UpdateClause += pWhReceive.Cards == "0" ? ",Cards=null" : (",Cards=N'" + pWhReceive.Cards + "'") + " \n";
                _UpdateClause += pWhReceive.Rep == "0" ? ",Rep=null" : (",Rep=N'" + pWhReceive.Rep + "'") + " \n";

                _UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                _UpdateClause += " , ModificationDate = GETDATE() ";
                _UpdateClause += " WHERE ID = " + pWhReceive.ID.ToString();

                checkException = objCWH_Receive.UpdateList(_UpdateClause);
                if (checkException == null)
                {
                    //i think done in details and not header
                    //TODO Update location if used or not used
                    //checkException = objCvwWH_ReceiveDetails.GetListPaging(99999, 1, "WHERE ReceiveID=" + objCVarWH_Receive.ID, "Code", out _RowCount);
                }
                else
                    _ReturnedMessage = checkException.Message;
            }
            #endregion Update
            if (_ReturnedMessage == "")
                checkException = objCvwWH_Receive.GetListPaging(1, 1, "WHERE ID=" + pWhReceive.ID.ToString(), "ID", out _RowCount);
            return new object[] {
                _ReturnedMessage
                , pWhReceive.ID //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[2]
                //, new JavaScriptSerializer().Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pReceiveIDs)
        {
            Exception checkException = new Exception();
            bool _result = false;
            CWH_Receive objCWH_Receive = new CWH_Receive();
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();        
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
            CWH_ReserveDetailsLocation objCWH_ReserveDetailsLocation = new CWH_ReserveDetailsLocation();
            //Delete from WH_Receive
            foreach (var currentID in pReceiveIDs.Split(','))
            {
                //Delete from WH_ReceiveDetails
                objCWH_ReceiveDetails.GetList("WHERE ReceiveID = " + currentID);
                var ReceiveDetailsIDs = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Select(x => x.ID).ToList();
                foreach (var currentReceiveDetailID in ReceiveDetailsIDs)
                {
                    //Delete from WH_ReceiveDetailsSerial
                    objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID = " + currentReceiveDetailID);
                    var ReceiveDetailsSerialIDs = objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Select(x => x.ID).ToList();
                    foreach (var currentReceiveDetailsSerialID in ReceiveDetailsSerialIDs)
                    {
                        objCWH_ReceiveDetailsSerial.lstDeletedCPKWH_ReceiveDetailsSerial.Add(new CPKWH_ReceiveDetailsSerial() { ID = currentReceiveDetailsSerialID });
                    }
                    checkException = objCWH_ReceiveDetailsSerial.DeleteItem(objCWH_ReceiveDetailsSerial.lstDeletedCPKWH_ReceiveDetailsSerial);

                    //Delete from WH_PickupDetailsLocation
                    objCWH_PickupDetailsLocation.GetList("WHERE ReceiveDetailsID = " + currentReceiveDetailID);
                    var PickupDetailsLocationIDs = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Select(x => x.ID).ToList();
                    foreach (var currentPickupDetailsLocationID in PickupDetailsLocationIDs)
                    {
                        objCWH_PickupDetailsLocation.lstDeletedCPKWH_PickupDetailsLocation.Add(new CPKWH_PickupDetailsLocation() { ID = currentPickupDetailsLocationID });
                    }
                    checkException = objCWH_PickupDetailsLocation.DeleteItem(objCWH_PickupDetailsLocation.lstDeletedCPKWH_PickupDetailsLocation);

                    //Delete from WH_ReserveDetailsLocation
                    objCWH_ReserveDetailsLocation.GetList("WHERE ReceiveDetailID = " + currentReceiveDetailID);
                    var ReserveDetailsLocationIDs = objCWH_ReserveDetailsLocation.lstCVarWH_ReserveDetailsLocation.Select(x => x.ID).ToList();
                    foreach (var currentReserveDetailsLocationID in ReserveDetailsLocationIDs)
                    {
                        objCWH_ReserveDetailsLocation.lstDeletedCPKWH_ReserveDetailsLocation.Add(new CPKWH_ReserveDetailsLocation() { ID = currentReserveDetailsLocationID });
                    }
                    checkException = objCWH_PickupDetailsLocation.DeleteItem(objCWH_PickupDetailsLocation.lstDeletedCPKWH_PickupDetailsLocation);

                    objCWH_ReceiveDetails.lstDeletedCPKWH_ReceiveDetails.Add(new CPKWH_ReceiveDetails() { ID = currentReceiveDetailID });
                }
                objCWH_Receive.lstDeletedCPKWH_Receive.Add(new CPKWH_Receive() { ID = Int64.Parse(currentID.Trim()) });
                checkException = objCWH_ReceiveDetails.DeleteItem(objCWH_ReceiveDetails.lstDeletedCPKWH_ReceiveDetails);
            }
            checkException = objCWH_Receive.DeleteItem(objCWH_Receive.lstDeletedCPKWH_Receive);
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
        public object[] Finalize(Int64 pFinalizedReceiveID)
        {
            CWH_Receive objCWH_Receive = new CWH_Receive();
            CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
            int constReceiveStatusFinalized = 30;
            string _ReturnedMessage = "";
            Exception checkException = null;
			checkException = objCWH_Receive.UpdateList($"IsFinalized=1, StatusID={constReceiveStatusFinalized},FinalizeDate=GETDATE(), FinalizeUserID={WebSecurity.CurrentUserId} WHERE ID=pFinalizedReceiveID");

			if (checkException == null)
            {
                //TODO: throw into operations
            }
            else
                _ReturnedMessage = checkException.Message;
            return new object[] {
                _ReturnedMessage
            };
        }

        [HttpGet, HttpPost]
        public object[] SetPutawayStatus(Int64 pReceiveIDToSet)
        {
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
            CWH_Receive objCWH_Receive = new CWH_Receive();
            int _RowCount = 0;
            int constReceiveStatusInProgress = 10;
            int constReceiveStatusPutaway = 20;
            //int constReceiveDetailsStatusPending = 10;
            //int constReceiveDetailsStatusPutaway = 40;
            Exception checkException = null;
            checkException = objCWH_ReceiveDetails.GetListPaging(99999, 1, "WHERE ReceiveID=" + pReceiveIDToSet.ToString(), "ID", out _RowCount);
            if (objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count == 0) //no details so InProgress
                objCWH_Receive.UpdateList("StatusID=" + constReceiveStatusInProgress + " WHERE ID=" + pReceiveIDToSet.ToString());
            else
            {
                checkException = objCWH_ReceiveDetails.GetListPaging(99999, 1, "WHERE ReceiveID=" + pReceiveIDToSet.ToString() + " AND LocationID IS NULL ", "ID", out _RowCount);
                if (objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count > 0)
                    objCWH_Receive.UpdateList("StatusID=" + constReceiveStatusInProgress + " WHERE ID=" + pReceiveIDToSet.ToString());

                else //if finalized then no save coz it will be disabled
                    objCWH_Receive.UpdateList("StatusID=" + constReceiveStatusPutaway + " WHERE ID=" + pReceiveIDToSet.ToString());
            }
            return new object[] {
            };
        }
        
        #endregion Receive
        #region ReceiveDetails
        [HttpGet, HttpPost]
        public object[] ReceiveDetails_LoadAll(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClauseReceiveDetails, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_ReceiveDetails objvwCWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            if (pIsLoadArrayOfObjects)
            {
            }
            checkException = objvwCWH_ReceiveDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseReceiveDetails, pOrderBy, out _RowCount);
            //var pDistinctReceives = objvwCWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
            //    .GroupBy(g => g.ReceiveID)
            //    .Select(s => new
            //    {
            //        ID = s.First().ID
            //        ,
            //        Code = s.First().ReceiveCode
            //    });
            return new object[] {
                //new JavaScriptSerializer().Serialize(pDistinctReceives.ToList())
                new JavaScriptSerializer().Serialize(objvwCWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public object[] ReceiveDetails_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClauseForPDI, string pOrderBy)
        {
            int _RowCount = 0;
            int _RowCount2 = 0;
            Exception checkException = null;
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CvwOperationsToRestoreInvoices objCOperations = new CvwOperationsToRestoreInvoices();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails_GetPurchaseItems = new CvwWH_ReceiveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails_GetCustomers = new CvwWH_ReceiveDetails();
            CPurchaseItem objCPurchaseItem_All = new CPurchaseItem();

            if (pIsLoadArrayOfObjects)
            {
                checkException = objCWH_Warehouse.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount2);
                checkException = objCPurchaseItem_All.GetListPaging(99999, 1, "WHERE IsVehicle=0 AND IsFlexi=0", "Code,Name", out _RowCount2);
                checkException = objCOperations.GetList("WHERE BLType <> 2 ORDER BY ID DESC");
                checkException = objCvwWH_ReceiveDetails_GetCustomers.GetListPaging(999999, 1, "WHERE Quantity>PickedQuantity AND IsFinalized=1", "ID", out _RowCount);
                checkException = objCvwWH_ReceiveDetails_GetPurchaseItems.GetListPaging(999999, 1, "WHERE isnull(OperationVehicleID,0)=0 AND (Quantity>PickedQuantity) AND IsFinalized=1", "ID", out _RowCount2);
            }
            var pCustomerList = objCvwWH_ReceiveDetails_GetCustomers.lstCVarvwWH_ReceiveDetails
                            .Select(s => new
                            {
                                ID = s.CustomerID
                                ,
                                Name = s.CustomerName
                            })
                            .Distinct().OrderBy(o => o.Name).ToList();
            var pPurchaseItemList = objCvwWH_ReceiveDetails_GetPurchaseItems.lstCVarvwWH_ReceiveDetails
                .Select(s => new
                {
                    ID = s.PurchaseItemID
                    ,
                    Code = s.PurchaseItemCode
                    ,
                    Name = s.PurchaseItemName
                })
                .Distinct().OrderBy(o => o.Code).ToList();
            var pPurchaseItem_AllList = objCPurchaseItem_All.lstCVarPurchaseItem
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.Code
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Code).ToList();
            var pOperationsList = objCOperations.lstCVarvwOperationsToRestoreInvoices
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.EffectiveOperationCode
                }).ToList();

            checkException = objCvwWH_ReceiveDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseForPDI, pOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[2]
                , serializer.Serialize(pPurchaseItemList) //pPurchaseItem=pData[3]
                , new JavaScriptSerializer().Serialize(pCustomerList) //pCustomer=pData[4]
                , new JavaScriptSerializer().Serialize(pOperationsList) //pOperation=pData[5]
                , serializer.Serialize(pPurchaseItem_AllList) //pPurchaseItem_All=pData[6]
            };
        }

        [HttpGet, HttpPost]
        public object[] ReceiveDetails_Export(Int32 pPageNumber, Int32 pPageSize, string pWhereClauseExportReceiveDetails, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_ReceiveDetails objvwCWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            checkException = objvwCWH_ReceiveDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseExportReceiveDetails, pOrderBy, out _RowCount);
            var pReceiveDetailsList = objvwCWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
                //.GroupBy(g => g.ReceiveID)
                .Select(s => new
                {
                    ReceiveCode = s.ReceiveCode
                    ,
                    ProductCode = s.PurchaseItemCode//s.First().PurchaseItemCode
                    ,
                    ProductName = s.PurchaseItemName
                    ,
                    PartNumber = s.PartNumber
                    ,
                    Quantity = s.Quantity
                    ,
                    AreaName = s.AreaName
                    ,
                    LocationCode = s.LocationCode
                    ,
                    PalletID = s.PalletID
                    ,
                    Status = s.StatusName
                    ,
                    ReceiveDate = s.ReceiveDate.ToShortDateString()
                    ,
                    Notes = s.Notes
                    
                    ,
                    BatchNumber = s.BatchNumber
                    ,
                    ExpirationDate = s.ExpirationDate.ToShortDateString()
                    ,
                    ImportedBy = s.ImportedBy
                    ,
                    WeightInTons = s.WeightInTons
                }).ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(pReceiveDetailsList)
            };
        }

        [HttpGet, HttpPost]
		public object[] ReceiveDetails_Save([FromBody]WhReceiveDetail pWhReceiveDetail)
		{
			Exception checkException = null;
			CVarWH_ReceiveDetails objCVarWH_ReceiveDetails = new CVarWH_ReceiveDetails();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			CWH_Receive objCWH_Receive = new CWH_Receive();
			CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
			CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
			int _RowCount = 0;

			#region Save
			objCVarWH_ReceiveDetails.ID = pWhReceiveDetail.ReceiveDetailsID;
			objCVarWH_ReceiveDetails.ReceiveID = pWhReceiveDetail.ReceiveID;
			objCVarWH_ReceiveDetails.BarCode = pWhReceiveDetail.BarCode;
			objCVarWH_ReceiveDetails.PurchaseItemID = pWhReceiveDetail.PurchaseItemID;
			objCVarWH_ReceiveDetails.Quantity = pWhReceiveDetail.ExpectedQuantity;
			objCVarWH_ReceiveDetails.ExpectedQuantity = pWhReceiveDetail.ExpectedQuantity;
			objCVarWH_ReceiveDetails.SplitQuantity = pWhReceiveDetail.SplitQuantity;
			objCVarWH_ReceiveDetails.LocationID = pWhReceiveDetail.LocationID;
			objCVarWH_ReceiveDetails.PalletID = pWhReceiveDetail.PalletID;
			objCVarWH_ReceiveDetails.Notes = pWhReceiveDetail.Notes;
			objCVarWH_ReceiveDetails.ReceiveDate = DateTime.ParseExact(pWhReceiveDetail.ReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			objCVarWH_ReceiveDetails.StatusID = pWhReceiveDetail.StatusID;
			objCVarWH_ReceiveDetails.ExpireDate = pWhReceiveDetail.ExpireDate;// DateTime.Parse(pExpireDate.ToString());
			objCVarWH_ReceiveDetails.LotNo = pWhReceiveDetail.LotNo;
			objCVarWH_ReceiveDetails.Extra1 = pWhReceiveDetail.Extra1;
			objCVarWH_ReceiveDetails.Extra2 = pWhReceiveDetail.Extra2;
			objCVarWH_ReceiveDetails.Extra3 = pWhReceiveDetail.Extra3;
			objCVarWH_ReceiveDetails.Extra4 = pWhReceiveDetail.Extra4;
			objCVarWH_ReceiveDetails.Extra5 = pWhReceiveDetail.Extra5;
			objCVarWH_ReceiveDetails.Extra6 = pWhReceiveDetail.Extra6;
			objCVarWH_ReceiveDetails.Extra7 = pWhReceiveDetail.Extra7;
			objCVarWH_ReceiveDetails.Extra8 = pWhReceiveDetail.Extra8;
			objCVarWH_ReceiveDetails.Extra9 = pWhReceiveDetail.Extra9;
			objCVarWH_ReceiveDetails.LocationCount = pWhReceiveDetail.LocationCount;
			if (pWhReceiveDetail.ReceiveDetailsID != 0) //update so save original creator & creation date
			{
				CWH_ReceiveDetails objCGetCreationInformation = new CWH_ReceiveDetails();
				objCGetCreationInformation.GetItem(pWhReceiveDetail.ReceiveDetailsID);

				objCVarWH_ReceiveDetails.IsPickupAddedToInvoice = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].IsPickupAddedToInvoice;
				objCVarWH_ReceiveDetails.PickupWithoutInvoiceDate = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].PickupWithoutInvoiceDate;

				objCVarWH_ReceiveDetails.IsExcluded = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].IsExcluded;
				objCVarWH_ReceiveDetails.OperationVehicleID = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].OperationVehicleID;
				objCVarWH_ReceiveDetails.CreatorUserID = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].CreatorUserID;
				objCVarWH_ReceiveDetails.CreationDate = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].CreationDate;
			}
			else //Insert
			{
				objCVarWH_ReceiveDetails.IsPickupAddedToInvoice = false;
				objCVarWH_ReceiveDetails.PickupWithoutInvoiceDate = DateTime.Parse("01/01/1900");

				objCVarWH_ReceiveDetails.IsExcluded = false;
				objCVarWH_ReceiveDetails.OperationVehicleID = 0;
				objCVarWH_ReceiveDetails.CreatorUserID = WebSecurity.CurrentUserId;
				objCVarWH_ReceiveDetails.CreationDate = DateTime.Now;
			}

			objCVarWH_ReceiveDetails.BatchNumber = pWhReceiveDetail.BatchNumber;
			objCVarWH_ReceiveDetails.ExpirationDate = DateTime.ParseExact(pWhReceiveDetail.ExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			objCVarWH_ReceiveDetails.ImportedBy = pWhReceiveDetail.ImportedBy;
			objCVarWH_ReceiveDetails.WeightInTons = pWhReceiveDetail.WeightInTons;
			objCVarWH_ReceiveDetails.PO = pWhReceiveDetail.PO;
			objCVarWH_ReceiveDetails.DetailFile = pWhReceiveDetail.File;
			objCVarWH_ReceiveDetails.Invoice = pWhReceiveDetail.Invoice;
			objCVarWH_ReceiveDetails.ContainerNumber = pWhReceiveDetail.ContainerNumber;

			objCVarWH_ReceiveDetails.ModificatorUserID = WebSecurity.CurrentUserId;
			objCVarWH_ReceiveDetails.ModificationDate = DateTime.Now;
			objCVarWH_ReceiveDetails.IsDefected = pWhReceiveDetail.IsDefected;
			objCVarWH_ReceiveDetails.DefectionReason = pWhReceiveDetail.DefectionReason;
			Common.Common.ReplaceNull(objCVarWH_ReceiveDetails);
			objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(objCVarWH_ReceiveDetails);
			checkException = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
			#endregion Save

			#region Set Locations IsUsed
			if (checkException == null)
			{
				checkException = objCWH_RowLocation.UpdateList("IsUsed=0 ,StatusID = 10 WHERE ID=" + pWhReceiveDetail.OldLocationID.ToString());
				checkException = objCWH_RowLocation.UpdateList("IsUsed=1 ,StatusID = 20 WHERE ID=" + pWhReceiveDetail.LocationID.ToString());
			}
			#endregion Set Locations IsUsed

			#region Set ReceiveStatus if needed
			SetPutawayStatus(pWhReceiveDetail.ReceiveID);
			#endregion Set ReceiveStatus if needed

			checkException = objCvwWH_Receive.GetList("WHERE ID=" + pWhReceiveDetail.ReceiveID.ToString());
			checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ReceiveID=" + pWhReceiveDetail.ReceiveID.ToString(), "ID", out _RowCount);
			return new object[] {
				checkException == null ? true : false
				, new JavaScriptSerializer().Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[2]
            };
		}

		[HttpGet, HttpPost]
        public object[] ReceiveDetails_ImportFromExcel([FromBody] InsertList insertList)
        {
            Exception checkException = null;
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
            var constReceiveDetailsStatusPending = 10;
            var constReceiveDetailsStatusPutAway = 40;
            int _RowCount = 0;
            string _ReturnedMessage = "";
            var _ArrBarCode = insertList.pBarCodeList.Split(',');
            var _ArrPurchaseItemCode = insertList.pPurchaseItemCodeList.Split(',');
            var _ArrQuantity = insertList.pQuantityList.Split(',');
            var _ArrPalletID = insertList.pPalletIDList.Split(',');
            var _ArrReceiveDate = insertList.pReceiveDateList.Split(',');
            var _ArrLocationCode = insertList.pLocationCodeList.Split(',');
            var _ArrNotes = insertList.pNotesList.Split(',');
            var _ArrSerial = insertList.pSerialList.Split(',');

            var _ArrBatchNumber = insertList.pBatchNumberList.Split(',');
            var _ArrExpirationDate = insertList.pExpirationDateList.Split(',');
            var _ArrImportedBy = insertList.pImportedByList.Split(',');
            var _ArrWeightInTons = insertList.pWeightInTonsList.Split(',');

            checkException = objCvwWH_Receive.GetList("WHERE ID=" + insertList.pReceiveID.ToString());
            int _WarehouseID = objCvwWH_Receive.lstCVarvwWH_Receive[0].WarehouseID;

            #region Save
            for (int i = 0; i < _ArrQuantity.Length && _ReturnedMessage == ""; i++)
            {
                objCPurchaseItem.GetListPaging(1, 1, "WHERE Code=N'" + _ArrPurchaseItemCode[i] + "'", "ID", out _RowCount);
                if (objCPurchaseItem.lstCVarPurchaseItem.Count == 0)
                    _ReturnedMessage = "Product '" + _ArrPurchaseItemCode[i] + "' is not found.";
                else if (_ArrQuantity[i] == "0")
                    _ReturnedMessage = "Product '" + _ArrPurchaseItemCode[i] + "' is having 0 quantity.";
                else
                {
                    CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
                    if (_ArrLocationCode[i] != "0")
                        checkException = objCvwWH_RowLocation.GetListPaging(1, 1, "WHERE Code=N'" + _ArrLocationCode[i] + "' AND WarehouseID=" + _WarehouseID, "ID", out _RowCount);
                    int _LocationID = objCvwWH_RowLocation.lstCVarvwWH_RowLocation.Count == 0 ? 0 : objCvwWH_RowLocation.lstCVarvwWH_RowLocation[0].ID;

                    CVarWH_ReceiveDetails objCVarWH_ReceiveDetails = new CVarWH_ReceiveDetails();
                    objCVarWH_ReceiveDetails.ID = 0;
                    objCVarWH_ReceiveDetails.ReceiveID = insertList.pReceiveID;
                    objCVarWH_ReceiveDetails.BarCode = _ArrBarCode[i];
                    objCVarWH_ReceiveDetails.PurchaseItemID = objCPurchaseItem.lstCVarPurchaseItem[0].ID;
                    objCVarWH_ReceiveDetails.Quantity = decimal.Parse(_ArrQuantity[i]);
                    objCVarWH_ReceiveDetails.ExpectedQuantity = decimal.Parse(_ArrQuantity[i]);
                    objCVarWH_ReceiveDetails.SplitQuantity = 0;
                    objCVarWH_ReceiveDetails.LocationID = _LocationID;
                    objCVarWH_ReceiveDetails.PalletID = _ArrPalletID[i];
                    objCVarWH_ReceiveDetails.Notes = _ArrNotes[i];
                    objCVarWH_ReceiveDetails.ReceiveDate = DateTime.ParseExact(_ArrReceiveDate[i] + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarWH_ReceiveDetails.StatusID = _LocationID == 0 ? constReceiveDetailsStatusPending : constReceiveDetailsStatusPutAway;
                    objCVarWH_ReceiveDetails.ExpireDate = DateTime.Parse("01/01/1900");//DateTime.Parse(pExpireDate.ToString());
                    objCVarWH_ReceiveDetails.LotNo = _ArrSerial[i];

                    objCVarWH_ReceiveDetails.BatchNumber = _ArrBatchNumber[i];
                    objCVarWH_ReceiveDetails.ExpirationDate = _ArrExpirationDate[i] == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(_ArrExpirationDate[i] + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarWH_ReceiveDetails.ImportedBy = _ArrImportedBy[i];
                    objCVarWH_ReceiveDetails.WeightInTons = decimal.Parse(_ArrWeightInTons[i]);
                    objCVarWH_ReceiveDetails.PO = "";
                    objCVarWH_ReceiveDetails.DetailFile = "";
                    objCVarWH_ReceiveDetails.Invoice = "";
                    objCVarWH_ReceiveDetails.ContainerNumber = "";

                    objCVarWH_ReceiveDetails.IsPickupAddedToInvoice = false;
                    objCVarWH_ReceiveDetails.PickupWithoutInvoiceDate = DateTime.Parse("01/01/1900");

                    objCVarWH_ReceiveDetails.IsExcluded = false;
                    objCVarWH_ReceiveDetails.OperationVehicleID = 0;
                    objCVarWH_ReceiveDetails.CreatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_ReceiveDetails.CreationDate = DateTime.Now;
                    objCVarWH_ReceiveDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_ReceiveDetails.ModificationDate = DateTime.Now;
                    objCVarWH_ReceiveDetails.IsDefected = false;
                    objCVarWH_ReceiveDetails.DefectionReason = "0";
					Common.Common.ReplaceNull(objCVarWH_ReceiveDetails);
                    objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(objCVarWH_ReceiveDetails);
                }
            } //for (int i = 0; i < _ArrQuantity.Count; i++)
            if (_ReturnedMessage == "")
                checkException = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
            if (checkException != null)
                _ReturnedMessage = checkException.Message;
            #endregion Save

            #region Set Locations IsUsed
            //if (checkException == null)
            //{
            //    checkException = objCWH_RowLocation.UpdateList("IsUsed=0 ,StatusID = 10 WHERE ID=" + pOldLocationID.ToString());
            //    checkException = objCWH_RowLocation.UpdateList("IsUsed=1 ,StatusID = 20 WHERE ID=" + pLocationID.ToString());
            //}
            #endregion Set Locations IsUsed

            #region Set ReceiveStatus if needed
            SetPutawayStatus(insertList.pReceiveID);
            #endregion Set ReceiveStatus if needed

            checkException = objCvwWH_Receive.GetList("WHERE ID=" + insertList.pReceiveID.ToString());
            checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ReceiveID=" + insertList.pReceiveID.ToString(), "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage
                , serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] ReceiveDetails_AddVehicle(Int64 pReceiveID, Int32 pWarehouseID, string pChassisNumber)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;

            var constReceiveDetailsStatusPending = 10;
            //var constReceiveDetailsStatusHeld = 20;
            //var constReceiveDetailsStatusDamaged = 30;
            //var constReceiveDetailsStatusPutaway = 40;

            CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
            CvwVehicleAction objCvwVehicleAction = new CvwVehicleAction();
            CVarWH_ReceiveDetails objCVarWH_ReceiveDetails = new CVarWH_ReceiveDetails();
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            string _WhereClause = "WHERE 1=1 ";
            _WhereClause += " AND ChassisNumber=N'" + pChassisNumber + "'" + " \n";
            _WhereClause += " AND ToWarehouseID=" + pWarehouseID + " \n";
            _WhereClause += " AND ChassisNumber NOT IN (SELECT ChassisNumber FROM vwWH_ReceiveDetails WHERE WarehouseID=" + pWarehouseID  + "  AND ChassisNumber IS NOT NULL AND IsFinalized=0)" + " \n";
            checkException = objCvwVehicleAction.GetListPaging(999999, 1, _WhereClause, "ID", out _RowCount);

            #region Save
            if (objCvwVehicleAction.lstCVarvwVehicleAction.Count > 0)
            {
                objCVarWH_ReceiveDetails.ID = 0;
                objCVarWH_ReceiveDetails.ReceiveID = pReceiveID;
                objCVarWH_ReceiveDetails.BarCode = "0";
                objCVarWH_ReceiveDetails.PurchaseItemID = objCvwVehicleAction.lstCVarvwVehicleAction[0].PurchaseItemID;
                objCVarWH_ReceiveDetails.Quantity = 1;
                objCVarWH_ReceiveDetails.ExpectedQuantity = 1;
                objCVarWH_ReceiveDetails.SplitQuantity = 0;
                objCVarWH_ReceiveDetails.LocationID = 0;
                objCVarWH_ReceiveDetails.PalletID = "0";
                objCVarWH_ReceiveDetails.Notes = "0";
                objCVarWH_ReceiveDetails.ReceiveDate = DateTime.Now; //DateTime.ParseExact(pReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_ReceiveDetails.StatusID = constReceiveDetailsStatusPending;
                objCVarWH_ReceiveDetails.ExpireDate = DateTime.Parse("01/01/1900");// DateTime.Parse(pExpireDate.ToString());
                objCVarWH_ReceiveDetails.LotNo = "0";
                objCVarWH_ReceiveDetails.IsExcluded = false;
                objCVarWH_ReceiveDetails.OperationVehicleID = objCvwVehicleAction.lstCVarvwVehicleAction[0].OperationVehicleID;
                objCVarWH_ReceiveDetails.PO = "";
                objCVarWH_ReceiveDetails.DetailFile = "";
                objCVarWH_ReceiveDetails.Invoice = "";
                objCVarWH_ReceiveDetails.ContainerNumber = "";

                objCVarWH_ReceiveDetails.IsPickupAddedToInvoice = false;
                objCVarWH_ReceiveDetails.PickupWithoutInvoiceDate = DateTime.Parse("01/01/1900");

                objCVarWH_ReceiveDetails.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_ReceiveDetails.CreationDate = DateTime.Now;
                objCVarWH_ReceiveDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_ReceiveDetails.ModificationDate = DateTime.Now;
                objCVarWH_ReceiveDetails.IsDefected = false;
                objCVarWH_ReceiveDetails.DefectionReason = "0";
				Common.Common.ReplaceNull(objCVarWH_ReceiveDetails);
				objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(objCVarWH_ReceiveDetails);
                checkException = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);

                //Ensure that ware house is as added
                CWH_Receive objCWH_Receive = new CWH_Receive();
                checkException = objCWH_Receive.UpdateList("WarehouseID=" + pWarehouseID + " WHERE ID=" + pReceiveID);
            }
            else
                _MessageReturned = "Check that item exists and sent to the warehouse.";
            #endregion Save

            #region Get Returned Data
            checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ReceiveID=" + pReceiveID, "ID", out _RowCount);
            #endregion Get Returned Data
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _MessageReturned
                , serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] ReceiveDetails_Delete([FromBody] DeleteList deleteList)
        {
            Exception checkException = null;
            bool _Result = true;
            int _RowCount = 0;
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
            COperationVehicle objCOperationVehicle = new COperationVehicle();
            int _NumberOfRecords = deleteList.pReceiveDetailsIDsToDelete.Split(',').Length;
            for (int i = 0; i < _NumberOfRecords; i++)
            {
                Int64 _ReceiveDetailsID = Int64.Parse(deleteList.pReceiveDetailsIDsToDelete.Split(',')[i]);
                objCWH_ReceiveDetails.GetItem(_ReceiveDetailsID);
                checkException = objCOperationVehicle.UpdateList("IsSentToWarehouse=0 WHERE ID=" + objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].OperationVehicleID);
                int _LocationID = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].LocationID;
                checkException = objCWH_ReceiveDetails.DeleteList("WHERE ID=" + _ReceiveDetailsID.ToString());
                if (checkException == null)
                    objCWH_RowLocation.UpdateList("IsUsed=0,StatusID = 10 WHERE ID=" + _LocationID.ToString());
                else
                    _Result = false;
            }
            SetPutawayStatus(deleteList.pReceiveID);
            objCvwWH_ReceiveDetails.GetListPaging(99999, 1, "WHERE ReceiveID=" + deleteList.pReceiveID, "ID", out _RowCount);
            objCvwWH_Receive.GetList("WHERE ID=" + deleteList.pReceiveID.ToString());
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _Result
                , serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[2]
            };
        }
        
        #endregion ReceiveDetails
        #region ReceiveDetailsSerial
        [HttpGet, HttpPost]
        public object[] ReceiveDetailsSerial_LoadAll(string pWhereClauseReceiveDetailsSerial)
        {
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            objCWH_ReceiveDetailsSerial.GetList(pWhereClauseReceiveDetailsSerial);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
            };
        }
        [HttpGet, HttpPost]
        public object[] ReceiveDetailsSerial_GenerateSerial(Int64 pReceiveDetailsIDForSerialGenerate, Int32 pQuantity)
        {
            Exception checkException = null;
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            checkException = objCWH_ReceiveDetailsSerial.DeleteList("WHERE ReceiveDetailsID=" + pReceiveDetailsIDForSerialGenerate);
            for (int i = 0; i < pQuantity; i++)
            {
                CVarWH_ReceiveDetailsSerial objCVarWH_ReceiveDetailsSerial = new CVarWH_ReceiveDetailsSerial();
                objCVarWH_ReceiveDetailsSerial.ReceiveDetailsID = pReceiveDetailsIDForSerialGenerate;
                objCVarWH_ReceiveDetailsSerial.Serial = (i + 1).ToString();
                objCVarWH_ReceiveDetailsSerial.PickupDetailsLocationID = 0;
                objCVarWH_ReceiveDetailsSerial.LotNumber = "0";
                objCVarWH_ReceiveDetailsSerial.Notes = "0";
                objCVarWH_ReceiveDetailsSerial.ReserveDetailsLocationID = 0;
				Common.Common.ReplaceNull(objCVarWH_ReceiveDetailsSerial);
				objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Add(objCVarWH_ReceiveDetailsSerial);
            }
            checkException = objCWH_ReceiveDetailsSerial.SaveMethod(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial);
            objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID=" + pReceiveDetailsIDForSerialGenerate + " ORDER BY Serial");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
            };
        }
        [HttpGet, HttpPost]
        public object[] ReceiveDetailsSerial_Save([FromBody] ReceiveDetailsSerial_SaveParameters receiveDetailsSerial_SaveParameters)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial_db = new CWH_ReceiveDetailsSerial();
			objCWH_ReceiveDetailsSerial_db.GetList($"where ID in ({receiveDetailsSerial_SaveParameters.pSelectedIDsToSave})");
			CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            var _ArrID = receiveDetailsSerial_SaveParameters.pSelectedIDsToSave.Split(',');
            var _ArrIsInsert = receiveDetailsSerial_SaveParameters.pIsInsertList.Split(',');
            var _ArrSerialList = receiveDetailsSerial_SaveParameters.pSerialList.Split(',');
            var _ArrPickupDetailsLocationIDList = receiveDetailsSerial_SaveParameters.pPickupDetailsLocationIDList.Split(',');
            var _ArrVehicleList = receiveDetailsSerial_SaveParameters.pVehicleList.Split(',');
            var _ArrMotorNoList = receiveDetailsSerial_SaveParameters.pMotorNoList.Split(',');
            int _NumberOfRecords = _ArrID.Length;
            for (int i = 0; i < _NumberOfRecords; i++)
            {
                //if (_ArrSerialList[i] != "0")
                if ((receiveDetailsSerial_SaveParameters.pFlag == "ReceiveDetailsSerial_FillModal" && _ArrSerialList[i] != "0") ||
                    (receiveDetailsSerial_SaveParameters.pFlag == "ReceiveDetailsVehicle_FillModal" && (_ArrVehicleList[i] != "0" || _ArrMotorNoList[i] != "0")))
                {
                    CVarWH_ReceiveDetailsSerial objCVarWH_ReceiveDetailsSerial = new CVarWH_ReceiveDetailsSerial();
                    objCVarWH_ReceiveDetailsSerial.ID = _ArrIsInsert[i] == "1" ? 0 : Int64.Parse(_ArrID[i]);
                    objCVarWH_ReceiveDetailsSerial.ReceiveDetailsID = receiveDetailsSerial_SaveParameters.pReceiveDetailsID;
                    objCVarWH_ReceiveDetailsSerial.Serial = _ArrSerialList[i];
                    objCVarWH_ReceiveDetailsSerial.PickupDetailsLocationID = Int64.Parse(_ArrPickupDetailsLocationIDList[i]);
                    objCVarWH_ReceiveDetailsSerial.Notes = "0";
                    objCVarWH_ReceiveDetailsSerial.Vehicle = _ArrVehicleList[i];
                    objCVarWH_ReceiveDetailsSerial.MotorNo = _ArrMotorNoList[i];
                    objCVarWH_ReceiveDetailsSerial.LotNumber = "0";
                    objCVarWH_ReceiveDetailsSerial.ReserveDetailsLocationID = 0;
					if(objCVarWH_ReceiveDetailsSerial.ID>0)
					{
						objCVarWH_ReceiveDetailsSerial.ModificatorUserID = WebSecurity.CurrentUserId;
						objCVarWH_ReceiveDetailsSerial.ModificationDate = DateTime.Now;
						objCVarWH_ReceiveDetailsSerial.CreatorUserID = objCWH_ReceiveDetailsSerial_db.lstCVarWH_ReceiveDetailsSerial.Find(a=>a.ID== objCVarWH_ReceiveDetailsSerial.ID).CreatorUserID;
						objCVarWH_ReceiveDetailsSerial.CreationDate = objCWH_ReceiveDetailsSerial_db.lstCVarWH_ReceiveDetailsSerial.Find(a=>a.ID== objCVarWH_ReceiveDetailsSerial.ID).CreationDate;
					}
					else
					{
						objCVarWH_ReceiveDetailsSerial.CreatorUserID = WebSecurity.CurrentUserId;
						objCVarWH_ReceiveDetailsSerial.CreationDate = DateTime.Now;
						objCVarWH_ReceiveDetailsSerial.ModificatorUserID = WebSecurity.CurrentUserId;
						objCVarWH_ReceiveDetailsSerial.ModificationDate = DateTime.Now;
					}
					Common.Common.ReplaceNull(objCVarWH_ReceiveDetailsSerial);
					objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Add(objCVarWH_ReceiveDetailsSerial);
                }
            }
            checkException = objCWH_ReceiveDetailsSerial.SaveMethod(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial);
            //if (checkException != null)
            //    _MessageReturned = checkException.Message;
            if (checkException != null)
                if (checkException.ToString().Contains("unique") == true)
                    _MessageReturned = receiveDetailsSerial_SaveParameters.pFlag == "ReceiveDetailsSerial_FillModal" ? "Serial is duplicated" :
                        receiveDetailsSerial_SaveParameters.pFlag == "ReceiveDetailsVehicle_FillModal" ? " Vehicle and Mottor No are duplicated " :
                        "Please revise data";
                else
                    _MessageReturned = checkException.Message;
            return new object[] {
                _MessageReturned
            };
        }
        //[HttpGet, HttpPost]
        //public object[] ReceiveDetailsSerial_SaveFromPickup([FromBody] ReceiveDetailsSerial_SaveParametersFromPickup receiveDetailsSerial_SaveParameters)
        //{
        //    string _RejectedSerials = "";
        //    string _MessageReturned = "";
        //    Exception checkException = null;
        //    CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
        //    var _ArrSerialList = receiveDetailsSerial_SaveParameters.pSerialList.Split(',');
        //    Int64 _ReceiveDetailsID = receiveDetailsSerial_SaveParameters.pReceiveDetailsID;
        //    Int64 _PickupDetailsLocationID = receiveDetailsSerial_SaveParameters.pPickupDetailsLocationID;
        //    int _NumberOfRecords = _ArrSerialList.Length;
        //    for (int i = 0; i < _NumberOfRecords; i++)
        //    {
        //        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial_Temp = new CWH_ReceiveDetailsSerial();
        //        objCWH_ReceiveDetailsSerial_Temp.GetList("WHERE ReceiveDetailsID=" + _ReceiveDetailsID + " AND Serial=" + _ArrSerialList[i]);
        //        if (objCWH_ReceiveDetailsSerial_Temp.lstCVarWH_ReceiveDetailsSerial.Count == 1)
        //            checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID=" + _PickupDetailsLocationID + " WHERE ReceiveDetailsID=" + _ReceiveDetailsID + " AND Serial=" + _ArrSerialList[i]);
        //        else
        //            _RejectedSerials += _RejectedSerials == "" ? _ArrSerialList[i] : (", " + _ArrSerialList[i]);
        //    }
        //    _MessageReturned = _RejectedSerials == "" ? "" : ("Serials: " + _RejectedSerials + " rejected.");
        //    return new object[] {
        //        _MessageReturned
        //    };
        //}
        [HttpGet, HttpPost]
        public object[] ReceiveDetailsSerial_DeleteList([FromBody] DeleteList_ReceiveDetailsSerial deleteList_ReceiveDetailsSerial)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            checkException = objCWH_ReceiveDetailsSerial.DeleteList("WHERE ID IN (" + deleteList_ReceiveDetailsSerial.pReceiveDetailsSerialIDsDeleted + ")");
            
            //objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID=" + pReceiveDetailsID);
            if (deleteList_ReceiveDetailsSerial.pFlag == "ReceiveDetailsSerial_FillModal")
                objCWH_ReceiveDetailsSerial.GetList("WHERE  Serial is not null and ReceiveDetailsID=" + deleteList_ReceiveDetailsSerial.pReceiveDetailsID);
            else if (deleteList_ReceiveDetailsSerial.pFlag == "ReceiveDetailsVehicle_FillModal")
                objCWH_ReceiveDetailsSerial.GetList("WHERE  Vehicle is not null and ReceiveDetailsID=" + deleteList_ReceiveDetailsSerial.pReceiveDetailsID);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue};
            return new object[] {
                _MessageReturned
                , serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
            };
        }
        [HttpGet, HttpPost]
        public object[] ReceiveDetailsSerial_DeleteFromPickup([FromBody]DeleteList_ReceiveDetailsSerialFromPickup deleteList_ReceiveDetailsSerialFromPickup) {
            string _MessageReturned = "";
            Exception checkException = null;
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID=NULL WHERE ID IN (" + deleteList_ReceiveDetailsSerialFromPickup.pReceiveDetailsSerialIDsDeletedFromPickup + ") AND PickupDetailsLocationID=" + deleteList_ReceiveDetailsSerialFromPickup.pPickupDetailsLocationID);
            objCWH_ReceiveDetailsSerial.GetList("WHERE PickupDetailsLocationID=" + deleteList_ReceiveDetailsSerialFromPickup.pPickupDetailsLocationID);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue};
            return new object[] {
                _MessageReturned
                , serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
            };
        }
        #endregion ReceiveDetailsSerial
        #region UploadExcel
        [HttpGet, HttpPost]
        public object UploadExcel()
        {
            int ResultCode = 1;
            long pID = 0;
            bool AllExcelRowsAreValid = true;
            List<string> MissingFields = new List<string>();
            List<string> MissingForeignKeys = new List<string>();
            long.TryParse(HttpContext.Current.Request.Form[0],out pID);
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
                        CvwWH_ReceiveLocations objCvwWH_ReceiveLocations = new CvwWH_ReceiveLocations();
                        objCvwWH_ReceiveLocations.GetList($" WHERE ReceiveID = {pID}");
                        CPurchaseItem objCPurchaseItem = new CPurchaseItem();
                        objCPurchaseItem.GetList(" WHERE 1=1");
                        CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
                        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
                        List<ReceiveDetailsExcelRow> ExcelRowsToBeInserted = new List<ReceiveDetailsExcelRow>();
                        int count = 1;
                        foreach (DataRow row in result.Tables[0].Rows)
                        {
                            ReceiveDetailsExcelRow receiveDetailsExcelRow = new ReceiveDetailsExcelRow
                            {
                                pIndex = count,
                                pPurchaseItemID = 0,
                                pBarCode = row["Barcode"] == DBNull.Value ? "" : Convert.ToString(row["Barcode"]),
                                pPartNumber = row["Part Number"] == DBNull.Value ? "" : Convert.ToString(row["Part Number"]),
                                pQuantity = row["Quantity"] == DBNull.Value ? 0 : Convert.ToInt32(row["Quantity"]),
                                pSerialNumber = row["Serial Number"] == DBNull.Value ? "" : Convert.ToString(row["Serial Number"]),
                                pAreaName = row["Area Name"] == DBNull.Value ? "" : Convert.ToString(row["Area Name"]),
                                pLocationID = 0,
                                pLocationCode = row["Location Code"] == DBNull.Value ? "" : Convert.ToString(row["Location Code"]),
                                pReceiveDate = row["Receive Date"] == DBNull.Value ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(row["Receive Date"].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture),
                                pPalletID = row["PalletID"] == DBNull.Value ? "" : Convert.ToString(row["PalletID"]),
                                pNotes = row["Notes"] == DBNull.Value ? "" : Convert.ToString(row["Notes"]),
                                pPO = row["P.O"] == DBNull.Value ? "" : Convert.ToString(row["P.O"]),
                                pFile = row["File"] == DBNull.Value ? "" : Convert.ToString(row["File"]),
                                pInvoice = row["Invoice"] == DBNull.Value ? "" : Convert.ToString(row["Invoice"]),
                                pBatchNo = row["Batch No"] == DBNull.Value ? "" : Convert.ToString(row["Batch No"]),
                                pWeight = row["Weight"] == DBNull.Value ? 0m : Convert.ToDecimal(row["Weight"]),
                                pExpiryDate = row["Expiry Date"] == DBNull.Value ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(row["Expiry Date"].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture),
                                pContainerNumber = row["Container Number"] == DBNull.Value ? "" : Convert.ToString(row["Container Number"]),
								pExtra1 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra1"]),
								pExtra2 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra2"]),
								pExtra3 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra3"]),
								pExtra4 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra4"]),
								pExtra5 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra5"]),
								pExtra6 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra6"]),
								pExtra7 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra7"]),
								pExtra8 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra8"]),
								pExtra9 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra9"]),
                            };
                            count++;

                            var ValidationCheck = CheckExcelRowValidation(receiveDetailsExcelRow, objCvwWH_ReceiveLocations, objCPurchaseItem) as ReturnedObjectAfterValidation;
                            ExcelRowsToBeInserted.Add(receiveDetailsExcelRow);
                            receiveDetailsExcelRow.pPurchaseItemID = ValidationCheck.PurchaseItemID;
                            receiveDetailsExcelRow.pLocationID = ValidationCheck.LocationID;
                            if(ValidationCheck.MissingFields != "")
                                MissingFields.Add(ValidationCheck.MissingFields);
                            if (ValidationCheck.MissingForeignKeys != "")
                                MissingForeignKeys.Add(ValidationCheck.MissingForeignKeys);
                            if (!ValidationCheck.IsValid)
                            {
                                AllExcelRowsAreValid = false;
                                break;
                            }
                        }
                        if (AllExcelRowsAreValid)
                        {
                            foreach (ReceiveDetailsExcelRow row in ExcelRowsToBeInserted)
                            {
								var rd = new Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails
								{
									ReceiveID = pID,
									BarCode = row.pBarCode,
									PurchaseItemID = row.pPurchaseItemID,
									Quantity = row.pQuantity,
									ExpectedQuantity = row.pQuantity,
									SplitQuantity = 0,
									LocationID = row.pLocationID,
									PalletID = row.pPalletID,
									ReceiveDate = row.pReceiveDate,
									StatusID = 10,
									CreatorUserID = WebSecurity.CurrentUserId,
									CreationDate = DateTime.Now,
									ModificatorUserID = WebSecurity.CurrentUserId,
									ModificationDate = DateTime.Now,
									IsExcluded = false,
									LotNo = "",
									ExpireDate = row.pExpiryDate,
									OperationVehicleID = 0,
									VehicleActionID = 0,
									IsPickupAddedToInvoice = false,
									PickupWithoutInvoiceDate = DateTime.Parse("01/01/1900"),
									Notes = row.pNotes,
									BatchNumber = row.pBatchNo,
									ExpirationDate = row.pExpiryDate,
									ImportedBy = "",
									WeightInTons = row.pWeight,
									PO = row.pPO,
									DetailFile = row.pFile,
									Invoice = row.pInvoice,
									IsDefected = false,
									DefectionReason = "0",
									ContainerNumber = row.pContainerNumber,
									Extra1 = row.pExtra1,
									Extra2 = row.pExtra2,
									Extra3 = row.pExtra3,
									Extra4 = row.pExtra4,
									Extra5 = row.pExtra5,
									Extra6 = row.pExtra6,
									Extra7 = row.pExtra7,
									Extra8 = row.pExtra8,
									Extra9 = row.pExtra9,
								};
								Common.Common.ReplaceNull(rd);
								objCWH_ReceiveDetails.SaveMethod(new List<Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails>{rd});

                                //Getting inserted receive detail ID
                                objCWH_ReceiveDetails.GetList(" WHERE ID = (SELECT MAX(ID)ID FROM WH_ReceiveDetails)");
                                int ReceiveDetailID = (int)objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ID;
                                //SerialNumber
                                if(row.pQuantity ==1 && row.pSerialNumber != "")
                                {
									var rds = new CVarWH_ReceiveDetailsSerial
									{
										ReceiveDetailsID = ReceiveDetailID,
										Serial = row.pSerialNumber,
										PickupDetailsLocationID = 0,
										Notes = "",
										Vehicle = "",
										MotorNo = "",
										LotNumber = "",
										ReserveDetailsLocationID = 0
									};
									Common.Common.ReplaceNull(rds);

									objCWH_ReceiveDetailsSerial.SaveMethod(new List<CVarWH_ReceiveDetailsSerial> { rds });
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
                MissingFields = MissingFields.Count > 0 ? string.Join(",",MissingFields) : "",
                MissingForeignKeys = MissingForeignKeys.Count > 0 ? string.Join(",",MissingForeignKeys) : "",
                exception
            };
        }

        private object CheckExcelRowValidation(ReceiveDetailsExcelRow row, CvwWH_ReceiveLocations ReceiveLocations, CPurchaseItem PurchaseItems)
        {
            List<string> MissingFields = new List<string>();
            List<string> MissingForeignKeys = new List<string>();   //for Area and locationID if they were provided wrong in excel
            ReturnedObjectAfterValidation obj = new ReturnedObjectAfterValidation();

            //Mandatory fields check (PartNumber,Quantity)
            if (row.pPartNumber == "" || PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.PartNumber == row.pPartNumber)?.ID == null)
            {
                MissingFields.Add("PartNumber");
                obj.IsValid = false;
            }
            else 
                obj.PurchaseItemID = (int)PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.PartNumber == row.pPartNumber)?.ID;

            if (row.pQuantity <= 0)
            {
                MissingFields.Add("Quantity");
                obj.IsValid = false;
            }
            else if (row.pQuantity > 1 && row.pSerialNumber != "")
            {
                try
                {
                    throw new ArgumentException("Item with a serial should have Quantity=1");
                }catch(ArgumentException Ex)
                {
                    throw;
                }
            }

            

            //Foreign Keys check (LocationCode)
            if (ReceiveLocations.lstCVarvwWH_ReceiveLocations.FirstOrDefault(x => x.LocationCode == row.pLocationCode)?.LocationID != null)
            {
                obj.LocationID = (int)ReceiveLocations.lstCVarvwWH_ReceiveLocations
                    .FirstOrDefault(x => x.LocationCode == row.pLocationCode)
                    .LocationID;
            }
            else
                MissingForeignKeys.Add("LocationCode");

            obj.MissingFields = MissingFields.Count == 0 ? "" : $"Row {row.pIndex} missing {string.Join(",", MissingFields)}";
            obj.MissingForeignKeys = MissingForeignKeys.Count == 0 ? "" : $"Row {row.pIndex} missing {string.Join(",", MissingForeignKeys)}";

            return obj;
        }

        class ReturnedObjectAfterValidation
        {
            public bool IsValid { get; set; } = true;
            public string MissingFields { get; set; } = "";
            public string MissingForeignKeys { get; set; } = "";
            public int PurchaseItemID { get; set; } = 0;
            public int LocationID { get; set; } = 0;
        }
        class ReceiveDetailsExcelRow
        {
            public int pIndex { get; set; }
            public string pBarCode { get; set; }
            public int pPurchaseItemID { get; set; }
            public string pPartNumber { get; set; }
            public int pQuantity { get; set; }
            public string pSerialNumber { get; set; }
            public string pAreaName { get; set; }
            public int pLocationID { get; set; }
            public string pLocationCode { get; set; }
            public DateTime pReceiveDate { get; set; }
            public string pPalletID { get; set; }
            public string pNotes { get; set; }
            public string pPO { get; set; }
            public string pFile { get; set; }
            public string pInvoice { get; set; }
            public string pBatchNo { get; set; }
            public decimal pWeight { get; set; }
            public DateTime pExpiryDate { get; set; }
            public string pContainerNumber { get; set; }
            public string pExtra1 { get; set; }
            public string pExtra2 { get; set; }
            public string pExtra3 { get; set; }
            public string pExtra4 { get; set; }
            public string pExtra5 { get; set; }
            public string pExtra6 { get; set; }
            public string pExtra7 { get; set; }
            public string pExtra8 { get; set; }
            public string pExtra9 { get; set; }
        }
        #endregion

        #region GeneratePickup
        public object[] GeneratePickup([FromBody] GeneratePickupDTO GeneratePickupDTO)
        {
            var checkException = new Exception();
            var ExceptionMessage = "";
            long PickupID;
            long PickupDetailsID;
            long PickupDetailsLocationID;
            CWH_Receive objCWH_Receive = new CWH_Receive();
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
            CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();

            checkException = objCWH_Receive.GetItem(GeneratePickupDTO.PickupID);
            var Receive = objCWH_Receive.lstCVarWH_Receive[0];
            checkException = objCWH_ReceiveDetails.GetList("WHERE ReceiveID = " + GeneratePickupDTO.PickupID);
            var ReceiveDetails = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails;
            checkException = objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID IN (SELECT ID FROM WH_ReceiveDetails WHERE ReceiveID = " + GeneratePickupDTO.PickupID + ") ");

            //insert into WH_Pickup
            List<CVarWH_Pickup> PickupList = new List<CVarWH_Pickup>();
            CVarWH_Pickup objCVarWH_Pickup = new CVarWH_Pickup();
            objCVarWH_Pickup.WarehouseID = Receive.WarehouseID;
            objCVarWH_Pickup.CustomerID = Receive.CustomerID;
            objCVarWH_Pickup.BillTo = Receive.CustomerID;
            objCVarWH_Pickup.OrderDate = DateTime.Now.AddDays(1);
            objCVarWH_Pickup.RequiredDate = DateTime.Now;
            objCVarWH_Pickup.CreationDate = DateTime.Now;
            objCVarWH_Pickup.CreatorUserID = WebSecurity.CurrentUserId;
            Common.Common.ReplaceNull(objCVarWH_Pickup);
            PickupList.Add(objCVarWH_Pickup);
            checkException = objCWH_Pickup.SaveMethod(PickupList);

            //Getting inserted PickupID
            checkException = objCWH_Pickup.GetList("WHERE ID = (SELECT MAX(ID) FROM WH_Pickup)");
            PickupID = objCWH_Pickup.lstCVarWH_Pickup[0].ID;


            //insert into WH_PickupDetails
            foreach (var ReceiveDetail in ReceiveDetails)
            {
                checkException = objCWH_PickupDetails.GetList("WHERE PickupID = " + PickupID + " AND PurchaseItemID = " + ReceiveDetail.PurchaseItemID);
                var PickupDetails = objCWH_PickupDetails.lstCVarWH_PickupDetails;
                if (PickupDetails.Count == 0)
                {
                    List<CVarWH_PickupDetails> PickupDetailsList = new List<CVarWH_PickupDetails>();
                    CVarWH_PickupDetails objCVarWH_PickupDetails = new CVarWH_PickupDetails();
                    objCVarWH_PickupDetails.PickupID = PickupID;
                    objCVarWH_PickupDetails.PurchaseItemID = ReceiveDetail.PurchaseItemID;
                    objCVarWH_PickupDetails.CreationDate = DateTime.Now;
                    objCVarWH_PickupDetails.CreatorUserID = WebSecurity.CurrentUserId;
                    Common.Common.ReplaceNull(objCVarWH_PickupDetails);
                    PickupDetailsList.Add(objCVarWH_PickupDetails);
                    checkException = objCWH_PickupDetails.SaveMethod(PickupDetailsList);

                    //Getting inserted PickupID
                    checkException = objCWH_PickupDetails.GetList("WHERE ID = (SELECT MAX(ID) FROM WH_PickupDetails)");
                    PickupDetailsID = objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID;
                }
                else
                {
                    PickupDetailsID = PickupDetails[0].ID;
                }

                //insert into WH_PickupDetailsLocation
                checkException = objCWH_PickupDetailsLocation.GetList("WHERE PickupDetailsID = " + PickupDetailsID + " AND ReceiveDetailsID = " + ReceiveDetail.ID);
                var PickupDetailsLocation = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation;
                if(PickupDetailsLocation.Count == 0)
                {
                    //insert
                    List<CVarWH_PickupDetailsLocation> PickupDetailsLocationList = new List<CVarWH_PickupDetailsLocation>();
                    CVarWH_PickupDetailsLocation objCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
                    objCVarWH_PickupDetailsLocation.PickupDetailsID = PickupDetailsID;
                    objCVarWH_PickupDetailsLocation.ReceiveDetailsID = ReceiveDetail.ID;
                    objCVarWH_PickupDetailsLocation.PickedQuantity = ReceiveDetail.Quantity;
                    objCVarWH_PickupDetailsLocation.CreationDate = DateTime.Now;
                    objCVarWH_PickupDetailsLocation.CreatorUserID = WebSecurity.CurrentUserId;
                    Common.Common.ReplaceNull(objCVarWH_PickupDetailsLocation);
                    PickupDetailsLocationList.Add(objCVarWH_PickupDetailsLocation);
                    checkException = objCWH_PickupDetailsLocation.SaveMethod(PickupDetailsLocationList);

                    //Getting inserted PickupDetailsLocationID
                    checkException = objCWH_PickupDetailsLocation.GetList("WHERE ID = (SELECT MAX(ID) FROM WH_PickupDetailsLocation)");
                    PickupDetailsLocationID = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ID;
                }
                else
                {
                    //Update
                    checkException = objCWH_PickupDetailsLocation.UpdateList("PickedQuantity = " + (PickupDetailsLocation[0].PickedQuantity + ReceiveDetail.Quantity) + " WHERE ID = " + PickupDetailsLocation[0].ID);
                    PickupDetailsLocationID = PickupDetailsLocation[0].ID;
                }

                //Update WH_ReceiveDetailsSerial
                checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID = " + PickupDetailsLocationID + " WHERE ReceiveDetailsID = " + ReceiveDetail.ID);
            }
            if(checkException != null)
            {
                ExceptionMessage = checkException.Message;
            }
            return new object[]
            {
                objCWH_Pickup.lstCVarWH_Pickup[0].Code,
                ExceptionMessage
            };
        }
        #endregion
    }

    public class GeneratePickupDTO
    {
        public int PickupID { get; set; }
    }
    public class ReceiveDetailsSerial_SaveParameters
    {
        public int pReceiveID { get; set; }
        public long pReceiveDetailsID { get; set; }
        public string pSelectedIDsToSave { get; set; }
        public string pIsInsertList { get; set; }
        public string pSerialList { get; set; }
        public string pPickupDetailsLocationIDList { get; set; }
        public string pVehicleList { get; set; }
        public string pMotorNoList { get; set; }
        public string pLotNoList { get; set; }
        public string pExpireDateList { get; set; }
        public string pFlag { get; set; }
    }
    public class InsertList
    {
        public Int64 pReceiveID { get; set; }
        public string pBarCodeList { get; set; }
        public string pPurchaseItemCodeList { get; set; }
        public string pQuantityList { get; set; }
        public string pPalletIDList { get; set; }
        public string pReceiveDateList { get; set; }
        public string pLocationCodeList { get; set; }
        public string pNotesList { get; set; }
        public string pSerialList { get; set; }

        public string pBatchNumberList { get; set; }
        public string pExpirationDateList { get; set; }
        public string pImportedByList { get; set; }
        public string pWeightInTonsList { get; set; }
    }
    public class DeleteList
    {
        public string pReceiveDetailsIDsToDelete { get; set; }
        public Int64 pReceiveID { get; set; }
		//
		public bool IsSplitLine { get; set; }
		public decimal UpdateLineQty { get; set; }
		public int UpdateLineID { get; set; }
	}
    public class DeleteList_ReceiveDetailsSerial
    {
        public string pReceiveDetailsSerialIDsDeleted { get; set; }
        public Int64 pReceiveDetailsID { get; set; }
        public string pFlag { get; set; }
    }
    public class DeleteList_ReceiveDetailsSerialFromPickup
    {
        public string pReceiveDetailsSerialIDsDeletedFromPickup { get; set; }
        public Int64 pPickupDetailsLocationID { get; set; }
    }
    //public class ReceiveDetailsSerial_SaveParametersFromPickup
    //{
    //    public Int64 pPickupDetailsLocationID { get; set; }
    //    public Int64 pReceiveDetailsID { get; set; }
    //    public string pSerialList { get; set; }
    //}
}
