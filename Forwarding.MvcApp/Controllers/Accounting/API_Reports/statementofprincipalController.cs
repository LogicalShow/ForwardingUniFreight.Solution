using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Reports
{
    public class statementofprincipalController : ApiController
    {

        
        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
            CvwA_SubAccounts objCvwA_SubAccounts_Groups = new CvwA_SubAccounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CCurrencies objCCurrency = new CCurrencies();
            Cvw_A_AcivityCenter ObjCVarvw_A_AcivityCenter = new Cvw_A_AcivityCenter();
            CvwA_ETA_Port ObjCVarvw_A_AcivityPort = new CvwA_ETA_Port();

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
            objCvwA_SubAccounts.GetListPaging(9999, 1, pWhereClauseSubAccount, "Name", out _RowCount);


            //objCvwA_SubAccounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            objCvwA_SubAccounts_Groups.GetListPaging(9999, 1, "WHERE IsMain=1", "Name", out _RowCount);
            objCCurrency.GetListPaging(9999, 1, "WHERE 1=1", "Code", out _RowCount);
            ObjCVarvw_A_AcivityCenter.GetListPaging(9999, 1, "WHERE 1=1", "EnName", out _RowCount);
            ObjCVarvw_A_AcivityPort.GetListPaging(9999, 1, "WHERE 1=1", "EnName", out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwA_SubAccounts.lstCVarvwA_SubAccounts)
                , new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                , new JavaScriptSerializer().Serialize(objCvwA_SubAccounts_Groups.lstCVarvwA_SubAccounts)
                , new JavaScriptSerializer().Serialize(objCCurrency.lstCVarCurrencies)
                , new JavaScriptSerializer().Serialize(ObjCVarvw_A_AcivityCenter.lstCVarvw_A_AcivityCenter)
                , new JavaScriptSerializer().Serialize(ObjCVarvw_A_AcivityPort.lstCVarvwA_ETA_Port)

            };
        }

    }
    public class ParamGetPrintedDatastatementofprincipal
    {
        public string pIsGroupedByCostCenter { get; set; }
        public string pIsGroupByJob { get; set; }
        public string pCurrencyID { get; set; }


        public string pSubAccountIDList { get; set; }
        public string pSubAccountNumber { get; set; }

        public string pDate { get; set; }
        public string pAccountIDList { get; set; }
        public string pSuppressReverseJVs { get; set; }
        public string pFromDate { get; set; }
        public string pToDate { get; set; }
        public string pIsByCurrency { get; set; }
        public string pCostCenterIDList { get; set; }
        public string pJobIDList { get; set; }

        






        public bool pHideZeroes { get; set; }
        public bool phideAsEgp { get; set; }

    }
}
