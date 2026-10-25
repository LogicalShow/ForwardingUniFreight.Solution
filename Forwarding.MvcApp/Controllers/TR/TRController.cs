using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.TR
{
    //[Authorize]
    public class TRController : BaseController
    {


        [HttpGet]
        public PartialViewResult ViewTR_TruckingOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/TR/Transactions/_TruckingOrders.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTR_TruckingOrdersOwnFleet(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/TR/Transactions/_TruckingOrdersOwnFleet.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewTR_TruckingOrderReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/TR/Reports/_TruckingOrderReport.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTR_TruckingOrderReportForSupplier(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/TR/Reports/_TruckingOrderReportForSupplier.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewTR_TripIncentiveReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/TR/Reports/_TripIncentiveReport.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewFleetQuotation(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/TR/FleetQuotation/_FleetQuotation.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewFleetTransportOrder(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/TR/Transactions/_FleetTransportOrder.cshtml");
        }


    }

}
