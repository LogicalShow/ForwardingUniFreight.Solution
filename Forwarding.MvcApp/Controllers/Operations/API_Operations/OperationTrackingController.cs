using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class OperationTrackingController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwOperationTracking objCvwOperationTracking = new CvwOperationTracking();
            objCvwOperationTracking.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwOperationTracking.lstCVarvwOperationTracking) };
        }

        [HttpGet, HttpPost]
        public object[] Insert(Int64 pOperationID, Int32 pTrackingStageID, Int32 pCustodyID, DateTime pTrackingDate, DateTime pReleasingDate, DateTime pLoadingDate, string pNotes, string pPickupAddress, string pDeliveryAddress, string pOtherAddress, string pContactDetails, bool pDone, bool pIsAlarmed)
        {
            bool _result = false;
            CvwOperationTracking objCvwOperationTracking = new CvwOperationTracking();

            CVarOperationTracking objCVarOperationTracking = new CVarOperationTracking();
            objCVarOperationTracking.OperationID = pOperationID;
            objCVarOperationTracking.TrackingStageID = pTrackingStageID;
            objCVarOperationTracking.CustodyID = pCustodyID;
            objCVarOperationTracking.TrackingDate = pTrackingDate;
            objCVarOperationTracking.ReleasingDate = pReleasingDate;
            objCVarOperationTracking.LoadingDate = pLoadingDate;
            objCVarOperationTracking.Notes = pNotes;
            objCVarOperationTracking.PickupAddress = pPickupAddress;
            objCVarOperationTracking.DeliveryAddress = pDeliveryAddress;
            objCVarOperationTracking.OtherAddress = pOtherAddress;
            objCVarOperationTracking.ContactDetails = pContactDetails;
            objCVarOperationTracking.Done = pDone;
            objCVarOperationTracking.IsAlarmed = pIsAlarmed;
            objCVarOperationTracking.CreatorUserID = objCVarOperationTracking.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarOperationTracking.CreationDate = objCVarOperationTracking.ModificationDate = DateTime.Now;

            COperationTracking objCOperationTracking = new COperationTracking();
            objCOperationTracking.lstCVarOperationTracking.Add(objCVarOperationTracking);
            Exception checkException = objCOperationTracking.SaveMethod(objCOperationTracking.lstCVarOperationTracking);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                objCvwOperationTracking.GetList("WHERE OperationID=" + pOperationID.ToString() + " OR MasterOperationID=" + pOperationID.ToString() + " ORDER BY ViewOrder, TrackingDate");
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwOperationTracking.lstCVarvwOperationTracking) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] Update(Int64 pID, Int64 pOperationID, Int32 pTrackingStageID, Int32 pCustodyID, DateTime pTrackingDate, DateTime pReleasingDate, DateTime pLoadingDate, string pNotes, string pPickupAddress, string pDeliveryAddress, string pOtherAddress, string pContactDetails, bool pDone, bool pIsAlarmed)
        {
            bool _result = false;
            CvwOperationTracking objCvwOperationTracking = new CvwOperationTracking();
            CVarOperationTracking objCVarOperationTracking = new CVarOperationTracking();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            COperationTracking objCGetCreationInformation = new COperationTracking();
            objCGetCreationInformation.GetItem(pID);
            objCVarOperationTracking.CreatorUserID = objCGetCreationInformation.lstCVarOperationTracking[0].CreatorUserID;
            objCVarOperationTracking.CreationDate = objCGetCreationInformation.lstCVarOperationTracking[0].CreationDate;

            objCVarOperationTracking.ID = pID;
            objCVarOperationTracking.OperationID = pOperationID;
            objCVarOperationTracking.TrackingStageID = pTrackingStageID;
            objCVarOperationTracking.CustodyID = pCustodyID;
            objCVarOperationTracking.TrackingDate = pTrackingDate;
            objCVarOperationTracking.ReleasingDate = pReleasingDate;
            objCVarOperationTracking.LoadingDate = pLoadingDate;
            objCVarOperationTracking.Notes = pNotes;
            objCVarOperationTracking.PickupAddress = pPickupAddress;
            objCVarOperationTracking.DeliveryAddress = pDeliveryAddress;
            objCVarOperationTracking.OtherAddress = pOtherAddress;
            objCVarOperationTracking.ContactDetails = pContactDetails;
            objCVarOperationTracking.Done = pDone;
            objCVarOperationTracking.IsAlarmed = pIsAlarmed;
            objCVarOperationTracking.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarOperationTracking.ModificationDate = DateTime.Now;

            COperationTracking objCOperationTracking = new COperationTracking();
            objCOperationTracking.lstCVarOperationTracking.Add(objCVarOperationTracking);
            Exception checkException = objCOperationTracking.SaveMethod(objCOperationTracking.lstCVarOperationTracking);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                objCvwOperationTracking.GetList("WHERE OperationID=" + pOperationID.ToString() + " OR MasterOperationID=" + pOperationID.ToString() + " ORDER BY ViewOrder, TrackingDate");
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwOperationTracking.lstCVarvwOperationTracking) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] Delete(String pDeletedTrackingIDs, Int64 pOperationID)
        {
            bool _result = false;
            CvwOperationTracking objCvwOperationTracking = new CvwOperationTracking();
            COperationTracking objCOperationTracking = new COperationTracking();
            foreach (var currentID in pDeletedTrackingIDs.Split(','))
            {
                objCOperationTracking.lstDeletedCPKOperationTracking.Add(new CPKOperationTracking() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCOperationTracking.DeleteItem(objCOperationTracking.lstDeletedCPKOperationTracking);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else
            { //deleted successfully
                _result = true;
                objCvwOperationTracking.GetList("WHERE OperationID=" + pOperationID.ToString() + " OR MasterOperationID=" + pOperationID.ToString() + " ORDER BY ViewOrder, TrackingDate");
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwOperationTracking.lstCVarvwOperationTracking) : null
            };
        }

        [HttpGet, HttpPost]
        public string SendAlarmToGroup(Int64 pTrackingStageID, string pAlarmReceiversDepartmentsIDs, Int64 pOperationID, bool pDone = false)
        {
            int total = 0;
            string messageReturned = "";
            var CUsers = new CUsers();
            CUsers.GetListPaging(999, 1, "WHERE DepartmentID IN (" + pAlarmReceiversDepartmentsIDs + ") ", "ID", out total);

            var pAlarmReceiversIDs = "";

            foreach (var user in CUsers.lstCVarUsers)
            {
                pAlarmReceiversIDs += (pAlarmReceiversIDs == "" ? "" : ",") + user.ID;
            }

            if (total != 0)
            {
                messageReturned = SendAlarm(pTrackingStageID, pAlarmReceiversIDs, pOperationID, pDone);
            }
            else
            {
                messageReturned = "There are no users in the selected Departments";
            }

            if (messageReturned == "")
            {
                // update OperationTracking.IsAlarmed
                var COperationTracking = new COperationTracking();
                string UpdateClause = "IsAlarmed=1 WHERE ID=" + pTrackingStageID;
                COperationTracking.UpdateList(UpdateClause);

            }

            return messageReturned;
        }


        [HttpGet, HttpPost]
        public string SendAlarm(Int64 pTrackingStageID, string pAlarmReceiversIDs, Int64 pOperationID, bool pDone = false)
        {
            //if pTrackingStageID == 0 this means create Trucking Task and Alarm for MED
            Exception checkException = null;
            string _MessageReturned = "";
            int _RowCount = 0;
            int constEmailSourceTruckingTask = 20;
            bool _IsTruckingTask = pTrackingStageID == 0 ? true : false;
            var CDefaults = new CDefaults();
            CDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            CvwOperationTracking objCvwOperationTracking = new CvwOperationTracking();
            CvwOperations objCvwOperations = new CvwOperations();
            #region Add Trucking Task if pTrackingStageID=0
            if (pTrackingStageID == 0)
            {
                CTrackingStage objCTrackingStage = new CTrackingStage();
                objCTrackingStage.GetList("WHERE Name=N'TRUCKING'");
                if (objCTrackingStage.lstCVarTrackingStage.Count == 0)
                    _MessageReturned = "Please, add TRUCKING task to Master Data --> Tracking Stages";
                else
                {
                    CVarOperationTracking objCVarOperationTracking = new CVarOperationTracking();
                    objCVarOperationTracking.OperationID = pOperationID;
                    objCVarOperationTracking.TrackingStageID = objCTrackingStage.lstCVarTrackingStage[0].ID;
                    objCVarOperationTracking.CustodyID = 0;
                    objCVarOperationTracking.TrackingDate = DateTime.Now;
                    objCVarOperationTracking.ReleasingDate = DateTime.Parse("01-01-1900");
                    objCVarOperationTracking.LoadingDate = DateTime.Parse("01-01-1900");
                    objCVarOperationTracking.Notes = "0";
                    objCVarOperationTracking.PickupAddress = "0";
                    objCVarOperationTracking.DeliveryAddress = "0";
                    objCVarOperationTracking.OtherAddress = "0";
                    objCVarOperationTracking.ContactDetails = "0";
                    objCVarOperationTracking.Done = false;
                    objCVarOperationTracking.IsAlarmed = false;
                    objCVarOperationTracking.CreatorUserID = objCVarOperationTracking.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationTracking.CreationDate = objCVarOperationTracking.ModificationDate = DateTime.Now;

                    COperationTracking objCOperationTracking = new COperationTracking();
                    objCOperationTracking.lstCVarOperationTracking.Add(objCVarOperationTracking);
                    checkException = objCOperationTracking.SaveMethod(objCOperationTracking.lstCVarOperationTracking);
                    pTrackingStageID = objCVarOperationTracking.ID;
                }
            }
            #endregion Add Trucking Task if pTrackingStageID=0

            #region Sending Alarm
            if (pAlarmReceiversIDs != null && _MessageReturned == "")
            {
                checkException = objCvwOperationTracking.GetListPaging(999999, 1, "WHERE ID=" + pTrackingStageID, "ID", out _RowCount);
                checkException = objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + pOperationID/*objCvwOperationTracking.lstCVarvwOperationTracking[0].OperationID*/, "ID", out _RowCount);

                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();

                if(CDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED" && pDone == true)
                {
                    objCVarEmail.Subject = "Trucking Task Done: Operation '" + objCvwOperations.lstCVarvwOperations[0].Code + "'";
                } else
                {
                    objCVarEmail.Subject = "Incoming Task: Operation '" + objCvwOperations.lstCVarvwOperations[0].Code + "'";
                }
                
                objCVarEmail.Body = "Operation No. " + objCvwOperations.lstCVarvwOperations[0].Code + "\n"
                    + "Task: " + objCvwOperationTracking.lstCVarvwOperationTracking[0].TrackingStageName + "\n"
                    + "Task Date: " + objCvwOperationTracking.lstCVarvwOperationTracking[0].StringTrackingDate + "\n"
                    + "Notes: " + objCvwOperationTracking.lstCVarvwOperationTracking[0].Notes + "\n";
                objCVarEmail.QuotationRouteID = 0;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                if (_IsTruckingTask || CDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED")
                {
                    objCVarEmail.EmailSource = constEmailSourceTruckingTask;
                    objCVarEmail.OperationID = objCvwOperations.lstCVarvwOperations[0].ID;
                }
                if(CDefaults.lstCVarDefaults[0].UnEditableCompanyName == "BED")
                {
                    objCVarEmail.OperationID = objCvwOperations.lstCVarvwOperations[0].ID;
                }
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

            return _MessageReturned;
        }



        [HttpGet, HttpPost]
        public object[] OperationTracking_SendEmail(
                  Int64 pTrackingStageID_SendEmail
                , string pSubject
                , string pTo
                , string pCC
                , string pBody

            )
        {
            Exception checkException = null;
            string _MessageReturned = "";
            int _RowCount = 0;

            CvwOperationTracking objCvwOperationTracking = new CvwOperationTracking();
            CvwOperations objCvwOperations = new CvwOperations();
            CvwUsers objCvwUsers = new CvwUsers();
            checkException = objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            CDefaults objCDefaults = new CDefaults();
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

            checkException = objCvwOperationTracking.GetListPaging(999999, 1, "WHERE ID=" + pTrackingStageID_SendEmail, "ID", out _RowCount);
            checkException = objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + objCvwOperationTracking.lstCVarvwOperationTracking[0].OperationID, "ID", out _RowCount);

            #region Sending Email
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
                string _Body = "<b>Sent From : " + objCvwUsers.lstCVarvwUsers[0].Name + "</b><br />" + "<br />"
                    + "Dear Sir ," + "<br />" + "<br />"
                    + "Operation No. " + objCvwOperations.lstCVarvwOperations[0].Code + "<br />"
                    + "Tracking Stage: " + objCvwOperationTracking.lstCVarvwOperationTracking[0].TrackingStageName + "<br />"
                    + "Tracking Date: " + objCvwOperationTracking.lstCVarvwOperationTracking[0].StringTrackingDate + "<br />"
                    //+ "Notes: " + objCvwOperationTracking.lstCVarvwOperationTracking[0].Notes + "<br />"
                    + "Notes: " + pBody + "<br />"
                    + "<br />" + "Thanks and best regards .............." + "<br />   "
                    + objCDefaults.lstCVarDefaults[0].Email_Footer;
                try
                {
                    var mail = new System.Net.Mail.MailMessage();
                    SmtpClient Client = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    Client.UseDefaultCredentials = true;
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                    {
                        Client.Credentials = new System.Net.NetworkCredential("apikey", CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                        mail.CC.Add(new MailAddress("customersupport@elite-log.com"));
                        mail.CC.Add(new MailAddress("mostafa.hanafy@elite-log.com"));
                        mail.CC.Add(new MailAddress("kareem.hassan@elite-log.com"));
                        mail.CC.Add(new MailAddress("operations@elite-log.com"));
                    } else
                    {
                        Client.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                    }
                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    mail.Subject = _Subject;        // put subject here  
                    mail.Body = _Body;
                    mail.IsBodyHtml = true;

                    if (pCC != "0")
                    {
                        string[] CCEmails = pCC.Split(',');
                        foreach (string CCEmail in CCEmails)
                        {
                            mail.CC.Add(new MailAddress(CCEmail)); //Adding Multiple CC email Id
                        }
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
