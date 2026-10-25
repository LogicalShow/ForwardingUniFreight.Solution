using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ActionStatues.Generated;
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
    public class CRM_ActionsController : ApiController
    {
        //[Route("/api/CRM_Actions/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            int total = 0;
            CCRM_Actions objCCRM_Actions = new CCRM_Actions();
            objCCRM_Actions.GetList(pWhereClause);

            CCRM_ActionStatues objCCRM_ActionStatues = new CCRM_ActionStatues();
            objCCRM_ActionStatues.GetListPaging(999, 1, pWhereClause, "ID", out total);

            CNoAccessPipeLineStage objCNoAccessPipeLineStage = new CNoAccessPipeLineStage();
            objCNoAccessPipeLineStage.GetList(" Where IsActive = 1");

            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_Actions.lstCVarCRM_Actions)
            ,new JavaScriptSerializer().Serialize(objCNoAccessPipeLineStage.lstCVarNoAccessPipeLineStage),
            new JavaScriptSerializer().Serialize(objCCRM_ActionStatues.lstCVarCRM_ActionStatues)
            };
        }

        // [Route("/api/CRM_Actions/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCRM_Actions objCvwCRM_Actions = new CCRM_Actions();
            //objCvwCRM_Actions.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCRM_Actions.lstCVarCRM_Actions.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwCRM_Actions.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_Actions.lstCVarCRM_Actions), _RowCount };
        }

        // [Route("/api/CRM_Actions/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pCode, String pName, string pHasDetails, Int32 pAlarmDays, Int32 pAlarmHours,decimal pActionPercent, string pColor,Int32 pPipeLineStageID)
        {
            bool _result = false;

            CVarCRM_Actions objCVarCRM_Actions = new CVarCRM_Actions();

            objCVarCRM_Actions.Code = pCode.ToUpper();
            objCVarCRM_Actions.Name = pName.ToUpper();
            objCVarCRM_Actions.HasDetails = Convert.ToBoolean( pHasDetails);
            objCVarCRM_Actions.AlarmDays = pAlarmDays;
            objCVarCRM_Actions.AlarmHours = pAlarmHours;
            objCVarCRM_Actions.ActionPercent = pActionPercent;
            objCVarCRM_Actions.Color = pColor;
            objCVarCRM_Actions.PipeLineStageID = pPipeLineStageID;
            objCVarCRM_Actions.CreationDate  = DateTime.Now;
            objCVarCRM_Actions.CreatorUserID = WebSecurity.CurrentUserId ;
            objCVarCRM_Actions.ModificationDate = DateTime.Now;
            objCVarCRM_Actions.ModificationUserID = WebSecurity.CurrentUserId;

            CCRM_Actions objCCRM_Actions = new CCRM_Actions();
            objCCRM_Actions.lstCVarCRM_Actions.Add(objCVarCRM_Actions);
            Exception checkException = objCCRM_Actions.SaveMethod(objCCRM_Actions.lstCVarCRM_Actions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/CRM_Actions/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID,  String pCode, String pName, string pHasDetails, Int32 pAlarmDays, Int32 pAlarmHours, decimal pActionPercent,string pColor, Int32 pPipeLineStageID)
        {
            bool _result = false;

            CVarCRM_Actions objCVarCRM_Actions = new CVarCRM_Actions();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCRM_Actions objCGetCreationInformation = new CCRM_Actions();
            objCGetCreationInformation.GetItem(pID);
            objCVarCRM_Actions.CreatorUserID = objCGetCreationInformation.lstCVarCRM_Actions[0].CreatorUserID;
            objCVarCRM_Actions.CreationDate = objCGetCreationInformation.lstCVarCRM_Actions[0].CreationDate;
            objCVarCRM_Actions.ActionPercent = pActionPercent;
            objCVarCRM_Actions.Color = pColor;
            objCVarCRM_Actions.ID = pID;
            objCVarCRM_Actions.PipeLineStageID = pPipeLineStageID;
            // objCVarCRM_Actions.CountryID = pCountryID;
            objCVarCRM_Actions.Code = pCode.ToUpper();
            objCVarCRM_Actions.Name = pName.ToUpper();
            objCVarCRM_Actions.HasDetails = Convert.ToBoolean(pHasDetails);
            // objCVarCRM_Actions.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarCRM_Actions.AlarmDays = pAlarmDays;
            objCVarCRM_Actions.AlarmHours = pAlarmHours;

            objCVarCRM_Actions.ModificationUserID = WebSecurity.CurrentUserId;
            objCVarCRM_Actions.ModificationDate = DateTime.Now;

            CCRM_Actions objCCRM_Actions = new CCRM_Actions();
            objCCRM_Actions.lstCVarCRM_Actions.Add(objCVarCRM_Actions);
            Exception checkException = objCCRM_Actions.SaveMethod(objCCRM_Actions.lstCVarCRM_Actions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/CRM_Actions/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCRM_Actions objCCRM_Actions = new CCRM_Actions();
        //    objCCRM_Actions.lstDeletedCPKCRM_Actions.Add(new CPKCRM_Actions() { ID = pID });
        //    objCCRM_Actions.DeleteItem(objCCRM_Actions.lstDeletedCPKCRM_Actions);
        //}

        // [Route("api/CRM_Actions/Delete/{pCRM_ActionsIDs}")]
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
