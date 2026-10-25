using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Locations
{
    public class IncotermsController : ApiController
    {
        //[Route("/api/Incoterms/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CIncoterms objCIncoterms = new CIncoterms();
            objCIncoterms.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCIncoterms.lstCVarIncoterms) };
        }

        // [Route("/api/Incoterms/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwIncoterms objCvwIncoterms = new CvwIncoterms();
            //objCvwIncoterms.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwIncoterms.lstCVarIncoterms.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' "
                + " OR FreightTypeCode LIKE '%" + pSearchKey + "%' "
                + " OR OtherChargesCode LIKE '%" + pSearchKey + "%' "; //sherif: otherchargesCode

            objCvwIncoterms.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwIncoterms.lstCVarvwIncoterms), _RowCount };
        }

        // [Route("/api/Countries/Insert/{pCountryCode}/{pModificatorUser}/{pCountryLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(Int32 pFreightTypeID, Int32 pOtherChargesID, String pCode, String pName, String pLocalName/*, bool pIsAddedManually*/, bool pIsInactive)
        {
            bool _result = false;
            CVarIncoterms objCVarIncoterms = new CVarIncoterms();

            objCVarIncoterms.FreightTypeID = pFreightTypeID;
            objCVarIncoterms.OtherChargesID = pOtherChargesID;

            objCVarIncoterms.Code = pCode.ToUpper();
            objCVarIncoterms.Name = pName.ToUpper();
            objCVarIncoterms.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            //objCVarIncoterms.IsAddedManually = pIsAddedManually;
            objCVarIncoterms.IsInactive = pIsInactive;
            objCVarIncoterms.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarIncoterms.LockingUserID = 0;

            objCVarIncoterms.Description = "";

            objCVarIncoterms.CreatorUserID = objCVarIncoterms.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarIncoterms.CreationDate = objCVarIncoterms.ModificationDate = DateTime.Now;

            CIncoterms objCIncoterms = new CIncoterms();
            objCIncoterms.lstCVarIncoterms.Add(objCVarIncoterms);
            Exception checkException = objCIncoterms.SaveMethod(objCIncoterms.lstCVarIncoterms);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Incoterms/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pFreightTypeID, Int32 pOtherChargesID, String pCode, String pName, String pLocalName/*, bool pIsAddedManually*/, bool pIsInactive)
        {
            bool _result = false;
            CVarIncoterms objCVarIncoterms = new CVarIncoterms();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CIncoterms objCGetCreationInformation = new CIncoterms();
            objCGetCreationInformation.GetItem(pID);
            objCVarIncoterms.CreatorUserID = objCGetCreationInformation.lstCVarIncoterms[0].CreatorUserID;
            objCVarIncoterms.CreationDate = objCGetCreationInformation.lstCVarIncoterms[0].CreationDate;
                
            objCVarIncoterms.ID = pID;
            objCVarIncoterms.FreightTypeID = pFreightTypeID;
            objCVarIncoterms.OtherChargesID = pOtherChargesID;

            objCVarIncoterms.Code = pCode.ToUpper();
            objCVarIncoterms.Name = pName.ToUpper();
            objCVarIncoterms.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
                
            objCVarIncoterms.Description = "";
                
            //objCVarIncoterms.IsAddedManually = pIsAddedManually;
            objCVarIncoterms.IsInactive = pIsInactive;
            objCVarIncoterms.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarIncoterms.LockingUserID = 0;

            objCVarIncoterms.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarIncoterms.ModificationDate = DateTime.Now;

            CIncoterms objCIncoterms = new CIncoterms();
            objCIncoterms.lstCVarIncoterms.Add(objCVarIncoterms);
            Exception checkException = objCIncoterms.SaveMethod(objCIncoterms.lstCVarIncoterms);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Countries/DeleteByID/{pCountryID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pCountryID)
        //{
        //    CCountries objCCountries = new CCountries();
        //    objCCountries.lstDeletedCPKCountries.Add(new CPKCountries() { CountryID = pCountryID });
        //    objCCountries.DeleteItem(objCCountries.lstDeletedCPKCountries);
        //}

        // [Route("api/Countries/Delete/{pCountriesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pIncotermsIDs)
        {
            bool _result = false;
            CIncoterms objCIncoterms = new CIncoterms();
            foreach (var currentID in pIncotermsIDs.Split(','))
            {
                objCIncoterms.lstDeletedCPKIncoterms.Add(new CPKIncoterms() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCIncoterms.DeleteItem(objCIncoterms.lstDeletedCPKIncoterms);
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

            CVarIncoterms objCVarIncoterms = new CVarIncoterms();
            CIncoterms objCIncoterms = new CIncoterms();

            objCVarIncoterms.FreightTypeID = 0;
            objCVarIncoterms.OtherChargesID = 0;

            objCVarIncoterms.Code = pCodeFromOperations.ToUpper();
            objCVarIncoterms.Name = pNameFromOperations.ToUpper();
            objCVarIncoterms.LocalName = (pLocalNameFromOperations == null ? "" : pLocalNameFromOperations.ToUpper());
            objCVarIncoterms.Description = "";
            objCVarIncoterms.IsInactive = false;

            objCVarIncoterms.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarIncoterms.LockingUserID = 0;

            objCVarIncoterms.CreatorUserID = objCVarIncoterms.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarIncoterms.CreationDate = objCVarIncoterms.ModificationDate = DateTime.Now;

            objCIncoterms.lstCVarIncoterms.Add(objCVarIncoterms);
            Exception checkException = objCIncoterms.SaveMethod(objCIncoterms.lstCVarIncoterms);
            if (checkException == null) //get returned data
            {
                objCIncoterms.GetList("WHERE IsInactive=0 ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarIncoterms.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCIncoterms.lstCVarIncoterms) : null //pIncoterms = pData[2]
            };
        }

    }
}
