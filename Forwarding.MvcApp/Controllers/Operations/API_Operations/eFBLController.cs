using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebMatrix.WebData;
using Forwarding.MvcApp.Entities.Operations;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class eFBLController : ApiController
    {
        [HttpGet, HttpPost]
        public async Task<object[]> eFBL_Generate(Int64 pID_eFBL)
        {

            #region Getting Data And Validating
            string pReturnedMessage = "";
            string json = "";
            int _RowCount = 0;
            string pFileName = "";
            byte[] pdfInBytes = null;

            int constCustomerPartnerTypeID = 1;
            int constAgentPartnerTypeID = 2;
            //int constShippingAgentPartnerTypeID = 3;
            //int constCustomsClearanceAgentPartnerTypeID = 4;
            int constShippingLinePartnerTypeID = 5;
            //int constAirlinePartnerTypeID = 6;
            //int constTruckerPartnerTypeID = 7;
            //int constSupplierPartnerTypeID = 8;
            //int constCustodyPartnerTypeID = 20;
            Exception checkException = null;

            #region Get MapPath

            //I put MapPath at the top because after await it becomes null
            bool exists = Directory.Exists(HttpContext.Current.Server.MapPath(pID_eFBL.ToString()));
            if (!exists)
                Directory.CreateDirectory(HttpContext.Current.Server.MapPath(pID_eFBL.ToString()));
            string mapPath = HttpContext.Current.Server.MapPath(pID_eFBL.ToString());
            #endregion Get MapPath
            CvwOperations objCvwOperations = new CvwOperations();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();

            CContacts objCShipperContacts = new CContacts();
            CvwAddresses objCShipperAddresses = new CvwAddresses();

            CContacts objCConsigneeContacts = new CContacts();
            CvwAddresses objCConsigneeAddresses = new CvwAddresses();

            CContacts objCAgentContacts = new CContacts();
            CvwAddresses objCAgentAddresses = new CvwAddresses();

            CContacts objCShippingLineContacts = new CContacts();
            CvwAddresses objCShippingLineAddresses = new CvwAddresses();

            #region Get Data
            checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + pID_eFBL, "ID", out _RowCount);
            checkException = objCvwOperationContainersAndPackages.GetListPaging(999, 1, "WHERE OperationID=" + pID_eFBL, "ID", out _RowCount);

            checkException = objCShipperAddresses.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ShipperID + " AND PartnerTypeID=" + constCustomerPartnerTypeID);
            checkException = objCShipperContacts.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ShipperID + " AND PartnerTypeID=" + constCustomerPartnerTypeID);

            checkException = objCConsigneeAddresses.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ConsigneeID + " AND PartnerTypeID=" + constCustomerPartnerTypeID);
            checkException = objCConsigneeContacts.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ConsigneeID + " AND PartnerTypeID=" + constCustomerPartnerTypeID);

            checkException = objCAgentAddresses.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].AgentID + " AND PartnerTypeID=" + constAgentPartnerTypeID);
            checkException = objCAgentContacts.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].AgentID + " AND PartnerTypeID=" + constAgentPartnerTypeID);

            checkException = objCShippingLineAddresses.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ShippingLineID + " AND PartnerTypeID=" + constShippingLinePartnerTypeID);
            checkException = objCShippingLineContacts.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ShippingLineID + " AND PartnerTypeID=" + constShippingLinePartnerTypeID);
            #endregion Get Data

            #region Validate
            if (objCShipperContacts.lstCVarContacts.Count == 0 || objCShipperAddresses.lstCVarvwAddresses.Count == 0)
            {
                pReturnedMessage = "Please, check you shipper's address and contact person";
            }
            else if (objCShipperContacts.lstCVarContacts[0].Phone1 == "0")
                pReturnedMessage = "Please, enter shipper contact's phone";
            else if (objCShipperContacts.lstCVarContacts[0].Email == "0")
                pReturnedMessage = "Please, enter shipper contact's email";
            else if (objCShipperAddresses.lstCVarvwAddresses[0].ZipCode == "0")
                pReturnedMessage = "Please, enter shipper post code";
            else if (objCShipperAddresses.lstCVarvwAddresses[0].StreetLine1 == "0")
                pReturnedMessage = "Please, enter shipper street";
            else if (objCShipperAddresses.lstCVarvwAddresses[0].CityID == 0)
                pReturnedMessage = "Please, enter shipper city";
            else if (objCShipperAddresses.lstCVarvwAddresses[0].CountryID == 0)
                pReturnedMessage = "Please, enter shipper country";

            else if (objCConsigneeContacts.lstCVarContacts.Count == 0)
            {
                pReturnedMessage = "Please, check you Consignee's contact person";
            }

            else if (objCShippingLineContacts.lstCVarContacts.Count == 0 || objCShippingLineAddresses.lstCVarvwAddresses.Count == 0)
            {
                pReturnedMessage = "Please, check the carrier's contact person and address";
            }
            #endregion Validate

            if (pReturnedMessage == "") //Mandatory Data is complete
            {
                #region exchanged_document
                json += " { \n";
                json += "   \"exchanged_document\": { \n";
                json += "     \"documentStatus\": { \n";
                json += "       \"value\": \"" + (objCvwOperations.lstCVarvwOperations[0].eFBLID == "0" ? "TBD" : objCvwOperations.lstCVarvwOperations[0].eFBLID) + "\" \n"; //????????????
                json += "     }, \n";

                json += "     \"issueDateTime\": { \n";
                json += "       \"value\": \"" + DateTime.Now.Year + "-" + DateTime.Now.Month.ToString().PadLeft(2, '0') + "-" + DateTime.Now.Day.ToString().PadLeft(2, '0') + "T" + DateTime.Now.Hour.ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0') + ":00.000" + "\", \n"; //2021-03-31T12:34:56.123;
                json += "       \"format\": \"YYYY-MM-DDThh:mm:ss.sss\" \n";
                json += "     }, \n";

                json += "     \"firstSignatoryAuthentication\": { \n";
                json += "       \"actualDateTime\": { \n";
                json += "         \"value\": \"" + DateTime.Now.Year + "-" + DateTime.Now.Month.ToString().PadLeft(2, '0') + "-" + DateTime.Now.Day.ToString().PadLeft(2, '0') + "T" + DateTime.Now.Hour.ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0') + ":00.000" + "\", \n"; //2021-03-31T12:34:56.012
                json += "         \"format\": \"YYYY-MM-DDThh:mm:ss.sss\" \n";
                json += "       }, \n";
                json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].ID + "\", \n"; //????????????
                json += "       \"statement\": { \n"; //????????????
                json += "         \"value\": \"\" \n";
                json += "       } \n";
                json += "     }, \n";
                 
                json += "     \"issueLocation\": { \n";
                json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].POLCode + "\", \n"; //????????????
                json += "       \"countryCode\": \"" + objCvwOperations.lstCVarvwOperations[0].POLCountryCode + "\", \n";  //????????????
                json += "       \"name\": { \n";
                json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].POLName + "\" \n";
                json += "       } \n";
                json += "     }, \n";
                json += "     \"originalIssuedQuantity\": \"" + (objCvwOperations.lstCVarvwOperations[0].NumberOfOriginalBills == 0 ? 1 : objCvwOperations.lstCVarvwOperations[0].NumberOfOriginalBills) + "\" \n";
                json += "   }, \n";
                #endregion exchanged_document

                #region supply_chain_consignment
                json += "   \"supply_chain_consignment\": { \n";
                //json += "     \"cargoInsuranceNotProvidedByCTO\": true, \n"; //CTO:Combined Transport Operator [Carrier/Line]

                #region Consignor
                {
                    json += "     \"consignor\": { \n";
                    json += "       \"name\": { \n";
                    json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].ShipperName + "\" \n";
                    json += "       }, \n";
                    json += "       \"definedContactDetails\": { \n";
                    json += "         \"personName\": { \n";
                    json += "           \"value\": \"" + objCShipperContacts.lstCVarContacts[0].Name + "\" \n";
                    json += "         }, \n";
                    json += "         \"telephone\": { \n";
                    json += "           \"value\": \"" + objCShipperContacts.lstCVarContacts[0].Phone1 + "\" \n";
                    json += "         }, \n";
                    json += "         \"mobileTelephone\":{ \n";
                    json += "           \"value\": \"" + (objCShipperContacts.lstCVarContacts[0].Mobile1 == "0" ? "" : objCShipperContacts.lstCVarContacts[0].Mobile1) + "\" \n";
                    json += "         }, \n";
                    json += "         \"emailAddress\":{ \n";
                    json += "           \"value\": \"" + (objCShipperContacts.lstCVarContacts[0].Email == "0" ? "" : objCShipperContacts.lstCVarContacts[0].Email) + "\" \n";
                    json += "         } \n";
                    json += "       }, \n";
                    json += "       \"postalAddress\": { \n";
                    json += "         \"postcode\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].ZipCode + "\", \n";
                    json += "         \"streetName\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].StreetLine1 + "\", \n";
                    json += "         \"cityName\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].CityName + "\", \n";
                    json += "         \"countryCode\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].CountryCode + "\", \n";
                    json += "         \"countryName\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].CountryName + "\" \n";
                    json += "       } \n";
                    json += "     }, \n";
                }
                #endregion Consignor

                #region Consignee
                {
                    json += "     \"consignee\": { \n";
                    json += "       \"name\": { \n";
                    json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].ConsigneeName + "\" \n";
                    json += "       } \n";

                    json += "       ,\"definedContactDetails\": { \n";
                    json += "         \"personName\": { \n";
                    json += "           \"value\": \"" + objCConsigneeContacts.lstCVarContacts[0].Name + "\" \n";
                    json += "         }, \n";
                    json += "         \"telephone\": { \n";
                    json += "           \"value\": \"" + objCConsigneeContacts.lstCVarContacts[0].Phone1 + "\" \n";
                    json += "         }, \n";
                    json += "         \"mobileTelephone\":{ \n";
                    json += "           \"value\": \"" + (objCConsigneeContacts.lstCVarContacts[0].Mobile1 == "0" ? "" : objCConsigneeContacts.lstCVarContacts[0].Mobile1) + "\" \n";
                    json += "         }, \n";
                    json += "         \"emailAddress\":{ \n";
                    json += "           \"value\": \"" + (objCConsigneeContacts.lstCVarContacts[0].Email == "0" ? "" : objCConsigneeContacts.lstCVarContacts[0].Email) + "\" \n";
                    json += "         } \n";
                    json += "       } \n";
                    if (objCConsigneeAddresses.lstCVarvwAddresses.Count > 0)
                    {
                        json += "       ,\"postalAddress\": { \n";
                        json += "         \"postcode\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].ZipCode + "\", \n";
                        json += "         \"streetName\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].StreetLine1 + "\", \n";
                        json += "         \"cityName\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].CityName + "\", \n";
                        json += "         \"countryCode\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].CountryCode + "\", \n";
                        json += "         \"countryName\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].CountryName + "\" \n";
                        json += "       } \n";
                    }
                    json += "     }, \n";
                }
                #endregion Consignee

                #region ctoAgent
                if (objCvwOperations.lstCVarvwOperations[0].AgentID > 0)
                {
                    json += "     \"ctoAgent\": { \n";
                    json += "       \"name\": { \n";
                    json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].AgentName + "\" \n";
                    json += "       } \n";
                    if (objCAgentContacts.lstCVarContacts.Count > 0)
                    {
                        json += "       ,\"definedContactDetails\": { \n";
                        json += "         \"personName\": { \n";
                        json += "           \"value\": \"" + objCAgentContacts.lstCVarContacts[0].Name + "\" \n";
                        json += "         }, \n";
                        json += "         \"telephone\": { \n";
                        json += "           \"value\": \"" + (objCAgentContacts.lstCVarContacts[0].Phone1 == "0" ? "" : objCAgentContacts.lstCVarContacts[0].Phone1) + "\" \n";
                        json += "         }, \n";
                        json += "         \"mobileTelephone\":{ \n";
                        json += "           \"value\": \"" + (objCAgentContacts.lstCVarContacts[0].Mobile1 == "0" ? "" : objCAgentContacts.lstCVarContacts[0].Mobile1) + "\" \n";
                        json += "         }, \n";
                        json += "         \"emailAddress\":{ \n";
                        json += "           \"value\": \"" + (objCAgentContacts.lstCVarContacts[0].Email == "0" ? "" : objCAgentContacts.lstCVarContacts[0].Email) + "\" \n";
                        json += "         } \n";
                        json += "       } \n";
                    }
                    if (objCAgentAddresses.lstCVarvwAddresses.Count > 0)
                    {
                        json += "       ,\"postalAddress\": { \n";
                        json += "         \"postcode\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].ZipCode + "\", \n";
                        json += "         \"streetName\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].StreetLine1 + "\", \n";
                        json += "         \"cityName\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].CityName + "\", \n";
                        json += "         \"countryCode\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].CountryCode + "\", \n";
                        json += "         \"countryName\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].CountryName + "\" \n";
                        json += "       } \n";
                    }
                    json += "     }, \n";
                }
                #endregion ctoAgent

                #region CTO //CTO:Combined Transport Operator [Carrier/Line]
                if (objCvwOperations.lstCVarvwOperations[0].ShippingLineName != "0")
                {
                    json += "     \"cto\": { \n";
                    json += "       \"id\": [{ \n";
                    json += "         \"value\": \"13a8cc04-8aae-417f-9519-1c79e1fd8dac\", \n";
                    json += "         \"identificationSchemeAgency\": \"FIATA\" \n"; //????????
                    json += "       } \n";
                    json += "       ], \n";
                    json += "       \"name\": { \n";
                    json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].ShippingLineName + "\" \n";
                    json += "       } \n";
                    if (objCShippingLineContacts.lstCVarContacts.Count > 0)
                    {
                        json += "       ,\"definedContactDetails\": { \n";
                        json += "         \"personName\": { \n";
                        json += "           \"value\": \"" + objCShippingLineContacts.lstCVarContacts[0].Name + "\" \n";
                        json += "         }, \n";
                        json += "         \"telephone\": { \n";
                        json += "           \"value\": \"" + (objCShippingLineContacts.lstCVarContacts[0].Phone1 == "0" ? "" : objCShippingLineContacts.lstCVarContacts[0].Phone1) + "\" \n";
                        json += "         }, \n";
                        json += "         \"mobileTelephone\":{ \n";
                        json += "           \"value\": \"" + (objCShippingLineContacts.lstCVarContacts[0].Mobile1 == "0" ? "" : objCShippingLineContacts.lstCVarContacts[0].Mobile1) + "\" \n";
                        json += "         }, \n";
                        json += "         \"emailAddress\":{ \n";
                        json += "           \"value\": \"" + (objCShippingLineContacts.lstCVarContacts[0].Email == "0" ? "" : objCShippingLineContacts.lstCVarContacts[0].Email) + "\" \n";
                        json += "         } \n";
                        json += "       } \n";
                    }
                    if (objCShippingLineAddresses.lstCVarvwAddresses.Count > 0)
                    {
                        json += "       ,\"postalAddress\": { \n";
                        json += "         \"postcode\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].ZipCode + "\", \n";
                        json += "         \"streetName\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].StreetLine1 + "\", \n";
                        json += "         \"cityName\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].CityName + "\", \n";
                        json += "         \"countryCode\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].CountryCode + "\", \n";
                        json += "         \"countryName\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].CountryName + "\" \n";
                        json += "       } \n";
                    }
                    json += "     }, \n";
                }
                #endregion CTO

                #region Notify
                {
                    json += "     \"notifiedParty\": [ \n";
                    json += "       { \n";
                    json += "         \"id\": [{ \n";
                    json += "           \"value\": \"13a8cc04-8aae-417f-9519-1c79e1fd8dac\", \n"; //??????????
                    json += "           \"identificationSchemeAgency\": \"SPEDLOGSWISS\" \n"; //??????????
                    json += "         } \n";
                    json += "         ], \n";
                    json += "         \"name\": { \n";
                    json += "           \"value\": \"" + (objCvwOperations.lstCVarvwOperations[0].Notify1Name == "0" ? "" : objCvwOperations.lstCVarvwOperations[0].Notify1Name) + "\" \n";
                    json += "         }, \n";
                    json += "         \"definedContactDetails\": { \n";
                    json += "           \"personName\": { \n";
                    json += "             \"value\": \"" + "" + "\" \n";
                    json += "           }, \n";
                    json += "           \"telephone\":{\"value\": \"" + "" + "\"}, \n";
                    json += "           \"mobileTelephone\":{\"value\": \"" + "" + "\"}, \n";
                    json += "           \"emailAddress\":{\"value\": \"" + "" + "\"} \n";
                    json += "         } \n";
                    //json += "         ,\"postalAddress\": { \n";
                    //json += "           \"postcode\": \"" + "" + "\", \n";
                    //json += "           \"streetName\": \"" + (objCvwOperations.lstCVarvwOperations[0].Notify1Address == "0" ? "" : objCvwOperations.lstCVarvwOperations[0].Notify1Address) + "\", \n";
                    //json += "           \"cityName\": \"MENINGIE WEST\", \n";
                    //json += "           \"countryCode\": \"AU\", \n";
                    //json += "           \"countryName\": \"Australia\" \n";
                    //json += "         } \n";
                    json += "       } \n";
                    json += "     ], \n";
                }
                #endregion Notify

                #region carrierAcceptanceLocation
                json += "     \"carrierAcceptanceLocation\": { \n";
                json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].PODCountryCode + "\", \n"; //???????????????
                json += "       \"name\": { \n";
                json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].PODName + "\" \n";
                json += "       } \n";
                json += "     }, \n";
                #endregion carrierAcceptanceLocation

                #region consigneeReceiptLocation
                json += "     \"consigneeReceiptLocation\": { \n";
                json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].PODCode + "\", \n"; //???????????????
                json += "       \"name\": { \n";
                json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].PODName + "\" \n";
                json += "       } \n";
                json += "     }, \n";
                #endregion consigneeReceiptLocation

                
                json += "     \"numberOfPackages\": " + objCvwOperations.lstCVarvwOperations[0].NumberOfPackages + " \n";

                #region add this in loop for Marks and numbers line by line 
                if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count > 0)
                {
                    json += "     ,\"includedConsignmentItem\": [";
                    for (int i = 0; i < objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count; i++)
                    {
                        json += (i == 0 ? "" : ",");
                        json += "               { \n";
                        json += "                   \"goodsTypeCode\": { \n";
                        json += "                     \"value\": \"" + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].DescriptionOfGoods.Replace("\n", ", ") + "\" \n";
                        json += "                   }, \n";
                        json += "                   \"grossWeight\": { \n";
                        json += "                     \"value\": " + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].GrossWeight + ", \n";
                        json += "                     \"unit\": \"kg\" \n";
                        json += "                   }, \n";
                        json += "                   \"grossVolume\": { \n";
                        json += "                     \"value\": " + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].Volume + ", \n";
                        json += "                     \"unit\": \"cbm\" \n";
                        json += "                   } \n";
                        json += "                   ,\"cargoNatureIdentification\": { \n";
                        json += "                     \"identificationText\": [ \n";
                        json += "                       { \n";
                        json += "                         \"value\": \"" + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].PackageTypeNameOnContainer + "\" \n";
                        json += "                       } \n";
                        json += "                     ] \n";
                        json += "                   }, \n";
                        json += "                   \"transportPackage\": [{ \n";
                        json += "                     \"itemQuantity\": " + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].NumberOfPackagesOnContainer + ", \n";
                        json += "                     \"shippingMarks\": [\"" + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].MarksAndNumbers.Replace("\n", "\",\"") + "\"], \n";
                        json += "                     \"typeText\": \"" + "" + "\" \n";
                        json += "                   } \n";
                        json += "                 ] \n";
                        json += "               }";
                    }
                    json += "    ] \n";
                }                
                #endregion add this in loop for Marks and numbers line by line









                //json += "     ,\"applicableServiceCharge\": [{ \n";
                //json += "       \"paymentArrangementCode\": { \n";
                //json += "         \"value\": \"A\", \n";
                //json += "         \"agency\": \"UN/EDIFACT\" \n";
                //json += "       }, \n";
                //json += "       \"paymentPlace\": { \n";
                //json += "         \"name\": { \n";
                //json += "           \"value\": \"Kastanienallee 12, 26579 Hinte, Niedersachsen, Germany\" \n";
                //json += "         }, \n";
                //json += "         \"id\": \"9501101020023\" \n";
                //json += "       } \n";
                //json += "     }] \n";
                json += "     ,\"loadingBaseportLocation\": { \n";
                json += "       \"countryCode\":\"" + objCvwOperations.lstCVarvwOperations[0].POLCountryCode + "\", \n";
                json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].POLCode + "\", \n"; //??????????????
                json += "       \"name\": { \n";
                json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].POLName + "\" \n";
                json += "       } \n";
                json += "     } \n";
                json += "     ,\"unloadingBaseportLocation\": { \n";
                json += "       \"countryCode\": \"" + objCvwOperations.lstCVarvwOperations[0].PODCountryCode + "\", \n";
                json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].PODCode + "\", \n"; //??????????????
                json += "       \"name\": { \n";
                json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].PODName + "\" \n";
                json += "       } \n";
                json += "     } \n";
                //json += "     ,\"mainCarriageTransportMovement\": [{ \n";
                //json += "       \"typeCode\": { \n";
                //json += "         \"value\": \"503\" \n";
                //json += "       } \n";
                //json += "       ,\"typeText\": { \n";
                //json += "         \"value\": \"Wood chips vessel\" \n";
                //json += "       } \n";
                //json += "     }] \n";
                //json += "     ,\"declaredValueForCarriageAmount\": { \n";
                //json += "       \"value\": 10000000, \n";
                //json += "       \"currency\": \"EUR\" \n";
                //json += "     } \n";
                //json += "     ,\"totalChargeAmount\": { \n";
                //json += "       \"value\": 15000000, \n";
                //json += "       \"currency\": \"EUR\" \n";
                //json += "     } \n";
                json += "   } \n";
                json += " } \n";
                #endregion supply_chain_consignment

                //File.WriteAllText(@"D:\eFBL.json", json);
                File.WriteAllText(mapPath + @"\eFBL.json", json);
            }

            #endregion Getting Data And Validting
            
            #region Call WebAPI
            if (pReturnedMessage == "") //Mandatory Data is complete
            {
                var Global_access_token = "";
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

                string tokenUrl = $"https://keycloak.kapsule-eu-uat.komgo.io/auth/realms/fiata/protocol/openid-connect/token";
                var req = new HttpRequestMessage(HttpMethod.Post, tokenUrl);

                req.Content = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    ["username"] = "istnetworks-staging@efbl.fiata.org",
                    ["password"] = "Luminance-Playgroup-Donor8-Flagman-Exchange",
                    ["client_id"] = "fiata",
                    ["grant_type"] = "password"
                });

                using (var client = new HttpClient())
                {
                    var res = await client.SendAsync(req);

                    string returnedJSON = await res.Content.ReadAsStringAsync();
                    var jsonAccess = JsonConvert.DeserializeObject<MyDetail>(returnedJSON);

                    var access_token = jsonAccess.access_token;
                    var expires_in = jsonAccess.expires_in;
                    var scope = jsonAccess.scope;
                    var token_type = jsonAccess.token_type;

                    Global_access_token = access_token;
                }
                ////////////////Send details////////////////////
                string integrationsFiataUrl = $"https://api.kapsule-eu-uat.komgo.io/api/trakk/v0/integrations/fiata/fbl-json?softwareProviderId=e651b830-a153-4bb4-ac13-2583720bff32";

                string jsonData = json;  //" { \r\n   \"exchanged_document\": { \r\n     \"documentStatus\": { \r\n       \"value\": \"TBD\" \r\n     }, \r\n     \"issueDateTime\": { \r\n       \"value\": \"2022-04-27T05:50:00.000\", \r\n       \"format\": \"YYYY-MM-DDThh:mm:ss.sss\" \r\n     }, \r\n     \"firstSignatoryAuthentication\": { \r\n       \"actualDateTime\": { \r\n         \"value\": \"2022-04-27T05:50:00.000\", \r\n         \"format\": \"YYYY-MM-DDThh:mm:ss.sss\" \r\n       }, \r\n       \"id\": \"12345\", \r\n       \"statement\": { \r\n         \"value\": \"\" \r\n       } \r\n     }, \r\n     \"issueLocation\": { \r\n       \"id\": \"AFQLT\", \r\n       \"countryCode\": \"AF\", \r\n       \"name\": { \r\n         \"value\": \"QALAT\" \r\n       } \r\n     }, \r\n     \"originalIssuedQuantity\": \"1\" \r\n   }, \r\n   \"supply_chain_consignment\": { \r\n     \"cargoInsuranceNotProvidedByCTO\": true, \r\n     \"consignor\": { \r\n       \"name\": { \r\n         \"value\": \"AVL GROUP\" \r\n       }, \r\n       \"definedContactDetails\": { \r\n         \"personName\": { \r\n           \"value\": \"M. ABDELAZIZ\" \r\n         }, \r\n         \"telephone\": { \r\n           \"value\": \"038372727\" \r\n         }, \r\n         \"mobileTelephone\":{ \r\n           \"value\": \"03767373\" \r\n         }, \r\n         \"emailAddress\":{ \r\n           \"value\": \"AVL@AVLGROUP.COM\" \r\n         } \r\n       }, \r\n       \"postalAddress\": { \r\n         \"postcode\": \"21321\", \r\n         \"streetName\": \"STREET 1\", \r\n         \"cityName\": \"BARBUDA\", \r\n         \"countryCode\": \"AG\", \r\n         \"countryName\": \"ANTIGUA AND BARBUDA\" \r\n       } \r\n     }, \r\n     \"consignee\": { \r\n       \"name\": { \r\n         \"value\": \"ALFA M.GSS\" \r\n       } \r\n       ,\"definedContactDetails\": { \r\n         \"personName\": { \r\n           \"value\": \"CONTACT NAME\" \r\n         }, \r\n         \"telephone\": { \r\n           \"value\": \"\" \r\n         }, \r\n         \"mobileTelephone\":{ \r\n           \"value\": \"\" \r\n         }, \r\n         \"emailAddress\":{ \r\n           \"value\": \"\" \r\n         } \r\n       } \r\n     }, \r\n     \"ctoAgent\": { \r\n       \"name\": { \r\n         \"value\": \"ABC AGENCY\" \r\n       } \r\n       ,\"definedContactDetails\": { \r\n         \"personName\": { \r\n           \"value\": \"ABC\" \r\n         }, \r\n         \"telephone\": { \r\n           \"value\": \"89867787\" \r\n         }, \r\n         \"mobileTelephone\":{ \r\n           \"value\": \"86765757\" \r\n         }, \r\n         \"emailAddress\":{ \r\n           \"value\": \"ABC@AGENCY.COM\" \r\n         } \r\n       } \r\n       ,\"postalAddress\": { \r\n         \"postcode\": \"\", \r\n         \"streetName\": \"232 DFDFDF\", \r\n         \"cityName\": \"BENISAF\", \r\n         \"countryCode\": \"DZ\", \r\n         \"countryName\": \"ALGERIA\" \r\n       } \r\n     }, \r\n     \"cto\": { \r\n       \"id\": [{ \r\n         \"value\": \"13a8cc04-8aae-417f-9519-1c79e1fd8dac\", \r\n         \"identificationSchemeAgency\": \"FIATA\" \r\n       } \r\n       ], \r\n       \"name\": { \r\n         \"value\": \"ABC CONTAINERLINE N.V.\" \r\n       } \r\n       ,\"definedContactDetails\": { \r\n         \"personName\": { \r\n           \"value\": \"ABC SHIPPING LNE CONTACT\" \r\n         }, \r\n         \"telephone\": { \r\n           \"value\": \"\" \r\n         }, \r\n         \"mobileTelephone\":{ \r\n           \"value\": \"\" \r\n         }, \r\n         \"emailAddress\":{ \r\n           \"value\": \"\" \r\n         } \r\n       } \r\n       ,\"postalAddress\": { \r\n         \"postcode\": \"\", \r\n         \"streetName\": \"\", \r\n         \"cityName\": \"QALAT\", \r\n         \"countryCode\": \"AF\", \r\n         \"countryName\": \"AFGHANISTAN\" \r\n       } \r\n     }, \r\n     \"notifiedParty\": [ \r\n       { \r\n         \"id\": [{ \r\n           \"value\": \"13a8cc04-8aae-417f-9519-1c79e1fd8dac\", \r\n           \"identificationSchemeAgency\": \"SPEDLOGSWISS\" \r\n         } \r\n         ], \r\n         \"name\": { \r\n           \"value\": \"\" \r\n         }, \r\n         \"definedContactDetails\": { \r\n           \"personName\": { \r\n             \"value\": \"\" \r\n           }, \r\n           \"telephone\":{\"value\": \"\"}, \r\n           \"mobileTelephone\":{\"value\": \"\"}, \r\n           \"emailAddress\":{\"value\": \"\"} \r\n         } \r\n       } \r\n     ], \r\n     \"carrierAcceptanceLocation\": { \r\n       \"id\": \"AF\", \r\n       \"name\": { \r\n         \"value\": \"QALAT\" \r\n       } \r\n     }, \r\n     \"consigneeReceiptLocation\": { \r\n       \"id\": \"DZALG\", \r\n       \"name\": { \r\n         \"value\": \"ALGER (ALGIERS)\" \r\n       } \r\n     }, \r\n     \"numberOfPackages\": 0, \r\n     \"includedConsignmentItem\": [{ \r\n       \"goodsTypeCode\": { \r\n         \"value\": \"0\" \r\n       }, \r\n       \"grossWeight\": { \r\n         \"value\": 0.00000, \r\n         \"unit\": \"kg\" \r\n       }, \r\n       \"grossVolume\": { \r\n         \"value\": 0.00000, \r\n         \"unit\": \"cbm\" \r\n       } \r\n       ,\"cargoNatureIdentification\": { \r\n         \"identificationText\": [ \r\n           { \r\n             \"value\": \"0\" \r\n           } \r\n         ] \r\n       }, \r\n       \"transportPackage\": [{ \r\n         \"itemQuantity\": 0, \r\n         \"shippingMarks\": [\"\"], \r\n         \"typeText\": \"\" \r\n       } \r\n       ] \r\n     }] \r\n     ,\"loadingBaseportLocation\": { \r\n       \"countryCode\":\"AF\", \r\n       \"id\": \"AFQLT\", \r\n       \"name\": { \r\n         \"value\": \"QALAT\" \r\n       } \r\n     } \r\n     ,\"unloadingBaseportLocation\": { \r\n       \"countryCode\": \"DZ\", \r\n       \"id\": \"DZALG\", \r\n       \"name\": { \r\n         \"value\": \"ALGER (ALGIERS)\" \r\n       } \r\n     } \r\n   } \r\n } \r\n";

                var httpWebRequest = (HttpWebRequest)WebRequest.Create(integrationsFiataUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.Headers.Add("Authorization", ("Bearer " + Global_access_token));
                httpWebRequest.Headers.Add("X-Alias-ID", "fiata");

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    streamWriter.Write(jsonData);
                }

                try
                {
                    WebResponse myResp = httpWebRequest.GetResponse();
                    pFileName = myResp.Headers.Get("Content-Disposition").Split('=')[1];

                    using (Stream stream = myResp.GetResponseStream())
                    using (MemoryStream ms = new MemoryStream())
                    {
                        int count = 0;
                        do
                        {
                            byte[] buf = new byte[1024];
                            count = stream.Read(buf, 0, 1024);
                            ms.Write(buf, 0, count);
                        }
                        while (stream.CanRead && count > 0);
                        pdfInBytes = ms.ToArray();
                    }


                    #region Save File
                    COperations objCOperations = new COperations();
                    objCOperations.UpdateList("eFBLStatus=10, eFBLID=N'" + pFileName.Split('.')[0] + "' WHERE ID=" + objCvwOperations.lstCVarvwOperations[0].ID);

                    var filename = pFileName;
                    string pathString = Path.Combine(mapPath, filename);
                    File.WriteAllBytes(pathString, pdfInBytes);
                    #endregion Save File

                }
                catch (Exception ex)
                {
                    pReturnedMessage = ex.Message;
                }
            }
            #endregion Call WebAPI

            return new object[] {
                pReturnedMessage
                , pdfInBytes
                , pFileName
            };
        }
        
    }

    public class MyDetail
    {
        public string access_token { get; set; }
        public string expires_in { get; set; }
        public string token_type { get; set; }
        public string scope { get; set; }
    }

}