using Forwarding.MvcApp.Controllers.NoAccess;
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
    public class TrialBalanceController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CvwA_Account_Levels objCvwA_Account_Levels = new CvwA_Account_Levels();
            CCurrencies objCCurrency = new CCurrencies();
            objCCurrency.GetListPaging(99999, 1, "WHERE 1=1", "Code", out _RowCount);
            objCvwA_Account_Levels.GetListPaging(99999, 1, "WHERE 1=1", "ID", out _RowCount);
            objCvwA_Accounts.GetListPaging(99999, 1, "WHERE 1 = 1", "Name, Code", out _RowCount);
            var Accounts = objCvwA_Accounts.lstCVarvwA_Accounts;
            objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name", out _RowCount);


            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(Accounts.Where(x=> x.IsMain == false))
                ,  serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                ,  serializer.Serialize(Accounts.Where(x=> x.IsMain == true))
                ,  serializer.Serialize(objCvwA_Account_Levels.lstCVarvwA_Account_Levels)
                ,  serializer.Serialize(objCvwBranches.lstCVarvwBranches)
                ,  serializer.Serialize(objCCurrency.lstCVarCurrencies)
            };
        }


        [HttpGet, HttpPost]
        public object[] FillAccounts(string WhereCondition)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            objCvwA_Accounts.GetListPaging(99999, 1, WhereCondition, "Name, Code", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
            };
        }



        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pAccountIDList, string pFromDate, string pToDate, string pCostCenter_IDs,
            int pPostStatus , string pAccLevel,string pBranche_IDs, Int32 pCurrency, Int32 pisCheck, bool pWithSubAccount)
        {
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
            int _RowCount = 0;
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            CA_Account_Levels objCA_Account_Levels = new CA_Account_Levels();
            objCA_Account_Levels.GetList("WHERE 1=1");
            CA_Accounts objCA_Accounts = new CA_Accounts();
            objCA_Accounts.GetList("WHERE Parent_ID IS NULL");
            string pAccount_FirstChar = ",";
            for (int i = 0; i < objCA_Accounts.lstCVarA_Accounts.Count; i++)
            {
                pAccount_FirstChar += objCA_Accounts.lstCVarA_Accounts[i].ID + ",";
            }

            int Level = 1;
            if (pAccLevel == "0")
                Level = objCA_Account_Levels.lstCVarA_Account_Levels.Count;


            CvwStructure_SP_A_Rep_Trial_Balance_E objCvwStructure_SP_A_Rep_Trial_Balance_E = new CvwStructure_SP_A_Rep_Trial_Balance_E();
            CvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E objCvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E = new CvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E();
            CvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts objCvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts = new CvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts();
            if (pWithSubAccount)
            {
                checkException = objCvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.GetList(
                        pAccount_FirstChar //pAccount_FirstChar
                        , "," + pAccountIDList + "," //pAccountIDs
                        , "-1" //pJV_IDs
                        , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , int.Parse(pAccLevel) //pAcc_Level
                        , true //pIsLeafNodes
                        , -1 //pOrdering
                        );
            }
           else if (pisCheck==1)
            {
                checkException = objCvwStructure_SP_A_Rep_Trial_Balance_E.GetListByCurrency(
                               pAccount_FirstChar //pAccount_FirstChar
                               , "," + pAccountIDList + "," //pAccountIDs
                               , "-1" //pJV_IDs
                               , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                               , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                               , objCA_Account_Levels.lstCVarA_Account_Levels.Count //pAcc_Level
                               , true //pIsLeafNodes
                               , -1 //pOrdering
                               , pCurrency
                               );
            }
            else
            {
                if (pCostCenter_IDs == "0")
                    checkException = objCvwStructure_SP_A_Rep_Trial_Balance_E.GetList(
                            pAccount_FirstChar //pAccount_FirstChar
                            , "," + pAccountIDList + "," //pAccountIDs
                            , "-1" //pJV_IDs
                            , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                            , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                            // , Level //pAcc_Level
                            , int.Parse(pAccLevel)
                            , true //pIsLeafNodes
                            , -1 //pOrdering
                            , "," + pBranche_IDs + ","
                            );
                else
                    checkException = objCvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.GetList(
                        pAccount_FirstChar //pAccount_FirstChar
                        , "," + pAccountIDList + "," //pAccountIDs
                        , "-1" //pJV_IDs
                        , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                        //, Level //pAcc_Level
                        , int.Parse(pAccLevel)
                        , pCostCenter_IDs == "0" ? true : false //pIsLeafNodes
                        , -1 //pOrdering
                        , pCostCenter_IDs == "-1" ? "-1" : ("," + pCostCenter_IDs + ",")
                        , "," + pBranche_IDs + ","
                        );
            }
           
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
               ,pWithSubAccount ? serializer.Serialize(objCvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts.lstCVarvwStructure_SP_A_Rep_Trial_Balance_E_WithSubAccounts)
                : ( pCostCenter_IDs == "0" 
                    ? serializer.Serialize(objCvwStructure_SP_A_Rep_Trial_Balance_E.lstCVarvwStructure_SP_A_Rep_Trial_Balance_E) //pTrialBalance = pData[1]
                    : serializer.Serialize(objCvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.lstCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E) )//pTrialBalance = pData[1]
            };
        }

    }
}
