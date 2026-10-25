using Forwarding.MvcApp.Common;
using Forwarding.MvcApp.Controllers.Operations.API_Operations;
using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Administration.API_Logs
{
    public class HousesLogsController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            bool pRecordsExist = false;
            Exception checkException = null;

            COperationLog objCOperationLog = new COperationLog();
            Int32 _RowCount = 0;
            checkException = objCOperationLog.GetListPaging(1500, 1, pWhereClause, "ID DESC", out _RowCount);

            if (objCOperationLog.lstCVarOperationLog.Count > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            // Perform your serialization
            //serializer.Serialize("Your JSON Contents");

            return new object[]
            {
                pRecordsExist
                , serializer.Serialize(objCOperationLog.lstCVarOperationLog)
            };
        }

        [HttpGet, HttpPost]
        public Task<HttpResponseMessage> GetLog(int pID, string pTableName)
        {

            var stream = Logging.GetList<CVarvwOperations, vwOperationsLog>(pID, pTableName);

            HttpResponseMessage httpResponseMessage = CreateResponse.Create(stream);

            return Task.FromResult(httpResponseMessage);
        }


    }

    public class vwOperationsLog : baseLog
    {
        #region "variables"


        public String HouseNumber { get; set; }
        public String ClientName { get; set; }
        public String POLName { get; set; }
        public String PODName { get; set; }
        public String ShipmentTypeCode { get; set; }
        public String MoveTypeName { get; set; }
        public String PickupCityName { get; set; }
        public String DeliveryCityName { get; set; }
        public String ShipperName { get; set; }
        public String ConsigneeName { get; set; }
        public String AgentName { get; set; }
        public String Notify1Name { get; set; }
        public String ACIDNumber { get; set; }
        public String POrC { get; set; }
        public String IncotermName { get; set; }
        
        
        
        //public String POLCountryName { get; set; }
        //public String POLName { get; set; }
        //public String PickupAddress { get; set; }
        //public String PODCountryName { get; set; }
        //public String PODName { get; set; }
        //public String DeliveryAddress { get; set; }
        //public String ATAPOLDate { get; set; }
        //public string ETAPOLDate { get; set; }
        //public string ExpectedDeparture { get; set; }
        //public string ActualDeparture { get; set; }
        //public string ExpectedArrival { get; set; }
        //public string ActualArrival { get; set; }
        //public Int32 FreeTime { get; set; }
        //public Int32 TransientTime { get; set; }
        //public String RoadNumber { get; set; }
        //public String DeliveryOrderNumber { get; set; }
        //public String WareHouse { get; set; }
        //public String WareHouseLocation { get; set; }
        //public String RoutingName { get; set; } // Line/Trucker
        //public String VesselName { get; set; }
        //public String VoyageOrTruckNumber { get; set; }
        //public String BookingNumber { get; set; }
        //public String ModificationDateString { get; set; }
        //public String MasterBL { get; set; }




        //public Int32 RoutingTypeID{get;set;}
        //public Int32 TransportType{get;set;}
        //public Int32 POL{get;set;}
        //public Int32 POD{get;set;}
        //public Int32 Validity{get;set;}
        //public String Notes{get;set;}
        //public String CreatorName{get;set;}
        //public DateTime CreationDate{get;set;}
        //public String ModificationDateString{get;set;}
        //public String RoutingCode{get;set;}

        //public String RoutingLocalName{get;set;}
        //public Int32 ViewOrder{get;set;}
        //public String POLCountryCode{get;set;}
        //public String POLCode{get;set;}
        //public String PODCountryCode{get;set;}
        //public String ShippingLineCode{get;set;}
        //public String ShippingLineName{get;set;}
        //public String AirlineCode{get;set;}
        //public String AirlineName{get;set;}
        //public Int32 TruckerCode{get;set;}
        //public String TruckerName{get;set;}
        //public String TruckerLocalName{get;set;}
        //public String VesselCode{get;set;}


        //public String GensetSupplierName{get;set;}
        //public Int32 CCAID{get;set;}
        //public String CCAName{get;set;}
        //public String CCALocalName{get;set;}
        //public String ContactPerson{get;set;}
        //public String Quantity{get;set;}
        //public String GateInPortName{get;set;}
        //public String GateOutPortName{get;set;}
        //public String GateInDate{get;set;}
        //public String GateOutDate{get;set;}
        //public String StuffingDate{get;set;}
        //public String DeliveryDate{get;set;}

        //public String Delays{get;set;}
        //public String DriverName{get;set;}
        //public String DriverPhones{get;set;}
        //public String PowerFromGateInTillActualSailing{get;set;}
        //public String ContactPersonPhones{get;set;}
        //public String LoadingTime{get;set;}
        //public String CertificateNumber{get;set;}
        //public String CertificateValue{get;set;}
        //public DateTime CertificateDate{get;set;}
        //public String QasimaNumber{get;set;}
        //public DateTime QasimaDate{get;set;}
        //public String SalesDateReceived{get;set;}
        //public String CommerceDateReceived{get;set;}
        //public String InspectionDateReceived{get;set;}
        //public String FinishDateReceived{get;set;}
        //public String SalesDateDelivered{get;set;}
        //public String CommerceDateDelivered{get;set;}
        //public String InspectionDateDelivered{get;set;}
        //public String FinishDateDelivered{get;set;}


        //public String BillNumber{get;set;}
        //public String TruckingOrderCode{get;set;}
        //public String OperationCode{get;set;}
        //public Int32 OperationSerial{get;set;}
        //public String ShipmentTypeCode{get;set;}
        //public String EquipmentNumber{get;set;}
        //public String EquipmentPlateNo{get;set;}
        //public String EquipmentModelName{get;set;}
        //public String EquipmentModelNameFromQuotation{get;set;}
        //public String TrailerPlateNo{get;set;}
        //public String TrailerNumber{get;set;}
        //public Decimal CargoGrossWeight{get;set;}
        //public String LoadingZone{get;set;}
        //public String EquipmentDriverName{get;set;}
        //public String FirstCuringArea{get;set;}
        //public String SecondCuringArea{get;set;}
        //public String ThirdCuringArea{get;set;}
        //public Int32 TruckCounter{get;set;}
        //public Decimal CargoReturnGrossWeight{get;set;}
        //public Decimal CCAFreight{get;set;}
        //public Decimal CCAFOB{get;set;}
        //public Decimal CCACFValue{get;set;}
        //public String CCAInvoiceNumber{get;set;}
        //public String CCAInsurance{get;set;}
        //public String CCADischargeValue{get;set;}
        //public String CCAAcceptedValue{get;set;}
        //public String CCAImportValue{get;set;}
        //public DateTime CCADocumentReceiveDate{get;set;}
        //public String CCAExchangeRate{get;set;}
        //public String CCAVATCertificateNumber{get;set;}
        //public String CCAVATCertificateValue{get;set;}
        //public String CCACommercialProfitCertificateNumber{get;set;}
        //public String CCAOthers{get;set;}
        //public DateTime CCASpendDate{get;set;}
        //public Boolean IsApproved{get;set;}
        //public String ClientName{get;set;}
        //public String SubContractedCustomerName{get;set;}
        //public Decimal Cost{get;set;}
        //public Decimal CostFromPayables{get;set;}
        //public Decimal Sale{get;set;}
        //public Int32 ContainersCount{get;set;}
        //public Int32 VehiclesCount{get;set;}
        //public Int32 LastTruckCounter{get;set;}
        //public DateTime OffloadingDate{get;set;}
        //public Int32 MaxSupplierContainers{get;set;}
        //public String CommodityName{get;set;}
        //public DateTime LoadingDate{get;set;}
        //public String LoadingReference{get;set;}
        //public DateTime UnloadingDate{get;set;}
        //public String UnloadingReference{get;set;}
        //public String UnloadingTime{get;set;}
        //public String strLoadingDate{get;set;}
        //public String QuotationRouteCode{get;set;}
        //public Int64 InvoiceNumber{get;set;}
        //public String InvoiceTypeName{get;set;}
        //public Int32 OperationInvoicesCount{get;set;}
        //public String DivisionName{get;set;}
        //public String CCReleaseNo{get;set;}
        //public String CC_ClearanceTypeName{get;set;}
        //public DateTime CCDropBackDelivered{get;set;}
        //public DateTime CCDropBackReceived{get;set;}
        //public DateTime CCAllowTemporaryDelivered{get;set;}
        //public DateTime CCAllowTemporaryReceived{get;set;}
        //public String ContainerTypes { get;  set; }
        #endregion
    }
}
