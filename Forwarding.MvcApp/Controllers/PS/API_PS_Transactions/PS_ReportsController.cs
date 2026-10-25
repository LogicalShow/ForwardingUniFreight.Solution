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
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Helpers;
using System.Data;
using MoreLinq;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class PS_ReportsController : ApiController
    {
  

        [HttpGet, HttpPost]
        public Object[] IntializeData()
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            CSuppliers cSuppliers = new CSuppliers();
            cSuppliers.GetList("where 1 = 1");

            CPurchaseItem cPurchaseItem = new CPurchaseItem();
            cPurchaseItem.GetList("where 1 = 1");


            CSuppliersOther objCSuppliersOther = new CSuppliersOther();
            objCSuppliersOther.GetList("where 1 = 1");

            CCustody objCCustody = new CCustody();
            objCCustody.GetList("where 1 = 1");


            return new Object[]
                {
                srialize.Serialize(cSuppliers.lstCVarSuppliers),
                srialize.Serialize(cPurchaseItem.lstCVarPurchaseItem),
                srialize.Serialize(objCSuppliersOther.lstCVarSuppliersOther),
                srialize.Serialize(objCCustody.lstCVarCustody)

                };
            
        }





        [HttpGet, HttpPost]
        public Object[] GetPrintedTotalItemsData( string pSupplierIDs, string pItemIDs , string pReportNo, DateTime From, DateTime To)
        {
            var ReportNo = pReportNo.Trim();
            bool pRecordsExist = false;
            Exception checkException = null;
            //******
            var ReportDate = new List<CVarGetPS_InvoicesDetailsTotals>();
            var HTMLTableRows = "";
            List<string> tbls = new List<string>();
            CGetPS_InvoicesDetailsTotals cGetPS_InvoicesDetailsTotals = new CGetPS_InvoicesDetailsTotals();
            //******
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            var WhereCondition = ""; //" where ( CONVERT(date , InvoiceDate) between  CONVERT(date ,\'" + pFromDate + "\') and  CONVERT(date ,\'" + pToDate + "\') ) AND SupplierID IN(" + pSupplierIDs + ") AND isnull(IsDeleted , 0) = 0";
             if (pReportNo == "6")
            {
                checkException = cGetPS_InvoicesDetailsTotals.GetList(From , To , pSupplierIDs , pItemIDs);
                if (cGetPS_InvoicesDetailsTotals.lstCVarGetPS_InvoicesDetailsTotals.Count > 0 && checkException == null)
                {
                    pRecordsExist = true;
                    ReportDate = cGetPS_InvoicesDetailsTotals.lstCVarGetPS_InvoicesDetailsTotals.ToList();
                }
                return new Object[] { pRecordsExist, null, srialize.Serialize(ReportDate) };

            }
            else
            {
                return new Object[] { pRecordsExist, srialize.Serialize(ReportDate), srialize.Serialize(HTMLTableRows) };

            }
        }


        //  http://localhost:1425/api/PS_Reports/GetInvoicesTotalsData?From=09%2F01%2F2019&To=09%2F23%2F2019&pSupplierIDs=4%2C5%2C7%2C123%2C124&pReportNo=7
        [HttpGet, HttpPost]
        public Object[] GetInvoicesTotalsData(DateTime From, DateTime To , string pSupplierIDs,string pItemIDs , string pReportNo )
        {
            var ReportNo = pReportNo.Trim();
            bool pRecordsExist = false;
            Exception checkException = null;
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            //******
            var ReportDate = new List<CVarGetPS_InvoicesTotals>();
            var HTMLTableRows = "";
            List<string> tbls = new List<string>();
            CGetPS_InvoicesTotals cGetPS_InvoicesTotals = new CGetPS_InvoicesTotals();
            //******
            var WhereCondition = ""; //" where ( CONVERT(date , InvoiceDate) between  CONVERT(date ,\'" + pFromDate + "\') and  CONVERT(date ,\'" + pToDate + "\') ) AND SupplierID IN(" + pSupplierIDs + ") AND isnull(IsDeleted , 0) = 0";
            if (pReportNo == "7")
            {
                checkException = cGetPS_InvoicesTotals.GetList(From, To , pSupplierIDs);
                if (cGetPS_InvoicesTotals.lstCVarGetPS_InvoicesTotals.Count > 0 && checkException == null)
                {
                    pRecordsExist = true;
                    ReportDate = cGetPS_InvoicesTotals.lstCVarGetPS_InvoicesTotals.ToList();
                }
                return new Object[] { pRecordsExist, null, srialize.Serialize(ReportDate) };

            }
            else
            {
                return new Object[] { pRecordsExist, srialize.Serialize(ReportDate), srialize.Serialize(HTMLTableRows) };

            }
        }


        [HttpGet, HttpPost]
        public Object[] GetPrintedData(string pFromDate, string pToDate, string pSupplierIDs, string pItemIDs , string pReportNo)
        {
            var ReportNo = pReportNo.Trim();
            bool pRecordsExist = false;
            Exception checkException = null;

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            //******
            var ReportDate = new List<CVarvwPS_InvoicesDetails>();
            var PurchasingItemsTotalData = new List<CVarGetPS_InvoicesDetailsTotals>();
            //******
            var HTMLTableRows = "";
            List<string> tbls = new List<string>();
            CvwPS_InvoicesDetails cvwPS_InvoicesDetails = new CvwPS_InvoicesDetails();
            CGetPS_InvoicesDetailsTotals cGetPS_InvoicesDetailsTotals = new CGetPS_InvoicesDetailsTotals();
            //******

            var WhereCondition = "";

             WhereCondition =  " where  ( CONVERT(date , InvoiceDate) between  CONVERT(date ,\'" + pFromDate + "\') and  CONVERT(date ,\'"+ pToDate + "\') ) " + ( pSupplierIDs == "-1" ? " " : " AND SupplierID IN(" + pSupplierIDs + ") " ) + " AND isnull(IsDeleted , 0) = 0 ";
            if (pReportNo == "1")
            {
                checkException = cvwPS_InvoicesDetails.GetList(WhereCondition + " AND isnull(D_ItemID , 0 ) = 0 order by CurrencyID");
                if (cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.Count > 0 && checkException == null)
                {
                pRecordsExist = true;
                ReportDate = cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.ToList();
                    List<string> Currencies = ReportDate.Select(x => x.CurrencyCode).ToList();
                    Currencies = Currencies.DistinctBy(x => x).ToList();
                   
                    foreach (var currency in Currencies)
                    {
                        var pivotTable = ReportDate.Where(x=> x.CurrencyCode == currency).ToList().ToPivotTable(
                        item => item.D_ServiceName,
                        item => item.InvoiceNo,
                        items => items.Sum(x => x.D_Total));
                        tbls.Add( GetHTMLTableContainsWithFontSize_Customized(pivotTable, "", "Services Purchasing Follow-Up (" +  currency + ")"  , true, false, false, "13px", ReportDate , false) );
                    }
                    ReportDate = null;

               

                
             
                }
                return new Object[] { pRecordsExist, srialize.Serialize(ReportDate), srialize.Serialize(tbls) };

            }
            else if (pReportNo == "2")
            {
                checkException = cvwPS_InvoicesDetails.GetList(WhereCondition + " AND isnull(D_ItemID , 0 ) = 0 order by CurrencyID");
                if (cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.Count > 0 && checkException == null)
                {
                    pRecordsExist = true;
                    ReportDate = cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.ToList();
                    
                        var pivotTable = ReportDate.ToPivotTable(
                        item => item.D_ServiceName,
                        item => item.InvoiceNo,
                        items => items.Sum(x => (x.D_Total * x.ExchangeRate)  ));
                        tbls.Add(GetHTMLTableContainsWithFontSize_Customized(pivotTable, "", "Services Purchasing Follow-Up", true, false, false, "13px", ReportDate, true));
                        ReportDate = null;
                 }
                return new Object[] { pRecordsExist, srialize.Serialize(ReportDate), srialize.Serialize(tbls) };

            }
            else if (pReportNo == "3")
            {
                
                checkException = cvwPS_InvoicesDetails.GetList(WhereCondition +  (pItemIDs == "-1" ? " " : " AND D_ItemID IN("+ pItemIDs + ")") + " AND isnull(D_ItemID , 0 ) <> 0 order by D_ItemID");
                if (cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.Count > 0 && checkException == null)
                {
                    pRecordsExist = true;
                    ReportDate = cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.ToList();
                    var pivotTable = ReportDate.ToPivotTable(
                    item => item.D_ServiceName,
                    item => item.D_ItemID,
                    items => items.Sum(x => (x.D_Total * x.ExchangeRate)));
                    tbls.Add(GetHTMLTableContainsWithFontSize_Customized(pivotTable, "", "Services Purchasing Follow-Up", true, false, false, "13px", ReportDate, true));
                    ReportDate = null;
                }
                return new Object[] { pRecordsExist, null, srialize.Serialize(ReportDate) };

            }
            else if (pReportNo == "4")
            {
                checkException = cvwPS_InvoicesDetails.GetList(WhereCondition + (pItemIDs == "-1" ? " " : " AND D_ItemID IN(" + pItemIDs + ")") + " AND isnull(D_ItemID , 0 ) <> 0 order by D_ItemID");
                if (cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.Count > 0 && checkException == null)
                {
                    pRecordsExist = true;
                    ReportDate = cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.ToList();
                    var pivotTable = ReportDate.ToPivotTable(
                    item => item.D_ItemName,
                    item => item.SupplierName,
                    items => items.Sum(x => (x.D_Quantity)));
                    tbls.Add(HTMLFunctions.GetHTMLTableContainsWithFontSize(System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName,pivotTable, "", "Items Purchasing Follow-Up(Totals)", false, false, false, "10px"));
                   // tbls.Add(GetHTMLTableContainsWithFontSize_Customized(pivotTable, "", "Items Purchasing Follow-Up", true, false, false, "13px", ReportDate, true));

                    ReportDate = null;
                }
                return new Object[] { pRecordsExist, srialize.Serialize(ReportDate), srialize.Serialize(tbls) };

            }
            else if (pReportNo == "5")
            {
                checkException = cvwPS_InvoicesDetails.GetList(WhereCondition + (pItemIDs == "-1" ? " " : " AND D_ItemID IN(" + pItemIDs + ")") + " AND isnull(D_ItemID , 0 ) <> 0 order by InvoiceNo");
                if (cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.Count > 0 && checkException == null)
                {
                    pRecordsExist = true;
                    ReportDate = cvwPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails.ToList();
                    //var pivotTable = ReportDate.ToPivotTable(
                    //item => item.D_ServiceName,
                    //item => item.D_ItemID,
                    //items => items.Sum(x => (x.D_Total * x.ExchangeRate)));
                    //tbls.Add(GetHTMLTableContainsWithFontSize_Customized(pivotTable, "", "Services Purchasing Follow-Up", true, false, false, "13px", ReportDate, true));
                    // ReportDate = null;
                }
                return new Object[] { pRecordsExist, null, srialize.Serialize(ReportDate) };

            }
            else
            {
                return new Object[] { pRecordsExist, srialize.Serialize(ReportDate), new JavaScriptSerializer().Serialize(HTMLTableRows) };

            }
        }


        private static string GetHTMLTableContainsWithFontSize_Customized(DataTable datasource, string RowsColumnTitle, string TableTitle, bool HasHorizontalTotal /*-*/, bool HasVerticalTotal /*|*/, bool HasPercantage, string FontSize /*"50px"*/, List<CVarvwPS_InvoicesDetails> ReportData , bool IsLocal)
        {
            var tr = "";
            List<DataRow> list = new List<DataRow>();
            //if (datasource.Count > 0)
            //{
            //IsLocal = false;
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Load Columns Names @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            string[] columnNames = (from dc in datasource.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



            //@@@@@@@@@@@@@@@@@@@@@@@@@ TO Calculate Total For Each Column @@@@@@@@@@@@@@@
            var TotalOfColumns = new List<decimal>(columnNames.Count());       // ^ total
            decimal TotalOfRows = 0.0M;                                            // > total
            decimal TotalAll = 0.0M;
            var rowtitle = "";
            decimal TotalTaxes = 0.0M;
            decimal TotalServices = 0.0M;
            decimal TotalItems = 0.0M;
            decimal TotalExpenses = 0.0M;
            decimal TotalDiscount = 0.0M;
            decimal TotalInvoices = 0.0M;
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            #region TableHeader

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@ Table Header @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            tr = tr + "<thead><tr style= \"\"><td colspan=\"" + (columnNames.Length + 9) + "\" class=\"text-center\" style= \"border-top-color:white!important;border-left-color:white!important;border-right-color:white!important;border-top-color:right!important;\"><h3> " + TableTitle + " </h3></td></tr></thead> " + " ";
            tr = tr + "              <thead>" + " ";
            tr = tr + "              <tr>" + " ";

            for (int i = 0; i < columnNames.Length; i++)
            {

                if (i == 0)
                {
                    tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Invoice Date" + "</th>";
                    tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Company" + "</th>";
                    tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Invoice NO." + "</th>";

                }
                else
                {
                    try
                    {
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">[" + (Convert.ToDateTime(columnNames[i])).Day + "-" + (Convert.ToDateTime(columnNames[i])).Month + "]</th>";
                    }
                    catch
                    {
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + columnNames[i] + "</th>";

                    }

                }
            }
            //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Total Services" + "</th>";
            tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Total Items" + "</th>";
            tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Total Expenses" + "</th>";
            tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Taxes" + "</th>";
            tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Discount" + "</th>";
            tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Total" + "</th>";
            //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

            if (HasVerticalTotal)
                tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; font-size:" + FontSize + "; line-height:2!important;\">" + "TOTAL" + "</th>";

            tr = tr + "</tr>" + " ";
            tr = tr + "</thead>" + " ";

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            #endregion TableHeader

            //@@@@@@@@@@@@@@@@@ Divide Rows as Lists @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            foreach (DataRow dr in datasource.Rows)
            {
                list.Add(dr);
            }
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Body @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            for (int i = 0; i < list.Count; i++) // ** each rows   // ** ItemArray[j] : row cell with it index
            {

                rowtitle = Convert.ToString(list[i].ItemArray[0]);
                var Item = ReportData.FirstOrDefault(x => x.InvoiceNo == rowtitle);
                if (i == 0) // ** first row of data // ** 
                {
                    tr = tr + "              <tbody>" + " ";
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    TotalOfRows = 0;
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {

                            try
                            {
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                TotalOfColumns.Add(0);
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);


                            }

                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:" + FontSize + ";\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";

                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));
                            //  }
                            if (j == (list[i].ItemArray.Length - 1))
                            {
                                if (Item != null)
                                {
                                    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ServicesAmount * Item.ExchangeRate) : Item.ServicesAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice).ToString("0.##") + "</b> </td> ";
                                    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                    TotalTaxes += (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount);
                                    TotalServices += (IsLocal ? (Item.ServicesAmount * Item.ExchangeRate) : Item.ServicesAmount);
                                    TotalItems += (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount);
                                    TotalExpenses += (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount);
                                    TotalDiscount += (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount);
                                    TotalInvoices += (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice);
                                }
                            }

                        }
                        else
                        {
                            if (Item != null)
                            {
                                //  rowtitle = Convert.ToString(list[i].ItemArray[j]);

                                //xxxxxxxxxxxxxxxxxxxxxxxxxx static td xxx get by title xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (Item.InvoiceDate == null ? "" : Item.InvoiceDate.ToString("dd/MM/yyyy")) + "</b> </td> ";
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.SupplierName + "</b> </td> ";
                                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + rowtitle + "</b> </td> "; // InvNo
                            }
                        }


                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"background-color:Gainsboro!important;text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;
                    //tr = tr + "</thead>" + " ";

                }
                else if ((i + 1) == list.Count) // ** last row of data
                {
                    
                    
                    TotalOfRows = 0;
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {
                        
                        if (j > 0)
                        {
                            //if (rowtitle.Contains("**"))
                            //{
                            try
                            {
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                TotalOfColumns.Add(0);
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }

                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:" + FontSize + ";\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";


                            if(j == (list[i].ItemArray.Length-1))
                            {
                                if (Item != null)
                                {
                                    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ServicesAmount * Item.ExchangeRate) : Item.ServicesAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice).ToString("0.##") + "</b> </td> ";
                                    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                    TotalTaxes += (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount);
                                    TotalServices += (IsLocal ? (Item.ServicesAmount * Item.ExchangeRate) : Item.ServicesAmount);
                                    TotalItems += (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount);
                                    TotalExpenses += (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount);
                                    TotalDiscount += (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount);
                                    TotalInvoices += (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice);
                                }
                            }
                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));
                            // }


                        }
                        else
                        {

                            //xxxxxxxxxxxxxxxxxxxxxxxxxx static td xxx get by title xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

                            if (Item != null)
                            {
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.InvoiceDate.ToString("dd/MM/yyyy") + "</b> </td> ";
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.SupplierName + "</b> </td> ";
                                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + rowtitle + "</b> </td> ";
                            }

                           

                        }

                        //  tr = tr + " <td> " + list[i].ItemArray[j] + " </td> ";
                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"background-color:Gainsboro!important;text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;




                }
                else
                {
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    TotalOfRows = 0;
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {

                            try
                            {
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                TotalOfColumns.Add(0);
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }

                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:" + FontSize + ";\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";

                            if (j == (list[i].ItemArray.Length - 1))
                            {
                                if (Item != null)
                                {
                                    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ServicesAmount * Item.ExchangeRate) : Item.ServicesAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount).ToString("0.##") + "</b> </td> ";
                                    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice).ToString("0.##") + "</b> </td> ";
                                    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                    TotalTaxes += (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount);
                                    TotalServices += (IsLocal ? (Item.ServicesAmount * Item.ExchangeRate) : Item.ServicesAmount);
                                    TotalItems += (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount);
                                    TotalExpenses += (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount);
                                    TotalDiscount += (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount);
                                    TotalInvoices += (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice);
                                }
                            }


                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));

                        }
                        else
                        {
                            if (Item != null)
                            {
                                // rowtitle = Convert.ToString(list[i].ItemArray[j]);
                                //xxxxxxxxxxxxxxxxxxxxxxxxxx static td xxx get by title xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.InvoiceDate.ToString("dd/MM/yyyy") + "</b> </td> ";
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.SupplierName + "</b> </td> ";
                                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + rowtitle + "</b> </td> ";

                            }
                        }
                        // tr = tr + " <td style = \"text-align:center;font-size:"+FontSize+";\"> " + list[i].ItemArray[j] + " </td> ";
                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"background-color:Gainsboro!important;text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;


                }
                // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Fill Total Summary @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                if ((i + 1) == list.Count) // ** if last row >> add total row
                {
                    //************** Total *********************
                    if (HasHorizontalTotal)
                    {
                        tr = tr + " <tr>";
                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {

                                tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                                //xxxxxxxxxxxxxxxxxxx
                                tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "Total" + "</b></td> ";
                                tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "" + "</b></td> ";
                                //xxxxxxxxxxxxxxxxxx
                            }
                            else
                            {
                              

                                tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                if (j == (list[i].ItemArray.Length - 1))
                                {
                                    //xxxxxxxxxxxxxxxxxxxx
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalServices.ToString("0.##") + "</b></td> ";
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalItems.ToString("0.##") + "</b></td> ";
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalExpenses.ToString("0.##") + "</b></td> ";
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalTaxes.ToString("0.##") + "</b></td> ";
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalDiscount.ToString("0.##") + "</b></td> ";
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalInvoices.ToString("0.##") + "</b></td> ";
                                    //xxxxxxxxxxxxxxxxxxx
                                }
                            }
                        }
                        //  tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:"+FontSize+";border-top-width:3px!important; border-top-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + "ALL ROOM" + "%</b></td> ";
                        if (HasVerticalTotal)
                            tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:" + FontSize + ";border-top-width:3px!important; border-top-color:black!important;border-right-width:3px!important; border-right-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + " " + "</b></td> ";
                        tr = tr + "</tr>";


                    }
                    //****************** % *****************************
                    if (HasPercantage)
                    {
                        tr = tr + " <tr>";
                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {

                                tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:" + FontSize + ";border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>Month / Total %</b>" + " </td> ";
                            }
                            else
                            {
                                try
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:" + FontSize + "; border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + (((TotalOfColumns[j - 1] / Convert.ToDecimal(TotalAll)) * 100)).ToString("0.##") + "%</b></td> ";
                                }
                                catch (Exception ex)
                                {
                                    // tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:"+FontSize+"; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "0.0" + "%</b></td> ";
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:" + FontSize + "; border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "0.0" + "%</b></td> ";

                                }

                            }
                        }
                        if (HasVerticalTotal)
                            tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:" + FontSize + ";border-bottom-width:3px!important; border-bottom-color:black!important;border-right-width:3px!important; border-right-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalAll).ToString("0.##") + "</b></td> ";


                        tr = tr + "</tr>";
                    }

                    //***************

                    //--------------------
                    tr = tr + "</tbody>" + " ";
                }



            }






            // }
            return tr;
        }


        [HttpGet, HttpPost]
        public object[] LoadInvoiceDetails(string pWhereClause)
        {
            CvwPS_InvoicesDetails cPS_InvoicesDetails = new CvwPS_InvoicesDetails();
            CvwPS_InvoicesExpenses cPS_InvoicesExpenses = new CvwPS_InvoicesExpenses();
            CvwPS_InvoicesTaxes cPS_InvoicesTaxes = new CvwPS_InvoicesTaxes();





            CDefaults cDefaults = new CDefaults();
            int _RowCount = 0;
            cPS_InvoicesDetails.GetListPaging(100000, 1, pWhereClause + " AND isnull(D_ID , 0 ) <> 0", " ID DESC ", out _RowCount);

            // cPS_InvoicesDetails.GetList(pWhereClause + " AND isnull(D_ID , 0 ) <> 0");
            cPS_InvoicesExpenses.GetList(pWhereClause + " AND isnull(InvoiceExpencesID , 0 ) <> 0");
            cPS_InvoicesTaxes.GetList(pWhereClause + " AND isnull(InvoiceTaxesID , 0 ) <> 0");
            cDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(cPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails),
                serializer.Serialize(cPS_InvoicesExpenses.lstCVarvwPS_InvoicesExpenses) ,
                serializer.Serialize(cPS_InvoicesTaxes.lstCVarvwPS_InvoicesTaxes) ,
                serializer.Serialize(cDefaults.lstCVarDefaults[0])
            };
        }
      
    }
}
