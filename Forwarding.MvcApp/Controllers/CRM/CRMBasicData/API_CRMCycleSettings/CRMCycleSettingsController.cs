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
    public class CRMCycleSettingsController : ApiController
    {
        //[Route("/api/CRM_Actions/LoadAll")]
        [HttpGet, HttpPost]

        public Object[] LoadAll(string pWhereClause)
        {
            CCRMCycleSettings objCCRMCycleSettingse = new CCRMCycleSettings();
            objCCRMCycleSettingse.GetList(" Where 1=1");
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRMCycleSettingse.lstCVarCRMCycleSettings) };
        }

        [HttpGet, HttpPost]
        public bool Update(int pID, int pActionID, int pStatusID)
        {
            CVarCRMCycleSettings objCVarCRMCycleSettings = new CVarCRMCycleSettings();
            CCRMCycleSettings objCCRMCycleSettings = new CCRMCycleSettings();
            objCCRMCycleSettings.UpdateList($" ActionID = {pActionID},StatusID = {pStatusID} WHERE ID = {pID}");
            return false;
        }
    }
}
