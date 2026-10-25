using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using Forwarding.MvcApp.Entities.Quotations;
using System;
using System.Linq; 
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ContactPersons.Generated;
using Forwarding.MvcApp.Models.CRM.Generated;
using System.Net.Mail;
using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.FA.Generated;
using System.Globalization;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using System.Net.Mime;
using System.Text;
using Forwarding.MvcApp.Entities.Operations;
using System.Diagnostics.Eventing.Reader;
using System.Windows.Documents;
using System.Collections.Generic;
using System.Reflection;
using System.Net;

//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
namespace Forwarding.MvcApp.Controllers.Quotations.API_Quotations
{
    public class QuotationsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            int _RowCount = 0;

            //var constOperationsFormID = 29;//OperationsManagement
            var constQuotationsFormID = 28; //QuotationsManagement
            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList("WHERE UserID=" + WebSecurity.CurrentUserId.ToString() + " AND FormID=" + constQuotationsFormID.ToString());
            bool _IsHideOthersRecords = objCvwUserForms.lstCVarvwUserForms[0].HideOthersRecords;
            if (_IsHideOthersRecords)
                //pWhereClause += " AND CreatorUserID=" + WebSecurity.CurrentUserId;
                pWhereClause += " AND SalemanID=" + WebSecurity.CurrentUserId;

            CQuotations objCQuotations = new CQuotations();
            objCQuotations.GetListPaging(99999, 1, pWhereClause, "ID DESC", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCQuotations.lstCVarQuotations) };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwQuotations objCvwQuotations = new CvwQuotations();
            Int32 _RowCount = 0;
            Exception checkException = null;
            //var constOperationsFormID = 29;//OperationsManagement
            var constQuotationsFormID = 28; //QuotationsManagement
            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList("WHERE UserID=" + WebSecurity.CurrentUserId.ToString() + " AND FormID=" + constQuotationsFormID.ToString());
            CUsers objCUsers = new CUsers();
            objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND 1 = 1 ORDER BY Name");
            CCountries objCCountries = new CCountries();
            objCCountries.GetList("ORDER BY Name");
            CShippingLines objCShippingLines = new CShippingLines();
            checkException = objCShippingLines.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            objCCountries.GetList("ORDER BY Name");
            CNoAccessMainCriteria objCNoAccessMainCriteria = new CNoAccessMainCriteria();
            objCNoAccessMainCriteria.GetList("WHERE IsInactive=0 ORDER BY ID");
            CNoAccessSubCriteria objCNoAccessSubCriteria = new CNoAccessSubCriteria();
            objCNoAccessSubCriteria.GetList("WHERE IsInactive=0 ORDER BY ID");
            #region Get Lists with minimal columns
            var pCountryList = objCCountries.lstCVarCountries
                //.GroupBy(g => g.ReceiveID)
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                }).ToList();
            var pUserList = objCUsers.lstCVarUsers
                //.GroupBy(g => g.ReceiveID)
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    IsSalesman = s.IsSalesman
                }).ToList();
            var pShippingLineList = objCShippingLines.lstCVarShippingLines
                //.GroupBy(g => g.ReceiveID)
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                }).ToList();
            #endregion Get Lists with minimal columns
            bool _IsHideOthersRecords = objCvwUserForms.lstCVarvwUserForms[0].HideOthersRecords;
            if (_IsHideOthersRecords)
                //pWhereClause += " AND (CreatorUserID=" + WebSecurity.CurrentUserId + " OR SalesmanID=" + WebSecurity.CurrentUserId + ")";
                pWhereClause += " AND (CreatorUserID=" + WebSecurity.CurrentUserId + " OR SalesmanID=" + WebSecurity.CurrentUserId + ")";
            objCvwQuotations.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwQuotations.lstCVarvwQuotations)
                , _RowCount
                , serializer.Serialize(pUserList) //pData[2]
                , serializer.Serialize(pCountryList) //pData[3]
                , serializer.Serialize(objCNoAccessMainCriteria.lstCVarNoAccessMainCriteria) //pData[4]
                , serializer.Serialize(objCNoAccessSubCriteria.lstCVarNoAccessSubCriteria) //pData[5]
                , serializer.Serialize(pShippingLineList) //pData[6]
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Exception checkException = null;
            Int32 _RowCount = 0;
            CvwQuotations objCvwQuotations = new CvwQuotations();
            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            CNoAccessGblTransactionTypes objCNoAccessGblTransactionTypes = new CNoAccessGblTransactionTypes();
            CTaxeTypes objCTaxType = new CTaxeTypes();
            CDevisons objCDivision = new CDevisons();
            CTRCK_EquipmentModel objCEquipmentModel = new CTRCK_EquipmentModel();
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCPaymentTerms.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCNoAccessGblTransactionTypes.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCTaxType.GetListPaging(999999, 1, "WHERE IsDiscount=0", "Name", out _RowCount);
                checkException = objCDivision.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCEquipmentModel.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            }
            checkException = objCvwQuotations.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwQuotations.lstCVarvwQuotations)
                , _RowCount
                , serializer.Serialize(objCPaymentTerms.lstCVarPaymentTerms) //pData[2]
                , serializer.Serialize(objCNoAccessGblTransactionTypes.lstCVarNoAccessGblTransactionTypes) //pData[3]
                , serializer.Serialize(objCTaxType.lstCVarTaxeTypes) //pData[4]
                , serializer.Serialize(objCDivision.lstCVarDevisons) //pData[5]
                , serializer.Serialize(objCEquipmentModel.lstCVarTRCK_EquipmentModel) //pData[6]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClauseAndReturnObject(Int64 pEditedQuotationID)
        {
            bool _result = false;
            //var constExporterOperationPartnerTypeID = 160;
            //var constImporterOperationPartnerTypeID = 170;
            //var constBookingPartyOperationPartnerTypeID = 180;
            //var constOwnerOperationPartnerTypeID = 190;
            //var constClientOperationPartnerTypeID = 200;

            //var constNotify2OperationPartnerTypeID = 5;
            int _RowCount = 0;
            string pWhereClauseSalesLead = "WHERE 1=1";
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClauseSalesLead += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            Exception checkException = null;
            CvwQuotations objCvwQuotations = new CvwQuotations();
            CvwQuotationContainersAndPackages objCvwQuotationContainersAndPackages = new CvwQuotationContainersAndPackages();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CCountries objCCountries = new CCountries();
            CShippingLines objCShippingLines = new CShippingLines();
            CvwAirlinesWithMinimalColumns objCAirlinesWithMinimalColumns = new CvwAirlinesWithMinimalColumns();
            CTruckers objCTruckers = new CTruckers();
            CBranches objCBranches = new CBranches();
            CUsers objCSalesmen = new CUsers();
            CCommodities objCCommodities = new CCommodities();
            CIncoterms objCIncoterms = new CIncoterms();
            CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
            CvwCustomersWithMinimalColumns objCCustomers = new CvwCustomersWithMinimalColumns();
            
            CvwChargeTypesWithMinimalColumns objCChargeTypes = new CvwChargeTypesWithMinimalColumns();
            CvwCustomersWithMinimalColumns objCConsigneesWithMinimalColumns = new CvwCustomersWithMinimalColumns();
            CAgents objCAgents = new CAgents();
            CCRM_Clients objCRM_Clients = new CCRM_Clients();
            CContacts objCShipperContacts = new CContacts();
            CContacts objCConsigneeContacts = new CContacts();
            CContacts objCAgentContacts = new CContacts();
            CContacts objCSelectedShipperContact = new CContacts();
            CContacts objCSelectedConsigneeContact = new CContacts();
            CContacts objCSelectedAgentContact = new CContacts();
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
            CPorts objCPOL = new CPorts();
            CPorts objCPOD = new CPorts();
            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            CNoAccessQuoteAndOperStages objCNoAccessQuoteAndOperStages = new CNoAccessQuoteAndOperStages();
            CNoAccessMainCriteria objCNoAccessMainCriteria = new CNoAccessMainCriteria();
            CNoAccessSubCriteria objCNoAccessSubCriteria = new CNoAccessSubCriteria();
            objCNoAccessMainCriteria.GetList("WHERE IsInactive=0 ORDER BY ID");
            objCNoAccessSubCriteria.GetList("WHERE IsInactive=0 ORDER BY ID");
            //CNoAccessOperationPartnerTypes objCNoAccessOperationPartnerTypes = new CNoAccessOperationPartnerTypes();
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CTemplate objCTemplate = new CTemplate();

            checkException = objCvwQuotations.GetListPaging(1, 1, "WHERE ID = " + pEditedQuotationID.ToString(), "ID", out _RowCount);
            if (checkException == null)
            {
                _result = true;
                //checkException = objCChargeTypes.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                //objCNoAccessOperationPartnerTypes.GetList("WHERE ID NOT IN (" + constExporterOperationPartnerTypeID + "," + constBookingPartyOperationPartnerTypeID + "," + constOwnerOperationPartnerTypeID + "," + constClientOperationPartnerTypeID + "," + constNotify2OperationPartnerTypeID + "," + constImporterOperationPartnerTypeID + ") ORDER BY Code");
                objCNoAccessQuoteAndOperStages.GetList(" WHERE IsQuotationStage = 1 AND IsInActive = 0 ORDER BY ViewOrder ");
                //objCvwQuotationContainersAndPackages.GetList("WHERE QuotationID = " + pEditedQuotationID.ToString());
                objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID = " + pEditedQuotationID.ToString(), "CodeSerial", out _RowCount);
                //objCCountries.GetList("ORDER BY Name");
                //objCvwAccPartners.GetList(" WHERE PartnerTypeID NOT IN (20) ORDER BY PartnerTypeID, Name "); //20 is the constCustodyPartnerTypeID
                if (objCvwQuotations.lstCVarvwQuotations[0].TransportType == 1) //OCEAN
                    objCShippingLines.GetList("ORDER BY Name");
                else if (objCvwQuotations.lstCVarvwQuotations[0].TransportType == 2) //AIR
                    objCAirlinesWithMinimalColumns.GetList("ORDER BY Name");
                else //Inlannd
                    objCTruckers.GetList("ORDER BY Name");
                //objCBranches.GetList("ORDER BY Name");
                objCSalesmen.GetList("WHERE IsNull(CustomerID , 0) = 0 AND ( IsSalesman=1 OR ID=" + objCvwQuotations.lstCVarvwQuotations[0].SalesmanID + ") ORDER BY Name");
                objCCommodities.GetList("ORDER BY Name");
                objCIncoterms.GetList("ORDER BY Name");
                objCTRCK_EquipmentModel.GetList("ORDER BY Name");
                //if (objCvwQuotations.lstCVarvwQuotations[0].DirectionType == 1) //import
                objCConsigneeContacts.GetList("WHERE PartnerID=" + objCvwQuotations.lstCVarvwQuotations[0].ConsigneeID);
                objCConsigneesWithMinimalColumns.GetList("WHERE ID="+objCvwQuotations.lstCVarvwQuotations[0].ConsigneeID);
                //else
                objCShipperContacts.GetList("WHERE PartnerID=" + objCvwQuotations.lstCVarvwQuotations[0].ShipperID);
                objCCustomers.GetList("WHERE ID="+ objCvwQuotations.lstCVarvwQuotations[0].ShipperID);
                objCAgents.GetList("ORDER BY Name");
                objCAgentContacts.GetList("WHERE PartnerID=" + objCvwQuotations.lstCVarvwQuotations[0].AgentID);

                //objCRM_Clients.GetListPaging(999999, 1, "WHERE IsAddedToCustomer=0 OR ID=" + objCvwQuotations.lstCVarvwQuotations[0].SalesLeadID, "Name", out _RowCount);
                objCRM_Clients.GetListPaging(999999, 1, pWhereClauseSalesLead, "Name", out _RowCount);
                objCCRM_ContactPersons.GetList("WHERE CRM_ClientsID=" + objCvwQuotations.lstCVarvwQuotations[0].SalesLeadID);

                if (objCvwQuotations.lstCVarvwQuotations[0].ShipperContactID != 0)
                    objCSelectedShipperContact.GetList("WHERE ID = " + objCvwQuotations.lstCVarvwQuotations[0].ShipperContactID);
                if (objCvwQuotations.lstCVarvwQuotations[0].ConsigneeContactID != 0)
                    objCSelectedConsigneeContact.GetList("WHERE ID = " + objCvwQuotations.lstCVarvwQuotations[0].ConsigneeContactID);
                if (objCvwQuotations.lstCVarvwQuotations[0].AgentContactID != 0)
                    objCSelectedAgentContact.GetList("WHERE ID = " + objCvwQuotations.lstCVarvwQuotations[0].AgentContactID);


                //objCPOL.GetList
                //    ("Where IsPort = 1 and IsInactive = 0 and CountryID =" + objCvwQuotations.lstCVarvwQuotations[0].POLCountryID
                //    + (objCvwQuotations.lstCVarvwQuotations[0].TransportType == 1 
                //        ? " AND IsOcean=1 "
                //        : (objCvwQuotations.lstCVarvwQuotations[0].TransportType == 2 ? " AND IsAir=1 " : " AND IsInland=1 ")
                //      )
                //     );
                //objCPOD.GetList
                //    ("Where IsPort = 1 and IsInactive = 0 and CountryID =" + objCvwQuotations.lstCVarvwQuotations[0].PODCountryID
                //    + (objCvwQuotations.lstCVarvwQuotations[0].TransportType == 1
                //        ? " AND IsOcean=1 "
                //        : (objCvwQuotations.lstCVarvwQuotations[0].TransportType == 2 ? " AND IsAir=1 " : " AND IsInland=1 ")
                //      )
                //     );
                //objCCurrencies.GetList("ORDER BY Code");
                objCTemplate.GetList("ORDER BY Name");
            }
            CUsers operationMen = new CUsers();
            checkException = operationMen.GetList(" WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 ORDER BY Name ");
            #region Get Lists with minimal columns
            var pSalesLead = objCRM_Clients.lstCVarCRM_Clients
                //.GroupBy(g => g.ReceiveID)
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                }).ToList();
            #endregion Get Lists with minimal columns
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwQuotations.lstCVarvwQuotations[0]) : null //pData[1]: pQuotations
                , null //_result ? new JavaScriptSerializer().Serialize(objCvwQuotationContainersAndPackages.lstCVarvwQuotationContainersAndPackages) : null //pData[2]: QContainersAndPackages//pData[1]: EditedQuotationRow
                , _result ? new JavaScriptSerializer().Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute) : null //pData[3]: pQRoute
                , null //_result ? new JavaScriptSerializer().Serialize(objCCountries.lstCVarCountries) : null //pData[4]: pCountries
                , _result ? new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines) : null //pData[5]: pShippingLines
                , _result ? new JavaScriptSerializer().Serialize(objCAirlinesWithMinimalColumns.lstCVarvwAirlinesWithMinimalColumns) : null //pData[6]: pAirlines
                , _result ? new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers) : null //pData[7]: pTruckers
                , _result ? new JavaScriptSerializer().Serialize(objCBranches.lstCVarBranches) : null //pData[8]: pBranches
                , _result ? new JavaScriptSerializer().Serialize(objCSalesmen.lstCVarUsers) : null //pData[9]: pUsers (Salesmen)
                , _result ? new JavaScriptSerializer().Serialize(objCCommodities.lstCVarCommodities) : null //pData[10]: pCommodities
                , _result ? new JavaScriptSerializer().Serialize(objCCustomers.lstCVarvwCustomersWithMinimalColumns) : null //pData[11]: pShippers
                , _result ? new JavaScriptSerializer().Serialize(objCConsigneesWithMinimalColumns.lstCVarvwCustomersWithMinimalColumns) : null //pData[12]: pConsignees
                , _result ? new JavaScriptSerializer().Serialize(objCShipperContacts.lstCVarContacts) : null //pData[13]: pShipperContacts
                , _result ? new JavaScriptSerializer().Serialize(objCConsigneeContacts.lstCVarContacts) : null //pData[14]: pConsigneeContacts
                , objCSelectedShipperContact.lstCVarContacts.Count > 0 ? new JavaScriptSerializer().Serialize(objCSelectedShipperContact.lstCVarContacts) : null //pData[15]: pSelectedShipperContact
                , null //_result ? new JavaScriptSerializer().Serialize(objCPOL.lstCVarPorts) : null //pData[16]: pPOL
                , null //_result ? new JavaScriptSerializer().Serialize(objCPOD.lstCVarPorts) : null //pData[17]: pPOD
                , null //_result ? new JavaScriptSerializer().Serialize(objCCurrencies.lstCVarCurrencies) : null //pData[18]: pCurrencies
                , _result ? new JavaScriptSerializer().Serialize(objCNoAccessQuoteAndOperStages.lstCVarNoAccessQuoteAndOperStages) : null //pData[19]: pQuotationStages

                , _result ? serializer.Serialize(objCAgents.lstCVarAgents) : null //pData[20]: pAgents
                , _result ? serializer.Serialize(objCAgentContacts.lstCVarContacts) : null //pData[21]: pAgentContacts
                , objCSelectedAgentContact.lstCVarContacts.Count > 0 ? new JavaScriptSerializer().Serialize(objCSelectedAgentContact.lstCVarContacts) : null //pData[22]: pSelectedAgentContact
                , null //_result ? new JavaScriptSerializer().Serialize(objCvwAccPartners.lstCVarvwAccPartners) : null //pData[23]: pPartners
                , new JavaScriptSerializer().Serialize(objCTemplate.lstCVarTemplate) //pData[24]: pTemplates
                , objCSelectedConsigneeContact.lstCVarContacts.Count > 0 ? new JavaScriptSerializer().Serialize(objCSelectedConsigneeContact.lstCVarContacts) : null //pData[25]: pSelectedConsigneeContact
                , _result ? new JavaScriptSerializer().Serialize(objCIncoterms.lstCVarIncoterms) : null //pData[26]: pIncoterm
                , new JavaScriptSerializer().Serialize(pSalesLead) //pData[27]: pSalesLead
                , new JavaScriptSerializer().Serialize(objCCRM_ContactPersons.lstCVarCRM_ContactPersons) //pData[28]: pSalesLeadContact
                , new JavaScriptSerializer().Serialize(objCChargeTypes.lstCVarvwChargeTypesWithMinimalColumns) //pData[29]: pChargeType
                , new JavaScriptSerializer().Serialize(objCNoAccessMainCriteria.lstCVarNoAccessMainCriteria) //pData[30]
                , new JavaScriptSerializer().Serialize(objCNoAccessSubCriteria.lstCVarNoAccessSubCriteria) //pData[31]
                , _result ? new JavaScriptSerializer().Serialize(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel) : null //pData[32]: pEquimentModel
                , new JavaScriptSerializer().Serialize(operationMen.lstCVarUsers) //pData[33]
                };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int64 pHeaderID)
        {
            CvwQuotations objCvwQuotations = new CvwQuotations();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCvwQuotations.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = objCvwQuotationRoute.GetListPaging(99999, 1, "WHERE QuotationID=" + pHeaderID.ToString(), "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwQuotations.lstCVarvwQuotations[0]) //pData[0]
                , serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute) //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails_ForExport(Int64 pHeaderID_ForExport)
        {
            CvwQuotations objCvwQuotations = new CvwQuotations();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCvwQuotations.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID_ForExport.ToString(), "ID", out _RowCount);
            checkException = objCvwQuotationRoute.GetListPaging(99999, 1, "WHERE QuotationID=" + pHeaderID_ForExport.ToString(), "ID", out _RowCount);
            var pQuotationRoutes = objCvwQuotationRoute.lstCVarvwQuotationRoute
                .Select(
                    s => new
                    {
                        Code = s.Code
                        ,
                        POLName = s.POLName
                        ,
                        PODName = s.PODName
                        ,
                        EquipmentModelName = s.EquipmentModelName
                        ,
                        CommodityName = s.CommodityName
                        ,
                        Cost = s.Cost
                        ,
                        Sale = s.Sale
                        ,
                        DivisionName = s.DivisionName
                    }
                );
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwQuotations.lstCVarvwQuotations[0]) //pData[0]
                , serializer.Serialize(pQuotationRoutes) //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] GetModalControls()
        {
            int _RowCount = 0;
            string pWhereClauseSalesLead = "WHERE 1=1";
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE  ID=" + WebSecurity.CurrentUserId, "Name", out _RowCount);
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClauseSalesLead += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            Exception checkException = null;
            CvwCustomersWithMinimalColumns objCShippers = new CvwCustomersWithMinimalColumns();
            CvwCustomersWithMinimalColumns objCConsignees = new CvwCustomersWithMinimalColumns();
            //CCRM_Clients objCRM_Clients = new CCRM_Clients();
            CvwCRM_SalesLeadToSendQuotation objCRM_Clients = new CvwCRM_SalesLeadToSendQuotation();
            CAgents objCAgents = new CAgents();
            CUsers objCSalesmen = new CUsers();

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "USC")
            {
                checkException = objCShippers.GetListPaging(10000, 1, "WHERE IsShipper=1 AND ID IN (SELECT ID FROM Customers WHERE SubAccountID IS NOT NULL)", "Name", out _RowCount);
                checkException = objCConsignees.GetListPaging(10000, 1, "WHERE IsConsignee=1 AND ID IN (SELECT ID FROM Customers WHERE SubAccountID IS NOT NULL)", "Name", out _RowCount);
                checkException = objCAgents.GetListPaging(10000, 1, "WHERE SubAccountID IS NOT NULL", "Name", out _RowCount);
            } else
            {
                string SalesmanFilter = "";
                if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords && objCvwUsers.lstCVarvwUsers[0].IsSalesman)
                {
                    SalesmanFilter = " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";
                }
                checkException = objCShippers.GetListPaging(10000, 1, "WHERE IsShipper=1"+ SalesmanFilter, "Name", out _RowCount);
                checkException = objCConsignees.GetListPaging(10000, 1, "WHERE IsConsignee=1"+ SalesmanFilter, "Name", out _RowCount);
                checkException = objCAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
            }
            string _salesmenWhereClause = "WHERE IsNull(CustomerID , 0) = 0 AND IsSalesman=1";

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ORI" && objCvwUsers.lstCVarvwUsers[0].IsSalesman)
            {
                _salesmenWhereClause += $" AND ID={WebSecurity.CurrentUserId}";
            }
            checkException = objCSalesmen.GetListPaging(10000, 1, _salesmenWhereClause, "Name", out _RowCount);
            checkException = objCRM_Clients.GetListPaging(999999, 1, pWhereClauseSalesLead, "Name", out _RowCount);

            CUsers operationMen = new CUsers();
            checkException = operationMen.GetList(" WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 ORDER BY Name ");
            CMoveTypes objCMoveTypes = new CMoveTypes();
            objCMoveTypes.GetList("WHERE 1=1 ORDER BY NAME");

            #region Get Lists with minimal columns
            var pSalesLead = objCRM_Clients.lstCVarvwCRM_SalesLeadToSendQuotation
                //.GroupBy(g => g.ReceiveID)
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                }).ToList();
            #endregion Get Lists with minimal columns

            var serializer = new JavaScriptSerializer { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCShippers.lstCVarvwCustomersWithMinimalColumns) //pData[0]
                , serializer.Serialize(objCConsignees.lstCVarvwCustomersWithMinimalColumns) //pData[1]
                , serializer.Serialize(objCAgents.lstCVarAgents) //pData[2]
                , serializer.Serialize(objCSalesmen.lstCVarUsers) //pData[3] (Salesmen)
                , serializer.Serialize(pSalesLead) //pData[4] (SalesLead)
                , serializer.Serialize(operationMen.lstCVarUsers) //pData[5] (pOperationMen)
            };
        }

        [HttpPost]
        public object[] Insert([FromBody] InsertQuotationData insertQuotationData)
        {
            bool _result = false;
            int _RowCount = 0;
            CvwQuotations objCvwQuotations = new CvwQuotations();
            //int MainCarraigeRoutingTypeID = 30;
            CVarQuotations objCVarQuotations = new CVarQuotations();
            CContacts objCContacts = new CContacts();
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();

            objCVarQuotations.Code = insertQuotationData.pCode;
            objCVarQuotations.BranchID = int.Parse(insertQuotationData.pBranchID);
            objCVarQuotations.SalesmanID = int.Parse(insertQuotationData.pSalesmanID);
            objCVarQuotations.OperationManID = int.Parse(insertQuotationData.pOperationManID);
            objCVarQuotations.DirectionType = int.Parse(insertQuotationData.pDirectionType);
            objCVarQuotations.DirectionIconName = insertQuotationData.pDirectionIconName;
            objCVarQuotations.DirectionIconStyle = insertQuotationData.pDirectionIconStyle;
            objCVarQuotations.TransportType = int.Parse(insertQuotationData.pTransportType);
            objCVarQuotations.TransportIconName = insertQuotationData.pTransportIconName;
            objCVarQuotations.TransportIconStyle = insertQuotationData.pTransportIconStyle;
            objCVarQuotations.ShipmentType = int.Parse(insertQuotationData.pShipmentType);
            objCVarQuotations.ShipperID = int.Parse(insertQuotationData.pShipperID);
            objCVarQuotations.ShipperAddressID = int.Parse(insertQuotationData.pShipperAddressID);
            objCContacts.GetList("WHERE PartnerTypeID=1 AND PartnerID=" + insertQuotationData.pShipperID);
            objCVarQuotations.ShipperContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0); //int.Parse(insertQuotationData.pShipperContactID);
            objCVarQuotations.ConsigneeID = int.Parse(insertQuotationData.pConsigneeID);
            objCVarQuotations.ConsigneeAddressID = int.Parse(insertQuotationData.pConsigneeAddressID);
            objCContacts.GetList("WHERE PartnerTypeID=1 AND PartnerID=" + insertQuotationData.pConsigneeID);
            objCVarQuotations.ConsigneeContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0); //int.Parse(insertQuotationData.pConsigneeContactID);
            objCVarQuotations.AgentID = int.Parse(insertQuotationData.pAgentID);
            objCVarQuotations.AgentAddressID = int.Parse(insertQuotationData.pAgentAddressID);
            objCContacts.GetList("WHERE PartnerTypeID=2 AND PartnerID=" + insertQuotationData.pAgentID);
            objCVarQuotations.AgentContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0); //int.Parse(insertQuotationData.pAgentContactID);
            objCVarQuotations.CustomerID = int.Parse(insertQuotationData.pCustomerID);
            objCContacts.GetList("WHERE PartnerTypeID=1 AND PartnerID=" + insertQuotationData.pCustomerID);
            objCVarQuotations.CustomerContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0); //int.Parse(insertQuotationData.pConsigneeContactID);
            objCVarQuotations.IncotermID = int.Parse(insertQuotationData.pIncotermID);
            objCVarQuotations.CommodityID = int.Parse(insertQuotationData.pCommodityID);
            objCVarQuotations.TransientTime = int.Parse(insertQuotationData.pTransientTime);
            objCVarQuotations.Validity = int.Parse(insertQuotationData.pValidity);
            objCVarQuotations.FreeTime = int.Parse(insertQuotationData.pFreeTime);
            //objCVarQuotations.OpenDate = DateTime.Parse(insertQuotationData.pOpenDate);
            objCVarQuotations.OpenDate = insertQuotationData.pOpenDate;
            objCVarQuotations.CloseDate = insertQuotationData.pCloseDate;// DateTime.Parse(insertQuotationData.pCloseDate);
            objCVarQuotations.ExpirationDate = DateTime.Parse("01-01-1900");
            objCVarQuotations.IncludePickup = (insertQuotationData.pIncludePickup == "True" ? true : false);
            objCVarQuotations.PickupCityID = int.Parse(insertQuotationData.pPickupCityID);
            objCVarQuotations.PickupAddressID = int.Parse(insertQuotationData.pPickupAddressID);
            objCVarQuotations.POLCountryID = int.Parse(insertQuotationData.pPOLCountryID);
            objCVarQuotations.POL = int.Parse(insertQuotationData.pPOL);
            objCVarQuotations.PODCountryID = int.Parse(insertQuotationData.pPODCountryID);
            objCVarQuotations.POD = int.Parse(insertQuotationData.pPOD);
            objCVarQuotations.ShippingLineID = int.Parse(insertQuotationData.pShippingLineID);
            objCVarQuotations.AirlineID = int.Parse(insertQuotationData.pAirlineID);
            objCVarQuotations.TruckerID = int.Parse(insertQuotationData.pTruckerID);
            objCVarQuotations.IncludeDelivery = (insertQuotationData.pIncludeDelivery == "True" ? true : false);
            objCVarQuotations.DeliveryZipCode = insertQuotationData.pDeliveryZipCode;
            objCVarQuotations.DeliveryCityID = int.Parse(insertQuotationData.pDeliveryCityID);
            objCVarQuotations.DeliveryCountryID = int.Parse(insertQuotationData.pDeliveryCountryID);
            //objCVarQuotations.GrossWeight = decimal.Parse(insertQuotationData.pGrossWeight);
            //objCVarQuotations.Volume = decimal.Parse(insertQuotationData.pVolume);
            //objCVarQuotations.ChargeableWeight = decimal.Parse(insertQuotationData.pChargeableWeight);
            //objCVarQuotations.NumberOfPackages = int.Parse(insertQuotationData.pNumberOfPackages);
            objCVarQuotations.IsDangerousGoods = (insertQuotationData.pIsDangerousGoods == "True" ? true : false);
            objCVarQuotations.DescriptionOfGoods = insertQuotationData.pDescriptionOfGoods;
            objCVarQuotations.Notes = (insertQuotationData.pNotes == null ? "" : insertQuotationData.pNotes.Trim().ToUpper());
            objCVarQuotations.QuotationStageID = int.Parse(insertQuotationData.pQuotationStageID);
            objCVarQuotations.SalesLeadID = insertQuotationData.pSalesLeadID;
            objCCRM_ContactPersons.GetList("WHERE CRM_ClientsID=" + insertQuotationData.pSalesLeadID);
            objCVarQuotations.SalesLeadContactID = (objCCRM_ContactPersons.lstCVarCRM_ContactPersons.Count > 0 ? objCCRM_ContactPersons.lstCVarCRM_ContactPersons[0].ID : 0);

            objCVarQuotations.IsWarehousing = insertQuotationData.pIsWarehousing;
            objCVarQuotations.MainCriteriaID = insertQuotationData.pMainCriteriaID;
            objCVarQuotations.SubCriteriaID = insertQuotationData.pSubCriteriaID;

            objCVarQuotations.IsFleet = insertQuotationData.pIsFleet;

            objCVarQuotations.TemplateID = insertQuotationData.pTemplateID;
            objCVarQuotations.Subject = insertQuotationData.pSubject;
            objCVarQuotations.TermsAndConditions = insertQuotationData.pTermsAndConditions;

            objCVarQuotations.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarQuotations.LockingUserID = 0;
            objCVarQuotations.IsContract = false;
            objCVarQuotations.CreatorUserID = objCVarQuotations.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarQuotations.CreationDate = objCVarQuotations.ModificationDate = DateTime.Now;
            objCVarQuotations.ExporterID = insertQuotationData.pExporterID;
            objCVarQuotations.CRMCode = "0";
            objCVarQuotations.IsLoadingDischarging = insertQuotationData.pIsLoadingDischarging;
            objCVarQuotations.IsSurvey = insertQuotationData.pIsSurvey;
            objCVarQuotations.IsLashing = insertQuotationData.pIsLashing;
            objCVarQuotations.IsPackingRemovals = insertQuotationData.pIsPackingRemovals;

            CQuotations objCQuotations = new CQuotations();
            objCQuotations.lstCVarQuotations.Add(objCVarQuotations);
            Exception checkException = objCQuotations.SaveMethod(objCQuotations.lstCVarQuotations);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                #region CreateRoute
                //CVarQuotationRoute objCVarQuotationRoute = new CVarQuotationRoute();
                //objCVarQuotationRoute.QuotationID = objCVarQuotations.ID;
                //objCVarQuotationRoute.RoutingTypeID = MainCarraigeRoutingTypeID;
                //objCVarQuotationRoute.TransportType = objCVarQuotations.TransportType;
                //objCVarQuotationRoute.TransportIconName = objCVarQuotations.TransportIconName;
                //objCVarQuotationRoute.TransportIconStyle = objCVarQuotations.TransportIconStyle;
                //objCVarQuotationRoute.POLCountryID = objCVarQuotations.POLCountryID;
                //objCVarQuotationRoute.POL = objCVarQuotations.POL;
                //objCVarQuotationRoute.PODCountryID = objCVarQuotations.PODCountryID;
                //objCVarQuotationRoute.POD = objCVarQuotations.POD;
                //objCVarQuotationRoute.ExpirationDate = objCVarQuotations.ExpirationDate;
                //objCVarQuotationRoute.ShippingLineID = objCVarQuotations.ShippingLineID;
                //objCVarQuotationRoute.AirlineID = objCVarQuotations.AirlineID;
                //objCVarQuotationRoute.TruckerID = objCVarQuotations.TruckerID;
                //objCVarQuotationRoute.Notes = "0";
                //objCVarQuotationRoute.CreatorUserID = objCVarQuotationRoute.ModificatorUserID = WebSecurity.CurrentUserId;
                //objCVarQuotationRoute.CreationDate = objCVarQuotationRoute.ModificationDate = DateTime.Now;

                //CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                //objCQuotationRoute.lstCVarQuotationRoute.Add(objCVarQuotationRoute);
                //checkException = objCQuotationRoute.SaveMethod(objCQuotationRoute.lstCVarQuotationRoute);
                #endregion CreateRoute
            }

            checkException = objCQuotations.GetListPaging(1, 1, "WHERE ID=" + objCVarQuotations.ID, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { _result, objCVarQuotations.ID, serializer.Serialize(objCQuotations.lstCVarQuotations[0]) };
        }

        [HttpPost]
        public object[] Update([FromBody] UpdateQuotationData updateQuotationData)
        {
            bool _result = false;

            CVarQuotations objCVarQuotations = new CVarQuotations();
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CQuotations objCGetCreationInformation = new CQuotations();
            objCGetCreationInformation.GetItem(updateQuotationData.pID);
            objCVarQuotations.CreatorUserID = objCGetCreationInformation.lstCVarQuotations[0].CreatorUserID;
            objCVarQuotations.CreationDate = objCGetCreationInformation.lstCVarQuotations[0].CreationDate;
            objCVarQuotations.Code = objCGetCreationInformation.lstCVarQuotations[0].Code;
            objCVarQuotations.CodeSerial = objCGetCreationInformation.lstCVarQuotations[0].CodeSerial;

            objCVarQuotations.CloseDate = objCGetCreationInformation.lstCVarQuotations[0].CloseDate;

            objCVarQuotations.ID = updateQuotationData.pID;

            //objCVarQuotations.Code = updateQuotationData.pCode;
            objCVarQuotations.BranchID = updateQuotationData.pBranchID;
            objCVarQuotations.SalesmanID = updateQuotationData.pSalesmanID;
            objCVarQuotations.OperationManID = updateQuotationData.pOperationManID;
            objCVarQuotations.DirectionType = updateQuotationData.pDirectionType;
            objCVarQuotations.DirectionIconName = updateQuotationData.pDirectionIconName;
            objCVarQuotations.DirectionIconStyle = updateQuotationData.pDirectionIconStyle;
            objCVarQuotations.TransportType = updateQuotationData.pTransportType;
            objCVarQuotations.TransportIconName = updateQuotationData.pTransportIconName;
            objCVarQuotations.TransportIconStyle = updateQuotationData.pTransportIconStyle;
            objCVarQuotations.ShipmentType = updateQuotationData.pShipmentType;
            objCVarQuotations.ShipperID = updateQuotationData.pShipperID;
            objCVarQuotations.ShipperAddressID = updateQuotationData.pShipperAddressID;
            objCVarQuotations.ShipperContactID = updateQuotationData.pShipperContactID;
            objCVarQuotations.ConsigneeID = updateQuotationData.pConsigneeID;
            objCVarQuotations.ConsigneeAddressID = updateQuotationData.pConsigneeAddressID;
            objCVarQuotations.ConsigneeContactID = updateQuotationData.pConsigneeContactID;
            objCVarQuotations.AgentID = updateQuotationData.pAgentID;
            objCVarQuotations.AgentAddressID = updateQuotationData.pAgentAddressID;
            objCVarQuotations.AgentContactID = updateQuotationData.pAgentContactID;
            objCVarQuotations.IncotermID = updateQuotationData.pIncotermID;
            objCVarQuotations.CommodityID = updateQuotationData.pCommodityID;
            objCVarQuotations.TransientTime = updateQuotationData.pTransientTime;
            objCVarQuotations.Validity = updateQuotationData.pValidity;
            objCVarQuotations.FreeTime = updateQuotationData.pFreeTime;
            objCVarQuotations.OpenDate = updateQuotationData.pOpenDate; //objCGetCreationInformation.lstCVarQuotations[0].OpenDate;
            //objCVarQuotations.CloseDate = DateTime.Parse("01-01-1900");// DateTime.Parse(updateQuotationData.pCloseDate);
            objCVarQuotations.ExpirationDate = updateQuotationData.pExpirationDate;
            objCVarQuotations.IncludePickup = updateQuotationData.pIncludePickup;
            objCVarQuotations.PickupCityID = updateQuotationData.pPickupCityID;
            objCVarQuotations.PickupAddressID = updateQuotationData.pPickupAddressID;
            objCVarQuotations.POLCountryID = updateQuotationData.pPOLCountryID;
            objCVarQuotations.POL = updateQuotationData.pPOL;
            objCVarQuotations.PODCountryID = updateQuotationData.pPODCountryID;
            objCVarQuotations.POD = updateQuotationData.pPOD;
            objCVarQuotations.ShippingLineID = updateQuotationData.pShippingLineID;
            objCVarQuotations.AirlineID = updateQuotationData.pAirlineID;
            objCVarQuotations.TruckerID = updateQuotationData.pTruckerID;
            objCVarQuotations.IncludeDelivery = updateQuotationData.pIncludeDelivery;
            objCVarQuotations.DeliveryZipCode = updateQuotationData.pDeliveryZipCode;
            objCVarQuotations.DeliveryCityID = updateQuotationData.pDeliveryCityID;
            objCVarQuotations.DeliveryCountryID = updateQuotationData.pDeliveryCountryID;
            objCVarQuotations.GrossWeight = updateQuotationData.pGrossWeight;
            objCVarQuotations.Volume = updateQuotationData.pVolume;
            objCVarQuotations.ChargeableWeight = updateQuotationData.pChargeableWeight;
            objCVarQuotations.NumberOfPackages = updateQuotationData.pNumberOfPackages;
            objCVarQuotations.IsDangerousGoods = updateQuotationData.pIsDangerousGoods;
            objCVarQuotations.TemplateID = updateQuotationData.pTemplateID;
            objCVarQuotations.Subject = updateQuotationData.pSubject;
            objCVarQuotations.TermsAndConditions = updateQuotationData.pTermsAndConditions;
            objCVarQuotations.TemplateID_Transport = updateQuotationData.pTemplateIDTransport;
            objCVarQuotations.Subject_Transport = updateQuotationData.pSubjectTransport;
            objCVarQuotations.TermsAndConditions_Transport = updateQuotationData.pTermsAndConditionsTransport;
            objCVarQuotations.TemplateID_Clearance = updateQuotationData.pTemplateIDClearance;
            objCVarQuotations.Subject_Clearance = updateQuotationData.pSubjectClearance;
            objCVarQuotations.TermsAndConditions_Clearance = updateQuotationData.pTermsAndConditionsClearance;
            objCVarQuotations.DescriptionOfGoods = updateQuotationData.pDescriptionOfGoods;
            objCVarQuotations.Notes = (updateQuotationData.pNotes == null ? "" : updateQuotationData.pNotes.Trim().ToUpper());
            objCVarQuotations.QuotationStageID = updateQuotationData.pQuotationStageID;
            objCVarQuotations.SalesLeadID = updateQuotationData.pSalesLeadID;
            objCVarQuotations.SalesLeadContactID = updateQuotationData.pSalesLeadContactID;

            objCVarQuotations.IsWarehousing = updateQuotationData.pIsWarehousing;
            objCVarQuotations.MainCriteriaID = updateQuotationData.pMainCriteriaID;
            objCVarQuotations.SubCriteriaID = updateQuotationData.pSubCriteriaID;

            objCVarQuotations.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarQuotations.LockingUserID = 0;
            objCVarQuotations.IsContract = false;
            objCVarQuotations.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarQuotations.ModificationDate = DateTime.Now;

            objCVarQuotations.ExporterID = updateQuotationData.pExporterID;
            objCVarQuotations.CRMCode = objCGetCreationInformation.lstCVarQuotations[0].CRMCode;
            objCVarQuotations.IsLoadingDischarging = objCGetCreationInformation.lstCVarQuotations[0].IsLoadingDischarging;
            objCVarQuotations.IsSurvey = objCGetCreationInformation.lstCVarQuotations[0].IsSurvey;
            objCVarQuotations.IsLashing = objCGetCreationInformation.lstCVarQuotations[0].IsLashing;
            objCVarQuotations.IsPackingRemovals = objCGetCreationInformation.lstCVarQuotations[0].IsPackingRemovals;

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED" && !objCGetCreationInformation.lstCVarQuotations[0].IsContract)
            {
                objCVarQuotations.ShipperID = objCGetCreationInformation.lstCVarQuotations[0].ShipperID;
                objCVarQuotations.ShipperAddressID = objCGetCreationInformation.lstCVarQuotations[0].ShipperAddressID;
                objCVarQuotations.ShipperContactID = objCGetCreationInformation.lstCVarQuotations[0].ShipperContactID;
                objCVarQuotations.ConsigneeID = objCGetCreationInformation.lstCVarQuotations[0].ConsigneeID;
                objCVarQuotations.ConsigneeAddressID = objCGetCreationInformation.lstCVarQuotations[0].ConsigneeAddressID;
                objCVarQuotations.ConsigneeContactID = objCGetCreationInformation.lstCVarQuotations[0].ConsigneeContactID;
                objCVarQuotations.AgentID = objCGetCreationInformation.lstCVarQuotations[0].AgentID;
                objCVarQuotations.AgentAddressID = objCGetCreationInformation.lstCVarQuotations[0].AgentAddressID;
                objCVarQuotations.AgentContactID = objCGetCreationInformation.lstCVarQuotations[0].AgentContactID;
                objCVarQuotations.SalesLeadID = objCGetCreationInformation.lstCVarQuotations[0].SalesLeadID;
                objCVarQuotations.SalesLeadContactID = objCGetCreationInformation.lstCVarQuotations[0].SalesLeadContactID;
                objCVarQuotations.TemplateID = objCGetCreationInformation.lstCVarQuotations[0].TemplateID;
                objCVarQuotations.Subject = objCGetCreationInformation.lstCVarQuotations[0].Subject;
                objCVarQuotations.TermsAndConditions = objCGetCreationInformation.lstCVarQuotations[0].TermsAndConditions;

                objCVarQuotations.BranchID = objCGetCreationInformation.lstCVarQuotations[0].BranchID;
                objCVarQuotations.SalesmanID = objCGetCreationInformation.lstCVarQuotations[0].SalesmanID;
                objCVarQuotations.OperationManID = objCGetCreationInformation.lstCVarQuotations[0].OperationManID;
                objCVarQuotations.Notes = objCGetCreationInformation.lstCVarQuotations[0].Notes;
                objCVarQuotations.IsDangerousGoods = objCGetCreationInformation.lstCVarQuotations[0].IsDangerousGoods;
                objCVarQuotations.IsWarehousing = objCGetCreationInformation.lstCVarQuotations[0].IsWarehousing;
                objCVarQuotations.DescriptionOfGoods = objCGetCreationInformation.lstCVarQuotations[0].DescriptionOfGoods;
            }

            CQuotations objCQuotations = new CQuotations();
            objCQuotations.lstCVarQuotations.Add(objCVarQuotations);
            Exception checkException = objCQuotations.SaveMethod(objCQuotations.lstCVarQuotations);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return new Object[] { _result, objCQuotations.lstCVarQuotations[0].ID };
        }

        [HttpGet, HttpPost]
        public object[] Quotation_Copy(Int64 pQuotationIDToCopy, string pCode)
        {
            Int64 pCopiedQuotationID = 0;
            CQuotations objCQuotationsToCopy = new CQuotations();
            Exception checkException = null;
            int constCreatedQuoteAndOperStageID = 1;
            int _RowCount = 0;
            #region Copy QuotationHeader
            CVarQuotations objCVarQuotations = new CVarQuotations();
            checkException = objCQuotationsToCopy.GetListPaging(1, 1, "WHERE ID=" + pQuotationIDToCopy, "ID", out _RowCount);

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList(" WHERE 1=1");


            objCVarQuotations.Code = pCode;
            objCVarQuotations.BranchID = objCQuotationsToCopy.lstCVarQuotations[0].BranchID;
            objCVarQuotations.SalesmanID = objCQuotationsToCopy.lstCVarQuotations[0].SalesmanID;
            objCVarQuotations.DirectionType = objCQuotationsToCopy.lstCVarQuotations[0].DirectionType;
            objCVarQuotations.DirectionIconName = objCQuotationsToCopy.lstCVarQuotations[0].DirectionIconName;
            objCVarQuotations.DirectionIconStyle = objCQuotationsToCopy.lstCVarQuotations[0].DirectionIconStyle;
            objCVarQuotations.TransportType = objCQuotationsToCopy.lstCVarQuotations[0].TransportType;
            objCVarQuotations.TransportIconName = objCQuotationsToCopy.lstCVarQuotations[0].TransportIconName;
            objCVarQuotations.TransportIconStyle = objCQuotationsToCopy.lstCVarQuotations[0].TransportIconStyle;
            objCVarQuotations.ShipmentType = objCQuotationsToCopy.lstCVarQuotations[0].ShipmentType;
            objCVarQuotations.ShipperID = objCQuotationsToCopy.lstCVarQuotations[0].ShipperID;
            objCVarQuotations.ShipperAddressID = objCQuotationsToCopy.lstCVarQuotations[0].ShipperAddressID;
            objCVarQuotations.ShipperContactID = objCQuotationsToCopy.lstCVarQuotations[0].ShipperContactID;
            objCVarQuotations.ConsigneeID = objCQuotationsToCopy.lstCVarQuotations[0].ConsigneeID;
            objCVarQuotations.ConsigneeAddressID = objCQuotationsToCopy.lstCVarQuotations[0].ConsigneeAddressID;
            objCVarQuotations.ConsigneeContactID = objCQuotationsToCopy.lstCVarQuotations[0].ConsigneeContactID;
            objCVarQuotations.AgentID = objCQuotationsToCopy.lstCVarQuotations[0].AgentID;
            objCVarQuotations.AgentAddressID = objCQuotationsToCopy.lstCVarQuotations[0].AgentAddressID;
            objCVarQuotations.AgentContactID = objCQuotationsToCopy.lstCVarQuotations[0].AgentContactID;
            objCVarQuotations.IncotermID = objCQuotationsToCopy.lstCVarQuotations[0].IncotermID;
            objCVarQuotations.CommodityID = objCQuotationsToCopy.lstCVarQuotations[0].CommodityID;
            objCVarQuotations.TransientTime = objCQuotationsToCopy.lstCVarQuotations[0].TransientTime;
            objCVarQuotations.Validity = objCQuotationsToCopy.lstCVarQuotations[0].Validity;
            objCVarQuotations.FreeTime = objCQuotationsToCopy.lstCVarQuotations[0].FreeTime;
            objCVarQuotations.OpenDate = DateTime.Now;
            objCVarQuotations.CloseDate = DateTime.Parse("01-01-1900");
            objCVarQuotations.ExpirationDate = DateTime.Parse("01-01-1900");
            objCVarQuotations.IncludePickup = objCQuotationsToCopy.lstCVarQuotations[0].IncludePickup;
            objCVarQuotations.PickupCityID = objCQuotationsToCopy.lstCVarQuotations[0].PickupCityID;
            objCVarQuotations.PickupAddressID = objCQuotationsToCopy.lstCVarQuotations[0].PickupAddressID;
            objCVarQuotations.POLCountryID = objCQuotationsToCopy.lstCVarQuotations[0].POLCountryID;
            objCVarQuotations.POL = objCQuotationsToCopy.lstCVarQuotations[0].POL;
            objCVarQuotations.PODCountryID = objCQuotationsToCopy.lstCVarQuotations[0].PODCountryID;
            objCVarQuotations.POD = objCQuotationsToCopy.lstCVarQuotations[0].POD;
            objCVarQuotations.ShippingLineID = objCQuotationsToCopy.lstCVarQuotations[0].ShippingLineID;
            objCVarQuotations.AirlineID = objCQuotationsToCopy.lstCVarQuotations[0].AirlineID;
            objCVarQuotations.TruckerID = objCQuotationsToCopy.lstCVarQuotations[0].TruckerID;
            objCVarQuotations.IncludeDelivery = objCQuotationsToCopy.lstCVarQuotations[0].IncludeDelivery;
            objCVarQuotations.DeliveryZipCode = objCQuotationsToCopy.lstCVarQuotations[0].DeliveryZipCode;
            objCVarQuotations.DeliveryCityID = objCQuotationsToCopy.lstCVarQuotations[0].DeliveryCityID;
            objCVarQuotations.DeliveryCountryID = objCQuotationsToCopy.lstCVarQuotations[0].DeliveryCountryID;
            objCVarQuotations.GrossWeight = objCQuotationsToCopy.lstCVarQuotations[0].GrossWeight;
            objCVarQuotations.Volume = objCQuotationsToCopy.lstCVarQuotations[0].Volume;
            objCVarQuotations.ChargeableWeight = objCQuotationsToCopy.lstCVarQuotations[0].ChargeableWeight;
            objCVarQuotations.NumberOfPackages = objCQuotationsToCopy.lstCVarQuotations[0].NumberOfPackages;
            objCVarQuotations.IsDangerousGoods = objCQuotationsToCopy.lstCVarQuotations[0].IsDangerousGoods;
            objCVarQuotations.DescriptionOfGoods = objCQuotationsToCopy.lstCVarQuotations[0].DescriptionOfGoods;
            objCVarQuotations.TemplateID = objCQuotationsToCopy.lstCVarQuotations[0].TemplateID;
            objCVarQuotations.Subject = objCQuotationsToCopy.lstCVarQuotations[0].Subject;
            objCVarQuotations.TermsAndConditions = objCQuotationsToCopy.lstCVarQuotations[0].TermsAndConditions;
            objCVarQuotations.Notes = objCQuotationsToCopy.lstCVarQuotations[0].Notes;
            objCVarQuotations.SalesLeadID = objCQuotationsToCopy.lstCVarQuotations[0].SalesLeadID;
            objCVarQuotations.SalesLeadContactID = objCQuotationsToCopy.lstCVarQuotations[0].SalesLeadContactID;

            objCVarQuotations.IsWarehousing = objCQuotationsToCopy.lstCVarQuotations[0].IsWarehousing;
            objCVarQuotations.MainCriteriaID = objCQuotationsToCopy.lstCVarQuotations[0].MainCriteriaID;
            objCVarQuotations.SubCriteriaID = objCQuotationsToCopy.lstCVarQuotations[0].SubCriteriaID;

            objCVarQuotations.QuotationStageID = constCreatedQuoteAndOperStageID;
            objCVarQuotations.IsContract = false;
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED")
            {
                objCVarQuotations.IsContract = true;
            }
            objCVarQuotations.CreatorUserID = objCVarQuotations.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarQuotations.CreationDate = objCVarQuotations.ModificationDate = DateTime.Now;
            objCVarQuotations.TimeLocked = DateTime.Parse("01-01-1900");

            objCVarQuotations.OperationManID = objCQuotationsToCopy.lstCVarQuotations[0].OperationManID;
            objCVarQuotations.ExporterID = objCQuotationsToCopy.lstCVarQuotations[0].ExporterID;
            objCVarQuotations.CRMCode = "0";
            objCVarQuotations.IsLoadingDischarging = objCQuotationsToCopy.lstCVarQuotations[0].IsLoadingDischarging;
            objCVarQuotations.IsSurvey = objCQuotationsToCopy.lstCVarQuotations[0].IsSurvey;
            objCVarQuotations.IsLashing = objCQuotationsToCopy.lstCVarQuotations[0].IsLashing;
            objCVarQuotations.IsPackingRemovals = objCQuotationsToCopy.lstCVarQuotations[0].IsPackingRemovals;

            CQuotations objCQuotations = new CQuotations();
            objCQuotations.lstCVarQuotations.Add(objCVarQuotations);
            checkException = objCQuotations.SaveMethod(objCQuotations.lstCVarQuotations);
            pCopiedQuotationID = objCVarQuotations.ID;
            #endregion Copy QuotationHeader
            #region QuotationRoutes/Charges
            CQuotationRoute objCQuotationRouteToCopy = new CQuotationRoute();
            int _RowCountRoute = 0;
            checkException = objCQuotationRouteToCopy.GetListPaging(99999,1, " WHERE QuotationID=" + pQuotationIDToCopy,"ID",out _RowCountRoute);
            for (int i = 0; i < objCQuotationRouteToCopy.lstCVarQuotationRoute.Count; i++)
            {
                CVarQuotationRoute objCVarQuotationRoute = new CVarQuotationRoute();
                objCVarQuotationRoute.Code = "0";
                objCVarQuotationRoute.QuotationID = pCopiedQuotationID;
                objCVarQuotationRoute.RoutingTypeID = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].RoutingTypeID;
                objCVarQuotationRoute.DirectionType = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].DirectionType;
                objCVarQuotationRoute.DirectionIconName = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].DirectionIconName;
                objCVarQuotationRoute.DirectionIconStyle = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].DirectionIconStyle;
                objCVarQuotationRoute.TransportType = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].TransportType;
                objCVarQuotationRoute.TransportIconName = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].TransportIconName;
                objCVarQuotationRoute.TransportIconStyle = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].TransportIconStyle;
                objCVarQuotationRoute.ShipmentType = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].ShipmentType;
                objCVarQuotationRoute.POLCountryID = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].POLCountryID;
                objCVarQuotationRoute.POL = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].POL;
                objCVarQuotationRoute.PODCountryID = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].PODCountryID;
                objCVarQuotationRoute.POD = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].POD;
                objCVarQuotationRoute.PickupAddress = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].PickupAddress;
                objCVarQuotationRoute.DeliveryAddress = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].DeliveryAddress;
                objCVarQuotationRoute.MoveTypeID = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].MoveTypeID;
                objCVarQuotationRoute.ETAPOLDate = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].ETAPOLDate;
                objCVarQuotationRoute.ExpirationDate = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].ExpirationDate;
                objCVarQuotationRoute.ShippingLineID = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].ShippingLineID;
                objCVarQuotationRoute.AirlineID = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].AirlineID;
                objCVarQuotationRoute.TruckerID = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].TruckerID;
                objCVarQuotationRoute.TransientTime = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].TransientTime;
                objCVarQuotationRoute.Validity = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].Validity;
                objCVarQuotationRoute.FreeTime = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].FreeTime;
                objCVarQuotationRoute.FreeTimePOD = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].FreeTimePOD;
                objCVarQuotationRoute.QuotationStageID = constCreatedQuoteAndOperStageID;
                objCVarQuotationRoute.Notes = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].Notes;

                objCVarQuotationRoute.CreatorUserID = objCVarQuotationRoute.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarQuotationRoute.CreationDate = objCVarQuotationRoute.ModificationDate = DateTime.Now;
                objCVarQuotationRoute.CommodityID = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].CommodityID;
                objCVarQuotationRoute.IncotermID = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].IncotermID;

                objCVarQuotationRoute.NumberOfPackages = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].NumberOfPackages;
                objCVarQuotationRoute.Volume = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].Volume;
                objCVarQuotationRoute.VolumetricWeight = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].VolumetricWeight;
                objCVarQuotationRoute.GrossWeight = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].GrossWeight;
                objCVarQuotationRoute.ChargeableWeight = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].ChargeableWeight;
                objCVarQuotationRoute.FreightRateFormat = objCQuotationRouteToCopy.lstCVarQuotationRoute[i].FreightRateFormat;
                objCVarQuotationRoute.ChargeEditApprovalLevel = 0;
                objCVarQuotationRoute.ChargeEdit1stApprovalUserID = 0;
                objCVarQuotationRoute.ChargeEdit2ndApprovalUserID = 0;
                objCVarQuotationRoute.ChargeEdit3rdApprovalUserID = 0;
                objCVarQuotationRoute.ChargeEdit4thApprovalUserID = 0;
                objCVarQuotationRoute.DenialReason = "0";
                objCVarQuotationRoute.CustomsAcceptedValue = 0;
                objCVarQuotationRoute.ETD = DateTime.Parse("01-01-1900");
                objCVarQuotationRoute.StuffingCutOf = DateTime.Parse("01-01-1900");

                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                objCQuotationRoute.lstCVarQuotationRoute.Add(objCVarQuotationRoute);
                checkException = objCQuotationRoute.SaveMethod(objCQuotationRoute.lstCVarQuotationRoute);
                Int64 pQuotationRouteID = objCVarQuotationRoute.ID;
                #region Add QuotationCharges
                CQuotationCharges objCQuotationChargesToCopy = new CQuotationCharges();
                int _RowCountCharge = 0;
                checkException = objCQuotationChargesToCopy.GetListPaging(99999,1, "WHERE QuotationRouteID=" + objCQuotationRouteToCopy.lstCVarQuotationRoute[i].ID,"ID",out _RowCountCharge);
                for (int j = 0; j < objCQuotationChargesToCopy.lstCVarQuotationCharges.Count; j++)
                {
                    CVarQuotationCharges objCVarQuotationCharges = new CVarQuotationCharges();
                    objCVarQuotationCharges.QuotationRouteID = objCVarQuotationRoute.ID;
                    objCVarQuotationCharges.ChargeTypeID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].ChargeTypeID;
                    objCVarQuotationCharges.MeasurementID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].MeasurementID;
                    objCVarQuotationCharges.ContainerTypeID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].ContainerTypeID;
                    objCVarQuotationCharges.DemurrageDays = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].DemurrageDays;
                    objCVarQuotationCharges.PackageTypeID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].PackageTypeID;
                    objCVarQuotationCharges.CostQuantity = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].CostQuantity;
                    objCVarQuotationCharges.CostPrice = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].CostPrice;
                    objCVarQuotationCharges.CostAmount = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].CostAmount;
                    objCVarQuotationCharges.CostCurrencyID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].CostCurrencyID;
                    //No Need to GET ExchangeRate for time of creation because this is handled when creating operation
                    objCVarQuotationCharges.CostExchangeRate = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].CostExchangeRate;
                    objCVarQuotationCharges.SaleQuantity = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].SaleQuantity;
                    objCVarQuotationCharges.SalePrice = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].SalePrice;
                    objCVarQuotationCharges.SaleAmount = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].SaleAmount;
                    objCVarQuotationCharges.SaleCurrencyID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].SaleCurrencyID;
                    objCVarQuotationCharges.POrC = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].POrC;
                    //No Need to GET ExchangeRate for time of creation because this is handled when creating operation
                    objCVarQuotationCharges.SaleExchangeRate = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].SaleExchangeRate;
                    objCVarQuotationCharges.OperationPartnerTypeID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].OperationPartnerTypeID;
                    objCVarQuotationCharges.CustomerID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].CustomerID;
                    objCVarQuotationCharges.AgentID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].AgentID;
                    objCVarQuotationCharges.ShippingAgentID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].ShippingAgentID;
                    objCVarQuotationCharges.CustomsClearanceAgentID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].CustomsClearanceAgentID;
                    objCVarQuotationCharges.ShippingLineID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].ShippingLineID;
                    objCVarQuotationCharges.AirlineID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].AirlineID;
                    objCVarQuotationCharges.TruckerID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].TruckerID;
                    objCVarQuotationCharges.SupplierID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].SupplierID;
                    objCVarQuotationCharges.CreatorUserID = objCVarQuotationCharges.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarQuotationCharges.CreationDate = objCVarQuotationCharges.ModificationDate = DateTime.Now;
                    //objCVarQuotationCharges.PricingID = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].PricingID;
                    objCVarQuotationCharges.Notes = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].Notes;
                    objCVarQuotationCharges.HsCode = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].HsCode;
                    objCVarQuotationCharges.CustomDuties = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].CustomDuties;
                    objCVarQuotationCharges.WTH = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].WTH;
                    objCVarQuotationCharges.BankFeeCharges = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].BankFeeCharges;
                    objCVarQuotationCharges.commission = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].commission;
                    objCVarQuotationCharges.SalesLineCrmCode = "";
                    objCVarQuotationCharges.CostLineCrmCode = "";


                    objCVarQuotationCharges.ViewOrder = objCQuotationChargesToCopy.lstCVarQuotationCharges[j].ViewOrder;
                    CQuotationCharges objCQuotationCharges = new CQuotationCharges();
                    objCQuotationCharges.lstCVarQuotationCharges.Add(objCVarQuotationCharges);
                    checkException = objCQuotationCharges.SaveMethod(objCQuotationCharges.lstCVarQuotationCharges);
                } //for (int j = 0; j < objCQuotationChargesToCopy.lstCVarQuotationCharges.Count; j++)
                #endregion Add QuotationCharges
            } //for (int i = 0; i < objCQuotationRouteToCopy.lstCVarQuotationRoute.Count; i++)
            #endregion QuotationRoutes/Charges
            return new object[] {
                pCopiedQuotationID
            };
        }

        [HttpGet, HttpPost]
        public object[] CreateOperationFromQuotation([FromBody] CreateOperationFromQuotationData createOperationFromQuotationData)
        {
            bool _result = false;
            int MainCarraigeRoutingTypeID = 30;
            int PickupRoutingTypeID = 10;
            int DeliveryRoutingTypeID = 50;
            int InlandTransportType = 3;
            int AirTransportType = 2;
            string InlandIconName = "fa-truck";
            Int64 OperationContainersAndPackagesID = 0;
            Int64 RoutingID = 0;

            string InlandIconStyleClassName = "inland-icon-style"; //holds the css class name
            int _RowCount = 0;
            Int64 PayablesID = 0;
            Int64 RecivableID = 0;

            Exception checkException = null;

            CCustomers objCCustomers = new CCustomers();
            COperations objCOperations = new COperations();

            CVarOperations objCVarOperations = new CVarOperations();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            string _UnEditableCompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            //TODO: GET pQuotationRouteID

            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            objCQuotationRoute.GetListPaging(999999, 1, "WHERE ID=" + createOperationFromQuotationData.pQuotationRouteID, "ID", out _RowCount);
            CQuotations objCQuotations = new CQuotations();
            objCQuotations.GetListPaging(999999, 1, "WHERE ID=" + createOperationFromQuotationData.pQuotationID, "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            checkException = objCCustomers.GetListPaging(1, 1, "WHERE IsInactive=1 and ID IN (" + objCQuotations.lstCVarQuotations[0].ShipperID + "," + objCQuotations.lstCVarQuotations[0].ConsigneeID + "," + objCQuotations.lstCVarQuotations[0].CustomerID + ")", "ID", out _RowCount);
            if (objCCustomers.lstCVarCustomers.Count > 0)
            {
                _result = false;
                //strMessageReturned = "This quotation has an inactive partner";
            }
            else
            {
                objCVarOperations.HouseNumber = "0";
                objCVarOperations.MasterBL = "0";
                objCVarOperations.MAWBSuffix = "0";
                objCVarOperations.BLDate = DateTime.Parse("01-01-1900");
                objCVarOperations.HBLDate = DateTime.Parse("01-01-1900");
                objCVarOperations.ReleaseDate = DateTime.Parse("01-01-1900");
                objCVarOperations.Form13Date = DateTime.Parse("01-01-1900");
                objCVarOperations.PODate = DateTime.Parse("01-01-1900");

                objCVarOperations.ClearanceApprovalDate = DateTime.Parse("01-01-1900");
                objCVarOperations.TruckingApprovalDate = DateTime.Parse("01-01-1900");
                objCVarOperations.FreightApprovalDate = DateTime.Parse("01-01-1900");

                objCVarOperations.ShippedOnBoardDate = DateTime.Parse("01-01-1900");
                objCVarOperations.FreightPayableAt = "0";
                objCVarOperations.CertificateNumber = "0";
                objCVarOperations.CountryOfOrigin = "0";
                objCVarOperations.InvoiceValue = "0";
                objCVarOperations.NumberOfOriginalBills = 3;

                objCVarOperations.QuotationRouteID = int.Parse(createOperationFromQuotationData.pQuotationRouteID);
                objCVarOperations.Code = createOperationFromQuotationData.pCode;
                objCVarOperations.BranchID = int.Parse(createOperationFromQuotationData.pBranchID);
                objCVarOperations.SalesmanID = int.Parse(createOperationFromQuotationData.pSalesmanID);
                objCVarOperations.OperationManID = int.Parse(createOperationFromQuotationData.pOperationManID);
                objCVarOperations.BLType = int.Parse(createOperationFromQuotationData.pBLType);
                objCVarOperations.BLTypeIconName = createOperationFromQuotationData.pBLTypeIconName;
                objCVarOperations.BLTypeIconStyle = createOperationFromQuotationData.pBLTypeIconStyle;
                objCVarOperations.DirectionType = int.Parse(createOperationFromQuotationData.pDirectionType);
                objCVarOperations.DirectionIconName = createOperationFromQuotationData.pDirectionIconName;
                objCVarOperations.DirectionIconStyle = createOperationFromQuotationData.pDirectionIconStyle;
                objCVarOperations.TransportType = int.Parse(createOperationFromQuotationData.pTransportType);
                objCVarOperations.TransportIconName = createOperationFromQuotationData.pTransportIconName;
                objCVarOperations.TransportIconStyle = createOperationFromQuotationData.pTransportIconStyle;
                objCVarOperations.ShipmentType = int.Parse(createOperationFromQuotationData.pShipmentType);
                objCVarOperations.ShipperID = int.Parse(createOperationFromQuotationData.pShipperID);
                objCVarOperations.ShipperAddressID = int.Parse(createOperationFromQuotationData.pShipperAddressID);
                objCVarOperations.ShipperContactID = int.Parse(createOperationFromQuotationData.pShipperContactID);
                objCVarOperations.ConsigneeID = int.Parse(createOperationFromQuotationData.pConsigneeID);
                objCVarOperations.ConsigneeAddressID = int.Parse(createOperationFromQuotationData.pConsigneeAddressID);
                objCVarOperations.ConsigneeContactID = int.Parse(createOperationFromQuotationData.pConsigneeContactID);
                objCVarOperations.AgentID = int.Parse(createOperationFromQuotationData.pAgentID);
                objCVarOperations.AgentAddressID = int.Parse(createOperationFromQuotationData.pAgentAddressID);
                objCVarOperations.AgentContactID = int.Parse(createOperationFromQuotationData.pAgentContactID);
                objCVarOperations.IncotermID = objCQuotationRoute.lstCVarQuotationRoute[0].IncotermID;
                objCVarOperations.CommodityID = int.Parse(createOperationFromQuotationData.pCommodityID);
                objCVarOperations.CommodityID2 = 0;
                objCVarOperations.CommodityID3 = 0;
                //objCVarOperations.TransientTime = int.Parse(createOperationFromQuotationData.pTransientTime); //Come From QuotationRoute(put in main route not here)
                //objCVarOperations.OpenDate = DateTime.Parse(createOperationFromQuotationData.pOpenDate); //this format has problem when works on server
                objCVarOperations.OpenDate = DateTime.Now;//(createOperationFromQuotationData.pOpenDate == null ? DateTime.Parse("01-01-1900") : createOperationFromQuotationData.pOpenDate);
                objCVarOperations.CloseDate = createOperationFromQuotationData.pCloseDate;// DateTime.Parse(createOperationFromQuotationData.pCloseDate);
                objCVarOperations.CutOffDate = DateTime.Parse("01-01-1900"); //not used 
                objCVarOperations.IncludePickup = (createOperationFromQuotationData.pIncludePickup == "True" ? true : false);
                objCVarOperations.PickupCityID = int.Parse(createOperationFromQuotationData.pPickupCityID);
                objCVarOperations.PickupAddressID = int.Parse(createOperationFromQuotationData.pPickupAddressID);
                objCVarOperations.POLCountryID = int.Parse(createOperationFromQuotationData.pPOLCountryID); //Come From QuotationRoute
                objCVarOperations.POL = int.Parse(createOperationFromQuotationData.pPOL); //Come From QuotationRoute
                objCVarOperations.PODCountryID = int.Parse(createOperationFromQuotationData.pPODCountryID); //Come From QuotationRoute
                objCVarOperations.POD = int.Parse(createOperationFromQuotationData.pPOD); //Come From QuotationRoute
                objCVarOperations.PickupAddress = createOperationFromQuotationData.pPickupAddress; //Come From QuotationRoute
                objCVarOperations.DeliveryAddress = createOperationFromQuotationData.pDeliveryAddress; //Come From QuotationRoute
                objCVarOperations.MoveTypeID = objCQuotationRoute.lstCVarQuotationRoute[0].MoveTypeID; //Come From QuotationRoute
                objCVarOperations.ShippingLineID = int.Parse(createOperationFromQuotationData.pShippingLineID);//Come From QuotationRoute
                objCVarOperations.AirlineID = int.Parse(createOperationFromQuotationData.pAirlineID);//Come From QuotationRoute
                objCVarOperations.TruckerID = int.Parse(createOperationFromQuotationData.pTruckerID);//Come From QuotationRoute
                objCVarOperations.IncludeDelivery = (createOperationFromQuotationData.pIncludeDelivery == "True" ? true : false);
                objCVarOperations.DeliveryZipCode = createOperationFromQuotationData.pDeliveryZipCode;
                objCVarOperations.DeliveryCityID = int.Parse(createOperationFromQuotationData.pDeliveryCityID);
                objCVarOperations.DeliveryCountryID = int.Parse(createOperationFromQuotationData.pDeliveryCountryID);
                objCVarOperations.GrossWeight = decimal.Parse(createOperationFromQuotationData.pGrossWeight);
                objCVarOperations.Volume = decimal.Parse(createOperationFromQuotationData.pVolume);
                objCVarOperations.VolumetricWeight = objCQuotationRoute.lstCVarQuotationRoute[0].VolumetricWeight;
                objCVarOperations.ChargeableWeight = decimal.Parse(createOperationFromQuotationData.pChargeableWeight);
                objCVarOperations.NumberOfPackages = int.Parse(createOperationFromQuotationData.pNumberOfPackages);
                objCVarOperations.IsDangerousGoods = (createOperationFromQuotationData.pIsDangerousGoods == "True" ? true : false);
                objCVarOperations.CustomerReference = "0"; //createOperationFromQuotationData.pCustomerReference;
                objCVarOperations.SupplierReference = "0";
                objCVarOperations.PONumber = "0";
                objCVarOperations.POValue = "0";
                objCVarOperations.ReleaseNumber = "0";
                objCVarOperations.Notes = createOperationFromQuotationData.pNotes;
                objCVarOperations.Notes2 = "0";
                objCVarOperations.AgreedRate = "0";
                objCVarOperations.OperationStageID = int.Parse(createOperationFromQuotationData.pOperationStageID);

                objCVarOperations.IsDelivered = false;
                objCVarOperations.IsTrucking = false;
                objCVarOperations.IsInsurance = false;
                objCVarOperations.IsClearance = false;
                objCVarOperations.IsBosla = false;
                objCVarOperations.IsGenset = false;
                objCVarOperations.IsCourrier = false;
                objCVarOperations.MarksAndNumbers = "0";
                objCVarOperations.IsTelexRelease = false;

                objCVarOperations.CreatorUserID = objCVarOperations.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperations.CreationDate = objCVarOperations.ModificationDate = DateTime.Now;

                #region AirAgents (Venus fields A.Medra)
                objCVarOperations.BLDate = DateTime.Parse("01/01/1900");
                objCVarOperations.MAWBStockID = 0;
                objCVarOperations.TypeOfStockID = 0;
                objCVarOperations.FlightNo = "0";
                objCVarOperations.POrC = _UnEditableCompanyName == "CQL" ? 3 : objCQuotationRoute.lstCVarQuotationRoute[0].POrC;
                objCVarOperations.IsAWB = false; //objCOperationToCopy.lstCVarOperations[0].IsAWB;
                                                 //Fields not in insert
                objCVarOperations.AirLineID1 = 0;
                objCVarOperations.FlightNo1 = "0";
                objCVarOperations.FlightDate1 = DateTime.Parse("01/01/1900");
                objCVarOperations.AirLineID2 = 0;
                objCVarOperations.FlightNo2 = "0";
                objCVarOperations.FlightDate2 = DateTime.Parse("01/01/1900");
                objCVarOperations.AirLineID3 = 0;
                objCVarOperations.FlightNo3 = "0";
                objCVarOperations.FlightDate3 = DateTime.Parse("01/01/1900");

                objCVarOperations.UNOrID = "0";
                objCVarOperations.ProperShippingName = "0";
                objCVarOperations.ClassOrDivision = "0";
                objCVarOperations.PackingGroup = "0";
                objCVarOperations.QuantityAndTypeOfPacking = "0";
                objCVarOperations.PackingInstruction = "0";
                objCVarOperations.ShippingDeclarationAuthorization = "0";
                objCVarOperations.Barcode = "0";

                objCVarOperations.GuaranteeLetterNumber = "0";
                objCVarOperations.GuaranteeLetterDate = DateTime.Parse("01/01/1900");
                objCVarOperations.GuaranteeLetterAmount = "0";
                objCVarOperations.GuaranteeLetterSupplierInvoiceNumber = "0";
                objCVarOperations.BankAccountID = 0;
                objCVarOperations.GuaranteeLetterNotes = "0";

                objCVarOperations.HandlingInformation = "0";
                objCVarOperations.AmountOfInsurance = "0";
                objCVarOperations.DeclaredValueForCarriage = "0";
                objCVarOperations.WeightCharge = 0;
                objCVarOperations.ValuationCharge = 0;
                objCVarOperations.OtherChargesDueAgent = 0;
                objCVarOperations.OtherCharges = "0";
                objCVarOperations.CurrencyID = objCvwDefaults.lstCVarvwDefaults[0].CurrencyID;
                objCVarOperations.AccountingInformation = "0";
                objCVarOperations.ReferenceNumber = "0";
                objCVarOperations.OptionalShippingInformation = "0";
                objCVarOperations.CHGSCode = "0";
                objCVarOperations.WT_VALL_Other = "0";
                objCVarOperations.DeclaredValueForCustoms = "0";
                objCVarOperations.Tax = 0;
                objCVarOperations.OtherChargesDueCarrier = 0;
                objCVarOperations.WT_VALL = "0";
                objCVarOperations.Description = "0";
                #endregion Venus fields A.Medra

                objCVarOperations.DismissalPermissionSerial = "0";
                objCVarOperations.DeliveryOrderSerial = "0";

                objCVarOperations.eFBLID = "0";
                objCVarOperations.eFBLStatus = 0;

                objCVarOperations.DispatchNumber = "0";
                objCVarOperations.BusinessUnit = "0";
                objCVarOperations.BusinessUnit2 = "0";
                objCVarOperations.Form13Number = "0";

                objCVarOperations.IMOClass = Decimal.Zero;
                objCVarOperations.UNNumber = 0;
                objCVarOperations.VesselID = 0;
                objCVarOperations.BookingNumber = "0";
                objCVarOperations.ACIDNumber = "0";
                objCVarOperations.ACIDDetails = "0";
                objCVarOperations.HouseParentID = 0;
                objCVarOperations.IATACode = "0";
                objCVarOperations.IssuingCarrier = "0";
                objCVarOperations.IssuingDate = DateTime.Parse("01-01-1900");
                objCVarOperations.StoreLocation = 0;
                objCVarOperations.BlStatus = "0";
                objCVarOperations.ForwarderId = 0;
                objCVarOperations.PrintHouseConsignee = false;
                objCVarOperations.HoldReason = "";
                objCVarOperations.DORepresentative = "";
                objCVarOperations.DOPrintedON = DateTime.Parse("01-01-1900");
                objCVarOperations.FileAccountingDate = DateTime.Parse("01-01-1900");
                objCVarOperations.DeliveryCustomer = "";
                objCVarOperations.ManifestPreConsignee = "";
                objCVarOperations.POTID = 0;
                objCVarOperations.HouseContainerNumber = "";
                objCVarOperations.Form13Notes = "0";
                objCOperations.lstCVarOperations.Add(objCVarOperations);
                checkException = objCOperations.SaveMethod(objCOperations.lstCVarOperations);

                #region CreateCostCenter
                CSystemOptions objCSystemOptions = new CSystemOptions();
                objCSystemOptions.GetList("Where OptionID=94");
                if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                {
                    string CostCenterNumberParent = "";
                    Int32 pID = 0;
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    CA_CostCenters objCA_CostCentersParent = new CA_CostCenters();
                    objCA_CostCentersParent.GetList("where ( CostCenterName=N'عمليات' or CostCenterName='Operations' ) and Parent_ID is null ");
                    if (objCA_CostCentersParent.lstCVarA_CostCenters.Count > 0)
                    {
                        pID = objCA_CostCentersParent.lstCVarA_CostCenters[0].ID;
                        CostCenterNumberParent = objCA_CostCentersParent.lstCVarA_CostCenters[0].RealCostCenterCode;
                    }

                    else
                    {

                        string pNewCodePartner = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_CostCenters_GetCode(" + (pID == 0 ? "null" : pID.ToString()) + ") AS Code");


                        CVarA_CostCenters objCVarA_CostCenters = new CVarA_CostCenters();
                        objCVarA_CostCenters.CostCenterNumber = pNewCodePartner.PadRight(12, '0');
                        objCVarA_CostCenters.CostCenterName = "Operations";
                        objCVarA_CostCenters.Parent_ID = 0;
                        objCVarA_CostCenters.IsMain = true;
                        objCVarA_CostCenters.CCLevel = 1;
                        objCVarA_CostCenters.RealCostCenterCode = pNewCodePartner;
                        objCVarA_CostCenters.User_ID = WebSecurity.CurrentUserId;
                        objCVarA_CostCenters.Type_ID = 0;
                        objCVarA_CostCenters.IsClosed = false;
                        objCVarA_CostCenters.SubAccountGroupID = 0;
                        objCVarA_CostCenters.EmployeesCount = 0;
                        objCVarA_CostCenters.Code = "0";
                        objCA_CostCentersParent.lstCVarA_CostCenters.Add(objCVarA_CostCenters);
                        checkException = objCA_CostCentersParent.SaveMethod(objCA_CostCentersParent.lstCVarA_CostCenters);

                        pID = objCA_CostCentersParent.lstCVarA_CostCenters[0].ID;
                        CostCenterNumberParent = objCA_CostCentersParent.lstCVarA_CostCenters[0].RealCostCenterCode;
                    }

                    CA_CostCenters objCA_CostCenters = new CA_CostCenters();
                    checkException = objCA_CostCenters.GetListPaging(1, 1, "WHERE ID = " + pID.ToString(), "ID", out _RowCount);
                    string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_CostCenters_GetCode(" + (pID == 0 ? "null" : pID.ToString()) + ") AS Code");

                    CvwOperations objCvwOperations = new CvwOperations();
                    objCvwOperations.GetList("WHERE ID=" + objCOperations.lstCVarOperations[0].ID);
                    string pNewCodeNew = CostCenterNumberParent + pNewCode;
                    CVarA_CostCenters objCVarA_CostCentersChild = new CVarA_CostCenters();
                    objCVarA_CostCentersChild.CostCenterNumber = pNewCodeNew.PadRight(12, '0'); ;
                    objCVarA_CostCentersChild.CostCenterName = objCvwOperations.lstCVarvwOperations[0].Code + " - " + objCvwOperations.lstCVarvwOperations[0].ClientName;
                    objCVarA_CostCentersChild.Parent_ID = pID;
                    objCVarA_CostCentersChild.IsMain = false;
                    objCVarA_CostCentersChild.CCLevel = 2;
                    objCVarA_CostCentersChild.RealCostCenterCode = pNewCodeNew;
                    objCVarA_CostCentersChild.User_ID = WebSecurity.CurrentUserId;
                    objCVarA_CostCentersChild.Type_ID = 0;
                    objCVarA_CostCentersChild.IsClosed = false;
                    objCVarA_CostCentersChild.SubAccountGroupID = 0;
                    objCVarA_CostCentersChild.EmployeesCount = 0;
                    objCVarA_CostCentersChild.Code = "0";
                    objCA_CostCentersParent.lstCVarA_CostCenters.Add(objCVarA_CostCentersChild);
                    checkException = objCA_CostCentersParent.SaveMethod(objCA_CostCentersParent.lstCVarA_CostCenters);

                    //Link Oeation With CostCenter Add by ahmed maher
                    int _RowCount2 = 0;
                    objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
                    string CompanyName2 = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                    if (CompanyName2 == "BED")
                    {
                        CVarA_LinkOperationWithCostCenter objCVarA_LinkOperationWithCostCenter = new CVarA_LinkOperationWithCostCenter();

                        objCVarA_LinkOperationWithCostCenter.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarA_LinkOperationWithCostCenter.CostCenterID = objCVarA_CostCentersChild.ID;

                        CA_LinkOperationWithCostCenter objA_LinkOperationWithCostCenter = new CA_LinkOperationWithCostCenter();
                        objA_LinkOperationWithCostCenter.lstCVarA_LinkOperationWithCostCenter.Add(objCVarA_LinkOperationWithCostCenter);
                        checkException = objA_LinkOperationWithCostCenter.SaveMethod(objA_LinkOperationWithCostCenter.lstCVarA_LinkOperationWithCostCenter);
                    }

                }


                #endregion
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                {
                    _result = true;

                    //COPY Partners To OperationPartners
                    #region Copy Operation Partners (at this point its just either a shipper or a consignee and maybe agent and empty notify)
                    COperationPartners objCOperationPartners = new COperationPartners();
                    CContacts objCContacts = new CContacts(); //to get default contact

                    //if (createOperationFromQuotationData.pDirectionType == "1") //import (consignee)
                    //{
                    CVarOperationPartners objCVarOperationConsigneePartner = new CVarOperationPartners();
                    objCVarOperationConsigneePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                    objCVarOperationConsigneePartner.OperationPartnerTypeID = 2;//consignee
                    objCVarOperationConsigneePartner.CustomerID = int.Parse(createOperationFromQuotationData.pConsigneeID);
                    objCVarOperationConsigneePartner.ContactID = Int64.Parse(createOperationFromQuotationData.pConsigneeContactID);
                    objCVarOperationConsigneePartner.IsOperationClient = false;
                    objCVarOperationConsigneePartner.CreatorUserID = objCVarOperationConsigneePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationConsigneePartner.CreationDate = objCVarOperationConsigneePartner.ModificationDate = DateTime.Now;
                    objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationConsigneePartner);

                    //CVarOperationPartners objCVarOperationShipperPartner = new CVarOperationPartners();
                    //objCVarOperationShipperPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                    //objCVarOperationShipperPartner.OperationPartnerTypeID = 1;//Shipper
                    //objCVarOperationShipperPartner.CustomerID = 0; // it will be set as null in DB
                    //objCVarOperationShipperPartner.ContactID = 0;
                    //objCVarOperationShipperPartner.CreatorUserID = objCVarOperationShipperPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                    //objCVarOperationShipperPartner.CreationDate = objCVarOperationShipperPartner.ModificationDate = DateTime.Now;
                    //objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationShipperPartner);

                    //}
                    //else //export or domestic (shipper)
                    //{
                    CVarOperationPartners objCVarOperationShipperPartner = new CVarOperationPartners();

                    objCVarOperationShipperPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                    objCVarOperationShipperPartner.OperationPartnerTypeID = 1; // export or domestic (shipper)
                    objCVarOperationShipperPartner.CustomerID = int.Parse(createOperationFromQuotationData.pShipperID);
                    objCVarOperationShipperPartner.ContactID = Int64.Parse(createOperationFromQuotationData.pShipperContactID);
                    objCVarOperationShipperPartner.IsOperationClient = objCQuotations.lstCVarQuotations[0].IsWarehousing ? true : false;
                    objCVarOperationShipperPartner.CreatorUserID = objCVarOperationShipperPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationShipperPartner.CreationDate = objCVarOperationShipperPartner.ModificationDate = DateTime.Now;
                    objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationShipperPartner);

                    //CVarOperationPartners objCVarOperationConsigneePartner = new CVarOperationPartners();
                    //objCVarOperationConsigneePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                    //objCVarOperationConsigneePartner.OperationPartnerTypeID = 2;//consignee
                    //objCVarOperationConsigneePartner.CustomerID = 0; // it will be set as null in DB
                    //objCVarOperationConsigneePartner.ContactID = 0;
                    //objCVarOperationConsigneePartner.CreatorUserID = objCVarOperationConsigneePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                    //objCVarOperationConsigneePartner.CreationDate = objCVarOperationConsigneePartner.ModificationDate = DateTime.Now;
                    //objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationConsigneePartner);
                    //}
                    CVarOperationPartners objCVarOperationNotifyPartner = new CVarOperationPartners();
                    objCVarOperationNotifyPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                    objCVarOperationNotifyPartner.OperationPartnerTypeID = 4;//Notify1
                    objCVarOperationNotifyPartner.CustomerID = 0; // it will bw set as null in DB
                    objCVarOperationNotifyPartner.ContactID = 0;
                    objCVarOperationNotifyPartner.IsOperationClient = false;
                    objCVarOperationNotifyPartner.CreatorUserID = objCVarOperationNotifyPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationNotifyPartner.CreationDate = objCVarOperationNotifyPartner.ModificationDate = DateTime.Now;
                    objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationNotifyPartner);

                    CVarOperationPartners objCVarOperationAgentPartner = new CVarOperationPartners();
                    objCVarOperationAgentPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                    objCVarOperationAgentPartner.OperationPartnerTypeID = 6; //constAgentOperationPartnerTypeID
                    objCVarOperationAgentPartner.AgentID = int.Parse(createOperationFromQuotationData.pAgentID);
                    objCVarOperationAgentPartner.ContactID = int.Parse(createOperationFromQuotationData.pAgentContactID);
                    objCVarOperationAgentPartner.IsOperationClient = false;
                    objCVarOperationAgentPartner.CreatorUserID = objCVarOperationAgentPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationAgentPartner.CreationDate = objCVarOperationAgentPartner.ModificationDate = DateTime.Now;
                    objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationAgentPartner);

                    //Adding the line enetered in the Routings & Charges tab
                    if (createOperationFromQuotationData.pShippingLineID != "0")
                    {
                        CVarOperationPartners objCVarOperationShippingLinePartner = new CVarOperationPartners();
                        objCVarOperationShippingLinePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarOperationShippingLinePartner.OperationPartnerTypeID = 9; //constShippingLineOperationPartnerTypeID
                        objCVarOperationShippingLinePartner.ShippingLineID = int.Parse(createOperationFromQuotationData.pShippingLineID);
                        objCContacts.GetList("WHERE PartnerTypeID=5 AND PartnerID=" + createOperationFromQuotationData.pShippingLineID.ToString());
                        objCVarOperationShippingLinePartner.IsOperationClient = false;
                        objCVarOperationShippingLinePartner.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                        objCVarOperationShippingLinePartner.CreatorUserID = objCVarOperationShippingLinePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationShippingLinePartner.CreationDate = objCVarOperationShippingLinePartner.ModificationDate = DateTime.Now;
                        objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationShippingLinePartner);
                    }
                    else if (createOperationFromQuotationData.pAirlineID != "0")
                    {
                        CVarOperationPartners objCVarOperationAirlinePartner = new CVarOperationPartners();
                        objCVarOperationAirlinePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarOperationAirlinePartner.OperationPartnerTypeID = 10; //constAirlineOperationPartnerTypeID
                        objCVarOperationAirlinePartner.AirlineID = int.Parse(createOperationFromQuotationData.pAirlineID);
                        objCContacts.GetList("WHERE PartnerTypeID=6 AND PartnerID=" + createOperationFromQuotationData.pAirlineID.ToString());
                        objCVarOperationAirlinePartner.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                        objCVarOperationAirlinePartner.IsOperationClient = false;
                        objCVarOperationAirlinePartner.CreatorUserID = objCVarOperationAirlinePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationAirlinePartner.CreationDate = objCVarOperationAirlinePartner.ModificationDate = DateTime.Now;
                        objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationAirlinePartner);
                    }
                    else if (createOperationFromQuotationData.pTruckerID != "0")
                    {
                        CVarOperationPartners objCVarOperationTruckerPartner = new CVarOperationPartners();
                        objCVarOperationTruckerPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarOperationTruckerPartner.OperationPartnerTypeID = 11; //constTruckerOperationPartnerTypeID
                        objCVarOperationTruckerPartner.TruckerID = int.Parse(createOperationFromQuotationData.pTruckerID);
                        objCContacts.GetList("WHERE PartnerTypeID=7 AND PartnerID=" + createOperationFromQuotationData.pTruckerID.ToString());
                        objCVarOperationTruckerPartner.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                        objCVarOperationTruckerPartner.IsOperationClient = false;
                        objCVarOperationTruckerPartner.CreatorUserID = objCVarOperationTruckerPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationTruckerPartner.CreationDate = objCVarOperationTruckerPartner.ModificationDate = DateTime.Now;
                        objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationTruckerPartner);
                    }

                    objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);

                    #endregion

                    //COPY Receivables AND Payables
                    #region Copy Receivables AND Payables
                    CReceivables objCReceivables = new CReceivables(); //to copy in it the records to be inserted
                    CPayables objCPayables = new CPayables(); //to copy in it the records to be inserted
                    CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
                    //those 2 lines are to get the charge types from QuotationCharges table from DB
                    CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
                    //objCvwQuotationCharges.GetList(" WHERE QuotationRouteID = " + createOperationFromQuotationData.pQuotationRouteID);
                    int _tempRowCount = 0;
                    checkException = objCvwQuotationCharges.GetListPaging(5000, 1, " WHERE QuotationRouteID = " + createOperationFromQuotationData.pQuotationRouteID, " ID ", out _tempRowCount);

                    string pWhereClauseCurrencyDetails = "";
                    CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                    CVarPayables objCVarPayables = new CVarPayables();
                    foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                    {
                        checkException = objCvwChargeTypes.GetListPaging(1, 1, "WHERE ID=" + rowQuotationCharge.ChargeTypeID, "ID", out _RowCount);
                        #region Copy Receivables
                        pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.SaleCurrencyID
                            + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                            + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                            + " ORDER BY CODE";
                        objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                        Int64 pReceivableID = 0;
                        if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                        {
                            CVarReceivables objCVarReceivables = new CVarReceivables();
                            objCVarReceivables.OperationID = objCOperations.lstCVarOperations[0].ID;
                            objCVarReceivables.ChargeTypeID = rowQuotationCharge.ChargeTypeID;
                            objCVarReceivables.POrC = rowQuotationCharge.POrC;
                            objCVarReceivables.SupplierID = 0;
                            objCVarReceivables.MeasurementID = rowQuotationCharge.MeasurementID;
                            objCVarReceivables.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                            objCVarReceivables.PackageTypeID = rowQuotationCharge.PackageTypeID;
                            objCVarReceivables.Quantity = rowQuotationCharge.CostQuantity == 0 ? 1 : rowQuotationCharge.CostQuantity; //if SaleQuantity is activated then change to it
                                                                                                                                      //objCVarReceivables.CostPrice = rowQuotationCharge.CostPrice;
                                                                                                                                      //objCVarReceivables.CostAmount = rowQuotationCharge.CostAmount;
                            objCVarReceivables.SalePrice = rowQuotationCharge.SalePrice;
                            objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
                            #region Set Tax if set in ChargeTypes
                            if (objCvwDefaults.lstCVarvwDefaults[0].IsTaxOnItems && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "GBL")
                            {
                                objCVarReceivables.TaxeTypeID = objCvwChargeTypes.lstCVarvwChargeTypes[0].TaxeTypeID;
                                objCVarReceivables.TaxPercentage = objCvwChargeTypes.lstCVarvwChargeTypes[0].TaxPercentage;
                                objCVarReceivables.TaxAmount = Math.Round((objCVarReceivables.AmountWithoutVAT * objCVarReceivables.TaxPercentage / 100), 2);
                            }
                            else
                            {
                                objCVarReceivables.TaxeTypeID = 0;
                                objCVarReceivables.TaxPercentage = 0;
                                objCVarReceivables.TaxAmount = 0;
                            }
                            #endregion Set Tax if set in ChargeTypes
                            objCVarReceivables.SaleAmount = objCVarReceivables.AmountWithoutVAT + objCVarReceivables.TaxAmount;
                            objCVarReceivables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.SaleExchangeRate;
                            objCVarReceivables.CurrencyID = rowQuotationCharge.SaleCurrencyID;
                            objCVarReceivables.GeneratingQRID = Int64.Parse(createOperationFromQuotationData.pQuotationRouteID);
                            objCVarReceivables.Notes = rowQuotationCharge.Notes;

                            objCVarReceivables.IssueDate = DateTime.Now;
                            objCVarReceivables.OperationContainersAndPackagesID = 0;

                            objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                            objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                            objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                            objCVarReceivables.ReceiptNo = "";
                            objCVarReceivables.TariffID = 0;
                            objCVarReceivables.ManualChargeType = "0";
                            objCVarReceivables.CostCenterId = 0;
                            objCVarReceivables.IsOfficial = false;
                            objCVarReceivables.crmCode = "";

                            objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarReceivables.CreationDate = objCVarReceivables.ModificationDate = DateTime.Now;

                            objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                            objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                            pReceivableID = objCVarReceivables.ID;
                            RecivableID = objCVarReceivables.ID;

                        }
                        #endregion Copy Receivables

                        #region Copy Payables
                        pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.CostCurrencyID
                            + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                            + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                            + " ORDER BY CODE";
                        objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                        //if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                        //if (rowQuotationCharge.CostAmount > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ELI"|| objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                        if ((rowQuotationCharge.CostAmount > 0 && (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ELI" || objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "NIV")) ||(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI" && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "NIV"))
                        {
                            objCVarPayables.ID = 0;

                            objCVarPayables.OperationID = objCOperations.lstCVarOperations[0].ID;
                            objCVarPayables.ChargeTypeID = rowQuotationCharge.ChargeTypeID;
                            objCVarPayables.POrC = rowQuotationCharge.POrC;

                            objCVarPayables.BillTo = 0; // reset objCVarPayables.BillTo
                            // get OperationPartnerID to insert into objCVarPayables.BillTo
                            if (rowQuotationCharge.BillTo != 0)
                            {
                                int dummy = 0;
                                string OperationPartnersWhereClause = " WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID;
                                OperationPartnersWhereClause += " AND OperationPartnerTypeID=" + rowQuotationCharge.BillTo_OperationPartnerTypeID;
                                if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 1 || rowQuotationCharge.BillTo_OperationPartnerTypeID == 2)
                                {
                                    OperationPartnersWhereClause += " AND CustomerID=" + rowQuotationCharge.BillTo;
                                }
                                else if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 6)
                                {
                                    OperationPartnersWhereClause += " AND AgentID=" + rowQuotationCharge.BillTo;
                                }
                                else if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 9)
                                {
                                    OperationPartnersWhereClause += " AND ShippingLineID=" + rowQuotationCharge.BillTo;
                                }
                                else if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 10)
                                {
                                    OperationPartnersWhereClause += " AND AirlineID=" + rowQuotationCharge.BillTo;
                                }
                                else if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 11)
                                {
                                    OperationPartnersWhereClause += " AND TruckerID=" + rowQuotationCharge.BillTo;
                                }
                                COperationPartners cOperationPartners = new COperationPartners();
                                cOperationPartners.GetListPaging(9, 1, OperationPartnersWhereClause, "ID", out dummy);
                                if (dummy > 0)
                                    objCVarPayables.BillTo = cOperationPartners.lstCVarOperationPartners[0].ID;
                            }


                            objCVarPayables.SupplierOperationPartnerID = 0;

                            objCVarPayables.SupplierSiteID = rowQuotationCharge.SupplierSiteID;
                            objCVarPayables.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                            objCVarPayables.MeasurementID = rowQuotationCharge.MeasurementID;
                            objCVarPayables.Quantity = rowQuotationCharge.CostQuantity;
                            objCVarPayables.CostPrice = rowQuotationCharge.CostPrice;
                            objCVarPayables.CostAmount = rowQuotationCharge.CostAmount;
                            objCVarPayables.QuotationCost = rowQuotationCharge.CostAmount;
                            objCVarPayables.AmountWithoutVAT = rowQuotationCharge.CostAmount; //still no VAT entered so they are the same
                            if (objCvwDefaults.lstCVarvwDefaults.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName.Equals("BED"))
                            {
                                objCVarPayables.CostAmount = 0;
                                objCVarPayables.AmountWithoutVAT = 0;
                            }
                            objCVarPayables.SupplierInvoiceNo = "0";
                            objCVarPayables.SupplierReceiptNo = "0";
                            objCVarPayables.EntryDate = DateTime.Now;
                            objCVarPayables.BillID = 0;

                            objCVarPayables.IssueDate = DateTime.Now;
                            objCVarPayables.OperationContainersAndPackagesID = 0;

                            objCVarPayables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.CostExchangeRate;
                            objCVarPayables.CurrencyID = rowQuotationCharge.CostCurrencyID;
                            objCVarPayables.GeneratingQRID = Int64.Parse(createOperationFromQuotationData.pQuotationRouteID);
                            objCVarPayables.Notes = rowQuotationCharge.Notes;
                            objCVarPayables.IsOfficial = false;
                            objCVarPayables.ReceivableID = pReceivableID; //objCVarReceivables.ID;
                            objCVarPayables.IssueDate = DateTime.Now;
                            objCVarPayables.IsQuotationApproval = false;
                            objCVarPayables.ApprovePendingValue = 0;
                            objCVarPayables.crmCode = "";
                            objCVarPayables.IsPurchased = false;

                            objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;
                            objCPayables.lstCVarPayables.Add(objCVarPayables);
                            checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);

                            PayablesID = objCVarPayables.ID;

                            // update Receivables.PayableID for BillTo in Receivables to read from Payables
                            string ReceivablesUpdateClause = " PayableID=" + PayablesID;
                            ReceivablesUpdateClause += " WHERE ID=" + pReceivableID;
                            CReceivables objCReceivables_Update_PayableID = new CReceivables();
                            checkException = objCReceivables_Update_PayableID.UpdateList(ReceivablesUpdateClause);
                        }


                        #endregion Copy Payables

                        #region Add Operation Partner if its not added yet and update the SupplierOperationPartnerID to the corresponding one
                        COperationPartners objCSupplierOperationPartner = new COperationPartners();
                        if (rowQuotationCharge.OperationPartnerTypeID != 0) //then check if partner is already entered then set the SupplierOperationPartnerID else add the OperationPartner then set the SupplierOperationPartnerID in Payables
                        {
                            Int64 pSupplierOperationPartnerID = 0;
                            CvwOperationPartners objCvwOperationPartnersCheckExistence = new CvwOperationPartners();
                            objCvwOperationPartnersCheckExistence.GetList("WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID + " AND OperationPartnerTypeID=" + rowQuotationCharge.OperationPartnerTypeID + " AND PartnerTypeID=" + rowQuotationCharge.PartnerTypeID + " AND PartnerID=" + rowQuotationCharge.PartnerSupplierID);
                            if (objCvwOperationPartnersCheckExistence.lstCVarvwOperationPartners.Count > 0) //OperationPartner is already entered
                            {
                                pSupplierOperationPartnerID = objCvwOperationPartnersCheckExistence.lstCVarvwOperationPartners[0].ID;
                            }
                            else //operation Partner is not added yet, so add it the take its ID to set the SupplierOperationPartnerID
                            {
                                objCContacts.GetList("WHERE PartnerTypeID=" + rowQuotationCharge.PartnerTypeID.ToString() + " AND PartnerID=" + rowQuotationCharge.PartnerSupplierID.ToString());
                                CVarOperationPartners objCVarSupplierOperationPartner = new CVarOperationPartners();
                                objCVarSupplierOperationPartner.ID = 0;
                                objCVarSupplierOperationPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                                objCVarSupplierOperationPartner.OperationPartnerTypeID = rowQuotationCharge.OperationPartnerTypeID;
                                objCVarSupplierOperationPartner.CustomerID = rowQuotationCharge.CustomerID;
                                objCVarSupplierOperationPartner.AgentID = rowQuotationCharge.AgentID;
                                objCVarSupplierOperationPartner.ShippingAgentID = rowQuotationCharge.ShippingAgentID;
                                objCVarSupplierOperationPartner.CustomsClearanceAgentID = rowQuotationCharge.CustomsClearanceAgentID;
                                objCVarSupplierOperationPartner.ShippingLineID = rowQuotationCharge.ShippingLineID;
                                objCVarSupplierOperationPartner.AirlineID = rowQuotationCharge.AirlineID;
                                objCVarSupplierOperationPartner.TruckerID = rowQuotationCharge.TruckerID;
                                objCVarSupplierOperationPartner.SupplierID = rowQuotationCharge.SupplierID;
                                objCVarSupplierOperationPartner.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                                objCVarSupplierOperationPartner.IsOperationClient = false;
                                objCVarSupplierOperationPartner.CreatorUserID = objCVarSupplierOperationPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarSupplierOperationPartner.CreationDate = objCVarSupplierOperationPartner.ModificationDate = DateTime.Now;
                                objCSupplierOperationPartner.lstCVarOperationPartners.Add(objCVarSupplierOperationPartner);
                                checkException = objCSupplierOperationPartner.SaveMethod(objCSupplierOperationPartner.lstCVarOperationPartners);
                                pSupplierOperationPartnerID = objCVarSupplierOperationPartner.ID;
                            }
                            checkException = objCPayables.UpdateList("SupplierOperationPartnerID=" + pSupplierOperationPartnerID.ToString() + " WHERE ID=" + objCVarPayables.ID.ToString());
                        }
                        #endregion Add Operation Partner if its not added yet and update the SupplierOperationPartnerID to the corresponding one

                        #region Add Containers/Packages if not added yet
                        // this region adds a Containers/Packages for every rowQuotationCharge that has a different ContainerTypeID or PackageTypeID
                        // AirTransportType takes Containers/Packages from QuotationContainersAndPackages not from QuotationCharges(rowQuotationCharge)

                        if (!(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL" && int.Parse(createOperationFromQuotationData.pTransportType) == InlandTransportType)
                            && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI"
                            && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "SUN"
                            && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "BED"
                            && int.Parse(createOperationFromQuotationData.pTransportType) != AirTransportType)  // AirTransportType takes Containers/Packages from QuotationContainersAndPackages not from QuotationCharges(rowQuotationCharge)
                        {
                            COperationContainersAndPackages objCOperationContainersAndPackages_QuotCharge = new COperationContainersAndPackages(); //to copy in it the records to be inserted

                            if (rowQuotationCharge.ContainerTypeID != 0 || rowQuotationCharge.PackageTypeID != 0) //then check if there Exists a container/Package
                            {
                                CvwOperationContainersAndPackages objCvwOperationContainersAndPackagesCheckExistence = new CvwOperationContainersAndPackages();
                                objCvwOperationContainersAndPackagesCheckExistence.GetList("WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID
                                    + (rowQuotationCharge.ContainerTypeID != 0
                                        ? (" AND ContainerTypeID=" + rowQuotationCharge.ContainerTypeID)
                                        : (" AND PackageTypeID=" + rowQuotationCharge.PackageTypeID)
                                      )
                                    );
                                //if (objCvwOperationContainersAndPackagesCheckExistence.lstCVarvwOperationContainersAndPackages.Count == 0) // Container or Package is not added so add it
                                {
                                    ////the next condition is add containers in operations a number of times equal to the quantity, // to change that just delete the if condition and keep only whats written in the else clause
                                    //if (int.Parse(createOperationFromQuotationData.pShipmentType) == 1 || int.Parse(createOperationFromQuotationData.pShipmentType) == 3) //FCL or FTL

                                    CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();
                                    objCVarOperationContainersAndPackages.OperationID = objCOperations.lstCVarOperations[0].ID;
                                    objCVarOperationContainersAndPackages.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                                    objCVarOperationContainersAndPackages.PackageTypeID = rowQuotationCharge.PackageTypeID;
                                    //the numbers of containers is always 1 because it holds packages
                                    objCVarOperationContainersAndPackages.Quantity = 0; //rowQuotationCharge.CostQuantity == 0 ? 1 : decimal.ToInt32(rowQuotationCharge.CostQuantity);
                                                                                        //objCVarOperationContainersAndPackages.Length = rowQuotationCharge.Length;
                                                                                        //objCVarOperationContainersAndPackages.Width = rowQuotationCharge.Width;
                                                                                        //objCVarOperationContainersAndPackages.Height = rowQuotationCharge.Height;
                                                                                        //objCVarOperationContainersAndPackages.Volume = rowQuotationCharge.Volume;
                                                                                        //objCVarOperationContainersAndPackages.VolumetricWeight = rowQuotationCharge.VolumetricWeight;
                                                                                        //objCVarOperationContainersAndPackages.NetWeight = rowQuotationCharge.NetWeight;
                                                                                        //objCVarOperationContainersAndPackages.GrossWeight = rowQuotationCharge.GrossWeight;
                                                                                        //objCVarOperationContainersAndPackages.ChargeableWeight = rowQuotationCharge.ChargeableWeight;
                                    objCVarOperationContainersAndPackages.ContainerNumber = "0";
                                    objCVarOperationContainersAndPackages.CarrierSeal = "0";
                                    objCVarOperationContainersAndPackages.ShipperSeal = "0";
                                    objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                                    objCVarOperationContainersAndPackages.DescriptionOfGoods = "0";

                                    objCVarOperationContainersAndPackages.LotNumber = "0";
                                    objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.Factory = "0";
                                    objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                                    objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                                    objCVarOperationContainersAndPackages.IsAsAgreed = false;
                                    objCVarOperationContainersAndPackages.IsMinimum = false;
                                    objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                                    objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                                    objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                                    objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                                    objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                                    objCVarOperationContainersAndPackages.ReturnDepot = "0";
                                    objCVarOperationContainersAndPackages.WeightUnit = "0";
                                    objCVarOperationContainersAndPackages.RateClass = "0";
                                    objCVarOperationContainersAndPackages.IsFull = false;
                                    objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");

                                    objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                                    objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

                                    objCOperationContainersAndPackages_QuotCharge.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);

                                    checkException = objCOperationContainersAndPackages_QuotCharge.SaveMethod(objCOperationContainersAndPackages_QuotCharge.lstCVarOperationContainersAndPackages);
                                }
                            }
                        } //EOF if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                        #endregion Add Operation Containers/Packages if not added yet
                    }

                    #endregion

                    ////COPY CONTAINERS AND PACKAGES
                    #region Copy Containers And Packages
                    COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages(); //to copy in it the records to be inserted
                                                                                                                                //those 2 lines are to get the ContainersAndPackages Data from QuotationContainersAndPAckages table from DB
                    CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
                    if (!(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL" && int.Parse(createOperationFromQuotationData.pTransportType) == InlandTransportType))
                        objCQuotationContainersAndPackages.GetList(" WHERE QuotationRouteID = " + createOperationFromQuotationData.pQuotationRouteID); ;

                    foreach (var rowQuotationContainersAndPackages in objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages)
                    {
                        for (int z = 0; z < rowQuotationContainersAndPackages.Quantity; z++)
                        {
                            CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();

                            objCVarOperationContainersAndPackages.OperationID = objCOperations.lstCVarOperations[0].ID;
                            objCVarOperationContainersAndPackages.ContainerTypeID = rowQuotationContainersAndPackages.ContainerTypeID;
                            objCVarOperationContainersAndPackages.PackageTypeID = rowQuotationContainersAndPackages.PackageTypeID;

                            //the numbers of containers is always 1 because it holds packages unless if AirTransportType
                            objCVarOperationContainersAndPackages.Quantity = 1;

                            // AirTransportType does not create a package for every Quantity but creates a one with the total quantity
                            if (int.Parse(createOperationFromQuotationData.pTransportType) == AirTransportType)
                            {
                                z = rowQuotationContainersAndPackages.Quantity;  // means end the loop
                                objCVarOperationContainersAndPackages.Quantity = rowQuotationContainersAndPackages.Quantity;
                            }

                            objCVarOperationContainersAndPackages.Length = rowQuotationContainersAndPackages.Length;
                            objCVarOperationContainersAndPackages.Width = rowQuotationContainersAndPackages.Width;
                            objCVarOperationContainersAndPackages.Height = rowQuotationContainersAndPackages.Height;
                            objCVarOperationContainersAndPackages.Volume = rowQuotationContainersAndPackages.Volume;
                            objCVarOperationContainersAndPackages.VolumetricWeight = rowQuotationContainersAndPackages.VolumetricWeight;
                            objCVarOperationContainersAndPackages.NetWeight = rowQuotationContainersAndPackages.NetWeight;
                            objCVarOperationContainersAndPackages.NetWeightTON = 0;
                            objCVarOperationContainersAndPackages.GrossWeight = rowQuotationContainersAndPackages.GrossWeight;
                            objCVarOperationContainersAndPackages.GrossWeightTON = 0;
                            objCVarOperationContainersAndPackages.ChargeableWeight = rowQuotationContainersAndPackages.ChargeableWeight;
                            objCVarOperationContainersAndPackages.ContainerNumber = "0";
                            objCVarOperationContainersAndPackages.CarrierSeal = "0";
                            objCVarOperationContainersAndPackages.ShipperSeal = "0";
                            objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                            objCVarOperationContainersAndPackages.DescriptionOfGoods = "0";

                            objCVarOperationContainersAndPackages.LotNumber = "0";
                            objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackages.Factory = "0";
                            objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                            objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                            objCVarOperationContainersAndPackages.IsAsAgreed = false;
                            objCVarOperationContainersAndPackages.IsMinimum = false;
                            objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                            objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                            objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                            objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                            objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                            objCVarOperationContainersAndPackages.ReturnDepot = "0";
                            objCVarOperationContainersAndPackages.WeightUnit = "0";
                            objCVarOperationContainersAndPackages.RateClass = "0";
                            objCVarOperationContainersAndPackages.IsFull = false;
                            objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");

                            objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

                            objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);


                        } //for (int z = 0; z < rowQuotationContainersAndPackages.Quantity; z++)
                    } //foreach (var rowQuotationContainersAndPackages in objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages)

                    objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
                    OperationContainersAndPackagesID = objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Count > 0 ? objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].ID : 0;

                    #endregion

                    //COPY Routings To Routings
                    //MainCarraige has ID = 30
                    #region Copy Operation Routings (Main Carraige)
                    CRoutings objCRoutings = new CRoutings();
                    #region Add MainCarraigeRoutingType

                    CVarRoutings objCVarMainCarraigeRoutings = new CVarRoutings();

                    objCVarMainCarraigeRoutings.OperationID = objCOperations.lstCVarOperations[0].ID;
                    objCVarMainCarraigeRoutings.TransportType = objCOperations.lstCVarOperations[0].TransportType;
                    objCVarMainCarraigeRoutings.TransportIconName = objCOperations.lstCVarOperations[0].TransportIconName;
                    objCVarMainCarraigeRoutings.TransportIconStyle = objCOperations.lstCVarOperations[0].TransportIconStyle;
                    objCVarMainCarraigeRoutings.RoutingTypeID = MainCarraigeRoutingTypeID; //Main Carraige
                    objCVarMainCarraigeRoutings.POLCountryID = objCOperations.lstCVarOperations[0].POLCountryID;
                    objCVarMainCarraigeRoutings.POL = objCOperations.lstCVarOperations[0].POL;
                    objCVarMainCarraigeRoutings.PODCountryID = objCOperations.lstCVarOperations[0].PODCountryID;
                    objCVarMainCarraigeRoutings.POD = objCOperations.lstCVarOperations[0].POD;
                    objCVarMainCarraigeRoutings.ETAPOLDate = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutings.ATAPOLDate = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutings.ExpectedDeparture = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutings.ActualDeparture = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutings.ExpectedArrival = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutings.ActualArrival = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutings.VoyageOrTruckNumber = "0";
                    objCVarMainCarraigeRoutings.TransientTime = Int32.Parse(createOperationFromQuotationData.pTransientTime);
                    objCVarMainCarraigeRoutings.Validity = Int32.Parse(createOperationFromQuotationData.pValidity);
                    objCVarMainCarraigeRoutings.FreeTime = Int32.Parse(createOperationFromQuotationData.pFreeTime);
                    objCVarMainCarraigeRoutings.Notes = "0";
                    if (createOperationFromQuotationData.pTransportType == "1")
                    {//Ocean
                        objCVarMainCarraigeRoutings.ShippingLineID = objCOperations.lstCVarOperations[0].ShippingLineID;
                        objCVarMainCarraigeRoutings.AirlineID = 0;
                        objCVarMainCarraigeRoutings.TruckerID = 0;
                    }
                    else if (createOperationFromQuotationData.pTransportType == "2")
                    {//Air
                        objCVarMainCarraigeRoutings.ShippingLineID = 0;
                        objCVarMainCarraigeRoutings.AirlineID = objCOperations.lstCVarOperations[0].AirlineID;
                        objCVarMainCarraigeRoutings.TruckerID = 0;
                    }
                    else
                    {//Inland , TransportType = 3
                        objCVarMainCarraigeRoutings.ShippingLineID = 0;
                        objCVarMainCarraigeRoutings.AirlineID = 0;
                        objCVarMainCarraigeRoutings.TruckerID = objCOperations.lstCVarOperations[0].TruckerID;
                    }

                    objCVarMainCarraigeRoutings.GensetSupplierID = 0; //pGensetSupplierID;
                    objCVarMainCarraigeRoutings.CCAID = 0; //pCCAID;
                    objCVarMainCarraigeRoutings.Quantity = "0"; //pQuantity;
                    objCVarMainCarraigeRoutings.ContactPerson = "0";
                    objCVarMainCarraigeRoutings.PickupAddress = "0";
                    objCVarMainCarraigeRoutings.DeliveryAddress = "0";
                    objCVarMainCarraigeRoutings.GateInPortID = 0;
                    objCVarMainCarraigeRoutings.GateOutPortID = 0;
                    objCVarMainCarraigeRoutings.GateInDate = DateTime.Parse("01/01/1900");// pGateInDate;

                    #region TransportOrder
                    objCVarMainCarraigeRoutings.CustomerID = 0;
                    objCVarMainCarraigeRoutings.SubContractedCustomerID = 0;
                    objCVarMainCarraigeRoutings.Cost = 0;
                    objCVarMainCarraigeRoutings.Sale = 0;
                    objCVarMainCarraigeRoutings.IsFleet = false;
                    objCVarMainCarraigeRoutings.CommodityID = 0;
                    objCVarMainCarraigeRoutings.LoadingDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.LoadingReference = "0";
                    objCVarMainCarraigeRoutings.UnloadingDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.UnloadingReference = "0";
                    objCVarMainCarraigeRoutings.UnloadingTime = "0";
                    #endregion TransportOrder

                    objCVarMainCarraigeRoutings.GateOutDate = DateTime.Parse("01/01/1900");//pGateOutDate;
                    objCVarMainCarraigeRoutings.StuffingDate = DateTime.Parse("01/01/1900");//pStuffingDate;
                    objCVarMainCarraigeRoutings.DeliveryDate = DateTime.Parse("01/01/1900");//pDeliveryDate;
                    objCVarMainCarraigeRoutings.BookingNumber = "0";
                    objCVarMainCarraigeRoutings.Delays = "0";
                    objCVarMainCarraigeRoutings.DriverName = "0";
                    objCVarMainCarraigeRoutings.DriverPhones = "0";
                    objCVarMainCarraigeRoutings.PowerFromGateInTillActualSailing = "0";
                    objCVarMainCarraigeRoutings.ContactPersonPhones = "0";
                    objCVarMainCarraigeRoutings.LoadingTime = "0";

                    #region CustomsClearance
                    objCVarMainCarraigeRoutings.CCAFreight = 0;
                    objCVarMainCarraigeRoutings.CCAFOB = 0;
                    objCVarMainCarraigeRoutings.CCACFValue = 0;
                    objCVarMainCarraigeRoutings.CCAInvoiceNumber = "0";

                    objCVarMainCarraigeRoutings.CCAInsurance = "0";
                    objCVarMainCarraigeRoutings.CCADischargeValue = "0";
                    objCVarMainCarraigeRoutings.CCAAcceptedValue = "0";
                    objCVarMainCarraigeRoutings.CCAImportValue = "0";
                    objCVarMainCarraigeRoutings.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.CCAExchangeRate = "0";
                    objCVarMainCarraigeRoutings.CCAVATCertificateNumber = "0";
                    objCVarMainCarraigeRoutings.CCAVATCertificateValue = "0";
                    objCVarMainCarraigeRoutings.CCACommercialProfitCertificateNumber = "0";
                    objCVarMainCarraigeRoutings.CCAWindowFees = "0";
                    objCVarMainCarraigeRoutings.CCAStorageFees = "0";
                    objCVarMainCarraigeRoutings.CCACommercialProfitTax = "0";
                    objCVarMainCarraigeRoutings.CCACustomsValue = "0";
                    objCVarMainCarraigeRoutings.CCAQuotedValue = "0";
                    objCVarMainCarraigeRoutings.CCAContractType = "0";
                    objCVarMainCarraigeRoutings.CCAOthers = "0";
                    objCVarMainCarraigeRoutings.CCASpendDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.OffloadingDate = DateTime.Parse("01/01/1900");

                    objCVarMainCarraigeRoutings.CertificateNumber = "0";
                    objCVarMainCarraigeRoutings.CertificateValue = "0";
                    objCVarMainCarraigeRoutings.CertificateDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.QasimaNumber = "0";
                    objCVarMainCarraigeRoutings.QasimaDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.Match = false;
                    objCVarMainCarraigeRoutings.SalesDateReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.CommerceDateReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.InspectionDateReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.FinishDateReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.SalesDateDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.FinishDateDelivered = DateTime.Parse("01/01/1900");

                    objCVarMainCarraigeRoutings.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.CCDropBackReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.CC_ClearanceTypeID = 0;
                    objCVarMainCarraigeRoutings.CC_CustomItemsID = 0;
                    objCVarMainCarraigeRoutings.CCReleaseNo = "0";

                    #endregion CustomsClearance

                    objCVarMainCarraigeRoutings.BillNumber = "0";
                    objCVarMainCarraigeRoutings.TruckingOrderCode = "0";

                    objCVarMainCarraigeRoutings.RoadNumber = "0";
                    objCVarMainCarraigeRoutings.DeliveryOrderNumber = "0";
                    objCVarMainCarraigeRoutings.WareHouse = "0";
                    objCVarMainCarraigeRoutings.WareHouseLocation = "0";

                    objCVarMainCarraigeRoutings.CreatorUserID = objCVarMainCarraigeRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarMainCarraigeRoutings.ModificationDate = objCVarMainCarraigeRoutings.CreationDate = DateTime.Now;
                    objCVarMainCarraigeRoutings.CCMainWarehouseID = 0;
                    objCVarMainCarraigeRoutings.CCWarehouseATD = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.CCWarehouseETA = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutings.CCIsDone = false;
                    objCVarMainCarraigeRoutings.CustomerWarehouseManagerName = "0";
                    objCVarMainCarraigeRoutings.CustomerWarehouseManagerPhone = "0";
                    objCVarMainCarraigeRoutings.TruckingEquipmentID = 0;
                    objCVarMainCarraigeRoutings.ConcedeCompanyName = "";
                    objCVarMainCarraigeRoutings.ConcedeNumber = "";
                    objCVarMainCarraigeRoutings.ConcedeQty = 0;
                    objCVarMainCarraigeRoutings.ConcedeTotalQty = 0;
                    objCVarMainCarraigeRoutings.WarehouseID = 0;
					Common.Common.ReplaceNull(objCVarMainCarraigeRoutings);
					objCRoutings.lstCVarRoutings.Add(objCVarMainCarraigeRoutings);
                    //objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);

                    #endregion Add MainCarraigeRoutingType

                    objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);
                    RoutingID = objCVarMainCarraigeRoutings.ID;

                    #endregion
                    if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "MAR" || objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL")
                        Forwarding.MvcApp.Controllers.MasterData.API_Locations.ChargeTypesController.ChargeTypes_SetDefaultReceivablesQuantity(objCOperations.lstCVarOperations[0].ID);
                    Forwarding.MvcApp.Controllers.Operations.API_Operations.OperationsController.Operations_EmailNotification(objCOperations.lstCVarOperations[0].ID);

                

                }
            }


            #region TaxLink
            if ((CompanyName == "CHM" || CompanyName == "OCE") && checkException == null)
            {
                Int32 ShipperID = 0;
                Int32 ConsigneeID = 0;
                Int32 CustomerID = 0;
                Int32 AgentID = 0;
                Int32 TruckerID = 0;

                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

                CCustomersTAX objCCustomersTax = new CCustomersTAX();
                COperationsTAX objCOperationsTax = new COperationsTAX();

                objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].ShipperID);
                if (objCCustomers.lstCVarCustomers.Count > 0)
                {
                    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                    {
                        ShipperID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                    }
                }
                objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].ConsigneeID);
                if (objCCustomers.lstCVarCustomers.Count > 0)
                {
                    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                    {
                        ConsigneeID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                    }
                }
                objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].CustomerID);
                if (objCCustomers.lstCVarCustomers.Count > 0)
                {
                    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                    {
                        CustomerID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                    }
                }
                objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].AgentID);
                if (objCCustomers.lstCVarCustomers.Count > 0)
                {
                    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                    {
                        AgentID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                    }
                }
                objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].TruckerID);
                if (objCCustomers.lstCVarCustomers.Count > 0)
                {
                    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                    {
                        TruckerID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                    }
                }

                CVarOperationsTAX objCVarOperationsTax = new CVarOperationsTAX();
                objCQuotationRoute.GetListPaging(999999, 1, "WHERE ID=" + createOperationFromQuotationData.pQuotationRouteID, "ID", out _RowCount);

                checkException = objCCustomers.GetListPaging(1, 1, "WHERE IsInactive=1 and ID IN (" + ShipperID + "," + ConsigneeID + "," + CustomerID + ")", "ID", out _RowCount);
                if (objCCustomers.lstCVarCustomers.Count > 0)
                {
                    _result = false;
                    //strMessageReturned = "This quotation has an inactive partner";
                }
                else
                {
                    objCVarOperationsTax.HouseNumber = "0";
                    objCVarOperationsTax.MasterBL = "0";
                    objCVarOperationsTax.MAWBSuffix = "0";
                    objCVarOperationsTax.BLDate = DateTime.Parse("01-01-1900");
                    objCVarOperationsTax.HBLDate = DateTime.Parse("01-01-1900");
                    objCVarOperationsTax.ReleaseDate = DateTime.Parse("01-01-1900");
                    objCVarOperationsTax.PODate = DateTime.Parse("01-01-1900");

                    objCVarOperationsTax.ClearanceApprovalDate = DateTime.Parse("01-01-1900");
                    objCVarOperationsTax.TruckingApprovalDate = DateTime.Parse("01-01-1900");
                    objCVarOperationsTax.FreightApprovalDate = DateTime.Parse("01-01-1900");

                    objCVarOperationsTax.ShippedOnBoardDate = DateTime.Parse("01-01-1900");
                    objCVarOperationsTax.FreightPayableAt = "0";
                    objCVarOperationsTax.CertificateNumber = "0";
                    objCVarOperationsTax.CountryOfOrigin = "0";
                    objCVarOperationsTax.InvoiceValue = "0";
                    objCVarOperationsTax.NumberOfOriginalBills = 3;

                    objCVarOperationsTax.QuotationRouteID = 0;// int.Parse(createOperationFromQuotationData.pQuotationRouteID);
                    objCVarOperationsTax.Code = createOperationFromQuotationData.pCode;
                    objCVarOperationsTax.BranchID = int.Parse(createOperationFromQuotationData.pBranchID);
                    objCVarOperationsTax.SalesmanID = int.Parse(createOperationFromQuotationData.pSalesmanID);
                    objCVarOperationsTax.BLType = int.Parse(createOperationFromQuotationData.pBLType);
                    objCVarOperationsTax.BLTypeIconName = createOperationFromQuotationData.pBLTypeIconName;
                    objCVarOperationsTax.BLTypeIconStyle = createOperationFromQuotationData.pBLTypeIconStyle;
                    objCVarOperationsTax.DirectionType = int.Parse(createOperationFromQuotationData.pDirectionType);
                    objCVarOperationsTax.DirectionIconName = createOperationFromQuotationData.pDirectionIconName;
                    objCVarOperationsTax.DirectionIconStyle = createOperationFromQuotationData.pDirectionIconStyle;
                    objCVarOperationsTax.TransportType = int.Parse(createOperationFromQuotationData.pTransportType);
                    objCVarOperationsTax.TransportIconName = createOperationFromQuotationData.pTransportIconName;
                    objCVarOperationsTax.TransportIconStyle = createOperationFromQuotationData.pTransportIconStyle;
                    objCVarOperationsTax.ShipmentType = int.Parse(createOperationFromQuotationData.pShipmentType);
                    objCVarOperationsTax.ShipperID = ShipperID;
                    objCVarOperationsTax.ShipperAddressID = int.Parse(createOperationFromQuotationData.pShipperAddressID);
                    objCVarOperationsTax.ShipperContactID = int.Parse(createOperationFromQuotationData.pShipperContactID);
                    objCVarOperationsTax.ConsigneeID = int.Parse(createOperationFromQuotationData.pConsigneeID);
                    objCVarOperationsTax.ConsigneeAddressID = int.Parse(createOperationFromQuotationData.pConsigneeAddressID);
                    objCVarOperationsTax.ConsigneeContactID = int.Parse(createOperationFromQuotationData.pConsigneeContactID);
                    objCVarOperationsTax.AgentID = int.Parse(createOperationFromQuotationData.pAgentID);
                    objCVarOperationsTax.AgentAddressID = int.Parse(createOperationFromQuotationData.pAgentAddressID);
                    objCVarOperationsTax.AgentContactID = int.Parse(createOperationFromQuotationData.pAgentContactID);
                    objCVarOperationsTax.IncotermID = objCQuotationRoute.lstCVarQuotationRoute[0].IncotermID;
                    objCVarOperationsTax.CommodityID = int.Parse(createOperationFromQuotationData.pCommodityID);
                    //objCVarOperations.TransientTime = int.Parse(createOperationFromQuotationData.pTransientTime); //Come From QuotationRoute(put in main route not here)
                    //objCVarOperations.OpenDate = DateTime.Parse(createOperationFromQuotationData.pOpenDate); //this format has problem when works on server
                    objCVarOperationsTax.OpenDate = DateTime.Now;//(createOperationFromQuotationData.pOpenDate == null ? DateTime.Parse("01-01-1900") : createOperationFromQuotationData.pOpenDate);
                    objCVarOperationsTax.CloseDate = createOperationFromQuotationData.pCloseDate;// DateTime.Parse(createOperationFromQuotationData.pCloseDate);
                    objCVarOperationsTax.CutOffDate = DateTime.Parse("01-01-1900"); //not used 
                    objCVarOperationsTax.IncludePickup = (createOperationFromQuotationData.pIncludePickup == "True" ? true : false);
                    objCVarOperationsTax.PickupCityID = int.Parse(createOperationFromQuotationData.pPickupCityID);
                    objCVarOperationsTax.PickupAddressID = int.Parse(createOperationFromQuotationData.pPickupAddressID);
                    objCVarOperationsTax.POLCountryID = int.Parse(createOperationFromQuotationData.pPOLCountryID); //Come From QuotationRoute
                    objCVarOperationsTax.POL = int.Parse(createOperationFromQuotationData.pPOL); //Come From QuotationRoute
                    objCVarOperationsTax.PODCountryID = int.Parse(createOperationFromQuotationData.pPODCountryID); //Come From QuotationRoute
                    objCVarOperationsTax.POD = int.Parse(createOperationFromQuotationData.pPOD); //Come From QuotationRoute
                    objCVarOperationsTax.PickupAddress = createOperationFromQuotationData.pPickupAddress; //Come From QuotationRoute
                    objCVarOperationsTax.DeliveryAddress = createOperationFromQuotationData.pDeliveryAddress; //Come From QuotationRoute
                    objCVarOperationsTax.MoveTypeID = objCQuotationRoute.lstCVarQuotationRoute[0].MoveTypeID; //Come From QuotationRoute
                    objCVarOperationsTax.ShippingLineID = int.Parse(createOperationFromQuotationData.pShippingLineID);//Come From QuotationRoute
                    objCVarOperationsTax.AirlineID = int.Parse(createOperationFromQuotationData.pAirlineID);//Come From QuotationRoute
                    objCVarOperationsTax.TruckerID = int.Parse(createOperationFromQuotationData.pTruckerID);//Come From QuotationRoute
                    objCVarOperationsTax.IncludeDelivery = (createOperationFromQuotationData.pIncludeDelivery == "True" ? true : false);
                    objCVarOperationsTax.DeliveryZipCode = createOperationFromQuotationData.pDeliveryZipCode;
                    objCVarOperationsTax.DeliveryCityID = int.Parse(createOperationFromQuotationData.pDeliveryCityID);
                    objCVarOperationsTax.DeliveryCountryID = int.Parse(createOperationFromQuotationData.pDeliveryCountryID);
                    objCVarOperationsTax.GrossWeight = decimal.Parse(createOperationFromQuotationData.pGrossWeight);
                    objCVarOperationsTax.Volume = decimal.Parse(createOperationFromQuotationData.pVolume);
                    objCVarOperationsTax.VolumetricWeight = objCQuotationRoute.lstCVarQuotationRoute[0].VolumetricWeight;
                    objCVarOperationsTax.ChargeableWeight = decimal.Parse(createOperationFromQuotationData.pChargeableWeight);
                    objCVarOperationsTax.NumberOfPackages = int.Parse(createOperationFromQuotationData.pNumberOfPackages);
                    objCVarOperationsTax.IsDangerousGoods = (createOperationFromQuotationData.pIsDangerousGoods == "True" ? true : false);
                    objCVarOperationsTax.CustomerReference = "0"; //createOperationFromQuotationData.pCustomerReference;
                    objCVarOperationsTax.SupplierReference = "0";
                    objCVarOperationsTax.PONumber = "0";
                    objCVarOperationsTax.POValue = "0";
                    objCVarOperationsTax.ReleaseNumber = "0";
                    objCVarOperationsTax.Notes = createOperationFromQuotationData.pNotes;
                    objCVarOperationsTax.AgreedRate = "0";
                    objCVarOperationsTax.OperationStageID = int.Parse(createOperationFromQuotationData.pOperationStageID);

                    objCVarOperationsTax.IsDelivered = false;
                    objCVarOperationsTax.IsTrucking = false;
                    objCVarOperationsTax.IsInsurance = false;
                    objCVarOperationsTax.IsClearance = false;
                    objCVarOperationsTax.IsGenset = false;
                    objCVarOperationsTax.IsCourrier = false;
                    objCVarOperationsTax.MarksAndNumbers = "0";
                    objCVarOperationsTax.IsTelexRelease = false;

                    objCVarOperationsTax.CreatorUserID = objCVarOperationsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationsTax.CreationDate = objCVarOperationsTax.ModificationDate = DateTime.Now;

                    #region AirAgents (Venus fields A.Medra)
                    objCVarOperationsTax.BLDate = DateTime.Parse("01/01/1900");
                    objCVarOperationsTax.MAWBStockID = 0;
                    objCVarOperationsTax.TypeOfStockID = 0;
                    objCVarOperationsTax.FlightNo = "0";
                    objCVarOperationsTax.POrC = _UnEditableCompanyName == "CQL" ? 3 : objCQuotationRoute.lstCVarQuotationRoute[0].POrC;
                    objCVarOperationsTax.IsAWB = false; //objCOperationToCopy.lstCVarOperations[0].IsAWB;
                                                        //Fields not in insert
                    objCVarOperationsTax.AirLineID1 = 0;
                    objCVarOperationsTax.FlightNo1 = "0";
                    objCVarOperationsTax.FlightDate1 = DateTime.Parse("01/01/1900");
                    objCVarOperationsTax.AirLineID2 = 0;
                    objCVarOperationsTax.FlightNo2 = "0";
                    objCVarOperationsTax.FlightDate2 = DateTime.Parse("01/01/1900");
                    objCVarOperationsTax.AirLineID3 = 0;
                    objCVarOperationsTax.FlightNo3 = "0";
                    objCVarOperationsTax.FlightDate3 = DateTime.Parse("01/01/1900");

                    objCVarOperationsTax.UNOrID = "0";
                    objCVarOperationsTax.ProperShippingName = "0";
                    objCVarOperationsTax.ClassOrDivision = "0";
                    objCVarOperationsTax.PackingGroup = "0";
                    objCVarOperationsTax.QuantityAndTypeOfPacking = "0";
                    objCVarOperationsTax.PackingInstruction = "0";
                    objCVarOperationsTax.ShippingDeclarationAuthorization = "0";
                    objCVarOperationsTax.Barcode = "0";

                    objCVarOperationsTax.GuaranteeLetterNumber = "0";
                    objCVarOperationsTax.GuaranteeLetterDate = DateTime.Parse("01/01/1900");
                    objCVarOperationsTax.GuaranteeLetterAmount = "0";
                    objCVarOperationsTax.GuaranteeLetterSupplierInvoiceNumber = "0";
                    objCVarOperationsTax.BankAccountID = 0;
                    objCVarOperationsTax.GuaranteeLetterNotes = "0";

                    objCVarOperationsTax.HandlingInformation = "0";
                    objCVarOperationsTax.AmountOfInsurance = "0";
                    objCVarOperationsTax.DeclaredValueForCarriage = "0";
                    objCVarOperationsTax.WeightCharge = 0;
                    objCVarOperationsTax.ValuationCharge = 0;
                    objCVarOperationsTax.OtherChargesDueAgent = 0;
                    objCVarOperationsTax.OtherCharges = "0";
                    objCVarOperationsTax.CurrencyID = objCvwDefaults.lstCVarvwDefaults[0].CurrencyID;
                    objCVarOperationsTax.AccountingInformation = "0";
                    objCVarOperationsTax.ReferenceNumber = "0";
                    objCVarOperationsTax.OptionalShippingInformation = "0";
                    objCVarOperationsTax.CHGSCode = "0";
                    objCVarOperationsTax.WT_VALL_Other = "0";
                    objCVarOperationsTax.DeclaredValueForCustoms = "0";
                    objCVarOperationsTax.Tax = 0;
                    objCVarOperationsTax.OtherChargesDueCarrier = 0;
                    objCVarOperationsTax.WT_VALL = "0";
                    objCVarOperationsTax.Description = "0";
                    #endregion Venus fields A.Medra

                    objCVarOperationsTax.DismissalPermissionSerial = "0";
                    objCVarOperationsTax.DeliveryOrderSerial = "0";

                    objCVarOperationsTax.eFBLID = "0";
                    objCVarOperationsTax.eFBLStatus = 0;

                    objCVarOperationsTax.DispatchNumber = "0";
                    objCVarOperationsTax.BusinessUnit = "0";
                    objCVarOperationsTax.Form13Number = "0";
                    objCVarOperationsTax.ACIDNumber = "0";
                    objCVarOperations.ACIDDetails = "0";

                    objCOperationsTax.lstCVarOperations.Add(objCVarOperationsTax);
                    checkException = objCOperationsTax.SaveMethod(objCOperationsTax.lstCVarOperations);


                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("UNIQUE"))
                            _result = false;
                    }
                    else //not unique
                    {
                        CSerials objCSerialsOrigin = new CSerials();
                        CSerialsTax objCSerialsTax = new CSerialsTax();

                        objCSerialsOrigin.GetList("WHERE Year=YEAR(GETDate())");
                        if (objCSerialsOrigin.lstCVarSerials.Count > 0)
                        {
                            objCSerialsTax.UpdateList("OperationSerial=" + objCSerialsOrigin.lstCVarSerials[0].OperationSerial + " WHERE Year=YEAR(GETDate())");
                        }
                        //link
                        objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCVarOperations.ID + "," + objCVarOperationsTax.ID + "," + "Operations");
                        //link
                        _result = true;

                        //COPY Partners To OperationPartners
                        #region Copy Operation Partners (at this point its just either a shipper or a consignee and maybe agent and empty notify)
                        COperationPartnersTAX objCOperationPartnersTax = new COperationPartnersTAX();
                        CContacts objCContacts = new CContacts(); //to get default contact

                        //if (createOperationFromQuotationData.pDirectionType == "1") //import (consignee)
                        //{
                        CVarOperationPartnersTAX objCVarOperationConsigneePartnerTax = new CVarOperationPartnersTAX();
                        objCVarOperationConsigneePartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                        objCVarOperationConsigneePartnerTax.OperationPartnerTypeID = 2;//consignee
                        objCVarOperationConsigneePartnerTax.CustomerID = ConsigneeID;
                        objCVarOperationConsigneePartnerTax.ContactID = Int64.Parse(createOperationFromQuotationData.pConsigneeContactID);
                        objCVarOperationConsigneePartnerTax.IsOperationClient = false;
                        objCVarOperationConsigneePartnerTax.CreatorUserID = objCVarOperationConsigneePartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationConsigneePartnerTax.CreationDate = objCVarOperationConsigneePartnerTax.ModificationDate = DateTime.Now;
                        objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationConsigneePartnerTax);

                        //CVarOperationPartners objCVarOperationShipperPartner = new CVarOperationPartners();
                        //objCVarOperationShipperPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        //objCVarOperationShipperPartner.OperationPartnerTypeID = 1;//Shipper
                        //objCVarOperationShipperPartner.CustomerID = 0; // it will be set as null in DB
                        //objCVarOperationShipperPartner.ContactID = 0;
                        //objCVarOperationShipperPartner.CreatorUserID = objCVarOperationShipperPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        //objCVarOperationShipperPartner.CreationDate = objCVarOperationShipperPartner.ModificationDate = DateTime.Now;
                        //objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationShipperPartner);

                        //}
                        //else //export or domestic (shipper)
                        //{
                        CVarOperationPartnersTAX objCVarOperationShipperPartnerTax = new CVarOperationPartnersTAX();

                        objCVarOperationShipperPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                        objCVarOperationShipperPartnerTax.OperationPartnerTypeID = 1; // export or domestic (shipper)
                        objCVarOperationShipperPartnerTax.CustomerID = ShipperID;
                        objCVarOperationShipperPartnerTax.ContactID = Int64.Parse(createOperationFromQuotationData.pShipperContactID);
                        objCVarOperationShipperPartnerTax.IsOperationClient = objCQuotations.lstCVarQuotations[0].IsWarehousing ? true : false;
                        objCVarOperationShipperPartnerTax.CreatorUserID = objCVarOperationShipperPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationShipperPartnerTax.CreationDate = objCVarOperationShipperPartnerTax.ModificationDate = DateTime.Now;
                        objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationShipperPartnerTax);

                        //CVarOperationPartners objCVarOperationConsigneePartner = new CVarOperationPartners();
                        //objCVarOperationConsigneePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        //objCVarOperationConsigneePartner.OperationPartnerTypeID = 2;//consignee
                        //objCVarOperationConsigneePartner.CustomerID = 0; // it will be set as null in DB
                        //objCVarOperationConsigneePartner.ContactID = 0;
                        //objCVarOperationConsigneePartner.CreatorUserID = objCVarOperationConsigneePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        //objCVarOperationConsigneePartner.CreationDate = objCVarOperationConsigneePartner.ModificationDate = DateTime.Now;
                        //objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationConsigneePartner);
                        //}
                        CVarOperationPartnersTAX objCVarOperationNotifyPartnerTax = new CVarOperationPartnersTAX();
                        objCVarOperationNotifyPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                        objCVarOperationNotifyPartnerTax.OperationPartnerTypeID = 4;//Notify1
                        objCVarOperationNotifyPartnerTax.CustomerID = 0; // it will bw set as null in DB
                        objCVarOperationNotifyPartnerTax.ContactID = 0;
                        objCVarOperationNotifyPartnerTax.IsOperationClient = false;
                        objCVarOperationNotifyPartnerTax.CreatorUserID = objCVarOperationNotifyPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationNotifyPartnerTax.CreationDate = objCVarOperationNotifyPartnerTax.ModificationDate = DateTime.Now;
                        objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationNotifyPartnerTax);

                        CVarOperationPartnersTAX objCVarOperationAgentPartnerTax = new CVarOperationPartnersTAX();
                        objCVarOperationAgentPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                        objCVarOperationAgentPartnerTax.OperationPartnerTypeID = 6; //constAgentOperationPartnerTypeID
                        objCVarOperationAgentPartnerTax.AgentID = AgentID;
                        objCVarOperationAgentPartnerTax.ContactID = int.Parse(createOperationFromQuotationData.pAgentContactID);
                        objCVarOperationAgentPartnerTax.IsOperationClient = false;
                        objCVarOperationAgentPartnerTax.CreatorUserID = objCVarOperationAgentPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationAgentPartnerTax.CreationDate = objCVarOperationAgentPartnerTax.ModificationDate = DateTime.Now;
                        objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationAgentPartnerTax);

                        //Adding the line enetered in the Routings & Charges tab
                        if (createOperationFromQuotationData.pShippingLineID != "0")
                        {
                            CVarOperationPartnersTAX objCVarOperationShippingLinePartnerTax = new CVarOperationPartnersTAX();
                            objCVarOperationShippingLinePartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                            objCVarOperationShippingLinePartnerTax.OperationPartnerTypeID = 9; //constShippingLineOperationPartnerTypeID
                            objCVarOperationShippingLinePartnerTax.ShippingLineID = int.Parse(createOperationFromQuotationData.pShippingLineID);
                            objCContacts.GetList("WHERE PartnerTypeID=5 AND PartnerID=" + createOperationFromQuotationData.pShippingLineID.ToString());
                            objCVarOperationShippingLinePartnerTax.IsOperationClient = false;
                            objCVarOperationShippingLinePartnerTax.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                            objCVarOperationShippingLinePartnerTax.CreatorUserID = objCVarOperationShippingLinePartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationShippingLinePartnerTax.CreationDate = objCVarOperationShippingLinePartnerTax.ModificationDate = DateTime.Now;
                            objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationShippingLinePartnerTax);
                        }
                        else if (createOperationFromQuotationData.pAirlineID != "0")
                        {
                            CVarOperationPartnersTAX objCVarOperationAirlinePartnerTax = new CVarOperationPartnersTAX();
                            objCVarOperationAirlinePartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                            objCVarOperationAirlinePartnerTax.OperationPartnerTypeID = 10; //constAirlineOperationPartnerTypeID
                            objCVarOperationAirlinePartnerTax.AirlineID = int.Parse(createOperationFromQuotationData.pAirlineID);
                            objCContacts.GetList("WHERE PartnerTypeID=6 AND PartnerID=" + createOperationFromQuotationData.pAirlineID.ToString());
                            objCVarOperationAirlinePartnerTax.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                            objCVarOperationAirlinePartnerTax.IsOperationClient = false;
                            objCVarOperationAirlinePartnerTax.CreatorUserID = objCVarOperationAirlinePartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationAirlinePartnerTax.CreationDate = objCVarOperationAirlinePartnerTax.ModificationDate = DateTime.Now;
                            objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationAirlinePartnerTax);
                        }
                        else if (createOperationFromQuotationData.pTruckerID != "0")
                        {
                            CVarOperationPartnersTAX objCVarOperationTruckerPartnerTax = new CVarOperationPartnersTAX();
                            objCVarOperationTruckerPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                            objCVarOperationTruckerPartnerTax.OperationPartnerTypeID = 11; //constTruckerOperationPartnerTypeID
                            objCVarOperationTruckerPartnerTax.TruckerID = TruckerID;
                            objCContacts.GetList("WHERE PartnerTypeID=7 AND PartnerID=" + createOperationFromQuotationData.pTruckerID.ToString());
                            objCVarOperationTruckerPartnerTax.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                            objCVarOperationTruckerPartnerTax.IsOperationClient = false;
                            objCVarOperationTruckerPartnerTax.CreatorUserID = objCVarOperationTruckerPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationTruckerPartnerTax.CreationDate = objCVarOperationTruckerPartnerTax.ModificationDate = DateTime.Now;
                            objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationTruckerPartnerTax);
                        }

                        objCOperationPartnersTax.SaveMethod(objCOperationPartnersTax.lstCVarOperationPartnersTAX);


                        #endregion

                        //COPY Receivables AND Payables
                        #region Copy Receivables AND Payables
                        CReceivablesTax objCReceivablesTax = new CReceivablesTax(); //to copy in it the records to be inserted
                        CPayablesTAX objCPayablesTax = new CPayablesTAX(); //to copy in it the records to be inserted
                        CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
                        //those 2 lines are to get the charge types from QuotationCharges table from DB
                        CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
                        //objCvwQuotationCharges.GetList(" WHERE QuotationRouteID = " + createOperationFromQuotationData.pQuotationRouteID);
                        int _tempRowCount = 0;
                        checkException = objCvwQuotationCharges.GetListPaging(5000, 1, " WHERE QuotationRouteID = " + createOperationFromQuotationData.pQuotationRouteID, " ID ", out _tempRowCount);

                        string pWhereClauseCurrencyDetails = "";
                        CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                        CVarPayablesTAX objCVarPayablesTax = new CVarPayablesTAX();
                        foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                        {
                            checkException = objCvwChargeTypes.GetListPaging(1, 1, "WHERE ID=" + rowQuotationCharge.ChargeTypeID, "ID", out _RowCount);
                            #region Copy Receivables
                            pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.SaleCurrencyID
                                + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                                + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                                + " ORDER BY CODE";
                            objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);

                            CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();
                            Int32 ChargeTypeID = 0;

                            objCChargeTypesTAX.GetList("WHERE Name=N'" + (objCvwChargeTypes.lstCVarvwChargeTypes.Count > 0 ? objCvwChargeTypes.lstCVarvwChargeTypes[0].Name : "") + "'");
                            ChargeTypeID = objCChargeTypesTAX.lstCVarChargeTypes.Count > 0 ? objCChargeTypesTAX.lstCVarChargeTypes[0].ID : 0;

                            Int64 pReceivableID = 0;
                            if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                            {
                                CVarReceivablesTAX objCVarReceivablesTax = new CVarReceivablesTAX();
                                objCVarReceivablesTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                                objCVarReceivablesTax.ChargeTypeID = ChargeTypeID;
                                objCVarReceivablesTax.POrC = 0;
                                objCVarReceivablesTax.SupplierID = 0;
                                objCVarReceivablesTax.MeasurementID = rowQuotationCharge.MeasurementID;
                                objCVarReceivablesTax.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                                objCVarReceivablesTax.PackageTypeID = rowQuotationCharge.PackageTypeID;
                                objCVarReceivablesTax.Quantity = rowQuotationCharge.CostQuantity == 0 ? 1 : rowQuotationCharge.CostQuantity; //if SaleQuantity is activated then change to it
                                                                                                                                             //objCVarReceivables.CostPrice = rowQuotationCharge.CostPrice;
                                                                                                                                             //objCVarReceivables.CostAmount = rowQuotationCharge.CostAmount;
                                objCVarReceivablesTax.SalePrice = rowQuotationCharge.SalePrice;
                                objCVarReceivablesTax.AmountWithoutVAT = Math.Round((objCVarReceivablesTax.Quantity * objCVarReceivablesTax.SalePrice), 2);
                                #region Set Tax if set in ChargeTypes
                                if (objCvwDefaults.lstCVarvwDefaults[0].IsTaxOnItems && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "GBL")
                                {
                                    objCVarReceivablesTax.TaxeTypeID = objCvwChargeTypes.lstCVarvwChargeTypes[0].TaxeTypeID;
                                    objCVarReceivablesTax.TaxPercentage = objCvwChargeTypes.lstCVarvwChargeTypes[0].TaxPercentage;
                                    objCVarReceivablesTax.TaxAmount = Math.Round((objCVarReceivablesTax.AmountWithoutVAT * objCVarReceivablesTax.TaxPercentage / 100), 2);
                                }
                                else
                                {
                                    objCVarReceivablesTax.TaxeTypeID = 0;
                                    objCVarReceivablesTax.TaxPercentage = 0;
                                    objCVarReceivablesTax.TaxAmount = 0;
                                }
                                #endregion Set Tax if set in ChargeTypes
                                objCVarReceivablesTax.SaleAmount = objCVarReceivablesTax.AmountWithoutVAT + objCVarReceivablesTax.TaxAmount;
                                objCVarReceivablesTax.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.SaleExchangeRate;
                                objCVarReceivablesTax.CurrencyID = rowQuotationCharge.SaleCurrencyID;
                                objCVarReceivablesTax.GeneratingQRID = 0;// Int64.Parse(createOperationFromQuotationData.pQuotationRouteID);
                                objCVarReceivablesTax.Notes = rowQuotationCharge.Notes;

                                objCVarReceivablesTax.IssueDate = DateTime.Now;
                                objCVarReceivablesTax.OperationContainersAndPackagesID = 0;

                                objCVarReceivablesTax.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                                objCVarReceivablesTax.CutOffDate = DateTime.Parse("01/01/1900");

                                objCVarReceivablesTax.CreatorUserID = objCVarReceivablesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarReceivablesTax.CreationDate = objCVarReceivablesTax.ModificationDate = DateTime.Now;

                                objCReceivablesTax.lstCVarReceivables.Add(objCVarReceivablesTax);
                                objCReceivablesTax.SaveMethod(objCReceivablesTax.lstCVarReceivables);
                                pReceivableID = objCVarReceivablesTax.ID;
                                //  objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + RecivableID + "," + objCVarReceivablesTax.ID + "," + "Receivables");

                            }
                            #endregion Copy Receivables

                            #region Copy Payables
                            pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.CostCurrencyID
                                + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                                + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                                + " ORDER BY CODE";
                            objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                            if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                            {
                                objCVarPayablesTax.ID = 0;

                                objCVarPayablesTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                                objCVarPayablesTax.ChargeTypeID = ChargeTypeID;
                                objCVarPayablesTax.POrC = 0;
                                objCVarPayablesTax.SupplierOperationPartnerID = 0;

                                objCVarPayablesTax.SupplierSiteID = rowQuotationCharge.SupplierSiteID;
                                objCVarPayablesTax.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                                objCVarPayablesTax.MeasurementID = rowQuotationCharge.MeasurementID;
                                objCVarPayablesTax.Quantity = rowQuotationCharge.CostQuantity;
                                objCVarPayablesTax.CostPrice = rowQuotationCharge.CostPrice;
                                objCVarPayablesTax.CostAmount = rowQuotationCharge.CostAmount;
                                objCVarPayablesTax.QuotationCost = rowQuotationCharge.CostAmount;
                                objCVarPayablesTax.AmountWithoutVAT = rowQuotationCharge.CostAmount; //still no VAT entered so they are the same
                                if (objCvwDefaults.lstCVarvwDefaults.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName.Equals("BED"))
                                {
                                    objCVarPayablesTax.CostAmount = 0;
                                    objCVarPayablesTax.AmountWithoutVAT = 0;
                                }
                                objCVarPayablesTax.SupplierInvoiceNo = "0";
                                objCVarPayablesTax.SupplierReceiptNo = "0";
                                objCVarPayablesTax.EntryDate = DateTime.Now;
                                objCVarPayablesTax.BillID = 0;

                                objCVarPayablesTax.IssueDate = DateTime.Now;
                                objCVarPayablesTax.OperationContainersAndPackagesID = 0;

                                objCVarPayablesTax.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.CostExchangeRate;
                                objCVarPayablesTax.CurrencyID = rowQuotationCharge.CostCurrencyID;
                                objCVarPayablesTax.GeneratingQRID = 0;// Int64.Parse(createOperationFromQuotationData.pQuotationRouteID);
                                objCVarPayablesTax.Notes = rowQuotationCharge.Notes;
                                objCVarPayablesTax.ReceivableID = pReceivableID; //objCVarReceivables.ID;
                                objCVarPayablesTax.IssueDate = DateTime.Now;

                                objCVarPayablesTax.CreatorUserID = objCVarPayablesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarPayablesTax.CreationDate = objCVarPayablesTax.ModificationDate = DateTime.Now;
                                objCPayablesTax.lstCVarPayables.Add(objCVarPayablesTax);
                                checkException = objCPayablesTax.SaveMethod(objCPayablesTax.lstCVarPayables);
                                //link
                                // objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + PayablesID + "," + objCVarPayablesTax.ID + "," + "Payables");
                            }
                            #endregion Copy Payables

                            #region Add Operation Partner if its not added yet and update the SupplierOperationPartnerID to the corresponding one
                            COperationPartnersTAX objCSupplierOperationPartnerTax = new COperationPartnersTAX();
                            if (rowQuotationCharge.OperationPartnerTypeID != 0) //then check if partner is already entered then set the SupplierOperationPartnerID else add the OperationPartner then set the SupplierOperationPartnerID in Payables
                            {
                                Int64 pSupplierOperationPartnerID = 0;
                                CvwOperationPartners objCvwOperationPartnersCheckExistence = new CvwOperationPartners();
                                objCvwOperationPartnersCheckExistence.GetList("WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID + " AND OperationPartnerTypeID=" + rowQuotationCharge.OperationPartnerTypeID + " AND PartnerTypeID=" + rowQuotationCharge.PartnerTypeID + " AND PartnerID=" + rowQuotationCharge.PartnerSupplierID);
                                if (objCvwOperationPartnersCheckExistence.lstCVarvwOperationPartners.Count > 0) //OperationPartner is already entered
                                {
                                    pSupplierOperationPartnerID = objCvwOperationPartnersCheckExistence.lstCVarvwOperationPartners[0].ID;
                                }
                                else //operation Partner is not added yet, so add it the take its ID to set the SupplierOperationPartnerID
                                {
                                    objCContacts.GetList("WHERE PartnerTypeID=" + rowQuotationCharge.PartnerTypeID.ToString() + " AND PartnerID=" + rowQuotationCharge.PartnerSupplierID.ToString());
                                    CVarOperationPartnersTAX objCVarSupplierOperationPartnerTax = new CVarOperationPartnersTAX();
                                    objCVarSupplierOperationPartnerTax.ID = 0;
                                    objCVarSupplierOperationPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                                    objCVarSupplierOperationPartnerTax.OperationPartnerTypeID = rowQuotationCharge.OperationPartnerTypeID;
                                    objCVarSupplierOperationPartnerTax.CustomerID = rowQuotationCharge.CustomerID;
                                    objCVarSupplierOperationPartnerTax.AgentID = rowQuotationCharge.AgentID;
                                    objCVarSupplierOperationPartnerTax.ShippingAgentID = rowQuotationCharge.ShippingAgentID;
                                    objCVarSupplierOperationPartnerTax.CustomsClearanceAgentID = rowQuotationCharge.CustomsClearanceAgentID;
                                    objCVarSupplierOperationPartnerTax.ShippingLineID = rowQuotationCharge.ShippingLineID;
                                    objCVarSupplierOperationPartnerTax.AirlineID = rowQuotationCharge.AirlineID;
                                    objCVarSupplierOperationPartnerTax.TruckerID = rowQuotationCharge.TruckerID;
                                    objCVarSupplierOperationPartnerTax.SupplierID = rowQuotationCharge.SupplierID;
                                    objCVarSupplierOperationPartnerTax.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                                    objCVarSupplierOperationPartnerTax.IsOperationClient = false;
                                    objCVarSupplierOperationPartnerTax.CreatorUserID = objCVarSupplierOperationPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                    objCVarSupplierOperationPartnerTax.CreationDate = objCVarSupplierOperationPartnerTax.ModificationDate = DateTime.Now;
                                    objCSupplierOperationPartnerTax.lstCVarOperationPartnersTAX.Add(objCVarSupplierOperationPartnerTax);
                                    checkException = objCSupplierOperationPartnerTax.SaveMethod(objCSupplierOperationPartnerTax.lstCVarOperationPartnersTAX);
                                    pSupplierOperationPartnerID = objCVarSupplierOperationPartnerTax.ID;
                                }
                                checkException = objCPayablesTax.UpdateList("SupplierOperationPartnerID=" + pSupplierOperationPartnerID.ToString() + " WHERE ID=" + objCVarPayablesTax.ID.ToString());
                            }


                            #endregion Add Operation Partner if its not added yet and update the SupplierOperationPartnerID to the corresponding one

                            //#region Add Containers/Packages if not added yet
                            //if (!(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL" && int.Parse(createOperationFromQuotationData.pTransportType) == InlandTransportType)
                            //    && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI"
                            //    && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "SUN"
                            //    && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "BED")
                            //{
                            //    COperationContainersAndPackages objCOperationContainersAndPackages_QuotCharge = new COperationContainersAndPackages(); //to copy in it the records to be inserted

                            //    if (rowQuotationCharge.ContainerTypeID != 0 || rowQuotationCharge.PackageTypeID != 0) //then check if there Exists a container/Package
                            //    {
                            //        CvwOperationContainersAndPackages objCvwOperationContainersAndPackagesCheckExistence = new CvwOperationContainersAndPackages();
                            //        objCvwOperationContainersAndPackagesCheckExistence.GetList("WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID
                            //            + (rowQuotationCharge.ContainerTypeID != 0
                            //                ? (" AND ContainerTypeID=" + rowQuotationCharge.ContainerTypeID)
                            //                : (" AND PackageTypeID=" + rowQuotationCharge.PackageTypeID)
                            //              )
                            //            );
                            //        //if (objCvwOperationContainersAndPackagesCheckExistence.lstCVarvwOperationContainersAndPackages.Count == 0) // Container or Package is not added so add it
                            //        {
                            //            ////the next condition is add containers in operations a number of times equal to the quantity, // to change that just delete the if condition and keep only whats written in the else clause
                            //            //if (int.Parse(createOperationFromQuotationData.pShipmentType) == 1 || int.Parse(createOperationFromQuotationData.pShipmentType) == 3) //FCL or FTL

                            //            CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();
                            //            objCVarOperationContainersAndPackages.OperationID = objCOperations.lstCVarOperations[0].ID;
                            //            objCVarOperationContainersAndPackages.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                            //            objCVarOperationContainersAndPackages.PackageTypeID = rowQuotationCharge.PackageTypeID;
                            //            //the numbers of containers is always 1 because it holds packages
                            //            objCVarOperationContainersAndPackages.Quantity = 0; //rowQuotationCharge.CostQuantity == 0 ? 1 : decimal.ToInt32(rowQuotationCharge.CostQuantity);
                            //                                                                //objCVarOperationContainersAndPackages.Length = rowQuotationCharge.Length;
                            //                                                                //objCVarOperationContainersAndPackages.Width = rowQuotationCharge.Width;
                            //                                                                //objCVarOperationContainersAndPackages.Height = rowQuotationCharge.Height;
                            //                                                                //objCVarOperationContainersAndPackages.Volume = rowQuotationCharge.Volume;
                            //                                                                //objCVarOperationContainersAndPackages.VolumetricWeight = rowQuotationCharge.VolumetricWeight;
                            //                                                                //objCVarOperationContainersAndPackages.NetWeight = rowQuotationCharge.NetWeight;
                            //                                                                //objCVarOperationContainersAndPackages.GrossWeight = rowQuotationCharge.GrossWeight;
                            //                                                                //objCVarOperationContainersAndPackages.ChargeableWeight = rowQuotationCharge.ChargeableWeight;
                            //            objCVarOperationContainersAndPackages.ContainerNumber = "0";
                            //            objCVarOperationContainersAndPackages.CarrierSeal = "0";
                            //            objCVarOperationContainersAndPackages.ShipperSeal = "0";
                            //            objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                            //            objCVarOperationContainersAndPackages.DescriptionOfGoods = "0";

                            //            objCVarOperationContainersAndPackages.LotNumber = "0";
                            //            objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                            //            objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                            //            objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                            //            objCVarOperationContainersAndPackages.Factory = "0";
                            //            objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                            //            objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                            //            objCVarOperationContainersAndPackages.IsAsAgreed = false;
                            //            objCVarOperationContainersAndPackages.IsMinimum = false;
                            //            objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                            //            objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                            //            objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                            //            objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                            //            objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                            //            objCVarOperationContainersAndPackages.WeightUnit = "0";
                            //            objCVarOperationContainersAndPackages.RateClass = "0";
                            //            objCVarOperationContainersAndPackages.IsFull = false;
                            //            objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                            //            objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                            //            objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                            //            objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");

                            //            objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                            //            objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

                            //            objCOperationContainersAndPackages_QuotCharge.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);

                            //            checkException = objCOperationContainersAndPackages_QuotCharge.SaveMethod(objCOperationContainersAndPackages_QuotCharge.lstCVarOperationContainersAndPackages);
                            //        }
                            //    }
                            //} //EOF if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                            //#endregion Add Operation Containers/Packages if not added yet
                        }

                        #endregion

                        ////COPY CONTAINERS AND PACKAGES
                        #region Copy Containers And Packages
                        //those 2 lines are to get the ContainersAndPackages Data from QuotationContainersAndPAckages table from DB
                        CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
                        if (!(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL" && int.Parse(createOperationFromQuotationData.pTransportType) == InlandTransportType))
                            objCQuotationContainersAndPackages.GetList(" WHERE QuotationRouteID = " + createOperationFromQuotationData.pQuotationRouteID); ;

                        foreach (var rowQuotationContainersAndPackages in objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages)
                        {
                            for (int z = 0; z < rowQuotationContainersAndPackages.Quantity; z++)
                            {
                                COperationContainersAndPackagesTAX objCOperationContainersAndPackagesTax = new COperationContainersAndPackagesTAX(); //to copy in it the records to be inserted

                                CVarOperationContainersAndPackagesTAX objCVarOperationContainersAndPackagesTax = new CVarOperationContainersAndPackagesTAX();

                                objCVarOperationContainersAndPackagesTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                                objCVarOperationContainersAndPackagesTax.ContainerTypeID = rowQuotationContainersAndPackages.ContainerTypeID;
                                objCVarOperationContainersAndPackagesTax.PackageTypeID = rowQuotationContainersAndPackages.PackageTypeID;
                                //the numbers of containers is always 1 because it holds packages
                                objCVarOperationContainersAndPackagesTax.Quantity = 1;
                                objCVarOperationContainersAndPackagesTax.Length = rowQuotationContainersAndPackages.Length;
                                objCVarOperationContainersAndPackagesTax.Width = rowQuotationContainersAndPackages.Width;
                                objCVarOperationContainersAndPackagesTax.Height = rowQuotationContainersAndPackages.Height;
                                objCVarOperationContainersAndPackagesTax.Volume = rowQuotationContainersAndPackages.Volume;
                                objCVarOperationContainersAndPackagesTax.VolumetricWeight = rowQuotationContainersAndPackages.VolumetricWeight;
                                objCVarOperationContainersAndPackagesTax.NetWeight = rowQuotationContainersAndPackages.NetWeight;
                                objCVarOperationContainersAndPackagesTax.GrossWeight = rowQuotationContainersAndPackages.GrossWeight;
                                objCVarOperationContainersAndPackagesTax.ChargeableWeight = rowQuotationContainersAndPackages.ChargeableWeight;
                                objCVarOperationContainersAndPackagesTax.ContainerNumber = "0";
                                objCVarOperationContainersAndPackagesTax.CarrierSeal = "0";
                                objCVarOperationContainersAndPackagesTax.ShipperSeal = "0";
                                objCVarOperationContainersAndPackagesTax.MarksAndNumbers = "0";
                                objCVarOperationContainersAndPackagesTax.DescriptionOfGoods = "0";

                                objCVarOperationContainersAndPackagesTax.LotNumber = "0";
                                objCVarOperationContainersAndPackagesTax.GateOutDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackagesTax.StuffingDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackagesTax.LoadingDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackagesTax.Factory = "0";
                                objCVarOperationContainersAndPackagesTax.ExportBLNumber = "0";
                                objCVarOperationContainersAndPackagesTax.ImportBLNumber = "0";
                                objCVarOperationContainersAndPackagesTax.IsAsAgreed = false;
                                objCVarOperationContainersAndPackagesTax.IsMinimum = false;
                                objCVarOperationContainersAndPackagesTax.IsOwnedByCompany = false;
                                objCVarOperationContainersAndPackagesTax.SupplierDriverName = "0";
                                objCVarOperationContainersAndPackagesTax.SupplierDriverAssistantName = "0";
                                objCVarOperationContainersAndPackagesTax.SupplierTrailerName = "0";
                                objCVarOperationContainersAndPackagesTax.TankOrFlexiNumber = "0";
                                objCVarOperationContainersAndPackagesTax.WeightUnit = "0";
                                objCVarOperationContainersAndPackagesTax.RateClass = "0";
                                objCVarOperationContainersAndPackagesTax.IsFull = false;
                                objCVarOperationContainersAndPackagesTax.ExitDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackagesTax.ReturnDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackagesTax.YardInDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackagesTax.YardOutDate = DateTime.Parse("01/01/1900");

                                objCVarOperationContainersAndPackagesTax.CreatorUserID = objCVarOperationContainersAndPackagesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarOperationContainersAndPackagesTax.CreationDate = objCVarOperationContainersAndPackagesTax.ModificationDate = DateTime.Now;

                                objCOperationContainersAndPackagesTax.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackagesTax);
                                objCOperationContainersAndPackagesTax.SaveMethod(objCOperationContainersAndPackagesTax.lstCVarOperationContainersAndPackages);
                                //link
                                objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + OperationContainersAndPackagesID + "," + objCOperationContainersAndPackagesTax.lstCVarOperationContainersAndPackages[0].ID + "," + "OperationContainersAndPackages");

                            } //for (int z = 0; z < rowQuotationContainersAndPackages.Quantity; z++)
                        } //foreach (var rowQuotationContainersAndPackages in objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages)

                        #endregion
                        COperationPartners objCOperationPartnersOrigin = new COperationPartners();
                        objCOperationPartnersOrigin.GetList(" WHERE OperationID = " + objCVarOperations.ID + "order by id");
                        COperationPartnersTAX objCOperationPartnersForTax = new COperationPartnersTAX();
                        objCOperationPartnersForTax.GetList(" WHERE OperationID = " + objCVarOperationsTax.ID + "order by id");


                        for (int i = 0; i < objCOperationPartnersOrigin.lstCVarOperationPartners.Count; i++)
                        {
                            for (int j = 0; j < objCOperationPartnersForTax.lstCVarOperationPartnersTAX.Count; j++)
                            {
                                if (i == j)
                                {
                                    objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCOperationPartnersOrigin.lstCVarOperationPartners[j].ID + "," + (objCOperationPartnersForTax.lstCVarOperationPartnersTAX[i].ID) + "," + "OperationPartners");

                                }
                                //link

                            }
                        }
                        CReceivables objCReceivables2 = new CReceivables();
                        objCReceivables2.GetList(" WHERE OperationID = " + objCVarOperations.ID + " order by id");
                        CReceivablesTax objCReceivablesTax2 = new CReceivablesTax();
                        objCReceivablesTax2.GetList(" WHERE OperationID = " + objCVarOperationsTax.ID + " order by id");


                        for (int i = 0; i < objCReceivables2.lstCVarReceivables.Count; i++)
                        {
                            for (int j = 0; j < objCReceivablesTax2.lstCVarReceivables.Count; j++)
                            {
                                if (i == j)
                                {
                                    objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCReceivables2.lstCVarReceivables[j].ID + "," + (objCReceivablesTax2.lstCVarReceivables[i].ID) + "," + "Receivables");

                                }
                                //link

                            }
                        }

                        CPayables objCPayables2 = new CPayables();
                        objCPayables2.GetList(" WHERE OperationID = " + objCVarOperations.ID + " order by id");
                        CPayablesTAX objCPayablesTAX2 = new CPayablesTAX();
                        objCPayablesTAX2.GetList(" WHERE OperationID = " + objCVarOperationsTax.ID + " order by id");


                        for (int i = 0; i < objCPayables2.lstCVarPayables.Count; i++)
                        {
                            for (int j = 0; j < objCPayablesTAX2.lstCVarPayables.Count; j++)
                            {
                                if (i == j)
                                {
                                    objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCPayables2.lstCVarPayables[j].ID + "," + (objCPayablesTAX2.lstCVarPayables[i].ID) + "," + "Payables");

                                }
                                //link

                            }
                        }
                        //COPY Routings To Routings
                        //MainCarraige has ID = 30
                        #region Copy Operation Routings (Main Carraige)
                        CRoutingsTAX objCRoutingsTax = new CRoutingsTAX();
                        #region Add MainCarraigeRoutingType

                        CVarRoutingsTAX objCVarMainCarraigeRoutingsTax = new CVarRoutingsTAX();

                        objCVarMainCarraigeRoutingsTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                        objCVarMainCarraigeRoutingsTax.TransportType = objCOperationsTax.lstCVarOperations[0].TransportType;
                        objCVarMainCarraigeRoutingsTax.TransportIconName = objCOperationsTax.lstCVarOperations[0].TransportIconName;
                        objCVarMainCarraigeRoutingsTax.TransportIconStyle = objCOperationsTax.lstCVarOperations[0].TransportIconStyle;
                        objCVarMainCarraigeRoutingsTax.RoutingTypeID = MainCarraigeRoutingTypeID; //Main Carraige
                        objCVarMainCarraigeRoutingsTax.POLCountryID = objCOperationsTax.lstCVarOperations[0].POLCountryID;
                        objCVarMainCarraigeRoutingsTax.POL = objCOperationsTax.lstCVarOperations[0].POL;
                        objCVarMainCarraigeRoutingsTax.PODCountryID = objCOperationsTax.lstCVarOperations[0].PODCountryID;
                        objCVarMainCarraigeRoutingsTax.POD = objCOperationsTax.lstCVarOperations[0].POD;
                        objCVarMainCarraigeRoutingsTax.ETAPOLDate = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutingsTax.ATAPOLDate = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutingsTax.ExpectedDeparture = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutingsTax.ActualDeparture = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutingsTax.ExpectedArrival = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutingsTax.ActualArrival = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutingsTax.VoyageOrTruckNumber = "0";
                        objCVarMainCarraigeRoutingsTax.TransientTime = Int32.Parse(createOperationFromQuotationData.pTransientTime);
                        objCVarMainCarraigeRoutingsTax.Validity = Int32.Parse(createOperationFromQuotationData.pValidity);
                        objCVarMainCarraigeRoutingsTax.FreeTime = Int32.Parse(createOperationFromQuotationData.pFreeTime);
                        objCVarMainCarraigeRoutingsTax.Notes = "0";
                        if (createOperationFromQuotationData.pTransportType == "1")
                        {//Ocean
                            objCVarMainCarraigeRoutingsTax.ShippingLineID = objCOperationsTax.lstCVarOperations[0].ShippingLineID;
                            objCVarMainCarraigeRoutingsTax.AirlineID = 0;
                            objCVarMainCarraigeRoutingsTax.TruckerID = 0;
                        }
                        else if (createOperationFromQuotationData.pTransportType == "2")
                        {//Air
                            objCVarMainCarraigeRoutingsTax.ShippingLineID = 0;
                            objCVarMainCarraigeRoutingsTax.AirlineID = objCOperationsTax.lstCVarOperations[0].AirlineID;
                            objCVarMainCarraigeRoutingsTax.TruckerID = 0;
                        }
                        else
                        {//Inland , TransportType = 3
                            objCVarMainCarraigeRoutingsTax.ShippingLineID = 0;
                            objCVarMainCarraigeRoutingsTax.AirlineID = 0;
                            objCVarMainCarraigeRoutingsTax.TruckerID = objCOperationsTax.lstCVarOperations[0].TruckerID;
                        }

                        objCVarMainCarraigeRoutingsTax.GensetSupplierID = 0; //pGensetSupplierID;
                        objCVarMainCarraigeRoutingsTax.CCAID = 0; //pCCAID;
                        objCVarMainCarraigeRoutingsTax.Quantity = "0"; //pQuantity;
                        objCVarMainCarraigeRoutingsTax.ContactPerson = "0";
                        objCVarMainCarraigeRoutingsTax.PickupAddress = "0";
                        objCVarMainCarraigeRoutingsTax.DeliveryAddress = "0";
                        objCVarMainCarraigeRoutingsTax.GateInPortID = 0;
                        objCVarMainCarraigeRoutingsTax.GateOutPortID = 0;
                        objCVarMainCarraigeRoutingsTax.GateInDate = DateTime.Parse("01/01/1900");// pGateInDate;

                        #region TransportOrder
                        objCVarMainCarraigeRoutingsTax.CustomerID = 0;
                        objCVarMainCarraigeRoutingsTax.SubContractedCustomerID = 0;
                        objCVarMainCarraigeRoutingsTax.Cost = 0;
                        objCVarMainCarraigeRoutingsTax.Sale = 0;
                        objCVarMainCarraigeRoutingsTax.IsFleet = false;
                        objCVarMainCarraigeRoutingsTax.CommodityID = 0;
                        objCVarMainCarraigeRoutingsTax.LoadingDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.LoadingReference = "0";
                        objCVarMainCarraigeRoutingsTax.UnloadingDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.UnloadingReference = "0";
                        objCVarMainCarraigeRoutingsTax.UnloadingTime = "0";
                        #endregion TransportOrder

                        objCVarMainCarraigeRoutingsTax.GateOutDate = DateTime.Parse("01/01/1900");//pGateOutDate;
                        objCVarMainCarraigeRoutingsTax.StuffingDate = DateTime.Parse("01/01/1900");//pStuffingDate;
                        objCVarMainCarraigeRoutingsTax.DeliveryDate = DateTime.Parse("01/01/1900");//pDeliveryDate;
                        objCVarMainCarraigeRoutingsTax.BookingNumber = "0";
                        objCVarMainCarraigeRoutingsTax.Delays = "0";
                        objCVarMainCarraigeRoutingsTax.DriverName = "0";
                        objCVarMainCarraigeRoutingsTax.DriverPhones = "0";
                        objCVarMainCarraigeRoutingsTax.PowerFromGateInTillActualSailing = "0";
                        objCVarMainCarraigeRoutingsTax.ContactPersonPhones = "0";
                        objCVarMainCarraigeRoutingsTax.LoadingTime = "0";

                        #region CustomsClearance
                        objCVarMainCarraigeRoutingsTax.CCAFreight = 0;
                        objCVarMainCarraigeRoutingsTax.CCAFOB = 0;
                        objCVarMainCarraigeRoutingsTax.CCACFValue = 0;
                        objCVarMainCarraigeRoutingsTax.CCAInvoiceNumber = "0";

                        objCVarMainCarraigeRoutingsTax.CCAInsurance = "0";
                        objCVarMainCarraigeRoutingsTax.CCADischargeValue = "0";
                        objCVarMainCarraigeRoutingsTax.CCAAcceptedValue = "0";
                        objCVarMainCarraigeRoutingsTax.CCAImportValue = "0";
                        objCVarMainCarraigeRoutingsTax.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.CCAExchangeRate = "0";
                        objCVarMainCarraigeRoutingsTax.CCAVATCertificateNumber = "0";
                        objCVarMainCarraigeRoutingsTax.CCAVATCertificateValue = "0";
                        objCVarMainCarraigeRoutingsTax.CCACommercialProfitCertificateNumber = "0";
                        objCVarMainCarraigeRoutingsTax.CCAOthers = "0";
                        objCVarMainCarraigeRoutingsTax.CCASpendDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.OffloadingDate = DateTime.Parse("01/01/1900");

                        objCVarMainCarraigeRoutingsTax.CertificateNumber = "0";
                        objCVarMainCarraigeRoutingsTax.CertificateValue = "0";
                        objCVarMainCarraigeRoutingsTax.CertificateDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.QasimaNumber = "0";
                        objCVarMainCarraigeRoutingsTax.QasimaDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.SalesDateReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.CommerceDateReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.InspectionDateReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.FinishDateReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.SalesDateDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.FinishDateDelivered = DateTime.Parse("01/01/1900");

                        objCVarMainCarraigeRoutingsTax.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.CCDropBackReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutingsTax.CC_ClearanceTypeID = 0;
                        objCVarMainCarraigeRoutingsTax.CCReleaseNo = "0";

                        #endregion CustomsClearance

                        objCVarMainCarraigeRoutingsTax.BillNumber = "0";
                        objCVarMainCarraigeRoutingsTax.TruckingOrderCode = "0";

                        objCVarMainCarraigeRoutingsTax.RoadNumber = "0";
                        objCVarMainCarraigeRoutingsTax.DeliveryOrderNumber = "0";
                        objCVarMainCarraigeRoutingsTax.WareHouse = "0";
                        objCVarMainCarraigeRoutingsTax.WareHouseLocation = "0";

                        

                        objCVarMainCarraigeRoutingsTax.CreatorUserID = objCVarMainCarraigeRoutingsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarMainCarraigeRoutingsTax.ModificationDate = objCVarMainCarraigeRoutingsTax.CreationDate = DateTime.Now;

                        objCRoutingsTax.lstCVarRoutings.Add(objCVarMainCarraigeRoutingsTax);
                        //objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);

                        #endregion Add MainCarraigeRoutingType

                        objCRoutingsTax.SaveMethod(objCRoutingsTax.lstCVarRoutings);
                        objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + RoutingID + "," + objCVarMainCarraigeRoutingsTax.ID + "," + "Routings");

                        #endregion
                    }
                }


            }
            #endregion


            if (CompanyName == "AKS")
                InsertOperationTracking(objCOperations.lstCVarOperations[0], CompanyName);
            if (CompanyName == "AKS" && objCOperations.lstCVarOperations[0].BLType != 2)
            {
                InsertAKSOperationTracking(objCOperations.lstCVarOperations[0]);
            }


            return new Object[] { _result
                , _result ? objCOperations.lstCVarOperations[0].ID : 0 };
        }
        [HttpGet, HttpPost]
        public object[] CreateHouseFormQuotation(int pQuotationRouteID)
        {
            var _result = false;
            var x = pQuotationRouteID;
            int _RowCount = 0;
            string message = "";
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            objCQuotationRoute.GetListPaging(99999, 1, "WHERE ID =" + pQuotationRouteID, "ID", out _RowCount);
            var Route = objCQuotationRoute.lstCVarQuotationRoute[0];
            CQuotations objCQuotation = new CQuotations();
            objCQuotation.GetListPaging(99999, 1, "WHERE ID =" + Route.QuotationID,"ID", out _RowCount);
            var Quotation = objCQuotation.lstCVarQuotations[0];
            CVarOperations objCVarOperations = new CVarOperations();
            CDefaults cDefaults = new CDefaults();
            cDefaults.GetList("where 1=1");
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            COperations _COperation = new COperations();
            _COperation.GetListPaging(99999, 1, "WHERE QuotationRouteID =" + pQuotationRouteID, "ID", out _RowCount);
            if(_COperation.lstCVarOperations.Count == 0)
            {
                objCVarOperations.BranchID = Quotation.BranchID;
                objCVarOperations.SalesmanID = Quotation.SalesmanID;
                objCVarOperations.BLType = 2;
                objCVarOperations.BLTypeIconName = "fa-book";
                objCVarOperations.BLTypeIconStyle = "master-icon-style";
                objCVarOperations.DirectionType = Quotation.DirectionType;
                objCVarOperations.DirectionIconName = Quotation.DirectionIconName;
                objCVarOperations.DirectionIconStyle = Quotation.DirectionIconStyle;
                objCVarOperations.TransportType = Quotation.TransportType;
                objCVarOperations.TransportIconName = Quotation.TransportIconName;
                objCVarOperations.TransportIconStyle = Quotation.TransportIconStyle;
                objCVarOperations.ShipmentType = Quotation.ShipmentType;
                objCVarOperations.IsPackagesPlacedOnMaster = false;
                objCVarOperations.AgentID = Quotation.AgentID;
                objCVarOperations.AgentAddressID = Quotation.AgentAddressID;
                objCVarOperations.AgentContactID = Quotation.AgentContactID;
                objCVarOperations.ShipperID = Quotation.ShipperID;
                objCVarOperations.ShipperAddressID = Quotation.ShipperAddressID;
                objCVarOperations.ShipperContactID = Quotation.ShipperContactID;
                objCVarOperations.ConsigneeID = Quotation.ConsigneeID;
                objCVarOperations.ConsigneeAddressID = Quotation.ConsigneeAddressID;
                objCVarOperations.ConsigneeContactID = Quotation.ConsigneeContactID;
                objCVarOperations.SalesmanID = Quotation.SalesmanID;
                objCVarOperations.IncotermID = Route.IncotermID;
                objCVarOperations.MoveTypeID = Route.MoveTypeID;
                objCVarOperations.CommodityID = Route.CommodityID;
                objCVarOperations.POrC = Route.POrC;
                objCVarOperations.OpenDate = DateTime.Now;
                objCVarOperations.CloseDate = Quotation.CloseDate;
                objCVarOperations.CutOffDate = Route.StuffingCutOf;
                //objCVarOperations.PickupCityID = Route.PickupPlaceID;
                objCVarOperations.PickupCityID = Route.POL;
                objCVarOperations.POLCountryID = Route.POLCountryID;
                if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "UNF")
                objCVarOperations.ATAPODAlarmStatus = 1;
                objCVarOperations.OperationStageID = 60;

                objCVarOperations.POL = Route.POL;
                objCVarOperations.POD = Route.POD;
                objCVarOperations.PODCountryID = Route.PODCountryID;
                objCVarOperations.ShippingLineID = Route.ShippingLineID;
                objCVarOperations.AirlineID = Route.AirlineID;
                objCVarOperations.TruckerID = Route.TruckerID; 
                objCVarOperations.IncludeDelivery = Quotation.IncludeDelivery;
                objCVarOperations.DeliveryZipCode = Quotation.DeliveryZipCode;
                objCVarOperations.DeliveryCityID = Route.POD;
                objCVarOperations.DeliveryCountryID = Route.PODCountryID;
                objCVarOperations.GrossWeight = Route.GrossWeight;
                objCVarOperations.Volume = Route.Volume;
                objCVarOperations.ChargeableWeight = Route.ChargeableWeight;
                objCVarOperations.IsDangerousGoods = Quotation.IsDangerousGoods;
                objCVarOperations.IsDelivered = false;
                objCVarOperations.CreatorUserID = objCVarOperations.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperations.CreationDate = objCVarOperations.ModificationDate = DateTime.Now;
                objCVarOperations.QuotationRouteID = Route.ID;
                objCVarOperations.Form13Notes = "0";
                objCVarOperations.OperationManID = Quotation.OperationManID;
                if (cDefaults.lstCVarDefaults[0].UnEditableCompanyName == "UNF")
                    objCVarOperations.ACIDDetails = Route.POLID_Transport.ToString();

                //if(Route.POLID_Transport != 0)
                //    objCVarOperations.ATDPOLAlarmStatus = Route.POLID_Transport;

                Common.Common.ReplaceNull(objCVarOperations);
                COperations objCOperations = new COperations();
                objCOperations.lstCVarOperations.Add(objCVarOperations);
                Exception checkException = objCOperations.SaveMethod(objCOperations.lstCVarOperations);

                CVarRoutings objCVarRouting = new CVarRoutings();
                objCVarRouting.RoutingTypeID = Route.RoutingTypeID;
                objCVarRouting.OperationID = objCVarOperations.ID;
                objCVarRouting.TransportType = Route.TransportType;
                objCVarRouting.TransportIconName = Route.TransportIconName;
                objCVarRouting.TransportIconStyle = Route.TransportIconStyle;
                objCVarRouting.POLCountryID = Route.POLCountryID;
                objCVarRouting.POL = Route.POL;
                objCVarRouting.POD = Route.POD;
                objCVarRouting.PODCountryID = Route.PODCountryID;
                objCVarRouting.ETAPOLDate = Route.ETAPOLDate;
                objCVarRouting.ShippingLineID = Route.ShippingLineID;
                objCVarRouting.CreatorUserID = Route.CreatorUserID;
                objCVarRouting.ModificatorUserID = Route.ModificatorUserID;
                objCVarRouting.CreationDate = Route.CreationDate;
                objCVarRouting.ModificationDate = Route.ModificationDate;
                objCVarRouting.DeliveryDate = DateTime.Now.AddDays(1);
                Common.Common.ReplaceNull(objCVarRouting);
                CRoutings objCRouting = new CRoutings();
                objCRouting.lstCVarRoutings.Add(objCVarRouting);
                Exception checkExeption2 = objCRouting.SaveMethod(objCRouting.lstCVarRoutings);
                Exception checkExeption3 = null;
                if (checkException == null && Quotation.ConsigneeID != 0)
                {
                    COperationPartners objCOperationPartners = new COperationPartners();
                    CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();

                    objCVarOperationPartners.OperationID = objCOperations.lstCVarOperations[0].ID;
                    objCVarOperationPartners.OperationPartnerTypeID = 2; //consignee
                    objCVarOperationPartners.CustomerID = Quotation.ConsigneeID;
                    objCVarOperationPartners.AgentID = 0;
                    objCVarOperationPartners.ShippingAgentID = 0;
                    objCVarOperationPartners.CustomsClearanceAgentID = 0;
                    objCVarOperationPartners.ShippingLineID = 0;
                    objCVarOperationPartners.AirlineID = 0;
                    objCVarOperationPartners.TruckerID = 0;
                    objCVarOperationPartners.SupplierID = 0;
                    objCVarOperationPartners.ContactID = 0;
                    objCVarOperationPartners.IsOperationClient = false;
                    objCVarOperationPartners.CreatorUserID = objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationPartners.CreationDate = objCVarOperationPartners.ModificationDate = DateTime.Now;
                    objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);

                    checkExeption3 = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
                }

                if (checkException == null && Quotation.ShipperID != 0)
                {
                    COperationPartners objCOperationPartners = new COperationPartners();
                    CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();

                    objCVarOperationPartners.OperationID = objCOperations.lstCVarOperations[0].ID;
                    objCVarOperationPartners.OperationPartnerTypeID = 1; //shipper
                    objCVarOperationPartners.CustomerID = Quotation.ShipperID;
                    objCVarOperationPartners.AgentID = 0;
                    objCVarOperationPartners.ShippingAgentID = 0;
                    objCVarOperationPartners.CustomsClearanceAgentID = 0;
                    objCVarOperationPartners.ShippingLineID = 0;
                    objCVarOperationPartners.AirlineID = 0;
                    objCVarOperationPartners.TruckerID = 0;
                    objCVarOperationPartners.SupplierID = 0;
                    objCVarOperationPartners.ContactID = 0;
                    objCVarOperationPartners.IsOperationClient = false;
                    objCVarOperationPartners.CreatorUserID = objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationPartners.CreationDate = objCVarOperationPartners.ModificationDate = DateTime.Now;
                    objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);

                    checkExeption3 = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
                }
                if (checkException == null)
                {
                    COperationPartners objCOperationPartners = new COperationPartners();
                    CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();

                    objCVarOperationPartners.OperationID = objCOperations.lstCVarOperations[0].ID;
                    objCVarOperationPartners.OperationPartnerTypeID = 4; //Notify1
                    if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "UNF")
                    {
                        objCVarOperationPartners.CustomerID = Quotation.ConsigneeID;
                    }
                    else
                    {
                        objCVarOperationPartners.CustomerID = 0;
                    }
                    objCVarOperationPartners.AgentID = 0;
                    objCVarOperationPartners.ShippingAgentID = 0;
                    objCVarOperationPartners.CustomsClearanceAgentID = 0;
                    objCVarOperationPartners.ShippingLineID = 0;
                    objCVarOperationPartners.AirlineID = 0;
                    objCVarOperationPartners.TruckerID = 0;
                    objCVarOperationPartners.SupplierID = 0;
                    objCVarOperationPartners.ContactID = 0;
                    objCVarOperationPartners.IsOperationClient = false;
                    objCVarOperationPartners.CreatorUserID = objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationPartners.CreationDate = objCVarOperationPartners.ModificationDate = DateTime.Now;
                    objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);

                    checkExeption3 = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
                }



                Int64 RecivableID = 0;
                Int64 PayablesID = 0;

                CReceivables objCReceivables = new CReceivables(); //to copy in it the records to be inserted
                CPayables objCPayables = new CPayables(); //to copy in it the records to be inserted
                CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
                CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
                checkException = objCvwQuotationCharges.GetListPaging(5000, 1, " WHERE QuotationRouteID = " + Route.ID, " ID ", out _);

                string pWhereClauseCurrencyDetails = "";
                CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                CVarPayables objCVarPayables = new CVarPayables();
                foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                {
                    checkException = objCvwChargeTypes.GetListPaging(1, 1, "WHERE ID=" + rowQuotationCharge.ChargeTypeID, "ID", out _RowCount);
                    #region Copy Receivables
                    pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.SaleCurrencyID
                        + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                        + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                        + " ORDER BY CODE";
                    objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                    Int64 pReceivableID = 0;
                    if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                    {
                        CVarReceivables objCVarReceivables = new CVarReceivables();
                        objCVarReceivables.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarReceivables.ChargeTypeID = rowQuotationCharge.ChargeTypeID;
                        objCVarReceivables.POrC = rowQuotationCharge.POrC;
                        objCVarReceivables.SupplierID = 0;
                        objCVarReceivables.MeasurementID = rowQuotationCharge.MeasurementID;
                        objCVarReceivables.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                        objCVarReceivables.PackageTypeID = rowQuotationCharge.PackageTypeID;
                        objCVarReceivables.Quantity = rowQuotationCharge.CostQuantity == 0 ? 1 : rowQuotationCharge.CostQuantity; //if SaleQuantity is activated then change to it
                                                                                                                                  //objCVarReceivables.CostPrice = rowQuotationCharge.CostPrice;
                                                                                                                                  //objCVarReceivables.CostAmount = rowQuotationCharge.CostAmount;
                        objCVarReceivables.SalePrice = rowQuotationCharge.SalePrice;
                        objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
                        #region Set Tax if set in ChargeTypes
                        if (objCvwDefaults.lstCVarvwDefaults[0].IsTaxOnItems && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "GBL")
                        {
                            objCVarReceivables.TaxeTypeID = objCvwChargeTypes.lstCVarvwChargeTypes[0].TaxeTypeID;
                            objCVarReceivables.TaxPercentage = objCvwChargeTypes.lstCVarvwChargeTypes[0].TaxPercentage;
                            objCVarReceivables.TaxAmount = Math.Round((objCVarReceivables.AmountWithoutVAT * objCVarReceivables.TaxPercentage / 100), 2);
                        }
                        else
                        {
                            objCVarReceivables.TaxeTypeID = 0;
                            objCVarReceivables.TaxPercentage = 0;
                            objCVarReceivables.TaxAmount = 0;
                        }
                        #endregion Set Tax if set in ChargeTypes
                        objCVarReceivables.SaleAmount = objCVarReceivables.AmountWithoutVAT + objCVarReceivables.TaxAmount;
                        objCVarReceivables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.SaleExchangeRate;
                        objCVarReceivables.CurrencyID = rowQuotationCharge.SaleCurrencyID;
                        objCVarReceivables.GeneratingQRID = Route.ID;
                        objCVarReceivables.Notes = rowQuotationCharge.Notes;

                        objCVarReceivables.IssueDate = DateTime.Now;
                        objCVarReceivables.OperationContainersAndPackagesID = 0;

                        objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                        objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                        objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                        objCVarReceivables.ReceiptNo = "";
                        objCVarReceivables.TariffID = 0;
                        objCVarReceivables.ManualChargeType = "0";
                        objCVarReceivables.CostCenterId = 0;
                        objCVarReceivables.IsOfficial = false;
                        objCVarReceivables.crmCode = "";

                        objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarReceivables.CreationDate = objCVarReceivables.ModificationDate = DateTime.Now;

                        objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                        objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                        pReceivableID = objCVarReceivables.ID;
                        RecivableID = objCVarReceivables.ID;

                    }
                    #endregion Copy Receivables

                    #region Copy Payables
                    pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.CostCurrencyID
                        + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                        + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                        + " ORDER BY CODE";
                    objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                    //if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                    if (rowQuotationCharge.CostAmount > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ELI" || objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                    {
                        objCVarPayables.ID = 0;

                        objCVarPayables.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarPayables.ChargeTypeID = rowQuotationCharge.ChargeTypeID;
                        objCVarPayables.POrC = rowQuotationCharge.POrC;

                        objCVarPayables.BillTo = 0; // reset objCVarPayables.BillTo
                                                    // get OperationPartnerID to insert into objCVarPayables.BillTo
                        if (rowQuotationCharge.BillTo != 0)
                        {
                            int dummy = 0;
                            string OperationPartnersWhereClause = " WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID;
                            OperationPartnersWhereClause += " AND OperationPartnerTypeID=" + rowQuotationCharge.BillTo_OperationPartnerTypeID;
                            if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 1 || rowQuotationCharge.BillTo_OperationPartnerTypeID == 2)
                            {
                                OperationPartnersWhereClause += " AND CustomerID=" + rowQuotationCharge.BillTo;
                            }
                            else if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 6)
                            {
                                OperationPartnersWhereClause += " AND AgentID=" + rowQuotationCharge.BillTo;
                            }
                            else if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 9)
                            {
                                OperationPartnersWhereClause += " AND ShippingLineID=" + rowQuotationCharge.BillTo;
                            }
                            else if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 10)
                            {
                                OperationPartnersWhereClause += " AND AirlineID=" + rowQuotationCharge.BillTo;
                            }
                            else if (rowQuotationCharge.BillTo_OperationPartnerTypeID == 11)
                            {
                                OperationPartnersWhereClause += " AND TruckerID=" + rowQuotationCharge.BillTo;
                            }
                            COperationPartners cOperationPartners = new COperationPartners();
                            cOperationPartners.GetListPaging(9, 1, OperationPartnersWhereClause, "ID", out dummy);
                            if (dummy > 0)
                                objCVarPayables.BillTo = cOperationPartners.lstCVarOperationPartners[0].ID;
                        }


                        objCVarPayables.SupplierOperationPartnerID = 0;

                        objCVarPayables.SupplierSiteID = rowQuotationCharge.SupplierSiteID;
                        objCVarPayables.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                        objCVarPayables.MeasurementID = rowQuotationCharge.MeasurementID;
                        objCVarPayables.Quantity = rowQuotationCharge.CostQuantity;
                        objCVarPayables.CostPrice = rowQuotationCharge.CostPrice;
                        objCVarPayables.CostAmount = rowQuotationCharge.CostAmount;
                        objCVarPayables.QuotationCost = rowQuotationCharge.CostAmount;
                        objCVarPayables.AmountWithoutVAT = rowQuotationCharge.CostAmount; //still no VAT entered so they are the same
                        if (objCvwDefaults.lstCVarvwDefaults.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName.Equals("BED"))
                        {
                            objCVarPayables.CostAmount = 0;
                            objCVarPayables.AmountWithoutVAT = 0;
                        }
                        objCVarPayables.SupplierInvoiceNo = "0";
                        objCVarPayables.SupplierReceiptNo = "0";
                        objCVarPayables.EntryDate = DateTime.Now;
                        objCVarPayables.BillID = 0;

                        objCVarPayables.IssueDate = DateTime.Now;
                        objCVarPayables.OperationContainersAndPackagesID = 0;

                        objCVarPayables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.CostExchangeRate;
                        objCVarPayables.CurrencyID = rowQuotationCharge.CostCurrencyID;
                        objCVarPayables.GeneratingQRID =Route.ID;
                        objCVarPayables.Notes = "Estimated Cost Price = " + rowQuotationCharge.CostPrice;
                        objCVarPayables.IsOfficial = false;
                        objCVarPayables.ReceivableID = pReceivableID; //objCVarReceivables.ID;
                        objCVarPayables.IssueDate = DateTime.Now;
                        objCVarPayables.IsQuotationApproval = false;
                        objCVarPayables.ApprovePendingValue = 0;
                        objCVarPayables.crmCode = "";
                        objCVarPayables.IsPurchased = false;

                        objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;
                        objCPayables.lstCVarPayables.Add(objCVarPayables);
                        checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);

                        PayablesID = objCVarPayables.ID;

                        // update Receivables.PayableID for BillTo in Receivables to read from Payables
                        string ReceivablesUpdateClause = " PayableID=" + PayablesID;
                        ReceivablesUpdateClause += " WHERE ID=" + pReceivableID;
                        CReceivables objCReceivables_Update_PayableID = new CReceivables();
                        checkException = objCReceivables_Update_PayableID.UpdateList(ReceivablesUpdateClause);
                    }


                    #endregion Copy Payables

                    
                }

                if (checkException != null || checkExeption2 !=null || checkExeption3 != null)
                {
                    _result = false;
                    if (checkExeption3 != null)
                        message = "Partner Not Linked with this House....";
                }
                else
                {
                    _result = true;
                }

            }
            else
            {
                 message = "There is a House for this Route";
            }
         

            return new object[]
            {
                _result ,
                message
            };
        }

        [HttpGet, HttpPost]
        public object[] CreateOperationFromAlarm([FromBody] CreateOperationFromAlarmDTO pParameterObject) 
        {
            bool _Result = false;
            int MainCarraigeRoutingTypeID = 30;
            int TruckingOrderRoutingTypeID = 60;
            int PickupRoutingTypeID = 10;
            int DeliveryRoutingTypeID = 50;
            int InlandTransportType = 3;
            string InlandIconName = "fa-truck";
            string InlandIconStyleClassName = "inland-icon-style"; //holds the css class name
            int _RowCount = 0;
            int DaysBeforeClose = 14;//default for default which is not handled

            Exception checkException = null;
            string strMessageReturned = "";
            CQuotations objCQuotation = new CQuotations();
            COperations objCOperations = new COperations();
            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CVarOperations objCVarOperations = new CVarOperations();
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            CCustomers objCCustomers = new CCustomers();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            CUsers objCUsers = new CUsers();
            CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
            objCUsers.GetItem(WebSecurity.CurrentUserId);
            List<string> MescoCompanies = new List<string> { "MES", "ALT", "GLO", "EUR", "SAC" };
            bool IsMescoCompany = MescoCompanies.Contains(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            string _UnEditableCompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            //make sure that no one created it before
            objCEmailReceiver.GetList("WHERE EmailID = " + pParameterObject.pEmailID.ToString() + " AND IsAlarm=0 ");
            if (objCEmailReceiver.lstCVarEmailReceiver.Count > 0)
            {
                strMessageReturned = "This operation is already created, please press 'F5' to refresh.";
            }
            else //Operation is not created yet so create it
            {



                checkException = objCvwQuotationRoute.GetListPaging(1, 1, "WHERE ID=" + pParameterObject.pQuotationRouteID.ToString(), "CodeSerial", out _RowCount);
                checkException = objCQuotation.GetListPaging(1, 1, "WHERE ID=" + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuotationID.ToString(), "ID", out _RowCount);

                checkException = objCCustomers.GetListPaging(1, 1, "WHERE IsInactive=1 and ID IN (" + objCQuotation.lstCVarQuotations[0].ShipperID + "," + objCQuotation.lstCVarQuotations[0].ConsigneeID + ")", "ID", out _RowCount);
                if (objCCustomers.lstCVarCustomers.Count > 0)
                {
                    _Result = false;
                    strMessageReturned = "This quotation has an inactive partner";
                }
                else if (objCQuotation.lstCVarQuotations[0].ShipperID == 0 && objCQuotation.lstCVarQuotations[0].ConsigneeID == 0 && objCQuotation.lstCVarQuotations[0].AgentID == 0)
                {
                    _Result = false;
                    strMessageReturned = "Check quotation partner";
                }
                else
                {
                    if (objCQuotation.lstCVarQuotations[0].DirectionType == 1/*Import*/ && objCQuotation.lstCVarQuotations[0].TransportType == 1/*Ocean*/) //ImportOceanDays
                        DaysBeforeClose = objCDefaults.lstCVarDefaults[0].ImportOceanDays;
                    else if (objCQuotation.lstCVarQuotations[0].DirectionType == 1/*Import*/ && objCQuotation.lstCVarQuotations[0].TransportType == 2/*Air*/) //ImportAirDays
                        DaysBeforeClose = objCDefaults.lstCVarDefaults[0].ImportAirDays;
                    else if (objCQuotation.lstCVarQuotations[0].DirectionType == 1/*Import*/ && objCQuotation.lstCVarQuotations[0].TransportType == 3/*Inland*/) //ImportInlandDays
                        DaysBeforeClose = objCDefaults.lstCVarDefaults[0].ImportInlandDays;
                    else if (objCQuotation.lstCVarQuotations[0].DirectionType == 2/*Export*/ && objCQuotation.lstCVarQuotations[0].TransportType == 1/*Ocean*/) //ExportOceanDays
                        DaysBeforeClose = objCDefaults.lstCVarDefaults[0].ExportOceanDays;
                    else if (objCQuotation.lstCVarQuotations[0].DirectionType == 2/*Export*/ && objCQuotation.lstCVarQuotations[0].TransportType == 2/*Air*/) //ExportAirDays
                        DaysBeforeClose = objCDefaults.lstCVarDefaults[0].ExportAirDays;
                    else if (objCQuotation.lstCVarQuotations[0].DirectionType == 2/*Export*/ && objCQuotation.lstCVarQuotations[0].TransportType == 3/*Inland*/) //ExportInlandDays
                        DaysBeforeClose = objCDefaults.lstCVarDefaults[0].ExportInlandDays;
                    else if (objCQuotation.lstCVarQuotations[0].DirectionType == 2/*Domestic*/ && objCQuotation.lstCVarQuotations[0].TransportType == 1/*Ocean*/) //DomesticOceanDays
                        DaysBeforeClose = objCDefaults.lstCVarDefaults[0].DomesticOceanDays;
                    else if (objCQuotation.lstCVarQuotations[0].DirectionType == 2/*Domestic*/ && objCQuotation.lstCVarQuotations[0].TransportType == 2/*Air*/) //DomesticAirDays
                        DaysBeforeClose = objCDefaults.lstCVarDefaults[0].DomesticAirDays;
                    else if (objCQuotation.lstCVarQuotations[0].DirectionType == 2/*Domestic*/ && objCQuotation.lstCVarQuotations[0].TransportType == 3/*Inland*/) //DomesticInlandDays
                        DaysBeforeClose = objCDefaults.lstCVarDefaults[0].DomesticInlandDays;

                    objCVarOperations.HouseNumber = "0";
                    objCVarOperations.MasterBL = "0";
                    objCVarOperations.MAWBSuffix = "0";
                    objCVarOperations.BLDate = DateTime.Parse("01-01-1900");
                    objCVarOperations.HBLDate = DateTime.Parse("01-01-1900");
                    objCVarOperations.ReleaseDate = DateTime.Parse("01-01-1900");
                    objCVarOperations.Form13Date = DateTime.Parse("01-01-1900");
                    objCVarOperations.PODate = DateTime.Parse("01-01-1900");

                    objCVarOperations.ClearanceApprovalDate = DateTime.Parse("01-01-1900");
                    objCVarOperations.TruckingApprovalDate = DateTime.Parse("01-01-1900");
                    objCVarOperations.FreightApprovalDate = DateTime.Parse("01-01-1900");

                    objCVarOperations.ShippedOnBoardDate = DateTime.Parse("01-01-1900");
                    objCVarOperations.FreightPayableAt = "0";
                    objCVarOperations.CertificateNumber = "0";
                    objCVarOperations.CountryOfOrigin = "0";
                    objCVarOperations.InvoiceValue = "0";
                    objCVarOperations.NumberOfOriginalBills = 3;

                    objCVarOperations.QuotationRouteID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID;
                    objCVarOperations.Code = "O" + DateTime.Now.Year.ToString().Substring(2, 2) + "-"
                        + (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionType == 1 ? "IMP" : (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionType == 2 ? "EXP" : "DOM")) + "-"
                        + (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 1 ? "OC" : (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 2 ? "AI" : "IN")) + "-"
                        ;
                    objCVarOperations.CommodityID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].CommodityID;
                    objCVarOperations.CommodityID2 = 0;
                    objCVarOperations.CommodityID3 = 0;
                    objCVarOperations.IncotermID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].IncotermID;

                    //in case of Mesco companies take the operation branch from the logged user branch --Mustafa Mahmoud
                    objCVarOperations.BranchID = MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName) ? objCUsers.lstCVarUsers[0].BranchID : objCQuotation.lstCVarQuotations[0].BranchID;
                    objCVarOperations.SalesmanID = objCQuotation.lstCVarQuotations[0].SalesmanID;
                    objCVarOperations.OperationManID = objCQuotation.lstCVarQuotations[0].OperationManID;
                    objCVarOperations.BLType = pParameterObject.pBLType;
                    objCVarOperations.BLTypeIconName = pParameterObject.pBLTypeIconName;
                    objCVarOperations.BLTypeIconStyle = pParameterObject.pBLTypeIconStyle;
                    objCVarOperations.DirectionType = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionType;
                    objCVarOperations.DirectionIconName = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionIconName;
                    objCVarOperations.DirectionIconStyle = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionIconStyle;
                    objCVarOperations.TransportType = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType;
                    objCVarOperations.TransportIconName = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportIconName;
                    objCVarOperations.TransportIconStyle = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportIconStyle;
                    objCVarOperations.ShipmentType = objCQuotation.lstCVarQuotations[0].ShipmentType;
                    objCVarOperations.ShipperID = objCQuotation.lstCVarQuotations[0].ShipperID;
                    objCVarOperations.ShipperAddressID = objCQuotation.lstCVarQuotations[0].ShipperAddressID;
                    objCVarOperations.ShipperContactID = objCQuotation.lstCVarQuotations[0].ShipperContactID;
                    objCVarOperations.ConsigneeID = objCQuotation.lstCVarQuotations[0].ConsigneeID;
                    objCVarOperations.ConsigneeAddressID = objCQuotation.lstCVarQuotations[0].ConsigneeAddressID;
                    objCVarOperations.ConsigneeContactID = objCQuotation.lstCVarQuotations[0].ConsigneeContactID;
                    objCVarOperations.AgentID = objCQuotation.lstCVarQuotations[0].AgentID;
                    objCVarOperations.AgentAddressID = objCQuotation.lstCVarQuotations[0].AgentAddressID;
                    objCVarOperations.AgentContactID = objCQuotation.lstCVarQuotations[0].AgentContactID;
                    //objCVarOperations.TransientTime = int.Parse(objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransientTime); //Come From QuotationRoute(put in main route not here)
                    //objCVarOperations.OpenDate = DateTime.Parse(objCvwQuotationRoute.lstCVarvwQuotationRoute[0].OpenDate); //this format has problem when works on server
                    objCVarOperations.OpenDate = DateTime.Now;//(objCvwQuotationRoute.lstCVarvwQuotationRoute[0].OpenDate == null ? DateTime.Parse("01-01-1900") : objCvwQuotationRoute.lstCVarvwQuotationRoute[0].OpenDate);
                    objCVarOperations.CloseDate = DateTime.Now.AddDays(DaysBeforeClose); //DateTime.Parse("01-01-1900");
                    objCVarOperations.CutOffDate = DateTime.Parse("01-01-1900"); //not used 
                    objCVarOperations.IncludePickup = objCQuotation.lstCVarQuotations[0].IncludePickup ? true : false;
                    objCVarOperations.PickupCityID = objCQuotation.lstCVarQuotations[0].PickupCityID;
                    objCVarOperations.PickupAddressID = objCQuotation.lstCVarQuotations[0].PickupAddressID;
                    objCVarOperations.POLCountryID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLCountryID; //Come From QuotationRoute
                    objCVarOperations.POL = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POL; //Come From QuotationRoute
                    objCVarOperations.PODCountryID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODCountryID; //Come From QuotationRoute
                    objCVarOperations.POD = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POD; //Come From QuotationRoute
                    objCVarOperations.PickupAddress = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PickupAddress; //Come From QuotationRoute
                    objCVarOperations.DeliveryAddress = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DeliveryAddress; //Come From QuotationRoute
                    objCVarOperations.MoveTypeID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].MoveTypeID; //Come From QuotationRoute
                    objCVarOperations.ShippingLineID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ShippingLineID;//Come From QuotationRoute
                    objCVarOperations.AirlineID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].AirlineID;//Come From QuotationRoute
                    objCVarOperations.TruckerID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TruckerID;//Come From QuotationRoute
                    objCVarOperations.IncludeDelivery = (objCQuotation.lstCVarQuotations[0].IncludeDelivery ? true : false);
                    objCVarOperations.DeliveryZipCode = objCQuotation.lstCVarQuotations[0].DeliveryZipCode;
                    objCVarOperations.DeliveryCityID = objCQuotation.lstCVarQuotations[0].DeliveryCityID;
                    objCVarOperations.DeliveryCountryID = objCQuotation.lstCVarQuotations[0].DeliveryCountryID;
                    objCVarOperations.GrossWeight = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].GrossWeight;
                    objCVarOperations.Volume = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Volume;
                    objCVarOperations.VolumetricWeight = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].VolumetricWeight;
                    objCVarOperations.ChargeableWeight = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ChargeableWeight;
                    objCVarOperations.NumberOfPackages = 0; //objCvwQuotationRoute.lstCVarvwQuotationRoute[0].NumberOfPackages;
                    objCVarOperations.IsDangerousGoods = (objCQuotation.lstCVarQuotations[0].IsDangerousGoods ? true : false);
                    objCVarOperations.CustomerReference = "0";
                    objCVarOperations.SupplierReference = "0";
                    objCVarOperations.PONumber = "0";
                    objCVarOperations.POValue = "0";
                    objCVarOperations.ReleaseNumber = "0";
                    objCVarOperations.Notes = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Notes;
                    objCVarOperations.Notes2 = "0";
                    objCVarOperations.AgreedRate = "0";
                    objCVarOperations.OperationStageID = 60;//(int.Parse(objCvwQuotationRoute.lstCVarvwQuotationRoute[0].OperationStageID);

                    objCVarOperations.IsDelivered = false;
                    objCVarOperations.IsTrucking = false;
                    objCVarOperations.IsInsurance = false;
                    objCVarOperations.IsClearance = false;
                    objCVarOperations.IsBosla = false;
                    objCVarOperations.IsGenset = false;
                    objCVarOperations.IsCourrier = false;
                    objCVarOperations.MarksAndNumbers = "0";
                    objCVarOperations.IsTelexRelease = false;

                    objCVarOperations.CreatorUserID = objCVarOperations.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperations.CreationDate = objCVarOperations.ModificationDate = DateTime.Now;
                    #region AirAgents (Venus fields A.Medra)
                    objCVarOperations.BLDate = DateTime.Parse("01/01/1900");
                    objCVarOperations.MAWBStockID = 0;
                    objCVarOperations.TypeOfStockID = 0;
                    objCVarOperations.FlightNo = "0";
                    objCVarOperations.POrC = _UnEditableCompanyName == "CQL" ? 3 : objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POrC;
                    objCVarOperations.IsAWB = false; //objCOperationToCopy.lstCVarOperations[0].IsAWB;
                                                     //Fields not in insert
                    objCVarOperations.AirLineID1 = 0;
                    objCVarOperations.FlightNo1 = "0";
                    objCVarOperations.FlightDate1 = DateTime.Parse("01/01/1900");
                    objCVarOperations.AirLineID2 = 0;
                    objCVarOperations.FlightNo2 = "0";
                    objCVarOperations.FlightDate2 = DateTime.Parse("01/01/1900");
                    objCVarOperations.AirLineID3 = 0;
                    objCVarOperations.FlightNo3 = "0";
                    objCVarOperations.FlightDate3 = DateTime.Parse("01/01/1900");

                    objCVarOperations.UNOrID = "0";
                    objCVarOperations.ProperShippingName = "0";
                    objCVarOperations.ClassOrDivision = "0";
                    objCVarOperations.PackingGroup = "0";
                    objCVarOperations.QuantityAndTypeOfPacking = "0";
                    objCVarOperations.PackingInstruction = "0";
                    objCVarOperations.ShippingDeclarationAuthorization = "0";
                    objCVarOperations.Barcode = "0";

                    objCVarOperations.GuaranteeLetterNumber = "0";
                    objCVarOperations.GuaranteeLetterDate = DateTime.Parse("01/01/1900");
                    objCVarOperations.GuaranteeLetterAmount = "0";
                    objCVarOperations.GuaranteeLetterSupplierInvoiceNumber = "0";
                    objCVarOperations.BankAccountID = 0;
                    objCVarOperations.GuaranteeLetterNotes = "0";

                    objCVarOperations.HandlingInformation = "0";
                    objCVarOperations.AmountOfInsurance = "0";
                    objCVarOperations.DeclaredValueForCarriage = "0";
                    objCVarOperations.WeightCharge = 0;
                    objCVarOperations.ValuationCharge = 0;
                    objCVarOperations.OtherChargesDueAgent = 0;
                    objCVarOperations.OtherCharges = "0";
                    objCVarOperations.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                    objCVarOperations.AccountingInformation = "0";
                    objCVarOperations.ReferenceNumber = "0";
                    objCVarOperations.OptionalShippingInformation = "0";
                    objCVarOperations.CHGSCode = "0";
                    objCVarOperations.WT_VALL_Other = "0";
                    objCVarOperations.DeclaredValueForCustoms = "0";
                    objCVarOperations.Tax = 0;
                    objCVarOperations.OtherChargesDueCarrier = 0;
                    objCVarOperations.WT_VALL = "0";
                    objCVarOperations.Description = "0";
                    #endregion Venus fields A.Medra

                    objCVarOperations.DismissalPermissionSerial = "0";
                    objCVarOperations.DeliveryOrderSerial = "0";

                    objCVarOperations.eFBLID = "0";
                    objCVarOperations.eFBLStatus = 0;

                    objCVarOperations.DispatchNumber = "0";
                    objCVarOperations.BusinessUnit = "0";
                    objCVarOperations.BusinessUnit2 = "0";
                    objCVarOperations.Form13Number = "0";


                    objCVarOperations.IMOClass = Decimal.Zero;
                    objCVarOperations.UNNumber = 0;
                    objCVarOperations.VesselID = 0;
                    objCVarOperations.BookingNumber = "0";
                    objCVarOperations.ACIDNumber = "0";
                    objCVarOperations.ACIDDetails = "0";
                    objCVarOperations.HouseParentID = 0;
                    objCVarOperations.IATACode = "0";
                    objCVarOperations.IssuingCarrier = "0";
                    objCVarOperations.IssuingDate = DateTime.Parse("01-01-1900");
                    objCVarOperations.StoreLocation = 0;
                    objCVarOperations.BlStatus = "0";
                    objCVarOperations.ForwarderId = 0;
                    objCVarOperations.HoldReason = "";
                    objCVarOperations.PrintHouseConsignee = false;
                    objCVarOperations.DORepresentative = "";
                    objCVarOperations.DOPrintedON = DateTime.Parse("01-01-1900");
                    objCVarOperations.FileAccountingDate = DateTime.Parse("01-01-1900");
                    objCVarOperations.DeliveryCustomer = "";
                    objCVarOperations.ManifestPreConsignee = "";
                    objCVarOperations.POTID = 0;
                    objCVarOperations.HouseContainerNumber = "";
                    objCVarOperations.Form13Notes = "0";

                    objCOperations.lstCVarOperations.Add(objCVarOperations);
                    checkException = objCOperations.SaveMethod(objCOperations.lstCVarOperations);

                    #region CreateCostCenter
                    CSystemOptions objCSystemOptions = new CSystemOptions();
                    objCSystemOptions.GetList("Where OptionID=94");
                    if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                    {
                        string CostCenterNumberParent = "";
                        Int32 pID = 0;
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        CA_CostCenters objCA_CostCentersParent = new CA_CostCenters();
                        objCA_CostCentersParent.GetList("where ( CostCenterName=N'عمليات' or CostCenterName='Operations' ) and Parent_ID is null ");
                        if (objCA_CostCentersParent.lstCVarA_CostCenters.Count > 0)
                        {
                            pID = objCA_CostCentersParent.lstCVarA_CostCenters[0].ID;
                            CostCenterNumberParent = objCA_CostCentersParent.lstCVarA_CostCenters[0].RealCostCenterCode;
                        }

                        else
                        {

                            string pNewCodePartner = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_CostCenters_GetCode(" + (pID == 0 ? "null" : pID.ToString()) + ") AS Code");


                            CVarA_CostCenters objCVarA_CostCenters = new CVarA_CostCenters();
                            objCVarA_CostCenters.CostCenterNumber = pNewCodePartner.PadRight(12, '0');
                            objCVarA_CostCenters.CostCenterName = "Operations";
                            objCVarA_CostCenters.Parent_ID = 0;
                            objCVarA_CostCenters.IsMain = true;
                            objCVarA_CostCenters.CCLevel = 1;
                            objCVarA_CostCenters.RealCostCenterCode = pNewCodePartner;
                            objCVarA_CostCenters.User_ID = WebSecurity.CurrentUserId;
                            objCVarA_CostCenters.Type_ID = 0;
                            objCVarA_CostCenters.IsClosed = false;
                            objCVarA_CostCenters.SubAccountGroupID = 0;
                            objCVarA_CostCenters.EmployeesCount = 0;
                            objCVarA_CostCenters.Code = "0";
                            objCA_CostCentersParent.lstCVarA_CostCenters.Add(objCVarA_CostCenters);
                            checkException = objCA_CostCentersParent.SaveMethod(objCA_CostCentersParent.lstCVarA_CostCenters);

                            pID = objCA_CostCentersParent.lstCVarA_CostCenters[0].ID;
                            CostCenterNumberParent = objCA_CostCentersParent.lstCVarA_CostCenters[0].RealCostCenterCode;
                        }

                        CA_CostCenters objCA_CostCenters = new CA_CostCenters();
                        checkException = objCA_CostCenters.GetListPaging(1, 1, "WHERE ID = " + pID.ToString(), "ID", out _RowCount);
                        string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_CostCenters_GetCode(" + (pID == 0 ? "null" : pID.ToString()) + ") AS Code");

                        CvwOperations objCvwOperations = new CvwOperations();
                        objCvwOperations.GetList("WHERE ID=" + objCOperations.lstCVarOperations[0].ID);
                        string pNewCodeNew = CostCenterNumberParent + pNewCode;
                        CVarA_CostCenters objCVarA_CostCentersChild = new CVarA_CostCenters();
                        objCVarA_CostCentersChild.CostCenterNumber = pNewCodeNew.PadRight(12, '0'); ;
                        objCVarA_CostCentersChild.CostCenterName = objCvwOperations.lstCVarvwOperations[0].Code + " - " + objCvwOperations.lstCVarvwOperations[0].ClientName;
                        objCVarA_CostCentersChild.Parent_ID = pID;
                        objCVarA_CostCentersChild.IsMain = false;
                        objCVarA_CostCentersChild.CCLevel = 2;
                        objCVarA_CostCentersChild.RealCostCenterCode = pNewCodeNew;
                        objCVarA_CostCentersChild.User_ID = WebSecurity.CurrentUserId;
                        objCVarA_CostCentersChild.Type_ID = 0;
                        objCVarA_CostCentersChild.IsClosed = false;
                        objCVarA_CostCentersChild.SubAccountGroupID = 0;
                        objCVarA_CostCentersChild.EmployeesCount = 0;
                        objCVarA_CostCentersChild.Code = "0";
                        objCA_CostCentersParent.lstCVarA_CostCenters.Add(objCVarA_CostCentersChild);
                        checkException = objCA_CostCentersParent.SaveMethod(objCA_CostCentersParent.lstCVarA_CostCenters);

                        //Link Oeation With CostCenter Add by ahmed maher
                        int _RowCount2 = 0;
                        objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
                        string CompanyName2 = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
                        if (CompanyName2 == "BED")
                        {
                            CVarA_LinkOperationWithCostCenter objCVarA_LinkOperationWithCostCenter = new CVarA_LinkOperationWithCostCenter();

                            objCVarA_LinkOperationWithCostCenter.OperationID = objCOperations.lstCVarOperations[0].ID;
                            objCVarA_LinkOperationWithCostCenter.CostCenterID = objCVarA_CostCentersChild.ID;

                            CA_LinkOperationWithCostCenter objA_LinkOperationWithCostCenter = new CA_LinkOperationWithCostCenter();
                            objA_LinkOperationWithCostCenter.lstCVarA_LinkOperationWithCostCenter.Add(objCVarA_LinkOperationWithCostCenter);
                            checkException = objA_LinkOperationWithCostCenter.SaveMethod(objA_LinkOperationWithCostCenter.lstCVarA_LinkOperationWithCostCenter);
                        }

                    }


                    #endregion

                    if (checkException == null) //Operation added successfully
                    {
                        _Result = true;

                        //Cancel Alarm
                        #region CancelAlarm
                        objCEmailReceiver.UpdateList("IsAlarm=0 WHERE EmailID=" + pParameterObject.pEmailID.ToString());
                        if (MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName))
                        {
                            objCEmailReceiver.UpdateList("IsAlarm=0 WHERE EmailID IN (SELECT ID FROM Email Where QuotationRouteID = " + pParameterObject.pQuotationRouteID + ")");
                        }
                        #endregion CancelAlarm
                        //COPY Partners To OperationPartners
                        #region Copy Operation Partners (at this point its just either a shipper or a consignee and maybe agent and empty notify)
                        COperationPartners objCOperationPartners = new COperationPartners();
                        CContacts objCContacts = new CContacts(); //to get default contact

                        //if (createOperationFromQuotationData.pDirectionType == "1") //import (consignee)
                        //{
                        CVarOperationPartners objCVarOperationConsigneePartner = new CVarOperationPartners();
                        objCVarOperationConsigneePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarOperationConsigneePartner.OperationPartnerTypeID = 2;//consignee
                        objCVarOperationConsigneePartner.CustomerID = objCQuotation.lstCVarQuotations[0].ConsigneeID;
                        objCVarOperationConsigneePartner.ContactID = objCQuotation.lstCVarQuotations[0].ConsigneeContactID;
                        objCVarOperationConsigneePartner.IsOperationClient = false;
                        objCVarOperationConsigneePartner.CreatorUserID = objCVarOperationConsigneePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationConsigneePartner.CreationDate = objCVarOperationConsigneePartner.ModificationDate = DateTime.Now;
                        objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationConsigneePartner);

                        //CVarOperationPartners objCVarOperationShipperPartner = new CVarOperationPartners();
                        //objCVarOperationShipperPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        //objCVarOperationShipperPartner.OperationPartnerTypeID = 1;//Shipper
                        //objCVarOperationShipperPartner.CustomerID = 0; // it will be set as null in DB
                        //objCVarOperationShipperPartner.ContactID = 0;
                        //objCVarOperationShipperPartner.CreatorUserID = objCVarOperationShipperPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        //objCVarOperationShipperPartner.CreationDate = objCVarOperationShipperPartner.ModificationDate = DateTime.Now;
                        //objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationShipperPartner);

                        //}
                        //else //export or domestic (shipper)
                        //{
                        CVarOperationPartners objCVarOperationShipperPartner = new CVarOperationPartners();

                        objCVarOperationShipperPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarOperationShipperPartner.OperationPartnerTypeID = 1; // export or domestic (shipper)
                        objCVarOperationShipperPartner.CustomerID = objCQuotation.lstCVarQuotations[0].ShipperID;
                        objCVarOperationShipperPartner.ContactID = objCQuotation.lstCVarQuotations[0].ShipperContactID;
                        objCVarOperationShipperPartner.IsOperationClient = objCQuotation.lstCVarQuotations[0].IsWarehousing ? true : false;
                        objCVarOperationShipperPartner.CreatorUserID = objCVarOperationShipperPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationShipperPartner.CreationDate = objCVarOperationShipperPartner.ModificationDate = DateTime.Now;
                        objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationShipperPartner);

                        //CVarOperationPartners objCVarOperationConsigneePartner = new CVarOperationPartners();
                        //objCVarOperationConsigneePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        //objCVarOperationConsigneePartner.OperationPartnerTypeID = 2;//consignee
                        //objCVarOperationConsigneePartner.CustomerID = 0; // it will be set as null in DB
                        //objCVarOperationConsigneePartner.ContactID = 0;
                        //objCVarOperationConsigneePartner.CreatorUserID = objCVarOperationConsigneePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        //objCVarOperationConsigneePartner.CreationDate = objCVarOperationConsigneePartner.ModificationDate = DateTime.Now;
                        //objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationConsigneePartner);
                        //}

                        CVarOperationPartners objCVarOperationNotifyPartner = new CVarOperationPartners();
                        objCVarOperationNotifyPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarOperationNotifyPartner.OperationPartnerTypeID = 4;//Notify1
                        objCVarOperationNotifyPartner.CustomerID = 0; // it will be set as null in DB
                        objCVarOperationNotifyPartner.ContactID = 0;
                        objCVarOperationNotifyPartner.IsOperationClient = false;
                        objCVarOperationNotifyPartner.CreatorUserID = objCVarOperationNotifyPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationNotifyPartner.CreationDate = objCVarOperationNotifyPartner.ModificationDate = DateTime.Now;
                        objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationNotifyPartner);

                        CVarOperationPartners objCVarOperationAgentPartner = new CVarOperationPartners();
                        objCVarOperationAgentPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarOperationAgentPartner.OperationPartnerTypeID = 6; //constAgentOperationPartnerTypeID
                        objCVarOperationAgentPartner.AgentID = objCQuotation.lstCVarQuotations[0].AgentID;
                        objCVarOperationAgentPartner.ContactID = objCQuotation.lstCVarQuotations[0].AgentContactID;
                        objCVarOperationAgentPartner.IsOperationClient = false;
                        objCVarOperationAgentPartner.CreatorUserID = objCVarOperationAgentPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationAgentPartner.CreationDate = objCVarOperationAgentPartner.ModificationDate = DateTime.Now;
                        objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationAgentPartner);

                        if (_UnEditableCompanyName == "LATT" || _UnEditableCompanyName == "LAT")
                        {
                            CVarOperationPartners objCVarOperationClientPartner = new CVarOperationPartners();
                            objCVarOperationClientPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                            objCVarOperationClientPartner.OperationPartnerTypeID = 200; //constClientOperationPartnerTypeID
                            objCVarOperationClientPartner.CustomerID = objCQuotation.lstCVarQuotations[0].ExporterID;

                            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                            string clientContactID = objCCustomizedDBCall.CallStringFunction($"select top 1 ID from Contacts where PartnerTypeID=1 and PartnerID={objCQuotation.lstCVarQuotations[0].ExporterID}");
                            if (long.TryParse(clientContactID, out long ccid))
                            {
                                objCVarOperationClientPartner.ContactID = ccid;
                            } else
                            {
                                objCVarOperationClientPartner.ContactID = 0;
                            }

                            objCVarOperationClientPartner.IsOperationClient = true;
                            objCVarOperationClientPartner.CreatorUserID = objCVarOperationClientPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationClientPartner.CreationDate = objCVarOperationClientPartner.ModificationDate = DateTime.Now;
                            objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationClientPartner);
                        }

                        //Adding the line enetered in the Routings & Charges tab
                        if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ShippingLineID != 0)
                        {
                            CVarOperationPartners objCVarOperationShippingLinePartner = new CVarOperationPartners();
                            objCVarOperationShippingLinePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                            objCVarOperationShippingLinePartner.OperationPartnerTypeID = 9; //constShippingLineOperationPartnerTypeID
                            objCVarOperationShippingLinePartner.ShippingLineID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ShippingLineID;
                            objCContacts.GetList("WHERE PartnerTypeID=5 AND PartnerID=" + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ShippingLineID.ToString());
                            objCVarOperationShippingLinePartner.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                            objCVarOperationShippingLinePartner.IsOperationClient = false;
                            objCVarOperationShippingLinePartner.CreatorUserID = objCVarOperationShippingLinePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationShippingLinePartner.CreationDate = objCVarOperationShippingLinePartner.ModificationDate = DateTime.Now;
                            objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationShippingLinePartner);
                        }
                        else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].AirlineID != 0)
                        {
                            CVarOperationPartners objCVarOperationAirlinePartner = new CVarOperationPartners();
                            objCVarOperationAirlinePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                            objCVarOperationAirlinePartner.OperationPartnerTypeID = 10; //constAirlineOperationPartnerTypeID
                            objCVarOperationAirlinePartner.AirlineID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].AirlineID;
                            objCContacts.GetList("WHERE PartnerTypeID=6 AND PartnerID=" + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].AirlineID.ToString());
                            objCVarOperationAirlinePartner.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                            objCVarOperationAirlinePartner.IsOperationClient = false;
                            objCVarOperationAirlinePartner.CreatorUserID = objCVarOperationAirlinePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationAirlinePartner.CreationDate = objCVarOperationAirlinePartner.ModificationDate = DateTime.Now;
                            objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationAirlinePartner);
                        }
                        else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TruckerID != 0)
                        {
                            CVarOperationPartners objCVarOperationTruckerPartner = new CVarOperationPartners();
                            objCVarOperationTruckerPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                            objCVarOperationTruckerPartner.OperationPartnerTypeID = 11; //constTruckerOperationPartnerTypeID
                            objCVarOperationTruckerPartner.TruckerID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TruckerID;
                            objCContacts.GetList("WHERE PartnerTypeID=7 AND PartnerID=" + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TruckerID.ToString());
                            objCVarOperationTruckerPartner.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                            objCVarOperationTruckerPartner.IsOperationClient = false;
                            objCVarOperationTruckerPartner.CreatorUserID = objCVarOperationTruckerPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationTruckerPartner.CreationDate = objCVarOperationTruckerPartner.ModificationDate = DateTime.Now;
                            objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationTruckerPartner);
                        }

                        objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);

                        #endregion

                        //COPY PAYABLES
                        #region Copy Payables

                        string pWhereClauseCurrencyDetails = "";
                        CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();

                        CPayables objCPayables = new CPayables(); //to copy in it the records to be inserted
                                                                  //those 2 lines are to get the charge types from QuotationCharges table from DB
                        CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
                        //objCvwQuotationCharges.GetList(" WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID);
                        int _tempRowCount = 0;
                        checkException = objCvwQuotationCharges.GetListPaging(5000, 1, " WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID, " ID ", out _tempRowCount);

                        CVarPayables objCVarPayables = new CVarPayables();
                        foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                        {
                            var PayableCategory = pParameterObject.pPayableCategories.FirstOrDefault(p => p.pQuotationChargeID == rowQuotationCharge.ID);
                            pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.CostCurrencyID
                                + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                                + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                                + " ORDER BY CODE";
                            objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                            //if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                            if ((rowQuotationCharge.CostAmount > 0 && (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ELI" || objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "NIV")) || (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI" && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "NIV"))

                            {
                                objCVarPayables.ID = 0;

                                objCVarPayables.OperationID = objCOperations.lstCVarOperations[0].ID;
                                objCVarPayables.ChargeTypeID = rowQuotationCharge.ChargeTypeID;
                                objCVarPayables.POrC = rowQuotationCharge.POrC;
                                objCVarPayables.SupplierOperationPartnerID = 0;

                                objCVarPayables.SupplierSiteID = rowQuotationCharge.SupplierSiteID;
                                objCVarPayables.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                                objCVarPayables.MeasurementID = rowQuotationCharge.MeasurementID;
                                objCVarPayables.Quantity = rowQuotationCharge.CostQuantity;
                                objCVarPayables.CostPrice = rowQuotationCharge.CostPrice;
                                objCVarPayables.CostAmount = rowQuotationCharge.CostAmount;
                                objCVarPayables.QuotationCost = rowQuotationCharge.CostAmount;
                                objCVarPayables.AmountWithoutVAT = rowQuotationCharge.CostAmount; //still no VAT entered so they are the same
                                if (objCvwDefaults.lstCVarvwDefaults.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName.Equals("BED"))
                                {
                                    objCVarPayables.CostAmount = 0;
                                    objCVarPayables.AmountWithoutVAT = 0;
                                }
                                objCVarPayables.SupplierInvoiceNo = "0";
                                objCVarPayables.SupplierReceiptNo = "0";
                                objCVarPayables.EntryDate = DateTime.Now;
                                objCVarPayables.BillID = 0;

                                objCVarPayables.IssueDate = DateTime.Now;
                                objCVarPayables.OperationContainersAndPackagesID = 0;

                                objCVarPayables.CurrencyID = rowQuotationCharge.CostCurrencyID;
                                
                                if (IsMescoCompany)
                                {
                                    cCurrencies.GetList(" where ID = " + rowQuotationCharge.CostCurrencyID + " and GETDATE() between CONVERT(datetime ,FromDate) and CONVERT(datetime ,ToDate) ");
                                    objCVarPayables.ExchangeRate = cCurrencies.lstCVarvwCurrencyDetails.Count > 0 ? cCurrencies.lstCVarvwCurrencyDetails[0].ExchangeRate : 1;
                                }
                                else
                                {
                                    objCVarPayables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.CostExchangeRate;
                                }
                                objCVarPayables.GeneratingQRID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID;
                                objCVarPayables.GeneratingQCID = rowQuotationCharge.ID;
                                objCVarPayables.Notes = rowQuotationCharge.Notes;
                                objCVarPayables.IsOfficial = false;
                                objCVarPayables.IsQuotationApproval = false;
                                objCVarPayables.ApprovePendingValue = 0;
                                objCVarPayables.CategoryID = PayableCategory == null ? 0 : PayableCategory.pCategoryID;
                                objCVarPayables.crmCode = rowQuotationCharge.CostLineCrmCode == null ? "" : rowQuotationCharge.CostLineCrmCode;
                                objCVarPayables.IsPurchased = false;

                                objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;
                                objCPayables.lstCVarPayables.Add(objCVarPayables);
                                checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);

                                #region Add Operation Partner if its not added yet and update the SupplierOperationPartnerID to the corresponding one
                                COperationPartners objCSupplierOperationPartner = new COperationPartners();
                                if (rowQuotationCharge.OperationPartnerTypeID != 0) //then check if partner is already entered then set the SupplierOperationPartnerID else add the OperationPartner then set the SupplierOperationPartnerID in Payables
                                {
                                    Int64 pSupplierOperationPartnerID = 0;
                                    CvwOperationPartners objCvwOperationPartnersCheckExistence = new CvwOperationPartners();
                                    objCvwOperationPartnersCheckExistence.GetList("WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID + " AND OperationPartnerTypeID=" + rowQuotationCharge.OperationPartnerTypeID + " AND PartnerTypeID=" + rowQuotationCharge.PartnerTypeID + " AND PartnerID=" + rowQuotationCharge.PartnerSupplierID);
                                    if (objCvwOperationPartnersCheckExistence.lstCVarvwOperationPartners.Count > 0) //OperationPartner is already entered
                                    {
                                        pSupplierOperationPartnerID = objCvwOperationPartnersCheckExistence.lstCVarvwOperationPartners[0].ID;
                                    }
                                    else //operation Partner is not added yet, so add it the take its ID to set the SupplierOperationPartnerID
                                    {
                                        objCContacts.GetList("WHERE PartnerTypeID=" + rowQuotationCharge.PartnerTypeID.ToString() + " AND PartnerID=" + rowQuotationCharge.PartnerSupplierID.ToString());
                                        CVarOperationPartners objCVarSupplierOperationPartner = new CVarOperationPartners();
                                        objCVarSupplierOperationPartner.ID = 0;
                                        objCVarSupplierOperationPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                                        objCVarSupplierOperationPartner.OperationPartnerTypeID = rowQuotationCharge.OperationPartnerTypeID;
                                        objCVarSupplierOperationPartner.CustomerID = rowQuotationCharge.CustomerID;
                                        objCVarSupplierOperationPartner.AgentID = rowQuotationCharge.AgentID;
                                        objCVarSupplierOperationPartner.ShippingAgentID = rowQuotationCharge.ShippingAgentID;
                                        objCVarSupplierOperationPartner.CustomsClearanceAgentID = rowQuotationCharge.CustomsClearanceAgentID;
                                        objCVarSupplierOperationPartner.ShippingLineID = rowQuotationCharge.ShippingLineID;
                                        objCVarSupplierOperationPartner.AirlineID = rowQuotationCharge.AirlineID;
                                        objCVarSupplierOperationPartner.TruckerID = rowQuotationCharge.TruckerID;
                                        objCVarSupplierOperationPartner.SupplierID = rowQuotationCharge.SupplierID;
                                        objCVarSupplierOperationPartner.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                                        objCVarSupplierOperationPartner.CreatorUserID = objCVarSupplierOperationPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                                        objCVarSupplierOperationPartner.CreationDate = objCVarSupplierOperationPartner.ModificationDate = DateTime.Now;
                                        objCSupplierOperationPartner.lstCVarOperationPartners.Add(objCVarSupplierOperationPartner);
                                        checkException = objCSupplierOperationPartner.SaveMethod(objCSupplierOperationPartner.lstCVarOperationPartners);
                                        pSupplierOperationPartnerID = objCVarSupplierOperationPartner.ID;
                                    }
                                    checkException = objCPayables.UpdateList("SupplierOperationPartnerID=" + pSupplierOperationPartnerID.ToString() + " WHERE ID=" + objCVarPayables.ID.ToString());
                                } //if (rowQuotationCharge.OperationPartnerTypeID != 0)
                                #endregion Add Operation Partner if its not added yet and update the SupplierOperationPartnerID to the corresponding one
                            } //if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                            #region Add Containers/Packages if not added yet (from Quotation Charges)
                            if (!(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL" && objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == InlandTransportType)
                                && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI"
                                && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "SUN"
                                && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "BED")
                            {
                                COperationContainersAndPackages objCOperationContainersAndPackages_QuotCharge = new COperationContainersAndPackages(); //to copy in it the records to be inserted

                                if (rowQuotationCharge.ContainerTypeID != 0 || rowQuotationCharge.PackageTypeID != 0) //then check if there Exists a container/Package
                                {
                                    CvwOperationContainersAndPackages objCvwOperationContainersAndPackagesCheckExistence = new CvwOperationContainersAndPackages();
                                    objCvwOperationContainersAndPackagesCheckExistence.GetList("WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID
                                        + (rowQuotationCharge.ContainerTypeID != 0
                                            ? (" AND ContainerTypeID=" + rowQuotationCharge.ContainerTypeID)
                                            : (" AND PackageTypeID=" + rowQuotationCharge.PackageTypeID)
                                          )
                                        );
                                    //if (objCvwOperationContainersAndPackagesCheckExistence.lstCVarvwOperationContainersAndPackages.Count == 0) // Container or Package is not added so add it
                                    {
                                        ////the next condition is add containers in operations a number of times equal to the quantity, // to change that just delete the if condition and keep only whats written in the else clause
                                        //if (int.Parse(createOperationFromQuotationData.pShipmentType) == 1 || int.Parse(createOperationFromQuotationData.pShipmentType) == 3) //FCL or FTL

                                        CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();
                                        objCVarOperationContainersAndPackages.OperationID = objCOperations.lstCVarOperations[0].ID;
                                        objCVarOperationContainersAndPackages.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                                        objCVarOperationContainersAndPackages.PackageTypeID = rowQuotationCharge.PackageTypeID;
                                        //the numbers of containers is always 1 because it holds packages
                                        objCVarOperationContainersAndPackages.Quantity = 0; //rowQuotationCharge.CostQuantity == 0 ? 1 : decimal.ToInt32(rowQuotationCharge.CostQuantity);
                                                                                            //objCVarOperationContainersAndPackages.Length = rowQuotationCharge.Length;
                                                                                            //objCVarOperationContainersAndPackages.Width = rowQuotationCharge.Width;
                                                                                            //objCVarOperationContainersAndPackages.Height = rowQuotationCharge.Height;
                                                                                            //objCVarOperationContainersAndPackages.Volume = rowQuotationCharge.Volume;
                                                                                            //objCVarOperationContainersAndPackages.VolumetricWeight = rowQuotationCharge.VolumetricWeight;
                                                                                            //objCVarOperationContainersAndPackages.NetWeight = rowQuotationCharge.NetWeight;
                                                                                            //objCVarOperationContainersAndPackages.GrossWeight = rowQuotationCharge.GrossWeight;
                                                                                            //objCVarOperationContainersAndPackages.ChargeableWeight = rowQuotationCharge.ChargeableWeight;
                                        objCVarOperationContainersAndPackages.ContainerNumber = "0";
                                        objCVarOperationContainersAndPackages.CarrierSeal = "0";
                                        objCVarOperationContainersAndPackages.ShipperSeal = "0";
                                        objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                                        objCVarOperationContainersAndPackages.DescriptionOfGoods = "0";

                                        objCVarOperationContainersAndPackages.LotNumber = "0";
                                        objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                                        objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                                        objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                                        objCVarOperationContainersAndPackages.Factory = "0";
                                        objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                                        objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                                        objCVarOperationContainersAndPackages.IsAsAgreed = false;
                                        objCVarOperationContainersAndPackages.IsMinimum = false;
                                        objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                                        objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                                        objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                                        objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                                        objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                                        objCVarOperationContainersAndPackages.ReturnDepot = "0";
                                        objCVarOperationContainersAndPackages.WeightUnit = "0";
                                        objCVarOperationContainersAndPackages.RateClass = "0";
                                        objCVarOperationContainersAndPackages.IsFull = false;
                                        objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                                        objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                                        objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                                        objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                                        objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");

                                        objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                                        objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

                                        objCOperationContainersAndPackages_QuotCharge.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);

                                        checkException = objCOperationContainersAndPackages_QuotCharge.SaveMethod(objCOperationContainersAndPackages_QuotCharge.lstCVarOperationContainersAndPackages);
                                    }
                                }
                            } //EOF if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                            #endregion Add Operation Containers/Packages if not added yet (from Quotation Charges)

                        } //foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)

                        #endregion

                        //COPY ReceivableS
                        #region Copy Receivables
                        CReceivables objCReceivables = new CReceivables(); //to copy in it the records to be inserted
                        foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                        {
                            var ReceivableCategory = pParameterObject.pReceivableCategories.FirstOrDefault(p => p.pQuotationChargeID == rowQuotationCharge.ID);
                            CvwChargeTypes objCvwChargeTypes_Tmp = new CvwChargeTypes();
                            checkException = objCvwChargeTypes_Tmp.GetListPaging(1, 1, "WHERE ID=" + rowQuotationCharge.ChargeTypeID, "ID", out _RowCount);
                            pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.SaleCurrencyID
                                + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                                + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                                + " ORDER BY CODE";
                            objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                            if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                            {

                                CVarReceivables objCVarReceivables = new CVarReceivables();

                                objCVarReceivables.OperationID = objCOperations.lstCVarOperations[0].ID;
                                objCVarReceivables.ChargeTypeID = rowQuotationCharge.ChargeTypeID;
                                objCVarReceivables.POrC = rowQuotationCharge.POrC;
                                objCVarReceivables.SupplierID = 0;
                                objCVarReceivables.MeasurementID = rowQuotationCharge.MeasurementID;
                                objCVarReceivables.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                                objCVarReceivables.PackageTypeID = rowQuotationCharge.PackageTypeID;
                                if(_UnEditableCompanyName == "MES")
                                objCVarReceivables.Quantity = rowQuotationCharge.SaleQuantity == 0 ? 1 : rowQuotationCharge.SaleQuantity; //if SaleQuantity is activated then change to it
                                 else                                                                                                         //objCVarReceivables.CostPrice = rowQuotationCharge.CostPrice;
                                    objCVarReceivables.Quantity = rowQuotationCharge.CostQuantity == 0 ? 1 : rowQuotationCharge.CostQuantity;                                                                                                        //objCVarReceivables.CostAmount = rowQuotationCharge.CostAmount;
                                objCVarReceivables.SalePrice = rowQuotationCharge.SalePrice;
                                objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
                                #region Set Tax if set in ChargeTypes
                                if (objCvwDefaults.lstCVarvwDefaults[0].IsTaxOnItems && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "GBL")
                                {
                                    objCVarReceivables.TaxeTypeID = objCvwChargeTypes_Tmp.lstCVarvwChargeTypes[0].TaxeTypeID;
                                    objCVarReceivables.TaxPercentage = objCvwChargeTypes_Tmp.lstCVarvwChargeTypes[0].TaxPercentage;
                                    objCVarReceivables.TaxAmount = Math.Round((objCVarReceivables.AmountWithoutVAT * objCVarReceivables.TaxPercentage / 100), 2);
                                }
                                else
                                {
                                    objCVarReceivables.TaxeTypeID = 0;
                                    objCVarReceivables.TaxPercentage = 0;
                                    objCVarReceivables.TaxAmount = 0;
                                }
                                #endregion Set Tax if set in ChargeTypes
                                objCVarReceivables.SaleAmount = objCVarReceivables.AmountWithoutVAT + objCVarReceivables.TaxAmount;

                               

                                if (IsMescoCompany)
                                {
                                    cCurrencies.GetList(" where ID = " + rowQuotationCharge.SaleCurrencyID + " and GETDATE() between CONVERT(datetime ,FromDate) and CONVERT(datetime ,ToDate) ");
                                    objCVarReceivables.ExchangeRate = cCurrencies.lstCVarvwCurrencyDetails.Count > 0 ? cCurrencies.lstCVarvwCurrencyDetails[0].ExchangeRate : 1;
                                }
                                else
                                {
                                    objCVarReceivables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.CostExchangeRate;
                                }
                                //objCVarReceivables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.SaleExchangeRate;
                                objCVarReceivables.CurrencyID = rowQuotationCharge.SaleCurrencyID;
                                objCVarReceivables.GeneratingQRID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID;
                                objCVarReceivables.GeneratingQCID = rowQuotationCharge.ID;
                                objCVarReceivables.Notes = rowQuotationCharge.Notes;

                                objCVarReceivables.IssueDate = DateTime.Now;
                                objCVarReceivables.OperationContainersAndPackagesID = 0;

                                objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                                objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                                objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                                objCVarReceivables.ReceiptNo = "";
                                objCVarReceivables.TariffID = 0;
                                objCVarReceivables.ManualChargeType = "0";
                                objCVarReceivables.CostCenterId = 0;
                                objCVarReceivables.IsOfficial = false;
                                objCVarReceivables.crmCode = rowQuotationCharge.SalesLineCrmCode == null ? "" : rowQuotationCharge.SalesLineCrmCode;
                                objCVarReceivables.CategoryID = ReceivableCategory == null ? 0 : ReceivableCategory.pCategoryID;

                                objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarReceivables.CreationDate = objCVarReceivables.ModificationDate = DateTime.Now;

                                objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                                objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                            }
                        } //foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                        #endregion

                        ////COPY CONTAINERS AND PACKAGES
                        #region Copy Containers And Packages
                        COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages(); //to copy in it the records to be inserted
                                                                                                                                    //those 2 lines are to get the ContainersAndPackages Data from QuotationContainersAndPAckages table from DB
                        CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
                        if (!(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL" && objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == InlandTransportType))
                            objCQuotationContainersAndPackages.GetList(" WHERE QuotationRouteID = " + pParameterObject.pQuotationRouteID);



                        foreach (var rowQuotationContainersAndPackages in objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages)
                        {
                            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MES")
                            {
                                CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();

                                objCVarOperationContainersAndPackages.OperationID = objCOperations.lstCVarOperations[0].ID;
                                objCVarOperationContainersAndPackages.ContainerTypeID = rowQuotationContainersAndPackages.ContainerTypeID;
                                objCVarOperationContainersAndPackages.PackageTypeID = rowQuotationContainersAndPackages.PackageTypeID;
                                objCVarOperationContainersAndPackages.Quantity = rowQuotationContainersAndPackages.Quantity;
                                objCVarOperationContainersAndPackages.Length = rowQuotationContainersAndPackages.Length;
                                objCVarOperationContainersAndPackages.Width = rowQuotationContainersAndPackages.Width;
                                objCVarOperationContainersAndPackages.Height = rowQuotationContainersAndPackages.Height;
                                objCVarOperationContainersAndPackages.Volume = rowQuotationContainersAndPackages.Volume;
                                objCVarOperationContainersAndPackages.VolumetricWeight = rowQuotationContainersAndPackages.VolumetricWeight;
                                objCVarOperationContainersAndPackages.NetWeight = rowQuotationContainersAndPackages.NetWeight;
                                objCVarOperationContainersAndPackages.NetWeightTON = 0;
                                objCVarOperationContainersAndPackages.GrossWeight = rowQuotationContainersAndPackages.GrossWeight;
                                objCVarOperationContainersAndPackages.GrossWeightTON = 0;
                                objCVarOperationContainersAndPackages.ChargeableWeight = rowQuotationContainersAndPackages.ChargeableWeight;
                                objCVarOperationContainersAndPackages.ContainerNumber = "0";
                                objCVarOperationContainersAndPackages.CarrierSeal = "0";
                                objCVarOperationContainersAndPackages.ShipperSeal = "0";
                                objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                                objCVarOperationContainersAndPackages.DescriptionOfGoods = "0";

                                objCVarOperationContainersAndPackages.LotNumber = "0";
                                objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackages.Factory = "0";
                                objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                                objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                                objCVarOperationContainersAndPackages.IsAsAgreed = false;
                                objCVarOperationContainersAndPackages.IsMinimum = false;
                                objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                                objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                                objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                                objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                                objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                                objCVarOperationContainersAndPackages.ReturnDepot = "0";
                                objCVarOperationContainersAndPackages.WeightUnit = "0";
                                objCVarOperationContainersAndPackages.RateClass = "0";
                                objCVarOperationContainersAndPackages.IsFull = false;
                                objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                                objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");

                                objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

                                objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
                            }
                            else
                            {
                                for (int z = 0; z < rowQuotationContainersAndPackages.Quantity; z++)
                                {
                                    CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();

                                    objCVarOperationContainersAndPackages.OperationID = objCOperations.lstCVarOperations[0].ID;
                                    objCVarOperationContainersAndPackages.ContainerTypeID = rowQuotationContainersAndPackages.ContainerTypeID;
                                    objCVarOperationContainersAndPackages.PackageTypeID = rowQuotationContainersAndPackages.PackageTypeID;
                                    //the numbers of containers is always 1 because it holds packages
                                    objCVarOperationContainersAndPackages.Quantity = 1;
                                    objCVarOperationContainersAndPackages.Length = rowQuotationContainersAndPackages.Length;
                                    objCVarOperationContainersAndPackages.Width = rowQuotationContainersAndPackages.Width;
                                    objCVarOperationContainersAndPackages.Height = rowQuotationContainersAndPackages.Height;
                                    objCVarOperationContainersAndPackages.Volume = rowQuotationContainersAndPackages.Volume;
                                    objCVarOperationContainersAndPackages.VolumetricWeight = rowQuotationContainersAndPackages.VolumetricWeight;
                                    objCVarOperationContainersAndPackages.NetWeight = rowQuotationContainersAndPackages.NetWeight;
                                    objCVarOperationContainersAndPackages.NetWeightTON = 0;
                                    objCVarOperationContainersAndPackages.GrossWeight = rowQuotationContainersAndPackages.GrossWeight;
                                    objCVarOperationContainersAndPackages.GrossWeightTON = 0;
                                    objCVarOperationContainersAndPackages.ChargeableWeight = rowQuotationContainersAndPackages.ChargeableWeight;
                                    objCVarOperationContainersAndPackages.ContainerNumber = "0";
                                    objCVarOperationContainersAndPackages.CarrierSeal = "0";
                                    objCVarOperationContainersAndPackages.ShipperSeal = "0";
                                    objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                                    objCVarOperationContainersAndPackages.DescriptionOfGoods = "0";

                                    objCVarOperationContainersAndPackages.LotNumber = "0";
                                    objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.Factory = "0";
                                    objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                                    objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                                    objCVarOperationContainersAndPackages.IsAsAgreed = false;
                                    objCVarOperationContainersAndPackages.IsMinimum = false;
                                    objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                                    objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                                    objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                                    objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                                    objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                                    objCVarOperationContainersAndPackages.ReturnDepot = "0";
                                    objCVarOperationContainersAndPackages.WeightUnit = "0";
                                    objCVarOperationContainersAndPackages.RateClass = "0";
                                    objCVarOperationContainersAndPackages.IsFull = false;
                                    objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");

                                    objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                                    objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

                                    objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
                                } //for (int z = 0; z < rowQuotationContainersAndPackages.Quantity; z++)
                            }
                        } //foreach (var rowQuotationContainersAndPackages in objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages)

                        objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
                        #endregion

                        //COPY Routings To Routings
                        //MainCarraige has ID = 30
                        #region Copy Operation Routings (Main Carraige)
                        CRoutings objCRoutings = new CRoutings();
                        #region Add MainCarraigeRoutingType

                        CVarRoutings objCVarMainCarraigeRoutings = new CVarRoutings();

                        objCVarMainCarraigeRoutings.OperationID = objCOperations.lstCVarOperations[0].ID;
                        objCVarMainCarraigeRoutings.TransportType = objCOperations.lstCVarOperations[0].TransportType;
                        objCVarMainCarraigeRoutings.TransportIconName = objCOperations.lstCVarOperations[0].TransportIconName;
                        objCVarMainCarraigeRoutings.TransportIconStyle = objCOperations.lstCVarOperations[0].TransportIconStyle;
                        objCVarMainCarraigeRoutings.RoutingTypeID = MainCarraigeRoutingTypeID; //Main Carraige
                        objCVarMainCarraigeRoutings.POLCountryID = objCOperations.lstCVarOperations[0].POLCountryID;
                        objCVarMainCarraigeRoutings.POL = objCOperations.lstCVarOperations[0].POL;
                        objCVarMainCarraigeRoutings.PODCountryID = objCOperations.lstCVarOperations[0].PODCountryID;
                        objCVarMainCarraigeRoutings.POD = objCOperations.lstCVarOperations[0].POD;
                        objCVarMainCarraigeRoutings.ETAPOLDate = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutings.ATAPOLDate = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutings.ExpectedDeparture = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutings.ActualDeparture = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutings.ExpectedArrival = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutings.ActualArrival = DateTime.Parse("01-01-1900");
                        objCVarMainCarraigeRoutings.VoyageOrTruckNumber = "0";
                        objCVarMainCarraigeRoutings.TransientTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransientTime;
                        objCVarMainCarraigeRoutings.Validity = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Validity;
                        objCVarMainCarraigeRoutings.FreeTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].FreeTime;
                        objCVarMainCarraigeRoutings.TruckCounter = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].FreeTimePOD;
                        objCVarMainCarraigeRoutings.Notes = "0";
                        if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 1)
                        {//Ocean
                            objCVarMainCarraigeRoutings.ShippingLineID = objCOperations.lstCVarOperations[0].ShippingLineID;
                            objCVarMainCarraigeRoutings.AirlineID = 0;
                            objCVarMainCarraigeRoutings.TruckerID = 0;
                        }
                        else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 2)
                        {//Air
                            objCVarMainCarraigeRoutings.ShippingLineID = 0;
                            objCVarMainCarraigeRoutings.AirlineID = objCOperations.lstCVarOperations[0].AirlineID;
                            objCVarMainCarraigeRoutings.TruckerID = 0;
                        }
                        else
                        {//Inland , TransportType = 3
                            objCVarMainCarraigeRoutings.ShippingLineID = 0;
                            objCVarMainCarraigeRoutings.AirlineID = 0;
                            objCVarMainCarraigeRoutings.TruckerID = objCOperations.lstCVarOperations[0].TruckerID;
                        }

                        objCVarMainCarraigeRoutings.GensetSupplierID = 0; //pGensetSupplierID;
                        objCVarMainCarraigeRoutings.CCAID = 0; //pCCAID;
                        objCVarMainCarraigeRoutings.Quantity = "0"; //pQuantity;
                        objCVarMainCarraigeRoutings.ContactPerson = "0";
                        objCVarMainCarraigeRoutings.PickupAddress = "0";
                        objCVarMainCarraigeRoutings.DeliveryAddress = "0";
                        objCVarMainCarraigeRoutings.GateInPortID = 0;
                        objCVarMainCarraigeRoutings.GateOutPortID = 0;
                        objCVarMainCarraigeRoutings.GateInDate = DateTime.Parse("01/01/1900");

                        #region TransportOrder
                        objCVarMainCarraigeRoutings.CustomerID = 0;
                        objCVarMainCarraigeRoutings.SubContractedCustomerID = 0;
                        objCVarMainCarraigeRoutings.Cost = 0;
                        objCVarMainCarraigeRoutings.Sale = 0;
                        objCVarMainCarraigeRoutings.IsFleet = false;
                        objCVarMainCarraigeRoutings.CommodityID = 0;
                        objCVarMainCarraigeRoutings.LoadingDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.LoadingReference = "0";
                        objCVarMainCarraigeRoutings.UnloadingDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.UnloadingReference = "0";
                        objCVarMainCarraigeRoutings.UnloadingTime = "0";
                        #endregion TransportOrder

                        objCVarMainCarraigeRoutings.GateOutDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.StuffingDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.DeliveryDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.BookingNumber = "0";
                        objCVarMainCarraigeRoutings.Delays = "0";
                        objCVarMainCarraigeRoutings.DriverName = "0";
                        objCVarMainCarraigeRoutings.DriverPhones = "0";
                        objCVarMainCarraigeRoutings.PowerFromGateInTillActualSailing = "0";
                        objCVarMainCarraigeRoutings.ContactPersonPhones = "0";
                        objCVarMainCarraigeRoutings.LoadingTime = "0";

                        #region CustomsClearance
                        objCVarMainCarraigeRoutings.CCAFreight = 0;
                        objCVarMainCarraigeRoutings.CCAFOB = 0;
                        objCVarMainCarraigeRoutings.CCACFValue = 0;
                        objCVarMainCarraigeRoutings.CCAInvoiceNumber = "0";

                        objCVarMainCarraigeRoutings.CCAInsurance = "0";
                        objCVarMainCarraigeRoutings.CCADischargeValue = "0";
                        objCVarMainCarraigeRoutings.CCAAcceptedValue = "0";
                        objCVarMainCarraigeRoutings.CCAImportValue = "0";
                        objCVarMainCarraigeRoutings.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.CCAExchangeRate = "0";
                        objCVarMainCarraigeRoutings.CCAVATCertificateNumber = "0";
                        objCVarMainCarraigeRoutings.CCAVATCertificateValue = "0";
                        objCVarMainCarraigeRoutings.CCACommercialProfitCertificateNumber = "0";
                        objCVarMainCarraigeRoutings.CCAWindowFees = "0";
                        objCVarMainCarraigeRoutings.CCAStorageFees = "0";
                        objCVarMainCarraigeRoutings.CCACommercialProfitTax = "0";
                        objCVarMainCarraigeRoutings.CCACustomsValue = "0";
                        objCVarMainCarraigeRoutings.CCAQuotedValue = "0";
                        objCVarMainCarraigeRoutings.CCAContractType = "0";
                        objCVarMainCarraigeRoutings.CCAOthers = "0";
                        objCVarMainCarraigeRoutings.CCASpendDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.OffloadingDate = DateTime.Parse("01/01/1900");

                        objCVarMainCarraigeRoutings.CertificateNumber = "0";
                        objCVarMainCarraigeRoutings.CertificateValue = "0";
                        objCVarMainCarraigeRoutings.CertificateDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.QasimaNumber = "0";
                        objCVarMainCarraigeRoutings.QasimaDate = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.Match = false;
                        objCVarMainCarraigeRoutings.SalesDateReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.CommerceDateReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.InspectionDateReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.FinishDateReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.SalesDateDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.FinishDateDelivered = DateTime.Parse("01/01/1900");


                        objCVarMainCarraigeRoutings.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.CCDropBackReceived = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.CC_ClearanceTypeID = 0;
                        objCVarMainCarraigeRoutings.CC_CustomItemsID = 0;
                        objCVarMainCarraigeRoutings.CCReleaseNo = "0";

                        objCVarMainCarraigeRoutings.CCMainWarehouseID = 0;
                        objCVarMainCarraigeRoutings.CCWarehouseATD = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.CCWarehouseETA = DateTime.Parse("01/01/1900");
                        objCVarMainCarraigeRoutings.CCIsDone = false;

                        #endregion CustomsClearance

                        objCVarMainCarraigeRoutings.BillNumber = "0";
                        objCVarMainCarraigeRoutings.TruckingOrderCode = "0";

                        objCVarMainCarraigeRoutings.RoadNumber = "0";
                        objCVarMainCarraigeRoutings.DeliveryOrderNumber = "0";
                        objCVarMainCarraigeRoutings.WareHouse = "0";
                        objCVarMainCarraigeRoutings.WareHouseLocation = "0";
                        objCVarMainCarraigeRoutings.CustomerWarehouseManagerName = "0";
                        objCVarMainCarraigeRoutings.CustomerWarehouseManagerPhone = "0";
                        objCVarMainCarraigeRoutings.ConcedeCompanyName = "";
                        objCVarMainCarraigeRoutings.ConcedeNumber = "";
                        objCVarMainCarraigeRoutings.ConcedeQty = 0;
                        objCVarMainCarraigeRoutings.ConcedeTotalQty = 0;


                        objCVarMainCarraigeRoutings.CreatorUserID = objCVarMainCarraigeRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarMainCarraigeRoutings.ModificationDate = objCVarMainCarraigeRoutings.CreationDate = DateTime.Now;
                        Common.Common.ReplaceNull(objCVarMainCarraigeRoutings);
                        objCRoutings.lstCVarRoutings.Add(objCVarMainCarraigeRoutings);
                        //objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);

                        #endregion Add MainCarraigeRoutingType

                        #region Add TruckingOrders
                        //TODO: Add Trucking Orders equal to number sent
                        for (int k = 0; k < pParameterObject.pNumberOfTruckingOrders; k++)
                        {
                            CVarRoutings objCVarTruckingOrderRoutings = new CVarRoutings();

                            objCVarTruckingOrderRoutings.OperationID = objCOperations.lstCVarOperations[0].ID;
                            objCVarTruckingOrderRoutings.TransportType = objCOperations.lstCVarOperations[0].TransportType;
                            objCVarTruckingOrderRoutings.TransportIconName = InlandIconName;
                            objCVarTruckingOrderRoutings.TransportIconStyle = InlandIconStyleClassName;
                            objCVarTruckingOrderRoutings.RoutingTypeID = TruckingOrderRoutingTypeID; //TruckingOrder
                            objCVarTruckingOrderRoutings.POLCountryID = objCOperations.lstCVarOperations[0].POLCountryID;
                            objCVarTruckingOrderRoutings.POL = objCOperations.lstCVarOperations[0].POL;
                            objCVarTruckingOrderRoutings.PODCountryID = objCOperations.lstCVarOperations[0].PODCountryID;
                            objCVarTruckingOrderRoutings.POD = objCOperations.lstCVarOperations[0].POD;
                            objCVarTruckingOrderRoutings.ETAPOLDate = DateTime.Parse("01-01-1900");
                            objCVarTruckingOrderRoutings.ATAPOLDate = DateTime.Parse("01-01-1900");
                            objCVarTruckingOrderRoutings.ExpectedDeparture = DateTime.Parse("01-01-1900");
                            objCVarTruckingOrderRoutings.ActualDeparture = DateTime.Parse("01-01-1900");
                            objCVarTruckingOrderRoutings.ExpectedArrival = DateTime.Parse("01-01-1900");
                            objCVarTruckingOrderRoutings.ActualArrival = DateTime.Parse("01-01-1900");
                            objCVarTruckingOrderRoutings.VoyageOrTruckNumber = "0";
                            objCVarTruckingOrderRoutings.TransientTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransientTime;
                            objCVarTruckingOrderRoutings.Validity = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Validity;
                            objCVarTruckingOrderRoutings.FreeTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].FreeTime;
                            objCVarTruckingOrderRoutings.Notes = "0";
                            objCVarTruckingOrderRoutings.IsOwnedByCompany = pParameterObject.pIsOwnedByCompany;
                            objCVarTruckingOrderRoutings.IsLoaded = false;
                            if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 1)
                            {//Ocean
                                objCVarTruckingOrderRoutings.ShippingLineID = objCOperations.lstCVarOperations[0].ShippingLineID;
                                objCVarTruckingOrderRoutings.AirlineID = 0;
                                objCVarTruckingOrderRoutings.TruckerID = 0;
                            }
                            else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 2)
                            {//Air
                                objCVarTruckingOrderRoutings.ShippingLineID = 0;
                                objCVarTruckingOrderRoutings.AirlineID = objCOperations.lstCVarOperations[0].AirlineID;
                                objCVarTruckingOrderRoutings.TruckerID = 0;
                            }
                            else
                            {//Inland , TransportType = 3
                                objCVarTruckingOrderRoutings.ShippingLineID = 0;
                                objCVarTruckingOrderRoutings.AirlineID = 0;
                                objCVarTruckingOrderRoutings.TruckerID = objCOperations.lstCVarOperations[0].TruckerID;
                            }

                            objCVarTruckingOrderRoutings.GensetSupplierID = 0; //pGensetSupplierID;
                            objCVarTruckingOrderRoutings.CCAID = 0; //pCCAID;
                            objCVarTruckingOrderRoutings.Quantity = "0"; //pQuantity;
                            objCVarTruckingOrderRoutings.ContactPerson = "0";
                            objCVarTruckingOrderRoutings.PickupAddress = "0";
                            objCVarTruckingOrderRoutings.DeliveryAddress = "0";
                            objCVarTruckingOrderRoutings.GateInPortID = 0;
                            objCVarTruckingOrderRoutings.GateOutPortID = 0;
                            objCVarTruckingOrderRoutings.GateInDate = DateTime.Parse("01/01/1900");

                            #region TransportOrder
                            objCVarTruckingOrderRoutings.CustomerID = 0;
                            objCVarTruckingOrderRoutings.SubContractedCustomerID = 0;
                            objCVarTruckingOrderRoutings.Cost = 0;
                            objCVarTruckingOrderRoutings.Sale = 0;
                            objCVarTruckingOrderRoutings.IsFleet = false;
                            objCVarTruckingOrderRoutings.CommodityID = 0;
                            objCVarTruckingOrderRoutings.LoadingDate = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.LoadingReference = "0";
                            objCVarTruckingOrderRoutings.UnloadingDate = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.UnloadingReference = "0";
                            objCVarTruckingOrderRoutings.UnloadingTime = "0";
                            #endregion TransportOrder

                            objCVarTruckingOrderRoutings.GateOutDate = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.StuffingDate = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.DeliveryDate = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.BookingNumber = "0";
                            objCVarTruckingOrderRoutings.Delays = "0";
                            objCVarTruckingOrderRoutings.DriverName = "0";
                            objCVarTruckingOrderRoutings.DriverPhones = "0";
                            objCVarTruckingOrderRoutings.PowerFromGateInTillActualSailing = "0";
                            objCVarTruckingOrderRoutings.ContactPersonPhones = "0";
                            objCVarTruckingOrderRoutings.LoadingTime = "0";

                            #region CustomsClearance
                            objCVarTruckingOrderRoutings.CCAFreight = 0;
                            objCVarTruckingOrderRoutings.CCAFOB = 0;
                            objCVarTruckingOrderRoutings.CCACFValue = 0;
                            objCVarTruckingOrderRoutings.CCAInvoiceNumber = "0";

                            objCVarTruckingOrderRoutings.CCAInsurance = "0";
                            objCVarTruckingOrderRoutings.CCADischargeValue = "0";
                            objCVarTruckingOrderRoutings.CCAAcceptedValue = "0";
                            objCVarTruckingOrderRoutings.CCAImportValue = "0";
                            objCVarTruckingOrderRoutings.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.CCAExchangeRate = "0";
                            objCVarTruckingOrderRoutings.CCAVATCertificateNumber = "0";
                            objCVarTruckingOrderRoutings.CCAVATCertificateValue = "0";
                            objCVarTruckingOrderRoutings.CCACommercialProfitCertificateNumber = "0";
                            objCVarTruckingOrderRoutings.CCAWindowFees = "0";
                            objCVarTruckingOrderRoutings.CCAStorageFees = "0";
                            objCVarTruckingOrderRoutings.CCACommercialProfitTax = "0";
                            objCVarTruckingOrderRoutings.CCACustomsValue = "0";
                            objCVarTruckingOrderRoutings.CCAQuotedValue = "0";
                            objCVarTruckingOrderRoutings.CCAContractType = "0";
                            objCVarTruckingOrderRoutings.CCAOthers = "0";
                            objCVarTruckingOrderRoutings.CCASpendDate = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.OffloadingDate = DateTime.Parse("01/01/1900");

                            objCVarTruckingOrderRoutings.CertificateNumber = "0";
                            objCVarTruckingOrderRoutings.CertificateValue = "0";
                            objCVarTruckingOrderRoutings.CertificateDate = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.QasimaNumber = "0";
                            objCVarTruckingOrderRoutings.QasimaDate = DateTime.Parse("01/01/1900");
                            objCVarMainCarraigeRoutings.Match = false;
                            objCVarTruckingOrderRoutings.SalesDateReceived = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.CommerceDateReceived = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.InspectionDateReceived = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.FinishDateReceived = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.SalesDateDelivered = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.FinishDateDelivered = DateTime.Parse("01/01/1900");


                            objCVarTruckingOrderRoutings.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.CCDropBackReceived = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.CC_ClearanceTypeID = 0;
                            objCVarTruckingOrderRoutings.CC_CustomItemsID = 0;
                            objCVarTruckingOrderRoutings.CCReleaseNo = "0";

                            #endregion CustomsClearance

                            objCVarTruckingOrderRoutings.BillNumber = "0";
                            objCVarTruckingOrderRoutings.TruckingOrderCode = "0";

                            objCVarTruckingOrderRoutings.RoadNumber = "0";
                            objCVarTruckingOrderRoutings.DeliveryOrderNumber = "0";
                            objCVarTruckingOrderRoutings.WareHouse = "0";
                            objCVarTruckingOrderRoutings.WareHouseLocation = "0";

                            objCVarTruckingOrderRoutings.CreatorUserID = objCVarTruckingOrderRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarTruckingOrderRoutings.ModificationDate = objCVarTruckingOrderRoutings.CreationDate = DateTime.Now;
                            objCVarTruckingOrderRoutings.CCMainWarehouseID = 0;
                            objCVarTruckingOrderRoutings.CCWarehouseATD = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.CCWarehouseETA = DateTime.Parse("01/01/1900");
                            objCVarTruckingOrderRoutings.CCIsDone = false;
                            objCVarTruckingOrderRoutings.TruckingEquipmentID = 0;
                            objCVarTruckingOrderRoutings.ConcedeCompanyName = "";
                            objCVarTruckingOrderRoutings.ConcedeNumber = "";
                            objCVarTruckingOrderRoutings.ConcedeQty = 0;
                            objCVarTruckingOrderRoutings.ConcedeTotalQty = 0;
                            objCVarTruckingOrderRoutings.WarehouseID = 0;
                            Common.Common.ReplaceNull(objCVarMainCarraigeRoutings);
                            objCRoutings.lstCVarRoutings.Add(objCVarTruckingOrderRoutings);
                        }
                        #endregion Add TruckingOrders

                        objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);

                        string pWhereClause = "";
                        //CDefaults objCDefaults = new CDefaults();
                        checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
                        checkException = objCUsers.GetListPaging(999999, 1, "WHERE  ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                        if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                            pWhereClause += " Where ID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";

                        CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
                        checkException = objCvwChargeTypes.GetListPaging(999999, 1, pWhereClause, "Name", out _RowCount);

                        CPayables objCPayablesTrucking = new CPayables();

                        for (int l = 0; l < objCRoutings.lstCVarRoutings.Count; l++)
                        {
                            if (objCRoutings.lstCVarRoutings[l].RoutingTypeID == 60 && objCDefaults.lstCVarDefaults[0].IsAddChargeAuto
                                && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "GBL")
                            {
                                for (int k = 0; k < objCvwChargeTypes.lstCVarvwChargeTypes.Count; k++)
                                {
                                    //string pWhereClauseCurrencyDetails = "";
                                    //CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();

                                    CVarPayables objCVarPayablesTrucking = new CVarPayables();

                                    objCVarPayablesTrucking.ID = 0;

                                    objCVarPayablesTrucking.OperationID = objCRoutings.lstCVarRoutings[l].OperationID;
                                    objCVarPayablesTrucking.ChargeTypeID = objCvwChargeTypes.lstCVarvwChargeTypes[k].ID;
                                    objCVarPayablesTrucking.POrC = 0;
                                    objCVarPayablesTrucking.SupplierOperationPartnerID = 0;

                                    objCVarPayablesTrucking.SupplierSiteID = 0;
                                    objCVarPayablesTrucking.ContainerTypeID = 0;
                                    objCVarPayablesTrucking.MeasurementID = 0;
                                    objCVarPayables.Quantity = 1;
                                    objCVarPayablesTrucking.CostPrice = 0;
                                    objCVarPayablesTrucking.CostAmount = 0;
                                    objCVarPayablesTrucking.QuotationCost = 0;
                                    objCVarPayablesTrucking.AmountWithoutVAT = 0; //still no VAT entered so they are the same
                                    objCVarPayablesTrucking.SupplierInvoiceNo = "0";
                                    objCVarPayablesTrucking.SupplierReceiptNo = "0";
                                    objCVarPayablesTrucking.EntryDate = DateTime.Now;
                                    objCVarPayablesTrucking.BillID = 0;
                                    objCVarPayablesTrucking.TruckingOrderID = objCRoutings.lstCVarRoutings[l].ID;
                                    objCVarPayablesTrucking.IssueDate = DateTime.Now;
                                    objCVarPayablesTrucking.OperationContainersAndPackagesID = 0;

                                    objCVarPayablesTrucking.ExchangeRate = 1; //rowQuotationCharge.CostExchangeRate;
                                    objCVarPayablesTrucking.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                                    objCVarPayablesTrucking.GeneratingQRID = 0;
                                    objCVarPayablesTrucking.Notes = "";
                                    objCVarPayablesTrucking.IsOfficial = false;
                                    objCVarPayablesTrucking.IsQuotationApproval = false;
                                    objCVarPayablesTrucking.ApprovePendingValue = 0;
                                    objCVarPayablesTrucking.crmCode = "";
                                    objCVarPayables.IsPurchased = false;


                                    objCVarPayablesTrucking.CreatorUserID = objCVarPayablesTrucking.ModificatorUserID = WebSecurity.CurrentUserId;
                                    objCVarPayablesTrucking.CreationDate = objCVarPayablesTrucking.ModificationDate = DateTime.Now;
                                    objCPayablesTrucking.lstCVarPayables.Add(objCVarPayablesTrucking);

                                }
                            }
                        }
                        checkException = objCPayablesTrucking.SaveMethod(objCPayablesTrucking.lstCVarPayables);
                        #endregion
                    }
                } //else if (objCQuotation.lstCVarQuotations[0].ShipperID == 0 && objCQuotation.lstCVarQuotations[0].ConsigneeID == 0 && objCQuotation.lstCVarQuotations[0].AgentID == 0)
            } //of create operation
            if (_Result)
            {
                if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "MAR" || objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL")
                    Forwarding.MvcApp.Controllers.MasterData.API_Locations.ChargeTypesController.ChargeTypes_SetDefaultReceivablesQuantity(objCOperations.lstCVarOperations[0].ID);
                Forwarding.MvcApp.Controllers.Operations.API_Operations.OperationsController.Operations_EmailNotification(objCOperations.lstCVarOperations[0].ID);



                if (CompanyName == "AKS")
                    InsertOperationTracking(objCOperations.lstCVarOperations[0], CompanyName);
                if (CompanyName == "AKS" && objCOperations.lstCVarOperations[0].BLType != 2)
                {
                    InsertAKSOperationTracking(objCOperations.lstCVarOperations[0]);
                }


            }


            #region TaxLink
            if ((CompanyName == "CHM" || CompanyName == "OCE") && checkException == null)
            {
                Int32 ShipperID = 0;
                Int32 ConsigneeID = 0;
                Int32 CustomerID = 0;
                Int32 AgentID = 0;
                Int32 TruckerID = 0;

                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

                CCustomersTAX objCCustomersTax = new CCustomersTAX();
                COperationsTAX objCOperationsTax = new COperationsTAX();
                CVarOperationsTAX objCVarOperationsTax = new CVarOperationsTAX();

                //objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].ShipperID);
                //if (objCCustomers.lstCVarCustomers.Count > 0)
                //{
                //    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                //    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                //    {
                //        ShipperID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                //    }
                //}
                //objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].ConsigneeID);
                //if (objCCustomers.lstCVarCustomers.Count > 0)
                //{
                //    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                //    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                //    {
                //        ConsigneeID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                //    }
                //}
                //objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].CustomerID);
                //if (objCCustomers.lstCVarCustomers.Count > 0)
                //{
                //    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                //    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                //    {
                //        CustomerID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                //    }
                //}
                //objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].AgentID);
                //if (objCCustomers.lstCVarCustomers.Count > 0)
                //{
                //    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                //    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                //    {
                //        AgentID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                //    }
                //}
                //objCCustomers.GetList("where id=" + objCQuotations.lstCVarQuotations[0].TruckerID);
                //if (objCCustomers.lstCVarCustomers.Count > 0)
                //{
                //    objCCustomersTax.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                //    if (objCCustomersTax.lstCVarCustomersTAX.Count > 0)
                //    {
                //        TruckerID = objCCustomersTax.lstCVarCustomersTAX[0].ID;

                //    }
                //}

                objCVarOperationsTax.HouseNumber = "0";
                objCVarOperationsTax.MasterBL = "0";
                objCVarOperationsTax.MAWBSuffix = "0";
                objCVarOperationsTax.BLDate = DateTime.Parse("01-01-1900");
                objCVarOperationsTax.HBLDate = DateTime.Parse("01-01-1900");
                objCVarOperationsTax.ReleaseDate = DateTime.Parse("01-01-1900");
                objCVarOperationsTax.PODate = DateTime.Parse("01-01-1900");

                objCVarOperationsTax.ClearanceApprovalDate = DateTime.Parse("01-01-1900");
                objCVarOperationsTax.TruckingApprovalDate = DateTime.Parse("01-01-1900");
                objCVarOperationsTax.FreightApprovalDate = DateTime.Parse("01-01-1900");

                objCVarOperationsTax.ShippedOnBoardDate = DateTime.Parse("01-01-1900");
                objCVarOperationsTax.FreightPayableAt = "0";
                objCVarOperationsTax.CertificateNumber = "0";
                objCVarOperationsTax.CountryOfOrigin = "0";
                objCVarOperationsTax.InvoiceValue = "0";
                objCVarOperationsTax.NumberOfOriginalBills = 3;

                objCVarOperationsTax.QuotationRouteID = 0;// objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID;
                objCVarOperationsTax.Code = "O" + DateTime.Now.Year.ToString().Substring(2, 2) + "-"
                    + (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionType == 1 ? "IMP" : (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionType == 2 ? "EXP" : "DOM")) + "-"
                    + (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 1 ? "OC" : (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 2 ? "AI" : "IN")) + "-"
                    ;
                objCVarOperationsTax.CommodityID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].CommodityID;
                objCVarOperationsTax.IncotermID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].IncotermID;

                objCVarOperationsTax.BranchID = objCQuotation.lstCVarQuotations[0].BranchID;
                objCVarOperationsTax.SalesmanID = objCQuotation.lstCVarQuotations[0].SalesmanID;
                objCVarOperationsTax.BLType = pParameterObject.pBLType;
                objCVarOperationsTax.BLTypeIconName = pParameterObject.pBLTypeIconName;
                objCVarOperationsTax.BLTypeIconStyle = pParameterObject.pBLTypeIconStyle;
                objCVarOperationsTax.DirectionType = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionType;
                objCVarOperationsTax.DirectionIconName = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionIconName;
                objCVarOperationsTax.DirectionIconStyle = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DirectionIconStyle;
                objCVarOperationsTax.TransportType = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType;
                objCVarOperationsTax.TransportIconName = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportIconName;
                objCVarOperationsTax.TransportIconStyle = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportIconStyle;
                objCVarOperationsTax.ShipmentType = objCQuotation.lstCVarQuotations[0].ShipmentType;
                objCVarOperationsTax.ShipperID = objCQuotation.lstCVarQuotations[0].ShipperID;
                objCVarOperationsTax.ShipperAddressID = objCQuotation.lstCVarQuotations[0].ShipperAddressID;
                objCVarOperationsTax.ShipperContactID = objCQuotation.lstCVarQuotations[0].ShipperContactID;
                objCVarOperationsTax.ConsigneeID = objCQuotation.lstCVarQuotations[0].ConsigneeID;
                objCVarOperationsTax.ConsigneeAddressID = objCQuotation.lstCVarQuotations[0].ConsigneeAddressID;
                objCVarOperationsTax.ConsigneeContactID = objCQuotation.lstCVarQuotations[0].ConsigneeContactID;
                objCVarOperationsTax.AgentID = objCQuotation.lstCVarQuotations[0].AgentID;
                objCVarOperationsTax.AgentAddressID = objCQuotation.lstCVarQuotations[0].AgentAddressID;
                objCVarOperationsTax.AgentContactID = objCQuotation.lstCVarQuotations[0].AgentContactID;
                //objCVarOperations.TransientTime = int.Parse(objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransientTime); //Come From QuotationRoute(put in main route not here)
                //objCVarOperations.OpenDate = DateTime.Parse(objCvwQuotationRoute.lstCVarvwQuotationRoute[0].OpenDate); //this format has problem when works on server
                objCVarOperationsTax.OpenDate = DateTime.Now;//(objCvwQuotationRoute.lstCVarvwQuotationRoute[0].OpenDate == null ? DateTime.Parse("01-01-1900") : objCvwQuotationRoute.lstCVarvwQuotationRoute[0].OpenDate);
                objCVarOperationsTax.CloseDate = DateTime.Now.AddDays(DaysBeforeClose); //DateTime.Parse("01-01-1900");
                objCVarOperationsTax.CutOffDate = DateTime.Parse("01-01-1900"); //not used 
                objCVarOperationsTax.IncludePickup = objCQuotation.lstCVarQuotations[0].IncludePickup ? true : false;
                objCVarOperationsTax.PickupCityID = objCQuotation.lstCVarQuotations[0].PickupCityID;
                objCVarOperationsTax.PickupAddressID = objCQuotation.lstCVarQuotations[0].PickupAddressID;
                objCVarOperationsTax.POLCountryID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLCountryID; //Come From QuotationRoute
                objCVarOperationsTax.POL = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POL; //Come From QuotationRoute
                objCVarOperationsTax.PODCountryID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODCountryID; //Come From QuotationRoute
                objCVarOperationsTax.POD = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POD; //Come From QuotationRoute
                objCVarOperationsTax.PickupAddress = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PickupAddress; //Come From QuotationRoute
                objCVarOperationsTax.DeliveryAddress = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DeliveryAddress; //Come From QuotationRoute
                objCVarOperationsTax.MoveTypeID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].MoveTypeID; //Come From QuotationRoute
                objCVarOperationsTax.ShippingLineID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ShippingLineID;//Come From QuotationRoute
                objCVarOperationsTax.AirlineID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].AirlineID;//Come From QuotationRoute
                objCVarOperationsTax.TruckerID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TruckerID;//Come From QuotationRoute
                objCVarOperationsTax.IncludeDelivery = (objCQuotation.lstCVarQuotations[0].IncludeDelivery ? true : false);
                objCVarOperationsTax.DeliveryZipCode = objCQuotation.lstCVarQuotations[0].DeliveryZipCode;
                objCVarOperationsTax.DeliveryCityID = objCQuotation.lstCVarQuotations[0].DeliveryCityID;
                objCVarOperationsTax.DeliveryCountryID = objCQuotation.lstCVarQuotations[0].DeliveryCountryID;
                objCVarOperationsTax.GrossWeight = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].GrossWeight;
                objCVarOperationsTax.Volume = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Volume;
                objCVarOperationsTax.VolumetricWeight = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].VolumetricWeight;
                objCVarOperationsTax.ChargeableWeight = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ChargeableWeight;
                objCVarOperationsTax.NumberOfPackages = 0; //objCvwQuotationRoute.lstCVarvwQuotationRoute[0].NumberOfPackages;
                objCVarOperationsTax.IsDangerousGoods = (objCQuotation.lstCVarQuotations[0].IsDangerousGoods ? true : false);
                objCVarOperationsTax.CustomerReference = "0";
                objCVarOperationsTax.SupplierReference = "0";
                objCVarOperationsTax.PONumber = "0";
                objCVarOperationsTax.POValue = "0";
                objCVarOperationsTax.ReleaseNumber = "0";
                objCVarOperationsTax.Notes = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Notes;
                objCVarOperationsTax.AgreedRate = "0";
                objCVarOperationsTax.OperationStageID = 60;//(int.Parse(objCvwQuotationRoute.lstCVarvwQuotationRoute[0].OperationStageID);

                objCVarOperationsTax.IsDelivered = false;
                objCVarOperationsTax.IsTrucking = false;
                objCVarOperationsTax.IsInsurance = false;
                objCVarOperationsTax.IsClearance = false;
                objCVarOperationsTax.IsGenset = false;
                objCVarOperationsTax.IsCourrier = false;
                objCVarOperationsTax.MarksAndNumbers = "0";
                objCVarOperationsTax.IsTelexRelease = false;

                objCVarOperationsTax.CreatorUserID = objCVarOperationsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperationsTax.CreationDate = objCVarOperationsTax.ModificationDate = DateTime.Now;
                #region AirAgents (Venus fields A.Medra)
                objCVarOperationsTax.BLDate = DateTime.Parse("01/01/1900");
                objCVarOperationsTax.MAWBStockID = 0;
                objCVarOperationsTax.TypeOfStockID = 0;
                objCVarOperationsTax.FlightNo = "0";
                objCVarOperationsTax.POrC = _UnEditableCompanyName == "CQL" ? 3 : objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POrC;
                objCVarOperationsTax.IsAWB = false; //objCOperationToCopy.lstCVarOperations[0].IsAWB;
                                                    //Fields not in insert
                objCVarOperationsTax.AirLineID1 = 0;
                objCVarOperationsTax.FlightNo1 = "0";
                objCVarOperationsTax.FlightDate1 = DateTime.Parse("01/01/1900");
                objCVarOperationsTax.AirLineID2 = 0;
                objCVarOperationsTax.FlightNo2 = "0";
                objCVarOperationsTax.FlightDate2 = DateTime.Parse("01/01/1900");
                objCVarOperationsTax.AirLineID3 = 0;
                objCVarOperationsTax.FlightNo3 = "0";
                objCVarOperationsTax.FlightDate3 = DateTime.Parse("01/01/1900");

                objCVarOperationsTax.UNOrID = "0";
                objCVarOperationsTax.ProperShippingName = "0";
                objCVarOperationsTax.ClassOrDivision = "0";
                objCVarOperationsTax.PackingGroup = "0";
                objCVarOperationsTax.QuantityAndTypeOfPacking = "0";
                objCVarOperationsTax.PackingInstruction = "0";
                objCVarOperationsTax.ShippingDeclarationAuthorization = "0";
                objCVarOperationsTax.Barcode = "0";

                objCVarOperationsTax.GuaranteeLetterNumber = "0";
                objCVarOperationsTax.GuaranteeLetterDate = DateTime.Parse("01/01/1900");
                objCVarOperationsTax.GuaranteeLetterAmount = "0";
                objCVarOperationsTax.GuaranteeLetterSupplierInvoiceNumber = "0";
                objCVarOperationsTax.BankAccountID = 0;
                objCVarOperationsTax.GuaranteeLetterNotes = "0";

                objCVarOperationsTax.HandlingInformation = "0";
                objCVarOperationsTax.AmountOfInsurance = "0";
                objCVarOperationsTax.DeclaredValueForCarriage = "0";
                objCVarOperationsTax.WeightCharge = 0;
                objCVarOperationsTax.ValuationCharge = 0;
                objCVarOperationsTax.OtherChargesDueAgent = 0;
                objCVarOperationsTax.OtherCharges = "0";
                objCVarOperationsTax.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                objCVarOperationsTax.AccountingInformation = "0";
                objCVarOperationsTax.ReferenceNumber = "0";
                objCVarOperationsTax.OptionalShippingInformation = "0";
                objCVarOperationsTax.CHGSCode = "0";
                objCVarOperationsTax.WT_VALL_Other = "0";
                objCVarOperationsTax.DeclaredValueForCustoms = "0";
                objCVarOperationsTax.Tax = 0;
                objCVarOperationsTax.OtherChargesDueCarrier = 0;
                objCVarOperationsTax.WT_VALL = "0";
                objCVarOperationsTax.Description = "0";
                #endregion Venus fields A.Medra

                objCVarOperationsTax.DismissalPermissionSerial = "0";
                objCVarOperationsTax.DeliveryOrderSerial = "0";

                objCVarOperationsTax.eFBLID = "0";
                objCVarOperationsTax.eFBLStatus = 0;

                objCVarOperationsTax.DispatchNumber = "0";
                objCVarOperationsTax.BusinessUnit = "0";
                objCVarOperationsTax.Form13Number = "0";
                objCVarOperationsTax.ACIDNumber = "0";
                objCVarOperations.ACIDDetails = "0";

                objCOperationsTax.lstCVarOperations.Add(objCVarOperationsTax);
                checkException = objCOperationsTax.SaveMethod(objCOperationsTax.lstCVarOperations);


                if (checkException == null) //Operation added successfully
                {
                    CSerials objCSerialsOrigin = new CSerials();
                    CSerialsTax objCSerialsTax = new CSerialsTax();

                    objCSerialsOrigin.GetList("WHERE Year=YEAR(GETDate())");
                    if (objCSerialsOrigin.lstCVarSerials.Count > 0)
                    {
                        objCSerialsTax.UpdateList("OperationSerial=" + objCSerialsOrigin.lstCVarSerials[0].OperationSerial + " WHERE Year=YEAR(GETDate())");
                    }
                    //link
                    objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCVarOperations.ID + "," + objCVarOperationsTax.ID + "," + "Operations");

                    _Result = true;

                    //Cancel Alarm

                    //COPY Partners To OperationPartners
                    #region Copy Operation Partners (at this point its just either a shipper or a consignee and maybe agent and empty notify)
                    COperationPartnersTAX objCOperationPartnersTax = new COperationPartnersTAX();
                    CContacts objCContacts = new CContacts(); //to get default contact

                    //if (createOperationFromQuotationData.pDirectionType == "1") //import (consignee)
                    //{
                    CVarOperationPartnersTAX objCVarOperationConsigneePartnerTax = new CVarOperationPartnersTAX();
                    objCVarOperationConsigneePartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                    objCVarOperationConsigneePartnerTax.OperationPartnerTypeID = 2;//consignee
                    objCVarOperationConsigneePartnerTax.CustomerID = objCQuotation.lstCVarQuotations[0].ConsigneeID;
                    objCVarOperationConsigneePartnerTax.ContactID = objCQuotation.lstCVarQuotations[0].ConsigneeContactID;
                    objCVarOperationConsigneePartnerTax.IsOperationClient = false;
                    objCVarOperationConsigneePartnerTax.CreatorUserID = objCVarOperationConsigneePartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationConsigneePartnerTax.CreationDate = objCVarOperationConsigneePartnerTax.ModificationDate = DateTime.Now;
                    objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationConsigneePartnerTax);

                    //CVarOperationPartners objCVarOperationShipperPartner = new CVarOperationPartners();
                    //objCVarOperationShipperPartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                    //objCVarOperationShipperPartner.OperationPartnerTypeID = 1;//Shipper
                    //objCVarOperationShipperPartner.CustomerID = 0; // it will be set as null in DB
                    //objCVarOperationShipperPartner.ContactID = 0;
                    //objCVarOperationShipperPartner.CreatorUserID = objCVarOperationShipperPartner.ModificatorUserID = WebSecurity.CurrentUserId;
                    //objCVarOperationShipperPartner.CreationDate = objCVarOperationShipperPartner.ModificationDate = DateTime.Now;
                    //objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationShipperPartner);

                    //}
                    //else //export or domestic (shipper)
                    //{
                    CVarOperationPartnersTAX objCVarOperationShipperPartnerTax = new CVarOperationPartnersTAX();

                    objCVarOperationShipperPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                    objCVarOperationShipperPartnerTax.OperationPartnerTypeID = 1; // export or domestic (shipper)
                    objCVarOperationShipperPartnerTax.CustomerID = objCQuotation.lstCVarQuotations[0].ShipperID;
                    objCVarOperationShipperPartnerTax.ContactID = objCQuotation.lstCVarQuotations[0].ShipperContactID;
                    objCVarOperationShipperPartnerTax.IsOperationClient = objCQuotation.lstCVarQuotations[0].IsWarehousing ? true : false;
                    objCVarOperationShipperPartnerTax.CreatorUserID = objCVarOperationShipperPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationShipperPartnerTax.CreationDate = objCVarOperationShipperPartnerTax.ModificationDate = DateTime.Now;
                    objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationShipperPartnerTax);

                    //CVarOperationPartners objCVarOperationConsigneePartner = new CVarOperationPartners();
                    //objCVarOperationConsigneePartner.OperationID = objCOperations.lstCVarOperations[0].ID;
                    //objCVarOperationConsigneePartner.OperationPartnerTypeID = 2;//consignee
                    //objCVarOperationConsigneePartner.CustomerID = 0; // it will be set as null in DB
                    //objCVarOperationConsigneePartner.ContactID = 0;
                    //objCVarOperationConsigneePartner.CreatorUserID = objCVarOperationConsigneePartner.ModificatorUserID = WebSecurity.CurrentUserId;
                    //objCVarOperationConsigneePartner.CreationDate = objCVarOperationConsigneePartner.ModificationDate = DateTime.Now;
                    //objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationConsigneePartner);
                    //}

                    CVarOperationPartnersTAX objCVarOperationNotifyPartnerTax = new CVarOperationPartnersTAX();
                    objCVarOperationNotifyPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                    objCVarOperationNotifyPartnerTax.OperationPartnerTypeID = 4;//Notify1
                    objCVarOperationNotifyPartnerTax.CustomerID = 0; // it will be set as null in DB
                    objCVarOperationNotifyPartnerTax.ContactID = 0;
                    objCVarOperationNotifyPartnerTax.IsOperationClient = false;
                    objCVarOperationNotifyPartnerTax.CreatorUserID = objCVarOperationNotifyPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationNotifyPartnerTax.CreationDate = objCVarOperationNotifyPartnerTax.ModificationDate = DateTime.Now;
                    objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationNotifyPartnerTax);

                    CVarOperationPartnersTAX objCVarOperationAgentPartnerTax = new CVarOperationPartnersTAX();
                    objCVarOperationAgentPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                    objCVarOperationAgentPartnerTax.OperationPartnerTypeID = 6; //constAgentOperationPartnerTypeID
                    objCVarOperationAgentPartnerTax.AgentID = objCQuotation.lstCVarQuotations[0].AgentID;
                    objCVarOperationAgentPartnerTax.ContactID = objCQuotation.lstCVarQuotations[0].AgentContactID;
                    objCVarOperationAgentPartnerTax.IsOperationClient = false;
                    objCVarOperationAgentPartnerTax.CreatorUserID = objCVarOperationAgentPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationAgentPartnerTax.CreationDate = objCVarOperationAgentPartnerTax.ModificationDate = DateTime.Now;
                    objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationAgentPartnerTax);

                    //Adding the line enetered in the Routings & Charges tab
                    if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ShippingLineID != 0)
                    {
                        CVarOperationPartnersTAX objCVarOperationShippingLinePartnerTax = new CVarOperationPartnersTAX();
                        objCVarOperationShippingLinePartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                        objCVarOperationShippingLinePartnerTax.OperationPartnerTypeID = 9; //constShippingLineOperationPartnerTypeID
                        objCVarOperationShippingLinePartnerTax.ShippingLineID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ShippingLineID;
                        objCContacts.GetList("WHERE PartnerTypeID=5 AND PartnerID=" + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ShippingLineID.ToString());
                        objCVarOperationShippingLinePartnerTax.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                        objCVarOperationShippingLinePartnerTax.IsOperationClient = false;
                        objCVarOperationShippingLinePartnerTax.CreatorUserID = objCVarOperationShippingLinePartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationShippingLinePartnerTax.CreationDate = objCVarOperationShippingLinePartnerTax.ModificationDate = DateTime.Now;
                        objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationShippingLinePartnerTax);
                    }
                    else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].AirlineID != 0)
                    {
                        CVarOperationPartnersTAX objCVarOperationAirlinePartnerTax = new CVarOperationPartnersTAX();
                        objCVarOperationAirlinePartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                        objCVarOperationAirlinePartnerTax.OperationPartnerTypeID = 10; //constAirlineOperationPartnerTypeID
                        objCVarOperationAirlinePartnerTax.AirlineID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].AirlineID;
                        objCContacts.GetList("WHERE PartnerTypeID=6 AND PartnerID=" + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].AirlineID.ToString());
                        objCVarOperationAirlinePartnerTax.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                        objCVarOperationAirlinePartnerTax.IsOperationClient = false;
                        objCVarOperationAirlinePartnerTax.CreatorUserID = objCVarOperationAirlinePartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationAirlinePartnerTax.CreationDate = objCVarOperationAirlinePartnerTax.ModificationDate = DateTime.Now;
                        objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationAirlinePartnerTax);
                    }
                    else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TruckerID != 0)
                    {
                        CVarOperationPartnersTAX objCVarOperationTruckerPartnerTax = new CVarOperationPartnersTAX();
                        objCVarOperationTruckerPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                        objCVarOperationTruckerPartnerTax.OperationPartnerTypeID = 11; //constTruckerOperationPartnerTypeID
                        objCVarOperationTruckerPartnerTax.TruckerID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TruckerID;
                        objCContacts.GetList("WHERE PartnerTypeID=7 AND PartnerID=" + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TruckerID.ToString());
                        objCVarOperationTruckerPartnerTax.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                        objCVarOperationTruckerPartnerTax.IsOperationClient = false;
                        objCVarOperationTruckerPartnerTax.CreatorUserID = objCVarOperationTruckerPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarOperationTruckerPartnerTax.CreationDate = objCVarOperationTruckerPartnerTax.ModificationDate = DateTime.Now;
                        objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationTruckerPartnerTax);
                    }

                    objCOperationPartnersTax.SaveMethod(objCOperationPartnersTax.lstCVarOperationPartnersTAX);

                    #endregion

                    //COPY PAYABLES
                    #region Copy Payables

                    string pWhereClauseCurrencyDetails = "";
                    CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();

                    CPayablesTAX objCPayablesTax = new CPayablesTAX(); //to copy in it the records to be inserted
                                                                       //those 2 lines are to get the charge types from QuotationCharges table from DB
                    CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
                    //objCvwQuotationCharges.GetList(" WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID);
                    int _tempRowCount = 0;
                    checkException = objCvwQuotationCharges.GetListPaging(5000, 1, " WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID, " ID ", out _tempRowCount);

                    CVarPayablesTAX objCVarPayablesTax = new CVarPayablesTAX();
                    foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                    {
                        pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.CostCurrencyID
                            + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                            + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                            + " ORDER BY CODE";
                        objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                        if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                        {
                            CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();
                            Int32 ChargeTypeID = 0;

                            objCChargeTypesTAX.GetList("WHERE Name=N'" + (rowQuotationCharge.ChargeTypeID > 0 ? rowQuotationCharge.ChargeTypeName : "") + "'");
                            ChargeTypeID = objCChargeTypesTAX.lstCVarChargeTypes.Count > 0 ? objCChargeTypesTAX.lstCVarChargeTypes[0].ID : 0;

                            objCVarPayablesTax.ID = 0;

                            objCVarPayablesTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                            objCVarPayablesTax.ChargeTypeID = ChargeTypeID;
                            objCVarPayablesTax.POrC = 0;
                            objCVarPayablesTax.SupplierOperationPartnerID = 0;

                            objCVarPayablesTax.SupplierSiteID = rowQuotationCharge.SupplierSiteID;
                            objCVarPayablesTax.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                            objCVarPayablesTax.MeasurementID = rowQuotationCharge.MeasurementID;
                            objCVarPayablesTax.Quantity = rowQuotationCharge.CostQuantity;
                            objCVarPayablesTax.CostPrice = rowQuotationCharge.CostPrice;
                            objCVarPayablesTax.CostAmount = rowQuotationCharge.CostAmount;
                            objCVarPayablesTax.QuotationCost = rowQuotationCharge.CostAmount;
                            objCVarPayablesTax.AmountWithoutVAT = rowQuotationCharge.CostAmount; //still no VAT entered so they are the same
                            if (objCvwDefaults.lstCVarvwDefaults.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName.Equals("BED"))
                            {
                                objCVarPayablesTax.CostAmount = 0;
                                objCVarPayablesTax.AmountWithoutVAT = 0;
                            }
                            objCVarPayablesTax.SupplierInvoiceNo = "0";
                            objCVarPayablesTax.SupplierReceiptNo = "0";
                            objCVarPayablesTax.EntryDate = DateTime.Now;
                            objCVarPayablesTax.BillID = 0;

                            objCVarPayablesTax.IssueDate = DateTime.Now;
                            objCVarPayablesTax.OperationContainersAndPackagesID = 0;

                            objCVarPayablesTax.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.CostExchangeRate;
                            objCVarPayablesTax.CurrencyID = rowQuotationCharge.CostCurrencyID;
                            objCVarPayablesTax.GeneratingQRID = 0;// objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID;
                            objCVarPayablesTax.Notes = rowQuotationCharge.Notes;

                            objCVarPayablesTax.CreatorUserID = objCVarPayablesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarPayablesTax.CreationDate = objCVarPayablesTax.ModificationDate = DateTime.Now;
                            objCPayablesTax.lstCVarPayables.Add(objCVarPayablesTax);
                            checkException = objCPayablesTax.SaveMethod(objCPayablesTax.lstCVarPayables);

                            #region Add Operation Partner if its not added yet and update the SupplierOperationPartnerID to the corresponding one
                            COperationPartnersTAX objCSupplierOperationPartnerTax = new COperationPartnersTAX();
                            if (rowQuotationCharge.OperationPartnerTypeID != 0) //then check if partner is already entered then set the SupplierOperationPartnerID else add the OperationPartner then set the SupplierOperationPartnerID in Payables
                            {
                                Int64 pSupplierOperationPartnerID = 0;
                                CvwOperationPartners objCvwOperationPartnersCheckExistence = new CvwOperationPartners();
                                objCvwOperationPartnersCheckExistence.GetList("WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID + " AND OperationPartnerTypeID=" + rowQuotationCharge.OperationPartnerTypeID + " AND PartnerTypeID=" + rowQuotationCharge.PartnerTypeID + " AND PartnerID=" + rowQuotationCharge.PartnerSupplierID);
                                if (objCvwOperationPartnersCheckExistence.lstCVarvwOperationPartners.Count > 0) //OperationPartner is already entered
                                {
                                    pSupplierOperationPartnerID = objCvwOperationPartnersCheckExistence.lstCVarvwOperationPartners[0].ID;
                                }
                                else //operation Partner is not added yet, so add it the take its ID to set the SupplierOperationPartnerID
                                {
                                    objCContacts.GetList("WHERE PartnerTypeID=" + rowQuotationCharge.PartnerTypeID.ToString() + " AND PartnerID=" + rowQuotationCharge.PartnerSupplierID.ToString());
                                    CVarOperationPartnersTAX objCVarSupplierOperationPartnerTax = new CVarOperationPartnersTAX();
                                    objCVarSupplierOperationPartnerTax.ID = 0;
                                    objCVarSupplierOperationPartnerTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                                    objCVarSupplierOperationPartnerTax.OperationPartnerTypeID = rowQuotationCharge.OperationPartnerTypeID;
                                    objCVarSupplierOperationPartnerTax.CustomerID = rowQuotationCharge.CustomerID;
                                    objCVarSupplierOperationPartnerTax.AgentID = rowQuotationCharge.AgentID;
                                    objCVarSupplierOperationPartnerTax.ShippingAgentID = rowQuotationCharge.ShippingAgentID;
                                    objCVarSupplierOperationPartnerTax.CustomsClearanceAgentID = rowQuotationCharge.CustomsClearanceAgentID;
                                    objCVarSupplierOperationPartnerTax.ShippingLineID = rowQuotationCharge.ShippingLineID;
                                    objCVarSupplierOperationPartnerTax.AirlineID = rowQuotationCharge.AirlineID;
                                    objCVarSupplierOperationPartnerTax.TruckerID = rowQuotationCharge.TruckerID;
                                    objCVarSupplierOperationPartnerTax.SupplierID = rowQuotationCharge.SupplierID;
                                    objCVarSupplierOperationPartnerTax.ContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);//set default contact
                                    objCVarSupplierOperationPartnerTax.CreatorUserID = objCVarSupplierOperationPartnerTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                    objCVarSupplierOperationPartnerTax.CreationDate = objCVarSupplierOperationPartnerTax.ModificationDate = DateTime.Now;
                                    objCSupplierOperationPartnerTax.lstCVarOperationPartnersTAX.Add(objCVarSupplierOperationPartnerTax);
                                    checkException = objCSupplierOperationPartnerTax.SaveMethod(objCSupplierOperationPartnerTax.lstCVarOperationPartnersTAX);
                                    pSupplierOperationPartnerID = objCVarSupplierOperationPartnerTax.ID;
                                }
                                checkException = objCPayablesTax.UpdateList("SupplierOperationPartnerID=" + pSupplierOperationPartnerID.ToString() + " WHERE ID=" + objCVarPayablesTax.ID.ToString());
                            } //if (rowQuotationCharge.OperationPartnerTypeID != 0)
                            #endregion Add Operation Partner if its not added yet and update the SupplierOperationPartnerID to the corresponding one
                        } //if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                        #region Add Containers/Packages if not added yet (from Quotation Charges)
                        if (!(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL" && objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == InlandTransportType)
                            && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI"
                            && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "SUN"
                            && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "BED")
                        {
                            COperationContainersAndPackagesTAX objCOperationContainersAndPackages_QuotChargeTax = new COperationContainersAndPackagesTAX(); //to copy in it the records to be inserted

                            if (rowQuotationCharge.ContainerTypeID != 0 || rowQuotationCharge.PackageTypeID != 0) //then check if there Exists a container/Package
                            {
                                CvwOperationContainersAndPackages objCvwOperationContainersAndPackagesCheckExistence = new CvwOperationContainersAndPackages();
                                objCvwOperationContainersAndPackagesCheckExistence.GetList("WHERE OperationID=" + objCOperations.lstCVarOperations[0].ID
                                    + (rowQuotationCharge.ContainerTypeID != 0
                                        ? (" AND ContainerTypeID=" + rowQuotationCharge.ContainerTypeID)
                                        : (" AND PackageTypeID=" + rowQuotationCharge.PackageTypeID)
                                      )
                                    );
                                //if (objCvwOperationContainersAndPackagesCheckExistence.lstCVarvwOperationContainersAndPackages.Count == 0) // Container or Package is not added so add it
                                {
                                    ////the next condition is add containers in operations a number of times equal to the quantity, // to change that just delete the if condition and keep only whats written in the else clause
                                    //if (int.Parse(createOperationFromQuotationData.pShipmentType) == 1 || int.Parse(createOperationFromQuotationData.pShipmentType) == 3) //FCL or FTL

                                    CVarOperationContainersAndPackagesTAX objCVarOperationContainersAndPackagesTax = new CVarOperationContainersAndPackagesTAX();
                                    objCVarOperationContainersAndPackagesTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                                    objCVarOperationContainersAndPackagesTax.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                                    objCVarOperationContainersAndPackagesTax.PackageTypeID = rowQuotationCharge.PackageTypeID;
                                    //the numbers of containers is always 1 because it holds packages
                                    objCVarOperationContainersAndPackagesTax.Quantity = 0; //rowQuotationCharge.CostQuantity == 0 ? 1 : decimal.ToInt32(rowQuotationCharge.CostQuantity);
                                                                                           //objCVarOperationContainersAndPackages.Length = rowQuotationCharge.Length;
                                                                                           //objCVarOperationContainersAndPackages.Width = rowQuotationCharge.Width;
                                                                                           //objCVarOperationContainersAndPackages.Height = rowQuotationCharge.Height;
                                                                                           //objCVarOperationContainersAndPackages.Volume = rowQuotationCharge.Volume;
                                                                                           //objCVarOperationContainersAndPackages.VolumetricWeight = rowQuotationCharge.VolumetricWeight;
                                                                                           //objCVarOperationContainersAndPackages.NetWeight = rowQuotationCharge.NetWeight;
                                                                                           //objCVarOperationContainersAndPackages.GrossWeight = rowQuotationCharge.GrossWeight;
                                                                                           //objCVarOperationContainersAndPackages.ChargeableWeight = rowQuotationCharge.ChargeableWeight;
                                    objCVarOperationContainersAndPackagesTax.ContainerNumber = "0";
                                    objCVarOperationContainersAndPackagesTax.CarrierSeal = "0";
                                    objCVarOperationContainersAndPackagesTax.ShipperSeal = "0";
                                    objCVarOperationContainersAndPackagesTax.MarksAndNumbers = "0";
                                    objCVarOperationContainersAndPackagesTax.DescriptionOfGoods = "0";

                                    objCVarOperationContainersAndPackagesTax.LotNumber = "0";
                                    objCVarOperationContainersAndPackagesTax.GateOutDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackagesTax.StuffingDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackagesTax.LoadingDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackagesTax.Factory = "0";
                                    objCVarOperationContainersAndPackagesTax.ExportBLNumber = "0";
                                    objCVarOperationContainersAndPackagesTax.ImportBLNumber = "0";
                                    objCVarOperationContainersAndPackagesTax.IsAsAgreed = false;
                                    objCVarOperationContainersAndPackagesTax.IsMinimum = false;
                                    objCVarOperationContainersAndPackagesTax.IsOwnedByCompany = false;
                                    objCVarOperationContainersAndPackagesTax.SupplierDriverName = "0";
                                    objCVarOperationContainersAndPackagesTax.SupplierDriverAssistantName = "0";
                                    objCVarOperationContainersAndPackagesTax.SupplierTrailerName = "0";
                                    objCVarOperationContainersAndPackagesTax.TankOrFlexiNumber = "0";
                                    objCVarOperationContainersAndPackagesTax.WeightUnit = "0";
                                    objCVarOperationContainersAndPackagesTax.RateClass = "0";
                                    objCVarOperationContainersAndPackagesTax.IsFull = false;
                                    objCVarOperationContainersAndPackagesTax.ExitDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackagesTax.ReturnDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackagesTax.YardInDate = DateTime.Parse("01/01/1900");
                                    objCVarOperationContainersAndPackagesTax.YardOutDate = DateTime.Parse("01/01/1900");

                                    objCVarOperationContainersAndPackagesTax.CreatorUserID = objCVarOperationContainersAndPackagesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                    objCVarOperationContainersAndPackagesTax.CreationDate = objCVarOperationContainersAndPackagesTax.ModificationDate = DateTime.Now;

                                    objCOperationContainersAndPackages_QuotChargeTax.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackagesTax);

                                    checkException = objCOperationContainersAndPackages_QuotChargeTax.SaveMethod(objCOperationContainersAndPackages_QuotChargeTax.lstCVarOperationContainersAndPackages);
                                    //link
                                    // objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + OperationContainersAndPackagesID + "," + objCOperationContainersAndPackages_QuotChargeTax.lstCVarOperationContainersAndPackages[0].ID + "," + "OperationContainersAndPackages");

                                }
                            }
                        } //EOF if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "ELI")
                        #endregion Add Operation Containers/Packages if not added yet (from Quotation Charges)

                    } //foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)

                    #endregion

                    //COPY ReceivableS
                    #region Copy Receivables
                    CReceivablesTax objCReceivablesTax = new CReceivablesTax(); //to copy in it the records to be inserted
                    foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                    {
                        CvwChargeTypes objCvwChargeTypes_Tmp = new CvwChargeTypes();
                        checkException = objCvwChargeTypes_Tmp.GetListPaging(1, 1, "WHERE ID=" + rowQuotationCharge.ChargeTypeID, "ID", out _RowCount);
                        pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.SaleCurrencyID
                            + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                            + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                            + " ORDER BY CODE";

                        CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();
                        Int32 ChargeTypeID = 0;

                        objCChargeTypesTAX.GetList("WHERE Name=N'" + (objCvwChargeTypes_Tmp.lstCVarvwChargeTypes.Count > 0 ? objCvwChargeTypes_Tmp.lstCVarvwChargeTypes[0].Name : "") + "'");
                        ChargeTypeID = objCChargeTypesTAX.lstCVarChargeTypes.Count > 0 ? objCChargeTypesTAX.lstCVarChargeTypes[0].ID : 0;


                        objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                        if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                        {

                            CVarReceivablesTAX objCVarReceivablesTax = new CVarReceivablesTAX();

                            objCVarReceivablesTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                            objCVarReceivablesTax.ChargeTypeID = ChargeTypeID;
                            objCVarReceivablesTax.POrC = 0;
                            objCVarReceivablesTax.SupplierID = 0;
                            objCVarReceivablesTax.MeasurementID = rowQuotationCharge.MeasurementID;
                            objCVarReceivablesTax.ContainerTypeID = rowQuotationCharge.ContainerTypeID;
                            objCVarReceivablesTax.PackageTypeID = rowQuotationCharge.PackageTypeID;
                            objCVarReceivablesTax.Quantity = rowQuotationCharge.CostQuantity == 0 ? 1 : rowQuotationCharge.CostQuantity; //if SaleQuantity is activated then change to it
                                                                                                                                         //objCVarReceivables.CostPrice = rowQuotationCharge.CostPrice;
                                                                                                                                         //objCVarReceivables.CostAmount = rowQuotationCharge.CostAmount;
                            objCVarReceivablesTax.SalePrice = rowQuotationCharge.SalePrice;
                            objCVarReceivablesTax.AmountWithoutVAT = Math.Round((objCVarReceivablesTax.Quantity * objCVarReceivablesTax.SalePrice), 2);
                            #region Set Tax if set in ChargeTypes
                            if (objCvwDefaults.lstCVarvwDefaults[0].IsTaxOnItems && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "GBL")
                            {
                                objCVarReceivablesTax.TaxeTypeID = objCvwChargeTypes_Tmp.lstCVarvwChargeTypes[0].TaxeTypeID;
                                objCVarReceivablesTax.TaxPercentage = objCvwChargeTypes_Tmp.lstCVarvwChargeTypes[0].TaxPercentage;
                                objCVarReceivablesTax.TaxAmount = Math.Round((objCVarReceivablesTax.AmountWithoutVAT * objCVarReceivablesTax.TaxPercentage / 100), 2);
                            }
                            else
                            {
                                objCVarReceivablesTax.TaxeTypeID = 0;
                                objCVarReceivablesTax.TaxPercentage = 0;
                                objCVarReceivablesTax.TaxAmount = 0;
                            }
                            #endregion Set Tax if set in ChargeTypes
                            objCVarReceivablesTax.SaleAmount = objCVarReceivablesTax.AmountWithoutVAT + objCVarReceivablesTax.TaxAmount;
                            objCVarReceivablesTax.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate; //rowQuotationCharge.SaleExchangeRate;
                            objCVarReceivablesTax.CurrencyID = rowQuotationCharge.SaleCurrencyID;
                            objCVarReceivablesTax.GeneratingQRID = 0;// objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID;
                            objCVarReceivablesTax.Notes = rowQuotationCharge.Notes;

                            objCVarReceivablesTax.IssueDate = DateTime.Now;
                            objCVarReceivablesTax.OperationContainersAndPackagesID = 0;

                            objCVarReceivablesTax.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                            objCVarReceivablesTax.CutOffDate = DateTime.Parse("01/01/1900");

                            objCVarReceivablesTax.CreatorUserID = objCVarReceivablesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarReceivablesTax.CreationDate = objCVarReceivablesTax.ModificationDate = DateTime.Now;

                            objCReceivablesTax.lstCVarReceivables.Add(objCVarReceivablesTax);
                            objCReceivablesTax.SaveMethod(objCReceivablesTax.lstCVarReceivables);
                        }
                    } //foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                    #endregion

                    ////COPY CONTAINERS AND PACKAGES
                    #region Copy Containers And Packages
                    //those 2 lines are to get the ContainersAndPackages Data from QuotationContainersAndPAckages table from DB
                    CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
                    if (!(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "GBL" && objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == InlandTransportType))
                        objCQuotationContainersAndPackages.GetList(" WHERE QuotationRouteID = " + pParameterObject.pQuotationRouteID);

                    foreach (var rowQuotationContainersAndPackages in objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages)
                    {
                        for (int z = 0; z < rowQuotationContainersAndPackages.Quantity; z++)
                        {
                            COperationContainersAndPackagesTAX objCOperationContainersAndPackagesTax = new COperationContainersAndPackagesTAX(); //to copy in it the records to be inserted

                            CVarOperationContainersAndPackagesTAX objCVarOperationContainersAndPackagesTax = new CVarOperationContainersAndPackagesTAX();

                            objCVarOperationContainersAndPackagesTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                            objCVarOperationContainersAndPackagesTax.ContainerTypeID = rowQuotationContainersAndPackages.ContainerTypeID;
                            objCVarOperationContainersAndPackagesTax.PackageTypeID = rowQuotationContainersAndPackages.PackageTypeID;
                            //the numbers of containers is always 1 because it holds packages
                            objCVarOperationContainersAndPackagesTax.Quantity = 1;
                            objCVarOperationContainersAndPackagesTax.Length = rowQuotationContainersAndPackages.Length;
                            objCVarOperationContainersAndPackagesTax.Width = rowQuotationContainersAndPackages.Width;
                            objCVarOperationContainersAndPackagesTax.Height = rowQuotationContainersAndPackages.Height;
                            objCVarOperationContainersAndPackagesTax.Volume = rowQuotationContainersAndPackages.Volume;
                            objCVarOperationContainersAndPackagesTax.VolumetricWeight = rowQuotationContainersAndPackages.VolumetricWeight;
                            objCVarOperationContainersAndPackagesTax.NetWeight = rowQuotationContainersAndPackages.NetWeight;
                            objCVarOperationContainersAndPackagesTax.GrossWeight = rowQuotationContainersAndPackages.GrossWeight;
                            objCVarOperationContainersAndPackagesTax.ChargeableWeight = rowQuotationContainersAndPackages.ChargeableWeight;
                            objCVarOperationContainersAndPackagesTax.ContainerNumber = "0";
                            objCVarOperationContainersAndPackagesTax.CarrierSeal = "0";
                            objCVarOperationContainersAndPackagesTax.ShipperSeal = "0";
                            objCVarOperationContainersAndPackagesTax.MarksAndNumbers = "0";
                            objCVarOperationContainersAndPackagesTax.DescriptionOfGoods = "0";

                            objCVarOperationContainersAndPackagesTax.LotNumber = "0";
                            objCVarOperationContainersAndPackagesTax.GateOutDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackagesTax.StuffingDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackagesTax.LoadingDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackagesTax.Factory = "0";
                            objCVarOperationContainersAndPackagesTax.ExportBLNumber = "0";
                            objCVarOperationContainersAndPackagesTax.ImportBLNumber = "0";
                            objCVarOperationContainersAndPackagesTax.IsAsAgreed = false;
                            objCVarOperationContainersAndPackagesTax.IsMinimum = false;
                            objCVarOperationContainersAndPackagesTax.IsOwnedByCompany = false;
                            objCVarOperationContainersAndPackagesTax.SupplierDriverName = "0";
                            objCVarOperationContainersAndPackagesTax.SupplierDriverAssistantName = "0";
                            objCVarOperationContainersAndPackagesTax.SupplierTrailerName = "0";
                            objCVarOperationContainersAndPackagesTax.TankOrFlexiNumber = "0";
                            objCVarOperationContainersAndPackagesTax.WeightUnit = "0";
                            objCVarOperationContainersAndPackagesTax.RateClass = "0";
                            objCVarOperationContainersAndPackagesTax.IsFull = false;
                            objCVarOperationContainersAndPackagesTax.ExitDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackagesTax.ReturnDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackagesTax.YardInDate = DateTime.Parse("01/01/1900");
                            objCVarOperationContainersAndPackagesTax.YardOutDate = DateTime.Parse("01/01/1900");

                            objCVarOperationContainersAndPackagesTax.CreatorUserID = objCVarOperationContainersAndPackagesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationContainersAndPackagesTax.CreationDate = objCVarOperationContainersAndPackagesTax.ModificationDate = DateTime.Now;

                            objCOperationContainersAndPackagesTax.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackagesTax);
                            objCOperationContainersAndPackagesTax.SaveMethod(objCOperationContainersAndPackagesTax.lstCVarOperationContainersAndPackages);

                        } //for (int z = 0; z < rowQuotationContainersAndPackages.Quantity; z++)
                    } //foreach (var rowQuotationContainersAndPackages in objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages)

                    #endregion

                    //COPY Routings To Routings
                    //MainCarraige has ID = 30
                    #region Copy Operation Routings (Main Carraige)
                    CRoutingsTAX objCRoutingsTax = new CRoutingsTAX();
                    #region Add MainCarraigeRoutingType

                    CVarRoutingsTAX objCVarMainCarraigeRoutingsTax = new CVarRoutingsTAX();

                    objCVarMainCarraigeRoutingsTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                    objCVarMainCarraigeRoutingsTax.TransportType = objCOperations.lstCVarOperations[0].TransportType;
                    objCVarMainCarraigeRoutingsTax.TransportIconName = objCOperations.lstCVarOperations[0].TransportIconName;
                    objCVarMainCarraigeRoutingsTax.TransportIconStyle = objCOperations.lstCVarOperations[0].TransportIconStyle;
                    objCVarMainCarraigeRoutingsTax.RoutingTypeID = MainCarraigeRoutingTypeID; //Main Carraige
                    objCVarMainCarraigeRoutingsTax.POLCountryID = objCOperations.lstCVarOperations[0].POLCountryID;
                    objCVarMainCarraigeRoutingsTax.POL = objCOperations.lstCVarOperations[0].POL;
                    objCVarMainCarraigeRoutingsTax.PODCountryID = objCOperations.lstCVarOperations[0].PODCountryID;
                    objCVarMainCarraigeRoutingsTax.POD = objCOperations.lstCVarOperations[0].POD;
                    objCVarMainCarraigeRoutingsTax.ETAPOLDate = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutingsTax.ATAPOLDate = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutingsTax.ExpectedDeparture = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutingsTax.ActualDeparture = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutingsTax.ExpectedArrival = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutingsTax.ActualArrival = DateTime.Parse("01-01-1900");
                    objCVarMainCarraigeRoutingsTax.VoyageOrTruckNumber = "0";
                    objCVarMainCarraigeRoutingsTax.TransientTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransientTime;
                    objCVarMainCarraigeRoutingsTax.Validity = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Validity;
                    objCVarMainCarraigeRoutingsTax.FreeTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].FreeTime;
                    objCVarMainCarraigeRoutingsTax.Notes = "0";
                    if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 1)
                    {//Ocean
                        objCVarMainCarraigeRoutingsTax.ShippingLineID = objCOperations.lstCVarOperations[0].ShippingLineID;
                        objCVarMainCarraigeRoutingsTax.AirlineID = 0;
                        objCVarMainCarraigeRoutingsTax.TruckerID = 0;
                    }
                    else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 2)
                    {//Air
                        objCVarMainCarraigeRoutingsTax.ShippingLineID = 0;
                        objCVarMainCarraigeRoutingsTax.AirlineID = objCOperations.lstCVarOperations[0].AirlineID;
                        objCVarMainCarraigeRoutingsTax.TruckerID = 0;
                    }
                    else
                    {//Inland , TransportType = 3
                        objCVarMainCarraigeRoutingsTax.ShippingLineID = 0;
                        objCVarMainCarraigeRoutingsTax.AirlineID = 0;
                        objCVarMainCarraigeRoutingsTax.TruckerID = objCOperations.lstCVarOperations[0].TruckerID;
                    }

                    objCVarMainCarraigeRoutingsTax.GensetSupplierID = 0; //pGensetSupplierID;
                    objCVarMainCarraigeRoutingsTax.CCAID = 0; //pCCAID;
                    objCVarMainCarraigeRoutingsTax.Quantity = "0"; //pQuantity;
                    objCVarMainCarraigeRoutingsTax.ContactPerson = "0";
                    objCVarMainCarraigeRoutingsTax.PickupAddress = "0";
                    objCVarMainCarraigeRoutingsTax.DeliveryAddress = "0";
                    objCVarMainCarraigeRoutingsTax.GateInPortID = 0;
                    objCVarMainCarraigeRoutingsTax.GateOutPortID = 0;
                    objCVarMainCarraigeRoutingsTax.GateInDate = DateTime.Parse("01/01/1900");

                    #region TransportOrder
                    objCVarMainCarraigeRoutingsTax.CustomerID = 0;
                    objCVarMainCarraigeRoutingsTax.SubContractedCustomerID = 0;
                    objCVarMainCarraigeRoutingsTax.Cost = 0;
                    objCVarMainCarraigeRoutingsTax.Sale = 0;
                    objCVarMainCarraigeRoutingsTax.IsFleet = false;
                    objCVarMainCarraigeRoutingsTax.CommodityID = 0;
                    objCVarMainCarraigeRoutingsTax.LoadingDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.LoadingReference = "0";
                    objCVarMainCarraigeRoutingsTax.UnloadingDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.UnloadingReference = "0";
                    objCVarMainCarraigeRoutingsTax.UnloadingTime = "0";
                    #endregion TransportOrder

                    objCVarMainCarraigeRoutingsTax.GateOutDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.StuffingDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.DeliveryDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.BookingNumber = "0";
                    objCVarMainCarraigeRoutingsTax.Delays = "0";
                    objCVarMainCarraigeRoutingsTax.DriverName = "0";
                    objCVarMainCarraigeRoutingsTax.DriverPhones = "0";
                    objCVarMainCarraigeRoutingsTax.PowerFromGateInTillActualSailing = "0";
                    objCVarMainCarraigeRoutingsTax.ContactPersonPhones = "0";
                    objCVarMainCarraigeRoutingsTax.LoadingTime = "0";

                    #region CustomsClearance
                    objCVarMainCarraigeRoutingsTax.CCAFreight = 0;
                    objCVarMainCarraigeRoutingsTax.CCAFOB = 0;
                    objCVarMainCarraigeRoutingsTax.CCACFValue = 0;
                    objCVarMainCarraigeRoutingsTax.CCAInvoiceNumber = "0";

                    objCVarMainCarraigeRoutingsTax.CCAInsurance = "0";
                    objCVarMainCarraigeRoutingsTax.CCADischargeValue = "0";
                    objCVarMainCarraigeRoutingsTax.CCAAcceptedValue = "0";
                    objCVarMainCarraigeRoutingsTax.CCAImportValue = "0";
                    objCVarMainCarraigeRoutingsTax.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.CCAExchangeRate = "0";
                    objCVarMainCarraigeRoutingsTax.CCAVATCertificateNumber = "0";
                    objCVarMainCarraigeRoutingsTax.CCAVATCertificateValue = "0";
                    objCVarMainCarraigeRoutingsTax.CCACommercialProfitCertificateNumber = "0";
                    objCVarMainCarraigeRoutingsTax.CCAOthers = "0";
                    objCVarMainCarraigeRoutingsTax.CCASpendDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.OffloadingDate = DateTime.Parse("01/01/1900");

                    objCVarMainCarraigeRoutingsTax.CertificateNumber = "0";
                    objCVarMainCarraigeRoutingsTax.CertificateValue = "0";
                    objCVarMainCarraigeRoutingsTax.CertificateDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.QasimaNumber = "0";
                    objCVarMainCarraigeRoutingsTax.QasimaDate = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.SalesDateReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.CommerceDateReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.InspectionDateReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.FinishDateReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.SalesDateDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.FinishDateDelivered = DateTime.Parse("01/01/1900");


                    objCVarMainCarraigeRoutingsTax.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.CCDropBackReceived = DateTime.Parse("01/01/1900");
                    objCVarMainCarraigeRoutingsTax.CC_ClearanceTypeID = 0;
                    objCVarMainCarraigeRoutingsTax.CCReleaseNo = "0";



                    #endregion CustomsClearance

                    objCVarMainCarraigeRoutingsTax.BillNumber = "0";
                    objCVarMainCarraigeRoutingsTax.TruckingOrderCode = "0";

                    objCVarMainCarraigeRoutingsTax.RoadNumber = "0";
                    objCVarMainCarraigeRoutingsTax.DeliveryOrderNumber = "0";
                    objCVarMainCarraigeRoutingsTax.WareHouse = "0";
                    objCVarMainCarraigeRoutingsTax.WareHouseLocation = "0";

                    objCVarMainCarraigeRoutingsTax.CreatorUserID = objCVarMainCarraigeRoutingsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarMainCarraigeRoutingsTax.ModificationDate = objCVarMainCarraigeRoutingsTax.CreationDate = DateTime.Now;

                    objCRoutingsTax.lstCVarRoutings.Add(objCVarMainCarraigeRoutingsTax);
                    //objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);

                    #endregion Add MainCarraigeRoutingType

                    #region Add TruckingOrders
                    //TODO: Add Trucking Orders equal to number sent
                    for (int k = 0; k < pParameterObject.pNumberOfTruckingOrders; k++)
                    {
                        CVarRoutingsTAX objCVarTruckingOrderRoutingsTax = new CVarRoutingsTAX();

                        objCVarTruckingOrderRoutingsTax.OperationID = objCOperationsTax.lstCVarOperations[0].ID;
                        objCVarTruckingOrderRoutingsTax.TransportType = objCOperations.lstCVarOperations[0].TransportType;
                        objCVarTruckingOrderRoutingsTax.TransportIconName = InlandIconName;
                        objCVarTruckingOrderRoutingsTax.TransportIconStyle = InlandIconStyleClassName;
                        objCVarTruckingOrderRoutingsTax.RoutingTypeID = TruckingOrderRoutingTypeID; //TruckingOrder
                        objCVarTruckingOrderRoutingsTax.POLCountryID = objCOperations.lstCVarOperations[0].POLCountryID;
                        objCVarTruckingOrderRoutingsTax.POL = objCOperations.lstCVarOperations[0].POL;
                        objCVarTruckingOrderRoutingsTax.PODCountryID = objCOperations.lstCVarOperations[0].PODCountryID;
                        objCVarTruckingOrderRoutingsTax.POD = objCOperations.lstCVarOperations[0].POD;
                        objCVarTruckingOrderRoutingsTax.ETAPOLDate = DateTime.Parse("01-01-1900");
                        objCVarTruckingOrderRoutingsTax.ATAPOLDate = DateTime.Parse("01-01-1900");
                        objCVarTruckingOrderRoutingsTax.ExpectedDeparture = DateTime.Parse("01-01-1900");
                        objCVarTruckingOrderRoutingsTax.ActualDeparture = DateTime.Parse("01-01-1900");
                        objCVarTruckingOrderRoutingsTax.ExpectedArrival = DateTime.Parse("01-01-1900");
                        objCVarTruckingOrderRoutingsTax.ActualArrival = DateTime.Parse("01-01-1900");
                        objCVarTruckingOrderRoutingsTax.VoyageOrTruckNumber = "0";
                        objCVarTruckingOrderRoutingsTax.TransientTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransientTime;
                        objCVarTruckingOrderRoutingsTax.Validity = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Validity;
                        objCVarTruckingOrderRoutingsTax.FreeTime = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].FreeTime;
                        objCVarTruckingOrderRoutingsTax.Notes = "0";
                        objCVarTruckingOrderRoutingsTax.IsOwnedByCompany = pParameterObject.pIsOwnedByCompany;
                        if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 1)
                        {//Ocean
                            objCVarTruckingOrderRoutingsTax.ShippingLineID = objCOperations.lstCVarOperations[0].ShippingLineID;
                            objCVarTruckingOrderRoutingsTax.AirlineID = 0;
                            objCVarTruckingOrderRoutingsTax.TruckerID = 0;
                        }
                        else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 2)
                        {//Air
                            objCVarTruckingOrderRoutingsTax.ShippingLineID = 0;
                            objCVarTruckingOrderRoutingsTax.AirlineID = objCOperations.lstCVarOperations[0].AirlineID;
                            objCVarTruckingOrderRoutingsTax.TruckerID = 0;
                        }
                        else
                        {//Inland , TransportType = 3
                            objCVarTruckingOrderRoutingsTax.ShippingLineID = 0;
                            objCVarTruckingOrderRoutingsTax.AirlineID = 0;
                            objCVarTruckingOrderRoutingsTax.TruckerID = objCOperations.lstCVarOperations[0].TruckerID;
                        }

                        objCVarTruckingOrderRoutingsTax.GensetSupplierID = 0; //pGensetSupplierID;
                        objCVarTruckingOrderRoutingsTax.CCAID = 0; //pCCAID;
                        objCVarTruckingOrderRoutingsTax.Quantity = "0"; //pQuantity;
                        objCVarTruckingOrderRoutingsTax.ContactPerson = "0";
                        objCVarTruckingOrderRoutingsTax.PickupAddress = "0";
                        objCVarTruckingOrderRoutingsTax.DeliveryAddress = "0";
                        objCVarTruckingOrderRoutingsTax.GateInPortID = 0;
                        objCVarTruckingOrderRoutingsTax.GateOutPortID = 0;
                        objCVarTruckingOrderRoutingsTax.GateInDate = DateTime.Parse("01/01/1900");

                        #region TransportOrder
                        objCVarTruckingOrderRoutingsTax.CustomerID = 0;
                        objCVarTruckingOrderRoutingsTax.SubContractedCustomerID = 0;
                        objCVarTruckingOrderRoutingsTax.Cost = 0;
                        objCVarTruckingOrderRoutingsTax.Sale = 0;
                        objCVarTruckingOrderRoutingsTax.IsFleet = false;
                        objCVarTruckingOrderRoutingsTax.CommodityID = 0;
                        objCVarTruckingOrderRoutingsTax.LoadingDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.LoadingReference = "0";
                        objCVarTruckingOrderRoutingsTax.UnloadingDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.UnloadingReference = "0";
                        objCVarTruckingOrderRoutingsTax.UnloadingTime = "0";
                        #endregion TransportOrder

                        objCVarTruckingOrderRoutingsTax.GateOutDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.StuffingDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.DeliveryDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.BookingNumber = "0";
                        objCVarTruckingOrderRoutingsTax.Delays = "0";
                        objCVarTruckingOrderRoutingsTax.DriverName = "0";
                        objCVarTruckingOrderRoutingsTax.DriverPhones = "0";
                        objCVarTruckingOrderRoutingsTax.PowerFromGateInTillActualSailing = "0";
                        objCVarTruckingOrderRoutingsTax.ContactPersonPhones = "0";
                        objCVarTruckingOrderRoutingsTax.LoadingTime = "0";

                        #region CustomsClearance
                        objCVarTruckingOrderRoutingsTax.CCAFreight = 0;
                        objCVarTruckingOrderRoutingsTax.CCAFOB = 0;
                        objCVarTruckingOrderRoutingsTax.CCACFValue = 0;
                        objCVarTruckingOrderRoutingsTax.CCAInvoiceNumber = "0";

                        objCVarTruckingOrderRoutingsTax.CCAInsurance = "0";
                        objCVarTruckingOrderRoutingsTax.CCADischargeValue = "0";
                        objCVarTruckingOrderRoutingsTax.CCAAcceptedValue = "0";
                        objCVarTruckingOrderRoutingsTax.CCAImportValue = "0";
                        objCVarTruckingOrderRoutingsTax.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.CCAExchangeRate = "0";
                        objCVarTruckingOrderRoutingsTax.CCAVATCertificateNumber = "0";
                        objCVarTruckingOrderRoutingsTax.CCAVATCertificateValue = "0";
                        objCVarTruckingOrderRoutingsTax.CCACommercialProfitCertificateNumber = "0";
                        objCVarTruckingOrderRoutingsTax.CCAOthers = "0";
                        objCVarTruckingOrderRoutingsTax.CCASpendDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.OffloadingDate = DateTime.Parse("01/01/1900");

                        objCVarTruckingOrderRoutingsTax.CertificateNumber = "0";
                        objCVarTruckingOrderRoutingsTax.CertificateValue = "0";
                        objCVarTruckingOrderRoutingsTax.CertificateDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.QasimaNumber = "0";
                        objCVarTruckingOrderRoutingsTax.QasimaDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.SalesDateReceived = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.CommerceDateReceived = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.InspectionDateReceived = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.FinishDateReceived = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.SalesDateDelivered = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.FinishDateDelivered = DateTime.Parse("01/01/1900");


                        objCVarTruckingOrderRoutingsTax.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.CCDropBackReceived = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderRoutingsTax.CC_ClearanceTypeID = 0;
                        objCVarTruckingOrderRoutingsTax.CCReleaseNo = "0";

                        #endregion CustomsClearance

                        objCVarTruckingOrderRoutingsTax.BillNumber = "0";
                        objCVarTruckingOrderRoutingsTax.TruckingOrderCode = "0";

                        objCVarTruckingOrderRoutingsTax.RoadNumber = "0";
                        objCVarTruckingOrderRoutingsTax.DeliveryOrderNumber = "0";
                        objCVarTruckingOrderRoutingsTax.WareHouse = "0";
                        objCVarTruckingOrderRoutingsTax.WareHouseLocation = "0";

                        objCVarTruckingOrderRoutingsTax.CreatorUserID = objCVarTruckingOrderRoutingsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarTruckingOrderRoutingsTax.ModificationDate = objCVarTruckingOrderRoutingsTax.CreationDate = DateTime.Now;

                        objCRoutingsTax.lstCVarRoutings.Add(objCVarTruckingOrderRoutingsTax);
                    }
                    #endregion Add TruckingOrders

                    objCRoutingsTax.SaveMethod(objCRoutingsTax.lstCVarRoutings);

                    string pWhereClause = "";
                    //CDefaults objCDefaults = new CDefaults();

                    CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
                    checkException = objCvwChargeTypes.GetListPaging(999999, 1, pWhereClause, "Name", out _RowCount);

                    CPayablesTAX objCPayablesTruckingTax = new CPayablesTAX();

                    for (int l = 0; l < objCRoutingsTax.lstCVarRoutings.Count; l++)
                    {
                        if (objCRoutingsTax.lstCVarRoutings[l].RoutingTypeID == 60 && objCDefaults.lstCVarDefaults[0].IsAddChargeAuto
                            && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "GBL")
                        {
                            for (int k = 0; k < objCvwChargeTypes.lstCVarvwChargeTypes.Count; k++)
                            {
                                //string pWhereClauseCurrencyDetails = "";
                                //CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                                CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();
                                Int32 ChargeTypeID = 0;

                                objCChargeTypesTAX.GetList("WHERE Name=N'" + (objCvwChargeTypes.lstCVarvwChargeTypes.Count > 0 ? objCvwChargeTypes.lstCVarvwChargeTypes[k].Name : "") + "'");
                                ChargeTypeID = objCChargeTypesTAX.lstCVarChargeTypes.Count > 0 ? objCChargeTypesTAX.lstCVarChargeTypes[0].ID : 0;


                                CVarPayablesTAX objCVarPayablesTruckingTax = new CVarPayablesTAX();

                                objCVarPayablesTruckingTax.ID = 0;

                                objCVarPayablesTruckingTax.OperationID = objCRoutingsTax.lstCVarRoutings[l].OperationID;
                                objCVarPayablesTruckingTax.ChargeTypeID = ChargeTypeID;
                                objCVarPayablesTruckingTax.POrC = 0;
                                objCVarPayablesTruckingTax.SupplierOperationPartnerID = 0;

                                objCVarPayablesTruckingTax.SupplierSiteID = 0;
                                objCVarPayablesTruckingTax.ContainerTypeID = 0;
                                objCVarPayablesTruckingTax.MeasurementID = 0;
                                objCVarPayablesTruckingTax.Quantity = 1;
                                objCVarPayablesTruckingTax.CostPrice = 0;
                                objCVarPayablesTruckingTax.CostAmount = 0;
                                objCVarPayablesTruckingTax.QuotationCost = 0;
                                objCVarPayablesTruckingTax.AmountWithoutVAT = 0; //still no VAT entered so they are the same
                                objCVarPayablesTruckingTax.SupplierInvoiceNo = "0";
                                objCVarPayablesTruckingTax.SupplierReceiptNo = "0";
                                objCVarPayablesTruckingTax.EntryDate = DateTime.Now;
                                objCVarPayablesTruckingTax.BillID = 0;
                                objCVarPayablesTruckingTax.TruckingOrderID = objCRoutingsTax.lstCVarRoutings[l].ID;
                                objCVarPayablesTruckingTax.IssueDate = DateTime.Now;
                                objCVarPayablesTruckingTax.OperationContainersAndPackagesID = 0;

                                objCVarPayablesTruckingTax.ExchangeRate = 1; //rowQuotationCharge.CostExchangeRate;
                                objCVarPayablesTruckingTax.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                                objCVarPayablesTruckingTax.GeneratingQRID = 0;
                                objCVarPayablesTruckingTax.Notes = "";

                                objCVarPayablesTruckingTax.CreatorUserID = objCVarPayablesTruckingTax.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarPayablesTruckingTax.CreationDate = objCVarPayablesTruckingTax.ModificationDate = DateTime.Now;
                                objCPayablesTruckingTax.lstCVarPayables.Add(objCVarPayablesTruckingTax);

                            }
                        }
                    }
                    checkException = objCPayablesTruckingTax.SaveMethod(objCPayablesTruckingTax.lstCVarPayables);
                    #endregion

                    COperationPartners objCOperationPartnersOrigin = new COperationPartners();
                    objCOperationPartnersOrigin.GetList(" WHERE OperationID = " + objCVarOperations.ID + "order by id");
                    COperationPartnersTAX objCOperationPartnersForTax = new COperationPartnersTAX();
                    objCOperationPartnersForTax.GetList(" WHERE OperationID = " + objCVarOperationsTax.ID + "order by id");


                    for (int i = 0; i < objCOperationPartnersOrigin.lstCVarOperationPartners.Count; i++)
                    {
                        for (int j = 0; j < objCOperationPartnersForTax.lstCVarOperationPartnersTAX.Count; j++)
                        {
                            if (i == j)
                            {
                                objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCOperationPartnersOrigin.lstCVarOperationPartners[j].ID + "," + (objCOperationPartnersForTax.lstCVarOperationPartnersTAX[i].ID) + "," + "OperationPartners");

                            }
                            //link

                        }
                    }
                    CReceivables objCReceivables2 = new CReceivables();
                    objCReceivables2.GetList(" WHERE OperationID = " + objCVarOperations.ID + " order by id");
                    CReceivablesTax objCReceivablesTax2 = new CReceivablesTax();
                    objCReceivablesTax2.GetList(" WHERE OperationID = " + objCVarOperationsTax.ID + " order by id");


                    for (int i = 0; i < objCReceivables2.lstCVarReceivables.Count; i++)
                    {
                        for (int j = 0; j < objCReceivablesTax2.lstCVarReceivables.Count; j++)
                        {
                            if (i == j)
                            {
                                objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCReceivables2.lstCVarReceivables[j].ID + "," + (objCReceivablesTax2.lstCVarReceivables[i].ID) + "," + "Receivables");

                            }
                            //link

                        }
                    }

                    CPayables objCPayables2 = new CPayables();
                    objCPayables2.GetList(" WHERE OperationID = " + objCVarOperations.ID + " order by id");
                    CPayablesTAX objCPayablesTAX2 = new CPayablesTAX();
                    objCPayablesTAX2.GetList(" WHERE OperationID = " + objCVarOperationsTax.ID + " order by id");


                    for (int i = 0; i < objCPayables2.lstCVarPayables.Count; i++)
                    {
                        for (int j = 0; j < objCPayablesTAX2.lstCVarPayables.Count; j++)
                        {
                            if (i == j)
                            {
                                objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCPayables2.lstCVarPayables[j].ID + "," + (objCPayablesTAX2.lstCVarPayables[i].ID) + "," + "Payables");

                            }
                            //link

                        }
                    }
                }

            }
            #endregion

            return new Object[] {
                _Result
                , _Result ? objCOperations.lstCVarOperations[0].ID : 0
                , strMessageReturned
                , strMessageReturned
                
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pQuotationsIDs)
        {
            bool _result = false;
            CQuotations objCQuotations = new CQuotations();
            foreach (var currentID in pQuotationsIDs.Split(','))
            {
                objCQuotations.lstDeletedCPKQuotations.Add(new CPKQuotations() { ID = Int64.Parse(currentID.Trim()) });
            }

            Exception checkException = objCQuotations.DeleteItem(objCQuotations.lstDeletedCPKQuotations);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] SetQuotationStage(Int64 pQuotationID, Int64 pQuotationRouteID, int pQuotationStageID, string pDenialReason, string pAlarmReceiversIDs)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            string _MailMessageReturned = "";
            int AcceptedQuoteAndOperStageID = 4;
            int DeclinedQuoteAndOperStageID = 5;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            //CQuotations objCQuotations = new CQuotations();
            //Exception checkException = objCQuotations.UpdateList(updateClause);
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();

            string updateClause = "";
            updateClause = " QuotationStageID = " + pQuotationStageID.ToString() + " \n";
            updateClause += " , DenialReason = " + (pDenialReason == "0" ? "null" : ("N'" + pDenialReason + "'")) + " \n";
            updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString() + " \n";
            updateClause += " , ModificationDate = GETDATE() " + " \n";
            updateClause += " WHERE ID = " + pQuotationRouteID.ToString() + " \n";
            Exception checkException = objCQuotationRoute.UpdateList(updateClause);

            if (checkException == null)
            {
                _result = true;
                objCvwQuotationRoute.GetListPaging(1, 1, "WHERE QuotationID = " + pQuotationID.ToString(), "CodeSerial", out _RowCount);
                if (pAlarmReceiversIDs == null && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                {
                    CvwUsers objCvwUsers = new CvwUsers();
                    string _WhereClause = "WHERE IsInactive=0" + " \n";
                    if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].IsWarehousing)
                        _WhereClause += "AND DepartmentName IN ('WAREHOUSING','TRANSPORTATION','WAREHOUSING HEAD','TRANSPORTATION HEAD')" + " \n";
                    else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 1 || objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 2)
                        _WhereClause += "AND DepartmentName IN ('FREIGHT','TRANSPORTATION','CLEARANCE','FREIGHT HEAD','TRANSPORTATION HEAD','CLEARANCE HEAD')" + " \n";
                    else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 3)
                        _WhereClause += "AND DepartmentName IN ('TRANSPORTATION','CLEARANCE','TRANSPORTATION HEAD','CLEARANCE HEAD')" + " \n";
                    checkException = objCvwUsers.GetListPaging(9999, 1, _WhereClause, "ID", out _RowCount);
                    pAlarmReceiversIDs = "";
                    for (int i = 0; i < objCvwUsers.lstCVarvwUsers.Count; i++)
                        pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? objCvwUsers.lstCVarvwUsers[i].ID.ToString() : ("," + objCvwUsers.lstCVarvwUsers[i].ID.ToString());
                }
                if (pAlarmReceiversIDs != null && pAlarmReceiversIDs != ""
                    && (pQuotationStageID == AcceptedQuoteAndOperStageID || pQuotationStageID == DeclinedQuoteAndOperStageID))
                {
                    CvwUsers objCvwUser_Sender = new CvwUsers();
                    checkException = objCvwUser_Sender.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                    string _Subject = "";
                    string _Body = "";
                    _Body = "<b>Sender : " + objCvwUser_Sender.lstCVarvwUsers[0].Email_DisplayName + "</b><br>";
                    if (pQuotationStageID == AcceptedQuoteAndOperStageID)
                    {
                        _Subject = "Quotation " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is accepted.";
                        _Body = "Quotation " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is accepted." + "<br />";
                    }
                    else if (pQuotationStageID == DeclinedQuoteAndOperStageID)
                    {
                        _Subject = "Quotation " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is declined.";
                        _Body = "Quotation " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is declined." + "<br />";
                    }
                    _Body += "Client: " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ClientName + "<br />";
                    _Body += "Line : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].LineName + "<br />";
                    _Body += "POL : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLName + "<br />";
                    _Body += "POD : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODName + "<br />";
                    if (pQuotationStageID == DeclinedQuoteAndOperStageID)
                        _Body += "<br />" + "DENIAL REASON : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DenialReason + "<br />";

                    #region Sending Alarm
                    

                    CVarEmail objCVarEmail = new CVarEmail();
                    CEmail objCEmail = new CEmail();
                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                    if (pQuotationStageID == AcceptedQuoteAndOperStageID)
                    {
                        objCVarEmail.QuotationRouteID = pQuotationRouteID; //i dont set it in case of denial not to show create link
                    }
                    objCVarEmail.Subject = _Subject;
                    objCVarEmail.Body = _Body;
                    objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                    objCVarEmail.SendingDate = DateTime.Now;
                    objCEmail.lstCVarEmail.Add(objCVarEmail);
                    checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                    if (checkException == null) //add to EmailReceivers
                    {
                        var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                        var NoOfReceivers = pArrayOfReceiversIDs.Length;
                        for (int i = 0; i < NoOfReceivers; i++)
                        {
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                            objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCVarEmailReceiver.IsAlarm = true;

                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                        }
                        checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                    }

                    #endregion Sending Alarm
                    #region Send Email
                    //CGroups objCGroups = new CGroups();
                    //objCGroups.GetList("WHERE GroupImageURL='CRM' AND IsInactive=0"); //have CRM Enabled
                    //                                                                  //CDefaults objCDefaults = new CDefaults();
                    //objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
                    //if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "" && objCDefaults.lstCVarDefaults[0].Email != "0" 
                    //    && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != "" 
                    //    && objCGroups.lstCVarGroups.Count > 0 && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "OCE" 
                    //    && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "CHM")
                    if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                        && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Port != 0 && objCDefaults.lstCVarDefaults[0].IsDepartmentOption
                        && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                    {
                        CUsers objCUsers = new CUsers();
                        checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pAlarmReceiversIDs + ")");

                        string FromMail = objCDefaults.lstCVarDefaults[0].Email;
                        bool _boolEmailFound = false;
                        var mail = new MailMessage();
                        //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                        SmtpClient SmtpServer = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                        SmtpServer.UseDefaultCredentials = true;
                        SmtpServer.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));

                        //SmtpClient SmtpServer = new SmtpClient();
                        //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);
                        mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                        for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                            if (objCUsers.lstCVarUsers[i].Email != "" && objCUsers.lstCVarUsers[i].Email != "0")
                            {
                                _boolEmailFound = true;
                                mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                            }
                        //mail.CC.Add(CC);
                        mail.Subject = _Subject;
                        mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>";
                        mail.Body += _Body;
                        mail.IsBodyHtml = true;
                        #region read arabic chars
                        var htmlView = AlternateView.CreateAlternateViewFromString(mail.Body, new ContentType("text/html"));
                        htmlView.ContentType.CharSet = Encoding.UTF8.WebName;
                        mail.AlternateViews.Add(htmlView);
                        #endregion read arabic chars

                        //mail.Attachments.Add(new Attachment(pathString));
                        //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                        //SmtpServer.Port = 25;
                        //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                        //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                        SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                        if (_boolEmailFound)
                            try
                            {
                                SmtpServer.Send(mail);
                            }
                            catch (Exception ex)
                            {
                                _MailMessageReturned = ex.Message;
                            }
                    } else if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                        && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Port != 0 
                        && (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "LATT" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "LAT"))
                    {
                        CUsers objCUsers = new CUsers();
                        checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pAlarmReceiversIDs + ")");

                        string FromMail = objCDefaults.lstCVarDefaults[0].Email;
                        bool _boolEmailFound = false;
                        var mail = new MailMessage();
                        System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                        SmtpClient SmtpServer = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                        SmtpServer.UseDefaultCredentials = true;
                        SmtpServer.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));

                        mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                        for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                        {
                            if (objCUsers.lstCVarUsers[i].Email != "" && objCUsers.lstCVarUsers[i].Email != "0")
                            {
                                _boolEmailFound = true;
                                mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                            }
                        }
                        mail.Subject = _Subject;
                        mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>";
                        mail.Body += _Body;
                        mail.IsBodyHtml = true;
                        #region read arabic chars
                        var htmlView = AlternateView.CreateAlternateViewFromString(mail.Body, new ContentType("text/html"));
                        htmlView.ContentType.CharSet = Encoding.UTF8.WebName;
                        mail.AlternateViews.Add(htmlView);
                        #endregion read arabic chars

                        SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                        if (_boolEmailFound)
                        {
                            try
                            {
                                SmtpServer.Send(mail);
                            }
                            catch (Exception ex)
                            {
                                _MailMessageReturned = ex.Message;
                            }
                        }
                    }
                    #endregion Send Email
                }
            }
            objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID = " + pQuotationID.ToString(), "CodeSerial", out _RowCount);
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute) : null
                , _MailMessageReturned //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] QuotationApproval_RequestApproval(Int64 pQuotationRouteID_ToRequestApproval, string pReceiverIDs, int pActionID, string pActionName)
        {
            int ApprovalRequestedQuoteAndOperStageID = 7;
            Int32 _RowCount = 0;
            string _ReturnedMessage = "";
            string _MailMessageReturned = "";
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            Exception checkException = null;
            string pAlarmReceiversIDs = string.IsNullOrWhiteSpace(pReceiverIDs)?"": pReceiverIDs;
            CvwUserForms objCvwUserForms = new CvwUserForms();
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            objCvwQuotationRoute.GetListPaging(1, 1, "WHERE ID = " + pQuotationRouteID_ToRequestApproval, "ID", out _RowCount);
            var constEmailSourceQuotationApprovalRequest = 25;
            if(string.IsNullOrWhiteSpace(pAlarmReceiversIDs))
            {
                checkException = objCvwUserForms.GetList("WHERE ImageName='QuotationApproval' AND CanEdit=1");
                if (objCvwUserForms.lstCVarvwUserForms.Count == 0)
                    _ReturnedMessage = "No users have quotation approval privilege.";
                else
                    for (int i = 0; i < objCvwUserForms.lstCVarvwUserForms.Count; i++)
                        pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? objCvwUserForms.lstCVarvwUserForms[i].UserID.ToString() : ("," + objCvwUserForms.lstCVarvwUserForms[i].UserID.ToString());
            }
            if (!string.IsNullOrWhiteSpace(pAlarmReceiversIDs))
            {
                #region Prepare Email Body
                CvwUsers objCvwUser_Sender = new CvwUsers();
                checkException = objCvwUser_Sender.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                string _Subject = "";
                string _Body = "";
                _Body = "<b>Sender : " + objCvwUser_Sender.lstCVarvwUsers[0].Email_DisplayName + "</b><br>";
                _Subject = "Approval Request for " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code +(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName=="MED" ?"Client Name : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ClientName :"");

                _Body = "Approval Request for " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + "<br />";
                _Body += "Client : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ClientName + "<br />";
                _Body += "Line : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].LineName + "<br />";
                _Body += "POL : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLName + "<br />";
                _Body += "POD : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODName + "<br />";

                #endregion Prepare Email Body
                #region Sending Alarm

                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                //if (pIsApproved)
                //{
                objCVarEmail.QuotationRouteID = pQuotationRouteID_ToRequestApproval; //i dont set it in case of denial not to show create link
                                                                                     //}
                objCVarEmail.EmailSource = constEmailSourceQuotationApprovalRequest;
                objCVarEmail.Subject = _Subject;
                objCVarEmail.Body = _Body;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                if (checkException == null) //add to EmailReceivers
                {
                    var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                    var NoOfReceivers = pArrayOfReceiversIDs.Length;
                    for (int i = 0; i < NoOfReceivers; i++)
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                    }
                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                    if (checkException == null)
                        objCQuotationRoute.UpdateList("QuotationStageID=" + ApprovalRequestedQuoteAndOperStageID + " WHERE ID=" + pQuotationRouteID_ToRequestApproval);
                }

                #endregion Sending Alarm
                #region ActionLog
                if (checkException == null)
                {
                    var objCQuotationActionLog = new CQuotationActionLog();
                    objCQuotationActionLog.lstCVarQuotationActionLog.Add(new CVarQuotationActionLog
                    {
                        QuotationID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuotationID,
                        QuotationRouteID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID,
                        ActionID = pActionID,
                        ActionName = pActionName,
                        UserID = WebSecurity.CurrentUserId,
                        ActionDate = DateTime.Now
                    });
                    checkException = objCQuotationActionLog.SaveMethod(objCQuotationActionLog.lstCVarQuotationActionLog);
                }
                #endregion
                #region Send Email
                //CGroups objCGroups = new CGroups();
                //objCGroups.GetList("WHERE GroupImageURL='CRM' AND IsInactive=0"); //have CRM Enabled
                //                                                                  //CDefaults objCDefaults = new CDefaults();
                //objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
                //if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "" && objCDefaults.lstCVarDefaults[0].Email != "0" 
                //    && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != "" 
                //    && objCGroups.lstCVarGroups.Count > 0 && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "OCE" 
                //    && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "CHM")
                if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                    && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                    && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                    && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                    && objCDefaults.lstCVarDefaults[0].Email_Port != 0 && objCDefaults.lstCVarDefaults[0].IsDepartmentOption
                        && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                {
                    CUsers objCUsers = new CUsers();
                    checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pAlarmReceiversIDs + ")");

                    string FromMail = objCDefaults.lstCVarDefaults[0].Email;
                    bool _boolEmailFound = false;
                    var mail = new MailMessage();
                    //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                    SmtpClient SmtpServer = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    SmtpServer.UseDefaultCredentials = true;
                    SmtpServer.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));

                    //SmtpClient SmtpServer = new SmtpClient();
                    //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);
                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                        if (objCUsers.lstCVarUsers[i].Email != "" && objCUsers.lstCVarUsers[i].Email != "0")
                        {
                            _boolEmailFound = true;
                            mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                        }
                    //mail.CC.Add(CC);
                    mail.Subject = _Subject;

                    mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>";
                    mail.Body += _Body;
                    mail.IsBodyHtml = true;
                    #region read arabic chars
                    var htmlView = AlternateView.CreateAlternateViewFromString(mail.Body, new ContentType("text/html"));
                    htmlView.ContentType.CharSet = Encoding.UTF8.WebName;
                    mail.AlternateViews.Add(htmlView);
                    #endregion read arabic chars
                    //mail.Attachments.Add(new Attachment(pathString));
                    //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                    //SmtpServer.Port = 25;
                    //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                    //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                    SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    if (_boolEmailFound)
                        try
                        {
                            SmtpServer.Send(mail);
                        }
                        catch (Exception ex)
                        {
                            _MailMessageReturned = ex.Message;
                        }
                }
                #endregion Send Email
            }
            objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuotationID, "CodeSerial", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage
                , _MailMessageReturned //pData[0]
                , serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute)
            };
        }

        [HttpGet, HttpPost]
        public object[] QuotationApproval_SetApproval(Int64 pQuotationRouteID, bool pIsApproved, string pRejectionReason,int pActionID, string pActionName, string pReceiverIDs="")
        {
            Int32 _RowCount = 0;
            string _ReturnedMessage = "";
            string _MailMessageReturned = "";
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            Exception checkException = null;
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            var constEmailSourceQuotationApprovalSet = 30;

            int RejectedQuoteAndOperStageID = 10;
            int ApprovedQuoteAndOperStageID = 15;

            string updateClause = "";
            updateClause = "RevisorUserID=" + WebSecurity.CurrentUserId + " \n";
            if (pIsApproved)
            {
                updateClause += ",IsRevised=1,QuotationStageID=" + ApprovedQuoteAndOperStageID + " \n";
                if(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED")
                {
                    updateClause += ",ApprovalUserId="+ WebSecurity.CurrentUserId + " \n";
                }
            }
            else
            {
                updateClause += ",IsRevised=0,QuotationStageID=" + RejectedQuoteAndOperStageID + "\n";
                updateClause += ",DenialReason=" + (pRejectionReason == "0" ? "NULL" : ("N'" + pRejectionReason + "'")) + "\n";
                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED")
                {
                    updateClause += ",ApprovalUserId=NULL" + " \n";
                }
            }
            updateClause += ",ModificationDate = GETDATE() " + "\n";
            updateClause += "WHERE ID = " + pQuotationRouteID + "\n";
            checkException = objCQuotationRoute.UpdateList(updateClause);

            if (checkException != null)
                _ReturnedMessage = checkException.Message;
            else
            {
                objCvwQuotationRoute.GetListPaging(1, 1, "WHERE ID = " + pQuotationRouteID, "ID", out _RowCount);
                string pAlarmReceiversIDs = !string.IsNullOrWhiteSpace(pReceiverIDs)? pReceiverIDs: objCvwQuotationRoute.lstCVarvwQuotationRoute[0].CreatorUserID.ToString();
                {
                    CvwUsers objCvwUser_Sender = new CvwUsers();
                    checkException = objCvwUser_Sender.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                    string _Subject = "";
                    string _Body = "";
                    _Body = "<b>Sender : " + objCvwUser_Sender.lstCVarvwUsers[0].Email_DisplayName + "</b><br>";
                    if (pIsApproved)
                    {
                        _Subject = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is approved.";
                        _Body = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is approved." + "<br />";
                    }
                    else //Rejected
                    {
                        _Subject = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is rejected.";
                        _Body = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is rejected." + "<br />";
                    }
                    _Body += "Client: " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ClientName + "<br />";
                    _Body += "Line : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].LineName + "<br />";
                    _Body += "POL : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLName + "<br />";
                    _Body += "POD : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODName + "<br />";
                    if (!pIsApproved)
                        _Body += "<br />" + "REJECTION REASON : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].DenialReason + " at " + DateTime.Now.ToShortDateString() + "<br />";

                    #region Sending Alarm

                    CVarEmail objCVarEmail = new CVarEmail();
                    CEmail objCEmail = new CEmail();
                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                    //if (pIsApproved)
                    //{
                    objCVarEmail.QuotationRouteID = pQuotationRouteID; //i dont set it in case of denial not to show create link
                    //}
                    objCVarEmail.EmailSource = constEmailSourceQuotationApprovalSet;
                    objCVarEmail.Subject = _Subject;
                    objCVarEmail.Body = _Body;
                    objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                    objCVarEmail.SendingDate = DateTime.Now;
                    objCEmail.lstCVarEmail.Add(objCVarEmail);
                    checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                    if (checkException == null) //add to EmailReceivers
                    {
                        var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                        var NoOfReceivers = pArrayOfReceiversIDs.Length;
                        for (int i = 0; i < NoOfReceivers; i++)
                        {
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                            objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCVarEmailReceiver.IsAlarm = true;

                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                        }
                        checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                    }

                    #endregion Sending Alarm
                    #region ActionLog
                    if (checkException == null)
                    {
                        var objCQuotationActionLog = new CQuotationActionLog();
                        objCQuotationActionLog.lstCVarQuotationActionLog.Add(new CVarQuotationActionLog
                        {
                            QuotationID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuotationID,
                            QuotationRouteID = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID,
                            ActionID = pActionID,
                            ActionName = pActionName,
                            UserID = WebSecurity.CurrentUserId,
                            ActionDate = DateTime.Now
                        });
                        checkException = objCQuotationActionLog.SaveMethod(objCQuotationActionLog.lstCVarQuotationActionLog);
                    }
                    #endregion
                    #region Send Email
                    //CGroups objCGroups = new CGroups();
                    //objCGroups.GetList("WHERE GroupImageURL='CRM' AND IsInactive=0"); //have CRM Enabled
                    //                                                                  //CDefaults objCDefaults = new CDefaults();
                    //objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
                    //if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "" && objCDefaults.lstCVarDefaults[0].Email != "0" 
                    //    && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != "" 
                    //    && objCGroups.lstCVarGroups.Count > 0 && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "OCE" 
                    //    && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "CHM")
                    if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                        && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Port != 0 && objCDefaults.lstCVarDefaults[0].IsDepartmentOption
                        && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                    {
                        CUsers objCUsers = new CUsers();
                        checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pAlarmReceiversIDs + ")");

                        string FromMail = objCDefaults.lstCVarDefaults[0].Email;
                        bool _boolEmailFound = false;
                        var mail = new MailMessage();
                        //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                        SmtpClient SmtpServer = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                        SmtpServer.UseDefaultCredentials = true;
                        SmtpServer.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));

                        //SmtpClient SmtpServer = new SmtpClient();
                        //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);
                        mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                        for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                            if (objCUsers.lstCVarUsers[i].Email != "" && objCUsers.lstCVarUsers[i].Email != "0")
                            {
                                _boolEmailFound = true;
                                mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                            }
                        //mail.CC.Add(CC);
                        mail.Subject = _Subject;
                        mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>";
                        mail.Body += _Body;
                        mail.IsBodyHtml = true;
                        #region read arabic chars
                        var htmlView = AlternateView.CreateAlternateViewFromString(mail.Body, new ContentType("text/html"));
                        htmlView.ContentType.CharSet = Encoding.UTF8.WebName;
                        mail.AlternateViews.Add(htmlView);
                        #endregion read arabic chars
                        //mail.Attachments.Add(new Attachment(pathString));
                        //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                        //SmtpServer.Port = 25;
                        //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                        //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                        SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                        if (_boolEmailFound)
                            try
                            {
                                SmtpServer.Send(mail);
                            }
                            catch (Exception ex)
                            {
                                _MailMessageReturned = ex.Message;
                            }
                    }
                    #endregion Send Email
                }
            }
            objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuotationID, "CodeSerial", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage
                , _MailMessageReturned //pData[0]
                , serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute)
            };
        }

        [HttpGet, HttpPost]
        public object[] GetQuotationDataToPrint(Int64 pPrintedQuotationID, string pSelectedQRIDs)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            bool pIsNSLQuotationFormat = true;

            CUsers objCUsers = new CUsers();
            objCUsers.GetList(" WHERE  ID = " + WebSecurity.CurrentUserId.ToString());

            CvwDefaults objCvwDefaults = new CvwDefaults();
            checkException = objCvwDefaults.GetListPaging(1, 1, " WHERE 1=1 ", "ID", out _RowCount);

            CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
            //objCvwQuotationCharges.GetListPaging(3000, 1, " WHERE QuotationRouteID IN (" + pSelectedQRIDs.ToString() + ")", "ChargeTypeCode"/*"ChargeTypeName"*/, out _RowCount);
            objCvwQuotationCharges.GetListPaging(3000, 1, " WHERE QuotationRouteID IN (" + pSelectedQRIDs.ToString() + ")", "ViewOrderForPrint,ChargeTypeCode"/*"ChargeTypeName"*/, out _RowCount);

            CvwQuotationRoute objCvwQuotationRoutes = new CvwQuotationRoute();
            objCvwQuotationRoutes.GetListPaging(1000, 1, " WHERE ID IN (" + pSelectedQRIDs.ToString() + ")", "CodeSerial", out _RowCount);

            CQuotationRoute objCQuotationRoutes = new CQuotationRoute();
            objCQuotationRoutes.UpdateList("NumberOfChairs=(ISNULL(NumberOfChairs,0)+1) WHERE ID IN (" + pSelectedQRIDs.ToString() + ")");

            CUsers objCSalesman = new CUsers();
            objCSalesman.GetList("WHERE IsNull(CustomerID , 0) = 0 AND ID=" + objCvwQuotationRoutes.lstCVarvwQuotationRoute[0].SalesmanID);

            CvwQuotations objCvwQuotations = new CvwQuotations();
            checkException = objCvwQuotations.GetListPaging(1, 1, " WHERE ID = " + pPrintedQuotationID.ToString(), "ID", out _RowCount);

            CCustomers objCCustomers = new CCustomers();
            if (objCvwQuotations.lstCVarvwQuotations[0].ClientID > 0)
                checkException = objCCustomers.GetListPaging(1, 1, " WHERE ID = " + objCvwQuotations.lstCVarvwQuotations[0].ClientID, "ID", out _RowCount);

            #region Is data suitable NorthStarLogistics Quotation?
            for (int i = 0; i < objCvwQuotationRoutes.lstCVarvwQuotationRoute.Count; i++)
            {
                var CurrentQRCharges = objCvwQuotationCharges.lstCVarvwQuotationCharges.Where(
                    s => s.QuotationRouteID == objCvwQuotationRoutes.lstCVarvwQuotationRoute[i].ID);

                if (CurrentQRCharges.Count() != 2)
                    pIsNSLQuotationFormat = false;
                else
                { //make sure that both OCF and EQ are found once and only once
                    if (
                        (CurrentQRCharges.ElementAt(0).ChargeTypeCode != "OCF" && CurrentQRCharges.ElementAt(0).ChargeTypeCode != "EQ")
                        || (CurrentQRCharges.ElementAt(1).ChargeTypeCode != "OCF" && CurrentQRCharges.ElementAt(1).ChargeTypeCode != "EQ")
                        || (CurrentQRCharges.ElementAt(0).ChargeTypeCode == CurrentQRCharges.ElementAt(1).ChargeTypeCode) //to handle case of both are EQ or both are OCF
                    )
                        pIsNSLQuotationFormat = false;
                }
            }
            #endregion Is data suitable NorthStarLogistics Quotation?

            var ContainerTypes_Summary = objCvwQuotationCharges.lstCVarvwQuotationCharges.GroupBy(l => l.ContainerTypeCode).Select(cl => new
            {
                ContainerTypeCode = cl.Key,
                Total = cl.Sum(s => s.CostQuantity)
            });

            var objCvwQuotationContainersAndPackages = new CvwQuotationContainersAndPackages();
            objCvwQuotationContainersAndPackages.GetList($" where QuotationRouteID in ({pSelectedQRIDs}) ");

            if (checkException == null)
                _result = true;

            if (_result)
                return new object[] {
                    _result //data[0]
                    , objCUsers.lstCVarUsers[0].Name //pUserName = data[1]
                    , objCUsers.lstCVarUsers[0].Mobile1 //pUserMobile1 = data[2]
                    , objCUsers.lstCVarUsers[0].Phone1 //pUserPhone1 = data[3]
                    , objCUsers.lstCVarUsers[0].Email //pUserEmail = data[4]
                    , objCvwQuotations.lstCVarvwQuotations[0].Code //pQuotationCode = data[5]
                    , objCvwQuotations.lstCVarvwQuotations[0].ClientName //pClientName = data[6]
                    , objCvwQuotations.lstCVarvwQuotations[0].ClientContactName //pClientContactName = data[7]
                    , objCvwQuotations.lstCVarvwQuotations[0].ClientContactEmail //pClientContactEmail = data[8]
                    , objCvwQuotations.lstCVarvwQuotations[0].RepDirectionTypeShown //pRepDirectionTypeShown = data[9]
                    , new JavaScriptSerializer().Serialize(objCvwQuotationRoutes.lstCVarvwQuotationRoute) //pTblQuotationRoutes = data[10]
                    , new JavaScriptSerializer().Serialize(objCvwQuotationCharges.lstCVarvwQuotationCharges) //pTblQuotationCharges = data[11]
                    , objCvwQuotations.lstCVarvwQuotations[0].AgentName //pAgentName = data[12]
                    , objCvwQuotations.lstCVarvwQuotations[0].AgentContactName //pAgentContactName = data[13]
                    , objCvwQuotations.lstCVarvwQuotations[0].AgentContactEmail //pAgentContactEmail = data[14]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateSubject : objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject //pSubject = data[15]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateTermsAndConditions : objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions //pTermsAndConditions = data[16]
                    , objCvwDefaults.lstCVarvwDefaults[0].Phones //pCompanyPhones = data[17]
                    , objCvwDefaults.lstCVarvwDefaults[0].Faxes //pCompanyFaxes = data[18]
                    , pIsNSLQuotationFormat //pIsNSLQuotationFormat = data[19]
                    , new JavaScriptSerializer().Serialize(objCvwQuotations.lstCVarvwQuotations[0]) //pQuotationHeader = data[20]
                    , ContainerTypes_Summary //ContainerTypes_Summary = data[21]
                    , new JavaScriptSerializer().Serialize(objCSalesman.lstCVarUsers[0]) //pSalesmanHeader = data[22]
                    , objCCustomers.lstCVarCustomers.Count == 0 ? null :new JavaScriptSerializer().Serialize(objCCustomers.lstCVarCustomers[0]) //pCustomer = data[23]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject_Clearance == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateSubject_Clearance : objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject_Clearance //pSubject = data[24]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions_Clearance == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateTermsAndConditions_Clearance : objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions_Clearance //pTermsAndConditions = data[25]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject_Transport == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateSubject_Transport : objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject_Transport //pSubject = data[26]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions_Transport == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateTermsAndConditions_Transport : objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions_Transport //pTermsAndConditions = data[27]
                    , objCvwQuotations.lstCVarvwQuotations[0].ShipmentTypeName//pShipmentTypeName = data[28]
                    , objCvwQuotations.lstCVarvwQuotations[0].TransportTypeName//pTransportTypeName = data[29]
                    , new JavaScriptSerializer().Serialize(objCvwQuotationContainersAndPackages.lstCVarvwQuotationContainersAndPackages)//pShipmentDetails = data[30]
                };
            else
                return new object[] {
                    _result //data[0]
            };
        }

        #region Cargo
        [HttpGet, HttpPost]
        public object[] Cargo_FillModal(Int64 pQRIDToFillCargoModal)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CvwQuotationContainersAndPackages objCvwQuotationContainersAndPackages = new CvwQuotationContainersAndPackages();
            CPackageTypes objCPackageTypes = new CPackageTypes();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            checkException = objCvwQuotationContainersAndPackages.GetListPaging(999999, 1, "WHERE QuotationRouteID=" + pQRIDToFillCargoModal, "PackageTypeName", out _RowCount);
            checkException = objCPackageTypes.GetList("ORDER BY Name");
            checkException = objCContainerTypes.GetList("ORDER BY Code");
            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCvwQuotationContainersAndPackages.lstCVarvwQuotationContainersAndPackages) //pData[0]
                , new JavaScriptSerializer().Serialize(objCPackageTypes.lstCVarPackageTypes) //pData[1]
                , new JavaScriptSerializer().Serialize(objCContainerTypes.lstCVarContainerTypes) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] Cargo_Save(Int64 pQuotationContainersAndPackagesID, Int64 pQuotationRouteID, Int64 pQuotationID
            , Int32 pContainerTypeID, Int32 pPackageTypeID, Decimal pLength, Decimal pWidth, Decimal pHeight, Decimal pVolume
            , Decimal pVolumetricWeight, Decimal pNetWeight, Decimal pGrossWeight, Decimal pChargeableWeight, Int32 pQuantity)
        {
            string _MessageReturned = "";
            string _UpdateClause = "";
            int _RowCount = 0;
            Exception checkException = new Exception();
            CVarQuotationContainersAndPackages objCVarQuotationContainersAndPackages = new CVarQuotationContainersAndPackages();
            CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
            CvwQuotationContainersAndPackages objCvwQuotationContainersAndPackages = new CvwQuotationContainersAndPackages();
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            #region Insert
            if (pQuotationContainersAndPackagesID == 0)
            {
                objCVarQuotationContainersAndPackages.QuotationRouteID = pQuotationRouteID;
                objCVarQuotationContainersAndPackages.QuotationID = pQuotationID;
                objCVarQuotationContainersAndPackages.ContainerTypeID = pContainerTypeID;
                objCVarQuotationContainersAndPackages.PackageTypeID = pPackageTypeID;
                objCVarQuotationContainersAndPackages.Length = pLength;
                objCVarQuotationContainersAndPackages.Width = pWidth;
                objCVarQuotationContainersAndPackages.Height = pHeight;
                objCVarQuotationContainersAndPackages.Volume = pVolume;
                objCVarQuotationContainersAndPackages.VolumetricWeight = pVolumetricWeight;
                objCVarQuotationContainersAndPackages.NetWeight = pNetWeight;
                objCVarQuotationContainersAndPackages.GrossWeight = pGrossWeight;
                objCVarQuotationContainersAndPackages.ChargeableWeight = pChargeableWeight;
                objCVarQuotationContainersAndPackages.Quantity = pQuantity;
                objCVarQuotationContainersAndPackages.CreatorUserID = objCVarQuotationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarQuotationContainersAndPackages.CreationDate = objCVarQuotationContainersAndPackages.ModificationDate = DateTime.Now;

                objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages.Add(objCVarQuotationContainersAndPackages);
                checkException = objCQuotationContainersAndPackages.SaveMethod(objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages);
            }
            #endregion Insert
            #region Update
            else
            {
                _UpdateClause = "QuotationRouteID=" + pQuotationRouteID + "\n";
                _UpdateClause += ",QuotationID=" + pQuotationID + "\n";
                _UpdateClause += (pContainerTypeID == 0 ? ",ContainerTypeID=NULL" : (",ContainerTypeID=" + pContainerTypeID)) + "\n";
                _UpdateClause += (pPackageTypeID == 0 ? ",PackageTypeID=NULL" : (",PackageTypeID=" + pPackageTypeID)) + "\n";
                _UpdateClause += ",Length=" + pLength + "\n";
                _UpdateClause += ",Width=" + pWidth + "\n";
                _UpdateClause += ",Height=" + pHeight + "\n";
                _UpdateClause += ",Volume=" + pVolume + "\n";
                _UpdateClause += ",VolumetricWeight=" + pVolumetricWeight + "\n";
                _UpdateClause += ",NetWeight=" + pNetWeight + "\n";
                _UpdateClause += ",GrossWeight=" + pGrossWeight + "\n";
                _UpdateClause += ",ChargeableWeight=" + pChargeableWeight + "\n";
                _UpdateClause += ",Quantity=" + pQuantity + "\n";
                _UpdateClause += "WHERE ID=" + pQuotationContainersAndPackagesID;
                checkException = objCQuotationContainersAndPackages.UpdateList(_UpdateClause);
            }
            #endregion Update
            if (checkException != null)
                _MessageReturned = checkException.Message;
            else
            {
                #region Recalculate Weights totals
                checkException = objCQuotationRoute.UpdateList(
                    "NumberOfPackages=(SELECT SUM(ISNULL(Quantity,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                    + ",Volume=(SELECT SUM(ISNULL(Volume,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                    + ",VolumetricWeight=(SELECT SUM(ISNULL(VolumetricWeight,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                    + ",GrossWeight=(SELECT SUM(ISNULL(GrossWeight,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                    + ",ChargeableWeight=(SELECT SUM(ISNULL(ChargeableWeight,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                    + "WHERE ID=" + pQuotationRouteID);
                #endregion Recalculate Weights totals

                checkException = objCvwQuotationRoute.GetListPaging(999999, 1, "WHERE ID=" + pQuotationRouteID, "ID", out _RowCount);
                checkException = objCvwQuotationContainersAndPackages.GetListPaging(999999, 1, "WHERE QuotationRouteID=" + pQuotationRouteID, "PackageTypeName", out _RowCount);
            }
            return new object[]
            {
                _MessageReturned
                , new JavaScriptSerializer().Serialize(objCvwQuotationContainersAndPackages.lstCVarvwQuotationContainersAndPackages)
                , new JavaScriptSerializer().Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute[0]) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] Cargo_Delete(string pQuotationContainersAndPackagesDeletedIDs, Int64 pQuotationRouteID)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
            CvwQuotationContainersAndPackages objCvwQuotationContainersAndPackages = new CvwQuotationContainersAndPackages();
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            checkException = objCQuotationContainersAndPackages.DeleteList("WHERE ID IN (" + pQuotationContainersAndPackagesDeletedIDs + ")");
            if (checkException != null)
                _MessageReturned = checkException.Message;

            #region Recalculate Weights totals
            checkException = objCQuotationRoute.UpdateList(
                "NumberOfPackages=(SELECT SUM(ISNULL(Quantity,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                + ",Volume=(SELECT SUM(ISNULL(Volume,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                + ",VolumetricWeight=(SELECT SUM(ISNULL(VolumetricWeight,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                + ",GrossWeight=(SELECT SUM(ISNULL(GrossWeight,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                + ",ChargeableWeight=(SELECT SUM(ISNULL(ChargeableWeight,0)) FROM QuotationContainersAndPackages WHERE QuotationRouteID=" + pQuotationRouteID + ")" + "\n"
                + "WHERE ID=" + pQuotationRouteID);
            #endregion Recalculate Weights totals

            checkException = objCvwQuotationContainersAndPackages.GetListPaging(999999, 1, "WHERE QuotationRouteID=" + pQuotationRouteID, "PackageTypeName", out _RowCount);
            checkException = objCvwQuotationRoute.GetListPaging(999999, 1, "WHERE ID=" + pQuotationRouteID, "ID", out _RowCount);
            return new object[]
            {
                _MessageReturned
                , new JavaScriptSerializer().Serialize(objCvwQuotationContainersAndPackages.lstCVarvwQuotationContainersAndPackages) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute[0]) //pData[2]
            };
        }
        #endregion Cargo

        [HttpGet, HttpPost]
        public Int32 GetPartnerID(Int32 pCheckedPartnerTypeID, Int32 pReceivedPartnerTypeID, Int32 pPartnerID)
        {
            if (pCheckedPartnerTypeID == pReceivedPartnerTypeID)
                return pPartnerID;
            else
                return 0;

        }

        //[HttpGet, HttpPost]
        //public Int32 GetPartnerTypeIDFromOperationPartnerTypeID(Int32 pOperationPartnerTypeID)
        //{
        //    Int32 pPartnerTypeID = 0;
        //    if (pOperationPartnerTypeID == 1 || pOperationPartnerTypeID == 2 || pOperationPartnerTypeID == 4 || pOperationPartnerTypeID == 5 || pOperationPartnerTypeID == 160 || pOperationPartnerTypeID == 170 || pOperationPartnerTypeID == 180)
        //        pPartnerTypeID = 1;
        //    if (pOperationPartnerTypeID == 6)
        //        pPartnerTypeID = 2;
        //    if (pOperationPartnerTypeID == 7)
        //        pPartnerTypeID = 3;
        //    if (pOperationPartnerTypeID == 8)
        //        pPartnerTypeID = 4;
        //    if (pOperationPartnerTypeID == 9)
        //        pPartnerTypeID = 5;
        //    if (pOperationPartnerTypeID == 10)
        //        pPartnerTypeID = 6;
        //    if (pOperationPartnerTypeID == 11)
        //        pPartnerTypeID = 7;
        //    if (pOperationPartnerTypeID == 12)
        //        pPartnerTypeID = 8;

        //    return pPartnerTypeID;
        //}

        #region QuotationRoute

        [HttpGet, HttpPost]
        public Object[] QR_LoadAll(string pWhereClauseQR, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            Int32 _RowCount = 0;
            checkException = objCvwQuotationRoute.GetListPaging(5000, 1, pWhereClauseQR, pOrderBy, out _RowCount);
            if (checkException == null)
                _result = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                _result
                , serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute)
            };
        }

        [HttpGet, HttpPost]
        public Object[] QR_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClauseQR, string pOrderBy)
        {
            Exception checkException = null;
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            Int32 _RowCount = 0;
            checkException = objCvwQuotationRoute.GetListPaging(pPageSize, pPageNumber, pWhereClauseQR, pOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public Object[] QR_LoadAllWithMinimalColumns(string pWhereClauseQRWithMinimalColumns, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            //Int32 _RowCount = 0;
            //checkException = objCvwQuotationRoute.GetListPaging(999999, 1, pWhereClauseQRWithMinimalColumns, pOrderBy, out _RowCount);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var QRList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID, Code, POLName, PODName, ClientName FROM vwQuotationRoute "+ pWhereClauseQRWithMinimalColumns, typeof(CVarvwQuotationRoute)).Cast<CVarvwQuotationRoute>().ToList();
            var QuotationRoutes = QRList.Select(c => new
            {
                c.ID,
                c.Code,
                c.POLName,
                c.PODName,
                c.ClientName
            }).ToList();
            if (checkException == null)
                _result = true;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new Object[] {
                _result
                , serializer.Serialize(QuotationRoutes)
            };
        }

        [HttpGet, HttpPost]
        public object[] ChangeQuotationType(Int64 pQuotationID, string pNewQuotationCode, int pDirectionType, string pDirectionIconName, string pDirectionIconStyle, int pTransportType, string pTransportIconName, string pTransportIconStyle, int pShipmentType)
        {
            Exception checkException = null;
            Int16 MainCarraigeRoutingTypeID = 30;

            int constImportDirectionType = 1;
            int constMasterBLType = 3;

            string pUpdateClause = "";
            pUpdateClause += " Code = '" + pNewQuotationCode + "' ";


            //if (pBLType == constMasterBLType) //client is agent
            //{
            //    pUpdateClause += " , ConsigneeID = NULL ";
            //    pUpdateClause += " , ConsigneeContactID = NULL ";
            //    pUpdateClause += " , ShipperID = NULL ";
            //    pUpdateClause += " , ShipperContactID = NULL ";
            //}
            //else if (pBLType != constMasterBLType && pDirectionType == constImportDirectionType) //client is consignee
            //{
            //    pUpdateClause += " , ShipperID = NULL ";
            //    pUpdateClause += " , ShipperContactID = NULL ";
            //    pUpdateClause += " , AgentID = NULL ";
            //    pUpdateClause += " , AgentContactID = NULL ";
            //    pUpdateClause += " , NetworkID = NULL ";
            //}
            //else //client is shipper
            //{
            //    pUpdateClause += " , ConsigneeID = NULL ";
            //    pUpdateClause += " , ConsigneeContactID = NULL ";
            //    pUpdateClause += " , AgentID = NULL ";
            //    pUpdateClause += " , AgentContactID = NULL ";
            //    pUpdateClause += " , NetworkID = NULL ";
            //}

            pUpdateClause += " , DirectionType = '" + pDirectionType.ToString() + "' ";
            pUpdateClause += " , DirectionIconName = '" + pDirectionIconName + "' ";
            pUpdateClause += " , DirectionIconStyle = '" + pDirectionIconStyle + "' ";
            pUpdateClause += " , TransportType = '" + pTransportType.ToString() + "' ";
            pUpdateClause += " , TransportIconName = '" + pTransportIconName + "' ";
            pUpdateClause += " , TransportIconStyle = '" + pTransportIconStyle + "' ";
            pUpdateClause += " , ShipmentType = '" + pShipmentType.ToString() + "' ";
            pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
            pUpdateClause += " , ModificationDate = GETDATE() ";
            pUpdateClause += " WHERE ID = " + pQuotationID.ToString();

            CQuotations objCQuotations = new CQuotations();
            checkException = objCQuotations.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                #region Reset Quotation Routing to allow changing the line 

                pUpdateClause = " TransportType = '" + pTransportType.ToString() + "' ";
                pUpdateClause += " , TransportIconName = '" + pTransportIconName + "' ";
                pUpdateClause += " , TransportIconStyle = '" + pTransportIconStyle + "' ";
                if (pTransportType == 1) //Ocean
                {
                    pUpdateClause += " , AirlineID = null";
                    pUpdateClause += " , TruckerID = null ";
                }
                else if (pTransportType == 2) //Air
                {
                    pUpdateClause += " , VesselID = null";
                    pUpdateClause += " , ShippingLineID = null ";
                    pUpdateClause += " , TruckerID = null ";
                }
                else if (pTransportType == 3) //Inland
                {
                    pUpdateClause += " , VesselID = null";
                    pUpdateClause += " , ShippingLineID = null ";
                    pUpdateClause += " , AirlineID = null ";
                }
                pUpdateClause += " WHERE QuotationID = " + pQuotationID.ToString() + " AND RoutingTypeID = " + MainCarraigeRoutingTypeID.ToString();

                CRoutings objCRoutings = new CRoutings();
                checkException = objCRoutings.UpdateList(pUpdateClause);
                #endregion
            }

            return new object[] { };
        }


        [HttpGet, HttpPost]
        public object[] QR_Insert
        (Int64 pQuotationID, Int32 pRoutingTypeID/*, Int32 pDirectionType, string pDirectionIconName, string pDirectionIconStyle*/
            , Int32 pTransportType, string pTransportIconName, string pTransportIconStyle/*, Int32 pShipmentType*/, Int32 pPOLCountryID, Int32 pPOLID
            , Int32 pPODCountryID, Int32 pPODID, string pPickupAddress, string pDeliveryAddress, Int32 pMoveTypeID, DateTime pExpirationDate
            , DateTime pETAPOLDate, Int32 pShippingLineID, Int32 pAirlineID, Int32 pTruckerID, Int32 pTransientTime, Int32 pValidity
            , Int32 pFreeTime, Int32 pFreeTimePOD, Int32 pQuotationStageID, string pNotes, Int32 pCommodityID, Int32 pIncotermID, Int32 pEquipmentModelID, Int32 pPOrC
            , decimal pCost, decimal pSale, Int32 pDivisionID, Int32 pEquipmentTypeID, string pFreightRateFormat
            , int pClearancePortID, int pPickupPlaceID, int pPOLID_TransportID, int pClientPlantID , Decimal pCustomsAcceptedValue = 0
            )
        {
            bool _result = false;
            Exception checkException = null;
            Int32 _RowCount = 0;
            string _MailMessageReturned = "";
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "Where 1=1", "ID", out _RowCount);
            CvwServiceDepartment objCvwServiceDepartment = new CvwServiceDepartment();

            CVarQuotationRoute objCVarQuotationRoute = new CVarQuotationRoute();
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            Int32 CreatedQuotationStageID = 1;
            string pAlarmReceiversIDs = "";
            objCVarQuotationRoute.Code = "0";
            objCVarQuotationRoute.QuotationID = pQuotationID;
            objCVarQuotationRoute.RoutingTypeID = pRoutingTypeID;
            objCVarQuotationRoute.DirectionIconName = "0"; // pDirectionIconName;
            objCVarQuotationRoute.DirectionIconStyle = "0"; //pDirectionIconStyle;
            objCVarQuotationRoute.TransportType = pTransportType;
            objCVarQuotationRoute.TransportIconName = pTransportIconName;
            objCVarQuotationRoute.TransportIconStyle = pTransportIconStyle;
            //objCVarQuotationRoute.ShipmentType = pShipmentType;
            objCVarQuotationRoute.POLCountryID = pPOLCountryID;
            objCVarQuotationRoute.POL = pPOLID;
            objCVarQuotationRoute.PODCountryID = pPODCountryID;
            objCVarQuotationRoute.POD = pPODID;
            objCVarQuotationRoute.ClearancePortID = pClearancePortID;
            objCVarQuotationRoute.POLID_Transport = pPOLID_TransportID;
            objCVarQuotationRoute.ClientPlantID = pClientPlantID;
            objCVarQuotationRoute.PickupPlaceID = pPickupPlaceID;
            objCVarQuotationRoute.PickupAddress = pPickupAddress;
            objCVarQuotationRoute.DeliveryAddress = pDeliveryAddress;
            objCVarQuotationRoute.MoveTypeID = pMoveTypeID;
            objCVarQuotationRoute.ExpirationDate = pExpirationDate;
            objCVarQuotationRoute.ETAPOLDate = pETAPOLDate;
            objCVarQuotationRoute.ShippingLineID = pShippingLineID;
            objCVarQuotationRoute.AirlineID = pAirlineID;
            objCVarQuotationRoute.TruckerID = pTruckerID;
            objCVarQuotationRoute.TransientTime = pTransientTime;
            objCVarQuotationRoute.Validity = pValidity;
            objCVarQuotationRoute.FreeTime = pFreeTime;
            objCVarQuotationRoute.FreeTimePOD = pFreeTimePOD;
            objCVarQuotationRoute.QuotationStageID = pQuotationStageID;
            objCVarQuotationRoute.Notes = pNotes;
            objCVarQuotationRoute.CommodityID = pCommodityID;
            objCVarQuotationRoute.IncotermID = pIncotermID;
            objCVarQuotationRoute.EquipmentModelID = pEquipmentModelID;
            objCVarQuotationRoute.POrC = pPOrC;
            objCVarQuotationRoute.DenialReason = "0";
            objCVarQuotationRoute.Cost = pCost;
            objCVarQuotationRoute.Sale = pSale;
            objCVarQuotationRoute.DivisionID = pDivisionID;
            objCVarQuotationRoute.EquipmentTypeID = pEquipmentTypeID;
            objCVarQuotationRoute.FreightRateFormat = pFreightRateFormat;
            objCVarQuotationRoute.ChargeEditApprovalLevel = 0;
            objCVarQuotationRoute.ChargeEdit1stApprovalUserID = 0;
            objCVarQuotationRoute.ChargeEdit2ndApprovalUserID = 0;
            objCVarQuotationRoute.ChargeEdit3rdApprovalUserID = 0;
            objCVarQuotationRoute.ChargeEdit4thApprovalUserID = 0;
            objCVarQuotationRoute.CustomsAcceptedValue = pCustomsAcceptedValue;
            objCVarQuotationRoute.ETD = DateTime.Parse("01-01-1900");
            objCVarQuotationRoute.StuffingCutOf = DateTime.Parse("01-01-1900");



            objCVarQuotationRoute.CreatorUserID = objCVarQuotationRoute.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarQuotationRoute.CreationDate = objCVarQuotationRoute.ModificationDate = DateTime.Now;
            objCQuotationRoute.lstCVarQuotationRoute.Add(objCVarQuotationRoute);
            checkException = objCQuotationRoute.SaveMethod(objCQuotationRoute.lstCVarQuotationRoute);
            if (checkException == null)
            {
                _result = true;
                objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID=" + pQuotationID.ToString(), "CodeSerial", out _RowCount);
                #region Send Notifications for IsDepartmentOption
                //if (objCDefaults.lstCVarDefaults[0].IsDepartmentOption)
                //{
                //    checkException = objCvwServiceDepartment.GetListPaging(999999, 1, "WHERE MoveTypeID=" + pMoveTypeID, "ID", out _RowCount);
                //    var pServiceDepartmentList = objCvwServiceDepartment.lstCVarvwServiceDepartment
                //        .Select(s => new
                //        {
                //            ID = s.DepartmentID
                //            ,
                //            Email = s.Email
                //        })
                //        .Distinct().OrderBy(o => o.ID).ToList();
                //    string _DepartmentIDs = "0";
                //    for (int i = 0; i < pServiceDepartmentList.Count; i++)
                //    {
                //        _DepartmentIDs += "," + pServiceDepartmentList[i].ID;
                //    }

                //    string pSubject = "Charges Request For Quot. " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code;
                //    string pBody = "Quotation Code : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + "\n";
                //    pBody += "Client : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ClientName + "\n";
                //    pBody += "Service : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].MoveTypeName + "\n";
                //    pBody += "From : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLCountryName + " - " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLName + "\n";
                //    pBody += "To : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODCountryName + " - " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODName + "\n";
                //    pBody += "Commodity : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].CommodityName + "\n";

                //    CUsers objCUsers = new CUsers();
                //    objCUsers.GetListPaging(999999, 1, "WHERE DepartmentID IN (" + _DepartmentIDs + ") AND ID<>" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                //    var _DistinctAlarmedUsers = objCUsers.lstCVarUsers
                //        .Select(s => new
                //        {
                //            ID = s.ID
                //        })
                //        .Distinct().OrderBy(o => o.ID).ToList();
                //    if (objCUsers.lstCVarUsers.Count > 0)
                //        for (int i = 0; i < _DistinctAlarmedUsers.Count; i++)
                //            pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? _DistinctAlarmedUsers[i].ID.ToString() : ("," + _DistinctAlarmedUsers[i].ID);
                //    if (pAlarmReceiversIDs != "")
                //        SendAlarmWithMinimalData(pAlarmReceiversIDs, pSubject, pBody, objCVarQuotationRoute.ID);

                //    #region Send Email
                //    CvwUsers objCvwUser_Sender = new CvwUsers();
                //    checkException = objCvwUser_Sender.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                //    if (objCvwUser_Sender.lstCVarvwUsers[0].Email != "0" && objCvwUser_Sender.lstCVarvwUsers[0].Email != ""
                //        && objCvwUser_Sender.lstCVarvwUsers[0].Email_Password != "0" && objCvwUser_Sender.lstCVarvwUsers[0].Email_Password != ""
                //        && objCvwUser_Sender.lstCVarvwUsers[0].Email_DisplayName != "0" && objCvwUser_Sender.lstCVarvwUsers[0].Email_DisplayName != ""
                //        && objCvwUser_Sender.lstCVarvwUsers[0].Email_Host != "0" && objCvwUser_Sender.lstCVarvwUsers[0].Email_Host != ""
                //        && objCvwUser_Sender.lstCVarvwUsers[0].Email_Port != 0)
                //    {
                //        string FromMail = objCvwUser_Sender.lstCVarvwUsers[0].Email;
                //        bool _boolEmailFound = false;

                //        var mail = new MailMessage();
                //        //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                //        SmtpClient SmtpServer = new SmtpClient(objCvwUser_Sender.lstCVarvwUsers[0].Email_Host, objCvwUser_Sender.lstCVarvwUsers[0].Email_Port);
                //        SmtpServer.UseDefaultCredentials = true;
                //        SmtpServer.Credentials = new System.Net.NetworkCredential(objCvwUser_Sender.lstCVarvwUsers[0].Email, CEncryptDecrypt.Decrypt(objCvwUser_Sender.lstCVarvwUsers[0].Email_Password, true));

                //        //SmtpClient SmtpServer = new SmtpClient();
                //        //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);
                //        mail.From = new MailAddress(objCvwUser_Sender.lstCVarvwUsers[0].Email, objCvwUser_Sender.lstCVarvwUsers[0].Email_DisplayName);
                //        for (int i = 0; i < pServiceDepartmentList.Count; i++)
                //            if (pServiceDepartmentList[i].Email != "" && pServiceDepartmentList[i].Email != "0")
                //            {
                //                _boolEmailFound = true;
                //                mail.To.Add(pServiceDepartmentList[i].Email);
                //            }
                //        //mail.CC.Add(CC);
                //        mail.Subject = pSubject;
                //        mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>" + pBody;
                //        mail.IsBodyHtml = true;
                //        //mail.Attachments.Add(new Attachment(pathString));
                //        //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                //        //SmtpServer.Port = 25;
                //        //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                //        //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                //        SmtpServer.EnableSsl = objCvwUser_Sender.lstCVarvwUsers[0].Email_IsSSL;
                //        if (_boolEmailFound)
                //            try
                //            {
                //                SmtpServer.Send(mail);
                //            }
                //            catch (Exception ex)
                //            {
                //                _MailMessageReturned = ex.Message;
                //            }
                //    }
                //    #endregion Send Email
                //}
                #endregion Send Notifications for IsDepartmentOption
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute) : null
                , _result ? objCVarQuotationRoute.ID : 0 //pRouteID = pData[2]
                , _MailMessageReturned //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] QR_Update(Int64 pRoutingID, Int64 pQuotationID, Int32 pRoutingTypeID/*, Int32 pDirectionType, string pDirectionIconName, string pDirectionIconStyle*/, Int32 pTransportType, string pTransportIconName, string pTransportIconStyle/*, Int32 pShipmentType*/, Int32 pPOLCountryID, Int32 pPOLID, Int32 pPODCountryID, Int32 pPODID, string pPickupAddress, string pDeliveryAddress, Int32 pMoveTypeID, string pExpirationDate, string pETAPOLDate, Int32 pShippingLineID, Int32 pAirlineID, Int32 pTruckerID, Int32 pTransientTime, Int32 pValidity, Int32 pFreeTime, Int32 pFreeTimePOD, string pNotes, Int32 pCommodityID, Int32 pIncotermID, Int32 pEquipmentModelID, Int32 pPOrC, bool pIsRevised
            , decimal pCost, decimal pSale, Int32 pDivisionID, Int32 pEquipmentTypeID, string pFreightRateFormat
            , int pClearancePortID, int pPickupPlaceID, int pPOLID_TransportID, int pClientPlantID, Decimal pCustomsAcceptedValue = 0,string pETDDate="" ,string pStuffingCutOf ="")
        {
            bool _result = false;
            Exception checkException = null;
            string pUpdateClause = "";

            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();

            pUpdateClause += " RoutingTypeID = " + pRoutingTypeID.ToString();
            pUpdateClause += " ,TransportType = N'" + pTransportType.ToString() + "'";
            pUpdateClause += " ,TransportIconName = N'" + pTransportIconName + "'";
            pUpdateClause += " ,TransportIconStyle = N'" + pTransportIconStyle + "'";
            pUpdateClause += " ,POLCountryID = " + pPOLCountryID;
            pUpdateClause += " ,POL = " + pPOLID;
            pUpdateClause += " ,PODCountryID = " + pPODCountryID;
            pUpdateClause += " ,POD = " + pPODID;
            pUpdateClause += " ,CustomsAcceptedValue = " + pCustomsAcceptedValue;


            pUpdateClause += pClientPlantID == 0 ? " ,ClientPlantID = NULL " : (" ,ClientPlantID = N'" + pClientPlantID.ToString() + "'");
            pUpdateClause += pPOLID_TransportID == 0 ? " ,POLID_Transport = NULL " : (" ,POLID_Transport = N'" + pPOLID_TransportID.ToString() + "'");
            pUpdateClause += pPickupPlaceID == 0 ? " ,PickupPlaceID = NULL " : (" ,PickupPlaceID = N'" + pPickupPlaceID.ToString() + "'");
            pUpdateClause += pClearancePortID == 0 ? " ,ClearancePortID = NULL " : (" ,ClearancePortID = N'" + pClearancePortID.ToString() + "'");

            pUpdateClause += pPickupAddress == "0" ? " ,PickupAddress = NULL " : (" ,PickupAddress = N'" + pPickupAddress.ToString() + "'");
            pUpdateClause += pDeliveryAddress == "0" ? " ,DeliveryAddress = NULL " : (" ,DeliveryAddress = N'" + pDeliveryAddress.ToString() + "'");
            pUpdateClause += pMoveTypeID == 0 ? " ,MoveTypeID = NULL " : (" ,MoveTypeID = N'" + pMoveTypeID.ToString() + "'");

            pUpdateClause += pExpirationDate == "0" ? " ,ExpirationDate = NULL " : (" ,ExpirationDate = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pExpirationDate, 1) + "'");
            pUpdateClause += pETAPOLDate == "0" ? " ,ETAPOLDate = NULL " : (" ,ETAPOLDate = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pETAPOLDate, 1) + "'");
            pUpdateClause += pETDDate == "0" ? " ,ETD = NULL " : (" ,ETD = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pETDDate, 1) + "'");
            pUpdateClause += pStuffingCutOf == "0" ? " ,StuffingCutOf = NULL " : (" ,StuffingCutOf = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pStuffingCutOf, 1) + "'");

            pUpdateClause += pShippingLineID == 0 ? " ,ShippingLineID = NULL " : (" ,ShippingLineID = N'" + pShippingLineID.ToString() + "'");
            pUpdateClause += pAirlineID == 0 ? " ,AirlineID = NULL " : (" ,AirlineID = N'" + pAirlineID.ToString() + "'");
            pUpdateClause += pTruckerID == 0 ? " ,TruckerID = NULL " : (" ,TruckerID = N'" + pTruckerID.ToString() + "'");
            pUpdateClause += pTransientTime == 0 ? " ,TransientTime = NULL " : (" ,TransientTime = N'" + pTransientTime.ToString() + "'");
            pUpdateClause += pValidity == 0 ? " ,Validity = NULL " : (" ,Validity = N'" + pValidity.ToString() + "'");
            pUpdateClause += pFreeTime == 0 ? " ,FreeTime = NULL " : (" ,FreeTime = N'" + pFreeTime.ToString() + "'");
            pUpdateClause += pFreeTimePOD == 0 ? " ,FreeTimePOD = NULL " : (" ,FreeTimePOD = N'" + pFreeTimePOD.ToString() + "'");
            pUpdateClause += pNotes == "0" ? " ,Notes = NULL " : (" ,Notes = N'" + pNotes.ToString() + "'");
            pUpdateClause += pCommodityID == 0 ? " ,CommodityID = NULL " : (" ,CommodityID = N'" + pCommodityID.ToString() + "'");
            pUpdateClause += pIncotermID == 0 ? " ,IncotermID = NULL " : (" ,IncotermID = N'" + pIncotermID.ToString() + "'");
            pUpdateClause += pEquipmentModelID == 0 ? " ,EquipmentModelID = NULL " : (" ,EquipmentModelID = N'" + pEquipmentModelID.ToString() + "'");
            pUpdateClause += pPOrC == 0 ? " ,POrC = NULL " : (" ,POrC = N'" + pPOrC.ToString() + "'");
            pUpdateClause += pCost == 0 ? " ,Cost = NULL " : (" ,Cost = N'" + pCost + "'");
            pUpdateClause += pSale == 0 ? " ,Sale = NULL " : (" ,Sale = N'" + pSale + "'");
            pUpdateClause += pDivisionID == 0 ? " ,DivisionID = NULL " : (" ,DivisionID = N'" + pDivisionID.ToString() + "'");
            pUpdateClause += pEquipmentTypeID == 0 ? " ,EquipmentTypeID = NULL " : (" ,EquipmentTypeID = N'" + pEquipmentTypeID.ToString() + "'");
            pUpdateClause += pFreightRateFormat == "0" ? " ,FreightRateFormat = NULL " : (" ,FreightRateFormat = N'" + pFreightRateFormat + "'");
            if (pIsRevised)
                pUpdateClause += ",IsRevised=1, RevisorUserID=" + WebSecurity.CurrentUserId + " \n";
            else
                pUpdateClause += ",IsRevised=0" + "\n";
            pUpdateClause += " ,ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'";
            pUpdateClause += " ,ModificationDate = GETDATE() ";
            pUpdateClause += " WHERE ID = " + pRoutingID.ToString();
            objCQuotationRoute.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                Int32 _RowCount = 0;
                objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID = " + pQuotationID.ToString(), "CodeSerial", out _RowCount);
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] QR_Revised(string pRevisedQRIDs)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            checkException = objCQuotationRoute.UpdateList("IsRevised=1, RevisorUserID=" + WebSecurity.CurrentUserId + " WHERE ID IN(" + pRevisedQRIDs + ")");
            checkException = objCQuotationRoute.GetListPaging(1, 1, "WHERE ID IN (" + pRevisedQRIDs + ")", "ID", out _RowCount);
            checkException = objCvwQuotationRoute.GetListPaging(999999, 1, "WHERE QuotationID=" + objCQuotationRoute.lstCVarQuotationRoute[0].QuotationID, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _ReturnedMessage
                , serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute)
            };
        }

        [HttpGet, HttpPost]
        public object[] QR_Copy(Int64 pQRIDToCopy)
        {
            bool _result = false;
            Exception checkException = null;
            CQuotationRoute objExistingCQuotationRoute = new CQuotationRoute();
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CVarQuotationRoute objCVarQuotationRoute = new CVarQuotationRoute();
            Int32 _RowCount = 0;
            int CreatedQuoteAndOperStageID = 1;
            objExistingCQuotationRoute.GetListPaging(1, 1, "WHERE ID=" + pQRIDToCopy.ToString(), "CodeSerial", out _RowCount); //1 record returned isa

            objCVarQuotationRoute.ID = 0;
            objCVarQuotationRoute.Code = "0";
            objCVarQuotationRoute.QuotationID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].QuotationID;
            objCVarQuotationRoute.RoutingTypeID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].RoutingTypeID;
            objCVarQuotationRoute.DirectionType = objExistingCQuotationRoute.lstCVarQuotationRoute[0].DirectionType;
            objCVarQuotationRoute.DirectionIconName = objExistingCQuotationRoute.lstCVarQuotationRoute[0].DirectionIconName;
            objCVarQuotationRoute.DirectionIconStyle = objExistingCQuotationRoute.lstCVarQuotationRoute[0].DirectionIconStyle;
            objCVarQuotationRoute.TransportType = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TransportType;
            objCVarQuotationRoute.TransportIconName = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TransportIconName;
            objCVarQuotationRoute.TransportIconStyle = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TransportIconStyle;
            objCVarQuotationRoute.ShipmentType = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ShipmentType;
            objCVarQuotationRoute.POLCountryID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].POLCountryID;
            objCVarQuotationRoute.POL = objExistingCQuotationRoute.lstCVarQuotationRoute[0].POL;
            objCVarQuotationRoute.PODCountryID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].PODCountryID;
            objCVarQuotationRoute.POD = objExistingCQuotationRoute.lstCVarQuotationRoute[0].POD;
            objCVarQuotationRoute.POLID_Transport = objExistingCQuotationRoute.lstCVarQuotationRoute[0].POLID_Transport;
            objCVarQuotationRoute.ClearancePortID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ClearancePortID;
            objCVarQuotationRoute.ClientPlantID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ClientPlantID;
            objCVarQuotationRoute.PickupPlaceID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].PickupPlaceID;
            objCVarQuotationRoute.PickupAddress = objExistingCQuotationRoute.lstCVarQuotationRoute[0].PickupAddress;
            objCVarQuotationRoute.DeliveryAddress = objExistingCQuotationRoute.lstCVarQuotationRoute[0].DeliveryAddress;
            objCVarQuotationRoute.MoveTypeID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].MoveTypeID;
            objCVarQuotationRoute.ExpirationDate = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ExpirationDate;
            objCVarQuotationRoute.ETAPOLDate = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ETAPOLDate;
            objCVarQuotationRoute.ShippingLineID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ShippingLineID;
            objCVarQuotationRoute.AirlineID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].AirlineID;
            objCVarQuotationRoute.TruckerID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TruckerID;
            objCVarQuotationRoute.TransientTime = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TransientTime;
            objCVarQuotationRoute.Validity = objExistingCQuotationRoute.lstCVarQuotationRoute[0].Validity;
            objCVarQuotationRoute.FreeTime = objExistingCQuotationRoute.lstCVarQuotationRoute[0].FreeTime;
            objCVarQuotationRoute.FreeTimePOD = objExistingCQuotationRoute.lstCVarQuotationRoute[0].FreeTimePOD;
            objCVarQuotationRoute.QuotationStageID = CreatedQuoteAndOperStageID;
            objCVarQuotationRoute.Notes = objExistingCQuotationRoute.lstCVarQuotationRoute[0].Notes;
            objCVarQuotationRoute.CommodityID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].CommodityID;
            objCVarQuotationRoute.IncotermID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].IncotermID;

            objCVarQuotationRoute.NumberOfPackages = objExistingCQuotationRoute.lstCVarQuotationRoute[0].NumberOfPackages;
            objCVarQuotationRoute.Volume = objExistingCQuotationRoute.lstCVarQuotationRoute[0].Volume;
            objCVarQuotationRoute.VolumetricWeight = objExistingCQuotationRoute.lstCVarQuotationRoute[0].VolumetricWeight;
            objCVarQuotationRoute.GrossWeight = objExistingCQuotationRoute.lstCVarQuotationRoute[0].GrossWeight;
            objCVarQuotationRoute.ChargeableWeight = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ChargeableWeight;
            objCVarQuotationRoute.FreightRateFormat = objExistingCQuotationRoute.lstCVarQuotationRoute[0].FreightRateFormat;
            objCVarQuotationRoute.ChargeEditApprovalLevel = 0;
            objCVarQuotationRoute.ChargeEdit1stApprovalUserID = 0;
            objCVarQuotationRoute.ChargeEdit2ndApprovalUserID = 0;
            objCVarQuotationRoute.ChargeEdit3rdApprovalUserID = 0;
            objCVarQuotationRoute.ChargeEdit4thApprovalUserID = 0;
            objCVarQuotationRoute.DenialReason = "0";
            objCVarQuotationRoute.CustomsAcceptedValue = 0;
            objCVarQuotationRoute.ETD = DateTime.Parse("01-01-1900");
            objCVarQuotationRoute.StuffingCutOf = DateTime.Parse("01-01-1900");

            objCVarQuotationRoute.CreatorUserID = objCVarQuotationRoute.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarQuotationRoute.CreationDate = objCVarQuotationRoute.ModificationDate = DateTime.Now;

            objCQuotationRoute.lstCVarQuotationRoute.Add(objCVarQuotationRoute);
            checkException = objCQuotationRoute.SaveMethod(objCQuotationRoute.lstCVarQuotationRoute);
            #region Add QuotationCharges
            if (checkException == null)
            {
                _result = true;
                CQuotationCharges objExistingCQuotationCharges = new CQuotationCharges();
                CQuotationCharges objCQuotationCharges = new CQuotationCharges();
                //objExistingCQuotationCharges.GetList("Where QuotationRouteID=" + pQRIDToCopy.ToString());
                int _tempRowCount = 0;
                checkException = objExistingCQuotationCharges.GetListPaging(5000, 1, "Where QuotationRouteID=" + pQRIDToCopy.ToString(), " ID ", out _tempRowCount);

                for (int i = 0; i < objExistingCQuotationCharges.lstCVarQuotationCharges.Count; i++)
                {
                    CVarQuotationCharges objCVarQuotationCharges = new CVarQuotationCharges();
                    objCVarQuotationCharges.ID = 0;
                    objCVarQuotationCharges.QuotationRouteID = objCVarQuotationRoute.ID;
                    objCVarQuotationCharges.ChargeTypeID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ChargeTypeID;
                    objCVarQuotationCharges.MeasurementID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].MeasurementID;
                    objCVarQuotationCharges.ContainerTypeID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ContainerTypeID;
                    objCVarQuotationCharges.DemurrageDays = objExistingCQuotationCharges.lstCVarQuotationCharges[i].DemurrageDays;
                    objCVarQuotationCharges.PackageTypeID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].PackageTypeID;
                    objCVarQuotationCharges.CostQuantity = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostQuantity;
                    objCVarQuotationCharges.CostPrice = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostPrice;
                    objCVarQuotationCharges.CostAmount = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostAmount;
                    objCVarQuotationCharges.CostCurrencyID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostCurrencyID;
                    objCVarQuotationCharges.CostExchangeRate = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostExchangeRate;
                    objCVarQuotationCharges.SaleQuantity = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SaleQuantity;
                    objCVarQuotationCharges.SalePrice = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SalePrice;
                    objCVarQuotationCharges.SaleAmount = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SaleAmount;
                    objCVarQuotationCharges.SaleCurrencyID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SaleCurrencyID;
                    objCVarQuotationCharges.POrC = objExistingCQuotationCharges.lstCVarQuotationCharges[i].POrC;
                    objCVarQuotationCharges.SaleExchangeRate = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SaleExchangeRate;
                    objCVarQuotationCharges.OperationPartnerTypeID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].OperationPartnerTypeID;
                    objCVarQuotationCharges.CustomerID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CustomerID;
                    objCVarQuotationCharges.AgentID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].AgentID;
                    objCVarQuotationCharges.ShippingAgentID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ShippingAgentID;
                    objCVarQuotationCharges.CustomsClearanceAgentID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CustomsClearanceAgentID;
                    objCVarQuotationCharges.ShippingLineID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ShippingLineID;
                    objCVarQuotationCharges.AirlineID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].AirlineID;
                    objCVarQuotationCharges.TruckerID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].TruckerID;
                    objCVarQuotationCharges.SupplierID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SupplierID;
                    objCVarQuotationCharges.Notes = objExistingCQuotationCharges.lstCVarQuotationCharges[i].Notes;
                    objCVarQuotationCharges.HsCode = objExistingCQuotationCharges.lstCVarQuotationCharges[i].HsCode;
                    objCVarQuotationCharges.CustomDuties = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CustomDuties;
                    objCVarQuotationCharges.WTH = objExistingCQuotationCharges.lstCVarQuotationCharges[i].WTH;
                    objCVarQuotationCharges.BankFeeCharges = objExistingCQuotationCharges.lstCVarQuotationCharges[i].BankFeeCharges;
                    objCVarQuotationCharges.commission = objExistingCQuotationCharges.lstCVarQuotationCharges[i].commission;
                    objCVarQuotationCharges.SalesLineCrmCode = "";
                    objCVarQuotationCharges.CostLineCrmCode = "";

                    objCVarQuotationCharges.ViewOrder = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ViewOrder;
                    objCVarQuotationCharges.CreatorUserID = objCVarQuotationCharges.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarQuotationCharges.CreationDate = objCVarQuotationCharges.ModificationDate = DateTime.Now;

                    objCQuotationCharges.lstCVarQuotationCharges.Add(objCVarQuotationCharges);
                }
                objCQuotationCharges.SaveMethod(objCQuotationCharges.lstCVarQuotationCharges);
                objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID=" + objExistingCQuotationRoute.lstCVarQuotationRoute[0].QuotationID, "CodeSerial", out _RowCount);
            }
            #endregion Add QuotationCharges

            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute)
            };
        }

        [HttpGet, HttpPost]
        public object[] QR_PrintChargesLog(string pQuotationRouteIDToPrintChargesLog)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CQuotationRouteLog objCQuotationRouteLog = new CQuotationRouteLog();

            checkException = objCvwQuotationRoute.GetListPaging(999999, 1, "WHERE ID=" + pQuotationRouteIDToPrintChargesLog, "ID", out _RowCount);
            checkException = objCQuotationRouteLog.GetListPaging(999999, 1, "WHERE QuotationRouteID=" + pQuotationRouteIDToPrintChargesLog, "ID DESC", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute[0]) //pData[0]
                , serializer.Serialize(objCQuotationRouteLog.lstCVarQuotationRouteLog) //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] QR_Delete(string pRoutingsIDs, Int64 pQuotationID)
        {
            bool _result = false;
            Exception checkException = null;
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            checkException = objCQuotationRoute.DeleteList("WHERE ID IN (" + pRoutingsIDs + ")");
            if (checkException == null)
                _result = true;
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            Int32 _RowCount = 0;
            objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID = " + pQuotationID.ToString(), "CodeSerial", out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute)
            };
        }
        #endregion QuotationRoute

        #region QuotationCharges
        [HttpGet, HttpPost]
        public Object[] GetQuotationCharges(int pQuotationRouteID)
        {
            int _rowCount = 0;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
            objCvwQuotationCharges.GetListPaging(9999, 1, "WHERE QuotationRouteID = " + pQuotationRouteID, "ID", out _rowCount);

            var CategoriesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM ChargeTypeGroup", typeof(CVarChargeTypeGroup)).Cast<CVarChargeTypeGroup>().ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwQuotationCharges.lstCVarvwQuotationCharges),
                serializer.Serialize(CategoriesList)
            };
        }
            #endregion
            #region FleetQuotation
            [HttpPost]
        public object[] FleetQuotation_Update([FromBody] UpdateFleetQuotationData updateFleetQuotationData)
        {
            string _ReturnedMessage = "";
            string _UpdateClause = "";
            Exception checkException = null;
            //int _RowCount = 0;
            CQuotations objCQuotations = new CQuotations();
            _UpdateClause = "CustomerID=" + updateFleetQuotationData.pCustomerID + "\n";
            _UpdateClause += updateFleetQuotationData.pOpenDate == "0" ? " ,OpenDate = NULL " : (" ,OpenDate = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(updateFleetQuotationData.pOpenDate, 1) + "'") + "\n";
            _UpdateClause += updateFleetQuotationData.pCloseDate == "0" ? " ,CloseDate = NULL " : (" ,CloseDate = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(updateFleetQuotationData.pCloseDate, 1) + "'") + "\n";
            _UpdateClause += ",TemplateID=" + (updateFleetQuotationData.pTemplateID == 0 ? "NULL " : updateFleetQuotationData.pTemplateID.ToString()) + "\n";
            _UpdateClause += ",Subject=N'" + updateFleetQuotationData.pSubject + "'" + "\n";
            _UpdateClause += ",TermsAndConditions=N'" + updateFleetQuotationData.pTermsAndConditions + "'" + "\n";
            _UpdateClause += ",Notes=N'" + updateFleetQuotationData.pNotes + "'" + "\n";
            _UpdateClause += ",ModificatorUserID=" + WebSecurity.CurrentUserId + "\n";
            _UpdateClause += ",ModificationDate=GETDATE()" + "\n";
            _UpdateClause += "WHERE ID=" + updateFleetQuotationData.pFleetQuotationID + "\n";
            checkException = objCQuotations.UpdateList(_UpdateClause);
            if (checkException != null)
                _ReturnedMessage = checkException.Message;
            return new object[]
            {
                _ReturnedMessage
            };
        }

        [HttpGet, HttpPost]
        public object[] FleetQuotationDetails_GetModalControls(int pDummyToFillFleetQuotationDetailsModal)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CCommodities objCCommodities = new CCommodities();
            CPorts objCPorts = new CPorts();
            CTemplate objCTemplate = new CTemplate();
            CDefaults objCDefaults = new CDefaults();
            CDevisons objCDivision = new CDevisons();
            CNoAccessEquipmentType objCEquipmentType = new CNoAccessEquipmentType();

            string _WhereClausePort = "";
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            _WhereClausePort = objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "CAL"
                ? "WHERE IsFactories=1"
                : "WHERE IsInland=1 AND IsFactories=0 AND CountryID=" + objCDefaults.lstCVarDefaults[0].DefaultCountryID;
            checkException = objCCommodities.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            checkException = objCPorts.GetListPaging(999999, 1, _WhereClausePort, "Name", out _RowCount);
            checkException = objCTemplate.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            checkException = objCDivision.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            checkException = objCEquipmentType.GetListPaging(999999, 1, "WHERE IsInactive=0", "ID", out _RowCount);
            #region GetMinimal
            var pCommodityList = objCCommodities.lstCVarCommodities
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                //.Distinct().OrderBy(o => o.Name)
                .ToList();
            var pPortList = objCPorts.lstCVarPorts
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    CountryID = s.CountryID
                })
                //.Distinct().OrderBy(o => o.Name)
                .ToList();
            var pTemplateList = objCTemplate.lstCVarTemplate
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    Subject = s.Subject
                    ,
                    TermsAndConditions = s.TermsAndConditions
                })
                //.Distinct().OrderBy(o => o.Name)
                .ToList();
            #endregion GetMinimal

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(pCommodityList) //pData[0]
                , serializer.Serialize(pPortList) //pData[1]
                , serializer.Serialize(pTemplateList) //pData[2]
                , serializer.Serialize(objCDivision.lstCVarDevisons) //pData[3]
                , serializer.Serialize(objCEquipmentType.lstCVarNoAccessEquipmentType) //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] FleetQuotation_LoadHeaderWithApprovedTransportOrders(Int64 pQuotationID_ToGetApprovedOrders, string pWhereClauseTransportOrderItems
            , string pOption, bool pIsGroupedCutoff, bool pcbIsRemoveInvoicedOrders)
        {
            CvwQuotations objCvwQuotations = new CvwQuotations();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            CCustomers objCCustomers = new CCustomers();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCvwQuotations.GetListPaging(99999, 1, "WHERE ID=" + pQuotationID_ToGetApprovedOrders, "ID", out _RowCount);
            checkException = objCCustomers.GetListPaging(99999, 1, "WHERE ID=" + objCvwQuotations.lstCVarvwQuotations[0].ClientID, "ID", out _RowCount);
            checkException = objCvwRoutings.GetListPaging(99999, 1, pWhereClauseTransportOrderItems, "ID", out _RowCount);
            var pTruckingOrderList = pIsGroupedCutoff
                ? objCvwRoutings.lstCVarvwRoutings
                .GroupBy(g => new
                {
                    g.QuotationRouteID,
                    g.POL,
                    g.POD,
                    g.CommodityID,
                    g.DivisionID,
                    g.EquipmentModelNameFromQuotation
                ,
                    g.DriverName,
                    g.LastTruckCounter,
                    g.TruckCounter,
                    g.Notes,
                    g.CargoReturnGrossWeight
                })
                .Select(s => new
                { //Dont change order coz exporting to excel uses order
                    QuotationRouteOrTransportOrderID = s.First().QuotationRouteID
                    ,
                    ClientName = s.First().ClientName
                    ,
                    DivisionName = s.First().DivisionName
                    ,
                    QuotationRouteOrTrnasportOrderCode = s.First().QuotationRouteCode
                    ,
                    POLName = s.First().POLName
                    ,
                    PODName = s.First().PODName
                    ,
                    CommodityName = s.First().CommodityName
                    ,
                    EquipmentModelNameFromQuotation = s.First().EquipmentModelNameFromQuotation
                    ,
                    Count = s.Count() //s.Count(i => i.IsApproved)
                    ,
                    Sale = s.Sum(g => g.Sale)
                    ,
                    GateOutDate = "⁤" + "⁤01/01/1900"//s.GateOutDate //to be the same for grouping // Adding U+2064 INVISIBLE PLUS To Force excel to treat it as String not data time to filter as text
                    ,
                    ModificationDateString = "⁤" + "⁤01/01/1900"//s.ModificationDate // Adding U+2064 INVISIBLE PLUS To Force excel to treat it as String not data time to filter as text
                    ,
                    InvoiceNumber = ""
                    ,
                    DriverName = "",
                    LastTruckCounter = 0,
                    TruckCounter = 0,
                    Notes = "",
                    CargoReturnGrossWeight = decimal.Parse("0")
                })
                //.Distinct()
                //.OrderBy(o => o.Name)
                .ToList()
            : objCvwRoutings.lstCVarvwRoutings
                //.GroupBy(g => new { g.QuotationRouteID, g.POL, g.POD, g.CommodityID, g.DivisionID, g.EquipmentModelNameFromQuotation })
                .Select(s => new
                { //Dont change order coz exporting to excel uses order
                    QuotationRouteOrTransportOrderID = s.ID
                    ,
                    ClientName = s.ClientName
                    ,
                    DivisionName = s.DivisionName
                    ,
                    QuotationRouteOrTrnasportOrderCode = s.TruckingOrderCode
                    ,
                    POLName = s.POLName
                    ,
                    PODName = s.PODName
                    ,
                    CommodityName = s.CommodityName
                    ,
                    EquipmentModelNameFromQuotation = s.EquipmentModelNameFromQuotation
                    ,
                    Count = 1 //s.Count(i => i.IsApproved)
                    ,
                    Sale = s.Sale
                    ,
                    GateOutDate = "⁤" + s.GateOutDate // Adding U+2064 INVISIBLE PLUS To Force excel to treat it as String not data time to filter as text
                    ,
                    ModificationDateString = "⁤" + s.ModificationDateString // Adding U+2064 INVISIBLE PLUS To Force excel to treat it as String not data time  to filter as text
                    ,
                    InvoiceNumber = pcbIsRemoveInvoicedOrders ? s.InvoiceNumber.ToString() + "/" + s.InvoiceDate.Year : ""
                    ,
                    DriverName = s.EquipmentDriverName == "0" ? s.DriverName : s.mEquipmentDriverName
                    ,
                    LastTruckCounter = s.LastTruckCounter,
                    TruckCounter = s.TruckCounter,
                    Notes = s.Notes == "0" ? "" : s.Notes,
                    CargoReturnGrossWeight = s.CargoReturnGrossWeight
                })
                //.Distinct()
                //.OrderBy(o => o.Name)
                .ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwQuotations.lstCVarvwQuotations[0]) //pData[0]
                , serializer.Serialize(pTruckingOrderList) //pData[1]
                , objCCustomers.lstCVarCustomers.Count > 0 ? serializer.Serialize(objCCustomers.lstCVarCustomers[0]) : null //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] FleetQuotation_CreateCutoffInvoice([FromBody] FleetCutoffInvoiceData fleetCutoffInvoiceData) //if pIsGroupedCutoff --> the IDs are for quotation route else transport orders
        {
            string _ReturnedMessage = "";
            string pWhereClauseRoute = "";
            string pWhereClause = "";
            int _RowCount = 0;
            int pCustomerID = 0;
            int pPaymentDays = 0;
            Int64 pInvoiceID = 0;
            Int64 pOperationID = 0;
            Int64 pOperationPartnerID = 0;
            Exception checkException = null;
            var constClientOperationPartnerTypeID = 200;
            CDefaults objCDefaults = new CDefaults();
            COperations objCOperations = new COperations();
            COperationPartners objCOperationPartners = new COperationPartners();
            CRoutings objCRoutings = new CRoutings();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            CvwCustomers objCvwCustomers = new CvwCustomers();
            CChargeTypes objCChargeTypes = new CChargeTypes();
            CInvoiceTypes objCInvoiceTypes = new CInvoiceTypes();
            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            CvwInvoices objCvwInvoices = new CvwInvoices();
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CvwRoutings objCFleetOrder = new CvwRoutings();
            object pFleetOrdersList = null;
            #region Retreive Data
            checkException = objCDefaults.GetListPaging(99999, 1, "WHERE 1=1", "ID", out _RowCount);
            checkException = objCOperations.GetListPaging(99999, 1, "WHERE IsFleet=1", "ID", out _RowCount);
            checkException = objCInvoiceTypes.GetListPaging(999999, 1, "WHERE Code LIKE N'INV%'", "ID", out _RowCount);
            checkException = objCPaymentTerms.GetListPaging(999999, 1, "WHERE ID=" + fleetCutoffInvoiceData.pPaymentTermID, "ID", out _RowCount);
            if (objCPaymentTerms.lstCVarPaymentTerms.Count > 0)
                pPaymentDays = objCPaymentTerms.lstCVarPaymentTerms[0].Days;
            checkException = objCvwRoutings.GetListPaging(99999, 1, "WHERE CustomerID=" + pCustomerID, "ID", out _RowCount);
            if (fleetCutoffInvoiceData.pIsGroupedCutoff)
            {
                pWhereClauseRoute = "WHERE QuotationRouteID IN(" + fleetCutoffInvoiceData.pApprovedQuotationRouteOrTransportOrderIDs + ") AND Sale>0" + "\n";
                pWhereClauseRoute += "AND RoutingTypeID=60 AND IsApproved=1 AND InvoiceID IS NULL" + "\n";
                if (1 == 1 /*objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL"*/)
                {
                    pWhereClauseRoute += "AND CONVERT(date,GateOutDate,103) >='" + fleetCutoffInvoiceData.pFromDate + "'" + "\n";
                    pWhereClauseRoute += "AND CONVERT(date,GateOutDate,103) <='" + fleetCutoffInvoiceData.pCutOffDate + "'" + "\n";
                }
                //else
                //{
                //    pWhereClauseRoute += "AND CAST(CreationDate AS DATE) >='" + pFromDate + "'" + "\n";
                //    pWhereClauseRoute += "AND CAST(CreationDate AS DATE) <='" + pCutOffDate + "'" + "\n";
                //}
            }
            else
                pWhereClauseRoute = "WHERE ID IN(" + fleetCutoffInvoiceData.pApprovedQuotationRouteOrTransportOrderIDs + ") AND Sale>0" + "\n";
            checkException = objCvwRoutings.GetListPaging(99999, 1, pWhereClauseRoute, "ID", out _RowCount);
            pCustomerID = objCvwRoutings.lstCVarvwRoutings[0].CustomerID;
            checkException = objCvwCustomers.GetListPaging(99999, 1, "WHERE ID=" + pCustomerID, "ID", out _RowCount);
            pOperationID = objCOperations.lstCVarOperations[0].ID;
            #region if customer not in OperationPartners then add it
            checkException = objCOperationPartners.GetListPaging(99999, 1, "WHERE OperationID=" + pOperationID + " AND CustomerID=" + pCustomerID, "ID", out _RowCount);
            if (objCOperationPartners.lstCVarOperationPartners.Count == 0)
            {
                CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();
                objCVarOperationPartners.OperationID = objCOperations.lstCVarOperations[0].ID;
                objCVarOperationPartners.OperationPartnerTypeID = constClientOperationPartnerTypeID;
                objCVarOperationPartners.CustomerID = pCustomerID;
                objCVarOperationPartners.AgentID = 0;
                objCVarOperationPartners.ShippingAgentID = 0;
                objCVarOperationPartners.CustomsClearanceAgentID = 0;
                objCVarOperationPartners.ShippingLineID = 0;
                objCVarOperationPartners.AirlineID = 0;
                objCVarOperationPartners.TruckerID = 0;
                objCVarOperationPartners.SupplierID = 0;
                objCVarOperationPartners.CustodyID = 0;
                objCVarOperationPartners.ContactID = 0;
                objCVarOperationPartners.IsOperationClient = false;
                objCVarOperationPartners.CreatorUserID = objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperationPartners.CreationDate = objCVarOperationPartners.ModificationDate = DateTime.Now;

                objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);
                checkException = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
                pOperationPartnerID = objCVarOperationPartners.ID;
            }
            else
                pOperationPartnerID = objCOperationPartners.lstCVarOperationPartners[0].ID;
            #endregion if customer not in OperationPartners then add it

            //Set ChargeType WhereClause
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                pWhereClause = objCvwCustomers.lstCVarvwCustomers[0].IsinternalCustomer ? "WHERE Code=N'INT TRANS'" : "WHERE Code=N'Ex TRANS'";
            else
                pWhereClause = "WHERE Code = N'TRANSPORT'";
            checkException = objCChargeTypes.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);
            #endregion Retreive Data

            #region Create Invoice if data is OK
            if (objCvwCustomers.lstCVarvwCustomers[0].IsInactive)
                _ReturnedMessage = "This customer is inactive";
            else if (objCChargeTypes.lstCVarChargeTypes.Count == 0)
                _ReturnedMessage = "Please, Add charge type with code 'TRANSPORT'";
            else if (objCInvoiceTypes.lstCVarInvoiceTypes.Count == 0)
                _ReturnedMessage = "Please, Create Invoice type.";
            else
            {
                decimal pReceivableSum = objCvwRoutings.lstCVarvwRoutings.Sum(s => s.Sale);
                decimal pAmountWithoutVAT = Math.Round(pReceivableSum, 2);
                decimal pTaxAmount = Math.Round(((pAmountWithoutVAT * fleetCutoffInvoiceData.pTaxPercentage) / 100), 2);
                pTaxAmount = Math.Round(((pReceivableSum * fleetCutoffInvoiceData.pTaxPercentage) / 100), 2);
                CVarInvoices objCVarInvoices = new CVarInvoices();
                #region Save InvoiceHeader
                objCVarInvoices.InvoiceNumber = 0;
                objCVarInvoices.OperationID = pOperationID;
                objCVarInvoices.OperationPartnerID = pOperationPartnerID;
                objCVarInvoices.AddressID = 0;
                objCVarInvoices.InvoiceTypeID = objCInvoiceTypes.lstCVarInvoiceTypes[0].ID;
                objCVarInvoices.PrintedAddress = objCvwCustomers.lstCVarvwCustomers[0].Address;
                objCVarInvoices.CustomerReference = "0";
                objCVarInvoices.PaymentTermID = fleetCutoffInvoiceData.pPaymentTermID;
                objCVarInvoices.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                objCVarInvoices.ExchangeRate = 1;
                objCVarInvoices.InvoiceDate = DateTime.Now;
                objCVarInvoices.DueDate = DateTime.Now.AddDays(pPaymentDays);
                objCVarInvoices.AmountWithoutVAT = Math.Round(pReceivableSum, 2);
                objCVarInvoices.TaxTypeID = objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? 0 : fleetCutoffInvoiceData.pTaxTypeID;
                objCVarInvoices.TaxPercentage = objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? 0 : fleetCutoffInvoiceData.pTaxPercentage;
                objCVarInvoices.TaxAmount = objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? 0 : pTaxAmount;
                objCVarInvoices.DiscountTypeID = 0;
                objCVarInvoices.DiscountPercentage = 0;
                objCVarInvoices.DiscountAmount = 0;
                objCVarInvoices.FixedDiscount = 0;
                objCVarInvoices.Amount = objCVarInvoices.AmountWithoutVAT + pTaxAmount; //i have one receivable, so where TaxOnItems or not TaxAmount is the same
                                                                                        //objCVarInvoices.PaidAmount = pPaidAmount;
                                                                                        //objCVarInvoices.RemainingAmount = pRemainingAmount;
                objCVarInvoices.InvoiceStatusID = 1;
                objCVarInvoices.IsApproved = false;
                objCVarInvoices.LeftSignature = "0";
                objCVarInvoices.MiddleSignature = "0";
                objCVarInvoices.RightSignature = "0";
                objCVarInvoices.GRT = "0";
                objCVarInvoices.DWT = "0";
                objCVarInvoices.NRT = "0";
                objCVarInvoices.LOA = "0";
                objCVarInvoices.EditableNotes = fleetCutoffInvoiceData.pEditableNotes;  
                objCVarInvoices.OperationContainersAndPackagesID = 0;
                objCVarInvoices.TransactionTypeID = fleetCutoffInvoiceData.pTransactionTypeID;
                objCVarInvoices.Notes = "Fleet CutOff from "
                    + fleetCutoffInvoiceData.pFromDate.Substring(6, 2) + "/" + fleetCutoffInvoiceData.pFromDate.Substring(4, 2) + "/" + fleetCutoffInvoiceData.pFromDate.Substring(0, 4)
                    + " to "
                    + fleetCutoffInvoiceData.pCutOffDate.Substring(6, 2) + "/" + fleetCutoffInvoiceData.pCutOffDate.Substring(4, 2) + "/" + fleetCutoffInvoiceData.pCutOffDate.Substring(0, 4);
                objCVarInvoices.CutOffDate = DateTime.ParseExact(fleetCutoffInvoiceData.pCutOffDate + " 00.00.00.000", "yyyyMMdd hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarInvoices.IsFleet = true;
                objCVarInvoices.CreatorUserID = objCVarInvoices.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarInvoices.CreationDate = objCVarInvoices.ModificationDate = DateTime.Now;
                objCVarInvoices.TariffID = 0;
                objCVarInvoices.OnBehalfName = "";
                objCVarInvoices.PortalOperationPartnerID = pOperationPartnerID;
                objCVarInvoices.StorageFromDate = DateTime.Parse("01/01/1900");
                objCVarInvoices.StorageToDate = DateTime.Parse("01/01/1900");
                objCVarInvoices.USDPerContainer = 0;
                objCVarInvoices.PartnerVATNumber = "0";

                CInvoices objCInvoices = new CInvoices();
                objCInvoices.lstCVarInvoices.Add(objCVarInvoices);
                checkException = objCInvoices.SaveMethod(objCInvoices.lstCVarInvoices);
                pInvoiceID = objCVarInvoices.ID;
                #endregion Save InvoiceHeader

                #region Save Receivable
                if (checkException == null)
                {
                    CVarReceivables objCVarReceivables = new CVarReceivables();
                    objCVarReceivables.CreatorUserID = WebSecurity.CurrentUserId;
                    objCVarReceivables.CreationDate = DateTime.Now;
                    objCVarReceivables.GeneratingQRID = 0;
                    objCVarReceivables.InvoiceID = pInvoiceID;
                    objCVarReceivables.AccNoteID = 0;
                    objCVarReceivables.OperationContainersAndPackagesID = 0;
                    objCVarReceivables.HouseBillID = 0;

                    objCVarReceivables.OperationVehicleID = 0;
                    objCVarReceivables.VehicleAgingReportID = 0;

                    objCVarReceivables.ID = 0;

                    objCVarReceivables.OperationID = pOperationID;
                    objCVarReceivables.ChargeTypeID = objCChargeTypes.lstCVarChargeTypes[0].ID;
                    objCVarReceivables.POrC = 0;
                    objCVarReceivables.MeasurementID = 0;
                    objCVarReceivables.ContainerTypeID = 0;
                    objCVarReceivables.SupplierID = 0;
                    objCVarReceivables.Quantity = 1;
                    objCVarReceivables.CostPrice = 0;
                    objCVarReceivables.CostAmount = 0;

                    objCVarReceivables.SalePrice = pAmountWithoutVAT;

                    objCVarReceivables.AmountWithoutVAT = pAmountWithoutVAT;
                    objCVarReceivables.TaxeTypeID = objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? fleetCutoffInvoiceData.pTaxTypeID : 0;
                    objCVarReceivables.TaxPercentage = objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? fleetCutoffInvoiceData.pTaxPercentage : 0;
                    objCVarReceivables.TaxAmount = objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? pTaxAmount : 0;
                    objCVarReceivables.DiscountTypeID = 0;
                    objCVarReceivables.DiscountPercentage = 0;
                    objCVarReceivables.DiscountAmount = 0;

                    objCVarReceivables.SaleAmount = objCVarReceivables.AmountWithoutVAT + objCVarReceivables.TaxAmount;
                    objCVarReceivables.ExchangeRate = 1;
                    objCVarReceivables.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                    objCVarReceivables.Notes = "Fleet CutOff on " + fleetCutoffInvoiceData.pCutOffDate.Substring(6, 2) + "/" + fleetCutoffInvoiceData.pCutOffDate.Substring(4, 2) + "/" + fleetCutoffInvoiceData.pCutOffDate.Substring(0, 4) + " (" + objCvwRoutings.lstCVarvwRoutings[0].POLName + "-->" + objCvwRoutings.lstCVarvwRoutings[0].PODName + ")";

                    objCVarReceivables.IssueDate = DateTime.Now;

                    objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.CutOffDate = DateTime.ParseExact(fleetCutoffInvoiceData.pCutOffDate + " 00.00.00.000", "yyyyMMdd hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.ReceiptNo = "";
                    objCVarReceivables.TariffID = 0;
                    objCVarReceivables.ManualChargeType = "0";
                    objCVarReceivables.CostCenterId = 0;
                    objCVarReceivables.IsOfficial = false;
                    objCVarReceivables.crmCode = "";

                    objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarReceivables.ModificationDate = DateTime.Now;

                    CReceivables objCReceivables = new CReceivables();
                    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                    checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                }
                #endregion Save Receivable
                #region Update InvoiceID for Routes added to invoice
                checkException = objCRoutings.UpdateList("InvoiceID=" + pInvoiceID + " " + pWhereClauseRoute);
                #endregion Update InvoiceID for Routes added to invoice

                #region Get Returned Data
                if (_ReturnedMessage == "")
                {
                    checkException = objCvwInvoices.GetListPaging(999999, 1, "WHERE ID=" + pInvoiceID, "ID", out _RowCount);
                    checkException = objCvwReceivables.GetListPaging(999999, 1, "WHERE InvoiceID=" + pInvoiceID, "ID", out _RowCount);
                    objCFleetOrder.GetListPaging(999999, 1, ("WHERE InvoiceID=" + pInvoiceID), "ID", out _RowCount);
                }
                #endregion Get Returned Data
            }
            #region Get fleet invoice details to print
            var pReceivableList = objCvwReceivables.lstCVarvwReceivables
                .GroupBy(g => new { g.CurrencyCode, g.ChargeTypeCode, g.Quantity, g.Notes })
                .Select(s => new
                {
                    ChargeTypeName = s.First().ChargeTypeCode
                    ,
                    Notes = s.First().Notes
                    ,
                    Quantity = s.First().Quantity
                    ,
                    SalePrice = s.Sum(i => i.SalePrice)
                    ,
                    AmountWithoutVAT = s.Sum(i => i.AmountWithoutVAT)
                    ,
                    TaxAmount = s.Sum(i => i.TaxAmount)
                    ,
                    DiscountAmount = s.Sum(i => i.DiscountAmount)
                    ,
                    SaleAmount = s.Sum(i => i.SaleAmount)
                    ,
                    CurrencyCode = s.First().CurrencyCode
                })
                .Distinct()
                //.OrderBy(o => o.Name)
                .ToList();
            pFleetOrdersList = objCFleetOrder.lstCVarvwRoutings
                    .GroupBy(g => new { g.POLName, g.PODName, g.DivisionID, g.Sale })
                    .Select(s => new
                    {
                        ChargeTypeName = s.First().POLName + " --> " + s.First().PODName
                        ,
                        DivisionName = s.First().DivisionName
                        ,
                        Notes = ""//s.First().Notes
                        ,
                        Quantity = s.Count()
                        ,
                        SalePrice = s.First().Sale //s.Sum(i => i.Sale) / s.Count()
                        ,
                        AmountWithoutVAT = s.Sum(i => i.Sale)
                        ,
                        TaxAmount = pReceivableList.Count > 0 ? ((s.Sum(i => i.Sale) * objCvwReceivables.lstCVarvwReceivables[0].TaxPercentage) / 100) : 0
                        ,
                        DiscountAmount = 0 //s.Sum(i => i.DiscountAmount)
                        ,
                        SaleAmount = 0 //Calculate in printing as AmountWithoutVAT + TaxAmount
                                       //,
                                       //CurrencyCode = s.First().CurrencyCode
                    })
                    //.Distinct()
                    //.OrderBy(o => o.Name)
                    .ToList();
            #endregion Get fleet invoice details to print

            #endregion Create Invoice if data is OK

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _ReturnedMessage
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwInvoices.lstCVarvwInvoices[0]) : null
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwReceivables.lstCVarvwReceivables) : null
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwCustomers.lstCVarvwCustomers[0]) : null
                , serializer.Serialize(pFleetOrdersList) //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] FleetApprovedTransportOrder_AddInvoicedOrders([FromBody] AddInvoicedOrdersData addInvoicedOrdersData)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CReceivables objCReceivables = new CReceivables();
            CRoutings objCRoutings = new CRoutings();
            CInvoices objCInvoices = new CInvoices();
            CDefaults objCDefaults = new CDefaults();
            CvwInvoices objCvwInvoices = new CvwInvoices();
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CvwRoutings objCFleetOrder = new CvwRoutings();
            CvwCustomers objCvwCustomers = new CvwCustomers();

            Int64 _InvoiceID = addInvoicedOrdersData.pInvoiceID;
            string _UpdateClause = "";
            checkException = objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            _InvoiceID = addInvoicedOrdersData.pInvoiceID;
            checkException = objCInvoices.GetListPaging(1, 1, "WHERE ID=" + _InvoiceID, "ID", out _RowCount);
            if (objCInvoices.lstCVarInvoices[0].IsApproved)
                _ReturnedMessage = "Sorry, the selected invoice is approved.";
            else
            {
                #region Recalculate Invoice And Receivables
                checkException = objCReceivables.GetListPaging(1, 1, "WHERE InvoiceID=" + _InvoiceID, "ID", out _RowCount);
                decimal _TaxPercentage = objCReceivables.lstCVarReceivables[0].TaxPercentage;
                _UpdateClause = "InvoiceID=" + _InvoiceID + " \n";
                //_UpdateClause += ",RoadNumber=N'Added to invoice " + objCInvoices.lstCVarInvoices[0].InvoiceNumber + " by " + WebSecurity.CurrentUserName + " at ' + CONVERT(VARCHAR(20),GETDATE(), 103) " + " \n";
                _UpdateClause += " WHERE ID IN (" + addInvoicedOrdersData.pTransportOrderIDsToAdd + ")";
                checkException = objCRoutings.UpdateList(_UpdateClause);
                if (checkException == null)
                {
                    checkException = objCRoutings.GetListPaging(999999, 1, "WHERE InvoiceID IN (" + _InvoiceID + ")", "ID", out _RowCount);
                    decimal pReceivableSum = objCRoutings.lstCVarRoutings.Sum(s => s.Sale);
                    decimal pAmountWithoutVAT = Math.Round(pReceivableSum, 2);
                    decimal pTaxAmount = Math.Round(((pAmountWithoutVAT * _TaxPercentage) / 100), 2);
                    #region Receivables
                    pTaxAmount = Math.Round(((pReceivableSum * _TaxPercentage) / 100), 2);
                    _UpdateClause = "SalePrice=" + pAmountWithoutVAT + " \n";
                    _UpdateClause += ",TaxAmount=" + (objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? pTaxAmount.ToString() : "null") + " \n";
                    _UpdateClause += ",AmountWithoutVAT=" + pAmountWithoutVAT + " \n";
                    _UpdateClause += ",SaleAmount=" + (objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? (pAmountWithoutVAT + pTaxAmount) : pAmountWithoutVAT) + " \n";
                    _UpdateClause += "WHERE ID=" + objCReceivables.lstCVarReceivables[0].ID + " \n";
                    checkException = objCReceivables.UpdateList(_UpdateClause);
                    #endregion Receivables
                    #region Invoice
                    _UpdateClause = "AmountWithoutVAT=" + pAmountWithoutVAT + " \n";
                    _UpdateClause += ",TaxAmount=" + (objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? "null" : pTaxAmount.ToString()) + " \n";
                    _UpdateClause += ",Amount=" + (pAmountWithoutVAT + pTaxAmount) + " \n";
                    _UpdateClause += ",Notes=N'Fleet orders add to invoice " + objCInvoices.lstCVarInvoices[0].InvoiceNumber + " by " + WebSecurity.CurrentUserName + " at ' + CONVERT(VARCHAR(20),GETDATE(), 103) " + " \n";
                    _UpdateClause += "WHERE ID=" + _InvoiceID + " \n";
                    checkException = objCInvoices.UpdateList(_UpdateClause);
                    #endregion Invoice
                }
                #endregion Recalculate Invoice And Receivables
                #region Get Returned Data
                if (_ReturnedMessage == "")
                {
                    checkException = objCvwInvoices.GetListPaging(999999, 1, "WHERE ID=" + _InvoiceID, "ID", out _RowCount);
                    checkException = objCvwReceivables.GetListPaging(999999, 1, "WHERE InvoiceID=" + _InvoiceID, "ID", out _RowCount);
                    checkException = objCFleetOrder.GetListPaging(999999, 1, ("WHERE InvoiceID=" + _InvoiceID), "ID", out _RowCount);
                    checkException = objCvwCustomers.GetListPaging(99999, 1, "WHERE ID=" + objCvwInvoices.lstCVarvwInvoices[0].PartnerID, "ID", out _RowCount);
                }
                #endregion Get Returned Data
            } //EOF else if (objCInvoices.lstCVarInvoices[0].IsApproved)
            #region Get fleet invoice details to print
            var pReceivableList = objCvwReceivables.lstCVarvwReceivables
                .GroupBy(g => new { g.CurrencyCode, g.ChargeTypeCode, g.Quantity, g.Notes })
                .Select(s => new
                {
                    ChargeTypeName = s.First().ChargeTypeCode
                    ,
                    Notes = s.First().Notes
                    ,
                    Quantity = s.First().Quantity
                    ,
                    SalePrice = s.Sum(i => i.SalePrice)
                    ,
                    AmountWithoutVAT = s.Sum(i => i.AmountWithoutVAT)
                    ,
                    TaxAmount = s.Sum(i => i.TaxAmount)
                    ,
                    DiscountAmount = s.Sum(i => i.DiscountAmount)
                    ,
                    SaleAmount = s.Sum(i => i.SaleAmount)
                    ,
                    CurrencyCode = s.First().CurrencyCode
                })
                .Distinct()
                //.OrderBy(o => o.Name)
                .ToList();
            var pFleetOrdersList = objCFleetOrder.lstCVarvwRoutings
                    .GroupBy(g => new { g.POLName, g.PODName, g.DivisionID, g.Sale })
                    .Select(s => new
                    {
                        ChargeTypeName = s.First().POLName + " --> " + s.First().PODName
                        ,
                        DivisionName = s.First().DivisionName
                        ,
                        Notes = ""//s.First().Notes
                        ,
                        Quantity = s.Count()
                        ,
                        SalePrice = s.First().Sale //s.Sum(i => i.Sale) / s.Count()
                        ,
                        AmountWithoutVAT = s.Sum(i => i.Sale)
                        ,
                        TaxAmount = pReceivableList.Count > 0 ? ((s.Sum(i => i.Sale) * objCvwReceivables.lstCVarvwReceivables[0].TaxPercentage) / 100) : 0
                        ,
                        DiscountAmount = 0 //s.Sum(i => i.DiscountAmount)
                        ,
                        SaleAmount = 0 //Calculate in printing as AmountWithoutVAT + TaxAmount
                                       //,
                                       //CurrencyCode = s.First().CurrencyCode
                    })
                    //.Distinct()
                    //.OrderBy(o => o.Name)
                    .ToList();
            #endregion Get fleet invoice details to print
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwInvoices.lstCVarvwInvoices[0]) : null
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwReceivables.lstCVarvwReceivables) : null
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwCustomers.lstCVarvwCustomers[0]) : null
                , serializer.Serialize(pFleetOrdersList) //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] FleetApprovedTransportOrder_RemoveInvoicedOrders([FromBody] RemoveInvoicedOrdersData removeInvoicedOrdersData)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CReceivables objCReceivables = new CReceivables();
            CRoutings objCRoutings = new CRoutings();
            CInvoices objCInvoices = new CInvoices();
            CDefaults objCDefaults = new CDefaults();
            CvwInvoices objCvwInvoices = new CvwInvoices();
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CvwRoutings objCFleetOrder = new CvwRoutings();
            CvwCustomers objCvwCustomers = new CvwCustomers();

            Int64 _InvoiceID = 0;
            string _UpdateClause = "";
            checkException = objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            checkException = objCRoutings.GetListPaging(999999, 1, "WHERE ID IN (" + removeInvoicedOrdersData.pTransportOrderIDsToRemove + ")", "ID", out _RowCount);
            _InvoiceID = objCRoutings.lstCVarRoutings[0].InvoiceID;
            checkException = objCInvoices.GetListPaging(1, 1, "WHERE ID=" + _InvoiceID, "ID", out _RowCount);
            if (objCInvoices.lstCVarInvoices[0].IsApproved)
                _ReturnedMessage = "Sorry, the selected invoice is approved.";
            else
            {
                var pDistinctInvoiceIDs = objCRoutings.lstCVarRoutings
                    .GroupBy(g => new { g.InvoiceID })
                    .Select(s => new
                    {
                        InvoiceID = s.First().InvoiceID
                    })
                    .Distinct()
                    .ToList();
                if (pDistinctInvoiceIDs.Count != 1)
                    _ReturnedMessage = "Trucking orders must be for only one invoice.";
                #region 1 Invoice so remove
                else
                {
                    checkException = objCReceivables.GetListPaging(1, 1, "WHERE InvoiceID=" + _InvoiceID, "ID", out _RowCount);
                    decimal _TaxPercentage = objCReceivables.lstCVarReceivables[0].TaxPercentage;
                    _UpdateClause = "InvoiceID=null" + " \n";
                    //_UpdateClause += ",RoadNumber=N'Removed from invoice " + objCInvoices.lstCVarInvoices[0].InvoiceNumber + " by " + WebSecurity.CurrentUserName + " at ' + CONVERT(VARCHAR(20),GETDATE(), 103) " + " \n";
                    _UpdateClause += " WHERE ID IN (" + removeInvoicedOrdersData.pTransportOrderIDsToRemove + ")";
                    checkException = objCRoutings.UpdateList(_UpdateClause);
                    #region Recalculate Invoice And Receivables
                    if (checkException == null)
                    {
                        checkException = objCRoutings.GetListPaging(999999, 1, "WHERE InvoiceID IN (" + _InvoiceID + ")", "ID", out _RowCount);
                        decimal pReceivableSum = objCRoutings.lstCVarRoutings.Sum(s => s.Sale);
                        decimal pAmountWithoutVAT = Math.Round(pReceivableSum, 2);
                        decimal pTaxAmount = Math.Round(((pAmountWithoutVAT * _TaxPercentage) / 100), 2);
                        #region Receivables
                        pTaxAmount = Math.Round(((pReceivableSum * _TaxPercentage) / 100), 2);
                        _UpdateClause = "SalePrice=" + pAmountWithoutVAT + " \n";
                        _UpdateClause += ",TaxAmount=" + (objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? pTaxAmount.ToString() : "null") + " \n";
                        _UpdateClause += ",AmountWithoutVAT=" + pAmountWithoutVAT + " \n";
                        _UpdateClause += ",SaleAmount=" + (objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? (pAmountWithoutVAT + pTaxAmount) : pAmountWithoutVAT) + " \n";
                        _UpdateClause += "WHERE ID=" + objCReceivables.lstCVarReceivables[0].ID + " \n";
                        checkException = objCReceivables.UpdateList(_UpdateClause);
                        #endregion Receivables
                        #region Invoice
                        _UpdateClause = "AmountWithoutVAT=" + pAmountWithoutVAT + " \n";
                        _UpdateClause += ",TaxAmount=" + (objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? "null" : pTaxAmount.ToString()) + " \n";
                        _UpdateClause += ",Amount=" + (pAmountWithoutVAT + pTaxAmount) + " \n";
                        _UpdateClause += ",Notes=N'Fleet orders removed from invoice " + objCInvoices.lstCVarInvoices[0].InvoiceNumber + " by " + WebSecurity.CurrentUserName + " at ' + CONVERT(VARCHAR(20),GETDATE(), 103) " + " \n";
                        _UpdateClause += "WHERE ID=" + _InvoiceID + " \n";
                        checkException = objCInvoices.UpdateList(_UpdateClause);
                        #endregion Invoice
                    }
                    #endregion Recalculate Invoice And Receivables
                }
                #endregion 1 Invoice so remove
                #region Get Returned Data
                if (_ReturnedMessage == "")
                {
                    checkException = objCvwInvoices.GetListPaging(999999, 1, "WHERE ID=" + _InvoiceID, "ID", out _RowCount);
                    checkException = objCvwReceivables.GetListPaging(999999, 1, "WHERE InvoiceID=" + _InvoiceID, "ID", out _RowCount);
                    checkException = objCFleetOrder.GetListPaging(999999, 1, ("WHERE InvoiceID=" + _InvoiceID), "ID", out _RowCount);
                    checkException = objCvwCustomers.GetListPaging(99999, 1, "WHERE ID=" + objCvwInvoices.lstCVarvwInvoices[0].PartnerID, "ID", out _RowCount);
                }
                #endregion Get Returned Data
            } //EOF else if (objCInvoices.lstCVarInvoices[0].IsApproved)
            #region Get fleet invoice details to print
            var pReceivableList = objCvwReceivables.lstCVarvwReceivables
                .GroupBy(g => new { g.CurrencyCode, g.ChargeTypeCode, g.Quantity, g.Notes })
                .Select(s => new
                {
                    ChargeTypeName = s.First().ChargeTypeCode
                    ,
                    Notes = s.First().Notes
                    ,
                    Quantity = s.First().Quantity
                    ,
                    SalePrice = s.Sum(i => i.SalePrice)
                    ,
                    AmountWithoutVAT = s.Sum(i => i.AmountWithoutVAT)
                    ,
                    TaxAmount = s.Sum(i => i.TaxAmount)
                    ,
                    DiscountAmount = s.Sum(i => i.DiscountAmount)
                    ,
                    SaleAmount = s.Sum(i => i.SaleAmount)
                    ,
                    CurrencyCode = s.First().CurrencyCode
                })
                .Distinct()
                //.OrderBy(o => o.Name)
                .ToList();
            var pFleetOrdersList = objCFleetOrder.lstCVarvwRoutings
                    .GroupBy(g => new { g.POLName, g.PODName, g.DivisionID, g.Sale })
                    .Select(s => new
                    {
                        ChargeTypeName = s.First().POLName + " --> " + s.First().PODName
                        ,
                        DivisionName = s.First().DivisionName
                        ,
                        Notes = ""//s.First().Notes
                        ,
                        Quantity = s.Count()
                        ,
                        SalePrice = s.First().Sale//s.Sum(i => i.Sale) / s.Count()
                        ,
                        AmountWithoutVAT = s.Sum(i => i.Sale)
                        ,
                        TaxAmount = pReceivableList.Count > 0 ? ((s.Sum(i => i.Sale) * objCvwReceivables.lstCVarvwReceivables[0].TaxPercentage) / 100) : 0
                        ,
                        DiscountAmount = 0 //s.Sum(i => i.DiscountAmount)
                        ,
                        SaleAmount = 0 //Calculate in printing as AmountWithoutVAT + TaxAmount
                                       //,
                                       //CurrencyCode = s.First().CurrencyCode
                    })
                    //.Distinct()
                    //.OrderBy(o => o.Name)
                    .ToList();
            #endregion Get fleet invoice details to print
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwInvoices.lstCVarvwInvoices[0]) : null
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwReceivables.lstCVarvwReceivables) : null
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwCustomers.lstCVarvwCustomers[0]) : null
                , serializer.Serialize(pFleetOrdersList) //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] FleetQuotationDetails_ApplyFreightRateToOrders(Int64 pQuotationRouteIDToApplyToOrders, bool pIsApplyFreightRateToApprovedOrders)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CRoutings objCRoutings = new CRoutings();
            string pUpdateClause = "";
            checkException = objCQuotationRoute.GetListPaging(1, 1, "WHERE ID=" + pQuotationRouteIDToApplyToOrders, "ID", out _RowCount);
            if (objCQuotationRoute.lstCVarQuotationRoute[0].Sale > 0)
            {
                pUpdateClause += " Sale=" + objCQuotationRoute.lstCVarQuotationRoute[0].Sale + " \n";
                //pUpdateClause += " ,RoadNumber=N'Rate updated from contract by " + WebSecurity.CurrentUserName + " at ' +  CONVERT(VARCHAR(20),GETDATE(), 103) " + " \n";
                pUpdateClause += " WHERE InvoiceID IS NULL AND IsFleet=1 AND RoutingTypeID=60 AND QuotationRouteID=" + pQuotationRouteIDToApplyToOrders + " \n";
                pUpdateClause += " AND POL=" + objCQuotationRoute.lstCVarQuotationRoute[0].POL + " AND POD=" + objCQuotationRoute.lstCVarQuotationRoute[0].POD + " \n";
                if (!pIsApplyFreightRateToApprovedOrders)
                    pUpdateClause += " AND IsApproved=0" + " \n";
                checkException = objCRoutings.UpdateList(pUpdateClause);
                if (checkException != null)
                    _ReturnedMessage = checkException.Message;
            }
            else
                _ReturnedMessage = "Freight rate is not saved.";
            return new object[] {
                _ReturnedMessage
            };
        }

        [HttpGet, HttpPost]
        public object[] FleetQuotationDetails_ApplyPercentage(Int64 pQuotationIDToApplyPercentage, decimal pPercentage)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CRoutings objCRoutings = new CRoutings();
            string pUpdateClause = "";

            pUpdateClause += " Sale=ROUND((ISNULL(Sale, 0) * " + (100 + pPercentage) / 100 + "),2)" + " \n";
            //pUpdateClause += " ,RoadNumber=N'Rate updated from contract by " + WebSecurity.CurrentUserName + " at ' +  CONVERT(VARCHAR(20),GETDATE(), 103) " + " \n";
            pUpdateClause += " WHERE QuotationID=" + pQuotationIDToApplyPercentage + " \n";

            checkException = objCQuotationRoute.UpdateList(pUpdateClause);
            if (checkException != null)
                _ReturnedMessage = checkException.Message;

            checkException = objCvwQuotationRoute.GetListPaging(99999, 1, "WHERE QuotationID=" + pQuotationIDToApplyPercentage, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                _ReturnedMessage
                , serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute) //pData[1]
            };
        }
        #endregion FleetQuotation

        [HttpGet, HttpPost]
        public object[] SendPersonalAlarmWithMinimalData(string pAlarmReceiversIDs, string pSubject, string pBody, Int64 pQuotationRouteID, int pActionID, string pActionName)
        {
            //TODO: save QuotationRouteID to send pricing request flag
            Exception checkException = null;
            string _MessageReturned = "";
            string _MailMessageReturned = "";
            int _RowCount = 0;
            string _WhereClause = "";
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            objCQuotationRoute.GetListPaging(999999, 1, "WHERE ID=" + pQuotationRouteID, "ID", out _RowCount);
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            objCvwQuotationRoute.GetListPaging(999999, 1, "WHERE ID=" + pQuotationRouteID, "ID", out _RowCount);
            CvwUsers objCvwUsers = new CvwUsers();
            #region Sending Alarm
            if (pAlarmReceiversIDs == "0") //Get Department members according to quotation type
            {
                _WhereClause = "WHERE IsInactive=0" + " \n";
                if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].IsWarehousing)
                    _WhereClause += "AND DepartmentName IN ('WAREHOUSING','TRANSPORTATION','WAREHOUSING HEAD','TRANSPORTATION HEAD')" + " \n";
                else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 1 || objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 2)
                    _WhereClause += "AND DepartmentName IN ('FREIGHT','TRANSPORTATION','CLEARANCE','FREIGHT HEAD','TRANSPORTATION HEAD','CLEARANCE HEAD')" + " \n";
                else if (objCvwQuotationRoute.lstCVarvwQuotationRoute[0].TransportType == 3)
                    _WhereClause += "AND DepartmentName IN ('TRANSPORTATION','CLEARANCE','TRANSPORTATION HEAD','CLEARANCE HEAD')" + " \n";
                checkException = objCvwUsers.GetListPaging(9999, 1, _WhereClause, "ID", out _RowCount);
                pAlarmReceiversIDs = "";
                for (int i = 0; i < objCvwUsers.lstCVarvwUsers.Count; i++)
                    pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? objCvwUsers.lstCVarvwUsers[i].ID.ToString() : ("," + objCvwUsers.lstCVarvwUsers[i].ID.ToString());
            }
            if (pAlarmReceiversIDs != "0" && pAlarmReceiversIDs != "")
            {
                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                objCVarEmail.Subject = pSubject;
                objCVarEmail.Body = pBody;
                objCVarEmail.QuotationRouteID = 0;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCVarEmail.QuotationRequestID = objCQuotationRoute.lstCVarQuotationRoute[0].QuotationID;
                objCVarEmail.QuotationRouteRequestID = pQuotationRouteID;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                if (checkException == null) //add to EmailReceivers
                {
                    var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                    var NoOfReceivers = pArrayOfReceiversIDs.Length;
                    for (int i = 0; i < NoOfReceivers; i++)
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                    }
                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                    if (checkException != null)
                        _MessageReturned = checkException.Message;
                }
            }
            #endregion Sending Alarm
            #region ActionLog
            if (checkException == null)
            {
                var objCQuotationActionLog = new CQuotationActionLog();
                objCQuotationActionLog.lstCVarQuotationActionLog.Add(new CVarQuotationActionLog
                {
                    QuotationID = objCQuotationRoute.lstCVarQuotationRoute[0].QuotationID,
                    QuotationRouteID = objCQuotationRoute.lstCVarQuotationRoute[0].ID,
                    ActionID = pActionID,
                    ActionName = pActionName,
                    UserID = WebSecurity.CurrentUserId,
                    ActionDate = DateTime.Now
                });
                checkException = objCQuotationActionLog.SaveMethod(objCQuotationActionLog.lstCVarQuotationActionLog);
            }
            #endregion
            #region Send Email
            if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                && objCDefaults.lstCVarDefaults[0].Email_Port != 0 && objCDefaults.lstCVarDefaults[0].IsDepartmentOption
                        && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
            {
                CUsers objCUsers = new CUsers();
                checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pAlarmReceiversIDs + ")");

                string FromMail = objCDefaults.lstCVarDefaults[0].Email;
                bool _boolEmailFound = false;
                var mail = new MailMessage();
                //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                SmtpClient SmtpServer = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                SmtpServer.UseDefaultCredentials = true;
                SmtpServer.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));

                //SmtpClient SmtpServer = new SmtpClient();
                //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);
                mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                    if (objCUsers.lstCVarUsers[i].Email != "" && objCUsers.lstCVarUsers[i].Email != "0")
                    {
                        _boolEmailFound = true;
                        mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                    }
                //mail.CC.Add(CC);
                mail.Subject = pSubject;
                mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>";
                mail.Body += pBody;
                mail.IsBodyHtml = true;
                #region read arabic chars
                var htmlView = AlternateView.CreateAlternateViewFromString(mail.Body, new ContentType("text/html"));
                htmlView.ContentType.CharSet = Encoding.UTF8.WebName;
                mail.AlternateViews.Add(htmlView);
                #endregion read arabic chars
                //mail.Attachments.Add(new Attachment(pathString));
                //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                //SmtpServer.Port = 25;
                //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                if (_boolEmailFound)
                    try
                    {
                        SmtpServer.Send(mail);
                    }
                    catch (Exception ex)
                    {
                        _MailMessageReturned = ex.Message;
                    }
            }
            #endregion Send Email
            return new object[]
            {
                _MessageReturned
                , _MailMessageReturned
            };
        }

        //[HttpGet, HttpPost]
        public static object[] SendAlarmWithMinimalData(string pAlarmReceiversIDs, string pSubject, string pBody, Int64 pQuotationRouteID, int pActionID, string pActionName)
        {
            //TODO: save QuotationRouteID to send pricing request flag
            Exception checkException = null;
            string _MessageReturned = "";
            string _MailMessageReturned = "";
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            objCQuotationRoute.GetListPaging(999999, 1, "WHERE ID=" + pQuotationRouteID, "ID", out _RowCount);
            #region Sending Alarm
            if (pAlarmReceiversIDs != null)
            {
                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                objCVarEmail.Subject = pSubject;
                objCVarEmail.Body = pBody;
                objCVarEmail.QuotationRouteID = 0;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCVarEmail.QuotationRequestID = objCQuotationRoute.lstCVarQuotationRoute[0].QuotationID;
                objCVarEmail.QuotationRouteRequestID = pQuotationRouteID;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                if (checkException == null) //add to EmailReceivers
                {
                    var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                    var NoOfReceivers = pArrayOfReceiversIDs.Length;
                    for (int i = 0; i < NoOfReceivers; i++)
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                    }
                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                }
            }
            #endregion Sending Alarm
            #region ActionLog
            if (checkException == null)
            {
                var objCQuotationActionLog = new CQuotationActionLog();
                objCQuotationActionLog.lstCVarQuotationActionLog.Add(new CVarQuotationActionLog
                {
                    QuotationID = objCQuotationRoute.lstCVarQuotationRoute[0].QuotationID,
                    QuotationRouteID = objCQuotationRoute.lstCVarQuotationRoute[0].ID,
                    ActionID = pActionID,
                    ActionName = pActionName,
                    UserID = WebSecurity.CurrentUserId,
                    ActionDate = DateTime.Now
                });
                checkException = objCQuotationActionLog.SaveMethod(objCQuotationActionLog.lstCVarQuotationActionLog);
            }
            #endregion
            #region Send Email
            if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                && objCDefaults.lstCVarDefaults[0].Email_Port != 0 && objCDefaults.lstCVarDefaults[0].IsDepartmentOption
                        && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
            {
                CUsers objCUsers = new CUsers();
                checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pAlarmReceiversIDs + ")");

                string FromMail = objCDefaults.lstCVarDefaults[0].Email;
                bool _boolEmailFound = false;
                var mail = new MailMessage();
                //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                SmtpClient SmtpServer = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                SmtpServer.UseDefaultCredentials = true;
                SmtpServer.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));

                //SmtpClient SmtpServer = new SmtpClient();
                //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);
                mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                    if (objCUsers.lstCVarUsers[i].Email != "" && objCUsers.lstCVarUsers[i].Email != "0")
                    {
                        _boolEmailFound = true;
                        mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                    }
                //mail.CC.Add(CC);
                mail.Subject = pSubject;
                mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>";
                mail.Body += pBody;
                mail.IsBodyHtml = true;
                #region read arabic chars
                var htmlView = AlternateView.CreateAlternateViewFromString(mail.Body, new ContentType("text/html"));
                htmlView.ContentType.CharSet = Encoding.UTF8.WebName;
                mail.AlternateViews.Add(htmlView);
                #endregion read arabic chars
                //mail.Attachments.Add(new Attachment(pathString));
                //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                //SmtpServer.Port = 25;
                //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                if (_boolEmailFound)
                    try
                    {
                        SmtpServer.Send(mail);
                    }
                    catch (Exception ex)
                    {
                        _MailMessageReturned = ex.Message;
                    }
            }
            #endregion Send Email
            return new object[]
            {
                _MessageReturned
            };
        }

        #region External Quotation
        [HttpPost]
        public object[] Create([FromBody] CustomerQuotation QuotationData)
        {
            bool _result = false;
            int _RowCount = 0;
            CvwQuotations objCvwQuotations = new CvwQuotations();
            int MainCarraigeRoutingTypeID = 30;
            CVarQuotations objCVarQuotations = new CVarQuotations();
            CContacts objCContacts = new CContacts();
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();

            //create quotation
            objCVarQuotations.Code = QuotationData.Code;
            objCVarQuotations.BranchID = int.Parse(QuotationData.pBranchID);
            objCVarQuotations.SalesmanID = int.Parse(QuotationData.pSalesmanID);
            objCVarQuotations.DirectionType = int.Parse(QuotationData.pDirectionType);
            objCVarQuotations.DirectionIconName = QuotationData.pDirectionIconName;
            objCVarQuotations.DirectionIconStyle = QuotationData.pDirectionIconStyle;
            objCVarQuotations.TransportType = int.Parse(QuotationData.pTransportType);
            objCVarQuotations.TransportIconName = QuotationData.pTransportIconName;
            objCVarQuotations.TransportIconStyle = QuotationData.pTransportIconStyle;
            objCVarQuotations.ShipmentType = int.Parse(QuotationData.pShipmentType);
            objCVarQuotations.ShipperID = int.Parse(QuotationData.pShipperID);
            objCVarQuotations.ShipperAddressID = int.Parse(QuotationData.pShipperAddressID);
            objCContacts.GetList("WHERE PartnerTypeID=1 AND PartnerID=" + QuotationData.pShipperID);
            objCVarQuotations.ShipperContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);
            objCVarQuotations.ConsigneeID = int.Parse(QuotationData.pConsigneeID);
            objCVarQuotations.ConsigneeAddressID = int.Parse(QuotationData.pConsigneeAddressID);
            objCContacts.GetList("WHERE PartnerTypeID=1 AND PartnerID=" + QuotationData.pConsigneeID);
            objCVarQuotations.ConsigneeContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);
            objCVarQuotations.AgentID = int.Parse(QuotationData.pAgentID);
            objCVarQuotations.AgentAddressID = int.Parse(QuotationData.pAgentAddressID);
            objCContacts.GetList("WHERE PartnerTypeID=2 AND PartnerID=" + QuotationData.pAgentID);
            objCVarQuotations.AgentContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);
            objCVarQuotations.CustomerID = int.Parse(QuotationData.pCustomerID);
            objCContacts.GetList("WHERE PartnerTypeID=1 AND PartnerID=" + QuotationData.pCustomerID);
            objCVarQuotations.CustomerContactID = (objCContacts.lstCVarContacts.Count > 0 ? objCContacts.lstCVarContacts[0].ID : 0);
            objCVarQuotations.IncotermID = int.Parse(QuotationData.pIncotermID);
            objCVarQuotations.CommodityID = int.Parse(QuotationData.pCommodityID);
            objCVarQuotations.TransientTime = int.Parse(QuotationData.pTransientTime);
            objCVarQuotations.Validity = int.Parse(QuotationData.pValidity);
            objCVarQuotations.FreeTime = int.Parse(QuotationData.pFreeTime);
            objCVarQuotations.OpenDate = QuotationData.pOpenDate;
            objCVarQuotations.CloseDate = QuotationData.pCloseDate;
            objCVarQuotations.ExpirationDate = DateTime.Parse("01-01-1900");
            objCVarQuotations.IncludePickup = (QuotationData.pIncludePickup == "True" ? true : false);
            objCVarQuotations.PickupCityID = int.Parse(QuotationData.pPickupCityID);
            objCVarQuotations.PickupAddressID = int.Parse(QuotationData.pPickupAddressID);
            objCVarQuotations.POLCountryID = int.Parse(QuotationData.pPOLCountryID);
            objCVarQuotations.POL = int.Parse(QuotationData.pPOL);
            objCVarQuotations.PODCountryID = int.Parse(QuotationData.pPODCountryID);
            objCVarQuotations.POD = int.Parse(QuotationData.pPOD);
            objCVarQuotations.ShippingLineID = int.Parse(QuotationData.pShippingLineID);
            objCVarQuotations.AirlineID = int.Parse(QuotationData.pAirlineID);
            objCVarQuotations.TruckerID = int.Parse(QuotationData.pTruckerID);
            objCVarQuotations.IncludeDelivery = (QuotationData.pIncludeDelivery == "True" ? true : false);
            objCVarQuotations.DeliveryZipCode = QuotationData.pDeliveryZipCode;
            objCVarQuotations.DeliveryCityID = int.Parse(QuotationData.pDeliveryCityID);
            objCVarQuotations.DeliveryCountryID = int.Parse(QuotationData.pDeliveryCountryID);
            objCVarQuotations.IsDangerousGoods = (QuotationData.pIsDangerousGoods == "True" ? true : false);
            objCVarQuotations.DescriptionOfGoods = QuotationData.pDescriptionOfGoods;
            objCVarQuotations.Notes = (QuotationData.pNotes == null ? "" : QuotationData.pNotes.Trim().ToUpper());
            objCVarQuotations.QuotationStageID = int.Parse(QuotationData.pQuotationStageID);
            objCVarQuotations.SalesLeadID = QuotationData.pSalesLeadID;
            objCCRM_ContactPersons.GetList("WHERE CRM_ClientsID=" + QuotationData.pSalesLeadID);
            objCVarQuotations.SalesLeadContactID = (objCCRM_ContactPersons.lstCVarCRM_ContactPersons.Count > 0 ? objCCRM_ContactPersons.lstCVarCRM_ContactPersons[0].ID : 0);
            objCVarQuotations.IsWarehousing = QuotationData.pIsWarehousing;
            objCVarQuotations.MainCriteriaID = QuotationData.pMainCriteriaID;
            objCVarQuotations.SubCriteriaID = QuotationData.pSubCriteriaID;
            objCVarQuotations.IsFleet = QuotationData.pIsFleet;
            objCVarQuotations.TemplateID = QuotationData.pTemplateID;
            objCVarQuotations.Subject = QuotationData.pSubject;
            objCVarQuotations.TermsAndConditions = QuotationData.pTermsAndConditions;
            objCVarQuotations.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarQuotations.LockingUserID = 0;
            objCVarQuotations.CreatorUserID = objCVarQuotations.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarQuotations.CreationDate = objCVarQuotations.ModificationDate = DateTime.Now;
            objCVarQuotations.IsContract = false;
            objCVarQuotations.ExporterID = 0;
            objCVarQuotations.CRMCode = "0";
            objCVarQuotations.IsLoadingDischarging = false;
            objCVarQuotations.IsSurvey = false;
            objCVarQuotations.IsLashing = false;
            objCVarQuotations.IsPackingRemovals = false;

            CQuotations objCQuotations = new CQuotations();
            objCQuotations.lstCVarQuotations.Add(objCVarQuotations);
            Exception checkException = objCQuotations.SaveMethod(objCQuotations.lstCVarQuotations);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            {
                _result = true;

                //create quotation route
                CVarQuotationRoute objCVarQuotationRoute = new CVarQuotationRoute();
                objCVarQuotationRoute.QuotationID = objCVarQuotations.ID;
                objCVarQuotationRoute.RoutingTypeID = MainCarraigeRoutingTypeID;
                objCVarQuotationRoute.TransportType = objCVarQuotations.TransportType;
                objCVarQuotationRoute.TransportIconName = objCVarQuotations.TransportIconName;
                objCVarQuotationRoute.TransportIconStyle = objCVarQuotations.TransportIconStyle;
                objCVarQuotationRoute.POLCountryID = objCVarQuotations.POLCountryID;
                objCVarQuotationRoute.POL = objCVarQuotations.POL;
                objCVarQuotationRoute.PODCountryID = objCVarQuotations.PODCountryID;
                objCVarQuotationRoute.POD = objCVarQuotations.POD;
                objCVarQuotationRoute.ExpirationDate = objCVarQuotations.ExpirationDate;
                objCVarQuotationRoute.ShippingLineID = objCVarQuotations.ShippingLineID;
                objCVarQuotationRoute.AirlineID = objCVarQuotations.AirlineID;
                objCVarQuotationRoute.TruckerID = objCVarQuotations.TruckerID;
                objCVarQuotationRoute.Notes = "0";
                objCVarQuotationRoute.CreatorUserID = objCVarQuotationRoute.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarQuotationRoute.CreationDate = objCVarQuotationRoute.ModificationDate = DateTime.Now;
                objCVarQuotationRoute.ChargeEditApprovalLevel = 0;
                objCVarQuotationRoute.ChargeEdit1stApprovalUserID = 0;
                objCVarQuotationRoute.ChargeEdit2ndApprovalUserID = 0;
                objCVarQuotationRoute.ChargeEdit3rdApprovalUserID = 0;
                objCVarQuotationRoute.ChargeEdit4thApprovalUserID = 0;
                objCVarQuotationRoute.CustomsAcceptedValue = 0;
                objCVarQuotationRoute.ETD = DateTime.Parse("01-01-1900");
                objCVarQuotationRoute.StuffingCutOf = DateTime.Parse("01-01-1900");
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                objCQuotationRoute.lstCVarQuotationRoute.Add(objCVarQuotationRoute);
                checkException = objCQuotationRoute.SaveMethod(objCQuotationRoute.lstCVarQuotationRoute);

                if(checkException == null)
                {
                    //create operation
                }
            }

            checkException = objCQuotations.GetListPaging(1, 1, "WHERE ID=" + objCVarQuotations.ID, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { _result, objCVarQuotations.ID, serializer.Serialize(objCQuotations.lstCVarQuotations[0]) };
        }
        #endregion

        #region OperationsCreatedFromSpecificQuotationRoute
        [HttpGet, HttpPost]
        public int GetOperationsCreatedFromQuotationRoute(int pQuotationRouteID)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var OperationList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID FROM Operations WHERE QuotationRouteID = " + pQuotationRouteID, typeof(CVarOperations)).Cast<CVarOperations>().ToList();

            if (OperationList.Count > 0)
                return 1;
            return 0;
        }
        #endregion

        #region ChargeEditApprovals
        [HttpGet, HttpPost]
        public int GetChargeEditApprovals(long QuotationRouteID)
        {
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            objCQuotationRoute.GetItem(QuotationRouteID);
            int ChargeEditApprovalLevel = objCQuotationRoute.lstCVarQuotationRoute[0].ChargeEditApprovalLevel;

            return ChargeEditApprovalLevel;

        }

        [HttpGet, HttpPost]
        public bool GetChargeEditApprovalRequested(long QuotationRouteID, bool pT, bool pR)
        {
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            objCQuotationRoute.GetItem(QuotationRouteID);
            bool ChargeEditApprovalRequested = objCQuotationRoute.lstCVarQuotationRoute[0].IsChargeEditApprovalRequested;

            return ChargeEditApprovalRequested;

        }

        [HttpGet]
        public object[] SendChargeEditApprovalRequest(string pAlarmReceiversIDs, int pQuotationRouteID, int pRequstedApprovalLevel, int pOperationID)
        {
            int _RowCount = 0;
            string _ReturnedMessage = "";
            string _MailMessageReturned = "";
            Exception checkException = null;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList(" WHERE 1=1");
            CvwUserForms objCvwUserForms = new CvwUserForms();
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            //if(pRequstedApprovalLevel == 3 && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName=="MED")
            //{
            //    CPayables objCPayable = new CPayables();
            //    objCPayable.UpdateList("IsQuotationApproval = 1 WHERE OperationID =" + pOperationId);
            //}
            objCvwQuotationRoute.GetList(" WHERE ID = " + pQuotationRouteID);
            var constEmailSourceQuotationChargeEditApprovalRequest = 80;
            objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 1, FreightRateFormat='{pOperationID}' WHERE ID = " + pQuotationRouteID);
            if(string.IsNullOrWhiteSpace(pAlarmReceiversIDs))
                checkException = objCvwUserForms.GetList("WHERE ImageName='QuotationApproval' AND CanEdit=1");
            if (objCvwUserForms.lstCVarvwUserForms.Count == 0 && string.IsNullOrWhiteSpace(pAlarmReceiversIDs))
                _ReturnedMessage = "No users have quotation approval privilege.";
            else
            {
                for (int i = 0; i < objCvwUserForms.lstCVarvwUserForms.Count; i++)
                    pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? objCvwUserForms.lstCVarvwUserForms[i].UserID.ToString() : ("," + objCvwUserForms.lstCVarvwUserForms[i].UserID.ToString());

                #region Prepare Email Body
                CvwUsers objCvwUser_Sender = new CvwUsers();
                checkException = objCvwUser_Sender.GetListPaging(9999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                string _Subject = "";
                string _Body = "";
                _Subject = "Charge Edit Approval Request for " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code;
                _Body = "Charge Edit Approval Request of level " + pRequstedApprovalLevel + "for " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + "<br />";
                _Body += "Client : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ClientName + "<br />";
                _Body += "Line : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].LineName + "<br />";
                _Body += "POL : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLName + "<br />";
                _Body += "POD : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODName + "<br />";

                #endregion Prepare Email Body
                #region Sending Alarm

                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                objCVarEmail.QuotationRouteID = pQuotationRouteID;
                objCVarEmail.EmailSource = constEmailSourceQuotationChargeEditApprovalRequest;
                objCVarEmail.Subject = _Subject;
                objCVarEmail.Body = _Body;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                if (checkException == null) //add to EmailReceivers
                {
                    var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                    var NoOfReceivers = pArrayOfReceiversIDs.Length;
                    for (int i = 0; i < NoOfReceivers; i++)
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                    }
                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                }

                #endregion Sending Alarm
                #region Send Email
                if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                    && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                    && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                    && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                    && objCDefaults.lstCVarDefaults[0].Email_Port != 0 && objCDefaults.lstCVarDefaults[0].IsDepartmentOption
                        && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                {
                    CUsers objCUsers = new CUsers();
                    checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pAlarmReceiversIDs + ")");

                    string FromMail = objCDefaults.lstCVarDefaults[0].Email;
                    bool _boolEmailFound = false;
                    var mail = new MailMessage();
                    //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                    SmtpClient SmtpServer = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    SmtpServer.UseDefaultCredentials = true;
                    SmtpServer.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));

                    //SmtpClient SmtpServer = new SmtpClient();
                    //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);
                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                        if (objCUsers.lstCVarUsers[i].Email != "" && objCUsers.lstCVarUsers[i].Email != "0")
                        {
                            _boolEmailFound = true;
                            mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                        }
                    //mail.CC.Add(CC);
                    mail.Subject = _Subject;

                    mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>";
                    mail.Body += _Body;
                    mail.IsBodyHtml = true;
                    #region read arabic chars
                    var htmlView = AlternateView.CreateAlternateViewFromString(mail.Body, new ContentType("text/html"));
                    htmlView.ContentType.CharSet = Encoding.UTF8.WebName;
                    mail.AlternateViews.Add(htmlView);
                    #endregion read arabic chars
                    //mail.Attachments.Add(new Attachment(pathString));
                    //mail.Attachments.Add(new Attachment("C:\\Users\\Sherif\\Desktop\\CompanyLogo.jpg"));
                    //SmtpServer.Port = 25;
                    //SmtpServer.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
                    //SmtpServer.Port = Convert.ToInt32(Configuration!System.Configuration.ConfigurationManager.AppSettings["PORT"].ToString());
                    SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    if (_boolEmailFound)
                        try
                        {
                            SmtpServer.Send(mail);
                        }
                        catch (Exception ex)
                        {
                            _MailMessageReturned = ex.Message;
                        }
                }
                #endregion Send Email
            }

            objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuotationID, "CodeSerial", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage //pData[0]
                , _MailMessageReturned //pData[1]
                , serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute) //pData[2]
            };
        }

        [HttpGet]
        public object[] ChargeEditConfirmApproval(int pQuotationRouteID, int pSetApprovalLevel, bool pIsConfirmed, string pRejectionReason)
        {
            Int32 _RowCount = 0;
            string _ReturnedMessage = "";
            string _MailMessageReturned = "";
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList(" WHERE 1=1");
            Exception checkException = null;
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            var constEmailSourceQuotationApprovalSet = 30;
            string updateClause = "";
            updateClause = "RevisorUserID=" + WebSecurity.CurrentUserId + " \n";
            if (pIsConfirmed && pSetApprovalLevel == 1)
                updateClause += ",IsChargeEditApprovalRequested = 0,ChargeEditApprovalLevel = 1,ChargeEdit1stApprovalUserID =" + WebSecurity.CurrentUserId + " \n";
            else if(pIsConfirmed && pSetApprovalLevel == 2)
                updateClause += ",IsChargeEditApprovalRequested = 0,ChargeEditApprovalLevel = 2,ChargeEdit2ndApprovalUserID =" + WebSecurity.CurrentUserId + " \n";
            else if (pIsConfirmed && pSetApprovalLevel == 3)
                updateClause += ",IsChargeEditApprovalRequested = 0,ChargeEditApprovalLevel = 3,ChargeEdit3rdApprovalUserID =" + WebSecurity.CurrentUserId + " \n";
            else if (pIsConfirmed && pSetApprovalLevel == 4)
                updateClause += ",IsChargeEditApprovalRequested = 0,ChargeEditApprovalLevel = 4,ChargeEdit4thApprovalUserID =" + WebSecurity.CurrentUserId + " \n";

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED" && pIsConfirmed && pSetApprovalLevel == 3)
            {
                updateClause += ",FreightRateFormat=NULL";
            }

            updateClause += ",ModificationDate = GETDATE() " + "\n";
            updateClause += "WHERE ID = " + pQuotationRouteID + "\n";
            checkException = objCQuotationRoute.UpdateList(updateClause);

            if (checkException != null)
                _ReturnedMessage = checkException.Message;
            else
            {
                objCvwQuotationRoute.GetListPaging(1, 1, "WHERE ID = " + pQuotationRouteID, "ID", out _RowCount);
                string pAlarmReceiversIDs = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].CreatorUserID.ToString();
                {
                    CvwUsers objCvwUser_Sender = new CvwUsers();
                    checkException = objCvwUser_Sender.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                    string _Subject = "";
                    string _Body = "";
                    _Body = "<b>Sender : " + objCvwUser_Sender.lstCVarvwUsers[0].Email_DisplayName + "</b><br>";
                    if (pIsConfirmed && pSetApprovalLevel == 1)
                    {
                        _Subject = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " first approval level is confirmed.";
                        _Body = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " has first approval level." + "<br />";
                    }
                    else if(pIsConfirmed && pSetApprovalLevel == 2)
                    {
                        _Subject = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " second approval level is confirmed.";
                        _Body = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " has second approval level." + "<br />";
                    }
                    else if (pIsConfirmed && pSetApprovalLevel == 3)
                    {
                        _Subject = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " third approval level is confirmed.";
                        _Body = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " has third approval level." + "<br />";
                    }
                    else if (pIsConfirmed && pSetApprovalLevel == 4)
                    {
                        _Subject = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " final approval level is confirmed.";
                        _Body = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " has final approval level." + "<br />";
                    }
                    else //Rejected
                    {
                        _Subject = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is rejected.";
                        _Body = objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + " is rejected." + "<br />";
                    }
                    _Body += "Client : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ClientName + "<br />";
                    _Body += "Line : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].LineName + "<br />";
                    _Body += "POL : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLName + "<br />";
                    _Body += "POD : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODName + "<br />";
                    if (!pIsConfirmed)
                        _Body += "<br />" + "REJECTION REASON : " + pRejectionReason + " at " + DateTime.Now.ToShortDateString() + "<br />";

                    #region Sending Alarm

                    CVarEmail objCVarEmail = new CVarEmail();
                    CEmail objCEmail = new CEmail();
                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                    //if (pIsApproved)
                    //{
                    objCVarEmail.QuotationRouteID = pQuotationRouteID; //i dont set it in case of denial not to show create link
                    //}
                    objCVarEmail.EmailSource = constEmailSourceQuotationApprovalSet;
                    objCVarEmail.Subject = _Subject;
                    objCVarEmail.Body = _Body;
                    objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                    objCVarEmail.SendingDate = DateTime.Now;
                    objCEmail.lstCVarEmail.Add(objCVarEmail);
                    checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                    if (checkException == null) //add to EmailReceivers
                    {
                        var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                        var NoOfReceivers = pArrayOfReceiversIDs.Length;
                        for (int i = 0; i < NoOfReceivers; i++)
                        {
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                            objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCVarEmailReceiver.IsAlarm = true;

                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                        }
                        checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                    }

                    #endregion Sending Alarm
                    #region Send Email
                    //CGroups objCGroups = new CGroups();
                    //objCGroups.GetList("WHERE GroupImageURL='CRM' AND IsInactive=0"); //have CRM Enabled
                    //                                                                  //CDefaults objCDefaults = new CDefaults();
                    //objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
                    //if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "" && objCDefaults.lstCVarDefaults[0].Email != "0" 
                    //    && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != "" 
                    //    && objCGroups.lstCVarGroups.Count > 0 && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "OCE" 
                    //    && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "CHM")
                    if (pAlarmReceiversIDs != "" && objCDefaults.lstCVarDefaults[0].Email != "0" && objCDefaults.lstCVarDefaults[0].Email != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Password != "0" && objCDefaults.lstCVarDefaults[0].Email_Password != ""
                        && objCDefaults.lstCVarDefaults[0].Email_DisplayName != "0" && objCDefaults.lstCVarDefaults[0].Email_DisplayName != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Host != "0" && objCDefaults.lstCVarDefaults[0].Email_Host != ""
                        && objCDefaults.lstCVarDefaults[0].Email_Port != 0 && objCDefaults.lstCVarDefaults[0].IsDepartmentOption
                        && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                    {
                        CUsers objCUsers = new CUsers();
                        checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND IsInactive=0 AND Email<>'' AND Email<>'0' AND ID IN(" + pAlarmReceiversIDs + ")");

                        string FromMail = objCDefaults.lstCVarDefaults[0].Email;
                        bool _boolEmailFound = false;
                        var mail = new MailMessage();
                        //SmtpClient Client = new SmtpClient("mail.sharksbay.com", 587);
                        SmtpClient SmtpServer = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                        SmtpServer.UseDefaultCredentials = true;
                        SmtpServer.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));

                        //SmtpClient SmtpServer = new SmtpClient();
                        //SmtpClient SmtpServer = new SmtpClient("smtpout.secureserver.net", SmtpServer.Port);
                        mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                        for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                            if (objCUsers.lstCVarUsers[i].Email != "" && objCUsers.lstCVarUsers[i].Email != "0")
                            {
                                _boolEmailFound = true;
                                mail.To.Add(objCUsers.lstCVarUsers[i].Email);
                            }
                        //mail.CC.Add(CC);
                        mail.Subject = _Subject;
                        mail.Body = "<b>Sender : " + WebSecurity.CurrentUserName + "</b><br>";
                        mail.Body += _Body;
                        mail.IsBodyHtml = true;
                        #region read arabic chars
                        var htmlView = AlternateView.CreateAlternateViewFromString(mail.Body, new ContentType("text/html"));
                        htmlView.ContentType.CharSet = Encoding.UTF8.WebName;
                        mail.AlternateViews.Add(htmlView);
                        #endregion read arabic chars
                        SmtpServer.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                        if (_boolEmailFound)
                            try
                            {
                                SmtpServer.Send(mail);
                            }
                            catch (Exception ex)
                            {
                                _MailMessageReturned = ex.Message;
                            }
                    }
                    #endregion Send Email
                }
            }
            objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuotationID, "CodeSerial", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage
                , _MailMessageReturned 
                , serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute)
            };
        }
        #endregion

        [HttpGet]
        public object[] GetChargesWithApprovals(int pQuotationRouteID, int pQuotationID, int pOperationID, string pCompanyName)
        {
            Exception ex = null;

            CvwQuotations objCvwQuotations = new CvwQuotations();
            ex = objCvwQuotations.GetList($" Where ID = {pQuotationID} ");

            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            ex = objCvwQuotationRoute.GetList($" Where ID = {pQuotationRouteID} ");

			var whereClause = $"where OperationID={pOperationID}";
			if (pCompanyName == "MED")
			{
				whereClause = $" where OperationID={pOperationID} and GeneratingQRID={pQuotationRouteID} ";
			}
            CvwReceivables objCvwReceivables = new CvwReceivables();
            ex = objCvwReceivables.GetList(whereClause);

            CvwPayables objCvwPayables = new CvwPayables();
            ex = objCvwPayables.GetList(whereClause);

            CvwReceivablesDraft objCvwReceivablesDraft = new CvwReceivablesDraft();
            ex = objCvwReceivablesDraft.GetList($"WHERE OperationID={pOperationID}");

            CvwPayablesDraft objCvwPayablesDraft = new CvwPayablesDraft();
            ex = objCvwPayablesDraft.GetList($"WHERE OperationID={pOperationID}");


            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

            return new object[] {
                serializer.Serialize(objCvwQuotations.lstCVarvwQuotations),
                serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute),
                serializer.Serialize(objCvwReceivables.lstCVarvwReceivables),
                serializer.Serialize(objCvwPayables.lstCVarvwPayables),
                serializer.Serialize(objCvwReceivablesDraft.lstCVarvwReceivablesDraft),
                serializer.Serialize(objCvwPayablesDraft.lstCVarvwPayablesDraft)

            };
        }

        [HttpGet]
        public object[] SendChargeEditThirdApprovalConfirm(string pAlarmReceiversIDs, int pQuotationRouteID)
        {
            int _RowCount = 0;
            string _ReturnedMessage = "";
            string _MailMessageReturned = "";
            Exception checkException = null;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList(" WHERE 1=1");

            CvwUserForms objCvwUserForms = new CvwUserForms();

            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();

            objCvwQuotationRoute.GetList(" WHERE ID = " + pQuotationRouteID);
            var constEmailSourceQuotationApprovalSet = 30;

            if (string.IsNullOrWhiteSpace(pAlarmReceiversIDs))
                checkException = objCvwUserForms.GetList("WHERE ImageName='QuotationApproval' AND CanEdit=1");
            if (objCvwUserForms.lstCVarvwUserForms.Count == 0 && string.IsNullOrWhiteSpace(pAlarmReceiversIDs))
                _ReturnedMessage = "No users have quotation approval privilege.";
            else
            {
                for (int i = 0; i < objCvwUserForms.lstCVarvwUserForms.Count; i++)
                    pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? objCvwUserForms.lstCVarvwUserForms[i].UserID.ToString() : ("," + objCvwUserForms.lstCVarvwUserForms[i].UserID.ToString());

                #region Prepare Email Body
                CvwUsers objCvwUser_Sender = new CvwUsers();
                checkException = objCvwUser_Sender.GetListPaging(9999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                string _Subject = "";
                string _Body = "";
                _Subject = "Third approval confirmed, Payables and Receivables Updated For " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuoteOperations;
                _Body = "Payables and Receivables Updated For " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuoteOperations + " From Quotation " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].Code + "<br />";
                _Body += "Client : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ClientName + "<br />";
                _Body += "Line : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].LineName + "<br />";
                _Body += "POL : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].POLName + "<br />";
                _Body += "POD : " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].PODName + "<br />";

                #endregion Prepare Email Body
                #region Sending Alarm

                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                objCVarEmail.QuotationRouteID = pQuotationRouteID;
                objCVarEmail.EmailSource = constEmailSourceQuotationApprovalSet;
                objCVarEmail.Subject = _Subject;
                objCVarEmail.Body = _Body;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                if (checkException == null) //add to EmailReceivers
                {
                    var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                    var NoOfReceivers = pArrayOfReceiversIDs.Length;
                    for (int i = 0; i < NoOfReceivers; i++)
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                    }
                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                }

                #endregion Sending Alarm
                
            }

            objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].QuotationID, "CodeSerial", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage //pData[0]
                , _MailMessageReturned //pData[1]
                , serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] QR_CopyToAnotherQuotation(Int64 pQRIDToCopy, Int64 pQuotationID)
        {
            bool _result = false;
            Exception checkException = null;
            CQuotationRoute objExistingCQuotationRoute = new CQuotationRoute();
            CQuotationRoute objCQuotationRoute = new CQuotationRoute();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CVarQuotationRoute objCVarQuotationRoute = new CVarQuotationRoute();
            Int32 _RowCount = 0;
            int CreatedQuoteAndOperStageID = 1;
            objExistingCQuotationRoute.GetListPaging(1, 1, "WHERE ID=" + pQRIDToCopy.ToString(), "CodeSerial", out _RowCount); //1 record returned isa

            /*var Quotation = new CQuotations();
            Quotation.GetListPaging(1, 1, "WHERE ID=" + pQuotationID.ToString(), "CodeSerial", out _RowCount);
            //var QuotationDirection = Quotation.lstCVarQuotations[0].DirectionType;
            if(Quotation.lstCVarQuotations[0].QuotationStageID != CreatedQuoteAndOperStageID)
            {
                return new object[] {
                _result
                };
            }*/

            objCVarQuotationRoute.ID = 0;
            objCVarQuotationRoute.Code = "0";
            objCVarQuotationRoute.QuotationID = pQuotationID;
            objCVarQuotationRoute.RoutingTypeID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].RoutingTypeID;
            objCVarQuotationRoute.DirectionType = objExistingCQuotationRoute.lstCVarQuotationRoute[0].DirectionType;
            objCVarQuotationRoute.DirectionIconName = objExistingCQuotationRoute.lstCVarQuotationRoute[0].DirectionIconName;
            objCVarQuotationRoute.DirectionIconStyle = objExistingCQuotationRoute.lstCVarQuotationRoute[0].DirectionIconStyle;
            objCVarQuotationRoute.TransportType = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TransportType;
            objCVarQuotationRoute.TransportIconName = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TransportIconName;
            objCVarQuotationRoute.TransportIconStyle = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TransportIconStyle;
            objCVarQuotationRoute.ShipmentType = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ShipmentType;
            objCVarQuotationRoute.POLCountryID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].POLCountryID;
            objCVarQuotationRoute.POL = objExistingCQuotationRoute.lstCVarQuotationRoute[0].POL;
            objCVarQuotationRoute.PODCountryID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].PODCountryID;
            objCVarQuotationRoute.POD = objExistingCQuotationRoute.lstCVarQuotationRoute[0].POD;
            objCVarQuotationRoute.POLID_Transport = objExistingCQuotationRoute.lstCVarQuotationRoute[0].POLID_Transport;
            objCVarQuotationRoute.ClearancePortID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ClearancePortID;
            objCVarQuotationRoute.ClientPlantID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ClientPlantID;
            objCVarQuotationRoute.PickupPlaceID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].PickupPlaceID;
            objCVarQuotationRoute.PickupAddress = objExistingCQuotationRoute.lstCVarQuotationRoute[0].PickupAddress;
            objCVarQuotationRoute.DeliveryAddress = objExistingCQuotationRoute.lstCVarQuotationRoute[0].DeliveryAddress;
            objCVarQuotationRoute.MoveTypeID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].MoveTypeID;
            objCVarQuotationRoute.ExpirationDate = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ExpirationDate;
            objCVarQuotationRoute.ETAPOLDate = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ETAPOLDate;
            objCVarQuotationRoute.ShippingLineID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ShippingLineID;
            objCVarQuotationRoute.AirlineID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].AirlineID;
            objCVarQuotationRoute.TruckerID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TruckerID;
            objCVarQuotationRoute.TransientTime = objExistingCQuotationRoute.lstCVarQuotationRoute[0].TransientTime;
            objCVarQuotationRoute.Validity = objExistingCQuotationRoute.lstCVarQuotationRoute[0].Validity;
            objCVarQuotationRoute.FreeTime = objExistingCQuotationRoute.lstCVarQuotationRoute[0].FreeTime;
            objCVarQuotationRoute.FreeTimePOD = objExistingCQuotationRoute.lstCVarQuotationRoute[0].FreeTimePOD;
            objCVarQuotationRoute.QuotationStageID = CreatedQuoteAndOperStageID;
            objCVarQuotationRoute.Notes = objExistingCQuotationRoute.lstCVarQuotationRoute[0].Notes;
            objCVarQuotationRoute.CommodityID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].CommodityID;
            objCVarQuotationRoute.IncotermID = objExistingCQuotationRoute.lstCVarQuotationRoute[0].IncotermID;

            objCVarQuotationRoute.NumberOfPackages = objExistingCQuotationRoute.lstCVarQuotationRoute[0].NumberOfPackages;
            objCVarQuotationRoute.Volume = objExistingCQuotationRoute.lstCVarQuotationRoute[0].Volume;
            objCVarQuotationRoute.VolumetricWeight = objExistingCQuotationRoute.lstCVarQuotationRoute[0].VolumetricWeight;
            objCVarQuotationRoute.GrossWeight = objExistingCQuotationRoute.lstCVarQuotationRoute[0].GrossWeight;
            objCVarQuotationRoute.ChargeableWeight = objExistingCQuotationRoute.lstCVarQuotationRoute[0].ChargeableWeight;
            objCVarQuotationRoute.FreightRateFormat = objExistingCQuotationRoute.lstCVarQuotationRoute[0].FreightRateFormat;
            objCVarQuotationRoute.ChargeEditApprovalLevel = 0;
            objCVarQuotationRoute.ChargeEdit1stApprovalUserID = 0;
            objCVarQuotationRoute.ChargeEdit2ndApprovalUserID = 0;
            objCVarQuotationRoute.ChargeEdit3rdApprovalUserID = 0;
            objCVarQuotationRoute.ChargeEdit4thApprovalUserID = 0;
            objCVarQuotationRoute.DenialReason = "0";
            objCVarQuotationRoute.CustomsAcceptedValue = 0;
            objCVarQuotationRoute.ETD = DateTime.Parse("01-01-1900");
            objCVarQuotationRoute.StuffingCutOf = DateTime.Parse("01-01-1900");

            objCVarQuotationRoute.CreatorUserID = objCVarQuotationRoute.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarQuotationRoute.CreationDate = objCVarQuotationRoute.ModificationDate = DateTime.Now;

            objCQuotationRoute.lstCVarQuotationRoute.Add(objCVarQuotationRoute);
            checkException = objCQuotationRoute.SaveMethod(objCQuotationRoute.lstCVarQuotationRoute);
            #region Add QuotationCharges
            if (checkException == null)
            {
                _result = true;
                CQuotationCharges objExistingCQuotationCharges = new CQuotationCharges();
                CQuotationCharges objCQuotationCharges = new CQuotationCharges();
                //objExistingCQuotationCharges.GetList("Where QuotationRouteID=" + pQRIDToCopy.ToString());
                int _tempRowCount = 0;
                checkException = objExistingCQuotationCharges.GetListPaging(5000, 1, "Where QuotationRouteID=" + pQRIDToCopy.ToString(), " ID ", out _tempRowCount);

                for (int i = 0; i < objExistingCQuotationCharges.lstCVarQuotationCharges.Count; i++)
                {
                    CVarQuotationCharges objCVarQuotationCharges = new CVarQuotationCharges();
                    objCVarQuotationCharges.ID = 0;
                    objCVarQuotationCharges.QuotationRouteID = objCVarQuotationRoute.ID;
                    objCVarQuotationCharges.ChargeTypeID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ChargeTypeID;
                    objCVarQuotationCharges.MeasurementID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].MeasurementID;
                    objCVarQuotationCharges.ContainerTypeID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ContainerTypeID;
                    objCVarQuotationCharges.DemurrageDays = objExistingCQuotationCharges.lstCVarQuotationCharges[i].DemurrageDays;
                    objCVarQuotationCharges.PackageTypeID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].PackageTypeID;
                    objCVarQuotationCharges.CostQuantity = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostQuantity;
                    objCVarQuotationCharges.CostPrice = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostPrice;
                    objCVarQuotationCharges.CostAmount = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostAmount;
                    objCVarQuotationCharges.CostCurrencyID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostCurrencyID;
                    objCVarQuotationCharges.CostExchangeRate = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CostExchangeRate;
                    objCVarQuotationCharges.SaleQuantity = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SaleQuantity;
                    objCVarQuotationCharges.SalePrice = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SalePrice;
                    objCVarQuotationCharges.SaleAmount = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SaleAmount;
                    objCVarQuotationCharges.SaleCurrencyID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SaleCurrencyID;
                    objCVarQuotationCharges.POrC = objExistingCQuotationCharges.lstCVarQuotationCharges[i].POrC;
                    objCVarQuotationCharges.SaleExchangeRate = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SaleExchangeRate;
                    objCVarQuotationCharges.OperationPartnerTypeID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].OperationPartnerTypeID;
                    objCVarQuotationCharges.CustomerID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CustomerID;
                    objCVarQuotationCharges.AgentID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].AgentID;
                    objCVarQuotationCharges.ShippingAgentID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ShippingAgentID;
                    objCVarQuotationCharges.CustomsClearanceAgentID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CustomsClearanceAgentID;
                    objCVarQuotationCharges.ShippingLineID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ShippingLineID;
                    objCVarQuotationCharges.AirlineID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].AirlineID;
                    objCVarQuotationCharges.TruckerID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].TruckerID;
                    objCVarQuotationCharges.SupplierID = objExistingCQuotationCharges.lstCVarQuotationCharges[i].SupplierID;
                    objCVarQuotationCharges.Notes = objExistingCQuotationCharges.lstCVarQuotationCharges[i].Notes;
                    objCVarQuotationCharges.HsCode = objExistingCQuotationCharges.lstCVarQuotationCharges[i].HsCode;
                    objCVarQuotationCharges.CustomDuties = objExistingCQuotationCharges.lstCVarQuotationCharges[i].CustomDuties;
                    objCVarQuotationCharges.WTH = objExistingCQuotationCharges.lstCVarQuotationCharges[i].WTH;
                    objCVarQuotationCharges.BankFeeCharges = objExistingCQuotationCharges.lstCVarQuotationCharges[i].BankFeeCharges;
                    objCVarQuotationCharges.commission = objExistingCQuotationCharges.lstCVarQuotationCharges[i].commission;
                    objCVarQuotationCharges.SalesLineCrmCode = "";
                    objCVarQuotationCharges.CostLineCrmCode = "";

                    objCVarQuotationCharges.ViewOrder = objExistingCQuotationCharges.lstCVarQuotationCharges[i].ViewOrder;
                    objCVarQuotationCharges.CreatorUserID = objCVarQuotationCharges.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarQuotationCharges.CreationDate = objCVarQuotationCharges.ModificationDate = DateTime.Now;

                    objCQuotationCharges.lstCVarQuotationCharges.Add(objCVarQuotationCharges);
                }
                objCQuotationCharges.SaveMethod(objCQuotationCharges.lstCVarQuotationCharges);
                //objCvwQuotationRoute.GetListPaging(1000, 1, "WHERE QuotationID=" + objExistingCQuotationRoute.lstCVarQuotationRoute[0].QuotationID, "CodeSerial", out _RowCount);
            }
            #endregion Add QuotationCharges

            return new object[] {
                _result
                //, new JavaScriptSerializer().Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute)
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllForComboBox(bool pDummy ,string pWhereClause)
        {
            int _RowCount = 0;

            //var constOperationsFormID = 29;//OperationsManagement
            var constQuotationsFormID = 28; //QuotationsManagement
            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList("WHERE UserID=" + WebSecurity.CurrentUserId.ToString() + " AND FormID=" + constQuotationsFormID.ToString());
            bool _IsHideOthersRecords = objCvwUserForms.lstCVarvwUserForms[0].HideOthersRecords;
            if (_IsHideOthersRecords)
                //pWhereClause += " AND CreatorUserID=" + WebSecurity.CurrentUserId;
                pWhereClause += " AND SalemanID=" + WebSecurity.CurrentUserId;

            CvwQuotations objCQuotations = new CvwQuotations();
            objCQuotations.GetListPaging(99999, 1, pWhereClause, "ID DESC", out _RowCount);
            var QSimplified = objCQuotations.lstCVarvwQuotations.Select(q => new
            {
                ID = q.ID,
                Code = q.Code
            }).ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(QSimplified) };
        }

        //---------------------------------Mahmoud-----------------------------------

        [HttpGet, HttpPost]

        public object[] GetPerformaToPrint(Int64 pPrintedQuotationID, string pSelectedQRIDs, string pSelectedQChargesIDs)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            bool pIsNSLQuotationFormat = true;
            if (pSelectedQChargesIDs == null)
            {
                pSelectedQChargesIDs = pSelectedQRIDs;

            }
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            CUsers objCUsers = new CUsers();
            objCUsers.GetList(" WHERE  ID = " + WebSecurity.CurrentUserId.ToString());

            CvwDefaults objCvwDefaults = new CvwDefaults();
            checkException = objCvwDefaults.GetListPaging(1, 1, " WHERE 1=1 ", "ID", out _RowCount);

            CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
            CvwQuotationCharges objCvwQuotationSelectedCharges = new CvwQuotationCharges();

            //objCvwQuotationCharges.GetListPaging(3000, 1, " WHERE QuotationRouteID IN (" + pSelectedQRIDs.ToString() + ")", "ChargeTypeCode"/*"ChargeTypeName"*/, out _RowCount);
            objCvwQuotationCharges.GetListPaging(3000, 1, " WHERE QuotationRouteID IN (" + pSelectedQRIDs.ToString() + ")", "ViewOrderForPrint,ChargeTypeCode"/*"ChargeTypeName"*/, out _RowCount);

            objCvwQuotationSelectedCharges.GetListPaging(3000, 1, " WHERE QuotationRouteID IN (" + pSelectedQRIDs.ToString() + ") And ID IN (" + pSelectedQChargesIDs.ToString() + ")", "ViewOrderForPrint,ChargeTypeCode"/*"ChargeTypeName"*/, out _RowCount);


            CvwQuotationRoute objCvwQuotationRoutes = new CvwQuotationRoute();
            objCvwQuotationRoutes.GetListPaging(1000, 1, " WHERE ID IN (" + pSelectedQRIDs.ToString() + ")", "CodeSerial", out _RowCount);

            CQuotationRoute objCQuotationRoutes = new CQuotationRoute();
            objCQuotationRoutes.UpdateList("NumberOfChairs=(ISNULL(NumberOfChairs,0)+1) WHERE ID IN (" + pSelectedQRIDs.ToString() + ")");

            CUsers objCSalesman = new CUsers();
            objCSalesman.GetList("WHERE IsNull(CustomerID , 0) = 0 AND ID=" + objCvwQuotationRoutes.lstCVarvwQuotationRoute[0].SalesmanID);

            CvwQuotations objCvwQuotations = new CvwQuotations();
            checkException = objCvwQuotations.GetListPaging(1, 1, " WHERE ID = " + pPrintedQuotationID.ToString(), "ID", out _RowCount);

            CCustomers objCCustomers = new CCustomers();
            if (objCvwQuotations.lstCVarvwQuotations[0].ClientID > 0)
                checkException = objCCustomers.GetListPaging(1, 1, " WHERE ID = " + objCvwQuotations.lstCVarvwQuotations[0].ClientID, "ID", out _RowCount);
            #region Is data suitable NorthStarLogistics Quotation?
            for (int i = 0; i < objCvwQuotationRoutes.lstCVarvwQuotationRoute.Count; i++)
            {
                var CurrentQRCharges = objCvwQuotationCharges.lstCVarvwQuotationCharges.Where(
                    s => s.QuotationRouteID == objCvwQuotationRoutes.lstCVarvwQuotationRoute[i].ID);
                
                if (CurrentQRCharges.Count() != 2)
                    pIsNSLQuotationFormat = false;
                else
                {
                    if (
                        (CurrentQRCharges.ElementAt(0).ChargeTypeCode != "OCF" && CurrentQRCharges.ElementAt(0).ChargeTypeCode != "EQ")
                        || (CurrentQRCharges.ElementAt(1).ChargeTypeCode != "OCF" && CurrentQRCharges.ElementAt(1).ChargeTypeCode != "EQ")
                        || (CurrentQRCharges.ElementAt(0).ChargeTypeCode == CurrentQRCharges.ElementAt(1).ChargeTypeCode) //to handle case of both are EQ or both are OCF
                    )
                        pIsNSLQuotationFormat = false;
                }


            }


            #endregion Is data suitable NorthStarLogistics Quotation?

            var ContainerTypes_Summary = objCvwQuotationCharges.lstCVarvwQuotationCharges.GroupBy(l => l.ContainerTypeCode).Select(cl => new
            {
                ContainerTypeCode = cl.Key,
                Total = cl.Sum(s => s.CostQuantity)
            });



            var objCvwQuotationContainersAndPackages = new CvwQuotationContainersAndPackages();
            objCvwQuotationContainersAndPackages.GetList($" where QuotationRouteID in ({pSelectedQRIDs}) ");

            string[] quotationRouteIDs;
            if (pSelectedQRIDs.IndexOf(',') >= 0)
            {
                quotationRouteIDs = pSelectedQRIDs.Split(',');
            }
            else
            {
                quotationRouteIDs = new string[] { pSelectedQRIDs };
            }

            bool IsPerforma = false;

            foreach (string routeID in quotationRouteIDs)
            {
                CQuotationActionLog objCQuotationActionLog = new CQuotationActionLog();

                objCQuotationActionLog.GetList(" WHERE QuotationRouteID = " + routeID);

                if (objCQuotationActionLog.lstCVarQuotationActionLog.Count == 0)
                {
                    long pSelectedQuotationRoute = long.Parse(routeID);

                    CVarQuotationActionLog newActionLog = new CVarQuotationActionLog
                    {
                        QuotationID = pPrintedQuotationID,
                        QuotationRouteID = pSelectedQuotationRoute,
                        ActionID = 1000,
                        ActionName = "PrintPerforma",
                        UserID = WebSecurity.CurrentUserId,
                        ActionDate = DateTime.Now
                    };

                    objCQuotationActionLog.lstCVarQuotationActionLog.Add(newActionLog);

                    checkException = objCQuotationActionLog.SaveMethod(objCQuotationActionLog.lstCVarQuotationActionLog);

                    IsPerforma = true;
                }
                else
                {
                    IsPerforma = true;


                }
            }



            var PoNumbers = objCCustomizedDBCall.CallStringFunction($"select PONumber from Operations where QuotationRouteID in ({pSelectedQRIDs})");


            if (checkException == null)
                _result = true;

            if (_result)
                return new object[] {
                    _result //data[0]
                    , objCUsers.lstCVarUsers[0].Name //pUserName = data[1]
                    , objCUsers.lstCVarUsers[0].Mobile1 //pUserMobile1 = data[2]
                    , objCUsers.lstCVarUsers[0].Phone1 //pUserPhone1 = data[3]
                    , objCUsers.lstCVarUsers[0].Email //pUserEmail = data[4]
                    , objCvwQuotations.lstCVarvwQuotations[0].Code //pQuotationCode = data[5]
                    , objCvwQuotations.lstCVarvwQuotations[0].ClientName //pClientName = data[6]
                    , objCvwQuotations.lstCVarvwQuotations[0].ClientContactName //pClientContactName = data[7]
                    , objCvwQuotations.lstCVarvwQuotations[0].ClientContactEmail //pClientContactEmail = data[8]
                    , objCvwQuotations.lstCVarvwQuotations[0].RepDirectionTypeShown //pRepDirectionTypeShown = data[9]
                    , new JavaScriptSerializer().Serialize(objCvwQuotationRoutes.lstCVarvwQuotationRoute) //pTblQuotationRoutes = data[10]
                    , new JavaScriptSerializer().Serialize(objCvwQuotationSelectedCharges.lstCVarvwQuotationCharges) //pTblQuotationCharges = data[11]
                    , new JavaScriptSerializer().Serialize(objCvwQuotationCharges.lstCVarvwQuotationCharges) //pTblQuotationCharges = data[12]
                    
                    , objCvwQuotations.lstCVarvwQuotations[0].AgentName //pAgentName = data[13]
                    , objCvwQuotations.lstCVarvwQuotations[0].AgentContactName //pAgentContactName = data[14]
                    , objCvwQuotations.lstCVarvwQuotations[0].AgentContactEmail //pAgentContactEmail = data[15]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateSubject : objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject //pSubject = data[16]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateTermsAndConditions : objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions //pTermsAndConditions = data[17]
                    , objCvwDefaults.lstCVarvwDefaults[0].Phones //pCompanyPhones = data[18]
                    , objCvwDefaults.lstCVarvwDefaults[0].Faxes //pCompanyFaxes = data[19]
                    , pIsNSLQuotationFormat //pIsNSLQuotationFormat = data[20]
                    , new JavaScriptSerializer().Serialize(objCvwQuotations.lstCVarvwQuotations[0]) //pQuotationHeader = data[21]
                    , ContainerTypes_Summary //ContainerTypes_Summary = data[22]
                    , new JavaScriptSerializer().Serialize(objCSalesman.lstCVarUsers[0]) //pSalesmanHeader = data[23]
                    , objCCustomers.lstCVarCustomers.Count == 0 ? null :new JavaScriptSerializer().Serialize(objCCustomers.lstCVarCustomers[0]) //pCustomer = data[24]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject_Clearance == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateSubject_Clearance : objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject_Clearance //pSubject = data[25]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions_Clearance == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateTermsAndConditions_Clearance : objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions_Clearance //pTermsAndConditions = data[26]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject_Transport == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateSubject_Transport : objCvwQuotations.lstCVarvwQuotations[0].QuotationSubject_Transport //pSubject = data[27]
                    , objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions_Transport == "0" ? objCvwQuotations.lstCVarvwQuotations[0].TemplateTermsAndConditions_Transport : objCvwQuotations.lstCVarvwQuotations[0].QuotationTermsAndConditions_Transport //pTermsAndConditions = data[28]
                    , objCvwQuotations.lstCVarvwQuotations[0].ShipmentTypeName//pShipmentTypeName = data[29]
                    , objCvwQuotations.lstCVarvwQuotations[0].TransportTypeName//pTransportTypeName = data[30]
                    , new JavaScriptSerializer().Serialize(objCvwQuotationContainersAndPackages.lstCVarvwQuotationContainersAndPackages)//pShipmentDetails = data[31]
                    ,IsPerforma
                    ,PoNumbers
                };
            else
                return new object[] {
                    _result //data[0]
            };
        }




        [HttpGet, HttpPost]


        public object[] LCLPerformaToPrint(string pPrintedQuotationID, string pSelectedQRIDs)
        {
            bool _result = false;
            Exception checkException = null;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");

            if (pPrintedQuotationID == null)
            {
                pPrintedQuotationID = pSelectedQRIDs;

            }
            CvwOperations objCvwOperations = new CvwOperations();
            objCvwOperations.GetList($" where ID in ({pSelectedQRIDs}) ");

            var checkMasterO = objCvwOperations.lstCVarvwOperations[0].MasterOperationID;
            var House = objCvwOperations.lstCVarvwOperations[0].HouseNumber;
            /*long QRID = objCvwOperations.lstCVarvwOperations[0].QuotationRouteID;

            CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
            if(QRID > 0)
            {
                Exception ee = objCvwQuotationCharges.GetListPaging(99,1,$"WHERE QuotationRouteID={QRID}","ID",out _);
            }*/

            CvwPayables objCvwPayables = new CvwPayables();
            CvwReceivables objCvwReceivables = new CvwReceivables();  
            
            
            CvwPayables objCvwPayablesSelected = new CvwPayables();
            CvwReceivables objCvwReceivablesSelected = new CvwReceivables();

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "UNF" || checkMasterO == 0)
            {
                if (pPrintedQuotationID == pSelectedQRIDs)
                {
                    objCvwPayables.GetList($" where OperationID in ({pSelectedQRIDs}) ");
                    objCvwReceivables.GetList($" where OperationID in ({pSelectedQRIDs}) ");

                }
                else
                {
                objCvwPayablesSelected.GetList($" WHERE OperationID IN (" + pSelectedQRIDs.ToString() + ") And ID IN (" + pPrintedQuotationID.ToString() + ")");
                objCvwReceivablesSelected.GetList($" WHERE OperationID IN (" + pSelectedQRIDs.ToString() + ") And ID IN (" + pPrintedQuotationID.ToString() + ")");

                }


            }
            else
            {
                if (pPrintedQuotationID == pSelectedQRIDs)
                {
                    objCvwPayables.GetList($" where MasterOperationID in ({checkMasterO}) And HouseNumber = {House}  And  OperationID in ({pSelectedQRIDs})");

                    objCvwReceivables.GetList($"  where MasterOperationID in ({checkMasterO}) And HouseNumber = {House}  And  OperationID in ({pSelectedQRIDs})");
                }
                else
                {
                objCvwPayablesSelected.GetList($" WHERE OperationID IN (" + pSelectedQRIDs.ToString() + ") And ID IN (" + pPrintedQuotationID.ToString() + ")");
                objCvwReceivablesSelected.GetList($" WHERE OperationID IN (" + pSelectedQRIDs.ToString() + ") And ID IN (" + pPrintedQuotationID.ToString() + ")");

                }
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            if (checkException == null)
                _result = true;

            if (_result)
                return new object[] {
                    _result //data[0]
                    , objCvwOperations.lstCVarvwOperations[0]
                    ,objCvwPayables.lstCVarvwPayables
                    ,objCvwReceivables.lstCVarvwReceivables
                    ,objCvwPayablesSelected.lstCVarvwPayables
                    ,objCvwReceivablesSelected.lstCVarvwReceivables
                    //,serializer.Serialize(objCvwQuotationCharges.lstCVarvwQuotationCharges)
                };
            else
                return new object[] {
                    _result //data[0]
            };
        }


        //---------------------------------Mahmoud-----------------------------------


        [HttpGet, HttpPost]
        public Object[] CheckQuotationDraft(int pQuotationID)
        {
            int _rowCount = 0;
            bool _result = false;

            CQuotationsDraft objCQuotationsDraft = new CQuotationsDraft();
            Exception e = objCQuotationsDraft.GetListPaging(9999, 1, $"WHERE OriginalQuotationID={pQuotationID} AND ISNULL(IsApproved,0)=0", "ID", out _rowCount);

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string ConsigneeName = "";
            string ShipperName = "";
            string AgentName = "";
            string SalesLeadName = "";

            string CContactID = "";
            string SContactID = "";
            string AContactID = "";
            string SLContactID = "";

            string TemplateName = "";

            string OperationManName = "";
            string BranchName = "";
            string SalesmanName = "";

            if (_rowCount == 1)
            {
                ConsigneeName = objCCustomizedDBCall.CallStringFunction($"Select Name From Customers Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].ConsigneeID}");
                ShipperName = objCCustomizedDBCall.CallStringFunction($"Select Name From Customers Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].ShipperID}");
                AgentName = objCCustomizedDBCall.CallStringFunction($"Select Name From Agents Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].AgentID}");
                SalesLeadName = objCCustomizedDBCall.CallStringFunction($"Select Name From CRM_Clients Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].SalesLeadID}");
                CContactID = objCCustomizedDBCall.CallStringFunction($"Select Name From Contacts Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].ConsigneeContactID}");
                SContactID = objCCustomizedDBCall.CallStringFunction($"Select Name From Contacts Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].ShipperContactID}");
                AContactID = objCCustomizedDBCall.CallStringFunction($"Select Name From Contacts Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].AgentContactID}");
                SLContactID = objCCustomizedDBCall.CallStringFunction($"Select Name From Contacts Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].SalesLeadContactID}");

                TemplateName = objCCustomizedDBCall.CallStringFunction($"Select Name From Template Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].TemplateID}");
                OperationManName = objCCustomizedDBCall.CallStringFunction($"Select Name From Users Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].OperationManID}");
                BranchName = objCCustomizedDBCall.CallStringFunction($"Select Name From Branches Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].BranchID}");
                SalesmanName = objCCustomizedDBCall.CallStringFunction($"Select Name From Users Where ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].SalesmanID}");
            }

            if (e == null)
            {
                _result = true;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[]
            {   _result, //pData[0]
                _rowCount, //pData[1]
                serializer.Serialize(objCQuotationsDraft.lstCVarQuotationsDraft), //pData[2]
                ConsigneeName, //pData[3]
                ShipperName,
                AgentName,
                SalesLeadName,
                CContactID,  // pData[7]
                SContactID,
                AContactID,
                SLContactID,
                TemplateName, // pData[11]
                OperationManName, //12
                BranchName,
                SalesmanName
        };
        }



        [HttpGet, HttpPost]
        public Object[] CheckChargeTypeCategory(int pQuotationRouteId ,int pCategoryId ,int pQuotaionChargeId)
        {
            int _rowCount = 0;
            bool _result = false;
            CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();
            //    select ChargeTypeID from QuotationCharges where id = 86691

            //   select QuotationID from QuotationRoute where id = 43372
            //     select TransportType ,DirectionType from quotations where id = 43718

            //select* from ChargeTypeAccounts where ChargeTypeID = 16509  and ServiceID = 1 and DirectionID = 1 and CategoryID =
            //CChargeTypeAccounts cChargeTypeAccounts = new CChargeTypeAccounts();
            //CQuotationRoute cQuotationRoute = new CQuotationRoute();
            //CQuotations cQuotations = new CQuotations();
            //CQuotationCharges cQuotationCharges = new CQuotationCharges();
            //cQuotationCharges.GetList($"where id = {pQuotaionChargeId}");


            var RevenueAccountID = cCustomizedDBCall.CallStringFunction($@"
    SELECT cha.RevenueAccountID
    FROM ChargeTypeAccounts cha
    JOIN Quotations O ON O.ID = (SELECT QuotationID FROM QuotationRoute qr WHERE qr.ID = {pQuotationRouteId})
        AND cha.DirectionID = O.DirectionType
        AND cha.ServiceID = CASE 
            WHEN O.TransportType = 2 THEN 3 -- AIR
            WHEN O.TransportType = 1 AND O.ShipmentType = 1 THEN 1 -- FCL
            WHEN O.TransportType = 1 AND O.ShipmentType IN (2,5) THEN 2 -- LCL
            WHEN O.TransportType = 3 THEN 5 -- Inland
            WHEN O.DirectionType = 3 THEN 4 -- Domestic
        END
    WHERE cha.ChargeTypeID = (SELECT ChargeTypeID FROM QuotationCharges QC WHERE QC.ID = {pQuotaionChargeId})
        AND cha.CategoryID ={pCategoryId}
");

            var ExpenseAccountID = cCustomizedDBCall.CallStringFunction($@"
    SELECT cha.ExpenseAccountID
    FROM ChargeTypeAccounts cha
    JOIN Quotations O ON O.ID = (SELECT QuotationID FROM QuotationRoute qr WHERE qr.ID =  {pQuotationRouteId})
        AND cha.DirectionID = O.DirectionType
        AND cha.ServiceID = CASE 
            WHEN O.TransportType = 2 THEN 3 -- AIR
            WHEN O.TransportType = 1 AND O.ShipmentType = 1 THEN 1 -- FCL
            WHEN O.TransportType = 1 AND O.ShipmentType IN (2,5) THEN 2 -- LCL
            WHEN O.TransportType = 3 THEN 5 -- Inland
            WHEN O.DirectionType = 3 THEN 4 -- Domestic
        END
    WHERE cha.ChargeTypeID = (SELECT ChargeTypeID FROM QuotationCharges QC WHERE QC.ID =  {pQuotaionChargeId})
        AND cha.CategoryID = {pCategoryId}
");


            if (ExpenseAccountID !="" || RevenueAccountID!="")
                _result = true;

            return new object[]
            {   _result, //pData[0]
               
             };
        }



        [HttpGet]
        public object[] SendQuotationApprovalRequest(string pAlarmReceiversIDs, int pQuotationID, int pRequstedApprovalLevel, int pShipperID, int pShipperContactID, int pConsigneeID, int pConsigneeContactID, int pAgentID, int pAgentContactID, int pSalesLeadID, int pSalesLeadContactID, int pTemplateID, string pSubject, string pTermsAndConditions, int pBranchID, int pSalesmanID, int pOperationManID, string pNotes, bool pIsDangerousGoods, bool pIsWarehousing, string pDescriptionOfGoods)
        {
            int _RowCount = 0;
            string _ReturnedMessage = "";
            Exception checkException = null;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList(" WHERE 1=1");
            CvwUserForms objCvwUserForms = new CvwUserForms();

            var constEmailSourceQuotationGeneralApprovalRequest = 101;
            if (string.IsNullOrWhiteSpace(pAlarmReceiversIDs))
                checkException = objCvwUserForms.GetList($"WHERE ImageName='QuotationApproval' AND CanView=1 AND UserID IN ({pAlarmReceiversIDs})");
            if (objCvwUserForms.lstCVarvwUserForms.Count == 0 && string.IsNullOrWhiteSpace(pAlarmReceiversIDs))
                _ReturnedMessage = "No users have quotation approval privilege.";
            else
            {
                CQuotationsDraft objCQuotationsDraft2 = new CQuotationsDraft();
                checkException = objCQuotationsDraft2.GetList($"WHERE OriginalQuotationID={pQuotationID} AND ISNULL(IsApproved,0)=0");
                if(checkException != null)
                {
                    return new object[] {
                        checkException.Message
                    };
                }

                CQuotations objCQuotations = new CQuotations();
                checkException = objCQuotations.GetItem(pQuotationID);
                if (checkException != null)
                {
                    return new object[] {
                        checkException.Message
                    };
                }

                CVarQuotationsDraft objCVarQuotationsDraft = new CVarQuotationsDraft();


                if (checkException == null && objCQuotations.lstCVarQuotations.Count == 1 && objCQuotationsDraft2.lstCVarQuotationsDraft.Count == 0)
                {
                    var props = new List<string>() { "ID", "OriginalQuotationID", "IsApproved", "ApprovalLevel", "FirstApprovalUserID", "SecondApprovalUserID", "ThirdApprovalUserID", "FirstApprovalUsers", "SecondApprovalUsers", "ThirdApprovalUsers", "Subject", "TemplateID", "TermsAndConditions", "CRMCode", "IsLoadingDischarging", "IsPackingRemovals", "IsSurvey", "IsLashing" };
                    foreach (PropertyInfo prop in objCQuotations.lstCVarQuotations[0].GetType().GetProperties())
                    {
                        if (!props.Contains(prop.Name))
                        {
                            objCVarQuotationsDraft.GetType().GetProperty(prop.Name).SetValue(objCVarQuotationsDraft, prop.GetValue(objCQuotations.lstCVarQuotations[0], null), null);
                        }
                    }
                    objCVarQuotationsDraft.ID = 0;
                    objCVarQuotationsDraft.OriginalQuotationID = pQuotationID;
                    objCVarQuotationsDraft.IsApproved = false;
                    objCVarQuotationsDraft.ApprovalLevel = 0;
                    objCVarQuotationsDraft.FirstApprovalUserID = 0;
                    objCVarQuotationsDraft.SecondApprovalUserID = 0;
                    objCVarQuotationsDraft.ThirdApprovalUserID = 0;
                    objCVarQuotationsDraft.FirstApprovalUsers = pAlarmReceiversIDs;
                    objCVarQuotationsDraft.SecondApprovalUsers = "0";
                    objCVarQuotationsDraft.ThirdApprovalUsers = "0";
                    objCVarQuotationsDraft.ConsigneeID = pConsigneeID;
                    objCVarQuotationsDraft.ConsigneeContactID = pConsigneeContactID;
                    objCVarQuotationsDraft.ShipperID = pShipperID;
                    objCVarQuotationsDraft.ShipperContactID = pShipperContactID;
                    objCVarQuotationsDraft.AgentID = pAgentID;
                    objCVarQuotationsDraft.AgentContactID = pAgentContactID;
                    objCVarQuotationsDraft.SalesLeadID = pSalesLeadID;
                    objCVarQuotationsDraft.SalesLeadContactID = pSalesLeadContactID;

                    objCVarQuotationsDraft.Subject = pSubject;
                    objCVarQuotationsDraft.TemplateID = pTemplateID;
                    objCVarQuotationsDraft.TermsAndConditions = pTermsAndConditions;

                    objCVarQuotationsDraft.BranchID = pBranchID;
                    objCVarQuotationsDraft.SalesmanID = pSalesmanID;
                    objCVarQuotationsDraft.OperationManID = pOperationManID;
                    objCVarQuotationsDraft.Notes = pNotes;
                    objCVarQuotationsDraft.IsDangerousGoods = pIsDangerousGoods;
                    objCVarQuotationsDraft.IsWarehousing = pIsWarehousing;
                    objCVarQuotationsDraft.DescriptionOfGoods = pDescriptionOfGoods;

                    CQuotationsDraft objCQuotationsDraft = new CQuotationsDraft();
                    objCQuotationsDraft.lstCVarQuotationsDraft.Add(objCVarQuotationsDraft);
                    checkException = objCQuotationsDraft.SaveMethod(objCQuotationsDraft.lstCVarQuotationsDraft);
                    if (checkException != null)
                    {
                        return new object[] {
                        checkException.Message
                    };
                    }
                }
                else if (checkException == null && objCQuotations.lstCVarQuotations.Count == 1 && objCQuotationsDraft2.lstCVarQuotationsDraft.Count == 1)
                {
                    var objCQuotationsDraftToUpdate = new CQuotationsDraft();
                    if (pRequstedApprovalLevel == 2)
                    {
                        checkException = objCQuotationsDraftToUpdate.UpdateList($"SecondApprovalUsers='{pAlarmReceiversIDs}' WHERE OriginalQuotationID={pQuotationID}");
                    }
                    else if (pRequstedApprovalLevel == 3)
                    {
                        checkException = objCQuotationsDraftToUpdate.UpdateList($"ThirdApprovalUsers='{pAlarmReceiversIDs}' WHERE OriginalQuotationID={pQuotationID}");
                    }

                    if (checkException != null)
                    {
                        return new object[] {
                        checkException.Message
                        };

                    }
                }

                #region Prepare Email Body
                string _Subject = "";
                string _Body = "";
                _Subject = $"Quotation General Approval Level {pRequstedApprovalLevel} Request for " + objCQuotations.lstCVarQuotations[0].Code;
                _Body = "Quotation General Approval Request of level " + pRequstedApprovalLevel + " for " + objCQuotations.lstCVarQuotations[0].Code + "<br />";


                #endregion Prepare Email Body
                #region Sending Alarm

                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                objCVarEmail.QuotationRouteID = 0;
                objCVarEmail.EmailSource = constEmailSourceQuotationGeneralApprovalRequest;
                objCVarEmail.Subject = _Subject;
                objCVarEmail.Body = _Body;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCVarEmail.RequestOrReply = pQuotationID; // IN MED with emailsource 101 -> RequestOrReply here hold Quotation ID
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                if (checkException == null) //add to EmailReceivers
                {
                    var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                    var NoOfReceivers = pArrayOfReceiversIDs.Length;
                    for (int i = 0; i < NoOfReceivers; i++)
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                    }
                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                } else
                {
                    _ReturnedMessage = checkException.Message;
                }

                #endregion Sending Alarm
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage //pData[0]
            };
        }

        [HttpGet]
        public object[] QuotationEditConfirmApproval(int pQuotationID, int pSetApprovalLevel, long pDummy, bool pIsReject)
        {
            Int32 _RowCount = 0;
            string _ReturnedMessage = "";
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList(" WHERE 1=1");

            Exception checkException = null;

            var constEmailSourceQuotationGeneralApprovalSet = 102;

            CQuotationsDraft objCQuotationsDraft = new CQuotationsDraft();
            checkException = objCQuotationsDraft.GetList($"WHERE OriginalQuotationID={pQuotationID} AND ISNULL(IsApproved,0)=0");
            if (checkException != null)
            {
                return new object[] {
                        checkException.Message
                    };
            }

            if(objCQuotationsDraft.lstCVarQuotationsDraft.Count == 0)
            {
                return new object[] {
                        "Already Confirmed"
                    };
            }

            CQuotationsDraft objCQuotationsDraftForUpdate = new CQuotationsDraft();
            string updateClause = "";
            if (pSetApprovalLevel == 1)
                updateClause += "ApprovalLevel = 1,FirstApprovalUserID =" + WebSecurity.CurrentUserId + " \n";
            else if (pSetApprovalLevel == 2)
                updateClause += "ApprovalLevel = 2,SecondApprovalUserID =" + WebSecurity.CurrentUserId + " \n";
            else if (pSetApprovalLevel == 3)
                updateClause += "ApprovalLevel = 3,IsApproved=1,ThirdApprovalUserID =" + WebSecurity.CurrentUserId + " \n";
            else
                updateClause += "ApprovalLevel = 0, IsApproved=1, Subject_Clearance='REJECTED', ExporterID=" + WebSecurity.CurrentUserId;
            updateClause += ",ModificationDate = GETDATE() " + "\n";
            updateClause += "WHERE ID = " + objCQuotationsDraft.lstCVarQuotationsDraft[0].ID + "\n";
            checkException = objCQuotationsDraftForUpdate.UpdateList(updateClause);


            if (checkException != null)
                _ReturnedMessage = checkException.Message;
            else
            {
                CQuotations objCQuotations = new CQuotations();
                if(pSetApprovalLevel == 3)
                {
                    var cid = objCQuotationsDraft.lstCVarQuotationsDraft[0].ConsigneeID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].ConsigneeID.ToString();
                    var ccid = objCQuotationsDraft.lstCVarQuotationsDraft[0].ConsigneeContactID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].ConsigneeContactID.ToString();

                    var sid = objCQuotationsDraft.lstCVarQuotationsDraft[0].ShipperID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].ShipperID.ToString();
                    var scid = objCQuotationsDraft.lstCVarQuotationsDraft[0].ShipperContactID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].ShipperContactID.ToString();

                    var aid = objCQuotationsDraft.lstCVarQuotationsDraft[0].AgentID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].AgentID.ToString();
                    var acid = objCQuotationsDraft.lstCVarQuotationsDraft[0].AgentContactID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].AgentContactID.ToString();

                    var slid = objCQuotationsDraft.lstCVarQuotationsDraft[0].SalesLeadID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].SalesLeadID.ToString();
                    var slcid = objCQuotationsDraft.lstCVarQuotationsDraft[0].SalesLeadContactID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].SalesLeadContactID.ToString();

                    var te = objCQuotationsDraft.lstCVarQuotationsDraft[0].TemplateID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].TemplateID.ToString();
                    var su = objCQuotationsDraft.lstCVarQuotationsDraft[0].Subject == "0" ? "NULL" : $"N'{objCQuotationsDraft.lstCVarQuotationsDraft[0].Subject.Replace("'", "''")}'";
                    var tac = objCQuotationsDraft.lstCVarQuotationsDraft[0].TermsAndConditions == "0" ? "NULL" : $"N'{objCQuotationsDraft.lstCVarQuotationsDraft[0].TermsAndConditions.Replace("'", "''")}'";

                    var branch = objCQuotationsDraft.lstCVarQuotationsDraft[0].BranchID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].BranchID.ToString();
                    var sales = objCQuotationsDraft.lstCVarQuotationsDraft[0].SalesmanID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].SalesmanID.ToString();
                    var opman = objCQuotationsDraft.lstCVarQuotationsDraft[0].OperationManID == 0 ? "NULL" : objCQuotationsDraft.lstCVarQuotationsDraft[0].OperationManID.ToString();
                    var qnotes = objCQuotationsDraft.lstCVarQuotationsDraft[0].Notes == "0" ? "NULL" : $"N'{objCQuotationsDraft.lstCVarQuotationsDraft[0].Notes.Replace("'", "''")}'";
                    var isdan = objCQuotationsDraft.lstCVarQuotationsDraft[0].IsDangerousGoods ? "1" : "0";
                    var iswar = objCQuotationsDraft.lstCVarQuotationsDraft[0].IsWarehousing ? "1" : "0";
                    var qdesc = objCQuotationsDraft.lstCVarQuotationsDraft[0].DescriptionOfGoods == "0" ? "NULL" : $"N'{objCQuotationsDraft.lstCVarQuotationsDraft[0].DescriptionOfGoods.Replace("'", "''")}'";

                    

                    checkException = objCQuotations.UpdateList($"ConsigneeID={cid}, ConsigneeContactID={ccid}, ShipperID={sid}, ShipperContactID={scid},TemplateID={te},Subject={su},TermsAndConditions={tac}, AgentID={aid}, AgentContactID={acid}, SalesLeadID={slid}, SalesLeadContactID={slcid},ModificationDate = GETDATE(),BranchID={branch},SalesmanID={sales},OperationManID={opman},Notes={qnotes},IsDangerousGoods={isdan},IsWarehousing={iswar},DescriptionOfGoods={qdesc} WHERE ID={objCQuotationsDraft.lstCVarQuotationsDraft[0].OriginalQuotationID}");
                    if (checkException != null)
                    {
                        return new object[] {
                            checkException.Message
                        };
                    }
                    CCustomizedDBCall getOperationsIDs = new CCustomizedDBCall();
                    string OPIDs = getOperationsIDs.CallStringFunctionByMultiReturn($"select ID from Operations where QuotationRouteID IN (select ID from QuotationRoute where QuotationID={pQuotationID})");

                    COperationPartners objCOperationPartners = new COperationPartners();
                    COperations objCOperations = new COperations();
                    if (OPIDs != "" && OPIDs.Split(',').Count() > 0)
                    {
                        objCOperationPartners.UpdateList($"CustomerID={cid},ContactID={ccid} WHERE OperationPartnerTypeID=2 AND OperationID IN ({OPIDs})");
                        objCOperations.UpdateList($"ConsigneeID={cid} WHERE OperationID IN ({OPIDs})");

                        objCOperationPartners.UpdateList($"CustomerID={sid},ContactID={scid} WHERE OperationPartnerTypeID=1 AND OperationID IN ({OPIDs})");
                        objCOperations.UpdateList($"ShipperID={sid} WHERE OperationID IN ({OPIDs})");

                        objCOperationPartners.UpdateList($"AgentID={sid},ContactID={acid} WHERE OperationPartnerTypeID=6 AND OperationID IN ({OPIDs})");
                        objCOperations.UpdateList($"AgentID={aid} WHERE OperationID IN ({OPIDs})");

                    }
                }

                string pAlarmReceiversIDs = objCQuotationsDraft.lstCVarQuotationsDraft[0].CreatorUserID.ToString();
                {
                    CvwUsers objCvwUser_Sender = new CvwUsers();
                    checkException = objCvwUser_Sender.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
                    string _Subject = "";
                    string _Body = "";
                    _Body = "<b>Sender : " + objCvwUser_Sender.lstCVarvwUsers[0].Email_DisplayName + "</b><br>";
                    if (pSetApprovalLevel == 1)
                    {
                        _Subject = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General first approval level is confirmed.";
                        _Body = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General has first approval level." + "<br />";
                    }
                    else if (pSetApprovalLevel == 2)
                    {
                        _Subject = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General second approval level is confirmed.";
                        _Body = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General has second approval level." + "<br />";
                    }
                    else if (pSetApprovalLevel == 3)
                    {
                        _Subject = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General third approval level is confirmed.";
                        _Body = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General has third approval level." + "<br />";
                    }
                    else if (pSetApprovalLevel == 4)
                    {
                        _Subject = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General final approval level is confirmed.";
                        _Body = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General has final approval level." + "<br />";
                    }
                    else //Rejected
                    {
                        _Subject = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General is rejected.";
                        _Body = objCQuotationsDraft.lstCVarQuotationsDraft[0].Code + " General is rejected." + "<br />";
                    }

                    #region Sending Alarm

                    CVarEmail objCVarEmail = new CVarEmail();
                    CEmail objCEmail = new CEmail();
                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                    //if (pIsApproved)
                    //{
                    objCVarEmail.QuotationRouteID = 0; //i dont set it in case of denial not to show create link
                    //}
                    objCVarEmail.EmailSource = constEmailSourceQuotationGeneralApprovalSet;
                    objCVarEmail.Subject = _Subject;
                    objCVarEmail.Body = _Body;
                    objCVarEmail.RequestOrReply = pQuotationID;
                    objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                    objCVarEmail.SendingDate = DateTime.Now;
                    objCEmail.lstCVarEmail.Add(objCVarEmail);
                    checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                    if (checkException == null) //add to EmailReceivers
                    {
                        var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                        var NoOfReceivers = pArrayOfReceiversIDs.Length;
                        for (int i = 0; i < NoOfReceivers; i++)
                        {
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                            objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCVarEmailReceiver.IsAlarm = true;

                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                        }
                        checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                    }

                    #endregion Sending Alarm
                }
            }
            objCQuotationsDraft.GetListPaging(1000, 1, "WHERE ID = " + objCQuotationsDraft.lstCVarQuotationsDraft[0].ID , "CodeSerial", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage
                , serializer.Serialize(objCQuotationsDraft.lstCVarQuotationsDraft)
            };
        }


        private Exception InsertAKSOperationTracking(Models.Operations.Operations.Generated.Old.CVarOperations pOperation)
        {
            if (pOperation == null || pOperation.ID == 0)
            {
                return new Exception("Operation Not Exist!");
            }

            COperationTracking objCOperationTracking = new COperationTracking();

            string whereClause = " where 1 = 1 ";
            switch (pOperation.DirectionType)
            {
                case 1: whereClause += " and IsImport = 1"; break;
                case 2: whereClause += " and IsExport = 1"; break;
                case 3: whereClause += " and IsDomestic = 1"; break;
            }
            switch (pOperation.TransportType)
            {
                case 1: whereClause += " and IsOcean = 1"; break;
                case 2: whereClause += " and IsAir = 1"; break;
                case 3: whereClause += " and IsInland = 1"; break;
            }
            whereClause += " AND Name IN ('INVOICING','PAYMENT ORDER','EXPENSE','DOCUMENT UPLOAD','ARRIVAL NOTICE')";
            var objCTrackingStage = new CTrackingStage();
            Exception checkException = objCTrackingStage.GetList(whereClause);

            var datetimeNow = DateTime.Now;

            foreach (var item in objCTrackingStage.lstCVarTrackingStage)
            {
                objCOperationTracking.lstCVarOperationTracking.Add(new CVarOperationTracking
                {
                    OperationID = pOperation.ID,
                    TrackingStageID = item.ID,
                    CreatorUserID = WebSecurity.CurrentUserId,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    CreationDate = datetimeNow,
                    ModificationDate = datetimeNow
                });
                Common.Common.ReplaceNull(objCOperationTracking.lstCVarOperationTracking[objCOperationTracking.lstCVarOperationTracking.Count - 1]);
            }
            if (objCOperationTracking.lstCVarOperationTracking.Count > 0)
                checkException = objCOperationTracking.SaveMethod(objCOperationTracking.lstCVarOperationTracking);
            return checkException;
        }
        Exception InsertOperationTracking(Models.Operations.Operations.Generated.Old.CVarOperations pOperation, string pCompanyName = "")
        {
            if (string.IsNullOrWhiteSpace(pCompanyName))
            {
                CDefaults objCDefaults = new CDefaults();
                objCDefaults.GetList($" where ID = (select IsNull(Max(ID),0) from Defaults) ");
                pCompanyName = objCDefaults.lstCVarDefaults[0].UnEditableCompanyName;
            }
            if (!(new string[] { "ELI", "MR" }.Contains(pCompanyName)))
            {
                return null;
            }
            if (pOperation == null || pOperation.ID == 0)
            {
                return new Exception("Operation Not Exist!");
            }
            COperationTracking objCOperationTracking = new COperationTracking();
            objCOperationTracking.GetList($" where OperationID = {pOperation.ID} ");
            if (objCOperationTracking.lstCVarOperationTracking.Count > 0)
            {
                return new Exception("Operation Tracking Exist!");
            }
            string whereClause = " where 1 = 1 ";
            switch (pOperation.DirectionType)
            {
                case 1: whereClause += " and IsImport = 1"; break;
                case 2: whereClause += " and IsExport = 1"; break;
                case 3: whereClause += " and IsDomestic = 1"; break;
            }
            switch (pOperation.TransportType)
            {
                case 1: whereClause += " and IsOcean = 1"; break;
                case 2: whereClause += " and IsAir = 1"; break;
                case 3: whereClause += " and IsInland = 1"; break;
            }
            var objCTrackingStage = new CTrackingStage();
            Exception checkException = objCTrackingStage.GetList(whereClause);

            var datetimeNow = DateTime.Now;

            foreach (var item in objCTrackingStage.lstCVarTrackingStage)
            {
                objCOperationTracking.lstCVarOperationTracking.Add(new CVarOperationTracking
                {
                    OperationID = pOperation.ID,
                    TrackingStageID = item.ID,
                    CreatorUserID = WebSecurity.CurrentUserId,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    CreationDate = datetimeNow,
                    ModificationDate = datetimeNow
                });
                Common.Common.ReplaceNull(objCOperationTracking.lstCVarOperationTracking[objCOperationTracking.lstCVarOperationTracking.Count - 1]);
            }
            checkException = objCOperationTracking.SaveMethod(objCOperationTracking.lstCVarOperationTracking);
            return checkException;
        }
    }


    public class InsertQuotationData
    {
        public string pCode { get; set; }
        public string pBranchID { get; set; }
        public string pSalesmanID { get; set; }
        public string pOperationManID { get; set; }
        public string pDirectionType { get; set; }
        public string pDirectionIconName { get; set; }
        public string pDirectionIconStyle { get; set; }
        public string pTransportType { get; set; }
        public string pTransportIconName { get; set; }
        public string pTransportIconStyle { get; set; }
        public string pShipmentType { get; set; }
        public string pShipperID { get; set; }
        public string pShipperAddressID { get; set; }
        public string pShipperContactID { get; set; }
        public string pConsigneeID { get; set; }
        public string pConsigneeAddressID { get; set; }
        public string pConsigneeContactID { get; set; }
        public string pAgentID { get; set; }
        public string pAgentAddressID { get; set; }
        public string pAgentContactID { get; set; }
        public string pCustomerID { get; set; }
        public string pCustomerContactID { get; set; }
        public string pIncotermID { get; set; }
        public string pCommodityID { get; set; }
        public string pTransientTime { get; set; }
        public string pValidity { get; set; }
        public string pFreeTime { get; set; }
        //public string pOpenDate { get; set; }
        public DateTime pOpenDate { get; set; }
        public DateTime pCloseDate { get; set; }
        //public string pExpirationDate { get; set; }
        public DateTime pExpirationDate { get; set; }
        public string pIncludePickup { get; set; }
        public string pPickupCityID { get; set; }
        public string pPickupAddressID { get; set; }
        public string pPOLCountryID { get; set; }
        public string pPOL { get; set; }
        public string pPODCountryID { get; set; }
        public string pPOD { get; set; }
        public string pShippingLineID { get; set; }
        public string pAirlineID { get; set; }
        public string pTruckerID { get; set; }
        public string pIncludeDelivery { get; set; }
        public string pDeliveryZipCode { get; set; }
        public string pDeliveryCityID { get; set; }
        public string pDeliveryCountryID { get; set; }
        public string pGrossWeight { get; set; }
        public string pVolume { get; set; }
        public string pChargeableWeight { get; set; }
        public string pNumberOfPackages { get; set; }
        public string pIsDangerousGoods { get; set; }
        public string pDescriptionOfGoods { get; set; }
        public string pNotes { get; set; }
        public string pQuotationStageID { get; set; }
        public Int32 pSalesLeadID { get; set; }
        public bool pIsWarehousing { get; set; }
        public Int32 pMainCriteriaID { get; set; }
        public Int32 pSubCriteriaID { get; set; }
        public bool pIsFleet { get; set; }
        public Int32 pTemplateID { get; set; }
        public string pSubject { get; set; }
        public string pTermsAndConditions { get; set; }
        public Int32 pExporterID { get; set; } = 0;
        public bool pIsLoadingDischarging { get; set; } = false;
        public bool pIsPackingRemovals { get; set; } = false;
        public bool pIsSurvey { get; set; } = false;
        public bool pIsLashing { get; set; } = false;
    }

    public class UpdateQuotationData
    {
        public Int64 pID { get; set; }

        public int pCodeSerial { get; set; }
        //public string pCode { get; set; }
        public int pBranchID { get; set; }
        public int pSalesmanID { get; set; }
        public int pOperationManID { get; set; }
        public int pDirectionType { get; set; }
        public string pDirectionIconName { get; set; }
        public string pDirectionIconStyle { get; set; }
        public int pTransportType { get; set; }
        public string pTransportIconName { get; set; }
        public string pTransportIconStyle { get; set; }
        public int pShipmentType { get; set; }
        public int pShipperID { get; set; }
        public Int64 pShipperAddressID { get; set; }
        public Int64 pShipperContactID { get; set; }
        public int pConsigneeID { get; set; }
        public Int64 pConsigneeAddressID { get; set; }
        public Int64 pConsigneeContactID { get; set; }
        public int pAgentID { get; set; }
        public Int64 pAgentAddressID { get; set; }
        public Int64 pAgentContactID { get; set; }
        public int pIncotermID { get; set; }
        public int pCommodityID { get; set; }
        public int pTransientTime { get; set; }
        public int pValidity { get; set; }
        public int pFreeTime { get; set; }
        public DateTime pOpenDate { get; set; }
        public DateTime pCloseDate { get; set; }
        public DateTime pExpirationDate { get; set; }
        public bool pIncludePickup { get; set; }
        public int pPickupCityID { get; set; }
        public int pPickupAddressID { get; set; }
        public int pPOLCountryID { get; set; }
        public int pPOL { get; set; }
        public int pPODCountryID { get; set; }
        public int pPOD { get; set; }
        public int pShippingLineID { get; set; }
        public int pAirlineID { get; set; }
        public int pTruckerID { get; set; }
        public bool pIncludeDelivery { get; set; }
        public string pDeliveryZipCode { get; set; }
        public int pDeliveryCityID { get; set; }
        public int pDeliveryCountryID { get; set; }
        public Decimal pGrossWeight { get; set; }
        public Decimal pVolume { get; set; }
        public Decimal pChargeableWeight { get; set; }
        public int pNumberOfPackages { get; set; }
        public bool pIsDangerousGoods { get; set; }
        public int pTemplateID { get; set; }
        public string pSubject { get; set; }
        public string pTermsAndConditions { get; set; }
        public int pTemplateIDClearance { get; set; }
        public string pSubjectClearance { get; set; }
        public string pTermsAndConditionsClearance { get; set; }
        public int pTemplateIDTransport { get; set; }
        public string pSubjectTransport { get; set; }
        public string pTermsAndConditionsTransport { get; set; }
        public string pDescriptionOfGoods { get; set; }
        public string pNotes { get; set; }
        public int pQuotationStageID { get; set; }
        public Int32 pSalesLeadID { get; set; }
        public Int32 pSalesLeadContactID { get; set; }
        public bool pIsWarehousing { get; set; }
        public Int32 pMainCriteriaID { get; set; }
        public Int32 pSubCriteriaID { get; set; }
        public Int32 pExporterID { get; set; } = 0;
    }

    public class UpdateFleetQuotationData
    {
        public Int64 pFleetQuotationID { get; set; }
        public Int32 pCustomerID { get; set; }
        public string pOpenDate { get; set; }
        public string pCloseDate { get; set; }
        public Int32 pTemplateID { get; set; }
        public string pSubject { get; set; }
        public string pTermsAndConditions { get; set; }
        public string pNotes { get; set; }
    }
    public class FleetCutoffInvoiceData
    {
        public string pApprovedQuotationRouteOrTransportOrderIDs { get; set; }
        public string pFromDate { get; set; }/*yyyyMMdd*/
        public string pCutOffDate { get; set; }/*yyyyMMdd*/
        public Int32 pTransactionTypeID { get; set; }
        public Int32 pPaymentTermID { get; set; }
        public Int32 pTaxTypeID { get; set; }
        public decimal pTaxPercentage { get; set; }
        public bool pIsGroupedCutoff { get; set; }
        public string pEditableNotes { get; set; }
    }
    public class AddInvoicedOrdersData
    {
        public Int64 pInvoiceID { get; set; }
        public string pTransportOrderIDsToAdd { get; set; }
    }
    public class RemoveInvoicedOrdersData
    {
        public string pTransportOrderIDsToRemove { get; set; }
    }
    public class CreateOperationFromQuotationData
    {
        public string pQuotationID { get; set; }
        public string pQuotationRouteID { get; set; }
        public string pCode { get; set; }
        public string pBranchID { get; set; }
        public string pSalesmanID { get; set; }
        public string pOperationManID { get; set; }
        public string pBLTypeIconName { get; set; }
        public string pBLTypeIconStyle { get; set; }
        public string pBLType { get; set; }
        public string pDirectionType { get; set; }
        public string pDirectionIconName { get; set; }
        public string pDirectionIconStyle { get; set; }
        public string pTransportType { get; set; }
        public string pTransportIconName { get; set; }
        public string pTransportIconStyle { get; set; }
        public string pShipmentType { get; set; }
        public string pShipperID { get; set; }
        public string pShipperAddressID { get; set; }
        public string pShipperContactID { get; set; }
        public string pConsigneeID { get; set; }
        public string pConsigneeAddressID { get; set; }
        public string pConsigneeContactID { get; set; }
        public string pAgentID { get; set; }
        public string pAgentAddressID { get; set; }
        public string pAgentContactID { get; set; }
        public string pIncotermID { get; set; }
        public string pCommodityID { get; set; }
        public string pTransientTime { get; set; }
        public string pValidity { get; set; }
        public string pFreeTime { get; set; }
        //public string pOpenDate { get; set; }
        public DateTime pOpenDate { get; set; }
        public DateTime pCloseDate { get; set; }
        public string pCutOffDate { get; set; }
        public string pIncludePickup { get; set; }
        public string pPickupCityID { get; set; }
        public string pPickupAddressID { get; set; }
        public string pPOLCountryID { get; set; }
        public string pPOL { get; set; }
        public string pPODCountryID { get; set; }
        public string pPOD { get; set; }

        public string pPickupAddress { get; set; }
        public string pDeliveryAddress { get; set; }
        public Int32 pMoveTypeID { get; set; }

        public string pShippingLineID { get; set; }
        public string pAirlineID { get; set; }
        public string pTruckerID { get; set; }
        public string pIncludeDelivery { get; set; }
        public string pDeliveryZipCode { get; set; }
        public string pDeliveryCityID { get; set; }
        public string pDeliveryCountryID { get; set; }
        public string pGrossWeight { get; set; }
        public string pVolume { get; set; }
        public string pChargeableWeight { get; set; }
        public string pNumberOfPackages { get; set; }
        public string pIsDangerousGoods { get; set; }
        public string pCustomerReference { get; set; }
        public string pNotes { get; set; }
        public string pOperationStageID { get; set; }
    }


    //External Quotation
    public class CustomerQuotation
    {
        public string Code { get; set; }
        public string pBranchID { get; set; }
        public string pSalesmanID { get; set; }
        public string pDirectionType { get; set; }
        public string pDirectionIconName { get; set; }
        public string pDirectionIconStyle { get; set; }
        public string pTransportType { get; set; }
        public string pTransportIconName { get; set; }
        public string pTransportIconStyle { get; set; }
        public string pShipmentType { get; set; }
        public string pShipperID { get; set; }
        public string pShipperAddressID { get; set; }
        public string pShipperContactID { get; set; }
        public string pConsigneeID { get; set; }
        public string pConsigneeAddressID { get; set; }
        public string pConsigneeContactID { get; set; }
        public string pAgentID { get; set; }
        public string pAgentAddressID { get; set; }
        public string pAgentContactID { get; set; }
        public string pCustomerID { get; set; }
        public string pCustomerContactID { get; set; }
        public string pIncotermID { get; set; }
        public string pCommodityID { get; set; }
        public string pTransientTime { get; set; }
        public string pValidity { get; set; }
        public string pFreeTime { get; set; }
        //public string pOpenDate { get; set; }
        public DateTime pOpenDate { get; set; }
        public DateTime pCloseDate { get; set; }
        //public string pExpirationDate { get; set; }
        public DateTime pExpirationDate { get; set; }
        public string pIncludePickup { get; set; }
        public string pPickupCityID { get; set; }
        public string pPickupAddressID { get; set; }
        public string pPOLCountryID { get; set; }
        public string pPOL { get; set; }
        public string pPODCountryID { get; set; }
        public string pPOD { get; set; }
        public string pShippingLineID { get; set; }
        public string pAirlineID { get; set; }
        public string pTruckerID { get; set; }
        public string pIncludeDelivery { get; set; }
        public string pDeliveryZipCode { get; set; }
        public string pDeliveryCityID { get; set; }
        public string pDeliveryCountryID { get; set; }
        public string pGrossWeight { get; set; }
        public string pVolume { get; set; }
        public string pChargeableWeight { get; set; }
        public string pNumberOfPackages { get; set; }
        public string pIsDangerousGoods { get; set; }
        public string pDescriptionOfGoods { get; set; }
        public string pNotes { get; set; }
        public string pQuotationStageID { get; set; }
        public Int32 pSalesLeadID { get; set; }
        public bool pIsWarehousing { get; set; }
        public Int32 pMainCriteriaID { get; set; }
        public Int32 pSubCriteriaID { get; set; }
        public bool pIsFleet { get; set; }
        public Int32 pTemplateID { get; set; }
        public string pSubject { get; set; }
        public string pTermsAndConditions { get; set; }
    }
    public class ChargeCategory
    {
        public int pQuotationChargeID { get; set; } = 0;
        public int pCategoryID { get; set; } = 0;
    }
    public class CreateOperationFromAlarmDTO
    {
        public long pEmailID { get; set; } = 0;
        public long pQuotationRouteID { get; set; } = 0;
        public int pBLType { get; set; } = 0;
        public string pBLTypeIconName { get; set; } = "";
        public string pBLTypeIconStyle { get; set; } = "";
        public long pNumberOfTruckingOrders { get; set; } = 0;
        public bool pIsOwnedByCompany { get; set; }
        public List<ChargeCategory> pPayableCategories { get; set; }
        public List<ChargeCategory> pReceivableCategories { get; set; }
    }
}
