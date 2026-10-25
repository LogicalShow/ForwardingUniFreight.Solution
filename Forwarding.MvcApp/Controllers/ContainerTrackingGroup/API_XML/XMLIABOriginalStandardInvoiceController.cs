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

namespace Forwarding.MvcApp.Controllers.ContainerTrackingGroup.API_XML
{
    public class XMLIABOriginalStandardInvoiceController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            var constMasterBLType = 3;
            CvwOperationsWithMinimalColumns objCvwOperations = new CvwOperationsWithMinimalColumns();

            if (pIsLoadArrayOfObjects)
            {
                objCvwOperations.GetListPaging(99999, 1, "WHERE BLType=" + constMasterBLType /*AND DirectionType<>1 AND TransportType<>2 AND ShipmentType<>2 and BLType<>2"*/, "ID DESC", out _RowCount);
            }
            var pOperationList = objCvwOperations.lstCVarvwOperationsWithMinimalColumns
                    .Select(s => new
                    {
                        ID = s.ID
                        ,
                        Code = s.Code
                    }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(pOperationList) };
        }

        [HttpGet, HttpPost]
        public object[] GenerateXML_IABOriginalStandardInvoice(string pOperationID)
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
            attr.Value = "TEST SCHEMA URL";
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
                envelopeNode.InnerText = "1.0.0";
                envelope.AppendChild(envelopeNode);

                envelopeNode = doc.CreateElement("EnvelopeID");
                envelopeNode.InnerText = objCMasterOperation.lstCVarvwOperations[0].Code + "_bl_" + DateTime.Now.ToString();//"file_bl_20180228143714_1";
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

                        #region AddressDetails
                        {
                            #region Shipper
                            // Shipper
                            if (ChildOperation.ShipperID != 0)
                            {
                                CvwAddresses objCChildOperationShipperAddress = new CvwAddresses();
                                checkException = objCChildOperationShipperAddress.GetListPaging(9999, 1, " WHERE PartnerID="+ ChildOperation.ShipperID + " AND PartnerTypeID=1 AND AddressTypeID=1 ", "ID", out _RowCount);

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

                                    node = doc.CreateElement("HazardousFlag");
                                    node.InnerText = "";
                                    CargoDetails.AppendChild(node);
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


            //doc.Save("text.xml");


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {  doc.OuterXml // pData[0];
            };
        }

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


            /****** IABOriginalStandardInvoice Start ******/
            Invoice Invoice = ser.Deserialize<Invoice>(XMLDataToRead.pXMLData);
            xmlOutputData = ser.Serialize<Invoice>(Invoice);
            if (checkException != null)
                _ReturnedMessage = checkException.Message;
            return new object[]
            {
                _ReturnedMessage
                , Invoice
                , xmlOutputData
            };
            /****** IABOriginalStandardInvoice End ******/


        }
    }
    
}
