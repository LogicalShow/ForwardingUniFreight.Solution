using Forwarding.MvcApp.Helpers;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using MoreLinq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using Forwarding.MvcApp.Entities.Quotations;

namespace Forwarding.MvcApp.Controllers.Administration.API_Settings
{
    public class LicenseExpireDateAlarmsUsersController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] GetUsers()
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwLicenseExpireDateAlarms_Users cvwLicenseExpireDateAlarms_Users = new CvwLicenseExpireDateAlarms_Users();
            cvwLicenseExpireDateAlarms_Users.GetList("where 1 = 1 ");
            
            CUsers cUsers = new CUsers();
            cUsers.GetList("where IsNull(CustomerID , 0) = 0 ");
            
            return new Object[] {

                serialize.Serialize(cvwLicenseExpireDateAlarms_Users.lstCVarvwLicenseExpireDateAlarms_Users)

                ,

                serialize.Serialize(cUsers.lstCVarUsers)
            };
        }
        
        [HttpPost, HttpGet]
        public object[] SendEmailAndAlarmForLicenseExpireDates()
        {
            var constCustomerPartnerTypeID = 1;
            var constAgentPartnerTypeID = 2;

            Exception checkException = null;
            int _RowCount = 0;

            #region Delete from operation log older than 3 months
            COperationLog objCOperationLog = new COperationLog();
            checkException = objCOperationLog.DeleteList("WHERE DATEDIFF(DAY, ActionDate, getdate()) > 90");
            #endregion Delete from operation log older than 3 months

            #region Delete alarms older than 3 months
            CEmail objCEmail = new CEmail();
            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
            checkException = objCEmailReceiver.DeleteList("WHERE EmailID IN (SELECT ID FROM Email WHERE DATEDIFF(DAY, SendingDate, getdate()) > 90)");
            checkException = objCEmail.DeleteList("WHERE DATEDIFF(DAY, SendingDate, getdate()) > 90");
            //set alarm off for any 3 month old emails
            checkException = objCEmailReceiver.UpdateList("IsAlarm=0 WHERE EmailID IN (SELECT ID FROM Email WHERE DATEDIFF(DAY, SendingDate, getdate()) > 90)");
            #endregion Delete alarms older than 3 months

            //IsSentInsuranceDate
            var CurrentDate = DateTime.Now;
            CAutoAlarmAndEmails_SendingDates cAutoAlarmAndEmails_SendingDates = new CAutoAlarmAndEmails_SendingDates();
            var WhereCondition = " where Convert(Date,AutoAlarmAndEmails_SendingDates.Date) >= '" + CurrentDate.Date + "' ";
            cAutoAlarmAndEmails_SendingDates.GetList(WhereCondition);

            List<CVarAutoAlarmAndEmails_Log> ListOfcVarAutoAlarmAndEmails_Log = new List<CVarAutoAlarmAndEmails_Log>();
            CAutoAlarmAndEmails_Log cAutoAlarmAndEmails_Log = new CAutoAlarmAndEmails_Log();
            //Check If we Sent Alarm Today
            if (cAutoAlarmAndEmails_SendingDates.lstCVarAutoAlarmAndEmails_SendingDates.Count == 0)
            {//[NO]
                #region UpdateCheckedTodaySentEmail
                cAutoAlarmAndEmails_SendingDates.SaveMethod(new List<CVarAutoAlarmAndEmails_SendingDates>() { new CVarAutoAlarmAndEmails_SendingDates { ID = 0, Date = CurrentDate.Date } });
                #endregion UpdateCheckedTodaySentEmail

                #region LicenseExpireDates
                CvwTruckingLicenseExpireDates cvwTruckingLicenseExpireDates = new CvwTruckingLicenseExpireDates();
                CvwTruckingLicenseExpireDates cvwInsuranceDates = new CvwTruckingLicenseExpireDates();


                List<CVarvwTruckingLicenseExpireDates> cVarvwListOfAllvwTruckingLicenseExpireDates = new List<CVarvwTruckingLicenseExpireDates>();
                //--------------
                //  IsSent For LicenseExpireDates
                cvwTruckingLicenseExpireDates.GetList(" where IsNull( vwTruckingLicenseExpireDates.IsSent,0) = 0 AND ( ( dbo.Date_GetDaysNoBetweenDates('" + CurrentDate.Date + "' ,vwTruckingLicenseExpireDates.LicenseNumberExpireDate) Between 0 and 30 )  ) ");

                //  IsSentInsuranceDate For InsuranceDate
                cvwInsuranceDates.GetList(" where IsNull( vwTruckingLicenseExpireDates.IsSentInsuranceDate,0) = 0 AND  ( ( dbo.Date_GetDaysNoBetweenDates('" + CurrentDate.Date + "' ,vwTruckingLicenseExpireDates.InsuranceDate) Between 0 and 30 ) )  ");
                //--------------

                cVarvwListOfAllvwTruckingLicenseExpireDates.AddRange(cvwTruckingLicenseExpireDates.lstCVarvwTruckingLicenseExpireDates);
                cVarvwListOfAllvwTruckingLicenseExpireDates.AddRange(cvwInsuranceDates.lstCVarvwTruckingLicenseExpireDates);

                //--------------
                CDefaults objCDefaults = new CDefaults();
                objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

                //Check If we Need Send Alarm Today
                if (cVarvwListOfAllvwTruckingLicenseExpireDates.Count > 0)
                {//[YES]

                    CvwLicenseExpireDateAlarms_Users cvwLicenseExpireDateAlarms_Users = new CvwLicenseExpireDateAlarms_Users();
                    cvwLicenseExpireDateAlarms_Users.GetList("where 1 = 1");

                    var pArrUserIDs = cvwLicenseExpireDateAlarms_Users.lstCVarvwLicenseExpireDateAlarms_Users.Select(x => x.UserID).ToList();
                    var pUserIDs = string.Join(",", pArrUserIDs);

                    var Subject = "";
                    var Body = "";

                    foreach (var TruckingObject in cVarvwListOfAllvwTruckingLicenseExpireDates.DistinctBy(x=> x.strID).ToList())
                    {

                        var strID = TruckingObject.strID;
                        var IsExpireDate = ((cvwTruckingLicenseExpireDates.lstCVarvwTruckingLicenseExpireDates.Count == 0 || (cvwTruckingLicenseExpireDates.lstCVarvwTruckingLicenseExpireDates.Where(x => x.ID == TruckingObject.ID && x.TruckingType == TruckingObject.TruckingType).ToList().Count == 0)) ? false : true);
                        var IsInsuranceDate = ((cvwInsuranceDates.lstCVarvwTruckingLicenseExpireDates.Count == 0 || (cvwInsuranceDates.lstCVarvwTruckingLicenseExpireDates.Where(x => x.ID == TruckingObject.ID && x.TruckingType == TruckingObject.TruckingType).ToList().Count == 0)) ? false : true);


                        if(IsExpireDate && IsInsuranceDate)
                        {
                        ListOfcVarAutoAlarmAndEmails_Log.Add(new CVarAutoAlarmAndEmails_Log
                        {
                            ID = 0
                           ,
                            ExpireDate = TruckingObject.LicenseNumberExpireDate //(IsExpireDate ? TruckingObject.LicenseNumberExpireDate : TruckingObject.InsuranceDate)
                           ,
                            SendingDate = CurrentDate
                           ,
                            Type = TruckingObject.TruckingType
                           ,
                            TypeID = TruckingObject.ID
                           ,
                            Notes = "Type : " + TruckingObject.TruckingType + " Name : " + TruckingObject.Name + " Code : " + TruckingObject.Code + " | " + " [Expire Date]" + " Issue"
                           ,
                            CreationDate = TruckingObject.LicenseNumberExpireDate
                           ,
                            IsExpireDate = true
                        });

                            Body += " <br> • The " + TruckingObject.TruckingType + " : " + TruckingObject.Name + " [" + TruckingObject.Code + "] License  Expiration " + TruckingObject.strLicenseNumberExpireDate + " ; ";


                            //-----------------------------------------------------------------------------------

                         ListOfcVarAutoAlarmAndEmails_Log.Add(new CVarAutoAlarmAndEmails_Log
                        {
                            ID = 0
                           ,
                            ExpireDate = TruckingObject.InsuranceDate //(IsExpireDate ? TruckingObject.LicenseNumberExpireDate : TruckingObject.InsuranceDate)
                           ,
                            SendingDate = CurrentDate
                           ,
                            Type = TruckingObject.TruckingType
                           ,
                            TypeID = TruckingObject.ID
                           ,
                            Notes = "Type : " + TruckingObject.TruckingType + " Name : " + TruckingObject.Name + " Code : " + TruckingObject.Code + " | " + " [Insurance Date]" + " Issue"
                           ,
                            CreationDate = TruckingObject.InsuranceDate
                           ,
                            IsExpireDate = false
                        });

                            Body += " <br> • The " + TruckingObject.TruckingType + " : " + TruckingObject.Name + " [" + TruckingObject.Code + "] Insurance Expiration Date " + TruckingObject.strInsuranceDate + " ; ";


                        }
                        else
                        {
                          ListOfcVarAutoAlarmAndEmails_Log.Add(new CVarAutoAlarmAndEmails_Log
                        {
                            ID = 0
                           ,
                            ExpireDate = (IsExpireDate ? TruckingObject.LicenseNumberExpireDate : TruckingObject.InsuranceDate)
                           ,
                            SendingDate = CurrentDate
                           ,
                            Type = TruckingObject.TruckingType
                           ,
                            TypeID = TruckingObject.ID
                           ,
                            Notes = "Type : " + TruckingObject.TruckingType + " Name : " + TruckingObject.Name + " Code : " + TruckingObject.Code + " | " + (IsExpireDate == true ? " [Expire Date]" : " [Insurance Date]") + " Issue"
                           ,
                            CreationDate = TruckingObject.LicenseNumberExpireDate
                           ,
                            IsExpireDate = IsExpireDate
                        });
                          if (IsExpireDate == true)
                        {
                            Body += " <br> • The " + TruckingObject.TruckingType + " : " + TruckingObject.Name + " [" + TruckingObject.Code + "] License Expiration " + TruckingObject.strLicenseNumberExpireDate + " ; ";
                        }
                          else
                        {
                            Body += " <br> • The " + TruckingObject.TruckingType + " : " + TruckingObject.Name + " [" + TruckingObject.Code + "] Insurance Expiration  " + TruckingObject.strInsuranceDate + " ; ";

                        }
                        }




                    }

                    Subject = " Alert for near expiry License / Insurance Date  ";
                    if (pUserIDs != null && pUserIDs != "")
                    {
                        EmailsAndAlarms.SendAlarm(pUserIDs, Subject, Body, pQuotationRouteID: 0, pPricingID: 0, pRequestOrReply: 0, pOperationID: 0, ParentID: 0, pEmailSource: 0, pIsAlarm: true);

                        //if(objCDefaults.lstCVarDefaults[0].IsDepartmentOption)
                        //EmailsAndAlarms.SendEmail(pUserIDs, Subject, Body, objCDefaults);
                    }
                    cAutoAlarmAndEmails_Log.SaveMethod(ListOfcVarAutoAlarmAndEmails_Log);
                }

                #endregion LicenseExpireDates

                #region vwQuotationRoute

                CvwQuotationRoute cvwQuotationRoute = new CvwQuotationRoute();
                CQuotationRoute cQuotationRoute = new CQuotationRoute();

                var t = 10;

                // Get Data That Needed To Send Emails & Alarms
                cvwQuotationRoute.GetListPaging(10000, 1, "where ( IsNull( vwQuotationRoute.Is48HourAlarmSent,0) = 0 AND dbo.Date_GetDaysNoBetweenDates(vwQuotationRoute.CreationDate , '" + CurrentDate.Date + "') Between 2 AND 10 ) AND ( IsNull(vwQuotationRoute.ZeroCostChargesCount,0) = 0 OR IsNull(vwQuotationRoute.ChargesCount,0) = 0 )", " ID ", out t);
                if (cvwQuotationRoute.lstCVarvwQuotationRoute.Count > 0)
                {
                    // Get Quotation Route IDs ---- For Update All
                    var pArrQuotationRouteIDs = cvwQuotationRoute.lstCVarvwQuotationRoute.Select(x => x.ID).ToList();
                    var pQuotationRouteIDs = string.Join(",", pArrQuotationRouteIDs);

                    // Alarm & Email Subject
                    var Subject = " Alert for missing cost after 48 hours ";

                    // Get Distinct Users Who Need Send Email For Them
                    var UsersIDs = cvwQuotationRoute.lstCVarvwQuotationRoute.DistinctBy(x => x.CreatorUserID).Select(x => x.CreatorUserID).ToList();
                    if (UsersIDs != null && UsersIDs.Count > 0)
                    {
                        // For Each User
                        foreach (var UserID in UsersIDs)
                        {
                            // Get User Data From Current List
                            var UserQuotationRoutes = cvwQuotationRoute.lstCVarvwQuotationRoute.Where(x => x.CreatorUserID == UserID).ToList();

                            var Body = "";

                            if (UserQuotationRoutes != null && UserQuotationRoutes.Count > 0)
                            {
                                // For Each [ User ] QuotationRoutes
                                foreach (var QR in UserQuotationRoutes)
                                {


                                    ListOfcVarAutoAlarmAndEmails_Log.Add(new CVarAutoAlarmAndEmails_Log
                                    {
                                        ID = 0
                                       ,
                                        ExpireDate = QR.CreationDate
                                       ,
                                        SendingDate = CurrentDate
                                       ,
                                        Type = "QuotationsMissingCost"
                                       ,
                                        TypeID = QR.ID
                                       ,
                                        Notes = "Type : " + "QuotationsMissingCost" + " Quotation Code : " + QR.QuotationCode + " Quotation Route Code : " + QR.Code
                                       ,
                                        CreationDate = QR.CreationDate
                                    });

                                    Body += "  <br> • " + " Quotation Code [ " + QR.QuotationCode + "] Quotation Route Code [ " + QR.Code + " ] that created on " + QR.CreationDate.ToString("MMMM dd, yyyy") + " by " + QR.CreatorName + " ; " + "\n";

                                }
                                // Send Email TO User ---------------
                                var strUserID = UserID.ToString();
                                EmailsAndAlarms.SendAlarm(strUserID, Subject, Body, pQuotationRouteID: 0, pPricingID: 0, pRequestOrReply: 0, pOperationID: 0, ParentID: 0, pEmailSource: 0, pIsAlarm: true);

                                //if (objCDefaults.lstCVarDefaults[0].IsDepartmentOption)
                                //EmailsAndAlarms.SendEmail(strUserID, Subject, Body, objCDefaults);


                            }
                        }
                    }



                    if (cvwQuotationRoute.lstCVarvwQuotationRoute.Count > 0)
                    {
                        cAutoAlarmAndEmails_Log.SaveMethod(ListOfcVarAutoAlarmAndEmails_Log);
                        cQuotationRoute.UpdateList(" Is48HourAlarmSent = 1 Where ID In(" + pQuotationRouteIDs + ")");
                    }
                }
                #endregion vwQuotationRoute
            }

            return new object[] { };
        }
        
        [HttpPost]
        public object[] UpdateLicenseExpireDateAlarmsUsers([FromBody] ObjUpdateLicenseExpireDateAlarmsUsers updateUserData)
        {
            bool _result = false;
            CVarUsers objCVarUsers = new CVarUsers();

            int _RowCount = 0;

            var CheckedUserIDs = updateUserData.pUserIDs;
            CLicenseExpireDateAlarms_Users cLicenseExpireDateAlarms_Users = new CLicenseExpireDateAlarms_Users();
            var checkException = cLicenseExpireDateAlarms_Users.DeleteList("Where 1 = 1");


            if (CheckedUserIDs != null && CheckedUserIDs != "" && CheckedUserIDs != ",")
            {
                List<CVarLicenseExpireDateAlarms_Users> cvarLicenseExpireDateAlarms_Users = new List<CVarLicenseExpireDateAlarms_Users>();

                foreach (var item in CheckedUserIDs.Split(','))
                {
                    cvarLicenseExpireDateAlarms_Users.Add(new CVarLicenseExpireDateAlarms_Users { ID = 0, UserID = int.Parse(item) });
                }

                checkException =  cLicenseExpireDateAlarms_Users.SaveMethod(cvarLicenseExpireDateAlarms_Users);
            }





            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
            {


                _result = true;

            }
            return new object[] { _result };
        }
        
    }

    public class ObjUpdateLicenseExpireDateAlarmsUsers
    {

        public string pUserIDs { get; set; }

    }
}
