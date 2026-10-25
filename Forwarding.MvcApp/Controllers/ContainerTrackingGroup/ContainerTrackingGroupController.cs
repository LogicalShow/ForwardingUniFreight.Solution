using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.ContainerTrackingGroup
{
    public class ContainerTrackingGroupController : BaseController
    {
        #region ContainerTracking
        [HttpGet]
        public PartialViewResult ViewContainerTracking(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/ContainerTrackingTab/_ContainerTracking.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewSetOperationStage(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/ContainerTrackingTab/_SetOperationStage.cshtml");
        }


        [HttpGet]
        public PartialViewResult ViewCRM_BackIntergration(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/ContainerTrackingTab/_CRM_BackIntergration.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewVehicleTracking(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/ContainerTrackingTab/_VehicleTracking.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewDepotReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/ContainerTrackingTab/_DepotReports.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTruckingOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/ContainerTrackingTab/_TruckingOrders.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewHousesOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/ContainerTrackingTab/_HousesOrders.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewOperationsACIDDetails(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/ContainerTrackingTab/_OperationsACIDDetails.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewHoldBills(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/ContainerTrackingTab/_HoldBills.cshtml");
        }
        #endregion ContainerTracking
        #region XML
        [HttpGet]
        public PartialViewResult ViewXMLFileBL(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/XMLTab/_XMLFileBL.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewXMLIABOriginalStandardInvoice(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/XMLTab/_XMLIABOriginalStandardInvoice.cshtml");
        }
        #endregion ContainerTracking
        #region Reports
        [HttpGet]
        public PartialViewResult ViewHoldTransactionLog(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/Reports/_HoldTransactionLog.cshtml");
        }
        public PartialViewResult ViewConsolidationHandlingCoLoadReports(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ContainerTrackingGroup/Reports/_ConsolidationHandlingCoLoadReports.cshtml");
        }
        #endregion
    }
}
