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
using static QRCoder.PayloadGenerator;
using Forwarding.MvcApp.Controllers.Operations.API_Operations;
using MailKit.Search;
using Forwarding.MvcApp.Models.Administration.Security.Generated;

namespace Forwarding.MvcApp.Controllers.ContainerFreightStation.Transactions
{ 
    public class WH_CFS_ReleaseVouchersController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CvwWH_CFS_ReleaseVouchers objCvwWH_CFS_ReleaseOrders = new CvwWH_CFS_ReleaseVouchers();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());

            checkException = objCvwWH_CFS_ReleaseOrders.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            if (checkException == null)
            {
                _result = true;
            }
            return new Object[] {
                _result
                , _RowCount
                ,new JavaScriptSerializer().Serialize(objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseVouchers) //0
                };
        }

        [HttpGet, HttpPost]
        public object[] WH_CFS_ReleaseVouchers_LoadItem(string pInventoryID)
        {
            bool _result = false;
            Exception checkException = null;
            Int32 _RowCount = 0;

            CvwWH_CFS_ReleaseVouchers objCvwWH_CFS_ReleaseOrders = new CvwWH_CFS_ReleaseVouchers();
            CvwWH_CFS_ReleaseOrdersNotes objCvwWH_CFS_ReleaseOrdersNotes = new CvwWH_CFS_ReleaseOrdersNotes();
            CWH_CFS_ReleaseVouchersDetails objCWH_CFS_ReleaseVouchersDetails = new CWH_CFS_ReleaseVouchersDetails();
            CWH_Notes objCWH_Notes = new Models.Warehousing.MasterData.Generated.CWH_Notes();

            checkException = objCvwWH_CFS_ReleaseOrders.GetList("WHERE InventoryID = " + pInventoryID);

            if (checkException == null)
            {
                _result = true;
                _RowCount = objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseVouchers.Count;
                objCvwWH_CFS_ReleaseOrdersNotes.GetList(" Where ReleaseOrderID = " + objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseVouchers[0].ReleaseOrderID);
                checkException = objCWH_CFS_ReleaseVouchersDetails.GetList(" Where HouseBillID = " + objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseVouchers[0].mHouseBillID);

                objCWH_Notes.GetList("Where IsForReleaseOrder = 1");

            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                _result
                ,serializer.Serialize(_RowCount == 0 ? null :objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseVouchers[0]) //data[1]
                ,serializer.Serialize(_RowCount == 0 ? null :objCvwWH_CFS_ReleaseOrdersNotes.lstCVarvwWH_CFS_ReleaseOrdersNotes) //data[2]
                ,serializer.Serialize(_RowCount == 0 ? null :objCWH_Notes.lstCVarWH_Notes) //data[3]
                ,serializer.Serialize(objCWH_CFS_ReleaseVouchersDetails.lstCVarWH_CFS_ReleaseVouchersDetails.Count == 0 ? null :objCWH_CFS_ReleaseVouchersDetails.lstCVarWH_CFS_ReleaseVouchersDetails[0]) //data[4]
            };
        }


        [HttpPost]
        public object[] WH_CFS_ReleaseVouchersDetails_Insert([FromBody] InsertReleaseOrderDetails InsertReleaseOrderDetails)
        {
            bool _result = false;
            int _RowCount = 0; 
            Exception checkException = null;
            string pUpdateClause = "";

            CVarWH_CFS_ReleaseVouchersDetails objCVarWH_CFS_ReleaseVouchersDetails  = new CVarWH_CFS_ReleaseVouchersDetails();
            CWH_CFS_ReleaseVouchersDetails objCWH_CFS_ReleaseVouchersDetails  = new CWH_CFS_ReleaseVouchersDetails();
            objCWH_CFS_ReleaseVouchersDetails.GetList("where HouseBillID=" + InsertReleaseOrderDetails.pHouseBillID);
            if (objCWH_CFS_ReleaseVouchersDetails.lstCVarWH_CFS_ReleaseVouchersDetails.Count == 0)
            {

            objCVarWH_CFS_ReleaseVouchersDetails.HouseBillID = InsertReleaseOrderDetails.pHouseBillID == 0 ? 0 : InsertReleaseOrderDetails.pHouseBillID;
            objCVarWH_CFS_ReleaseVouchersDetails.CarNumber =  InsertReleaseOrderDetails.pCarNumber =="0" ? "0" : InsertReleaseOrderDetails.pCarNumber;
            objCVarWH_CFS_ReleaseVouchersDetails.DriverName =  InsertReleaseOrderDetails.pDriverName == "0" ? "0" : InsertReleaseOrderDetails.pDriverName;
            objCVarWH_CFS_ReleaseVouchersDetails.NationalID =  InsertReleaseOrderDetails.pNationalID == "0" ? "0" : InsertReleaseOrderDetails.pNationalID;
            objCVarWH_CFS_ReleaseVouchersDetails.TicketNumber =  InsertReleaseOrderDetails.pTicketNumber == "0" ? "0" : InsertReleaseOrderDetails.pTicketNumber;
            objCVarWH_CFS_ReleaseVouchersDetails.CertificationNumber =  InsertReleaseOrderDetails.pCertificationNumber == "0" ? "0" : InsertReleaseOrderDetails.pCertificationNumber;
            objCVarWH_CFS_ReleaseVouchersDetails.DriverLicenseNumber =  InsertReleaseOrderDetails.pDriverLicense == "0" ? "0" : InsertReleaseOrderDetails.pDriverLicense;
            objCVarWH_CFS_ReleaseVouchersDetails.CertificationDate = InsertReleaseOrderDetails.pCertificationDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertReleaseOrderDetails.pCertificationDate;
            objCVarWH_CFS_ReleaseVouchersDetails.PrintedUserID =0;
            objCVarWH_CFS_ReleaseVouchersDetails.IsPrinted = 0;
            objCVarWH_CFS_ReleaseVouchersDetails.mPrintedDateDate =  DateTime.Parse("1-1-1900") ;

            objCWH_CFS_ReleaseVouchersDetails.lstCVarWH_CFS_ReleaseVouchersDetails.Add(objCVarWH_CFS_ReleaseVouchersDetails);
            checkException = objCWH_CFS_ReleaseVouchersDetails.SaveMethod(objCWH_CFS_ReleaseVouchersDetails.lstCVarWH_CFS_ReleaseVouchersDetails);
            }
            else
            {
            
                pUpdateClause = " CarNumber=N'" + (InsertReleaseOrderDetails.pCarNumber == "0" ? "NULL" : InsertReleaseOrderDetails.pCarNumber.ToString()) + "'" + " \n";
                pUpdateClause += ", DriverName=N'" + (InsertReleaseOrderDetails.pDriverName == "0" ? "NULL" : InsertReleaseOrderDetails.pDriverName.ToString()) + "'" + " \n";
                pUpdateClause += ", CertificationDate='" + (InsertReleaseOrderDetails.pCertificationDate.Year == 1 ? DateTime.Parse("1-1-1900") : InsertReleaseOrderDetails.pCertificationDate) + "'" + " \n";
                pUpdateClause += ", NationalID=N'" + (InsertReleaseOrderDetails.pNationalID == "0" ? "NULL" : InsertReleaseOrderDetails.pNationalID.ToString()) + "'" + " \n";
                pUpdateClause += ", TicketNumber=N'" + (InsertReleaseOrderDetails.pTicketNumber == "0" ? "NULL" : InsertReleaseOrderDetails.pTicketNumber.ToString()) + "'" + " \n";
                pUpdateClause += ", CertificationNumber=N'" + (InsertReleaseOrderDetails.pCertificationNumber == "0" ? "NULL" : InsertReleaseOrderDetails.pCertificationNumber.ToString()) + "'" + " \n";
                pUpdateClause += ", DriverLicenseNumber=N'" + (InsertReleaseOrderDetails.pDriverLicense == "0" ? "NULL" : InsertReleaseOrderDetails.pDriverLicense.ToString()) + "'" + " \n";
                pUpdateClause += " WHERE HouseBillID=" + InsertReleaseOrderDetails.pHouseBillID;

                checkException = objCWH_CFS_ReleaseVouchersDetails.UpdateList(pUpdateClause);

            }
            if (checkException == null)
            {
                _result = true;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _RowCount //pData[3]
            };
        }



        public object[] WH_CFS_ReleaseVouchersDetails_InsertPrint([FromBody] InsertReleaseOrderDetailsPrint InsertReleaseOrderDetailsPrint)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            string pUpdateClause = "";


            CWH_CFS_ReleaseVouchersDetails objCWH_CFS_ReleaseVouchersDetails = new CWH_CFS_ReleaseVouchersDetails();

            pUpdateClause = " IsPrinted=1";
            pUpdateClause += " , PrintedUserID = " + WebSecurity.CurrentUserId.ToString();
            pUpdateClause += " , PrintedDateDate = GETDATE()";
            pUpdateClause += " WHERE HouseBillID=" + InsertReleaseOrderDetailsPrint.pHouseBillID;

                checkException = objCWH_CFS_ReleaseVouchersDetails.UpdateList(pUpdateClause);

            
            if (checkException == null)
            {
                _result = true;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _RowCount //pData[2]
            };
        }

        public object[] WH_CFS_ReleaseVouchersDetails_SendBack([FromBody] InsertReleaseOrderDetailsSendBack InsertReleaseOrderDetailsSendBack)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            string pUpdateClause = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var HouseBillID = objCCustomizedDBCall.CallStringFunction("select HouseBillID from vwWH_CFS_GateInInventory where HouseNumber='" + InsertReleaseOrderDetailsSendBack.pHouseNumber + "'");
            CvwWH_CFS_ReleaseVouchers objCvwWH_CFS_ReleaseOrders = new CvwWH_CFS_ReleaseVouchers();

            CWH_CFS_ReleaseVouchersDetails objCWH_CFS_ReleaseVouchersDetails = new CWH_CFS_ReleaseVouchersDetails();

            pUpdateClause = " IsPrinted=0";
            pUpdateClause += " WHERE HouseBillID=" + HouseBillID;
            checkException = objCWH_CFS_ReleaseVouchersDetails.UpdateList(pUpdateClause);
            checkException = objCvwWH_CFS_ReleaseOrders.GetListPaging(10, 1, "where HouseNumber='"+InsertReleaseOrderDetailsSendBack.pHouseNumber + "'", " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC ", out _RowCount);

            if (checkException == null)
            {
                _result = true;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _RowCount //pData[2]
                ,new JavaScriptSerializer().Serialize(objCvwWH_CFS_ReleaseOrders.lstCVarvwWH_CFS_ReleaseVouchers) //0

            };
        }

        [HttpGet, HttpPost]
        // this Action To MESREPORTS Screen Only
        public Object[] LoadAll_SecCustomizedUserPrivilegesMescoReports()
        {
            Int32 _RowCount = 0;
            CvwSecUserCustomizedTabsMESCOREPORTS objCvwSecUserCustomizedTabs = new CvwSecUserCustomizedTabsMESCOREPORTS();
            objCvwSecUserCustomizedTabs.GetList($"where formid = 450 And CanView = 1 And userid = {WebSecurity.CurrentUserId.ToString()} ");
            if (objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabsMESCOREPORTS.Count > 0)
                _RowCount = 1;
            return new Object[] { _RowCount, new JavaScriptSerializer().Serialize(objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabsMESCOREPORTS) };
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

        public class InsertReleaseOrderDetails
        {
            public Int32 pHouseBillID { get; set; }
            public String pCarNumber { get; set; }
            public String pDriverLicense { get; set; }
            public String pDriverName { get; set; }
            public String pNationalID { get; set; }
            public String pTicketNumber { get; set; }
            public String pCertificationNumber { get; set; }
            public DateTime pCertificationDate { get; set; }

        }
        public class InsertReleaseOrderDetailsPrint
        {
            public Int32 pHouseBillID { get; set; }

        }
        public class InsertReleaseOrderDetailsSendBack
        {
            public String pHouseNumber { get; set; }

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

    }
}
