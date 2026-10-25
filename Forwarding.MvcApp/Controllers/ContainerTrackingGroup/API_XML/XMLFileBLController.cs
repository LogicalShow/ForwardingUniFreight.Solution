using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.XML;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Xml;
//using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using WebMatrix.WebData;
using Forwarding.MvcApp.Entities.Operations;
using System.Reflection;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;

namespace Forwarding.MvcApp.Controllers.ContainerTrackingGroup.API_XML
{
    public class XMLFileBLController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            CvwOperationsWithMinimalColumns objCvwOperations = new CvwOperationsWithMinimalColumns();

            if (pIsLoadArrayOfObjects)
            {
                objCvwOperations.GetListPaging(99999, 1, pWhereClause /*BLType=3 AND DirectionType<>1 AND TransportType<>2 AND ShipmentType<>2 and BLType<>2"*/, "ID DESC", out _RowCount);
            }
            var pOperationList = objCvwOperations.lstCVarvwOperationsWithMinimalColumns
                    .Select(s => new
                    {
                        ID = s.ID,
                        Code = s.Code,
                        ClientId = s.ClientID,
                        ClientName = s.ClientName,
                    }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(pOperationList) };
        }

        #region Generation
        [HttpGet, HttpPost]
        public object[] GenerateXML(string pOperationID, string pXmlFileType)
        {
            switch (pXmlFileType)
            {
                case "SailingSchedule": return GenerateXML_SailingSchedule(pOperationID);
                case "BookingRequestConfirmation": return GenerateXML_BookingRequestConfirmation(pOperationID);
                case "BlShippingInstructions": return GenerateXML_BlShippingInstructions(pOperationID);
                case "CarrierIntegration": return GenerateXML_CarrierIntegration(pOperationID);
                case "ShipmentStatus": return GenerateXML_ShipmentStatus(pOperationID);
                case "Rate": return GenerateXML_Rate(pOperationID);
                case "FileBl": return GenerateXML_FileBl(pOperationID);
                case "InterAllianceBilling": return GenerateXML_InterAllianceBilling(pOperationID);
                case "InvoiceAcknowledgement": return GenerateXML_InvoiceAcknowledgement(pOperationID);
                case "InformationBroker": return GenerateXML_InformationBroker(pOperationID);
                case "EIManagement": return GenerateXML_EIManagement(pOperationID);
                case "WWAAcknowledgement": return GenerateXML_WWAAcknowledgement(pOperationID);
                case "CargoManagement": return GenerateXML_CargoManagement(pOperationID);
                case "DataWarehouse": return GenerateXML_DataWarehouse(pOperationID);
                default: return new Object[] { "" };
            }
        
        }

        object[] GenerateXML_SailingSchedule(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            CvwOperations objCMasterOperation = new CvwOperations();
            checkException = objCMasterOperation.GetListPaging(9999, 1, " WHERE ID=" + pOperationID, "ID", out _RowCount);

            CvwOperationContainersAndPackages objCMasterOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            checkException = objCMasterOperationContainersAndPackages.GetListPaging(9999, 1, " WHERE OperationID=" + pOperationID, "ID", out _RowCount);


            CvwOperations objCChildOperations = new CvwOperations();
            checkException = objCChildOperations.GetListPaging(9999, 1, " WHERE MasterOperationID=" + pOperationID, "ID", out _RowCount);
            
            #region Schedule
            XmlDocument doc = new XmlDocument();
            XmlDeclaration xmldecl;
            xmldecl = doc.CreateXmlDeclaration("1.0", null, null);
            xmldecl.Encoding = "UTF-8";
            doc.AppendChild(xmldecl);
            
            XmlNode Schedule = doc.CreateElement("Schedule");
            XmlAttribute attr = doc.CreateAttribute("xmlns:xsi");
            attr.Value = "http://www.w3.org/2001/XMLSchema-instance";
            Schedule.Attributes.SetNamedItem(attr);
            attr = doc.CreateAttribute("xsi:noNameSpaceSchemaLocation");
            attr.Value = "http://www.wwalliance.com/wiki/index.php/File:WWA_Sailing_Schedule_version_1.0.9.xsd";
            Schedule.Attributes.SetNamedItem(attr);
            doc.AppendChild(Schedule);
            #endregion

            #region ScheduleEnvelope
            {
                XmlNode envelope = doc.CreateElement("ScheduleEnvelope");
                Schedule.AppendChild(envelope);

                XmlNode envelopeNode = doc.CreateElement("SenderID");
                envelopeNode.InnerText = "edi_mesco_prod";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("ReceiverID");
                envelopeNode.InnerText = "wwalliance";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Password");
                envelopeNode.InnerText = "test";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Type");
                envelopeNode.InnerText = "WWA_Sailing_Schedule_XML";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Version");
                envelopeNode.InnerText = "1.1.0";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("EnvelopeID");
                envelopeNode.InnerText = GetEnvelopeID();
                envelope.AppendChild(envelopeNode);
            }
            #endregion FileBLEnvelope

            #region ScheduleDetails

            XmlNode ScheduleDetails = doc.CreateElement("ScheduleDetails");
            Schedule.AppendChild(ScheduleDetails);

            XmlNode node = doc.CreateElement("VesselVoyageID");
            node.InnerText = "WAIC123456DEBRECOBAQ";
            ScheduleDetails.AppendChild(node);

            node = doc.CreateElement("RequestType");
            node.InnerText = "N";
            ScheduleDetails.AppendChild(node);

            node = doc.CreateElement("VesselName");
            node.InnerText = "BAHIA LAURA";
            ScheduleDetails.AppendChild(node);

            node = doc.CreateElement("Voyage");
            node.InnerText = "12";
            ScheduleDetails.AppendChild(node);

            node = doc.CreateElement("CarrierSCAC");
            node.InnerText = "CMDU";
            ScheduleDetails.AppendChild(node);

            node = doc.CreateElement("SCAC");
            node.InnerText = "WAIC";
            ScheduleDetails.AppendChild(node);

            node = doc.CreateElement("AmsFlag");
            node.InnerText = "N";
            ScheduleDetails.AppendChild(node);

            node = doc.CreateElement("ACIFlag");
            node.InnerText = "N";
            ScheduleDetails.AppendChild(node);

            node = doc.CreateElement("CFSOrigin");
            node.InnerText = "DEBRE";
            ScheduleDetails.AppendChild(node);

            node = doc.CreateElement("CFSDestination");
            node.InnerText = "COBAQ";
            ScheduleDetails.AppendChild(node);
            #endregion

            #region RoutingDetails

            foreach (var subOperation in objCChildOperations.lstCVarvwOperations)
            {
                XmlNode RoutingDetails = doc.CreateElement("RoutingDetails");
                ScheduleDetails.AppendChild(RoutingDetails);

                node = doc.CreateElement("StageQualifier");
                node.InnerText = "1";
                RoutingDetails.AppendChild(node);

                node = doc.CreateElement("TransportMode");
                node.InnerText = "6";
                RoutingDetails.AppendChild(node);

                node = doc.CreateElement("TransportName");
                node.InnerText = "Pre-Carriage";
                RoutingDetails.AppendChild(node);

                node = doc.CreateElement("Origin");
                node.InnerText = "DEBRE";
                RoutingDetails.AppendChild(node);

                node = doc.CreateElement("ETD");
                node.InnerText = "2011-09-13 08:00:00 CEST";
                RoutingDetails.AppendChild(node);

                node = doc.CreateElement("Destination");
                node.InnerText = "DEHAM";
                RoutingDetails.AppendChild(node);

                node = doc.CreateElement("ETA");
                node.InnerText = "2011-09-17";
                RoutingDetails.AppendChild(node);
            }
       

            #endregion

            return new Object[] { doc.OuterXml };
        }
        object[] GenerateXML_BookingRequestConfirmation(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        object[] GenerateXML_BlShippingInstructions(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        object[] GenerateXML_CarrierIntegration(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        object[] GenerateXML_ShipmentStatus(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            CvwOperations objCMasterOperation = new CvwOperations();
            checkException = objCMasterOperation.GetListPaging(9999, 1, " WHERE ID=" + pOperationID, "ID", out _RowCount);

            CvwOperationContainersAndPackages objCMasterOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            checkException = objCMasterOperationContainersAndPackages.GetListPaging(9999, 1, " WHERE OperationID=" + pOperationID, "ID", out _RowCount);


            CvwOperations objCChildOperations = new CvwOperations();
            checkException = objCChildOperations.GetListPaging(9999, 1, " WHERE MasterOperationID=" + pOperationID, "ID", out _RowCount);

            #region ShipmentStatus 
            XmlDocument doc = new XmlDocument();
            XmlDeclaration xmldecl;
            xmldecl = doc.CreateXmlDeclaration("1.0", null, null);
            xmldecl.Encoding = "UTF-8";
            doc.AppendChild(xmldecl);

            XmlNode ShipmentStatus = doc.CreateElement("ShipmentStatus");
            XmlAttribute attr = doc.CreateAttribute("xmlns:xsi");
            attr.Value = "http://www.w3.org/2001/XMLSchema-instance";
            ShipmentStatus.Attributes.SetNamedItem(attr);
            attr = doc.CreateAttribute("xsi:noNameSpaceSchemaLocation");
            attr.Value = "http://www.wwalliance.com/wiki/images/d/d4/WWA_Shipment_Status_version_1.1.0.xsd";
            ShipmentStatus.Attributes.SetNamedItem(attr);
            doc.AppendChild(ShipmentStatus);
            #endregion

            #region Envelope
            {
                XmlNode envelope = doc.CreateElement("Envelope");
                ShipmentStatus.AppendChild(envelope);

                XmlNode envelopeNode = doc.CreateElement("SenderID");
                envelopeNode.InnerText = "edi_mesco_prod";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("ReceiverID");
                envelopeNode.InnerText = "DEHAM01";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Password");
                envelopeNode.InnerText = "test";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Type");
                envelopeNode.InnerText = "Shipment_Status_XML_1.1.0";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Version");
                envelopeNode.InnerText = "1.1.0";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("EnvelopeID");
                envelopeNode.InnerText = GetEnvelopeID();
                envelope.AppendChild(envelopeNode);
            }
            #endregion FileBLEnvelope

            #region ShipmentStatusDetails

            XmlNode ShipmentStatusDetails = doc.CreateElement("ShipmentStatusDetails");
            ShipmentStatus.AppendChild(ShipmentStatusDetails);

            XmlNode node = doc.CreateElement("ApplicationType");
            node.InnerText = "WE";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("TypeOfMove");
            node.InnerText = "L";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("ShipperReference");
            node.InnerText = "TEST52840801600";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("ForwarderReference");
            node.InnerText = "";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("ConsigneeReference");
            node.InnerText = "";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("CommunicationReference");
            node.InnerText = "TEST15213272001";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("PickupReference");
            node.InnerText = "";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("BookingNumber");
            node.InnerText = "TESTCMB560491";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("WWAShipmentReference");
            node.InnerText = "2983864363";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("LotNumber");
            node.InnerText = "TESTCMB560491";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("HouseBillOfLadingNumber");
            node.InnerText = "TESTCGP206618";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("CarrierBookingNumber");
            node.InnerText = "";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("CarrierBillofladingNumber");
            node.InnerText = "";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("FileNumber");
            node.InnerText = "";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("ReleaseType");
            node.InnerText = "E";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("ArrivalNoticeNumber");
            node.InnerText = "";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("ContainerNumber");
            node.InnerText = "TEST9391734";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("ContainerSize");
            node.InnerText = "123";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("ContainerType");
            node.InnerText = "HC";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("ContainerCode");
            node.InnerText = "45GP";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("SealNumber");
            node.InnerText = "TEST0108321";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("OceanVessel");
            node.InnerText = "COSCO BEIJING";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("Voyage");
            node.InnerText = "123TEST";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("IMONumber");
            node.InnerText = "56756756";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("CustomerAlias");
            node.InnerText = "BLUEANCHOR";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("StatusCode");
            node.InnerText = "40";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("StatusLocationCode");
            node.InnerText = "DEHAM";
            ShipmentStatusDetails.AppendChild(node);

            node = doc.CreateElement("StatusLocationName");
            node.InnerText = "HAMBURG";
            ShipmentStatusDetails.AppendChild(node);

            #endregion

            #region RoutingDetails
            
            XmlNode RoutingDetails = doc.CreateElement("RoutingDetails");
            ShipmentStatusDetails.AppendChild(RoutingDetails);

            node = doc.CreateElement("ReceivingWarehouse");
            node.InnerText = "DEBRE";
            RoutingDetails.AppendChild(node);

            node = doc.CreateElement("CutoffReceivingWarehouse");
            node.InnerText = "2014-07-30";
            RoutingDetails.AppendChild(node);

            node = doc.CreateElement("PlaceOfReceipt");
            node.InnerText = "DEBRE";
            RoutingDetails.AppendChild(node);

            node = doc.CreateElement("ETSPlaceOfReceipt");
            node.InnerText = "2014-08-04";
            RoutingDetails.AppendChild(node);

            node = doc.CreateElement("PortOfLoading");
            node.InnerText = "DEHAM";
            RoutingDetails.AppendChild(node);

            node = doc.CreateElement("ETSPortOfLoading");
            node.InnerText = "2014-08-04";
            RoutingDetails.AppendChild(node);

            node = doc.CreateElement("PortOfDischarge");
            node.InnerText = "BDCGP";
            RoutingDetails.AppendChild(node);

            node = doc.CreateElement("ETAPortOfDischarge");
            node.InnerText = "2014-09-05";
            RoutingDetails.AppendChild(node);

            node = doc.CreateElement("PlaceOfDelivery");
            node.InnerText = "BDCGP";
            RoutingDetails.AppendChild(node);

            node = doc.CreateElement("ETAPlaceOfDelivery");
            node.InnerText = "2014-09-05";
            RoutingDetails.AppendChild(node);

            #endregion

            #region StatusDateTimeDetails

            XmlNode StatusDateTimeDetails = doc.CreateElement("StatusDateTimeDetails");
            ShipmentStatusDetails.AppendChild(StatusDateTimeDetails);

            node = doc.CreateElement("Date");
            node.InnerText = "2014-08-04";
            StatusDateTimeDetails.AppendChild(node);

            node = doc.CreateElement("Time");
            node.InnerText = "00:00:00";
            StatusDateTimeDetails.AppendChild(node);

            node = doc.CreateElement("TimeZone");
            node.InnerText = "CET";
            StatusDateTimeDetails.AppendChild(node);

            #endregion

            #region CargoDetails

            XmlNode CargoDetails = doc.CreateElement("CargoDetails");
            ShipmentStatusDetails.AppendChild(CargoDetails);

            node = doc.CreateElement("Pieces");
            node.InnerText = "3";
            CargoDetails.AppendChild(node);

            node = doc.CreateElement("WeightLBS");
            node.InnerText = "4087.370";
            CargoDetails.AppendChild(node);

            node = doc.CreateElement("VolumeCBF");
            node.InnerText = "131.724";
            CargoDetails.AppendChild(node);

            node = doc.CreateElement("WeightKG");
            node.InnerText = "1854.000";
            CargoDetails.AppendChild(node);

            node = doc.CreateElement("VolumeCBM");
            node.InnerText = "3.730";
            CargoDetails.AppendChild(node);

            node = doc.CreateElement("HazardousFlag");
            node.InnerText = "N";
            CargoDetails.AppendChild(node);

            #endregion

            #region DocumentationDetails

            XmlNode DocumentationDetails = doc.CreateElement("DocumentationDetails");
            ShipmentStatusDetails.AppendChild(DocumentationDetails);

            node = doc.CreateElement("Image");
            node.InnerText = "";
            DocumentationDetails.AppendChild(node);

            node = doc.CreateElement("ContentType");
            node.InnerText = "";
            DocumentationDetails.AppendChild(node);

            #endregion

            return new Object[] { doc.OuterXml };
        }
        object[] GenerateXML_Rate(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        object[] GenerateXML_FileBl(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            CvwOperations objCMasterOperation = new CvwOperations();
            checkException = objCMasterOperation.GetListPaging(9999, 1, " WHERE ID=" + pOperationID, "ID", out _RowCount);

            CvwOperationContainersAndPackages objCMasterOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            checkException = objCMasterOperationContainersAndPackages.GetListPaging(9999, 1, " WHERE OperationID=" + pOperationID, "ID", out _RowCount);


            CvwOperations objCChildOperations = new CvwOperations();
            checkException = objCChildOperations.GetListPaging(9999, 1, " WHERE MasterOperationID=" + pOperationID, "ID", out _RowCount);


            // Generate XML
            XmlDocument doc = new XmlDocument();
            XmlDeclaration xmldecl;
            xmldecl = doc.CreateXmlDeclaration("1.0", null, null);
            xmldecl.Encoding = "UTF-8";
            doc.AppendChild(xmldecl);
            #region FileBL
            XmlNode FileBL = doc.CreateElement("FileBL");
            XmlAttribute attr = doc.CreateAttribute("xmlns:xsi");
            attr.Value = "http://www.w3.org/2001/XMLSchema-instance";
            FileBL.Attributes.SetNamedItem(attr);
            attr = doc.CreateAttribute("xsi:noNameSpaceSchemaLocation");
            attr.Value = "http://www.wwalliance.com/wiki/images/5/51/WWA_File_BL_Version_1.1.0.xsd";
            FileBL.Attributes.SetNamedItem(attr);
            doc.AppendChild(FileBL);
            #endregion

            #region FileBLEnvelope
            {
                XmlNode envelope = doc.CreateElement("FileBLEnvelope");
                FileBL.AppendChild(envelope);

                XmlNode envelopeNode = doc.CreateElement("SenderID");
                envelopeNode.InnerText = "edi_mesco_prod";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("ReceiverID");
                envelopeNode.InnerText = "DEHAM01";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Password");
                envelopeNode.InnerText = "test";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Type");
                envelopeNode.InnerText = "FileBL";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Version");
                envelopeNode.InnerText = "1.1.0";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("EnvelopeID");
                envelopeNode.InnerText = GetEnvelopeID();
                envelope.AppendChild(envelopeNode);
            }
            #endregion FileBLEnvelope

            #region FileBLDetails
            {
                XmlNode FileBLDetails = doc.CreateElement("FileBLDetails");
                FileBL.AppendChild(FileBLDetails);

                XmlNode node = doc.CreateElement("FileNumber");
                node.InnerText = objCMasterOperation.lstCVarvwOperations[0].Code;
                FileBLDetails.AppendChild(node);

                node = doc.CreateElement("TypeOfMove");
                int ShipmentType = objCMasterOperation.lstCVarvwOperations[0].ShipmentType;
                node.InnerText = (ShipmentType == 1 || ShipmentType == 3) ? "F" : "L";
                FileBLDetails.AppendChild(node);

                node = doc.CreateElement("Coload");
                node.InnerText = "Y";
                FileBLDetails.AppendChild(node);

                node = doc.CreateElement("Mode");
                int TransportType = objCMasterOperation.lstCVarvwOperations[0].TransportType;
                node.InnerText = (TransportType == 1) ? "O" : "A";
                FileBLDetails.AppendChild(node);

                node = doc.CreateElement("MasterBLNumber");
                node.InnerText = objCMasterOperation.lstCVarvwOperations[0].MasterBL;
                FileBLDetails.AppendChild(node);

                node = doc.CreateElement("SenderEmail");
                node.InnerText = "";
                FileBLDetails.AppendChild(node);

                node = doc.CreateElement("MasterBarcodeNumber");
                node.InnerText = "";
                FileBLDetails.AppendChild(node);

                #region SailingDetails 
                {
                    XmlNode SailingDetails = doc.CreateElement("SailingDetails");
                    FileBLDetails.AppendChild(SailingDetails);

                    node = doc.CreateElement("ImoNumber");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].IMOClass.ToString();
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("SCAC");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].ShippingLineCode;
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("VesselName");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].VesselName;
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("Voyage");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].VoyageOrTruckNumber;
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("EtdOrigin");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].ExpectedDeparture.ToString("yyyy-MM-dd");
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("EtsLoadPort");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].ExpectedDeparture.ToString("yyyy-MM-dd");
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("EtaTransshipmentPort1");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].ExpectedArrival.ToString("yyyy-MM-dd");
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("EtaTransshipmentPort2");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].ExpectedArrival.ToString("yyyy-MM-dd");
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("EtaTransshipmentPort3");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].ExpectedArrival.ToString("yyyy-MM-dd");
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("EtaDischarge");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].ExpectedArrival.ToString("yyyy-MM-dd");
                    SailingDetails.AppendChild(node);

                    node = doc.CreateElement("EtaFinalDestination");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].ExpectedArrival.ToString("yyyy-MM-dd");
                    SailingDetails.AppendChild(node);

                }
                #endregion SailingDetails

                #region RoutingDetails 
                {
                    XmlNode RoutingDetails = doc.CreateElement("RoutingDetails");
                    FileBLDetails.AppendChild(RoutingDetails);

                    node = doc.CreateElement("OriginCode");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].POLCode;
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("OriginName");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].POLName;
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("LoadCode");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].POLCode;
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("LoadName");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].POLName;
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("TransshipmentPort1");
                    node.InnerText = "";
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("TransshipmentPort1Name");
                    node.InnerText = "";
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("TransshipmentPort2");
                    node.InnerText = "";
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("TransshipmentPort2Name");
                    node.InnerText = "";
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("TransshipmentPort3");
                    node.InnerText = "";
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("TransshipmentPort3Name");
                    node.InnerText = "";
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("DischargeCode");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].PODCode;
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("DischargeName");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].PODName;
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("DestinationCode");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].PODCode;
                    RoutingDetails.AppendChild(node);

                    node = doc.CreateElement("DestinationName");
                    node.InnerText = objCMasterOperation.lstCVarvwOperations[0].PODName;
                    RoutingDetails.AppendChild(node);
                }
                #endregion RoutingDetails

                #region ContainerDetails of Master Operation
                {
                    foreach (var item in objCMasterOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
                    {
                        XmlNode ContainerDetails = doc.CreateElement("ContainerDetails");
                        FileBLDetails.AppendChild(ContainerDetails);

                        node = doc.CreateElement("ContainerNumber");
                        node.InnerText = item.ContainerNumber;
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("SealNumber");
                        node.InnerText = item.CarrierSeal;
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("ContainerSize");
                        node.InnerText = item.ContainerSizeCode;
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("ContainerType");
                        node.InnerText = item.ContainerTypeCode;
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("Weight");
                        node.InnerText = item.GrossWeight.ToString();
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("Volume");
                        node.InnerText = item.Volume.ToString();
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("UOM");
                        node.InnerText = "M";
                        ContainerDetails.AppendChild(node);
                    }

                    // Generate Empty Tags incase there is no Containers in The Master Operation
                    if (objCMasterOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count == 0)
                    {
                        XmlNode ContainerDetails = doc.CreateElement("ContainerDetails");
                        FileBLDetails.AppendChild(ContainerDetails);

                        node = doc.CreateElement("ContainerNumber");
                        node.InnerText = "";
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("SealNumber");
                        node.InnerText = "";
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("ContainerSize");
                        node.InnerText = "";
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("ContainerType");
                        node.InnerText = "";
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("Weight");
                        node.InnerText = "";
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("Volume");
                        node.InnerText = "";
                        ContainerDetails.AppendChild(node);

                        node = doc.CreateElement("UOM");
                        node.InnerText = "";
                        ContainerDetails.AppendChild(node);
                    }
                }
                #endregion ContainerDetails of Master Operation

                #region BillOfLadingDetails
                {
                    foreach (var ChildOperation in objCChildOperations.lstCVarvwOperations)
                    {
                        XmlNode BillOfLadingDetails = doc.CreateElement("BillOfLadingDetails");
                        FileBLDetails.AppendChild(BillOfLadingDetails);

                        node = doc.CreateElement("BillOfLadingNumber");
                        node.InnerText = ChildOperation.HouseNumber;
                        BillOfLadingDetails.AppendChild(node);

                        node = doc.CreateElement("CustomerAlias");
                        node.InnerText = "";
                        BillOfLadingDetails.AppendChild(node);

                        node = doc.CreateElement("Type");
                        node.InnerText = ChildOperation.ShipmentType == 2 || ChildOperation.ShipmentType == 2 ? "L" : "H";
                        BillOfLadingDetails.AppendChild(node);

                        node = doc.CreateElement("ReleaseType");
                        node.InnerText = "E";
                        BillOfLadingDetails.AppendChild(node);

                        node = doc.CreateElement("FPI");
                        node.InnerText = ChildOperation.POrCCode;
                        BillOfLadingDetails.AppendChild(node);

                        node = doc.CreateElement("NumberOfOriginals");
                        node.InnerText = ChildOperation.NumberOfOriginalBills.ToString();
                        BillOfLadingDetails.AppendChild(node);

                        node = doc.CreateElement("Terms");
                        node.InnerText = ChildOperation.IncotermCode;
                        BillOfLadingDetails.AppendChild(node);

                        node = doc.CreateElement("BLReleasePoint");
                        node.InnerText = ChildOperation.POLName;
                        BillOfLadingDetails.AppendChild(node);

                        node = doc.CreateElement("HBLDocumentURL");
                        node.InnerText = "";
                        BillOfLadingDetails.AppendChild(node);

                        #region DocumentationDetails
                        {
                            XmlNode DocumentationDetails = doc.CreateElement("DocumentationDetails");
                            BillOfLadingDetails.AppendChild(DocumentationDetails);

                            node = doc.CreateElement("DocumentType");
                            node.InnerText = "";
                            DocumentationDetails.AppendChild(node);

                            node = doc.CreateElement("ContentType");
                            node.InnerText = "";
                            DocumentationDetails.AppendChild(node);

                            node = doc.CreateElement("ImageURL");
                            node.InnerText = "";
                            DocumentationDetails.AppendChild(node);
                        }
                        #endregion DocumentationDetails

                        #region ReferenceDetails
                        {
                            XmlNode ReferenceDetails = doc.CreateElement("ReferenceDetails");
                            BillOfLadingDetails.AppendChild(ReferenceDetails);

                            node = doc.CreateElement("ShipperReference");
                            node.InnerText = "";
                            ReferenceDetails.AppendChild(node);

                            node = doc.CreateElement("ConsigneeReference");
                            node.InnerText = "";
                            ReferenceDetails.AppendChild(node);

                            node = doc.CreateElement("NotifyReference");
                            node.InnerText = "";
                            ReferenceDetails.AppendChild(node);

                            node = doc.CreateElement("ForwarderReference");
                            node.InnerText = "";
                            ReferenceDetails.AppendChild(node);

                            node = doc.CreateElement("CustomsReference");
                            node.InnerText = "";
                            ReferenceDetails.AppendChild(node);
                        }
                        #endregion ReferenceDetails

                        #region ACID
                        node = doc.CreateElement("ACIDFlag");
                        node.InnerText = "";
                        BillOfLadingDetails.AppendChild(node);

                        XmlNode ACIDDetails = doc.CreateElement("ACIDDetails");
                        BillOfLadingDetails.AppendChild(ACIDDetails);

                        node = doc.CreateElement("ACID");
                        node.InnerText = "";
                        ACIDDetails.AppendChild(node);

                        node = doc.CreateElement("ExporterRegistry");
                        node.InnerText = "";
                        ACIDDetails.AppendChild(node);

                        node = doc.CreateElement("ImporterVat");
                        node.InnerText = "";
                        ACIDDetails.AppendChild(node);

                        node = doc.CreateElement("ExporterVAT");
                        node.InnerText = "";
                        ACIDDetails.AppendChild(node);

                        node = doc.CreateElement("ExporterCountryCode");
                        node.InnerText = "";
                        ACIDDetails.AppendChild(node);
                        #endregion

                        #region AddressDetails
                        {
                            #region Shipper
                            // Shipper
                            if (ChildOperation.ShipperID != 0)
                            {
                                CvwAddresses objCChildOperationShipperAddress = new CvwAddresses();
                                checkException = objCChildOperationShipperAddress.GetListPaging(9999, 1, " WHERE PartnerID=" + ChildOperation.ShipperID + " AND PartnerTypeID=1 AND AddressTypeID=1 ", "ID", out _RowCount);

                                XmlNode AddressDetails = doc.CreateElement("AddressDetails");
                                BillOfLadingDetails.AppendChild(AddressDetails);

                                node = doc.CreateElement("AddressID");
                                node.InnerText = "SH";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Name");
                                node.InnerText = ChildOperation.ShipperName;
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Address");
                                node.InnerText = ChildOperation.ShipperAddress;
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CityName");
                                node.InnerText = _RowCount > 0 ? objCChildOperationShipperAddress.lstCVarvwAddresses[0].CityName : "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("StateProvince");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("PostalCode");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CountryName");
                                node.InnerText = _RowCount > 0 ? objCChildOperationShipperAddress.lstCVarvwAddresses[0].CountryName : "";
                                AddressDetails.AppendChild(node);

                                #region GovtReferenceNumber
                                {
                                    XmlNode GovtReferenceNumber = doc.CreateElement("GovtReferenceNumber");
                                    AddressDetails.AppendChild(GovtReferenceNumber);

                                    node = doc.CreateElement("GovtRefType");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                    node = doc.CreateElement("GovtRefValue");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                }
                                #endregion GovtReferenceNumber
                            }
                            #endregion Shipper

                            #region Consignee
                            // Consignee
                            if (ChildOperation.ConsigneeID != 0)
                            {
                                CvwAddresses objCChildOperationConsigneeAddress = new CvwAddresses();
                                checkException = objCChildOperationConsigneeAddress.GetListPaging(9999, 1, " WHERE PartnerID=" + ChildOperation.ConsigneeID + " AND PartnerTypeID=1 AND AddressTypeID=1 ", "ID", out _RowCount);

                                XmlNode AddressDetails = doc.CreateElement("AddressDetails");
                                BillOfLadingDetails.AppendChild(AddressDetails);

                                node = doc.CreateElement("AddressID");
                                node.InnerText = "CN";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Name");
                                node.InnerText = ChildOperation.ConsigneeName;
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Address");
                                node.InnerText = ChildOperation.ConsigneeAddress;
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CityName");
                                node.InnerText = _RowCount > 0 ? objCChildOperationConsigneeAddress.lstCVarvwAddresses[0].CityName : "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("StateProvince");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("PostalCode");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CountryName");
                                node.InnerText = _RowCount > 0 ? objCChildOperationConsigneeAddress.lstCVarvwAddresses[0].CountryName : "";
                                AddressDetails.AppendChild(node);

                                #region GovtReferenceNumber
                                {
                                    XmlNode GovtReferenceNumber = doc.CreateElement("GovtReferenceNumber");
                                    AddressDetails.AppendChild(GovtReferenceNumber);

                                    node = doc.CreateElement("GovtRefType");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                    node = doc.CreateElement("GovtRefValue");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                }
                                #endregion GovtReferenceNumber
                            }
                            #endregion Consignee

                            #region Notify
                            // Notify
                            if (ChildOperation.Notify1Name != "" && ChildOperation.Notify1Name != "0")
                            {
                                CvwCustomers objCChildOperationNotifyCustomer = new CvwCustomers();
                                checkException = objCChildOperationNotifyCustomer.GetListPaging(9999, 1, " WHERE Name=N'" + ChildOperation.Notify1Name + "' ", "ID", out _RowCount);

                                CvwAddresses objCChildOperationNotifyAddress = new CvwAddresses();
                                checkException = objCChildOperationNotifyAddress.GetListPaging(9999, 1, " WHERE PartnerID=" + objCChildOperationNotifyCustomer.lstCVarvwCustomers[0].ID + " AND PartnerTypeID=1 AND AddressTypeID=1 ", "ID", out _RowCount);

                                XmlNode AddressDetails = doc.CreateElement("AddressDetails");
                                BillOfLadingDetails.AppendChild(AddressDetails);

                                node = doc.CreateElement("AddressID");
                                node.InnerText = "NP";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Name");
                                node.InnerText = ChildOperation.Notify1Name;
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Address");
                                node.InnerText = ChildOperation.Notify1Address;
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CityName");
                                node.InnerText = _RowCount > 0 ? objCChildOperationNotifyAddress.lstCVarvwAddresses[0].CityName : "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("StateProvince");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("PostalCode");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CountryName");
                                node.InnerText = _RowCount > 0 ? objCChildOperationNotifyAddress.lstCVarvwAddresses[0].CountryName : "";
                                AddressDetails.AppendChild(node);

                                #region GovtReferenceNumber
                                {
                                    XmlNode GovtReferenceNumber = doc.CreateElement("GovtReferenceNumber");
                                    AddressDetails.AppendChild(GovtReferenceNumber);

                                    node = doc.CreateElement("GovtRefType");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                    node = doc.CreateElement("GovtRefValue");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                }
                                #endregion GovtReferenceNumber
                            }
                            #endregion Notify

                            #region Agent
                            // Agent
                            if (ChildOperation.AgentID != 0)
                            {
                                CvwAddresses objCChildOperationAgentAddress = new CvwAddresses();
                                checkException = objCChildOperationAgentAddress.GetListPaging(9999, 1, " WHERE PartnerID=" + ChildOperation.AgentID + " AND PartnerTypeID=2 AND AddressTypeID=1 ", "ID", out _RowCount);

                                XmlNode AddressDetails = doc.CreateElement("AddressDetails");
                                BillOfLadingDetails.AppendChild(AddressDetails);

                                node = doc.CreateElement("AddressID");
                                node.InnerText = "SH";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Name");
                                node.InnerText = ChildOperation.AgentName;
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Address");
                                node.InnerText = "";// ChildOperation.AgentAddress;
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CityName");
                                node.InnerText = _RowCount > 0 ? objCChildOperationAgentAddress.lstCVarvwAddresses[0].CityName : "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("StateProvince");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("PostalCode");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CountryName");
                                node.InnerText = _RowCount > 0 ? objCChildOperationAgentAddress.lstCVarvwAddresses[0].CountryName : "";
                                AddressDetails.AppendChild(node);

                                #region GovtReferenceNumber
                                {
                                    XmlNode GovtReferenceNumber = doc.CreateElement("GovtReferenceNumber");
                                    AddressDetails.AppendChild(GovtReferenceNumber);

                                    node = doc.CreateElement("GovtRefType");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                    node = doc.CreateElement("GovtRefValue");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                }
                                #endregion GovtReferenceNumber
                            }
                            #endregion Agent

                            // Generate Empty Tags incase there is no Shipper, Consignee, Notify or Agent
                            #region Empty
                            // Agent
                            if (ChildOperation.ShipperID == 0 && ChildOperation.ConsigneeID == 0 && (ChildOperation.Notify1Name == "" || ChildOperation.Notify1Name == "0") && ChildOperation.AgentID == 0)
                            {
                                //CvwAddresses objCChildOperationAgentAddress = new CvwAddresses();
                                //checkException = objCChildOperationAgentAddress.GetListPaging(9999, 1, " WHERE PartnerID=" + ChildOperation.AgentID + " AND PartnerTypeID=2 AND AddressTypeID=1 ", "ID", out _RowCount);

                                XmlNode AddressDetails = doc.CreateElement("AddressDetails");
                                BillOfLadingDetails.AppendChild(AddressDetails);

                                node = doc.CreateElement("AddressID");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Name");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("Address");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CityName");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("StateProvince");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("PostalCode");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                node = doc.CreateElement("CountryName");
                                node.InnerText = "";
                                AddressDetails.AppendChild(node);

                                #region GovtReferenceNumber
                                {
                                    XmlNode GovtReferenceNumber = doc.CreateElement("GovtReferenceNumber");
                                    AddressDetails.AppendChild(GovtReferenceNumber);

                                    node = doc.CreateElement("GovtRefType");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                    node = doc.CreateElement("GovtRefValue");
                                    node.InnerText = "";
                                    GovtReferenceNumber.AppendChild(node);

                                }
                                #endregion GovtReferenceNumber
                            }
                            #endregion Empty
                        }
                        #endregion AddressDetails

                        #region RoutingDetails
                        {
                            XmlNode RoutingDetails = doc.CreateElement("RoutingDetails");
                            BillOfLadingDetails.AppendChild(RoutingDetails);

                            node = doc.CreateElement("OriginCode");
                            node.InnerText = ChildOperation.POLCode;
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("OriginName");
                            node.InnerText = ChildOperation.POLName;
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("EtdOrigin");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("LoadCode");
                            node.InnerText = ChildOperation.POLCode;
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("LoadName");
                            node.InnerText = ChildOperation.POLName;
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("EtsLoadPort");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("TransshipmentPort1");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("TransshipmentPort1Name");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("EtaTransshipmentPort1");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("TransshipmentPort2");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("TransshipmentPort2Name");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("EtaTransshipmentPort2");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("TransshipmentPort3");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("TransshipmentPort3Name");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("EtaTransshipmentPort3");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("DischargeCode");
                            node.InnerText = ChildOperation.PODCode;
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("DischargeName");
                            node.InnerText = ChildOperation.PODName;
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("EtaDischarge");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("DestinationCode");
                            node.InnerText = ChildOperation.PODCode;
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("DestinationName");
                            node.InnerText = ChildOperation.PODName;
                            RoutingDetails.AppendChild(node);

                            node = doc.CreateElement("EtaDestination");
                            node.InnerText = "";
                            RoutingDetails.AppendChild(node);
                        }
                        #endregion RoutingDetails

                        #region ContainerDetails
                        {
                            CvwOperationContainersAndPackages objCChildOperationContainersAndPackages = new CvwOperationContainersAndPackages();
                            checkException = objCChildOperationContainersAndPackages.GetListPaging(9999, 1, " WHERE OperationID=" + ChildOperation.ID, "ID", out _RowCount);

                            foreach (var item in objCChildOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
                            {
                                XmlNode ContainerDetails = doc.CreateElement("ContainerDetails");
                                BillOfLadingDetails.AppendChild(ContainerDetails);

                                node = doc.CreateElement("ContainerNumber");
                                node.InnerText = item.ContainerNumber;
                                ContainerDetails.AppendChild(node);

                                #region BookingDetails
                                {
                                    XmlNode BookingDetails = doc.CreateElement("BookingDetails");
                                    ContainerDetails.AppendChild(BookingDetails);

                                    node = doc.CreateElement("BookingStation");
                                    node.InnerText = "";
                                    BookingDetails.AppendChild(node);

                                    node = doc.CreateElement("BookingNumber");
                                    node.InnerText = item.BookingNumber;
                                    BookingDetails.AppendChild(node);

                                    node = doc.CreateElement("WWAShipmentReference");
                                    node.InnerText = "";
                                    BookingDetails.AppendChild(node);

                                    node = doc.CreateElement("LotNo");
                                    node.InnerText = item.LotNumber;
                                    BookingDetails.AppendChild(node);
                                }
                                #endregion BookingDetails

                                #region CargoDetails
                                {
                                    XmlNode CargoDetails = doc.CreateElement("CargoDetails");
                                    ContainerDetails.AppendChild(CargoDetails);

                                    node = doc.CreateElement("Pieces");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("BarcodeNumber");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("Packaging");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("Commodity");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("HSCode");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("NCM");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("Weight");
                                    node.InnerText = item.GrossWeight.ToString();
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("Volume");
                                    node.InnerText = item.Volume.ToString();
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("UOM");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("Marks");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    node = doc.CreateElement("CargoImageURL");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    #region Hazardous
                                    node = doc.CreateElement("HazardousFlag");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);

                                    XmlNode HazardousDetails = doc.CreateElement("HazardousDetails");
                                    CargoDetails.AppendChild(HazardousDetails);

                                    node = doc.CreateElement("HazardousClass");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("Flashpoint");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("FlashpointFlag");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("HazardousContent");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("ShippingName");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("UNNumber");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("PackingGroup");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("PackageCount");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("PackageType");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("NetWeight");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("EmergencyPhoneNumber");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);

                                    node = doc.CreateElement("HazCargoImageURL");
                                    node.InnerText = "";
                                    HazardousDetails.AppendChild(node);
                                    #endregion

                                }
                                #endregion CargoDetails

                            }

                            // Generate Empty Tags incase there is no Containers in The Child Operation
                            #region Empty Container in Child Operation

                            XmlNode ContainerDetailsEmpty = doc.CreateElement("ContainerDetails");
                            BillOfLadingDetails.AppendChild(ContainerDetailsEmpty);

                            node = doc.CreateElement("ContainerNumber");
                            node.InnerText = "";
                            ContainerDetailsEmpty.AppendChild(node);

                            #region BookingDetails
                            {
                                XmlNode BookingDetails = doc.CreateElement("BookingDetails");
                                ContainerDetailsEmpty.AppendChild(BookingDetails);

                                node = doc.CreateElement("BookingStation");
                                node.InnerText = "";
                                BookingDetails.AppendChild(node);

                                node = doc.CreateElement("BookingNumber");
                                node.InnerText = "";
                                BookingDetails.AppendChild(node);

                                node = doc.CreateElement("WWAShipmentReference");
                                node.InnerText = "";
                                BookingDetails.AppendChild(node);

                                node = doc.CreateElement("LotNo");
                                node.InnerText = "";
                                BookingDetails.AppendChild(node);
                            }
                            #endregion BookingDetails

                            #region CargoDetails
                            {
                                XmlNode CargoDetails = doc.CreateElement("CargoDetails");
                                ContainerDetailsEmpty.AppendChild(CargoDetails);

                                node = doc.CreateElement("Pieces");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("BarcodeNumber");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("Packaging");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("Commodity");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("HSCode");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("NCM");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("Weight");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("Volume");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("UOM");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("Marks");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("CargoImageURL");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);

                                node = doc.CreateElement("HazardousFlag");
                                node.InnerText = "";
                                CargoDetails.AppendChild(node);
                            }
                            #endregion CargoDetails

                            #endregion Empty Container in Child Operation

                        }
                        #endregion ContainerDetails

                        #region GeneralBlDetails
                        {
                            XmlNode GeneralBlDetails = doc.CreateElement("GeneralBlDetails");
                            BillOfLadingDetails.AppendChild(GeneralBlDetails);

                            node = doc.CreateElement("Marks");
                            node.InnerText = ChildOperation.MarksAndNumbers;
                            GeneralBlDetails.AppendChild(node);

                            node = doc.CreateElement("Description");
                            node.InnerText = ChildOperation.DescriptionOfGoods;
                            GeneralBlDetails.AppendChild(node);

                            node = doc.CreateElement("TaxID");
                            node.InnerText = "";
                            GeneralBlDetails.AppendChild(node);

                        }
                        #endregion GeneralBlDetails

                        #region ChargeDetails
                        XmlNode ChargeDetails = doc.CreateElement("ChargeDetails");
                        BillOfLadingDetails.AppendChild(ChargeDetails);

                        node = doc.CreateElement("ChargeCode");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("ChargeName");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("ChargeDescription");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("PrepaidCollect");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("Rate");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("Basis");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("ForeignAmount");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("ExchangeRate");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("LocalAmount");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("Currency");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);

                        node = doc.CreateElement("PCName");
                        node.InnerText = ChildOperation.Notes;
                        ChargeDetails.AppendChild(node);
                        #endregion

                        #region CommentDetails
                        {
                            XmlNode CommentDetails = doc.CreateElement("CommentDetails");
                            BillOfLadingDetails.AppendChild(CommentDetails);

                            node = doc.CreateElement("Remarks");
                            node.InnerText = ChildOperation.Notes;
                            CommentDetails.AppendChild(node);

                        }
                        #endregion CommentDetails
                    }

                }
                #endregion BillOfLadingDetails
            }
            #endregion FileBLDetails

            return new Object[] { doc.OuterXml };
        }
        object[] GenerateXML_InterAllianceBilling(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            CvwOperations objCMasterOperation = new CvwOperations();
            checkException = objCMasterOperation.GetListPaging(9999, 1, " WHERE ID=" + pOperationID, "ID", out _RowCount);

            CvwOperationContainersAndPackages objCMasterOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            checkException = objCMasterOperationContainersAndPackages.GetListPaging(9999, 1, " WHERE OperationID=" + pOperationID, "ID", out _RowCount);


            CvwOperations objCChildOperations = new CvwOperations();
            checkException = objCChildOperations.GetListPaging(9999, 1, " WHERE MasterOperationID=" + pOperationID, "ID", out _RowCount);

            #region Invoice
            XmlDocument doc = new XmlDocument();
            XmlDeclaration xmldecl;
            xmldecl = doc.CreateXmlDeclaration("1.0", null, null);
            xmldecl.Encoding = "UTF-8";
            doc.AppendChild(xmldecl);

            XmlNode Invoice = doc.CreateElement("Invoice");
            XmlAttribute attr = doc.CreateAttribute("xmlns:xsi");
            attr.Value = "http://www.w3.org/2001/XMLSchema-instance";
            Invoice.Attributes.SetNamedItem(attr);
            attr = doc.CreateAttribute("xsi:noNameSpaceSchemaLocation");
            attr.Value = "http://www.wwalliance.com/wiki/images/e/ed/WWA_IABInvoice_1.0.0.xsd";
            Invoice.Attributes.SetNamedItem(attr);
            doc.AppendChild(Invoice);
            #endregion

            #region Envelope
            {
                XmlNode envelope = doc.CreateElement("Envelope");
                Invoice.AppendChild(envelope);

                XmlNode envelopeNode = doc.CreateElement("SenderID");
                envelopeNode.InnerText = "edi_mesco_prod";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("ReceiverID");
                envelopeNode.InnerText = "HKHKG01";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Password");
                envelopeNode.InnerText = "test12345";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Type");
                envelopeNode.InnerText = "WWA_IABInvoice_1.0.0";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("Version");
                envelopeNode.InnerText = "1.1.0";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("EnvelopeID");
                envelopeNode.InnerText = GetEnvelopeID();
                envelope.AppendChild(envelopeNode);
            }
            #endregion

            #region InvoiceDetails

            XmlNode InvoiceDetails = doc.CreateElement("InvoiceDetails");
            Invoice.AppendChild(InvoiceDetails);

            XmlNode node = doc.CreateElement("SCAC");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("InvoiceOfficeCode");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("InvoiceNumber");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("Type");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("InvoiceMode");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("InvoiceApplyTo");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("ReferenceType");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("PayorReference");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("InvoiceDate");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("InvoiceDueDays");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("InvoiceDueDate");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("InvoiceAmount");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("InvoiceCurrency");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("ROE");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("LocalCurrency");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("Comments");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("FileNumber");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("MasterBillOfLadingNumber");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("HouseBillOfLadingNumber");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            node = doc.CreateElement("ArrivalNoticeNumber");
            node.InnerText = "";
            InvoiceDetails.AppendChild(node);

            #endregion

            #region InvoicePartnerDetails

            XmlNode InvoicePartnerDetails = doc.CreateElement("InvoicePartnerDetails");
            InvoiceDetails.AppendChild(InvoicePartnerDetails);
            
            #endregion

            #region IssuerDetails

            XmlNode IssuerDetails = doc.CreateElement("IssuerDetails");
            InvoicePartnerDetails.AppendChild(IssuerDetails);

            node = doc.CreateElement("Name");
            node.InnerText = "";
            IssuerDetails.AppendChild(node);

            node = doc.CreateElement("Address");
            node.InnerText = "";
            IssuerDetails.AppendChild(node);

            node = doc.CreateElement("DeliverTo");
            node.InnerText = "";
            IssuerDetails.AppendChild(node);

            node = doc.CreateElement("City");
            node.InnerText = "";
            IssuerDetails.AppendChild(node);

            node = doc.CreateElement("PostalCode");
            node.InnerText = "";
            IssuerDetails.AppendChild(node);

            node = doc.CreateElement("StateProvince");
            node.InnerText = "";
            IssuerDetails.AppendChild(node);

            node = doc.CreateElement("Country");
            node.InnerText = "";
            IssuerDetails.AppendChild(node);

            node = doc.CreateElement("Phone");
            node.InnerText = "";
            IssuerDetails.AppendChild(node);

            node = doc.CreateElement("Email");
            node.InnerText = "";
            IssuerDetails.AppendChild(node);

            #endregion

            #region PayorDetails

            XmlNode PayorDetails = doc.CreateElement("PayorDetails");
            InvoicePartnerDetails.AppendChild(PayorDetails);

            node = doc.CreateElement("Name");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            node = doc.CreateElement("PayorContact");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            node = doc.CreateElement("Address");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            node = doc.CreateElement("DeliverTo");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            node = doc.CreateElement("City");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            node = doc.CreateElement("PostalCode");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            node = doc.CreateElement("StateProvince");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            node = doc.CreateElement("Country");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            node = doc.CreateElement("Phone");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            node = doc.CreateElement("Email");
            node.InnerText = "";
            PayorDetails.AppendChild(node);

            #endregion

            #region ChargeDetails

            foreach (var subOperation in objCChildOperations.lstCVarvwOperations)
            {
                XmlNode ChargeDetails = doc.CreateElement("ChargeDetails");
                InvoiceDetails.AppendChild(ChargeDetails);

                node = doc.CreateElement("ChargeCode");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("ChargeName");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("ChargeDescription");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("Rate");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("Quantity");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("Basis");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("ForeignCurrency");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("ROE");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("LocalCurrency");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("LocalAmount");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);

                node = doc.CreateElement("Tax");
                node.InnerText = "";
                ChargeDetails.AppendChild(node);
            }

            #endregion

            #region TotalAmountDetails

            XmlNode TotalAmountDetails = doc.CreateElement("TotalAmountDetails");
            InvoiceDetails.AppendChild(TotalAmountDetails);

            node = doc.CreateElement("LocalCurrency");
            node.InnerText = "";
            TotalAmountDetails.AppendChild(node);

            node = doc.CreateElement("LocalAmountExclTax");
            node.InnerText = "";
            TotalAmountDetails.AppendChild(node);

            node = doc.CreateElement("LocalAmount");
            node.InnerText = "";
            TotalAmountDetails.AppendChild(node);

            node = doc.CreateElement("ROE");
            node.InnerText = "";
            TotalAmountDetails.AppendChild(node);

            node = doc.CreateElement("ForeignCurrency");
            node.InnerText = "";
            TotalAmountDetails.AppendChild(node);

            #endregion

            #region CargoDetails

            foreach (var subOperation in objCChildOperations.lstCVarvwOperations)
            {
                XmlNode CargoDetails = doc.CreateElement("CargoDetails");
                InvoiceDetails.AppendChild(CargoDetails);

                node = doc.CreateElement("Pieces");
                node.InnerText = "";
                CargoDetails.AppendChild(node);

                node = doc.CreateElement("Packaging");
                node.InnerText = "";
                CargoDetails.AppendChild(node);

                node = doc.CreateElement("Commodity");
                node.InnerText = "";
                CargoDetails.AppendChild(node);

                node = doc.CreateElement("Weight");
                node.InnerText = "";
                CargoDetails.AppendChild(node);

                node = doc.CreateElement("Volume");
                node.InnerText = "";
                CargoDetails.AppendChild(node);

                node = doc.CreateElement("UOM");
                node.InnerText = "";
                CargoDetails.AppendChild(node);
                
            }

            #endregion

            #region InvoiceDocumentation

            XmlNode InvoiceDocumentation = doc.CreateElement("InvoiceDocumentation");
            InvoiceDetails.AppendChild(InvoiceDocumentation);

            node = doc.CreateElement("ImageLink");
            node.InnerText = "";
            InvoiceDocumentation.AppendChild(node);

            node = doc.CreateElement("Image");
            node.InnerText = "";
            InvoiceDocumentation.AppendChild(node);

            node = doc.CreateElement("ContentType");
            node.InnerText = "";
            InvoiceDocumentation.AppendChild(node);

            #endregion

            return new Object[] { doc.OuterXml };
        }
        object[] GenerateXML_InvoiceAcknowledgement(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        object[] GenerateXML_InformationBroker(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        object[] GenerateXML_EIManagement(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        object[] GenerateXML_WWAAcknowledgement(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        object[] GenerateXML_CargoManagement(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        object[] GenerateXML_DataWarehouse(string pOperationID)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            return new Object[] { "" };
        }
        #endregion


        #region Reading
        [HttpGet, HttpPost]
        public Object[] InsertFromXML([FromBody] XMLDataToRead XMLDataToRead)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(XMLDataToRead.pXMLData);
            string jsonText = JsonConvert.SerializeXmlNode(doc);



            Serializer ser = new Serializer();
            string xmlInputData = string.Empty;
            string xmlOutputData = string.Empty;

            #region Comments
            ///****** Schedule Start ******/
            //Schedule schedule = ser.Deserialize<Schedule>(XMLDataToRead.pXMLData);
            //xmlOutputData = ser.Serialize<Schedule>(schedule);
            //if (checkException != null)
            //    _ReturnedMessage = checkException.Message;
            //return new object[]
            //{
            //    _ReturnedMessage
            //    , schedule
            //    , xmlOutputData
            //};
            ///****** Schedule End ******/



            ///****** ShipmentStatus Start ******/
            //ShipmentStatus ShipmentStatus = ser.Deserialize<ShipmentStatus>(XMLDataToRead.pXMLData);
            //xmlOutputData = ser.Serialize<ShipmentStatus>(ShipmentStatus);
            //if (checkException != null)
            //    _ReturnedMessage = checkException.Message;
            //return new object[]
            //{
            //    _ReturnedMessage
            //    , ShipmentStatus
            //    , xmlOutputData
            //};
            ///****** ShipmentStatus End ******/

            ///****** IABOriginalStandardInvoice Start ******/
            //Invoice Invoice = ser.Deserialize<Invoice>(XMLDataToRead.pXMLData);
            //xmlOutputData = ser.Serialize<Invoice>(Invoice);
            //if (checkException != null)
            //    _ReturnedMessage = checkException.Message;
            //return new object[]
            //{
            //    _ReturnedMessage
            //    , Invoice
            //    , xmlOutputData
            //};
            ///****** IABOriginalStandardInvoice End ******/
            #endregion



            /****** FileBL Start ******/
            FileBL FileBL = ser.Deserialize<FileBL>(XMLDataToRead.pXMLData);
            xmlOutputData = ser.Serialize<FileBL>(FileBL);
            if (checkException != null)
                _ReturnedMessage = checkException.Message;

            #region ShippingLine
            int shippingLineId = 0;
            CShippingLines objCShippingLines = new CShippingLines();
            objCShippingLines.GetList($" where code = '{FileBL.FileBLDetails.SailingDetails.SCAC}' ");
            if (objCShippingLines.lstCVarShippingLines.Count > 0)
            {
                shippingLineId = objCShippingLines.lstCVarShippingLines[0].ID;
            }
            else
            {
                CVarShippingLines objCVarShippingLines = new CVarShippingLines
                {
                    Code = FileBL.FileBLDetails.SailingDetails.SCAC,
                    Name = FileBL.FileBLDetails.SailingDetails.SCAC,
                    LocalName = FileBL.FileBLDetails.SailingDetails.SCAC,
                    CreatorUserID = WebSecurity.CurrentUserId,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    TimeLocked = DateTime.Now,
                    BankAccountNumber = "",
                    BankAddress = "",
                    BankName = "",
                    IBANNumber = "",
                    Notes = "",
                    Swift = "",
                    VATNumber = "",
                    Website = "",
                    crmCode = "0",
                    Finance365Ref = "0",
                    BranchID = 0,
                    SalesmanID = 0,
                    SupplierID = 0
                };
                SetDefaults(objCVarShippingLines);
                objCShippingLines.lstCVarShippingLines.Add(objCVarShippingLines);
                checkException = objCShippingLines.SaveMethod(objCShippingLines.lstCVarShippingLines);
                if (checkException != null)
                {
                    _ReturnedMessage = checkException.Message;
                    return new object[]
                    {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                    };
                }
                shippingLineId = objCVarShippingLines.ID;
            }

            #endregion

            #region Vessel
            int vesselId = 0;
            CVessels objCVessels = new CVessels();
            objCVessels.GetList($" where name = '{FileBL.FileBLDetails.SailingDetails.VesselName}' ");
            if (objCVessels.lstCVarVessels.Count > 0)
            {
                vesselId = objCVessels.lstCVarVessels[0].ID;
            }
            else
            {
                CVarVessels objCVarVessels = new CVarVessels
                {
                    Code = FileBL.FileBLDetails.SailingDetails.VesselName,
                    Name = FileBL.FileBLDetails.SailingDetails.VesselName,
                    LocalName = FileBL.FileBLDetails.SailingDetails.VesselName,
                    CreatorUserID = WebSecurity.CurrentUserId,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    TimeLocked = DateTime.Now,
                    CallSign = "",
                    Notes = "",
                    ShippingLineID = shippingLineId
                };
                SetDefaults(objCVarVessels);
                objCVessels.lstCVarVessels.Add(objCVarVessels);
                checkException = objCVessels.SaveMethod(objCVessels.lstCVarVessels);
                if (checkException != null)
                {
                    _ReturnedMessage = checkException.Message;
                    return new object[]
                    {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                    };
                }
                vesselId = objCVarVessels.ID;
            }

            #endregion

            #region LoadPort
            int polId = 0;
            CPorts objLoadPort = new CPorts();
            objLoadPort.GetList($" where code = '{FileBL.FileBLDetails.RoutingDetails.LoadCode}' ");
            if (objLoadPort.lstCVarPorts.Count > 0)
            {
                polId = objLoadPort.lstCVarPorts[0].ID;
            }
            else
            {
                CVarPorts objVarLoadPort = new CVarPorts
                {
                    Code = FileBL.FileBLDetails.RoutingDetails.LoadCode,
                    Name = FileBL.FileBLDetails.RoutingDetails.LoadName,
                    LocalName = FileBL.FileBLDetails.RoutingDetails.LoadName,
                    CreatorUserID = WebSecurity.CurrentUserId,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    TimeLocked = DateTime.Now,
                    crmCode = ""
                };
                SetDefaults(objVarLoadPort);
                objLoadPort.lstCVarPorts.Add(objVarLoadPort);
                checkException = objLoadPort.SaveMethod(objLoadPort.lstCVarPorts);
                if (checkException != null)
                {
                    _ReturnedMessage = checkException.Message;
                    return new object[]
                    {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                    };
                }
                polId = objVarLoadPort.ID;
            }

            #endregion

            #region DischargePort
            int podId = 0;
            CPorts objDischargePort = new CPorts();
            objDischargePort.GetList($" where code = '{FileBL.FileBLDetails.RoutingDetails.DischargeCode}' ");
            if (objDischargePort.lstCVarPorts.Count > 0)
            {
                podId = objDischargePort.lstCVarPorts[0].ID;
            }
            else
            {
                CVarPorts objVarDischargePort = new CVarPorts
                {
                    Code = FileBL.FileBLDetails.RoutingDetails.DischargeCode,
                    Name = FileBL.FileBLDetails.RoutingDetails.DischargeName,
                    LocalName = FileBL.FileBLDetails.RoutingDetails.DischargeName,
                    CreatorUserID = WebSecurity.CurrentUserId,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    TimeLocked = DateTime.Now,
                    crmCode = ""
                };
                SetDefaults(objVarDischargePort);
                objDischargePort.lstCVarPorts.Add(objVarDischargePort);
                checkException = objDischargePort.SaveMethod(objDischargePort.lstCVarPorts);
                if (checkException != null)
                {
                    _ReturnedMessage = checkException.Message;
                    return new object[]
                    {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                    };
                }
                podId = objVarDischargePort.ID;
            }

            #endregion

            #region ShipmentType
            int shipmentTypeId = 0;
            string shipmentTypeCode = FileBL.FileBLDetails.TypeOfMove == "F" ? "FCL" : FileBL.FileBLDetails.TypeOfMove == "L" ? "LCL" : "";
            CNoAccessShipmentTypes objCNoAccessShipmentTypes = new CNoAccessShipmentTypes();
            objCNoAccessShipmentTypes.GetList($" where Code = '{shipmentTypeCode}' ");
            if (objCNoAccessShipmentTypes.lstCVarNoAccessShipmentTypes.Count > 0)
            {
                shipmentTypeId = objCNoAccessShipmentTypes.lstCVarNoAccessShipmentTypes[0].ID;
            }
            else
            {
                _ReturnedMessage = $"TypeOfMove({FileBL.FileBLDetails.TypeOfMove}) not exists!";
                return new object[]
                {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                };
            }

            #endregion

            #region TransportType
            int transportTypeId = 0;
            string transportTypeCode = FileBL.FileBLDetails.Mode == "O" ? "Ocean" : FileBL.FileBLDetails.Mode == "A" ? "Air" : "";
            CNoAccessTransportTypes CNoAccessTransportTypes = new CNoAccessTransportTypes();
            CNoAccessTransportTypes.GetList($" where Code = '{transportTypeCode}' ");
            if (CNoAccessTransportTypes.lstCVarNoAccessTransportTypes.Count > 0)
            {
                transportTypeId = CNoAccessTransportTypes.lstCVarNoAccessTransportTypes[0].ID;
            }
            else
            {
                _ReturnedMessage = $"Mode({FileBL.FileBLDetails.Mode}) not exists!";
                return new object[]
                {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                };
            }
            #endregion

            #region Defaults
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList($" where ID = (select max(ID) from Defaults) ");

            #endregion

            #region MasterOpration
            COperations objMasterOperation = new COperations();
            CVarOperations objVarMasterOperation = new CVarOperations
            {
                Code = FileBL.FileBLDetails.FileNumber,
                ShipmentType = shipmentTypeId,
                TransportType = transportTypeId,
                MasterBL = FileBL.FileBLDetails.MasterBLNumber,
                IMOClass = Convert.ToDecimal(FileBL.FileBLDetails.SailingDetails.ImoNumber),
                ShippingLineID = shippingLineId,
                VesselID = vesselId,
                POL = polId,
                POD = podId,
                CreatorUserID = WebSecurity.CurrentUserId,
                ModificatorUserID = WebSecurity.CurrentUserId,
                CreationDate = DateTime.Now,
                ModificationDate = DateTime.Now,
                BLDate = DateTime.Now,
                ClearanceApprovalDate = DateTime.Now,
                CutOffDate = DateTime.Now,
                FlightDate1 = DateTime.Now,
                FlightDate2 = DateTime.Now,
                FlightDate3 = DateTime.Now,
                FreightApprovalDate = DateTime.Now,
                GuaranteeLetterDate = DateTime.Now,
                HBLDate = DateTime.Now,
                OpenDate = DateTime.Now,
                CloseDate = new DateTime(2050, 1, 1),
                PODate = DateTime.Now,
                ReleaseDate = DateTime.Now,
                ShippedOnBoardDate = DateTime.Now,
                TruckingApprovalDate = DateTime.Now,
                BranchID = objCDefaults.lstCVarDefaults[0].BranchID,
                SalesmanID = WebSecurity.CurrentUserId,
                BLType = 3,
                BLTypeIconName = "fa-book",
                BLTypeIconStyle = "master-icon-style",
                DirectionType = 1,
                DirectionIconName = "fa-arrow-circle-down",
                DirectionIconStyle = "import-icon-style",
                TransportIconName = transportTypeId == 1 ? "fa-anchor" : "fa-plane",
                TransportIconStyle = transportTypeId == 1 ? "ocean-icon-style" : "air-icon-style",
                StoreLocation = 0,
                BlStatus ="",
                ForwarderId = 0,
                PrintHouseConsignee = false,
                HoldReason = "",
                DORepresentative = "",
                DOPrintedON = new DateTime(1900, 1, 1),
                DeliveryCustomer = "",
                FileAccountingDate = new DateTime(1900, 1, 1),
                ManifestPreConsignee = "" ,
                POTID = 0,
                HouseContainerNumber = "",
                Form13Notes = "0"
            };
            SetDefaults(objVarMasterOperation);
            objMasterOperation.lstCVarOperations.Add(objVarMasterOperation);
            checkException = objMasterOperation.SaveMethod(objMasterOperation.lstCVarOperations);
            if (checkException != null)
            {
                _ReturnedMessage = checkException.Message;
                return new object[]
                {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                };
            }
            #endregion

            #region Routing
            CRoutings objCRoutings = new CRoutings();
            CVarRoutings objCVarRoutings = new CVarRoutings
            {
                OperationID = objVarMasterOperation.ID,
                VoyageOrTruckNumber = FileBL.FileBLDetails.SailingDetails.Voyage,
                ExpectedDeparture = Convert.ToDateTime(FileBL.FileBLDetails.SailingDetails.EtdOrigin),
                ExpectedArrival = Convert.ToDateTime(FileBL.FileBLDetails.SailingDetails.EtaDischarge),
                CreatorUserID = WebSecurity.CurrentUserId,
                ModificatorUserID = WebSecurity.CurrentUserId,
                CreationDate = DateTime.Now,
                ModificationDate = DateTime.Now,
                RoutingTypeID = 30,
                TransportType = transportTypeId,
                TransportIconName = transportTypeId == 1 ? "fa-anchor" : "fa-plane",
                TransportIconStyle = transportTypeId == 1 ? "ocean-icon-style" : "air-icon-style",
                POL = polId,
                POD = podId,
                CCMainWarehouseID = 0,
                CCWarehouseETA = DateTime.Parse("01/01/1900"),
                CCWarehouseATD = DateTime.Parse("01/01/1900"),
                CCIsDone = false,
                CustomerWarehouseManagerName = "0",
                CustomerWarehouseManagerPhone = "0",
                TruckingEquipmentID = 0,
                ConcedeCompanyName = "",
                ConcedeNumber = "",
                ConcedeQty = 0,
                ConcedeTotalQty = 0,
                WarehouseID = 0,
              
                
            };
            SetDefaults(objCVarRoutings);
            objCRoutings.lstCVarRoutings.Add(objCVarRoutings);
            checkException = objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);
            if (checkException != null)
            {
                _ReturnedMessage = checkException.Message;
                return new object[]
                {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                };
            }
            #endregion

            #region Containers
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            foreach (var item in FileBL.FileBLDetails.ContainerDetailsAllMaster)
            {
                //Size
                int containerSizeId = 0;
                CNoAccessCSizes objCNoAccessCSizes = new CNoAccessCSizes();
                objCNoAccessCSizes.GetList($" where Code = '{item.ContainerSize}' ");
                if (objCNoAccessCSizes.lstCVarNoAccessCSizes.Count > 0)
                {
                    containerSizeId = objCNoAccessCSizes.lstCVarNoAccessCSizes[0].ID;
                }
                else
                {
                    _ReturnedMessage = $"ContainerSize({item.ContainerSize}) not exists!";
                    return new object[]
                    {
                     _ReturnedMessage
                     , FileBL
                     , xmlOutputData
                    };
                }


                //Type
                int containerTypeId = 0;
                CContainerTypes objCContainerTypes = new CContainerTypes();
                objCContainerTypes.GetList($" where code = '{item.ContainerType}' ");
                if (objCContainerTypes.lstCVarContainerTypes.Count > 0)
                {
                    containerTypeId = objCContainerTypes.lstCVarContainerTypes[0].ID;
                }
                else
                {
                    CVarContainerTypes objCVarContainerTypes = new CVarContainerTypes
                    {
                        Code = item.ContainerType,
                        CSizeID = containerSizeId,
                        CreatorUserID = WebSecurity.CurrentUserId,
                        ModificatorUserID = WebSecurity.CurrentUserId,
                        CreationDate = DateTime.Now,
                        ModificationDate = DateTime.Now,
                        TimeLocked = DateTime.Now,
                        crmCode = ""
                    };
                    SetDefaults(objCVarContainerTypes);
                    objCContainerTypes.lstCVarContainerTypes.Add(objCVarContainerTypes);
                    checkException = objCContainerTypes.SaveMethod(objCContainerTypes.lstCVarContainerTypes);
                    if (checkException != null)
                    {
                        _ReturnedMessage = checkException.Message;
                        return new object[]
                        {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                        };
                    }
                    containerTypeId = objCVarContainerTypes.ID;
                }


                //Container
                CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages
                {
                    ContainerTypeID = containerTypeId,
                    ContainerNumber = item.ContainerNumber,
                    CarrierSeal = item.SealNumber,
                    GrossWeight = Convert.ToDecimal(item.Weight),
                    Volume = Convert.ToDecimal(item.Volume),
                    CreatorUserID = WebSecurity.CurrentUserId,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now
                };
                SetDefaults(objCVarOperationContainersAndPackages);
                objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
            }
            checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
            if (checkException != null)
            {
                _ReturnedMessage = checkException.Message;
                return new object[]
                {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                };
            }
            #endregion

            #region BillOfLoading
            COperations objChildOperation = new COperations();
            foreach (var item in FileBL.FileBLDetails.BillOfLadingDetailsAll)
            {
                //ShippingLine
                objCShippingLines = new CShippingLines();
                objCShippingLines.GetList($" where code = '{item.Type}' ");
                if (objCShippingLines.lstCVarShippingLines.Count > 0)
                {
                    shippingLineId = objCShippingLines.lstCVarShippingLines[0].ID;
                }
                else
                {
                    CVarShippingLines objCVarShippingLines = new CVarShippingLines
                    {
                        Code = item.Type,
                        Name = item.Type,
                        LocalName = item.Type,
                        CreatorUserID = WebSecurity.CurrentUserId,
                        ModificatorUserID = WebSecurity.CurrentUserId,
                        CreationDate = DateTime.Now,
                        ModificationDate = DateTime.Now,
                        TimeLocked = DateTime.Now,
                        crmCode = "0",
                        Finance365Ref = "0",
                        BranchID = 0,
                        SalesmanID = 0,
                        SupplierID = 0
                    };
                    SetDefaults(objCVarShippingLines);
                    objCShippingLines.lstCVarShippingLines.Add(objCVarShippingLines);
                    checkException = objCShippingLines.SaveMethod(objCShippingLines.lstCVarShippingLines);
                    if (checkException != null)
                    {
                        _ReturnedMessage = checkException.Message;
                        return new object[]
                        {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                        };
                    }
                    shippingLineId = objCVarShippingLines.ID;
                }


                //NoAccessFreightTypes
                int frieghtTypeId = 0;
                CNoAccessFreightTypes objCNoAccessFreightTypes = new CNoAccessFreightTypes();
                objCNoAccessFreightTypes.GetList($" where code = '{item.FPI}' ");
                if (objCNoAccessFreightTypes.lstCVarNoAccessFreightTypes.Count > 0)
                {
                    frieghtTypeId = objCNoAccessFreightTypes.lstCVarNoAccessFreightTypes[0].ID;
                }
                else
                {
                    _ReturnedMessage = $"FPI({item.FPI}) not exists!";
                    return new object[]
                    {
                     _ReturnedMessage
                     , FileBL
                     , xmlOutputData
                    };
                }


                //LoadPort
                objLoadPort = new CPorts();
                objLoadPort.GetList($" where code = '{item.BLReleasePoint}' ");
                if (objLoadPort.lstCVarPorts.Count > 0)
                {
                    polId = objLoadPort.lstCVarPorts[0].ID;
                }
                else
                {
                    CVarPorts objVarLoadPort = new CVarPorts
                    {
                        Code = item.BLReleasePoint,
                        Name = item.BLReleasePoint,
                        LocalName = item.BLReleasePoint,
                        CreatorUserID = WebSecurity.CurrentUserId,
                        ModificatorUserID = WebSecurity.CurrentUserId,
                        CreationDate = DateTime.Now,
                        ModificationDate = DateTime.Now,
                        TimeLocked = DateTime.Now,
                        crmCode = ""
                    };
                    SetDefaults(objVarLoadPort);
                    objLoadPort.lstCVarPorts.Add(objVarLoadPort);
                    checkException = objLoadPort.SaveMethod(objLoadPort.lstCVarPorts);
                    if (checkException != null)
                    {
                        _ReturnedMessage = checkException.Message;
                        return new object[]
                        {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                        };
                    }
                    polId = objVarLoadPort.ID;
                }


                //Incoterms
                int incotermId = 0;
                CIncoterms objCIncoterms = new CIncoterms();
                objCIncoterms.GetList($" where code = '{item.Terms}' ");
                if (objCIncoterms.lstCVarIncoterms.Count > 0)
                {
                    incotermId = objCIncoterms.lstCVarIncoterms[0].ID;
                }
                else
                {
                    CVarIncoterms objCVarIncoterms = new CVarIncoterms
                    {
                        Code = item.Terms,
                        Name = item.Terms,
                        LocalName = item.Terms,
                        CreatorUserID = WebSecurity.CurrentUserId,
                        ModificatorUserID = WebSecurity.CurrentUserId,
                        CreationDate = DateTime.Now,
                        ModificationDate = DateTime.Now,
                        TimeLocked = DateTime.Now
                    };
                    SetDefaults(objCVarIncoterms);
                    objCIncoterms.lstCVarIncoterms.Add(objCVarIncoterms);
                    checkException = objCIncoterms.SaveMethod(objCIncoterms.lstCVarIncoterms);
                    if (checkException != null)
                    {
                        _ReturnedMessage = checkException.Message;
                        return new object[]
                        {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                        };
                    }
                    incotermId = objCVarIncoterms.ID;
                }


                //Address
                foreach (var address in item.AddressDetailsAll)
                {
                    int PartnerId = 0, PartnerTypeId = 0;
                    switch (address.AddressID)
                    {
                        case "SH":
                        case "CN":
                        case "NP":
                        case "FW":
                            CCustomers objCCustomers = new CCustomers();
                            CVarCustomers objCVarCustomers = new CVarCustomers
                            {
                                Name = address.Name,
                                LocalName = address.Name,
                                IsShipper = address.AddressID == "SH",
                                IsConsignee = address.AddressID == "CN",
                                CreatorUserID = WebSecurity.CurrentUserId,
                                ModificatorUserID = WebSecurity.CurrentUserId,
                                CreationDate = DateTime.Now,
                                ModificationDate = DateTime.Now,
                                TimeLocked = DateTime.Now,
                                AllProductsReserved = false,
                                ReservationReason = "",
                                MainClientID = 0,
                                IsHold = false,
                                HoldReason = "",
                                Finance365Ref = "",
                                OwnerId = 0,
                                OwnersIds = "",
                                BranchID = 0,
                                DebitorGroupID = 0,
                                Mobile = "0"
                            };
                            SetDefaults(objCVarCustomers);
                            objCCustomers.lstCVarCustomers.Add(objCVarCustomers);
                            checkException = objCCustomers.SaveMethod(objCCustomers.lstCVarCustomers);
                            if (checkException != null)
                            {
                                _ReturnedMessage = checkException.Message;
                                return new object[]
                                {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                                };
                            }
                            PartnerId = objCVarCustomers.ID;
                            PartnerTypeId = 1;
                            break;
                        case "AG":
                            CAgents objCAgents = new CAgents();
                            CVarAgents objCVarAgents = new CVarAgents
                            {
                                Name = address.Name,
                                LocalName = address.Name,
                                CreatorUserID = WebSecurity.CurrentUserId,
                                ModificatorUserID = WebSecurity.CurrentUserId,
                                CreationDate = DateTime.Now,
                                ModificationDate = DateTime.Now,
                                TimeLocked = DateTime.Now,
                                crmCode = "0",
                                Finance365Ref = "0",
                                BranchID = 0,
                                SalesmanID = 0,
                                SupplierID = 0
                            };
                            SetDefaults(objCVarAgents);
                            objCAgents.lstCVarAgents.Add(objCVarAgents);
                            checkException = objCAgents.SaveMethod(objCAgents.lstCVarAgents);
                            if (checkException != null)
                            {
                                _ReturnedMessage = checkException.Message;
                                return new object[]
                                {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                                };
                            }
                            PartnerId = objCVarAgents.ID;
                            PartnerTypeId = 2;
                            break;
                    }

                    int countryId = 0;
                    CCountries objCCountries = new CCountries();
                    objCCountries.GetList($" where name = '{address.CountryName}' ");
                    if (objCCountries.lstCVarCountries.Count > 0)
                    {
                        countryId = objCCountries.lstCVarCountries[0].ID;
                    }
                    else
                    {
                        CVarCountries objCVarCountries = new CVarCountries
                        {
                            Code = address.CountryName,
                            Name = address.CountryName,
                            LocalName = address.CountryName,
                            CreatorUserID = WebSecurity.CurrentUserId,
                            ModificatorUserID = WebSecurity.CurrentUserId,
                            CreationDate = DateTime.Now,
                            ModificationDate = DateTime.Now
                        };
                        SetDefaults(objCVarCountries);
                        objCCountries.lstCVarCountries.Add(objCVarCountries);
                        checkException = objCCountries.SaveMethod(objCCountries.lstCVarCountries);
                        if (checkException != null)
                        {
                            _ReturnedMessage = checkException.Message;
                            return new object[]
                            {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                            };
                        }
                        countryId = objCVarCountries.ID;
                    }


                    int cityId = 0;
                    CCities objCCities = new CCities();
                    objCCities.GetList($" where name = '{address.CityName}' ");
                    if (objCCities.lstCVarCities.Count > 0)
                    {
                        cityId = objCCities.lstCVarCities[0].ID;
                    }
                    else
                    {
                        CVarCities objCVarCities = new CVarCities
                        {
                            Code = address.CityName,
                            Name = address.CityName,
                            LocalName = address.CityName,
                            CountryID = countryId,
                            CreatorUserID = WebSecurity.CurrentUserId,
                            ModificatorUserID = WebSecurity.CurrentUserId,
                            CreationDate = DateTime.Now,
                            ModificationDate = DateTime.Now
                        };
                        SetDefaults(objCVarCities);
                        objCCities.lstCVarCities.Add(objCVarCities);
                        checkException = objCCities.SaveMethod(objCCities.lstCVarCities);
                        if (checkException != null)
                        {
                            _ReturnedMessage = checkException.Message;
                            return new object[]
                            {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                            };
                        }
                        cityId = objCVarCities.ID;
                    }


                    CAddresses objCAddresses = new CAddresses();
                    CVarAddresses objCVarAddresses = new CVarAddresses
                    {
                        AddressTypeID = 1,
                        PartnerID = PartnerId,
                        PartnerTypeID = PartnerTypeId,
                        StreetLine1 = address.Address,
                        CityID = cityId,
                        CountryID = countryId,
                        CreatorUserID = WebSecurity.CurrentUserId,
                        ModificatorUserID = WebSecurity.CurrentUserId,
                        CreationDate = DateTime.Now,
                        ModificationDate = DateTime.Now,
                        TimeLocked = DateTime.Now,
                        AdditionalAddress = "0"
                    };
                    SetDefaults(objCVarAddresses);
                    objCAddresses.lstCVarAddresses.Add(objCVarAddresses);
                    objCAddresses.SaveMethod(objCAddresses.lstCVarAddresses);
                    if (checkException != null)
                    {
                        _ReturnedMessage = checkException.Message;
                        return new object[]
                        {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                        };
                    }
                }


                //Operation
                CVarOperations objVarChilOperation = new CVarOperations
                {
                    MasterOperationID = objVarMasterOperation.ID,
                    HouseNumber = item.BillOfLadingNumber,
                    ShipmentType = shippingLineId,
                    NumberOfOriginalBills = Convert.ToInt32(item.NumberOfOriginals),
                    POrC = frieghtTypeId,
                    POL = polId,
                    POD = podId,
                    IncotermID = incotermId,
                    CreatorUserID = WebSecurity.CurrentUserId,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now,
                    CloseDate = new DateTime(2050, 1, 1),
                    BranchID = objCDefaults.lstCVarDefaults[0].BranchID,
                    SalesmanID = WebSecurity.CurrentUserId,
                    BLType = 2,
                    BLTypeIconName = "fa-link",
                    BLTypeIconStyle = "house-icon-style",
                    DirectionType = 1,
                    DirectionIconName = "fa-arrow-circle-down",
                    DirectionIconStyle = "import-icon-style",
                    TransportIconName = transportTypeId == 1 ? "fa-anchor" : "fa-plane",
                    TransportIconStyle = transportTypeId == 1 ? "ocean-icon-style" : "air-icon-style",
                    StoreLocation =0,
                    BlStatus = "",
                    ForwarderId = 0,
                    PrintHouseConsignee = false,
                    HoldReason = "",
                    DORepresentative = "",
                    DOPrintedON = new DateTime(1900, 1, 1),
                    DeliveryCustomer = "",
                    FileAccountingDate = new DateTime(1900, 1, 1),
                    ManifestPreConsignee = "" ,
                    POTID = 0,
                    HouseContainerNumber = "",
                    Form13Notes = "0"
                };
                SetDefaults(objVarMasterOperation);
                objMasterOperation.lstCVarOperations.Add(objVarMasterOperation);
            }
            checkException = objMasterOperation.SaveMethod(objMasterOperation.lstCVarOperations);
            if (checkException != null)
            {
                _ReturnedMessage = checkException.Message;
                return new object[]
                {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
                };
            }

            #endregion


            return new object[]
            {
                _ReturnedMessage
                , FileBL
                , xmlOutputData
            };
            /****** FileBL End ******/

            #region Comments
            ///****** OBLInstruction Start ******/
            //OBLInstruction oblinstruction = ser.Deserialize<OBLInstruction>(XMLDataToRead.pXMLData);
            //xmlOutputData = ser.Serialize<OBLInstruction>(oblinstruction);


            //if (checkException != null)
            //    _ReturnedMessage = checkException.Message;
            //return new object[]
            //{
            //    _ReturnedMessage
            //    , oblinstruction
            //    , xmlOutputData
            //};
            ///****** OBLInstruction End ******/
            #endregion



        }
        #endregion

        string GetEnvelopeID()
        {
            var id = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString();
            return id;
        }
        void SetDefaults(object obj)
        {
            Type type = obj.GetType();
            PropertyInfo[] props = type.GetProperties();
            foreach (var prop in props)
            {
                if(prop.PropertyType == typeof(string) && prop.GetValue(obj) == null)
                {
                    prop.SetValue(obj,"");
                }
                else if(prop.PropertyType == typeof(DateTime) && prop.GetValue(obj).ToString() == "01-Jan-01 12:00:00 AM")
                {
                    prop.SetValue(obj, new DateTime(1900,1,1));
                }
            }
        }
    }

    
}
