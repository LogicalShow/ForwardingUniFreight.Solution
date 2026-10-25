using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.OperAcc.Customized;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using LogisticsWeb;
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

namespace Forwarding.MvcApp.Controllers.Accounting.API_Transactions
{
    public static class AllocationShipingInvoice_Globals
    {
        public static Int32 CUserId = WebSecurity.CurrentUserId; // Unmodifiable
    }
    public static class AllocationShipingInvoice_Globals_GlobalVariable
    {
        public static long PaymentAllocationID = 0; // Unmodifiable
        public static long PaymentCurrencyID = 0; // Unmodifiable

        public static long DasInvoiceID = 0;
        public static string PaymentDate = "";


    }
    public class A_ARAllocationWithVoucherController : ApiController
    {

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
                objCCustomers.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);

                CSuppliers objCSuppliersVendors = new CSuppliers();
                objCSuppliersVendors.GetListPaging(99999, 1, "WHERE 1=2", "Name", out _RowCount);


                return new object[] { new JavaScriptSerializer().Serialize(objCCustomers.lstCVarvwCustomersWithMinimalColumns), new JavaScriptSerializer().Serialize(objCSuppliersVendors.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constAgentPartnerTypeID)
            {
                CAgents objCAgents = new CAgents();
                objCAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);

                CSuppliers objCSuppliersVendors = new CSuppliers();
                objCSuppliersVendors.GetListPaging(10000, 1, "WHERE 1=2", "Name", out _RowCount);

                return new object[] { new JavaScriptSerializer().Serialize(objCAgents.lstCVarAgents), new JavaScriptSerializer().Serialize(objCSuppliersVendors.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constShippingAgentPartnerTypeID)
            {

                CShippingAgents objCShippingAgents = new CShippingAgents();
                objCShippingAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);

                CSuppliers objCSuppliersVendors = new CSuppliers();
                objCSuppliersVendors.GetListPaging(10000, 1, "WHERE 1=2", "Name", out _RowCount);


                return new object[] { new JavaScriptSerializer().Serialize(objCShippingAgents.lstCVarShippingAgents), new JavaScriptSerializer().Serialize(objCSuppliersVendors.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constCustomsClearanceAgentPartnerTypeID)
            {
                CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
                objCCustomsClearanceAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);

                CSuppliers objCSuppliersVendors = new CSuppliers();
                objCSuppliersVendors.GetListPaging(10000, 1, "WHERE 1=2", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents), new JavaScriptSerializer().Serialize(objCSuppliersVendors.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constShippingLinePartnerTypeID)
            {
                CShippingLines objCShippingLines = new CShippingLines();
                objCShippingLines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);

                CSuppliers objCSuppliersVendors = new CSuppliers();
                objCSuppliersVendors.GetListPaging(10000, 1, "WHERE 1=2", "Name", out _RowCount);

                return new object[] { new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines), new JavaScriptSerializer().Serialize(objCSuppliersVendors.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constAirlinePartnerTypeID)
            {
                CvwAirlinesWithMinimalColumns objCAirlines = new CvwAirlinesWithMinimalColumns();
                objCAirlines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);

                CSuppliers objCSuppliersVendors = new CSuppliers();
                objCSuppliersVendors.GetListPaging(10000, 1, "WHERE 1=2", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCAirlines.lstCVarvwAirlinesWithMinimalColumns), new JavaScriptSerializer().Serialize(objCSuppliersVendors.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constTruckerPartnerTypeID)
            {
                CTruckers objCTruckers = new CTruckers();
                objCTruckers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);

                CSuppliers objCSuppliersVendors = new CSuppliers();
                objCSuppliersVendors.GetListPaging(10000, 1, "WHERE 1=2", "Name", out _RowCount);

                return new object[] { new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers), new JavaScriptSerializer().Serialize(objCSuppliersVendors.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constSupplierPartnerTypeID)
            {
                CSuppliers objCSuppliers = new CSuppliers();
                objCSuppliers.GetListPaging(10000, 1, "WHERE IsInactive=0", "Name", out _RowCount);

                CSuppliers objCSuppliersVendors = new CSuppliers();
                objCSuppliersVendors.GetListPaging(10000, 1, "WHERE IsInactive=0 and PaymentTermID=6", "Name", out _RowCount);

                return new object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarSuppliers), new JavaScriptSerializer().Serialize(objCSuppliersVendors.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constCustodyPartnerTypeID)
            {
                CCustody objCCustody = new CCustody();
                objCCustody.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);

                CSuppliers objCSuppliersVendors = new CSuppliers();
                objCSuppliersVendors.GetListPaging(10000, 1, "WHERE 1=2", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustody.lstCVarCustody), new JavaScriptSerializer().Serialize(objCSuppliersVendors.lstCVarSuppliers) };
            }
            return new object[] { };
        }
        [HttpGet, HttpPost]
        public Object[] ARAllocationWithVoucher_Partners(bool pIsLoadArrayOfObjects)
        {
            bool _result = false;
            Exception checkException = null;

            CNoAccessPartnerTypes objCPartnerTypes = new CNoAccessPartnerTypes();
            int _RowCount = 0;
            checkException = objCPartnerTypes.GetList("ORDER BY Code");
            if (checkException == null)
            {
                _result = true;
            }

            CCustomers objCCustomers = new CCustomers();
            objCCustomers.GetList("ORDER BY Name");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                 _RowCount
                , pIsLoadArrayOfObjects || _result ? serializer.Serialize(objCPartnerTypes.lstCVarNoAccessPartnerTypes) : null
                  , pIsLoadArrayOfObjects || _result ? serializer.Serialize(objCCustomers.lstCVarCustomers) : null
               };
        }

        [HttpGet, HttpPost]
        public Object[] LoadInvoices(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {

            int returentCount = 0;
            Exception checkException = null;
           // pWhereClause = pWhereClause.Replace("CustomerID", "PartnerID");
            CvwA_AllocationInvoice objCvwA_AllocationInvoice = new CvwA_AllocationInvoice();
            checkException = objCvwA_AllocationInvoice.GetListPaging(pPageSize, pPageNumber, pWhereClause, " [ID] ", out returentCount);

            //CvwInvoices objCvwInvoices = new CvwInvoices();
            //objCvwInvoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " [ID] ", out returentCount);

            JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[]
            {
                  serializer.Serialize(objCvwA_AllocationInvoice.lstCVarvwA_AllocationInvoice)
                , returentCount
            };

        }

        [HttpGet, HttpPost]
        public Object[] LoadVoucher(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            int returentCount = 0;
            Exception checkException = null;
          //  pWhereClause = pWhereClause.Replace("CustomerID", "Client_ID");
            CvwA_AllocationVoucher objCvwA_AllocationVoucher = new CvwA_AllocationVoucher();
            checkException = objCvwA_AllocationVoucher.GetListPaging(pPageSize, pPageNumber, pWhereClause, " [ID] ", out returentCount);


            var VouchersCurrenciesSummary = objCvwA_AllocationVoucher.lstCVarvwA_AllocationVoucher.GroupBy(d => d.CurrencyCode)
                .Select(g => new
                {
                    TotalAmount = g.Sum(s => s.Qty)
                    ,
                    CurrencyCode = g.First().CurrencyCode
                });

            string AvailableAmounts = "";
            foreach (var row in VouchersCurrenciesSummary)
            {
                AvailableAmounts += " " + row.CurrencyCode + ": " + Math.Round(row.TotalAmount, 2).ToString();
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[]
            {
                  serializer.Serialize(objCvwA_AllocationVoucher.lstCVarvwA_AllocationVoucher)
                , returentCount
                , AvailableAmounts
            };

        }


        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            //CA_CustodySettlementClose objCA_CustodySettlementClose = new CA_CustodySettlementClose();
            CvwA_AllocationInvoicesWithVoucher objCvwA_AllocationInvoicesWithVoucher = new CvwA_AllocationInvoicesWithVoucher();

            objCvwA_AllocationInvoicesWithVoucher.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwA_AllocationInvoicesWithVoucher.lstCVarvwA_AllocationInvoicesWithVoucher)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public object[] Save([FromBody] ParamAllocationWithVoucher_Save saveParameters)
        {
            string pMessageReturned = "";
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            int _RowCount = 0;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "Where 1=1", "ID", out _RowCount);

            #region Save
            #region Save Header

            string JVID = "";

            CA_AllocationInvoicesWithVoucher objCA_AllocationInvoicesWithVoucher = new CA_AllocationInvoicesWithVoucher();
            CVarA_AllocationInvoicesWithVoucher objCVarA_AllocationInvoicesWithVoucher = new CVarA_AllocationInvoicesWithVoucher();
            objCVarA_AllocationInvoicesWithVoucher.ID = 0;
            objCVarA_AllocationInvoicesWithVoucher.Code = "0";
            objCVarA_AllocationInvoicesWithVoucher.PartnerTypeID = saveParameters.pPartnerTypeID;
            objCVarA_AllocationInvoicesWithVoucher.PartnerID = saveParameters.pClientID;
            objCVarA_AllocationInvoicesWithVoucher.CurrencyID = saveParameters.pCurrencyID;

            objCVarA_AllocationInvoicesWithVoucher.Date = saveParameters.pDate;
            objCVarA_AllocationInvoicesWithVoucher.InvoiceExchangeRate = saveParameters.pInvoiceExchangeRate;
            objCVarA_AllocationInvoicesWithVoucher.VoucherExchangeRate = saveParameters.pVoucherExchangeRate;
            objCVarA_AllocationInvoicesWithVoucher.ProfitAmount = saveParameters.pProfitAmount;
            objCVarA_AllocationInvoicesWithVoucher.LossAmount = saveParameters.pLossAmount;
            objCA_AllocationInvoicesWithVoucher.lstCVarA_AllocationInvoicesWithVoucher.Add(objCVarA_AllocationInvoicesWithVoucher);
            checkException = objCA_AllocationInvoicesWithVoucher.SaveMethod(objCA_AllocationInvoicesWithVoucher.lstCVarA_AllocationInvoicesWithVoucher);

            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_AllocationInvoicesWithVoucher", objCVarA_AllocationInvoicesWithVoucher.ID, (saveParameters.pID == 0 ? "I" : "U"));
            #endregion Save Header
            #region Save Details
            if (checkException == null)
            {
                if (saveParameters.pInvoiceID_List != null) //to prevent error in case if no details
                {
                    CA_AllocationInvoicesWithVoucher_Invoices objCA_AllocationInvoicesWithVoucher_Invoices = new CA_AllocationInvoicesWithVoucher_Invoices();

                    int NumberOfDetails = saveParameters.pInvoiceID_List.Split(',').Length;
                    for (int i = 0; i < NumberOfDetails; i++)
                    {
                        CVarA_AllocationInvoicesWithVoucher_Invoices objCVarA_AllocationInvoicesWithVoucher_Invoices = new CVarA_AllocationInvoicesWithVoucher_Invoices();

                        objCVarA_AllocationInvoicesWithVoucher_Invoices.AllocationPaymentID = objCVarA_AllocationInvoicesWithVoucher.ID;
                        objCVarA_AllocationInvoicesWithVoucher_Invoices.InvoiceID = int.Parse(saveParameters.pInvoiceID_List.Split(',')[i]);
                        objCVarA_AllocationInvoicesWithVoucher_Invoices.InvoiceNo = saveParameters.pInvoiceNo_List.Split(',')[i].ToString();
                        objCVarA_AllocationInvoicesWithVoucher_Invoices.Paid = decimal.Parse(saveParameters.pInvoicePaid_List.Split(',')[i]);
                        objCVarA_AllocationInvoicesWithVoucher_Invoices.Date = DateTime.Now;

                        objCA_AllocationInvoicesWithVoucher_Invoices.lstCVarA_AllocationInvoicesWithVoucher_Invoices.Add(objCVarA_AllocationInvoicesWithVoucher_Invoices);
                    }
                    checkException = objCA_AllocationInvoicesWithVoucher_Invoices.SaveMethod(objCA_AllocationInvoicesWithVoucher_Invoices.lstCVarA_AllocationInvoicesWithVoucher_Invoices);

                }
                if (checkException == null)
                {
                    if (saveParameters.pVoucherID_List != null)
                    {
                        CA_AllocationInvoicesWithVoucher_Voucher objCA_AllocationInvoicesWithVoucher_Voucher = new CA_AllocationInvoicesWithVoucher_Voucher();

                        int NumberOfDetails = saveParameters.pVoucherID_List.Split(',').Length;
                        for (int i = 0; i < NumberOfDetails; i++)
                        {
                            CVarA_AllocationInvoicesWithVoucher_Voucher objCVarA_AllocationInvoicesWithVoucher_Voucher = new CVarA_AllocationInvoicesWithVoucher_Voucher();

                            objCVarA_AllocationInvoicesWithVoucher_Voucher.AllocationPaymentID = objCVarA_AllocationInvoicesWithVoucher.ID;
                            objCVarA_AllocationInvoicesWithVoucher_Voucher.VoucherID = int.Parse(saveParameters.pVoucherID_List.Split(',')[i]);
                            objCVarA_AllocationInvoicesWithVoucher_Voucher.VoucherType = saveParameters.pVoucherType_List.Split(',')[i].ToString();
                            objCVarA_AllocationInvoicesWithVoucher_Voucher.Paid = decimal.Parse(saveParameters.pVoucherPaid_List.Split(',')[i]);
                            objCVarA_AllocationInvoicesWithVoucher_Voucher.Date = DateTime.Now;

                            objCA_AllocationInvoicesWithVoucher_Voucher.lstCVarA_AllocationInvoicesWithVoucher_Voucher.Add(objCVarA_AllocationInvoicesWithVoucher_Voucher);
                        }
                        checkException = objCA_AllocationInvoicesWithVoucher_Voucher.SaveMethod(objCA_AllocationInvoicesWithVoucher_Voucher.lstCVarA_AllocationInvoicesWithVoucher_Voucher);

                        if (checkException == null)
                        {
                            ARUpdateCashInvoicePaidAfterSave(saveParameters.pInvoiceID_List, saveParameters.pInvoicePaid_List);
                        }
                        if (checkException == null)
                        {
                            Int32 VoucherID = int.Parse(saveParameters.pVoucherID_List.Split(',')[0]);
                            CvwA_AllocationVoucher objCvwA_AllocationVoucher = new CvwA_AllocationVoucher();
                            objCvwA_AllocationVoucher.GetList("WHERE ID=" + VoucherID);
                            if (( 
                                (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "3NL" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "PSA"
                                || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ILSEG" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ILS"
                                || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "REL"
                                )


                                && saveParameters.pVoucherExchangeRate != 1)
                                ||  (saveParameters.pCurrencyID != objCvwA_AllocationVoucher.lstCVarvwA_AllocationVoucher[0].CurrencyID))
                            {
                                object[] objResult = CreateAllocationJV(objCVarA_AllocationInvoicesWithVoucher.ID.ToString(), WebSecurity.CurrentUserId);
                                Exception ex = objResult[0] as Exception;
                                if (objResult[0] != null)
                                    pMessageReturned = ex.Message;

                                objCA_AllocationInvoicesWithVoucher.GetList("Where ID= " + objCVarA_AllocationInvoicesWithVoucher.ID.ToString());
                                if (objCA_AllocationInvoicesWithVoucher.lstCVarA_AllocationInvoicesWithVoucher.Count > 0)
                                {
                                    JVID = objCA_AllocationInvoicesWithVoucher.lstCVarA_AllocationInvoicesWithVoucher[0].JVID.ToString();

                                }
                            }





                        }

                    }

                }
            }
            else
            {
                pMessageReturned = checkException.Message;
            }
            #endregion Save Details
            #endregion Save
            if (checkException != null)
                pMessageReturned = checkException.Message;

            return new object[]
            {  pMessageReturned ,JVID};
        }

        [HttpGet, HttpPost]
        public object[] Delete(string pDeletedIDs)
        {
            bool _result = true;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            int NumberOfSelectedRows = pDeletedIDs.Split(',').Length;
            var ArrDeletedIDs = pDeletedIDs.Split(',');
            for (int i = 0; i < NumberOfSelectedRows; i++)
            {


                CA_AllocationInvoicesWithVoucher_Voucher objCA_AllocationInvoicesWithVoucher_Voucher = new CA_AllocationInvoicesWithVoucher_Voucher();
                checkException = objCA_AllocationInvoicesWithVoucher_Voucher.DeleteList(" WHERE AllocationPaymentID=" + ArrDeletedIDs[i]);

                CA_AllocationInvoicesWithVoucher_Invoices objCA_AllocationInvoicesWithVoucher_Invoices = new CA_AllocationInvoicesWithVoucher_Invoices();
                objCA_AllocationInvoicesWithVoucher_Invoices.GetList(" Where AllocationPaymentID=" + ArrDeletedIDs[i]);

                var pInvoiceIDs = string.Join(",", objCA_AllocationInvoicesWithVoucher_Invoices.lstCVarA_AllocationInvoicesWithVoucher_Invoices.Select(x => x.InvoiceID).ToList());
                var pDueAmounts = string.Join(",", objCA_AllocationInvoicesWithVoucher_Invoices.lstCVarA_AllocationInvoicesWithVoucher_Invoices.Select(x => x.Paid).ToList());
                ARUpdateCashInvoicePaidAfterDelete(pInvoiceIDs, pDueAmounts);


                checkException = objCA_AllocationInvoicesWithVoucher_Invoices.DeleteList(" WHERE AllocationPaymentID=" + ArrDeletedIDs[i]);



                CA_AllocationInvoicesWithVoucher objCA_AllocationInvoicesWithVoucher = new CA_AllocationInvoicesWithVoucher();
                checkException = objCA_AllocationInvoicesWithVoucher.GetList(" Where ID= " + ArrDeletedIDs[i]);
                Int64 JVID = objCA_AllocationInvoicesWithVoucher.lstCVarA_AllocationInvoicesWithVoucher[0].JVID;

                checkException = objCA_AllocationInvoicesWithVoucher.DeleteList(" Where ID= " + ArrDeletedIDs[i]);

                if (JVID  != 0 )
                {
                    CSystemOptions objCSystemOptions = new CSystemOptions();
                    objCSystemOptions.GetList("Where OptionID=188");
                    if(objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                    {
                        objCCustomizedDBCall.ExecuteQuery_DataTable("A_ReverseJV " + JVID.ToString()  + "," + WebSecurity.CurrentUserId.ToString() + ",null ");
                    }
                else
                    {

                        CA_JV objCA_JV = new CA_JV();
                        objCA_JV.DeleteList("Where ID= " + JVID.ToString());
                    }

                }


            

               objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_AllocationInvoicesWithVoucher", Int64.Parse(ArrDeletedIDs[i]), "D");

                 if(checkException != null)
                    _result = false;
            }
            return new object[] {
                _result
            };
        }

        private object[] ARUpdateCashInvoicePaidAfterDelete(string pInvoiceIDs, string pDueAmounts)
        {
            bool _result = false;
            string pUpdateList = "";
            Exception checkException = null;
            var ArrAmounts = pDueAmounts.Split(',');
            var ArrAllocationItemsIDs = pInvoiceIDs.Split(',');
            Int32 NumberOfInvoicesAllocated = pInvoiceIDs.Split(',').Count();
            CInvoices objCInvoices = new CInvoices();

            for (int i = 0; i < NumberOfInvoicesAllocated; i++)
            {
                if (checkException == null && ArrAllocationItemsIDs[i] != "")
                {
                    _result = true;

                    pUpdateList = "PaidAmount = (ISNULL(PaidAmount,0) - " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                    pUpdateList += " , RemainingAmount = (ISNULL(RemainingAmount,0) + " + decimal.Parse(ArrAmounts[i]).ToString() + ")";
                    pUpdateList += " WHERE ID = " + Int64.Parse(ArrAllocationItemsIDs[i]);
                    checkException = objCInvoices.UpdateList(pUpdateList);

                }
            }
            return new object[] {
                _result
            };
        }

        private object[] ARUpdateCashInvoicePaidAfterSave(string pInvoiceIDs, string pDueAmounts)
        {
            bool _result = false;
            string pUpdateList = "";
            Exception checkException = null;
            var ArrAmounts = pDueAmounts.Split(',');
            var ArrAllocationItemsIDs = pInvoiceIDs.Split(',');
            Int32 NumberOfInvoicesAllocated = pInvoiceIDs.Split(',').Count();
            CInvoices objCInvoices = new CInvoices();

            for (int i = 0; i < NumberOfInvoicesAllocated; i++)
            {
                if (checkException == null && ArrAllocationItemsIDs[i] != "")
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

        private object[] CreateAllocationJV(string ID, int UserID)
        {
            string JVID = "";
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;

            try
            {
               
                Con.Open();
                SqlTransaction tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
              
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                    Com.CommandText = "[dbo].[CreateJV_AllocationInvoicesWithVoucher]";
                    Com.Parameters[0].Value = ID; 
                    Com.Parameters[1].Value = UserID;

             
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                    }
                }
                catch (Exception ex)
                {
                    Exp = ex;
                }
                finally
                {
                    if (dr != null)
                    {
                        dr.Close();
                        dr.Dispose();
                    }
                }
                tr.Commit();
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return new object[] { Exp };
        }
    }

    public class ParamAllocationWithVoucher_Save
    {

        public Int32 pID { get; set; }
        public Int32 pCode { get; set; }
        public DateTime pDate { get; set; }
        public Int32 pPartnerTypeID { get; set; }
        public Int32 pClientID { get; set; }
        public Int32 pCurrencyID { get; set; }
        public decimal pVoucherExchangeRate { get; set; }
        public decimal pInvoiceExchangeRate { get; set; }
        public decimal pProfitAmount { get; set; }
        public decimal pLossAmount { get; set; }
        public string pInvoiceID_List { get; set; }
        public string pInvoiceNo_List { get; set; }
        public string pInvoicePaid_List { get; set; }
        public string pVoucherID_List { get; set; }
        public string pVoucherType_List { get; set; }
        public string pVoucherPaid_List { get; set; }



    }
}
