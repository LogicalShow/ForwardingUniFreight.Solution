using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using MoreLinq;
using System;
using System.Linq;
using System.Net.Mail;
using System.Web.Mvc;
using System.Web.Security;
using System.Web.Services.Description;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Index()
        {
            ////////var passwordtoken = WebSecurity.GeneratePasswordResetToken("Admin");
            ////////WebSecurity.ResetPassword(passwordtoken, "123456");
            //Session["UserID"] = "1"; // ex. 
            return View();
        }

        public ActionResult Logout()
        {
            CUsers objCUsers = new CUsers();
            objCUsers.UpdateList("HeartBeatDate='20150101' WHERE ID=" + WebSecurity.CurrentUserId);

            WebSecurity.Logout();

            FormsAuthentication.SignOut();
            FormsAuthentication.RedirectToLoginPage();
            ////Response.Redirect("Login/Index");
            ////return View();
            //Session.Abandon();

            //// clear authentication cookie
            //HttpCookie cookie1 = new HttpCookie(FormsAuthentication.FormsCookieName, "");
            //cookie1.Expires = DateTime.Now.AddYears(-1);
            //Response.Cookies.Add(cookie1);

            //// clear session cookie (not necessary for your current problem but i would recommend you do it anyway)
            //HttpCookie cookie2 = new HttpCookie("ASP.NET_SessionId", "");
            //cookie2.Expires = DateTime.Now.AddYears(-1);
            //Response.Cookies.Add(cookie2);

            return View("Index");
        }

        [HttpGet]
        public ActionResult CheckIsValidUser()
        {
            if (!WebSecurity.Initialized)
            {
                WebSecurity.InitializeDatabaseConnection("ConnectionString", "Users", "ID", "Username", autoCreateTables: false);
            }
            return View();
        }

        [HttpPost]
        public string CheckIsValidUser(String pUserName, String pPassword, string pUrl)
        {
            int _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            if (pUrl == "PageDirectly")
            {
                Session["PageDirectly"] = "1";
            }
            else
                Session["PageDirectly"] = "0";
            PageDirectly objPageDirectly = new PageDirectly();
            objPageDirectly._PageDirectly = "1";

            //var session = HttpContext. Current.Session;

            string result = "Enter valid username.";
            // if the user is inactive then set success to false to prevent him from logging
            //if (pUserName != null && pUserName != "")
            //{
            int userID = WebSecurity.GetUserId(pUserName.Trim().ToUpper());
            if (userID != -1) //i.e. user exists
            {
                int _RowCount = 0;
                CDefaults objCDefaults = new CDefaults();
                objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
                CvwUsers objCvwUsers = new CvwUsers();
                objCvwUsers.GetList("WHERE ID = " + userID.ToString());
                bool isInactive = objCvwUsers.lstCVarvwUsers[0].IsInactive;
                int UserCustomerID = objCvwUsers.lstCVarvwUsers[0].CustomerID;
                if (!isInactive)
                {
                    //WebSecurity.ResetPassword(WebSecurity.GeneratePasswordResetToken("ADMIN"), "123456");
                    int _DaysToExpire = 0;
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                        _DaysToExpire = (DateTime.Parse("02/02/2024") - DateTime.Now).Days;

                    bool isPasswordCorrect = WebSecurity.Login(pUserName, pPassword, false);
                    if (isPasswordCorrect)
                    {
                        if (userID == 4) //admin user id
                            result = "";
                        else if (_DaysToExpire < 0)
                            result = "Please, Contact IST.";
                        else if ((objCvwUsers.lstCVarvwUsers[0].NumberOfLoggedUsers >= objCvwUsers.lstCVarvwUsers[0].NumberOfAllowedSessions) && UserCustomerID == 0)
                            result = "Number of allowed sessions is reached.";
                        //else if (objCvwUsers.lstCVarvwUsers[0].LastUpdateHeartBeatInSecs < 300) //updated less than 5 minutes
                        //    result = "This user is already logged.";
                        else
                            result = "";

                        #region AKS
                        if (isPasswordCorrect)
                        {
                            InsertReapeatedJV(userID);
                        }
                        #endregion
                    }
                    else
                        result = "Invalid password.";
                }
                //// 0 if equal, -ve if later, +ve if earlier
                //if (DateTime.Compare(DateTime.Now, objCUsers.lstCVarUsers[0].ExpirationDate) > 0)
                //    success = false;
                //else
                //{
                //    success = ;
                //}
            }
            else
                result = "Invalid username.";
            //}

            #region Alarms
            if (CompanyName=="MES" && result=="")
            {
                //    SetNotficationAlarm(userID);
                //SendMonthUninvoicedReceivablesNotification();
            } else if (result == "" && (CompanyName=="OCE" || CompanyName =="CHM"))
            {
                SendImportOperationsATANotification();
            } else if (CompanyName=="AKS" && result == "")
            {
                SendOperationTrackingNotification();
            }else if(CompanyName == "MAN" && result == ""){
                //SendExportOperationsATDNotification();
                SendOperationChargesMissingAlarm();
            }
            else if (CompanyName == "TRI" && result == "")
            {
                //SendExportOperationsATDNotification();
                SendOperationsETANotification();
            }
            #endregion


            return result;
        }
        void InsertReapeatedJV(Int32 userID)
        {
            string strMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CvwA_JVRepeated objCvwA_JV = new CvwA_JVRepeated();
            CA_JVRepeated objCA_JVRepeated = new CA_JVRepeated();
            CA_JV objCA_JV = new CA_JV();
            CVarA_JV objCVarA_JV = new CVarA_JV();

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = "";

            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            checkException = objCA_JVRepeated.GetList("WHERE Posted=0 AND JVID IS NULL and DueDate <='" + DateTime.Now+"'");
            if (objCA_JVRepeated.lstCVarA_JVRepeated.Count>0)
            {
                for (int i = 0; i < objCA_JVRepeated.lstCVarA_JVRepeated.Count; i++)
                {
                    checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + objCA_JVRepeated.lstCVarA_JVRepeated[i].DueDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date ");

                    if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count == 0)
                        strMessage = "This fiscal year is not exist.";
                    else if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0 && objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period[0].Closed)
                        strMessage = "This fiscal year is closed.";
                    else
                    {
                        CA_JVDetailsRepeated objCA_JVRepeatedCurrency = new CA_JVDetailsRepeated();
                        objCA_JVRepeatedCurrency.GetList("where jv_id="+ objCA_JVRepeated.lstCVarA_JVRepeated[i].ID);
                        objCCurrencyDetails.GetList("WHERE Currency_ID=" + objCA_JVRepeatedCurrency.lstCVarA_JVDetailsRepeated[0].Currency_ID + " AND FromDate <='" + objCA_JVRepeated.lstCVarA_JVRepeated[i].DueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + objCA_JVRepeated.lstCVarA_JVRepeated[i].DueDate.ToString("yyyyMMdd") + "'");
                        if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 && objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate != 0)
                        {
                            #region Copying Header
                            CA_JVRepeated objCA_JVRepeatedInsert = new CA_JVRepeated();

                            checkException = objCA_JVRepeatedInsert.GetList("WHERE ID=" + objCA_JVRepeated.lstCVarA_JVRepeated[i].ID); // isa i am sure i ll get only one row
                            if (objCA_JVRepeatedInsert.lstCVarA_JVRepeated.Count > 0)
                            {
                                pNewCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", objCA_JVRepeatedInsert.lstCVarA_JVRepeated[0].DueDate, WebSecurity.CurrentUserId, objCA_JVRepeatedInsert.lstCVarA_JVRepeated[0].Journal_ID);

                                objCVarA_JV.ID = 0;
                                objCVarA_JV.ReceiptNo = objCA_JVRepeatedInsert.lstCVarA_JVRepeated[0].JVNo;
                                objCVarA_JV.RemarksHeader = "Repeated " + objCA_JVRepeatedInsert.lstCVarA_JVRepeated[0].JVNo;
                                objCVarA_JV.IsSysJv = false;
                                objCVarA_JV.Posted = false;
                                objCVarA_JV.JVDate = objCA_JVRepeatedInsert.lstCVarA_JVRepeated[0].DueDate;
                                objCVarA_JV.User_ID = userID;
                                objCVarA_JV.JVNo = pNewCode;
                                objCVarA_JV.TotalDebit = 0;
                                objCVarA_JV.TotalCredit = 0;


                                objCVarA_JV.Journal_ID = objCA_JVRepeatedInsert.lstCVarA_JVRepeated[0].Journal_ID;
                                objCVarA_JV.JVType_ID = objCA_JVRepeatedInsert.lstCVarA_JVRepeated[0].JVType_ID;

                                objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                                checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", userID, "A_JV Repeated", objCVarA_JV.ID, "C");
                                #endregion Copying Header
                                #region Copying Details
                                CA_JVDetailsRepeated objCA_JVDetails_Original = new CA_JVDetailsRepeated();
                                CA_JVDetails objCA_JVDetails_Copy = new CA_JVDetails();
                                checkException = objCA_JVDetails_Original.GetList("WHERE JV_ID=" + objCA_JVRepeatedInsert.lstCVarA_JVRepeated[0].ID);
                                if (objCA_JVDetails_Original.lstCVarA_JVDetailsRepeated.Count > 0)
                                {
                                    for (int k = 0; k < objCA_JVDetails_Original.lstCVarA_JVDetailsRepeated.Count; k++)
                                    {
                                        CVarA_JVDetails objCVarA_JVDetails = new CVarA_JVDetails();
                                        objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                                        objCVarA_JVDetails.Account_ID = objCA_JVDetails_Original.lstCVarA_JVDetailsRepeated[k].Account_ID;
                                        objCVarA_JVDetails.SubAccount_ID = objCA_JVDetails_Original.lstCVarA_JVDetailsRepeated[k].SubAccount_ID;
                                        objCVarA_JVDetails.CostCenter_ID = objCA_JVDetails_Original.lstCVarA_JVDetailsRepeated[k].CostCenter_ID;
                                        objCVarA_JVDetails.Debit = objCA_JVDetails_Original.lstCVarA_JVDetailsRepeated[k].Debit;
                                        objCVarA_JVDetails.Credit = objCA_JVDetails_Original.lstCVarA_JVDetailsRepeated[k].Credit;
                                        objCVarA_JVDetails.Currency_ID = objCA_JVDetails_Original.lstCVarA_JVDetailsRepeated[k].Currency_ID;
                                        objCVarA_JVDetails.ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;
                                        objCVarA_JVDetails.LocalDebit = objCVarA_JVDetails.Debit * objCVarA_JVDetails.ExchangeRate;
                                        objCVarA_JVDetails.LocalCredit = objCVarA_JVDetails.Credit * objCVarA_JVDetails.ExchangeRate;
                                        objCVarA_JVDetails.Description = objCA_JVDetails_Original.lstCVarA_JVDetailsRepeated[k].Description;
                                        objCA_JVDetails_Copy.lstCVarA_JVDetails.Add(objCVarA_JVDetails);
                                    }
                                    checkException = objCA_JVDetails_Copy.SaveMethod(objCA_JVDetails_Copy.lstCVarA_JVDetails);
                                    decimal TotalPayment = objCA_JVDetails_Copy.lstCVarA_JVDetails.Sum(s => s.LocalDebit);
                                    objCA_JV.UpdateList("TotalDebit="+ TotalPayment.ToString() + ",TotalCredit=" + TotalPayment.ToString() + " where id="+ objCVarA_JV.ID);
                                    objCA_JVRepeatedInsert.UpdateList("JVID=" + objCVarA_JV.ID + " ,Posted=1 where id=" + objCA_JVRepeatedInsert.lstCVarA_JVRepeated[0].ID);
                                }
                                #endregion Copying Details

                            }
                        }

                    }
                }
               
            }

    

        }
        void SetNotficationAlarm(Int32 UserID)
        {
            Exception checkException = null;
            CA_PaymentRequestDueDateAlarm objA_PaymentRequestDueDateAlarm = new CA_PaymentRequestDueDateAlarm();
            string whereClause = " where isnull(IsFinish,0)=0"
                + " and UserID=" + UserID
            + " and DueDate <='" + DateTime.Now.ToString("yyyy/MM/dd") + "'";


            checkException= objA_PaymentRequestDueDateAlarm.GetList(whereClause);
            if (objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm.Count > 0)
            {

                for (int i = 0; i < objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm.Count; i++)
                {
                    #region PaymentRequestAlarm
                    CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
                    objCA_PaymentRequest.GetList("where id=" + objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm[i].PaymentRequestID);
                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                    {
                        Int64 HeaderID = 0;
                        if (i == 0)
                        {
                            //Insert notification
                            CEmail objCEmail = new CEmail();
                            CVarEmail objCVarEmail = new CVarEmail();
                            objCVarEmail.ID = 0;
                            objCVarEmail.Subject = " Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[i].Code + " - طلب صرف";

                            objCVarEmail.Body = "Payment Request/" + objCA_PaymentRequest.lstCVarA_PaymentRequest[i].ID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                            objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                            objCVarEmail.SendingDate = DateTime.Now;
                            objCEmail.lstCVarEmail.Add(objCVarEmail);

                            objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                            HeaderID = objCVarEmail.ID;
                        }


                        CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.ID = 0;
                        objCVarEmailReceiver.EmailID = HeaderID;
                        objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm[i].UserID);
                        objCVarEmailReceiver.IsAlarm = true;
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);

                      checkException=  objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        if(checkException == null)
                        {
                            checkException= objA_PaymentRequestDueDateAlarm.UpdateList(" IsFinish=1 where ID=" + objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm[i].ID);
                        }

                    }
                    #endregion



                }





            }
        }
        [HttpPost]
        public string ResetPassword(String pUserNameToReset, string pUrl)
        {
            if (pUrl == "PageDirectly")
            {
                Session["PageDirectly"] = "1";
            }
            else
                Session["PageDirectly"] = "0";
            PageDirectly objPageDirectly = new PageDirectly();
            objPageDirectly._PageDirectly = "1";

            //var session = HttpContext. Current.Session;
            string _MessageReturned = "New password is sent to your email.";
            int _RowCount = 0;
            Exception checkException = null;
            int _UserID = WebSecurity.GetUserId(pUserNameToReset.Trim().ToUpper());
            CDefaults objCDefaults = new CDefaults();
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            CUsers objCUsers = new CUsers();
            
            if (_UserID == -1)
                _MessageReturned = "Invalid Username";
            else if (objCDefaults.lstCVarDefaults[0].Email == "0"
                        //|| objCDefaults.lstCVarDefaults[0].Email_DisplayName == "0" || objCDefaults.lstCVarDefaults[0].Email_DisplayName == ""
                        || objCDefaults.lstCVarDefaults[0].Email_Host == "0" || objCDefaults.lstCVarDefaults[0].Email_Host == ""
                        || objCDefaults.lstCVarDefaults[0].Email_Port == 0)
                _MessageReturned = "Contact your administrator to enter valid company email settings in the Defaults screen.";
            else
            {
                checkException = objCUsers.GetListPaging(999999, 1, "WHERE ID=" + _UserID, "ID", out _RowCount);
                if (objCUsers.lstCVarUsers[0].Email == "0" || objCUsers.lstCVarUsers[0].Email == "")
                    _MessageReturned = "Sorry, you do not have a valid email address in your account details.";
                else
                {
                    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_";
                    var stringChars = new char[15];
                    var random = new Random();
                    for (int i = 0; i < stringChars.Length; i++)
                    {
                        stringChars[i] = chars[random.Next(chars.Length)];
                    }
                    var _NewPassword = new String(stringChars);
                    var x = _NewPassword;
                    WebSecurity.ResetPassword(WebSecurity.GeneratePasswordResetToken(pUserNameToReset), _NewPassword);

                    #region Send Email
                    var mail = new MailMessage();
                    //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                    SmtpClient SmtpServer = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    SmtpServer.UseDefaultCredentials = true;
                    SmtpServer.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));

                    //SmtpClient SmtpServer = new SmtpClient();
                    //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);
                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                        if (objCUsers.lstCVarUsers[i].Email != "" && objCUsers.lstCVarUsers[i].Email != "0")
                        {
                            mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                            //if (WebSecurity.CurrentUserName == "ADMIN")
                            //    mail.Bcc.Add("sherif@istegy.com");
                        }
                    //mail.CC.Add(CC);
                    mail.Subject = "IST Password Reset.";
                    mail.Body = "<b>Your new password is : " + _NewPassword + "</b><br>";
                    mail.IsBodyHtml = true;
                    //mail.Attachments.Add(new Attachment(pathString));
                    //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                    //SmtpServer.Port = 25;
                    //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                    //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                    SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    try
                    {
                        SmtpServer.Send(mail);
                    }
                    catch (Exception ex)
                    {
                        _MessageReturned = ex.Message;
                    }
                    #endregion  Send Email
                }
            }
            return _MessageReturned;
        }

        void SendMonthUninvoicedReceivablesNotification()
        {
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            DateTime today = DateTime.Today;
            DateTime lastDayOfMonth = new DateTime(today.Year, today.Month, DateTime.DaysInMonth(today.Year, today.Month));
            DateTime sixDaysBeforeEndOfMonth = lastDayOfMonth.AddDays(-6);

            if (today > sixDaysBeforeEndOfMonth && today <= lastDayOfMonth)
            {
                try
                {
                    CEmail checkExistEmail = new CEmail();
                    checkExistEmail.GetList("where SendingDate >= CONVERT (Date, GETDATE()) and EmailSource IN (99,98)");
                    if (checkExistEmail.lstCVarEmail.Count > 0)
                    {
                        return;
                    }

                    var Operations = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select ID,CreatorUserID,ShipmentType,TransportType,Code,OpenDate from Operations WHERE BLType<>2 and (ShipmentType<>5 or ShipmentType is null) and ID in (select distinct OperationID from Receivables WHERE InvoiceID is null and DraftInvoiceID is null and AccNoteID is null) and OpenDate >= DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0)", typeof(CVarOperations)).Cast<CVarOperations>().ToList();

                    var AirOperations = Operations.Where(o => o.TransportType == 2).ToList();

                    var FCLOceanOperations = Operations.Where(o => o.TransportType == 1 && o.ShipmentType == 1).ToList();

                    var OtherOperations = Operations.Where(o => o.TransportType != 2 && (o.TransportType != 1 || o.ShipmentType != 1)).ToList();

                    CUsers objCUsers = new CUsers();
                    checkException = objCUsers.GetList("where IsInactive=0 and id in (select UserID from vwSecUserCustomizedTabs where TabName='Operations' and TabCode='Invoices' and CanAdd=1)");
                    var UsersIDs = objCUsers.lstCVarUsers.Select(u => u.ID).ToList();

                    var OperationsCreators = Operations.DistinctBy(o => o.CreatorUserID).Select(o => o.CreatorUserID).ToList();

                    var AirUsers = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select distinct UserID from crmUserServices where ServiceID=3", typeof(CVarcrmUserServices)).Cast<CVarcrmUserServices>().ToList();
                    var ExistingAirUsers = AirUsers.Where(u => UsersIDs.Contains(u.UserID)).ToList();

                    var FCLUsers = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select distinct UserID from crmUserServices where ServiceID=1", typeof(CVarcrmUserServices)).Cast<CVarcrmUserServices>().ToList();
                    var ExistingFCLUsers = FCLUsers.Where(u => UsersIDs.Contains(u.UserID)).ToList();


                    if (checkExistEmail.lstCVarEmail.Count == 0)
                    {
                        //Air
                        CVarEmail objCVarEmailAirOperations = new CVarEmail();
                        objCVarEmailAirOperations.ID = 0;
                        objCVarEmailAirOperations.Subject = "Check these Air Operations that have unInvoiced receivables";
                        objCVarEmailAirOperations.Body = string.Join(" // ", AirOperations.Select(o => o.Code).ToList());
                        objCVarEmailAirOperations.QuotationRouteID = 0;
                        objCVarEmailAirOperations.OperationID = 0;
                        objCVarEmailAirOperations.SenderUserID = 4;
                        objCVarEmailAirOperations.SendingDate = DateTime.Now;
                        objCVarEmailAirOperations.PricingID = 0;
                        objCVarEmailAirOperations.RequestOrReply = 0;
                        objCVarEmailAirOperations.QuotationRequestID = 0;
                        objCVarEmailAirOperations.QuotationRouteRequestID = 0;
                        objCVarEmailAirOperations.ParentEmailID = 0;
                        objCVarEmailAirOperations.EmailSource = 99;

                        CEmail objCEmail = new CEmail();
                        objCEmail.lstCVarEmail.Add(objCVarEmailAirOperations);
                        checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                        if (checkException == null && AirOperations.Count != 0)
                        {
                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                            foreach (var user in ExistingAirUsers)
                            {
                                CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                objCVarEmailReceiver.ID = 0;
                                objCVarEmailReceiver.EmailID = objCVarEmailAirOperations.ID;
                                objCVarEmailReceiver.ReceiverUserID = user.UserID;
                                objCVarEmailReceiver.IsRead = false;
                                objCVarEmailReceiver.IsAlarm = true;
                                objCVarEmailReceiver.IsDeleted = false;
                                objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                objCVarEmailReceiver.ReceivingTime = 0;
                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                            }
                            checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        }

                        //FCL
                        CVarEmail objCVarEmailFCLOperations = new CVarEmail();
                        objCVarEmailFCLOperations.ID = 0;
                        objCVarEmailFCLOperations.Subject = "Check these FCL Operations that have unInvoiced receivables";
                        objCVarEmailFCLOperations.Body = string.Join(" // ", FCLOceanOperations.Select(o => o.Code).ToList());
                        objCVarEmailFCLOperations.QuotationRouteID = 0;
                        objCVarEmailFCLOperations.OperationID = 0;
                        objCVarEmailFCLOperations.SenderUserID = 4;
                        objCVarEmailFCLOperations.SendingDate = DateTime.Now;
                        objCVarEmailFCLOperations.PricingID = 0;
                        objCVarEmailFCLOperations.RequestOrReply = 0;
                        objCVarEmailFCLOperations.QuotationRequestID = 0;
                        objCVarEmailFCLOperations.QuotationRouteRequestID = 0;
                        objCVarEmailFCLOperations.ParentEmailID = 0;
                        objCVarEmailFCLOperations.EmailSource = 99;

                        CEmail objCEmail2 = new CEmail();
                        objCEmail2.lstCVarEmail.Add(objCVarEmailFCLOperations);
                        checkException = objCEmail2.SaveMethod(objCEmail2.lstCVarEmail);

                        if (checkException == null && FCLOceanOperations.Count != 0)
                        {
                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                            foreach (var user in ExistingFCLUsers)
                            {
                                CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                objCVarEmailReceiver.ID = 0;
                                objCVarEmailReceiver.EmailID = objCVarEmailFCLOperations.ID;
                                objCVarEmailReceiver.ReceiverUserID = user.UserID;
                                objCVarEmailReceiver.IsRead = false;
                                objCVarEmailReceiver.IsAlarm = true;
                                objCVarEmailReceiver.IsDeleted = false;
                                objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                objCVarEmailReceiver.ReceivingTime = 0;
                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                            }
                            checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        }

                        //Creator User
                        foreach (var user in OperationsCreators)
                        {
                            var UserOperations = Operations.Where(o => o.CreatorUserID == user).ToList();

                            CVarEmail objCVarEmailCOperations = new CVarEmail();
                            objCVarEmailCOperations.ID = 0;
                            objCVarEmailCOperations.Subject = "Check these Operations that you created that have unInvoiced receivables";
                            objCVarEmailCOperations.Body = string.Join(",", UserOperations.Select(o => o.Code).ToList());
                            objCVarEmailCOperations.QuotationRouteID = 0;
                            objCVarEmailCOperations.OperationID = 0;
                            objCVarEmailCOperations.SenderUserID = 4;
                            objCVarEmailCOperations.SendingDate = DateTime.Now;
                            objCVarEmailCOperations.PricingID = 0;
                            objCVarEmailCOperations.RequestOrReply = 0;
                            objCVarEmailCOperations.QuotationRequestID = 0;
                            objCVarEmailCOperations.QuotationRouteRequestID = 0;
                            objCVarEmailCOperations.ParentEmailID = 0;
                            objCVarEmailCOperations.EmailSource = 98;

                            CEmail objCEmail3 = new CEmail();
                            objCEmail3.lstCVarEmail.Add(objCVarEmailCOperations);
                            checkException = objCEmail3.SaveMethod(objCEmail3.lstCVarEmail);

                            if (checkException == null && UserOperations.Count != 0)
                            {
                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                objCVarEmailReceiver.ID = 0;
                                objCVarEmailReceiver.EmailID = objCVarEmailCOperations.ID;
                                objCVarEmailReceiver.ReceiverUserID = user;
                                objCVarEmailReceiver.IsRead = false;
                                objCVarEmailReceiver.IsAlarm = true;
                                objCVarEmailReceiver.IsDeleted = false;
                                objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                objCVarEmailReceiver.ReceivingTime = 0;
                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                
                                checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                            }
                        }
                        

                    }


                    //var xyz = "";
                }
                catch (Exception ex)
                {
                    checkException = ex;
                }
            }

            




        }

        void SendOperationsETANotification()
        {
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            int constEmailSourceATAPODNotification = 150;

            // This line gets the operations ids if the Main Route (ATA POD + Free Time POD days) is today
            var OperationImportIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select o.ID from Operations o join Routings r on r.OperationID=o.ID and r.RoutingTypeID=30 where o.DirectionType = 1 AND  r.ETAPOLDate is not null and CAST(r.ETAPOLDate AS date) > CAST(GETDATE() AS date)  AND CAST(r.ETAPOLDate AS date) <= DATEADD(DAY, 3, CAST(GETDATE() AS date))");
            var OperationExportIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select o.ID from Operations o join Routings r on r.OperationID=o.ID and r.RoutingTypeID=30 where o.DirectionType = 2 AND  r.ExpectedArrival is not null and CAST(r.ExpectedArrival AS date) > CAST(GETDATE() AS date)  AND CAST(r.ExpectedArrival AS date) <= DATEADD(DAY, 3, CAST(GETDATE() AS date))");
            if (OperationExportIDs != "" )
            {
                foreach (var OperationID in OperationExportIDs.Split(','))
                {
                    CEmail checkExistEmail = new CEmail();
                    checkExistEmail.GetList($"WHERE EmailSource={constEmailSourceATAPODNotification} and OperationID={OperationID}");
                    if (checkExistEmail.lstCVarEmail.Count > 0)
                    {
                        continue;
                    }

                    if (checkExistEmail.lstCVarEmail.Count == 0)
                    {
                        COperations objNotiCOperations = new COperations();
                        objNotiCOperations.GetItem(long.Parse(OperationID));
                        CVarEmail objCVarEmail = new CVarEmail();
                        objCVarEmail.ID = 0;
                        objCVarEmail.Subject = "Check the operation "+ objNotiCOperations.lstCVarOperations[0].Code + " because (ETA POD Is 3 Days or less from Today)";
                        objCVarEmail.Body = "Check the operation "+ objNotiCOperations.lstCVarOperations[0].Code + " because (ETA POD Is 3 Days or less from Today)";
                        objCVarEmail.QuotationRouteID = 0;
                        objCVarEmail.OperationID = long.Parse(OperationID);
                        objCVarEmail.SenderUserID = 4;
                        objCVarEmail.SendingDate = DateTime.Now;
                        objCVarEmail.PricingID = 0;
                        objCVarEmail.RequestOrReply = 0;
                        objCVarEmail.QuotationRequestID = 0;
                        objCVarEmail.QuotationRouteRequestID = 0;
                        objCVarEmail.ParentEmailID = 0;
                        objCVarEmail.EmailSource = constEmailSourceATAPODNotification;

                        CEmail objCEmail = new CEmail();
                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                        checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                        if (checkException == null)
                        {
                            var UserID = objCCustomizedDBCall.CallStringFunction($"SELECT CreatorUserID FROM Operations WHERE ID={OperationID}");

                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.ID = 0;
                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                            objCVarEmailReceiver.ReceiverUserID = int.Parse(UserID);
                            objCVarEmailReceiver.IsRead = false;
                            objCVarEmailReceiver.IsAlarm = true;
                            objCVarEmailReceiver.IsDeleted = false;
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCVarEmailReceiver.ReceivingTime = 0;
                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);

                            checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        }
                    }
                }
            }
            if (OperationImportIDs != "")
            {
                foreach (var OperationID in OperationImportIDs.Split(','))
                {
                    CEmail checkExistEmail = new CEmail();
                    checkExistEmail.GetList($"WHERE EmailSource={constEmailSourceATAPODNotification} and OperationID={OperationID}");
                    if (checkExistEmail.lstCVarEmail.Count > 0)
                    {
                        continue;
                    }

                    if (checkExistEmail.lstCVarEmail.Count == 0)
                    {
                        COperations objNotiCOperations = new COperations();
                        objNotiCOperations.GetItem(long.Parse(OperationID));
                        CVarEmail objCVarEmail = new CVarEmail();
                        objCVarEmail.ID = 0;
                        objCVarEmail.Subject = "Check the operation  "+ objNotiCOperations.lstCVarOperations[0].Code + " because (ETA POL Is 3 Days or less from Today)";
                        objCVarEmail.Body = "Check the operation "+ objNotiCOperations.lstCVarOperations[0].Code + " because (ETA POL Is 3 Days or less from Today)";
                        objCVarEmail.QuotationRouteID = 0;
                        objCVarEmail.OperationID = long.Parse(OperationID);
                        objCVarEmail.SenderUserID = 4;
                        objCVarEmail.SendingDate = DateTime.Now;
                        objCVarEmail.PricingID = 0;
                        objCVarEmail.RequestOrReply = 0;
                        objCVarEmail.QuotationRequestID = 0;
                        objCVarEmail.QuotationRouteRequestID = 0;
                        objCVarEmail.ParentEmailID = 0;
                        objCVarEmail.EmailSource = constEmailSourceATAPODNotification;

                        CEmail objCEmail = new CEmail();
                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                        checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                        if (checkException == null)
                        {
                            var UserID = objCCustomizedDBCall.CallStringFunction($"SELECT CreatorUserID FROM Operations WHERE ID={OperationID}");

                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.ID = 0;
                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                            objCVarEmailReceiver.ReceiverUserID = int.Parse(UserID);
                            objCVarEmailReceiver.IsRead = false;
                            objCVarEmailReceiver.IsAlarm = true;
                            objCVarEmailReceiver.IsDeleted = false;
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCVarEmailReceiver.ReceivingTime = 0;
                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);

                            checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        }
                    }
                }
            }
        }

        void SendImportOperationsATANotification()
        {
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            int constEmailSourceATAPODNotification = 150;

            // This line gets the operations ids if the Main Route (ATA POD + Free Time POD days) is today
            var OperationIDs = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select o.ID from Operations o join Routings r on r.OperationID=o.ID and r.RoutingTypeID=30 where r.ActualArrival is not null and r.TruckCounter is not null and Cast(DATEADD(day, r.TruckCounter, r.ActualArrival) AS date) = Cast(GETDATE() as date)");

            if(OperationIDs == "")
            {
                return;
            } else
            {
                foreach(var OperationID in OperationIDs.Split(','))
                {
                    CEmail checkExistEmail = new CEmail();
                    checkExistEmail.GetList($"WHERE EmailSource={constEmailSourceATAPODNotification} and OperationID={OperationID}");
                    if (checkExistEmail.lstCVarEmail.Count > 0)
                    {
                        continue;
                    }

                    if (checkExistEmail.lstCVarEmail.Count == 0)
                    {

                        CVarEmail objCVarEmail = new CVarEmail();
                        objCVarEmail.ID = 0;
                        objCVarEmail.Subject = "Check the operation because (ATA POD + Free Time POD Is Today)";
                        objCVarEmail.Body = "ATA POD + Free Time POD Is Today";
                        objCVarEmail.QuotationRouteID = 0;
                        objCVarEmail.OperationID = long.Parse(OperationID);
                        objCVarEmail.SenderUserID = 4;
                        objCVarEmail.SendingDate = DateTime.Now;
                        objCVarEmail.PricingID = 0;
                        objCVarEmail.RequestOrReply = 0;
                        objCVarEmail.QuotationRequestID = 0;
                        objCVarEmail.QuotationRouteRequestID = 0;
                        objCVarEmail.ParentEmailID = 0;
                        objCVarEmail.EmailSource = constEmailSourceATAPODNotification;

                        CEmail objCEmail = new CEmail();
                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                        checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                        
                        if (checkException == null)
                        {
                            var UserID = objCCustomizedDBCall.CallStringFunction($"SELECT CreatorUserID FROM Operations WHERE ID={OperationID}");

                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.ID = 0;
                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                            objCVarEmailReceiver.ReceiverUserID = int.Parse(UserID);
                            objCVarEmailReceiver.IsRead = false;
                            objCVarEmailReceiver.IsAlarm = true;
                            objCVarEmailReceiver.IsDeleted = false;
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCVarEmailReceiver.ReceivingTime = 0;
                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                            
                            checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        }
                    }
                }
            }

        }   
        void SendExportOperationsATDNotification()
        {
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            int constEmailSourceATDPODNotification = 180;
            var admins = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select id from users where  RoleID = 1");
            // This line gets the operations ids if the Main Route (ATA POD + Free Time POD days) is today
            //COperations cOperations = new COperations();
            CvwOperations cOperations = new CvwOperations();
            cOperations.GetList("where id in (select operationid from Routings r where r.RoutingTypeID = 30  and r.ActualDeparture is null  and r.ExpectedDeparture is not null ) and OperationStageID = 60 and DirectionIconName = 'fa-external-link'");
            if (cOperations.lstCVarvwOperations.Count == 0)
            {
                return;
            }
            else
            {
                foreach(var Operation in cOperations.lstCVarvwOperations)
                {
                    var currentdate = DateTime.Now;
                    CEmail checkExistEmail = new CEmail();
                    checkExistEmail.GetList($"WHERE EmailSource={constEmailSourceATDPODNotification} and OperationID={Operation.ID}  and CONVERT(date, sendingdate) =CONVERT(date,' {currentdate}')" );
                    if (checkExistEmail.lstCVarEmail.Count > 0)
                    {
                        continue;
                    }

                    if (checkExistEmail.lstCVarEmail.Count == 0)
                    {

                        CVarEmail objCVarEmail = new CVarEmail();
                        objCVarEmail.ID = 0;
                        objCVarEmail.Subject = $"Check the operation because (ATD POL DATE IS EMPTY) , Operation Man : {Operation.OperationManName}";
                        objCVarEmail.Body = $"MAIN CARRAIGE ATD POL DATE IN OPERATION {Operation.Code} IS EMPTY";
                        objCVarEmail.QuotationRouteID = 0;
                        objCVarEmail.OperationID = Operation.ID;
                        objCVarEmail.SenderUserID = 4;
                        objCVarEmail.SendingDate = DateTime.Now;
                        objCVarEmail.PricingID = 0;
                        objCVarEmail.RequestOrReply = 0;
                        objCVarEmail.QuotationRequestID = 0;
                        objCVarEmail.QuotationRouteRequestID = 0;
                        objCVarEmail.ParentEmailID = 0;
                        objCVarEmail.EmailSource = constEmailSourceATDPODNotification;

                        CEmail objCEmail = new CEmail();
                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                        checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                        
                        if (checkException == null)
                        {
                            

                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.ID = 0;
                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                            objCVarEmailReceiver.ReceiverUserID = Operation.CreatorUserID;
                            objCVarEmailReceiver.IsRead = false;
                            objCVarEmailReceiver.IsAlarm = true;
                            objCVarEmailReceiver.IsDeleted = false;
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCVarEmailReceiver.ReceivingTime = 0;
                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                          
                            checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);

                        }
                        foreach (var admin in admins.Split(','))
                        {
                            if (int.Parse(admin) != Operation.CreatorUserID)
                            {
                               
                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();

                                CVarEmailReceiver objCVarEmailReceiver1 = new CVarEmailReceiver();
                                objCVarEmailReceiver1.ID = 0;
                                objCVarEmailReceiver1.EmailID = objCVarEmail.ID;
                                objCVarEmailReceiver1.ReceiverUserID = int.Parse(admin);
                                objCVarEmailReceiver1.IsRead = false;
                                objCVarEmailReceiver1.IsAlarm = true;
                                objCVarEmailReceiver1.IsDeleted = false;
                                objCVarEmailReceiver1.ReceivingDate = DateTime.Parse("01-01-1900");
                                objCVarEmailReceiver1.ReceivingTime = 0;
                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver1);
                                checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);

                            }
                        }
                    }
                }


            }

        }
        void SendOperationChargesMissingAlarm()
        {
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            int constEmailSourceATAPODNotification = 160;
            var admins = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select id from users where  RoleID = 1");
            var OperationsIds = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select id from operations o where ( o.code is not null) and (o.OperationStageID = 60) and  (GETDATE()  >= DATEADD(HOUR, 24, OpenDate)) and (((select count(id) from Payables p where p.OperationID = o.id ) = 0) or ((select count(id) from Receivables r where r.OperationID = o.id ) = 0))\r\n");
            // This line gets the operations ids if the Main Route (ATA POD + Free Time POD days) is today
            COperations cOperations = new COperations();
            cOperations.GetList($"where id in ({OperationsIds})");
            if (cOperations.lstCVarOperations.Count == 0)
            {
                return;
            }
            else
            {
                foreach (var Operation in cOperations.lstCVarOperations)
                {
                    var currentdate = DateTime.Now;

                    CEmail checkExistEmail = new CEmail();
                    checkExistEmail.GetList($"WHERE EmailSource={constEmailSourceATAPODNotification} and OperationID={Operation.ID}  and CONVERT(date, sendingdate) =CONVERT(date,' {currentdate}')");
                    if (checkExistEmail.lstCVarEmail.Count > 0)
                    {
                        continue;
                    }

                    if (checkExistEmail.lstCVarEmail.Count == 0)
                    {

                        CVarEmail objCVarEmail = new CVarEmail();
                        objCVarEmail.ID = 0;
                        objCVarEmail.Subject = "Check the operation because (Has No Charges Payables / Recievables)";
                        objCVarEmail.Body = $"Operation : {Operation.Code} Has No Charges (Payables / Recievables)";
                        objCVarEmail.QuotationRouteID = 0;
                        objCVarEmail.OperationID = Operation.ID;
                        objCVarEmail.SenderUserID = 4;
                        objCVarEmail.SendingDate = DateTime.Now;
                        objCVarEmail.PricingID = 0;
                        objCVarEmail.RequestOrReply = 0;
                        objCVarEmail.QuotationRequestID = 0;
                        objCVarEmail.QuotationRouteRequestID = 0;
                        objCVarEmail.ParentEmailID = 0;
                        objCVarEmail.EmailSource = constEmailSourceATAPODNotification;

                        CEmail objCEmail = new CEmail();
                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                        checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);


                        CEmailReceiver objCEmailReceiver1 = new CEmailReceiver();
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.ID = 0;
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = Operation.CreatorUserID;
                        objCVarEmailReceiver.IsRead = false;
                        objCVarEmailReceiver.IsAlarm = true;
                        objCVarEmailReceiver.IsDeleted = false;
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.ReceivingTime = 0;
                        objCEmailReceiver1.lstCVarEmailReceiver.Add(objCVarEmailReceiver);

                        checkException = objCEmailReceiver1.SaveMethod(objCEmailReceiver1.lstCVarEmailReceiver);


                        foreach (var admin in admins.Split(','))
                        {
                           

                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();

                                CVarEmailReceiver objCVarEmailReceiver1 = new CVarEmailReceiver();
                                objCVarEmailReceiver1.ID = 0;
                                objCVarEmailReceiver1.EmailID = objCVarEmail.ID;
                                objCVarEmailReceiver1.ReceiverUserID = int.Parse(admin);
                                objCVarEmailReceiver1.IsRead = false;
                                objCVarEmailReceiver1.IsAlarm = true;
                                objCVarEmailReceiver1.IsDeleted = false;
                                objCVarEmailReceiver1.ReceivingDate = DateTime.Parse("01-01-1900");
                                objCVarEmailReceiver1.ReceivingTime = 0;
                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver1);
                                checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);

                            
                        }
                    }
                }


            }

        }
        void SendOperationTrackingNotification()
        {
            int constEmailSourceTrackingStageDateNotification = 170;
            string TodayDate = DateTime.Now.ToString("yyyy-MM-dd");

            CvwOperationTracking objCvwOperationTracking = new CvwOperationTracking();
            Exception e = objCvwOperationTracking.GetList($"where cast(TrackingDate as date)='{TodayDate}'");

            if ( e != null )
            {
                return;
            } else if (objCvwOperationTracking.lstCVarvwOperationTracking.Count == 0)
            {
                return;
            } 
                
            
            CEmail checkExistEmail = new CEmail();
            e = checkExistEmail.GetList($"WHERE EmailSource={constEmailSourceTrackingStageDateNotification} AND cast(SendingDate as date)='{TodayDate}'");
            if (checkExistEmail.lstCVarEmail.Count > 0 || e != null)
            {
                return;
            }

            foreach (var trackingItem in objCvwOperationTracking.lstCVarvwOperationTracking)
            {
                CVarEmail objCVarEmail = new CVarEmail();
                objCVarEmail.ID = 0;
                objCVarEmail.Subject = $"Task ({trackingItem.TrackingStageName}) Date Is Today";
                objCVarEmail.Body = $"Task ({trackingItem.TrackingStageName}) Date Is Today";
                objCVarEmail.QuotationRouteID = 0;
                objCVarEmail.OperationID = trackingItem.OperationID;
                objCVarEmail.SenderUserID = 4;
                objCVarEmail.SendingDate = DateTime.Now;
                objCVarEmail.PricingID = 0;
                objCVarEmail.RequestOrReply = 0;
                objCVarEmail.QuotationRequestID = 0;
                objCVarEmail.QuotationRouteRequestID = 0;
                objCVarEmail.ParentEmailID = 0;
                objCVarEmail.EmailSource = constEmailSourceTrackingStageDateNotification;

                CEmail objCEmail = new CEmail();
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                Exception checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                if (checkException == null)
                {

                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                    CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                    objCVarEmailReceiver.ID = 0;
                    objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                    objCVarEmailReceiver.ReceiverUserID = trackingItem.CreatorUserID;
                    objCVarEmailReceiver.IsRead = false;
                    objCVarEmailReceiver.IsAlarm = true;
                    objCVarEmailReceiver.IsDeleted = false;
                    objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                    objCVarEmailReceiver.ReceivingTime = 0;
                    objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);

                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                }
            }
            
        }

        //[HttpGet]
        //public ActionResult Insert()
        //{
        //    if (!WebSecurity.Initialized)
        //    {
        //        WebSecurity.InitializeDatabaseConnection("ConnectionString", "Users", "ID", "Username", autoCreateTables: false);
        //    }
        //    return View();
        //}

        //[HttpPost]
        //public bool Insert(string pUsername, string pPassword, bool pIsInactive, string pNotes = "", bool pIsSystemUser = false)
        //{
        //    bool _result = false;
        //    try
        //    {
        //        WebSecurity.CreateUserAndAccount(pUsername, pPassword, new { Password = "", IsInactive = pIsInactive, Notes = pNotes, IsSystemUser = pIsSystemUser, CreatorUserID = WebSecurity.CurrentUserId, CreationDate = DateTime.Now, ModificatorUserID = WebSecurity.CurrentUserId, ModificationDate = DateTime.Now }, false);
        //        _result = true;
        //    }
        //    catch (MembershipCreateUserException e)
        //    {
        //        if (e.StatusCode.ToString() == "DuplicateUserName")
        //            _result = false;
        //        else //because i have another exception because of the trigger
        //            _result = true;
        //    }

        //    //var membership = (SimpleMembershipProvider)Membership.Provider;
        //    ////This will delete the user information from Users
        //    //bool UserDeleted = membership.DeleteUser(pUsername, true);

        //    //if (UserDeleted)
        //    //{

        //    //    try
        //    //    {
        //    //        //This will delete the user information from webpages_membership
        //    //        bool webpages_membershipDeleted = membership.DeleteAccount(pUsername);

        //    //    }
        //    //    catch (Exception e) { }

        //    //    //FormsAuthentication.SignOut();
        //    //    //FormsAuthentication.RedirectToLoginPage();
        //    //}
        //    ////Response.Redirect("~/account/login");
        //    return _result;
        //}

        //    [HttpPost]
        //    public bool Update(Int32 pID, string pUsername, string pPassword, bool pIsInactive, string pNotes = "", bool pIsSystemUser = false)
        //    {
        //        bool _result = false;

        //        CVarUsers objCVarUsers = new CVarUsers();

        //        //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
        //        CUsers objCGetCreationInformation = new CUsers();
        //        objCGetCreationInformation.GetItem(pID);
        //        objCVarUsers.CreatorUserID = objCGetCreationInformation.lstCVarUsers[0].CreatorUserID;
        //        objCVarUsers.CreationDate = objCGetCreationInformation.lstCVarUsers[0].CreationDate;

        //        objCVarUsers.ID = pID;

        //        objCVarUsers.Username = (pUsername == null ? "" : pUsername.Trim().ToUpper());
        //        //objCVarUsers.Password = (pPassword == null ? "" : Forwarding.BLL.Utilities.CEncryptDecrypt.Encrypt(pPassword.Trim(), true));
        //        objCVarUsers.Password = "";

        //        objCVarUsers.IsInactive = pIsInactive;
        //        objCVarUsers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
        //        objCVarUsers.IsSystemUser = pIsSystemUser;

        //        objCVarUsers.ModificatorUserID = WebSecurity.CurrentUserId;
        //        objCVarUsers.ModificationDate = DateTime.Now;

        //        CUsers objCUsers = new CUsers();
        //        objCUsers.lstCVarUsers.Add(objCVarUsers);
        //        Exception checkException = objCUsers.SaveMethod(objCUsers.lstCVarUsers);
        //        if (checkException != null) // an exception is caught in the model
        //        {
        //            if (checkException.Message.Contains("UNIQUE"))
        //                _result = false;
        //        }
        //        else //not unique
        //            //Resetting the Password in case of update success
        //            WebSecurity.ResetPassword(WebSecurity.GeneratePasswordResetToken(pUsername), pPassword);
        //            _result = true;
        //        return _result;
        //    }
    }

    public class PageDirectly
    {

        internal String m_PageDirectly;
        public String _PageDirectly
        {
            get { return m_PageDirectly; }
            set { m_PageDirectly = value; }
        }
    }
}