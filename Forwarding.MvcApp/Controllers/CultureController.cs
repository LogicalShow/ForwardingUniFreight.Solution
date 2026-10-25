using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers
{
    public class CultureController : Controller
    {
        //
        // GET: /Culture/

        public ActionResult Index()
        {
            return View();
        }

        //sherif culture
        
        public ActionResult SetEnglishCulture()
        {
            HttpContext.Session["culture"] = "en";
            Thread.CurrentThread.CurrentCulture = new CultureInfo("en");
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            return View("Home");
        }

        public ActionResult SetArabicCulture()
        {
            HttpContext.Session["culture"] = "ar";
            Thread.CurrentThread.CurrentCulture = new CultureInfo("ar");
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            return RedirectToAction("Login", "Index");
        }
        
        public ActionResult SetFrenchCulture()
        {
            HttpContext.Session["culture"] = "fr";
            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr");
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            return RedirectToAction("Home");
        }

        public ActionResult SetChineseCulture()
        {
            HttpContext.Session["culture"] = "zh-CN";
            Thread.CurrentThread.CurrentCulture = new CultureInfo("zh-CN");
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            return RedirectToAction("Home");
        }

    }
}
