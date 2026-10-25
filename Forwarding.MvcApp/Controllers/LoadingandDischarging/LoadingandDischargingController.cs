using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.MasterData
{
    //[Authorize]
    public class LoadingandDischargingController : BaseController
    {

        #region BasicData
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewLoadingandDischargingData(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/LoadingandDischarging/LoadingandDischargingOperations/_LoadingandDischargingData.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewLD_Workers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/LoadingandDischarging/LoadingandDischargingOperations/_LD_Workers.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewLD_Storage(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/LoadingandDischarging/LoadingandDischargingOperations/_LD_Storage.cshtml");
        }

        #endregion BasicData



    }
}
