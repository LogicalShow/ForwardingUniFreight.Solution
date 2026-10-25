
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.SL.API_SL_Reports
{
    public class ClientPaidController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(
        bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pWhereClause2, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
           // CSL_Clients objCSL_Clients = new CSL_Clients();
            FillClientAndSupplierList objCSL_Clients = new FillClientAndSupplierList();
            // objCSL_Clients.GetListPaging(9999, 1, "WHERE "+ pWhereClause, "Name, Code", out _RowCount);
            if (pWhereClause2=="-1")
            {
                objCSL_Clients.GetList("4",   pWhereClause2 );
            }
            else
            {
                objCSL_Clients.GetList("4", "," + pWhereClause2 + ",");

            }

            return new Object[] {
               _RowCount
                , new JavaScriptSerializer().Serialize(objCSL_Clients.lstCVarvwA_Accounts_FillClientsAndSuppliers) //pCostCenter = pData[2]
            };
        }
        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            // CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            //CSL_Clients objCSL_Clients = new CSL_Clients();
            FillClientAndSupplierList objCSL_Clients = new FillClientAndSupplierList();

            //  CvwA_Accounts objCvwMainA_Accounts = new CvwA_Accounts();
            CvwA_Accounts_FillClientsAndSuppliers objCvwMainA_Accounts = new CvwA_Accounts_FillClientsAndSuppliers();

            CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
          //  objCSL_Clients.GetListPaging(9999, 1, "WHERE 1=1", "Name, Code", out _RowCount);
            objCSL_Clients.GetList("4","-1");

            objCvwMainA_Accounts.GetList("4");
            cCurrencies.GetList(" where  1=1 ");

            return new object[] {
                new JavaScriptSerializer().Serialize(objCSL_Clients.lstCVarvwA_Accounts_FillClientsAndSuppliers)
                , new JavaScriptSerializer().Serialize(objCvwMainA_Accounts.lstCVarvwA_Accounts_FillClientsAndSuppliers)
                , new JavaScriptSerializer().Serialize(cCurrencies.lstCVarvwCurrencyDetails)

            };
        }

        //[HttpGet, HttpPost]
        //public object[] GetPrintedData(string pAccountIDList, string pFromDate, string pToDate, string pCostCenter_IDs, int pPostStatus)
        //{
        //    int _RowCount = 0;
        //    Exception checkException = null;
        //    CvwDefaults objCDefaults = new CvwDefaults();
        //    objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

        //    //CvwRptHeaderDefaultTable objCvwRptHeaderDefaultTable = new CvwRptHeaderDefaultTable();
        //    //objCvwRptHeaderDefaultTable.GetList("WHERE 1=1");
        //    CA_Account_Levels objCA_Account_Levels = new CA_Account_Levels();
        //    objCA_Account_Levels.GetList("WHERE 1=1");
        //    CA_Accounts objCA_Accounts = new CA_Accounts();
        //    objCA_Accounts.GetList("WHERE Parent_ID IS NULL");
        //    string pAccount_FirstChar = ",";
        //    for (int i = 0; i < objCA_Accounts.lstCVarA_Accounts.Count; i++)
        //    {
        //        pAccount_FirstChar += objCA_Accounts.lstCVarA_Accounts[i].ID + ",";
        //    }
        //    CvwStructure_SP_A_Rep_Trial_Balance_E objCvwStructure_SP_A_Rep_Trial_Balance_E = new CvwStructure_SP_A_Rep_Trial_Balance_E();
        //    CvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E objCvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E = new CvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E();
        //    if (pCostCenter_IDs == "0")
        //    checkException = objCvwStructure_SP_A_Rep_Trial_Balance_E.GetList(
        //            pAccount_FirstChar //pAccount_FirstChar
        //            , "," + pAccountIDList + "," //pAccountIDs
        //            , "-1" //pJV_IDs
        //            , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
        //            , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
        //            , objCA_Account_Levels.lstCVarA_Account_Levels.Count //pAcc_Level
        //            , true //pIsLeafNodes
        //            , -1 //pOrdering
        //            , "-1"
        //            );  
        //    else
        //        checkException = objCvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.GetList(
        //            pAccount_FirstChar //pAccount_FirstChar
        //            , "," + pAccountIDList + "," //pAccountIDs
        //            , "-1" //pJV_IDs
        //            , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
        //            , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
        //            , objCA_Account_Levels.lstCVarA_Account_Levels.Count //pAcc_Level
        //            , pCostCenter_IDs == "0" ? true : false //pIsLeafNodes
        //            , -1 //pOrdering
        //            , "," + pCostCenter_IDs + ","
        //            ); 
        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new object[] {
        //        //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
        //        new JavaScriptSerializer().Serialize(objCDefaults.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
        //        , pCostCenter_IDs == "0" 
        //            ? serializer.Serialize(objCvwStructure_SP_A_Rep_Trial_Balance_E.lstCVarvwStructure_SP_A_Rep_Trial_Balance_E) //pTrialBalance = pData[1]
        //            : serializer.Serialize(objCvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E.lstCVarvwStructure_SP_A_Rep_Trial_Balance_ByCostCenter_E) //pTrialBalance = pData[1]
        //    };
        //}
    }
}
