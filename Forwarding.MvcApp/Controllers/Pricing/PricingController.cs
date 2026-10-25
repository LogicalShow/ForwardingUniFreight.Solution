using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.Pricing
{
    public class PricingController : BaseController
    {
        [HttpGet]
        public PartialViewResult ViewPricing(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PricingModule/PricingTab/_Pricing.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPricingSettings(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PricingModule/PricingTab/_PricingSettings.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewBookings(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PricingModule/PricingTab/_Bookings.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipGoCustomers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ShipsGo/_ShipsGoCustomers.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTrackedShipments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ShipsGo/_TrackedShipments.cshtml");
        }
    }
}
