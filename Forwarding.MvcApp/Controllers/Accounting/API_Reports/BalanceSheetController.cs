using Forwarding.MvcApp.Controllers.NoAccess;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
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
    public class BalanceSheetController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CvwA_Account_Levels objCvwA_Account_Levels = new CvwA_Account_Levels();
            objCvwA_Account_Levels.GetListPaging(99999, 1, "WHERE 1=1", "ID", out _RowCount);
            CCurrencies objCCurrencies = new CCurrencies();
            objCCurrencies.GetList(" Where 1=1");

            CvwA_Branches objCvwA_Branches = new CvwA_Branches();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();

            objCvwA_Branches.GetListPaging(99999, 1, "WHERE 1=1", "Name, Code", out _RowCount);
            objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                 serializer.Serialize(objCvwA_Account_Levels.lstCVarvwA_Account_Levels)
               , serializer.Serialize(objCCurrencies.lstCVarCurrencies)
               , serializer.Serialize(objCvwA_Branches.lstCVarvwA_Branches)
               , serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
            };
        }

        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pToDate, Int32 pAcc_Level, bool pSeeingInvisibleAccounts, string pCurrency, string pBranch_IDs,string pCostCenter_IDs)
        {
            int _RowCount = 0;
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            CvwStructure_SP_A_Rep_BalanceSheet_E objCvwStructure_SP_A_Rep_BalanceSheet_E = new CvwStructure_SP_A_Rep_BalanceSheet_E();
            CvwStructure_SP_A_Rep_BalanceSheet_E objCvwStructure_SP_A_Rep_BalanceSheet_EByCurrency = new CvwStructure_SP_A_Rep_BalanceSheet_E();
            CvwStructure_SP_A_Rep_BalanceSheetCostCenter_E objCvwStructure_SP_A_Rep_BalanceSheetCostCenter_E = new CvwStructure_SP_A_Rep_BalanceSheetCostCenter_E();

            if (pCostCenter_IDs == "-1")
            checkException = objCvwStructure_SP_A_Rep_BalanceSheet_E.GetList(
                DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , pAcc_Level
                , pSeeingInvisibleAccounts  //false
                , ","+ pBranch_IDs + ","
                );
            else
                checkException = objCvwStructure_SP_A_Rep_BalanceSheetCostCenter_E.GetList(
               DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
               , pAcc_Level
               , pSeeingInvisibleAccounts  //false
               , "," + pBranch_IDs + ","
                , "," + pCostCenter_IDs + ","
       );
                             


            checkException = objCvwStructure_SP_A_Rep_BalanceSheet_EByCurrency.GetListByCurrency(
                DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , pAcc_Level
                , pSeeingInvisibleAccounts  //false
                , pCurrency
                
                );
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                , pCostCenter_IDs == "-1" ? serializer.Serialize(objCvwStructure_SP_A_Rep_BalanceSheet_E.lstCVarvwStructure_SP_A_Rep_BalanceSheet_E)
                :serializer.Serialize(objCvwStructure_SP_A_Rep_BalanceSheetCostCenter_E.lstCVarvwStructure_SP_A_Rep_BalanceSheetCostCenter_E) //pTblRows = pData[1]
                , serializer.Serialize(objCvwStructure_SP_A_Rep_BalanceSheet_EByCurrency.lstCVarvwStructure_SP_A_Rep_BalanceSheet_E) //pTblRows = pData[2]
            };
        }

    }
}
