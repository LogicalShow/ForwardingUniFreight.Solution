//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
using Forwarding.MvcApp.Controllers.MasterData.API_Partners;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.WebSockets;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class OwnersController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause="")
        {
			CvwOwners objCvwOwners = new CvwOwners();
			objCvwOwners.GetList(pWhereClause);  

			return new Object[] { new JavaScriptSerializer().Serialize(objCvwOwners.lstCVarvwOwners) };
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
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            Int32 _RowCount = 0;
			CvwOwners objCvwOwners = new CvwOwners();
			
			objCvwOwners.GetListPaging(pPageSize, pPageNumber, pWhereClause, "Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwOwners.lstCVarvwOwners), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert( string pName, string pLocalName,Int32 pCustomerID
            )
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException;
            CVarOwners objCVarOwner = new CVarOwners();
            COwners owners = new COwners();
            owners.GetListPaging(99999, 1, "WHERE 1 = 1", "ID", out _RowCount);
            var MaxCode = owners.lstCVarOwners.Any() ? owners.lstCVarOwners.Max(a => a.Code) : 0;
            if (MaxCode == 0 || MaxCode == null)
            {
                objCVarOwner.Code = 1;
            }
            else
            {
                objCVarOwner.Code = MaxCode + 1;
            }
            objCVarOwner.Name = pName;
            objCVarOwner.LocalName = pLocalName;
            //objCVarOwner.CustomersIds = (pCustomerIds==null?"": pCustomerIds.TrimStart(','));
            objCVarOwner.CustomersIds = "";
            objCVarOwner.CustomerId = pCustomerID;
            objCVarOwner.CreationDate = DateTime.Now;
            objCVarOwner.ModificationDate = DateTime.Now;
            objCVarOwner.CreatorUserID = WebSecurity.CurrentUserId;
            objCVarOwner.ModificatorUserID = WebSecurity.CurrentUserId;
            COwners cOwners = new COwners();
			Common.Common.ReplaceNull(objCVarOwner);
            cOwners.lstCVarOwners.Add(objCVarOwner);
            checkException = cOwners.SaveMethod(cOwners.lstCVarOwners);

            if (checkException != null) // an exception is caught in the model
            {
                    _result = false;
            }
            else _result = true;
            return _result;
        }

        // [Route("/api/Agents/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID , string pName, string pLocalName ,string pCode, Int32 pCustomerID)
        
        {
            bool _result = false;
            Exception checkException;
            CVarOwners objCVarOwner = new CVarOwners();
            COwners objCOwner = new COwners();
            objCVarOwner.ID = pID;
            objCVarOwner.Name = pName;
            objCVarOwner.LocalName = pLocalName;
            objCVarOwner.Code = int.Parse(pCode);
            objCVarOwner.CustomerId = pCustomerID;
            objCVarOwner.CustomersIds = "";
            objCVarOwner.CreationDate = DateTime.Now;
            objCVarOwner.ModificationDate = DateTime.Now;
            objCVarOwner.CreatorUserID = WebSecurity.CurrentUserId;
            objCVarOwner.ModificatorUserID = WebSecurity.CurrentUserId;
			Common.Common.ReplaceNull(objCVarOwner);
			objCOwner.lstCVarOwners.Add(objCVarOwner);

           
                checkException = objCOwner.SaveMethod(objCOwner.lstCVarOwners);

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
        public bool Delete(string pOwnersIDs)
        {
            bool _result = false;
            Exception checkException = null;
            COwners objCOwners = new COwners();


                foreach (var currentID in pOwnersIDs.Split(','))
                {
            
                objCOwners.lstDeletedCPKOwners.Add(new CPKOwners() { ID = Int32.Parse(currentID.Trim()) });
                }

                checkException = objCOwners.DeleteItem(objCOwners.lstDeletedCPKOwners);
            

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
