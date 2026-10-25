using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
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
    public class CitiesController : ApiController
    {
        //[Route("/api/Cities/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CCities objCCities = new CCities();
            objCCities.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCities.lstCVarCities) };
        }

        // [Route("/api/Cities/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwCities objCvwCities = new CvwCities();
            //objCvwCities.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCities.lstCVarCities.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' "
                //+ " OR CountryName LIKE '%" + pSearchKey + "%' "
                + " OR CountryName LIKE '%" + pSearchKey + "%' ";

            objCvwCities.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCities.lstCVarvwCities), _RowCount };
        }

        // [Route("/api/Cities/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(Int32 pCountryID,  String pCode, String pName, String pLocalName)
        {
            bool _result = false;

            CVarCities objCVarCities = new CVarCities();

            objCVarCities.CountryID = pCountryID;
            objCVarCities.Code = pCode.ToUpper();
            objCVarCities.Name = pName.ToUpper();
            objCVarCities.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());

            objCVarCities.CreatorUserID = objCVarCities.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCities.CreationDate = objCVarCities.ModificationDate = DateTime.Now;

            CCities objCCities = new CCities();
            objCCities.lstCVarCities.Add(objCVarCities);
            Exception checkException = objCCities.SaveMethod(objCCities.lstCVarCities);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Cities/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pCountryID, String pCode, String pName, String pLocalName)
        {
            bool _result = false;

            CVarCities objCVarCities = new CVarCities();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCities objCGetCreationInformation = new CCities();
            objCGetCreationInformation.GetItem(pID);
            objCVarCities.CreatorUserID = objCGetCreationInformation.lstCVarCities[0].CreatorUserID;
            objCVarCities.CreationDate = objCGetCreationInformation.lstCVarCities[0].CreationDate;
                
            objCVarCities.ID = pID;
            objCVarCities.CountryID = pCountryID;
            objCVarCities.Code = pCode.ToUpper();
            objCVarCities.Name = pName.ToUpper();
            objCVarCities.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
                
            objCVarCities.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCities.ModificationDate = DateTime.Now;

            CCities objCCities = new CCities();
            objCCities.lstCVarCities.Add(objCVarCities);
            Exception checkException = objCCities.SaveMethod(objCCities.lstCVarCities);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Cities/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCities objCCities = new CCities();
        //    objCCities.lstDeletedCPKCities.Add(new CPKCities() { ID = pID });
        //    objCCities.DeleteItem(objCCities.lstDeletedCPKCities);
        //}

        // [Route("api/Cities/Delete/{pCitiesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCitiesIDs)
        {
            bool _result = false;
            CCities objCCities = new CCities();
            foreach (var currentID in pCitiesIDs.Split(','))
            {
                objCCities.lstDeletedCPKCities.Add(new CPKCities() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCities.DeleteItem(objCCities.lstDeletedCPKCities);
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
