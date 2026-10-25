using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.ContainerYard
{
    public class ContainerYardController : BaseController
    {
        #region Tariffs

        [HttpGet]
        //public ActionResult ViewCustomers()
        public PartialViewResult ViewWH_MTY_Tariffs(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerYard/Tariff/_WH_MTY_Tariff.cshtml");
        }

        #endregion Tariffs 

        #region Transactions
        [HttpGet]
        public PartialViewResult ViewWH_CntrStocks(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerYard/Transactions/_WH_CntrStock.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewWH_MTY_GateIn(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerYard/Transactions/_WH_MTY_GateIn.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewWH_MTY_Inventory(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerYard/Transactions/_WH_MTY_Inventory.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewWH_MTY_GateOut(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerYard/Transactions/_WH_MTY_GateOut.cshtml");
        }
        #endregion Transactions

        #region Reports
        [HttpGet]
        //public ActionResult ViewContainerTracking()
        public PartialViewResult ViewWH_MTY_Reports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerYard/Reports/_WH_MTY_Reports.cshtml");
        }
        #endregion Reports
    }
}
