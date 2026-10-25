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
    public class TRCK_EquipmentLicensesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CTRCK_EquipmentLicenses objCTRCK_EquipmentLicenses = new CTRCK_EquipmentLicenses();
            objCTRCK_EquipmentLicenses.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_EquipmentLicenses.lstCVarTRCK_EquipmentLicenses) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CTRCK_EquipmentLicenses objCTRCK_EquipmentLicenses = new CTRCK_EquipmentLicenses();
            //objCTRCK_EquipmentLicenses.GetList(string.Empty);
            Int32 _RowCount = 0;// objCTRCK_EquipmentLicenses.lstCVarTRCK_EquipmentLicenses.Count;

            objCTRCK_EquipmentLicenses.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_EquipmentLicenses.lstCVarTRCK_EquipmentLicenses), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pEquipmentID, string pLicenseNumber, string pLicenseNumberExpireDate)
        {
            bool _result = false;
            Exception checkException = null;
            CTRCK_EquipmentLicenses objCTRCK_EquipmentLicenses = new CTRCK_EquipmentLicenses();
            CVarTRCK_EquipmentLicenses objCVarTRCK_EquipmentLicenses = new CVarTRCK_EquipmentLicenses();

            objCVarTRCK_EquipmentLicenses.EquipmentID = int.Parse(pEquipmentID);
            objCVarTRCK_EquipmentLicenses.LicenseNumber = pLicenseNumber;
            objCVarTRCK_EquipmentLicenses.LicenseNumberExpireDate = pLicenseNumberExpireDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pLicenseNumberExpireDate, "d/M/yyyy", CultureInfo.InvariantCulture);

            objCVarTRCK_EquipmentLicenses.CreatorUserID = objCVarTRCK_EquipmentLicenses.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_EquipmentLicenses.CreationDate = objCVarTRCK_EquipmentLicenses.ModificationDate = DateTime.Now;

            objCTRCK_EquipmentLicenses.lstCVarTRCK_EquipmentLicenses.Add(objCVarTRCK_EquipmentLicenses);
            checkException = objCTRCK_EquipmentLicenses.SaveMethod(objCTRCK_EquipmentLicenses.lstCVarTRCK_EquipmentLicenses);
            if (checkException == null)
                _result = true;

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pEquipmentID, string pLicenseNumber, string pLicenseNumberExpireDate)
        {
            bool _result = false;
            Exception checkException = null;
            CTRCK_EquipmentLicenses objCTRCK_EquipmentLicenses = new CTRCK_EquipmentLicenses();
            CVarTRCK_EquipmentLicenses objCVarTRCK_EquipmentLicenses = new CVarTRCK_EquipmentLicenses();

            //the next 3 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            objCTRCK_EquipmentLicenses.GetItem(pID);
            objCVarTRCK_EquipmentLicenses.CreatorUserID = objCTRCK_EquipmentLicenses.lstCVarTRCK_EquipmentLicenses[0].CreatorUserID;
            objCVarTRCK_EquipmentLicenses.CreationDate = objCTRCK_EquipmentLicenses.lstCVarTRCK_EquipmentLicenses[0].CreationDate;

            objCVarTRCK_EquipmentLicenses.ID = pID;
            objCVarTRCK_EquipmentLicenses.EquipmentID = int.Parse(pEquipmentID);
            objCVarTRCK_EquipmentLicenses.LicenseNumber = pLicenseNumber;
            objCVarTRCK_EquipmentLicenses.LicenseNumberExpireDate = pLicenseNumberExpireDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pLicenseNumberExpireDate, "d/M/yyyy", CultureInfo.InvariantCulture);

            objCVarTRCK_EquipmentLicenses.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_EquipmentLicenses.ModificationDate = DateTime.Now;

            objCTRCK_EquipmentLicenses.lstCVarTRCK_EquipmentLicenses.Add(objCVarTRCK_EquipmentLicenses);
            checkException = objCTRCK_EquipmentLicenses.SaveMethod(objCTRCK_EquipmentLicenses.lstCVarTRCK_EquipmentLicenses);
            if (checkException == null)
                _result = true;

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pTRCK_EquipmentLicensesIDs)
        {
            bool _result = false;
            CTRCK_EquipmentLicenses objCTRCK_EquipmentLicenses = new CTRCK_EquipmentLicenses();
            foreach (var currentID in pTRCK_EquipmentLicensesIDs.Split(','))
            {
                objCTRCK_EquipmentLicenses.lstDeletedCPKTRCK_EquipmentLicenses.Add(new CPKTRCK_EquipmentLicenses() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTRCK_EquipmentLicenses.DeleteItem(objCTRCK_EquipmentLicenses.lstDeletedCPKTRCK_EquipmentLicenses);
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
