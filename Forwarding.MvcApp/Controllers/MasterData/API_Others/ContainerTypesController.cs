using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Others
{
    public class ContainerTypesController : ApiController
    {
        //[Route("/api/ContainerTypes/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwContainerTypes objCvwContainerTypes = new CvwContainerTypes();
            objCvwContainerTypes.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwContainerTypes.lstCVarvwContainerTypes) };
        }

        // [Route("/api/ContainerTypes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwContainerTypes objCvwContainerTypes = new CvwContainerTypes();
            //objCvwContainerTypes.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwContainerTypes.lstCVarvwContainerTypes.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' ";
                //+ " OR ISOCode LIKE '%" + pSearchKey + "%' "
                //+ " OR PrintAs LIKE '%" + pSearchKey + "%' "
                //+ " OR CSizeCode LIKE '%" + pSearchKey + "%' "
                //+ " OR CTypeCode LIKE '%" + pSearchKey + "%' ";

            objCvwContainerTypes.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwContainerTypes.lstCVarvwContainerTypes), _RowCount };
        }

        // [Route("/api/ContainerTypes/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(Int32 pCTypeID, Int32 pCSizeID, String pCode, String pName, String pLocalName, string pISOCode, string pPrintAs, string pNotes, bool pIsInactive /*, bool pIsAddedManually*/)
        {
            bool _result = false;
            CVarContainerTypes objCVarContainerTypes = new CVarContainerTypes();

            objCVarContainerTypes.CTypeID = pCTypeID;
            objCVarContainerTypes.CSizeID = pCSizeID;

            objCVarContainerTypes.Code = pCode.ToUpper();
            objCVarContainerTypes.Name = pName.ToUpper();
            objCVarContainerTypes.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarContainerTypes.ISOCode = (pISOCode == null ? "" : pISOCode.ToUpper());
            objCVarContainerTypes.PrintAs = (pPrintAs == null ? "" : pPrintAs.ToUpper());
            objCVarContainerTypes.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarContainerTypes.IsInactive = pIsInactive;
            //objCVarContainerTypes.IsAddedManually = pIsAddedManually;
            objCVarContainerTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarContainerTypes.LockingUserID = 0;

            objCVarContainerTypes.CreatorUserID = objCVarContainerTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarContainerTypes.CreationDate = objCVarContainerTypes.ModificationDate = DateTime.Now;

            objCVarContainerTypes.crmCode = "";

            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.lstCVarContainerTypes.Add(objCVarContainerTypes);
            Exception checkException = objCContainerTypes.SaveMethod(objCContainerTypes.lstCVarContainerTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;    
            return _result;
        }

        // [Route("/api/ContainerTypes/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pCTypeID, Int32 pCSizeID, String pCode, String pName, String pLocalName, string pISOCode, string pPrintAs, string pNotes, bool pIsInactive /*, bool pIsAddedManually*/)
        {
            bool _result = false;
            CVarContainerTypes objCVarContainerTypes = new CVarContainerTypes();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CContainerTypes objCGetCreationInformation = new CContainerTypes();
            objCGetCreationInformation.GetItem(pID);
            objCVarContainerTypes.CreatorUserID = objCGetCreationInformation.lstCVarContainerTypes[0].CreatorUserID;
            objCVarContainerTypes.CreationDate = objCGetCreationInformation.lstCVarContainerTypes[0].CreationDate;

            objCVarContainerTypes.ID = pID;

            objCVarContainerTypes.CTypeID = pCTypeID;
            objCVarContainerTypes.CSizeID = pCSizeID;

            objCVarContainerTypes.Code = pCode.ToUpper();
            objCVarContainerTypes.Name = pName.ToUpper();
            objCVarContainerTypes.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarContainerTypes.ISOCode = (pISOCode == null ? "" : pISOCode.ToUpper());
            objCVarContainerTypes.PrintAs = (pPrintAs == null ? "" : pPrintAs.ToUpper());
            objCVarContainerTypes.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarContainerTypes.IsInactive = pIsInactive;
            //objCVarContainerTypes.IsAddedManually = pIsAddedManually;
            objCVarContainerTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarContainerTypes.LockingUserID = 0;

            objCVarContainerTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarContainerTypes.ModificationDate = DateTime.Now;

            objCVarContainerTypes.crmCode = objCGetCreationInformation.lstCVarContainerTypes[0].crmCode;

            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.lstCVarContainerTypes.Add(objCVarContainerTypes);
            Exception checkException = objCContainerTypes.SaveMethod(objCContainerTypes.lstCVarContainerTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;    
            return _result;
        }

        // [Route("api/ContainerTypes/Delete/{pContainerTypesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pContainerTypesIDs)
        {
            bool _result = false;
            CContainerTypes objCContainerTypes = new CContainerTypes();
            foreach (var currentID in pContainerTypesIDs.Split(','))
            {
                objCContainerTypes.lstDeletedCPKContainerTypes.Add(new CPKContainerTypes() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCContainerTypes.DeleteItem(objCContainerTypes.lstDeletedCPKContainerTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        //[Route("/api/ContainerTypes/CheckRow/{pContainerTypesID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetItem(int.Parse(pID));

            //if (objCContainerTypes.lstCVarContainerTypes[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCContainerTypes.lstCVarContainerTypes[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCContainerTypes.lstCVarContainerTypes[0].TimeLocked = DateTime.Now;
                objCContainerTypes.lstCVarContainerTypes[0].LockingUserID = WebSecurity.CurrentUserId;
                objCContainerTypes.lstCVarContainerTypes.Add(objCContainerTypes.lstCVarContainerTypes[0]);
                objCContainerTypes.SaveMethod(objCContainerTypes.lstCVarContainerTypes);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/ContainerTypes/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CContainerTypes objCContainerTypes = new CContainerTypes();
                objCContainerTypes.GetItem(int.Parse(pID));

                objCContainerTypes.lstCVarContainerTypes[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCContainerTypes.lstCVarContainerTypes[0].LockingUserID = 0;
                objCContainerTypes.lstCVarContainerTypes.Add(objCContainerTypes.lstCVarContainerTypes[0]);
                objCContainerTypes.SaveMethod(objCContainerTypes.lstCVarContainerTypes);
                _result = true;
            }
            catch (Exception ex)
            {
                _result = false;//record is locked
            }
            return _result;
        }

    }
}
