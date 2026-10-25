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
using ERP_Web.MvcApp.Controllers.Sales.API_Transactions;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Locations
{
    public class SubmittedInvoicesController : ApiController
    {

        //[HttpGet, HttpPost]
        //public Object[] GetSalesInvoicesFilters(string pWhereClause)
        //{
        //    CStorageTypes objCStorageTypes = new CStorageTypes();
        //    objCStorageTypes.GetList(pWhereClause);
        //    return new Object[] { new JavaScriptSerializer().Serialize(objCStorageTypes.lstCVarStorageTypes) };
        //}

        [HttpGet, HttpPost]
        public Object[] IntializeData(int pPageNumber, int pPageSize, string pWhereClause)
        {
            pPageNumber = (pPageNumber == 0 ? 1 : pPageNumber);
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CBranches cBranches = new CBranches();
            CInvoiceTypes cInvoiceTypes = new CInvoiceTypes();
            CCustomers cCustomers = new CCustomers();
            CCurrencies cCurrencies = new CCurrencies();

            CvwSubmittedInvoiceForwarding vwSubmittedInvoiceForwarding = new CvwSubmittedInvoiceForwarding();
            Int32 _RowCount = 0;
            vwSubmittedInvoiceForwarding.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);

            cBranches.GetList(" Where 1=1");
            cInvoiceTypes.GetList(" Where 1=1");
            cCustomers.GetList(" where 1 = 1 order by Name ");
            cCurrencies.GetList(" Where 1=1");

            return new Object[]
            {
            srialize.Serialize(vwSubmittedInvoiceForwarding.lstCVarvwSubmittedInvoiceForwarding),//0
            _RowCount,//1
            srialize.Serialize(cCustomers.lstCVarCustomers),//2
            srialize.Serialize(cBranches.lstCVarBranches),//3
            srialize.Serialize(cInvoiceTypes.lstCVarInvoiceTypes),//4
            srialize.Serialize(cCurrencies.lstCVarCurrencies)//5
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllFilters(int pPageNumber, int pPageSize, string pSearchKey)
        {
            pPageNumber = (pPageNumber == 0 ? 1 : pPageNumber);
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CBranches cBranches = new CBranches();
            CInvoiceTypes cInvoiceTypes = new CInvoiceTypes();
            CCustomers cCustomers = new CCustomers();
            CCurrencies cCurrencies = new CCurrencies();

            Int32 _RowCount = 0;
            CvwSubmittedInvoiceForwarding vwSubmittedInvoiceForwarding = new CvwSubmittedInvoiceForwarding();
            vwSubmittedInvoiceForwarding.GetListPaging(pPageSize, pPageNumber, " Where 1=1", " ID DESC ", out _RowCount);

            cBranches.GetList(" Where 1=1");
            cInvoiceTypes.GetList(" Where 1=1");
            cCustomers.GetList(" where 1 = 1 order by Name ");
            cCurrencies.GetList(" Where 1=1");

            return new Object[]
            {
            srialize.Serialize(vwSubmittedInvoiceForwarding.lstCVarvwSubmittedInvoiceForwarding),//0
            _RowCount,//1
            srialize.Serialize(cCustomers.lstCVarCustomers),//2
            srialize.Serialize(cBranches.lstCVarBranches),//3
            srialize.Serialize(cInvoiceTypes.lstCVarInvoiceTypes),//4
            srialize.Serialize(cCurrencies.lstCVarCurrencies)//5
            };
        }

        [HttpGet, HttpPost]
        public Object[] SearchByInvoiceNumber(int pPageNumber, int pPageSize, string pWhereClause)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            int _RowCount = 0;
            CvwSubmittedInvoiceForwarding vwSubmittedInvoiceForwarding = new CvwSubmittedInvoiceForwarding();
            vwSubmittedInvoiceForwarding.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);

            return new Object[]
            {
                srialize.Serialize(vwSubmittedInvoiceForwarding.lstCVarvwSubmittedInvoiceForwarding),
                _RowCount
            };
        }

        [HttpGet, HttpPost]
        public Object[] SearchByInvoiceNumberByInvoiceModule(string WhereClause, string InvoiceModules, int pageNumber, int pageSize, string OrderBy)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            int _RowCount = 0;
            string InvoicesTypesIDs = "";
            string InvoiceModulesCondition = "";
            string WhereModules = " AND(";
            if (InvoiceModules.Contains("1"))//  فواتير المعاملات 
            {
                CInvoiceTypes InvoiceTypes = new CInvoiceTypes();
                InvoiceTypes.GetList(" Where 1=1");
                if (InvoiceTypes.lstCVarInvoiceTypes.Count > 0)
                    InvoicesTypesIDs = string.Join(",", InvoiceTypes.lstCVarInvoiceTypes.Select(x => x.ID));
                if (InvoicesTypesIDs != "")
                {
                    InvoiceModulesCondition += " InvoiceTypeID IN(" + InvoicesTypesIDs + ")";
                }
            }
            if (InvoiceModules.Contains("2"))//فاتورة النقل
            {
                InvoiceModulesCondition += (InvoiceModulesCondition == ""? "  InvoiceTypeID = 13": " OR InvoiceTypeID = 13");
            }
            if (InvoiceModules.Contains("3"))// فواتير المبيعات
            {
                InvoiceModulesCondition += (InvoiceModulesCondition == "" ? " InvoiceTypeID = 3" : " OR InvoiceTypeID = 3");
            }

            if (InvoiceModulesCondition != "")
            {
                WhereModules += InvoiceModulesCondition;
                WhereModules += ")";
                WhereClause += WhereModules; 
            }
            CvwSubmittedInvoiceForwarding vwSubmittedInvoiceForwarding = new CvwSubmittedInvoiceForwarding();
            vwSubmittedInvoiceForwarding.GetListPaging(pageSize, pageNumber, WhereClause, " ID DESC ", out _RowCount);

            CvwSubmittedInvoiceForwarding ALLvwSubmittedInvoiceForwarding = new CvwSubmittedInvoiceForwarding();
            ALLvwSubmittedInvoiceForwarding.GetList(WhereClause);
            decimal AmountWithoutVAT = ALLvwSubmittedInvoiceForwarding.lstCVarvwSubmittedInvoiceForwarding.Where(i => i.AmountWithoutVAT > 0).Sum(item => item.AmountWithoutVAT);
            decimal TotalAmount = ALLvwSubmittedInvoiceForwarding.lstCVarvwSubmittedInvoiceForwarding.Where(i => i.Amount > 0).Sum(item => item.Amount);

            return new Object[]
            {
                srialize.Serialize(vwSubmittedInvoiceForwarding.lstCVarvwSubmittedInvoiceForwarding),
                _RowCount,

                AmountWithoutVAT,TotalAmount
            };
        }

    }

}
