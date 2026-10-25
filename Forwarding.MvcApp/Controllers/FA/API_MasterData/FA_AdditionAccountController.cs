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

namespace Forwarding.MvcApp.Controllers.FA.API_MasterData
{
    public class FA_AdditionAccountController : ApiController
    {
  

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            if (pID == null)
            {
                CA_Accounts objCA_Accounts = new CA_Accounts();
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                // CA_CostCenters objCA_CostCenters = new CA_CostCenters();
                objCA_Accounts.GetList("Where 1 = 1");
               // cA_SubAccounts.GetList("where ID IN(select SubAccountID from Services)");
                return new Object[] { new JavaScriptSerializer().Serialize(objCA_Accounts.lstCVarA_Accounts), new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
            else
            {
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                cA_SubAccounts.GetList("where Parent_ID = "+ pID + "");
                return new Object[] {  new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
        }


        // [Route("/api/Services/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CFA_AdditionAccount objCServices = new CFA_AdditionAccount();
            //objCvwServices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwServices.lstCVarServices.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' ";
            //    + " OR AccountName LIKE '%" + pSearchKey + "%' "
            //+" OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCServices.GetListPaging(pPageSize, pPageNumber, whereClause, " ID DESC", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCServices.lstCVarFA_AdditionAccount), _RowCount };
        }

        // [Route("/api/Services/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(
            string pName,
            String pAccountID, 
            String pSubAccountID 
            )
        {
            bool _result = false;
            var ServiceThatHas_lastcode = new CServices();
            ServiceThatHas_lastcode.GetList("WHERE ID = (select max(ID) from Services)");
            var lastcode = ServiceThatHas_lastcode.lstCVarServices.Count == 0 ? 0 : ServiceThatHas_lastcode.lstCVarServices[0].Code;
            CVarFA_AdditionAccount objCVarServices = new CVarFA_AdditionAccount();

            objCVarServices.Name = pName;
            objCVarServices.AccountID = int.Parse(pAccountID);
            objCVarServices.SubAccountID = int.Parse(pSubAccountID);
            CFA_AdditionAccount objCServices = new CFA_AdditionAccount();
            objCServices.lstCVarFA_AdditionAccount.Add(objCVarServices);
            Exception checkException = objCServices.SaveMethod(objCServices.lstCVarFA_AdditionAccount);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(
            string pID ,
           string pName,
           String pAccountID,
           String pSubAccountID
           )
        {
            bool _result = false;


            var ServiceThatHas_lastcode = new CServices();
            ServiceThatHas_lastcode.GetList("WHERE ID = "+ pID + "");
            var lastcode = ServiceThatHas_lastcode.lstCVarServices.Count == 0 ? 0 : ServiceThatHas_lastcode.lstCVarServices[0].Code;


            CVarFA_AdditionAccount objCVarServices = new CVarFA_AdditionAccount();
            objCVarServices.ID = int.Parse( pID );
            objCVarServices.Name = pName;
            objCVarServices.AccountID = int.Parse(pAccountID);
            objCVarServices.SubAccountID = int.Parse(pSubAccountID);

            CFA_AdditionAccount objCServices = new CFA_AdditionAccount();
            objCServices.lstCVarFA_AdditionAccount.Add(objCVarServices);
            Exception checkException = objCServices.SaveMethod(objCServices.lstCVarFA_AdditionAccount);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pFA_AdditionAccountIDs)
        {
            bool _result = false;
            CFA_AdditionAccount objCServices = new CFA_AdditionAccount();
            foreach (var currentID in pFA_AdditionAccountIDs.Split(','))
            {
                objCServices.lstDeletedCPKFA_AdditionAccount.Add(new CPKFA_AdditionAccount() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCServices.DeleteItem(objCServices.lstDeletedCPKFA_AdditionAccount);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
    }
}
