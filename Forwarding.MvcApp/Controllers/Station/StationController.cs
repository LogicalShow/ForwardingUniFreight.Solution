using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.Station
{
    //[Authorize]
    public class StationController : BaseController
    {
  
        #region BasicData
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPreGateIn(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Station/ST_Transactions/_PreGateIn.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewGateIn(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Station/ST_Transactions/_GateIn.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewGateOut(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Station/ST_Transactions/_GateOut.cshtml");
        }
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPacking(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Station/ST_Transactions/_Packing.cshtml");
        }

        #endregion BasicData
        #region ST_Employment
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ST_Employees(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Station/ST_Employment/_ST_Employees.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewST_EmployeesTransaction(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Station/ST_Employment/_ST_EmployeesTransaction.cshtml");
        }
        #endregion ST_Employment

        #region ST_employmentReport
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewST_employmentReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Station/ST_EmployeeReport/_ST_employmentReport.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewST_LoadingReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Station/ST_EmployeeReport/_ST_LoadingReport.cshtml");
        }
		[HttpGet]
		public PartialViewResult ViewST_PaySlipReport(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Station/ST_EmployeeReport/_ST_PaySlipReport.cshtml");
		}
		#endregion ST_Employment


	}
}
