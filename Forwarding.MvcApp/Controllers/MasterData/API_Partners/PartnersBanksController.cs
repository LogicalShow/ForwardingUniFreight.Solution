using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class PartnersBanksController : ApiController
    {
        //[Route("/api/vwPartnersBanks/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwPartnersBanks objCvwPartnersBanks = new CvwPartnersBanks();
            objCvwPartnersBanks.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwPartnersBanks.lstCVarvwPartnersBanks) };
        }

        // [Route("/api/PartnersBanks/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwPartnersBanks objCvwPartnersBanks = new CvwPartnersBanks();
            //objCvwPartnersBanks.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwPartnersBanks.lstCVarvwPartnersBanks.Count;

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());
            //string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
            //    + " OR Name LIKE '%" + pSearchKey + "%' "
            //    + " OR LocalName LIKE '%" + pSearchKey + "%' ";

            string whereClause = (pWhereClause == "" ? "" : pWhereClause);
            objCvwPartnersBanks.GetListPaging(pPageSize, pPageNumber, whereClause, " BankName ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwPartnersBanks.lstCVarvwPartnersBanks), _RowCount };
        }

        // [Route("/api/PartnersBanks/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(Int32 pPartnerTypeID, Int32 pPartnerID, string pBankName, string pBranch, string pAccountName
            , string pAccountNumber, Int32 pCurrencyID, string pSwiftCode)
        {
            bool _result = false;
            CVarPartnersBanks objCVarPartnersBanks = new CVarPartnersBanks();

            objCVarPartnersBanks.PartnerTypeID = pPartnerTypeID;
            objCVarPartnersBanks.PartnerID = pPartnerID;
            objCVarPartnersBanks.BankName = pBankName == null ? "0" : pBankName;
            objCVarPartnersBanks.Branch = pBranch == null ? "0" : pBranch;
            objCVarPartnersBanks.AccountName = pAccountName == null ? "0" : pAccountName;
            objCVarPartnersBanks.AccountNumber = pAccountNumber == null ? "0" : pAccountNumber;
            objCVarPartnersBanks.CurrencyID = pCurrencyID;
            objCVarPartnersBanks.SwiftCode = pSwiftCode == null ? "0" : pSwiftCode;
            CPartnersBanks objCPartnersBanks = new CPartnersBanks();
            objCPartnersBanks.lstCVarPartnersBanks.Add(objCVarPartnersBanks);
            Exception checkException = objCPartnersBanks.SaveMethod(objCPartnersBanks.lstCVarPartnersBanks);
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
        public bool Update(int pID, Int32 pPartnerTypeID, Int32 pPartnerID, string pBankName, string pBranch, string pAccountName
            , string pAccountNumber, Int32 pCurrencyID, string pSwiftCode)
        {
            bool _result = false;
            CVarPartnersBanks objCVarPartnersBanks = new CVarPartnersBanks();
            objCVarPartnersBanks.ID = pID;
            objCVarPartnersBanks.PartnerTypeID = pPartnerTypeID;
            objCVarPartnersBanks.PartnerID = pPartnerID;
            objCVarPartnersBanks.BankName = pBankName == null ? "0" : pBankName;
            objCVarPartnersBanks.Branch = pBranch == null ? "0" : pBranch;
            objCVarPartnersBanks.AccountName = pAccountName == null ? "0" : pAccountName;
            objCVarPartnersBanks.AccountNumber = pAccountNumber == null ? "0" : pAccountNumber;
            objCVarPartnersBanks.CurrencyID = pCurrencyID;
            objCVarPartnersBanks.SwiftCode = pSwiftCode == null ? "0" : pSwiftCode;
            CPartnersBanks objCPartnersBanks = new CPartnersBanks();
            objCPartnersBanks.lstCVarPartnersBanks.Add(objCVarPartnersBanks);
            Exception checkException = objCPartnersBanks.SaveMethod(objCPartnersBanks.lstCVarPartnersBanks);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }
        
        // [Route("api/PartnersBanks/Delete/{pPartnersBanksIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pPartnersBanksIDs)
        {
            bool _result = false;
            CPartnersBanks objCPartnersBanks = new CPartnersBanks();
            foreach (var currentID in pPartnersBanksIDs.Split(','))
            {
                objCPartnersBanks.lstDeletedCPKPartnersBanks.Add(new CPKPartnersBanks() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCPartnersBanks.DeleteItem(objCPartnersBanks.lstDeletedCPKPartnersBanks);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        ////[Route("/api/PartnersBanks/CheckRow/{pPartnersBanksID}")]
        //[HttpGet, HttpPost]
        //public Boolean CheckRow(String pID)
        //{
        //    bool _result = false;
        //    // var xx = HttpContext.Current.Session["UserID"].ToString();
        //    CPartnersBanks objCPartnersBanks = new CPartnersBanks();
        //    objCPartnersBanks.GetItem(int.Parse(pID));

        //    if (objCPartnersBanks.lstCVarPartnersBanks[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
        //    {
        //        //record is not locked so lock it then return false
        //        objCPartnersBanks.lstCVarPartnersBanks[0].TimeLocked = DateTime.Now;
        //        objCPartnersBanks.lstCVarPartnersBanks.Add(objCPartnersBanks.lstCVarPartnersBanks[0]);
        //        objCPartnersBanks.SaveMethod(objCPartnersBanks.lstCVarPartnersBanks);
        //        _result = false;
        //    }
        //    else
        //    {
        //        _result = true;//record is locked
        //    }
        //    return _result;
        //}

        ////[Route("/api/PartnersBanks/UnlockRecord/{pID}")]
        //[HttpGet, HttpPost]
        //public Boolean UnlockRecord(string pID)
        //{
        //    bool _result = false;
        //    try
        //    {
        //        CPartnersBanks objCPartnersBanks = new CPartnersBanks();
        //        objCPartnersBanks.GetItem(int.Parse(pID));

        //        objCPartnersBanks.lstCVarPartnersBanks[0].TimeLocked = DateTime.Parse("01-01-1900");
        //        objCPartnersBanks.lstCVarPartnersBanks.Add(objCPartnersBanks.lstCVarPartnersBanks[0]);
        //        objCPartnersBanks.SaveMethod(objCPartnersBanks.lstCVarPartnersBanks);
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
