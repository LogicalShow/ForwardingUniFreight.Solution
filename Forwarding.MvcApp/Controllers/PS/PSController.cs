using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.MasterData
{
    //[Authorize]
    public class PSController : BaseController
    {
  
        #region BasicData
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_Invoices(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Transactions/_PS_Invoices.cshtml");
        }
        public PartialViewResult ViewPS_PurchasingRequest(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Transactions/_PS_PurchasingRequest.cshtml");
        }
        public PartialViewResult ViewPS_Quotations(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Transactions/_PS_Quotations.cshtml");
        }
        public PartialViewResult ViewPS_PurchasingOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Transactions/_PS_PurchasingOrders.cshtml");
        }

        public PartialViewResult ViewPS_SupplyOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Transactions/_PS_SupplyOrders.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPS_ClientDbtCrdtNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Transactions/_PS_ClientDbtCrdtNotes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPS_PurchasingOrdersNew(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Transactions/_PS_PurchasingOrdersNew.cshtml");
        }


        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_ApproveInvoice(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_PS_ApproveInvoice.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_ApprovePurchasingRequest(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_PS_ApprovePurchasingRequest.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_UnApprovePurchasingRequest(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_PS_UnApprovePurchasingRequest.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_UnApproveQuotation(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_PS_UnApproveQuotation.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_UnApprovePurchasingOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_PS_UnApprovePurchasingOrders.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_ApproveQuotation(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_PS_ApproveQuotation.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_ApprovePurchasingOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_PS_ApprovePurchasingOrders.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_ApproveSupplyOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_PS_ApproveSupplyOrders.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_UnApproveInvoice(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_PS_UnApproveInvoice.cshtml");
        }
        [HttpGet]

        public PartialViewResult ViewApprovePS_ClientDbtCrdtNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_ApprovePS_ClientDbtCrdtNotes.cshtml");
        }
        [HttpGet]

        public PartialViewResult ViewUnApprovePS_ClientDbtCrdtNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Approving/_UnApprovePS_ClientDbtCrdtNotes.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_ServicesReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Reports/_PS_ServicesReports.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_ItemsReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Reports/_PS_ItemsReports.cshtml");
        }


        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPS_PurchasingReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Reports/_PS_PurchasingReports.cshtml");
        }


        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult View_PS_SupplierAccountStatementReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Reports/_PS_SupplierAccountStatementReport.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult View_PS_PurchasingOrdersNewFollowUP(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PS/PS_Reports/_PS_PurchasingOrdersNewFollowUP.cshtml");
        }
        #endregion BasicData



    }
}
