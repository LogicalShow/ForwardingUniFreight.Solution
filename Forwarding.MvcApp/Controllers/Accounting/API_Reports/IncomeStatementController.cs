using Forwarding.MvcApp.Helpers;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Reports
{

    public class IncomeStatementController : ApiController
    { 
        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CvwA_Accounts objCActivityIncome = new CvwA_Accounts();
            CvwA_Accounts objCActivityExpense = new CvwA_Accounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            objCActivityIncome.GetListPaging(99999, 1, "WHERE Account_Number like '4%' AND IsMain=0", "Name, Code", out _RowCount);
            objCActivityExpense.GetListPaging(99999, 1, "WHERE Account_Number like '3%' and IsMain=0", "Name", out _RowCount);
            objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            CCurrencies objCCurrencies = new CCurrencies();
            objCCurrencies.GetList(" Where 1=1");

            CvwA_Branches objCvwA_Branches = new CvwA_Branches();

            objCvwA_Branches.GetListPaging(99999, 1, "WHERE 1=1", "Name, Code", out _RowCount);

            CA_IncomeStatement objCA_IncomeStatementRevenue = new CA_IncomeStatement();
            objCA_IncomeStatementRevenue.GetList("Where TypeCode='I'");


            CA_IncomeStatement objCA_IncomeStatementExpense = new CA_IncomeStatement();
            objCA_IncomeStatementExpense.GetList("Where TypeCode='E' ");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                serializer.Serialize(objCActivityIncome.lstCVarvwA_Accounts)
                , serializer.Serialize(objCActivityExpense.lstCVarvwA_Accounts)
                , serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                , serializer.Serialize(objCCurrencies.lstCVarCurrencies)
                , serializer.Serialize(objCvwA_Branches.lstCVarvwA_Branches)
                ,serializer.Serialize(objCA_IncomeStatementRevenue.lstCVarA_IncomeStatement)
                ,serializer.Serialize(objCA_IncomeStatementExpense.lstCVarA_IncomeStatement)
            };
        }
        [HttpGet, HttpPost]
        public object[] GetPrintedData([FromBody] ParaGetPrintedData paraGetPrintedData)
        {
            CA_IncomeStatement objCA_IncomeStatement = new CA_IncomeStatement();
            objCA_IncomeStatement.DeleteList("Where 1=1");

             string[] ArrRevenueIDs = paraGetPrintedData.pIncomeAccountIDs.Split(',');
            string[] ArrExpenseIDs = paraGetPrintedData.pExpenseAccountIDs.Split(',');

            for (int i = 0; i < ArrRevenueIDs.Length; i++)
            {
                CVarA_IncomeStatement objCVarA_IncomeStatement = new CVarA_IncomeStatement();
                objCVarA_IncomeStatement.AccountID =Convert.ToInt32( ArrRevenueIDs[i]);
                objCVarA_IncomeStatement.TypeCode = "I";
                objCA_IncomeStatement.lstCVarA_IncomeStatement.Add(objCVarA_IncomeStatement);

            }

            for (int i = 0; i < ArrExpenseIDs.Length; i++)
            {
                CVarA_IncomeStatement objCVarA_IncomeStatement = new CVarA_IncomeStatement();
                objCVarA_IncomeStatement.AccountID = Convert.ToInt32(ArrExpenseIDs[i]);
                objCVarA_IncomeStatement.TypeCode = "E";
                objCA_IncomeStatement.lstCVarA_IncomeStatement.Add(objCVarA_IncomeStatement);
            }
            objCA_IncomeStatement.SaveMethod(objCA_IncomeStatement.lstCVarA_IncomeStatement);

            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
            int _RowCount = 0;
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            CvwStructure_Rep_A_IncomeStatement objCvwStructure_Rep_A_IncomeStatement = new CvwStructure_Rep_A_IncomeStatement();
            CvwA_IncomeStatementByCostCenter ObjCVarvwA_IncomeStatementByCostCenter = new CvwA_IncomeStatementByCostCenter();
            CvwStructure_Rep_A_IncomeStatement objCvwStructure_Rep_A_IncomeStatementByCurrency = new CvwStructure_Rep_A_IncomeStatement();
            CvwA_IncomeStatementByCostCenter ObjCVarvwA_IncomeStatementByCostCenterByCurrency = new CvwA_IncomeStatementByCostCenter();

            CvwStructure_Rep_A_IncomeStatementByOperationDate objCvwStructure_Rep_A_IncomeStatementByOperationDate = new CvwStructure_Rep_A_IncomeStatementByOperationDate();
            CvwStructure_Rep_A_IncomeStatementByInvoiceDate objCvwStructure_Rep_A_IncomeStatementByInvoiceDate = new CvwStructure_Rep_A_IncomeStatementByInvoiceDate();
            CRep_A_IncomeStatementMonth_NileLogistics objCRep_A_IncomeStatementMonth_NileLogistics = new CRep_A_IncomeStatementMonth_NileLogistics();

            if (paraGetPrintedData.pCostCenterIDList != "")
            {
                checkException = ObjCVarvwA_IncomeStatementByCostCenter.GetList(
                DateTime.ParseExact(paraGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , DateTime.ParseExact(paraGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , paraGetPrintedData.pIncomeAccountIDs == "0" ? "-1" : ( "," + paraGetPrintedData.pIncomeAccountIDs + ",")
                , paraGetPrintedData.pExpenseAccountIDs == "0" ? "-1" : ( "," + paraGetPrintedData.pExpenseAccountIDs + ",")
                , paraGetPrintedData.pOtherIncomeAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
                , paraGetPrintedData.pOtherExpenseAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherExpenseAccountIDs + ",")
                //, paraGetPrintedData.pBranchIDList == "0" ? "," : ("," + paraGetPrintedData.pBranchIDList + ",")
                , paraGetPrintedData.pCostCenterIDList == "" ? "0" :( "," + paraGetPrintedData.pCostCenterIDList + ",")
                , paraGetPrintedData.pLanguage == "ar" ? true : false
                , "," + paraGetPrintedData.pBranche_IDs + ","
                , paraGetPrintedData.pSeeingInvisibleAccounts
                ,paraGetPrintedData.pHideProfitLossJV
                );

                checkException = ObjCVarvwA_IncomeStatementByCostCenterByCurrency.GetListByCurrency(
            DateTime.ParseExact(paraGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
            , DateTime.ParseExact(paraGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
            , paraGetPrintedData.pIncomeAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pIncomeAccountIDs + ",")
            , paraGetPrintedData.pExpenseAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pExpenseAccountIDs + ",")
            , paraGetPrintedData.pOtherIncomeAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
            , paraGetPrintedData.pOtherExpenseAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherExpenseAccountIDs + ",")
            //, paraGetPrintedData.pBranchIDList == "0" ? "," : ("," + paraGetPrintedData.pBranchIDList + ",")
            , paraGetPrintedData.pCostCenterIDList == "" ? "0" : ("," + paraGetPrintedData.pCostCenterIDList + ",")
            , paraGetPrintedData.pLanguage == "ar" ? true : false
            , paraGetPrintedData.pCurrencyID// == "" ? "0" : ("," + paraGetPrintedData.pCurrencyID + ",")
            , paraGetPrintedData.pSeeingInvisibleAccounts
            );
            }
            else
            {
                if(paraGetPrintedData.pIsOperationDate)
                {
                    checkException = objCvwStructure_Rep_A_IncomeStatementByOperationDate.GetList(
                    DateTime.ParseExact(paraGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , DateTime.ParseExact(paraGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , paraGetPrintedData.pIncomeAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pIncomeAccountIDs + ",")
                    , paraGetPrintedData.pExpenseAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pExpenseAccountIDs + ",")
                    , paraGetPrintedData.pOtherIncomeAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
                    , paraGetPrintedData.pOtherExpenseAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherExpenseAccountIDs + ",")
                    //, paraGetPrintedData.pBranchIDList == "0" ? "," : ("," + paraGetPrintedData.pBranchIDList + ",")
                    , paraGetPrintedData.pLanguage == "ar" ? true : false
                    , "," + paraGetPrintedData.pBranche_IDs + ","
                    , paraGetPrintedData.pSeeingInvisibleAccounts);
                }
                else if (paraGetPrintedData.pIsInvoiceDate)
                {
                    checkException = objCvwStructure_Rep_A_IncomeStatementByInvoiceDate.GetList(
                        DateTime.ParseExact(paraGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(paraGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , paraGetPrintedData.pIncomeAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pIncomeAccountIDs + ",")
                        , paraGetPrintedData.pExpenseAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pExpenseAccountIDs + ",")
                        , paraGetPrintedData.pOtherIncomeAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
                        , paraGetPrintedData.pOtherExpenseAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherExpenseAccountIDs + ",")
                        //, paraGetPrintedData.pBranchIDList == "0" ? "," : ("," + paraGetPrintedData.pBranchIDList + ",")
                        , paraGetPrintedData.pLanguage == "ar" ? true : false
                        , "," + paraGetPrintedData.pBranche_IDs + ","
                        , paraGetPrintedData.pSeeingInvisibleAccounts);
                }
                else if (paraGetPrintedData.pIsByDetails)
                {
                    checkException = objCRep_A_IncomeStatementMonth_NileLogistics.GetListByMonth(
                        DateTime.ParseExact(paraGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(paraGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , paraGetPrintedData.pIncomeAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pIncomeAccountIDs + ",")
                        , paraGetPrintedData.pExpenseAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pExpenseAccountIDs + ",")
                        , paraGetPrintedData.pOtherIncomeAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
                        , paraGetPrintedData.pOtherExpenseAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherExpenseAccountIDs + ",")
                        , paraGetPrintedData.pHideProfitLossJV);
                }
                else
                {

                    checkException = objCvwStructure_Rep_A_IncomeStatement.GetList(
                        DateTime.ParseExact(paraGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(paraGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , paraGetPrintedData.pIncomeAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pIncomeAccountIDs + ",")
                        , paraGetPrintedData.pExpenseAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pExpenseAccountIDs + ",")
                        , paraGetPrintedData.pOtherIncomeAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
                        , paraGetPrintedData.pOtherExpenseAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherExpenseAccountIDs + ",")
                        //, paraGetPrintedData.pBranchIDList == "0" ? "," : ("," + paraGetPrintedData.pBranchIDList + ",")
                        , paraGetPrintedData.pLanguage == "ar" ? true : false
                        , "," + paraGetPrintedData.pBranche_IDs + ","
                        , paraGetPrintedData.pSeeingInvisibleAccounts
                        , paraGetPrintedData.pHideProfitLossJV
                        );
                }


                checkException = objCvwStructure_Rep_A_IncomeStatementByCurrency.GetListByCurrency(
               DateTime.ParseExact(paraGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
               , DateTime.ParseExact(paraGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
               , paraGetPrintedData.pIncomeAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pIncomeAccountIDs + ",")
               , paraGetPrintedData.pExpenseAccountIDs == "0" ? "-1" : ("," + paraGetPrintedData.pExpenseAccountIDs + ",")
               , paraGetPrintedData.pOtherIncomeAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
               , paraGetPrintedData.pOtherExpenseAccountIDs == "0" ? "," : ("," + paraGetPrintedData.pOtherExpenseAccountIDs + ",")
               //, paraGetPrintedData.pBranchIDList == "0" ? "," : ("," + paraGetPrintedData.pBranchIDList + ",")
               , paraGetPrintedData.pLanguage == "ar" ? true : false
               , paraGetPrintedData.pCurrencyID
               , paraGetPrintedData.pSeeingInvisibleAccounts
               );
            }
            //var vwA_IncomeStatement = ObjCVarvwA_IncomeStatementByCostCenter.lstCVarvwA_IncomeStatementByCostCenter.OrderBy(x => x.CostCenter_ID).ToList();
            //var noticesGrouped = ObjCVarvwA_IncomeStatementByCostCenter.lstCVarvwA_IncomeStatementByCostCenter.GroupBy(n => n.CostCenter_ID).
            //         Select(group =>
            //             new
            //             {
            //                 CostCenterKey = group.Key,
            //                 CostCenterNotices = group.ToList(),
            //                 CostCenterCount = group.Count()
            //             });

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                ,paraGetPrintedData.pCostCenterIDList != "" ? serializer.Serialize(ObjCVarvwA_IncomeStatementByCostCenter.lstCVarvwA_IncomeStatementByCostCenter)
                : 
                (
                paraGetPrintedData.pIsOperationDate ? 
                serializer.Serialize(objCvwStructure_Rep_A_IncomeStatementByOperationDate.lstCVarvwStructure_Rep_A_IncomeStatementByOperationDate)
               : (paraGetPrintedData.pIsInvoiceDate ? serializer.Serialize(objCvwStructure_Rep_A_IncomeStatementByInvoiceDate.lstCVarvwStructure_Rep_A_IncomeStatementByInvoiceDate)
                 : paraGetPrintedData.pIsByDetails ?   serializer.Serialize(objCRep_A_IncomeStatementMonth_NileLogistics.lstCVarRep_A_IncomeStatementMonth_NileLogistics)
                 :  serializer.Serialize(objCvwStructure_Rep_A_IncomeStatement.lstCVarvwStructure_Rep_A_IncomeStatement
               ))
                
                )//pIncomeStatement = pData[1]

                
                ,paraGetPrintedData.pCostCenterIDList != "" ? serializer.Serialize(ObjCVarvwA_IncomeStatementByCostCenterByCurrency.lstCVarvwA_IncomeStatementByCostCenter)
                : serializer.Serialize(objCvwStructure_Rep_A_IncomeStatementByCurrency.lstCVarvwStructure_Rep_A_IncomeStatement) //pIncomeStatement = pData[1]

                /*: "0" */// 9  pIncomeStatement = pData[]
                //,serializer.Serialize(vwA_IncomeStatement)
                //,serializer.Serialize(noticesGrouped)
            };
        }
        public Object[] GetPrintedDataByMonth(string pFromDate, string pToDate, string pIncomeAccountIDs
    , string pExpenseAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpenseAccountIDs, bool pWithSubAccounts
            , bool pHideProfitLossJV , bool pIsInvoiceDate)
        {

            //  var ReportNo = pReportNo.Trim();
            bool pRecordsExist = false;
            Exception checkException = null;
            //******
            var ReportDate = new List<CVarRep_A_IncomeStatementMonth>();
            //******
            var HTMLTableRows = "";
            List<string> tbls = new List<string>();

            CRep_A_IncomeStatementMonth objCvwStructure_Rep_A_IncomeStatement = new CRep_A_IncomeStatementMonth();


            if(pIsInvoiceDate)
                checkException = objCvwStructure_Rep_A_IncomeStatement.GetListByMonthAndInvoiceDate(
                    DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , "," + pIncomeAccountIDs + ","
                    , "," + pExpenseAccountIDs + ","
                    , pOtherIncomeAccountIDs == null ? "," : ("," + pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
                    , pOtherExpenseAccountIDs == null ? "," : ("," + pOtherExpenseAccountIDs + ",")
                    , pHideProfitLossJV

                     );
            else

                checkException = objCvwStructure_Rep_A_IncomeStatement.GetListByMonth(
                        DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , "," + pIncomeAccountIDs + ","
                        , "," + pExpenseAccountIDs + ","
                        , pOtherIncomeAccountIDs == null ? "," : ("," + pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
                        , pOtherExpenseAccountIDs == null ? "," : ("," + pOtherExpenseAccountIDs + ",")
                        ,pHideProfitLossJV
        );





            


            if (objCvwStructure_Rep_A_IncomeStatement.lstCVarRep_A_IncomeStatementMonth.Count > 0 && checkException == null)
            {
                pRecordsExist = true;
                ReportDate = objCvwStructure_Rep_A_IncomeStatement.lstCVarRep_A_IncomeStatementMonth.ToList();

                //List<string> Currencies = ReportDate.DistinctBy(y => y.Account_Name).ToList().Select(x => x.CurrencyCode).ToList();
                // Currencies = Currencies.DistinctBy(x => x).ToList();

                var pivotTable = ReportDate.OrderBy(y => y.Type).ToPivotTable(
                item => item.Month,
                item => item.Account_Name,

                items => items.Sum(x => x.mValue));
                tbls.Add(GetHTMLTableContainsWithFontSize_Customized(pivotTable, "", "Income Statement By ActivityCenter", false, false, false, "13px", ReportDate, false
                    ,      DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)));

                ReportDate = null;

            }


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { pRecordsExist,
                serializer.Serialize(ReportDate)
                , serializer.Serialize(tbls)

            };

        }


        private static string GetHTMLTableContainsWithFontSize_Customized(DataTable datasource, string RowsColumnTitle, string TableTitle, bool HasHorizontalTotal /*-*/, bool HasVerticalTotal /*|*/, bool HasPercantage, string FontSize /*"50px"*/, List<CVarRep_A_IncomeStatementMonth> ReportData, bool IsLocal,DateTime FromDate,DateTime ToDate)
        {
            int Type1 = 0;
            int Type2 = 0;
            int Type3 = 0;
            int Type4 = 0;
            var tr = "";
            List<DataRow> list = new List<DataRow>();
            //if (datasource.Count > 0)
            //{

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
            int Flag1 = 0;
            int Flag2 = 0;
            int Flag3 = 0;
            int Flag4 = 0;

            int isFlag1 = 0;
            int isFlag2 = 0;
            int isFlag3 = 0;
            int isFlag4 = 0;

            decimal TotalFlag1 = 0.0M;
            decimal TotalFlag2 = 0.0M;
            decimal TotalFlag3 = 0.0M;
            decimal TotalFlag4 = 0.0M;



            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            #region TableHeader

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@ Table Header @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            // tr = tr + "<thead><tr style= \"\"><td colspan=\"" + (columnNames.Length + 9) + "\" class=\"text-center\" style= \"border-top-color:white!important;border-left-color:white!important;border-right-color:white!important;border-top-color:right!important;\"><h3> " + TableTitle + " </h3></td></tr></thead> " + " ";
            tr = tr + "              <thead>" + " ";
            tr = tr + "              <tr>" + " ";

            for (int i = 0; i < columnNames.Length; i++)
            {

                if (i == 0)
                {
                    tr = tr + "    <th  style= \"text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Type" + "</th>";
                    tr = tr + "    <th  style= \"text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Account_Name" + "</th>";


                }
                else
                {
                    try
                    {
                        tr = tr + "    <th  style= \"text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">[" + (Convert.ToDateTime(columnNames[i])).Day + "-" + (Convert.ToDateTime(columnNames[i])).Month + "]</th>";
                    }
                    catch
                    {
                        tr = tr + "    <th  style= \"text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + columnNames[i] + "</th>";

                    }

                }
            }
            //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            tr = tr + "    <th  style= \"text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Total" + "</th>";
            //tr = tr + "    <th  style= \"text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Total Items" + "</th>";
            //tr = tr + "    <th  style= \"text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + "Total Expenses" + "</th>";
            //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

            if (HasVerticalTotal)
                tr = tr + "    <th  style= \"text-align:center; border-bottom-width:3px!important; font-size:" + FontSize + "; line-height:2!important;\">" + "TOTAL" + "</th>";

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

            Type1 = 0;
            Type2 = 0;
            Type3 = 0;
            Type4 = 0;
            decimal TotalNetProfit = 0;
            DataTable dtTotalProfit = new DataTable();
            dtTotalProfit.Columns.Add("Index", typeof(String));
            dtTotalProfit.Columns.Add("Type",typeof(String));
            dtTotalProfit.Columns.Add("Value", typeof(Decimal));


            for (int i = 0; i < list.Count; i++) // ** each rows   // ** ItemArray[j] : row cell with it index
            {
                rowtitle = Convert.ToString(list[i].ItemArray[0]);
                var Counter = ReportData.FirstOrDefault(x => x.Account_Name == rowtitle);
                if (Counter.Flag == 1)
                {
                    Type1++;
                }
                else if (Counter.Flag == 2)
                {
                    Type2++;
                }
                else if (Counter.Flag == 3)
                {
                    Type3++;
                }
                else if (Counter.Flag == 4)
                {
                    Type4++;
                }
            }


            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Body @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            for (int i = 0; i < list.Count; i++) // ** each rows   // ** ItemArray[j] : row cell with it index
            {

                rowtitle = Convert.ToString(list[i].ItemArray[0]);
                var Item2 = ReportData.Count(x => x.Flag == 1);
                var Item = ReportData.FirstOrDefault(x => x.Account_Name == rowtitle);
                string link = "";

                if (Item.Account_ID != 0)
                    link = " <a href =  \"#\" onclick = \"AccountLedger_Print(" + Item.Account_ID + ",'"+ FromDate.ToString("dd/MM/yyyy") +"','" +ToDate.ToString("dd/MM/yyyy")+"','"+ rowtitle + "');\" ><span>" + rowtitle + "</span></a>";



                Flag1 += ((Item.Flag == 1) ? 1 : 0);
                Flag2 += ((Item.Flag == 2) ? 1 : 0);
                Flag3 += ((Item.Flag == 3) ? 1 : 0);
                Flag4 += ((Item.Flag == 4) ? 1 : 0);

                //fill totals types
                //TotalFlag1 += (Item.Flag == 1) ? Item.Value : 0;
                //TotalFlag2 += (Item.Flag == 2) ? Item.Value : 0;
                //TotalFlag3 += (Item.Flag == 3) ? Item.Value : 0;
                //TotalFlag4 += (Item.Flag == 4) ? Item.Value : 0;



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
                                try
                                {
                                    TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                                }
                                catch
                                {
                                    TotalOfColumns.Add(0);
                                    TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                                }


                            }

                            string pValue = Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##");

                            Int32 pMonth = Convert.ToInt32( columnNames[j]);
                            Int32 pYear = FromDate.Year;

                            DateTime first = new DateTime(pYear, pMonth, 1);
                            DateTime last = first.AddMonths(1).AddSeconds(-1);

                            string LinkMonth=  " <a href =  \"#\" onclick = \"AccountLedger_Print(" + Item.Account_ID + ",'" + first.ToString("dd/MM/yyyy") + "','" + last.ToString("dd/MM/yyyy") + "','" + pValue + "');\" ><span>" + pValue + "</span></a>";
                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:" + FontSize + ";\">" + LinkMonth + "</td> ";
                            //   tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:" + FontSize + ";\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";

                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));
                            //  }
                            if (j == (list[i].ItemArray.Length - 1))
                            {
                                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalOfRows) : TotalOfRows).ToString("0.##") + "</b> </td> ";
                                // tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount).ToString("0.##") + "</b> </td> ";
                                //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount).ToString("0.##") + "</b> </td> ";

                                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                //TotalTaxes += (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount);
                                TotalServices += (IsLocal ? (Item.Value) : Item.Value);
                                TotalFlag1 += (Item.Flag == 1) ? TotalOfRows : 0;
                                TotalFlag2 += (Item.Flag == 2) ? TotalOfRows : 0;
                                TotalFlag3 += (Item.Flag == 3) ? TotalOfRows : 0;
                                TotalFlag4 += (Item.Flag == 4) ? TotalOfRows : 0;
                                //TotalItems += (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount);
                                //TotalExpenses += (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount);
                                //TotalDiscount += (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount);
                                //TotalInvoices += (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice);
                            }

                        }
                        else
                        {
                            //  rowtitle = Convert.ToString(list[i].ItemArray[j]);

                            //xxxxxxxxxxxxxxxxxxxxxxxxxx static td xxx get by title xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                            //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.Type.ToString("dd/MM/yyyy") + "</b> </td> ";
                            tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.Type + "</b> </td> ";
                            //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                            tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\">" + link + " </td> "; // InvNo //    tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + rowtitle + "</b> </td> "; // InvNo
                        }


                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;
                    //tr = tr + "</thead>" + " ";

                }
                else if ((i + 1) == list.Count) // ** last row of data
                {

                    //here
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

                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));
                            if (j == (list[i].ItemArray.Length - 1))
                            {
                                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalOfRows) : TotalOfRows).ToString("0.##") + "</b> </td> ";
                                //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount).ToString("0.##") + "</b> </td> ";
                                // tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount).ToString("0.##") + "</b> </td> ";
                                //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount).ToString("0.##") + "</b> </td> ";
                                //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount).ToString("0.##") + "</b> </td> ";
                                //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice).ToString("0.##") + "</b> </td> ";
                                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                //TotalTaxes += (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount);
                                TotalServices += (IsLocal ? (Item.Value) : Item.Value);
                                TotalFlag1 += (Item.Flag == 1) ? TotalOfRows : 0;
                                TotalFlag2 += (Item.Flag == 2) ? TotalOfRows : 0;
                                TotalFlag3 += (Item.Flag == 3) ? TotalOfRows : 0;
                                TotalFlag4 += (Item.Flag == 4) ? TotalOfRows : 0;
                                //TotalItems += (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount);
                                //TotalExpenses += (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount);
                                //TotalDiscount += (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount);
                                //TotalInvoices += (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice);
                            }

                            // }


                        }
                        else
                        {

                            //xxxxxxxxxxxxxxxxxxxxxxxxxx static td xxx get by title xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


                            // tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.InvoiceDate.ToString("dd/MM/yyyy") + "</b> </td> ";
                            tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.Type + "</b> </td> ";
                            //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

                            tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\">" + link + " </td> "; //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";> " + rowtitle + "</td> ";



                        }

                        //  tr = tr + " <td> " + list[i].ItemArray[j] + " </td> ";
                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;



                    //here
                    if (Flag1 > 0 && Type1 > 0 && isFlag1 == 0 && Flag1 == Type1)
                    {
                        isFlag1 = 1;
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";

                        // tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + "" + "</b> </td> ";

                        tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + "Total Business Revenues" + "</b> </td> ";

                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {


                            if (j == 0)
                            {

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                TotalNetProfit += Convert.ToDecimal(TotalOfColumns[j - 1]);
                                DataRow drNewRow = dtTotalProfit.NewRow();
                                drNewRow["Index"] = j - 1;
                                drNewRow["Type"] = 1;
                                drNewRow["Value"] = Convert.ToDecimal(TotalOfColumns[j - 1]);
                                dtTotalProfit.Rows.Add(drNewRow);
                                TotalOfColumns[j - 1] = 0;
                            }
                        }


                        tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag1) : TotalFlag1).ToString("0.##") + "</b> </td> ";
                        tr = tr + "</tr>" + " ";

                    }
                    else if (Flag2 > 0 && Type2 > 0 && isFlag2 == 0 && Flag2 == Type2)
                    {
                        isFlag2 = 1;
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";
                        //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + "" + "</b> </td> ";

                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Total Cost Of Business Revenues	" + "</b> </td> ";

                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                TotalNetProfit -= Convert.ToDecimal(TotalOfColumns[j - 1]);
                                DataRow drNewRow = dtTotalProfit.NewRow();
                                drNewRow["Index"] = j - 1;
                                drNewRow["Type"] = 2;
                                drNewRow["Value"] = Convert.ToDecimal(TotalOfColumns[j - 1]);
                                dtTotalProfit.Rows.Add(drNewRow);
                                TotalOfColumns[j - 1] = 0;
                            }
                        }


                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag2) : TotalFlag2).ToString("0.##") + "</b> </td> ";

                        tr = tr + "</tr>" + " ";


                        //GROSS PROFIT
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";

                        tr = tr + " <td style = \"border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Gross Profit" + "</b> </td> ";
                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                // tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";

                            }
                        }
                        tr = tr + " <td style = \"border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag1 - TotalFlag2) : TotalFlag1 - TotalFlag2).ToString("0.##") + "</b> </td> ";

                        tr = tr + "</tr>" + " ";

                    }
                    else if (Flag3 > 0 && Type3 > 0 && isFlag3 == 0 && Flag3 == Type3)
                    {
                        isFlag3 = 1;
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";

                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Total Other Revenues	" + "</b> </td> ";

                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                TotalNetProfit += Convert.ToDecimal(TotalOfColumns[j - 1]);
                                DataRow drNewRow = dtTotalProfit.NewRow();
                                drNewRow["Index"] = j - 1;
                                drNewRow["Type"] = 3;
                                drNewRow["Value"] = Convert.ToDecimal(TotalOfColumns[j - 1]);
                                dtTotalProfit.Rows.Add(drNewRow);
                                TotalOfColumns[j - 1] = 0;
                            }
                        }



                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag3) : TotalFlag3).ToString("0.##") + "</b> </td> ";

                        tr = tr + "</tr>" + " ";

                    }
                    else if (Flag4 > 0 && Type4 > 0 && isFlag4 == 0 && Flag4 == Type4)
                    {
                        isFlag4 = 1;
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";

                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Total General Expenses	" + "</b> </td> ";

                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                TotalNetProfit -= Convert.ToDecimal(TotalOfColumns[j - 1]);
                                DataRow drNewRow = dtTotalProfit.NewRow();
                                drNewRow["Index"] = j - 1;
                                drNewRow["Type"] = 4;
                                drNewRow["Value"] = Convert.ToDecimal(TotalOfColumns[j - 1]);
                                dtTotalProfit.Rows.Add(drNewRow);
                                TotalOfColumns[j - 1] = 0;
                            }
                        }



                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag4) : TotalFlag4).ToString("0.##") + "</b> </td> ";

                        tr = tr + "</tr>" + " ";

                    }
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
                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));

                            if (j == (list[i].ItemArray.Length - 1))
                            {
                                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalOfRows) : TotalOfRows).ToString("0.##") + "</b> </td> ";
                                // tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount).ToString("0.##") + "</b> </td> ";
                                //  tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount).ToString("0.##") + "</b> </td> ";
                                //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount).ToString("0.##") + "</b> </td> ";
                                //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount).ToString("0.##") + "</b> </td> ";
                                //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice).ToString("0.##") + "</b> </td> ";
                                //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                //TotalTaxes += (IsLocal ? (Item.TaxesAmount * Item.ExchangeRate) : Item.TaxesAmount);
                                TotalServices += (IsLocal ? (Item.Value) : Item.Value);
                                TotalFlag1 += (Item.Flag == 1) ? TotalOfRows : 0;
                                TotalFlag2 += (Item.Flag == 2) ? TotalOfRows : 0;
                                TotalFlag3 += (Item.Flag == 3) ? TotalOfRows : 0;
                                TotalFlag4 += (Item.Flag == 4) ? TotalOfRows : 0;
                                //TotalItems += (IsLocal ? (Item.ItemsAmount * Item.ExchangeRate) : Item.ItemsAmount);
                                //TotalExpenses += (IsLocal ? (Item.ExpensesAmount * Item.ExchangeRate) : Item.ExpensesAmount);
                                //TotalDiscount += (IsLocal ? (Item.Discount * Item.ExchangeRate) : Item.Discount);
                                //TotalInvoices += (IsLocal ? (Item.TotalPrice * Item.ExchangeRate) : Item.TotalPrice);
                            }



                        }
                        else
                        {
                            // rowtitle = Convert.ToString(list[i].ItemArray[j]);
                            //xxxxxxxxxxxxxxxxxxxxxxxxxx static td xxx get by title xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                            //  tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.InvoiceDate.ToString("dd/MM/yyyy") + "</b> </td> ";
                            tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + Item.Type + "</b> </td> ";
                            //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

                            tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\">" + link + " </td> "; //tr = tr + " <td style = \"text-align:center;font-size:" + FontSize + ";\"><b> " + rowtitle + "</b> </td> ";


                        }
                        //br += Item.Flag;
                        // tr = tr + " <td style = \"text-align:center;font-size:"+FontSize+";\"> " + list[i].ItemArray[j] + " </td> ";
                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;

                    //here
                    if (Flag1 > 0 && Type1 > 0 && isFlag1 == 0 && Flag1 == Type1)
                    {
                        isFlag1 = 1;
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";

                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Total Business Revenues" + "</b> </td> ";

                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                TotalNetProfit += Convert.ToDecimal(TotalOfColumns[j - 1]);
                                DataRow drNewRow = dtTotalProfit.NewRow();
                                drNewRow["Index"] = j - 1;
                                drNewRow["Type"] = 1;
                                drNewRow["Value"] = Convert.ToDecimal(TotalOfColumns[j - 1]);
                                dtTotalProfit.Rows.Add(drNewRow);
                                TotalOfColumns[j - 1] = 0;
                            }
                        }



                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag1) : TotalFlag1).ToString("0.##") + "</b> </td> ";
                        tr = tr + "</tr>" + " ";

                    }
                    else if (Flag2 > 0 && Type2 > 0 && isFlag2 == 0 && Flag2 == Type2)
                    {
                        isFlag2 = 1;
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";

                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Total Cost Of Business Revenues	" + "</b> </td> ";

                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                TotalNetProfit -= Convert.ToDecimal(TotalOfColumns[j - 1]);
                                DataRow drNewRow = dtTotalProfit.NewRow();
                                drNewRow["Index"] = j - 1;
                                drNewRow["Type"] = 2;
                                drNewRow["Value"] = Convert.ToDecimal(TotalOfColumns[j - 1]);
                                dtTotalProfit.Rows.Add(drNewRow);
                                TotalOfColumns[j - 1] = 0;
                            }
                        }



                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag2) : TotalFlag2).ToString("0.##") + "</b> </td> ";

                        tr = tr + "</tr>" + " ";

                        //GROSS PROFIT
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";

                        tr = tr + " <td style = \"border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Gross Profit" + "</b> </td> ";
                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                // tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";

                            }
                        }
                        tr = tr + " <td style = \"border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag1 - TotalFlag2) : TotalFlag1 - TotalFlag2).ToString("0.##") + "</b> </td> ";

                        tr = tr + "</tr>" + " ";

                    }
                    else if (Flag3 > 0 && Type3 > 0 && isFlag3 == 0 && Flag3 == Type3)
                    {
                        isFlag3 = 1;
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";

                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Total Other Revenues	" + "</b> </td> ";

                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                               // tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                TotalNetProfit += Convert.ToDecimal(TotalOfColumns[j - 1]);
                                DataRow drNewRow = dtTotalProfit.NewRow();
                                drNewRow["Index"] = j - 1;
                                drNewRow["Type"] = 3;
                                drNewRow["Value"] = Convert.ToDecimal(TotalOfColumns[j - 1]);
                                dtTotalProfit.Rows.Add(drNewRow);
                                TotalOfColumns[j - 1] = 0;
                            }
                        }



                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag3) : TotalFlag3).ToString("0.##") + "</b> </td> ";

                        tr = tr + "</tr>" + " ";

                    }
                    else if (Flag4 > 0 && Type4 > 0 && isFlag4 == 0 && Flag4 == Type4)
                    {
                        isFlag4 = 1;
                        tr = tr + "              <tr class=\"trcombat\" >" + " ";

                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Total General Expenses	" + "</b> </td> ";

                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            }
                            else
                            {

                                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                TotalNetProfit -= Convert.ToDecimal(TotalOfColumns[j - 1]);
                                DataRow drNewRow = dtTotalProfit.NewRow();
                                drNewRow["Index"] = j - 1;
                                drNewRow["Type"] = 4;
                                drNewRow["Value"] = Convert.ToDecimal(TotalOfColumns[j - 1]);
                                dtTotalProfit.Rows.Add(drNewRow);
                                TotalOfColumns[j - 1] = 0;
                            }
                        }



                        tr = tr + " <td style = \" border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + (IsLocal ? (TotalFlag4) : TotalFlag4).ToString("0.##") + "</b> </td> ";

                        tr = tr + "</tr>" + " ";

                    }
                }
                // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Fill Total Summary @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                if ((i + 1) == list.Count) // ** if last row >> add total row
                {
                    //************** Total *********************

                    //NET PrOFIT

                    //GROSS PROFIT
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    tr = tr + " <td style = \"border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + "Net Profit" + "</b> </td> ";
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j == 0)
                        {
                            tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                        }
                        else
                        {

                            //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                            //if(dtTotalProfit.Rows.Count> 0)
                            // TotalNetProfit = Convert.ToDecimal(dtTotalProfit.Compute("SUM(Value)", "Index = " + (j-1 ).ToString()+ " and Type in(1,3) ") ) - Convert.ToDecimal(dtTotalProfit.Compute("SUM(Value)", "Index = " + (j - 1).ToString() + " and Type in(2,4) "));
                            decimal GetSafeSum(DataTable dt, string expression, string filter)
                            {
                                object result = dt.Compute(expression, filter);
                                return (result == DBNull.Value || result == null) ? 0m : Convert.ToDecimal(result);
                            }

                            // Usage
                            decimal positive = GetSafeSum(dtTotalProfit, "SUM(Value)", "Index = " + (j - 1).ToString() + " and Type in(1,3)");
                            decimal negative = GetSafeSum(dtTotalProfit, "SUM(Value)", "Index = " + (j - 1).ToString() + " and Type in(2,4)");

                            TotalNetProfit = positive - negative;

                            tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalNetProfit.ToString("0.##") + "</b></td> ";
                            TotalNetProfit = 0;

                        }
                    }
                    tr = tr + " <td style = \"border-top-width:3px!important;text-align:center;font-size:" + FontSize + ";\"><b> " + ((TotalFlag1 - TotalFlag2 - TotalFlag4) + TotalFlag3).ToString("0.##") + "</b> </td> ";

                    tr = tr + "</tr>" + " ";
                    /////
                    if (HasHorizontalTotal)
                    {
                        tr = tr + " <tr>";
                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {

                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                                //xxxxxxxxxxxxxxxxxxx
                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "Total" + "</b></td> ";
                                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "" + "</b></td> ";
                                //xxxxxxxxxxxxxxxxxx
                            }
                            else
                            {


                                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";
                                if (j == (list[i].ItemArray.Length - 1))
                                {
                                    //xxxxxxxxxxxxxxxxxxxx
                                    tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalAll.ToString("0.##") + "</b></td> ";
                                    //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalItems.ToString("0.##") + "</b></td> ";
                                    //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalExpenses.ToString("0.##") + "</b></td> ";
                                    //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalTaxes.ToString("0.##") + "</b></td> ";
                                    //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalDiscount.ToString("0.##") + "</b></td> ";
                                    //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalInvoices.ToString("0.##") + "</b></td> ";
                                    ////xxxxxxxxxxxxxxxxxxx
                                }
                            }
                        }
                        //  tr = tr + " <td  style= \"font-size:"+FontSize+";border-top-width:3px!important; border-top-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + "ALL ROOM" + "%</b></td> ";
                        if (HasVerticalTotal)
                            tr = tr + " <td  style= \"font-size:" + FontSize + ";border-top-width:3px!important; border-top-color:black!important;border-right-width:3px!important; border-right-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + " " + "</b></td> ";
                        tr = tr + "</tr>";


                    }


                    //--------------------
                    tr = tr + "</tbody>" + " ";
                }

                //if(br == 1 && br2 ==2)
                //{
                //    tr = tr + " <tr>";


                //            tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b></b>" + " </td> ";
                //            //xxxxxxxxxxxxxxxxxxx
                //            tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "Total" + "</b></td> ";
                //            tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "" + "</b></td> ";
                //            //xxxxxxxxxxxxxxxxxx

                //                //xxxxxxxxxxxxxxxxxxxx
                //                tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalServices.ToString("0.##") + "</b></td> ";
                //                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalItems.ToString("0.##") + "</b></td> ";
                //                // tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalExpenses.ToString("0.##") + "</b></td> ";
                //                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalTaxes.ToString("0.##") + "</b></td> ";
                //                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalDiscount.ToString("0.##") + "</b></td> ";
                //                //tr = tr + " <td  style= \" border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + TotalInvoices.ToString("0.##") + "</b></td> ";
                //                //xxxxxxxxxxxxxxxxxxx


                //    //  tr = tr + " <td  style= \"font-size:"+FontSize+";border-top-width:3px!important; border-top-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + "ALL ROOM" + "%</b></td> ";
                //        tr = tr + "</tr>";
                //}



            }






            // }
            return tr;
        }
        private static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }
        public static DataTable GetInversedDataTable(DataTable table, string columnX,
     string columnY, string columnY2, string columnZ, string nullValue, bool sumValues)
        {
            //Create a DataTable to Return
            DataTable returnTable = new DataTable();

            if (columnX == "")
                columnX = table.Columns[0].ColumnName;

            //Add a Column at the beginning of the table
            returnTable.Columns.Add(columnY);
            returnTable.Columns.Add(columnY2);

            DataView view = new DataView(table);
            DataTable distinctValues = view.ToTable(true, columnY, columnY2);

            //Read all DISTINCT values from columnX Column in the provided DataTale
            List<string> columnXValues = new List<string>();



            foreach (DataRow dr in table.Rows)
            {
                string columnXTemp = dr[columnX].ToString();
                if (!columnXValues.Contains(columnXTemp))
                {
                    //Read each row value, if it's different from others provided, add to 
                    //the list of values and creates a new Column with its value.
                    columnXValues.Add(columnXTemp);
                    returnTable.Columns.Add(columnXTemp);
                }
            }

            //Verify if Y and Z Axis columns re provided
            if (columnY != "" && columnZ != "")
            {
                //Read DISTINCT Values for Y Axis Column
                List<string> columnYValues = new List<string>();

                foreach (DataRow dr in table.Rows)
                {
                    if (!columnYValues.Contains(dr[columnY].ToString()))
                        columnYValues.Add(dr[columnY].ToString());
                }

                List<string> columnY2Values = new List<string>();
                foreach (DataRow dr in table.Rows)
                {
                    if (!columnY2Values.Contains(dr[columnY2].ToString()))
                        columnY2Values.Add(dr[columnY2].ToString());
                }

                for (int k = 0; k < distinctValues.Rows.Count; k++)
                {
                    DataRow drReturn = returnTable.NewRow();
                    drReturn[0] = distinctValues.Rows[k][columnY];
                    drReturn[1] = distinctValues.Rows[k][columnY2];

                    DataRow[] rows = table.Select(columnY + "='" + drReturn[0] + "' AND " + columnY2 + "='" + drReturn[1] + "'");

                    foreach (DataRow dr in rows)
                    {
                        string rowColumnTitle = dr[columnX].ToString();

                        //Read each column to fill the DataTable
                        foreach (DataColumn dc in returnTable.Columns)
                        {
                            if (dc.ColumnName == rowColumnTitle)
                            {
                                drReturn[rowColumnTitle] = dr[columnZ];
                            }
                        }
                    }
                    returnTable.Rows.Add(drReturn);
                }
                ////Loop all Column Y Distinct Value
                //foreach (string columnYValue in columnYValues)
                //{
                //    //Creates a new Row
                //    DataRow drReturn = returnTable.NewRow();
                //    drReturn[0] = columnYValue;
                //    //foreach column Y value, The rows are selected distincted
                //    DataRow[] rows = table.Select(columnY + "='" + columnYValue + "'" );

                //    //Read each row to fill the DataTable
                //    foreach (DataRow dr in rows)
                //    {
                //        string rowColumnTitle = dr[columnX].ToString();

                //        //Read each column to fill the DataTable
                //        foreach (DataColumn dc in returnTable.Columns)
                //        {
                //            if (dc.ColumnName == rowColumnTitle)
                //            {
                //                //If Sum of Values is True it try to perform a Sum
                //                //If sum is not possible due to value types, the value 
                //                // displayed is the last one read
                //                if (sumValues)
                //                {
                //                    try
                //                    {
                //                        drReturn[rowColumnTitle] =
                //                             Convert.ToDecimal(drReturn[rowColumnTitle]) +
                //                             Convert.ToDecimal(dr[columnZ]);
                //                    }
                //                    catch
                //                    {
                //                        drReturn[rowColumnTitle] = dr[columnZ];
                //                    }
                //                }
                //                else
                //                {
                //                    drReturn[rowColumnTitle] = dr[columnZ];
                //                }
                //            }
                //        }
                //    }
                //    returnTable.Rows.Add(drReturn);
                //}
            }
            else
            {
                throw new Exception("The columns to perform inversion are not provided");
            }

            //if a nullValue is provided, fill the datable with it
            if (nullValue != "")
            {
                foreach (DataRow dr in returnTable.Rows)
                {
                    foreach (DataColumn dc in returnTable.Columns)
                    {
                        if (dr[dc.ColumnName].ToString() == "")
                            dr[dc.ColumnName] = nullValue;
                    }
                }
            }

            return returnTable;
        }

        //    public object[] GetPrintedDataByCostCenter(string pFromDate, string pToDate, string pIncomeAccountIDs
        //        , string pExpenseAccountIDs, string pOtherIncomeAccountIDs, string pOtherExpenseAccountIDs, string pCostCenterIDList, string pLanguage)
        //    {
        //        Exception checkException = null;
        //        //CDefaults objCDefaults = new CDefaults();
        //        //objCDefaults.GetList("WHERE 1=1");
        //        CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
        //        objCvwRptHeaderDefaultTable.GetList("WHERE 1=1");
        //        CvwA_IncomeStatementByCostCenter objCvwStructure_Rep_A_IncomeStatement = new CvwA_IncomeStatementByCostCenter();
        //        checkException = objCvwStructure_Rep_A_IncomeStatement.GetList(
        //                DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
        //                , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
        //                , "," + pIncomeAccountIDs + ","
        //                , "," + pExpenseAccountIDs + ","
        //                , pOtherIncomeAccountIDs == null ? "," : ("," + pOtherIncomeAccountIDs + ",") //i added condition coz it might be empty
        //                , pOtherExpenseAccountIDs == null ? "," : ("," + pOtherExpenseAccountIDs + ",")
        //                , "," + pCostCenterIDList + ","
        //                , pLanguage == "ar" ? true : false
        //                );
        //        var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

        //        return new object[] {
        //            //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
        //            new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
        //            , serializer.Serialize(objCvwStructure_Rep_A_IncomeStatement.lstCVarvwA_IncomeStatementByCostCenter) //pIncomeStatement = pData[1]
        //        };
        //    }
        //}

    }
    public class ParaGetPrintedData
    {
        public string pFromDate { get; set; }
        public string pToDate { get; set; }
        public string pIncomeAccountIDs { get; set; }
        public string pExpenseAccountIDs { get; set; }
        public string pOtherIncomeAccountIDs { get; set; }
        public string pOtherExpenseAccountIDs { get; set; }
        public string pCostCenterIDList { get; set; }
        public string pBranche_IDs { get; set; }
        public string pLanguage { get; set; }
        public string pCurrencyID { get; set; }

        public bool pIsOperationDate { get; set; }
        public bool pIsInvoiceDate { get; set; }
        public bool pIsByDetails { get; set; }
        public bool pSeeingInvisibleAccounts { get; set; }

        public bool pHideProfitLossJV { get; set; }
    }
}
