using Forwarding.MvcApp.Models.CRM.CRM_ActionDetails.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ActionDetails.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.CRM.CRM_ActionDetails
{
    public class CRM_ActionDetailsController : ApiController
    {
        //[Route("/api/CRM_ActionDetails/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CCRM_ActionDetails objCCRM_ActionDetails = new CCRM_ActionDetails();
            objCCRM_ActionDetails.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_ActionDetails.lstCVarCRM_ActionDetails) };
        }


        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CCRM_ActionDetails objCvwCRM_ActionDetails = new CCRM_ActionDetails();
            //objCvwvwCRM_FollowUps.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwvwCRM_FollowUps.lstCVarvwCRM_FollowUps.Count;

            //pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            //string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
            //    + " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwCRM_ActionDetails.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            // var result = CvwCRM_FollowUps.lstCVarvwCRM_FollowUps.DistinctBy(x => x.ID).ToList();
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_ActionDetails.lstCVarCRM_ActionDetails), _RowCount };
        }


        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
            CCRM_Actions objActions = new CCRM_Actions();


            //--------------------------------------------
            objActions.GetList("where 1 = 1");
        
         
            return new Object[] { new JavaScriptSerializer().Serialize(objActions.lstCVarCRM_Actions)  };
        }










        // [Route("/api/CRM_ActionDetails/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCRM_ActionDetails objCvwCRM_ActionDetails = new CCRM_ActionDetails();
            //objCvwCRM_ActionDetails.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCRM_ActionDetails.lstCVarCRM_ActionDetails.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwCRM_ActionDetails.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_ActionDetails.lstCVarCRM_ActionDetails), _RowCount };
        }

        // [Route("/api/CRM_ActionDetails/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]



    

        [HttpGet, HttpPost]
        public bool Insert(string pAbout,
       string pLocation,
       string pResults,
       string pNote,
       string pFollowUpID)
        {
            bool _result = false;

            CVarCRM_ActionDetails objCVarCRM_ActionDetails = new CVarCRM_ActionDetails();

            objCVarCRM_ActionDetails.About = pAbout == null ? " " : pAbout;
            objCVarCRM_ActionDetails.Location = pLocation == null ? " " : pLocation;
            objCVarCRM_ActionDetails.Results = pResults == null ? " " : pResults;
            objCVarCRM_ActionDetails.Note = pNote == null ? " " : pNote;

            objCVarCRM_ActionDetails.CRM_FollowID = pFollowUpID == null ? 0 : int.Parse(pFollowUpID);




           // objCVarCRM_ActionDetails.ActionTime = DateTime.Now ;

            objCVarCRM_ActionDetails.CRM_ActionID = 0;



            objCVarCRM_ActionDetails.CreationDate  = DateTime.Now;
            objCVarCRM_ActionDetails.CreatorUserID = WebSecurity.CurrentUserId ;
            objCVarCRM_ActionDetails.ModificationDate = DateTime.Now;
            objCVarCRM_ActionDetails.ModificationUserID = WebSecurity.CurrentUserId;

            CCRM_ActionDetails objCCRM_ActionDetails = new CCRM_ActionDetails();
            objCCRM_ActionDetails.lstCVarCRM_ActionDetails.Add(objCVarCRM_ActionDetails);
            Exception checkException = objCCRM_ActionDetails.SaveMethod(objCCRM_ActionDetails.lstCVarCRM_ActionDetails);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/CRM_ActionDetails/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(string pID , string pAbout,
       string pLocation,
       string pResults,
       string pNote,
       string pFollowUpID)
        {
            bool _result = false;

            CVarCRM_ActionDetails objCVarCRM_ActionDetails = new CVarCRM_ActionDetails();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCRM_ActionDetails objCGetCreationInformation = new CCRM_ActionDetails();
            objCGetCreationInformation.GetItem(int.Parse(pID));
            objCVarCRM_ActionDetails.CreatorUserID = objCGetCreationInformation.lstCVarCRM_ActionDetails[0].CreatorUserID;
            objCVarCRM_ActionDetails.CreationDate = objCGetCreationInformation.lstCVarCRM_ActionDetails[0].CreationDate;
            objCVarCRM_ActionDetails.ID = int.Parse(pID); 
            objCVarCRM_ActionDetails.About = pAbout == null ? " " : pAbout;
            objCVarCRM_ActionDetails.Location = pLocation == null ? " " : pLocation;
            objCVarCRM_ActionDetails.Results = pResults == null ? " " : pResults;
            objCVarCRM_ActionDetails.Note = pNote == null ? " " : pNote;

            objCVarCRM_ActionDetails.CRM_FollowID = pFollowUpID == null ? 0 : int.Parse(pFollowUpID);



            objCVarCRM_ActionDetails.CRM_ActionID = 0;
         //   objCVarCRM_ActionDetails.ActionTime = DateTime.Now;

            objCVarCRM_ActionDetails.ModificationUserID = WebSecurity.CurrentUserId;
            objCVarCRM_ActionDetails.ModificationDate = DateTime.Now;

            CCRM_ActionDetails objCCRM_ActionDetails = new CCRM_ActionDetails();
            objCCRM_ActionDetails.lstCVarCRM_ActionDetails.Add(objCVarCRM_ActionDetails);
            Exception checkException = objCCRM_ActionDetails.SaveMethod(objCCRM_ActionDetails.lstCVarCRM_ActionDetails);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/CRM_ActionDetails/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCRM_ActionDetails objCCRM_ActionDetails = new CCRM_ActionDetails();
        //    objCCRM_ActionDetails.lstDeletedCPKCRM_ActionDetails.Add(new CPKCRM_ActionDetails() { ID = pID });
        //    objCCRM_ActionDetails.DeleteItem(objCCRM_ActionDetails.lstDeletedCPKCRM_ActionDetails);
        //}

        // [Route("api/CRM_ActionDetails/Delete/{pCRM_ActionDetailsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCRM_ActionDetailsIDs)
        {
            bool _result = false;
            CCRM_ActionDetails objCCRM_ActionDetails = new CCRM_ActionDetails();
            foreach (var currentID in pCRM_ActionDetailsIDs.Split(','))
            {
                objCCRM_ActionDetails.lstDeletedCPKCRM_ActionDetails.Add(new CPKCRM_ActionDetails() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_ActionDetails.DeleteItem(objCCRM_ActionDetails.lstDeletedCPKCRM_ActionDetails);
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
