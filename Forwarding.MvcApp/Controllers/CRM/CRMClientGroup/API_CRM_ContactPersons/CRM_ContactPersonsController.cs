using Forwarding.MvcApp.Models.CRM.CRM_ContactPersons.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ContactPersons.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.CRM.CRM_ContactPersons
{
    public class CRM_ContactPersonsController : ApiController
    {
        //[Route("/api/CRM_ContactPersons/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
            objCCRM_ContactPersons.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_ContactPersons.lstCVarCRM_ContactPersons) };
        }





        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
            CCountries cCountries = new CCountries();
            CCRM_Sources cCRM_Sources = new CCRM_Sources();

            //--------------------------------------------
            objCCRM_ContactPersons.GetList("where 1 = 1");
            cCountries.GetList("where 1 = 1");
            cCRM_Sources.GetList("where 1 = 1");
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_ContactPersons.lstCVarCRM_ContactPersons) 
                          , new JavaScriptSerializer().Serialize(cCountries.lstCVarCountries) , new JavaScriptSerializer().Serialize(cCRM_Sources.lstCVarCRM_Sources) };
        }










        // [Route("/api/CRM_ContactPersons/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCRM_ContactPersons objCvwCRM_ContactPersons = new CCRM_ContactPersons();
            //objCvwCRM_ContactPersons.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCRM_ContactPersons.lstCVarCRM_ContactPersons.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwCRM_ContactPersons.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_ContactPersons.lstCVarCRM_ContactPersons), _RowCount };
        }




        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CCRM_ContactPersons objCvwCRM_ContactPersons = new CCRM_ContactPersons();
            //objCvwvwClients.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwvwClients.lstCVarvwClients.Count;

            //pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            //string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
            //    + " OR Name LIKE '%" + pSearchKey + "%' ";


            objCvwCRM_ContactPersons.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            // var result = CvwClients.lstCVarvwClients.DistinctBy(x => x.ID).ToList();
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_ContactPersons.lstCVarCRM_ContactPersons), _RowCount };
        }



        // [Route("/api/CRM_ContactPersons/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(//int pID,
            string pNameEn,
       string pNameAr,
       string pCellPhone,
      string pTelephone,
      string pExtensionNo,
        //txtAddress
      string pEmail,
      string pPersonalPhone,
      string pPersonalEmail,
      string pPosition,
      string pIsKeyPerson , string pClientID)
        {
            bool _result = false;
            CCRM_ContactPersons objCCRM_ContactPersonsExists = new CCRM_ContactPersons();
            objCCRM_ContactPersonsExists.GetList(" Where CRM_ClientsID = "+ int.Parse(pClientID) + " AND (NameEn = N'"+ pNameEn + "')");// OR NameAr = N'"+ pNameAr + "')");
            
            if (objCCRM_ContactPersonsExists.lstCVarCRM_ContactPersons.Count == 0)
            {
                CVarCRM_ContactPersons objCVarCRM_ContactPersons = new CVarCRM_ContactPersons();

                //objCVarCRM_ContactPersons.ID = pID;
                objCVarCRM_ContactPersons.ID = 0;
                objCVarCRM_ContactPersons.NameEn = pNameEn == null ? " " : pNameEn;
                objCVarCRM_ContactPersons.NameAr = pNameAr == null ? " " : pNameAr;
                objCVarCRM_ContactPersons.Email = pEmail == null ? " " : pEmail;
                objCVarCRM_ContactPersons.CellPhone = pCellPhone == null ? " " : pCellPhone;
                objCVarCRM_ContactPersons.Telephone = pTelephone == null ? " " : pTelephone;
                objCVarCRM_ContactPersons.ExtensionNo = pExtensionNo == null ? " " : pExtensionNo;
                objCVarCRM_ContactPersons.PersonalPhone = pPersonalPhone == null ? " " : pPersonalPhone;
                objCVarCRM_ContactPersons.PersonalEmail = pPersonalEmail == null ? " " : pPersonalEmail;
                objCVarCRM_ContactPersons.Position = pPosition == null ? " " : pPosition;
                objCVarCRM_ContactPersons.IsKeyPerson = pIsKeyPerson == null ? false : Convert.ToBoolean(pIsKeyPerson);
                objCVarCRM_ContactPersons.CRM_ClientsID = int.Parse(pClientID);
                objCVarCRM_ContactPersons.CreationDate = DateTime.Now;
                objCVarCRM_ContactPersons.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_ContactPersons.ModificationDate = DateTime.Now;
                objCVarCRM_ContactPersons.ModificationUserID = WebSecurity.CurrentUserId;

                CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
                objCCRM_ContactPersons.lstCVarCRM_ContactPersons.Add(objCVarCRM_ContactPersons);
                Exception checkException = objCCRM_ContactPersons.SaveMethod(objCCRM_ContactPersons.lstCVarCRM_ContactPersons);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            }
            else
                _result = false;
            return _result;
        }

        // [Route("/api/CRM_ContactPersons/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(string pID ,string pNameEn,
       string pNameAr,
       string pCellPhone,
      string pTelephone,
      string pExtensionNo,
        //txtAddress
      string pEmail,
      string pPersonalPhone,
      string pPersonalEmail,
      string pPosition,
      string pIsKeyPerson,
      string pClientID)
        {
            bool _result = false;
            //CCRM_ContactPersons objCCRM_ContactPersonsExists = new CCRM_ContactPersons();
            //objCCRM_ContactPersonsExists.GetList(" Where CRM_ClientsID = " + int.Parse(pClientID) + " AND (NameEn = N'" + pNameEn + "' OR NameAr = N'" + pNameAr + "')");

            //if (objCCRM_ContactPersonsExists.lstCVarCRM_ContactPersons.Count == 0)
            //{
                CVarCRM_ContactPersons objCVarCRM_ContactPersons = new CVarCRM_ContactPersons();
                //  CVarCRM_ContactPersons objCVarCRM_ContactPersons = new CVarCRM_ContactPersons();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CCRM_ContactPersons objCGetCreationInformation = new CCRM_ContactPersons();
                objCGetCreationInformation.GetItem(int.Parse(pID));
                objCVarCRM_ContactPersons.CreatorUserID = objCGetCreationInformation.lstCVarCRM_ContactPersons[0].CreatorUserID;
                objCVarCRM_ContactPersons.CreationDate = objCGetCreationInformation.lstCVarCRM_ContactPersons[0].CreationDate;
                objCVarCRM_ContactPersons.Email = pEmail == null ? " " : pEmail; objCVarCRM_ContactPersons.ID = int.Parse(pID);
                objCVarCRM_ContactPersons.NameEn = pNameEn == null ? " " : pNameEn;
                objCVarCRM_ContactPersons.NameAr = pNameAr == null ? " " : pNameAr;

                objCVarCRM_ContactPersons.CellPhone = pCellPhone == null ? " " : pCellPhone;
                objCVarCRM_ContactPersons.Telephone = pTelephone == null ? " " : pTelephone;


                objCVarCRM_ContactPersons.ExtensionNo = pExtensionNo == null ? " " : pExtensionNo;
                objCVarCRM_ContactPersons.PersonalPhone = pPersonalPhone == null ? " " : pPersonalPhone;


                objCVarCRM_ContactPersons.PersonalEmail = pPersonalEmail == null ? " " : pPersonalEmail;
                objCVarCRM_ContactPersons.Position = pPosition == null ? " " : pPosition;

                objCVarCRM_ContactPersons.IsKeyPerson = pIsKeyPerson == null ? false : Convert.ToBoolean(pIsKeyPerson);

                objCVarCRM_ContactPersons.CRM_ClientsID = int.Parse(pClientID);
                objCVarCRM_ContactPersons.ModificationUserID = WebSecurity.CurrentUserId;
                objCVarCRM_ContactPersons.ModificationDate = DateTime.Now;

                CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
                objCCRM_ContactPersons.lstCVarCRM_ContactPersons.Add(objCVarCRM_ContactPersons);
                Exception checkException = objCCRM_ContactPersons.SaveMethod(objCCRM_ContactPersons.lstCVarCRM_ContactPersons);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            //}
            //else
            //    _result = false;
            return _result;
        }

        // [Route("/api/CRM_ContactPersons/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
        //    objCCRM_ContactPersons.lstDeletedCPKCRM_ContactPersons.Add(new CPKCRM_ContactPersons() { ID = pID });
        //    objCCRM_ContactPersons.DeleteItem(objCCRM_ContactPersons.lstDeletedCPKCRM_ContactPersons);
        //}

        // [Route("api/CRM_ContactPersons/Delete/{pCRM_ContactPersonsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCRM_ContactPersonsIDs)
        {
            bool _result = false;
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
            foreach (var currentID in pCRM_ContactPersonsIDs.Split(','))
            {
                objCCRM_ContactPersons.lstDeletedCPKCRM_ContactPersons.Add(new CPKCRM_ContactPersons() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_ContactPersons.DeleteItem(objCCRM_ContactPersons.lstDeletedCPKCRM_ContactPersons);
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
