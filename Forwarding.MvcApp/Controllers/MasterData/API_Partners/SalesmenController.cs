//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Salesmen
{
    public class SalesmenController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CAgents objCAgents = new CAgents();
            objCAgents.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCAgents.lstCVarAgents) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllForCombo(string pWhereClauseForCombo)
        {
            Exception checkException = null;
            CvwAgentsForCombo objCAgents = new CvwAgentsForCombo();
            checkException = objCAgents.GetList(pWhereClauseForCombo);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCAgents.lstCVarvwAgentsForCombo) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
          CSalesmen objCSalesmen = new CSalesmen();
            Int32 _RowCount = 0;// objCvwAgents.lstCVarvwAgents.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            objCSalesmen.GetListPaging(pPageSize, pPageNumber, whereClause, "Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCSalesmen.lstCVarSalesmen), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName
            , string pLocalName,string pCrmCode)
        {
            bool _result = false;
            Exception checkException;

            CVarSalesmen objCVarSalesmen = new CVarSalesmen();

            objCVarSalesmen.Code = pCode.ToUpper();
            objCVarSalesmen.NAME = pName.Trim().ToUpper();
            objCVarSalesmen.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarSalesmen.crmCode = "";



            CSalesmen objCSalesmen = new CSalesmen();
            objCSalesmen.lstCVarSalesmen.Add(objCVarSalesmen);

      
                checkException = objCSalesmen.SaveMethod(objCSalesmen.lstCVarSalesmen);


            if (checkException != null) // an exception is caught in the model
            {
                    _result = false;
            }
            else _result = true;
            return _result;
        }

        // [Route("/api/Agents/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, string pLocalName, string pcrmCode)
        
        {
            bool _result = false;
            Exception checkException;

            CVarAgents objCVarAgents = new CVarAgents();
            CVarSalesmen objCVarSalesmen = new CVarSalesmen();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CAgents objCGetCreationInformation = new CAgents();
            objCGetCreationInformation.GetItem(pID);

            objCVarSalesmen.ID = pID;
            objCVarSalesmen.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarSalesmen.NAME = pName.ToUpper();
            objCVarSalesmen.crmCode = pcrmCode;
            objCVarSalesmen.Code = pCode.ToUpper();

         
            CAgents objCAgents = new CAgents();
            CSalesmen objCSalesmen = new CSalesmen();

            objCSalesmen.lstCVarSalesmen.Add(objCVarSalesmen);

           
                checkException = objCSalesmen.SaveMethod(objCSalesmen.lstCVarSalesmen);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
           else { //not unique
                _result = true;
            }
            return _result;
        }
        
        [HttpGet, HttpPost]
        public bool Delete(string pSalesmenIDs)
        {
            bool _result = false;
            //******************************************************
            CSalesmen objCSalesmen = new CSalesmen();
            Exception checkException = null;
            int _RowCount = 0;
            //******************************************************
            CAgents objCAgents = new CAgents();
            CAgentsTax objCAgentsTAX2 = new CAgentsTax();
        
         
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

 


                foreach (var currentID in pSalesmenIDs.Split(','))
                {
                objCSalesmen.lstDeletedCPKSalesmen.Add(new CPKSalesmen() { ID = Int32.Parse(currentID.Trim()) });
                }

                checkException = objCSalesmen.DeleteItem(objCSalesmen.lstDeletedCPKSalesmen);
            

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
                _result = true;
            return _result;
        }

    }
}
