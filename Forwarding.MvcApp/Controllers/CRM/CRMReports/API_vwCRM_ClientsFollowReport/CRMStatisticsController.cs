using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
//using Forwarding.MvcApp.Models.CRM.Addresses.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using System.Data;
using Forwarding.MvcApp.Helpers;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Customized;
using Forwarding.MvcApp.Models.CRM.CRM_FollowUp.Generated;
using System.IO;

namespace Forwarding.MvcApp.Controllers.CRM.API_vwCRM_ClientsFollowReport
{
    public class CRMStatisticsController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] FillFilter()
        {
            CUsers objUsers = new CUsers();
            CCRM_Sources objCRM_Sources = new CCRM_Sources();
            objCRM_Sources.GetList("where 1 = 1");
            objUsers.GetList("where IsNull(CustomerID , 0) = 0 AND IsSalesman = 1");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[]
            {
                serializer.Serialize(objCRM_Sources.lstCVarCRM_Sources) ,
                serializer.Serialize(objUsers.lstCVarUsers)
            };
        }

        



    }
}
