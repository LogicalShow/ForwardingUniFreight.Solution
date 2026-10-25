using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Web.Mvc;
//using System.Web.Script.Serialization;
using WebMatrix.WebData;
using System.Net.Mail;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_FollowUp.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;

namespace Forwarding.MvcApp.Controllers.Administration.API_Settings
{
    public class DefaultsdirectlyController : Controller
    {

        [HttpGet]
        public ActionResult LoadAll(string pWhereClause)
        {
            int _RowCount = 0;
            int constPaymentTypeCheque = 20;
            //sendEmailViaWebApi();
            Exception checkException = new Exception();
            //PageDirectly objPageDirectly = new PageDirectly();
            //string _PageDirectly = objPageDirectly._PageDirectly;
            var PageDirectly = Session["PageDirectly"];

            CUsers objCUsers = new CUsers();
            objCUsers.UpdateList("HeartBeatDate=GETDATE() WHERE ID=" + WebSecurity.CurrentUserId);

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, pWhereClause, "ID", out _RowCount);

            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetList(" WHERE ID = " + WebSecurity.CurrentUserId); //i am sure i ve 1 row isa
            if (objCvwUsers.lstCVarvwUsers.Count > 0)
                objCvwDefaults.lstCVarvwDefaults[0].UserBranchID = objCvwUsers.lstCVarvwUsers[0].BranchID;

            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList("WHERE 1=1 ORDER BY Name");

            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetList("WHERE 1=1 ORDER BY Code");

            #region Delete alarms older than 3 months
            CEmail objCEmail = new CEmail();
            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
            checkException = objCEmailReceiver.DeleteList("WHERE EmailID IN (SELECT ID FROM Email WHERE DATEDIFF(DAY, SendingDate, getdate()) > 90)");
            checkException = objCEmail.DeleteList("WHERE DATEDIFF(DAY, SendingDate, getdate()) > 90");
            #endregion Delete alarms older than 3 months

            #region CRM Action Alarm
            CvwCRM_FollowUps objCvwCRM_FollowUps = new CvwCRM_FollowUps();
            objCvwCRM_FollowUps.GetList("WHERE IsAlarmSent=0 AND DATEDIFF(DAY, GETDATE(), NextStepDate)<=AlarmDays" + "\n"
                + " AND DATEDIFF(DAY, GETDATE(), NextStepDate)>=0 AND SalesRep=" + WebSecurity.CurrentUserId);
            {
                for (int i = 0; i < objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps.Count; i++)
                {
                    CVarEmail objCVarEmail = new CVarEmail();
                    objCVarEmail.Subject = "Action For " + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].Name;
                    objCVarEmail.Body = "Action: '" + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].Action + "\n"
                        + "Sales Lead: " + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].Name + "\n"
                        + "Action Date: " + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].ActionDate.ToShortDateString() + "\n";
                    objCVarEmail.QuotationRouteID = 0;
                    objCVarEmail.SenderUserID = objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].ModifatorUserID;
                    objCVarEmail.SendingDate = DateTime.Now;
                    objCEmail.lstCVarEmail.Add(objCVarEmail);
                    Exception checkException_temp = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                    if (checkException_temp == null) //add to EmailReceivers
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].SalesRep;
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                        checkException_temp = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        if (checkException_temp == null)
                        {
                            CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
                            objCCRM_FollowUp.UpdateList("IsAlarmSent=1 WHERE ID=" + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].ID);
                        }

                    }
                }
            }
            #endregion CRM Action Alarm

            #region Send Department Notifications
            CvwServiceDepartment objCvwServiceDepartment = new CvwServiceDepartment();
            //ReThink: hint Select On by Dates from vwOperations --> select from Service Department that dates-->send to users belonging to that department
            checkException = objCvwServiceDepartment.GetListPaging(999999, 1, "WHERE DepartmentID=" + objCvwUsers.lstCVarvwUsers[0].DepartmentID, "NotificationDateOption,ViewOrder", out _RowCount);
            for (int i = 0; i < objCvwServiceDepartment.lstCVarvwServiceDepartment.Count; i++)
            {
                //TODO: Send Email to all next role deparment users
            }
            #endregion Send Department Notifications

            CvwEmailReceiver objCvwEmailReceiver = new CvwEmailReceiver();
            objCvwEmailReceiver.GetList("WHERE IsAlarm=1 AND ReceiverUserID=" + WebSecurity.CurrentUserId.ToString() + " ORDER BY ID DESC");

            CvwAccPayment objCvwUnderCollectCheques = new CvwAccPayment();
            objCvwUnderCollectCheques.GetListPaging(1000, 1, "WHERE IsDeleted=0 AND PaymentTypeID=" + constPaymentTypeCheque.ToString() + " AND IsApproved=0 AND IsRefused=0 AND CAST(DueDate AS date) <= GETDATE()", "DueDate", out _RowCount);

            CPorts objCAirPorts = new CPorts();
            objCAirPorts.GetList("WHERE CountryID=" + objCvwDefaults.lstCVarvwDefaults[0].DefaultCountryID + " AND IsAir=1 ORDER By Name");

            return Json(new
            {
                v1 = objCvwDefaults.lstCVarvwDefaults[0] //data[0]
                ,
                objCvwBranches.lstCVarvwBranches //data[1]
                ,
                objCvwCurrencies.lstCVarvwCurrencies //data[2]
                ,
                v2 = WebSecurity.CurrentUserId.ToString() //data[3]
                ,
                v3 = objCvwUsers.lstCVarvwUsers.Count > 0 ? objCvwUsers.lstCVarvwUsers[0].Name : "" //data[4]
                ,
                objCvwEmailReceiver.lstCVarvwEmailReceiver //data[5]
                ,
                objCvwUnderCollectCheques.lstCVarvwAccPayment //data[6]
                ,
                objCAirPorts.lstCVarPorts //data[7]
                ,
                v4 = objCvwUsers.lstCVarvwUsers[0] //data[8] 
                ,
                PageDirectly = PageDirectly
            }, JsonRequestBehavior.AllowGet);

        }

        /**************I commented the this Update fn and used the previous one coz when using .UpdateList with Arabic letters it gives ?????? ******************/
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, String pCompanyName, String pCompanyLocalName, Int32 pBranchID, String pAddressLine1
            , String pAddressLine2, String pAddressLine3, String pAddressLine4, String pAddressLine5, String pPhones, String pFaxes
            , String pEmail, String pWebsite, String pBankName, String pAccountName, String pBankAddress, String pSwiftCode
            , String pAccountNumber, string pTaxNumber, int pImportOceanDays, int pImportAirDays, int pImportInlandDays
            , int pExportOceanDays, int pExportAirDays, int pExportInlandDays, int pDomesticOceanDays, int pDomesticAirDays
            , int pDomesticInlandDays, int pSmallBusinessBelow, int pMediumBusinessBelow, bool pIsDepartmentOption
            , int pCurrencyID, int pForeignCurrencyID, string pCommericalRegNo, string pVatIDNo
            , string pInvoiceLeftPosition, string pInvoiceLeftSignature, string pInvoiceMiddlePosition, string pInvoiceMiddleSignature
            , string pInvoiceRightPosition, string pInvoiceRightSignature)
        {
            bool _result = false;
            string pUpdateClause = "";

            pUpdateClause = " CompanyName = N'" + pCompanyName + "'";
            pUpdateClause += " , CompanyLocalName = N'" + pCompanyLocalName.ToString() + "' ";
            pUpdateClause += " , BranchID = " + pBranchID.ToString();
            pUpdateClause += " , CurrencyID = " + pCurrencyID.ToString();
            pUpdateClause += " , ForeignCurrencyID = " + pForeignCurrencyID.ToString();

            pUpdateClause += " , AddressLine1 = " + (pAddressLine1 == "" ? " NULL " : "N'" + pAddressLine1 + "'");
            pUpdateClause += " , AddressLine2 = " + (pAddressLine2 == "" ? " NULL " : "N'" + pAddressLine2 + "'");
            pUpdateClause += " , AddressLine3 = " + (pAddressLine3 == "" ? " NULL " : "N'" + pAddressLine3 + "'");
            pUpdateClause += " , AddressLine4 = " + (pAddressLine4 == "" ? " NULL " : "N'" + pAddressLine4 + "'");
            pUpdateClause += " , AddressLine5 = " + (pAddressLine5 == "" ? " NULL " : "N'" + pAddressLine5 + "'");
            pUpdateClause += " , Email = " + (pEmail == "" ? " NULL " : "N'" + pEmail + "'");
            pUpdateClause += " , Website = " + (pWebsite == "" ? " NULL " : "N'" + pWebsite + "'");
            pUpdateClause += " , Phones = " + (pPhones == "" ? " NULL " : "N'" + pPhones + "'");
            pUpdateClause += " , Faxes = " + (pFaxes == "" ? " NULL " : "N'" + pFaxes + "'");

            pUpdateClause += " , BankName = " + (pBankName == "" ? " NULL " : "N'" + pBankName + "'");
            pUpdateClause += " , AccountName = " + (pAccountName == "" ? " NULL " : "N'" + pAccountName + "'");
            pUpdateClause += " , BankAddress = " + (pBankAddress == "" ? " NULL " : "N'" + pBankAddress + "'");
            pUpdateClause += " , SwiftCode = " + (pSwiftCode == "" ? " NULL " : "N'" + pSwiftCode + "'");
            pUpdateClause += " , AccountNumber = " + (pAccountNumber == "" ? " NULL " : "N'" + pAccountNumber + "'");
            pUpdateClause += " , TaxNumber = " + (pTaxNumber == "" ? " NULL " : "N'" + pTaxNumber + "'");
            pUpdateClause += " , CommericalRegNo = " + (pCommericalRegNo == "" ? " NULL " : "N'" + pCommericalRegNo + "'");
            pUpdateClause += " , VatIDNo = " + (pVatIDNo == "" ? " NULL " : "N'" + pVatIDNo + "'");

            pUpdateClause += " , InvoiceLeftPosition = " + (pInvoiceLeftPosition == "0" ? " NULL " : "N'" + pInvoiceLeftPosition + "'");
            pUpdateClause += " , InvoiceLeftSignature = " + (pInvoiceLeftSignature == "0" ? " NULL " : "N'" + pInvoiceLeftSignature + "'");
            pUpdateClause += " , InvoiceMiddlePosition = " + (pInvoiceMiddlePosition == "0" ? " N'' " : "N'" + pInvoiceMiddlePosition + "'");
            pUpdateClause += " , InvoiceMiddleSignature = " + (pInvoiceMiddleSignature == "0" ? " N'' " : "N'" + pInvoiceMiddleSignature + "'");
            pUpdateClause += " , InvoiceRightPosition = " + (pInvoiceRightPosition == "0" ? " N'' " : "N'" + pInvoiceRightPosition + "'");
            pUpdateClause += " , InvoiceRightSignature = " + (pInvoiceRightSignature == "0" ? " N'' " : "N'" + pInvoiceRightSignature + "'");

            pUpdateClause += " , ImportOceanDays = " + pImportOceanDays.ToString();
            pUpdateClause += " , ImportAirDays   = " + pImportAirDays.ToString();
            pUpdateClause += " , ImportInlandDays   = " + pImportInlandDays.ToString();
            pUpdateClause += " , ExportOceanDays = " + pExportOceanDays.ToString();
            pUpdateClause += " , ExportAirDays   = " + pExportAirDays.ToString();
            pUpdateClause += " , ExportInlandDays   = " + pExportInlandDays.ToString();
            pUpdateClause += " , DomesticOceanDays = " + pDomesticOceanDays.ToString();
            pUpdateClause += " , DomesticAirDays   = " + pDomesticAirDays.ToString();
            pUpdateClause += " , DomesticInlandDays   = " + pDomesticInlandDays.ToString();

            pUpdateClause += " , SmallBusinessBelow   = " + pSmallBusinessBelow.ToString();
            pUpdateClause += " , MediumBusinessBelow   = " + pMediumBusinessBelow.ToString();
            pUpdateClause += " , IsDepartmentOption = " + (pIsDepartmentOption ? "1" : "0");

            pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
            pUpdateClause += " , ModificationDate = GETDATE() ";

            pUpdateClause += " WHERE ID = " + pID.ToString();

            CDefaults objCDefaults = new CDefaults();
            Exception checkException = objCDefaults.UpdateList(pUpdateClause);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
            {
                //CCurrencies objCCurrencies = new CCurrencies();
                //pUpdateClause = "";
                //pUpdateClause += " CurrentExchangeRate = 1 ";
                //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                //pUpdateClause += " , ModificationDate = GETDATE() ";
                //pUpdateClause += " WHERE ID = " + pCurrencyID;
                //objCCurrencies.UpdateList(pUpdateClause);
                CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
                pUpdateClause = "";
                pUpdateClause += " ExchangeRate = 1 ";
                pUpdateClause += " , FromDate='19800101' ";
                pUpdateClause += " , ToDate='2099-12-31 23:59:59.000' ";
                pUpdateClause += " WHERE Currency_ID = " + pCurrencyID;
                objCCurrencyDetails.UpdateList(pUpdateClause);
                _result = true;
            }
            return _result;
        }

        //private void sendEmailViaWebApi()
        //{
        //    string subject = "Email Subject";
        //    string body = "Email body";
        //    string FromMail = "sherif@istegy.com";
        //    string emailTo = "sherif@istegy.com";
        //    MailMessage mail = new MailMessage();
        //    SmtpClient SmtpServer = new SmtpClient("mail.reckonbits.com.pk");
        //    mail.From = new MailAddress(FromMail);
        //    mail.To.Add(emailTo);
        //    mail.Subject = subject;
        //    mail.Body = body;
        //    SmtpServer.Port = 25;
        //    SmtpServer.Credentials = new System.Net.NetworkCredential("sherif@istegy.com", "123456");
        //    SmtpServer.EnableSsl = false;
        //    SmtpServer.Send(mail);
        //}
        //private void sendEmailViaWebApi()
        //{
        //    string subject = "Email Subject";
        //    string body = "Email body";
        //    string FromMail = "sherif@istegy.com";
        //    string emailTo = "sherif@istegy.com";
        //    MailMessage mail = new MailMessage();

        //    SmtpClient SmtpServer = new SmtpClient();
        //    SmtpServer.UseDefaultCredentials = true;

        //    mail.From = new MailAddress(FromMail);
        //    mail.To.Add(emailTo);
        //    mail.Subject = subject;
        //    mail.Body = body;
        //    SmtpServer.Port = 25;
        //    //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
        //    //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
        //    SmtpServer.Credentials = new System.Net.NetworkCredential("sherif@istegy.com", "123456");
        //    SmtpServer.EnableSsl = false;
        //    SmtpServer.Send(mail);
        //}

        [HttpGet, HttpPost]
        public object[] sendEmailViaWebApi()
        {
            string subject = "Email Subject";
            string body = "Dear Sir, your cargo is at \n https://www.google.com/maps/?q=28.766621599999997,29.232078399999995" + " Latitude: 28.766621599999997 °, Longitude: 29.232078399999995 °</a>";
            string FromMail = "noreply-Rename@istegy.com";
            string emailTo = "sherifanwar@yahoo.com";
            string CC = "sherifanwar80@gmail.com";
            MailMessage mail = new MailMessage();

            SmtpClient SmtpServer = new SmtpClient();
            SmtpServer.UseDefaultCredentials = true;
            //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);

            mail.From = new MailAddress(FromMail);
            mail.To.Add(emailTo);
            mail.CC.Add(CC);
            mail.Subject = subject;
            mail.Body = body;
            mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
            //SmtpServer.Port = 25;
            //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
            //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
            SmtpServer.Host = "smtpout.secureserver.net";
            SmtpServer.Credentials = new System.Net.NetworkCredential(FromMail, "123456");
            SmtpServer.EnableSsl = true;//false
            SmtpServer.Send(mail);

            return new object[] { };
        }


    } //of class

} //of controller
