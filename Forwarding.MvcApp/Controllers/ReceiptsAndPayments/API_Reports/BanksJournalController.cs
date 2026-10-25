using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Reports.Customized;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.API_Reports
{
    public class BanksJournalController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CBankAccount objCBank = new CBankAccount();
            CCurrencies objCCurrency = new CCurrencies();
            objCBank.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
            objCCurrency.GetListPaging(9999, 1, "WHERE 1=1", "Code", out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCBank.lstCVarBankAccount)
                , new JavaScriptSerializer().Serialize(objCCurrency.lstCVarCurrencies)
            };
        }

        //pPostStatus: 0:All 1:Posted 2:Unposted
        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pBankIDList, string pFromDate, string pToDate, string pCurrencyIDList
            , int pPostStatus, bool pShowRevaluateEntry , string Collected)
        {
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
            int _RowCount = 0;
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            CvwStructure_Rep_A_BankJournalDetails objCvwStructure_Rep_A_BankJournalDetails = new CvwStructure_Rep_A_BankJournalDetails();
            checkException = objCvwStructure_Rep_A_BankJournalDetails.GetList(
                    "," + pBankIDList + ","
                    , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , "," + pCurrencyIDList + ","
                    , int.Parse(Collected)//Collected
                    , -1 //pPosted
                    , pShowRevaluateEntry
                    );

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                , serializer.Serialize(objCvwStructure_Rep_A_BankJournalDetails.lstCVarvwStructure_Rep_A_BankJournalDetails) //pAccountLedger
            };
        }

    }
}
