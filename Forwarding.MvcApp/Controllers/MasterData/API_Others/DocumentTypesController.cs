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
    public class DocumentTypesController : ApiController
    {
        //[Route("/api/DocumentTypes/LoadAll")]
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwDocumentTypes objCvwDocumentTypes = new CvwDocumentTypes();
            objCvwDocumentTypes.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwDocumentTypes.lstCVarvwDocumentTypes) };
        }

        // [Route("/api/DocumentTypes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CDocumentTypes objCDocumentTypes = new CDocumentTypes();
            //objCDocumentTypes.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCDocumentTypes.lstCVarDocumentTypes.Count;
            string whereClause = " Where LocalName LIKE '%" + pSearchKey + "%' "
                + " OR ISOCode LIKE '%" + pSearchKey + "%' ";
            objCDocumentTypes.GetListPaging(pPageSize, pPageNumber, whereClause, "Name", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCDocumentTypes.lstCVarDocumentTypes), _RowCount };
        }
        
        // [Route("/api/DocumentTypes/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(string pName, string pLocalName, string pISOCode, string pTableOrViewName, string pNotes, bool pIsImport, bool pIsExport, bool pIsDomestic, bool pIsOcean, bool pIsAir, bool pIsInland, bool pIsDocIn, bool pIsDocOut, bool pIsPrintISOCode)
        {
            bool _result = false;

            CVarDocumentTypes objCVarDocumentTypes = new CVarDocumentTypes();

            objCVarDocumentTypes.Name = (pName == null ? "" : pName.Trim());
            objCVarDocumentTypes.ISOCode = (pISOCode == null ? "" : pISOCode.ToUpper());
            objCVarDocumentTypes.LocalName = (pLocalName == null ? "" : pLocalName.Trim());
            objCVarDocumentTypes.TableOrViewName = (pTableOrViewName == null ? "" : pTableOrViewName.Trim());
            objCVarDocumentTypes.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarDocumentTypes.IsImport = pIsImport;
            objCVarDocumentTypes.IsExport = pIsExport;
            objCVarDocumentTypes.IsDomestic = pIsDomestic;
            objCVarDocumentTypes.IsOcean = pIsOcean;
            objCVarDocumentTypes.IsAir = pIsAir;
            objCVarDocumentTypes.IsInland = pIsInland;
            objCVarDocumentTypes.IsDocIn = pIsDocIn;
            objCVarDocumentTypes.IsDocOut = pIsDocOut;
            objCVarDocumentTypes.PrintISOCode = pIsPrintISOCode;

            objCVarDocumentTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarDocumentTypes.LockingUserID = 0;

            objCVarDocumentTypes.PrintDate = DateTime.Parse("01-01-1900");
            objCVarDocumentTypes.PrintUserID = 0;

            objCVarDocumentTypes.CreatorUserID = objCVarDocumentTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarDocumentTypes.CreationDate = objCVarDocumentTypes.ModificationDate = DateTime.Now;

            CDocumentTypes objCDocumentTypes = new CDocumentTypes();
            objCDocumentTypes.lstCVarDocumentTypes.Add(objCVarDocumentTypes);
            Exception checkException = objCDocumentTypes.SaveMethod(objCDocumentTypes.lstCVarDocumentTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/DocumentTypes/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName, string pLocalName, string pISOCode, string pTableOrViewName, string pNotes, bool pIsImport, bool pIsExport, bool pIsDomestic, bool pIsOcean, bool pIsAir, bool pIsInland, bool pIsDocIn, bool pIsDocOut, bool pIsPrintISOCode)
        {
            bool _result = false;

            CVarDocumentTypes objCVarDocumentTypes = new CVarDocumentTypes();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CDocumentTypes objCGetCreationInformation = new CDocumentTypes();
            objCGetCreationInformation.GetItem(pID);
            objCVarDocumentTypes.CreatorUserID = objCGetCreationInformation.lstCVarDocumentTypes[0].CreatorUserID;
            objCVarDocumentTypes.CreationDate = objCGetCreationInformation.lstCVarDocumentTypes[0].CreationDate;
            objCVarDocumentTypes.ShowHeader = objCGetCreationInformation.lstCVarDocumentTypes[0].ShowHeader;
            objCVarDocumentTypes.ShowFooter = objCGetCreationInformation.lstCVarDocumentTypes[0].ShowFooter;

            objCVarDocumentTypes.ID = pID;
            objCVarDocumentTypes.Name = (pName == null ? "" : pName.Trim());
            objCVarDocumentTypes.ISOCode = (pISOCode == null ? "" : pISOCode.ToUpper());
            objCVarDocumentTypes.LocalName = (pLocalName == null ? "" : pLocalName.Trim());
            objCVarDocumentTypes.TableOrViewName = (pTableOrViewName == null ? "" : pTableOrViewName.Trim());
            objCVarDocumentTypes.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarDocumentTypes.IsImport = pIsImport;
            objCVarDocumentTypes.IsExport = pIsExport;
            objCVarDocumentTypes.IsDomestic = pIsDomestic;
            objCVarDocumentTypes.IsOcean = pIsOcean;
            objCVarDocumentTypes.IsAir = pIsAir;
            objCVarDocumentTypes.IsInland = pIsInland;
            objCVarDocumentTypes.IsDocIn = pIsDocIn;
            objCVarDocumentTypes.IsDocOut = pIsDocOut;
            objCVarDocumentTypes.PrintISOCode = pIsPrintISOCode;

            objCVarDocumentTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarDocumentTypes.LockingUserID = 0;

            objCVarDocumentTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarDocumentTypes.ModificationDate = DateTime.Now;

            CDocumentTypes objCDocumentTypes = new CDocumentTypes();
            objCDocumentTypes.lstCVarDocumentTypes.Add(objCVarDocumentTypes);
            Exception checkException = objCDocumentTypes.SaveMethod(objCDocumentTypes.lstCVarDocumentTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        //// [Route("/api/DocumentTypes/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CDocumentTypes objCDocumentTypes = new CDocumentTypes();
        //    objCDocumentTypes.lstDeletedCPKDocumentTypes.Add(new CPKDocumentTypes() { ID = pID });
        //    objCDocumentTypes.DeleteItem(objCDocumentTypes.lstDeletedCPKDocumentTypes);
        //}

        // [Route("/api/DocumentTypes/Delete/{pDocumentTypesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pDocumentTypesIDs)
        {
            bool _result = false;
            CDocumentTypes objCDocumentTypes = new CDocumentTypes();
            foreach (var currentID in pDocumentTypesIDs.Split(','))
            {
                objCDocumentTypes.lstDeletedCPKDocumentTypes.Add(new CPKDocumentTypes() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCDocumentTypes.DeleteItem(objCDocumentTypes.lstDeletedCPKDocumentTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        ////[Route("/api/DocumentTypes/CheckRow/{pDocumentTypesID}")]
        //[HttpGet, HttpPost]
        //public Boolean CheckRow(String pID)
        //{
        //    bool _result = false;
        //    // var xx = HttpContext.Current.Session["UserID"].ToString();
        //    CDocumentTypes objCDocumentTypes = new CDocumentTypes();
        //    objCDocumentTypes.GetItem(int.Parse(pID));

        //    //if (objCDocumentTypes.lstCVarDocumentTypes[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
        //    if (objCDocumentTypes.lstCVarDocumentTypes[0].LockingUserID == 0)
        //    {
        //        //record is not locked so lock it then return false
        //        objCDocumentTypes.lstCVarDocumentTypes[0].TimeLocked = DateTime.Now;
        //        objCDocumentTypes.lstCVarDocumentTypes[0].LockingUserID = WebSecurity.CurrentUserId;
        //        objCDocumentTypes.lstCVarDocumentTypes.Add(objCDocumentTypes.lstCVarDocumentTypes[0]);
        //        objCDocumentTypes.SaveMethod(objCDocumentTypes.lstCVarDocumentTypes);
        //        _result = false;
        //    }
        //    else
        //    {
        //        _result = true;//record is locked
        //    }
        //    return _result;
        //}

        ////[Route("/api/DocumentTypes/UnlockRecord/{pID}")]
        //[HttpGet, HttpPost]
        //public Boolean UnlockRecord(string pID)
        //{
        //    bool _result = false;
        //    try
        //    {
        //        CDocumentTypes objCDocumentTypes = new CDocumentTypes();
        //        objCDocumentTypes.GetItem(int.Parse(pID));

        //        objCDocumentTypes.lstCVarDocumentTypes[0].TimeLocked = DateTime.Parse("01-01-1900");
        //        objCDocumentTypes.lstCVarDocumentTypes[0].LockingUserID = 0;
        //        objCDocumentTypes.lstCVarDocumentTypes.Add(objCDocumentTypes.lstCVarDocumentTypes[0]);
        //        objCDocumentTypes.SaveMethod(objCDocumentTypes.lstCVarDocumentTypes);
        //        _result = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        _result = false;//record is locked
        //    }
        //    return _result;
        //}
    }
}
