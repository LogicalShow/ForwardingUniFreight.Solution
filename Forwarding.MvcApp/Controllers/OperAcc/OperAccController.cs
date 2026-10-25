using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.OperAcc
{
    public class OperAccController : BaseController
    {
        #region Accounts ARPAllocations
        public PartialViewResult ViewARAllocation(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/AccountsReceivable/_ARAllocation.cshtml");
        }
        #endregion Accounts ARAllocations

        #region Accounts AR & AP Payments
        //[HttpGet]
        //public ActionResult Payment()
        public PartialViewResult ViewPayment(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/CommonARAndAP/_Payment.cshtml");
        }
        #endregion Accounts AR & AP Payments

        #region PaymentApproval
        //[HttpGet]
        //public ActionResult PaymentApproval()
        public PartialViewResult ViewPaymentApproval(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/Approval/_PaymentApproval.cshtml");
        }
        #endregion PaymentApproval

        #region OperationPayableApproval
        //[HttpGet]
        //public ActionResult OperationPayableApproval()
        public PartialViewResult ViewOperationPayableApproval(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/Approval/_OperationPayableApproval.cshtml");
        }
        public PartialViewResult ViewOperationPayableUnderProcessApproval(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/Approval/_OperationPayableUnderProcessApproval.cshtml");
        }
        #endregion OperationPayableApproval
        #region OperationPayableStatues
        //[HttpGet]
        //public ActionResult OperationPayableApproval()
        public PartialViewResult ViewOperationPayableStatues(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/Approval/_OperationPayableStatues.cshtml");
        }
        #endregion OperationPayableStatues
        #region InvoiceApproval
        //[HttpGet]
        //public ActionResult InvoiceApproval()
        public PartialViewResult ViewInvoiceApproval(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/Approval/_InvoiceApproval.cshtml");
        }
        #endregion InvoiceApproval

        #region InvoicesPrint
        public PartialViewResult ViewInvoicesPrint(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/Approval/_InvoicesPrint.cshtml");
        }
        #endregion InvoicesPrint

        #region TankPayablesAndReceivables
        //[HttpGet]
        //public ActionResult InvoiceApproval()
        public PartialViewResult ViewTankPayablesAndReceivables(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/Approval/_TankPayablesAndReceivables.cshtml");
        }
        #endregion TankPayablesAndReceivables

        #region PurchaseInvoiceApproval
        //[HttpGet]
        //public ActionResult PurchaseInvoiceApproval()
        public PartialViewResult ViewPurchaseInvoiceApproval(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/Approval/_PurchaseInvoiceApproval.cshtml");
        }
        #endregion PurchaseInvoiceApproval

        #region AccNoteApproval
        //[HttpGet]
        //public ActionResult AccNoteApproval()
        public PartialViewResult ViewAccNoteApproval(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/Approval/_AccNoteApproval.cshtml");
        }
        #endregion AccNoteApproval

        #region OpenBalance
        public PartialViewResult ViewPartnerOpenBalance(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/OpenBalance/_PartnerOpenBalance.cshtml");
        }
        public PartialViewResult ViewTreasuryOpenBalance(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/OpenBalance/_TreasuryOpenBalance.cshtml");
        }
        public PartialViewResult ViewBankOpenBalance(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/OperAcc/OpenBalance/_BankOpenBalance.cshtml");
        }
        #endregion OpenBalance

    }
}
