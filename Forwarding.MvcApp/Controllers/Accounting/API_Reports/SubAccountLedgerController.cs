using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Reports
{

    public class SubAccountLedgerController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillSearchControls(string glbCallingControl)
        {
            int _RowCount = 0;
            CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
            CvwA_SubAccounts objCvwA_SubAccounts_Groups = new CvwA_SubAccounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CCurrencies objCCurrency = new CCurrencies();
            CvwA_Branches objCvwA_Branches = new CvwA_Branches();

            string pWhereClause = "";
            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetItem(190);
            if (objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            { 
                pWhereClause += @"  cross apply(select distinct p.SubAccountID from vwA_UserSubAccountsGroupsPrivilege P join A_SubAccounts S2 on P.SubAccountID = S2.ID where
                        vwA_SubAccounts.SubAccount_Number like S2.RealSubAccountCode + '%' "   + " AND UserID=" + WebSecurity.CurrentUserId + ") as Privilege where IsMain = 1 " ;   
            }
            else
            {
                pWhereClause = "WHERE IsMain=1 ";
            }

            //objCvwA_SubAccounts.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            //objCvwA_SubAccounts_Groups.GetListPaging(99999, 1, "WHERE IsMain=1 " + (glbCallingControl == "AccountStatement" ? " AND SUBSTRING(RealSubAccountCode,1,1) IN (3,4) AND ID IN (SELECT SubAccount_ID from A_SubAccounts_Details)" : ""), "Name", out _RowCount);
            objCvwA_SubAccounts_Groups.GetListPaging(99999, 1,pWhereClause , "Name", out _RowCount);
            objCCurrency.GetListPaging(99999, 1, "WHERE 1=1", "Code", out _RowCount);
            objCvwA_Branches.GetListPaging(99999, 1, "WHERE 1=1", "Name, Code", out _RowCount);


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                   serializer.Serialize(objCvwA_SubAccounts.lstCVarvwA_SubAccounts)
                  , serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                  ,serializer.Serialize(objCvwA_SubAccounts_Groups.lstCVarvwA_SubAccounts)
                  ,serializer.Serialize(objCCurrency.lstCVarCurrencies)
                  , serializer.Serialize(objCvwA_Branches.lstCVarvwA_Branches)
            };
        }
        
        [HttpGet, HttpPost]
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

        //pPostStatus: 0:All 1:Posted 2:Unposted
        [HttpPost]
        public object[] GetPrintedData([FromBody] ParamGetPrintedData paramGetPrintedData)
        {
            int _RowCount = 0;

            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
           // objCvwRptHeaderDefaultTable.GetList("WHERE 1=1");
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1 = 1", "ID", out _RowCount);
            CvwStructure_Rep_A_SubAccounts_Ledger objCvwStructure_Rep_A_SubAccounts_Ledger = new CvwStructure_Rep_A_SubAccounts_Ledger();
            CvwStructure_Rep_A_SubAccounts_LedgerByCC objCvwStructure_Rep_A_SubAccounts_LedgerByCC = new CvwStructure_Rep_A_SubAccounts_LedgerByCC();
            CvwStructure_Rep_A_SubAccounts_LedgerByBranch objCvwStructure_Rep_A_SubAccounts_LedgerByBranch = new CvwStructure_Rep_A_SubAccounts_LedgerByBranch();
            CvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC = new CvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC();
            CvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByBranch objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByBranch = new CvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByBranch();
            CvwStructure_Rep_A_SubAccounts_LedgerSumCurrency objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrency = new CvwStructure_Rep_A_SubAccounts_LedgerSumCurrency();
            CvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency objCvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency = new CvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency();
            CvwStructure_Rep_A_SubAccounts_Statement objCvwStructure_Rep_A_SubAccounts_Statement = new CvwStructure_Rep_A_SubAccounts_Statement();
            CvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary objCvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary = new CvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary();
            CvwStructure_Rep_A_LedgerSumCurrencyByCC objCvwStructure_Rep_A_LedgerSumCurrencyByCC = new CvwStructure_Rep_A_LedgerSumCurrencyByCC();

            CGetA_AccountLinkSummary cGetA_AccountLinkSummary = new CGetA_AccountLinkSummary();
            CvwStructure_Rep_A_CostCenterProfit objCvwStructure_Rep_A_CostCenterProfit = new CvwStructure_Rep_A_CostCenterProfit();

            CvwStructure_Rep_A_SubAccounts_Statement_SEF objCvwStructure_Rep_A_SubAccounts_Statement_SEF = new CvwStructure_Rep_A_SubAccounts_Statement_SEF();
            CvwStructure_Rep_A_SubAccounts_Statement_Accrual objCvwStructure_Rep_A_SubAccounts_Statement_Accrual = new CvwStructure_Rep_A_SubAccounts_Statement_Accrual();
            CvwStructure_Rep_A_SubAccounts_Statement_UNF objCvwStructure_Rep_A_SubAccounts_Statement_UNF = new CvwStructure_Rep_A_SubAccounts_Statement_UNF();


            CvwStructure_Rep_A_SubAccounts_Ledger_AllCurrency objCvwStructure_Rep_A_SubAccounts_Ledger_AllCurrency = new CvwStructure_Rep_A_SubAccounts_Ledger_AllCurrency();

            if (paramGetPrintedData.pIsCostCenterProfit)
            {
                checkException = objCvwStructure_Rep_A_CostCenterProfit.GetList( paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs
           , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
            , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                );
            }
            else if (paramGetPrintedData.pIsSupplierSubAccountStatement > 0)
            {
                checkException = objCvwStructure_Rep_A_SubAccounts_Statement.GetList(
                       "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                                       , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , false
                , false //true: check if Freight World print agent statement has problem
                , paramGetPrintedData.pIsSupplierSubAccountStatement
                    );
            }
            else if (paramGetPrintedData.pIsCostCenterSummary)
            {
                checkException = objCvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.GetList(
                 paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                  , paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs
             , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
              , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
              , false
                  );

                 checkException = objCvwStructure_Rep_A_LedgerSumCurrencyByCC.GetList(
                 paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                , paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs                    
                , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                );

                checkException = cGetA_AccountLinkSummary.GetList(
                paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs                    
               , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
               );
            }
            else if (paramGetPrintedData.pIsAgentSubAccountStatment)
            {
                checkException = objCvwStructure_Rep_A_SubAccounts_Statement.GetList(
                       "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                                       , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , false
                , false //true: check if Freight World print agent statement has problem
                ,0
                    );
            }
            else if (paramGetPrintedData.pIsSubAccountStatment)
            {
                if (objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0].UnEditableCompanyName == "SEF")
                    checkException = objCvwStructure_Rep_A_SubAccounts_Statement_SEF.GetList(
                            "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                                            , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                     , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                     , false
                     , true
                     , 0
                         );

                else
                {
                    if (paramGetPrintedData.pIsAccrual )
                        checkException = objCvwStructure_Rep_A_SubAccounts_Statement_Accrual.GetList(
                                     "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                                                     , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                              , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                              , false
                              , true
                              , 0
                                  );
                    else if (paramGetPrintedData.pIsNewRep)
                        checkException = objCvwStructure_Rep_A_SubAccounts_Statement_UNF.GetList(
                                   "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                                                   , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                            , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                            , false
                            , true
                            , 0
                                );
                    else
                        checkException = objCvwStructure_Rep_A_SubAccounts_Statement.GetList(
                                   "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                                                   , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                            , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                            , false
                            , true
                            , 0
                                );
                }

            }
           else if (paramGetPrintedData.pIsByCurrency)
            {
                if(paramGetPrintedData.pCurrencyID == 0)
                {
                    checkException = objCvwStructure_Rep_A_SubAccounts_Ledger_AllCurrency.GetList(
                         "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                        , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                                                                                                                             //   , paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs

                        , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , paramGetPrintedData.pBranchIDList == null ? ",-1," : ("," + paramGetPrintedData.pBranchIDList + ",")
                        , paramGetPrintedData.pCostCenterIDList == null ? ",-1," : ("," + paramGetPrintedData.pCostCenterIDList + ",")
                        );
                }
                else
                { 
                    checkException = objCvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency.GetList(
                     "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                    , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                       //   , paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs

                    , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , paramGetPrintedData.pCurrencyID //pShowRevaluateEntry
                    , paramGetPrintedData.pBranchIDList == null ? ",-1," : ("," + paramGetPrintedData.pBranchIDList + ",")
                    , paramGetPrintedData.pCostCenterIDList == null ? ",-1," : ("," + paramGetPrintedData.pCostCenterIDList + ",")
                    );
                }


            }
            else if (!paramGetPrintedData.pIsGroupedByCostCenter)
            { 
             checkException = objCvwStructure_Rep_A_SubAccounts_Ledger.GetList(
                "-1" //pJV_IDs
                , "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                , false //pShowRevaluateEntry
                , paramGetPrintedData.pBranchIDList == null ? ",-1," : ("," + paramGetPrintedData.pBranchIDList + ",")
                );

                checkException = objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrency.GetList(   "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_ID
                       , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                            , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                            , paramGetPrintedData.pBranchIDList == null ? ",-1," : ("," + paramGetPrintedData.pBranchIDList + ",")
                    );
            }
            else if (paramGetPrintedData.pIsGroupedByBranch)
            {
                checkException = objCvwStructure_Rep_A_SubAccounts_LedgerByBranch.GetList(
                     "-1" //pJV_IDs
                     , "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                     , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                     , paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs
                     , paramGetPrintedData.pBranchIDList == null ? "-1" : ("," + paramGetPrintedData.pBranchIDList + ",") //pBranch_IDs
                     , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                     , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                     , false //pShowRevaluateEntry
                     );
                checkException = objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByBranch.GetList(
                    "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                    , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                    , paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs                    
                     , paramGetPrintedData.pBranchIDList == null ? "-1" : ("," + paramGetPrintedData.pBranchIDList + ",") //pCostCenter_IDs                    
                    , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    );
            }
            else
            {
                checkException = objCvwStructure_Rep_A_SubAccounts_LedgerByCC.GetList(
                    "-1" //pJV_IDs
                    , "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                    , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                    , paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs
                    , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , false //pShowRevaluateEntry
                    , paramGetPrintedData.pBranchIDList == null ? ",-1," : ("," + paramGetPrintedData.pBranchIDList + ",")
                    );
                checkException = objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.GetList(
                    "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                    , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                    , paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs                    
                    , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , paramGetPrintedData.pBranchIDList == null ? ",-1," : ("," + paramGetPrintedData.pBranchIDList + ",")
                    );
            }

            CBankTemplate objCBankTemplate = new CBankTemplate();
            if (paramGetPrintedData.pBankTemplateID != 0)
            {
                objCBankTemplate.GetList("WHERE ID=" + paramGetPrintedData.pBankTemplateID.ToString());
                //pBankDetailsTemplate = objCBankTemplate.lstCVarBankTemplate[0].Subject == "0" ? "" : objCBankTemplate.lstCVarBankTemplate[0].Subject;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            if (paramGetPrintedData.pIsGroupedByBranch)
            {
                return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                ,paramGetPrintedData.pIsByCurrency ?  null : !paramGetPrintedData.pIsGroupedByBranch ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Ledger.lstCVarvwStructure_Rep_A_SubAccounts_Ledger) : null //pTblRows = pData[1]
                ,paramGetPrintedData.pIsByCurrency ?  null : paramGetPrintedData.pIsGroupedByBranch ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerByBranch.lstCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch) : null //pTblRowsGroupByCostCenter = pData[2]
                ,paramGetPrintedData.pIsByCurrency ?  null : paramGetPrintedData.pIsGroupedByBranch   ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByBranch.lstCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByBranch) : null //pTblRowsGroupByCostCenterSum = pData[3]
                ,paramGetPrintedData.pIsByCurrency ?  null : !paramGetPrintedData.pIsGroupedByBranch ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrency.lstCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrency) : null //pTblRows = pData[4]
                ,paramGetPrintedData.pIsByCurrency ? ( paramGetPrintedData.pCurrencyID == 0 ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Ledger_AllCurrency.lstCVarvwStructure_Rep_A_SubAccounts_Ledger_AllCurrency ): serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency.lstCVarvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency) ):   null  //5
                ,(paramGetPrintedData.pIsSubAccountStatment || paramGetPrintedData.pIsAgentSubAccountStatment
                || paramGetPrintedData.pIsSupplierSubAccountStatement != 0) ?  serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Statement.lstCVarvwStructure_Rep_A_SubAccounts_Statement) :   null  //6
                ,paramGetPrintedData.pIsCostCenterSummary  ?  serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.lstCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary) :   null //7
                ,paramGetPrintedData.pIsCostCenterSummary  ? serializer.Serialize(objCvwStructure_Rep_A_LedgerSumCurrencyByCC.lstCVarvwStructure_Rep_A_LedgerSumCurrencyByCC) : null //8
                ,paramGetPrintedData.pIsCostCenterProfit ? serializer.Serialize(objCvwStructure_Rep_A_CostCenterProfit.lstCVarvwStructure_Rep_A_CostCenterProfit) : null // 9
                ,     new JavaScriptSerializer().Serialize(cGetA_AccountLinkSummary.lstCVarGetA_AccountLinkSummary) //10
                ,null
                ,new JavaScriptSerializer().Serialize(objCBankTemplate.lstCVarBankTemplate) //12
            };
            }
            else
            {
                return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                ,paramGetPrintedData.pIsByCurrency ?  null : !paramGetPrintedData.pIsGroupedByCostCenter ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Ledger.lstCVarvwStructure_Rep_A_SubAccounts_Ledger) : null //pTblRows = pData[1]
                ,paramGetPrintedData.pIsByCurrency ?  null : paramGetPrintedData.pIsGroupedByCostCenter ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerByCC.lstCVarvwStructure_Rep_A_SubAccounts_LedgerByCC) : null //pTblRowsGroupByCostCenter = pData[2]
                ,paramGetPrintedData.pIsByCurrency ?  null : paramGetPrintedData.pIsGroupedByCostCenter   ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.lstCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC) : null //pTblRowsGroupByCostCenterSum = pData[3]
                ,paramGetPrintedData.pIsByCurrency ?  null : !paramGetPrintedData.pIsGroupedByCostCenter ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrency.lstCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrency) : null //pTblRows = pData[4]
                ,paramGetPrintedData.pIsByCurrency ? ( paramGetPrintedData.pCurrencyID == 0 ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Ledger_AllCurrency.lstCVarvwStructure_Rep_A_SubAccounts_Ledger_AllCurrency ): serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency.lstCVarvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency) ):   null  //5
                ,(paramGetPrintedData.pIsSubAccountStatment || paramGetPrintedData.pIsAgentSubAccountStatment
                || paramGetPrintedData.pIsSupplierSubAccountStatement != 0) ?  serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Statement.lstCVarvwStructure_Rep_A_SubAccounts_Statement) :   null  //6
                ,paramGetPrintedData.pIsCostCenterSummary  ?  serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.lstCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary) :   null //7
                ,paramGetPrintedData.pIsCostCenterSummary  ? serializer.Serialize(objCvwStructure_Rep_A_LedgerSumCurrencyByCC.lstCVarvwStructure_Rep_A_LedgerSumCurrencyByCC) : null //8
                ,paramGetPrintedData.pIsCostCenterProfit ? serializer.Serialize(objCvwStructure_Rep_A_CostCenterProfit.lstCVarvwStructure_Rep_A_CostCenterProfit) : null // 9
                ,     new JavaScriptSerializer().Serialize(cGetA_AccountLinkSummary.lstCVarGetA_AccountLinkSummary) //10
                , serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Statement_SEF.lstCVarvwStructure_Rep_A_SubAccounts_Statement_SEF) //11
                ,new JavaScriptSerializer().Serialize(objCBankTemplate.lstCVarBankTemplate) //12
                , serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Statement_Accrual.lstCVarvwStructure_Rep_A_SubAccounts_Statement_Accrual) //13
                , serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Statement_UNF.lstCVarvwStructure_Rep_A_SubAccounts_Statement_UNF) //14
            };
            }
        }

    }

    public class ParamGetPrintedData
    {
        public string pSubAccountIDList { get; set; }
        public string pAccountIDList { get; set; }
        public string pCostCenterIDList { get; set; }
        public string pBranchIDList { get; set; }
        public string pFromDate { get; set; }
        public string pToDate { get; set; }
        public int pPostStatus { get; set; }
        public bool pIsGroupedByCostCenter { get; set; }
        public bool pIsGroupedByBranch { get; set; }
        public bool pIsByCurrency { get; set; }

        public bool pIsSubAccountStatment { get; set; }

        public bool pIsAgentSubAccountStatment { get; set; }

        public int pCurrencyID { get; set; }

        public bool pIsCostCenterSummary { get; set; }

        public bool pIsCostCenterProfit{ get; set; }

        public int pIsSupplierSubAccountStatement { get; set; }
        public int pBankTemplateID { get; set; }
        public bool pIsAccrual { get; set; }
        public bool pIsNewRep { get; set; }

    }
}
