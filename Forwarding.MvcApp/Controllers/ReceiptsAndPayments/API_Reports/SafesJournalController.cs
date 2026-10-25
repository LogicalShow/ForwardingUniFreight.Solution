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
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.API_Reports
{
    public class SafesJournalController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;


            //LinkUserAndSafes
            string pSafesWhereClause = " WHERE 1=1 ";
            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetItem(55);
            if (objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                pSafesWhereClause = " JOIN VW_Sec_UserSafes USF ON ID =  USF._SafeID " + pSafesWhereClause + "  AND USF._UserID=" + WebSecurity.CurrentUserId;


            CTreasury objCSafes = new CTreasury();
            CCurrencies objCCurrency = new CCurrencies();
            objCSafes.GetListPaging(9999, 1, pSafesWhereClause, "Name", out _RowCount);
            objCCurrency.GetListPaging(9999, 1, "WHERE 1=1", "Code", out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCSafes.lstCVarTreasury)
                , new JavaScriptSerializer().Serialize(objCCurrency.lstCVarCurrencies)
            };
        }

        //pPostStatus: 0:All 1:Posted 2:Unposted
        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pSafeIDList, string pFromDate, string pToDate, string pCurrencyIDList
            , int pPostStatus, bool pShowRevaluateEntry , bool pAddFleetData = false)
        {

            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
            int _RowCount = 0;
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            CvwStructure_Rep_A_SafesJournalDetails objCvwStructure_Rep_A_SafesJournalDetails = new CvwStructure_Rep_A_SafesJournalDetails();
            CvwStructure_Rep_A_SafesJournalDetailsForMesco objCCvwStructure_Rep_A_SafesJournalDetailsForMesco = new CvwStructure_Rep_A_SafesJournalDetailsForMesco();


            if (pAddFleetData)
                checkException = objCCvwStructure_Rep_A_SafesJournalDetailsForMesco.GetList(
                   "," + pSafeIDList + ","
                   , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                   , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                   , "," + pCurrencyIDList + ","
                   , -1 //pPosted
                   , pShowRevaluateEntry
                   );
            else
            checkException = objCvwStructure_Rep_A_SafesJournalDetails.GetList(
                    "," + pSafeIDList + ","
                    , DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , "," + pCurrencyIDList + ","
                    , -1 //pPosted
                    , pShowRevaluateEntry
                    );

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
                ,pAddFleetData ?  serializer.Serialize(objCCvwStructure_Rep_A_SafesJournalDetailsForMesco.lstCVarvwStructure_Rep_A_SafesJournalDetailsForMesco)   : serializer.Serialize(objCvwStructure_Rep_A_SafesJournalDetails.lstCVarvwStructure_Rep_A_SafesJournalDetails) //pAccountLedger
            };
        }

    }
}
