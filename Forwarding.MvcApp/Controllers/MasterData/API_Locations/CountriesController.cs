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
    public class CountriesController : ApiController
    {
        //[Route("/api/Countries/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CCountries objCCountries = new CCountries();
            objCCountries.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCountries.lstCVarCountries) };
        }

        // [Route("/api/Countries/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwCountries objCvwCountries = new CvwCountries();
            //objCvwCountries.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCountries.lstCVarCountries.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' "
                //+ " OR RegionCode LIKE '%" + pSearchKey + "%' "
                + " OR RegionName LIKE '%" + pSearchKey + "%' ";

            objCvwCountries.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCountries.lstCVarvwCountries), _RowCount };
        }

        // [Route("/api/Countries/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(Int32 pRegionID,  String pCode, String pName, String pLocalName)
        {
            bool _result = false;

            CVarCountries objCVarCountries = new CVarCountries();

            objCVarCountries.RegionID = pRegionID;
            objCVarCountries.Code = pCode.ToUpper();
            objCVarCountries.Name = pName.ToUpper();
            objCVarCountries.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());

            objCVarCountries.CreatorUserID = objCVarCountries.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCountries.CreationDate = objCVarCountries.ModificationDate = DateTime.Now;

            CCountries objCCountries = new CCountries();
            objCCountries.lstCVarCountries.Add(objCVarCountries);
            Exception checkException = objCCountries.SaveMethod(objCCountries.lstCVarCountries);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Countries/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pRegionID, String pCode, String pName, String pLocalName)
        {
            bool _result = false;

            CVarCountries objCVarCountries = new CVarCountries();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCountries objCGetCreationInformation = new CCountries();
            objCGetCreationInformation.GetItem(pID);
            objCVarCountries.CreatorUserID = objCGetCreationInformation.lstCVarCountries[0].CreatorUserID;
            objCVarCountries.CreationDate = objCGetCreationInformation.lstCVarCountries[0].CreationDate;
                
            objCVarCountries.ID = pID;
            objCVarCountries.RegionID = pRegionID;
            objCVarCountries.Code = pCode.ToUpper();
            objCVarCountries.Name = pName.ToUpper();
            objCVarCountries.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
                
            objCVarCountries.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCountries.ModificationDate = DateTime.Now;

            CCountries objCCountries = new CCountries();
            objCCountries.lstCVarCountries.Add(objCVarCountries);
            Exception checkException = objCCountries.SaveMethod(objCCountries.lstCVarCountries);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Countries/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCountries objCCountries = new CCountries();
        //    objCCountries.lstDeletedCPKCountries.Add(new CPKCountries() { ID = pID });
        //    objCCountries.DeleteItem(objCCountries.lstDeletedCPKCountries);
        //}

        // [Route("api/Countries/Delete/{pCountriesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCountriesIDs)
        {
            bool _result = false;
            CCountries objCCountries = new CCountries();
            foreach (var currentID in pCountriesIDs.Split(','))
            {
                objCCountries.lstDeletedCPKCountries.Add(new CPKCountries() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCountries.DeleteItem(objCCountries.lstDeletedCPKCountries);
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
