using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Others
{
    public class PackageTypesController : ApiController
    {
        //[Route("/api/PackageTypes/LoadAll")]
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CPackageTypes objCPackageTypes = new CPackageTypes();
            objCPackageTypes.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCPackageTypes.lstCVarPackageTypes) };
        }

        // [Route("/api/PackageTypes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CPackageTypes objCPackageTypes = new CPackageTypes();
            //objCPackageTypes.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCPackageTypes.lstCVarPackageTypes.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' "; ;
            objCPackageTypes.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCPackageTypes.lstCVarPackageTypes), _RowCount };
        }

        // [Route("/api/Regions/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName, string pLocalName, string pPrintAs, string pNotes,  bool pIsAir, bool pIsOcean, bool pIsInland, bool pIsCustomsClearance, bool pIsWarehousing, bool pIsInactive)
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;
            CVarPackageTypes objCVarPackageTypes = new CVarPackageTypes();

            objCVarPackageTypes.Code = pCode.ToUpper();
            objCVarPackageTypes.Name = pName.ToUpper();
            objCVarPackageTypes.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarPackageTypes.PrintAs = (pPrintAs == null ? "" : pPrintAs.ToUpper());
            objCVarPackageTypes.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarPackageTypes.IsAir = pIsAir;
            objCVarPackageTypes.IsOcean = pIsOcean;
            objCVarPackageTypes.IsInland = pIsInland;
            objCVarPackageTypes.IsCustomsClearance = pIsCustomsClearance;
            objCVarPackageTypes.IsWarehousing = pIsWarehousing;
            objCVarPackageTypes.IsInactive = pIsInactive;

            objCVarPackageTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarPackageTypes.LockingUserID = 0;

            objCVarPackageTypes.CreatorUserID = objCVarPackageTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPackageTypes.CreationDate = objCVarPackageTypes.ModificationDate = DateTime.Now;
            objCVarPackageTypes.IsAddedManually = false;

            objCVarPackageTypes.crmCode = "";

            CPackageTypes objCPackageTypes = new CPackageTypes();
            objCPackageTypes.lstCVarPackageTypes.Add(objCVarPackageTypes);
            Exception checkException = objCPackageTypes.SaveMethod(objCPackageTypes.lstCVarPackageTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/PackageTypes/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, string pLocalName, string pPrintAs, string pNotes, bool pIsAir, bool pIsOcean, bool pIsInland, bool pIsCustomsClearance, bool pIsWarehousing, bool pIsInactive)
        {
            bool _result = false;
            CVarPackageTypes objCVarPackageTypes = new CVarPackageTypes();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CPackageTypes objCGetCreationInformation = new CPackageTypes();
            objCGetCreationInformation.GetItem(pID);
            objCVarPackageTypes.CreatorUserID = objCGetCreationInformation.lstCVarPackageTypes[0].CreatorUserID;
            objCVarPackageTypes.CreationDate = objCGetCreationInformation.lstCVarPackageTypes[0].CreationDate;
            
            objCVarPackageTypes.ID = pID;
            objCVarPackageTypes.Code = pCode.ToUpper();
            objCVarPackageTypes.Name = pName.ToUpper();
            objCVarPackageTypes.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarPackageTypes.PrintAs = (pPrintAs == null ? "" : pPrintAs.ToUpper());
            objCVarPackageTypes.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarPackageTypes.IsAir = pIsAir;
            objCVarPackageTypes.IsOcean = pIsOcean;
            objCVarPackageTypes.IsInland = pIsInland;
            objCVarPackageTypes.IsCustomsClearance = pIsCustomsClearance;
            objCVarPackageTypes.IsWarehousing = pIsWarehousing;
            objCVarPackageTypes.IsInactive = pIsInactive;

            objCVarPackageTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarPackageTypes.LockingUserID = 0;

            objCVarPackageTypes.CreatorUserID = objCVarPackageTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPackageTypes.CreationDate = objCVarPackageTypes.ModificationDate = DateTime.Now;
            objCVarPackageTypes.IsAddedManually = false;

            objCVarPackageTypes.crmCode = objCGetCreationInformation.lstCVarPackageTypes[0].crmCode;

            CPackageTypes objCPackageTypes = new CPackageTypes();
            objCPackageTypes.lstCVarPackageTypes.Add(objCVarPackageTypes);
            Exception checkException = objCPackageTypes.SaveMethod(objCPackageTypes.lstCVarPackageTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        //// [Route("/api/PackageTypes/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CPackageTypes objCPackageTypes = new CPackageTypes();
        //    objCPackageTypes.lstDeletedCPKPackageTypes.Add(new CPKPackageTypes() { ID = pID });
        //    objCPackageTypes.DeleteItem(objCPackageTypes.lstDeletedCPKPackageTypes);
        //}

        // [Route("/api/PackageTypes/Delete/{pPackageTypesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pPackageTypesIDs)
        {
            bool _result = false;
            CPackageTypes objCPackageTypes = new CPackageTypes();
            foreach (var currentID in pPackageTypesIDs.Split(','))
            {
                objCPackageTypes.lstDeletedCPKPackageTypes.Add(new CPKPackageTypes() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCPackageTypes.DeleteItem(objCPackageTypes.lstDeletedCPKPackageTypes);
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
        public object[] InsertFromOperations(string pCodeFromOperations, string pNameFromOperations, string pLocalNameFromOperations)
        {
            string _MessageReturned = "";

            CVarPackageTypes objCVarPackageTypes = new CVarPackageTypes();
            CPackageTypes objCPackageTypes = new CPackageTypes();
            objCVarPackageTypes.Code = pCodeFromOperations.ToUpper();
            objCVarPackageTypes.Name = pNameFromOperations.ToUpper();
            objCVarPackageTypes.LocalName = (pLocalNameFromOperations == null ? "" : pLocalNameFromOperations.ToUpper());
            objCVarPackageTypes.Notes = "";
            objCVarPackageTypes.PrintAs = "";
            objCVarPackageTypes.IsInactive = false;

            objCVarPackageTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarPackageTypes.LockingUserID = 0;

            objCVarPackageTypes.CreatorUserID = objCVarPackageTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPackageTypes.CreationDate = objCVarPackageTypes.ModificationDate = DateTime.Now;

            objCVarPackageTypes.crmCode = "";

            objCPackageTypes.lstCVarPackageTypes.Add(objCVarPackageTypes);
            Exception checkException = objCPackageTypes.SaveMethod(objCPackageTypes.lstCVarPackageTypes);
            if (checkException == null) //get returned data
            {
                objCPackageTypes.GetList("WHERE IsInactive=0 ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarPackageTypes.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCPackageTypes.lstCVarPackageTypes) : null //pPackageTypes = pData[2]
            };
        }

    }
}
