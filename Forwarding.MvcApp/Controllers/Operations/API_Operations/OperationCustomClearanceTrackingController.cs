using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class OperationCustomClearanceTrackingController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCustomClearanceTracking objCvwCustomClearanceTracking = new CvwCustomClearanceTracking();
            objCvwCustomClearanceTracking.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking) };
        }

        [HttpGet, HttpPost]
        public object[] Insert(Int64 pCustomClearanceRoutingID, Int32 pTrackingStageID, Int32 pCustodyID, DateTime pTrackingDate, string pNotes, bool pDone)
        {
            bool _result = false;
            CvwCustomClearanceTracking objCvwCustomClearanceTracking = new CvwCustomClearanceTracking();

            CVarCustomClearanceTracking objCVarCustomClearanceTracking = new CVarCustomClearanceTracking();
            objCVarCustomClearanceTracking.CustomClearanceRoutingID = pCustomClearanceRoutingID;
            objCVarCustomClearanceTracking.TrackingStageID = pTrackingStageID;
            objCVarCustomClearanceTracking.CustodyID = pCustodyID;
            objCVarCustomClearanceTracking.TrackingDate = pTrackingDate;
            objCVarCustomClearanceTracking.Notes = pNotes;
            objCVarCustomClearanceTracking.Done = pDone;
            objCVarCustomClearanceTracking.CreatorUserID = objCVarCustomClearanceTracking.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustomClearanceTracking.CreationDate = objCVarCustomClearanceTracking.ModificationDate = DateTime.Now;
           
            CCustomClearanceTracking objCCustomClearanceTracking = new CCustomClearanceTracking();
            objCCustomClearanceTracking.lstCVarCustomClearanceTracking.Add(objCVarCustomClearanceTracking);
            Exception checkException = objCCustomClearanceTracking.SaveMethod(objCCustomClearanceTracking.lstCVarCustomClearanceTracking);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                objCvwCustomClearanceTracking.GetList("WHERE CustomClearanceRoutingID=" + pCustomClearanceRoutingID.ToString()  + " ORDER BY ViewOrder, TrackingDate");
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] Update(int pID, Int64 pCustomClearanceRoutingID, Int32 pTrackingStageID, Int32 pCustodyID, DateTime pTrackingDate, string pNotes, bool pDone)
        {
            bool _result = false;
            CvwCustomClearanceTracking objCvwCustomClearanceTracking = new CvwCustomClearanceTracking();
            CVarCustomClearanceTracking objCVarCustomClearanceTracking = new CVarCustomClearanceTracking();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCustomClearanceTracking objCGetCreationInformation = new CCustomClearanceTracking();
            objCGetCreationInformation.GetItem(pID);
            objCVarCustomClearanceTracking.CreatorUserID = objCGetCreationInformation.lstCVarCustomClearanceTracking[0].CreatorUserID;
            objCVarCustomClearanceTracking.CreationDate = objCGetCreationInformation.lstCVarCustomClearanceTracking[0].CreationDate;

            objCVarCustomClearanceTracking.ID = pID;
            objCVarCustomClearanceTracking.CustomClearanceRoutingID = pCustomClearanceRoutingID;
            objCVarCustomClearanceTracking.TrackingStageID = pTrackingStageID;
            objCVarCustomClearanceTracking.CustodyID = pCustodyID;
            objCVarCustomClearanceTracking.TrackingDate = pTrackingDate;
            objCVarCustomClearanceTracking.Notes = pNotes;
            objCVarCustomClearanceTracking.Done = pDone;
            objCVarCustomClearanceTracking.CreatorUserID = objCVarCustomClearanceTracking.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustomClearanceTracking.CreationDate = objCVarCustomClearanceTracking.ModificationDate = DateTime.Now;

            CCustomClearanceTracking objCCustomClearanceTracking = new CCustomClearanceTracking();
            objCCustomClearanceTracking.lstCVarCustomClearanceTracking.Add(objCVarCustomClearanceTracking);
            Exception checkException = objCCustomClearanceTracking.SaveMethod(objCCustomClearanceTracking.lstCVarCustomClearanceTracking);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                objCvwCustomClearanceTracking.GetList("WHERE CustomClearanceRoutingID=" + pCustomClearanceRoutingID.ToString() + " ORDER BY ViewOrder, TrackingDate");
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] Delete(String pDeletedTrackingIDs, Int64 pCustomClearanceRoutingID)
        {
            bool _result = false;
            CvwCustomClearanceTracking objCvwCustomClearanceTracking = new CvwCustomClearanceTracking();
            CCustomClearanceTracking objCCustomClearanceTracking = new CCustomClearanceTracking();
            foreach (var currentID in pDeletedTrackingIDs.Split(','))
            {
                objCCustomClearanceTracking.lstDeletedCPKCustomClearanceTracking.Add(new CPKCustomClearanceTracking() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCustomClearanceTracking.DeleteItem(objCCustomClearanceTracking.lstDeletedCPKCustomClearanceTracking);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else
            { //deleted successfully
                _result = true;
                objCvwCustomClearanceTracking.GetList("WHERE CustomClearanceRoutingID=" + pCustomClearanceRoutingID.ToString() + " ORDER BY ViewOrder, TrackingDate");
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] SendAlarm(Int64 pTrackingStageID, string pAlarmReceiversIDs)
        {
            Exception checkException = null;
            string _MessageReturned = "";
            int _RowCount = 0;
            CvwCustomClearanceTracking objCvwCustomClearanceTracking = new CvwCustomClearanceTracking();
            CvwOperations objCvwOperations = new CvwOperations();
            checkException = objCvwCustomClearanceTracking.GetListPaging(999999, 1, "WHERE ID=" + pTrackingStageID, "ID",out _RowCount);
            checkException = objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].OperationID, "ID", out _RowCount);

            #region Sending Alarm
            if (pAlarmReceiversIDs != null)
            {
                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                objCVarEmail.Subject = "Incoming Task: Operation '" + objCvwOperations.lstCVarvwOperations[0].Code + "'";
                objCVarEmail.Body = "Operation No. " + objCvwOperations.lstCVarvwOperations[0].Code + "\n"
                    + "Task: " + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].TrackingStageName + "\n"
                    + "Task Date: " + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].StringTrackingDate + "\n"
                    + "Notes: " + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].Notes + "\n";
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
        public object[] CustomClearanceTracking_SendEmail(
                  Int64  pTrackingStageID_SendEmail
                , string pSubject
                , string pTo
                , string pCC
                , string pBody

            )
        {
            Exception checkException = null;
            string _MessageReturned = "";
            int _RowCount = 0;

            CvwCustomClearanceTracking objCvwCustomClearanceTracking = new CvwCustomClearanceTracking();
            CvwOperations objCvwOperations = new CvwOperations();
            CvwUsers objCvwUsers = new CvwUsers();
            checkException = objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            CDefaults objCDefaults = new CDefaults();
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

            checkException = objCvwCustomClearanceTracking.GetListPaging(999999, 1, "WHERE ID=" + pTrackingStageID_SendEmail, "ID", out _RowCount);
            checkException = objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].OperationID, "ID", out _RowCount);

            #region Sending Email
            //if (objCvwUsers.lstCVarvwUsers[0].Email == "0" || objCvwUsers.lstCVarvwUsers[0].Email == ""
            //    || objCvwUsers.lstCVarvwUsers[0].Email_Password == "0" || objCvwUsers.lstCVarvwUsers[0].Email_Password == ""
            //    || objCvwUsers.lstCVarvwUsers[0].Email_DisplayName == "0" || objCvwUsers.lstCVarvwUsers[0].Email_DisplayName == ""
            //    || objCvwUsers.lstCVarvwUsers[0].Email_Host == "0" || objCvwUsers.lstCVarvwUsers[0].Email_Host == ""
            //    || objCvwUsers.lstCVarvwUsers[0].Email_Port == 0)
            if (objCDefaults.lstCVarDefaults[0].Email == "0" || objCDefaults.lstCVarDefaults[0].Email == ""
                || objCDefaults.lstCVarDefaults[0].Email_Password == "0" || objCDefaults.lstCVarDefaults[0].Email_Password == ""
                || objCDefaults.lstCVarDefaults[0].Email_DisplayName == "0" || objCDefaults.lstCVarDefaults[0].Email_DisplayName == ""
                || objCDefaults.lstCVarDefaults[0].Email_Host == "0" || objCDefaults.lstCVarDefaults[0].Email_Host == ""
                || objCDefaults.lstCVarDefaults[0].Email_Port == 0)
                    _MessageReturned = "Please, review your email settings.";
            //else if (objCvwOperations.lstCVarvwOperations[0].ClientEmail == "0" || objCvwOperations.lstCVarvwOperations[0].ClientEmail == "")
            //    _MessageReturned = "The client email is not saved.";
            else
            {
                string _Subject = pSubject;//+  "[Tracking for Operation '" + objCvwOperations.lstCVarvwOperations[0].Code + "']";
                string _Body = "<b>Sender : " + objCvwUsers.lstCVarvwUsers[0].Email_DisplayName + "</b><br>" + "Dear Sir ," + "<br />" + "<br />"
                    + "Operation No. " + objCvwOperations.lstCVarvwOperations[0].Code + "<br />"
                    + "Custom Clearance . Route : " + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].RoutingCode + "-" + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].RoutingName + "<br />"
                    + "Tracking Stage: " + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].TrackingStageName + "<br />"
                    + "Tracking Date: " + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].StringTrackingDate + "<br />"
                    //+ "Notes: " + objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking[0].Notes + "<br />"
                    + "Notes: " + pBody + "<br />"
                    + "<br />" + "Thanks and best regards .............." + "<br />   "
                    + objCDefaults.lstCVarDefaults[0].Email_Footer;
                try
                {
                    var mail = new System.Net.Mail.MailMessage();
                    SmtpClient Client = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    Client.UseDefaultCredentials = true;
                    Client.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    mail.Subject = _Subject;        // put subject here  
                    mail.Body = _Body;
                    mail.IsBodyHtml = true;


                    string[] CCEmails = pCC.Split(',');
                    foreach (string CCEmail in CCEmails)
                    {
                        mail.CC.Add(new MailAddress(CCEmail)); //Adding Multiple CC email Id
                    }

                    string[] ToEmails = pTo.Split(',');
                    foreach (string ToEmail in ToEmails)
                    {
                        mail.To.Add(new MailAddress(ToEmail)); //Adding Multiple CC email Id
                    }
                    // mail.To.Add(new MailAddress(objCvwOperations.lstCVarvwOperations[0].ClientEmail));// put to address here




                    Client.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    Client.Send(mail);
                }
                catch (Exception ex)
                {
                    _MessageReturned = ex.Message;
                }

            }
            #endregion Sending Email

            return new object[]
            {
                _MessageReturned
            };
        }

    }
}
