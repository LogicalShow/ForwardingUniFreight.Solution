using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.Administration
{
    public class AdministrationController : BaseController
    {
        #region Settings
        //[HttpGet]
        //public ActionResult ViewBranches()
        public PartialViewResult ViewBranches(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_Branches.cshtml");
        }
        public PartialViewResult ViewDefaults(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_Defaults.cshtml");
        }
        public PartialViewResult ViewNoAccessDepartments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_NoAccessDepartments.cshtml");
        }
        public PartialViewResult ViewSec_UserSafes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_Sec_UserSafes.cshtml");
        }
        public PartialViewResult ViewSec_UserBanks(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_Sec_UserBanks.cshtml");
        }
        public PartialViewResult ViewLicenseExpireDateAlarmsUsers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_LicenseExpireDateAlarmsUsers.cshtml");
        }
        public PartialViewResult ViewMergeDuplicate(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_MergeDuplicate.cshtml");
        }

        public PartialViewResult ViewFA_Departments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_FA_Departments.cshtml");
        }
        public PartialViewResult ViewFA_Devisons(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_FA_Devisons.cshtml");
        }
        public PartialViewResult ViewFA_UserBranches(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_FA_UserBranches.cshtml");
        }
        public PartialViewResult ViewSystemOptions(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_SystemOptions.cshtml");
        }
        public PartialViewResult ViewA_PaymentRequest_UsersLevel(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_A_PaymentRequest_UsersLevel.cshtml");
        }
        public PartialViewResult ViewLinkeUserWithAccounts(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Settings/_LinkeUserWithAccounts.cshtml");
        }
        #endregion Settings

        #region Security
        //[HttpGet]
        //public ActionResult ViewRoles()
        public PartialViewResult ViewRoles(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Security/_Roles.cshtml");
        }
        //public ActionResult ViewRolePrivileges()
        public PartialViewResult ViewRolePrivileges(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Security/_RolePrivileges.cshtml");
        }
        //public ActionResult ViewUsers()
        public PartialViewResult ViewUsers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Security/_Users.cshtml");
        }
        //public ActionResult ViewUserPrivileges()
        public PartialViewResult ViewUserPrivileges(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Security/_UserPrivileges.cshtml");
        }
        #endregion Security

        #region Miscellaneous
        //[HttpGet]
        //public ActionResult ViewDeletedInvoices()
        public PartialViewResult ViewDeletedInvoices(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Miscellaneous/_DeletedInvoices.cshtml");
        }
        public PartialViewResult ViewCreditlimitexceptionperiod(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Miscellaneous/_Creditlimitexceptionperiod.cshtml");
        }
        #endregion Miscellaneous

        #region Logs
        //[HttpGet]
        //public ActionResult ViewOperationChargeLog()
        public PartialViewResult ViewOperationChargeLog(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Logs/_OperationChargeLog.cshtml");
        }
        public PartialViewResult ViewHousesLogs(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Logs/_HousesLogs.cshtml");
        }
        public PartialViewResult ViewVoucherLog(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Logs/_VoucherLog.cshtml");
        }
        public PartialViewResult ViewDynamicsCRMLog(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/Logs/_DynamicsCRMLog.cshtml");
        }
        #endregion Logs
        public PartialViewResult ViewUserLink(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/DisbursementLink/_UserLink.cshtml");
        }
        #region Tax
        [HttpGet]
        public PartialViewResult ViewPost_Unpost_VoucherTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_PostingVouchersTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewInvoiceApprovalTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_InvoiceApprovalTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult View_AccNoteApprovalTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_AccountingAccNotesApprovalsTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPost_Restore_Unpost_JVsTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_Post_Restore_Unpost_JVsTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult View_AccountingOperationsPayablesApprovalsTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_AccountingOperationsPayablesApprovalsTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult View_SC_ApproveTransactionTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_SC_ApproveTransactionTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult View_SC_UnApproveTransactionTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_SC_UnApproveTransactionTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult View_PS_ApproveInvoiceTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_PS_ApproveInvoiceTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult View_PS_UnApproveInvoiceTax(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/admapp/_PS_UnApproveInvoiceTax.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewChooseReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Administration/FavoriteReports/_ChooseReports.cshtml");
        }
        #endregion

    }
}
