using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.CustomizedSPCall;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;


namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class PurchaseInvoiceController : ApiController
    {
        #region Purchase Invoice Header

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            Int32 _RowCount_OpeningBalance = 0;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            objCvwAccPartners.GetListFilter(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            //objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);

            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            objCvwPurchaseInvoice.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            CvwPurchaseInvoice_OpeningBalance objCvwPurchaseInvoice_OpeningBalance = new CvwPurchaseInvoice_OpeningBalance();
            objCvwPurchaseInvoice_OpeningBalance.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);


            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice)
                , _RowCount
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners) : null  //data[2]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes) : null //data[3]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) : null //data[4]
                ,new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance)
                , _RowCount_OpeningBalance
            };
        }

        [HttpGet, HttpPost]
        public object[] PurchaseInvoice_LoadWithDetails(Int64 pPurchaseInvoiceID, string pWhereClauseInvoiceOperations
            , string pWhereClauseInvoiceClients, string pWhereClauseInvoiceSuppliers)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItem = new CvwPurchaseInvoiceItem();


            CvwPurchaseInvoice_OpeningBalance objCvwPurchaseInvoice_OpeningBalance = new CvwPurchaseInvoice_OpeningBalance();
            CvwPurchaseInvoiceItem_OpeningBalance objCvwPurchaseInvoiceItem_OpeningBalance = new CvwPurchaseInvoiceItem_OpeningBalance();


            CvwOperations objCvwOperations = new CvwOperations();
            CvwOperationPartners objCvwOperationClients = new CvwOperationPartners();
            CvwOperationPartners objCvwOperationSuppliers = new CvwOperationPartners();
            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            CSC_Stores cSC_Stores = new CSC_Stores();
            CPurchaseItem cPurchaseItem = new CPurchaseItem();
            CCurrencies objCCurrencies = new CCurrencies();
            CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
            objCCurrencies.GetListPaging(9999, 1, " Where Code like '%USD%'", " ID", out _RowCount);
            if (objCCurrencies.lstCVarCurrencies.Count > 0)
                objCvwCurrencyDetails.GetList("WHERE ID=" + objCCurrencies.lstCVarCurrencies[0].ID + " AND GETDATE() BETWEEN FromDate AND ToDate");

            checkException = objCvwOperationClients.GetList(pWhereClauseInvoiceClients);
            checkException = objCvwOperationSuppliers.GetList(pWhereClauseInvoiceSuppliers);
            checkException = objCvwOperations.GetListPaging(99999, 1, pWhereClauseInvoiceOperations, "HouseNumber", out _RowCount);
            checkException = objCvwPurchaseInvoice.GetListPaging(99999, 1, "WHERE ID=" + pPurchaseInvoiceID.ToString(), "ID", out _RowCount);
            checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID=" + pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");

            checkException = objCvwPurchaseInvoice_OpeningBalance.GetListPaging(99999, 1, "WHERE ID=" + pPurchaseInvoiceID.ToString(), "ID", out _RowCount);
            checkException = objCvwPurchaseInvoiceItem_OpeningBalance.GetList("WHERE PurchaseInvoiceID=" + pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");



            checkException = objCPaymentTerms.GetList("ORDER BY Name");
            checkException = cSC_Stores.GetList("Where 1 = 1");
            checkException = cPurchaseItem.GetList("Where IsNull(IsFlexi , 0 ) = 1");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice.Count == 0 ? null : new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0]) //pPurchaseInvoiceHeader = pData[0]
                , new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem.lstCVarvwPurchaseInvoiceItem) //pPurchaseInvoiceItems = pData[1]
                , serializer.Serialize(objCvwOperations.lstCVarvwOperations) //pData[2]
                , new JavaScriptSerializer().Serialize(objCvwOperationClients.lstCVarvwOperationPartners) //pPurchaseInvoiceClients = pData[3]
                , new JavaScriptSerializer().Serialize(objCvwOperationSuppliers.lstCVarvwOperationPartners) //pPurchaseInvoiceSuppliers = pData[4]
                , new JavaScriptSerializer().Serialize(objCPaymentTerms.lstCVarPaymentTerms) //pPaymentTerms = pData[5]
                , new JavaScriptSerializer().Serialize(cSC_Stores.lstCVarSC_Stores) //Stores = pData[6]
                , new JavaScriptSerializer().Serialize(cPurchaseItem.lstCVarPurchaseItem) //FlexiItem = pData[7]
                
                , new JavaScriptSerializer().Serialize(objCCurrencies.lstCVarCurrencies)//8
                , new JavaScriptSerializer().Serialize(objCvwCurrencyDetails.lstCVarvwCurrencyDetails)//9
                ,objCvwPurchaseInvoice_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance.Count == 0 ? null : new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance[0]) //pPurchaseInvoiceHeader = pData[0]
                , new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem_OpeningBalance.lstCVarvwPurchaseInvoiceItem_OpeningBalance) //pPurchaseInvoiceItems = pData[1]
            };
        }
        [HttpGet, HttpPost]
        public object[] PurchaseInvoice_GetDataToPrint(Int64 pPrintedPurchaseInvoiceID)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItem = new CvwPurchaseInvoiceItem();
            CvwOperations objCvwOperationHeader = new CvwOperations();
            CvwOperations objCvwMasterOperationHeader = new CvwOperations();
            CvwDefaults objCvwDefaults = new CvwDefaults();

            checkException = objCvwPurchaseInvoice.GetListPaging(99999, 1, "WHERE ID=" + pPrintedPurchaseInvoiceID.ToString(), "ID", out _RowCount);
            checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID=" + pPrintedPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");
            checkException = objCvwOperationHeader.GetListPaging(99999, 1, "WHERE ID=" + objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].OperationID, "ID", out _RowCount);
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            if (objCvwOperationHeader.lstCVarvwOperations[0].MasterOperationID != 0)
                objCvwMasterOperationHeader.GetList(" WHERE ID = " + objCvwOperationHeader.lstCVarvwOperations[0].MasterOperationID);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0]) //pPurchaseInvoiceHeader = pData[0]
                , serializer.Serialize(objCvwPurchaseInvoiceItem.lstCVarvwPurchaseInvoiceItem) //pPurchaseInvoiceItems = pData[1]
                , serializer.Serialize(objCvwOperationHeader.lstCVarvwOperations[0]) //pOperationHeader = pData[2]
                , serializer.Serialize(objCvwDefaults.lstCVarvwDefaults[0]) //pDefaults = pData[3]
                , objCvwMasterOperationHeader.lstCVarvwOperations.Count==0 ? null : serializer.Serialize(objCvwMasterOperationHeader.lstCVarvwOperations[0]) //pMasterOperationHeader = pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] PurchaseInvoice_Save(Int64 pPurchaseInvoiceID, string pEditableCode, Int64 pOperationID
            , Int64 pClientOperationPartnerID, Int64 pClientAddressID, string pClientPrintedAddress
            , Int64 pSupplierOperationPartnerID, Int64 pSupplierAddressID, string pSupplierPrintedAddress
            , Int32 pCurrencyID, decimal pExchangeRate, string pInvoiceDate, string pNotes, Int32 pPaymentTermID
            , Int32 pInvoiceTypeID
            //LoadWithPaging parameters
            , string pWhereClausePurchaseInvoice, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            string pUpdateClause = "";
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            CPurchaseInvoice objCPurchaseInvoice = new CPurchaseInvoice();

            int constFlexiPurchaseInvoiceTypeID = 10; //FLEXI
            int constHeaterPadPurchaseInvoiceTypeID = 20; //HEATER PAD
            int constIRONPurchaseInvoiceTypeID = 30; //IRON

            int _TempRowCount = 0;
            CPurchaseInvoice objCPurchaseInvoice_IsPosted = new CPurchaseInvoice();
            objCPurchaseInvoice_IsPosted.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pPurchaseInvoiceID, "ID", out _TempRowCount);
            if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
            {
                pUpdateClause = (pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pEditableCode.ToString() + "'")) + " \n";
                pUpdateClause += (pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + pOperationID.ToString() + "'")) + " \n";
                pUpdateClause += (pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + pClientOperationPartnerID.ToString() + "'")) + " \n";
                pUpdateClause += (pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pClientAddressID.ToString() + "'")) + " \n";
                pUpdateClause += (pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pClientPrintedAddress.ToString() + "'")) + " \n";
                pUpdateClause += (pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + pSupplierOperationPartnerID.ToString() + "'")) + " \n";
                pUpdateClause += (pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pSupplierAddressID.ToString() + "'")) + " \n";
                pUpdateClause += (pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pSupplierPrintedAddress.ToString() + "'")) + " \n";
                pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID.ToString() + "'")) + " \n";
                pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate.ToString() + "'")) + " \n";
                pUpdateClause += (pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pInvoiceDate, 1) + "'"));
                pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes.ToString() + "'")) + " \n";
                pUpdateClause += (pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pPaymentTermID.ToString() + "'")) + " \n";
                pUpdateClause += (pInvoiceTypeID == 0 ? " ,InvoiceTypeID = NULL " : (" ,InvoiceTypeID = N'" + pInvoiceTypeID.ToString() + "'")) + " \n";

                pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                pUpdateClause += (" ,ModificationDate = GETDATE() ");
                pUpdateClause += " WHERE ID =" + pPurchaseInvoiceID.ToString();
                checkException = objCPurchaseInvoice.UpdateList(pUpdateClause);
            } //if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if ((CompanyName == "CHM") && checkException == null)
            {
                CPurchaseInvoiceTax objCPurchaseInvoiceTax = new CPurchaseInvoiceTax();

                CTaxLink CTaxLinkOperationPartnersSupplier = new CTaxLink();
                CTaxLinkOperationPartnersSupplier.GetList("where notes='OperationPartners' and OriginID=" + pSupplierOperationPartnerID);


                CTaxLink CTaxLink = new CTaxLink();
                CTaxLink.GetList("where notes='PurchaseInvoice' and OriginID=" + pPurchaseInvoiceID);
                CTaxLink CTaxLink2 = new CTaxLink();
                CTaxLink2.GetList("where notes='Operations' and OriginID=" + pOperationID);
                if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0 && CTaxLink.lstCVarTaxLink.Count > 0) //not posted so save
                {
                    CTaxLink objCTaxLinOperationPartners2 = new CTaxLink();
                    objCTaxLinOperationPartners2.GetList("where notes='OperationPartners' and originid=" + pClientOperationPartnerID);

                    pUpdateClause = (pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pEditableCode.ToString() + "'")) + " \n";
                    pUpdateClause += (pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + (CTaxLink2.lstCVarTaxLink.Count > 0 ? CTaxLink2.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                    pUpdateClause += (pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + (objCTaxLinOperationPartners2.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners2.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                    pUpdateClause += (pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pClientAddressID.ToString() + "'")) + " \n";
                    pUpdateClause += (pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pClientPrintedAddress.ToString() + "'")) + " \n";
                    pUpdateClause += (pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + ((CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0)) + "'")) + " \n";
                    pUpdateClause += (pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pSupplierAddressID.ToString() + "'")) + " \n";
                    pUpdateClause += (pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pSupplierPrintedAddress.ToString() + "'")) + " \n";
                    pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID.ToString() + "'")) + " \n";
                    pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate.ToString() + "'")) + " \n";
                    pUpdateClause += (pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pInvoiceDate, 1) + "'"));
                    pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes.ToString() + "'")) + " \n";
                    pUpdateClause += (pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pPaymentTermID.ToString() + "'")) + " \n";
                    pUpdateClause += (pInvoiceTypeID == 0 ? " ,InvoiceTypeID = NULL " : (" ,InvoiceTypeID = N'" + pInvoiceTypeID.ToString() + "'")) + " \n";

                    pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                    pUpdateClause += (" ,ModificationDate = GETDATE() ");
                    pUpdateClause += " WHERE ID =" + (CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0);
                    checkException = objCPurchaseInvoiceTax.UpdateList(pUpdateClause);
                }

            }
            checkException = objCvwPurchaseInvoice.GetListPaging(pPageSize, pPageNumber, pWhereClausePurchaseInvoice, "ID", out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice)
            };
        }


        [HttpGet, HttpPost]
        public object[] PurchaseInvoice_Delete(String pDeletedPurchaseInvoiceIDs, Int64 pOperationID)
        {
            int _RowCount = 0;
            bool _result = false;
            Exception checkException = null;
            CPurchaseInvoice objCPurchaseInvoice = new CPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            checkException = objCPurchaseInvoice.DeleteList("WHERE ID IN (" + pDeletedPurchaseInvoiceIDs + ")");
            if (checkException == null)
                _result = true;
            #region Get Returned Data
            objCvwPurchaseInvoice.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID + " OR MasterOperationID=" + pOperationID, "InvoiceNumber", out _RowCount);
            #endregion Get Returned Data

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]{
                _result
                , serializer.Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice) //pData[1]
            };
        }
        [HttpGet, HttpPost]
        public object[] PurchaseInvoice_OpeningBalance_Delete(String pDeletedPurchaseInvoiceIDs, Int64 pOperationID)
        {
            int _RowCount = 0;
            bool _result = false;
            Exception checkException = null;
            CPurchaseInvoice_OpeningBalance objCPurchaseInvoice_OpeningBalance = new CPurchaseInvoice_OpeningBalance();
            CvwPurchaseInvoice_OpeningBalance objCvwPurchaseInvoice_OpeningBalance = new CvwPurchaseInvoice_OpeningBalance();
            checkException = objCPurchaseInvoice_OpeningBalance.DeleteList("WHERE ID IN (" + pDeletedPurchaseInvoiceIDs + ")");
            if (checkException == null)
                _result = true;
            #region Get Returned Data
            objCvwPurchaseInvoice_OpeningBalance.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID + " OR MasterOperationID=" + pOperationID, "InvoiceNumber", out _RowCount);
            #endregion Get Returned Data

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]{
                _result
                , serializer.Serialize(objCvwPurchaseInvoice_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance) //pData[1]
            };
        }
        #endregion Purchase Invoice Header

        #region PurchaseInvoiceItem
        [HttpGet, HttpPost]
        public Object[] PurchaseInvoiceItem_LoadAll(string pWhereClausePurchaseInvoiceItem, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItem = new CvwPurchaseInvoiceItem();
            checkException = objCvwPurchaseInvoiceItem.GetListPaging(999999, 1, pWhereClausePurchaseInvoiceItem, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwPurchaseInvoiceItem.lstCVarvwPurchaseInvoiceItem)
            };
        }
        [HttpGet, HttpPost]
        public Object[] PurchaseInvoiceItem_FillModalControls(string pWhereClausePurchaseItem)
        {
            CvwPurchaseItem objCvwPurchaseItem = new CvwPurchaseItem();
            CCountries objCCountry = new CCountries();

            // objCvwPurchaseItem.GetList(pWhereClausePurchaseItem);
            int _RowCount = 0;

            objCvwPurchaseItem.GetListPaging(999999, 1, " where 1 = 1 ", " Name ", out _RowCount);

            objCCountry.GetList("ORDER BY Name");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwPurchaseItem.lstCVarvwPurchaseItem)
                , serializer.Serialize(objCCountry.lstCVarCountries)
            };
        }
        [HttpGet, HttpPost]
        public object[] PurchaseInvoiceItem_Save(Int64 pPurchaseInvoiceID, Int64 pInvoiceNumber, string pEditableCode
            , Int64 pOperationID, Int64 pClientOperationPartnerID, Int64 pClientAddressID, string pClientPrintedAddress
            , Int64 pSupplierOperationPartnerID, Int64 pSupplierAddressID, string pSupplierPrintedAddress
            , decimal pAmountWithoutVAT, Int32 pCurrencyID, decimal pExchangeRate, string pInvoiceDate
            , Int32 pTaxTypeID, decimal pTaxPercentage, decimal pTaxAmount, Int32 pDiscountTypeID, decimal pDiscountPercentage
            , decimal pDiscountAmount, decimal pAmount, string pNotes, Int32 pBranchID, bool pIsApproved, bool pIsDeleted
            , Int32 pApprovingUserID, Int32 pPaymentTermID
            , string pWhereClausePurchaseInvoice, Int32 pPageSize, Int32 pPageNumber, string pOrderBy
            //Details
            , Int64 pPurchaseInvoiceItemID, Int64 pItemID, decimal pItemAmount, string pItemNotes
            , decimal pUnitPrice, Int32 pQuantity, string pPartNumber, Int32 pCountryOfOriginID, string pHSCode, bool? pIsFromOpeningBalanceFlexi)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;

            CvwPayables objCvwPayables = new CvwPayables(); //delete if no update

            Int32 _RowCount = 0;
            Int64 InvoiceID = pPurchaseInvoiceID;

            int _TempRowCount = 0;
            if (pIsFromOpeningBalanceFlexi == true)
            {
                CVarPurchaseInvoice_OpeningBalance objCVarPurchaseInvoice_OpeningBalance = new CVarPurchaseInvoice_OpeningBalance();
                CPurchaseInvoice_OpeningBalance objCPurchaseInvoice_OpeningBalance = new CPurchaseInvoice_OpeningBalance();
                CvwPurchaseInvoice_OpeningBalance objCvwPurchaseInvoice_OpeningBalance = new CvwPurchaseInvoice_OpeningBalance();
                CVarPurchaseInvoiceItem_OpeningBalance objCVarPurchaseInvoiceItem_OpeningBalance = new CVarPurchaseInvoiceItem_OpeningBalance();
                CPurchaseInvoiceItem_OpeningBalance objCPurchaseInvoiceItem_OpeningBalance = new CPurchaseInvoiceItem_OpeningBalance();
                CvwPurchaseInvoiceItem_OpeningBalance objCvwPurchaseInvoiceItem_OpeningBalance = new CvwPurchaseInvoiceItem_OpeningBalance();
                CPurchaseInvoice_OpeningBalance objCPurchaseInvoice_OpeningBalance_IsPosted = new CPurchaseInvoice_OpeningBalance();
                objCPurchaseInvoice_OpeningBalance_IsPosted.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pPurchaseInvoiceID, "ID", out _TempRowCount);
                if (objCPurchaseInvoice_OpeningBalance_IsPosted.lstCVarPurchaseInvoice_OpeningBalance.Count == 0) //not posted so save
                {
                    #region PurchaseInvoiceHeader
                    if (pPurchaseInvoiceID == 0) //this means insert header
                    {
                        objCVarPurchaseInvoice_OpeningBalance.InvoiceNumber = pInvoiceNumber;
                        objCVarPurchaseInvoice_OpeningBalance.EditableCode = pEditableCode;
                        objCVarPurchaseInvoice_OpeningBalance.OperationID = pOperationID;
                        objCVarPurchaseInvoice_OpeningBalance.ClientOperationPartnerID = pClientOperationPartnerID;
                        objCVarPurchaseInvoice_OpeningBalance.ClientAddressID = pClientAddressID;
                        objCVarPurchaseInvoice_OpeningBalance.ClientPrintedAddress = pClientPrintedAddress;
                        objCVarPurchaseInvoice_OpeningBalance.SupplierOperationPartnerID = pSupplierOperationPartnerID;
                        objCVarPurchaseInvoice_OpeningBalance.SupplierAddressID = pSupplierAddressID;
                        objCVarPurchaseInvoice_OpeningBalance.SupplierPrintedAddress = pSupplierPrintedAddress;
                        objCVarPurchaseInvoice_OpeningBalance.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                        objCVarPurchaseInvoice_OpeningBalance.CurrencyID = pCurrencyID;
                        objCVarPurchaseInvoice_OpeningBalance.ExchangeRate = pExchangeRate;
                        objCVarPurchaseInvoice_OpeningBalance.InvoiceDate = DateTime.ParseExact(pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                        objCVarPurchaseInvoice_OpeningBalance.TaxTypeID = pTaxTypeID;
                        objCVarPurchaseInvoice_OpeningBalance.TaxPercentage = pTaxPercentage;
                        objCVarPurchaseInvoice_OpeningBalance.TaxAmount = pTaxAmount;
                        objCVarPurchaseInvoice_OpeningBalance.DiscountTypeID = pDiscountTypeID;
                        objCVarPurchaseInvoice_OpeningBalance.DiscountPercentage = pDiscountPercentage;
                        objCVarPurchaseInvoice_OpeningBalance.DiscountAmount = pDiscountAmount;
                        objCVarPurchaseInvoice_OpeningBalance.Amount = 0;// pAmount; //Calculated at the end of the function
                        objCVarPurchaseInvoice_OpeningBalance.Notes = pNotes;
                        objCVarPurchaseInvoice_OpeningBalance.BranchID = pBranchID;
                        objCVarPurchaseInvoice_OpeningBalance.IsApproved = pIsApproved;
                        objCVarPurchaseInvoice_OpeningBalance.IsDeleted = pIsDeleted;
                        objCVarPurchaseInvoice_OpeningBalance.ApprovingUserID = pApprovingUserID;
                        objCVarPurchaseInvoice_OpeningBalance.PaymentTermID = pPaymentTermID;

                        objCVarPurchaseInvoice_OpeningBalance.CreatorUserID = objCVarPurchaseInvoice_OpeningBalance.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPurchaseInvoice_OpeningBalance.CreationDate = objCVarPurchaseInvoice_OpeningBalance.ModificationDate = DateTime.Now;

                        objCPurchaseInvoice_OpeningBalance.lstCVarPurchaseInvoice_OpeningBalance.Add(objCVarPurchaseInvoice_OpeningBalance);
                        checkException = objCPurchaseInvoice_OpeningBalance.SaveMethod(objCPurchaseInvoice_OpeningBalance.lstCVarPurchaseInvoice_OpeningBalance);
                        pPurchaseInvoiceID = objCVarPurchaseInvoice_OpeningBalance.ID;
                    }
                    else //update header
                    {
                        pUpdateClause = (pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pEditableCode.ToString() + "'")) + " \n";
                        pUpdateClause += (pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + pOperationID.ToString() + "'")) + " \n";
                        pUpdateClause += (pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + pClientOperationPartnerID.ToString() + "'")) + " \n";
                        pUpdateClause += (pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pClientAddressID.ToString() + "'")) + " \n";
                        pUpdateClause += (pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pClientPrintedAddress.ToString() + "'")) + " \n";
                        pUpdateClause += (pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + pSupplierOperationPartnerID.ToString() + "'")) + " \n";
                        pUpdateClause += (pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pSupplierAddressID.ToString() + "'")) + " \n";
                        pUpdateClause += (pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pSupplierPrintedAddress.ToString() + "'")) + " \n";
                        //Calculated at the end of the function
                        //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                        pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID.ToString() + "'")) + " \n";
                        pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate.ToString() + "'")) + " \n";
                        pUpdateClause += (pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pInvoiceDate, 1) + "'"));
                        pUpdateClause += (pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pTaxTypeID.ToString() + "'")) + " \n";
                        pUpdateClause += (pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pTaxPercentage.ToString() + "'")) + " \n";
                        pUpdateClause += (pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pTaxAmount.ToString() + "'")) + " \n";
                        pUpdateClause += (pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pDiscountTypeID.ToString() + "'")) + " \n";
                        pUpdateClause += (pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pDiscountPercentage.ToString() + "'")) + " \n";
                        pUpdateClause += (pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pDiscountAmount.ToString() + "'")) + " \n";
                        //Calculated at the end of the function
                        //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                        pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes.ToString() + "'")) + " \n";
                        //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                        pUpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pOperationID + ") " + " \n";
                        pUpdateClause += (pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                        pUpdateClause += (pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                        pUpdateClause += (pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pApprovingUserID.ToString() + "'")) + " \n";
                        pUpdateClause += (pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pPaymentTermID.ToString() + "'")) + " \n";

                        pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                        pUpdateClause += (" ,ModificationDate = GETDATE() ");
                        pUpdateClause += " WHERE ID =" + pPurchaseInvoiceID.ToString();
                        checkException = objCPurchaseInvoice_OpeningBalance.UpdateList(pUpdateClause);
                    }
                    #endregion PurchaseInvoiceHeader
                    #region PurchaseInvoiceItem for both insert and update
                    if (checkException == null)
                    {
                        _result = true;
                        if (pPurchaseInvoiceItemID != 0)
                        {
                            CPurchaseInvoiceItem_OpeningBalance objCPurchaseInvoiceItem_OpeningBalance_GetCreatedInformation = new CPurchaseInvoiceItem_OpeningBalance();
                            checkException = objCPurchaseInvoiceItem_OpeningBalance.GetList("WHERE ID=" + pPurchaseInvoiceItemID);
                            objCVarPurchaseInvoiceItem_OpeningBalance.ExportPrice = objCPurchaseInvoiceItem_OpeningBalance.lstCVarPurchaseInvoiceItem_OpeningBalance[0].ExportPrice;
                        }
                        objCVarPurchaseInvoiceItem_OpeningBalance.ID = pPurchaseInvoiceItemID;
                        objCVarPurchaseInvoiceItem_OpeningBalance.PurchaseInvoiceID = pPurchaseInvoiceID;
                        objCVarPurchaseInvoiceItem_OpeningBalance.PurchaseItemID = pItemID;
                        objCVarPurchaseInvoiceItem_OpeningBalance.Amount = pItemAmount;
                        objCVarPurchaseInvoiceItem_OpeningBalance.Notes = pItemNotes;
                        objCVarPurchaseInvoiceItem_OpeningBalance.UnitPrice = pUnitPrice;
                        objCVarPurchaseInvoiceItem_OpeningBalance.Quantity = pQuantity;
                        objCVarPurchaseInvoiceItem_OpeningBalance.PartNumber = pPartNumber;
                        objCVarPurchaseInvoiceItem_OpeningBalance.CountryOfOriginID = pCountryOfOriginID;
                        objCVarPurchaseInvoiceItem_OpeningBalance.HSCode = pHSCode;
                        objCPurchaseInvoiceItem_OpeningBalance.lstCVarPurchaseInvoiceItem_OpeningBalance.Add(objCVarPurchaseInvoiceItem_OpeningBalance);
                        checkException = objCPurchaseInvoiceItem_OpeningBalance.SaveMethod(objCPurchaseInvoiceItem_OpeningBalance.lstCVarPurchaseInvoiceItem_OpeningBalance);

                        #region Update Header total for case of update
                        pUpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM PurchaseInvoiceItem_OpeningBalance WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID.ToString() + " AND IsDeleted=0)";
                        pUpdateClause += " WHERE ID = " + pPurchaseInvoiceID.ToString();
                        checkException = objCPurchaseInvoice_OpeningBalance.UpdateList(pUpdateClause);

                        //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                        pUpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                        pUpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                        pUpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                        pUpdateClause += " WHERE ID = " + pPurchaseInvoiceID.ToString();
                        checkException = objCPurchaseInvoice_OpeningBalance.UpdateList(pUpdateClause);
                        #endregion Update Header total for case of update
                        #region Add/Update Payable Flexi //delete if no update
                        //CPayables objCPayables = new CPayables();
                        //checkException = objCPurchaseInvoice.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID + " AND IsDeleted=0", "ID", out _TempRowCount);
                        //decimal _FlexiAmount = objCPurchaseInvoice.lstCVarPurchaseInvoice.Sum(s => s.Amount);
                        //checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE Code='FLEXI' AND OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID, "ID", out _TempRowCount);
                        //if (objCvwPayables.lstCVarvwPayables.Count > 0)
                        //    checkException = objCPayables.UpdateList(
                        //        "Quantity=1"
                        //        + ", CostAmount=" + _FlexiAmount
                        //        + ", CostPrice=" + _FlexiAmount
                        //        + ", AmountWithoutVAT=" + _FlexiAmount
                        //        + ", TaxTypeID=NULL"
                        //        + ", TaxPercentage=NULL"
                        //        + ", TaxAmount=NULL"
                        //        + ", DiscountTypeID=NULL"
                        //        + ", DiscountPercentage=NULL"
                        //        + ", DiscountAmount=NULL"
                        //        + ", InitialSalePrice=" + _FlexiAmount
                        //        + ", CurrencyID=" + pCurrencyID
                        //        + ", ExchangeRate=" + pExchangeRate
                        //        + " WHERE IsApproved=0 AND ID=" + objCvwPayables.lstCVarvwPayables[0].ID);
                        #endregion Add/Update Payable Flexi
                        #region Get Returned Data
                        //checkException = objCPurchaseInvoice.GetList("WHERE ID = " + pPurchaseInvoiceID.ToString());
                        checkException = objCPurchaseInvoice_OpeningBalance.GetListPaging(1, 1, "WHERE ID = " + pPurchaseInvoiceID.ToString(), "ID", out _RowCount);
                        pEditableCode = objCPurchaseInvoice_OpeningBalance.lstCVarPurchaseInvoice_OpeningBalance[0].EditableCode;
                        pAmount = objCPurchaseInvoice_OpeningBalance.lstCVarPurchaseInvoice_OpeningBalance[0].Amount;

                        checkException = objCvwPurchaseInvoice_OpeningBalance.GetListPaging(pPageSize, pPageNumber, pWhereClausePurchaseInvoice, pOrderBy, out _RowCount);
                        checkException = objCvwPurchaseInvoiceItem_OpeningBalance.GetList("WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");
                        //checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND OperationID=" + pOperationID, "ChargeTypeName", out _TempRowCount); //delete if no update
                        #endregion Get Returned Data
                    }
                    #endregion PurchaseInvoiceItem for both insert and update
                }

                #region Tax
                int _RowCount2 = 0;
                CvwDefaults objCvwDefaults = new CvwDefaults();
                objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa

                string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                if (CompanyName == "CHM" && checkException == null)
                {
                    CTaxLink objCPurchaseInvoice = new CTaxLink();
                    objCPurchaseInvoice.GetList("where notes='PurchaseInvoice' and originid=" + pPurchaseInvoiceID);
                    CVarPurchaseInvoice_OpeningBalanceTax objCVarPurchaseInvoice_OpeningBalanceTax = new CVarPurchaseInvoice_OpeningBalanceTax();
                    CPurchaseInvoice_OpeningBalanceTax objCPurchaseInvoice_OpeningBalanceTax = new CPurchaseInvoice_OpeningBalanceTax();
                    CvwPurchaseInvoice_OpeningBalance objCvwPurchaseInvoice_OpeningBalanceTax = new CvwPurchaseInvoice_OpeningBalance();
                    CVarPurchaseInvoiceItem_OpeningBalanceTax objCVarPurchaseInvoiceItem_OpeningBalanceTax = new CVarPurchaseInvoiceItem_OpeningBalanceTax();
                    CPurchaseInvoiceItem_OpeningBalanceTax objCPurchaseInvoiceItem_OpeningBalanceTax = new CPurchaseInvoiceItem_OpeningBalanceTax();
                    CvwPurchaseInvoiceItem_OpeningBalance objCvwPurchaseInvoiceItem_OpeningBalanceTax = new CvwPurchaseInvoiceItem_OpeningBalance();
                    CPurchaseInvoice_OpeningBalanceTax objCPurchaseInvoice_OpeningBalance_IsPostedTax = new CPurchaseInvoice_OpeningBalanceTax();
                    objCPurchaseInvoice_OpeningBalance_IsPostedTax.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + (objCPurchaseInvoice.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice.lstCVarTaxLink[0].TaxID : 0), "ID", out _TempRowCount);
                    if (objCPurchaseInvoice_OpeningBalance_IsPostedTax.lstCVarPurchaseInvoice_OpeningBalance.Count == 0) //not posted so save
                    {
                        CTaxLink CTaxLink = new CTaxLink();
                        CTaxLink.GetList("where notes='Operations' and OriginID=" + pOperationID);
                        CTaxLink objCTaxLinOperationPartners = new CTaxLink();
                        objCTaxLinOperationPartners.GetList("where notes='OperationPartners' and originid=" + pClientOperationPartnerID);
                        CTaxLink objCTaxPurchaseInvoiceItem = new CTaxLink();
                        objCTaxPurchaseInvoiceItem.GetList("where notes='PurchaseInvoiceItem' and originid=" + pPurchaseInvoiceItemID);
                        CTaxLink CTaxLinkOperationPartnersSupplier = new CTaxLink();
                        CTaxLinkOperationPartnersSupplier.GetList("where notes='OperationPartners' and OriginID=" + pSupplierOperationPartnerID);

                        #region PurchaseInvoiceHeader
                        if (InvoiceID == 0) //this means insert header
                        {
                            objCVarPurchaseInvoice_OpeningBalanceTax.InvoiceNumber = pInvoiceNumber;
                            objCVarPurchaseInvoice_OpeningBalanceTax.EditableCode = pEditableCode;
                            objCVarPurchaseInvoice_OpeningBalanceTax.OperationID = CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0;
                            objCVarPurchaseInvoice_OpeningBalanceTax.ClientOperationPartnerID = objCTaxLinOperationPartners.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners.lstCVarTaxLink[0].TaxID : 0;
                            objCVarPurchaseInvoice_OpeningBalanceTax.ClientAddressID = pClientAddressID;
                            objCVarPurchaseInvoice_OpeningBalanceTax.ClientPrintedAddress = pClientPrintedAddress;
                            objCVarPurchaseInvoice_OpeningBalanceTax.SupplierOperationPartnerID = ((CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0));
                            objCVarPurchaseInvoice_OpeningBalanceTax.SupplierAddressID = pSupplierAddressID;
                            objCVarPurchaseInvoice_OpeningBalanceTax.SupplierPrintedAddress = pSupplierPrintedAddress;
                            objCVarPurchaseInvoice_OpeningBalanceTax.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                            objCVarPurchaseInvoice_OpeningBalanceTax.CurrencyID = pCurrencyID;
                            objCVarPurchaseInvoice_OpeningBalanceTax.ExchangeRate = pExchangeRate;
                            objCVarPurchaseInvoice_OpeningBalanceTax.InvoiceDate = DateTime.ParseExact(pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                            objCVarPurchaseInvoice_OpeningBalanceTax.TaxTypeID = pTaxTypeID;
                            objCVarPurchaseInvoice_OpeningBalanceTax.TaxPercentage = pTaxPercentage;
                            objCVarPurchaseInvoice_OpeningBalanceTax.TaxAmount = pTaxAmount;
                            objCVarPurchaseInvoice_OpeningBalanceTax.DiscountTypeID = pDiscountTypeID;
                            objCVarPurchaseInvoice_OpeningBalanceTax.DiscountPercentage = pDiscountPercentage;
                            objCVarPurchaseInvoice_OpeningBalanceTax.DiscountAmount = pDiscountAmount;
                            objCVarPurchaseInvoice_OpeningBalanceTax.Amount = 0;// pAmount; //Calculated at the end of the function
                            objCVarPurchaseInvoice_OpeningBalanceTax.Notes = pNotes;
                            objCVarPurchaseInvoice_OpeningBalanceTax.BranchID = pBranchID;
                            objCVarPurchaseInvoice_OpeningBalanceTax.IsApproved = pIsApproved;
                            objCVarPurchaseInvoice_OpeningBalanceTax.IsDeleted = pIsDeleted;
                            objCVarPurchaseInvoice_OpeningBalanceTax.ApprovingUserID = pApprovingUserID;
                            objCVarPurchaseInvoice_OpeningBalanceTax.PaymentTermID = pPaymentTermID;

                            objCVarPurchaseInvoice_OpeningBalanceTax.CreatorUserID = objCVarPurchaseInvoice_OpeningBalanceTax.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarPurchaseInvoice_OpeningBalanceTax.CreationDate = objCVarPurchaseInvoice_OpeningBalanceTax.ModificationDate = DateTime.Now;

                            objCPurchaseInvoice_OpeningBalanceTax.lstCVarPurchaseInvoice_OpeningBalance.Add(objCVarPurchaseInvoice_OpeningBalanceTax);
                            checkException = objCPurchaseInvoice_OpeningBalanceTax.SaveMethod(objCPurchaseInvoice_OpeningBalanceTax.lstCVarPurchaseInvoice_OpeningBalance);
                            InvoiceID = objCVarPurchaseInvoice_OpeningBalanceTax.ID;
                        }
                        else //update header
                        {
                            pUpdateClause = (pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pEditableCode.ToString() + "'")) + " \n";
                            pUpdateClause += (pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + (CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                            pUpdateClause += (pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + (objCTaxLinOperationPartners.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                            pUpdateClause += (pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pClientAddressID.ToString() + "'")) + " \n";
                            pUpdateClause += (pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pClientPrintedAddress.ToString() + "'")) + " \n";
                            pUpdateClause += (pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + ((CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0)) + "'")) + " \n";
                            pUpdateClause += (pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pSupplierAddressID.ToString() + "'")) + " \n";
                            pUpdateClause += (pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pSupplierPrintedAddress.ToString() + "'")) + " \n";
                            //Calculated at the end of the function
                            //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                            pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID.ToString() + "'")) + " \n";
                            pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate.ToString() + "'")) + " \n";
                            pUpdateClause += (pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pInvoiceDate, 1) + "'"));
                            pUpdateClause += (pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pTaxTypeID.ToString() + "'")) + " \n";
                            pUpdateClause += (pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pTaxPercentage.ToString() + "'")) + " \n";
                            pUpdateClause += (pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pTaxAmount.ToString() + "'")) + " \n";
                            pUpdateClause += (pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pDiscountTypeID.ToString() + "'")) + " \n";
                            pUpdateClause += (pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pDiscountPercentage.ToString() + "'")) + " \n";
                            pUpdateClause += (pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pDiscountAmount.ToString() + "'")) + " \n";
                            //Calculated at the end of the function
                            //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                            pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes.ToString() + "'")) + " \n";
                            //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                            pUpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pOperationID + ") " + " \n";
                            pUpdateClause += (pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                            pUpdateClause += (pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                            pUpdateClause += (pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pApprovingUserID.ToString() + "'")) + " \n";
                            pUpdateClause += (pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pPaymentTermID.ToString() + "'")) + " \n";

                            pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                            pUpdateClause += (" ,ModificationDate = GETDATE() ");
                            pUpdateClause += " WHERE ID =" + (objCPurchaseInvoice.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice.lstCVarTaxLink[0].TaxID : 0);
                            checkException = objCPurchaseInvoice_OpeningBalanceTax.UpdateList(pUpdateClause);
                        }
                        #endregion PurchaseInvoiceHeader
                        #region PurchaseInvoiceItem for both insert and update
                        if (checkException == null)
                        {
                            _result = true;
                            if (pPurchaseInvoiceItemID != 0)
                            {
                                CPurchaseInvoiceItem_OpeningBalanceTax objCPurchaseInvoiceItem_OpeningBalance_GetCreatedInformationTax = new CPurchaseInvoiceItem_OpeningBalanceTax();
                                checkException = objCPurchaseInvoiceItem_OpeningBalanceTax.GetList("WHERE ID=" + (objCTaxPurchaseInvoiceItem.lstCVarTaxLink.Count > 0 ? objCTaxPurchaseInvoiceItem.lstCVarTaxLink[0].TaxID : 0));
                                objCVarPurchaseInvoiceItem_OpeningBalanceTax.ExportPrice = objCPurchaseInvoiceItem_OpeningBalanceTax.lstCVarPurchaseInvoiceItem_OpeningBalance[0].ExportPrice;
                            }
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.ID = (objCTaxPurchaseInvoiceItem.lstCVarTaxLink.Count > 0 ? objCTaxPurchaseInvoiceItem.lstCVarTaxLink[0].TaxID : 0);
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.PurchaseInvoiceID = (objCPurchaseInvoice.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice.lstCVarTaxLink[0].TaxID : 0);
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.PurchaseItemID = pItemID;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.Amount = pItemAmount;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.Notes = pItemNotes;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.UnitPrice = pUnitPrice;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.Quantity = pQuantity;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.PartNumber = pPartNumber;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.CountryOfOriginID = pCountryOfOriginID;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.HSCode = pHSCode;
                            objCPurchaseInvoiceItem_OpeningBalanceTax.lstCVarPurchaseInvoiceItem_OpeningBalance.Add(objCVarPurchaseInvoiceItem_OpeningBalanceTax);
                            checkException = objCPurchaseInvoiceItem_OpeningBalanceTax.SaveMethod(objCPurchaseInvoiceItem_OpeningBalanceTax.lstCVarPurchaseInvoiceItem_OpeningBalance);

                            #region Update Header total for case of update
                            pUpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM ForwardingTransChemTax.[dbo].PurchaseInvoiceItem_OpeningBalance WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID.ToString() + " AND IsDeleted=0)";
                            pUpdateClause += " WHERE ID = " + (objCPurchaseInvoice.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice.lstCVarTaxLink[0].TaxID : 0);
                            checkException = objCPurchaseInvoice_OpeningBalance.UpdateList(pUpdateClause);

                            //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                            pUpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                            pUpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                            pUpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                            pUpdateClause += " WHERE ID = " + (objCPurchaseInvoice.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice.lstCVarTaxLink[0].TaxID : 0);
                            checkException = objCPurchaseInvoice_OpeningBalanceTax.UpdateList(pUpdateClause);
                            #endregion Update Header total for case of update
                            #region Add/Update Payable Flexi //delete if no update
                            //CPayables objCPayables = new CPayables();
                            //checkException = objCPurchaseInvoice.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID + " AND IsDeleted=0", "ID", out _TempRowCount);
                            //decimal _FlexiAmount = objCPurchaseInvoice.lstCVarPurchaseInvoice.Sum(s => s.Amount);
                            //checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE Code='FLEXI' AND OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID, "ID", out _TempRowCount);
                            //if (objCvwPayables.lstCVarvwPayables.Count > 0)
                            //    checkException = objCPayables.UpdateList(
                            //        "Quantity=1"
                            //        + ", CostAmount=" + _FlexiAmount
                            //        + ", CostPrice=" + _FlexiAmount
                            //        + ", AmountWithoutVAT=" + _FlexiAmount
                            //        + ", TaxTypeID=NULL"
                            //        + ", TaxPercentage=NULL"
                            //        + ", TaxAmount=NULL"
                            //        + ", DiscountTypeID=NULL"
                            //        + ", DiscountPercentage=NULL"
                            //        + ", DiscountAmount=NULL"
                            //        + ", InitialSalePrice=" + _FlexiAmount
                            //        + ", CurrencyID=" + pCurrencyID
                            //        + ", ExchangeRate=" + pExchangeRate
                            //        + " WHERE IsApproved=0 AND ID=" + objCvwPayables.lstCVarvwPayables[0].ID);
                            #endregion Add/Update Payable Flexi
                            #region Get Returned Data
                            //checkException = objCPurchaseInvoice.GetList("WHERE ID = " + pPurchaseInvoiceID.ToString());
                            checkException = objCPurchaseInvoice_OpeningBalance.GetListPaging(1, 1, "WHERE ID = " + pPurchaseInvoiceID.ToString(), "ID", out _RowCount);
                            pEditableCode = objCPurchaseInvoice_OpeningBalance.lstCVarPurchaseInvoice_OpeningBalance[0].EditableCode;
                            pAmount = objCPurchaseInvoice_OpeningBalance.lstCVarPurchaseInvoice_OpeningBalance[0].Amount;

                            checkException = objCvwPurchaseInvoice_OpeningBalance.GetListPaging(pPageSize, pPageNumber, pWhereClausePurchaseInvoice, pOrderBy, out _RowCount);
                            checkException = objCvwPurchaseInvoiceItem_OpeningBalance.GetList("WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");
                            //checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND OperationID=" + pOperationID, "ChargeTypeName", out _TempRowCount); //delete if no update
                            #endregion Get Returned Data
                        }
                        #endregion PurchaseInvoiceItem for both insert and update
                    }
                }
                #endregion
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

                return new object[]
                {
                _result //pData[0]
                , _result ? pPurchaseInvoiceID : 0 //pData[1]
                , _result ? pEditableCode : "" //pData[2]
                , _result ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem_OpeningBalance.lstCVarvwPurchaseInvoiceItem_OpeningBalance) : null //pData[3]
                , _result ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance) : null //pData[4]
                , pAmount //pData[5]
                          //, serializer.Serialize(objCvwPayables.lstCVarvwPayables) //_Payables = pData[6] //delete if no update
                };

            }
            else
            {
                CVarPurchaseInvoice objCVarPurchaseInvoice = new CVarPurchaseInvoice();
                CPurchaseInvoice objCPurchaseInvoice = new CPurchaseInvoice();
                CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
                CVarPurchaseInvoiceItem objCVarPurchaseInvoiceItem = new CVarPurchaseInvoiceItem();
                CPurchaseInvoiceItem objCPurchaseInvoiceItem = new CPurchaseInvoiceItem();
                CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItem = new CvwPurchaseInvoiceItem();
                CPurchaseInvoice objCPurchaseInvoice_IsPosted = new CPurchaseInvoice();
                objCPurchaseInvoice_IsPosted.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pPurchaseInvoiceID, "ID", out _TempRowCount);
                if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
                {
                    #region PurchaseInvoiceHeader
                    if (pPurchaseInvoiceID == 0) //this means insert header
                    {
                        objCVarPurchaseInvoice.InvoiceNumber = pInvoiceNumber;
                        objCVarPurchaseInvoice.EditableCode = pEditableCode;
                        objCVarPurchaseInvoice.OperationID = pOperationID;
                        objCVarPurchaseInvoice.ClientOperationPartnerID = pClientOperationPartnerID;
                        objCVarPurchaseInvoice.ClientAddressID = pClientAddressID;
                        objCVarPurchaseInvoice.ClientPrintedAddress = pClientPrintedAddress;
                        objCVarPurchaseInvoice.SupplierOperationPartnerID = pSupplierOperationPartnerID;
                        objCVarPurchaseInvoice.SupplierAddressID = pSupplierAddressID;
                        objCVarPurchaseInvoice.SupplierPrintedAddress = pSupplierPrintedAddress;
                        objCVarPurchaseInvoice.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                        objCVarPurchaseInvoice.CurrencyID = pCurrencyID;
                        objCVarPurchaseInvoice.ExchangeRate = pExchangeRate;
                        objCVarPurchaseInvoice.InvoiceDate = DateTime.ParseExact(pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                        objCVarPurchaseInvoice.TaxTypeID = pTaxTypeID;
                        objCVarPurchaseInvoice.TaxPercentage = pTaxPercentage;
                        objCVarPurchaseInvoice.TaxAmount = pTaxAmount;
                        objCVarPurchaseInvoice.DiscountTypeID = pDiscountTypeID;
                        objCVarPurchaseInvoice.DiscountPercentage = pDiscountPercentage;
                        objCVarPurchaseInvoice.DiscountAmount = pDiscountAmount;
                        objCVarPurchaseInvoice.Amount = 0;// pAmount; //Calculated at the end of the function
                        objCVarPurchaseInvoice.Notes = pNotes;
                        objCVarPurchaseInvoice.BranchID = pBranchID;
                        objCVarPurchaseInvoice.IsApproved = pIsApproved;
                        objCVarPurchaseInvoice.IsDeleted = pIsDeleted;
                        objCVarPurchaseInvoice.ApprovingUserID = pApprovingUserID;
                        objCVarPurchaseInvoice.PaymentTermID = pPaymentTermID;

                        objCVarPurchaseInvoice.CreatorUserID = objCVarPurchaseInvoice.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPurchaseInvoice.CreationDate = objCVarPurchaseInvoice.ModificationDate = DateTime.Now;

                        objCPurchaseInvoice.lstCVarPurchaseInvoice.Add(objCVarPurchaseInvoice);
                        checkException = objCPurchaseInvoice.SaveMethod(objCPurchaseInvoice.lstCVarPurchaseInvoice);
                        pPurchaseInvoiceID = objCVarPurchaseInvoice.ID;
                    }
                    else //update header
                    {
                        pUpdateClause = (pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pEditableCode.ToString() + "'")) + " \n";
                        pUpdateClause += (pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + pOperationID.ToString() + "'")) + " \n";
                        pUpdateClause += (pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + pClientOperationPartnerID.ToString() + "'")) + " \n";
                        pUpdateClause += (pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pClientAddressID.ToString() + "'")) + " \n";
                        pUpdateClause += (pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pClientPrintedAddress.ToString() + "'")) + " \n";
                        pUpdateClause += (pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + pSupplierOperationPartnerID.ToString() + "'")) + " \n";
                        pUpdateClause += (pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pSupplierAddressID.ToString() + "'")) + " \n";
                        pUpdateClause += (pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pSupplierPrintedAddress.ToString() + "'")) + " \n";
                        //Calculated at the end of the function
                        //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                        pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID.ToString() + "'")) + " \n";
                        pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate.ToString() + "'")) + " \n";
                        pUpdateClause += (pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pInvoiceDate, 1) + "'"));
                        pUpdateClause += (pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pTaxTypeID.ToString() + "'")) + " \n";
                        pUpdateClause += (pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pTaxPercentage.ToString() + "'")) + " \n";
                        pUpdateClause += (pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pTaxAmount.ToString() + "'")) + " \n";
                        pUpdateClause += (pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pDiscountTypeID.ToString() + "'")) + " \n";
                        pUpdateClause += (pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pDiscountPercentage.ToString() + "'")) + " \n";
                        pUpdateClause += (pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pDiscountAmount.ToString() + "'")) + " \n";
                        //Calculated at the end of the function
                        //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                        pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes.ToString() + "'")) + " \n";
                        //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                        pUpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pOperationID + ") " + " \n";
                        pUpdateClause += (pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                        pUpdateClause += (pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                        pUpdateClause += (pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pApprovingUserID.ToString() + "'")) + " \n";
                        pUpdateClause += (pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pPaymentTermID.ToString() + "'")) + " \n";

                        pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                        pUpdateClause += (" ,ModificationDate = GETDATE() ");
                        pUpdateClause += " WHERE ID =" + pPurchaseInvoiceID.ToString();
                        checkException = objCPurchaseInvoice.UpdateList(pUpdateClause);
                    }
                    #endregion PurchaseInvoiceHeader
                    #region PurchaseInvoiceItem for both insert and update
                    if (checkException == null)
                    {
                        _result = true;
                        if (pPurchaseInvoiceItemID != 0)
                        {
                            CPurchaseInvoiceItem objCPurchaseInvoiceItem_GetCreatedInformation = new CPurchaseInvoiceItem();
                            checkException = objCPurchaseInvoiceItem.GetList("WHERE ID=" + pPurchaseInvoiceItemID);
                            objCVarPurchaseInvoiceItem.ExportPrice = objCPurchaseInvoiceItem.lstCVarPurchaseInvoiceItem[0].ExportPrice;
                        }
                        objCVarPurchaseInvoiceItem.ID = pPurchaseInvoiceItemID;
                        objCVarPurchaseInvoiceItem.PurchaseInvoiceID = pPurchaseInvoiceID;
                        objCVarPurchaseInvoiceItem.PurchaseItemID = pItemID;
                        objCVarPurchaseInvoiceItem.Amount = pItemAmount;
                        objCVarPurchaseInvoiceItem.Notes = pItemNotes;
                        objCVarPurchaseInvoiceItem.UnitPrice = pUnitPrice;
                        objCVarPurchaseInvoiceItem.Quantity = pQuantity;
                        objCVarPurchaseInvoiceItem.PartNumber = pPartNumber;
                        objCVarPurchaseInvoiceItem.CountryOfOriginID = pCountryOfOriginID;
                        objCVarPurchaseInvoiceItem.HSCode = pHSCode;
                        objCPurchaseInvoiceItem.lstCVarPurchaseInvoiceItem.Add(objCVarPurchaseInvoiceItem);
                        checkException = objCPurchaseInvoiceItem.SaveMethod(objCPurchaseInvoiceItem.lstCVarPurchaseInvoiceItem);

                        #region Update Header total for case of update
                        pUpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM PurchaseInvoiceItem WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID.ToString() + " AND IsDeleted=0)";
                        pUpdateClause += " WHERE ID = " + pPurchaseInvoiceID.ToString();
                        checkException = objCPurchaseInvoice.UpdateList(pUpdateClause);

                        //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                        pUpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                        pUpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                        pUpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                        pUpdateClause += " WHERE ID = " + pPurchaseInvoiceID.ToString();
                        checkException = objCPurchaseInvoice.UpdateList(pUpdateClause);
                        #endregion Update Header total for case of update
                        #region Add/Update Payable Flexi //delete if no update
                        //CPayables objCPayables = new CPayables();
                        //checkException = objCPurchaseInvoice.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID + " AND IsDeleted=0", "ID", out _TempRowCount);
                        //decimal _FlexiAmount = objCPurchaseInvoice.lstCVarPurchaseInvoice.Sum(s => s.Amount);
                        //checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE Code='FLEXI' AND OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID, "ID", out _TempRowCount);
                        //if (objCvwPayables.lstCVarvwPayables.Count > 0)
                        //    checkException = objCPayables.UpdateList(
                        //        "Quantity=1"
                        //        + ", CostAmount=" + _FlexiAmount
                        //        + ", CostPrice=" + _FlexiAmount
                        //        + ", AmountWithoutVAT=" + _FlexiAmount
                        //        + ", TaxTypeID=NULL"
                        //        + ", TaxPercentage=NULL"
                        //        + ", TaxAmount=NULL"
                        //        + ", DiscountTypeID=NULL"
                        //        + ", DiscountPercentage=NULL"
                        //        + ", DiscountAmount=NULL"
                        //        + ", InitialSalePrice=" + _FlexiAmount
                        //        + ", CurrencyID=" + pCurrencyID
                        //        + ", ExchangeRate=" + pExchangeRate
                        //        + " WHERE IsApproved=0 AND ID=" + objCvwPayables.lstCVarvwPayables[0].ID);
                        #endregion Add/Update Payable Flexi
                        #region Get Returned Data
                        //checkException = objCPurchaseInvoice.GetList("WHERE ID = " + pPurchaseInvoiceID.ToString());
                        checkException = objCPurchaseInvoice.GetListPaging(1, 1, "WHERE ID = " + pPurchaseInvoiceID.ToString(), "ID", out _RowCount);
                        pEditableCode = objCPurchaseInvoice.lstCVarPurchaseInvoice[0].EditableCode;
                        pAmount = objCPurchaseInvoice.lstCVarPurchaseInvoice[0].Amount;

                        checkException = objCvwPurchaseInvoice.GetListPaging(pPageSize, pPageNumber, pWhereClausePurchaseInvoice, pOrderBy, out _RowCount);
                        checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");
                        //checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND OperationID=" + pOperationID, "ChargeTypeName", out _TempRowCount); //delete if no update
                        #endregion Get Returned Data
                    }
                    #endregion PurchaseInvoiceItem for both insert and update
                }

                #region Tax
                int _RowCount2 = 0;
                CvwDefaults objCvwDefaults = new CvwDefaults();
                objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa

                string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                if (CompanyName == "CHM" && checkException == null)
                {

                    CTaxLink objCPurchaseInvoice2 = new CTaxLink();
                    objCPurchaseInvoice2.GetList("where notes='PurchaseInvoice' and originid=" + pPurchaseInvoiceID);
                    CTaxLink objCLinkOperationPartners = new CTaxLink();
                    objCLinkOperationPartners.GetList("where notes='OperationPartners' and originid=" + pSupplierOperationPartnerID);
                    CVarPurchaseInvoiceTax objCVarPurchaseInvoiceTax = new CVarPurchaseInvoiceTax();
                    CPurchaseInvoiceTax objCPurchaseInvoiceTax = new CPurchaseInvoiceTax();
                    CvwPurchaseInvoice objCvwPurchaseInvoiceTax = new CvwPurchaseInvoice();
                    CVarPurchaseInvoiceItemTax objCVarPurchaseInvoiceItemTax = new CVarPurchaseInvoiceItemTax();
                    CPurchaseInvoiceItemTax objCPurchaseInvoiceItemTax = new CPurchaseInvoiceItemTax();
                    CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItemTax = new CvwPurchaseInvoiceItem();
                    CPurchaseInvoiceTax objCPurchaseInvoice_IsPostedTax = new CPurchaseInvoiceTax();
                    objCPurchaseInvoice_IsPostedTax.GetListPaging(999999, 1, "WHERE ID=" + (objCPurchaseInvoice2.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice2.lstCVarTaxLink[0].TaxID : 0), "ID", out _TempRowCount);
                    if (objCPurchaseInvoice_IsPostedTax.lstCVarPurchaseInvoiceTax.Count > 0) //not posted so save
                    {
                        CTaxLink CTaxLink = new CTaxLink();
                        CTaxLink.GetList("where notes='Operations' and OriginID=" + pOperationID);
                        CTaxLink objCTaxLinOperationPartners = new CTaxLink();
                        objCTaxLinOperationPartners.GetList("where notes='OperationPartners' and originid=" + pClientOperationPartnerID);
                        CTaxLink objCTaxPurchaseInvoiceItem = new CTaxLink();
                        objCTaxPurchaseInvoiceItem.GetList("where notes='PurchaseInvoiceItem' and originid=" + pPurchaseInvoiceItemID);
                        #region PurchaseInvoiceHeader
                        if (InvoiceID == 0) //this means insert header
                        {
                            objCVarPurchaseInvoiceTax.InvoiceNumber = pInvoiceNumber;
                            objCVarPurchaseInvoiceTax.EditableCode = pEditableCode;
                            objCVarPurchaseInvoiceTax.OperationID = (CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0);
                            objCVarPurchaseInvoiceTax.ClientOperationPartnerID = objCTaxLinOperationPartners.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners.lstCVarTaxLink[0].TaxID : 0;
                            objCVarPurchaseInvoiceTax.ClientAddressID = pClientAddressID;
                            objCVarPurchaseInvoiceTax.ClientPrintedAddress = pClientPrintedAddress;
                            objCVarPurchaseInvoiceTax.SupplierOperationPartnerID = objCLinkOperationPartners.lstCVarTaxLink.Count > 0 ? objCLinkOperationPartners.lstCVarTaxLink[0].TaxID : 0;
                            objCVarPurchaseInvoiceTax.SupplierAddressID = pSupplierAddressID;
                            objCVarPurchaseInvoiceTax.SupplierPrintedAddress = pSupplierPrintedAddress;
                            objCVarPurchaseInvoiceTax.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                            objCVarPurchaseInvoiceTax.CurrencyID = pCurrencyID;
                            objCVarPurchaseInvoiceTax.ExchangeRate = pExchangeRate;
                            objCVarPurchaseInvoiceTax.InvoiceDate = DateTime.ParseExact(pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                            objCVarPurchaseInvoiceTax.TaxTypeID = pTaxTypeID;
                            objCVarPurchaseInvoiceTax.TaxPercentage = pTaxPercentage;
                            objCVarPurchaseInvoiceTax.TaxAmount = pTaxAmount;
                            objCVarPurchaseInvoiceTax.DiscountTypeID = pDiscountTypeID;
                            objCVarPurchaseInvoiceTax.DiscountPercentage = pDiscountPercentage;
                            objCVarPurchaseInvoiceTax.DiscountAmount = pDiscountAmount;
                            objCVarPurchaseInvoiceTax.Amount = 0;// pAmount; //Calculated at the end of the function
                            objCVarPurchaseInvoiceTax.Notes = pNotes;
                            objCVarPurchaseInvoiceTax.BranchID = pBranchID;
                            objCVarPurchaseInvoiceTax.IsApproved = pIsApproved;
                            objCVarPurchaseInvoiceTax.IsDeleted = pIsDeleted;
                            objCVarPurchaseInvoiceTax.ApprovingUserID = pApprovingUserID;
                            objCVarPurchaseInvoiceTax.PaymentTermID = pPaymentTermID;

                            objCVarPurchaseInvoiceTax.CreatorUserID = objCVarPurchaseInvoiceTax.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarPurchaseInvoiceTax.CreationDate = objCVarPurchaseInvoiceTax.ModificationDate = DateTime.Now;

                            objCPurchaseInvoiceTax.lstCVarPurchaseInvoiceTax.Add(objCVarPurchaseInvoiceTax);
                            checkException = objCPurchaseInvoiceTax.SaveMethod(objCPurchaseInvoiceTax.lstCVarPurchaseInvoiceTax);
                            InvoiceID = objCVarPurchaseInvoiceTax.ID;
                        }
                        else //update header
                        {
                            pUpdateClause = (pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pEditableCode.ToString() + "'")) + " \n";
                            pUpdateClause += (pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + (CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                            pUpdateClause += (pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + (objCTaxLinOperationPartners.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                            pUpdateClause += (pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pClientAddressID.ToString() + "'")) + " \n";
                            pUpdateClause += (pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pClientPrintedAddress.ToString() + "'")) + " \n";
                            pUpdateClause += (pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + (objCLinkOperationPartners.lstCVarTaxLink.Count > 0 ? objCLinkOperationPartners.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                            pUpdateClause += (pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pSupplierAddressID.ToString() + "'")) + " \n";
                            pUpdateClause += (pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pSupplierPrintedAddress.ToString() + "'")) + " \n";
                            //Calculated at the end of the function
                            //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                            pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID.ToString() + "'")) + " \n";
                            pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate.ToString() + "'")) + " \n";
                            pUpdateClause += (pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pInvoiceDate, 1) + "'"));
                            pUpdateClause += (pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pTaxTypeID.ToString() + "'")) + " \n";
                            pUpdateClause += (pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pTaxPercentage.ToString() + "'")) + " \n";
                            pUpdateClause += (pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pTaxAmount.ToString() + "'")) + " \n";
                            pUpdateClause += (pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pDiscountTypeID.ToString() + "'")) + " \n";
                            pUpdateClause += (pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pDiscountPercentage.ToString() + "'")) + " \n";
                            pUpdateClause += (pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pDiscountAmount.ToString() + "'")) + " \n";
                            //Calculated at the end of the function
                            //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                            pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes.ToString() + "'")) + " \n";
                            //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                            pUpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pOperationID + ") " + " \n";
                            pUpdateClause += (pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                            pUpdateClause += (pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                            pUpdateClause += (pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pApprovingUserID.ToString() + "'")) + " \n";
                            pUpdateClause += (pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pPaymentTermID.ToString() + "'")) + " \n";

                            pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                            pUpdateClause += (" ,ModificationDate = GETDATE() ");
                            pUpdateClause += " WHERE ID =" + (objCPurchaseInvoice2.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice2.lstCVarTaxLink[0].TaxID : 0);
                            checkException = objCPurchaseInvoiceTax.UpdateList(pUpdateClause);
                        }
                        #endregion PurchaseInvoiceHeader
                        #region PurchaseInvoiceItem for both insert and update
                        if (checkException == null)
                        {
                            _result = true;
                            if (pPurchaseInvoiceItemID != 0)
                            {
                                CPurchaseInvoiceItemTax objCPurchaseInvoiceItem_GetCreatedInformationTax = new CPurchaseInvoiceItemTax();
                                checkException = objCPurchaseInvoiceItemTax.GetList("WHERE ID=" + (objCTaxPurchaseInvoiceItem.lstCVarTaxLink.Count > 0 ? objCTaxPurchaseInvoiceItem.lstCVarTaxLink[0].TaxID : 0));
                                objCVarPurchaseInvoiceItemTax.ExportPrice = objCPurchaseInvoiceItemTax.lstCVarPurchaseInvoiceItem[0].ExportPrice;
                            }
                            objCVarPurchaseInvoiceItemTax.ID = (objCTaxPurchaseInvoiceItem.lstCVarTaxLink.Count > 0 ? objCTaxPurchaseInvoiceItem.lstCVarTaxLink[0].TaxID : 0);
                            objCVarPurchaseInvoiceItemTax.PurchaseInvoiceID = (objCPurchaseInvoice2.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice2.lstCVarTaxLink[0].TaxID : 0);
                            objCVarPurchaseInvoiceItemTax.PurchaseItemID = pItemID;
                            objCVarPurchaseInvoiceItemTax.Amount = pItemAmount;
                            objCVarPurchaseInvoiceItemTax.Notes = pItemNotes;
                            objCVarPurchaseInvoiceItemTax.UnitPrice = pUnitPrice;
                            objCVarPurchaseInvoiceItemTax.Quantity = pQuantity;
                            objCVarPurchaseInvoiceItemTax.PartNumber = pPartNumber;
                            objCVarPurchaseInvoiceItemTax.CountryOfOriginID = pCountryOfOriginID;
                            objCVarPurchaseInvoiceItemTax.HSCode = pHSCode;
                            objCPurchaseInvoiceItemTax.lstCVarPurchaseInvoiceItem.Add(objCVarPurchaseInvoiceItemTax);
                            checkException = objCPurchaseInvoiceItemTax.SaveMethod(objCPurchaseInvoiceItemTax.lstCVarPurchaseInvoiceItem);

                            #region Update Header total for case of update
                            pUpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM ForwardingTransChemTax.[dbo].PurchaseInvoiceItem WHERE PurchaseInvoiceID = " + (objCPurchaseInvoice2.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice2.lstCVarTaxLink[0].TaxID : 0) + " AND IsDeleted=0)";
                            pUpdateClause += " WHERE ID = " + (objCPurchaseInvoice2.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice2.lstCVarTaxLink[0].TaxID : 0);
                            checkException = objCPurchaseInvoiceTax.UpdateList(pUpdateClause);

                            //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                            pUpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                            pUpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                            pUpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                            pUpdateClause += " WHERE ID = " + (objCPurchaseInvoice2.lstCVarTaxLink.Count > 0 ? objCPurchaseInvoice2.lstCVarTaxLink[0].TaxID : 0);
                            checkException = objCPurchaseInvoiceTax.UpdateList(pUpdateClause);
                            #endregion Update Header total for case of update
                            #region Add/Update Payable Flexi //delete if no update
                            //CPayables objCPayables = new CPayables();
                            //checkException = objCPurchaseInvoice.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID + " AND IsDeleted=0", "ID", out _TempRowCount);
                            //decimal _FlexiAmount = objCPurchaseInvoice.lstCVarPurchaseInvoice.Sum(s => s.Amount);
                            //checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE Code='FLEXI' AND OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID, "ID", out _TempRowCount);
                            //if (objCvwPayables.lstCVarvwPayables.Count > 0)
                            //    checkException = objCPayables.UpdateList(
                            //        "Quantity=1"
                            //        + ", CostAmount=" + _FlexiAmount
                            //        + ", CostPrice=" + _FlexiAmount
                            //        + ", AmountWithoutVAT=" + _FlexiAmount
                            //        + ", TaxTypeID=NULL"
                            //        + ", TaxPercentage=NULL"
                            //        + ", TaxAmount=NULL"
                            //        + ", DiscountTypeID=NULL"
                            //        + ", DiscountPercentage=NULL"
                            //        + ", DiscountAmount=NULL"
                            //        + ", InitialSalePrice=" + _FlexiAmount
                            //        + ", CurrencyID=" + pCurrencyID
                            //        + ", ExchangeRate=" + pExchangeRate
                            //        + " WHERE IsApproved=0 AND ID=" + objCvwPayables.lstCVarvwPayables[0].ID);
                            #endregion Add/Update Payable Flexi
                            #region Get Returned Data
                            //checkException = objCPurchaseInvoice.GetList("WHERE ID = " + pPurchaseInvoiceID.ToString());
                            checkException = objCPurchaseInvoice.GetListPaging(1, 1, "WHERE ID = " + pPurchaseInvoiceID.ToString(), "ID", out _RowCount);
                            pEditableCode = objCPurchaseInvoice.lstCVarPurchaseInvoice[0].EditableCode;
                            pAmount = objCPurchaseInvoice.lstCVarPurchaseInvoice[0].Amount;

                            checkException = objCvwPurchaseInvoice.GetListPaging(pPageSize, pPageNumber, pWhereClausePurchaseInvoice, pOrderBy, out _RowCount);
                            checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");
                            //checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND OperationID=" + pOperationID, "ChargeTypeName", out _TempRowCount); //delete if no update
                            #endregion Get Returned Data
                        }
                        #endregion PurchaseInvoiceItem for both insert and update
                    }
                }
                #endregion
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[]
                {
                _result //pData[0]
                , _result ? pPurchaseInvoiceID : 0 //pData[1]
                , _result ? pEditableCode : "" //pData[2]
                , _result ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem.lstCVarvwPurchaseInvoiceItem) : null //pData[3]
                , _result ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice) : null //pData[4]
                , pAmount //pData[5]
                          //, serializer.Serialize(objCvwPayables.lstCVarvwPayables) //_Payables = pData[6] //delete if no update
                };
            }

        }

        [HttpGet, HttpPost]
        public object[] PurchaseInvoiceItem_Delete(Int64 pPurchaseInvoiceID, string pEditableCode, Int64 pOperationID
            , Int64 pClientOperationPartnerID, Int64 pClientAddressID, string pClientPrintedAddress
            , Int64 pSupplierOperationPartnerID, Int64 pSupplierAddressID, string pSupplierPrintedAddress
            , Int32 pCurrencyID, decimal pExchangeRate, string pInvoiceDate, string pNotes, Int32 pPaymentTermID
            //LoadWithPaging parameters
            , string pWhereClausePurchaseInvoice, Int32 pPageSize, Int32 pPageNumber, string pOrderBy
            , string pDeletedPurchaseInvoiceItemIDs)
        {
            bool _result = true;
            int _RowCount = 0;
            Exception checkException = null;
            string pUpdateClause = "";
            CPurchaseInvoiceItem objCPurchaseInvoiceItem = new CPurchaseInvoiceItem();
            CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItem = new CvwPurchaseInvoiceItem();
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            CPurchaseInvoice objCPurchaseInvoice = new CPurchaseInvoice();
            CvwPayables objCvwPayables = new CvwPayables();
            int _TempRowCount = 0;
            CPurchaseInvoice objCPurchaseInvoice_IsPosted = new CPurchaseInvoice();
            objCPurchaseInvoice_IsPosted.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pPurchaseInvoiceID, "ID", out _TempRowCount);
            if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
            {
                #region Delete PurchaseInvoiceItem
                checkException = objCPurchaseInvoiceItem.DeleteList("WHERE ID IN (" + pDeletedPurchaseInvoiceItemIDs + ")");
                #endregion Delete PurchaseInvoiceItem

                #region Update header
                pUpdateClause = (pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pEditableCode.ToString() + "'")) + " \n";
                pUpdateClause += (pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + pOperationID.ToString() + "'")) + " \n";
                pUpdateClause += (pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + pClientOperationPartnerID.ToString() + "'")) + " \n";
                pUpdateClause += (pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pClientAddressID.ToString() + "'")) + " \n";
                pUpdateClause += (pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pClientPrintedAddress.ToString() + "'")) + " \n";
                pUpdateClause += (pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + pSupplierOperationPartnerID.ToString() + "'")) + " \n";
                pUpdateClause += (pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pSupplierAddressID.ToString() + "'")) + " \n";
                pUpdateClause += (pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pSupplierPrintedAddress.ToString() + "'")) + " \n";
                pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID.ToString() + "'")) + " \n";
                pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate.ToString() + "'")) + " \n";
                pUpdateClause += (pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pInvoiceDate, 1) + "'"));
                pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes.ToString() + "'")) + " \n";
                pUpdateClause += (pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pPaymentTermID.ToString() + "'")) + " \n";

                pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                pUpdateClause += (" ,ModificationDate = GETDATE() ");
                pUpdateClause += " WHERE ID =" + pPurchaseInvoiceID.ToString();
                checkException = objCPurchaseInvoice.UpdateList(pUpdateClause);
                #endregion Update header

                #region Update Header total
                pUpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM PurchaseInvoiceItem WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID.ToString() + " AND IsDeleted=0)";
                pUpdateClause += " WHERE ID = " + pPurchaseInvoiceID.ToString();
                checkException = objCPurchaseInvoice.UpdateList(pUpdateClause);

                //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                pUpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                pUpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                pUpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                pUpdateClause += " WHERE ID = " + pPurchaseInvoiceID.ToString();
                checkException = objCPurchaseInvoice.UpdateList(pUpdateClause);
                #endregion Update Header total

                #region Add/Update Payable Flexi
                CPayables objCPayables = new CPayables();
                checkException = objCPurchaseInvoice.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID + " AND IsDeleted=0", "ID", out _TempRowCount);
                decimal _FlexiAmount = objCPurchaseInvoice.lstCVarPurchaseInvoice.Sum(s => s.Amount);
                checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE Code='FLEXI' AND OperationID=" + pOperationID + " AND CurrencyID=" + pCurrencyID, "ID", out _TempRowCount);
                if (objCvwPayables.lstCVarvwPayables.Count > 0)
                    checkException = objCPayables.UpdateList(
                        "Quantity=1"
                        + ", CostAmount=" + _FlexiAmount
                        + ", CostPrice=" + _FlexiAmount
                        + ", AmountWithoutVAT=" + _FlexiAmount
                        + ", TaxTypeID=NULL"
                        + ", TaxPercentage=NULL"
                        + ", TaxAmount=NULL"
                        + ", DiscountTypeID=NULL"
                        + ", DiscountPercentage=NULL"
                        + ", DiscountAmount=NULL"
                        + ", InitialSalePrice=" + _FlexiAmount
                        + ", CurrencyID=" + pCurrencyID
                        + ", ExchangeRate=" + pExchangeRate
                        + " WHERE IsApproved=0 AND ID=" + objCvwPayables.lstCVarvwPayables[0].ID);
                #endregion Add/Update Payable Flexi
            }
            #region Get Returned Data
            checkException = objCPurchaseInvoice.GetList("WHERE ID = " + pPurchaseInvoiceID.ToString());
            decimal pAmount = objCPurchaseInvoice.lstCVarPurchaseInvoice[0].Amount;
            checkException = objCvwPurchaseInvoice.GetListPaging(pPageSize, pPageNumber, pWhereClausePurchaseInvoice, pOrderBy, out _RowCount);
            checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");
            checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND OperationID=" + pOperationID, "ChargeTypeName", out _TempRowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            #endregion Get Returned Data
            return new object[] {
                _result ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem.lstCVarvwPurchaseInvoiceItem) : null //pData[1]
                , _result ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice) : null //pData[2]
                , pAmount //pData[2]
                , serializer.Serialize(objCvwPayables.lstCVarvwPayables) //pData[3]
            };
        }

        #endregion PurchaseInvoiceItem

        #region PurchaseInvoiceApproval

        [HttpPost, HttpGet]
        public object ApproveOrUnApprove(string pIDsToSetApproval, bool pIsApprove, Int32 pCostCenterID, string pWhereClause, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            string pUpdateClause = "";
            var ArrInvoiceIDs = pIDsToSetApproval.Split(',');
            int NumberOfInvoices = ArrInvoiceIDs.Count();
            CPurchaseInvoice objCPurchaseInvoice = new CPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
            int _RowCount = 0;

            #region Call ERP JV Entry (They approve just one at a time)
            CGroups objCGroups = new CGroups();
            objCGroups.GetList("WHERE GroupImageURL=N'Accounting'");
            if (!objCGroups.lstCVarGroups[0].IsInactive)
            {
                CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDs("ERP_ForwWeb_PostingPurchaseInvoice", ("," + pIDsToSetApproval + ","), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);
            }
            #endregion Call ERP JV Entry
            if (checkException == null)
            {
                for (int i = 0; i < NumberOfInvoices; i++)
                {
                    //update invoices to requested Approval/UnApproval
                    pUpdateClause = " IsApproved = " + (pIsApprove ? "1" : "0");
                    pUpdateClause += " ,ApprovingUserID = " + WebSecurity.CurrentUserId;
                    pUpdateClause += " ,ModificatorUserID = " + WebSecurity.CurrentUserId;
                    pUpdateClause += " ,ModificationDate = GETDATE() ";
                    pUpdateClause += " WHERE ID=" + ArrInvoiceIDs[i];
                    checkException = objCPurchaseInvoice.UpdateList(pUpdateClause);
                    if (checkException == null) //add to or remove from AccPartnerBalance according to pIsApprove
                    {
                        checkException = objCAccPartnerBalance.DeleteList("WHERE InvoiceID=" + ArrInvoiceIDs[i]);
                        if (!pIsApprove) //delete from AccPartnerBalance //i dont allow that unless there is no InvPaymentDetails
                        //if its requested to unapprove even paid invoices then delete from AccInvoicePaymentDetails and Reset PaidAmount & RemaingAmount in Invoices
                        {
                            //checkException = objCAccPartnerBalance.DeleteList("WHERE InvoiceID=" + ArrInvoiceIDs[i]);
                        }
                        else //pIsApprove = true so insert to AccPartnerBalance
                        {
                            #region Add to PartnerBalance table
                            //{
                            //    int constTransactionInvoice = 30;
                            //    objCvwPurchaseInvoice.GetListPaging(1, 1, ("WHERE ID=" + ArrInvoiceIDs[i]), "ID", out _RowCount);
                            //    CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                            //    objCVarAccPartnerBalance.InvoiceID = Int64.Parse(ArrInvoiceIDs[i]);
                            //    objCVarAccPartnerBalance.PartnerTypeID = objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].PartnerTypeID;
                            //    objCVarAccPartnerBalance.CustomerID = GetPartnerIDForInsert(1, objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].PartnerTypeID, objCvwPurchaseInvoice.lstCVarvwInvoices[0].PartnerID);
                            //    objCVarAccPartnerBalance.AgentID = GetPartnerIDForInsert(2, objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].PartnerTypeID, objCvwPurchaseInvoice.lstCVarvwInvoices[0].PartnerID);
                            //    objCVarAccPartnerBalance.ShippingAgentID = GetPartnerIDForInsert(3, objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].PartnerTypeID, objCvwPurchaseInvoice.lstCVarvwInvoices[0].PartnerID);
                            //    objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerIDForInsert(4, objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].PartnerTypeID, objCvwPurchaseInvoice.lstCVarvwInvoices[0].PartnerID);
                            //    objCVarAccPartnerBalance.ShippingLineID = GetPartnerIDForInsert(5, objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].PartnerTypeID, objCvwPurchaseInvoice.lstCVarvwInvoices[0].PartnerID);
                            //    objCVarAccPartnerBalance.AirlineID = GetPartnerIDForInsert(6, objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].PartnerTypeID, objCvwPurchaseInvoice.lstCVarvwInvoices[0].PartnerID);
                            //    objCVarAccPartnerBalance.TruckerID = GetPartnerIDForInsert(7, objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].PartnerTypeID, objCvwPurchaseInvoice.lstCVarvwInvoices[0].PartnerID);
                            //    objCVarAccPartnerBalance.SupplierID = GetPartnerIDForInsert(8, objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].PartnerTypeID, objCvwPurchaseInvoice.lstCVarvwInvoices[0].PartnerID);
                            //    objCVarAccPartnerBalance.DebitAmount = objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].Amount;
                            //    objCVarAccPartnerBalance.CurrencyID = objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].CurrencyID;
                            //    objCVarAccPartnerBalance.ExchangeRate = objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].ExchangeRate;// decimal.Parse(ArrExchangeRates[i]); ///////////////////////////////////
                            //    objCVarAccPartnerBalance.BalCurLocalExRate = objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].ExchangeRate; ///////////////////////////////////
                            //    objCVarAccPartnerBalance.InvCurLocalExRate = objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice[0].ExchangeRate; ///////////////////////////////////
                            //    objCVarAccPartnerBalance.TransactionType = constTransactionInvoice;
                            //    objCVarAccPartnerBalance.Notes = "Purchase Invoice Approval.";
                            //    objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                            //    objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;

                            //    objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                            //    checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                            //}
                            #endregion Add to PartnerBalance table
                        } //of else i.e. pIsApprove = true
                    }
                } //of the for loop
            } //JV entry successful
            if (checkException == null)
            {
                _result = true;
                objCvwPurchaseInvoice.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            }
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice)
                , _result ? "" : checkException.Message
            };
        } //of fn
        [HttpGet, HttpPost]
        public Object[] PurchaseInvoiceApproval_PartnerTypeChanged(Int32 pPartnerTypeID, string pWhereClause, string pOrderBy, Int32 pPageNumber, Int32 pPageSize)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();

            if (pPartnerTypeID != 0)
                checkException = objCvwAccPartners.GetListPaging(10000, 1, "WHERE PartnerTypeID=" + pPartnerTypeID, "Name", out _RowCount);
            checkException = objCvwPurchaseInvoice.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwAccPartners.lstCVarvwAccPartners)
            };
        }

        #endregion PurchaseInvoiceApproval

        #region Flexi

        [HttpGet, HttpPost]
        public object[] Flexi_LoadAll(string pWhereClauseFlexi, Int64 pOperationID, string pOrderBy)
        {
            Exception checkException = null;
            int _RowCount = 0;
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            objCOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID, "ContainerNumber", out _RowCount);
            var pContainerList = objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.ContainerNumber
                }).OrderBy(o => o.Code).ToList();

            CvwFlexiSerial objCvwFlexiSerial = new CvwFlexiSerial();
            CvwFlexiSerial_OpeningBalance objCvwFlexiSerial_OpeningBalance = new CvwFlexiSerial_OpeningBalance();

            if (pWhereClauseFlexi.Contains("OpeningBalance"))
                checkException = objCvwFlexiSerial_OpeningBalance.GetListPaging(999999, 1, pWhereClauseFlexi, pOrderBy, out _RowCount);
            else
                checkException = objCvwFlexiSerial.GetListPaging(999999, 1, pWhereClauseFlexi, pOrderBy, out _RowCount);



            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwFlexiSerial.lstCVarvwFlexiSerial)
                ,serializer.Serialize(pContainerList) //pData[1] 
                , serializer.Serialize(objCvwFlexiSerial_OpeningBalance.lstCVarvwFlexiSerial_OpeningBalance)
            };
        }

        [HttpGet, HttpPost]
        public object[] Flexi_SaveSingleFlexiSerial(Int64 pSingFlexiSerialID, Int64 pOperationID, Int64 pPurchaseInvoiceID, Int64 pPurchaseInvoiceItemID, string pCode, bool? pIsFromOpeningBalanceFlexi)
        {
            string _MessageReturned = "";
            string _UpdateClause = "";
            Exception checkException = null;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            int _TempRowCount = 0;
            CFlexiSerial objCFlexiSerial = new CFlexiSerial();
            CvwFlexiSerial objCvwFlexiSerial = new CvwFlexiSerial();
            CvwFlexiSerial objCvwFlexiSerial_CheckUniqueness = new CvwFlexiSerial();
            CPurchaseInvoiceItem objCPurchaseInvoiceItem = new CPurchaseInvoiceItem();
            CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItem = new CvwPurchaseInvoiceItem();
            CPurchaseInvoice objCPurchaseInvoice = new CPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoiceHeader = new CvwPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();



            CvwFlexiSerial_OpeningBalance objCvwFlexiSerial_OpeningBalance = new CvwFlexiSerial_OpeningBalance();
            CvwFlexiSerial_OpeningBalance objCvwFlexiSerial_CheckUniqueness_OpeningBalance = new CvwFlexiSerial_OpeningBalance();
            CPurchaseInvoiceItem_OpeningBalance objCPurchaseInvoiceItem_OpeningBalance = new CPurchaseInvoiceItem_OpeningBalance();
            CvwPurchaseInvoiceItem_OpeningBalance objCvwPurchaseInvoiceItem_OpeningBalance = new CvwPurchaseInvoiceItem_OpeningBalance();
            CPurchaseInvoice_OpeningBalance objCPurchaseInvoice_OpeningBalance = new CPurchaseInvoice_OpeningBalance();
            CvwPurchaseInvoice_OpeningBalance objCvwPurchaseInvoiceHeader_OpeningBalance = new CvwPurchaseInvoice_OpeningBalance();
            CvwPurchaseInvoice_OpeningBalance objCvwPurchaseInvoice_OpeningBalance = new CvwPurchaseInvoice_OpeningBalance();










            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            objCOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID, "ContainerNumber", out _TempRowCount);
            var pContainerList = objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.ContainerNumber
                }).OrderBy(o => o.Code).ToList();
            checkException = objCvwFlexiSerial_CheckUniqueness.GetList("WHERE Code=N'" + pCode + "' AND ImportOperationID=" + pOperationID);
            //till now its always insert from import
            if (pSingFlexiSerialID == 0 && objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0) //insert
            {
                CVarFlexiSerial objCVarFlexiSerial = new CVarFlexiSerial();
                objCVarFlexiSerial.ID = 0;
                objCVarFlexiSerial.ImportPurchaseInvoiceItemID = (pIsFromOpeningBalanceFlexi == true ? 0 : pPurchaseInvoiceItemID);
                objCVarFlexiSerial.ExportPurchaseInvoiceItemID = 0;
                //--------
                objCVarFlexiSerial.ImportPurchaseInvoice_OpeningBalanceItemID = (pIsFromOpeningBalanceFlexi == true ? pPurchaseInvoiceItemID : 0);
                objCVarFlexiSerial.ExportPurchaseInvoice_OpeningBalanceItemID = 0;
                //--------
                objCVarFlexiSerial.Code = pCode;
                objCVarFlexiSerial.ExportPrice = 0;
                objCVarFlexiSerial.ContainerID = 0;
                objCVarFlexiSerial.Notes = "0";
                objCFlexiSerial.lstCVarFlexiSerial.Add(objCVarFlexiSerial);
                checkException = objCFlexiSerial.SaveMethod(objCFlexiSerial.lstCVarFlexiSerial);

                #region Update PurchaseInvoiceItem Quanity
                _UpdateClause = " Quantity = (SELECT COUNT(*) FROM FlexiSerial WHERE ImportPurchaseInvoiceItemID = " + pPurchaseInvoiceItemID + ")";
                _UpdateClause += " ,Amount = UnitPrice * (SELECT COUNT(*) FROM FlexiSerial WHERE ImportPurchaseInvoiceItemID = " + pPurchaseInvoiceItemID + ")";
                //checkException = objCPurchaseInvoiceItem.UpdateList(_UpdateClause);
                checkException = objCPurchaseInvoiceItem.UpdateList(_UpdateClause + " where PurchaseInvoiceID = " + pPurchaseInvoiceID + " ");
                if (checkException != null)
                    _MessageReturned += " & " + checkException.Message;
                #endregion Update PurchaseInvoiceItem Quanity

                #region Update Header total for case of update
                _UpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM PurchaseInvoiceItem WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID + " AND IsDeleted=0)";
                _UpdateClause += " WHERE ID = " + pPurchaseInvoiceID;
                if (pIsFromOpeningBalanceFlexi == true)
                    checkException = objCPurchaseInvoice_OpeningBalance.UpdateList(_UpdateClause);
                else
                    checkException = objCPurchaseInvoice.UpdateList(_UpdateClause);

                //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                _UpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                _UpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                _UpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                _UpdateClause += " WHERE ID = " + pPurchaseInvoiceID;
                if (pIsFromOpeningBalanceFlexi == true)
                    checkException = objCPurchaseInvoice_OpeningBalance.UpdateList(_UpdateClause);
                else
                    checkException = objCPurchaseInvoice.UpdateList(_UpdateClause);
                #endregion Update Header total for case of update

                #region Get Returned Data
                if (pIsFromOpeningBalanceFlexi == true)
                {
                    checkException = objCvwPurchaseInvoiceHeader_OpeningBalance.GetListPaging(999999, 1, "WHERE ID = " + pPurchaseInvoiceID, "ID", out _TempRowCount);
                    checkException = objCvwPurchaseInvoice_OpeningBalance.GetListPaging(999999, 1, "WHERE OperationID = " + pOperationID, "ID", out _TempRowCount);
                    checkException = objCvwPurchaseInvoiceItem_OpeningBalance.GetList("WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID + " ORDER BY PurchaseItemName");
                    checkException = objCvwFlexiSerial_OpeningBalance.GetList("WHERE ImportPurchaseInvoice_OpeningBalanceItemID =" + pPurchaseInvoiceItemID + " ORDER BY Code");
                }
                else
                {
                    checkException = objCvwPurchaseInvoiceHeader.GetListPaging(999999, 1, "WHERE ID = " + pPurchaseInvoiceID, "ID", out _TempRowCount);
                    checkException = objCvwPurchaseInvoice.GetListPaging(999999, 1, "WHERE OperationID = " + pOperationID, "ID", out _TempRowCount);
                    checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID + " ORDER BY PurchaseItemName");
                    checkException = objCvwFlexiSerial.GetList("WHERE ImportPurchaseInvoiceItemID=" + pPurchaseInvoiceItemID + " ORDER BY Code");

                }

                #endregion Get Returned Data
            }
            else
                _MessageReturned = "This Flexi already exists on that operation.";
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" && objCvwPurchaseInvoiceHeader.lstCVarvwPurchaseInvoice.Count > 0  ? serializer.Serialize(objCvwPurchaseInvoiceHeader.lstCVarvwPurchaseInvoice[0]) : null //_PurchaseInvoiceHeader: pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice) : null //_PurchaseInvoice: pData[2]
                , _MessageReturned == "" ? serializer.Serialize(objCvwPurchaseInvoiceItem.lstCVarvwPurchaseInvoiceItem) : null //Details: pData[3]
                , _MessageReturned == "" ? serializer.Serialize(objCvwFlexiSerial.lstCVarvwFlexiSerial) : null //pFlexi: pData[4]
                , _MessageReturned == "" ? serializer.Serialize(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages) : null //pContainerList: pData[5]

                 , _MessageReturned == "" && objCvwPurchaseInvoiceHeader_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance.Count > 0 ? serializer.Serialize(objCvwPurchaseInvoiceHeader_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance[0]) : null //_PurchaseInvoiceHeader: pData[6]
                , _MessageReturned == "" ? serializer.Serialize(objCvwPurchaseInvoice_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance) : null //_PurchaseInvoice: pData[7]
                , _MessageReturned == "" ? serializer.Serialize(objCvwPurchaseInvoiceItem_OpeningBalance.lstCVarvwPurchaseInvoiceItem_OpeningBalance) : null //Details: pData[8]
                , _MessageReturned == "" ? serializer.Serialize(objCvwFlexiSerial_OpeningBalance.lstCVarvwFlexiSerial_OpeningBalance) : null //pFlexi: pData[9]

            };
        }

        [HttpGet, HttpPost]
        public object[] FlexiImport_SaveList([FromBody] FlexiImport_SaveList pParameters)
        {
            Exception checkException = null;
            string _MessageReturned = "";
            Int64 _FlexiPurchaseItemID = 0;
            Int64 _ImportPurchaseInvoiceItemID = 0;
            string _UpdateClause = "";
            int _RowCount = 0;

            int constFlexiPurchaseInvoiceTypeID = 10; //FLEXI
            int constHeaterPadPurchaseInvoiceTypeID = 20; //HEATER PAD
            int constIronPurchaseInvoiceTypeID = 30; //IRON

            CPurchaseInvoice objCPurchaseInvoice = new CPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoiceHeader = new CvwPurchaseInvoice();
            CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItem = new CvwPurchaseInvoiceItem();


            CPurchaseInvoice_OpeningBalance objCPurchaseInvoice_OpeningBalance = new CPurchaseInvoice_OpeningBalance();
            CvwPurchaseInvoice_OpeningBalance objCvwPurchaseInvoice_OpeningBalance = new CvwPurchaseInvoice_OpeningBalance();
            CvwPurchaseInvoice_OpeningBalance objCvwPurchaseInvoiceHeader_OpeningBalance = new CvwPurchaseInvoice_OpeningBalance();
            CvwPurchaseInvoiceItem_OpeningBalance objCvwPurchaseInvoiceItem_OpeningBalance = new CvwPurchaseInvoiceItem_OpeningBalance();


            var IsOpeningBalanceFlexi = pParameters.pIsOpeningBalanceFlexi;

            Int64 MainInvoiceID = pParameters.pPurchaseInvoiceID;

            CvwDefaults objCvwDefaults = new CvwDefaults();
            CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            checkException = objCvwNoAccessUnit.GetList("WHERE 1=1");
            int _LengthUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].LengthUnitID).First().ID;
            int _WeightUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].WeightUnitID).First().ID;
            int _VolumeUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].VolumeUnitID).First().ID;
            int _NumberOfRows = pParameters.pCodeList.Split(',').Length;
            #region Add FLEXI to PurchaseItems if not exists and get FlexiPurchaseItemID
            CPurchaseItem objCPurchaseItem_Flexi = new CPurchaseItem();//get flexi PurchaseItemID
            checkException = objCPurchaseItem_Flexi.GetList("WHERE Code=N'" + pParameters.pInvoiceTypeName + "'");
            if (objCPurchaseItem_Flexi.lstCVarPurchaseItem.Count > 0) //Flexi PurchaseItem exists
                _FlexiPurchaseItemID = objCPurchaseItem_Flexi.lstCVarPurchaseItem[0].ID;
            else //Add Flexi to purchase items
            {
                CVarPurchaseItem objCVarPurchaseItem = new CVarPurchaseItem();
                objCVarPurchaseItem.Code = pParameters.pInvoiceTypeName;
                objCVarPurchaseItem.Name = pParameters.pInvoiceTypeName;
                objCVarPurchaseItem.LocalName = pParameters.pInvoiceTypeName;
                objCVarPurchaseItem.Price = 0;  //Decimal.Parse(insertPIFromExcel.pPriceList.Split(',')[i]);
                objCVarPurchaseItem.StockUnitQuantity = 0;
                objCVarPurchaseItem.CurrencyID = objCvwDefaults.lstCVarvwDefaults[0].CurrencyID;
                objCVarPurchaseItem.PartNumber = "0";  //insertPIFromExcel.pPartNumberList.Split(',')[i];
                objCVarPurchaseItem.HSCode = "0";  //insertPIFromExcel.pHSCodeList.Split(',')[i];

                objCVarPurchaseItem.ModelNumber = "0";
                objCVarPurchaseItem.BrandName = "0";
                objCVarPurchaseItem.ProductType = "0";

                objCVarPurchaseItem.Notes = "0";
                objCVarPurchaseItem.CreatorUserID = objCVarPurchaseItem.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarPurchaseItem.CreationDate = objCVarPurchaseItem.ModificationDate = DateTime.Now;

                objCVarPurchaseItem.WeightUnitID = _WeightUnitID;
                objCVarPurchaseItem.LengthUnitID = _LengthUnitID;
                objCVarPurchaseItem.VolumeUnitID = _VolumeUnitID;
                objCVarPurchaseItem.IsFragile = false;
                objCVarPurchaseItem.IsIMO = false;
                objCVarPurchaseItem.IsAddedFromExcel = true;
                objCVarPurchaseItem.IsFlexi = true;

                objCVarPurchaseItem.PreferredAreaID = 0;
                objCVarPurchaseItem.ByExpireDate = false;
                objCVarPurchaseItem.BySerialNo = false;
                objCVarPurchaseItem.ByLotNo = false;
                objCVarPurchaseItem.ByVehicle = false;
                objCVarPurchaseItem.ClientID = 0;

                #region Vehicle
                objCVarPurchaseItem.OperationID = 0;
                objCVarPurchaseItem.IsVehicle = false;
                objCVarPurchaseItem.EquipmentModelID = 0;
                objCVarPurchaseItem.MotorNumber = "0";
                objCVarPurchaseItem.ChassisNumber = "0";
                objCVarPurchaseItem.LotNumber = "0";
                objCVarPurchaseItem.SerialNumber = "0";
                #endregion Vehicle

                CPurchaseItem objCPurchaseItem = new CPurchaseItem();
                objCPurchaseItem.lstCVarPurchaseItem.Add(objCVarPurchaseItem);
                checkException = objCPurchaseItem.SaveMethod(objCPurchaseItem.lstCVarPurchaseItem);
                if (checkException == null)
                    _FlexiPurchaseItemID = objCVarPurchaseItem.ID;
                else
                    _MessageReturned = checkException.Message;
            }
            #endregion Add FLEXI to PurchaseItems if not exists and get FlexiPurchaseItemID
            if (IsOpeningBalanceFlexi == true)
            {
                #region AddPurchaseInvoice
                int _TempRowCount = 0;
                CPurchaseInvoice_OpeningBalance objCPurchaseInvoice_OpeningBalance_IsPosted = new CPurchaseInvoice_OpeningBalance();
                objCPurchaseInvoice_OpeningBalance_IsPosted.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pParameters.pPurchaseInvoiceID, "ID", out _TempRowCount);
                if (objCPurchaseInvoice_OpeningBalance_IsPosted.lstCVarPurchaseInvoice_OpeningBalance.Count == 0 && _MessageReturned == "") //not posted so save
                {
                    #region PurchaseInvoiceHeader_OpeningBalance
                    if (pParameters.pPurchaseInvoiceID == 0) //this means insert header
                    {
                        CVarPurchaseInvoice_OpeningBalance objCVarPurchaseInvoice_OpeningBalance = new CVarPurchaseInvoice_OpeningBalance();
                        objCVarPurchaseInvoice_OpeningBalance.InvoiceNumber = pParameters.pInvoiceNumber;
                        objCVarPurchaseInvoice_OpeningBalance.EditableCode = pParameters.pEditableCode;
                        objCVarPurchaseInvoice_OpeningBalance.OperationID = pParameters.pOperationID;
                        objCVarPurchaseInvoice_OpeningBalance.ClientOperationPartnerID = pParameters.pClientOperationPartnerID;
                        objCVarPurchaseInvoice_OpeningBalance.ClientAddressID = pParameters.pClientAddressID;
                        objCVarPurchaseInvoice_OpeningBalance.ClientPrintedAddress = pParameters.pClientPrintedAddress;
                        objCVarPurchaseInvoice_OpeningBalance.SupplierOperationPartnerID = pParameters.pSupplierOperationPartnerID;
                        objCVarPurchaseInvoice_OpeningBalance.SupplierAddressID = pParameters.pSupplierAddressID;
                        objCVarPurchaseInvoice_OpeningBalance.SupplierPrintedAddress = pParameters.pSupplierPrintedAddress;
                        objCVarPurchaseInvoice_OpeningBalance.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                        objCVarPurchaseInvoice_OpeningBalance.CurrencyID = pParameters.pCurrencyID;
                        objCVarPurchaseInvoice_OpeningBalance.ExchangeRate = pParameters.pExchangeRate;
                        objCVarPurchaseInvoice_OpeningBalance.InvoiceDate = DateTime.ParseExact(pParameters.pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                        objCVarPurchaseInvoice_OpeningBalance.TaxTypeID = pParameters.pTaxTypeID;
                        objCVarPurchaseInvoice_OpeningBalance.TaxPercentage = pParameters.pTaxPercentage;
                        objCVarPurchaseInvoice_OpeningBalance.TaxAmount = pParameters.pTaxAmount;
                        objCVarPurchaseInvoice_OpeningBalance.DiscountTypeID = pParameters.pDiscountTypeID;
                        objCVarPurchaseInvoice_OpeningBalance.DiscountPercentage = pParameters.pDiscountPercentage;
                        objCVarPurchaseInvoice_OpeningBalance.DiscountAmount = pParameters.pDiscountAmount;
                        objCVarPurchaseInvoice_OpeningBalance.Amount = 0;// pAmount; //Calculated at the end of the function
                        objCVarPurchaseInvoice_OpeningBalance.Notes = pParameters.pNotes;
                        objCVarPurchaseInvoice_OpeningBalance.BranchID = pParameters.pBranchID;
                        objCVarPurchaseInvoice_OpeningBalance.IsApproved = pParameters.pIsApproved;
                        objCVarPurchaseInvoice_OpeningBalance.IsDeleted = pParameters.pIsDeleted;
                        objCVarPurchaseInvoice_OpeningBalance.ApprovingUserID = pParameters.pApprovingUserID;
                        objCVarPurchaseInvoice_OpeningBalance.PaymentTermID = pParameters.pPaymentTermID;

                        objCVarPurchaseInvoice_OpeningBalance.CreatorUserID = objCVarPurchaseInvoice_OpeningBalance.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPurchaseInvoice_OpeningBalance.CreationDate = objCVarPurchaseInvoice_OpeningBalance.ModificationDate = DateTime.Now;

                        objCPurchaseInvoice_OpeningBalance.lstCVarPurchaseInvoice_OpeningBalance.Add(objCVarPurchaseInvoice_OpeningBalance);
                        checkException = objCPurchaseInvoice_OpeningBalance.SaveMethod(objCPurchaseInvoice_OpeningBalance.lstCVarPurchaseInvoice_OpeningBalance);
                        pParameters.pPurchaseInvoiceID = objCVarPurchaseInvoice_OpeningBalance.ID;
                    }
                    else //update header
                    {
                        _UpdateClause = (pParameters.pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pParameters.pEditableCode.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + pParameters.pOperationID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + pParameters.pClientOperationPartnerID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pParameters.pClientAddressID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pParameters.pClientPrintedAddress.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + pParameters.pSupplierOperationPartnerID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pParameters.pSupplierAddressID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pParameters.pSupplierPrintedAddress.ToString() + "'")) + " \n";
                        //Calculated at the end of the function
                        //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pParameters.pCurrencyID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pParameters.pExchangeRate.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pParameters.pInvoiceDate, 1) + "'"));
                        _UpdateClause += (pParameters.pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pParameters.pTaxTypeID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pParameters.pTaxPercentage.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pParameters.pTaxAmount.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pParameters.pDiscountTypeID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pParameters.pDiscountPercentage.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pParameters.pDiscountAmount.ToString() + "'")) + " \n";
                        //Calculated at the end of the function
                        //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pParameters.pNotes.ToString() + "'")) + " \n";
                        //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                        _UpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pParameters.pOperationID + ") " + " \n";
                        _UpdateClause += (pParameters.pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                        _UpdateClause += (pParameters.pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                        _UpdateClause += (pParameters.pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pParameters.pApprovingUserID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pParameters.pPaymentTermID.ToString() + "'")) + " \n";

                        _UpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                        _UpdateClause += (" ,ModificationDate = GETDATE() ");
                        _UpdateClause += " WHERE ID =" + pParameters.pPurchaseInvoiceID.ToString();
                        checkException = objCPurchaseInvoice_OpeningBalance.UpdateList(_UpdateClause);
                    }
                    #endregion PurchaseInvoiceHeader_OpeningBalance
                    #region PurchaseInvoiceItem_OpeningBalance for both insert and update
                    CVarPurchaseInvoiceItem_OpeningBalance objCVarPurchaseInvoiceItem_OpeningBalance = new CVarPurchaseInvoiceItem_OpeningBalance();
                    objCVarPurchaseInvoiceItem_OpeningBalance.ID = 0;
                    objCVarPurchaseInvoiceItem_OpeningBalance.PurchaseInvoiceID = pParameters.pPurchaseInvoiceID;
                    objCVarPurchaseInvoiceItem_OpeningBalance.PurchaseItemID = _FlexiPurchaseItemID;
                    objCVarPurchaseInvoiceItem_OpeningBalance.Amount = 0;
                    objCVarPurchaseInvoiceItem_OpeningBalance.Notes = "0";
                    objCVarPurchaseInvoiceItem_OpeningBalance.UnitPrice = 0;
                    objCVarPurchaseInvoiceItem_OpeningBalance.Quantity = 1;
                    objCVarPurchaseInvoiceItem_OpeningBalance.PartNumber = "0";
                    objCVarPurchaseInvoiceItem_OpeningBalance.CountryOfOriginID = 0;
                    objCVarPurchaseInvoiceItem_OpeningBalance.HSCode = "0";
                    objCVarPurchaseInvoiceItem_OpeningBalance.ExportPrice = 0;
                    CPurchaseInvoiceItem_OpeningBalance objCPurchaseInvoiceItem_OpeningBalance = new CPurchaseInvoiceItem_OpeningBalance();
                    objCPurchaseInvoiceItem_OpeningBalance.lstCVarPurchaseInvoiceItem_OpeningBalance.Add(objCVarPurchaseInvoiceItem_OpeningBalance);
                    checkException = objCPurchaseInvoiceItem_OpeningBalance.SaveMethod(objCPurchaseInvoiceItem_OpeningBalance.lstCVarPurchaseInvoiceItem_OpeningBalance);
                    _ImportPurchaseInvoiceItemID = objCVarPurchaseInvoiceItem_OpeningBalance.ID;
                    #endregion PurchaseInvoiceItem_OpeningBalance for both insert and update

                    #region Insert FlexiSerial
                    for (int i = 0; i < _NumberOfRows; i++)
                    {
                        CvwFlexiSerial objCvwFlexiSerial_CheckUniqueness = new CvwFlexiSerial();
                        checkException = objCvwFlexiSerial_CheckUniqueness.GetList("WHERE Code=N'" + pParameters.pCodeList.Split(',')[i] + "' AND ImportOperationID=" + pParameters.pOperationID);
                        if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                        {
                            CVarFlexiSerial objCVarFlexiSerial = new CVarFlexiSerial();
                            objCVarFlexiSerial.ID = 0;
                            objCVarFlexiSerial.ImportPurchaseInvoiceItemID = 0;
                            objCVarFlexiSerial.ExportPurchaseInvoiceItemID = 0;
                            objCVarFlexiSerial.ImportPurchaseInvoice_OpeningBalanceItemID = _ImportPurchaseInvoiceItemID;
                            objCVarFlexiSerial.ExportPurchaseInvoice_OpeningBalanceItemID = 0;
                            objCVarFlexiSerial.Code = pParameters.pCodeList.Split(',')[i];
                            objCVarFlexiSerial.ContainerID = 0;
                            objCVarFlexiSerial.Notes = "0";
                            CFlexiSerial objCFlexiSerial = new CFlexiSerial();
                            objCFlexiSerial.lstCVarFlexiSerial.Add(objCVarFlexiSerial);
                            checkException = objCFlexiSerial.SaveMethod(objCFlexiSerial.lstCVarFlexiSerial);
                            if (checkException != null)
                                _MessageReturned += " & " + checkException.Message;
                        } //if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                    } //for (int i = 0; i < _ArrFlexi.Length; i++)
                    #endregion Insert FlexiSerial

                    #region Update PurchaseInvoiceItem Quanity
                    _UpdateClause = " Quantity = (SELECT COUNT(*) FROM FlexiSerial WHERE ImportPurchaseInvoice_OpeningBalanceItemID = " + _ImportPurchaseInvoiceItemID + ")";
                    //  checkException = objCPurchaseInvoiceItem_OpeningBalance.UpdateList(_UpdateClause);
                    checkException = objCPurchaseInvoiceItem_OpeningBalance.UpdateList(_UpdateClause + " where PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID + " ");

                    // objCPurchaseInvoiceItem_OpeningBalance.lstCVarPurchaseInvoiceItem_OpeningBalance[0].PurchaseInvoiceID = ;
                    if (checkException != null)
                        _MessageReturned += " & " + checkException.Message;
                    #endregion Update PurchaseInvoiceItem Quanity

                    #region Update Header total for case of update
                    _UpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM PurchaseInvoiceItem_OpeningBalance WHERE PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID.ToString() + " AND IsDeleted=0)";
                    _UpdateClause += " WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString();
                    checkException = objCPurchaseInvoice_OpeningBalance.UpdateList(_UpdateClause);

                    //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                    _UpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                    _UpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                    _UpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                    _UpdateClause += " WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString();
                    checkException = objCPurchaseInvoice_OpeningBalance.UpdateList(_UpdateClause);
                    #endregion Update Header total for case of update

                    #region Get Returned Data
                    checkException = objCvwPurchaseInvoiceHeader_OpeningBalance.GetListPaging(999999, 1, "WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString(), pParameters.pOrderBy, out _TempRowCount);
                    checkException = objCvwPurchaseInvoice_OpeningBalance.GetListPaging(pParameters.pPageSize, pParameters.pPageNumber, pParameters.pWhereClausePurchaseInvoice, pParameters.pOrderBy, out _TempRowCount);
                    checkException = objCvwPurchaseInvoiceItem_OpeningBalance.GetList("WHERE PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");
                    pParameters.pEditableCode = objCvwPurchaseInvoiceHeader_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance[0].EditableCode;
                    #endregion Get Returned Data
                } //if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
                #endregion Add PurchaseInvoice
                #region Tax

                string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                if ((CompanyName == "CHM") && checkException == null)
                {
                    CPurchaseInvoiceTax objCPurchaseInvoiceTax = new CPurchaseInvoiceTax();


                    CPurchaseInvoice_OpeningBalanceTax objCPurchaseInvoice_OpeningBalanceTax = new CPurchaseInvoice_OpeningBalanceTax();


                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

                    Int64 InvoiceID = 0;
                    Int64 _FlexiPurchaseItemIDTax = 0;
                    objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
                    checkException = objCvwNoAccessUnit.GetList("WHERE 1=1");
                    //int _LengthUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].LengthUnitID).First().ID;
                    //int _WeightUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].WeightUnitID).First().ID;
                    //int _VolumeUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].VolumeUnitID).First().ID;
                    //int _NumberOfRows = pParameters.pCodeList.Split(',').Length;
                    #region Add FLEXI to PurchaseItems if not exists and get FlexiPurchaseItemID
                    CPurchaseItemTax objCPurchaseItem_FlexiTax = new CPurchaseItemTax();//get flexi PurchaseItemID
                    CTaxLink CTaxLink = new CTaxLink();
                    CTaxLink.GetList("where notes='Operations' and OriginID=" + pParameters.pOperationID);
                    checkException = objCPurchaseItem_FlexiTax.GetList("WHERE Code=N'" + pParameters.pInvoiceTypeName + "'");
                    if (objCPurchaseItem_FlexiTax.lstCVarPurchaseItem.Count > 0) //Flexi PurchaseItem exists
                        _FlexiPurchaseItemIDTax = objCPurchaseItem_FlexiTax.lstCVarPurchaseItem[0].ID;
                    else //Add Flexi to purchase items
                    {
                        CVarPurchaseItemTax objCVarPurchaseItemTax = new CVarPurchaseItemTax();
                        objCVarPurchaseItemTax.Code = pParameters.pInvoiceTypeName;
                        objCVarPurchaseItemTax.Name = pParameters.pInvoiceTypeName;
                        objCVarPurchaseItemTax.LocalName = pParameters.pInvoiceTypeName;
                        objCVarPurchaseItemTax.Price = 0;  //Decimal.Parse(insertPIFromExcel.pPriceList.Split(',')[i]);
                        objCVarPurchaseItemTax.StockUnitQuantity = 0;
                        objCVarPurchaseItemTax.CurrencyID = objCvwDefaults.lstCVarvwDefaults[0].CurrencyID;
                        objCVarPurchaseItemTax.PartNumber = "0";  //insertPIFromExcel.pPartNumberList.Split(',')[i];
                        objCVarPurchaseItemTax.HSCode = "0";  //insertPIFromExcel.pHSCodeList.Split(',')[i];

                        objCVarPurchaseItemTax.ModelNumber = "0";
                        objCVarPurchaseItemTax.BrandName = "0";
                        objCVarPurchaseItemTax.ProductType = "0";

                        objCVarPurchaseItemTax.Notes = "0";
                        objCVarPurchaseItemTax.CreatorUserID = objCVarPurchaseItemTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPurchaseItemTax.CreationDate = objCVarPurchaseItemTax.ModificationDate = DateTime.Now;

                        objCVarPurchaseItemTax.WeightUnitID = _WeightUnitID;
                        objCVarPurchaseItemTax.LengthUnitID = _LengthUnitID;
                        objCVarPurchaseItemTax.VolumeUnitID = _VolumeUnitID;
                        objCVarPurchaseItemTax.IsFragile = false;
                        objCVarPurchaseItemTax.IsIMO = false;
                        objCVarPurchaseItemTax.IsAddedFromExcel = true;
                        objCVarPurchaseItemTax.IsFlexi = true;

                        objCVarPurchaseItemTax.PreferredAreaID = 0;
                        objCVarPurchaseItemTax.ByExpireDate = false;
                        objCVarPurchaseItemTax.BySerialNo = false;
                        objCVarPurchaseItemTax.ByLotNo = false;
                        objCVarPurchaseItemTax.ByVehicle = false;

                        #region Vehicle
                        objCVarPurchaseItemTax.OperationID = 0;
                        objCVarPurchaseItemTax.IsVehicle = false;
                        objCVarPurchaseItemTax.EquipmentModelID = 0;
                        objCVarPurchaseItemTax.MotorNumber = "0";
                        objCVarPurchaseItemTax.ChassisNumber = "0";
                        objCVarPurchaseItemTax.LotNumber = "0";
                        objCVarPurchaseItemTax.SerialNumber = "0";
                        #endregion Vehicle

                        CPurchaseItemTax objCPurchaseItemTax = new CPurchaseItemTax();
                        objCPurchaseItemTax.lstCVarPurchaseItem.Add(objCVarPurchaseItemTax);
                        checkException = objCPurchaseItemTax.SaveMethod(objCPurchaseItemTax.lstCVarPurchaseItem);
                        if (checkException == null)
                        {
                            _FlexiPurchaseItemIDTax = objCVarPurchaseItemTax.ID;
                            //link
                            objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + _FlexiPurchaseItemID + "," + _FlexiPurchaseItemIDTax + "," + "PurchaseInvoice");

                        }

                        else
                            _MessageReturned = checkException.Message;
                    }
                    #endregion Add FLEXI to PurchaseItems if not exists and get FlexiPurchaseItemID
                    if (IsOpeningBalanceFlexi == true)
                    {
                        #region AddPurchaseInvoice
                        CTaxLink CCTaxLink2 = new CTaxLink();
                        CCTaxLink2.GetList("WHERE originID =" + pParameters.pPurchaseInvoiceID);

                        CTaxLink CTaxLinkOperationPartnersSupplier = new CTaxLink();
                        CTaxLinkOperationPartnersSupplier.GetList("where notes='OperationPartners' and OriginID=" + pParameters.pSupplierOperationPartnerID);

                        CPurchaseInvoice_OpeningBalanceTax objCPurchaseInvoice_OpeningBalance_IsPostedTax = new CPurchaseInvoice_OpeningBalanceTax();
                        objCPurchaseInvoice_OpeningBalance_IsPostedTax.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + ((CCTaxLink2.lstCVarTaxLink.Count > 0 ? CCTaxLink2.lstCVarTaxLink[0].TaxID : 0)), "ID", out _TempRowCount);
                        if (objCPurchaseInvoice_OpeningBalance_IsPostedTax.lstCVarPurchaseInvoice_OpeningBalance.Count == 0 && _MessageReturned == "") //not posted so save
                        {
                            #region PurchaseInvoiceHeader_OpeningBalance
                            if (MainInvoiceID == 0) //this means insert header
                            {
                                CVarPurchaseInvoice_OpeningBalanceTax objCVarPurchaseInvoice_OpeningBalanceTax = new CVarPurchaseInvoice_OpeningBalanceTax();
                                objCVarPurchaseInvoice_OpeningBalanceTax.InvoiceNumber = pParameters.pInvoiceNumber;
                                objCVarPurchaseInvoice_OpeningBalanceTax.EditableCode = pParameters.pEditableCode;
                                objCVarPurchaseInvoice_OpeningBalanceTax.OperationID = CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ClientOperationPartnerID = pParameters.pClientOperationPartnerID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ClientAddressID = pParameters.pClientAddressID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ClientPrintedAddress = pParameters.pClientPrintedAddress;
                                objCVarPurchaseInvoice_OpeningBalanceTax.SupplierOperationPartnerID = CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0;
                                objCVarPurchaseInvoice_OpeningBalanceTax.SupplierAddressID = pParameters.pSupplierAddressID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.SupplierPrintedAddress = pParameters.pSupplierPrintedAddress;
                                objCVarPurchaseInvoice_OpeningBalanceTax.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                                objCVarPurchaseInvoice_OpeningBalanceTax.CurrencyID = pParameters.pCurrencyID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ExchangeRate = pParameters.pExchangeRate;
                                objCVarPurchaseInvoice_OpeningBalanceTax.InvoiceDate = DateTime.ParseExact(pParameters.pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                                objCVarPurchaseInvoice_OpeningBalanceTax.TaxTypeID = pParameters.pTaxTypeID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.TaxPercentage = pParameters.pTaxPercentage;
                                objCVarPurchaseInvoice_OpeningBalanceTax.TaxAmount = pParameters.pTaxAmount;
                                objCVarPurchaseInvoice_OpeningBalanceTax.DiscountTypeID = pParameters.pDiscountTypeID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.DiscountPercentage = pParameters.pDiscountPercentage;
                                objCVarPurchaseInvoice_OpeningBalanceTax.DiscountAmount = pParameters.pDiscountAmount;
                                objCVarPurchaseInvoice_OpeningBalanceTax.Amount = 0;// pAmount; //Calculated at the end of the function
                                objCVarPurchaseInvoice_OpeningBalanceTax.Notes = pParameters.pNotes;
                                objCVarPurchaseInvoice_OpeningBalanceTax.BranchID = pParameters.pBranchID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.IsApproved = pParameters.pIsApproved;
                                objCVarPurchaseInvoice_OpeningBalanceTax.IsDeleted = pParameters.pIsDeleted;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ApprovingUserID = pParameters.pApprovingUserID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.PaymentTermID = pParameters.pPaymentTermID;

                                objCVarPurchaseInvoice_OpeningBalanceTax.CreatorUserID = objCVarPurchaseInvoice_OpeningBalanceTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarPurchaseInvoice_OpeningBalanceTax.CreationDate = objCVarPurchaseInvoice_OpeningBalanceTax.ModificationDate = DateTime.Now;

                                objCPurchaseInvoice_OpeningBalanceTax.lstCVarPurchaseInvoice_OpeningBalance.Add(objCVarPurchaseInvoice_OpeningBalanceTax);
                                checkException = objCPurchaseInvoice_OpeningBalanceTax.SaveMethod(objCPurchaseInvoice_OpeningBalanceTax.lstCVarPurchaseInvoice_OpeningBalance);
                                InvoiceID = objCVarPurchaseInvoice_OpeningBalanceTax.ID;
                                //link
                                objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + _FlexiPurchaseItemID + "," + InvoiceID + "," + "PurchaseInvoice_OpeningBalanceTax");

                            }
                            else //update header
                            {
                                CTaxLink objCTaxLinOperationPartners = new CTaxLink();
                                objCTaxLinOperationPartners.GetList("where notes='OperationPartners' and originid=" + pParameters.pClientOperationPartnerID);

                                _UpdateClause = (pParameters.pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pParameters.pEditableCode.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + (CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + (objCTaxLinOperationPartners.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pParameters.pClientAddressID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pParameters.pClientPrintedAddress.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + (CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pParameters.pSupplierAddressID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pParameters.pSupplierPrintedAddress.ToString() + "'")) + " \n";
                                //Calculated at the end of the function
                                //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pParameters.pCurrencyID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pParameters.pExchangeRate.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pParameters.pInvoiceDate, 1) + "'"));
                                _UpdateClause += (pParameters.pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pParameters.pTaxTypeID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pParameters.pTaxPercentage.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pParameters.pTaxAmount.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pParameters.pDiscountTypeID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pParameters.pDiscountPercentage.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pParameters.pDiscountAmount.ToString() + "'")) + " \n";
                                //Calculated at the end of the function
                                //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pParameters.pNotes.ToString() + "'")) + " \n";
                                //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                                _UpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pParameters.pOperationID + ") " + " \n";
                                _UpdateClause += (pParameters.pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                                _UpdateClause += (pParameters.pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                                _UpdateClause += (pParameters.pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pParameters.pApprovingUserID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pParameters.pPaymentTermID.ToString() + "'")) + " \n";

                                _UpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                                _UpdateClause += (" ,ModificationDate = GETDATE() ");
                                _UpdateClause += " WHERE ID =" + (CCTaxLink2.lstCVarTaxLink.Count > 0 ? CCTaxLink2.lstCVarTaxLink[0].TaxID : 0);
                                checkException = objCPurchaseInvoice_OpeningBalanceTax.UpdateList(_UpdateClause);
                            }
                            #endregion PurchaseInvoiceHeader_OpeningBalance
                            #region PurchaseInvoiceItem_OpeningBalance for both insert and update
                            CVarPurchaseInvoiceItem_OpeningBalanceTax objCVarPurchaseInvoiceItem_OpeningBalanceTax = new CVarPurchaseInvoiceItem_OpeningBalanceTax();
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.ID = 0;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.PurchaseInvoiceID = InvoiceID;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.PurchaseItemID = _FlexiPurchaseItemIDTax;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.Amount = 0;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.Notes = "0";
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.UnitPrice = 0;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.Quantity = 1;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.PartNumber = "0";
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.CountryOfOriginID = 0;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.HSCode = "0";
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.ExportPrice = 0;
                            CPurchaseInvoiceItem_OpeningBalanceTax objCPurchaseInvoiceItem_OpeningBalanceTax = new CPurchaseInvoiceItem_OpeningBalanceTax();
                            objCPurchaseInvoiceItem_OpeningBalanceTax.lstCVarPurchaseInvoiceItem_OpeningBalance.Add(objCVarPurchaseInvoiceItem_OpeningBalanceTax);
                            checkException = objCPurchaseInvoiceItem_OpeningBalanceTax.SaveMethod(objCPurchaseInvoiceItem_OpeningBalanceTax.lstCVarPurchaseInvoiceItem_OpeningBalance);
                            //_ImportPurchaseInvoiceItemID = objCVarPurchaseInvoiceItem_OpeningBalanceTax.ID;
                            #endregion PurchaseInvoiceItem_OpeningBalance for both insert and update

                            #region Insert FlexiSerial
                            for (int i = 0; i < _NumberOfRows; i++)
                            {
                                CvwFlexiSerial objCvwFlexiSerial_CheckUniqueness = new CvwFlexiSerial();
                                checkException = objCvwFlexiSerial_CheckUniqueness.GetList("WHERE Code=N'" + pParameters.pCodeList.Split(',')[i] + "' AND ImportOperationID=" + pParameters.pOperationID);
                                if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                                {
                                    CVarFlexiSerialTax objCVarFlexiSerialTax = new CVarFlexiSerialTax();
                                    objCVarFlexiSerialTax.ID = 0;
                                    objCVarFlexiSerialTax.ImportPurchaseInvoiceItemID = 0;
                                    objCVarFlexiSerialTax.ExportPurchaseInvoiceItemID = 0;
                                    objCVarFlexiSerialTax.ImportPurchaseInvoice_OpeningBalanceItemID = objCVarPurchaseInvoiceItem_OpeningBalanceTax.ID;
                                    objCVarFlexiSerialTax.ExportPurchaseInvoice_OpeningBalanceItemID = 0;
                                    objCVarFlexiSerialTax.Code = pParameters.pCodeList.Split(',')[i];
                                    objCVarFlexiSerialTax.ContainerID = 0;
                                    objCVarFlexiSerialTax.Notes = "0";
                                    CFlexiSerialTax objCFlexiSerialTax = new CFlexiSerialTax();
                                    objCFlexiSerialTax.lstCVarFlexiSerial.Add(objCVarFlexiSerialTax);
                                    checkException = objCFlexiSerialTax.SaveMethod(objCFlexiSerialTax.lstCVarFlexiSerial);
                                    if (checkException != null)
                                        _MessageReturned += " & " + checkException.Message;
                                } //if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                            } //for (int i = 0; i < _ArrFlexi.Length; i++)
                            #endregion Insert FlexiSerial

                            #region Update PurchaseInvoiceItem Quanity
                            _UpdateClause = " Quantity = (SELECT COUNT(*) FROM ForwardingTransChemTax.[dbo].FlexiSerial WHERE ImportPurchaseInvoice_OpeningBalanceItemID = " + objCVarPurchaseInvoiceItem_OpeningBalanceTax.ID + ")";
                            //  checkException = objCPurchaseInvoiceItem_OpeningBalance.UpdateList(_UpdateClause);
                            checkException = objCPurchaseInvoiceItem_OpeningBalanceTax.UpdateList(_UpdateClause + " where PurchaseInvoiceID = " + InvoiceID + " ");

                            // objCPurchaseInvoiceItem_OpeningBalance.lstCVarPurchaseInvoiceItem_OpeningBalance[0].PurchaseInvoiceID = ;
                            if (checkException != null)
                                _MessageReturned += " & " + checkException.Message;
                            #endregion Update PurchaseInvoiceItem Quanity

                            #region Update Header total for case of update
                            _UpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM ForwardingTransChemTax.[dbo].PurchaseInvoiceItem_OpeningBalance WHERE PurchaseInvoiceID = " + InvoiceID + " AND IsDeleted=0)";
                            _UpdateClause += " WHERE ID = " + InvoiceID.ToString();
                            checkException = objCPurchaseInvoice_OpeningBalanceTax.UpdateList(_UpdateClause);

                            //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                            _UpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                            _UpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                            _UpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                            _UpdateClause += " WHERE ID = " + InvoiceID.ToString();
                            checkException = objCPurchaseInvoice_OpeningBalanceTax.UpdateList(_UpdateClause);
                            #endregion Update Header total for case of update

                            #region Get Returned Data
                            checkException = objCvwPurchaseInvoiceHeader_OpeningBalance.GetListPaging(999999, 1, "WHERE ID = " + InvoiceID.ToString(), pParameters.pOrderBy, out _TempRowCount);
                            checkException = objCvwPurchaseInvoice_OpeningBalance.GetListPaging(pParameters.pPageSize, pParameters.pPageNumber, pParameters.pWhereClausePurchaseInvoice, pParameters.pOrderBy, out _TempRowCount);
                            checkException = objCvwPurchaseInvoiceItem_OpeningBalance.GetList("WHERE PurchaseInvoiceID = " + InvoiceID.ToString() + " ORDER BY PurchaseItemName");
                            pParameters.pEditableCode = objCvwPurchaseInvoiceHeader_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance[0].EditableCode;
                            #endregion Get Returned Data
                        } //if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
                        #endregion Add PurchaseInvoice
                        return new object[]
                        {
                _MessageReturned
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceHeader_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance[0]) : null //_PurchaseInvoiceHeader: pData[1]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance) : null //_PurchaseInvoice: pData[2]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem_OpeningBalance.lstCVarvwPurchaseInvoiceItem_OpeningBalance) : null //Details: pData[3]
                        };

                    }
                    else
                    {

                        #region Add PurchaseInvoice

                        CTaxLink CTaxLinkOperationPartnersSupplier = new CTaxLink();
                        CTaxLinkOperationPartnersSupplier.GetList("where notes='OperationPartners' and OriginID=" + pParameters.pSupplierOperationPartnerID);
                        CPurchaseInvoiceTax objCPurchaseInvoice_IsPostedTax = new CPurchaseInvoiceTax();
                        CTaxLink CCTaxLink2 = new CTaxLink();
                        CCTaxLink2.GetList("WHERE originID =" + pParameters.pPurchaseInvoiceID);
                        objCPurchaseInvoice_IsPostedTax.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + (CCTaxLink2.lstCVarTaxLink.Count > 0 ? CCTaxLink2.lstCVarTaxLink[0].TaxID : 0), "ID", out _TempRowCount);
                        if (objCPurchaseInvoice_IsPostedTax.lstCVarPurchaseInvoiceTax.Count == 0 && _MessageReturned == "") //not posted so save
                        {
                            #region PurchaseInvoiceHeader
                            if (MainInvoiceID == 0) //this means insert header
                            {
                                CVarPurchaseInvoiceTax objCVarPurchaseInvoiceTax = new CVarPurchaseInvoiceTax();
                                objCVarPurchaseInvoiceTax.InvoiceNumber = pParameters.pInvoiceNumber;
                                objCVarPurchaseInvoiceTax.EditableCode = pParameters.pEditableCode;
                                objCVarPurchaseInvoiceTax.OperationID = CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0;
                                objCVarPurchaseInvoiceTax.ClientOperationPartnerID = pParameters.pClientOperationPartnerID;
                                objCVarPurchaseInvoiceTax.ClientAddressID = pParameters.pClientAddressID;
                                objCVarPurchaseInvoiceTax.ClientPrintedAddress = pParameters.pClientPrintedAddress;
                                objCVarPurchaseInvoiceTax.SupplierOperationPartnerID = CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0;
                                objCVarPurchaseInvoiceTax.SupplierAddressID = pParameters.pSupplierAddressID;
                                objCVarPurchaseInvoiceTax.SupplierPrintedAddress = pParameters.pSupplierPrintedAddress;
                                objCVarPurchaseInvoiceTax.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                                objCVarPurchaseInvoiceTax.CurrencyID = pParameters.pCurrencyID;
                                objCVarPurchaseInvoiceTax.ExchangeRate = pParameters.pExchangeRate;
                                objCVarPurchaseInvoiceTax.InvoiceDate = DateTime.ParseExact(pParameters.pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                                objCVarPurchaseInvoiceTax.TaxTypeID = pParameters.pTaxTypeID;
                                objCVarPurchaseInvoiceTax.TaxPercentage = pParameters.pTaxPercentage;
                                objCVarPurchaseInvoiceTax.TaxAmount = pParameters.pTaxAmount;
                                objCVarPurchaseInvoiceTax.DiscountTypeID = pParameters.pDiscountTypeID;
                                objCVarPurchaseInvoiceTax.DiscountPercentage = pParameters.pDiscountPercentage;
                                objCVarPurchaseInvoiceTax.DiscountAmount = pParameters.pDiscountAmount;
                                objCVarPurchaseInvoiceTax.Amount = 0;// pAmount; //Calculated at the end of the function
                                objCVarPurchaseInvoiceTax.Notes = pParameters.pNotes;
                                objCVarPurchaseInvoiceTax.BranchID = pParameters.pBranchID;
                                objCVarPurchaseInvoiceTax.IsApproved = pParameters.pIsApproved;
                                objCVarPurchaseInvoiceTax.IsDeleted = pParameters.pIsDeleted;
                                objCVarPurchaseInvoiceTax.ApprovingUserID = pParameters.pApprovingUserID;
                                objCVarPurchaseInvoiceTax.PaymentTermID = pParameters.pPaymentTermID;
                                objCVarPurchaseInvoiceTax.InvoiceTypeID = pParameters.pInvoiceTypeID;

                                objCVarPurchaseInvoiceTax.CreatorUserID = objCVarPurchaseInvoiceTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarPurchaseInvoiceTax.CreationDate = objCVarPurchaseInvoiceTax.ModificationDate = DateTime.Now;

                                objCPurchaseInvoiceTax.lstCVarPurchaseInvoiceTax.Add(objCVarPurchaseInvoiceTax);
                                checkException = objCPurchaseInvoice.SaveMethod(objCPurchaseInvoice.lstCVarPurchaseInvoice);
                                pParameters.pPurchaseInvoiceID = objCVarPurchaseInvoiceTax.ID;
                            }
                            else //update header
                            {
                                CTaxLink objCTaxLinOperationPartners = new CTaxLink();
                                objCTaxLinOperationPartners.GetList("where notes='OperationPartners' and originid=" + pParameters.pClientOperationPartnerID);

                                _UpdateClause = (pParameters.pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pParameters.pEditableCode.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + (CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + (objCTaxLinOperationPartners.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pParameters.pClientAddressID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pParameters.pClientPrintedAddress.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + (CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pParameters.pSupplierAddressID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pParameters.pSupplierPrintedAddress.ToString() + "'")) + " \n";
                                //Calculated at the end of the function
                                //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pParameters.pCurrencyID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pParameters.pExchangeRate.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pParameters.pInvoiceDate, 1) + "'"));
                                _UpdateClause += (pParameters.pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pParameters.pTaxTypeID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pParameters.pTaxPercentage.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pParameters.pTaxAmount.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pParameters.pDiscountTypeID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pParameters.pDiscountPercentage.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pParameters.pDiscountAmount.ToString() + "'")) + " \n";
                                //Calculated at the end of the function
                                //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pParameters.pNotes.ToString() + "'")) + " \n";
                                //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                                _UpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pParameters.pOperationID + ") " + " \n";
                                _UpdateClause += (pParameters.pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                                _UpdateClause += (pParameters.pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                                _UpdateClause += (pParameters.pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pParameters.pApprovingUserID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pParameters.pPaymentTermID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pInvoiceTypeID == 0 ? " ,InvoiceTypeID = NULL " : (" ,InvoiceTypeID = N'" + pParameters.pInvoiceTypeID.ToString() + "'")) + " \n";

                                _UpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                                _UpdateClause += (" ,ModificationDate = GETDATE() ");
                                _UpdateClause += " WHERE ID =" + pParameters.pPurchaseInvoiceID.ToString();
                                checkException = objCPurchaseInvoiceTax.UpdateList(_UpdateClause);
                            }
                            #endregion PurchaseInvoiceHeader
                            #region PurchaseInvoiceItem for both insert and update
                            CVarPurchaseInvoiceItemTax objCVarPurchaseInvoiceItemTax = new CVarPurchaseInvoiceItemTax();
                            objCVarPurchaseInvoiceItemTax.ID = 0;
                            objCVarPurchaseInvoiceItemTax.PurchaseInvoiceID = pParameters.pPurchaseInvoiceID;
                            objCVarPurchaseInvoiceItemTax.PurchaseItemID = _FlexiPurchaseItemID;
                            objCVarPurchaseInvoiceItemTax.Amount = 0;
                            objCVarPurchaseInvoiceItemTax.Notes = "0";
                            objCVarPurchaseInvoiceItemTax.UnitPrice = 0;
                            objCVarPurchaseInvoiceItemTax.Quantity = 1;
                            objCVarPurchaseInvoiceItemTax.PartNumber = "0";
                            objCVarPurchaseInvoiceItemTax.CountryOfOriginID = 0;
                            objCVarPurchaseInvoiceItemTax.HSCode = "0";
                            objCVarPurchaseInvoiceItemTax.ExportPrice = 0;
                            CPurchaseInvoiceItemTax objCPurchaseInvoiceItemTax = new CPurchaseInvoiceItemTax();
                            objCPurchaseInvoiceItemTax.lstCVarPurchaseInvoiceItem.Add(objCVarPurchaseInvoiceItemTax);
                            checkException = objCPurchaseInvoiceItemTax.SaveMethod(objCPurchaseInvoiceItemTax.lstCVarPurchaseInvoiceItem);
                            //_ImportPurchaseInvoiceItemID = objCVarPurchaseInvoiceItemTax.ID;
                            #endregion PurchaseInvoiceItem for both insert and update
                            objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + _ImportPurchaseInvoiceItemID + "," + objCVarPurchaseInvoiceItemTax.ID + "," + "PurchaseInvoiceItem");

                            #region Insert FlexiSerial
                            for (int i = 0; i < _NumberOfRows; i++)
                            {
                                CvwFlexiSerial objCvwFlexiSerial_CheckUniqueness = new CvwFlexiSerial();
                                checkException = objCvwFlexiSerial_CheckUniqueness.GetList("WHERE Code=N'" + pParameters.pCodeList.Split(',')[i] + "' AND ImportOperationID=" + pParameters.pOperationID);
                                if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                                {
                                    CVarFlexiSerialTax objCVarFlexiSerialTax = new CVarFlexiSerialTax();
                                    objCVarFlexiSerialTax.ID = 0;
                                    objCVarFlexiSerialTax.ImportPurchaseInvoiceItemID = objCVarPurchaseInvoiceItemTax.ID;
                                    objCVarFlexiSerialTax.ExportPurchaseInvoiceItemID = 0;
                                    objCVarFlexiSerialTax.ImportPurchaseInvoice_OpeningBalanceItemID = objCVarPurchaseInvoiceItemTax.ID;
                                    objCVarFlexiSerialTax.ExportPurchaseInvoice_OpeningBalanceItemID = 0;
                                    objCVarFlexiSerialTax.Code = pParameters.pCodeList.Split(',')[i];
                                    objCVarFlexiSerialTax.ContainerID = 0;
                                    objCVarFlexiSerialTax.Notes = "0";
                                    CFlexiSerialTax objCFlexiSerialTax = new CFlexiSerialTax();
                                    objCFlexiSerialTax.lstCVarFlexiSerial.Add(objCVarFlexiSerialTax);
                                    checkException = objCFlexiSerialTax.SaveMethod(objCFlexiSerialTax.lstCVarFlexiSerial);
                                    if (checkException != null)
                                        _MessageReturned += " & " + checkException.Message;
                                } //if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                            } //for (int i = 0; i < _ArrFlexi.Length; i++)
                            #endregion Insert FlexiSerial

                            #region Update PurchaseInvoiceItem Quanity
                            _UpdateClause = " Quantity = (SELECT COUNT(*) FROM FlexiSerial WHERE ImportPurchaseInvoiceItemID = " + objCVarPurchaseInvoiceItemTax.ID + ")";

                            checkException = objCPurchaseInvoiceItemTax.UpdateList(_UpdateClause + " where PurchaseInvoiceID = " + (CCTaxLink2.lstCVarTaxLink.Count > 0 ? CCTaxLink2.lstCVarTaxLink[0].TaxID : 0) + " ");

                            if (checkException != null)
                                _MessageReturned += " & " + checkException.Message;
                            #endregion Update PurchaseInvoiceItem Quanity

                            #region Update Header total for case of update
                            _UpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM ForwardingTransChemTax.[dbo].PurchaseInvoiceItem WHERE PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID.ToString() + " AND IsDeleted=0)";
                            _UpdateClause += " WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString();
                            checkException = objCPurchaseInvoiceTax.UpdateList(_UpdateClause);

                            //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                            _UpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                            _UpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                            _UpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                            _UpdateClause += " WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString();
                            checkException = objCPurchaseInvoiceTax.UpdateList(_UpdateClause);
                            #endregion Update Header total for case of update

                            #region Get Returned Data
                            checkException = objCvwPurchaseInvoiceHeader.GetListPaging(999999, 1, "WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString(), pParameters.pOrderBy, out _TempRowCount);
                            checkException = objCvwPurchaseInvoice.GetListPaging(pParameters.pPageSize, pParameters.pPageNumber, pParameters.pWhereClausePurchaseInvoice, pParameters.pOrderBy, out _TempRowCount);
                            checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID = " + (CCTaxLink2.lstCVarTaxLink.Count > 0 ? CCTaxLink2.lstCVarTaxLink[0].TaxID : 0) + " ORDER BY PurchaseItemName");
                            pParameters.pEditableCode = objCvwPurchaseInvoiceHeader.lstCVarvwPurchaseInvoice[0].EditableCode;
                            #endregion Get Returned Data
                        } //if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
                        #endregion Add PurchaseInvoice
                        return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceHeader.lstCVarvwPurchaseInvoice[0]) : null //_PurchaseInvoiceHeader: pData[1]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice) : null //_PurchaseInvoice: pData[2]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem.lstCVarvwPurchaseInvoiceItem) : null //Details: pData[3]
            };
                    }

                }
                #endregion

                return new object[]
                {
                _MessageReturned
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceHeader_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance[0]) : null //_PurchaseInvoiceHeader: pData[1]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance) : null //_PurchaseInvoice: pData[2]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem_OpeningBalance.lstCVarvwPurchaseInvoiceItem_OpeningBalance) : null //Details: pData[3]
            };

            }
            else
            {

                #region Add PurchaseInvoice
                int _TempRowCount = 0;
                CPurchaseInvoice objCPurchaseInvoice_IsPosted = new CPurchaseInvoice();
                objCPurchaseInvoice_IsPosted.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pParameters.pPurchaseInvoiceID, "ID", out _TempRowCount);
                if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0 && _MessageReturned == "") //not posted so save
                {
                    #region PurchaseInvoiceHeader
                    if (pParameters.pPurchaseInvoiceID == 0) //this means insert header
                    {
                        CVarPurchaseInvoice objCVarPurchaseInvoice = new CVarPurchaseInvoice();
                        objCVarPurchaseInvoice.InvoiceNumber = pParameters.pInvoiceNumber;
                        objCVarPurchaseInvoice.EditableCode = pParameters.pEditableCode;
                        objCVarPurchaseInvoice.OperationID = pParameters.pOperationID;
                        objCVarPurchaseInvoice.ClientOperationPartnerID = pParameters.pClientOperationPartnerID;
                        objCVarPurchaseInvoice.ClientAddressID = pParameters.pClientAddressID;
                        objCVarPurchaseInvoice.ClientPrintedAddress = pParameters.pClientPrintedAddress;
                        objCVarPurchaseInvoice.SupplierOperationPartnerID = pParameters.pSupplierOperationPartnerID;
                        objCVarPurchaseInvoice.SupplierAddressID = pParameters.pSupplierAddressID;
                        objCVarPurchaseInvoice.SupplierPrintedAddress = pParameters.pSupplierPrintedAddress;
                        objCVarPurchaseInvoice.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                        objCVarPurchaseInvoice.CurrencyID = pParameters.pCurrencyID;
                        objCVarPurchaseInvoice.ExchangeRate = pParameters.pExchangeRate;
                        objCVarPurchaseInvoice.InvoiceDate = DateTime.ParseExact(pParameters.pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                        objCVarPurchaseInvoice.TaxTypeID = pParameters.pTaxTypeID;
                        objCVarPurchaseInvoice.TaxPercentage = pParameters.pTaxPercentage;
                        objCVarPurchaseInvoice.TaxAmount = pParameters.pTaxAmount;
                        objCVarPurchaseInvoice.DiscountTypeID = pParameters.pDiscountTypeID;
                        objCVarPurchaseInvoice.DiscountPercentage = pParameters.pDiscountPercentage;
                        objCVarPurchaseInvoice.DiscountAmount = pParameters.pDiscountAmount;
                        objCVarPurchaseInvoice.Amount = 0;// pAmount; //Calculated at the end of the function
                        objCVarPurchaseInvoice.Notes = pParameters.pNotes;
                        objCVarPurchaseInvoice.BranchID = pParameters.pBranchID;
                        objCVarPurchaseInvoice.IsApproved = pParameters.pIsApproved;
                        objCVarPurchaseInvoice.IsDeleted = pParameters.pIsDeleted;
                        objCVarPurchaseInvoice.ApprovingUserID = pParameters.pApprovingUserID;
                        objCVarPurchaseInvoice.PaymentTermID = pParameters.pPaymentTermID;
                        objCVarPurchaseInvoice.InvoiceTypeID = pParameters.pInvoiceTypeID;

                        objCVarPurchaseInvoice.CreatorUserID = objCVarPurchaseInvoice.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPurchaseInvoice.CreationDate = objCVarPurchaseInvoice.ModificationDate = DateTime.Now;

                        objCPurchaseInvoice.lstCVarPurchaseInvoice.Add(objCVarPurchaseInvoice);
                        checkException = objCPurchaseInvoice.SaveMethod(objCPurchaseInvoice.lstCVarPurchaseInvoice);
                        pParameters.pPurchaseInvoiceID = objCVarPurchaseInvoice.ID;
                    }
                    else //update header
                    {
                        _UpdateClause = (pParameters.pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pParameters.pEditableCode.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + pParameters.pOperationID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + pParameters.pClientOperationPartnerID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pParameters.pClientAddressID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pParameters.pClientPrintedAddress.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + pParameters.pSupplierOperationPartnerID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pParameters.pSupplierAddressID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pParameters.pSupplierPrintedAddress.ToString() + "'")) + " \n";
                        //Calculated at the end of the function
                        //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pParameters.pCurrencyID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pParameters.pExchangeRate.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pParameters.pInvoiceDate, 1) + "'"));
                        _UpdateClause += (pParameters.pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pParameters.pTaxTypeID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pParameters.pTaxPercentage.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pParameters.pTaxAmount.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pParameters.pDiscountTypeID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pParameters.pDiscountPercentage.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pParameters.pDiscountAmount.ToString() + "'")) + " \n";
                        //Calculated at the end of the function
                        //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pParameters.pNotes.ToString() + "'")) + " \n";
                        //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                        _UpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pParameters.pOperationID + ") " + " \n";
                        _UpdateClause += (pParameters.pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                        _UpdateClause += (pParameters.pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                        _UpdateClause += (pParameters.pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pParameters.pApprovingUserID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pParameters.pPaymentTermID.ToString() + "'")) + " \n";
                        _UpdateClause += (pParameters.pInvoiceTypeID == 0 ? " ,InvoiceTypeID = NULL " : (" ,InvoiceTypeID = N'" + pParameters.pInvoiceTypeID.ToString() + "'")) + " \n";

                        _UpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                        _UpdateClause += (" ,ModificationDate = GETDATE() ");
                        _UpdateClause += " WHERE ID =" + pParameters.pPurchaseInvoiceID.ToString();
                        checkException = objCPurchaseInvoice.UpdateList(_UpdateClause);
                    }
                    #endregion PurchaseInvoiceHeader
                    #region PurchaseInvoiceItem for both insert and update
                    CVarPurchaseInvoiceItem objCVarPurchaseInvoiceItem = new CVarPurchaseInvoiceItem();
                    objCVarPurchaseInvoiceItem.ID = 0;
                    objCVarPurchaseInvoiceItem.PurchaseInvoiceID = pParameters.pPurchaseInvoiceID;
                    objCVarPurchaseInvoiceItem.PurchaseItemID = _FlexiPurchaseItemID;
                    objCVarPurchaseInvoiceItem.Amount = 0;
                    objCVarPurchaseInvoiceItem.Notes = "0";
                    objCVarPurchaseInvoiceItem.UnitPrice = 0;
                    objCVarPurchaseInvoiceItem.Quantity = 1;
                    objCVarPurchaseInvoiceItem.PartNumber = "0";
                    objCVarPurchaseInvoiceItem.CountryOfOriginID = 0;
                    objCVarPurchaseInvoiceItem.HSCode = "0";
                    objCVarPurchaseInvoiceItem.ExportPrice = 0;
                    CPurchaseInvoiceItem objCPurchaseInvoiceItem = new CPurchaseInvoiceItem();
                    objCPurchaseInvoiceItem.lstCVarPurchaseInvoiceItem.Add(objCVarPurchaseInvoiceItem);
                    checkException = objCPurchaseInvoiceItem.SaveMethod(objCPurchaseInvoiceItem.lstCVarPurchaseInvoiceItem);
                    _ImportPurchaseInvoiceItemID = objCVarPurchaseInvoiceItem.ID;
                    #endregion PurchaseInvoiceItem for both insert and update

                    #region Insert FlexiSerial
                    for (int i = 0; i < _NumberOfRows; i++)
                    {
                        CvwFlexiSerial objCvwFlexiSerial_CheckUniqueness = new CvwFlexiSerial();
                        checkException = objCvwFlexiSerial_CheckUniqueness.GetList("WHERE Code=N'" + pParameters.pCodeList.Split(',')[i] + "' AND ImportOperationID=" + pParameters.pOperationID);
                        if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                        {
                            CVarFlexiSerial objCVarFlexiSerial = new CVarFlexiSerial();
                            objCVarFlexiSerial.ID = 0;
                            objCVarFlexiSerial.ImportPurchaseInvoiceItemID = _ImportPurchaseInvoiceItemID;
                            objCVarFlexiSerial.ExportPurchaseInvoiceItemID = 0;
                            objCVarFlexiSerial.ImportPurchaseInvoice_OpeningBalanceItemID = _ImportPurchaseInvoiceItemID;
                            objCVarFlexiSerial.ExportPurchaseInvoice_OpeningBalanceItemID = 0;
                            objCVarFlexiSerial.Code = pParameters.pCodeList.Split(',')[i];
                            objCVarFlexiSerial.ContainerID = 0;
                            objCVarFlexiSerial.Notes = "0";
                            CFlexiSerial objCFlexiSerial = new CFlexiSerial();
                            objCFlexiSerial.lstCVarFlexiSerial.Add(objCVarFlexiSerial);
                            checkException = objCFlexiSerial.SaveMethod(objCFlexiSerial.lstCVarFlexiSerial);
                            if (checkException != null)
                                _MessageReturned += " & " + checkException.Message;
                        } //if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                    } //for (int i = 0; i < _ArrFlexi.Length; i++)
                    #endregion Insert FlexiSerial

                    #region Update PurchaseInvoiceItem Quanity
                    _UpdateClause = " Quantity = (SELECT COUNT(*) FROM FlexiSerial WHERE ImportPurchaseInvoiceItemID = " + _ImportPurchaseInvoiceItemID + ")";

                    checkException = objCPurchaseInvoiceItem.UpdateList(_UpdateClause + " where PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID + " ");

                    if (checkException != null)
                        _MessageReturned += " & " + checkException.Message;
                    #endregion Update PurchaseInvoiceItem Quanity

                    #region Update Header total for case of update
                    _UpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM PurchaseInvoiceItem WHERE PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID.ToString() + " AND IsDeleted=0)";
                    _UpdateClause += " WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString();
                    checkException = objCPurchaseInvoice.UpdateList(_UpdateClause);

                    //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                    _UpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                    _UpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                    _UpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                    _UpdateClause += " WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString();
                    checkException = objCPurchaseInvoice.UpdateList(_UpdateClause);
                    #endregion Update Header total for case of update

                    #region Get Returned Data
                    checkException = objCvwPurchaseInvoiceHeader.GetListPaging(999999, 1, "WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString(), pParameters.pOrderBy, out _TempRowCount);
                    checkException = objCvwPurchaseInvoice.GetListPaging(pParameters.pPageSize, pParameters.pPageNumber, pParameters.pWhereClausePurchaseInvoice, pParameters.pOrderBy, out _TempRowCount);
                    checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");
                    pParameters.pEditableCode = objCvwPurchaseInvoiceHeader.lstCVarvwPurchaseInvoice[0].EditableCode;
                    #endregion Get Returned Data
                } //if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
                #endregion Add PurchaseInvoice
                #region Tax

                string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                if ((CompanyName == "CHM") && checkException == null)
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

                    Int64 _FlexiPurchaseItemIDTax = 0;
                    CPurchaseInvoiceTax objCPurchaseInvoiceTax = new CPurchaseInvoiceTax();


                    CPurchaseInvoice_OpeningBalanceTax objCPurchaseInvoice_OpeningBalanceTax = new CPurchaseInvoice_OpeningBalanceTax();
                    CTaxLink objCTaxLinOperationPartners = new CTaxLink();





                    objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
                    checkException = objCvwNoAccessUnit.GetList("WHERE 1=1");
                    //int _LengthUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].LengthUnitID).First().ID;
                    //int _WeightUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].WeightUnitID).First().ID;
                    //int _VolumeUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].VolumeUnitID).First().ID;
                    //int _NumberOfRows = pParameters.pCodeList.Split(',').Length;
                    #region Add FLEXI to PurchaseItems if not exists and get FlexiPurchaseItemID
                    CPurchaseItemTax objCPurchaseItem_FlexiTax = new CPurchaseItemTax();//get flexi PurchaseItemID
                    CTaxLink CTaxLink = new CTaxLink();
                    CTaxLink.GetList("where notes='Operations' and OriginID=" + pParameters.pOperationID);
                    checkException = objCPurchaseItem_FlexiTax.GetList("WHERE Code=N'" + pParameters.pInvoiceTypeName + "'");
                    if (objCPurchaseItem_FlexiTax.lstCVarPurchaseItem.Count > 0) //Flexi PurchaseItem exists
                        _FlexiPurchaseItemIDTax = objCPurchaseItem_FlexiTax.lstCVarPurchaseItem[0].ID;
                    else //Add Flexi to purchase items
                    {

                        CVarPurchaseItemTax objCVarPurchaseItemTax = new CVarPurchaseItemTax();
                        objCVarPurchaseItemTax.Code = pParameters.pInvoiceTypeName;
                        objCVarPurchaseItemTax.Name = pParameters.pInvoiceTypeName;
                        objCVarPurchaseItemTax.LocalName = pParameters.pInvoiceTypeName;
                        objCVarPurchaseItemTax.Price = 0;  //Decimal.Parse(insertPIFromExcel.pPriceList.Split(',')[i]);
                        objCVarPurchaseItemTax.StockUnitQuantity = 0;
                        objCVarPurchaseItemTax.CurrencyID = objCvwDefaults.lstCVarvwDefaults[0].CurrencyID;
                        objCVarPurchaseItemTax.PartNumber = "0";  //insertPIFromExcel.pPartNumberList.Split(',')[i];
                        objCVarPurchaseItemTax.HSCode = "0";  //insertPIFromExcel.pHSCodeList.Split(',')[i];

                        objCVarPurchaseItemTax.ModelNumber = "0";
                        objCVarPurchaseItemTax.BrandName = "0";
                        objCVarPurchaseItemTax.ProductType = "0";

                        objCVarPurchaseItemTax.Notes = "0";
                        objCVarPurchaseItemTax.CreatorUserID = objCVarPurchaseItemTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPurchaseItemTax.CreationDate = objCVarPurchaseItemTax.ModificationDate = DateTime.Now;

                        objCVarPurchaseItemTax.WeightUnitID = _WeightUnitID;
                        objCVarPurchaseItemTax.LengthUnitID = _LengthUnitID;
                        objCVarPurchaseItemTax.VolumeUnitID = _VolumeUnitID;
                        objCVarPurchaseItemTax.IsFragile = false;
                        objCVarPurchaseItemTax.IsIMO = false;
                        objCVarPurchaseItemTax.IsAddedFromExcel = true;
                        objCVarPurchaseItemTax.IsFlexi = true;

                        objCVarPurchaseItemTax.PreferredAreaID = 0;
                        objCVarPurchaseItemTax.ByExpireDate = false;
                        objCVarPurchaseItemTax.BySerialNo = false;
                        objCVarPurchaseItemTax.ByLotNo = false;
                        objCVarPurchaseItemTax.ByVehicle = false;

                        #region Vehicle
                        objCVarPurchaseItemTax.OperationID = 0;
                        objCVarPurchaseItemTax.IsVehicle = false;
                        objCVarPurchaseItemTax.EquipmentModelID = 0;
                        objCVarPurchaseItemTax.MotorNumber = "0";
                        objCVarPurchaseItemTax.ChassisNumber = "0";
                        objCVarPurchaseItemTax.LotNumber = "0";
                        objCVarPurchaseItemTax.SerialNumber = "0";
                        #endregion Vehicle

                        CPurchaseItemTax objCPurchaseItemTax = new CPurchaseItemTax();
                        objCPurchaseItemTax.lstCVarPurchaseItem.Add(objCVarPurchaseItemTax);
                        checkException = objCPurchaseItemTax.SaveMethod(objCPurchaseItemTax.lstCVarPurchaseItem);
                        if (checkException == null)
                        {
                            _FlexiPurchaseItemIDTax = objCVarPurchaseItemTax.ID;

                            //link
                            objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + _FlexiPurchaseItemID + "," + _FlexiPurchaseItemIDTax + "," + "PurchaseItem");

                        }
                        else
                            _MessageReturned = checkException.Message;
                    }
                    #endregion Add FLEXI to PurchaseItems if not exists and get FlexiPurchaseItemID
                    if (IsOpeningBalanceFlexi == true)
                    {
                        #region AddPurchaseInvoice

                        CPurchaseInvoice_OpeningBalanceTax objCPurchaseInvoice_OpeningBalance_IsPostedTax = new CPurchaseInvoice_OpeningBalanceTax();
                        objCPurchaseInvoice_OpeningBalance_IsPostedTax.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pParameters.pPurchaseInvoiceID, "ID", out _TempRowCount);
                        if (objCPurchaseInvoice_OpeningBalance_IsPostedTax.lstCVarPurchaseInvoice_OpeningBalance.Count == 0 && _MessageReturned == "") //not posted so save
                        {

                            CTaxLink CTaxLinkOperationPartnersSupplier = new CTaxLink();
                            CTaxLinkOperationPartnersSupplier.GetList("where notes='OperationPartners' and OriginID=" + pParameters.pSupplierOperationPartnerID);
                            #region PurchaseInvoiceHeader_OpeningBalance
                            if (pParameters.pPurchaseInvoiceID == 0) //this means insert header
                            {
                                CVarPurchaseInvoice_OpeningBalanceTax objCVarPurchaseInvoice_OpeningBalanceTax = new CVarPurchaseInvoice_OpeningBalanceTax();
                                objCVarPurchaseInvoice_OpeningBalanceTax.InvoiceNumber = pParameters.pInvoiceNumber;
                                objCVarPurchaseInvoice_OpeningBalanceTax.EditableCode = pParameters.pEditableCode;
                                objCVarPurchaseInvoice_OpeningBalanceTax.OperationID = CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ClientOperationPartnerID = pParameters.pClientOperationPartnerID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ClientAddressID = pParameters.pClientAddressID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ClientPrintedAddress = pParameters.pClientPrintedAddress;
                                objCVarPurchaseInvoice_OpeningBalanceTax.SupplierOperationPartnerID = CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0;
                                objCVarPurchaseInvoice_OpeningBalanceTax.SupplierAddressID = pParameters.pSupplierAddressID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.SupplierPrintedAddress = pParameters.pSupplierPrintedAddress;
                                objCVarPurchaseInvoice_OpeningBalanceTax.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                                objCVarPurchaseInvoice_OpeningBalanceTax.CurrencyID = pParameters.pCurrencyID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ExchangeRate = pParameters.pExchangeRate;
                                objCVarPurchaseInvoice_OpeningBalanceTax.InvoiceDate = DateTime.ParseExact(pParameters.pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                                objCVarPurchaseInvoice_OpeningBalanceTax.TaxTypeID = pParameters.pTaxTypeID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.TaxPercentage = pParameters.pTaxPercentage;
                                objCVarPurchaseInvoice_OpeningBalanceTax.TaxAmount = pParameters.pTaxAmount;
                                objCVarPurchaseInvoice_OpeningBalanceTax.DiscountTypeID = pParameters.pDiscountTypeID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.DiscountPercentage = pParameters.pDiscountPercentage;
                                objCVarPurchaseInvoice_OpeningBalanceTax.DiscountAmount = pParameters.pDiscountAmount;
                                objCVarPurchaseInvoice_OpeningBalanceTax.Amount = 0;// pAmount; //Calculated at the end of the function
                                objCVarPurchaseInvoice_OpeningBalanceTax.Notes = pParameters.pNotes;
                                objCVarPurchaseInvoice_OpeningBalanceTax.BranchID = pParameters.pBranchID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.IsApproved = pParameters.pIsApproved;
                                objCVarPurchaseInvoice_OpeningBalanceTax.IsDeleted = pParameters.pIsDeleted;
                                objCVarPurchaseInvoice_OpeningBalanceTax.ApprovingUserID = pParameters.pApprovingUserID;
                                objCVarPurchaseInvoice_OpeningBalanceTax.PaymentTermID = pParameters.pPaymentTermID;

                                objCVarPurchaseInvoice_OpeningBalanceTax.CreatorUserID = objCVarPurchaseInvoice_OpeningBalanceTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarPurchaseInvoice_OpeningBalanceTax.CreationDate = objCVarPurchaseInvoice_OpeningBalanceTax.ModificationDate = DateTime.Now;

                                objCPurchaseInvoice_OpeningBalanceTax.lstCVarPurchaseInvoice_OpeningBalance.Add(objCVarPurchaseInvoice_OpeningBalanceTax);
                                checkException = objCPurchaseInvoice_OpeningBalanceTax.SaveMethod(objCPurchaseInvoice_OpeningBalanceTax.lstCVarPurchaseInvoice_OpeningBalance);
                                pParameters.pPurchaseInvoiceID = objCVarPurchaseInvoice_OpeningBalanceTax.ID;
                            }
                            else //update header
                            {
                                CTaxLink objCTaxLinOperationPartners2 = new CTaxLink();
                                objCTaxLinOperationPartners2.GetList("where notes='OperationPartners' and originid=" + pParameters.pClientOperationPartnerID);

                                _UpdateClause = (pParameters.pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pParameters.pEditableCode.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + (CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + (objCTaxLinOperationPartners2.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners2.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pParameters.pClientAddressID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pParameters.pClientPrintedAddress.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + (CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pParameters.pSupplierAddressID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pParameters.pSupplierPrintedAddress.ToString() + "'")) + " \n";
                                //Calculated at the end of the function
                                //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pParameters.pCurrencyID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pParameters.pExchangeRate.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pParameters.pInvoiceDate, 1) + "'"));
                                _UpdateClause += (pParameters.pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pParameters.pTaxTypeID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pParameters.pTaxPercentage.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pParameters.pTaxAmount.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pParameters.pDiscountTypeID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pParameters.pDiscountPercentage.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pParameters.pDiscountAmount.ToString() + "'")) + " \n";
                                //Calculated at the end of the function
                                //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pParameters.pNotes.ToString() + "'")) + " \n";
                                //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                                _UpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pParameters.pOperationID + ") " + " \n";
                                _UpdateClause += (pParameters.pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                                _UpdateClause += (pParameters.pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                                _UpdateClause += (pParameters.pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pParameters.pApprovingUserID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pParameters.pPaymentTermID.ToString() + "'")) + " \n";

                                _UpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                                _UpdateClause += (" ,ModificationDate = GETDATE() ");
                                _UpdateClause += " WHERE ID =" + pParameters.pPurchaseInvoiceID.ToString();
                                checkException = objCPurchaseInvoice_OpeningBalanceTax.UpdateList(_UpdateClause);
                            }
                            #endregion PurchaseInvoiceHeader_OpeningBalance
                            #region PurchaseInvoiceItem_OpeningBalance for both insert and update
                            CVarPurchaseInvoiceItem_OpeningBalanceTax objCVarPurchaseInvoiceItem_OpeningBalanceTax = new CVarPurchaseInvoiceItem_OpeningBalanceTax();
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.ID = 0;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.PurchaseInvoiceID = pParameters.pPurchaseInvoiceID;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.PurchaseItemID = _FlexiPurchaseItemIDTax;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.Amount = 0;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.Notes = "0";
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.UnitPrice = 0;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.Quantity = 1;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.PartNumber = "0";
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.CountryOfOriginID = 0;
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.HSCode = "0";
                            objCVarPurchaseInvoiceItem_OpeningBalanceTax.ExportPrice = 0;
                            CPurchaseInvoiceItem_OpeningBalanceTax objCPurchaseInvoiceItem_OpeningBalanceTax = new CPurchaseInvoiceItem_OpeningBalanceTax();
                            objCPurchaseInvoiceItem_OpeningBalanceTax.lstCVarPurchaseInvoiceItem_OpeningBalance.Add(objCVarPurchaseInvoiceItem_OpeningBalanceTax);
                            checkException = objCPurchaseInvoiceItem_OpeningBalanceTax.SaveMethod(objCPurchaseInvoiceItem_OpeningBalanceTax.lstCVarPurchaseInvoiceItem_OpeningBalance);
                            _ImportPurchaseInvoiceItemID = objCVarPurchaseInvoiceItem_OpeningBalanceTax.ID;
                            #endregion PurchaseInvoiceItem_OpeningBalance for both insert and update

                            #region Insert FlexiSerial
                            for (int i = 0; i < _NumberOfRows; i++)
                            {
                                CvwFlexiSerial objCvwFlexiSerial_CheckUniqueness = new CvwFlexiSerial();
                                checkException = objCvwFlexiSerial_CheckUniqueness.GetList("WHERE Code=N'" + pParameters.pCodeList.Split(',')[i] + "' AND ImportOperationID=" + pParameters.pOperationID);
                                if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                                {
                                    CVarFlexiSerialTax objCVarFlexiSerialTax = new CVarFlexiSerialTax();
                                    objCVarFlexiSerialTax.ID = 0;
                                    objCVarFlexiSerialTax.ImportPurchaseInvoiceItemID = 0;
                                    objCVarFlexiSerialTax.ExportPurchaseInvoiceItemID = 0;
                                    objCVarFlexiSerialTax.ImportPurchaseInvoice_OpeningBalanceItemID = _ImportPurchaseInvoiceItemID;
                                    objCVarFlexiSerialTax.ExportPurchaseInvoice_OpeningBalanceItemID = 0;
                                    objCVarFlexiSerialTax.Code = pParameters.pCodeList.Split(',')[i];
                                    objCVarFlexiSerialTax.ContainerID = 0;
                                    objCVarFlexiSerialTax.Notes = "0";
                                    CFlexiSerialTax objCFlexiSerialTax = new CFlexiSerialTax();
                                    objCFlexiSerialTax.lstCVarFlexiSerial.Add(objCVarFlexiSerialTax);
                                    checkException = objCFlexiSerialTax.SaveMethod(objCFlexiSerialTax.lstCVarFlexiSerial);
                                    if (checkException != null)
                                        _MessageReturned += " & " + checkException.Message;

                                } //if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                            } //for (int i = 0; i < _ArrFlexi.Length; i++)
                            #endregion Insert FlexiSerial

                            #region Update PurchaseInvoiceItem Quanity
                            _UpdateClause = " Quantity = (SELECT COUNT(*) FROM FlexiSerial WHERE ImportPurchaseInvoice_OpeningBalanceItemID = " + _ImportPurchaseInvoiceItemID + ")";
                            //  checkException = objCPurchaseInvoiceItem_OpeningBalance.UpdateList(_UpdateClause);
                            checkException = objCPurchaseInvoiceItem_OpeningBalanceTax.UpdateList(_UpdateClause + " where PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID + " ");

                            // objCPurchaseInvoiceItem_OpeningBalance.lstCVarPurchaseInvoiceItem_OpeningBalance[0].PurchaseInvoiceID = ;
                            if (checkException != null)
                                _MessageReturned += " & " + checkException.Message;
                            #endregion Update PurchaseInvoiceItem Quanity

                            #region Update Header total for case of update
                            _UpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM ForwardingTransChemTax.[dbo].PurchaseInvoiceItem_OpeningBalance WHERE PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID.ToString() + " AND IsDeleted=0)";
                            _UpdateClause += " WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString();
                            checkException = objCPurchaseInvoice_OpeningBalanceTax.UpdateList(_UpdateClause);

                            //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                            _UpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                            _UpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                            _UpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                            _UpdateClause += " WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString();
                            checkException = objCPurchaseInvoice_OpeningBalanceTax.UpdateList(_UpdateClause);
                            #endregion Update Header total for case of update

                            #region Get Returned Data
                            checkException = objCvwPurchaseInvoiceHeader_OpeningBalance.GetListPaging(999999, 1, "WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString(), pParameters.pOrderBy, out _TempRowCount);
                            checkException = objCvwPurchaseInvoice_OpeningBalance.GetListPaging(pParameters.pPageSize, pParameters.pPageNumber, pParameters.pWhereClausePurchaseInvoice, pParameters.pOrderBy, out _TempRowCount);
                            checkException = objCvwPurchaseInvoiceItem_OpeningBalance.GetList("WHERE PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID.ToString() + " ORDER BY PurchaseItemName");
                            pParameters.pEditableCode = objCvwPurchaseInvoiceHeader_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance[0].EditableCode;
                            #endregion Get Returned Data
                        } //if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
                        #endregion Add PurchaseInvoice

                    }
                    else
                    {

                        #region Add PurchaseInvoice
                        Int64 InvoiceID = 0;
                        CTaxLink CTaxLinkOperationPartnersSupplier = new CTaxLink();
                        CTaxLinkOperationPartnersSupplier.GetList("where notes='OperationPartners' and OriginID=" + pParameters.pSupplierOperationPartnerID);


                        CPurchaseInvoiceTax objCPurchaseInvoice_IsPostedTax = new CPurchaseInvoiceTax();
                        objCPurchaseInvoice_IsPostedTax.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pParameters.pPurchaseInvoiceID, "ID", out _TempRowCount);
                        if (objCPurchaseInvoice_IsPostedTax.lstCVarPurchaseInvoiceTax.Count == 0 && _MessageReturned == "") //not posted so save
                        {
                            #region PurchaseInvoiceHeader
                            if (MainInvoiceID == 0) //this means insert header
                            {


                                CVarPurchaseInvoiceTax objCVarPurchaseInvoiceTax = new CVarPurchaseInvoiceTax();
                                objCVarPurchaseInvoiceTax.ID = 0;

                                objCVarPurchaseInvoiceTax.InvoiceNumber = pParameters.pInvoiceNumber;
                                objCVarPurchaseInvoiceTax.EditableCode = pParameters.pEditableCode;
                                objCVarPurchaseInvoiceTax.OperationID = CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0;
                                objCVarPurchaseInvoiceTax.ClientOperationPartnerID = objCTaxLinOperationPartners.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners.lstCVarTaxLink[0].TaxID : 0;//pParameters.pClientOperationPartnerID;
                                objCVarPurchaseInvoiceTax.ClientAddressID = pParameters.pClientAddressID;
                                objCVarPurchaseInvoiceTax.ClientPrintedAddress = pParameters.pClientPrintedAddress;
                                objCVarPurchaseInvoiceTax.SupplierOperationPartnerID = CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0;
                                objCVarPurchaseInvoiceTax.SupplierAddressID = pParameters.pSupplierAddressID;
                                objCVarPurchaseInvoiceTax.SupplierPrintedAddress = pParameters.pSupplierPrintedAddress;
                                objCVarPurchaseInvoiceTax.AmountWithoutVAT = 0;// pAmountWithoutVAT; //Calculated at the end of the function
                                objCVarPurchaseInvoiceTax.CurrencyID = pParameters.pCurrencyID;
                                objCVarPurchaseInvoiceTax.ExchangeRate = pParameters.pExchangeRate;
                                objCVarPurchaseInvoiceTax.InvoiceDate = DateTime.ParseExact(pParameters.pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                                objCVarPurchaseInvoiceTax.TaxTypeID = pParameters.pTaxTypeID;
                                objCVarPurchaseInvoiceTax.TaxPercentage = pParameters.pTaxPercentage;
                                objCVarPurchaseInvoiceTax.TaxAmount = pParameters.pTaxAmount;
                                objCVarPurchaseInvoiceTax.DiscountTypeID = pParameters.pDiscountTypeID;
                                objCVarPurchaseInvoiceTax.DiscountPercentage = pParameters.pDiscountPercentage;
                                objCVarPurchaseInvoiceTax.DiscountAmount = pParameters.pDiscountAmount;
                                objCVarPurchaseInvoiceTax.Amount = 0;// pAmount; //Calculated at the end of the function
                                objCVarPurchaseInvoiceTax.Notes = pParameters.pNotes;
                                objCVarPurchaseInvoiceTax.BranchID = pParameters.pBranchID;
                                objCVarPurchaseInvoiceTax.IsApproved = pParameters.pIsApproved;
                                objCVarPurchaseInvoiceTax.IsDeleted = pParameters.pIsDeleted;
                                objCVarPurchaseInvoiceTax.ApprovingUserID = pParameters.pApprovingUserID;
                                objCVarPurchaseInvoiceTax.PaymentTermID = pParameters.pPaymentTermID;
                                objCVarPurchaseInvoiceTax.InvoiceTypeID = pParameters.pInvoiceTypeID;

                                objCVarPurchaseInvoiceTax.CreatorUserID = objCVarPurchaseInvoiceTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarPurchaseInvoiceTax.CreationDate = objCVarPurchaseInvoiceTax.ModificationDate = DateTime.Now;

                                objCPurchaseInvoiceTax.lstCVarPurchaseInvoiceTax.Add(objCVarPurchaseInvoiceTax);
                                checkException = objCPurchaseInvoiceTax.SaveMethod(objCPurchaseInvoiceTax.lstCVarPurchaseInvoiceTax);
                                // pParameters.pPurchaseInvoiceID = objCVarPurchaseInvoiceTax.ID;
                                InvoiceID = objCVarPurchaseInvoiceTax.ID;
                                //link
                                objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + pParameters.pPurchaseInvoiceID + "," + objCVarPurchaseInvoiceTax.ID + "," + "PurchaseInvoice");


                            }
                            else //update header
                            {
                                _UpdateClause = (pParameters.pEditableCode == "0" ? " EditableCode = NULL " : (" EditableCode = N'" + pParameters.pEditableCode.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pOperationID == 0 ? " ,OperationID = NULL " : (" ,OperationID = N'" + (CTaxLink.lstCVarTaxLink.Count > 0 ? CTaxLink.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientOperationPartnerID == 0 ? " ,ClientOperationPartnerID = NULL " : (" ,ClientOperationPartnerID = N'" + pParameters.pClientOperationPartnerID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientAddressID == 0 ? " ,ClientAddressID = NULL " : (" ,ClientAddressID = N'" + pParameters.pClientAddressID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pClientPrintedAddress == "0" ? " ,ClientPrintedAddress = NULL " : (" ,ClientPrintedAddress = N'" + pParameters.pClientPrintedAddress.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierOperationPartnerID == 0 ? " ,SupplierOperationPartnerID = NULL " : (" ,SupplierOperationPartnerID = N'" + (CTaxLinkOperationPartnersSupplier.lstCVarTaxLink.Count > 0 ? CTaxLinkOperationPartnersSupplier.lstCVarTaxLink[0].TaxID : 0) + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierAddressID == 0 ? " ,SupplierAddressID = NULL " : (" ,SupplierAddressID = N'" + pParameters.pSupplierAddressID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pSupplierPrintedAddress == "0" ? " ,SupplierPrintedAddress = NULL " : (" ,SupplierPrintedAddress = N'" + pParameters.pSupplierPrintedAddress.ToString() + "'")) + " \n";
                                //Calculated at the end of the function
                                //pUpdateClause += (pAmountWithoutVAT == 0 ? " ,AmountWithoutVAT = NULL " : (" ,AmountWithoutVAT = N'" + pAmountWithoutVAT.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pParameters.pCurrencyID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pParameters.pExchangeRate.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pParameters.pInvoiceDate, 1) + "'"));
                                _UpdateClause += (pParameters.pTaxTypeID == 0 ? " ,TaxTypeID = NULL " : (" ,TaxTypeID = N'" + pParameters.pTaxTypeID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pTaxPercentage == 0 ? " ,TaxPercentage = NULL " : (" ,TaxPercentage = N'" + pParameters.pTaxPercentage.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pTaxAmount == 0 ? " ,TaxAmount = NULL " : (" ,TaxAmount = N'" + pParameters.pTaxAmount.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountTypeID == 0 ? " ,DiscountTypeID = NULL " : (" ,DiscountTypeID = N'" + pParameters.pDiscountTypeID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountPercentage == 0 ? " ,DiscountPercentage = NULL " : (" ,DiscountPercentage = N'" + pParameters.pDiscountPercentage.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pDiscountAmount == 0 ? " ,DiscountAmount = NULL " : (" ,DiscountAmount = N'" + pParameters.pDiscountAmount.ToString() + "'")) + " \n";
                                //Calculated at the end of the function
                                //pUpdateClause += (pAmount == 0 ? " ,Amount = NULL " : (" ,Amount = N'" + pAmount.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pParameters.pNotes.ToString() + "'")) + " \n";
                                //pUpdateClause += (pBranchID == 0 ? " ,BranchID = NULL " : (" ,BranchID = N'" + pBranchID.ToString() + "'")) + " \n";
                                _UpdateClause += " ,BranchID = (SELECT BranchID FROM Operations WHERE ID=" + pParameters.pOperationID + ") " + " \n";
                                _UpdateClause += (pParameters.pIsApproved ? " ,IsApproved=1 " : (" ,IsApproved=0 ")) + " \n";
                                _UpdateClause += (pParameters.pIsDeleted ? " ,IsDeleted=1 " : (" ,IsDeleted=0 ")) + " \n";
                                _UpdateClause += (pParameters.pApprovingUserID == 0 ? " ,ApprovingUserID = NULL " : (" ,ApprovingUserID = N'" + pParameters.pApprovingUserID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pPaymentTermID == 0 ? " ,PaymentTermID = NULL " : (" ,PaymentTermID = N'" + pParameters.pPaymentTermID.ToString() + "'")) + " \n";
                                _UpdateClause += (pParameters.pInvoiceTypeID == 0 ? " ,InvoiceTypeID = NULL " : (" ,InvoiceTypeID = N'" + pParameters.pInvoiceTypeID.ToString() + "'")) + " \n";

                                _UpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                                _UpdateClause += (" ,ModificationDate = GETDATE() ");
                                _UpdateClause += " WHERE ID =" + pParameters.pPurchaseInvoiceID.ToString();
                                checkException = objCPurchaseInvoiceTax.UpdateList(_UpdateClause);
                            }
                            #endregion PurchaseInvoiceHeader
                            #region PurchaseInvoiceItem for both insert and update
                            CVarPurchaseInvoiceItemTax objCVarPurchaseInvoiceItemTax = new CVarPurchaseInvoiceItemTax();
                            objCVarPurchaseInvoiceItemTax.ID = 0;
                            objCVarPurchaseInvoiceItemTax.PurchaseInvoiceID = InvoiceID;
                            objCVarPurchaseInvoiceItemTax.PurchaseItemID = _FlexiPurchaseItemIDTax;
                            objCVarPurchaseInvoiceItemTax.Amount = 0;
                            objCVarPurchaseInvoiceItemTax.Notes = "0";
                            objCVarPurchaseInvoiceItemTax.UnitPrice = 0;
                            objCVarPurchaseInvoiceItemTax.Quantity = 1;
                            objCVarPurchaseInvoiceItemTax.PartNumber = "0";
                            objCVarPurchaseInvoiceItemTax.CountryOfOriginID = 0;
                            objCVarPurchaseInvoiceItemTax.HSCode = "0";
                            objCVarPurchaseInvoiceItemTax.ExportPrice = 0;
                            CPurchaseInvoiceItemTax objCPurchaseInvoiceItemTax = new CPurchaseInvoiceItemTax();
                            objCPurchaseInvoiceItemTax.lstCVarPurchaseInvoiceItem.Add(objCVarPurchaseInvoiceItemTax);
                            checkException = objCPurchaseInvoiceItemTax.SaveMethod(objCPurchaseInvoiceItemTax.lstCVarPurchaseInvoiceItem);
                            // _ImportPurchaseInvoiceItemID = objCVarPurchaseInvoiceItemTax.ID;
                            #endregion PurchaseInvoiceItem for both insert and update
                            //link
                            objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + _ImportPurchaseInvoiceItemID + "," + objCVarPurchaseInvoiceItemTax.ID + "," + "PurchaseInvoiceItem");

                            #region Insert FlexiSerial
                            for (int i = 0; i < _NumberOfRows; i++)
                            {
                                CvwFlexiSerial objCvwFlexiSerial_CheckUniqueness = new CvwFlexiSerial();
                                checkException = objCvwFlexiSerial_CheckUniqueness.GetList("WHERE Code=N'" + pParameters.pCodeList.Split(',')[i] + "' AND ImportOperationID=" + pParameters.pOperationID);
                                if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                                {
                                    CVarFlexiSerialTax objCVarFlexiSerialTax = new CVarFlexiSerialTax();
                                    objCVarFlexiSerialTax.ID = 0;
                                    objCVarFlexiSerialTax.ImportPurchaseInvoiceItemID = objCVarPurchaseInvoiceItemTax.ID;
                                    objCVarFlexiSerialTax.ExportPurchaseInvoiceItemID = 0;
                                    objCVarFlexiSerialTax.ImportPurchaseInvoice_OpeningBalanceItemID = objCVarPurchaseInvoiceItemTax.ID;
                                    objCVarFlexiSerialTax.ExportPurchaseInvoice_OpeningBalanceItemID = 0;
                                    objCVarFlexiSerialTax.Code = pParameters.pCodeList.Split(',')[i];
                                    objCVarFlexiSerialTax.ContainerID = 0;
                                    objCVarFlexiSerialTax.Notes = "0";
                                    CFlexiSerialTax objCFlexiSerialTax = new CFlexiSerialTax();
                                    objCFlexiSerialTax.lstCVarFlexiSerial.Add(objCVarFlexiSerialTax);
                                    checkException = objCFlexiSerialTax.SaveMethod(objCFlexiSerialTax.lstCVarFlexiSerial);
                                    if (checkException != null)
                                        _MessageReturned += " & " + checkException.Message;
                                } //if (objCvwFlexiSerial_CheckUniqueness.lstCVarvwFlexiSerial.Count == 0)
                            } //for (int i = 0; i < _ArrFlexi.Length; i++)
                            #endregion Insert FlexiSerial

                            #region Update PurchaseInvoiceItem Quanity
                            _UpdateClause = " Quantity = (SELECT COUNT(*) FROM FlexiSerial WHERE ImportPurchaseInvoiceItemID = " + objCVarPurchaseInvoiceItemTax.ID + ")";

                            checkException = objCPurchaseInvoiceItemTax.UpdateList(_UpdateClause + " where PurchaseInvoiceID = " + InvoiceID + " ");

                            if (checkException != null)
                                _MessageReturned += " & " + checkException.Message;
                            #endregion Update PurchaseInvoiceItem Quanity

                            #region Update Header total for case of update
                            _UpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM ForwardingTransChemTax.[dbo].PurchaseInvoiceItem WHERE PurchaseInvoiceID = " + pParameters.pPurchaseInvoiceID.ToString() + " AND IsDeleted=0)";
                            _UpdateClause += " WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString();
                            checkException = objCPurchaseInvoiceTax.UpdateList(_UpdateClause);

                            //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                            _UpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                            _UpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                            _UpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                            _UpdateClause += " WHERE ID = " + InvoiceID.ToString();
                            checkException = objCPurchaseInvoiceTax.UpdateList(_UpdateClause);
                            #endregion Update Header total for case of update

                            #region Get Returned Data
                            checkException = objCvwPurchaseInvoiceHeader.GetListPaging(999999, 1, "WHERE ID = " + pParameters.pPurchaseInvoiceID.ToString(), pParameters.pOrderBy, out _TempRowCount);
                            checkException = objCvwPurchaseInvoice.GetListPaging(pParameters.pPageSize, pParameters.pPageNumber, pParameters.pWhereClausePurchaseInvoice, pParameters.pOrderBy, out _TempRowCount);
                            checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID = " + InvoiceID.ToString() + " ORDER BY PurchaseItemName");
                            pParameters.pEditableCode = objCvwPurchaseInvoiceHeader.lstCVarvwPurchaseInvoice[0].EditableCode;
                            #endregion Get Returned Data
                        } //if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
                        #endregion Add PurchaseInvoice
                    }
                    #endregion
                }

                return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceHeader.lstCVarvwPurchaseInvoice[0]) : null //_PurchaseInvoiceHeader: pData[1]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice) : null //_PurchaseInvoice: pData[2]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem.lstCVarvwPurchaseInvoiceItem) : null //Details: pData[3]
            };
            }

        }

        [HttpGet, HttpPost]
        public object[] FlexiImport_DeleteList(string pDeletedFlexiImportIDs, Int64 pOperationID, Int64 pPurchaseInvoiceID, Int64 pPurchaseInvoiceItemID)
        {
            string _MessageReturned = "";
            string _UpdateClause = "";
            Exception checkException = null;
            CFlexiSerial objCFlexiSerial = new CFlexiSerial();
            CvwFlexiSerial objCvwFlexiSerial = new CvwFlexiSerial();
            CPurchaseInvoiceItem objCPurchaseInvoiceItem = new CPurchaseInvoiceItem();
            CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItem = new CvwPurchaseInvoiceItem();
            CPurchaseInvoice objCPurchaseInvoice = new CPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoiceHeader = new CvwPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            int _TempRowCount = 0;
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            objCOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID, "ContainerNumber", out _TempRowCount);
            var pContainerList = objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.ContainerNumber
                }).OrderBy(o => o.Code).ToList();
            objCPurchaseInvoice.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pPurchaseInvoiceID, "ID", out _TempRowCount);
            if (objCPurchaseInvoice.lstCVarPurchaseInvoice.Count == 0 && _MessageReturned == "") //not posted so save
            {
                //Delete Flexis
                checkException = objCFlexiSerial.DeleteList("WHERE ID IN (" + pDeletedFlexiImportIDs + ")");

                #region Update PurchaseInvoiceItem Quanity
                _UpdateClause = " Quantity = (SELECT COUNT(*) FROM FlexiSerial WHERE ImportPurchaseInvoiceItemID = " + pPurchaseInvoiceItemID + ")";
                _UpdateClause += " ,Amount = UnitPrice * (SELECT COUNT(*) FROM FlexiSerial WHERE ImportPurchaseInvoiceItemID = " + pPurchaseInvoiceItemID + ")";

                checkException = objCPurchaseInvoiceItem.UpdateList(_UpdateClause + " where PurchaseInvoiceID = " + pPurchaseInvoiceID + " ");


                // checkException = objCPurchaseInvoiceItem.UpdateList(_UpdateClause);
                if (checkException != null)
                    _MessageReturned += " & " + checkException.Message;
                #endregion Update PurchaseInvoiceItem Quanity

                #region Update Header total for case of update
                _UpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM PurchaseInvoiceItem WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID + " AND IsDeleted=0)";
                _UpdateClause += " WHERE ID = " + pPurchaseInvoiceID;
                checkException = objCPurchaseInvoice.UpdateList(_UpdateClause);

                //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                _UpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                _UpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                _UpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                _UpdateClause += " WHERE ID = " + pPurchaseInvoiceID;
                checkException = objCPurchaseInvoice.UpdateList(_UpdateClause);
                #endregion Update Header total for case of update


                #region Tax
                CvwDefaults objCDefaults = new CvwDefaults();
                int _RowCount2 = 0;
                objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
                string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                if (checkException == null && CompanyName == "CHM")
                {
                    CFlexiSerialTax objCFlexiSerialTax = new CFlexiSerialTax();
                    CPurchaseInvoiceItemTax objCPurchaseInvoiceItemTax = new CPurchaseInvoiceItemTax();
                    CPurchaseInvoiceTax objCPurchaseInvoiceTax = new CPurchaseInvoiceTax();

                    CTaxLink objCTaxLink = new CTaxLink();
                    objCTaxLink.GetList("where notes='' and originid=" + pPurchaseInvoiceItemID);

                    CTaxLink objCTaxLinkPurchaseInvoiceItem = new CTaxLink();
                    objCTaxLinkPurchaseInvoiceItem.GetList("where notes='' and originid=" + pPurchaseInvoiceItemID);
                    //Delete Flexis
                    checkException = objCFlexiSerialTax.DeleteList("WHERE ID IN (" + pDeletedFlexiImportIDs + ")");

                    #region Update PurchaseInvoiceItem Quanity
                    _UpdateClause = " Quantity = (SELECT COUNT(*) FROM ForwardingTransChemTax.[dbo].FlexiSerial WHERE ImportPurchaseInvoiceItemID = " + (objCTaxLinkPurchaseInvoiceItem.lstCVarTaxLink.Count > 0 ? objCTaxLinkPurchaseInvoiceItem.lstCVarTaxLink[0].TaxID : 0) + ")";
                    _UpdateClause += " ,Amount = UnitPrice * (SELECT COUNT(*) FROM ForwardingTransChemTax.[dbo].FlexiSerial WHERE ImportPurchaseInvoiceItemID = " + (objCTaxLinkPurchaseInvoiceItem.lstCVarTaxLink.Count > 0 ? objCTaxLinkPurchaseInvoiceItem.lstCVarTaxLink[0].TaxID : 0) + ")";

                    checkException = objCPurchaseInvoiceItem.UpdateList(_UpdateClause + " where PurchaseInvoiceID = " + (objCTaxLink.lstCVarTaxLink.Count > 0 ? objCTaxLink.lstCVarTaxLink[0].TaxID : 0) + " ");


                    // checkException = objCPurchaseInvoiceItem.UpdateList(_UpdateClause);
                    if (checkException != null)
                        _MessageReturned += " & " + checkException.Message;
                    #endregion Update PurchaseInvoiceItem Quanity

                    #region Update Header total for case of update
                    _UpdateClause = " AmountWithoutVAT = (SELECT SUM(ISNULL(Amount,0)) FROM ForwardingTransChemTax.[dbo].PurchaseInvoiceItem WHERE PurchaseInvoiceID = " + (objCTaxLink.lstCVarTaxLink.Count > 0 ? objCTaxLink.lstCVarTaxLink[0].TaxID : 0) + " AND IsDeleted=0)";
                    _UpdateClause += " WHERE ID = " + (objCTaxLink.lstCVarTaxLink.Count > 0 ? objCTaxLink.lstCVarTaxLink[0].TaxID : 0);
                    checkException = objCPurchaseInvoiceTax.UpdateList(_UpdateClause);

                    //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                    _UpdateClause = " TaxAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100";
                    _UpdateClause += " , DiscountAmount = ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100";
                    _UpdateClause += " , Amount = ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)";
                    _UpdateClause += " WHERE ID = " + (objCTaxLink.lstCVarTaxLink.Count > 0 ? objCTaxLink.lstCVarTaxLink[0].TaxID : 0);
                    checkException = objCPurchaseInvoiceTax.UpdateList(_UpdateClause);
                    #endregion Update Header total for case of update
                }

                #endregion
                #region Get Returned Data
                checkException = objCvwPurchaseInvoiceHeader.GetListPaging(999999, 1, "WHERE ID = " + pPurchaseInvoiceID, "ID", out _TempRowCount);
                checkException = objCvwPurchaseInvoice.GetListPaging(999999, 1, "WHERE OperationID = " + pOperationID, "ID", out _TempRowCount);
                checkException = objCvwPurchaseInvoiceItem.GetList("WHERE PurchaseInvoiceID = " + pPurchaseInvoiceID + " ORDER BY PurchaseItemName");
                checkException = objCvwFlexiSerial.GetList("WHERE ImportPurchaseInvoiceItemID=" + pPurchaseInvoiceItemID + " ORDER BY Code");
                #endregion Get Returned Data
            } //if (objCPurchaseInvoice_IsPosted.lstCVarPurchaseInvoice.Count == 0) //not posted so save
            else
                _MessageReturned = "This record is posted.";
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned //pData[0]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceHeader.lstCVarvwPurchaseInvoice[0]) : null //_PurchaseInvoiceHeader: pData[1]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoice.lstCVarvwPurchaseInvoice) : null //_PurchaseInvoice: pData[2]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwPurchaseInvoiceItem.lstCVarvwPurchaseInvoiceItem) : null //Details: pData[3]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(objCvwFlexiSerial.lstCVarvwFlexiSerial) : null //pFlexi: pData[4]
                , _MessageReturned == "" ? new JavaScriptSerializer().Serialize(pContainerList) : null //pContainerList: pData[5]
            };
        }

        [HttpGet, HttpPost]
        public object[] FlexiExport_SaveList([FromBody] FlexiExport_SaveList pParameters)
        {
            Exception checkException = null;
            string _UpdateClause = "";
            Int64 _FlexiPurchaseItemID = 0;
            Int64 _ExportPurchaseInvoiceItemID = 0;
            CvwPayables objCvwPayables = new CvwPayables();
            CPurchaseInvoice objCPurchaseInvoice = new CPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoice = new CvwPurchaseInvoice();
            CvwPurchaseInvoice objCvwPurchaseInvoiceHeader = new CvwPurchaseInvoice();
            CvwPurchaseInvoiceItem objCvwPurchaseInvoiceItem = new CvwPurchaseInvoiceItem();
            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            checkException = objCvwNoAccessUnit.GetList("WHERE 1=1");
            int _LengthUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].LengthUnitID).First().ID;
            int _WeightUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].WeightUnitID).First().ID;
            int _VolumeUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].VolumeUnitID).First().ID;
            int _NumberOfRows = pParameters.pFlexiSerialIDList.Split(',').Length;
            #region Add FLEXI to PurchaseItems if not exists and get FlexiPurchaseItemID
            CPurchaseItem objCPurchaseItem_Flexi = new CPurchaseItem();//get flexi PurchaseItemID
            checkException = objCPurchaseItem_Flexi.GetList("WHERE Code= N'FLEXI'");
            if (objCPurchaseItem_Flexi.lstCVarPurchaseItem.Count > 0) //Flexi PurchaseItem exists
                _FlexiPurchaseItemID = objCPurchaseItem_Flexi.lstCVarPurchaseItem[0].ID;
            else //Add Flexi to purchase items
            {
                CVarPurchaseItem objCVarPurchaseItem = new CVarPurchaseItem();
                objCVarPurchaseItem.Code = "FLEXI";
                objCVarPurchaseItem.Name = "FLEXI";
                objCVarPurchaseItem.LocalName = "FLEXI";
                objCVarPurchaseItem.StockUnitQuantity = 0;
                objCVarPurchaseItem.Price = 0;  //Decimal.Parse(insertPIFromExcel.pPriceList.Split(',')[i]);
                objCVarPurchaseItem.CurrencyID = objCvwDefaults.lstCVarvwDefaults[0].CurrencyID;
                objCVarPurchaseItem.PartNumber = "0";  //insertPIFromExcel.pPartNumberList.Split(',')[i];
                objCVarPurchaseItem.HSCode = "0";  //insertPIFromExcel.pHSCodeList.Split(',')[i];

                objCVarPurchaseItem.ModelNumber = "0";
                objCVarPurchaseItem.BrandName = "0";
                objCVarPurchaseItem.ProductType = "0";

                objCVarPurchaseItem.Notes = "0";
                objCVarPurchaseItem.CreatorUserID = objCVarPurchaseItem.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarPurchaseItem.CreationDate = objCVarPurchaseItem.ModificationDate = DateTime.Now;

                objCVarPurchaseItem.WeightUnitID = _WeightUnitID;
                objCVarPurchaseItem.LengthUnitID = _LengthUnitID;
                objCVarPurchaseItem.VolumeUnitID = _VolumeUnitID;
                objCVarPurchaseItem.IsFragile = false;
                objCVarPurchaseItem.IsIMO = false;
                objCVarPurchaseItem.IsAddedFromExcel = true;
                objCVarPurchaseItem.IsFlexi = true;

                objCVarPurchaseItem.PreferredAreaID = 0;
                objCVarPurchaseItem.ByExpireDate = false;
                objCVarPurchaseItem.BySerialNo = false;
                objCVarPurchaseItem.ByLotNo = false;
                objCVarPurchaseItem.ByVehicle = false;
                objCVarPurchaseItem.ClientID = 0;

                #region Vehicle
                objCVarPurchaseItem.OperationID = 0;
                objCVarPurchaseItem.IsVehicle = false;
                objCVarPurchaseItem.EquipmentModelID = 0;
                objCVarPurchaseItem.MotorNumber = "0";
                objCVarPurchaseItem.ChassisNumber = "0";
                objCVarPurchaseItem.LotNumber = "0";
                objCVarPurchaseItem.SerialNumber = "0";
                #endregion Vehicle

                CPurchaseItem objCPurchaseItem = new CPurchaseItem();
                objCPurchaseItem.lstCVarPurchaseItem.Add(objCVarPurchaseItem);
                checkException = objCPurchaseItem.SaveMethod(objCPurchaseItem.lstCVarPurchaseItem);
                _FlexiPurchaseItemID = objCVarPurchaseItem.ID;
            }
            #endregion Add FLEXI to PurchaseItems if not exists and get FlexiPurchaseItemID

            #region Add PurchaseInvoice
            int _TempRowCount = 0;

            #region FlexiSerial Update
            var _ArrFlexiSerialID = pParameters.pFlexiSerialIDList.Split(',');
            var _ArrFlexiSerialIsAdded = pParameters.pIsFlexiSelected.Split(',');
            var _ArrFlexiExportPrice = pParameters.pFlexiExportPriceList.Split(',');
            var _ArrFlexiContainerID = pParameters.pFlexiContainerIDList.Split(',');
            var _ArrFlexiNotes = pParameters.pFlexiNotesList.Split(',');
            for (int i = 0; i < _ArrFlexiSerialID.Length; i++)
            {
                #region Update Flexi Serial Data
                CFlexiSerial objCFlexiSerial = new CFlexiSerial();
                _UpdateClause = "ExportPurchaseInvoiceItemID=" + (_ArrFlexiSerialIsAdded[i] == "0" ? "NULL" : pParameters.pTransactionID) + "\n";
                _UpdateClause += ",ExportPrice=" + (_ArrFlexiExportPrice[i] == "0" ? "NULL" : _ArrFlexiExportPrice[i]) + "\n";
                _UpdateClause += ",ContainerID=" + (_ArrFlexiContainerID[i] == "0" || _ArrFlexiSerialIsAdded[i] == "0" ? "NULL" : ("N'" + _ArrFlexiContainerID[i] + "'")) + "\n";
                _UpdateClause += ",Notes=" + (_ArrFlexiNotes[i] == "0" ? "NULL" : ("N'" + _ArrFlexiNotes[i] + "'")) + "\n";
                _UpdateClause += "WHERE ID=" + _ArrFlexiSerialID[i];
                checkException = objCFlexiSerial.UpdateList(_UpdateClause);
                #endregion Update Flexi Serial Data
            } //for (int i = 0; i < _ArrFlexi.Length; i++)
            #endregion FlexiSerial Update
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            #endregion Add PurchaseInvoice

            CvwSC_Transactions cvwSC_Transactions = new CvwSC_Transactions();
            CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
            int t = 0;
            cvwSC_Transactions.GetListPaging(10000, 1, " where ID = " + pParameters.pTransactionID + "", " ID ", out t);

            //cvwSC_Transactions.GetList();
            cSC_TransactionsDetails.GetList(" where TransactionID = " + pParameters.pTransactionID + "");

            return new object[] {
                serializer.Serialize(objCvwPayables.lstCVarvwPayables) //pPayables
                , serializer.Serialize(cvwSC_Transactions.lstCVarvwSC_Transactions[0]) //_PurchaseInvoiceHeader: pData[1]
                , serializer.Serialize(cvwSC_Transactions.lstCVarvwSC_Transactions) //_PurchaseInvoice: pData[2]
                , serializer.Serialize(cSC_TransactionsDetails.lstCVarSC_TransactionsDetails) //Details: pData[3]
            };
        }

        #endregion Flexi
    }
    public class FlexiImport_SaveList
    {
        public Int64 pPurchaseInvoiceID { get; set; }
        public Int64 pInvoiceNumber { get; set; }
        public string pEditableCode { get; set; }
        public Int64 pOperationID { get; set; }
        public Int64 pClientOperationPartnerID { get; set; }
        public Int64 pClientAddressID { get; set; }
        public string pClientPrintedAddress { get; set; }
        public Int64 pSupplierOperationPartnerID { get; set; }
        public Int64 pSupplierAddressID { get; set; }
        public string pSupplierPrintedAddress { get; set; }
        public decimal pAmountWithoutVAT { get; set; }
        public Int32 pCurrencyID { get; set; }
        public decimal pExchangeRate { get; set; }
        public string pInvoiceDate { get; set; }
        public Int32 pTaxTypeID { get; set; }
        public decimal pTaxPercentage { get; set; }
        public decimal pTaxAmount { get; set; }
        public Int32 pDiscountTypeID { get; set; }
        public decimal pDiscountPercentage { get; set; }
        public decimal pDiscountAmount { get; set; }
        public decimal pAmount { get; set; }
        public string pNotes { get; set; }
        public Int32 pBranchID { get; set; }
        public bool pIsApproved { get; set; }
        public bool pIsDeleted { get; set; }
        public Int32 pApprovingUserID { get; set; }
        public Int32 pPaymentTermID { get; set; }
        public Int32 pInvoiceTypeID { get; set; }
        public string pInvoiceTypeName { get; set; }
        //Where ClauseParameters
        public string pWhereClausePurchaseInvoice { get; set; }
        public Int32 pPageSize { get; set; }
        public Int32 pPageNumber { get; set; }
        public string pOrderBy { get; set; }
        //Items
        public string pCodeList { get; set; }



        public bool? pIsOpeningBalanceFlexi { get; set; }
    }
    public class FlexiExport_SaveList
    {
        public Int64 pPurchaseInvoiceID { get; set; }
        public Int64 pInvoiceNumber { get; set; }
        public string pEditableCode { get; set; }
        public Int64 pOperationID { get; set; }
        public Int64 pClientOperationPartnerID { get; set; }
        public Int64 pClientAddressID { get; set; }
        public string pClientPrintedAddress { get; set; }
        public Int64 pSupplierOperationPartnerID { get; set; }
        public Int64 pSupplierAddressID { get; set; }
        public string pSupplierPrintedAddress { get; set; }
        public decimal pAmountWithoutVAT { get; set; }
        public Int32 pCurrencyID { get; set; }
        public decimal pExchangeRate { get; set; }
        public string pInvoiceDate { get; set; }
        public Int32 pTaxTypeID { get; set; }
        public decimal pTaxPercentage { get; set; }
        public decimal pTaxAmount { get; set; }
        public Int32 pDiscountTypeID { get; set; }
        public decimal pDiscountPercentage { get; set; }
        public decimal pDiscountAmount { get; set; }
        public decimal pAmount { get; set; }
        public string pNotes { get; set; }
        public Int32 pBranchID { get; set; }
        public bool pIsApproved { get; set; }
        public bool pIsDeleted { get; set; }
        public Int32 pApprovingUserID { get; set; }
        public Int32 pPaymentTermID { get; set; }
        //Where ClauseParameters
        public string pWhereClausePurchaseInvoice { get; set; }
        public Int32 pPageSize { get; set; }
        public Int32 pPageNumber { get; set; }
        public string pOrderBy { get; set; }
        //Items
        public Int64 pFlexiPurchaseInvoiceItemID { get; set; }
        public string pFlexiSerialIDList { get; set; }
        public string pIsFlexiSelected { get; set; }
        public string pFlexiExportPriceList { get; set; }
        public string pFlexiContainerIDList { get; set; }
        public string pFlexiNotesList { get; set; }

        public string pTransactionID { get; set; }
    }
}
