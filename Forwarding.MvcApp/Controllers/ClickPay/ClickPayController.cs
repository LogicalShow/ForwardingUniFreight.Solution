using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.ClickPay;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ClickPay
{
	public class ClickPayController : ApiController
    {
        private static readonly SemaphoreSlim _semaphore = new SemaphoreSlim(1, 1);

        private const string API_URL = "https://clickpay.istegy.com/";
        private static string[] CURRENCIES = new string[] { "EGP" };
        private static string[] COMPANIES = new string[] { "UNF" };
        [HttpPost]
        public async Task<PayInvoiceResponse> PayInvoice([FromBody] PayInvoiceRequest payRequest)
		{
            var userID = WebSecurity.CurrentUserId;
            if (userID <= 0)
            {
                return new PayInvoiceResponse()
                {
                    IsSuccess = false,
                    Message = "Not Authorized"
                };
            }

            long pInvoiceID = payRequest.InvoiceID;
            RequestToPayRequest request = null;
            ClickPayAPIResponse response = null;

            bool acquired = await _semaphore.WaitAsync(0);
            if (acquired)
            {
                try
                {
                    var objCDefaults = new CDefaults();
                    Exception ex = objCDefaults.GetList("WHERE 1=1");
                    if (ex != null || objCDefaults.lstCVarDefaults.Count != 1)
                    {
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = false,
                            Message = ex?.Message ?? "Internal Error"
                        };
                    }


                    var objCInvoices = new CInvoices();
                    ex = objCInvoices.GetItem(pInvoiceID);
                    if (ex != null || objCInvoices.lstCVarInvoices.Count != 1)
                    {
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = false,
                            Message = ex?.Message ?? "Please Check Invoice"
                        };
                    }
                    var invoice = objCInvoices.lstCVarInvoices[0];


                    var objCvwInvoices = new CvwInvoices();
                    ex = objCvwInvoices.GetList($"WHERE ID={pInvoiceID}");
                    if (ex != null || objCvwInvoices.lstCVarvwInvoices.Count != 1)
                    {
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = false,
                            Message = ex?.Message ?? "Please Check Invoice"
                        };
                    }
                    var vwInvoice = objCvwInvoices.lstCVarvwInvoices[0];


                    var objCReceivables = new CReceivables();
                    ex = objCReceivables.GetList($"WHERE InvoiceID={pInvoiceID}");
                    if (ex != null || objCReceivables.lstCVarReceivables.Count == 0)
                    {
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = false,
                            Message = ex?.Message ?? "Please Check Invoice Items"
                        };
                    }
                    var receivables = objCReceivables.lstCVarReceivables;



                    string checkInvoiceMessage = CheckInvoice(invoice, vwInvoice, receivables, objCDefaults.lstCVarDefaults[0]);
                    if (!string.IsNullOrEmpty(checkInvoiceMessage))
                    {
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = false,
                            Message = checkInvoiceMessage
                        };
                    }

                    var checkIfExist = new CClickPayLog();
                    Exception e = checkIfExist.GetListPaging(1, 1, $"WHERE InvoiceID={pInvoiceID} and ErrorMessage IS NULL and RequestStatus='pending' and ExpireAt >= '{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}'", "Id desc", out _);
                    if(e != null)
                    {
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = false,
                            Message = e.Message
                        };
                    }
                    if(checkIfExist.lstCVarClickPayLog.Count == 1)
                    {
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = true,
                            Message = "",
                            value = new InvoiceResponse()
                            {
                                paymentLink = checkIfExist.lstCVarClickPayLog[0].PaymentLink
                            }
                        };
                    }

                    e = checkIfExist.GetListPaging(1, 1, $"WHERE InvoiceID={pInvoiceID} and RequestStatus='succeeded'", "Id desc", out _);
                    if (e != null)
                    {
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = false,
                            Message = e.Message
                        };
                    }
                    if (checkIfExist.lstCVarClickPayLog.Count == 1)
                    {
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = false,
                            Message = "Invoice is already paid"
                        };
                    }

                    request = new RequestToPayRequest()
                    {
                        invoiceID = pInvoiceID,
                        invoiceNo = vwInvoice.ConcatenatedInvoiceNumber,
                        totalAmount = (int)invoice.Amount * 100,
                        currencyCode = vwInvoice.CurrencyCode,
                        invoiceIssueDate = invoice.InvoiceDate,
                        customerName = vwInvoice.PartnerName,
                        customerPhone = vwInvoice.PartnerPhonesAndFaxes
                    };

                    response = await SendPostRequestToExternalAPI(API_URL + "RequestToPay/insert", request);
                    if (response.success)
                    {

                        await LogAPIRequestResponseAsync(request, response);

                        var resDetails = response.value;
                        resDetails.aggregatorOrderId = "";
                        resDetails.orderId = "";

                        return new PayInvoiceResponse()
                        {
                            IsSuccess = true,
                            Message = "",
                            value = resDetails
                        };
                    }
                    else
                    {
                        await LogAPIRequestResponseAsync(request, null, response.message);
                        return new PayInvoiceResponse()
                        {
                            IsSuccess = false,
                            Message = response.message
                        };
                    }

                }
                catch (Exception e)
                {
                    WriteToLog("ClickPay Controller : " + e.Message);
                    await LogAPIRequestResponseAsync(request, null, e.Message);
                    return new PayInvoiceResponse()
                    {
                        IsSuccess = false,
                        Message = e.Message
                    };
                }
                finally
                {
                    _semaphore.Release();
                }
            } else
            {
                return new PayInvoiceResponse()
                {
                    IsSuccess = false,
                    Message = "Conflict"
                };
            }
            
        }
		private string CheckInvoice(CVarInvoices pInvoice,CVarvwInvoices pVwInvoice, List<CVarReceivables> pReceivables, CVarDefaults pDefaults)
		{	
			// If it is paid
			if(pInvoice.PaidAmount > 0 || pVwInvoice.PaidAmount > 0)
			{
				return "Invoice is paid";
            } else if (pInvoice.IsDeleted) // check is deleted invoice
			{
				return "Invoice is deleted";
			} else if (!pInvoice.IsApproved) // check if invoice not approved
			{
				return "Invoice is not approved";
			} else if(pVwInvoice.InvoiceTypeCode == "DRAFT") // check if it's draft invoice
			{
				return "Can't Pay Draft Invoices";
			} else if(pInvoice.Amount < 1) // check it has positive amount
			{
                return "Invalid Invoice Amount";
            } else if(pInvoice.OperationPartnerID < 1 || pInvoice.PortalOperationPartnerID < 1) // check it have partner
			{
				return "Invoice Must Have Partner";
			} else if (pInvoice.CurrencyID < 1) //Check it contains currency
			{
                return "Invoice Must Have Currency";
            } else if (pInvoice.ChildInvoiceID > 0)
			{
				return "Can't pay draft invoice";
			} else if(pInvoice.ManualPaymentStatusID > 0)
			{
                return "Check Payment Status for the invoice";
            } else if (!CURRENCIES.Contains(pVwInvoice.CurrencyCode))
            {
                return "Invoice Must Have Valid Currency";
            } else if (!COMPANIES.Contains(pDefaults.UnEditableCompanyName))
            {
                return "Company Not Included to have this module";
            } else if(pVwInvoice.AccountName == "0" || string.IsNullOrEmpty(pVwInvoice.AccountName))
            {
                return "Customer Account Not Linked";
            }

            // check for invalid tax or discount
            if (pDefaults.IsTaxOnItems)
            {
                if (pInvoice.TaxTypeID > 0 || pInvoice.DiscountTypeID > 0 || pInvoice.TaxAmount > 0 || pInvoice.TaxPercentage > 0 || pInvoice.DiscountPercentage > 0 || pInvoice.DiscountAmount > 0)
                {
                    return "Tax Or Discount can't be on invoice header";
                }
            }
            else
            {
                if (pReceivables.Any(r => r.TaxeTypeID > 0) || pReceivables.Any(r => r.TaxAmount > 0) || pReceivables.Any(r => r.TaxPercentage > 0) || pReceivables.Any(r => r.DiscountTypeID > 0) || pReceivables.Any(r => r.DiscountAmount > 0) || pReceivables.Any(r => r.DiscountPercentage > 0))
                {
                    return "Tax Or Discount can't be on Receivables";
                }
            }

			decimal recSum = pReceivables.Sum(r => r.SaleAmount);

			if(recSum != pInvoice.Amount)
			{
				return "Please Check Invoice";
			}


            return "";
		}

        private async Task<ClickPayAPIResponse> SendPostRequestToExternalAPI(string pApiLink, object pRequestData)
        {
            string externalApiUrl = pApiLink;
            var requestData = pRequestData;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            try
            {


                string jsonData = JsonConvert.SerializeObject(requestData);

                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(30);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(externalApiUrl, content).ConfigureAwait(false);

                    string responseContent = await response.Content.ReadAsStringAsync();

                    WriteToLog($"posting json to {pApiLink} -> {jsonData} \n --{response.IsSuccessStatusCode}-{responseContent} \n");
                    ClickPayAPIResponse APIResponse = JsonConvert.DeserializeObject<ClickPayAPIResponse>(responseContent);


                    return APIResponse;
                }
            }
            catch (Exception ex)
            {
                WriteToLog($"Exception: {ex.Message}");
                return new ClickPayAPIResponse()
                {
                    success = false,
                    message = $"IST Error : {ex.Message}"
                };
            }
        }
        private void WriteToLog(string message)
        {
            try
            {
                string directoryPath = HostingEnvironment.MapPath("~/api/Defaults/ClickPay");
                bool exists = Directory.Exists(directoryPath);
                if (!exists)
                    Directory.CreateDirectory(directoryPath);


                string pathStringForLog = Path.Combine(directoryPath, "ClickPay_" + DateTime.Now.ToString("dd_MM_yyyy") + ".txt");
                using (StreamWriter writer = new StreamWriter(pathStringForLog, true))
                {
                    writer.WriteLine($"[Date: {DateTime.Now.ToString("dd_MM_yyyy___hh_mm_ss")}] => {message} \n");
                }
            }
            catch (Exception ex)
            {

            }
        }

        public async Task LogAPIRequestResponseAsync(RequestToPayRequest requestData,ClickPayAPIResponse response,string errorMessage = null)
        {
            const string sql = @"
            INSERT INTO [dbo].[ClickPayLog] 
            (
                [InvoiceID], [InvoiceNo], [TotalAmount], [CurrencyCode], 
                [InvoiceIssueDate], [CustomerName], [CustomerPhone], [RequestJson],
                [ResponseMessage], [ResponseSuccess], [PaymentLink], [OrderId], 
                [AggregatorOrderId], [AmountCents], [ValidityInSeconds], 
                [ResponseCreatedAt], [RequestStatus], [ResponseInvoiceID], [ResponseJson],
                [ErrorMessage], [IsSuccessful]
            )
            VALUES
            (
                @InvoiceID, @InvoiceNo, @TotalAmount, @CurrencyCode,
                @InvoiceIssueDate, @CustomerName, @CustomerPhone, @RequestJson,
                @ResponseMessage, @ResponseSuccess, @PaymentLink, @OrderId,
                @AggregatorOrderId, @AmountCents, @ValidityInSeconds,
                @ResponseCreatedAt, @RequestStatus, @ResponseInvoiceID, @ResponseJson,
                @ErrorMessage, @IsSuccessful
            )";

            
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString()))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(sql, connection))
                {
                    var requestJson = JsonConvert.SerializeObject(requestData);

                    RequestToPayRequest dynRequest = requestData;

                    command.Parameters.AddWithValue("@InvoiceID", dynRequest.invoiceID);
                    command.Parameters.AddWithValue("@InvoiceNo", dynRequest.invoiceNo ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@TotalAmount", dynRequest.totalAmount);
                    command.Parameters.AddWithValue("@CurrencyCode", dynRequest.currencyCode ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@InvoiceIssueDate", dynRequest.invoiceIssueDate);
                    command.Parameters.AddWithValue("@CustomerName", dynRequest.customerName ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@CustomerPhone", dynRequest.customerPhone ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@RequestJson", requestJson);

                    var responseJson = response != null ? JsonConvert.SerializeObject(response) : null;
                    command.Parameters.AddWithValue("@ResponseMessage", response?.message ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@ResponseSuccess", response?.success ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@PaymentLink", response?.value?.paymentLink ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@OrderId", response?.value?.orderId ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@AggregatorOrderId", response?.value?.aggregatorOrderId ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@AmountCents", response?.value?.amountCents ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@ValidityInSeconds", response?.value?.validityInSeconds ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@ResponseCreatedAt", response?.value?.createdAt ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@RequestStatus", response?.value?.requestStatus ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@ResponseInvoiceID", response?.value?.invoiceID ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@ResponseJson", responseJson ?? (object)DBNull.Value);

                    command.Parameters.AddWithValue("@ErrorMessage", errorMessage ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@IsSuccessful", response?.success == true && string.IsNullOrEmpty(errorMessage));

                    await command.ExecuteNonQueryAsync();
                }
            }
            
        }

        [HttpPost]
        public object[] PaymentTransaction([FromBody] PaymentTransactionRequest payRequest)
        {
            bool _result = false;
            string ReturnedMessage = "";
            Exception Exp = null;

            var req = JsonConvert.SerializeObject(payRequest);
            WriteToLog($"PaymentTransaction [{DateTime.Now}] -> {req}");

            if(payRequest.BankStatus != "succeeded")
            {
                return new object[] {
                    true,
                    "Logged Request Only but no action taken"
                };
            }

            var getCPItem = new CClickPayLog();
            Exception ee = getCPItem.GetList($"WHERE InvoiceID={payRequest.InvoiceID} and ErrorMessage IS NULL and RequestStatus='pending' and OrderId='{payRequest.TransactionID}'");
            if(ee != null || getCPItem.lstCVarClickPayLog.Count != 1)
            {
                WriteToLog($"PaymentTransaction Response [{DateTime.Now}] -> {_result}  {ee?.Message ?? "No Record found For that payment"}");
                return new object[] {
                    _result,
                    ee?.Message ?? "No Record found For that payment"
                };
            }

            var safe = new CvwTreasury();
            Exp = safe.GetList($"WHERE CurrencyCode='{payRequest.CurrencyCode}'");
            if(Exp != null || safe.lstCVarvwTreasury.Count == 0)
            {
                WriteToLog($"PaymentTransaction Response [{DateTime.Now}] -> {_result}  {Exp?.Message ?? "Currency Has No Safe"}");
                return new object[] {
                    _result,
                    Exp?.Message ?? "Currency Has No Safe"
                };
            }

            DataTable table = new DataTable();
            table.Columns.Add("SafeID", typeof(int));
            table.Columns.Add("Amount", typeof(decimal));

            DataTable BankTable = new DataTable();
            BankTable.Columns.Add("BankID", typeof(int));
            BankTable.Columns.Add("BankTransferType", typeof(int));
            BankTable.Columns.Add("ChequeSafeID", typeof(int));
            BankTable.Columns.Add("ChequeNumber", typeof(string));
            BankTable.Columns.Add("ChequeDate", typeof(DateTime));
            BankTable.Columns.Add("NoteAccountID", typeof(int));
            BankTable.Columns.Add("Amount", typeof(decimal));


            table.Rows.Add(safe.lstCVarvwTreasury[0].ID, payRequest.TotalAmount / 100);


            try
            {
                string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    // Create command to call the stored procedure
                    using (SqlCommand command = new SqlCommand("MultiCurrencyInvoicePayment", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.Int));
                        command.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                        // Define the parameter for the table-valued parameter
                        SqlParameter parameter = command.Parameters.AddWithValue("@MultiCurrencyInvoicePaymentDetails", table);
                        parameter.SqlDbType = SqlDbType.Structured;
                        parameter.TypeName = "dbo.MultiCurrencyInvoicePaymentDetails"; // Name of the user-defined table type

                        SqlParameter bankParameter = command.Parameters.AddWithValue("@MultiCurrencyInvoicePaymentBankDetails", BankTable);
                        bankParameter.SqlDbType = SqlDbType.Structured;
                        bankParameter.TypeName = "dbo.MultiCurrencyInvoicePaymentBankDetails"; // Name of the user-defined table type

                        command.Parameters["@InvoiceID"].Value = (int)payRequest.InvoiceID;
                        command.Parameters["@UserID"].Value = 4;

                        // Execute the stored procedure
                        command.ExecuteNonQuery();
                        _result = true;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                ReturnedMessage = ex.Message;
            }
            WriteToLog($"PaymentTransaction Response [{DateTime.Now}] -> {_result}  {ReturnedMessage}");

            if(ReturnedMessage == "")
            {
                getCPItem.lstCVarClickPayLog[0].TransactionJson = req;
                getCPItem.lstCVarClickPayLog[0].TransactionCreatedAt = payRequest.CreatedAt;
                getCPItem.lstCVarClickPayLog[0].TransactionID = payRequest.TransactionID;
                getCPItem.lstCVarClickPayLog[0].BankReference = payRequest.BankReference;
                getCPItem.lstCVarClickPayLog[0].BankStatus = payRequest.BankStatus;
                getCPItem.lstCVarClickPayLog[0].RequestStatus = payRequest.BankStatus;

                Exception e2 = getCPItem.SaveMethod(getCPItem.lstCVarClickPayLog);
                if(e2 != null)
                {
                    WriteToLog($"PaymentTransaction Response (Voucher Created But ClickPayLog not updated) [{DateTime.Now}] -> {_result}  {e2.Message}");
                }
            }

            return new object[] {
                _result,
                ReturnedMessage
            };


        }
    }

    public class ClickPayAPIResponse
    {
        public string message { get; set; }
        public bool success { get; set; }
		public InvoiceResponse value { get; set; }
    }

    public class InvoiceResponse
    {
        public string paymentLink { get; set; }
        public string orderId { get; set; }
        public string aggregatorOrderId { get; set; }
        public decimal amountCents { get; set; }
        public int validityInSeconds { get; set; }
        public DateTime createdAt { get; set; }
        public string requestStatus { get; set; }
        public long invoiceID { get; set; }
    }

    public class PaymentTransactionRequest
    {
        public long InvoiceID { get; set; }
        public decimal TotalAmount { get; set; }
        public string CurrencyCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public string TransactionID { get; set; }
        public string BankReference { get; set; }
        public string BankStatus { get; set; }
    }

    public class PayInvoiceResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public InvoiceResponse value { get; set; }
    }
    public class PayInvoiceRequest
    {
        public long InvoiceID { get; set; }
    }

    public class RequestToPayRequest
    {
        public long invoiceID { get; set; }
        public string invoiceNo { get; set; }
        public int totalAmount { get; set; }
        public string currencyCode { get; set; }
        public DateTime invoiceIssueDate { get; set; }
        public string customerName { get; set; }
        public string customerPhone { get; set; }
    }
}