using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.Warehousing
{
    public class WarehousingController : BaseController
    {
        #region MasterData
        [HttpGet]
        public PartialViewResult ViewWH_ItemKitting(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_WH_ItemKitting.cshtml");
        }
		[HttpGet]
        public PartialViewResult ViewWarehouse(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_Warehouse.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewArea(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_Area.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewRow(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_Row.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewMainWarehouse(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_MainWarehouse.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewWarehouseNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_WarehouseNotes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewWarehousingChargeTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_WarehousingChargeTypes.cshtml");
        }
        public PartialViewResult ViewPalletClassification(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_PalletClassification.cshtml");
        }
        public PartialViewResult ViewPalletStatus(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_PalletStatus.cshtml");
        }
        public PartialViewResult ViewBatchStatus(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/MasterData/_BatchStatus.cshtml");
        }
        #endregion MasterData

        #region Transactions
        [HttpGet]
        public PartialViewResult ViewContract(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_Contract.cshtml");
        }
		[HttpGet]
        public PartialViewResult ViewWH_Contract(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_WH_Contract.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewReceive(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_Receive.cshtml");
        }
		[HttpGet]
        public PartialViewResult ViewWH_Inbound(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_WH_Inbound.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTransferProducts(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_TransferProducts.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPDI(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_PDI.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewAgingAdjustment(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_AgingAdjustment.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPickup(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_Pickup.cshtml");
        }
		[HttpGet]
		public PartialViewResult ViewWH_Outbound(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Warehousing/Transactions/_WH_Outbound.cshtml");
		}
		[HttpGet]
        public PartialViewResult ViewReserve(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_Reserve.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewProductReallocation(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_ProductReallocation.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewVehicleService(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_VehicleService.cshtml");
        }

        public PartialViewResult ViewWHInvoice(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Transactions/_WHInvoice.cshtml");
        }
		public PartialViewResult ViewWH_Invoice(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Warehousing/Transactions/_WH_Invoice.cshtml");
		}
		[HttpGet]
		public PartialViewResult ViewWH_Services(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Warehousing/Transactions/_WH_Services.cshtml");
		}
		[HttpGet]
		public PartialViewResult ViewWH_TransServices(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Warehousing/Transactions/_WH_TransServices.cshtml");
		}
		[HttpGet]
		public PartialViewResult ViewWH_QualityActions(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Warehousing/Transactions/_WH_QualityActions.cshtml");
		}
		[HttpGet]
		public PartialViewResult ViewWH_Putaway(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Warehousing/Transactions/_WH_Putaway.cshtml");
		}
		[HttpGet]
		public PartialViewResult ViewWH_LocationMove(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Warehousing/Transactions/_WH_LocationMove.cshtml");
		}
		[HttpGet]
		public PartialViewResult ViewWH_Adjustment(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Warehousing/Transactions/_WH_Adjustment.cshtml");
		}
		[HttpGet]
		public PartialViewResult ViewWH_Transfer(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/Warehousing/Transactions/_WH_Transfer.cshtml");
		}
		#endregion Transactions

		#region Finalize
		[HttpGet]
        public PartialViewResult ViewReceiveFinalize(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Finalize/_ReceiveFinalize.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewReceiveUnfinalize(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Finalize/_ReceiveUnfinalize.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPickupFinalize(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Finalize/_PickupFinalize.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPickupUnfinalize(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Finalize/_PickupUnfinalize.cshtml");
        }
        #endregion

        #region Reports
        [HttpGet]
        public PartialViewResult ViewInventory(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Reports/_Inventory.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewProductLog(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Reports/_ProductLog.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewStockLedger(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Reports/_StockLedger.cshtml");
        }
        [HttpGet]
        public PartialViewResult View3PLStatistics(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Reports/_3PLStatistics.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewVehicleReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Reports/_VehicleReport.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewAreaLocationsChart(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/Warehousing/Reports/_AreaLocationsChart.cshtml");
        }
        
        #endregion Reports

    }
}
