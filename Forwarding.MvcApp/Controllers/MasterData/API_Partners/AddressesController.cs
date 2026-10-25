using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class AddressesController : ApiController
    {
        //[Route("/api/vwAddresses/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwAddresses objCvwAddresses = new CvwAddresses();
            objCvwAddresses.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwAddresses.lstCVarvwAddresses) };
        }

        // [Route("/api/Addresses/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwAddresses objCvwAddresses = new CvwAddresses();
            //objCvwAddresses.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwAddresses.lstCVarvwAddresses.Count;

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());
            //string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
            //    + " OR Name LIKE '%" + pSearchKey + "%' "
            //    + " OR LocalName LIKE '%" + pSearchKey + "%' ";

            string whereClause = (pWhereClause == "" ? "" : pWhereClause);
            objCvwAddresses.GetListPaging(pPageSize, pPageNumber, whereClause, " AddressTypeID ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwAddresses.lstCVarvwAddresses), _RowCount };
        }

        // [Route("/api/Addresses/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(Int32 pPartnerTypeID, Int32 pPartnerID, Int32 pAddressTypeID, Int32 pCountryID, Int32 pCityID, string pStreetLine1, string pStreetLine2, string pZipCode, string pPrintedAs, string pAdditionalAddress = "0")
        {
            Exception checkException;
            bool _result = false;
            CVarAddresses objCVarAddresses = new CVarAddresses();

            objCVarAddresses.PartnerTypeID = pPartnerTypeID;
            objCVarAddresses.PartnerID = pPartnerID;
            objCVarAddresses.AddressTypeID = pAddressTypeID;
            objCVarAddresses.CountryID = pCountryID;
            objCVarAddresses.CityID = pCityID;

            objCVarAddresses.StreetLine1 = (pStreetLine1 == null ? "" : pStreetLine1.Trim().ToUpper());
            objCVarAddresses.StreetLine2 = (pStreetLine2 == null ? "" : pStreetLine2.Trim().ToUpper());
            objCVarAddresses.ZipCode = (pZipCode == null ? "" : pZipCode.Trim().ToUpper());
            objCVarAddresses.PrintedAs = (pPrintedAs == null ? "" : pPrintedAs.Trim().ToUpper());
            
            objCVarAddresses.TimeLocked = DateTime.Parse("01-01-1900");

            objCVarAddresses.CreatorUserID = objCVarAddresses.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarAddresses.CreationDate = objCVarAddresses.ModificationDate = DateTime.Now;
            objCVarAddresses.AdditionalAddress = pAdditionalAddress;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                checkException = Fleet_Forwarding_Addresses.InsertUpdate_Fleet_Forwarding_Addresses(objCVarAddresses);
            }
            else
            {
                CAddresses objCAddresses = new CAddresses();
                objCAddresses.lstCVarAddresses.Add(objCVarAddresses);
                checkException = objCAddresses.SaveMethod(objCAddresses.lstCVarAddresses);
            }

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Addresses/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int64 pID, Int32 pPartnerTypeID, Int32 pPartnerID, Int32 pAddressTypeID, Int32 pCountryID, Int32 pCityID, string pStreetLine1, string pStreetLine2, string pZipCode, string pPrintedAs, string pAdditionalAddress = "0")
        {
            Exception checkException;
            bool _result = false;
            CVarAddresses objCVarAddresses = new CVarAddresses();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CAddresses objCGetCreationInformation = new CAddresses();
            objCGetCreationInformation.GetItem(pID);
            objCVarAddresses.CreatorUserID = objCGetCreationInformation.lstCVarAddresses[0].CreatorUserID;
            objCVarAddresses.CreationDate = objCGetCreationInformation.lstCVarAddresses[0].CreationDate;

            objCVarAddresses.ID = pID;

            objCVarAddresses.PartnerTypeID = pPartnerTypeID;
            objCVarAddresses.PartnerID = pPartnerID;
            objCVarAddresses.AddressTypeID = pAddressTypeID;
            objCVarAddresses.CountryID = pCountryID;
            objCVarAddresses.CityID = pCityID;

            objCVarAddresses.StreetLine1 = (pStreetLine1 == null ? "" : pStreetLine1.Trim().ToUpper());
            objCVarAddresses.StreetLine2 = (pStreetLine2 == null ? "" : pStreetLine2.Trim().ToUpper());
            objCVarAddresses.ZipCode = (pZipCode == null ? "" : pZipCode.Trim().ToUpper());
            objCVarAddresses.PrintedAs = (pPrintedAs == null ? "" : pPrintedAs.Trim().ToUpper());

            objCVarAddresses.TimeLocked = DateTime.Parse("01-01-1900");

            objCVarAddresses.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarAddresses.ModificationDate = DateTime.Now;
            objCVarAddresses.AdditionalAddress = pAdditionalAddress;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                checkException = Fleet_Forwarding_Addresses.InsertUpdate_Fleet_Forwarding_Addresses(objCVarAddresses);
            }
            {
                CAddresses objCAddresses = new CAddresses();
                objCAddresses.lstCVarAddresses.Add(objCVarAddresses);
                 checkException = objCAddresses.SaveMethod(objCAddresses.lstCVarAddresses);
            }

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("api/Addresses/Delete/{pAddressesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pAddressesIDs)
        {
            bool _result = false;
            Exception checkException = null ;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pAddressesIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_Addresses.Delete_Fleet_Forwarding_Addresses(Convert.ToInt32(currentID),WebSecurity.CurrentUserId);
                    if(checkException != null)
                    {
                        _result = false;
                        break;
                    }
                }
                   
            }
            else
            {
                CAddresses objCAddresses = new CAddresses();
                foreach (var currentID in pAddressesIDs.Split(','))
                {
                    objCAddresses.lstDeletedCPKAddresses.Add(new CPKAddresses() { ID = Int32.Parse(currentID.Trim()) });
                }

                 checkException = objCAddresses.DeleteItem(objCAddresses.lstDeletedCPKAddresses);
            }

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        ////[Route("/api/Addresses/CheckRow/{pAddressesID}")]
        //[HttpGet, HttpPost]
        //public Boolean CheckRow(String pID)
        //{
        //    bool _result = false;
        //    // var xx = HttpContext.Current.Session["UserID"].ToString();
        //    CAddresses objCAddresses = new CAddresses();
        //    objCAddresses.GetItem(int.Parse(pID));

        //    if (objCAddresses.lstCVarAddresses[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
        //    {
        //        //record is not locked so lock it then return false
        //        objCAddresses.lstCVarAddresses[0].TimeLocked = DateTime.Now;
        //        objCAddresses.lstCVarAddresses.Add(objCAddresses.lstCVarAddresses[0]);
        //        objCAddresses.SaveMethod(objCAddresses.lstCVarAddresses);
        //        _result = false;
        //    }
        //    else
        //    {
        //        _result = true;//record is locked
        //    }
        //    return _result;
        //}

        ////[Route("/api/Addresses/UnlockRecord/{pID}")]
        //[HttpGet, HttpPost]
        //public Boolean UnlockRecord(string pID)
        //{
        //    bool _result = false;
        //    try
        //    {
        //        CAddresses objCAddresses = new CAddresses();
        //        objCAddresses.GetItem(int.Parse(pID));

        //        objCAddresses.lstCVarAddresses[0].TimeLocked = DateTime.Parse("01-01-1900");
        //        objCAddresses.lstCVarAddresses.Add(objCAddresses.lstCVarAddresses[0]);
        //        objCAddresses.SaveMethod(objCAddresses.lstCVarAddresses);
        //        _result = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        _result = false;//record is locked
        //    }
        //    return _result;
        //}

    }
}
