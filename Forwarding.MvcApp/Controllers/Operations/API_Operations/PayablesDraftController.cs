using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Linq;
using System.Web.Http;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated.Old;
using System.Reflection;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class PayablesDraftController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] InsertDraftPayableFromPayable(string pPayablesIDs, bool pT)
        {
            Exception exception = null;
            bool _result = false;
            if(pPayablesIDs == null)
            {
                pPayablesIDs = "";
            }
            string[] PayablesIDs = pPayablesIDs.Split(',');

            CPayables objCPayables = new CPayables();
            CPayablesDraft objCPayablesDraft = new CPayablesDraft();

            if(pPayablesIDs != "")
            {
                for (int i = 0; i < PayablesIDs.Length; i++)
                {
                    Int64 pID = Convert.ToInt64(PayablesIDs[i]);
                    exception = objCPayables.GetItem(pID);

                    if (exception == null && objCPayables.lstCVarPayables.Count > 0)
                    {
                        if (objCPayables.lstCVarPayables[0].AccNoteID != 0 || objCPayables.lstCVarPayables[0].IsApproved)
                        {
                            CPayablesDraft objCPayablesDraftCheckInvoices = new CPayablesDraft();
                            exception = objCPayablesDraftCheckInvoices.DeleteList($" WHERE OriginalPayableID = {objCPayables.lstCVarPayables[0].ID}");
                        }
                        CVarPayables Payable = objCPayables.lstCVarPayables[0];
                        CVarPayablesDraft PayableDraft = new CVarPayablesDraft();
                        foreach (PropertyInfo prop in Payable.GetType().GetProperties())
                        {
                            if (prop.Name != "ID" && prop.Name != "IsPurchased")
                            {
                                PayableDraft.GetType().GetProperty(prop.Name).SetValue(PayableDraft, prop.GetValue(Payable, null), null);
                            }
                        }
                        PayableDraft.OriginalPayableID = objCPayables.lstCVarPayables[0].ID;
                        PayableDraft.IsFinalApproved = false;
                        Exception ex = objCPayablesDraft.GetList($" WHERE OriginalPayableID = {objCPayables.lstCVarPayables[0].ID} AND ISNULL(IsFinalApproved,0)=0");
                        if (ex == null && objCPayablesDraft.lstCVarPayablesDraft.Count == 0)
                        {
                            objCPayablesDraft.lstCVarPayablesDraft.Add(PayableDraft);
                            exception = objCPayablesDraft.SaveMethod(objCPayablesDraft.lstCVarPayablesDraft);
                        }

                    }
                }
            }



            if (exception == null)
            {
                _result = true;
            }


            return new object[]
            {
                _result
            };
        }

        [HttpGet, HttpPost]
        public object[] Update(Int32 pSavedFrom, Int64 pOperationContainersAndPackagesID
            , Int64 pID, Int64 pOperationID, Int32 pChargeTypeID, int pPOrC, Int64 pSupplierOperationPartnerID, Int32 pMeasurementID
            , Int32 pContainerTypeID, decimal pQuantity, Decimal pCostPrice, decimal pAmountWithoutVAT, Int32 pTaxTypeID
            , decimal pTaxPercentage, decimal pTaxAmount, Int32 pDiscountTypeID, decimal pDiscountPercentage, decimal pDiscountAmount
            , Decimal pCostAmount, Decimal pInitialSalePrice, String pSupplierInvoiceNo, String pSupplierReceiptNo
            , DateTime pEntryDate, Int64 pBillID, DateTime pIssueDate, Decimal pExchangeRate, Int32 pCurrencyID, string pNotes
            , int pPartnerTypeID, int pPartnerID, Int64 pPayableBillTo, int pCategoryID, int pSupplierSiteID, Int64 pTruckingOrderID, int pQuotationRouteID = 0, bool pIsOfficial = false)//pPartnerTypeID,pPartnerID are to check uniqueness of supplier invoice No. in the controller
        {
            bool _result = false;
            string msgReturned = "";
            int _RowCount = 0;
            Exception checkException = null;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL" && pSupplierInvoiceNo != "0" && pSupplierInvoiceNo != "N/A")
                msgReturned = CheckSupplierInvoiceNumberUniqueness(pID/*, pSupplierOperationPartnerID*/, pSupplierInvoiceNo, pPartnerTypeID, pPartnerID, pCurrencyID);
            CPayablesDraft objCGetCreationInformation = new CPayablesDraft();
            CPayablesDraft objCPayables_CheckPosted = new CPayablesDraft();
            objCPayables_CheckPosted.GetListPaging(999999, 1, "WHERE IsApproved=0 AND ID=" + pID, "ID", out _RowCount);

            objCGetCreationInformation.GetItem(pID);

            CPurchasingInvoiceDetails objCPurchasingInvoiceDetails = new CPurchasingInvoiceDetails();
            objCPurchasingInvoiceDetails.GetList("where PayableID=" + objCGetCreationInformation.lstCVarPayablesDraft[0].OriginalPayableID);
            if (objCPurchasingInvoiceDetails.lstCVarPurchasingInvoiceDetails.Count > 0)
            {
                _result = false;
                msgReturned = "Payable In Purshase Invoice";
            }

            if (WebSecurity.CurrentUserName == "BISHOY DEIF" && msgReturned == "" && objCPayables_CheckPosted.lstCVarPayablesDraft.Count == 0)
            {
                checkException = objCPayables_CheckPosted.UpdateList("SupplierInvoiceNo=" + (pSupplierInvoiceNo == "0" ? "null" : ("N'" + pSupplierInvoiceNo + "'") + ",Notes= N'" + " updated by " + WebSecurity.CurrentUserName + " FROM ' + SupplierInvoiceNo ") + " WHERE ID=" + pID);
                if (checkException != null)
                    msgReturned = checkException.Message;
            }
            else
            if (msgReturned == "" && objCPayables_CheckPosted.lstCVarPayablesDraft.Count == 1)
            {
                CVarPayablesDraft objCVarPayablesDraft = new CVarPayablesDraft();
                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                objCVarPayablesDraft.CreatorUserID = objCGetCreationInformation.lstCVarPayablesDraft[0].CreatorUserID;
                objCVarPayablesDraft.CreationDate = objCGetCreationInformation.lstCVarPayablesDraft[0].CreationDate;
                objCVarPayablesDraft.GeneratingQRID = objCGetCreationInformation.lstCVarPayablesDraft[0].GeneratingQRID;
                objCVarPayablesDraft.ApprovingUserID = objCGetCreationInformation.lstCVarPayablesDraft[0].ApprovingUserID;
                objCVarPayablesDraft.CustodyID = objCGetCreationInformation.lstCVarPayablesDraft[0].CustodyID;
                objCVarPayablesDraft.SupplierReceiptNo = objCGetCreationInformation.lstCVarPayablesDraft[0].SupplierReceiptNo;
                objCVarPayablesDraft.PaidAmount = objCGetCreationInformation.lstCVarPayablesDraft[0].PaidAmount;
                objCVarPayablesDraft.RemainingAmount = objCGetCreationInformation.lstCVarPayablesDraft[0].RemainingAmount;
                objCVarPayablesDraft.AccNoteID = objCGetCreationInformation.lstCVarPayablesDraft[0].AccNoteID;
                objCVarPayablesDraft.JVID = objCGetCreationInformation.lstCVarPayablesDraft[0].JVID;
                objCVarPayablesDraft.JVID2 = objCGetCreationInformation.lstCVarPayablesDraft[0].JVID2;
                objCVarPayablesDraft.TransactionID = objCGetCreationInformation.lstCVarPayablesDraft[0].TransactionID;
                objCVarPayablesDraft.QuotationCost = objCGetCreationInformation.lstCVarPayablesDraft[0].QuotationCost;
                objCVarPayablesDraft.IsNeglectLimit = objCGetCreationInformation.lstCVarPayablesDraft[0].IsNeglectLimit;
                objCVarPayablesDraft.OfficialAmountPaid = objCGetCreationInformation.lstCVarPayablesDraft[0].OfficialAmountPaid;
                objCVarPayablesDraft.PricingID = objCGetCreationInformation.lstCVarPayablesDraft[0].PricingID;
                objCVarPayablesDraft.OperationVehicleID = objCGetCreationInformation.lstCVarPayablesDraft[0].OperationVehicleID;
                objCVarPayablesDraft.IsApproved = objCGetCreationInformation.lstCVarPayablesDraft[0].IsApproved;

                objCVarPayablesDraft.OperationContainersAndPackagesID = objCGetCreationInformation.lstCVarPayablesDraft[0].OperationContainersAndPackagesID;
                objCVarPayablesDraft.TruckingOrderID = objCGetCreationInformation.lstCVarPayablesDraft[0].TruckingOrderID;
                
                objCVarPayablesDraft.ID = pID;
                objCVarPayablesDraft.OperationID = pOperationID;
                objCVarPayablesDraft.ChargeTypeID = pChargeTypeID;
                objCVarPayablesDraft.POrC = pPOrC;
                objCVarPayablesDraft.ContainerTypeID = pContainerTypeID;
                objCVarPayablesDraft.MeasurementID = pMeasurementID;
                objCVarPayablesDraft.SupplierOperationPartnerID = pSupplierOperationPartnerID;
                objCVarPayablesDraft.Quantity = pQuantity == 0 ? 1 : pQuantity;
                objCVarPayablesDraft.OldCostPrice = objCGetCreationInformation.lstCVarPayablesDraft[0].CostPrice != pCostPrice ? objCGetCreationInformation.lstCVarPayablesDraft[0].CostPrice : objCGetCreationInformation.lstCVarPayablesDraft[0].OldCostPrice;
                objCVarPayablesDraft.CostPrice = pCostPrice;

                objCVarPayablesDraft.AmountWithoutVAT = pAmountWithoutVAT;
                objCVarPayablesDraft.TaxTypeID = pTaxTypeID;
                objCVarPayablesDraft.TaxPercentage = pTaxPercentage;
                objCVarPayablesDraft.TaxAmount = pTaxAmount;
                objCVarPayablesDraft.DiscountTypeID = pDiscountTypeID;
                objCVarPayablesDraft.DiscountPercentage = pDiscountPercentage;
                objCVarPayablesDraft.DiscountAmount = pDiscountAmount;

                objCVarPayablesDraft.CostAmount = pCostAmount; //total w VAT and Discount
                objCVarPayablesDraft.InitialSalePrice = pInitialSalePrice;
                objCVarPayablesDraft.SupplierInvoiceNo = pSupplierInvoiceNo;
                objCVarPayablesDraft.SupplierReceiptNo = pSupplierReceiptNo;
                objCVarPayablesDraft.EntryDate = pEntryDate;
                objCVarPayablesDraft.BillID = pBillID;
                objCVarPayablesDraft.IssueDate = pIssueDate;

                objCVarPayablesDraft.ExchangeRate = pExchangeRate;
                objCVarPayablesDraft.CurrencyID = pCurrencyID;
                objCVarPayablesDraft.BillTo = pPayableBillTo;
                objCVarPayablesDraft.CategoryID = pCategoryID;
                objCVarPayablesDraft.Notes = (pNotes == null ? "" : pNotes);

                objCVarPayablesDraft.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarPayablesDraft.ModificationDate = DateTime.Now;

                objCVarPayablesDraft.SupplierSiteID = pSupplierSiteID;
                objCVarPayablesDraft.IsOfficial = pIsOfficial;
                objCVarPayablesDraft.IsQuotationApproval = false;
                objCVarPayablesDraft.crmCode = objCGetCreationInformation.lstCVarPayablesDraft[0].crmCode;
                objCVarPayablesDraft.OriginalPayableID = objCGetCreationInformation.lstCVarPayablesDraft[0].OriginalPayableID;
                objCVarPayablesDraft.IsFinalApproved = false;
                CPayablesDraft objCPayablesDraft = new CPayablesDraft();
                objCPayablesDraft.lstCVarPayablesDraft.Add(objCVarPayablesDraft);
                checkException = objCPayablesDraft.SaveMethod(objCPayablesDraft.lstCVarPayablesDraft);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            }
            else //msg related to SupplierInvoiceNo returned
                _result = false;
            #region  Alarm for case of payables from quotation has cost increased
            if (msgReturned == ""
                && objCGetCreationInformation.lstCVarPayablesDraft[0].QuotationCost != 0
                && pAmountWithoutVAT > objCGetCreationInformation.lstCVarPayablesDraft[0].QuotationCost
                && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "BED")
            {
                string pAlarmReceiversIDs = "";
                string pSubject = "Payables Cost Increase";
                COperations objCOperations = new COperations();
                objCOperations.GetListPaging(999999, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
                string pBody = "Operation (" + objCOperations.lstCVarOperations[0].Code + ")"
                    + " has one or more payables cost increase than what was specified in the quotation.";
                CUsers objCUsers = new CUsers();
                objCUsers.GetListPaging(999999, 1, "WHERE ID=" + objCOperations.lstCVarOperations[0].SalesmanID /*+ " AND ID<>" + WebSecurity.CurrentUserId*/, "ID", out _RowCount);
                if (objCUsers.lstCVarUsers.Count > 0)
                    for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                        pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? objCUsers.lstCVarUsers[i].ID.ToString() : ("," + objCUsers.lstCVarUsers[i].ID);
                if (pAlarmReceiversIDs != "")
                    SendAlarmWithMinimalData(pAlarmReceiversIDs, pSubject, pBody);
            }
            #endregion  Alarm for case of payables from quotation has cost increased


            if (_result && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED" && pQuotationRouteID > 0)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                var ex = objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 0, ChargeEditApprovalLevel = 0, ChargeEdit1stApprovalUserID = NULL, ChargeEdit2ndApprovalUserID = NULL, ChargeEdit3rdApprovalUserID = NULL, ChargeEdit4thApprovalUserID = NULL where ID = {pQuotationRouteID}");
            }
            
            return new object[] { _result, msgReturned };
        }

        [HttpGet, HttpPost]
        public string CheckSupplierInvoiceNumberUniqueness(Int64 pID/*, Int64 pSupplierOperationPartnerID*/, String pSupplierInvoiceNo, int pPartnerTypeID, int pPartnerID, int pCurrencyID)
        {
            string msgReturned = "";
            int _RowCount = 0;
            CPayablesDraft objCPayablesDraft = new CPayablesDraft();
            objCPayablesDraft.GetListPaging(1, 1, "WHERE ID=" + pID, "ID", out _RowCount);

            CvwPayablesDraft objCvwPayablesDraft = new CvwPayablesDraft();
            string pWhereClause = "";
            pWhereClause += " WHERE (OperationID <> " + objCPayablesDraft.lstCVarPayablesDraft[0].OperationID + " \n"; //to allow repeating on same operation
            pWhereClause += " AND SupplierInvoiceNo = '" + pSupplierInvoiceNo + "'" + " \n";
            pWhereClause += " AND SupplierPartnerTypeID = " + pPartnerTypeID.ToString() + " \n"; ;
            pWhereClause += " AND PartnerSupplierID = " + pPartnerID.ToString() + " \n"; ;
            pWhereClause += " AND Year(IssueDate) = '" + objCPayablesDraft.lstCVarPayablesDraft[0].IssueDate.Year + "'" + " \n";
            pWhereClause += " AND ID <> " + pID + " \n";
            pWhereClause += ")" + " \n";
            pWhereClause += " OR (OperationID = " + objCPayablesDraft.lstCVarPayablesDraft[0].OperationID + " \n";
            pWhereClause += " AND SupplierInvoiceNo = '" + pSupplierInvoiceNo + "'" + " \n";
            pWhereClause += " AND SupplierPartnerTypeID = " + pPartnerTypeID.ToString() + " \n"; ;
            pWhereClause += " AND PartnerSupplierID = " + pPartnerID.ToString() + " \n"; ;
            pWhereClause += " AND CurrencyID <> '" + pCurrencyID + "'" + " \n";
            pWhereClause += " AND ID <> " + pID + " \n";
            pWhereClause += ")" + " \n";

            objCvwPayablesDraft.GetListPaging(3000, 1, pWhereClause, "ID", out _RowCount);

            if (objCvwPayablesDraft.lstCVarvwPayablesDraft.Count > 0)
                msgReturned = "Supplier Inv. '" + pSupplierInvoiceNo + "' is repeated for " + objCvwPayablesDraft.lstCVarvwPayablesDraft[0].PartnerSupplierName + " in Operation " + objCvwPayablesDraft.lstCVarvwPayablesDraft[0].OperationCode + ".";
            return msgReturned;
        }

        public static object[] SendAlarmWithMinimalData(string pAlarmReceiversIDs, string pSubject, string pBody)
        {
            Exception checkException = null;
            string _MessageReturned = "";
            //int _RowCount = 0;

            #region Sending Alarm
            if (pAlarmReceiversIDs != null)
            {
                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                objCVarEmail.Subject = pSubject;
                objCVarEmail.Body = pBody;
                objCVarEmail.QuotationRouteID = 0;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                if (checkException == null) //add to EmailReceivers
                {
                    var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                    var NoOfReceivers = pArrayOfReceiversIDs.Length;
                    for (int i = 0; i < NoOfReceivers; i++)
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                    }
                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                }
            }
            #endregion Sending Alarm

            return new object[]
            {
                _MessageReturned
            };
        }

        [HttpGet, HttpPost]
        public object[] UpdatePayablesFromPayableDrafts(string pPayableDraftIDs, bool pT, bool pR)
        {
            Exception exception = null;
            bool _result = false;
            bool IsHaveInvoice = false;
            if(pPayableDraftIDs == null)
            {
                pPayableDraftIDs = "";
            }

            string[] PayableIDs = pPayableDraftIDs.Split(',');

            CPayables objCPayables = new CPayables();
            CPayablesDraft objCPayablesDraft = new CPayablesDraft();


            if (pPayableDraftIDs != "")
            {
                for (int i = 0; i < PayableIDs.Length; i++)
                {
                    Int64 pID = Convert.ToInt64(PayableIDs[i]);
                    exception = objCPayablesDraft.GetItem(pID);
                    if (objCPayablesDraft.lstCVarPayablesDraft.Count > 0)
                    {
                        var checkP = new CPayables();
                        checkP.GetItem(objCPayablesDraft.lstCVarPayablesDraft[0].OriginalPayableID);
                        var checkP2 = new CA_PaymentRequestDetails();
                        checkP2.GetList($"WHERE PayableID={objCPayablesDraft.lstCVarPayablesDraft[0].OriginalPayableID}");

                        IsHaveInvoice = (checkP.lstCVarPayables.Count > 0 && (checkP.lstCVarPayables[0].AccNoteID != 0 || checkP.lstCVarPayables[0].IsApproved == true)) || checkP2.lstCVarA_PaymentRequestDetails.Count > 0 ? true : false;
                    }
                    if (exception == null && objCPayablesDraft.lstCVarPayablesDraft.Count > 0 && !IsHaveInvoice)
                    {
                        CVarPayables objCVarPayables = new CVarPayables();
                        CVarPayablesDraft DraftPay = objCPayablesDraft.lstCVarPayablesDraft[0];

                        foreach (PropertyInfo prop in DraftPay.GetType().GetProperties())
                        {
                            if (prop.Name != "ID" && prop.Name != "OriginalPayableID" && prop.Name != "QuotationCost" && prop.Name != "IsFinalApproved")
                            {
                                objCVarPayables.GetType().GetProperty(prop.Name).SetValue(objCVarPayables, prop.GetValue(DraftPay, null), null);
                            }
                        }

                        objCVarPayables.ID = DraftPay.OriginalPayableID;

                        CPayables objCPayablesOriginalPayableBeforeUpdate = new CPayables();

                        exception = objCPayablesOriginalPayableBeforeUpdate.GetItem(DraftPay.OriginalPayableID);

                        if (exception == null && objCPayablesOriginalPayableBeforeUpdate.lstCVarPayables.Count == 1)
                        {
                            if (objCPayablesOriginalPayableBeforeUpdate.lstCVarPayables[0].CostAmount == DraftPay.CostAmount)
                            {
                                objCVarPayables.QuotationCost = DraftPay.QuotationCost;
                            }
                            else
                            {
                                objCVarPayables.QuotationCost = DraftPay.CostAmount;
                            }
                        }
                        else if (exception == null && objCPayablesOriginalPayableBeforeUpdate.lstCVarPayables.Count == 0)
                        {
                            objCVarPayables.QuotationCost = DraftPay.CostAmount;
                        }

                        objCPayables.lstCVarPayables.Clear();
                        objCPayables.lstCVarPayables.Add(objCVarPayables);
                        exception = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                        if (exception == null && DraftPay.OriginalPayableID != 0)
                        {
                            //exception = objCPayablesDraft.DeleteList($" WHERE OriginalPayableID = {DraftPay.OriginalPayableID}");
                            exception = objCPayablesDraft.UpdateList($"IsFinalApproved=1 WHERE OriginalPayableID = {DraftPay.OriginalPayableID}");
                        }
                        else if (exception == null && DraftPay.OriginalPayableID == 0)
                        {
                            //exception = objCPayablesDraft.DeleteList($" WHERE ID = {DraftPay.ID}");
                            exception = objCPayablesDraft.UpdateList($"IsFinalApproved=1 WHERE ID = {DraftPay.ID}");
                        }


                    }
                    else if (exception == null && objCPayablesDraft.lstCVarPayablesDraft.Count > 0 && IsHaveInvoice)
                    {
                        exception = objCPayablesDraft.DeleteList($" WHERE OriginalPayableID = {objCPayablesDraft.lstCVarPayablesDraft[0].OriginalPayableID}");
                    }
                }
            }


            if (exception == null)
            {
                _result = true;
            }


            return new object[]
            {
                _result
            };
        }

        [HttpGet, HttpPost]
        public bool InsertDraftListWithoutValues(Int64 pOperationID, string pSelectedIDs, Int64 pQuotationRouteID, Int64 pOperationContainersAndPackagesID, Int64 pOperationVehicleID, Int64 pTruckingOrderID, string pQuotationChargeIDs = null, bool pUpdatedFromQuotation=false)
        {
            bool _result = false;
            string pWhereClause = "";

            int _RowCount = 0;
            int _CurrencyID = 0;
            decimal _ExchangeRate = 1;

            int _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            CChargeTypes objCChargeTypes = new CChargeTypes();



            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;


            ////building the where clause to select the rows from ChargeTypes
            //foreach (var currentID in pSelectedIDs.Split(','))
            //{
            //    //i am sure i ve at least 1 selectedID isa
            //    pWhereClause += (pWhereClause == "" ? " WHERE ID = " + currentID.ToString()
            //        : " OR ID = " + currentID.ToString());
            //}
            //those 2 lines are to get the Charge types from DB
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            #region set CurrencyID and ExchangeRate in case of AWB or not
            COperations objCOperations = new COperations();
            objCOperations.GetListPaging(99999, 1, "WHERE ID=" + pOperationID.ToString(), "ID", out _RowCount);
            CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
            if (objCOperations.lstCVarOperations[0].IsAWB)
            {
                string _OpenDate = "19000101";
                _OpenDate = objCOperations.lstCVarOperations[0].OpenDate.Year.ToString() + objCOperations.lstCVarOperations[0].OpenDate.Month.ToString().PadLeft(2, '0') + objCOperations.lstCVarOperations[0].OpenDate.Day.ToString().PadLeft(2, '0');
                objCvwCurrencyDetails.GetList("WHERE ID=" + objCOperations.lstCVarOperations[0].CurrencyID
                    + " AND '" + _OpenDate + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                    + " AND '" + _OpenDate + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                    );
                if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                {
                    _CurrencyID = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ID;
                    _ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                }
                else //Exchange Rate is not entered for the operation currency open date so put the default
                {
                    _CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                    _ExchangeRate = 1;
                }
            }
            else //not AWB
            {
                _CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                _ExchangeRate = 1;
            }
            #endregion set CurrencyID and ExchangeRate in case of AWB or not

            //those 2 lines are to get the Charge types from DB
            //objCChargeTypes.GetList(pWhereClause);
            pWhereClause += " WHERE ID IN (" + pSelectedIDs + ")";
            objCChargeTypes.GetListPaging(999999, 1, pWhereClause, "ID", out _RowCount);

            //   CPayables objCPayables = new CPayables();
            if (!string.IsNullOrEmpty(pSelectedIDs) && !string.IsNullOrEmpty(pQuotationChargeIDs) && objCChargeTypes.lstCVarChargeTypes.Count > 0)
            {
                CPayablesDraft objCPayablesDraft = new CPayablesDraft();
                string[] ChargeTypeIDsArr = pSelectedIDs.Split(',');
                string[] QuotationChargeIDsArr = pQuotationChargeIDs.Split(',');
                for (int i = 0; i < ChargeTypeIDsArr.Length; i++)
                {
                    CVarPayablesDraft objCVarPayablesDraft = new CVarPayablesDraft();
                    var chargeType = objCChargeTypes.lstCVarChargeTypes.FirstOrDefault(a => a.ID == int.Parse(ChargeTypeIDsArr[i]));
                    if (chargeType == null)
                        continue;
                    objCVarPayablesDraft.OperationID = pOperationID;
                    objCVarPayablesDraft.ChargeTypeID = chargeType.ID;
                    objCVarPayablesDraft.MeasurementID = chargeType.MeasurementID;
                    objCVarPayablesDraft.Notes = chargeType.Notes;
                    objCVarPayablesDraft.GeneratingQCID = long.Parse(QuotationChargeIDsArr[i]);
                    objCVarPayablesDraft.Quantity = 1;
                    objCVarPayablesDraft.ExchangeRate = _ExchangeRate;
                    objCVarPayablesDraft.CurrencyID = _CurrencyID;
                    objCVarPayablesDraft.SupplierInvoiceNo = "0";
                    objCVarPayablesDraft.SupplierReceiptNo = "0";
                    objCVarPayablesDraft.EntryDate = DateTime.Now;
                    objCVarPayablesDraft.BillID = 0;
                    objCVarPayablesDraft.IssueDate = DateTime.Now;
                    objCVarPayablesDraft.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
                    objCVarPayablesDraft.GeneratingQRID = pQuotationRouteID;
                    objCVarPayablesDraft.OperationVehicleID = pOperationVehicleID;
                    objCVarPayablesDraft.TruckingOrderID = pTruckingOrderID;
                    objCVarPayablesDraft.CreatorUserID = objCVarPayablesDraft.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarPayablesDraft.ModificationDate = objCVarPayablesDraft.CreationDate = DateTime.Now;
                    objCVarPayablesDraft.IsOfficial = false;
                    objCVarPayablesDraft.IsQuotationApproval = false;
                    objCVarPayablesDraft.ApprovePendingValue = 0;
                    objCVarPayablesDraft.crmCode = "";
                    objCVarPayablesDraft.OriginalPayableID = 0;
                    objCVarPayablesDraft.IsFinalApproved = false;

                    objCPayablesDraft.lstCVarPayablesDraft.Add(objCVarPayablesDraft);
                }
                var checkException = objCPayablesDraft.SaveMethod(objCPayablesDraft.lstCVarPayablesDraft);
                if (checkException == null)
                    _result = true;
            }
            else
            {
                Int32 ChargeTypeID = 0;
                foreach (var rowChargeType in objCChargeTypes.lstCVarChargeTypes.ToList())
                {
                    decimal _Quantity = 1;
                    


                    CPayablesDraft objCPayablesDraft = new CPayablesDraft();

                    CVarPayablesDraft objCVarPayablesDraft = new CVarPayablesDraft();

                    objCVarPayablesDraft.OperationID = pOperationID;
                    objCVarPayablesDraft.ChargeTypeID = rowChargeType.ID;
                    objCVarPayablesDraft.MeasurementID = rowChargeType.MeasurementID;
                    objCVarPayablesDraft.Quantity = _Quantity;
                    objCVarPayablesDraft.ExchangeRate = _ExchangeRate;
                    objCVarPayablesDraft.CurrencyID = _CurrencyID;
                    objCVarPayablesDraft.SupplierInvoiceNo = "0";
                    objCVarPayablesDraft.SupplierReceiptNo = "0";
                    objCVarPayablesDraft.EntryDate = DateTime.Now;
                    objCVarPayablesDraft.BillID = 0;

                    objCVarPayablesDraft.IssueDate = DateTime.Now;
                    objCVarPayablesDraft.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;

                    objCVarPayablesDraft.GeneratingQRID = pQuotationRouteID;
                    objCVarPayablesDraft.OperationVehicleID = pOperationVehicleID;
                    objCVarPayablesDraft.TruckingOrderID = pTruckingOrderID;
                    objCVarPayablesDraft.Notes = rowChargeType.Notes;

                    objCVarPayablesDraft.CreatorUserID = objCVarPayablesDraft.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarPayablesDraft.ModificationDate = objCVarPayablesDraft.CreationDate = DateTime.Now;
                    objCVarPayablesDraft.IsOfficial = false;
                    objCVarPayablesDraft.IsQuotationApproval = false;
                    objCVarPayablesDraft.ApprovePendingValue = 0;
                    objCVarPayablesDraft.crmCode = "";
                    objCVarPayablesDraft.OriginalPayableID = 0;
                    objCVarPayablesDraft.IsFinalApproved = false;

                    objCPayablesDraft.lstCVarPayablesDraft.Add(objCVarPayablesDraft);
                    var checkException = objCPayablesDraft.SaveMethod(objCPayablesDraft.lstCVarPayablesDraft);
                    if (checkException == null)
                        _result = true;

                   
                }
                if (_result && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED" && pQuotationRouteID > 0)
                {
                    CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                    var ex = objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 0, ChargeEditApprovalLevel = 0, ChargeEdit1stApprovalUserID = NULL, ChargeEdit2ndApprovalUserID = NULL, ChargeEdit3rdApprovalUserID = NULL, ChargeEdit4thApprovalUserID = NULL where ID = {pQuotationRouteID}");
                }
            }

            return _result;
        }

    }

}
