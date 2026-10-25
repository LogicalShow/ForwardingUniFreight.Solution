using System;
using System.Collections.Generic;
using System.Globalization;
//using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers
{
    public class BaseController : Controller
    {
        public void SetLanguage(string pCutlureID) 
        {
            //if (Session["CutlureID"].ToString().ToLower().Equals("fr"))
            //if ("fr".ToString().ToLower().Equals("fr"))
            if (pCutlureID.ToLower().Equals("fr"))
            {
                ViewBag.CutlureID = Session["culture"] = "fr";

                Thread.CurrentThread.CurrentCulture = new CultureInfo("fr");
                Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            }
            else if (pCutlureID.ToLower().Equals("ar"))
            {
                ViewBag.CutlureID = Session["culture"] = "ar";

                Thread.CurrentThread.CurrentCulture = new CultureInfo("ar");
                Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            }
            else if (pCutlureID.ToLower().Equals("zh-cn"))
            {
                ViewBag.CutlureID = Session["culture"] = "zh-CN";

                Thread.CurrentThread.CurrentCulture = new CultureInfo("zh-CN");
                Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            }
            else
            {
                ViewBag.CutlureID = Session["culture"] = "en";

                Thread.CurrentThread.CurrentCulture = new CultureInfo("en");
                Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            }
        }
    }
}