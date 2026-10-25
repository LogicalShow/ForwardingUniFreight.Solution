using Forwarding.MvcApp.Entities.Quotations;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class QuotationsStatisticsController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] GetStatisticsFilter()
        {
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetList(" WHERE IsNull(CustomerID , 0) = 0 AND 1=1 ORDER BY Name ");

            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CCustomers objCCustomers = new CCustomers();
            //objCCustomers.GetList(" WHERE 1=1 ORDER BY Name ");

            CAgents objCAgents = new CAgents();
            objCAgents.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetList(" WHERE 1=1 ORDER BY Code ");

            CNoAccessQuoteAndOperStages objCNoAccessQuoteAndOperStages = new CNoAccessQuoteAndOperStages();
            objCNoAccessQuoteAndOperStages.GetList(" WHERE IsQuotationStage = 1 AND IsInActive = 0 ORDER BY ViewOrder ");

            var pUsersList = objCvwUsers.lstCVarvwUsers.Select(s => new {ID = s.ID, IsSalesman = s.IsSalesman, Name = s.Name }).ToList();
            var pBranchesList = objCvwBranches.lstCVarvwBranches.Select(s => new {ID = s.ID, Code = s.Code, Name = s.Name }).ToList();
            var pCustomersList = objCCustomers.lstCVarCustomers.Select(s => new {ID = s.ID, Code = s.Code, Name = s.Name }).ToList();
            var pCurrenciesList = objCvwCurrencies.lstCVarvwCurrencies.Select(s => new {ID = s.ID, Code = s.Code, Name = s.Name }).ToList();
            var pNoAccessQuoteAndOperStagesList = objCNoAccessQuoteAndOperStages.lstCVarNoAccessQuoteAndOperStages.Select(s => new {ID = s.ID, Code = s.Code, Name = s.Name }).ToList();
            var pAgentsList = objCAgents.lstCVarAgents.Select(s => new {ID = s.ID, Code = s.Code, Name = s.Name }).ToList();

            return new object[] { 
                new JavaScriptSerializer().Serialize(pUsersList)//data[0]
                , new JavaScriptSerializer().Serialize(pBranchesList)//data[1]
                , new JavaScriptSerializer().Serialize(pCustomersList)//data[2]
                , new JavaScriptSerializer().Serialize(pCurrenciesList)//data[3]
                , new JavaScriptSerializer().Serialize(pNoAccessQuoteAndOperStagesList)//data[4]
                , new JavaScriptSerializer().Serialize(pAgentsList)//data[5]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            bool pRecordsExist = false;
            Exception checkException = null;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");

            //var constOperationsFormID = 29;//OperationsManagement
            var constQuotationsFormID = 28; //QuotationsManagement

            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList("WHERE UserID=" + WebSecurity.CurrentUserId.ToString() + " AND FormID=" + constQuotationsFormID.ToString());

            bool _IsHideOthersRecords = objCvwUserForms.lstCVarvwUserForms[0].HideOthersRecords;
            if (_IsHideOthersRecords)
                //pWhereClause += " AND (CreatorUserID=" + WebSecurity.CurrentUserId + " OR SalesmanID=" + WebSecurity.CurrentUserId + ")";
                pWhereClause += " AND (CreatorUserID=" + WebSecurity.CurrentUserId + " OR SalesmanID=" + WebSecurity.CurrentUserId + ")";

			CvwQuotationRoute_rpt objCvwQuotationRoute_rpt = new CvwQuotationRoute_rpt();
            checkException = objCvwQuotationRoute_rpt.GetList(pWhereClause);
            CCustomizedDBCall cCustomizedDBCall =new CCustomizedDBCall();
            var temp = "";
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "BSEA" && objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt.Count >0)
            {
               for(int i =0; i < objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt.Count; i++ )
                {
                    temp = cCustomizedDBCall.CallStringFunction($"SELECT  STUFF(( SELECT    '/' + CAST(FORMAT(SaleQuantity, '###') AS NVARCHAR) + '*' + ContainerTypeCode   FROM    vwQuotationCharges   WHERE    QuotationRouteID IN (     SELECT   id   FROM    QuotationRoute   WHERE     id =  {objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt[i].ID}  )   ORDER BY  ID   FOR XML PATH('')  ), 1, 1, '') AS ContainerNumbers");

                    objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt[i].ContainerTypes = temp;


               }
            }



                var QIDs = string.Join(",", objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt.Select(q => q.QuotationID));
            CCustomizedDBCall _quotationDates = new CCustomizedDBCall();
            dynamic QuotationDates;
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "BED")
            {
                var qDates = _quotationDates.ExecuteQuery_ListOfObjects($"select ID,CreationDate from Quotations WHERE ID IN ({QIDs})", typeof(CVarQuotations)).Cast<CVarQuotations>().ToList();
                QuotationDates = qDates.Select(q =>
                new {
                    ID = q.ID,
                    CreationDate = q.CreationDate
                }).ToList();
            }
            else
            {
                QuotationDates = new List<CVarQuotations>();
            }

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var QuotationChargesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
                "SELECT ID,QuotationRouteID,SalePrice,SaleCurrencyID,SaleCurrencyCode,CostPrice,CostCurrencyID,CostCurrencyCode FROM vwQuotationCharges "
                , typeof(CVarvwQuotationCharges)).Cast<CVarvwQuotationCharges>().ToList();
            QuotationChargesList = QuotationChargesList.Where(QC => objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt.Any(
                                QR => QR.ID == QC.QuotationRouteID
                                )).Cast<CVarvwQuotationCharges>().ToList();


            if (objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt.Count > 0 && checkException == null)
                pRecordsExist = true;

            int pCreatedCount = objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt.Where(w => w.QuotationStageID == 1).Count();
            int pAcceptedCount = objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt.Where(w => w.QuotationStageID == 4).Count();
            int pDeclinedCount = objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt.Where(w => w.QuotationStageID == 5).Count();
            int pApprovedCount = objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt.Where(w => w.QuotationStageID == 15).Count();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] 
            {
                pRecordsExist //data[0]
                , serializer.Serialize(objCvwQuotationRoute_rpt.lstCVarvwQuotationRoute_rpt) //data[1]
                , pCreatedCount //data[2]
                , pAcceptedCount //data[3]
                , pDeclinedCount //data[4]
                , pApprovedCount //data[5]
                , serializer.Serialize(QuotationChargesList) //data[6]
                , serializer.Serialize(QuotationDates) //data[7]
            };
        }
    }
}
