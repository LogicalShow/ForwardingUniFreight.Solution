using Forwarding.MvcApp.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP_Web.MvcApp.Controllers.ReceiptsAndPayments
{
    public class ReceiptsAndPaymentsController : BaseController
    {
        #region Transactions
        [HttpGet]
        public PartialViewResult ViewCashVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Transactions/_CashVoucher.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewChequeVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Transactions/_ChequeVoucher.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCombinedIssueVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Transactions/_CombinedIssueVoucher.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewOperationsPayablesAndReceivables(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Transactions/_OperationsPayablesAndReceivables.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewDebitAndCreditClose(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Transactions/_DebitAndCreditClose.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewDownPaymentRequest(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Transactions/_DownPaymentRequest.cshtml");
        }

        #endregion Transactions


        #region ApprovingAndPosting
        [HttpGet]
        public PartialViewResult ViewPost_Unpost_Voucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ApprovingAndPosting/_Post_Unpost_Voucher.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPostingReceivablePayableNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ApprovingAndPosting/_PostingReceivablePayableNotes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPostingUnderCollectNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ApprovingAndPosting/_PostingUnderCollectNotes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPost_Unpost_VoucherTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_Post_Unpost_VoucherTax.cshtml");
        }
        #endregion ApprovingAndPosting

        #region Reports
        [HttpGet]
        public PartialViewResult ViewBanksJournal(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Reports/_BanksJournal.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSafesJournal(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Reports/_SafesJournal.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewChequesReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Reports/_ChequesReports.cshtml");
        }
        public PartialViewResult ViewCashPosition(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Reports/_CashPosition.cshtml");
        }
        #endregion Reports


        #region ShipLink
        [HttpGet]
        public PartialViewResult ViewShipLinkClients(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLink/_ShipLinkClients.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewShipLinkCurrencyClientLinking(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLink/_ShipLinkCurrencyClientLinking.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewShipLinkRevenueItems(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLink/_ShipLinkRevenueItems.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkInvoicePosting(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLink/_ShipLinkInvoicePosting.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkInvoicePostingEISC(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEISC/_ShipLinkInvoicePostingEISC.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkEISCRevenueItems(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEISC/_ShipLinkEISCRevenueItems.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkInvoiceUnposting(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLink/_ShipLinkInvoiceUnposting.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewShipLinkInvoiceTypeToJournal(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLink/_ShipLinkInvoiceTypeToJournal.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkInvoiceTypeToJournalPayment(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLink/_ShipLinkInvoiceTypeToJournal_Payment.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkCreditNotePosting(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLink/_ShipLinkCreditNotePosting.cshtml");
        }
        #endregion ShipLink
        #region YardLink
        [HttpGet]
        public PartialViewResult ViewYardLinkClients(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/YardLink/_YardLinkClients.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewYardInvoicePosting(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/YardLink/_YardInvoicePosting.cshtml");
        }
        #endregion YardLink
        #region ShipLinkMelk
        [HttpGet]
        public PartialViewResult ViewSL_Clients(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkMelk/_SL_Clients.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSafesJournalPayment(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkMelk/_SafesJournalPayment.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewShipLinkClientsMelk(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkMelk/_ShipLinkClientsMelk.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkMelkCurrencyClientLinking(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkMelk/_ShipLinkMelkCurrencyClientLinking.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkMelkRevenueItems(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkMelk/_ShipLinkMelkRevenueItems.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkMelkPayments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkMelk/_A_Payments.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewUserShippingLink(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkMelk/_UserShippingLink.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewUserShiplinkScenery(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShiplinkScenery/_UserShiplinkScenery.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSceneryPayments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShiplinkScenery/_A_SceneryPayments.cshtml");
        }
        #endregion
        #region ShipLinkStarShine
        [HttpGet]
        public PartialViewResult ViewSL_ClientsStarShine(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkStarShine/_SL_Clients.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkClientsStarShine(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkStarShine/_ShipLinkClientsStarShine.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkStarShineCurrencyClientLinking(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkStarShine/_ShipLinkStarShineCurrencyClientLinking.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkStarShineRevenueItems(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkStarShine/_ShipLinkStarShineRevenueItems.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewA_PaymentsStarShine(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkStarShine/_A_PaymentsStarShine.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewUserShippingLinkStarShine(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkStarShine/_UserShippingLinkStarShine.cshtml");
        }
        
        #endregion

        #region ShipLinkEGL

        [HttpGet]
        public PartialViewResult ViewShipLinkClientsEGL(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEGL/_ShipLinkClientsEGL.cshtml");
        }
       
        [HttpGet]
        public PartialViewResult ViewShipLinkEGLRevenueItems(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEGL/_ShipLinkEGLRevenueItems.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewShipLinkEGLPayments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEGL/_A_PaymentsEGL.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewUserShippingLinkEGL(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEGL/_UserShippingLinkEGL.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPS_InvoicesTemp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEGL/_PS_InvoicesTemp.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewServicesTemp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEGL/_ServicesTemp.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPS_ApproveInvoiceTemp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEGL/_PS_ApproveInvoiceTemp.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPS_UnApproveInvoiceTemp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEGL/_PS_UnApproveInvoiceTemp.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPS_PaymentsTemp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/ShipLinkEGL/_PS_PaymentsTemp.cshtml");
        }
        #endregion

        #region Custodies
        [HttpGet]
        public PartialViewResult ViewPaymentRequest(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Custodies/_PaymentRequest.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPaymentRequestSupplier(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Custodies/_PaymentRequestSupplier.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewExchangeMovement(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Custodies/_ExchangeMovement.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCustudyBalance(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Custodies/_CustudyBalance.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewSettelmentSupplierDrivers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Custodies/_SettelmentSupplierDrivers.cshtml");
        }
        public PartialViewResult ViewPaymentRequestCollected(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Custodies/_PaymentRequestCollected.cshtml");
        }

        #endregion Custodies

        #region YardLinkTank
        [HttpGet]
        public PartialViewResult ViewYardLinkTankClients(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/YardLinkTank/_YardLinkTankClients.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewYardLinkTanknvoicePosting(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/YardLinkTank/_YardLinkTankInvoicePosting.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewYardLinkTankCreditPosting(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/YardLinkTank/_YardLinkTankCreditPosting.cshtml");
        }
        #endregion YardLink

        #region Integration
        [HttpGet]
        public PartialViewResult ViewPaymentRequestIntegration(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ReceiptsAndPayments/Integration/_PaymentRequestIntegration.cshtml");
        }
        #endregion
    }
}
