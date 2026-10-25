using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.Quotations
{
    public class QuotationsController : BaseController
    {
        #region Quotations
        [HttpGet]
        public PartialViewResult ViewQuotations(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_QuotationsQuotations");
        }

        [HttpGet]
        public PartialViewResult ViewModalQuotations(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalQuotations");
        }

        [HttpGet]
        public PartialViewResult ViewQuotationsEdit(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_QuotationsEdit");
        }
        
        [HttpGet]
        public PartialViewResult ViewQuotationsDashboard(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Quotations/Dashboard/_QuotationsDashboard.cshtml");
            
        }
        #endregion Quotations
    }
}
