using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using Forwarding.MvcApp.Models.ContainerFreightStation.Transactions;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System.Globalization;
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.ContainerFreightStation.Transactions
{
    public class WH_CFS_ReleaseOrdersController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] WH_CFS_ReleaseOrders_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;
            
            CvwWH_CFS_ReleaseOrders objCvwWH_CFS_ReleaseOrders = new CvwWH_CFS_ReleaseOrders();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());

            checkException = objCvwWH_CFS_ReleaseOrders.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            if (checkException == null)
            {
                _result = true;
            }
            return new Object[] {
                _result
                , _RowCount
                ,new JavaScriptSerializer().Serialize(objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseOrders) //0
                };
        }

        [HttpGet, HttpPost]
        public object[] WH_CFS_ReleaseOrders_LoadItem(string pInventoryID)
        {
            bool _result = false;
            Exception checkException = null;
            Int32 _RowCount = 0;
            
            CvwWH_CFS_ReleaseOrders objCvwWH_CFS_ReleaseOrders = new CvwWH_CFS_ReleaseOrders();
            CvwWH_CFS_ReleaseOrdersNotes objCvwWH_CFS_ReleaseOrdersNotes = new CvwWH_CFS_ReleaseOrdersNotes();
            CWH_Notes objCWH_Notes = new Models.Warehousing.MasterData.Generated.CWH_Notes();

            checkException = objCvwWH_CFS_ReleaseOrders.GetList("WHERE InventoryID = " + pInventoryID);

            if (checkException == null)
            {
                _result = true;
                _RowCount = objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseOrders.Count;
                objCvwWH_CFS_ReleaseOrdersNotes.GetList(" Where ReleaseOrderID = " + objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseOrders[0].ReleaseOrderID);

                objCWH_Notes.GetList("Where IsForReleaseOrder = 1");

            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                _result
                ,serializer.Serialize(_RowCount == 0 ? null :objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseOrders[0]) //data[1]
                ,serializer.Serialize(_RowCount == 0 ? null :objCvwWH_CFS_ReleaseOrdersNotes.lstCVarvwWH_CFS_ReleaseOrdersNotes) //data[2]
                ,serializer.Serialize(_RowCount == 0 ? null :objCWH_Notes.lstCVarWH_Notes) //data[3]
            };
        }


        [HttpGet, HttpPost]
        public Object[] GetReleaseNumber(Int32 pReleaseOrderID)
        {
            bool _result = false;
            Exception checkException = null;


            CWH_ReleaseOrders objCWH_ReleaseOrders = new CWH_ReleaseOrders();

            // Getting Areas list
            checkException = objCWH_ReleaseOrders.GetList(" where ID = " + pReleaseOrderID.ToString());

            if (checkException == null)
            {
                _result = true;
            }

            return new Object[]
            {
                _result // 0
                  , _result ? new JavaScriptSerializer().Serialize(objCWH_ReleaseOrders.lstCVarWH_ReleaseOrders[0]) : null //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_CFS_ReleaseOrders_Insert([FromBody] InsertReleaseOrder InsertReleaseOrder)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CWH_ReleaseOrders objCWH_ReleaseOrders = new CWH_ReleaseOrders();

            CVarWH_ReleaseOrders objCVarWH_ReleaseOrders = new CVarWH_ReleaseOrders();

            CvwWH_CFS_ReleaseOrders objCvwWH_CFS_ReleaseOrders = new CvwWH_CFS_ReleaseOrders();


            objCVarWH_ReleaseOrders.InventoryID = Int32.Parse(InsertReleaseOrder.pInventoryID);
            objCVarWH_ReleaseOrders.ReleaseNumber = InsertReleaseOrder.pReleaseNumber == null ? "0" : InsertReleaseOrder.pReleaseNumber.Trim().ToString();

            // nour 09052022
            //objCVarWH_ReleaseOrders.ReleasingDate = InsertReleaseOrder.pReleasingDate.Contains("0001") ? DateTime.Parse("1-1-1900") : DateTime.Parse(InsertReleaseOrder.pReleasingDate);
            objCVarWH_ReleaseOrders.ReleasingDate = InsertReleaseOrder.pReleasingDate.Contains("0001") ? DateTime.Parse("1-1-1900") : DateTime.ParseExact(InsertReleaseOrder.pReleasingDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);

            objCVarWH_ReleaseOrders.CouponNumber = InsertReleaseOrder.pCouponNumber == null ? "0" : InsertReleaseOrder.pCouponNumber.Trim().ToString();
            objCVarWH_ReleaseOrders.CertificationNumber = InsertReleaseOrder.pCertificationNumber == null ? "0" : InsertReleaseOrder.pCertificationNumber.Trim().ToString();
            objCVarWH_ReleaseOrders.Remarks = InsertReleaseOrder.pRemarks == null ? "0" : InsertReleaseOrder.pRemarks.Trim().ToString();
            objCVarWH_ReleaseOrders.ID = Int32.Parse(InsertReleaseOrder.pReleaseOrderID);
            objCVarWH_ReleaseOrders.AddedBy =  WebSecurity.CurrentUserId ;
            objCVarWH_ReleaseOrders.AddedAt = DateTime.Now;
            objCVarWH_ReleaseOrders.UpdatedBy =  WebSecurity.CurrentUserId;
            objCVarWH_ReleaseOrders.UpdatedAt = DateTime.Now;

            objCWH_ReleaseOrders.lstCVarWH_ReleaseOrders.Add(objCVarWH_ReleaseOrders);
            checkException = objCWH_ReleaseOrders.SaveMethod(objCWH_ReleaseOrders.lstCVarWH_ReleaseOrders);
            if (checkException == null)
            {
                _result = true;
                
                InsertReleaseOrder.pWhereClause = (InsertReleaseOrder.pWhereClause == null ? "" : InsertReleaseOrder.pWhereClause.Trim().ToUpper());

                checkException = objCvwWH_CFS_ReleaseOrders.GetListPaging(InsertReleaseOrder.pPageSize, InsertReleaseOrder.pPageNumber, InsertReleaseOrder.pWhereClause, InsertReleaseOrder.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_ReleaseOrders.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseOrders) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_CFS_ReleaseOrders_Update([FromBody] UpdateReleaseOrder UpdateReleaseOrder)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CWH_ReleaseOrders objCWH_ReleaseOrders = new CWH_ReleaseOrders();

            CVarWH_ReleaseOrders objCVarWH_ReleaseOrders = new CVarWH_ReleaseOrders();

            CvwWH_CFS_ReleaseOrders objCvwWH_CFS_ReleaseOrders = new CvwWH_CFS_ReleaseOrders();
            CvwWH_CFS_ReleaseOrdersNotes objCvwWH_CFS_ReleaseOrdersNotes = new CvwWH_CFS_ReleaseOrdersNotes();

            objCVarWH_ReleaseOrders.InventoryID = Int32.Parse(UpdateReleaseOrder.pInventoryID);
            objCVarWH_ReleaseOrders.ReleaseNumber = UpdateReleaseOrder.pReleaseNumber == null ? "0" : UpdateReleaseOrder.pReleaseNumber.Trim().ToString();
            objCVarWH_ReleaseOrders.ReleasingDate = UpdateReleaseOrder.pReleasingDate.Contains("0001") ? DateTime.Parse("1-1-1900") : DateTime.Parse(UpdateReleaseOrder.pReleasingDate);
            objCVarWH_ReleaseOrders.CouponNumber = UpdateReleaseOrder.pCouponNumber == null ? "0" : UpdateReleaseOrder.pCouponNumber.Trim().ToString();
            objCVarWH_ReleaseOrders.CertificationNumber = UpdateReleaseOrder.pCertificationNumber == null ? "0" : UpdateReleaseOrder.pCertificationNumber.Trim().ToString();
            objCVarWH_ReleaseOrders.Remarks = UpdateReleaseOrder.pRemarks == null ? "0" : UpdateReleaseOrder.pRemarks.Trim().ToString();
            objCVarWH_ReleaseOrders.ID = Int32.Parse(UpdateReleaseOrder.pReleaseOrderID);
            objCVarWH_ReleaseOrders.AddedBy = WebSecurity.CurrentUserId;
            objCVarWH_ReleaseOrders.AddedAt = DateTime.Now;
            objCVarWH_ReleaseOrders.UpdatedBy = WebSecurity.CurrentUserId;
            objCVarWH_ReleaseOrders.UpdatedAt = DateTime.Now;

            objCWH_ReleaseOrders.lstCVarWH_ReleaseOrders.Add(objCVarWH_ReleaseOrders);
            checkException = objCWH_ReleaseOrders.SaveMethod(objCWH_ReleaseOrders.lstCVarWH_ReleaseOrders);
            if (checkException == null)
            {
                _result = true;

                UpdateReleaseOrder.pWhereClause = (UpdateReleaseOrder.pWhereClause == null ? "" : UpdateReleaseOrder.pWhereClause.Trim().ToUpper());

                checkException = objCvwWH_CFS_ReleaseOrders.GetListPaging(UpdateReleaseOrder.pPageSize, UpdateReleaseOrder.pPageNumber, UpdateReleaseOrder.pWhereClause, UpdateReleaseOrder.pOrderBy, out _RowCount);

                objCvwWH_CFS_ReleaseOrdersNotes.GetList(" Where ReleaseOrderID = " + objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseOrders[0].ReleaseOrderID);

            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_ReleaseOrders.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseOrders) : null //pData[2]
                , _result ? serializer.Serialize(objCvwWH_CFS_ReleaseOrdersNotes.lstCVarvwWH_CFS_ReleaseOrdersNotes) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public bool AddReleaseLetterPrintLog(Int32 pHouseID, bool pT)
        {
            bool _result = false;
            Exception checkException = null;

            CVarOperationDocPrintLog objCVarOperationDocPrintLog = new CVarOperationDocPrintLog();
            objCVarOperationDocPrintLog.OperationID = pHouseID;
            objCVarOperationDocPrintLog.DocumentTypeID = 99; // 99 is for Release Letter
            objCVarOperationDocPrintLog.PrintUserID = WebSecurity.CurrentUserId;
            objCVarOperationDocPrintLog.PrintDate = DateTime.Now;

            COperationDocPrintLog objCOperationDocPrintLog = new COperationDocPrintLog();
            objCOperationDocPrintLog.lstCVarOperationDocPrintLog.Add(objCVarOperationDocPrintLog);
            checkException = objCOperationDocPrintLog.SaveMethod(objCOperationDocPrintLog.lstCVarOperationDocPrintLog);

            if (checkException == null)
            {
                _result = true;
            }

            return _result;
        }


        [HttpGet, HttpPost]

        public bool SendBackToInvoices (String pHouseNumber )
        {
            var Result = false;

            CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();

            Exception exception = cCustomizedDBCall.CallProcFunction($"usp_ClearHouseBillPrintAndRelease '{pHouseNumber}' , {WebSecurity.CurrentUserId}");

                if (exception == null) Result = true;

            return Result;
        }



        public class InsertReleaseOrder
        {
            public String pReleaseOrderID { get; set; }

            public String pInventoryID { get; set; }

            public String pReleasingDate { get; set; }

            public String pReleaseNumber { get; set; }

            public String pCouponNumber { get; set; }

            public String pCertificationNumber { get; set; }

            public String pRemarks { get; set; }

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

        public class UpdateReleaseOrder
        {
            public String pReleaseOrderID { get; set; }

            public String pInventoryID { get; set; }

            public String pReleasingDate { get; set; }

            public String pReleaseNumber { get; set; }

            public String pCouponNumber { get; set; }

            public String pCertificationNumber { get; set; }

            public String pRemarks { get; set; }

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

        #region N O T E S   F U N C T I O N S

        [HttpGet, HttpPost]
        public object[] WH_CFS_ReleaseOrders_LoadNotes(string pReleaseOrderID)
        {
            bool _result = false;
            Exception checkException = null;
            Int32 _RowCount = 0;

            CvwWH_CFS_ReleaseOrdersNotes objCvwWH_CFS_ReleaseOrdersNotes = new CvwWH_CFS_ReleaseOrdersNotes();

            checkException = objCvwWH_CFS_ReleaseOrdersNotes.GetList(" Where ReleaseOrderID = " + pReleaseOrderID);

            if (checkException == null)
            {
                _result = true;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                _result
                ,serializer.Serialize(_RowCount == 0 ? null :objCvwWH_CFS_ReleaseOrdersNotes.lstCVarvwWH_CFS_ReleaseOrdersNotes) //data[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_CFS_ReleaseOrders_LoadNoteDetails(string pReleaseOrderNoteID)
        {
            bool _result = false;
            Exception checkException = null;

            CvwWH_CFS_ReleaseOrdersNotes objCvwWH_CFS_ReleaseOrdersNotes = new CvwWH_CFS_ReleaseOrdersNotes();

            checkException = objCvwWH_CFS_ReleaseOrdersNotes.GetList(" Where ID = " + pReleaseOrderNoteID);

            if (checkException == null)
            {
                _result = true;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                _result
                ,serializer.Serialize(_result == false ? null :objCvwWH_CFS_ReleaseOrdersNotes.lstCVarvwWH_CFS_ReleaseOrdersNotes[0]) //data[2]
            };
        }


        [HttpGet, HttpPost]
        public object[] WH_CFS_ReleaseOrderNotes_Save([FromBody] InsertReleaseOrderNotes InsertReleaseOrderNotes)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CWH_ReleaseOrderNotes objCWH_ReleaseOrderNotes = new CWH_ReleaseOrderNotes();

            CVarWH_ReleaseOrderNotes objCVarWH_ReleaseOrderNotes = new CVarWH_ReleaseOrderNotes();

            CvwWH_CFS_ReleaseOrdersNotes objCvwWH_CFS_ReleaseOrdersNotes = new CvwWH_CFS_ReleaseOrdersNotes();


            objCVarWH_ReleaseOrderNotes.ReleaseOrderID = Int32.Parse(InsertReleaseOrderNotes.pReleaseOrderID);
            objCVarWH_ReleaseOrderNotes.NoteID = InsertReleaseOrderNotes.pNoteID == "" ? 0 : Int32.Parse(InsertReleaseOrderNotes.pNoteID);
            objCVarWH_ReleaseOrderNotes.NoteDetails = InsertReleaseOrderNotes.pNoteDetails == null ? "0" : InsertReleaseOrderNotes.pNoteDetails.Trim().ToString();
            objCVarWH_ReleaseOrderNotes.ID = Int32.Parse(InsertReleaseOrderNotes.pReleaseOrderNoteID);
            objCVarWH_ReleaseOrderNotes.AddedBy = WebSecurity.CurrentUserId;
            objCVarWH_ReleaseOrderNotes.AddedAt = DateTime.Now;
            objCVarWH_ReleaseOrderNotes.UpdatedBy = WebSecurity.CurrentUserId;
            objCVarWH_ReleaseOrderNotes.UpdatedAt = DateTime.Now;

            objCWH_ReleaseOrderNotes.lstCVarWH_ReleaseOrderNotes.Add(objCVarWH_ReleaseOrderNotes);
            checkException = objCWH_ReleaseOrderNotes.SaveMethod(objCWH_ReleaseOrderNotes.lstCVarWH_ReleaseOrderNotes);
            if (checkException == null)
            {
                _result = true;

                InsertReleaseOrderNotes.pWhereClause = (InsertReleaseOrderNotes.pWhereClause == null ? "" : InsertReleaseOrderNotes.pWhereClause.Trim().ToUpper());

                checkException = objCvwWH_CFS_ReleaseOrdersNotes.GetListPaging(InsertReleaseOrderNotes.pPageSize, InsertReleaseOrderNotes.pPageNumber, InsertReleaseOrderNotes.pWhereClause, InsertReleaseOrderNotes.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_ReleaseOrderNotes.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_CFS_ReleaseOrdersNotes.lstCVarvwWH_CFS_ReleaseOrdersNotes) : null //pData[2]
                , _RowCount //pData[3]
            };
        }


        [HttpGet, HttpPost]
        public object[] WH_CFS_ReleaseOrderNotes_DeleteList(String pDeleteWH_CFS_ReleaseOrderNoteIDs, string pWhereClause, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;

            CWH_ReleaseOrderNotes objCWH_ReleaseOrderNotes = new CWH_ReleaseOrderNotes();

            CvwWH_CFS_ReleaseOrdersNotes objCvwWH_CFS_ReleaseOrdersNotes = new CvwWH_CFS_ReleaseOrdersNotes();

            foreach (var currentID in pDeleteWH_CFS_ReleaseOrderNoteIDs.Split(','))
            {
                objCWH_ReleaseOrderNotes.lstDeletedCPKWH_ReleaseOrderNotes.Add(new CPKWH_ReleaseOrderNotes() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_ReleaseOrderNotes.DeleteItem(objCWH_ReleaseOrderNotes.lstDeletedCPKWH_ReleaseOrderNotes);

            if (checkException == null)
                _result = true;
            objCvwWH_CFS_ReleaseOrdersNotes.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwWH_CFS_ReleaseOrdersNotes.lstCVarvwWH_CFS_ReleaseOrdersNotes) : null //pData[1]
            };
        }

        public class InsertReleaseOrderNotes
        {
            public String pReleaseOrderNoteID { get; set; }

            public String pReleaseOrderID { get; set; }

            public String pNoteID { get; set; }

            public String pNoteDetails { get; set; }

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


        [HttpGet, HttpPost]
        public Object[] GetNoteDetails(Int32 pNoteID)
        {
            bool _result = false;
            Exception checkException = null;

            CWH_Notes objCWH_Notes = new CWH_Notes();

            // Getting Areas list
            checkException = objCWH_Notes.GetList(" where ID = " + pNoteID.ToString());

            if (checkException == null)
            {
                _result = true;
            }

            return new Object[]
            {
                _result // 0
                  , _result ? new JavaScriptSerializer().Serialize(objCWH_Notes.lstCVarWH_Notes[0]) : null //pData[1]
            };
        }
        #endregion
    }
}
