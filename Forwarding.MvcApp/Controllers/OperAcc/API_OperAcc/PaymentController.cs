using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.CustomizedSPCall;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.OperAcc.API_OperAcc
{
    public class PaymentController : ApiController
    {
        #region Payments

        [HttpGet, HttpPost]
        public Object[] Payment_LoadAll(string pWhereClause)
        {
            CvwAccPayment objCvwAccPayment = new CvwAccPayment();
            objCvwAccPayment.GetList(pWhereClause);
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwAccPayment.lstCVarvwAccPayment)
            };
        }

        [HttpGet, HttpPost]
        public Object[] Payment_LoadItem(Int64 pPaymentIDForModal)
        {
            Int32 _RowCount = 0;
            CvwAccPayment objCvwAccPayment = new CvwAccPayment();
            objCvwAccPayment.GetListPaging(1, 1, "WHERE ID = " + pPaymentIDForModal.ToString(), "ID", out _RowCount);
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            objCvwAccPaymentDetails.GetListPaging(100, 1, "WHERE IsDeleted=0 AND PaymentID = " + pPaymentIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwAccPayment.lstCVarvwAccPayment[0]) //var pPaymentHeader = pData[0];
                , new JavaScriptSerializer().Serialize(objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails) //var pPaymentDetails = pData[1];
            };
        }

        [HttpGet, HttpPost]
        public Object[] Payment_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            objCvwAccPartners.GetListFilter(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CTreasury objCTreasury = new CTreasury();
            objCTreasury.GetList(" WHERE 1=1 ORDER BY Name ");

            CNoAccessPaymentType objCNoAccessPaymentType = new CNoAccessPaymentType();
            objCNoAccessPaymentType.GetList(" WHERE IsInactive=0 ORDER BY Name ");

            CvwBankAccount objCvwBankAccount = new CvwBankAccount();
            objCvwBankAccount.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwChargeTypesWithMinimalColumns objCvwChargeTypesWithMinimalColumns = new CvwChargeTypesWithMinimalColumns();
            objCvwChargeTypesWithMinimalColumns.GetListPaging(20000, pPageNumber, "WHERE IsGeneralChargeType=1", "Name", out _RowCount);

            CvwAccPayment objCvwAccPayment = new CvwAccPayment();
            objCvwAccPayment.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwAccPayment.lstCVarvwAccPayment)
                , _RowCount
              , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners) : null //data[2]
              , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCTreasury.lstCVarTreasury) :null  //data[3]
              , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCNoAccessPaymentType.lstCVarNoAccessPaymentType) : null  //data[4]
              , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes) : null  //data[5]
              , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwBankAccount.lstCVarvwBankAccount) : null  //data[6]
              , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwChargeTypesWithMinimalColumns.lstCVarvwChargeTypesWithMinimalColumns) : null //data[7]
            };
        }

        [HttpGet, HttpPost]
        public Object[] Payment_PartnerTypeChanged(Int32 pPartnerTypeID, string pWhereClause, string pOrderBy, Int32 pPageNumber, Int32 pPageSize)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CvwAccPayment objCvwAccPayment = new CvwAccPayment();

            if (pPartnerTypeID != 0)
                checkException = objCvwAccPartners.GetListPaging(10000, 1, "WHERE PartnerTypeID=" + pPartnerTypeID, "Name", out _RowCount);
            checkException = objCvwAccPayment.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCvwAccPayment.lstCVarvwAccPayment)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwAccPartners.lstCVarvwAccPartners)
            };
        }

        [HttpGet, HttpPost]
        public object[] FillPartners(Int32 pPartnerTypeID)
        {
            int _RowCount = 0;
            int constCustomerPartnerTypeID = 1;
            int constAgentPartnerTypeID = 2;
            int constShippingAgentPartnerTypeID = 3;
            int constCustomsClearanceAgentPartnerTypeID = 4;
            int constShippingLinePartnerTypeID = 5;
            int constAirlinePartnerTypeID = 6;
            int constTruckerPartnerTypeID = 7;
            int constSupplierPartnerTypeID = 8;
            int constCustodyPartnerTypeID = 20;

            if (pPartnerTypeID == constCustomerPartnerTypeID)
            {
                CvwCustomersWithMinimalColumns objCCustomers = new CvwCustomersWithMinimalColumns();
                objCCustomers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustomers.lstCVarvwCustomersWithMinimalColumns) };
            }
            else if (pPartnerTypeID == constAgentPartnerTypeID)
            {
                CAgents objCAgents = new CAgents();
                objCAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCAgents.lstCVarAgents) };
            }
            else if (pPartnerTypeID == constShippingAgentPartnerTypeID)
            {

                CShippingAgents objCShippingAgents = new CShippingAgents();
                objCShippingAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCShippingAgents.lstCVarShippingAgents) };
            }
            else if (pPartnerTypeID == constCustomsClearanceAgentPartnerTypeID)
            {
                CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
                objCCustomsClearanceAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents) };
            }
            else if (pPartnerTypeID == constShippingLinePartnerTypeID)
            {
                CShippingLines objCShippingLines = new CShippingLines();
                objCShippingLines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines) };
            }
            else if (pPartnerTypeID == constAirlinePartnerTypeID)
            {
                CvwAirlinesWithMinimalColumns objCAirlines = new CvwAirlinesWithMinimalColumns();
                objCAirlines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCAirlines.lstCVarvwAirlinesWithMinimalColumns) };
            }
            else if (pPartnerTypeID == constTruckerPartnerTypeID)
            {
                CTruckers objCTruckers = new CTruckers();
                objCTruckers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers) };
            }
            else if (pPartnerTypeID == constSupplierPartnerTypeID)
            {
                CSuppliers objCSuppliers = new CSuppliers();
                objCSuppliers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constCustodyPartnerTypeID)
            {
                CCustody objCCustody = new CCustody();
                objCCustody.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustody.lstCVarCustody) };
            }
            return new object[] { };
        }
        [HttpGet, HttpPost]
        public object[] Payment_Update(Int64 pPaymentID, Int32 pPRType, Int32 pPaymentTypeID, string pPaymentDate, string pDueDate, Int32 pChargeTypeID, Int32 pTreasuryID, Int32 pPartnerTypeID
            , Int32 pPartnerID, decimal pTotalLocalAmount, string pDealerName, string pBankName, string pChequeOrVisaNo, Int32 pBankAccountID, string pPaymentNotes, bool pIsGeneralExpense, bool pIsRefused
            , decimal pWithHoldingTax
            , string pWhereClausePayment, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            CVarAccPayment objCVarAccPayment = new CVarAccPayment();
            CAccPayment objCAccPayment = new CAccPayment();
            CvwAccPayment objCvwAccPayment = new CvwAccPayment();
            Int32 _RowCount = 0;

            _result = true;

            pUpdateClause = (pPRType == 0 ? " PRType = NULL " : (" PRType = N'" + pPRType.ToString() + "'"));
            pUpdateClause += (pPaymentTypeID == 0 ? " ,PaymentTypeID = NULL " : (" ,PaymentTypeID = N'" + pPaymentTypeID.ToString() + "'"));
            pUpdateClause += (pPaymentDate == "01/01/1900" ? " ,PaymentDate = NULL " : (" ,PaymentDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pPaymentDate, 1) + "'"));
            pUpdateClause += (pDueDate == "01/01/1900" ? " ,DueDate = NULL " : (" ,DueDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pDueDate, 1) + "'"));
            pUpdateClause += (pChargeTypeID == 0 ? " ,ChargeTypeID = NULL " : (" ,ChargeTypeID = N'" + pChargeTypeID.ToString() + "'"));
            pUpdateClause += (pTreasuryID == 0 ? " ,TreasuryID = NULL " : (" ,TreasuryID = N'" + pTreasuryID.ToString() + "'"));
            pUpdateClause += (pPartnerTypeID == 0 ? " ,PartnerTypeID = NULL " : (" ,PartnerTypeID = N'" + pPartnerTypeID.ToString() + "'"));
            pUpdateClause += (GetPartnerID(1, pPartnerTypeID, pPartnerID) == 0 ? " ,CustomerID = NULL " : (" ,CustomerID = N'" + GetPartnerID(1, pPartnerTypeID, pPartnerID).ToString() + "'"));
            pUpdateClause += (GetPartnerID(2, pPartnerTypeID, pPartnerID) == 0 ? " ,AgentID = NULL " : (" ,AgentID = N'" + GetPartnerID(2, pPartnerTypeID, pPartnerID).ToString() + "'"));
            pUpdateClause += (GetPartnerID(3, pPartnerTypeID, pPartnerID) == 0 ? " ,ShippingAgentID = NULL " : (" ,ShippingAgentID = N'" + GetPartnerID(3, pPartnerTypeID, pPartnerID).ToString() + "'"));
            pUpdateClause += (GetPartnerID(4, pPartnerTypeID, pPartnerID) == 0 ? " ,CustomsClearanceAgentID = NULL " : (" ,CustomsClearanceAgentID = N'" + GetPartnerID(4, pPartnerTypeID, pPartnerID).ToString() + "'"));
            pUpdateClause += (GetPartnerID(5, pPartnerTypeID, pPartnerID) == 0 ? " ,ShippingLineID = NULL " : (" ,ShippingLineID = N'" + GetPartnerID(5, pPartnerTypeID, pPartnerID).ToString() + "'"));
            pUpdateClause += (GetPartnerID(6, pPartnerTypeID, pPartnerID) == 0 ? " ,AirlineID = NULL " : (" ,AirlineID = N'" + GetPartnerID(6, pPartnerTypeID, pPartnerID).ToString() + "'"));
            pUpdateClause += (GetPartnerID(7, pPartnerTypeID, pPartnerID) == 0 ? " ,TruckerID = NULL " : (" ,TruckerID = N'" + GetPartnerID(7, pPartnerTypeID, pPartnerID).ToString() + "'"));
            pUpdateClause += (GetPartnerID(8, pPartnerTypeID, pPartnerID) == 0 ? " ,SupplierID = NULL " : (" ,SupplierID = N'" + GetPartnerID(8, pPartnerTypeID, pPartnerID).ToString() + "'"));
            pUpdateClause += (GetPartnerID(20, pPartnerTypeID, pPartnerID) == 0 ? " ,CustodyID = NULL " : (" ,CustodyID = N'" + GetPartnerID(20, pPartnerTypeID, pPartnerID).ToString() + "'"));
            pUpdateClause += (pTotalLocalAmount == 0 ? " ,TotalLocalAmount = NULL " : (" ,TotalLocalAmount = N'" + pTotalLocalAmount + "'"));
            pUpdateClause += (pDealerName == "0" ? " ,DealerName = NULL " : (" ,DealerName = N'" + pDealerName + "'"));
            pUpdateClause += (pBankName == "0" ? " ,BankName = NULL " : (" ,BankName = N'" + pBankName + "'"));
            pUpdateClause += (pChequeOrVisaNo == "0" ? " ,ChequeOrVisaNo = NULL " : (" ,ChequeOrVisaNo = N'" + pChequeOrVisaNo + "'"));
            pUpdateClause += (pBankAccountID == 0 ? " ,BankAccountID = NULL " : (" ,BankAccountID = N'" + pBankAccountID.ToString() + "'"));
            pUpdateClause += (pPaymentNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pPaymentNotes + "'"));
            pUpdateClause += (pIsGeneralExpense ? " ,IsGeneralExpense = 1 " : (" ,IsGeneralExpense=0 "));
            pUpdateClause += (pWithHoldingTax == 0 ? " ,WithHoldingTax = NULL " : (" ,WithHoldingTax = N'" + pWithHoldingTax.ToString() + "'"));
            pUpdateClause += (pIsRefused ? " ,IsRefused = 1 " : (" ,IsRefused=0 "));
            pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
            pUpdateClause += (" ,ModificationDate = GETDATE() ");
            pUpdateClause += " WHERE IsApproved=0 AND ID =" + pPaymentID.ToString();
            checkException = objCAccPayment.UpdateList(pUpdateClause);

            checkException = objCvwAccPayment.GetListPaging(pPageSize, pPageNumber, pWhereClausePayment, pOrderBy, out _RowCount);

            return new object[]
            {
                _result //pData[0]
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccPayment.lstCVarvwAccPayment) : null //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] Payment_Delete(string pPaymentIDsDeleted
            , string pWhereClausePayment, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            CAccPayment objCAccPayment = new CAccPayment();
            CvwAccPayment objCvwAccPayment = new CvwAccPayment();
            CAccPaymentDetails objCAccPaymentDetails = new CAccPaymentDetails();
            int _RowCount = 0;
            checkException = objCAccPayment.UpdateList("IsDeleted=1  "
                + " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString()
                + " , ModificationDate = GETDATE() "
                + "  WHERE ID IN (" + pPaymentIDsDeleted + ")");
            if (checkException == null)
            {
                _result = true;
                checkException = objCAccPaymentDetails.UpdateList("IsDeleted=1 "
                    + " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString()
                    + " , ModificationDate = GETDATE() "
                    + "  WHERE PaymentID IN (" + pPaymentIDsDeleted + ")");
                checkException = objCvwAccPayment.GetListPaging(pPageSize, pPageNumber, pWhereClausePayment, pOrderBy, out _RowCount);
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccPayment.lstCVarvwAccPayment) : null
            };
        }
        #endregion Payments

        #region PaymentDetails
        [HttpGet, HttpPost]
        public object[] PaymentDetails_Insert(Int64 pPaymentID, Int32 pBranchID, Int32 pPRType, Int32 pPaymentTypeID, DateTime pPaymentDateForInsert, string pPaymentDateForUpdate, DateTime pDueDateForInsert, string pDueDateForUpdate, Int32 pChargeTypeID, Int32 pTreasuryID, Int32 pPartnerTypeID
            , Int32 pPartnerID, string pDealerName, decimal pTotalLocalAmount, string pBankName, string pChequeOrVisaNo, Int32 pBankAccountID, string pPaymentNotes, bool pIsGeneralExpense, bool pIsRefused
            , decimal pWithHoldingTax
            , string pWhereClausePayment, Int32 pPageSize, Int32 pPageNumber, string pOrderBy
            //Details
            , decimal pPaymentDetailsAmount, Int32 pPaymentDetailsCurrencyID, decimal pPaymentDetailsExchangeRate, string pPaymentDetailsNotes)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            string pPaymentCode = "";
            CVarAccPayment objCVarAccPayment = new CVarAccPayment();
            CAccPayment objCAccPayment = new CAccPayment();
            CvwAccPayment objCvwAccPayment = new CvwAccPayment();
            CVarAccPaymentDetails objCVarAccPaymentDetails = new CVarAccPaymentDetails();
            CAccPaymentDetails objCAccPaymentDetails = new CAccPaymentDetails();
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            Int32 _RowCount = 0;
            #region Header Payment
            if (pPaymentID == 0) //this means insert header
            {
                objCVarAccPayment.PaymentCode = "0";
                objCVarAccPayment.BranchID = pBranchID;
                objCVarAccPayment.PRType = pPRType;
                objCVarAccPayment.PaymentTypeID = pPaymentTypeID;
                objCVarAccPayment.PaymentDate = pPaymentDateForInsert;
                objCVarAccPayment.DueDate = pDueDateForInsert;
                objCVarAccPayment.ChargeTypeID = pChargeTypeID;
                objCVarAccPayment.TreasuryID = pTreasuryID;
                objCVarAccPayment.PartnerTypeID = pPartnerTypeID;
                objCVarAccPayment.CustomerID = GetPartnerID(1, pPartnerTypeID, pPartnerID);
                objCVarAccPayment.AgentID = GetPartnerID(2, pPartnerTypeID, pPartnerID);
                objCVarAccPayment.ShippingAgentID = GetPartnerID(3, pPartnerTypeID, pPartnerID);
                objCVarAccPayment.CustomsClearanceAgentID = GetPartnerID(4, pPartnerTypeID, pPartnerID);
                objCVarAccPayment.ShippingLineID = GetPartnerID(5, pPartnerTypeID, pPartnerID);
                objCVarAccPayment.AirlineID = GetPartnerID(6, pPartnerTypeID, pPartnerID);
                objCVarAccPayment.TruckerID = GetPartnerID(7, pPartnerTypeID, pPartnerID);
                objCVarAccPayment.SupplierID = GetPartnerID(8, pPartnerTypeID, pPartnerID);
                objCVarAccPayment.CustodyID = GetPartnerID(20, pPartnerTypeID, pPartnerID);
                objCVarAccPayment.DealerName = pDealerName;
                objCVarAccPayment.TotalLocalAmount = pTotalLocalAmount;
                objCVarAccPayment.BankName = pBankName;
                objCVarAccPayment.ChequeOrVisaNo = pChequeOrVisaNo;
                objCVarAccPayment.BankAccountID = pBankAccountID;
                objCVarAccPayment.Notes = pPaymentNotes;
                objCVarAccPayment.WithHoldingTax = pWithHoldingTax;
                objCVarAccPayment.IsGeneralExpense = pIsGeneralExpense;
                objCVarAccPayment.IsRefused = pIsRefused;
                objCVarAccPayment.CreatorUserID = objCVarAccPayment.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAccPayment.CreationDate = objCVarAccPayment.ModificationDate = DateTime.Now;

                objCAccPayment.lstCVarAccPayment.Add(objCVarAccPayment);
                checkException = objCAccPayment.SaveMethod(objCAccPayment.lstCVarAccPayment);
                pPaymentID = objCVarAccPayment.ID;
            }
            else //update header
            {
                pUpdateClause = (pPRType == 0 ? " PRType = NULL " : (" PRType = N'" + pPRType.ToString() + "'"));
                pUpdateClause += (pPaymentTypeID == 0 ? " ,PaymentTypeID = NULL " : (" ,PaymentTypeID = N'" + pPaymentTypeID.ToString() + "'"));
                pUpdateClause += (pPaymentDateForUpdate == "01/01/1900" ? " ,PaymentDate = NULL " : (" ,PaymentDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pPaymentDateForUpdate, 1) + "'"));
                pUpdateClause += (pDueDateForUpdate == "01/01/1900" ? " ,DueDate = NULL " : (" ,DueDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pDueDateForUpdate, 1) + "'"));
                pUpdateClause += (pChargeTypeID == 0 ? " ,ChargeTypeID = NULL " : (" ,ChargeTypeID = N'" + pChargeTypeID.ToString() + "'"));
                pUpdateClause += (pTreasuryID == 0 ? " ,TreasuryID = NULL " : (" ,TreasuryID = N'" + pTreasuryID.ToString() + "'"));
                pUpdateClause += (pPartnerTypeID == 0 ? " ,PartnerTypeID = NULL " : (" ,PartnerTypeID = N'" + pPartnerTypeID.ToString() + "'"));
                pUpdateClause += (GetPartnerID(1, pPartnerTypeID, pPartnerID) == 0 ? " ,CustomerID = NULL " : (" ,CustomerID = N'" + GetPartnerID(1, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(2, pPartnerTypeID, pPartnerID) == 0 ? " ,AgentID = NULL " : (" ,AgentID = N'" + GetPartnerID(2, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(3, pPartnerTypeID, pPartnerID) == 0 ? " ,ShippingAgentID = NULL " : (" ,ShippingAgentID = N'" + GetPartnerID(3, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(4, pPartnerTypeID, pPartnerID) == 0 ? " ,CustomsClearanceAgentID = NULL " : (" ,CustomsClearanceAgentID = N'" + GetPartnerID(4, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(5, pPartnerTypeID, pPartnerID) == 0 ? " ,ShippingLineID = NULL " : (" ,ShippingLineID = N'" + GetPartnerID(5, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(6, pPartnerTypeID, pPartnerID) == 0 ? " ,AirlineID = NULL " : (" ,AirlineID = N'" + GetPartnerID(6, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(7, pPartnerTypeID, pPartnerID) == 0 ? " ,TruckerID = NULL " : (" ,TruckerID = N'" + GetPartnerID(7, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(8, pPartnerTypeID, pPartnerID) == 0 ? " ,SupplierID = NULL " : (" ,SupplierID = N'" + GetPartnerID(8, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(20, pPartnerTypeID, pPartnerID) == 0 ? " ,CustodyID = NULL " : (" ,CustodyID = N'" + GetPartnerID(20, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (pDealerName == "0" ? " ,DealerName = NULL " : (" ,DealerName = N'" + pDealerName + "'"));
                pUpdateClause += (pTotalLocalAmount == 0 ? " ,TotalLocalAmount = NULL " : (" ,TotalLocalAmount = N'" + pTotalLocalAmount + "'"));
                pUpdateClause += (pBankName == "0" ? " ,BankName = NULL " : (" ,BankName = N'" + pBankName + "'"));
                pUpdateClause += (pChequeOrVisaNo == "0" ? " ,ChequeOrVisaNo = NULL " : (" ,ChequeOrVisaNo = N'" + pChequeOrVisaNo + "'"));
                pUpdateClause += (pBankAccountID == 0 ? " ,BankAccountID = NULL " : (" ,BankAccountID = N'" + pBankAccountID.ToString() + "'"));
                pUpdateClause += (pPaymentNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pPaymentNotes + "'"));
                pUpdateClause += (pWithHoldingTax == 0 ? " ,WithHoldingTax = NULL " : (" ,WithHoldingTax = N'" + pWithHoldingTax.ToString() + "'"));
                pUpdateClause += (pIsGeneralExpense ? " ,IsGeneralExpense=1 " : (" ,IsGeneralExpense=0 "));
                pUpdateClause += (pIsRefused ? " ,IsRefused=1 " : (" ,IsRefused=0 "));
                pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                pUpdateClause += (" ,ModificationDate = GETDATE() ");
                pUpdateClause += " WHERE ID =" + pPaymentID.ToString();
                checkException = objCAccPayment.UpdateList(pUpdateClause);
            }
            #endregion Header Payment
            #region PaymentDetails
            if (checkException == null)
            {
                _result = true;
                checkException = objCAccPayment.GetList("WHERE ID = " + pPaymentID.ToString());
                pPaymentCode = objCAccPayment.lstCVarAccPayment[0].PaymentCode;
                objCVarAccPaymentDetails.PaymentID = pPaymentID;
                objCVarAccPaymentDetails.Amount = pPaymentDetailsAmount;
                objCVarAccPaymentDetails.CurrencyID = pPaymentDetailsCurrencyID;
                objCVarAccPaymentDetails.ExchangeRate = pPaymentDetailsExchangeRate;
                objCVarAccPaymentDetails.Notes = pPaymentDetailsNotes;
                objCVarAccPaymentDetails.CreatorUserID = objCVarAccPaymentDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAccPaymentDetails.CreationDate = objCVarAccPaymentDetails.ModificationDate = DateTime.Now;
                objCAccPaymentDetails.lstCVarAccPaymentDetails.Add(objCVarAccPaymentDetails);
                checkException = objCAccPaymentDetails.SaveMethod(objCAccPaymentDetails.lstCVarAccPaymentDetails);

                checkException = objCvwAccPayment.GetListPaging(pPageSize, pPageNumber, pWhereClausePayment, pOrderBy, out _RowCount);
                checkException = objCvwAccPaymentDetails.GetList("WHERE IsDeleted=0 AND PaymentID = " + pPaymentID.ToString());
            }
            #endregion PaymentDetails
            return new object[]
            {
                _result //pData[0]
                , _result ? pPaymentID : 0 //pData[1]
                , _result ? pPaymentCode : "" //pData[2]
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails) : null //pData[3]
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccPayment.lstCVarvwAccPayment) : null //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] PaymentDetails_Update(Int64 pPaymentID, Int32 pPRType, Int32 pPaymentTypeID, string pPaymentDate, string pDueDate, Int32 pChargeTypeID, Int32 pTreasuryID, Int32 pPartnerTypeID
            , Int32 pPartnerID, string pDealerName, string pBankName, string pChequeOrVisaNo, Int32 pBankAccountID, string pPaymentNotes, bool pIsGeneralExpense, bool pIsRefused
            , decimal pWithHoldingTax
            , string pWhereClausePayment, Int32 pPageSize, Int32 pPageNumber, string pOrderBy
            //Details
            , Int64 pPaymentDetailsID, decimal pPaymentDetailsAmount, Int32 pPaymentDetailsCurrencyID, decimal pPaymentDetailsExchangeRate, string pPaymentDetailsNotes)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            string pPaymentCode = "";
            CVarAccPayment objCVarAccPayment = new CVarAccPayment();
            CAccPayment objCAccPayment = new CAccPayment();
            CvwAccPayment objCvwAccPayment = new CvwAccPayment();
            CVarAccPaymentDetails objCVarAccPaymentDetails = new CVarAccPaymentDetails();
            CAccPaymentDetails objCAccPaymentDetails = new CAccPaymentDetails();
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            Int32 _RowCount = 0;

            #region PaymentDetails
            pUpdateClause = (pPaymentDetailsAmount == 0 ? " Amount = NULL " : (" Amount = N'" + pPaymentDetailsAmount + "'"));
            pUpdateClause += (pPaymentDetailsCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pPaymentDetailsCurrencyID + "'"));
            pUpdateClause += (pPaymentDetailsExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pPaymentDetailsExchangeRate + "'"));
            pUpdateClause += (pPaymentDetailsNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pPaymentDetailsNotes + "'"));
            pUpdateClause += " ,ModificatorUserID =" + WebSecurity.CurrentUserId.ToString();
            pUpdateClause += " ,ModificationDate = GETDATE()";
            pUpdateClause += " WHERE ID=" + pPaymentDetailsID.ToString();
            checkException = objCAccPaymentDetails.UpdateList(pUpdateClause);
            #endregion PaymentDetails
            #region Header Payment (sure update isa)
            if (checkException == null)
            {
                _result = true;
                //Calculate TotalLocalAmount
                checkException = objCvwAccPaymentDetails.GetList("WHERE IsDeleted=0 AND PaymentID = " + pPaymentID.ToString());
                decimal pTotalLocalAmount = 0;
                for (int i = 0; i < objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails.Count; i++)
                    pTotalLocalAmount += objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[i].Amount * objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[i].ExchangeRate;

                pUpdateClause = (pPRType == 0 ? " PRType = NULL " : (" PRType = N'" + pPRType.ToString() + "'"));
                pUpdateClause += (pPaymentTypeID == 0 ? " ,PaymentTypeID = NULL " : (" ,PaymentTypeID = N'" + pPaymentTypeID.ToString() + "'"));
                pUpdateClause += (pPaymentDate == "01/01/1900" ? " ,PaymentDate = NULL " : (" ,PaymentDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pPaymentDate, 1) + "'"));
                pUpdateClause += (pDueDate == "01/01/1900" ? " ,DueDate = NULL " : (" ,DueDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pDueDate, 1) + "'"));
                pUpdateClause += (pChargeTypeID == 0 ? " ,ChargeTypeID = NULL " : (" ,ChargeTypeID = N'" + pChargeTypeID.ToString() + "'"));
                pUpdateClause += (pTreasuryID == 0 ? " ,TreasuryID = NULL " : (" ,TreasuryID = N'" + pTreasuryID.ToString() + "'"));
                pUpdateClause += (pPartnerTypeID == 0 ? " ,PartnerTypeID = NULL " : (" ,PartnerTypeID = N'" + pPartnerTypeID.ToString() + "'"));
                pUpdateClause += (GetPartnerID(1, pPartnerTypeID, pPartnerID) == 0 ? " ,CustomerID = NULL " : (" ,CustomerID = N'" + GetPartnerID(1, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(2, pPartnerTypeID, pPartnerID) == 0 ? " ,AgentID = NULL " : (" ,AgentID = N'" + GetPartnerID(2, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(3, pPartnerTypeID, pPartnerID) == 0 ? " ,ShippingAgentID = NULL " : (" ,ShippingAgentID = N'" + GetPartnerID(3, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(4, pPartnerTypeID, pPartnerID) == 0 ? " ,CustomsClearanceAgentID = NULL " : (" ,CustomsClearanceAgentID = N'" + GetPartnerID(4, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(5, pPartnerTypeID, pPartnerID) == 0 ? " ,ShippingLineID = NULL " : (" ,ShippingLineID = N'" + GetPartnerID(5, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(6, pPartnerTypeID, pPartnerID) == 0 ? " ,AirlineID = NULL " : (" ,AirlineID = N'" + GetPartnerID(6, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(7, pPartnerTypeID, pPartnerID) == 0 ? " ,TruckerID = NULL " : (" ,TruckerID = N'" + GetPartnerID(7, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(8, pPartnerTypeID, pPartnerID) == 0 ? " ,SupplierID = NULL " : (" ,SupplierID = N'" + GetPartnerID(8, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (GetPartnerID(20, pPartnerTypeID, pPartnerID) == 0 ? " ,CustodyID = NULL " : (" ,CustodyID = N'" + GetPartnerID(20, pPartnerTypeID, pPartnerID).ToString() + "'"));
                pUpdateClause += (pDealerName == "0" ? " ,DealerName = NULL " : (" ,DealerName = N'" + pDealerName + "'"));
                pUpdateClause += (pTotalLocalAmount == 0 ? " ,TotalLocalAmount = NULL " : (" ,TotalLocalAmount = N'" + pTotalLocalAmount + "'"));
                pUpdateClause += (pBankName == "0" ? " ,BankName = NULL " : (" ,BankName = N'" + pBankName + "'"));
                pUpdateClause += (pChequeOrVisaNo == "0" ? " ,ChequeOrVisaNo = NULL " : (" ,ChequeOrVisaNo = N'" + pChequeOrVisaNo + "'"));
                pUpdateClause += (pBankAccountID == 0 ? " ,BankAccountID = NULL " : (" ,BankAccountID = N'" + pBankAccountID.ToString() + "'"));
                pUpdateClause += (pPaymentNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pPaymentNotes + "'"));
                pUpdateClause += (pWithHoldingTax == 0 ? " ,WithHoldingTax = NULL " : (" ,WithHoldingTax = N'" + pWithHoldingTax.ToString() + "'"));
                pUpdateClause += (pIsGeneralExpense ? " ,IsGeneralExpense=1 " : (" ,IsGeneralExpense=0"));
                pUpdateClause += (pIsRefused ? " ,IsRefused=1 " : (" ,IsRefused=0"));
                pUpdateClause += (" ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'");
                pUpdateClause += (" ,ModificationDate = GETDATE() ");
                pUpdateClause += " WHERE ID =" + pPaymentID.ToString();
                checkException = objCAccPayment.UpdateList(pUpdateClause);

                checkException = objCvwAccPayment.GetListPaging(pPageSize, pPageNumber, pWhereClausePayment, pOrderBy, out _RowCount);


            }
            #endregion Header Payment
            return new object[]
            {
                _result //pData[0]
                , _result ? pPaymentID : 0 //pData[1]
                , _result ? pPaymentCode : "" //pData[2]
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails) : null //pData[3]
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccPayment.lstCVarvwAccPayment) : null //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] PaymentDetails_Delete(string pPaymentDetailsIDsDeleted, Int64 pPaymentID)
        {
            bool _result = false;
            string pWhereClause = "";
            Exception checkException = null;
            CAccPaymentDetails objCAccPaymentDetails = new CAccPaymentDetails();
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            CAccPayment objCAccPayment = new CAccPayment();
            CvwAccPayment objCvwAccPayment = new CvwAccPayment();
            decimal pTotalLocalAmount = 0;
            pWhereClause += "IsDeleted=1 WHERE ID IN (" + pPaymentDetailsIDsDeleted + ")";
            checkException = objCAccPaymentDetails.UpdateList(pWhereClause);
            //pWhereClause += "WHERE ID IN (" + pPaymentDetailsIDsDeleted + ")";
            //checkException = objCAccPaymentDetails.DeleteList("WHERE ID IN (" + pPaymentDetailsIDsDeleted + ")");
            if (checkException == null)
            {
                _result = true;
                checkException = objCvwAccPaymentDetails.GetList("WHERE IsDeleted=0 AND PaymentID = " + pPaymentID.ToString());
                for (int i = 0; i < objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails.Count; i++)
                    pTotalLocalAmount += objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[i].Amount * objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[i].ExchangeRate;
                checkException = objCAccPayment.UpdateList("TotalLocalAmount = " + pTotalLocalAmount.ToString()
                    + " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString()
                    + " , ModificationDate = GETDATE() "
                    + " WHERE ID = " + pPaymentID.ToString());
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails) : null
                , pTotalLocalAmount
            };
        }
        #endregion PaymentDetails

        #region Payment Approvals
        [HttpGet, HttpPost]
        public object[] PaymentApproval_Approve(Int64 pPaymentIDsToApprove, Int32 pTransactionType, string pWhereClausePaymentApproval, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            CAccPayment objCAccPayment = new CAccPayment();
            CAccPaymentDetails objCAccPaymentDetails = new CAccPaymentDetails();
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
            CvwAccPayment objCvwAccPayment = new CvwAccPayment();

            int _RowCount = 0;
            string pUpdateClause;


            #region Call ERP JV Entry
            //CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
            //checkException = objCCallCustomizedSP.CallCustomizedSP("ERP_ForwWeb_PaymentDetails", pPaymentIDsToApprove, WebSecurity.CurrentUserId, true);
            #endregion Call ERP JV Entry
            if (checkException == null)
            {
                pUpdateClause = " IsApproved=1, IsRefused=0 ";
                pUpdateClause += " ,ApprovingUserID=" + WebSecurity.CurrentUserId.ToString();
                pUpdateClause += " ,ModificatorUserID=" + WebSecurity.CurrentUserId.ToString();
                pUpdateClause += " ,ModificationDate=GETDATE() ";
                pUpdateClause += " WHERE IsDeleted=0 AND ID = " + pPaymentIDsToApprove.ToString();
                checkException = objCAccPayment.UpdateList(pUpdateClause);

                pUpdateClause = " IsApproved=1 ";
                pUpdateClause += " ,ModificatorUserID=" + WebSecurity.CurrentUserId.ToString();
                pUpdateClause += " ,ModificationDate=GETDATE() ";
                pUpdateClause += " WHERE IsDeleted=0 AND PaymentID = " + pPaymentIDsToApprove.ToString();
                checkException = objCAccPaymentDetails.UpdateList(pUpdateClause);

                if (checkException == null)
                {
                    _result = true;

                    #region Insert  PaymentDetails to the Partner Balance
                    checkException = objCAccPaymentDetails.GetList("WHERE IsDeleted=0 AND PaymentID=" + pPaymentIDsToApprove);
                    checkException = objCAccPayment.GetList("WHERE IsDeleted=0 AND ID=" + pPaymentIDsToApprove);
                    if (objCAccPayment.lstCVarAccPayment[0].PartnerTypeID != 0) //to make sure its not general expense
                    {
                        for (int i = 0; i < objCAccPaymentDetails.lstCVarAccPaymentDetails.Count; i++)
                        {
                            CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                            objCVarAccPartnerBalance.PaymentID = objCAccPaymentDetails.lstCVarAccPaymentDetails[i].PaymentID;
                            objCVarAccPartnerBalance.PaymentDetailsID = objCAccPaymentDetails.lstCVarAccPaymentDetails[i].ID;
                            objCVarAccPartnerBalance.PartnerTypeID = objCAccPayment.lstCVarAccPayment[0].PartnerTypeID;
                            objCVarAccPartnerBalance.CustomerID = objCAccPayment.lstCVarAccPayment[0].CustomerID;
                            objCVarAccPartnerBalance.AgentID = objCAccPayment.lstCVarAccPayment[0].AgentID;
                            objCVarAccPartnerBalance.ShippingAgentID = objCAccPayment.lstCVarAccPayment[0].ShippingAgentID;
                            objCVarAccPartnerBalance.CustomsClearanceAgentID = objCAccPayment.lstCVarAccPayment[0].CustomsClearanceAgentID;
                            objCVarAccPartnerBalance.ShippingLineID = objCAccPayment.lstCVarAccPayment[0].ShippingLineID;
                            objCVarAccPartnerBalance.AirlineID = objCAccPayment.lstCVarAccPayment[0].AirlineID;
                            objCVarAccPartnerBalance.TruckerID = objCAccPayment.lstCVarAccPayment[0].TruckerID;
                            objCVarAccPartnerBalance.SupplierID = objCAccPayment.lstCVarAccPayment[0].SupplierID;
                            objCVarAccPartnerBalance.CustodyID = objCAccPayment.lstCVarAccPayment[0].CustodyID;
                            if (objCAccPayment.lstCVarAccPayment[0].PRType == 10)//AccountReceivable
                                objCVarAccPartnerBalance.CreditAmount = objCAccPaymentDetails.lstCVarAccPaymentDetails[i].Amount;
                            else if (objCAccPayment.lstCVarAccPayment[0].PRType == 20)//AccountPayable
                                objCVarAccPartnerBalance.DebitAmount = objCAccPaymentDetails.lstCVarAccPaymentDetails[i].Amount;
                            objCVarAccPartnerBalance.CurrencyID = objCAccPaymentDetails.lstCVarAccPaymentDetails[i].CurrencyID;
                            //objCVarAccPartnerBalance.ExchangeRate = objCAccPaymentDetails.lstCVarAccPaymentDetails[i].ExchangeRate;
                            objCVarAccPartnerBalance.BalCurLocalExRate = objCAccPaymentDetails.lstCVarAccPaymentDetails[i].ExchangeRate;
                            objCVarAccPartnerBalance.TransactionType = pTransactionType;
                            if (objCAccPayment.lstCVarAccPayment[0].PRType == 10)//AccountReceivable
                                objCVarAccPartnerBalance.Notes = "Payment No. " + objCAccPayment.lstCVarAccPayment[0].PaymentCode;
                            else if (objCAccPayment.lstCVarAccPayment[0].PRType == 20) //AccountPayable
                                objCVarAccPartnerBalance.Notes = "Payment No. " + objCAccPayment.lstCVarAccPayment[0].PaymentCode;
                            objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.mModificationDate = DateTime.Now;
                            objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                        }
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                    }
                    #endregion Insert  PaymentDetails to the Partner Balance

                    checkException = objCvwAccPayment.GetListPaging(pPageSize, pPageNumber, pWhereClausePaymentApproval, pOrderBy, out _RowCount);
                }
            }//JV Entery successful
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccPayment.lstCVarvwAccPayment) : null //pData[1]
                , _result ? "" : checkException.Message
            };
        }

        #endregion Payment Approvals

        #region ARAllocation
        [HttpGet, HttpPost]
        public Object[] ARAllocation_Partners_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, Int32 pPageNumber, Int32 pPageSize, string pWhereClauseAllocation_Partners, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CvwAccPartners objCvwAccPartnersAll = new CvwAccPartners(); //For the select box
            CNoAccessPartnerTypes objCPartnerTypes = new CNoAccessPartnerTypes();
            int _RowCount = 0;
            //checkException = objCvwAccPartnersAll.GetList("ORDER BY PartnerTypeID, Name");
            checkException = objCvwAccPartners.GetListPaging(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);
            checkException = objCPartnerTypes.GetList("ORDER BY Code");
            if (checkException == null)
            {
                _result = true;
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result ? new JavaScriptSerializer().Serialize(objCvwAccPartners.lstCVarvwAccPartners) : null
                , _RowCount
                , pIsLoadArrayOfObjects || _result ? serializer.Serialize(objCvwAccPartnersAll.lstCVarvwAccPartners) : null
                , pIsLoadArrayOfObjects || _result ? serializer.Serialize(objCPartnerTypes.lstCVarNoAccessPartnerTypes) : null
            };
        }

        [HttpGet, HttpPost]
        public Object[] ARAllocation_Partners_PartnerTypeChanged(Int32 pPartnerTypeID, string pWhereClauseAllocation_Partners, string pOrderBy, Int32 pPageNumber, Int32 pPageSize)
        {
            Exception checkException = null;
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CvwAccPartners objCvwAccPartnersAll = new CvwAccPartners(); //For the select box
            int _RowCount = 0;

            if (pPartnerTypeID != 0)
                checkException = objCvwAccPartnersAll.GetListPaging(10000, 1, "WHERE PartnerTypeID=" + pPartnerTypeID, "Name", out _RowCount);
            checkException = objCvwAccPartners.GetListPaging(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);
            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCvwAccPartners.lstCVarvwAccPartners)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwAccPartnersAll.lstCVarvwAccPartners)
            };
        }

        [HttpGet, HttpPost]
        public object[] ARAllocation_FillAllocationData(Int32 pPartnerID, Int32 pPartnerTypeID, Int32 pAllocationType, string pSearchText)
        {
            bool _result = false;
            Exception checkException = null;
            string pWhereClause = "";
            int _RowCount = 0;

            int constTransactionOpenCreditBalance = 2; //OpenCreditBalance
            int constTransactionOpenDebitBalance = 5; //OpenDebitBalance
            int constTransactionARPayment = 10; //Credit
            int constTransactionAPPayment = 20;
            int constTransactionInvoiceApproval = 30; //Debit
            int constTransactionReceivableAllocation = 40; //Invoice
            int constTransactionCreditTransfer = 50; //CreditTransfer
            int constTransactionDebitTransfer = 60; //DebitTransfer
            int constTransactionPayableApproval = 70; //Op.Payable (Credit For Supplier)
            int constTransactionPayableAllocatedFromCustody = 85; //Credit
            int constTransactionPayableAllocation = 80; //Payable
            int constTransactionDebitNote = 90; //DebitNote (i.e. Receivables) inv
            int constTransactionCreditNote = 100; //CreditNote (i.e. Payables)

            int constCustodyPartnerTypeID = 20;

            //CvwAccUnAllocatedPartnerBalance objCvwAccUnAllocatedPartnerBalance = new CvwAccUnAllocatedPartnerBalance();
            CvwAccPartnerBalance objCvwAvailableAmounts = new CvwAccPartnerBalance();

            CvwInvoices objCvwInvoices = new CvwInvoices();
            CvwPayables objCvwPayables = new CvwPayables();

            pWhereClause = "WHERE PartnerID = " + pPartnerID.ToString();
            pWhereClause += " AND PartnerTypeID = " + pPartnerTypeID.ToString();
            //checkException = objCvwAccUnAllocatedPartnerBalance.GetList(pWhereClause);
            #region Get Availabe Amounts that can be allocated
            checkException = objCvwAvailableAmounts.GetListPaging(9999999, 1, pWhereClause, "ID", out _RowCount);
            var pAvailableAmounts = objCvwAvailableAmounts.lstCVarvwAccPartnerBalance //constTransactionAPPayment=20
                .GroupBy(g => g.CurrencyID)
                .Select(g => new
                {
                    AvailableBalance = g.Sum(s => (s.TransactionType == constTransactionAPPayment || s.TransactionType == constTransactionPayableAllocation
                                                   || s.TransactionType == constTransactionOpenCreditBalance
                                                   || s.TransactionType == constTransactionOpenDebitBalance
                                                   || s.TransactionType == constTransactionCreditTransfer || s.TransactionType == constTransactionDebitTransfer
                                                   || s.TransactionType == constTransactionARPayment || s.TransactionType == constTransactionReceivableAllocation
                                                   || s.TransactionType == constTransactionDebitNote
                                                   || s.TransactionType == constTransactionCreditNote
                                                   ? s.CreditAmount - s.DebitAmount
                                                   : 0))
                    ,
                    CurrencyID = g.First().CurrencyID
                    ,
                    CurrencyCode = g.First().CurrencyCode
                }).OrderBy(o => o.CurrencyCode);

            string ptxtAvailableBalance = "0";
            if (pAvailableAmounts.Count() > 0)
                if (pAvailableAmounts.ElementAt(0).AvailableBalance != 0)
                    ptxtAvailableBalance = (pAllocationType == constTransactionReceivableAllocation ? decimal.Round(pAvailableAmounts.ElementAt(0).AvailableBalance, 3).ToString() : (-1 * (decimal.Round(pAvailableAmounts.ElementAt(0).AvailableBalance, 3))).ToString()
                        + " " + pAvailableAmounts.ElementAt(0).CurrencyCode);
            for (int i = 1; i < pAvailableAmounts.Count(); i++)
            {
                if (pAvailableAmounts.ElementAt(i).AvailableBalance != 0)
                    ptxtAvailableBalance += " , " + (pAllocationType == constTransactionReceivableAllocation ? decimal.Round(pAvailableAmounts.ElementAt(i).AvailableBalance, 3).ToString() : (-1 * (decimal.Round(pAvailableAmounts.ElementAt(i).AvailableBalance, 3))).ToString()
                        + " " + pAvailableAmounts.ElementAt(i).CurrencyCode);
            }

            #endregion Get Availabe Amounts that can be allocated
            if (pAllocationType == constTransactionReceivableAllocation)
            {
                #region Invoices
                pWhereClause = "WHERE RemainingAmount * ExchangeRate > 5 AND IsDeleted = 0 AND IsApproved = 1 ";
                pWhereClause += " AND PartnerID = " + pPartnerID.ToString();
                pWhereClause += " AND PartnerTypeID = " + pPartnerTypeID.ToString();
                pWhereClause += " AND InvoiceStatus IN (N'UnPaid' , N'Partially Paid') ";
                if (pSearchText != null)
                {
                    pWhereClause += " AND (";
                    pWhereClause += "       OperationCode like N'%" + pSearchText + "%'";
                    pWhereClause += "    OR ConcatenatedInvoiceNumber like N'%" + pSearchText + "%'";
                    //pWhereClause += "    OR PartnerName like N'%" + pSearchText + "%'"; //i am already allocating for 1 partner
                    pWhereClause += "     )";
                }
                checkException = objCvwInvoices.GetListPaging(999999, 1, pWhereClause, "CreationDate DESC", out _RowCount);
                #endregion Invoices
            }
            else if (pAllocationType == constTransactionPayableAllocation)
            {
                #region Payables
                pWhereClause = "WHERE RemainingAmount * ExchangeRate > 5 AND IsDeleted = 0 AND IsApproved = 1 ";
                if (pPartnerTypeID == constCustodyPartnerTypeID) //if Custody for Payables , i can allocate for other suppliers
                    pWhereClause += " AND PartnerSupplierID IS NOT NULL ";
                else
                {
                    pWhereClause += " AND PartnerSupplierID = " + pPartnerID.ToString();
                    pWhereClause += " AND SupplierPartnerTypeID = " + pPartnerTypeID.ToString();
                }
                pWhereClause += " AND PayableStatus IN (N'UnPaid' , N'Partially Paid') ";
                if (pSearchText != null)
                {
                    pWhereClause += " AND (";
                    pWhereClause += "       OperationCode like N'%" + pSearchText + "%'";
                    pWhereClause += "    OR SupplierInvoiceNo like N'%" + pSearchText + "%'";
                    pWhereClause += "    OR ChargeTypeCode like N'%" + pSearchText + "%'";
                    pWhereClause += "    OR PartnerSupplierName like N'%" + pSearchText + "%'";
                    pWhereClause += "     )";
                }
                checkException = objCvwPayables.GetListPaging(1000, 1, pWhereClause, "CreationDate DESC", out _RowCount);
                #endregion Payables
            }
            if (checkException == null)
            {
                _result = true;
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , pAllocationType == constTransactionReceivableAllocation ?serializer.Serialize(objCvwInvoices.lstCVarvwInvoices) : null //pData[1]
                //, _result ? new JavaScriptSerializer().Serialize(objCvwAccUnAllocatedPartnerBalance.lstCVarvwAccUnAllocatedPartnerBalance) : null //pData[2]
                , _result ? serializer.Serialize(pAvailableAmounts) : null //pData[2]
                , pAllocationType == constTransactionPayableAllocation ? serializer.Serialize(objCvwPayables.lstCVarvwPayables) : null //pData[3]
                , ptxtAvailableBalance //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] ARAllocation_Save(Int32 pPartnerID, Int32 pPartnerTypeID, string pPartnerName, Int32 pBranchID, string pAllocationItemsIDs, string pInvoiceNumbers, string pPartnerIDList, string pPartnerTypeIDList, string pCharge, string pOperationCode
            , string pAmounts, string pItemCurrencyIDs, string pBalanceCurrencyIDs, string pItemCurrencyCodes
            , string pBalanceCurrencyCodes, string pExchangeRates, string pBalCurLocalExRates, string pInvCurLocalExRates, Int32 pTransactionType)
        {
            bool _result = false;
            string pUpdateList = "";
            Exception checkException = null;
            int constTransactionReceivableAllocation = 40; //InvoiceAllocation
            int constTransactionPayableAllocation = 80; //Op.Payable (Allocation)
            int constTransactionPayableAllocatedFromCustody = 85;
            int constTransactionCreditTransfer = 50;
            int constTransactionDebitTransfer = 60;
            CVarAccInvoicePaymentDetails objCVarAccInvoicePaymentDetails = new CVarAccInvoicePaymentDetails();
            CAccInvoicePaymentDetails objCAccInvoicePaymentDetails = new CAccInvoicePaymentDetails();
            CInvoices objCInvoices = new CInvoices();
            CPayables objCPayables = new CPayables();
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
            Int32 NumberOfInvoicesAllocated = pAllocationItemsIDs.Split(',').Count();
            var ArrAllocationItemsIDs = pAllocationItemsIDs.Split(',');
            var ArrInvoiceNumbers = pInvoiceNumbers.Split(',');
            var ArrPartnerID = pPartnerIDList.Split(',');
            var ArrPartnerTypeID = pPartnerTypeIDList.Split(',');
            var ArrCharge = pCharge.Split(',');
            var ArrOperationCode = pOperationCode.Split(',');
            var ArrAmounts = pAmounts.Split(',');
            var ArrItemCurrencyIDs = pItemCurrencyIDs.Split(',');
            var ArrBalanceCurrencyIDs = pBalanceCurrencyIDs.Split(',');
            var ArrItemCurrencyCodes = pItemCurrencyCodes.Split(',');
            var ArrBalanceCurrencyCodes = pBalanceCurrencyCodes.Split(',');
            var ArrExchangeRates = pExchangeRates.Split(',');
            var ArrBalCurLocalExRates = pBalCurLocalExRates.Split(',');
            var ArrInvCurLocalExRates = pInvCurLocalExRates.Split(',');
            for (int i = 0; i < NumberOfInvoicesAllocated; i++)
            {
                #region Add InvoicePaymentDetails if its Receivable
                if (pTransactionType == constTransactionReceivableAllocation)
                {
                    if (objCAccInvoicePaymentDetails.lstCVarAccInvoicePaymentDetails.Count > 0)
                    {
                        objCAccInvoicePaymentDetails.lstCVarAccInvoicePaymentDetails.RemoveAt(0);
                        objCVarAccInvoicePaymentDetails.ID = 0;
                    }
                    objCVarAccInvoicePaymentDetails.InvoicePaymentNumber = "0";
                    objCVarAccInvoicePaymentDetails.BranchID = pBranchID;
                    objCVarAccInvoicePaymentDetails.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                    objCVarAccInvoicePaymentDetails.Amount = decimal.Parse(ArrAmounts[i]);
                    objCVarAccInvoicePaymentDetails.CurrencyID = int.Parse(ArrItemCurrencyIDs[i]); //int.Parse(ArrBalanceCurrencyIDs[i]);
                    //objCVarAccInvoicePaymentDetails.ExchangeRate = decimal.Parse(ArrExchangeRates[i]); //may be not used
                    //objCVarAccInvoicePaymentDetails.ExchangeRate = decimal.Parse(ArrInvCurLocalExRates[i]); //may be not used
                    objCVarAccInvoicePaymentDetails.ExchangeRate = 1; //may be not used
                    objCVarAccInvoicePaymentDetails.Notes = "0";
                    objCVarAccInvoicePaymentDetails.CreatorUserID = objCVarAccInvoicePaymentDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarAccInvoicePaymentDetails.CreationDate = objCVarAccInvoicePaymentDetails.ModificationDate = DateTime.Now;
                    objCAccInvoicePaymentDetails.lstCVarAccInvoicePaymentDetails.Add(objCVarAccInvoicePaymentDetails);
                    checkException = objCAccInvoicePaymentDetails.SaveMethod(objCAccInvoicePaymentDetails.lstCVarAccInvoicePaymentDetails);
                }
                #endregion Add InvoicePaymentDetails if its Receivable
                //Add Credit-Debit transactions to partner balance According to currency
                #region allocating balance currency and allocation item currency are the same so insert just debit(for receivable)/credit(for payable) row
                if (ArrItemCurrencyIDs[i] == ArrBalanceCurrencyIDs[i]
                    //&& (
                    //       Int16.Parse(ArrPartnerID[i]) != pPartnerID
                    //    || Int16.Parse(ArrPartnerTypeID[i]) != pPartnerTypeID
                    //    )
                    )
                {
                    CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                    if (pTransactionType == constTransactionReceivableAllocation)
                    {
                        objCVarAccPartnerBalance.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                        objCVarAccPartnerBalance.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                        objCVarAccPartnerBalance.DebitAmount = decimal.Parse(ArrAmounts[i]);
                        objCVarAccPartnerBalance.Notes = "Allocating " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Inv " + ArrInvoiceNumbers[i] + ".";
                    }
                    else if (pTransactionType == constTransactionPayableAllocation)
                    {
                        objCVarAccPartnerBalance.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                        objCVarAccPartnerBalance.CreditAmount = decimal.Parse(ArrAmounts[i]);
                        objCVarAccPartnerBalance.Notes = "Payable Allocation(" + ArrCharge[i] + ") - (Op: " + ArrOperationCode[i] + "): Allocating " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + ".";
                    }
                    objCVarAccPartnerBalance.PartnerTypeID = pPartnerTypeID;
                    objCVarAccPartnerBalance.CustomerID = GetPartnerID(1, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.AgentID = GetPartnerID(2, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.ShippingAgentID = GetPartnerID(3, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerID(4, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.ShippingLineID = GetPartnerID(5, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.AirlineID = GetPartnerID(6, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.TruckerID = GetPartnerID(7, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.SupplierID = GetPartnerID(8, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.CustodyID = GetPartnerID(20, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.CurrencyID = int.Parse(ArrBalanceCurrencyIDs[i]);
                    objCVarAccPartnerBalance.ExchangeRate = 1;// decimal.Parse(ArrExchangeRates[i]); ///////////////////////////////////
                    //objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalance.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalance.TransactionType = pTransactionType;
                    objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;
                    objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                    checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                }
                #endregion allocating when balance currency and invoice currency are the same so insert just debit row
                #region allocating when balance currency and invoice currency are diff so insert debit and credit row for conversion
                else if (ArrItemCurrencyIDs[i] != ArrBalanceCurrencyIDs[i]) //different currencies (insert Debit & Credit Rows for Converting Currency then a row for allocation)
                {
                    //conversion debit row
                    CVarAccPartnerBalance objCVarAccPartnerBalanceDebit = new CVarAccPartnerBalance();
                    if (pTransactionType == constTransactionReceivableAllocation)
                    {
                        objCVarAccPartnerBalanceDebit.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                        objCVarAccPartnerBalanceDebit.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                        objCVarAccPartnerBalanceDebit.DebitAmount = decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i]);
                        objCVarAccPartnerBalanceDebit.TransactionType = constTransactionDebitTransfer; //its conversion but i want this row to appear
                        objCVarAccPartnerBalanceDebit.Notes = "Transferring " + decimal.Round((decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i])), 3).ToString() + " " + ArrBalanceCurrencyCodes[i] + " to " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for inv " + ArrInvoiceNumbers[i] + ".";
                    }
                    else if (pTransactionType == constTransactionPayableAllocation)
                    {
                        objCVarAccPartnerBalanceDebit.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                        objCVarAccPartnerBalanceDebit.CreditAmount = decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i]);
                        objCVarAccPartnerBalanceDebit.TransactionType = constTransactionCreditTransfer; //its conversion but i want this row to appear
                        objCVarAccPartnerBalanceDebit.Notes = "Transferring " + decimal.Round((decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i])), 3).ToString() + " " + ArrBalanceCurrencyCodes[i] + " to " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + " - Op Code(" + ArrOperationCode[i] + ")" + " - Payable(" + ArrCharge[i] + ")" + ".";
                    }
                    objCVarAccPartnerBalanceDebit.PartnerTypeID = pPartnerTypeID;
                    objCVarAccPartnerBalanceDebit.CustomerID = GetPartnerID(1, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceDebit.AgentID = GetPartnerID(2, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceDebit.ShippingAgentID = GetPartnerID(3, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceDebit.CustomsClearanceAgentID = GetPartnerID(4, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceDebit.ShippingLineID = GetPartnerID(5, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceDebit.AirlineID = GetPartnerID(6, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceDebit.TruckerID = GetPartnerID(7, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceDebit.SupplierID = GetPartnerID(8, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceDebit.CustodyID = GetPartnerID(20, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceDebit.CurrencyID = int.Parse(ArrBalanceCurrencyIDs[i]);
                    objCVarAccPartnerBalanceDebit.ExchangeRate = decimal.Parse(ArrExchangeRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalanceDebit.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalanceDebit.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalanceDebit.CreatorUserID = objCVarAccPartnerBalanceDebit.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarAccPartnerBalanceDebit.CreationDate = objCVarAccPartnerBalanceDebit.ModificationDate = DateTime.Now;
                    objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalanceDebit);
                    checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                    objCAccPartnerBalance.lstCVarAccPartnerBalance.Remove(objCVarAccPartnerBalanceDebit);

                    CVarAccPartnerBalance objCVarAccPartnerBalanceCredit = new CVarAccPartnerBalance();
                    if (pTransactionType == constTransactionReceivableAllocation)
                    {
                        objCVarAccPartnerBalanceCredit.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                        objCVarAccPartnerBalanceCredit.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                        objCVarAccPartnerBalanceCredit.TransactionType = constTransactionCreditTransfer;
                        objCVarAccPartnerBalanceCredit.DebitAmount = decimal.Parse(ArrAmounts[i]);
                        objCVarAccPartnerBalanceCredit.Notes = "Receiving " + decimal.Round((decimal.Parse(ArrAmounts[i])), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " from the " + ArrBalanceCurrencyCodes[i] + " balance for inv " + ArrInvoiceNumbers[i] + ".";
                    }
                    else if (pTransactionType == constTransactionPayableAllocation) //its opposite for Receivable
                    {
                        objCVarAccPartnerBalanceCredit.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                        objCVarAccPartnerBalanceCredit.TransactionType = constTransactionDebitTransfer;
                        objCVarAccPartnerBalanceCredit.CreditAmount = decimal.Parse(ArrAmounts[i]);
                        objCVarAccPartnerBalanceCredit.Notes = "Receiving " + decimal.Round((decimal.Parse(ArrAmounts[i])), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " from the " + ArrBalanceCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + " - Op Code(" + ArrOperationCode[i] + ")" + " - Payable(" + ArrCharge[i] + ")" + ".";
                    }
                    objCVarAccPartnerBalanceCredit.PartnerTypeID = pPartnerTypeID;
                    objCVarAccPartnerBalanceCredit.CustomerID = GetPartnerID(1, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceCredit.AgentID = GetPartnerID(2, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceCredit.ShippingAgentID = GetPartnerID(3, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceCredit.CustomsClearanceAgentID = GetPartnerID(4, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceCredit.ShippingLineID = GetPartnerID(5, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceCredit.AirlineID = GetPartnerID(6, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceCredit.TruckerID = GetPartnerID(7, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceCredit.SupplierID = GetPartnerID(8, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceCredit.CustodyID = GetPartnerID(20, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalanceCredit.CurrencyID = int.Parse(ArrItemCurrencyIDs[i]);
                    objCVarAccPartnerBalanceCredit.ExchangeRate = 0; ///////////////////////////////////
                    //objCVarAccPartnerBalanceCredit.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalanceCredit.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////here is the currency of the invoice////////////////////////////
                    objCVarAccPartnerBalanceCredit.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalanceCredit.CreatorUserID = objCVarAccPartnerBalanceCredit.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarAccPartnerBalanceCredit.CreationDate = objCVarAccPartnerBalanceCredit.ModificationDate = DateTime.Now;
                    objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalanceCredit);
                    checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                    //Allocation row
                    objCAccPartnerBalance.lstCVarAccPartnerBalance.Remove(objCVarAccPartnerBalanceCredit);
                    CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                    if (pTransactionType == constTransactionReceivableAllocation)
                    {
                        objCVarAccPartnerBalance.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                        objCVarAccPartnerBalance.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                        objCVarAccPartnerBalance.Notes = "Allocating transferred " + ArrAmounts[i] + " " + ArrItemCurrencyCodes[i] + " from " + ArrBalanceCurrencyCodes[i] + " balance for inv " + ArrInvoiceNumbers[i] + ".";
                        objCVarAccPartnerBalance.CreditAmount = decimal.Parse(ArrAmounts[i]);
                    }
                    else if (pTransactionType == constTransactionPayableAllocation) //its opposite for Receivable
                    {
                        objCVarAccPartnerBalance.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                        objCVarAccPartnerBalance.Notes = "Allocating transferred " + ArrAmounts[i] + " " + ArrItemCurrencyCodes[i] + " from " + ArrBalanceCurrencyCodes[i] + " balance for Supplier Invoice " + ArrInvoiceNumbers[i] + " - Op Code(" + ArrOperationCode[i] + ")" + " - Payable(" + ArrCharge[i] + ")" + ".";
                        objCVarAccPartnerBalance.DebitAmount = decimal.Parse(ArrAmounts[i]);
                    }
                    objCVarAccPartnerBalance.PartnerTypeID = pPartnerTypeID;
                    objCVarAccPartnerBalance.CustomerID = GetPartnerID(1, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.AgentID = GetPartnerID(2, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.ShippingAgentID = GetPartnerID(3, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerID(4, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.ShippingLineID = GetPartnerID(5, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.AirlineID = GetPartnerID(6, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.TruckerID = GetPartnerID(7, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.SupplierID = GetPartnerID(8, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.CustodyID = GetPartnerID(20, pPartnerTypeID, pPartnerID);
                    objCVarAccPartnerBalance.CurrencyID = int.Parse(ArrItemCurrencyIDs[i]);
                    objCVarAccPartnerBalance.ExchangeRate = 0; // decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                    //objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////here is the currency of the invoice////////////////////////////
                    objCVarAccPartnerBalance.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalance.TransactionType = pTransactionType;
                    objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;
                    objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                    checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                }
                #endregion allocating when balance currency and invoice currency are diff so insert debit and credit row for conversion
                #region just in case of Custody settlement for another supplier
                if (pTransactionType == constTransactionPayableAllocation
                    && (Int16.Parse(ArrPartnerTypeID[i]) != pPartnerTypeID
                        || Int16.Parse(ArrPartnerID[i]) != pPartnerID
                       )
                    ) //settle for supplier too (currency is considered to be the same in all cases because the money transfer is already done from the balance amount)
                {
                    CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                    objCVarAccPartnerBalance.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                    objCVarAccPartnerBalance.PartnerTypeID = Int16.Parse(ArrPartnerTypeID[i]);
                    objCVarAccPartnerBalance.CustomerID = GetPartnerID(1, Int16.Parse(ArrPartnerTypeID[i]), Int16.Parse(ArrPartnerID[i]));
                    objCVarAccPartnerBalance.AgentID = GetPartnerID(2, Int16.Parse(ArrPartnerTypeID[i]), Int16.Parse(ArrPartnerID[i]));
                    objCVarAccPartnerBalance.ShippingAgentID = GetPartnerID(3, Int16.Parse(ArrPartnerTypeID[i]), Int16.Parse(ArrPartnerID[i]));
                    objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerID(4, Int16.Parse(ArrPartnerTypeID[i]), Int16.Parse(ArrPartnerID[i]));
                    objCVarAccPartnerBalance.ShippingLineID = GetPartnerID(5, Int16.Parse(ArrPartnerTypeID[i]), Int16.Parse(ArrPartnerID[i]));
                    objCVarAccPartnerBalance.AirlineID = GetPartnerID(6, Int16.Parse(ArrPartnerTypeID[i]), Int16.Parse(ArrPartnerID[i]));
                    objCVarAccPartnerBalance.TruckerID = GetPartnerID(7, Int16.Parse(ArrPartnerTypeID[i]), Int16.Parse(ArrPartnerID[i]));
                    objCVarAccPartnerBalance.SupplierID = GetPartnerID(8, Int16.Parse(ArrPartnerTypeID[i]), Int16.Parse(ArrPartnerID[i]));
                    objCVarAccPartnerBalance.CustodyID = GetPartnerID(20, Int16.Parse(ArrPartnerTypeID[i]), Int16.Parse(ArrPartnerID[i]));
                    objCVarAccPartnerBalance.DebitAmount = decimal.Parse(ArrAmounts[i]);

                    objCVarAccPartnerBalance.CurrencyID = int.Parse(ArrItemCurrencyIDs[i]);
                    objCVarAccPartnerBalance.ExchangeRate = 1;// decimal.Parse(ArrExchangeRates[i]); ///////////////////////////////////
                    //objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalance.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                    objCVarAccPartnerBalance.TransactionType = constTransactionPayableAllocatedFromCustody;
                    objCVarAccPartnerBalance.Notes = "Payable Allocation(" + ArrCharge[i] + ") - (Op: " + ArrOperationCode[i] + ") BY Custody(" + pPartnerName + "): Allocating " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + ".";

                    objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;
                    objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                    checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                }
                #endregion just in case of Custody settlement for another supplier
                #region Update Paid & Remaining Amount
                if (checkException == null)
                {
                    _result = true;
                    //Save Amount Paid & Remaining Amounts
                    if (pTransactionType == constTransactionReceivableAllocation)
                    {
                        pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) + " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                        pUpdateList += " , RemainingAmount = (ISNULL(RemainingAmount,0) - " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                        pUpdateList += " WHERE ID = " + Int64.Parse(ArrAllocationItemsIDs[i]);
                        checkException = objCInvoices.UpdateList(pUpdateList);
                    }
                    else if (pTransactionType == constTransactionPayableAllocation)
                    {
                        pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) + " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                        //pUpdateList += " , RemainingAmount = (ISNULL(CostAmount,0) - " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                        pUpdateList += " WHERE ID = " + Int64.Parse(ArrAllocationItemsIDs[i]);
                        checkException = objCPayables.UpdateList(pUpdateList);
                    }
                }
                #endregion Update Paid & Remaining Amount
            } //EOF for (int i = 0; i < NumberOfInvoicesAllocated; i++)

            return new object[] {
                _result
            };
        }
        #endregion ARAllocation

        #region PartnerOpenBalance
        [HttpGet, HttpPost]
        public object[] PartnerOpenBalance_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(
            bool pIsLoadArrayOfObjectsForPartnerOpenBalance, int pPageNumber, int pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            CvwAccPartnerBalance objCvwAccPartnerBalance = new CvwAccPartnerBalance();
            if (pIsLoadArrayOfObjectsForPartnerOpenBalance)
            {
                objCvwAccPartners.GetListFilter(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");
                objCNoAccessPartnerTypes.GetList("ORDER BY Code");
            }
            objCvwAccPartnerBalance.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwAccPartnerBalance.lstCVarvwAccPartnerBalance)
                , _RowCount
                , serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners) //pData[2]
                , serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes) //pData[3]
            };
        }
        [HttpGet, HttpPost]
        public object[] FillPartnerOpenBalanceModal(Int64 pAccPartnerBalanceID, Int32 pPartnerTypeID, Int32 pPartnerID, Int32 pCurrencyID)
        {
            int _RowCount = 0;
            Int16 constTransactionOpenCreditBalance = 2; //OpenCreditBalance
            Int16 constTransactionOpenDebitBalance = 5; //OpenDebitBalance
            string pWhereClause = "";
            CvwAccPartnerBalance objCvwAccPartnerBalance = new CvwAccPartnerBalance();
            if (pAccPartnerBalanceID == 0)
                pWhereClause = "WHERE TransactionType IN (" + constTransactionOpenCreditBalance + "," + constTransactionOpenDebitBalance + ") AND PartnerTypeID=" + pPartnerTypeID + " AND PartnerID=" + pPartnerID + " AND CurrencyID=" + pCurrencyID;
            else
                pWhereClause = "WHERE ID=" + pAccPartnerBalanceID;
            objCvwAccPartnerBalance.GetListPaging(10, 1, pWhereClause, "ID", out _RowCount);
            return new object[]
                {
                    _RowCount > 0 ? new JavaScriptSerializer().Serialize(objCvwAccPartnerBalance.lstCVarvwAccPartnerBalance[0]) : null
                };
        }
        [HttpGet, HttpPost]
        public object[] PartnerOpenBalance_Save(Int64 pAccPartnerBalanceID, Int32 pPartnerTypeID, Int32 pPartnerID, Int32 pCurrencyID, decimal pAmount, decimal pExchangeRate, string pNotes)
        {
            Int32 _RowCount = 0;
            Int16 constTransactionOpenCreditBalance = 2; //OpenCreditBalance
            Int16 constTransactionOpenDebitBalance = 5; //OpenDebitBalance
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
            CAccPayment objCAccPayment = new CAccPayment();
            string pWhereClause = "";
            string pUpdateClause = "";
            if (pAccPartnerBalanceID == 0) //maybe row exists but i still don't know coz called from new btn so i use thi condition to check
                pWhereClause = "WHERE TransactionType IN (" + constTransactionOpenCreditBalance + "," + constTransactionOpenDebitBalance + ") AND PartnerTypeID=" + pPartnerTypeID + " AND PartnerID=" + pPartnerID + " AND CurrencyID=" + pCurrencyID;
            else
                pWhereClause = "WHERE ID=" + pAccPartnerBalanceID;
            objCAccPartnerBalance.GetListPaging(10, 1, pWhereClause, "ID", out _RowCount);
            #region insert new Open Balance for that currency
            if (_RowCount == 0) //this means insert
            {
                CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                objCVarAccPartnerBalance.PartnerTypeID = pPartnerTypeID;
                objCVarAccPartnerBalance.PaymentDetailsID = 0;
                objCVarAccPartnerBalance.CustomerID = GetPartnerID(1, pPartnerTypeID, pPartnerID);
                objCVarAccPartnerBalance.AgentID = GetPartnerID(2, pPartnerTypeID, pPartnerID);
                objCVarAccPartnerBalance.ShippingAgentID = GetPartnerID(3, pPartnerTypeID, pPartnerID);
                objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerID(4, pPartnerTypeID, pPartnerID);
                objCVarAccPartnerBalance.ShippingLineID = GetPartnerID(5, pPartnerTypeID, pPartnerID);
                objCVarAccPartnerBalance.AirlineID = GetPartnerID(6, pPartnerTypeID, pPartnerID);
                objCVarAccPartnerBalance.TruckerID = GetPartnerID(7, pPartnerTypeID, pPartnerID);
                objCVarAccPartnerBalance.SupplierID = GetPartnerID(8, pPartnerTypeID, pPartnerID);
                objCVarAccPartnerBalance.CustodyID = GetPartnerID(20, pPartnerTypeID, pPartnerID);
                if (pAmount >= 0)
                    objCVarAccPartnerBalance.CreditAmount = pAmount;
                else
                    objCVarAccPartnerBalance.DebitAmount = pAmount;
                objCVarAccPartnerBalance.CurrencyID = pCurrencyID;
                objCVarAccPartnerBalance.ExchangeRate = pExchangeRate;
                objCVarAccPartnerBalance.TransactionType = pAmount >= 0 ? constTransactionOpenCreditBalance : constTransactionOpenDebitBalance;
                objCVarAccPartnerBalance.IsDeleted = false;
                objCVarAccPartnerBalance.Notes = pNotes;
                objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAccPartnerBalance.CreationDate = DateTime.Parse("01-01-2015");
                objCVarAccPartnerBalance.ModificationDate = DateTime.Now;

                objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
            }
            #endregion insert new Open Balance for that currency

            #region update existing Open Balance for that currency & PRType in PaymentHeader for case of amount sign changed
            else //this means update so just update AccPartnerBalance
            {
                pAccPartnerBalanceID = objCAccPartnerBalance.lstCVarAccPartnerBalance[0].ID;
                if (pAmount >= 0)
                {
                    pUpdateClause = (pAmount == 0 ? " CreditAmount = NULL " : (" CreditAmount = N'" + pAmount + "'"));
                    pUpdateClause += " ,TransactionType = " + constTransactionOpenCreditBalance;
                    pUpdateClause += " ,DebitAmount = NULL";
                }
                else
                {
                    pUpdateClause = (pAmount == 0 ? " DebitAmount = NULL " : (" DebitAmount = N'" + (-1 * pAmount) + "'"));
                    pUpdateClause += " ,TransactionType = " + constTransactionOpenDebitBalance;
                    pUpdateClause += " ,CreditAmount = NULL";
                }
                pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID + "'"));
                pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate + "'"));
                pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes + "'"));
                pUpdateClause += " ,ModificatorUserID =" + WebSecurity.CurrentUserId.ToString();
                pUpdateClause += " ,ModificationDate = GETDATE()";
                pUpdateClause += " WHERE ID = " + pAccPartnerBalanceID;
                objCAccPartnerBalance.UpdateList(pUpdateClause);
            }
            #endregion update existing Open Balance for that currency
            return new object[] {
            };
        }
        [HttpGet, HttpPost]
        public object[] PartnerOpenBalance_DeleteList(string pPartnerOpenBalanceIDsDeleted)
        {
            bool _result = false;
            Exception checkException = null;
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();

            objCAccPartnerBalance.GetList("WHERE ID IN(" + pPartnerOpenBalanceIDsDeleted + ")");
            checkException = objCAccPartnerBalance.DeleteList("WHERE ID IN (" + pPartnerOpenBalanceIDsDeleted + ")");
            if (checkException == null)
                _result = true;
            return new object[] {
                _result
            };
        }
        [HttpGet, HttpPost]
        public Object[] PartnerOpenBalance_PartnerTypeChanged(Int32 pPartnerTypeIDForPartnerOpenBalance, string pWhereClause, string pOrderBy, Int32 pPageNumber, Int32 pPageSize)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CvwAccPartnerBalance objCvwAccPartnerBalance = new CvwAccPartnerBalance();

            if (pPartnerTypeIDForPartnerOpenBalance != 0)
                checkException = objCvwAccPartners.GetListPaging(10000, 1, "WHERE PartnerTypeID=" + pPartnerTypeIDForPartnerOpenBalance, "Name", out _RowCount);
            checkException = objCvwAccPartnerBalance.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCvwAccPartnerBalance.lstCVarvwAccPartnerBalance)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwAccPartners.lstCVarvwAccPartners)
            };
        }
        #endregion PartnerOpenBalance

        #region BankOpenBalance
        [HttpGet, HttpPost]
        public object[] BankOpenBalance_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(
            bool pIsLoadArrayOfObjectsForBankOpenBalance, int pPageNumber, int pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwBankAccount objCvwBankAccount = new CvwBankAccount();
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            if (pIsLoadArrayOfObjectsForBankOpenBalance)
                objCvwBankAccount.GetList("ORDER BY AccountName");
            objCvwAccPaymentDetails.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails)
                , _RowCount
                , serializer.Serialize(objCvwBankAccount.lstCVarvwBankAccount) //pData[2]
            };
        }
        [HttpGet, HttpPost]
        public object[] FillBankOpenBalanceModal(Int64 pPaymentDetailsID, Int32 pBankAccountID, Int32 pCurrencyID)
        {
            int _RowCount = 0;
            string pWhereClause = "";
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            if (pPaymentDetailsID == 0)
                pWhereClause = "WHERE PaymentTypeID IS NULL AND BankAccountID=" + pBankAccountID + " AND CurrencyID=" + pCurrencyID;
            else
                pWhereClause = "WHERE ID=" + pPaymentDetailsID;
            objCvwAccPaymentDetails.GetListPaging(10, 1, pWhereClause, "ID", out _RowCount);
            return new object[]
                {
                    _RowCount > 0 ? new JavaScriptSerializer().Serialize(objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[0]) : null
                };
        }
        [HttpGet, HttpPost]
        public object[] BankOpenBalance_Save(Int64 pPaymentDetailsID, Int32 pBankAccountID, Int32 pCurrencyID, decimal pAmount, decimal pExchangeRate, string pNotes)
        {
            Int32 _RowCount = 0;
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            CAccPaymentDetails objCAccPaymentDetails = new CAccPaymentDetails();
            CAccPayment objCAccPayment = new CAccPayment();
            Int64 pPaymentHeaderID = 0;
            string pWhereClause = "";
            string pUpdateClause = "";
            int constPRTypeReceivable = 10;
            int constPRTypePayable = 20;
            if (pPaymentDetailsID == 0) //maybe row exists but i still don't know coz called from new btn so i use thi condition to check
                pWhereClause = "WHERE PaymentTypeID IS NULL AND BankAccountID=" + pBankAccountID + " AND CurrencyID=" + pCurrencyID;
            else
                pWhereClause = "WHERE ID=" + pPaymentDetailsID;
            objCvwAccPaymentDetails.GetListPaging(10, 1, pWhereClause, "ID", out _RowCount);
            #region insert new Open Balance for that currency
            if (_RowCount == 0) //this means insert
            {
                #region insert payment header
                CVarAccPayment objCVarAccPayment = new CVarAccPayment();
                objCVarAccPayment.PaymentCode = "0";
                objCVarAccPayment.PRType = pAmount > 0 ? constPRTypeReceivable : constPRTypePayable;
                objCVarAccPayment.PaymentDate = DateTime.Parse("01-01-2015");
                objCVarAccPayment.DueDate = DateTime.Parse("01-01-2015");
                objCVarAccPayment.BankAccountID = pBankAccountID;
                objCVarAccPayment.DealerName = "0";
                objCVarAccPayment.TotalLocalAmount = pAmount > 0 ? pAmount * pExchangeRate : (-1 * pAmount * pExchangeRate);
                objCVarAccPayment.BankName = "0";
                objCVarAccPayment.ChequeOrVisaNo = "0";
                objCVarAccPayment.ApprovingUserID = WebSecurity.CurrentUserId;
                objCVarAccPayment.Notes = pNotes;
                objCVarAccPayment.IsGeneralExpense = false;
                objCVarAccPayment.IsRefused = false;
                objCVarAccPayment.IsApproved = true;
                objCVarAccPayment.IsPosted = false;
                objCVarAccPayment.IsDeleted = false;
                objCVarAccPayment.CreatorUserID = objCVarAccPayment.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAccPayment.CreationDate = DateTime.Parse("01-01-2015");
                objCVarAccPayment.ModificationDate = DateTime.Now;
                objCAccPayment.lstCVarAccPayment.Add(objCVarAccPayment);
                objCAccPayment.SaveMethod(objCAccPayment.lstCVarAccPayment);
                pPaymentHeaderID = objCVarAccPayment.ID;
                #endregion insert payment header
                #region Insert PaymentDetails
                CVarAccPaymentDetails objCVarAccPaymentDetails = new CVarAccPaymentDetails();
                objCVarAccPaymentDetails.PaymentID = pPaymentHeaderID;
                objCVarAccPaymentDetails.Amount = pAmount > 0 ? pAmount : (-1 * pAmount);
                objCVarAccPaymentDetails.CurrencyID = pCurrencyID;
                objCVarAccPaymentDetails.ExchangeRate = pExchangeRate;
                objCVarAccPaymentDetails.IsApproved = true;
                objCVarAccPaymentDetails.IsDeleted = false;
                objCVarAccPaymentDetails.Notes = pNotes;
                objCVarAccPaymentDetails.CreatorUserID = objCVarAccPaymentDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAccPaymentDetails.CreationDate = DateTime.Parse("01-01-2015");
                objCVarAccPaymentDetails.ModificationDate = DateTime.Now;

                objCAccPaymentDetails.lstCVarAccPaymentDetails.Add(objCVarAccPaymentDetails);
                objCAccPaymentDetails.SaveMethod(objCAccPaymentDetails.lstCVarAccPaymentDetails);
                #endregion Insert PaymentDetails
            }
            #endregion insert new Open Balance for that currency

            #region update existing Open Balance for that currency & PRType in PaymentHeader for case of amount sign changed
            else //this means update so just update AccPaymentDetails
            {
                pPaymentHeaderID = objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[0].PaymentID;
                pPaymentDetailsID = objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[0].ID;

                pUpdateClause = (pAmount == 0 ? " Amount = NULL " : (" Amount = N'" + (pAmount > 0 ? pAmount : -1 * pAmount) + "'"));
                pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID + "'"));
                pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate + "'"));
                pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes + "'"));
                pUpdateClause += " ,ModificatorUserID =" + WebSecurity.CurrentUserId.ToString();
                pUpdateClause += " ,ModificationDate = GETDATE()";
                pUpdateClause += " WHERE ID = " + pPaymentDetailsID;
                objCAccPaymentDetails.UpdateList(pUpdateClause);

                pUpdateClause = "PRType=" + (pAmount >= 0 ? constPRTypeReceivable : constPRTypePayable);
                pUpdateClause += ", TotalLocalAmount = " + (pAmount > 0 ? pAmount * pExchangeRate : (-1 * pAmount * pExchangeRate));
                pUpdateClause += " WHERE ID=" + pPaymentHeaderID;
                objCAccPayment.UpdateList(pUpdateClause);
            }
            #endregion update existing Open Balance for that currency
            return new object[] {
            };
        }
        [HttpGet, HttpPost]
        public object[] BankOpenBalance_DeleteList(string pBankOpenBalanceIDsDeleted)
        {
            bool _result = false;
            string pPaymentIDs = "";
            Exception checkException = null;
            CAccPaymentDetails objCAccPaymentDetails = new CAccPaymentDetails();
            CAccPayment objCAccPayment = new CAccPayment();

            objCAccPaymentDetails.GetList("WHERE ID IN(" + pBankOpenBalanceIDsDeleted + ")");
            pPaymentIDs = objCAccPaymentDetails.lstCVarAccPaymentDetails[0].PaymentID.ToString();
            for (int i = 1; i < objCAccPaymentDetails.lstCVarAccPaymentDetails.Count; i++)
                pPaymentIDs += ", " + objCAccPaymentDetails.lstCVarAccPaymentDetails[i].PaymentID.ToString();
            checkException = objCAccPaymentDetails.DeleteList("WHERE ID IN (" + pBankOpenBalanceIDsDeleted + ")");
            checkException = objCAccPayment.DeleteList("WHERE ID IN (" + pPaymentIDs + ")");
            if (checkException == null)
                _result = true;
            return new object[] {
                _result
            };
        }
        #endregion BankOpenBalance

        #region TreasuryOpenBalance
        [HttpGet, HttpPost]
        public object[] TreasuryOpenBalance_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(
            bool pIsLoadArrayOfObjectsForTreasuryOpenBalance, int pPageNumber, int pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CTreasury objCTreasury = new CTreasury();
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            if (pIsLoadArrayOfObjectsForTreasuryOpenBalance)
                objCTreasury.GetList("ORDER BY Name");
            objCvwAccPaymentDetails.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails)
                , _RowCount
                , serializer.Serialize(objCTreasury.lstCVarTreasury) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] FillTreasuryOpenBalanceModal(Int64 pPaymentDetailsID, Int32 pTreasuryID, Int32 pCurrencyID)
        {
            int _RowCount = 0;
            string pWhereClause = "";
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            if (pPaymentDetailsID == 0)
                pWhereClause = "WHERE PaymentTypeID IS NULL AND TreasuryID=" + pTreasuryID + " AND CurrencyID=" + pCurrencyID;
            else
                pWhereClause = "WHERE ID=" + pPaymentDetailsID;
            objCvwAccPaymentDetails.GetListPaging(10, 1, pWhereClause, "ID", out _RowCount);
            return new object[]
                {
                    _RowCount > 0 ? new JavaScriptSerializer().Serialize(objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[0]) : null
                };
        }
        [HttpGet, HttpPost]
        public object[] TreasuryOpenBalance_Save(Int64 pPaymentDetailsID, Int32 pTreasuryID, Int32 pCurrencyID, decimal pAmount, decimal pExchangeRate, string pNotes)
        {
            Int32 _RowCount = 0;
            CvwAccPaymentDetails objCvwAccPaymentDetails = new CvwAccPaymentDetails();
            CAccPaymentDetails objCAccPaymentDetails = new CAccPaymentDetails();
            CAccPayment objCAccPayment = new CAccPayment();
            Int64 pPaymentHeaderID = 0;
            string pWhereClause = "";
            string pUpdateClause = "";
            int constPRTypeReceivable = 10;
            int constPRTypePayable = 20;
            if (pPaymentDetailsID == 0) //maybe row exists but i still don't know coz called from new btn so i use thi condition to check
                pWhereClause = "WHERE PaymentTypeID IS NULL AND TreasuryID=" + pTreasuryID + " AND CurrencyID=" + pCurrencyID;
            else
                pWhereClause = "WHERE ID=" + pPaymentDetailsID;
            objCvwAccPaymentDetails.GetListPaging(10, 1, pWhereClause, "ID", out _RowCount);
            #region insert new Open Balance for that currency
            if (_RowCount == 0) //this means insert
            {
                #region insert payment header
                CVarAccPayment objCVarAccPayment = new CVarAccPayment();
                objCVarAccPayment.PaymentCode = "0";
                objCVarAccPayment.PRType = pAmount > 0 ? constPRTypeReceivable : constPRTypePayable;
                objCVarAccPayment.PaymentDate = DateTime.Parse("01-01-2015");
                objCVarAccPayment.DueDate = DateTime.Parse("01-01-2015");
                objCVarAccPayment.TreasuryID = pTreasuryID;
                objCVarAccPayment.DealerName = "0";
                objCVarAccPayment.TotalLocalAmount = pAmount > 0 ? pAmount * pExchangeRate : (-1 * pAmount * pExchangeRate);
                objCVarAccPayment.BankName = "0";
                objCVarAccPayment.ChequeOrVisaNo = "0";
                objCVarAccPayment.ApprovingUserID = WebSecurity.CurrentUserId;
                objCVarAccPayment.Notes = pNotes;
                objCVarAccPayment.IsGeneralExpense = false;
                objCVarAccPayment.IsRefused = false;
                objCVarAccPayment.IsApproved = true;
                objCVarAccPayment.IsPosted = false;
                objCVarAccPayment.IsDeleted = false;
                objCVarAccPayment.CreatorUserID = objCVarAccPayment.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAccPayment.CreationDate = DateTime.Parse("01-01-2015");
                objCVarAccPayment.ModificationDate = DateTime.Now;
                objCAccPayment.lstCVarAccPayment.Add(objCVarAccPayment);
                objCAccPayment.SaveMethod(objCAccPayment.lstCVarAccPayment);
                pPaymentHeaderID = objCVarAccPayment.ID;
                #endregion insert payment header
                #region Insert PaymentDetails
                CVarAccPaymentDetails objCVarAccPaymentDetails = new CVarAccPaymentDetails();
                objCVarAccPaymentDetails.PaymentID = pPaymentHeaderID;
                objCVarAccPaymentDetails.Amount = pAmount > 0 ? pAmount : (-1 * pAmount);
                objCVarAccPaymentDetails.CurrencyID = pCurrencyID;
                objCVarAccPaymentDetails.ExchangeRate = pExchangeRate;
                objCVarAccPaymentDetails.IsApproved = true;
                objCVarAccPaymentDetails.IsDeleted = false;
                objCVarAccPaymentDetails.Notes = pNotes;
                objCVarAccPaymentDetails.CreatorUserID = objCVarAccPaymentDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAccPaymentDetails.CreationDate = DateTime.Parse("01-01-2015");
                objCVarAccPaymentDetails.ModificationDate = DateTime.Now;

                objCAccPaymentDetails.lstCVarAccPaymentDetails.Add(objCVarAccPaymentDetails);
                objCAccPaymentDetails.SaveMethod(objCAccPaymentDetails.lstCVarAccPaymentDetails);
                #endregion Insert PaymentDetails
            }
            #endregion insert new Open Balance for that currency

            #region update existing Open Balance for that currency & PRType in PaymentHeader for case of amount sign changed
            else //this means update so just update AccPaymentDetails
            {
                pPaymentHeaderID = objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[0].PaymentID;
                pPaymentDetailsID = objCvwAccPaymentDetails.lstCVarvwAccPaymentDetails[0].ID;

                pUpdateClause = (pAmount == 0 ? " Amount = NULL " : (" Amount = N'" + (pAmount > 0 ? pAmount : -1 * pAmount) + "'"));
                pUpdateClause += (pCurrencyID == 0 ? " ,CurrencyID = NULL " : (" ,CurrencyID = N'" + pCurrencyID + "'"));
                pUpdateClause += (pExchangeRate == 0 ? " ,ExchangeRate = NULL " : (" ,ExchangeRate = N'" + pExchangeRate + "'"));
                pUpdateClause += (pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes + "'"));
                pUpdateClause += " ,ModificatorUserID =" + WebSecurity.CurrentUserId.ToString();
                pUpdateClause += " ,ModificationDate = GETDATE()";
                pUpdateClause += " WHERE ID = " + pPaymentDetailsID;
                objCAccPaymentDetails.UpdateList(pUpdateClause);

                pUpdateClause = "PRType=" + (pAmount >= 0 ? constPRTypeReceivable : constPRTypePayable);
                pUpdateClause += ", TotalLocalAmount = " + (pAmount > 0 ? pAmount * pExchangeRate : (-1 * pAmount * pExchangeRate));
                pUpdateClause += " WHERE ID=" + pPaymentHeaderID;
                objCAccPayment.UpdateList(pUpdateClause);
            }
            #endregion update existing Open Balance for that currency
            return new object[] {
            };
        }
        [HttpGet, HttpPost]
        public object[] TreasuryOpenBalance_DeleteList(string pTreasuryOpenBalanceIDsDeleted)
        {
            bool _result = false;
            string pPaymentIDs = "";
            Exception checkException = null;
            CAccPaymentDetails objCAccPaymentDetails = new CAccPaymentDetails();
            CAccPayment objCAccPayment = new CAccPayment();

            objCAccPaymentDetails.GetList("WHERE ID IN(" + pTreasuryOpenBalanceIDsDeleted + ")");
            pPaymentIDs = objCAccPaymentDetails.lstCVarAccPaymentDetails[0].PaymentID.ToString();
            for (int i = 1; i < objCAccPaymentDetails.lstCVarAccPaymentDetails.Count; i++)
                pPaymentIDs += ", " + objCAccPaymentDetails.lstCVarAccPaymentDetails[i].PaymentID.ToString();
            checkException = objCAccPaymentDetails.DeleteList("WHERE ID IN (" + pTreasuryOpenBalanceIDsDeleted + ")");
            checkException = objCAccPayment.DeleteList("WHERE ID IN (" + pPaymentIDs + ")");
            if (checkException == null)
                _result = true;
            return new object[] {
                _result
            };
        }
        #endregion TreasuryOpenBalance

        public Int32 GetPartnerID(Int32 pCheckedPartnerTypeID, Int32 pReceivedPartnerTypeID, Int32 pPartnerID)
        {
            if (pCheckedPartnerTypeID == pReceivedPartnerTypeID)
                return pPartnerID;
            else
                return 0;

        }
    }
}
