using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Generated;
//using Forwarding.MvcApp.Models.CRM.Addresses.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using MoreLinq;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using System.Data;
using System.Linq.Expressions;
using Forwarding.MvcApp.Helpers;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Customized;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_FollowUp.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Dashboard.Generated;
using Forwarding.MvcApp.Models.CRM.Generated;
using Forwarding.MvcApp.Models.CRM.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;

namespace Forwarding.MvcApp.Controllers.CRM.API_vwCRM_ClientsFollowReport
{
    public class vwCRM_ClientsFollowUpDashboardController : ApiController
    {
        //[Route("/api/vwCRM_ClientsFollowReport/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadFollowUpDashboard(string pWhereClause,int pSalesmanID,string Todaysdate,int pActionType_ID,int pYear,int pMonth)
        { 
           // var par = "0";
            bool pRecordsExist = false;
            Exception checkException = null;
            var ReportDate = new List<CVarvwCRM_ClientsFollowReport>();

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            //var HTMLTableRows = "";
            //CvwCRM_ClientsFollowReport objCvwCRM_ClientsFollowReport = new CvwCRM_ClientsFollowReport();
            //checkException = objCvwCRM_ClientsFollowReport.GetList(pWhereClause);

            //if (objCvwCRM_ClientsFollowReport.lstCVarvwCRM_ClientsFollowReport.Count > 0 && checkException == null)
            //{
            //    pRecordsExist = true;
            //    ReportDate = objCvwCRM_ClientsFollowReport.lstCVarvwCRM_ClientsFollowReport.ToList();
            //    ReportDate = ReportDate.Where(x => x.ActionID != 0).ToList();

            //        var pivotTable = ReportDate.ToPivotTable(
            //            item => item.ActionName,
            //            item => item.ClientName,
            //            items => items.Any() ? items.Count() : 0);
            //        HTMLTableRows = HTMLFunctions.GetHTMLTableContains(pivotTable , "Action \\ Customers" , "Summary" , true , false , false);

            //}
            CCRM_Clients objCCRM_Clients = new CCRM_Clients();
            objCCRM_Clients.GetList(" Where 1=1");//(" Where SalesmanID = " + pSalesmanID);

            CvwCRM_ClientsFollowUp objCvwCRM_ClientsFollowUp = new CvwCRM_ClientsFollowUp();
            objCvwCRM_ClientsFollowUp.GetList(" Where 1=1");

            //var year = objCvwCRM_ClientsFollowUp.lstCVarvwCRM_ClientsFollowUp.Where(y => y.SalesmanID == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
            //           .Where(x => x.SourceDateYear == pYear ).GroupBy(p => new { p.SourceDateYear,p.SalesManName }).Select(g => new
            //           {
            //               SalesManName = g.Key.SalesManName,
            //               Year = g.Key.SourceDateYear,
            //               TotalYear = g.Count()
            //           });

            //var Month = objCvwCRM_ClientsFollowUp.lstCVarvwCRM_ClientsFollowUp.Where(y => y.SalesmanID == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
            //           .Where(x => x.SourceDateYear == pYear).Where(z => z.SourceDateMonth == 7).GroupBy(p => new { p.SourceDateYear,p.SourceDateMonth, p.SalesManName }).Select(g => new
            //           {
            //               SalesManName = g.Key.SalesManName,
            //               Year = g.Key.SourceDateYear,
            //               Month = g.Key.SourceDateMonth,
            //               TotalMonth = g.Count()
            //           });
            string Today = DateTime.Now.ToString();
            //var Day = objCvwCRM_ClientsFollowUp.lstCVarvwCRM_ClientsFollowUp.Where(y => y.SalesmanID == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
            //          .Where(x => x.SourceDateYear == pYear).Where(z => z.SourceDateToday == Todaysdate).GroupBy(p => new { p.SourceDateYear, p.SourceDateMonth, p.SalesManName }).Select(g => new
            //          {
            //              SalesManName = g.Key.SalesManName,
            //              Year = g.Key.SourceDateYear,
            //              Month = g.Key.SourceDateMonth,
            //              TotalToday = g.Count()
            //          });

            CvwCRM_FollowUps objCvwCRM_FollowUps = new CvwCRM_FollowUps();
            objCvwCRM_FollowUps.GetList(" Where SalesRep ="+ (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID) + " ORDER BY Action");

            var vwCRM_FollowUps = objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps.Select(a => new { a.SalesRep, a.UserName, a.CRM_ClientID, a.Name,a.mActionPercentID,a.Action })
                .Distinct().Where( x => x.SalesRep == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID)).GroupBy
                (p => new { p.SalesRep, p.UserName, p.CRM_ClientID, p.Name }).Select(g => new
                {
                    SalesRep = g.Key.SalesRep,
                    UserName = g.Key.UserName,
                    CRM_ClientID = g.Key.CRM_ClientID,
                    ClientName = g.Key.Name,
                    TotalActionPercent = g.Count()
                    //TotalActionPercent = g.Sum(c => c.mActionPercentID).ToString()
                });


            //var vwCRM_Action_Customer = objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps.Select(a => new { a.SalesRep, a.UserName, a.CRM_ClientID, a.Name, a.Action })
            //    .Where(x => x.SalesRep == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID)).GroupBy
            //    (p => new { p.SalesRep, p.UserName, p.CRM_ClientID, p.Name,p.Action }).Select(g => new
            //    {
            //        SalesRep = g.Key.SalesRep,
            //        UserName = g.Key.UserName,
            //        CRM_ClientID = g.Key.CRM_ClientID,
            //        ClientName = g.Key.Name,
            //        Action = g.Key.Action,
            //        TotalAction_Customer = g.Count()
            //        //TotalActionPercent = g.Sum(c => c.mActionPercentID).ToString()
            //    });




            CvwCRM_Clients objCvwCRM_Clients = new CvwCRM_Clients();
            objCvwCRM_Clients.GetList(" Where 1=1");
           
                var ClientDashboardALL = objCvwCRM_Clients.lstCVarvwCRM_Clients
                    .GroupBy(p => new { p.SalesmanID, p.Username }).Select(g => new
                    {
                        SalesmanID = g.Key.SalesmanID,
                        Username = g.Key.Username,
                        Total = g.Count()
                    });
           
                var ClientDashboard = objCvwCRM_Clients.lstCVarvwCRM_Clients.Where(y => y.SalesmanID == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
                    .GroupBy(p => new { p.SalesmanID, p.Username }).Select(g => new
                    {
                        SalesmanID = g.Key.SalesmanID,
                        Username = g.Key.Username,
                        Total = g.Count()
                    });

            CvwCRM_FollowUps objCvwCRM_FollowUpsAction = new CvwCRM_FollowUps();
            objCvwCRM_FollowUpsAction.GetList(" Where SalesRep = " + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID) + " and ActionType_ID = ");

            CvwLastAction_SalesRep objCvwLastAction_SalesRep = new CvwLastAction_SalesRep();
            
            if (pMonth > 0)
                objCvwLastAction_SalesRep.GetList(" Where 1=1 AND YEAR(ActionDate) = " + pYear + " AND MONTH(ActionDate) = " + pMonth + "");
            else
                objCvwLastAction_SalesRep.GetList(" Where 1=1");

            var LastAction_SalesRep_User = objCvwLastAction_SalesRep.lstCVarvwLastAction_SalesRep
                .Where(y => y.SalesmanID == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
                    .GroupBy(p => new { p.SalesmanID, p.UserName, p.action }).Select(g => new
                    {
                        SalesmanID = g.Key.SalesmanID,
                        Username = g.Key.UserName,
                        Action = g.Key.action,
                        Total = g.Count()
                    });

            //CvwCRM_ProfitValue objCvwCRM_ProfitValue = new CvwCRM_ProfitValue();
            //if(pMonth > 0)
            //    objCvwCRM_ProfitValue.GetList(" Where 1=1 AND YEAR(CreationDate) = " + pYear + " AND MONTH(CreationDate) = " + pMonth + "");
            //else
            //    objCvwCRM_ProfitValue.GetList(" Where 1=1 AND YEAR(CreationDate) = " + pYear + " ");

            //var ProfitValuePipeline = objCvwCRM_ProfitValue.lstCVarvwCRM_ProfitValue
            //    .Where(y => y.SalesmanID == (pSalesmanID == 0? WebSecurity.CurrentUserId : pSalesmanID))
            //        .GroupBy(p => new { p.SalesmanID, p.PipeLineStageID, p.PipeLineStageName }).Select(g => new
            //        {
            //            CreatorUserID = g.Key.SalesmanID,
            //            PipeLineStageName = g.Key.PipeLineStageName,
            //            //Action = g.Key.action,
            //            TotalPerAction = g.Count()
            //        });
             

            //CvwCRM_FollowUps objCvwCRM_FollowUps_Actions = new CvwCRM_FollowUps();
            //objCvwCRM_FollowUps_Actions.GetList(" Where SalesRep =" + (pSalesmanID == 0? WebSecurity.CurrentUserId : pSalesmanID));

            //var FollowUps_Actions = objCvwCRM_FollowUps_Actions.lstCVarvwCRM_FollowUps
            //   .Where(y => y.SalesRep == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
            //       .GroupBy(p => new { p.SalesRep, p.Action }).Select(g => new
            //       {
            //           SalesRep = g.Key.SalesRep,
            //           Action = g.Key.Action,
            //            //Action = g.Key.action,
            //            TotalPerAction = g.Count()
            //       });

            CvwQuotations objCvwQuotations = new CvwQuotations();
            int _aa = 0;
            //  objCvwQuotations.GetListPaging(10000,1, (" Where SalesManID =" + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID)), " QuotationStageName ",out _aa);
            //var QuotationsNumber = objCvwQuotations.lstCVarvwQuotations
            //   .Where(y => y.SalesmanID == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
            //       .GroupBy(p => new { p.SalesmanID, p.Salesman, p.QuotationStageID, p.QuotationStageName }).Select(g => new
            //       {
            //           Salesman = g.Key.Salesman,
            //           QuotationStageName = g.Key.QuotationStageName,
            //           QuotationsNumber = g.Count()
            //       });


            CvwQuotations objCvwQuotationsAccepted = new CvwQuotations();
            objCvwQuotationsAccepted.GetListPaging(10000, 1, (" Where QuotationStageID = 4 AND SalesManID =" + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID)), " QuotationStageName ", out _aa);
            var QuotationsAccepted = objCvwQuotationsAccepted.lstCVarvwQuotations
               .Where(y => y.SalesmanID == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
                   .GroupBy(p => new { p.SalesmanID, p.Salesman, p.QuotationStageID, p.QuotationStageName }).Select(g => new
                   {
                       Salesman = g.Key.Salesman,
                       QuotationStageName = g.Key.QuotationStageName,
                       QuotationsNumber = g.Count()
                   });

            //CvwCRMDashboardReceivables objCvwCRMDashboardReceivables = new CvwCRMDashboardReceivables();
            //objCvwCRMDashboardReceivables.GetListPaging(1000, 1, (" Where CreatorUserID IS Not NULL AND CreationYear = "+ pYear + " AND CreatorUserID = " + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID)), "  CreationMonth ", out _aa);

            //CvwCRMDashboardReceivablesManager objCvwCRMDashboardReceivablesManager = new CvwCRMDashboardReceivablesManager();
            //objCvwCRMDashboardReceivablesManager.GetListPaging(1000, 1, (" Where CreationYear = "+ pYear + " "), "  CreationMonth ", out _aa);

            CvwCRMmonthlyRevenueInvoices objCvwCRMmonthlyRevenueInvoices = new CvwCRMmonthlyRevenueInvoices();
            objCvwCRMmonthlyRevenueInvoices.GetList(" Where InvoiceYear = "+ pYear + " AND SalesmanID = " + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID) + "  ORDER BY InvoiceYear,InvoiceMonth");

            CvwCRMmonthlyRevenueInvoicesManagers objCvwCRMmonthlyRevenueInvoicesManagers = new CvwCRMmonthlyRevenueInvoicesManagers();
            objCvwCRMmonthlyRevenueInvoicesManagers.GetList(" Where InvoiceYear = "+ pYear + " ORDER BY InvoiceYear,InvoiceMonth");

            //FlotPie
            CvwInvoices objCvwFlotPie = new CvwInvoices();
            Int32 _RowCount = objCvwFlotPie.lstCVarvwInvoices.Count;
            objCvwFlotPie.GetListPaging(999999/*pPageSize*/, 1, " Where ModificatorUserID = "+ (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID), "ID"/*pOrderBy*/, out _RowCount);
           
            
            //CvwFlotBarReceivables objCvwFlotBarReceivables = new CvwFlotBarReceivables();
            //objCvwFlotBarReceivables.GetList(" Where 1=1");
            //CvwFlotBarPayables objCvwFlotBarPayables = new CvwFlotBarPayables();
            //objCvwFlotBarPayables.GetList(" Where 1=1");

            CCRM_LastActionToEachSalesLead objCCRM_LastActionToEachSalesLead = new CCRM_LastActionToEachSalesLead();
            objCCRM_LastActionToEachSalesLead.GetList((pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID));
            if(pMonth > 0)
                objCCRM_LastActionToEachSalesLead.lstCVarCRM_LastActionToEachSalesLead = objCCRM_LastActionToEachSalesLead.lstCVarCRM_LastActionToEachSalesLead.Where(a => Convert.ToInt32(a.ActionDate.Year) == pYear).Where(a => Convert.ToInt32(a.ActionDate.Month) == pMonth).OrderBy(x => x.ActionOrder).ToList();
            else
                objCCRM_LastActionToEachSalesLead.lstCVarCRM_LastActionToEachSalesLead = objCCRM_LastActionToEachSalesLead.lstCVarCRM_LastActionToEachSalesLead.Where(a => Convert.ToInt32(a.ActionDate.Year) == pYear).OrderBy(x => x.ActionOrder).ToList();

            CCRM_PipeLineStageToEachSalesLead objCCRM_PipeLineStageToEachSalesLead = new CCRM_PipeLineStageToEachSalesLead();
            objCCRM_PipeLineStageToEachSalesLead.GetList((pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID));

            if (pMonth > 0)
                objCCRM_PipeLineStageToEachSalesLead.lstCVarCRM_PipeLineStageToEachSalesLead = objCCRM_PipeLineStageToEachSalesLead.lstCVarCRM_PipeLineStageToEachSalesLead.Where(a => Convert.ToInt32(a.CreationDate.Year) == pYear).Where(a => Convert.ToInt32(a.CreationDate.Month) == pMonth).OrderBy(x => x.PipeLineStageID).ToList();
            else
                objCCRM_PipeLineStageToEachSalesLead.lstCVarCRM_PipeLineStageToEachSalesLead = objCCRM_PipeLineStageToEachSalesLead.lstCVarCRM_PipeLineStageToEachSalesLead.Where(a => Convert.ToInt32(a.CreationDate.Year) == pYear).OrderBy(x => x.PipeLineStageID).ToList();


            var PipeLineStatistics = objCCRM_PipeLineStageToEachSalesLead.lstCVarCRM_PipeLineStageToEachSalesLead
                   .GroupBy(p => new {p.PipeLineStageID, p.PipeLineStageName}).Select(g => new
                   {
                       PipeLineStageName = g.Key.PipeLineStageName,
                       PipeLineStageCount = g.Count()
                   });

            Boolean CurrentUserIsManager = false;
            CCRM_privilege objCCRM_privilege = new CCRM_privilege();
            objCCRM_privilege.GetList(" Where ID = 30");
            string[] UsersPrivileges = objCCRM_privilege.lstCVarCRM_privilege[0].UsersIDs.Split(',');
            //WebSecurity.CurrentUserId]
            if(pSalesmanID == 0)
                if (UsersPrivileges.Contains(WebSecurity.CurrentUserId.ToString()))
                    CurrentUserIsManager = true;
            else
                     if (UsersPrivileges.Contains(pSalesmanID.ToString()))
                         CurrentUserIsManager = true;

            CvwInvoicesCRMDashboard objCvwInvoicesCRMDashboard = new CvwInvoicesCRMDashboard();
            if(CurrentUserIsManager)
                if (pMonth>0)
                    objCvwInvoicesCRMDashboard.GetList("Where CustomerName <> cast(0 AS NVARCHAR(MAX)) AND DATEPART(YYYY, InvoiceDate) = "+pYear+ " AND MONTH(InvoiceDate) = " + pMonth + "");
                else
                    objCvwInvoicesCRMDashboard.GetList("Where CustomerName <> cast(0 AS NVARCHAR(MAX)) AND DATEPART(YYYY, InvoiceDate) = " + pYear + "");
            else
                 if (pMonth > 0)
                    objCvwInvoicesCRMDashboard.GetList("Where CustomerName <> cast(0 AS NVARCHAR(MAX)) AND DATEPART(YYYY, InvoiceDate) = " + pYear + " AND MONTH(InvoiceDate) = " + pMonth + " AND SalesmanID = " + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID));
            else
                    objCvwInvoicesCRMDashboard.GetList("Where CustomerName <> cast(0 AS NVARCHAR(MAX)) AND DATEPART(YYYY, InvoiceDate) = " + pYear + " AND SalesmanID = " + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID));


            var pFlotPie = objCvwInvoicesCRMDashboard.lstCVarvwInvoicesCRMDashboard
                .GroupBy(g => new { g.CustomerName })
                .Select(g => new
                {
                    CustomerName = g.First().CustomerName
                    ,
                    Amount = g.Sum(s => s.Amount * s.ExchangeRate)
                }).OrderByDescending(o => o.Amount)
            .Take(5)
            .ToList();

            return new Object[] {
                pRecordsExist ,
                 0//new JavaScriptSerializer().Serialize(objCvwCRM_ClientsFollowReport.lstCVarvwCRM_ClientsFollowReport)
                ,0//new JavaScriptSerializer().Serialize(HTMLTableRows)
                ,0//new JavaScriptSerializer().Serialize(objCCRM_Clients.lstCVarCRM_Clients)
                ,0//new JavaScriptSerializer().Serialize(year)
                ,0//new JavaScriptSerializer().Serialize(Month)
                ,0//new JavaScriptSerializer().Serialize(Day)
                ,srialize.Serialize(vwCRM_FollowUps)//7
                ,0//new JavaScriptSerializer().Serialize(ClientDashboard)//8
                ,0//new JavaScriptSerializer().Serialize(ClientDashboardALL)//9
                ,0//new JavaScriptSerializer().Serialize(objCvwLastAction_SalesRep.lstCVarvwLastAction_SalesRep)//10
                ,srialize.Serialize(LastAction_SalesRep_User)//11
                ,0//new JavaScriptSerializer().Serialize(ProfitValuePipeline)//12
                ,0//new JavaScriptSerializer().Serialize(FollowUps_Actions)//13
                ,0//new JavaScriptSerializer().Serialize(QuotationsNumber)//14
                ,srialize.Serialize(QuotationsAccepted)//15
                ,srialize.Serialize(objCvwCRMmonthlyRevenueInvoices.lstCVarvwCRMmonthlyRevenueInvoices)//objCvwCRMDashboardReceivables.lstCVarvwCRMDashboardReceivables)//16
                ,srialize.Serialize(pFlotPie)//17
                ,0//new JavaScriptSerializer().Serialize(objCvwFlotBarReceivables.lstCVarvwFlotBarReceivables) //data[1]:FlotBarReceivables
                ,0//new JavaScriptSerializer().Serialize(objCvwFlotBarPayables.lstCVarvwFlotBarPayables)//data[2]:FlotBarPayables
                ,0//new JavaScriptSerializer().Serialize(vwCRM_Action_Customer)//20
                ,srialize.Serialize(objCCRM_LastActionToEachSalesLead.lstCVarCRM_LastActionToEachSalesLead)//21
                ,srialize.Serialize(objCCRM_PipeLineStageToEachSalesLead.lstCVarCRM_PipeLineStageToEachSalesLead)//22
                ,srialize.Serialize(objCvwCRMmonthlyRevenueInvoicesManagers.lstCVarvwCRMmonthlyRevenueInvoicesManagers)//objCvwCRMDashboardReceivablesManager.lstCVarvwCRMDashboardReceivablesManager)//23
                ,CurrentUserIsManager//24
                ,srialize.Serialize(PipeLineStatistics)//25
            };
        }


        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadTargetReport(string pWhereClause, DateTime pFromDate, DateTime pToDate)
        {
            // var par = "0";
            bool pRecordsExist = false;
            Exception checkException = null;
            var ReportDate = new List<CVarvwCRM_SalesMenTargetReport>();
            var HTMLTableRows = "";
            CvwCRM_SalesMenTargetReport objCvwCRM_SalesMenTargetReport = new CvwCRM_SalesMenTargetReport();

            //pWhereClause += "anTargetDetailsID is not null"
            checkException = objCvwCRM_SalesMenTargetReport.GetList(pFromDate , pToDate , pWhereClause);

            if (objCvwCRM_SalesMenTargetReport.lstCVarvwCRM_SalesMenTargetReport.Count > 0 && checkException == null)
            {
                pRecordsExist = true;
                ReportDate = objCvwCRM_SalesMenTargetReport.lstCVarvwCRM_SalesMenTargetReport.ToList();
                ReportDate = ReportDate.Where(x => (x.ActionID != 0 && x.mTargetDetailsID != 0)).ToList();



                var pivotTable = ReportDate.ToPivotTable(
item => item.ActionName,
item => item.SalesRepName,
items => items.Any() ? items.Count() : 0);
                HTMLTableRows = HTMLFunctions.GetRows_Customized_For_SalesMenTargetReport(pivotTable , "Salesmen \\ Actions" , "Summary" , ReportDate);






            }

            return new Object[] { pRecordsExist, new JavaScriptSerializer().Serialize(objCvwCRM_SalesMenTargetReport.lstCVarvwCRM_SalesMenTargetReport), new JavaScriptSerializer().Serialize(HTMLTableRows) };
        }


        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] FillFilter()
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            CCRM_Clients objCCRM_Clients = new CCRM_Clients();
            //CCountries cCountries = new CCountries();
            CUsers cUsers = new CUsers();
            CCRM_Sources cCRM_Sources = new CCRM_Sources();
            CCRM_Actions cCRM_Actions = new CCRM_Actions();
            CCRM_privilege cCCRM_privilege = new CCRM_privilege();
            //--------------------------------------------
            objCCRM_Clients.GetList("where 1 = 1");
            //cCountries.GetList("where 1 = 1");
            cCRM_Sources.GetList("where 1 = 1");
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "BED")
            {
                cUsers.GetList("where IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND DepartmentID in (select ID from NoAccessDepartments where Name like '%sales%')");
            } else
            {
                cUsers.GetList("where IsNull(CustomerID , 0) = 0 AND 1 = 1");
            }
            cCRM_Actions.GetList("where 1 = 1");
            cCCRM_privilege.GetList(" Where ID = 30 ");// AND UsersIDs like (%" + WebSecurity.CurrentUserId + "%)");
            var UsersPrivilege = cCCRM_privilege.lstCVarCRM_privilege[0].UsersIDs.Split(',');
            int UserIsManager = 0;
            for (int i=0;i< UsersPrivilege.Length; i++)
            {
                if (WebSecurity.CurrentUserId == Convert.ToInt32(UsersPrivilege[i]))
                    UserIsManager = 1;
            }

            return new Object[] 
            {
                                  //new JavaScriptSerializer().Serialize(cCountries.lstCVarCountries) ,
                                  srialize.Serialize(cCRM_Sources.lstCVarCRM_Sources) ,
                                  srialize.Serialize(cUsers.lstCVarUsers)   ,
                                  srialize.Serialize(cCRM_Actions.lstCVarCRM_Actions) ,
                                  srialize.Serialize(objCCRM_Clients.lstCVarCRM_Clients),
                                  UserIsManager
            };
        }



     


    }
}
