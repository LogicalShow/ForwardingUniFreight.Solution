using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Administration.API_Settings
{

    public class MergeDuplicateController : ApiController
    {
        //[Route("/api/MergeDuplicate/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pItemType, string pWhereClause)
        {
            var type = int.Parse(pItemType);
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            if (type == 1)
            {

                CCustomers objCCustomer = new CCustomers();
                objCCustomer.GetList(pWhereClause);
                return new Object[] { serialize.Serialize(objCCustomer.lstCVarCustomers) };

            }
            if (type == 2)
            {

                CAgents cAgents = new CAgents();
                cAgents.GetList(pWhereClause);
                return new Object[] { serialize.Serialize(cAgents.lstCVarAgents) };

            }
            if (type == 11)
            {

                CCustody cCustody = new CCustody();
                cCustody.GetList(pWhereClause);
                return new Object[] { serialize.Serialize(cCustody.lstCVarCustody) };

            }
            else if (type == 10)
            {

                CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                objCA_SubAccounts.GetList(pWhereClause);
                return new Object[] { serialize.Serialize(objCA_SubAccounts.lstCVarA_SubAccounts) };

            }
            else if (type == 12)
            {

                CCRM_Clients objCCRM_Clients = new CCRM_Clients();
                objCCRM_Clients.GetList(pWhereClause);
                return new Object[] { serialize.Serialize(objCCRM_Clients.lstCVarCRM_Clients) };

            }
            else
            {
                return new Object[] { null };

            }

        }

        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] Merge(string pItemType, string pDuplicateItemsIDs, string pDestinationItemID , string pSubAccountsIDs_ForDuplicateItems , string pSubAccountFor_DestinationItemID)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CMergeDuplicate objCCustomer = new CMergeDuplicate();
            var result = false;
            var userid = WebSecurity.CurrentUserId;
            var MergeDate = DateTime.Now;
            string _ErrorMesg = "";

            CvwDefaults objCvwDefaults = new CvwDefaults();
            Int32 _RowCount2 = 0;
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa

            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(CompanyName);
            if(IsMescoCompany && pItemType =="1")
            {
                CCustomers objCCustomers = new CCustomers();
                objCCustomers.GetList("Where ID=" + pDestinationItemID);
                if (objCCustomers.lstCVarCustomers.Count > 0 && objCCustomers.lstCVarCustomers[0].VATNumber == "")
                    _ErrorMesg = " Destination customer without vat";

            }

            if(_ErrorMesg == "")
            {

                //  objCVarCRM_Actions.ModificationDate = DateTime.Now;
                var exc = objCCustomer.MergeDuplicate(int.Parse(pItemType), pDuplicateItemsIDs, int.Parse(pDestinationItemID), userid, MergeDate, (pSubAccountsIDs_ForDuplicateItems == null ? "-" : pSubAccountsIDs_ForDuplicateItems),
                (pSubAccountFor_DestinationItemID == null ? 0 : int.Parse(pSubAccountFor_DestinationItemID))
                    );


                if (exc == null)
                    result = true;
            }


            return new Object[] { serialize.Serialize(result) , _ErrorMesg };
        }
        // data: { pItemType: ItemTypeNO, pDuplicateItems: DuplicateItems, pDestinationItem: $('#slDestinationItems').val() },
    }
}
