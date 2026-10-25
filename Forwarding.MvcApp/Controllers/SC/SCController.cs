using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.MasterData
{
    //[Authorize]
    public class SCController : BaseController
    {
  
        #region BasicData
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewStoresAccounts(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_MasterData/_StoresAccounts.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewI_ItemsGroups(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_MasterData/_I_ItemsGroups.cshtml");
        }
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewItemsInquiry(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_MasterData/_ItemsInquiry.cshtml");
        }
        #endregion BasicData


        #region Transactions
        public PartialViewResult ViewGoodReceiptNotes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_GoodReceiptNotes.cshtml");
        }
        public PartialViewResult ViewMaterialIssueVouchers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_MaterialIssueVouchers.cshtml");
        }
        public PartialViewResult ViewSC_OpeningBalance(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_OpeningBalance.cshtml");
        }
        public PartialViewResult ViewSC_Scrapping(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_Scrapping.cshtml");
        }
        
        public PartialViewResult ViewSC_ClientReturnsVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_ClientReturnsVoucher.cshtml");
        }
        public PartialViewResult ViewSC_DepartmentReturnsVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_DepartmentReturnsVoucher.cshtml");
        }
        public PartialViewResult ViewSC_WorkOrderReturnsVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_WorkOrderReturnsVoucher.cshtml");
        }
        public PartialViewResult ViewSC_SupplierReturnsVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_SupplierReturnsVoucher.cshtml");
        }
        public PartialViewResult ViewSC_ExminationOrders(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_ExminationOrders.cshtml");
        }
        public PartialViewResult ViewSC_MaterialIssueRequest(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_MaterialIssueRequest.cshtml");
        }

        public PartialViewResult ViewSC_StoresTransferVoucher(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_StoresTransferVoucher.cshtml");
        }


        public PartialViewResult ViewSC_Inventory(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_Inventory.cshtml");
        }
        public PartialViewResult ViewSC_Settlement(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_Settlement.cshtml");
        }
        public PartialViewResult ViewSC_OpenCloseMaterialIssueRequest(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Transactions/_SC_OpenCloseMaterialIssueRequest.cshtml");
        }
        #endregion Transactions

        #region Reports
        

 public PartialViewResult ViewSC_ItemsCardQty(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_ItemCardQty.cshtml");
        }



        public PartialViewResult ViewSC_ItemCard(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_ItemCard.cshtml");
        }

        public PartialViewResult ViewSC_RawReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_RawReport.cshtml");
        }

    

        public PartialViewResult ViewMaterialIssueVouchersFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_MaterialIssueVouchersFollowUp.cshtml");
        }


        
        //**********


        public PartialViewResult ViewSC_GoodsReceiptNotesFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_GoodsReceiptNotesFollowUp.cshtml");
        }


        public PartialViewResult ViewSC_GoodsIssueVouchersFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_GoodsIssueVouchersFollowUp.cshtml");
        }


        public PartialViewResult ViewSC_StockOpeningBalanceFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_StockOpeningBalanceFollowUp.cshtml");
        }
        public PartialViewResult ViewSC_CLientReturnsVoucherFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_CLientReturnsVoucherFollowUp.cshtml");
        }
        public PartialViewResult ViewSC_SupplierReturnsVoucherFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_SupplierReturnsVoucherFollowUp.cshtml");
        }
        public PartialViewResult ViewSC_ExminationOrdersFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_ExminationOrdersFollowUp.cshtml");
        }
        public PartialViewResult ViewSC_MaterialIssueRequestFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_MaterialIssueRequestFollowUp.cshtml");
        }
        public PartialViewResult ViewSC_StoresTransferVoucherFollowUp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_StoresTransferVoucherFollowUp.cshtml");
        }
        //***************************

        public PartialViewResult ViewSC_StockBalance(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_StockBalance.cshtml");
        }
        public PartialViewResult ViewSC_OutgoingItemsReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Reports/_SC_OutgoingItemsReport.cshtml");
        }
        #endregion Reports



        #region Approving
        public PartialViewResult ViewSC_ApproveTransaction(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Approving/_SC_ApproveTransaction.cshtml");
        }
        public PartialViewResult ViewSC_UnApproveTransaction(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Approving/_SC_UnApproveTransaction.cshtml");
        }
        public PartialViewResult ViewSC_TankatApprove(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/SC/SC_Approving/_SC_TankatApprove.cshtml");
        }
        #endregion Approving
    }
}
