using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.MasterData
{
    //[Authorize]
    public class SLController : BaseController
    {
  
        #region BasicData
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_Invoices(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Transactions/_SL_Invoices.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_ApproveInvoice(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Approving/_SL_ApproveInvoice.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_UnApproveInvoice(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Approving/_SL_UnApproveInvoice.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_ServicesReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Reports/_SL_ServicesReports.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_ItemsReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Reports/_SL_ItemsReports.cshtml");
        }


        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_SalesReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Reports/_SL_SalesReports.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewClientPaid(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Reports/_ClientPaid.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewI_PriceList(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_MasterData/_I_PriceList.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_SalesMan(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_MasterData/_SL_SalesMan.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_CustomerCategories(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_MasterData/_SL_CustomerCategories.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_Regions(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_MasterData/_SL_Regions.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewSL_LinkPriceListWithPaymentMethod(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_MasterData/_SL_LinkPriceListWithPaymentMethod.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewSL_ApproveSL_DbtCrdtNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Approving/_SL_ApproveDbtCrdtNotes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSL_UnApproveSL_DbtCrdtNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Approving/_SL_UnApproveDbtCrdtNotes.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewSL_Payments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Transactions/_SL_Payments.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewClientDbtCrdtNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Transactions/_ClientDbtCrdtNotes.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewSL_ClientAccountStatementReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SL/SL_Reports/_SL_ClientAccountStatementReport.cshtml");
        }

        #endregion BasicData



    }
}
