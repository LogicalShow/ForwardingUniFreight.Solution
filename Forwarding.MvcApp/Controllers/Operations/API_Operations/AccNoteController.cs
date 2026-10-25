using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.CustomizedSPCall;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.AccNote.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class AccNoteController : ApiController
    {
   
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwAccNote objCvwAccNote = new CvwAccNote();
            //objCvwAccNote.GetList(pWhereClause);
            Int32 _RowCount = 0;
            objCvwAccNote.GetListPaging(10000, 1, pWhereClause, "ID DESC", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCvwAccNote.lstCVarvwAccNote) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            //COperations objCOperations = new COperations();
            //objCOperations.GetListPaging(2000, 1, "WHERE CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-12,0) ", " ID DESC ", out _RowCount);
            CvwOperationsWithMinimalColumns objCOperations = new CvwOperationsWithMinimalColumns();
            //objCOperations.GetListPaging(2000, 1, "WHERE 1=1 ", " ID DESC ", out _RowCount);

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            objCvwAccPartners.GetListFilter(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CNoAccessPaymentType objCNoAccessPaymentType = new CNoAccessPaymentType();
            objCNoAccessPaymentType.GetList(" WHERE IsInactive=0 ORDER BY Name ");

            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            //objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "BED")
            {
                objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0  and id NOT IN ( SELECT a.CostCenterID FROM A_LinkOperationWithCostCenter a JOIN Operations AS o ON o.ID=a.OperationID WHERE o.OperationStageID IN(110,120))", "Name, Code", out _RowCount);

            }
            else
            {
                objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            }


            CvwInvoices objCvwInvoices = new CvwInvoices();
            objCvwInvoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            CvwAccNote objCvwAccNote = new CvwAccNote();
            objCvwAccNote.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

        

            return new Object[] {
                serializer.Serialize(objCvwAccNote.lstCVarvwAccNote)
                , _RowCount
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners) : null  //data[2]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCOperations.lstCVarvwOperationsWithMinimalColumns) : null  //data[3]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwInvoices.lstCVarvwInvoices) : null  //data[4]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes) : null //data[5]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) : null //data[6]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //data[7]

            };
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedTax(bool pIsLoadArrayOfObjects, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            //COperations objCOperations = new COperations();
            //objCOperations.GetListPaging(2000, 1, "WHERE CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-12,0) ", " ID DESC ", out _RowCount);
            CvwOperationsWithMinimalColumns objCOperations = new CvwOperationsWithMinimalColumns();
            //objCOperations.GetListPaging(2000, 1, "WHERE 1=1 ", " ID DESC ", out _RowCount);

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            objCvwAccPartners.GetListFilter(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CNoAccessPaymentType objCNoAccessPaymentType = new CNoAccessPaymentType();
            objCNoAccessPaymentType.GetList(" WHERE IsInactive=0 ORDER BY Name ");

            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            //objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "BED")
            {
                objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0  and id NOT IN ( SELECT a.CostCenterID FROM A_LinkOperationWithCostCenter a JOIN Operations AS o ON o.ID=a.OperationID WHERE o.OperationStageID IN(110,120))", "Name, Code", out _RowCount);

            }
            else
            {
                objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            }


            CvwInvoicesTax objCvwInvoices = new CvwInvoicesTax();
            objCvwInvoices.GetListPaging(pPageSize, pPageNumber, "WHERE IsDeleted=0 and IsApproved = 1", pOrderBy, out _RowCount);

            CvwAccNoteTax objCvwAccNote = new CvwAccNoteTax();
            objCvwAccNote.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);



            return new Object[] {
                serializer.Serialize(objCvwAccNote.lstCVarvwAccNoteTax)
                , _RowCount
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners) : null  //data[2]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCOperations.lstCVarvwOperationsWithMinimalColumns) : null  //data[3]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwInvoices.lstCVarvwInvoices) : null  //data[4]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes) : null //data[5]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) : null //data[6]
              , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //data[7]

            };
        }

        [HttpGet, HttpPost]
        public object[] Insert(string pSelectedItemsIDs, Int32 pNoteType, DateTime pNoteDate, Int64 pOperationID, Int64 pOperationPartnerID, Int64 pInvoiceID, Int64 pAddressID, string pPrintedAddress, Int32 pCurrencyID, decimal pExchangeRate, decimal pAmountWithoutVAT, Int32 pTaxTypeID, decimal pTaxPercentage, decimal pTaxAmount, Int32 pDiscountTypeID, decimal pDiscountPercentage, decimal pDiscountAmount, decimal pAmount /*, decimal pPaidAmount, decimal pRemainingAmount*/, Int32 pNoteStatusID, string pRemarks, string pPartnerVatNumber = "0", bool pIsTaxTypeNote = false)
        {
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName);

            bool _result = false;
            Exception checkException = null;
            CVarAccNote objCVarAccNote = new CVarAccNote();
            int constTransactionDebitNote = 90; //DebitNote
            int constTransactionCreditNote = 100; //CreditNote

            CInvoices objCInvoices = new CInvoices();
            if (IsMescoCompany && pNoteType == constTransactionCreditNote)
            {
                var objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                objCA_PaymentRequestDetails.GetList($"WHERE PayableID IN ({pSelectedItemsIDs})");
                if(objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                {
                    return new object[] { _result, 0 };
                }
                Exception exc = objCInvoices.GetItem(pInvoiceID);
                if(exc != null || objCInvoices.lstCVarInvoices.Count == 0)
                {
                    return new object[] { _result, 0 };
                }
            }

            objCVarAccNote.Code = "0";
            objCVarAccNote.NoteType = pNoteType;
            objCVarAccNote.NoteDate = pNoteDate;
            objCVarAccNote.OperationID = pOperationID;
            objCVarAccNote.OperationPartnerID = pOperationPartnerID;
            objCVarAccNote.InvoiceID = pInvoiceID;
            objCVarAccNote.AddressID = pAddressID;
            objCVarAccNote.PrintedAddress = "0";
            objCVarAccNote.CurrencyID = pCurrencyID;
            objCVarAccNote.ExchangeRate = pExchangeRate;
            objCVarAccNote.AmountWithoutVAT = pAmountWithoutVAT;
            objCVarAccNote.TaxTypeID = pTaxTypeID;
            objCVarAccNote.TaxPercentage = pTaxPercentage;
            objCVarAccNote.TaxAmount = pTaxAmount;
            objCVarAccNote.DiscountTypeID = pDiscountTypeID;
            objCVarAccNote.DiscountPercentage = pDiscountPercentage;
            objCVarAccNote.DiscountAmount = pDiscountAmount;
            objCVarAccNote.Amount = pAmount;
            //objCVarAccNote.PaidAmount = pPaidAmount;
            //objCVarAccNote.RemainingAmount = pRemainingAmount;
            objCVarAccNote.NoteStatusID = pNoteStatusID;
            objCVarAccNote.Remarks = pRemarks == null ? "0" : pRemarks;
            objCVarAccNote.CreatorUserID = objCVarAccNote.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarAccNote.CreationDate = objCVarAccNote.ModificationDate = DateTime.Now;
            objCVarAccNote.PartnerVATNumber = pPartnerVatNumber;
            objCVarAccNote.IsTaxTypeNote = pIsTaxTypeNote;

            if (IsMescoCompany && pNoteType == constTransactionCreditNote)
            {
                objCVarAccNote.PartnerVATNumber = objCInvoices.lstCVarInvoices[0].PartnerVATNumber;
            }

            CAccNote objCAccNote = new CAccNote();
            objCAccNote.lstCVarAccNote.Add(objCVarAccNote);
            checkException = objCAccNote.SaveMethod(objCAccNote.lstCVarAccNote);
            if (checkException == null)
            {
                _result = true;
                #region Set Items to the AccNoteID
                string[] strArraySelectedItemsIDs = pSelectedItemsIDs.Split(',');
                string pWhereClause = "";
                string pUpdateClause = "";
                pWhereClause = " WHERE ID = " + strArraySelectedItemsIDs[0]; //i am sure i have at least 1 row(building the first part of the where clause, then use OR incase of more than 1 house)
                for (int i = 1; i < strArraySelectedItemsIDs.Length; i++)
                    pWhereClause += " OR ID = " + strArraySelectedItemsIDs[i];
                pUpdateClause = " AccNoteID = '" + objCAccNote.lstCVarAccNote[0].ID + "' ";
                pUpdateClause += " , ExchangeRate = ROUND((SELECT ExchangeRate FROM AccNote WHERE ID=" + objCAccNote.lstCVarAccNote[0].ID + "),2,1)";
                //pUpdateClause += " , OperationID = " + pOperationID;
                //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                //pUpdateClause += " , ModificationDate = GETDATE() ";
                pUpdateClause += pWhereClause;
                if (pNoteType == constTransactionDebitNote)
                {
                    CReceivables objCReceivables = new CReceivables();
                    checkException = objCReceivables.UpdateList(pUpdateClause);
                }
                else if (pNoteType == constTransactionCreditNote)
                {
                    CPayables objCPayables = new CPayables();
                    checkException = objCPayables.UpdateList(pUpdateClause);
                }
                #endregion Set Items to the AccNoteID
                #region Update AccNote totals at server side to fix any connection problem
                if (pNoteType == constTransactionDebitNote)// Receivable Without VAT
                {
                    //SET AmountWithoutVAT
                    pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(SaleAmount) FROM Receivables WHERE AccNoteID = " + objCVarAccNote.ID.ToString() + " AND IsDeleted=0),2,1)";
                    pUpdateClause += " WHERE ID = " + objCVarAccNote.ID.ToString();
                    checkException = objCAccNote.UpdateList(pUpdateClause);

                    //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                    pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2,1)";
                    pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2,1)";
                    pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)),2,1)";
                    pUpdateClause += " WHERE ID = " + objCVarAccNote.ID.ToString();
                    checkException = objCAccNote.UpdateList(pUpdateClause);
                }
                else if (pNoteType == constTransactionCreditNote)// Payable Without VAT 
                {
                    //SET AmountWithoutVAT
                    if(IsMescoCompany)
                        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(CASE WHEN ISNULL(CostAmount,0) = 0 THEN ISNULL(QuotationCost,0) ELSE ISNULL(CostAmount,0)) FROM Payables WHERE AccNoteID = " + objCVarAccNote.ID.ToString() + " AND IsDeleted=0),2,1)";
                    else
                        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(CostAmount) FROM Payables WHERE AccNoteID = " + objCVarAccNote.ID.ToString() + " AND IsDeleted=0),2,1)";
                    pUpdateClause += " WHERE ID = " + objCVarAccNote.ID.ToString();
                    checkException = objCAccNote.UpdateList(pUpdateClause);
                    //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                    pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2,1)";
                    pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2,1)";
                    pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)),2,1)";
                    pUpdateClause += " WHERE ID = " + objCVarAccNote.ID.ToString();
                    checkException = objCAccNote.UpdateList(pUpdateClause);
                }   
                #endregion Update AccNote totals at server side to fix any connection problem
            } //of checkException == null
            return new object[] { _result, objCAccNote.lstCVarAccNote[0].ID };
        }

        [HttpGet, HttpPost]
        public object[] Update(Int64 pAccNoteID, Int32 pAccNoteType, Int64 pOperationID, Int64 pInvoiceID, Int64 pOperationPartnerID, Int64 pAddressID, string pNoteDate, Int32 pTaxTypeID, decimal pTaxPercentage, Int32 pDiscountTypeID, decimal pDiscountPercentage, Int32 pCurrencyID, decimal pExchangeRate, string pRemarks, string pSelectedItemIDsToRemove, string pPartnerVatNumber = "0")
        {
            bool _result = false;
            Exception checkException = null;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _);
            string pUpdateClause = "";
            int constTransactionDebitNote = 90; //DebitNote (i.e. Receivable)
            int constTransactionCreditNote = 100; //CreditNote (i.e. Payable)
            int _RowCount = 0;
            CvwAccNote objCvwAccNote = new CvwAccNote();

            int _TempRowCount = 0;
            CAccNote objCAccNote_IsPosted = new CAccNote();
            objCAccNote_IsPosted.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pAccNoteID, "ID", out _TempRowCount);
            if (objCAccNote_IsPosted.lstCVarAccNote.Count == 0) //not posted so save
            {
                #region Update removed items if any
                if (pSelectedItemIDsToRemove != null)
                {
                    pUpdateClause = " AccNoteID = NULL ";
                    pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    pUpdateClause += " , ModificationDate = GETDATE() ";
                    pUpdateClause += " WHERE ID IN (" + pSelectedItemIDsToRemove + ")";
                    if (pAccNoteType == constTransactionDebitNote)
                    {
                        CReceivables objCReceivables = new CReceivables();
                        checkException = objCReceivables.UpdateList(pUpdateClause);
                    }
                    else if (pAccNoteType == constTransactionCreditNote)//CreditNote i.e. Payable
                    {
                        CPayables objCPayables = new CPayables();
                        checkException = objCPayables.UpdateList(pUpdateClause);
                    }
                }
                #endregion Update removed items if any

                if (checkException == null) //update AccNote amount
                {
                    CAccNote objCAccNotes = new CAccNote();

                    pUpdateClause = " InvoiceID = " + (pInvoiceID == 0 ? " NULL " : pInvoiceID.ToString());
                    pUpdateClause += " , OperationPartnerID = " + (pOperationPartnerID == 0 ? " NULL " : pOperationPartnerID.ToString());
                    pUpdateClause += " , AddressID = " + (pAddressID == 0 ? " NULL " : pAddressID.ToString());
                    pUpdateClause += " , NoteDate = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pNoteDate, 1) + "'";
                    if (pAccNoteType == constTransactionDebitNote)
                        pUpdateClause += " , AmountWithoutVAT = ROUND((SELECT SUM(SaleAmount) FROM Receivables WHERE AccNoteID = " + pAccNoteID.ToString() + " AND IsDeleted=0),2,1)";
                    else //Payable
                        pUpdateClause += " , AmountWithoutVAT = ROUND((SELECT SUM(CostAmount) FROM Payables WHERE AccNoteID = " + pAccNoteID.ToString() + " AND IsDeleted=0),2,1)";
                    pUpdateClause += " , TaxTypeID = " + (pTaxTypeID == 0 ? " NULL " : pTaxTypeID.ToString());
                    pUpdateClause += " , TaxPercentage = " + (pTaxPercentage == 0 ? " NULL " : pTaxPercentage.ToString());
                    pUpdateClause += " , DiscountTypeID = " + (pDiscountTypeID == 0 ? " NULL " : pDiscountTypeID.ToString());
                    pUpdateClause += " , DiscountPercentage = " + (pDiscountPercentage == 0 ? " NULL " : pDiscountPercentage.ToString());
                    pUpdateClause += " , CurrencyID = " + (pCurrencyID == 0 ? " NULL " : pCurrencyID.ToString());
                    pUpdateClause += " , ExchangeRate = " + (pExchangeRate == 0 ? " NULL " : pExchangeRate.ToString());
                    pUpdateClause += " , Remarks = " + (pRemarks == "0" ? " NULL " : "'" + pRemarks.ToString() + "'");
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "LATT")
                    {
                        pUpdateClause += " , PartnerVATNumber = " + (pPartnerVatNumber == "0" ? " NULL " : "'" + pPartnerVatNumber.ToString() + "'");
                    }
                    pUpdateClause += " WHERE ID = " + pAccNoteID.ToString();
                    checkException = objCAccNotes.UpdateList(pUpdateClause);

                    //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                    pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2)";
                    pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)";
                    pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2) - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)  ),2)";
                    pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    pUpdateClause += " , ModificationDate = GETDATE() ";
                    pUpdateClause += " WHERE ID = " + pAccNoteID.ToString();
                    checkException = objCAccNotes.UpdateList(pUpdateClause);
                }

                if (checkException == null)
                {
                    _result = true;
                    #region Update ExchangeRate for Payables/Receivables
                    pUpdateClause = " ExchangeRate = ROUND((SELECT ExchangeRate FROM AccNote WHERE ID=" + pAccNoteID.ToString() + "),2,1)";
                    pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    pUpdateClause += " , ModificationDate = GETDATE() ";
                    pUpdateClause += " WHERE AccNoteID =" + pAccNoteID.ToString();
                    if (pAccNoteType == constTransactionDebitNote)
                    {
                        CReceivables objCReceivables = new CReceivables();
                        checkException = objCReceivables.UpdateList(pUpdateClause);
                    }
                    else if (pAccNoteType == constTransactionCreditNote)//CreditNote i.e. Payable
                    {
                        CPayables objCPayables = new CPayables();
                        checkException = objCPayables.UpdateList(pUpdateClause);
                    }
                    #endregion Update ExchangeRate for Payables/Receivables
                    objCvwAccNote.GetListPaging(2500, 1, "WHERE OperationID=" + pOperationID + " OR MasterOperationID=" + pOperationID, "ID", out _RowCount);
                    #region update AccPartnerBalance
                    //pUpdateClause = "PartnerTypeID=" + pPartnerTypeID.ToString();
                    //pUpdateClause += " , CustomerID=" + GetPartnerID(1, pPartnerTypeID, pPartnerID);
                    //pUpdateClause += " , AgentID=" + GetPartnerID(2, pPartnerTypeID, pPartnerID);
                    //pUpdateClause += " , ShippingAgentID=" + GetPartnerID(3, pPartnerTypeID, pPartnerID);
                    //pUpdateClause += " , CustomsClearanceAgentID=" + GetPartnerID(4, pPartnerTypeID, pPartnerID);
                    //pUpdateClause += " , ShippingLineID=" + GetPartnerID(5, pPartnerTypeID, pPartnerID);
                    //pUpdateClause += " , AirlineID=" + GetPartnerID(6, pPartnerTypeID, pPartnerID);
                    //pUpdateClause += " , TruckerID=" + GetPartnerID(7, pPartnerTypeID, pPartnerID);
                    //pUpdateClause += " , SupplierID=" + GetPartnerID(8, pPartnerTypeID, pPartnerID);
                    //pUpdateClause += " , DebitAmount=" + pAmount;
                    //pUpdateClause += " , CurrencyID=" + pCurrencyID;
                    //pUpdateClause += " , ExchangeRate=" + pExchangeRate;
                    //pUpdateClause += " , BalCurLocalExRate=" + pExchangeRate;
                    //pUpdateClause += " , InvCurLocalExRate=" + pExchangeRate;
                    //pUpdateClause += " , Notes=N'Action from Invoices.'";
                    //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    //pUpdateClause += " , ModificationDate = GETDATE() ";
                    //pUpdateClause += " WHERE InvoiceID=" + pInvoiceID + " AND InvoicePaymentDetailsID IS NULL ";
                    //CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
                    //objCAccPartnerBalance.UpdateList(pUpdateClause);
                    //////for case of remove i recalculate
                    ////pUpdateClause = " Amount = ISNULL(AmountWithoutVAT, 0) + ISNULL(TaxAmount, 0) - ISNULL(DiscountAmount, 0)";
                    ////pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    ////pUpdateClause += " , ModificationDate = GETDATE() ";
                    ////pUpdateClause += " WHERE ID = " + pInvoiceID.ToString();
                    ////checkException = objCInvoices.UpdateList(pUpdateClause);
                    #endregion update AccPartnerBalance
                }
            } //if (objCAccNote_IsPosted.lstCVarAccNote.Count == 0) //not posted so save
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccNote.lstCVarvwAccNote) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] AddItems(Int64 pAccNoteID, Int32 pAccNoteType, Int64 pOperationID, Int64 pInvoiceID, Int64 pOperationPartnerID, Int64 pAddressID, string pNoteDate, Int32 pTaxTypeID, decimal pTaxPercentage, Int32 pDiscountTypeID, decimal pDiscountPercentage, Int32 pCurrencyID, decimal pExchangeRate, string pRemarks, string pSelectedItemsIDs)
        {
            bool _result = false;
            Exception checkException = null;
            string pUpdateClause = "";
            string pWhereClause = "";
            int constTransactionDebitNote = 90; //DebitNote (i.e. Receivable)
            int constTransactionCreditNote = 100; //CreditNote (i.e. Payable)
            int _RowCount = 0;
            CvwAccNote objCvwAccNote = new CvwAccNote();

            int _TempRowCount = 0;
            CAccNote objCAccNote_IsPosted = new CAccNote();
            objCAccNote_IsPosted.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID=" + pAccNoteID, "ID", out _TempRowCount);
            if (objCAccNote_IsPosted.lstCVarAccNote.Count == 0) //not posted so save
            {
                foreach (var currentID in pSelectedItemsIDs.Split(','))
                {
                    //i am sure i ve at least 1 selectedItemID isa
                    pWhereClause += (pWhereClause == "" ? " WHERE ID = " + currentID.ToString()
                        : " OR ID = " + currentID.ToString());
                }
                #region Update Added Items
                pUpdateClause = " AccNoteID = " + pAccNoteID.ToString();
                pUpdateClause += " , ExchangeRate = ROUND((SELECT ExchangeRate FROM AccNote WHERE ID=" + pAccNoteID.ToString() + "),2,1)";
                pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                pUpdateClause += " , ModificationDate = GETDATE() ";
                pUpdateClause += pWhereClause;
                if (pAccNoteType == constTransactionDebitNote)
                {
                    CReceivables objCReceivables = new CReceivables();
                    checkException = objCReceivables.UpdateList(pUpdateClause);
                }
                else if (pAccNoteType == constTransactionCreditNote)//CreditNote i.e. Payable
                {
                    CPayables objCPayables = new CPayables();
                    checkException = objCPayables.UpdateList(pUpdateClause);
                }
                #endregion Update Added Items
                if (checkException == null) //update AccNote amount
                {
                    CAccNote objCAccNotes = new CAccNote();

                    pUpdateClause = " InvoiceID = " + (pInvoiceID == 0 ? " NULL " : pInvoiceID.ToString());
                    pUpdateClause += " , OperationPartnerID = " + (pOperationPartnerID == 0 ? " NULL " : pOperationPartnerID.ToString());
                    pUpdateClause += " , AddressID = " + (pAddressID == 0 ? " NULL " : pAddressID.ToString());
                    //pUpdateClause += " , CurrencyID = " + (pCurrencyID == 0 ? " NULL " : pCurrencyID.ToString());
                    //pUpdateClause += " , ExchangeRate = " + (pExchangeRate == 0 ? " NULL " : pExchangeRate.ToString());
                    //pUpdateClause += " , NoteDate = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pNoteDate, 1) + "'";
                    if (pAccNoteType == constTransactionDebitNote)
                        pUpdateClause += " , AmountWithoutVAT = ROUND((SELECT SUM(SaleAmount) FROM Receivables WHERE AccNoteID = " + pAccNoteID.ToString() + " AND IsDeleted=0),2,1)";
                    else //Payable
                        pUpdateClause += " , AmountWithoutVAT = ROUND((SELECT SUM(CostAmount) FROM Payables WHERE AccNoteID = " + pAccNoteID.ToString() + " AND IsDeleted=0),2,1)";
                    pUpdateClause += " , TaxTypeID = " + (pTaxTypeID == 0 ? " NULL " : pTaxTypeID.ToString());
                    pUpdateClause += " , TaxPercentage = " + (pTaxPercentage == 0 ? " NULL " : pTaxPercentage.ToString());
                    pUpdateClause += " , DiscountTypeID = " + (pDiscountTypeID == 0 ? " NULL " : pDiscountTypeID.ToString());
                    pUpdateClause += " , DiscountPercentage = " + (pDiscountPercentage == 0 ? " NULL " : pDiscountPercentage.ToString());
                    pUpdateClause += " , CurrencyID = " + (pCurrencyID == 0 ? " NULL " : pCurrencyID.ToString());
                    pUpdateClause += " , ExchangeRate = " + (pExchangeRate == 0 ? " NULL " : pExchangeRate.ToString());
                    pUpdateClause += " , Remarks = " + (pRemarks == "0" ? " NULL " : "'" + pRemarks.ToString() + "'");
                    pUpdateClause += " WHERE ID = " + pAccNoteID.ToString();
                    checkException = objCAccNotes.UpdateList(pUpdateClause);

                    //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                    pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2,1)";
                    pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2,1)";
                    pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)),2,1)";
                    pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    pUpdateClause += " , ModificationDate = GETDATE() ";
                    pUpdateClause += " WHERE ID = " + pAccNoteID.ToString();
                    checkException = objCAccNotes.UpdateList(pUpdateClause);
                }
                if (checkException == null)
                {
                    _result = true;
                    objCvwAccNote.GetListPaging(2500, 1, "WHERE OperationID=" + pOperationID + " OR MasterOperationID=" + pOperationID, "ID", out _RowCount);
                }
            } //if (objCAccNote_IsPosted.lstCVarAccNote.Count == 0) //not posted so save
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwAccNote.lstCVarvwAccNote) : null
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pAccNotesIDs)
        {
            bool _result = false;
            Exception checkException = null;
            string[] strArrayAccNotesIDs = pAccNotesIDs.Split(',');
            string pWhereClause = "";
            string pUpdateClause = "";

            int _TempRowCount = 0;
            CAccNote objCAccNote_IsPosted = new CAccNote();
            objCAccNote_IsPosted.GetListPaging(999999, 1, "WHERE IsApproved=1 AND ID IN(" + pAccNotesIDs + ")", "ID", out _TempRowCount);
            if (objCAccNote_IsPosted.lstCVarAccNote.Count == 0) //not posted so save
            {

                pWhereClause = " WHERE AccNoteID = " + strArrayAccNotesIDs[0]; //i am sure i have at least 1 row(building the first part of the where clause, then use OR incase of more than 1 house)
                for (int i = 1; i < strArrayAccNotesIDs.Length; i++)
                    pWhereClause += " OR AccNoteID = " + strArrayAccNotesIDs[i];

                pUpdateClause = " AccNoteID = NULL ";
                //pUpdateClause = " IsDeleted = 1 ";
                //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                //pUpdateClause += " , ModificationDate = GETDATE() ";

                pUpdateClause += pWhereClause;

                CReceivables objCReceivables = new CReceivables();
                checkException = objCReceivables.UpdateList(pUpdateClause);
                CPayables objCPayables = new CPayables();
                checkException = objCPayables.UpdateList(pUpdateClause);

                CAccNote objCAccNotes = new CAccNote();
                pWhereClause = " WHERE ID = " + strArrayAccNotesIDs[0]; //i am sure i have at least 1 row(building the first part of the where clause, then use OR incase of more than 1 house)
                objCAccNotes.DeleteList("WHERE ID IN (" + pAccNotesIDs + ")");
                //for (int i = 1; i < strArrayAccNotesIDs.Length; i++)
                //    pWhereClause += " OR ID = " + strArrayAccNotesIDs[i];
                //pUpdateClause = " IsDeleted = 1 ";
                //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                //pUpdateClause += " , ModificationDate = GETDATE() ";
                //pUpdateClause += pWhereClause;

                //checkException = objCAccNotes.UpdateList(pUpdateClause);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }
                else //deleted successfully
                    _result = true;
                #region Update AccPartnerBalance
                //{
                //    CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
                //    pUpdateClause = "IsDeleted = 1";
                //    pUpdateClause += " , Notes=N'Action from AccNotes.' ";
                //    pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                //    pUpdateClause += " , ModificationDate = GETDATE() ";
                //    pUpdateClause += " WHERE AccNoteID = " + strArrayAccNotesIDs[0];
                //    for (int i = 1; i < strArrayAccNotesIDs.Length; i++)
                //        pUpdateClause += " OR AccNoteID = " + strArrayAccNotesIDs[i];
                //    checkException = objCAccPartnerBalance.UpdateList(pUpdateClause);
                //}
                #endregion Update AccPartnerBalance
            } //if (objCAccNote_IsPosted.lstCVarAccNote.Count == 0) //not posted so save

            return _result;
        }

        [HttpPost, HttpGet]
        public object ApproveOrUnApprove(string pIDsToSetApproval, bool pIsApprove, Int32 pCostCenterID, string pWhereClause, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            string pUpdateClause = "";
            var ArrAccNoteIDs = pIDsToSetApproval.Split(',');
            int NumberOfAccNotes = ArrAccNoteIDs.Count();
            CAccNote objCAccNotes = new CAccNote();
            CvwAccNote objCvwAccNotes = new CvwAccNote();
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
            int _RowCount = 0;
            int constTransactionDebitNote = 90; //DebitNote (i.e. Receivables)
            int constTransactionCreditNote = 100; //CreditNote (i.e. Payables)
            int pAccNoteType = 0;

            CDefaults objCDefaults = new CDefaults();
            checkException = objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            CAccNote objCAccNote = new CAccNote();
           // objCvwAccNotes.GetListPaging(1, 1, ("WHERE ID=" + pIDsToSetApproval.Split(',')), "ID", out _RowCount);

            string _ReturnedMessage = "";
            /********************************************Must be just 1 row*********************************************/
            #region Call ERP JV Entry
            CGroups objCGroups = new CGroups();
            objCGroups.GetList("WHERE GroupImageURL=N'Accounting'");
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            if (!objCGroups.lstCVarGroups[0].IsInactive)
            {
                CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();

                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MES")
                {
                    DataTable dtSubmitInvoice = new DataTable();

                    dtSubmitInvoice = objCCustomizedDBCall.ExecuteQuery_DataTable("select ID from ResponseToSubmitInvoice_DebitCredit where  InvoiceID in (" + pIDsToSetApproval + ")");

                    if (dtSubmitInvoice.Rows.Count > 0)
                        _ReturnedMessage = "Credit Note Already Submit To Portal ,UnApprove Disabled";

                    if(_ReturnedMessage == "")
                    {
                        for (int i = 0; i < ArrAccNoteIDs.Length; i++)
                        {
                            objCAccNote.GetList("Where ID= " + ArrAccNoteIDs[i].ToString());
                            pAccNoteType = objCAccNote.lstCVarAccNote[0].NoteType;

                            checkException = objCCustomizedDBCall.Mesco_Invoice_Posting((pAccNoteType == constTransactionDebitNote ? "Mesco_DebitNote_Posting" : "Mesco_CreditNote_Posting"), Convert.ToInt32(ArrAccNoteIDs[i]), WebSecurity.CurrentUserId, pIsApprove);

                        }

                    }

                }
				else if(objCDefaults.lstCVarDefaults[0].MultiChargeAcc_Posting){
                    for (int i = 0; i < ArrAccNoteIDs.Length; i++)
                    {
                        objCAccNote.GetList("Where ID= " + ArrAccNoteIDs[i].ToString());
                        pAccNoteType = objCAccNote.lstCVarAccNote[0].NoteType;
                        checkException = objCCallCustomizedSP.CallCustomizedSP((pAccNoteType == constTransactionDebitNote ? "ERP_ForwWeb_MultiChargeAcc_PostingDebitNote" : "ERP_ForwWeb_MultiChargeAcc_PostingCreditNote"), Int64.Parse(ArrAccNoteIDs[i]), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);
                    }
                  }
				else
                {
                    for (int i = 0; i < ArrAccNoteIDs.Length; i++)
                    {
                        objCAccNote.GetList("Where ID= " + ArrAccNoteIDs[i].ToString());
                        pAccNoteType = objCAccNote.lstCVarAccNote[0].NoteType;
                        checkException = objCCallCustomizedSP.CallCustomizedSP((pAccNoteType == constTransactionDebitNote ? "ERP_ForwWeb_PostingDebitNote" : "ERP_ForwWeb_PostingCreditNote"), Int64.Parse(ArrAccNoteIDs[i]), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);

                    }

                }

                CSystemOptions objCSystemOptions = new CSystemOptions();
                objCSystemOptions.GetList("Where OptionID= 195");
                if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue && checkException == null)
                {
                    checkException = Fleet_Forwarding_AccNote.ApproveOrUnApprove_Fleet_Forwarding_AccNote(pIDsToSetApproval, pIsApprove, WebSecurity.CurrentUserId);
                }
            }
            #endregion Call ERP JV Entry
            if (checkException == null && _ReturnedMessage == "")
            {
                for (int i = 0; i < NumberOfAccNotes; i++)
                {
                    //update AccNotes to requested Approval/UnApproval
                    pUpdateClause = " IsApproved = " + (pIsApprove ? "1" : "0");
                    pUpdateClause += " ,ApprovingUserID = " + WebSecurity.CurrentUserId;
                    pUpdateClause += " ,ModificatorUserID = " + WebSecurity.CurrentUserId;
                    pUpdateClause += " ,ModificationDate = GETDATE() ";
                    pUpdateClause += " WHERE ID=" + ArrAccNoteIDs[i];
                    checkException = objCAccNotes.UpdateList(pUpdateClause);
                    if (checkException == null) //add to or remove from AccPartnerBalance according to pIsApprove
                    {
                        checkException = objCAccPartnerBalance.DeleteList("WHERE AccNoteID=" + ArrAccNoteIDs[i]);
                        if (pIsApprove)
                        {
                            #region Add to PartnerBalance table
                            {

                                objCvwAccNotes.GetListPaging(1, 1, ("WHERE ID=" + ArrAccNoteIDs[i]), "ID", out _RowCount);
                                pAccNoteType = objCvwAccNotes.lstCVarvwAccNote[0].NoteType;

                                CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                                objCVarAccPartnerBalance.AccNoteID = Int64.Parse(ArrAccNoteIDs[i]);
                                objCVarAccPartnerBalance.PartnerTypeID = objCvwAccNotes.lstCVarvwAccNote[0].PartnerTypeID;
                                objCVarAccPartnerBalance.CustomerID = GetPartnerIDForInsert(1, objCvwAccNotes.lstCVarvwAccNote[0].PartnerTypeID, objCvwAccNotes.lstCVarvwAccNote[0].PartnerID);
                                objCVarAccPartnerBalance.AgentID = GetPartnerIDForInsert(2, objCvwAccNotes.lstCVarvwAccNote[0].PartnerTypeID, objCvwAccNotes.lstCVarvwAccNote[0].PartnerID);
                                objCVarAccPartnerBalance.ShippingAgentID = GetPartnerIDForInsert(3, objCvwAccNotes.lstCVarvwAccNote[0].PartnerTypeID, objCvwAccNotes.lstCVarvwAccNote[0].PartnerID);
                                objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerIDForInsert(4, objCvwAccNotes.lstCVarvwAccNote[0].PartnerTypeID, objCvwAccNotes.lstCVarvwAccNote[0].PartnerID);
                                objCVarAccPartnerBalance.ShippingLineID = GetPartnerIDForInsert(5, objCvwAccNotes.lstCVarvwAccNote[0].PartnerTypeID, objCvwAccNotes.lstCVarvwAccNote[0].PartnerID);
                                objCVarAccPartnerBalance.AirlineID = GetPartnerIDForInsert(6, objCvwAccNotes.lstCVarvwAccNote[0].PartnerTypeID, objCvwAccNotes.lstCVarvwAccNote[0].PartnerID);
                                objCVarAccPartnerBalance.TruckerID = GetPartnerIDForInsert(7, objCvwAccNotes.lstCVarvwAccNote[0].PartnerTypeID, objCvwAccNotes.lstCVarvwAccNote[0].PartnerID);
                                objCVarAccPartnerBalance.SupplierID = GetPartnerIDForInsert(8, objCvwAccNotes.lstCVarvwAccNote[0].PartnerTypeID, objCvwAccNotes.lstCVarvwAccNote[0].PartnerID);
                                if (pAccNoteType == constTransactionDebitNote)
                                    objCVarAccPartnerBalance.DebitAmount = objCvwAccNotes.lstCVarvwAccNote[0].Amount;
                                else
                                    objCVarAccPartnerBalance.CreditAmount = objCvwAccNotes.lstCVarvwAccNote[0].Amount;
                                objCVarAccPartnerBalance.CurrencyID = objCvwAccNotes.lstCVarvwAccNote[0].CurrencyID;
                                objCVarAccPartnerBalance.ExchangeRate = objCvwAccNotes.lstCVarvwAccNote[0].ExchangeRate;// decimal.Parse(ArrExchangeRates[i]); ///////////////////////////////////
                                objCVarAccPartnerBalance.BalCurLocalExRate = objCvwAccNotes.lstCVarvwAccNote[0].ExchangeRate; ///////////////////////////////////
                                objCVarAccPartnerBalance.InvCurLocalExRate = objCvwAccNotes.lstCVarvwAccNote[0].ExchangeRate; ///////////////////////////////////
                                objCVarAccPartnerBalance.TransactionType = pAccNoteType;
                                objCVarAccPartnerBalance.Notes = (pAccNoteType == constTransactionCreditNote ? "Credit" : "Debit") + " Note Approval on Op." + objCvwAccNotes.lstCVarvwAccNote[0].OperationCode;
                                objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.mModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;

                                objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                                checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);

                            }
                            #endregion Add to PartnerBalance table
                        } //of else i.e. pIsApprove = true
                    }
                } //of the for loop
            }//JV Entry succesful
            else
            {
                _result = false;
                if (checkException != null)
                    _ReturnedMessage = checkException.Message;
            }
            if (checkException == null )
            {
                _result = true;
                objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            }

            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwAccNotes.lstCVarvwAccNote)
                , _result ? "" : _ReturnedMessage
            };
        } //of fn
        [HttpPost, HttpGet]

        public object ApproveOrUnApproveTax(string pIDsToSetApproval, bool pIsApprove, Int32 pCostCenterID, string pWhereClause, Int32 pAccountIDCharge, Int32 pSubAccountCharge, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            string pUpdateClause = "";
            var ArrAccNoteIDs = pIDsToSetApproval.Split(',');
            int NumberOfAccNotes = ArrAccNoteIDs.Count();
            CAccNote objCAccNotes = new CAccNote();
            CvwAccNote objCvwAccNotes = new CvwAccNote();
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
            int _RowCount = 0;
            int constTransactionDebitNote = 90; //DebitNote (i.e. Receivables)
            int constTransactionCreditNote = 100; //CreditNote (i.e. Payables)
            int pAccNoteType = 0;
            objCvwAccNotes.GetListPaging(1, 1, ("WHERE ID=" + pIDsToSetApproval.Split(',')[0]), "ID", out _RowCount);
            pAccNoteType = objCvwAccNotes.lstCVarvwAccNote[0].NoteType;
            /********************************************Must be just 1 row*********************************************/

         
            if (checkException == null)
            {
                _result = true;
                objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            }

            #region Tax
            int _RowCount2 = 0;

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
            {
                CTaxLink objCTaxLink = new CTaxLink();
                CTaxLink objCTaxLinkInvoices = new CTaxLink();
                CTaxLink objCTaxLinOperationPartners = new CTaxLink();
                CTaxLink objCTaxLinReceivables = new CTaxLink();
                CTaxLink objCTaxLinkFOUND = new CTaxLink();

                int NumberOfAccNotesTax = ArrAccNoteIDs.Count();
                for (int i = 0; i < NumberOfAccNotesTax; i++)
                {
                    objCAccNotes.GetList("WHERE ID=" + ArrAccNoteIDs[i]);


                    objCTaxLinkFOUND.GetList("WHERE Notes='AccNote' and jvid is NOT null and OriginID=" + ArrAccNoteIDs[i]);
                    objCTaxLink.GetList("WHERE Notes='AccNote' and jvid is null and OriginID=" + ArrAccNoteIDs[i]);

                    if (objCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFOUND.lstCVarTaxLink.Count == 0)
                    {
                        //link
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + ArrAccNoteIDs[i] + "," + 0 + "," + "AccNote");
                        objCTaxLink.GetList("where jvid is null and notes='AccNote' and OriginID =" + ArrAccNoteIDs[i]);


                    }
                    else if (objCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFOUND.lstCVarTaxLink.Count > 0)
                    {
                        objCTaxLink.GetList("where jvid is null and notes='AccNote' and OriginID =" + ArrAccNoteIDs[i]);

                    }
                    else if (pIsApprove==false)
                    {
                        objCTaxLink.GetList("where jvid is not null and notes='AccNote' and OriginID =" + ArrAccNoteIDs[i]);
                    }
                    #region Call ERP JV Entry
                    CGroups objCGroups1 = new CGroups();
                    objCGroups1.GetList("WHERE GroupImageURL=N'Accounting'");
                    if (!objCGroups1.lstCVarGroups[0].IsInactive)
                    {
                        CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                        //checkException = objCCallCustomizedSP.CallCustomizedSP((pAccNoteType == constTransactionDebitNote ? "ERP_ForwWeb_PostingDebitNoteTax" : "ERP_ForwWeb_PostingCreditNoteTax"), Int64.Parse(ArrAccNoteIDs[0]), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);
                        checkException = objCCallCustomizedSP.CallCustomizedSPTax((objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionDebitNote ? "ERP_ForwWeb_PostingDebitNoteTax" : "ERP_ForwWeb_PostingCreditNoteTax"), (objCTaxLink.lstCVarTaxLink.Count > 0 ? objCTaxLink.lstCVarTaxLink[0].OriginID : 0), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID, pAccountIDCharge, pSubAccountCharge);

                    }
                    #endregion Call ERP JV Entry

                    #region
                    //if (objCAccNotes.lstCVarAccNote.Count > 0 && pIsApprove && objCTaxLink.lstCVarTaxLink.Count == 0)
                    //{
                    //    string[] strArraySelectedItemsIDs = pIDsToSetApproval.Split(',');
                    //    objCTaxLink.GetList("WHERE Notes='Operations' and  OriginID=" + objCAccNotes.lstCVarAccNote[0].OperationID);
                    //    objCTaxLinOperationPartners.GetList("WHERE Notes='OperationPartners' and OriginID=" + objCAccNotes.lstCVarAccNote[0].OperationPartnerID);
                    //    objCTaxLinkInvoices.GetList("WHERE Notes='Invoices' andOriginID=" + objCAccNotes.lstCVarAccNote[0].InvoiceID);
                    //    objCTaxLinReceivables.GetList("WHERE Notes='Receivables' and  OriginID=" + strArraySelectedItemsIDs[0]);



                    //    CVarAccNoteTax objCVarAccNoteTax = new CVarAccNoteTax();

                    //    objCVarAccNoteTax.Code = objCAccNotes.lstCVarAccNote[0].Code;
                    //    objCVarAccNoteTax.NoteType = objCAccNotes.lstCVarAccNote[0].NoteType;
                    //    objCVarAccNoteTax.NoteDate = objCAccNotes.lstCVarAccNote[0].NoteDate;
                    //    objCVarAccNoteTax.OperationID = objCTaxLink.lstCVarTaxLink.Count > 0 ? objCTaxLink.lstCVarTaxLink[0].TaxID : 0;
                    //    objCVarAccNoteTax.OperationPartnerID = objCTaxLinOperationPartners.lstCVarTaxLink[0].TaxID; ;
                    //    objCVarAccNoteTax.InvoiceID = objCTaxLinkInvoices.lstCVarTaxLink.Count > 0 ? objCTaxLinkInvoices.lstCVarTaxLink[0].TaxID : 0; ;
                    //    objCVarAccNoteTax.AddressID = 0;
                    //    objCVarAccNoteTax.PrintedAddress = "0";
                    //    objCVarAccNoteTax.CurrencyID = objCAccNotes.lstCVarAccNote[0].CurrencyID;
                    //    objCVarAccNoteTax.ExchangeRate = objCAccNotes.lstCVarAccNote[0].ExchangeRate;
                    //    objCVarAccNoteTax.AmountWithoutVAT = objCAccNotes.lstCVarAccNote[0].AmountWithoutVAT;
                    //    objCVarAccNoteTax.TaxTypeID = objCAccNotes.lstCVarAccNote[0].TaxTypeID;
                    //    objCVarAccNoteTax.TaxPercentage = objCAccNotes.lstCVarAccNote[0].TaxPercentage;
                    //    objCVarAccNoteTax.TaxAmount = objCAccNotes.lstCVarAccNote[0].TaxAmount;
                    //    objCVarAccNoteTax.DiscountTypeID = objCAccNotes.lstCVarAccNote[0].DiscountTypeID;
                    //    objCVarAccNoteTax.DiscountPercentage = objCAccNotes.lstCVarAccNote[0].DiscountPercentage;
                    //    objCVarAccNoteTax.DiscountAmount = objCAccNotes.lstCVarAccNote[0].DiscountAmount;
                    //    objCVarAccNoteTax.Amount = objCAccNotes.lstCVarAccNote[0].Amount;
                    //    //objCVarAccNote.PaidAmount = pPaidAmount;
                    //    //objCVarAccNote.RemainingAmount = pRemainingAmount;
                    //    objCVarAccNoteTax.NoteStatusID = objCAccNotes.lstCVarAccNote[0].NoteStatusID;
                    //    objCVarAccNoteTax.Remarks = objCAccNotes.lstCVarAccNote[0].Remarks == null ? "0" : objCAccNotes.lstCVarAccNote[0].Remarks;
                    //    objCVarAccNoteTax.CreatorUserID = objCAccNotes.lstCVarAccNote[0].CreatorUserID;
                    //    objCVarAccNoteTax.CreationDate = objCAccNotes.lstCVarAccNote[0].CreationDate;
                    //    objCVarAccNoteTax.ModificationDate = objCAccNotes.lstCVarAccNote[0].ModificationDate;

                    //    CAccNoteTax objCAccNoteTax = new CAccNoteTax();
                    //    objCAccNoteTax.lstCVarAccNoteTax.Add(objCVarAccNoteTax);
                    //    checkException = objCAccNoteTax.SaveMethod(objCAccNoteTax.lstCVarAccNoteTax);
                    //    if (checkException == null)
                    //    {
                    //        _result = true;
                    //        CReceivables objCReceivables = new CReceivables();
                    //        objCReceivables.GetList("WHERE AccNoteID=" + ArrAccNoteIDs[i]);
                    //        CPayables objCPayables = new CPayables();
                    //        objCPayables.GetList("WHERE AccNoteID=" + ArrAccNoteIDs[i]);

                    //        if (objCAccNotes.lstCVarAccNote[0].NoteType == 90)
                    //        {
                    //            if (objCReceivables.lstCVarReceivables.Count > 0)
                    //            {
                    //                for (int k = 0; k < objCReceivables.lstCVarReceivables.Count; k++)
                    //                {
                    //                    objCTaxLink.GetList("where OriginID =" + objCReceivables.lstCVarReceivables[k].ID);
                    //                    #region Set Items to the AccNoteID

                    //                    pWhereClause = "";
                    //                    pUpdateClause = "";
                    //                    pWhereClause = " WHERE ID = " + objCTaxLink.lstCVarTaxLink[0].TaxID; //i am sure i have at least 1 row(building the first part of the where clause, then use OR incase of more than 1 house)

                    //                    pUpdateClause = " AccNoteID = '" + objCVarAccNoteTax.ID + "' ";
                    //                    if (CompanyName == "CHM")
                    //                    {
                    //                        pUpdateClause += " , ExchangeRate = ROUND((SELECT ExchangeRate FROM ForwardingTransChemTax.dbo.AccNote WHERE ID=" + objCVarAccNoteTax.ID + "),2,1)";
                    //                    }
                    //                    else if (CompanyName == "OCE")
                    //                    {
                    //                        pUpdateClause += " , ExchangeRate = ROUND((SELECT ExchangeRate FROM ForwardingTROTax.dbo.AccNote WHERE ID=" + objCVarAccNoteTax.ID + "),2,1)";
                    //                    }
                    //                    //pUpdateClause += " , OperationID = " + pOperationID;
                    //                    //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    //                    //pUpdateClause += " , ModificationDate = GETDATE() ";
                    //                    pUpdateClause += pWhereClause;
                    //                    if (objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionDebitNote)
                    //                    {
                    //                        CReceivablesTax objCReceivablesTax = new CReceivablesTax();
                    //                        checkException = objCReceivablesTax.UpdateList(pUpdateClause);
                    //                    }
                    //                    else if (objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionCreditNote)
                    //                    {
                    //                        CPayablesTAX objCPayablesTax = new CPayablesTAX();
                    //                        checkException = objCPayablesTax.UpdateList(pUpdateClause);
                    //                    }
                    //                    #endregion Set Items to the AccNoteID
                    //                    #region Update AccNote totals at server side to fix any connection problem
                    //                    if (objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionDebitNote)// Receivable Without VAT
                    //                    {
                    //                        //SET AmountWithoutVAT
                    //                        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(SaleAmount) FROM Receivables WHERE AccNoteID = " + objCVarAccNoteTax.ID.ToString() + " AND IsDeleted=0),2,1)";
                    //                        pUpdateClause += " WHERE ID = " + objCVarAccNoteTax.ID.ToString();
                    //                        checkException = objCAccNoteTax.UpdateList(pUpdateClause);

                    //                        //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                    //                        pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2,1)";
                    //                        pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2,1)";
                    //                        pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)),2,1)";
                    //                        pUpdateClause += " WHERE ID = " + objCVarAccNoteTax.ID.ToString();
                    //                        checkException = objCAccNoteTax.UpdateList(pUpdateClause);
                    //                    }
                    //                    else if (objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionCreditNote)// Payable Without VAT 
                    //                    {
                    //                        //SET AmountWithoutVAT
                    //                        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(CostAmount) FROM Payables WHERE AccNoteID = " + objCVarAccNoteTax.ID.ToString() + " AND IsDeleted=0),2,1)";
                    //                        pUpdateClause += " WHERE ID = " + objCVarAccNoteTax.ID.ToString();
                    //                        checkException = objCAccNoteTax.UpdateList(pUpdateClause);
                    //                        //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                    //                        pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2,1)";
                    //                        pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2,1)";
                    //                        pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)),2,1)";
                    //                        pUpdateClause += " WHERE ID = " + objCVarAccNoteTax.ID.ToString();
                    //                        checkException = objCAccNoteTax.UpdateList(pUpdateClause);
                    //                    }
                    //                    #endregion Update AccNote totals at server side to fix any connection problem
                    //                    //link
                    //                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    //                    objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + ArrAccNoteIDs[i] + "," + objCVarAccNoteTax.ID + "," + "AccNote");

                    //                }
                    //                #region Call ERP JV Entry (They approve just one at a time)
                    //                CGroups objCGroups2 = new CGroups();
                    //                objCGroups2.GetList("WHERE GroupImageURL=N'Accounting'");
                    //                if (!objCGroups2.lstCVarGroups[0].IsInactive)
                    //                {
                    //                    CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                    //                    //checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDs("ERP_ForwWeb_PostingInvoiceTax", "," + objCVarAccNoteTax.ID + ",", WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);
                    //                    checkException = objCCallCustomizedSP.CallCustomizedSP((objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionDebitNote ? "ERP_ForwWeb_PostingDebitNoteTax" : "ERP_ForwWeb_PostingCreditNote"), objCVarAccNoteTax.ID, WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);

                    //                }
                    //                #endregion Call ERP JV Entry

                    //            }

                    //        }
                    //        else
                    //        {
                    //            if (objCPayables.lstCVarPayables.Count > 0)
                    //            {
                    //                for (int k = 0; k < objCPayables.lstCVarPayables.Count; k++)
                    //                {
                    //                    objCTaxLink.GetList("where OriginID =" + objCPayables.lstCVarPayables[k].ID);
                    //                    #region Set Items to the AccNoteID

                    //                    pWhereClause = "";
                    //                    pUpdateClause = "";
                    //                    pWhereClause = " WHERE ID = " + objCTaxLink.lstCVarTaxLink[0].TaxID; //i am sure i have at least 1 row(building the first part of the where clause, then use OR incase of more than 1 house)

                    //                    pUpdateClause = " AccNoteID = '" + objCVarAccNoteTax.ID + "' ";
                    //                    if (CompanyName == "CHM")
                    //                    {
                    //                        pUpdateClause += " , ExchangeRate = ROUND((SELECT ExchangeRate FROM ForwardingTransChemTax.dbo.AccNote WHERE ID=" + objCVarAccNoteTax.ID + "),2,1)";
                    //                    }
                    //                    else if (CompanyName == "OCE")
                    //                    {
                    //                        pUpdateClause += " , ExchangeRate = ROUND((SELECT ExchangeRate FROM ForwardingTROTax.dbo.AccNote WHERE ID=" + objCVarAccNoteTax.ID + "),2,1)";
                    //                    }
                    //                    //pUpdateClause += " , OperationID = " + pOperationID;
                    //                    //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    //                    //pUpdateClause += " , ModificationDate = GETDATE() ";
                    //                    pUpdateClause += pWhereClause;
                    //                    if (objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionDebitNote)
                    //                    {
                    //                        CReceivablesTax objCReceivablesTax = new CReceivablesTax();
                    //                        checkException = objCReceivablesTax.UpdateList(pUpdateClause);
                    //                    }
                    //                    else if (objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionCreditNote)
                    //                    {
                    //                        CPayablesTAX objCPayablesTax = new CPayablesTAX();
                    //                        checkException = objCPayablesTax.UpdateList(pUpdateClause);
                    //                    }
                    //                    #endregion Set Items to the AccNoteID
                    //                    #region Update AccNote totals at server side to fix any connection problem
                    //                    if (objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionDebitNote)// Receivable Without VAT
                    //                    {
                    //                        //SET AmountWithoutVAT
                    //                        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(SaleAmount) FROM Receivables WHERE AccNoteID = " + objCAccNotes.lstCVarAccNote[0].ID.ToString() + " AND IsDeleted=0),2,1)";
                    //                        pUpdateClause += " WHERE ID = " + objCVarAccNoteTax.ID.ToString();
                    //                        checkException = objCAccNoteTax.UpdateList(pUpdateClause);

                    //                        //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                    //                        pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2,1)";
                    //                        pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2,1)";
                    //                        pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)),2,1)";
                    //                        pUpdateClause += " WHERE ID = " + objCVarAccNoteTax.ID.ToString();
                    //                        checkException = objCAccNoteTax.UpdateList(pUpdateClause);
                    //                    }
                    //                    else if (objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionCreditNote)// Payable Without VAT 
                    //                    {
                    //                        //SET AmountWithoutVAT
                    //                        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(CostAmount) FROM Payables WHERE AccNoteID = " + objCAccNotes.lstCVarAccNote[0].ID.ToString() + " AND IsDeleted=0),2,1)";
                    //                        pUpdateClause += " WHERE ID = " + objCVarAccNoteTax.ID.ToString();
                    //                        checkException = objCAccNoteTax.UpdateList(pUpdateClause);
                    //                        //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                    //                        pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2,1)";
                    //                        pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2,1)";
                    //                        pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100) - (ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100)),2,1)";
                    //                        pUpdateClause += " WHERE ID = " + objCVarAccNoteTax.ID.ToString();
                    //                        checkException = objCAccNoteTax.UpdateList(pUpdateClause);
                    //                    }
                    //                    #endregion Update AccNote totals at server side to fix any connection problem

                    //                }
                    //                //link
                    //                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    //                objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + ArrAccNoteIDs[i] + "," + objCVarAccNoteTax.ID + "," + "AccNote");

                    //                #region Call ERP JV Entry (They approve just one at a time)
                    //                CGroups objCGroups2 = new CGroups();
                    //                objCGroups2.GetList("WHERE GroupImageURL=N'Accounting'");
                    //                if (!objCGroups2.lstCVarGroups[0].IsInactive)
                    //                {
                    //                    CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                    //                    //checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDs("ERP_ForwWeb_PostingInvoiceTax", "," + objCVarAccNoteTax.ID + ",", WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);
                    //                    checkException = objCCallCustomizedSP.CallCustomizedSP((objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionDebitNote ? "ERP_ForwWeb_PostingDebitNoteTax" : "ERP_ForwWeb_PostingCreditNoteTax"), objCVarAccNoteTax.ID, WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);

                    //                }
                    //                #endregion Call ERP JV Entry

                    //            }

                    //        }


                    //    } //of checkException == null


                    //}
                    //else if (objCTaxLink.lstCVarTaxLink.Count > 0)
                    //{
                    //    #region Call ERP JV Entry
                    //    CGroups objCGroups1 = new CGroups();
                    //    objCGroups1.GetList("WHERE GroupImageURL=N'Accounting'");
                    //    if (!objCGroups1.lstCVarGroups[0].IsInactive)
                    //    {
                    //        CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                    //        //checkException = objCCallCustomizedSP.CallCustomizedSP((pAccNoteType == constTransactionDebitNote ? "ERP_ForwWeb_PostingDebitNoteTax" : "ERP_ForwWeb_PostingCreditNoteTax"), Int64.Parse(ArrAccNoteIDs[0]), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);
                    //        checkException = objCCallCustomizedSP.CallCustomizedSP((objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionDebitNote ? "ERP_ForwWeb_PostingDebitNoteTax" : "ERP_ForwWeb_PostingCreditNoteTax"), (objCTaxLink.lstCVarTaxLink.Count > 0 ? objCTaxLink.lstCVarTaxLink[0].TaxID : 0), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);

                    //    }
                    //    #endregion Call ERP JV Entry
                    //}
                    //else if (objCTaxLinkFOUND.lstCVarTaxLink.Count > 0)
                    //{
                    //    #region Call ERP JV Entry
                    //    CGroups objCGroups1 = new CGroups();
                    //    objCGroups1.GetList("WHERE GroupImageURL=N'Accounting'");
                    //    if (!objCGroups1.lstCVarGroups[0].IsInactive)
                    //    {
                    //        CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                    //        //checkException = objCCallCustomizedSP.CallCustomizedSP((pAccNoteType == constTransactionDebitNote ? "ERP_ForwWeb_PostingDebitNoteTax" : "ERP_ForwWeb_PostingCreditNoteTax"), Int64.Parse(ArrAccNoteIDs[0]), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);
                    //        checkException = objCCallCustomizedSP.CallCustomizedSP((objCAccNotes.lstCVarAccNote[0].NoteType == constTransactionDebitNote ? "ERP_ForwWeb_PostingDebitNoteTax" : "ERP_ForwWeb_PostingCreditNoteTax"), (objCTaxLinkFOUND.lstCVarTaxLink.Count > 0 ? objCTaxLinkFOUND.lstCVarTaxLink[0].TaxID : 0), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);

                    //    }
                    //    #endregion Call ERP JV Entry
                    //}
                    #endregion


                }
                if (CompanyName == "CHM")
                {
                    //objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, "WHERE id not in(SELECT T.OriginID FROM ForwardingTransChemTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)", pOrderBy, out _RowCount);
                    objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, "WHERE 1=2", pOrderBy, out _RowCount);

                }
                else if (CompanyName == "OCE")
                {
                    //objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, "WHERE id not in(SELECT T.OriginID FROM ForwardingTROTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)", pOrderBy, out _RowCount);
                    objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, "WHERE 1=2", pOrderBy, out _RowCount);

                }
                else if (CompanyName == "EGL")
                {
                    //objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, "WHERE id not in(SELECT T.OriginID FROM ForwardingTROTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)", pOrderBy, out _RowCount);
                    objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, "WHERE 1=2", pOrderBy, out _RowCount);

                }
                else if (CompanyName == "SWI")
                {
                    //objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, "WHERE id not in(SELECT T.OriginID FROM ForwardingTROTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)", pOrderBy, out _RowCount);
                    objCvwAccNotes.GetListPaging(pPageSize, pPageNumber, "WHERE 1=2", pOrderBy, out _RowCount);

                }
                

            }


            #endregion
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwAccNotes.lstCVarvwAccNote)
                , _result ? "" : checkException.Message
            };
        } //of fn

        [HttpGet, HttpPost]
        public Object[] AccNoteApproval_PartnerTypeChanged(Int32 pPartnerTypeID, string pWhereClause, string pOrderBy, Int32 pPageNumber, Int32 pPageSize)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CvwAccNote objCvwAccNote = new CvwAccNote();

            if (pPartnerTypeID != 0)
                checkException = objCvwAccPartners.GetListPaging(10000, 1, "WHERE PartnerTypeID=" + pPartnerTypeID, "Name", out _RowCount);
            checkException = objCvwAccNote.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCvwAccNote.lstCVarvwAccNote)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwAccPartners.lstCVarvwAccPartners)
            };
        }

        [HttpGet, HttpPost]
        public Object[] CheckPayablesBeforeCreatingCreditNote(Int64 pInvoiceID, string pPayablesIDs)
        {
            int _RowCount = 0;
            Exception checkException = null;
            bool _HasError = false;
            string _message = "";

            CInvoices objCInvoices = new CInvoices();
            checkException = objCInvoices.GetItem(pInvoiceID);

            CPayables objCPayables = new CPayables();
            checkException = objCPayables.GetList($"WHERE ID IN ({pPayablesIDs})");

            CPayables objCPayable = new CPayables();
            CReceivables objCReceivables = new CReceivables();

            if (checkException != null)
            {
                _HasError = true;
                _message = "Error in getting invoice details.";
                return new object[]
                {
                    _HasError,
                    _message
                };
            }

            if(objCInvoices.lstCVarInvoices.Count == 1)
            {
                if (objCInvoices.lstCVarInvoices[0].IsDeleted == true)
                {
                    _HasError = true;
                    _message = "This is deleted invoice";
                    return new object[]
                    {
                        _HasError,
                        _message
                    };
                }
                if (objCInvoices.lstCVarInvoices[0].InvoiceTypeID == 9)
                {

                } else
                {
                    foreach (var payable in objCPayables.lstCVarPayables)
                    {
                        objCPayable.GetItem(payable.ID);
                        string tax = objCPayable.lstCVarPayables[0].TaxTypeID == 0 ? " TaxeTypeID IS NULL " : " TaxeTypeID = "+objCPayable.lstCVarPayables[0].TaxTypeID.ToString();
                        objCReceivables.GetList($"where InvoiceID={pInvoiceID} and ChargeTypeID={objCPayable.lstCVarPayables[0].ChargeTypeID} and CurrencyID={objCPayable.lstCVarPayables[0].CurrencyID} and CategoryID={objCPayable.lstCVarPayables[0].CategoryID} and {tax} and SaleAmount >= {objCPayable.lstCVarPayables[0].CostAmount}");
                        if (objCReceivables.lstCVarReceivables.Count == 0)
                        {
                            CChargeTypes objCChargeTypes = new CChargeTypes();
                            objCChargeTypes.GetItem(objCPayable.lstCVarPayables[0].ChargeTypeID);


                            _HasError = true;
                            _message = $"Please Check payable ({objCChargeTypes.lstCVarChargeTypes[0].Name}) exist in the selected invoice and have the same currency, same category, same VAT and cost is less than the receivable sale amount";
                            break;
                        }
                    }
                }
            }

            return new object[]
            {
                _HasError,
                _message
            };
        }

        public Int32 GetPartnerIDForInsert(Int32 pCheckedPartnerTypeIDForInsert, Int32 pReceivedPartnerTypeID, Int32 pPartnerID)
        {
            if (pCheckedPartnerTypeIDForInsert == pReceivedPartnerTypeID)
                return pPartnerID;
            else
                return 0;

        }

        [HttpGet, HttpPost]
        public object[] GenerateDebitNote_ForPayables(string pPayableIDs, int pOperationID)
        {

            Exception checkException = null;
            string _MsgError = "";

            //var amountsArray = pAmounts.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            //foreach (var amount in amountsArray)
            //{
            //    if (amount == "0" || !decimal.TryParse(amount, out _))
            //    {
            //        _MsgError = $"Invalid amount: '{amount}'";
            //    }
            //}

            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            COperations objCOperations = new COperations();
            CPayables objCPayables = new CPayables();

            checkException = objCPayables.GetList("WHERE ID IN (" + pPayableIDs + ")");
            checkException = objCA_PaymentRequestDetails.GetList("WHERE PayableID IN (" + pPayableIDs + ")");
            objCOperations.GetList("Where ID=" + pOperationID);

            //for (int i = 0; i < objCPayables.lstCVarPayables.Count; i++)
            //{
            //    if (objCPayables.lstCVarPayables[i].SupplierOperationPartnerID == 0)
            //        _MsgError = "No partner in details";
            //}

            if (objCOperations.lstCVarOperations[0].OperationStageID != 120)
                _MsgError = "Operation must be closed";
            if (objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                _MsgError = "Payable linked to payment request";



            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            if (_MsgError == "")
                checkException = objCCustomizedDBCall.CallProcFunction(" SP_GenerateDebitNote_ForPayables '" + pPayableIDs + "',"   + WebSecurity.CurrentUserId );

            if (checkException != null)
                _MsgError = checkException.Message;




            return new object[] {
                _MsgError //pData[0]
            };
        }
        [HttpGet, HttpPost]
        public object[] SetAccNoteStatus(string pnoteId, bool pisChecked)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            if(pisChecked)
             objCCustomizedDBCall.CallStringFunction("update AccNote set PaidAmount = Amount , NoteStatusID=2 where id="+ pnoteId);
            else
                objCCustomizedDBCall.CallStringFunction("update AccNote set PaidAmount = 0 , NoteStatusID=1 where id=" + pnoteId);


            string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                string insertQuery = "INSERT INTO AccNotesPaidStatusLog (AccNoteId, IsPaied, UserId,CreationDate) VALUES (@AccNoteId, @IsPaied, @UserId,@CreationDate)";
                using (SqlConnection connection = new SqlConnection(connectionString))
                using (SqlCommand command = new SqlCommand(insertQuery, connection))
                {
                    command.Parameters.AddWithValue("@AccNoteId", pnoteId);
                    command.Parameters.AddWithValue("@IsPaied", pisChecked);
                    command.Parameters.AddWithValue("@UserId", WebSecurity.CurrentUserId);
                    command.Parameters.AddWithValue("@CreationDate", DateTime.Now);

                    connection.Open();
                    command.ExecuteNonQuery();
                }
           var ACCCode =  objCCustomizedDBCall.CallStringFunction("select Code from AccNote where id=" + pnoteId);

            return new object[] {ACCCode ,  pisChecked };
        }
    }
}
