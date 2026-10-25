using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Linq;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class TankFollowReportController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] GetTankFollowReportFilter()
        {
            CAgents objCAgents = new CAgents();
            objCAgents.GetList(" WHERE 1=1 ORDER BY Name ");
            var pAgentList = objCAgents.lstCVarAgents.Select(s => new{s.ID,s.Name,s.Code}).ToList();

			CPorts objCPorts = new CPorts();
			objCPorts.GetList(" where IsPort = 1 and IsInactive = 0 ");

			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
				serializer.Serialize(objCAgents.lstCVarAgents),//data[0]
				serializer.Serialize(objCPorts.lstCVarPorts)//data[1]
            };
        }

    }
}
