using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.OperAcc.Customized;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using LogisticsWeb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Entities.Operations;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Transactions
{
    public class A_ARAllocationController : ApiController
    {
        #region ARAllocation
        [HttpGet, HttpPost]
        public Object[] ARAllocation_Partners_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, Int32 pPageNumber, Int32 pPageSize, string pWhereClauseAllocation_Partners, string pOrderBy)
        {
           
            if (!pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedReceivables IS NOT NULL"))//Accept Payable
            {
                bool _result = false;
                Exception checkException = null;
                //CvwAccPartners objCvwAccPartners = new CvwAccPartners();
                CvwAccPartners objCvwAccPartnersAll = new CvwAccPartners(); //For the select box
                CNoAccessPartnerTypes objCPartnerTypes = new CNoAccessPartnerTypes();
                int _RowCount = 0;
                //checkException = objCvwAccPartnersAll.GetList("ORDER BY PartnerTypeID, Name");
                //if (pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedReceivables IS NOT NULL"))
                  //  checkException = objCvwAccPartners.GetListPaging(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);
                checkException = objCPartnerTypes.GetList("ORDER BY Code");
                if (checkException == null)
                {
                    _result = true;
                }
                CvwAccPartners objCvwAccPartnersPayableAllocation = new CvwAccPartners();
                if (pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedPayables IS NOT NULL") && pIsLoadArrayOfObjects == false )
                    objCvwAccPartnersPayableAllocation.GetListPagingPayableAllocation(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                _result ? serializer.Serialize(objCvwAccPartnersPayableAllocation.lstCVarvwAccPartners) : null
                , _RowCount
                , pIsLoadArrayOfObjects || _result ? serializer.Serialize(objCvwAccPartnersAll.lstCVarvwAccPartners) : null
                , pIsLoadArrayOfObjects || _result ? serializer.Serialize(objCPartnerTypes.lstCVarNoAccessPartnerTypes) : null
               
            };
            }
            else//Accept Receivable
            {
                bool _result = false;
                Exception checkException = null;
                CvwAccPartners objCvwAccPartners = new CvwAccPartners();
                CvwAccPartners objCvwAccPartnersAll = new CvwAccPartners(); //For the select box
                CNoAccessPartnerTypes objCPartnerTypes = new CNoAccessPartnerTypes();
                int _RowCount = 0;
                if (pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedReceivables IS NOT NULL" ) && pIsLoadArrayOfObjects == false)
                    checkException = objCvwAccPartners.GetListPaging(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);

                checkException = objCPartnerTypes.GetList("ORDER BY Code");
                if (checkException == null)
                {
                    _result = true;
                }
                //CvwAccPartners objCvwAccPartnersPayableAllocation = new CvwAccPartners();
                //if (!pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedReceivables IS NOT NULL"))
                //    objCvwAccPartnersPayableAllocation.GetListPagingPayableAllocation(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                _result ? serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners) : null
                , _RowCount
                , pIsLoadArrayOfObjects || _result ? serializer.Serialize(objCvwAccPartnersAll.lstCVarvwAccPartners) : null
                , pIsLoadArrayOfObjects || _result ? serializer.Serialize(objCPartnerTypes.lstCVarNoAccessPartnerTypes) : null
               
            };
            }
          
        }

        [HttpGet, HttpPost]
        public Object[] ARAllocation_Partners_PartnerTypeChanged(Int32 pPartnerTypeID, string pWhereClauseAllocation_Partners, string pOrderBy, Int32 pPageNumber, Int32 pPageSize)
        {
            if (pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedReceivables IS NOT NULL"))//Receivable Accepted
            {
                Exception checkException = null;
                CvwAccPartners objCvwAccPartners = new CvwAccPartners();
                CvwAccPartners objCvwAccPartnersAll = new CvwAccPartners(); //For the select box
                int _RowCount = 0;

                if (pPartnerTypeID != 0)
                    checkException = objCvwAccPartnersAll.GetListPaging(10000, 1, "WHERE PartnerTypeID=" + pPartnerTypeID, "Name", out _RowCount);

                if (pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedReceivables IS NOT NULL"))
                    checkException = objCvwAccPartners.GetListPaging(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);

                //CvwAccPartners objCvwAccPartnersPayableAllocation = new CvwAccPartners();
                //if (!pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedReceivables IS NOT NULL"))
                //    objCvwAccPartnersPayableAllocation.GetListPagingPayableAllocation(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

                return new object[]
                {
                serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners)
                , _RowCount
                , serializer.Serialize(objCvwAccPartnersAll.lstCVarvwAccPartners)
                //, new JavaScriptSerializer().Serialize(objCvwAccPartnersPayableAllocation.lstCVarvwAccPartners)//3
                };
            }
            else//Payable Accepted
            {
                Exception checkException = null;
                //CvwAccPartners objCvwAccPartners = new CvwAccPartners();
                CvwAccPartners objCvwAccPartnersAll = new CvwAccPartners(); //For the select box
                int _RowCount = 0;

                if (pPartnerTypeID != 0)
                    checkException = objCvwAccPartnersAll.GetListPaging(10000, 1, "WHERE PartnerTypeID=" + pPartnerTypeID, "Name", out _RowCount);

                //if (pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedReceivables IS NOT NULL"))
                //    checkException = objCvwAccPartners.GetListPaging(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);

                CvwAccPartners objCvwAccPartnersPayableAllocation = new CvwAccPartners();
                if (!pWhereClauseAllocation_Partners.Contains("WHERE UnAllocatedReceivables IS NOT NULL"))
                    objCvwAccPartnersPayableAllocation.GetListPagingPayableAllocation(pPageSize, pPageNumber, pWhereClauseAllocation_Partners, pOrderBy, out _RowCount);

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

                return new object[]
                {
                serializer.Serialize(objCvwAccPartnersPayableAllocation.lstCVarvwAccPartners)
                , _RowCount
                , serializer.Serialize(objCvwAccPartnersAll.lstCVarvwAccPartners)
                };
            }
                
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

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa


            //CvwAccUnAllocatedPartnerBalance objCvwAccUnAllocatedPartnerBalance = new CvwAccUnAllocatedPartnerBalance();
            CvwAccPartnerBalance objCvwAvailableAmounts = new CvwAccPartnerBalance();

            CvwInvoices objCvwInvoices = new CvwInvoices();
            CvwPayables objCvwPayables = new CvwPayables();

            pWhereClause = "WHERE PartnerID = " + pPartnerID.ToString();
            pWhereClause += " AND PartnerTypeID = " + pPartnerTypeID.ToString();
            //checkException = objCvwAccUnAllocatedPartnerBalance.GetList(pWhereClause);
            #region Get Availabe Amounts that can be allocated
            checkException = objCvwAvailableAmounts.GetListPaging(9999999, 1, pWhereClause, "ID", out _RowCount);
            //var pAvailableAmounts = objCvwAvailableAmounts.lstCVarvwAccPartnerBalance //constTransactionAPPayment=20
            //    .GroupBy(g => g.CurrencyID)
            //    .Select(g => new
            //    {
            //        AvailableBalance = g.Sum(s => (s.TransactionType == constTransactionAPPayment || s.TransactionType == constTransactionPayableAllocation
            //                                       || s.TransactionType == constTransactionOpenCreditBalance
            //                                       || s.TransactionType == constTransactionOpenDebitBalance
            //                                       || s.TransactionType == constTransactionCreditTransfer || s.TransactionType == constTransactionDebitTransfer
            //                                       || s.TransactionType == constTransactionARPayment || s.TransactionType == constTransactionReceivableAllocation
            //                                       || s.TransactionType == constTransactionDebitNote
            //                                       || s.TransactionType == constTransactionCreditNote
            //                                       ? s.CreditAmount - s.DebitAmount
            //                                       : 0))
            //        ,
            //        CurrencyID = g.First().CurrencyID
            //        ,
            //        CurrencyCode = g.First().CurrencyCode
            //    }).OrderBy(o => o.CurrencyCode);

            string ptxtAvailableBalance = "";
            //if (pAvailableAmounts.Count() > 0)
            //    if (pAvailableAmounts.ElementAt(0).AvailableBalance != 0)
            //        ptxtAvailableBalance = (pAllocationType == constTransactionReceivableAllocation ? decimal.Round(pAvailableAmounts.ElementAt(0).AvailableBalance, 3).ToString() : (-1 * (decimal.Round(pAvailableAmounts.ElementAt(0).AvailableBalance, 3))).ToString()
            //            + " " + pAvailableAmounts.ElementAt(0).CurrencyCode);
            //for (int i = 1; i < pAvailableAmounts.Count(); i++)
            //{
            //    if (pAvailableAmounts.ElementAt(i).AvailableBalance != 0)
            //        ptxtAvailableBalance += " , " + (pAllocationType == constTransactionReceivableAllocation ? decimal.Round(pAvailableAmounts.ElementAt(i).AvailableBalance, 3).ToString() : (-1 * (decimal.Round(pAvailableAmounts.ElementAt(i).AvailableBalance, 3))).ToString()
            //            + " " + pAvailableAmounts.ElementAt(i).CurrencyCode);
            //}
            CA_InvoiceAllocation_GetPartnerBalance cA_InvoiceAllocation_GetPartnerBalance = new CA_InvoiceAllocation_GetPartnerBalance();
            cA_InvoiceAllocation_GetPartnerBalance.GetList(pPartnerID, pPartnerTypeID, pAllocationType);
            var pAvailableAmounts = cA_InvoiceAllocation_GetPartnerBalance.lstCVarA_InvoiceAllocation_GetPartnerBalance;



            if (pAvailableAmounts != null && pAvailableAmounts.Count() > 0)
            {

                foreach (var item in pAvailableAmounts)
                {
                    ptxtAvailableBalance += (item.AvailableBalance + " , ");

                }

            }


            #endregion Get Availabe Amounts that can be allocated
            if (pAllocationType == constTransactionReceivableAllocation)
            {
                #region Invoices
                pWhereClause = "WHERE IsDeleted = 0 AND IsApproved = 1 ";
                pWhereClause += " AND RemainingAmount * isnull(ExchangeRate ,  1 ) >= 5 ";
                pWhereClause += " AND PartnerID = " + pPartnerID.ToString();
                pWhereClause += " AND PartnerTypeID = " + pPartnerTypeID.ToString();
                pWhereClause += " AND InvoiceStatus IN (N'UnPaid' , N'Partially Paid') ";
                pWhereClause += " AND InvoiceTypeCode <> N'Draft'  ";
                if(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                    pWhereClause += " AND year(InvoiceDate) > 2020 ";

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
                pWhereClause = "WHERE IsDeleted = 0 AND IsApproved = 1 ";
                if (pPartnerTypeID == constCustodyPartnerTypeID) //if Custody for Payables , i can allocate for other suppliers
                    pWhereClause += " AND PartnerSupplierID IS NOT NULL ";
                else
                {
                    pWhereClause += " AND PartnerSupplierID = " + pPartnerID.ToString();
                    pWhereClause += " AND SupplierPartnerTypeID = " + pPartnerTypeID.ToString();
                }
                pWhereClause += " AND PayableStatus IN (N'UnPaid' , N'Partially Paid') ";
                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                    pWhereClause += " AND year(IssueDate) > 2020 ";

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
            CvwPayablesAllocationsItems objCvwPayablesAllocationsItems = new CvwPayablesAllocationsItems();
            if (pAllocationType == constTransactionPayableAllocation)
            {
                objCvwPayablesAllocationsItems.GetList(" Where PartnerSupplierID = " + pPartnerID.ToString() + "  AND SupplierPartnerTypeID = " + pPartnerTypeID.ToString()   + (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI" ? " AND year(IssueDate) > 2020  " : ""));
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                _result
                , pAllocationType == constTransactionReceivableAllocation ? serializer.Serialize(objCvwInvoices.lstCVarvwInvoices) : null //pData[1]
                //, _result ? new JavaScriptSerializer().Serialize(objCvwAccUnAllocatedPartnerBalance.lstCVarvwAccUnAllocatedPartnerBalance) : null //pData[2]
                , _result ? serializer.Serialize(pAvailableAmounts) : null //pData[2]
                , pAllocationType == constTransactionPayableAllocation ? serializer.Serialize(objCvwPayables.lstCVarvwPayables) : null //pData[3]
                , ptxtAvailableBalance //pData[4]
                ,  serializer.Serialize(objCvwPayablesAllocationsItems.lstCVarvwPayablesAllocationsItems)//5
            };
        }

        [HttpGet, HttpPost]
        public object[] ARAllocation_Save([FromBody] ParamAllocation_Save paramAllocation_Save)
        {
            bool _result = false;
            string AccPartenterBalanceIDs = "";
            string pUpdateList = "";
            Exception checkException = null;
            int constTransactionReceivableAllocation = 40; //InvoiceAllocation
            int constTransactionPayableAllocation = 80; //Op.Payable (AllocZation)
            int constTransactionPayableAllocatedFromCustody = 85;
            int constTransactionCreditTransfer = 50;
            int constTransactionDebitTransfer = 60;
            CVarAccInvoicePaymentDetails objCVarAccInvoicePaymentDetails = new CVarAccInvoicePaymentDetails();
            CAccInvoicePaymentDetails objCAccInvoicePaymentDetails = new CAccInvoicePaymentDetails();
            CInvoices objCInvoices = new CInvoices();
            CPayables objCPayables = new CPayables();
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
            Int32 NumberOfInvoicesAllocated = paramAllocation_Save.pAllocationItemsIDs.Split(',').Count();
            Int32 NumberOfPayableAllocation = paramAllocation_Save.pOperationCode.Split(',').Count();
            var ArrAllocationItemsIDs = paramAllocation_Save.pAllocationItemsIDs.Split(',');
            var ArrInvoiceNumbers = paramAllocation_Save.pInvoiceNumbers.Split(',');
            var ArrPartnerID = paramAllocation_Save.pPartnerIDList.Split(',');
            var ArrPartnerTypeID = paramAllocation_Save.pPartnerTypeIDList.Split(',');
            var ArrCharge = paramAllocation_Save.pCharge.Split(',');
            var ArrOperationCode = paramAllocation_Save.pOperationCode.Split(',');
            var ArrAmounts = paramAllocation_Save.pAmounts.Split(',');
            var ArrItemCurrencyIDs = paramAllocation_Save.pItemCurrencyIDs.Split(',');
            var ArrBalanceCurrencyIDs = paramAllocation_Save.pBalanceCurrencyIDs.Split(',');
            var ArrItemCurrencyCodes = paramAllocation_Save.pItemCurrencyCodes.Split(',');

            var ArrProfitAmounts = paramAllocation_Save.pProfitAmounts.Split(',');
            var ArrLossAmounts = paramAllocation_Save.pLossAmounts.Split(',');
            // var ArrBalanceCurrencyCodes = pBalanceCurrencyCodes.Split(',');
            //var ArrBalanceCurrencyCodes = (pBalanceCurrencyCodes == null ? string[0]: pBalanceCurrencyCodes.Split(','));
            string[] ArrBalanceCurrencyCodes = { };
            if (paramAllocation_Save.pBalanceCurrencyCodes != null)
                ArrBalanceCurrencyCodes = paramAllocation_Save.pBalanceCurrencyCodes.Split(',');

            var ArrExchangeRates = paramAllocation_Save.pExchangeRates.Split(',');
            var ArrBalCurLocalExRates = paramAllocation_Save.pBalCurLocalExRates.Split(',');
            var ArrInvCurLocalExRates = paramAllocation_Save.pInvCurLocalExRates.Split(',');
            //---
            //var AccInvoicePaymentDetailsIDs = "";
            long[] pAccPartnerBalanceID = new long[NumberOfInvoicesAllocated];
            //int[] pA_PayablesAllocationID = new int[NumberOfPayableAllocation];

            //creditNote
            CA_AllocationCreditNote objCA_AllocationCreditNote = new CA_AllocationCreditNote();

            CVarA_AllocationCreditNote ObjCVarA_AllocationCreditNote = new CVarA_AllocationCreditNote();
            if (paramAllocation_Save.pAllocationCreditIDs !="" && paramAllocation_Save.pAllocationCreditIDs != null && paramAllocation_Save.pAllocationCreditIDs !="0" && paramAllocation_Save.pAllocationCreditIDs != "undefined")
            {
                int NumberOfInvoices = paramAllocation_Save.pAllocationCreditIDs.Split(',').Length;
                for (int i = 0; i < NumberOfInvoices; i++)
                {
                    ObjCVarA_AllocationCreditNote.ID = 0;
                    ObjCVarA_AllocationCreditNote.VoucherType = paramAllocation_Save.pVoucherTypeID;

                    ObjCVarA_AllocationCreditNote.VoucherID = paramAllocation_Save.pVoucherID;
                    ObjCVarA_AllocationCreditNote.CreditID = Convert.ToInt64(paramAllocation_Save.pAllocationCreditIDs.Split(',')[i]);
                    objCA_AllocationCreditNote.lstCVarA_AllocationCreditNote.Add(ObjCVarA_AllocationCreditNote);


                    checkException = objCA_AllocationCreditNote.SaveMethod(objCA_AllocationCreditNote.lstCVarA_AllocationCreditNote);

                }

            }
            List<int> pA_PayablesAllocationID = new List<int>();
            var AccPartnerBalanceIDs = "";
            #region Payable Allocation 30-04-2020
            if (paramAllocation_Save.pTransactionType == 80)
            {
                #region Payable Allocation -- Insert into AccPartnerBalance as payable allocation into operAcc
                for (int i = 0; i < NumberOfInvoicesAllocated; i++)
                {
                    #region Add InvoicePaymentDetails if its Receivable
                    if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                    {
                        if (objCAccInvoicePaymentDetails.lstCVarAccInvoicePaymentDetails.Count > 0)
                        {
                            objCAccInvoicePaymentDetails.lstCVarAccInvoicePaymentDetails.RemoveAt(0);
                            objCVarAccInvoicePaymentDetails.ID = 0;
                        }
                        objCVarAccInvoicePaymentDetails.InvoicePaymentNumber = "0";
                        objCVarAccInvoicePaymentDetails.BranchID = paramAllocation_Save.pBranchID;
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
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            objCVarAccPartnerBalance.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalance.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                            objCVarAccPartnerBalance.DebitAmount = decimal.Parse(ArrAmounts[i]);
                            objCVarAccPartnerBalance.Notes = "Allocating " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Inv " + ArrInvoiceNumbers[i] + ".";
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation)
                        {
                            objCVarAccPartnerBalance.AccNoteID = Convert.ToInt32( paramAllocation_Save.pAccNoteID) ;
                            objCVarAccPartnerBalance.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalance.CreditAmount = decimal.Parse(ArrAmounts[i]);
                            objCVarAccPartnerBalance.Notes = "Payable Allocation(" + ArrCharge[i] + ") - (Op: " + ArrOperationCode[i] + "): Allocating " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + ".";
                        }
                        objCVarAccPartnerBalance.PartnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarAccPartnerBalance.CustomerID = GetPartnerID(1, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.AgentID = GetPartnerID(2, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.ShippingAgentID = GetPartnerID(3, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerID(4, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.ShippingLineID = GetPartnerID(5, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.AirlineID = GetPartnerID(6, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.TruckerID = GetPartnerID(7, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.SupplierID = GetPartnerID(8, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CustodyID = GetPartnerID(20, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CurrencyID = int.Parse(ArrBalanceCurrencyIDs[i]);
                        objCVarAccPartnerBalance.ExchangeRate = 1;// decimal.Parse(ArrExchangeRates[i]); ///////////////////////////////////
                                                                  //objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.TransactionType = paramAllocation_Save.pTransactionType;
                        objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                        AccPartenterBalanceIDs += objCVarAccPartnerBalance.ID + ",";
                    }
                    #endregion allocating when balance currency and invoice currency are the same so insert just debit row
                    #region allocating when balance currency and invoice currency are diff so insert debit and credit row for conversion
                    else if (ArrItemCurrencyIDs[i] != ArrBalanceCurrencyIDs[i]) //different currencies (insert Debit & Credit Rows for Converting Currency then a row for allocation)
                    {
                        //conversion debit row
                        CVarAccPartnerBalance objCVarAccPartnerBalanceDebit = new CVarAccPartnerBalance();
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            objCVarAccPartnerBalanceDebit.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalanceDebit.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                            objCVarAccPartnerBalanceDebit.DebitAmount = decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i]) ;
                            objCVarAccPartnerBalanceDebit.TransactionType = constTransactionDebitTransfer; //its conversion but i want this row to appear
                            objCVarAccPartnerBalanceDebit.Notes = "Transferring " + decimal.Round((decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i])), 3).ToString() + " " + ArrBalanceCurrencyCodes[i] + " to " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for inv " + ArrInvoiceNumbers[i] + ".";
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation)
                        {
                            objCVarAccPartnerBalanceDebit.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalanceDebit.CreditAmount = decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i]);
                            objCVarAccPartnerBalanceDebit.TransactionType = constTransactionCreditTransfer; //its conversion but i want this row to appear
                            objCVarAccPartnerBalanceDebit.Notes = "Transferring " + decimal.Round((decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i])), 3).ToString() + " " + ArrBalanceCurrencyCodes[i] + " to " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + " - Op Code(" + ArrOperationCode[i] + ")" + " - Payable(" + ArrCharge[i] + ")" + ".";
                        }
                        objCVarAccPartnerBalanceDebit.PartnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarAccPartnerBalanceDebit.CustomerID = GetPartnerID(1, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.AgentID = GetPartnerID(2, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.ShippingAgentID = GetPartnerID(3, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.CustomsClearanceAgentID = GetPartnerID(4, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.ShippingLineID = GetPartnerID(5, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.AirlineID = GetPartnerID(6, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.TruckerID = GetPartnerID(7, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.SupplierID = GetPartnerID(8, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.CustodyID = GetPartnerID(20, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.CurrencyID = int.Parse(ArrBalanceCurrencyIDs[i]);
                        objCVarAccPartnerBalanceDebit.ExchangeRate = decimal.Parse(ArrExchangeRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceDebit.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceDebit.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceDebit.CreatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalanceDebit.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalanceDebit.CreationDate = objCVarAccPartnerBalanceDebit.ModificationDate = DateTime.Now;
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalanceDebit);
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Remove(objCVarAccPartnerBalanceDebit);
                        AccPartenterBalanceIDs += objCVarAccPartnerBalanceDebit.ID + ",";
                        CVarAccPartnerBalance objCVarAccPartnerBalanceCredit = new CVarAccPartnerBalance();
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            objCVarAccPartnerBalanceCredit.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalanceCredit.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                            objCVarAccPartnerBalanceCredit.TransactionType = constTransactionCreditTransfer;
                            objCVarAccPartnerBalanceCredit.DebitAmount = decimal.Parse(ArrAmounts[i]);
                            objCVarAccPartnerBalanceCredit.Notes = "Receiving " + decimal.Round((decimal.Parse(ArrAmounts[i])), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " from the " + ArrBalanceCurrencyCodes[i] + " balance for inv " + ArrInvoiceNumbers[i] + ".";
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation) //its opposite for Receivable
                        {
                            objCVarAccPartnerBalanceCredit.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalanceCredit.TransactionType = constTransactionDebitTransfer;
                            objCVarAccPartnerBalanceCredit.CreditAmount = decimal.Parse(ArrAmounts[i]);
                            objCVarAccPartnerBalanceCredit.Notes = "Receiving " + decimal.Round((decimal.Parse(ArrAmounts[i])), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " from the " + ArrBalanceCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + " - Op Code(" + ArrOperationCode[i] + ")" + " - Payable(" + ArrCharge[i] + ")" + ".";
                        }
                        objCVarAccPartnerBalanceCredit.PartnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarAccPartnerBalanceCredit.CustomerID = GetPartnerID(1, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.AgentID = GetPartnerID(2, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.ShippingAgentID = GetPartnerID(3, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.CustomsClearanceAgentID = GetPartnerID(4, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.ShippingLineID = GetPartnerID(5, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.AirlineID = GetPartnerID(6, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.TruckerID = GetPartnerID(7, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.SupplierID = GetPartnerID(8, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.CustodyID = GetPartnerID(20, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.CurrencyID = int.Parse(ArrItemCurrencyIDs[i]);
                        objCVarAccPartnerBalanceCredit.ExchangeRate = 0; ///////////////////////////////////
                                                                         //objCVarAccPartnerBalanceCredit.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceCredit.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////here is the currency of the invoice////////////////////////////
                        objCVarAccPartnerBalanceCredit.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceCredit.CreatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalanceCredit.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalanceCredit.CreationDate = DateTime.Now;
                        objCVarAccPartnerBalanceCredit.ModificationDate = DateTime.Now;
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalanceCredit);
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                        AccPartenterBalanceIDs += objCVarAccPartnerBalanceCredit.ID + ",";
                        //Allocation row
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Remove(objCVarAccPartnerBalanceCredit);
                        CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            objCVarAccPartnerBalance.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalance.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                            objCVarAccPartnerBalance.Notes = "Allocating transferred " + ArrAmounts[i] + " " + ArrItemCurrencyCodes[i] + " from " + ArrBalanceCurrencyCodes[i] + " balance for inv " + ArrInvoiceNumbers[i] + ".";
                            objCVarAccPartnerBalance.CreditAmount = decimal.Parse(ArrAmounts[i]);
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation) //its opposite for Receivable
                        {
                            objCVarAccPartnerBalance.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalance.Notes = "Allocating transferred " + ArrAmounts[i] + " " + ArrItemCurrencyCodes[i] + " from " + ArrBalanceCurrencyCodes[i] + " balance for Supplier Invoice " + ArrInvoiceNumbers[i] + " - Op Code(" + ArrOperationCode[i] + ")" + " - Payable(" + ArrCharge[i] + ")" + ".";
                            objCVarAccPartnerBalance.DebitAmount = decimal.Parse(ArrAmounts[i]);
                        }
                        objCVarAccPartnerBalance.PartnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarAccPartnerBalance.CustomerID = GetPartnerID(1, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.AgentID = GetPartnerID(2, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.ShippingAgentID = GetPartnerID(3, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerID(4, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.ShippingLineID = GetPartnerID(5, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.AirlineID = GetPartnerID(6, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.TruckerID = GetPartnerID(7, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.SupplierID = GetPartnerID(8, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CustodyID = GetPartnerID(20, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CurrencyID = int.Parse(ArrItemCurrencyIDs[i]);
                        objCVarAccPartnerBalance.ExchangeRate = 0; // decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                                                                   //objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////here is the currency of the invoice////////////////////////////
                        objCVarAccPartnerBalance.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.TransactionType = paramAllocation_Save.pTransactionType;
                        objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                        AccPartenterBalanceIDs += objCVarAccPartnerBalance.ID + ",";
                    }
                    #endregion allocating when balance currency and invoice currency are diff so insert debit and credit row for conversion
                    #region just in case of Custody settlement for another supplier
                    if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation
                        && (Int16.Parse(ArrPartnerTypeID[i]) != paramAllocation_Save.pPartnerTypeID
                            || Int16.Parse(ArrPartnerID[i]) != paramAllocation_Save.pPartnerID
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
                        objCVarAccPartnerBalance.Notes = "Payable Allocation(" + ArrCharge[i] + ") - (Op: " + ArrOperationCode[i] + ") BY Custody(" + paramAllocation_Save.pPartnerName + "): Allocating " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + ".";

                        objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                        AccPartenterBalanceIDs += objCVarAccPartnerBalance.ID + ",";
                    }
                    #endregion just in case of Custody settlement for another supplier
                    #region Update Paid & Remaining Amount
                    if (checkException == null)
                    {
                        _result = true;
                        //Save Amount Paid & Remaining Amounts
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) + " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                            pUpdateList += " , RemainingAmount = (ISNULL(RemainingAmount,0) - " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                            pUpdateList += " WHERE ID = " + Int64.Parse(ArrAllocationItemsIDs[i]);
                            checkException = objCInvoices.UpdateList(pUpdateList);
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation)
                        {
                            pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) + " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                            //pUpdateList += " , RemainingAmount = (ISNULL(CostAmount,0) - " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                            pUpdateList += " WHERE ID = " + Int64.Parse(ArrAllocationItemsIDs[i]);
                            checkException = objCPayables.UpdateList(pUpdateList);
                        }
                    }
                    #endregion Update Paid & Remaining Amount
                } //EOF for (int i = 0; i < NumberOfInvoicesAllocated; i++)
                #endregion

                COperations objCOperations = new COperations();

                AccPartenterBalanceIDs = AccPartenterBalanceIDs.Length > 0 ? AccPartenterBalanceIDs.Substring(0, (AccPartenterBalanceIDs.Length - 1)) : "";

                for (int j = 0; j < NumberOfPayableAllocation; j++)
                {
                    objCOperations.GetList(" Where Code = '" + ArrOperationCode[j] + "'");
                    CA_PayablesAllocation objA_PayablesAllocation = new CA_PayablesAllocation();
                    if (ArrItemCurrencyIDs[j] == ArrBalanceCurrencyIDs[j])
                    {
                        CVarA_PayablesAllocation objCVarA_PayablesAllocation = new CVarA_PayablesAllocation();
                        objCVarA_PayablesAllocation.ID = 0;
                        objCVarA_PayablesAllocation.AmountDue = Convert.ToDecimal(paramAllocation_Save.pAmounts.Split(',')[j]);
                        objCVarA_PayablesAllocation.partnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarA_PayablesAllocation.PartnerID = paramAllocation_Save.pPartnerID;
                        objCVarA_PayablesAllocation.ExchangeRate = paramAllocation_Save.pExchangeRates.Split(',')[j] == "NaN" ? 1 : Convert.ToDecimal(paramAllocation_Save.pExchangeRates.Split(',')[j]);
                        objCVarA_PayablesAllocation.CurrencyID = ArrBalanceCurrencyIDs[j];
                        if (objCOperations.lstCVarOperations.Count > 0)
                            objCVarA_PayablesAllocation.OperationID = int.Parse(objCOperations.lstCVarOperations[0].ID.ToString());

                        objCVarA_PayablesAllocation.JV_ID = 0;
                        objCVarA_PayablesAllocation.CreatorUserID = WebSecurity.CurrentUserId;
                        objCVarA_PayablesAllocation.CreationDate = DateTime.Now;
                        objCVarA_PayablesAllocation.TransactionType = 10;
                        objCVarA_PayablesAllocation.IsCountable = true;
                        objCVarA_PayablesAllocation.Notes = "0";
                        objCVarA_PayablesAllocation.PayableAllocationID = 0;
                        objCVarA_PayablesAllocation.PayableID = Convert.ToInt64(ArrAllocationItemsIDs[j]);
                        objCVarA_PayablesAllocation.PartnerBalanceIDs = AccPartenterBalanceIDs;
                        objA_PayablesAllocation.lstCVarA_PayablesAllocation.Add(objCVarA_PayablesAllocation);
                        checkException = objA_PayablesAllocation.SaveMethod(objA_PayablesAllocation.lstCVarA_PayablesAllocation);
                        if (checkException == null)
                            pA_PayablesAllocationID.Add(objCVarA_PayablesAllocation.ID);
                        //if (checkException == null)
                        //{
                        //    AccPartnerBalanceIDs += "," + objCVarA_PayablesAllocation.ID;

                        //}
                    }
                    else
                    {
                        int pPayableAllocationID = 0;
                        int lengthA_PayablesAllocation_PayableID = 0;
                        CA_PayablesAllocation objCA_PayablesAllocation_PayableID = new CA_PayablesAllocation();
                        objCA_PayablesAllocation_PayableID.GetList(" Where PayableAllocationID = (select Max(isnull(PayableAllocationID,0)) from A_PayablesAllocation)");
                        lengthA_PayablesAllocation_PayableID = objCA_PayablesAllocation_PayableID.lstCVarA_PayablesAllocation.Count;
                        if (lengthA_PayablesAllocation_PayableID > 0)
                        {
                            pPayableAllocationID = objCA_PayablesAllocation_PayableID.lstCVarA_PayablesAllocation[lengthA_PayablesAllocation_PayableID - 1].PayableAllocationID + 1;
                        }
                        else
                        {
                            pPayableAllocationID = 1;
                        }

                        CVarA_PayablesAllocation objCVarA_PayablesAllocation = new CVarA_PayablesAllocation();
                        objCVarA_PayablesAllocation.ID = 0;
                        objCVarA_PayablesAllocation.AmountDue = (Convert.ToDecimal(paramAllocation_Save.pAmounts.Split(',')[j]));
                        objCVarA_PayablesAllocation.partnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarA_PayablesAllocation.PartnerID = paramAllocation_Save.pPartnerID;
                        objCVarA_PayablesAllocation.ExchangeRate = 1;// int.Parse(pExchangeRates.Split(',')[j]);
                        objCVarA_PayablesAllocation.CurrencyID = paramAllocation_Save.pItemCurrencyIDs.Split(',')[j];//S ArrBalanceCurrencyIDs[j];
                        objCVarA_PayablesAllocation.OperationID = int.Parse(objCOperations.lstCVarOperations[0].ID.ToString());
                        objCVarA_PayablesAllocation.JV_ID = 0;
                        objCVarA_PayablesAllocation.CreatorUserID = WebSecurity.CurrentUserId;
                        objCVarA_PayablesAllocation.CreationDate = DateTime.Now;
                        objCVarA_PayablesAllocation.TransactionType = 10;
                        objCVarA_PayablesAllocation.IsCountable = false;
                        objCVarA_PayablesAllocation.Notes = "0";
                        objCVarA_PayablesAllocation.PayableAllocationID = pPayableAllocationID;
                        objCVarA_PayablesAllocation.PayableID = Int64.Parse(ArrAllocationItemsIDs[j]);
                        objCVarA_PayablesAllocation.PartnerBalanceIDs = AccPartenterBalanceIDs;
                        objA_PayablesAllocation.lstCVarA_PayablesAllocation.Add(objCVarA_PayablesAllocation);

                        CVarA_PayablesAllocation objCVarA_PayablesAllocationDiffCurr = new CVarA_PayablesAllocation();
                        objCVarA_PayablesAllocationDiffCurr.ID = 0;
                        objCVarA_PayablesAllocationDiffCurr.AmountDue = decimal.Parse(paramAllocation_Save.pAmounts.Split(',')[j]) / (Convert.ToDecimal(paramAllocation_Save.pExchangeRates.Split(',')[j]));
                        objCVarA_PayablesAllocationDiffCurr.partnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarA_PayablesAllocationDiffCurr.PartnerID = paramAllocation_Save.pPartnerID;
                        objCVarA_PayablesAllocationDiffCurr.ExchangeRate = decimal.Parse(paramAllocation_Save.pExchangeRates.Split(',')[j]);
                        objCVarA_PayablesAllocationDiffCurr.CurrencyID = ArrBalanceCurrencyIDs[j];// pItemCurrencyIDs.Split(',')[j];
                        objCVarA_PayablesAllocationDiffCurr.OperationID = int.Parse(objCOperations.lstCVarOperations[0].ID.ToString());
                        objCVarA_PayablesAllocationDiffCurr.JV_ID = 0;
                        objCVarA_PayablesAllocationDiffCurr.CreatorUserID = WebSecurity.CurrentUserId;
                        objCVarA_PayablesAllocationDiffCurr.CreationDate = DateTime.Now;
                        objCVarA_PayablesAllocationDiffCurr.TransactionType = 20;
                        objCVarA_PayablesAllocationDiffCurr.IsCountable = true;
                        objCVarA_PayablesAllocationDiffCurr.Notes = "0";
                        objCVarA_PayablesAllocationDiffCurr.PayableAllocationID = pPayableAllocationID;
                        objCVarA_PayablesAllocationDiffCurr.PayableID = Int64.Parse(ArrAllocationItemsIDs[j]);
                        objCVarA_PayablesAllocationDiffCurr.PartnerBalanceIDs = AccPartenterBalanceIDs;
                        objA_PayablesAllocation.lstCVarA_PayablesAllocation.Add(objCVarA_PayablesAllocationDiffCurr);
                        checkException = objA_PayablesAllocation.SaveMethod(objA_PayablesAllocation.lstCVarA_PayablesAllocation);
                        if (checkException == null)
                        {
                            pA_PayablesAllocationID.Add(objCVarA_PayablesAllocationDiffCurr.ID);
                            pA_PayablesAllocationID.Add(objCVarA_PayablesAllocation.ID);
                        }

                        if (checkException == null)
                        {
                            _result = true;
                            AccPartnerBalanceIDs += "," + pPayableAllocationID;
                            //AccPartnerBalanceIDs += "," + objCVarA_PayablesAllocationDiffCurr.ID;
                        }
                    }

                    //pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) + " + decimal.Parse(ArrAmounts[j]).ToString() + ")";
                    ////pUpdateList += " , RemainingAmount = (ISNULL(CostAmount,0) - " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                    //pUpdateList += " WHERE ID = " + Int64.Parse(ArrAllocationItemsIDs[j]);
                    //checkException = objCPayables.UpdateList(pUpdateList);
                }

                long JVID = 0;
       
                if (AccPartnerBalanceIDs.Trim() != "")
                {
                    CA_InvoiceAllocation_CreateJV cA_PayableAllocation_CreateJV = new CA_InvoiceAllocation_CreateJV();
                    var accPartnerBalanceIDs = (AccPartnerBalanceIDs + ",");
                    checkException = cA_PayableAllocation_CreateJV.GetListPayable(accPartnerBalanceIDs, WebSecurity.CurrentUserId);
                    JVID = cA_PayableAllocation_CreateJV.lstCVarA_InvoiceAllocation_CreateJV[0].JV_ID;
                }
                if (AccPartenterBalanceIDs != ""  && paramAllocation_Save.pAccNoteID != "" && paramAllocation_Save.pAccNoteID != "0")
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    checkException = objCCustomizedDBCall.A_SingleID_Posting("A_PayableAllocation_WithAccNote_CreateJV", ","+ AccPartenterBalanceIDs + "," , WebSecurity.CurrentUserId);
                }
                if (checkException == null)
                {
                    _result = true;
                }
                return new object[] {
                _result, pA_PayablesAllocationID,JVID
            };
            }
            #endregion
            else
            {
                #region Receivable 
                //---
                for (int i = 0; i < NumberOfInvoicesAllocated; i++)
                {
                    #region Add InvoicePaymentDetails if its Receivable
                    if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                    {
                        if (objCAccInvoicePaymentDetails.lstCVarAccInvoicePaymentDetails.Count > 0)
                        {
                            objCAccInvoicePaymentDetails.lstCVarAccInvoicePaymentDetails.RemoveAt(0);
                            objCVarAccInvoicePaymentDetails.ID = 0;
                        }
                        objCVarAccInvoicePaymentDetails.InvoicePaymentNumber = "0";
                        objCVarAccInvoicePaymentDetails.BranchID = paramAllocation_Save.pBranchID;
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

                        ////---added by MOSTAA
                        //if(checkException.Message != null)
                        //{
                        //    AccInvoicePaymentDetailsIDs += "," + objCVarAccInvoicePaymentDetails.ID;

                        //}
                        ////---

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
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            objCVarAccPartnerBalance.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalance.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                            objCVarAccPartnerBalance.DebitAmount = decimal.Parse(ArrAmounts[i]);
                            objCVarAccPartnerBalance.Notes = "Allocating " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Inv " + ArrInvoiceNumbers[i] + ".";
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation)
                        {
                            objCVarAccPartnerBalance.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalance.CreditAmount = decimal.Parse(ArrAmounts[i]);
                            objCVarAccPartnerBalance.Notes = "Payable Allocation(" + ArrCharge[i] + ") - (Op: " + ArrOperationCode[i] + "): Allocating " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + ".";
                        }
                        objCVarAccPartnerBalance.PartnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarAccPartnerBalance.CustomerID = GetPartnerID(1, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.AgentID = GetPartnerID(2, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.ShippingAgentID = GetPartnerID(3, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerID(4, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.ShippingLineID = GetPartnerID(5, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.AirlineID = GetPartnerID(6, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.TruckerID = GetPartnerID(7, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.SupplierID = GetPartnerID(8, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CustodyID = GetPartnerID(20, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CurrencyID = int.Parse(ArrBalanceCurrencyIDs[i]);
                        objCVarAccPartnerBalance.ExchangeRate = 1;// decimal.Parse(ArrExchangeRates[i]); ///////////////////////////////////
                                                                  //objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.TransactionType = paramAllocation_Save.pTransactionType;
                        objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;
                        objCVarAccPartnerBalance.JVID = 0;
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                        //pAccPartnerBalanceID =  ObjCVarAccPartnerBalance.lstCVarAccPartnerBalance.ID;
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                        pAccPartnerBalanceID[i] = objCAccPartnerBalance.lstCVarAccPartnerBalance[i].ID;

                    }
                    #endregion allocating when balance currency and invoice currency are the same so insert just debit row
                    #region allocating when balance currency and invoice currency are diff so insert debit and credit row for conversion
                    else if (ArrItemCurrencyIDs[i] != ArrBalanceCurrencyIDs[i]) //different currencies (insert Debit & Credit Rows for Converting Currency then a row for allocation)
                    {
                        //conversion debit row
                        CVarAccPartnerBalance objCVarAccPartnerBalanceDebit = new CVarAccPartnerBalance();
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            objCVarAccPartnerBalanceDebit.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalanceDebit.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                            objCVarAccPartnerBalanceDebit.DebitAmount = decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i]) + decimal.Parse(ArrProfitAmounts[i]) - decimal.Parse(ArrLossAmounts[i]);
                            objCVarAccPartnerBalanceDebit.TransactionType = constTransactionDebitTransfer; //its conversion but i want this row to appear
                            objCVarAccPartnerBalanceDebit.Notes = "Transferring " + decimal.Round((decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i])), 3).ToString() + " " + ArrBalanceCurrencyCodes[i] + " to " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for inv " + ArrInvoiceNumbers[i] + ".";
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation)
                        {
                            objCVarAccPartnerBalanceDebit.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalanceDebit.CreditAmount = decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i]);
                            objCVarAccPartnerBalanceDebit.TransactionType = constTransactionCreditTransfer; //its conversion but i want this row to appear
                            objCVarAccPartnerBalanceDebit.Notes = "Transferring " + decimal.Round((decimal.Parse(ArrAmounts[i]) / decimal.Parse(ArrExchangeRates[i])), 3).ToString() + " " + ArrBalanceCurrencyCodes[i] + " to " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + " - Op Code(" + ArrOperationCode[i] + ")" + " - Payable(" + ArrCharge[i] + ")" + ".";
                        }
                        objCVarAccPartnerBalanceDebit.PartnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarAccPartnerBalanceDebit.CustomerID = GetPartnerID(1, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.AgentID = GetPartnerID(2, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.ShippingAgentID = GetPartnerID(3, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.CustomsClearanceAgentID = GetPartnerID(4, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.ShippingLineID = GetPartnerID(5, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.AirlineID = GetPartnerID(6, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.TruckerID = GetPartnerID(7, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.SupplierID = GetPartnerID(8, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.CustodyID = GetPartnerID(20, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceDebit.CurrencyID = int.Parse(ArrBalanceCurrencyIDs[i]);
                        objCVarAccPartnerBalanceDebit.ExchangeRate = decimal.Parse(ArrExchangeRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceDebit.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceDebit.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceDebit.CreatorUserID = objCVarAccPartnerBalanceDebit.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalanceDebit.CreationDate = objCVarAccPartnerBalanceDebit.ModificationDate = DateTime.Now;
                        objCVarAccPartnerBalanceDebit.JVID = 0;
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalanceDebit);
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                        ////---added by MOSTAA
                        if (checkException == null)
                        {
                            AccPartnerBalanceIDs += "," + objCVarAccPartnerBalanceDebit.ID;

                        }
                        ////---
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Remove(objCVarAccPartnerBalanceDebit);

                        CVarAccPartnerBalance objCVarAccPartnerBalanceCredit = new CVarAccPartnerBalance();
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            objCVarAccPartnerBalanceCredit.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalanceCredit.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                            objCVarAccPartnerBalanceCredit.TransactionType = constTransactionCreditTransfer;
                            objCVarAccPartnerBalanceCredit.DebitAmount = decimal.Parse(ArrAmounts[i]);
                            objCVarAccPartnerBalanceCredit.Notes = "Receiving " + decimal.Round((decimal.Parse(ArrAmounts[i])), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " from the " + ArrBalanceCurrencyCodes[i] + " balance for inv " + ArrInvoiceNumbers[i] + ".";
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation) //its opposite for Receivable
                        {
                            objCVarAccPartnerBalanceCredit.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalanceCredit.TransactionType = constTransactionDebitTransfer;
                            objCVarAccPartnerBalanceCredit.CreditAmount = decimal.Parse(ArrAmounts[i]);
                            objCVarAccPartnerBalanceCredit.Notes = "Receiving " + decimal.Round((decimal.Parse(ArrAmounts[i])), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " from the " + ArrBalanceCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + " - Op Code(" + ArrOperationCode[i] + ")" + " - Payable(" + ArrCharge[i] + ")" + ".";
                        }
                        objCVarAccPartnerBalanceCredit.PartnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarAccPartnerBalanceCredit.CustomerID = GetPartnerID(1, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.AgentID = GetPartnerID(2, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.ShippingAgentID = GetPartnerID(3, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.CustomsClearanceAgentID = GetPartnerID(4, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.ShippingLineID = GetPartnerID(5, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.AirlineID = GetPartnerID(6, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.TruckerID = GetPartnerID(7, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.SupplierID = GetPartnerID(8, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.CustodyID = GetPartnerID(20, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalanceCredit.CurrencyID = int.Parse(ArrItemCurrencyIDs[i]);
                        objCVarAccPartnerBalanceCredit.ExchangeRate = 0; ///////////////////////////////////
                                                                         //objCVarAccPartnerBalanceCredit.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceCredit.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////here is the currency of the invoice////////////////////////////
                        objCVarAccPartnerBalanceCredit.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalanceCredit.CreatorUserID = objCVarAccPartnerBalanceCredit.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalanceCredit.CreationDate = objCVarAccPartnerBalanceCredit.ModificationDate = DateTime.Now;
                        objCVarAccPartnerBalanceCredit.JVID = 0;
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalanceCredit);
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                        //Allocation row
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Remove(objCVarAccPartnerBalanceCredit);
                        CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            objCVarAccPartnerBalance.InvoiceID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalance.InvoicePaymentDetailsID = objCVarAccInvoicePaymentDetails.ID;
                            objCVarAccPartnerBalance.Notes = "Allocating transferred " + ArrAmounts[i] + " " + ArrItemCurrencyCodes[i] + " from " + ArrBalanceCurrencyCodes[i] + " balance for inv " + ArrInvoiceNumbers[i] + ".";
                            objCVarAccPartnerBalance.CreditAmount = decimal.Parse(ArrAmounts[i]);
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation) //its opposite for Receivable
                        {
                            objCVarAccPartnerBalance.OperationPayableID = Int64.Parse(ArrAllocationItemsIDs[i]);
                            objCVarAccPartnerBalance.Notes = "Allocating transferred " + ArrAmounts[i] + " " + ArrItemCurrencyCodes[i] + " from " + ArrBalanceCurrencyCodes[i] + " balance for Supplier Invoice " + ArrInvoiceNumbers[i] + " - Op Code(" + ArrOperationCode[i] + ")" + " - Payable(" + ArrCharge[i] + ")" + ".";
                            objCVarAccPartnerBalance.DebitAmount = decimal.Parse(ArrAmounts[i]);
                        }
                        objCVarAccPartnerBalance.PartnerTypeID = paramAllocation_Save.pPartnerTypeID;
                        objCVarAccPartnerBalance.CustomerID = GetPartnerID(1, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.AgentID = GetPartnerID(2, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.ShippingAgentID = GetPartnerID(3, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerID(4, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.ShippingLineID = GetPartnerID(5, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.AirlineID = GetPartnerID(6, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.TruckerID = GetPartnerID(7, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.SupplierID = GetPartnerID(8, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CustodyID = GetPartnerID(20, paramAllocation_Save.pPartnerTypeID, paramAllocation_Save.pPartnerID);
                        objCVarAccPartnerBalance.CurrencyID = int.Parse(ArrItemCurrencyIDs[i]);
                        objCVarAccPartnerBalance.ExchangeRate = 0; // decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                                                                   //objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrBalCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.BalCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////here is the currency of the invoice////////////////////////////
                        objCVarAccPartnerBalance.InvCurLocalExRate = decimal.Parse(ArrInvCurLocalExRates[i]); ///////////////////////////////////
                        objCVarAccPartnerBalance.TransactionType = paramAllocation_Save.pTransactionType;
                        objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;
                        objCVarAccPartnerBalance.JVID = 0;
                        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                    }
                    #endregion allocating when balance currency and invoice currency are diff so insert debit and credit row for conversion
                    #region just in case of Custody settlement for another supplier
                    if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation
                        && (Int16.Parse(ArrPartnerTypeID[i]) != paramAllocation_Save.pPartnerTypeID
                            || Int16.Parse(ArrPartnerID[i]) != paramAllocation_Save.pPartnerID
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
                        objCVarAccPartnerBalance.Notes = "Payable Allocation(" + ArrCharge[i] + ") - (Op: " + ArrOperationCode[i] + ") BY Custody(" + paramAllocation_Save.pPartnerName + "): Allocating " + decimal.Round(decimal.Parse(ArrAmounts[i]), 3).ToString() + " " + ArrItemCurrencyCodes[i] + " for Supplier Invoice " + ArrInvoiceNumbers[i] + ".";

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
                        if (paramAllocation_Save.pTransactionType == constTransactionReceivableAllocation)
                        {
                            pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) + " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                            pUpdateList += " , RemainingAmount = (ISNULL(RemainingAmount,0) - " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                            pUpdateList += " WHERE ID = " + Int64.Parse(ArrAllocationItemsIDs[i]);
                            checkException = objCInvoices.UpdateList(pUpdateList);
                        }
                        else if (paramAllocation_Save.pTransactionType == constTransactionPayableAllocation)
                        {
                            pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) + " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                            //pUpdateList += " , RemainingAmount = (ISNULL(CostAmount,0) - " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                            pUpdateList += " WHERE ID = " + Int64.Parse(ArrAllocationItemsIDs[i]);
                            checkException = objCPayables.UpdateList(pUpdateList);
                        }
                    }
                    #endregion Update Paid & Remaining Amount
                } //EOF for (int i = 0; i < NumberOfInvoicesAllocated; i++)


                long JVID = 0;
                if (AccPartnerBalanceIDs.Trim() != "" )
                {
                    CA_InvoiceAllocation_CreateJV cA_InvoiceAllocation_CreateJV = new CA_InvoiceAllocation_CreateJV();
                    var accPartnerBalanceIDs = (AccPartnerBalanceIDs + ",");
                    cA_InvoiceAllocation_CreateJV.GetList(accPartnerBalanceIDs
                        , "," + paramAllocation_Save.pProfitAmounts + ","
                        , "," + paramAllocation_Save.pLossAmounts + ","
                        , WebSecurity.CurrentUserId);
                    JVID = cA_InvoiceAllocation_CreateJV.lstCVarA_InvoiceAllocation_CreateJV[0].JV_ID;
                }
                #endregion
                return new object[] {
                _result, pAccPartnerBalanceID,JVID
            };
            }

        }


        [HttpGet, HttpPost]
        public object[] ARUpdateCashInvoicePaid(string pAllocationItemsIDs, string pAmounts)
        {
            bool _result = false;
            string pUpdateList = "";
            Exception checkException = null;
            var ArrAmounts = pAmounts.Split(',');
            var ArrAllocationItemsIDs = pAllocationItemsIDs.Split(',');
            Int32 NumberOfInvoicesAllocated = pAllocationItemsIDs.Split(',').Count();
            CInvoices objCInvoices = new CInvoices();

            for (int i = 0; i < NumberOfInvoicesAllocated; i++)
            {
                if (checkException == null)
                {
                    _result = true;

                    pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) + " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                    pUpdateList += " , RemainingAmount = (ISNULL(RemainingAmount,0) - " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                    pUpdateList += " WHERE ID = " + Int64.Parse(ArrAllocationItemsIDs[i]);
                    checkException = objCInvoices.UpdateList(pUpdateList);

                }
            }
            return new object[] {
                _result
            };
        }
        [HttpGet, HttpPost]
        public Object[] UnapprovingAllocations_IntializeData(string PartenertTypeID)
        {
            if (int.Parse(PartenertTypeID) != -1)
            {
                CvwAccPartners objCvwAccPartnersAll = new CvwAccPartners();
                objCvwAccPartnersAll.GetList("where PartnerTypeID = " + int.Parse(PartenertTypeID) + "");
                return new Object[] { new JavaScriptSerializer().Serialize(objCvwAccPartnersAll.lstCVarvwAccPartners) };
            }
            else
            {

                CNoAccessPartnerTypes noAccessPartnerTypes = new CNoAccessPartnerTypes();
                CCurrencies currencies = new CCurrencies();
                noAccessPartnerTypes.GetList("Where 1 = 1");
                currencies.GetList("Where 1 = 1");
                return new Object[] { new JavaScriptSerializer().Serialize(noAccessPartnerTypes.lstCVarNoAccessPartnerTypes), new JavaScriptSerializer().Serialize(currencies.lstCVarCurrencies) };
            }
        }

        [HttpGet, HttpPost]
        public object[] vwAccPartnerBalanceUnapproving_LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwAccPartnerBalance_Unapproving partnerBalance_Unapproving = new CvwAccPartnerBalance_Unapproving();
            Int32 _RowCount = 0;
            partnerBalance_Unapproving.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(partnerBalance_Unapproving.lstCVarvwAccPartnerBalance_Unapproving), _RowCount };
        }
        [HttpGet, HttpPost]
        public object[] vwA_PayableAllocation_Unapproving_LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            Exception checkException = null;
            CvwA_PayableAllocation_Unapproving vwA_PayableAllocation_Unapproving = new CvwA_PayableAllocation_Unapproving();
            Int32 _RowCount = 0;
            checkException= vwA_PayableAllocation_Unapproving.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(vwA_PayableAllocation_Unapproving.lstCVarvwA_PayableAllocation_Unapproving), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] UnapprovingAllocations_Unpost(String IDs, String JVIDs, String InvoicePaymentDetailsIDs, String Amounts, String InvoiceIDs)
        {
            bool _result = false;
            Exception checkException =null;
            var Message = "";
            try
            {
                CA_VoucherInvoicesPayment  objCA_VoucherInvoicesPayment = new CA_VoucherInvoicesPayment();
                objCA_VoucherInvoicesPayment.GetList("Where AccPartnerBalanceID IN(" + IDs + ")");
                if (objCA_VoucherInvoicesPayment.lstCVarA_VoucherInvoicesPayment.Count > 0)
                    Message = "UnApprove failed invoice paid from cash or check payment ";

                if(Message == "")
                {
                    CA_JV cA_JV = new CA_JV();
                    var pUpdateClause = "Where ID IN(" + JVIDs + ")";
                    checkException = cA_JV.DeleteList(pUpdateClause);
                    pUpdateClause = "";
                    //------------------------------- -----------------------------------------------
                    CAccPartnerBalance cAccPartnerBalance = new CAccPartnerBalance();
                    pUpdateClause = "Where ID IN(" + IDs + ")";
                    checkException = cAccPartnerBalance.DeleteList(pUpdateClause);
                    pUpdateClause = "";
                    //-------------------------------------------------------------------------------
                    CAccInvoicePaymentDetails cAccInvoicePaymentDetails = new CAccInvoicePaymentDetails();
                    pUpdateClause = "Where ID IN(" + InvoicePaymentDetailsIDs + ")";
                    checkException = cAccInvoicePaymentDetails.DeleteList(pUpdateClause);

                    //---------------------------------------------------------------------------------

                    _result = true;
                    var AmountList = Amounts.Split(',');
                    var InvoiceIDList = InvoiceIDs.Split(',');
                    for (int i = 0; i < AmountList.Length; i++)
                    {
                        var pUpdateList = "";
                        CInvoices objCInvoices = new CInvoices();
                        pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) - " + decimal.Parse(AmountList[i]).ToString() + ")";
                        pUpdateList += " , RemainingAmount = (ISNULL(RemainingAmount,0) + " + decimal.Parse(AmountList[i]).ToString() + ")";
                        pUpdateList += " WHERE ID = " + Int64.Parse(InvoiceIDList[i]);
                        checkException = objCInvoices.UpdateList(pUpdateList);

                    }
                }




                if (checkException != null)
                {
                    Message = checkException.Message;
                    _result = false;

                }
                else if (Message != "")
                {
                    _result = false;
                }
                else
                {
                    Message = "";
                    _result = true;

                }




            }
            catch (Exception ex)
            {

                Message = ex.Message;

            }





            return new object[] { _result, Message };
        }


        [HttpGet, HttpPost]
        public object[] UnapprovingPayableAllocations_Unpost(String A_PayableAllocationIDs)
        {
            bool _result = false;
            var Message = "";
            try
            {
                CSystemOptions objCSystemOptions = new CSystemOptions();
                objCSystemOptions.GetList(" Where OptionID = 188 and OptionValue = 0");// Option Value 0 mean Remove jv

                Boolean RemoveJV = (objCSystemOptions.lstCVarSystemOptions.Count > 0 ? true : false);

                for (int cnt = 0; cnt < A_PayableAllocationIDs.Split(',').Length; cnt++)
                {
                    CA_PayablesAllocation objCA_PayablesAllocationPayableID = new CA_PayablesAllocation();
                    objCA_PayablesAllocationPayableID.GetList(" Where ID = " + A_PayableAllocationIDs.Split(',')[cnt]);

                    CPayables objCPayablesCurrency = new CPayables();
                    objCPayablesCurrency.GetList(" Where ID = " + objCA_PayablesAllocationPayableID.lstCVarA_PayablesAllocation[0].PayableID + "");

                    CA_PayablesAllocation objCA_PayablesAllocationCurrency = new CA_PayablesAllocation();
                    objCA_PayablesAllocationCurrency.GetList(" Where PayableID = " + objCA_PayablesAllocationPayableID.lstCVarA_PayablesAllocation[0].PayableID + " AND PartnerBalanceIDs = '" + objCA_PayablesAllocationPayableID.lstCVarA_PayablesAllocation[0].PartnerBalanceIDs + "' AND CurrencyID = " + objCPayablesCurrency.lstCVarPayables[0].CurrencyID);

                    CPayables objCPayables = new CPayables();
                    var pUpdateList = " PaidAmount = (ISNULL(PaidAmount,0) - " + objCA_PayablesAllocationCurrency.lstCVarA_PayablesAllocation[0].AmountDue + ")";
                    pUpdateList += " WHERE ID IN (" + objCA_PayablesAllocationPayableID.lstCVarA_PayablesAllocation[0].PayableID + ")";
                    objCPayables.UpdateList(pUpdateList);
                }

                CA_PayablesAllocation objCA_PayablesAllocationRelatedIDs = new CA_PayablesAllocation();
                objCA_PayablesAllocationRelatedIDs.GetList(" Where ID IN(" + A_PayableAllocationIDs + ")");
                //var checkException;
                for (int i = 0; i < objCA_PayablesAllocationRelatedIDs.lstCVarA_PayablesAllocation.Count; i++)
                {
                    CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
                    CAccPartnerBalance objCAccPartnerBalanceDelete = new CAccPartnerBalance();
                    objCAccPartnerBalance.GetList(" Where ID IN( " + objCA_PayablesAllocationRelatedIDs.lstCVarA_PayablesAllocation[i].PartnerBalanceIDs + ")");
                    CA_JV objCA_JV = new CA_JV();
                    objCA_JV.GetList(" Where ID = " + objCA_PayablesAllocationRelatedIDs.lstCVarA_PayablesAllocation[i].JV_ID);
                    CA_JV objCA_JVDelete = new CA_JV();
                    CA_JVDetails objCA_JVDetails = new CA_JVDetails();
                    for (int j = 0; j < objCA_JV.lstCVarA_JV.Count; j++)
                    {
                        objCA_JVDetails.GetList(" Where JV_ID = " + objCA_JV.lstCVarA_JV[j].ID);
                    }
                    CA_JVDetails objCA_JVDetailsDelete = new CA_JVDetails();
                    RemoveJV = true;
                    if (RemoveJV)
                    {
                        foreach (var currentID in objCAccPartnerBalance.lstCVarAccPartnerBalance)
                        {
                            objCAccPartnerBalanceDelete.lstDeletedCPKAccPartnerBalance.Add(new CPKAccPartnerBalance() { ID = currentID.ID });
                        }
                        objCAccPartnerBalanceDelete.DeleteItem(objCAccPartnerBalanceDelete.lstDeletedCPKAccPartnerBalance);

                        foreach (var currentID in objCA_JVDetails.lstCVarA_JVDetails)
                        {
                            objCA_JVDetailsDelete.lstDeletedCPKA_JVDetails.Add(new CPKA_JVDetails() { ID = currentID.ID });
                        }
                        objCA_JVDetailsDelete.DeleteItem(objCA_JVDetailsDelete.lstDeletedCPKA_JVDetails);

                        foreach (var currentID in objCA_JV.lstCVarA_JV)
                        {
                            objCA_JVDelete.lstDeletedCPKA_JV.Add(new CPKA_JV() { ID = currentID.ID });
                        }
                        objCA_JVDelete.DeleteItem(objCA_JVDelete.lstDeletedCPKA_JV);

                        CA_PayablesAllocation objCA_PayablesAllocation = new CA_PayablesAllocation();

                        //pUpdateClause = "";
                        var pUpdateClause = " WHERE PayableAllocationID IN(SELECT PayableAllocationID FROM A_PayablesAllocation WHERE ID IN(" + A_PayableAllocationIDs + ") AND PayableAllocationID IS NOT NULL)";
                        var checkException = objCA_PayablesAllocation.DeleteList(pUpdateClause);

                        pUpdateClause = "Where ID IN(" + objCA_PayablesAllocationRelatedIDs.lstCVarA_PayablesAllocation[i].ID + ")";
                        objCA_PayablesAllocation.DeleteList(pUpdateClause);


                        //for(int cnt=0; cnt < A_PayableAllocationIDs.Split(',').Length; cnt++)
                        //{
                        //    CA_PayablesAllocation objCA_PayablesAllocationPayableID = new CA_PayablesAllocation();
                        //    objCA_PayablesAllocationPayableID.GetList(" Where ID = "+ A_PayableAllocationIDs.Split(',')[cnt]);

                        //    CPayables objCPayables = new CPayables();
                        //    var pUpdateList = " PaidAmount = (ISNULL(PaidAmount,0) - " + objCA_PayablesAllocationPayableID.lstCVarA_PayablesAllocation[0].AmountDue + ")";
                        //    pUpdateList += " WHERE ID IN (" + objCA_PayablesAllocationPayableID.lstCVarA_PayablesAllocation[0].PayableID  + ")";
                        //    checkException = objCPayables.UpdateList(pUpdateList);
                        //}


                    }
                    else //OPPOSITE jv
                    {

                    }
                }


                //--------------------------------------------------------------------------------
                _result = true;

                //if (checkException != null)
                //{
                //    Message = checkException.Message;
                //    _result = false;
                //}
                //else
                //{
                //    Message = "";
                //    _result = true;
                //}

            }
            catch (Exception ex)
            {
                Message = ex.Message;
            }
            return new object[] { _result, Message };
        }

        #endregion ARAllocation


        public Int32 GetPartnerID(Int32 pCheckedPartnerTypeID, Int32 pReceivedPartnerTypeID, Int32 pPartnerID)
        {
            if (pCheckedPartnerTypeID == pReceivedPartnerTypeID)
                return pPartnerID;
            else
                return 0;

        }
    }

    public class ParamAllocation_Save
    {
        public Int32 pPartnerID { get; set; }
        public Int32 pPartnerTypeID { get; set; }
        public string pPartnerName { get; set; }
        public Int32 pBranchID { get; set; }
        public string pAllocationItemsIDs { get; set; }
        public string pInvoiceNumbers { get; set; }
        public string pPartnerIDList { get; set; }
        public string pPartnerTypeIDList { get; set; }
        public string pCharge { get; set; }
        public string pOperationCode { get; set; }
        public string pAmounts { get; set; }
        public string pItemCurrencyIDs { get; set; }
        public string pItemCurrencyCodes { get; set; }
        public string pBalanceCurrencyCodes { get; set; }
        public string pExchangeRates { get; set; }
        public string pBalCurLocalExRates { get; set; }
        public string pInvCurLocalExRates { get; set; }
        public Int32 pTransactionType { get; set; }
        public string pBalanceCurrencyIDs { get; set; }

        public string pProfitAmounts { get; set; }
        public string pLossAmounts { get; set; }
        public string pAccNoteID { get; set; }
        public string pAllocationCreditIDs { get; set; }
        public Int32 pVoucherID { get; set; }
        public Int32 pVoucherTypeID { get; set; }



    }
}
