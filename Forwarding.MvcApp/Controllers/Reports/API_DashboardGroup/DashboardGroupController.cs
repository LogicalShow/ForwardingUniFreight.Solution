using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Dashboard.Generated;
using Forwarding.MvcApp.Models.DashboardGroup.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;


namespace Forwarding.MvcApp.Controllers.Dashboard.API_Dashboard
{
    public class DashboardGroupController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll_Charts(int pYear,int pType)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            CSP_Dashboard_SalesInvoices objCSP_Dashboard_SalesInvoices = new CSP_Dashboard_SalesInvoices();
            CSP_Dashboard_SalesByService objCSP_Dashboard_SalesByService = new CSP_Dashboard_SalesByService();

            CSP_Dashboard_AgingReceivables objCSP_Dashboard_AgingReceivables = new CSP_Dashboard_AgingReceivables();
            CSP_Dashboard_AgingCustomers objCSP_Dashboard_AgingCustomers = new CSP_Dashboard_AgingCustomers();

            CSP_Dashboard_AgingPayables objCSP_Dashboard_AgingPayables = new CSP_Dashboard_AgingPayables();
            CSP_Dashboard_AgingSuppliers objCSP_Dashboard_AgingSuppliers = new CSP_Dashboard_AgingSuppliers();

            CSP_Dashboard_Payables objCSP_Dashboard_Payables = new CSP_Dashboard_Payables();
            CSP_Dashboard_CostByService objCSP_Dashboard_CostByService = new CSP_Dashboard_CostByService();

            if (pType == 1)
            {
                checkException = objCSP_Dashboard_SalesInvoices.GetList(pYear);
                checkException = objCSP_Dashboard_SalesByService.GetList(pYear);
            }
            else if (pType == 2)
            {
                checkException = objCSP_Dashboard_AgingReceivables.GetList(DateTime.Now);
                checkException = objCSP_Dashboard_AgingCustomers.GetList(DateTime.Now);
            }
            else if (pType == 3)
            {
                checkException = objCSP_Dashboard_AgingPayables.GetList(DateTime.Now);
                checkException = objCSP_Dashboard_AgingSuppliers.GetList(DateTime.Now);
            }
            if (pType == 4)
            {
                checkException = objCSP_Dashboard_Payables.GetList(pYear);
                checkException = objCSP_Dashboard_CostByService.GetList(pYear);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCSP_Dashboard_SalesInvoices.lstCVarSP_Dashboard_SalesInvoices) //pDate[0]
             ,  serializer.Serialize(objCSP_Dashboard_SalesByService.lstCVarSP_Dashboard_SalesByService) //pDate[1]
             ,  serializer.Serialize(objCSP_Dashboard_AgingReceivables.lstCVarSP_Dashboard_AgingReceivables) //pDate[2]
             ,  serializer.Serialize(objCSP_Dashboard_AgingCustomers.lstCVarSP_Dashboard_AgingCustomers) //pDate[3]
             ,  serializer.Serialize(objCSP_Dashboard_AgingPayables.lstCVarSP_Dashboard_AgingPayables) //pDate[4]
            ,  serializer.Serialize(objCSP_Dashboard_AgingSuppliers.lstCVarSP_Dashboard_AgingSuppliers) //pDate[5]
            ,  serializer.Serialize(objCSP_Dashboard_Payables.lstCVarSP_Dashboard_Payables) //pDate[6]
            ,  serializer.Serialize(objCSP_Dashboard_CostByService.lstCVarSP_Dashboard_CostByService) //pDate[7]
            };

}
          
            //CvwUserForms objCvwUserForms = new CvwUserForms();
            //objCvwUserForms.GetListPaging(1, 1, "WHERE ImageName=N'MainDashboardForm' AND UserID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);

            //DailySpotLight
          //  CvwDailySpotLight objCvwDailySpotLight = new CvwDailySpotLight();
            //if (objCvwUserForms.lstCVarvwUserForms[0].CanAdd)
            //    objCvwDailySpotLight.GetList(pWhereClauseDailySpotLight);
            
            //FlotBarReceivables, FlotBarPayables
//            CvwFlotBarReceivables objCvwFlotBarReceivables = new CvwFlotBarReceivables();
//            CvwFlotBarPayables objCvwFlotBarPayables = new CvwFlotBarPayables();
//            if (objCvwUserForms.lstCVarvwUserForms[0].CanEdit)
//            {
//                objCvwFlotBarReceivables.GetList(pWhereClauseFlotBarReceivables);
//                ob
//jCvwFlotBarPayables.GetList(pWhereClauseFlotBarPayables);
//            }
//            //FlotLine
//            CvwFlotLine objCvwFlotLine = new CvwFlotLine();
//            if (objCvwUserForms.lstCVarvwUserForms[0].CanView)
//                objCvwFlotLine.GetList(pWhereClauseFlotLine);
            
            //FlotPie
            //CvwInvoicesForDashboard objCvwFlotPie = new CvwInvoicesForDashboard();
            //if (objCvwUserForms.lstCVarvwUserForms[0].CanDelete)
            //    objCvwFlotPie.GetListPaging(999999/*pPageSize*/, pPageNumber, pWhereClause, "ID"/*pOrderBy*/, out _RowCount);

            //#region Get lists to group
            //var pFlotBarReceivablesList = objCvwFlotBarReceivables.lstCVarvwFlotBarReceivables
            //    .GroupBy(g => new { g.CreationMonth, g.CreationYear })
            //    .Select(g => new
            //    {
            //        CreationMonth = g.First().CreationMonth
            //        ,
            //        CreationYear = g.First().CreationYear
            //        ,
            //        Amount = g.Sum(s => s.Amount)
            //    }).OrderByDescending(o => o.Amount)
            //.ToList();

            //var pFlotBarPayablesList = objCvwFlotBarPayables.lstCVarvwFlotBarPayables
            //    .GroupBy(g => new { g.CreationMonth, g.CreationYear })
            //    .Select(g => new
            //    {
            //        CreationMonth = g.First().CreationMonth
            //        ,
            //        CreationYear = g.First().CreationYear
            //        ,
            //        Amount = g.Sum(s => s.Amount)
            //    }).OrderByDescending(o => o.CreationMonth)
            //.ToList();

            //var pFlotLineList = objCvwFlotLine.lstCVarvwFlotLine
            //    .GroupBy(g => new { g.OperationMonth, g.OperationYear })
            //    .Select(g => new
            //    {
            //        OperationMonth = g.First().OperationMonth
            //        ,
            //        OperationYear = g.First().OperationYear
            //        ,
            //        OperationsCount = g.Sum(s => s.OperationsCount)
            //    }).OrderByDescending(o => o.OperationMonth)
            //.ToList();

            //var pFlotPie = objCvwFlotPie.lstCVarvwInvoicesForDashboard
            //    .GroupBy(g => new { g.PartnerID, g.PartnerTypeID, g.PartnerName })
            //    .Select(g => new
            //    {
            //        PartnerName = g.First().PartnerName
            //        ,
            //        Amount = g.Sum(s => s.Amount * s.ExchangeRate)
            //    }).OrderByDescending(o => o.Amount)
            //.Take(5)
            //.ToList();
            //#endregion Get list to group


                //new JavaScriptSerializer().Serialize(objCvwDailySpotLight.lstCVarvwDailySpotLight) //data[0]:DailySpotLight
                //, new JavaScriptSerializer().Serialize(pFlotBarReceivablesList) //data[1]:FlotBarReceivables
                //, new JavaScriptSerializer().Serialize(pFlotBarPayablesList)//data[2]:FlotBarPayables
                //, new JavaScriptSerializer().Serialize(pFlotLineList)//data[3]
 
    }
}
