using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.LocalEmails
{
    public class LocalEmailsController : BaseController
    {
        [HttpGet]
        public PartialViewResult ViewLocalEmails(string pCutlureID)
        {
            if (pCutlureID == null)
                pCutlureID = "en";///////arabic default///////////////////
            SetLanguage(pCutlureID);
            return PartialView("~/Views/LocalEmails/_LocalEmails.cshtml");
        }

    }
}
