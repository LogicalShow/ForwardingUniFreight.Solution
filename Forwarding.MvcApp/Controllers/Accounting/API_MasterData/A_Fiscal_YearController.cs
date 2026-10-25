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

namespace Forwarding.MvcApp.Controllers.Accounting.API_A_Fiscal_Year
{
    //'^[0-9]{4}$'
    //var email = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$');
    //if (email.test(VAL)) {

    public class A_Fiscal_YearController : ApiController
    {
        //[Route("/api/A_Fiscal_Year/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
           CA_Fiscal_Year  objCA_Fiscal_Year = new CA_Fiscal_Year();
            objCA_Fiscal_Year.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCA_Fiscal_Year.lstCVarA_Fiscal_Year) };
        }

        // [Route("/api/A_Fiscal_Year/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CA_Fiscal_Year objCvwA_Fiscal_Year = new CA_Fiscal_Year();
            //objCvwA_Fiscal_Year.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwA_Fiscal_Year.lstCVarA_Fiscal_Year.Count;
            



            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Fiscal_Year_Name LIKE '%" + pSearchKey + "%' "
                + " OR Fiscal_Year_Name LIKE '%" + pSearchKey + "%' ";

            objCvwA_Fiscal_Year.GetListPaging(pPageSize, pPageNumber, whereClause, " Fiscal_Year_Name desc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwA_Fiscal_Year.lstCVarA_Fiscal_Year), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] Insert(string pFiscal_Year_Name)
        {
            bool _result = false;

            CVarA_Fiscal_Year objCVarA_Fiscal_Year = new CVarA_Fiscal_Year();
            

            CA_Fiscal_Year objCA_Fiscal_Year = new CA_Fiscal_Year();
            CA_Fiscal_Year FiscalYearHistory = new CA_Fiscal_Year();
            CA_Fiscal_Year FiscalYearAll = new CA_Fiscal_Year();
            var where = "where Fiscal_Year_Name Like'%" + pFiscal_Year_Name + "%'";
            FiscalYearHistory.GetList(where);
            FiscalYearAll.GetList("where 1 = 1");

            var Conficting_Years = FiscalYearHistory.lstCVarA_Fiscal_Year.ToList();


            objCVarA_Fiscal_Year.Closed = false;
            objCVarA_Fiscal_Year.Confirmed = true;
            objCVarA_Fiscal_Year.User_ID = WebSecurity.CurrentUserId;
            objCVarA_Fiscal_Year.Fiscal_Year_Name = pFiscal_Year_Name.Trim();
            objCVarA_Fiscal_Year.BalanceSheetClosingJVID = 0;
            objCVarA_Fiscal_Year.BalanceSheetOpeningJVID = 0;
            // objCVarA_Fiscal_Year.ID = 0;
            try
            {
                  objCVarA_Fiscal_Year.ID = FiscalYearAll.lstCVarA_Fiscal_Year.Max(x => x.ID) + 1;
            }
            catch
            {
                  objCVarA_Fiscal_Year.ID = 1;
            }
            objCA_Fiscal_Year.lstCVarA_Fiscal_Year.Add(objCVarA_Fiscal_Year);
            Exception checkException = null;
            if (Conficting_Years == null || Conficting_Years.Count == 0)
            {
                checkException = objCA_Fiscal_Year.SaveMethod(objCA_Fiscal_Year.lstCVarA_Fiscal_Year);
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
                return new Object[] { _result, "This Fiscal Year is found in the system " };
            }


        }


        [HttpGet, HttpPost]
        public bool Delete(String pA_Fiscal_YearIDs)
        {
            bool _result = false;
            CA_Fiscal_Year objCA_Fiscal_Year = new CA_Fiscal_Year();
            foreach (var currentID in pA_Fiscal_YearIDs.Split(','))
            {
                objCA_Fiscal_Year.lstDeletedCPKA_Fiscal_Year.Add(new CPKA_Fiscal_Year() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCA_Fiscal_Year.DeleteItem(objCA_Fiscal_Year.lstDeletedCPKA_Fiscal_Year);
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
