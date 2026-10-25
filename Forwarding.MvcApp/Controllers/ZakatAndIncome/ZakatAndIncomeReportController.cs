//using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.ReportSource;
using CrystalDecisions.Shared;
using CrystalDecisions.ReportAppServer; 
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Newtonsoft.Json;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Numeric;
using System.Net.Http.Headers;
using RestSharp;
using System.Threading.Tasks;
using System.Text;
using Newtonsoft.Json.Linq;
using System.Web.Helpers;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ZakatAndIncome;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Database;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Locations
{
    public class ZakatAndIncomeReportController : ApiController
    {

        [HttpGet, HttpPost]
        public Object[] IntializeData()
        {
            var ff = WebSecurity.CurrentUserId;
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CBranches cBranches = new CBranches();
            CInvoiceTypes cInvoiceTypes = new CInvoiceTypes();
            CCustomers cCustomers = new CCustomers();
            CCurrencies cCurrencies = new CCurrencies();

            CZatca_vwInvoices Zatca_vwInvoices = new CZatca_vwInvoices();
            Int32 _RowCount = 0;
            Zatca_vwInvoices.GetListPaging(10, 1, " Where InvoiceTypeID<>21 AND ISNULL(IsDeleted , 0) = 0  AND  ID>=11173 AND PartnerName <>'0' AND InvoiceDate >= '2024-06-01'  and ID Not in ( select ResponseToSubmitInvoice.InvoiceID from ResponseToSubmitInvoice)", " InvoiceNumber ", out _RowCount);

            cBranches.GetList(" Where 1=1");
            cInvoiceTypes.GetList(" Where 1=1");
            cCustomers.GetList(" where 1 = 1 order by Name ");
            cCurrencies.GetList(" Where 1=1");

            return new Object[]
            {
            srialize.Serialize(Zatca_vwInvoices.lstCVarZatca_vwInvoices),//0
            _RowCount,
            srialize.Serialize(cCustomers.lstCVarCustomers),
            srialize.Serialize(cBranches.lstCVarBranches),
            srialize.Serialize(cInvoiceTypes.lstCVarInvoiceTypes),
            srialize.Serialize(cCurrencies.lstCVarCurrencies)
            };
        }

        [HttpGet, HttpPost]
        public Object[] GetTaxAmounts(string WhereClause, string InvoiceModule)
        {
            decimal AmountWithoutVAT = 0;
            decimal TaxAmount = 0;
            decimal TotalAmount = 0;
            decimal Items15PercTaxAmount = 0;

            CZatca_vwInvoices Zatca_vwInvoices = new CZatca_vwInvoices();
            if (InvoiceModule == "Operations")
            {
                Zatca_vwInvoices.GetList(WhereClause);
                AmountWithoutVAT += Zatca_vwInvoices.lstCVarZatca_vwInvoices.Where(i => i.AmountWithoutVAT > 0).Sum(item => item.AmountWithoutVAT);
                TaxAmount += Zatca_vwInvoices.lstCVarZatca_vwInvoices.Where(i => i.TaxAmount > 0).Sum(item => item.TaxAmount);
                Items15PercTaxAmount += Zatca_vwInvoices.lstCVarZatca_vwInvoices.Where(i => i.Items15PercTaxAmount > 0).Sum(item => item.Items15PercTaxAmount);
                TotalAmount += Zatca_vwInvoices.lstCVarZatca_vwInvoices.Where(i => i.Amount > 0).Sum(item => item.Amount);
            }
            CZatca_vwInvoicesForTrucking Zatca_vwInvoicesForTrucking = new CZatca_vwInvoicesForTrucking();
            if (InvoiceModule == "Trucking")
            {
                Zatca_vwInvoicesForTrucking.GetList(WhereClause);
                AmountWithoutVAT += Zatca_vwInvoicesForTrucking.lstCVarZatca_vwInvoicesForTrucking.Where(i => i.AmountWithoutVAT > 0).Sum(item => item.AmountWithoutVAT);
                TaxAmount += Zatca_vwInvoicesForTrucking.lstCVarZatca_vwInvoicesForTrucking.Where(i => i.TaxAmount > 0).Sum(item => item.TaxAmount);
                Items15PercTaxAmount += Zatca_vwInvoicesForTrucking.lstCVarZatca_vwInvoicesForTrucking.Where(i => i.Items15PercTaxAmount > 0).Sum(item => item.Items15PercTaxAmount);
                TotalAmount += Zatca_vwInvoicesForTrucking.lstCVarZatca_vwInvoicesForTrucking.Where(i => i.Amount > 0).Sum(item => item.Amount);
            }
            CZatca_vwInvoicesForSales Zatca_vwInvoicesForSales = new CZatca_vwInvoicesForSales();
            if (InvoiceModule == "Sales")
            {
                Zatca_vwInvoicesForSales.GetList(WhereClause);
                AmountWithoutVAT += Zatca_vwInvoicesForSales.lstCVarZatca_vwInvoicesForSales.Where(i => i.AmountWithoutVAT > 0).Sum(item => item.AmountWithoutVAT);
                TaxAmount += Zatca_vwInvoicesForSales.lstCVarZatca_vwInvoicesForSales.Where(i => i.TaxAmount > 0).Sum(item => item.TaxAmount);
                Items15PercTaxAmount += Zatca_vwInvoicesForSales.lstCVarZatca_vwInvoicesForSales.Where(i => i.Items15PercTaxAmount > 0).Sum(item => item.Items15PercTaxAmount);
                TotalAmount += Zatca_vwInvoicesForSales.lstCVarZatca_vwInvoicesForSales.Where(i => i.Amount > 0).Sum(item => item.Amount);
            }
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            return new Object[]
            {
                //srialize.Serialize(Zatca_vwInvoicesForTrucking.lstCVarZatca_vwInvoicesForTrucking)
                AmountWithoutVAT,(TaxAmount+Items15PercTaxAmount),TotalAmount
            };
        }

    }

}
