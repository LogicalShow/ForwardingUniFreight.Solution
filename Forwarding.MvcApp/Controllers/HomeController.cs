using Forwarding.MvcApp.Models.Administration.Security;
using System.Collections.Generic;
using System.Globalization;
using System.Threading;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers
{
    //[HandleError]
    [Authorize]
    //public class HomeController : Controller
    public class HomeController : BaseController// Controller
    {
        
        public ActionResult Index()
        {
            ViewBag.CutlureID = Session["CutlureID"] = "en";///////arabic default///////////////////
            return View();
        }

        [HttpGet]
        public PartialViewResult ViewDashboard(string pCutlureID)
        {
            if (pCutlureID == null)
                pCutlureID = "en";///////arabic default///////////////////
            SetLanguage(pCutlureID);
            return PartialView("_Dashboard");
        }

        [HttpGet]
        public PartialViewResult ViewGroups()
        {
            if (Session["culture"] != null)
                SetLanguage(Session["culture"].ToString());
            else
                SetLanguage("en");///////arabic default///////////////////
            return PartialView("_Groups");
        }

        public ActionResult SetEnglishCulture()
        {
            ViewBag.CutlureID = Session["culture"] = "en";

            Thread.CurrentThread.CurrentCulture = new CultureInfo("en");
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;

            return View("Index");
        }

        public ActionResult SetFrenchCulture()
        {
            ViewBag.CutlureID = Session["culture"] = "fr";
            
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr");
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            
            return View("Index");
        }

        public ActionResult SetArabicCulture()
        {
            ViewBag.CutlureID = Session["culture"] = "ar";

            Thread.CurrentThread.CurrentCulture = new CultureInfo("ar");
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;

            return View("Index");
        }

        public ActionResult SetChineseCulture()
        {
            ViewBag.CutlureID = Session["culture"] = "zh-CN";

            Thread.CurrentThread.CurrentCulture = new CultureInfo("zh-CN");
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;

            return View("Index");
        }

    }
}
