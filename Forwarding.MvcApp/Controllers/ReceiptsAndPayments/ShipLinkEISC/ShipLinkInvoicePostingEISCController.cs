using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Customized;

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

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.ShipLinkEISC
{
    public class ShipLinkInvoicePostingEISCController : ApiController
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
            CvwSL_InvoiceHeader_SelectNotPosted objCvwSL_InvoiceHeader_SelectNotPosted = new CvwSL_InvoiceHeader_SelectNotPosted();
            objCvwSL_InvoiceHeader_SelectNotPosted.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted)
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
        public object[] Post(string pPostedSelectedIDs, DateTime pJVDate, bool pIsJV1AndJV2
            , bool pIsSaveRevenueItems
            //RevenueItems parameters
            , string pShiplinkItemIDList, string pRevenueAccountIDList, string pCostCenterIDList
            , string pIsFreightItemList, string pImportExportList, string pVoyageSubAccountIDList, Int32 pVoyageAccountID)
        {
            Exception checkException = null;
            string strMessage = "";
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            //DateTime date = Convert.ToDateTime(pJVDate);
            // checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + date.ToString("MM/dd/yyyy") + "' BETWEEN From_Date AND To_Date");
            checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + pJVDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date ");

            //  checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + DateTime.ParseExact(pJVDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture).ToString() + "' BETWEEN From_Date AND To_Date and Closed=1");

            if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count == 0)
                strMessage = "This fiscal year is not exist.";
            else if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0 && objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period[0].Closed)
                strMessage = "This fiscal year is closed.";
            else
            {
                #region Saving RevenueItems
                if (pIsSaveRevenueItems && pShiplinkItemIDList != null)
                {
                    CSL_ShippingItemsLinking objCSL_ShippingItemsLinking = new CSL_ShippingItemsLinking();
                    var arrShiplinkItemID = pShiplinkItemIDList.Split(',');
                    var arrRevenueAccountID = pRevenueAccountIDList.Split(',');
                    var arrCostCenterID = pCostCenterIDList.Split(',');
                    var arrIsFreightItem = pIsFreightItemList.Split(',');
                    var arrImportExport = pImportExportList.Split(',');
                    var arrVoyageSubAccountID = pVoyageSubAccountIDList.Split(',');
                    int NumberOfRows = arrShiplinkItemID.Length;
                    for (int i = 0; i < NumberOfRows && pShiplinkItemIDList != ""; i++)
                    {
                        checkException = objCSL_ShippingItemsLinking.DeleteList(
                            "WHERE ImportExport='" + arrImportExport[i] + "' "
                            + " AND ShiplinkItemID=" + arrShiplinkItemID[i]
                            + " AND IsFreightItem=" + arrIsFreightItem[i]);
                        CVarSL_ShippingItemsLinking objCVarSL_ShippingItemsLinking = new CVarSL_ShippingItemsLinking();
                        objCVarSL_ShippingItemsLinking.ShiplinkItemID = Int32.Parse(arrShiplinkItemID[i]);
                        objCVarSL_ShippingItemsLinking.RevenueAccountID = Int32.Parse(arrRevenueAccountID[i]);
                        objCVarSL_ShippingItemsLinking.CostCenterID = Int32.Parse(arrCostCenterID[i]);
                        objCVarSL_ShippingItemsLinking.IsFreightItem = (arrIsFreightItem[i] == "1" ? true : false);
                        objCVarSL_ShippingItemsLinking.ImportExport = arrImportExport[i];
                        objCVarSL_ShippingItemsLinking.VoyageAccountID = pVoyageAccountID;
                        objCVarSL_ShippingItemsLinking.VoyageSubAccountID = Int32.Parse(arrVoyageSubAccountID[i]);
                        objCSL_ShippingItemsLinking.lstCVarSL_ShippingItemsLinking.Add(objCVarSL_ShippingItemsLinking);
                        checkException = objCSL_ShippingItemsLinking.SaveMethod(objCSL_ShippingItemsLinking.lstCVarSL_ShippingItemsLinking);
                        if (checkException != null)
                            strMessage = checkException.Message;
                    }
                }
                #endregion Saving RevenueItems
                if (strMessage == "")
                {
                    CSL_InvoiceJVs objCSL_InvoiceJVs = new CSL_InvoiceJVs();
                    CvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs = new CvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs();
                    CvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs dtClientsTotals = new CvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs();
                    CvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs dtInvoices = new CvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs();
                    CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
                    CA_JV objCA_JV = new CA_JV();
                    CA_JVDetails objCA_JVDetails = new CA_JVDetails();
                    CA_JVDetails objCA_JVDetails_Grouped = new CA_JVDetails();
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
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
                    checkException = objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.GetList("," + pPostedSelectedIDs + ",");
                    string BranchID = objCCustomizedDBCall.CallStringFunction("SELECT u.BranchID as BranshID FROM  Users AS u WHERE u.ID= " + WebSecurity.CurrentUserId );

                    #region Validate Linking
                    if (objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Count > 0)
                        for (int j = 0; j < objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Count; j++)
                        {
                            strMessage += (j + 1).ToString() + " - "
                                + objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs[j].ItemTypeEn
                                + ": "
                                + objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs[j].ItemName
                                + "\n"
                                + objCvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs[j].LineName
                                                          ;
                        }
                    #endregion Validate Linking
                    #region valid so post
                    if (strMessage == "" && UnEditableCompanyName == "ONE" || strMessage == "" && UnEditableCompanyName == "KDS" || strMessage == "" && UnEditableCompanyName == "EGL") //For OneEgypt
                        strMessage = Post_OneEgypt(pPostedSelectedIDs, pJVDate, pIsJV1AndJV2);
                    else if (strMessage == "" && UnEditableCompanyName != "ONE")
                    {
                        CSL_InvoiceJVs objCSL_InvoiceJVsCheck = new CSL_InvoiceJVs();// pPostedSelectedIDs
                        objCSL_InvoiceJVsCheck.GetList("Where Forwarding_InvoiceID in ( " + pPostedSelectedIDs + ")");
                        if (objCSL_InvoiceJVsCheck.lstCVarSL_InvoiceJVs.Count > 0 && objCSL_InvoiceJVsCheck.lstCVarSL_InvoiceJVs.Count != pPostedSelectedIDs.Split(',').Length)
                            strMessage = "Please Choose Not Posted Invices Only ";
                        else
                        {
                            if (objCSL_InvoiceJVsCheck.lstCVarSL_InvoiceJVs.Count == 0 )
                            {
                                #region InvoiceData
                                int JournalTypeID = 0;
                                int JVTypeID = 0;
                                if (objCJVDefaults.lstCVarJVDefaults.Count > 0)
                                {
                                    JournalTypeID = objCJVDefaults.lstCVarJVDefaults[0].JournalTypeID;
                                    JVTypeID = objCJVDefaults.lstCVarJVDefaults[0].JVTypeID;
                                }
                                DateTime IssueDate = pJVDate; //DateTime.ParseExact(pJVDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                                #endregion InvoiceData
                                #region JV1
                                decimal PortRatio = 0;
                                checkException = dtInvoices.GetList("WHERE IsAudited=1 AND ID IN(" + pPostedSelectedIDs + ")"); //i am sure the return has no JV1
                                for (int i = 0; i < dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Count; i++)
                                {
                                    CA_CostCenters objCA_CostCenters = new CA_CostCenters();
                                    objCA_CostCenters.GetList("WHERE CostCenterName=" + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[i].JobNo);
                                    if (objCA_CostCenters.lstCVarA_CostCenters.Count > 0)
                                        dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[i].CostCenterID = objCA_CostCenters.lstCVarA_CostCenters[0].ID;
                                }

                                if (dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Count > 0)
                                {
                                    #region Debit Side ==> Client
                                    for (int k = 0; k < ArrSelectedIDs.Length; k++)
                                    {
                                        dtClientsTotals.GetList("," + ArrSelectedIDs[k] + ",");
                                        var pDesc = dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Where(x => x.ID == Convert.ToInt64(ArrSelectedIDs[k])).ToList();
                                        for (int j = 0; j < dtClientsTotals.lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs.Count && strMessage == ""; j++) //Each Row is a different Currency
                                        {
                                            CurrencyID = dtClientsTotals.lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs[j].ERP_CurrencyID;
                                            objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");




                                            if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                                            {
                                                ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;
                                                CVarA_JVDetails objCVarA_JVDetails = new CVarA_JVDetails();
                                                objCVarA_JVDetails.Account_ID = dtClientsTotals.lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs[j].ERP_AccountID;
                                                objCVarA_JVDetails.SubAccount_ID = dtClientsTotals.lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs[j].ERP_SubAccountID;
                                                objCVarA_JVDetails.CostCenter_ID = 0;
                                                objCVarA_JVDetails.Debit = dtClientsTotals.lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs[j].TotalAmount;
                                                objCVarA_JVDetails.Credit = 0;
                                                objCVarA_JVDetails.Currency_ID = CurrencyID;
                                                objCVarA_JVDetails.ExchangeRate = ExchangeRate;
                                                objCVarA_JVDetails.LocalDebit = objCVarA_JVDetails.Debit * ExchangeRate;
                                                objCVarA_JVDetails.LocalCredit = 0;
                                                objCVarA_JVDetails.Description = pDesc[0].InvoiceSerial + " - " + pDesc[0].BillNumber + " - " + pDesc[0].VesselName;//"يومية مبيعات" + " - " + IssueDate.ToString("yyyy/MM/dd");

                                                objCVarA_JVDetails.Operation_ID = 0;
                                                objCVarA_JVDetails.Branch_ID = Convert.ToInt32(BranchID);
                                                objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails);
                                            }
                                            else
                                            {
                                                CvwCurrencies objCCurrency = new CvwCurrencies();
                                                objCCurrency.GetList("WHERE ID=" + CurrencyID);
                                                strMessage = objCCurrency.lstCVarvwCurrencies[0].Code + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                                            }
                                        }
                                    }

                                    #endregion Debit Side ==> Client
                                    #region Credit Side ==> Invoice Items
                                    if (strMessage == "")
                                        for (int j = 0; j < dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Count && strMessage == ""; j++)
                                        {
                                            CvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID dtInvoicesDetails = new CvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID();
                                            checkException = dtInvoicesDetails.GetList("," + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].ID + ",");
                                            CvwSL_InvoiceTotal dtInvoiceTotals = new CvwSL_InvoiceTotal();
                                            dtInvoiceTotals.GetList("WHERE InvoiceHeaderID=" + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].ID);

                                            //CSL_LinkingInvoiceTypeJournal objCSL_LinkingInvoiceTypeJournal = new CSL_LinkingInvoiceTypeJournal();
                                            //int ERP_AccountID = 0;
                                            //int ERP_SubAccountID = 0;
                                            //objCSL_LinkingInvoiceTypeJournal.GetList("WHERE InvoiceTypeID=" + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[0].InvoiceTypeID);
                                            //if (objCSL_LinkingInvoiceTypeJournal.lstCVarSL_LinkingInvoiceTypeJournal.Count > 0)
                                            //{
                                            //    ERP_AccountID = objCSL_LinkingInvoiceTypeJournal.lstCVarSL_LinkingInvoiceTypeJournal[0].AccountID;
                                            //    ERP_SubAccountID = objCSL_LinkingInvoiceTypeJournal.lstCVarSL_LinkingInvoiceTypeJournal[0].SubAccountID;
                                            //}

                                            if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.Count > 0)
                                                for (int k = 0; k < dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.Count; k++)
                                                {
                                                    CurrencyID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].CurrencyID;
                                                    objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");
                                                    PortRatio = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].PortRatio;
                                                    if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                                                    {
                                                        ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;
                                                        //if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].Remarks != "")
                                                        //{
                                                        //    if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount_20 > 0)
                                                        //    {
                                                        //        CVarA_JVDetails objCVarA_JVDetails = new CVarA_JVDetails();
                                                        //        objCVarA_JVDetails.Account_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].RevenueAccountID;
                                                        //        objCVarA_JVDetails.SubAccount_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].RevenueSubAccountID20;
                                                        //        objCVarA_JVDetails.CostCenter_ID = dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].CostCenterID;
                                                        //        objCVarA_JVDetails.Debit = 0;
                                                        //        objCVarA_JVDetails.Credit = (PortRatio == 0 ? dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount_20 : dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount_20 * PortRatio);
                                                        //        objCVarA_JVDetails.Currency_ID = CurrencyID;
                                                        //        objCVarA_JVDetails.ExchangeRate = ExchangeRate;
                                                        //        objCVarA_JVDetails.LocalDebit = objCVarA_JVDetails.Debit * ExchangeRate;
                                                        //        objCVarA_JVDetails.LocalCredit = objCVarA_JVDetails.Credit * ExchangeRate;
                                                        //        objCVarA_JVDetails.Description = dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].InvoiceSerial + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].BillNumber + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].VesselName
                                                        //                + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].ClientName;
                                                        //        objCVarA_JVDetails.Operation_ID = 0;
                                                        //        objCVarA_JVDetails.Branch_ID = Convert.ToInt32(BranchID);
                                                        //        objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails);
                                                        //    } //of if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount_20 > 0)
                                                        //    if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount_40 > 0)
                                                        //    {
                                                        //        CVarA_JVDetails objCVarA_JVDetails = new CVarA_JVDetails();
                                                        //        objCVarA_JVDetails.Account_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].RevenueAccountID;
                                                        //        objCVarA_JVDetails.SubAccount_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].RevenueSubAccountID40;
                                                        //        objCVarA_JVDetails.CostCenter_ID = dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].CostCenterID;
                                                        //        objCVarA_JVDetails.Debit = 0;
                                                        //        objCVarA_JVDetails.Credit = (PortRatio == 0 ? dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount_40 : dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount_40 * PortRatio);
                                                        //        objCVarA_JVDetails.Currency_ID = CurrencyID;
                                                        //        objCVarA_JVDetails.ExchangeRate = ExchangeRate;
                                                        //        objCVarA_JVDetails.LocalDebit = objCVarA_JVDetails.Debit * ExchangeRate;
                                                        //        objCVarA_JVDetails.LocalCredit = objCVarA_JVDetails.Credit * ExchangeRate;
                                                        //        objCVarA_JVDetails.Description = dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].InvoiceSerial + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].BillNumber + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].VesselName
                                                        //                                    + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].ClientName;
                                                        //        objCVarA_JVDetails.Operation_ID = 0;
                                                        //        objCVarA_JVDetails.Branch_ID = Convert.ToInt32(BranchID);
                                                        //        objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails);
                                                        //    } //of if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount_20 > 0)
                                                        //} //of if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].Remarks != "")
                                                        //else 
                                                        if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount != 0)
                                                        {
                                                            CVarA_JVDetails objCVarA_JVDetails = new CVarA_JVDetails();
                                                            objCVarA_JVDetails.Account_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].RevenueAccountID;
                                                            if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].RevenueSubAccountID20 > 0)
                                                                objCVarA_JVDetails.SubAccount_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].RevenueSubAccountID20;
                                                            if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].VoyageSubAccountID > 0)
                                                                objCVarA_JVDetails.SubAccount_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].VoyageSubAccountID;

                                                            objCVarA_JVDetails.CostCenter_ID = dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].CostCenterID;
                                                            objCVarA_JVDetails.Debit = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount < 0 ? -dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount : 0;
                                                            objCVarA_JVDetails.Credit = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount > 0 ? dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount : 0;
                                                            objCVarA_JVDetails.Currency_ID = CurrencyID;
                                                            objCVarA_JVDetails.ExchangeRate = ExchangeRate;
                                                            objCVarA_JVDetails.LocalDebit = objCVarA_JVDetails.Debit * ExchangeRate;
                                                            objCVarA_JVDetails.LocalCredit = objCVarA_JVDetails.Credit * ExchangeRate;
                                                            objCVarA_JVDetails.Description = dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].InvoiceSerial + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].BillNumber + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].VesselName
                                                                                                  + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].ClientName;
                                                            objCVarA_JVDetails.Operation_ID = 0;
                                                            objCVarA_JVDetails.Branch_ID = Convert.ToInt32(BranchID);
                                                            objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails);
                                                        } //of else if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].ItemAmount != 0)
                                                    }
                                                    else
                                                        strMessage = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].CurrencyCode + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                                                }
                                        }
                                    #endregion Credit Side ==> Invoice ITems
                                    decimal TotalLocalDebit = objCA_JVDetails.lstCVarA_JVDetails.Sum(s => s.LocalDebit);
                                    decimal TotalLocalCredit = objCA_JVDetails.lstCVarA_JVDetails.Sum(s => s.LocalCredit);
                                    if (TotalLocalDebit == TotalLocalCredit && strMessage == "")
                                    {
                                        #region Group The Same Accounts Together
                                        var objCA_JVDetails_Temp = objCA_JVDetails.lstCVarA_JVDetails
                                    .GroupBy(g => new { g.Currency_ID, g.ExchangeRate, g.Account_ID, g.SubAccount_ID, g.CostCenter_ID, g.Description })
                                    .Select(s => new
                                    {
                                //JV_ID = objCVarA_JV.ID,
                                Account_ID = s.First().Account_ID
                            ,
                                        SubAccount_ID = s.First().SubAccount_ID
                            ,
                                        CostCenter_ID = 0
                            ,
                                        Debit = s.Sum(x => x.Debit)
                            ,
                                        Credit = s.Sum(x => x.Credit)
                            ,
                                        Currency_ID = s.First().Currency_ID
                            ,
                                        ExchangeRate = s.First().ExchangeRate
                            ,
                                        LocalDebit = s.Sum(x => x.LocalDebit)
                            ,
                                        LocalCredit = s.Sum(x => x.LocalCredit)
                            ,
                                        Description = s.First().Description
                                    });
                                        //Copy to an object from Class CA_JVDetails, so i can use the SaveMethod() generated
                                        for (int l = 0; l < objCA_JVDetails_Temp.Count(); l++)
                                        {
                                            CVarA_JVDetails objCVarA_JVDetails_Grouped = new CVarA_JVDetails();
                                            //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                                            objCVarA_JVDetails_Grouped.Account_ID = objCA_JVDetails_Temp.ElementAt(l).Account_ID;
                                            objCVarA_JVDetails_Grouped.SubAccount_ID = objCA_JVDetails_Temp.ElementAt(l).SubAccount_ID;
                                            objCVarA_JVDetails_Grouped.CostCenter_ID = 0;
                                            objCVarA_JVDetails_Grouped.Debit = objCA_JVDetails_Temp.ElementAt(l).Debit;
                                            objCVarA_JVDetails_Grouped.Credit = objCA_JVDetails_Temp.ElementAt(l).Credit;
                                            objCVarA_JVDetails_Grouped.Currency_ID = objCA_JVDetails_Temp.ElementAt(l).Currency_ID;
                                            objCVarA_JVDetails_Grouped.ExchangeRate = objCA_JVDetails_Temp.ElementAt(l).ExchangeRate;
                                            objCVarA_JVDetails_Grouped.LocalDebit = objCA_JVDetails_Temp.ElementAt(l).LocalDebit;
                                            objCVarA_JVDetails_Grouped.LocalCredit = objCA_JVDetails_Temp.ElementAt(l).LocalCredit;
                                            objCVarA_JVDetails_Grouped.Description = objCA_JVDetails_Temp.ElementAt(l).Description;
                                            objCVarA_JVDetails_Grouped.Operation_ID = 0;
                                            objCVarA_JVDetails_Grouped.Branch_ID = Convert.ToInt32(BranchID);

                                            objCA_JVDetails_Grouped.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Grouped);
                                        }
                                        #endregion Group The Same Accounts Together
                                        #region Actual Generation for JV1, JVDetails & SL_InvoiceJVs
                                        if (JournalTypeID != 0 && JVTypeID != 0)
                                        {
                                            string pNewJVCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", IssueDate, WebSecurity.CurrentUserId, JournalTypeID);
                                            //pNewJVCode = pNewJVCode.Replace("//", "*");
                                            //pNewJVCode = InvoiceSerial + "//" + pNewJVCode.Split('*')[1];
                                            CVarA_JV objCVarA_JV = new CVarA_JV();
                                            objCVarA_JV.JVNo = pNewJVCode;
                                            objCVarA_JV.JVDate = IssueDate;
                                            objCVarA_JV.TotalDebit = TotalLocalDebit;
                                            objCVarA_JV.TotalCredit = TotalLocalCredit;
                                            objCVarA_JV.Journal_ID = JournalTypeID;
                                            objCVarA_JV.JVType_ID = JVTypeID;
                                            objCVarA_JV.ReceiptNo = "";
                                            objCVarA_JV.RemarksHeader = "يومية مبيعات استحقاق" + " - " + IssueDate.ToString("yyyy/MM/dd");
                                            objCVarA_JV.Deleted = false;
                                            objCVarA_JV.Posted = false; // false in desktop
                                            objCVarA_JV.IsSysJv = true;
                                            objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                                            objCVarA_JV.TransType_ID = 0; //null
                                            objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                                            checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                                            if (checkException == null)
                                            {
                                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                                                for (int j = 0; j < objCA_JVDetails_Grouped.lstCVarA_JVDetails.Count; j++)
                                                    objCA_JVDetails_Grouped.lstCVarA_JVDetails[j].JV_ID = objCVarA_JV.ID;
                                                checkException = objCA_JVDetails.SaveMethod(objCA_JVDetails_Grouped.lstCVarA_JVDetails);
                                                #region Adding to SL_InvoiceJVs
                                                for (int l = 0; l < dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Count; l++)
                                                {
                                                    CVarSL_InvoiceJVs objCVarSL_InvoiceJVs = new CVarSL_InvoiceJVs();
                                                    objCVarSL_InvoiceJVs.Forwarding_InvoiceID = dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[l].ID;
                                                    objCVarSL_InvoiceJVs.JVID1 = objCVarA_JV.ID;
                                                    objCVarSL_InvoiceJVs.JVID2 = 0;
                                                    objCVarSL_InvoiceJVs.VoucherID = 0;
                                                    objCVarSL_InvoiceJVs.VoucherType = 0;
                                                    objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs.Add(objCVarSL_InvoiceJVs);
                                                    checkException = objCSL_InvoiceJVs.SaveMethod(objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs);
                                                    if (checkException == null)
                                                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "ShippingLink_InvoicesJvs", objCVarSL_InvoiceJVs.ID, "I");
                                                    else
                                                        strMessage = "An error occured while inserting in SL_InvoiceJVs";
                                                }
                                                #endregion Adding to SL_InvoiceJVs
                                            }
                                            else
                                                strMessage = "An error occured during saving JV1.";
                                        }
                                        else
                                            strMessage = "Please, specify Journal Type and JV Type in the JVDefaults table at row with ID=27";
                                        #endregion Actual Generation for JV1, JVDetails & SL_InvoiceJVs
                                    }
                                    else if (strMessage == "") //coz if its not empty from a prev. place(like CurencyDetails) then i return the first message
                                        strMessage = "Total debit is not equal to the total credit.";
                                } //of if (dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Count > 0)
                                #endregion JV1
                            }

                            #region JV2 //قيود السداد
                            if (pIsJV1AndJV2 && strMessage == "")
                            strMessage = Insert_JV2_OneEgypt(pPostedSelectedIDs, pJVDate);   // DateTime.ParseExact(pJVDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture));
                            #endregion JV2 //قيود السداد
                        }
                    } //of else if (strMessage == "" && UnEditableCompanyName != "ONE")
                    #endregion valid so post
                }
            }
            return new object[] {
                strMessage
            };
        }

        private string Insert_JV2(string pInvoiceIDs, DateTime IssueDate)
        {
            string strMessage = "";
            //int constVoucherCashIn = 10;
            //int constVoucherCashOut = 20;
            int constVoucherChequeIn = 30;
            //int constVoucherChequeOut = 40;
            CA_VoucherDetails objCA_VoucherDetails = new CA_VoucherDetails();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CA_JVDetails objCA_JVDetails_Deposit = new CA_JVDetails();
            CA_JVDetails objCA_JVDetails_Cash = new CA_JVDetails();
            CA_JVDetails objCA_JVDetails_Transfer = new CA_JVDetails();
            int JournalTypeID = 0;
            int JVTypeID = 0;
            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            Exception checkException = null;
            //CSL_LinkingInvoiceTypeJournal objCSL_LinkingInvoiceTypeJournal = new CSL_LinkingInvoiceTypeJournal();
            CvwSL_GetPaidInvoice_ByCheque dt_Invoices = new CvwSL_GetPaidInvoice_ByCheque();
            checkException = dt_Invoices.GetList("WHERE ID IN (" + pInvoiceIDs + ") AND IsAudited=1");
            if (dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count > 0)
            {
                CJVDefaults objCJVDefaults = new CJVDefaults();
                checkException = objCJVDefaults.GetList("WHERE TransTypeID IN (27)");
                #region Prepare JV2 data and saving ChequeVoucher if any
                for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count && strMessage == ""; m++)
                {
                    Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated.CvwSL_PaymentHeader dtPaymentHeader = new Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated.CvwSL_PaymentHeader();
                    checkException = dtPaymentHeader.GetList("WHERE InvoiceHeaderID=" + dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID);
                    CvwSL_ChequePaymentDetails_SelectByInvoiceID dtPaymentDetails = new CvwSL_ChequePaymentDetails_SelectByInvoiceID();
                    checkException = dtPaymentDetails.GetList("WHERE InvoiceHeaderID=" + dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID);
                    #region Invoice Data
                    //string ContainerDescription = dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].Cont_Desc;
                    string ClientName = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID[0].ClientName.ToString().Replace("'", "");
                    //string InvoiceSerial = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID[0].invoiceserial.ToString();
                    //string BillNumber = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID[0].BillNumber;
                    //JournalTypeID = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID[0].Journal_ID;
                    //JVTypeID = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID[0].JVType_ID;
                    //int InvoiceTypeID = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID[0].InvoiceTypeID;
                    //int ERP_AccountID = 0;
                    //int ERP_SubAccountID = 0;
                    int BankID = 0;

                    if (JournalTypeID == 0 && objCJVDefaults.lstCVarJVDefaults.Count > 0)
                        JournalTypeID = objCJVDefaults.lstCVarJVDefaults[0].JournalTypeID;
                    if (JVTypeID == 0 && objCJVDefaults.lstCVarJVDefaults.Count > 0)
                        JVTypeID = objCJVDefaults.lstCVarJVDefaults[0].JVTypeID;
                    if (JVTypeID == 0 || JournalTypeID == 0)
                        strMessage = "Please, specify Journal Type and JV Type in the JVDefaults table at row with ID=27";
                    #endregion Invoice Data
                    #region Adding Voucher & Updating SL_InvoiceJVs with VoucherID & VoucherType
                    var dtChequeOnlyPayment = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID.Where(s => s.PaymentTypeID == 2); //Cheque PaymentType
                    var distinct_Cheque_No = dtChequeOnlyPayment
                        .GroupBy(d => d.Remarks)
                        .Select(g => new
                        {
                            ChequeNumber = g.First().Remarks
                        });
                    for (int n = 0; n < distinct_Cheque_No.Count() && strMessage == ""; n++)
                    {
                        int CurrencyID = 0; //this depends on the i am sure that there is no payment without details and that the details currency is uniqe among payment
                        decimal ExchangeRate = 1; //this depends that i am sure that there is no payment without details and that the details currency is unique among payment
                        string ChequeNumber = distinct_Cheque_No.ElementAt(n).ChequeNumber;
                        #region Fill Cheque VoucherDetails (i.e. Cheque PaymentDetails)
                        for (int o = 0; o < dtChequeOnlyPayment.Count() && strMessage == ""; o++)
                        {
                            if (dtChequeOnlyPayment.ElementAt(o).Remarks == ChequeNumber && ChequeNumber != "0") //To filter details to get only the details for that voucher header(i.e. PaymentHeader)(i.e. Each Cheque number details is in one Voucher)
                            {
                                BankID = dtChequeOnlyPayment.ElementAt(o).Bank_ID;
                                //checkException = objCSL_LinkingInvoiceTypeJournal.GetList("WHERE InvoiceTypeID=" + dtChequeOnlyPayment.ElementAt(o).InvoiceTypeID);
                                //if (objCSL_LinkingInvoiceTypeJournal.lstCVarSL_LinkingInvoiceTypeJournal.Count > 0)
                                //{
                                CurrencyID = dtChequeOnlyPayment.ElementAt(o).CurrencyID;
                                objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");
                                if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                                {
                                    ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;
                                    //ERP_AccountID = objCSL_LinkingInvoiceTypeJournal.lstCVarSL_LinkingInvoiceTypeJournal[0].AccountID;
                                    //ERP_SubAccountID = Convert.ToString(dt_MOL_DailyClientAccounts.Select("CurrencyID=" + Currency_ID.ToString())[0]["SubAccountID"]);

                                    //CVarA_VoucherDetails objCVarA_VoucherDetails = new CVarA_VoucherDetails();
                                    ////objCVarA_VoucherDetails.VoucherID = pID;
                                    //objCVarA_VoucherDetails.Value = dtChequeOnlyPayment.ElementAt(o).Amount;
                                    //objCVarA_VoucherDetails.Description = dtChequeOnlyPayment.ElementAt(o).invoiceserial + " - " + dtChequeOnlyPayment.ElementAt(o).ReceiptNumber + " - " + dtChequeOnlyPayment.ElementAt(o).IssueDate.ToString("dd/MM/yyyy");
                                    //if (dtChequeOnlyPayment.ElementAt(o).ReferenceNumber.Trim().ToUpper() == "1")
                                    //{
                                        //BankID = dtChequeOnlyPayment.ElementAt(o).Bank_ID;
                                        //ClientName = dtChequeOnlyPayment.ElementAt(o).ClientName;
                                        //objCVarA_VoucherDetails.AccountID = dtChequeOnlyPayment.ElementAt(o).ERP_Client_AccountID == 0 ? dtChequeOnlyPayment.ElementAt(o).Ref_AccountID : dtChequeOnlyPayment.ElementAt(o).ERP_Client_AccountID;
                                        //objCVarA_VoucherDetails.SubAccountID = dtChequeOnlyPayment.ElementAt(o).ERP_Client_SubAccountID == 0 ? dtChequeOnlyPayment.ElementAt(o).Ref_SubAccountID : dtChequeOnlyPayment.ElementAt(o).ERP_Client_SubAccountID;
                                    //}
                                    //else
                                    //{
                                    //    objCVarA_VoucherDetails.AccountID = dtChequeOnlyPayment.ElementAt(o).Ref_AccountID;
                                    //    objCVarA_VoucherDetails.SubAccountID = dtChequeOnlyPayment.ElementAt(o).Ref_SubAccountID;
                                    //}
                                    //objCVarA_VoucherDetails.CostCenterID = 0;
                                    //objCVarA_VoucherDetails.IsDocumented = false;
                                    //objCVarA_VoucherDetails.InvoiceID = dtChequeOnlyPayment.ElementAt(o).InvoiceHeaderID;
                                    //objCVarA_VoucherDetails.VoucherType = constVoucherChequeIn;
                                    //objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);

                                } //if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                                else
                                {
                                    CvwCurrencies objCCurrency = new CvwCurrencies();
                                    objCCurrency.GetList("WHERE ID=" + CurrencyID);
                                    strMessage = objCCurrency.lstCVarvwCurrencies[0].Code + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                                }

                            } //if (dtChequeOnlyPayment.ElementAt(o).Remarks == ChequeNumber && ChequeNumber != "0")
                        } //for (int o = 0; o < dtChequeOnlyPayment.Count() && strMessage == ""; o++)
                        #endregion Fill Cheque VoucherDetails (i.e. Cheque PaymentDetails)
                    } //for (int n = 0; n < distinct_Cheque_No.Count() && strMessage == ""; n++)
                    #endregion Adding Voucher & Updating SL_InvoiceJVs with VoucherID & VoucherType
                    if (strMessage == "")
                    {
                        #region Deposit
                        var dtDepositPayment = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID.ToList();
                        for (int i = 0; i < dtDepositPayment.Count(); i++)
                        {
                            int CurrencyID = 0;
                            decimal ExchangeRate = 1;
                            CurrencyID = dtDepositPayment.ElementAt(i).CurrencyID;
                            objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");
                            if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                            {
                                ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;

                                #region طرف خزنة او بنك مدين
                                CVarA_JVDetails objCVarA_JVDetails_Deposit = new CVarA_JVDetails();
                                //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                                if (dtDepositPayment.ElementAt(i).PaymentTypeID == 1)
                                    objCVarA_JVDetails_Deposit.Account_ID = dtDepositPayment.ElementAt(i).Safe_Account_ID;
                                else
                                    objCVarA_JVDetails_Deposit.Account_ID = dtDepositPayment.ElementAt(i).Bank_Account_ID;
                                //objCVarA_JVDetails1.SubAccount_ID = 0;
                                //objCVarA_JVDetails1.CostCenter_ID = 0;
                                objCVarA_JVDetails_Deposit.Debit = dtDepositPayment.ElementAt(i).Amount;
                                objCVarA_JVDetails_Deposit.Credit = 0;
                                objCVarA_JVDetails_Deposit.Currency_ID = CurrencyID;
                                objCVarA_JVDetails_Deposit.ExchangeRate = ExchangeRate;
                                objCVarA_JVDetails_Deposit.LocalDebit = objCVarA_JVDetails_Deposit.Debit * ExchangeRate;
                                objCVarA_JVDetails_Deposit.LocalCredit = 0;
                                objCVarA_JVDetails_Deposit.Description =
                                    (dtDepositPayment.ElementAt(i).PaymentTypeID == 1
                                     ? dtDepositPayment.ElementAt(i).invoiceserial + " -  Receipt:" + dtDepositPayment.ElementAt(i).ReceiptNumber + " - " + IssueDate.ToString("dd/MM/yyyy")
                                     : dtDepositPayment.ElementAt(i).Remarks != "" ? dtDepositPayment.ElementAt(i).Remarks : (dtDepositPayment.ElementAt(i).invoiceserial + " - Receipt: " + dtDepositPayment.ElementAt(i).ReceiptNumber + " - " + IssueDate.ToString("dd/MM/yyyy"))
                                    );
                                objCA_JVDetails_Deposit.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Deposit);
                                #endregion طرف خزنة او بنك مدين
                                #region طرف القوالب دائن
                                CVarA_JVDetails objCVarA_JVDetails_Deposit2 = new CVarA_JVDetails();
                                //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                                objCVarA_JVDetails_Deposit2.Account_ID = dtDepositPayment.ElementAt(i).ERP_Client_AccountID;
                                if (dtDepositPayment.ElementAt(i).ERP_Client_SubAccountID > 0)
                                    objCVarA_JVDetails_Deposit2.SubAccount_ID = dtDepositPayment.ElementAt(i).ERP_Client_SubAccountID;
                                //objCVarA_JVDetails2.CostCenter_ID = 0;
                                objCVarA_JVDetails_Deposit2.Debit = 0;
                                objCVarA_JVDetails_Deposit2.Credit = dtDepositPayment.ElementAt(i).Amount;
                                objCVarA_JVDetails_Deposit2.Currency_ID = CurrencyID;
                                objCVarA_JVDetails_Deposit2.ExchangeRate = ExchangeRate;
                                objCVarA_JVDetails_Deposit2.LocalDebit = 0;
                                objCVarA_JVDetails_Deposit2.LocalCredit = objCVarA_JVDetails_Deposit2.Credit * ExchangeRate;
                                objCVarA_JVDetails_Deposit2.Description = dtDepositPayment.ElementAt(i).invoiceserial + " -  Receipt: " + dtDepositPayment.ElementAt(i).ReceiptNumber + " - " + IssueDate.ToString("dd/MM/yyyy");
                                objCA_JVDetails_Deposit.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Deposit2);
                                #endregion طرف القوالب دائن
                            }
                            else
                            {
                                CvwCurrencies objCCurrency = new CvwCurrencies();
                                objCCurrency.GetList("WHERE ID=" + CurrencyID);
                                strMessage = objCCurrency.lstCVarvwCurrencies[0].Code + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                            }
                        }
                        #endregion Deposit
                        //#region Cash
                        //var dtCashPayment = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID.Where(s => s.PaymentTypeID == 1);
                        //for (int i = 0; i < dtCashPayment.Count(); i++)
                        //{
                        //    int CurrencyID = 0;
                        //    decimal ExchangeRate = 1;
                        //    CurrencyID = dtCashPayment.ElementAt(i).CurrencyID;
                        //    objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");
                        //    if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                        //    {
                        //        ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;

                        //        #region طرف خزنة او بنك مدين
                        //        CVarA_JVDetails objCVarA_JVDetails_Cash = new CVarA_JVDetails();
                        //        //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                        //        if (dtCashPayment.ElementAt(i).PaymentTypeID == 1)
                        //            objCVarA_JVDetails_Cash.Account_ID = dtCashPayment.ElementAt(i).Safe_Account_ID;
                        //        else
                        //            objCVarA_JVDetails_Cash.Account_ID = dtCashPayment.ElementAt(i).Bank_Account_ID;
                        //        //objCVarA_JVDetails1.SubAccount_ID = 0;
                        //        //objCVarA_JVDetails1.CostCenter_ID = 0;
                        //        objCVarA_JVDetails_Cash.Debit = dtCashPayment.ElementAt(i).Amount;
                        //        objCVarA_JVDetails_Cash.Credit = 0;
                        //        objCVarA_JVDetails_Cash.Currency_ID = CurrencyID;
                        //        objCVarA_JVDetails_Cash.ExchangeRate = ExchangeRate;
                        //        objCVarA_JVDetails_Cash.LocalDebit = objCVarA_JVDetails_Cash.Debit * ExchangeRate;
                        //        objCVarA_JVDetails_Cash.LocalCredit = 0;
                        //        objCVarA_JVDetails_Cash.Description =
                        //            (dtCashPayment.ElementAt(i).PaymentTypeID == 1
                        //             ? dtCashPayment.ElementAt(i).invoiceserial + " - " + dtCashPayment.ElementAt(i).ReceiptNumber + " - " + IssueDate.ToString("dd/MM/yyyy")
                        //             : dtCashPayment.ElementAt(i).Remarks != "" ? dtCashPayment.ElementAt(i).Remarks : (dtCashPayment.ElementAt(i).invoiceserial + " - " + dtCashPayment.ElementAt(i).ReceiptNumber + " - " + IssueDate.ToString("dd/MM/yyyy"))
                        //            );
                        //        objCA_JVDetails_Cash.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Cash);
                        //        #endregion طرف خزنة او بنك مدين
                        //        #region طرف القوالب دائن
                        //        CVarA_JVDetails objCVarA_JVDetails_Cash2 = new CVarA_JVDetails();
                        //        //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                        //        objCVarA_JVDetails_Cash2.Account_ID = dtCashPayment.ElementAt(i).Ref_AccountID;
                        //        if (dtCashPayment.ElementAt(i).Ref_SubAccountID > 0)
                        //            objCVarA_JVDetails_Cash2.SubAccount_ID = dtCashPayment.ElementAt(i).Ref_SubAccountID;
                        //        //objCVarA_JVDetails2.CostCenter_ID = 0;
                        //        objCVarA_JVDetails_Cash2.Debit = 0;
                        //        objCVarA_JVDetails_Cash2.Credit = dtCashPayment.ElementAt(i).Amount;
                        //        objCVarA_JVDetails_Cash2.Currency_ID = CurrencyID;
                        //        objCVarA_JVDetails_Cash2.ExchangeRate = ExchangeRate;
                        //        objCVarA_JVDetails_Cash2.LocalDebit = 0;
                        //        objCVarA_JVDetails_Cash2.LocalCredit = objCVarA_JVDetails_Cash2.Credit * ExchangeRate;
                        //        objCVarA_JVDetails_Cash2.Description = dtCashPayment.ElementAt(i).invoiceserial + " - " + dtCashPayment.ElementAt(i).ReceiptNumber + " - " + IssueDate.ToString("dd/MM/yyyy");
                        //        objCA_JVDetails_Cash.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Cash2);
                        //        #endregion طرف القوالب دائن
                        //    }
                        //    else
                        //    {
                        //        CvwCurrencies objCCurrency = new CvwCurrencies();
                        //        objCCurrency.GetList("WHERE ID=" + CurrencyID);
                        //        strMessage = objCCurrency.lstCVarvwCurrencies[0].Code + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                        //    }
                        //}
                        //#endregion Cash
                        //#region Transfer
                        //var dtTransferPayment = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID.Where(s => s.PaymentTypeID == 4);
                        //for (int i = 0; i < dtTransferPayment.Count(); i++)
                        //{
                        //    int CurrencyID = 0;
                        //    decimal ExchangeRate = 1;
                        //    CurrencyID = dtTransferPayment.ElementAt(i).CurrencyID;
                        //    objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");
                        //    if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                        //    {
                        //        ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;

                        //        #region طرف خزنة او بنك مدين
                        //        CVarA_JVDetails objCVarA_JVDetails_Transfer = new CVarA_JVDetails();
                        //        //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                        //        if (dtTransferPayment.ElementAt(i).PaymentTypeID == 1)
                        //            objCVarA_JVDetails_Transfer.Account_ID = dtTransferPayment.ElementAt(i).Safe_Account_ID;
                        //        else
                        //            objCVarA_JVDetails_Transfer.Account_ID = dtTransferPayment.ElementAt(i).Bank_Account_ID;
                        //        //objCVarA_JVDetails1.SubAccount_ID = 0;
                        //        //objCVarA_JVDetails1.CostCenter_ID = 0;
                        //        objCVarA_JVDetails_Transfer.Debit = dtTransferPayment.ElementAt(i).Amount;
                        //        objCVarA_JVDetails_Transfer.Credit = 0;
                        //        objCVarA_JVDetails_Transfer.Currency_ID = CurrencyID;
                        //        objCVarA_JVDetails_Transfer.ExchangeRate = ExchangeRate;
                        //        objCVarA_JVDetails_Transfer.LocalDebit = objCVarA_JVDetails_Transfer.Debit * ExchangeRate;
                        //        objCVarA_JVDetails_Transfer.LocalCredit = 0;
                        //        objCVarA_JVDetails_Transfer.Description =
                        //            (dtTransferPayment.ElementAt(i).PaymentTypeID == 1
                        //             ? dtTransferPayment.ElementAt(i).invoiceserial + " - " + dtTransferPayment.ElementAt(i).ReceiptNumber + " - " + IssueDate.ToString("dd/MM/yyyy")
                        //             : dtTransferPayment.ElementAt(i).Remarks != "" ? dtTransferPayment.ElementAt(i).Remarks : (dtTransferPayment.ElementAt(i).invoiceserial + " - " + dtTransferPayment.ElementAt(i).ReceiptNumber + " - " + IssueDate.ToString("dd/MM/yyyy"))
                        //            );
                        //        objCA_JVDetails_Transfer.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Transfer);
                        //        #endregion طرف خزنة او بنك مدين
                        //        #region طرف القوالب دائن
                        //        CVarA_JVDetails objCVarA_JVDetails_Transfer2 = new CVarA_JVDetails();
                        //        //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                        //        objCVarA_JVDetails_Transfer2.Account_ID = dtTransferPayment.ElementAt(i).Ref_AccountID;
                        //        if (dtTransferPayment.ElementAt(i).Ref_SubAccountID > 0)
                        //            objCVarA_JVDetails_Transfer2.SubAccount_ID = dtTransferPayment.ElementAt(i).Ref_SubAccountID;
                        //        //objCVarA_JVDetails2.CostCenter_ID = 0;
                        //        objCVarA_JVDetails_Transfer2.Debit = 0;
                        //        objCVarA_JVDetails_Transfer2.Credit = dtTransferPayment.ElementAt(i).Amount;
                        //        objCVarA_JVDetails_Transfer2.Currency_ID = CurrencyID;
                        //        objCVarA_JVDetails_Transfer2.ExchangeRate = ExchangeRate;
                        //        objCVarA_JVDetails_Transfer2.LocalDebit = 0;
                        //        objCVarA_JVDetails_Transfer2.LocalCredit = objCVarA_JVDetails_Transfer2.Credit * ExchangeRate;
                        //        objCVarA_JVDetails_Transfer2.Description = dtTransferPayment.ElementAt(i).invoiceserial + " - " + dtTransferPayment.ElementAt(i).ReceiptNumber + " - " + IssueDate.ToString("dd/MM/yyyy");
                        //        objCA_JVDetails_Transfer.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Transfer2);
                        //        #endregion طرف القوالب دائن
                        //    }
                        //    else
                        //    {
                        //        CvwCurrencies objCCurrency = new CvwCurrencies();
                        //        objCCurrency.GetList("WHERE ID=" + CurrencyID);
                        //        strMessage = objCCurrency.lstCVarvwCurrencies[0].Code + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                        //    }
                        //}
                        //#endregion Transfer
                    }
                } // of for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count && strMessage == ""; m++)
                #endregion Prepare JV2 data and saving ChequeVoucher if any
                /********************if its to add multiple invoices altogether********************/

                #region
                /* OLD ONE Belong To Sherif
               #region Add JV for Deposits إدخال قيد الايداع
               if (objCA_JVDetails_Deposit.lstCVarA_JVDetails.Count > 0 && strMessage == "")
               {
                   #region Get Distinct AccountIDs && SubAccountIDs to Save Multiple JV Headers(one for each bank) with details
                   var distinct_AccountID = objCA_JVDetails_Deposit.lstCVarA_JVDetails
                       .Where(w => w.SubAccount_ID == 0)
                       .GroupBy(d => new { d.Account_ID })
                       .Select(g => new
                       {
                           Account_ID = g.First().Account_ID
                           //,
                           //SubAccount_ID = g.First().SubAccount_ID
                       });
                   #endregion Get Distinct AccountIDs && SubAccountIDs to Save Multiple JV Headers(one for each bank) with details
                   for (int y = 0; y < distinct_AccountID.Count(); y++)
                   {
                       #region Group JVDetails with same Account, SubAccount, Description
                       CA_JVDetails objCA_JVDetails_Grouped = new CA_JVDetails();
                       var objCA_JVDetails_Temp = objCA_JVDetails_Deposit.lstCVarA_JVDetails
                           .Where(w => w.SubAccount_ID == 0)
                           .Where(w => w.Account_ID == distinct_AccountID.ElementAt(y).Account_ID)
                           .GroupBy(g => new { g.Currency_ID, g.ExchangeRate, g.Account_ID, g.SubAccount_ID, g.CostCenter_ID, g.Description })
                           .Select(s => new
                           {
                               //JV_ID = objCVarA_JV.ID,
                               Account_ID = s.First().Account_ID
                   ,
                               SubAccount_ID = s.First().SubAccount_ID
                   ,
                               CostCenter_ID = 0
                   ,
                               Debit = s.Sum(x => x.Debit)
                   ,
                               Credit = s.Sum(x => x.Credit)
                   ,
                               Currency_ID = s.First().Currency_ID
                   ,
                               ExchangeRate = s.First().ExchangeRate
                   ,
                               LocalDebit = s.Sum(x => x.LocalDebit)
                   ,
                               LocalCredit = s.Sum(x => x.LocalCredit)
                   ,
                               Description = s.First().Description
                           });
                       //Copy to an object from Class CA_JVDetails, so i can use the SaveMethod() generated
                       for (int l = 0; l < objCA_JVDetails_Temp.Count(); l++)
                       {
                           CVarA_JVDetails objCVarA_JVDetails_Grouped = new CVarA_JVDetails();
                           //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                           objCVarA_JVDetails_Grouped.Account_ID = objCA_JVDetails_Temp.ElementAt(l).Account_ID;
                           objCVarA_JVDetails_Grouped.SubAccount_ID = objCA_JVDetails_Temp.ElementAt(l).SubAccount_ID;
                           objCVarA_JVDetails_Grouped.CostCenter_ID = 0;
                           objCVarA_JVDetails_Grouped.Debit = objCA_JVDetails_Temp.ElementAt(l).Debit;
                           objCVarA_JVDetails_Grouped.Credit = objCA_JVDetails_Temp.ElementAt(l).Credit;
                           objCVarA_JVDetails_Grouped.Currency_ID = objCA_JVDetails_Temp.ElementAt(l).Currency_ID;
                           objCVarA_JVDetails_Grouped.ExchangeRate = objCA_JVDetails_Temp.ElementAt(l).ExchangeRate;
                           objCVarA_JVDetails_Grouped.LocalDebit = objCA_JVDetails_Temp.ElementAt(l).LocalDebit;
                           objCVarA_JVDetails_Grouped.LocalCredit = objCA_JVDetails_Temp.ElementAt(l).LocalCredit;
                           objCVarA_JVDetails_Grouped.Description = objCA_JVDetails_Temp.ElementAt(l).Description;

                           objCA_JVDetails_Grouped.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Grouped);
                       }
                       #endregion Group JVDetails with same Account, SubAccount, Description

                       //Get multiple JV headers / hint use whereClause to get TotalPayment
                       #region Save Header
                       decimal TotalPayment = objCA_JVDetails_Grouped.lstCVarA_JVDetails.Sum(s => s.LocalDebit);//sum from the original details before grouping
                       string pNewJVCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", IssueDate, WebSecurity.CurrentUserId, JournalTypeID);
                       CVarA_JV objCVarA_JV = new CVarA_JV();
                       objCVarA_JV.JVNo = pNewJVCode;
                       objCVarA_JV.JVDate = IssueDate;
                       objCVarA_JV.TotalDebit = TotalPayment;
                       objCVarA_JV.TotalCredit = TotalPayment;
                       objCVarA_JV.Journal_ID = JournalTypeID;
                       objCVarA_JV.JVType_ID = JVTypeID;
                       objCVarA_JV.ReceiptNo = "";
                       objCVarA_JV.RemarksHeader = "يومية مبيعات سداد" + " - " + IssueDate.ToString("yyyy/MM/dd");
                       objCVarA_JV.Deleted = false;
                       objCVarA_JV.Posted = false; // false in desktop
                       objCVarA_JV.IsSysJv = true;
                       objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                       CA_JV objCA_JV = new CA_JV();
                       objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                       checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                       #endregion Save Header
                       #region Save Details
                       if (checkException == null)
                       {
                           objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                           for (int j = 0; j < objCA_JVDetails_Grouped.lstCVarA_JVDetails.Count; j++)
                               objCA_JVDetails_Grouped.lstCVarA_JVDetails[j].JV_ID = objCVarA_JV.ID;
                           checkException = objCA_JVDetails_Grouped.SaveMethod(objCA_JVDetails_Grouped.lstCVarA_JVDetails);
                           CSL_InvoiceJVs objCSL_InvoiceJVs = new CSL_InvoiceJVs();
                           checkException = objCSL_InvoiceJVs.UpdateList("JVID2=" + objCVarA_JV.ID + " WHERE Shipping_InvoiceID IN (" + pInvoiceIDs + ")");
                           if (checkException == null)
                           {
                               for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count; m++)
                                   objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVs_IDofShippingInvoice", dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID, "U");
                           }
                       }
                       else
                       {
                           strMessage = checkException.Message;
                       }
                       #endregion Save Details
                   } //of for (int y = 0; y < distinct_AccountID.Count(); y++)
               } //of if (objCA_JVDetails.lstCVarA_JVDetails.Count > 0 && strMessage == "") 
               #endregion Add JV for Deposits إدخال قيد الايداع

               */
                #endregion
                #region Add JV for Deposits إدخال قيد الايداع
                if (objCA_JVDetails_Deposit.lstCVarA_JVDetails.Count > 0 && strMessage == "")
                {
                    var distinct_DepositsCurrency = objCA_JVDetails_Deposit.lstCVarA_JVDetails.GroupBy(d => d.Currency_ID).Select(g => new { Currency_ID = g.First().Currency_ID });
                    CA_JVDetails objCA_JVDetails_Grouped;
                    CVarA_JVDetails objCVarA_JVDetails_Grouped;
                    decimal TotalPayment;
                    string pNewJVCode;
                    CVarA_JV objCVarA_JV;
                    CA_JV objCA_JV;
                    for (int n = 0; n < distinct_DepositsCurrency.Count() && strMessage == ""; n++)
                    {


                        #region Group JVDetails with same Account, SubAccount, Description
                        objCA_JVDetails_Grouped = new CA_JVDetails();
                        var objCA_JVDetails_Temp = objCA_JVDetails_Deposit.lstCVarA_JVDetails
                            .GroupBy(g => new { g.Currency_ID, g.ExchangeRate, g.Account_ID, g.SubAccount_ID, g.CostCenter_ID, g.Description })
                            .Select(s => new
                            {
                                //JV_ID = objCVarA_JV.ID,
                                Account_ID = s.First().Account_ID
                    ,
                                SubAccount_ID = s.First().SubAccount_ID
                    ,
                                CostCenter_ID = 0
                    ,
                                Debit = s.Sum(x => x.Debit)
                    ,
                                Credit = s.Sum(x => x.Credit)
                    ,
                                Currency_ID = s.First().Currency_ID
                    ,
                                ExchangeRate = s.First().ExchangeRate
                    ,
                                LocalDebit = s.Sum(x => x.LocalDebit)
                    ,
                                LocalCredit = s.Sum(x => x.LocalCredit)
                    ,
                                Description = s.First().Description
                            }).Where(cas => cas.Currency_ID == distinct_DepositsCurrency.ElementAt(n).Currency_ID);
                        //Copy to an object from Class CA_JVDetails, so i can use the SaveMethod() generated
                        for (int l = 0; l < objCA_JVDetails_Temp.Count(); l++)
                        {
                            objCVarA_JVDetails_Grouped = new CVarA_JVDetails();
                            //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                            objCVarA_JVDetails_Grouped.Account_ID = objCA_JVDetails_Temp.ElementAt(l).Account_ID;
                            objCVarA_JVDetails_Grouped.SubAccount_ID = objCA_JVDetails_Temp.ElementAt(l).SubAccount_ID;
                            objCVarA_JVDetails_Grouped.CostCenter_ID = 0;
                            objCVarA_JVDetails_Grouped.Debit = objCA_JVDetails_Temp.ElementAt(l).Debit;
                            objCVarA_JVDetails_Grouped.Credit = objCA_JVDetails_Temp.ElementAt(l).Credit;
                            objCVarA_JVDetails_Grouped.Currency_ID = objCA_JVDetails_Temp.ElementAt(l).Currency_ID;
                            objCVarA_JVDetails_Grouped.ExchangeRate = objCA_JVDetails_Temp.ElementAt(l).ExchangeRate;
                            objCVarA_JVDetails_Grouped.LocalDebit = objCA_JVDetails_Temp.ElementAt(l).LocalDebit;
                            objCVarA_JVDetails_Grouped.LocalCredit = objCA_JVDetails_Temp.ElementAt(l).LocalCredit;
                            objCVarA_JVDetails_Grouped.Description = objCA_JVDetails_Temp.ElementAt(l).Description;

                            objCA_JVDetails_Grouped.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Grouped);
                        }
                        #endregion Group JVDetails with same Account, SubAccount, Description
                        decimal TotalLocalDebit = objCA_JVDetails_Grouped.lstCVarA_JVDetails.Sum(s => s.LocalDebit);
                        decimal TotalLocalCredit = objCA_JVDetails_Grouped.lstCVarA_JVDetails.Sum(s => s.LocalCredit);
                        if (TotalLocalDebit == TotalLocalCredit && strMessage == "")
                        {
                            //Get multiple JV headers / hint use whereClause to get TotalPayment
                            #region Save Header
                            //TotalPayment = objCA_JVDetails_Grouped.lstCVarA_JVDetails.Sum(s => s.LocalDebit);//sum from the original details before grouping
                            TotalPayment = objCA_JVDetails_Grouped.lstCVarA_JVDetails.Sum(s => s.LocalDebit);//sum from the Grouped details
                            pNewJVCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", IssueDate, WebSecurity.CurrentUserId, JournalTypeID);
                            objCVarA_JV = new CVarA_JV();
                            objCVarA_JV.JVNo = pNewJVCode;
                            objCVarA_JV.JVDate = IssueDate;
                            objCVarA_JV.TotalDebit = TotalPayment;
                            objCVarA_JV.TotalCredit = TotalPayment;
                            objCVarA_JV.Journal_ID = JournalTypeID;
                            objCVarA_JV.JVType_ID = JVTypeID;
                            objCVarA_JV.ReceiptNo = "";
                            objCVarA_JV.RemarksHeader = "يومية مبيعات سداد" + " - " + IssueDate.ToString("yyyy/MM/dd");
                            objCVarA_JV.Deleted = false;
                            objCVarA_JV.Posted = false; // false in desktop
                            objCVarA_JV.IsSysJv = true;
                            objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                            objCA_JV = new CA_JV();
                            objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                            checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                            #endregion Save Header
                            #region Save Details
                            if (checkException == null)
                            {
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                                for (int j = 0; j < objCA_JVDetails_Grouped.lstCVarA_JVDetails.Count; j++)
                                    objCA_JVDetails_Grouped.lstCVarA_JVDetails[j].JV_ID = objCVarA_JV.ID;
                                checkException = objCA_JVDetails_Grouped.SaveMethod(objCA_JVDetails_Grouped.lstCVarA_JVDetails);
                                //CSL_InvoiceJVs objCSL_InvoiceJVs = new CSL_InvoiceJVs();
                                //checkException = objCSL_InvoiceJVs.UpdateList("JVID2=" + objCVarA_JV.ID + " WHERE Shipping_InvoiceID IN (" + pInvoiceIDs + ")");
                                objCCustomizedDBCall.SP_InsertUpdateSLInvoiceJVs_Item(pInvoiceIDs, objCVarA_JV.ID);

                                if (checkException == null)
                                {
                                    for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count; m++)
                                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVs_IDofShippingInvoice", dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID, "U");
                                }
                            }
                            else
                            {
                                strMessage = checkException.Message;
                            }
                            #endregion Save Details 
                        }
                        else
                            strMessage = "Total Debit not equal total credit";
                    }

                } //of if (objCA_JVDetails.lstCVarA_JVDetails.Count > 0 && strMessage == "") 
                #endregion Add JV for Deposits إدخال قيد الايداع
                #region Add JV for Cash إدخال قيد الكاش
                if (objCA_JVDetails_Cash.lstCVarA_JVDetails.Count > 0 && strMessage == "")
                {
                    var distinct_Currency = objCA_JVDetails_Cash.lstCVarA_JVDetails
                       .GroupBy(d => d.Currency_ID)
                       .Select(g => new
                       {
                           Currency_ID = g.First().Currency_ID
                       });
                    CA_JVDetails objCA_JVDetails_Grouped;

                    CVarA_JVDetails objCVarA_JVDetails_Grouped;
                    decimal TotalPayment;
                    string pNewJVCode;
                    CVarA_JV objCVarA_JV;
                    CA_JV objCA_JV;
                    for (int n = 0; n < distinct_Currency.Count() && strMessage == ""; n++)
                    {

                        #region Group JVDetails with same Account, SubAccount, Description
                        objCA_JVDetails_Grouped = new CA_JVDetails();
                        var objCA_JVDetails_Temp = objCA_JVDetails_Cash.lstCVarA_JVDetails
                           .GroupBy(g => new { g.Currency_ID, g.ExchangeRate, g.Account_ID, g.SubAccount_ID, g.CostCenter_ID, g.Description })
                           .Select(s => new
                           {
                               //JV_ID = objCVarA_JV.ID,
                               Account_ID = s.First().Account_ID
                   ,
                               SubAccount_ID = s.First().SubAccount_ID
                   ,
                               CostCenter_ID = 0
                   ,
                               Debit = s.Sum(x => x.Debit)
                   ,
                               Credit = s.Sum(x => x.Credit)
                   ,
                               Currency_ID = s.First().Currency_ID
                   ,
                               ExchangeRate = s.First().ExchangeRate
                   ,
                               LocalDebit = s.Sum(x => x.LocalDebit)
                   ,
                               LocalCredit = s.Sum(x => x.LocalCredit)
                   ,
                               Description = s.First().Description
                           }).Where(tf => tf.Currency_ID == distinct_Currency.ElementAt(n).Currency_ID);

                        //Copy to an object from Class CA_JVDetails, so i can use the SaveMethod() generated
                        for (int l = 0; l < objCA_JVDetails_Temp.Count(); l++)
                        {
                            objCVarA_JVDetails_Grouped = new CVarA_JVDetails();
                            //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                            objCVarA_JVDetails_Grouped.Account_ID = objCA_JVDetails_Temp.ElementAt(l).Account_ID;
                            objCVarA_JVDetails_Grouped.SubAccount_ID = objCA_JVDetails_Temp.ElementAt(l).SubAccount_ID;
                            objCVarA_JVDetails_Grouped.CostCenter_ID = 0;
                            objCVarA_JVDetails_Grouped.Debit = objCA_JVDetails_Temp.ElementAt(l).Debit;
                            objCVarA_JVDetails_Grouped.Credit = objCA_JVDetails_Temp.ElementAt(l).Credit;
                            objCVarA_JVDetails_Grouped.Currency_ID = objCA_JVDetails_Temp.ElementAt(l).Currency_ID;
                            objCVarA_JVDetails_Grouped.ExchangeRate = objCA_JVDetails_Temp.ElementAt(l).ExchangeRate;
                            objCVarA_JVDetails_Grouped.LocalDebit = objCA_JVDetails_Temp.ElementAt(l).LocalDebit;
                            objCVarA_JVDetails_Grouped.LocalCredit = objCA_JVDetails_Temp.ElementAt(l).LocalCredit;
                            objCVarA_JVDetails_Grouped.Description = objCA_JVDetails_Temp.ElementAt(l).Description;

                            objCA_JVDetails_Grouped.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Grouped);
                        }
                        #endregion Group JVDetails with same Account, SubAccount, Description
                        #region Save Header
                        // TotalPayment = objCA_JVDetails_Cash.lstCVarA_JVDetails.Sum(s => s.LocalDebit);//sum from the original details before grouping
                        TotalPayment = objCA_JVDetails_Grouped.lstCVarA_JVDetails.Sum(s => s.LocalDebit);//sum from the grouping details
                        pNewJVCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", IssueDate, WebSecurity.CurrentUserId, JournalTypeID);
                        objCVarA_JV = new CVarA_JV();
                        objCVarA_JV.JVNo = pNewJVCode;
                        objCVarA_JV.JVDate = IssueDate;
                        objCVarA_JV.TotalDebit = TotalPayment;
                        objCVarA_JV.TotalCredit = TotalPayment;
                        objCVarA_JV.Journal_ID = JournalTypeID;
                        objCVarA_JV.JVType_ID = JVTypeID;
                        objCVarA_JV.ReceiptNo = "";
                        objCVarA_JV.RemarksHeader = "يومية مبيعات سداد" + " - " + IssueDate.ToString("yyyy/MM/dd");
                        objCVarA_JV.Deleted = false;
                        objCVarA_JV.Posted = false; // false in desktop
                        objCVarA_JV.IsSysJv = true;
                        objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                        objCA_JV = new CA_JV();
                        objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                        checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                        #endregion Save Header
                        #region Save Details
                        if (checkException == null)
                        {
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                            for (int j = 0; j < objCA_JVDetails_Grouped.lstCVarA_JVDetails.Count; j++)
                                objCA_JVDetails_Grouped.lstCVarA_JVDetails[j].JV_ID = objCVarA_JV.ID;
                            checkException = objCA_JVDetails_Grouped.SaveMethod(objCA_JVDetails_Grouped.lstCVarA_JVDetails);
                            //CSL_InvoiceJVs objCSL_InvoiceJVs = new CSL_InvoiceJVs();
                            //checkException = objCSL_InvoiceJVs.UpdateList("JVID2=" + objCVarA_JV.ID + " WHERE Shipping_InvoiceID IN (" + pInvoiceIDs + ")");
                            objCCustomizedDBCall.SP_InsertUpdateSLInvoiceJVs_Item(pInvoiceIDs, objCVarA_JV.ID);
                            if (checkException == null)
                            {
                                for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count; m++)
                                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVs_IDofShippingInvoice", dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID, "U");
                            }
                        }
                        else
                        {
                            strMessage = checkException.Message;
                        }
                        #endregion Save Details
                    }

                } //of if (objCA_JVDetails.lstCVarA_JVDetails.Count > 0 && strMessage == "")
                #endregion Add JV for Cash إدخال قيد الكاش
                #region Add JV for Transfer إدخال قيد التحويل البنكى
                if (objCA_JVDetails_Transfer.lstCVarA_JVDetails.Count > 0 && strMessage == "")
                {

                    var distinct_TransferCurrency = objCA_JVDetails_Transfer.lstCVarA_JVDetails.GroupBy(d => d.Currency_ID).Select(g => new { Currency_ID = g.First().Currency_ID });
                    CA_JVDetails objCA_JVDetails_Grouped;
                    CVarA_JVDetails objCVarA_JVDetails_Grouped;
                    decimal TotalPayment;
                    string pNewJVCode;
                    CVarA_JV objCVarA_JV;
                    CA_JV objCA_JV;
                    for (int n = 0; n < distinct_TransferCurrency.Count() && strMessage == ""; n++)
                    {

                        #region Group JVDetails with same Account, SubAccount, Description
                        objCA_JVDetails_Grouped = new CA_JVDetails();
                        var objCA_JVDetails_Temp = objCA_JVDetails_Transfer.lstCVarA_JVDetails
                            .GroupBy(g => new { g.Currency_ID, g.ExchangeRate, g.Account_ID, g.SubAccount_ID, g.CostCenter_ID, g.Description })
                            .Select(s => new
                            {
                                Account_ID = s.First().Account_ID
                    ,
                                SubAccount_ID = s.First().SubAccount_ID
                    ,
                                CostCenter_ID = 0
                    ,
                                Debit = s.Sum(x => x.Debit)
                    ,
                                Credit = s.Sum(x => x.Credit)
                    ,
                                Currency_ID = s.First().Currency_ID
                    ,
                                ExchangeRate = s.First().ExchangeRate
                    ,
                                LocalDebit = s.Sum(x => x.LocalDebit)
                    ,
                                LocalCredit = s.Sum(x => x.LocalCredit)
                    ,
                                Description = s.First().Description
                            }).Where(cas => cas.Currency_ID == distinct_TransferCurrency.ElementAt(n).Currency_ID);
                        //Copy to an object from Class CA_JVDetails, so i can use the SaveMethod() generated
                        for (int l = 0; l < objCA_JVDetails_Temp.Count(); l++)
                        {
                            objCVarA_JVDetails_Grouped = new CVarA_JVDetails();
                            //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                            objCVarA_JVDetails_Grouped.Account_ID = objCA_JVDetails_Temp.ElementAt(l).Account_ID;
                            objCVarA_JVDetails_Grouped.SubAccount_ID = objCA_JVDetails_Temp.ElementAt(l).SubAccount_ID;
                            objCVarA_JVDetails_Grouped.CostCenter_ID = 0;
                            objCVarA_JVDetails_Grouped.Debit = objCA_JVDetails_Temp.ElementAt(l).Debit;
                            objCVarA_JVDetails_Grouped.Credit = objCA_JVDetails_Temp.ElementAt(l).Credit;
                            objCVarA_JVDetails_Grouped.Currency_ID = objCA_JVDetails_Temp.ElementAt(l).Currency_ID;
                            objCVarA_JVDetails_Grouped.ExchangeRate = objCA_JVDetails_Temp.ElementAt(l).ExchangeRate;
                            objCVarA_JVDetails_Grouped.LocalDebit = objCA_JVDetails_Temp.ElementAt(l).LocalDebit;
                            objCVarA_JVDetails_Grouped.LocalCredit = objCA_JVDetails_Temp.ElementAt(l).LocalCredit;
                            objCVarA_JVDetails_Grouped.Description = objCA_JVDetails_Temp.ElementAt(l).Description;

                            objCA_JVDetails_Grouped.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Grouped);
                        }
                        #endregion Group JVDetails with same Account, SubAccount, Description

                        #region Save Header
                        TotalPayment = objCA_JVDetails_Grouped.lstCVarA_JVDetails.Sum(s => s.LocalDebit);
                        pNewJVCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", IssueDate, WebSecurity.CurrentUserId, JournalTypeID);
                        objCVarA_JV = new CVarA_JV();
                        objCVarA_JV.JVNo = pNewJVCode;
                        objCVarA_JV.JVDate = IssueDate;
                        objCVarA_JV.TotalDebit = TotalPayment;
                        objCVarA_JV.TotalCredit = TotalPayment;
                        objCVarA_JV.Journal_ID = JournalTypeID;
                        objCVarA_JV.JVType_ID = JVTypeID;
                        objCVarA_JV.ReceiptNo = "";
                        objCVarA_JV.RemarksHeader = "يومية مبيعات سداد" + " - " + IssueDate.ToString("yyyy/MM/dd");
                        objCVarA_JV.Deleted = false;
                        objCVarA_JV.Posted = false; // false in desktop
                        objCVarA_JV.IsSysJv = true;
                        objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                        objCA_JV = new CA_JV();
                        objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                        checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                        #endregion Save Header
                        #region Save Details
                        if (checkException == null)
                        {
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                            for (int j = 0; j < objCA_JVDetails_Transfer.lstCVarA_JVDetails.Count; j++)
                                objCA_JVDetails_Transfer.lstCVarA_JVDetails[j].JV_ID = objCVarA_JV.ID;
                            checkException = objCA_JVDetails_Transfer.SaveMethod(objCA_JVDetails_Transfer.lstCVarA_JVDetails);
                            objCCustomizedDBCall.SP_InsertUpdateSLInvoiceJVs_Item(pInvoiceIDs, objCVarA_JV.ID);
                            if (checkException == null)
                            {
                                for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count; m++)
                                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVs_IDofShippingInvoice", dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID, "U");
                            }
                        }
                        else
                        {
                            strMessage = checkException.Message;
                        }
                        #endregion Save Details

                    }
                } //of if (objCA_JVDetails.lstCVarA_JVDetails.Count > 0)
                #endregion Add JV for Transfer إدخال قيد التحويل البنكى
            } //of if (dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count == 0)
            return strMessage;
        }
        #region OneEgypt fns
        private string Post_OneEgypt(string pPostedSelectedIDs, DateTime pJVDate, bool pIsJV1AndJV2)
        {
            int _RowCount = 0;

            string strMessage = "";
            Exception checkException = null;
            CSL_InvoiceJVs objCSL_InvoiceJVs = new CSL_InvoiceJVs();
            CvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs dtInvoices = new CvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs();
            CvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs dtClientsTotals = new CvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs();
            CvwSL_InvoiceHeader_SelectNotPosted objCvwSL_InvoiceHeader_SelectNotPosted = new CvwSL_InvoiceHeader_SelectNotPosted();
            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            CA_JV objCA_JV = new CA_JV();
            CA_JVDetails objCA_JVDetails = new CA_JVDetails();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CJVDefaults objCJVDefaults = new CJVDefaults();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            int CurrencyID = 0;
            decimal ExchangeRate = 0;
            string UnEditableCompanyName;
            var ArrSelectedIDs = pPostedSelectedIDs.Split(',');
            //checkException = objCvwDefaults.GetList("WHERE 1=1");
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string BranchID = objCCustomizedDBCall.CallStringFunction("SELECT u.BranchID as BranshID FROM  Users AS u WHERE u.ID= " + WebSecurity.CurrentUserId);

            UnEditableCompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            checkException = objCJVDefaults.GetList("WHERE TransTypeID IN (27)");
            for (int i = 0; i < ArrSelectedIDs.Length && strMessage == ""; i++)
            {
                #region InvoiceData
                //رقم الفاتورة – نوع الفاتورة – اسم العميل – رقم البوليصة – رق الرحلة 
                objCvwSL_InvoiceHeader_SelectNotPosted.GetList("WHERE ID=" + ArrSelectedIDs[i]); //" AND JVID2 IS NULL"
                Int64 CurrentID = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].ID;
                DateTime IssueDate = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].IssueDate;
                string InvoiceSerial = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].InvoiceSerial.ToString();
                string ClientName = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].ClientName.Replace("'", "");
                string BillNumber = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].BillNumber;
                string ContainerDescription = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].Cont_Desc;
                string InvoiceType = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].InvTypeName;
                string VoyageNumber = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].VoyageNumber;
                int JournalTypeID = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].JournalTypeID;
                int JVTypeID = objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].JVTypeID;

                if (JournalTypeID == 0 && objCJVDefaults.lstCVarJVDefaults.Count > 0)
                    JournalTypeID = objCJVDefaults.lstCVarJVDefaults[0].JournalTypeID;
                if (JVTypeID == 0 && objCJVDefaults.lstCVarJVDefaults.Count > 0)
                    JVTypeID = objCJVDefaults.lstCVarJVDefaults[0].JVTypeID;
                CvwSL_LinkingInvoiceTypeJournal objCSL_LinkingInvoiceTypeJournal = new CvwSL_LinkingInvoiceTypeJournal();
                int ERP_AccountID = 0;
                objCSL_LinkingInvoiceTypeJournal.GetList("WHERE InvoiceTypeID=" + objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].InvoiceTypeID);
                if (objCSL_LinkingInvoiceTypeJournal.lstCVarvwSL_LinkingInvoiceTypeJournal.Count > 0)
                    ERP_AccountID = objCSL_LinkingInvoiceTypeJournal.lstCVarvwSL_LinkingInvoiceTypeJournal[0].AccountID;

                #endregion InvoiceData
                #region JV1
                if (objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSL_InvoiceHeader_SelectNotPosted[0].JVID1 == 0) //otherwise i already posted JV1 so post just JV2
                {
                    objCA_JVDetails.lstCVarA_JVDetails.Clear();
                    checkException = dtInvoices.GetList("WHERE ID=" + CurrentID);
                    if (dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Count > 0)
                    {
                        #region Debit Side ==> Client
                        dtClientsTotals.GetList("," + CurrentID + ",");
                        for (int j = 0; j < dtClientsTotals.lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs.Count && strMessage == ""; j++) //Each Row is a different Currency
                        {
                            CurrencyID = dtClientsTotals.lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs[j].ERP_CurrencyID;
                            objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");
                            if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                            {
                                ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;
                                CVarA_JVDetails objCVarA_JVDetails = new CVarA_JVDetails();
                                objCVarA_JVDetails.Account_ID = ERP_AccountID;
                                objCVarA_JVDetails.SubAccount_ID = 0;
                                objCVarA_JVDetails.CostCenter_ID = 0;
                                objCVarA_JVDetails.Debit = dtClientsTotals.lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs[j].TotalAmount;
                                objCVarA_JVDetails.Credit = 0;
                                objCVarA_JVDetails.Currency_ID = CurrencyID;
                                objCVarA_JVDetails.ExchangeRate = ExchangeRate;
                                objCVarA_JVDetails.LocalDebit = objCVarA_JVDetails.Debit * ExchangeRate;
                                objCVarA_JVDetails.LocalCredit = 0;
                                objCVarA_JVDetails.Description ="Inv No: " + InvoiceSerial + " - " + InvoiceType + " - " + ClientName + " - " 
                                    + BillNumber + " - " + ContainerDescription + " - " + VoyageNumber;
                                objCVarA_JVDetails.Branch_ID = Convert.ToInt32(BranchID);
                                objCVarA_JVDetails.Operation_ID = 0;
                                objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails);
                            }
                            else
                            {
                                CvwCurrencies objCCurrency = new CvwCurrencies();
                                objCCurrency.GetList("WHERE ID=" + CurrencyID);
                                strMessage = objCCurrency.lstCVarvwCurrencies[0].Code + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                            }
                        }
                        #endregion Debit Side ==> Client
                        #region Credit Side ==> Invoice Items
                        if (strMessage == "")
                            for (int j = 0; j < dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Count && strMessage == ""; j++)
                            {
                                // CvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID dtInvoicesDetails = new CvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID();
                                CvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt dtInvoicesDetails = new CvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt();
                                //checkException = dtInvoicesDetails.GetList(",6,10,");
                                checkException = dtInvoicesDetails.GetList("," + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].ID + ",");
                                CvwSL_InvoiceTotal dtInvoiceTotals = new CvwSL_InvoiceTotal();
                                dtInvoiceTotals.GetList("WHERE InvoiceHeaderID=" + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].ID);
                                // if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.Count > 0)
                                if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.Count > 0)
                                    for (int k = 0; k < dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt.Count; k++)
                                    // for (int k = 0; k < dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID.Count; k++)
                                    {
                                        //CurrencyID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID[k].CurrencyID;
                                        CurrencyID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].CurrencyID;
                                        objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");
                                        if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                                        {
                                            if (dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].ItemAmount != 0)
                                            {
                                                ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;
                                                CVarA_JVDetails objCVarA_JVDetails = new CVarA_JVDetails();
                                                objCVarA_JVDetails.Account_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].RevenueAccountID;
                                                objCVarA_JVDetails.SubAccount_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].VoyageSubAccountID;
                                                objCVarA_JVDetails.CostCenter_ID = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].CostCenterID;
                                                objCVarA_JVDetails.Debit = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].ItemAmount < 0 ? -dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].ItemAmount : 0;
                                                objCVarA_JVDetails.Credit = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].ItemAmount > 0 ? dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].ItemAmount : 0;
                                                objCVarA_JVDetails.Currency_ID = CurrencyID;
                                                objCVarA_JVDetails.ExchangeRate = ExchangeRate;
                                                objCVarA_JVDetails.LocalDebit = objCVarA_JVDetails.Debit * ExchangeRate;
                                                objCVarA_JVDetails.LocalCredit = objCVarA_JVDetails.Credit * ExchangeRate;
                                                objCVarA_JVDetails.Description =  "Inv No: " + InvoiceSerial + " - " + InvoiceType + " - " + ClientName + " - " + BillNumber + " - " + VoyageNumber;
                                                //dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].ClientName.Replace("'", "") + " - " + dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[j].BillNumber + " - " + ContainerDescription;
                                                objCVarA_JVDetails.Branch_ID = Convert.ToInt32(BranchID);
                                                objCVarA_JVDetails.Operation_ID = 0;
                                                objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails);
                                            }
                                        }
                                        else
                                            strMessage = dtInvoicesDetails.lstCVarvwStructure_SP_SL_SelectInvoiceDetailsBy_InvID_OneEgypt[k].CurrencyCode + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                                    }
                            }
                        #endregion Credit Side ==> Invoice ITems
                    }
                    decimal TotalLocalDebit = objCA_JVDetails.lstCVarA_JVDetails.Sum(s => s.LocalDebit);
                    decimal TotalLocalCredit = objCA_JVDetails.lstCVarA_JVDetails.Sum(s => s.LocalCredit);
                    if (TotalLocalDebit == TotalLocalCredit && strMessage == "")
                    {
                        #region Actual Generation for JV1, JVDetails & SL_InvoiceJVs
                        if (JournalTypeID != 0 && JVTypeID != 0)
                        {
                            string pNewJVCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", IssueDate, WebSecurity.CurrentUserId, JournalTypeID);
                            //pNewJVCode = pNewJVCode.Replace("//", "*");
                            //pNewJVCode = InvoiceSerial + "//" + pNewJVCode.Split('*')[0];
                            CVarA_JV objCVarA_JV = new CVarA_JV();
                            objCVarA_JV.JVNo = pNewJVCode;
                            objCVarA_JV.JVDate = IssueDate;
                            objCVarA_JV.TotalDebit = TotalLocalDebit;
                            objCVarA_JV.TotalCredit = TotalLocalCredit;
                            objCVarA_JV.Journal_ID = JournalTypeID;
                            objCVarA_JV.JVType_ID = JVTypeID;
                            objCVarA_JV.ReceiptNo = InvoiceSerial;
                            objCVarA_JV.RemarksHeader = "يومية مبيعات استحقاق" + " - " + IssueDate.ToString("yyyy/MM/dd");
                            objCVarA_JV.Deleted = false;
                            objCVarA_JV.Posted = false; // false in desktop
                            objCVarA_JV.IsSysJv = true;
                            objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                            objCVarA_JV.TransType_ID = 0; //null
                           
                            objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                            checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                            if (checkException == null)
                            {
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                                for (int j = 0; j < objCA_JVDetails.lstCVarA_JVDetails.Count; j++)
                                    objCA_JVDetails.lstCVarA_JVDetails[j].JV_ID = objCVarA_JV.ID;
                                checkException = objCA_JVDetails.SaveMethod(objCA_JVDetails.lstCVarA_JVDetails);
                                #region Adding to SL_InvoiceJVs
                                for (int l = 0; l < dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Count; l++)
                                {
                                    CVarSL_InvoiceJVs objCVarSL_InvoiceJVs = new CVarSL_InvoiceJVs();
                                    objCVarSL_InvoiceJVs.Forwarding_InvoiceID = dtInvoices.lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs[l].ID;
                                    objCVarSL_InvoiceJVs.JVID1 = objCVarA_JV.ID;
                                    objCVarSL_InvoiceJVs.JVID2 = 0;
                                    objCVarSL_InvoiceJVs.VoucherID = 0;
                                    objCVarSL_InvoiceJVs.VoucherType = 0;
                                    objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs.Add(objCVarSL_InvoiceJVs);
                                    checkException = objCSL_InvoiceJVs.SaveMethod(objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs);
                                    if (checkException == null)
                                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "ShippingLink_InvoicesJvs", objCVarSL_InvoiceJVs.ID, "I");
                                    else
                                        strMessage = "An error occured while inserting in SL_InvoiceJVs";

                                    //CInvoiceHeader objCInvoiceHeader = new CInvoiceHeader();
                                    //objCInvoiceHeader.UpdateList(" IsAudited = 1  WHERE ID=" + ArrSelectedIDs[i]);
                                    objCCustomizedDBCall.CallStringFunction("[ShipLinkKadmar].dbo.InvoiceHeader SET IsAudited = 1 WHERE ID = " + ArrSelectedIDs[i]);


                                }



                                #endregion Adding to SL_InvoiceJVs
                            }
                            else
                                strMessage = "An error occured during saving JV1.";
                        }
                        else
                            strMessage = "Please, specify Journal Type and JV Type in the JVDefaults table at row with ID=27";
                        #endregion Actual Generation for JV1, JVDetails & SL_InvoiceJVs
                    }
                    else if (strMessage == "") //coz if its not empty from a prev. place(like CurencyDetails) then i return the first message
                        strMessage = "Total debit is not equal to the total credit.";
                }
                #endregion JV1
            } //of for (int i = 0; i < ArrSelectedIDs.Length && strMessage == ""; i++)
            #region JV2 //قيود السداد
            if (pIsJV1AndJV2 && strMessage == "")
                //strMessage = Insert_JV2_OneEgypt(pPostedSelectedIDs, DateTime.ParseExact(pJVDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture));

                strMessage = Insert_JV2_OneEgypt(pPostedSelectedIDs, pJVDate);
            #endregion JV2 //قيود السداد
            return strMessage;
        }
        private string Insert_JV2_OneEgypt(string pInvoiceIDs, DateTime IssueDate)
        {
            string strMessage = "";
            //int constVoucherCashIn = 10;
            //int constVoucherCashOut = 20;
            int constVoucherChequeIn = 30;
            //int constVoucherChequeOut = 40;
            CA_VoucherDetails objCA_VoucherDetails = new CA_VoucherDetails();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CA_JVDetails objCA_JVDetails = new CA_JVDetails();
            CA_JVDetails objCA_JVDetails_Grouped = new CA_JVDetails();
            int JournalTypeID = 0;
            int JVTypeID = 0;
            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            Exception checkException = null;
            CvwSL_LinkingInvoiceTypeJournal objCSL_LinkingInvoiceTypeJournal = new CvwSL_LinkingInvoiceTypeJournal();
            CvwSL_GetPaidInvoice_ByCheque dt_Invoices = new CvwSL_GetPaidInvoice_ByCheque();
            checkException = dt_Invoices.GetList("WHERE ID IN (" + pInvoiceIDs + ")");
            //if (dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count == 0)
            //    strMessage = "An invoice has JV1 generated, but no payment details to generate JV2.";
            CJVDefaults objCJVDefaults = new CJVDefaults();
            checkException = objCJVDefaults.GetList("WHERE TransTypeID IN (27)");
            #region Prepare JV2 data and saving ChequeVoucher if any
            for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count && strMessage == ""; m++)
            {
               
                Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated.CvwSL_PaymentHeader dtPaymentHeader = new Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated.CvwSL_PaymentHeader();
                checkException = dtPaymentHeader.GetList("WHERE InvoiceHeaderID=" + dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID);
                CvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt dtPaymentDetails = new CvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt();
                checkException = dtPaymentDetails.GetList("WHERE InvoiceHeaderID=" + dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID);
                #region Invoice Data
                string InvoiceSerial = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt[0].invoiceserial.ToString();
                string ContainerDescription = dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].Cont_Desc;
                string ClientName = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt[0].ClientName.ToString().Replace("'", "");
                string BillNumber = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt[0].BillNumber;
                string InvoiceType = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt[0].InvTypeName;
                string VoyageNumber = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt[0].VoyageNumber;
                JournalTypeID = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt[0].Journal_ID;
                JVTypeID = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt[0].JVType_ID;
                int InvoiceTypeID = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt[0].InvoiceTypeID;
                int ERP_AccountID = 0;
                int ERP_SubAccountID = 0;
                int BankID = 0;

                if (JournalTypeID == 0 && objCJVDefaults.lstCVarJVDefaults.Count > 0)
                    JournalTypeID = objCJVDefaults.lstCVarJVDefaults[0].JournalTypeID;
                if (JVTypeID == 0 && objCJVDefaults.lstCVarJVDefaults.Count > 0)
                    JVTypeID = objCJVDefaults.lstCVarJVDefaults[0].JVTypeID;

                #endregion Invoice Data
                #region Adding Voucher & Updating SL_InvoiceJVs with VoucherID & VoucherType
                var dtChequeOnlyPayment = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.Where(s => s.PaymentTypeID == 2); //Cheque PaymentType
                var distinct_Cheque_No = dtChequeOnlyPayment
                    .GroupBy(d => d.Remarks)
                    .Select(g => new
                    {
                        ChequeNumber = g.First().Remarks
                    });
                for (int n = 0; n < distinct_Cheque_No.Count() && strMessage == ""; n++)
                {
                    int CurrencyID = 0; //this depends on the i am sure that there is no payment without details and that the details currency is uniqe among payment
                    decimal ExchangeRate = 1; //this depends that i am sure that there is no payment without details and that the details currency is unique among payment
                    string ChequeNumber = distinct_Cheque_No.ElementAt(n).ChequeNumber;
                    for (int o = 0; o < dtChequeOnlyPayment.Count() && strMessage == ""; o++)
                    {
                        if (dtChequeOnlyPayment.ElementAt(o).Remarks == ChequeNumber && ChequeNumber != "0") //To filter details to get only the details for that voucher header(i.e. PaymentHeader)(i.e. Each Cheque number details is in one Voucher)
                        {
                            BankID = dtChequeOnlyPayment.ElementAt(o).Bank_ID;
                            checkException = objCSL_LinkingInvoiceTypeJournal.GetList("WHERE InvoiceTypeID=" + dtChequeOnlyPayment.ElementAt(o).InvoiceTypeID);
                            if (objCSL_LinkingInvoiceTypeJournal.lstCVarvwSL_LinkingInvoiceTypeJournal.Count > 0)
                            {
                                CurrencyID = dtChequeOnlyPayment.ElementAt(o).CurrencyID;
                                objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");
                                if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                                {
                                    ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;
                                    ERP_AccountID = objCSL_LinkingInvoiceTypeJournal.lstCVarvwSL_LinkingInvoiceTypeJournal[0].AccountID;
                                    //ERP_SubAccountID = Convert.ToString(dt_MOL_DailyClientAccounts.Select("CurrencyID=" + Currency_ID.ToString())[0]["SubAccountID"]);
                                }
                                else
                                {
                                    CvwCurrencies objCCurrency = new CvwCurrencies();
                                    objCCurrency.GetList("WHERE ID=" + CurrencyID);
                                    strMessage = objCCurrency.lstCVarvwCurrencies[0].Code + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                                }
                                #region Fill Cheque VoucherDetails (i.e. Cheque PaymentDetails)
                                CVarA_VoucherDetails objCVarA_VoucherDetails = new CVarA_VoucherDetails();
                                //objCVarA_VoucherDetails.VoucherID = pID;
                                objCVarA_VoucherDetails.Value = dtChequeOnlyPayment.ElementAt(o).Amount;
                                objCVarA_VoucherDetails.Description = InvoiceSerial + " - " + ClientName + " - " + BillNumber;
                                if (dtChequeOnlyPayment.ElementAt(o).ReferenceNumber.Trim().ToUpper() == "1") //"STLL")
                                {
                                    BankID = dtChequeOnlyPayment.ElementAt(o).Bank_ID;
                                    objCVarA_VoucherDetails.AccountID = ERP_AccountID == 0 ? dtChequeOnlyPayment.ElementAt(o).Ref_AccountID : ERP_AccountID;
                                    objCVarA_VoucherDetails.SubAccountID = ERP_SubAccountID == 0 ? dtChequeOnlyPayment.ElementAt(o).Ref_SubAccountID : ERP_SubAccountID;
                                }
                                else
                                {
                                    objCVarA_VoucherDetails.AccountID = dtChequeOnlyPayment.ElementAt(o).Ref_AccountID;
                                    objCVarA_VoucherDetails.SubAccountID = dtChequeOnlyPayment.ElementAt(o).Ref_SubAccountID;
                                }
                                objCVarA_VoucherDetails.CostCenterID = 0;
                                objCVarA_VoucherDetails.IsDocumented = false;
                                objCVarA_VoucherDetails.InvoiceID = dtChequeOnlyPayment.ElementAt(o).InvoiceHeaderID;
                                objCVarA_VoucherDetails.VoucherType = constVoucherChequeIn;
                               
                                objCA_VoucherDetails.lstCVarA_VoucherDetails.Add(objCVarA_VoucherDetails);
                                #endregion Fill Cheque VoucherDetails (i.e. Cheque PaymentDetails)
                            }
                            else
                            {
                                strMessage = "InvoiceType for invoice (" + dtChequeOnlyPayment.ElementAt(o).invoiceserial + ") is not linked.";
                            }
                        } //if (dtChequeOnlyPayment.ElementAt(o).Remarks == ChequeNumber && ChequeNumber != "0")
                    } //for (int o = 0; o < dtChequeOnlyPayment.Count() && strMessage == ""; o++)
                    #region Save VoucherHeader And Details
                    if (strMessage == "" && objCA_VoucherDetails.lstCVarA_VoucherDetails.Count > 0) //Details is OK so insert Voucherheader then details
                    {
                        string pNewCode = objCCustomizedDBCall.A_ChequeVoucher_GetCodeByBank("A_ChequeVoucher_GetCodeByBank", IssueDate, BankID, constVoucherChequeIn, 0);
                        decimal Total = objCA_VoucherDetails.lstCVarA_VoucherDetails.Sum(s => s.Value);
                        CVarA_Voucher objCVarA_Voucher = new CVarA_Voucher();
                        objCVarA_Voucher.Code = pNewCode;
                        objCVarA_Voucher.VoucherDate = IssueDate;
                        objCVarA_Voucher.SafeID = 0;
                        objCVarA_Voucher.CurrencyID = CurrencyID; //come from last details, i depend that there must be details with same currency for same header
                        objCVarA_Voucher.ExchangeRate = ExchangeRate;
                        objCVarA_Voucher.ChargedPerson = ClientName;
                        objCVarA_Voucher.Notes = "يومية مبيعات سداد" + " - " + IssueDate.ToString("yyyy/MM/dd");
                        objCVarA_Voucher.TaxID = 0;
                        objCVarA_Voucher.TaxValue = 0;
                        objCVarA_Voucher.TaxSign = 1;
                        objCVarA_Voucher.TaxID2 = 0;
                        objCVarA_Voucher.TaxValue2 = 0;
                        objCVarA_Voucher.TaxSign2 = 1;
                        objCVarA_Voucher.Total = Total;
                        objCVarA_Voucher.TotalAfterTax = Total;
                        objCVarA_Voucher.Approved = false; // false in desktop
                        objCVarA_Voucher.Posted = false;   // false in desktop
                        objCVarA_Voucher.IsAGInvoice = false;
                        objCVarA_Voucher.AGInvType_ID = 0;
                        objCVarA_Voucher.Inv_No = 0;
                        objCVarA_Voucher.InvoiceID = 0;
                        ////Set from posting screen
                        //objCVarA_Voucher.JVID1 = pJVID1;
                        //objCVarA_Voucher.JVID2 = pJVID2;
                        //objCVarA_Voucher.JVID3 = pJVID3;
                        //objCVarA_Voucher.JVID4 = pJVID4;
                        objCVarA_Voucher.SalesManID = 0;
                        objCVarA_Voucher.forwOperationID = 0;
                        objCVarA_Voucher.IsCustomClearance = false;
                        objCVarA_Voucher.TransType_ID = 0;
                        objCVarA_Voucher.VoucherType = constVoucherChequeIn;
                        objCVarA_Voucher.IsCash = false;
                        objCVarA_Voucher.IsCheque = true;
                        objCVarA_Voucher.PrintDate = IssueDate;// DateTime.Parse("01-01-1900");
                        objCVarA_Voucher.ChequeNo = ChequeNumber;
                        objCVarA_Voucher.ChequeDate = IssueDate;
                        objCVarA_Voucher.BankID = BankID;
                        objCVarA_Voucher.OtherSideBankName = "0";
                        objCVarA_Voucher.CollectionDate = IssueDate;
                        objCVarA_Voucher.CollectionExpense = 0;
                        CA_Voucher objCA_Voucher = new CA_Voucher();
                        objCA_Voucher.lstCVarA_Voucher.Add(objCVarA_Voucher);
                        checkException = objCA_Voucher.SaveMethod(objCA_Voucher.lstCVarA_Voucher);
                        if (checkException == null)
                        {
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_ChequeInVoucher", objCVarA_Voucher.ID, "I");
                            for (int i = 0; i < objCA_VoucherDetails.lstCVarA_VoucherDetails.Count; i++)
                                objCA_VoucherDetails.lstCVarA_VoucherDetails[i].VoucherID = objCVarA_Voucher.ID;
                            checkException = objCA_VoucherDetails.SaveMethod(objCA_VoucherDetails.lstCVarA_VoucherDetails);
                            if (checkException == null)
                                objCCustomizedDBCall.A_ChequeInVouchers_Posting("A_ChequeInVouchers_Posting", "," + objCVarA_Voucher.ID + ",", IssueDate, WebSecurity.CurrentUserId);
                            CSL_InvoiceJVs objCSL_InvoiceJVs = new CSL_InvoiceJVs();
                            checkException = objCSL_InvoiceJVs.UpdateList("VoucherID=" + objCVarA_Voucher.ID + ", VoucherType=" + constVoucherChequeIn + " WHERE Forwarding_InvoiceID=" + dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID);
                            objCA_VoucherDetails.lstCVarA_VoucherDetails.Clear();
                        }
                        else
                            strMessage = checkException.Message;
                    }
                    #endregion Save VoucherHeader And Details
                } //for (int n = 0; n < distinct_Cheque_No.Count() && strMessage == ""; n++)
                #endregion Adding Voucher & Updating SL_InvoiceJVs with VoucherID & VoucherType

                var dtNonChequePayment = dtPaymentDetails.lstCVarvwSL_ChequePaymentDetails_SelectByInvoiceID_OneEgypt.Where(s => s.PaymentTypeID != 2); //Cheque PaymentType
                for (int i = 0; i < dtNonChequePayment.Count(); i++)
                {
                    int CurrencyID = 0;
                    decimal ExchangeRate = 1;
                    CurrencyID = dtNonChequePayment.ElementAt(i).CurrencyID;
                    objCCurrencyDetails.GetList("WHERE Currency_ID=" + CurrencyID + " AND FromDate <='" + IssueDate.ToString("yyyyMMdd") + "' AND ToDate>='" + IssueDate.ToString("yyyyMMdd") + "'");
                    if (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0)
                    {
                        ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate;

                        #region طرف خزنة او بنك مدين
                        CVarA_JVDetails objCVarA_JVDetails1 = new CVarA_JVDetails();
                        //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                        if (dtNonChequePayment.ElementAt(i).PaymentTypeID == 1)
                            objCVarA_JVDetails1.Account_ID = dtNonChequePayment.ElementAt(i).Safe_Account_ID;
                        else
                            objCVarA_JVDetails1.Account_ID = dtNonChequePayment.ElementAt(i).Bank_Account_ID;
                        //objCVarA_JVDetails1.SubAccount_ID = 0;
                        //objCVarA_JVDetails1.CostCenter_ID = 0;
                        objCVarA_JVDetails1.Debit = dtNonChequePayment.ElementAt(i).Amount;
                        objCVarA_JVDetails1.Credit = 0;
                        objCVarA_JVDetails1.Currency_ID = CurrencyID;
                        objCVarA_JVDetails1.ExchangeRate = ExchangeRate;
                        objCVarA_JVDetails1.LocalDebit = objCVarA_JVDetails1.Debit * ExchangeRate;
                        objCVarA_JVDetails1.LocalCredit = 0;
                        objCVarA_JVDetails1.Description = "0";
                        objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails1);
                        #endregion طرف خزنة او بنك مدين
                        #region طرف القوالب دائن
                        CVarA_JVDetails objCVarA_JVDetails2 = new CVarA_JVDetails();
                        //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                        objCVarA_JVDetails2.Account_ID = dtNonChequePayment.ElementAt(i).ERP_Client_AccountID;
                        objCVarA_JVDetails2.SubAccount_ID = dtNonChequePayment.ElementAt(i).ERP_Client_SubAccountID;
                        //objCVarA_JVDetails2.CostCenter_ID = 0;
                        objCVarA_JVDetails2.Debit = 0;
                        objCVarA_JVDetails2.Credit = dtNonChequePayment.ElementAt(i).Amount;
                        objCVarA_JVDetails2.Currency_ID = CurrencyID;
                        objCVarA_JVDetails2.ExchangeRate = ExchangeRate;
                        objCVarA_JVDetails2.LocalDebit = 0;
                        objCVarA_JVDetails2.LocalCredit = objCVarA_JVDetails2.Credit * ExchangeRate;
                        objCVarA_JVDetails2.Description = InvoiceSerial + " - " + ClientName.Replace("'", "") + " - " + BillNumber + " - " + ContainerDescription;
                        objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails2);
                        #endregion طرف القوالب دائن
                        /********************if its to add multiple invoices altogether********************/

                    }
                    else
                    {
                        CvwCurrencies objCCurrency = new CvwCurrencies();
                        objCCurrency.GetList("WHERE ID=" + CurrencyID);
                        strMessage = objCCurrency.lstCVarvwCurrencies[0].Code + " exchange rate is not entered for " + IssueDate.ToString("dd/MM/yyyy");
                    }
                }
            } // of for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count && strMessage == ""; m++)
            #endregion Prepare JV2 data and saving ChequeVoucher if any
            /********************if its to add multiple invoices altogether********************/
            if (objCA_JVDetails.lstCVarA_JVDetails.Count > 0 && strMessage == "")
            {
                #region Group JVDetails with same Account, SubAccount, Description
                var objCA_JVDetails_Temp = objCA_JVDetails.lstCVarA_JVDetails
                    .GroupBy(g => new { g.Currency_ID, g.ExchangeRate, g.Account_ID, g.SubAccount_ID, g.CostCenter_ID, g.Description })
                    .Select(s => new
                    {
                        //JV_ID = objCVarA_JV.ID,
                        Account_ID = s.First().Account_ID
            ,
                        SubAccount_ID = s.First().SubAccount_ID
            ,
                        CostCenter_ID = 0
            ,
                        Debit = s.Sum(x => x.Debit)
            ,
                        Credit = s.Sum(x => x.Credit)
            ,
                        Currency_ID = s.First().Currency_ID
            ,
                        ExchangeRate = s.First().ExchangeRate
            ,
                        LocalDebit = s.Sum(x => x.LocalDebit)
            ,
                        LocalCredit = s.Sum(x => x.LocalCredit)
            ,
                        Description = s.First().Description
                    });
                //Copy to an object from Class CA_JVDetails, so i can use the SaveMethod() generated
                for (int l = 0; l < objCA_JVDetails_Temp.Count(); l++)
                {
                    CVarA_JVDetails objCVarA_JVDetails_Grouped = new CVarA_JVDetails();
                    //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                    objCVarA_JVDetails_Grouped.Account_ID = objCA_JVDetails_Temp.ElementAt(l).Account_ID;
                    objCVarA_JVDetails_Grouped.SubAccount_ID = objCA_JVDetails_Temp.ElementAt(l).SubAccount_ID;
                    objCVarA_JVDetails_Grouped.CostCenter_ID = 0;
                    objCVarA_JVDetails_Grouped.Debit = objCA_JVDetails_Temp.ElementAt(l).Debit;
                    objCVarA_JVDetails_Grouped.Credit = objCA_JVDetails_Temp.ElementAt(l).Credit;
                    objCVarA_JVDetails_Grouped.Currency_ID = objCA_JVDetails_Temp.ElementAt(l).Currency_ID;
                    objCVarA_JVDetails_Grouped.ExchangeRate = objCA_JVDetails_Temp.ElementAt(l).ExchangeRate;
                    objCVarA_JVDetails_Grouped.LocalDebit = objCA_JVDetails_Temp.ElementAt(l).LocalDebit;
                    objCVarA_JVDetails_Grouped.LocalCredit = objCA_JVDetails_Temp.ElementAt(l).LocalCredit;
                    objCVarA_JVDetails_Grouped.Description = objCA_JVDetails_Temp.ElementAt(l).Description;

                    objCA_JVDetails_Grouped.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Grouped);
                }
                #endregion Group JVDetails with same Account, SubAccount, Description
                #region Save Header
                decimal TotalPayment = objCA_JVDetails.lstCVarA_JVDetails.Sum(s => s.LocalDebit);//sum from the original details before grouping
                string pNewJVCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", IssueDate, WebSecurity.CurrentUserId, JournalTypeID);
                CVarA_JV objCVarA_JV = new CVarA_JV();
                objCVarA_JV.JVNo = pNewJVCode;
                objCVarA_JV.JVDate = IssueDate;
                objCVarA_JV.TotalDebit = TotalPayment;
                objCVarA_JV.TotalCredit = TotalPayment;
                objCVarA_JV.Journal_ID = JournalTypeID;
                objCVarA_JV.JVType_ID = JVTypeID;
                objCVarA_JV.ReceiptNo = "";
                objCVarA_JV.RemarksHeader = "يومية مبيعات سداد" + " - " + IssueDate.ToString("yyyy/MM/dd");
                objCVarA_JV.Deleted = false;
                objCVarA_JV.Posted = false; // false in desktop
                objCVarA_JV.IsSysJv = true;
                objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                CA_JV objCA_JV = new CA_JV();
                objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                #endregion Save Header
                #region Save Details
                if (checkException == null)
                {
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                    for (int j = 0; j < objCA_JVDetails_Grouped.lstCVarA_JVDetails.Count; j++)
                        objCA_JVDetails_Grouped.lstCVarA_JVDetails[j].JV_ID = objCVarA_JV.ID;
                    checkException = objCA_JVDetails_Grouped.SaveMethod(objCA_JVDetails_Grouped.lstCVarA_JVDetails);
                    CSL_InvoiceJVs objCSL_InvoiceJVs = new CSL_InvoiceJVs();
                    checkException = objCSL_InvoiceJVs.UpdateList("JVID2=" + objCVarA_JV.ID + " WHERE Forwarding_InvoiceID IN (" + pInvoiceIDs + ")");
                    if (checkException == null)
                    {
                        for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count; m++)
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVs_IDofShippingInvoice", dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID, "U");
                    }
                }
                else
                {
                    strMessage = checkException.Message;
                }
                #endregion Save Details
            } //if (objCA_JVDetails.lstCVarA_JVDetails.Count > 0) 

            return strMessage;
        }
        #endregion OneEgypt fns
    }
}



/*
 * #region Add JV for Cash إدخال قيد الكاش
                if (objCA_JVDetails_Cash.lstCVarA_JVDetails.Count > 0 && strMessage == "")
                {
                    #region Group JVDetails with same Account, SubAccount, Description
                    CA_JVDetails objCA_JVDetails_Grouped = new CA_JVDetails();
                    var objCA_JVDetails_Temp = objCA_JVDetails_Cash.lstCVarA_JVDetails
                        .GroupBy(g => new { g.Currency_ID, g.ExchangeRate, g.Account_ID, g.SubAccount_ID, g.CostCenter_ID, g.Description })
                        .Select(s => new
                        {
                            //JV_ID = objCVarA_JV.ID,
                            Account_ID = s.First().Account_ID
                ,
                            SubAccount_ID = s.First().SubAccount_ID
                ,
                            CostCenter_ID = 0
                ,
                            Debit = s.Sum(x => x.Debit)
                ,
                            Credit = s.Sum(x => x.Credit)
                ,
                            Currency_ID = s.First().Currency_ID
                ,
                            ExchangeRate = s.First().ExchangeRate
                ,
                            LocalDebit = s.Sum(x => x.LocalDebit)
                ,
                            LocalCredit = s.Sum(x => x.LocalCredit)
                ,
                            Description = s.First().Description
                        });
                    //Copy to an object from Class CA_JVDetails, so i can use the SaveMethod() generated
                    for (int l = 0; l < objCA_JVDetails_Temp.Count(); l++)
                    {
                        CVarA_JVDetails objCVarA_JVDetails_Grouped = new CVarA_JVDetails();
                        //objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                        objCVarA_JVDetails_Grouped.Account_ID = objCA_JVDetails_Temp.ElementAt(l).Account_ID;
                        objCVarA_JVDetails_Grouped.SubAccount_ID = objCA_JVDetails_Temp.ElementAt(l).SubAccount_ID;
                        objCVarA_JVDetails_Grouped.CostCenter_ID = 0;
                        objCVarA_JVDetails_Grouped.Debit = objCA_JVDetails_Temp.ElementAt(l).Debit;
                        objCVarA_JVDetails_Grouped.Credit = objCA_JVDetails_Temp.ElementAt(l).Credit;
                        objCVarA_JVDetails_Grouped.Currency_ID = objCA_JVDetails_Temp.ElementAt(l).Currency_ID;
                        objCVarA_JVDetails_Grouped.ExchangeRate = objCA_JVDetails_Temp.ElementAt(l).ExchangeRate;
                        objCVarA_JVDetails_Grouped.LocalDebit = objCA_JVDetails_Temp.ElementAt(l).LocalDebit;
                        objCVarA_JVDetails_Grouped.LocalCredit = objCA_JVDetails_Temp.ElementAt(l).LocalCredit;
                        objCVarA_JVDetails_Grouped.Description = objCA_JVDetails_Temp.ElementAt(l).Description;

                        objCA_JVDetails_Grouped.lstCVarA_JVDetails.Add(objCVarA_JVDetails_Grouped);
                    }
                    #endregion Group JVDetails with same Account, SubAccount, Description
                    #region Save Header
                    decimal TotalPayment = objCA_JVDetails_Cash.lstCVarA_JVDetails.Sum(s => s.LocalDebit);//sum from the original details before grouping
                    string pNewJVCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", IssueDate, WebSecurity.CurrentUserId, JournalTypeID);
                    CVarA_JV objCVarA_JV = new CVarA_JV();
                    objCVarA_JV.JVNo = pNewJVCode;
                    objCVarA_JV.JVDate = IssueDate;
                    objCVarA_JV.TotalDebit = TotalPayment;
                    objCVarA_JV.TotalCredit = TotalPayment;
                    objCVarA_JV.Journal_ID = JournalTypeID;
                    objCVarA_JV.JVType_ID = JVTypeID;
                    objCVarA_JV.ReceiptNo = "";
                    objCVarA_JV.RemarksHeader = "يومية مبيعات سداد" + " - " + IssueDate.ToString("yyyy/MM/dd");
                    objCVarA_JV.Deleted = false;
                    objCVarA_JV.Posted = false; // false in desktop
                    objCVarA_JV.IsSysJv = true;
                    objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                    CA_JV objCA_JV = new CA_JV();
                    objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                    checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                    #endregion Save Header
                    #region Save Details
                    if (checkException == null)
                    {
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, "I");
                        for (int j = 0; j < objCA_JVDetails_Grouped.lstCVarA_JVDetails.Count; j++)
                            objCA_JVDetails_Grouped.lstCVarA_JVDetails[j].JV_ID = objCVarA_JV.ID;
                        checkException = objCA_JVDetails_Grouped.SaveMethod(objCA_JVDetails_Grouped.lstCVarA_JVDetails);
                        //CSL_InvoiceJVs objCSL_InvoiceJVs = new CSL_InvoiceJVs();
                        //checkException = objCSL_InvoiceJVs.UpdateList("JVID2=" + objCVarA_JV.ID + " WHERE Shipping_InvoiceID IN (" + pInvoiceIDs + ")");
                        objCCustomizedDBCall.SP_InsertUpdateSLInvoiceJVs_Item(pInvoiceIDs, objCVarA_JV.ID);
                        if (checkException == null)
                        {
                            for (int m = 0; m < dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque.Count; m++)
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVs_IDofShippingInvoice", dt_Invoices.lstCVarvwSL_GetPaidInvoice_ByCheque[m].ID, "U");
                        }
                    } 
                    else
                    {
                        strMessage = checkException.Message;
                    }
                    #endregion Save Details
                } //of if (objCA_JVDetails.lstCVarA_JVDetails.Count > 0 && strMessage == "")
                #endregion Add JV for Cash إدخال قيد الكاش
 */




