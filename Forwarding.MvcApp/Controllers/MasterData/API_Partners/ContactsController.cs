using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class ContactsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CContacts objCContacts = new CContacts();
            objCContacts.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCContacts.lstCVarContacts) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CContacts objCContacts = new CContacts();
            //objCContacts.GetList(string.Empty);
            Int32 _RowCount = 0;// objCContacts.lstCVarContacts.Count;

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());
            //string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
            //    + " OR Name LIKE '%" + pSearchKey + "%' "
            //    + " OR LocalName LIKE '%" + pSearchKey + "%' ";

            string whereClause = (pWhereClause == "" ? "" : pWhereClause);
            objCContacts.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCContacts.lstCVarContacts), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(Int32 pPartnerTypeID, Int32 pPartnerID, string pName, string pLocalName, string pEmail, string pPhone1, string pPhone2, string pMobile1, string pMobile2, string pFax, bool pIsInactive = false, string pNotes = "")
        {
            bool _result = false;
            CVarContacts objCVarContacts = new CVarContacts();

            objCVarContacts.PartnerTypeID = pPartnerTypeID;
            objCVarContacts.PartnerID = pPartnerID;
            
            objCVarContacts.Name = (pName == null ? "" : pName.Trim().ToUpper());
            objCVarContacts.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarContacts.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
            objCVarContacts.Phone1 = (pPhone1 == null ? "" : pPhone1.Trim().ToUpper());
            objCVarContacts.Phone2 = (pPhone2 == null ? "" : pPhone2.Trim().ToUpper());
            objCVarContacts.Mobile1 = (pMobile1 == null ? "" : pMobile1.Trim().ToUpper());
            objCVarContacts.Mobile2 = (pMobile2 == null ? "" : pMobile2.Trim().ToUpper());
            objCVarContacts.Fax = (pFax == null ? "" : pFax.Trim().ToUpper());
            objCVarContacts.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarContacts.IsInactive = (pIsInactive == null ? false : pIsInactive);

            objCVarContacts.TimeLocked = DateTime.Parse("01-01-1900");

            objCVarContacts.CreatorUserID = objCVarContacts.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarContacts.CreationDate = objCVarContacts.ModificationDate = DateTime.Now;

            CContacts objCContacts = new CContacts();
            objCContacts.lstCVarContacts.Add(objCVarContacts);
            Exception checkException = objCContacts.SaveMethod(objCContacts.lstCVarContacts);
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
        public bool Update(Int64 pID, Int32 pPartnerTypeID, Int32 pPartnerID, string pName, string pLocalName, string pEmail, string pPhone1, string pPhone2, string pMobile1, string pMobile2, string pFax, bool pIsInactive = false, string pNotes = "")
        {
            bool _result = false;
            CVarContacts objCVarContacts = new CVarContacts();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CContacts objCGetCreationInformation = new CContacts();
            objCGetCreationInformation.GetItem(pID);
            objCVarContacts.CreatorUserID = objCGetCreationInformation.lstCVarContacts[0].CreatorUserID;
            objCVarContacts.CreationDate = objCGetCreationInformation.lstCVarContacts[0].CreationDate;

            objCVarContacts.ID = pID;

            objCVarContacts.PartnerTypeID = pPartnerTypeID;
            objCVarContacts.PartnerID = pPartnerID;

            objCVarContacts.Name = (pName == null ? "" : pName.Trim().ToUpper());
            objCVarContacts.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarContacts.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
            objCVarContacts.Phone1 = (pPhone1 == null ? "" : pPhone1.Trim().ToUpper());
            objCVarContacts.Phone2 = (pPhone2 == null ? "" : pPhone2.Trim().ToUpper());
            objCVarContacts.Mobile1 = (pMobile1 == null ? "" : pMobile1.Trim().ToUpper());
            objCVarContacts.Mobile2 = (pMobile2 == null ? "" : pMobile2.Trim().ToUpper());
            objCVarContacts.Fax = (pFax == null ? "" : pFax.Trim().ToUpper());
            objCVarContacts.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarContacts.IsInactive = (pIsInactive == null ? false : pIsInactive);

            objCVarContacts.TimeLocked = DateTime.Parse("01-01-1900");

            objCVarContacts.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarContacts.ModificationDate = DateTime.Now;

            CContacts objCContacts = new CContacts();
            objCContacts.lstCVarContacts.Add(objCVarContacts);
            Exception checkException = objCContacts.SaveMethod(objCContacts.lstCVarContacts);
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
        public bool Delete(String pContactsIDs)
        {
            bool _result = false;
            CContacts objCContacts = new CContacts();
            foreach (var currentID in pContactsIDs.Split(','))
            {
                objCContacts.lstDeletedCPKContacts.Add(new CPKContacts() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCContacts.DeleteItem(objCContacts.lstDeletedCPKContacts);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] GetContactsForOperation(Int64 pOperationID)
        {
            CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
            CContacts objCContacts = new CContacts();
            Exception checkException = null;
            int _RowCount = 0;
            string pContactEmails = "";
            checkException = objCvwOperationPartners.GetListPaging(999999, 1, "WHERE PartnerID IS NOT NULL AND OperationID=" + pOperationID + " AND PartnerTypeID IN (1,2)", "ID", out _RowCount);
            for (int i = 0; i < objCvwOperationPartners.lstCVarvwOperationPartners.Count; i++)
            {
                checkException = objCContacts.GetListPaging(999999, 1, "WHERE Email IS NOT NULL AND Email<>'' AND PartnerID="+objCvwOperationPartners.lstCVarvwOperationPartners[i].PartnerID+ " AND PartnerTypeID=" + objCvwOperationPartners.lstCVarvwOperationPartners[i].PartnerTypeID, "ID", out _RowCount);
                for (int j=0; j<objCContacts.lstCVarContacts.Count;j++)
                    pContactEmails += pContactEmails == "" ? objCContacts.lstCVarContacts[j].Email : (", " + objCContacts.lstCVarContacts[j].Email);
            }
            return new object[]
            {
                pContactEmails
            };
        }
        
    }
}
