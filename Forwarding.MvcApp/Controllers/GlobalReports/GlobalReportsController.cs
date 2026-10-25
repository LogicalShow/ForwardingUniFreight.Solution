using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FastReport;
using FastReport.Web;
using System.IO;
using System.Web.Http;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Shipping.MvcApp.ReportMainClass
{
    public class GlobalReportsController : Controller
    {


        public void LoginUserForGlobal()
        {
            if (WebSecurity.CurrentUserId == 0 || WebSecurity.CurrentUserId == -1)
            {
                WebSecurity.ResetPassword(WebSecurity.GeneratePasswordResetToken("GUEST"), "123456");
                var IsLogged = WebSecurity.Login("GUEST", "123456", false);
                //int CurrentUserID = WebSecurity.GetUserId("GUEST");
            }
        }


        [System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        public ActionResult ViewInvoiceReport([FromBody] GlobalReport pGlobalReport)
        {
            LoginUserForGlobal();
            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();


            string[] str_arr_Values = pGlobalReport.arr_Values.Split(',').ToArray();



            //------------------------------------ The Returned View needs these Parameters to Draw The Report

            ViewBag.txtFromDate = str_arr_Values[0] ;
            ViewBag.txtToDate = str_arr_Values[1] ;
            ViewBag.txtFromDueDate = str_arr_Values[2] ;
            ViewBag.txtToDueDate = str_arr_Values[3] ;

            ViewBag.slPartnerType = str_arr_Values[4];
            ViewBag.slPartner = str_arr_Values[5];
            ViewBag.cbAging = bool.Parse(str_arr_Values[6]);

            //ViewBag.txtFromDate = str_arr_Values[0];
            //ViewBag.txtToDate = str_arr_Values[1];
            //ViewBag.txtFromDueDate = str_arr_Values[2];
            //ViewBag.txtToDueDate = str_arr_Values[3];
            //ViewBag.cbGroupByBranch = bool.Parse(str_arr_Values[4] );
            //ViewBag.cbIncludeDetails = bool.Parse(str_arr_Values[5] );
            //ViewBag.cbGroupByBranch = bool.Parse(str_arr_Values[6] );
            //ViewBag.cbSOA = bool.Parse( str_arr_Values[7] );
            //ViewBag.cbCustomer = bool.Parse(str_arr_Values[8] );
            //ViewBag.cbCustomerReference = bool.Parse(str_arr_Values[9] );
            //ViewBag.cbOperationCode = bool.Parse(str_arr_Values[10] );
            //ViewBag.cbInvoiceDate = bool.Parse(str_arr_Values[11] );
            //ViewBag.cbDueDate = bool.Parse(str_arr_Values[12] );
            //ViewBag.cbWithoutVAT = bool.Parse(str_arr_Values[13]) ;
            //ViewBag.cbWithoutDiscount = bool.Parse(str_arr_Values[14] );
            //ViewBag.cbPaidAmount = bool.Parse(str_arr_Values[15]) ;
            //ViewBag.cbRemaining = bool.Parse(str_arr_Values[16] );
            //ViewBag.cbOperationDate = bool.Parse(str_arr_Values[17] );
            //ViewBag.cbPaymentDate = bool.Parse(str_arr_Values[18] );
            //ViewBag.cbDaysDifference = bool.Parse(str_arr_Values[19] );
            //ViewBag.cbAging = bool.Parse(str_arr_Values[20]) ;
            //ViewBag.lbl_filter_import= str_arr_Values[21] ;
            //ViewBag.lbl_filter_export= str_arr_Values[22] ;
            //ViewBag.lbl_filter_domestic= str_arr_Values[23] ;
            //ViewBag.lbl_filter_ocean= str_arr_Values[24] ;
            //ViewBag.lbl_filter_air= str_arr_Values[25] ;
            //ViewBag.lbl_filter_inland= str_arr_Values[26] ;
            //ViewBag.lbl_filter_direct= str_arr_Values[27] ;
            //ViewBag.lbl_filter_house= str_arr_Values[28] ;
            //ViewBag.lbl_filter_master= str_arr_Values[29] ;
            //ViewBag.txtSearchOperation = str_arr_Values[30] ;
            //ViewBag.txtCustomerReference = str_arr_Values[31] ;
            //ViewBag.txtSearchInvoice = str_arr_Values[32] ;
            ////document.getElementById("hReadySlBranches").options

            //ViewBag.slPartnerType = str_arr_Values[33] ;
            //ViewBag.slPartnerType_text = str_arr_Values[34] ;
            //ViewBag.slPartner = str_arr_Values[35] ;
            //ViewBag.slPartner_text = str_arr_Values[36] ;
            //ViewBag.slBranch = str_arr_Values[37] ;
            //ViewBag.slBranch_text = str_arr_Values[38] ;
            //ViewBag.slCurrency = str_arr_Values[39] ;
            //ViewBag.slCurrency_text = str_arr_Values[40] ;
            //ViewBag.slApprovalStatus = str_arr_Values[41] ;
            //ViewBag.slApprovalStatus_text = str_arr_Values[42] ;
            //ViewBag.slDiscountType = str_arr_Values[43] ;
            //ViewBag.slDiscountType_text = str_arr_Values[44] ;
            //ViewBag.slVATType = str_arr_Values[45] ;
            //ViewBag.slVATType_text = str_arr_Values[46] ;
            //ViewBag.slInvoiceType = str_arr_Values[47] ;
            //ViewBag.slInvoiceType_text = str_arr_Values[48] ;
            //ViewBag.slInvoiceStatus = str_arr_Values[49] ;
            //ViewBag.slInvoiceStatus_text = str_arr_Values[50] ;


            return View("~/Views/GlobalReports/Global_AccountingReports/InvoicesReports_Global.cshtml");
        }


        [System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        public ActionResult ViewPayablesReport([FromBody] GlobalReport pGlobalReport)
        {
            LoginUserForGlobal();
            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();


            string[] str_arr_Values = pGlobalReport.arr_Values.Split(',').ToArray();
            //------------------------------------ The Returned View needs these Parameters to Draw The Report

            ViewBag.txtFromDate = str_arr_Values[0];
            ViewBag.txtToDate = str_arr_Values[1];
            ViewBag.txtFromIssueDate = str_arr_Values[2];
            ViewBag.txtToIssueDate = str_arr_Values[3];
            ViewBag.cbWithoutVAT = bool.Parse(str_arr_Values[4]);
            ViewBag.cbWithoutDiscount = bool.Parse(str_arr_Values[5]);
            ViewBag.cbAging = bool.Parse(str_arr_Values[6]);
            ViewBag.lbl_filter_import = str_arr_Values[7];
            ViewBag.lbl_filter_export = str_arr_Values[8];
            ViewBag.lbl_filter_domestic = str_arr_Values[9];
            ViewBag.lbl_filter_ocean = str_arr_Values[10];
            ViewBag.lbl_filter_air = str_arr_Values[11];
            ViewBag.lbl_filter_inland = str_arr_Values[12];
            ViewBag.lbl_filter_direct = str_arr_Values[13];
            ViewBag.lbl_filter_house = str_arr_Values[14];
            ViewBag.lbl_filter_master = str_arr_Values[15];
            ViewBag.txtSearch = str_arr_Values[16];
            ViewBag.slPartnerType = str_arr_Values[17];
            ViewBag.slPartnerType_text = str_arr_Values[18];
            ViewBag.slPartner = str_arr_Values[19];
            ViewBag.slPartner_text = str_arr_Values[20];
            ViewBag.slCurrency = str_arr_Values[21];
            ViewBag.slCurrency_text = str_arr_Values[22];
            ViewBag.slApprovalStatus = str_arr_Values[23];
            ViewBag.slApprovalStatus_text = str_arr_Values[24];
            ViewBag.slDiscountType = str_arr_Values[25];
            ViewBag.slDiscountType_text = str_arr_Values[26];
            ViewBag.slVATType = str_arr_Values[27];
            ViewBag.slVATType_text = str_arr_Values[28];
            ViewBag.slChargeType = str_arr_Values[29];
            ViewBag.slChargeType_text = str_arr_Values[30];
            ViewBag.slPayableStatus = str_arr_Values[31];
            ViewBag.slPayableStatus_text = str_arr_Values[32];
            return View("~/Views/GlobalReports/Global_AccountingReports/PayablesReport_Global.cshtml");
        }

        [System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        public ActionResult ViewOperAccountStatement([FromBody] GlobalReport pGlobalReport)
        {
            LoginUserForGlobal();
            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();


            string[] str_arr_Values = pGlobalReport.arr_Values.Split(',').ToArray();
            //------------------------------------ The Returned View needs these Parameters to Draw The Report

            ViewBag.txtFromDate = str_arr_Values[0];
            ViewBag.txtToDate = str_arr_Values[1];
            ViewBag.hDefaultUnEditableCompanyName = str_arr_Values[2];
            ViewBag.slCurrency = str_arr_Values[3];
            ViewBag.slCurrency_text = str_arr_Values[4];
            ViewBag.slSubAccountGroup = str_arr_Values[5];
            ViewBag.slSubAccountGroup_text = str_arr_Values[6];
            ViewBag.slSubAccount = str_arr_Values[7];
            ViewBag.slSubAccount_text = str_arr_Values[8];
            ViewBag.cbIsClientStatmentEn = bool.Parse(str_arr_Values[9]);
            ViewBag.cbIsAgentStatmentEn = bool.Parse(str_arr_Values[10]);
            ViewBag.cbIsDetails = bool.Parse(str_arr_Values[11]);
            ViewBag.cbHeaderLogo = bool.Parse(str_arr_Values[12]);
            ViewBag.cbSuppressForZeroes = bool.Parse(str_arr_Values[13]);

            //-
            return View("~/Views/GlobalReports/Global_AccountingReports/OperAccountStatement_Global.cshtml");
        }
    }




    public class GlobalReport
    {

        public string arr_Values { get; set; }
        public String pTitle { get; set; }
        public String pScriptName { get; set; }
    }
}

