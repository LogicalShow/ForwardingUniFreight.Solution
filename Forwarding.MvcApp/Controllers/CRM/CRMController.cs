using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.MasterData
{
    //[Authorize]
    public class CRMController : BaseController
    {
  
        #region BasicData
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCRM_Actions(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMBasicData/_CRM_Actions.cshtml");
        }



        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCRM_Sources(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMBasicData/_CRM_Sources.cshtml");
        }
        
            [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCRMIndustryType(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMBasicData/_CRMIndustryType.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCRMComplaintName(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMBasicData/_CRMComplaintName.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCRM_SetubSalesLead(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMBasicData/_CRM_SetubSalesLead.cshtml");
        }
        #endregion BasicData

        #region CRMClient

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCRM_Clients(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMClientGroup/_CRM_Clients.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCRM_SalesLeadCustomers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMBasicData/_SalesLeadCustomers.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCRM_SalesDeals(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMClientGroup/_CRM_SalesDeals.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCRM_SalesOppurtunities(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMClientGroup/_CRM_SalesOppurtunities.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCRMCustomersFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMClientGroup/_CRMCustomersFollowUp.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewCRM_Complaint(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMClientGroup/_CRM_Complaint.cshtml");
        }
        
        [HttpGet]
        public PartialViewResult ViewCRMprivilege(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMClientGroup/_CRMprivilege.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCRMCycleSettings(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMBasicData/_CRMCycleSettings.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCRM_PipeLineStage(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMClientGroup/_CRM_PipeLineStage.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCRM_activitiesLog(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMClientGroup/_CRM_activitiesLog.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCRM_SetupInvalidSalesLeadMonths(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMClientGroup/_CRM_SetupInvalidSalesLeadMonths.cshtml");
        }

        #endregion CRMClient


        #region CRMSalesMen

        [HttpGet]
        public PartialViewResult ViewCRM_SalesMenTarget(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMSalesMen/_CRM_SalesMenTarget.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCommissionTarget(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMSalesMen/_CommissionTarget.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSalesmenCommissions(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMSalesMen/_SalesmenCommissions.cshtml");
        }
        #endregion CRMSalesMen


        #region Reports
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewvwCRM_ClientsFollowReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMReports/_vwCRM_ClientsFollowReport.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCRMSalesReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMReports/_CRMSalesReport.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCRMStatistics(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMReports/_CRMStatistics.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewClientFollowUpDashboard(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/CRM/CRMReports/_vwCRM_ClientFollowUpDashboard.cshtml");
        }
        #endregion Reports


    }
}
