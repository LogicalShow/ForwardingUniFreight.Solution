using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using System.IO;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System.Globalization;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using System.Net.Mail;
using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.CustomizedSPCall;
using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Common;
using Forwarding.MvcApp.Models.XML;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System.Windows.Documents;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using Forwarding.MvcApp.Entities.Quotations;
using Forwarding.MvcApp.Controllers.DynamicsCRM;
using System.Threading.Tasks;
using Forwarding.MvcApp.Controllers.Accounting.API_MasterData;
using System.Threading;
using System.Security.Cryptography;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class SetOperationStageController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            Exception checkException = null;
            // Creates an instance of your JavaScriptSerializer & Setting the MaxJsonLength to handle the case of large data returned
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            int _RowCount = 0;
            CvwOperationsForClosing objCvwOperationsForClosing = new CvwOperationsForClosing();
            checkException = objCvwOperationsForClosing.GetListPaging(99999, 1, pWhereClause, "ID DESC", out _RowCount);
            return new Object[] { serializer.Serialize(objCvwOperationsForClosing.lstCVarvwOperationsForClosing), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithObjectArrayReturned()
        {
            int _RowCount = 0;
            Exception checkException = null;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var ServicesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,NAME FROM NoAccessServices", typeof(CVarNoAccessServices)).Cast<CVarNoAccessServices>().ToList();
            var DirectionList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM NoAccessDirectionTypes", typeof(cVarNoAccessDirectionTypes)).Cast<cVarNoAccessDirectionTypes>().ToList();
            CSalesmen objCSalesmen = new CSalesmen();
            checkException = objCSalesmen.GetListPaging(99999, 1, " Where 1=1 ", " Name ", out _RowCount);
         

            CUsers objCUsers = new CUsers();
            checkException= objCUsers.GetListPaging(99999, 1, " Where isnull(IsInActive,0)=0 "," Name " ,out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                  serializer.Serialize(ServicesList) //0
                , serializer.Serialize(DirectionList) //1
                , serializer.Serialize(objCSalesmen.lstCVarSalesmen) //2
                , serializer.Serialize(objCUsers.lstCVarUsers) //3

            };
        }
        [HttpGet, HttpPost]
        public Object[] OpenOperation(Int64 pOperationID, string pOperationCode)
        {

            string pMsgError = "";

            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            COperations objCOperations = new COperations();
            objCOperations.GetList("Where Code='" + pOperationCode + "'");

            if (objCOperations.lstCVarOperations.Count == 1)
            {
                pOperationID = objCOperations.lstCVarOperations[0].ID;
            }
            else
            {
                pMsgError = "Operation code not exist";
            }

            if (pMsgError == "")
                checkException = objCCustomizedDBCall.CallProcFunction("Mesco_Operation_Open " + pOperationID + "," + WebSecurity.CurrentUserId);

            if (checkException != null)
                pMsgError = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                pMsgError //0             
            };
        }


        [HttpGet, HttpPost]
        public async Task<object[]> SetOperationStage_ByDates(CloseOperationData closeOperationData)
        {
      
            string updateClause = "";
            string pReturnedMessage = "";
            int ClosedQuoteAndOperStageID = 120;
            int OpenQuoteAndOperStageID = 60;
            var CancelledQuoteAndOperStageID = 110;
            var CurrentUserID = WebSecurity.CurrentUserId;
            CPayables objCPayables = new CPayables();
            CReceivables objCReceivables = new CReceivables();
            DynamicsCRMController objDynamicsCRMQR = new DynamicsCRMController();
            int _RowCount = 0;
            CvwOperations objCvwOperations = new CvwOperations();

         
            DateTime lastDayOfMonth = new DateTime(closeOperationData.pYear, closeOperationData.pMonth, DateTime.DaysInMonth(closeOperationData.pYear, closeOperationData.pMonth));

            //if (pOperationStageID == CancelledQuoteAndOperStageID)
            //{
            //    objCPayables.GetListPaging(1, 1, "WHERE IsDeleted=0 AND OperationID=" + pID, "ID", out _RowCount);
            //    objCReceivables.GetListPaging(1, 1, "WHERE IsDeleted=0 AND OperationID=" + pID, "ID", out _RowCount);
            //}
            //if (objCReceivables.lstCVarReceivables.Count > 0 || objCPayables.lstCVarPayables.Count > 0)
            //    pReturnedMessage = "Please, check there is not payables nor receivables.";
            Exception checkException =null;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "", "ID", out _RowCount);
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CvwInvoices objCvwInvoices = new CvwInvoices();
            var ArrOperationIDs = closeOperationData.pOperationIDs_ToSet.Split(',');
            int NumberOfOperations = ArrOperationIDs.Count();
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MES" && closeOperationData.pOperationStageID == ClosedQuoteAndOperStageID )
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                for (int i = 0; i < NumberOfOperations; i++)
                {
                    //string PaymentRequestNoApproved = objCCustomizedDBCall.CallStringFunction(@"select  SUBSTRING((SELECT distinct ('-' +  P.Code) FROM vwA_PaymentRequest P join A_PaymentRequestDetails d on p.ID = d.PaymentRequestID
                    // WHERE  p.ApproveStatues = 'NEW REQUEST'  p.IsIncludedInCombinedPaymentRequest <> 1  and OperationID=" + ArrOperationIDs[i].ToString() +
                    //    " FOR XML PATH('')), 2,10000) AS PaymentRequestCode " );

                    //  if (PaymentRequestNoApproved != "")
                    //      pReturnedMessage = " Payment Request Not Approved : " + PaymentRequestNoApproved;
                    //validation Removed on 6/5/2025



                   var result=   objCCustomizedDBCall.CallStringFunction($"CheckCloseMonth {closeOperationData.pMonth} , {ArrOperationIDs[i]}");

                    if (result != "1")
                        pReturnedMessage = "Close Month Is Not The Same As First Operation Invoice Month";



                    objCvwOperations.GetListPaging(99999, 1, " Where ID= " + Convert.ToInt32(ArrOperationIDs[i]), "ID DESC", out _RowCount);

                    checkException = objCvwReceivables.GetListPaging(999999, 1, " WHERE OperationID = " + ArrOperationIDs[i]
                        + " AND IsDeleted=0 AND InvoiceID IS NULL AND AccNoteID IS NULL ", "ID", out _RowCount);

                    if (objCvwReceivables.lstCVarvwReceivables.Count > 0)
                        pReturnedMessage = " Please Create Invoice For Remaining Receivables ,Operation Code " + objCvwReceivables.lstCVarvwReceivables[0].OperationCode;

                    checkException = objCvwInvoices.GetListPaging(999999, 1, " WHERE OperationID = " + ArrOperationIDs[i]
                        + " AND IsDeleted=0 AND IsApproved <> 1", "ID", out _RowCount);

                    if (objCvwInvoices.lstCVarvwInvoices.Count > 0)
                        pReturnedMessage = " Please Approved Invoices First ,Operation Code " + objCvwInvoices.lstCVarvwInvoices[0].OperationCode;


                    //checkException = objCvwInvoices.GetListPaging(
                    //                                              999999,
                    //                                              1,
                    //                                              "WHERE (OperationID = " + ArrOperationIDs[i] +
                    //                                              " OR OperationID IN (SELECT ID FROM Operations WHERE MasterOperationID = " + ArrOperationIDs[i] +
                    //                                              ")) AND IsDeleted = 0 AND InvoiceTypeID = 9 AND ChildInvoiceID IS NULL",
                    //                                              "ID",
                    //                                              out _RowCount
                    //                                          );

                    var IsDraftsValid = objCCustomizedDBCall.CallStringFunction($"CheckInvoicesValidation {ArrOperationIDs[i]}");



                    if (IsDraftsValid != "1")
                        pReturnedMessage = " Cannot Close Operation There IS Draft With Out Invoice ,"+ (objCvwOperations.lstCVarvwOperations[0].BLType == 2   ? "House Num " +objCvwInvoices.lstCVarvwInvoices[0].HouseNumber : "Operation Code " + objCvwOperations.lstCVarvwOperations[0].Code);

                //    checkException = objCvwReceivables.GetListPaging(999999, 1, " WHERE OperationID = " + ArrOperationIDs[i]
                //+ " AND IsDeleted=0 AND CategoryID=6 and SaleAmount > 0  and (select InvoiceStatus from vwinvoices where id = InvoiceID ) != 'Cancelled by credit note' ", "ID", out _RowCount);

                //    checkException = objCPayables.GetListPaging(999999, 1, " WHERE OperationID = " + ArrOperationIDs[i]
                //      + "and (isnull(accnoteid , 0 ) = 0) AND IsDeleted=0 AND CategoryID=6 and CostPrice > 0", "ID", out _RowCount);

                    var IsValidOfficialReceipt = objCCustomizedDBCall.CallStringFunction($"CheckOfficialAmounts {ArrOperationIDs[i]}");


                    if (IsValidOfficialReceipt != "1")
                        pReturnedMessage = "client official receipt payables and receivables not equal ";




                    //if (pReturnedMessage == "" && checkException == null)
                    //    checkException = objCCustomizedDBCall.Mesco_Operation_Closing("Mesco_Operation_Closing", Convert.ToInt32(ArrOperationIDs[i]), WebSecurity.CurrentUserId, true, lastDayOfMonth);

                    //if (pReturnedMessage == "" && checkException == null)
                    //{

                    //    string fname = System.Web.Hosting.HostingEnvironment.MapPath("~/");
                    //    if (fname.Contains("IST\\WEBPublish\\Forwarding MESCO\\ForwardingMesco"))
                    //    {
                    //        pReturnedMessage += await objDynamicsCRMQR.UpdateDynamicsQuotations(Convert.ToInt32(ArrOperationIDs[i]));
                    //    }
                    //}



                    if (pReturnedMessage == "" && checkException == null && !closeOperationData.pIsJvClose)
                    {
                        updateClause = " OperationStageID = " + closeOperationData.pOperationStageID.ToString();
                        //if(objCvwOperations.lstCVarvwOperations[0].TransportType == 1 && (objCvwOperations.lstCVarvwOperations[0].ShipmentType == 2 || objCvwOperations.lstCVarvwOperations[0].ShipmentType == 5))
                        //{
                        //    if (objCvwOperations.lstCVarvwOperations[0].DirectionType == 1)
                        //        updateClause += (pOperationStageID == ClosedQuoteAndOperStageID ? " , CloseDate = '" + objCvwOperations.lstCVarvwOperations[0].ExpectedArrival.ToString("yyyy/MM/dd") +"'": "");//pOperationStageID == 110 i.e. Closed
                        //    else if (objCvwOperations.lstCVarvwOperations[0].DirectionType == 2)
                        //        updateClause += (pOperationStageID == ClosedQuoteAndOperStageID ? " , CloseDate =  '"+ objCvwOperations.lstCVarvwOperations[0].ExpectedDeparture.ToString("yyyy/MM/dd") + "'" : "");//pOperationStageID == 110 i.e. Closed
                        //}
                        //else
                        //    updateClause += (pOperationStageID == ClosedQuoteAndOperStageID ? " , CloseDate = GETDATE() " : "");//pOperationStageID == 110 i.e. Closed

                        closeOperationData.pCloseDate = lastDayOfMonth.ToString("yyyy/MM/dd");
                        updateClause += " , CloseDate = '" + closeOperationData.pCloseDate + "'";//pOperationStageID == 110 i.e. Closed
                        updateClause += " , ModificatorUserID = " + CurrentUserID;
                        updateClause += " , ModificationDate = GETDATE() ";
                        updateClause += "   WHERE ID IN (" + ArrOperationIDs[i].ToString() + ") OR MasterOperationID IN (" + ArrOperationIDs[i].ToString() + ")";

                        COperations objCOperations = new COperations();
                        checkException = objCOperations.UpdateList(updateClause);
                        if (checkException != null)
                            pReturnedMessage = checkException.Message;
                    }

                    if (checkException != null)
                    {
                        pReturnedMessage = checkException.Message;
                    }




                    if (pReturnedMessage != "")
                    {
                        return new object[] {
                         pReturnedMessage
                          };
                    }

                }
             
            }
            else
            {
                updateClause = " OperationStageID = " + closeOperationData.pOperationStageID.ToString();
                updateClause += (closeOperationData.pOperationStageID == ClosedQuoteAndOperStageID ? " , CloseDate = GETDATE() " : "");//pOperationStageID == 110 i.e. Closed
                updateClause += (closeOperationData.pOperationStageID == OpenQuoteAndOperStageID ? " , CloseDate = '" + closeOperationData.pCloseDate + "'" : "");//pOperationStageID == 110 i.e. Closed
                updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                updateClause += " , ModificationDate = GETDATE() ";
                updateClause += "            WHERE ID IN (" + closeOperationData.pOperationIDs_ToSet.ToString() + ") OR MasterOperationID IN (" + closeOperationData.pOperationIDs_ToSet.ToString() + ")";

                COperations objCOperations = new COperations();
                checkException = objCOperations.UpdateList(updateClause);
                if (checkException != null)
                    pReturnedMessage = checkException.Message;
                //else
                //{
                //    CDefaults objCDefaults = new CDefaults();
                //    objCDefaults.GetListPaging(1, 1, "", "ID", out _RowCount);
                //}
            }



            return new object[] {
                pReturnedMessage
            };
        }


        private static readonly SemaphoreSlim _taskLock = new SemaphoreSlim(1, 1);

        [HttpGet, HttpPost]
        public async Task<object[]> UpdateClosedOperationsInDynamic(CRMCloseData cRMCloseData)
        {
            if (!await _taskLock.WaitAsync(0)) 
            {
                return new object[] { "Task is already running. Please wait..." };
            }

            try
            {
                Exception checkException = null;
                int _RowCount = 0;
                DynamicsCRMController objDynamicsCRMQR = new DynamicsCRMController();
                string pReturnedMessage = "";
                CvwOperationsForClosing objCvwOperationsForClosing = new CvwOperationsForClosing();

                checkException = objCvwOperationsForClosing.GetListPaging(99999, 1, cRMCloseData.pWhereClause, "ID DESC", out _RowCount);

                if (checkException == null && pReturnedMessage == "")
                {
                    foreach (var operation in objCvwOperationsForClosing.lstCVarvwOperationsForClosing)
                    {
                        pReturnedMessage += await objDynamicsCRMQR.UpdateDynamicsQuotationsAll(Convert.ToInt32(operation.ID));
                    }
                }

                return new object[] { pReturnedMessage };
            }
            finally
            {
                _taskLock.Release();
            }
        }


        [HttpGet, HttpPost]
        public object[] CreateJVs()
        {
            Exception checkException = null;
        
            string pReturnedMessage = "";

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            var OperationList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(@"select ID,CloseDate  from Operations where  OperationStageID=120 and BLType <> 2
                      and ID not in (select jv.TransID from A_JVNew jv where jv.Notes = 'CloseOperation')
                        order by Operations.OpenDate", typeof(CVarOperations)).Cast<CVarOperations>().ToList();

            foreach (var operation in OperationList)
            {
                checkException = objCCustomizedDBCall.Mesco_Operation_Closing("Mesco_Operation_Closing",Convert.ToInt32(operation.ID), WebSecurity.CurrentUserId, true, operation.CloseDate);

                if (checkException != null)
                {
                    pReturnedMessage += checkException.Message + Environment.NewLine;
                }
                  
            }



            return new object[] {
                pReturnedMessage
            };

        }
    }


    public class CloseOperationData
    {

        public string pOperationIDs_ToSet { get; set; }
        public int pOperationStageID { get; set; }
        public string pCloseDate { get; set; }
        public bool pIsJvClose { get; set; }
        public int pYear { get; set; }
        public int pMonth { get; set; }


       
    








    }
    public class CRMCloseData
    {

        public string pWhereClause { get; set; }
    












    }


}
