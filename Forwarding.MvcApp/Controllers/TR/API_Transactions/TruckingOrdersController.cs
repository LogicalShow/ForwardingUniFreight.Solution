using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using System;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Entities.Operations;

namespace Forwarding.MvcApp.Controllers.TR.API_Transactions
{
    public class TruckingOrdersController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] TruckingOrders_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwDefaults objCvwDefaults = new CvwDefaults();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            CTRCK_Drivers objCTRCK_Driver = new CTRCK_Drivers();
            CTRCK_Drivers objCTRCK_DriverAssistant = new CTRCK_Drivers();
            //CCities objCCities = new CCities();
            CPorts objCPorts = new CPorts();
            CUsers objCUsers = new CUsers();



            //objCvwRoutings.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCvwRoutings.lstCVarvwRoutings.Count;
            //pSearchKey here is the where clause


            objCTRCK_Trailers.GetListPaging(999999, 1, "WHERE IsInactive=0", "Name", out _RowCount);
            objCTRCK_Driver.GetList("WHERE IsDriver=1 ORDER BY Name");
            objCTRCK_DriverAssistant.GetList("WHERE IsDriver=0 ORDER BY Name");
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            //objCCities.GetList("WHERE CountryID=" + objCvwDefaults.lstCVarvwDefaults[0].DefaultCountryID.ToString());
            objCTRCK_Equipments.GetListPaging(999999, 1, "WHERE IsInactive=0", "Name", out _RowCount);
            objCPorts.GetList("WHERE  CountryID=" + objCvwDefaults.lstCVarvwDefaults[0].DefaultCountryID.ToString());
            objCUsers.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            #region Get Minimized Lists
            var pEquipmentList = objCTRCK_Equipments.lstCVarTRCK_Equipments
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    EquipmentModelID = s.EquipmentModelID
                    ,
                    LicenseStatus = (DateTime.Now.Date - s.LicenseNumberExpireDate).Days >= 0 ? "(License Expired)" : ""
                })
                .ToList();
            var pTrailerList = objCTRCK_Trailers.lstCVarTRCK_Trailers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    LicenseStatus = (DateTime.Now.Date - s.LicenseNumberExpireDate).Days >= 0 ? "(License Expired)" : ""
                })
                .ToList();
            var pDriverList = objCTRCK_Driver.lstCVarTRCK_Drivers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    LicenseStatus = (DateTime.Now.Date - s.LicenseNumberExpireDate).Days >= 0 ? "(License Expired)" : ""
                })
                .ToList();
            var pDriverAssistantList = objCTRCK_DriverAssistant.lstCVarTRCK_Drivers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    LicenseStatus = (DateTime.Now.Date - s.LicenseNumberExpireDate).Days >= 0 ? "(License Expired)" : ""
                })
                .ToList();
            #endregion Get Minimized Lists

            objCvwRoutings.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID desc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwRoutings.lstCVarvwRoutings)
                , _RowCount
                , new JavaScriptSerializer().Serialize(pTrailerList) //data[2]
                , new JavaScriptSerializer().Serialize(pDriverList) //pData[3]
                , new JavaScriptSerializer().Serialize(pDriverAssistantList) //pData[4]
                , new JavaScriptSerializer().Serialize(objCPorts.lstCVarPorts) //pData[5]
                , new JavaScriptSerializer().Serialize(pEquipmentList) //pData[6]
                ,new JavaScriptSerializer().Serialize(objCPorts.lstCVarPorts)//pData[7]
                ,new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers)//pData[8]
               };
        }

        [HttpGet, HttpPost]
        public Object[] GetPrintedData(Int64 pRoutingID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;
            var constTruckerPartnerTypeID = 7;
            CvwRoutings objCvwRoutings = new CvwRoutings();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            CvwOperations objCvwOperations = new CvwOperations();
            CvwPayables objCvwPayables = new CvwPayables();
            CCustomers objCCustomers = new CCustomers();
            CAgents objCAgents = new CAgents();
            CTruckingOrderContainers objCTruckingOrderContainers = new CTruckingOrderContainers();
            CContacts objCTruckerContact = new CContacts();

            int _ClientID = 0;

            checkException = objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            checkException = objCvwRoutings.GetListPaging(9999, 1, " WHERE ID = " + pRoutingID.ToString(), "ID", out _RowCount);
            checkException = objCvwOperations.GetListPaging(999999, 1, " WHERE ID = " + objCvwRoutings.lstCVarvwRoutings[0].OperationID.ToString(), "ID", out _RowCount);
            checkException = objCvwPayables.GetListPaging(3000, 1, " WHERE  IsExcludeInTruckingOrderPrint= 0  AND TruckingOrderID = " + pRoutingID.ToString(), "ChargeTypeName", out _RowCount);
            checkException = objCTruckingOrderContainers.GetListPaging(3000, 1, " WHERE TruckingOrderID = " + pRoutingID.ToString(), "ID", out _RowCount);
            _ClientID = objCvwRoutings.lstCVarvwRoutings[0].CustomerID > 0 ? objCvwRoutings.lstCVarvwRoutings[0].CustomerID : objCvwOperations.lstCVarvwOperations[0].ClientID;
            //if (objCvwRoutings.lstCVarvwRoutings[0].CustomerID > 0)
            //    checkException = objCCustomers.GetListPaging(999999, 1, " WHERE ID = " + _ClientID, "ID", out _RowCount);
            //else
                checkException = objCCustomers.GetListPaging(999999, 1, " WHERE Name = N'" + objCvwRoutings.lstCVarvwRoutings[0].ClientName + "'", "ID", out _RowCount);
            if (objCCustomers.lstCVarCustomers.Count > 0) //Customer is Agent
                checkException = objCAgents.GetListPaging(999999, 1, " WHERE ID = " + _ClientID, "ID", out _RowCount);
            if (objCvwRoutings.lstCVarvwRoutings[0].TruckerID > 0)
                checkException = objCTruckerContact.GetListPaging(999999, 1, "WHERE Email IS NOT NULL AND Email<>'' AND PartnerID=" + objCvwRoutings.lstCVarvwRoutings[0].TruckerID + " AND  PartnerTypeID=" + constTruckerPartnerTypeID, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[] {
                 serializer.Serialize(objCvwDefaults.lstCVarvwDefaults[0]) //pData[0];
                , serializer.Serialize(objCvwRoutings.lstCVarvwRoutings[0]) // pData[1];
                , serializer.Serialize(objCvwOperations.lstCVarvwOperations[0])//pData[2];
                , serializer.Serialize(objCvwPayables.lstCVarvwPayables) //pBank = pData[3]
                , objCCustomers.lstCVarCustomers.Count > 0 ? serializer.Serialize(objCCustomers.lstCVarCustomers[0]) : (objCAgents.lstCVarAgents.Count > 0 ? serializer.Serialize(objCAgents.lstCVarAgents[0]) : null) //pCustomer = pData[4]
                , objCTruckerContact.lstCVarContacts.Count > 0 ? serializer.Serialize(objCTruckerContact.lstCVarContacts[0]) : null //pTruckerContact = pData[5]
                , serializer.Serialize(objCTruckingOrderContainers.lstCVarTruckingOrderContainers) //pTruckingOrderContainers = pData[6]
            };
        }

        [HttpGet, HttpPost]
        public Object[] TruckLastCounter(string pProcNameAndTruckID)
        {
            Int32 _RowCount = 0;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            string LastCounter = objCCustomizedDBCall.CallStringFunction(pProcNameAndTruckID);

            //string pMessage = "";

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[] {
               LastCounter
            };
        }
        [HttpGet, HttpPost]
        public Object[] RequestApproval(string pTruckingOrderIDs)
        {
            Int32 _RowCount = 0;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            DataTable dtPending = objCCustomizedDBCall.ExecuteQuery_DataTable("Routing_GetPendingTruckingOrders '," + pTruckingOrderIDs + ",'");

            string[] TobeDistinct = { "Code" };

            DataTable dtOperations =objCCustomizedDBCall.GetDistinctRecords(dtPending, TobeDistinct);

            string BodyText = "";
            for (int i = 0; i < dtOperations.Rows.Count; i++)
            {
                DataRow[] Rows = dtPending.Select(" Code='" + dtOperations.Rows[i]["Code"].ToString() + "'");
                BodyText += "  <br>  " + dtOperations.Rows[i]["Code"].ToString() + " ";
                foreach (DataRow Row in Rows)
                {
                    BodyText += " " + Row["IsOwnedByCompany"] + " " + Row["Count"].ToString();
                }
                BodyText += " - ";
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[] {
               BodyText
            };
        }

        [HttpGet, HttpPost]
        public bool Approve(String pRoutingsIDs, int pIsApprove)
        {
            Exception checkException = null;
            bool _result = false;
            CRoutings objCRoutings = new CRoutings();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            string pUpdateClause = "";
            var InlandTransportType = 3;
            var TruckingOrderRoutingTypeID = 60;
            int _RowCount = 0;
            foreach (var currentID in pRoutingsIDs.Split(','))
            {
                pUpdateClause = "IsApproved=" + pIsApprove + " \n";
                pUpdateClause += ",ModificatorUserID=" + WebSecurity.CurrentUserId + " \n";
                if (pIsApprove == 1)
                    pUpdateClause += ",ModificationDate=GETDATE() " + " \n";
                pUpdateClause += " WHERE ID=" + currentID;
                checkException = objCRoutings.UpdateList(pUpdateClause);
            }

            if (checkException != null) // an exception is caught in the model
            {
                _result = false;
            }
            else
            {
                _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] Reject(String pRejectedIDs)
        {
            Exception checkException = null;
            string _ReturnedMessage = "";
            CRoutings objCRoutings = new CRoutings();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            string pUpdateClause = "";
            string strCreatorIDs = "0";
            var InlandTransportType = 3;
            var TruckingOrderRoutingTypeID = 60;
            int _RowCount = 0;
            
            foreach (var currentID in pRejectedIDs.Split(','))
            {
                pUpdateClause = "IsApproved=0" + " \n";
                pUpdateClause += ",ModificatorUserID=" + WebSecurity.CurrentUserId + " \n";
                pUpdateClause += ",Notes=ISNULL(Notes,'') + N' (Rejected on ' + CONVERT(VARCHAR(20),GETDATE(), 103) + ' by " + WebSecurity.CurrentUserName + "'" + " \n";
                //pUpdateClause += ",ModificationDate=GETDATE() " + " \n";
                pUpdateClause += " WHERE ID=" + currentID;
                checkException = objCRoutings.UpdateList(pUpdateClause);
            }

            if (checkException != null) // an exception is caught in the model
                _ReturnedMessage = checkException.Message;
            checkException = objCRoutings.GetListPaging(99999, 1, "WHERE ID IN (" + pRejectedIDs + ")", "ID", out _RowCount);
            var pCreatorIDsList = objCRoutings.lstCVarRoutings
                .GroupBy(g => new { g.CreatorUserID })
                .Select(s => new
                { //Dont change order coz exporting to excel uses order
                    CreatorUserID = s.First().CreatorUserID
                })
                .Distinct()
                //.OrderBy(o => o.Name)
                .ToList();
            for (int i = 0; i < pCreatorIDsList.Count; i++)
                strCreatorIDs += "," + pCreatorIDsList[i].CreatorUserID;
            return new object[] {
                _ReturnedMessage
                , strCreatorIDs //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] CreateTruckingOrders(int pNumberOfTruckingOrders, bool pIsOwnedByCompany, int pOperationID)
        {
            bool _Result = false;
            Exception checkException = null;
            string strMessageReturned = "";

            int TruckingOrderRoutingTypeID = 60;
            //int PickupRoutingTypeID = 10;
            //int DeliveryRoutingTypeID = 50;
            //int InlandTransportType = 3;
            //CQuotations objCQuotation = new CQuotations();
            //COperations objCOperations = new COperations();
            // CVarOperations objCVarOperations = new CVarOperations();
            int _RowCount = 0;


            string InlandIconName = "fa-truck";
            string InlandIconStyleClassName = "inland-icon-style"; //holds the css class name
            string pCreatedTruckingCodeList = "";
            string pCreatedIDList = "";

            CvwOperations objCvwOperations = new CvwOperations();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CCustomers objCCustomers = new CCustomers();

            objCvwOperations.GetList("Where ID=" + pOperationID.ToString());
            checkException = objCCustomers.GetListPaging(999999, 1, "Where ID=" + objCvwOperations.lstCVarvwOperations[0].ClientID, "ID", out _RowCount);

            if (objCvwOperations.lstCVarvwOperations[0].QuotationRouteID != 0)
                checkException = objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE ID=" + objCvwOperations.lstCVarvwOperations[0].QuotationRouteID.ToString(), "CodeSerial", out _RowCount);

            CRoutings objCRoutings = new CRoutings();

            #region Add TruckingOrders
            //TODO: Add Trucking Orders equal to number sent
            for (int k = 0; k < pNumberOfTruckingOrders; k++)
            {
                CVarRoutings objCVarTruckingOrderRoutings = new CVarRoutings();

                objCVarTruckingOrderRoutings.OperationID = objCvwOperations.lstCVarvwOperations[0].ID;
                objCVarTruckingOrderRoutings.TransportType = objCvwOperations.lstCVarvwOperations[0].TransportType;
                objCVarTruckingOrderRoutings.TransportIconName = InlandIconName;
                objCVarTruckingOrderRoutings.TransportIconStyle = InlandIconStyleClassName;
                objCVarTruckingOrderRoutings.RoutingTypeID = TruckingOrderRoutingTypeID; //TruckingOrder
                objCVarTruckingOrderRoutings.POLCountryID = objCvwOperations.lstCVarvwOperations[0].POLCountryID;
                objCVarTruckingOrderRoutings.POL = objCvwOperations.lstCVarvwOperations[0].POL;
                objCVarTruckingOrderRoutings.PODCountryID = objCvwOperations.lstCVarvwOperations[0].PODCountryID;
                objCVarTruckingOrderRoutings.POD = objCvwOperations.lstCVarvwOperations[0].POD;
                objCVarTruckingOrderRoutings.ETAPOLDate = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ATAPOLDate = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ExpectedDeparture = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ActualDeparture = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ExpectedArrival = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ActualArrival = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.VoyageOrTruckNumber = "0";
                

                if (objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "FCL" || objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "FTL"
                || objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "TANK" ||
                objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "FLEXI")
                {
                    objCVarTruckingOrderRoutings.GateInPortID = objCvwOperations.lstCVarvwOperations[0].POL;
                    objCVarTruckingOrderRoutings.GateOutPortID = objCvwOperations.lstCVarvwOperations[0].POD;
                }
                else
                {
                    objCVarTruckingOrderRoutings.LoadingZoneID = objCvwOperations.lstCVarvwOperations[0].POL;
                    objCVarTruckingOrderRoutings.FirstCuringAreaID = objCvwOperations.lstCVarvwOperations[0].POD;
                }




                if (objCvwQuotationRoute.lstCVarvwQuotationRoute.Count > 0)
                {
                    objCVarTruckingOrderRoutings.TransientTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransientTime;
                    objCVarTruckingOrderRoutings.Validity = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Validity;
                    objCVarTruckingOrderRoutings.FreeTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].FreeTime;
                }

                objCVarTruckingOrderRoutings.Notes = "0";
                objCVarTruckingOrderRoutings.IsOwnedByCompany = pIsOwnedByCompany;
                objCVarTruckingOrderRoutings.IsLoaded = false;
                if (objCvwOperations.lstCVarvwOperations[0].TransportType == 1)
                {//Ocean
                    objCVarTruckingOrderRoutings.ShippingLineID = objCvwOperations.lstCVarvwOperations[0].ShippingLineID;
                    objCVarTruckingOrderRoutings.AirlineID = 0;
                    objCVarTruckingOrderRoutings.TruckerID = 0;
                }
                else if (objCvwOperations.lstCVarvwOperations[0].TransportType == 2)
                {//Air
                    objCVarTruckingOrderRoutings.ShippingLineID = 0;
                    objCVarTruckingOrderRoutings.AirlineID = objCvwOperations.lstCVarvwOperations[0].AirlineID;
                    objCVarTruckingOrderRoutings.TruckerID = 0;
                }
                else
                {//Inland , TransportType = 3
                    objCVarTruckingOrderRoutings.ShippingLineID = 0;
                    objCVarTruckingOrderRoutings.AirlineID = 0;
                    objCVarTruckingOrderRoutings.TruckerID = objCvwOperations.lstCVarvwOperations[0].TruckerID;
                }

                objCVarTruckingOrderRoutings.GensetSupplierID = 0; //pGensetSupplierID;
                objCVarTruckingOrderRoutings.CCAID = 0; //pCCAID;
                objCVarTruckingOrderRoutings.Quantity = "0"; //pQuantity;
                objCVarTruckingOrderRoutings.ContactPerson = "0";
                objCVarTruckingOrderRoutings.PickupAddress = "0";
                objCVarTruckingOrderRoutings.DeliveryAddress = "0";

                objCVarTruckingOrderRoutings.GateInDate = DateTime.Parse("01/01/1900");

                #region TransportOrder
                objCVarTruckingOrderRoutings.CustomerID = 0;
                objCVarTruckingOrderRoutings.SubContractedCustomerID = 0;
                objCVarTruckingOrderRoutings.Cost = 0;
                objCVarTruckingOrderRoutings.Sale = 0;
                objCVarTruckingOrderRoutings.IsFleet = false;
                objCVarTruckingOrderRoutings.CommodityID = 0;
                objCVarTruckingOrderRoutings.LoadingDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.LoadingReference = "0";
                objCVarTruckingOrderRoutings.UnloadingDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.UnloadingReference = "0";
                objCVarTruckingOrderRoutings.UnloadingTime = "0";
                #endregion TransportOrder

                objCVarTruckingOrderRoutings.GateOutDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.StuffingDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.DeliveryDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.BookingNumber = "0";
                objCVarTruckingOrderRoutings.Delays = "0";
                objCVarTruckingOrderRoutings.DriverName = "0";
                objCVarTruckingOrderRoutings.DriverPhones = "0";
                objCVarTruckingOrderRoutings.PowerFromGateInTillActualSailing = "0";
                objCVarTruckingOrderRoutings.ContactPersonPhones = "0";
                objCVarTruckingOrderRoutings.LoadingTime = "0";

                #region CustomsClearance
                objCVarTruckingOrderRoutings.CCAFreight = 0;
                objCVarTruckingOrderRoutings.CCAFOB = 0;
                objCVarTruckingOrderRoutings.CCACFValue = 0;
                objCVarTruckingOrderRoutings.CCAInvoiceNumber = "0";

                objCVarTruckingOrderRoutings.CCAInsurance = "0";
                objCVarTruckingOrderRoutings.CCADischargeValue = "0";
                objCVarTruckingOrderRoutings.CCAAcceptedValue = "0";
                objCVarTruckingOrderRoutings.CCAImportValue = "0";
                objCVarTruckingOrderRoutings.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCAExchangeRate = "0";
                objCVarTruckingOrderRoutings.CCAVATCertificateNumber = "0";
                objCVarTruckingOrderRoutings.CCAVATCertificateValue = "0";
                objCVarTruckingOrderRoutings.CCACommercialProfitCertificateNumber = "0";
                objCVarTruckingOrderRoutings.CCAWindowFees = "0";
                objCVarTruckingOrderRoutings.CCAStorageFees = "0";
                objCVarTruckingOrderRoutings.CCACommercialProfitTax = "0";
                objCVarTruckingOrderRoutings.CCACustomsValue = "0";
                objCVarTruckingOrderRoutings.CCAQuotedValue = "0";
                objCVarTruckingOrderRoutings.CCAContractType = "0";
                objCVarTruckingOrderRoutings.CCAOthers = "0";
                objCVarTruckingOrderRoutings.CCASpendDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.OffloadingDate = DateTime.Parse("01/01/1900");

                objCVarTruckingOrderRoutings.CertificateNumber = "0";
                objCVarTruckingOrderRoutings.CertificateValue = "0";
                objCVarTruckingOrderRoutings.CertificateDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.QasimaNumber = "0";
                objCVarTruckingOrderRoutings.QasimaDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.SalesDateReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CommerceDateReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.InspectionDateReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.FinishDateReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.SalesDateDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.FinishDateDelivered = DateTime.Parse("01/01/1900");


                objCVarTruckingOrderRoutings.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCDropBackReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CC_ClearanceTypeID = 0;
                objCVarTruckingOrderRoutings.CC_CustomItemsID = 0;
                objCVarTruckingOrderRoutings.CCReleaseNo = "0";
                objCVarTruckingOrderRoutings.CCMainWarehouseID = 0;
                objCVarTruckingOrderRoutings.CCWarehouseATD = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCWarehouseETA = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCIsDone = false;



                #endregion CustomsClearance

                objCVarTruckingOrderRoutings.BillNumber = "0";
                objCVarTruckingOrderRoutings.TruckingOrderCode = "0";

                objCVarTruckingOrderRoutings.RoadNumber = "0";
                objCVarTruckingOrderRoutings.DeliveryOrderNumber = "0";
                objCVarTruckingOrderRoutings.WareHouse = "0";
                objCVarTruckingOrderRoutings.WareHouseLocation = "0";
                objCVarTruckingOrderRoutings.TruckingEquipmentID = 0;
                objCVarTruckingOrderRoutings.ConcedeCompanyName = "";
                objCVarTruckingOrderRoutings.ConcedeNumber = "";
                objCVarTruckingOrderRoutings.ConcedeQty = 0;
                objCVarTruckingOrderRoutings.ConcedeTotalQty = 0;
                objCVarTruckingOrderRoutings.WarehouseID = 0;

                objCVarTruckingOrderRoutings.CreatorUserID = objCVarTruckingOrderRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarTruckingOrderRoutings.ModificationDate = objCVarTruckingOrderRoutings.CreationDate = DateTime.Now;
				Common.Common.ReplaceNull(objCVarTruckingOrderRoutings);
				objCRoutings.lstCVarRoutings.Add(objCVarTruckingOrderRoutings);
            }
            #endregion Add TruckingOrders

            checkException = objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);
            
            for (int i = 0; i < objCRoutings.lstCVarRoutings.Count; i++)
                pCreatedIDList +=
                    (pCreatedIDList == ""
                        ? objCRoutings.lstCVarRoutings[i].ID.ToString()
                        : ("," + objCRoutings.lstCVarRoutings[i].ID.ToString())
                    );
            CRoutings objCRoutings_Temp = new CRoutings();
            objCRoutings_Temp.GetListPaging(999999, 1, "WHERE ID IN (" + pCreatedIDList + ")", "ID", out _RowCount);
            for (int i = 0; i < objCRoutings_Temp.lstCVarRoutings.Count; i++)
                pCreatedTruckingCodeList += 
                    (pCreatedTruckingCodeList == "" 
                        ? objCRoutings_Temp.lstCVarRoutings[i].TruckingOrderCode 
                        : ("," + objCRoutings_Temp.lstCVarRoutings[i].TruckingOrderCode)
                    );

            string pWhereClause = "";
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            checkException = objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            #region Add Payables if IsAddChargeAuto
            if (objCDefaults.lstCVarDefaults[0].IsAddChargeAuto && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "GBL")
            {
                pWhereClause = "Where ID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
                #region GBL Filter Criteria
                //if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                //{
                //    if (objCCustomers.lstCVarCustomers[0].IsInternalCustomer)
                //        pWhereClause += "AND Code LIKE N'%INT%' AND Code NOT LIKE N'EX %'" + " \n";
                //    else //External Customer
                //        pWhereClause += "AND Code LIKE N'%EX%' AND Code NOT LIKE N'INT %'" + " \n";
                //    if (objCvwOperations.lstCVarvwOperations[0].CommodityID != 0)
                //    {
                //        CCommodities objCCommodities = new CCommodities();
                //        checkException = objCCommodities.GetListPaging(999999, 1, "Where ID=" + objCvwOperations.lstCVarvwOperations[0].CommodityID, "ID", out _RowCount);
                //        if (objCCommodities.lstCVarCommodities[0].Notes != "0")
                //            pWhereClause += "AND Code LIKE N'%" + objCCommodities.lstCVarCommodities[0].Notes + "%'" + " \n";
                //    }
                //}
                #endregion GBL Filter Criteria

                CChargeTypes objCChargeTypes = new CChargeTypes();
                checkException = objCChargeTypes.GetListPaging(999999, 1, pWhereClause, "Name", out _RowCount);

                //var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

                //objCvwChargeTypes.lstCVarvwChargeTypes
                CPayables objCPayables = new CPayables();
                if (pIsOwnedByCompany)
                {
                    for (int l = 0; l < objCRoutings.lstCVarRoutings.Count; l++)
                    {
                        for (int k = 0; k < objCChargeTypes.lstCVarChargeTypes.Count; k++)
                        {
                            //string pWhereClauseCurrencyDetails = "";
                            CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();

                            //to copy in it the records to be inserted
                            //those 2 lines are to get the charge types from QuotationCharges table from DB
                            //CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
                            //objCvwQuotationCharges.GetList(" WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID);
                            //int _tempRowCount = 0;
                            //checkException = objCvwQuotationCharges.GetListPaging(5000, 1, " WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID, " ID ", out _tempRowCount);

                            CVarPayables objCVarPayables = new CVarPayables();
                            //foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                            //{
                            //pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.CostCurrencyID
                            //    + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                            //    + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                            //    + " ORDER BY CODE";

                            //objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                            //if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                            //{
                            objCVarPayables.ID = 0;

                            objCVarPayables.OperationID = objCRoutings.lstCVarRoutings[l].OperationID;
                            objCVarPayables.ChargeTypeID = objCChargeTypes.lstCVarChargeTypes[k].ID;
                            objCVarPayables.POrC = 0;
                            objCVarPayables.SupplierOperationPartnerID = 0;

                            objCVarPayables.SupplierSiteID = 0;
                            objCVarPayables.ContainerTypeID = 0;
                            objCVarPayables.MeasurementID = 0;
                            objCVarPayables.Quantity = 1;
                            objCVarPayables.CostPrice = 0;
                            objCVarPayables.CostAmount = 0;
                            objCVarPayables.QuotationCost = 0;
                            objCVarPayables.AmountWithoutVAT = 0; //still no VAT entered so they are the same
                            objCVarPayables.SupplierInvoiceNo = "0";
                            objCVarPayables.SupplierReceiptNo = "0";
                            objCVarPayables.EntryDate = DateTime.Now;
                            objCVarPayables.BillID = 0;
                            objCVarPayables.TruckingOrderID = objCRoutings.lstCVarRoutings[l].ID;
                            objCVarPayables.IssueDate = DateTime.Now;
                            objCVarPayables.OperationContainersAndPackagesID = 0;

                            objCVarPayables.ExchangeRate = 1; //rowQuotationCharge.CostExchangeRate;
                            objCVarPayables.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                            objCVarPayables.GeneratingQRID = 0;
                            objCVarPayables.Notes = "";
                            objCVarPayables.IsOfficial = false;
                            objCVarPayables.IsQuotationApproval = false;
                            objCVarPayables.ApprovePendingValue = 0;
                            objCVarPayables.crmCode = "";

                            objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;
                            objCVarPayables.IsPurchased = false;
                            objCPayables.lstCVarPayables.Add(objCVarPayables);

                            //}
                            //}
                        }
                    }
                    checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                } //if (pIsOwnedByCompany)
            } //EOF if (objCDefaults.lstCVarDefaults[0].IsAddChargeAuto)
            #endregion Add Payables if IsAddChargeAuto

            if (checkException != null)
            {
                _Result = false;
                strMessageReturned = "This data can not be saved.";
            }
            else
                _Result = true;



            return new object[]
            {
               _Result
               ,strMessageReturned
               , pCreatedTruckingCodeList //pData[2]
               , new JavaScriptSerializer().Serialize(objCvwOperations.lstCVarvwOperations[0]) //pData[3]
            };
        }
        [HttpGet, HttpPost]
        public object[] CreateTruckingOrdersFromAlarm(int pNumberOfTruckingOrders, int pDefaultTruckerID, string pTruckerIDs, string pTrukingOrderNumbersForTruckers, int pOperationID)
        {
            bool _Result = false;
            Exception checkException = null;
            string strMessageReturned = "";

            int TruckingOrderRoutingTypeID = 60;
            //int PickupRoutingTypeID = 10;
            //int DeliveryRoutingTypeID = 50;
            //int InlandTransportType = 3;
            //CQuotations objCQuotation = new CQuotations();
            //COperations objCOperations = new COperations();
            // CVarOperations objCVarOperations = new CVarOperations();
            int _RowCount = 0;


            string InlandIconName = "fa-truck";
            string InlandIconStyleClassName = "inland-icon-style"; //holds the css class name


            CvwOperations objCvwOperations = new CvwOperations();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CCustomers objCCustomers = new CCustomers();

            objCvwOperations.GetList("Where ID=" + pOperationID.ToString());
            checkException = objCCustomers.GetListPaging(999999, 1, "Where ID=" + objCvwOperations.lstCVarvwOperations[0].ClientID, "ID", out _RowCount);

            if (objCvwOperations.lstCVarvwOperations[0].QuotationRouteID != 0)
                checkException = objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE ID=" + objCvwOperations.lstCVarvwOperations[0].QuotationRouteID.ToString(), "CodeSerial", out _RowCount);

            CRoutings objCRoutings = new CRoutings();

            #region Add TruckingOrdersOwnFleet
            //TODO: Add Trucking Orders equal to number sent
            for (int k = 0; k < pNumberOfTruckingOrders; k++)
            {
                CVarRoutings objCVarTruckingOrderRoutings = new CVarRoutings();

                objCVarTruckingOrderRoutings.OperationID = objCvwOperations.lstCVarvwOperations[0].ID;
                objCVarTruckingOrderRoutings.TransportType = objCvwOperations.lstCVarvwOperations[0].TransportType;
                objCVarTruckingOrderRoutings.TransportIconName = InlandIconName;
                objCVarTruckingOrderRoutings.TransportIconStyle = InlandIconStyleClassName;
                objCVarTruckingOrderRoutings.RoutingTypeID = TruckingOrderRoutingTypeID; //TruckingOrder
                objCVarTruckingOrderRoutings.POLCountryID = objCvwOperations.lstCVarvwOperations[0].POLCountryID;
                objCVarTruckingOrderRoutings.POL = objCvwOperations.lstCVarvwOperations[0].POL;
                objCVarTruckingOrderRoutings.PODCountryID = objCvwOperations.lstCVarvwOperations[0].PODCountryID;
                objCVarTruckingOrderRoutings.POD = objCvwOperations.lstCVarvwOperations[0].POD;
                objCVarTruckingOrderRoutings.ETAPOLDate = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ATAPOLDate = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ExpectedDeparture = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ActualDeparture = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ExpectedArrival = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.ActualArrival = DateTime.Parse("01-01-1900");
                objCVarTruckingOrderRoutings.VoyageOrTruckNumber = "0";

                if (objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "FCL" || objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "FTL"
                    || objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "TANK" ||
                    objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "FLEXI")
                {

                    objCVarTruckingOrderRoutings.GateInPortID = objCvwOperations.lstCVarvwOperations[0].POL;
                    objCVarTruckingOrderRoutings.GateOutPortID = objCvwOperations.lstCVarvwOperations[0].POD;
                }
                else
                {
                    objCVarTruckingOrderRoutings.LoadingZoneID = objCvwOperations.lstCVarvwOperations[0].POL;
                    objCVarTruckingOrderRoutings.FirstCuringAreaID = objCvwOperations.lstCVarvwOperations[0].POD;
                }



                if (objCvwQuotationRoute.lstCVarvwQuotationRoute.Count > 0)
                {
                    objCVarTruckingOrderRoutings.TransientTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransientTime;
                    objCVarTruckingOrderRoutings.Validity = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Validity;
                    objCVarTruckingOrderRoutings.FreeTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].FreeTime;
                }

                objCVarTruckingOrderRoutings.Notes = "0";
                objCVarTruckingOrderRoutings.IsOwnedByCompany = true;
                objCVarTruckingOrderRoutings.IsLoaded = false;
                if (objCvwOperations.lstCVarvwOperations[0].TransportType == 1)
                {//Ocean
                    objCVarTruckingOrderRoutings.ShippingLineID = objCvwOperations.lstCVarvwOperations[0].ShippingLineID;
                    objCVarTruckingOrderRoutings.AirlineID = 0;
                    objCVarTruckingOrderRoutings.TruckerID = 0;
                }
                else if (objCvwOperations.lstCVarvwOperations[0].TransportType == 2)
                {//Air
                    objCVarTruckingOrderRoutings.ShippingLineID = 0;
                    objCVarTruckingOrderRoutings.AirlineID = objCvwOperations.lstCVarvwOperations[0].AirlineID;
                    objCVarTruckingOrderRoutings.TruckerID = 0;
                }
                else
                {//Inland , TransportType = 3
                    objCVarTruckingOrderRoutings.ShippingLineID = 0;
                    objCVarTruckingOrderRoutings.AirlineID = 0;
                    objCVarTruckingOrderRoutings.TruckerID = objCvwOperations.lstCVarvwOperations[0].TruckerID;
                }

                objCVarTruckingOrderRoutings.ShippingLineID = 0;
                objCVarTruckingOrderRoutings.AirlineID = 0;
                objCVarTruckingOrderRoutings.TruckerID = pDefaultTruckerID;
                objCVarTruckingOrderRoutings.GensetSupplierID = 0; //pGensetSupplierID;
                objCVarTruckingOrderRoutings.CCAID = 0; //pCCAID;
                objCVarTruckingOrderRoutings.Quantity = "0"; //pQuantity;
                objCVarTruckingOrderRoutings.ContactPerson = "0";
                objCVarTruckingOrderRoutings.PickupAddress = "0";
                objCVarTruckingOrderRoutings.DeliveryAddress = "0";
                objCVarTruckingOrderRoutings.GateInDate = DateTime.Parse("01/01/1900");

                #region TransportOrder
                objCVarTruckingOrderRoutings.CustomerID = 0;
                objCVarTruckingOrderRoutings.SubContractedCustomerID = 0;
                objCVarTruckingOrderRoutings.Cost = 0;
                objCVarTruckingOrderRoutings.Sale = 0;
                objCVarTruckingOrderRoutings.IsFleet = false;
                objCVarTruckingOrderRoutings.CommodityID = 0;
                objCVarTruckingOrderRoutings.LoadingDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.LoadingReference = "0";
                objCVarTruckingOrderRoutings.UnloadingDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.UnloadingReference = "0";
                objCVarTruckingOrderRoutings.UnloadingTime = "0";
                #endregion TransportOrder

                objCVarTruckingOrderRoutings.GateOutDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.StuffingDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.DeliveryDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.BookingNumber = "0";
                objCVarTruckingOrderRoutings.Delays = "0";
                objCVarTruckingOrderRoutings.DriverName = "0";
                objCVarTruckingOrderRoutings.DriverPhones = "0";
                objCVarTruckingOrderRoutings.PowerFromGateInTillActualSailing = "0";
                objCVarTruckingOrderRoutings.ContactPersonPhones = "0";
                objCVarTruckingOrderRoutings.LoadingTime = "0";

                #region CustomsClearance
                objCVarTruckingOrderRoutings.CCAFreight = 0;
                objCVarTruckingOrderRoutings.CCAFOB = 0;
                objCVarTruckingOrderRoutings.CCACFValue = 0;
                objCVarTruckingOrderRoutings.CCAInvoiceNumber = "0";

                objCVarTruckingOrderRoutings.CCAInsurance = "0";
                objCVarTruckingOrderRoutings.CCADischargeValue = "0";
                objCVarTruckingOrderRoutings.CCAAcceptedValue = "0";
                objCVarTruckingOrderRoutings.CCAImportValue = "0";
                objCVarTruckingOrderRoutings.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCAExchangeRate = "0";
                objCVarTruckingOrderRoutings.CCAVATCertificateNumber = "0";
                objCVarTruckingOrderRoutings.CCAVATCertificateValue = "0";
                objCVarTruckingOrderRoutings.CCACommercialProfitCertificateNumber = "0";
                objCVarTruckingOrderRoutings.CCAWindowFees = "0";
                objCVarTruckingOrderRoutings.CCAStorageFees = "0";
                objCVarTruckingOrderRoutings.CCACommercialProfitTax = "0";
                objCVarTruckingOrderRoutings.CCACustomsValue = "0";
                objCVarTruckingOrderRoutings.CCAQuotedValue = "0";
                objCVarTruckingOrderRoutings.CCAContractType = "0";
                objCVarTruckingOrderRoutings.CCAOthers = "0";
                objCVarTruckingOrderRoutings.CCASpendDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.OffloadingDate = DateTime.Parse("01/01/1900");

                objCVarTruckingOrderRoutings.CertificateNumber = "0";
                objCVarTruckingOrderRoutings.CertificateValue = "0";
                objCVarTruckingOrderRoutings.CertificateDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.QasimaNumber = "0";
                objCVarTruckingOrderRoutings.QasimaDate = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.SalesDateReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CommerceDateReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.InspectionDateReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.FinishDateReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.SalesDateDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.FinishDateDelivered = DateTime.Parse("01/01/1900");

                objCVarTruckingOrderRoutings.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CCDropBackReceived = DateTime.Parse("01/01/1900");
                objCVarTruckingOrderRoutings.CC_ClearanceTypeID = 0;
                objCVarTruckingOrderRoutings.CC_CustomItemsID = 0;
                objCVarTruckingOrderRoutings.CCReleaseNo = "0";


                #endregion CustomsClearance

                objCVarTruckingOrderRoutings.BillNumber = "0";
                objCVarTruckingOrderRoutings.TruckingOrderCode = "0";

                objCVarTruckingOrderRoutings.RoadNumber = "0";
                objCVarTruckingOrderRoutings.DeliveryOrderNumber = "0";
                objCVarTruckingOrderRoutings.WareHouse = "0";
                objCVarTruckingOrderRoutings.WareHouseLocation = "0";

                objCVarTruckingOrderRoutings.CreatorUserID = objCVarTruckingOrderRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarTruckingOrderRoutings.ModificationDate = objCVarTruckingOrderRoutings.CreationDate = DateTime.Now;
				Common.Common.ReplaceNull(objCVarTruckingOrderRoutings);
				objCRoutings.lstCVarRoutings.Add(objCVarTruckingOrderRoutings);
            }
            #endregion Add TruckingOrders
            #region Add TruckingOrdersForTruckers
            //TODO: Add Trucking Orders equal to number sent
            int NumberOfDetails = 0;
            if (pTrukingOrderNumbersForTruckers != null)
                NumberOfDetails = pTrukingOrderNumbersForTruckers.Split(',').Length;
            int TruckingOrderForTruckersNo = 0;
            int TruckerID = 0;
            for (int j = 0; j < NumberOfDetails; j++)
            {
                TruckingOrderForTruckersNo = int.Parse(pTrukingOrderNumbersForTruckers.Split(',')[j]);
                TruckerID = int.Parse(pTruckerIDs.Split(',')[j]);

                for (int k = 0; k < TruckingOrderForTruckersNo; k++)
                {
                    CVarRoutings objCVarTruckingOrderRoutings = new CVarRoutings();

                    objCVarTruckingOrderRoutings.OperationID = objCvwOperations.lstCVarvwOperations[0].ID;
                    objCVarTruckingOrderRoutings.TransportType = objCvwOperations.lstCVarvwOperations[0].TransportType;
                    objCVarTruckingOrderRoutings.TransportIconName = InlandIconName;
                    objCVarTruckingOrderRoutings.TransportIconStyle = InlandIconStyleClassName;
                    objCVarTruckingOrderRoutings.RoutingTypeID = TruckingOrderRoutingTypeID; //TruckingOrder
                    objCVarTruckingOrderRoutings.POLCountryID = objCvwOperations.lstCVarvwOperations[0].POLCountryID;
                    objCVarTruckingOrderRoutings.POL = objCvwOperations.lstCVarvwOperations[0].POL;
                    objCVarTruckingOrderRoutings.PODCountryID = objCvwOperations.lstCVarvwOperations[0].PODCountryID;
                    objCVarTruckingOrderRoutings.POD = objCvwOperations.lstCVarvwOperations[0].POD;
                    objCVarTruckingOrderRoutings.ETAPOLDate = DateTime.Parse("01-01-1900");
                    objCVarTruckingOrderRoutings.ATAPOLDate = DateTime.Parse("01-01-1900");
                    objCVarTruckingOrderRoutings.ExpectedDeparture = DateTime.Parse("01-01-1900");
                    objCVarTruckingOrderRoutings.ActualDeparture = DateTime.Parse("01-01-1900");
                    objCVarTruckingOrderRoutings.ExpectedArrival = DateTime.Parse("01-01-1900");
                    objCVarTruckingOrderRoutings.ActualArrival = DateTime.Parse("01-01-1900");
                    objCVarTruckingOrderRoutings.VoyageOrTruckNumber = "0";

                    if (objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "FCL" || objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "FTL"
                    || objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "TANK" ||
                    objCvwOperations.lstCVarvwOperations[0].ShipmentTypeCode == "FLEXI")
                    {
                        objCVarTruckingOrderRoutings.GateInPortID = objCvwOperations.lstCVarvwOperations[0].POL;
                        objCVarTruckingOrderRoutings.GateOutPortID = objCvwOperations.lstCVarvwOperations[0].POD;
                    }
                    else
                    {
                        objCVarTruckingOrderRoutings.LoadingZoneID = objCvwOperations.lstCVarvwOperations[0].POL;
                        objCVarTruckingOrderRoutings.FirstCuringAreaID = objCvwOperations.lstCVarvwOperations[0].POD;
                    }




                    if (objCvwQuotationRoute.lstCVarvwQuotationRoute.Count > 0)
                    {
                        objCVarTruckingOrderRoutings.TransientTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransientTime;
                        objCVarTruckingOrderRoutings.Validity = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Validity;
                        objCVarTruckingOrderRoutings.FreeTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].FreeTime;
                    }

                    objCVarTruckingOrderRoutings.Notes = "0";
                    objCVarTruckingOrderRoutings.IsOwnedByCompany = false;
                    objCVarTruckingOrderRoutings.IsLoaded = false;
                    if (objCvwOperations.lstCVarvwOperations[0].TransportType == 1)
                    {//Ocean
                        objCVarTruckingOrderRoutings.ShippingLineID = objCvwOperations.lstCVarvwOperations[0].ShippingLineID;
                        objCVarTruckingOrderRoutings.AirlineID = 0;
                        objCVarTruckingOrderRoutings.TruckerID = 0;
                    }
                    else if (objCvwOperations.lstCVarvwOperations[0].TransportType == 2)
                    {//Air
                        objCVarTruckingOrderRoutings.ShippingLineID = 0;
                        objCVarTruckingOrderRoutings.AirlineID = objCvwOperations.lstCVarvwOperations[0].AirlineID;
                        objCVarTruckingOrderRoutings.TruckerID = 0;
                    }
                    else
                    {//Inland , TransportType = 3
                        objCVarTruckingOrderRoutings.ShippingLineID = 0;
                        objCVarTruckingOrderRoutings.AirlineID = 0;
                        objCVarTruckingOrderRoutings.TruckerID = objCvwOperations.lstCVarvwOperations[0].TruckerID;
                    }
                    objCVarTruckingOrderRoutings.ShippingLineID = 0;
                    objCVarTruckingOrderRoutings.AirlineID = 0;
                    objCVarTruckingOrderRoutings.TruckerID = TruckerID;
                    objCVarTruckingOrderRoutings.GensetSupplierID = 0; //pGensetSupplierID;
                    objCVarTruckingOrderRoutings.CCAID = 0; //pCCAID;
                    objCVarTruckingOrderRoutings.Quantity = "0"; //pQuantity;
                    objCVarTruckingOrderRoutings.ContactPerson = "0";
                    objCVarTruckingOrderRoutings.PickupAddress = "0";
                    objCVarTruckingOrderRoutings.DeliveryAddress = "0";
                    objCVarTruckingOrderRoutings.GateInDate = DateTime.Parse("01/01/1900");

                    #region TransportOrder
                    objCVarTruckingOrderRoutings.CustomerID = 0;
                    objCVarTruckingOrderRoutings.SubContractedCustomerID = 0;
                    objCVarTruckingOrderRoutings.Cost = 0;
                    objCVarTruckingOrderRoutings.Sale = 0;
                    objCVarTruckingOrderRoutings.IsFleet = false;
                    objCVarTruckingOrderRoutings.CommodityID = 0;
                    objCVarTruckingOrderRoutings.LoadingDate = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.LoadingReference = "0";
                    objCVarTruckingOrderRoutings.UnloadingDate = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.UnloadingReference = "0";
                    objCVarTruckingOrderRoutings.UnloadingTime = "0";
                    #endregion TransportOrder

                    objCVarTruckingOrderRoutings.GateOutDate = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.StuffingDate = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.DeliveryDate = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.BookingNumber = "0";
                    objCVarTruckingOrderRoutings.Delays = "0";
                    objCVarTruckingOrderRoutings.DriverName = "0";
                    objCVarTruckingOrderRoutings.DriverPhones = "0";
                    objCVarTruckingOrderRoutings.PowerFromGateInTillActualSailing = "0";
                    objCVarTruckingOrderRoutings.ContactPersonPhones = "0";
                    objCVarTruckingOrderRoutings.LoadingTime = "0";

                    #region CustomsClearance
                    objCVarTruckingOrderRoutings.CCAFreight = 0;
                    objCVarTruckingOrderRoutings.CCAFOB = 0;
                    objCVarTruckingOrderRoutings.CCACFValue = 0;
                    objCVarTruckingOrderRoutings.CCAInvoiceNumber = "0";

                    objCVarTruckingOrderRoutings.CCAInsurance = "0";
                    objCVarTruckingOrderRoutings.CCADischargeValue = "0";
                    objCVarTruckingOrderRoutings.CCAAcceptedValue = "0";
                    objCVarTruckingOrderRoutings.CCAImportValue = "0";
                    objCVarTruckingOrderRoutings.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.CCAExchangeRate = "0";
                    objCVarTruckingOrderRoutings.CCAVATCertificateNumber = "0";
                    objCVarTruckingOrderRoutings.CCAVATCertificateValue = "0";
                    objCVarTruckingOrderRoutings.CCACommercialProfitCertificateNumber = "0";
                    objCVarTruckingOrderRoutings.CCAWindowFees = "0";
                    objCVarTruckingOrderRoutings.CCAStorageFees = "0";
                    objCVarTruckingOrderRoutings.CCACommercialProfitTax = "0";
                    objCVarTruckingOrderRoutings.CCACustomsValue = "0";
                    objCVarTruckingOrderRoutings.CCAQuotedValue = "0";
                    objCVarTruckingOrderRoutings.CCAContractType = "0";
                    objCVarTruckingOrderRoutings.CCAOthers = "0";
                    objCVarTruckingOrderRoutings.CCASpendDate = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.OffloadingDate = DateTime.Parse("01/01/1900");

                    objCVarTruckingOrderRoutings.CertificateNumber = "0";
                    objCVarTruckingOrderRoutings.CertificateValue = "0";
                    objCVarTruckingOrderRoutings.CertificateDate = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.QasimaNumber = "0";
                    objCVarTruckingOrderRoutings.QasimaDate = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.SalesDateReceived = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.CommerceDateReceived = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.InspectionDateReceived = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.FinishDateReceived = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.SalesDateDelivered = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.FinishDateDelivered = DateTime.Parse("01/01/1900");


                    objCVarTruckingOrderRoutings.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.CCDropBackReceived = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.CC_ClearanceTypeID = 0;
                    objCVarTruckingOrderRoutings.CC_CustomItemsID = 0;
                    objCVarTruckingOrderRoutings.CCReleaseNo = "0";
                    objCVarTruckingOrderRoutings.CCMainWarehouseID = 0;
                    objCVarTruckingOrderRoutings.CCWarehouseATD = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.CCWarehouseETA = DateTime.Parse("01/01/1900");
                    objCVarTruckingOrderRoutings.CCIsDone = false;

                    #endregion CustomsClearance

                    objCVarTruckingOrderRoutings.BillNumber = "0";
                    objCVarTruckingOrderRoutings.TruckingOrderCode = "0";

                    objCVarTruckingOrderRoutings.RoadNumber = "0";
                    objCVarTruckingOrderRoutings.DeliveryOrderNumber = "0";
                    objCVarTruckingOrderRoutings.WareHouse = "0";
                    objCVarTruckingOrderRoutings.WareHouseLocation = "0";
                    objCVarTruckingOrderRoutings.TruckingEquipmentID =0;
                    objCVarTruckingOrderRoutings.ConcedeCompanyName = "";
                    objCVarTruckingOrderRoutings.ConcedeNumber = "";
                    objCVarTruckingOrderRoutings.ConcedeQty = 0;
                    objCVarTruckingOrderRoutings.ConcedeTotalQty = 0;
                    objCVarTruckingOrderRoutings.WarehouseID = 0;

                    objCVarTruckingOrderRoutings.CreatorUserID = objCVarTruckingOrderRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarTruckingOrderRoutings.ModificationDate = objCVarTruckingOrderRoutings.CreationDate = DateTime.Now;
					Common.Common.ReplaceNull(objCVarTruckingOrderRoutings);
					objCRoutings.lstCVarRoutings.Add(objCVarTruckingOrderRoutings);
                }
            }

            #endregion Add TruckingOrders
            checkException = objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);


            string pWhereClause = "";
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            checkException = objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            #region Add Payables if IsAddChargeAuto
            if (objCDefaults.lstCVarDefaults[0].IsAddChargeAuto && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "GBL")
            {
                pWhereClause += " Where ID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
                #region GBL Filter Criteria
                //if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                //{
                //    if (objCCustomers.lstCVarCustomers[0].IsInternalCustomer)
                //        pWhereClause += "AND Code LIKE N'%INT%' AND Code NOT LIKE N'EX %'" + " \n";
                //    else //External Customer
                //        pWhereClause += "AND Code LIKE N'%EX%' AND Code NOT LIKE N'INT %'" + " \n";
                //    if (objCvwOperations.lstCVarvwOperations[0].CommodityID != 0)
                //    {
                //        CCommodities objCCommodities = new CCommodities();
                //        checkException = objCCommodities.GetListPaging(999999, 1, "Where ID=" + objCvwOperations.lstCVarvwOperations[0].CommodityID, "ID", out _RowCount);
                //        if (objCCommodities.lstCVarCommodities[0].Notes != "0")
                //            pWhereClause += "AND Code LIKE N'%" + objCCommodities.lstCVarCommodities[0].Notes + "%'" + " \n";
                //    }
                //}
                #endregion GBL Filter Criteria
                CChargeTypes objCChargeTypes = new CChargeTypes();
                checkException = objCChargeTypes.GetListPaging(999999, 1, pWhereClause, "Name", out _RowCount);

                //var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

                //objCvwChargeTypes.lstCVarvwChargeTypes
                CPayables objCPayables = new CPayables();

                for (int l = 0; l < objCRoutings.lstCVarRoutings.Count; l++)
                {
                    if (objCRoutings.lstCVarRoutings[l].IsOwnedByCompany)
                    {
                        for (int k = 0; k < objCChargeTypes.lstCVarChargeTypes.Count; k++)
                        {
                            //string pWhereClauseCurrencyDetails = "";
                            CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();

                            //to copy in it the records to be inserted
                            //those 2 lines are to get the charge types from QuotationCharges table from DB
                            //CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
                            //objCvwQuotationCharges.GetList(" WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID);
                            //int _tempRowCount = 0;
                            //checkException = objCvwQuotationCharges.GetListPaging(5000, 1, " WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID, " ID ", out _tempRowCount);

                            CVarPayables objCVarPayables = new CVarPayables();
                            //foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                            //{
                            //pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.CostCurrencyID
                            //    + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                            //    + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                            //    + " ORDER BY CODE";

                            //objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                            //if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                            //{
                            objCVarPayables.ID = 0;

                            objCVarPayables.OperationID = objCRoutings.lstCVarRoutings[l].OperationID;
                            objCVarPayables.ChargeTypeID = objCChargeTypes.lstCVarChargeTypes[k].ID;
                            objCVarPayables.POrC = 0;
                            objCVarPayables.SupplierOperationPartnerID = 0;

                            objCVarPayables.SupplierSiteID = 0;
                            objCVarPayables.ContainerTypeID = 0;
                            objCVarPayables.MeasurementID = 0;
                            objCVarPayables.Quantity = 1;
                            objCVarPayables.CostPrice = 0;
                            objCVarPayables.CostAmount = 0;
                            objCVarPayables.QuotationCost = 0;
                            objCVarPayables.AmountWithoutVAT = 0; //still no VAT entered so they are the same
                            objCVarPayables.SupplierInvoiceNo = "0";
                            objCVarPayables.SupplierReceiptNo = "0";
                            objCVarPayables.EntryDate = DateTime.Now;
                            objCVarPayables.BillID = 0;
                            objCVarPayables.TruckingOrderID = objCRoutings.lstCVarRoutings[l].ID;
                            objCVarPayables.IssueDate = DateTime.Now;
                            objCVarPayables.OperationContainersAndPackagesID = 0;

                            objCVarPayables.ExchangeRate = 1; //rowQuotationCharge.CostExchangeRate;
                            objCVarPayables.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                            objCVarPayables.GeneratingQRID = 0;
                            objCVarPayables.Notes = "";
                            objCVarPayables.IsOfficial = false;
                            objCVarPayables.IsQuotationApproval = false;
                            objCVarPayables.ApprovePendingValue = 0;
                            objCVarPayables.crmCode = "";


                            objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;
                            objCVarPayables.IsPurchased = false;
                            objCPayables.lstCVarPayables.Add(objCVarPayables);

                            //}
                            //}
                        } //EOF for (int k = 0; k < objCChargeTypes.lstCVarChargeTypes.Count; k++)
                    } //EOF if (objCRoutings.lstCVarRoutings[l].IsOwnedByCompany)
                } //EOF for (int l = 0; l < objCRoutings.lstCVarRoutings.Count; l++)
                checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
            } //EOF if (objCDefaults.lstCVarDefaults[0].IsAddChargeAuto)
            #endregion Add Payables if IsAddChargeAuto
            if (checkException != null)
            {
                _Result = false;
                strMessageReturned = "This data can not be saved.";
            }
            else
                _Result = true;



            return new object[]
            {
               _Result
               ,strMessageReturned
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllContainers(string pWhereClause, string pOrderBy)
        {
            CTruckingOrderContainers objCTruckingOrderContainers = new CTruckingOrderContainers();
            //objCRoutings.GetList(pWhereClause);
            int _RowCount = 0;
            objCTruckingOrderContainers.GetListPaging(9999, 1, pWhereClause, pOrderBy, out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTruckingOrderContainers.lstCVarTruckingOrderContainers) };
        }

        [HttpGet, HttpPost]
        public object[] SaveContainers([FromBody] TruckingOrderContainerData truckingOrderContainerData)
        {
            string pMessageReturned = "";
            Exception checkException = null;
            CTruckingOrderContainers objCTruckingOrderContainers = new CTruckingOrderContainers();
             if (truckingOrderContainerData.pContainerNOList != null) //to prevent error in case if no details
            {

                int NumberOfDetails = truckingOrderContainerData.pContainerNOList.Split(',').Length;
                for (int i = 0; i < NumberOfDetails; i++)
                {
                    if (truckingOrderContainerData.pContainerNOList.Split(',')[i].ToString() != "")
                    { //the condition is not to save details with Zero values
                        CVarTruckingOrderContainers objCVarTruckingOrderContainers = new CVarTruckingOrderContainers();
                        objCVarTruckingOrderContainers.TruckingOrderID = truckingOrderContainerData.pRoutingID;
                        objCVarTruckingOrderContainers.ID = int.Parse(truckingOrderContainerData.pIDList.Split(',')[i]);
                        objCVarTruckingOrderContainers.SN = int.Parse(truckingOrderContainerData.pSNList.Split(',')[i]);

                        if (truckingOrderContainerData.pIssueDateList.Length > i && truckingOrderContainerData.pIssueDateList.Split(',')[i] != "0")
                            objCVarTruckingOrderContainers.IssueDate = Convert.ToDateTime(truckingOrderContainerData.pIssueDateList.Split(',')[i]);
                        else
                            objCVarTruckingOrderContainers.IssueDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderContainers.SL = truckingOrderContainerData.pSLList.Length > i ? (truckingOrderContainerData.pSLList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.BookingNo = truckingOrderContainerData.pBookingNoList.Length > i ? (truckingOrderContainerData.pBookingNoList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.PORT = truckingOrderContainerData.pPORTList.Length > i ? (truckingOrderContainerData.pPORTList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.WH = truckingOrderContainerData.pWHList.Length > i ? (truckingOrderContainerData.pWHList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.Size = truckingOrderContainerData.pSizeList.Length > i ? (truckingOrderContainerData.pSizeList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.ContainerNO = truckingOrderContainerData.pContainerNOList.Length > i ? (truckingOrderContainerData.pContainerNOList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.DriverName = truckingOrderContainerData.pDriverNameList.Length > i ? (truckingOrderContainerData.pDriverNameList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.Phone = truckingOrderContainerData.pPhoneList.Length > i ? (truckingOrderContainerData.pPhoneList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.TruckNo = truckingOrderContainerData.pTruckNoList.Length > i ? (truckingOrderContainerData.pTruckNoList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.Location = truckingOrderContainerData.pLocationList.Length > i ? (truckingOrderContainerData.pLocationList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.SealNo = truckingOrderContainerData.pSealNoList.Length > i ? (truckingOrderContainerData.pSealNoList.Split(',')[i]).ToString() : "";

                        if (truckingOrderContainerData.pReleaseDateList.Length > i && truckingOrderContainerData.pReleaseDateList.Split(',')[i] != "0")
                            objCVarTruckingOrderContainers.ReleaseDate = Convert.ToDateTime(truckingOrderContainerData.pReleaseDateList.Split(',')[i]);
                        else
                            objCVarTruckingOrderContainers.ReleaseDate = DateTime.Parse("01/01/1900");

                        if (truckingOrderContainerData.pArrivalDateList.Length > i && truckingOrderContainerData.pArrivalDateList.Split(',')[i] != "0")
                            objCVarTruckingOrderContainers.ArrivalDate = Convert.ToDateTime(truckingOrderContainerData.pArrivalDateList.Split(',')[i]);
                        else
                            objCVarTruckingOrderContainers.ArrivalDate = DateTime.Parse("01/01/1900");

                        if (truckingOrderContainerData.pReturnDateList.Length > i && truckingOrderContainerData.pReturnDateList.Split(',')[i] != "0")
                            objCVarTruckingOrderContainers.ReturnDate = Convert.ToDateTime(truckingOrderContainerData.pReturnDateList.Split(',')[i]);
                        else
                            objCVarTruckingOrderContainers.ReturnDate = DateTime.Parse("01/01/1900");

                        if (truckingOrderContainerData.pFGODateList.Length > i && truckingOrderContainerData.pFGODateList.Split(',')[i] != "0")
                            objCVarTruckingOrderContainers.FGODate = Convert.ToDateTime(truckingOrderContainerData.pFGODateList.Split(',')[i]);
                        else
                            objCVarTruckingOrderContainers.FGODate = DateTime.Parse("01/01/1900");

                        objCVarTruckingOrderContainers.Port2 = truckingOrderContainerData.pSealNoList.Length > i ? (truckingOrderContainerData.pPort2List.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.StatusName = truckingOrderContainerData.pSealNoList.Length > i ? (truckingOrderContainerData.pStatusNameList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.Trucker = truckingOrderContainerData.pSealNoList.Length > i ? (truckingOrderContainerData.pTruckNoList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.TypeName = truckingOrderContainerData.pSealNoList.Length > i ? (truckingOrderContainerData.pTypeNameList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.Notes = truckingOrderContainerData.pSealNoList.Length > i ? (truckingOrderContainerData.pNotesList.Split(',')[i]).ToString() : "";

                        objCVarTruckingOrderContainers.TareWeight = truckingOrderContainerData.pTareWeightList.Length > i ? decimal.Parse(truckingOrderContainerData.pTareWeightList.Split(',')[i]) : 0;
                        objCVarTruckingOrderContainers.NetWeight = truckingOrderContainerData.pNetWeightList.Length > i ? decimal.Parse(truckingOrderContainerData.pNetWeightList.Split(',')[i]) : 0;
                        objCVarTruckingOrderContainers.GrossWeight = truckingOrderContainerData.pGrossWeightList.Length > i ? decimal.Parse(truckingOrderContainerData.pGrossWeightList.Split(',')[i]) : 0;

                        objCVarTruckingOrderContainers.OperationNO = truckingOrderContainerData.pOperationNOList.Length > i ? (truckingOrderContainerData.pOperationNOList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.Factory = truckingOrderContainerData.pFactoryList.Length > i ? (truckingOrderContainerData.pFactoryList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.CustomLOC = truckingOrderContainerData.pCustomLOCList.Length > i ? (truckingOrderContainerData.pCustomLOCList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.TruckWeight = truckingOrderContainerData.pTruckWeightList.Length > i ? (truckingOrderContainerData.pTruckWeightList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.FactoryGateOut = truckingOrderContainerData.pFactoryGateOutList.Length > i ? (truckingOrderContainerData.pFactoryGateOutList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.POD = truckingOrderContainerData.pPODList.Length > i ? (truckingOrderContainerData.pPODList.Split(',')[i]).ToString() : "";
                        objCVarTruckingOrderContainers.Invoice = truckingOrderContainerData.pInvoiceList.Length > i ? (truckingOrderContainerData.pInvoiceList.Split(',')[i]).ToString() : "";

                        objCVarTruckingOrderContainers.ReleaseTime = int.Parse(truckingOrderContainerData.pReleaseTimeList.Split(',')[i]);
                        objCVarTruckingOrderContainers.ArrivalTime = int.Parse(truckingOrderContainerData.pArrivalTimeList.Split(',')[i]);
                        objCVarTruckingOrderContainers.ReturnTime = int.Parse(truckingOrderContainerData.pReturnTimeList.Split(',')[i]);
                        objCVarTruckingOrderContainers.FGOTime = int.Parse(truckingOrderContainerData.pFGOTimeList.Split(',')[i]);

                        objCTruckingOrderContainers.lstCVarTruckingOrderContainers.Add(objCVarTruckingOrderContainers);

                    }
                }
                checkException = objCTruckingOrderContainers.SaveMethod(objCTruckingOrderContainers.lstCVarTruckingOrderContainers);
            }


            if (checkException != null)
            {
                pMessageReturned = checkException.Message;
            }


            return new object[]
            {
                pMessageReturned
            };
        }

        [HttpGet, HttpPost]
        public bool DeleteContainers(String pTruckingOrderContainerIDs)
        {
            bool _result = false;
            CTruckingOrderContainers objCTruckingOrderContainers = new CTruckingOrderContainers();
            foreach (var currentID in pTruckingOrderContainerIDs.Split(','))
            {
                objCTruckingOrderContainers.lstDeletedCPKTruckingOrderContainers.Add(new CPKTruckingOrderContainers() { ID = Int64.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTruckingOrderContainers.DeleteItem(objCTruckingOrderContainers.lstDeletedCPKTruckingOrderContainers);
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
    public class TruckingOrderContainerData
    {
        public Int32 pRoutingID { get; set; }
        public string pIDList { get; set; }
        public string pSNList { get; set; }
        public string pIssueDateList { get; set; }
        public string pSLList { get; set; }
        public string pBookingNoList { get; set; }
        public string pPORTList { get; set; }
        public string pWHList { get; set; }
        public string pSizeList { get; set; }
        public string pContainerNOList { get; set; }
        public string pTareWeightList { get; set; }
        public string pNetWeightList { get; set; }
        public string pGrossWeightList { get; set; }
        public string pDriverNameList { get; set; }
        public string pPhoneList { get; set; }
        public string pTruckNoList { get; set; }
        public string pLocationList { get; set; }
        public string pSealNoList { get; set; }
        public string pReleaseDateList { get; set; }
        public string pArrivalDateList { get; set; }
        public string pReturnDateList { get; set; }
        public string pPort2List { get; set; }
        public string pStatusNameList { get; set; }
        public string pTruckerList { get; set; }
        public string pTypeNameList { get; set; }
        public string pNotesList { get; set; }

        public string pOperationNOList { get; set; }
        public string pFactoryList { get; set; }
        public string pCustomLOCList { get; set; }
        public string pTruckWeightList { get; set; }
        public string pFactoryGateOutList { get; set; }
        public string pPODList { get; set; }
        public string pInvoiceList { get; set; }
        public string pFGODateList { get; set; }
        public string pReleaseTimeList { get; set; }
        public string pArrivalTimeList { get; set; }
        public string pReturnTimeList { get; set; }
        public string pFGOTimeList { get; set; }

    }
}
