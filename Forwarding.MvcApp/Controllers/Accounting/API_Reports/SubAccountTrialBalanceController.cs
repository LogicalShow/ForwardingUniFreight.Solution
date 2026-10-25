using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
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
    public class SubAccountTrialBalanceController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
            CvwA_SubAccounts objCvwA_SubAccounts_Groups = new CvwA_SubAccounts();
            CCurrencies objCCurrency = new CCurrencies();
            objCCurrency.GetListPaging(99999, 1, "WHERE 1=1", "Code", out _RowCount);
            objCvwA_SubAccounts.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            objCvwA_SubAccounts_Groups.GetListPaging(99999, 1, "WHERE IsMain=1", "Name", out _RowCount);


            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                serializer.Serialize(objCvwA_SubAccounts.lstCVarvwA_SubAccounts)
                , serializer.Serialize(objCvwA_SubAccounts_Groups.lstCVarvwA_SubAccounts)
                ,serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                , serializer.Serialize(objCvwBranches.lstCVarvwBranches)
                , serializer.Serialize(objCCurrency.lstCVarCurrencies)
            };
        }

        [HttpGet]
        public object[] SubAccountGroupChanged(Int32 pSubAccountID)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
            CvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID objCvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID = new CvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID();
            string pWhereClauseSubAccount = "WHERE IsMain=0 ";
            if (pSubAccountID != 0)
            {
                checkException = objCvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID.GetList(pSubAccountID);
                objCvwA_SubAccounts.GetList("WHERE ID=" + pSubAccountID);
                if (objCvwA_SubAccounts.lstCVarvwA_SubAccounts.Count > 0)
                    pWhereClauseSubAccount += " AND SubAccount_Number like N'" + objCvwA_SubAccounts.lstCVarvwA_SubAccounts[0].RealSubAccountCode + "%'";
            }

            objCvwA_SubAccounts.GetListPaging(99999, 1, pWhereClauseSubAccount, "Name", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]{
                  serializer.Serialize(objCvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID.lstCVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID) //pAccounts
                , serializer.Serialize(objCvwA_SubAccounts.lstCVarvwA_SubAccounts) //pSubAccounts
            };
        }

        [HttpGet, HttpPost]
        public object[] GetPrintedData([FromBody] ParamGetPrintedDataSubTrial paramGetPrintedDataSubTrial)
        {
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
            int _RowCount = 0;
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            CvwStructure_Rep_A_SubAccounts_TrialBalance_E objCvwStructure_Rep_A_SubAccounts_TrialBalance_E = new CvwStructure_Rep_A_SubAccounts_TrialBalance_E();
            CvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E objCvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E = new CvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E();
            if (paramGetPrintedDataSubTrial.pcheck==0)
            {
                checkException = objCvwStructure_Rep_A_SubAccounts_TrialBalance_E.GetListByCurrency(
                                             "," + paramGetPrintedDataSubTrial.pSubAccountIDList + ","
                                             , paramGetPrintedDataSubTrial.pAccountIDList == "-1" ? "-1" : ("," + paramGetPrintedDataSubTrial.pAccountIDList + ",")
                                             , "-1" //pJV_IDs
                                             , DateTime.ParseExact(paramGetPrintedDataSubTrial.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                                             , DateTime.ParseExact(paramGetPrintedDataSubTrial.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                                             , -1 //pOrdering
                                             , paramGetPrintedDataSubTrial.pCurrency
                                             );
            }
            else
            {
                if (paramGetPrintedDataSubTrial.pCostCenter_IDs == "0")
                {
                    checkException = objCvwStructure_Rep_A_SubAccounts_TrialBalance_E.GetList(
                            "," + paramGetPrintedDataSubTrial.pSubAccountIDList + ","
                            , paramGetPrintedDataSubTrial.pAccountIDList == "-1" ? "-1" : ("," + paramGetPrintedDataSubTrial.pAccountIDList + ",")
                            , "-1" //pJV_IDs
                            , DateTime.ParseExact(paramGetPrintedDataSubTrial.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                            , DateTime.ParseExact(paramGetPrintedDataSubTrial.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                            , -1 //pOrdering
                            , "," + paramGetPrintedDataSubTrial.pBranche_IDs + ","
                            );
                }
                else
                {
                    checkException = objCvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.GetList(
            "," + paramGetPrintedDataSubTrial.pSubAccountIDList + ","
            , paramGetPrintedDataSubTrial.pAccountIDList == "-1" ? "-1" : ("," + paramGetPrintedDataSubTrial.pAccountIDList + ",")
            , "-1" //pJV_IDs
            , DateTime.ParseExact(paramGetPrintedDataSubTrial.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
            , DateTime.ParseExact(paramGetPrintedDataSubTrial.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
            , -1 //pOrdering
            , paramGetPrintedDataSubTrial.pCostCenter_IDs == "-1" ? ",-1," : ("," + paramGetPrintedDataSubTrial.pCostCenter_IDs + ",")
            , "," + paramGetPrintedDataSubTrial.pBranche_IDs + ","
            );
                }
            }
           

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                , serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_TrialBalance_E.lstCVarvwStructure_Rep_A_SubAccounts_TrialBalance_E) //pTrialBalance = pData[1]
                ,serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E.lstCVarvwStructure_Rep_A_SubAccounts_TrialBalance_ByCostCenter_E) //pTrialBalance = pData[2]
            };
        }

    }
    public class ParamGetPrintedDataSubTrial
    {

        public string pSubAccountIDList { get; set; }
        public string pAccountIDList { get; set; }
        public string pFromDate { get; set; }
        public string pToDate { get; set; }
        public int pPostStatus { get; set; }
        public string pBranche_IDs { get; set; }
        public string pCostCenter_IDs { get; set; }
        public Int32 pCurrency { get; set; }
        public int pcheck { get; set; }

    }
}
