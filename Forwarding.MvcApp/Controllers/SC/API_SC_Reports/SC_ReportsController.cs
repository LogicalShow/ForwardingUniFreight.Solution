using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Customized;
using MoreLinq;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Generated;
using Forwarding.MvcApp.Helpers;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Customized;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;


namespace Forwarding.MvcApp.Controllers.SC.API_SC_Transactions
{
    public class SC_ReportsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] GetPrintedData(string pLanguage, string pStoresIDs , string pItemsIDs , DateTime pFromDate , DateTime pToDate , string pReportNo,string pClientID="0",string PsupplierID="0")
        {
            var ReportNo = pReportNo.Trim();
            bool pRecordsExist = false;
            Exception checkException = null;
            var ReportDate = new List<CVarSC_GetTransactionsDetails>();
            var HTMLTableRows = "";
            var Lang = System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;
            CSC_GetTransactionsDetails objSC_GetTransactionsDetails = new CSC_GetTransactionsDetails();

            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(23, 45, 0); // new TimeSpan(19, 0, 0);

            pFromDate = pFromDate.Date + FirsrDayTime;
            pToDate = pToDate.Date + LastDayTime;
            checkException = objSC_GetTransactionsDetails.GetList(pItemsIDs, pStoresIDs, pFromDate, pToDate,int.Parse(pClientID), int.Parse(PsupplierID));
            
            if (objSC_GetTransactionsDetails.lstCVarSC_GetTransactionsDetails.Count > 0 && checkException == null)
            {
                pRecordsExist = true;
                ReportDate = objSC_GetTransactionsDetails.lstCVarSC_GetTransactionsDetails.ToList();

                if(pReportNo == "3")
                {
                    var pivotTable = ReportDate.ToPivotTable(
item => item.StoreName,
item => item.ItemName,
items => items.Sum(x=> x.TotalQuantity));

                    if (pLanguage == "en")
                    {
                        HTMLTableRows = HTMLFunctions.GetHTMLTableContainsWithFontSize(pLanguage, pivotTable, "", "Stock Total Balance", true, true, false, "13px");
                    }
                    else
                    {
                        HTMLTableRows = HTMLFunctions.GetHTMLTableContainsWithFontSize(pLanguage, pivotTable, "", "إجمالي أرصدة المخازن", true, true, false, "13px");
                    }

                    ReportDate = null;

                }


                else if (pReportNo == "4")
                {
                    var pivotTable = ReportDate.ToPivotTable(
item => item.TransactionStatue,
item => item.StoreName,
items => items.Sum(x => x.TotalQuantity));

                    if (pLanguage == "en")
                    {
                        HTMLTableRows = HTMLFunctions.GetHTMLTableContainsWithFontSize(pLanguage, pivotTable, "", "Stock Balance Summary", true, true, false, "20px");
                    }
                    else
                    {
                        HTMLTableRows = HTMLFunctions.GetHTMLTableContainsWithFontSize(pLanguage, pivotTable, "", "مجمع أرصدة المخازن", true, true, false, "13px");
                    }

                    ReportDate = null;

                }
                //                ReportDate = ReportDate.Where(x => x.ActionID != 0).ToList();
                //                var pivotTable = ReportDate.ToPivotTable(
                //item => item.ClientName,
                //item => item.ActionName,
                //items => items.Any() ? items.Count() : 0);
                //                HTMLTableRows = HTMLFunctions.GetRows(pivotTable, "Action \\ Customers", "Summary");
            }
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            return new Object[] { pRecordsExist, srialize.Serialize(ReportDate), srialize.Serialize(HTMLTableRows) };
        }
        
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] FillFilter()
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            CSC_Stores cSC_Stores = new CSC_Stores();
            CPurchaseItem cPurchaseItem = new CPurchaseItem();
            CA_CostCenters cA_CostCenters = new CA_CostCenters();
            CCustomers cCustomers = new CCustomers();
            CSuppliers cSuppliers = new CSuppliers();
            cSC_Stores.GetList("where 1 = 1");
            cPurchaseItem.GetList("where 1 = 1");
            cA_CostCenters.GetList("where Isnull(IsMain , 0) = 0 ");
            cCustomers.GetList("where 1 = 1");
            cSuppliers.GetList("where 1 = 1");
            
            var _stores = srialize.Serialize(cSC_Stores.lstCVarSC_Stores);
            var _PurchaseItem = srialize.Serialize(cPurchaseItem.lstCVarPurchaseItem);
            var _CostCenters = srialize.Serialize(cA_CostCenters.lstCVarA_CostCenters);
            var _Customers = srialize.Serialize(cCustomers.lstCVarCustomers);
            var _Suppliers = srialize.Serialize(cSuppliers.lstCVarSuppliers);

            return new Object[]
            {
                                   _stores,
                                  _PurchaseItem,
                                   _CostCenters,
                                    _Customers,_Suppliers


            };
        }






    }






}


