using Forwarding.MvcApp.Models.Administration.Security.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Administration.API_Security
{
    public class RolesController : ApiController
    {

        //[Route("/api/Roles/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CRoles objCRoles = new CRoles();
            objCRoles.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCRoles.lstCVarRoles) };
        }

        // [Route("/api/Roles/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CRoles objCRoles = new CRoles();
            //objCRoles.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCRoles.lstCVarRoles.Count;
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' ";
            objCRoles.GetListPaging(pPageSize, pPageNumber, whereClause, "Name", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCRoles.lstCVarRoles), _RowCount };
        }

        // [Route("/api/Roles/Insert/{pRole}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pName, String pLocalName, String pNotes, bool pIsUsersShareRecords)
        //public bool Insert(String pNotes, String pName)
        {
            bool _result = false;

            CVarRoles objCVarRoles = new CVarRoles();

            objCVarRoles.Name = pName.ToUpper();
            objCVarRoles.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarRoles.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarRoles.IsUsersShareRecords = pIsUsersShareRecords;

            objCVarRoles.CreatorUserID = objCVarRoles.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarRoles.CreationDate = objCVarRoles.ModificationDate = DateTime.Now;

            CRoles objCRoles = new CRoles();
            objCRoles.lstCVarRoles.Add(objCVarRoles);
            Exception checkException = objCRoles.SaveMethod(objCRoles.lstCVarRoles);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Roles/Update/{pNotes}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, String pNotes, String pName, String pLocalName, bool pIsUsersShareRecords)
        {
            bool _result = false;

            CVarRoles objCVarRoles = new CVarRoles();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CRoles objCGetCreationInformation = new CRoles();
            objCGetCreationInformation.GetItem(pID);
            objCVarRoles.CreatorUserID = objCGetCreationInformation.lstCVarRoles[0].CreatorUserID;
            objCVarRoles.CreationDate = objCGetCreationInformation.lstCVarRoles[0].CreationDate;

            objCVarRoles.ID = pID;
            
            objCVarRoles.Name = pName.ToUpper();
            objCVarRoles.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarRoles.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarRoles.IsUsersShareRecords = pIsUsersShareRecords;

            objCVarRoles.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarRoles.ModificationDate = DateTime.Now;

            CRoles objCRoles = new CRoles();
            objCRoles.lstCVarRoles.Add(objCVarRoles);
            Exception checkException = objCRoles.SaveMethod(objCRoles.lstCVarRoles);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        //// [Route("/api/Roles/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CRoles objCRoles = new CRoles();
        //    objCRoles.lstDeletedCPKRoles.Add(new CPKRoles() { ID = pID });
        //    objCRoles.DeleteItem(objCRoles.lstDeletedCPKRoles);
        //}

        // [Route("/api/Roles/Delete/{pRolesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pRolesIDs)
        {
            bool _result = false;
            CRoles objCRoles = new CRoles();
            foreach (var currentID in pRolesIDs.Split(','))
            {
                objCRoles.lstDeletedCPKRoles.Add(new CPKRoles() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCRoles.DeleteItem(objCRoles.lstDeletedCPKRoles);
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
