using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Dashboard.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Dashboard.API_Dashboard
{
    public class DashboardController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll_Charts(string pWhereClauseDailySpotLight, string pWhereClauseFlotBarReceivables, string pWhereClauseFlotBarPayables, string pWhereClauseFlotLine, int pPageNumber, int pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetListPaging(1, 1, "WHERE ImageName=N'MainDashboardForm' AND UserID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);

            //DailySpotLight
            CvwDailySpotLight objCvwDailySpotLight = new CvwDailySpotLight();
            if (objCvwUserForms.lstCVarvwUserForms[0].CanAdd)
                objCvwDailySpotLight.GetList(pWhereClauseDailySpotLight);
            
            //FlotBarReceivables, FlotBarPayables
            CvwFlotBarReceivables objCvwFlotBarReceivables = new CvwFlotBarReceivables();
            CvwFlotBarPayables objCvwFlotBarPayables = new CvwFlotBarPayables();
            if (objCvwUserForms.lstCVarvwUserForms[0].CanEdit)
            {
                objCvwFlotBarReceivables.GetList(pWhereClauseFlotBarReceivables);
                objCvwFlotBarPayables.GetList(pWhereClauseFlotBarPayables);
            }
            //FlotLine
            CvwFlotLine objCvwFlotLine = new CvwFlotLine();
            if (objCvwUserForms.lstCVarvwUserForms[0].CanView)
                objCvwFlotLine.GetList(pWhereClauseFlotLine);
            
            //FlotPie
            CvwInvoicesForDashboard objCvwFlotPie = new CvwInvoicesForDashboard();
            if (objCvwUserForms.lstCVarvwUserForms[0].CanDelete)
                objCvwFlotPie.GetListPaging(999999/*pPageSize*/, pPageNumber, pWhereClause, "ID"/*pOrderBy*/, out _RowCount);

            #region Get lists to group
            var pFlotBarReceivablesList = objCvwFlotBarReceivables.lstCVarvwFlotBarReceivables
                .GroupBy(g => new { g.CreationMonth, g.CreationYear })
                .Select(g => new
                {
                    CreationMonth = g.First().CreationMonth
                    ,
                    CreationYear = g.First().CreationYear
                    ,
                    Amount = g.Sum(s => s.Amount)
                }).OrderByDescending(o => o.Amount)
            .ToList();

            var pFlotBarPayablesList = objCvwFlotBarPayables.lstCVarvwFlotBarPayables
                .GroupBy(g => new { g.CreationMonth, g.CreationYear })
                .Select(g => new
                {
                    CreationMonth = g.First().CreationMonth
                    ,
                    CreationYear = g.First().CreationYear
                    ,
                    Amount = g.Sum(s => s.Amount)
                }).OrderByDescending(o => o.CreationMonth)
            .ToList();

            var pFlotLineList = objCvwFlotLine.lstCVarvwFlotLine
                .GroupBy(g => new { g.OperationMonth, g.OperationYear })
                .Select(g => new
                {
                    OperationMonth = g.First().OperationMonth
                    ,
                    OperationYear = g.First().OperationYear
                    ,
                    OperationsCount = g.Sum(s => s.OperationsCount)
                }).OrderByDescending(o => o.OperationMonth)
            .ToList();

            var pFlotPie = objCvwFlotPie.lstCVarvwInvoicesForDashboard
                .GroupBy(g => new { g.PartnerID, g.PartnerTypeID, g.PartnerName })
                .Select(g => new
                {
                    PartnerName = g.First().PartnerName
                    ,
                    Amount = g.Sum(s => s.Amount * s.ExchangeRate)
                }).OrderByDescending(o => o.Amount)
            .Take(5)
            .ToList();
            #endregion Get list to group
            return new Object[] { 
                new JavaScriptSerializer().Serialize(objCvwDailySpotLight.lstCVarvwDailySpotLight) //data[0]:DailySpotLight
                , new JavaScriptSerializer().Serialize(pFlotBarReceivablesList) //data[1]:FlotBarReceivables
                , new JavaScriptSerializer().Serialize(pFlotBarPayablesList)//data[2]:FlotBarPayables
                , new JavaScriptSerializer().Serialize(pFlotLineList)//data[3]:FlotLine
                , new JavaScriptSerializer().Serialize(pFlotPie) //new JavaScriptSerializer().Serialize(objCvwFlotPie.lstCVarvwInvoices)//data[4]:FlotPie
            };
        }
    }
}
