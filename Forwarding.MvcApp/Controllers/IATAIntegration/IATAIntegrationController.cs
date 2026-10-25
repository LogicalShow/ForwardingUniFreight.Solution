using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Net;
using System.Web.Http;
using Forwarding.MvcApp.Models.IATAIntegration;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using System.Text;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace Forwarding.MvcApp.Controllers.IATAIntegration
{
   
    public class IATAIntegrationController : ApiController
    {
        //private static string username = "omar@istegy.com";
        private static string username = "awbeditor_edi_prod@istegy.com";
        //private static string password = "itsEdi597";
        private static string password = "rKa54QPdfj4";
        private static string baseURL = "https://ws.awbeditor.com";

        #region FWB
        [HttpGet]
        public object[] SendFWBMessage(int pOperationID)
        {
            string ReturnedMessage = "";
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var client = new RestClient(baseURL);
            var request = new RestRequest($"/api/edi/send/fwb", Method.POST);
            request.AddHeader("Content-Type", "application/json");
            var body = GetFWBMessageBodyFromOperation(pOperationID);
            ReturnedMessage = CheckValidationFWB.Validate(body);
            if (body == null || ReturnedMessage != "")
            {
                return new object[]
                {
                    ReturnedMessage
                };
            }

            string jsonBody = JsonConvert.SerializeObject(body);
            request.AddParameter("application/json", jsonBody, ParameterType.RequestBody);
            string credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
            request.AddHeader("Authorization", $"Basic {credentials}");

            //Execute the request
            try
            {
                // Execute the request
                IRestResponse response = client.Execute(request);

                // Handle the response
                if (response.StatusCode == HttpStatusCode.OK && response.Content.ToLower().Contains("message queued for transmission"))
                {
                    ReturnedMessage = "";
                }
                else
                {
                    ReturnedMessage += $"Request failed with status code: {response.StatusCode}";
                    ReturnedMessage += response.Content;
                }
            }
            catch (Exception ex)
            {
                ReturnedMessage += "An error occurred:";
                ReturnedMessage += ex.Message;
            }

            return new object[]{
                ReturnedMessage
            };
        }
        private AirWayBillMessage GetFWBMessageBodyFromOperation(int pOperationID)
        {
            CvwIATAIntegrationFWB objCvwIATAIntegrationFWB = new CvwIATAIntegrationFWB();
            objCvwIATAIntegrationFWB.GetList("WHERE ID = " + pOperationID);
            var FWBData = objCvwIATAIntegrationFWB.lstCVarvwIATAIntegrationFWB.Count > 0 ? objCvwIATAIntegrationFWB.lstCVarvwIATAIntegrationFWB[0] : null;
            if(FWBData != null){
                return new AirWayBillMessage
                {
                    messageHeader = new MessageHeader
                    {
                        addressing = new Addressing
                        {
                            senderAddresses = new List<ParticipantAddress>
                        {
                            new ParticipantAddress
                            {
                                type = ParticipantAddressType.EMAIL.ToString(),
                                address = "mostafa.mahmoud@istegy.net"
                            }
                        },
                            finalRecipientAddresses = new List<ParticipantAddress>
                        {
                            new ParticipantAddress
                            {
                                type = ParticipantAddressType.EMAIL.ToString(),
                                address = "mostafa.mahmoud@istegy.net"
                            }
                        }

                        },
                        creationDate = FWBData.OperationCreationDate
                    },
                    airWaybillNumber = FWBData.AirWayBillNumber,
                    origin = FWBData.Origin,
                    destination = FWBData.Destination,
                    totalConsignmentNumberOfPieces = FWBData.TotalConsignmentNumberOfPieces,
                    weight = new Weight
                    {
                        amount = FWBData.Weight,
                        unit = WeightUnit.KILOGRAM.ToString()
                    },
                    volume = new Volume
                    {
                        amount = FWBData.Volume,
                        unit = VolumeUnit.CUBIC_CENTIMETRE.ToString()
                    },
                    route = new List<Routing>
                    {
                        new Routing
                        {
                            carrierCode = FWBData.CarrierCode,
                            destination = FWBData.Destination
                        }
                    },
                    shipper = new AccountContact
                    {
                        address = new Address
                        {
                            name1 = FWBData.ShipperName,
                            streetAddress1 = FWBData.ShipperStreetLine1,
                            streetAddress2 = FWBData.ShipperStreetLine2,
                            place = $"{FWBData.ShipperCityName} {FWBData.ShipperCountryCode}",
                            country = FWBData.ShipperCountryCode,
                            postCode = FWBData.ShipperPostalCode
                        }
                    },
                    consignee = new AccountContact
                    {
                        address = new Address
                        {
                            name1 = FWBData.ConsigneeName,
                            streetAddress1 = FWBData.ConsigneeStreetLine1,
                            streetAddress2 = FWBData.ConsigneeStreetLine2,
                            place = $"{FWBData.ConsigneeCityName} {FWBData.ConsigneeCountryCode}",
                            country = FWBData.ConsigneeCountryCode,
                            postCode = FWBData.ConsigneePostalCode
                        }
                    },
                    carriersExecution = new CarriersExecution
                    {
                        date = FWBData.CarrierExecutionDate,
                        placeOrAirportCityCode = FWBData.CarrierExecutionPlaceOrAirportCityCode
                    },
                    senderReference = new ReferenceInfo
                    {
                        fileReference = FWBData.FileReference
                    },
                    chargeDeclarations = new ChargeDeclarations
                    {
                        isoCurrencyCode = "USD",
                        chargeCode = ChargeCodeType.ALL_CHARGES_PREPAID_CASH.ToString()
                    },
                    chargeItems = new List<ChargeItem>
                    {
                        new ChargeItem
                        {
                            numberOfPieces = FWBData.TotalConsignmentNumberOfPieces

                        }
                    }
                };
            }
            else
            {
                return null;
            }
        }
        #endregion
        #region FHL
        [HttpGet]
        public object[] SendFHLMessage(int pOperationID)
        {
            string ReturnedMessage = "";
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var client = new RestClient(baseURL);
            var request = new RestRequest($"/api/edi/send/fhl", Method.POST);
            request.AddHeader("Content-Type", "application/json");
            var body = GetFHLMessageBodyFromOperation(pOperationID);
            ReturnedMessage = CheckValidationFHL.Validate(body);
            if (body == null || ReturnedMessage != "")
            {
                return new object[]
                {
                    ReturnedMessage
                };
            }

            string jsonBody = JsonConvert.SerializeObject(body);
            request.AddParameter("application/json", jsonBody, ParameterType.RequestBody);
            string credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
            request.AddHeader("Authorization", $"Basic {credentials}");

            //Execute the request
            try
            {
                // Execute the request
                IRestResponse response = client.Execute(request);

                // Handle the response
                if (response.StatusCode == HttpStatusCode.OK && response.Content.ToLower().Contains("message queued for transmission"))
                {
                    ReturnedMessage = "";
                }
                else
                {
                    ReturnedMessage += $"Request failed with status code: {response.StatusCode}";
                    ReturnedMessage += response.Content;
                }
            }
            catch (Exception ex)
            {
                ReturnedMessage += "An error occurred:";
                ReturnedMessage += ex.Message;
            }

            return new object[]{
                ReturnedMessage
            };
        }
        private ConsolidationListMessage GetFHLMessageBodyFromOperation(int pOperationID)
        {
            CvwIATAIntegrationFHL objCvwIATAIntegrationFHL = new CvwIATAIntegrationFHL();
            objCvwIATAIntegrationFHL.GetList("WHERE MasterOperationID = " + pOperationID);
            var MasterOperationData = objCvwIATAIntegrationFHL.lstCVarvwIATAIntegrationFHL.Count > 0 ? objCvwIATAIntegrationFHL.lstCVarvwIATAIntegrationFHL[0] : null;
            var HousesData = objCvwIATAIntegrationFHL.lstCVarvwIATAIntegrationFHL.Count > 0 ? objCvwIATAIntegrationFHL.lstCVarvwIATAIntegrationFHL : null;
            if (MasterOperationData != null && HousesData != null)
            {
                var ConsolidationListMessage =  new ConsolidationListMessage
                {
                    messageHeader = new MessageHeader
                    {
                        addressing = new Addressing
                        {
                            senderAddresses = new List<ParticipantAddress>
                            {
                                new ParticipantAddress
                                {
                                    type = ParticipantAddressType.EMAIL.ToString(),
                                    address = "mostafa.mahmoud@istegy.net"
                                }
                            },
                            finalRecipientAddresses = new List<ParticipantAddress>
                            {
                                new ParticipantAddress
                                {
                                    type = ParticipantAddressType.EMAIL.ToString(),
                                    address = "mostafa.mahmoud@istegy.net"
                                }
                            }

                        },
                        creationDate = MasterOperationData.OperationCreationDate
                    },
                    airWaybillNumber = MasterOperationData.AirWayBillNumber,
                    originAndDestination = new OriginAndDestination
                    {
                        origin = MasterOperationData.Origin,
                        destination = MasterOperationData.Destination
                    },
                    quantity = new Quantity
                    {
                        ShipmentDescriptionCode = ShipmentDescriptionCode.MULTI_SHIPMENTS.ToString(),
                        numberOfPieces = MasterOperationData.NumberOfPieces,
                        weight = new Weight
                        {
                            amount = MasterOperationData.Weight,
                            unit = WeightUnit.KILOGRAM.ToString()
                        }

                    },
                    houseWaybillSummaries = new List<HouseWaybillSummary>
                    {

                    },
                    shipper = new AccountContact
                    {
                        address = new Address
                        {
                            name1 = MasterOperationData.ShipperName,
                            streetAddress1 = MasterOperationData.ShipperStreetLine1,
                            streetAddress2 = MasterOperationData.ShipperStreetLine2,
                            place = $"{MasterOperationData.ShipperCityName} {MasterOperationData.ShipperCountryCode}",
                            country = MasterOperationData.ShipperCountryCode,
                            postCode = MasterOperationData.ShipperPostalCode
                        }
                    },
                    consignee = new AccountContact
                    {
                        address = new Address
                        {
                            name1 = MasterOperationData.ConsigneeName,
                            streetAddress1 = MasterOperationData.ConsigneeStreetLine1,
                            streetAddress2 = MasterOperationData.ConsigneeStreetLine2,
                            place = $"{MasterOperationData.ConsigneeCityName} {MasterOperationData.ConsigneeCountryCode}",
                            country = MasterOperationData.ConsigneeCountryCode,
                            postCode = MasterOperationData.ConsigneePostalCode
                        }
                    }
                };
                HousesData.ForEach(house => ConsolidationListMessage.houseWaybillSummaries.Add(new HouseWaybillSummary
                {
                    serialNumber = house.HouseSerialNumber,
                    origin = house.HouseOrigin,
                    destination = house.HouseDestination,
                    numberOfPieces = house.NumberOfPieces,
                    weight = new Weight
                    {
                        amount = house.HouseGrossWeight,
                        unit = WeightUnit.KILOGRAM.ToString()
                    },
                    natureOfGoods = house.HouseDescription,
                    freeTextDescriptionOfGoods = house.HouseDescription
                }));
                return ConsolidationListMessage;
            }
            else
            {
                return null;
            }
        }
        #endregion
    }

    

}