using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Transactions
{
    public class DailyExchangeRateController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CDailyExchangeRate objCDailyExchangeRate = new CDailyExchangeRate();
            objCDailyExchangeRate.GetList(pWhereClause);
            foreach (var item in objCDailyExchangeRate.lstCVarDailyExchangeRate)
            {
                item.ToDate = item.ToDate.Date;
                item.FromDate = item.FromDate.Date;
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCDailyExchangeRate.lstCVarDailyExchangeRate) };
        }

        // [Route("/api/DailyExchangeRate/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CDailyExchangeRate objCDailyExchangeRate = new CDailyExchangeRate();
            //objCDailyExchangeRate.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null  ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCDailyExchangeRate.lstCVarDailyExchangeRate.Count;
           
              
            string whereClause = " Where FromCurrencyID LIKE N'%" + pSearchKey + "%' "
                + " OR ToCurrencyID LIKE N'%" + pSearchKey + "%' "
                //+ " OR VoyageNumber LIKE N'%" + pSearchKey + "%' "
                ;
            if (pSearchKey == "")
                whereClause = " Where 1=1";

                foreach (var item in objCDailyExchangeRate.lstCVarDailyExchangeRate)
            {
                item.ToDate = item.ToDate.Date;
                item.FromDate = item.FromDate.Date;
            }

            objCDailyExchangeRate.GetListPaging(pPageSize, pPageNumber, whereClause, "ID DESC", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCDailyExchangeRate.lstCVarDailyExchangeRate), _RowCount };
        }

        // [Route("/api/DailyExchangeRate/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        //pFromDate=25%2F02%2F2018&pToDate=28%2F03%2F2018&pFromCurrencyID=1&pToCurrencyID=82&pExchangeRate=9896&pRemarks=87GG //not found
        public bool Insert(DateTime pFromDate, DateTime pToDate, Int32 pFromCurrencyID, Int32 pToCurrencyID, decimal pExchangeRate, string pRemarks)
        {
            Exception checkException = null;
            bool _result = false;
            int _RowCount = 0;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            TimeSpan to_time = new TimeSpan(23, 59, 59);
            CDailyExchangeRate objCDailyExchangeRateExists = new CDailyExchangeRate();
            objCDailyExchangeRateExists.GetList(" Where FromCurrencyID = " + pFromCurrencyID + " AND ToCurrencyID = " + pToCurrencyID + " AND  '" + pFromDate + "' BETWEEN FromDate and ToDate "); //AND ToDate=" + pToDate.Date + to_time + "");
            if (objCDailyExchangeRateExists.lstCVarDailyExchangeRate.Count == 0 || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "FAI")
            {
                CVarDailyExchangeRate objCVarDailyExchangeRate = new CVarDailyExchangeRate();

                objCVarDailyExchangeRate.FromDate = pFromDate.Date;
                objCVarDailyExchangeRate.ToDate = pToDate.Date + to_time;
                objCVarDailyExchangeRate.FromCurrencyID = pFromCurrencyID;
                objCVarDailyExchangeRate.ToCurrencyID = pToCurrencyID;
                objCVarDailyExchangeRate.ExchangeRate = pExchangeRate;
                objCVarDailyExchangeRate.Remarks = pRemarks == null ? "" : pRemarks;
                objCVarDailyExchangeRate.RegUserID = WebSecurity.CurrentUserId;
                objCVarDailyExchangeRate.RegDate = DateTime.Now;
                objCVarDailyExchangeRate.UpdateDate = DateTime.Now;
                objCVarDailyExchangeRate.UpdateUserID = WebSecurity.CurrentUserId;



                CDailyExchangeRate objCDailyExchangeRate = new CDailyExchangeRate();
                objCDailyExchangeRate.lstCVarDailyExchangeRate.Add(objCVarDailyExchangeRate);
                checkException = objCDailyExchangeRate.SaveMethod(objCDailyExchangeRate.lstCVarDailyExchangeRate);

            }
            else
                return _result;
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/DailyExchangeRate/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, DateTime pFromDate, DateTime pToDate, Int32 pFromCurrencyID, Int32 pToCurrencyID, decimal pExchangeRate, string pRemarks)
        {

            bool _result = false;
            TimeSpan to_time = new TimeSpan(23, 59, 59);
            Int32 _RowCount = 0;
            CDailyExchangeRate objCDailyExchangeRate = new CDailyExchangeRate();
            CVarDailyExchangeRate objCVarDailyExchangeRate = new CVarDailyExchangeRate();
            objCDailyExchangeRate.GetListPaging(1, 1, "WHERE ID=" + pID.ToString(), "ID", out _RowCount);

            objCVarDailyExchangeRate.ID = pID;
            objCVarDailyExchangeRate.FromDate = pFromDate.Date;
            objCVarDailyExchangeRate.ToDate = pToDate.Date + to_time;
            objCVarDailyExchangeRate.FromCurrencyID = pFromCurrencyID;
            objCVarDailyExchangeRate.ToCurrencyID = pToCurrencyID;
            objCVarDailyExchangeRate.ExchangeRate = pExchangeRate;
            objCVarDailyExchangeRate.Remarks = pRemarks == null ? "" : pRemarks;
            objCVarDailyExchangeRate.RegUserID = objCDailyExchangeRate.lstCVarDailyExchangeRate[0].RegUserID;
            objCVarDailyExchangeRate.RegDate = objCDailyExchangeRate.lstCVarDailyExchangeRate[0].RegDate;
            objCVarDailyExchangeRate.UpdateUserID = WebSecurity.CurrentUserId;
            objCVarDailyExchangeRate.UpdateDate = DateTime.Now;

            objCDailyExchangeRate.lstCVarDailyExchangeRate.Add(objCVarDailyExchangeRate);
            Exception checkException = objCDailyExchangeRate.SaveMethod(objCDailyExchangeRate.lstCVarDailyExchangeRate);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/DailyExchangeRate/Delete/{pDailyExchangeRateIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pExchangeRateIDs)
        {
            bool _result = false;
            CDailyExchangeRate objCDailyExchangeRate = new CDailyExchangeRate();
            foreach (var currentID in pExchangeRateIDs.Split(','))
            {
                objCDailyExchangeRate.lstDeletedCPKDailyExchangeRate.Add(new CPKDailyExchangeRate() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCDailyExchangeRate.DeleteItem(objCDailyExchangeRate.lstDeletedCPKDailyExchangeRate);
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