using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Customized;
using Forwarding.MvcApp.Models.Warehousing.Reports.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
    public class AgingAdjustmentController : ApiController
    {
        #region AgingAdjustment

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CWH_VehicleAgingReport objCWH_VehicleAgingReport = new CWH_VehicleAgingReport();
            if (pIsLoadArrayOfObjects)
            {
            }
            checkException = objCWH_VehicleAgingReport.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCWH_VehicleAgingReport.lstCVarWH_VehicleAgingReport)
                , _RowCount
            };
        }
        
        [HttpGet, HttpPost]
        public object[] Save(Int64 pID//, Int64 pOperationVehicleID, Int64 pReceiveDetailsID, Int64 pPickupDetailsLocationID
            //, bool pIsReturn, bool pIsAddExtraDayForFirstCutOff
            , bool pIsExcluded, bool pIsAddExtraDayForFirstCutOff//, string pChassisNumber, Int64 pOperationID, string pDispatchNumber, Int32 pCustomerID, Int32 pWarehouseID
            , string pReceiveDate, string pPickupRequiredDate, string pPreviousCutOffDate, string pPickupWithoutInvoiceDate)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            CWH_VehicleAgingReport objCWH_VehicleAgingReport = new CWH_VehicleAgingReport();
            //string _FromDate = (DateTime.ParseExact(pFromDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 11:11:11.000");
            //string _ToDate = (DateTime.ParseExact(pFromDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 11:11:11.000");
            int _RowCount = 0;
            string _UpdateClause = "";
            #region Insert
            if (pID == 0) //Insert
            {
                //objCVarWH_Contract.FromDate = DateTime.ParseExact(pFromDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                //objCVarWH_Contract.ToDate = DateTime.ParseExact(pToDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59).AddMilliseconds(998);
                
                //objCVarWH_Contract.CreatorUserID = objCVarWH_Contract.ModificatorUserID = WebSecurity.CurrentUserId;
                //objCVarWH_Contract.CreationDate = objCVarWH_Contract.ModificationDate = DateTime.Now;
                //objCWH_Contract.lstCVarWH_Contract.Add(objCVarWH_Contract);
                //checkException = objCWH_Contract.SaveMethod(objCWH_Contract.lstCVarWH_Contract);
                //if (checkException == null)
                //    pID = objCVarWH_Contract.ID;
                //else
                //    _ReturnedMessage = checkException.Message;
            }
            #endregion Insert
            #region Update
            else //update
            {
                _UpdateClause += "IsExcluded = " + (pIsExcluded ? "1" : "0") + " \n";
                _UpdateClause += ",IsAddExtraDayForFirstCutOff = " + (pIsAddExtraDayForFirstCutOff ? "1" : "0") + " \n";
                //_UpdateClause += ",IsAddExtraDayForFirstCutOff = " + (pIsAddExtraDayForFirstCutOff ? "1" : "0") + " \n";
                //_UpdateClause += pChassisNumber == "0" ? ",ChassisNumber=null" : (",ChassisNumber=N'" + pChassisNumber + "'") + " \n";
                //_UpdateClause += pDispatchNumber == "0" ? ",DispatchNumber=null" : (",DispatchNumber=N'" + pDispatchNumber + "'") + " \n";
                //_UpdateClause += pCustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pCustomerID) + " \n";
                //_UpdateClause = pWarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pWarehouseID) + " \n";
                _UpdateClause += pReceiveDate == "0" ? " ,ReceiveDate = NULL " : (" ,ReceiveDate = '" + (DateTime.ParseExact(pReceiveDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 00:00:00.000") + "'");
                _UpdateClause += pPickupRequiredDate == "0" ? " ,PickupRequiredDate = NULL " : (" ,PickupRequiredDate = '" + (DateTime.ParseExact(pPickupRequiredDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 00:00:00.000") + "'");
                _UpdateClause += pPreviousCutOffDate == "0" ? " ,PreviousCutOffDate = NULL " : (" ,PreviousCutOffDate = '" + (DateTime.ParseExact(pPreviousCutOffDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 00:00:00.000") + "'");
                _UpdateClause += pPickupWithoutInvoiceDate == "0" ? " ,PickupWithoutInvoiceDate = NULL " : (" ,PickupWithoutInvoiceDate = '" + (DateTime.ParseExact(pPickupWithoutInvoiceDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 00:00:00.000") + "'");
                //_UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                //_UpdateClause += " , ModificationDate = GETDATE() ";
                _UpdateClause += " WHERE ID = " + pID.ToString();
                checkException = objCWH_VehicleAgingReport.UpdateList(_UpdateClause);
                if (checkException != null)
                    _ReturnedMessage = checkException.Message;
            }
            #endregion Update

            return new object[] {
                _ReturnedMessage
                , pID //pData[1]
            };
        }
        
        #endregion AgingAdjustment
    }
}
