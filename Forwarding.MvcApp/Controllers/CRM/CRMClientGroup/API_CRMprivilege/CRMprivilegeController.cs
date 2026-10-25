using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_FollowUp.Generated;
using Forwarding.MvcApp.Models.CRM.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.CRM.API_CRM_Actions
{
    public class CRMprivilegeController : ApiController
    {
        //[Route("/api/CRM_Actions/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CCRM_privilege objCCRM_privilege = new CCRM_privilege();
            objCCRM_privilege.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_privilege.lstCVarCRM_privilege) };
        }
        
        // [Route("/api/CRM_Actions/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Saveprivileges(int pID, String pUserIDs)
        {
            bool _result = false;
            CCRM_privilege objCCRM_privilegeExists = new CCRM_privilege();
            objCCRM_privilegeExists.GetList(" Where ID = " + pID);
            
            CVarCRM_privilege objCVarCRM_privilege = new CVarCRM_privilege();
            objCVarCRM_privilege.ID = pID;
            objCVarCRM_privilege.UsersIDs = pUserIDs;
            objCVarCRM_privilege.privilegeName = objCCRM_privilegeExists.lstCVarCRM_privilege[0].privilegeName;
            CCRM_privilege objCCRM_privilege = new CCRM_privilege();
            objCCRM_privilege.lstCVarCRM_privilege.Add(objCVarCRM_privilege);
            Exception checkException = objCCRM_privilege.SaveMethod(objCCRM_privilege.lstCVarCRM_privilege);
            //if(checkException == null)
            //{
            //    CCRM_privilegeLog objCCRM_privilegeLog = new CCRM_privilegeLog();
            //    CVarCRM_privilegeLog objCVarCRM_privilegeLog = new CVarCRM_privilegeLog();
            //    objCVarCRM_privilegeLog.ID = 0;
            //    objCVarCRM_privilegeLog.PipeLineStageID = pPipeLineStageID;
            //    objCVarCRM_privilegeLog.CreationDate = DateTime.Now;
            //    objCVarCRM_privilegeLog.CreatorUserID = WebSecurity.CurrentUserId;
            //    objCVarCRM_privilegeLog.ModificationDate = DateTime.Now;
            //    objCVarCRM_privilegeLog.ModificationUserID = WebSecurity.CurrentUserId;

            //}
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }
        
        [HttpGet, HttpPost]
        public bool Delete(String pCRM_ActionsIDs)
        {
            bool _result = false;
            CCRM_Actions objCCRM_Actions = new CCRM_Actions();
            foreach (var currentID in pCRM_ActionsIDs.Split(','))
            {
                objCCRM_Actions.lstDeletedCPKCRM_Actions.Add(new CPKCRM_Actions() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_Actions.DeleteItem(objCCRM_Actions.lstDeletedCPKCRM_Actions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(int pID, int pActionID, int pStatusID)
        {
            CVarCRM_privilege objCVarCRM_privilege = new CVarCRM_privilege();
            CCRM_privilege objCCRM_privilege = new CCRM_privilege();
            objCCRM_privilege.UpdateList($" ActionID = {pActionID},StatusID = {pStatusID} WHERE ID = {pID}");
            return false;
        }
        [HttpGet, HttpPost]
        public bool InsertMonths(int pMonths)
        {
            bool _result = false;
            CCRM_SetupInvalidSalesLeadMonths objCCRM_SetupInvalidSalesLeadMonths = new CCRM_SetupInvalidSalesLeadMonths();
            CVarCRM_SetupInvalidSalesLeadMonths objCVarCRM_SetupInvalidSalesLeadMonths = new CVarCRM_SetupInvalidSalesLeadMonths();
            objCVarCRM_SetupInvalidSalesLeadMonths.ID = 0;
            objCVarCRM_SetupInvalidSalesLeadMonths.NumOfMonths = pMonths;
            objCVarCRM_SetupInvalidSalesLeadMonths.creationDate = DateTime.Now;
            objCVarCRM_SetupInvalidSalesLeadMonths.creatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_SetupInvalidSalesLeadMonths.creatorUserName = WebSecurity.CurrentUserName;
            objCCRM_SetupInvalidSalesLeadMonths.lstCVarCRM_SetupInvalidSalesLeadMonths.Add(objCVarCRM_SetupInvalidSalesLeadMonths);
            Exception checkException = objCCRM_SetupInvalidSalesLeadMonths.SaveMethod(objCCRM_SetupInvalidSalesLeadMonths.lstCVarCRM_SetupInvalidSalesLeadMonths);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        
             [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] GetLastsetupinvalidsalesleadMonth()
        {
            CCRM_SetupInvalidSalesLeadMonths objCCRM_SetupInvalidSalesLeadMonths = new CCRM_SetupInvalidSalesLeadMonths();
            objCCRM_SetupInvalidSalesLeadMonths.GetList(" where 1=1 order by ID desc");
            
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_SetupInvalidSalesLeadMonths.lstCVarCRM_SetupInvalidSalesLeadMonths) };
        }

    }
}
