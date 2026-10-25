using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Locations
{
    public class PortsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CPorts objCPorts = new CPorts();
            objCPorts.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCPorts.lstCVarPorts) };
        }
        [HttpGet, HttpPost]
        public Object[] LoadAllForCombo(string pWhereClauseForCombo)
        {
            CvwPortsForCombo objCPortsForCombo = new CvwPortsForCombo();
            objCPortsForCombo.GetList(pWhereClauseForCombo);
            return new Object[] { new JavaScriptSerializer().Serialize(objCPortsForCombo.lstCVarvwPortsForCombo) };
        }

        [HttpGet, HttpPost]
        public string GetCountries(string pPortsList)
        {
            CvwPorts objCPorts = new CvwPorts();
            string CountriesList = "";

            string[] PortsArray = pPortsList.Split(',');
            int NumberOfPorts = PortsArray.Length;
            
            for (int i = 0; i < NumberOfPorts; i++)
            {
                objCPorts.GetList(" WHERE ID=" + PortsArray[i]);
                CountriesList += ((CountriesList == "" ? "" : ",") + objCPorts.lstCVarvwPorts[0].CountryID);
            }

            return CountriesList;
        }


        [HttpGet, HttpPost]
        public int GetCountry(int id)
        {
            CvwPorts objCPorts = new CvwPorts();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var Result = objCCustomizedDBCall.CallStringFunction("select CountryID from vwPorts where id =" + id);
            var Countries = int.Parse(Result);
            return Countries;
        }


        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwPorts objCvwPorts = new CvwPorts();
            //objCvwPorts.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCvwPorts.lstCVarvwPorts.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where (Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' "
                + " OR CountryName LIKE '%" + pSearchKey + "%')  AND (IsFactories IS NULL OR IsFactories = 0)";
            objCvwPorts.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwPorts.lstCVarvwPorts), _RowCount };
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging_Factories(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwPorts objCvwPorts = new CvwPorts();
            //objCvwPorts.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCvwPorts.lstCVarvwPorts.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where (Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' "
                + " OR CountryName LIKE '%" + pSearchKey + "%') AND IsFactories IS NOT NULL AND IsFactories = 1";
            objCvwPorts.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwPorts.lstCVarvwPorts), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(Int32 pCountryID, Int32 pFactoryCityID, String pCode, String pName, String pLocalName, bool pIsInactive, bool pIsPort, bool pIsAir, bool pIsOcean, bool pIsInland
            , String pAddress, String pTelephoneNumber, String pEmail, String pContactPerson, Boolean pIsFactories)
        {
            bool _result = false;
            CVarPorts objCVarPorts = new CVarPorts();

            objCVarPorts.Code = (pCode.ToUpper() == null ? "0" : pCode.ToUpper());
            objCVarPorts.Name = (pName.ToUpper() == null ? "0" : pName.ToUpper());
            objCVarPorts.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            
            objCVarPorts.Notes = "";
            
            objCVarPorts.CountryID = pCountryID;
            objCVarPorts.FactoryCityID = pFactoryCityID;
            objCVarPorts.IsInactive = pIsInactive;
            objCVarPorts.IsPort = pIsPort;
            objCVarPorts.IsAir = pIsAir;
            objCVarPorts.IsOcean = pIsOcean;
            objCVarPorts.IsInland = pIsInland;
            

            objCVarPorts.Address = (pAddress == null ? "0" : pAddress);
            objCVarPorts.TelephoneNumber = (pTelephoneNumber == null ? "0" : pTelephoneNumber);
            objCVarPorts.Email = (pEmail == null ? "0" : pEmail);
            objCVarPorts.ContactPerson = (pContactPerson == null ? "0" : pContactPerson);
            objCVarPorts.IsFactories = (pIsFactories == null ? false : pIsFactories);
            
            objCVarPorts.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarPorts.LockingUserID = 0;

            objCVarPorts.CreatorUserID = objCVarPorts.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPorts.CreationDate = objCVarPorts.ModificationDate = DateTime.Now;

            objCVarPorts.crmCode = "";
            
            CPorts objCPorts = new CPorts();
            objCPorts.lstCVarPorts.Add(objCVarPorts);
            Exception checkException = objCPorts.SaveMethod(objCPorts.lstCVarPorts);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pCountryID, Int32 pFactoryCityID, String pCode, String pName, String pLocalName, bool pIsInactive, bool pIsPort, bool pIsAir, bool pIsOcean, bool pIsInland
           , String pAddress, String pTelephoneNumber, String pEmail, String pContactPerson, Boolean pIsFactories)
        {
            bool _result = false;
            CVarPorts objCVarPorts = new CVarPorts();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CPorts objCGetCreationInformation = new CPorts();
            objCGetCreationInformation.GetItem(pID);
            objCVarPorts.CreatorUserID = objCGetCreationInformation.lstCVarPorts[0].CreatorUserID;
            objCVarPorts.CreationDate = objCGetCreationInformation.lstCVarPorts[0].CreationDate;
            objCVarPorts.IsFactories = objCGetCreationInformation.lstCVarPorts[0].IsFactories;


            objCVarPorts.ID = pID;
            objCVarPorts.Code = (pCode.ToUpper() == null ? "0" : pCode.ToUpper());
            objCVarPorts.Name = (pName.ToUpper() == null ? "0" : pName.ToUpper());
            objCVarPorts.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());

            objCVarPorts.Notes = "";
                
            objCVarPorts.CountryID = pCountryID;
            objCVarPorts.FactoryCityID = pFactoryCityID;
            objCVarPorts.IsInactive = pIsInactive;
            objCVarPorts.IsPort = pIsPort;
            objCVarPorts.IsAir = pIsAir;
            objCVarPorts.IsOcean = pIsOcean;
            objCVarPorts.IsInland = pIsInland;



            objCVarPorts.Address = (pAddress == null ? "0" : pAddress);
            objCVarPorts.TelephoneNumber = (pTelephoneNumber == null ? "0" : pTelephoneNumber);
            objCVarPorts.Email = (pEmail == null ? "0" : pEmail);
            objCVarPorts.ContactPerson = (pContactPerson == null ? "0" : pContactPerson);
            objCVarPorts.IsFactories = (pIsFactories == null ? false : pIsFactories);


            objCVarPorts.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarPorts.LockingUserID = 0;

            objCVarPorts.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPorts.ModificationDate = DateTime.Now;

            objCVarPorts.crmCode = objCGetCreationInformation.lstCVarPorts[0].crmCode;


            CPorts objCPorts = new CPorts();
            objCPorts.lstCVarPorts.Add(objCVarPorts);
            Exception checkException = objCPorts.SaveMethod(objCPorts.lstCVarPorts);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }
        
        //// [Route("/api/Ports/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CPorts objCPorts = new CPorts();
        //    objCPorts.lstDeletedCPKPorts.Add(new CPKPorts() { ID = pID });
        //    objCPorts.DeleteItem(objCPorts.lstDeletedCPKPorts);
        //}

        // [Route("/api/Ports/Delete/{pPortsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pPortsIDs)
        {
            bool _result = false;
            CPorts objCPorts = new CPorts();
            foreach (var currentID in pPortsIDs.Split(','))
            {
                objCPorts.lstDeletedCPKPorts.Add(new CPKPorts() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCPorts.DeleteItem(objCPorts.lstDeletedCPKPorts);
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
        public object[] InsertFromOpertions(Int32 pCountryIDFromOperations, String pCodeFromOperations, String pNameFromOperations, String pLocalNameFromOperations)
        {
            string _MessageReturned = "";
            CVarPorts objCVarPorts = new CVarPorts();
            CPorts objCPorts = new CPorts();

            objCVarPorts.Code = pCodeFromOperations;
            objCVarPorts.Name = pNameFromOperations;
            objCVarPorts.LocalName = pLocalNameFromOperations;

            objCVarPorts.Notes = "";

            objCVarPorts.CountryID = pCountryIDFromOperations;
            objCVarPorts.IsInactive = false;
            objCVarPorts.IsPort = true;
            objCVarPorts.IsAir = true;
            objCVarPorts.IsOcean = true;
            objCVarPorts.IsInland = true;
            
            objCVarPorts.Address = "0";
            objCVarPorts.TelephoneNumber = "0";
            objCVarPorts.Email = "0";
            objCVarPorts.ContactPerson = "0";
            objCVarPorts.IsFactories = false;

            objCVarPorts.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarPorts.LockingUserID = 0;

            objCVarPorts.CreatorUserID = objCVarPorts.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPorts.CreationDate = objCVarPorts.ModificationDate = DateTime.Now;

            objCVarPorts.crmCode = "";

            objCPorts.lstCVarPorts.Add(objCVarPorts);
            Exception checkException = objCPorts.SaveMethod(objCPorts.lstCVarPorts);
            if (checkException == null) //get returned data
            {
                objCPorts.GetList("WHERE IsInactive=0 AND CountryID=" + pCountryIDFromOperations + " ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer(){MaxJsonLength=Int32.MaxValue};
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarPorts.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCPorts.lstCVarPorts) : null //pPorts = pData[2]
            };
        }

        [HttpGet, HttpPost]

        public Object[] LoadAllPortsForSlPort(bool pDummy, string pWhereClauseWithMinimalColumns, string pOrderBy)
        {
            int _RowCount = 0;

            CvwPorts objCPorts = new CvwPorts();
            objCPorts.GetListPaging(9999, 1, pWhereClauseWithMinimalColumns, pOrderBy, out _RowCount);

            var CustomersMinified = objCPorts.lstCVarvwPorts.Select(c => new
            {
                ID = c.ID,
                Name = c.Name,
                CountryID = c.CountryID
            }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(CustomersMinified)
            };
        }
    }
}
