using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class TRCK_TrailerLicensesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CTRCK_TrailerLicenses objCTRCK_TrailerLicenses = new CTRCK_TrailerLicenses();
            objCTRCK_TrailerLicenses.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_TrailerLicenses.lstCVarTRCK_TrailerLicenses) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CTRCK_TrailerLicenses objCTRCK_TrailerLicenses = new CTRCK_TrailerLicenses();
            //objCTRCK_TrailerLicenses.GetList(string.Empty);
            Int32 _RowCount = 0;// objCTRCK_TrailerLicenses.lstCVarTRCK_TrailerLicenses.Count;

            objCTRCK_TrailerLicenses.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_TrailerLicenses.lstCVarTRCK_TrailerLicenses), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pTrailerID, string pLicenseNumber, string pLicenseNumberExpireDate)
        {
            bool _result = false;
            Exception checkException = null;
            CTRCK_TrailerLicenses objCTRCK_TrailerLicenses = new CTRCK_TrailerLicenses();
            CVarTRCK_TrailerLicenses objCVarTRCK_TrailerLicenses = new CVarTRCK_TrailerLicenses();

            objCVarTRCK_TrailerLicenses.TrailerID = int.Parse(pTrailerID);
            objCVarTRCK_TrailerLicenses.LicenseNumber = pLicenseNumber;
            objCVarTRCK_TrailerLicenses.LicenseNumberExpireDate = pLicenseNumberExpireDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pLicenseNumberExpireDate, "d/M/yyyy", CultureInfo.InvariantCulture);

            objCVarTRCK_TrailerLicenses.CreatorUserID = objCVarTRCK_TrailerLicenses.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_TrailerLicenses.CreationDate = objCVarTRCK_TrailerLicenses.ModificationDate = DateTime.Now;

            objCTRCK_TrailerLicenses.lstCVarTRCK_TrailerLicenses.Add(objCVarTRCK_TrailerLicenses);
            checkException = objCTRCK_TrailerLicenses.SaveMethod(objCTRCK_TrailerLicenses.lstCVarTRCK_TrailerLicenses);
            if (checkException == null)
                _result = true;

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pTrailerID, string pLicenseNumber, string pLicenseNumberExpireDate)
        {
            bool _result = false;
            Exception checkException = null;
            CTRCK_TrailerLicenses objCTRCK_TrailerLicenses = new CTRCK_TrailerLicenses();
            CVarTRCK_TrailerLicenses objCVarTRCK_TrailerLicenses = new CVarTRCK_TrailerLicenses();

            //the next 3 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            objCTRCK_TrailerLicenses.GetItem(pID);
            objCVarTRCK_TrailerLicenses.CreatorUserID = objCTRCK_TrailerLicenses.lstCVarTRCK_TrailerLicenses[0].CreatorUserID;
            objCVarTRCK_TrailerLicenses.CreationDate = objCTRCK_TrailerLicenses.lstCVarTRCK_TrailerLicenses[0].CreationDate;

            objCVarTRCK_TrailerLicenses.ID = pID;
            objCVarTRCK_TrailerLicenses.TrailerID = int.Parse(pTrailerID);
            objCVarTRCK_TrailerLicenses.LicenseNumber = pLicenseNumber;
            objCVarTRCK_TrailerLicenses.LicenseNumberExpireDate = pLicenseNumberExpireDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pLicenseNumberExpireDate, "d/M/yyyy", CultureInfo.InvariantCulture);

            objCVarTRCK_TrailerLicenses.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_TrailerLicenses.ModificationDate = DateTime.Now;

            objCTRCK_TrailerLicenses.lstCVarTRCK_TrailerLicenses.Add(objCVarTRCK_TrailerLicenses);
            checkException = objCTRCK_TrailerLicenses.SaveMethod(objCTRCK_TrailerLicenses.lstCVarTRCK_TrailerLicenses);
            if (checkException == null)
                _result = true;

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pTRCK_TrailerLicensesIDs)
        {
            bool _result = false;
            CTRCK_TrailerLicenses objCTRCK_TrailerLicenses = new CTRCK_TrailerLicenses();
            foreach (var currentID in pTRCK_TrailerLicensesIDs.Split(','))
            {
                objCTRCK_TrailerLicenses.lstDeletedCPKTRCK_TrailerLicenses.Add(new CPKTRCK_TrailerLicenses() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTRCK_TrailerLicenses.DeleteItem(objCTRCK_TrailerLicenses.lstDeletedCPKTRCK_TrailerLicenses);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
                _result = true;
            return _result;
        }

    }
}
