using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.MasterData
{
    //[Authorize]
    public class PRController : BaseController
    {
  
        #region BasicData
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewPR_Stages(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PR/PR_MasterData/_PR_Stages.cshtml");
        }
        public PartialViewResult ViewPR_ProductStages(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PR/PR_MasterData/_PR_ProductStages.cshtml");
        }


        public PartialViewResult ViewBatches(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PR/PR_Transactions/_Batches.cshtml");
        }
      //  ViewPR_UnApproveTransaction
        public PartialViewResult ViewPR_ApproveTransaction(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PR/PR_Approving/_PR_ApproveTransaction.cshtml");
        }
        public PartialViewResult ViewPR_UnApproveTransaction(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/PR/PR_Approving/_PR_UnApproveTransaction.cshtml");
        }
        #endregion BasicData



    }
}
