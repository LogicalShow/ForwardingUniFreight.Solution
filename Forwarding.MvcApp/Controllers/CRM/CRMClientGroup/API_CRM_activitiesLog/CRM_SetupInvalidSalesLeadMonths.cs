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
    public class CRM_SetupInvalidSalesLeadMonthsController : ApiController
    {
        //[Route("/api/CRM_Actions/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCRM_ServicesLog objCvwCRM_ServicesLog = new CvwCRM_ServicesLog();
            objCvwCRM_ServicesLog.GetList(" Where 1=1");
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_ServicesLog.lstCVarvwCRM_ServicesLog) };
        }

        // [Route("/api/CRM_Actions/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCRM_SetupInvalidSalesLeadMonths objCCRM_SetupInvalidSalesLeadMonths = new CCRM_SetupInvalidSalesLeadMonths();
            Int32 _RowCount = 0;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where creatorUserName LIKE '%" + pSearchKey + "%' ";

            CCRM_privilege objCCRM_privilege = new CCRM_privilege();
            objCCRM_privilege.GetList(" Where ID = 60 ");
            var UsersIDs = objCCRM_privilege.lstCVarCRM_privilege[0].UsersIDs.Split(',');
            Boolean IsManager = false;
            if (UsersIDs.Contains(WebSecurity.CurrentUserId.ToString()))
            {
                IsManager = true;
            }
            if(IsManager == false)
            {
                whereClause = " AND CreatorUserID = "+ WebSecurity.CurrentUserId.ToString();
            }
                objCCRM_SetupInvalidSalesLeadMonths.GetListPaging(pPageSize, pPageNumber, whereClause, " creationDate desc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_SetupInvalidSalesLeadMonths.lstCVarCRM_SetupInvalidSalesLeadMonths), _RowCount };
        }

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
            //    CCRM_ServicesLog objCCRM_ServicesLog = new CCRM_ServicesLog();
            //    CVarCRM_ServicesLog objCVarCRM_ServicesLog = new CVarCRM_ServicesLog();
            //    objCVarCRM_ServicesLog.ID = 0;
            //    objCVarCRM_ServicesLog.PipeLineStageID = pPipeLineStageID;
            //    objCVarCRM_ServicesLog.CreationDate = DateTime.Now;
            //    objCVarCRM_ServicesLog.CreatorUserID = WebSecurity.CurrentUserId;
            //    objCVarCRM_ServicesLog.ModificationDate = DateTime.Now;
            //    objCVarCRM_ServicesLog.ModificationUserID = WebSecurity.CurrentUserId;

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
    }
}
