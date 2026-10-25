//using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;


namespace Forwarding.MvcApp.Controllers.MasterData.API_Locations
{
    public class ZakatAndIncomeController : BaseController
    {
        [HttpGet]
        public PartialViewResult ViewSendSalesInvoices(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ZakatAndIncome/_SendSalesInvoices.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewSubmittedInvoices(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ZakatAndIncome/_SubmittedInvoices.cshtml");
        }


        [HttpGet]
        public PartialViewResult ViewInvoicesLOG(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ZakatAndIncome/_InvoicesLOG.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSendDebitAndCredit(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ZakatAndIncome/_SendDebitAndCredit.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSubmittedDebitAndCredit(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ZakatAndIncome/_SubmittedDebitAndCredit.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewZakatAndIncomeReport(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/ZakatAndIncome/_ZakatAndIncomeReport.cshtml");
        }

    }
}
