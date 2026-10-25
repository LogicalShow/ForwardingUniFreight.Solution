using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
    public class TransferProductsController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CWH_Area objCWH_Area = new CWH_Area();
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCWH_Warehouse.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCWH_Area.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            }

            checkException = objCvwWH_ReceiveDetails.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            //var pCustomerList = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
            //    .Select(s => new
            //    {
            //        ID = s.CustomerID
            //        ,
            //        Name = s.CustomerName
            //    })
            //    .Distinct().OrderBy(o => o.Name).ToList();


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails)
                , _RowCount
                , serializer.Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[2]
                , serializer.Serialize(objCWH_Area.lstCVarWH_Area) //pArea=pData[3]
                //, serializer.Serialize(pCustomerList) //pCustomerList=pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int64 pHeaderID)
        {
            CDefaults objCDefaults = new CDefaults();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CvwWH_RowLocationWithMinimalColumns ObjCLocation = new CvwWH_RowLocationWithMinimalColumns();
            CWH_Area objCWH_Area = new CWH_Area();
            int _RowCount = 0;
            Exception checkException = null;
            checkException = objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string unEditableCompanyName = objCDefaults.lstCVarDefaults[0].UnEditableCompanyName;
            checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = objCWH_Area.GetListPaging(999999, 1, "WHERE WarehouseID=" + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].WarehouseID, "Name", out _RowCount);
            //checkException = ObjCLocation.GetListPaging(999999, 1, "where IsUsed=0 AND AreaID=" + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].AreaID + " AND ID<>" + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].LocationID, "Code", out _RowCount);
            if (unEditableCompanyName == "NIL" || unEditableCompanyName == "GBL" || unEditableCompanyName == "IST")
                checkException = ObjCLocation.GetListPaging(999999, 1, "WHERE (WarehouseID=" + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].WarehouseID + ") ", "Code", out _RowCount); 
            else
                checkException = ObjCLocation.GetListPaging(999999, 1, "WHERE (IsUsed=0 AND WarehouseID=" + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].WarehouseID + ") OR ID=" + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].LocationID, "Code", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {

                serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0]) //pData[0]
                , serializer.Serialize(ObjCLocation.lstCVarvwWH_RowLocationWithMinimalColumns) //pData[1]
                , serializer.Serialize(objCWH_Area.lstCVarWH_Area) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] ReceiveDetails_Save(Int64 pReceiveDetailsID,Int32 pLocationID,Int32 pOldLocationID)
        {
            Exception checkException = null;
            CVarWH_ReceiveDetails objCVarWH_ReceiveDetails = new CVarWH_ReceiveDetails();
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            //int _RowCount = 0;

            //checkException = objCWH_ReceiveDetails.UpdateList("LocationID=" + pLocationID + ",Quantity="+ pQuantity + " where ID=" + pReceiveDetailsID + "");
            checkException = objCWH_ReceiveDetails.UpdateList("LocationID=" + (pLocationID == 0 ? "null " : pLocationID.ToString()) + " where ID=" + pReceiveDetailsID + "");

            #region Set Locations IsUsed
            if (checkException == null)
            {
                checkException = objCWH_RowLocation.UpdateList("IsUsed=0 , StatusID=10 WHERE ID=" + pOldLocationID.ToString());
                if (pLocationID != 0)
                    checkException = objCWH_RowLocation.UpdateList("IsUsed=1 , StatusID=20 WHERE ID=" + pLocationID.ToString());
            }
            #endregion Set Locations IsUsed
            
           

            
            //checkException = objCvwWH_ReceiveDetails.GetListPaging(99999, 1, "WHERE OperationVehicleID IS NOT NULL AND (Quantity>FinalizedPickedQuantity)", "ID", out _RowCount);
            return new object[] {
                checkException == null ? true : false
                //, new JavaScriptSerializer().Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
                
            };
        }

        [HttpGet, HttpPost]
        public object[] GetAreas(Int64 pWareHouseID)
        {

            CWH_Area ObjArea = new CWH_Area();
            ObjArea.GetList("where WarehouseID=" + pWareHouseID + "");

            return new object[] 
            {
                new JavaScriptSerializer().Serialize(ObjArea.lstCVarWH_Area)               
            };
        }

        [HttpGet, HttpPost]
        public object[] GetLocations(string pWhereClauseLocations)
        {

            int _RowCount = 0;
            CvwWH_RowLocationWithMinimalColumns ObjLocation = new CvwWH_RowLocationWithMinimalColumns();
            ObjLocation.GetListPaging(999999, 1, pWhereClauseLocations, "Code", out _RowCount);

            return new object[]
            {
                new JavaScriptSerializer().Serialize(ObjLocation.lstCVarvwWH_RowLocationWithMinimalColumns)
            };
        }

        [HttpGet, HttpPost]
        public object[] UpdateLocationOfWH_ReceiveDetails(string pRecieveDetails , int? pAreaID)
        {
            int _RowCount = 0;
            var Message = "";
            //----------------------------------------------
            CWH_UpdateLocationOfWH_ReceiveDetails cWH_UpdateLocationOfWH_ReceiveDetails = new CWH_UpdateLocationOfWH_ReceiveDetails();
            var checkException = cWH_UpdateLocationOfWH_ReceiveDetails.GetList(pRecieveDetails , (int)pAreaID);


            if (checkException != null)
                Message = checkException.Message;


            //---------------------------------------------
            return new object[]
            {
                new JavaScriptSerializer().Serialize(Message)
            };
        }

        [HttpGet, HttpPost]
        public object[] TransferProducts_ImportFromExcel([FromBody] TransParam transParam)
        {
            string pReturnedMessage = "";
            Exception checkException = null;
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CWH_RowLocation objCWH_RowLocation_From = new CWH_RowLocation();
            CWH_RowLocation objCWH_RowLocation_To = new CWH_RowLocation();
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            int pFromLocationID = 0;
            int pToLocationID = 0;

            int _RowCount = 0;
            string pWhereClause = "";

            //var arrCustomerName = transParam.pCustomerNameList.Split(',');
            var arrPurchaseItemCode = transParam.pPurchaseItemCodeList.Split(',');
            var arrFromLocationCode = transParam.pFromLocationList.Split(',');
            var arrToLocationCode = transParam.pToLocationList.Split(',');
            int numberOfRows = arrPurchaseItemCode.Length;

            #region check eligibility [1st iteration / it doesn't handle if the quantity exceeded in multiple rows so check again in second iteration]
            for (int i = 0; i < numberOfRows; i++)
            {
                #region Check data is written correctly
                checkException = objCPurchaseItem.GetList("WHERE Code=N'" + arrPurchaseItemCode[i] + "'");
                checkException = objCWH_RowLocation_To.GetList("WHERE Code=N'" + arrToLocationCode[i] + "'");
                checkException = objCWH_RowLocation_From.GetList("WHERE Code=N'" + arrFromLocationCode[i] + "'");
                if (objCWH_RowLocation_From.lstCVarWH_RowLocation.Count == 0 
                    || objCWH_RowLocation_To.lstCVarWH_RowLocation.Count == 0
                    || objCPurchaseItem.lstCVarPurchaseItem.Count == 0)
                {
                    pReturnedMessage = "Please check item and locations at row " + (i + 2);
                    return new object[] { pReturnedMessage };
                }
                #endregion Check data is written correctly
                #region check ReceiveDetails is found
                else
                {
                    pWhereClause = "WHERE /*IsFinalized=0 AND*/ OperationVehicleID IS NULL" + " \n";
                    pWhereClause += "AND LocationID=" + objCWH_RowLocation_From.lstCVarWH_RowLocation[0].ID + " \n";
                    pWhereClause += "AND PurchaseItemID=" + objCPurchaseItem.lstCVarPurchaseItem[0].ID + " \n";
                    pWhereClause += "AND CustomerID=" + transParam.pCustomerID + " \n";
                    pWhereClause += "AND(Quantity > FinalizedPickedQuantity)" + " \n";

                    checkException = objCvwWH_ReceiveDetails.GetListPaging(1, 1, pWhereClause, "ID", out _RowCount);
                    if (_RowCount == 0)
                    {
                        pReturnedMessage = "Please, check location " + objCWH_RowLocation_From.lstCVarWH_RowLocation[i].Code + " at row " + (i + 2);
                        return new object[] { pReturnedMessage };
                    }
                }
                #endregion check ReceiveDetails is found
            }
            #endregion check eligibility

            #region Transfer
            for (int i = 0; i < numberOfRows; i++)
            {
                #region Another check at time of save to handle duplication of rows for locations and quantities
                checkException = objCPurchaseItem.GetList("WHERE Code=N'" + arrPurchaseItemCode[i] + "'");
                checkException = objCWH_RowLocation_From.GetList("WHERE Code=N'" + arrFromLocationCode[i] + "'");

                pWhereClause = "WHERE OperationVehicleID IS NULL" + " \n";
                pWhereClause += "AND LocationID=" + objCWH_RowLocation_From.lstCVarWH_RowLocation[0].ID + " \n";
                pWhereClause += "AND PurchaseItemID=" + objCPurchaseItem.lstCVarPurchaseItem[0].ID + " \n";
                pWhereClause += "AND CustomerID=" + transParam.pCustomerID + " \n";
                pWhereClause += "AND(Quantity > FinalizedPickedQuantity)" + " \n";

                //check again to handle the case of row duplication in excel and moving quantities multiple times
                checkException = objCvwWH_ReceiveDetails.GetListPaging(1, 1, pWhereClause, "ID", out _RowCount);
                if (_RowCount == 0)
                {
                    pReturnedMessage = "Saved till row " + (i + 1) + " \n";
                    pReturnedMessage += "Please, check row " + (i + 2);
                    return new object[] { pReturnedMessage };
                }
                #endregion Another check at time of save to handle duplication of rows for locations and quantities
                #region Move
                else
                {
                    checkException = objCWH_RowLocation_To.GetList("WHERE Code=N'" + arrToLocationCode[i] + "'");
                    //checkException = objCWH_ReceiveDetails.UpdateList("LocationID=" + pLocationID + ",Quantity="+ pQuantity + " where ID=" + pReceiveDetailsID + "");
                    checkException = objCWH_ReceiveDetails.UpdateList("LocationID=" + objCWH_RowLocation_To.lstCVarWH_RowLocation[0].ID + " where ID=" + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ID);
                }
                #endregion Move
                #region Set Locations IsUsed
                if (pReturnedMessage == "")
                {
                    CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
                    checkException = objCWH_RowLocation.UpdateList("IsUsed=0 , StatusID=10 WHERE ID=" + objCWH_RowLocation_From.lstCVarWH_RowLocation[0].ID);
                    if (objCWH_RowLocation_To.lstCVarWH_RowLocation[0].ID != 0)
                        checkException = objCWH_RowLocation.UpdateList("IsUsed=1 , StatusID=20 WHERE ID=" + objCWH_RowLocation_To.lstCVarWH_RowLocation[0].ID);
                }
                #endregion Set Locations IsUsed
            }
            #endregion Transfer

            return new object[]
            {
                pReturnedMessage
            };
        }
       
        // CSC_ValidateTransaction_AND_UpdateHeader cSC_ValidateTransaction = new CSC_ValidateTransaction_AND_UpdateHeader();
       // checkException = cSC_ValidateTransaction.GetList(string.Join("-", str_Items), string.Join("-", str_Stores), StartDate, cSC_Transactions.lstCVarSC_Transactions[0].ID, "");
       
    }

    public class TransParam
    {
        //public string pCustomerNameList { get; set; }
        public int pCustomerID;
        public string pPurchaseItemCodeList { get; set; }
        public string pFromLocationList { get; set; }
        public string pToLocationList { get; set; }
    }

}
