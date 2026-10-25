using Forwarding.MvcApp.Controllers.NoAccess;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Reports.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Reports
{
    public class CashFlowReportController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillSearchControls()
        {
            int _RowCount = 0;
            CvwA_Account_Levels objCvwA_Account_Levels = new CvwA_Account_Levels();

            objCvwA_Account_Levels.GetListPaging(99999, 1, "WHERE 1=1", "ID", out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwA_Account_Levels.lstCVarvwA_Account_Levels)
            };
        }

        [HttpGet, HttpPost]
        public object[] GetPrintedData(string pFromDate,  string pToDate, bool pInvoiceDueDate = false)
        {
            Exception checkException = null;
            //CDefaults objCDefaults = new CDefaults();
            //objCDefaults.GetList("WHERE 1=1");
            CvwDefaults objCvwRptHeaderDefaultTable = new CvwDefaults();
            int _RowCount = 0;
            objCvwRptHeaderDefaultTable.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            //CRep_A_CashFlowStatment objCRep_A_CashFlowStatment = new CRep_A_CashFlowStatment();

            //checkException = objCRep_A_CashFlowStatment.GetList(
            //      DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture),
            //    DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
            //    );

            CRep_A_CashFlowStatment_New objCRep_A_CashFlowStatment_New = new CRep_A_CashFlowStatment_New();
            if (objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0].UnEditableCompanyName == "DYN" && pInvoiceDueDate)
            {
                checkException = objCRep_A_CashFlowStatment_New.DataFillInvDate(
                  DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture),
                DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture), true,true
                );
            } else
            {
                checkException = objCRep_A_CashFlowStatment_New.GetList(
                  DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture),
                DateTime.ParseExact(pToDate + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                );
            }

            CNoAccessCashFlow objCNoAccessCashFlow = new CNoAccessCashFlow();

            checkException = objCNoAccessCashFlow.GetList("where 1=1");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                //new JavaScriptSerializer().Serialize(objCDefaults.lstCVarDefaults[0]) //pDefaultsHeader = pData[0]
                new JavaScriptSerializer().Serialize(objCvwRptHeaderDefaultTable.lstCVarvwDefaults[0]) //pDefaultsHeader = pData[0]
              //  , serializer.Serialize(objCRep_A_CashFlowStatment.lstCVarRep_A_CashFlowStatment) //pTblRows = pData[1]
                  , serializer.Serialize(objCRep_A_CashFlowStatment_New.lstCVarRep_A_CashFlowStatment_New) //pTblRows = pData[1]
                  , serializer.Serialize(objCNoAccessCashFlow.lstCVarNoAccessCashFlow) //pTblRows = pData[1]
            };
        }

    }
}
