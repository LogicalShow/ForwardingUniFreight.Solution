//using IronPdf;
using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Common;
using Forwarding.MvcApp.Controllers.ShipsGo;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_FollowUp.Generated;
using Forwarding.MvcApp.Models.CRM.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using Forwarding.MvcApp.Models.ShipsGo;
using Forwarding.MvcApp.Models.XML;
using MoreLinq;
using Newtonsoft.Json;
using OpenHtmlToPdf;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Windows.Input;
using WebMatrix.WebData;
using static QRCoder.PayloadGenerator;

namespace Forwarding.MvcApp.Controllers.Administration.API_Settings
{
    public class DefaultsController : ApiController
    {
        private static readonly object _lockObject = new object();
        #region delete

        //[HttpGet, HttpPost]
        //public async Task<object[]> eFBL_Generate(Int64 pID_eFBL)
        //{

        //    #region Getting Data And Validating
        //    string pReturnedMessage = "";
        //    string json = "";
        //    int _RowCount = 0;
        //    string pFileName = "";
        //    byte[] pdfInBytes = null;

        //    int constCustomerPartnerTypeID = 1;
        //    int constAgentPartnerTypeID = 2;
        //    //int constShippingAgentPartnerTypeID = 3;
        //    //int constCustomsClearanceAgentPartnerTypeID = 4;
        //    int constShippingLinePartnerTypeID = 5;
        //    //int constAirlinePartnerTypeID = 6;
        //    //int constTruckerPartnerTypeID = 7;
        //    //int constSupplierPartnerTypeID = 8;
        //    //int constCustodyPartnerTypeID = 20;
        //    Exception checkException = null;

        //    #region Get MapPath

        //    //I put MapPath at the top because after await it becomes null
        //    bool exists = Directory.Exists(HttpContext.Current.Server.MapPath(pID_eFBL.ToString()));
        //    if (!exists)
        //        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(pID_eFBL.ToString()));
        //    string mapPath = HttpContext.Current.Server.MapPath(pID_eFBL.ToString());
        //    #endregion Get MapPath
        //    CvwOperations objCvwOperations = new CvwOperations();
        //    CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();

        //    CContacts objCShipperContacts = new CContacts();
        //    CvwAddresses objCShipperAddresses = new CvwAddresses();

        //    CContacts objCConsigneeContacts = new CContacts();
        //    CvwAddresses objCConsigneeAddresses = new CvwAddresses();

        //    CContacts objCAgentContacts = new CContacts();
        //    CvwAddresses objCAgentAddresses = new CvwAddresses();

        //    CContacts objCShippingLineContacts = new CContacts();
        //    CvwAddresses objCShippingLineAddresses = new CvwAddresses();

        //    #region Get Data
        //    checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + pID_eFBL, "ID", out _RowCount);
        //    checkException = objCvwOperationContainersAndPackages.GetListPaging(999, 1, "WHERE OperationID=" + pID_eFBL, "ID", out _RowCount);

        //    checkException = objCShipperAddresses.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ShipperID + " AND PartnerTypeID=" + constCustomerPartnerTypeID);
        //    checkException = objCShipperContacts.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ShipperID + " AND PartnerTypeID=" + constCustomerPartnerTypeID);

        //    checkException = objCConsigneeAddresses.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ConsigneeID + " AND PartnerTypeID=" + constCustomerPartnerTypeID);
        //    checkException = objCConsigneeContacts.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ConsigneeID + " AND PartnerTypeID=" + constCustomerPartnerTypeID);

        //    checkException = objCAgentAddresses.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].AgentID + " AND PartnerTypeID=" + constAgentPartnerTypeID);
        //    checkException = objCAgentContacts.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].AgentID + " AND PartnerTypeID=" + constAgentPartnerTypeID);

        //    checkException = objCShippingLineAddresses.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ShippingLineID + " AND PartnerTypeID=" + constShippingLinePartnerTypeID);
        //    checkException = objCShippingLineContacts.GetList("WHERE PartnerID=" + objCvwOperations.lstCVarvwOperations[0].ShippingLineID + " AND PartnerTypeID=" + constShippingLinePartnerTypeID);
        //    #endregion Get Data

        //    #region Validate
        //    if (objCShipperContacts.lstCVarContacts.Count == 0 || objCShipperAddresses.lstCVarvwAddresses.Count == 0)
        //    {
        //        pReturnedMessage = "Please, check you shipper's address and contact person";
        //    }
        //    else if (objCShipperContacts.lstCVarContacts[0].Phone1 == "0")
        //        pReturnedMessage = "Please, enter shipper contact's phone";
        //    else if (objCShipperContacts.lstCVarContacts[0].Email == "0")
        //        pReturnedMessage = "Please, enter shipper contact's email";
        //    else if (objCShipperAddresses.lstCVarvwAddresses[0].ZipCode == "0")
        //        pReturnedMessage = "Please, enter shipper post code";
        //    else if (objCShipperAddresses.lstCVarvwAddresses[0].StreetLine1 == "0")
        //        pReturnedMessage = "Please, enter shipper street";
        //    else if (objCShipperAddresses.lstCVarvwAddresses[0].CityID == 0)
        //        pReturnedMessage = "Please, enter shipper city";
        //    else if (objCShipperAddresses.lstCVarvwAddresses[0].CountryID == 0)
        //        pReturnedMessage = "Please, enter shipper country";

        //    else if (objCConsigneeContacts.lstCVarContacts.Count == 0)
        //    {
        //        pReturnedMessage = "Please, check you Consignee's contact person";
        //    }

        //    else if (objCShippingLineContacts.lstCVarContacts.Count == 0 || objCShippingLineAddresses.lstCVarvwAddresses.Count == 0)
        //    {
        //        pReturnedMessage = "Please, check the carrier's contact person and address";
        //    }
        //    #endregion Validate

        //    if (pReturnedMessage == "") //Mandatory Data is complete
        //    {
        //        #region exchanged_document
        //        json += " { \n";
        //        json += "   \"exchanged_document\": { \n";
        //        json += "     \"documentStatus\": { \n";
        //        json += "       \"value\": \"" + (objCvwOperations.lstCVarvwOperations[0].eFBLID == "0" ? "TBD" : objCvwOperations.lstCVarvwOperations[0].eFBLID) + "\" \n"; //????????????
        //        json += "     }, \n";

        //        json += "     \"issueDateTime\": { \n";
        //        json += "       \"value\": \"" + DateTime.Now.Year + "-" + DateTime.Now.Month.ToString().PadLeft(2, '0') + "-" + DateTime.Now.Day.ToString().PadLeft(2, '0') + "T" + DateTime.Now.Hour.ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0') + ":00.000" + "\", \n"; //2021-03-31T12:34:56.123;
        //        json += "       \"format\": \"YYYY-MM-DDThh:mm:ss.sss\" \n";
        //        json += "     }, \n";

        //        json += "     \"firstSignatoryAuthentication\": { \n";
        //        json += "       \"actualDateTime\": { \n";
        //        json += "         \"value\": \"" + DateTime.Now.Year + "-" + DateTime.Now.Month.ToString().PadLeft(2, '0') + "-" + DateTime.Now.Day.ToString().PadLeft(2, '0') + "T" + DateTime.Now.Hour.ToString().PadLeft(2, '0') + ":" + DateTime.Now.Minute.ToString().PadLeft(2, '0') + ":00.000" + "\", \n"; //2021-03-31T12:34:56.012
        //        json += "         \"format\": \"YYYY-MM-DDThh:mm:ss.sss\" \n";
        //        json += "       }, \n";
        //        json += "       \"id\": \"12345\", \n"; //????????????
        //        json += "       \"statement\": { \n"; //????????????
        //        json += "         \"value\": \"\" \n";
        //        json += "       } \n";
        //        json += "     }, \n";

        //        json += "     \"issueLocation\": { \n";
        //        json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].POLCode + "\", \n"; //????????????
        //        json += "       \"countryCode\": \"" + objCvwOperations.lstCVarvwOperations[0].POLCountryCode + "\", \n";  //????????????
        //        json += "       \"name\": { \n";
        //        json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].POLName + "\" \n";
        //        json += "       } \n";
        //        json += "     }, \n";
        //        json += "     \"originalIssuedQuantity\": \"" + (objCvwOperations.lstCVarvwOperations[0].NumberOfOriginalBills == 0 ? 1 : objCvwOperations.lstCVarvwOperations[0].NumberOfOriginalBills) + "\" \n";
        //        json += "   }, \n";
        //        #endregion exchanged_document

        //        #region supply_chain_consignment
        //        json += "   \"supply_chain_consignment\": { \n";
        //        json += "     \"cargoInsuranceNotProvidedByCTO\": true, \n"; //CTO:Combined Transport Operator [Carrier/Line]

        //        #region Consignor
        //        {
        //            json += "     \"consignor\": { \n";
        //            json += "       \"name\": { \n";
        //            json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].ShipperName + "\" \n";
        //            json += "       }, \n";
        //            json += "       \"definedContactDetails\": { \n";
        //            json += "         \"personName\": { \n";
        //            json += "           \"value\": \"" + objCShipperContacts.lstCVarContacts[0].Name + "\" \n";
        //            json += "         }, \n";
        //            json += "         \"telephone\": { \n";
        //            json += "           \"value\": \"" + objCShipperContacts.lstCVarContacts[0].Phone1 + "\" \n";
        //            json += "         }, \n";
        //            json += "         \"mobileTelephone\":{ \n";
        //            json += "           \"value\": \"" + (objCShipperContacts.lstCVarContacts[0].Mobile1 == "0" ? "" : objCShipperContacts.lstCVarContacts[0].Mobile1) + "\" \n";
        //            json += "         }, \n";
        //            json += "         \"emailAddress\":{ \n";
        //            json += "           \"value\": \"" + (objCShipperContacts.lstCVarContacts[0].Email == "0" ? "" : objCShipperContacts.lstCVarContacts[0].Email) + "\" \n";
        //            json += "         } \n";
        //            json += "       }, \n";
        //            json += "       \"postalAddress\": { \n";
        //            json += "         \"postcode\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].ZipCode + "\", \n";
        //            json += "         \"streetName\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].StreetLine1 + "\", \n";
        //            json += "         \"cityName\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].CityName + "\", \n";
        //            json += "         \"countryCode\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].CountryCode + "\", \n";
        //            json += "         \"countryName\": \"" + objCShipperAddresses.lstCVarvwAddresses[0].CountryName + "\" \n";
        //            json += "       } \n";
        //            json += "     }, \n";
        //        }
        //        #endregion Consignor

        //        #region Consignee
        //        {
        //            json += "     \"consignee\": { \n";
        //            json += "       \"name\": { \n";
        //            json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].ConsigneeName + "\" \n";
        //            json += "       } \n";

        //            json += "       ,\"definedContactDetails\": { \n";
        //            json += "         \"personName\": { \n";
        //            json += "           \"value\": \"" + objCConsigneeContacts.lstCVarContacts[0].Name + "\" \n";
        //            json += "         }, \n";
        //            json += "         \"telephone\": { \n";
        //            json += "           \"value\": \"" + objCConsigneeContacts.lstCVarContacts[0].Phone1 + "\" \n";
        //            json += "         }, \n";
        //            json += "         \"mobileTelephone\":{ \n";
        //            json += "           \"value\": \"" + (objCConsigneeContacts.lstCVarContacts[0].Mobile1 == "0" ? "" : objCConsigneeContacts.lstCVarContacts[0].Mobile1) + "\" \n";
        //            json += "         }, \n";
        //            json += "         \"emailAddress\":{ \n";
        //            json += "           \"value\": \"" + (objCConsigneeContacts.lstCVarContacts[0].Email == "0" ? "" : objCConsigneeContacts.lstCVarContacts[0].Email) + "\" \n";
        //            json += "         } \n";
        //            json += "       } \n";
        //            if (objCConsigneeAddresses.lstCVarvwAddresses.Count > 0)
        //            {
        //                json += "       ,\"postalAddress\": { \n";
        //                json += "         \"postcode\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].ZipCode + "\", \n";
        //                json += "         \"streetName\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].StreetLine1 + "\", \n";
        //                json += "         \"cityName\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].CityName + "\", \n";
        //                json += "         \"countryCode\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].CountryCode + "\", \n";
        //                json += "         \"countryName\": \"" + objCConsigneeAddresses.lstCVarvwAddresses[0].CountryName + "\" \n";
        //                json += "       } \n";
        //            }
        //            json += "     }, \n";
        //        }
        //        #endregion Consignee

        //        #region ctoAgent
        //        if (objCvwOperations.lstCVarvwOperations[0].AgentID > 0)
        //        {
        //            json += "     \"ctoAgent\": { \n";
        //            json += "       \"name\": { \n";
        //            json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].AgentName + "\" \n";
        //            json += "       } \n";
        //            if (objCAgentContacts.lstCVarContacts.Count > 0)
        //            {
        //                json += "       ,\"definedContactDetails\": { \n";
        //                json += "         \"personName\": { \n";
        //                json += "           \"value\": \"" + objCAgentContacts.lstCVarContacts[0].Name + "\" \n";
        //                json += "         }, \n";
        //                json += "         \"telephone\": { \n";
        //                json += "           \"value\": \"" + (objCAgentContacts.lstCVarContacts[0].Phone1 == "0" ? "" : objCAgentContacts.lstCVarContacts[0].Phone1) + "\" \n";
        //                json += "         }, \n";
        //                json += "         \"mobileTelephone\":{ \n";
        //                json += "           \"value\": \"" + (objCAgentContacts.lstCVarContacts[0].Mobile1 == "0" ? "" : objCAgentContacts.lstCVarContacts[0].Mobile1) + "\" \n";
        //                json += "         }, \n";
        //                json += "         \"emailAddress\":{ \n";
        //                json += "           \"value\": \"" + (objCAgentContacts.lstCVarContacts[0].Email == "0" ? "" : objCAgentContacts.lstCVarContacts[0].Email) + "\" \n";
        //                json += "         } \n";
        //                json += "       } \n";
        //            }
        //            if (objCAgentAddresses.lstCVarvwAddresses.Count > 0)
        //            {
        //                json += "       ,\"postalAddress\": { \n";
        //                json += "         \"postcode\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].ZipCode + "\", \n";
        //                json += "         \"streetName\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].StreetLine1 + "\", \n";
        //                json += "         \"cityName\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].CityName + "\", \n";
        //                json += "         \"countryCode\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].CountryCode + "\", \n";
        //                json += "         \"countryName\": \"" + objCAgentAddresses.lstCVarvwAddresses[0].CountryName + "\" \n";
        //                json += "       } \n";
        //            }
        //            json += "     }, \n";
        //        }
        //        #endregion ctoAgent

        //        #region CTO //CTO:Combined Transport Operator [Carrier/Line]
        //        if (objCvwOperations.lstCVarvwOperations[0].ShippingLineName != "0")
        //        {
        //            json += "     \"cto\": { \n";
        //            json += "       \"id\": [{ \n";
        //            json += "         \"value\": \"13a8cc04-8aae-417f-9519-1c79e1fd8dac\", \n";
        //            json += "         \"identificationSchemeAgency\": \"FIATA\" \n"; //????????
        //            json += "       } \n";
        //            json += "       ], \n";
        //            json += "       \"name\": { \n";
        //            json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].ShippingLineName + "\" \n";
        //            json += "       } \n";
        //            if (objCShippingLineContacts.lstCVarContacts.Count > 0)
        //            {
        //                json += "       ,\"definedContactDetails\": { \n";
        //                json += "         \"personName\": { \n";
        //                json += "           \"value\": \"" + objCShippingLineContacts.lstCVarContacts[0].Name + "\" \n";
        //                json += "         }, \n";
        //                json += "         \"telephone\": { \n";
        //                json += "           \"value\": \"" + (objCShippingLineContacts.lstCVarContacts[0].Phone1 == "0" ? "" : objCShippingLineContacts.lstCVarContacts[0].Phone1) + "\" \n";
        //                json += "         }, \n";
        //                json += "         \"mobileTelephone\":{ \n";
        //                json += "           \"value\": \"" + (objCShippingLineContacts.lstCVarContacts[0].Mobile1 == "0" ? "" : objCShippingLineContacts.lstCVarContacts[0].Mobile1) + "\" \n";
        //                json += "         }, \n";
        //                json += "         \"emailAddress\":{ \n";
        //                json += "           \"value\": \"" + (objCShippingLineContacts.lstCVarContacts[0].Email == "0" ? "" : objCShippingLineContacts.lstCVarContacts[0].Email) + "\" \n";
        //                json += "         } \n";
        //                json += "       } \n";
        //            }
        //            if (objCShippingLineAddresses.lstCVarvwAddresses.Count > 0)
        //            {
        //                json += "       ,\"postalAddress\": { \n";
        //                json += "         \"postcode\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].ZipCode + "\", \n";
        //                json += "         \"streetName\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].StreetLine1 + "\", \n";
        //                json += "         \"cityName\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].CityName + "\", \n";
        //                json += "         \"countryCode\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].CountryCode + "\", \n";
        //                json += "         \"countryName\": \"" + objCShippingLineAddresses.lstCVarvwAddresses[0].CountryName + "\" \n";
        //                json += "       } \n";
        //            }
        //            json += "     }, \n";
        //        }
        //        #endregion CTO

        //        #region Notify
        //        {
        //            json += "     \"notifiedParty\": [ \n";
        //            json += "       { \n";
        //            json += "         \"id\": [{ \n";
        //            json += "           \"value\": \"13a8cc04-8aae-417f-9519-1c79e1fd8dac\", \n"; //??????????
        //            json += "           \"identificationSchemeAgency\": \"SPEDLOGSWISS\" \n"; //??????????
        //            json += "         } \n";
        //            json += "         ], \n";
        //            json += "         \"name\": { \n";
        //            json += "           \"value\": \"" + (objCvwOperations.lstCVarvwOperations[0].Notify1Name == "0" ? "" : objCvwOperations.lstCVarvwOperations[0].Notify1Name) + "\" \n";
        //            json += "         }, \n";
        //            json += "         \"definedContactDetails\": { \n";
        //            json += "           \"personName\": { \n";
        //            json += "             \"value\": \"" + "" + "\" \n";
        //            json += "           }, \n";
        //            json += "           \"telephone\":{\"value\": \"" + "" + "\"}, \n";
        //            json += "           \"mobileTelephone\":{\"value\": \"" + "" + "\"}, \n";
        //            json += "           \"emailAddress\":{\"value\": \"" + "" + "\"} \n";
        //            json += "         } \n";
        //            //json += "         ,\"postalAddress\": { \n";
        //            //json += "           \"postcode\": \"" + "" + "\", \n";
        //            //json += "           \"streetName\": \"" + (objCvwOperations.lstCVarvwOperations[0].Notify1Address == "0" ? "" : objCvwOperations.lstCVarvwOperations[0].Notify1Address) + "\", \n";
        //            //json += "           \"cityName\": \"MENINGIE WEST\", \n";
        //            //json += "           \"countryCode\": \"AU\", \n";
        //            //json += "           \"countryName\": \"Australia\" \n";
        //            //json += "         } \n";
        //            json += "       } \n";
        //            json += "     ], \n";
        //        }
        //        #endregion Notify

        //        #region carrierAcceptanceLocation
        //        json += "     \"carrierAcceptanceLocation\": { \n";
        //        json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].POLCountryCode + "\", \n"; //???????????????
        //        json += "       \"name\": { \n";
        //        json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].POLName + "\" \n";
        //        json += "       } \n";
        //        json += "     }, \n";
        //        #endregion carrierAcceptanceLocation

        //        #region consigneeReceiptLocation
        //        json += "     \"consigneeReceiptLocation\": { \n";
        //        json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].PODCode + "\", \n"; //???????????????
        //        json += "       \"name\": { \n";
        //        json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].PODName + "\" \n";
        //        json += "       } \n";
        //        json += "     }, \n";
        //        #endregion consigneeReceiptLocation


        //        json += "     \"numberOfPackages\": " + objCvwOperations.lstCVarvwOperations[0].NumberOfPackages + " \n";

        //        #region add this in loop for Marks and numbers line by line 
        //        if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count > 0)
        //        {
        //            json += "     ,\"includedConsignmentItem\": [";
        //            for (int i = 0; i < objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count; i++)
        //            {
        //                json += (i == 0 ? "" : ",");
        //                json += "               { \n";
        //                json += "                   \"goodsTypeCode\": { \n";
        //                json += "                     \"value\": \"" + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].DescriptionOfGoods.Replace("\n", ", ") + "\" \n";
        //                json += "                   }, \n";
        //                json += "                   \"grossWeight\": { \n";
        //                json += "                     \"value\": " + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].GrossWeight + ", \n";
        //                json += "                     \"unit\": \"kg\" \n";
        //                json += "                   }, \n";
        //                json += "                   \"grossVolume\": { \n";
        //                json += "                     \"value\": " + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].Volume + ", \n";
        //                json += "                     \"unit\": \"cbm\" \n";
        //                json += "                   } \n";
        //                json += "                   ,\"cargoNatureIdentification\": { \n";
        //                json += "                     \"identificationText\": [ \n";
        //                json += "                       { \n";
        //                json += "                         \"value\": \"" + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].PackageTypeNameOnContainer + "\" \n";
        //                json += "                       } \n";
        //                json += "                     ] \n";
        //                json += "                   }, \n";
        //                json += "                   \"transportPackage\": [{ \n";
        //                json += "                     \"itemQuantity\": " + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].NumberOfPackagesOnContainer + ", \n";
        //                json += "                     \"shippingMarks\": [\"" + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].MarksAndNumbers.Replace("\n", "\",\"") + "\"], \n";
        //                json += "                     \"typeText\": \"" + "" + "\" \n";
        //                json += "                   } \n";
        //                json += "                 ] \n";
        //                json += "               }";
        //            }
        //            json += "    ] \n";
        //        }
        //        #endregion add this in loop for Marks and numbers line by line









        //        //json += "     ,\"applicableServiceCharge\": [{ \n";
        //        //json += "       \"paymentArrangementCode\": { \n";
        //        //json += "         \"value\": \"A\", \n";
        //        //json += "         \"agency\": \"UN/EDIFACT\" \n";
        //        //json += "       }, \n";
        //        //json += "       \"paymentPlace\": { \n";
        //        //json += "         \"name\": { \n";
        //        //json += "           \"value\": \"Kastanienallee 12, 26579 Hinte, Niedersachsen, Germany\" \n";
        //        //json += "         }, \n";
        //        //json += "         \"id\": \"9501101020023\" \n";
        //        //json += "       } \n";
        //        //json += "     }] \n";
        //        json += "     ,\"loadingBaseportLocation\": { \n";
        //        json += "       \"countryCode\":\"" + objCvwOperations.lstCVarvwOperations[0].POLCountryCode + "\", \n";
        //        json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].POLCode + "\", \n"; //??????????????
        //        json += "       \"name\": { \n";
        //        json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].POLName + "\" \n";
        //        json += "       } \n";
        //        json += "     } \n";
        //        json += "     ,\"unloadingBaseportLocation\": { \n";
        //        json += "       \"countryCode\": \"" + objCvwOperations.lstCVarvwOperations[0].PODCountryCode + "\", \n";
        //        json += "       \"id\": \"" + objCvwOperations.lstCVarvwOperations[0].PODCode + "\", \n"; //??????????????
        //        json += "       \"name\": { \n";
        //        json += "         \"value\": \"" + objCvwOperations.lstCVarvwOperations[0].PODName + "\" \n";
        //        json += "       } \n";
        //        json += "     } \n";
        //        //json += "     ,\"mainCarriageTransportMovement\": [{ \n";
        //        //json += "       \"typeCode\": { \n";
        //        //json += "         \"value\": \"503\" \n";
        //        //json += "       } \n";
        //        //json += "       ,\"typeText\": { \n";
        //        //json += "         \"value\": \"Wood chips vessel\" \n";
        //        //json += "       } \n";
        //        //json += "     }] \n";
        //        //json += "     ,\"declaredValueForCarriageAmount\": { \n";
        //        //json += "       \"value\": 10000000, \n";
        //        //json += "       \"currency\": \"EUR\" \n";
        //        //json += "     } \n";
        //        //json += "     ,\"totalChargeAmount\": { \n";
        //        //json += "       \"value\": 15000000, \n";
        //        //json += "       \"currency\": \"EUR\" \n";
        //        //json += "     } \n";
        //        json += "   } \n";
        //        json += " } \n";
        //        #endregion supply_chain_consignment

        //        //File.WriteAllText(@"D:\eFBL.json", json);
        //    }

        //    #endregion Getting Data And Validting

        //    #region Call WebAPI
        //    if (pReturnedMessage == "") //Mandatory Data is complete
        //    {
        //        var Global_access_token = "";
        //        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        //        ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

        //        string tokenUrl = $"https://keycloak.kapsule-eu-uat.komgo.io/auth/realms/fiata/protocol/openid-connect/token";
        //        var req = new HttpRequestMessage(HttpMethod.Post, tokenUrl);

        //        req.Content = new FormUrlEncodedContent(new Dictionary<string, string>
        //        {
        //            ["username"] = "istnetworks-staging@efbl.fiata.org",
        //            ["password"] = "Luminance-Playgroup-Donor8-Flagman-Exchange",
        //            ["client_id"] = "fiata",
        //            ["grant_type"] = "password"
        //        });

        //        using (var client = new HttpClient())
        //        {
        //            var res = await client.SendAsync(req);

        //            string returnedJSON = await res.Content.ReadAsStringAsync();
        //            var jsonAccess = JsonConvert.DeserializeObject<MyDetail>(returnedJSON);

        //            var access_token = jsonAccess.access_token;
        //            var expires_in = jsonAccess.expires_in;
        //            var scope = jsonAccess.scope;
        //            var token_type = jsonAccess.token_type;

        //            Global_access_token = access_token;
        //        }
        //        ////////////////Send details////////////////////
        //        string integrationsFiataUrl = $"https://api.kapsule-eu-uat.komgo.io/api/trakk/v0/integrations/fiata/fbl-json?softwareProviderId=e651b830-a153-4bb4-ac13-2583720bff32";

        //        string jsonData = json;  //" { \r\n   \"exchanged_document\": { \r\n     \"documentStatus\": { \r\n       \"value\": \"TBD\" \r\n     }, \r\n     \"issueDateTime\": { \r\n       \"value\": \"2022-04-27T05:50:00.000\", \r\n       \"format\": \"YYYY-MM-DDThh:mm:ss.sss\" \r\n     }, \r\n     \"firstSignatoryAuthentication\": { \r\n       \"actualDateTime\": { \r\n         \"value\": \"2022-04-27T05:50:00.000\", \r\n         \"format\": \"YYYY-MM-DDThh:mm:ss.sss\" \r\n       }, \r\n       \"id\": \"12345\", \r\n       \"statement\": { \r\n         \"value\": \"\" \r\n       } \r\n     }, \r\n     \"issueLocation\": { \r\n       \"id\": \"AFQLT\", \r\n       \"countryCode\": \"AF\", \r\n       \"name\": { \r\n         \"value\": \"QALAT\" \r\n       } \r\n     }, \r\n     \"originalIssuedQuantity\": \"1\" \r\n   }, \r\n   \"supply_chain_consignment\": { \r\n     \"cargoInsuranceNotProvidedByCTO\": true, \r\n     \"consignor\": { \r\n       \"name\": { \r\n         \"value\": \"AVL GROUP\" \r\n       }, \r\n       \"definedContactDetails\": { \r\n         \"personName\": { \r\n           \"value\": \"M. ABDELAZIZ\" \r\n         }, \r\n         \"telephone\": { \r\n           \"value\": \"038372727\" \r\n         }, \r\n         \"mobileTelephone\":{ \r\n           \"value\": \"03767373\" \r\n         }, \r\n         \"emailAddress\":{ \r\n           \"value\": \"AVL@AVLGROUP.COM\" \r\n         } \r\n       }, \r\n       \"postalAddress\": { \r\n         \"postcode\": \"21321\", \r\n         \"streetName\": \"STREET 1\", \r\n         \"cityName\": \"BARBUDA\", \r\n         \"countryCode\": \"AG\", \r\n         \"countryName\": \"ANTIGUA AND BARBUDA\" \r\n       } \r\n     }, \r\n     \"consignee\": { \r\n       \"name\": { \r\n         \"value\": \"ALFA M.GSS\" \r\n       } \r\n       ,\"definedContactDetails\": { \r\n         \"personName\": { \r\n           \"value\": \"CONTACT NAME\" \r\n         }, \r\n         \"telephone\": { \r\n           \"value\": \"\" \r\n         }, \r\n         \"mobileTelephone\":{ \r\n           \"value\": \"\" \r\n         }, \r\n         \"emailAddress\":{ \r\n           \"value\": \"\" \r\n         } \r\n       } \r\n     }, \r\n     \"ctoAgent\": { \r\n       \"name\": { \r\n         \"value\": \"ABC AGENCY\" \r\n       } \r\n       ,\"definedContactDetails\": { \r\n         \"personName\": { \r\n           \"value\": \"ABC\" \r\n         }, \r\n         \"telephone\": { \r\n           \"value\": \"89867787\" \r\n         }, \r\n         \"mobileTelephone\":{ \r\n           \"value\": \"86765757\" \r\n         }, \r\n         \"emailAddress\":{ \r\n           \"value\": \"ABC@AGENCY.COM\" \r\n         } \r\n       } \r\n       ,\"postalAddress\": { \r\n         \"postcode\": \"\", \r\n         \"streetName\": \"232 DFDFDF\", \r\n         \"cityName\": \"BENISAF\", \r\n         \"countryCode\": \"DZ\", \r\n         \"countryName\": \"ALGERIA\" \r\n       } \r\n     }, \r\n     \"cto\": { \r\n       \"id\": [{ \r\n         \"value\": \"13a8cc04-8aae-417f-9519-1c79e1fd8dac\", \r\n         \"identificationSchemeAgency\": \"FIATA\" \r\n       } \r\n       ], \r\n       \"name\": { \r\n         \"value\": \"ABC CONTAINERLINE N.V.\" \r\n       } \r\n       ,\"definedContactDetails\": { \r\n         \"personName\": { \r\n           \"value\": \"ABC SHIPPING LNE CONTACT\" \r\n         }, \r\n         \"telephone\": { \r\n           \"value\": \"\" \r\n         }, \r\n         \"mobileTelephone\":{ \r\n           \"value\": \"\" \r\n         }, \r\n         \"emailAddress\":{ \r\n           \"value\": \"\" \r\n         } \r\n       } \r\n       ,\"postalAddress\": { \r\n         \"postcode\": \"\", \r\n         \"streetName\": \"\", \r\n         \"cityName\": \"QALAT\", \r\n         \"countryCode\": \"AF\", \r\n         \"countryName\": \"AFGHANISTAN\" \r\n       } \r\n     }, \r\n     \"notifiedParty\": [ \r\n       { \r\n         \"id\": [{ \r\n           \"value\": \"13a8cc04-8aae-417f-9519-1c79e1fd8dac\", \r\n           \"identificationSchemeAgency\": \"SPEDLOGSWISS\" \r\n         } \r\n         ], \r\n         \"name\": { \r\n           \"value\": \"\" \r\n         }, \r\n         \"definedContactDetails\": { \r\n           \"personName\": { \r\n             \"value\": \"\" \r\n           }, \r\n           \"telephone\":{\"value\": \"\"}, \r\n           \"mobileTelephone\":{\"value\": \"\"}, \r\n           \"emailAddress\":{\"value\": \"\"} \r\n         } \r\n       } \r\n     ], \r\n     \"carrierAcceptanceLocation\": { \r\n       \"id\": \"AF\", \r\n       \"name\": { \r\n         \"value\": \"QALAT\" \r\n       } \r\n     }, \r\n     \"consigneeReceiptLocation\": { \r\n       \"id\": \"DZALG\", \r\n       \"name\": { \r\n         \"value\": \"ALGER (ALGIERS)\" \r\n       } \r\n     }, \r\n     \"numberOfPackages\": 0, \r\n     \"includedConsignmentItem\": [{ \r\n       \"goodsTypeCode\": { \r\n         \"value\": \"0\" \r\n       }, \r\n       \"grossWeight\": { \r\n         \"value\": 0.00000, \r\n         \"unit\": \"kg\" \r\n       }, \r\n       \"grossVolume\": { \r\n         \"value\": 0.00000, \r\n         \"unit\": \"cbm\" \r\n       } \r\n       ,\"cargoNatureIdentification\": { \r\n         \"identificationText\": [ \r\n           { \r\n             \"value\": \"0\" \r\n           } \r\n         ] \r\n       }, \r\n       \"transportPackage\": [{ \r\n         \"itemQuantity\": 0, \r\n         \"shippingMarks\": [\"\"], \r\n         \"typeText\": \"\" \r\n       } \r\n       ] \r\n     }] \r\n     ,\"loadingBaseportLocation\": { \r\n       \"countryCode\":\"AF\", \r\n       \"id\": \"AFQLT\", \r\n       \"name\": { \r\n         \"value\": \"QALAT\" \r\n       } \r\n     } \r\n     ,\"unloadingBaseportLocation\": { \r\n       \"countryCode\": \"DZ\", \r\n       \"id\": \"DZALG\", \r\n       \"name\": { \r\n         \"value\": \"ALGER (ALGIERS)\" \r\n       } \r\n     } \r\n   } \r\n } \r\n";

        //        var httpWebRequest = (HttpWebRequest)WebRequest.Create(integrationsFiataUrl);
        //        httpWebRequest.ContentType = "application/json";
        //        httpWebRequest.Method = "POST";
        //        httpWebRequest.Headers.Add("Authorization", ("Bearer " + Global_access_token));
        //        httpWebRequest.Headers.Add("X-Alias-ID", "fiata");

        //        using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
        //        {
        //            streamWriter.Write(jsonData);
        //        }

        //        try
        //        {
        //            WebResponse myResp = httpWebRequest.GetResponse();
        //            pFileName = myResp.Headers.Get("Content-Disposition").Split('=')[1];

        //            using (Stream stream = myResp.GetResponseStream())
        //            using (MemoryStream ms = new MemoryStream())
        //            {
        //                int count = 0;
        //                do
        //                {
        //                    byte[] buf = new byte[1024];
        //                    count = stream.Read(buf, 0, 1024);
        //                    ms.Write(buf, 0, count);
        //                }
        //                while (stream.CanRead && count > 0);
        //                pdfInBytes = ms.ToArray();
        //            }


        //            #region Save File
        //            COperations objCOperations = new COperations();
        //            objCOperations.UpdateList("eFBLStatus=10, eFBLID=N'" + pFileName.Split('.')[0] + "' WHERE ID=" + objCvwOperations.lstCVarvwOperations[0].ID);

        //            var filename = pFileName;
        //            string pathString = Path.Combine(mapPath, filename);
        //            File.WriteAllBytes(pathString, pdfInBytes);
        //            #endregion Save File

        //        }
        //        catch (Exception ex)
        //        {
        //            pReturnedMessage = ex.Message;
        //        }
        //    }
        //    #endregion Call WebAPI

        //    return new object[] {
        //        pReturnedMessage
        //        , pdfInBytes
        //        , pFileName
        //    };
        //}

        //public class MyDetail
        //{
        //    public string access_token { get; set; }
        //    public string expires_in { get; set; }
        //    public string token_type { get; set; }
        //    public string scope { get; set; }
        //}

        #endregion delete

        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            int _RowCount = 0;
            int constPaymentTypeCheque = 20;
            //sendEmailViaWebApi();
            Exception checkException = new Exception();
            //PageDirectly objPageDirectly = new PageDirectly();
            //string _PageDirectly = objPageDirectly._PageDirectly;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CUsers objCUsers = new CUsers();
            objCUsers.UpdateList("HeartBeatDate=GETDATE() WHERE ID=" + WebSecurity.CurrentUserId);

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, pWhereClause, "ID", out _RowCount);

            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetList(" WHERE ID = " + WebSecurity.CurrentUserId); //i am sure i ve 1 row isa
            if (objCvwUsers.lstCVarvwUsers.Count > 0)
            {
                objCvwDefaults.lstCVarvwDefaults[0].UserBranchID = objCvwUsers.lstCVarvwUsers[0].BranchID;
            }
            CvwBranches objCvwBranches = new CvwBranches();
            //objCvwBranches.GetList("WHERE 1=1 ORDER BY Name");
            objCvwBranches.GetList("WHERE isnull(isDepartement, 0)=0 ORDER BY Name");

            CCommodities objcCommodites = new CCommodities();
            objcCommodites.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            var Commodites = objcCommodites.lstCVarCommodities.Select(c => new
            {
                ID = c.ID,
                Name = c.Name
            }).ToList();

            CTrackingStage objcTrackingStage = new CTrackingStage();
            objcTrackingStage.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            var trackingStages = objcTrackingStage.lstCVarTrackingStage.Select(c => new
            {
                ID = c.ID,
                Name = c.Name
            }).ToList();

            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetList("WHERE 1=1 ORDER BY Code");

            #region CRM Action Alarm
            //CvwCRM_FollowUps objCvwCRM_FollowUps = new CvwCRM_FollowUps();
            //objCvwCRM_FollowUps.GetList("WHERE IsAlarmSent=0 AND DATEDIFF(DAY, GETDATE(), NextStepDate)<=AlarmDays" + " \n"
            //    + " AND DATEDIFF(DAY, GETDATE(), NextStepDate)>=0 AND SalesRep=" + WebSecurity.CurrentUserId);
            //{
            //    for (int i = 0; i < objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps.Count; i++)
            //    {
            //        CVarEmail objCVarEmail = new CVarEmail();
            //        objCVarEmail.Subject = "Action For " + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].Name;
            //        objCVarEmail.Body = "Action: '" + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].Action + " \n"
            //            + "Sales Lead: " + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].Name + " \n"
            //            + "Action Date: " + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].ActionDate.ToShortDateString() + " \n";
            //        objCVarEmail.QuotationRouteID = 0;
            //        objCVarEmail.SenderUserID = objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].ModifatorUserID;
            //        objCVarEmail.SendingDate = DateTime.Now;
            //        objCEmail.lstCVarEmail.Add(objCVarEmail);
            //        Exception checkException_temp = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
            //        if (checkException_temp == null) //add to EmailReceivers
            //        {
            //            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
            //            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
            //            objCVarEmailReceiver.ReceiverUserID = objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].SalesRep;
            //            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
            //            objCVarEmailReceiver.IsAlarm = true;

            //            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
            //            checkException_temp = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
            //            if (checkException_temp == null)
            //            {
            //                CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
            //                objCCRM_FollowUp.UpdateList("IsAlarmSent=1 WHERE ID=" + objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps[i].ID);
            //            }

            //        }
            //    }
            //}
            #endregion CRM Action Alarm


            #region Send Department Notifications
            //CvwServiceDepartment objCvwServiceDepartment = new CvwServiceDepartment();
            ////ReThink: hint Select On by Dates from vwOperations --> select from Service Department that dates-->send to users belonging to that department
            //checkException = objCvwServiceDepartment.GetListPaging(999999, 1, "WHERE DepartmentID=" + objCvwUsers.lstCVarvwUsers[0].DepartmentID, "NotificationDateOption,ViewOrder", out _RowCount);
            //for (int i = 0; i < objCvwServiceDepartment.lstCVarvwServiceDepartment.Count; i++)
            //{
            //    //TODO: Send Email to all next role deparment users
            //}
            #endregion Send Department Notifications

            CvwEmailReceiver objCvwEmailReceiver = new CvwEmailReceiver();
            string EmailWhereClause = "";
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName);
            if(IsMescoCompany)
            {
                EmailWhereClause = "WHERE IsAlarm=1 AND ReceiverUserID=" + WebSecurity.CurrentUserId.ToString() + " AND SendingDate > DATEADD(DAY, -2, GETDATE()) ORDER BY ID DESC";
            } else
            {
                EmailWhereClause = "WHERE IsAlarm=1 AND ReceiverUserID=" + WebSecurity.CurrentUserId.ToString() + " ORDER BY ID DESC";
            }

            objCvwEmailReceiver.GetList(EmailWhereClause);

            CvwAccPayment objCvwUnderCollectCheques = new CvwAccPayment();
            objCvwUnderCollectCheques.GetListPaging(1000, 1, "WHERE IsDeleted=0 AND PaymentTypeID=" + constPaymentTypeCheque.ToString() + " AND IsApproved=0 AND IsRefused=0 AND CAST(DueDate AS date) <= GETDATE()", "DueDate", out _RowCount);

            CPorts objCAirPorts = new CPorts();
            objCAirPorts.GetList("WHERE CountryID=" + objCvwDefaults.lstCVarvwDefaults[0].DefaultCountryID + " AND IsAir=1 ORDER By Name");

            CcrmUserSalesmen objCcrmUserSalesmen = new CcrmUserSalesmen();
            objCcrmUserSalesmen.GetList("where UserID = " + WebSecurity.CurrentUserId);

            CcrmUserServices objCcrmUserServices = new CcrmUserServices();
            objCcrmUserServices.GetList("where UserID = " + WebSecurity.CurrentUserId);
            //********************************************************
            CMainClients objCMainClients = new CMainClients();
            objCMainClients.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            var MainClients = objCMainClients.lstCVarMainClients.Select(c => new
            {
                ID = c.ID,
                Name = c.NAME
            }).ToList();
            
            var AgentListNew = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Agents", typeof(CVarAgents)).Cast<CVarAgents>().ToList();
            var AgentList = AgentListNew.Select(a => new
            {
                ID = a.ID,
                Name = a.Name
            }).ToList();
            //********************************************************

            #region Create Notification From DueDate PaymentRequest
            if(IsMescoCompany)
            {
                CA_PaymentRequestDueDateAlarm objA_PaymentRequestDueDateAlarm = new CA_PaymentRequestDueDateAlarm();
                string whereClause = " where isnull(IsFinish,0)=0"
                + " and UserID=" + WebSecurity.CurrentUserId
                + " and DueDate <='" + DateTime.Now.ToString("yyyy/MM/dd") + "'";

                checkException = objA_PaymentRequestDueDateAlarm.GetList(whereClause);
                if (objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm.Count > 0)
                {
                    for (int i = 0; i < objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm.Count; i++)
                    {
                        checkException = objCCustomizedDBCall.A_ID_WithUserID("A_PaymentRequestCollected_CreateNotification",
                              objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm[i].ID, WebSecurity.CurrentUserId);
                    }
                }
            }

            #endregion

            ShipsGoChecking();
            CvwSL_ClientsGroups objCvwSL_ClientsGroups = new CvwSL_ClientsGroups();
            
                objCvwSL_ClientsGroups.GetList("WHERE 1=1");



            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwDefaults.lstCVarvwDefaults[0]) //data[0]
                , new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches) //data[1]
                , new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies) //data[2]
                , WebSecurity.CurrentUserId.ToString() //data[3]
                , objCvwUsers.lstCVarvwUsers.Count > 0 ? objCvwUsers.lstCVarvwUsers[0].Name : "" //data[4]
                , serializer.Serialize(objCvwEmailReceiver.lstCVarvwEmailReceiver) //data[5]
                , serializer.Serialize(objCvwUnderCollectCheques.lstCVarvwAccPayment) //data[6]
                , serializer.Serialize(objCAirPorts.lstCVarPorts) //data[7]
                , serializer.Serialize(objCvwUsers.lstCVarvwUsers[0]) //data[8]
                ,serializer.Serialize(Commodites) //data[9]
                ,serializer.Serialize(trackingStages) // data[10]
                ,serializer.Serialize(objCcrmUserSalesmen.lstCVarcrmUserSalesmen) // data[11]
                ,serializer.Serialize(objCcrmUserServices.lstCVarcrmUserServices) // data[12]
                ,serializer.Serialize(MainClients) // data[13]
                ,serializer.Serialize(AgentList) // data[14]
				,HttpContext.Current.Request.PhysicalApplicationPath//data[15]
                ,serializer.Serialize(objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups) // data[15]

            };
        }

        [HttpPost]
        public Object[] Update([FromBody] UpdateDefaultsData DefaultObject)
        {
            bool _result = false;
            string pUpdateClause = "";

            int _RowCount = 0;
            CDefaults objCDefaults_temp = new CDefaults();
            objCDefaults_temp.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            var _DefaultEmailPassword = objCDefaults_temp.lstCVarDefaults[0].Email_Password;



            pUpdateClause = " CompanyName = N'" + DefaultObject.pCompanyName + "'";
            pUpdateClause += " , CompanyLocalName = N'" + DefaultObject.pCompanyLocalName.ToString() + "' ";
            pUpdateClause += " , BranchID = " + DefaultObject.pBranchID.ToString();
            pUpdateClause += " , CurrencyID = " + DefaultObject.pCurrencyID.ToString();
            pUpdateClause += " , ForeignCurrencyID = " + DefaultObject.pForeignCurrencyID.ToString();
            pUpdateClause += " , GroupID = " + DefaultObject.pGroupID.ToString();

            pUpdateClause += " , AddressLine1 = " + (DefaultObject.pAddressLine1 == "" ? " NULL " : "N'" + DefaultObject.pAddressLine1 + "'");
            pUpdateClause += " , AddressLine2 = " + (DefaultObject.pAddressLine2 == "" ? " NULL " : "N'" + DefaultObject.pAddressLine2 + "'");
            pUpdateClause += " , AddressLine3 = " + (DefaultObject.pAddressLine3 == "" ? " NULL " : "N'" + DefaultObject.pAddressLine3 + "'");
            pUpdateClause += " , AddressLine4 = " + (DefaultObject.pAddressLine4 == "" ? " NULL " : "N'" + DefaultObject.pAddressLine4 + "'");
            pUpdateClause += " , AddressLine5 = " + (DefaultObject.pAddressLine5 == "" ? " NULL " : "N'" + DefaultObject.pAddressLine5 + "'");
            pUpdateClause += " , Email = " + (DefaultObject.pEmail == "" ? " NULL " : "N'" + DefaultObject.pEmail + "'");
            pUpdateClause += " , Website = " + (DefaultObject.pWebsite == "" ? " NULL " : "N'" + DefaultObject.pWebsite + "'");
            pUpdateClause += " , Phones = " + (DefaultObject.pPhones == "" ? " NULL " : "N'" + DefaultObject.pPhones + "'");
            pUpdateClause += " , Faxes = " + (DefaultObject.pFaxes == "" ? " NULL " : "N'" + DefaultObject.pFaxes + "'");

            pUpdateClause += " , BankName = " + (DefaultObject.pBankName == "" ? " NULL " : "N'" + DefaultObject.pBankName + "'");
            pUpdateClause += " , AccountName = " + (DefaultObject.pAccountName == "" ? " NULL " : "N'" + DefaultObject.pAccountName + "'");
            pUpdateClause += " , BankAddress = " + (DefaultObject.pBankAddress == "" ? " NULL " : "N'" + DefaultObject.pBankAddress + "'");
            pUpdateClause += " , SwiftCode = " + (DefaultObject.pSwiftCode == "" ? " NULL " : "N'" + DefaultObject.pSwiftCode + "'");
            pUpdateClause += " , AccountNumber = " + (DefaultObject.pAccountNumber == "" ? " NULL " : "N'" + DefaultObject.pAccountNumber + "'");
            pUpdateClause += " , TaxNumber = " + (DefaultObject.pTaxNumber == "" ? " NULL " : "N'" + DefaultObject.pTaxNumber + "'");
            pUpdateClause += " , CommericalRegNo = " + (DefaultObject.pCommericalRegNo == "" ? " NULL " : "N'" + DefaultObject.pCommericalRegNo + "'");
            pUpdateClause += " , VatIDNo = " + (DefaultObject.pVatIDNo == "" ? " NULL " : "N'" + DefaultObject.pVatIDNo + "'");

            pUpdateClause += " , InvoiceLeftPosition = " + (DefaultObject.pInvoiceLeftPosition == "0" ? " NULL " : "N'" + DefaultObject.pInvoiceLeftPosition + "'");
            pUpdateClause += " , InvoiceLeftSignature = " + (DefaultObject.pInvoiceLeftSignature == "0" ? " NULL " : "N'" + DefaultObject.pInvoiceLeftSignature + "'");
            pUpdateClause += " , InvoiceMiddlePosition = " + (DefaultObject.pInvoiceMiddlePosition == "0" ? " N'' " : "N'" + DefaultObject.pInvoiceMiddlePosition + "'");
            pUpdateClause += " , InvoiceMiddleSignature = " + (DefaultObject.pInvoiceMiddleSignature == "0" ? " N'' " : "N'" + DefaultObject.pInvoiceMiddleSignature + "'");
            pUpdateClause += " , InvoiceRightPosition = " + (DefaultObject.pInvoiceRightPosition == "0" ? " N'' " : "N'" + DefaultObject.pInvoiceRightPosition + "'");
            pUpdateClause += " , InvoiceRightSignature = " + (DefaultObject.pInvoiceRightSignature == "0" ? " N'' " : "N'" + DefaultObject.pInvoiceRightSignature + "'");

            pUpdateClause += " , ImportOceanDays = " + DefaultObject.pImportOceanDays.ToString();
            pUpdateClause += " , ImportAirDays   = " + DefaultObject.pImportAirDays.ToString();
            pUpdateClause += " , ImportInlandDays   = " + DefaultObject.pImportInlandDays.ToString();
            pUpdateClause += " , ExportOceanDays = " + DefaultObject.pExportOceanDays.ToString();
            pUpdateClause += " , ExportAirDays   = " + DefaultObject.pExportAirDays.ToString();
            pUpdateClause += " , ExportInlandDays   = " + DefaultObject.pExportInlandDays.ToString();
            pUpdateClause += " , DomesticOceanDays = " + DefaultObject.pDomesticOceanDays.ToString();
            pUpdateClause += " , DomesticAirDays   = " + DefaultObject.pDomesticAirDays.ToString();
            pUpdateClause += " , DomesticInlandDays   = " + DefaultObject.pDomesticInlandDays.ToString();

            pUpdateClause += " , SmallBusinessBelow   = " + DefaultObject.pSmallBusinessBelow.ToString();
            pUpdateClause += " , MediumBusinessBelow   = " + DefaultObject.pMediumBusinessBelow.ToString();
            //pUpdateClause += " , IsDepartmentOption = " + objCDefaults_temp.lstCVarDefaults[0].UnEditableCompanyName;

            if (DefaultObject.pEmail_Password == "0" || DefaultObject.pEmail_Password == "" || DefaultObject.pEmail_Password == null)
            {
                pUpdateClause += " , Email_Password = " + ((_DefaultEmailPassword == "0" || _DefaultEmailPassword == "" || _DefaultEmailPassword == null) ? " N'' " : "N'" + _DefaultEmailPassword + "'");
            }
            else
            {
                pUpdateClause += " , Email_Password = " + ((DefaultObject.pEmail_Password == "0" || DefaultObject.pEmail_Password == "" || DefaultObject.pEmail_Password == null) ? " N'' " : "N'" + CEncryptDecrypt.Encrypt(DefaultObject.pEmail_Password, true) + "'");
            }






            pUpdateClause += " , Email_DisplayName = " + (DefaultObject.pEmail_DisplayName == "0" ? " N'' " : "N'" + DefaultObject.pEmail_DisplayName + "'");
            pUpdateClause += " , Email_Host = " + (DefaultObject.pEmail_Host == "0" ? " N'' " : "N'" + DefaultObject.pEmail_Host + "'");
            pUpdateClause += " , Email_Port = " + (DefaultObject.pEmail_Port == "0" ? " 0 " : "" + DefaultObject.pEmail_Port + "");
            pUpdateClause += " , Email_IsSSL = " + (DefaultObject.pEmail_IsSSL == "0" ? " 0 " : " " + DefaultObject.pEmail_IsSSL + " ");
            pUpdateClause += " , ShowUserSalesmen = " + (DefaultObject.pShowUserSalesmen == "0" ? " 0 " : " " + DefaultObject.pShowUserSalesmen + " ");
            pUpdateClause += " , IsAddChargeAuto = " + (DefaultObject.pIsAddChargeAuto ? "1" : "0");
            pUpdateClause += " , isShipp = " + (DefaultObject.pisShipp == "0" ? " 0 " : " " + DefaultObject.pisShipp + " ");

            pUpdateClause += " , Email_Header = " + (DefaultObject.pEmail_Header == "0" ? " N'' " : "N'" + DefaultObject.pEmail_Header + "'");
            pUpdateClause += " , Email_Footer = " + (DefaultObject.pEmail_Footer == "0" ? " N'' " : "N'" + DefaultObject.pEmail_Footer + "'");
            pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
            pUpdateClause += " , ModificationDate = GETDATE() ";
            pUpdateClause += " , IsNewCRMCycle = " + (DefaultObject.pIsNewCRMCycle == "0" ? " 0 " : " " + DefaultObject.pIsNewCRMCycle + " ");

            pUpdateClause += " WHERE ID = " + DefaultObject.pID.ToString();

            CDefaults objCDefaults = new CDefaults();
            Exception checkException = objCDefaults.UpdateList(pUpdateClause);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
            {
                //CCurrencies objCCurrencies = new CCurrencies();
                //pUpdateClause = "";
                //pUpdateClause += " CurrentExchangeRate = 1 ";
                //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                //pUpdateClause += " , ModificationDate = GETDATE() ";
                //pUpdateClause += " WHERE ID = " + pCurrencyID;
                //objCCurrencies.UpdateList(pUpdateClause);
                CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
                pUpdateClause = "";
                pUpdateClause += " ExchangeRate = 1 ";
                pUpdateClause += " , FromDate='19800101' ";
                pUpdateClause += " , ToDate='2099-12-31 23:59:59.000' ";
                pUpdateClause += " WHERE Currency_ID = " + DefaultObject.pCurrencyID;
                objCCurrencyDetails.UpdateList(pUpdateClause);
                _result = true;
            }
            return new Object[] {
                _result //data[0]

            };
        }
            [HttpPost, HttpGet]
        public object[] AutomaticEmail(int pDummyForAutomaticEmail)
        {
            var constCustomerPartnerTypeID = 1;
            var constAgentPartnerTypeID = 2;

            Exception checkException = null;
            int _RowCount = 0;
            int constAutoEmailHalfMonthly = 10;
            int constAutoEmailMonthly = 20;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            checkException = objCvwDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

            if (objCvwDefaults.lstCVarvwDefaults[0].IsDepartmentOption && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "GBL")
            {
                #region Customers Aging/InvoiceReport
                CCustomers objCCustomers = new CCustomers();
                // objCCustomers.lstCVarCustomers[0].
                CAutoEmailSentCustomer objCAutoEmailSentCustomer = new CAutoEmailSentCustomer();
                checkException = objCCustomers.GetListPaging(999999, 1, "WHERE Email<>'' AND Email IS NOT NULL " + " \n"
                    + "AND (" + " \n"
                    + "     EmailOptionAging IN (" + constAutoEmailHalfMonthly + "," + constAutoEmailMonthly + ")" + " \n"
                    + "     OR EmailOptionInvoicesReport IN (" + constAutoEmailHalfMonthly + "," + constAutoEmailMonthly + ")" + " \n"
                    + "     OR EmailOptionPartnerStatement IN (" + constAutoEmailHalfMonthly + "," + constAutoEmailMonthly + ")" + " \n"
                    + "     )"
                    , "ID", out _RowCount);
                for (int i = 0; i < objCCustomers.lstCVarCustomers.Count; i++)
                {
                    DateTime _CurrentDateTime = DateTime.Now;
                    int _CurrentYear = _CurrentDateTime.Year;
                    int _CurrentMonth = _CurrentDateTime.Month;
                    int _CurrentDay = _CurrentDateTime.Day;
                    int _YearClause = 0;
                    int _MonthClause = 0;
                    int _DayFromClause = 1;
                    int _DayToClause = 15;
                    string _DateFrom = "";
                    string _DateTo = "";
                    #region Monthly Getting Year & Month for WhereClause
                    if (objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailMonthly
                        || objCCustomers.lstCVarCustomers[i].EmailOptionInvoicesReport == constAutoEmailMonthly || objCCustomers.lstCVarCustomers[i].EmailOptionPartnerStatement == constAutoEmailMonthly)
                    {
                        if (_CurrentMonth == 1) //First month in the year
                        {
                            _YearClause = _CurrentYear - 1;
                            _MonthClause = 12;
                        }
                        else //Current Month is not January
                        {
                            _YearClause = _CurrentYear;
                            _MonthClause = _CurrentMonth - 1;
                        }
                        _DayFromClause = 1;
                        _DayToClause = DateTime.DaysInMonth(_YearClause, _MonthClause);
                    }
                    #endregion Monthly Getting Year & Month for WhereClause
                    #region Half-Monthly Getting Year & Month for WhereClause
                    else if (objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailHalfMonthly
                        || objCCustomers.lstCVarCustomers[i].EmailOptionInvoicesReport == constAutoEmailHalfMonthly
                        || objCCustomers.lstCVarCustomers[i].EmailOptionPartnerStatement == constAutoEmailHalfMonthly)
                    {
                        if (_CurrentMonth == 1 && _CurrentDay <= 15)
                        {
                            _YearClause = _CurrentYear - 1;
                            _MonthClause = 12;
                            _DayFromClause = 16;
                            _DayToClause = DateTime.DaysInMonth(_YearClause, _MonthClause);
                        }
                        else //Not January
                        {
                            _YearClause = _CurrentYear;
                            if (_CurrentDay <= 15)
                            {
                                _MonthClause = _CurrentMonth - 1;
                                _DayFromClause = 16;
                                _DayToClause = DateTime.DaysInMonth(_YearClause, _MonthClause);
                            }
                            else if (_CurrentDay > 15)
                            {
                                _MonthClause = _CurrentMonth;
                                _DayFromClause = 1;
                                _DayToClause = 15;
                            }
                        }
                    } //HalfMonthly
                    #endregion Half-Monthly Getting Year & Month for WhereClause

                    _DateFrom = _DayFromClause.ToString().PadLeft(2, '0') + "/" + _MonthClause.ToString().PadLeft(2, '0') + "/" + _YearClause;
                    _DateTo = _DayToClause.ToString().PadLeft(2, '0') + "/" + _MonthClause.ToString().PadLeft(2, '0') + "/" + _YearClause;


                    var _DateFromMMDDYYYY = _MonthClause.ToString().PadLeft(2, '0') + "/" + _DayFromClause.ToString().PadLeft(2, '0') + "/" + _YearClause;
                    var _DateToMMDDYYYY = _MonthClause.ToString().PadLeft(2, '0') + "/" + _DayToClause.ToString().PadLeft(2, '0') + "/" + _YearClause;

                    #region Check and Send for Aging
                    {
                        #region Building the _WhereClause to check if already sent
                        string _WhereClause = "WHERE CustomerID=" + objCCustomers.lstCVarCustomers[i].ID + " \n";
                        _WhereClause += "AND EmailType=N'Aging'" + " \n";
                        _WhereClause += "AND SentYear=" + _YearClause + " \n";
                        _WhereClause += "AND SentMonth=" + _MonthClause + " \n";
                        if (objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailHalfMonthly && _CurrentDay <= 15)
                            _WhereClause += "AND IsSecondHalf=1" + " \n"; //if _CurrentDay <= 15 then check the second half of the previous month
                        else if (objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailHalfMonthly && _CurrentDay > 15)
                            _WhereClause += "AND IsFirstHalf=1" + " \n";
                        #endregion Building the _WhereClause to check if already sent
                        #region Send Email if needed
                        checkException = objCAutoEmailSentCustomer.GetListPaging(999999, 1, _WhereClause, "ID", out _RowCount);
                        if (objCAutoEmailSentCustomer.lstCVarAutoEmailSentCustomer.Count == 0
                            && objCvwDefaults.lstCVarvwDefaults[0].Email != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_Password != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_Password != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_Host != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_Host != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_Port != 0)
                        {
                            #region Preparing the URL
                            string arr_Values =
                                _DateFrom
                                + "," + _DateTo
                                + ",01/01/2000" //txtFromDueDate
                                + ",01/01/2100" //txtToDueDate
                                + "," + constCustomerPartnerTypeID //slPartnerType
                                + "," + objCCustomers.lstCVarCustomers[i].ID //slPartner
                                + ",true" //cbAging
                            ;
                            var _hyperlink = "<a href='" + HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + "/GlobalReports/ViewInvoiceReport?&pTitle=Aging Report&arr_Values=" + arr_Values + "&pReportName=Aging Report'>" + "Aging Report [ " + objCCustomers.lstCVarCustomers[i].Name + "] From " + _DateFrom + " To " + _DateTo + "</a>";

                            #endregion Preparing the URL
                            #region Send the email
                            string _MailMessageReturned = "";
                            _MailMessageReturned = Static_SendAutoEmailWithHyperink(objCvwDefaults.lstCVarvwDefaults[0].Email, objCCustomers.lstCVarCustomers[i].Email
                                , objCvwDefaults.lstCVarvwDefaults[0].Email_Host, objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName
                                , "Periodical Aging Report", _hyperlink, objCvwDefaults.lstCVarvwDefaults[0].Email_Password
                                , objCvwDefaults.lstCVarvwDefaults[0].Email_Port, objCvwDefaults.lstCVarvwDefaults[0].Email_IsSSL, objCvwDefaults.lstCVarvwDefaults[0].Email_Footer);
                            #endregion Send the email
                            #region Insert into AutoEmailSentCustomer
                            if (_MailMessageReturned == "")
                            {
                                CVarAutoEmailSentCustomer objCVarAutoEmailSentCustomer = new CVarAutoEmailSentCustomer();
                                objCVarAutoEmailSentCustomer.CustomerID = objCCustomers.lstCVarCustomers[i].ID;
                                objCVarAutoEmailSentCustomer.EmailType = "Aging";
                                objCVarAutoEmailSentCustomer.SentYear = _YearClause;
                                objCVarAutoEmailSentCustomer.SentMonth = _MonthClause;
                                objCVarAutoEmailSentCustomer.IsFirstHalf = objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailHalfMonthly && _CurrentDay > 15 ? true : false;
                                objCVarAutoEmailSentCustomer.IsSecondHalf = objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailHalfMonthly && _CurrentDay <= 15 ? true : false;
                                objCVarAutoEmailSentCustomer.CreationDate = DateTime.Now;
                                objCAutoEmailSentCustomer.lstCVarAutoEmailSentCustomer.Add(objCVarAutoEmailSentCustomer);
                                checkException = objCAutoEmailSentCustomer.SaveMethod(objCAutoEmailSentCustomer.lstCVarAutoEmailSentCustomer);
                            }
                            #endregion Insert into AutoEmailSentCustomer
                        }
                        #endregion Send Email if needed
                    }
                    #endregion Check and Send for Aging

                    #region Check and Send for InvoiceReport
                    {
                        #region Building the _WhereClause to check if already sent
                        string _WhereClause = "WHERE CustomerID=" + objCCustomers.lstCVarCustomers[i].ID + " \n";
                        _WhereClause += "AND EmailType=N'InvoiceReport'" + " \n";
                        _WhereClause += "AND SentYear=" + _YearClause + " \n";
                        _WhereClause += "AND SentMonth=" + _MonthClause + " \n";
                        if (objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailHalfMonthly && _CurrentDay <= 15)
                            _WhereClause += "AND IsSecondHalf=1" + " \n"; //if _CurrentDay <= 15 then check the second half of the previous month
                        else if (objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailHalfMonthly && _CurrentDay > 15)
                            _WhereClause += "AND IsFirstHalf=1" + " \n";
                        #endregion Building the _WhereClause to check if already sent
                        #region Send Email if needed
                        checkException = objCAutoEmailSentCustomer.GetListPaging(999999, 1, _WhereClause, "ID", out _RowCount);
                        if (objCAutoEmailSentCustomer.lstCVarAutoEmailSentCustomer.Count == 0
                            && objCvwDefaults.lstCVarvwDefaults[0].Email != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_Password != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_Password != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_Host != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_Host != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_Port != 0)
                        {
                            #region Preparing the URL
                            string arr_Values =
                                _DateFrom
                                + "," + _DateTo
                                + ",01/01/2000" //txtFromDueDate
                                + ",01/01/2100" //txtToDueDate
                                + "," + constCustomerPartnerTypeID //slPartnerType
                                + "," + objCCustomers.lstCVarCustomers[i].ID //slPartner
                                + ",false" //cbAging
                            ;
                            var _hyperlink = "<a href='" + HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + "/GlobalReports/ViewInvoiceReport?&pTitle=Invoices Report&arr_Values=" + arr_Values + "&pReportName=Aging Report'>" + "Invoices Report [" + objCCustomers.lstCVarCustomers[i].Name + "] From " + _DateFrom + " To " + _DateTo + "</a>";
                            #endregion Preparing the URL
                            #region Send the email
                            string _MailMessageReturned = "";
                            _MailMessageReturned = Static_SendAutoEmailWithHyperink(objCvwDefaults.lstCVarvwDefaults[0].Email, objCCustomers.lstCVarCustomers[i].Email
                                , objCvwDefaults.lstCVarvwDefaults[0].Email_Host, objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName
                                , "Periodical Invoices Report", _hyperlink, objCvwDefaults.lstCVarvwDefaults[0].Email_Password
                                , objCvwDefaults.lstCVarvwDefaults[0].Email_Port, objCvwDefaults.lstCVarvwDefaults[0].Email_IsSSL, objCvwDefaults.lstCVarvwDefaults[0].Email_Footer);
                            #endregion Send the email
                            #region Insert into AutoEmailSentCustomer
                            if (_MailMessageReturned == "")
                            {
                                CVarAutoEmailSentCustomer objCVarAutoEmailSentCustomer = new CVarAutoEmailSentCustomer();
                                objCVarAutoEmailSentCustomer.CustomerID = objCCustomers.lstCVarCustomers[i].ID;
                                objCVarAutoEmailSentCustomer.EmailType = "InvoiceReport";
                                objCVarAutoEmailSentCustomer.SentYear = _YearClause;
                                objCVarAutoEmailSentCustomer.SentMonth = _MonthClause;
                                objCVarAutoEmailSentCustomer.IsFirstHalf = objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailHalfMonthly && _CurrentDay > 15 ? true : false;
                                objCVarAutoEmailSentCustomer.IsSecondHalf = objCCustomers.lstCVarCustomers[i].EmailOptionAging == constAutoEmailHalfMonthly && _CurrentDay <= 15 ? true : false;
                                objCVarAutoEmailSentCustomer.CreationDate = DateTime.Now;
                                objCAutoEmailSentCustomer.lstCVarAutoEmailSentCustomer.Add(objCVarAutoEmailSentCustomer);
                                checkException = objCAutoEmailSentCustomer.SaveMethod(objCAutoEmailSentCustomer.lstCVarAutoEmailSentCustomer);
                            }
                            #endregion Insert into AutoEmailSentCustomer
                        }
                        #endregion Send Email if needed
                    }
                    #endregion Check and Send for InvoiceReport

                    #region Check and Send for CustomerStatement
                    {
                        #region Building the _WhereClause to check if already sent
                        string _WhereClause = "WHERE CustomerID=" + objCCustomers.lstCVarCustomers[i].ID + " \n";
                        _WhereClause += "AND EmailType=N'CustomerStatementEG'" + " \n";
                        _WhereClause += "AND SentYear=" + _YearClause + " \n";
                        _WhereClause += "AND SentMonth=" + _MonthClause + " \n";
                        if (objCCustomers.lstCVarCustomers[i].EmailOptionPartnerStatement == constAutoEmailHalfMonthly && _CurrentDay <= 15)
                            _WhereClause += "AND IsSecondHalf=1" + " \n"; //if _CurrentDay <= 15 then check the second half of the previous month
                        else if (objCCustomers.lstCVarCustomers[i].EmailOptionPartnerStatement == constAutoEmailHalfMonthly && _CurrentDay > 15)
                            _WhereClause += "AND IsFirstHalf=1" + " \n";
                        #endregion Building the _WhereClause to check if already sent
                        #region Send Email if needed
                        checkException = objCAutoEmailSentCustomer.GetListPaging(999999, 1, _WhereClause, "ID", out _RowCount);
                        if (objCAutoEmailSentCustomer.lstCVarAutoEmailSentCustomer.Count == 0
                            && objCvwDefaults.lstCVarvwDefaults[0].Email != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_Password != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_Password != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_Host != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_Host != ""
                            && objCvwDefaults.lstCVarvwDefaults[0].Email_Port != 0)
                        {
                            #region Preparing the URL

                            // Get Avaliable Currencies
                            CvwA_JVDetails cvwA_JVDetails = new CvwA_JVDetails();
                            cvwA_JVDetails.GetList("where isnull( SubAccount_ID , 0 )= " + objCCustomers.lstCVarCustomers[i].SubAccountID + " AND ( SELECT TOP(1) aj.ID FROM A_JV AS aj WHERE JV_ID = aj.ID AND aj.JVDate BETWEEN \'" + _DateFromMMDDYYYY + "\' and \'" + _DateToMMDDYYYY + "\') IS NOT null");
                            if (cvwA_JVDetails.lstCVarvwA_JVDetails != null && cvwA_JVDetails.lstCVarvwA_JVDetails.Count > 0)
                            {


                                var DistinctDetails = cvwA_JVDetails.lstCVarvwA_JVDetails.DistinctBy(x => x.CurrencyCode).ToList();

                                var arr_ValuesGroup = new List<string>();
                                string _hyperlinks = "";
                                for (int j = 0; j < DistinctDetails.Count; j++)
                                {
                                    string arr_Values =
                                           _DateFrom
                                   + "," + _DateTo
                                   + "," + "\"IST\""
                                   + "," + DistinctDetails[j].Currency_ID
                                   + "," + DistinctDetails[j].CurrencyCode
                                   + "," + "4"
                                   + "," + "\"CLIENTS\""
                                   + "," + objCCustomers.lstCVarCustomers[i].SubAccountID
                                   + ",\"" + objCCustomers.lstCVarCustomers[i].Name + "\""
                                   + "," + "true"
                                   + "," + "false"
                                   + "," + "false"
                                   + "," + "true"
                                   + "," + "false";
                                    _hyperlinks += " <div><a href='" + HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + "/GlobalReports/ViewOperAccountStatement?&pTitle=Invoices Report&arr_Values=" + arr_Values + "&pReportName=SubAccount Ledger Report'>" + "Account Statement " + DistinctDetails[j].CurrencyCode + "-" + objCCustomers.lstCVarCustomers[i].Name + " From " + _DateFrom + " To " + _DateTo + "</a></div></br> ";
                                }

                                #endregion Preparing the URL
                                #region Send the email
                                string _MailMessageReturned = "";
                                _MailMessageReturned = Static_SendAutoEmailWithHyperink(objCvwDefaults.lstCVarvwDefaults[0].Email, objCCustomers.lstCVarCustomers[i].Email
                                    , objCvwDefaults.lstCVarvwDefaults[0].Email_Host, objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName
                                    , "Account Statement Report", _hyperlinks, objCvwDefaults.lstCVarvwDefaults[0].Email_Password
                                    , objCvwDefaults.lstCVarvwDefaults[0].Email_Port, objCvwDefaults.lstCVarvwDefaults[0].Email_IsSSL, objCvwDefaults.lstCVarvwDefaults[0].Email_Footer);
                                #endregion Send the email
                                #region Insert into AutoEmailSentCustomer
                                if (_MailMessageReturned == "")
                                {
                                    CVarAutoEmailSentCustomer objCVarAutoEmailSentCustomer = new CVarAutoEmailSentCustomer();
                                    objCVarAutoEmailSentCustomer.CustomerID = objCCustomers.lstCVarCustomers[i].ID;
                                    objCVarAutoEmailSentCustomer.EmailType = "CustomerStatementEG";
                                    objCVarAutoEmailSentCustomer.SentYear = _YearClause;
                                    objCVarAutoEmailSentCustomer.SentMonth = _MonthClause;
                                    objCVarAutoEmailSentCustomer.IsFirstHalf = objCCustomers.lstCVarCustomers[i].EmailOptionPartnerStatement == constAutoEmailHalfMonthly && _CurrentDay > 15 ? true : false;
                                    objCVarAutoEmailSentCustomer.IsSecondHalf = objCCustomers.lstCVarCustomers[i].EmailOptionPartnerStatement == constAutoEmailHalfMonthly && _CurrentDay <= 15 ? true : false;
                                    objCVarAutoEmailSentCustomer.CreationDate = DateTime.Now;
                                    objCAutoEmailSentCustomer.lstCVarAutoEmailSentCustomer.Add(objCVarAutoEmailSentCustomer);
                                    checkException = objCAutoEmailSentCustomer.SaveMethod(objCAutoEmailSentCustomer.lstCVarAutoEmailSentCustomer);
                                }
                                #endregion Insert into AutoEmailSentCustomer
                            }


                        }
                        #endregion Send Email if needed
                    }
                    #endregion Check and Send for CustomerStatement





                }
                #endregion Customers Aging/InvoiceReport
            } //if (objCDefaults.lstCVarDefaults[0].IsDepartmentOption)


            #region CRM Alarm User And Manager
            CCRM_privilege objCCRM_privilege = new CCRM_privilege();
            objCCRM_privilege.GetList(" Where ID = 40");
            //CEmail objCEmail = new CEmail();
            //CEmailReceiver objCEmailReceiver = new CEmailReceiver();
            CvwCRMAlartFollowUp objCvwCRMAlartFollowUp = new CvwCRMAlartFollowUp();
            //objCvwCRMAlartFollowUp.GetList(" Where 1=1 AND (ManagerAlarmed <> 1 AND UserAlarmed <> 1)");
            objCvwCRMAlartFollowUp.GetList(" Where 1=1");
            for (int j = 0; j < objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp.Count; j++)
            {
                string AlarmName = objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].Alarm;
                //if (AlarmName == "alartUser" && objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].UserAlarmed == 0)
                if (objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].SalesRep == WebSecurity.CurrentUserId && objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].DifferenceDays <= objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].AlarmDays && objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].UserAlarmed == 0)
                {
                    CVarEmail objCVarEmail = new CVarEmail();
                    CEmail objCEmail = new CEmail();
                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                    objCVarEmail.Subject = " CRM Follow Up" + " Action: '" + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ActionName + " \n"
                        + "Sales Lead: " + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].CRM_ClientName + " \n"
                        + "Action Date: " + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ActionDate.ToShortDateString() + " \n";

                    objCVarEmail.Body = "Action: '" + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ActionName + " \n"
                        + "Sales Lead: " + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].CRM_ClientName + " \n"
                        + "Action Date: " + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ActionDate.ToShortDateString() + " \n";
                    objCVarEmail.QuotationRouteID = 0;
                    objCVarEmail.SenderUserID = objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].SalesRep;
                    objCVarEmail.SendingDate = DateTime.Now;
                    objCEmail.lstCVarEmail.Add(objCVarEmail);
                    Exception checkException_temp = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                    if (checkException_temp == null) //add to EmailReceivers
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].SalesRep;
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                        checkException_temp = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        if (checkException_temp == null)
                        {
                            CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
                            objCCRM_FollowUp.UpdateList("UserAlarmed=1 WHERE ID=" + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ID);
                        }
                    }

                }
                else if (objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].DifferenceDays <= 0 && objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ManagerAlarmed == 0 && objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].UserAlarmed == 1)
                {
                    var Managers = objCCRM_privilege.lstCVarCRM_privilege[0].UsersIDs.Split(',');
                    {
                        CVarEmail objCVarEmail = new CVarEmail();
                        CEmail objCEmail = new CEmail();
                        CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                        objCVarEmail.Subject = " CRM Follow Up Alarm With Actions" + " Action: '" + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ActionName + " Has Statue :(" + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].NextActionStatueName + ") \n"
                            + "Sales Lead: " + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].CRM_ClientName + " \n"
                            + "Action Date: " + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ActionDate.ToShortDateString() + " \n";
                        objCVarEmail.Body = "Action: '" + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ActionName + " Has Statue :(" + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].NextActionStatueName + ") \n"
                            + "Sales Lead: " + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].CRM_ClientName + " \n"
                            + "Action Date: " + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ActionDate.ToShortDateString() + " \n";
                        objCVarEmail.QuotationRouteID = 0;
                        objCVarEmail.SenderUserID = objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].SalesRep;
                        objCVarEmail.SendingDate = DateTime.Now;
                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                        Exception checkException_temp = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                        if (checkException_temp == null) //add to EmailReceivers
                        {
                            for (int cnt = 0; cnt < Managers.Length; cnt++)
                            {
                                CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(Managers[cnt]);//objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].SalesRep;
                                objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                objCVarEmailReceiver.IsAlarm = true;

                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                checkException_temp = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                                if (checkException_temp == null)
                                {
                                    CCRM_FollowUp objCCRM_FollowUp = new CCRM_FollowUp();
                                    objCCRM_FollowUp.UpdateList("ManagerAlarmed=1 WHERE ID=" + objCvwCRMAlartFollowUp.lstCVarvwCRMAlartFollowUp[j].ID);
                                }
                            }
                        }

                    }
                }
            }
            #endregion

            #region CRM Setub inactive saleslead
            int pNoDays = 0;
            CCRM_SetupInvalidSalesLeadMonths objCRM_SetupInvalidSalesLeadMonths = new CCRM_SetupInvalidSalesLeadMonths();
            objCRM_SetupInvalidSalesLeadMonths.GetList(" Where ID = (select MAX(ID) from CRM_SetupInvalidSalesLeadMonths )");
            if (objCRM_SetupInvalidSalesLeadMonths.lstCVarCRM_SetupInvalidSalesLeadMonths.Count > 0)
                pNoDays = objCRM_SetupInvalidSalesLeadMonths.lstCVarCRM_SetupInvalidSalesLeadMonths[0].NumOfMonths * 30;
            CvwSetubSalesLead objCvwSetubSalesLead = new CvwSetubSalesLead();
            objCvwSetubSalesLead.GetList(" Where 1=1");

            for (int i = 0; i < objCvwSetubSalesLead.lstCVarvwSetubSalesLead.Count; i++)
            {

                if (objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].DaysToLastAction > pNoDays)
                {
                    objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].Valid = 0;
                    objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].DaysDiff = objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].DaysToLastAction - pNoDays;
                }
            }

            CCRM_SetubSalesLead objCCRM_SetubSalesLead = new CCRM_SetubSalesLead();
            #region Insert CRM_SetubSalesLead
            //if (pID == 0)
            {
                for (int i = 0; i < objCvwSetubSalesLead.lstCVarvwSetubSalesLead.Count; i++)
                {
                    CVarCRM_SetubSalesLead objCVarCRM_SetubSalesLead = new CVarCRM_SetubSalesLead();
                    if (objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].Valid == 0)
                    {
                        objCVarCRM_SetubSalesLead.ID = 0;
                        objCVarCRM_SetubSalesLead.ClientID = objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].ClientID;
                        objCVarCRM_SetubSalesLead.ClientName = objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].ClientName;
                        objCVarCRM_SetubSalesLead.Code = objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].Code.ToString();
                        objCVarCRM_SetubSalesLead.LastActionDate = objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].LastActionDate;
                        objCVarCRM_SetubSalesLead.ACTION = objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].ACTION;
                        objCVarCRM_SetubSalesLead.DaysToLastAction = decimal.Parse(objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].DaysToLastAction.ToString());
                        objCVarCRM_SetubSalesLead.DaysDiff = decimal.Parse(objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].DaysDiff.ToString());
                        objCVarCRM_SetubSalesLead.InValid = ((objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].Valid) == 0 ? true : false);
                        objCVarCRM_SetubSalesLead.NoDays = pNoDays;// int.Parse(objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].NoDays);
                        objCVarCRM_SetubSalesLead.CreatorUserID = objCVarCRM_SetubSalesLead.ModificationUserID = WebSecurity.CurrentUserId;
                        objCVarCRM_SetubSalesLead.CreationDate = objCVarCRM_SetubSalesLead.ModificationDate = DateTime.Now;
                        objCCRM_SetubSalesLead.lstCVarCRM_SetubSalesLead.Add(objCVarCRM_SetubSalesLead);
                        if (objCVarCRM_SetubSalesLead.InValid == true)
                        {
                            CCRM_Clients CCRM_ClientsSetub = new CCRM_Clients();

                            string _UpdateClauseSetub = " ClientStatus=30 WHERE ID=" + objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].ClientID + "";
                            checkException = CCRM_ClientsSetub.UpdateList(_UpdateClauseSetub);
                        }

                    }
                    else
                    {
                        CCRM_Clients CCRM_ClientsSetub = new CCRM_Clients();

                        string _UpdateClauseSetub = " ClientStatus=20 WHERE ID=" + objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].ClientID + "";
                        checkException = CCRM_ClientsSetub.UpdateList(_UpdateClauseSetub);
                    }

                }

                checkException = objCCRM_SetubSalesLead.SaveMethod(objCCRM_SetubSalesLead.lstCVarCRM_SetubSalesLead);
            }
            #endregion Insert CRM_SetubSalesLead
            #endregion

            return new object[] { };
        }

        //private void sendEmailViaWebApi()
        //{
        //    string subject = "Email Subject";
        //    string body = "Email body";
        //    string FromMail = "sherif@istegy.com";
        //    string emailTo = "sherif@istegy.com";
        //    MailMessage mail = new MailMessage();
        //    SmtpClient SmtpServer = new SmtpClient("mail.reckonbits.com.pk");
        //    mail.From = new MailAddress(FromMail);
        //    mail.To.Add(emailTo);
        //    mail.Subject = subject;
        //    mail.Body = body;
        //    SmtpServer.Port = 25;
        //    SmtpServer.Credentials = new System.Net.NetworkCredential("sherif@istegy.com", "123456");
        //    SmtpServer.EnableSsl = false;
        //    SmtpServer.Send(mail);
        //}
        //private void sendEmailViaWebApi()
        //{
        //    string subject = "Email Subject";
        //    string body = "Email body";
        //    string FromMail = "sherif@istegy.com";
        //    string emailTo = "sherif@istegy.com";
        //    MailMessage mail = new MailMessage();

        //    SmtpClient SmtpServer = new SmtpClient();
        //    SmtpServer.UseDefaultCredentials = true;

        //    mail.From = new MailAddress(FromMail);
        //    mail.To.Add(emailTo);
        //    mail.Subject = subject;
        //    mail.Body = body;
        //    SmtpServer.Port = 25;
        //    //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
        //    //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
        //    SmtpServer.Credentials = new System.Net.NetworkCredential("sherif@istegy.com", "123456");
        //    SmtpServer.EnableSsl = false;
        //    SmtpServer.Send(mail);
        //}

        //[HttpGet, HttpPost]
        //public object[] sendEmailViaWebApi()
        //{
        //    string subject = "Email Subject";
        //    string body = "Dear Sir, your cargo is at \n https://www.google.com/maps/?q=28.766621599999997,29.232078399999995" + " Latitude: 28.766621599999997 °, Longitude: 29.232078399999995 °</a>";
        //    string FromMail = "noreply-Rename@istegy.com";
        //    string emailTo = "sherifanwar@yahoo.com";
        //    string CC = "sherifanwar80@gmail.com";
        //    MailMessage mail = new MailMessage();

        //    SmtpClient SmtpServer = new SmtpClient();
        //    SmtpServer.UseDefaultCredentials = true;
        //    SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);

        //    mail.From = new MailAddress(FromMail);
        //    mail.To.Add(emailTo);
        //    mail.CC.Add(CC);
        //    mail.Subject = subject;
        //    mail.Body = body;
        //    mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
        //    SmtpServer.Port = 25;
        //    SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
        //    SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
        //    SmtpServer.Host = "smtpout.secureserver.net";
        //    SmtpServer.Credentials = new System.Net.NetworkCredential(FromMail, "123456");
        //    SmtpServer.EnableSsl = true;//false
        //    SmtpServer.Send(mail);

        //    return new object[] { };
        //}

        //[HttpGet, HttpPost]
        //public object[] sendEmailViaWebApi()
        //{
        //    string subject = "Email Subject";
        //    string body = "Dear Sir, your cargo is at \n https://www.google.com/maps/?q=28.766621599999997,29.232078399999995" + " Latitude: 28.766621599999997 °, Longitude: 29.232078399999995 °</a>";
        //    string FromMail = "noreply-Rename@istegy.com";
        //    string emailTo = "sherifanwar@yahoo.com";
        //    string CC = "sherifanwar80@gmail.com";
        //    MailMessage mail = new MailMessage();

        //    SmtpClient SmtpServer = new SmtpClient();
        //    SmtpServer.UseDefaultCredentials = true;
        //    //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);

        //    mail.From = new MailAddress(FromMail);
        //    mail.To.Add(emailTo);
        //    mail.CC.Add(CC);
        //    mail.Subject = subject;
        //    mail.Body = body;
        //    mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
        //    //SmtpServer.Port = 25;
        //    //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
        //    //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
        //    SmtpServer.Host = "smtpout.secureserver.net";
        //    SmtpServer.Credentials = new System.Net.NetworkCredential(FromMail, "N@123456");
        //    SmtpServer.EnableSsl = true;//false
        //    SmtpServer.Send(mail);

        //    return new object[] { };
        //}

        [HttpGet]
        public static string Static_SendAutoEmailWithHyperink(string pMailFrom, string pMailTo, string pEmail_Host, string pDisplayName, string pSubject
            , string pHyperlink, string pEmail_Password, Int32 pPort_Out, bool pMailTo_IsSSL, string pEmailFooter)
        {
            string _MailMessageReturned = "";
            bool _boolEmailFound = false;
            var mail = new MailMessage();
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            SmtpClient SmtpServer = new SmtpClient(pEmail_Host, pPort_Out);
            SmtpServer.UseDefaultCredentials = true;
            SmtpServer.Credentials = new System.Net.NetworkCredential(pMailFrom, CEncryptDecrypt.Decrypt(pEmail_Password, true));

            mail.From = new MailAddress(pMailFrom, pDisplayName);
            _boolEmailFound = true;
            mail.To.Add(pMailTo);
            //mail.CC.Add(CC);
            mail.Subject = pSubject;
            mail.Body = "Dear Sir/Ma'am, <br/><br/> &emsp; Good day,<br /><br />";
            mail.Body += " &emsp; Please, follow the link " + pHyperlink;
            mail.Body += "<br/><br/>Thanks and best regards ......... <br/> ";
            mail.Body += pEmailFooter;
            //"<a href='" + pUrl + "'>" + pEmail_Subject + "</a>"

            mail.IsBodyHtml = true;
            //mail.Attachments.Add(new Attachment(pathString));
            //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
            //SmtpServer.Port = 25;
            //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
            //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
            SmtpServer.EnableSsl = pMailTo_IsSSL;
            if (_boolEmailFound)
                try
                {
                    SmtpServer.Send(mail);
                }
                catch (Exception ex)
                {
                    _MailMessageReturned = ex.Message;
                }
            return _MailMessageReturned;
        }

        [HttpPost]
        public Object[] SendTestEmail([FromBody] TestEmailData Email)
        {
            // get Logged User Email to put it in CC
            CUsers objCLoggedUser = new CUsers();
            int dummy = 0;
            objCLoggedUser.GetListPaging(1, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out dummy);
            string LoggedUserEmail = objCLoggedUser.lstCVarUsers[0].Email;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out dummy);

            EmailAddressAttribute e = new EmailAddressAttribute();

            //JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
            string _MessageReturned = "";
            try
            {
				//if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "SUS")
				//{
				//    //Creating Email 
				//    var email = new Email();

				//    email.From(Email.pEmail_DisplayName, (Email.pEmail).ToLower());
				//    email.Subject(Email.pEmail_Subject);
				//    email.Body(Email.pEmail_Body, true);

				//    if (LoggedUserEmail != "" && e.IsValid(LoggedUserEmail))
				//    {
				//        email.CC(LoggedUserEmail.ToLower());
				//    }

				//    email.To(String.Empty, Email.pEmail_To);


				//    //email.Send(Email.pEmail_Host, Email.pEmail_Port, (Email.pEmail).ToLower(), CEncryptDecrypt.Decrypt(Email.pEmail_Password, true));
				//    email.Send(Email.pEmail_Host, Email.pEmail_Port, (Email.pEmail).ToLower(), Email.pEmail_Password);

				//    _MessageReturned = email._err ?? "";


				//} 
				//else
				//{


				// Old Way


				System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
				var mail = new System.Net.Mail.MailMessage();
				SmtpClient Client = new SmtpClient(Email.pEmail_Host, int.Parse(Email.pEmail_Port));
				Client.UseDefaultCredentials = true;
				if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                {
                    Client.Credentials = new System.Net.NetworkCredential("apikey", Email.pEmail_Password);
                    mail.CC.Add(new MailAddress("customersupport@elite-log.com"));
                    mail.CC.Add(new MailAddress("mostafa.hanafy@elite-log.com"));
                    mail.CC.Add(new MailAddress("kareem.hassan@elite-log.com"));
                    mail.CC.Add(new MailAddress("operations@elite-log.com"));
                }
                else
                {
                    Client.Credentials = new System.Net.NetworkCredential((Email.pEmail).ToLower(), Email.pEmail_Password);
                }
                    mail.From = new MailAddress((Email.pEmail).ToLower(), Email.pEmail_DisplayName);
                    mail.To.Add(new MailAddress(Email.pEmail_To));// put to address here



                if (/*(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "DYN" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "SUS"
                    || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MIJ" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "WFE") 
                    && */LoggedUserEmail != "" && LoggedUserEmail != "0" && e.IsValid(LoggedUserEmail))
                {
                    //mail.CC.Add(LoggedUserEmail);
                    mail.CC.Add(new MailAddress(LoggedUserEmail.ToLower()));

                }

                //Client.DeliveryMethod = SmtpDeliveryMethod.PickupDirectoryFromIis;
                //Client.Timeout = 60000;
                //Client.Port = 25;

                mail.Subject = Email.pEmail_Subject;        // put subject here  
                    mail.Body = Email.pEmail_Body;
                    mail.Body += (" <br> " + Email.pEmail_Footer);
                    mail.IsBodyHtml = true;
                    Client.EnableSsl = Email.pEmail_IsSSL; //config[0].Email_IsSSL == null || config[0].Email_IsSSL == false ? false : true;
                    Client.Send(mail);
                //}
                
            }
            catch (Exception ex)
            {
                _MessageReturned = ex.Message;
            }
            return new Object[] {
                _MessageReturned //data[0]
            };
        }

        [HttpPost]
        public Object[] SendPDFEmail([FromBody] PDFEmailData Email)
        {
            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
            string _MessageReturned = "";
            try
            {
                // 1 - pdf file @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                bool exists = Directory.Exists(HttpContext.Current.Server.MapPath("SysEmails"));
                if (!exists)
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("SysEmails"));

                var filename = Email.pEmail_ReportName + DateTime.Now.Ticks + ".pdf";
                string pathString = Path.Combine(HttpContext.Current.Server.MapPath("SysEmails"), filename);

                //-------------------------------------------------------------------------------------------------- Install-Package OpenHtmlToPdf -Version 1.12.0
                string htmlCode = Email.pHTML_ForPDF;
                htmlCode = htmlCode.Replace("\"/", "\"" + HttpContext.Current.Server.MapPath("~/"));
                string baseUrl = null;

                htmlCode = htmlCode.Replace("<head>", "<heade><meta http-equiv=\"Content-Type\" content=\"text/html;charset=UTF-8\">");
                htmlCode = htmlCode.Replace("<head>", "<heade><style> table { page-break-inside:auto } tr { page-break-inside:avoid; page-break-after:auto }</style>");

                byte[] content =
                Pdf.From(htmlCode)
               .OfSize(PaperSize.A4)
               .WithTitle(Email.pEmail_Subject)
               .WithoutOutline()
               .WithMargins(1.25.Centimeters())
               .Landscape()
               .Comressed()
               .Content();

                File.WriteAllBytes(pathString, content);

                var mail = new System.Net.Mail.MailMessage();

                mail.Attachments.Add(new Attachment(pathString));
                //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                SmtpClient Client = new SmtpClient(Email.pEmail_Host, int.Parse(Email.pEmail_Port));
                Client.UseDefaultCredentials = true;

                CDefaults objCDefaults = new CDefaults();
                objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _);
                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                {
                    Client.Credentials = new System.Net.NetworkCredential("apikey", Email.pEmail_Password);
                    mail.CC.Add(new MailAddress("customersupport@elite-log.com"));
                    mail.CC.Add(new MailAddress("mostafa.hanafy@elite-log.com"));
                    mail.CC.Add(new MailAddress("kareem.hassan@elite-log.com"));
                    mail.CC.Add(new MailAddress("operations@elite-log.com"));
                }
                else
                {
                    Client.Credentials = new System.Net.NetworkCredential(Email.pEmail, Email.pEmail_Password);
                }
                mail.From = new MailAddress(Email.pEmail, Email.pEmail_DisplayName);
                mail.To.Add(new MailAddress(Email.pEmail_To));// put to address here
                mail.Subject = Email.pEmail_Subject;  // put subject here  
                mail.Body = Email.pEmail_Body + " <br> " + Email.pEmail_Footer;
                mail.IsBodyHtml = true;
                Client.EnableSsl = Email.pEmail_IsSSL;
                Client.Send(mail);

                //if (File.Exists(pathString))
                //    File.Delete(pathString);
            }
            catch (Exception ex)
            {
                _MessageReturned = ex.Message;
            }
            return new Object[] {
                _MessageReturned
            };
        }


        [HttpPost]
        public Object[] SendEmailWithAttachment([FromBody] SendEmailWithAttachment pEmailData)
        {
            Exception checkException = null;
            string _MessageReturned = "";
            int _RowCount = 0;
            string pathString = "";
            var _ArrReceiverEmails = pEmailData.pEmail_To.Split(',');
            CvwUsers objCvwUsers = new CvwUsers();
            checkException = objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            CDefaults objCDefaults = new CDefaults();
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            //CDefaults objCDefaults = new CDefaults();
            //checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

            if (objCDefaults.lstCVarDefaults[0].Email == "0"
                || objCDefaults.lstCVarDefaults[0].Email_DisplayName == "0" || objCDefaults.lstCVarDefaults[0].Email_DisplayName == ""
                || objCDefaults.lstCVarDefaults[0].Email_Host == "0" || objCDefaults.lstCVarDefaults[0].Email_Host == ""
                || objCDefaults.lstCVarDefaults[0].Email_Port == 0)
                //if (objCvwUsers.lstCVarvwUsers[0].Email == "0" || objCvwUsers.lstCVarvwUsers[0].Email == ""
                //|| objCvwUsers.lstCVarvwUsers[0].Email_Password == "0" || objCvwUsers.lstCVarvwUsers[0].Email_Password == ""
                //|| objCvwUsers.lstCVarvwUsers[0].Email_DisplayName == "0" || objCvwUsers.lstCVarvwUsers[0].Email_DisplayName == ""
                //|| objCvwUsers.lstCVarvwUsers[0].Email_Host == "0" || objCvwUsers.lstCVarvwUsers[0].Email_Host == ""
                //|| objCvwUsers.lstCVarvwUsers[0].Email_Port == 0)
                _MessageReturned = "Please, review your company default email settings.";
            else
            {
                string pattern = "[\\~#%&*{}/:<>?|\"-]";
                string replacement = " ";
                Regex regEx = new Regex(pattern);
                pEmailData.pFileName = Regex.Replace(regEx.Replace(pEmailData.pFileName, replacement), @"\s+", " ");
                try
                {
                    pathString = HttpContext.Current.Server.MapPath("").Replace("Defaults", pEmailData.pMapPath);
                    pathString = System.IO.Path.Combine(pathString, pEmailData.pFileName);

                    var mail = new System.Net.Mail.MailMessage();
                    mail.Attachments.Add(new Attachment(pathString));
                    //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    SmtpClient Client = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    Client.UseDefaultCredentials = true;

                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                    {
                        Client.Credentials = new System.Net.NetworkCredential("apikey", CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                        mail.CC.Add(new MailAddress("customersupport@elite-log.com"));
                        mail.CC.Add(new MailAddress("mostafa.hanafy@elite-log.com"));
                        mail.CC.Add(new MailAddress("kareem.hassan@elite-log.com"));
                        mail.CC.Add(new MailAddress("operations@elite-log.com"));
                    }
                    else
                    {
                        Client.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                    }

                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    for (int i = 0; i < _ArrReceiverEmails.Length; i++)
                        mail.To.Add(new MailAddress(_ArrReceiverEmails[i]));// put to address here
                    mail.Subject = pEmailData.pEmail_Subject;  // put subject here  
                    mail.Body = "<b>Sender : " + objCvwUsers.lstCVarvwUsers[0].Email_DisplayName + "</b><br>" + pEmailData.pEmail_Body + " <br> " + objCDefaults.lstCVarDefaults[0].Email_Footer;
                    mail.IsBodyHtml = true;

                    Client.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    Client.Send(mail);
                }
                catch (Exception ex)
                {
                    _MessageReturned = ex.Message;
                }
                //if (File.Exists(pathString))
                //    File.Delete(pathString);
            }
            return new Object[] {
                _MessageReturned //data[0]
            };
        }

        //  SendPDFEmailWithBodyTemplate Is User
        [HttpPost]
        public Object[] SendPDFEmailWithBodyTemplate([FromBody] SendPDFEmail_GeneralData Email)
        {
            Exception checkException = null;
            int _RowCount = 0;
            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
            string _MessageReturned = "";
            string pathString = "";
            CUsers objCUsers = new CUsers();
            checkException = objCUsers.GetListPaging(999999, 1, "Where ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            CDefaults objCDefaults = new CDefaults();
            checkException = objCDefaults.GetListPaging(999999, 1, "Where 1=1", "ID", out _RowCount);

            var CurrentUser = objCUsers.lstCVarUsers[0];

            //if (CurrentUser.Email == "0" || CurrentUser.Email == ""
            //    || CurrentUser.Email_Password == "0" || CurrentUser.Email_Password == ""
            //    || CurrentUser.Email_DisplayName == "0" || CurrentUser.Email_DisplayName == ""
            //    || CurrentUser.Email_Host == "0" || CurrentUser.Email_Host == ""
            //    || CurrentUser.Email_Port == 0)
            if (objCDefaults.lstCVarDefaults[0].Email == "0" || objCDefaults.lstCVarDefaults[0].Email == ""
                || objCDefaults.lstCVarDefaults[0].Email_Password == "0" || objCDefaults.lstCVarDefaults[0].Email_Password == ""
                || objCDefaults.lstCVarDefaults[0].Email_DisplayName == "0" || objCDefaults.lstCVarDefaults[0].Email_DisplayName == ""
                || objCDefaults.lstCVarDefaults[0].Email_Host == "0" || objCDefaults.lstCVarDefaults[0].Email_Host == ""
                || objCDefaults.lstCVarDefaults[0].Email_Port == 0)
            {
                _MessageReturned = "Please, review your company default email settings.";
            }
            else
            {
                try
                {
                    string pattern = "[\\~#%&*{}/:<>?|\"-]";
                    string replacement = " ";
                    Regex regEx = new Regex(pattern);
                    Email.pEmail_ReportName = Regex.Replace(regEx.Replace(Email.pEmail_ReportName, replacement), @"\s+", " ");
                }
                catch
                {
                }
                // 1 - pdf file @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                try
                {
                    bool exists = Directory.Exists(HttpContext.Current.Server.MapPath("SysEmails"));
                    if (!exists)
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("SysEmails"));

                    var filename = Email.pEmail_ReportName + DateTime.Now.Ticks + ".pdf";
                    pathString = Path.Combine(HttpContext.Current.Server.MapPath("SysEmails"), filename);
                    //-------------------------------------------------------------------------------------------------- Install-Package OpenHtmlToPdf -Version 1.12.0
                    string htmlCode = Email.pHTML_ForPDF;
                    htmlCode = htmlCode.Replace("\"/", "\"" + HttpContext.Current.Server.MapPath("~/"));
                    string baseUrl = null;

                    htmlCode = htmlCode.Replace("<head>", "<heade><meta http-equiv=\"Content-Type\" content=\"text/html;charset=UTF-8\">");
                    htmlCode = htmlCode.Replace("<head>", "<heade><style> table { page-break-inside:auto } tr { page-break-inside:avoid; page-break-after:auto }</style>");

                    byte[] content =
                    Pdf.From(htmlCode)
                   .OfSize(PaperSize.A4)
                   .WithTitle(Email.pEmail_Subject)
                   .WithoutOutline()
                   .WithMargins(1.25.Centimeters())
                   .Landscape()
                   .Comressed()
                   .Content();

                    File.WriteAllBytes(pathString, content);

                    var mail = new System.Net.Mail.MailMessage();
                    mail.Attachments.Add(new Attachment(pathString));
                    //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    SmtpClient Client = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    Client.UseDefaultCredentials = true;
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                    {
                        Client.Credentials = new System.Net.NetworkCredential("apikey", CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                        mail.CC.Add(new MailAddress("customersupport@elite-log.com"));
                        mail.CC.Add(new MailAddress("mostafa.hanafy@elite-log.com"));
                        mail.CC.Add(new MailAddress("kareem.hassan@elite-log.com"));
                        mail.CC.Add(new MailAddress("operations@elite-log.com"));
                    }
                    else
                    {
                        Client.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                    }

                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    mail.To.Add(new MailAddress(Email.pEmail_To));// put to address here
                    mail.Subject = Email.pEmail_Subject;  // put subject here  
                    mail.Body = "<b>Sender : " + CurrentUser.Email_DisplayName + "</b><br>" + "Hello " + Email.pEmail_To + " !! <br/>";
                    mail.Body = mail.Body + "Please find attached file to this email of " + Email.pEmail_ReportName + " .... <br>";
                    mail.Body = mail.Body + "Best regards. <br> " + objCDefaults.lstCVarDefaults[0].Email_Footer;
                    mail.IsBodyHtml = true;

                    Client.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    Client.Send(mail);


                }
                catch (Exception ex)
                {
                    _MessageReturned = ex.Message;
                }
            }
            //if (File.Exists(pathString))
            //    File.Delete(pathString);

            return new Object[] {
                _MessageReturned //data[0]
            };
        }

        [HttpPost]
        public Object[] SendPDFEmail_General([FromBody] SendPDFEmail_GeneralData pEmailData)
        {
            Exception checkException = null;
            string _MessageReturned = "";
            int _RowCount = 0;
            string pathString = "";
            var _ArrReceiverEmails = pEmailData.pEmail_To.Split(',');
            CvwUsers objCvwUsers = new CvwUsers();
            checkException = objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            CDefaults objCDefaults = new CDefaults();
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            //CDefaults objCDefaults = new CDefaults();
            //checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            if (objCDefaults.lstCVarDefaults[0].Email == "0"
                || objCDefaults.lstCVarDefaults[0].Email_DisplayName == "0" || objCDefaults.lstCVarDefaults[0].Email_DisplayName == ""
                || objCDefaults.lstCVarDefaults[0].Email_Host == "0" || objCDefaults.lstCVarDefaults[0].Email_Host == ""
                || objCDefaults.lstCVarDefaults[0].Email_Port == 0)
                //if (objCvwUsers.lstCVarvwUsers[0].Email == "0" || objCvwUsers.lstCVarvwUsers[0].Email == ""
                //|| objCvwUsers.lstCVarvwUsers[0].Email_Password == "0" || objCvwUsers.lstCVarvwUsers[0].Email_Password == ""
                //|| objCvwUsers.lstCVarvwUsers[0].Email_DisplayName == "0" || objCvwUsers.lstCVarvwUsers[0].Email_DisplayName == ""
                //|| objCvwUsers.lstCVarvwUsers[0].Email_Host == "0" || objCvwUsers.lstCVarvwUsers[0].Email_Host == ""
                //|| objCvwUsers.lstCVarvwUsers[0].Email_Port == 0)
                _MessageReturned = "Please, review your company default email settings.";
            else
            {
                string pattern = "[\\~#%&*{}/:<>?|\"-]";
                string replacement = " ";
              
                try
                {
                    Regex regEx = new Regex(pattern);
                    pEmailData.pEmail_ReportName = Regex.Replace(regEx.Replace(pEmailData.pEmail_ReportName, replacement), @"\s+", " ");
                }
                catch (Exception ex)
                {
                   objCCustomizedDBCall.ExecuteQuery($"insert into PdfEmailpatLog (PdfName,Pdfpath,Exception,CreationDate) values (N'pattern',N'{pathString.Replace("'", "_")}',N'{ex.Message.Replace("'", "_")}',GetDate())");
                }
                
                var filename = "";
                try
                {
                    // 1 - pdf file @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    string pathException = "No Exception";
                    try
                    {
                        bool exists = Directory.Exists(HttpContext.Current.Server.MapPath("SysEmails"));
                        if (!exists)
                            Directory.CreateDirectory(HttpContext.Current.Server.MapPath("SysEmails"));

                        filename = pEmailData.pEmail_ReportName + DateTime.Now.Ticks + ".pdf";


                        pathString = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("SysEmails"), filename);

                    }
                    catch (Exception ex)
                    {
                        objCCustomizedDBCall.ExecuteQuery($"insert into PdfEmailpatLog (PdfName,Pdfpath,Exception,CreationDate) values (N'dir_{filename.Replace("'", "_")}',N'{pathString.Replace("'", "_")}',N'{ex.Message.Replace("'", "_")}',GetDate())");
                        pathException = ex.Message;
                    }






                    //string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                    //string insertQuery = "INSERT INTO PdfEmailpatLog (PdfName, Pdfpath, Exception,CreationDate) VALUES (@PdfName, @Pdfpath ,  @Exception,@CreationDate)";
                    //using (SqlConnection connection = new SqlConnection(connectionString))
                    //using (SqlCommand command = new SqlCommand(insertQuery, connection))
                    //{
                    //    command.Parameters.AddWithValue("@PdfName", filename);
                    //    command.Parameters.AddWithValue("@Pdfpath", pathString);
                    //    command.Parameters.AddWithValue("@Exception", pathException);
                    //    command.Parameters.AddWithValue("@CreationDate", DateTime.Now);

                    //    connection.Open();
                    //    command.ExecuteNonQuery();
                    //}

                    //-------------------------------------------------------------------------------------------------- Install-Package OpenHtmlToPdf -Version 1.12.0
                        string baseUrl = null;
                        byte[] content = null;

                    try
                    {
                        string htmlCode = pEmailData.pHTML_ForPDF;
                        htmlCode = htmlCode.Replace("\"/", "\"" + HttpContext.Current.Server.MapPath("~/"));

                        htmlCode = htmlCode.Replace("<head>", "<heade><meta http-equiv=\"Content-Type\" content=\"text/html;charset=UTF-8\">");
                        htmlCode = htmlCode.Replace("<head>", "<heade><style> table { page-break-inside:auto } tr { page-break-inside:avoid; page-break-after:auto }</style>");
                        
                        content =
                        Pdf.From(htmlCode)
                       .OfSize(PaperSize.A4)
                       .WithTitle(pEmailData.pEmail_Subject)
                       .WithoutOutline()
                       .WithMargins(1.25.Centimeters())
                       .Portrait()
                       .Comressed()
                       .Content();

                    }
                    catch (Exception ex)
                    {
                        objCCustomizedDBCall.ExecuteQuery($"insert into PdfEmailpatLog (PdfName,Pdfpath,Exception,CreationDate) values (N'Content',N'{pathString.Replace("'", "_")}',N'{ex}',GetDate())");
                      
                    }



                    try
                    {
                        using (var fileStream = new FileStream(pathString, FileMode.OpenOrCreate, FileAccess.ReadWrite))
                        {
                            fileStream.Write(content, 0, content.Length);
                        }
                    }
                    catch (Exception ex)
                    {

                        objCCustomizedDBCall.ExecuteQuery($"insert into PdfEmailpatLog (PdfName,Pdfpath,Exception,CreationDate) values (N'file_{filename.Replace("'", "_")}',N'{pathString.Replace("'", "_")}',N'{ex.Message.Replace("'", "_")}',GetDate())");
                        pathException = ex.Message;
                    }


                    var mail = new System.Net.Mail.MailMessage();

                    //try
                    //{
                    //    File.WriteAllBytes(pathString, content);

                    //}
                    //catch (Exception ex)
                    //{

                    //    objCCustomizedDBCall.ExecuteQuery($"insert into PdfEmailpatLog (PdfName,Pdfpath,Exception,CreationDate) values (N'WriteAllBytes_{filename.Replace("'", "_")}',N'{pathString.Replace("'", "_")}',N'{ex.Message.Replace("'", "_")}',GetDate())");
                    //    pathException = ex.Message;
                    //}
                    try
                    {
                        mail.Attachments.Add(new Attachment(pathString));
                    }
                    catch (Exception ex)
                    {
                        objCCustomizedDBCall.ExecuteQuery($"insert into PdfEmailpatLog (PdfName,Pdfpath,Exception,CreationDate) values (N'mailAttach_{filename.Replace("'", "_")}',N'{pathString.Replace("'", "_")}',N'{ex.Message.Replace("'", "_")}',GetDate())");

                    }


                    //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    SmtpClient Client = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    Client.UseDefaultCredentials = true;
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                    {
                        Client.Credentials = new System.Net.NetworkCredential("apikey", CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                        mail.CC.Add(new MailAddress("customersupport@elite-log.com"));
                        mail.CC.Add(new MailAddress("mostafa.hanafy@elite-log.com"));
                        mail.CC.Add(new MailAddress("kareem.hassan@elite-log.com"));
                        mail.CC.Add(new MailAddress("operations@elite-log.com"));
                    }
                    else
                    {
                        Client.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                    }

                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    for (int i = 0; i < _ArrReceiverEmails.Length; i++)
                        mail.To.Add(new MailAddress(_ArrReceiverEmails[i]));// put to address here


                    // get Logged User Email to put it in CC
                    CUsers objCLoggedUser = new CUsers();
                    int dummy = 0;
                    objCLoggedUser.GetListPaging(1, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out dummy);
                    string LoggedUserEmail = objCLoggedUser.lstCVarUsers[0].Email;

                    EmailAddressAttribute e = new EmailAddressAttribute();

                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "UNF")
                    {
                        mail.CC.Add("imp.docs@unifreight.com.eg");

                    }
                    else if (/*(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "DYN" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "SUS"
                        || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MIJ" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "WFE")
                        && */LoggedUserEmail != "" && e.IsValid(LoggedUserEmail))
                    {
                        //mail.CC.Add(objCDefaults.lstCVarDefaults[0].Email);

                        mail.CC.Add(new MailAddress(LoggedUserEmail));
                    }

                    string input = pEmailData.pEmail_Subject ?? "";
                    int start = input.IndexOf("(");
                    int end = input.IndexOf(")", start + 1);

                    string mbl = "";
                    if (start >= 0 && end > start)
                        mbl = input.Substring(start + 1, end - start - 1);
                    else
                        mbl = input; 

                    string Body = "Dear Sir/Madam,<br><br>"
          + "Good day to you.<br><br>"
          + "Please find attached the shipping documents for the below shipment:<br><br>"
          + "&#8226;&nbsp;"+ mbl + "<br>"
          + "&#8226;&nbsp; Attachment : " + pEmailData.pEmail_ReportName + "<br><br>"
          + "<br><br>"
          + "Kindly review the attached file(s) and let us know if you require any further assistance.<br><br>"
          + "Best regards,<br>"
          + objCDefaults.lstCVarDefaults[0].CompanyLocalName + "<br>"
          + "Operations Team";

                    mail.Subject = pEmailData.pEmail_Subject;  // put subject here  
                    mail.Body = "<b>Sender : " + objCvwUsers.lstCVarvwUsers[0].Email_DisplayName + "</b><br>" + Body;
                    mail.IsBodyHtml = true;

                    Client.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    Client.Send(mail);
                }
                catch (Exception ex)
                {
                    objCCustomizedDBCall.ExecuteQuery($"insert into PdfEmailpatLog (PdfName,Pdfpath,Exception,CreationDate) values (N'mailSend',N'{pathString.Replace("'", "_")}',N'{ex.Message.Replace("'", "_")}',GetDate())");

                    _MessageReturned = ex.Message;
                }
                //if (File.Exists(pathString))
                //    File.Delete(pathString);
            }
            return new Object[] {
                _MessageReturned //data[0]
            };
        }
        [HttpPost]
        public Object[] SendUrlEmail_General([FromBody] SendUrlEmail_GeneralData pEmailData)
        {
            Exception checkException = null;
            string _MessageReturned = "";
            int _RowCount = 0;
            string pathString = "";
            //CvwUsers objCvwUsers = new CvwUsers();
            CDefaults objCDefaults = new CDefaults();
            //checkException = objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

            if (objCDefaults.lstCVarDefaults[0].Email == "0"
                || objCDefaults.lstCVarDefaults[0].Email_DisplayName == "0" || objCDefaults.lstCVarDefaults[0].Email_DisplayName == ""
                || objCDefaults.lstCVarDefaults[0].Email_Host == "0" || objCDefaults.lstCVarDefaults[0].Email_Host == ""
                || objCDefaults.lstCVarDefaults[0].Email_Port == 0)
                _MessageReturned = "Please, review your company default email settings.";
            else
            {
                string pattern = "[\\~#%&*{}/:<>?|\"-]";
                string replacement = " ";
                Regex regEx = new Regex(pattern);
                pEmailData.pEmail_ReportName = Regex.Replace(regEx.Replace(pEmailData.pEmail_ReportName, replacement), @"\s+", " ");
                try
                {
                    var mail = new System.Net.Mail.MailMessage();
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    SmtpClient Client = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    Client.UseDefaultCredentials = true;
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                    {
                        Client.Credentials = new System.Net.NetworkCredential("apikey", CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                        mail.CC.Add(new MailAddress("customersupport@elite-log.com"));
                        mail.CC.Add(new MailAddress("mostafa.hanafy@elite-log.com"));
                        mail.CC.Add(new MailAddress("kareem.hassan@elite-log.com"));
                        mail.CC.Add(new MailAddress("operations@elite-log.com"));
                    }
                    else
                    {
                        Client.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                    }

                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    mail.To.Add(new MailAddress(pEmailData.pEmail_To));// put to address here
                    mail.Subject = pEmailData.pEmail_Subject;  // put subject here  


                    if (objCDefaults.lstCVarDefaults[0].Email_Footer != null && objCDefaults.lstCVarDefaults[0].Email_Footer != "")
                    {
                        mail.Body = pEmailData.pEmail_Body + " <br><br> " + objCDefaults.lstCVarDefaults[0].Email_Footer;
                    }
                    else
                    {
                        mail.Body = pEmailData.pEmail_Body + "<br><br>" + "Thanks & best regards.<br> ";
                    }


                    mail.IsBodyHtml = true;
                    Client.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    Client.Send(mail);
                }
                catch (Exception ex)
                {
                    _MessageReturned = ex.Message;
                }
                //if (File.Exists(pathString))
                //    File.Delete(pathString);
            }
            return new Object[] {
                _MessageReturned //data[0]
            };
        }

        private void ShipsGoChecking()
        {
            var absoluteUrl = HttpContext.Current.Request.Url.AbsoluteUri.ToLower();
            if (!absoluteUrl.Contains("forwardingarkbl") && !absoluteUrl.Contains("forwardingelite"))
            {
                return;
            }
            if (Monitor.TryEnter(_lockObject))
            {
                try
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string IsShipsGoTracked = objCCustomizedDBCall.CallStringFunction("select count(*) from ShipsGoSettings");
                    if (string.IsNullOrWhiteSpace(IsShipsGoTracked))
                    {
                        IsShipsGoTracked = "0";
                    }
                    if (int.Parse(IsShipsGoTracked) == 1) //Meaning Shipsgo tracking is enabled here
                    {

                        string IsShipmentTracked = objCCustomizedDBCall.CallStringFunction("select count(*) from ShipsGoBLs where Status not in ('Discharged','Untracked') and DATEADD(HOUR, 12, LastChecked)<GETDATE()");
                        if (string.IsNullOrWhiteSpace(IsShipmentTracked)) {
                            IsShipmentTracked = "0";
                        }
                        if (int.Parse(IsShipmentTracked) > 0) //There is shipments
                        {
                            var Shipment = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select top 1 * from ShipsGoBLs where Status not in ('Discharged','Untracked') and DATEADD(HOUR, 12, LastChecked)<GETDATE()", typeof(CVarShipsGoBLs)).Cast<CVarShipsGoBLs>().ToList();
                            
                            if (Shipment.Count == 1)
                            {
                                //string requestID = objCCustomizedDBCall.CallStringFunction($"Select RequestID from ShipsGoLog where OperationID={Shipment[0].OperationID} and LogFor='RequestID'");
                                string requestID = "1";

                                ShipsGoAPIController _ShipsGoAPIController = new ShipsGoAPIController();

                                Container trackedMBL;
                                if (long.TryParse(requestID, out long rID) && false) // False is intentional here (DON't REMOVE IT) (old work edited and may need it in future)
                                {
                                    trackedMBL = _ShipsGoAPIController.GetDataNew(requestID, Shipment[0].OperationID)[0];
                                } else
                                {
                                    trackedMBL = _ShipsGoAPIController.TrackNewShipment(Shipment[0].BLReferenceNo, Shipment[0].OperationID)[0];
                                }
                                if (trackedMBL.Message == "Success")
                                {
                                    Exception ex = null;
                                    if(trackedMBL.Status.ToLower() != "inprogress")
                                    {
                                        ex = _ShipsGoAPIController.InsertShipsGoBL(trackedMBL, Shipment[0].OperationID, "U", 0, Shipment[0].ID); //CustomerID Here passed 0 as it will not affect at all (CustomerID will not change)
                                    } else
                                    {
                                        objCCustomizedDBCall.ExecuteQuery($"Update ShipsGoBLs set LastChecked=GETDATE() WHERE ID={Shipment[0].ID}");
                                    }

                                    if (ex == null)
                                    {
                                        CShipsGoBLs objCShipsGoBLs = new CShipsGoBLs();
                                        objCShipsGoBLs.GetItem(Shipment[0].ID);

                                        if (objCShipsGoBLs.lstCVarShipsGoBLs.Count == 1)
                                        {
                                            var objCShipsGoCustomers = new CShipsGoCustomers();
                                            objCShipsGoCustomers.GetList($"WHERE CustomerID={objCShipsGoBLs.lstCVarShipsGoBLs[0].CustomerID}");

                                            if (objCShipsGoCustomers.lstCVarShipsGoCustomers.Count == 1)
                                            {
                                                string mailBody = "";
                                                string[] dateProps = new string[] { "LoadingDate", "DepartureDate", "ArrivalDate", "DischargeDate" };
                                                var customer = objCShipsGoCustomers.lstCVarShipsGoCustomers[0];

                                                var diff = GetDifferences(Shipment[0], objCShipsGoBLs.lstCVarShipsGoBLs[0]);
                                                var newBL = objCShipsGoBLs.lstCVarShipsGoBLs[0];

                                                var truePropertiesNotInDiff = GetTruePropertiesExcludingDiff(customer, diff);
                                                if (diff.Count == 0)
                                                {
                                                    return;
                                                }
                                                if (objCShipsGoBLs.lstCVarShipsGoBLs[0].Status.ToLower() == "untracked")
                                                {
                                                    mailBody = "Sorry, This Shipment is Untracked";
                                                }
                                                else if (objCShipsGoBLs.lstCVarShipsGoBLs[0].Status.ToLower() == "inprogress")
                                                {
                                                    return;
                                                }

                                                if (mailBody == "")
                                                {
                                                    /*foreach (var propName in truePropertiesNotInDiff)
                                                    {
                                                        if (propName == "TSPorts")
                                                        {
                                                            var TS = JsonConvert.DeserializeObject<List<TransitPort>>(objCShipsGoBLs.lstCVarShipsGoBLs[0].TSPorts);
                                                            mailBody += $"<b>{propName}</b> <br>";
                                                            mailBody += GetTSPortsString(TS);
                                                        }
                                                        else if (dateProps.Contains(propName))
                                                        {
                                                            var x = newBL.GetType().GetProperty(propName).GetValue(newBL);
                                                            var dateInfo = JsonConvert.DeserializeObject<DateInfo>((string)x);
                                                            mailBody += $"<b>{propName}</b> : {GetDateString(dateInfo)} <br>";
                                                        }
                                                        else
                                                        {
                                                            var y = newBL.GetType().GetProperty(propName).GetValue(newBL);
                                                            mailBody += $"<b>{propName}</b> : {y} <br>";
                                                        }
                                                    }

                                                    mailBody += "<br><br>";
                                                    */
                                                    foreach (var key in diff.Keys)
                                                    {
                                                        var propertyInfo = customer.GetType().GetProperty(key);
                                                        if (propertyInfo != null)
                                                        {
                                                            var value = propertyInfo.GetValue(customer);
                                                            if ((bool)value)
                                                            {
                                                                if (diff.TryGetValue(key, out var vals))
                                                                {
                                                                    if (key == "TSPorts")
                                                                    {
                                                                        var oldTS = JsonConvert.DeserializeObject<List<TransitPort>>((string)vals.OldValue);
                                                                        var newTS = JsonConvert.DeserializeObject<List<TransitPort>>((string)vals.NewValue);
                                                                        if (Shipment[0].Status.ToLower() == "inprogress")
                                                                        {
                                                                            mailBody += $"<br><b>{key}</b> :<br>";
                                                                            mailBody += GetTSPortsString(newTS);
                                                                        }
                                                                        else
                                                                        {
                                                                            mailBody += $"<b>{key}</b> Changed from <br>";
                                                                            mailBody += GetTSPortsString(oldTS);
                                                                            mailBody += $"<br><b>{key}</b> Changed To <br>";
                                                                            mailBody += GetTSPortsString(newTS);
                                                                        }
                                                                    }
                                                                    else if (dateProps.Contains(key))
                                                                    {
                                                                        var oldD = JsonConvert.DeserializeObject<DateInfo>((string)vals.OldValue);
                                                                        var newD = JsonConvert.DeserializeObject<DateInfo>((string)vals.NewValue);
                                                                        if (Shipment[0].Status.ToLower() == "inprogress")
                                                                        {
                                                                            mailBody += $"<b>{key}</b> : {GetDateString(newD)} <br>";
                                                                        }
                                                                        else
                                                                        {
                                                                            mailBody += $"<b>{key}</b> Changed from {GetDateString(oldD)} to {GetDateString(newD)} <br>";
                                                                        }
                                                                    }
                                                                    else
                                                                    {
                                                                        if (Shipment[0].Status.ToLower() == "inprogress")
                                                                        {
                                                                            mailBody += $"<b>{key}</b> : {vals.NewValue} <br>";
                                                                        }
                                                                        else
                                                                        {
                                                                            mailBody += $"<b>{key}</b> Changed from {vals.OldValue} to {vals.NewValue} <br>";
                                                                        }
                                                                    }
                                                                    //mailBody += new string('-', 50) + "<br>";
                                                                }
                                                            }
                                                        }
                                                    }
                                                }



                                                if (mailBody != "")
                                                {
                                                    string emailHeader = "";
                                                    string operationCode = "";
                                                    string customerName = "";
                                                    customerName = objCCustomizedDBCall.CallStringFunction($"select Name from Customers where ID={objCShipsGoBLs.lstCVarShipsGoBLs[0].CustomerID}");

                                                    if (absoluteUrl.Contains("forwardingarkbl"))
                                                    {
                                                        emailHeader = @"<div style=""font-size:11.0pt;"">Dear partner,<br> Good Day.<br><br>";
                                                        operationCode = objCCustomizedDBCall.CallStringFunction($"select Code from Operations where ID={objCShipsGoBLs.lstCVarShipsGoBLs[0].OperationID}");

                                                        //string emailHeader = objCCustomizedDBCall.CallStringFunction("select Email_Header from Defaults");
                                                        emailHeader += $"Your Shipment with B/L number [{objCShipsGoBLs.lstCVarShipsGoBLs[0].BLReferenceNo}] has been updated:<br><br>";
                                                        emailHeader += $"<b>Carrier:</b> {objCShipsGoBLs.lstCVarShipsGoBLs[0].ShippingLine}<br>";
                                                        emailHeader += $"<b>Vessel:</b> {objCShipsGoBLs.lstCVarShipsGoBLs[0].Vessel}<br>";
                                                        emailHeader += $"<b>B/L Containers Count:</b> {objCShipsGoBLs.lstCVarShipsGoBLs[0].BLContainerCount}<br><br>";
                                                        emailHeader += $"<b>POL:</b> {objCShipsGoBLs.lstCVarShipsGoBLs[0].Pol}<br>";
                                                        emailHeader += $"<b>POD:</b> {objCShipsGoBLs.lstCVarShipsGoBLs[0].Pod}<br>";

                                                        var departDate = JsonConvert.DeserializeObject<DateInfo>(objCShipsGoBLs.lstCVarShipsGoBLs[0].DepartureDate);
                                                        var arriDate = JsonConvert.DeserializeObject<DateInfo>(objCShipsGoBLs.lstCVarShipsGoBLs[0].ArrivalDate);

                                                        emailHeader += $"<b>Departure Date:</b> {GetDateString(departDate)}<br>";
                                                        emailHeader += $"<b>Arrival Date:</b> {GetDateString(arriDate)}<br>";
                                                        emailHeader += $"<b>Formated Transit Time:</b> {objCShipsGoBLs.lstCVarShipsGoBLs[0].FormatedTransitTime}<br><br>";

                                                        emailHeader += "<span style='background:yellow;mso-highlight:yellow'><b>Special Notes:</b></span><br>";
                                                    }


                                                    //string emailFooter = objCCustomizedDBCall.CallStringFunction("select Email_Footer from Defaults");

                                                    string emailFooter = "";
                                                    if (absoluteUrl.Contains("forwardingarkbl"))
                                                    {
                                                        emailFooter = $"<br><br>";
                                                        emailFooter += "Should you have any questions or require further assistance, please don't hesitate to reach out to us. We are always here to help.";
                                                        emailFooter += "<br><br>Thank you for trusting <b>ARK B.L!</b><br></div>";
                                                        emailFooter += @"<div><div><table border=""0"" cellspacing=""0"" cellpadding=""0"" style=""max-width:552.45pt;border-collapse:collapse""><tbody><tr style=""height:41.65pt""><td width=""113"" valign=""top"" style=""width:3.0cm;padding:0cm 0cm 0cm 0cm;height:41.65pt""><p class=""MsoNormal""><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black""><img width=""112"" height=""66"" style=""width:1.1666in;height:.6875in"" id=""m_3444113240099271698Picture_x0020_2"" src=""http://forwardingarkbl.istegy.com:1012/Content/Images/CompanyLogo.jpg"" alt=""Photo"" data-image-whitelisted="""" class=""CToWUd"" data-bit=""iit""></span><span style=""font-size:10.0pt;font-family:&quot;Aptos&quot;,sans-serif;color:black""><u></u><u></u></span></p></td><td width=""623"" colspan=""2"" valign=""top"" style=""width:467.4pt;padding:0cm 0cm 0cm 0cm;height:41.65pt""><p class=""MsoNormal"" style=""line-height:10.5pt""><b><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black"">Phone:</span></b><span style=""font-size:10.0pt;color:black"">&nbsp;+2 03 497 8002 /3/4&nbsp;</span><span style=""font-size:10.0pt;font-family:&quot;Aptos&quot;,sans-serif;color:black""><u></u><u></u></span></p><p class=""MsoNormal"" style=""line-height:10.5pt""><b><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black"">Website</span></b><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black"">:</span><b><span style=""font-size:10.0pt;color:black"">&nbsp;</span></b><b><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black""><a href=""https://www.arkbl.com/"" title=""https://www.arkbl.com/"" target=""_blank"" data-saferedirecturl=""https://www.google.com/url?q=https://www.arkbl.com/&amp;source=gmail&amp;ust=1748202342911000&amp;usg=AOvVaw1gPY5usCVoTab3KjVQiCLf""><span style=""color:black;font-weight:normal;text-decoration:none"">www.arkbl.com</span></a>&nbsp;</span></b><span style=""font-size:10.0pt;font-family:&quot;Aptos&quot;,sans-serif;color:black""> <u></u><u></u></span></p><p class=""MsoNormal"" style=""line-height:10.5pt""><b><span lang=""EN-US"" style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black"">Alexandria</span></b><b><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black""> Office:</span></b><span style=""font-size:10.0pt;color:black"">&nbsp;No. 6, Dr Ibrahim Abd El-Sayed St., Bab Sharq, Alexandria.</span><span style=""font-size:10.0pt;font-family:&quot;Aptos&quot;,sans-serif;color:black""><u></u><u></u></span></p><p class=""MsoNormal""><b><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black"">Cairo Office:&nbsp;</span></b><span style=""font-size:10.0pt;color:black"">No. 7, Elmosheir Ahmed Ismail St., Sheraton.</span><span style=""font-size:10.0pt;font-family:&quot;Aptos&quot;,sans-serif;color:black""><u></u><u></u></span></p></td></tr><tr style=""height:18.7pt""><td width=""737"" colspan=""3"" valign=""top"" style=""width:552.45pt;padding:0cm 0cm 0cm 0cm;height:18.7pt""><p class=""MsoNormal""><b><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:#c00000"">For customer feedback</span></b><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:#c00000"">:&nbsp;</span><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black"">click&nbsp;<a href=""https://www.arkbl.com/contact-us/"" title=""https://www.arkbl.com/contact-us/"" target=""_blank"" data-saferedirecturl=""https://www.google.com/url?q=https://www.arkbl.com/contact-us/&amp;source=gmail&amp;ust=1748202342911000&amp;usg=AOvVaw0ZRwsYWrucL-GmBvYXDo11"">HERE</a>&nbsp;to rate our services!&nbsp;</span><span style=""font-size:10.0pt;font-family:&quot;Aptos&quot;,sans-serif;color:black""><u></u><u></u></span></p><p class=""MsoNormal""><span style=""font-size:10.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black""><a href=""https://arkbl.com/Offices/"" title=""https://arkbl.com/Offices/"" target=""_blank"" data-saferedirecturl=""https://www.google.com/url?q=https://arkbl.com/Offices/&amp;source=gmail&amp;ust=1748202342911000&amp;usg=AOvVaw1oxa8h7yuSQqXuXM3Dkfg4"">OFFICES</a>&nbsp;l&nbsp;<a href=""https://www.arkbl.com/Services/"" title=""https://www.arkbl.com/Services/"" target=""_blank"" data-saferedirecturl=""https://www.google.com/url?q=https://www.arkbl.com/Services/&amp;source=gmail&amp;ust=1748202342911000&amp;usg=AOvVaw0dY8HenWFNw8ZpkAK2EkD4"">OUR SERVICES</a>&nbsp;l&nbsp;<a href=""https://www.arkbl.com/about/"" title=""https://www.arkbl.com/about/"" target=""_blank"" data-saferedirecturl=""https://www.google.com/url?q=https://www.arkbl.com/about/&amp;source=gmail&amp;ust=1748202342911000&amp;usg=AOvVaw38_oMOvgZWcqgBGThC5Rsz"">ABOUT US</a>&nbsp;l&nbsp;<a href=""https://www.arkbl.com/Get-Quote/"" title=""https://www.arkbl.com/Get-Quote/"" target=""_blank"" data-saferedirecturl=""https://www.google.com/url?q=https://www.arkbl.com/Get-Quote/&amp;source=gmail&amp;ust=1748202342911000&amp;usg=AOvVaw14krjNyhl0FMHt591vDb9T"">GET QUOTE</a></span><span style=""font-size:10.0pt;font-family:&quot;Aptos&quot;,sans-serif;color:black""><u></u><u></u></span></p></td></tr><tr><td width=""113"" style=""width:3.0cm;padding:0cm 0cm 0cm 0cm""></td><td width=""217"" style=""width:162.65pt;padding:0cm 0cm 0cm 0cm""></td><td width=""406"" style=""width:304.75pt;padding:0cm 0cm 0cm 0cm""></td></tr></tbody></table></div></div>";
                                                    }

                                                    string fullEmail = emailHeader + mailBody + emailFooter;

                                                    if (absoluteUrl.Contains("forwardingelite"))
                                                    {
                                                        string codes = "";
                                                        if (!string.IsNullOrWhiteSpace(objCShipsGoBLs.lstCVarShipsGoBLs[0].BLContainers))
                                                        {
                                                            var matches = Regex.Matches(objCShipsGoBLs.lstCVarShipsGoBLs[0].BLContainers, "\"ContainerCode\":\"(.*?)\"");
                                                            codes = string.Join(",", matches.Cast<Match>().Select(m => m.Groups[1].Value));
                                                        }
                                                        var arrivalDate = JsonConvert.DeserializeObject<DateInfo>(objCShipsGoBLs.lstCVarShipsGoBLs[0].ArrivalDate);
                                                        var loadingDate = JsonConvert.DeserializeObject<DateInfo>(objCShipsGoBLs.lstCVarShipsGoBLs[0].LoadingDate);
                                                        var departureDate = JsonConvert.DeserializeObject<DateInfo>(objCShipsGoBLs.lstCVarShipsGoBLs[0].DepartureDate);
                                                        var dischargeDate = JsonConvert.DeserializeObject<DateInfo>(objCShipsGoBLs.lstCVarShipsGoBLs[0].DischargeDate);
                                                        var tsPorts = JsonConvert.DeserializeObject<List<TransitPort>>(objCShipsGoBLs.lstCVarShipsGoBLs[0].TSPorts);

                                                        DateTime today = DateTime.Today;
                                                        int daysUntil = 0;
                                                        if (DateTime.TryParseExact(arrivalDate.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture,
                           DateTimeStyles.None, out DateTime targetDate))
                                                        {
                                                            daysUntil = Math.Max(0, (targetDate - today).Days);
                                                        }


                                                        DateTime departure = DateTime.ParseExact(departureDate.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                                                        DateTime arrival = DateTime.ParseExact(arrivalDate.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                                                        int totalDays = (arrival - departure).Days;
                                                        int daysPassed = (today - departure).Days;
                                                        int percentage = 0;

                                                        if (totalDays > 0)
                                                        {
                                                            percentage = (int)Math.Round((daysPassed * 100.0) / totalDays);

                                                            if (percentage < 0)
                                                                percentage = 0;
                                                            else if (percentage > 100)
                                                                percentage = 100;
                                                        }
                                                        else
                                                        {
                                                            percentage = 100;
                                                        }



                                                        fullEmail = $@"<div>
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""750"" style=""width:562.5pt;background:white;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:10.0pt;font-family:sans-serif;"">PLS DON'T REPLY THIS MAIL ..IT'S A SYSTEM GENERATED MAIL We Would Like to thank you for trust in our service .. Here under updated shipment tracking for your kind reference:
 Shipment details : Elite Tracking | (REF.) N/A | (CUST.) {customerName} | (SL.) {objCShipsGoBLs.lstCVarShipsGoBLs[0].ShippingLine} | (BKG/BL.) {objCShipsGoBLs.lstCVarShipsGoBLs[0].BLReferenceNo} | {objCShipsGoBLs.lstCVarShipsGoBLs[0].Pol} | {objCShipsGoBLs.lstCVarShipsGoBLs[0].Pod}</span></b></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p class=""yiv9774803376x_MsoNormal""><img border=""0"" width=""150"" height=""94"" id=""yiv9774803376x__x0000_i1037"" style=""width:1.5625in;min-height:.9791in;"" src=""https://forwardingelite.istegy.com/Content/Images/MailLogo.png""></p>
</td>
</tr>
</tbody>
</table>
</td>
<td style=""padding:0in 0in 0in 0in;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""right"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""right"" style=""text-align:right;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:10.0pt;font-family:sans-serif;color:#748C9A;"">{DateTime.Now.ToString("yyyy-MM-dd")}</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""right"" style=""text-align:right;"" class=""yiv9774803376x_MsoNormal""><strong><span style=""font-size:10.0pt;font-family:sans-serif;color:#748C9A;"">REF NO :</span></strong><span style=""font-size:10.0pt;font-family:sans-serif;color:#748C9A;"">
 Elite Tracking | (REF.) N/A | (CUST.) {customerName} | (SL.) {objCShipsGoBLs.lstCVarShipsGoBLs[0].ShippingLine} | (BKG/BL.) {objCShipsGoBLs.lstCVarShipsGoBLs[0].BLReferenceNo}</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""right"" style=""text-align:right;"" class=""yiv9774803376x_MsoNormal""><strong><span style=""font-size:10.0pt;font-family:sans-serif;color:#748C9A;"">Container NOs ({objCShipsGoBLs.lstCVarShipsGoBLs[0].BLContainerCount}):</span></strong><span style=""font-size:10.0pt;font-family:sans-serif;color:#748C9A;"">
 {objCShipsGoBLs.lstCVarShipsGoBLs[0].ContainerNumber} {"," + codes}</span></p>
</td>
</tr>

</tbody>
</table>
</td>
</tr>
<tr style=""min-height:15.0pt;"">
<td style=""padding:0in 0in 0in 0in;min-height:15.0pt;"">
<p style=""line-height:22.5pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:15.0pt;""></td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:10.0pt;"">
<td width=""236"" style=""width:177.0pt;border:solid #0070A3 1.0pt;padding:0in 0in 0in 0in;min-height:10.0pt;border-radius:5px;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal"">
<span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;"">POL: {objCShipsGoBLs.lstCVarShipsGoBLs[0].Pol} - POD: {objCShipsGoBLs.lstCVarShipsGoBLs[0].Pod}</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;margin: 0;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;"">Total Transit Time
</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:13.0pt;font-family:sans-serif;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].FormatedTransitTime}</span></b></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""10"" style=""width:7.5pt;padding:0in 0in 0in 0in;min-height:10.0pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td width=""10"" style=""width:7.5pt;padding:0in 0in 0in 0in;min-height:10.0pt;"">
<p style=""line-height:15.0pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td width=""236"" style=""width:177.0pt;border:solid #0070A3 1.0pt;padding:0in 0in 0in 0in;min-height:10.0pt;border-radius:5px;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;"">First Eta:</span></b><span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;""> {objCShipsGoBLs.lstCVarShipsGoBLs[0].FirstETA}</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;margin: 0;"" class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;"">New Eta:</span></b><span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;""> {dischargeDate.Date}</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:13.0pt;font-family:sans-serif;color:#F93324;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].ETA}</span></b></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""10"" style=""width:7.5pt;padding:0in 0in 0in 0in;min-height:10.0pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td width=""10"" style=""width:7.5pt;padding:0in 0in 0in 0in;min-height:10.0pt;"">
<p style=""line-height:15.0pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td width=""236"" style=""width:177.0pt;border:solid #0070A3 1.0pt;padding:0in 0in 0in 0in;min-height:10.0pt;border-radius:5px;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;"">Arrival Date :
</span></b><span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;"">{arrivalDate.Date}</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;"">Time to Destination :</span></b><span style=""font-size:11.5pt;font-family:sans-serif;color:#486A7C;"">
 {daysUntil}</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
<tr style=""min-height:22.5pt;"">
<td style=""padding:0in 0in 0in 0in;min-height:22.5pt;""></td>
</tr>
</tbody>
</table>
</div>
<p class=""yiv9774803376x_MsoNormal"">&nbsp;</p>
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""background:white;padding:0in 0in 0in 0in;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:15.0pt;"">
<td width=""20"" style=""width:15.0pt;padding:11.25pt 0in 0in 0in;min-height:15.0pt;"">
<p class=""yiv9774803376x_MsoNormal""><img border=""0"" width=""20"" height=""20"" id=""yiv9774803376x__x0000_i1036"" style=""width:.2083in;min-height:.2083in;"" src=""https://forwardingelite.istegy.com/Content/Images/BlueDot.png""></p>
</td>
<td width=""{percentage}%"" style=""width: {percentage}%;padding:11.25pt 0in 0in 0in;min-height:15.0pt;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:5.25pt;"">
<td style=""padding:0in 0in 0in 0in;min-height:5.25pt;border-top: solid #0070A3 6.0pt;""></td>
</tr>
</tbody>
</table>
</td>
<td width=""89"" style=""width:66.75pt;padding:0in 0in 0in 0in;min-height:15.0pt;"">
<p align=""right"" style=""text-align:right;"" class=""yiv9774803376x_MsoNormal""><img border=""0"" width=""89"" height=""41"" id=""yiv9774803376x__x0000_i1035"" style=""width:.9305in;min-height:.4305in;"" src=""https://forwardingelite.istegy.com/Content/Images/Container.png""></p>
</td>
<td width=""{100 - percentage}%"" style=""width: {100 - percentage}%;padding:11.25pt 0in 0in 0in;min-height:15.0pt;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:5.25pt;"">
<td style=""border:none;border-top:dashed #0070A3 6.0pt;padding:0in 0in 0in 0in;min-height:5.25pt;"">
</td>
</tr>
</tbody>
</table>
</td>
<td width=""20"" style=""width:15.0pt;padding:11.25pt 0in 0in 0in;min-height:15.0pt;"">
<p class=""yiv9774803376x_MsoNormal""><img border=""0"" width=""20"" height=""20"" id=""yiv9774803376x__x0000_i1034"" style=""width:.2083in;min-height:.2083in;"" src=""https://forwardingelite.istegy.com/Content/Images/RedDot.png""></p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr style=""min-height:10.0pt;"">
<td style=""padding:0in 0in 0in 0in;min-height:10.0pt;"">
<p style=""line-height:15.0pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td valign=""top"" style=""padding:0in 0in 0in 0in;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p style=""margin: 0;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:8.5pt;font-family:sans-serif;color:#AAAAAA;"">ORIGIN PORT
</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p style=""margin: 0;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:19.0pt;font-family:sans-serif;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Pol}</span></p>
</td>
</tr>
</tbody>
</table>
</td>
<td style=""padding:0in 0in 0in 0in;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p style=""text-align: center;margin: 0;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:8.5pt;font-family:sans-serif;color:#AAAAAA;"">Transient PORTS
</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p style=""text-align: center;margin: 0;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:19.0pt;font-family:sans-serif;color:#486A7C;"">{string.Join("->", tsPorts.Select(p => p.Port))}</span></p>
</td>
</tr>
</tbody>
</table>
</td>
<td valign=""top"" style=""padding:0in 0in 0in 0in;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""right"" style=""text-align:right;margin: 0;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:8.5pt;font-family:sans-serif;color:#AAAAAA;"">DESTINATION PORT</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""right"" style=""text-align:right;margin: 0;"" class=""yiv9774803376x_MsoNormal"">
<span style=""font-size:19.0pt;font-family:sans-serif;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Pod}</span></p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>

</tbody>
</table>
</div>
<p class=""yiv9774803376x_MsoNormal"">&nbsp;</p>
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""border-top:none;border-left:solid #F44336 4.5pt;border-bottom:none;border-right:solid #F44336 4.5pt;background:#FFDDDD;padding:6.0pt 9.0pt 6.0pt 22.5pt;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:1.5pt;"">
<td style=""padding:0in 0in 0in 0in;min-height:1.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><img border=""0"" width=""24"" height=""24"" id=""yiv9774803376x__x0000_i1033"" alt=""Alert icon"" style=""width:.25in;min-height:.25in;"" src=""https://forwardingelite.istegy.com/Content/Images/Alarm.png""></p>
</td>
<td width=""10"" style=""width:7.5pt;padding:0in 0in 0in 0in;min-height:1.5pt;"">
<p style=""line-height:2.25pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:1.5pt;"">
<p style="""" class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:10.5pt;font-family:sans-serif;color:#486A7C;"">{(mailBody.Contains("LoadingDate") || mailBody.Contains("DepartureDate") ? objCShipsGoBLs.lstCVarShipsGoBLs[0].Pol : objCShipsGoBLs.lstCVarShipsGoBLs[0].Pod)}</span></b><span style=""font-size:10.5pt;font-family:sans-serif;color:#486A7C;""> {mailBody}</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
<tr style=""min-height:10.0pt;"">
<td style=""padding:0in 0in 0in 0in;min-height:10.0pt;"">
<p style=""line-height:15.0pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" style=""border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:5.0pt;"">
<td width=""20"" style=""width:15.0pt;padding:.75pt .75pt .75pt .75pt;min-height:5.0pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;</span></p>
</td>
<td width=""160"" style=""width:120.0pt;padding:.75pt .75pt .75pt .75pt;min-height:5.0pt;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><span style=""font-family:sans-serif;color:#486A7C;"">MBL / Booking No
</span></p>
</td>
</tr>
<tr>
<td style=""border:solid #0070A3 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt;border-radius:3px;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal"">
<b><span style=""font-size:10.5pt;font-family:sans-serif;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].BLReferenceNo}</span></b></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</td>
<td width=""40"" style=""width:30.0pt;padding:.75pt .75pt .75pt .75pt;min-height:5.0pt;"">
<p style=""line-height:7.5pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;</span></p>
</td>
<td width=""160"" style=""width:120.0pt;padding:.75pt .75pt .75pt .75pt;min-height:5.0pt;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><span style=""font-family:sans-serif;color:#486A7C;"">Container No
</span></p>
</td>
</tr>
<tr>
<td style=""border:solid #0070A3 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt;border-radius:3px;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal"">
<b><span style=""font-size:10.5pt;font-family:sans-serif;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].ContainerNumber}</span></b></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</td>
<td width=""40"" style=""width:30.0pt;padding:.75pt .75pt .75pt .75pt;min-height:5.0pt;"">
<p style=""line-height:7.5pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp; </span>
</p>
</td>
<td width=""160"" style=""width:120.0pt;padding:.75pt .75pt .75pt .75pt;min-height:5.0pt;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><span style=""font-family:sans-serif;color:#486A7C;"">Carrier
</span></p>
</td>
</tr>
<tr>
<td style=""border:solid #0070A3 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt;border-radius:3px;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal"">
<b><span style=""font-size:10.5pt;font-family:sans-serif;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].ShippingLine}</span></b></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</td>
<td width=""22"" style=""width:16.5pt;padding:.75pt .75pt .75pt .75pt;min-height:5.0pt;"">
<p style=""line-height:7.5pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;</span></p>
</td>
<td width=""160"" style=""width:120.0pt;padding:.75pt .75pt .75pt .75pt;min-height:5.0pt;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><span style=""font-family:sans-serif;color:#486A7C;"">&nbsp;
</span></p>
</td>
</tr>
<tr>
<td style=""background:#0070A3;padding:7.5pt .75pt 7.5pt .75pt;border-radius:3px;"">
<p align=""center"" style=""text-align:center;"" class=""yiv9774803376x_MsoNormal""><span style=""font-family:sans-serif;color:white;""><a rel=""nofollow noopener noreferrer"" target=""_blank"" href=""https://elite-log.com/track?query={objCShipsGoBLs.lstCVarShipsGoBLs[0].ContainerNumber}"" title=""Go live position""><span style=""color:white;text-decoration:none;"">Go
 Live Position </span></a></span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
<tr style=""min-height:22.5pt;"">
<td style=""padding:0in 0in 0in 0in;min-height:22.5pt;""></td>
</tr>
</tbody>
</table>
</div>
<p class=""yiv9774803376x_MsoNormal"">&nbsp;</p>
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td width=""180"" style=""width:135.0pt;border:solid #DDDDDD 1.0pt;background:#0070A3;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td width=""25"" style=""width:18.75pt;padding:0in 3.75pt 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><img border=""0"" width=""15"" height=""22"" id=""yiv9774803376x__x0000_i1032"" alt=""Location icon"" style=""width:.1527in;min-height:.2291in;"" src=""https://forwardingelite.istegy.com/Content/Images/Location.png""></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:13.5pt;font-family:sans-serif;color:white;"">LOCATION
</span></b></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""292"" style=""width:219.0pt;border:solid #DDDDDD 1.0pt;border-left:none;background:#0070A3;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td width=""25"" style=""width:18.75pt;padding:0in 3.75pt 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><img border=""0"" width=""17"" height=""19"" id=""yiv9774803376x__x0000_i1031"" alt=""Arrow icon"" style=""width:.1736in;min-height:.2013in;"" src=""https://forwardingelite.istegy.com/Content/Images/Moves.png""></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:13.5pt;font-family:sans-serif;color:white;"">MOVES
</span></b></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""128"" style=""width:96.0pt;border:solid #DDDDDD 1.0pt;border-left:none;background:#0070A3;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td width=""25"" style=""width:18.75pt;padding:0in 3.75pt 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><img border=""0"" width=""21"" height=""19"" id=""yiv9774803376x__x0000_i1030"" alt=""Date icon"" style=""width:.2222in;min-height:.2013in;"" src=""https://forwardingelite.istegy.com/Content/Images/Date.png""></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:13.5pt;font-family:sans-serif;color:white;"">DATE
</span></b></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""149"" style=""width:111.75pt;border:solid #DDDDDD 1.0pt;border-left:none;background:#0070A3;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td width=""25"" style=""width:18.75pt;padding:0in 3.75pt 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><img border=""0"" width=""21"" height=""19"" id=""yiv9774803376x__x0000_i1029"" alt=""Date icon"" style=""width:.2222in;min-height:.1944in;"" src=""https://forwardingelite.istegy.com/Content/Images/Vessel.png""></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:13.5pt;font-family:sans-serif;color:white;"">VESSEL
</span></b></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td width=""180"" style=""width:135.0pt;border:solid #DDDDDD 1.0pt;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Pol}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""292"" style=""width:219.0pt;border:solid #DDDDDD 1.0pt;border-left:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;""><img border=""0"" width=""{(loadingDate.IsActual ? 24 : 0)}"" height=""{(loadingDate.IsActual ? 24 : 0)}"" id=""yiv9774803376x__x0000_i1028"" alt=""Check icon"" style="""" src=""https://forwardingelite.istegy.com/Content/Images/Success.png""></span><span style=""font-size:11.5pt;color:#486A7C;"">Loaded
 on Board</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""128"" style=""width:96.0pt;border:solid #DDDDDD 1.0pt;border-left:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{GetDateString(loadingDate)}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""149"" style=""width:111.75pt;border:solid #DDDDDD 1.0pt;border-left:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Vessel}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
<tr>
<td width=""180"" style=""width:135.0pt;border:solid #DDDDDD 1.0pt;border-top:none;background:#F2F2F2;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Pol}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""292"" style=""width:219.0pt;border-top:none;border-left:none;border-bottom:solid #DDDDDD 1.0pt;border-right:solid #DDDDDD 1.0pt;background:#F2F2F2;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;""><img border=""0"" width=""{(departureDate.IsActual ? 24 : 0)}"" height=""{(departureDate.IsActual ? 24 : 0)}"" id=""yiv9774803376x__x0000_i1027"" alt=""Check icon"" style="""" src=""https://forwardingelite.istegy.com/Content/Images/Success.png""></span><span style=""font-size:11.5pt;color:#486A7C;"">Departed</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""128"" style=""width:96.0pt;border-top:none;border-left:none;border-bottom:solid #DDDDDD 1.0pt;border-right:solid #DDDDDD 1.0pt;background:#F2F2F2;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{GetDateString(departureDate)}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""149"" style=""width:111.75pt;border-top:none;border-left:none;border-bottom:solid #DDDDDD 1.0pt;border-right:solid #DDDDDD 1.0pt;background:#F2F2F2;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Vessel}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>";


                                                        foreach (var tsport in tsPorts)
                                                        {
                                                            objCShipsGoBLs.lstCVarShipsGoBLs[0].Vessel = tsport.Vessel;
                                                            fullEmail += $@"<tr>
<td width=""180"" style=""width:135.0pt;border:solid #DDDDDD 1.0pt;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{tsport.Port}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""292"" style=""width:219.0pt;border:solid #DDDDDD 1.0pt;border-left:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">
<img border=""0"" width=""{(tsport.ArrivalDate.IsActual ? 24 : 0)}"" height=""{(tsport.ArrivalDate.IsActual ? 24 : 0)}"" id=""yiv9774803376x__x0000_i1027"" alt=""Check icon"" style="""" src=""https://forwardingelite.istegy.com/Content/Images/Success.png"">
</span><span style=""font-size:11.5pt;color:#486A7C;"">Arrived in transshipment port</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""128"" style=""width:96.0pt;border:solid #DDDDDD 1.0pt;border-left:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{GetDateString(tsport.ArrivalDate)}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""149"" style=""width:111.75pt;border:solid #DDDDDD 1.0pt;border-left:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{tsport.Vessel}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>";
                                                            fullEmail += $@"<tr>
<td width=""180"" style=""width:135.0pt;border:solid #DDDDDD 1.0pt;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{tsport.Port}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""292"" style=""width:219.0pt;border:solid #DDDDDD 1.0pt;border-left:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">
<img border=""0"" width=""{(tsport.DepartureDate.IsActual ? 24 : 0)}"" height=""{(tsport.DepartureDate.IsActual ? 24 : 0)}"" id=""yiv9774803376x__x0000_i1027"" alt=""Check icon"" style="""" src=""https://forwardingelite.istegy.com/Content/Images/Success.png"">
</span><span style=""font-size:11.5pt;color:#486A7C;"">Departed from transshipment port</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""128"" style=""width:96.0pt;border:solid #DDDDDD 1.0pt;border-left:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{GetDateString(tsport.DepartureDate)}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""149"" style=""width:111.75pt;border:solid #DDDDDD 1.0pt;border-left:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{tsport.Vessel}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>";
                                                        }


                                                        fullEmail += $@"<tr>
<td width=""180"" style=""width:135.0pt;border:solid #DDDDDD 1.0pt;border-top:none;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Pod}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""292"" style=""width:219.0pt;border-top:none;border-left:none;border-bottom:solid #DDDDDD 1.0pt;border-right:solid #DDDDDD 1.0pt;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;""><img border=""0"" width=""{(arrivalDate.IsActual ? 24 : 0)}"" height=""{(arrivalDate.IsActual ? 24 : 0)}"" id=""yiv9774803376x__x0000_i1026"" alt=""Check icon"" style="""" src=""https://forwardingelite.istegy.com/Content/Images/Success.png""></span><span style=""font-size:11.5pt;color:#486A7C;"">Vessel
 Arrived</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""128"" style=""width:96.0pt;border-top:none;border-left:none;border-bottom:solid #DDDDDD 1.0pt;border-right:solid #DDDDDD 1.0pt;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{GetDateString(arrivalDate)}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""149"" style=""width:111.75pt;border-top:none;border-left:none;border-bottom:solid #DDDDDD 1.0pt;border-right:solid #DDDDDD 1.0pt;background:white;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Vessel}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
<tr>
<td width=""180"" style=""width:135.0pt;border:solid #DDDDDD 1.0pt;border-top:none;background:#F2F2F2;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Pod}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""292"" style=""width:219.0pt;border-top:none;border-left:none;border-bottom:solid #DDDDDD 1.0pt;border-right:solid #DDDDDD 1.0pt;background:#F2F2F2;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;""><img border=""0"" width=""{(dischargeDate.IsActual ? 24 : 0)}"" height=""{(dischargeDate.IsActual ? 24 : 0)}"" id=""yiv9774803376x__x0000_i1025"" alt=""Check icon"" style="""" src=""https://forwardingelite.istegy.com/Content/Images/Success.png""></span><span style=""font-size:11.5pt;color:#486A7C;"">Discharged</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""128"" style=""width:96.0pt;border-top:none;border-left:none;border-bottom:solid #DDDDDD 1.0pt;border-right:solid #DDDDDD 1.0pt;background:#F2F2F2;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{GetDateString(dischargeDate)}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
<td width=""149"" style=""width:111.75pt;border-top:none;border-left:none;border-bottom:solid #DDDDDD 1.0pt;border-right:solid #DDDDDD 1.0pt;background:#F2F2F2;padding:9.0pt 0in 9.0pt 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:2.5pt;"">
<td width=""22"" style=""width:16.5pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
<td style=""padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:11.5pt;color:#486A7C;"">{objCShipsGoBLs.lstCVarShipsGoBLs[0].Vessel}</span></p>
</td>
<td width=""12"" style=""width:9.0pt;padding:0in 0in 0in 0in;min-height:2.5pt;"">
<p style=""line-height:3.75pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;
</span></p>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<p class=""yiv9774803376x_MsoNormal""><span style=""display:none;"">&nbsp;</span></p>
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr style=""min-height:25.0pt;"">
<td style=""padding:0in 0in 0in 0in;min-height:25.0pt;"">
<p style=""line-height:37.5pt;"" class=""yiv9774803376x_MsoNormal""><span style=""font-size:1.0pt;"">&nbsp;</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<div align=""center"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" width=""100%"" style=""width:100.0%;background:white;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<table border=""0"" cellspacing=""0"" cellpadding=""0"" align=""left"" width=""100%"" style=""width:100.0%;border-collapse:collapse;"" class=""yiv9774803376x_MsoNormalTable"">
<tbody>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:10.5pt;font-family:sans-serif;color:#486A7C;"">We will remain monitoring your shipments .. while you are growing your business ..</span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p class=""yiv9774803376x_MsoNormal""><span style=""font-size:10.5pt;font-family:sans-serif;color:#486A7C;"">Thanks for using ELITE Logistics Tracking assistant Glad to receive your feedback / inquiries via below channels ...... Contact Us : Website
<a rel=""nofollow noopener noreferrer"" target=""_blank"" href=""http://www.elite-log.com"">www.elite-log.com</a> .... Phone : 0105 022 7754 * For Sales:
<a rel=""nofollow noopener noreferrer"" ymailto=""mailto:sales@elite-log.com"" target=""_blank"" href=""mailto:sales@elite-log.com"">sales@elite-log.com</a> | Marketing:
<a rel=""nofollow noopener noreferrer"" ymailto=""mailto:Marketing@elite-log.com"" target=""_blank"" href=""mailto:Marketing@elite-log.com"">Marketing@elite-log.com</a> | Pricing:
<a rel=""nofollow noopener noreferrer"" ymailto=""mailto:Pricing@elite-log.com"" target=""_blank"" href=""mailto:Pricing@elite-log.com"">Pricing@elite-log.com</a> | Customer Service:
<a rel=""nofollow noopener noreferrer"" ymailto=""mailto:customersupport@elite-log.com"" target=""_blank"" href=""mailto:customersupport@elite-log.com"">customersupport@elite-log.com</a> | Finance :
<a rel=""nofollow noopener noreferrer"" ymailto=""mailto:finance@elite-log.com"" target=""_blank"" href=""mailto:finance@elite-log.com"">finance@elite-log.com</a></span></p>
</td>
</tr>
<tr>
<td style=""padding:0in 0in 0in 0in;"">
<p class=""yiv9774803376x_MsoNormal""><b><span style=""font-size:10.5pt;font-family:sans-serif;color:#486A7C;"">Elite Tracking</span></b></p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<p class=""yiv9774803376x_MsoNormal"">&nbsp;</p>
</div>";
                                                        
                                                    }


                                                    string subject = $"Shipment Update - Operation [{operationCode}] - B/L [{objCShipsGoBLs.lstCVarShipsGoBLs[0].BLReferenceNo}] - [{customerName}]";
                                                    if (absoluteUrl.Contains("forwardingelite"))
                                                    {
                                                        subject = $"Elite Tracking | (REF.) N/A | (CUST.) {customerName} | (SL.) {objCShipsGoBLs.lstCVarShipsGoBLs[0].ShippingLine} | (BKG/BL.) {objCShipsGoBLs.lstCVarShipsGoBLs[0].BLReferenceNo} | {objCShipsGoBLs.lstCVarShipsGoBLs[0].Pol} | {objCShipsGoBLs.lstCVarShipsGoBLs[0].Pod} | ETA: {objCShipsGoBLs.lstCVarShipsGoBLs[0].FirstETA} | {objCShipsGoBLs.lstCVarShipsGoBLs[0].ETA} | [{objCShipsGoBLs.lstCVarShipsGoBLs[0].Status}]";
                                                    }

                                                    string ccEmail = "";
                                                    if (customer.IsHaveCC && absoluteUrl.Contains("forwardingarkbl"))
                                                    {
                                                        var oper = new COperations();
                                                        oper.GetItem(Shipment[0].OperationID);

                                                        if(oper.lstCVarOperations.Count == 1)
                                                        {
                                                            int custID = oper.lstCVarOperations[0].DirectionType == 2 ? oper.lstCVarOperations[0].ConsigneeID : oper.lstCVarOperations[0].ShipperID;

                                                            if(custID > 0)
                                                            {
                                                                ccEmail = objCCustomizedDBCall.CallStringFunction($"select Email from Customers where ID={custID}");
                                                            }
                                                        }
                                                    }

                                                    string ret = SendTextEmail(customer.Email, fullEmail, subject, ccEmail);
                                                    if (ret != "")
                                                    {
                                                        objCCustomizedDBCall.ExecuteQuery($"INSERT INTO ShipsGoLog (OperationID,Log,LogFor) Values ({objCShipsGoBLs.lstCVarShipsGoBLs[0].OperationID},'{ret.Replace('\'', '"')}','MailError')");
                                                    } else
                                                    {
                                                        objCCustomizedDBCall.ExecuteQuery($"INSERT INTO ShipsGoLog (OperationID,Log,LogFor) Values ({objCShipsGoBLs.lstCVarShipsGoBLs[0].OperationID},'{customer.Email.Replace('\'', '"') + ";" + ccEmail.Replace('\'', '"')}','MailSent')");
                                                    }
                                                }
                                            }

                                        }

                                    }
                                }
                            }
                        }

                    }
                } catch (Exception exc) {
                    WriteToLog("Defaults Controller : " + exc.Message);
                } finally
                {
                    Monitor.Exit(_lockObject);
                }
            }
            
        }

        private string GetTSPortsString(List<TransitPort> shipCalls)
        {
            string tr = "";
            if(shipCalls is null)
            {
                return tr;
            }
            int i = 1;
            foreach (var call in shipCalls)
            {
                tr += $"({i}) Port: {call.Port} <br>";
                tr += $"\t&nbsp;&nbsp;&nbsp;&nbsp;Vessel: {call.Vessel} (IMO: {call.VesselIMO}) <br>";
                tr += $"\t&nbsp;&nbsp;&nbsp;&nbsp;Arrival: {call.ArrivalDate.Date} ({(call.ArrivalDate.IsActual ? "Actual" : "Estimated")}) <br>";
                tr += $"\t&nbsp;&nbsp;&nbsp;&nbsp;Departure: {call.DepartureDate.Date} ({(call.DepartureDate.IsActual ? "Actual" : "Estimated")}) <br>";
                i++;
            }
            return tr;
        }
        private string GetDateString(DateInfo date)
        {
            string tr = "";
            if(date is null)
            {
                return tr;
            }
            tr += $"{date.Date} ({(date.IsActual ? "Actual" : "Estimated")})";
            return tr;
        }
        private Dictionary<string, (object OldValue, object NewValue)> GetDifferences<T>(T oldObject, T newObject)
        {
            if (oldObject == null || newObject == null)
                throw new ArgumentNullException(nameof(oldObject) + " or " + nameof(newObject), "Objects cannot be null");

            var differences = new Dictionary<string, (object OldValue, object NewValue)>();
            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                string[] excluded = new string[] { "Action", "LastChecked", "CreatorUserID", "CreationDate" };
                if (excluded.Contains(property.Name))
                {
                    continue;
                }
                var oldValue = property.GetValue(oldObject);
                var newValue = property.GetValue(newObject);
                if(oldValue.ToString() == "InProgress")
                {
                    return new Dictionary<string, (object OldValue, object NewValue)>();
                }

                // Check if values are the same
                bool areEqual = object.Equals(oldValue, newValue);
                if (!areEqual)
                {
                    differences.Add(property.Name, (oldValue, newValue));
                }
            }

            return differences;
        }

        private List<string> GetTruePropertiesExcludingDiff(CVarShipsGoCustomers customer, Dictionary<string, (object OldValue, object NewValue)> diff)
        {
            List<string> trueProperties = new List<string>();

            var properties = typeof(CVarShipsGoCustomers).GetProperties();

            foreach (var property in properties)
            {
                if (diff.ContainsKey(property.Name))
                    continue;

                var value = property.GetValue(customer);

                if (value is bool boolValue && boolValue)
                {
                    trueProperties.Add(property.Name);
                }
            }

            return trueProperties;
        }

        private string SendTextEmail(string pEmail, string pBody, string pSubject, string ccEmail)
        {
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _);


            string _MessageReturned = "";
            try
            {
                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                var mail = new System.Net.Mail.MailMessage();
                SmtpClient Client = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                Client.UseDefaultCredentials = true;
                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                {
                    Client.Credentials = new System.Net.NetworkCredential("apikey", CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                    mail.CC.Add(new MailAddress("IMPORT@elite-log.com"));
                    mail.CC.Add(new MailAddress("samer.alemam@elite-log.com"));
                    mail.CC.Add(new MailAddress("mohamed.galal@elite-log.com"));
                    mail.CC.Add(new MailAddress("mostafa.hanafy@elite-log.com"));
                    mail.CC.Add(new MailAddress("kareem.hassan@elite-log.com"));
                    mail.CC.Add(new MailAddress("operation@elite-log.com"));
                }
                else
                {
                    Client.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                }
                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                {
                    mail.From = new MailAddress("track-trace@elite-log.com", "track-trace@elite-log.com");
                }
                else
                {
                    mail.From = new MailAddress(
                        objCDefaults.lstCVarDefaults[0].Email,
                        objCDefaults.lstCVarDefaults[0].Email_DisplayName
                    );
                }

                string[] emails = pEmail.Split(new char[] { ';' },StringSplitOptions.RemoveEmptyEntries);
                foreach(var email in emails)
                    mail.To.Add(new MailAddress(email));

                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ARK" && IsValidEmail(ccEmail))
                {
                    mail.CC.Add(new MailAddress(ccEmail));
                }

                mail.Subject = pSubject;
                mail.Body = pBody;
                mail.IsBodyHtml = true;
                Client.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL; 
                Client.Send(mail);
                WriteToLog($"emails: {pEmail.Replace('\'', '"')} -- subject: {pSubject.Replace('\'', '"')} -- body: {pBody.Replace('\'', '"')}");
            }
            catch (Exception ex)
            {
                _MessageReturned = ex.Message;
            }
            return _MessageReturned;
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
                objCCustomizedDBCall.ExecuteQuery($"INSERT INTO TransactionsLog (Code,Log) Values ('FileLogError - {ex.Message.Substring(0, 4000).Replace('\'', '"')}','{message.Replace('\'', '"')}')");
            }
        }

        private bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    } //of class

    public class UpdateDefaultsData
    {
        public Int32 pID { get; set; }
        public String pCompanyName { get; set; }
        public String pCompanyLocalName { get; set; }
        public Int32 pBranchID { get; set; }
        public String pAddressLine1 { get; set; }
        public String pAddressLine2 { get; set; }
        public String pAddressLine3 { get; set; }
        public String pAddressLine4 { get; set; }
        public String pAddressLine5 { get; set; }
        public String pPhones { get; set; }
        public String pFaxes { get; set; }
        public String pEmail { get; set; }
        public String pWebsite { get; set; }
        public String pBankName { get; set; }
        public String pAccountName { get; set; }
        public String pBankAddress { get; set; }
        public String pSwiftCode { get; set; }
        public String pAccountNumber { get; set; }
        public string pTaxNumber { get; set; }
        public int pImportOceanDays { get; set; }
        public int pImportAirDays { get; set; }
        public int pImportInlandDays { get; set; }
        public int pExportOceanDays { get; set; }
        public int pExportAirDays { get; set; }
        public int pExportInlandDays { get; set; }
        public int pDomesticOceanDays { get; set; }
        public int pDomesticAirDays { get; set; }
        public int pDomesticInlandDays { get; set; }
        public int pSmallBusinessBelow { get; set; }
        public int pMediumBusinessBelow { get; set; }
        public bool pIsDepartmentOption { get; set; }
        public int pCurrencyID { get; set; }
        public int pGroupID { get; set; }
        
        public int pForeignCurrencyID { get; set; }
        public string pCommericalRegNo { get; set; }
        public string pVatIDNo { get; set; }
        public string pInvoiceLeftPosition { get; set; }
        public string pInvoiceLeftSignature { get; set; }
        public string pInvoiceMiddlePosition { get; set; }
        public string pInvoiceMiddleSignature { get; set; }
        public string pInvoiceRightPosition { get; set; }
        public string pInvoiceRightSignature { get; set; }
        public string pEmail_Password { get; set; }
        public string pEmail_DisplayName { get; set; }
        public string pEmail_Host { get; set; }
        public string pEmail_Port { get; set; }
        public string pEmail_IsSSL { get; set; }
        public string pEmail_Header { get; set; }
        public string pEmail_Footer { get; set; }
        public string pShowUserSalesmen { get; set; }
        public bool pIsAddChargeAuto { get; set; }
        public string pIsNewCRMCycle { get; set; }
        public string pisShipp { get; set; }

    }

    public class SendEmailWithAttachment
    {
        public string pFileName { get; set; }
        public string pMapPath { get; set; }
        public string pEmail_Subject { get; set; }
        public string pEmail_To { get; set; }
        public string pEmail_Body { get; set; }
    }

    public class TestEmailData
    {
        public String pEmail { get; set; }
        public string pEmail_Password { get; set; }
        public string pEmail_DisplayName { get; set; }
        public string pEmail_Host { get; set; }
        public string pEmail_Port { get; set; }
        public bool pEmail_IsSSL { get; set; }
        public string pEmail_Header { get; set; }
        public string pEmail_Footer { get; set; }
        public string pEmail_Subject { get; set; }
        public string pEmail_To { get; set; }
        public string pEmail_Body { get; set; }
    }


    public class PDFEmailData
    {
        public String pEmail { get; set; }
        public string pEmail_Password { get; set; }
        public string pEmail_DisplayName { get; set; }
        public string pEmail_Host { get; set; }
        public string pEmail_Port { get; set; }
        public bool pEmail_IsSSL { get; set; }
        public string pEmail_Header { get; set; }
        public string pEmail_Footer { get; set; }
        public string pEmail_Subject { get; set; }
        public string pEmail_To { get; set; }
        public string pEmail_Body { get; set; }
        public string pHTML_ForPDF { get; set; }
        public string pHTML_ForExcel { get; set; }
        public string pEmail_ReportName { get; set; }
    }

    public class SendPDFEmail_GeneralData
    {


        public string pEmail_Subject { get; set; }
        public string pEmail_To { get; set; }
        public string pEmail_Body { get; set; }
        public string pHTML_ForPDF { get; set; }
        public string pHTML_ForExcel { get; set; }
        public string pEmail_ReportName { get; set; }
    }
    public class SendUrlEmail_GeneralData
    {
        public string pEmail_Subject { get; set; }
        public string pEmail_To { get; set; }
        public string pEmail_Body { get; set; }
        public string pHTML_ForPDF { get; set; }
        public string pHTML_ForExcel { get; set; }
        public string pEmail_ReportName { get; set; }
    }
} //of controller
