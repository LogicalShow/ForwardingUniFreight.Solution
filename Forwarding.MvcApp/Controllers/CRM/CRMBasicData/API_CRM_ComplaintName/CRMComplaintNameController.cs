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
    public class CRMComplaintNameController : ApiController
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
            CCRM_ComplaintName objCCRMComplaintName = new CCRM_ComplaintName();
            Int32 _RowCount = 0;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE N'%" + pSearchKey + "%' ";

            objCCRMComplaintName.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCCRMComplaintName.lstCVarCRM_ComplaintName), _RowCount };
        }
        
        [HttpGet, HttpPost]
        public bool Insert(String pName)
        {
            bool _result = false;

            CVarCRM_ComplaintName objCVarCRM_ComplaintName = new CVarCRM_ComplaintName();

            //objCVarCRM_ComplaintName.Code = pCode.ToUpper();
            objCVarCRM_ComplaintName.Name = pName.ToUpper();
            // objCVarCRM_ComplaintName.HasDetails = Convert.ToBoolean( pHasDetails);

            objCVarCRM_ComplaintName.CreationDate  = DateTime.Now;
            objCVarCRM_ComplaintName.CreatorUserID = WebSecurity.CurrentUserId ;
            objCVarCRM_ComplaintName.ModificationDate = DateTime.Now;
            objCVarCRM_ComplaintName.modificationUserID = WebSecurity.CurrentUserId;

            CCRM_ComplaintName objCCRM_ComplaintName = new CCRM_ComplaintName();
            objCCRM_ComplaintName.lstCVarCRM_ComplaintName.Add(objCVarCRM_ComplaintName);
            Exception checkException = objCCRM_ComplaintName.SaveMethod(objCCRM_ComplaintName.lstCVarCRM_ComplaintName);
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

            CVarCRM_ComplaintName objCVarCRM_ComplaintName = new CVarCRM_ComplaintName();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCRM_ComplaintName objCGetCreationInformation = new CCRM_ComplaintName();
            objCGetCreationInformation.GetItem(pID);
            objCVarCRM_ComplaintName.CreatorUserID = objCGetCreationInformation.lstCVarCRM_ComplaintName[0].CreatorUserID;
            objCVarCRM_ComplaintName.CreationDate = objCGetCreationInformation.lstCVarCRM_ComplaintName[0].CreationDate;

            objCVarCRM_ComplaintName.ID = pID;
            // objCVarCRM_ComplaintName.CountryID = pCountryID;
            //objCVarCRM_Sources.Code = pCode.ToUpper();
            objCVarCRM_ComplaintName.Name = pName.ToUpper();

            // objCVarCRM_Sources.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());

            objCVarCRM_ComplaintName.modificationUserID = WebSecurity.CurrentUserId;
            objCVarCRM_ComplaintName.ModificationDate = DateTime.Now;

            CCRM_ComplaintName objCCRM_ComplaintName = new CCRM_ComplaintName();
            objCCRM_ComplaintName.lstCVarCRM_ComplaintName.Add(objCVarCRM_ComplaintName);
            Exception checkException = objCCRM_ComplaintName.SaveMethod(objCCRM_ComplaintName.lstCVarCRM_ComplaintName);
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
        public bool Delete(String pCRM_ComplaintNameIDs)
        {
            bool _result = false;
            CCRM_ComplaintName objCCRM_ComplaintName = new CCRM_ComplaintName();
            foreach (var currentID in pCRM_ComplaintNameIDs.Split(','))
            {
                objCCRM_ComplaintName.lstDeletedCPKCRM_ComplaintName.Add(new CPKCRM_ComplaintName() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_ComplaintName.DeleteItem(objCCRM_ComplaintName.lstDeletedCPKCRM_ComplaintName);
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
