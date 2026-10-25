using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using MoreLinq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.LocalEmails.LocalEmails
{
    public class LocalEmailsController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadAll(string pWhereClause)
        {
            //CvwEmailReceiver objCvwEmailReceiver = new CvwEmailReceiver();
            //objCvwEmailReceiver.GetList(pWhereClause);
            
            //var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            //return new Object[] { 
            //    serializer.Serialize(objCvwEmailReceiver.lstCVarvwEmailReceiver) 
            //};

            CvwEmail objCvwEmail = new CvwEmail();
            objCvwEmail.GetList(pWhereClause);
            var userid = WebSecurity.CurrentUserId;
            var list = new List<CVarvwEmail>();
            try
            {
                list = objCvwEmail.lstCVarvwEmail.OrderByDescending(i => i.ReceiverUserID == userid).ThenBy(i => i.ID).ToList();
            }
            catch (Exception ex)
            {
                list = objCvwEmail.lstCVarvwEmail;
            }
          
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
            serializer.Serialize(list.DistinctBy(x=> x.ID).ToList().OrderBy(x=> x.ID)) 
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, bool pIsReceived)
        {
            Exception checkException = null;
            Int32 _RowCount = 0;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CUsers objCUsers = new CUsers();
            objCUsers.GetList(" WHERE IsNull(CustomerID , 0) = 0 AND 1=1 ");

            //CvwEmail objCvwEmail = new CvwEmail();
            //CvwEmail_ForSent objCvwEmail_ForSent = new CvwEmail_ForSent();
            //if (pIsReceived)
            //    checkException = objCvwEmail.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            //else
            //    checkException = objCvwEmail_ForSent.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            CvwEmailGroup objCvwEmailGroup = new CvwEmailGroup();
            
            //checkException = objCvwEmailGroup.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            //checkException = objCvwEmailGroup.GetListPaging(9999999, 1, pWhereClause, pOrderBy, out _RowCount);

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            var pSelectedColumns = "ID,RelatedUsersIDs,Body,SenderUserID,Senders,Receivers,Subject,OperationID,OperationCode";
            pSelectedColumns += ",SendingDateAndTime,QuotationRouteID,QuotationCode,ParentEmailID,IsAlarm";
            pSelectedColumns += ",ReceiverUserID";

            //pSelectedColumns = " * ";

            if (pWhereClause.Contains("undefined"))
            {
                pWhereClause = "WHERE 1=1";
            }

            Int32 _d = 0;
            CDefaults objDefaults = new CDefaults();
            objDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _d);

            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objDefaults.lstCVarDefaults[0].UnEditableCompanyName);

            
            if (pWhereClause.Contains("undefined"))
            {
                pWhereClause = "WHERE 1<>1";
            }
            Int32 _RowCountMesco = 0;
            CvwEmailGroup objCvwEmailGroupMesco = new CvwEmailGroup();
            checkException = objCvwEmailGroupMesco.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCountMesco);

            if(checkException != null)
            {
                return new Object[] {
                null
                , null
                , null  //pData[2]
                };
            }

            return new Object[] {
                serializer.Serialize(objCvwEmailGroupMesco.lstCVarvwEmailGroup)
            , _RowCountMesco
            , serializer.Serialize(objCUsers.lstCVarUsers)  //pData[2]
            };
            

            /*var EmailGroups = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
                "select " + pSelectedColumns + " from vwEmailGroup " + pWhereClause + " ORDER BY " + pOrderBy
                , typeof(CVarvwEmailGroup)).Cast<CVarvwEmailGroup>().ToList();
            _RowCount = EmailGroups.Count;

            //var EmailGroups = objCvwEmailGroup.lstCVarvwEmailGroup;
            if (_RowCount > 0)
            {
                EmailGroups = EmailGroups.DistinctBy(x => x.ID).ToList();
                _RowCount = EmailGroups.Count;
                EmailGroups = EmailGroups.Skip((pPageNumber - 1) * pPageSize).Take(pPageSize).ToList();
            }


            return new Object[] {
               // pIsReceived ? new JavaScriptSerializer().Serialize(objCvwEmail.lstCVarvwEmail) :  new JavaScriptSerializer().Serialize(objCvwEmail_ForSent.lstCVarvwEmail_ForSent)
                 //(_RowCount == 0 ? serializer.Serialize( objCvwEmailGroup.lstCVarvwEmailGroup) :  serializer.Serialize( objCvwEmailGroup.lstCVarvwEmailGroup.DistinctBy(x=> x.ID).ToList()))
                 serializer.Serialize(EmailGroups)
                , _RowCount
                , serializer.Serialize(objCUsers.lstCVarUsers)  //pData[2]
            };*/
        }

        [HttpGet, HttpPost]
        public object[] SendEmail(string pUserIDs, string pSubject, string pBody, Int64 pQuotationRouteID, Int64 pPricingID, Int32 pRequestOrReply, Int64 pOperationID, bool pIsAlarm, string pParentID , Int32 pEmailSource, bool pIsSendNormalEmail, string pWhereClauseForLoadWithPaging, Int32 pPageSize, Int32 pPageNumber, string pOrderBy, int pSenderUserID)
        {
            //var constRequest = 10; //PricingRequest
            //var constReply = 20; //PricingReply
            //var constEmailSourceQuotationApprovalRequest = 25;
            //var constEmailSourceQuotationApprovalSet = 30;

            //var constEmailSourceInterDepartmentRequest = 40;
            //var constEmailSourceInterDepartmentReply = 50;
            //var constEmailSourceInterDepartmentAcceptance = 60;
            //var constEmailSourceInterDepartmentDenial = 50;

            int ParentID = (pParentID == null ? 0 : int.Parse(pParentID));
            bool _Result = false;
            Exception checkException = null;
            Int32 _RowCount = 0;
            CVarEmail objCVarEmail = new CVarEmail();
            CEmail objCEmail = new CEmail();
            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
            CvwEmail objCvwEmail = new CvwEmail();
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string _MailMessageReturned = "";

            var pArrayOfReceiversIDs = pUserIDs.Split(',');
            var NoOfReceivers = pArrayOfReceiversIDs.Length;

            #region Send Alarm
            objCVarEmail.Subject = pSubject;
            objCVarEmail.Body = pBody;
            objCVarEmail.QuotationRouteID = pQuotationRouteID;
            objCVarEmail.PricingID = pPricingID;
            objCVarEmail.RequestOrReply = pRequestOrReply;
            objCVarEmail.OperationID = pOperationID;
            objCVarEmail.SenderUserID = pSenderUserID;
            objCVarEmail.SendingDate = DateTime.Now;
            objCVarEmail.ParentEmailID = ParentID;
            objCVarEmail.EmailSource = pEmailSource;
            objCEmail.lstCVarEmail.Add(objCVarEmail);
            checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);

            if (checkException == null) //send to each EmailReceiver
            {
                for (int i = 0; i < NoOfReceivers; i++)
                {
                    CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                    objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                    objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                    objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                    objCVarEmailReceiver.IsAlarm = pIsAlarm;
                    
                    objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                }
                checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                _Result = checkException == null ? true : false;
                objCvwEmail.GetListPaging(pPageSize, pPageNumber, pWhereClauseForLoadWithPaging, pOrderBy, out _RowCount);
            }
            #endregion Send Alarm
            #region Send Email
            if (pIsSendNormalEmail)
            {
                if (pUserIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                        && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Port != 0 /*&& objCDefaults.lstCVarDefaults[0].IsDepartmentOption*/)
                {
                    CUsers objCUsers = new CUsers();
                    checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pUserIDs + ")");

                    string FromMail = objCDefaults.lstCVarDefaults[0].Email;
                    bool _boolEmailFound = false;
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
                            _boolEmailFound = true;
                            mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                        }
                    //mail.CC.Add(CC);
                    mail.Subject = pSubject;
                    mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>";
                    mail.Body += pBody;
                    mail.IsBodyHtml = true;
                    //mail.Attachments.Add(new Attachment(pathString));
                    //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                    //SmtpServer.Port = 25;
                    //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                    //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                    SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    if (_boolEmailFound)
                        try
                        {
                            SmtpServer.Send(mail);
                        }
                        catch (Exception ex)
                        {
                            _MailMessageReturned = ex.Message;
                        }
                }
            }
            #endregion Send Email
            return new object[] {
                _Result
                , new JavaScriptSerializer().Serialize(objCvwEmail.lstCVarvwEmail)
            };
        }

        [HttpGet, HttpPost]
        public object[] SendAlarmWithMinimalData(string pAlarmReceiversIDs, string pSubject, string pBody)
        {
            Exception checkException = null;
            string _MessageReturned = "";
            //int _RowCount = 0;
            
            #region Sending Alarm
            if (pAlarmReceiversIDs != null)
            {
                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                objCVarEmail.Subject = pSubject;
                objCVarEmail.Body = pBody;
                objCVarEmail.QuotationRouteID = 0;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                if (checkException == null) //add to EmailReceivers
                {
                    var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                    var NoOfReceivers = pArrayOfReceiversIDs.Length;
                    for (int i = 0; i < NoOfReceivers; i++)
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                    }
                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                }
            }
            #endregion Sending Alarm

            return new object[]
            {
                _MessageReturned
            };
        }

        [HttpGet, HttpPost]
        public object RemoveAlarm(Int64 pRemoveAlarmEmailID)
        {
            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
            objCEmailReceiver.UpdateList("IsAlarm=0 WHERE EmailID=" + pRemoveAlarmEmailID.ToString()
                                          + " AND ReceiverUserID=" + WebSecurity.CurrentUserId.ToString());
            return new object[]
            {
            };
        }
		[HttpGet, HttpPost]
        public object DeleteAlarm(string pUpdateClause)
        {
            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
			var ex = objCEmailReceiver.DeleteList(pUpdateClause);
            return new object[]
            {
				ex
			};
        }
        public object RemoveAllAlarms(string pUpdateClause)
        {
            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
			var ex = objCEmailReceiver.UpdateList(pUpdateClause);
            return new object[]
            {
				ex
			};
        }

    }
}
