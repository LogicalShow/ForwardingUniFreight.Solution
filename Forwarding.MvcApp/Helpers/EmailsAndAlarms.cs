using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Helpers
{
    public static class EmailsAndAlarms
    {

        public static bool SendEmail(string pUserIDs, string pSubject, string pBody , CDefaults objCDefaults)
        {
            #region Send Email
            CVarEmail objCVarEmail = new CVarEmail();
            string _MailMessageReturned = "";
            CEmail objCEmail = new CEmail();
            if (pUserIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                        && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Port != 0)
                {
                    CUsers objCUsers = new CUsers();
                   var checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pUserIDs + ")");

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



                return (_MailMessageReturned == "" ? true : false);


                }
            else
            {
                return false;
            }
            
            #endregion Send Email



        }





        public static bool SendAlarm(string pUserIDs, string pSubject, string pBody , long pQuotationRouteID , long pPricingID , int pRequestOrReply , long pOperationID  , long ParentID , int pEmailSource , bool pIsAlarm)
        {
            var _Result = false;
            string _MailMessageReturned = "";

            var pArrayOfReceiversIDs = pUserIDs.Split(',');
            var NoOfReceivers = pArrayOfReceiversIDs.Length;

            CVarEmail objCVarEmail = new CVarEmail();
            CEmail objCEmail = new CEmail();
            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
            CvwEmail objCvwEmail = new CvwEmail();
            #region Send Alarm
            objCVarEmail.Subject = pSubject;
            objCVarEmail.Body = pBody;
            objCVarEmail.QuotationRouteID = pQuotationRouteID;
            objCVarEmail.PricingID = pPricingID;
            objCVarEmail.RequestOrReply = pRequestOrReply;
            objCVarEmail.OperationID = pOperationID;
            objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
            objCVarEmail.SendingDate = DateTime.Now;
            objCVarEmail.ParentEmailID = ParentID;
            objCVarEmail.EmailSource = pEmailSource;
            objCEmail.lstCVarEmail.Add(objCVarEmail);
            var  checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);

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
               // objCvwEmail.GetListPaging(pPageSize, pPageNumber, pWhereClauseForLoadWithPaging, pOrderBy, out _RowCount);
            }




            return _Result;
            #endregion Send Alarm






        }




    }
}
