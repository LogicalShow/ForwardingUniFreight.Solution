using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using System.Globalization;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.CRM.Generated;
using System.Linq;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ActionStatues.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_FollowUp.Generated;

namespace Forwarding.MvcApp.Controllers.CRM.API_CRM_Clients
{
    public class CRMCustomersFollowUpController : ApiController
    {
        ////[Route("/api/CRM_Clients/LoadAll")]
        //[HttpGet, HttpPost]
        ////sherif: to be used in select boxes
        //public Object[] LoadAll(string pWhereClause)
        //{
        //    CCRM_Clients objCCRM_Clients = new CCRM_Clients();
        //    objCCRM_Clients.GetList(pWhereClause);
        //    return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_Clients.lstCVarCRM_Clients) };
        //}

        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
            string pWhereClauseSalesLead = "WHERE 1=1";
            Int32 _RowCount = 0;// objCvwvwCRM_Clients.lstCVarvwCRM_Clients.Count;
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClauseSalesLead += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            CCRM_Clients objCCRM_Clients = new CCRM_Clients();
            CCountries cCountries = new CCountries();
            CUsers cUsers = new CUsers();
            CCRM_Sources cCRM_Sources = new CCRM_Sources();
            CCRM_Actions cCRM_Actions = new CCRM_Actions();
            CCRM_Clients objCCRM_ClientsCBO = new CCRM_Clients();

            //--------------------------------------------
            objCCRM_Clients.GetListPaging(999999, 1, pWhereClauseSalesLead, "Name", out _RowCount);
            cCountries.GetList("where 1 = 1");
            cCRM_Sources.GetList("where 1 = 1");
            cUsers.GetList("where IsNull(CustomerID , 0) = 0 AND IsSalesman = 1");
            cCRM_Actions.GetList("where 1 = 1");
            objCCRM_ClientsCBO.GetListPaging(999999, 1, pWhereClauseSalesLead, "Name", out _RowCount);
            return new Object[] {
                new JavaScriptSerializer().Serialize(cCountries.lstCVarCountries) 
                , new JavaScriptSerializer().Serialize(cCRM_Sources.lstCVarCRM_Sources)
                , new JavaScriptSerializer().Serialize(cUsers.lstCVarUsers)
                , new JavaScriptSerializer().Serialize(cCRM_Actions.lstCVarCRM_Actions) 
                , new JavaScriptSerializer().Serialize(objCCRM_Clients.lstCVarCRM_Clients)
                , new JavaScriptSerializer().Serialize(objCCRM_ClientsCBO.lstCVarCRM_Clients)
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadModalData(string pLoadDataDummyParameter)
        {
            int _RowCount = 0;
            CCommodities objCCommodities = new CCommodities();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            CNoAccessCustomerActivity objCActivity = new CNoAccessCustomerActivity();
            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            CNoAccessPipeLineStage objCPipeLineStage = new CNoAccessPipeLineStage();
            CUsers objCUsers = new CUsers();
            CCountries objCCountries = new CCountries();
            CPorts objCPorts = new CPorts();
            CCurrencies objCCurrencies = new CCurrencies();
            objCCommodities.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            objCContainerTypes.GetListPaging(999999, 1, "WHERE 1=1", "Code", out _RowCount);
            objCActivity.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            objCPipeLineStage.GetListPaging(999999, 1, "WHERE 1=1 AND IsActive=1", "Name", out _RowCount);
            objCPaymentTerms.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            objCUsers.GetListPaging(999999, 1, "WHERE IsNull(CustomerID , 0) = 0 AND IsSalesman=1", "Name", out _RowCount);
            objCCountries.GetList(" Where 1=1 order by name");
            objCPorts.GetList(" Where 1=1  order by name");
            objCCurrencies.GetList(" Where 1=1  order by name");
            
            var serialize = new JavaScriptSerializer();
            serialize.MaxJsonLength = int.MaxValue;
            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCCommodities.lstCVarCommodities) //pData[0]
                , new JavaScriptSerializer().Serialize(objCContainerTypes.lstCVarContainerTypes) //pData[1]
                , new JavaScriptSerializer().Serialize(objCActivity.lstCVarNoAccessCustomerActivity) //pData[2]
                , new JavaScriptSerializer().Serialize(objCPaymentTerms.lstCVarPaymentTerms) //pData[3]
                , new JavaScriptSerializer().Serialize(objCPipeLineStage.lstCVarNoAccessPipeLineStage) //pData[4]
                , new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers) //pData[5]
                , new JavaScriptSerializer().Serialize(objCCountries.lstCVarCountries) //pData[6]
                , serialize.Serialize(objCPorts.lstCVarPorts) //pData[7]
                , new JavaScriptSerializer().Serialize(objCCurrencies.lstCVarCurrencies) //pData[8]
            };
        }

        [HttpGet, HttpPost]
        public object[] FillInputPort(string pID)
        {
            CPorts cPorts = new CPorts();

            cPorts.GetList("where CountryID = " + int.Parse(pID));





            return new Object[] { new JavaScriptSerializer().Serialize(cPorts.lstCVarPorts) };
        }

        // [Route("/api/CRM_Clients/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCRM_Clients objCvwCRM_Clients = new CCRM_Clients();
            //objCvwCRM_Clients.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCRM_Clients.lstCVarCRM_Clients.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string pWhereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' ";

            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClause += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            objCvwCRM_Clients.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_Clients.lstCVarCRM_Clients), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] GetEquipmentsByActivity()
        {
            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetList(" Where 1=1 ORDER BY Name");
            CPackageTypes objCPackageTypes = new CPackageTypes();
            objCPackageTypes.GetList(" Where 1=1 ORDER BY Name");
            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            objCTRCK_Equipments.GetList(" Where 1=1 ORDER BY Name");

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCContainerTypes.lstCVarContainerTypes)
               ,new JavaScriptSerializer().Serialize(objCPackageTypes.lstCVarPackageTypes)
               ,new JavaScriptSerializer().Serialize(objCTRCK_Equipments.lstCVarTRCK_Equipments)

            };
        }

        [HttpGet, HttpPost]
        public Object[] GetDetailsWithPercent(Int32 pID)
        {
            CvwSalesMenTargetDetailsWithPercent objCvwSalesMenTargetDetailsWithPercent = new CvwSalesMenTargetDetailsWithPercent();

            objCvwSalesMenTargetDetailsWithPercent.GetList(" Where CRM_SalesMenTargetID = "+pID);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwSalesMenTargetDetailsWithPercent.lstCVarvwSalesMenTargetDetailsWithPercent)};
        }
        
        [HttpGet, HttpPost]
        public Object[] hideWithCustomers(Int32 pID)
        {
            CCRM_privilege objCRM_privilege = new CCRM_privilege();

            objCRM_privilege.GetList(" Where ID = " + 20);
            int UsersCount = objCRM_privilege.lstCVarCRM_privilege[0].UsersIDs.Split(',').Length;
            Boolean UserExists = false;
            for (int i=0;i<UsersCount;i++)
            {
                if(WebSecurity.CurrentUserId == int.Parse(objCRM_privilege.lstCVarCRM_privilege[0].UsersIDs.Split(',')[i]))
                {
                    UserExists = true;
                }
            }
            return new Object[] { UserExists };
        }

        [HttpGet, HttpPost]
        public int Insert(string pCOEnName, string pCOArName, string pSalesRep,string pCountry, string pPort, string pPhone1, string pPhone2
            , string pMobile, string pFax, string pEmail, string pWebSite, string pEstablishDate, string pSource, string pSourceDate
            , string pSourceDescription, string pNotes, string pCompanyView, string pCompanySize, string pCompanyType, string pClientStatus
            , string pAddress, string pIsAddedToCustomer
            , Int32 pCommodityID, Int32 pActivityID//, Int32 pCurrencyID, decimal pRevenue, decimal pCost
            //, string pStartingDate, string pClosingExpectedDate, string pTradeLane
            , Int32 pContainerTypeID
            //, Int32 pBusinessVolume, string pCompetitors, Int32 pPaymentTermID, Int32 pPipeLineStageID, string pComment
            )
        {
            int _result = 0;
            CCRM_Clients objCCRM_ClientsExists = new CCRM_Clients();
            objCCRM_ClientsExists.GetList(" Where (Name = N'" + pCOEnName + "')");// OR LocalName = N'" + pCOArName + "')");
            if (objCCRM_ClientsExists.lstCVarCRM_Clients.Count == 0)
            {
                CVarCRM_Clients objCVarCRM_Clients = new CVarCRM_Clients();
                objCVarCRM_Clients.Name = pCOEnName == null ? " " : pCOEnName;
                objCVarCRM_Clients.LocalName = pCOArName == null ? "0" : pCOArName;
                objCVarCRM_Clients.SalesmanID = pSalesRep == null ? 0 : int.Parse(pSalesRep);
                objCVarCRM_Clients.CountryID = pCountry == null ? 0 : int.Parse(pCountry);
                //  objCVarCRM_Clients.CityID = 0 ;
                objCVarCRM_Clients.PortID = pPort == null ? 0 : int.Parse(pPort);
                objCVarCRM_Clients.Phone1 = pPhone1 == null ? " " : pPhone1;
                objCVarCRM_Clients.Phone2 = pPhone2 == null ? " " : pPhone2;
                objCVarCRM_Clients.CellPhone = pMobile == null ? " " : pMobile;
                objCVarCRM_Clients.Fax = pFax == null ? " " : pFax;
                objCVarCRM_Clients.Email = pEmail == null ? " " : pEmail;
                objCVarCRM_Clients.WebSite = pWebSite == null ? " " : pWebSite;
                objCVarCRM_Clients.EstablishDate = pEstablishDate == null ? DateTime.ParseExact("01/01/1700" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pEstablishDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_Clients.SourceID = pSource == null ? 0 : int.Parse(pSource);
                objCVarCRM_Clients.SourceDate = pSourceDate == null ? DateTime.ParseExact("01/01/1700" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pSourceDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_Clients.SourceDescription = pSourceDescription == null ? " " : pSourceDescription;
                objCVarCRM_Clients.Notes = pNotes == null ? " " : pNotes;
                objCVarCRM_Clients.CompanyView = pCompanyView == null ? 0 : int.Parse(pCompanyView);
                objCVarCRM_Clients.CompanySize = pCompanySize == null ? 0 : int.Parse(pCompanySize);
                objCVarCRM_Clients.CompanyType = pCompanyType == null ? 0 : int.Parse(pCompanyType);
                objCVarCRM_Clients.ClientStatus = pClientStatus == null ? 0 : int.Parse(pClientStatus);
                objCVarCRM_Clients.Address = pAddress == null ? " " : pAddress;
                objCVarCRM_Clients.IsAddedToCustomer = pIsAddedToCustomer == null ? false : Convert.ToBoolean(pIsAddedToCustomer);

                objCVarCRM_Clients.CommodityID = pCommodityID;
                objCVarCRM_Clients.ActivityID = pActivityID;
                objCVarCRM_Clients.CurrencyID = 0;//pCurrencyID;
                objCVarCRM_Clients.Revenue = 0;//pRevenue;
                objCVarCRM_Clients.Cost = 0;//pCost;
                objCVarCRM_Clients.GrossProfit = 0;//pRevenue - pCost;
                objCVarCRM_Clients.ProfitMargin = 0;//pCost == 0 || pRevenue == 0 ? 0 : (((pRevenue - pCost) / pCost) * 100);
                objCVarCRM_Clients.StartingDate = Convert.ToDateTime("01/01/1900");//DateTime.ParseExact(pStartingDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_Clients.ClosingExpectedDate = Convert.ToDateTime("01/01/1900");//DateTime.ParseExact(pClosingExpectedDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_Clients.TradeLane = "0";//pTradeLane;
                objCVarCRM_Clients.ContainerTypeID = pContainerTypeID;
                objCVarCRM_Clients.BusinessVolume = 0;//pBusinessVolume;
                objCVarCRM_Clients.Competitors = "0";//pCompetitors;
                objCVarCRM_Clients.PaymentTermID = 0;//pPaymentTermID;
                objCVarCRM_Clients.PipeLineStageID = 0;//pPipeLineStageID;
                objCVarCRM_Clients.Comment = "0";//pComment;
                objCVarCRM_Clients.SourceKeyPerson = "0";
                objCVarCRM_Clients.IsFromCustomer = false ;
                objCVarCRM_Clients.CreationDate = DateTime.Now;
                objCVarCRM_Clients.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_Clients.ModificationDate = DateTime.Now;
                objCVarCRM_Clients.ModificationUserID = WebSecurity.CurrentUserId;
                objCVarCRM_Clients.DealCreationDate = DateTime.Parse("01/01/1900");
                objCVarCRM_Clients.OppurtunityCreationDate = DateTime.Parse("01/01/1900");
                objCVarCRM_Clients.NewCustomerCreationDate = DateTime.Parse("01/01/1900");

                CCRM_Clients objCCRM_Clients = new CCRM_Clients();
                objCCRM_Clients.lstCVarCRM_Clients.Add(objCVarCRM_Clients);
                Exception checkException = objCCRM_Clients.SaveMethod(objCCRM_Clients.lstCVarCRM_Clients);
                //if (checkException == null)
                //{
                //    CCRM_privilegeLog objCCRM_privilegeLog = new CCRM_privilegeLog();
                //    CVarCRM_privilegeLog objCVarCRM_privilegeLog = new CVarCRM_privilegeLog();
                //    objCVarCRM_privilegeLog.ID = 0;
                //    objCVarCRM_privilegeLog.ClientID = objCVarCRM_Clients.ID;
                //    objCVarCRM_privilegeLog.PipeLineStageID = pPipeLineStageID;
                //    objCVarCRM_privilegeLog.CreationDate = DateTime.Now;
                //    objCVarCRM_privilegeLog.CreatorUserID = WebSecurity.CurrentUserId;
                //    objCVarCRM_privilegeLog.ModificationDate = DateTime.Now;
                //    objCVarCRM_privilegeLog.ModificationUserID = WebSecurity.CurrentUserId;
                //    objCCRM_privilegeLog.lstCVarCRM_privilegeLog.Add(objCVarCRM_privilegeLog);
                //    objCCRM_privilegeLog.SaveMethod(objCCRM_privilegeLog.lstCVarCRM_privilegeLog);
                //}

                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = 0;
                }
                else //not unique
                    _result = objCVarCRM_Clients.ID;
            }
            else
                _result = 0;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(string pID, string pCOEnName, string pCOArName, string pSalesRep, string pCountry, string pPort, string pPhone1
            , string pPhone2, string pMobile, string pFax, string pEmail, string pWebSite, string pEstablishDate, string pSource
            , string pSourceDate, string pSourceDescription, string pNotes, string pCompanyView, string pCompanySize, string pCompanyType
            , string pClientStatus, string pAddress, string pIsAddedToCustomer
            , Int32 pCommodityID, Int32 pActivityID//, Int32 pCurrencyID, decimal pRevenue, decimal pCost
            //, string pStartingDate, string pClosingExpectedDate, string pTradeLane
            , Int32 pContainerTypeID
            //, Int32 pBusinessVolume, string pCompetitors, Int32 pPaymentTermID, Int32 pPipeLineStageID, string pComment
            )
        {
            bool _result = false;
            CCRM_Clients objCCRM_ClientsExists = new CCRM_Clients();
            objCCRM_ClientsExists.GetList(" Where   (Name = N'" + pCOEnName + "' OR LocalName = N'" + pCOArName + "') AND ID<>" + pID);
            if (objCCRM_ClientsExists.lstCVarCRM_Clients.Count == 0)
            {
                CVarCRM_Clients objCVarCRM_Clients = new CVarCRM_Clients();
                objCVarCRM_Clients.ID = pID == null ? 0 : int.Parse(pID);
                objCVarCRM_Clients.Code = pID == null ? 0 : int.Parse(pID);
                objCVarCRM_Clients.Name = pCOEnName == null ? " " : pCOEnName;
                objCVarCRM_Clients.LocalName = pCOArName == null ? " " : pCOArName;
                objCVarCRM_Clients.SalesmanID = pSalesRep == null ? 0 : int.Parse(pSalesRep);
                objCVarCRM_Clients.CountryID = pCountry == null ? 0 : int.Parse(pCountry);
                //  objCVarCRM_Clients.CityID = 0;
                objCVarCRM_Clients.PortID = pPort == null ? 0 : int.Parse(pPort);
                objCVarCRM_Clients.Phone1 = pPhone1 == null ? " " : pPhone1;
                objCVarCRM_Clients.Phone2 = pPhone2 == null ? " " : pPhone2;
                objCVarCRM_Clients.CellPhone = pMobile == null ? " " : pMobile;
                objCVarCRM_Clients.Fax = pFax == null ? " " : pFax;
                objCVarCRM_Clients.Email = pEmail == null ? " " : pEmail;
                objCVarCRM_Clients.WebSite = pWebSite == null ? " " : pWebSite;
                objCVarCRM_Clients.EstablishDate = pEstablishDate == null ? DateTime.ParseExact("01/01/1700" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pEstablishDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_Clients.SourceID = pSource == null ? 0 : int.Parse(pSource);
                objCVarCRM_Clients.SourceDate = pSourceDate == null ? DateTime.ParseExact("01/01/1700" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pSourceDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_Clients.SourceDescription = pSourceDescription == null ? " " : pSourceDescription;
                objCVarCRM_Clients.Notes = pNotes == null ? " " : pNotes;
                objCVarCRM_Clients.CompanyView = pCompanyView == null ? 0 : int.Parse(pCompanyView);
                objCVarCRM_Clients.CompanySize = pCompanySize == null ? 0 : int.Parse(pCompanySize);
                objCVarCRM_Clients.CompanyType = pCompanyType == null ? 0 : int.Parse(pCompanyType);
                objCVarCRM_Clients.ClientStatus = pClientStatus == null ? 0 : int.Parse(pClientStatus);
                objCVarCRM_Clients.Address = pAddress == null ? " " : pAddress;
                objCVarCRM_Clients.IsAddedToCustomer = pIsAddedToCustomer == null ? false : Convert.ToBoolean(pIsAddedToCustomer);

                objCVarCRM_Clients.CommodityID = pCommodityID;
                objCVarCRM_Clients.ActivityID = pActivityID;
                objCVarCRM_Clients.CurrencyID = 0;//pCurrencyID;
                objCVarCRM_Clients.Revenue = 0;//pRevenue;
                objCVarCRM_Clients.Cost = 0;//pCost;
                objCVarCRM_Clients.GrossProfit = 0;//pRevenue - pCost;
                objCVarCRM_Clients.ProfitMargin = 0;//pCost == 0 || pRevenue == 0 ? 0 : (((pRevenue - pCost) / pCost) * 100);
                objCVarCRM_Clients.StartingDate = Convert.ToDateTime("01/01/1900");//DateTime.ParseExact(pStartingDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_Clients.ClosingExpectedDate = Convert.ToDateTime("01/01/1900");//DateTime.ParseExact(pClosingExpectedDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarCRM_Clients.TradeLane = "0";//pTradeLane;
                objCVarCRM_Clients.ContainerTypeID = pContainerTypeID;
                objCVarCRM_Clients.BusinessVolume = 0;//pBusinessVolume;
                objCVarCRM_Clients.Competitors = "0";//pCompetitors;
                objCVarCRM_Clients.PaymentTermID = 0;//pPaymentTermID;
                objCVarCRM_Clients.PipeLineStageID = 0;//pPipeLineStageID;
                objCVarCRM_Clients.Comment = "0";//pComment;
                objCVarCRM_Clients.SourceKeyPerson = "0";
                objCVarCRM_Clients.IsFromCustomer = false;
                objCVarCRM_Clients.CreationDate = DateTime.Now;
                objCVarCRM_Clients.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_Clients.ModificationDate = DateTime.Now;
                objCVarCRM_Clients.ModificationUserID = WebSecurity.CurrentUserId;
                objCVarCRM_Clients.DealCreationDate = DateTime.Parse("01/01/1900");
                objCVarCRM_Clients.OppurtunityCreationDate = DateTime.Parse("01/01/1900");
                objCVarCRM_Clients.NewCustomerCreationDate = DateTime.Parse("01/01/1900");

                CCRM_Clients objCCRM_Clients = new CCRM_Clients();
                objCCRM_Clients.lstCVarCRM_Clients.Add(objCVarCRM_Clients);
                Exception checkException = objCCRM_Clients.SaveMethod(objCCRM_Clients.lstCVarCRM_Clients);
                //if (checkException == null)
                //{
                //    CCRM_privilegeLog objCCRM_privilegeLog = new CCRM_privilegeLog();
                //    CVarCRM_privilegeLog objCVarCRM_privilegeLog = new CVarCRM_privilegeLog();
                //    objCVarCRM_privilegeLog.ID = 0;
                //    objCVarCRM_privilegeLog.ClientID = pID == null ? 0 : int.Parse(pID);
                //    objCVarCRM_privilegeLog.PipeLineStageID = pPipeLineStageID;
                //    objCVarCRM_privilegeLog.CreationDate = DateTime.Now;
                //    objCVarCRM_privilegeLog.CreatorUserID = WebSecurity.CurrentUserId;
                //    objCVarCRM_privilegeLog.ModificationDate = DateTime.Now;
                //    objCVarCRM_privilegeLog.ModificationUserID = WebSecurity.CurrentUserId;
                //    objCCRM_privilegeLog.lstCVarCRM_privilegeLog.Add(objCVarCRM_privilegeLog);
                //    objCCRM_privilegeLog.SaveMethod(objCCRM_privilegeLog.lstCVarCRM_privilegeLog);
                //}

                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            }
            else
                _result = false;
            return _result;
        }
        // [Route("/api/CRM_Clients/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCRM_Clients objCCRM_Clients = new CCRM_Clients();
        //    objCCRM_Clients.lstDeletedCPKCRM_Clients.Add(new CPKCRM_Clients() { ID = pID });
        //    objCCRM_Clients.DeleteItem(objCCRM_Clients.lstDeletedCPKCRM_Clients);
        //}










        // [Route("api/CRM_Clients/Delete/{pCRM_ClientsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCRM_ClientsIDs)
        {
            bool _result = false;
            CCRM_Clients objCCRM_Clients = new CCRM_Clients();
            foreach (var currentID in pCRM_ClientsIDs.Split(','))
            {
                objCCRM_Clients.lstDeletedCPKCRM_Clients.Add(new CPKCRM_Clients() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_Clients.DeleteItem(objCCRM_Clients.lstDeletedCPKCRM_Clients);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        #region region Complaints
        [HttpGet, HttpPost]
        public object[] Complaint_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            //CvwCustomersWithMinimalColumns objCvwCustomers = new CvwCustomersWithMinimalColumns();
            CvwCRM_Complaint objCvwCRM_Complaint = new CvwCRM_Complaint();
            CUsers objCUsers = new CUsers();
            objCUsers.GetList(" Where IsNull(CustomerID , 0) = 0 AND 1=1");

            if (pIsLoadArrayOfObjects)
            {
                //checkException = objCvwCustomers.GetList("ORDER BY Name");
            }
            CCRM_ActionStatues cCRM_ActionStatues = new CCRM_ActionStatues();
            cCRM_ActionStatues.GetList(" Where 1=1");

            checkException = objCvwCRM_Complaint.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            CvwCRM_ComplaintDetails objCvwCRM_ComplaintDetails = new CvwCRM_ComplaintDetails();
            objCvwCRM_ComplaintDetails.GetList(pWhereClause);

            CvwCRM_ComplaintDetailsResponses objCvwCRM_ComplaintDetailsResponses = new CvwCRM_ComplaintDetailsResponses();
            objCvwCRM_ComplaintDetailsResponses.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwCRM_Complaint.lstCVarvwCRM_Complaint)
                , _RowCount
                ,new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers)
                ,new JavaScriptSerializer().Serialize(cCRM_ActionStatues.lstCVarCRM_ActionStatues)
                ,new JavaScriptSerializer().Serialize(objCvwCRM_ComplaintDetails.lstCVarvwCRM_ComplaintDetails)//4
                 ,new JavaScriptSerializer().Serialize(objCvwCRM_ComplaintDetailsResponses.lstCVarvwCRM_ComplaintDetailsResponses)//5
                
            };
        }

        [HttpGet, HttpPost]
        public object[] Complaint_FillModal(Int32 pComplaintID)
        {
            CCRM_Complaint objCCRM_Complaint = new CCRM_Complaint();
            CvwOperationsWithMinimalColumns objCvwOperations = new CvwOperationsWithMinimalColumns();
            objCCRM_Complaint.GetList("WHERE ID=" + pComplaintID);
            objCvwOperations.GetList("WHERE BLType<>2 AND ClientID=" + objCCRM_Complaint.lstCVarCRM_Complaint[0].CustomerID);
            var pOperationList = objCvwOperations.lstCVarvwOperationsWithMinimalColumns
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.Code
                })
                .Distinct().OrderBy(o => o.ID).ToList();

            CvwCRM_ComplaintDetails objCvwCRM_ComplaintDetails = new CvwCRM_ComplaintDetails();
            objCvwCRM_ComplaintDetails.GetList(" Where CRM_ComplaintID = "+ pComplaintID);


            return new object[]
            {
                 new JavaScriptSerializer().Serialize(objCCRM_Complaint.lstCVarCRM_Complaint[0])
                ,new JavaScriptSerializer().Serialize(pOperationList) //pData[1]
                ,new JavaScriptSerializer().Serialize(objCvwCRM_ComplaintDetails.lstCVarvwCRM_ComplaintDetails)//2
            };
        }

        [HttpGet, HttpPost]
        public object[] ComplaintDetails_FillModal(Int32 pComplaintDetailsID)
        {
            CvwCRM_ComplaintDetails objCvwCRM_ComplaintDetails = new CvwCRM_ComplaintDetails();
            objCvwCRM_ComplaintDetails.GetList(" Where ID = " + pComplaintDetailsID);
            CvwCRM_ComplaintDetailsResponses objCvwCRM_ComplaintDetailsResponses = new CvwCRM_ComplaintDetailsResponses();
            objCvwCRM_ComplaintDetailsResponses.GetList(" Where ComplaintDetailsID = " + pComplaintDetailsID);

            return new object[]
            {
                 new JavaScriptSerializer().Serialize(objCvwCRM_ComplaintDetails.lstCVarvwCRM_ComplaintDetails)//0
                ,new JavaScriptSerializer().Serialize(objCvwCRM_ComplaintDetailsResponses.lstCVarvwCRM_ComplaintDetailsResponses)//1
            };
        }

        [HttpGet, HttpPost]
        public object[] ComplaintDetailsResponses_FillModal(Int32 pComplaintDetailsResponsesID)
        {
            CvwCRM_ComplaintDetailsResponses objCvwCRM_ComplaintDetailsResponses = new CvwCRM_ComplaintDetailsResponses();
            objCvwCRM_ComplaintDetailsResponses.GetList(" Where ID = " + pComplaintDetailsResponsesID);

            return new object[]
            {
                 new JavaScriptSerializer().Serialize(objCvwCRM_ComplaintDetailsResponses.lstCVarvwCRM_ComplaintDetailsResponses)//0
            };
        }

        [HttpGet, HttpPost]
        public object[] Complaint_Save(Int32 pID, Int32 pCustomerID)
        {
            string _MessageReturned = "";
            Exception checkException = new Exception();
            string _UpdateClause = "";

            CCRM_Complaint objCCRM_ComplaintCode = new CCRM_Complaint();
            objCCRM_ComplaintCode.GetList(" Where Code = (Select MAX(Code) from CRM_Complaint)");

            CVarCRM_Complaint objCVarCRM_Complaint = new CVarCRM_Complaint();
            CCRM_Complaint objCCRM_Complaint = new CCRM_Complaint();
            #region Insert Complaint
            if (pID == 0)
            {
                objCVarCRM_Complaint.CustomerID = pCustomerID;
                //if (objCCRM_ComplaintCode.lstCVarCRM_Complaint.Count == 0)
                //    objCVarCRM_Complaint.Code = 1;
                //else
                //    objCVarCRM_Complaint.Code = objCCRM_ComplaintCode.lstCVarCRM_Complaint[0].Code + 1 ;
                objCVarCRM_Complaint.OperationID = 0;
                objCVarCRM_Complaint.ComplaintName = "0";
                objCVarCRM_Complaint.ComplaintDetails = "0"; 
                objCVarCRM_Complaint.Notes = "0";
                objCVarCRM_Complaint.CreatorUserID = objCVarCRM_Complaint.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_Complaint.CreationDate = objCVarCRM_Complaint.ModificationDate = DateTime.Now;
                objCCRM_Complaint.lstCVarCRM_Complaint.Add(objCVarCRM_Complaint);
                checkException = objCCRM_Complaint.SaveMethod(objCCRM_Complaint.lstCVarCRM_Complaint);
            }
            #endregion Insert Complaint
            #region Update Complaint
            else
            {
                _UpdateClause = "CustomerID=" + (pCustomerID == 0 ? "null" : pCustomerID.ToString()) + "\n";
                _UpdateClause += ",OperationID=" + (0 == 0 ? "null" : "0") + "\n";
                _UpdateClause += ",ComplaintName=" + ("0" == "0" ? "null" : ("N'" + "0" + "'")) + "\n";
                _UpdateClause += ",ComplaintDetails=" + ("0" == "0" ? "null" : ("N'" + "0" + "'")) + "\n";
                _UpdateClause += ",Notes=" + ("0" == "0" ? "null" : ("N'" + "0" + "'")) + "\n";
                _UpdateClause += ",ModificatorUserID=" + WebSecurity.CurrentUserId + "\n";
                _UpdateClause += ",ModificationDate=GETDATE()" + "\n";
                _UpdateClause += "WHERE ID=" + pID + "\n";
                checkException = objCCRM_Complaint.UpdateList(_UpdateClause);
            }
            #endregion Update Complaint

            return new object[]
            {
                _MessageReturned
            };
        }

        [HttpGet, HttpPost]
        public object[] SetubSalesLead_Calculate(Int32 pNoDays)
        {
            CvwSetubSalesLead objCvwSetubSalesLead = new CvwSetubSalesLead();
            objCvwSetubSalesLead.GetList(" Where 1=1");

            for(int i=0; i< objCvwSetubSalesLead.lstCVarvwSetubSalesLead.Count; i++)
            {

                if(objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].DaysToLastAction > pNoDays)
                {
                    objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].Valid = 0;
                    objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].DaysDiff = objCvwSetubSalesLead.lstCVarvwSetubSalesLead[i].DaysToLastAction - pNoDays;
                }
            }
            return new object[]
            {
                 new JavaScriptSerializer().Serialize(objCvwSetubSalesLead.lstCVarvwSetubSalesLead)//0
            };
        }
        
        [HttpGet, HttpPost]
        public object[] SetubSalesLead_Save(int pID ,string pClientID ,string pClientName ,string pCode,string pLastActionDate ,string pACTION ,string pDaysToLastAction ,string pDaysDiff ,string pValid ,string pNoDays,int pNumberOfInsertedRows)
        {
            string _MessageReturned = "";
            Exception checkException = new Exception();
            string _UpdateClause = "";
            string[] ClientID = pClientID.Split(',');
            string[] ClientName = pClientName.Split(',');
            string[] Code = pCode.Split(',');
            string[] LastActionDate = pLastActionDate.Split(',');
            string[] ACTION = pACTION.Split(',');
            string[] DaysToLastAction = pDaysToLastAction.Split(',');
            string[] DaysDiff = pDaysDiff.Split(',');
            string[] Valid = pValid.Split(',');
            string[] NoDays = pNoDays.Split(',');
           
            CCRM_SetubSalesLead objCCRM_SetubSalesLead = new CCRM_SetubSalesLead();
            #region Insert CRM_SetubSalesLead
            if (pID == 0)
            {
                for(int i=0; i< pNumberOfInsertedRows;i++)
                {
                    CVarCRM_SetubSalesLead objCVarCRM_SetubSalesLead = new CVarCRM_SetubSalesLead();
                    objCVarCRM_SetubSalesLead.ID = pID;
                    objCVarCRM_SetubSalesLead.ClientID =int.Parse(ClientID[i]);
                    objCVarCRM_SetubSalesLead.ClientName = ClientName[i];
                    objCVarCRM_SetubSalesLead.Code = Code[i];
                    objCVarCRM_SetubSalesLead.LastActionDate = DateTime.Parse(LastActionDate[i]);
                    objCVarCRM_SetubSalesLead.ACTION = ACTION[i];
                    objCVarCRM_SetubSalesLead.DaysToLastAction = decimal.Parse(DaysToLastAction[i]);
                    objCVarCRM_SetubSalesLead.DaysDiff = decimal.Parse(DaysDiff[i]);
                    objCVarCRM_SetubSalesLead.InValid = ((Valid[i]) == "0"?true: false);
                    objCVarCRM_SetubSalesLead.NoDays = int.Parse(NoDays[0]);
                    objCVarCRM_SetubSalesLead.CreatorUserID = objCVarCRM_SetubSalesLead.ModificationUserID = WebSecurity.CurrentUserId;
                    objCVarCRM_SetubSalesLead.CreationDate = objCVarCRM_SetubSalesLead.ModificationDate = DateTime.Now;
                    objCCRM_SetubSalesLead.lstCVarCRM_SetubSalesLead.Add(objCVarCRM_SetubSalesLead);
                    if(objCVarCRM_SetubSalesLead.InValid == true)
                    {
                        CCRM_Clients CCRM_ClientsSetub = new CCRM_Clients();
                        
                            string _UpdateClauseSetub = " ClientStatus=30 WHERE ID=" + int.Parse(ClientID[i]) + "";
                        checkException = CCRM_ClientsSetub.UpdateList(_UpdateClauseSetub);
                    }
                
                }
                
                checkException = objCCRM_SetubSalesLead.SaveMethod(objCCRM_SetubSalesLead.lstCVarCRM_SetubSalesLead);
            }
            #endregion Insert CRM_SetubSalesLead

            return new object[]
            {
                _MessageReturned
            };
        }


        [HttpGet, HttpPost]
        public object[] ComplaintDetailsResponses_Save(int pID, int pComplaintDetailsID, string pResponseDescription, DateTime pResponseDate, int pSalesRep2ID,int pStatusDetailsID)
        { //pID  pComplaintDetailsID   pResponseDescription  pResponseDate  pSalesRep2ID
            string _MessageReturned = "";
            Exception checkException = new Exception();
            string _UpdateClause = "";
            CVarCRM_ComplaintDetailsResponses objCVarCRM_ComplaintDetailsResponses = new CVarCRM_ComplaintDetailsResponses();
            CCRM_ComplaintDetailsResponses objCCRM_ComplaintDetailsResponses = new CCRM_ComplaintDetailsResponses();
            #region Insert Complaint
            if (pID == 0)
            {
                objCVarCRM_ComplaintDetailsResponses.ID = pID;
                objCVarCRM_ComplaintDetailsResponses.ComplaintDetailsID = pComplaintDetailsID;
                objCVarCRM_ComplaintDetailsResponses.ResponseDescription = pResponseDescription;
                objCVarCRM_ComplaintDetailsResponses.ResponseDate = DateTime.Now;//pResponseDate;
                objCVarCRM_ComplaintDetailsResponses.SalesRep2 = WebSecurity.CurrentUserId;// pSalesRep2ID;
                objCVarCRM_ComplaintDetailsResponses.StatusID = pStatusDetailsID;
                
                objCCRM_ComplaintDetailsResponses.lstCVarCRM_ComplaintDetailsResponses.Add(objCVarCRM_ComplaintDetailsResponses);
                checkException = objCCRM_ComplaintDetailsResponses.SaveMethod(objCCRM_ComplaintDetailsResponses.lstCVarCRM_ComplaintDetailsResponses);
            }
            #endregion Insert Complaint
            #region Update Complaint
            else
            {
                _UpdateClause = "ResponseDescription=" + (pResponseDescription == "0" ? "null" : ("N'" + pResponseDescription + "'")) + "\n";
                _UpdateClause += ",ResponseDate='" + (DateTime.Now) + "'\n";//(pResponseDate.ToString() == "0" ? "null" : ("N'" + pResponseDate.ToString() + "'")) + "\n";
                _UpdateClause += ",SalesRep2=" +(WebSecurity.CurrentUserId) + "\n"; //(pSalesRep2ID == 0 ? "null" : ("" + pSalesRep2ID + "")) + "\n";
                _UpdateClause += ",StatusID=" + (pStatusDetailsID) + "\n";
                _UpdateClause += "WHERE ID=" + pID + "\n";
                checkException = objCCRM_ComplaintDetailsResponses.UpdateList(_UpdateClause);
            }
            #endregion Update Complaint

            return new object[]
            {
                _MessageReturned
            };
        }


        [HttpGet, HttpPost]
        public bool Complaint_Delete(String pComplaintIDs)
        {
            bool _result = false;
            CCRM_Complaint objCCRM_Complaint = new CCRM_Complaint();
            foreach (var currentID in pComplaintIDs.Split(','))
            {
                objCCRM_Complaint.lstDeletedCPKCRM_Complaint.Add(new CPKCRM_Complaint() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_Complaint.DeleteItem(objCCRM_Complaint.lstDeletedCPKCRM_Complaint);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the Contracts were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool ComplaintDetails_Delete(String pComplaintDetailsIDs)
        {
            bool _result = false;
            CCRM_ComplaintDetails objCCRM_ComplaintDetails = new CCRM_ComplaintDetails();
            foreach (var currentID in pComplaintDetailsIDs.Split(','))
            {
                objCCRM_ComplaintDetails.lstDeletedCPKCRM_ComplaintDetails.Add(new CPKCRM_ComplaintDetails() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_ComplaintDetails.DeleteItem(objCCRM_ComplaintDetails.lstDeletedCPKCRM_ComplaintDetails);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the Contracts were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool ComplaintDetailsResponses_Delete(String pComplaintDetailsResponsesIDs)
        {
            bool _result = false;
            CCRM_ComplaintDetailsResponses objCCRM_ComplaintDetailsResponses = new CCRM_ComplaintDetailsResponses();
            foreach (var currentID in pComplaintDetailsResponsesIDs.Split(','))
            {
                objCCRM_ComplaintDetailsResponses.lstDeletedCPKCRM_ComplaintDetailsResponses.Add(new CPKCRM_ComplaintDetailsResponses() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_ComplaintDetailsResponses.DeleteItem(objCCRM_ComplaintDetailsResponses.lstDeletedCPKCRM_ComplaintDetailsResponses);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the Contracts were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        #endregion region Complaints
    }
}
