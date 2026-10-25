using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Transactions
{
    public class OpenCloseFiscalYearController : ApiController
    {
        //[Route("/api/OpenCloseFiscalYear/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
                CA_Fiscal_Year objA_Fiscal_Year = new CA_Fiscal_Year();
                objA_Fiscal_Year.GetList(pWhereClause);


            CA_Accounts cA_Accounts = new CA_Accounts();
            cA_Accounts.GetList("where IsMain = 0");
            return new Object[] { new JavaScriptSerializer().Serialize(objA_Fiscal_Year.lstCVarA_Fiscal_Year), new JavaScriptSerializer().Serialize(cA_Accounts.lstCVarA_Accounts) };
        }


        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] ApplyOpenCloseFiscalYear(string pID, string pIsClosed , string pAccountID)
        {
            COpenCloseFiscalYear objOpenCloseFiscalYear = new COpenCloseFiscalYear();
            var result = false;
           // var userid = WebSecurity.CurrentUserId;
          //  var OpenCloseDate = DateTime.Now;
            //  objCVarCRM_Actions.ModificationDate = DateTime.Now;
            var exc = objOpenCloseFiscalYear.OpenCloseFiscalYear(int.Parse(pID),(pIsClosed == "0" ? false : true ) , int.Parse(pAccountID) , WebSecurity.CurrentUserId);


            if (exc == null)
                result = true;

            return new Object[] { new JavaScriptSerializer().Serialize(result) };
        }


        // data: { pItemType: ItemTypeNO, pDuplicateItems: DuplicateItems, pDestinationItem: $('#slDestinationItems').val() },


    }
}
