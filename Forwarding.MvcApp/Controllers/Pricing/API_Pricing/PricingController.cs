using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ContactPersons.Generated;
using Forwarding.MvcApp.Models.CRM.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.PricingModule.PricingTab;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using Forwarding.MvcApp.Entities.Quotations;
using System;
using System.Globalization;
using System.Linq;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.PricingModule.Customized;
using System.Collections.Generic;
using System.Data;
using System.Runtime.InteropServices;
using Newtonsoft.Json;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;

namespace Forwarding.MvcApp.Controllers.Pricing.API_Pricing
{
    public class PricingController : ApiController
    {
        #region Pricing

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsReturnObjectArray, Int32 pPricingTypeID, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Int32 _dummyRowCount = 0;
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _dummyRowCount);
            string pWhereClauseSalesLead = "WHERE 1=1";
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClauseSalesLead += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            CvwPricingSettings objCvwPricingSettings = new CvwPricingSettings();
            CvwPricing objCvwPricing = new CvwPricing();
            CPricingCharge objCPricingCharge = new CPricingCharge();
            CShippingLines objCShippingLines = new CShippingLines();
            CAirlines objCAirlines = new CAirlines();
            CTruckers objCTruckers = new CTruckers();
            CAgents objCAgents = new CAgents();
            CCustomsClearanceAgents objCCCA = new CCustomsClearanceAgents();
            CvwCRM_SalesLeadToSendQuotation objCRM_Clients = new CvwCRM_SalesLeadToSendQuotation();
            string pPricingIDs = "";
            int constPricingOcean = 10;
            int constPricingAir = 20;
            int constPricingInland = 30;
            int constPricingCustomsClearance = 40;
            //int constPricingGeneral = 50;

            objCRM_Clients.GetListPaging(999999, 1, pWhereClauseSalesLead, "Name", out _dummyRowCount);
            objCAgents.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _dummyRowCount);
            objCvwPricingSettings.GetListPaging(100, 1, "WHERE PricingTypeID=" + pPricingTypeID.ToString(), "ChargeTypeName", out _RowCount);
            objCvwPricing.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            #region Get PricingIDs to be used in PricingCharges GetList as whereClause
            if (objCvwPricing.lstCVarvwPricing.Count > 0) //otherwise return the empty PricingCharge
            {
                pPricingIDs = objCvwPricing.lstCVarvwPricing[0].ID.ToString();
                for (int i = 1; i < objCvwPricing.lstCVarvwPricing.Count; i++)
                    pPricingIDs += "," + objCvwPricing.lstCVarvwPricing[i].ID.ToString();
                objCPricingCharge.GetListPaging(1000, 1, "WHERE PricingID IN (" + pPricingIDs + ")", "ID", out _dummyRowCount);
            }
            #endregion Get PricingIDs to get PricingCharges

            CCountries objCCountries = new CCountries();
            objCCountries.GetList(" WHERE 1=1 ORDER BY Name ");
            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetList(" WHERE 1=1 ORDER BY Code ");
            CCommodities objCCommodities = new CCommodities();
            objCCommodities.GetList(" WHERE 1=1 ORDER BY Name ");

            CPackageTypes objCPackageTypes = new CPackageTypes();
            if (pPricingTypeID == constPricingOcean)
                objCPackageTypes.GetList(" WHERE IsOcean=1 ORDER BY Name ");
            else if (pPricingTypeID == constPricingAir)
                objCPackageTypes.GetList(" WHERE IsAir=1 ORDER BY Name ");
            else if (pPricingTypeID == constPricingInland)
                objCPackageTypes.GetList(" WHERE IsInland=1 ORDER BY Name ");
            else if (pPricingTypeID == constPricingCustomsClearance)
                objCPackageTypes.GetList(" WHERE IsCustomsClearance=1 ORDER BY Name ");

            if (pPricingTypeID == constPricingOcean)
                objCShippingLines.GetList(" WHERE 1=1 ORDER BY Name ");
            else if (pPricingTypeID == constPricingAir)
                objCAirlines.GetList(" WHERE 1=1 ORDER BY Name ");
            else if (pPricingTypeID == constPricingInland)
                objCTruckers.GetList(" WHERE 1=1 ORDER BY Name ");
            else if (pPricingTypeID == constPricingCustomsClearance)
                objCCCA.GetList(" WHERE 1=1 ORDER BY Name ");

            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList("where 1=1");

            #region Get Lists with minimal columns
            var pSalesLead = objCRM_Clients.lstCVarvwCRM_SalesLeadToSendQuotation
                //.GroupBy(g => g.ReceiveID)
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                }).ToList();
            var pAgentList = objCAgents.lstCVarAgents
                //.GroupBy(g => g.ReceiveID)
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                }).ToList();
            #endregion Get Lists with minimal columns

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwPricing.lstCVarvwPricing)
                , _RowCount
                , pIsReturnObjectArray ? new JavaScriptSerializer().Serialize(objCContainerTypes.lstCVarContainerTypes) : null  //data[2]
                , pIsReturnObjectArray ? new JavaScriptSerializer().Serialize(objCCommodities.lstCVarCommodities) : null  //data[3]
                , pIsReturnObjectArray ? new JavaScriptSerializer().Serialize(objCCountries.lstCVarCountries) : null  //data[4]
                , pPricingTypeID == constPricingOcean  //data[5]
                    ? new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines)
                    : (
                        pPricingTypeID == constPricingAir
                            ? new JavaScriptSerializer().Serialize(objCAirlines.lstCVarAirlines)
                            : (
                                    pPricingTypeID == constPricingInland
                                    ? new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers)
                                    : (
                                        pPricingTypeID == constPricingCustomsClearance
                                            ? new JavaScriptSerializer().Serialize(objCCCA.lstCVarCustomsClearanceAgents)
                                            : null
                                    )
                                )
                        )
                , new JavaScriptSerializer().Serialize(objCvwPricingSettings.lstCVarvwPricingSettings) //data[6]
                , new JavaScriptSerializer().Serialize(objCPricingCharge.lstCVarPricingCharge) //data[7]
                , new JavaScriptSerializer().Serialize(pSalesLead) //data[8]
                , new JavaScriptSerializer().Serialize(objCPackageTypes.lstCVarPackageTypes) //data[9]
                , pIsReturnObjectArray ? serializer.Serialize(pAgentList) : null //data[10]
                ,serializer.Serialize(objCChargeTypes.lstCVarChargeTypes) //data[11]
            };
        }

        [HttpGet, HttpPost, HttpOptions, AllowCors]
        public object[] Pricing_SaveList([FromBody] Pricing_SaveListData pricing_SaveListData, string pricing_SaveListDataObject = "", string targetCompany = "", string pPricingBedayaIDs = "")
        {
            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "BED")
            {
                if (pricing_SaveListData == null && pricing_SaveListDataObject != "")
                {
                    pricing_SaveListData = JsonConvert.DeserializeObject<Pricing_SaveListData>(pricing_SaveListDataObject);
                }
            }

            Exception checkException = null;
            string _MessageReturned = "";
            string pUpdateClause = "";
            string pPricingIDs = "";
            Int64 pPricingID = 0; //used in saving PricingCharge
            CPricing objCPricing = new CPricing();
            CvwPricing objCvwPricing = new CvwPricing();
            CPricingCharge objCPricingCharge = new CPricingCharge();
            CvwPricingSettings objCvwPricingSettings = new CvwPricingSettings();
            CDefaults objCDefaults = new CDefaults();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            int NumberOfRows = pricing_SaveListData.pSelectedIDsToSave.Split(',').Length;
            int NumberOfPricingCharge = pricing_SaveListData.pPricingChargeIDList.Split(',').Length;
            int CurrenctPricingChargeIndex = 0; //keeps incrementing till the function ends
            int NumberOfChargesPerRow = 0;
            int _dummyRowCount = 0;
            objCDefaults.GetListPaging(1, 1, "", "ID", out _dummyRowCount);
            string pBedayaPricingIDs = "";
            for (int i = 0; i < NumberOfRows; i++)
            {
                //CurrenctPricingChargeIndex = 0;
                #region Set PricingLog Header Part
                CCurrencies objC_Current_Currencies = new CCurrencies();
                CCurrencies objC_Old_Currencies = new CCurrencies();
                CVarPricingLog objCVarPricingLog = new CVarPricingLog();
                CvwPricing objCvw_Old_Pricing = new CvwPricing();
                string _NotesLogColumn = "";
                string _CurrentCurrency = "";
                string _OldCurrency = "";

            
                objC_Current_Currencies.GetListPaging(999999, 1, "WHERE ID=" + pricing_SaveListData.pCurrencyIDList.Split(',')[i], "ID", out _dummyRowCount);
                if (targetCompany == "celia")
                {
                    objCvw_Old_Pricing.GetListPaging(999999, 1, "WHERE BedayaID=" + pPricingBedayaIDs.Split(',')[i], "ID", out _dummyRowCount);
                }
                else
                {
                    objCvw_Old_Pricing.GetListPaging(999999, 1, "WHERE ID=" + pricing_SaveListData.pSelectedIDsToSave.Split(',')[i], "ID", out _dummyRowCount);
                }

                _CurrentCurrency = objC_Current_Currencies.lstCVarCurrencies[0].Code;
                _OldCurrency = pricing_SaveListData.pIsInsertList.Split(',')[i] == "1" ? _CurrentCurrency : objCvw_Old_Pricing.lstCVarvwPricing[0].CurrencyCode;

                //objCVarPricingLog.PricingID = pPricingID; //set at the end of the loop
                if (WebSecurity.CurrentUserId == -1)
                {
                    objCVarPricingLog.UserID = 130;
                }
                else
                {
                    // Otherwise, use the CurrentUser Id
                    objCVarPricingLog.UserID = WebSecurity.CurrentUserId;
                }
                //objCVarPricingLog.UserID = WebSecurity.CurrentUserId;
                objCVarPricingLog.CustomerID = pricing_SaveListData.pCustomerIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pCustomerIDList.Split(',')[i]);
                objCVarPricingLog.ShippingLineID = pricing_SaveListData.pShippingLineIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pShippingLineIDList.Split(',')[i]);
                objCVarPricingLog.AirlineID = pricing_SaveListData.pAirlineIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pAirlineIDList.Split(',')[i]);
                objCVarPricingLog.TruckerID = pricing_SaveListData.pTruckerIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pTruckerIDList.Split(',')[i]);
                objCVarPricingLog.CCAID = pricing_SaveListData.pCCAIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pCCAIDList.Split(',')[i]);
                objCVarPricingLog.POLCountryID = pricing_SaveListData.pPOLCountryIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPOLCountryIDList.Split(',')[i]);
                objCVarPricingLog.POLID = pricing_SaveListData.pPOLIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPOLIDList.Split(',')[i]);
                objCVarPricingLog.PODCountryID = pricing_SaveListData.pPODCountryIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPODCountryIDList.Split(',')[i]);
                objCVarPricingLog.PODID = pricing_SaveListData.pPODIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPODIDList.Split(',')[i]);
                objCVarPricingLog.CommodityID = pricing_SaveListData.pCommodityIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pCommodityIDList.Split(',')[i]);
                if (objCvw_Old_Pricing.lstCVarvwPricing.Count > 0)
                { //Update
                    objCVarPricingLog.CustomerID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].CustomerID;
                    objCVarPricingLog.ShippingLineID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].ShippingLineID;
                    objCVarPricingLog.AirlineID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].AirlineID;
                    objCVarPricingLog.TruckerID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].TruckerID;
                    objCVarPricingLog.CCAID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].CCAID;
                    objCVarPricingLog.POLCountryID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].POLCountryID;
                    objCVarPricingLog.POLID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].POLID;
                    objCVarPricingLog.PODCountryID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].PODCountryID;
                    objCVarPricingLog.PODID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].PODID;
                    objCVarPricingLog.CommodityID_Old = objCvw_Old_Pricing.lstCVarvwPricing[0].CommodityID;
                }
                _NotesLogColumn = "Valid From: " + (objCvw_Old_Pricing.lstCVarvwPricing.Count > 0 ? Forwarding.MvcApp.Helpers.DateFunctionsController.GetddMMyyyyWithSlashesFormat(objCvw_Old_Pricing.lstCVarvwPricing[0].ValidFrom) : "None") + "  --> " + pricing_SaveListData.pValidFromList.Split(',')[i] + "\n";
                _NotesLogColumn += "Valid To: " + (objCvw_Old_Pricing.lstCVarvwPricing.Count > 0 ? Forwarding.MvcApp.Helpers.DateFunctionsController.GetddMMyyyyWithSlashesFormat(objCvw_Old_Pricing.lstCVarvwPricing[0].ValidTo) : "None") + "  --> " + pricing_SaveListData.pValidToList.Split(',')[i] + "\n";
                //objCVarPricingLog.Notes = _NotesLogColumn;
                objCVarPricingLog.CreationDate = DateTime.Now;
                #endregion Set PricingLog Header Part

                objCvwPricingSettings.GetList("WHERE PricingTypeID=" + pricing_SaveListData.pPricingTypeIDList.Split(',')[i] + " ORDER BY ChargeTypeName");
                NumberOfChargesPerRow = objCvwPricingSettings.lstCVarvwPricingSettings.Count;
                if (pricing_SaveListData.pIsInsertList.Split(',')[i] == "1") //Insert
                {
                    #region Insert
                    _OldCurrency = "";
                    CVarPricing objCVarPricing = new CVarPricing();
                    objCVarPricing.CustomerID = pricing_SaveListData.pCustomerIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pCustomerIDList.Split(',')[i]);
                    objCVarPricing.CustomerReference = pricing_SaveListData.pCustomerReferenceList.Split(',')[i] == "NULL" ? "0" : pricing_SaveListData.pCustomerReferenceList.Split(',')[i];
                    objCVarPricing.AgentID = pricing_SaveListData.pAgentIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pAgentIDList.Split(',')[i]);
                    objCVarPricing.PricingTypeID = pricing_SaveListData.pPricingTypeIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPricingTypeIDList.Split(',')[i]);
                    objCVarPricing.ShippingLineID = pricing_SaveListData.pShippingLineIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pShippingLineIDList.Split(',')[i]);
                    objCVarPricing.AirlineID = pricing_SaveListData.pAirlineIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pAirlineIDList.Split(',')[i]);
                    objCVarPricing.TruckerID = pricing_SaveListData.pTruckerIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pTruckerIDList.Split(',')[i]);
                    objCVarPricing.CCAID = pricing_SaveListData.pCCAIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pCCAIDList.Split(',')[i]);
                    objCVarPricing.POLCountryID = pricing_SaveListData.pPOLCountryIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPOLCountryIDList.Split(',')[i]);
                    objCVarPricing.POLID = pricing_SaveListData.pPOLIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPOLIDList.Split(',')[i]);
                    objCVarPricing.PODCountryID = pricing_SaveListData.pPODCountryIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPODCountryIDList.Split(',')[i]);
                    objCVarPricing.PODID = pricing_SaveListData.pPODIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPODIDList.Split(',')[i]);
                    objCVarPricing.EquipmentID = pricing_SaveListData.pEquipmentIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pEquipmentIDList.Split(',')[i]);
                    objCVarPricing.PackageTypeID = pricing_SaveListData.pPackageTypeIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pPackageTypeIDList.Split(',')[i]);
                    objCVarPricing.CommodityID = pricing_SaveListData.pCommodityIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pCommodityIDList.Split(',')[i]);
                    objCVarPricing.TransitTime = pricing_SaveListData.pTransitTimeList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pTransitTimeList.Split(',')[i]);
                    objCVarPricing.Frequency = pricing_SaveListData.pFrequencyList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pFrequencyList.Split(',')[i]);
                    objCVarPricing.FrequencyNotes = pricing_SaveListData.pFrequencyNotesList.Split(',')[i] == "NULL" ? "0" : pricing_SaveListData.pFrequencyNotesList.Split(',')[i];
                    objCVarPricing.FreeTime = pricing_SaveListData.pFreeTimeList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pFreeTimeList.Split(',')[i]);




                    //objCVarPricing.ValidFrom = pricing_SaveListData.pValidFromList.Split(',')[i] == "NULL" ? DateTime.Parse("01/01/1900") : DateTime.Parse(pricing_SaveListData.pValidFromList.Split(',')[i]); // Forwarding.MvcApp.Helpers.DateFunctionsController.GetddMMyyyyWithSlashesFormat(Convert.ToDateTime(pValidToList.Split(',')[i]));
                    //objCVarPricing.ValidTo = pricing_SaveListData.pValidToList.Split(',')[i] == "NULL" ? DateTime.Parse("01/01/1900") : DateTime.Parse(pricing_SaveListData.pValidToList.Split(',')[i]); // Forwarding.MvcApp.Helpers.DateFunctionsController.GetddMMyyyyWithSlashesFormat(Convert.ToDateTime(pValidToList.Split(',')[i]));

                    objCVarPricing.ValidFrom = pricing_SaveListData.pValidFromList.Split(',')[i] == "NULL" ? Convert.ToDateTime("01/01/1900") : DateTime.ParseExact(pricing_SaveListData.pValidFromList.Split(',')[i], "d/M/yyyy", CultureInfo.InvariantCulture);
                    objCVarPricing.ValidTo = pricing_SaveListData.pValidToList.Split(',')[i] == "NULL" ? Convert.ToDateTime("01/01/1900") : DateTime.ParseExact(pricing_SaveListData.pValidToList.Split(',')[i], "d/M/yyyy", CultureInfo.InvariantCulture);

                    objCVarPricing.CurrencyID = pricing_SaveListData.pCurrencyIDList.Split(',')[i] == "NULL" ? 0 : Int32.Parse(pricing_SaveListData.pCurrencyIDList.Split(',')[i]);
                    objCVarPricing.ExchangeRate = pricing_SaveListData.pExchangeRateList.Split(',')[i] == "NULL" ? 0 : decimal.Parse(pricing_SaveListData.pExchangeRateList.Split(',')[i]);

                    objCVarPricing.Notes = pricing_SaveListData.pNotesList.Split(',')[i] == "NULL" ? "0" : pricing_SaveListData.pNotesList.Split(',')[i];
                    objCVarPricing.IsPricingRequest = pricing_SaveListData.pIsPricingRequest;
                    if (WebSecurity.CurrentUserId == -1)
                    {
                        objCVarPricing.CreatorUserID = objCVarPricing.ModificatorUserID = 130;
                    }
                    else
                    {
                        objCVarPricing.CreatorUserID = objCVarPricing.ModificatorUserID = WebSecurity.CurrentUserId;
                    }
                    //objCVarPricing.CreatorUserID = objCVarPricing.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarPricing.CreationDate = objCVarPricing.ModificationDate = DateTime.Now;

                    //***************************************************************************************
                    objCVarPricing.GrossWeight = pricing_SaveListData.pGrossWeightList == null ? 0 : Int32.Parse(pricing_SaveListData.pGrossWeightList.Split(',')[i]);
                    objCVarPricing.FreeDaysPOD = pricing_SaveListData.pFreeDaysPODList == null ? 0 : Int32.Parse(pricing_SaveListData.pFreeDaysPODList.Split(',')[i]);
                    objCVarPricing.PickupAddress = pricing_SaveListData.pPickupAddressList == null ? "" : pricing_SaveListData.pPickupAddressList.Split(',')[i];
                    objCVarPricing.ETA = pricing_SaveListData.pETAList == null ? Convert.ToDateTime("01/01/1900") : DateTime.ParseExact(pricing_SaveListData.pETAList.Split(',')[i], "d/M/yyyy", CultureInfo.InvariantCulture);
                    objCVarPricing.ETD = pricing_SaveListData.pETDList == null ? Convert.ToDateTime("01/01/1900") : DateTime.ParseExact(pricing_SaveListData.pETDList.Split(',')[i], "d/M/yyyy", CultureInfo.InvariantCulture);
                    objCVarPricing.StuffingCutOf = pricing_SaveListData.pStuffingCutOfList == null ? Convert.ToDateTime("01/01/1900") : DateTime.ParseExact(pricing_SaveListData.pStuffingCutOfList.Split(',')[i], "d/M/yyyy", CultureInfo.InvariantCulture);
                    //***************************************************************************************


                    objCPricing.lstCVarPricing.Add(objCVarPricing);
                    checkException = objCPricing.SaveMethod(objCPricing.lstCVarPricing);
                    pPricingID = objCVarPricing.ID;
                    if (i == 0)
                    {
                        pBedayaPricingIDs = pPricingID.ToString();
                    }
                    else
                    {
                        pBedayaPricingIDs += "," + pPricingID.ToString();
                    }
                    if (targetCompany == "celia")
                    {
                        objCCustomizedDBCall.ExecuteQuery("Update Pricing Set BedayaID = " + pPricingBedayaIDs.Split(',')[i] + " Where ID = " + pPricingID);// + pPricingID(SELECT TOP 1 ID FROM pricing ORDER BY ID DESC)"
                    }
                    //if (pricing_SaveListData.pIsPricingRequest)
                    //    _NotesLogColumn = "Pricing Request:" + "\n";
                    #endregion Insert
                } //of insert pricing
                else //Update
                {
                    #region Update
                    pUpdateClause = " PricingTypeID = " + pricing_SaveListData.pPricingTypeIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,CustomerID = " + pricing_SaveListData.pCustomerIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,CustomerReference = " + (pricing_SaveListData.pCustomerReferenceList.Split(',')[i] == "0" ? "null" : ("N'" + pricing_SaveListData.pCustomerReferenceList.Split(',')[i] + "'")) + " \n";
                    pUpdateClause += " ,AgentID = " + pricing_SaveListData.pAgentIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,ShippingLineID = " + pricing_SaveListData.pShippingLineIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,AirlineID = " + pricing_SaveListData.pAirlineIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,TruckerID = " + pricing_SaveListData.pTruckerIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,CCAID = " + pricing_SaveListData.pCCAIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,POLCountryID = " + pricing_SaveListData.pPOLCountryIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,POLID = " + pricing_SaveListData.pPOLIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,PODCountryID = " + pricing_SaveListData.pPODCountryIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,PODID = " + pricing_SaveListData.pPODIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,EquipmentID = " + pricing_SaveListData.pEquipmentIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,PackageTypeID = " + pricing_SaveListData.pPackageTypeIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,CommodityID = " + pricing_SaveListData.pCommodityIDList.Split(',')[i] + "\n";

                    pUpdateClause += " ,TransitTime = " + pricing_SaveListData.pTransitTimeList.Split(',')[i] + "\n";
                    pUpdateClause += " ,Frequency = " + pricing_SaveListData.pFrequencyList.Split(',')[i] + "\n";
                    pUpdateClause += " ,FreeTime = " + pricing_SaveListData.pFreeTimeList.Split(',')[i] + "\n";
                    //pUpdateClause += " , FrequencyNotes = N'" + pricing_SaveListData.pFrequencyNotesList.Split(',')[i] + "' \n";
                    pUpdateClause += " ,ValidFrom = " + (pricing_SaveListData.pValidFromList.Split(',')[i] == "" ? " NULL " : " '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pricing_SaveListData.pValidFromList.Split(',')[i], 1) + "' ");
                    pUpdateClause += " ,ValidTo = " + (pricing_SaveListData.pValidToList.Split(',')[i] == "" ? " NULL " : " '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pricing_SaveListData.pValidToList.Split(',')[i], 1) + "' ");
                    pUpdateClause += " ,CurrencyID = " + pricing_SaveListData.pCurrencyIDList.Split(',')[i] + "\n";
                    pUpdateClause += " ,ExchangeRate = " + pricing_SaveListData.pExchangeRateList.Split(',')[i] + "\n";
                    pUpdateClause += " ,Notes = " + (pricing_SaveListData.pNotesList.Split(',')[i] == "0" ? "null" : ("N'" + pricing_SaveListData.pNotesList.Split(',')[i] + "'")) + " \n";


                    if (WebSecurity.CurrentUserId == -1)
                    {
                        pUpdateClause += " ,ModificatorUserID = N'" + "130" + "'";
                    }
                    else
                    {
                        pUpdateClause += " ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'";
                    }
                    //pUpdateClause += " ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'";
                    pUpdateClause += " ,ModificationDate = GETDATE() ";
                    if (targetCompany == "celia")
                    {
                        pUpdateClause += "WHERE BedayaID=" + pPricingBedayaIDs.Split(',')[i] + "\n";
                    }
                    else
                    {
                        pUpdateClause += "WHERE ID=" + pricing_SaveListData.pSelectedIDsToSave.Split(',')[i] + "\n";
                    }
                    if (i == 0)
                    {
                        pBedayaPricingIDs = pricing_SaveListData.pSelectedIDsToSave.Split(',')[i];
                    }
                    else
                    {
                        pBedayaPricingIDs += "," + pricing_SaveListData.pSelectedIDsToSave.Split(',')[i];
                    }
                    checkException = objCPricing.UpdateList(pUpdateClause);
                    pPricingID = (Int64.Parse(pricing_SaveListData.pSelectedIDsToSave.Split(',')[i]));
                    #endregion Update
                }
                #region Save PricingCharge
                _NotesLogColumn += "\n Charges: " + "\n";
                for (int j = 0; j < NumberOfChargesPerRow && checkException == null /*to not save with uniqueness violation*/; j++)
                {
                    CVarPricingCharge objSavedCVarPricingCharge = new CVarPricingCharge();
                    CPricingCharge objSavedCPricingCharge = new CPricingCharge();
                    CChargeTypes objCChargeTypes = new CChargeTypes();
                    objCChargeTypes.GetListPaging(999999, 1, "WHERE ID=" + objCvwPricingSettings.lstCVarvwPricingSettings[j].ChargeTypeID, "ID", out _dummyRowCount);
                    _NotesLogColumn += objCChargeTypes.lstCVarChargeTypes[0].Name + ": ";
                    if (pricing_SaveListData.pPricingChargeIDList.Split(',')[CurrenctPricingChargeIndex] == "0") //Insert PricingCharge
                    {
                        objSavedCVarPricingCharge.ChargeTypeID = objCvwPricingSettings.lstCVarvwPricingSettings[j].ChargeTypeID;


                        objSavedCVarPricingCharge.CostPrice = decimal.Parse(pricing_SaveListData.pCostPriceList.Split(',')[CurrenctPricingChargeIndex]);
                        if (WebSecurity.CurrentUserId == -1)
                        {
                            objSavedCVarPricingCharge.CreatorUserID = objSavedCVarPricingCharge.ModificatorUserID = 130;
                        }
                        else
                        {
                            objSavedCVarPricingCharge.CreatorUserID = objSavedCVarPricingCharge.ModificatorUserID = WebSecurity.CurrentUserId;
                        }
                        if (targetCompany == "celia")
                        {
                            CPricing objCPricingCel = new CPricing();
                            objCPricingCel.GetList("Where BedayaID = " + pPricingBedayaIDs.Split(',')[i]);
                            objSavedCVarPricingCharge.PricingID = objCPricingCel.lstCVarPricing[0].ID;

                        }
                        else
                        {
                            objSavedCVarPricingCharge.PricingID = pPricingID;
                        }
                        //objSavedCVarPricingCharge.CreatorUserID = objSavedCVarPricingCharge.ModificatorUserID = WebSecurity.CurrentUserId;
                        objSavedCVarPricingCharge.CreationDate = objSavedCVarPricingCharge.ModificationDate = DateTime.Now;
                        objSavedCPricingCharge.lstCVarPricingCharge.Add(objSavedCVarPricingCharge);
                        checkException = objSavedCPricingCharge.SaveMethod(objSavedCPricingCharge.lstCVarPricingCharge);
                        _NotesLogColumn += "0 " + _OldCurrency + " --> " + pricing_SaveListData.pCostPriceList.Split(',')[CurrenctPricingChargeIndex] + " " + _CurrentCurrency + "\n";
                    }
                    else //Update PricingCharge
                    {
                        DataTable chargeIdsCelTable;
                        string chargeIdsCel = string.Empty;
                        CPricingCharge objC_Old_CPricingCharge = new CPricingCharge();
                        if (targetCompany == "celia")
                        {
                            string objCPricingCelIDs = "";
                            CPricing objCPricingCel = new CPricing();
                            objCPricingCel.GetList("Where BedayaID IN (" + pPricingBedayaIDs + ")");//.Split(',')[i]
                            foreach (var objCPricingCelCh in objCPricingCel.lstCVarPricing)
                            {
                                if (objCPricingCelIDs == "")
                                {
                                    objCPricingCelIDs = objCPricingCelCh.ID.ToString();
                                }
                                else
                                {
                                    objCPricingCelIDs += ',' + objCPricingCelCh.ID.ToString();
                                }
                            }
                            chargeIdsCelTable = objCCustomizedDBCall.ExecuteQuery_DataTable("SELECT STUFF((SELECT ',' + CAST(PC.ID AS nvarchar(20)) FROM PricingCharge PC WHERE PC.PricingID in (" + objCPricingCelIDs + ")  FOR XML PATH('')), 1, 1, '') AS ConcatenatedIDs;");


                            if (chargeIdsCelTable.Rows.Count > 0)
                            {
                                chargeIdsCel = chargeIdsCelTable.Rows[0]["ConcatenatedIDs"].ToString();
                            }

                            objC_Old_CPricingCharge.GetListPaging(999999, 1, "WHERE ID=" + chargeIdsCel.Split(',')[CurrenctPricingChargeIndex], "ID", out _dummyRowCount);
                        }
                        else
                        {
                            objC_Old_CPricingCharge.GetListPaging(999999, 1, "WHERE ID=" + pricing_SaveListData.pPricingChargeIDList.Split(',')[CurrenctPricingChargeIndex], "ID", out _dummyRowCount);
                        }

                        pUpdateClause = " CostPrice = " + pricing_SaveListData.pCostPriceList.Split(',')[CurrenctPricingChargeIndex] + "\n";
                        if (WebSecurity.CurrentUserId == -1)
                        {
                            pUpdateClause += " ,ModificatorUserID = N'" + "130" + "'";
                        }
                        else
                        {
                            pUpdateClause += " ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'";
                        }
                        //pUpdateClause += " ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'";
                        pUpdateClause += " ,ModificationDate = GETDATE() ";
                        if (targetCompany == "celia")
                        {
                            pUpdateClause += "WHERE ID=" + chargeIdsCel.Split(',')[CurrenctPricingChargeIndex] + "\n";
                        }
                        else
                        {
                            pUpdateClause += "WHERE ID=" + pricing_SaveListData.pPricingChargeIDList.Split(',')[CurrenctPricingChargeIndex] + "\n";
                        }

                        checkException = objSavedCPricingCharge.UpdateList(pUpdateClause);
                        _NotesLogColumn += objC_Old_CPricingCharge.lstCVarPricingCharge[0].CostPrice + " " + _OldCurrency + " --> " + pricing_SaveListData.pCostPriceList.Split(',')[CurrenctPricingChargeIndex] + " " + _CurrentCurrency + "\n";
                    }
                    CurrenctPricingChargeIndex++;
                }
                #endregion Save PricingCharge

                #region Save PricingLog

                if (checkException == null)
                {
                    if (1 == 2)//if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "BED")
                    {
                        objCVarPricingLog.PricingID = pPricingID;
                        objCVarPricingLog.Notes = _NotesLogColumn;
                        CPricingLog objCPricingLog = new CPricingLog();
                        objCPricingLog.lstCVarPricingLog.Add(objCVarPricingLog);
                        objCPricingLog.SaveMethod(objCPricingLog.lstCVarPricingLog);
                    }
                }
                else
                    _MessageReturned += "\n" + checkException.Message;
                #endregion Save PricingLog
            } //of outer for loop (of pricing rows)
            //if (checkException == null)
            {
                checkException = objCvwPricing.GetListPaging(pricing_SaveListData.pPageSize, pricing_SaveListData.pPageNumber, pricing_SaveListData.pWhereClausePricing, pricing_SaveListData.pOrderBy, out _RowCount);

                //For new insert email and alert for sales else for all employees
                #region Send Email & Alert
                CGroups objCGroups = new CGroups();
                objCGroups.GetList("WHERE GroupImageURL='CRM' AND IsInactive=0"); //have CRM Enabled
                //if (objCGroups.lstCVarGroups.Count > 0 && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "IST")
                if (1 == 2 && objCGroups.lstCVarGroups.Count > 0 && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "SAF")
                {
                    CUsers objCUsers = new CUsers();
                    checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>''");
                    string subject = "Pricing Alert.";
                    string body = "Rates are modified.";
                    string FromMail = "noreply-Rename@istegy.com";
                    bool _boolEmailFound = false;
                    //string emailTo = ""; //"sherifanwar@yahoo.com";
                    //string CC = "sherifanwar80@gmail.com";
                    MailMessage mail = new MailMessage();

                    SmtpClient SmtpServer = new SmtpClient();
                    SmtpServer.UseDefaultCredentials = true;
                    //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);

                    mail.From = new MailAddress(FromMail);
                    for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                    {
                        _boolEmailFound = true;
                        mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                    }
                    //mail.CC.Add(CC);
                    mail.Subject = subject;
                    mail.Body = body;
                    //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                    //SmtpServer.Port = 25;
                    //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                    //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                    SmtpServer.Host = "smtpout.secureserver.net";
                    SmtpServer.Credentials = new System.Net.NetworkCredential(FromMail, "123456");
                    SmtpServer.EnableSsl = true;//false
                    if (_boolEmailFound)
                        SmtpServer.Send(mail);
                }
                #endregion Send Email & Alert

                #region Get PricingIDs to be used in PricingCharges GetList as whereClause
                if (objCvwPricing.lstCVarvwPricing.Count > 0) //otherwise return the empty PricingCharge
                {
                    pPricingIDs = objCvwPricing.lstCVarvwPricing[0].ID.ToString();
                    for (int i = 1; i < objCvwPricing.lstCVarvwPricing.Count; i++)
                        pPricingIDs += "," + objCvwPricing.lstCVarvwPricing[i].ID.ToString();
                    objCPricingCharge.GetListPaging(1000, 1, "WHERE PricingID IN (" + pPricingIDs + ")", "ID", out _dummyRowCount);
                }
                #endregion Get PricingIDs to get PricingCharges

            }
            return new object[] {
                _MessageReturned
                , new JavaScriptSerializer().Serialize(objCvwPricing.lstCVarvwPricing) //pData[1]
                , new JavaScriptSerializer().Serialize(objCPricingCharge.lstCVarPricingCharge) //pData[2]
                , pBedayaPricingIDs
            };
        }

        [HttpGet, HttpPost]
        public object[] Pricing_Delete(string pPricingIDsDeleted
            , string pWhereClausePricing, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = true;
            Exception checkException = null;
            CPricing objCPricing = new CPricing();
            CvwPricing objCvwPricing = new CvwPricing();
            CPricingCharge objCPricingCharge = new CPricingCharge();
            CQuotationCharges objCQuotationCharges = new CQuotationCharges();

            int _RowCount = 0;
            string pPricingIDs = "";
            int _dummyRowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "", "ID", out _dummyRowCount);

            int NumberOfDeletedItems = pPricingIDsDeleted.Split(',').Length;
            for (int i = 0; i < NumberOfDeletedItems; i++)
            {
                objCQuotationCharges.GetListPaging(1, 1, "WHERE PricingID IN (" + pPricingIDsDeleted + ")", "ID", out _dummyRowCount);
                //i added 1==2 because log prevents deletion of pricing
                //if (objCQuotationCharges.lstCVarQuotationCharges.Count == 0) //Can delete
                if (objCQuotationCharges.lstCVarQuotationCharges.Count == 0) //Can delete
                {
                    checkException = objCPricingCharge.DeleteList("WHERE PricingID = " + pPricingIDsDeleted.Split(',')[i]);
                    checkException = objCPricing.DeleteList("WHERE ID = " + pPricingIDsDeleted.Split(',')[i]);
                }
                else
                {
                    _result = false;
                }
            }

            #region Get PricingIDs to be used in PricingCharges GetList as whereClause
            objCvwPricing.GetListPaging(pPageSize, pPageNumber, pWhereClausePricing, pOrderBy, out _RowCount);
            if (objCvwPricing.lstCVarvwPricing.Count > 0) //otherwise return the empty PricingCharge
            {
                pPricingIDs = objCvwPricing.lstCVarvwPricing[0].ID.ToString();
                for (int i = 1; i < objCvwPricing.lstCVarvwPricing.Count; i++)
                    pPricingIDs += "," + objCvwPricing.lstCVarvwPricing[i].ID.ToString();
                objCPricingCharge.GetListPaging(1000, 1, "WHERE PricingID IN (" + pPricingIDs + ")", "ID", out _dummyRowCount);
            }
            #endregion Get PricingIDs to get PricingCharges

            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwPricing.lstCVarvwPricing) //pData[1]
                , new JavaScriptSerializer().Serialize(objCPricingCharge.lstCVarPricingCharge) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] Pricing_GetQuotationModalData(string pGetQuotationModalData)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            string pWhereClauseExtension = "";
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClauseExtension += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            CCustomers objCShipper = new CCustomers();
            checkException = objCShipper.GetListPaging(10000, 1, "WHERE IsShipper=1" + pWhereClauseExtension, "Name", out _RowCount);
            CCustomers objCConsignee = new CCustomers();
            checkException = objCConsignee.GetListPaging(10000, 1, "WHERE IsConsignee=1" + pWhereClauseExtension, "Name", out _RowCount);
            CAgents objCAgent = new CAgents();
            checkException = objCAgent.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
            CUsers objCUser = new CUsers();
            checkException = objCUser.GetListPaging(10000, 1, "WHERE IsNull(CustomerID , 0) = 0 AND 1=1", "Name", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
                {
                    serializer.Serialize(objCShipper.lstCVarCustomers)
                    , serializer.Serialize(objCConsignee.lstCVarCustomers)
                    , serializer.Serialize(objCAgent.lstCVarAgents)
                    , serializer.Serialize(objCUser.lstCVarUsers)
                };
        }

        [HttpGet, HttpPost]
        public object[] Pricing_CreateQuotationFromPricing(string pCreateQuotationFromPricingIDs, string pQuotationCode, Int32 pBranchID, Int32 pSalesmanID
            , Int32 pDirectionType, string pDirectionIconName, string pDirectionIconStyle, Int32 pTransportType, string pTransportIconName, string pTransportIconStyle
            , Int32 pShipmentType, Int32 pShipperID, Int32 pConsigneeID, Int32 pAgentID, DateTime pOpenDate, bool pIsDangerousGoods, string pDescriptionOfGoods
            , Int32 pProfitType, decimal pProfitAmount, Int32 pSalesLeadID)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            var ArrPricingIDs = pCreateQuotationFromPricingIDs.Split(',');
            string pDefaultChargesIDs = "";
            CPricing objCPricing = new CPricing();
            CQuotations objCQuotations = new CQuotations();
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CVarQuotations objCVarQuotations = new CVarQuotations();
            CContacts objCContacts = new CContacts();
            CPricingCharge objCPricingCharge = new CPricingCharge();
            CvwPricingSettings objCvwPricingSettings = new CvwPricingSettings();
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
            //int constPricingOcean = 10;
            //int constPricingAir = 20;
            //int constPricingInland = 30;
            int constPricingCustomsClearance = 40;
            //int constPricingGeneral = 50;
            int MainCarraigeRoutingTypeID = 30;
            int constCustomsClearanceAgentOperationPartnerTypeID = 8;
            int NumberOfDefaultCharges = 0;
            Int64 pQRID = 0;
            bool pIsCreateNewQR = true;

            #region Insert Quotation
            objCVarQuotations.Code = pQuotationCode;
            objCVarQuotations.BranchID = pBranchID;
            objCVarQuotations.SalesmanID = pSalesmanID;
            objCVarQuotations.DirectionType = pDirectionType;
            objCVarQuotations.DirectionIconName = pDirectionIconName;
            objCVarQuotations.DirectionIconStyle = pDirectionIconStyle;
            objCVarQuotations.TransportType = pTransportType;
            objCVarQuotations.TransportIconName = pTransportIconName;
            objCVarQuotations.TransportIconStyle = pTransportIconStyle;
            objCVarQuotations.ShipmentType = pShipmentType;
            objCVarQuotations.ShipperID = pShipperID;
            objCContacts.GetList("WHERE PartnerTypeID=1 AND PartnerID=" + pShipperID);
            objCVarQuotations.ShipperContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0); //int.Parse(insertQuotationData.pShipperContactID);
            objCVarQuotations.ConsigneeID = pConsigneeID;
            objCContacts.GetList("WHERE PartnerTypeID=1 AND PartnerID=" + pConsigneeID);
            objCVarQuotations.ConsigneeContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0); //int.Parse(insertQuotationData.pConsigneeContactID);
            objCVarQuotations.AgentID = pAgentID;
            objCContacts.GetList("WHERE PartnerTypeID=2 AND PartnerID=" + pAgentID);
            objCVarQuotations.AgentContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0); //int.Parse(insertQuotationData.pAgentContactID);
            objCVarQuotations.OpenDate = pOpenDate;
            objCVarQuotations.ExpirationDate = DateTime.Parse("01-01-1900");
            objCVarQuotations.CloseDate = DateTime.Parse("01-01-1900");
            objCVarQuotations.IsDangerousGoods = pIsDangerousGoods;
            objCVarQuotations.DescriptionOfGoods = pDescriptionOfGoods;
            objCVarQuotations.QuotationStageID = 1;
            objCVarQuotations.DeliveryZipCode = "0";
            objCVarQuotations.Notes = "0";
            objCVarQuotations.Subject = "0";
            objCVarQuotations.TermsAndConditions = "0";
            objCVarQuotations.IsContract = false;
            objCVarQuotations.SalesLeadID = pSalesLeadID;
            objCCRM_ContactPersons.GetList("WHERE CRM_ClientsID=" + pSalesLeadID);
            objCVarQuotations.SalesLeadContactID = (objCCRM_ContactPersons.lstCVarCRM_ContactPersons.Count > 0 ? objCCRM_ContactPersons.lstCVarCRM_ContactPersons[0].ID : 0);

            objCVarQuotations.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarQuotations.CreatorUserID = objCVarQuotations.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarQuotations.CreationDate = objCVarQuotations.ModificationDate = DateTime.Now;
            objCVarQuotations.ExporterID = 0;
            objCVarQuotations.CRMCode = "0";
            objCVarQuotations.IsLoadingDischarging = false;
            objCVarQuotations.IsSurvey = false;
            objCVarQuotations.IsLashing = false;
            objCVarQuotations.IsPackingRemovals = false;

            objCQuotations.lstCVarQuotations.Add(objCVarQuotations);
            checkException = objCQuotations.SaveMethod(objCQuotations.lstCVarQuotations);

            #endregion Insert QuotationRoute
            if (checkException == null)
            {
                _result = true;
                objCQuotations.GetListPaging(1, 1, "WHERE ID=" + objCVarQuotations.ID.ToString(), "ID", out _RowCount);
                int pNumberOfQR = ArrPricingIDs.Length;
                objCPricing.GetListPaging(pNumberOfQR, 1, "WHERE ID IN(" + pCreateQuotationFromPricingIDs + ")", "ID", out _RowCount);
                for (int i = 0; i < pNumberOfQR; i++) //i.e. Number of Pricing records selected
                {
                    checkException = objCvwPricingSettings.GetList("WHERE PricingTypeID =" + objCPricing.lstCVarPricing[i].PricingTypeID);
                    NumberOfDefaultCharges = objCvwPricingSettings.lstCVarvwPricingSettings.Count;
                    #region Get pDefaultChargesIDs
                    if (NumberOfDefaultCharges > 0) //otherwise return the empty PricingSettingsCharge
                    {
                        pDefaultChargesIDs = objCvwPricingSettings.lstCVarvwPricingSettings[0].ChargeTypeID.ToString();
                        for (int z = 1; z < NumberOfDefaultCharges; z++)
                            pDefaultChargesIDs += "," + objCvwPricingSettings.lstCVarvwPricingSettings[z].ChargeTypeID.ToString();
                    }
                    #endregion Get pDefaultChargesIDs
                    //check if its possible to be in same QR
                    if (i > 0)
                    {
                        if (objCPricing.lstCVarPricing[i].ShippingLineID != objCPricing.lstCVarPricing[i - 1].ShippingLineID
                            || objCPricing.lstCVarPricing[i].AirlineID != objCPricing.lstCVarPricing[i - 1].AirlineID
                            || objCPricing.lstCVarPricing[i].TruckerID != objCPricing.lstCVarPricing[i - 1].TruckerID
                            || objCPricing.lstCVarPricing[i].CommodityID != objCPricing.lstCVarPricing[i - 1].CommodityID
                            || objCPricing.lstCVarPricing[i].TransitTime != objCPricing.lstCVarPricing[i - 1].TransitTime
                            || objCPricing.lstCVarPricing[i].Frequency != objCPricing.lstCVarPricing[i - 1].Frequency
                            || objCPricing.lstCVarPricing[i].POLID != objCPricing.lstCVarPricing[i - 1].POLID
                            || objCPricing.lstCVarPricing[i].PODID != objCPricing.lstCVarPricing[i - 1].PODID
                            )
                            pIsCreateNewQR = true;
                        else
                            pIsCreateNewQR = false;
                    }
                    if (pIsCreateNewQR) //check if its possible to be in same QR
                    {
                        CVarQuotationRoute objCVarQuotationRoute = new CVarQuotationRoute();
                        objCVarQuotationRoute.Code = "0";
                        objCVarQuotationRoute.QuotationID = objCQuotations.lstCVarQuotations[0].ID;
                        objCVarQuotationRoute.RoutingTypeID = MainCarraigeRoutingTypeID;
                        objCVarQuotationRoute.DirectionIconName = "0"; // pDirectionIconName;
                        objCVarQuotationRoute.DirectionIconStyle = "0"; //pDirectionIconStyle;
                        objCVarQuotationRoute.TransportType = pTransportType;
                        objCVarQuotationRoute.TransportIconName = pTransportIconName;
                        objCVarQuotationRoute.TransportIconStyle = pTransportIconStyle;
                        //objCVarQuotationRoute.ShipmentType = pShipmentType;
                        objCVarQuotationRoute.POLCountryID = objCPricing.lstCVarPricing[i].POLCountryID;
                        objCVarQuotationRoute.POL = objCPricing.lstCVarPricing[i].POLID;
                        objCVarQuotationRoute.PODCountryID = objCPricing.lstCVarPricing[i].PODCountryID;
                        objCVarQuotationRoute.POD = objCPricing.lstCVarPricing[i].PODID;
                        objCVarQuotationRoute.PickupAddress = "0";
                        objCVarQuotationRoute.DeliveryAddress = "0";
                        objCVarQuotationRoute.MoveTypeID = 0;
                        objCVarQuotationRoute.ExpirationDate = objCPricing.lstCVarPricing[i].ValidTo;
                        objCVarQuotationRoute.ETAPOLDate = (objCPricing.lstCVarPricing[i].ETA == null ? DateTime.Parse("01-01-1900") : objCPricing.lstCVarPricing[i].ETA);
                        objCVarQuotationRoute.ShippingLineID = objCPricing.lstCVarPricing[i].ShippingLineID;
                        objCVarQuotationRoute.AirlineID = objCPricing.lstCVarPricing[i].AirlineID;
                        objCVarQuotationRoute.TruckerID = objCPricing.lstCVarPricing[i].TruckerID;
                        objCVarQuotationRoute.TransientTime = objCPricing.lstCVarPricing[i].TransitTime;
                        objCVarQuotationRoute.Validity = 0;
                        objCVarQuotationRoute.FreeTime = objCPricing.lstCVarPricing[i].FreeTime;
                        objCVarQuotationRoute.GrossWeight = objCPricing.lstCVarPricing[i].GrossWeight;
                        objCVarQuotationRoute.FreeTimePOD = objCPricing.lstCVarPricing[i].FreeDaysPOD;
                        objCVarQuotationRoute.PickupAddress = objCPricing.lstCVarPricing[i].PickupAddress;
                        objCVarQuotationRoute.QuotationStageID = 1;
                        objCVarQuotationRoute.Notes = objCPricing.lstCVarPricing[i].Notes;
                        objCVarQuotationRoute.CommodityID = objCPricing.lstCVarPricing[i].CommodityID;
                        objCVarQuotationRoute.DenialReason = "0";
                        objCVarQuotationRoute.FreightRateFormat = "0";
                        objCVarQuotationRoute.ChargeEditApprovalLevel = 0;
                        objCVarQuotationRoute.ChargeEdit1stApprovalUserID = 0;
                        objCVarQuotationRoute.ChargeEdit2ndApprovalUserID = 0;
                        objCVarQuotationRoute.ChargeEdit3rdApprovalUserID = 0;
                        objCVarQuotationRoute.ChargeEdit4thApprovalUserID = 0;
                        objCVarQuotationRoute.CustomsAcceptedValue = 0;
                        objCVarQuotationRoute.ETD = objCPricing.lstCVarPricing[0].ETD;
                        objCVarQuotationRoute.StuffingCutOf = objCPricing.lstCVarPricing[0].StuffingCutOf;
                        objCVarQuotationRoute.CreatorUserID = objCVarQuotationRoute.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarQuotationRoute.CreationDate = objCVarQuotationRoute.ModificationDate = DateTime.Now;
                        objCQuotationRoute.lstCVarQuotationRoute.Add(objCVarQuotationRoute);
                        checkException = objCQuotationRoute.SaveMethod(objCQuotationRoute.lstCVarQuotationRoute);
                        pQRID = objCVarQuotationRoute.ID; //first QR will always reach here
                    }
                    if (checkException == null)
                    {
                        #region Add QuotationCharges
                        /********************************************/
                        objCPricingCharge.GetListPaging(NumberOfDefaultCharges, 1, "WHERE PricingID=" + objCPricing.lstCVarPricing[i].ID.ToString() + " AND ChargeTypeID IN(" + pDefaultChargesIDs + ")", "ID", out _RowCount);
                        for (int j = 0; j < objCPricingCharge.lstCVarPricingCharge.Count; j++)
                        {
                            //if (objCPricingCharge.lstCVarPricingCharge.Where(w => w.ChargeTypeID == objCvwPricingSettings.lstCVarvwPricingSettings[j].ChargeTypeID).Count() > 1)
                            //{
                            //    var rowPricingCharge = objCPricingCharge.lstCVarPricingCharge.Where(w => w.ChargeTypeID == objCvwPricingSettings.lstCVarvwPricingSettings[j].ChargeTypeID).ElementAt(0);
                            decimal decSalePrice = 0;
                            decimal decCostPrice = objCPricingCharge.lstCVarPricingCharge[j].CostPrice;
                            if (pProfitType != 30/*No Sale Price*/)
                                decSalePrice = pProfitType == 10
                                                        ? (decCostPrice * pProfitAmount / 100 + decCostPrice) //percentge
                                                        : (decCostPrice + pProfitAmount);
                            if (decCostPrice > 0 || decSalePrice > 0)
                            {
                                CVarQuotationCharges objCVarQuotationCharges = new CVarQuotationCharges();
                                objCVarQuotationCharges.QuotationRouteID = pQRID;
                                objCVarQuotationCharges.ChargeTypeID = objCPricingCharge.lstCVarPricingCharge[j].ChargeTypeID;
                                objCVarQuotationCharges.MeasurementID = 3; //fixed
                                objCVarQuotationCharges.ContainerTypeID = objCPricing.lstCVarPricing[i].EquipmentID;
                                objCVarQuotationCharges.PackageTypeID = objCPricing.lstCVarPricing[i].PackageTypeID;
                                objCVarQuotationCharges.DemurrageDays = 0;
                                objCVarQuotationCharges.PackageTypeID = 0;
                                objCVarQuotationCharges.CostQuantity = 1;
                                objCVarQuotationCharges.CostPrice = objCPricingCharge.lstCVarPricingCharge[j].CostPrice;
                                objCVarQuotationCharges.CostAmount = objCPricingCharge.lstCVarPricingCharge[j].CostPrice;
                                objCVarQuotationCharges.CostCurrencyID = objCPricing.lstCVarPricing[i].CurrencyID;
                                objCVarQuotationCharges.CostExchangeRate = objCPricing.lstCVarPricing[i].ExchangeRate;
                                objCVarQuotationCharges.SaleQuantity = 1;
                                objCVarQuotationCharges.SalePrice = decSalePrice;
                                objCVarQuotationCharges.SaleAmount = decSalePrice;
                                objCVarQuotationCharges.SaleCurrencyID = objCPricing.lstCVarPricing[i].CurrencyID;
                                objCVarQuotationCharges.SaleExchangeRate = objCPricing.lstCVarPricing[i].ExchangeRate;

                                objCVarQuotationCharges.POrC = 0;

                                objCVarQuotationCharges.OperationPartnerTypeID = objCPricing.lstCVarPricing[i].PricingTypeID == constPricingCustomsClearance
                                                                                 ? constCustomsClearanceAgentOperationPartnerTypeID
                                                                                 : 0;
                                objCVarQuotationCharges.CustomerID = 0;
                                objCVarQuotationCharges.AgentID = 0;
                                objCVarQuotationCharges.ShippingAgentID = 0;
                                objCVarQuotationCharges.CustomsClearanceAgentID = objCPricing.lstCVarPricing[i].CCAID;
                                objCVarQuotationCharges.ShippingLineID = 0;
                                objCVarQuotationCharges.AirlineID = 0;
                                objCVarQuotationCharges.TruckerID = 0;
                                objCVarQuotationCharges.SupplierID = 0;
                                objCVarQuotationCharges.PricingID = objCPricing.lstCVarPricing[i].ID;
                                objCVarQuotationCharges.Notes = "0";
                                objCVarQuotationCharges.HsCode = "0";
                                objCVarQuotationCharges.CustomDuties = 0;
                                objCVarQuotationCharges.WTH = 0;
                                objCVarQuotationCharges.BankFeeCharges = 0;
                                objCVarQuotationCharges.commission = 0;
                                objCVarQuotationCharges.SalesLineCrmCode = "";
                                objCVarQuotationCharges.CostLineCrmCode = "";
                                objCVarQuotationCharges.CreatorUserID = objCVarQuotationCharges.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarQuotationCharges.CreationDate = objCVarQuotationCharges.ModificationDate = DateTime.Now;

                                CQuotationCharges objCQuotationCharges = new CQuotationCharges();
                                objCQuotationCharges.lstCVarQuotationCharges.Add(objCVarQuotationCharges);
                                objCQuotationCharges.SaveMethod(objCQuotationCharges.lstCVarQuotationCharges);
                            } //if (decCostPrice > 0 || decSalePrice > 0)
                            //} //there is a row in PricingCharge for the current Charge
                        }
                        #endregion Add QuotationCharges
                    }

                } //of for (int i = 0; i < pNumberOfQR; i++)
            }
            return new object[] {
                _result
                , _result ? objCVarQuotations.ID : 0 //pInsertedQuotationID = pData[1]
                , _result ? objCQuotations.lstCVarQuotations[0].Code : null //pInsertedQuotationCode = pData[2]
            };
        }

        [HttpGet]
        public object GetPricingPrintData(string pWhereClause)
        {
            try
            {
                string query = $@"select * from vw_PricingReport {pWhereClause}";
                var objDb = new Models.Customized.CCustomizedDBCall();
                var dt = objDb.ExecuteQuery_DataTable(query);
                var data = new List<PricingPrintData>();
                foreach (DataRow item in dt.Rows)
                {
                    data.Add(new PricingPrintData
                    {
                        ID = Convert.ToInt32(item[nameof(PricingPrintData.ID)]),
                        PricingTypeID = Convert.ToInt32(item[nameof(PricingPrintData.PricingTypeID)]),
                        AgentID = Convert.ToInt32(item[nameof(PricingPrintData.AgentID)]),
                        AgentName = Convert.ToString(item[nameof(PricingPrintData.AgentName)]),
                        SupplierID = Convert.ToInt32(item[nameof(PricingPrintData.SupplierID)]),
                        SupplierName = Convert.ToString(item[nameof(PricingPrintData.SupplierName)]),
                        POLCountryID = Convert.ToInt32(item[nameof(PricingPrintData.POLCountryID)]),
                        POLCountryName = Convert.ToString(item[nameof(PricingPrintData.POLCountryName)]),
                        POLID = Convert.ToInt32(item[nameof(PricingPrintData.POLID)]),
                        POLName = Convert.ToString(item[nameof(PricingPrintData.POLName)]),
                        PODCountryID = Convert.ToInt32(item[nameof(PricingPrintData.PODCountryID)]),
                        PODCountryName = Convert.ToString(item[nameof(PricingPrintData.PODCountryName)]),
                        PODID = Convert.ToInt32(item[nameof(PricingPrintData.PODID)]),
                        PODName = Convert.ToString(item[nameof(PricingPrintData.PODName)]),
                        EquipmentID = Convert.ToInt32(item[nameof(PricingPrintData.EquipmentID)]),
                        EquipmentCode = Convert.ToString(item[nameof(PricingPrintData.EquipmentCode)]),
                        PackageTypeID = Convert.ToInt32(item[nameof(PricingPrintData.PackageTypeID)]),
                        PackageTypeName = Convert.ToString(item[nameof(PricingPrintData.PackageTypeName)]),
                        CommodityID = Convert.ToInt32(item[nameof(PricingPrintData.CommodityID)]),
                        CommodityName = Convert.ToString(item[nameof(PricingPrintData.CommodityName)]),
                        TransitTime = Convert.ToInt32(item[nameof(PricingPrintData.TransitTime)]),
                        Frequency = Convert.ToInt32(item[nameof(PricingPrintData.Frequency)]),
                        FreeTime = Convert.ToInt32(item[nameof(PricingPrintData.FreeTime)]),
                        ValidFrom = Convert.ToString(item[nameof(PricingPrintData.ValidFrom)]),
                        ValidTo = Convert.ToString(item[nameof(PricingPrintData.ValidTo)]),
                        CurrencyID = Convert.ToInt32(item[nameof(PricingPrintData.CurrencyID)]),
                        CurrencyCode = Convert.ToString(item[nameof(PricingPrintData.CurrencyCode)]),
                        ChargeTypeID = Convert.ToInt32(item[nameof(PricingPrintData.ChargeTypeID)]),
                        ChargeTypeCode = Convert.ToString(item[nameof(PricingPrintData.ChargeTypeCode)]),
                        CostPrice = Convert.ToString(item[nameof(PricingPrintData.CostPrice)]),
                        Notes = Convert.ToString(item[nameof(PricingPrintData.Notes)])
                    });
                }
                // var group = data.GroupBy(a => new { a.PricingTypeID, a.AgentID, a.AgentName, a.SupplierID, a.SupplierName, a.POLCountryID, a.POLCountryName, a.POLID, a.POLName, a.PODCountryID, a.PODCountryName, a.PODID, a.PODName, a.EquipmentID, a.EquipmentCode, a.PackageTypeID, a.PackageTypeName, a.CommodityID, a.CommodityName, a.TransitTime, a.Frequency, a.FreeTime, a.ValidFrom, a.ValidTo,a.Notes });
                var group = data.GroupBy(a => new { a.ID });
                var charges = (from charge in data orderby charge.ChargeTypeCode, charge.CurrencyCode select new { serial = 0, charge.ChargeTypeCode, charge.CurrencyCode }).Distinct();
                var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
                return new { success = true, data = serializer.Serialize(group), charges = serializer.Serialize(charges) };
            }
            catch (Exception ex)
            {
                return new { success = false, data = ex };
            }

        }
        #endregion Pricing

        #region PricingSettings

        [HttpGet, HttpPost]
        public Object[] PricingSettings_LoadAll(string pWhereClause)
        {
            CvwPricingSettings objCvwPricingSettings = new CvwPricingSettings();

            //int constPricingOcean = 10;
            //int constPricingAir = 20;
            //int constPricingInland = 30;
            //int constPricingCustomsClearance = 40;
            ////int constPricingGeneral = 50;

            Int32 _RowCount = 0;// objCvwCities.lstCVarCities.Count;
            Exception a = null;
            objCvwPricingSettings.GetListPaging(99999, 1, pWhereClause, "ChargeTypeName", out _RowCount);
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwPricingSettings.lstCVarvwPricingSettings)
                , _RowCount
              };
        }

        [HttpGet, HttpPost]
        public Object[] PricingSettings_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsReturnObjectArrayForPricingSettings, Int32 pPricingTypeID, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwPricingSettings objCvwPricingSettings = new CvwPricingSettings();
            CvwChargeTypesWithMinimalColumns objCvwChargeTypesWithMinimalColumns = new CvwChargeTypesWithMinimalColumns();

            //int constPricingOcean = 10;
            //int constPricingAir = 20;
            //int constPricingInland = 30;
            //int constPricingCustomsClearance = 40;
            ////int constPricingGeneral = 50;

            Int32 _RowCount = 0;// objCvwCities.lstCVarCities.Count;
            Exception a = null;
            if (pIsReturnObjectArrayForPricingSettings)
                a = objCvwChargeTypesWithMinimalColumns.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
            var b = a;
            objCvwPricingSettings.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwPricingSettings.lstCVarvwPricingSettings)
                , _RowCount
                , pIsReturnObjectArrayForPricingSettings ? new JavaScriptSerializer().Serialize(objCvwChargeTypesWithMinimalColumns.lstCVarvwChargeTypesWithMinimalColumns) : null
              };
        }

        [HttpGet, HttpPost]
        public object[] PricingSettings_Save(Int32 pID, Int32 pPricingTypeID, Int32 pChargeTypeID, string pWhereClausePricingSettings, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;

            CVarPricingSettings objCVarPricingSettings = new CVarPricingSettings();
            CvwPricingSettings objCvwPricingSettings = new CvwPricingSettings();
            objCVarPricingSettings.ID = pID;
            objCVarPricingSettings.PricingTypeID = pPricingTypeID;
            objCVarPricingSettings.ChargeTypeID = pChargeTypeID;
            CPricingSettings objCPricingSettings = new CPricingSettings();
            objCPricingSettings.lstCVarPricingSettings.Add(objCVarPricingSettings);
            Exception checkException = objCPricingSettings.SaveMethod(objCPricingSettings.lstCVarPricingSettings);
            if (checkException == null) // an exception is caught in the model
            {
                _result = true;
                objCvwPricingSettings.GetListPaging(pPageSize, pPageNumber, pWhereClausePricingSettings, pOrderBy, out _RowCount);
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwPricingSettings.lstCVarvwPricingSettings) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] PricingSettings_Delete(string pPricingSettingsIDsDeleted
            , string pWhereClausePricingSettings, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            CPricingSettings objCPricingSettings = new CPricingSettings();
            CvwPricingSettings objCvwPricingSettings = new CvwPricingSettings();
            int _RowCount = 0;

            checkException = objCPricingSettings.DeleteList("WHERE ID IN(" + pPricingSettingsIDsDeleted + ")");
            //foreach (var currentID in pPricingIDsDeleted.Split(','))
            //{
            //    objCPricing.lstDeletedCPKPricing.Add(new CPKPricing() { ID = Int32.Parse(currentID.Trim()) });
            //}

            //checkException = objCPricing.DeleteItem(objCPricing.lstDeletedCPKPricing);
            if (checkException == null)
            {
                _result = true;
            }
            objCvwPricingSettings.GetListPaging(pPageSize, pPageNumber, pWhereClausePricingSettings, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwPricingSettings.lstCVarvwPricingSettings)
            };
        }

        #endregion PricingSettings

        #region PricingLog
        [HttpGet, HttpPost]
        public object[] PricingLog_LoadAll(string pWhereClausePricingLog)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CvwPricingLog objCvwPricingLog = new CvwPricingLog();
            checkException = objCvwPricingLog.GetListPaging(999999, 1, pWhereClausePricingLog, "ID DESC", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwPricingLog.lstCVarvwPricingLog)
            };
        }
        #endregion PricingLog
    }

    public class Pricing_SaveListData
    {
        public string pSelectedIDsToSave { get; set; }
        public string pIsInsertList { get; set; }
        public string pPricingTypeIDList { get; set; }
        public string pCustomerIDList { get; set; }
        public string pCustomerReferenceList { get; set; }
        public string pAgentIDList { get; set; }
        public string pShippingLineIDList { get; set; }
        public string pAirlineIDList { get; set; }
        public string pTruckerIDList { get; set; }
        public string pCCAIDList { get; set; }
        public string pPOLCountryIDList { get; set; }
        public string pPOLIDList { get; set; }
        public string pPODCountryIDList { get; set; }
        public string pPODIDList { get; set; }
        public string pEquipmentIDList { get; set; }
        public string pPackageTypeIDList { get; set; }
        public string pCommodityIDList { get; set; }
        public string pTransitTimeList { get; set; }
        public string pFrequencyList { get; set; }
        public string pFreeTimeList { get; set; }
        public string pFrequencyNotesList { get; set; }
        public string pValidFromList { get; set; }
        public string pValidToList { get; set; }
        public string pCurrencyIDList { get; set; }
        public string pExchangeRateList { get; set; }
        //charges prices
        public string pPricingChargeIDList { get; set; }
        public string pCostPriceList { get; set; }

        public string pNotesList { get; set; }
        public bool pIsPricingRequest { get; set; }
        //LoadWithPaging parameters
        public string pWhereClausePricing { get; set; }
        public Int32 pPageSize { get; set; }
        public Int32 pPageNumber { get; set; }
        public string pOrderBy { get; set; }
        public string pGrossWeightList { get; set; }
        public string pFreeDaysPODList { get; set; }
        public string pPickupAddressList { get; set; }
        public string pETAList { get; set; }
        public string pETDList { get; set; }
        public string pStuffingCutOfList { get; set; }

    }
}
