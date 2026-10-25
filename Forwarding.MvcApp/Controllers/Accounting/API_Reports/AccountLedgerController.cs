using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
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
    public class AccountLedgerController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            CvwA_Accounts objCvwA_AccountsGroups = new CvwA_Accounts();
            CvwA_Branches objCvwA_Branches = new CvwA_Branches();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();



            objCvwA_Accounts.GetListPaging(99999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            objCA_JournalTypes.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
            objCvwA_AccountsGroups.GetListPaging(99999, 1, "where ismain=1", "Name, Code", out _RowCount);
            objCvwA_Branches.GetListPaging(99999, 1, "WHERE 1=1", "Name, Code", out _RowCount);
            objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
                , serializer.Serialize(objCA_JournalTypes.lstCVarA_JournalTypes)
                , serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                ,serializer.Serialize(objCvwA_AccountsGroups.lstCVarvwA_Accounts)
                ,serializer.Serialize(objCvwA_Branches.lstCVarvwA_Branches)
            };
        }
        [HttpGet, HttpPost]
        public object[] FillSearchAccountControls(string WhereCondition)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            objCvwA_Accounts.GetListPaging(99999, 1, WhereCondition, "Name, Code", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
            };
        }


        //pPostStatus: 0:All 1:Posted 2:Unposted
        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pAccountIDList,string pBranchIDList, string pCostCenterIDList, string pJournalTypeIDList
            , string pFromDate, string pToDate, int pPostStatus, bool pIsGroupByCostCenter,bool pIsGroupByBranch,bool pWithOtherSide)
        {
            int _RowCount = 0;
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");

            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            pJournalTypeIDList = pJournalTypeIDList == "-1" ? "-1" : ("," + pJournalTypeIDList + ",");
            CvwStructure_SP_A_Ledger_Rep_E objCvwStructure_SP_A_Ledger_Rep_E = new CvwStructure_SP_A_Ledger_Rep_E();
            CvwStructure_Rep_A_LedgerSumCurrency objCvwStructure_Rep_A_LedgerSumCurrency = new CvwStructure_Rep_A_LedgerSumCurrency();
            CvwStructure_Rep_A_Ledger_Rep_E objCvwStructure_Rep_A_Ledger_Rep_E_CombinedByCostCenter = new CvwStructure_Rep_A_Ledger_Rep_E();
            CvwStructure_Rep_A_Ledger_RepByBranch objCvwStructure_Rep_A_Ledger_Rep_E_CombinedByBranch = new CvwStructure_Rep_A_Ledger_RepByBranch();

            if (pIsGroupByCostCenter)
                checkException = objCvwStructure_Rep_A_Ledger_Rep_E_CombinedByCostCenter.GetList(
                        "-1" //pJV_IDs
                        , "," + pAccountIDList + "," //pAccount_IDs
                        , "," + pCostCenterIDList + "," //pAccount_IDs
                        , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , -1 //pPosted
                        , false //pShowRevaluateEntry
                        , pJournalTypeIDList
                        , "," + pBranchIDList + ","
                        );
            else if (pIsGroupByBranch)
                {
                    checkException = objCvwStructure_Rep_A_Ledger_Rep_E_CombinedByBranch.GetList(
                         "-1" //pJV_IDs
                         , "," + pAccountIDList + "," //pAccount_IDs
                         , "," + pCostCenterIDList + "," //pAccount_IDs
                         , "," + pBranchIDList + "," //pBranchID
                         , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                         , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                         , -1 //pPosted
                         , false //pShowRevaluateEntry
                         , pJournalTypeIDList
                         );
                }
            else
            {
                checkException = objCvwStructure_SP_A_Ledger_Rep_E.GetList(
                        "-1" //pJV_IDs
                        , "," + pAccountIDList + "," //pAccount_IDs
                        , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , -1 //pPosted
                        , false //pShowRevaluateEntry
                        , pJournalTypeIDList
                        , "," + pBranchIDList + ","
                        , pWithOtherSide
                        );

                checkException = objCvwStructure_Rep_A_LedgerSumCurrency.GetList(
                 "," + pAccountIDList + "," //pAccount_IDs
               , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
               , pJournalTypeIDList
               , "," + pBranchIDList + ","
               );
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            if (pIsGroupByBranch)
            {
                return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                , pIsGroupByBranch ? serializer.Serialize(objCvwStructure_Rep_A_Ledger_Rep_E_CombinedByBranch.lstCVarvwStructure_Rep_A_Ledger_Rep_EByBranch)
                                          : serializer.Serialize(objCvwStructure_SP_A_Ledger_Rep_E.lstCVarvwStructure_SP_A_Ledger_Rep_E) //pAccountLedger = pData[1]
                                        ,serializer.Serialize(objCvwStructure_Rep_A_LedgerSumCurrency.lstCVarvwStructure_Rep_A_LedgerSumCurrency) //pSumAccountLedger = pData[2]
                };
            }
            else {
                return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                , pIsGroupByCostCenter ? serializer.Serialize(objCvwStructure_Rep_A_Ledger_Rep_E_CombinedByCostCenter.lstCVarvwStructure_Rep_A_Ledger_Rep_E)
              
                                          : serializer.Serialize(objCvwStructure_SP_A_Ledger_Rep_E.lstCVarvwStructure_SP_A_Ledger_Rep_E) //pAccountLedger = pData[1]
                                        ,serializer.Serialize(objCvwStructure_Rep_A_LedgerSumCurrency.lstCVarvwStructure_Rep_A_LedgerSumCurrency) //pSumAccountLedger = pData[2]
             };
            }
            
        }

    }
}
