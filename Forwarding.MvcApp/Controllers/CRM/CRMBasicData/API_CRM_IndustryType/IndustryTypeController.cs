using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.CRM.API_CRM_Sources
{
    public class CRMIndustryTypeController : ApiController
    {
        //[Route("/api/CRM_Sources/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CCRM_Sources objCCRM_Sources = new CCRM_Sources();
            objCCRM_Sources.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_Sources.lstCVarCRM_Sources) };
        }

        // [Route("/api/CRM_Sources/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCRM_IndustryType objCCRMIndustryType = new CCRM_IndustryType();
            //objCvwCRM_Sources.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCRM_Sources.lstCVarCRM_Sources.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE N'%" + pSearchKey + "%' ";

            objCCRMIndustryType.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCCRMIndustryType.lstCVarCRM_IndustryType), _RowCount };
        }

        // [Route("/api/CRM_Sources/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pName)
        {
            bool _result = false;

            CVarCRM_IndustryType objCVarCRM_IndustryType = new CVarCRM_IndustryType();

            //objCVarCRM_IndustryType.Code = pCode.ToUpper();
            objCVarCRM_IndustryType.Name = pName.ToUpper();
            // objCVarCRM_IndustryType.HasDetails = Convert.ToBoolean( pHasDetails);

            objCVarCRM_IndustryType.CreationDate  = DateTime.Now;
            objCVarCRM_IndustryType.CreatorUserID = WebSecurity.CurrentUserId ;
            objCVarCRM_IndustryType.ModificationDate = DateTime.Now;
            objCVarCRM_IndustryType.modificationUserID = WebSecurity.CurrentUserId;

            CCRM_IndustryType objCCRM_IndustryType = new CCRM_IndustryType();
            objCCRM_IndustryType.lstCVarCRM_IndustryType.Add(objCVarCRM_IndustryType);
            Exception checkException = objCCRM_IndustryType.SaveMethod(objCCRM_IndustryType.lstCVarCRM_IndustryType);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/CRM_Sources/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, String pName)
        {
            bool _result = false;

            CVarCRM_IndustryType objCVarCRM_IndustryType = new CVarCRM_IndustryType();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCRM_IndustryType objCGetCreationInformation = new CCRM_IndustryType();
            objCGetCreationInformation.GetItem(pID);
            objCVarCRM_IndustryType.CreatorUserID = objCGetCreationInformation.lstCVarCRM_IndustryType[0].CreatorUserID;
            objCVarCRM_IndustryType.CreationDate = objCGetCreationInformation.lstCVarCRM_IndustryType[0].CreationDate;

            objCVarCRM_IndustryType.ID = pID;
            // objCVarCRM_IndustryType.CountryID = pCountryID;
            //objCVarCRM_Sources.Code = pCode.ToUpper();
            objCVarCRM_IndustryType.Name = pName.ToUpper();

            // objCVarCRM_Sources.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());

            objCVarCRM_IndustryType.modificationUserID = WebSecurity.CurrentUserId;
            objCVarCRM_IndustryType.ModificationDate = DateTime.Now;

            CCRM_IndustryType objCCRM_IndustryType = new CCRM_IndustryType();
            objCCRM_IndustryType.lstCVarCRM_IndustryType.Add(objCVarCRM_IndustryType);
            Exception checkException = objCCRM_IndustryType.SaveMethod(objCCRM_IndustryType.lstCVarCRM_IndustryType);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/CRM_Sources/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCRM_Sources objCCRM_Sources = new CCRM_Sources();
        //    objCCRM_Sources.lstDeletedCPKCRM_Sources.Add(new CPKCRM_Sources() { ID = pID });
        //    objCCRM_Sources.DeleteItem(objCCRM_Sources.lstDeletedCPKCRM_Sources);
        //}

        // [Route("api/CRM_Sources/Delete/{pCRM_SourcesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCRM_IndustryTypeIDs)
        {
            bool _result = false;
            CCRM_IndustryType objCCRM_IndustryType = new CCRM_IndustryType();
            foreach (var currentID in pCRM_IndustryTypeIDs.Split(','))
            {
                objCCRM_IndustryType.lstDeletedCPKCRM_IndustryType.Add(new CPKCRM_IndustryType() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_IndustryType.DeleteItem(objCCRM_IndustryType.lstDeletedCPKCRM_IndustryType);
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
