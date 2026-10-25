using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLinkTank.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLinkTank.Generated;

using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;

using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.CustomizedSPCall;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.YardLinkTank
{
    public class YardLinkTankCreditPostingController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwSL_InvoiceType objCInvoiceType = new CvwSL_InvoiceType();
            CTreasury objCSafes = new CTreasury();
            CvwVessels objCvwVessel = new CvwVessels();

            if (pIsLoadArrayOfObjects)
            {
                objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                objCInvoiceType.GetList("WHERE 1=1 ORDER BY Name");
                objCSafes.GetList("WHERE 1=1 ORDER BY Name");
                objCvwVessel.GetList("WHERE 1=1 ORDER BY Name");
            }
            CvwCreditHeaderYardLinkTank objCvwSL_InvoiceHeader_SelectNotPosted = new CvwCreditHeaderYardLinkTank();
            objCvwSL_InvoiceHeader_SelectNotPosted.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwCreditHeaderYardLinkTank)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
                , new JavaScriptSerializer().Serialize(objCInvoiceType.lstCVarvwSL_InvoiceType) //pInvoiceType = pData[3]
                , new JavaScriptSerializer().Serialize(objCSafes.lstCVarTreasury) //pSafe = pData[4]
                , new JavaScriptSerializer().Serialize(objCvwVessel.lstCVarvwVessels) //pVessel = pData[5]
            };
        }

        [HttpGet, HttpPost]
        public object[] GetRevenueItemsModalData(string pSelectedIDsToGetRevenueItems)
        {
            Exception checkException = new Exception();
            string ShipLinkItemsIDs = "0,-1"; //will hold the IDs to be retrieved for the RevenueItems
            int pVoyageAccountID = 0;
            int _RowCount = 0;
            CvwLinkedSubAccounts objCvwLinkedSubAccounts = new CvwLinkedSubAccounts();
            CvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs objCvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs = new CvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs();
            checkException = objCvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.GetList("WHERE InvoiceHeaderID IN (" + pSelectedIDsToGetRevenueItems + ")");
            CvwSL_ShippingItemsLinking objCvwSL_ShippingItemsLinking = new CvwSL_ShippingItemsLinking();
            for (int i = 0; i < objCvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.lstCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.Count; i++)
                ShipLinkItemsIDs += "," + objCvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.lstCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs[i].ItemID.ToString();
            if (ShipLinkItemsIDs != "")
                checkException = objCvwSL_ShippingItemsLinking.GetList("WHERE ShiplinkItemID IN (" + ShipLinkItemsIDs + ")");
            if (objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking.Count > 0)
            {
                pVoyageAccountID = objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking[0].VoyageAccountID;
                checkException = objCvwLinkedSubAccounts.GetListPaging(9999, 1, "WHERE IsMain=0 AND Account_ID=" + pVoyageAccountID, "Name, Code", out _RowCount);
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking)
                , pVoyageAccountID
                , serializer.Serialize(objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts)
            };
        }

        [HttpGet, HttpPost]
        public object[] Post(string pPostedSelectedIDs, bool pPost)
        {
            Exception checkException = null;
            string strMessage = "";

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            bool _result = false;
            //  checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + DateTime.ParseExact(pJVDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture).ToString() + "' BETWEEN From_Date AND To_Date and Closed=1");
            if (pPost == false)
            {


                int NumberOfInvoicesDeleted = pPostedSelectedIDs.Split(',').Length;
                for (int i = 0; i < NumberOfInvoicesDeleted; i++)
                {
                    objCCustomizedDBCall.ExecuteQuery_DataTable("A_UnApproveCreditYardTank " + int.Parse(pPostedSelectedIDs.Split(',')[i]));
                }

            }
            else
            {
                if (strMessage == "")
                {
                    CvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs = new CvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs();
                    CJVDefaults objCJVDefaults = new CJVDefaults();
                    CvwDefaults objCvwDefaults = new CvwDefaults();
                    int CurrencyID = 0;
                    int _RowCount = 0;

                    decimal ExchangeRate = 0;
                    string UnEditableCompanyName;
                    var ArrSelectedIDs = pPostedSelectedIDs.Split(',');
                    // checkException = objCvwDefaults.GetList("WHERE 1=1");
                    objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
                    UnEditableCompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                    checkException = objCJVDefaults.GetList("WHERE TransTypeID IN (27)");
                    checkException = objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.GetListCreditDebit("," + pPostedSelectedIDs + ",");
                    string BranchID = objCCustomizedDBCall.CallStringFunction("SELECT u.BranchID as BranshID FROM  Users AS u WHERE u.ID= " + WebSecurity.CurrentUserId);


                    Cvw_ClientsIDByYardLinkTankCreditNoteID objCvw_ClientsIDByYardInvoiceID = new Cvw_ClientsIDByYardLinkTankCreditNoteID();
                    CvwCreditHeaderYardLinkTank objCvw_InvoiceHeaderYardByInvoiceID = new CvwCreditHeaderYardLinkTank();



                    #region Validate Linking
                    if (objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Count > 0)
                        for (int j = 0; j < objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Count; j++)
                        {
                            strMessage += (j + 1).ToString() + " - "
                                + objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs[j].ItemTypeEn
                                + ": "
                                + objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs[j].ItemName
                                + "\n";
                        }
                    #endregion Validate Linking
                    if (strMessage == "")
                    {

                        if (pPostedSelectedIDs != null)
                        {
                            int NumberOfInvoices = pPostedSelectedIDs.Split(',').Length;

                            for (int i = 0; i < NumberOfInvoices; i++)
                            {

                                objCvw_ClientsIDByYardInvoiceID.GetList("WHERE CreditNoteID =" + int.Parse(pPostedSelectedIDs.Split(',')[i]));

                                CLinkYardLinkTankForwCreditNote objCLinkYardForwInvoices2 = new CLinkYardLinkTankForwCreditNote();
                                objCLinkYardForwInvoices2.GetList("WHERE YardCreditID =" + int.Parse(pPostedSelectedIDs.Split(',')[i]));


                                if (objCLinkYardForwInvoices2.lstCVarLinkYardLinkTankForwCreditNote.Count == 0)
                                {
                                    COperations objCOperations = new COperations();
                                    CVarOperations objCVarOperations = new CVarOperations();
                                    CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();

                                    #region invoice header
                                    objCvw_InvoiceHeaderYardByInvoiceID.GetList("WHERE ID =" + int.Parse(pPostedSelectedIDs.Split(',')[i]));
                                    CVarAccNote objCVarAccNote = new CVarAccNote();
                                    if (objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank.Count > 0 && strMessage == "")
                                    {
                                        

                                        if (objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].InvoiceHeaderID==0)
                                        {
                                            #region operation header
                                           
                                            int constShippingLineOperationPartnerTypeID = 9;
                                            int constAirineOperationPartnerTypeID = 10;
                                            int constTruckerOperationPartnerTypeID = 11;

                                            objCVarOperations.ID = 0;
                                            objCVarOperations.MasterBL = "0";
                                            objCVarOperations.MAWBSuffix = "0";
                                            objCVarOperations.BLDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.HBLDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.PODate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.Code = "0";
                                            objCVarOperations.HouseNumber = "0";
                                            objCVarOperations.BranchID = 0;
                                            objCVarOperations.SalesmanID = 0;
                                            objCVarOperations.BLType = 2;
                                            objCVarOperations.BLTypeIconName = "0";
                                            objCVarOperations.BLTypeIconStyle = "0";
                                            objCVarOperations.DirectionType = 1;
                                            objCVarOperations.DirectionIconName = "0";
                                            objCVarOperations.DirectionIconStyle = "0";
                                            objCVarOperations.TransportType = 1;
                                            objCVarOperations.TransportIconName = "0";
                                            objCVarOperations.TransportIconStyle = "0";
                                            objCVarOperations.ShipmentType = 4;
                                            objCVarOperations.ShipperID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CustomerID;
                                            objCVarOperations.ShipperAddressID = 0;
                                            objCVarOperations.ShipperContactID = 0;
                                            objCVarOperations.ConsigneeID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CustomerID;
                                            objCVarOperations.ConsigneeAddressID = 0;
                                            objCVarOperations.ConsigneeContactID = 0;
                                            objCVarOperations.AgentID = 0;
                                            objCVarOperations.AgentAddressID = 0;
                                            objCVarOperations.AgentContactID = 0;
                                            objCVarOperations.IncotermID = 0;
                                            objCVarOperations.POrC = 0;
                                            objCVarOperations.MoveTypeID = 0;
                                            objCVarOperations.CommodityID = 0;
                                            objCVarOperations.CommodityID2 = 0;
                                            objCVarOperations.CommodityID3 = 0;
                                            objCVarOperations.TransientTime = 0;
                                            //objCVarOperations.OpenDate = DateTime.Parse(insertOperationData.pOpenDate);
                                            objCVarOperations.OpenDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.CloseDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.CutOffDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.IncludePickup = true;
                                            objCVarOperations.PickupCityID = 0;
                                            objCVarOperations.PickupAddressID = 0;
                                            objCVarOperations.POLCountryID = 0;
                                            objCVarOperations.POL = 0;
                                            objCVarOperations.PODCountryID = 0;
                                            objCVarOperations.POD = 0;
                                            objCVarOperations.PickupAddress = "0"; //updated from main route
                                            objCVarOperations.DeliveryAddress = "0"; //updated from main route
                                            objCVarOperations.ShippingLineID = 0;
                                            objCVarOperations.AirlineID = 0;
                                            objCVarOperations.TruckerID = 0;
                                            objCVarOperations.IncludeDelivery = true;
                                            objCVarOperations.DeliveryZipCode = "0";
                                            objCVarOperations.DeliveryCityID = 0;
                                            objCVarOperations.DeliveryCountryID = 0;
                                            objCVarOperations.GrossWeight = 0;
                                            //objCVarOperations.Volume = decimal.Parse(insertOperationData.pVolume);
                                            objCVarOperations.ChargeableWeight = 0;
                                            //objCVarOperations.NumberOfPackages = int.Parse(insertOperationData.pNumberOfPackages);
                                            objCVarOperations.IsDangerousGoods = false;
                                            objCVarOperations.Notes = "0";
                                            objCVarOperations.Notes2 = "0";
                                            objCVarOperations.CustomerReference = "0";
                                            objCVarOperations.SupplierReference = "0";
                                            objCVarOperations.PONumber = "0";
                                            objCVarOperations.POValue = "0";
                                            objCVarOperations.ReleaseNumber = "0";
                                            objCVarOperations.DispatchNumber = "0";
                                            objCVarOperations.BusinessUnit = "0";
                                            objCVarOperations.Form13Number = "0";
                                            objCVarOperations.AgreedRate = "0";
                                            objCVarOperations.OperationStageID = 0;
                                            objCVarOperations.NumberOfHousesConnected = 0;




                                            objCVarOperations.IsDelivered = false;
                                            objCVarOperations.IsTrucking = false;
                                            objCVarOperations.IsInsurance = false;
                                            objCVarOperations.IsClearance = false;
                                            objCVarOperations.IsBosla = false;
                                            objCVarOperations.IsGenset = false;
                                            objCVarOperations.IsCourrier = false;
                                            objCVarOperations.IsTelexRelease = false;

                                            objCVarOperations.ConsigneeID2 = 0;
                                            objCVarOperations.ReleaseDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.Form13Date = DateTime.Parse("01-01-1900");

                                            objCVarOperations.ClearanceApprovalDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.TruckingApprovalDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.FreightApprovalDate = DateTime.Parse("01-01-1900");

                                            objCVarOperations.ShippedOnBoardDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.FreightPayableAt = "0";
                                            objCVarOperations.CertificateNumber = "0";
                                            objCVarOperations.CountryOfOrigin = "0";
                                            objCVarOperations.InvoiceValue = "0";
                                            objCVarOperations.NumberOfOriginalBills = 0;

                                            #region AirAgents (Venus fields A.Medra)
                                            objCVarOperations.BLDate = DateTime.Parse("01/01/1900");
                                            objCVarOperations.MAWBStockID = 0;
                                            objCVarOperations.TypeOfStockID = 0;
                                            objCVarOperations.FlightNo = "0";
                                            objCVarOperations.POrC = 0;
                                            objCVarOperations.IsAWB = false;
                                            //Fields not in insert
                                            objCVarOperations.AirLineID1 = 0;
                                            objCVarOperations.FlightNo1 = "0";
                                            objCVarOperations.FlightDate1 = DateTime.Parse("01/01/1900");
                                            objCVarOperations.AirLineID2 = 0;
                                            objCVarOperations.FlightNo2 = "0";
                                            objCVarOperations.FlightDate2 = DateTime.Parse("01/01/1900");
                                            objCVarOperations.AirLineID3 = 0;
                                            objCVarOperations.FlightNo3 = "0";
                                            objCVarOperations.FlightDate3 = DateTime.Parse("01/01/1900");

                                            objCVarOperations.UNOrID = "0";
                                            objCVarOperations.ProperShippingName = "0";
                                            objCVarOperations.ClassOrDivision = "0";
                                            objCVarOperations.PackingGroup = "0";
                                            objCVarOperations.QuantityAndTypeOfPacking = "0";
                                            objCVarOperations.PackingInstruction = "0";
                                            objCVarOperations.ShippingDeclarationAuthorization = "0";
                                            objCVarOperations.Barcode = "0";

                                            objCVarOperations.GuaranteeLetterNumber = "0";
                                            objCVarOperations.GuaranteeLetterDate = DateTime.Parse("01/01/1900");
                                            objCVarOperations.GuaranteeLetterAmount = "0";
                                            objCVarOperations.GuaranteeLetterSupplierInvoiceNumber = "0";
                                            objCVarOperations.BankAccountID = 0;
                                            objCVarOperations.GuaranteeLetterNotes = "0";

                                            objCVarOperations.HandlingInformation = "0";
                                            objCVarOperations.AmountOfInsurance = "0";
                                            objCVarOperations.DeclaredValueForCarriage = "0";
                                            objCVarOperations.WeightCharge = 0;
                                            objCVarOperations.ValuationCharge = 0;
                                            objCVarOperations.OtherChargesDueAgent = 0;
                                            objCVarOperations.OtherCharges = "0";
                                            objCVarOperations.CurrencyID = 0;
                                            objCVarOperations.AccountingInformation = "0";
                                            objCVarOperations.ReferenceNumber = "0";
                                            objCVarOperations.OptionalShippingInformation = "0";
                                            objCVarOperations.CHGSCode = "0";
                                            objCVarOperations.WT_VALL_Other = "0";
                                            objCVarOperations.DeclaredValueForCustoms = "0";
                                            objCVarOperations.Tax = 0;
                                            objCVarOperations.OtherChargesDueCarrier = 0;
                                            objCVarOperations.WT_VALL = "0";
                                            objCVarOperations.MarksAndNumbers = "0";
                                            objCVarOperations.Description = "0";
                                            #endregion Venus fields A.Medra

                                            objCVarOperations.CreatorUserID = objCVarOperations.ModificatorUserID = WebSecurity.CurrentUserId;
                                            objCVarOperations.CreationDate = DateTime.Parse("01-01-1900");// DateTime.Now;
                                            objCVarOperations.ModificationDate = DateTime.Now;

                                            objCVarOperations.DismissalPermissionSerial = "0";
                                            objCVarOperations.DeliveryOrderSerial = "0";

                                            objCVarOperations.eFBLID = "0";
                                            objCVarOperations.eFBLStatus = 0;


                                            objCVarOperations.IMOClass = Decimal.Zero;
                                            objCVarOperations.UNNumber = 0;
                                            objCVarOperations.VesselID = 0;
                                            objCVarOperations.BookingNumber = "0";
                                            objCVarOperations.ACIDNumber = "0";
                                            objCVarOperations.ACIDDetails = "0";
                                            objCVarOperations.HouseParentID = 0;
                                            objCVarOperations.IATACode = "0";
                                            objCVarOperations.IssuingCarrier = "0";
                                            objCVarOperations.IssuingDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.StoreLocation = 0;
                                            objCVarOperations.BlStatus = "0";
                                            objCVarOperations.ForwarderId = 0;
                                            objCVarOperations.BusinessUnit = "0";
                                            objCVarOperations.BusinessUnit2 = "0";
                                            objCVarOperations.PrintHouseConsignee = false;
                                            objCVarOperations.HoldReason = "";
                                            objCVarOperations.DORepresentative = "";
                                            objCVarOperations.DOPrintedON = DateTime.Parse("01-01-1900");
                                            objCVarOperations.FileAccountingDate = DateTime.Parse("01-01-1900");
                                            objCVarOperations.DeliveryCustomer = "";
                                            objCVarOperations.ManifestPreConsignee = "";
                                            objCVarOperations.POTID = 0;
                                            objCVarOperations.HouseContainerNumber = "";
                                            objCVarOperations.Form13Notes = "0";

                                            objCOperations.lstCVarOperations.Add(objCVarOperations);
                                            checkException = objCOperations.SaveMethod(objCOperations.lstCVarOperations);
                                            if (checkException != null) // an exception is caught in the model
                                            {
                                                strMessage = checkException.Message;
                                                _result = false;
                                            }
                                            #endregion
                                            #region operation partener
                                            if (strMessage == "" && checkException == null)
                                            {


                                                objCVarOperationPartners.OperationID = objCVarOperations.ID;
                                                objCVarOperationPartners.OperationPartnerTypeID = 2;
                                                objCVarOperationPartners.CustomerID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CustomerID;
                                                objCVarOperationPartners.AgentID = 0;
                                                objCVarOperationPartners.ShippingAgentID = 0;
                                                objCVarOperationPartners.CustomsClearanceAgentID = 0;
                                                objCVarOperationPartners.ShippingLineID = 0;
                                                objCVarOperationPartners.AirlineID = 0;
                                                objCVarOperationPartners.TruckerID = 0;
                                                objCVarOperationPartners.SupplierID = 0;
                                                objCVarOperationPartners.CustodyID = 0;
                                                objCVarOperationPartners.ContactID = 0;
                                                objCVarOperationPartners.IsOperationClient = false;

                                                objCVarOperationPartners.CreatorUserID = objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
                                                objCVarOperationPartners.CreationDate = objCVarOperationPartners.ModificationDate = DateTime.Now;

                                                COperationPartners objCOperationPartners = new COperationPartners();
                                                objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);
                                                checkException = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
                                                if (checkException != null) // an exception is caught in the model
                                                {
                                                    strMessage = checkException.Message;
                                                    _result = false;
                                                }
                                            }


                                            #endregion


                                        }
                                        #region Save InvoiceHeader

                                        objCVarAccNote.Code =objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CrdtSerial.ToString();
                                        objCVarAccNote.NoteType = 100;
                                        objCVarAccNote.NoteDate = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CrdtDate;
                                        objCVarAccNote.OperationID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].InvoiceHeaderID == 0 ? objCVarOperations.ID : objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].OperationID;
                                        objCVarAccNote.OperationPartnerID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].InvoiceHeaderID == 0 ? objCVarOperationPartners.ID : objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].OperationPartnerID;
                                        objCVarAccNote.InvoiceID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].ForInvoiceID;
                                        objCVarAccNote.AddressID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].AddressID;
                                        objCVarAccNote.PrintedAddress = "0";
                                        objCVarAccNote.CurrencyID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CurrencyID;
                                        objCVarAccNote.ExchangeRate = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].Exchangerate;
                                        objCVarAccNote.AmountWithoutVAT = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].Total;
                                        objCVarAccNote.TaxTypeID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CrdtSalaTax >0 ? 2 :0;
                                        objCVarAccNote.TaxPercentage = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CrdtSalaTax > 0 ? 14 : 0;
                                        objCVarAccNote.TaxAmount = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CrdtSalaTax;
                                        objCVarAccNote.DiscountTypeID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].HoldingTaxPercentage > 0 ? (objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].HoldingTaxPercentage == 1 ? 18 : objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].HoldingTaxPercentage == 3 ? 14 : objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].HoldingTaxPercentage == 5 ? 12 : 0) : 0;
                                        objCVarAccNote.DiscountPercentage = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].HoldingTaxPercentage > 0 ? objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].HoldingTaxPercentage : 0;
                                        objCVarAccNote.DiscountAmount = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].HoldingTaxPercentage > 0 ? objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].HoldingTaxAmount : 0;
                                        objCVarAccNote.Amount = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].Total + objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CrdtSalaTax - objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].HoldingTaxAmount;
                                        //objCVarAccNote.PaidAmount = pPaidAmount;
                                        //objCVarAccNote.RemainingAmount = pRemainingAmount;
                                        objCVarAccNote.NoteStatusID = 1;
                                        objCVarAccNote.Remarks = "0";
                                        objCVarAccNote.CreatorUserID = objCVarAccNote.ModificatorUserID = WebSecurity.CurrentUserId;
                                        objCVarAccNote.CreationDate = objCVarAccNote.ModificationDate = DateTime.Now;
                                        objCVarAccNote.PartnerVATNumber = "0";
                                        objCVarAccNote.IsTaxTypeNote = false;

                                        CAccNote objCAccNote = new CAccNote();
                                        objCAccNote.lstCVarAccNote.Add(objCVarAccNote);
                                        checkException = objCAccNote.SaveMethod(objCAccNote.lstCVarAccNote);
                                        if (checkException != null) // an exception is caught in the model
                                        {
                                            strMessage = checkException.Message;
                                            _result = false;
                                        }
                                        #endregion Save InvoiceHeader
                                    }

                                    #endregion

                                    #region recivale
                                    Cvw_CreditHeaderDetailsYardLinkTankByInvoiceID objCvw_InvoiceHeaderDetailsYardByInvoiceID = new Cvw_CreditHeaderDetailsYardLinkTankByInvoiceID();
                                    objCvw_InvoiceHeaderDetailsYardByInvoiceID.GetList("WHERE CreditID =" + int.Parse(pPostedSelectedIDs.Split(',')[i]));
                                    if (objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.Count > 0 && strMessage == "")
                                    {
                                        for (int y = 0; y < objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.Count; y++)
                                        {

                                            CVarPayables objCVarPayables = new CVarPayables();
                                            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                                            objCVarPayables.CreatorUserID = objCVarAccNote.ModificatorUserID = WebSecurity.CurrentUserId;
                                            objCVarPayables.CreationDate = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CrdtDate;
                                            objCVarPayables.GeneratingQRID = 0;
                                            objCVarPayables.ApprovingUserID = 0;
                                            objCVarPayables.CustodyID = 0;
                                            objCVarPayables.SupplierReceiptNo = "0";
                                            objCVarPayables.PaidAmount = 0;
                                            objCVarPayables.RemainingAmount = objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID[y].InvoiceItemsTotal;
                                            objCVarPayables.AccNoteID = objCVarAccNote.ID;
                                            objCVarPayables.JVID = 0;
                                            objCVarPayables.JVID2 = 0;
                                            objCVarPayables.TransactionID = 0;
                                            objCVarPayables.QuotationCost = 0;
                                            objCVarPayables.IsNeglectLimit = false;
                                            objCVarPayables.OfficialAmountPaid = 0;
                                            objCVarPayables.PricingID = 0;
                                            objCVarPayables.OperationVehicleID = 0;
                                            objCVarPayables.OperationContainersAndPackagesID = 0;
                                            objCVarPayables.TruckingOrderID = 0;


                                            objCVarPayables.IsApproved = false;
                                          
                                            objCVarPayables.ID = 0;
                                            objCVarPayables.OperationID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].InvoiceHeaderID == 0 ? objCVarOperations.ID : objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].OperationID;
                                            objCVarPayables.ChargeTypeID = objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID[y].ChargeTypeID;
                                            objCVarPayables.POrC = 0;
                                            objCVarPayables.ContainerTypeID = 0;
                                            objCVarPayables.MeasurementID = objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID[y].MeasurementID;
                                            objCVarPayables.SupplierOperationPartnerID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].OperationPartnerID;
                                            objCVarPayables.Quantity = 1;
                                            objCVarPayables.CostPrice = objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID[y].InvoiceItemsTotal;

                                            objCVarPayables.AmountWithoutVAT = objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID[y].InvoiceItemsTotal;
                                            objCVarPayables.TaxTypeID = 0;
                                            objCVarPayables.TaxPercentage = 0;
                                            objCVarPayables.TaxAmount = 0;
                                            objCVarPayables.DiscountTypeID = 0;
                                            objCVarPayables.DiscountPercentage = 0;
                                            objCVarPayables.DiscountAmount = 0;

                                            objCVarPayables.CostAmount = objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID[y].InvoiceItemsTotal; //total w VAT and Discount
                                            objCVarPayables.InitialSalePrice = 0;
                                            objCVarPayables.SupplierInvoiceNo = "0";
                                            objCVarPayables.SupplierReceiptNo = "0";
                                            objCVarPayables.EntryDate = objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID[y].CreditIssueDate;
                                            objCVarPayables.BillID = 0;
                                            objCVarPayables.IssueDate = objCvw_InvoiceHeaderDetailsYardByInvoiceID.lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID[y].CreditIssueDate;

                                            objCVarPayables.ExchangeRate = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].Exchangerate;
                                            objCVarPayables.CurrencyID = objCvw_InvoiceHeaderYardByInvoiceID.lstCVarvwCreditHeaderYardLinkTank[0].CurrencyID;
                                            objCVarPayables.BillTo = 0;
                                            objCVarPayables.Notes = "";

                                            objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                                            objCVarPayables.ModificationDate = DateTime.Now;

                                            objCVarPayables.SupplierSiteID = 0;
                                            objCVarPayables.IsOfficial = false;
                                            objCVarPayables.IsQuotationApproval = false;
                                            objCVarPayables.ApprovePendingValue = 0;
                                            objCVarPayables.crmCode = "";
                                            objCVarPayables.IsPurchased = false;


                                            CPayables objCPayables = new CPayables();
                                            objCPayables.lstCVarPayables.Add(objCVarPayables);
                                            checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                                            if (checkException != null) // an exception is caught in the model
                                            {
                                                strMessage = checkException.Message;
                                                _result = false;
                                            }


                                        }
                                    }
                                    #endregion

                                    #region post 
                                    if (checkException == null && strMessage == "") // an exception is caught in the model
                                    {
                                        CVarLinkYardLinkTankForwCreditNote objvarCLinkYardForwInvoices = new CVarLinkYardLinkTankForwCreditNote();
                                        #region Link
                                        if (strMessage == "" && checkException == null)
                                        {


                                            objvarCLinkYardForwInvoices.ID = 0;
                                            objvarCLinkYardForwInvoices.ForwCreditID = Convert.ToInt32(objCVarAccNote.ID);
                                            objvarCLinkYardForwInvoices.YardCreditID = int.Parse(pPostedSelectedIDs.Split(',')[i]);
                                            objvarCLinkYardForwInvoices.UserID = WebSecurity.CurrentUserId;

                                            CLinkYardLinkTankForwCreditNote objCLinkYardForwInvoices = new CLinkYardLinkTankForwCreditNote();
                                            objCLinkYardForwInvoices.lstCVarLinkYardLinkTankForwCreditNote.Add(objvarCLinkYardForwInvoices);
                                            checkException = objCLinkYardForwInvoices.SaveMethod(objCLinkYardForwInvoices.lstCVarLinkYardLinkTankForwCreditNote);
                                            if (checkException != null) // an exception is caught in the model
                                            {
                                                strMessage = checkException.Message;
                                                _result = false;
                                            }
                                            else
                                            {
                                                _result = true;
                                            }
                                        }


                                        #endregion


                                        CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                                        checkException = objCCallCustomizedSP.CallCustomizedSP("ERP_ForwWeb_PostingCreditNote", objCVarAccNote.ID , WebSecurity.CurrentUserId, pPost, 0);

                                        if (checkException == null) // an exception is caught in the model
                                        {
                                            string JVID = "";
                                            JVID = objCCustomizedDBCall.CallStringFunction("SELECT JVID FROM AccNote  WHERE ID = " + objCVarAccNote.ID);
                                            objCCustomizedDBCall.CallStringFunction("update YardTransOcean.dbo.CrdtNt set CrdtIsPosted=1, JVID=" + JVID + " WHERE ID = " + int.Parse(pPostedSelectedIDs.Split(',')[i]));
                                            _result = true;
                                        }
                                        else
                                        {
                                            _result = false;
                                            strMessage = checkException.Message;
                                        }
                                    }
                                    #endregion
                                }
                                else
                                {
                                    CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                                    checkException = objCCallCustomizedSP.CallCustomizedSP("ERP_ForwWeb_PostingCreditNote", objCLinkYardForwInvoices2.lstCVarLinkYardLinkTankForwCreditNote[0].ForwCreditID, WebSecurity.CurrentUserId, pPost, 0);

                                    if (checkException == null) // an exception is caught in the model
                                    {
                                        string JVID = "";
                                        JVID = objCCustomizedDBCall.CallStringFunction("SELECT JVID FROM AccNote  WHERE ID = " + objCLinkYardForwInvoices2.lstCVarLinkYardLinkTankForwCreditNote[0].ForwCreditID);
                                        objCCustomizedDBCall.CallStringFunction("update YardTransOcean.dbo.CrdtNt set CrdtIsPosted=1, JVID=" + JVID + " WHERE ID = " + int.Parse(pPostedSelectedIDs.Split(',')[i]));
                                        _result = true;
                                    }
                                    else
                                    {
                                        _result = false;
                                        strMessage = checkException.Message;
                                    }
                                }


                                //checkException = objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.GetListPosting( int.Parse(pPostedSelectedIDs.Split(',')[i]), WebSecurity.CurrentUserId, pPost);
                                //    if (checkException != null)
                                //    {
                                //        strMessage = checkException.Message;
                                //    }

                            }
                        }
                    }
                }
            }
            return new object[] {
                strMessage
            };
        }

    }
}



