using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.ContainerFreightStation
{
    public class ContainerFreightStationController : BaseController
    {
        #region Tariffs
        [HttpGet]
        //public ActionResult ViewCustomers()
        public PartialViewResult ViewWH_FCL_Tariffs(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Tariff/_WH_FCL_Tariffs.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCustomers()
        public PartialViewResult ViewWH_MTY_Tariffs(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Tariff/_WH_MTY_Tariff.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCustomers()
        public PartialViewResult ViewWH_CSL_Tariffs(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Tariff/_WH_CSL_Tariffs.cshtml");
        }
        #endregion Tariffs 

        #region Transactions
        [HttpGet]
        //public ActionResult ViewCustomers()
        public PartialViewResult ViewWH_CFS_GateIn(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Transactions/_WH_CFS_GateIn.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCustomers()
        public PartialViewResult ViewWH_CFS_GateInInventory(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Transactions/_WH_CFS_GateInInventory.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewWH_CFS_Invoices(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Transactions/_WH_CFS_Invoices.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewWH_CFS_ReleaseOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Transactions/_WH_CFS_ReleaseOrders.cshtml");
        }


        [HttpGet]
        public PartialViewResult ViewWH_CFS_ReleaseVouchers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Transactions/_WH_CFS_ReleaseVouchers.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewWH_CFS_Inspection(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Transactions/_WH_CFS_Inspection.cshtml");
        }

        #endregion Transactions

        #region Reports
        [HttpGet]
        //public ActionResult ViewCustomers()
        public PartialViewResult ViewWH_ManifestReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Reports/_WH_ManifestReport.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewWH_WarehouseStatistics(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerFreightStation/Reports/_WH_WarehouseStatistics.cshtml");
        }
        #endregion Reports
    }
}
