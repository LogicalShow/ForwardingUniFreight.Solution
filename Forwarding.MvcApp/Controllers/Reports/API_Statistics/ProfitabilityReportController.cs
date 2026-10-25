using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Globalization;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class ProfitabilityReportController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] GetStatisticsFilter()
        {
            int _RowCount = 0;


            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");
            CvwChargeTypesWithMinimalColumns objCvwchargetypes = new CvwChargeTypesWithMinimalColumns();
            objCvwchargetypes.GetList(" WHERE 1=1 ORDER BY Name ");

         
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            objCvwA_CostCenters.GetList("WHERE IsMain=0");

            return new object[] { 
                new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches) //data[0]
                , new JavaScriptSerializer().Serialize(objCvwchargetypes.lstCVarvwChargeTypesWithMinimalColumns) //data[1]
                , new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)//data[2]

            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(Int32 pBranchID, Int32 pChargeTypeID, string pFromDate, string pToDate,string pCostCenterIDs)
        {
            bool pRecordsExist = false;
            Exception checkException = null;

            CvwStructureProfitabilityReport objCProfitabilityReport = new CvwStructureProfitabilityReport();
            CvwStructureProfitabilityByCostCenterReport objCvwStructureProfitabilityByCostCenterReport = new CvwStructureProfitabilityByCostCenterReport();

            if (pCostCenterIDs == "0")
            checkException = objCProfitabilityReport.GetList(pBranchID, pChargeTypeID, DateTime.ParseExact(pFromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture), DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture));
            else
                checkException = objCvwStructureProfitabilityByCostCenterReport.GetList(pBranchID, pChargeTypeID, DateTime.ParseExact(pFromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture),
                    DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture),"," + pCostCenterIDs + ",");


            if ((objCProfitabilityReport.lstCVarvwStructureProfitabilityReport.Count > 0   || objCvwStructureProfitabilityByCostCenterReport.lstCVarvwStructureProfitabilityByCostCenterReport.Count > 0)
                && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] 
            {
                pRecordsExist //data[0]
                ,pCostCenterIDs == "0" ? serializer.Serialize(objCProfitabilityReport.lstCVarvwStructureProfitabilityReport)
                :  serializer.Serialize(objCvwStructureProfitabilityByCostCenterReport.lstCVarvwStructureProfitabilityByCostCenterReport)//data[1]
            };
        }

      
    }
}
