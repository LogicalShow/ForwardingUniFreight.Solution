using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_A_Fiscal_Year_Period
{
    //'^[0-9]{4}$'
    //var email = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$');
    //if (email.test(VAL)) {

    public class A_Fiscal_Year_PeriodController : ApiController
    {
        //[Route("/api/A_Fiscal_Year_Period/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            pWhereClause = "where " + pWhereClause;
           CA_Fiscal_Year_Period  objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            objCA_Fiscal_Year_Period.GetList(pWhereClause);
            if(objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period != null && objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count != 0)
            {
                foreach(var item in objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period)
                {
                    item.From_Date = item.From_Date.Date;
                    item.To_Date = item.To_Date.Date;


                }


            }




            return new Object[] { new JavaScriptSerializer().Serialize(objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period) };
        }

        // [Route("/api/A_Fiscal_Year_Period/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CA_Fiscal_Year_Period objCvwA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            //objCvwA_Fiscal_Year_Period.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count;
            



            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Fiscal_Year_Name LIKE '%" + pSearchKey + "%' "
                + " OR Fiscal_Year_Name LIKE '%" + pSearchKey + "%' ";

            objCvwA_Fiscal_Year_Period.GetListPaging(pPageSize, pPageNumber, whereClause, " Fiscal_Year_Name desc ", out _RowCount);


            if (objCvwA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period != null && objCvwA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count != 0)
            {
                foreach (var item in objCvwA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period)
                {
                    item.From_Date = item.From_Date.Date;
                    item.To_Date = item.To_Date.Date;


                }


            }

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] Insert(DateTime pFromDate, DateTime pToDate, string pClosed , int pFiscalYearID)
        {
            bool _result = false;

            CVarA_Fiscal_Year_Period objCVarA_Fiscal_Year_Period = new CVarA_Fiscal_Year_Period();

            if (pToDate < pFromDate)
            {
                _result = false;
                return new Object[] { _result, "[To Date] Must be greater than [From Date]" };

            }
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CA_Fiscal_Year_Period FiscalYearHistory = new CA_Fiscal_Year_Period();
            var where = "";
          //  objCVarA_Fiscal_Year_Period.ID = pID;
            objCVarA_Fiscal_Year_Period.From_Date = pFromDate;
            objCVarA_Fiscal_Year_Period.To_Date = pToDate;
            objCVarA_Fiscal_Year_Period.Closed = bool.Parse(pClosed);
            objCVarA_Fiscal_Year_Period.Fiscal_Year_ID = pFiscalYearID;

            where += "where ( ( ";
            where += " CONVERT(date , From_Date ) <= CONVERT(date , '" + pFromDate + "')";
            where += " AND ";
            where += " CONVERT(date , To_Date ) >= CONVERT(date , '" + pFromDate + "')";
            where += " ) ";

            where += " OR ";

            where += " ( ";
            where += " CONVERT(date , From_Date ) <= CONVERT(date , '" + pToDate + "')";
            where += " AND ";
            where += " CONVERT(date , To_Date ) >= CONVERT(date , '" + pToDate + "')";
            where += " ) )";
  
            FiscalYearHistory.GetList(where);

            var Conficting_Years = FiscalYearHistory.lstCVarA_Fiscal_Year_Period.ToList();

            objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Add(objCVarA_Fiscal_Year_Period);
            Exception checkException = null;
            if (Conficting_Years == null || Conficting_Years.Count == 0)
            {
                checkException = objCA_Fiscal_Year_Period.SaveMethod(objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period);
                if (checkException != null) // an exception is caught in the model
                {
                    // if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
                    //  ErrorMessage = checkException.Message;

                }
                else //not unique
                    _result = true;

                return new Object[] { _result, 1 };
            }
            else
            {
                _result = false;
                return new Object[] { _result, "There is a conflicting Date For The period " };
            }


        }

        [HttpGet, HttpPost]
        public Object[] Update(int pID , DateTime pFromDate , DateTime pToDate , string pClosed, int pFiscalYearID)
        {
            bool _result = false;

            CVarA_Fiscal_Year_Period objCVarA_Fiscal_Year_Period = new CVarA_Fiscal_Year_Period();

            if(pToDate < pFromDate)
            {
                 _result = false;
                return new Object[] { _result, "[To Date] Must be greater than [From Date]" };

            }
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CA_Fiscal_Year_Period FiscalYearHistory = new CA_Fiscal_Year_Period();
            var where = "";
            objCVarA_Fiscal_Year_Period.ID = pID;
            objCVarA_Fiscal_Year_Period.From_Date = pFromDate;
            objCVarA_Fiscal_Year_Period.To_Date = pToDate;
            objCVarA_Fiscal_Year_Period.Closed = bool.Parse( pClosed);
            objCVarA_Fiscal_Year_Period.Fiscal_Year_ID = pFiscalYearID;
            objCVarA_Fiscal_Year_Period.Closed_User_ID = WebSecurity.CurrentUserId;


            where += "where ( ( ";
            where += " CONVERT(date , From_Date ) <= CONVERT(date , '" + pFromDate + "')";
            where += " AND ";
            where += " CONVERT(date , To_Date ) >= CONVERT(date , '" + pFromDate + "')";
            where += " ) ";

            where += " OR ";

            where += " ( ";
            where += " CONVERT(date , From_Date ) <= CONVERT(date , '" + pToDate + "')";
            where += " AND ";
            where += " CONVERT(date , To_Date ) >= CONVERT(date , '" + pToDate + "')";
            where += " ) )";
            where += " AND ";
            where += "ID != " + pID;



            FiscalYearHistory.GetList(where);

            var Conficting_Years = FiscalYearHistory.lstCVarA_Fiscal_Year_Period.ToList();

            objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Add(objCVarA_Fiscal_Year_Period);
            Exception checkException = null;
            if (Conficting_Years == null || Conficting_Years.Count == 0)
            {
                checkException = objCA_Fiscal_Year_Period.SaveMethod(objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period);
                if (checkException != null) // an exception is caught in the model
                {
                    // if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
                    //  ErrorMessage = checkException.Message;

                }
                else //not unique
                    _result = true;

                return new Object[] { _result, 1 };
            }
            else
            {
                _result = false;
                return new Object[] { _result, "There is a conflicting Date For This period " };
            }


        }


        [HttpGet, HttpPost]
        public bool Delete(String pA_Fiscal_Year_PeriodIDs)
        {
            bool _result = false;
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            foreach (var currentID in pA_Fiscal_Year_PeriodIDs.Split(','))
            {
                objCA_Fiscal_Year_Period.lstDeletedCPKA_Fiscal_Year_Period.Add(new CPKA_Fiscal_Year_Period() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCA_Fiscal_Year_Period.DeleteItem(objCA_Fiscal_Year_Period.lstDeletedCPKA_Fiscal_Year_Period);
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
