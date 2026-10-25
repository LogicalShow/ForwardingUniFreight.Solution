using Forwarding.MvcApp.Common;
using Forwarding.MvcApp.Controllers.Administration.API_Security;
using Forwarding.MvcApp.Controllers.MasterData.API_Locations;
using Forwarding.MvcApp.Controllers.Pricing.API_Pricing;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.PricingModule.PricingTab;
using Forwarding.MvcApp.Models.ShipsGo;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ShipsGo
{
    public class ShipsGoAPIController : ApiController
    {
        private string APIKeyIST = "5a9ee7598ca2d0273f39786550d760ed";
        private string LiveAPIKey = "c504c46bd3fc3d739e3a05ca1faab346";
        [System.Web.Http.HttpGet]
        public object GetContainerData(string SearchKey)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var client = new RestClient("https://shipsgo.com");
            var request = new RestRequest("/api/v1.1/ContainerService/PostContainerInfo", Method.POST);
            request.AddHeader("Accept", "application/json");
            var body = new
            {
                shippingLine = "OTHERS",
                authCode = APIKeyIST,
                containerNumber = SearchKey
            };
            request.AddObject(body);
            try
            {
                var response = client.Execute(request);
                var requestID = response.Content;
                var containerData = GetData(requestID, APIKeyIST);
                return containerData;
            }
            catch (Exception error)
            {
                return error.Message;
            }

        }

        public object GetContainerDataWithBL(string SearchKey)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var client = new RestClient("https://shipsgo.com");
            var request = new RestRequest("/api/v1.1/ContainerService/PostContainerInfoWithBl", Method.POST);
            request.AddHeader("Accept", "application/json");
            var body = new
            {
                shippingLine = "OTHERS",
                authCode = APIKeyIST,
                blContainersRef = SearchKey
            };
            request.AddObject(body);
            try
            {
                var response = client.Execute(request);
                var requestID = response.Content;
                var containerData = GetData(requestID, APIKeyIST);
                return containerData;
            }
            catch (Exception error)
            {
                return error.Message;
            }

        }

        private object GetData(string requestID, string key)
        {
            var client = new RestClient("https://shipsgo.com");
            var request = new RestRequest("/api/v1.1/ContainerService/GetContainerInfo", Method.GET);
            request.AddHeader("Accept", "application/json");
            var param = new
            {
                authCode = key,
                requestId = requestID
            };
            request.AddObject(param);
            try
            {
                var response = client.Execute(request);
                var containerData = JsonConvert.DeserializeObject(response.Content);
                return containerData;
            }
            catch (Exception error)
            {
                return error.Message;
            }
        }
        [System.Web.Http.HttpGet]
        public List<Container> TrackNewShipment(string SearchKey, long pOperationID)
        {
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri.ToLower();
            if (!absoluteUrl.Contains("forwardingarkbl") && !absoluteUrl.Contains("forwardingelite"))
            {
                return new List<Container>(){
                    new Container()
                        {
                            Message = "Not Live"
                        }
                };
            }

            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var client = new RestClient("https://shipsgo.com");
            var request = new RestRequest("/api/v1.1/ContainerService/PostContainerInfoWithBl", Method.POST);
            request.AddHeader("Accept", "application/json");
            var body = new
            {
                shippingLine = "OTHERS",
                authCode = LiveAPIKey,
                blContainersRef = SearchKey
            };
            request.AddObject(body);
            try
            {
                var response = client.Execute(request);
                WriteToLog($"[Get RequestID ({SearchKey})] ,Operation ID=>{pOperationID}, Status: {response.StatusCode}, Content Length: {response.Content?.Length ?? 0}");

                if (response.StatusCode != HttpStatusCode.OK)
                {
                    WriteToLog($"[Get RequestID ({SearchKey})] Error Status: {response.StatusCode}, Error Message: {response.ErrorMessage}");
                } else
                {
                    WriteToLog($"[Get RequestID ({SearchKey})] Operation ID=>" + pOperationID + " ||" + response.Content);
                }
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

                var requestID = response.Content;
                long rID = 0;
                if(long.TryParse(requestID,out long r))
                {
                    rID = r;
                } else
                {
                    objCCustomizedDBCall.ExecuteQuery($"INSERT INTO ShipsGoLog (OperationID,Log,LogFor) Values ({pOperationID},'{response.Content.Replace('\'', '"')}','Error')");
                    return new List<Container>()
                    {
                        new Container()
                        {
                            Message = requestID
                        }
                    };
                }

                objCCustomizedDBCall.ExecuteQuery($"INSERT INTO ShipsGoLog (OperationID,Log,LogFor,RequestID) Values ({pOperationID},'{response.Content.Replace('\'', '"')}','RequestID',{rID})");

                List<Container> containerData = GetDataNew(requestID, pOperationID);
                return containerData;
            }
            catch (Exception error)
            {
                WriteToLog("Operation ID=>" + pOperationID + " ||" + error.Message);
                return new List<Container>()
                {
                    new Container()
                    {
                        Message = error.Message
                    }
                };
            }
        }

        public List<Container> GetDataNew(string requestID, long pOperationID)
        {
            var client = new RestClient("https://shipsgo.com");
            var request = new RestRequest("/api/v1.1/ContainerService/GetContainerInfo", Method.GET);
            request.AddHeader("Accept", "application/json");
            var param = new
            {
                authCode = LiveAPIKey,
                requestId = requestID
            };
            request.AddObject(param);
            try
            {
                var response = client.Execute(request);

                WriteToLog($"[Get Data ({requestID})] Operation ID=>" + pOperationID + " ||" + response.Content);
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.ExecuteQuery($"INSERT INTO ShipsGoLog (OperationID,Log,LogFor) Values ({pOperationID},'{response.Content.Replace('\'','"')}','Data')");

                List<Container> containerData = JsonConvert.DeserializeObject<List<Container>>(response.Content);
                return containerData;
            }
            catch (Exception error)
            {
                WriteToLog("Operation ID=>" + pOperationID + " ||" + error.Message);
                return new List<Container>()
                {
                    new Container()
                    {
                        Message = error.Message
                    }
                };
            }
        }

        private List<string> CompareJsonObjects(JObject obj1, JObject obj2, string parentKey = "")
        {

            /*
             string json1 = "[{ \"Message\": \"Success\", \"Status\": \"Discharged\", \"StatusId\": 50, \"BLReferenceNo\": \"HLCUGDY241253483\" }]";
            string json2 = "[{ \"Message\": \"Success\", \"Status\": \"In Transit\", \"StatusId\": 50, \"BLReferenceNo\": \"HLCUGDY241253483\" }]";

            var obj1 = JsonConvert.DeserializeObject<List<JObject>>(json1);
            var obj2 = JsonConvert.DeserializeObject<List<JObject>>(json2);

            var changes = CompareJsonObjects(obj1[0], obj2[0]);

            Console.WriteLine("Changed Properties:");
            foreach (var change in changes)
            {
                Console.WriteLine(change);
            }
             
             */
            List<string> changes = new List<string>();

            foreach (var property in obj1.Properties())
            {
                string fullPath = string.IsNullOrEmpty(parentKey) ? property.Name : $"{parentKey}.{property.Name}";

                if (!obj2.ContainsKey(property.Name))
                {
                    changes.Add($"Removed: {fullPath}");
                    continue;
                }

                var value1 = property.Value;
                var value2 = obj2[property.Name];

                if (value1.Type != value2.Type)
                {
                    changes.Add($"Type Changed: {fullPath} (Old: {value1.Type}, New: {value2.Type})");
                }
                else if (value1.Type == JTokenType.Object)
                {
                    changes.AddRange(CompareJsonObjects((JObject)value1, (JObject)value2, fullPath));
                }
                else if (value1.Type == JTokenType.Array)
                {
                    var array1 = value1 as JArray;
                    var array2 = value2 as JArray;

                    if (array1.Count != array2.Count)
                    {
                        changes.Add($"Array Length Changed: {fullPath} (Old: {array1.Count}, New: {array2.Count})");
                    }

                    for (int i = 0; i < Math.Min(array1.Count, array2.Count); i++)
                    {
                        if (!JToken.DeepEquals(array1[i], array2[i]))
                        {
                            changes.Add($"Array Element Changed: {fullPath}[{i}]");
                        }
                    }
                }
                else if (!JToken.DeepEquals(value1, value2))
                {
                    changes.Add($"Changed: {fullPath} (Old: {value1}, New: {value2})");
                }
            }

            foreach (var property in obj2.Properties())
            {
                if (!obj1.ContainsKey(property.Name))
                {
                    string fullPath = string.IsNullOrEmpty(parentKey) ? property.Name : $"{parentKey}.{property.Name}";
                    changes.Add($"Added: {fullPath}");
                }
            }

            return changes;
        }

        [System.Web.Http.HttpGet]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _rowCount = 0;
            Exception checkException = null;
            string _messageReturned = "";


            CvwShipsGoCustomers objCvwShipsGoCustomers = new CvwShipsGoCustomers();
            checkException = objCvwShipsGoCustomers.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _rowCount);


            if (checkException != null)
            {
                _messageReturned = checkException.Message;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[]
            {
                serializer.Serialize(objCvwShipsGoCustomers.lstCVarvwShipsGoCustomers), // 0
                _rowCount, // 1
                _messageReturned  //2
                
            };

        }

        [System.Web.Http.HttpPost]
        public object[] Insert([FromBody] ShipsGoCustomerData insertData)
        {
            bool _result = false;

            CShipsGoCustomers objCShipsGoCustomers = new CShipsGoCustomers();
            CVarShipsGoCustomers objCVarShipsGoCustomers = new CVarShipsGoCustomers();
            objCVarShipsGoCustomers.ID = 0;
            objCVarShipsGoCustomers.CustomerID = insertData.CustomerID;
            objCVarShipsGoCustomers.Email = insertData.Email;
            objCVarShipsGoCustomers.Status = insertData.Status;
            objCVarShipsGoCustomers.BLReferenceNo = insertData.BLReferenceNo;
            objCVarShipsGoCustomers.ShippingLine = insertData.ShippingLine;
            objCVarShipsGoCustomers.ContainerNumber = insertData.ContainerNumber;
            objCVarShipsGoCustomers.ContainerTEU = insertData.ContainerTEU;
            objCVarShipsGoCustomers.FromCountry = insertData.FromCountry;
            objCVarShipsGoCustomers.Pol = insertData.Pol;
            objCVarShipsGoCustomers.LoadingDate = insertData.LoadingDate;
            objCVarShipsGoCustomers.DepartureDate = insertData.DepartureDate;
            objCVarShipsGoCustomers.TSPorts = insertData.TSPorts;
            objCVarShipsGoCustomers.ToCountry = insertData.ToCountry;
            objCVarShipsGoCustomers.Pod = insertData.Pod;
            objCVarShipsGoCustomers.ArrivalDate = insertData.ArrivalDate;
            objCVarShipsGoCustomers.DischargeDate = insertData.DischargeDate;
            objCVarShipsGoCustomers.Vessel = insertData.Vessel;
            objCVarShipsGoCustomers.VesselIMO = insertData.VesselIMO;
            objCVarShipsGoCustomers.GateOutDate = insertData.GateOutDate;
            objCVarShipsGoCustomers.EmptyReturnDate = insertData.EmptyReturnDate;
            objCVarShipsGoCustomers.FormatedTransitTime = insertData.FormatedTransitTime;
            objCVarShipsGoCustomers.ETA = insertData.ETA;
            objCVarShipsGoCustomers.FirstETA = insertData.FirstETA;
            objCVarShipsGoCustomers.BLContainerCount = insertData.BLContainerCount;
            objCVarShipsGoCustomers.BLContainers = insertData.BLContainers;
            objCVarShipsGoCustomers.CreatorUserID = objCVarShipsGoCustomers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarShipsGoCustomers.CreationDate = objCVarShipsGoCustomers.ModificationDate = DateTime.Now;
            objCVarShipsGoCustomers.FromDate = insertData.FromDate;
            objCVarShipsGoCustomers.ToDate = insertData.ToDate;
            objCVarShipsGoCustomers.IsImport = insertData.IsImport;
            objCVarShipsGoCustomers.IsExport = insertData.IsExport;
            objCVarShipsGoCustomers.IsHaveCC = insertData.IsHaveCC;

            objCShipsGoCustomers.lstCVarShipsGoCustomers.Add(objCVarShipsGoCustomers);
            Exception checkException = objCShipsGoCustomers.SaveMethod(objCShipsGoCustomers.lstCVarShipsGoCustomers);

            string _message = "";
            if (checkException == null)
            {
                _result = true;
            }
            else
            {
                _message = checkException.Message;
            }

            return new object[] { _result, _message };
        }

        [System.Web.Http.HttpPost]
        public object[] Update([FromBody] ShipsGoCustomerData updateData)
        {
            bool _result = false;
            CShipsGoCustomers objCShipsGoCustomersCreationInformation = new CShipsGoCustomers();

            Exception ex = objCShipsGoCustomersCreationInformation.GetItem(updateData.ID);
            if (ex != null || objCShipsGoCustomersCreationInformation.lstCVarShipsGoCustomers.Count != 1)
            {
                return new object[] { _result, ex.Message };
            }

            CShipsGoCustomers objCShipsGoCustomers = new CShipsGoCustomers();
            CVarShipsGoCustomers objCVarShipsGoCustomers = new CVarShipsGoCustomers();
            objCVarShipsGoCustomers.ID = updateData.ID;
            objCVarShipsGoCustomers.CustomerID = updateData.CustomerID;
            objCVarShipsGoCustomers.Email = updateData.Email;
            objCVarShipsGoCustomers.Status = updateData.Status;
            objCVarShipsGoCustomers.BLReferenceNo = updateData.BLReferenceNo;
            objCVarShipsGoCustomers.ShippingLine = updateData.ShippingLine;
            objCVarShipsGoCustomers.ContainerNumber = updateData.ContainerNumber;
            objCVarShipsGoCustomers.ContainerTEU = updateData.ContainerTEU;
            objCVarShipsGoCustomers.FromCountry = updateData.FromCountry;
            objCVarShipsGoCustomers.Pol = updateData.Pol;
            objCVarShipsGoCustomers.LoadingDate = updateData.LoadingDate;
            objCVarShipsGoCustomers.DepartureDate = updateData.DepartureDate;
            objCVarShipsGoCustomers.TSPorts = updateData.TSPorts;
            objCVarShipsGoCustomers.ToCountry = updateData.ToCountry;
            objCVarShipsGoCustomers.Pod = updateData.Pod;
            objCVarShipsGoCustomers.ArrivalDate = updateData.ArrivalDate;
            objCVarShipsGoCustomers.DischargeDate = updateData.DischargeDate;
            objCVarShipsGoCustomers.Vessel = updateData.Vessel;
            objCVarShipsGoCustomers.VesselIMO = updateData.VesselIMO;
            objCVarShipsGoCustomers.GateOutDate = updateData.GateOutDate;
            objCVarShipsGoCustomers.EmptyReturnDate = updateData.EmptyReturnDate;
            objCVarShipsGoCustomers.FormatedTransitTime = updateData.FormatedTransitTime;
            objCVarShipsGoCustomers.ETA = updateData.ETA;
            objCVarShipsGoCustomers.FirstETA = updateData.FirstETA;
            objCVarShipsGoCustomers.BLContainerCount = updateData.BLContainerCount;
            objCVarShipsGoCustomers.BLContainers = updateData.BLContainers;
            objCVarShipsGoCustomers.CreatorUserID = objCShipsGoCustomersCreationInformation.lstCVarShipsGoCustomers[0].CreatorUserID;
            objCVarShipsGoCustomers.CreationDate = objCShipsGoCustomersCreationInformation.lstCVarShipsGoCustomers[0].CreationDate;
            objCVarShipsGoCustomers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarShipsGoCustomers.ModificationDate = DateTime.Now;
            objCVarShipsGoCustomers.FromDate = updateData.FromDate;
            objCVarShipsGoCustomers.ToDate = updateData.ToDate;
            objCVarShipsGoCustomers.IsImport = updateData.IsImport;
            objCVarShipsGoCustomers.IsExport = updateData.IsExport;
            objCVarShipsGoCustomers.IsHaveCC = updateData.IsHaveCC;

            objCShipsGoCustomers.lstCVarShipsGoCustomers.Add(objCVarShipsGoCustomers);
            Exception checkException = objCShipsGoCustomers.SaveMethod(objCShipsGoCustomers.lstCVarShipsGoCustomers);

            string _message = "";
            if (checkException == null)
            {
                _result = true;
            }
            else
            {
                _message = checkException.Message;
            }

            return new object[] { _result, _message };
        }

        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public bool Delete(string pIDs)
        {
            bool _result = false;

            CShipsGoCustomers objCShipsGoCustomers = new CShipsGoCustomers();
            foreach (var currentID in pIDs.Split(','))
            {
                objCShipsGoCustomers.lstDeletedCPKShipsGoCustomers.Add(new CPKShipsGoCustomers() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCShipsGoCustomers.DeleteItem(objCShipsGoCustomers.lstDeletedCPKShipsGoCustomers);
            if (checkException != null)
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else
                _result = true;


            return _result;
        }

        private void WriteToLog(string message)
        {
            try
            {
                string directoryPath = HostingEnvironment.MapPath("~/api/Defaults/ShipsGo");
                bool exists = Directory.Exists(directoryPath);
                if (!exists)
                    Directory.CreateDirectory(directoryPath);


                string pathStringForLog = Path.Combine(directoryPath, "ShipsGo_" + DateTime.Now.ToString("dd_MM_yyyy") + ".txt");
                using (StreamWriter writer = new StreamWriter(pathStringForLog, true))
                {
                    writer.WriteLine($"[Date: {DateTime.Now.ToString("dd_MM_yyyy___hh_mm_ss")}] => {message} \n");
                }
            }
            catch (Exception ex)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.ExecuteQuery($"INSERT INTO TransactionsLog (Code,Log) Values ('FileLogError - {ex.Message.Substring(0,4000).Replace('\'', '"')}','{message.Replace('\'', '"')}')");
            }
        }

        public Exception InsertShipsGoBL(Container trackedMBL, long pOperationID, string pAction,int pCustomerID, int pID)
        {
            CShipsGoBLs objCShipsGoBLs = new CShipsGoBLs();
            CVarShipsGoBLs objCVarShipsGoBLs = new CVarShipsGoBLs();
            CShipsGoBLs objCShipsGoBLs2 = new CShipsGoBLs();

            if(pAction == "U")
            {
                objCVarShipsGoBLs.ID = pID;

                objCShipsGoBLs2.GetItem(pID);
                if(objCShipsGoBLs2.lstCVarShipsGoBLs.Count != 1)
                {
                    return new Exception("Error !!!");
                }

                objCVarShipsGoBLs.CustomerID = objCShipsGoBLs2.lstCVarShipsGoBLs[0].CustomerID;

            } else
            {
                objCVarShipsGoBLs.ID = 0;
                objCVarShipsGoBLs.CustomerID = pCustomerID;
            }
            objCVarShipsGoBLs.Status = trackedMBL.Status;
            objCVarShipsGoBLs.ReferenceNo = trackedMBL.ReferenceNo == null ? "" : trackedMBL.ReferenceNo;
            objCVarShipsGoBLs.BLReferenceNo = trackedMBL.BLReferenceNo;
            objCVarShipsGoBLs.ShippingLine = trackedMBL.ShippingLine;
            objCVarShipsGoBLs.ContainerNumber = trackedMBL.ContainerNumber;
            objCVarShipsGoBLs.ContainerTEU = trackedMBL.ContainerTEU == null ? "" : trackedMBL.ContainerTEU;
            objCVarShipsGoBLs.ContainerType = trackedMBL.ContainerType == null ? "" : trackedMBL.ContainerType;
            objCVarShipsGoBLs.FromCountry = trackedMBL.FromCountry;
            objCVarShipsGoBLs.Pol = trackedMBL.Pol;
            objCVarShipsGoBLs.LoadingDate = JsonConvert.SerializeObject(trackedMBL.LoadingDate);
            objCVarShipsGoBLs.DepartureDate = JsonConvert.SerializeObject(trackedMBL.DepartureDate);
            objCVarShipsGoBLs.TSPorts = JsonConvert.SerializeObject(trackedMBL.TSPorts);
            objCVarShipsGoBLs.ToCountry = trackedMBL.ToCountry;
            objCVarShipsGoBLs.Pod = trackedMBL.Pod;
            objCVarShipsGoBLs.ArrivalDate = JsonConvert.SerializeObject(trackedMBL.ArrivalDate);
            objCVarShipsGoBLs.DischargeDate = JsonConvert.SerializeObject(trackedMBL.DischargeDate);
            objCVarShipsGoBLs.Vessel = trackedMBL.Vessel == null ? "" : trackedMBL.Vessel;
            objCVarShipsGoBLs.VesselIMO = trackedMBL.VesselIMO == null ? "" : trackedMBL.VesselIMO;
            objCVarShipsGoBLs.VesselLatitude = trackedMBL.VesselLatitude == null ? "" : trackedMBL.VesselLatitude;
            objCVarShipsGoBLs.VesselLongitude = trackedMBL.VesselLongitude == null ? "" : trackedMBL.VesselLongitude;
            objCVarShipsGoBLs.VesselVoyage = trackedMBL.VesselVoyage == null ? "" : trackedMBL.VesselVoyage;
            objCVarShipsGoBLs.EmptyToShipperDate = trackedMBL.EmptyToShipperDate == null ? "" : trackedMBL.EmptyToShipperDate;
            objCVarShipsGoBLs.GateInDate = trackedMBL.GateInDate == null ? "" : trackedMBL.GateInDate;
            objCVarShipsGoBLs.GateOutDate = trackedMBL.GateOutDate == null ? "" : trackedMBL.GateOutDate;
            objCVarShipsGoBLs.EmptyReturnDate = trackedMBL.EmptyReturnDate == null ? "" : trackedMBL.EmptyReturnDate;
            objCVarShipsGoBLs.FormatedTransitTime = trackedMBL.FormatedTransitTime == null ? "" : trackedMBL.FormatedTransitTime;
            objCVarShipsGoBLs.ETA = trackedMBL.ETA == null ? "" : trackedMBL.ETA;
            objCVarShipsGoBLs.FirstETA = trackedMBL.FirstETA == null ? "" : trackedMBL.FirstETA;
            objCVarShipsGoBLs.BLContainerCount = trackedMBL.BLContainerCount;
            objCVarShipsGoBLs.BLContainers = JsonConvert.SerializeObject(trackedMBL.BLContainers);
            objCVarShipsGoBLs.LiveMapUrl = trackedMBL.LiveMapUrl;
            objCVarShipsGoBLs.Tags = JsonConvert.SerializeObject(trackedMBL.Tags);
            objCVarShipsGoBLs.Co2Emission = trackedMBL.Co2Emission == null ? "" : trackedMBL.Co2Emission;
            if (pAction == "U")
            {
                objCVarShipsGoBLs.CreatorUserID = objCShipsGoBLs2.lstCVarShipsGoBLs[0].CreatorUserID;
                objCVarShipsGoBLs.CreationDate = objCShipsGoBLs2.lstCVarShipsGoBLs[0].CreationDate;
            } else
            {
                objCVarShipsGoBLs.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarShipsGoBLs.CreationDate = DateTime.Now;
            }
            objCVarShipsGoBLs.OperationID = pOperationID;
            if(pAction == "I")
            {
                objCVarShipsGoBLs.LastChecked = DateTime.Now.AddHours(-11);
            } else
            {
                objCVarShipsGoBLs.LastChecked = DateTime.Now;
            }
            objCVarShipsGoBLs.Action = pAction;

            objCShipsGoBLs.lstCVarShipsGoBLs.Add(objCVarShipsGoBLs);
            Exception ex = objCShipsGoBLs.SaveMethod(objCShipsGoBLs.lstCVarShipsGoBLs);

            return ex;
        }

        [System.Web.Http.HttpGet]
        public Object[] LoadTrackedShipments(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _rowCount = 0;
            Exception checkException = null;
            string _messageReturned = "";


            CvwShipsGoBLs objCvwShipsGoBLs = new CvwShipsGoBLs();
            checkException = objCvwShipsGoBLs.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _rowCount);


            if (checkException != null)
            {
                _messageReturned = checkException.Message;
            }

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string current = objCCustomizedDBCall.CallStringFunction("select CurrentCount from ShipsGoSettings");
            string max = objCCustomizedDBCall.CallStringFunction("select MaximumCount from ShipsGoSettings");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[]
            {
                serializer.Serialize(objCvwShipsGoBLs.lstCVarvwShipsGoBLs), // 0
                _rowCount, // 1
                _messageReturned  //2
                ,current
                ,max
            };

        }
    }
    public class ShipsGoController : BaseController
    {
        [System.Web.Mvc.HttpGet]
        public PartialViewResult ShipsGo(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_shipsGo");
        }
    }

    public class ShipsGoCustomerData
    {
        public int ID { get; set; }
        public int CustomerID { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public bool BLReferenceNo { get; set; }
        public bool ShippingLine { get; set; }
        public bool ContainerNumber { get; set; }
        public bool ContainerTEU { get; set; }
        public bool FromCountry { get; set; }
        public bool Pol { get; set; }
        public bool LoadingDate { get; set; }
        public bool DepartureDate { get; set; }
        public bool TSPorts { get; set; }
        public bool ToCountry { get; set; }
        public bool Pod { get; set; }
        public bool ArrivalDate { get; set; }
        public bool DischargeDate { get; set; }
        public bool Vessel { get; set; }
        public bool VesselIMO { get; set; }
        public bool GateOutDate { get; set; }
        public bool EmptyReturnDate { get; set; }
        public bool FormatedTransitTime { get; set; }
        public bool ETA { get; set; }
        public bool FirstETA { get; set; }
        public bool BLContainerCount { get; set; }
        public bool BLContainers { get; set; }
        public DateTime FromDate { get; set; } = DateTime.Parse("01/01/1900");
        public DateTime ToDate { get; set; } = DateTime.Parse("01/01/1900");
        public bool IsImport { get; set; } = false;
        public bool IsExport { get; set; } = false;
        public bool IsHaveCC { get; set; } = false;
    }

    public class DateInfo
    {
        public string Date { get; set; }
        public bool IsActual { get; set; }
    }

    public class TransitPort
    {
        public string Port { get; set; }
        public DateInfo ArrivalDate { get; set; }
        public DateInfo DepartureDate { get; set; }
        public string Vessel { get; set; }
        public string VesselIMO { get; set; }
        public string VesselLatitude { get; set; }
        public string VesselLongitude { get; set; }
    }

    public class Container
    {
        public string Message { get; set; }
        public string Status { get; set; }
        public int StatusId { get; set; }
        public string ReferenceNo { get; set; }
        public string BLReferenceNo { get; set; }
        public string ShippingLine { get; set; }
        public string ContainerNumber { get; set; }
        public string ContainerTEU { get; set; }
        public string ContainerType { get; set; }
        public string FromCountry { get; set; }
        public string Pol { get; set; }
        public DateInfo LoadingDate { get; set; }
        public DateInfo DepartureDate { get; set; }
        public List<TransitPort> TSPorts { get; set; }
        public string ToCountry { get; set; }
        public string Pod { get; set; }
        public DateInfo ArrivalDate { get; set; }
        public DateInfo DischargeDate { get; set; }
        public string Vessel { get; set; }
        public string VesselIMO { get; set; }
        public string VesselLatitude { get; set; }
        public string VesselLongitude { get; set; }
        public string VesselVoyage { get; set; }
        public string EmptyToShipperDate { get; set; }
        public string GateInDate { get; set; }
        public string GateOutDate { get; set; }
        public string EmptyReturnDate { get; set; }
        public string FormatedTransitTime { get; set; }
        public string ETA { get; set; }
        public string FirstETA { get; set; }
        public int BLContainerCount { get; set; }
        public List<object> BLContainers { get; set; }
        public string LiveMapUrl { get; set; }
        public List<object> Tags { get; set; }
        public string Co2Emission { get; set; }
    }
}