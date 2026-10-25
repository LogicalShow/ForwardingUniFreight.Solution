//using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.ReportSource;
using CrystalDecisions.Shared;
using CrystalDecisions.ReportAppServer; 
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Newtonsoft.Json;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Numeric;
using System.Net.Http.Headers;
using RestSharp;
using System.Threading.Tasks;
using System.Text;
using Newtonsoft.Json.Linq;
using System.Web.Helpers;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ZakatAndIncome; 
using System.Text.RegularExpressions;
using System.Web.Configuration;
using Forwarding.MvcApp.Models.PR.MasterData.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Locations
{
    public class SendDebitAndCreditController : ApiController
    {

        //[HttpGet, HttpPost]
        //public Object[] GetSalesInvoicesFilters(string pWhereClause)
        //{
        //    CStorageTypes objCStorageTypes = new CStorageTypes();
        //    objCStorageTypes.GetList(pWhereClause);
        //    return new Object[] { new JavaScriptSerializer().Serialize(objCStorageTypes.lstCVarStorageTypes) };
        //}

        [HttpGet, HttpPost]
        public Object[] IntializeData(int pPageNumber, int pPageSize, string pWhereClause)
        {
            pPageNumber = (pPageNumber == 0 ? 1 : pPageNumber);
            Int32 _RowCount = 0;
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CBranches cBranches = new CBranches();
            //CInvoiceTypes cInvoiceTypes = new CInvoiceTypes();
            CSC_TransactionsTypes cInvoiceTypes = new CSC_TransactionsTypes();
            CCustomers cCustomers = new CCustomers();
            CCurrencies cCurrencies = new CCurrencies();

            CZatcaDebitCredit ZatcaDebitCredit = new CZatcaDebitCredit();
            //CvwSC_TransactionsInvoiceForwarding vwSC_TransactionsInvoiceForwarding = new CvwSC_TransactionsInvoiceForwarding();
            //vwSC_TransactionsInvoiceForwarding.GetListPaging(10, 1, pWhereClause, " ID DESC ", out _RowCount);
            ZatcaDebitCredit.GetListPaging(10, 1, pWhereClause, " ID DESC ", out _RowCount);
            //vwSC_TransactionsInvoiceForwarding.GetList("where 1 = 1 ");

            //vwSubmittedInvoiceForwarding.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);

            cBranches.GetList(" Where 1=1");
            //cInvoiceTypes.GetList(" Where Id in (40,50)");
            cCustomers.GetList(" where 1 = 1 order by Name ");
            cCurrencies.GetList(" Where 1=1");

            return new Object[]
            {
            srialize.Serialize(ZatcaDebitCredit.lstCVarZatcaDebitCredit),//0
            _RowCount,//1
            srialize.Serialize(cCustomers.lstCVarCustomers),//2
            srialize.Serialize(cBranches.lstCVarBranches),//3
            srialize.Serialize(cInvoiceTypes.lstCVarSC_TransactionsTypes),//4
            srialize.Serialize(cCurrencies.lstCVarCurrencies)//5
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllFilters(int pPageNumber, int pPageSize, string pSearchKey)
        {
            pPageNumber = (pPageNumber == 0 ? 1 : pPageNumber);
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CBranches cBranches = new CBranches();
            CSC_TransactionsTypes cInvoiceTypes = new CSC_TransactionsTypes();
            CCustomers cCustomers = new CCustomers();
            CSuppliers cSuppliers = new CSuppliers();

            CCurrencies cCurrencies = new CCurrencies();

            Int32 _RowCount = 0;
            CvwSubmittedInvoiceForwarding vwSubmittedInvoiceForwarding = new CvwSubmittedInvoiceForwarding();

            //vwSubmittedInvoiceForwarding.GetListPaging(pPageSize, pPageNumber, " Where 1=1", " ID DESC ", out _RowCount);

            cBranches.GetList(" Where 1=1");
            cInvoiceTypes.GetList(" Where Id in (40,50)");
            cCustomers.GetList(" where 1 = 1 order by Name ");
            cSuppliers.GetList(" where 1 = 1 order by Name ");

            cCurrencies.GetList(" Where 1=1");

            return new Object[]
            {
            srialize.Serialize(vwSubmittedInvoiceForwarding.lstCVarvwSubmittedInvoiceForwarding),//0
            _RowCount,//1
            srialize.Serialize(cCustomers.lstCVarCustomers),//2
            srialize.Serialize(cBranches.lstCVarBranches),//3
            srialize.Serialize(cInvoiceTypes.lstCVarSC_TransactionsTypes),//4
            srialize.Serialize(cCurrencies.lstCVarCurrencies)//5
            ,srialize.Serialize(cSuppliers.lstCVarSuppliers)//6

            };
        }

        [HttpGet, HttpPost]
        public Object[] SearchByInvoiceNumber(int pPageNumber, int pPageSize, string pWhereClause)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            int _RowCount = 0;
            decimal AmountWithoutVAT = 0;
            decimal TaxAmount = 0;
            decimal TotalAmount = 0;

            CZatcaDebitCredit ZatcaDebitCredit = new CZatcaDebitCredit();
            //CvwSC_TransactionsInvoiceForwarding vwSC_TransactionsInvoiceForwarding = new CvwSC_TransactionsInvoiceForwarding();

            ZatcaDebitCredit.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            //vwSC_TransactionsInvoiceForwarding.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            AmountWithoutVAT += ZatcaDebitCredit.lstCVarZatcaDebitCredit.Where(i => i.AmountWithoutVAT > 0).Sum(item => item.AmountWithoutVAT);
            TaxAmount += ZatcaDebitCredit.lstCVarZatcaDebitCredit.Where(i => i.TaxAmount > 0).Sum(item => item.TaxAmount);
            TotalAmount += ZatcaDebitCredit.lstCVarZatcaDebitCredit.Where(i => i.TotalAmount > 0).Sum(item => item.TotalAmount);

            return new Object[]
            {
                //srialize.Serialize(vwSC_TransactionsInvoiceForwarding.lstCVarvwSC_TransactionsInvoiceForwarding),
                srialize.Serialize(ZatcaDebitCredit.lstCVarZatcaDebitCredit),
                _RowCount,AmountWithoutVAT,TaxAmount,TotalAmount
            };
        }

        [HttpGet, HttpPost]
        public async Task<object[]> SendDebitAndCreditToZatcaAsync(string InvoicesIDs, string LoginURL, string reportInvoiceURL, string WhereClause)
        {
            var CreationCurrentUserId = WebSecurity.CurrentUserId;
            Exception exception = null;
            int result = 0;
            Int32 _RowCount = 0;
            CZatcaDebitCredit ZatcaDebitCredit = new CZatcaDebitCredit();
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("Where 1=1");
            var CompanyName = objCDefaults.lstCVarDefaults[0].UnEditableCompanyName;
            var Global_access_token = "";
            try
            {
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Post, LoginURL);// "http://localhost:5000/api/users/login");
                var content = new StringContent("{\r\n    \"email\" : \"test@test.com\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                if (CompanyName == "KDL")
                {
                    //LoginURL = "http://localhost:8000/api/users/login";
                    //reportInvoiceURL = "http://localhost:8000/api/reportInvoice";
                    LoginURL = "http://92.205.162.170:8000/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:8000/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }
                else if (CompanyName == "Wosool")
                {
                    //LoginURL = "http://localhost:6000/api/users/login";
                    //reportInvoiceURL = "http://localhost:6000/api/reportInvoice";
                    LoginURL = "http://92.205.162.170:6000/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:6000/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }
                else if (CompanyName == "ZAF")
                {
                    //LoginURL = "http://localhost:7000/api/users/login";
                    //reportInvoiceURL = "http://localhost:7000/api/reportInvoice";
                    LoginURL = "http://92.205.162.170:7000/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:7000/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }
                else if (CompanyName == "MOUD")
                {
                    //LoginURL = "http://localhost:9000/api/users/login";
                    //reportInvoiceURL = "http://localhost:9000/api/reportInvoice";
                    LoginURL = "http://92.205.162.170:9000/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:9000/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }
                else if (CompanyName == "BRA")//Badr
                {
                    //LoginURL = "http://localhost:1111/api/users/login";
                    //reportInvoiceURL = "http://localhost:1111/api/reportInvoice";
                    LoginURL = "http://92.205.162.170:1111/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:1111/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }
                else if (CompanyName == "MID")//MidLineLogistics
                {
                    //LoginURL = "http://localhost:5001/api/users/login";
                    //reportInvoiceURL = "http://localhost:5001/api/reportInvoice";
                    LoginURL = "http://92.205.162.170:5001/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:5001/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }
                else if (CompanyName == "MTH")//Mithaq
                {
                    LoginURL = "http://92.205.162.170:5005/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:5005/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }
                else if (CompanyName == "EEM")//Emaar
                {
                    LoginURL = "http://92.205.162.170:5007/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:5007/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }
                else if (CompanyName == "BIN")//Binthrian
                {
                    LoginURL = "http://92.205.162.170:5011/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:5011/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }
                else if (CompanyName == "ADS")//AdelSaeed
                {
                    LoginURL = "http://92.205.162.170:2021/api/users/login";
                    reportInvoiceURL = "http://92.205.162.170:2021/api/reportInvoice";
                    request = new HttpRequestMessage(HttpMethod.Post, LoginURL);
                    content = new StringContent("{\r\n    \"email\" : \"mfergany@wisys.com.sa\",\r\n    \"password\" : \"123456\"\r\n}", null, "application/json");
                }

                request.Content = content;
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                var ResponseData = await response.Content.ReadAsStringAsync();

                var ResponseLoginData = JsonConvert.DeserializeObject<ResponseLogin>(ResponseData);
                Global_access_token = ResponseLoginData.token;

                //***************************************************************************************
                List<int> ListOfInvoiceIDs = InvoicesIDs.Split(',').Select(int.Parse).ToList();
                foreach (var InvID in ListOfInvoiceIDs)
                {
                    CResponseToSubmitInvoice_DebitCredit ResponseToSubmitInvoice_DebitCredit = new CResponseToSubmitInvoice_DebitCredit();
                    ResponseToSubmitInvoice_DebitCredit.GetList("Where InvoiceID = " + InvID);
                    if (ResponseToSubmitInvoice_DebitCredit.lstCVarResponseToSubmitInvoice_DebitCredit.Count == 0)
                    {
                        CZatcaDebitCredit CInvoices = new CZatcaDebitCredit();
                        CInvoices.GetList(" Where ID = " + InvID + "");
                        foreach (var invoice in CInvoices.lstCVarZatcaDebitCredit)
                        {
                            var client_SendInvoice = new HttpClient();
                            var request_SendInvoice = new HttpRequestMessage(HttpMethod.Post, reportInvoiceURL);// "http://localhost:5000/api/reportInvoice"
                            request_SendInvoice.Headers.Add("Authorization", "Bearer " + Global_access_token + "");
                         
                            string InvoicesText = "";

                            #region Invoice Header And Details
                            CvwReceivables CReceivables = new CvwReceivables();
                            CZatcaDebitCreditDetails ZatcaDebitCreditDetails = new CZatcaDebitCreditDetails();
                            string InvoiceLines = "";
                            CReceivables.GetListPaging(100, 1, (" Where InvoiceID = " + invoice.ID), " ID", out int totalrecords);
                            ZatcaDebitCreditDetails.GetListPaging(100, 1, (" Where InvoiceID = " + invoice.ID), " ID", out int totalrecords2);
                            decimal zero = 0;
                            var ZeroReceivables = CReceivables.lstCVarvwReceivables.Where(r => r.TaxPercentage == zero).ToList();
                            var ZeroZatcaDebitCreditDetails = ZatcaDebitCreditDetails.lstCVarZatcaDebitCreditDetails.Where(r => r.TaxPercentage == zero).ToList();

                            if (ZeroZatcaDebitCreditDetails.Count > 1)
                            {
                                foreach (var receivable in ZatcaDebitCreditDetails.lstCVarZatcaDebitCreditDetails.Where(r => r.TaxPercentage > 0))
                                {
                                    string TAXpercentage = "0";
                                    if (invoice.TaxPercentage > 0)
                                        TAXpercentage = ((float)((invoice.TaxPercentage / Convert.ToDecimal(100.0)))).ToString();
                                    else if (receivable.TaxPercentage > 0)
                                        TAXpercentage = ((float)((receivable.TaxPercentage / Convert.ToDecimal(100.0)))).ToString();

                                    InvoiceLines += "{\r\n                \"id\": \"" + receivable.ID + "\",\r\n                \"name\": \"" + receivable.chargeTypeName + "\",\r\n                \"quantity\": " + ((float)receivable.Quantity).ToString() + ",\r\n                \"tax_exclusive_price\": " + ((float)receivable.AmountWithoutVAT).ToString() + ",\r\n                \"VAT_percent\": " + (TAXpercentage) + "\r\n            },";
                                }

                                var TotalItemZeroVat = (ZeroReceivables.Sum(r => r.AmountWithoutVAT));
                                InvoiceLines += "{\r\n                \"id\": \"" + ZeroReceivables[0].ID + "\",\r\n                \"name\": \"رسوم\",\r\n                \"quantity\": 1,\r\n                \"tax_exclusive_price\": " + ((float)TotalItemZeroVat).ToString() + ",\r\n                \"VAT_percent\": " + (0) + "\r\n            },";
                            }
                            else
                            {
                                //foreach (var receivable in CReceivables.lstCVarvwReceivables)
                                foreach (var receivable in ZatcaDebitCreditDetails.lstCVarZatcaDebitCreditDetails)
                                {
                                    string TAXpercentage = "0";
                                    if (invoice.TaxPercentage > 0)
                                        TAXpercentage = ((float)((invoice.TaxPercentage / Convert.ToDecimal(100.0)))).ToString();
                                    else if (receivable.TaxPercentage > 0)
                                        TAXpercentage = ((float)((receivable.TaxPercentage / Convert.ToDecimal(100.0)))).ToString();

                                    InvoiceLines += "{\r\n                \"id\": \"" + receivable.ID + "\",\r\n                \"name\": \"" + receivable.chargeTypeName + "\",\r\n                \"quantity\": " + ((float)receivable.Quantity).ToString() + ",\r\n                \"tax_exclusive_price\": " + ((float)receivable.AmountWithoutVAT).ToString() + ",\r\n                \"VAT_percent\": " + (TAXpercentage) + "\r\n            },";
                                }
                            }

                            InvoiceLines = InvoiceLines.Remove(InvoiceLines.Length - 1);
                            InvoicesText += "{\r\n        \"invoice_counter_number\": " + invoice.ID + ",\r\n        \"invoice_serial_number\": \"" + invoice.InvoiceNo + "\",\r\n        \"issue_date\": \"" + invoice.dateTimeIssued.ToString("yyyy-MM-dd") + "\",\r\n        \"issue_time\": \"14:40:40\",\r\n        \"invoiceType\": \"" + (invoice.DebitOrCredit == "C" ? "381" : "383") + "\",\r\n        \"line_items\": [ " + InvoiceLines + "   ]\r\n    ";

                            var CustomerVatNo = "";
                            var CustomerData = "";
                            CvwCustomers customers = new CvwCustomers(); int _CustomerRow = 0;
                            CvwAccNote vwAccNote = new CvwAccNote();
                            if (invoice.ZatcaModule == 8)
                            {
                                vwAccNote.GetListPaging(10,1," WHERE ID = " + invoice.ID," ID", out int _RowCnt);

                                if (vwAccNote.lstCVarvwAccNote.Count > 0)
                                    CustomerData = ",\n    \"customer_name\" : \"" + (vwAccNote.lstCVarvwAccNote[0].PartnerName.Trim() == "" ? "customer_street" : Regex.Replace(vwAccNote.lstCVarvwAccNote[0].PartnerName, @"\t|\n|\r", "")) + "\" ,\n                 \"customer_street\" : \"" + (vwAccNote.lstCVarvwAccNote[0].StreetLine1.Trim() == "" ? "customer_street" : Regex.Replace(vwAccNote.lstCVarvwAccNote[0].StreetLine1, @"\t|\n|\r", "")) + "\" ,\n                    \"customer_vat\" : \"" + vwAccNote.lstCVarvwAccNote[0].VATNumber + "\",\n    \"customer_building\" : \"customer_building\",\n    \"customer_dev\" : \"" + (vwAccNote.lstCVarvwAccNote[0].StreetLine2.Trim() == "" ? "customer_dev" : Regex.Replace(vwAccNote.lstCVarvwAccNote[0].StreetLine2, @"\t|\n|\r", "")) + "\" ,\n    \"customer_city\" : \"" + (vwAccNote.lstCVarvwAccNote[0].StreetLine1.Trim() == "" ? "customer_city" : Regex.Replace(vwAccNote.lstCVarvwAccNote[0].StreetLine1, @"\t|\n|\r", "")) + "\" ,\n    \"customer_postal\" : \"12222\",\n    \"actual_delivery_date\" : \"" + invoice.dateTimeIssued.ToString("yyyy-MM-dd") + "\"\n";
                                CustomerVatNo = vwAccNote.lstCVarvwAccNote[0].VATNumber;
                            }
                            else
                            {
                                customers.GetListPaging(10, 1, (" Where ID = " + invoice.Supplier_ClientID + ""), " ID", out _CustomerRow);
                            }
                            //customers.GetListPaging(10, 1, (" Where ID = (SELECT op.CustomerID FROM OperationPartners AS op WHERE op.ID = " + invoice.OperationPartnerID + ")"), " ID", out _CustomerRow);

                            if (customers.lstCVarvwCustomers.Count == 0)
                            {
                                CZatca_vwInvoices Zatca_vwInvoices = new CZatca_vwInvoices();
                                Zatca_vwInvoices.GetList(" WHERE ID = " + invoice.InvoiceID);
                                if (Zatca_vwInvoices.lstCVarZatca_vwInvoices.Count > 0)
                                    customers.GetListPaging(10, 1, (" Where ID = " + Zatca_vwInvoices.lstCVarZatca_vwInvoices[0].PartnerID + ""), " ID", out _CustomerRow);
                            }
                            CVarvwCustomers customer = new CVarvwCustomers();
                            if (customers.lstCVarvwCustomers.Count > 0)
                                customer = customers.lstCVarvwCustomers[0];
                            if (customer.ID == 0 && CustomerData == "")
                            {
                                CvwInvoices vwInvoices_Customer = new CvwInvoices();
                                vwInvoices_Customer.GetList(" WHERE ID = " + invoice.InvoiceID);
                                if (vwInvoices_Customer.lstCVarvwInvoices.Count > 0)
                                    CustomerData = ",\n    \"customer_name\" : \"" + (vwInvoices_Customer.lstCVarvwInvoices[0].PartnerName.Trim() == "" ? "customer_street" : Regex.Replace(vwInvoices_Customer.lstCVarvwInvoices[0].PartnerName, @"\t|\n|\r", "")) + "\" ,\n                 \"customer_street\" : \"" + (vwInvoices_Customer.lstCVarvwInvoices[0].StreetLine1.Trim() == "" ? "customer_street" : Regex.Replace(vwInvoices_Customer.lstCVarvwInvoices[0].StreetLine1, @"\t|\n|\r", "")) + "\" ,\n                    \"customer_vat\" : \"" + vwInvoices_Customer.lstCVarvwInvoices[0].VATNumber + "\",\n    \"customer_building\" : \"customer_building\",\n    \"customer_dev\" : \"" + (vwInvoices_Customer.lstCVarvwInvoices[0].StreetLine2.Trim() == "" ? "customer_dev" : Regex.Replace(vwInvoices_Customer.lstCVarvwInvoices[0].StreetLine2, @"\t|\n|\r", "")) + "\" ,\n    \"customer_city\" : \"" + (vwInvoices_Customer.lstCVarvwInvoices[0].StreetLine1.Trim() == "" ? "customer_city" : Regex.Replace(vwInvoices_Customer.lstCVarvwInvoices[0].StreetLine1, @"\t|\n|\r", "")) + "\" ,\n    \"customer_postal\" : \"12222\",\n    \"actual_delivery_date\" : \"" + invoice.dateTimeIssued.ToString("yyyy-MM-dd") + "\"\n";
                                CustomerVatNo = vwInvoices_Customer.lstCVarvwInvoices[0].VATNumber;
                            }
                            else if(CustomerData == "")
                            {
                                //var CustomerData = ",\n    \"customer_street\" : \"customer_street\" ,\n    \"customer_vat\" : \"301203063800003\",\n    \"customer_building\" : \"customer_building\",\n    \"customer_dev\" : \"الرياض\" ,\n    \"customer_city\" : \"الدمام | Dammam\" ,\n    \"customer_postal\" : \"12222\",\n    \"actual_delivery_date\" : \"2022-10-07\"\n";
                                CustomerData = ",\n    \"customer_name\" : \"" + (customer.Name.Trim() == "" ? "customer_street" : Regex.Replace(customer.Name, @"\t|\n|\r", "")) + "\" ,\n                 \"customer_street\" : \"" + (customer.Address.Trim() == "" ? "customer_street" : Regex.Replace(customer.Address, @"\t|\n|\r", "")) + "\" ,\n                    \"customer_vat\" : \"" + customer.VATNumber + "\",\n    \"customer_building\" : \"customer_building\",\n    \"customer_dev\" : \"" + (customer.Address.Trim() == "" ? "customer_dev" : Regex.Replace(customer.Address, @"\t|\n|\r", "")) + "\" ,\n    \"customer_city\" : \"" + (customer.Address.Trim() == "" ? "customer_city" : Regex.Replace(customer.Address, @"\t|\n|\r", "")) + "\" ,\n    \"customer_postal\" : \"12222\",\n    \"actual_delivery_date\" : \"" + invoice.dateTimeIssued.ToString("yyyy-MM-dd") + "\"\n";
                                CustomerVatNo = customer.VATNumber;
                            }

                            #endregion


                            var GeneralInvoiceText = "";
                            var GeneralInvoiceText_Wosool = "        {\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\\r\\nMHQCAQEEIMx/bzKyOd6q70GwLkCA4PiEiWEiaTKMswIPZVdqJ6dooAcGBSuBBAAK\\r\\noUQDQgAETMNKQCeMtZXNEiEl17cUWt410HdDE1lWcIKUlQVpmRhA8DWw2RWuEpxn\\r\\n4RcbbOvLf2wmBmcVZWPfxwhMU1eTnQ==\\r\\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\\r\\nMIICDTCCAbQCAQAwWDEdMBsGA1UEAwwURUdTMS0zMDA0MjM4MDI5MDAwMDMxGTAX\\r\\nBgNVBAsMEEFMIERhbW1hbSBCcmFuY2gxDzANBgNVBAoMBldvc29vbDELMAkGA1UE\\r\\nBhMCU0EwVjAQBgcqhkjOPQIBBgUrgQQACgNCAARMw0pAJ4y1lc0SISXXtxRa3jXQ\\r\\nd0MTWVZwgpSVBWmZGEDwNbDZFa4SnGfhFxts68t/bCYGZxVlY9/HCExTV5OdoIH8\\r\\nMIH5BgkqhkiG9w0BCQ4xgeswgegwIQYJKwYBBAGCNxQCBBQMElpBVENBLUNvZGUt\\r\\nU2lnbmluZzCBwgYDVR0RBIG6MIG3pIG0MIGxMT4wPAYDVQQEDDUxLVdvc29vbHwy\\r\\nLUlPU3wzLTkyZjUzM2I3LWMxZjgtNDZmZC1hMGY5LTZjY2M4YjI1NTI5YjEfMB0G\\r\\nCgmSJomT8ixkAQEMDzMwMDQyMzgwMjkwMDAwMzENMAsGA1UEDAwEMTAwMDErMCkG\\r\\nA1UEGgwiMzQyMCBEYW1tYW0tRGhhaHJhbiBTdHJlZXQsIERhbW1hbTESMBAGA1UE\\r\\nDwwJTG9naXN0aWNzMAoGCCqGSM49BAMCA0cAMEQCIBWlcsv61Idby2qJoSz5zkTX\\r\\nrCTSqnkx9vkL+A2VpeFiAiA0zP06nPhHGiiIgXETqaI7FbmzUkGJ21WV/tG7Q4sH\\r\\nag==\\r\\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIICNDCCAdugAwIBAgIGAZMBmznOMAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjQxMTA2MTMxMjQ1WhcNMjkxMTA1MjEwMDAwWjBYMR0wGwYDVQQDDBRFR1MxLTMwMDQyMzgwMjkwMDAwMzEZMBcGA1UECwwQQUwgRGFtbWFtIEJyYW5jaDEPMA0GA1UECgwGV29zb29sMQswCQYDVQQGEwJTQTBWMBAGByqGSM49AgEGBSuBBAAKA0IABEzDSkAnjLWVzRIhJde3FFreNdB3QxNZVnCClJUFaZkYQPA1sNkVrhKcZ+EXG2zry39sJgZnFWVj38cITFNXk52jgdYwgdMwDAYDVR0TAQH/BAIwADCBwgYDVR0RBIG6MIG3pIG0MIGxMT4wPAYDVQQEDDUxLVdvc29vbHwyLUlPU3wzLTkyZjUzM2I3LWMxZjgtNDZmZC1hMGY5LTZjY2M4YjI1NTI5YjEfMB0GCgmSJomT8ixkAQEMDzMwMDQyMzgwMjkwMDAwMzENMAsGA1UEDAwEMTAwMDErMCkGA1UEGgwiMzQyMCBEYW1tYW0tRGhhaHJhbiBTdHJlZXQsIERhbW1hbTESMBAGA1UEDwwJTG9naXN0aWNzMAoGCCqGSM49BAMCA0cAMEQCIEjmsxZZIwb91x7VP486EP8AnnFVQxs9sIlEyTDTxG1YAiB7Kouc81giZruJ2Iu3tAuyEBiFqFmHgsmIV25Vp4UvrQ==\\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"02cJn7XKVS9ohGaoCi5O7b56qE9LphiDJfAC1s62dxc=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIIFEzCCBLigAwIBAgITXAAAkt/bjY+xMYk/SQABAACS3zAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTItQ0EwHhcNMjQxMTA2MTMwNTM2WhcNMjkxMTA1MTMwNTM2WjBYMQswCQYDVQQGEwJTQTEPMA0GA1UEChMGV29zb29sMRkwFwYDVQQLExBBTCBEYW1tYW0gQnJhbmNoMR0wGwYDVQQDExRFR1MxLTMwMDQyMzgwMjkwMDAwMzBWMBAGByqGSM49AgEGBSuBBAAKA0IABEzDSkAnjLWVzRIhJde3FFreNdB3QxNZVnCClJUFaZkYQPA1sNkVrhKcZ+EXG2zry39sJgZnFWVj38cITFNXk52jggNYMIIDVDCBwgYDVR0RBIG6MIG3pIG0MIGxMT4wPAYDVQQEDDUxLVdvc29vbHwyLUlPU3wzLTkyZjUzM2I3LWMxZjgtNDZmZC1hMGY5LTZjY2M4YjI1NTI5YjEfMB0GCgmSJomT8ixkAQEMDzMwMDQyMzgwMjkwMDAwMzENMAsGA1UEDAwEMTAwMDErMCkGA1UEGgwiMzQyMCBEYW1tYW0tRGhhaHJhbiBTdHJlZXQsIERhbW1hbTESMBAGA1UEDwwJTG9naXN0aWNzMB0GA1UdDgQWBBRoMDESO1vVm3D2+rajxi0uG7jS3zAfBgNVHSMEGDAWgBRZyHKeeTVp6rzZldTX4GRpAgYQGTCB5QYDVR0fBIHdMIHaMIHXoIHUoIHRhoHObGRhcDovLy9DTj1QUlpFSU5WT0lDRVNDQTItQ0EoMSksQ049UFJaRUlOVk9JQ0VTQ0EyLENOPUNEUCxDTj1QdWJsaWMlMjBLZXklMjBTZXJ2aWNlcyxDTj1TZXJ2aWNlcyxDTj1Db25maWd1cmF0aW9uLERDPWV4dHphdGNhLERDPWdvdixEQz1sb2NhbD9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0P2Jhc2U/b2JqZWN0Q2xhc3M9Y1JMRGlzdHJpYnV0aW9uUG9pbnQwgc4GCCsGAQUFBwEBBIHBMIG+MIG7BggrBgEFBQcwAoaBrmxkYXA6Ly8vQ049UFJaRUlOVk9JQ0VTQ0EyLUNBLENOPUFJQSxDTj1QdWJsaWMlMjBLZXklMjBTZXJ2aWNlcyxDTj1TZXJ2aWNlcyxDTj1Db25maWd1cmF0aW9uLERDPWV4dHphdGNhLERDPWdvdixEQz1sb2NhbD9jQUNlcnRpZmljYXRlP2Jhc2U/b2JqZWN0Q2xhc3M9Y2VydGlmaWNhdGlvbkF1dGhvcml0eTAOBgNVHQ8BAf8EBAMCB4AwPAYJKwYBBAGCNxUHBC8wLQYlKwYBBAGCNxUIgYaoHYTQ+xKG7Z0kh877GdPAVWaH+qVlhdmEPgIBZAIBDjAdBgNVHSUEFjAUBggrBgEFBQcDAwYIKwYBBQUHAwIwJwYJKwYBBAGCNxUKBBowGDAKBggrBgEFBQcDAzAKBggrBgEFBQcDAjAKBggqhkjOPQQDAgNJADBGAiEAy/b1gO3jd0rZGBDdDFdOHhXWTiwwXDQBAxsV9eFyIgUCIQCwgOatiispS96mdjBMrYsAPKNNs5W2XavwTxptS6wNNQ==\\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"tULABB4PEzYK7J7oXvXNqE9QYRkJey4KFJ3SHJBpqSQ=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";
                            var GeneralInvoiceText_MohamedElzafer = "{\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\\r\\nMHQCAQEEIIZdwlurSw3S1McmI2JHpE0WYE639ggLOnAjdbp/6hEWoAcGBSuBBAAK\\r\\noUQDQgAE79fEolWj6NGS9Rd8HQA1VHfHNWcQvbLQNCCIit7znEShk/TEwgpp+fm7\\r\\nsRSEuSQ+F1gP2zQbDm6RndultezlGQ==\\r\\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\\r\\nMIICIzCCAckCAQAwYDEdMBsGA1UEAwwURUdTMS0zMDEyMDMwNjM4MDAwMDMxGDAW\\r\\nBgNVBAsMD0FMIE1hbGF6IEJyYW5jaDEYMBYGA1UECgwPTW9oYW1lZCBBbFphZmVy\\r\\nMQswCQYDVQQGEwJTQTBWMBAGByqGSM49AgEGBSuBBAAKA0IABO/XxKJVo+jRkvUX\\r\\nfB0ANVR3xzVnEL2y0DQgiIre85xEoZP0xMIKafn5u7EUhLkkPhdYD9s0Gw5ukZ3b\\r\\npbXs5RmgggEIMIIBBAYJKoZIhvcNAQkOMYH2MIHzMCEGCSsGAQQBgjcUAgQUDBJa\\r\\nQVRDQS1Db2RlLVNpZ25pbmcwgc0GA1UdEQSBxTCBwqSBvzCBvDFHMEUGA1UEBAw+\\r\\nMS1Nb2hhbWVkIEFsWmFmZXJ8Mi1JT1N8My04ZDQ4NzgxNi03MGI4LTRhZGUtYTYx\\r\\nOC05ZDYyMGI3MzgxNGExHzAdBgoJkiaJk/IsZAEBDA8zMDEyMDMwNjM4MDAwMDMx\\r\\nDTALBgNVBAwMBDEwMDAxLzAtBgNVBBoMJjMzNzIgMzMzNzIgdW1hciBpYm4gYWwg\\r\\na2hhdHRhYiwgUml5YWRoMRAwDgYDVQQPDAdBbFphZmVyMAoGCCqGSM49BAMCA0gA\\r\\nMEUCIQCDtFvRb1Xs6iv8OaO9S0Iz1edW0yuJEAKpLUrZ4Jl4QAIgJzqjarK2ckcB\\r\\nrV1bc/eH5dKVLVYNLcxqAkGxRnXUJUE=\\r\\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIICSTCCAe6gAwIBAgIGAZK5djV+MAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjQxMDIzMTI1OTM5WhcNMjkxMDIyMjEwMDAwWjBgMR0wGwYDVQQDDBRFR1MxLTMwMTIwMzA2MzgwMDAwMzEYMBYGA1UECwwPQUwgTWFsYXogQnJhbmNoMRgwFgYDVQQKDA9Nb2hhbWVkIEFsWmFmZXIxCzAJBgNVBAYTAlNBMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE79fEolWj6NGS9Rd8HQA1VHfHNWcQvbLQNCCIit7znEShk/TEwgpp+fm7sRSEuSQ+F1gP2zQbDm6RndultezlGaOB4TCB3jAMBgNVHRMBAf8EAjAAMIHNBgNVHREEgcUwgcKkgb8wgbwxRzBFBgNVBAQMPjEtTW9oYW1lZCBBbFphZmVyfDItSU9TfDMtOGQ0ODc4MTYtNzBiOC00YWRlLWE2MTgtOWQ2MjBiNzM4MTRhMR8wHQYKCZImiZPyLGQBAQwPMzAxMjAzMDYzODAwMDAzMQ0wCwYDVQQMDAQxMDAwMS8wLQYDVQQaDCYzMzcyIDMzMzcyIHVtYXIgaWJuIGFsIGtoYXR0YWIsIFJpeWFkaDEQMA4GA1UEDwwHQWxaYWZlcjAKBggqhkjOPQQDAgNJADBGAiEAiVACWtZ/kE/rsHwcpyJ2mHBQP+YRWHC6h5ogJ9g8gCECIQD3ILyj8LKq7/RXF6114Vjb5h7dCvAT6Abi3rZO5COrFw==\\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"bUcaxt85QmmOWcNkfYxmgNPeS1EPR+yPYc4QTzh5bvU=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIIFJTCCBMugAwIBAgITFwAAkHj2KR+N687+kQABAACQeDAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTMtQ0EwHhcNMjQxMDIzMTI1MDA0WhcNMjkxMDIyMTI1MDA0WjBgMQswCQYDVQQGEwJTQTEYMBYGA1UEChMPTW9oYW1lZCBBbFphZmVyMRgwFgYDVQQLEw9BTCBNYWxheiBCcmFuY2gxHTAbBgNVBAMTFEVHUzEtMzAxMjAzMDYzODAwMDAzMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE79fEolWj6NGS9Rd8HQA1VHfHNWcQvbLQNCCIit7znEShk/TEwgpp+fm7sRSEuSQ+F1gP2zQbDm6RndultezlGaOCA2MwggNfMIHNBgNVHREEgcUwgcKkgb8wgbwxRzBFBgNVBAQMPjEtTW9oYW1lZCBBbFphZmVyfDItSU9TfDMtOGQ0ODc4MTYtNzBiOC00YWRlLWE2MTgtOWQ2MjBiNzM4MTRhMR8wHQYKCZImiZPyLGQBAQwPMzAxMjAzMDYzODAwMDAzMQ0wCwYDVQQMDAQxMDAwMS8wLQYDVQQaDCYzMzcyIDMzMzcyIHVtYXIgaWJuIGFsIGtoYXR0YWIsIFJpeWFkaDEQMA4GA1UEDwwHQWxaYWZlcjAdBgNVHQ4EFgQU+iplk3sQ02BzNRNfGomcfpvO4ekwHwYDVR0jBBgwFoAUH+WY1CYbZRmb2Yuzu+z+4aeWO3YwgeUGA1UdHwSB3TCB2jCB16CB1KCB0YaBzmxkYXA6Ly8vQ049UFJaRUlOVk9JQ0VTQ0EzLUNBKDEpLENOPVBSWkVJTlZPSUNFU0NBMyxDTj1DRFAsQ049UHVibGljJTIwS2V5JTIwU2VydmljZXMsQ049U2VydmljZXMsQ049Q29uZmlndXJhdGlvbixEQz1leHR6YXRjYSxEQz1nb3YsREM9bG9jYWw/Y2VydGlmaWNhdGVSZXZvY2F0aW9uTGlzdD9iYXNlP29iamVjdENsYXNzPWNSTERpc3RyaWJ1dGlvblBvaW50MIHOBggrBgEFBQcBAQSBwTCBvjCBuwYIKwYBBQUHMAKGga5sZGFwOi8vL0NOPVBSWkVJTlZPSUNFU0NBMy1DQSxDTj1BSUEsQ049UHVibGljJTIwS2V5JTIwU2VydmljZXMsQ049U2VydmljZXMsQ049Q29uZmlndXJhdGlvbixEQz1leHR6YXRjYSxEQz1nb3YsREM9bG9jYWw/Y0FDZXJ0aWZpY2F0ZT9iYXNlP29iamVjdENsYXNzPWNlcnRpZmljYXRpb25BdXRob3JpdHkwDgYDVR0PAQH/BAQDAgeAMDwGCSsGAQQBgjcVBwQvMC0GJSsGAQQBgjcVCIGGqB2E0PsShu2dJIfO+xnTwFVmh/qlZYXZhD4CAWQCAQ4wHQYDVR0lBBYwFAYIKwYBBQUHAwMGCCsGAQUFBwMCMCcGCSsGAQQBgjcVCgQaMBgwCgYIKwYBBQUHAwMwCgYIKwYBBQUHAwIwCgYIKoZIzj0EAwIDSAAwRQIhANExZi7XGkIZ4r5txiVjUf+ASFiTsnJ2iiBt4G6KaWSbAiBcsLfmkf6UYpsq7sZ6nuDE1qHauhdtMMHsLZWrZyEqZA==\\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"e3mg7RI7BrLsBMGg1+OMeEyn8dXmFlS215TB19q4J0o=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";
                            var GeneralInvoiceText_KDL = "{\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\\r\\nMHQCAQEEILmTgw9EjcOGKX7+zz0gefF6hInQy10QyKg5+sJ4v6iLoAcGBSuBBAAK\\r\\noUQDQgAECJguf2pGMOZasuJALjebm4oUbFf6fFcVrBJrkgs/coNEDTrG2rIziMYW\\r\\n9VlMsEMoaTYBxLiL9yfQ5GHJ4ew9YA==\\r\\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\\r\\nMIICCzCCAbECAQAwVTEdMBsGA1UEAwwURUdTMS0zMDAzNDU3NTczMDAwMDMxGTAX\\r\\nBgNVBAsMEEFMIFJpeWFkaCBCcmFuY2gxDDAKBgNVBAoMA0tETDELMAkGA1UEBhMC\\r\\nU0EwVjAQBgcqhkjOPQIBBgUrgQQACgNCAAQImC5/akYw5lqy4kAuN5ubihRsV/p8\\r\\nVxWsEmuSCz9yg0QNOsbasjOIxhb1WUywQyhpNgHEuIv3J9DkYcnh7D1goIH8MIH5\\r\\nBgkqhkiG9w0BCQ4xgeswgegwIQYJKwYBBAGCNxQCBBQMElpBVENBLUNvZGUtU2ln\\r\\nbmluZzCBwgYDVR0RBIG6MIG3pIG0MIGxMTswOQYDVQQEDDIxLUtETHwyLUlPU3wz\\r\\nLWQzYmNlM2Y1LTJlM2UtNGE5Yi1hOWMxLTkyZTI3OGYxYTZiNDEfMB0GCgmSJomT\\r\\n8ixkAQEMDzMwMDM0NTc1NzMwMDAwMzENMAsGA1UEDAwEMTAwMDEuMCwGA1UEGgwl\\r\\nMjY0NSAyNjQ1IHVtYXIgaWJuIGFsIGtoYXR0YWIsIFJpeWFkaDESMBAGA1UEDwwJ\\r\\nTG9naXN0aWNzMAoGCCqGSM49BAMCA0gAMEUCIQDj0IQjaohw54aQWypsDrJFd/bi\\r\\nerRUkOHb38RYatUnUwIgMHPEhelRWuxG8qLVop67WCCQ+I0cpR1gmy/Py7Bl4GE=\\r\\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIICMjCCAdigAwIBAgIGAZMAgsrvMAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjQxMTA2MDgwNjI2WhcNMjkxMTA1MjEwMDAwWjBVMR0wGwYDVQQDDBRFR1MxLTMwMDM0NTc1NzMwMDAwMzEZMBcGA1UECwwQQUwgUml5YWRoIEJyYW5jaDEMMAoGA1UECgwDS0RMMQswCQYDVQQGEwJTQTBWMBAGByqGSM49AgEGBSuBBAAKA0IABAiYLn9qRjDmWrLiQC43m5uKFGxX+nxXFawSa5ILP3KDRA06xtqyM4jGFvVZTLBDKGk2AcS4i/cn0ORhyeHsPWCjgdYwgdMwDAYDVR0TAQH/BAIwADCBwgYDVR0RBIG6MIG3pIG0MIGxMTswOQYDVQQEDDIxLUtETHwyLUlPU3wzLWQzYmNlM2Y1LTJlM2UtNGE5Yi1hOWMxLTkyZTI3OGYxYTZiNDEfMB0GCgmSJomT8ixkAQEMDzMwMDM0NTc1NzMwMDAwMzENMAsGA1UEDAwEMTAwMDEuMCwGA1UEGgwlMjY0NSAyNjQ1IHVtYXIgaWJuIGFsIGtoYXR0YWIsIFJpeWFkaDESMBAGA1UEDwwJTG9naXN0aWNzMAoGCCqGSM49BAMCA0gAMEUCIHT4bIkDvL/Q1y0Zx6RwSUKNi4pVulEvnkmdzrh5sK3TAiEAvZtXgk5++ctXMDCoEkWGMuICvEhRY7dMajy5/Yp0ZxY=\\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"912ECx6JH7tE+eA2PfcxXXXlWj/wF/XOHVA3JTFo5ks=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIIFEDCCBLWgAwIBAgITFwAAlC7d9RBGbU8tcwABAACULjAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTMtQ0EwHhcNMjQxMTA2MDc1NjU3WhcNMjkxMTA1MDc1NjU3WjBVMQswCQYDVQQGEwJTQTEMMAoGA1UEChMDS0RMMRkwFwYDVQQLExBBTCBSaXlhZGggQnJhbmNoMR0wGwYDVQQDExRFR1MxLTMwMDM0NTc1NzMwMDAwMzBWMBAGByqGSM49AgEGBSuBBAAKA0IABAiYLn9qRjDmWrLiQC43m5uKFGxX+nxXFawSa5ILP3KDRA06xtqyM4jGFvVZTLBDKGk2AcS4i/cn0ORhyeHsPWCjggNYMIIDVDCBwgYDVR0RBIG6MIG3pIG0MIGxMTswOQYDVQQEDDIxLUtETHwyLUlPU3wzLWQzYmNlM2Y1LTJlM2UtNGE5Yi1hOWMxLTkyZTI3OGYxYTZiNDEfMB0GCgmSJomT8ixkAQEMDzMwMDM0NTc1NzMwMDAwMzENMAsGA1UEDAwEMTAwMDEuMCwGA1UEGgwlMjY0NSAyNjQ1IHVtYXIgaWJuIGFsIGtoYXR0YWIsIFJpeWFkaDESMBAGA1UEDwwJTG9naXN0aWNzMB0GA1UdDgQWBBRQ6demNcNQRn6Z5isMPjucMFrAazAfBgNVHSMEGDAWgBQf5ZjUJhtlGZvZi7O77P7hp5Y7djCB5QYDVR0fBIHdMIHaMIHXoIHUoIHRhoHObGRhcDovLy9DTj1QUlpFSU5WT0lDRVNDQTMtQ0EoMSksQ049UFJaRUlOVk9JQ0VTQ0EzLENOPUNEUCxDTj1QdWJsaWMlMjBLZXklMjBTZXJ2aWNlcyxDTj1TZXJ2aWNlcyxDTj1Db25maWd1cmF0aW9uLERDPWV4dHphdGNhLERDPWdvdixEQz1sb2NhbD9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0P2Jhc2U/b2JqZWN0Q2xhc3M9Y1JMRGlzdHJpYnV0aW9uUG9pbnQwgc4GCCsGAQUFBwEBBIHBMIG+MIG7BggrBgEFBQcwAoaBrmxkYXA6Ly8vQ049UFJaRUlOVk9JQ0VTQ0EzLUNBLENOPUFJQSxDTj1QdWJsaWMlMjBLZXklMjBTZXJ2aWNlcyxDTj1TZXJ2aWNlcyxDTj1Db25maWd1cmF0aW9uLERDPWV4dHphdGNhLERDPWdvdixEQz1sb2NhbD9jQUNlcnRpZmljYXRlP2Jhc2U/b2JqZWN0Q2xhc3M9Y2VydGlmaWNhdGlvbkF1dGhvcml0eTAOBgNVHQ8BAf8EBAMCB4AwPAYJKwYBBAGCNxUHBC8wLQYlKwYBBAGCNxUIgYaoHYTQ+xKG7Z0kh877GdPAVWaH+qVlhdmEPgIBZAIBDjAdBgNVHSUEFjAUBggrBgEFBQcDAwYIKwYBBQUHAwIwJwYJKwYBBAGCNxUKBBowGDAKBggrBgEFBQcDAzAKBggrBgEFBQcDAjAKBggqhkjOPQQDAgNJADBGAiEA0lp/oIjBqv2ubiuvjyo9tn4InOC90ox4BayjyDXDQC4CIQCF54VRZn1pwshQdeMHLFJBVP+OWnb6c7PpuJCAd9Gv4g==\\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"NvaiwEO22H8ENxAy9imExcqSOzyO8D5FYeSG3aA74yw=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";
                            var GeneralInvoiceText_Moudayfer = "{\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\\r\\nMHQCAQEEIBU2ZgOrtYh4ANE5uHNavPTjtZ+dHbRnOD5WKkKG5ZMcoAcGBSuBBAAK\\r\\noUQDQgAEioKOrxwL9kmw8xAbJnjqrpEVYQ6lJ1kuTjAyvrIkwdawUKCQGp14oB1X\\r\\nrrQtgUfJcNwNI9BZpJR9phLfepm6Ug==\\r\\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\\r\\nMIICCjCCAbACAQAwXTEdMBsGA1UEAwwURUdTMS0zMDAwNDMyNTkxMDAwMDMxGTAX\\r\\nBgNVBAsMEEFMIFJpeWFkaCBCcmFuY2gxFDASBgNVBAoMC2FsbW91ZGF5ZmVyMQsw\\r\\nCQYDVQQGEwJTQTBWMBAGByqGSM49AgEGBSuBBAAKA0IABIqCjq8cC/ZJsPMQGyZ4\\r\\n6q6RFWEOpSdZLk4wMr6yJMHWsFCgkBqdeKAdV660LYFHyXDcDSPQWaSUfaYS33qZ\\r\\nulKggfMwgfAGCSqGSIb3DQEJDjGB4jCB3zAhBgkrBgEEAYI3FAIEFAwSWkFUQ0Et\\r\\nQ29kZS1TaWduaW5nMIG5BgNVHREEgbEwga6kgaswgagxQzBBBgNVBAQMOjEtYWxt\\r\\nb3VkYXlmZXJ8Mi1JT1N8My0zYzk2Y2NjMy03YmE0LTRlNTUtOGE4Yi1lMDBlOWE5\\r\\nMGNmZmYxHzAdBgoJkiaJk/IsZAEBDA8zMDAwNDMyNTkxMDAwMDMxDTALBgNVBAwM\\r\\nBDEwMDAxHTAbBgNVBBoMFDEyNjQzIDEyNjQzICwgUml5YWRoMRIwEAYDVQQPDAlM\\r\\nb2dpc3RpY3MwCgYIKoZIzj0EAwIDSAAwRQIhAOCuYePnfM00PrwIZUEL7IGefnpa\\r\\nxDeqHNRrJ1pNNnToAiAYKhG+f4N02w+WQwXAB9IAzttGFceyYr2tygKoHyClrA==\\r\\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIICMTCCAdegAwIBAgIGAZP9kBkkMAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjQxMjI1MTEyNDU0WhcNMjkxMjI0MjEwMDAwWjBdMR0wGwYDVQQDDBRFR1MxLTMwMDA0MzI1OTEwMDAwMzEZMBcGA1UECwwQQUwgUml5YWRoIEJyYW5jaDEUMBIGA1UECgwLYWxtb3VkYXlmZXIxCzAJBgNVBAYTAlNBMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEioKOrxwL9kmw8xAbJnjqrpEVYQ6lJ1kuTjAyvrIkwdawUKCQGp14oB1XrrQtgUfJcNwNI9BZpJR9phLfepm6UqOBzTCByjAMBgNVHRMBAf8EAjAAMIG5BgNVHREEgbEwga6kgaswgagxQzBBBgNVBAQMOjEtYWxtb3VkYXlmZXJ8Mi1JT1N8My0zYzk2Y2NjMy03YmE0LTRlNTUtOGE4Yi1lMDBlOWE5MGNmZmYxHzAdBgoJkiaJk/IsZAEBDA8zMDAwNDMyNTkxMDAwMDMxDTALBgNVBAwMBDEwMDAxHTAbBgNVBBoMFDEyNjQzIDEyNjQzICwgUml5YWRoMRIwEAYDVQQPDAlMb2dpc3RpY3MwCgYIKoZIzj0EAwIDSAAwRQIgQjNmn+lIfJBD3hV+mJF7sxPdKEAwE8L5amcEOmMWUM0CIQDInvzyyMXxLvCIgtPBAMdT5kQaW/cfl2t0cVKy03UeRg==\\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"OsAK41qhjw/lXlcZqW2zTuYVJpFc6bCIYJsFlh2VCio=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIIFDzCCBLSgAwIBAgITXAAAoMqjVdQu22q9OAABAACgyjAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTItQ0EwHhcNMjQxMjI1MTExNjIyWhcNMjkxMjI0MTExNjIyWjBdMQswCQYDVQQGEwJTQTEUMBIGA1UEChMLYWxtb3VkYXlmZXIxGTAXBgNVBAsTEEFMIFJpeWFkaCBCcmFuY2gxHTAbBgNVBAMTFEVHUzEtMzAwMDQzMjU5MTAwMDAzMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEioKOrxwL9kmw8xAbJnjqrpEVYQ6lJ1kuTjAyvrIkwdawUKCQGp14oB1XrrQtgUfJcNwNI9BZpJR9phLfepm6UqOCA08wggNLMIG5BgNVHREEgbEwga6kgaswgagxQzBBBgNVBAQMOjEtYWxtb3VkYXlmZXJ8Mi1JT1N8My0zYzk2Y2NjMy03YmE0LTRlNTUtOGE4Yi1lMDBlOWE5MGNmZmYxHzAdBgoJkiaJk/IsZAEBDA8zMDAwNDMyNTkxMDAwMDMxDTALBgNVBAwMBDEwMDAxHTAbBgNVBBoMFDEyNjQzIDEyNjQzICwgUml5YWRoMRIwEAYDVQQPDAlMb2dpc3RpY3MwHQYDVR0OBBYEFMlYs0phJV55uoE+5PBYZJmuUiWvMB8GA1UdIwQYMBaAFFnIcp55NWnqvNmV1NfgZGkCBhAZMIHlBgNVHR8Egd0wgdowgdeggdSggdGGgc5sZGFwOi8vL0NOPVBSWkVJTlZPSUNFU0NBMi1DQSgxKSxDTj1QUlpFSU5WT0lDRVNDQTIsQ049Q0RQLENOPVB1YmxpYyUyMEtleSUyMFNlcnZpY2VzLENOPVNlcnZpY2VzLENOPUNvbmZpZ3VyYXRpb24sREM9ZXh0emF0Y2EsREM9Z292LERDPWxvY2FsP2NlcnRpZmljYXRlUmV2b2NhdGlvbkxpc3Q/YmFzZT9vYmplY3RDbGFzcz1jUkxEaXN0cmlidXRpb25Qb2ludDCBzgYIKwYBBQUHAQEEgcEwgb4wgbsGCCsGAQUFBzAChoGubGRhcDovLy9DTj1QUlpFSU5WT0lDRVNDQTItQ0EsQ049QUlBLENOPVB1YmxpYyUyMEtleSUyMFNlcnZpY2VzLENOPVNlcnZpY2VzLENOPUNvbmZpZ3VyYXRpb24sREM9ZXh0emF0Y2EsREM9Z292LERDPWxvY2FsP2NBQ2VydGlmaWNhdGU/YmFzZT9vYmplY3RDbGFzcz1jZXJ0aWZpY2F0aW9uQXV0aG9yaXR5MA4GA1UdDwEB/wQEAwIHgDA8BgkrBgEEAYI3FQcELzAtBiUrBgEEAYI3FQiBhqgdhND7EobtnSSHzvsZ08BVZof6pWWF2YQ+AgFkAgEOMB0GA1UdJQQWMBQGCCsGAQUFBwMDBggrBgEFBQcDAjAnBgkrBgEEAYI3FQoEGjAYMAoGCCsGAQUFBwMDMAoGCCsGAQUFBwMCMAoGCCqGSM49BAMCA0kAMEYCIQCLgqt1+mCTJe0v4905r/yY32/kfJyeqSue6Kfy7rdG0QIhAOS36euyaut53eEqQO4p/7SuA66jmIIX+rTXLbj+PJpo\\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"lHMg+Mafe8TlJ6mxfPzdU6j01jmsztMtaHamCRcfCHE=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";
                            var GeneralInvoiceText_Badr = "{\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\\r\\nMHQCAQEEICWeOm81fx+p95IC1AXqetYsYZRZHontvo0xBy11lt83oAcGBSuBBAAK\\r\\noUQDQgAEIZuux3lwQ3/T83/9kfNDUSjtJkXh4p6MhDlKyReR53kDu6ukG50vOjzH\\r\\n4z3qI3xTLjOAyrUX9tTalSgGTEe12A==\\r\\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\\r\\nMIICFjCCAbsCAQAwYzEdMBsGA1UEAwwURUdTMS0zMDA5ODM4NjI5MDAwMDMxFTAT\\r\\nBgNVBAsMDFlBTkJVIEJyYW5jaDEeMBwGA1UECgwVYWxiYWRlciB0cmFuc3BvcnQg\\r\\nZXN0MQswCQYDVQQGEwJTQTBWMBAGByqGSM49AgEGBSuBBAAKA0IABCGbrsd5cEN/\\r\\n0/N//ZHzQ1Eo7SZF4eKejIQ5SskXked5A7urpBudLzo8x+M96iN8Uy4zgMq1F/bU\\r\\n2pUoBkxHtdiggfgwgfUGCSqGSIb3DQEJDjGB5zCB5DAhBgkrBgEEAYI3FAIEFAwS\\r\\nWkFUQ0EtQ29kZS1TaWduaW5nMIG+BgNVHREEgbYwgbOkgbAwga0xPjA8BgNVBAQM\\r\\nNTEtYWxiYWRyfDItSU9TfDMtNDI5OTQ4NWUtM2NkNi00MGQ3LWE4MjgtMjlkODJm\\r\\nZjkzMzk3MR8wHQYKCZImiZPyLGQBAQwPMzAwOTgzODYyOTAwMDAzMQ0wCwYDVQQM\\r\\nDAQxMDAwMScwJQYDVQQaDB40ODc3IEFiZHVsbGFoIGlibiBrYWFiICwgWUFOQlUx\\r\\nEjAQBgNVBA8MCUxvZ2lzdGljczAKBggqhkjOPQQDAgNJADBGAiEA3FAjbMLq4S1f\\r\\ncB7Vdfs1kFu2bk9uaRr8vqSAutpxO9ICIQDrTYVsEX8wGpcWxPRGh7lFIuKYvDTA\\r\\nqw7ZleK1qOFAOA==\\r\\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIICPDCCAeKgAwIBAgIGAZQSFf+vMAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjQxMjI5MTEwMzM0WhcNMjkxMjI4MjEwMDAwWjBjMR0wGwYDVQQDDBRFR1MxLTMwMDk4Mzg2MjkwMDAwMzEVMBMGA1UECwwMWUFOQlUgQnJhbmNoMR4wHAYDVQQKDBVhbGJhZGVyIHRyYW5zcG9ydCBlc3QxCzAJBgNVBAYTAlNBMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEIZuux3lwQ3/T83/9kfNDUSjtJkXh4p6MhDlKyReR53kDu6ukG50vOjzH4z3qI3xTLjOAyrUX9tTalSgGTEe12KOB0jCBzzAMBgNVHRMBAf8EAjAAMIG+BgNVHREEgbYwgbOkgbAwga0xPjA8BgNVBAQMNTEtYWxiYWRyfDItSU9TfDMtNDI5OTQ4NWUtM2NkNi00MGQ3LWE4MjgtMjlkODJmZjkzMzk3MR8wHQYKCZImiZPyLGQBAQwPMzAwOTgzODYyOTAwMDAzMQ0wCwYDVQQMDAQxMDAwMScwJQYDVQQaDB40ODc3IEFiZHVsbGFoIGlibiBrYWFiICwgWUFOQlUxEjAQBgNVBA8MCUxvZ2lzdGljczAKBggqhkjOPQQDAgNIADBFAiAPodXWAwWJ0Vb2SmLB93dpo2TGM1zMaZPVoWEdNEzavAIhANs3Fq+RCWGT692rPDKJWLw+9bRk+1SNZyFtYKTm4zNk\\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"puMY6JIa17XY/9I3/NseUlqbZGbZ7r/9P6kqbQhS7KI=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIIFGTCCBL+gAwIBAgITVAAAqDB8i1mkdCXFBwABAACoMDAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTEtQ0EwHhcNMjQxMjI5MTA1MzQ5WhcNMjkxMjI4MTA1MzQ5WjBjMQswCQYDVQQGEwJTQTEeMBwGA1UEChMVYWxiYWRlciB0cmFuc3BvcnQgZXN0MRUwEwYDVQQLEwxZQU5CVSBCcmFuY2gxHTAbBgNVBAMTFEVHUzEtMzAwOTgzODYyOTAwMDAzMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEIZuux3lwQ3/T83/9kfNDUSjtJkXh4p6MhDlKyReR53kDu6ukG50vOjzH4z3qI3xTLjOAyrUX9tTalSgGTEe12KOCA1QwggNQMIG+BgNVHREEgbYwgbOkgbAwga0xPjA8BgNVBAQMNTEtYWxiYWRyfDItSU9TfDMtNDI5OTQ4NWUtM2NkNi00MGQ3LWE4MjgtMjlkODJmZjkzMzk3MR8wHQYKCZImiZPyLGQBAQwPMzAwOTgzODYyOTAwMDAzMQ0wCwYDVQQMDAQxMDAwMScwJQYDVQQaDB40ODc3IEFiZHVsbGFoIGlibiBrYWFiICwgWUFOQlUxEjAQBgNVBA8MCUxvZ2lzdGljczAdBgNVHQ4EFgQUkDhsztyGeLpc01n5fMe6bDjiWbswHwYDVR0jBBgwFoAUcpPRDmv6JFsTherBFfO4FfsbBY0wgeUGA1UdHwSB3TCB2jCB16CB1KCB0YaBzmxkYXA6Ly8vQ049UFJaRUlOVk9JQ0VTQ0ExLUNBKDEpLENOPVBSWkVJTlZPSUNFU0NBMSxDTj1DRFAsQ049UHVibGljJTIwS2V5JTIwU2VydmljZXMsQ049U2VydmljZXMsQ049Q29uZmlndXJhdGlvbixEQz1leHR6YXRjYSxEQz1nb3YsREM9bG9jYWw/Y2VydGlmaWNhdGVSZXZvY2F0aW9uTGlzdD9iYXNlP29iamVjdENsYXNzPWNSTERpc3RyaWJ1dGlvblBvaW50MIHOBggrBgEFBQcBAQSBwTCBvjCBuwYIKwYBBQUHMAKGga5sZGFwOi8vL0NOPVBSWkVJTlZPSUNFU0NBMS1DQSxDTj1BSUEsQ049UHVibGljJTIwS2V5JTIwU2VydmljZXMsQ049U2VydmljZXMsQ049Q29uZmlndXJhdGlvbixEQz1leHR6YXRjYSxEQz1nb3YsREM9bG9jYWw/Y0FDZXJ0aWZpY2F0ZT9iYXNlP29iamVjdENsYXNzPWNlcnRpZmljYXRpb25BdXRob3JpdHkwDgYDVR0PAQH/BAQDAgeAMDwGCSsGAQQBgjcVBwQvMC0GJSsGAQQBgjcVCIGGqB2E0PsShu2dJIfO+xnTwFVmh/qlZYXZhD4CAWQCAQ4wHQYDVR0lBBYwFAYIKwYBBQUHAwMGCCsGAQUFBwMCMCcGCSsGAQQBgjcVCgQaMBgwCgYIKwYBBQUHAwMwCgYIKwYBBQUHAwIwCgYIKoZIzj0EAwIDSAAwRQIhAPkwBF3Mcpclkz4wmxqbw8SS+u1P06eJS8X258c7flajAiA8gblaFQaepXUip3BkTXAYJrEPWugjAicXUhXgFkGsgA==\\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"kazfEu9Fva66wGpO31UbN7Wwhfdjvkr1RZAoyQo3xq4=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";
                            var GeneralInvoiceText_MidLineLogistics = "{\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\\r\\nMHQCAQEEIC6lexAKkF1Smw46ssbl7ArYIz62bKHkGUZwzxmB6mxPoAcGBSuBBAAK\\r\\noUQDQgAEvnYfnm3GN10WCzB5hrOLSVWN5wTLNXnEZNP92ftlqUdxYG4D5a9CMjQl\\r\\nuRnp6pBuNwp+lx336KY4sgBf5XPY6A==\\r\\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\\r\\nMIICHTCCAcQCAQAwXzEdMBsGA1UEAwwURUdTMS0zMTAzNDgxMTQyMDAwMDMxFjAU\\r\\nBgNVBAsMDURhbW1hbSBCcmFuY2gxGTAXBgNVBAoMEE1pZExpbmVMb2dpc3RpY3Mx\\r\\nCzAJBgNVBAYTAlNBMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEvnYfnm3GN10WCzB5\\r\\nhrOLSVWN5wTLNXnEZNP92ftlqUdxYG4D5a9CMjQluRnp6pBuNwp+lx336KY4sgBf\\r\\n5XPY6KCCAQQwggEABgkqhkiG9w0BCQ4xgfIwge8wIQYJKwYBBAGCNxQCBBQMElpB\\r\\nVENBLUNvZGUtU2lnbmluZzCByQYDVR0RBIHBMIG+pIG7MIG4MUgwRgYDVQQEDD8x\\r\\nLU1pZExpbmVMb2dpc3RpY3N8Mi1JT1N8My1lNDRkMzRkYS03ZTYwLTQ3M2YtOWVj\\r\\nYi0zYTg3OGQ4ZGQxODYxHzAdBgoJkiaJk/IsZAEBDA8zMTAzNDgxMTQyMDAwMDMx\\r\\nDTALBgNVBAwMBDEwMDAxKDAmBgNVBBoMHzI4MTQgQWJkdWxsYWggaWJuIGthYWIg\\r\\nLCBEYW1tYW0xEjAQBgNVBA8MCUxvZ2lzdGljczAKBggqhkjOPQQDAgNHADBEAiBC\\r\\nwOeB4/YXFM4X9MA/I2ZOWiEfe36rK8WYpGtlVcLMuQIgJMjdQT+b6fWO2QkWpuBH\\r\\ny9PggjvDgFOe5NrYAHHgHbc=\\r\\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIICRDCCAemgAwIBAgIGAZQm6z/jMAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjUwMTAyMTIwODU0WhcNMzAwMTAxMjEwMDAwWjBfMR0wGwYDVQQDDBRFR1MxLTMxMDM0ODExNDIwMDAwMzEWMBQGA1UECwwNRGFtbWFtIEJyYW5jaDEZMBcGA1UECgwQTWlkTGluZUxvZ2lzdGljczELMAkGA1UEBhMCU0EwVjAQBgcqhkjOPQIBBgUrgQQACgNCAAS+dh+ebcY3XRYLMHmGs4tJVY3nBMs1ecRk0/3Z+2WpR3FgbgPlr0IyNCW5GenqkG43Cn6XHffopjiyAF/lc9joo4HdMIHaMAwGA1UdEwEB/wQCMAAwgckGA1UdEQSBwTCBvqSBuzCBuDFIMEYGA1UEBAw/MS1NaWRMaW5lTG9naXN0aWNzfDItSU9TfDMtZTQ0ZDM0ZGEtN2U2MC00NzNmLTllY2ItM2E4NzhkOGRkMTg2MR8wHQYKCZImiZPyLGQBAQwPMzEwMzQ4MTE0MjAwMDAzMQ0wCwYDVQQMDAQxMDAwMSgwJgYDVQQaDB8yODE0IEFiZHVsbGFoIGlibiBrYWFiICwgRGFtbWFtMRIwEAYDVQQPDAlMb2dpc3RpY3MwCgYIKoZIzj0EAwIDSQAwRgIhAMpHHTc+xXqxa9nA3jGxa4XcN0XiDkgKoolHDltPVdM+AiEA4ojVGNn0YWwDAV+I72ebE7UtLMwMxl6veSkenRe4LbQ=\\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"js8K1oi4oRAY7J/5bQzcnu1iDzZCdchdutLwcLrafwQ=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIIFIDCCBMagAwIBAgITFwAAqlK5FNzy9eVqjgABAACqUjAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTMtQ0EwHhcNMjUwMTAyMTE1OTA4WhcNMzAwMTAxMTE1OTA4WjBfMQswCQYDVQQGEwJTQTEZMBcGA1UEChMQTWlkTGluZUxvZ2lzdGljczEWMBQGA1UECxMNRGFtbWFtIEJyYW5jaDEdMBsGA1UEAxMURUdTMS0zMTAzNDgxMTQyMDAwMDMwVjAQBgcqhkjOPQIBBgUrgQQACgNCAAS+dh+ebcY3XRYLMHmGs4tJVY3nBMs1ecRk0/3Z+2WpR3FgbgPlr0IyNCW5GenqkG43Cn6XHffopjiyAF/lc9joo4IDXzCCA1swgckGA1UdEQSBwTCBvqSBuzCBuDFIMEYGA1UEBAw/MS1NaWRMaW5lTG9naXN0aWNzfDItSU9TfDMtZTQ0ZDM0ZGEtN2U2MC00NzNmLTllY2ItM2E4NzhkOGRkMTg2MR8wHQYKCZImiZPyLGQBAQwPMzEwMzQ4MTE0MjAwMDAzMQ0wCwYDVQQMDAQxMDAwMSgwJgYDVQQaDB8yODE0IEFiZHVsbGFoIGlibiBrYWFiICwgRGFtbWFtMRIwEAYDVQQPDAlMb2dpc3RpY3MwHQYDVR0OBBYEFCjPtMDPQjSFI8NmQ5bNmsTbkcuYMB8GA1UdIwQYMBaAFB/lmNQmG2UZm9mLs7vs/uGnljt2MIHlBgNVHR8Egd0wgdowgdeggdSggdGGgc5sZGFwOi8vL0NOPVBSWkVJTlZPSUNFU0NBMy1DQSgxKSxDTj1QUlpFSU5WT0lDRVNDQTMsQ049Q0RQLENOPVB1YmxpYyUyMEtleSUyMFNlcnZpY2VzLENOPVNlcnZpY2VzLENOPUNvbmZpZ3VyYXRpb24sREM9ZXh0emF0Y2EsREM9Z292LERDPWxvY2FsP2NlcnRpZmljYXRlUmV2b2NhdGlvbkxpc3Q/YmFzZT9vYmplY3RDbGFzcz1jUkxEaXN0cmlidXRpb25Qb2ludDCBzgYIKwYBBQUHAQEEgcEwgb4wgbsGCCsGAQUFBzAChoGubGRhcDovLy9DTj1QUlpFSU5WT0lDRVNDQTMtQ0EsQ049QUlBLENOPVB1YmxpYyUyMEtleSUyMFNlcnZpY2VzLENOPVNlcnZpY2VzLENOPUNvbmZpZ3VyYXRpb24sREM9ZXh0emF0Y2EsREM9Z292LERDPWxvY2FsP2NBQ2VydGlmaWNhdGU/YmFzZT9vYmplY3RDbGFzcz1jZXJ0aWZpY2F0aW9uQXV0aG9yaXR5MA4GA1UdDwEB/wQEAwIHgDA8BgkrBgEEAYI3FQcELzAtBiUrBgEEAYI3FQiBhqgdhND7EobtnSSHzvsZ08BVZof6pWWF2YQ+AgFkAgEOMB0GA1UdJQQWMBQGCCsGAQUFBwMDBggrBgEFBQcDAjAnBgkrBgEEAYI3FQoEGjAYMAoGCCsGAQUFBwMDMAoGCCsGAQUFBwMCMAoGCCqGSM49BAMCA0gAMEUCIBYq5cF/ubeiQP4CaWyM7hDQvWKEC4ee4ZIxs8rQpBd/AiEApCJuAGrAfEKQxYyERFdu6l1ersqAnvmQH9h/iFO00ms=\\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"A9uQlPvoZx6c849KIPmGnMxoAKxPC80qEZnWATKZrlE=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";
                            var GeneralInvoiceText_Mithaq = "{\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\\r\\nMHQCAQEEIEf1fyST2FDPS0DeqM2cDaeIP+NIu5OOWd6StvoCqrAkoAcGBSuBBAAK\\r\\noUQDQgAEBqQZF+3dZAzM46hIHS7J3BG3RTc3D9rye79ckeq3IoMQxEpjYf/tW8L5\\r\\nicGsgLLOTezfUDemhJ/yExgfo+Iykg==\\r\\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\\r\\nMIICTTCCAfICAQAwbDEdMBsGA1UEAwwURUdTMS0zMDIyNTk1MzU5MDAwMDMxFjAU\\r\\nBgNVBAsMDURhbW1hbSBCcmFuY2gxJjAkBgNVBAoMHU1pdGhhcSBBbFNoYXJxaWEg\\r\\nVHJhbnNwb3J0IGNvMQswCQYDVQQGEwJTQTBWMBAGByqGSM49AgEGBSuBBAAKA0IA\\r\\nBAakGRft3WQMzOOoSB0uydwRt0U3Nw/a8nu/XJHqtyKDEMRKY2H/7VvC+YnBrICy\\r\\nzk3s31A3poSf8hMYH6PiMpKgggElMIIBIQYJKoZIhvcNAQkOMYIBEjCCAQ4wIQYJ\\r\\nKwYBBAGCNxQCBBQMElpBVENBLUNvZGUtU2lnbmluZzCB6AYDVR0RBIHgMIHdpIHa\\r\\nMIHXMVUwUwYDVQQEDEwxLU1pdGhhcSBBbFNoYXJxaWEgVHJhbnNwb3J0IGNvfDIt\\r\\nSU9TfDMtMmE4ZTJhNmEtMzA4MS00YWY2LThiYWYtODc3NTY2OTJiNGU1MR8wHQYK\\r\\nCZImiZPyLGQBAQwPMzAyMjU5NTM1OTAwMDAzMQ0wCwYDVQQMDAQxMDAwMTowOAYD\\r\\nVQQaDDE4MjY2IEFkaCBEaGFocmFuIEFsIEp1YmFpbCBFeHByZXNzd2F5IFJkICwg\\r\\nRGFtbWFtMRIwEAYDVQQPDAlMb2dpc3RpY3MwCgYIKoZIzj0EAwIDSQAwRgIhAPJd\\r\\nbH1Vt5tAevQ5MEQgtgeOpATdBSSeeV1+06V0vGZTAiEAkcbLIN9Fc8qLF75ZllVw\\r\\nLOd+texobzgx6NaGOcfEwBM=\\r\\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIICbjCCAhWgAwIBAgIGAZRfQsfqMAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjUwMTEzMTA0MzE0WhcNMzAwMTEyMjEwMDAwWjBsMR0wGwYDVQQDDBRFR1MxLTMwMjI1OTUzNTkwMDAwMzEWMBQGA1UECwwNRGFtbWFtIEJyYW5jaDEmMCQGA1UECgwdTWl0aGFxIEFsU2hhcnFpYSBUcmFuc3BvcnQgY28xCzAJBgNVBAYTAlNBMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEBqQZF+3dZAzM46hIHS7J3BG3RTc3D9rye79ckeq3IoMQxEpjYf/tW8L5icGsgLLOTezfUDemhJ/yExgfo+IykqOB/DCB+TAMBgNVHRMBAf8EAjAAMIHoBgNVHREEgeAwgd2kgdowgdcxVTBTBgNVBAQMTDEtTWl0aGFxIEFsU2hhcnFpYSBUcmFuc3BvcnQgY298Mi1JT1N8My0yYThlMmE2YS0zMDgxLTRhZjYtOGJhZi04Nzc1NjY5MmI0ZTUxHzAdBgoJkiaJk/IsZAEBDA8zMDIyNTk1MzU5MDAwMDMxDTALBgNVBAwMBDEwMDAxOjA4BgNVBBoMMTgyNjYgQWRoIERoYWhyYW4gQWwgSnViYWlsIEV4cHJlc3N3YXkgUmQgLCBEYW1tYW0xEjAQBgNVBA8MCUxvZ2lzdGljczAKBggqhkjOPQQDAgNHADBEAiAnSvjQg2jte0NI4GurkO6Ingl+dt5j9f+8vNuWqnXavAIgfRPYFjp2IuHuYTvMAcPi5C6jdoURULvn4PoLQMpXEGQ=\\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"6YEvwj4S64BNlv9uGfW/PkyyplpkrX6SwByae6xLcgY=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIIFTTCCBPKgAwIBAgITVAAAswz9PGlgT/IR8wABAACzDDAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTEtQ0EwHhcNMjUwMTEzMTAzMzI4WhcNMzAwMTEyMTAzMzI4WjBsMQswCQYDVQQGEwJTQTEmMCQGA1UEChMdTWl0aGFxIEFsU2hhcnFpYSBUcmFuc3BvcnQgY28xFjAUBgNVBAsTDURhbW1hbSBCcmFuY2gxHTAbBgNVBAMTFEVHUzEtMzAyMjU5NTM1OTAwMDAzMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEBqQZF+3dZAzM46hIHS7J3BG3RTc3D9rye79ckeq3IoMQxEpjYf/tW8L5icGsgLLOTezfUDemhJ/yExgfo+IykqOCA34wggN6MIHoBgNVHREEgeAwgd2kgdowgdcxVTBTBgNVBAQMTDEtTWl0aGFxIEFsU2hhcnFpYSBUcmFuc3BvcnQgY298Mi1JT1N8My0yYThlMmE2YS0zMDgxLTRhZjYtOGJhZi04Nzc1NjY5MmI0ZTUxHzAdBgoJkiaJk/IsZAEBDA8zMDIyNTk1MzU5MDAwMDMxDTALBgNVBAwMBDEwMDAxOjA4BgNVBBoMMTgyNjYgQWRoIERoYWhyYW4gQWwgSnViYWlsIEV4cHJlc3N3YXkgUmQgLCBEYW1tYW0xEjAQBgNVBA8MCUxvZ2lzdGljczAdBgNVHQ4EFgQUYd0At+oL6C+g2Fw3WFRlCCzx3l8wHwYDVR0jBBgwFoAUcpPRDmv6JFsTherBFfO4FfsbBY0wgeUGA1UdHwSB3TCB2jCB16CB1KCB0YaBzmxkYXA6Ly8vQ049UFJaRUlOVk9JQ0VTQ0ExLUNBKDEpLENOPVBSWkVJTlZPSUNFU0NBMSxDTj1DRFAsQ049UHVibGljJTIwS2V5JTIwU2VydmljZXMsQ049U2VydmljZXMsQ049Q29uZmlndXJhdGlvbixEQz1leHR6YXRjYSxEQz1nb3YsREM9bG9jYWw/Y2VydGlmaWNhdGVSZXZvY2F0aW9uTGlzdD9iYXNlP29iamVjdENsYXNzPWNSTERpc3RyaWJ1dGlvblBvaW50MIHOBggrBgEFBQcBAQSBwTCBvjCBuwYIKwYBBQUHMAKGga5sZGFwOi8vL0NOPVBSWkVJTlZPSUNFU0NBMS1DQSxDTj1BSUEsQ049UHVibGljJTIwS2V5JTIwU2VydmljZXMsQ049U2VydmljZXMsQ049Q29uZmlndXJhdGlvbixEQz1leHR6YXRjYSxEQz1nb3YsREM9bG9jYWw/Y0FDZXJ0aWZpY2F0ZT9iYXNlP29iamVjdENsYXNzPWNlcnRpZmljYXRpb25BdXRob3JpdHkwDgYDVR0PAQH/BAQDAgeAMDwGCSsGAQQBgjcVBwQvMC0GJSsGAQQBgjcVCIGGqB2E0PsShu2dJIfO+xnTwFVmh/qlZYXZhD4CAWQCAQ4wHQYDVR0lBBYwFAYIKwYBBQUHAwMGCCsGAQUFBwMCMCcGCSsGAQQBgjcVCgQaMBgwCgYIKwYBBQUHAwMwCgYIKwYBBQUHAwIwCgYIKoZIzj0EAwIDSQAwRgIhAOERHOzoonnIwZYNdM/tSxZEE8ZLMP1a2K3s0BYkc/R+AiEAqZ8bpRlS7FDGmObkAf6+9nFWtCgHh9xKDSjeUbW1WMg=\\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"A0J3GPlvQXr/rb/v4FntDRBadY1lr6c1qZU7tCGrbx0=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";
                            var GeneralInvoiceText_Emaar = "{\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\r\nMHQCAQEEIEFJmx91knbm9yOmANeoQpkf1kMtks1w/dUPIiVmTTszoAcGBSuBBAAK\r\noUQDQgAEWhomJtcRWoddBu7yZH9T0OyHvgb5ABT1CfQSLCT2JrjwaWKuNHTXWUjw\r\nyGl9BxvVdlpQHtCiGG42RaujAtAsUA==\r\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\r\nMIICUTCCAfkCAQAwbzEdMBsGA1UEAwwURUdTMS0zMTI4MzY4MDM5MDAwMDMxGjAY\r\nBgNVBAsMEUFMLU1BSk1BQUggQnJhbmNoMSUwIwYDVQQKDBxFbWFhciBHdWxmIFRy\r\nYW5zcG9ydGF0aW9uIENPMQswCQYDVQQGEwJTQTBWMBAGByqGSM49AgEGBSuBBAAK\r\nA0IABFoaJibXEVqHXQbu8mR/U9Dsh74G+QAU9Qn0Eiwk9ia48GlirjR011lI8Mhp\r\nfQcb1XZaUB7QohhuNkWrowLQLFCgggEpMIIBJQYJKoZIhvcNAQkOMYIBFjCCARIw\r\nIQYJKwYBBAGCNxQCBBQMElpBVENBLUNvZGUtU2lnbmluZzCB7AYDVR0RBIHkMIHh\r\npIHeMIHbMVQwUgYDVQQEDEsxLUVtYWFyIEd1bGYgVHJhbnNwb3J0YXRpb24gQ098\r\nMi1JT1N8My1mY2NjZTlkMC1jOTI0LTQ4YTMtOGI5MS01MjU4NTUxYzEzNjIxHzAd\r\nBgoJkiaJk/IsZAEBDA8zMTI4MzY4MDM5MDAwMDMxDTALBgNVBAwMBDEwMDAxOjA4\r\nBgNVBBoMMTc4MzIgRXN0Ok1ham1hYWgsIFByaW5jZSBOYXllZiBTdHJlZXQsIEFs\r\nLU1ham1hYWgxFzAVBgNVBA8MDlRyYW5zcG9ydGF0aW9uMAoGCCqGSM49BAMCA0YA\r\nMEMCIFMiKHUiCknIehrqpcrWM49Ccu0j++vyjYa6KzPznvxQAh94+zxmLgxYa+f6\r\nhIK+t+qsBGy8pS6CUley9Gb0DH8J\r\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\nMIICeDCCAh2gAwIBAgIGAZT0e8yVMAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjUwMjExMTAwODU2WhcNMzAwMjEwMjEwMDAwWjBvMR0wGwYDVQQDDBRFR1MxLTMxMjgzNjgwMzkwMDAwMzEaMBgGA1UECwwRQUwtTUFKTUFBSCBCcmFuY2gxJTAjBgNVBAoMHEVtYWFyIEd1bGYgVHJhbnNwb3J0YXRpb24gQ08xCzAJBgNVBAYTAlNBMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEWhomJtcRWoddBu7yZH9T0OyHvgb5ABT1CfQSLCT2JrjwaWKuNHTXWUjwyGl9BxvVdlpQHtCiGG42RaujAtAsUKOCAQAwgf0wDAYDVR0TAQH/BAIwADCB7AYDVR0RBIHkMIHhpIHeMIHbMVQwUgYDVQQEDEsxLUVtYWFyIEd1bGYgVHJhbnNwb3J0YXRpb24gQ098Mi1JT1N8My1mY2NjZTlkMC1jOTI0LTQ4YTMtOGI5MS01MjU4NTUxYzEzNjIxHzAdBgoJkiaJk/IsZAEBDA8zMTI4MzY4MDM5MDAwMDMxDTALBgNVBAwMBDEwMDAxOjA4BgNVBBoMMTc4MzIgRXN0Ok1ham1hYWgsIFByaW5jZSBOYXllZiBTdHJlZXQsIEFsLU1ham1hYWgxFzAVBgNVBA8MDlRyYW5zcG9ydGF0aW9uMAoGCCqGSM49BAMCA0kAMEYCIQD0YKGv75zrLlSTWPX13Y1X2KkHFMUjhYag+y+0hriGegIhALBMOFtks/DPuSk2syrQ+t0QhLwRhCm1ewU1ZjaAJlST\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"m94AZw4rNwkmPKMVU70KbgaFWGfZ7eQ7q+d3GAaKjps=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\nMIIFUzCCBPmgAwIBAgITFwAAx1x0gV+Q4ABv6AABAADHXDAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTMtQ0EwHhcNMjUwMjExMDk1OTIyWhcNMzAwMjEwMDk1OTIyWjBvMQswCQYDVQQGEwJTQTElMCMGA1UEChMcRW1hYXIgR3VsZiBUcmFuc3BvcnRhdGlvbiBDTzEaMBgGA1UECxMRQUwtTUFKTUFBSCBCcmFuY2gxHTAbBgNVBAMTFEVHUzEtMzEyODM2ODAzOTAwMDAzMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEWhomJtcRWoddBu7yZH9T0OyHvgb5ABT1CfQSLCT2JrjwaWKuNHTXWUjwyGl9BxvVdlpQHtCiGG42RaujAtAsUKOCA4IwggN+MIHsBgNVHREEgeQwgeGkgd4wgdsxVDBSBgNVBAQMSzEtRW1hYXIgR3VsZiBUcmFuc3BvcnRhdGlvbiBDT3wyLUlPU3wzLWZjY2NlOWQwLWM5MjQtNDhhMy04YjkxLTUyNTg1NTFjMTM2MjEfMB0GCgmSJomT8ixkAQEMDzMxMjgzNjgwMzkwMDAwMzENMAsGA1UEDAwEMTAwMDE6MDgGA1UEGgwxNzgzMiBFc3Q6TWFqbWFhaCwgUHJpbmNlIE5heWVmIFN0cmVldCwgQWwtTWFqbWFhaDEXMBUGA1UEDwwOVHJhbnNwb3J0YXRpb24wHQYDVR0OBBYEFGdiy9Fi2z0XtjhfgaWCPn7y9fvxMB8GA1UdIwQYMBaAFB/lmNQmG2UZm9mLs7vs/uGnljt2MIHlBgNVHR8Egd0wgdowgdeggdSggdGGgc5sZGFwOi8vL0NOPVBSWkVJTlZPSUNFU0NBMy1DQSgxKSxDTj1QUlpFSU5WT0lDRVNDQTMsQ049Q0RQLENOPVB1YmxpYyUyMEtleSUyMFNlcnZpY2VzLENOPVNlcnZpY2VzLENOPUNvbmZpZ3VyYXRpb24sREM9ZXh0emF0Y2EsREM9Z292LERDPWxvY2FsP2NlcnRpZmljYXRlUmV2b2NhdGlvbkxpc3Q/YmFzZT9vYmplY3RDbGFzcz1jUkxEaXN0cmlidXRpb25Qb2ludDCBzgYIKwYBBQUHAQEEgcEwgb4wgbsGCCsGAQUFBzAChoGubGRhcDovLy9DTj1QUlpFSU5WT0lDRVNDQTMtQ0EsQ049QUlBLENOPVB1YmxpYyUyMEtleSUyMFNlcnZpY2VzLENOPVNlcnZpY2VzLENOPUNvbmZpZ3VyYXRpb24sREM9ZXh0emF0Y2EsREM9Z292LERDPWxvY2FsP2NBQ2VydGlmaWNhdGU/YmFzZT9vYmplY3RDbGFzcz1jZXJ0aWZpY2F0aW9uQXV0aG9yaXR5MA4GA1UdDwEB/wQEAwIHgDA8BgkrBgEEAYI3FQcELzAtBiUrBgEEAYI3FQiBhqgdhND7EobtnSSHzvsZ08BVZof6pWWF2YQ+AgFkAgEOMB0GA1UdJQQWMBQGCCsGAQUFBwMDBggrBgEFBQcDAjAnBgkrBgEEAYI3FQoEGjAYMAoGCCsGAQUFBwMDMAoGCCsGAQUFBwMCMAoGCCqGSM49BAMCA0gAMEUCIQCSmoDZBJASkPLnlxdGJoQ+BuNd3Q7V/GrADx5xZClw5QIgXZkFxXSLuoLc3f6wH4PHPUjRYDyGhik5CoXDcocoR9c=\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"fBu99oal74FhxzBU5/nLgInVrIHtbJI0W/m0QoXzT1c=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";
                            var GeneralInvoiceText_Binthrian = "{\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\\r\\nMHQCAQEEICklsbcDRqkThRFKPy4DgbYsFrsmFP5MRAZN9nvvwZSDoAcGBSuBBAAK\\r\\noUQDQgAEjulMPiXrYlKH6ctcj+7z0guR7jOtzXgxlSWS0jhxEUmv4MtjYUrjTx/n\\r\\nnp7UtvboPpe+hBERWrP5Gp2WYmadVQ==\\r\\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\\r\\nMIICFjCCAbsCAQAwWDEdMBsGA1UEAwwURUdTMS0zMTAxMDE4OTI4MDAwMDMxFjAU\\r\\nBgNVBAsMDUR3YWRteSBCcmFuY2gxEjAQBgNVBAoMCUJJTlRIUklBTjELMAkGA1UE\\r\\nBhMCU0EwVjAQBgcqhkjOPQIBBgUrgQQACgNCAASO6Uw+JetiUofpy1yP7vPSC5Hu\\r\\nM63NeDGVJZLSOHERSa/gy2NhSuNPH+eentS29ug+l76EERFas/kanZZiZp1VoIIB\\r\\nAjCB/wYJKoZIhvcNAQkOMYHxMIHuMCEGCSsGAQQBgjcUAgQUDBJaQVRDQS1Db2Rl\\r\\nLVNpZ25pbmcwgcgGA1UdEQSBwDCBvaSBujCBtzFBMD8GA1UEBAw4MS1CSU5USFJJ\\r\\nQU58Mi1JT1N8My1hMmM4YzczMy03MzU2LTQwY2QtOTEzMi01OGM5YjIzMzBjNjcx\\r\\nHzAdBgoJkiaJk/IsZAEBDA8zMTAxMDE4OTI4MDAwMDMxDTALBgNVBAwMBDEwMDAx\\r\\nKTAnBgNVBBoMIDcwNzIgIFN0cmVldCBOdW1iZXIgMTczICwgRHdhZG15MRcwFQYD\\r\\nVQQPDA5UcmFuc3BvcnRhdGlvbjAKBggqhkjOPQQDAgNJADBGAiEAzeePFdnzU2Ky\\r\\nqQkfDPXGo1E/nYffI9IfCyst9EBT6FUCIQCt8U+/8g/4KEymmarYqpDfAX6KWtWM\\r\\n57r/u7fB6Uu4sg==\\r\\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIICPDCCAeGgAwIBAgIGAZVCdfSuMAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjUwMjI2MTMzMjU2WhcNMzAwMjI1MjEwMDAwWjBYMR0wGwYDVQQDDBRFR1MxLTMxMDEwMTg5MjgwMDAwMzEWMBQGA1UECwwNRHdhZG15IEJyYW5jaDESMBAGA1UECgwJQklOVEhSSUFOMQswCQYDVQQGEwJTQTBWMBAGByqGSM49AgEGBSuBBAAKA0IABI7pTD4l62JSh+nLXI/u89ILke4zrc14MZUlktI4cRFJr+DLY2FK408f556e1Lb26D6XvoQREVqz+RqdlmJmnVWjgdwwgdkwDAYDVR0TAQH/BAIwADCByAYDVR0RBIHAMIG9pIG6MIG3MUEwPwYDVQQEDDgxLUJJTlRIUklBTnwyLUlPU3wzLWEyYzhjNzMzLTczNTYtNDBjZC05MTMyLTU4YzliMjMzMGM2NzEfMB0GCgmSJomT8ixkAQEMDzMxMDEwMTg5MjgwMDAwMzENMAsGA1UEDAwEMTAwMDEpMCcGA1UEGgwgNzA3MiAgU3RyZWV0IE51bWJlciAxNzMgLCBEd2FkbXkxFzAVBgNVBA8MDlRyYW5zcG9ydGF0aW9uMAoGCCqGSM49BAMCA0kAMEYCIQC65HC+Tc+XAJ3DUZqkpPif1pmjjjzpO2zzVUq3qyAx6wIhAKVwBwKST+RxmWjk+iu3NpgQ7NirQGHWRsiMqEhbmJ5l\\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"c6PgdIjA9xPFtHllHDsx6z/T96VvjAeto/wjswOksW4=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIIFGDCCBL6gAwIBAgITXAAA1JE8ErzDtMomHAABAADUkTAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTItQ0EwHhcNMjUwMjI2MTMyMzI2WhcNMzAwMjI1MTMyMzI2WjBYMQswCQYDVQQGEwJTQTESMBAGA1UEChMJQklOVEhSSUFOMRYwFAYDVQQLEw1Ed2FkbXkgQnJhbmNoMR0wGwYDVQQDExRFR1MxLTMxMDEwMTg5MjgwMDAwMzBWMBAGByqGSM49AgEGBSuBBAAKA0IABI7pTD4l62JSh+nLXI/u89ILke4zrc14MZUlktI4cRFJr+DLY2FK408f556e1Lb26D6XvoQREVqz+RqdlmJmnVWjggNeMIIDWjCByAYDVR0RBIHAMIG9pIG6MIG3MUEwPwYDVQQEDDgxLUJJTlRIUklBTnwyLUlPU3wzLWEyYzhjNzMzLTczNTYtNDBjZC05MTMyLTU4YzliMjMzMGM2NzEfMB0GCgmSJomT8ixkAQEMDzMxMDEwMTg5MjgwMDAwMzENMAsGA1UEDAwEMTAwMDEpMCcGA1UEGgwgNzA3MiAgU3RyZWV0IE51bWJlciAxNzMgLCBEd2FkbXkxFzAVBgNVBA8MDlRyYW5zcG9ydGF0aW9uMB0GA1UdDgQWBBRYe2BPf/xjWZyw5vzstYhhKIngtzAfBgNVHSMEGDAWgBRZyHKeeTVp6rzZldTX4GRpAgYQGTCB5QYDVR0fBIHdMIHaMIHXoIHUoIHRhoHObGRhcDovLy9DTj1QUlpFSU5WT0lDRVNDQTItQ0EoMSksQ049UFJaRUlOVk9JQ0VTQ0EyLENOPUNEUCxDTj1QdWJsaWMlMjBLZXklMjBTZXJ2aWNlcyxDTj1TZXJ2aWNlcyxDTj1Db25maWd1cmF0aW9uLERDPWV4dHphdGNhLERDPWdvdixEQz1sb2NhbD9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0P2Jhc2U/b2JqZWN0Q2xhc3M9Y1JMRGlzdHJpYnV0aW9uUG9pbnQwgc4GCCsGAQUFBwEBBIHBMIG+MIG7BggrBgEFBQcwAoaBrmxkYXA6Ly8vQ049UFJaRUlOVk9JQ0VTQ0EyLUNBLENOPUFJQSxDTj1QdWJsaWMlMjBLZXklMjBTZXJ2aWNlcyxDTj1TZXJ2aWNlcyxDTj1Db25maWd1cmF0aW9uLERDPWV4dHphdGNhLERDPWdvdixEQz1sb2NhbD9jQUNlcnRpZmljYXRlP2Jhc2U/b2JqZWN0Q2xhc3M9Y2VydGlmaWNhdGlvbkF1dGhvcml0eTAOBgNVHQ8BAf8EBAMCB4AwPAYJKwYBBAGCNxUHBC8wLQYlKwYBBAGCNxUIgYaoHYTQ+xKG7Z0kh877GdPAVWaH+qVlhdmEPgIBZAIBDjAdBgNVHSUEFjAUBggrBgEFBQcDAwYIKwYBBQUHAwIwJwYJKwYBBAGCNxUKBBowGDAKBggrBgEFBQcDAzAKBggrBgEFBQcDAjAKBggqhkjOPQQDAgNIADBFAiEA7VC2m88uVd2Uzba3GD1liRHnnuLvoocKwo+5uQuuQnICIBacRqz6vufoUAV/5Wh2rXdf0J9jYXjXEKdq4qKUyuHi\\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"Lb5suIgYRblNKOMSEFz0WgPzOkVjPoK6Rudsf/c6Qi0=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";
                            var GeneralInvoiceText_AdelSaeed = "{\n    \"egs_info\": {\n        \"private_key\": \"-----BEGIN EC PRIVATE KEY-----\\r\\nMHQCAQEEIP25I3rbPY+yTutkaYV/V2OKHRImUgcijM1AnX234usioAcGBSuBBAAK\\r\\noUQDQgAEnij+HWNdLzQFdtYACSzGP0DGVKAuUXE//XxtkqJ2YVXZ//hjRjDJKIDJ\\r\\nm7QY21pkD5wXtewy9KuMGKzxnl7wFw==\\r\\n-----END EC PRIVATE KEY-----\",\n        \"csr\": \"-----BEGIN CERTIFICATE REQUEST-----\\r\\nMIICTjCCAfQCAQAwgYsxHTAbBgNVBAMMFEVHUzEtMzAwMDk2MjEyNTAwMDAzMRYw\\r\\nFAYDVQQLDA1KZWRkYWggQnJhbmNoMUUwQwYDVQQKDDxBZGVsIE1vaGFtbWVkIFNh\\r\\nZWVkIEJhemFxYW1hIEN1c3RvbXMgQ2xlYXJhbmNlIEVzdGFibGlzaG1lbnQxCzAJ\\r\\nBgNVBAYTAlNBMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEnij+HWNdLzQFdtYACSzG\\r\\nP0DGVKAuUXE//XxtkqJ2YVXZ//hjRjDJKIDJm7QY21pkD5wXtewy9KuMGKzxnl7w\\r\\nF6CCAQcwggEDBgkqhkiG9w0BCQ4xgfUwgfIwIQYJKwYBBAGCNxQCBBQMElpBVENB\\r\\nLUNvZGUtU2lnbmluZzCBzAYDVR0RBIHEMIHBpIG+MIG7MUEwPwYDVQQEDDgxLUFk\\r\\nZWxTYWVlZHwyLUlPU3wzLWY1YThlMmE5LWI1YzMtNDFlOS1iOGRhLTE3ZDMxZWE3\\r\\nMzgwZDEfMB0GCgmSJomT8ixkAQEMDzMwMDA5NjIxMjUwMDAwMzENMAsGA1UEDAwE\\r\\nMTAwMDErMCkGA1UEGgwiMjc0NCBTaGFqYXJhdCBBbCBGYXJhd2xhaCAsIEplZGRh\\r\\naDEZMBcGA1UEDwwQQ3VzdG9tIENsZWFyYW5jZTAKBggqhkjOPQQDAgNIADBFAiBq\\r\\nYC1TuPriXfC7XLGGXMoeoBwliJEFBBctui3bRBui3gIhALrKIx3U6O3PIIOh5yE/\\r\\nkW/C6BRMtbXvHbkRyTJjuy8E\\r\\n-----END CERTIFICATE REQUEST-----\",\n        \"compliance_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIICczCCAhmgAwIBAgIGAZYevqUFMAoGCCqGSM49BAMCMBUxEzARBgNVBAMMCmVJbnZvaWNpbmcwHhcNMjUwNDEwMDgwODQ3WhcNMzAwNDA5MjEwMDAwWjCBizEdMBsGA1UEAwwURUdTMS0zMDAwOTYyMTI1MDAwMDMxFjAUBgNVBAsMDUplZGRhaCBCcmFuY2gxRTBDBgNVBAoMPEFkZWwgTW9oYW1tZWQgU2FlZWQgQmF6YXFhbWEgQ3VzdG9tcyBDbGVhcmFuY2UgRXN0YWJsaXNobWVudDELMAkGA1UEBhMCU0EwVjAQBgcqhkjOPQIBBgUrgQQACgNCAASeKP4dY10vNAV21gAJLMY/QMZUoC5RcT/9fG2SonZhVdn/+GNGMMkogMmbtBjbWmQPnBe17DL0q4wYrPGeXvAXo4HgMIHdMAwGA1UdEwEB/wQCMAAwgcwGA1UdEQSBxDCBwaSBvjCBuzFBMD8GA1UEBAw4MS1BZGVsU2FlZWR8Mi1JT1N8My1mNWE4ZTJhOS1iNWMzLTQxZTktYjhkYS0xN2QzMWVhNzM4MGQxHzAdBgoJkiaJk/IsZAEBDA8zMDAwOTYyMTI1MDAwMDMxDTALBgNVBAwMBDEwMDAxKzApBgNVBBoMIjI3NDQgU2hhamFyYXQgQWwgRmFyYXdsYWggLCBKZWRkYWgxGTAXBgNVBA8MEEN1c3RvbSBDbGVhcmFuY2UwCgYIKoZIzj0EAwIDSAAwRQIgeom5sO9l7mWsdbn+eO1baZvlYoAYCA51RmcOKXStc6UCIQCHPvuMMVY3AmnfylAuiYBBth5qtvtILKgJD7LceQP4QQ==\\n-----END CERTIFICATE-----\",\n        \"compliance_api_secret\": \"TguTfWCSrl+dPGbOpTuwvXlmR6cIeg12A+iGjbqNqtc=\",\n        \"production_certificate\": \"-----BEGIN CERTIFICATE-----\\nMIIFUDCCBPagAwIBAgITXAAA86DFFfWVd44O1QABAADzoDAKBggqhkjOPQQDAjBiMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRswGQYDVQQDExJQUlpFSU5WT0lDRVNDQTItQ0EwHhcNMjUwNDEwMDc1OTAyWhcNMzAwNDAyMDM0MTE3WjCBizELMAkGA1UEBhMCU0ExRTBDBgNVBAoTPEFkZWwgTW9oYW1tZWQgU2FlZWQgQmF6YXFhbWEgQ3VzdG9tcyBDbGVhcmFuY2UgRXN0YWJsaXNobWVudDEWMBQGA1UECxMNSmVkZGFoIEJyYW5jaDEdMBsGA1UEAxMURUdTMS0zMDAwOTYyMTI1MDAwMDMwVjAQBgcqhkjOPQIBBgUrgQQACgNCAASeKP4dY10vNAV21gAJLMY/QMZUoC5RcT/9fG2SonZhVdn/+GNGMMkogMmbtBjbWmQPnBe17DL0q4wYrPGeXvAXo4IDYjCCA14wgcwGA1UdEQSBxDCBwaSBvjCBuzFBMD8GA1UEBAw4MS1BZGVsU2FlZWR8Mi1JT1N8My1mNWE4ZTJhOS1iNWMzLTQxZTktYjhkYS0xN2QzMWVhNzM4MGQxHzAdBgoJkiaJk/IsZAEBDA8zMDAwOTYyMTI1MDAwMDMxDTALBgNVBAwMBDEwMDAxKzApBgNVBBoMIjI3NDQgU2hhamFyYXQgQWwgRmFyYXdsYWggLCBKZWRkYWgxGTAXBgNVBA8MEEN1c3RvbSBDbGVhcmFuY2UwHQYDVR0OBBYEFO+QsUWIzHtC4KoEMsNIm2nGVgC+MB8GA1UdIwQYMBaAFFnIcp55NWnqvNmV1NfgZGkCBhAZMIHlBgNVHR8Egd0wgdowgdeggdSggdGGgc5sZGFwOi8vL0NOPVBSWkVJTlZPSUNFU0NBMi1DQSgxKSxDTj1QUlpFSU5WT0lDRVNDQTIsQ049Q0RQLENOPVB1YmxpYyUyMEtleSUyMFNlcnZpY2VzLENOPVNlcnZpY2VzLENOPUNvbmZpZ3VyYXRpb24sREM9ZXh0emF0Y2EsREM9Z292LERDPWxvY2FsP2NlcnRpZmljYXRlUmV2b2NhdGlvbkxpc3Q/YmFzZT9vYmplY3RDbGFzcz1jUkxEaXN0cmlidXRpb25Qb2ludDCBzgYIKwYBBQUHAQEEgcEwgb4wgbsGCCsGAQUFBzAChoGubGRhcDovLy9DTj1QUlpFSU5WT0lDRVNDQTItQ0EsQ049QUlBLENOPVB1YmxpYyUyMEtleSUyMFNlcnZpY2VzLENOPVNlcnZpY2VzLENOPUNvbmZpZ3VyYXRpb24sREM9ZXh0emF0Y2EsREM9Z292LERDPWxvY2FsP2NBQ2VydGlmaWNhdGU/YmFzZT9vYmplY3RDbGFzcz1jZXJ0aWZpY2F0aW9uQXV0aG9yaXR5MA4GA1UdDwEB/wQEAwIHgDA8BgkrBgEEAYI3FQcELzAtBiUrBgEEAYI3FQiBhqgdhND7EobtnSSHzvsZ08BVZof6pWWF2YQ+AgFkAgEOMB0GA1UdJQQWMBQGCCsGAQUFBwMDBggrBgEFBQcDAjAnBgkrBgEEAYI3FQoEGjAYMAoGCCsGAQUFBwMDMAoGCCsGAQUFBwMCMAoGCCqGSM49BAMCA0gAMEUCIQCzzEEwfVM5hyPeVsT9Z8Pf6/IyekFZjREkF5uxwTjSwwIgWnKd3R3GdxQ/F8AA2yZPwd20/KJGNeSy1+x2bJGuc48=\\n-----END CERTIFICATE-----\",\n        \"production_api_secret\": \"y/7aXXwIAu+l8hruZnD5dr0NVWl3xTWgXHJbcs97avQ=\"\n    },\n    \"invoice\": " + InvoicesText + "\r\n " + CustomerData + "}\r\n}";

                            var BaseInvoiceText = GeneralInvoiceText;
                            if (CompanyName == "Wosool")
                            {
                                BaseInvoiceText = GeneralInvoiceText_Wosool;
                            }
                            else if (CompanyName == "ZAF")
                            {
                                BaseInvoiceText = GeneralInvoiceText_MohamedElzafer;
                            }
                            else if (CompanyName == "KDL")
                            {
                                BaseInvoiceText = GeneralInvoiceText_KDL;
                            }
                            else if (CompanyName == "MOUD")
                            {
                                BaseInvoiceText = GeneralInvoiceText_Moudayfer;
                            }
                            else if (CompanyName == "BRA")
                            {
                                BaseInvoiceText = GeneralInvoiceText_Badr;
                            }
                            else if (CompanyName == "MID")
                            {
                                BaseInvoiceText = GeneralInvoiceText_MidLineLogistics;
                            }
                            else if (CompanyName == "MTH")
                            {
                                BaseInvoiceText = GeneralInvoiceText_Mithaq;
                            }
                            else if (CompanyName == "EEM")
                            {
                                BaseInvoiceText = GeneralInvoiceText_Emaar;
                            }
                            else if (CompanyName == "BIN")
                            {
                                BaseInvoiceText = GeneralInvoiceText_Binthrian;
                            }
                            else if (CompanyName == "ADS")
                            {
                                BaseInvoiceText = GeneralInvoiceText_AdelSaeed;
                            }

                            //if (1 == 2)
                            //if (customer.VATNumber.Length > 0)
                            {
                                var content_SendInvoice = new StringContent(BaseInvoiceText, null, "application/json");
                                request_SendInvoice.Content = content_SendInvoice;
                                var response_SendInvoice = await client.SendAsync(request_SendInvoice);
                                response_SendInvoice.EnsureSuccessStatusCode();
                                //Console.WriteLine(await response_SendInvoice.Content.ReadAsStringAsync());
                                var json = await response_SendInvoice.Content.ReadAsStringAsync();
                                //***************************************************************************************

                                dynamic data = JObject.Parse(json);

                                // Access the reportingStatus property
                                string reportingStatus = data.reportInvoice.reportingStatus;
                                string clearanceStatus = data.reportInvoice.clearanceStatus;

                                    // Check if it's REPORTED
                                if (reportingStatus == "REPORTED" || clearanceStatus == "CLEARED")
                                {
                                    Console.WriteLine("The reporting status is CLEARED.");
                                    CResponseToSubmitInvoice_DebitCredit objCResponseToSubmitInvoice_DebitCredit = new CResponseToSubmitInvoice_DebitCredit();
                                    CVarResponseToSubmitInvoice_DebitCredit objCVarResponseToSubmitInvoice_DebitCredit = new CVarResponseToSubmitInvoice_DebitCredit();
                                    objCVarResponseToSubmitInvoice_DebitCredit.ID = 0;
                                    objCVarResponseToSubmitInvoice_DebitCredit.InvoiceID = invoice.ID;
                                    objCVarResponseToSubmitInvoice_DebitCredit.submissionId = "0";
                                    objCVarResponseToSubmitInvoice_DebitCredit.uuid = "0";
                                    objCVarResponseToSubmitInvoice_DebitCredit.longId = "0";
                                    objCVarResponseToSubmitInvoice_DebitCredit.internalId = "0";
                                    objCVarResponseToSubmitInvoice_DebitCredit.hashKey = "0";
                                    objCVarResponseToSubmitInvoice_DebitCredit.CreationDate = DateTime.Now;
                                    objCVarResponseToSubmitInvoice_DebitCredit.IsValidPortal = 1;
                                    objCVarResponseToSubmitInvoice_DebitCredit.Debit_Credit = invoice.DebitOrCredit;
                                    if (invoice.InvoiceTypeID == 40 || invoice.InvoiceTypeID == 50)
                                    {
                                        objCVarResponseToSubmitInvoice_DebitCredit.FromAccNote_Stores = 2;
                                    }
                                    else
                                        objCVarResponseToSubmitInvoice_DebitCredit.FromAccNote_Stores = 1;

                                    try
                                    {
                                        objCVarResponseToSubmitInvoice_DebitCredit.CreationUserID = CreationCurrentUserId;// WebSecurity.CurrentUserId;
                                    }
                                    catch
                                    {
                                        objCVarResponseToSubmitInvoice_DebitCredit.CreationUserID = 0;
                                    }
                                    objCResponseToSubmitInvoice_DebitCredit.lstCVarResponseToSubmitInvoice_DebitCredit.Add(objCVarResponseToSubmitInvoice_DebitCredit);
                                    exception = objCResponseToSubmitInvoice_DebitCredit.SaveMethod(objCResponseToSubmitInvoice_DebitCredit.lstCVarResponseToSubmitInvoice_DebitCredit);
                                    if (exception == null)
                                    {
                                        result = 1;

                                    }
                                }
                                else
                                {
                                    Console.WriteLine("The reporting status is not CLEARED.");
                                }
                            }

                        }
                    }
                }

            }
            catch (Exception ex)
            {

            }
            ZatcaDebitCredit.GetListPaging(100, 1, " wHERE 1=1", " InvoiceNo DESC", out _RowCount);

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
 
            return new Object[] { srialize.Serialize(ZatcaDebitCredit.lstCVarZatcaDebitCredit), result };
        }

    }

}
