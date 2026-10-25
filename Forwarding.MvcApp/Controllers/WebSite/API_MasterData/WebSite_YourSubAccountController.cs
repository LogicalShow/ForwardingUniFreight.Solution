using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.FA.Generated;
using Forwarding.MvcApp.Models.WebSite.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using System.Globalization;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class WebSite_YourSubAccountController : ApiController
    {

            [HttpGet, HttpPost]
            public object[] FillSearchControls(string glbCallingControl)
            {
                int _RowCount = 0;
                CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
                CvwA_SubAccounts objCvwA_SubAccounts_Groups = new CvwA_SubAccounts();
                CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
                CCurrencies objCCurrency = new CCurrencies();

                //objCvwA_SubAccounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name", out _RowCount);
                objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name", out _RowCount);
                //objCvwA_SubAccounts_Groups.GetListPaging(9999, 1, "WHERE IsMain=1 " + (glbCallingControl == "AccountStatement" ? " AND SUBSTRING(RealSubAccountCode,1,1) IN (3,4) AND ID IN (SELECT SubAccount_ID from A_SubAccounts_Details)" : ""), "Name", out _RowCount);
                objCvwA_SubAccounts_Groups.GetListPaging(9999, 1, "WHERE IsMain=1 ", "Name", out _RowCount);
                objCCurrency.GetListPaging(9999, 1, "WHERE 1=1", "Code", out _RowCount);

                return new object[] {
                new JavaScriptSerializer().Serialize(objCvwA_SubAccounts.lstCVarvwA_SubAccounts)
                , new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                , new JavaScriptSerializer().Serialize(objCvwA_SubAccounts_Groups.lstCVarvwA_SubAccounts)
                  , new JavaScriptSerializer().Serialize(objCCurrency.lstCVarCurrencies)
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

                objCvwA_SubAccounts.GetListPaging(9999, 1, pWhereClauseSubAccount, "Name", out _RowCount);
                return new object[]{
                new JavaScriptSerializer().Serialize(objCvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID.lstCVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID) //pAccounts
                , new JavaScriptSerializer().Serialize(objCvwA_SubAccounts.lstCVarvwA_SubAccounts) //pSubAccounts
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
                CvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC = new CvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC();
                CvwStructure_Rep_A_SubAccounts_LedgerSumCurrency objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrency = new CvwStructure_Rep_A_SubAccounts_LedgerSumCurrency();
                CvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency objCvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency = new CvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency();
                CvwStructure_Rep_A_SubAccounts_Statement objCvwStructure_Rep_A_SubAccounts_Statement = new CvwStructure_Rep_A_SubAccounts_Statement();
                CvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary objCvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary = new CvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary();
                CvwStructure_Rep_A_LedgerSumCurrencyByCC objCvwStructure_Rep_A_LedgerSumCurrencyByCC = new CvwStructure_Rep_A_LedgerSumCurrencyByCC();

                CGetA_AccountLinkSummary cGetA_AccountLinkSummary = new CGetA_AccountLinkSummary();
                CvwStructure_Rep_A_CostCenterProfit objCvwStructure_Rep_A_CostCenterProfit = new CvwStructure_Rep_A_CostCenterProfit();

                if (paramGetPrintedData.pIsCostCenterProfit)
                {
                    checkException = objCvwStructure_Rep_A_CostCenterProfit.GetList(paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs
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
                    , 0
                        );
                }
                else if (paramGetPrintedData.pIsSubAccountStatment)
                {
                    checkException = objCvwStructure_Rep_A_SubAccounts_Statement.GetList(
                           "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                                           , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , false
                    , true
                    , 0
                        );
                }
                else if (paramGetPrintedData.pIsByCurrency)
                {

                    checkException = objCvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency.GetList(
                     "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                    , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                    , DateTime.ParseExact(paramGetPrintedData.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , paramGetPrintedData.pCurrencyID //pShowRevaluateEntry
                    ,",-1,"
                     , ",-1,"
                    );
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
                        ,  ",-1," 
                        );

                    checkException = objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrency.GetList("," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_ID
                           , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                                , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                                ,",-1,"
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
                        ,",-1,"
                        );
                    checkException = objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.GetList(
                        "," + paramGetPrintedData.pSubAccountIDList + "," //pSubAccount_IDs
                        , paramGetPrintedData.pAccountIDList == "" ? "-1" : ("," + paramGetPrintedData.pAccountIDList + ",") //pAccount_IDs
                        , paramGetPrintedData.pCostCenterIDList == null ? "-1" : ("," + paramGetPrintedData.pCostCenterIDList + ",") //pCostCenter_IDs                    
                        , DateTime.ParseExact(paramGetPrintedData.pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        ,",-1,"
                        );
                }
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                ,paramGetPrintedData.pIsByCurrency ?  null : !paramGetPrintedData.pIsGroupedByCostCenter ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Ledger.lstCVarvwStructure_Rep_A_SubAccounts_Ledger) : null //pTblRows = pData[1]
                ,paramGetPrintedData.pIsByCurrency ?  null : paramGetPrintedData.pIsGroupedByCostCenter ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerByCC.lstCVarvwStructure_Rep_A_SubAccounts_LedgerByCC) : null //pTblRowsGroupByCostCenter = pData[2]
                ,paramGetPrintedData.pIsByCurrency ?  null : paramGetPrintedData.pIsGroupedByCostCenter   ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC.lstCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrencyByCC) : null //pTblRowsGroupByCostCenterSum = pData[3]
                ,paramGetPrintedData.pIsByCurrency ?  null : !paramGetPrintedData.pIsGroupedByCostCenter ? serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerSumCurrency.lstCVarvwStructure_Rep_A_SubAccounts_LedgerSumCurrency) : null //pTblRows = pData[4]
                ,paramGetPrintedData.pIsByCurrency ?  serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency.lstCVarvwStructure_Rep_A_SubAccounts_Ledger_OneCurrency) :   null  //5
                ,(paramGetPrintedData.pIsSubAccountStatment || paramGetPrintedData.pIsAgentSubAccountStatment
                || paramGetPrintedData.pIsSupplierSubAccountStatement != 0) ?  serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_Statement.lstCVarvwStructure_Rep_A_SubAccounts_Statement) :   null  //6
                ,paramGetPrintedData.pIsCostCenterSummary  ?  serializer.Serialize(objCvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary.lstCVarvwStructure_Rep_A_SubAccounts_LedgerByCC_Summary) :   null //7
                ,paramGetPrintedData.pIsCostCenterSummary  ? serializer.Serialize(objCvwStructure_Rep_A_LedgerSumCurrencyByCC.lstCVarvwStructure_Rep_A_LedgerSumCurrencyByCC) : null //8
                ,paramGetPrintedData.pIsCostCenterProfit ? serializer.Serialize(objCvwStructure_Rep_A_CostCenterProfit.lstCVarvwStructure_Rep_A_CostCenterProfit) : null // 9
                ,     new JavaScriptSerializer().Serialize(cGetA_AccountLinkSummary.lstCVarGetA_AccountLinkSummary) //10
            };
            }

        }

        public class ParamGetPrintedData
        {
            public string pSubAccountIDList { get; set; }
            public string pAccountIDList { get; set; }
            public string pCostCenterIDList { get; set; }
            public string pFromDate { get; set; }
            public string pToDate { get; set; }
            public int pPostStatus { get; set; }
            public bool pIsGroupedByCostCenter { get; set; }
            public bool pIsByCurrency { get; set; }

            public bool pIsSubAccountStatment { get; set; }

            public bool pIsAgentSubAccountStatment { get; set; }

            public int pCurrencyID { get; set; }

            public bool pIsCostCenterSummary { get; set; }

            public bool pIsCostCenterProfit { get; set; }

            public int pIsSupplierSubAccountStatement { get; set; }
        }

    
}
