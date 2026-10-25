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

namespace Forwarding.MvcApp.Controllers.CRM.API_vwCRM_ClientsFollowReport
{
    public class QuotationsDashboardController : ApiController
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
            
            CvwQuotations objCvwQuotations = new CvwQuotations();
            int _aa = 0;
            if (pMonth > 0)
                objCvwQuotations.GetListPaging(10000, 1, (" Where  DATEPART(YYYY, CreationDate) = " + pYear + " AND MONTH(CreationDate) = " + pMonth + " AND  SalesManID =" + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID)), " QuotationStageName ", out _aa);
            else
                objCvwQuotations.GetListPaging(10000, 1, (" Where  DATEPART(YYYY, CreationDate) = " + pYear + " AND  SalesManID =" + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID)), " QuotationStageName ", out _aa);

            var QuotationsNumber = objCvwQuotations.lstCVarvwQuotations
               .Where(y => y.SalesmanID == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
                   .GroupBy(p => new { p.SalesmanID, p.Salesman, p.QuotationStageID, p.QuotationStageName }).Select(g => new
                   {
                       Salesman = g.Key.Salesman,
                       QuotationStageName = g.Key.QuotationStageName,
                       QuotationsNumber = g.Count()
                   });

            
            if(pMonth > 0)
                objCvwQuotations.GetListPaging(10000, 1, (" WHERE  DATEPART(YYYY, CreationDate) = " + pYear + " AND MONTH(CreationDate) = " + pMonth + " AND SalesLeadID > 0 AND SalesManID =" + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID)), " QuotationStageName ", out _aa);
            else
                objCvwQuotations.GetListPaging(10000, 1, (" WHERE  DATEPART(YYYY, CreationDate) = " + pYear + " AND SalesLeadID > 0 AND SalesManID =" + (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID)), " QuotationStageName ", out _aa);


            var QuotationsNumberPerEachSalesLead = objCvwQuotations.lstCVarvwQuotations
               .Where(y => y.SalesmanID == (pSalesmanID == 0 ? WebSecurity.CurrentUserId : pSalesmanID))
                   .GroupBy(p => new { p.SalesLeadID, p.SalesLeadName, p.QuotationStageID, p.QuotationStageName }).Select(g => new
                   {
                       SalesLeadName = g.Key.SalesLeadName,
                       QuotationStageName = g.Key.QuotationStageName,
                       QuotationsNumberPerEachSalesLead = g.Count()
                   });


            return new Object[] {
                pRecordsExist ,
                 new JavaScriptSerializer().Serialize(QuotationsNumber)//1
                ,new JavaScriptSerializer().Serialize(QuotationsNumberPerEachSalesLead)//2
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
            cUsers.GetList("where IsNull(CustomerID , 0) = 0 AND 1 = 1");
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
                                  new JavaScriptSerializer().Serialize(cCRM_Sources.lstCVarCRM_Sources) ,
                                  new JavaScriptSerializer().Serialize(cUsers.lstCVarUsers)   ,
                                  new JavaScriptSerializer().Serialize(cCRM_Actions.lstCVarCRM_Actions) ,
                                  new JavaScriptSerializer().Serialize(objCCRM_Clients.lstCVarCRM_Clients),
                                  UserIsManager
            };
        }
        
    }
}
