using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace ERP_Web.MvcApp.Controllers.Accounting.API_Transactions
{
    
    public class ForeignCurrencyRevaluationController : ApiController
    {
        //[Route("/api/ForeignCurrencyRevaluation/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll()
        {
           
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            CA_Accounts cA_Accounts = new CA_Accounts();
            cA_Accounts.GetList("where ismain=0 And Account_Number not like '3%'  And Account_Number not like '4%' ");
            //cA_Accounts.GetList("WHERE IsMain=0 And Account_Number not like '3%'  And Account_Number not like '4%' And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )");

            CSystemAccount objCSystemAccount = new CSystemAccount();
            objCSystemAccount.GetList(" where AccountID =19 ");

            CA_Accounts cA_AccountsRevaluation = new CA_Accounts();
            cA_AccountsRevaluation.GetList("where ID= " + objCSystemAccount.lstCVarSystemAccount[0].SystemAccountID );

            return new Object[] { serialize.Serialize(cA_Accounts.lstCVarA_Accounts) , objCSystemAccount.lstCVarSystemAccount[0].SystemAccountID
            ,serialize.Serialize(cA_AccountsRevaluation.lstCVarA_Accounts)};


        }


        //string pAccountIDs, int pRevaluteAccount, int pSubAccountsIDs, decimal pExRate, Int32 pCurrencyID
        //    ,DateTime pFromDate, DateTime pToDate,DateTime pJvRevalueteDate, Int32 pUserID
        [HttpGet, HttpPost]

        public Object[] CreateJV(   string pAccountIDs, int pRevaluteAccount, int pSubAccountsIDs, decimal pExRate, Int32 pCurrencyID
            ,DateTime pFromDate, DateTime pToDate,DateTime pJvRevalueteDate, Int32 pUserID)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CForeignCurrencyRevaluation objCForeignCurrencyRevaluation = new CForeignCurrencyRevaluation();
            var result = false;
            var userid = WebSecurity.CurrentUserId;
            int _RowCount = 0;

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            if (CompanyName == "SAF" || CompanyName == "NIL" || CompanyName == "HOR" || CompanyName == "FEL" || CompanyName == "TUE" || CompanyName == "PHO" || CompanyName == "KDM" || CompanyName == "RLL")
            {
                var exc = objCForeignCurrencyRevaluation.ForeignCurrencyRevaluationsafena(pAccountIDs, pRevaluteAccount
               , pSubAccountsIDs, pExRate,
              pCurrencyID, pFromDate,
               pToDate, pJvRevalueteDate, userid);
                if (exc == null)
                    result = true;
            }
            else
            {
                var exc = objCForeignCurrencyRevaluation.ForeignCurrencyRevaluation(pAccountIDs, pRevaluteAccount
              , pSubAccountsIDs, pExRate,
             pCurrencyID, pFromDate,
              pToDate, pJvRevalueteDate, userid);
                if (exc == null)
                    result = true;
            }
               





          

            return new Object[] { serialize.Serialize(result) };
        }

        //sherif: to be used in select boxes
        //public Object[] CreateJV([FromBody] ParamGetPrintedDataForeign saveParameters)
        //{
        //    var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    CForeignCurrencyRevaluation objCForeignCurrencyRevaluation = new CForeignCurrencyRevaluation();
        //    var result = false;
        //    var userid = WebSecurity.CurrentUserId;



        //    var exc = objCForeignCurrencyRevaluation.ForeignCurrencyRevaluation(saveParameters.pAccountIDs, saveParameters.pRevaluteAccount
        //        , saveParameters.pSubAccountsIDs, saveParameters.pExRate,
        //        saveParameters.pCurrencyID, saveParameters.pFromDate,
        //        saveParameters.pToDate, saveParameters.pJvRevalueteDate, userid);





        //    if (exc == null)
        //        result = true;

        //    return new Object[] { serialize.Serialize(result) };
        //}
        //public class ParamGetPrintedDataForeign
        //{
        //    public string pAccountIDs { get; set; }
        //    public Int32 pRevaluteAccount { get; set; }
        //    public Int32 pSubAccountsIDs { get; set; }
        //    public decimal pExRate { get; set; }
        //    public Int32 pCurrencyID { get; set; }
        //    public DateTime pFromDate { get; set; }
        //    public DateTime pToDate { get; set; }
        //    public DateTime pJvRevalueteDate { get; set; }
        //    public Int32 pUserID { get; set; }

        //}
    }

}
