using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Linq;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class TruckingTrackingReportController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] GetTruckingTrackingReportFilter()
        {
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			var operations = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code from Operations Where BLType<>2 Order By Code", typeof(SelectListOption)).Cast<SelectListOption>();

			var customers = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code, Name from Customers Order By Name", typeof(SelectListOption)).Cast<SelectListOption>();

			var truckers = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from Truckers Order By Name", typeof(SelectListOption)).Cast<SelectListOption>();
		
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(operations)//data[0]
                , new JavaScriptSerializer().Serialize(customers)//data[1]
                , new JavaScriptSerializer().Serialize(truckers)//data[2]
            };
        }

    }
}
