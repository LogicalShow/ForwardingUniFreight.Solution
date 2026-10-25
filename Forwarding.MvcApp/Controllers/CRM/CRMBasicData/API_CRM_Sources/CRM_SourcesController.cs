using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
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
    public class CRM_SourcesController : ApiController
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
            CCRM_Sources objCvwCRM_Sources = new CCRM_Sources();
            //objCvwCRM_Sources.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCRM_Sources.lstCVarCRM_Sources.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwCRM_Sources.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_Sources.lstCVarCRM_Sources), _RowCount };
        }

        // [Route("/api/CRM_Sources/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pCode, String pName)
        {
            bool _result = false;

            CVarCRM_Sources objCVarCRM_Sources = new CVarCRM_Sources();

            objCVarCRM_Sources.Code = pCode.ToUpper();
            objCVarCRM_Sources.Name = pName.ToUpper();
           // objCVarCRM_Sources.HasDetails = Convert.ToBoolean( pHasDetails);

            objCVarCRM_Sources.CreationDate  = DateTime.Now;
            objCVarCRM_Sources.CreatorUserID = WebSecurity.CurrentUserId ;
            objCVarCRM_Sources.ModificationDate = DateTime.Now;
            objCVarCRM_Sources.ModificatorUserID = WebSecurity.CurrentUserId;

            CCRM_Sources objCCRM_Sources = new CCRM_Sources();
            objCCRM_Sources.lstCVarCRM_Sources.Add(objCVarCRM_Sources);
            Exception checkException = objCCRM_Sources.SaveMethod(objCCRM_Sources.lstCVarCRM_Sources);
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
        public bool Update(Int32 pID,  String pCode, String pName)
        {
            bool _result = false;

            CVarCRM_Sources objCVarCRM_Sources = new CVarCRM_Sources();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCRM_Sources objCGetCreationInformation = new CCRM_Sources();
            objCGetCreationInformation.GetItem(pID);
            objCVarCRM_Sources.CreatorUserID = objCGetCreationInformation.lstCVarCRM_Sources[0].CreatorUserID;
            objCVarCRM_Sources.CreationDate = objCGetCreationInformation.lstCVarCRM_Sources[0].CreationDate;
                
            objCVarCRM_Sources.ID = pID;
           // objCVarCRM_Sources.CountryID = pCountryID;
            objCVarCRM_Sources.Code = pCode.ToUpper();
            objCVarCRM_Sources.Name = pName.ToUpper();
    
            // objCVarCRM_Sources.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());

            objCVarCRM_Sources.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_Sources.ModificationDate = DateTime.Now;

            CCRM_Sources objCCRM_Sources = new CCRM_Sources();
            objCCRM_Sources.lstCVarCRM_Sources.Add(objCVarCRM_Sources);
            Exception checkException = objCCRM_Sources.SaveMethod(objCCRM_Sources.lstCVarCRM_Sources);
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
        public bool Delete(String pCRM_SourcesIDs)
        {
            bool _result = false;
            CCRM_Sources objCCRM_Sources = new CCRM_Sources();
            foreach (var currentID in pCRM_SourcesIDs.Split(','))
            {
                objCCRM_Sources.lstDeletedCPKCRM_Sources.Add(new CPKCRM_Sources() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_Sources.DeleteItem(objCCRM_Sources.lstDeletedCPKCRM_Sources);
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
