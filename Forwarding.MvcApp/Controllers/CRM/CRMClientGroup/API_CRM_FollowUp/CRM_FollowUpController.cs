using Forwarding.MvcApp.Models.CRM.CRM_FollowUp.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ActionStatues.Generated;
using System.Globalization;
using MailKit.Search;

namespace Forwarding.MvcApp.Controllers.CRM.CRM_FollowUp
{
    public class CRM_FollowUpController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
            objCCRM_FollowUp.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_FollowUp.lstCVarCRM_FollowUp) };
        }
        
        [HttpGet, HttpPost]
        public Object[] IntializeData(int pID)
        {
            int _RowCount = 0;
            CCRM_Actions objActions = new CCRM_Actions();
            CUsers cUsers = new CUsers();
            CCRM_ActionStatues cCRM_ActionStatues = new CCRM_ActionStatues();
            CvwCRM_Clients CvwCRM_Clients = new CvwCRM_Clients();
            //--------------------------------------------
            objActions.GetList("where 1 = 1 Order By ActionPercent");
            cUsers.GetList("where IsNull(CustomerID , 0) = 0 AND 1 = 1");
            cCRM_ActionStatues.GetList("where 1 = 1");
            CvwCRM_Clients.GetListPaging(1, 1, $" WHERE ID = {pID}", "ID", out _RowCount);
            //-------------------------------------------

            return new Object[] { 
                new JavaScriptSerializer().Serialize(objActions.lstCVarCRM_Actions) //d[0] Actions
                , new JavaScriptSerializer().Serialize(cUsers.lstCVarUsers)    //d[1]   users
                , new JavaScriptSerializer().Serialize(cCRM_ActionStatues.lstCVarCRM_ActionStatues) //d[2]  Status
                , new JavaScriptSerializer().Serialize(CvwCRM_Clients.lstCVarvwCRM_Clients) //d[3]
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCRM_FollowUp objCvwCRM_FollowUp = new CCRM_FollowUp();
            //objCvwCRM_FollowUp.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCRM_FollowUp.lstCVarCRM_FollowUp.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwCRM_FollowUp.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_FollowUp.lstCVarCRM_FollowUp), _RowCount };
        }
        
        [HttpGet, HttpPost]
        public bool Insert(string pSalesRep, Int32 pSalesRepID2,
       string pActionType_ID,
       string pActionDate,
       string pNextStepID,
       string pNextStepDate,
       string pNotes,
       string pNextActionStatue_ID,
       string pClientID , string pPreCode,int pIsActualCustomer)
        {
            bool _result = false;

            

            if(pNextStepID == "" || pNextStepID == null || pNextStepID == "0")//If there is no next step
            {
                CVarCRM_FollowUp objCVarCRM_FollowUp = new CVarCRM_FollowUp();
                objCVarCRM_FollowUp.SalesRep = pSalesRep == null ? 0 : int.Parse(pSalesRep);
                objCVarCRM_FollowUp.SalesRepID2 = pSalesRepID2;
                objCVarCRM_FollowUp.ActionType_ID = pActionType_ID == null ? 0 : int.Parse(pActionType_ID);
                objCVarCRM_FollowUp.ActionDate = pActionDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pActionDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_FollowUp.NextStepID = pNextStepID == null ? 0 : int.Parse(pNextStepID);
                objCVarCRM_FollowUp.NextStepDate = pNextStepDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pNextStepDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_FollowUp.Notes = pNotes == null ? " " : pNotes;
                objCVarCRM_FollowUp.NextActionStatue_ID = pNextActionStatue_ID == null ? 1 : int.Parse(pNextActionStatue_ID);
                objCVarCRM_FollowUp.CRM_ClientID = pClientID == null ? 0 : int.Parse(pClientID);
                objCVarCRM_FollowUp.preCode = pPreCode == null ? 0 : int.Parse(pPreCode);
                objCVarCRM_FollowUp.CancelReason = " ";
                objCVarCRM_FollowUp.DenyReason = " ";
                objCVarCRM_FollowUp.NextActionStatueName = " ";
                objCVarCRM_FollowUp.ActionName = " ";
                objCVarCRM_FollowUp.NextActionName = " ";
                objCVarCRM_FollowUp.IsAlarmSent = false;
                objCVarCRM_FollowUp.IsActualCustomer = pIsActualCustomer;
                objCVarCRM_FollowUp.CreationDate = DateTime.Now;
                objCVarCRM_FollowUp.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_FollowUp.ModificationDate = DateTime.Now;
                objCVarCRM_FollowUp.ModifatorUserID = WebSecurity.CurrentUserId;

                CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
                objCCRM_FollowUp.lstCVarCRM_FollowUp.Add(objCVarCRM_FollowUp);
                Exception checkException = objCCRM_FollowUp.SaveMethod(objCCRM_FollowUp.lstCVarCRM_FollowUp);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;

            }
            else // If there is a next step
            {
                CVarCRM_FollowUp objCVarCRM_FollowUp = new CVarCRM_FollowUp();
                objCVarCRM_FollowUp.SalesRep = pSalesRep == null ? 0 : int.Parse(pSalesRep);
                objCVarCRM_FollowUp.SalesRepID2 = pSalesRepID2;
                objCVarCRM_FollowUp.ActionType_ID = pActionType_ID == null ? 0 : int.Parse(pActionType_ID);
                objCVarCRM_FollowUp.ActionDate = pActionDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pActionDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_FollowUp.NextStepID = pNextStepID == null ? 0 : int.Parse(pNextStepID);
                objCVarCRM_FollowUp.NextStepDate = pNextStepDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pNextStepDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_FollowUp.Notes = pNotes == null ? " " : pNotes;
                objCVarCRM_FollowUp.NextActionStatue_ID = pNextActionStatue_ID == null ? 1 : int.Parse(pNextActionStatue_ID);
                objCVarCRM_FollowUp.CRM_ClientID = pClientID == null ? 0 : int.Parse(pClientID);
                objCVarCRM_FollowUp.preCode = pPreCode == null ? 0 : int.Parse(pPreCode);
                objCVarCRM_FollowUp.CancelReason = " ";
                objCVarCRM_FollowUp.DenyReason = " ";
                objCVarCRM_FollowUp.NextActionStatueName = " ";
                objCVarCRM_FollowUp.ActionName = " ";
                objCVarCRM_FollowUp.NextActionName = " ";
                objCVarCRM_FollowUp.IsAlarmSent = false;
                objCVarCRM_FollowUp.IsActualCustomer = pIsActualCustomer;
                objCVarCRM_FollowUp.CreationDate = DateTime.Now;
                objCVarCRM_FollowUp.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_FollowUp.ModificationDate = DateTime.Now;
                objCVarCRM_FollowUp.ModifatorUserID = WebSecurity.CurrentUserId;

                CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
                objCCRM_FollowUp.lstCVarCRM_FollowUp.Add(objCVarCRM_FollowUp);
                Exception checkException = objCCRM_FollowUp.SaveMethod(objCCRM_FollowUp.lstCVarCRM_FollowUp);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;

                //if(_result)//Insert new row with a next step which inserted
                //{
                //    CVarCRM_FollowUp objCVarCRM_FollowUpNextStep = new CVarCRM_FollowUp();
                //    objCVarCRM_FollowUpNextStep.SalesRep = pSalesRep == null ? 0 : int.Parse(pSalesRep);
                //    objCVarCRM_FollowUpNextStep.SalesRepID2 = pSalesRepID2;
                //    objCVarCRM_FollowUpNextStep.ActionType_ID = pNextStepID == null ? 0 : int.Parse(pNextStepID);
                //    objCVarCRM_FollowUpNextStep.ActionDate = pNextStepDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pNextStepDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                //    objCVarCRM_FollowUpNextStep.NextStepID = 0;// pNextStepID == null ? 0 : int.Parse(pNextStepID);
                //    objCVarCRM_FollowUpNextStep.NextStepDate =  DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);//pNextStepDate == null ? DateTime.ParseExact("01/01/1700" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pNextStepDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                //    objCVarCRM_FollowUpNextStep.Notes = "0";// pNotes == null ? " " : pNotes;
                //    objCVarCRM_FollowUpNextStep.NextActionStatue_ID = 0;// pNextActionStatue_ID == null ? 1 : int.Parse(pNextActionStatue_ID);
                //    objCVarCRM_FollowUpNextStep.CRM_ClientID = pClientID == null ? 0 : int.Parse(pClientID);
                //    objCVarCRM_FollowUpNextStep.preCode = pPreCode == null ? 0 : int.Parse(pPreCode);
                //    objCVarCRM_FollowUpNextStep.CancelReason = " ";
                //    objCVarCRM_FollowUpNextStep.DenyReason = " ";
                //    objCVarCRM_FollowUpNextStep.NextActionStatueName = " ";
                //    objCVarCRM_FollowUpNextStep.ActionName = " ";
                //    objCVarCRM_FollowUpNextStep.NextActionName = " ";
                //    objCVarCRM_FollowUpNextStep.IsAlarmSent = false;
                //    objCVarCRM_FollowUp.IsActualCustomer = pIsActualCustomer;
                //    objCVarCRM_FollowUpNextStep.CreationDate = DateTime.Now;
                //    objCVarCRM_FollowUpNextStep.CreatorUserID = WebSecurity.CurrentUserId;
                //    objCVarCRM_FollowUpNextStep.ModificationDate = DateTime.Now;
                //    objCVarCRM_FollowUpNextStep.ModifatorUserID = WebSecurity.CurrentUserId;

                //    CCRM_FollowUp objCCRM_FollowUpNextStep = new CCRM_FollowUp();
                //    objCCRM_FollowUpNextStep.lstCVarCRM_FollowUp.Add(objCVarCRM_FollowUpNextStep);
                //    Exception checkException1 = objCCRM_FollowUpNextStep.SaveMethod(objCCRM_FollowUpNextStep.lstCVarCRM_FollowUp);
                //    if (checkException != null) // an exception is caught in the model
                //    {
                //        if (checkException.Message.Contains("UNIQUE"))
                //            _result = false;
                //    }
                //    else //not unique
                //        _result = true;

                //}

            }
            return _result;
        }

        // [Route("/api/CRM_FollowUp/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(string pID , string pSalesRep, Int32 pSalesRepID2,
       string pActionType_ID,
       string pActionDate,
       string pNextStepID,
       string pNextStepDate,
       string pNotes,
       string pNextActionStatue_ID,
       string pClientID  , string pPreCode , string pCancelReason, int pIsActualCustomer)
        {
            bool _result = false;

            CVarCRM_FollowUp objCVarCRM_FollowUp = new CVarCRM_FollowUp();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCRM_FollowUp objCGetCreationInformation = new CCRM_FollowUp();
            objCGetCreationInformation.GetItem(int.Parse(pID));
            objCVarCRM_FollowUp.CreatorUserID = objCGetCreationInformation.lstCVarCRM_FollowUp[0].CreatorUserID;
            objCVarCRM_FollowUp.CreationDate = objCGetCreationInformation.lstCVarCRM_FollowUp[0].CreationDate;
            objCVarCRM_FollowUp.IsAlarmSent = objCGetCreationInformation.lstCVarCRM_FollowUp[0].IsAlarmSent;
            objCVarCRM_FollowUp.UserAlarmed = objCGetCreationInformation.lstCVarCRM_FollowUp[0].UserAlarmed;
            objCVarCRM_FollowUp.ManagerAlarmed = objCGetCreationInformation.lstCVarCRM_FollowUp[0].ManagerAlarmed;
            objCVarCRM_FollowUp.IsActualCustomer = pIsActualCustomer;
            objCVarCRM_FollowUp.ID = int.Parse( pID );
            objCVarCRM_FollowUp.SalesRep = pSalesRep == null ? 0 : int.Parse(pSalesRep);
            objCVarCRM_FollowUp.SalesRepID2 = pSalesRepID2;
            objCVarCRM_FollowUp.ActionType_ID = pActionType_ID == null ? 0 : int.Parse(pActionType_ID);
            objCVarCRM_FollowUp.ActionDate = pActionDate == null ?  DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pActionDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
            objCVarCRM_FollowUp.NextStepID = pNextStepID == null ? 0 : int.Parse(pNextStepID);
            objCVarCRM_FollowUp.NextStepDate = pNextStepDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pNextStepDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
            objCVarCRM_FollowUp.Notes = pNotes == null ? " " : pNotes;
            objCVarCRM_FollowUp.CancelReason = pCancelReason == null ? " " : pCancelReason;
            objCVarCRM_FollowUp.NextActionStatue_ID = pNextActionStatue_ID == null ? 0 : int.Parse(pNextActionStatue_ID);
            objCVarCRM_FollowUp.CRM_ClientID = pClientID == null ? 0 : int.Parse(pClientID);
            objCVarCRM_FollowUp.preCode = pPreCode == null ? 0 : int.Parse(pPreCode);





          //  objCVarCRM_FollowUp.CancelReason = " ";

            objCVarCRM_FollowUp.DenyReason = " ";
            objCVarCRM_FollowUp.NextActionStatueName = " ";
            objCVarCRM_FollowUp.ActionName = " ";
            objCVarCRM_FollowUp.NextActionName = " ";




            objCVarCRM_FollowUp.ModifatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_FollowUp.ModificationDate = DateTime.Now;

            CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
            objCCRM_FollowUp.lstCVarCRM_FollowUp.Add(objCVarCRM_FollowUp);
            Exception checkException = objCCRM_FollowUp.SaveMethod(objCCRM_FollowUp.lstCVarCRM_FollowUp);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/CRM_FollowUp/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
        //    objCCRM_FollowUp.lstDeletedCPKCRM_FollowUp.Add(new CPKCRM_FollowUp() { ID = pID });
        //    objCCRM_FollowUp.DeleteItem(objCCRM_FollowUp.lstDeletedCPKCRM_FollowUp);
        //}

        // [Route("api/CRM_FollowUp/Delete/{pCRM_FollowUpIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCRM_FollowUpIDs)
        {
            bool _result = false;
            CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
            foreach (var currentID in pCRM_FollowUpIDs.Split(','))
            {
                objCCRM_FollowUp.lstDeletedCPKCRM_FollowUp.Add(new CPKCRM_FollowUp() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_FollowUp.DeleteItem(objCCRM_FollowUp.lstDeletedCPKCRM_FollowUp);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
    }
}
