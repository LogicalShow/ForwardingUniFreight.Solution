using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace Forwarding.MvcApp.Controllers.Operations
{
    public class OperationsController : BaseController
    {
        #region Operations
        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewOperations(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_OperationsOperations");
        }

        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewOperationsEdit(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_OperationsEdit");
        }

        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewModalRoutings(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalRoutings");
        }

        [HttpGet]
        public PartialViewResult ViewModalRebuildConsolidation(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalRebuildConsolidation");
        }

        [HttpGet]
        public PartialViewResult ViewModalMapHouseToContainer(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalMapHouseToContainer");
        }

        [HttpGet]
        public PartialViewResult ViewModalPayables(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalPayables");
        }

        [HttpGet]
        public PartialViewResult ViewModalReceivables(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalReceivables");
        }

        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewModalInvoices(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalInvoices");
        }

        [HttpGet]
        public PartialViewResult ViewModalShipments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalShipments");
        }
        [HttpGet]
        public PartialViewResult ViewModalSelectContainersAndPackages(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalSelectContainersAndPackages");
        }
        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewModalSelectOperationsContainersAndPackages(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalSelectOperationsContainersAndPackages");
        }

        #endregion Operations
    }
}
