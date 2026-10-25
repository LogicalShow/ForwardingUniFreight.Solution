using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_FollowUp.Generated;
using Forwarding.MvcApp.Models.CRM.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
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
    public class CRM_activitiesLogController : ApiController
    {
        //[Route("/api/CRM_Actions/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            string pWhereClauseSalesLead = "Where 1=1";
            int _RowCount = 0;

            CvwCRM_ServicesLog objCvwCRM_ServicesLog = new CvwCRM_ServicesLog();
            objCvwCRM_ServicesLog.GetList(" Where 1=1");

            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClauseSalesLead += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";
            objCvwUsers.GetList(" Where IsNull(CustomerID , 0) = 0 AND 1=1");

            CCRM_Clients objCCRM_Clients = new CCRM_Clients();

            objCCRM_Clients.GetListPaging(999999, 1, pWhereClauseSalesLead, "Name", out _RowCount);

            CNoAccessCustomerActivity objCNoAccessCustomerActivity = new CNoAccessCustomerActivity();
            objCNoAccessCustomerActivity.GetList("Where 1=1");

            Boolean CurrentUserIsManager = false;
            CCRM_privilege objCCRM_privilege = new CCRM_privilege();
            objCCRM_privilege.GetList(" Where ID = 70");
            if (objCCRM_privilege.lstCVarCRM_privilege.Count > 0)
            {
                string[] UsersPrivileges = objCCRM_privilege.lstCVarCRM_privilege[0].UsersIDs.Split(',');
                if (UsersPrivileges.Contains(WebSecurity.CurrentUserId.ToString()))
                    CurrentUserIsManager = true;
                else
                    CurrentUserIsManager = false;
            }
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_ServicesLog.lstCVarvwCRM_ServicesLog)
                ,new JavaScriptSerializer().Serialize(objCvwUsers.lstCVarvwUsers)
                ,new JavaScriptSerializer().Serialize(objCCRM_Clients.lstCVarCRM_Clients)
                ,new JavaScriptSerializer().Serialize(objCNoAccessCustomerActivity.lstCVarNoAccessCustomerActivity)
                ,CurrentUserIsManager
            };
        }

        // [Route("/api/CRM_Actions/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwCRM_ServicesLog objCvwCRM_ServicesLog = new CvwCRM_ServicesLog();
            //objCvwCRM_Actions.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCRM_Actions.lstCVarCRM_Actions.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where (ClientName LIKE '%" + pSearchKey + "%' "
                + " OR CreatorUserName LIKE '%" + pSearchKey + "%' "
                + " OR ActionName LIKE '%" + pSearchKey + "%' )";

            Boolean CurrentUserIsManager = false;
            CCRM_privilege objCCRM_privilege = new CCRM_privilege();
            objCCRM_privilege.GetList(" Where ID = 70");
            if (objCCRM_privilege.lstCVarCRM_privilege.Count > 0)
            {
                string[] UsersPrivileges = objCCRM_privilege.lstCVarCRM_privilege[0].UsersIDs.Split(',');
                if (UsersPrivileges.Contains(WebSecurity.CurrentUserId.ToString()))
                    CurrentUserIsManager = true;
                else
                    CurrentUserIsManager = false;
                if (CurrentUserIsManager == false)
                    whereClause += " AND (CreatorUserID = " + WebSecurity.CurrentUserId + ")";
            }
            objCvwCRM_ServicesLog.GetListPaging(pPageSize, pPageNumber, whereClause, " CreationDate desc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_ServicesLog.lstCVarvwCRM_ServicesLog), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] CRM_Activity_LoadData(int pSalesManID, String pActionType, String pClientName, int pActivityID, int pIsManager)
        {
            CvwCRM_ServicesLog objCvwCRM_ServicesLog = new CvwCRM_ServicesLog();
            Int32 _RowCount = 0;
            String pWhereClause = " Where 1=1 ";
            if (pSalesManID > 0)
                pWhereClause += " AND CreatorUserID = " + pSalesManID;
            if (pActionType != "All Actions")
                pWhereClause += " AND ActionName = '" + pActionType + "'";
            if (pClientName != "select Client")
                pWhereClause += " AND ClientName LIKE '%" + pClientName +"%'";
            if (pActivityID > 0)
                pWhereClause += " AND ServiceID = " + pActivityID;

            if (pIsManager == 0)
                pWhereClause += " AND (CreatorUserID = " + WebSecurity.CurrentUserId +")";

            objCvwCRM_ServicesLog.GetList(pWhereClause);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_ServicesLog.lstCVarvwCRM_ServicesLog), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] CRM_Activity_LoadWithPaging(int pPageNumber, int pPageSize, String pOrderBy, int pSalesManID, String pActionType, String pClientName, int pActivityID, int pIsManager)
        {
            CvwCRM_ServicesLog objCvwCRM_ServicesLog = new CvwCRM_ServicesLog();
            Int32 _RowCount = 0;
            String pWhereClause = " Where 1=1 ";
            if (pSalesManID > 0)
                pWhereClause += " AND CreatorUserID = " + pSalesManID;
            if (pActionType != "All Actions")
                pWhereClause += " AND ActionName = '" + pActionType + "'";
            if (pClientName != "select Client")
                pWhereClause += " AND ClientName LIKE '%" + pClientName + "%'";
            if (pActivityID > 0)
                pWhereClause += " AND ServiceID = " + pActivityID;

            if (pIsManager == 0)
                pWhereClause += " AND (CreatorUserID = " + WebSecurity.CurrentUserId + ")";

            //objCvwCRM_ServicesLog.GetList(pWhereClause);
            objCvwCRM_ServicesLog.GetListPaging(pPageSize, pPageNumber, pWhereClause,pOrderBy, out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_ServicesLog.lstCVarvwCRM_ServicesLog), _RowCount };
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
