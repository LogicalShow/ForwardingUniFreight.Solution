using Forwarding.MvcApp.Controllers.Accounting.API_MasterData;
using Forwarding.MvcApp.Controllers.NoAccess;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.CustomizedSPCall;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Reports
{
    public class DynamicpostController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            //Int64 BatchNumber = 0;
            //CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //BatchNumber = Convert.ToInt64(objCCustomizedDBCall.CallStringFunction("select isnull(max(BatchNumber),0) from A_JVNewBatchLog "));

            int _RowCount = 0;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CTreasury objCSafes = new CTreasury();
            string pSafesWhereClause = " WHERE 1=1 ";


            var ServicesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,NAME FROM NoAccessServices", typeof(CVarNoAccessServices)).Cast<CVarNoAccessServices>().ToList();
            var DirectionList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM NoAccessDirectionTypes", typeof(cVarNoAccessDirectionTypes)).Cast<cVarNoAccessDirectionTypes>().ToList();
            CSalesmen objCSalesmen = new CSalesmen();
            objCSalesmen.GetList(" Where 1=1 ");

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetItem(55);
            //objCSystemOptions.GetList(" WHERE OptionID IN (55,4049) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
            if (objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                pSafesWhereClause = " JOIN VW_Sec_UserSafes USF ON ID =  USF._SafeID " + pSafesWhereClause + "  AND USF._UserID=" + WebSecurity.CurrentUserId;
            }

            objCSafes.GetListPaging(9999, 1, pSafesWhereClause, "Name", out _RowCount);

            CInvoiceTypes objCInvoiceTypes = new CInvoiceTypes();
            objCInvoiceTypes.GetListPaging(9999, 1, "Where IsMainInvoice=1 and Code <> 'DRAFT'", "Name", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                  serializer.Serialize(objCSafes.lstCVarTreasury) //0
                , serializer.Serialize(ServicesList)  //1 
                , serializer.Serialize(DirectionList) //2
                , serializer.Serialize(objCSalesmen.lstCVarSalesmen) //3
                , serializer.Serialize(objCInvoiceTypes.lstCVarInvoiceTypes) //4
            };
        }

        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pFromDate, string pToDate)
        {
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            Int64 BatchNumber = 0;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            BatchNumber = Convert.ToInt64(objCCustomizedDBCall.CallStringFunction("CreateBatchForJVs " + WebSecurity.CurrentUserId));

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                BatchNumber
            };
        }

        [HttpGet, HttpPost]
        public object[] GetRegenerateJVs(DateTime pPromDate, DateTime pToDate, string pJvTypeIds, string pSafeId,
            string pDirectionId, string pServiceId, string pInvoiceTypeId, string pJVNo)
        {
            //Int64 BatchNumber = 0;
            //CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //BatchNumber = Convert.ToInt64(objCCustomizedDBCall.CallStringFunction("select isnull(max(BatchNumber),0) from A_JVNewBatchLog "));
            string _ErrorMsg = "";
            int _RowCount = 0;
            Exception checkException = null;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            if (pPromDate.Date != pToDate.Date)
            {
                _ErrorMsg = "From date and to date must be the same";
            }
            if (pJVNo == "" || pJVNo == null)
            {
                DateTime pCurrentDate = DateTime.Now;
                TimeSpan currentTime = pCurrentDate.TimeOfDay;

                bool isNightTime = (currentTime >= TimeSpan.FromHours(18)) || (currentTime < TimeSpan.FromHours(6));

                // Example usage:
                if (!isNightTime)
                {
                    _ErrorMsg = "Time must be between 6 PM and 6 AM";
                }

            }

            if (_ErrorMsg == "")
            {

                CvwA_GetRegenerateJVs objCvwA_GetRegenerateJVs = new CvwA_GetRegenerateJVs();
                checkException = objCvwA_GetRegenerateJVs.GetList(pPromDate, pToDate, pJvTypeIds, pSafeId, pDirectionId, pServiceId, pInvoiceTypeId, pJVNo);

                if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs.Count == 0)
                    _ErrorMsg += "No record found";

                if (checkException != null)
                    _ErrorMsg += " " + checkException.Message;

                for (int i = 0; i < objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs.Count; i++)
                {
                    if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "Invoice")
                    {
                        checkException = objCCustomizedDBCall.SP_ProcWithException("Mesco_Invoice_Posting " + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + "," + WebSecurity.CurrentUserId + ",1,1");
                    }
                    else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "A_PaymentRequest")
                    {
                        checkException = objCCustomizedDBCall.SP_ProcWithException("A_PaymentRequestJVNew_Posting " + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + "," + WebSecurity.CurrentUserId + ",1,1");
                    }
                    else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "A_PaymentRequestCollected")
                    {
                        checkException = objCCustomizedDBCall.SP_ProcWithException("A_PaymentRequestCollectedJVNew_Posting " + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + "," + WebSecurity.CurrentUserId + ",1,1");
                    }
                    else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "CloseOperation")
                    {
                        checkException = objCCustomizedDBCall.SP_ProcWithException("Mesco_Operation_Closing " + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + "," + WebSecurity.CurrentUserId + ",1,null,1");
                    }
                    else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "NawaleenDiff")
                    {
                        checkException = objCCustomizedDBCall.SP_ProcWithException("Mesco_Operation_NawaleenDiff " + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + "," + WebSecurity.CurrentUserId + ",1,null,1");
                    }
                    else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "CreditNote")
                    {
                        checkException = objCCustomizedDBCall.SP_ProcWithException("Mesco_CreditNote_Posting " + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + "," + WebSecurity.CurrentUserId + ",1,1");
                    }
                    else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "A_Voucher")
                    {
                        if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].VoucherType == 10)
                            checkException = objCCustomizedDBCall.SP_ProcWithException("A_CashInVouchersNew_Posting " + "'," + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + ",'" + ",null," + WebSecurity.CurrentUserId + ",1");
                        else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].VoucherType == 20)
                            checkException = objCCustomizedDBCall.SP_ProcWithException("A_CashOutVouchersNew_Posting " + "'," + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + ",'" + ",null," + WebSecurity.CurrentUserId + ",1");
                        else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].VoucherType == 30)
                            checkException = objCCustomizedDBCall.SP_ProcWithException("A_ChequeInVouchersNew_Posting " + "'," + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + ",'" + ",null," + WebSecurity.CurrentUserId + ",1");
                        else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].VoucherType == 40)
                            checkException = objCCustomizedDBCall.SP_ProcWithException("A_ChequeOutVouchersNew_Posting " + "'," + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + ",'" + ",null," + WebSecurity.CurrentUserId + ",1");
                    }
                    else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "A_Voucher_Multi")
                    {
                         checkException = objCCustomizedDBCall.SP_ProcWithException("A_CashInVouchersNew_Posting_MultiCurrency " + "'," + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + ",'" + ",null," + WebSecurity.CurrentUserId + ",1");
                    }
                    else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "A_PaymentRequestSett")
                    {
                        checkException = objCCustomizedDBCall.SP_ProcWithException("A_PaymentRequestSettJVNew_Posting "  + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID  + ",null," + WebSecurity.CurrentUserId + ",1");
                    }
                    else if (objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].Notes == "DebitNote")
                    {
                        checkException = objCCustomizedDBCall.SP_ProcWithException("Mesco_DebitNote_Posting " + objCvwA_GetRegenerateJVs.lstCVarvwA_GetRegenerateJVs[i].TransID + "," + WebSecurity.CurrentUserId + ",1,1");
                    }



                    if (checkException != null)
                        _ErrorMsg += checkException.Message.Split(new[] { "\r\n" }, StringSplitOptions.None)[0];



                }
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
              _ErrorMsg
            };
        }

    }
}
