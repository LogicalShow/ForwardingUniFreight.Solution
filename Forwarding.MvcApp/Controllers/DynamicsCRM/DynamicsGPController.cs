using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.DynamicsCRM;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.DynamicsCRM
{
    public class DynamicsGPController : ApiController
    {
        private const string URL = @"http://10.0.0.4:";
        public APIResponse InsertCustomer(CVarvwLattCustomers pCustomer)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }

            var requestBody = new CustomerRequest()
            {
                CUSTNMBR = pCustomer.crmCode,
                CUSTNAME = pCustomer.Name.ToUpper(),
                CUSTCLAS = pCustomer.DebitorGroupName.ToUpper(),
                ADRSCODE = "PRIMARY",
                ADDRESS1 = pCustomer.StreetLine1.ToUpper(),
                ADDRESS2 = pCustomer.StreetLine2.ToUpper(),
                CITY = pCustomer.CityCode.ToUpper(),
                STATE = pCustomer.State.ToUpper(),
                COUNTRY = pCustomer.CountryCode.ToUpper(),
                PHNUMBR1 = pCustomer.PhonesAndFaxes.ToUpper(),
                TAXSCHID = "VATS",
                SLPRSNID = pCustomer.SalesmanCode.ToUpper(),
                TXRGNNUM = pCustomer.VATNumber.ToUpper(),
                CURNCYID = pCustomer.CurrencyCode.ToUpper(),
                UpdateIfExists = "0"
            };
            string CustomersUrl = URL + port + "api/Customers";

            var result = SendPostRequestToExternalAPI(CustomersUrl, requestBody).GetAwaiter().GetResult();

            if (result.IsSuccess)
            {
                AddDBLog("Customers", pCustomer.ID, "I", pCustomer.crmCode, userID);
            }

            return result;
        }

        public async Task<APIResponse> UpdateCustomer([FromBody] int pID)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }

            CvwLattCustomers objCvwLattCustomers = new CvwLattCustomers();
            objCvwLattCustomers.GetList($"WHERE ID={pID}");
            if (objCvwLattCustomers.lstCVarvwLattCustomers.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Customer"
                };
            }
            var pCustomer = objCvwLattCustomers.lstCVarvwLattCustomers[0];
            if (pCustomer.DebitorGroupID == 0)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = ""
                };
            }

            CGP_Log objGP_Log = new CGP_Log();
            Exception e = objGP_Log.GetList($"WHERE ActionName='Customers' AND RowID={pID} AND ActionType='I'");
            if (e != null)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {e.Message}"
                };

            }

            var requestBody = new CustomerRequest()
            {
                CUSTNMBR = pCustomer.crmCode,
                CUSTNAME = pCustomer.Name.ToUpper(),
                CUSTCLAS = pCustomer.DebitorGroupName.ToUpper(),
                ADRSCODE = "PRIMARY",
                ADDRESS1 = pCustomer.StreetLine1.ToUpper(),
                ADDRESS2 = pCustomer.StreetLine2.ToUpper(),
                CITY = pCustomer.CityCode.ToUpper(),
                STATE = pCustomer.State.ToUpper(),
                COUNTRY = pCustomer.CountryCode.ToUpper(),
                PHNUMBR1 = pCustomer.PhonesAndFaxes.ToUpper(),
                TAXSCHID = "VATS",
                SLPRSNID = pCustomer.SalesmanCode.ToUpper(),
                TXRGNNUM = pCustomer.VATNumber.ToUpper(),
                CURNCYID = pCustomer.CurrencyCode.ToUpper(),
                UpdateIfExists = "1"
            };
            string CustomersUrl = URL + port + "api/Customers";

            var result = await SendPostRequestToExternalAPI(CustomersUrl, requestBody);

            if (result.IsSuccess && objGP_Log.lstCVarGP_Log.Count == 0)
            {
                AddDBLog("Customers", pCustomer.ID, "UI", pCustomer.crmCode, userID);
            } else if (result.IsSuccess)
            {
                AddDBLog("Customers", pCustomer.ID, "U", pCustomer.crmCode, userID);
            }

            return result;
        }

        public APIResponse InsertSupplier(CVarvwLattSuppliers pSupplier)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }
            var requestBody = new VendorRequest()
            {
                VENDORID = pSupplier.CRM_Code,
                VENDNAME = pSupplier.Name.ToUpper(),
                VNDCLSID = pSupplier.CreditorGroupName.ToUpper(),
                VADDCDPR = "PRIMARY",
                ADDRESS1 = pSupplier.StreetLine1.ToUpper(),
                ADDRESS2 = pSupplier.StreetLine2.ToUpper(),
                CITY = pSupplier.CityCode.ToUpper(),
                STATE = pSupplier.State.ToUpper(),
                COUNTRY = pSupplier.CountryCode.ToUpper(),
                PHNUMBR1 = pSupplier.PhonesAndFaxes.ToUpper(),
                TAXSCHID = pSupplier.TaxCode.ToUpper(),
                TXRGNNUM = pSupplier.VATNumber.ToUpper(),
                CURNCYID = pSupplier.CurrencyCode.ToUpper(),
                UpdateIfExists = "0"
            };
            string VendorsUrl = URL + port + "api/Vendors";

            var result = SendPostRequestToExternalAPI(VendorsUrl, requestBody).GetAwaiter().GetResult();

            if (result.IsSuccess)
            {
                AddDBLog("Suppliers", pSupplier.ID, "I", pSupplier.CRM_Code, userID);
            }

            return result;
        }

        public async Task<APIResponse> UpdateSupplier([FromBody] int pID)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }

            CvwLattSuppliers objCvwLattSuppliers = new CvwLattSuppliers();
            objCvwLattSuppliers.GetList($"WHERE ID={pID}");
            if (objCvwLattSuppliers.lstCVarvwLattSuppliers.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Vendor"
                };
            }
            var pSupplier = objCvwLattSuppliers.lstCVarvwLattSuppliers[0];
            if (pSupplier.CreditorGroupID == 0)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = ""
                };
            }

            CGP_Log objGP_Log = new CGP_Log();
            Exception e = objGP_Log.GetList($"WHERE ActionName='Suppliers' AND RowID={pID} AND ActionType='I'");
            if (e != null)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {e.Message}"
                };

            }

            var requestBody = new VendorRequest()
            {
                VENDORID = pSupplier.CRM_Code,
                VENDNAME = pSupplier.Name.ToUpper(),
                VNDCLSID = pSupplier.CreditorGroupName.ToUpper(),
                VADDCDPR = "PRIMARY",
                ADDRESS1 = pSupplier.StreetLine1.ToUpper(),
                ADDRESS2 = pSupplier.StreetLine2.ToUpper(),
                CITY = pSupplier.CityCode.ToUpper(),
                STATE = pSupplier.State.ToUpper(),
                COUNTRY = pSupplier.CountryCode.ToUpper(),
                PHNUMBR1 = pSupplier.PhonesAndFaxes.ToUpper(),
                TAXSCHID = pSupplier.TaxCode.ToUpper(),
                TXRGNNUM = pSupplier.VATNumber.ToUpper(),
                CURNCYID = pSupplier.CurrencyCode.ToUpper(),
                UpdateIfExists = "1"
            };
            string VendorsUrl = URL + port + "api/Vendors";

            var result = await SendPostRequestToExternalAPI(VendorsUrl, requestBody);

            if (result.IsSuccess && objGP_Log.lstCVarGP_Log.Count == 0)
            {
                AddDBLog("Suppliers", pSupplier.ID, "UI", pSupplier.CRM_Code, userID);
            }
            else if (result.IsSuccess)
            {
                AddDBLog("Suppliers", pSupplier.ID, "U", pSupplier.CRM_Code, userID);
            }

            return result;
        }

        public APIResponse InsertChargeType(CVarvwLattChargeTypes pItem)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }

            var requestBody = new ItemRequest()
            {
                ITEMNMBR = pItem.Code.ToUpper().ToString(),
                ITEMDESC = pItem.Name.ToUpper(),
                ITMSHNAM = pItem.LocalName.ToUpper(),
                ITMCLSCD = pItem.ChargeTypeGroupName.ToUpper(),
                UOMSCHDL = "EA",
                ITEMTYPE = "5",
                ITMGEDSC = pItem.LocalName.ToUpper(),
                UpdateIfExists = "0"
            };
            string ItemsUrl = URL + port + "api/Items";

            var result = SendPostRequestToExternalAPI(ItemsUrl, requestBody).GetAwaiter().GetResult();

            if (result.IsSuccess)
            {
                AddDBLog("ChargeTypes", pItem.ID, "I", pItem.Code, userID);
            }

            return result;
        }

        public async Task<APIResponse> UpdateChargeType([FromBody] int pID)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }

            CvwLattChargeTypes objCvwLattChargeTypes = new CvwLattChargeTypes();
            objCvwLattChargeTypes.GetList($"WHERE ID={pID}");
            if (objCvwLattChargeTypes.lstCVarvwLattChargeTypes.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Item"
                };
            }
            var pItem = objCvwLattChargeTypes.lstCVarvwLattChargeTypes[0];

            CGP_Log objGP_Log = new CGP_Log();
            Exception e = objGP_Log.GetList($"WHERE ActionName='ChargeTypes' AND RowID={pID} AND ActionType='I'");
            if (e != null)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {e.Message}"
                };

            }

            var requestBody = new ItemRequest()
            {
                ITEMNMBR = pItem.Code.ToUpper().ToString(),
                ITEMDESC = pItem.Name.ToUpper(),
                ITMSHNAM = pItem.LocalName.ToUpper(),
                ITMCLSCD = pItem.ChargeTypeGroupName.ToUpper(),
                UOMSCHDL = "EA",
                ITEMTYPE = "5",
                ITMGEDSC = pItem.LocalName.ToUpper(),
                UpdateIfExists = "1"
            };
            string ItemsUrl = URL + port + "api/Items";

            var result = await SendPostRequestToExternalAPI(ItemsUrl, requestBody);

            if (result.IsSuccess && objGP_Log.lstCVarGP_Log.Count == 0)
            {
                AddDBLog("ChargeTypes", pItem.ID, "UI", pItem.Code, userID);
            }
            else if (result.IsSuccess)
            {
                AddDBLog("ChargeTypes", pItem.ID, "U", pItem.Code, userID);
            }

            return result;
        }

        [HttpPost]
        public async Task<APIResponse> InsertInvoice([FromBody] long pID)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }

            CvwInvoices objCvwInvoices = new CvwInvoices();
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CGP_Log objCGP_Log = new CGP_Log();
            objCGP_Log.GetList($"rowid ={pID}  and ActionName = 'Invoice'");
            if (objCGP_Log.lstCVarGP_Log.Count > 0)
            {
                return new APIResponse()
                {
                    IsSuccess = true,
                    Message = $""
                };
            }
            Exception e = objCvwInvoices.GetList($"WHERE ID={pID}");
            if (objCvwInvoices.lstCVarvwInvoices.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Invoice"
                };
            }
            if (e == null)
            {
                if (objCvwInvoices.lstCVarvwInvoices[0].PartnerTypeID != 1)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"IST Error : Please Check Customer"
                    };
                }
                e = objCvwReceivables.GetList($"WHERE InvoiceID={pID}");
            }

            if (e != null || objCvwReceivables.lstCVarvwReceivables.Count == 0)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {e?.Message}"
                };
            }
            var Invoice = objCvwInvoices.lstCVarvwInvoices[0];
            var Receivables = objCvwReceivables.lstCVarvwReceivables;

            CCustomers objCCustomers = new CCustomers();
            objCCustomers.GetItem(Invoice.PartnerID);
            if (objCCustomers.lstCVarCustomers.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Customer"
                };
            }

            string CustomerNumber = objCCustomers.lstCVarCustomers[0].crmCode;
            if (string.IsNullOrWhiteSpace(CustomerNumber) || CustomerNumber == "0")
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Customer"
                };
            }

            //string SOPNUMBER = Invoice.ConcatenatedInvoiceNumber;

            string SOPNUMBER = Invoice.InvoiceTypeCode + " " + Invoice.InvoiceNumber.ToString("00000");

            if (Invoice.InvoiceDate.Year == 2024)
            {
                SOPNUMBER = Invoice.InvoiceNumber.ToString("00000");
            }

            //SOPNUMBER = "Test/" + Invoice.InvoiceNumber;

            var invoiceHeader = new InvoiceHeader()
            {
                SOPTYPE = "3",
                DOCID = Invoice.InvoiceTypeCode,
                SOPNUMBE = SOPNUMBER,
                DOCDATE = Invoice.InvoiceDate.ToString("dd/MM/yyyy"),
                CUSTNMBR = CustomerNumber,
                CUSTNAME = Invoice.PartnerName,
                CURNCYID = Invoice.CurrencyCode
            };

            string department = "";
            string branch = "";
            string CustomerRef = "";
            string MBL = "";
            if (Invoice.OperationID > 0)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                COperations objCOperations = new COperations();
                objCOperations.GetItem(Invoice.OperationID);
                if (objCOperations.lstCVarOperations.Count == 1)
                {
                    CustomerRef = objCOperations.lstCVarOperations[0].CustomerReference;
                    MBL = objCOperations.lstCVarOperations[0].MasterBL;
                }
                department = objCCustomizedDBCall.CallStringFunction($"select Name from Branches where ID=(select BranchID from Operations where ID={Invoice.OperationID})");
                branch = objCCustomizedDBCall.CallStringFunction($"select BranchName from vwUsers where ID=(select CreatorUserID from Operations where ID={Invoice.OperationID})");
                if (branch.Contains("WAREHOUSE"))
                {
                    branch = "WAREHOUSE";
                }
                else if (branch.Contains("TRUCKING"))
                {
                    branch = "TRUCKING";
                }
            }

            var invoiceHeaderUserDefined = new InvoiceHeaderUserDefined()
            {
                SOPTYPE = "3",
                SOPNUMBE = SOPNUMBER,
                USERDEF1 = Invoice.OperationCode,
                USERDEF2 = department,
                USRDEF03 = branch,
                USRDEF04 = CustomerRef,
                USRDEF05 = MBL
            };

            var InvoiceDetails = new List<InvoiceDetails>();

            foreach (var item in Receivables)
            {
                string TaxCode = item.TaxTypeID > 0 ? item.TaxTypeCode : "";
                string IsHaveTax = item.TaxTypeID > 0 ? "1" : "2";
                InvoiceDetails.Add(new InvoiceDetails()
                {
                    SOPTYPE = "3",
                    DOCID = Invoice.InvoiceTypeCode,
                    SOPNUMBE = SOPNUMBER,
                    DOCDATE = Invoice.InvoiceDate.ToString("dd/MM/yyyy"),
                    CUSTNMBR = CustomerNumber,
                    ITEMNMBR = item.ChargeTypeCode,
                    CURNCYID = item.CurrencyCode,
                    QUANTITY = item.Quantity.ToString(),
                    UNITPRCE = item.SalePrice.ToString(),
                    UOFM = "EA",
                    TAXSCHID = TaxCode,
                    ITMTSHID = TaxCode,
                    IVITMTXB = IsHaveTax,
                    UpdateIfExists = "0"
                });

            }



            var requestBody = new InvoiceRequest()
            {
                SOPHeader = invoiceHeader,
                SOPLines = InvoiceDetails,
                SOPUserDefined = invoiceHeaderUserDefined

            };
            string ItemsUrl = URL + port + "api/SalesTransactions";
            var stopwatch = Stopwatch.StartNew();

            var result = await SendPostRequestToExternalAPI(ItemsUrl, requestBody);

            if (result.IsSuccess)
            {
                AddDBLog("Invoice", (int)Invoice.ID, "I", SOPNUMBER, userID);
            }

            return result;
        }

        /*

        [HttpPost]
        public async Task<APIResponse> UpdateInvoiceItems([FromBody] UpdateInvoiceDetails pUpdateInvoiceDetails)
        {
            int userID = WebSecurity.CurrentUserId;

            CGP_Log objCGP_Log = new CGP_Log();
            Exception ee = objCGP_Log.GetList($"WHERE ActionName='Invoice' AND ActionType='I' AND RowID={pUpdateInvoiceDetails.pInvoiceID}");
            if (ee != null)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Invoice"
                };
            }

            if(objCGP_Log.lstCVarGP_Log.Count == 0)
            {
                var _return = await InsertInvoice(pUpdateInvoiceDetails.pInvoiceID);
                return _return;
            }
            else
            {
                if(pUpdateInvoiceDetails.pReceivablesIDs == "")
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = ""
                    };
                }
                CvwReceivables objCvwReceivables = new CvwReceivables();
                Exception e = objCvwReceivables.GetList($"WHERE ID IN ({pUpdateInvoiceDetails.pReceivablesIDs}) And InvoiceID={pUpdateInvoiceDetails.pInvoiceID}");

                CvwInvoices objCvwInvoices = new CvwInvoices();
                Exception e2 = objCvwInvoices.GetList($"WHERE ID={pUpdateInvoiceDetails.pInvoiceID}");

                if( e != null || e2 != null || objCvwInvoices.lstCVarvwInvoices.Count != 1 || objCvwReceivables.lstCVarvwReceivables.Count == 0) {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"IST Error : Please Check Invoice"
                    };
                }

                var Invoice = objCvwInvoices.lstCVarvwInvoices[0];
                CCustomers objCCustomers = new CCustomers();
                objCCustomers.GetItem(Invoice.PartnerID);
                if (objCCustomers.lstCVarCustomers.Count != 1)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"IST Error : Please Check Customer"
                    };
                }

                string CustomerNumber = objCCustomers.lstCVarCustomers[0].crmCode;
                string ItemsUrl = URL + "api/SalesTransactions";

                string SOPNUMBER = Invoice.ConcatenatedInvoiceNumber;

                SOPNUMBER = "Test/" + Invoice.InvoiceNumber;

                foreach (var item in objCvwReceivables.lstCVarvwReceivables)
                {
                    string TaxCode = item.TaxTypeCode == "0" ? "" : item.TaxTypeCode;
                    string IsHaveTax = item.TaxTypeID > 0 ? "1" : "2";

                    var LineDetails = new {
                        SOPTYPE = "3",
                        DOCID = "TINV",
                        SOPNUMBE = SOPNUMBER,
                        DOCDATE = Invoice.InvoiceDate.ToString("dd/MM/yyyy"),
                        CUSTNMBR = CustomerNumber,
                        ITEMNMBR = item.ChargeTypeCode,
                        UOFM = "EA",
                        CURNCYID = item.CurrencyCode,
                        QUANTITY = item.Quantity.ToString(),
                        UNITPRCE = item.SalePrice.ToString(),
                        TAXSCHID = TaxCode,
                        ITMTSHID = TaxCode,
                        IVITMTXB = IsHaveTax,
                        UpdateIfExists = "1"
                    };

                    var result = await SendPUTRequestToExternalAPI(ItemsUrl, LineDetails);
                    if(!result.IsSuccess)
                    {
                        return new APIResponse()
                        {
                            IsSuccess = result.IsSuccess,
                            Message = result.Message
                        };
                    } else
                    {
                        AddDBLog("Invoice", (int)Invoice.ID, "U", SOPNUMBER, userID);
                        AddDBLog("Invoice_Details", (int)Invoice.ID, "U", pUpdateInvoiceDetails.pReceivablesIDs, userID);
                    }
                }

                return new APIResponse()
                {
                    IsSuccess = true,
                    Message = "Integrated Successfully"
                };
            }

        }

        [HttpPost]
        public async Task<APIResponse> DeleteInvoiceItems([FromBody] UpdateInvoiceDetails pDeleteInvoiceDetails)
        {
            int userID = WebSecurity.CurrentUserId;
            CGP_Log objCGP_Log = new CGP_Log();
            Exception ee = objCGP_Log.GetList($"WHERE ActionName='Invoice' AND ActionType='I' AND RowID={pDeleteInvoiceDetails.pInvoiceID}");
            if (ee != null)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Invoice"
                };
            }
            if (objCGP_Log.lstCVarGP_Log.Count == 0)
            {
                var _return = await InsertInvoice(pDeleteInvoiceDetails.pInvoiceID);
                return _return;
            }
            else
            {
                CvwReceivables objCvwReceivables = new CvwReceivables();
                Exception e = objCvwReceivables.GetList($"WHERE ID IN ({pDeleteInvoiceDetails.pReceivablesIDs})");

                CvwInvoices objCvwInvoices = new CvwInvoices();
                Exception e2 = objCvwInvoices.GetList($"WHERE ID={pDeleteInvoiceDetails.pInvoiceID}");

                if (e != null || e2 != null || objCvwInvoices.lstCVarvwInvoices.Count != 1 || objCvwReceivables.lstCVarvwReceivables.Count == 0)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"IST Error : Please Check Invoice"
                    };
                }

                var Invoice = objCvwInvoices.lstCVarvwInvoices[0];

                string ItemsUrl = URL + "api/SalesTransactions";

                string SOPNUMBER = Invoice.ConcatenatedInvoiceNumber;

                //SOPNUMBER = "Test/" + Invoice.InvoiceNumber;

                foreach (var item in objCvwReceivables.lstCVarvwReceivables)
                {
                    var LineDetails = new
                    {
                        SOPTYPE = "3",
                        SOPNUMBE = SOPNUMBER,
                        ITEMNMBR = item.ChargeTypeCode,
                        DeleteType = "1"
                    };

                    var result = await SendDELETERequestToExternalAPI(ItemsUrl, LineDetails);
                    if (!result.IsSuccess)
                    {
                        return new APIResponse()
                        {
                            IsSuccess = result.IsSuccess,
                            Message = result.Message
                        };
                    }
                    else
                    {
                        AddDBLog("Invoice_Details", (int)Invoice.ID, "D", pDeleteInvoiceDetails.pReceivablesIDs, userID);
                    }
                }

                return new APIResponse()
                {
                    IsSuccess = true,
                    Message = "Integrated Successfully"
                };
            }
        }
        */

        [HttpPost]
        public async Task<APIResponse> InsertVendorInvoice([FromBody] string pPayableID)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            string location = "1";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
                location = "01";
            }

            CvwPayables objCvwPayables = new CvwPayables();
            CPayables objCPayables = new CPayables();

            Exception e = objCvwPayables.GetList($"WHERE ID IN ({pPayableID})");
            objCPayables.GetList($"WHERE ID IN ({pPayableID})");

            if (objCvwPayables.lstCVarvwPayables.Count != objCPayables.lstCVarPayables.Count)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Payables"
                };
            }

            if (e != null || objCvwPayables.lstCVarvwPayables.Count == 0)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {e?.Message}"
                };
            }
            var Payables = objCvwPayables.lstCVarvwPayables;

            var firstSupplierInvoiceNo = Payables.FirstOrDefault()?.SupplierInvoiceNo;
            bool allSameSupplierInvoiceNo = Payables.All(p => p.SupplierInvoiceNo == firstSupplierInvoiceNo);

            var firstOperationID = Payables.FirstOrDefault()?.OperationID;
            bool allSameOperation = Payables.All(p => p.OperationID == firstOperationID);

            var firstIssueDate = Payables.FirstOrDefault().IssueDate;
            bool allSameIssueDate = Payables.All(p => p.IssueDate == firstIssueDate);

            var firstSupplier = Payables.FirstOrDefault()?.PartnerSupplierID;
            bool allSameSupplierID = Payables.All(p => p.PartnerSupplierID == firstSupplier);

            var firstType = Payables.FirstOrDefault()?.SupplierOperationPartnerTypeCode;
            bool allSameSupplierType = Payables.All(p => p.SupplierOperationPartnerTypeCode == firstType);

            var firstCurrency = Payables.FirstOrDefault()?.CurrencyCode;
            bool allSameCurrency = Payables.All(p => p.CurrencyCode == firstCurrency);

            if (!allSameSupplierInvoiceNo || !allSameSupplierID || !allSameSupplierType)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Vendor"
                };
            } else if (!allSameCurrency)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Currency"
                };

            } else if (!allSameOperation)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Payables are from same Operation"
                };
            } else if (!allSameIssueDate)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Payables Issue Date are the same"
                };
            }
            string VendorCode = Payables[0].VendorCode;
            string OperationCode = Payables[0].OperationCode;
            if (VendorCode == "0" || VendorCode == "")
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Vendor"
                };
            } else if (OperationCode == "0" || OperationCode == "")
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Payable Operation"
                };
            }

            var vendorInvoiceHeader = new VendorInvoiceHeader()
            {
                POPTYPE = "3",
                POPRCTNM = firstSupplierInvoiceNo,
                BACHNUMB = OperationCode,
                receiptdate = firstIssueDate.ToString("dd/MM/yyyy"),
                VENDORID = VendorCode,
                CURNCYID = firstCurrency,
                VNDDOCNM = firstSupplierInvoiceNo
            };


            string department = "";
            string branch = "";
            string operationCode = "";
            if (firstOperationID > 0)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

                department = objCCustomizedDBCall.CallStringFunction($"select Name from Branches where ID=(select BranchID from Operations where ID={firstOperationID})");
                branch = objCCustomizedDBCall.CallStringFunction($"select BranchName from vwUsers where ID=(select CreatorUserID from Operations where ID={firstOperationID})");
                if (branch.Contains("WAREHOUSE"))
                {
                    branch = "WAREHOUSE";
                }
                else if (branch.Contains("TRUCKING"))
                {
                    branch = "TRUCKING";
                }
                operationCode = Payables[0].OperationCode;
            }
            var vendorInvoiceHeaderUserDefined = new VendorInvoiceHeaderUserDefined()
            {
                POPRCTNM = firstSupplierInvoiceNo,
                User_Defined_Text01 = operationCode,
                User_Defined_Text02 = department,
                User_Defined_Text03 = branch
            };

            var vendorInvoiceDetails = new List<VendorInvoiceDetails>();

            foreach (var item in Payables)
            {

                string TaxCode = item.TaxTypeID > 0 ? item.TaxCode : "";
                string IsHaveTax = item.TaxTypeID > 0 ? "1" : "2";
                vendorInvoiceDetails.Add(new VendorInvoiceDetails()
                {
                    POPTYPE = "3",
                    POPRCTNM = firstSupplierInvoiceNo,
                    ITEMNMBR = item.ChargeTypeCode,
                    VENDORID = item.VendorCode,
                    QTYSHPPD = item.Quantity.ToString(),
                    QTYINVCD = item.Quantity.ToString(),
                    UOFM = "EA",
                    LOCNCODE = location,
                    CURNCYID = item.CurrencyCode,
                    UNITCOST = item.CostPrice.ToString(),
                    Purchase_Site_Tax_Schedu = TaxCode,
                    Purchase_Item_Tax_Schedu = TaxCode,
                    Purchase_IV_Item_Taxable = IsHaveTax
                });

            }



            var requestBody = new VendorInvoiceRequest()
            {
                POPHeader = vendorInvoiceHeader,
                POPLines = vendorInvoiceDetails,
                POPUserDefined = vendorInvoiceHeaderUserDefined

            };
            string ItemsUrl = URL + port + "api/ReceivingTransactions";

            var result = await SendPostRequestToExternalAPI(ItemsUrl, requestBody);

            if (result.IsSuccess)
            {
                foreach (var item in Payables)
                {
                    AddDBLog("Vendor_Invoice", (int)item.ID, "I", firstSupplierInvoiceNo, userID);
                }
            }

            return result;
        }

        [HttpPost]
        public async Task<APIResponse> InsertCreditNote([FromBody] int pID)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }

            CvwAccNote objCvwAccNote = new CvwAccNote();
            CPayables objCPayables = new CPayables();
            CvwPayables objCvwPayables = new CvwPayables();

            Exception e = objCvwAccNote.GetList($"WHERE ID={pID} and NoteType=100"); //100 for Credit
            if (objCvwAccNote.lstCVarvwAccNote.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Credit Note"
                };
            }
            var CN = objCvwAccNote.lstCVarvwAccNote[0];

            if (CN.InvoiceID == 0)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Credit Note Must Have Invoice"
                };
            }

            CvwInvoices objCvwInvoices = new CvwInvoices();
            e = objCvwInvoices.GetList($"WHERE ID={CN.InvoiceID}");


            if (e == null)
            {
                if (objCvwInvoices.lstCVarvwInvoices.Count != 1)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"Please Check Credit Note Invoice"
                    };
                }
                var objCCustomizedDBCall = new CCustomizedDBCall();
                string InvoiceExist = objCCustomizedDBCall.CallStringFunction($"select ID from GP_Log where ActionName='Invoice' and RowID={objCvwInvoices.lstCVarvwInvoices[0].ID}");
                if (int.TryParse(InvoiceExist, out int LogID))
                {
                    if (LogID < 1)
                    {
                        return new APIResponse()
                        {
                            IsSuccess = false,
                            Message = $"Please Check Credit Note Invoice"
                        };
                    }
                } else
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"Please Check Credit Note Invoice"
                    };
                }

                if (CN.PartnerTypeID != 1 || CN.PartnerID != objCvwInvoices.lstCVarvwInvoices[0].PartnerID)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"IST Error : Please Check Customer"
                    };
                }
                e = objCPayables.GetList($"WHERE AccNoteID={pID}");
                objCvwPayables.GetList($"WHERE AccNoteID={pID}");
            }

            if (e != null || objCPayables.lstCVarPayables.Count == 0 || objCPayables.lstCVarPayables.Count != objCvwPayables.lstCVarvwPayables.Count)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {e?.Message}"
                };
            }

            var Payables = objCPayables.lstCVarPayables;

            string TaxCode = "";
            /*CTaxeTypes objCTaxeTypes = new CTaxeTypes();

            var firstTaxType = Payables.First().TaxTypeID;
            bool allSameTaxType = Payables.All(p => p.TaxTypeID == firstTaxType);
            if (!allSameTaxType)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Tax for Items"
                };
            }
            if(firstTaxType > 0)
            {
                Exception ex = objCTaxeTypes.GetItem(firstTaxType);
                if(ex != null || objCTaxeTypes.lstCVarTaxeTypes.Count != 1)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"Error: {ex?.Message}"
                    };
                }
                TaxCode = objCTaxeTypes.lstCVarTaxeTypes[0].Code;
            }*/
            if (CN.TaxTypeID > 0)
            {
                TaxCode = CN.TaxTypeCode;
            }

            CCustomers objCCustomers = new CCustomers();
            objCCustomers.GetItem(CN.PartnerID);
            if (objCCustomers.lstCVarCustomers.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Customer"
                };
            }

            string CustomerNumber = objCCustomers.lstCVarCustomers[0].crmCode;
            if (string.IsNullOrWhiteSpace(CustomerNumber) || CustomerNumber == "0")
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Customer"
                };
            }

            //var requestBody = new CreditNoteRequest()
            //{
            //    RMDTYPAL = "7",
            //    DOCUMENTNUMBER = CN.Code,
            //    DOCUMENTDATE = CN.NoteDate.ToString("dd/MM/yyyy"),
            //    BACHNUMBER = CN.OperationCode,
            //    CUSOMERNUMBRER = CustomerNumber,
            //    DOCUMENTAMOUNT = Payables.Sum(p => p.CostAmount).ToString(),
            //    SALESAMOUNT = Payables.Sum(p => p.CostAmount).ToString(),
            //    CURNCYID = CN.CurrencyCode,
            //    TAXSCHID = TaxCode
            //};

            var rmTransactionTaxes = new List<RMTransactionTaxe>();
            var rmDistribution = new List<RMDistribution>();
            foreach (var item in objCvwPayables.lstCVarvwPayables)
            {
                CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
                objCvwChargeTypes.GetList($"WHERE ID={item.ChargeTypeID}");
                if(objCvwChargeTypes.lstCVarvwChargeTypes.Count != 1 || objCvwChargeTypes.lstCVarvwChargeTypes[0].AccountName_Revenue == "0" || string.IsNullOrWhiteSpace(objCvwChargeTypes.lstCVarvwChargeTypes[0].AccountName_Revenue) || string.IsNullOrWhiteSpace(objCvwChargeTypes.lstCVarvwChargeTypes[0].AccountName_Revenue.Split('-')[0]))
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"Error: Please Check ChargeType"
                    };
                }
                string revAccount = objCvwChargeTypes.lstCVarvwChargeTypes[0].AccountName_Revenue.Split('-')[0];

                if (CN.TaxPercentage > 0)
                {
                    string itemTax = (item.CostAmount * CN.TaxPercentage / 100).ToString();
                    rmTransactionTaxes.Add(new RMTransactionTaxe()
                    {
                        CUSTOMERID = CustomerNumber,
                        DOCUMENTNUMBER = CN.Code,
                        DOCUMENTTYPE = "7",
                        BATCHNUMBER = CN.OperationCode,
                        TAXDETAILID = TaxCode,
                        TAXAMOUNT = itemTax,
                        SALESTAXAMOUNT = itemTax,
                        TAXDETAILTOTALSALES = itemTax,
                        ACCOUNTNUMBERSTRING = revAccount
                    });
                }

                rmDistribution.Add(new RMDistribution()
                {
                    RMDTYPAL = "7",
                    DOCUMENTNUMBER = CN.Code,
                    VENDORID = CustomerNumber,
                    DISTRIBUTIONTYPE = "19",
                    ACCOUNTNUMBERSTRING = revAccount,
                    DEBITAMOUNT = item.CostAmount.ToString()
                });
            }

            string customerInvoice = objCvwInvoices.lstCVarvwInvoices[0].InvoiceTypeCode + " " + objCvwInvoices.lstCVarvwInvoices[0].InvoiceNumber.ToString("00000");
            if (objCvwInvoices.lstCVarvwInvoices[0].InvoiceDate.Year == 2024)
            {
                customerInvoice = objCvwInvoices.lstCVarvwInvoices[0].InvoiceNumber.ToString("00000");
            }
            var requestBody = new CreditNoteRequest()
            {
                RMTransactionInsert = new RMTransactionInsert()
                {
                    RMDTYPAL = "7",
                    DOCUMENTNUMBER = CN.Code,
                    DOCUMENTDATE = CN.NoteDate.ToString("dd/MM/yyyy"),
                    BATCHNUMBER = CN.OperationCode,
                    CUSOMERNUMBRER = CustomerNumber,
                    DOCUMENTAMOUNT = CN.Amount.ToString(),
                    SALESAMOUNT = CN.AmountWithoutVAT.ToString(),
                    CURNCYID = CN.CurrencyCode,
                    TAXSCHID = TaxCode,
                    TAXAMOUNT = CN.TaxAmount.ToString(),
                    DOCUMENTDESCRIPTION = customerInvoice
                },
                RMTransactionTaxes = rmTransactionTaxes,
                RMDistributions = rmDistribution
            };
            string ItemsUrl = URL + port + "api/Sales/InsertReceivableTransaction";

            var result = await SendPostRequestToExternalAPI(ItemsUrl, requestBody);

            if (result.IsSuccess)
            {
                AddDBLog("CreditNote", (int)CN.ID, "I", CN.Code, userID);
            }

            return result;
        }

        [HttpPost]
        public async Task<APIResponse> InsertDebitNote([FromBody] int pID)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }

            CvwAccNote objCvwAccNote = new CvwAccNote();
            CReceivables objCReceivables = new CReceivables();
            CvwReceivables objCvwReceivables = new CvwReceivables();

            Exception e = objCvwAccNote.GetList($"WHERE ID={pID} and NoteType=90"); //90 for Debit
            if (objCvwAccNote.lstCVarvwAccNote.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Debit Note"
                };
            }
            var DN = objCvwAccNote.lstCVarvwAccNote[0];

            if (DN.InvoiceID != 0)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Check Debit Note"
                };
            }


            if (e == null)
            {
                if (DN.PartnerTypeID == 1)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"IST Error : Please Check Vendor"
                    };
                }
                e = objCReceivables.GetList($"WHERE AccNoteID={pID}");
                objCvwReceivables.GetList($"WHERE AccNoteID={pID}");
            }

            if (e != null || objCReceivables.lstCVarReceivables.Count == 0 || objCReceivables.lstCVarReceivables.Count != objCvwReceivables.lstCVarvwReceivables.Count)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {e?.Message}"
                };
            }

            var Receivables = objCReceivables.lstCVarReceivables;

            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            string TaxCode = "";

            /*var firstTaxType = Receivables.First().TaxeTypeID;
            bool allSameTaxType = Receivables.All(p => p.TaxeTypeID == firstTaxType);
            if (!allSameTaxType)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Tax for Items"
                };
            }
            if (firstTaxType > 0)
            {
                Exception ex = objCTaxeTypes.GetItem(firstTaxType);
                if (ex != null || objCTaxeTypes.lstCVarTaxeTypes.Count != 1)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"Error: {ex?.Message}"
                    };
                }
                TaxCode = objCTaxeTypes.lstCVarTaxeTypes[0].Code;
            }*/
            if (DN.TaxTypeID > 0)
            {
                TaxCode = DN.TaxTypeCode;
            }

            CSuppliers objCSuppliers = new CSuppliers();
            if (DN.PartnerName.Contains('\''))
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Supplier Name don't include special characters"
                };
            }
            objCSuppliers.GetList($"WHERE Name=N'{DN.PartnerName}'");
            if (objCSuppliers.lstCVarSuppliers.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Supplier"
                };
            }

            string VendorNumber = objCSuppliers.lstCVarSuppliers[0].CRM_Code;
            if (string.IsNullOrWhiteSpace(VendorNumber) || VendorNumber == "0")
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : Please Check Supplier"
                };
            }

            var pmTransactionTaxes = new List<PMTransactionTaxe>();
            var pmDistributions = new List<PMDistribution>();

            foreach(var item in objCvwReceivables.lstCVarvwReceivables)
            {
                CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
                objCvwChargeTypes.GetList($"WHERE ID={item.ChargeTypeID}");
                if (objCvwChargeTypes.lstCVarvwChargeTypes.Count != 1 || objCvwChargeTypes.lstCVarvwChargeTypes[0].AccountName_Expense == "0" || string.IsNullOrWhiteSpace(objCvwChargeTypes.lstCVarvwChargeTypes[0].AccountName_Expense) || string.IsNullOrWhiteSpace(objCvwChargeTypes.lstCVarvwChargeTypes[0].AccountName_Expense.Split('-')[0]))
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = $"Error: Please Check ChargeType"
                    };
                }
                string expAccount = objCvwChargeTypes.lstCVarvwChargeTypes[0].AccountName_Expense.Split('-')[0];

                if(DN.TaxPercentage > 0)
                {
                    pmTransactionTaxes.Add(new PMTransactionTaxe()
                    {
                        VENDORID = VendorNumber,
                        VOUCHERNUMBER = DN.Code,
                        DOCUMENTTYPE = "5",
                        BATCHNUMBER = DN.OperationCode,
                        TAXDETAILID = TaxCode,
                        TAXAMOUNT = (item.SaleAmount * DN.TaxPercentage / 100).ToString(),
                        ACCOUNTNUMBERSTRING = expAccount
                    });
                }

                pmDistributions.Add(new PMDistribution()
                {
                    DOCUMENTTYPE = "5",
                    VOUCHERNUMBER = DN.Code,
                    VENDORID = VendorNumber,
                    DISTRIBUTIONTYPE = "6",
                    ACCOUNTNUMBERSTRING = expAccount,
                    CREDITAMOUNT = item.SaleAmount.ToString()
                });
            }

            //var requestBody = new DebitNoteRequest()
            //{
            //    BACHNUMBER = DN.OperationCode,
            //    VOUCHERNUMBER = DN.Code,
            //    VENDORID = VendorNumber,
            //    DOCUMENTTYPE = "5",
            //    DOCUMENTNUMBER = DN.Code,
            //    DOCUMENTDATE = DN.NoteDate.ToString("dd/MM/yyyy"),
            //    CURNCYID = DN.CurrencyCode,
            //    TAXSCHID = TaxCode,
            //    PURCHASESAMOUNT = ReceivablesSum,
            //    DOCUMENTAMOUNT = ReceivablesSum,
            //    CHARGEAMOUNT = ReceivablesSum
            //};
            var requestBody = new DebitNoteRequest()
            {
                PMTransactionInsert = new PMTransactionInsert()
                {
                    BATCHNUMBER = DN.OperationCode,
                    VOUCHERNUMBER = DN.Code,
                    VENDORID = VendorNumber,
                    DOCUMENTTYPE = "5",
                    DOCUMENTNUMBER = DN.Code,
                    DOCUMENTDATE = DN.NoteDate.ToString("dd/MM/yyyy"),
                    CURNCYID = DN.CurrencyCode,
                    TAXSCHID = TaxCode,
                    PURCHASESAMOUNT = DN.AmountWithoutVAT.ToString(),
                    DOCUMENTAMOUNT = DN.Amount.ToString(),
                    CHARGEAMOUNT = DN.Amount.ToString(),
                    TAXAMOUNT = DN.TaxAmount.ToString(),
                    TRANSACTIONDESCRIPTION = DN.PartnerVATNumber
                },
                PMTransactionTaxes = pmTransactionTaxes,
                PMDistributions = pmDistributions
            };
            string ItemsUrl = URL + port + "api/Purchasings/PayablesTransactionEntry";

            var result = await SendPostRequestToExternalAPI(ItemsUrl, requestBody);

            if (result.IsSuccess)
            {
                AddDBLog("DebitNote", (int)DN.ID, "I", DN.Code, userID);
            }

            return result;
        }
        [HttpPost]
        public async Task<APIResponse> GetPayments([FromBody] int pID)
        {
            int userID = WebSecurity.CurrentUserId;
            string port = "1010/";
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri;
            if (absoluteUrl.Contains("forwardinglattproduction"))
            {
                port = "1012/";
            }
            //Get Customer
            var objCCustomers = new CCustomers();
            Exception e = objCCustomers.GetItem(pID);
            string CustomerID = "";

            //Validations
            if (e != null)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error: {e.Message}"
                };
            } else if (objCCustomers.lstCVarCustomers.Count != 1)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Customer"
                };
            }
            CustomerID = objCCustomers.lstCVarCustomers[0].crmCode;
            if (string.IsNullOrWhiteSpace(CustomerID) || CustomerID == "0" || objCCustomers.lstCVarCustomers[0].DebitorGroupID == 0)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"Please Check Customer CRM Code"
                };
            }

            //Send GET Request
            string apiLink = URL + port + "api/Payments?customerId=" + CustomerID;

            var result = await SendGETRequestToExternalAPI(apiLink);

            if (!result.IsSuccess)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = result.Message
                };
            }

            if (result.Data.Count == 0)
            {
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = "No Payment Found"
                };
            }

            foreach (var inv in result.Data)
            {
                var objCGP_Log = new CGP_Log();
                var objCInvoice = new CInvoices();
                var objCCurrencies = new CCurrencies();

                objCCurrencies.GetList($"WHERE Code='{inv.CURNCYID}'");
                if(objCCurrencies.lstCVarCurrencies.Count != 1)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = "Please Check Currency"
                    };
                }

                Exception ee2 = objCGP_Log.GetList($"WHERE ActionName='Invoice' and crmCode='{inv.InvoiceNumber}'");
                if(ee2 != null)
                {
                    return new APIResponse()
                    {
                        IsSuccess = false,
                        Message = ee2.Message
                    };
                }
                if(objCGP_Log.lstCVarGP_Log.Count == 0)
                {
                    continue;
                } else if(objCGP_Log.lstCVarGP_Log.Count == 1)
                {
                    ee2 = objCInvoice.UpdateList($"RemainingAmount={inv.RemrningAmount}, PaidAmount=(Amount-{inv.RemrningAmount}) WHERE ID={objCGP_Log.lstCVarGP_Log[0].RowID} and CurrencyID={objCCurrencies.lstCVarCurrencies[0].ID}");
                    if(ee2 != null)
                    {
                        return new APIResponse()
                        {
                            IsSuccess = false,
                            Message = ee2.Message
                        };
                    }


                }
            }

            /*
                var vouchers = result.Data.Select(p => p.DocumentNumber).Distinct().ToList();
                foreach (var voucher in vouchers)
                {
                    var objCA_Voucher = new CA_Voucher();
                    Exception e_v = objCA_Voucher.GetList($"WHERE Code='{voucher}'");
                    if (e_v != null)
                    {
                        return new APIResponse()
                        {
                            IsSuccess = false,
                            Message = e_v.Message
                        };
                    }
                    if (objCA_Voucher.lstCVarA_Voucher.Count != 0)
                    {
                        continue;
                    }

                    var relatedRecords = result.Data.Where(x => x.DocumentNumber == voucher).ToList();
                    var t = relatedRecords.Select(p => new
                    {
                        p.AppliedToDocNumber,
                        p.AmountApplied,
                        p.CurrencyID
                    }).ToList();

                    var documentNumbers = "";
                    var amounts = "";
                    var currencies = "";
                    foreach (var i in t)
                    {
                        documentNumbers += (documentNumbers == "" ? "" : ",") + i.AppliedToDocNumber;
                        amounts += (amounts == "" ? "" : ",") + i.AmountApplied;
                        currencies += (currencies == "" ? "" : ",") + i.CurrencyID;
                    }


                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    Exception ex2 = objCCustomizedDBCall.CallProcFunction($"Insert_A_Voucher_From_GP {userID}, '{voucher}', '{documentNumbers}', '{amounts}', '{relatedRecords[0].DocumentDate.ToString("yyyy-MM-dd")}', '{currencies}'");
                    if (ex2 != null)
                    {
                        return new APIResponse()
                        {
                            IsSuccess = false,
                            Message = ex2.Message
                        };
                    }
                }
                */

            return new APIResponse()
            {
                IsSuccess = true,
                Message = $""
            };
        }


        [HttpPost]
        public async Task<APIResponse> SendPostRequestToExternalAPI(string pApiLink, object pRequestData)
        {
            string externalApiUrl = pApiLink;
            var requestData = pRequestData;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            try
            {


                string jsonData = JsonConvert.SerializeObject(requestData);

                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(60);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(externalApiUrl, content).ConfigureAwait(false);

                    string responseContent = await response.Content.ReadAsStringAsync();

                    APIResponse APIResponse = JsonConvert.DeserializeObject<APIResponse>(responseContent);

                    WriteToLog($"posting json to {pApiLink} -> {jsonData} \n --{response.IsSuccessStatusCode}-{responseContent} \n");

                    return APIResponse;
                }
            }
            catch (Exception ex)
            {
                WriteToLog($"Exception: {ex.Message}");
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {ex.Message}"
                };
            }
        }

        private async Task<APIGETResponse> SendGETRequestToExternalAPI(string pApiLink)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(30);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = await client.GetAsync(pApiLink).ConfigureAwait(false);
                    string responseContent = await response.Content.ReadAsStringAsync();
                    APIGETResponse APIResponse = JsonConvert.DeserializeObject<APIGETResponse>(responseContent);
                    WriteToLog($"posting json to {pApiLink} -> {response.IsSuccessStatusCode}-{responseContent} \n");
                    return APIResponse;
                }
            }
            catch (Exception ex)
            {
                WriteToLog($"Exception: {ex.Message}");
                return new APIGETResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {ex.Message}"
                };
            }
        }

        /*
        private async Task<APIResponse> SendPUTRequestToExternalAPI(string pApiLink, object pRequestData)
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

                    HttpResponseMessage response = await client.PutAsync(externalApiUrl, content).ConfigureAwait(false);

                    string responseContent = await response.Content.ReadAsStringAsync();

                    APIResponse APIResponse = JsonConvert.DeserializeObject<APIResponse>(responseContent);

                    WriteToLog($"posting json to {pApiLink} -> {jsonData} \n --{response.IsSuccessStatusCode}-{responseContent} \n");

                    return APIResponse;
                }
            }
            catch (Exception ex)
            {
                WriteToLog($"Exception: {ex.Message}");
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {ex.Message}"
                };
            }
        }

        private async Task<APIResponse> SendDELETERequestToExternalAPI(string pApiLink, object pRequestData)
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

                    var requestMessage = new HttpRequestMessage(HttpMethod.Delete, externalApiUrl)
                    {
                        Content = new StringContent(jsonData, Encoding.UTF8, "application/json")
                    };

                    HttpResponseMessage response = await client.SendAsync(requestMessage).ConfigureAwait(false);

                    string responseContent = await response.Content.ReadAsStringAsync();

                    APIResponse APIResponse = JsonConvert.DeserializeObject<APIResponse>(responseContent);

                    WriteToLog($"posting json to {pApiLink} -> {jsonData} \n --{response.IsSuccessStatusCode}-{responseContent} \n");

                    return APIResponse;
                }
            }
            catch (Exception ex)
            {
                WriteToLog($"Exception: {ex.Message}");
                return new APIResponse()
                {
                    IsSuccess = false,
                    Message = $"IST Error : {ex.Message}"
                };
            }
        }
        */
        public static void WriteToLog(string message)
        {
            try
            {
                string directoryPath = HostingEnvironment.MapPath("~/api/Defaults/DynamicsGP");
                bool exists = Directory.Exists(directoryPath);
                if (!exists)
                    Directory.CreateDirectory(directoryPath);


                string pathStringForLog = Path.Combine(directoryPath, "DynamicsGP_" + DateTime.Now.ToString("dd_MM_yyyy") + ".txt");
                using (StreamWriter writer = new StreamWriter(pathStringForLog, true))
                {
                    writer.WriteLine($"[Date: {DateTime.Now.ToString("dd_MM_yyyy___hh_mm_ss")}] => {message} \n");
                }
            } catch (Exception ex)
            {

            }
        }

        public static void AddDBLog(string pActionName, int pRowID, string pActionType, string pCrmCode, int pUserID)
        {
            CGP_Log objCGP_Log = new CGP_Log();
            CVarGP_Log objCVarGP_Log = new CVarGP_Log();

            objCVarGP_Log.ID = 0;
            objCVarGP_Log.ActionName = pActionName;
            objCVarGP_Log.RowID = pRowID;
            objCVarGP_Log.ActionType = pActionType;
            objCVarGP_Log.ActionDate = DateTime.Now;
            objCVarGP_Log.UserID = pUserID;
            objCVarGP_Log.crmCode = pCrmCode;

            objCGP_Log.lstCVarGP_Log.Add(objCVarGP_Log);
            Exception e = objCGP_Log.SaveMethod(objCGP_Log.lstCVarGP_Log);

        }
    }

    public class POSTResponseDTO
    {
        public bool IsSuccessStatusCode { get; set; }
        public string ResponseContent { get; set; }
    }

    public class APIResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }

    public class CustomerRequest
    {
        public string CUSTNMBR { get; set; }
        public string CUSTNAME { get; set; }
        public string CUSTCLAS { get; set; }
        public string ADRSCODE { get; set; }
        public string ADDRESS1 { get; set; }
        public string ADDRESS2 { get; set; }
        public string CITY { get; set; }
        public string STATE { get; set; }
        public string COUNTRY { get; set; }
        public string PHNUMBR1 { get; set; }
        public string TAXSCHID { get; set; }
        public string SLPRSNID { get; set; }
        public string TXRGNNUM { get; set; }
        public string CURNCYID { get; set; }
        public string UpdateIfExists { get; set; }
    }

    public class VendorRequest
    {
        public string VENDORID { get; set; }
        public string VENDNAME { get; set; }
        public string VNDCLSID { get; set; }
        public string VADDCDPR { get; set; }
        public string ADDRESS1 { get; set; }
        public string ADDRESS2 { get; set; }
        public string CITY { get; set; }
        public string STATE { get; set; }
        public string COUNTRY { get; set; }
        public string PHNUMBR1 { get; set; }
        public string TAXSCHID { get; set; }
        public string TXRGNNUM { get; set; }
        public string CURNCYID { get; set; }
        public string UpdateIfExists { get; set; }
    }
    public class ItemRequest
    {
        public string ITEMNMBR { get; set; }
        public string ITEMDESC { get; set; }
        public string ITMSHNAM { get; set; }
        public string ITMCLSCD { get; set; }
        public string UOMSCHDL { get; set; }
        public string ITEMTYPE { get; set; }
        public string ITMGEDSC { get; set; }
        public string UpdateIfExists { get; set; }

    }

    public class InvoiceDetails
    {
        public string SOPTYPE { get; set; }
        public string DOCID { get; set; }
        public string SOPNUMBE { get; set; }
        public string DOCDATE { get; set; }
        public string CUSTNMBR { get; set; }
        public string ITEMNMBR { get; set; }
        public string CURNCYID { get; set; }
        public string QUANTITY { get; set; }
        public string UNITPRCE { get; set; }
        public string UOFM { get; set; }
        public string TAXSCHID { get; set; }
        public string ITMTSHID { get; set; }
        public string IVITMTXB { get; set; }
        public string UpdateIfExists { get; set; }

    }
    public class InvoiceHeader
    {
        public string SOPTYPE { get; set; }
        public string DOCID { get; set; }
        public string SOPNUMBE { get; set; }
        public string DOCDATE { get; set; }
        public string CUSTNMBR { get; set; }
        public string CUSTNAME { get; set; }
        public string CURNCYID { get; set; }
    }
    public class InvoiceHeaderUserDefined
    {
        public string SOPTYPE { get; set; }
        public string SOPNUMBE { get; set; }
        public string USERDEF1 { get; set; }
        public string USERDEF2 { get; set; }
        public string USRDEF03 { get; set; }
        public string USRDEF04 { get; set; }
        public string USRDEF05 { get; set; }
    }

    public class InvoiceRequest {
        public InvoiceHeader SOPHeader { get; set; }
        public InvoiceHeaderUserDefined SOPUserDefined { get; set; }
        public List<InvoiceDetails> SOPLines { get; set; }
    }

    public class UpdateInvoiceDetails
    {
        public string pReceivablesIDs { get; set; }
        public int pInvoiceID { get; set; }
    }

    public class VendorInvoiceHeader
    {
        public string POPTYPE { get; set; }
        public string POPRCTNM { get; set; }
        public string BACHNUMB { get; set; }
        public string receiptdate { get; set; }
        public string VENDORID { get; set; }
        public string CURNCYID { get; set; }
        public string VNDDOCNM { get; set; }
    }
    public class VendorInvoiceHeaderUserDefined
    {
        public string POPRCTNM { get; set; }
        public string User_Defined_Text01 { get; set; }
        public string User_Defined_Text02 { get; set; }
        public string User_Defined_Text03 { get; set; }
    }
    public class VendorInvoiceDetails
    {
        public string POPTYPE { get; set; }
        public string POPRCTNM { get; set; }
        public string ITEMNMBR { get; set; }
        public string VENDORID { get; set; }
        public string QTYSHPPD { get; set; }
        public string QTYINVCD { get; set; }
        public string UOFM { get; set; }
        public string LOCNCODE { get; set; }
        public string CURNCYID { get; set; }
        public string UNITCOST { get; set; }
        public string Purchase_Site_Tax_Schedu { get; set; }
        public string Purchase_Item_Tax_Schedu { get; set; }
        public string Purchase_IV_Item_Taxable { get; set; }

    }
    public class VendorInvoiceTaxLines
    {
        public string TAXTYPE { get; set; }
        public string VENDORID { get; set; }
        public string POPRCTNM { get; set; }
        public string TAXDTLID { get; set; }
    }

    public class VendorInvoiceRequest
    {
        public VendorInvoiceHeader POPHeader { get; set; }
        public List<VendorInvoiceDetails> POPLines { get; set; }
        public VendorInvoiceHeaderUserDefined POPUserDefined { get; set; }
    }

    public class CreditNoteRequest
    {
        public RMTransactionInsert RMTransactionInsert { get; set; }
        public List<RMTransactionTaxe> RMTransactionTaxes { get; set; }
        public List<RMDistribution> RMDistributions { get; set; }

    }

    public class RMTransactionInsert
    {
        public string RMDTYPAL { get; set; }
        public string DOCUMENTNUMBER { get; set; }
        public string DOCUMENTDATE { get; set; }
        public string BATCHNUMBER { get; set; }
        public string CUSOMERNUMBRER { get; set; }
        public string DOCUMENTAMOUNT { get; set; }
        public string SALESAMOUNT { get; set; }
        public string CURNCYID { get; set; }
        public string TAXSCHID { get; set; }
        public string TAXAMOUNT { get; set; }
        public string DOCUMENTDESCRIPTION { get; set; }
    }
    public class RMTransactionTaxe
    {
        public string CUSTOMERID { get; set; }
        public string DOCUMENTNUMBER { get; set; }
        public string DOCUMENTTYPE { get; set; }
        public string BATCHNUMBER { get; set; }
        public string TAXDETAILID { get; set; }
        public string TAXAMOUNT { get; set; }
        public string SALESTAXAMOUNT { get; set; }
        public string TAXDETAILTOTALSALES { get; set; }
        public string ACCOUNTNUMBERSTRING { get; set; }
    }
    public class RMDistribution
    {
        public string RMDTYPAL { get; set; }
        public string DOCUMENTNUMBER { get; set; }
        public string VENDORID { get; set; }
        public string DISTRIBUTIONTYPE { get; set; }
        public string ACCOUNTNUMBERSTRING { get; set; }
        public string DEBITAMOUNT { get; set; }
    }
    public class DebitNoteRequest
    {
        public PMTransactionInsert PMTransactionInsert { get; set; }
        public List<PMTransactionTaxe> PMTransactionTaxes { get; set; }
        public List<PMDistribution> PMDistributions { get; set; }
    }
    public class PMTransactionInsert
    {
        public string BATCHNUMBER { get; set; }
        public string VOUCHERNUMBER { get; set; }
        public string VENDORID { get; set; }
        public string DOCUMENTTYPE { get; set; }
        public string DOCUMENTNUMBER { get; set; }
        public string DOCUMENTDATE { get; set; }
        public string CURNCYID { get; set; }
        public string TAXSCHID { get; set; }
        public string PURCHASESAMOUNT { get; set; }
        public string DOCUMENTAMOUNT { get; set; }
        public string CHARGEAMOUNT { get; set; }
        public string TAXAMOUNT { get; set; }
        public string TRANSACTIONDESCRIPTION { get; set; }
    }
    public class PMTransactionTaxe
    {
        public string VENDORID { get; set; }
        public string VOUCHERNUMBER { get; set; }
        public string DOCUMENTTYPE { get; set; }
        public string BATCHNUMBER { get; set; }
        public string TAXDETAILID { get; set; }
        public string TAXAMOUNT { get; set; }
        public string ACCOUNTNUMBERSTRING { get; set; }
    }
    public class PMDistribution
    {
        public string DOCUMENTTYPE { get; set; }
        public string VOUCHERNUMBER { get; set; }
        public string VENDORID { get; set; }
        public string DISTRIBUTIONTYPE { get; set; }
        public string ACCOUNTNUMBERSTRING { get; set; }
        public string CREDITAMOUNT { get; set; }
    }
    public class APIGETResponse
    {
        public List<Payment> Data { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }
    public class Payment
    {
        public string CustomerID { get; set; }
        public string InvoiceNumber { get; set; }
        public string RemrningAmount { get; set; }
        public string CURTRXAM { get; set; }
        public string ORTRXAMT { get; set; }
        public string CURNCYID { get; set; }
        public string XCHGRATE { get; set; }
        public string CurrencyAmount { get; set; }
        public string RMDTYPAL { get; set; }
    }
}