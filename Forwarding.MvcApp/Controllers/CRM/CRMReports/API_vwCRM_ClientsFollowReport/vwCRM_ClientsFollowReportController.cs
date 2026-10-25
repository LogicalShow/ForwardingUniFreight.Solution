using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Generated;
//using Forwarding.MvcApp.Models.CRM.Addresses.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using System.Data;
using Forwarding.MvcApp.Helpers;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;

namespace Forwarding.MvcApp.Controllers.CRM.API_vwCRM_ClientsFollowReport
{
    public class vwCRM_ClientsFollowReportController : ApiController
    {
        //[Route("/api/vwCRM_ClientsFollowReport/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadFollowUpReport(string pWhereClause)
        {
           // var par = "0";
            bool pRecordsExist = false;
            Exception checkException = null;
            var ReportDate = new List<CVarvwCRM_ClientsFollowReport>();
            var HTMLTableRows = "";
            CvwCRM_ClientsFollowReport objCvwCRM_ClientsFollowReport = new CvwCRM_ClientsFollowReport();
            checkException = objCvwCRM_ClientsFollowReport.GetList(pWhereClause);

            if (objCvwCRM_ClientsFollowReport.lstCVarvwCRM_ClientsFollowReport.Count > 0 && checkException == null)
            {
                pRecordsExist = true;
                ReportDate = objCvwCRM_ClientsFollowReport.lstCVarvwCRM_ClientsFollowReport.ToList();
                ReportDate = ReportDate.Where(x => x.ActionID != 0).ToList();

               

                    var pivotTable = ReportDate.ToPivotTable(
                        item => item.ActionName,
item => item.ClientName,
items => items.Any() ? items.Count() : 0);
                    HTMLTableRows = HTMLFunctions.GetHTMLTableContains(pivotTable , "Action \\ Customers" , "Summary" , true , false , false);
              




              
            }

            return new Object[] { pRecordsExist ,  new JavaScriptSerializer().Serialize(objCvwCRM_ClientsFollowReport.lstCVarvwCRM_ClientsFollowReport), new JavaScriptSerializer().Serialize(HTMLTableRows) };
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
            string pWhereClauseSalesLead = "WHERE 1=1";
            Int32 _RowCount = 0;

            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClauseSalesLead += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            CCRM_Clients objCCRM_Clients = new CCRM_Clients();
            //CCountries cCountries = new CCountries();
            CUsers cUsers = new CUsers();
            CCRM_Sources cCRM_Sources = new CCRM_Sources();
            CCRM_Actions cCRM_Actions = new CCRM_Actions();
            //--------------------------------------------
            objCCRM_Clients.GetListPaging(999999, 1, pWhereClauseSalesLead, "Name", out _RowCount);
            //cCountries.GetList("where 1 = 1");
            cCRM_Sources.GetList("where 1 = 1");
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "BED")
            {
                cUsers.GetList("where IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND DepartmentID in (select ID from NoAccessDepartments where Name like '%sales%')");
            }
            else
            {
                cUsers.GetList("where IsNull(CustomerID , 0) = 0 AND 1 = 1");
            }
            cCRM_Actions.GetList("where 1 = 1");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] 
            {
                                  //new JavaScriptSerializer().Serialize(cCountries.lstCVarCountries) ,
                                  serializer.Serialize(cCRM_Sources.lstCVarCRM_Sources) ,
                                  serializer.Serialize(cUsers.lstCVarUsers)   ,
                                  serializer.Serialize(cCRM_Actions.lstCVarCRM_Actions) ,
                                  serializer.Serialize(objCCRM_Clients.lstCVarCRM_Clients)
            };
        }



     


    }
}
