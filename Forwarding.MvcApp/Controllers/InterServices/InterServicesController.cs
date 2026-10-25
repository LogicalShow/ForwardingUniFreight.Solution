using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.InterServices
{
    public class InterServicesController : BaseController
    {

        [HttpGet]
        public PartialViewResult ViewInterServicesRequests(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/InterServices/Transactions/_InterServicesRequests.cshtml");
        }
        
    }
}
