using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using System;
using System.Collections.Generic;
using System.Data;
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
    public class CurrenciesController : ApiController
    {

        //[Route("/api/Currencies/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadCurrencyDetails(string pWhereClauseCurrencyDetails)
        {
            CvwCurrencyDetails objvwCurrencyDetails = new CvwCurrencyDetails();
            objvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
            foreach (var item in objvwCurrencyDetails.lstCVarvwCurrencyDetails)
            {
                item.ToDate = item.ToDate.Date;
                item.FromDate = item.FromDate.Date;
            }
            return new Object[] { new JavaScriptSerializer().Serialize(objvwCurrencyDetails.lstCVarvwCurrencyDetails) };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies)
                , _RowCount
            };

            //CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //string SelectedColumns = "ID,Code,Name";

            //var CurrenciesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
            //    "select " + SelectedColumns + " from vwCurrencies " + pWhereClause
            //    , typeof(CVarvwCurrencies)).Cast<CVarvwCurrencies>().ToList();

            //int NumberOfRows = CurrenciesList.Count;

            //return new object[] {
            //    new JavaScriptSerializer().Serialize(CurrenciesList)
            //    , NumberOfRows
            //};

        }

        [HttpGet, HttpPost]
        public object[] GetCurrencyDetails(Int32 pPageNumber, Int32 pPageSize, string pWhereClauseCurrencyDetails, string pOrderBy)
        {
            int _RowCount = 0;
            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            objCCurrencyDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseCurrencyDetails, pOrderBy, out _RowCount);

            //if(objCCurrencyDetails.lstCVarCurrencyDetails != null && objCCurrencyDetails.lstCVarCurrencyDetails.Count != 0)
            //{

            foreach (var item in objCCurrencyDetails.lstCVarCurrencyDetails)
            {

                item.ToDate = item.ToDate.Date;
                item.FromDate = item.FromDate.Date;

            }
            // }




            return new object[] {
                new JavaScriptSerializer().Serialize(objCCurrencyDetails.lstCVarCurrencyDetails)
                , _RowCount
            };
        }

        //// [Route("/api/Currencies/Insert/{pCode}/{pName}/{pLocalName}}")]
        //[HttpGet, HttpPost]
        //public bool Insert(String pCode, String pName, String pLocalName, decimal pCurrentExchangeRate, DateTime pCurrentExchangeRateDate, string pNotes, bool pIsInactive)
        ////public bool Insert(String pCode, String pName)
        //{
        //    bool _result = false;
        //    CVarCurrencies objCVarCurrencies = new CVarCurrencies();

        //    objCVarCurrencies.Code = pCode.ToUpper();
        //    objCVarCurrencies.Name = pName.ToUpper();
        //    objCVarCurrencies.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
        //    objCVarCurrencies.CurrentExchangeRate = (pCurrentExchangeRate == null ? 0 : pCurrentExchangeRate);
        //    objCVarCurrencies.CurrentExchangeRateDate = (pCurrentExchangeRateDate == null ? DateTime.Now : pCurrentExchangeRateDate);
        //    objCVarCurrencies.Notes = (pNotes == null ? "" : pNotes.ToUpper());
        //    objCVarCurrencies.IsInactive = pIsInactive;

        //    objCVarCurrencies.TimeLocked = DateTime.Parse("01-01-1900");
        //    objCVarCurrencies.LockingUserID = 0;

        //    objCVarCurrencies.CreatorUserID = objCVarCurrencies.ModificatorUserID = WebSecurity.CurrentUserId;
        //    objCVarCurrencies.CreationDate = objCVarCurrencies.ModificationDate = DateTime.Now;

        //    CCurrencies objCCurrencies = new CCurrencies();
        //    objCCurrencies.lstCVarCurrencies.Add(objCVarCurrencies);
        //    Exception checkException = objCCurrencies.SaveMethod(objCCurrencies.lstCVarCurrencies);
        //    if (checkException != null) // an exception is caught in the model
        //    {
        //        if (checkException.Message.Contains("UNIQUE"))
        //            _result = false;
        //    }
        //    else //not unique
        //        _result = true;
        //    return _result;
        //}

        // [Route("/api/Currencies/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost] //CurrentExchangeRateDate is used as FromDate
        public object[] Currencies_Save(Int32 pID, String pCode, String pName, String pLocalName, decimal pCurrentExchangeRate, DateTime pCurrentExchangeRateDate, string pNotes, bool pIsInactive)
        {
            bool _result = false;
            CVarCurrencies objCVarCurrencies = new CVarCurrencies();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            if (pID != 0) //Update
            {
                CCurrencies objCGetCreationInformation = new CCurrencies();
                objCGetCreationInformation.GetItem(pID);
                objCVarCurrencies.CreatorUserID = objCGetCreationInformation.lstCVarCurrencies[0].CreatorUserID;
                objCVarCurrencies.CreationDate = objCGetCreationInformation.lstCVarCurrencies[0].CreationDate;
            }
            else //Insert
            {
                objCVarCurrencies.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCurrencies.CreationDate = DateTime.Now;
            }
            objCVarCurrencies.ID = pID;
            objCVarCurrencies.Code = pCode.ToUpper();
            objCVarCurrencies.Name = pName.ToUpper();
            objCVarCurrencies.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            //CurrentExchangeRate, CurrentExchangeRateDate will be taken from view
            objCVarCurrencies.CurrentExchangeRate = 0; // pCurrentExchangeRate;
            objCVarCurrencies.CurrentExchangeRateDate = DateTime.Parse("01-01-1900");//(pCurrentExchangeRateDate == null ? DateTime.Now : pCurrentExchangeRateDate);
            objCVarCurrencies.Notes = (pNotes == null ? "" : pNotes);
            objCVarCurrencies.IsInactive = pIsInactive;

            objCVarCurrencies.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarCurrencies.LockingUserID = 0;

            objCVarCurrencies.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCurrencies.ModificationDate = DateTime.Now;

            CCurrencies objCCurrencies = new CCurrencies();
            objCCurrencies.lstCVarCurrencies.Add(objCVarCurrencies);
            Exception checkException = objCCurrencies.SaveMethod(objCCurrencies.lstCVarCurrencies);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return new object[]
            {
                _result
                , objCVarCurrencies.ID
            };
        }

        // [Route("/api/Currencies/Delete/{pCurrenciesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCurrenciesIDs)
        {
            bool _result = false;
            CCurrencies objCCurrencies = new CCurrencies();
            foreach (var currentID in pCurrenciesIDs.Split(','))
            {
                objCCurrencies.lstDeletedCPKCurrencies.Add(new CPKCurrencies() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCurrencies.DeleteItem(objCCurrencies.lstDeletedCPKCurrencies);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        #region CurrencyDetails
        [HttpGet, HttpPost]
        public object[] CurrencyDetails_Save(Int64 pDetailsID, Int32 pCurrency_ID, DateTime pFromDate, DateTime pToDate, decimal pExchangeRate, decimal pSellingRate)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            CVarCurrencyDetails objCVarCurrencyDetails = new CVarCurrencyDetails();

            objCVarCurrencyDetails.ID = pDetailsID;
            objCVarCurrencyDetails.Currency_ID = pCurrency_ID;
            objCVarCurrencyDetails.FromDate = pFromDate;
            objCVarCurrencyDetails.ToDate = pToDate.AddHours(23).AddMinutes(59).AddSeconds(59);
            objCVarCurrencyDetails.ExchangeRate = pExchangeRate;
            objCVarCurrencyDetails.SellingRate = pSellingRate;
            objCCurrencyDetails.lstCVarCurrencyDetails.Add(objCVarCurrencyDetails);
            checkException = objCCurrencyDetails.SaveMethod(objCCurrencyDetails.lstCVarCurrencyDetails);
            if (checkException == null)
            {
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Currencies", pCurrency_ID, "U");
                pDetailsID = objCVarCurrencyDetails.ID;
                objCCurrencyDetails.GetListPaging(9999, 1, "WHERE Currency_ID=" + pCurrency_ID, "FromDate", out _RowCount);
                foreach (var item in objCCurrencyDetails.lstCVarCurrencyDetails)
                {
                    item.ToDate = item.ToDate.Date;
                    item.FromDate = item.FromDate.Date;
                }
            }
            return new object[]
            {
                _result
                , pDetailsID
                , _result ? new JavaScriptSerializer().Serialize(objCCurrencyDetails.lstCVarCurrencyDetails) : null
            };
        }
        [HttpGet, HttpPost]
        public object[] CurrencyDetails_Delete(string pDeletedDetailsIDs, Int32 pCurrencyID)
        {
            Exception checkException = null;
            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            bool _result = true;

            foreach (var currentID in pDeletedDetailsIDs.Split(','))
            {
                objCCurrencyDetails.lstDeletedCPKCurrencyDetails.Add(new CPKCurrencyDetails() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCCurrencyDetails.DeleteItem(objCCurrencyDetails.lstDeletedCPKCurrencyDetails);
                if (checkException != null)
                    _result = false;
            }
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "Currency", pCurrencyID, "U");
            objCCurrencyDetails.GetList("WHERE Currency_ID=" + pCurrencyID);
            foreach (var item in objCCurrencyDetails.lstCVarCurrencyDetails)
            {
                item.ToDate = item.ToDate.Date;
                item.FromDate = item.FromDate.Date;
            }
            return new object[]
            {
                _result
                , new JavaScriptSerializer().Serialize(objCCurrencyDetails.lstCVarCurrencyDetails)
            };
        }
        #endregion CurrencyDetails
    }
}
