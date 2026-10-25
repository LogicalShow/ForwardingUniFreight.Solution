using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Helpers;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Data;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Reports
{
    public class Rep_A_MonthlyAnalysisController : ApiController
    {
        //[HttpGet, HttpPost]
        //public object[] FillSearchControls()
        //{
        //    int _RowCount = 0;
        //    CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
        //    CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
        //    CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
        //    objCvwA_Accounts.GetListPaging(99999, 1, "WHERE IsMain=1", "Name, Code", out _RowCount);
        //  //  objCA_JournalTypes.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
        //  //  objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=1", "Name", out _RowCount);

        //    return new object[] {
        //        new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
        //        , new JavaScriptSerializer().Serialize(objCA_JournalTypes.lstCVarA_JournalTypes)
        //        , new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
        //    };
        //}

        //public object[] FillSearchControls()

        [HttpGet, HttpPost]
        public object[] FillSearchControls(string WhereCondition)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            objCvwA_Accounts.GetListPaging(99999, 1, WhereCondition, "Name, Code", out _RowCount);

            CvwA_SubAccounts objCvwA_SubAccounts_Groups = new CvwA_SubAccounts();
            string pWhereClause = "";
            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetItem(190);
            if (objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                pWhereClause += @"  cross apply(select distinct p.SubAccountID from vwA_UserSubAccountsGroupsPrivilege P join A_SubAccounts S2 on P.SubAccountID = S2.ID where
                        vwA_SubAccounts.SubAccount_Number like S2.RealSubAccountCode + '%' " + " AND UserID=" + WebSecurity.CurrentUserId + ") as Privilege where IsMain = 1 ";
            }
            else
            {
                pWhereClause = "WHERE IsMain=1 ";
            }
            objCvwA_SubAccounts_Groups.GetListPaging(99999, 1, pWhereClause, "Name", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                   serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
                 , serializer.Serialize(objCvwA_SubAccounts_Groups.lstCVarvwA_SubAccounts)
            };
        }



        //pPostStatus: 0:All 1:Posted 2:Unposted
        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pAccountIDList, string pSubAccountIDList, DateTime pFromDate, DateTime pToDate, bool pIsOperation, bool pIsAccounting, bool pIsComparison,
            int pFirstYear, int pSecondYear)
        {
            Exception checkException = null;
            var PivotTable = new DataTable();
     
            var HTMLTableBody = "";
            if (pIsOperation)
            {
                //CRep_A_MonthlyAnalysis cRep_A_MonthlyAnalysis = new CRep_A_MonthlyAnalysis();
                //checkException = cRep_A_MonthlyAnalysis.GetList(pAccountIDList, pFromDate, pToDate);



                //var ReportData = cRep_A_MonthlyAnalysis.lstCVarRep_A_MonthlyAnalysis.ToList();
                //PivotTable = ReportData.ToPivotTable(item => item.JVDate, item => item.Account_Name, items => items.Any() ? items.Sum(x => x.Balance) : 0);



                //HTMLTableBody = HTMLFunctions.GetHTMLTableContains(PivotTable, "#", "Monthly Analysis", true, true, true);


      

                CRep_A_MonthlyAnalysisAccounting cRep_A_MonthlyAnalysisAccounting = new CRep_A_MonthlyAnalysisAccounting();
                checkException = cRep_A_MonthlyAnalysisAccounting.GetList(pAccountIDList, pFromDate, pToDate);

                var ReportData = cRep_A_MonthlyAnalysisAccounting.lstCVarRep_A_MonthlyAnalysisAccounting.ToList();
                PivotTable = ReportData.ToPivotTable(item => item.JVDate, item => item.Account_Name, items => items.Any() ? items.Sum(x => x.Balance) : 0);

                HTMLTableBody = HTMLFunctions.GetHTMLTableContains(PivotTable, "#", "Monthly Analysis", true, true, true);

                CRep_A_MonthsAnalysisAccounting_Group CRep_A_MonthsAnalysisAccounting_Group = new CRep_A_MonthsAnalysisAccounting_Group();
                checkException = CRep_A_MonthsAnalysisAccounting_Group.GetList(pAccountIDList, pFromDate, pToDate);

                var PivotTable2 = new DataTable();

                var ReportData2 = CRep_A_MonthsAnalysisAccounting_Group.lstCVarRep_A_MonthsAnalysisAccounting_Group.ToList();
                PivotTable2 = ReportData2.ToPivotTable(item => item.JVDate, item => item.Account_Name, items => items.Any() ? items.Sum(x => x.Balance) : 0);

                string HTMLTableBody2 = HTMLFunctions.GetHTMLTableContains(PivotTable2, "#", "", false,true, false);

                int startindex = HTMLTableBody2.IndexOf("</thead>");
                HTMLTableBody2 =  HTMLTableBody2.Substring(startindex, HTMLTableBody2.Length - startindex);

                HTMLTableBody += HTMLTableBody2;

            }
            else if (pIsAccounting)
            {
                CRep_A_MonthlyAnalysisAccounting cRep_A_MonthlyAnalysisAccounting = new CRep_A_MonthlyAnalysisAccounting();
                CRep_A_MonthlyAnalysisSubAccounting cCRep_A_MonthlyAnalysisSubAccounting = new CRep_A_MonthlyAnalysisSubAccounting();

                if (pSubAccountIDList == null)
                {
                    checkException = cRep_A_MonthlyAnalysisAccounting.GetList(pAccountIDList, pFromDate, pToDate);
                    var ReportData = cRep_A_MonthlyAnalysisAccounting.lstCVarRep_A_MonthlyAnalysisAccounting.ToList();
                    PivotTable = ReportData.ToPivotTable(item => item.JVDate, item => item.Account_Name, items => items.Any() ? items.Sum(x => x.Balance) : 0);

                    HTMLTableBody = HTMLFunctions.GetHTMLTableContains(PivotTable, "#", "Monthly Analysis", true, true, false);
                }
                else
                {
                    checkException = cCRep_A_MonthlyAnalysisSubAccounting.GetList(pSubAccountIDList, pAccountIDList, pFromDate, pToDate);
                    var ReportData = cCRep_A_MonthlyAnalysisSubAccounting.lstCVarRep_A_MonthlyAnalysisSubAccounting.ToList();
                    PivotTable = ReportData.ToPivotTable(item => item.JVDate, item => item.SubAccount_Name, items => items.Any() ? items.Sum(x => x.Balance) : 0);

                    HTMLTableBody = HTMLFunctions.GetHTMLTableContains(PivotTable, "#", "Monthly Analysis", true, true, false);
                }

            }
            else
            {
                CRep_A_YearAnalsisAccounting CRep_A_YearAnalsisAccounting = new CRep_A_YearAnalsisAccounting();
                checkException = CRep_A_YearAnalsisAccounting.GetList(pAccountIDList, pFirstYear.ToString(), pSecondYear.ToString());

                var ReportData = CRep_A_YearAnalsisAccounting.lstCVarRep_A_YearAnalsisAccounting.OrderBy(x => x.JVDate).ToList();
                PivotTable = ReportData.ToPivotTable(item => item.JVDate, item => item.Account_Name, items => items.Any() ? items.Sum(x => x.Balance) : 0);

                HTMLTableBody = HTMLFunctions.GetHTMLTableContains(PivotTable, "#", "Comparison", false, false, false);
            }
            
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                    serializer.Serialize(HTMLTableBody) //pDefaultsHeader = pData[0]  
                };
        }














    }
}
