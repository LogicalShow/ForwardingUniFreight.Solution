using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
//using Forwarding.MvcApp.Models.DAS.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Shipping.MvcApp.Models.ReportViews;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Reports
{
    public class JobSummeryController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CvwA_Accounts objCvwMainA_Accounts = new CvwA_Accounts();
            CvwA_DAS_DisbursementJobs objCvwDAS_DisbursementJobs = new CvwA_DAS_DisbursementJobs();
            CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
            Cvw_A_AcivityCenter ObjCVarvw_A_AcivityCenter = new Cvw_A_AcivityCenter();
            CvwA_ETA_Port ObjCVarvw_A_AcivityPort = new CvwA_ETA_Port();
            CDAS_VesselForJobSummery objDAS_Vessels = new CDAS_VesselForJobSummery();
            CvwVesselForAcc objCvwVesselForAcc = new CvwVesselForAcc();
            CCurrencies objCCurrency = new CCurrencies();
            CvwA_SubAccounts objCvwA_SubAccountsGroup = new CvwA_SubAccounts();
            var pSubAccountID = 4;
            //CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
            CvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupIDStructure objCvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupIDStructure = new CvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupIDStructure();
            string pWhereClauseSubAccount = "WHERE IsMain=0 ";
            if (pSubAccountID != 0)
            {
                objCvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupIDStructure.GetList(pSubAccountID);
                objCvwA_SubAccounts.GetList("WHERE ID=" + pSubAccountID);
                if (objCvwA_SubAccounts.lstCVarvwA_SubAccounts.Count > 0)
                    pWhereClauseSubAccount += " AND SubAccount_Number like N'" + objCvwA_SubAccounts.lstCVarvwA_SubAccounts[0].RealSubAccountCode + "%'";
            }
            objCvwA_SubAccountsGroup.GetListPaging(9999, 1, pWhereClauseSubAccount, "Name", out _RowCount);


            objCCurrency.GetListPaging(9999, 1, "WHERE 1=1", "Code", out _RowCount);

            objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            objCvwMainA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=1", "Name, Code", out _RowCount);
            objCvwDAS_DisbursementJobs.GetListPaging(9999, 1, "WHERE 1=1", "JobNumber", out _RowCount);
            objCvwA_SubAccounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            ObjCVarvw_A_AcivityCenter.GetListPaging(9999, 1, "WHERE 1=1", "EnName", out _RowCount);
            ObjCVarvw_A_AcivityPort.GetListPaging(9999, 1, "WHERE 1=1", "EnName", out _RowCount);
            objDAS_Vessels.GetListPaging(10000, 1, " where 1=1 ", "Name ", out _RowCount);
            objCvwVesselForAcc.GetListPaging(10000, 1, " where 1=1 ", "Name ", out _RowCount);


            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
                , new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                , new JavaScriptSerializer().Serialize(objCvwMainA_Accounts.lstCVarvwA_Accounts)
                , new JavaScriptSerializer().Serialize(objCvwDAS_DisbursementJobs.lstCVarvwA_DAS_DisbursementJobs)
                , new JavaScriptSerializer().Serialize(objCvwA_SubAccounts.lstCVarvwA_SubAccounts)
                , new JavaScriptSerializer().Serialize(ObjCVarvw_A_AcivityCenter.lstCVarvw_A_AcivityCenter)
                 , new JavaScriptSerializer().Serialize(ObjCVarvw_A_AcivityPort.lstCVarvwA_ETA_Port)
                 , new JavaScriptSerializer().Serialize(objDAS_Vessels.lstCVarDAS_VesselForJobSummery)
                 , new JavaScriptSerializer().Serialize(objCvwVesselForAcc.lstCVarvwVesselForAcc)
                 , new JavaScriptSerializer().Serialize(objCvwA_SubAccountsGroup.lstCVarvwA_SubAccounts)
                ,  new JavaScriptSerializer().Serialize(objCCurrency.lstCVarCurrencies)

            };
        }

        [HttpGet, HttpPost]
        public object[] FillSearchControlsWhere(string pWhereClause,Int32 pID)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CvwA_Accounts objCvwMainA_Accounts = new CvwA_Accounts();
            CvwA_DAS_DisbursementJobs objCvwDAS_DisbursementJobs = new CvwA_DAS_DisbursementJobs();
            CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
            Cvw_A_AcivityCenter ObjCVarvw_A_AcivityCenter = new Cvw_A_AcivityCenter();
            CvwA_ETA_Port ObjCVarvw_A_AcivityPort = new CvwA_ETA_Port();
            CDAS_VesselForJobSummery objDAS_Vessels = new CDAS_VesselForJobSummery();
            CA_LinkJobWithAcc objCA_LinkJobWithAcc = new CA_LinkJobWithAcc();
            objCA_LinkJobWithAcc.GetList("WHERE Type=7 AND TypeName='jvmanual' AND TransID=" + pID);

            objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            objCvwMainA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=1", "Name, Code", out _RowCount);

            if (objCA_LinkJobWithAcc.lstCVarA_LinkJobWithAcc.Count>0)
            {
                objCvwDAS_DisbursementJobs.GetListPaging(9999, 1, "where DisbursementJob_ID="+ objCA_LinkJobWithAcc.lstCVarA_LinkJobWithAcc[0].JobID, "JobNumber", out _RowCount);

            }
            else
            {
                objCvwDAS_DisbursementJobs.GetListPaging(9999, 1, pWhereClause, "JobNumber", out _RowCount);

            }
            objCvwA_SubAccounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            ObjCVarvw_A_AcivityCenter.GetListPaging(9999, 1, "WHERE 1=1", "EnName", out _RowCount);
            ObjCVarvw_A_AcivityPort.GetListPaging(9999, 1, "WHERE 1=1", "EnName", out _RowCount);
            objDAS_Vessels.GetListPaging(10000, 1, pWhereClause, "Name ", out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
                , new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                , new JavaScriptSerializer().Serialize(objCvwMainA_Accounts.lstCVarvwA_Accounts)
                , new JavaScriptSerializer().Serialize(objCvwDAS_DisbursementJobs.lstCVarvwA_DAS_DisbursementJobs)
                , new JavaScriptSerializer().Serialize(objCvwA_SubAccounts.lstCVarvwA_SubAccounts)
                , new JavaScriptSerializer().Serialize(ObjCVarvw_A_AcivityCenter.lstCVarvw_A_AcivityCenter)
                 , new JavaScriptSerializer().Serialize(ObjCVarvw_A_AcivityPort.lstCVarvwA_ETA_Port)
                 , new JavaScriptSerializer().Serialize(objDAS_Vessels.lstCVarDAS_VesselForJobSummery)
            };
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedJobSummery(
         string pActivityCenterIDs, string pActivityPortIDs, string pVesselIDs)
        {
            Exception checkException = null;
            CvwA_GetJobsByPortAndAcivityCenter objCvwA_CostCenters = new CvwA_GetJobsByPortAndAcivityCenter();
            checkException = objCvwA_CostCenters.GetListJobSumeryJob("," + pActivityCenterIDs + ",", "," + pActivityPortIDs + ",", "," + pVesselIDs + ",");

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_GetJobsByPortAndAcivityCenter)
            };
        }

    }
}
