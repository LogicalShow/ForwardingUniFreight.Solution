using AutoMapper;
using FastReport;
using Forwarding.MvcApp.Controllers.Administration.API_Security;
using Forwarding.MvcApp.Controllers.LocalEmails.LocalEmails;
//using Forwarding.MvcApp.Entities.Quotations;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.ContainerFreightStation.Tariff;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.DynamicsCRM;
using Forwarding.MvcApp.Models.InterServices.Transactions.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated.Old;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.RightsManagement;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Services.Description;
using System.Web.UI.WebControls;
using System.Windows.Shapes;
using System.Xml.Linq;
using WebMatrix.WebData;
using Path = System.IO.Path;

namespace Forwarding.MvcApp.Controllers.DynamicsCRM
{
    public class DynamicsCRMController : ApiController
    {
        private CDefaults objCDefaults = new CDefaults();
        //private string tenantID = "18628f3c-d584-4e0f-91cd-5a2f04a0d8cb";
        //private string clientID = "e2efe480-d3ff-4cb5-88d8-b3d4c3960eb1";
        //private string clientSecret = "X858Q~9Rt4RL1xcrXqJ5QLJyOZEPq9rjcWlEJa6Q";
        //private string url = "https://mgcrm.api.crm4.dynamics.com";

        private string tenantID = "18628f3c-d584-4e0f-91cd-5a2f04a0d8cb";
        private string clientID = "c51e5fc0-4213-4101-ba08-5327eb1ce495";
        private string clientSecret = "szb8Q~p1gw8Tx6sI0m3zEX2TmCsfgu6DbKaslcGm";
        private string url = "https://mgc.crm4.dynamics.com";
        private string BusinessUnitID = "";
        private string CorporateBusinessUnitID = "bc4d3015-7a1c-ed11-b83b-0022487f2774";
        private Dictionary<string, string> BusinessUnits = new Dictionary<string, string>
        {
            {"MES","a30cd0c2-548c-ed11-81ad-6045bd8c5aa8" },
            {"ALT","b090969f-548c-ed11-81ad-6045bd8c5aa8" },
            {"EUR","223535ac-548c-ed11-81ad-6045bd8c5aa8" },
            {"GLO","283535ac-548c-ed11-81ad-6045bd8c5aa8" },
            {"SAC","a90cd0c2-548c-ed11-81ad-6045bd8c5aa8" }
        };
        private List<CVarcrmLog> crmlogRecords { get; set; } = new List<CVarcrmLog>();
        private CcrmLog objCcrmLog = new CcrmLog();
        private int CountryID = 0;
        private int ClosedOperationStageID = 120;
        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
        public DynamicsCRMController()
        {
            objCcrmLog.GetList("WHERE 1=1");
            crmlogRecords.AddRange(objCcrmLog.lstCVarcrmLog);
        }
        public string Auth()
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var client = new RestClient("https://login.windows.net");
            var request = new RestRequest($"/{tenantID}/oauth2/token", Method.POST);
            request.AddHeader("Accept", "application/json");
            var body = new
            {
                grant_type = "client_credentials",
                client_id = clientID,
                client_secret = clientSecret,
                resource = url
            };
            request.AddObject(body);
            try
            {
                var response = client.Execute(request);
                var AuthResponse = (JObject)JsonConvert.DeserializeObject(response.Content);
                string access_token = AuthResponse["access_token"].Value<string>();
                return access_token;
            }
            catch (Exception error)
            {
                return error.Message;
            }

        }
        #region MasterData Integration
        [HttpGet]
        async public Task UpdateMasterData()
        {
            objCDefaults.GetList(" WHERE 1=1");
            BusinessUnitID = BusinessUnits[objCDefaults.lstCVarDefaults[0].UnEditableCompanyName];
            string access_token = Auth();
             await GetSalesmen(access_token);
            await GetCustomers(access_token);
            await GetAgents(access_token);
            await GetChargeTypes(access_token);
            await GetAirLines(access_token);
            await GetShippingLines(access_token);
            //await GetSeaPorts(access_token);
            //await GetAirPorts(access_token);
        }
        async public Task GetSalesmen(string access_token)
        {
            CSalesmen objCSalesmen = new CSalesmen();
            var client = new RestClient($"{url}");
            var request = new RestRequest($"/api/data/v9.2.23022.00178/systemusers?$select=fullname,userpuid&$filter=islicensed eq true and _businessunitid_value eq '{BusinessUnitID}'", Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Authorization", $"Bearer {access_token}");
            try
            {
                var response = await client.ExecuteGetTaskAsync(request);
                var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                var results = Data.SelectToken("value");
                List<string> ExistingRecords = new List<string>();
                ExistingRecords = objCCustomizedDBCall.ExecuteQuery_Array($"select crmCode from Salesmen");
                foreach (var salesman in results)
                {
                    if (!ExistingRecords.Contains(salesman["systemuserid"].ToString()))
                    {
                        string Name = (string)salesman["fullname"];
                        objCCustomizedDBCall.ExecuteQuery($"insert into Salesmen(Name,LocalName,crmCode) values(N'{Name.Replace("'", "''")}',N'{Name.Replace("'", "''")}','{(string)salesman["systemuserid"]}')");
                    }
                    else
                    {
                        string Name = (string)salesman["fullname"];
                        objCSalesmen.UpdateList($"NAME = N'{Name.Replace("'", "''")}', LocalName = N'{Name.Replace("'", "''")}' WHERE crmCode = N'{(string)salesman["systemuserid"]}'");
                    }
                }
            }
            catch (Exception)
            {

            }
        }
        async public Task GetCustomers(string access_token)
        {
            var client = new RestClient($"{url}");
            var request = new RestRequest($"/api/data/v9.2.23022.00178/accounts?$select=name,mesco_arabicname,xollsp_vatnumber&$filter=_owningbusinessunit_value eq '" + BusinessUnitID + "' and owningteam/name ne 'crm office' and xollsp_vatnumber ne null", Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Authorization", $"Bearer {access_token}");
            try
            {
                var response = await client.ExecuteGetTaskAsync(request);
                var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                var results = Data.SelectToken("value");
                List<string> ExistingRecords = new List<string>();
                ExistingRecords = objCCustomizedDBCall.ExecuteQuery_Array($"select crmCode from Customers");   //check if customer already existed

                foreach (var customer in results)
                {
                    string Name = (string)customer["name"];
                    string ARName = (string)customer["mesco_arabicname"] ?? "";
                    string VatNumber = (string)customer["xollsp_vatnumber"] ?? "";
                    if (!ExistingRecords.Contains(customer["accountid"].ToString()))
                    {

                        objCCustomizedDBCall.ExecuteQuery($"insert into customers(name,LocalName,VATNumber,notes,IsInternalCustomer,ManagerRoleID,AdministratorRoleID,crmCode,IsShipper,IsConsignee,IsInactive,PaymentTermID,IsConsolidatedInvoice,IsDeleted,OriginalCMRbyPost,IsExternal,IsHold,CreationDate) values(N'{Name.Replace("'", "''")}', N'{ARName.Replace("'", "''")}','{VatNumber.Replace(" ", "")}','{(string)customer["accountid"]}', 1, 5, 1,N'{(string)customer["accountid"]}',1,1,0,6,0,0,0,0,0,GETDATE())");
                    }
                    else
                    {
                        objCCustomizedDBCall.CallStringFunction($"Update Customers SET name = N'{Name.Replace("'", "''")}',LocalName = N'{ARName.Replace("'", "''")}' WHERE crmCode = N'{(string)customer["accountid"]}'");
                    }
                }
            }
            catch (Exception)
            {

            }
        }
        async public Task GetAgents(string access_token)
        {
            var client = new RestClient($"{url}");
            var request = new RestRequest($"/api/data/v9.2.23022.00178/mesco_agents?$select=mesco_name&$filter=_mesco_businessunit_value eq '{BusinessUnitID}'", Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Authorization", $"Bearer {access_token}");
            try
            {
                var response = await client.ExecuteGetTaskAsync(request);
                var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                var results = Data.SelectToken("value");
                List<string> ExistingRecords = new List<string>();
                ExistingRecords = objCCustomizedDBCall.ExecuteQuery_Array($"select crmCode From Agents");
                foreach (var agent in results)
                {
                    string Name = (string)agent["mesco_name"];
                    if (!ExistingRecords.Contains(agent["mesco_agentid"].ToString()))
                    {
                        objCCustomizedDBCall.ExecuteQuery($"insert into Agents(Name,LocalName,crmCode,IsInactive,IsConsolidatedInvoice,IsDeleted,PaymentTermID) values(N'{Name.Replace("'", "''")}', N'{Name.Replace("'", "''")}',N'{(string)agent["mesco_agentid"]}',0,0,0,6)");
                    }
                    else
                    {
                        objCCustomizedDBCall.CallStringFunction($"Update Agents SET name = N'{Name.Replace("'", "''")}',LocalName = N'{Name.Replace("'", "''")}' WHERE crmCode = N'{(string)agent["mesco_agentid"]}'");
                    }
                }
            }
            catch (Exception)
            {

            }
        }
        async public Task GetChargeTypes(string access_token)
        {
            var client = new RestClient($"{url}");
            var request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_servicedefinitions?$select=xollsp_name", Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Authorization", $"Bearer {access_token}");
            try
            {
                var response = await client.ExecuteGetTaskAsync(request);
                var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                var results = Data.SelectToken("value");
                List<string> ExistingRecords = new List<string>();
                ExistingRecords = objCCustomizedDBCall.ExecuteQuery_Array($"select crmCode from ChargeTypes");
                foreach (var ChargeType in results)
                {
                    if (!ExistingRecords.Contains(ChargeType["xollsp_servicedefinitionid"].ToString()))
                    {
                        objCCustomizedDBCall.CallStringFunction($"insert into ChargeTypes(code,name,LocalName,IsUsedInPayable,IsUsedInReceivable,IsOcean,IsAir,IsInland,IsOperationChargeType,IsTank,IsDefaultInQuotation,IsDefaultInOperations,IsAddedManually,IsInactive,IsGeneralChargeType,IsWarehouseChargeType,IsExcludeInTruckingOrderPrint,IsOfficial,crmCode,IsMasterOperation,IsDirectOperation) values(N'',N'{(string)ChargeType["xollsp_name"]}', N'{(string)ChargeType["xollsp_name"]}',1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,N'{(string)ChargeType["xollsp_servicedefinitionid"]}',0,0)");
                    }
                    else
                    {
                        objCCustomizedDBCall.CallStringFunction($"Update ChargeTypes SET name = N'{(string)ChargeType["xollsp_name"]}',LocalName = N'{(string)ChargeType["xollsp_name"]}' WHERE crmCode = N'{(string)ChargeType["xollsp_servicedefinitionid"]}'");
                    }
                }
            }
            catch (Exception)
            {

            }
        }
        async public Task GetAirLines(string access_token)
        {
            var client = new RestClient($"{url}");
            var request = new RestRequest($"/api/data/v9.2.23022.00178/mesco_airlines", Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Authorization", $"Bearer {access_token}");
            try
            {
                var response = await client.ExecuteGetTaskAsync(request);
                var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                var results = Data.SelectToken("value");
                List<string> ExistingRecords = new List<string>();
                ExistingRecords = objCCustomizedDBCall.ExecuteQuery_Array($"SELECT crmCode From AirLines");   //check if customer already existed
                foreach (var AirLine in results)
                {
                    string crmCode = (string)AirLine["mesco_airlineid"];
                    string Code = (string)AirLine["mesco_iatadesignatorcode"];
                    string Name = (string)AirLine["mesco_name"];
                    if (!ExistingRecords.Contains(AirLine["mesco_airlineid"].ToString()))
                    {
                        objCCustomizedDBCall.ExecuteQuery($"insert into AirLines(name,Code,crmCode) values(N'{Name.Replace("'", "''")}', N'{Code}',N'{crmCode}')");
                    }
                    else
                    {
                        objCCustomizedDBCall.CallStringFunction($"Update Airlines SET name = N'{Name.Replace("'", "''")}' WHERE crmCode = N'{crmCode}'");
                    }
                }
            }
            catch (Exception)
            {

            }
        }
        async public Task GetShippingLines(string access_token)
        {
            var client = new RestClient($"{url}");
            var request = new RestRequest($"/api/data/v9.2.23022.00178/mesco_shippinglines", Method.GET);
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Authorization", $"Bearer {access_token}");
            try
            {
                var response = await client.ExecuteGetTaskAsync(request);
                var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                var results = Data.SelectToken("value");
                List<string> ExistingRecords = new List<string>();
                ExistingRecords = objCCustomizedDBCall.ExecuteQuery_Array($"SELECT crmCode From ShippingLines");
                foreach (var ShippingLine in results)
                {
                    string crmCode = (string)ShippingLine["mesco_shippinglineid"];
                    string Name = (string)ShippingLine["mesco_name"];
                    if (!ExistingRecords.Contains(ShippingLine["mesco_shippinglineid"].ToString()))
                    {
                        objCCustomizedDBCall.ExecuteQuery($"insert into ShippingLines(name,Code,crmCode,IsInactive,IsConsolidatedInvoice) values(N'{Name.Replace("'", "''")}', N'{crmCode.Substring(0, 10)}',N'{crmCode}',0,0)");
                    }
                    else
                    {
                        objCCustomizedDBCall.CallStringFunction($"Update ShippingLines SET name = N'{Name.Replace("'", "''")}' WHERE crmCode = N'{crmCode}'");
                    }
                }
            }
            catch (Exception)
            {
                
            }
        }
        //async public Task GetSeaPorts(string access_token)
        //{
        //    var client = new RestClient($"{url}");
        //    var request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_addresses?$filter=xollsp_type eq 300000002 and xollsp_addressspecification eq 300000000 and _owningbusinessunit_value eq '" + CorporateBusinessUnitID + "'&$select=xollsp_name,xollsp_unctadcode&$expand=xollsp_countryId($select=xollsp_code,xollsp_name)", Method.GET);
        //    request.AddHeader("Accept", "application/json");
        //    request.AddHeader("Authorization", $"Bearer {access_token}");
        //    try
        //    {
        //        var response = await client.ExecuteGetTaskAsync(request);
        //        var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
        //        var results = Data.SelectToken("value");
        //        List<string> ExistingRecords = new List<string>();
        //        ExistingRecords = objCCustomizedDBCall.ExecuteQuery_Array($"select Code from Ports");
        //        foreach (var Port in results)
        //        {
        //            if (!ExistingRecords.Select(p => p.ToUpper().Trim()).Contains(Port["xollsp_unctadcode"].ToString().ToUpper().Trim()))
        //            {
        //                var CountryCrmRecord = new crmCountry()
        //                {
        //                    xollsp_countryid = Port["xollsp_countryId"]["xollsp_countryid"].ToString(),
        //                    xollsp_name = Port["xollsp_countryId"]["xollsp_name"].ToString(),
        //                    xollsp_code = Port["xollsp_countryId"]["xollsp_code"].ToString(),
        //                };
        //                var CountryID = await GeTForeignKey<crmCountry>(CountryCrmRecord, "Countries");

        //                //Insert into Ports
        //                var PortName = (string)Port["xollsp_name"];
        //                objCCustomizedDBCall.ExecuteQuery($"insert into Ports(Name,Code,CountryID,IsInactive,IsPort,IsAir,IsOcean,IsInland,IsAddedManually,IsFactories) values(N'{PortName.Replace("'", "''")}', N'{(string)Port["xollsp_unctadcode"]}',{CountryID},0,1,0,1,0,0,0)");
        //                Console.WriteLine($"sea port {(string)Port["xollsp_name"]} Inserted Successfully");
        //            }
        //        }
        //        Console.WriteLine("Sea ports are updated Successfully");
        //        Console.WriteLine("----------------------------------------------------------");
        //    }
        //    catch (Exception)
        //    {

        //    }
        //}
        //async public Task GetAirPorts(string access_token)
        //{
        //    var client = new RestClient($"{url}");
        //    var request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_addresses?$filter=xollsp_type eq 300000002 and xollsp_addressspecification eq 300000001 and _owningbusinessunit_value eq '" + CorporateBusinessUnitID + "'&$select=xollsp_name,xollsp_iatacode&$expand=xollsp_countryId($select=xollsp_code,xollsp_name)", Method.GET);
        //    request.AddHeader("Accept", "application/json");
        //    request.AddHeader("Authorization", $"Bearer {access_token}");
        //    try
        //    {
        //        var response = await client.ExecuteGetTaskAsync(request);
        //        var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
        //        var results = Data.SelectToken("value");
        //        List<string> ExistingRecords = new List<string>();
        //        ExistingRecords = objCCustomizedDBCall.ExecuteQuery_Array($"select Code from Ports");
        //        foreach (var Port in results)
        //        {
        //            if (!ExistingRecords.Select(p => p.ToUpper().Trim()).Contains(Port["xollsp_iatacode"].ToString().ToUpper().Trim()))
        //            {
        //                var CountryCrmRecord = new crmCountry()
        //                {
        //                    xollsp_countryid = Port["xollsp_countryId"]["xollsp_countryid"].ToString(),
        //                    xollsp_name = Port["xollsp_countryId"]["xollsp_name"].ToString(),
        //                    xollsp_code = Port["xollsp_countryId"]["xollsp_code"].ToString(),
        //                };
        //                var CountryID = await GeTForeignKey<crmCountry>(CountryCrmRecord, "Countries");

        //                var PortName = (string)Port["xollsp_name"];
        //                objCCustomizedDBCall.ExecuteQuery($"insert into Ports(Name,Code,CountryID,IsInactive,IsPort,IsAir,IsOcean,IsInland,IsAddedManually,IsFactories) values(N'{PortName.Replace("'", "''")}', N'{(string)Port["xollsp_iatacode"]}',{CountryID},0,1,1,0,0,0,0)");
        //                Console.WriteLine($"Air port {(string)Port["xollsp_name"]} Inserted Successfully");
        //            }
        //        }
        //        Console.WriteLine("Air ports are updated Successfully");
        //        Console.WriteLine("----------------------------------------------------------");
        //    }
        //    catch (Exception)
        //    {

        //    }
        //}
        #endregion
        async private Task<int> GeTForeignKey<T>(T crmRecord, string ForwardingTableName)
        {
            var checkException = new Exception();
            int ForwardingID = 0;
            try
            {
                switch (ForwardingTableName)
                {

                    case "Customers":
                        {
                            CCustomers objCCustomers = new CCustomers();
                            CVarCustomers objCVarCustomers = new CVarCustomers();
                            List<CVarCustomers> lstCVarCustomers = new List<CVarCustomers>();
                            objCVarCustomers.Name = (string)typeof(T).GetProperty("name").GetValue(crmRecord);
                            objCVarCustomers.LocalName = (string)typeof(T).GetProperty("mesco_arabicname").GetValue(crmRecord);
                            objCVarCustomers.VATNumber = (string)typeof(T).GetProperty("xollsp_vatnumber").GetValue(crmRecord);
                            objCVarCustomers.crmCode = (string)typeof(T).GetProperty("accountid").GetValue(crmRecord);
                            objCVarCustomers.IsInternalCustomer = true;
                            objCVarCustomers.ManagerRoleID = 5;
                            objCVarCustomers.AdministratorRoleID = 1;
                            objCVarCustomers.IsConsignee = true;
                            objCVarCustomers.IsShipper = true;
                            objCVarCustomers.PaymentTermID = 6;
                            objCVarCustomers.CreationDate = DateTime.Now;
                            objCVarCustomers.CreatorUserID = 4;
                            objCVarCustomers.Finance365Ref = "";
                            objCVarCustomers.OwnerId = 0; 
                            objCVarCustomers.OwnersIds = "";
                            objCVarCustomers.BranchID = 0;
                            objCVarCustomers.DebitorGroupID = 0;
                            objCVarCustomers.Mobile = "0";
                            Common.Common.ReplaceNull(objCVarCustomers);
                            lstCVarCustomers.Add(objCVarCustomers);
                            checkException = objCCustomers.SaveMethod(lstCVarCustomers);
                            if (checkException != null)
                                throw new InvalidOperationException($"Error while inserting customer {objCVarCustomers.Name}");
                            objCCustomers.GetList("WHERE ID = (SELECT MAX(ID) FROM " + ForwardingTableName + ")");
                            ForwardingID = objCCustomers.lstCVarCustomers[0].ID;

                            if ((string)typeof(T).GetProperty("address1_country").GetValue(crmRecord) != ""
                                && (string)typeof(T).GetProperty("address1_city").GetValue(crmRecord) != ""
                                && (string)typeof(T).GetProperty("address1_line1").GetValue(crmRecord) != ""
                                && ForwardingID > 0)
                            {
                                string SelectedColumns = "xollsp_name,xollsp_code";
                                string FilterCondition = $"xollsp_name eq '{(string)typeof(T).GetProperty("address1_country").GetValue(crmRecord)}'";
                                var CountryCrmRecord = await GetcrmData<crmCountry>("xollsp_countries", SelectedColumns, FilterCondition);
                                SelectedColumns = "xollsp_name,xollsp_name2,xollsp_type";
                                FilterCondition = $"xollsp_name eq '{(string)typeof(T).GetProperty("address1_city").GetValue(crmRecord)}' and xollsp_type eq 300000003";
                                var CityCrmRecord = await GetcrmData<crmAddress>("xollsp_addresses", SelectedColumns, FilterCondition);
                                CAddresses objCAddresses = new CAddresses();
                                CVarAddresses objCVarAddresses = new CVarAddresses();
                                var lstCAddresses = new List<CVarAddresses>();
                                objCVarAddresses.PartnerID = ForwardingID;
                                objCVarAddresses.PartnerTypeID = 1;
                                objCVarAddresses.AddressTypeID = 1;
                                objCVarAddresses.CountryID = await GeTForeignKey<crmCountry>(CountryCrmRecord[0], "Countries");
                                objCVarAddresses.CityID = await GeTForeignKey<crmAddress>(CityCrmRecord[0], "Ports");
                                objCVarAddresses.StreetLine1 = (string)typeof(T).GetProperty("address1_line1").GetValue(crmRecord);
                                objCVarAddresses.StreetLine2 = (string)typeof(T).GetProperty("address1_line2").GetValue(crmRecord);
                                objCVarAddresses.AdditionalAddress = "0";
                                Common.Common.ReplaceNull(objCVarAddresses);
                                lstCAddresses.Add(objCVarAddresses);
                                checkException = objCAddresses.SaveMethod(lstCAddresses);
                                if (checkException != null)
                                    throw new InvalidOperationException($"Error while inserting Address for customer {objCVarCustomers.Name}");
                            }
                            break;
                        }
                    case "Countries":
                        {
                            CCountries objCCountries = new CCountries();
                            CVarCountries objCVarCountries = new CVarCountries();
                            var lstCCountries = new List<CVarCountries>();
                            objCCountries.GetList($"WHERE Name = N'{(string)typeof(T).GetProperty("xollsp_code").GetValue(crmRecord)}'");
                            if (objCCountries.lstCVarCountries.Count > 0)
                            {
                                ForwardingID = objCCountries.lstCVarCountries[0].ID;
                            }
                            else
                            {
                                objCCountries.GetList("WHERE ID = (SELECT MAX(ID) FROM Countries)");
                                objCVarCountries.Name = (string)typeof(T).GetProperty("xollsp_code").GetValue(crmRecord);
                                objCVarCountries.RegionID = 1;
                                objCVarCountries.Code = (string)typeof(T).GetProperty("xollsp_name").GetValue(crmRecord);
                                objCVarCountries.LocalName = (string)typeof(T).GetProperty("xollsp_code").GetValue(crmRecord);
                                Common.Common.ReplaceNull(objCVarCountries);
                                lstCCountries.Add(objCVarCountries);
                                objCCountries.SaveMethod(lstCCountries);
                                objCCountries.GetList("WHERE ID = (SELECT MAX(ID) FROM Countries)");
                                CountryID = objCCountries.lstCVarCountries[0].ID;
                                ForwardingID = CountryID;
                            }
                            break;
                        }
                    case "Ports":
                        {
                            CPorts objCPorts = new CPorts();
                            CVarPorts objCVarPorts = new CVarPorts();
                            var lstCPorts = new List<CVarPorts>();
                            objCPorts.GetList($"WHERE Name = N'{(string)typeof(T).GetProperty("xollsp_name").GetValue(crmRecord)}'");
                            if (objCPorts.lstCVarPorts.Count > 0)
                            {
                                ForwardingID = objCPorts.lstCVarPorts[0].ID;
                            }
                            else
                            {
                                objCPorts.GetList("WHERE ID = (SELECT MAX(ID) FROM Ports)");
                                objCVarPorts.Name = (string)typeof(T).GetProperty("xollsp_name").GetValue(crmRecord);
                                objCVarPorts.LocalName = (string)typeof(T).GetProperty("xollsp_name2").GetValue(crmRecord);
                                objCVarPorts.CountryID = CountryID;
                                objCVarPorts.Code = objCPorts.lstCVarPorts[0].Code + 1;
                                if ((int)typeof(T).GetProperty("xollsp_addressspecification").GetValue(crmRecord) == 300000001
                                    && (int)typeof(T).GetProperty("xollsp_type").GetValue(crmRecord) == 300000002)
                                {
                                    objCVarPorts.IsPort = true;
                                    objCVarPorts.IsAir = true;
                                }
                                else if ((int)typeof(T).GetProperty("xollsp_addressspecification").GetValue(crmRecord) == 300000000
                                    && (int)typeof(T).GetProperty("xollsp_type").GetValue(crmRecord) == 300000002)
                                {
                                    objCVarPorts.IsPort = true;
                                    objCVarPorts.IsOcean = true;
                                }
                                Common.Common.ReplaceNull(objCVarPorts);
                                lstCPorts.Add(objCVarPorts);
                                checkException = objCPorts.SaveMethod(lstCPorts);
                                if (checkException != null)
                                    throw new InvalidOperationException($"Error while inserting Address for Port/City {objCVarPorts.Name}");
                                objCPorts.GetList("WHERE ID = (SELECT MAX(ID) FROM Ports)");
                                ForwardingID = objCPorts.lstCVarPorts[0].ID;
                            }
                            break;
                        }
                    case "Agents":
                        {
                            CAgents objCAgents = new CAgents();
                            CVarAgents objCVarAgents = new CVarAgents();
                            List<CVarAgents> lstCVarAgents = new List<CVarAgents>();
                            objCVarAgents.Name = (string)typeof(T).GetProperty("mesco_name").GetValue(crmRecord);
                            objCVarAgents.LocalName = (string)typeof(T).GetProperty("mesco_name").GetValue(crmRecord);
                            objCVarAgents.crmCode = (string)typeof(T).GetProperty("mesco_agentid").GetValue(crmRecord);
                            objCVarAgents.BranchID = 0;
                            objCVarAgents.PaymentTermID = 6;
                            objCVarAgents.SupplierID = 0;
                            objCVarAgents.SalesmanID = 0;
                            Common.Common.ReplaceNull(objCVarAgents);
                            lstCVarAgents.Add(objCVarAgents);
                            checkException = objCAgents.SaveMethod(lstCVarAgents);
                            if (checkException != null)
                                throw new InvalidOperationException($"Error while inserting Agent {objCVarAgents.Name}");
                            objCAgents.GetList("WHERE ID = (SELECT MAX(ID) FROM " + ForwardingTableName + ")");
                            ForwardingID = objCAgents.lstCVarAgents[0].ID;
                            break;
                        }
                    case "ShippingLines":
                        {
                            CShippingLines objCShippingLines = new CShippingLines();
                            CVarShippingLines objCVarShippingLines = new CVarShippingLines();
                            List<CVarShippingLines> lstCVarShippingLines = new List<CVarShippingLines>();
                            objCVarShippingLines.Name = (string)typeof(T).GetProperty("mesco_name").GetValue(crmRecord);
                            objCVarShippingLines.LocalName = (string)typeof(T).GetProperty("mesco_name").GetValue(crmRecord);
                            objCVarShippingLines.crmCode = (string)typeof(T).GetProperty("mesco_shippinglineid").GetValue(crmRecord);
                            objCVarShippingLines.Code = ((string)typeof(T).GetProperty("mesco_shippinglineid").GetValue(crmRecord)).Substring(0, 10);
                            objCVarShippingLines.BranchID = 0;
                            objCVarShippingLines.SupplierID = 0;
                            objCVarShippingLines.SalesmanID = 0;
                            Common.Common.ReplaceNull(objCVarShippingLines);
                            lstCVarShippingLines.Add(objCVarShippingLines);
                            checkException = objCShippingLines.SaveMethod(lstCVarShippingLines);
                            if (checkException != null)
                                throw new InvalidOperationException($"Error while inserting ShippingLine {objCVarShippingLines.Name}");
                            objCShippingLines.GetList("WHERE ID = (SELECT MAX(ID) FROM " + ForwardingTableName + ")");
                            ForwardingID = objCShippingLines.lstCVarShippingLines[0].ID;
                            break;
                        }
                    case "AirLines":
                        {
                            CAirlines objCAirlines = new CAirlines();
                            CVarAirlines objCVarAirlines = new CVarAirlines();
                            List<CVarAirlines> lstCVarAirlines = new List<CVarAirlines>();
                            objCVarAirlines.Name = (string)typeof(T).GetProperty("mesco_name").GetValue(crmRecord);
                            objCVarAirlines.LocalName = (string)typeof(T).GetProperty("mesco_name").GetValue(crmRecord);
                            objCVarAirlines.crmCode = (string)typeof(T).GetProperty("mesco_airlineid").GetValue(crmRecord);
                            objCVarAirlines.Code = ((string)typeof(T).GetProperty("mesco_airlineid").GetValue(crmRecord)).Substring(0, 10);
                            Common.Common.ReplaceNull(objCVarAirlines);
                            lstCVarAirlines.Add(objCVarAirlines);
                            checkException = objCAirlines.SaveMethod(lstCVarAirlines);
                            if (checkException != null)
                                throw new InvalidOperationException($"Error while inserting AirLine {objCVarAirlines.Name}");
                            objCAirlines.GetList("WHERE ID = (SELECT MAX(ID) FROM " + ForwardingTableName + ")");
                            ForwardingID = objCAirlines.lstCVarAirlines[0].ID;
                            break;
                        }
                    case "Salesmen":
                        {
                            CSalesmen objCSalesmen = new CSalesmen();
                            CVarSalesmen objCVarSalesmen = new CVarSalesmen();
                            List<CVarSalesmen> lstCVarSalesmen = new List<CVarSalesmen>();
                            objCVarSalesmen.NAME = (string)typeof(T).GetProperty("fullname").GetValue(crmRecord);
                            objCVarSalesmen.LocalName = (string)typeof(T).GetProperty("fullname").GetValue(crmRecord);
                            //objCVarSalesmen.Code = ((string)typeof(T).GetProperty("userpuid").GetValue(crmRecord)).Substring(0, 10);
                            objCVarSalesmen.crmCode = ((string)typeof(T).GetProperty("systemuserid").GetValue(crmRecord));
                            //objCVarSalesmen.crmCode = ((string)typeof(T).GetProperty("systemuserid").GetValue(crmRecord)).Substring(0, 10);
                            Common.Common.ReplaceNull(objCVarSalesmen);
                            lstCVarSalesmen.Add(objCVarSalesmen);
                            checkException = objCSalesmen.SaveMethod(lstCVarSalesmen);
                            if (checkException != null)
                                throw new InvalidOperationException($"Error while inserting salesman {objCVarSalesmen.NAME}");
                            objCSalesmen.GetList("WHERE ID = (SELECT MAX(ID) FROM " + ForwardingTableName + ")");
                            ForwardingID = objCSalesmen.lstCVarSalesmen[0].ID;
                            break;
                        }
                    case "Incoterms":
                        {
                            CIncoterms objCIncoterms = new CIncoterms();
                            CVarIncoterms objCVarIncoterms = new CVarIncoterms();
                            List<CVarIncoterms> lstCVarIncoterms = new List<CVarIncoterms>();
                            objCVarIncoterms.Code = (string)typeof(T).GetProperty("xollsp_name").GetValue(crmRecord);
                            objCVarIncoterms.Name = (string)typeof(T).GetProperty("xollsp_description").GetValue(crmRecord);
                            objCVarIncoterms.LocalName = objCVarIncoterms.Name;
                            Common.Common.ReplaceNull(objCVarIncoterms);
                            lstCVarIncoterms.Add(objCVarIncoterms);
                            checkException = objCIncoterms.SaveMethod(lstCVarIncoterms);
                            if (checkException != null)
                                throw new InvalidOperationException($"Error while inserting Incoterm {objCVarIncoterms.Name}");
                            objCIncoterms.GetList("WHERE ID = (SELECT MAX(ID) FROM " + ForwardingTableName + ")");
                            ForwardingID = objCIncoterms.lstCVarIncoterms[0].ID;
                            break;
                        }
                    case "ContainerTypes":
                        {
                            CContainerTypes objCContainerTypes = new CContainerTypes();
                            CVarContainerTypes objCVarContainerTypes = new CVarContainerTypes();
                            List<CVarContainerTypes> lstCVarContainerTypes = new List<CVarContainerTypes>();
                            objCVarContainerTypes.Code = ((string)typeof(T).GetProperty("xollsp_name").GetValue(crmRecord)).ToUpper();
                            objCVarContainerTypes.Name = objCVarContainerTypes.Code;
                            objCVarContainerTypes.LocalName = objCVarContainerTypes.Code;
                            objCVarContainerTypes.CTypeID = 1;
                            objCVarContainerTypes.CSizeID = 1;
                            Common.Common.ReplaceNull(objCVarContainerTypes);
                            lstCVarContainerTypes.Add(objCVarContainerTypes);
                            checkException = objCContainerTypes.SaveMethod(lstCVarContainerTypes);
                            if (checkException != null)
                                throw new InvalidOperationException($"Error while inserting ContainerType {objCVarContainerTypes.Name}");
                            objCContainerTypes.GetList("WHERE ID = (SELECT MAX(ID) FROM " + ForwardingTableName + ")");
                            ForwardingID = objCContainerTypes.lstCVarContainerTypes[0].ID;
                            break;
                        }
                    case "PackageTypes":
                        {
                            CPackageTypes objCPackageTypes = new CPackageTypes();
                            CVarPackageTypes objCVarPackageTypes = new CVarPackageTypes();
                            List<CVarPackageTypes> lstCVarPackageTypes = new List<CVarPackageTypes>();
                            objCVarPackageTypes.Code = ((string)typeof(T).GetProperty("xollsp_name").GetValue(crmRecord)).ToUpper();
                            objCVarPackageTypes.Name = objCVarPackageTypes.Code;
                            objCVarPackageTypes.LocalName = objCVarPackageTypes.Code;
                            objCVarPackageTypes.PrintAs = objCVarPackageTypes.Code;
                            objCVarPackageTypes.IsOcean = true;
                            objCVarPackageTypes.IsAir = true;
                            objCVarPackageTypes.IsInland = true;
                            Common.Common.ReplaceNull(objCVarPackageTypes);
                            lstCVarPackageTypes.Add(objCVarPackageTypes);
                            checkException = objCPackageTypes.SaveMethod(lstCVarPackageTypes);
                            if (checkException != null)
                                throw new InvalidOperationException($"Error while inserting PackageType {objCVarPackageTypes.Name}");
                            objCPackageTypes.GetList("WHERE ID = (SELECT MAX(ID) FROM " + ForwardingTableName + ")");
                            ForwardingID = objCPackageTypes.lstCVarPackageTypes[0].ID;
                            break;
                        }
                    case "Currencies":
                        {
                            CCurrencies objCCurrencies = new CCurrencies();
                            CVarCurrencies objCVarCurrencies = new CVarCurrencies();
                            List<CVarCurrencies> lstCVarCurrencies = new List<CVarCurrencies>();
                            objCVarCurrencies.Code = (string)typeof(T).GetProperty("isocurrencycode").GetValue(crmRecord);
                            objCVarCurrencies.Name = (string)typeof(T).GetProperty("currencyname").GetValue(crmRecord);
                            objCVarCurrencies.LocalName = objCVarCurrencies.Name;
                            Common.Common.ReplaceNull(objCVarCurrencies);
                            lstCVarCurrencies.Add(objCVarCurrencies);
                            checkException = objCCurrencies.SaveMethod(lstCVarCurrencies);
                            if (checkException != null)
                                throw new InvalidOperationException($"Error while inserting Currency {objCVarCurrencies.Name}");
                            objCCurrencies.GetList("WHERE ID = (SELECT MAX(ID) FROM " + ForwardingTableName + ")");
                            ForwardingID = objCCurrencies.lstCVarCurrencies[0].ID;
                            break;
                        }
                }
            }
            catch (Exception Ex)
            {
                Console.WriteLine(Ex.Message);
                return 0;
            }

            return ForwardingID;
        }
        public int GetMasterData(string pMasterDataName, string pcrmID)
        {
            if (pcrmID == "")
                return 0;
            int ForwardingID = 0;
            var ExistingID = new List<string>();
            string access_token = Auth();
            var client = new RestClient($"{url}");
            var request = new RestRequest();
            request.AddHeader("Accept", "application/json");
            client.Authenticator = new JwtAuthenticator(access_token);
            switch (pMasterDataName)
            {
                #region Salesman
                case "Salesman":
                    ExistingID = objCCustomizedDBCall.ExecuteQuery_Array($"select ForwardingID from crmIDs where crmID = '{pcrmID}' AND ForwardingTableName = 'Salesmen'");
                    if (ExistingID.Count == 0)
                    {
                        request = new RestRequest($"/api/data/v9.2.23022.00178/systemusers({pcrmID})", Method.GET);
                        try
                        {
                            var response = client.Execute(request);
                            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                            objCCustomizedDBCall.CallStringFunction($"insert into Salesmen(Code,Name,LocalName) values(N'{Data["userpuid"]}','{Data["fullname"]}','{Data["fullname"]}')");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Salesmen")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('systemusers','Salesmen','{Data["systemuserid"]}',{ForwardingID})");
                        }
                        catch (Exception error)
                        {
                            Console.WriteLine(error.Message);
                        }
                    }
                    else
                    {
                        ForwardingID = int.Parse(ExistingID[0].ToString());
                    }
                    break;
                #endregion

                #region Customer
                case "Customer":
                    ExistingID = objCCustomizedDBCall.ExecuteQuery_Array($"select ForwardingID from vwcrmCustomers where crmID = '{pcrmID}'");
                    if (ExistingID.Count == 0)
                    {
                        request = new RestRequest($"/api/data/v9.2.23022.00178/accounts({pcrmID})", Method.GET);
                        try
                        {
                            var response = client.Execute(request);
                            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                            objCCustomizedDBCall.CallStringFunction($"insert into customers(name,LocalName,VATNumber,notes,IsInternalCustomer,ManagerRoleID,AdministratorRoleID,IsConsignee,IsShipper,PaymentTermID,CreationDate) values(N'{Data["name"]}', N'{(Data["mesco_arabicname"].ToString() == "" ? Data["name"] : Data["mesco_arabicname"])}','{(string)Data["xollsp_vatnumber"]}','{(string)Data["accountid"]}', 1, 5, 1, 1, 1,6,GETDATE())");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Customers")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('accounts','Customers','{Data["accountid"]}',{ForwardingID})");
                        }
                        catch (Exception error)
                        {
                            Console.WriteLine(error.Message);
                        }
                    }
                    else
                    {
                        ForwardingID = int.Parse(ExistingID[0].ToString());
                    }
                    break;
                #endregion

                #region Agent
                case "Agent":
                    ExistingID = objCCustomizedDBCall.ExecuteQuery_Array($"select ForwardingID from crmIDs where crmID = '{pcrmID}' AND ForwardingTableName = 'Agents'");
                    if (ExistingID.Count == 0)
                    {
                        request = new RestRequest($"/api/data/v9.2.23022.00178/mesco_agents({pcrmID})", Method.GET);
                        try
                        {
                            var response = client.Execute(request);
                            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                            objCCustomizedDBCall.CallStringFunction($"insert into Agents(Name,LocalName,crmCode,IsInactive,IsConsolidatedInvoice,IsDeleted) values(N'{(string)Data["mesco_name"]}', N'{(string)Data["mesco_name"]}',N'{(string)Data["mesco_agentid"]}',0,0,0)");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Agents")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('mesco_agents','Agents','{Data["mesco_agentid"]}',{ForwardingID})");
                        }
                        catch (Exception error)
                        {
                            Console.WriteLine(error.Message);
                        }
                    }
                    else
                    {
                        ForwardingID = int.Parse(ExistingID[0].ToString());
                    }
                    break;
                #endregion

                #region Incoterm
                case "Incoterm":
                    request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_incoterms({pcrmID})", Method.GET);
                    try
                    {
                        var response = client.Execute(request);
                        var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                        var ExistingCode = objCCustomizedDBCall.ExecuteQuery_Array($"select Code from Incoterms");
                        if (!ExistingCode.Contains(Data["xollsp_name"].ToString()))
                        {
                            objCCustomizedDBCall.CallStringFunction($"insert into Incoterms(code,name,LocalName) values('{Data["xollsp_name"]}','{Data["xollsp_name"]} - {Data["xollsp_description"]}','{Data["xollsp_name"]} - {Data["xollsp_description"]}')");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Incoterms")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('xollsp_incoterms','Incoterms','{Data["xollsp_incotermid"]}',{ForwardingID})");
                        }
                        else
                        {
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select ID from Incoterms where Code = '{Data["xollsp_name"]}'")[0]);
                        }

                    }
                    catch (Exception error)
                    {
                        Console.WriteLine(error.Message);
                    }

                    break;
                #endregion

                #region Commodity
                case "Commodity":
                    ExistingID = objCCustomizedDBCall.ExecuteQuery_Array($"select ID from vwcrmCommodities where crmID = '{pcrmID}'");
                    if (ExistingID.Count == 0)
                    {
                        request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_commoditygroups({pcrmID})", Method.GET);
                        try
                        {
                            var response = client.Execute(request);
                            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                            objCCustomizedDBCall.CallStringFunction($"insert into Commodities(Name,LocalName) values('{Data["xollsp_name"]}','{Data["xollsp_name"]}')");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Commodities")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('xollsp_commoditygroups','Commodities','{Data["xollsp_commoditygroupid"]}',{ForwardingID})");
                        }
                        catch (Exception error)
                        {
                            Console.WriteLine(error.Message);
                        }
                    }
                    else
                    {
                        ForwardingID = int.Parse(ExistingID[0].ToString());
                    }
                    break;
                #endregion

                #region Port
                case "Port":
                    request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_addresses({pcrmID})", Method.GET);
                    ExistingID = objCCustomizedDBCall.ExecuteQuery_Array($"select ID from vwcrmPorts where crmID = '{pcrmID}'");
                    var Code = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Ports")[0]);
                    if (ExistingID.Count == 0)
                    {

                        try
                        {
                            var response = client.Execute(request);
                            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                            //To keep unique code as dynamics CRM doesn't have a port code                  
                            if (Data["_xollsp_countryid_value"].ToString() == "")
                                objCCustomizedDBCall.CallStringFunction($"insert into ports(name,code,IsPort) values('{Data["xollsp_name"].ToString().ToUpper()}','{++Code}crm',1)");
                            else
                            {
                                int CountryID = GetMasterData("Country", pcrmID);
                                objCCustomizedDBCall.CallStringFunction($"insert into ports(name,code,IsPort,CountryID) values('{Data["xollsp_name"].ToString().ToUpper()}','{++Code}crm',1,{CountryID})");
                            }
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Ports")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('xollsp_addresses','Ports','{Data["xollsp_addressid"]}',{ForwardingID})");
                        }
                        catch (Exception error)
                        {
                            Console.WriteLine(error.Message);
                        }
                    }
                    else
                    {
                        ForwardingID = int.Parse(ExistingID[0].ToString());
                    }
                    break;
                #endregion

                #region Country
                case "Country":
                    request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_addresses({pcrmID})", Method.GET);
                    Code = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Countries")[0]);
                    try
                    {
                        var response = client.Execute(request);
                        var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                        pcrmID = Data["_xollsp_countryid_value"].ToString();
                    }
                    catch (Exception error)
                    {
                        Console.WriteLine(error.Message);
                    }
                    request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_countries({pcrmID})", Method.GET);
                    try
                    {
                        var response = client.Execute(request);
                        var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                        var ExistingName = objCCustomizedDBCall.ExecuteQuery_Array($"select name from Countries");
                        if (!ExistingName.Contains(Data["xollsp_name"].ToString().ToUpper()))
                        {
                            objCCustomizedDBCall.CallStringFunction($"insert into countries(name,RegionID,Code) values('{Data["xollsp_name"].ToString().ToUpper()}',1,'{++Code}')");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Countries")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('xollsp_countries','Countries','{Data["xollsp_countryid"]}',{ForwardingID})");
                        }
                        else
                        {
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select ID from Countries where Name = '{Data["xollsp_name"].ToString().ToUpper()}'")[0]);
                        }

                    }
                    catch (Exception error)
                    {
                        Console.WriteLine(error.Message);
                    }

                    break;
                #endregion

                #region LogisticService
                case "LogisticService":
                    ExistingID = objCCustomizedDBCall.ExecuteQuery_Array($"select ID from vwcrmMoveTypes where crmID = '{pcrmID}'");
                    if (ExistingID.Count == 0)
                    {
                        request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_servicedefinitions({pcrmID})", Method.GET);
                        try
                        {
                            var response = client.Execute(request);
                            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                            objCCustomizedDBCall.CallStringFunction($"insert into MoveTypes(Name,LocalName,IsWarehousing,IsOcean,IsAir,IsInland,IsCustomsClearance) values('{Data["xollsp_name"]}','{Data["xollsp_name"]}',0,1,1,1,0)");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from MoveTypes")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('xollsp_servicedefinitions','MoveTypes','{Data["xollsp_servicedefinitionid"]}',{ForwardingID})");
                        }
                        catch (Exception error)
                        {
                            Console.WriteLine(error.Message);
                        }
                    }
                    else
                    {
                        ForwardingID = int.Parse(ExistingID[0].ToString());
                    }
                    break;
                #endregion

                #region Currency
                case "Currency":
                    request = new RestRequest($"/api/data/v9.2.23022.00178/transactioncurrencies({pcrmID})", Method.GET);
                    try
                    {
                        var response = client.Execute(request);
                        var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                        var ExistingCode = objCCustomizedDBCall.ExecuteQuery_Array($"select Code from Currencies");
                        if (!ExistingCode.Contains(Data["isocurrencycode"].ToString()))
                        {
                            objCCustomizedDBCall.CallStringFunction($"insert into Currencies(Code,Name,LocalName) values('{Data["isocurrencycode"]}','{Data["currencyname"]}','{Data["currencyname"]}')");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Currencies")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('transactioncurrencies','Currencies','{Data["transactioncurrencyid"]}',{ForwardingID})");


                        }
                        else
                        {
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select ID from Currencies where Code = '{Data["isocurrencycode"]}'")[0]);
                        }

                    }
                    catch (Exception error)
                    {
                        Console.WriteLine(error.Message);
                    }
                    break;
                #endregion

                #region ChargeType
                case "ChargeType":
                    request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_servicedefinitions({pcrmID})", Method.GET);
                    try
                    {
                        var response = client.Execute(request);
                        var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                        var ExistingCode = objCCustomizedDBCall.ExecuteQuery_Array($"select Name from ChargeTypes");
                        if (!ExistingCode.Contains(Data["xollsp_name"].ToString()))
                        {
                            objCCustomizedDBCall.CallStringFunction($"insert into ChargeTypes(Code,Name,LocalName,MeasurementID,IsOperationChargeType,IsTank) values('{Data["xollsp_name"]}','{Data["xollsp_name"]}','{Data["xollsp_name"]}',3,1,0)");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from ChargeTypes")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('xollsp_servicedefinitions','ChargeTypes','{Data["xollsp_servicedefinitionid"]}',{ForwardingID})");
                        }
                        else
                        {
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select ID from ChargeTypes where Name = N'{Data["xollsp_name"]}'")[0]);
                        }

                    }
                    catch (Exception error)
                    {
                        Console.WriteLine(error.Message);
                    }
                    break;
                #endregion

                #region Package Type
                case "PackageType":
                    request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_unitsofmeasures({pcrmID})", Method.GET);
                    try
                    {
                        var response = client.Execute(request);
                        var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                        var ExistingCode = objCCustomizedDBCall.ExecuteQuery_Array($"select Name from PackageTypes");
                        if (!ExistingCode.Contains(Data["xollsp_name"].ToString().ToUpper()))
                        {
                            var PackageType = Data["xollsp_name"].ToString().ToUpper();
                            objCCustomizedDBCall.CallStringFunction($"insert into PackageTypes(Code,Name,LocalName,PrintAs,IsOcean,IsAir,IsInland) Values('{PackageType}','{PackageType}','{PackageType}','{PackageType}',1,1,1)");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from PackageTypes")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('xollsp_unitsofmeasures','PackageTypes','{Data["xollsp_unitsofmeasureid"]}',{ForwardingID})");
                        }
                        else
                        {
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select ID from PackageTypes where Name = '{Data["xollsp_name"].ToString().ToUpper()}'")[0]);
                        }

                    }
                    catch (Exception error)
                    {
                        Console.WriteLine(error.Message);
                    }
                    break;
                #endregion

                #region Container Type
                case "ContainerType":
                    request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_unitsofmeasures({pcrmID})", Method.GET);
                    try
                    {
                        var response = client.Execute(request);
                        var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                        var ExistingCode = objCCustomizedDBCall.ExecuteQuery_Array($"select Name from ContainerTypes");
                        if (!ExistingCode.Contains(Data["xollsp_name"].ToString().ToUpper()))
                        {
                            var ContainerType = Data["xollsp_name"].ToString().ToUpper();
                            objCCustomizedDBCall.CallStringFunction($"insert into ContainerTypes(Code,Name,LocalName,CTypeID,CSizeID,IsAddedManually,IsInactive) Values('{ContainerType}','{ContainerType}','{ContainerType}',1,1,0,0)");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from ContainerTypes")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('xollsp_unitsofmeasures','ContainerTypes','{Data["xollsp_unitsofmeasureid"]}',{ForwardingID})");
                        }
                        else
                        {
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select ID from ContainerTypes where Name = '{Data["xollsp_name"].ToString().ToUpper()}'")[0]);
                        }

                    }
                    catch (Exception error)
                    {
                        Console.WriteLine(error.Message);
                    }
                    break;
                #endregion

                #region ShippingLine
                case "ShippingLine":
                    ExistingID = objCCustomizedDBCall.ExecuteQuery_Array($"select ForwardingID from crmIDs where crmID = '{pcrmID}' AND ForwardingTableName = 'ShippingLines'");
                    if (ExistingID.Count == 0)
                    {
                        request = new RestRequest($"/api/data/v9.2.23022.00178/mesco_shippinglines({pcrmID})", Method.GET);
                        try
                        {
                            var response = client.Execute(request);
                            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                            objCCustomizedDBCall.CallStringFunction($"insert into ShippingLines(name,Code,crmCode,IsInactive,IsConsolidatedInvoice) values(N'{Data["mesco_name"]}', N'{Data["mesco_shippinglineid"].ToString().Substring(0, 10)}',N'{Data["mesco_shippinglineid"]}',0,0)");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from ShippingLines")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('mesco_shippinglines','ShippingLines','{Data["mesco_shippinglineid"]}',{ForwardingID})");
                        }
                        catch (Exception error)
                        {
                            Console.WriteLine(error.Message);
                        }
                    }
                    else
                    {
                        ForwardingID = int.Parse(ExistingID[0].ToString());
                    }
                    break;
                #endregion

                #region AirLine
                case "AirLine":
                    ExistingID = objCCustomizedDBCall.ExecuteQuery_Array($"select ForwardingID from crmIDs where crmID = '{pcrmID}' AND ForwardingTableName = 'AirLines'");
                    if (ExistingID.Count == 0)
                    {
                        request = new RestRequest($"/api/data/v9.2.23022.00178/mesco_airlines({pcrmID})", Method.GET);
                        try
                        {
                            var response = client.Execute(request);
                            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                            objCCustomizedDBCall.CallStringFunction($"insert into AirLines(Code,Name) Values('{Data["mesco_airlineid"].ToString().Substring(0, 10)}','{Data["mesco_name"]}')");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from AirLines")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('mesco_airlines','AirLines','{Data["mesco_airlineid"]}',{ForwardingID})");
                        }
                        catch (Exception error)
                        {
                            Console.WriteLine(error.Message);
                        }
                    }
                    else
                    {
                        ForwardingID = int.Parse(ExistingID[0].ToString());
                    }
                    break;
                #endregion

                #region Trucker
                case "Trucker":
                    ExistingID = objCCustomizedDBCall.ExecuteQuery_Array($"select ID from vwcrmTruckers where crmID = '{pcrmID}'");
                    if (ExistingID.Count == 0)
                    {
                        request = new RestRequest($"/api/data/v9.2.23022.00178/accounts({pcrmID})", Method.GET);
                        try
                        {
                            var response = client.Execute(request);
                            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
                            objCCustomizedDBCall.CallStringFunction($"insert into Truckers(Name) Values('{Data["name"]}')");
                            ForwardingID = int.Parse(objCCustomizedDBCall.ExecuteQuery_Array($"select MAX(ID)ID from Truckers")[0]);
                            objCCustomizedDBCall.CallStringFunction($"insert into crmIDs(crmTableName,ForwardingTableName,crmID,ForwardingID) values('accounts','Truckers','{Data["accountid"]}',{ForwardingID})");
                        }
                        catch (Exception error)
                        {
                            Console.WriteLine(error.Message);
                        }
                    }
                    else
                    {
                        ForwardingID = int.Parse(ExistingID[0].ToString());
                    }
                    break;
                    #endregion
            }
            return ForwardingID;
        }
        [HttpGet]
        public bool GetCrmUpdatesForOperation(int pOperationID)
        {
            int _rowCount = 0;
            CPayables objCPayables = new CPayables();
            CReceivables objCReceivables = new CReceivables();
            objCDefaults.GetList(" WHERE 1=1");
            BusinessUnitID = BusinessUnits[objCDefaults.lstCVarDefaults[0].UnEditableCompanyName];
            COperations objCOperations = new COperations();
            objCOperations.GetItem(pOperationID);
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            objCQuotationRoute.GetListPaging(9999, 1, $"WHERE ID IN(SELECT QuotationRouteID FROM Operations WHERE ID = {pOperationID} OR ID IN (SELECT ID FROM Operations WHERE MasterOperationID = {pOperationID}))", "ID", out _rowCount);

            if (objCQuotationRoute.lstCVarQuotationRoute.Count == 0)
                return false;

            CQuotations objCQuotations = new CQuotations();
            objCQuotations.GetListPaging(9999, 1, $"WHERE ID IN (SELECT QuotationID FROM QuotationRoute WHERE ID IN ({string.Join(",", objCQuotationRoute.lstCVarQuotationRoute.Select(q => q.ID).ToList())}))", "ID", out _rowCount);
            var QuotationsToBeUpdated = objCQuotations.lstCVarQuotations;
            QuotationsToBeUpdated.ForEach(async Quotation =>
            {
                var QuotationRouteID = objCQuotationRoute.lstCVarQuotationRoute.FirstOrDefault(q => q.Code.Substring(0, 16) == Quotation.Code.Substring(0, 16)).ID;
                var QuotationHeader = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"statuscode eq 300000008 and _owningbusinessunit_value eq '{BusinessUnitID}' and xollsp_transporttype ne 300000001 and xollsp_quotenumber eq '{Quotation.Code.Substring(0, 16)}'");
                var CostLines = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", $"_xollsp_tariffquote_value eq '{QuotationHeader[0].xollsp_tariffquoteid}'");
                var SalesLines = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", $"_xollsp_tariffquote_value eq '{QuotationHeader[0].xollsp_tariffquoteid}'");
                objCPayables.GetListPaging(9999, 1, $"WHERE OperationID = {pOperationID}", "ID", out _rowCount);
                var ExistingPayables = objCPayables.lstCVarPayables;
                objCReceivables.GetListPaging(9999, 1, $"WHERE OperationID = {pOperationID}", "ID", out _rowCount);
                var ExistingReceivables = objCReceivables.lstCVarReceivables;
                await UpdateCharges(new UpdateChargesDTO
                {
                    CostLines = CostLines,
                    SalesLines = SalesLines,
                    Operation = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations[0] : null,
                    QuotationRouteID = QuotationRouteID,
                    QuotationHeader = QuotationHeader[0],
                    ExistingPayables = ExistingPayables,
                    ExistingReceivables = ExistingReceivables
                });
            });

            return true;
        }
        [HttpGet]
        async public Task RefreshQuotations()
        {
            int _rowCount = 0;
            string ExceptionMessage = null;
            var StartTime = DateTime.Now;
            CPayables objCPayables = new CPayables();
            CReceivables objCReceivables = new CReceivables();
            objCDefaults.GetList(" WHERE 1=1");
            BusinessUnitID = BusinessUnits[objCDefaults.lstCVarDefaults[0].UnEditableCompanyName];
            var Logger = new CcrmIntegrationLog();
            //Getting StartTime of last successful integration
            Logger.GetListPaging(1, 1, "WHERE ID = (SELECT TOP 1 ID FROM crmIntegrationLog WHERE LogMessage = 'Updated Successfully' ORDER BY ID DESC)", "ID", out _rowCount);
            var LastIntegrationTime = Logger.lstCVarcrmIntegrationLog.Count > 0 ? Logger.lstCVarcrmIntegrationLog[0].StartTime : DateTime.Now.AddDays(-1);
            string LastIntegrationTimeUTC = LastIntegrationTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ");

            var crmNewQuotations = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "xollsp_quotenumber", $"createdon gt '{LastIntegrationTimeUTC}' and statuscode eq 300000008 and _owningbusinessunit_value eq '{BusinessUnitID}' and xollsp_transporttype ne 300000001");
            var crmModifiedQuotations = new List<crmQuotationHeader>();
            var crmModifiedCostLines = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", $"modifiedon gt '{LastIntegrationTimeUTC}' and xollsp_TariffQuote/statuscode eq {(int)StatusCodes.Accepted} and xollsp_TariffQuote/_owningbusinessunit_value eq '{BusinessUnitID}' and xollsp_TariffQuote/xollsp_transporttype ne 300000001&$expand=xollsp_TariffQuote($select=xollsp_quotenumber)");
            crmModifiedQuotations.AddRange(crmModifiedCostLines.Select(q => q.xollsp_TariffQuote).ToList());
            var crmModifiedSalesLines = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", $"modifiedon gt '{LastIntegrationTimeUTC}' and xollsp_TariffQuote/statuscode eq {(int)StatusCodes.Accepted} and xollsp_TariffQuote/_owningbusinessunit_value eq '{BusinessUnitID}' and xollsp_TariffQuote/xollsp_transporttype ne 300000001&$expand=xollsp_TariffQuote($select=xollsp_quotenumber)");
            crmModifiedQuotations.AddRange(crmModifiedSalesLines.Select(q => q.xollsp_TariffQuote).ToList());
            var ExistingQuotations = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,SUBSTRING(Code,0,17)Code FROM QuotationRoute", typeof(CVarQuotations)).Cast<CVarQuotations>().ToList();
            var QuotationsToBeInserted = crmNewQuotations.Where(x => !ExistingQuotations.Select(q => q.Code).Contains(x.xollsp_quotenumber)).ToList();

            //Integrate new quotations 
            QuotationsToBeInserted.ForEach(async q => await GetQuotationByQuotationNumber(q.xollsp_quotenumber));

            var QuotationsToBeUpdated = crmModifiedQuotations.Where(x => ExistingQuotations.Select(q => q.Code).Contains(x.xollsp_quotenumber)).ToList();
            //Update modified quotations
            QuotationsToBeUpdated.Distinct().ToList().ForEach(async Quotation =>
            {
                var QuotationRouteID = ExistingQuotations.FirstOrDefault(q => q.Code == Quotation.xollsp_quotenumber).ID;
                COperations objCOperations = new COperations();
                objCOperations.GetList("WHERE QuotationRouteID = " + QuotationRouteID);
                var CostLines = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", $"_xollsp_tariffquote_value eq '{Quotation.xollsp_tariffquoteid}'");
                var SalesLines = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", $"_xollsp_tariffquote_value eq '{Quotation.xollsp_tariffquoteid}'");
                objCPayables.GetListPaging(9999, 1, $"WHERE OperationID = {objCOperations.lstCVarOperations[0].ID}", "ID", out _rowCount);
                var ExistingPayables = objCPayables.lstCVarPayables;
                objCReceivables.GetListPaging(9999, 1, $"WHERE OperationID = {objCOperations.lstCVarOperations[0].ID}", "ID", out _rowCount);
                var ExistingReceivables = objCReceivables.lstCVarReceivables;
                await UpdateCharges(new UpdateChargesDTO
                {
                    CostLines = CostLines,
                    SalesLines = SalesLines,
                    Operation = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations[0] : null,
                    QuotationRouteID = QuotationRouteID,
                    QuotationHeader = Quotation,
                    ExistingPayables = ExistingPayables,
                    ExistingReceivables = ExistingReceivables
                });
            });
            IntegrationLog(StartTime, ExceptionMessage ?? "Updated Successfully");
        }
        async private Task UpdateCharges(UpdateChargesDTO UpdateChargesDTO)
        {
            CPayables objCPayables = new CPayables();
            CReceivables objCReceivables = new CReceivables();
            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            CInvoices objCInvoices = new CInvoices();
            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();

            int _RowCount = 0;
            string ExceptionMessage = null;
            var StartTime = DateTime.Now;
            bool UpdatePayables = false;
            bool UpdateReceivables = false;
            //bool UpdateQuotationCharges = false;
            bool IsHouse = false;
            var Operation = UpdateChargesDTO.Operation;
            CRoutings objCRoutings = new CRoutings();
            objCRoutings.GetListPaging(1,1,$"WHERE OperationID = {Operation.ID} AND RoutingTypeID = 30","ID",out _RowCount);
            var MainRoute = objCRoutings.lstCVarRoutings.Count > 0 ? objCRoutings.lstCVarRoutings[0] : null;

            if (Operation != null)
            {
                //Air
                if (Operation != null
                    && Operation.OperationStageID != ClosedOperationStageID
                    && Operation.TransportType == 2)
                {
                    UpdatePayables = true;
                    UpdateReceivables = true;
                }

                //FCL
                if (Operation != null
                    && Operation.OperationStageID != ClosedOperationStageID
                    && (Operation.TransportType == 1 && Operation.ShipmentType == 1))
                {
                    UpdatePayables = true;
                    UpdateReceivables = true;
                }

                //LCL
                var CalculationStartDate = Operation.DirectionType == 1 ? (new DateTime(1900, 1, 1).CompareTo(MainRoute.ExpectedArrival) > 0 ? MainRoute.ExpectedArrival : Operation.CreationDate) : (new DateTime(1900, 1, 1).CompareTo(MainRoute.ExpectedDeparture) > 0 ? MainRoute.ExpectedDeparture : Operation.CreationDate);
                var LastReceivableEditDay = new DateTime(CalculationStartDate.Year, CalculationStartDate.Month, DateTime.DaysInMonth(CalculationStartDate.Year,CalculationStartDate.Month), 23, 59, 59);
                if (Operation != null
                    && Operation.OperationStageID != ClosedOperationStageID
                    && (Operation.TransportType == 1 && (Operation.ShipmentType == 2 || Operation.ShipmentType == 5))
                    && DateTime.Now <= LastReceivableEditDay)
                {
                    UpdateReceivables = true;
                }

                var LastPayableEditDay = new DateTime(CalculationStartDate.Year, CalculationStartDate.AddMonths(1).Month, 3, 23, 59, 59);
                if (Operation != null
                    && Operation.OperationStageID != ClosedOperationStageID
                    && (Operation.TransportType == 1 && (Operation.ShipmentType == 2 || Operation.ShipmentType == 5))
                    && DateTime.Now <= LastPayableEditDay)
                {
                    UpdatePayables = true;
                }
                IsHouse = Operation.MasterOperationID != 0;
            }

            //QuotationCharges
            //if (UpdateChargesDTO.QuotationHeader.mesco_contractedrates ?? false
            //    || Operation == null)
            //    UpdateQuotationCharges = true;


            try
            {
                foreach (var CostLine in UpdateChargesDTO.CostLines)
                {
                    if (UpdateChargesDTO.ExistingPayables.Select(p => p.crmCode).ToList().Contains(CostLine.xollsp_quotecostlineid) 
                        && UpdatePayables)
                    {
                        //Update
                        var Payable = UpdateChargesDTO.ExistingPayables.FirstOrDefault(p => p.crmCode == CostLine.xollsp_quotecostlineid);
                        if (Payable != null)
                        {
                            bool IsPayableIncludedInPR = false;
                            objCA_PaymentRequestDetails.GetList($"WHERE PayableID={Payable.ID}");
                            if (objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                                IsPayableIncludedInPR = true;

                            if (!IsPayableIncludedInPR)
                            {
                                Payable.Quantity = CostLine.xollsp_quantity == null ? 1 : (decimal)CostLine.xollsp_quantity;
                                Payable.QuotationCost = CostLine.xollsp_totalamount == null ? 0 : (decimal)CostLine.xollsp_totalamount;
                                Payable.CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                                {
                                    CrmTableName = "transactioncurrencies",
                                    ForwardingTableName = "Currencies",
                                    CrmIdFieldName = "transactioncurrencyid",
                                    CrmComparisonFieldName = "isocurrencycode",
                                    CrmID = CostLine._xollsp_currency_value,
                                    ForwardingComparisonFieldName = "Code",
                                    ForwardingID = 0,
                                    SelectedColumns = "isocurrencycode,currencyname"
                                });
                                //Payable.ExchangeRate = CostLine.xollsp_exchangerate == null || CostLine.xollsp_exchangerate == 0 ? 1 : 1 / (decimal)CostLine.xollsp_exchangerate;
                                objCCurrencyDetails.GetList($"WHERE Currency_ID = {Payable.CurrencyID} AND GETDATE() BETWEEN Convert(datetime,FromDate) AND Convert(datetime,ToDate)");
                                Payable.ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1;
                            }
                        }
                    }
                    else
                    {
                        var checkIfExistedBefore = new CCustomizedDBCall();
                        string existedBefore = checkIfExistedBefore.CallStringFunction($"Select top 1 ID from CRM_Data_Audit where Type=1 AND OperationID={Operation.ID} AND crmCode='{CostLine.xollsp_quotecostlineid}'");
                        if(int.TryParse(existedBefore, out int exID))
                        {
                            if(exID > 0)
                            {
                                continue;
                            }
                        }

                        //Insert
                        objCPayables.GetList($"WHERE OperationID = {Operation.ID} AND CategoryID IS NOT NULL");
                        var DefaultCategoryID = objCPayables.lstCVarPayables.Count > 0 ? objCPayables.lstCVarPayables[0].CategoryID : 0;
                        CVarPayables objCVarPayables = new CVarPayables();
                        objCVarPayables.OperationID = Operation.ID;
                        objCVarPayables.CategoryID = DefaultCategoryID;
                        objCVarPayables.ChargeTypeID = await GetForwardingIDFromCrmID<crmServiceDefinition, CVarChargeTypes>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "xollsp_servicedefinitions",
                            ForwardingTableName = "ChargeTypes",
                            CrmIdFieldName = "xollsp_servicedefinitionid",
                            CrmComparisonFieldName = "xollsp_servicedefinitionid",
                            CrmID = CostLine._xollsp_logisticservice_value,
                            ForwardingComparisonFieldName = "crmCode",
                            ForwardingID = 0
                        });
                        objCVarPayables.MeasurementID = 3;
                        objCVarPayables.Quantity = CostLine.xollsp_quantity == null ? 1 : (decimal)CostLine.xollsp_quantity;
                        objCVarPayables.QuotationCost = CostLine.xollsp_totalamount == null ? 0 : (decimal)CostLine.xollsp_totalamount;
                        objCVarPayables.CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = CostLine._xollsp_currency_value,
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = 0,
                            SelectedColumns = "isocurrencycode,currencyname"
                        });
                        //objCVarPayables.ExchangeRate = CostLine.xollsp_exchangerate == null || CostLine.xollsp_exchangerate == 0 ? 1 : 1 / (decimal)CostLine.xollsp_exchangerate;
                        objCCurrencyDetails.GetList($"WHERE Currency_ID = {objCVarPayables.CurrencyID} AND GETDATE() BETWEEN Convert(datetime,FromDate) AND Convert(datetime,ToDate)");
                        objCVarPayables.ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1;
                        objCVarPayables.crmCode = CostLine.xollsp_quotecostlineid;
                        objCVarPayables.CreationDate = DateTime.Now;
                        objCVarPayables.IsPurchased = false;
                        Common.Common.ReplaceNull(objCVarPayables);
                        UpdateChargesDTO.ExistingPayables.Add(objCVarPayables);
                    }

               





                    //var CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                    //{
                    //    CrmTableName = "transactioncurrencies",
                    //    ForwardingTableName = "Currencies",
                    //    CrmIdFieldName = "transactioncurrencyid",
                    //    CrmComparisonFieldName = "isocurrencycode",
                    //    CrmID = CostLine._xollsp_currency_value,
                    //    ForwardingComparisonFieldName = "Code",
                    //    ForwardingID = 0,
                    //    SelectedColumns = "isocurrencycode,currencyname"
                    //});
                    //if (UpdatePayables)
                    //{
                    //    ExceptionMessage = objCCustomizedDBCall.ExecuteQuery($"UPDATE Payables SET QuotationCost = {CostLine.xollsp_totalamount},Quantity = {CostLine.xollsp_quantity}{(CurrencyID > 0 ? $",CurrencyID = {CurrencyID}" : "")}{(CostLine.xollsp_exchangerate != null && CostLine.xollsp_exchangerate > 0 ? $",ExchangeRate = {1 / CostLine.xollsp_exchangerate}" : "")} WHERE {(IsHouse ? "BillID" : "OperationID")} = {Operation.ID} AND crmCode = '{CostLine.xollsp_quotecostlineid}'");
                    //    if (ExceptionMessage != null)
                    //        throw new InvalidOperationException(ExceptionMessage);
                    //}

                    //if (UpdateQuotationCharges)
                    //{
                    //    ExceptionMessage = objCCustomizedDBCall.ExecuteQuery($"UPDATE QuotationCharges SET CostAmount = {CostLine.xollsp_totalamount},CostPrice = {(CostLine.xollsp_unitamount == null || CostLine.xollsp_unitamount == 0 ? CostLine.xollsp_fixedamount : CostLine.xollsp_unitamount)},CostQuantity = {CostLine.xollsp_quantity} WHERE QuotationRouteID = {UpdateChargesDTO.QuotationRouteID} AND CostLineCrmCode = '{CostLine.xollsp_quotecostlineid}'");
                    //    if (ExceptionMessage != null)
                    //        throw new InvalidOperationException(ExceptionMessage);
                    //}
                }
                objCPayables.SaveMethod(UpdateChargesDTO.ExistingPayables);

                #region DeletePayablesNotInCRM
                var crmCostLineIDs = UpdateChargesDTO.CostLines
              .Where(c => !string.IsNullOrEmpty(c.xollsp_quotecostlineid))
              .Select(c => c.xollsp_quotecostlineid)
              .ToHashSet();

                var payablesToDelete = UpdateChargesDTO.ExistingPayables.Where(p =>
                   !crmCostLineIDs.Contains(p.crmCode) &&
                   ( p.crmCode != "") &&
                   p.IsDeleted == false
               ).ToList();


                foreach (var p in payablesToDelete)
                {
                    bool IsPayableIncludedInPR = false;
                    objCA_PaymentRequestDetails.GetList($"WHERE PayableID={p.ID}");
                    if (objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                        IsPayableIncludedInPR = true;

                    if (!IsPayableIncludedInPR && !(p.AccNoteID > 0) && (p.crmCode != null || p.crmCode !=""))
                    {
                        p.IsDeleted = true;
                        p.Notes = "Deleted By GetCRMUpdates";
                    }

                }
                objCPayables.SaveMethod(payablesToDelete);

                #endregion


                foreach (var SalesLine in UpdateChargesDTO.SalesLines)
                {
                    if (UpdateChargesDTO.ExistingReceivables.Select(p => p.crmCode).ToList().Contains(SalesLine.xollsp_quotesaleslineid)
                        && UpdateReceivables)
                    {
                        //Update
                        var Receivable = UpdateChargesDTO.ExistingReceivables.FirstOrDefault(p => p.crmCode == SalesLine.xollsp_quotesaleslineid);
                        if (Receivable != null)
                        {
                            bool IsReceivableIncludedInApprovedInvoice = false;
                            objCInvoices.GetItem(Receivable.InvoiceID);
                            if (objCInvoices.lstCVarInvoices.Count > 0 && objCInvoices.lstCVarInvoices[0].IsApproved)
                                IsReceivableIncludedInApprovedInvoice = true;

                            if (!IsReceivableIncludedInApprovedInvoice)
                            {
                                Receivable.Quantity = SalesLine.xollsp_quantity == null ? 1 : (decimal)SalesLine.xollsp_quantity;
                                Receivable.SalePrice = SalesLine.xollsp_unitamount == null || SalesLine.xollsp_unitamount == 0 ? (SalesLine.xollsp_fixedamount == null ? 0 : (decimal)SalesLine.xollsp_fixedamount / Receivable.Quantity) : (SalesLine.xollsp_fixedamount == null ? (decimal)SalesLine.xollsp_unitamount : (decimal)SalesLine.xollsp_unitamount + (decimal)SalesLine.xollsp_fixedamount / Receivable.Quantity);
                                //Receivable.SalePrice = SalesLine.xollsp_unitamount == null || SalesLine.xollsp_unitamount == 0 ? (SalesLine.xollsp_fixedamount == null ? 0 : (decimal)SalesLine.xollsp_fixedamount) : (decimal)SalesLine.xollsp_unitamount;
                                Receivable.SaleAmount = Receivable.Quantity * Receivable.SalePrice;
                                Receivable.AmountWithoutVAT = SalesLine.xollsp_totalamount ?? 0;
                                Receivable.CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                                {
                                    CrmTableName = "transactioncurrencies",
                                    ForwardingTableName = "Currencies",
                                    CrmIdFieldName = "transactioncurrencyid",
                                    CrmComparisonFieldName = "isocurrencycode",
                                    CrmID = SalesLine._xollsp_currency_value,
                                    ForwardingComparisonFieldName = "Code",
                                    ForwardingID = 0,
                                    SelectedColumns = "isocurrencycode,currencyname"
                                });
                                //Receivable.ExchangeRate = SalesLine.xollsp_exchangerate == null || SalesLine.xollsp_exchangerate == 0 ? 1 : 1 / (decimal)SalesLine.xollsp_exchangerate;
                                objCCurrencyDetails.GetList($"WHERE Currency_ID = {Receivable.CurrencyID} AND GETDATE() BETWEEN Convert(datetime,FromDate) AND Convert(datetime,ToDate)");
                                Receivable.ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1;
                            }
                        }
                    }
                    else
                    {
                        var checkIfExistedBefore = new CCustomizedDBCall();
                        string existedBefore = checkIfExistedBefore.CallStringFunction($"Select top 1 ID from CRM_Data_Audit where Type=2 AND OperationID={Operation.ID} AND crmCode='{SalesLine.xollsp_quotesaleslineid}'");
                        if (int.TryParse(existedBefore, out int exID))
                        {
                            if (exID > 0)
                            {
                                continue;
                            }
                        }

                        //Insert
                        objCReceivables.GetList($"WHERE OperationID = {Operation.ID} AND CategoryID IS NOT NULL");
                        var DefaultCategoryID = objCReceivables.lstCVarReceivables.Count > 0 ? objCReceivables.lstCVarReceivables[0].CategoryID : 0;
                        CVarReceivables objCVarReceivables = new CVarReceivables();
                        objCVarReceivables.OperationID = Operation.ID;
                        objCVarReceivables.CategoryID = DefaultCategoryID;
                        objCVarReceivables.ChargeTypeID = await GetForwardingIDFromCrmID<crmServiceDefinition, CVarChargeTypes>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "xollsp_servicedefinitions",
                            ForwardingTableName = "ChargeTypes",
                            CrmIdFieldName = "xollsp_servicedefinitionid",
                            CrmComparisonFieldName = "xollsp_servicedefinitionid",
                            CrmID = SalesLine._xollsp_logisticservice_value,
                            ForwardingComparisonFieldName = "crmCode",
                            ForwardingID = 0
                        });
                        objCVarReceivables.MeasurementID = 3;
                        objCVarReceivables.Quantity = SalesLine.xollsp_quantity == null ? 1 : (decimal)SalesLine.xollsp_quantity;
                        objCVarReceivables.SalePrice = SalesLine.xollsp_unitamount == null || SalesLine.xollsp_unitamount == 0 ? (SalesLine.xollsp_fixedamount == null ? 0 : (decimal)SalesLine.xollsp_fixedamount / objCVarReceivables.Quantity) : (decimal)SalesLine.xollsp_unitamount;
                        //objCVarReceivables.SalePrice = SalesLine.xollsp_unitamount == null || SalesLine.xollsp_unitamount == 0 ? (SalesLine.xollsp_fixedamount == null ? 0 : (decimal)SalesLine.xollsp_fixedamount) : (decimal)SalesLine.xollsp_unitamount;
                        objCVarReceivables.SaleAmount = objCVarReceivables.Quantity * objCVarReceivables.SalePrice;
                        objCVarReceivables.AmountWithoutVAT = SalesLine.xollsp_totalamount ?? 0;
                        objCVarReceivables.CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = SalesLine._xollsp_currency_value,
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = 0,
                            SelectedColumns = "isocurrencycode,currencyname"
                        });
                        //objCVarReceivables.ExchangeRate = SalesLine.xollsp_exchangerate == null || SalesLine.xollsp_exchangerate == 0 ? 1 : 1 / (decimal)SalesLine.xollsp_exchangerate;
                        objCCurrencyDetails.GetList($"WHERE Currency_ID = {objCVarReceivables.CurrencyID} AND GETDATE() BETWEEN Convert(datetime,FromDate) AND Convert(datetime,ToDate)");
                        objCVarReceivables.ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1;
                        objCVarReceivables.crmCode = SalesLine.xollsp_quotesaleslineid;
                        objCVarReceivables.CreationDate = DateTime.Now;
                        Common.Common.ReplaceNull(objCVarReceivables);
                        UpdateChargesDTO.ExistingReceivables.Add(objCVarReceivables);
                    }



                 



                }
                objCReceivables.SaveMethod(UpdateChargesDTO.ExistingReceivables);



                #region DeleteReceivablesNotInCRM
                var crmSalesLineIDs = UpdateChargesDTO.SalesLines
              .Where(s => !string.IsNullOrEmpty(s.xollsp_quotesaleslineid))
              .Select(s => s.xollsp_quotesaleslineid)
              .ToHashSet();

                var ReceivablesToDelete = UpdateChargesDTO.ExistingReceivables.Where(s =>
                   !crmSalesLineIDs.Contains(s.crmCode) &&
                   (  s.crmCode!="")
                   &&
                   s.IsDeleted == false
               ).ToList();


                foreach (var s in ReceivablesToDelete)
                {
                    //bool IsPayableIncludedInPR = false;
                    //objCA_PaymentRequestDetails.GetList($"WHERE PayableID={p.ID}");
                    //if (objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                    //    IsPayableIncludedInPR = true;

                    if (!(s.AccNoteID > 0) && !(s.DraftInvoiceID > 0) && !(s.InvoiceID > 0))
                    {
                        s.IsDeleted = true;
                        s.Notes = "Deleted By GetCRMUpdates";
                    }

                }
                objCReceivables.SaveMethod(ReceivablesToDelete);
                #endregion




                //Update invoices headers in case of an update happens in the receivables amount for unapproved invoices
                foreach (var item in UpdateChargesDTO.ExistingReceivables)
                {
                    if (item.InvoiceID > 0)
                    {
                        if (objCDefaults.lstCVarDefaults.Count == 0)
                            objCDefaults.GetList(" WHERE 1=1");

                        string pUpdateClause = "";
                        //SET AmountWithoutVAT
                        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(ISNULL(SalePrice,0) * ISNULL(Quantity,1))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + item.InvoiceID.ToString() + " AND IsDeleted=0),2)";
                        pUpdateClause += " WHERE ID = " + item.InvoiceID.ToString();
                        objCInvoices.UpdateList(pUpdateClause);
                        //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                        pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2)";
                        pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)";
                        if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                            pUpdateClause += " , Amount = - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2) + ROUND((SELECT SUM(ISNULL(SaleAmount,0))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + item.InvoiceID.ToString() + " AND IsDeleted=0),2)";
                        else
                            pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + ROUND( (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2) - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)),2)";
                        pUpdateClause += " WHERE ID = " + item.InvoiceID.ToString();
                        objCInvoices.UpdateList(pUpdateClause);
                    }
                }


                //foreach (var SalesLine in UpdateChargesDTO.SalesLines)
                //{
                //    var CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                //    {
                //        CrmTableName = "transactioncurrencies",
                //        ForwardingTableName = "Currencies",
                //        CrmIdFieldName = "transactioncurrencyid",
                //        CrmComparisonFieldName = "isocurrencycode",
                //        CrmID = SalesLine._xollsp_currency_value,
                //        ForwardingComparisonFieldName = "Code",
                //        ForwardingID = 0,
                //        SelectedColumns = "isocurrencycode,currencyname"
                //    });
                //    if (UpdateReceivables)
                //    {
                //        ExceptionMessage = objCCustomizedDBCall.ExecuteQuery($"UPDATE Receivables SET SalePrice = {(SalesLine.xollsp_unitamount == null || SalesLine.xollsp_unitamount == 0 ? SalesLine.xollsp_fixedamount : SalesLine.xollsp_unitamount)},SaleAmount = {SalesLine.xollsp_totalamount},Quantity = {SalesLine.xollsp_quantity}{(CurrencyID > 0 ? $",CurrencyID = {CurrencyID}" : "")}{(SalesLine.xollsp_exchangerate != null && SalesLine.xollsp_exchangerate > 0 ? $",ExchangeRate = {1 / SalesLine.xollsp_exchangerate}" : "")} WHERE {(IsHouse ? "HouseBillID" : "OperationID")} = {Operation.ID} AND crmCode = '{SalesLine.xollsp_quotesaleslineid}' AND InvoiceID IS NULL");
                //        if (ExceptionMessage != null)
                //            throw new InvalidOperationException(ExceptionMessage);
                //    }

                //    if (UpdateQuotationCharges)
                //    {
                //        ExceptionMessage = objCCustomizedDBCall.ExecuteQuery($"UPDATE QuotationCharges SET SaleAmount = {SalesLine.xollsp_totalamount},SalePrice = {(SalesLine.xollsp_unitamount == null || SalesLine.xollsp_unitamount == 0 ? SalesLine.xollsp_fixedamount : SalesLine.xollsp_unitamount)},SaleQuantity = {SalesLine.xollsp_quantity} WHERE QuotationRouteID = {UpdateChargesDTO.QuotationRouteID} AND SalesLineCrmCode = '{SalesLine.xollsp_quotesaleslineid}'");
                //        if (ExceptionMessage != null)
                //            throw new InvalidOperationException(ExceptionMessage);
                //    }
                //}
                Console.WriteLine($"Quotation {UpdateChargesDTO.QuotationHeader.xollsp_quotenumber}'s payables & receivables are updated successfully!");
            }
            catch (Exception Ex)
            {
                ExceptionMessage = Ex.Message;
            }
            finally
            {
                //IntegrationLog(StartTime, ExceptionMessage ?? "Updated Successfully");
            }
        }
        private void IntegrationLog(DateTime StartTime, string LogMessage)
        {
            int _rowCount = 0;
            CcrmIntegrationLog Logger = new CcrmIntegrationLog();
            CVarcrmIntegrationLog objLogger = new CVarcrmIntegrationLog();
            List<CVarcrmIntegrationLog> lstLogger = new List<CVarcrmIntegrationLog>();
            objLogger.StartTime = StartTime;
            objLogger.EndTime = DateTime.Now;
            objLogger.LogMessage = LogMessage;
            lstLogger.Add(objLogger);
            Logger.GetListPaging(99999, 1, "WHERE 1=1", "ID", out _rowCount);

            //Just keep the last 1000 record only to avoid linear growth of the table size
            if (Logger.lstCVarcrmIntegrationLog.Count > 1000)
                Logger.DeleteList("WHERE ID NOT IN (SELECT TOP 1000 ID FROM crmIntegrationLog ORDER BY ID DESC)");

            Logger.SaveMethod(lstLogger);
        }
        [HttpGet]
        async public Task RefreshQuotations_Old()
        {
            objCDefaults.GetList(" WHERE 1=1");
            BusinessUnitID = BusinessUnits[objCDefaults.lstCVarDefaults[0].UnEditableCompanyName];
            string access_token = Auth();
            var client = new RestClient($"{url}");
            client.Authenticator = new JwtAuthenticator(access_token);
            var request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_tariffquotes?$select=xollsp_quotenumber&$filter=statuscode eq 300000008 and _owningbusinessunit_value eq '{BusinessUnitID}' and xollsp_transporttype ne 300000001", Method.GET);
            request.AddHeader("Accept", "application/json");
            var response = client.Execute(request);
            var Data = (JObject)JsonConvert.DeserializeObject(response.Content);
            var Quotations = Data["value"].ToList();
            var ExistingQuotations = objCCustomizedDBCall.ExecuteQuery_Array("SELECT crmID FROM vwcrmQuotations");
            var RequiredQuotations = Quotations.Where(x => !ExistingQuotations.Contains(x["xollsp_tariffquoteid"].ToString())).ToList();
            //var CRMQuotationNumbers = new List<string>();   //Accepted quotations in dynamics crm with expiration date (effective_to) greater than today's date
            //foreach(var Quotation in Quotations)
            //    CRMQuotationNumbers.Add(Quotation["xollsp_quotenumber"].ToString());
            //var RequiredQuotations = CRMQuotationNumbers.Except(ExistingQuotations).ToList();
            foreach (var Quotation in RequiredQuotations)
            {
                await GetQuotationByQuotationNumber(Quotation["xollsp_quotenumber"].ToString());
            }
        }
        [HttpGet]
        async public Task<string> GetQuotationByQuotationNumber(string QuotationNumber) //Strating point to get the quotation from CRM
        {
            objCDefaults.GetList(" WHERE 1=1");
            BusinessUnitID = BusinessUnits[objCDefaults.lstCVarDefaults[0].UnEditableCompanyName];
            try
            {
                string access_token = Auth();
                var client = new RestClient($"{url}");
                client.Authenticator = new JwtAuthenticator(access_token);
                List<string> ExistingRecords = new List<string>();

                //Getting Quotation Header
                var request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_tariffquotes?$filter=xollsp_quotenumber eq '{QuotationNumber}' and _owningbusinessunit_value eq '{BusinessUnitID}' and statuscode eq 300000008 and xollsp_transporttype ne 300000001", Method.GET);
                request.AddHeader("Accept", "application/json");
                var response = await client.ExecuteGetTaskAsync(request);
                var Quotation = JToken.Parse(response.Content)["value"];

                //Check quotation existance in current business unit
                if (Quotation.ToList().Count == 0)
                {
                    var Header = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{QuotationNumber}'");
                    if (Header.Count > 0 && Header[0].statuscode != (int)StatusCodes.Accepted)
                        throw new InvalidOperationException($"Quotation {QuotationNumber} is not accepted, check quotation status on crm");
                    else
                        throw new InvalidOperationException($"There is no quotation with code {QuotationNumber} existed in the current business unit");
                }
                    

                //Getting cost lines
                request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_quotecostlines?$filter=_xollsp_tariffquote_value eq '{Quotation[0]["xollsp_tariffquoteid"]}'&$expand=xollsp_From($select=_xollsp_countryid_value),xollsp_To($select=_xollsp_countryid_value)", Method.GET);
                response = await client.ExecuteGetTaskAsync(request);
                var QuoteCostLines = JToken.Parse(response.Content)["value"];

                //Getting sales lines
                request = new RestRequest($"/api/data/v9.2.23022.00178/xollsp_quotesaleslines?$filter=_xollsp_tariffquote_value eq '{Quotation[0]["xollsp_tariffquoteid"]}'&$expand=xollsp_From($select=_xollsp_countryid_value),xollsp_To($select=_xollsp_countryid_value)", Method.GET);
                response = await client.ExecuteGetTaskAsync(request);
                var QuoteSalesLines = JToken.Parse(response.Content)["value"];

                //check cost/sales lines
                if (QuoteCostLines.ToList().Count == 0 && QuoteSalesLines.ToList().Count == 0)
                    throw new InvalidOperationException($"Cost and Sales Lines are missing for quotation {QuotationNumber}");

                var crmLine = QuoteSalesLines.ToList().Count > 0 ? QuoteSalesLines[0] : QuoteCostLines[0];
                //Procedure in case of valid quotation
                if (ValidationCheck(Quotation[0], crmLine))
                {
                    List<CVarQuotations> QuotationHeader = await PrepareQuotationHeader(Quotation[0]);
                    List<CVarQuotationRoute> QuotationRoute = await PrepareQuotationRoute(crmLine, Quotation[0]);
                    List<CVarQuotationCharges> QuotationCharges = await PrepareQuotationCharges(QuoteCostLines, QuoteSalesLines);
                    List<CVarQuotationContainersAndPackages> QuotationContainersAndPackages = await PrepareQuotationContainersAndPackages(QuoteCostLines, QuoteSalesLines);

                    if (QuotationHeader.Count > 0 && QuotationRoute.Count > 0 && QuotationCharges.Count > 0)
                        return InsertQuotation(QuotationHeader, QuotationRoute, QuotationCharges, QuotationContainersAndPackages, Quotation[0]["xollsp_tariffquoteid"].ToString(), Quotation[0]["xollsp_quotenumber"].ToString());
                    else
                        return $"Integration failed, try GetQuotation again";
                }
                else
                    throw new InvalidOperationException($"Quotation {QuotationNumber} has missing fields");
            }
            catch (Exception error)
            {
                return error.Message;
            }
        }
        async private Task<List<CVarQuotations>> PrepareQuotationHeader(JToken QuotationHeader)
        {
            CVarQuotations objCVarQuotations = new CVarQuotations();
            var lstCVarQuotations = new List<CVarQuotations>();
            objCVarQuotations.Code = QuotationHeader["xollsp_quotenumber"].ToString();
            objCVarQuotations.BranchID = 6;
            objCVarQuotations.ShipmentType = 1;
            if (QuotationHeader["_owninguser_value"].ToString() == "")
                objCVarQuotations.SalesmanID = await GetForwardingIDFromCrmID<crmSystemTeam, CVarSalesmen>(new IntegrationOptionsDTO
            {
                CrmTableName = QuotationHeader["_owninguser_value"].ToString() == "" ? "teams" : "systemusers",
                ForwardingTableName = "Salesmen",
                CrmIdFieldName = "teamid" ,
                CrmComparisonFieldName = "teamid" ,
                CrmID =  QuotationHeader["_owningteam_value"].ToString(),
                ForwardingComparisonFieldName = "crmCode",
                ForwardingID = 0,
                SelectedColumns =  "teamid,name"
            });
            else
            {
                objCVarQuotations.SalesmanID = await GetForwardingIDFromCrmID<crmSystemUser, CVarSalesmen>(new IntegrationOptionsDTO
                {
                    CrmTableName =  "systemusers",
                    ForwardingTableName = "Salesmen",
                    CrmIdFieldName =  "systemuserid",
                    CrmComparisonFieldName =  "systemuserid",
                    CrmID =  QuotationHeader["_owninguser_value"].ToString(),
                    ForwardingComparisonFieldName = "crmCode",
                    ForwardingID = 0,
                    SelectedColumns =  "fullname,userpuid"
                });
            }
            if (Convert.ToInt32(QuotationHeader["xollsp_importexport"]) == (int)DirectionTypes.Import)
            {
                objCVarQuotations.DirectionType = 1;
                objCVarQuotations.DirectionIconName = "fa-arrow-circle-down";
                objCVarQuotations.DirectionIconStyle = "import-icon-style";
                objCVarQuotations.Code += "-IMP";
                objCVarQuotations.ConsigneeID = await GetForwardingIDFromCrmID<crmAccount, CVarCustomers>(new IntegrationOptionsDTO
                {
                    CrmTableName = "accounts",
                    ForwardingTableName = "Customers",
                    CrmIdFieldName = "accountid",
                    CrmComparisonFieldName = "accountid",
                    CrmID = QuotationHeader["_xollsp_customer_value"].ToString() == "" ? QuotationHeader["_xollsp_consignee_value"].ToString() : QuotationHeader["_xollsp_customer_value"].ToString(),
                    ForwardingComparisonFieldName = "crmCode",
                    ForwardingID = 0,
                    SelectedColumns = "name,mesco_arabicname,xollsp_vatnumber,address1_country,address1_city,address1_line1,address1_line2"
                });
            }
            else if (Convert.ToInt32(QuotationHeader["xollsp_importexport"]) == (int)DirectionTypes.Export)
            {
                objCVarQuotations.DirectionType = 2;
                objCVarQuotations.DirectionIconName = "fa-external-link";
                objCVarQuotations.DirectionIconStyle = "export-icon-style";
                objCVarQuotations.Code += "-EXP";
                objCVarQuotations.ShipperID = await GetForwardingIDFromCrmID<crmAccount, CVarCustomers>(new IntegrationOptionsDTO
                {
                    CrmTableName = "accounts",
                    ForwardingTableName = "Customers",
                    CrmIdFieldName = "accountid",
                    CrmComparisonFieldName = "accountid",
                    CrmID = QuotationHeader["_xollsp_customer_value"].ToString() == "" ? QuotationHeader["_xollsp_shipper_value"].ToString() : QuotationHeader["_xollsp_customer_value"].ToString(),
                    ForwardingComparisonFieldName = "crmCode",
                    ForwardingID = 0,
                    SelectedColumns = "name,mesco_arabicname,xollsp_vatnumber,address1_country,address1_city,address1_line1,address1_line2"
                });
            }
            else if (Convert.ToInt32(QuotationHeader["xollsp_importexport"]) == (int)DirectionTypes.CrossBooking)
            {
                objCVarQuotations.DirectionType = 4;
                objCVarQuotations.DirectionIconName = "fa-arrows";
                objCVarQuotations.DirectionIconStyle = "import-icon-style";
                objCVarQuotations.Code += "-CB";
                objCVarQuotations.ShipperID = await GetForwardingIDFromCrmID<crmAccount, CVarCustomers>(new IntegrationOptionsDTO
                {
                    CrmTableName = "accounts",
                    ForwardingTableName = "Customers",
                    CrmIdFieldName = "accountid",
                    CrmComparisonFieldName = "accountid",
                    CrmID = QuotationHeader["_xollsp_customer_value"].ToString() == "" ? QuotationHeader["_xollsp_shipper_value"].ToString() : QuotationHeader["_xollsp_customer_value"].ToString(),
                    ForwardingComparisonFieldName = "crmCode",
                    ForwardingID = 0,
                    SelectedColumns = "name,mesco_arabicname,xollsp_vatnumber,address1_country,address1_city,address1_line1,address1_line2"
                });
            }
            else if (Convert.ToInt32(QuotationHeader["xollsp_importexport"]) == (int)DirectionTypes.Domestic)
            {
                objCVarQuotations.DirectionType = 3;
                objCVarQuotations.DirectionIconName = "fa-home";
                objCVarQuotations.DirectionIconStyle = "domestic-icon-style";
                objCVarQuotations.Code += "-DOM";
                objCVarQuotations.ShipperID = await GetForwardingIDFromCrmID<crmAccount, CVarCustomers>(new IntegrationOptionsDTO
                {
                    CrmTableName = "accounts",
                    ForwardingTableName = "Customers",
                    CrmIdFieldName = "accountid",
                    CrmComparisonFieldName = "accountid",
                    CrmID = QuotationHeader["_xollsp_customer_value"].ToString() == "" ? QuotationHeader["_xollsp_shipper_value"].ToString() : QuotationHeader["_xollsp_customer_value"].ToString(),
                    ForwardingComparisonFieldName = "crmCode",
                    ForwardingID = 0,
                    SelectedColumns = "name,mesco_arabicname,xollsp_vatnumber,address1_country,address1_city,address1_line1,address1_line2"
                });
            }

            if (Convert.ToInt32(QuotationHeader["xollsp_transporttype"]) == (int)TransportTypes.Ocean || Convert.ToInt32(QuotationHeader["xollsp_transporttype"]) == (int)TransportTypes.Warehousing)
            {
                objCVarQuotations.TransportType = 1;
                objCVarQuotations.TransportIconName = "fa-anchor";
                objCVarQuotations.TransportIconStyle = "ocean-icon-style";
                if (QuotationHeader["xollsp_loadtype"].ToString() == "" || Convert.ToInt32(QuotationHeader["xollsp_loadtype"]) == (int)ShipmentTypes.FCL)
                    objCVarQuotations.Code += "-FCL";
                else if (Convert.ToInt32(QuotationHeader["xollsp_loadtype"]) == (int)ShipmentTypes.LCL)
                {
                    objCVarQuotations.Code += "-LCL";
                    objCVarQuotations.ShipmentType = 2;
                }
            }
            else if (Convert.ToInt32(QuotationHeader["xollsp_transporttype"]) == (int)TransportTypes.Air)
            {
                objCVarQuotations.TransportType = 2;
                objCVarQuotations.TransportIconName = "fa-plane";
                objCVarQuotations.TransportIconStyle = "air-icon-style";
                objCVarQuotations.Code += "-AI";
            }
            objCVarQuotations.CustomerID = await GetForwardingIDFromCrmID<crmAccount, CVarCustomers>(new IntegrationOptionsDTO
            {
                CrmTableName = "accounts",
                ForwardingTableName = "Customers",
                CrmIdFieldName = "accountid",
                CrmComparisonFieldName = "accountid",
                CrmID = QuotationHeader["_xollsp_customer_value"].ToString(),
                ForwardingComparisonFieldName = "crmCode",
                ForwardingID = 0,
                SelectedColumns = "name,mesco_arabicname,xollsp_vatnumber,address1_country,address1_city,address1_line1,address1_line2"
            });
            objCVarQuotations.AgentID = await GetForwardingIDFromCrmID<crmAgent, CVarAgents>(new IntegrationOptionsDTO
            {
                CrmTableName = "mesco_agents",
                ForwardingTableName = "Agents",
                CrmIdFieldName = "mesco_agentid",
                CrmComparisonFieldName = "mesco_agentid",
                CrmID = QuotationHeader["_mesco_agent2_value"].ToString(),
                ForwardingComparisonFieldName = "crmCode",
                ForwardingID = 0
            });
            objCVarQuotations.IncotermID = await GetForwardingIDFromCrmID<crmIncoterm, CVarIncoterms>(new IntegrationOptionsDTO
            {
                CrmTableName = "xollsp_incoterms",
                ForwardingTableName = "Incoterms",
                CrmIdFieldName = "xollsp_incotermid",
                CrmComparisonFieldName = "xollsp_name",
                CrmID = QuotationHeader["_xollsp_incoterm_value"].ToString(),
                ForwardingComparisonFieldName = "Code",
                ForwardingID = 0,
                SelectedColumns = "xollsp_name,xollsp_description"
            });
            objCVarQuotations.TransientTime = int.Parse(QuotationHeader["new_transittime"].ToString() == "" ? "0" : QuotationHeader["new_transittime"].ToString());
            objCVarQuotations.FreeTime = int.Parse(QuotationHeader["mesco_freedays"].ToString() == "" ? "0" : QuotationHeader["mesco_freedays"].ToString());
            objCVarQuotations.OpenDate = (DateTime)QuotationHeader["createdon"];
            objCVarQuotations.ExpirationDate = (DateTime)QuotationHeader["xollsp_effectiveto"];
            objCVarQuotations.DescriptionOfGoods = QuotationHeader["xollsp_commoditydetails"].ToString();
            objCVarQuotations.IsContract = QuotationHeader["mesco_contractedrates"].ToString() == "" || QuotationHeader["mesco_contractedrates"].ToString() == "False" ? false : true;
            objCVarQuotations.CreationDate = DateTime.Now;
            objCVarQuotations.CreatorUserID = 4;
            objCVarQuotations.QuotationStageID = 4;
            objCVarQuotations.ExporterID = 0;
            objCVarQuotations.CRMCode = "0";
            objCVarQuotations.IsLoadingDischarging = false;
            objCVarQuotations.IsSurvey = false;
            objCVarQuotations.IsLashing = false;
            objCVarQuotations.IsPackingRemovals = false;

            Common.Common.ReplaceNull(objCVarQuotations);
            lstCVarQuotations.Add(objCVarQuotations);

            return lstCVarQuotations;
        }
        async private Task<List<CVarQuotationRoute>> PrepareQuotationRoute(JToken crmLine, JToken QuotationHeader)
        {
            int _rowCount = 0;
            CVarQuotationRoute objCVarQuotationRoute = new CVarQuotationRoute();
            var lstCVarQuotationRoute = new List<CVarQuotationRoute>();
            objCVarQuotationRoute.RoutingTypeID = 30;
            objCVarQuotationRoute.ExpirationDate = (DateTime)QuotationHeader["xollsp_effectiveto"];
            if (Convert.ToInt32(QuotationHeader["xollsp_importexport"]) != (int)DirectionTypes.Domestic)
            {
                objCVarQuotationRoute.POL = await GetForwardingIDFromCrmID<crmAddress, CVarPorts>(new IntegrationOptionsDTO
                {
                    CrmTableName = "xollsp_addresses",
                    ForwardingTableName = "Ports",
                    CrmIdFieldName = "xollsp_addressid",
                    CrmComparisonFieldName = "xollsp_name",
                    CrmID = crmLine["_xollsp_from_value"].ToString(),
                    ForwardingComparisonFieldName = "Name",
                    ForwardingID = 0,
                    SelectedColumns = "xollsp_name,xollsp_name2,xollsp_type,xollsp_addressspecification"
                });
                objCVarQuotationRoute.POD = await GetForwardingIDFromCrmID<crmAddress, CVarPorts>(new IntegrationOptionsDTO
                {
                    CrmTableName = "xollsp_addresses",
                    ForwardingTableName = "Ports",
                    CrmIdFieldName = "xollsp_addressid",
                    CrmComparisonFieldName = "xollsp_name",
                    CrmID = crmLine["_xollsp_to_value"].ToString(),
                    ForwardingComparisonFieldName = "Name",
                    ForwardingID = 0,
                    SelectedColumns = "xollsp_name,xollsp_name2,xollsp_type,xollsp_addressspecification"
                });
                objCVarQuotationRoute.POLCountryID = await GetForwardingIDFromCrmID<crmCountry, CVarCountries>(new IntegrationOptionsDTO
                {
                    CrmTableName = "xollsp_countries",
                    ForwardingTableName = "Countries",
                    CrmIdFieldName = "xollsp_countryid",
                    CrmComparisonFieldName = "xollsp_name",
                    CrmID = crmLine["xollsp_From"]["_xollsp_countryid_value"].ToString(),
                    ForwardingComparisonFieldName = "Name",
                    ForwardingID = 0,
                    SelectedColumns = "xollsp_name,xollsp_code"
                });
                objCVarQuotationRoute.PODCountryID = await GetForwardingIDFromCrmID<crmCountry, CVarCountries>(new IntegrationOptionsDTO
                {
                    CrmTableName = "xollsp_countries",
                    ForwardingTableName = "Countries",
                    CrmIdFieldName = "xollsp_countryid",
                    CrmComparisonFieldName = "xollsp_name",
                    CrmID = crmLine["xollsp_To"]["_xollsp_countryid_value"].ToString(),
                    ForwardingComparisonFieldName = "Name",
                    ForwardingID = 0,
                    SelectedColumns = "xollsp_name,xollsp_code"
                });
                if (Convert.ToInt32(QuotationHeader["xollsp_transporttype"]) == (int)TransportTypes.Air)
                {
                    objCVarQuotationRoute.AirlineID = await GetForwardingIDFromCrmID<crmAirLine, CVarAirlines>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "mesco_airlines",
                        ForwardingTableName = "AirLines",
                        CrmIdFieldName = "mesco_airlineid",
                        CrmComparisonFieldName = "mesco_airlineid",
                        CrmID = crmLine["_mesco_airline2_value"].ToString(),
                        ForwardingComparisonFieldName = "crmCode",
                        ForwardingID = 0
                    });
                }
                else if (Convert.ToInt32(QuotationHeader["xollsp_transporttype"]) == (int)TransportTypes.Ocean || Convert.ToInt32(QuotationHeader["xollsp_transporttype"]) == (int)TransportTypes.Warehousing)
                {
                    objCVarQuotationRoute.ShippingLineID = await GetForwardingIDFromCrmID<crmShippingLine, CVarShippingLines>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "mesco_shippinglines",
                        ForwardingTableName = "ShippingLines",
                        CrmIdFieldName = "mesco_shippinglineid",
                        CrmComparisonFieldName = "mesco_shippinglineid",
                        CrmID = crmLine["_mesco_shippingline_value"].ToString(),
                        ForwardingComparisonFieldName = "crmCode",
                        ForwardingID = 0
                    });
                }
            }
            else
            {
                CPorts objCPorts = new CPorts();
                objCPorts.GetListPaging(1, 1, "WHERE Code = 'N/A'", "ID", out _rowCount);
                CCountries objCCountries = new CCountries();
                objCCountries.GetListPaging(1, 1, "WHERE Code = 'EG'", "ID", out _rowCount);
                var DomesticPortID = objCPorts.lstCVarPorts.Count > 0 ? objCPorts.lstCVarPorts[0].ID : 0;
                var DomesticCountryID = objCCountries.lstCVarCountries.Count > 0 ? objCCountries.lstCVarCountries[0].ID : 0;
                objCVarQuotationRoute.POL = DomesticPortID;
                objCVarQuotationRoute.POD = DomesticPortID;
                objCVarQuotationRoute.POLCountryID = DomesticCountryID;
                objCVarQuotationRoute.PODCountryID = DomesticCountryID;
            }
            objCVarQuotationRoute.TransientTime = int.Parse(QuotationHeader["new_transittime"].ToString() == "" ? "0" : QuotationHeader["new_transittime"].ToString());
            objCVarQuotationRoute.FreeTime = int.Parse(QuotationHeader["mesco_freedays"].ToString() == "" ? "0" : QuotationHeader["mesco_freedays"].ToString());
            objCVarQuotationRoute.CreatorUserID = 4;
            objCVarQuotationRoute.CreationDate = DateTime.Now;
            if (crmLine["new_freightterm"].ToString() == FreightTerm.Prepaid.ToString())
                objCVarQuotationRoute.POrC = 3;
            else if (crmLine["new_freightterm"].ToString() == FreightTerm.Collect.ToString())
                objCVarQuotationRoute.POrC = 1;
            decimal GrossWeight = 0m;
            decimal.TryParse(crmLine["xollsp_grossweightkg"].ToString(), out GrossWeight);
            objCVarQuotationRoute.GrossWeight = GrossWeight;
            decimal Volume = 0m;
            decimal.TryParse(crmLine["xollsp_volumem3"].ToString(), out Volume);
            objCVarQuotationRoute.Volume = Volume;
            objCVarQuotationRoute.QuotationStageID = 4;
            Common.Common.ReplaceNull(objCVarQuotationRoute);
            lstCVarQuotationRoute.Add(objCVarQuotationRoute);

            return lstCVarQuotationRoute;
        }
        async private Task<List<CVarQuotationCharges>> PrepareQuotationCharges(JToken CostLinesToken, JToken SalesLinesToken)
        {
            List<QuoteCostLine> CostLines = CostLinesToken.ToObject<List<QuoteCostLine>>();
            List<QuoteSalesLine> SalesLines = SalesLinesToken.ToObject<List<QuoteSalesLine>>();
            List<CVarQuotationCharges> QuotationChargesToBeInserted = new List<CVarQuotationCharges>();
            CQuotationCharges objCQuotationCharges = new CQuotationCharges();
            foreach (var line in CostLines)
            {
               
                CVarQuotationCharges objCVarQuotationCharges = new CVarQuotationCharges();
                objCVarQuotationCharges.ChargeTypeID = await GetForwardingIDFromCrmID<crmServiceDefinition, CVarChargeTypes>(new IntegrationOptionsDTO
                {
                    CrmTableName = "xollsp_servicedefinitions",
                    ForwardingTableName = "ChargeTypes",
                    CrmIdFieldName = "xollsp_servicedefinitionid",
                    CrmComparisonFieldName = "xollsp_servicedefinitionid",
                    CrmID = line._xollsp_logisticservice_value,
                    ForwardingComparisonFieldName = "crmCode",
                    ForwardingID = 0
                });
                objCVarQuotationCharges.MeasurementID = 3;
                objCVarQuotationCharges.CostQuantity = line.xollsp_quantity == null ? 1 : (decimal)line.xollsp_quantity;
                objCVarQuotationCharges.SaleQuantity = 0;
                objCVarQuotationCharges.CostPrice = line.xollsp_unitamount == null || line.xollsp_unitamount == 0 ? (line.xollsp_fixedamount == null ? 0 : (decimal)line.xollsp_fixedamount/ objCVarQuotationCharges.CostQuantity) : ((decimal)line.xollsp_unitamount +( line.xollsp_fixedamount ==null ? 0 :(decimal)line.xollsp_fixedamount / objCVarQuotationCharges.CostQuantity));
                //objCVarQuotationCharges.CostPrice = line.xollsp_unitamount == null || line.xollsp_unitamount == 0 ? (line.xollsp_fixedamount == null ? 0 : (decimal)line.xollsp_fixedamount) : (decimal)line.xollsp_unitamount;
                objCVarQuotationCharges.CostAmount = objCVarQuotationCharges.CostQuantity * objCVarQuotationCharges.CostPrice;
                objCVarQuotationCharges.CostCurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                {
                    CrmTableName = "transactioncurrencies",
                    ForwardingTableName = "Currencies",
                    CrmIdFieldName = "transactioncurrencyid",
                    CrmComparisonFieldName = "isocurrencycode",
                    CrmID = line._xollsp_currency_value,
                    ForwardingComparisonFieldName = "Code",
                    ForwardingID = 0,
                    SelectedColumns = "isocurrencycode,currencyname"
                });
                CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();

                objCCurrencyDetails.GetList($"WHERE Currency_ID = {objCVarQuotationCharges.CostCurrencyID} AND GETDATE() BETWEEN Convert(datetime,FromDate) AND Convert(datetime,ToDate)");

                var ExchangeRate =objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 0;

                objCVarQuotationCharges.CostExchangeRate = ExchangeRate == 0 ? (line.xollsp_exchangerate == 0 || line.xollsp_exchangerate == null ? 1 : Math.Round(1 / (decimal)line.xollsp_exchangerate, 2)) : ExchangeRate;
                objCVarQuotationCharges.SupplierID = await GetForwardingIDFromCrmID<crmAccount, CVarCustomers>(new IntegrationOptionsDTO
                {
                    CrmTableName = "accounts",
                    ForwardingTableName = "Customers",
                    CrmIdFieldName = "accountid",
                    CrmComparisonFieldName = "accountid",
                    CrmID = line._xollsp_vendor_value,
                    ForwardingComparisonFieldName = "crmCode",
                    ForwardingID = 0,
                    SelectedColumns = "name,mesco_arabicname,xollsp_vatnumber,address1_country,address1_city,address1_line1,address1_line2"
                });
                objCVarQuotationCharges.CreatorUserID = 4;
                objCVarQuotationCharges.CreationDate = DateTime.Now;
                objCVarQuotationCharges.CostLineCrmCode = line.xollsp_quotecostlineid;
                objCVarQuotationCharges.SalesLineCrmCode = "";
                Common.Common.ReplaceNull(objCVarQuotationCharges);
                QuotationChargesToBeInserted.Add(objCVarQuotationCharges);
            }

            foreach (var line in SalesLines)
            {
                var ChargeTypeID = await GetForwardingIDFromCrmID<crmServiceDefinition, CVarChargeTypes>(new IntegrationOptionsDTO
                {
                    CrmTableName = "xollsp_servicedefinitions",
                    ForwardingTableName = "ChargeTypes",
                    CrmIdFieldName = "xollsp_servicedefinitionid",
                    CrmComparisonFieldName = "xollsp_servicedefinitionid",
                    CrmID = line._xollsp_logisticservice_value,
                    ForwardingComparisonFieldName = "crmCode",
                    ForwardingID = 0
                });
                if (QuotationChargesToBeInserted.Any(x => x.ChargeTypeID == ChargeTypeID && x.CostLineCrmCode != ""))
                {
                    var QuotationCharge = QuotationChargesToBeInserted.FirstOrDefault(x => x.ChargeTypeID == ChargeTypeID && x.CostLineCrmCode != "");
                    QuotationCharge.SaleQuantity = line.xollsp_quantity == null ? 1 : (decimal)line.xollsp_quantity;
                    QuotationCharge.SalePrice = line.xollsp_unitamount == null || line.xollsp_unitamount == 0 ? (line.xollsp_fixedamount == null ? 0 : (decimal)line.xollsp_fixedamount/ QuotationCharge.SaleQuantity) : ((decimal)line.xollsp_unitamount+ (line.xollsp_fixedamount == null ? 0 : (decimal)line.xollsp_fixedamount / QuotationCharge.SaleQuantity))  ;
                    //QuotationCharge.SalePrice = line.xollsp_unitamount == null || line.xollsp_unitamount == 0 ? (line.xollsp_fixedamount == null ? 0 : (decimal)line.xollsp_fixedamount) : (decimal)line.xollsp_unitamount;
                    QuotationCharge.SaleAmount = QuotationCharge.SaleQuantity * QuotationCharge.SalePrice;
                    QuotationCharge.SalesLineCrmCode = line.xollsp_quotesaleslineid;
                    QuotationCharge.SaleCurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "transactioncurrencies",
                        ForwardingTableName = "Currencies",
                        CrmIdFieldName = "transactioncurrencyid",
                        CrmComparisonFieldName = "isocurrencycode",
                        CrmID = line._xollsp_currency_value,
                        ForwardingComparisonFieldName = "Code",
                        ForwardingID = 0,
                        SelectedColumns = "isocurrencycode,currencyname"
                    });

                    CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();

                    objCCurrencyDetails.GetList($"WHERE Currency_ID = {QuotationCharge.SaleCurrencyID} AND GETDATE() BETWEEN Convert(datetime,FromDate) AND Convert(datetime,ToDate)");

                    var ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 0;

                    QuotationCharge.SaleExchangeRate = ExchangeRate == 0 ? (line.xollsp_exchangerate == 0 || line.xollsp_exchangerate == null ? 1 : Math.Round(1 / (decimal)line.xollsp_exchangerate, 2)) : ExchangeRate;



                    //QuotationCharge.SaleExchangeRate = line.xollsp_exchangerate == 0 || line.xollsp_exchangerate == null ? 1 : Math.Round(1 / (decimal)line.xollsp_exchangerate, 2);
                }
                else
                {
                    CVarQuotationCharges objCVarQuotationCharges = new CVarQuotationCharges();
                    objCVarQuotationCharges.ChargeTypeID = await GetForwardingIDFromCrmID<crmServiceDefinition, CVarChargeTypes>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "xollsp_servicedefinitions",
                        ForwardingTableName = "ChargeTypes",
                        CrmIdFieldName = "xollsp_servicedefinitionid",
                        CrmComparisonFieldName = "xollsp_servicedefinitionid",
                        CrmID = line._xollsp_logisticservice_value,
                        ForwardingComparisonFieldName = "crmCode",
                        ForwardingID = 0
                    });
                    objCVarQuotationCharges.MeasurementID = 3;
                    objCVarQuotationCharges.CostQuantity = 0;
                    objCVarQuotationCharges.SaleQuantity = line.xollsp_quantity == null ? 1 : (decimal)line.xollsp_quantity;
                    objCVarQuotationCharges.SalePrice = line.xollsp_unitamount == null || line.xollsp_unitamount == 0 ? (line.xollsp_fixedamount == null ? 0 : (decimal)line.xollsp_fixedamount/ objCVarQuotationCharges.SaleQuantity) : ((decimal)line.xollsp_unitamount+ (line.xollsp_fixedamount == null ? 0 : (decimal)line.xollsp_fixedamount / objCVarQuotationCharges.SaleQuantity))  ;
                    //objCVarQuotationCharges.SalePrice = line.xollsp_unitamount == null || line.xollsp_unitamount == 0 ? (line.xollsp_fixedamount == null ? 0 : (decimal)line.xollsp_fixedamount) : (decimal)line.xollsp_unitamount;
                    objCVarQuotationCharges.SaleAmount = objCVarQuotationCharges.SaleQuantity * objCVarQuotationCharges.SalePrice;
                    objCVarQuotationCharges.SaleCurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "transactioncurrencies",
                        ForwardingTableName = "Currencies",
                        CrmIdFieldName = "transactioncurrencyid",
                        CrmComparisonFieldName = "isocurrencycode",
                        CrmID = line._xollsp_currency_value,
                        ForwardingComparisonFieldName = "Code",
                        ForwardingID = 0,
                        SelectedColumns = "isocurrencycode,currencyname"
                    });


                    CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();

                    objCCurrencyDetails.GetList($"WHERE Currency_ID = {objCVarQuotationCharges.SaleCurrencyID} AND GETDATE() BETWEEN Convert(datetime,FromDate) AND Convert(datetime,ToDate)");

                    var ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 0;







                    objCVarQuotationCharges.SaleExchangeRate = ExchangeRate == 0 ? (line.xollsp_exchangerate == 0 || line.xollsp_exchangerate == null ? 1 : Math.Round(1 / (decimal)line.xollsp_exchangerate, 2)) : ExchangeRate;

                    objCVarQuotationCharges.SupplierID = await GetForwardingIDFromCrmID<crmAccount, CVarCustomers>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "accounts",
                        ForwardingTableName = "Customers",
                        CrmIdFieldName = "accountid",
                        CrmComparisonFieldName = "accountid",
                        CrmID = line._xollsp_vendor_value,
                        ForwardingComparisonFieldName = "crmCode",
                        ForwardingID = 0,
                        SelectedColumns = "name,mesco_arabicname,xollsp_vatnumber,address1_country,address1_city,address1_line1,address1_line2"
                    });
                    objCVarQuotationCharges.CreatorUserID = 4;
                    objCVarQuotationCharges.CreationDate = DateTime.Now;
                    objCVarQuotationCharges.SalesLineCrmCode = line.xollsp_quotesaleslineid;
                    objCVarQuotationCharges.CostLineCrmCode = "";
                    Common.Common.ReplaceNull(objCVarQuotationCharges);
                    QuotationChargesToBeInserted.Add(objCVarQuotationCharges);
                }
            }
            return QuotationChargesToBeInserted;
        }
        async private Task<List<CVarQuotationContainersAndPackages>> PrepareQuotationContainersAndPackages(JToken CostLinesToken, JToken SalesLinesToken)
        {
            List<IntegrationCrmLine> CostLines = CostLinesToken.ToObject<List<IntegrationCrmLine>>();
            List<IntegrationCrmLine> SalesLines = SalesLinesToken.ToObject<List<IntegrationCrmLine>>();
            List<CVarQuotationContainersAndPackages> QuotationContainersAndPackagesToBeInserted = new List<CVarQuotationContainersAndPackages>();
            CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();

            //Getting first line including unit of measure
            var Line = CostLines.Count > 0 ?
                CostLines.FirstOrDefault(cl => cl._xollsp_unitofmeasure_value != null) :
                SalesLines.FirstOrDefault(sl => sl._xollsp_unitofmeasure_value != null);
            if (Line != null)
            {
                CVarQuotationContainersAndPackages objCVarQuotationContainersAndPackages = new CVarQuotationContainersAndPackages();
                objCVarQuotationContainersAndPackages.GrossWeight = Line.xollsp_grossweightkg ?? 0;
                objCVarQuotationContainersAndPackages.Quantity = Line.xollsp_quantity == null ? 0 : (int)Line.xollsp_quantity;
                objCVarQuotationContainersAndPackages.CreatorUserID = 4;
                objCVarQuotationContainersAndPackages.CreationDate = DateTime.Now;
                if (Line.xollsp_transporttype == (decimal)TransportTypes.Ocean)
                {
                    objCVarQuotationContainersAndPackages.ContainerTypeID = await GetForwardingIDFromCrmID<crmUnitOfMeasure, CVarContainerTypes>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "xollsp_unitsofmeasures",
                        ForwardingTableName = "ContainerTypes",
                        CrmIdFieldName = "xollsp_unitsofmeasureid",
                        CrmComparisonFieldName = "xollsp_name",
                        CrmID = Line._xollsp_unitofmeasure_value,
                        ForwardingComparisonFieldName = "Name",
                        ForwardingID = 0
                    });
                }
                else if (Line.xollsp_transporttype == (decimal)TransportTypes.Air)
                {
                    objCVarQuotationContainersAndPackages.PackageTypeID = await GetForwardingIDFromCrmID<crmUnitOfMeasure, CVarContainerTypes>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "xollsp_unitsofmeasures",
                        ForwardingTableName = "PackageTypes",
                        CrmIdFieldName = "xollsp_unitsofmeasureid",
                        CrmComparisonFieldName = "xollsp_name",
                        CrmID = Line._xollsp_unitofmeasure_value,
                        ForwardingComparisonFieldName = "Name",
                        ForwardingID = 0
                    });
                    objCVarQuotationContainersAndPackages.Length = Line.xollsp_lenghtm ?? 0;
                    objCVarQuotationContainersAndPackages.Width = Line.xollsp_widthm ?? 0;
                    objCVarQuotationContainersAndPackages.Height = Line.xollsp_heightm ?? 0;
                    objCVarQuotationContainersAndPackages.Volume = Line.xollsp_volumem3 ?? 0;
                    objCVarQuotationContainersAndPackages.VolumetricWeight = Line.mesco_volumetricweightair2 ?? 0;
                    objCVarQuotationContainersAndPackages.ChargeableWeight = Line.mesco_chargeableweightair2 ?? 0;
                }
                objCVarQuotationContainersAndPackages.CreatorUserID = 4;
                objCVarQuotationContainersAndPackages.CreationDate = DateTime.Now;
                Common.Common.ReplaceNull(objCVarQuotationContainersAndPackages);
                QuotationContainersAndPackagesToBeInserted.Add(objCVarQuotationContainersAndPackages);
            }
            return QuotationContainersAndPackagesToBeInserted;
        }
        private string InsertQuotation(List<CVarQuotations> QuotationHeader, List<CVarQuotationRoute> QuotationRoute, List<CVarQuotationCharges> QuotationCharges, List<CVarQuotationContainersAndPackages> QuotationContainersAndPackages, string QuotationCrmID, string QuotationCode)
        {
            var checkException = new Exception();
            //Insert quotation header
            CQuotations objCQuotations = new CQuotations();
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CQuotationCharges objCQuotationCharges = new CQuotationCharges();
            CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
            CEmail objCEmail = new CEmail();
            long QuotationID = 0;
            long QuotationRouteID = 0;
            int _rowCount = 0;

            objCQuotations.GetListPaging(99, 1, $"WHERE Code LIKE '%{QuotationCode}%'", "ID", out _rowCount);
            var ExistingQuotationID = objCQuotations.lstCVarQuotations.Count > 0 ? objCQuotations.lstCVarQuotations[0].ID : 0;
            objCQuotationRoute.GetListPaging(99, 1, $"WHERE Code LIKE '%{QuotationCode}%'", "ID", out _rowCount);
            var ExistingQuotationRouteID = objCQuotationRoute.lstCVarQuotationRoute.Count > 0 ? objCQuotationRoute.lstCVarQuotationRoute[0].ID : 0;
            COperations objCOperations = new COperations();
            objCOperations.GetListPaging(999, 1, "WHERE QuotationRouteID = " + ExistingQuotationRouteID, "ID", out _rowCount);
            if (objCOperations.lstCVarOperations.Count == 0)
            {
                CcrmLog objCcrmLog = new CcrmLog();
                CcrmIDs objCcrmIDs = new CcrmIDs();
                objCcrmLog.DeleteList($"WHERE crmQuotationID = '{QuotationCode}'");
                objCcrmIDs.DeleteList($"WHERE ForwardingTableName = 'Quotations' AND crmID = '{QuotationCrmID}'");
                if (ExistingQuotationRouteID > 0)
                {
                    objCQuotationContainersAndPackages.DeleteList($"WHERE QuotationRouteID = {ExistingQuotationRouteID}");
                    objCQuotationCharges.DeleteList($"WHERE QuotationRouteID = {ExistingQuotationRouteID}");
                    objCEmailReceiver.DeleteList("WHERE EmailID IN (SELECT ID FROM Email WHERE QuotationRouteID = " + ExistingQuotationRouteID + ")");
                    objCEmail.DeleteList("WHERE QuotationRouteID = " + ExistingQuotationRouteID);
                    objCQuotationRoute.DeleteList($"WHERE ID = {ExistingQuotationRouteID}");
                }
                if (ExistingQuotationID > 0)
                    objCQuotations.DeleteList($"WHERE ID = {ExistingQuotationID}");

                try
                {
                    checkException = objCQuotations.SaveMethod(QuotationHeader);
                    if (checkException != null)
                        throw new InvalidOperationException($"Error while inserting quotation header");

                    objCQuotations.GetListPaging(1, 1, "WHERE ID = (SELECT MAX(ID) FROM Quotations)", "ID", out _rowCount);
                    QuotationID = objCQuotations.lstCVarQuotations[0].ID;

                    //Insert quotation route
                    QuotationRoute[0].QuotationID = QuotationID;
                    checkException = objCQuotationRoute.SaveMethod(QuotationRoute);
                    if (checkException != null)
                        throw new InvalidOperationException($"Error while inserting quotation route");

                    objCQuotationRoute.GetListPaging(1, 1, "WHERE ID = (SELECT MAX(ID) FROM QuotationRoute)", "ID", out _rowCount);
                    QuotationRouteID = objCQuotationRoute.lstCVarQuotationRoute[0].ID;

                    //Insert quotation charges
                    QuotationCharges.ForEach(item => item.QuotationRouteID = QuotationRouteID);
                    checkException = objCQuotationCharges.SaveMethod(QuotationCharges);
                    if (checkException != null)
                        throw new InvalidOperationException($"Error while inserting quotation charges");

                    //insert quotation containers and packages
                    QuotationContainersAndPackages.ForEach(item =>
                    {
                        item.QuotationRouteID = QuotationRouteID;
                        item.QuotationID = QuotationID;
                    });
                    checkException = objCQuotationContainersAndPackages.SaveMethod(QuotationContainersAndPackages);
                    if (checkException != null)
                        throw new InvalidOperationException($"Error while inserting quotation containers and packages");

                    //Notification
                    var SalesmanID = QuotationHeader[0].SalesmanID;
                    int ServiceID = 0;
                    if (QuotationHeader[0].TransportType == 1 && QuotationHeader[0].ShipmentType == 1)
                        ServiceID = 1; //FCL
                    if (QuotationHeader[0].TransportType == 1 && (QuotationHeader[0].ShipmentType == 2 || QuotationHeader[0].ShipmentType == 5))
                        ServiceID = 2; //LCL
                    if (QuotationHeader[0].TransportType == 2)
                        ServiceID = 3; //Air
                    if (QuotationHeader[0].DirectionType == 3)
                        ServiceID = 4; //Domestic
                    if (QuotationHeader[0].TransportType == 3)
                        ServiceID = 5; //Inland
                    var NotificationContent = new
                    {
                        Subject = $"Quotation {QuotationHeader[0].Code} is added from Dynamics CRM",
                        Body = $"Quotation {QuotationHeader[0].Code} is added from Dynamics CRM"
                    };
                    SendNotification(NotificationContent.Subject, NotificationContent.Body, (int)QuotationRouteID, SalesmanID, ServiceID);

                    List<CVarcrmIDs> LstCVarcrmIDs = new List<CVarcrmIDs>();
                    CVarcrmIDs objCVarcrmIDs = new CVarcrmIDs();
                    objCcrmIDs.DeleteList("WHERE ForwardingTableName = 'Quotations' AND ForwardingID = " + QuotationID);
                    objCVarcrmIDs.crmID = QuotationCrmID;
                    objCVarcrmIDs.ForwardingID = (int)QuotationID;
                    objCVarcrmIDs.crmTableName = "xollsp_tariffquotes";
                    objCVarcrmIDs.ForwardingTableName = "Quotations";
                    LstCVarcrmIDs.Add(objCVarcrmIDs);
                    objCcrmIDs.SaveMethod(LstCVarcrmIDs);
                    return $"Quotation {QuotationHeader[0].Code} is integrated successfully";
                }
                catch (Exception Ex)
                {
                    //delete inserted rows
                    if (QuotationRouteID > 0)
                    {
                        objCQuotationCharges.DeleteList("WHERE QuotationRouteID = " + QuotationRouteID);
                        objCQuotationContainersAndPackages.DeleteList("WHERE QuotationRouteID = " + QuotationRouteID);
                        objCEmailReceiver.DeleteList("WHERE EmailID IN (SELECT ID FROM Email WHERE QuotationRouteID = " + QuotationRouteID + ")");
                        objCEmail.DeleteList("WHERE QuotationRouteID = " + QuotationRouteID);
                        objCQuotationRoute.DeleteList("WHERE ID = " + QuotationRouteID);
                    }
                    if (QuotationID > 0)
                    {
                        objCQuotations.DeleteList("WHERE ID = " + QuotationID);
                    }

                    Console.WriteLine(Ex.Message);
                    return Ex.Message;
                }
            }
            else
            {
                if(objCOperations.lstCVarOperations[0].MasterOperationID != 0)
                {
                    COperations objCOperationsMaster = new COperations();
                    objCOperationsMaster.GetItem(objCOperations.lstCVarOperations[0].MasterOperationID);
                    return $"Quotation Already integrated and linked to House {objCOperations.lstCVarOperations[0].HouseNumber} in Operation {objCOperationsMaster.lstCVarOperations[0].Code}";
                }
                return $"Quotation Already integrated and linked to operation {objCOperations.lstCVarOperations[0].Code}";
            }
        }
        public bool ValidationCheck(JToken QuotationHeader, JToken crmLine) //To be continued with the required validations
        {
            bool IsValidQuotation = true;
            string missingFields = "";
            if (QuotationHeader["xollsp_importexport"].ToString() == "") //DirectionType
                missingFields += "DirectionType-";
            else if (QuotationHeader["xollsp_importexport"].ToString() == "300000001" && QuotationHeader["_xollsp_shipper_value"].ToString() == "" && QuotationHeader["_xollsp_customer_value"].ToString() == "")    //Shipper in case of export
                missingFields += "Shipper-";
            else if (QuotationHeader["xollsp_importexport"].ToString() == "300000000" && QuotationHeader["_xollsp_consignee_value"].ToString() == "" && QuotationHeader["_xollsp_customer_value"].ToString() == "")     //Consignee in case of import 
                missingFields += "Consignee-";

            if (QuotationHeader["xollsp_transporttype"] == null) missingFields += "TransportType-"; //TransportType
            if (QuotationHeader["xollsp_loadtype"] == null) missingFields += "ShipmentType-";   //ShipmentType
            if (QuotationHeader["_owningbusinessunit_value"].ToString() == "") missingFields += "Branch-";  //Branch
            if (QuotationHeader["_owninguser_value"].ToString() == "" && QuotationHeader["_owningteam_value"].ToString() == "" ) missingFields += "Salesman-";    //Salesman
            if (QuotationHeader["createdon"].ToString() == "") missingFields += "OpenDate-";    //OpenDate
            //if (QuotationHeader["xollsp_importexport"] == null) missingFields += "Directiontype-";    //Directiontype
            if(QuotationHeader["xollsp_importexport"].ToString() != "")
            if (Convert.ToInt32(QuotationHeader["xollsp_importexport"]) != (int)DirectionTypes.Domestic)
            {
                if (crmLine["_xollsp_from_value"].ToString() == "") missingFields += "POL-";    //POL
                if (crmLine["_xollsp_to_value"].ToString() == "") missingFields += "POD-";    //POD 

                //ShippingLine is not mandatory in case of Ocean LCL Quotations
                if (crmLine["_mesco_airline2_value"].ToString() == "" && crmLine["_mesco_shippingline_value"].ToString() == "" && !(QuotationHeader["xollsp_transporttype"].ToString() == "300000000" && QuotationHeader["xollsp_loadtype"].ToString() == "300000001"))
                    missingFields += "Line-";   //AirLine-ShippingLine
            }

            if (missingFields != "") IsValidQuotation = false;
            if (!IsValidQuotation)  //Insert Into CRM Log if Quotation is not valid
            {
                InsertIntoCRMLog(2, QuotationHeader["xollsp_quotenumber"].ToString(), 0, missingFields, 0, 0);

                var NotificationContent = new
                {
                    Subject = $"Quotation {QuotationHeader["xollsp_quotenumber"]} in Dynamics CRM Has missing Fields",
                    Body = $"Quotation {QuotationHeader["xollsp_quotenumber"]} missing fields are {missingFields} For further info see Dynamics CRM Log report"
                };
                //SendNotification(NotificationContent.Subject, NotificationContent.Body, 0); 
            }


            return IsValidQuotation;
        }
        private void InsertIntoCRMLog(int StatusCode, string crmQuotationID, int ForwardingQuotationID, string MissingFields, int UserID, int OperationID)
        {
            CVarcrmLog objCVarcrmLog = new CVarcrmLog();
            List<CVarcrmLog> crmlogList = new List<CVarcrmLog>();
            if (crmlogRecords.Select(x => x.crmQuotationID).Contains(crmQuotationID))
            {
                //Update
                objCVarcrmLog.ID = crmlogRecords.SingleOrDefault(x => x.crmQuotationID == crmQuotationID).ID;
                objCVarcrmLog.StatusCode = StatusCode;
                objCVarcrmLog.crmQuotationID = crmQuotationID;
                objCVarcrmLog.ForwardingQuotationID = ForwardingQuotationID;
                objCVarcrmLog.MissingFields = MissingFields;
                objCVarcrmLog.OperationID = OperationID;
                objCVarcrmLog.CreatedON = DateTime.Now;
                crmlogList.Add(objCVarcrmLog);
                objCcrmLog.SaveMethod(crmlogList);
            }
            else
            {
                //insert
                objCVarcrmLog.StatusCode = StatusCode;
                objCVarcrmLog.crmQuotationID = crmQuotationID;
                objCVarcrmLog.ForwardingQuotationID = ForwardingQuotationID;
                objCVarcrmLog.MissingFields = MissingFields;
                objCVarcrmLog.CreatedON = DateTime.Now;
                crmlogList.Add(objCVarcrmLog);
                objCcrmLog.SaveMethod(crmlogList);
            }
        }
        private void SendNotification(string Subject, String Body, int QuotationRouteID, int SalesmanID, int ServiceID)
        {
            var userIDs = new UsersController().LoadAllIDs($" WHERE ID IN (SELECT UserID FROM crmUserSalesmen WHERE SalesmanID = {SalesmanID}) AND ID IN (SELECT UserID FROM crmUserServices WHERE ServiceID = {ServiceID})");
            var Alarm = new LocalEmailsController();
            if (userIDs != "")
                Alarm.SendEmail(userIDs, Subject, Body, QuotationRouteID, 0, 0, 0, true, "0", 0, false, " Where 1=1", 25, 1, "ID DESC", SalesmanID);
        }
        private async Task<int> GetForwardingIDFromCrmID<TCrm, TForwarding>(IntegrationOptionsDTO options)
        {
            if (options.CrmID == null || options.CrmID == "")
                return 0;
            string NameOrCode = "";
            //Delete existing crmIDs
            CcrmIDs objCcrmIDs = new CcrmIDs();
            objCcrmIDs.DeleteList($"WHERE crmTableName = '{options.CrmTableName}' AND CrmID = '{options.CrmID}'");

            //Getting Crm Field
            string SelectedColumns = options.SelectedColumns == "" ? options.CrmComparisonFieldName : options.SelectedColumns;
            string FilterCondition = $"{options.CrmIdFieldName} eq '{options.CrmID}'";
            List<TCrm> CrmCollection = await GetcrmData<TCrm>(options.CrmTableName, SelectedColumns, FilterCondition);
            if (CrmCollection.Count > 0)
                NameOrCode = (string)typeof(TCrm).GetProperty(options.CrmComparisonFieldName).GetValue(CrmCollection[0]);

            //Getting required ForwardingID
            int ForwardingID;
            var ExistingRecordID = objCCustomizedDBCall.ExecuteQuery_Array($"SELECT ID FROM {options.ForwardingTableName} WHERE {options.ForwardingComparisonFieldName} = N'{NameOrCode.Replace("'", "''")}'");
            if (ExistingRecordID.Count > 0)
                ForwardingID = Convert.ToInt32(ExistingRecordID[0]);
            else
                ForwardingID = await GeTForeignKey(CrmCollection[0], options.ForwardingTableName);

            //insert correct crmID into crmIDs
            List<CVarcrmIDs> LstCVarcrmIDs = new List<CVarcrmIDs>();
            CVarcrmIDs objCVarcrmIDs = new CVarcrmIDs();
            objCVarcrmIDs.crmID = options.CrmID;
            objCVarcrmIDs.ForwardingID = ForwardingID;
            objCVarcrmIDs.crmTableName = options.CrmTableName;
            objCVarcrmIDs.ForwardingTableName = options.ForwardingTableName;
            LstCVarcrmIDs.Add(objCVarcrmIDs);
            objCcrmIDs.SaveMethod(LstCVarcrmIDs);

            return ForwardingID;
        }
        public async Task<string> ReIntegrateDefectedMasterData<T>(IntegrationOptionsDTO options)
        {
            IRestResponse Response = new RestResponse() { StatusCode = HttpStatusCode.NoContent };
            //Delete existing crmIDs
            CcrmIDs objCcrmIDs = new CcrmIDs();
            objCcrmIDs.DeleteList($"WHERE crmTableName = '{options.CrmTableName}' AND ForwardingID = {options.ForwardingID}");

            //check record existance on crm
            string FilterCondition = $"{options.CrmComparisonFieldName} eq '{options.SearchKey}'";
            List<T> crmCollection = await GetcrmData<T>(options.CrmTableName, options.SelectedColumns, FilterCondition);
            if (crmCollection.Count == 0)
                return "";

            //insert correct crmID into crmIDs
            List<CVarcrmIDs> LstCVarcrmIDs = new List<CVarcrmIDs>();
            CVarcrmIDs objCVarcrmIDs = new CVarcrmIDs();
            objCVarcrmIDs.crmID = (string)typeof(T).GetProperty(options.CrmIdFieldName).GetValue(crmCollection[0]);
            objCVarcrmIDs.ForwardingID = options.ForwardingID;
            objCVarcrmIDs.crmTableName = options.CrmTableName;
            objCVarcrmIDs.ForwardingTableName = options.ForwardingTableName;
            LstCVarcrmIDs.Add(objCVarcrmIDs);
            objCcrmIDs.SaveMethod(LstCVarcrmIDs);

            //Return crmID
            return (string)typeof(T).GetProperty(options.CrmIdFieldName).GetValue(crmCollection[0]);
        }
        [HttpGet]
        async public Task<string> LinkLCLQuotations(int pHouseID, int pMasterOperationID, int pQuotationRouteID)
        {
            string FilterCondition;
            string ReturnMessage = "";
            CInvoices objCInvoices = new CInvoices();
            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();

            if (pQuotationRouteID == 0)
            {
                COperations objCOperations = new COperations();
                objCOperations.UpdateList($"QuotationRouteID = Null WHERE ID = {pHouseID}");
                return $"House unlinked successfully!";
            }

            IRestResponse Response = new RestResponse();

            //Getting House Payables
            CPayables objCPayables = new CPayables();
            objCPayables.GetList("WHERE BillID = " + pHouseID);

            //Getting House Receivables
            CReceivables objCReceivables = new CReceivables();
            objCReceivables.GetList("WHERE HouseBillID = " + pHouseID);

            //Getting ChargeTypes
            CChargeTypes objCChargeTypes = new CChargeTypes();
            var ChargeTypesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,crmCode FROM ChargeTypes", typeof(CVarChargeTypes)).Cast<CVarChargeTypes>().ToList();

            //Getting Categories  
            CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
            var CategoryList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM ChargeTypeGroup", typeof(CVarChargeTypeGroup)).Cast<CVarChargeTypeGroup>().ToList();

            //Getting Currencies
            CCurrencies objCCurrencies = new CCurrencies();
            var CurrencyList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Code FROM Currencies", typeof(CVarCurrencies)).Cast<CVarCurrencies>().ToList();

            //Getting Quotation crmID to be able to get existed CostLines and SalesLines
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            objCQuotationRoute.GetItem(pQuotationRouteID);
            var QuotationCode = objCQuotationRoute.lstCVarQuotationRoute.Count > 0 ? objCQuotationRoute.lstCVarQuotationRoute[0].Code.Substring(0, 16) : "";
            if (QuotationCode == "")
                return "Sorry,Cannot get quotation crmID";

            //Getting crm CostLines
            var CrmQuotationHeader = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{QuotationCode}'");
            FilterCondition = $"_xollsp_tariffquote_value eq '{CrmQuotationHeader[0].xollsp_tariffquoteid}'&$expand=xollsp_Currency($select=isocurrencycode)";
            var crmCostLines = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", FilterCondition);

            //Getting crm SalesLines
            var crmSalesLines = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", FilterCondition);

            var QuoteLineModel = crmCostLines.Count > 0 ? (crmLine)crmCostLines[0] : (crmLine)crmSalesLines[0];
            //Preparing CostLines object


            //Preparing SalesLines object
            //List<QuoteSalesLine> ForwardingSalesLines = new List<QuoteSalesLine>();
            //foreach (var Receivable in objCReceivables.lstCVarReceivables)
            //{
            //    ForwardingSalesLines.Add(new QuoteSalesLine()
            //    {
            //        xollsp_quantity = Receivable.Quantity,
            //        xollsp_unitamount = Receivable.SalePrice,
            //        xollsp_totalamount = Receivable.SaleAmount,
            //        xollsp_exchangerate = (Receivable.ExchangeRate == 0 ? 1 : Math.Round(1 / Receivable.ExchangeRate, 10)),
            //        _xollsp_logisticservice_value = ChargeTypesList.FirstOrDefault(c => c.ID == Receivable.ChargeTypeID).crmCode,
            //        _xollsp_currency_value = await ReIntegrateDefectedMasterData<crmCurrency>(new IntegrationOptionsDTO
            //        {
            //            CrmTableName = "transactioncurrencies",
            //            ForwardingTableName = "Currencies",
            //            CrmIdFieldName = "transactioncurrencyid",
            //            CrmComparisonFieldName = "isocurrencycode",
            //            CrmID = "",
            //            ForwardingComparisonFieldName = "Code",
            //            ForwardingID = Receivable.CurrencyID,
            //            SelectedColumns = "isocurrencycode,currencyname",
            //            SearchKey = CurrencyList.FirstOrDefault(c => c.ID == Receivable.CurrencyID).Code
            //        }),
            //        xollsp_name = ChargeTypesList.FirstOrDefault(c => c.ID == Receivable.ChargeTypeID).Name,
            //        _mesco_vendor2_value = QuoteLineModel._mesco_vendor2_value,
            //        xollsp_importexport = QuoteLineModel.xollsp_importexport,
            //        xollsp_comments = QuoteLineModel.xollsp_comments,
            //        mesco_imo = QuoteLineModel.mesco_imo,
            //        new_freightterm = QuoteLineModel.new_freightterm,
            //        _owningbusinessunit_value = QuoteLineModel._owningbusinessunit_value,
            //        _owninguser_value = QuoteLineModel._owninguser_value,
            //        _mesco_shippingline_value = QuoteLineModel._mesco_shippingline_value,
            //        xollsp_validto = QuoteLineModel.xollsp_validto,
            //        xollsp_validfrom = QuoteLineModel.xollsp_validfrom,
            //        xollsp_sortingsequence = QuoteLineModel.xollsp_sortingsequence,
            //        _mesco_agent2_value = QuoteLineModel._mesco_agent2_value,
            //        xollsp_transittime = QuoteLineModel.xollsp_transittime,
            //        xollsp_commoditydescription = QuoteLineModel.xollsp_commoditydescription,
            //        mesco_stackable = QuoteLineModel.mesco_stackable,
            //        mesco_turnable = QuoteLineModel.mesco_turnable,
            //        xollsp_grossweightkg = QuoteLineModel.xollsp_grossweightkg,
            //        xollsp_fixedamount = 0,
            //        timezoneruleversionnumber = QuoteLineModel.timezoneruleversionnumber,
            //        xollsp_unitmeasures = QuoteLineModel.xollsp_unitmeasures,
            //        statuscode = QuoteLineModel.statuscode,
            //        mesco_acid = QuoteLineModel.mesco_acid,
            //        xollsp_transporttype = QuoteLineModel.xollsp_transporttype,
            //        mesco_freedays = QuoteLineModel.mesco_freedays,
            //        new_freightcontractholder = QuoteLineModel.new_freightcontractholder,
            //        versionnumber = QuoteLineModel.versionnumber,
            //        xollsp_stepsize = QuoteLineModel.xollsp_stepsize,
            //        xollsp_roundingmethod = QuoteLineModel.xollsp_roundingmethod,
            //        _xollsp_to_value = QuoteLineModel._xollsp_to_value,
            //        xollsp_noofunits = QuoteLineModel.xollsp_noofunits,
            //        mesco_clearancetype = QuoteLineModel.mesco_clearancetype,
            //        mesco_superdrymeasure = QuoteLineModel.mesco_superdrymeasure,
            //        _xollsp_from_value = QuoteLineModel._xollsp_from_value,
            //        _xollsp_commoditygroup_value = QuoteLineModel._xollsp_commoditygroup_value,
            //        _xollsp_tariffquote_value = QuoteLineModel._xollsp_tariffquote_value,
            //        xollsp_loadtype = QuoteLineModel.xollsp_loadtype,
            //        statecode = QuoteLineModel.statecode,
            //        _mesco_airline2_value = QuoteLineModel._mesco_airline2_value,
            //        mesco_nooftrips = QuoteLineModel.mesco_nooftrips
            //    });
            //}

            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            //Freight items
            var crmFreightCostLines = crmCostLines.Where(c => c.xollsp_Currency.isocurrencycode != "EGP").ToList();
            var crmFreightSalesLines = crmSalesLines.Where(c => c.xollsp_Currency.isocurrencycode != "EGP").ToList();
            foreach (var Line in crmFreightCostLines)
            {
                List<CVarPayables> lst = new List<CVarPayables>();
                CVarPayables objCVarPayables = new CVarPayables();
                var CreationData = objCPayables.lstCVarPayables.SingleOrDefault(p => p.crmCode == Line.xollsp_quotecostlineid);

                if (CreationData != null)
                {
                    bool IsPayableIncludedInPR = false;
                    objCA_PaymentRequestDetails.GetList($"WHERE PayableID={CreationData.ID}");
                    if (objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                        IsPayableIncludedInPR = true;

                    if (!IsPayableIncludedInPR) { 
                        //Update Existing freight items estimated cost
                        CreationData.QuotationCost = Line.xollsp_totalamount ?? 0;
                        CreationData.CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = Line._xollsp_currency_value,
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = 0,
                            SelectedColumns = "isocurrencycode,currencyname"
                        });

                        objCCurrencyDetails.GetList($"WHERE Currency_ID = {CreationData.CurrencyID} AND GETDATE() BETWEEN FromDate AND ToDate");
                        CreationData.ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1;
                        CreationData.ModificationDate = DateTime.Now;
                        CreationData.ModificatorUserID = 4;
                        lst.Add(CreationData);
                        objCPayables.SaveMethod(lst);
                    }
                }
                else
                {
                    var checkIfExistedBefore = new CCustomizedDBCall();
                    string existedBefore = checkIfExistedBefore.CallStringFunction($"Select top 1 ID from CRM_Data_Audit where Type=1 AND OperationID={pMasterOperationID} AND BillID={pHouseID} AND crmCode='{Line.xollsp_quotecostlineid}'");
                    if (int.TryParse(existedBefore, out int exID))
                    {
                        if (exID > 0)
                        {
                            continue;
                        }
                    }

                    //Insert freight items
                    objCVarPayables.OperationID = pMasterOperationID;
                    objCVarPayables.BillID = pHouseID;
                    objCVarPayables.ChargeTypeID = ChargeTypesList.SingleOrDefault(ch => ch.crmCode == Line._xollsp_logisticservice_value).ID;
                    //objCVarPayables.ExchangeRate = ((decimal)Line.xollsp_exchangerate == 0 || Line.xollsp_exchangerate == null ? 1 : Math.Round(1 / (decimal)Line.xollsp_exchangerate, 2));

                    objCVarPayables.CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "transactioncurrencies",
                        ForwardingTableName = "Currencies",
                        CrmIdFieldName = "transactioncurrencyid",
                        CrmComparisonFieldName = "isocurrencycode",
                        CrmID = Line._xollsp_currency_value,
                        ForwardingComparisonFieldName = "Code",
                        ForwardingID = 0,
                        SelectedColumns = "isocurrencycode,currencyname"
                    });
                    objCCurrencyDetails.GetList($"WHERE Currency_ID = {objCVarPayables.CurrencyID} AND GETDATE() BETWEEN FromDate AND ToDate");
                    objCVarPayables.ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1;
                    objCVarPayables.CreatorUserID = 4;
                    objCVarPayables.CreationDate = DateTime.Now;
                    objCVarPayables.Quantity = (decimal)Line.xollsp_quantity;
                    objCVarPayables.QuotationCost = (decimal)Line.xollsp_totalamount;
                    objCVarPayables.crmCode = Line.xollsp_quotecostlineid;
                    objCVarPayables.IsPurchased = false;
                    objCVarPayables.CategoryID = CategoryList.FirstOrDefault(c => c.Name == "LCL FREIGHT FEES").ID;
                    Common.Common.ReplaceNull(objCVarPayables);

                    if (objCQuotationRoute.lstCVarQuotationRoute[0].Code.Contains("LCL") && objCVarPayables.QuotationCost == 0)
                    {
                        continue;
                    }

                    lst.Add(objCVarPayables);
                    objCPayables.SaveMethod(lst);
                }
            }

            foreach (var Line in crmFreightSalesLines)
            {
                List<CVarReceivables> lst = new List<CVarReceivables>();
                CVarReceivables objCVarReceivables = new CVarReceivables();
                var CreationData = objCReceivables.lstCVarReceivables.SingleOrDefault(p => p.crmCode == Line.xollsp_quotesaleslineid);

                if (CreationData != null)
                {
                    bool IsReceivableIncludedInApprovedInvoice = false;
                    objCInvoices.GetItem(CreationData.InvoiceID);
                    if (objCInvoices.lstCVarInvoices.Count > 0 && objCInvoices.lstCVarInvoices[0].IsApproved)
                        IsReceivableIncludedInApprovedInvoice = true;

                    if (!IsReceivableIncludedInApprovedInvoice)
                    {
                        //Update Existing freight items estimated cost
                        CreationData.Quantity = Line.xollsp_quantity == null ? 1 : (decimal)Line.xollsp_quantity;
                        CreationData.SalePrice = Line.xollsp_unitamount == null || Line.xollsp_unitamount == 0 ? (Line.xollsp_fixedamount == null ? 0 : (decimal)Line.xollsp_fixedamount/ CreationData.Quantity) : (decimal)Line.xollsp_unitamount;
                        //CreationData.SalePrice = Line.xollsp_unitamount == null || Line.xollsp_unitamount == 0 ? (Line.xollsp_fixedamount == null ? 0 : (decimal)Line.xollsp_fixedamount) : (decimal)Line.xollsp_unitamount;
                        CreationData.SaleAmount = CreationData.Quantity * CreationData.SalePrice;
                        CreationData.CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = Line._xollsp_currency_value,
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = 0,
                            SelectedColumns = "isocurrencycode,currencyname"
                        });

                        objCCurrencyDetails.GetList($"WHERE Currency_ID = {CreationData.CurrencyID} AND GETDATE() BETWEEN FromDate AND ToDate");
                        CreationData.ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1;
                        CreationData.ModificationDate = DateTime.Now;
                        CreationData.ModificatorUserID = 4;
                        lst.Add(CreationData);
                        objCReceivables.SaveMethod(lst);

                        //Update invoices headers in case of an update happens in the receivables amount for unapproved invoices
                        if (CreationData.InvoiceID > 0)
                        {
                            if(objCDefaults.lstCVarDefaults.Count == 0)
                                objCDefaults.GetList(" WHERE 1=1");

                            string pUpdateClause = "";
                            //SET AmountWithoutVAT
                            pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(ISNULL(SalePrice,0) * ISNULL(Quantity,1))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + CreationData.InvoiceID.ToString() + " AND IsDeleted=0),2)";
                            pUpdateClause += " , CurrencyID = " + CreationData.CurrencyID;
                            pUpdateClause += " , ExchangeRate = " + CreationData.ExchangeRate;
                            pUpdateClause += " WHERE ID = " + CreationData.InvoiceID.ToString();
                            objCInvoices.UpdateList(pUpdateClause);

                            //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                            pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2)";
                            pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)";
                            if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                                pUpdateClause += " , Amount = - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2) + ROUND((SELECT SUM(ISNULL(SaleAmount,0))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + CreationData.InvoiceID.ToString() + " AND IsDeleted=0),2)";
                            else
                                pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + ROUND( (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2) - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)),2)";
                            pUpdateClause += " WHERE ID = " + CreationData.InvoiceID.ToString();
                            objCInvoices.UpdateList(pUpdateClause);
                        }
                    }
                }
                else
                {
                    var checkIfExistedBefore = new CCustomizedDBCall();
                    string existedBefore = checkIfExistedBefore.CallStringFunction($"Select top 1 ID from CRM_Data_Audit where Type=2 AND OperationID={pMasterOperationID} AND BillID={pHouseID} AND crmCode='{Line.xollsp_quotesaleslineid}'");
                    if (int.TryParse(existedBefore, out int exID))
                    {
                        if (exID > 0)
                        {
                            continue;
                        }
                    }
                    //Insert freight items
                    objCVarReceivables.OperationID = pMasterOperationID;
                    objCVarReceivables.HouseBillID = pHouseID;
                    objCVarReceivables.ChargeTypeID = ChargeTypesList.SingleOrDefault(ch => ch.crmCode == Line._xollsp_logisticservice_value).ID;
                    //objCVarReceivables.ExchangeRate = ((decimal)Line.xollsp_exchangerate == 0 || Line.xollsp_exchangerate == null ? 1 : Math.Round(1 / (decimal)Line.xollsp_exchangerate, 2));
                    objCVarReceivables.CurrencyID = await GetForwardingIDFromCrmID<crmCurrency, CVarCurrencies>(new IntegrationOptionsDTO
                    {
                        CrmTableName = "transactioncurrencies",
                        ForwardingTableName = "Currencies",
                        CrmIdFieldName = "transactioncurrencyid",
                        CrmComparisonFieldName = "isocurrencycode",
                        CrmID = Line._xollsp_currency_value,
                        ForwardingComparisonFieldName = "Code",
                        ForwardingID = 0,
                        SelectedColumns = "isocurrencycode,currencyname"
                    });
                    objCCurrencyDetails.GetList($"WHERE Currency_ID = {objCVarReceivables.CurrencyID} AND GETDATE() BETWEEN FromDate AND ToDate");
                    objCVarReceivables.ExchangeRate = objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1;
                    objCVarReceivables.CreatorUserID = 4;
                    objCVarReceivables.CreationDate = DateTime.Now;
                    objCVarReceivables.Quantity = Line.xollsp_quantity == null ? 1 : (decimal)Line.xollsp_quantity;
                    objCVarReceivables.SalePrice = Line.xollsp_unitamount == null || Line.xollsp_unitamount == 0 ? (Line.xollsp_fixedamount == null ? 0 : (decimal)Line.xollsp_fixedamount / objCVarReceivables.Quantity) : (decimal)Line.xollsp_unitamount;
                    //objCVarReceivables.SalePrice = Line.xollsp_unitamount == null || Line.xollsp_unitamount == 0 ? (Line.xollsp_fixedamount == null ? 0 : (decimal)Line.xollsp_fixedamount) : (decimal)Line.xollsp_unitamount;
                    objCVarReceivables.SaleAmount = objCVarReceivables.Quantity * objCVarReceivables.SalePrice;
                    objCVarReceivables.crmCode = Line.xollsp_quotesaleslineid;
                    objCVarReceivables.CategoryID = CategoryList.FirstOrDefault(c => c.Name == "LCL FREIGHT FEES").ID;
                    Common.Common.ReplaceNull(objCVarReceivables);

                    if(objCQuotationRoute.lstCVarQuotationRoute[0].Code.Contains("LCL") && objCVarReceivables.SaleAmount == 0)
                    {
                        continue;
                    }

                    lst.Add(objCVarReceivables);
                    objCReceivables.SaveMethod(lst);
                }
            }

            //Getting objects to be modified in crm
            //var CostLinesToBeInserted = crmFreightCostLines.Count > 0 ? ForwardingCostLines.Except(crmFreightCostLines).ToList() : ForwardingCostLines;
            //var SalesLinesToBeInserted = crmFreightSalesLines.Count > 0 ? ForwardingSalesLines.Except(crmFreightSalesLines).ToList() : ForwardingSalesLines;

            ////Insert
            //var config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteCostLine, crmLine>(); });
            //IMapper mapper = config.CreateMapper();
            //Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(CostLinesToBeInserted), "xollsp_quotecostlines", CrmQuotationHeader[0].xollsp_tariffquoteid);
            //ReturnMessage = CheckResponse(Response, HttpStatusCode.NoContent, "An error occured while inserting CostLines");

            //config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteSalesLine, crmLine>(); });
            //mapper = config.CreateMapper();
            //Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(SalesLinesToBeInserted), "xollsp_quotesaleslines", CrmQuotationHeader[0].xollsp_tariffquoteid);
            //ReturnMessage = CheckResponse(Response, HttpStatusCode.NoContent, "An error occured while inserting SalesLines");

            if (ReturnMessage == "")
            {
                COperations objCOperations = new COperations();
                objCOperations.UpdateList($"SalesmanID = (SELECT SalesmanID FROM Quotations WHERE ID = (SELECT QuotationID FROM QuotationRoute WHERE ID = {pQuotationRouteID})),QuotationRouteID = {pQuotationRouteID} WHERE ID = {pHouseID}");
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();

                //Removing the notification after successful integration
                objCEmailReceiver.UpdateList($"IsAlarm = 0 where EmailID IN (SELECT ID From Email WHERE QuotationRouteID = {pQuotationRouteID})");
            }
            return ReturnMessage;
        }

        public static void WriteToLog(string message,string Quote)
        {
            try
            {
                string directoryPath = HostingEnvironment.MapPath("~/api/Defaults/DynamicsMES");
                bool exists = Directory.Exists(directoryPath);
                if (!exists)
                    Directory.CreateDirectory(directoryPath);


                string pathStringForLog = Path.Combine(directoryPath, "DynamicsMES_" + Quote + "_"+ DateTime.Now.ToString("dd_MM_yyyy") + ".txt");
                using (StreamWriter writer = new StreamWriter(pathStringForLog, true))
                {
                    writer.WriteLine($"[Date: {DateTime.Now.ToString("dd_MM_yyyy___hh_mm_ss")}] => {message} \n");
                }
            }
            catch (Exception ex)
            {

            }
        }



        [HttpGet]
        async public Task<string> UpdateDynamicsQuotations(int pOperationID)
        {
            //i need the back integration to work only for mesco production to prevent testing from changing crm data
            string fname = System.Web.Hosting.HostingEnvironment.MapPath("~/");
            //File.WriteAllText(fname + "path.txt", fname);
            if (!fname.Contains("IST\\WEBPublish\\Forwarding MESCO\\ForwardingMesco"))
                return "";

            //Get Quotation Code
            string ReturnMessage = "";
            int _rowCount = 0;
            var OperationsToBeRevisioned = new List<CVarOperations>();  //may be more than one in case of LCL
            COperations objCOperations = new COperations();
            objCOperations.GetItem(pOperationID);
            var Operation = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations[0] : null;
            objCOperations.GetListPaging(9999, 1, $"WHERE MasterOperationID = {pOperationID} AND QuotationRouteID IS NOT NULL", "ID", out _rowCount);
            var Houses = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations : null;
            string Message = "";
            CCRMQuotationCloseLog cCRMQuotationCloseLog = new CCRMQuotationCloseLog();
            if (Houses != null)
                OperationsToBeRevisioned = Houses;
            else if (Operation == null || Operation.QuotationRouteID == 0)
                return "";
            else
                OperationsToBeRevisioned.Add(Operation);

            //Getting ChargeTypes
            CChargeTypes objCChargeTypes = new CChargeTypes();
            var ChargeTypesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name,crmCode FROM ChargeTypes", typeof(CVarChargeTypes)).Cast<CVarChargeTypes>().ToList();

            //Getting Currencies
            CCurrencies objCCurrencies = new CCurrencies();
            var CurrencyList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Code FROM Currencies", typeof(CVarCurrencies)).Cast<CVarCurrencies>().ToList();
            foreach (var item in OperationsToBeRevisioned)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                objCQuotationRoute.GetItem(item.QuotationRouteID);
                var QuotationRoute = objCQuotationRoute.lstCVarQuotationRoute.Count > 0 ? objCQuotationRoute.lstCVarQuotationRoute[0] : null;
                if (QuotationRoute == null)
                    continue;
                var QuotationCode = QuotationRoute.Code.Substring(0, 16);
                var ForwardingTotalCost = (decimal)0;
                var ForwardingTotalSale = (decimal)0;
                //Getting a clone from quotation header
                var OldQuotationHeader = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{QuotationCode}' and statecode eq {(int)StateCodes.Active}");
                if (OldQuotationHeader.Count == 0)
                    return "";
                var OldCostLines = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");
                var OldSalesLines = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");
                var OldCrmLine = OldSalesLines.Count > 0 ? (crmLine)OldSalesLines[0] : (crmLine)OldCostLines[0];

                //Getting Payables
                CPayables objCPayables = new CPayables();
                objCPayables.GetList($"WHERE {(Houses == null ? "OperationID" : "BillID")} = {item.ID} and (AccNoteID <=0 or AccNoteID is null) and ( id not in (select PayableID from A_PaymentRequestDetails where (PaymentRequestID in (select id from A_PaymentRequest where IsApprovedSettlement = 1 )) and   (ActualCost = 0  or ActualCost is null)))");

                //Getting Receivables
                CReceivables objCReceivables = new CReceivables();
                objCReceivables.GetList($"WHERE {(Houses == null ? "OperationID" : "HouseBillID")} = {item.ID} and not exists (select  OperationID from vwinvoices where InvoiceStatus like '%cancelled%' and id = InvoiceID)");


                List<QuoteCostLine> ForwardingCostLines = new List<QuoteCostLine>();
                foreach (var Payable in objCPayables.lstCVarPayables)
                {
                    ForwardingCostLines.Add(new QuoteCostLine()
                    {
                        xollsp_quotecostlineid = Payable.crmCode,
                        xollsp_quantity = Payable.Quantity == 0 ? 1 : Payable.Quantity,
                        xollsp_unitamount = Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : Payable.CostPrice,
                        xollsp_totalamount = Payable.CostAmount == 0 ? Payable.QuotationCost : Payable.CostAmount,
                        xollsp_exchangerate = (Payable.ExchangeRate == 0 ? 1 : Math.Round(1 / Payable.ExchangeRate, 10)),
                        _xollsp_logisticservice_value = ChargeTypesList.FirstOrDefault(c => c.ID == Payable.ChargeTypeID).crmCode,
                        _xollsp_currency_value = await ReIntegrateDefectedMasterData<crmCurrency>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = "",
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = Payable.CurrencyID,
                            SelectedColumns = "isocurrencycode,currencyname",
                            SearchKey = CurrencyList.FirstOrDefault(c => c.ID == Payable.CurrencyID).Code
                        }),
                        xollsp_name = ChargeTypesList.FirstOrDefault(c => c.ID == Payable.ChargeTypeID).Name,
                        _mesco_vendor2_value = OldCrmLine._mesco_vendor2_value,
                        xollsp_importexport = OldCrmLine.xollsp_importexport,
                        xollsp_comments = OldCrmLine.xollsp_comments,
                        mesco_imo = OldCrmLine.mesco_imo,
                        new_freightterm = OldCrmLine.new_freightterm,
                        _owningbusinessunit_value = OldCrmLine._owningbusinessunit_value,
                        _owninguser_value = OldCrmLine._owninguser_value,
                        _mesco_shippingline_value = OldCrmLine._mesco_shippingline_value,
                        xollsp_validto = OldCrmLine.xollsp_validto,
                        xollsp_validfrom = OldCrmLine.xollsp_validfrom,
                        xollsp_sortingsequence = OldCrmLine.xollsp_sortingsequence,
                        _mesco_agent2_value = OldCrmLine._mesco_agent2_value,
                        xollsp_transittime = OldCrmLine.xollsp_transittime,
                        xollsp_commoditydescription = OldCrmLine.xollsp_commoditydescription,
                        mesco_stackable = OldCrmLine.mesco_stackable,
                        mesco_turnable = OldCrmLine.mesco_turnable,
                        xollsp_grossweightkg = OldCrmLine.xollsp_grossweightkg,
                        xollsp_fixedamount = 0,
                        timezoneruleversionnumber = OldCrmLine.timezoneruleversionnumber,
                        xollsp_unitmeasures = OldCrmLine.xollsp_unitmeasures,
                        statuscode = OldCrmLine.statuscode,
                        mesco_acid = OldCrmLine.mesco_acid,
                        xollsp_transporttype = OldCrmLine.xollsp_transporttype,
                        mesco_freedays = OldCrmLine.mesco_freedays,
                        new_freightcontractholder = OldCrmLine.new_freightcontractholder,
                        versionnumber = OldCrmLine.versionnumber,
                        xollsp_stepsize = OldCrmLine.xollsp_stepsize,
                        xollsp_roundingmethod = OldCrmLine.xollsp_roundingmethod,
                        _xollsp_to_value = OldCrmLine._xollsp_to_value,
                        xollsp_noofunits = OldCrmLine.xollsp_noofunits,
                        mesco_clearancetype = OldCrmLine.mesco_clearancetype,
                        mesco_superdrymeasure = OldCrmLine.mesco_superdrymeasure,
                        _xollsp_from_value = OldCrmLine._xollsp_from_value,
                        _xollsp_commoditygroup_value = OldCrmLine._xollsp_commoditygroup_value,
                        _xollsp_tariffquote_value = OldCrmLine._xollsp_tariffquote_value,
                        xollsp_loadtype = OldCrmLine.xollsp_loadtype,
                        statecode = OldCrmLine.statecode,
                        _mesco_airline2_value = OldCrmLine._mesco_airline2_value,
                        mesco_nooftrips = OldCrmLine.mesco_nooftrips,
                        _xollsp_unitofmeasure_value = OldCrmLine._xollsp_unitofmeasure_value ,
                        xollsp_totalamountbase = (((Payable.Quantity == 0 ? 1 : Payable.Quantity) * (Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : Payable.CostPrice)) * (Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10)))
                        ,
                        xollsp_unitamountbase = ((Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10)) * Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : (Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10) * Payable.CostPrice)) ,
                        xollsp_fixedamountbase = 0

                    });
                }

                //Preparing SalesLines object
                List<QuoteSalesLine> ForwardingSalesLines = new List<QuoteSalesLine>();
                foreach (var Receivable in objCReceivables.lstCVarReceivables)
                {
                    decimal quantity = Receivable.Quantity == 0 ? 1 : Receivable.Quantity;
                    decimal exchangeRate = Receivable.ExchangeRate == 0 ? 1 : Receivable.ExchangeRate;
                    decimal TotalAmountBase = (quantity * Receivable.SalePrice) * exchangeRate;
                    decimal UnitAmountBase = ( Receivable.SalePrice) * exchangeRate;

                    ForwardingSalesLines.Add(new QuoteSalesLine()
                    {
                        xollsp_quotesaleslineid = Receivable.crmCode,
                        xollsp_quantity = Receivable.Quantity,
                        xollsp_unitamount = Receivable.SalePrice,
                        xollsp_totalamount = Receivable.SaleAmount,
                        xollsp_exchangerate = (Receivable.ExchangeRate == 0 ? 1 : Math.Round(1 / Receivable.ExchangeRate, 10)),
                        _xollsp_logisticservice_value = ChargeTypesList.FirstOrDefault(c => c.ID == Receivable.ChargeTypeID).crmCode,
                        _xollsp_currency_value = await ReIntegrateDefectedMasterData<crmCurrency>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = "",
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = Receivable.CurrencyID,
                            SelectedColumns = "isocurrencycode,currencyname",
                            SearchKey = CurrencyList.FirstOrDefault(c => c.ID == Receivable.CurrencyID).Code
                        }),
                        xollsp_name = ChargeTypesList.FirstOrDefault(c => c.ID == Receivable.ChargeTypeID).Name,
                        _mesco_vendor2_value = OldCrmLine._mesco_vendor2_value,
                        xollsp_importexport = OldCrmLine.xollsp_importexport,
                        xollsp_comments = OldCrmLine.xollsp_comments,
                        mesco_imo = OldCrmLine.mesco_imo,
                        new_freightterm = OldCrmLine.new_freightterm,
                        _owningbusinessunit_value = OldCrmLine._owningbusinessunit_value,
                        _owninguser_value = OldCrmLine._owninguser_value,
                        _mesco_shippingline_value = OldCrmLine._mesco_shippingline_value,
                        xollsp_validto = OldCrmLine.xollsp_validto,
                        xollsp_validfrom = OldCrmLine.xollsp_validfrom,
                        xollsp_sortingsequence = OldCrmLine.xollsp_sortingsequence,
                        _mesco_agent2_value = OldCrmLine._mesco_agent2_value,
                        xollsp_transittime = OldCrmLine.xollsp_transittime,
                        xollsp_commoditydescription = OldCrmLine.xollsp_commoditydescription,
                        mesco_stackable = OldCrmLine.mesco_stackable,
                        mesco_turnable = OldCrmLine.mesco_turnable,
                        xollsp_grossweightkg = OldCrmLine.xollsp_grossweightkg,
                        xollsp_fixedamount = 0,
                        timezoneruleversionnumber = OldCrmLine.timezoneruleversionnumber,
                        xollsp_unitmeasures = OldCrmLine.xollsp_unitmeasures,
                        statuscode = OldCrmLine.statuscode,
                        mesco_acid = OldCrmLine.mesco_acid,
                        xollsp_transporttype = OldCrmLine.xollsp_transporttype,
                        mesco_freedays = OldCrmLine.mesco_freedays,
                        new_freightcontractholder = OldCrmLine.new_freightcontractholder,
                        versionnumber = OldCrmLine.versionnumber,
                        xollsp_stepsize = OldCrmLine.xollsp_stepsize,
                        xollsp_roundingmethod = OldCrmLine.xollsp_roundingmethod,
                        _xollsp_to_value = OldCrmLine._xollsp_to_value,
                        xollsp_noofunits = OldCrmLine.xollsp_noofunits,
                        mesco_clearancetype = OldCrmLine.mesco_clearancetype,
                        mesco_superdrymeasure = OldCrmLine.mesco_superdrymeasure,
                        _xollsp_from_value = OldCrmLine._xollsp_from_value,
                        _xollsp_commoditygroup_value = OldCrmLine._xollsp_commoditygroup_value,
                        _xollsp_tariffquote_value = OldCrmLine._xollsp_tariffquote_value,
                        xollsp_loadtype = OldCrmLine.xollsp_loadtype,
                        statecode = OldCrmLine.statecode,
                        _mesco_airline2_value = OldCrmLine._mesco_airline2_value,
                        mesco_nooftrips = OldCrmLine.mesco_nooftrips,
                        _xollsp_unitofmeasure_value = OldCrmLine._xollsp_unitofmeasure_value,
                        xollsp_totalamountbase = TotalAmountBase,
                         xollsp_unitamountbase = UnitAmountBase,
                        xollsp_fixedamountbase = 0
                    });


                    ForwardingTotalSale += TotalAmountBase;
                }

                //var CostLinesToBeInserted = ForwardingCostLines.Except(OldCostLines).ToList();
                var CostLinesToBeInserted = ForwardingCostLines.Where(x => !OldCostLines.Contains(x)).ToList();
                var CostLinesToBeUpdated = ForwardingCostLines.Intersect(OldCostLines).ToList();
                var CostLinesToBeDeleted = OldCostLines.Except(ForwardingCostLines).ToList();

                //var SalesLinesToBeInserted = ForwardingSalesLines.Except(OldSalesLines).ToList();
                var SalesLinesToBeInserted = ForwardingSalesLines.Where(x => !OldSalesLines.Contains(x)).ToList();
                var SalesLinesToBeUpdated = ForwardingSalesLines.Intersect(OldSalesLines).ToList();
                var SalesLinesToBeDeleted = OldSalesLines.Except(ForwardingSalesLines).ToList();



                //string jsonData = "\n" + "-------------------CostLinesToBeInserted-------------------------" + "\n" + JsonConvert.SerializeObject(CostLinesToBeInserted);
                //jsonData += "\n" + "-------------------CostLinesToBeUpdated-------------------------" + "\n" + JsonConvert.SerializeObject(CostLinesToBeUpdated);
                //jsonData += "\n" + "-------------------CostLinesToBeDeleted-------------------------" + "\n" + JsonConvert.SerializeObject(CostLinesToBeDeleted);
                string jsonData = "\n" + "-------------------OldCostLines-------------------------" + "\n" + JsonConvert.SerializeObject(OldCostLines);
                jsonData += "\n" + "-------------------ForwardingCostLines-------------------------" + "\n" + JsonConvert.SerializeObject(ForwardingCostLines);

                //jsonData += "\n" + "-------------------SalesLinesToBeInserted-------------------------" + "\n" + JsonConvert.SerializeObject(SalesLinesToBeInserted);
                //jsonData += "\n" + "-------------------SalesLinesToBeUpdated-------------------------" + "\n" + JsonConvert.SerializeObject(SalesLinesToBeUpdated);
                //jsonData += "\n" + "-------------------SalesLinesToBeDeleted-------------------------" + "\n" + JsonConvert.SerializeObject(SalesLinesToBeDeleted);
                jsonData += "\n" + "-------------------OldSalesLines-------------------------" + "\n" + JsonConvert.SerializeObject(OldSalesLines);
                jsonData += "\n" + "-------------------ForwardingSalesLines-------------------------" + "\n" + JsonConvert.SerializeObject(ForwardingSalesLines);


                WriteToLog(jsonData, QuotationCode);

                IRestResponse Response = new RestResponse() { StatusCode = HttpStatusCode.NoContent };
                //CostLinesToBeDeleted.ForEach(async line =>
                //{
                //    await DeletecrmData("xollsp_quotecostlines", line.xollsp_quotecostlineid);
                //});

                //SalesLinesToBeDeleted.ForEach(async line =>
                //{
                //    await DeletecrmData("xollsp_quotesaleslines", line.xollsp_quotesaleslineid);
                //});

                //var config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteCostLine, crmLine>(); });
                //IMapper mapper = config.CreateMapper();
                //if (CostLinesToBeInserted.Count > 0)
                //{
                //    Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(CostLinesToBeInserted), "xollsp_quotecostlines", OldQuotationHeader[0].xollsp_tariffquoteid);
                //    if (Response.StatusCode != HttpStatusCode.NoContent)
                //        return $"Cannot insert cost lines for quotation {QuotationCode} >> Error: {Response.Content}";
                //}

                //config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteCostLine, crmLine>(); });
                //mapper = config.CreateMapper();
                //if (SalesLinesToBeInserted.Count > 0)
                //{
                //    Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(SalesLinesToBeInserted), "xollsp_quotesaleslines", OldQuotationHeader[0].xollsp_tariffquoteid);
                //    if (Response.StatusCode != HttpStatusCode.NoContent)
                //        return $"Cannot insert sales lines for quotation {QuotationCode} >> Error: {Response.Content}";
                //}

                //foreach(var line in CostLinesToBeUpdated)
                //{
                //    Response = await UpdatecrmData("xollsp_quotecostlines", line.xollsp_quotecostlineid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                //    {
                //        { "xollsp_totalamount" , line.xollsp_totalamount },
                //        { "xollsp_exchangerate" , line.xollsp_exchangerate },
                //        { "xollsp_quantity" , line.xollsp_quantity },
                //        { "xollsp_unitamount" , line.xollsp_unitamount },
                //        { "xollsp_fixedamountbase" , line.xollsp_fixedamountbase } ,
                //        {"xollsp_totalamountbase" , line.xollsp_totalamountbase } ,
                //        { "xollsp_unitamountbase" , line.xollsp_unitamountbase} ,
                //        { "xollsp_fixedamount" , line.xollsp_fixedamount }

                //    }));
                //}


                OldCostLines.ForEach(async line =>
                {
                    await DeletecrmData("xollsp_quotecostlines", line.xollsp_quotecostlineid);
                });
                var config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteCostLine, crmLine>(); });
                IMapper mapper = config.CreateMapper();
                if (ForwardingCostLines.Count > 0)
                {
                    Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(ForwardingCostLines), "xollsp_quotecostlines", OldQuotationHeader[0].xollsp_tariffquoteid);
                    if (Response.StatusCode != HttpStatusCode.NoContent)
                        return $"Cannot insert cost lines for quotation {QuotationCode} >> Error: {Response.Content} \n";
                }


                OldSalesLines.ForEach(async line =>
                {
                    await DeletecrmData("xollsp_quotesaleslines", line.xollsp_quotesaleslineid);
                });


                config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteCostLine, crmLine>(); });
                mapper = config.CreateMapper();
                if (ForwardingSalesLines.Count > 0)
                {
                    Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(ForwardingSalesLines), "xollsp_quotesaleslines", OldQuotationHeader[0].xollsp_tariffquoteid);
                    if (Response.StatusCode != HttpStatusCode.NoContent)
                        return $"Cannot insert sales lines for quotation {QuotationCode} >> Error: {Response.Content} \n";
                }



                if (Response.StatusCode != HttpStatusCode.NoContent)
                    return $"Cannot update sales lines for quoation {QuotationCode} >> Error: {Response.Content} \n";



                /*CostLinesToBeUpdated.ForEach(async line =>
                {
                    Response = await UpdatecrmData("xollsp_quotecostlines", line.xollsp_quotecostlineid , JsonConvert.SerializeObject(new Dictionary<string, object>()
                    {
                        { "xollsp_totalamount" , line.xollsp_totalamount },
                        { "xollsp_exchangerate" , line.xollsp_exchangerate },
                        { "xollsp_quantity" , line.xollsp_quantity },
                        { "xollsp_unitamount" , line.xollsp_unitamount },
                        { "xollsp_fixedamount" , line.xollsp_fixedamount }
                    }));
                });*/

                if (Response.StatusCode != HttpStatusCode.NoContent)
                    return $"Cannot update cost lines for quoation {QuotationCode} >> Error: {Response.Content}";


                foreach(var line in SalesLinesToBeUpdated)
                {
                    Response = await UpdatecrmData("xollsp_quotesaleslines", line.xollsp_quotesaleslineid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                    {
                        { "xollsp_totalamount" , line.xollsp_totalamount },
                        { "xollsp_exchangerate" , line.xollsp_exchangerate },
                        { "xollsp_quantity" , line.xollsp_quantity },
                        { "xollsp_unitamount" , line.xollsp_unitamount },
                        { "xollsp_fixedamountbase" , line.xollsp_fixedamountbase } ,
                        {"xollsp_totalamountbase" , line.xollsp_totalamountbase } ,
                        {"xollsp_unitamountbase" , line.xollsp_unitamountbase },
                        { "xollsp_fixedamount" , line.xollsp_fixedamount }

                    }));
                }
                /*SalesLinesToBeUpdated.ForEach(async line =>
                {
                    Response = await UpdatecrmData("xollsp_quotesaleslines", line.xollsp_quotesaleslineid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                    {
                        { "xollsp_totalamount" , line.xollsp_totalamount },
                        { "xollsp_exchangerate" , line.xollsp_exchangerate },
                        { "xollsp_quantity" , line.xollsp_quantity },
                        { "xollsp_unitamount" , line.xollsp_unitamount },
                        { "xollsp_fixedamount" , line.xollsp_fixedamount }
                    }));
                });*/

                if (Response.StatusCode != HttpStatusCode.NoContent)
                    return $"Cannot update sales lines for quoation {QuotationCode} >> Error: {Response.Content}";



                var quotationHeaderToTest = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{QuotationCode}' ");
                var CostLinesToTest = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");
                var SalesLinesToTest = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");

                jsonData = "\n" + "-------------------CostLinesToTestAfterUpdate-------------------------" + "\n" + JsonConvert.SerializeObject(CostLinesToTest);
                jsonData += "\n" + "-------------------SalesLinesToTestAfterUpdate-------------------------" + "\n" + JsonConvert.SerializeObject(SalesLinesToTest);

                WriteToLog( jsonData, QuotationCode);

                bool CanFinalize = false;

                if (CostLinesToTest.Count == ForwardingCostLines.Count && SalesLinesToTest.Count == ForwardingSalesLines.Count)
                {

                    var TotalCRMCost = (decimal)0.0;
                    var TotalCRMRevenue = (decimal)0;
                    foreach (var cost in CostLinesToTest)
                    {
                        TotalCRMCost += (decimal)cost.xollsp_totalamountbase;




                    }
                    foreach (var Rec in SalesLinesToTest)
                    {

                        TotalCRMRevenue += (decimal)Rec.xollsp_totalamountbase;


                    }



                    if (Math.Abs(TotalCRMCost - ForwardingTotalCost) <= (decimal)10.55 && Math.Abs(TotalCRMRevenue - ForwardingTotalSale) <= (decimal)10.55)
                        CanFinalize = true;
                    else
                    {

                        WriteToLog("\n\n------------Total Amount Of Lines Not Equal------------", QuotationCode);


                        CVarCRMQuotationCloseLog cVarCRMQuotationCloseLog = new CVarCRMQuotationCloseLog();

                        cVarCRMQuotationCloseLog.OperationID = item.ID;
                        cVarCRMQuotationCloseLog.QuotationCode = QuotationCode;
                        cVarCRMQuotationCloseLog.IsFinalized = false;
                        cVarCRMQuotationCloseLog.UserID = 4;
                        cVarCRMQuotationCloseLog.CloseDate = DateTime.Now;
                        cVarCRMQuotationCloseLog.Notes = "Couldn't finanlize Total Amount Of Lines Not Equal";


                        cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog.Add(cVarCRMQuotationCloseLog);
                        Exception checkException = cCRMQuotationCloseLog.SaveMethod(cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog);
                    }

                }
                else
                {

                    WriteToLog("\n\n--------Count Of Lines Not Equal------------", QuotationCode);



                    CVarCRMQuotationCloseLog cVarCRMQuotationCloseLog = new CVarCRMQuotationCloseLog();

                    cVarCRMQuotationCloseLog.OperationID = item.ID;
                    cVarCRMQuotationCloseLog.QuotationCode = QuotationCode;
                    cVarCRMQuotationCloseLog.IsFinalized = false;
                    cVarCRMQuotationCloseLog.UserID = 4;
                    cVarCRMQuotationCloseLog.CloseDate = DateTime.Now;
                    cVarCRMQuotationCloseLog.Notes = "Couldn't finanlize Count Of Lines Not Equal";


                    cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog.Add(cVarCRMQuotationCloseLog);
                    Exception checkException = cCRMQuotationCloseLog.SaveMethod(cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog);
                }


                if (CanFinalize)
                {

                Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Darft });

                Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statecode = (int)StateCodes.Inactive });

                Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Finalized });


                if (Response.StatusCode != HttpStatusCode.NoContent)
                    return $"Cannot update status to be 'Finalized' for quoation {QuotationCode} >> Error: {Response.Content}";

                    CVarCRMQuotationCloseLog cVarCRMQuotationCloseLog = new CVarCRMQuotationCloseLog();

                    cVarCRMQuotationCloseLog.OperationID = item.ID;
                    cVarCRMQuotationCloseLog.QuotationCode = QuotationCode;
                    cVarCRMQuotationCloseLog.IsFinalized = true;
                    cVarCRMQuotationCloseLog.UserID = 4;
                    cVarCRMQuotationCloseLog.CloseDate = DateTime.Now;
                    cVarCRMQuotationCloseLog.Notes = "Closed And Reviewed Successfuly";


                    cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog.Add(cVarCRMQuotationCloseLog);
                    Exception checkException = cCRMQuotationCloseLog.SaveMethod(cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog);

                }

                Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { mesco_plfinaldate = item.CloseDate });

                //Insert Into crm
                //ReturnMessage = await RevisionProcedure(new RevisionDTO
                //{
                //    QuotationHeader = OldQuotationHeader[0],
                //    NewCostLines = ForwardingCostLines,
                //    NewSalesLines = ForwardingSalesLines
                //});
            }
            return ReturnMessage;
        }


        [HttpGet]
        async public Task<string> UpdateDynamicsQuotationsAll(int pOperationID)
        {
            //i need the back integration to work only for mesco production to prevent testing from changing crm data
            //string fname = System.Web.Hosting.HostingEnvironment.MapPath("~/");
            ////File.WriteAllText(fname + "path.txt", fname);
            //if (!fname.Contains("IST\\WEBPublish\\Forwarding MESCO\\ForwardingMesco"))
            //    return "";

            //Get Quotation Code
            string ReturnMessage = "";
            int _rowCount = 0;
            var OperationsToBeRevisioned = new List<CVarOperations>();  //may be more than one in case of LCL
            COperations objCOperations = new COperations();
            objCOperations.GetItem(pOperationID);
            var Operation = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations[0] : null;
            objCOperations.GetListPaging(9999, 1, $"WHERE MasterOperationID = {pOperationID} AND QuotationRouteID IS NOT NULL", "ID", out _rowCount);
            var Houses = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations : null;
            string Message = "";
            CCRMQuotationCloseLog cCRMQuotationCloseLog = new CCRMQuotationCloseLog();
            if (Houses != null)
                OperationsToBeRevisioned = Houses;
            else if (Operation == null || Operation.QuotationRouteID == 0)
                return "";
            else
                OperationsToBeRevisioned.Add(Operation);

            //Getting ChargeTypes
            CChargeTypes objCChargeTypes = new CChargeTypes();
            var ChargeTypesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name,crmCode FROM ChargeTypes", typeof(CVarChargeTypes)).Cast<CVarChargeTypes>().ToList();

            //Getting Currencies
            CCurrencies objCCurrencies = new CCurrencies();
            var CurrencyList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Code FROM Currencies", typeof(CVarCurrencies)).Cast<CVarCurrencies>().ToList();
            foreach (var item in OperationsToBeRevisioned)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                objCQuotationRoute.GetItem(item.QuotationRouteID);
                var QuotationRoute = objCQuotationRoute.lstCVarQuotationRoute.Count > 0 ? objCQuotationRoute.lstCVarQuotationRoute[0] : null;
                if (QuotationRoute == null)
                    continue;
                var QuotationCode = QuotationRoute.Code.Substring(0, 16);
                var ForwardingTotalCost = (decimal)0;
                var ForwardingTotalSale = (decimal)0;
                //Getting a clone from quotation header
                var OldQuotationHeader = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{QuotationCode}' ");
                if (OldQuotationHeader.Count == 0)
                    return "";

                var OldCostLines = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");
                var OldSalesLines = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");
                var OldCrmLine = OldSalesLines.Count > 0 ? (crmLine)OldSalesLines[0] : (crmLine)OldCostLines[0];

                //Getting Payables
                CvwPayables objCPayables = new CvwPayables();
                objCPayables.GetList($"WHERE {(Houses == null ? "OperationID" : "BillID")} = {item.ID} and (AccNoteID <=0 or AccNoteID is null) and ( id not in (select PayableID from A_PaymentRequestDetails where (PaymentRequestID in (select id from A_PaymentRequest where IsApprovedSettlement = 1 )) and   (ActualCost = 0  or ActualCost is null))) and isdeleted <> 1");

                //Getting Receivables
                CvwReceivables objCReceivables = new CvwReceivables();
                objCReceivables.GetList($"WHERE {(Houses == null ? "OperationID" : "HouseBillID")} = {item.ID} and not exists (select  OperationID from vwinvoices where InvoiceStatus like '%cancelled%' and id = InvoiceID)");

                List<QuoteCostLine> ForwardingCostLines = new List<QuoteCostLine>();
                foreach (var Payable in objCPayables.lstCVarvwPayables)
                {
                    ForwardingCostLines.Add(new QuoteCostLine()
                    {
                        xollsp_quotecostlineid = Payable.crmCode,
                        xollsp_quantity = Payable.Quantity == 0 ? 1 : Payable.Quantity,
                        xollsp_unitamount = Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : Payable.CostPrice,
                        xollsp_totalamount = Payable.CostAmount == 0 ? Payable.QuotationCost : Payable.CostAmount,
                        xollsp_exchangerate = (Payable.ExchangeRate == 0 ? 1 : Math.Round(1 / Payable.ExchangeRate, 10)),
                        _xollsp_logisticservice_value = ChargeTypesList.FirstOrDefault(c => c.ID == Payable.ChargeTypeID).crmCode,
                        _xollsp_currency_value = await ReIntegrateDefectedMasterData<crmCurrency>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = "",
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = Payable.CurrencyID,
                            SelectedColumns = "isocurrencycode,currencyname",
                            SearchKey = CurrencyList.FirstOrDefault(c => c.ID == Payable.CurrencyID).Code
                        }),
                        xollsp_name = ChargeTypesList.FirstOrDefault(c => c.ID == Payable.ChargeTypeID).Name,
                        _mesco_vendor2_value = OldCrmLine._mesco_vendor2_value,
                        xollsp_importexport = OldCrmLine.xollsp_importexport,
                        xollsp_comments = OldCrmLine.xollsp_comments,
                        mesco_imo = OldCrmLine.mesco_imo,
                        new_freightterm = OldCrmLine.new_freightterm,
                        _owningbusinessunit_value = OldCrmLine._owningbusinessunit_value,
                        _owninguser_value = OldCrmLine._owninguser_value,
                        _mesco_shippingline_value = OldCrmLine._mesco_shippingline_value,
                        xollsp_validto = OldCrmLine.xollsp_validto,
                        xollsp_validfrom = OldCrmLine.xollsp_validfrom,
                        xollsp_sortingsequence = OldCrmLine.xollsp_sortingsequence,
                        _mesco_agent2_value = OldCrmLine._mesco_agent2_value,
                        xollsp_transittime = OldCrmLine.xollsp_transittime,
                        xollsp_commoditydescription = OldCrmLine.xollsp_commoditydescription,
                        mesco_stackable = OldCrmLine.mesco_stackable,
                        mesco_turnable = OldCrmLine.mesco_turnable,
                        xollsp_grossweightkg = OldCrmLine.xollsp_grossweightkg,
                        xollsp_fixedamount = 0,
                        timezoneruleversionnumber = OldCrmLine.timezoneruleversionnumber,
                        xollsp_unitmeasures = OldCrmLine.xollsp_unitmeasures,
                        statuscode = OldCrmLine.statuscode,
                        mesco_acid = OldCrmLine.mesco_acid,
                        xollsp_transporttype = OldCrmLine.xollsp_transporttype,
                        mesco_freedays = OldCrmLine.mesco_freedays,
                        new_freightcontractholder = OldCrmLine.new_freightcontractholder,
                        versionnumber = OldCrmLine.versionnumber,
                        xollsp_stepsize = OldCrmLine.xollsp_stepsize,
                        xollsp_roundingmethod = OldCrmLine.xollsp_roundingmethod,
                        _xollsp_to_value = OldCrmLine._xollsp_to_value,
                        xollsp_noofunits = OldCrmLine.xollsp_noofunits,
                        mesco_clearancetype = OldCrmLine.mesco_clearancetype,
                        mesco_superdrymeasure = OldCrmLine.mesco_superdrymeasure,
                        _xollsp_from_value = OldCrmLine._xollsp_from_value,
                        _xollsp_commoditygroup_value = OldCrmLine._xollsp_commoditygroup_value,
                        _xollsp_tariffquote_value = OldCrmLine._xollsp_tariffquote_value,
                        xollsp_loadtype = OldCrmLine.xollsp_loadtype,
                        statecode = OldCrmLine.statecode,
                        _mesco_airline2_value = OldCrmLine._mesco_airline2_value,
                        mesco_nooftrips = OldCrmLine.mesco_nooftrips,
                        _xollsp_unitofmeasure_value = OldCrmLine._xollsp_unitofmeasure_value,
                        xollsp_totalamountbase = (((Payable.Quantity == 0 ? 1 : Payable.Quantity) * (Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : Payable.CostPrice)) * (Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10)))
                        ,
                        xollsp_unitamountbase =      (  ((Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10)) * Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : (Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10) * Payable.CostPrice))),
                        xollsp_fixedamountbase = 0 ,
                        forwardingID = Payable.ID


                    });
                    ForwardingTotalCost += (((Payable.Quantity == 0 ? 1 : Payable.Quantity) * (Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : Payable.CostPrice)) * (Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10)));
                }

                //Preparing SalesLines object
                List<QuoteSalesLine> ForwardingSalesLines = new List<QuoteSalesLine>();
                foreach (var Receivable in objCReceivables.lstCVarvwReceivables)
                {
                    decimal quantity = Receivable.Quantity == 0 ? 1 : Receivable.Quantity;
                    decimal exchangeRate = Receivable.ExchangeRate == 0 ? 1 : Receivable.ExchangeRate;
                    decimal TotalAmountBase = (quantity * Receivable.SalePrice) * exchangeRate;
                    decimal UnitAmountBase = (Receivable.SalePrice) * exchangeRate;

                    ForwardingSalesLines.Add(new QuoteSalesLine()
                    {
                        xollsp_quotesaleslineid = Receivable.crmCode,
                        xollsp_quantity = Receivable.Quantity,
                        xollsp_unitamount = Receivable.SalePrice,
                        xollsp_totalamount = Receivable.SaleAmount,
                        xollsp_exchangerate = (Receivable.ExchangeRate == 0 ? 1 : Math.Round(1 / Receivable.ExchangeRate, 10)),
                        _xollsp_logisticservice_value = ChargeTypesList.FirstOrDefault(c => c.ID == Receivable.ChargeTypeID).crmCode,
                        _xollsp_currency_value = await ReIntegrateDefectedMasterData<crmCurrency>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = "",
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = Receivable.CurrencyID,
                            SelectedColumns = "isocurrencycode,currencyname",
                            SearchKey = CurrencyList.FirstOrDefault(c => c.ID == Receivable.CurrencyID).Code
                        }),
                        xollsp_name = ChargeTypesList.FirstOrDefault(c => c.ID == Receivable.ChargeTypeID).Name,
                        _mesco_vendor2_value = OldCrmLine._mesco_vendor2_value,
                        xollsp_importexport = OldCrmLine.xollsp_importexport,
                        xollsp_comments = OldCrmLine.xollsp_comments,
                        mesco_imo = OldCrmLine.mesco_imo,
                        new_freightterm = OldCrmLine.new_freightterm,
                        _owningbusinessunit_value = OldCrmLine._owningbusinessunit_value,
                        _owninguser_value = OldCrmLine._owninguser_value,
                        _mesco_shippingline_value = OldCrmLine._mesco_shippingline_value,
                        xollsp_validto = OldCrmLine.xollsp_validto,
                        xollsp_validfrom = OldCrmLine.xollsp_validfrom,
                        xollsp_sortingsequence = OldCrmLine.xollsp_sortingsequence,
                        _mesco_agent2_value = OldCrmLine._mesco_agent2_value,
                        xollsp_transittime = OldCrmLine.xollsp_transittime,
                        xollsp_commoditydescription = OldCrmLine.xollsp_commoditydescription,
                        mesco_stackable = OldCrmLine.mesco_stackable,
                        mesco_turnable = OldCrmLine.mesco_turnable,
                        xollsp_grossweightkg = OldCrmLine.xollsp_grossweightkg,
                        xollsp_fixedamount = 0,
                        timezoneruleversionnumber = OldCrmLine.timezoneruleversionnumber,
                        xollsp_unitmeasures = OldCrmLine.xollsp_unitmeasures,
                        statuscode = OldCrmLine.statuscode,
                        mesco_acid = OldCrmLine.mesco_acid,
                        xollsp_transporttype = OldCrmLine.xollsp_transporttype,
                        mesco_freedays = OldCrmLine.mesco_freedays,
                        new_freightcontractholder = OldCrmLine.new_freightcontractholder,
                        versionnumber = OldCrmLine.versionnumber,
                        xollsp_stepsize = OldCrmLine.xollsp_stepsize,
                        xollsp_roundingmethod = OldCrmLine.xollsp_roundingmethod,
                        _xollsp_to_value = OldCrmLine._xollsp_to_value,
                        xollsp_noofunits = OldCrmLine.xollsp_noofunits,
                        mesco_clearancetype = OldCrmLine.mesco_clearancetype,
                        mesco_superdrymeasure = OldCrmLine.mesco_superdrymeasure,
                        _xollsp_from_value = OldCrmLine._xollsp_from_value,
                        _xollsp_commoditygroup_value = OldCrmLine._xollsp_commoditygroup_value,
                        _xollsp_tariffquote_value = OldCrmLine._xollsp_tariffquote_value,
                        xollsp_loadtype = OldCrmLine.xollsp_loadtype,
                        statecode = OldCrmLine.statecode,
                        _mesco_airline2_value = OldCrmLine._mesco_airline2_value,
                        mesco_nooftrips = OldCrmLine.mesco_nooftrips,
                        _xollsp_unitofmeasure_value = OldCrmLine._xollsp_unitofmeasure_value,
                        xollsp_totalamountbase = Receivable.IsCancelled?  0 : TotalAmountBase,
                        xollsp_unitamountbase = Receivable.IsCancelled ? 0 : UnitAmountBase,
                        xollsp_fixedamountbase = 0 , 
                        forwardingID = Receivable.ID
                    });


                    ForwardingTotalSale += Receivable.IsCancelled ? 0 : TotalAmountBase;
                }
                bool CanClose = false;
                decimal costdiff = 0;
                decimal Salesdiff = 0;

                if (OldCostLines.Count == ForwardingCostLines.Count && OldSalesLines.Count == ForwardingSalesLines.Count)
                {

                    var TotalCRMCost = (decimal)0.0;
                    var TotalCRMRevenue = (decimal)0;
                    foreach (var cost in OldCostLines)
                    {
                        TotalCRMCost += (decimal)cost.xollsp_totalamountbase;



                    }
                    foreach (var Rec in OldSalesLines)
                    {

                        TotalCRMRevenue += (decimal)Rec.xollsp_totalamountbase;


                    }

                    costdiff = Math.Abs(TotalCRMCost - ForwardingTotalCost);
                    Salesdiff = Math.Abs(TotalCRMRevenue - ForwardingTotalSale);

                    if (Math.Abs(TotalCRMCost - ForwardingTotalCost) <= (decimal)5.55 && Math.Abs(TotalCRMRevenue - ForwardingTotalSale) <= (decimal)5.55)
                        CanClose = true;
                }

                IRestResponse Response = new RestResponse() { StatusCode = HttpStatusCode.NoContent };
                if (!CanClose)
                {
                    //Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Darft });
                    if (OldQuotationHeader[0].statuscode == 214050001)
                        Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statecode = (int)StateCodes.Active, statuscode = (int)StatusCodes.Accepted });

                    var CostLinesToBeInserted = ForwardingCostLines.Where(x => !OldCostLines.Contains(x)).ToList();
                    var CostLinesToBeUpdated = ForwardingCostLines.Intersect(OldCostLines).ToList();
                    var CostLinesToBeDeleted = OldCostLines.Except(ForwardingCostLines).ToList();

                    var SalesLinesToBeInserted = ForwardingSalesLines.Where(x => !OldSalesLines.Contains(x)).ToList();
                    var SalesLinesToBeUpdated = ForwardingSalesLines.Intersect(OldSalesLines).ToList();
                    var SalesLinesToBeDeleted = OldSalesLines.Except(ForwardingSalesLines).ToList();



                    string jsonData = "\n" + "-------------------CostLinesToBeInserted-------------------------" + "\n" + JsonConvert.SerializeObject(CostLinesToBeInserted);
                    jsonData += "\n" + "-------------------CostLinesToBeUpdated-------------------------" + "\n" + JsonConvert.SerializeObject(CostLinesToBeUpdated);
                    jsonData += "\n" + "-------------------CostLinesToBeDeleted-------------------------" + "\n" + JsonConvert.SerializeObject(CostLinesToBeDeleted);
                    jsonData += "\n" + "-------------------OldCostLines-------------------------" + "\n" + JsonConvert.SerializeObject(OldCostLines);
                    jsonData += "\n" + "-------------------ForwardingCostLines-------------------------" + "\n" + JsonConvert.SerializeObject(ForwardingCostLines);

                    jsonData += "\n" + "-------------------SalesLinesToBeInserted-------------------------" + "\n" + JsonConvert.SerializeObject(SalesLinesToBeInserted);
                    jsonData += "\n" + "-------------------SalesLinesToBeUpdated-------------------------" + "\n" + JsonConvert.SerializeObject(SalesLinesToBeUpdated);
                    jsonData += "\n" + "-------------------SalesLinesToBeDeleted-------------------------" + "\n" + JsonConvert.SerializeObject(SalesLinesToBeDeleted);
                    jsonData += "\n" + "-------------------OldSalesLines-------------------------" + "\n" + JsonConvert.SerializeObject(OldSalesLines);
                    jsonData += "\n" + "-------------------ForwardingSalesLines-------------------------" + "\n" + JsonConvert.SerializeObject(ForwardingSalesLines);


                    WriteToLog(jsonData, QuotationCode);


                    //     OldCostLines.ForEach(async line =>
                    //     {
                    //         await DeletecrmData("xollsp_quotecostlines", line.xollsp_quotecostlineid);
                    //     });

                    //     OldSalesLines.ForEach(async line =>
                    //     {
                    //         await DeletecrmData("xollsp_quotesaleslines", line.xollsp_quotesaleslineid);
                    //     });

                    //     var config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteCostLine, crmLine>(); });
                    //     IMapper mapper = config.CreateMapper();
                    //     if (CostLinesToBeInserted.Count > 0)
                    //     {
                    //         Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(CostLinesToBeInserted), "xollsp_quotecostlines", OldQuotationHeader[0].xollsp_tariffquoteid);
                    //         if (Response.StatusCode != HttpStatusCode.NoContent)
                    //             return $"Cannot insert cost lines for quotation {QuotationCode} >> Error: {Response.Content} \n";
                    //     }

                    //     config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteCostLine, crmLine>(); });
                    //     mapper = config.CreateMapper();
                    //     if (SalesLinesToBeInserted.Count > 0)
                    //     {
                    //         Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(SalesLinesToBeInserted), "xollsp_quotesaleslines", OldQuotationHeader[0].xollsp_tariffquoteid);
                    //         if (Response.StatusCode != HttpStatusCode.NoContent)
                    //             return $"Cannot insert sales lines for quotation {QuotationCode} >> Error: {Response.Content} \n";
                    //     }

                    //     foreach (var line in CostLinesToBeUpdated)
                    //     {
                    //         Response = await UpdatecrmData("xollsp_quotecostlines", line.xollsp_quotecostlineid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                    //{
                    //    { "xollsp_totalamount" , line.xollsp_totalamount },
                    //    { "xollsp_exchangerate" , line.xollsp_exchangerate },
                    //    { "xollsp_quantity" , line.xollsp_quantity },
                    //    { "xollsp_unitamount" , line.xollsp_unitamount },
                    //    { "xollsp_fixedamountbase" , line.xollsp_fixedamountbase } ,
                    //    {"xollsp_totalamountbase" , line.xollsp_totalamountbase } ,
                    //    { "xollsp_unitamountbase" , line.xollsp_unitamountbase} ,
                    //    { "xollsp_fixedamount" , line.xollsp_fixedamount }

                    //}));
                    //     }



                    //     if (Response.StatusCode != HttpStatusCode.NoContent)
                    //         return $"Cannot update cost lines for quoation {QuotationCode} >> Error: {Response.Content} \n";


                    //     foreach (var line in SalesLinesToBeUpdated)
                    //     {
                    //         Response = await UpdatecrmData("xollsp_quotesaleslines", line.xollsp_quotesaleslineid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                    //{
                    //    { "xollsp_totalamount" , line.xollsp_totalamount },
                    //    { "xollsp_exchangerate" , line.xollsp_exchangerate },
                    //    { "xollsp_quantity" , line.xollsp_quantity },
                    //    { "xollsp_unitamount" , line.xollsp_unitamount },
                    //    { "xollsp_fixedamountbase" , line.xollsp_fixedamountbase } ,
                    //    {"xollsp_totalamountbase" , line.xollsp_totalamountbase } ,
                    //    {"xollsp_unitamountbase" , line.xollsp_unitamountbase },
                    //    { "xollsp_fixedamount" , line.xollsp_fixedamount }

                    //}));

                    //     }




                    Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = 1 });



                    OldCostLines.ForEach(async line =>
                    {
                        await DeletecrmData("xollsp_quotecostlines", line.xollsp_quotecostlineid);
                    });
                    var config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteCostLine, crmLine>(); });
                    IMapper mapper = config.CreateMapper();
                    if (ForwardingCostLines.Count > 0)
                    {
                        Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(ForwardingCostLines), "xollsp_quotecostlines", OldQuotationHeader[0].xollsp_tariffquoteid);
                        if (Response.StatusCode != HttpStatusCode.NoContent)
                            return $"Cannot insert cost lines for quotation {QuotationCode} >> Error: {Response.Content} \n";
                    }


                    OldSalesLines.ForEach(async line =>
                    {
                        await DeletecrmData("xollsp_quotesaleslines", line.xollsp_quotesaleslineid);
                    });


                    config = new MapperConfiguration(cfg => { cfg.CreateMap<QuoteCostLine, crmLine>(); });
                    mapper = config.CreateMapper();
                    if (ForwardingSalesLines.Count > 0)
                    {
                        Response = await crmLineInsertProcedure(mapper.Map<List<crmLine>>(ForwardingSalesLines), "xollsp_quotesaleslines", OldQuotationHeader[0].xollsp_tariffquoteid);
                        if (Response.StatusCode != HttpStatusCode.NoContent)
                            return $"Cannot insert sales lines for quotation {QuotationCode} >> Error: {Response.Content} \n";
                    }



                    if (Response.StatusCode != HttpStatusCode.NoContent)
                        return $"Cannot update sales lines for quoation {QuotationCode} >> Error: {Response.Content} \n";

                    Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = 300000008 });



                    var quotationHeaderToTest = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{QuotationCode}' ");
                    var CostLinesToTest = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");
                    var SalesLinesToTest = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");

                    jsonData = "\n" + "-------------------CostLinesToTestAfterUpdate-------------------------" + "\n" + JsonConvert.SerializeObject(CostLinesToTest);
                    jsonData += "\n" + "-------------------SalesLinesToTestAfterUpdate-------------------------" + "\n" + JsonConvert.SerializeObject(SalesLinesToTest);

                    WriteToLog(jsonData, QuotationCode);

                    bool CanFinalize = false;

                    if (CostLinesToTest.Count == ForwardingCostLines.Count && SalesLinesToTest.Count == ForwardingSalesLines.Count)
                    {

                        var TotalCRMCost = (decimal)0.0;
                        var TotalCRMRevenue = (decimal)0;
                        foreach (var cost in CostLinesToTest)
                        {
                            TotalCRMCost += (decimal)cost.xollsp_totalamountbase;




                        }
                        foreach (var Rec in SalesLinesToTest)
                        {

                            TotalCRMRevenue += (decimal)Rec.xollsp_totalamountbase;


                        }



                        if (Math.Abs(TotalCRMCost - ForwardingTotalCost) <= (decimal)5.55 && Math.Abs(TotalCRMRevenue - ForwardingTotalSale) <= (decimal)5.55)
                            CanFinalize = true;
                        else
                        {

                            WriteToLog("\n\n------------Total Amount Of Lines Not Equal------------", QuotationCode);


                            CVarCRMQuotationCloseLog cVarCRMQuotationCloseLog = new CVarCRMQuotationCloseLog();

                            cVarCRMQuotationCloseLog.OperationID = item.ID;
                            cVarCRMQuotationCloseLog.QuotationCode = QuotationCode;
                            cVarCRMQuotationCloseLog.IsFinalized = false;
                            cVarCRMQuotationCloseLog.UserID = 4;
                            cVarCRMQuotationCloseLog.CloseDate = DateTime.Now;
                            cVarCRMQuotationCloseLog.Notes = Math.Abs(TotalCRMCost - ForwardingTotalCost).ToString() + "-" +  Math.Abs(TotalCRMRevenue - ForwardingTotalSale).ToString() ;


                            cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog.Add(cVarCRMQuotationCloseLog);
                            Exception checkException = cCRMQuotationCloseLog.SaveMethod(cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog);
                        }

                    }
                    else
                    {

                        WriteToLog("\n\n--------Count Of Lines Not Equal------------", QuotationCode);



                        CVarCRMQuotationCloseLog cVarCRMQuotationCloseLog = new CVarCRMQuotationCloseLog();

                        cVarCRMQuotationCloseLog.OperationID = item.ID;
                        cVarCRMQuotationCloseLog.QuotationCode = QuotationCode;
                        cVarCRMQuotationCloseLog.IsFinalized = false;
                        cVarCRMQuotationCloseLog.UserID = 4;
                        cVarCRMQuotationCloseLog.CloseDate = DateTime.Now;
                        cVarCRMQuotationCloseLog.Notes = "Couldn't finanlize Count Of Lines Not Equal";


                        cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog.Add(cVarCRMQuotationCloseLog);
                        Exception checkException = cCRMQuotationCloseLog.SaveMethod(cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog);
                    }


                    if (CanFinalize)
                    {
                        if (OldQuotationHeader[0].statuscode != 214050001)
                        {



                            Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Darft });

                        Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statecode = (int)StateCodes.Inactive });

                        Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Finalized });

                        }


                        if (Response.StatusCode != HttpStatusCode.NoContent)
                            return $"Cannot update status to be 'Finalized' for quoation {QuotationCode} >> Error: {Response.Content}";

                        CVarCRMQuotationCloseLog cVarCRMQuotationCloseLog = new CVarCRMQuotationCloseLog();

                        cVarCRMQuotationCloseLog.OperationID = item.ID;
                        cVarCRMQuotationCloseLog.QuotationCode = QuotationCode;
                        cVarCRMQuotationCloseLog.IsFinalized = true;
                        cVarCRMQuotationCloseLog.UserID = 4;
                        cVarCRMQuotationCloseLog.CloseDate = DateTime.Now;
                        cVarCRMQuotationCloseLog.Notes = "Closed And Reviewed Successfuly";


                        cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog.Add(cVarCRMQuotationCloseLog);
                        Exception checkException = cCRMQuotationCloseLog.SaveMethod(cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog);

                    }



                    //Insert Into crm
                    //ReturnMessage = await RevisionProcedure(new RevisionDTO
                    //{
                    //    QuotationHeader = OldQuotationHeader[0],
                    //    NewCostLines = ForwardingCostLines,
                    //    NewSalesLines = ForwardingSalesLines
                    //});
                }
                else
                {

                    WriteToLog("\n\n------------Total Amount Of Lines Not Equal------------\n"+"cost -----> "+ costdiff.ToString() +"\nsale ------> "+Salesdiff.ToString(), QuotationCode);

                    //costdiff = Math.Abs(TotalCRMCost - ForwardingTotalCost);
                    //Salesdiff = Math.Abs(TotalCRMRevenue - ForwardingTotalSale);


                    CVarCRMQuotationCloseLog cVarCRMQuotationCloseLog = new CVarCRMQuotationCloseLog();

                    cVarCRMQuotationCloseLog.OperationID = item.ID;
                    cVarCRMQuotationCloseLog.QuotationCode = QuotationCode;
                    cVarCRMQuotationCloseLog.IsFinalized = true;
                    cVarCRMQuotationCloseLog.UserID = 4;
                    cVarCRMQuotationCloseLog.CloseDate = DateTime.Now;
                    cVarCRMQuotationCloseLog.Notes = costdiff.ToString() + "-" + Salesdiff.ToString();



                    cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog.Add(cVarCRMQuotationCloseLog);
                    Exception checkException = cCRMQuotationCloseLog.SaveMethod(cCRMQuotationCloseLog.lstCVarCRMQuotationCloseLog);
                    if (OldQuotationHeader[0].statuscode != 214050001)
                    {



                        Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Darft });

                        Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statecode = (int)StateCodes.Inactive });

                        Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Finalized });

                    }





                }
            }
                return ReturnMessage;

        }


        [HttpGet]
        async public Task<string> UpdateQuotationsCloseDate(int pOperationID)
        {
            //i need the back integration to work only for mesco production to prevent testing from changing crm data
            //string fname = System.Web.Hosting.HostingEnvironment.MapPath("~/");
            ////File.WriteAllText(fname + "path.txt", fname);
            //if (!fname.Contains("IST\\WEBPublish\\Forwarding MESCO\\ForwardingMesco"))
            //    return "";

            //Get Quotation Code
            string ReturnMessage = "";
            int _rowCount = 0;
            var OperationsToBeRevisioned = new List<CVarOperations>();  //may be more than one in case of LCL
            COperations objCOperations = new COperations();
            objCOperations.GetItem(pOperationID);
            var Operation = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations[0] : null;
            objCOperations.GetListPaging(9999, 1, $"WHERE MasterOperationID = {pOperationID} AND QuotationRouteID IS NOT NULL", "ID", out _rowCount);
            var Houses = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations : null;
            string Message = "";
            CCRMQuotationCloseLog cCRMQuotationCloseLog = new CCRMQuotationCloseLog();
            if (Houses != null)
                OperationsToBeRevisioned = Houses;
            else if (Operation == null || Operation.QuotationRouteID == 0)
                return "";
            else
                OperationsToBeRevisioned.Add(Operation);

        
            //Getting Currencies
       
            foreach (var item in OperationsToBeRevisioned)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                objCQuotationRoute.GetItem(item.QuotationRouteID);
                var QuotationRoute = objCQuotationRoute.lstCVarQuotationRoute.Count > 0 ? objCQuotationRoute.lstCVarQuotationRoute[0] : null;
                if (QuotationRoute == null)
                    continue;
                var QuotationCode = QuotationRoute.Code.Substring(0, 16);
                var ForwardingTotalCost = (decimal)0;
                var ForwardingTotalSale = (decimal)0;
                //Getting a clone from quotation header
                var OldQuotationHeader = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{QuotationCode}' ");
                if (OldQuotationHeader.Count == 0)
                    return "";

            
   

                IRestResponse Response = new RestResponse() { StatusCode = HttpStatusCode.NoContent };
                Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { mesco_plfinaldate = item.CloseDate });
                if (Response.StatusCode != HttpStatusCode.NoContent)
                    return $"Cannot update for quoation {QuotationCode} >> Error: {Response.Content}";


            }
            return ReturnMessage;

        }



        [HttpGet]
        async public Task<string> GetQuotationsAllReport(int pOperationID)
        {
            //i need the back integration to work only for mesco production to prevent testing from changing crm data
            //string fname = System.Web.Hosting.HostingEnvironment.MapPath("~/");
            ////File.WriteAllText(fname + "path.txt", fname);
            //if (!fname.Contains("IST\\WEBPublish\\Forwarding MESCO\\ForwardingMesco"))
            //    return "";

            //Get Quotation Code
            string ReturnMessage = "";
            int _rowCount = 0;
            var OperationsToBeRevisioned = new List<CVarOperations>();  //may be more than one in case of LCL
            COperations objCOperations = new COperations();
            objCOperations.GetItem(pOperationID);
            var Operation = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations[0] : null;
            objCOperations.GetListPaging(9999, 1, $"WHERE MasterOperationID = {pOperationID} AND QuotationRouteID IS NOT NULL", "ID", out _rowCount);
            var Houses = objCOperations.lstCVarOperations.Count > 0 ? objCOperations.lstCVarOperations : null;
            var ForwardingTotalCost = (decimal)0;
            var ForwardingTotalSale = (decimal)0;

            if (Houses != null)
                OperationsToBeRevisioned = Houses;
            else if (Operation == null || Operation.QuotationRouteID == 0)
                return "";
            else
                OperationsToBeRevisioned.Add(Operation);

            //Getting ChargeTypes
            CChargeTypes objCChargeTypes = new CChargeTypes();
            var ChargeTypesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name,crmCode FROM ChargeTypes", typeof(CVarChargeTypes)).Cast<CVarChargeTypes>().ToList();

            //Getting Currencies
            CCurrencies objCCurrencies = new CCurrencies();
            var CurrencyList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Code FROM Currencies", typeof(CVarCurrencies)).Cast<CVarCurrencies>().ToList();
            foreach (var item in OperationsToBeRevisioned)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                objCQuotationRoute.GetItem(item.QuotationRouteID);
                var QuotationRoute = objCQuotationRoute.lstCVarQuotationRoute.Count > 0 ? objCQuotationRoute.lstCVarQuotationRoute[0] : null;
                if (QuotationRoute == null)
                    continue;
                var QuotationCode = QuotationRoute.Code.Substring(0, 16);

                //Getting a clone from quotation header
                var OldQuotationHeader = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{QuotationCode}' ");
                if (OldQuotationHeader.Count == 0)
                    return "";
                var OldCostLines = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");
                var OldSalesLines = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");
                var OldCrmLine = OldSalesLines.Count > 0 ? (crmLine)OldSalesLines[0] : (crmLine)OldCostLines[0];

                //Getting Payables
                CPayables objCPayables = new CPayables();
                objCPayables.GetList($"WHERE {(Houses == null ? "OperationID" : "BillID")} = {item.ID} and (AccNoteID <=0 or AccNoteID is null) and ( id not in (select PayableID from A_PaymentRequestDetails where (PaymentRequestID in (select id from A_PaymentRequest where IsApprovedSettlement = 1 )) and   (ActualCost = 0  or ActualCost is null)))");

                //Getting Receivables
                CReceivables objCReceivables = new CReceivables();
                objCReceivables.GetList($"WHERE {(Houses == null ? "OperationID" : "HouseBillID")} = {item.ID}");

                List<QuoteCostLine> ForwardingCostLines = new List<QuoteCostLine>();
                foreach (var Payable in objCPayables.lstCVarPayables)
                {
                    ForwardingCostLines.Add(new QuoteCostLine()
                    {
                        xollsp_quotecostlineid = Payable.crmCode,
                        xollsp_quantity = Payable.Quantity == 0 ? 1 : Payable.Quantity,
                        xollsp_unitamount = Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : Payable.CostPrice,
                        xollsp_totalamount = Payable.CostAmount == 0 ? Payable.QuotationCost : Payable.CostAmount,
                        xollsp_exchangerate = (Payable.ExchangeRate == 0 ? 1 : Math.Round(1 / Payable.ExchangeRate, 10)),
                        _xollsp_logisticservice_value = ChargeTypesList.FirstOrDefault(c => c.ID == Payable.ChargeTypeID).crmCode,
                        _xollsp_currency_value = await ReIntegrateDefectedMasterData<crmCurrency>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = "",
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = Payable.CurrencyID,
                            SelectedColumns = "isocurrencycode,currencyname",
                            SearchKey = CurrencyList.FirstOrDefault(c => c.ID == Payable.CurrencyID).Code
                        }),
                        xollsp_name = ChargeTypesList.FirstOrDefault(c => c.ID == Payable.ChargeTypeID).Name,
                        _mesco_vendor2_value = OldCrmLine._mesco_vendor2_value,
                        xollsp_importexport = OldCrmLine.xollsp_importexport,
                        xollsp_comments = OldCrmLine.xollsp_comments,
                        mesco_imo = OldCrmLine.mesco_imo,
                        new_freightterm = OldCrmLine.new_freightterm,
                        _owningbusinessunit_value = OldCrmLine._owningbusinessunit_value,
                        _owninguser_value = OldCrmLine._owninguser_value,
                        _mesco_shippingline_value = OldCrmLine._mesco_shippingline_value,
                        xollsp_validto = OldCrmLine.xollsp_validto,
                        xollsp_validfrom = OldCrmLine.xollsp_validfrom,
                        xollsp_sortingsequence = OldCrmLine.xollsp_sortingsequence,
                        _mesco_agent2_value = OldCrmLine._mesco_agent2_value,
                        xollsp_transittime = OldCrmLine.xollsp_transittime,
                        xollsp_commoditydescription = OldCrmLine.xollsp_commoditydescription,
                        mesco_stackable = OldCrmLine.mesco_stackable,
                        mesco_turnable = OldCrmLine.mesco_turnable,
                        xollsp_grossweightkg = OldCrmLine.xollsp_grossweightkg,
                        xollsp_fixedamount = 0,
                        timezoneruleversionnumber = OldCrmLine.timezoneruleversionnumber,
                        xollsp_unitmeasures = OldCrmLine.xollsp_unitmeasures,
                        statuscode = OldCrmLine.statuscode,
                        mesco_acid = OldCrmLine.mesco_acid,
                        xollsp_transporttype = OldCrmLine.xollsp_transporttype,
                        mesco_freedays = OldCrmLine.mesco_freedays,
                        new_freightcontractholder = OldCrmLine.new_freightcontractholder,
                        versionnumber = OldCrmLine.versionnumber,
                        xollsp_stepsize = OldCrmLine.xollsp_stepsize,
                        xollsp_roundingmethod = OldCrmLine.xollsp_roundingmethod,
                        _xollsp_to_value = OldCrmLine._xollsp_to_value,
                        xollsp_noofunits = OldCrmLine.xollsp_noofunits,
                        mesco_clearancetype = OldCrmLine.mesco_clearancetype,
                        mesco_superdrymeasure = OldCrmLine.mesco_superdrymeasure,
                        _xollsp_from_value = OldCrmLine._xollsp_from_value,
                        _xollsp_commoditygroup_value = OldCrmLine._xollsp_commoditygroup_value,
                        _xollsp_tariffquote_value = OldCrmLine._xollsp_tariffquote_value,
                        xollsp_loadtype = OldCrmLine.xollsp_loadtype,
                        statecode = OldCrmLine.statecode,
                        _mesco_airline2_value = OldCrmLine._mesco_airline2_value,
                        mesco_nooftrips = OldCrmLine.mesco_nooftrips,
                        _xollsp_unitofmeasure_value = OldCrmLine._xollsp_unitofmeasure_value,
                        xollsp_totalamountbase = (((Payable.Quantity == 0 ? 1 : Payable.Quantity) * (Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : Payable.CostPrice)) * (Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10)))
                        ,
                        xollsp_unitamountbase = ((Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10)) * Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : (Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10) * Payable.CostPrice)),
                        xollsp_fixedamountbase = 0

                    });
                    ForwardingTotalCost += (((Payable.Quantity == 0 ? 1 : Payable.Quantity) * (Payable.CostPrice == 0 ? Payable.QuotationCost / (Payable.Quantity == 0 ? 1 : Payable.Quantity) : Payable.CostPrice)) * (Payable.ExchangeRate == 0 ? 1 : Math.Round(Payable.ExchangeRate, 10)));
                }

                //Preparing SalesLines object
                List<QuoteSalesLine> ForwardingSalesLines = new List<QuoteSalesLine>();
                foreach (var Receivable in objCReceivables.lstCVarReceivables)
                {
                    decimal quantity = Receivable.Quantity == 0 ? 1 : Receivable.Quantity;
                    decimal exchangeRate = Receivable.ExchangeRate == 0 ? 1 : Receivable.ExchangeRate;
                    decimal TotalAmountBase = (quantity * Receivable.SalePrice) * exchangeRate;
                    decimal UnitAmountBase = (Receivable.SalePrice) * exchangeRate;

                    ForwardingSalesLines.Add(new QuoteSalesLine()
                    {
                        xollsp_quotesaleslineid = Receivable.crmCode,
                        xollsp_quantity = Receivable.Quantity,
                        xollsp_unitamount = Receivable.SalePrice,
                        xollsp_totalamount = Receivable.SaleAmount,
                        xollsp_exchangerate = (Receivable.ExchangeRate == 0 ? 1 : Math.Round(1 / Receivable.ExchangeRate, 10)),
                        _xollsp_logisticservice_value = ChargeTypesList.FirstOrDefault(c => c.ID == Receivable.ChargeTypeID).crmCode,
                        _xollsp_currency_value = await ReIntegrateDefectedMasterData<crmCurrency>(new IntegrationOptionsDTO
                        {
                            CrmTableName = "transactioncurrencies",
                            ForwardingTableName = "Currencies",
                            CrmIdFieldName = "transactioncurrencyid",
                            CrmComparisonFieldName = "isocurrencycode",
                            CrmID = "",
                            ForwardingComparisonFieldName = "Code",
                            ForwardingID = Receivable.CurrencyID,
                            SelectedColumns = "isocurrencycode,currencyname",
                            SearchKey = CurrencyList.FirstOrDefault(c => c.ID == Receivable.CurrencyID).Code
                        }),
                        xollsp_name = ChargeTypesList.FirstOrDefault(c => c.ID == Receivable.ChargeTypeID).Name,
                        _mesco_vendor2_value = OldCrmLine._mesco_vendor2_value,
                        xollsp_importexport = OldCrmLine.xollsp_importexport,
                        xollsp_comments = OldCrmLine.xollsp_comments,
                        mesco_imo = OldCrmLine.mesco_imo,
                        new_freightterm = OldCrmLine.new_freightterm,
                        _owningbusinessunit_value = OldCrmLine._owningbusinessunit_value,
                        _owninguser_value = OldCrmLine._owninguser_value,
                        _mesco_shippingline_value = OldCrmLine._mesco_shippingline_value,
                        xollsp_validto = OldCrmLine.xollsp_validto,
                        xollsp_validfrom = OldCrmLine.xollsp_validfrom,
                        xollsp_sortingsequence = OldCrmLine.xollsp_sortingsequence,
                        _mesco_agent2_value = OldCrmLine._mesco_agent2_value,
                        xollsp_transittime = OldCrmLine.xollsp_transittime,
                        xollsp_commoditydescription = OldCrmLine.xollsp_commoditydescription,
                        mesco_stackable = OldCrmLine.mesco_stackable,
                        mesco_turnable = OldCrmLine.mesco_turnable,
                        xollsp_grossweightkg = OldCrmLine.xollsp_grossweightkg,
                        xollsp_fixedamount = 0,
                        timezoneruleversionnumber = OldCrmLine.timezoneruleversionnumber,
                        xollsp_unitmeasures = OldCrmLine.xollsp_unitmeasures,
                        statuscode = OldCrmLine.statuscode,
                        mesco_acid = OldCrmLine.mesco_acid,
                        xollsp_transporttype = OldCrmLine.xollsp_transporttype,
                        mesco_freedays = OldCrmLine.mesco_freedays,
                        new_freightcontractholder = OldCrmLine.new_freightcontractholder,
                        versionnumber = OldCrmLine.versionnumber,
                        xollsp_stepsize = OldCrmLine.xollsp_stepsize,
                        xollsp_roundingmethod = OldCrmLine.xollsp_roundingmethod,
                        _xollsp_to_value = OldCrmLine._xollsp_to_value,
                        xollsp_noofunits = OldCrmLine.xollsp_noofunits,
                        mesco_clearancetype = OldCrmLine.mesco_clearancetype,
                        mesco_superdrymeasure = OldCrmLine.mesco_superdrymeasure,
                        _xollsp_from_value = OldCrmLine._xollsp_from_value,
                        _xollsp_commoditygroup_value = OldCrmLine._xollsp_commoditygroup_value,
                        _xollsp_tariffquote_value = OldCrmLine._xollsp_tariffquote_value,
                        xollsp_loadtype = OldCrmLine.xollsp_loadtype,
                        statecode = OldCrmLine.statecode,
                        _mesco_airline2_value = OldCrmLine._mesco_airline2_value,
                        mesco_nooftrips = OldCrmLine.mesco_nooftrips,
                        _xollsp_unitofmeasure_value = OldCrmLine._xollsp_unitofmeasure_value,
                        xollsp_totalamountbase = TotalAmountBase,
                        xollsp_unitamountbase = UnitAmountBase,
                        xollsp_fixedamountbase = 0
                    });
                    ForwardingTotalSale += TotalAmountBase;
                }

                
                IRestResponse Response = new RestResponse() { StatusCode = HttpStatusCode.NoContent };
      


                var quotationHeaderToTest = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{QuotationCode}' ");
                var CostLinesToTest = await GetcrmData<QuoteCostLine>("xollsp_quotecostlines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");
                var SalesLinesToTest = await GetcrmData<QuoteSalesLine>("xollsp_quotesaleslines", "", $"_xollsp_tariffquote_value eq '{OldQuotationHeader[0].xollsp_tariffquoteid}'");


                bool CanFinalize = false;
                if (CostLinesToTest.Count == ForwardingCostLines.Count && SalesLinesToTest.Count == ForwardingSalesLines.Count)
                {

                    var TotalCRMCost = (decimal)0.0;
                    var TotalCRMRevenue = (decimal)0;
                    foreach (var cost in CostLinesToTest)
                    {
                        TotalCRMCost += (decimal)cost.xollsp_totalamountbase;



                    }
                    foreach (var Rec in SalesLinesToTest)
                    {

                        TotalCRMRevenue += (decimal)Rec.xollsp_totalamountbase;


                    }

                    //TotalCRMCost = Math.Round(TotalCRMCost, 1);
                    //ForwardingTotalCost = Math.Round(ForwardingTotalCost, 1);
                    //TotalCRMRevenue = Math.Round(TotalCRMRevenue, 1);
                    //ForwardingTotalSale = Math.Round(ForwardingTotalSale, 1);

                    if (Math.Abs(TotalCRMCost - ForwardingTotalCost) <= (decimal)10.55 &&   Math.Abs(TotalCRMRevenue - ForwardingTotalSale) <= (decimal)10.55)
                        CanFinalize = true;
                }


                //Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Darft });

                //Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statecode = (int)StateCodes.Inactive });

                //Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Finalized });

                if (!CanFinalize)
                {

                    //var x = OldQuotationHeader[0].statuscode;
                    //if (x == 300000008)
                    //    await UpdateDynamicsQuotationsAll(Convert.ToInt32(pOperationID));
                    ReturnMessage += $" update status to be 'Finalized' for quoation {QuotationCode} \n";
                }
                else
                {

                    var x = OldQuotationHeader[0].statuscode;
                    if (x == 300000008)
                    {
                        Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Darft });

                        Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statecode = (int)StateCodes.Inactive });

                        Response = await UpdatecrmData("xollsp_tariffquotes", OldQuotationHeader[0].xollsp_tariffquoteid, new { statuscode = (int)StatusCodes.Finalized });
                    }
                }


            }
            return ReturnMessage;
        }



        async public Task<List<T>> GetcrmData<T>(string TableName, string SelectedColumns, string FilterCondition)
        {
            string QueryParameters = "";
            string access_token = Auth();
            var client = new RestClient($"{url}");
            client.Authenticator = new JwtAuthenticator(access_token);
            if (SelectedColumns != "")
                QueryParameters += $"?$select={SelectedColumns}";
            if (FilterCondition != "")
                QueryParameters += $"{(SelectedColumns == "" ? "?" : "&")}$filter={FilterCondition}";
            var request = new RestRequest($"/api/data/v9.2.23022.00178/{TableName}{QueryParameters}", Method.GET);
            request.AddHeader("Accept", "application/json");
            var response = await client.ExecuteGetTaskAsync(request);
            var Data = JToken.Parse(response.Content)["value"];
            List<T> crmRecords = Data.ToObject<List<T>>();
            return crmRecords;
        }
        async public Task<IRestResponse> UpdatecrmData<T>(string TableName, string crmRecordID, T UpdateDTO)
        {
            string access_token = Auth();
            var client = new RestClient($"{url}");
            client.Authenticator = new JwtAuthenticator(access_token);
            var request = new RestRequest($"/api/data/v9.2.23022.00178/{TableName}({crmRecordID})", Method.PATCH);
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(UpdateDTO);
            var response = await client.ExecuteTaskAsync(request);

            return response;
        }
        async private Task<IRestResponse> InsertcrmData(string TableName, Dictionary<string, object> Payload)
        {
            string access_token = Auth();
            var client = new RestClient($"{url}");
            client.Authenticator = new JwtAuthenticator(access_token);
            var request = new RestRequest($"/api/data/v9.2.23022.00178/{TableName}", Method.POST);
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(JsonConvert.SerializeObject(Payload));
            var response = await client.ExecuteTaskAsync(request);

            string fullUrl = $"{url}/api/data/v9.2.23022.00178/{TableName}";
            string jsonPayload = JsonConvert.SerializeObject(Payload);
            string x = $"curl -X POST \"{fullUrl}\" " +
                       $"-H \"Authorization: Bearer {access_token}\" " +
                       "-H \"Accept: application/json\" " +
                       "-H \"Content-Type: application/json\" " +
                       $"-d '{jsonPayload}'";

            return response;
        }

        async private Task<string> RevisionProcedure(RevisionDTO RevisionDTO)
        {
            IRestResponse Response = new RestResponse() { StatusCode = HttpStatusCode.NoContent };
            try
            {
                Response = await UpdatecrmData("xollsp_tariffquotes", RevisionDTO.QuotationHeader.xollsp_tariffquoteid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                {
                    { "statuscode" , (int)StatusCodes.Darft }
                }));

                if (Response.StatusCode != HttpStatusCode.NoContent)
                    throw new InvalidOperationException($"Old quotation cannot be updated >> Error: {Response.Content}");
                //Update old quotation
                Response = await UpdatecrmData("xollsp_tariffquotes", RevisionDTO.QuotationHeader.xollsp_tariffquoteid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                {
                    { "statecode" , (int)StateCodes.Inactive },
                    { "xollsp_RevisionMotive@odata.bind" , "xollsp_standardtexts(d3a51514-abe6-ee11-904c-000d3abfa746)" }
                }));

                if (Response.StatusCode != HttpStatusCode.NoContent)
                    throw new InvalidOperationException($"Old quotation cannot be updated >> Error: {Response.Content}");

                Response = await UpdatecrmData("xollsp_tariffquotes", RevisionDTO.QuotationHeader.xollsp_tariffquoteid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                {
                    { "statuscode" , (int)StatusCodes.Finalized },
                }));

                if (Response.StatusCode != HttpStatusCode.NoContent)
                    throw new InvalidOperationException($"Old quotation cannot be updated >> Error: {Response.Content}");

                //Insert new quotation header
                var Header = RevisionDTO.QuotationHeader;
                var HeaderPayload = new Dictionary<string, object>()
                {
                    { "xollsp_noofcontainers" , Header.xollsp_noofcontainers},
                    { "statuscode" , (int)StatusCodes.Darft},
                    { "importsequencenumber" , Header.importsequencenumber},
                    { "xollsp_fromtariffsearch" , Header.xollsp_fromtariffsearch},
                    { "xollsp_loadtype" , Header.xollsp_loadtype},
                    { "xollsp_valueofgoods" , Header.xollsp_valueofgoods},
                    { "mesco_contractedrates" , Header.mesco_contractedrates},
                    { "xollsp_approvallevel2" , Header.xollsp_approvallevel2},
                    { "xollsp_totalsaleslcy_state" , Header.xollsp_totalsaleslcy_state},
                    { "xollsp_totalcostslcy" , Header.xollsp_totalcostslcy},
                    { "mesco_erpbookingnumber" , Header.mesco_erpbookingnumber},
                    { "xollsp_approvallevel2op" , Header.xollsp_approvallevel2op},
                    { "xollsp_origindetails" , Header.xollsp_origindetails},
                    { "xollsp_transshipment2description" , Header.xollsp_transshipment2description},
                    { "xollsp_minimumamountlevel2" , Header.xollsp_minimumamountlevel2},
                    { "xollsp_totalsaleslcy" , Header.xollsp_totalsaleslcy},
                    { "statecode" , (int)StateCodes.Active},
                    { "xollsp_quantity" , Header.xollsp_quantity},
                    { "versionnumber" , ++Header.versionnumber},
                    { "xollsp_deliverycity" , Header.xollsp_deliverycity},
                    { "processid" , Header.processid},
                    { "mesco_pickupaddressdetails" , Header.mesco_pickupaddressdetails},
                    { "xollsp_quotenumber" , Header.xollsp_quotenumber},
                    { "timezoneruleversionnumber" , Header.timezoneruleversionnumber},
                    { "xollsp_importexport" , Header.xollsp_importexport},
                    { "xollsp_unitmeasures" , Header.xollsp_unitmeasures},
                    { "xollsp_version" , ++Header.xollsp_version},
                    { "exchangerate" , Header.exchangerate},
                    { "xollsp_effectivefrom" , Header.xollsp_effectivefrom},
                    { "xollsp_totalcostslcy_date" , Header.xollsp_totalcostslcy_date},
                    { "xollsp_transporttype" , Header.xollsp_transporttype},
                    { "xollsp_approvallevel1" , Header.xollsp_approvallevel1},
                    { "xollsp_heightm" , Header.xollsp_heightm},
                    { "xollsp_adr" , Header.xollsp_adr},
                    { "utcconversiontimezonecode" , Header.utcconversiontimezonecode},
                    { "mesco_truckingbookingnumber" , Header.mesco_truckingbookingnumber},
                    { "xollsp_totalcostslcy_state" , Header.xollsp_totalcostslcy_state},
                    { "xollsp_pickupcity" , Header.xollsp_pickupcity},
                    { "mesco_imo" , Header.mesco_imo},
                    { "xollsp_reasonnonapproval" , Header.xollsp_reasonnonapproval},
                    { "mesco_freedays" , Header.mesco_freedays},
                    { "xollsp_grossweightkg" , Header.xollsp_grossweightkg},
                    { "xollsp_totalsaleslcy_date" , Header.xollsp_totalsaleslcy_date},
                    { "xollsp_destinationdetails" , Header.xollsp_destinationdetails},
                    { "xollsp_minimumamount_base" , Header.xollsp_minimumamount_base},
                    { "xollsp_todescription" , Header.xollsp_todescription},
                    { "xollsp_paymentterms" , Header.xollsp_paymentterms},
                    { "_xollsp_commoditygroup_value" , Header._xollsp_commoditygroup_value},
                    { "xollsp_marginbase" , Header.xollsp_marginbase},
                    { "xollsp_effectiveto" , Header.xollsp_effectiveto},
                    { "mesco_deliveryaddressdetails" , Header.mesco_deliveryaddressdetails},
                    { "xollsp_commoditydetails" , Header.xollsp_commoditydetails},
                    { "xollsp_lenghtm" , Header.xollsp_lenghtm},
                    { "new_transittime" , Header.new_transittime},
                    { "xollsp_transshipmentdescription" , Header.xollsp_transshipmentdescription},
                    { "xollsp_approvallevel1op" , Header.xollsp_approvallevel1op},
                    { "mesco_turnable" , Header.mesco_turnable},
                    { "xollsp_singleshipment" , Header.xollsp_singleshipment},
                    { "mesco_stackable" , Header.mesco_stackable},
                    { "xollsp_distancekm" , Header.xollsp_distancekm},
                    { "xollsp_volumem3" , Header.xollsp_volumem3},
                    { "mesco_tshipper" , Header.mesco_tshipper},
                    { "xollsp_ldm" , Header.xollsp_ldm},
                    { "new_containerstypeg" , Header.new_containerstypeg},
                    { "xollsp_widthm" , Header.xollsp_widthm},
                    { "xollsp_name" , Header.xollsp_name},
                    { $"createdby@odata.bind" , (Header._createdby_value == null ? null : $"/systemusers({Header._createdby_value})")},
                    { $"mesco_Agent2@odata.bind" , (Header._mesco_agent2_value == null ? null : $"/mesco_agents({Header._mesco_agent2_value})")},
                    { $"mesco_GateIn@odata.bind" , (Header._mesco_gatein_value == null ? null : $"/xollsp_addresses({Header._mesco_gatein_value})")},
                    { $"owningbusinessunit@odata.bind" , (Header._owningbusinessunit_value == null ? null : $"/businessunits({Header._owningbusinessunit_value})")},
                    { $"owningteam@odata.bind" , (Header._owningteam_value == null ? null : $"/teams({Header._owningteam_value})")},
                    { $"owninguser@odata.bind", (Header._owninguser_value == null ? null : $"/systemusers({Header._owninguser_value})")},
                    { $"stageid@odata.bind" , (Header._stageid_value == null ? null : $"/processstages({Header._stageid_value})")},
                    { $"transactioncurrencyid@odata.bind" , (Header._transactioncurrencyid_value == null ? null : $"/transactioncurrencies({Header._transactioncurrencyid_value})")},
                    { $"xollsp_Agent@odata.bind" , (Header._xollsp_agent_value == null ? null : $"/accounts({Header._xollsp_agent_value})")},
                    { $"xollsp_CommodityGroup@odata.bind" , (Header._xollsp_commoditygroup_value == null ? null : $"/xollsp_commoditygroups({Header._xollsp_commoditygroup_value})")},
                    { $"xollsp_Consignee@odata.bind" , (Header._xollsp_consignee_value == null ? null : $"/xollsp_addresses({Header._xollsp_consignee_value})")},
                    { $"xollsp_ContactPerson@odata.bind" , (Header._xollsp_contactperson_value == null ? null : $"/contacts({Header._xollsp_contactperson_value})")},
                    { $"xollsp_Customer_account@odata.bind" , (Header._xollsp_customer_value == null ? null : $"/accounts({Header._xollsp_customer_value})")},
                    { $"xollsp_DeliveryAddress@odata.bind" , (Header._xollsp_deliveryaddress_value == null ? null : $"/xollsp_addresses({Header._xollsp_deliveryaddress_value})")},
                    { $"xollsp_DeliveryCountry@odata.bind" , (Header._xollsp_deliverycountry_value == null ? null : $"/xollsp_countries({Header._xollsp_deliverycountry_value})")},
                    { $"xollsp_DeliveryPostalCode@odata.bind" , (Header._xollsp_deliverypostalcode_value == null ? null : $"/xollsp_postalcodes({Header._xollsp_deliverypostalcode_value})")},
                    { $"xollsp_Department@odata.bind" , (Header._xollsp_department_value == null ? null : $"/xollsp_departments({Header._xollsp_department_value})")},
                    { $"xollsp_From@odata.bind" , (Header._xollsp_from_value == null ? null : $"/xollsp_addresses({Header._xollsp_from_value})")},
                    { $"xollsp_Incoterm@odata.bind" , (Header._xollsp_incoterm_value == null ? null : $"/xollsp_incoterms({Header._xollsp_incoterm_value})")},
                    { $"xollsp_PickupAddress@odata.bind" , (Header._xollsp_pickupaddress_value == null ? null : $"/xollsp_addresses({Header._xollsp_pickupaddress_value})")},
                    { $"xollsp_PickupCountry@odata.bind" , (Header._xollsp_pickupcountry_value == null ? null : $"/xollsp_countries({Header._xollsp_pickupcountry_value})")},
                    { $"xollsp_PickupEndAddress@odata.bind" , (Header._xollsp_pickupendaddress_value == null ? null : $"/xollsp_addresses({Header._xollsp_pickupendaddress_value})")},
                    { $"xollsp_PickupPostalCode@odata.bind" , (Header._xollsp_pickuppostalcode_value == null ? null : $"/xollsp_postalcodes({Header._xollsp_pickuppostalcode_value})")},
                    { $"xollsp_Revisionof@odata.bind" , (Header.xollsp_tariffquoteid == null ? null : $"/xollsp_tariffquotes({Header.xollsp_tariffquoteid})")},
                    { $"xollsp_Shipper@odata.bind" , (Header._xollsp_shipper_value == null ? null : $"/xollsp_addresses({Header._xollsp_shipper_value})")},
                    { $"xollsp_Subdepartment@odata.bind" , (Header._xollsp_subdepartment_value == null ? null : $"/xollsp_subdepartments({Header._xollsp_subdepartment_value})")},
                    { $"xollsp_TariffType@odata.bind" , (Header._xollsp_tarifftype_value == null ? null : $"/xollsp_tarifftypes({Header._xollsp_tarifftype_value})")},
                    { $"xollsp_To@odata.bind" , (Header._xollsp_to_value == null ? null : $"/xollsp_addresses({Header._xollsp_to_value})")},
                    { $"xollsp_Transshipment@odata.bind" , (Header._xollsp_transshipment_value == null ? null : $"/xollsp_addresses({Header._xollsp_transshipment_value})")},
                    { $"xollsp_Transshipment2@odata.bind" , (Header._xollsp_transshipment2_value == null ? null : $"/xollsp_addresses({Header._xollsp_transshipment2_value})")},
                    { $"xollsp_UnitofMeasure@odata.bind" , (Header._xollsp_unitofmeasure_value == null ? null : $"/xollsp_unitsofmeasures({Header._xollsp_unitofmeasure_value})")},
                    { $"xollsp_UnitofMeasure2@odata.bind" , (Header._xollsp_unitofmeasure2_value == null ? null : $"/xollsp_unitsofmeasures({Header._xollsp_unitofmeasure2_value})")},
                };
                HeaderPayload = HeaderPayload.Where(k => k.Value != null).ToDictionary(k => k.Key, k => k.Value);
                Response = await InsertcrmData("xollsp_tariffquotes", HeaderPayload);
                if (Response.StatusCode != HttpStatusCode.NoContent)
                    throw new InvalidOperationException($"New quotation cannot be Inserted >> Error: {Response.Content}");

                var InsertedHeader = await GetcrmData<crmQuotationHeader>("xollsp_tariffquotes", "", $"xollsp_quotenumber eq '{RevisionDTO.QuotationHeader.xollsp_quotenumber}' and statuscode eq {(int)StatusCodes.Darft}");

                if (InsertedHeader.Count > 0)
                {
                    Response = await UpdatecrmData("xollsp_tariffquotes", InsertedHeader[0].xollsp_tariffquoteid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                    {
                        { "statuscode" , (int)StatusCodes.Accepted }
                    }));
                    RevisionDTO.NewCostLines.ForEach(item => item._xollsp_tariffquote_value = InsertedHeader[0].xollsp_tariffquoteid);
                    RevisionDTO.NewSalesLines.ForEach(item => item._xollsp_tariffquote_value = InsertedHeader[0].xollsp_tariffquoteid);
                }
                else
                    throw new InvalidOperationException($"New quotation cannot be Inserted");

                //insert cost lines
                Response = await crmLineInsertProcedure(RevisionDTO.NewCostLines, "xollsp_quotecostlines", InsertedHeader[0].xollsp_tariffquoteid);
                if (Response.StatusCode != HttpStatusCode.NoContent)
                    throw new InvalidOperationException($"CostLines cannot be Inserted >> Error: {Response.Content}");

                Response = await crmLineInsertProcedure(RevisionDTO.NewSalesLines, "xollsp_quotesaleslines", InsertedHeader[0].xollsp_tariffquoteid);
                if (Response.StatusCode != HttpStatusCode.NoContent)
                    throw new InvalidOperationException($"SalesLines cannot be Inserted >> Error: {Response.Content}");
            }
            catch (Exception Ex)
            {
                Response = await UpdatecrmData("xollsp_tariffquotes", RevisionDTO.QuotationHeader.xollsp_tariffquoteid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                {
                    { "statuscode" , (int)StatusCodes.Reviewed }
                }));
                Response = await UpdatecrmData("xollsp_tariffquotes", RevisionDTO.QuotationHeader.xollsp_tariffquoteid, new Dictionary<string, object>()
                {
                    { "statecode" , (int)StateCodes.Active }
                });
                Response = await UpdatecrmData("xollsp_tariffquotes", RevisionDTO.QuotationHeader.xollsp_tariffquoteid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                {
                    { "statuscode" , (int)StatusCodes.Accepted }
                }));
                Response = await UpdatecrmData("xollsp_tariffquotes", RevisionDTO.QuotationHeader.xollsp_tariffquoteid, JsonConvert.SerializeObject(new Dictionary<string, object>()
                {
                    { "xollsp_RevisionMotive@odata.bind" , null }
                }));

                return Ex.Message;
            }
            return "";
        }
        async private Task<IRestResponse> crmLineInsertProcedure(List<crmLine> crmLinesToBeInserted, string TableName, string crmQuotationID)
        {
            IRestResponse Response = new RestResponse() { StatusCode = HttpStatusCode.NoContent };
            foreach (var item in crmLinesToBeInserted)
            {
                var Payload = new Dictionary<string, object>()
                {
                    { "xollsp_importexport" , item.xollsp_importexport},
                    { "new_freightterm" , item.new_freightterm},
                    { "xollsp_sortingsequence" , item.xollsp_sortingsequence},
                    { "xollsp_transittime" , item.xollsp_transittime},
                    { "xollsp_totalamount" , item.xollsp_totalamount},
                    { "xollsp_grossweightkg" , item.xollsp_grossweightkg},
                    { "xollsp_fixedamount" , item.xollsp_fixedamount},
                    { "timezoneruleversionnumber" , item.timezoneruleversionnumber},
                    { "statuscode" , item.statuscode},
                    { "xollsp_exchangerate" , item.xollsp_exchangerate},
                    { "xollsp_transporttype" , item.xollsp_transporttype},
                    { "mesco_freedays" , item.mesco_freedays},
                    { "new_freightcontractholder" , item.new_freightcontractholder},
                    { "xollsp_quantity" , item.xollsp_quantity},
                    { "versionnumber" , item.versionnumber},
                    { "xollsp_stepsize" , item.xollsp_stepsize},
                    { "xollsp_roundingmethod" , item.xollsp_roundingmethod},
                    { "xollsp_noofunits" , item.xollsp_noofunits},
                    { "xollsp_unitamountbase" , item.xollsp_unitamountbase},
                    { "xollsp_fixedamountbase" , item.xollsp_fixedamountbase},
                    { "xollsp_loadtype" , item.xollsp_loadtype},
                    { "statecode" , item.statecode},
                    { "xollsp_totalamountbase" , item.xollsp_totalamountbase},
                    { "mesco_nooftrips" , item.mesco_nooftrips},
                    { "xollsp_unitamount" , item.xollsp_unitamount},
                    { "xollsp_name" , item.xollsp_name},
                    { "xollsp_comments" , item.xollsp_comments},
                    { "xollsp_commoditydescription" , item.xollsp_commoditydescription},
                    { "mesco_acid" , item.mesco_acid},
                    { "mesco_imo" , item.mesco_imo},
                    { "mesco_stackable" , item.mesco_stackable},
                    { "mesco_turnable" , item.mesco_turnable},
                    { "xollsp_unitmeasures" , item.xollsp_unitmeasures},
                    { "mesco_clearancetype" , item.mesco_clearancetype},
                    { "mesco_superdrymeasure" , item.mesco_superdrymeasure},
                    { "xollsp_validto" , item.xollsp_validto},
                    { "xollsp_validfrom" , item.xollsp_validfrom},
                    { $"xollsp_LogisticService@odata.bind" , (item._xollsp_logisticservice_value == null ? null : $"/xollsp_servicedefinitions({item._xollsp_logisticservice_value})")},
                    { $"xollsp_TariffQuote@odata.bind" , (item._xollsp_tariffquote_value == null ? null : $"/xollsp_tariffquotes({item._xollsp_tariffquote_value})")},
                    { $"xollsp_From@odata.bind" , (item._xollsp_from_value == null ? null : $"/xollsp_addresses({item._xollsp_from_value})")},
                    { $"xollsp_To@odata.bind" , (item._xollsp_to_value == null ? null : $"/xollsp_addresses({item._xollsp_to_value})")},
                    { $"mesco_Vendor2@odata.bind" , (item._mesco_vendor2_value == null ? null : $"/accounts({item._mesco_vendor2_value})")},
                    { $"owningbusinessunit@odata.bind" , (item._owningbusinessunit_value == null ? null : $"/businessunits({item._owningbusinessunit_value})")},
                    { $"owninguser@odata.bind", (item._owninguser_value == null ? null : $"/systemusers({item._owninguser_value})")},
                    { $"mesco_ShippingLine@odata.bind" , (item._mesco_shippingline_value == null ? null : $"/mesco_shippinglines({item._mesco_shippingline_value})")},
                    { $"mesco_Agent2@odata.bind" , (item._mesco_agent2_value == null ? null : $"/mesco_agents({item._mesco_agent2_value})")},
                    { $"xollsp_Currency@odata.bind" , (item._xollsp_currency_value == null ? null : $"/transactioncurrencies({item._xollsp_currency_value})")},
                    { $"xollsp_CommodityGroup@odata.bind" , (item._xollsp_commoditygroup_value == null ? null : $"/xollsp_commoditygroups({item._xollsp_commoditygroup_value})")},
                    { $"mesco_AirLine2@odata.bind" , (item._mesco_airline2_value == null ? null : $"/mesco_airlines({item._mesco_airline2_value})")},
                    { $"xollsp_UnitofMeasure@odata.bind" , (item._xollsp_unitofmeasure_value == null ? null : $"/xollsp_unitsofmeasures({item._xollsp_unitofmeasure_value})")}
                };
                //Change quotations status to draft to be able to insert new records
                //Response = await UpdatecrmData("xollsp_tariffquotes", crmQuotationID, new { statuscode = 1 });
                Payload = Payload.Where(k => k.Value != null).ToDictionary(k => k.Key, k => k.Value);
                Response = await InsertcrmData(TableName, Payload);

                if(item.forwardingID > 0 && 1==2 /* change when having crmcode response    */)
                {


                    UpdateChargesCRMCode(item.forwardingID ,"new crmcode from response", TableName);



                }




                //Change quotations status to accepted again
                //Response = await UpdatecrmData("xollsp_tariffquotes", crmQuotationID, new { statuscode = 300000008 });
            }
            return Response;
        }
        async private Task<IRestResponse> DeletecrmData(string TableName, string crmRecordID)
        {
            string access_token = Auth();
            var client = new RestClient($"{url}");
            client.Authenticator = new JwtAuthenticator(access_token);
            var request = new RestRequest($"/api/data/v9.2.23022.00178/{TableName}({crmRecordID})", Method.DELETE);
            request.AddHeader("Accept", "application/json");
            var response = await client.ExecuteTaskAsync(request);

            return response;
        }
        async private Task<IRestResponse> crmLineDeleteProcedure(List<string> crmLinesToBeDeleted, string TableName, string crmQuotationID)
        {
            IRestResponse Response = new RestResponse() { StatusCode = HttpStatusCode.NoContent };
            foreach (var item in crmLinesToBeDeleted)
            {
                //Change quotations status to draft to be able to insert new records
                Response = await UpdatecrmData("xollsp_tariffquotes", crmQuotationID, new { statuscode = 1 });
                Response = await DeletecrmData(TableName, item);
                //Change quotations status to accepted again
                Response = await UpdatecrmData("xollsp_tariffquotes", crmQuotationID, new { statuscode = 300000008 });
            }
            return Response;
        }
        private string CheckResponse(IRestResponse Response, HttpStatusCode SuccessStatusCode, string ErrorMessage)
        {
            if (Response.StatusCode != SuccessStatusCode)
                return ErrorMessage;
            else
                return "";
        }
         private bool UpdateChargesCRMCode(long? ForwardingID, string NewCrmID  , string TableName)
         {
            var Result = false;
            CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();
            if (TableName == "xollsp_quotecostlines")
            {

                //CPayables update logic
                cCustomizedDBCall.CallStringFunction($"update  Payables set crmcode = '{NewCrmID}' where id = {ForwardingID}");




            }
            else if (TableName == "xollsp_quotesaleslines")
            {



                //cReceivables Update Logic

                cCustomizedDBCall.CallStringFunction($"update  Receivables set crmcode = '{NewCrmID}' where id = {ForwardingID}");




            }







            return Result;
         }





    }

    public class crmLineUpdateDTO
    {
        public decimal? xollsp_quantity { get; set; }
        public decimal? xollsp_unitamount { get; set; }
        public decimal? xollsp_exchangerate { get; set; }
    }
    public class crmLine
    {
        public string _mesco_vendor2_value { get; set; }
        public int? xollsp_importexport { get; set; }
        public string xollsp_name { get; set; }
        public string xollsp_comments { get; set; }
        public bool mesco_imo { get; set; }
        public int? new_freightterm { get; set; }
        public string _owningbusinessunit_value { get; set; }
        public string _owninguser_value { get; set; }
        public string _mesco_shippingline_value { get; set; }
        public DateTime? xollsp_validto { get; set; }
        public DateTime? xollsp_validfrom { get; set; }
        public int? xollsp_sortingsequence { get; set; }
        public string _mesco_agent2_value { get; set; }
        public int? xollsp_transittime { get; set; }
        public decimal? xollsp_totalamount { get; set; }
        public string xollsp_commoditydescription { get; set; }
        public bool mesco_stackable { get; set; }
        public bool mesco_turnable { get; set; }
        public decimal? xollsp_grossweightkg { get; set; }
        public decimal? xollsp_fixedamount { get; set; }
        public int? timezoneruleversionnumber { get; set; }
        public bool xollsp_unitmeasures { get; set; }
        public int? statuscode { get; set; }
        public DateTime? createdon { get; set; }
        public decimal? xollsp_exchangerate { get; set; }
        public string _xollsp_logisticservice_value { get; set; }
        public string mesco_acid { get; set; }
        public int? xollsp_transporttype { get; set; }
        public int? mesco_freedays { get; set; }
        public int? new_freightcontractholder { get; set; }
        public decimal? xollsp_quantity { get; set; }
        public long? versionnumber { get; set; }
        public DateTime? modifiedon { get; set; }
        public decimal? xollsp_stepsize { get; set; }
        public string _xollsp_currency_value { get; set; }
        public int? xollsp_roundingmethod { get; set; }
        public string _xollsp_to_value { get; set; }
        public decimal? xollsp_noofunits { get; set; }
        public decimal? xollsp_unitamountbase { get; set; }
        public bool mesco_clearancetype { get; set; }
        public bool mesco_superdrymeasure { get; set; }
        public string _xollsp_from_value { get; set; }
        public string _xollsp_commoditygroup_value { get; set; }
        public string _xollsp_tariffquote_value { get; set; }
        public string _xollsp_unitofmeasure_value { get; set; }
        public decimal? xollsp_fixedamountbase { get; set; }
        public int? xollsp_loadtype { get; set; }
        public int? statecode { get; set; }
        public decimal? xollsp_totalamountbase { get; set; }
        public string _mesco_airline2_value { get; set; }
        public int? mesco_nooftrips { get; set; }
        public decimal? xollsp_unitamount { get; set; }
        public string _xollsp_vendor_value { get; set; }
        public crmServiceDefinition xollsp_LogisticService { get; set; }
        public crmCurrency xollsp_Currency { get; set; }
        public crmQuotationHeader xollsp_TariffQuote { get; set; }

        public crmLineUpdateDTO UpdateProperties { get; set; }


        public long? forwardingID { get; set; }

    }
    public class QuoteSalesLine : crmLine
    {
        public string xollsp_quotesaleslineid { get; set; } = "";
        //Overriding Equals & GetHashCode methods to be able to compare two objects according to their LogisticService value
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;

            var OtherObject = (QuoteSalesLine)obj;
            return OtherObject.xollsp_quotesaleslineid == this.xollsp_quotesaleslineid && OtherObject._xollsp_logisticservice_value == this._xollsp_logisticservice_value && OtherObject._xollsp_currency_value == this._xollsp_currency_value;
        }

        public override int GetHashCode()
        {
            int hash = 17;
            hash = hash * 23 + xollsp_quotesaleslineid.GetHashCode();
            hash = hash * 23 + _xollsp_logisticservice_value.GetHashCode();
            hash = hash * 23 + _xollsp_currency_value.GetHashCode();
            return hash;
        }
    }
    public class QuoteCostLine : crmLine
    {
        public string xollsp_quotecostlineid { get; set; }
        //Overriding Equals & GetHashCode methods to be able to compare two objects according to their LogisticService value
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;

            var OtherObject = (QuoteCostLine)obj;
            return OtherObject.xollsp_quotecostlineid == this.xollsp_quotecostlineid && OtherObject._xollsp_logisticservice_value == this._xollsp_logisticservice_value && OtherObject._xollsp_currency_value == this._xollsp_currency_value;
        }

        public override int GetHashCode()
        {
            int hash = 17;
            hash = hash * 23 + xollsp_quotecostlineid.GetHashCode();
            hash = hash * 23 + _xollsp_logisticservice_value.GetHashCode();
            hash = hash * 23 + _xollsp_currency_value.GetHashCode();
            return hash;
        }
    }
    public class crmQuotationHeader
    {
        public decimal? xollsp_noofcontainers { get; set; }
        public string _owningbusinessunit_value { get; set; } = "";
        public string xollsp_fromdescription { get; set; } = "";
        public int? statuscode { get; set; }
        public int? importsequencenumber { get; set; }
        public bool? xollsp_fromtariffsearch { get; set; }
        public int? xollsp_loadtype { get; set; }
        public string _transactioncurrencyid_value { get; set; }
        public decimal? xollsp_valueofgoods { get; set; }
        public bool? mesco_contractedrates { get; set; }
        public bool? xollsp_approvallevel2 { get; set; }
        public int? xollsp_totalsaleslcy_state { get; set; }
        public decimal? xollsp_totalcostslcy { get; set; }
        public string mesco_erpbookingnumber { get; set; }
        public string _xollsp_transshipment_value { get; set; }
        public string _xollsp_consignee_value { get; set; }
        public string _ownerid_value { get; set; }
        public string _mesco_gatein_value { get; set; }
        public string _xollsp_revisionmotive_value { get; set; }
        public string _xollsp_agent_value { get; set; }
        public string _owninguser_value { get; set; }
        public int? xollsp_approvallevel2op { get; set; }
        public string _xollsp_customer_value { get; set; }
        public string xollsp_origindetails { get; set; }
        public string xollsp_transshipment2description { get; set; }
        public decimal? xollsp_minimumamountlevel2 { get; set; }
        public string _xollsp_pickuppostalcode_value { get; set; }
        public decimal? xollsp_totalsaleslcy { get; set; }
        public int? statecode { get; set; }
        public decimal? xollsp_quantity { get; set; }
        public string xollsp_tariffquoteid { get; set; }
        public string _xollsp_unitofmeasure_value { get; set; }
        public string _xollsp_pickupaddress_value { get; set; }
        public long? versionnumber { get; set; }
        public string xollsp_deliverycity { get; set; }
        public string processid { get; set; }
        public string mesco_pickupaddressdetails { get; set; }
        public string xollsp_quotenumber { get; set; }
        public string _xollsp_tarifftype_value { get; set; }
        public string _xollsp_subdepartment_value { get; set; }
        public string _owningteam_value { get; set; }
        public string _xollsp_unitofmeasure2_value { get; set; }
        public int? timezoneruleversionnumber { get; set; }
        public string _mesco_agent2_value { get; set; }
        public int? xollsp_importexport { get; set; }
        public bool? xollsp_unitmeasures { get; set; }
        public int? xollsp_version { get; set; }
        public decimal? exchangerate { get; set; }
        public DateTime? xollsp_effectivefrom { get; set; }
        public DateTime? xollsp_totalcostslcy_date { get; set; }
        public int? xollsp_transporttype { get; set; }
        public string _xollsp_pickupendaddress_value { get; set; }
        public string _xollsp_contactperson_value { get; set; }
        public bool? xollsp_approvallevel1 { get; set; }
        public string _xollsp_transshipment2_value { get; set; }
        public decimal? xollsp_heightm { get; set; }
        public bool? xollsp_adr { get; set; }
        public int? utcconversiontimezonecode { get; set; }
        public string mesco_truckingbookingnumber { get; set; }
        public string _xollsp_incoterm_value { get; set; }
        public int? xollsp_totalcostslcy_state { get; set; }
        public string xollsp_pickupcity { get; set; }
        public bool? mesco_imo { get; set; }
        public string xollsp_reasonnonapproval { get; set; }
        public int? mesco_freedays { get; set; }
        public decimal? xollsp_grossweightkg { get; set; }
        public DateTime? xollsp_totalsaleslcy_date { get; set; }
        public string _xollsp_pickupcountry_value { get; set; }
        public string xollsp_destinationdetails { get; set; }
        public decimal? xollsp_minimumamount_base { get; set; }
        public string xollsp_todescription { get; set; }
        public string _xollsp_deliverypostalcode_value { get; set; }
        public string _createdby_value { get; set; }
        public int? xollsp_paymentterms { get; set; }
        public string _xollsp_shipper_value { get; set; }
        public string _xollsp_commoditygroup_value { get; set; }
        public decimal? xollsp_marginbase { get; set; }
        public DateTime? xollsp_effectiveto { get; set; }
        public string mesco_deliveryaddressdetails { get; set; }
        public string xollsp_commoditydetails { get; set; }
        public decimal? xollsp_lenghtm { get; set; }
        public string _stageid_value { get; set; }
        public string _xollsp_deliverystartaddress_value { get; set; }
        public string _xollsp_department_value { get; set; }
        public int? new_transittime { get; set; }
        public string _xollsp_from_value { get; set; }
        public string xollsp_transshipmentdescription { get; set; }
        public int? xollsp_approvallevel1op { get; set; }
        public bool? mesco_turnable { get; set; }
        public bool? xollsp_singleshipment { get; set; }
        public string _xollsp_deliverycountry_value { get; set; }
        public bool? mesco_stackable { get; set; }
        public string _xollsp_deliveryaddress_value { get; set; }
        public string _xollsp_to_value { get; set; }
        public string mesco_consignee { get; set; }
        public string _xollsp_revisionof_value { get; set; }
        public decimal? xollsp_distancekm { get; set; }
        public decimal? xollsp_volumem3 { get; set; }
        public string mesco_tshipper { get; set; }
        public decimal? xollsp_ldm { get; set; }
        public int? new_containerstypeg { get; set; }
        public decimal? xollsp_widthm { get; set; }
        public string xollsp_name { get; set; }
        public DateTime? mesco_plfinaldate { get; set; }
    }
    public class ServiceDefinition
    {
        public string xollsp_servicedefinitionid { get; set; } = "";
        public string xollsp_name { get; set; } = "";
    }
    public class IntegrationCrmLine
    {
        public string _xollsp_tariffquote_value { get; set; }
        public string _xollsp_logisticservice_value { get; set; }
        public int? xollsp_quantity { get; set; }
        public decimal? xollsp_unitamount { get; set; }
        public decimal xollsp_totalamount { get; set; }
        public string _xollsp_currency_value { get; set; }
        public decimal? xollsp_exchangerate { get; set; }
        public string _xollsp_vendor_value { get; set; }
        public DateTime createdon { get; set; }
        public int? xollsp_noofcontainers { get; set; }
        public int? xollsp_noofunits { get; set; }
        public int? new_containerstype { get; set; }
        public decimal? xollsp_grossweightkg { get; set; }
        public string _xollsp_unitofmeasure_value { get; set; }
        public decimal? xollsp_lenghtm { get; set; }
        public decimal? xollsp_widthm { get; set; }
        public decimal? xollsp_heightm { get; set; }
        public decimal? xollsp_volumem3 { get; set; }
        public decimal? mesco_volumetricweightair2 { get; set; }
        public decimal? mesco_chargeableweightair2 { get; set; }
        public int? xollsp_transporttype { get; set; }
    }
    public class crmAccount
    {
        public string accountid { get; set; }
        public string name { get; set; }
        public string mesco_arabicname { get; set; }
        public string xollsp_vatnumber { get; set; }
        public string address1_country { get; set; } = "";
        public string address1_city { get; set; } = "";
        public string address1_line1 { get; set; } = "";
        public string address1_line2 { get; set; } = "";
        public crmParentAccount parentaccountid { get; set; }
    }
    public class crmAgent
    {
        public string mesco_agentid { get; set; }
        public string mesco_name { get; set; }
    }
    public class crmParentAccount
    {
        public string accountid { get; set; }
        public string name { get; set; }
    }
    public class crmServiceDefinition
    {
        public string xollsp_servicedefinitionid { get; set; }
        public string xollsp_name { get; set; }
        public int? xollsp_servicetype { get; set; } = 0;
    }
    public class crmAddress
    {
        public string xollsp_addressid { get; set; }
        public string xollsp_name { get; set; }
        public string xollsp_name2 { get; set; }
        public int? xollsp_type { get; set; }
        public int? xollsp_addressspecification { get; set; }
    }
    public class crmCountry
    {
        public string xollsp_countryid { get; set; }
        public string xollsp_name { get; set; }
        public string xollsp_code { get; set; }
    }
    public class crmSystemUser
    {
        public string systemuserid { get; set; }
        public string fullname { get; set; }
        public string userpuid { get; set; }
    }
    public class crmSystemTeam
    {
        public string teamid { get; set; }
        public string name { get; set; }
    }
    public class crmIncoterm
    {
        public string xollsp_incotermid { get; set; }
        public string xollsp_name { get; set; }
        public string xollsp_description { get; set; }
    }
    public class crmAirLine
    {
        public string mesco_airlineid { get; set; }
        public string mesco_name { get; set; }
    }
    public class crmShippingLine
    {
        public string mesco_shippinglineid { get; set; }
        public string mesco_name { get; set; }
    }
    public class crmCurrency
    {
        public string transactioncurrencyid { get; set; }
        public string isocurrencycode { get; set; }
        public string currencyname { get; set; }
    }
    public class crmUnitOfMeasure
    {
        public string xollsp_unitsofmeasureid { get; set; }
        public string xollsp_name { get; set; }
    }
    public class RevisionDTO
    {
        public crmQuotationHeader QuotationHeader { get; set; }
        public List<crmLine> NewCostLines { get; set; }
        public List<crmLine> NewSalesLines { get; set; }
    }
    public class IntegrationOptionsDTO
    {
        public string CrmTableName { get; set; }
        public string ForwardingTableName { get; set; }
        public string CrmIdFieldName { get; set; }
        public string CrmComparisonFieldName { get; set; }
        public string CrmID { get; set; }
        public string ForwardingComparisonFieldName { get; set; }
        public int ForwardingID { get; set; }
        public string SelectedColumns { get; set; } = "";
        public string SearchKey { get; set; } = "";
    }
    public class UpdateChargesDTO
    {
        public List<QuoteCostLine> CostLines { get; set; }
        public List<QuoteSalesLine> SalesLines { get; set; }
        public CVarOperations Operation { get; set; }
        public long QuotationRouteID { get; set; }
        public crmQuotationHeader QuotationHeader { get; set; }
        public List<CVarPayables> ExistingPayables { get; set; }
        public List<CVarReceivables> ExistingReceivables { get; set; }
    }
    public enum TransportTypes
    {
        Ocean = 300000000,
        Truck = 300000001,
        Air = 300000002,
        Gensets = 886150006,
        Warehousing = 886150005,
        Trading = 886150004,
        ContainerSale = 886150002,
        Multimodal = 300000003
    }
    public enum DirectionTypes
    {
        Import = 300000000,
        Export = 300000001,
        Domestic = 300000002,
        CrossBooking = 300000003
    }
    public enum ShipmentTypes
    {
        FCL = 300000000,
        LCL = 300000001
    }
    public enum FreightTerm
    {
        Prepaid = 100000000,
        Collect = 100000001
    }
    public enum StatusCodes
    {
        Darft = 1,
        Sent = 300000006,
        Accepted = 300000008,
        Canceled = 2,
        Refused = 300000005,
        Reviewed = 300000002,
        Finalized = 214050001
    }
    public enum StateCodes
    {
        Active = 0,
        Inactive = 1
    }
}