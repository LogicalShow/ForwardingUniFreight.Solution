using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Customized;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
    public class VehicleReportController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillFilter()
        {
            Exception checkException = new Exception();
            int _RowCount = 0;

            //var constVehicleActionPOReceipt = 5;
            //var constVehicleActionInspection = 10;
            //var constVehicleActionSendToWarehouse = 20;
            //var constVehicleActionChangeLocation = 30;
            //var constVehicleActionChangeWarehouse = 40;
            //var constVehicleActionReceive = 45;
            //var constVehicleActionPickup = 50;
            //var constVehicleActionReturn = 60;

            CNoAccessVehicleAction objCNoAccessVehicleAction = new CNoAccessVehicleAction();
            CCustomers objCCustomers = new CCustomers();

            checkException = objCNoAccessVehicleAction.GetListPaging(999999, 1, "WHERE IsWarehouseAction=1 OR IsOperationAction=1", "ID", out _RowCount);
            checkException = objCCustomers.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);

            var pCustomerList = objCCustomers.lstCVarCustomers
                .Select(s => new
                {
                    ID = s.ID
                    , Name = s.Name
                }).Distinct(); //.OrderBy(o => o.Code).ToList();

            var Serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                Serializer.Serialize(objCNoAccessVehicleAction.lstCVarNoAccessVehicleAction)
                , Serializer.Serialize(pCustomerList)
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, bool pIsVehicleTracking, bool pIsVehicleCharge, bool pIsVehicleAging, bool pIsOracleData, int pVehicleActionID)
        {
            //string _ReturnedMessage = "";
            var constVehicleActionPacking = 2;
            int _Rowcount = 0;
            int _Rowcount_Temp = 0;
            Exception checkException = null;
            string _OperationvehicleIDs = "0";
            CvwPayables objCvwPayables = new CvwPayables();
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CvwWH_VehicleAgingReport objCvwWH_VehicleAgingReport = new CvwWH_VehicleAgingReport();
            CvwOperationVehicle objCvwOperationVehicle = new CvwOperationVehicle();
            //CvwWH_VehicleReport objCvwWH_VehicleAgingReport = new CvwWH_VehicleReport();
            CvwVehicleAction objCvwVehicleAction = new CvwVehicleAction();
            CIST_GBL_ITEMS_TRANSACTIONS objCIST_GBL_ITEMS_TRANSACTIONS = new CIST_GBL_ITEMS_TRANSACTIONS();
            if (pIsOracleData)
            {
                checkException = objCIST_GBL_ITEMS_TRANSACTIONS.GetList(pWhereClause);
                _Rowcount = objCIST_GBL_ITEMS_TRANSACTIONS.lstCVarIST_GBL_ITEMS_TRANSACTIONS.Count;
            }
            else if (pIsVehicleTracking)
            {
                if (pVehicleActionID == constVehicleActionPacking)
                {
                    checkException = objCvwOperationVehicle.GetListPaging(999999, 1, pWhereClause, "ID", out _Rowcount);
                }
                else
                {
                    checkException = objCvwVehicleAction.GetListPaging(999999, 1, pWhereClause, "ID DESC", out _Rowcount);
                    objCvwVehicleAction.lstCVarvwVehicleAction.OrderBy(o => o.ID);
                }
            }
            else if (pIsVehicleCharge || pIsVehicleAging)
                checkException = objCvwWH_VehicleAgingReport.GetListPaging(999999, 1, pWhereClause, "ReceiveDate", out _Rowcount);
            var pOperationVehicleIDList = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport
                .Select(s => new
                {
                    OperationVehicleID = s.OperationVehicleID
                }).Distinct()
                .OrderBy(o => o.OperationVehicleID).ToList();
            #region Get Payables And Receiveables
            if (pIsVehicleTracking)
            {
                for (int i = 0; i < pOperationVehicleIDList.Count; i++)
                _OperationvehicleIDs += "," + pOperationVehicleIDList[i].OperationVehicleID;
                checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE OperationVehicleID IN (" + _OperationvehicleIDs + ")", "ID", out _Rowcount_Temp);
                checkException = objCvwReceivables.GetListPaging(999999, 1, "WHERE Is3PL=1 AND OperationVehicleID IN (" + _OperationvehicleIDs + ")", "ID", out _Rowcount_Temp);
            }
            //TODO: GET minimized payables and receivables
            var pReceivableList = objCvwReceivables.lstCVarvwReceivables
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    ChargeTypeID = s.ChargeTypeID
                    ,
                    ChargeTypeName = s.ChargeTypeName
                    ,
                    OperationID = s.OperationID
                    ,
                    OperationVehicleID = s.OperationVehicleID
                    ,
                    SaleAmount = s.SaleAmount
                    ,
                    CostAmount = 0
                    ,
                    CurrencyID = s.CurrencyID
                    ,
                    CurrencyCode = s.CurrencyCode
                    ,
                    ExchangeRate = s.ExchangeRate
                    ,
                    IsReceivable = true
                }).Distinct()
                .OrderBy(o => o.ChargeTypeName).ToList();
            var pPayableList = objCvwPayables.lstCVarvwPayables
                            .Select(s => new
                            {
                                ID = s.ID
                                ,
                                ChargeTypeID = s.ChargeTypeID
                                ,
                                ChargeTypeName = s.ChargeTypeName
                                ,
                                OperationID = s.OperationID
                                ,
                                OperationVehicleID = s.OperationVehicleID
                                ,
                                CostAmount = s.CostAmount
                                ,
                                SaleAmount = 0
                                ,
                                CurrencyID = s.CurrencyID
                                ,
                                CurrencyCode = s.CurrencyCode
                                ,
                                ExchangeRate = s.ExchangeRate
                                ,
                                IsReceivable = false
                            }).Distinct()
                            .OrderBy(o => o.ChargeTypeName).ToList();
            #endregion Get Payables And Receiveables

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _Rowcount
                , pIsOracleData  
                       ? serializer.Serialize(objCIST_GBL_ITEMS_TRANSACTIONS.lstCVarIST_GBL_ITEMS_TRANSACTIONS)
                           : (
                                pIsVehicleTracking 
                                ? (pVehicleActionID == constVehicleActionPacking && pIsVehicleTracking ? serializer.Serialize(objCvwOperationVehicle.lstCVarvwOperationVehicle) : serializer.Serialize(objCvwVehicleAction.lstCVarvwVehicleAction))
                                : serializer.Serialize(objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport)
                             )
                , pIsVehicleTracking ? null : serializer.Serialize(pReceivableList)
                , pIsVehicleTracking ? null : serializer.Serialize(pPayableList)
            };
        }

    }
}
