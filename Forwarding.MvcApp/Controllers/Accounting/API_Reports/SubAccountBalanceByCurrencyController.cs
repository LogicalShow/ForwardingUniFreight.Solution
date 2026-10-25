
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
    public class SubAccountBalanceByCurrencyController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
            CvwA_SubAccounts objCvwA_SubAccounts_Groups = new CvwA_SubAccounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();

            objCvwA_SubAccounts.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            // objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);
            objCvwA_SubAccounts_Groups.GetListPaging(99999, 1, "WHERE IsMain=1", "Name", out _RowCount);

            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            objCvwA_CostCenters.GetList("WHERE IsMain=0");


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
               serializer.Serialize(objCvwA_SubAccounts.lstCVarvwA_SubAccounts)
                ,serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                , serializer.Serialize(objCvwA_SubAccounts_Groups.lstCVarvwA_SubAccounts)
                , serializer.Serialize(objCvwBranches.lstCVarvwBranches)

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
        //      [HttpGet, HttpPost]
        //      public object[] GetPrintedData(string pSubAccountIDList, string pSubAccountNumber, string pDate, string pAccountIDList,
        //bool pHideZeroes, bool phideAsEgp)
        //      {
        //          Exception checkException = null;
        //          CDefaults objCDefaults = new CDefaults();
        //          objCDefaults.GetList("WHERE 1=1");
        //          CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
        //          objCvwRptHeaderDefaultTable.GetList("WHERE 1=1");

        //          CvwStructure_SP_A_SubAccount_BalnceByCurrency objCvwStructure_SP_A_SubAccount_BalnceByCurrency = new CvwStructure_SP_A_SubAccount_BalnceByCurrency();

        //          if (!pIsGroupedByCostCenter)
        //              checkException = objCvwStructure_SP_A_SubAccount_BalnceByCurrency.GetList(
        //                  "," + pSubAccountIDList + "," //pSubAccount_IDs
        //                  , pSubAccountNumber == null ? "-1" : pSubAccountNumber
        //                    , DateTime.ParseExact(pDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
        //                  , pAccountIDList == "-1" ? "-1" : ("," + pAccountIDList + ",") //pAccount_IDs
        //                  , false
        //                  , false
        //                  );

        //          var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //          return new object[] {
        //              new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
        //              new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0])//pDefaultsHeader = pData[0]
        //              ,serializer.Serialize(objCvwStructure_SP_A_SubAccount_BalnceByCurrency.lstCVarvwStructure_SP_A_SubAccount_BalnceByCurrency)
        //          };
        //      }
        //  }
        // pPostStatus: 0:All 1:Posted 2:Unposted
        [HttpGet, HttpPost]
        public object[] GetPrintedData([FromBody] ParamGetPrintedDataBalance paramGetPrintedDataBalance)
        {
            int _RowCount = 0;
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            CvwStructure_SP_A_SubAccount_BalnceByCurrency objCvwStructure_SP_A_SubAccount_BalnceByCurrency = new CvwStructure_SP_A_SubAccount_BalnceByCurrency();
            CvwStructure_SP_A_SubAccount_BalanceByMultiCurrency objCvwStructure_SP_A_SubAccount_BalanceByMultiCurrency = new CvwStructure_SP_A_SubAccount_BalanceByMultiCurrency();
            CvwCurrencies objCCurrency = new CvwCurrencies();
            objCCurrency.GetListPaging(99999, 1, "WHERE 1=1", "Code", out _RowCount);
            CvwSP_A_SubAccount_BalanceByCustomers objCvwSP_A_SubAccount_BalanceByCustomers = new CvwSP_A_SubAccount_BalanceByCustomers();
            CvwSP_A_SubAccount_PaymentByCustomers objCvwSP_A_SubAccount_PaymentByCustomers = new CvwSP_A_SubAccount_PaymentByCustomers();

            if (paramGetPrintedDataBalance.pIsMultiCurrency)
            {
                checkException = objCvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.GetList(
                        "," + paramGetPrintedDataBalance.pSubAccountIDList + "," //pSubAccount_IDs
                         , DateTime.ParseExact(paramGetPrintedDataBalance.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                         , DateTime.ParseExact(paramGetPrintedDataBalance.pDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                       , paramGetPrintedDataBalance.pHideZeroes
                         , paramGetPrintedDataBalance.pIsOpeningJV
                        );


                if (paramGetPrintedDataBalance.pIShowUnPaidInvoices)
                {
                    checkException = objCvwSP_A_SubAccount_BalanceByCustomers.GetList(
                                              "," + paramGetPrintedDataBalance.pSubAccountIDList + "," //pSubAccount_IDs
                           , DateTime.ParseExact(paramGetPrintedDataBalance.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                           , DateTime.ParseExact(paramGetPrintedDataBalance.pDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)

                      );
                    checkException = objCvwSP_A_SubAccount_PaymentByCustomers.GetList(
                          "," + paramGetPrintedDataBalance.pSubAccountIDList + "," //pSubAccount_IDs
                           , DateTime.ParseExact(paramGetPrintedDataBalance.pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                           , DateTime.ParseExact(paramGetPrintedDataBalance.pDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)

                      );
                }



            }
            else
            {
                checkException = objCvwStructure_SP_A_SubAccount_BalnceByCurrency.GetList(
                        "," + paramGetPrintedDataBalance.pSubAccountIDList + "," //pSubAccount_IDs
                        , paramGetPrintedDataBalance.pSubAccountNumber == null ? "-1" : paramGetPrintedDataBalance.pSubAccountNumber
                          , DateTime.ParseExact(paramGetPrintedDataBalance.pDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , paramGetPrintedDataBalance.pAccountIDList == "-1" ? "-1" : ("," + paramGetPrintedDataBalance.pAccountIDList + ",") //pAccount_IDs
                        , paramGetPrintedDataBalance.pHideZeroes
                        , false
                        //, "," + paramGetPrintedDataBalance.pCostCenterIDList + ","
                        //, "," + paramGetPrintedDataBalance.pBranchIDList + ","
                        );
            }


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
            //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
            new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0])//pDefaultsHeader = pData[0]
            ,serializer.Serialize(objCvwStructure_SP_A_SubAccount_BalnceByCurrency.lstCVarvwStructure_SP_A_SubAccount_BalnceByCurrency)  //pData[1]
            ,serializer.Serialize(objCvwStructure_SP_A_SubAccount_BalanceByMultiCurrency.lstCVarvwStructure_SP_A_SubAccount_BalanceByMultiCurrency)  //pData[2]
            ,serializer.Serialize(objCCurrency.lstCVarvwCurrencies) //pData[3]
            ,serializer.Serialize(objCvwSP_A_SubAccount_BalanceByCustomers.lstCVarvwSP_A_SubAccount_BalanceByCustomers) //pData[4]
            ,serializer.Serialize(objCvwSP_A_SubAccount_PaymentByCustomers.lstCVarvwSP_A_SubAccount_PaymentByCustomers) //pData[5]
        };
        }
    }
    public class ParamGetPrintedDataBalance
    {

        public string pSubAccountIDList { get; set; }
        public string pSubAccountNumber { get; set; }
        public string pFromDate { get; set; }
        public string pDate { get; set; }
        public string pAccountIDList { get; set; }
        public bool pHideZeroes { get; set; }
        public bool phideAsEgp { get; set; }
        public bool pIsOpeningJV { get; set; }
        public bool pIsMultiCurrency { get; set; }
        public bool pIShowUnPaidInvoices { get; set; }
    }
}
