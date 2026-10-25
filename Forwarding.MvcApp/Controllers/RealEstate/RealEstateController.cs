using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.RealEstate
{
    public class RealEstateController : BaseController
    {
        //
        // GET: /RealEstate/

        public ActionResult Index()
        {
            return View();
        }

        #region MasterData
        [HttpGet]
        public PartialViewResult ViewRS_Projects(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/RealEstate/MasterData/_RS_Projects.cshtml");
        }

        #endregion


    }
}
