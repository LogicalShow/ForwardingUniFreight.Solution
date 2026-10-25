using Forwarding.MvcApp.Models.MasterData.CashAndBanks.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_CashAndBanks
{
    public class BanksController : ApiController
    {
        //[Route("/api/Banks/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CBanks objCBanks = new CBanks();
            objCBanks.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCBanks.lstCVarBanks) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllWithWhereClause(string pWhereClause)
        {
            CBanks objCBanks = new CBanks();
            objCBanks.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCBanks.lstCVarBanks) };
        }

        // [Route("/api/Banks/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CBanks objCBanks = new CBanks();
            //objCBanks.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCBanks.lstCVarBanks.Count;
            string whereClause = " Where BankCode LIKE '%" + pSearchKey + "%' "
                + " OR BankNameEn LIKE '%" + pSearchKey + "%' "
                + " OR BankNameAr LIKE '%" + pSearchKey + "%' ";
            objCBanks.GetListPaging(pPageSize, pPageNumber, whereClause, "BankCode", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCBanks.lstCVarBanks), _RowCount };
        }

        // [Route("/api/Banks/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(
            String pCode,
            String pName,
            String pLocalName,
            String pBankAccountNo,
            Int32 pCurrencyID)
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;
            CVarBanks objCVarBanks = new CVarBanks();

            objCVarBanks.CurrencyID = pCurrencyID;
            objCVarBanks.BankCode = pCode.ToUpper();
            objCVarBanks.BankNameEn = (pLocalName == null ? "" : pName.ToUpper());
            objCVarBanks.BankNameAr = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarBanks.BankAccountNo = (pBankAccountNo == null ? "" : pBankAccountNo.ToUpper());


            objCVarBanks.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarBanks.LockingUserID = 0;

            objCVarBanks.CreatorUserID = objCVarBanks.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarBanks.CreationDate = objCVarBanks.ModificationDate = DateTime.Now;

            CBanks objCBanks = new CBanks();
            objCBanks.lstCVarBanks.Add(objCVarBanks);
            Exception checkException = objCBanks.SaveMethod(objCBanks.lstCVarBanks);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Banks/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, String pCode,
            String pName,
            String pLocalName,
            String pBankAccountNo,
            Int32 pCurrencyID)
        {
            bool _result = false;
            CVarBanks objCVarBanks = new CVarBanks();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CBanks objCGetCreationInformation = new CBanks();
            objCGetCreationInformation.GetItem(pID);
            objCVarBanks.CreatorUserID = objCGetCreationInformation.lstCVarBanks[0].CreatorUserID;
            objCVarBanks.CreationDate = objCGetCreationInformation.lstCVarBanks[0].CreationDate;

            objCVarBanks.BankID = pID;
            objCVarBanks.BankCode = pCode.ToUpper();
            objCVarBanks.CurrencyID = pCurrencyID;            
            objCVarBanks.BankNameEn = (pLocalName == null ? "" : pName.ToUpper());
            objCVarBanks.BankNameAr = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarBanks.BankAccountNo = (pBankAccountNo == null ? "" : pBankAccountNo.ToUpper());

            objCVarBanks.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarBanks.LockingUserID = 0;

            objCVarBanks.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarBanks.ModificationDate = DateTime.Now;

            CBanks objCBanks = new CBanks();
            objCBanks.lstCVarBanks.Add(objCVarBanks);
            Exception checkException = objCBanks.SaveMethod(objCBanks.lstCVarBanks);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Banks/Delete/{pBanksIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pBanksIDs)
        {
            bool _result = false;
            CBanks objCBanks = new CBanks();
            foreach (var currentID in pBanksIDs.Split(','))
            {
                objCBanks.lstDeletedCPKBanks.Add(new CPKBanks() { BankID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCBanks.DeleteItem(objCBanks.lstDeletedCPKBanks);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        //[Route("/api/Banks/CheckRow/{pID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CBanks objCBanks = new CBanks();
            objCBanks.GetItem(int.Parse(pID));

            //if (objCBanks.lstCVarBanks[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCBanks.lstCVarBanks[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCBanks.lstCVarBanks[0].TimeLocked = DateTime.Now;
                objCBanks.lstCVarBanks[0].LockingUserID = WebSecurity.CurrentUserId;

                objCBanks.lstCVarBanks.Add(objCBanks.lstCVarBanks[0]);
                objCBanks.SaveMethod(objCBanks.lstCVarBanks);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/Banks/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CBanks objCBanks = new CBanks();
                objCBanks.GetItem(int.Parse(pID));

                objCBanks.lstCVarBanks[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCBanks.lstCVarBanks[0].LockingUserID = 0;
                objCBanks.lstCVarBanks.Add(objCBanks.lstCVarBanks[0]);
                objCBanks.SaveMethod(objCBanks.lstCVarBanks);
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
