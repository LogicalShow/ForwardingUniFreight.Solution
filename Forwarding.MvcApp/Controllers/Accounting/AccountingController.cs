using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.Accounting
{
    public class AccountingController : BaseController
    {
        #region MasterData

        [HttpGet]
        public PartialViewResult ViewChartOfAccounts(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_ChartOfAccounts.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewChartOfLinkingAccounts(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_ChartOfLinkingAccounts.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCostCenters(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_CostCenters.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewJVTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_JVTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewJournalTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_JournalTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewOpnJVNo(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_OpnJVNo.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewDailyExchangeRate(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_DailyExchangeRate.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewJVDefaults(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_JVDefaults.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewA_Fiscal_Year(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_A_Fiscal_Year.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewBudgets(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_Budgets.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCashFlow(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_CashFlow.cshtml");
        }
        public PartialViewResult ViewInvestmentcostcenters(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_Investmentcostcenters.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSubAccountsPrivilege(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_SubAccountsPrivilege.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSuppliersOther(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/MasterData/_SuppliersOther.cshtml");
        }
        #endregion MasterData

        #region Transactions

        [HttpGet]
        public PartialViewResult ViewJournalVouchers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_JournalVouchers.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewJournalVouchersRepeated(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_JournalVouchersRepeated.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewPost_Restore_Unpost_JVs(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_Post_Restore_Unpost_JVs.cshtml");
        }
       

        [HttpGet]
        public PartialViewResult ViewOpenCloseFiscalYear(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_OpenCloseFiscalYear.cshtml");
        }
        
        [HttpGet]
        public PartialViewResult ViewA_ARAllocation(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_A_ARAllocation.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewUnapprovingAllocations(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_UnapprovingAllocations.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewUnapprovingPayableAllocations(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_UnapprovingPayableAllocations.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewForeignCurrencyRevaluation(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_ForeignCurrencyRevaluation.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewA_AccountLink(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_A_AccountLink.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSystemAccount(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_SystemAccount.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewBudgetsFiscal(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_BudgetsFiscal.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewAccountingAccNotesApprovalsReportTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_AccountingAccNotesApprovalsReportTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPostingVouchersReportTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_PostingVouchersReportTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewInvoicesApprovalReportsTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_InvoicesApprovalReportsTax.cshtml");
        }
        #endregion Transactions

        #region Reports

        [HttpGet]
        public PartialViewResult ViewAccountLedger(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_AccountLedger.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSubAccountLedger(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_SubAccountLedger.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTrialBalance(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_TrialBalance.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSubAccountTrialBalance(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_SubAccountTrialBalance.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewBalanceSheet(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_BalanceSheet.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewIncomeStatement(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_IncomeStatement.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewAccountLedgerByCurrency(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_AccountLedgerByCurrency.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSubAccountBalanceByCurrency(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_SubAccountBalanceByCurrency.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewRep_A_MonthlyAnalysis(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_Rep_A_MonthlyAnalysis.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewBudgetDetailsReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_BudgetDetailsReport.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCashFlowReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_CashFlow.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewDynamicpost(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_Dynamicpost.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewJobSummery(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_JobSummery.cshtml");
        }
        [HttpGet]
        public PartialViewResult Viewstatementofprincipal(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Reports/_statementofprincipal.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewA_ARAllocationWithVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_A_ARAllocationWithVoucher.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewA_ARAllocationWithVoucher_Mesco(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_A_ARAllocationWithVoucher_Mesco.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewA_APAllocationWithVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Accounting/Transactions/_A_APAllocationWithVoucher.cshtml");
        }
        //[HttpGet]
        //public PartialViewResult ViewRep_A_MonthlyAnalysis(string pCutlureID)
        //{
        //    SetLanguage(pCutlureID);
        //    return PartialView("~/Views/Accounting/Reports/_Rep_A_MonthlyAnalysis.cshtml");
        //}
        #endregion Reports
    }
}
