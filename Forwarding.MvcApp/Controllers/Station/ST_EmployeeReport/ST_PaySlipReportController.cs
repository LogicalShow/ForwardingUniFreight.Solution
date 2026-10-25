using Forwarding.MvcApp.Models.Station.ST_Transactions.Generated;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Station.ST_EmployeeReport
{
	public class ST_PaySlipReportController : ApiController
    {
		[HttpGet, HttpPost]
		public object[] FillSearchControls()
		{
			CST_employment objCST_employment = new CST_employment();
			objCST_employment.GetList("where 1=1 and isnull(IsInactive,0)=0");

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				new JavaScriptSerializer().Serialize(objCST_employment.lstCVarST_employment)
			};
		}
	}
}
