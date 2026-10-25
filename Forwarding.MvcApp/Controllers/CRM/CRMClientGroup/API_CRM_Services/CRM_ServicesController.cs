using Forwarding.MvcApp.Models.CRM.CRM_ContactPersons.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.CRM.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;

namespace Forwarding.MvcApp.Controllers.CRM.CRM_ContactPersons
{
    public class CRM_ServicesController : ApiController
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
        public Object[] GetPorts(Int32 pCountryID)
        {
            CPorts objCPorts = new CPorts();
            objCPorts.GetList(" Where CountryID = "+ pCountryID);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCPorts.lstCVarPorts)
           };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwCRM_Services objCvwCRM_Services = new CvwCRM_Services();

            objCvwCRM_Services.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_Services.lstCVarvwCRM_Services)};
        }
        
        // [Route("/api/CRM_ContactPersons/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool SaveService(
        int pCommodityID,int pActivityID,int pEquipmentID,int pPickUpCountryID,int pPickUpPortID,string pPickUpAddress,
        int pDeliveryCountryID,int pDeliveryPortID, string pDeliveryAddress, string pShipmentWeight, string pShipmentCBM, int pServiceID, int pClientID)
        {
            bool _result = false;
            //CCRM_Services objCCRM_ServicesExists = new CCRM_Services();
            //objCCRM_ServicesExists.GetList(" Where CRM_ClientsID = "+ pClientID + " AND (NameEn = N'"+ pNameEn + "' OR NameAr = N'"+ pNameAr + "')");
            
            //if (objCCRM_ServicesExists.lstCVarCRM_Services.Count == 0)
            //{
                CVarCRM_Services objCVarCRM_Services = new CVarCRM_Services();
                objCVarCRM_Services.ID = pServiceID;
                objCVarCRM_Services.CommodityID = pCommodityID;
                objCVarCRM_Services.ActivityID = pActivityID ;
                objCVarCRM_Services.EquipmentID = pEquipmentID ;
                objCVarCRM_Services.PickUpCountryID = pPickUpCountryID ;
                objCVarCRM_Services.PickUpPortID = pPickUpPortID;
                objCVarCRM_Services.PickUpAddress = pPickUpAddress;
                objCVarCRM_Services.DeliveryCountryID = pDeliveryCountryID;
                objCVarCRM_Services.DeliveryPortID = pDeliveryPortID;
            objCVarCRM_Services.DeliveryAddress = pDeliveryAddress;
            objCVarCRM_Services.ShipmentWeight = pShipmentWeight;
            objCVarCRM_Services.ShipmentCBM = pShipmentCBM;
            objCVarCRM_Services.ClientsID = pClientID;
                objCVarCRM_Services.CreationDate = DateTime.Now;
                objCVarCRM_Services.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_Services.ModificationDate = DateTime.Now;
                objCVarCRM_Services.ModificationUserID = WebSecurity.CurrentUserId;

                CCRM_Services objCCRM_Services = new CCRM_Services();
                objCCRM_Services.lstCVarCRM_Services.Add(objCVarCRM_Services);
                Exception checkException = objCCRM_Services.SaveMethod(objCCRM_Services.lstCVarCRM_Services);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
            {
                _result = true;
                //
                     CVarCRM_ServicesLog objCVarCRM_ServicesLog = new CVarCRM_ServicesLog();
                objCVarCRM_ServicesLog.ID = 0;
                objCVarCRM_ServicesLog.ServiceID = pActivityID;// objCVarCRM_Services.ID;
                objCVarCRM_ServicesLog.UserId = WebSecurity.CurrentUserId;
                objCVarCRM_ServicesLog.ActionName = pServiceID == 0 ? "Insert":"Update";// pEquipmentID;
                objCVarCRM_ServicesLog.CreationDate = DateTime.Now;
                objCVarCRM_ServicesLog.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_ServicesLog.ModificationDate = DateTime.Now;
                objCVarCRM_ServicesLog.ModifatorUserID = WebSecurity.CurrentUserId;

                //pClientID
                CCRM_Clients objCCRM_Clients = new CCRM_Clients();
                objCCRM_Clients.GetList(" Where ID = " + pClientID);
                objCVarCRM_ServicesLog.ClientName = objCCRM_Clients.lstCVarCRM_Clients[0].Name;
                CCRM_ServicesLog objCCRM_ServicesLog = new CCRM_ServicesLog();
                objCCRM_ServicesLog.lstCVarCRM_ServicesLog.Add(objCVarCRM_ServicesLog);
                Exception checkException1 = objCCRM_ServicesLog.SaveMethod(objCCRM_ServicesLog.lstCVarCRM_ServicesLog);
            }
                    
            //}
            //else
            //    _result = false;
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
            CCRM_ContactPersons objCCRM_ContactPersonsExists = new CCRM_ContactPersons();
            objCCRM_ContactPersonsExists.GetList(" Where CRM_ClientsID = " + int.Parse(pClientID) + " AND (NameEn = N'" + pNameEn + "' OR NameAr = N'" + pNameAr + "')");

            if (objCCRM_ContactPersonsExists.lstCVarCRM_ContactPersons.Count == 0)
            {
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
            }
            else
                _result = false;
            return _result;
        }
        
        // [Route("api/CRM_ContactPersons/Delete/{pCRM_ContactPersonsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCRM_ServicesIDs)
        {
            bool _result = false;
            CCRM_Services objCCRM_Services = new CCRM_Services();
            foreach (var currentID in pCRM_ServicesIDs.Split(','))
            {
                objCCRM_Services.lstDeletedCPKCRM_Services.Add(new CPKCRM_Services() { ID = Int32.Parse(currentID.Trim()) });
            }
            foreach (var currentID in pCRM_ServicesIDs.Split(','))
            {
                //CNoAccessCustomerActivity objNoAccessCustomerActivity = new CNoAccessCustomerActivity();
                CCRM_Services objCRM_Services = new CCRM_Services();
                objCRM_Services.GetList(" Where ID = " + Int32.Parse(currentID.Trim()));
                //objNoAccessCustomerActivity.GetList(" Where ID = " + objCRM_ServicesLog.lstCVarCRM_ServicesLog[0].ServiceID);
                CCRM_Clients objCCRM_Clients = new CCRM_Clients();
                objCCRM_Clients.GetList(" Where ID = " + objCRM_Services.lstCVarCRM_Services[0].ClientsID);

                CVarCRM_ServicesLog objCVarCRM_ServicesLog = new CVarCRM_ServicesLog();
                objCVarCRM_ServicesLog.ID = 0;
                objCVarCRM_ServicesLog.ServiceID = objCRM_Services.lstCVarCRM_Services[0].ActivityID;//Int32.Parse(currentID.Trim());// objCCRM_Services.lstDeletedCPKCRM_Services[i].ID;
                objCVarCRM_ServicesLog.UserId = WebSecurity.CurrentUserId;
                objCVarCRM_ServicesLog.ActionName = "Delete";// pEquipmentID;
                objCVarCRM_ServicesLog.CreationDate = DateTime.Now;
                objCVarCRM_ServicesLog.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_ServicesLog.ModificationDate = DateTime.Now;
                objCVarCRM_ServicesLog.ModifatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_ServicesLog.ClientName = objCCRM_Clients.lstCVarCRM_Clients[0].Name;
                CCRM_ServicesLog objCCRM_ServicesLog = new CCRM_ServicesLog();
                objCCRM_ServicesLog.lstCVarCRM_ServicesLog.Add(objCVarCRM_ServicesLog);
                Exception checkException1 = objCCRM_ServicesLog.SaveMethod(objCCRM_ServicesLog.lstCVarCRM_ServicesLog);
            }
            Exception checkException = objCCRM_Services.DeleteItem(objCCRM_Services.lstDeletedCPKCRM_Services);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
            {
                _result = true;

               
                
            }
            return _result;
        }
    }
}
