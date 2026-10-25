using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
//using System.Web.Mvc; //sherif: when i use this namespace, then [HttpGet, HttpPost] don't work?!!!!
//because this is an api controller

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class TaxeTypesController : ApiController
    {

        //[Route("/api/TaxeTypes/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            objCTaxeTypes.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTaxeTypes.lstCVarTaxeTypes) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllWithWhereClause(string pWhereClause)
        {
            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            objCTaxeTypes.GetList(pWhereClause);
            return new Object[] { 
                new JavaScriptSerializer().Serialize(objCTaxeTypes.lstCVarTaxeTypes)
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            if (pIsLoadArrayOfObjects)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                CSystemOptions objCSystemOptions = new CSystemOptions();
                objCSystemOptions.GetList(" Where OptionID=201");
                if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                {
                    objCvwA_Accounts.GetListPaging(99999, 1, "WHERE IsMain=0 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )", "Name, Code", out _RowCount);
                }
                else
                {
                    objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                }
            }
            CvwTaxeTypes objCvwBankAccountTaxeTypes = new CvwTaxeTypes();
            objCvwBankAccountTaxeTypes.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwBankAccountTaxeTypes.lstCVarvwTaxeTypes)
                , _RowCount
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //pAccounts = pData[2]
            };
        }

        // [Route("/api/TaxeTypes/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pCode, String pName, String pLocalName, decimal pCurrentPercentage, DateTime pCurrentPercentageDate, string pNotes, bool pIsDiscount, bool pIsInactive
            , Int32 pAccount_ID, Int32 pSubAccount_ID, bool pIsDebitAccount)
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;
            CVarTaxeTypes objCVarTaxeTypes = new CVarTaxeTypes();

            objCVarTaxeTypes.Code = pCode.ToUpper();
            objCVarTaxeTypes.Name = pName.ToUpper();
            objCVarTaxeTypes.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarTaxeTypes.CurrentPercentage = (pCurrentPercentage == null ? 0 : pCurrentPercentage);
            objCVarTaxeTypes.CurrentPercentageDate = (pCurrentPercentageDate == null ? DateTime.Now : pCurrentPercentageDate);
            objCVarTaxeTypes.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarTaxeTypes.IsInactive = pIsInactive;
            objCVarTaxeTypes.IsDiscount = pIsDiscount;

            objCVarTaxeTypes.Account_ID = pAccount_ID;
            objCVarTaxeTypes.SubAccount_ID = pSubAccount_ID;
            objCVarTaxeTypes.IsDebitAccount = pIsDebitAccount;
            
            objCVarTaxeTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTaxeTypes.LockingUserID = 0;

            objCVarTaxeTypes.CreatorUserID = objCVarTaxeTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTaxeTypes.CreationDate = objCVarTaxeTypes.ModificationDate = DateTime.Now;

            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            objCTaxeTypes.lstCVarTaxeTypes.Add(objCVarTaxeTypes);
            Exception checkException = objCTaxeTypes.SaveMethod(objCTaxeTypes.lstCVarTaxeTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/TaxeTypes/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, String pCode, String pName, String pLocalName, decimal pCurrentPercentage, DateTime pCurrentPercentageDate, string pNotes, bool pIsDiscount, bool pIsInactive
            , Int32 pAccount_ID, Int32 pSubAccount_ID, bool pIsDebitAccount)
        {
            bool _result = false;
            CVarTaxeTypes objCVarTaxeTypes = new CVarTaxeTypes();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CTaxeTypes objCGetCreationInformation = new CTaxeTypes();
            objCGetCreationInformation.GetItem(pID);
            objCVarTaxeTypes.CreatorUserID = objCGetCreationInformation.lstCVarTaxeTypes[0].CreatorUserID;
            objCVarTaxeTypes.CreationDate = objCGetCreationInformation.lstCVarTaxeTypes[0].CreationDate;

            objCVarTaxeTypes.ID = pID;
            objCVarTaxeTypes.Code = pCode.ToUpper();
            objCVarTaxeTypes.Name = pName.ToUpper();
            objCVarTaxeTypes.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarTaxeTypes.CurrentPercentage = (pCurrentPercentage == null ? 0 : pCurrentPercentage);
            objCVarTaxeTypes.CurrentPercentageDate = (pCurrentPercentageDate == null ? DateTime.Now : pCurrentPercentageDate);
            objCVarTaxeTypes.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarTaxeTypes.IsInactive = pIsInactive;
            objCVarTaxeTypes.IsDiscount = pIsDiscount;

            objCVarTaxeTypes.Account_ID = pAccount_ID;
            objCVarTaxeTypes.SubAccount_ID = pSubAccount_ID;
            objCVarTaxeTypes.IsDebitAccount = pIsDebitAccount;
            
            objCVarTaxeTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTaxeTypes.LockingUserID = 0;

            objCVarTaxeTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTaxeTypes.ModificationDate = DateTime.Now;

            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            objCTaxeTypes.lstCVarTaxeTypes.Add(objCVarTaxeTypes);
            Exception checkException = objCTaxeTypes.SaveMethod(objCTaxeTypes.lstCVarTaxeTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/TaxeTypes/Delete/{pTaxeTypesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pTaxeTypesIDs)
        {
            bool _result = false;
            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            foreach (var currentID in pTaxeTypesIDs.Split(','))
            {
                objCTaxeTypes.lstDeletedCPKTaxeTypes.Add(new CPKTaxeTypes() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTaxeTypes.DeleteItem(objCTaxeTypes.lstDeletedCPKTaxeTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        //[Route("/api/TaxeTypes/CheckRow/{pID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            objCTaxeTypes.GetItem(int.Parse(pID));

            //if (objCTaxeTypes.lstCVarTaxeTypes[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCTaxeTypes.lstCVarTaxeTypes[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCTaxeTypes.lstCVarTaxeTypes[0].TimeLocked = DateTime.Now;
                objCTaxeTypes.lstCVarTaxeTypes[0].LockingUserID = WebSecurity.CurrentUserId;

                objCTaxeTypes.lstCVarTaxeTypes.Add(objCTaxeTypes.lstCVarTaxeTypes[0]);
                objCTaxeTypes.SaveMethod(objCTaxeTypes.lstCVarTaxeTypes);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/TaxeTypes/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CTaxeTypes objCTaxeTypes = new CTaxeTypes();
                objCTaxeTypes.GetItem(int.Parse(pID));

                objCTaxeTypes.lstCVarTaxeTypes[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCTaxeTypes.lstCVarTaxeTypes[0].LockingUserID = 0;
                objCTaxeTypes.lstCVarTaxeTypes.Add(objCTaxeTypes.lstCVarTaxeTypes[0]);
                objCTaxeTypes.SaveMethod(objCTaxeTypes.lstCVarTaxeTypes);
                _result = true;
            }
            catch (Exception ex)
            {
                _result = false;//record is locked
            }
            return _result;
        }

    }
}
