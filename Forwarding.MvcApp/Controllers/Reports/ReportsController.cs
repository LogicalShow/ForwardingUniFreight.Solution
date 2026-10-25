using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.Reports
{
    public class ReportsController : BaseController
    {
        #region Statistics
        [HttpGet]
        public PartialViewResult ViewStatisticsQuotationsStatistics(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_QuotationsStatistics.cshtml");
        }  
        [HttpGet]
        public PartialViewResult ViewMESReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_MESReports.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsOperationsStatistics(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_OperationsStatistics.cshtml");
        }
		[HttpGet]
        public PartialViewResult ViewStatisticsDailyShipments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_DailyShipments.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsTEUsStatistics(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_TEUsStatistics.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsProfitStatistics(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_ProfitStatistics.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsCustomersReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_CustomersReport.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsCustomsClearanceReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_CustomsClearanceReport.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsProfitabilityReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_ProfitabilityReport.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsContainerTrackingReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_ContainerTrackingReport.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsTrailerProfitability(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_TrailerProfitability.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsFlexiTankStatus(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_FlexiTankStatus.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStatisticsBusinessVolume(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_BusinessVolume.cshtml");
        }
        public PartialViewResult ViewChargesWithoutInvoicesReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_ChargesWithoutInvoicesReport.cshtml");
        }
        public PartialViewResult ViewTruckingReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_TruckingReport.cshtml");
        }
		public PartialViewResult ViewFileRoutingReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_FileRoutingReport.cshtml");
        }
		public PartialViewResult ViewClientsWithoutOperationsReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_ClientsWithoutOperationsReport.cshtml");
        }
        public PartialViewResult ViewTruckingTrackingReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_TruckingTrackingReport.cshtml");
        }
        public PartialViewResult ViewMEDWarehouseReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_MEDWarehouseReport.cshtml");
        }
        public PartialViewResult ViewTankFollowReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_TankFollowReport.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewVendorsReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_VendorsReport.cshtml");
        }
        #endregion Statistics

        #region AccountingReports
        [HttpGet]
        public PartialViewResult ViewPartnersStatements(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_PartnersStatements.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewAccountStatement(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_AccountStatement.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCustodyStatement(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_CustodyStatement.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewAllocationStatement(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_AllocationStatement.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewBanksStatements(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_BanksStatements.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTreasuriesStatements(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_TreasuriesStatements.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewInvoicesReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_InvoicesReports.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPayablesReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_PayablesReports.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewAccNotesReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_AccNotesReports.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewChequesReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_ChequesReports.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewAgingReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/AccountingReports/_AgingReports.cshtml");
        }
		[HttpGet]
		public PartialViewResult ViewServiceInvoiceReport(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Reports/AccountingReports/_ServiceInvoiceReport.cshtml");
		}
        #endregion AccountingReports
        
        [HttpGet]
        public PartialViewResult ViewDashboardGroup(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/DashboardGroup/_DashboardGroup.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewManifestStatistics(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Reports/Statistics/_ManifestStatistics.cshtml");
        }
    }
}
