using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ContactPersons.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using Forwarding.MvcApp.Entities.Quotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Finance365;
using Forwarding.MvcApp.Controllers.MasterData.Finance365;
using System.Security.Cryptography;
using Forwarding.MvcApp.Controllers.DynamicsCRM;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public static class GlobalVariable
    {
        public static Int32 CustID = 0; // Unmodifiable

    }
    public class CustomersController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] getCustomerCreditLimitBalance(Int32 pIsCust, Int32 pCustomerID, Int32 plimitID)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string dt = objCCustomizedDBCall.CallStringFunction("CustomerCreditLimitBalance " + pIsCust + "," + pCustomerID + "," + plimitID);
            return new Object[] { dt };
        }

        [HttpGet, HttpPost]
        public Object[] CustomerCreditLoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwCustomerCreditLimit objCvwCustomers = new CvwCustomerCreditLimit();
            //objCCountries.GetList(string.Empty);
            Int32 _RowCount = 0;// objCCountries.lstCVarCountries.Count;

            objCvwCustomers.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomers.lstCVarvwCustomerCreditLimit), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] GetCustomerLimit(string pCustID)
        {
            Exception checkException = null;


            CCustomerCreditLimit cGetBudgetsDetailsReport = new CCustomerCreditLimit();
            checkException = cGetBudgetsDetailsReport.GetList("where CstomerID= " + pCustID);
            return new object[]
                {
                    new JavaScriptSerializer().Serialize(cGetBudgetsDetailsReport.lstCVarCustomerCreditLimit) //pDefaultsHeader = pData[0]  
                };
        }
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause = "Where 1 = 1")
        {
            CvwCustomers objCvwCustomers = new CvwCustomers();
            Exception e = objCvwCustomers.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCvwCustomers.lstCVarvwCustomers) };
        }
        [HttpGet, HttpPost]
        public Object[] LoadAllForTopManagement(string pWhereClause)
        {
            Int32 _RowCount = 0;
            CvwCustomersTopManagement objCvwCustomersTopManagement = new CvwCustomersTopManagement();

            objCvwCustomersTopManagement.GetListPaging(9999, 1, "WHERE CompanyID=10", " ID ", out _RowCount);
            var pALTCustomersNames = objCvwCustomersTopManagement.lstCVarvwCustomersTopManagement.Select(s => new{Name = s.Name}).ToList();

            objCvwCustomersTopManagement.GetListPaging(9999, 1, "WHERE CompanyID=20", " ID ", out _RowCount);
            var pEURCustomersNames = objCvwCustomersTopManagement.lstCVarvwCustomersTopManagement.Select(s => new { Name = s.Name }).ToList();

            objCvwCustomersTopManagement.GetListPaging(9999, 1, "WHERE CompanyID=30", " ID ", out _RowCount);
            var pMESCustomersNames = objCvwCustomersTopManagement.lstCVarvwCustomersTopManagement.Select(s => new { Name = s.Name }).ToList();

            objCvwCustomersTopManagement.GetListPaging(9999, 1, "WHERE CompanyID=40", " ID ", out _RowCount);
            var pGLOCustomersNames = objCvwCustomersTopManagement.lstCVarvwCustomersTopManagement.Select(s => new { Name = s.Name }).ToList();

            objCvwCustomersTopManagement.GetListPaging(9999, 1, "WHERE CompanyID=50", " ID ", out _RowCount);
            var pSACCustomersNames = objCvwCustomersTopManagement.lstCVarvwCustomersTopManagement.Select(s => new { Name = s.Name }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(pALTCustomersNames), serializer.Serialize(pEURCustomersNames)
            , serializer.Serialize(pMESCustomersNames), serializer.Serialize(pGLOCustomersNames), serializer.Serialize(pSACCustomersNames)};
        }

        [HttpGet, HttpPost]
        public Object[] LoadAll_Companies(string pWhereClause)
        {
            CCompanies objCCompanies = new CCompanies();
            objCCompanies.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCCompanies.lstCVarCompanies) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllCustomersWithIdAndName(string pWhereClause)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var CustomersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
                "select ID,Name from Customers " + pWhereClause
                , typeof(CVarCustomers)).Cast<CVarCustomers>().ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            //return new Object[] { serializer.Serialize(objCCustomers.lstCVarCustomers) };
            return new Object[] { serializer.Serialize(CustomersList) };
        }
        [HttpGet, HttpPost]
        public Object[] LoadAllWithMinimalColumns(string pWhereClauseWithMinimalColumns, string pOrderBy)
        {
            int _RowCount = 0;
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE  ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

       
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords && objCvwUsers.lstCVarvwUsers[0].IsSalesman)
                pWhereClauseWithMinimalColumns += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";


            //if("Default" == "Default") //it will be default value for option
            //{
            //    pWhereClauseWithMinimalColumns += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " Or (select top(1) from )    )";
            //}
            CvwCustomersWithMinimalColumns objCShippers = new CvwCustomersWithMinimalColumns();
            CvwCustomersWithMinimalColumns objCConsignees = new CvwCustomersWithMinimalColumns();
            objCShippers.GetListPaging(999999, 1, " WHERE IsShipper=1", "ID", out _RowCount);
            objCConsignees.GetListPaging(999999, 1, " WHERE IsConsignee=1", "ID", out _RowCount);


            CvwCustomersWithMinimalColumns objCCustomers = new CvwCustomersWithMinimalColumns();
            objCCustomers.GetListPaging(999999, 1, pWhereClauseWithMinimalColumns, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { 
                serializer.Serialize(objCCustomers.lstCVarvwCustomersWithMinimalColumns),
                serializer.Serialize(objCShippers.lstCVarvwCustomersWithMinimalColumns),
                serializer.Serialize(objCConsignees.lstCVarvwCustomersWithMinimalColumns)
            };
        }


        //[HttpGet, HttpPost]
        //public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        //{
        //    Int32 _RowCount = 0;// objCvwCustomers.lstCVarvwCustomers.Count;

        //    CDefaults objCDefaults = new CDefaults();
        //    objCDefaults.GetListPaging(1, 1, " WHERE 1=1 ", " ID ", out _RowCount);
            


        //    CvwUsers objCvwUsers = new CvwUsers();
        //    objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);

        //    pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
        //    string whereClause = " Where (Code LIKE N'%" + pSearchKey + "%' "
        //        + " OR Name LIKE N'%" + pSearchKey + "%' "
        //        + " OR LocalName LIKE N'%" + pSearchKey + "%') "
        //        //+ (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "TOP" ? (" OR CompanyName = '"+ pSearchKey + "'") : "")
        //        + (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords
        //            ? (" AND (SalesmanID = " + WebSecurity.CurrentUserId
        //                + "      OR CreatorUserID = " + WebSecurity.CurrentUserId
        //                + ")")
        //             : "");

        //    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "TOP")
        //    {
        //        CvwCustomersTopManagement objCvwCustomers = new CvwCustomersTopManagement();
        //        objCvwCustomers.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);
        //        return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomers.lstCVarvwCustomersTopManagement), _RowCount };
        //    }
        //    else
        //    {
        //        CvwCustomers objCvwCustomers = new CvwCustomers();
        //        objCvwCustomers.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);
        //        return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomers.lstCVarvwCustomers), _RowCount };
        //    }
        //}

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwCustomers CvwCustomers = new CvwCustomers();
            Int32 _RowCount = 0;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, " WHERE 1=1 ", " ID ", out _RowCount);

            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClause += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            string OrderBy = " Code ";
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "USC")
            {
                OrderBy = " Name ";
            }

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "TOP")
            {
                CvwCustomersTopManagement objCvwCustomers = new CvwCustomersTopManagement();
                objCvwCustomers.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);
                return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomers.lstCVarvwCustomersTopManagement), _RowCount };
            }
            else
            {
                CvwCustomers objCvwCustomers = new CvwCustomers();
                objCvwCustomers.GetListPaging(pPageSize, pPageNumber, pWhereClause, OrderBy, out _RowCount);
                return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomers.lstCVarvwCustomers), _RowCount };
            }
        }
        //[HttpGet, HttpPost]

        //public object[] GetTheLastAddCustomer()
        //{
        //    int _RowCount = 0;
        //    CCustomers objCCustomer = new CCustomers();
        //    objCCustomer.GetListPaging(99999, 1, "where 1 = 1", "ID", out _RowCount);
        //    var Customer = objCCustomer.lstCVarCustomers.LastOrDefault();
        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new Object[] {
        //        serializer.Serialize(Customer) //pData[0]
               
        //    };
        //}

        [HttpGet, HttpPost]
        public Object[] Insert(Int32 pSalesmanID, Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName, string pWebsite, string pEmail, bool pIsConsignee, bool pIsShipper, bool pIsInternalCustomer, bool pIsInactive, string pNotes, string pAddress, string pPhonesAndFaxes, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, Int32 pPriceList
            , string pUserName, string pUserPassword, string pIsActiveUser
            ,String pBillingDetails, Boolean pIsOriginalCMRbyPost , String pCustomerShippingDetails,string pCustomercrmCode,string pCustomerFinance365Ref, Int32 pCategoryID,int pForeignExporterCountryID,string pForeignExporterNo, bool pIsExternal, bool pIsRelated,bool pIsMustPay=true, bool pIsDeleted = false, int pMainClient = 0 ,int pOwnerId =0 ,string pOwnersIDs ="", int pBranchID = 0, int pDebitorGroupID = 0, int pCountryID=0, int pCityID=0, string pAddressLine1="", string pAddressLine2 = "", string pZipCode = "", string pState = "", string pMobile = "")
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            bool crmResult = false;
            string crmMessage = "";

			CCustomers objCCustomers_CheckUnique = new CCustomers();
			CCustomers objCCustomers_CheckUniqueVATNumber = new CCustomers();
			CCustomersTAX objCCustomers_CheckUniqueTAX = new CCustomersTAX();
			CvwDefaults objCvwDefaults = new CvwDefaults();
			objCvwDefaults.GetList("where 1=1");

			string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(CompanyName);

            if (IsMescoCompany && pAccountID == 0 && pSubAccountGroupID == 0 && pSubAccountID == 0)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                string Sub = objCCustomizedDBCall.CallStringFunction("select top 1 ID from A_SubAccounts where SubAccount_Name=N'عملاء محليين'");
                string Acc = objCCustomizedDBCall.CallStringFunction("select top 1 ID from A_Accounts WHERE Account_Name=N'عملاء محليين'");
                if (Sub != "" && Acc != "")
                {
                    pSubAccountGroupID = int.Parse(Sub);
                    pAccountID = int.Parse(Acc);
                }

            }

			if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "SAF")
				objCCustomers_CheckUnique.GetListPaging(999999, 1, "WHERE ((BankName=N'" + pBankName + "' AND BankName IS NOT NULL AND BankName <> '') OR (IBANNumber=N'" + pIBANNumber + "' AND IBANNumber IS NOT NULL AND IBANNumber <> ''))", "ID", out _RowCount);
			else if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "CIL")
			{
				objCCustomers_CheckUniqueVATNumber.GetListPaging(999999, 1, "WHERE ((VATNumber=N'" + pVATNumber + "' AND VATNumber IS NOT NULL AND VATNumber <> '') OR (BankName=N'" + pBankName + "' AND BankName IS NOT NULL AND BankName <> '') )", "ID", out _RowCount);


			}
			else
				objCCustomers_CheckUniqueVATNumber.GetListPaging(999999, 1, "WHERE ((VATNumber=N'" + pVATNumber + "' AND VATNumber IS NOT NULL AND VATNumber <> '') )", "ID", out _RowCount);

			bool IsActiveUser = bool.Parse(pIsActiveUser);
			if(objCCustomers_CheckUnique.lstCVarCustomers.Count > 0)
			{
				checkException = new Exception("Can't repeat customer");
			}
			else if(objCCustomers_CheckUniqueVATNumber.lstCVarCustomers.Count > 0)
			{
				checkException = new Exception("Can't repeat vat no");
			}
				else if (objCCustomers_CheckUnique.lstCVarCustomers.Count == 0
				&& objCCustomers_CheckUniqueVATNumber.lstCVarCustomers.Count == 0   // Unique VATNumber
				&& !(
				// Has User Name
				pUserName != null && pUserName.Trim() != "" && pUserName.Trim() != "0"
				&&
				(objCvwDefaults.lstCVarvwDefaults[0].NumberOfCustomerLimits <= objCvwDefaults.lstCVarvwDefaults[0].NumberOfActiveCustomersUsers && IsActiveUser == true))) //unique TaxID and CommercialRegister
			{
				CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                 CVarCustomers objCVarCustomers = new CVarCustomers();
                objCVarCustomers.SalesmanID = pSalesmanID;
                objCVarCustomers.PaymentTermID = pPaymentTermID;
                objCVarCustomers.CurrencyID = pCurrencyID;
                objCVarCustomers.TaxeTypeID = pTaxeTypeID;
                objCVarCustomers.Code = pCode;
                objCVarCustomers.Name = pName.Trim().ToUpper();
                objCVarCustomers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarCustomers.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarCustomers.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
                objCVarCustomers.IsConsignee = pIsConsignee;
                objCVarCustomers.IsShipper = pIsShipper;
                objCVarCustomers.IsInternalCustomer = pIsInternalCustomer;
                objCVarCustomers.IsExternal = pIsExternal;
                objCVarCustomers.IsInactive = pIsInactive;
                objCVarCustomers.IsDeleted = pIsDeleted;
                objCVarCustomers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarCustomers.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
                objCVarCustomers.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
                objCVarCustomers.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarCustomers.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarCustomers.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarCustomers.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarCustomers.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarCustomers.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarCustomers.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());
                objCVarCustomers.ForeignExporterNo = pForeignExporterNo;
                objCVarCustomers.ForeignExporterCountryID = pForeignExporterCountryID;
                objCVarCustomers.BillingDetails = (pBillingDetails == null ? "" : pBillingDetails.Trim().ToUpper());
                objCVarCustomers.OriginalCMRbyPost = pIsOriginalCMRbyPost;
                objCVarCustomers.ShippingDetails = (pCustomerShippingDetails == null ? "" : pCustomerShippingDetails.Trim().ToUpper());
                objCVarCustomers.AccountID = pAccountID;
                objCVarCustomers.SubAccountID = pSubAccountID;
                objCVarCustomers.CostCenterID = pCostCenterID;
                objCVarCustomers.SubAccountGroupID = pSubAccountGroupID;
                objCVarCustomers.ManagerRoleID = 5;
                objCVarCustomers.AdministratorRoleID = 1;
                objCVarCustomers.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarCustomers.LockingUserID = pPriceList;
                objCVarCustomers.CreatorUserID = objCVarCustomers.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustomers.CreationDate = objCVarCustomers.ModificationDate = DateTime.Now;
                objCVarCustomers.CategoryID = pCategoryID;
                objCVarCustomers.crmCode = pCustomercrmCode;
                objCVarCustomers.AllProductsReserved = false;
                objCVarCustomers.ReservationReason = "";
                objCVarCustomers.MainClientID = pMainClient;
                objCVarCustomers.IsHold = false;
                objCVarCustomers.HoldReason = "";
                objCVarCustomers.OwnerId = pOwnerId;
                objCVarCustomers.OwnersIds = (pOwnersIDs == null ? "" : pOwnersIDs);
                objCVarCustomers.Finance365Ref = pCustomerFinance365Ref;
                objCVarCustomers.BranchID = pBranchID;
                objCVarCustomers.DebitorGroupID = pDebitorGroupID;
                objCVarCustomers.Mobile = pMobile;
                    checkException =   Fleet_Forwarding_Customers.InsertUpdate_Fleet_Forwarding_Customer(objCVarCustomers);
                if (checkException == null)
                    _result = true;

        

               if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0 && objCVarCustomers.ID != 0)
                {
                    checkException = CreateSubAccount(pSubAccountGroupID, pName, CompanyName, objCVarCustomers.ID, 0);
                }
            }
            else
            {
                    CVarCustomers objCVarCustomers = new CVarCustomers();
                    objCVarCustomers.SalesmanID = pSalesmanID;
                    objCVarCustomers.PaymentTermID = pPaymentTermID;
                    objCVarCustomers.CurrencyID = pCurrencyID;
                    objCVarCustomers.TaxeTypeID = pTaxeTypeID;

                    objCVarCustomers.Code = pCode;
                    objCVarCustomers.Name = pName.Trim().ToUpper();
                    objCVarCustomers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                    objCVarCustomers.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                    objCVarCustomers.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
                    objCVarCustomers.IsConsignee = pIsConsignee;
                    objCVarCustomers.IsShipper = pIsShipper;
                    objCVarCustomers.IsInternalCustomer = pIsInternalCustomer;
                    objCVarCustomers.IsInactive = pIsInactive;
                    objCVarCustomers.IsDeleted = pIsDeleted;
                    objCVarCustomers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                    objCVarCustomers.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
                    objCVarCustomers.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
                    objCVarCustomers.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                    objCVarCustomers.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                    objCVarCustomers.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                    objCVarCustomers.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                    objCVarCustomers.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                    objCVarCustomers.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                    objCVarCustomers.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());
                    objCVarCustomers.ForeignExporterNo = pForeignExporterNo;
                    objCVarCustomers.ForeignExporterCountryID = pForeignExporterCountryID;


                    objCVarCustomers.BillingDetails = (pBillingDetails == null ? "" : pBillingDetails.Trim().ToUpper());
                    objCVarCustomers.OriginalCMRbyPost = pIsOriginalCMRbyPost;
                    objCVarCustomers.ShippingDetails = (pCustomerShippingDetails == null ? "" : pCustomerShippingDetails.Trim().ToUpper());

                    objCVarCustomers.AccountID = pAccountID;
                    objCVarCustomers.SubAccountID = pSubAccountID;
                    objCVarCustomers.CostCenterID = pCostCenterID;
                    objCVarCustomers.SubAccountGroupID = pSubAccountGroupID;

                    objCVarCustomers.ManagerRoleID = 5;
                    objCVarCustomers.AdministratorRoleID = 1;

                    objCVarCustomers.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarCustomers.LockingUserID = pPriceList;

                    objCVarCustomers.CreatorUserID = objCVarCustomers.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarCustomers.CreationDate = objCVarCustomers.ModificationDate = DateTime.Now;
                    objCVarCustomers.CategoryID = pCategoryID;
                    objCVarCustomers.crmCode = pCustomercrmCode;
                    if (CompanyName == "LATT" && pDebitorGroupID != 0)
                    {
                        CCustomizedDBCall call = new CCustomizedDBCall();
                        string NextCustomerNumber = call.CallStringFunction("select max(cast(crmCode as int))+1 from Customers where DebitorGroupID is not null");
                        objCVarCustomers.crmCode = NextCustomerNumber;
                    }
                    objCVarCustomers.AllProductsReserved = false;
                    objCVarCustomers.ReservationReason = "";
                    objCVarCustomers.MainClientID = pMainClient;
                    objCVarCustomers.IsHold = false;
                    objCVarCustomers.HoldReason = "";
                    objCVarCustomers.Finance365Ref = pCustomerFinance365Ref; 
                    objCVarCustomers.IsRelated = pIsRelated;
                    objCVarCustomers.IsMustPay = pIsMustPay;
                    objCVarCustomers.OwnerId = pOwnerId;
                    objCVarCustomers.OwnersIds = (pOwnersIDs == null ? "" : pOwnersIDs);
                    objCVarCustomers.BranchID = pBranchID;
                    objCVarCustomers.DebitorGroupID = pDebitorGroupID;
                    objCVarCustomers.Mobile = pMobile;

                    CCustomers objCCustomers = new CCustomers();
                    objCCustomers.lstCVarCustomers.Add(objCVarCustomers);
                    checkException = objCCustomers.SaveMethod(objCCustomers.lstCVarCustomers);

                    //log Finance365Ref if it has a value
                    if (checkException == null && pCustomerFinance365Ref != "0")
                    {
                        Finance365RefLogController objFinance365RefLogController = new Finance365RefLogController();
                        objFinance365RefLogController.Insert(new Finance365RefLogInsertDto()
                        {
                            TableName = "Customers",
                            RecordID = objCVarCustomers.ID,
                            OldValue = "NewRecord",
                            NewValue = pCustomerFinance365Ref
                        });
                    }

                    CAddresses objCAddresses = new CAddresses();
                    if (checkException == null && pCityID != 0 && (CompanyName=="LAT"|| CompanyName=="LATT"))
                    {
                        CVarAddresses objCVarAddresses = new CVarAddresses();
                        objCVarAddresses.PartnerTypeID = 1;
                        objCVarAddresses.PartnerID = objCCustomers.lstCVarCustomers[0].ID;
                        objCVarAddresses.AddressTypeID = 1;
                        objCVarAddresses.CountryID = pCountryID;
                        objCVarAddresses.CityID = pCityID;
                        objCVarAddresses.StreetLine1 = pAddressLine1;
                        objCVarAddresses.StreetLine2 = pAddressLine2;
                        objCVarAddresses.ZipCode = pZipCode;
                        objCVarAddresses.PrintedAs = pState;
                        objCVarAddresses.CreatorUserID = objCVarAddresses.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarAddresses.CreationDate = objCVarAddresses.ModificationDate = DateTime.Now;
                        objCVarAddresses.LockingUserID = 0;
                        objCVarAddresses.TimeLocked = DateTime.Parse("01-01-1900");
                        objCVarAddresses.IsDeleted = false;
                        objCVarAddresses.AdditionalAddress = "";

                        objCAddresses.lstCVarAddresses.Add(objCVarAddresses);

                        checkException = objCAddresses.SaveMethod(objCAddresses.lstCVarAddresses);
                    }
                    if (checkException == null && pDebitorGroupID != 0 && (CompanyName == "LAT" || CompanyName == "LATT"))
                    {
                        var DynamicsGPControllerObject = new DynamicsGPController();
                        try
                        {
                            CvwLattCustomers objCvwLattCustomers = new CvwLattCustomers();
                            objCvwLattCustomers.GetList($"WHERE ID={objCCustomers.lstCVarCustomers[0].ID}");

                            if(objCvwLattCustomers.lstCVarvwLattCustomers.Count == 1)
                            {
                                APIResponse response = DynamicsGPControllerObject.InsertCustomer(objCvwLattCustomers.lstCVarvwLattCustomers[0]);
                                if (response.IsSuccess)
                                {
                                    //CCustomers updateCrmCode = new CCustomers();
                                    //updateCrmCode.UpdateList($"EmailOptionAging=1 WHERE ID={objCCustomers.lstCVarCustomers[0].ID}");
                                    crmResult = true;
                                } else
                                {
                                    crmResult = false;
                                    crmMessage = response.Message;
                                }

                            }
                        } catch (Exception ex)
                        {
                            Exception e2 = ex;
                        }
                    }

                    CVarCustomersTAX objCVarCustomersTAX = new CVarCustomersTAX();
                    int _RowCount2 = 0;
                    Int32 supID = 0;
                    Int32 supGroupID = 0;
                    Int32 AccountID = 0;
                    CVarCustomersTAX objCVarCustomersTAX2 = new CVarCustomersTAX();

                    if (checkException == null)
                    {

                        //SupAccount
                        CA_SubAccounts objCA_SubAccountsSupAccount = new CA_SubAccounts(); //get the parent details
                        checkException = objCA_SubAccountsSupAccount.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountID, "ID", out _RowCount2);
                        CA_SubAccountsTAX objCA_SubAccountsTAXOther = new CA_SubAccountsTAX(); //get the parent details

                        //SupAccountGroup
                        CA_SubAccounts objCA_SubAccountsSupAccountGroup = new CA_SubAccounts(); //get the parent details
                        checkException = objCA_SubAccountsSupAccountGroup.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID, "ID", out _RowCount2);
                        CA_AccountsTAX objCAccountsTAX = new CA_AccountsTAX(); //get the parent details




                        //Account
                        CA_Accounts objCACA_Accounts = new CA_Accounts(); //get the parent details
                        checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pAccountID, "ID", out _RowCount2);

                        if (objCA_SubAccountsSupAccount.lstCVarA_SubAccounts.Count > 0 && (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI"))
                        {
                            checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSupAccount.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                            if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                            {
                                supID = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;

                            }
                        }
                        if (objCA_SubAccountsSupAccountGroup.lstCVarA_SubAccounts.Count > 0 && (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI"))
                        {
                            checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSupAccountGroup.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                            if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                            {
                                supGroupID = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;
                            }

                        }
                        if (objCACA_Accounts.lstCVarA_Accounts.Count > 0 && (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI"))
                        {
                            checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_Accounts.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                            if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                            {
                                AccountID = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                            }

                        }
                        if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null)
                        {
                            objCVarCustomersTAX.SalesmanID = pSalesmanID;
                            objCVarCustomersTAX.PaymentTermID = pPaymentTermID;
                            objCVarCustomersTAX.CurrencyID = pCurrencyID;
                            objCVarCustomersTAX.TaxeTypeID = pTaxeTypeID;

                            objCVarCustomersTAX.Code = pCode;
                            objCVarCustomersTAX.Name = pName.Trim().ToUpper();
                            objCVarCustomersTAX.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                            objCVarCustomersTAX.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                            objCVarCustomersTAX.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
                            objCVarCustomersTAX.IsConsignee = pIsConsignee;
                            objCVarCustomersTAX.IsShipper = pIsShipper;
                            objCVarCustomersTAX.IsInternalCustomer = pIsInternalCustomer;
                            objCVarCustomersTAX.IsInactive = pIsInactive;
                            objCVarCustomersTAX.IsDeleted = pIsDeleted;
                            objCVarCustomersTAX.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                            objCVarCustomersTAX.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
                            objCVarCustomersTAX.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
                            objCVarCustomersTAX.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                            objCVarCustomersTAX.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                            objCVarCustomersTAX.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                            objCVarCustomersTAX.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                            objCVarCustomersTAX.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                            objCVarCustomersTAX.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                            objCVarCustomersTAX.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                            objCVarCustomersTAX.BillingDetails = (pBillingDetails == null ? "" : pBillingDetails.Trim().ToUpper());
                            objCVarCustomersTAX.OriginalCMRbyPost = pIsOriginalCMRbyPost;
                            objCVarCustomersTAX.ShippingDetails = (pCustomerShippingDetails == null ? "" : pCustomerShippingDetails.Trim().ToUpper());

                            objCVarCustomersTAX.AccountID = AccountID;
                            objCVarCustomersTAX.SubAccountID = pSubAccountID;
                            objCVarCustomersTAX.CostCenterID = pCostCenterID;
                            objCVarCustomersTAX.SubAccountGroupID = supGroupID;

                            objCVarCustomersTAX.ManagerRoleID = 5;
                            objCVarCustomersTAX.AdministratorRoleID = 1;

                            objCVarCustomersTAX.TimeLocked = DateTime.Parse("01-01-1900");
                            objCVarCustomersTAX.LockingUserID = pPriceList;

                            objCVarCustomersTAX.CreatorUserID = objCVarCustomersTAX.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarCustomersTAX.CreationDate = objCVarCustomersTAX.ModificationDate = DateTime.Now;
                            objCVarCustomersTAX.CategoryID = pCategoryID;
                            CCustomersTAX objCCustomersTAX = new CCustomersTAX();
                            objCCustomersTAX.lstCVarCustomersTAX.Add(objCVarCustomersTAX);
                            checkException = objCCustomersTAX.SaveMethodCHMTAX(objCCustomersTAX.lstCVarCustomersTAX);

                        }
                        if (checkException != null) // an exception is caught in the model
                        {
                            if (checkException.Message.Contains("UNIQUE"))
                                _result = false;
                        }
                        else
                        { //not unique
                            GlobalVariable.CustID = objCVarCustomers.ID;
                            _result = true;
                            #region Create SubAccount
                            _RowCount = 0;
                            if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                            {
                              checkException=  CreateSubAccount(pSubAccountGroupID, pName, CompanyName, objCVarCustomers.ID, objCVarCustomersTAX.ID);
                            }
                            #endregion Create SubAccount
                            #region CreateUser
                            var res = false;
                            res = SaveCustomerUser(objCVarCustomers.ID, 0, pUserName, pUserPassword, IsActiveUser);
                            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
                            {
                                res = SaveCustomerUserTAX(objCVarCustomers.ID, 0, pUserName, pUserPassword, IsActiveUser);

                            }

							#endregion CreateUser
							#region CreateOwner
							if(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName=="FPL")
							{
								OwnersController ownersController = new OwnersController();
								ownersController.Insert(objCVarCustomers.Name, objCVarCustomers.LocalName, objCVarCustomers.ID);
							}
							#endregion
						}
					}
            }
                }//unique TaxID and CommercialRegister

            //CvwCustomers objCvwCustomers = new CvwCustomers();
            //objCvwCustomers.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
            //var Customer = objCvwCustomers.lstCVarvwCustomers.LastOrDefault();
            //var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[]
            {
                _result,
                checkException == null ? "" : checkException.Message,
                crmResult,
                crmMessage
            };
          
            //return _result;
        }

        public Exception CreateSubAccount(int pSubAccountGroupID, string pName ,string CompanyName ,int pCustomerID  ,int pTaxCustomerID)
        {
            Exception checkException;
            int _RowCount = 0;
            bool _result = false;
            CCustomers objCCustomers = new CCustomers();
            #region Create SubAccount

            #region Get data to insert
            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (pSubAccountGroupID == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                #endregion Get data to insert
                #region Insert
                CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                objCVarA_SubAccounts.Parent_ID = pSubAccountGroupID;
                objCVarA_SubAccounts.IsMain = false;
                objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);

          

                CA_SubAccountsTAX objCA_SubAccountsTAX = new CA_SubAccountsTAX();

                CVarA_SubAccountsTAX objCVarA_SubAccountsTAX = new CVarA_SubAccountsTAX();
                if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
                {

                    objCVarA_SubAccountsTAX.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                    objCVarA_SubAccountsTAX.SubAccount_Name = pName.Trim().ToUpper();
                    objCVarA_SubAccountsTAX.SubAccount_EnName = pName.Trim().ToUpper();
                    objCVarA_SubAccountsTAX.Parent_ID = pSubAccountGroupID;
                    objCVarA_SubAccountsTAX.IsMain = false;
                    objCVarA_SubAccountsTAX.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                    objCVarA_SubAccountsTAX.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                    objCVarA_SubAccountsTAX.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccountsTAX.lstCVarA_SubAccounts.Add(objCVarA_SubAccountsTAX);
                    checkException = objCA_SubAccountsTAX.SaveMethodCHMTAX(objCA_SubAccountsTAX.lstCVarA_SubAccounts);

                }


                if (checkException == null)
                {
                    _result = true;
                    int pNewSubAccountID = objCVarA_SubAccounts.ID;
                    //CallCustomizedSP
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                    //Set Parent.IsMain=true
                    objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                    if (CompanyName == "CHM" && checkException == null)
                    {
                        objCA_SubAccountsTAX.UpdateListTAX("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());

                    }

                    #region add Details if exists
                    CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                    CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTax = new CA_SubAccounts_DetailsTAX(); //get the parent details

                    checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                    checkException = objCA_SubAccounts_DetailsTax.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);

                    for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                    {
                        //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                        objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                    }
                    if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
                    {
                        for (int i = 0; i < objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTAX", "I", objCVarA_SubAccountsTAX.ID, objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }

                    }

                    #endregion add Details if exists
                    //Update Customer SubaccountID
                    objCCustomers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + pCustomerID);
                    CCustomersTAX CCustomersTAX = new CCustomersTAX();

                    if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
                    {
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            CCustomersTAX.UpdateListTAX("SubAccountID=" + objCVarA_SubAccountsTAX.ID + " WHERE ID=" + pTaxCustomerID);
                        }

                    }
                }
            #endregion Insert

            #endregion Create SubAccount

            return checkException;
        }
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pSalesmanID, Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName, string pWebsite, string pEmail, bool pIsConsignee, bool pIsShipper, bool pIsInternalCustomer, bool pIsInactive, string pNotes, string pAddress, string pPhonesAndFaxes, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, Int32 pPriceList
            , string pUserID, string pUserName, string pOldUserName, string pIsActiveUser, string pOldIsInActiveUser, string pPassword
            , String pBillingDetails, Boolean pIsOriginalCMRbyPost, String pCustomerShippingDetails,string pCustomercrmCode,string pCustomerFinance365Ref, Int32 pCategoryID , String pForeignExporterNo , int pForeignExporterCountryID, bool pIsExternal, bool pIsRelated,bool pIsMustPay, bool pIsDeleted = false , Int32 pMainClientID =0,string pOwnersIDs = "", int pBranchID = 0, int pDebitorGroupID = 0, DateTime? pCreationDate = null, string pMobile ="0")
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException;
            CCustomers objCCustomers_CheckUnique = new CCustomers();
            CCustomers objCCustomers_CheckUniqueVATNumber = new CCustomers();
            CvwDefaults objCDefaults = new CvwDefaults();

            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName);

            if (objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "SAF")
                objCCustomers_CheckUnique.GetListPaging(999999, 1, "WHERE ID<>" + pID +" AND ((BankName=N'" + pBankName + "' AND BankName IS NOT NULL AND BankName <> N'') OR (IBANNumber=N'" + pIBANNumber + "'AND IBANNumber IS NOT NULL AND IBANNumber <> N''))", "ID", out _RowCount);

            objCCustomers_CheckUniqueVATNumber.GetListPaging(999999, 1, "WHERE ID<>" + pID +" AND ((VATNumber=N'" + pVATNumber + "' AND VATNumber IS NOT NULL AND VATNumber <> '') )", "ID", out _RowCount);

            var CustomerUserID = int.Parse(pUserID);
            var IsActiveUser = bool.Parse(pIsActiveUser);
            var IsOldActiveUser = !(bool.Parse(pOldIsInActiveUser));
            if (objCCustomers_CheckUnique.lstCVarCustomers.Count == 0      //unique TaxID and CommercialRegister
                && objCCustomers_CheckUniqueVATNumber.lstCVarCustomers.Count == 0   // Unique VATNumber
                &&
                !(
                  //************ Has User Name  for : (add or update account)********************  [ for check is not valid]
                  pUserName != null && pUserName.Trim() != "" && pUserName.Trim() != "0" 
                  &&
                  (

                  //************** We Access To Max No of Allowed Users  ***************** [ for check is not valid]
                  objCDefaults.lstCVarvwDefaults[0].NumberOfCustomerLimits <= objCDefaults.lstCVarvwDefaults[0].NumberOfActiveCustomersUsers 
                  
                  && (

                  //*************  The User has Account  and  is ["not active"] but  ["update to active"] **************** [ for check is not valid]
                  (CustomerUserID != 0 && IsActiveUser == true && IsOldActiveUser == false) 
                  ||
                  // ****************** The User has not Account  and  is set as  ["active"] **************** [ for check is not valid]
                  (CustomerUserID == 0 &&  IsActiveUser == true) )
                  
                  )
                 )
                 
                ) 
            {
                CVarCustomersTAX objCVarCustomersTAX = new CVarCustomersTAX();
                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CCustomersTAX objCGetCreationInformationTAX = new CCustomersTAX();
                CVarCustomers objCVarCustomers = new CVarCustomers();
                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CCustomers objCGetCreationInformation = new CCustomers();
                objCGetCreationInformation.GetItem(pID);
                objCVarCustomers.SalesLeadID = objCGetCreationInformation.lstCVarCustomers[0].SalesLeadID;
                objCVarCustomers.CreatorUserID = objCGetCreationInformation.lstCVarCustomers[0].CreatorUserID;

                if (IsMescoCompany)
                {
                    objCVarCustomers.CreationDate = pCreationDate == null ? objCGetCreationInformation.lstCVarCustomers[0].CreationDate : (DateTime)pCreationDate;
                } else
                {
                    objCVarCustomers.CreationDate = objCGetCreationInformation.lstCVarCustomers[0].CreationDate;
                }
                objCVarCustomers.EmailOptionAging = objCGetCreationInformation.lstCVarCustomers[0].EmailOptionAging;
                objCVarCustomers.EmailOptionInvoicesReport = objCGetCreationInformation.lstCVarCustomers[0].EmailOptionInvoicesReport;
                objCVarCustomers.EmailOptionPartnerStatement = objCGetCreationInformation.lstCVarCustomers[0].EmailOptionPartnerStatement;
                objCVarCustomers.IsExternal = pIsExternal; //objCGetCreationInformation.lstCVarCustomers[0].IsExternal;
                if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
                {
                    objCVarCustomers.AccountID = objCGetCreationInformation.lstCVarCustomers[0].AccountID;
                    objCVarCustomers.SubAccountID = objCGetCreationInformation.lstCVarCustomers[0].SubAccountID;
                    objCVarCustomers.CostCenterID = objCGetCreationInformation.lstCVarCustomers[0].CostCenterID;
                    objCVarCustomers.SubAccountGroupID = objCGetCreationInformation.lstCVarCustomers[0].SubAccountGroupID;
                }
                else
                {
                    objCVarCustomers.AccountID = pAccountID;
                    objCVarCustomers.SubAccountID = pSubAccountID;
                    objCVarCustomers.CostCenterID = pCostCenterID;
                    objCVarCustomers.SubAccountGroupID = pSubAccountGroupID;
                }
                objCVarCustomers.ID = pID;

                objCVarCustomers.SalesmanID = pSalesmanID;
                objCVarCustomers.PaymentTermID = pPaymentTermID;
                objCVarCustomers.CurrencyID = pCurrencyID;
                objCVarCustomers.TaxeTypeID = pTaxeTypeID;

                objCVarCustomers.Code = pCode;
                objCVarCustomers.Name = pName.Trim().ToUpper();
                objCVarCustomers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarCustomers.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarCustomers.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
                objCVarCustomers.IsConsignee = pIsConsignee;
                objCVarCustomers.IsShipper = pIsShipper;
                objCVarCustomers.IsInternalCustomer = pIsInternalCustomer;
                objCVarCustomers.IsInactive = pIsInactive;
                objCVarCustomers.IsDeleted = pIsDeleted;
                objCVarCustomers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarCustomers.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
                objCVarCustomers.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
                objCVarCustomers.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarCustomers.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarCustomers.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarCustomers.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarCustomers.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarCustomers.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarCustomers.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());
                objCVarCustomers.LockingUserID = pPriceList;
                objCVarCustomers.ManagerRoleID = 5;
                objCVarCustomers.AdministratorRoleID = 1;
                objCVarCustomers.ForeignExporterCountryID = pForeignExporterCountryID;
                objCVarCustomers.BillingDetails = (pBillingDetails == null ? "" : pBillingDetails.Trim().ToUpper());
                objCVarCustomers.OriginalCMRbyPost = pIsOriginalCMRbyPost;
                objCVarCustomers.ForeignExporterNo = pForeignExporterNo;
                objCVarCustomers.ForeignExporterCountryID = pForeignExporterCountryID;
                objCVarCustomers.ShippingDetails = (pCustomerShippingDetails == null ? "" : pCustomerShippingDetails.Trim().ToUpper());
                objCVarCustomers.AllProductsReserved = false;
                objCVarCustomers.ReservationReason = "";
                objCVarCustomers.MainClientID = pMainClientID;
                objCVarCustomers.TimeLocked = DateTime.Parse("01-01-1900");

                objCVarCustomers.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustomers.ModificationDate = DateTime.Now;
                objCVarCustomers.CategoryID = pCategoryID;
                objCVarCustomers.crmCode = objCGetCreationInformation.lstCVarCustomers[0].crmCode;
                if (CompanyName == "LATT" && pDebitorGroupID != 0 && objCGetCreationInformation.lstCVarCustomers[0].DebitorGroupID == 0)
                {
                    CCustomizedDBCall call = new CCustomizedDBCall();
                    string NextCustomerNumber = call.CallStringFunction("select max(cast(crmCode as int))+1 from Customers where DebitorGroupID is not null");
                    objCVarCustomers.crmCode = NextCustomerNumber;
                }
                objCVarCustomers.IsHold = objCGetCreationInformation.lstCVarCustomers[0].IsHold;
                objCVarCustomers.IsRelated = pIsRelated;
                objCVarCustomers.IsMustPay = pIsMustPay;
                objCVarCustomers.HoldReason = objCGetCreationInformation.lstCVarCustomers[0].HoldReason;
                if (pCustomerFinance365Ref != "" && pCustomerFinance365Ref != "0")
                    objCVarCustomers.Finance365Ref = pCustomerFinance365Ref;
                else
                    objCVarCustomers.Finance365Ref = objCGetCreationInformation.lstCVarCustomers[0].Finance365Ref;

                objCVarCustomers.OwnerId = 0;
                objCVarCustomers.OwnersIds = pOwnersIDs == null ? "" : pOwnersIDs;
                objCVarCustomers.BranchID = pBranchID;
                objCVarCustomers.DebitorGroupID = pDebitorGroupID;
                objCVarCustomers.Mobile = pMobile;

                CCustomers objCCustomers = new CCustomers();

                CSystemOptions objCSystemOptions = new CSystemOptions();
                objCSystemOptions.GetList("Where OptionID= 195");
                if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                {
                    checkException = Fleet_Forwarding_Customers.InsertUpdate_Fleet_Forwarding_Customer(objCVarCustomers);
                }
                else
                objCCustomers.lstCVarCustomers.Add(objCVarCustomers);

                 checkException = objCCustomers.SaveMethod(objCCustomers.lstCVarCustomers);

                //log Finance365Ref change 
                if(checkException == null && objCGetCreationInformation.lstCVarCustomers[0].Finance365Ref != pCustomerFinance365Ref)
                {
                    Finance365RefLogController objFinance365RefLogController = new Finance365RefLogController();
                    objFinance365RefLogController.Insert(new Finance365RefLogInsertDto()
                    {
                        TableName = "Customers",
                        RecordID = pID,
                        OldValue = objCGetCreationInformation.lstCVarCustomers[0].Finance365Ref,
                        NewValue = pCustomerFinance365Ref
                    });
                }


                CCustomersTAX objCCustomersTAX = new CCustomersTAX();
                objCCustomersTAX.GetList("WHERE Name=N'"+ pName.Trim().ToUpper()+"'");
                if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null && objCCustomersTAX.lstCVarCustomersTAX.Count>0)
                {
                     objCVarCustomersTAX = new CVarCustomersTAX();
                    //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                     objCGetCreationInformationTAX = new CCustomersTAX();
                    

                    objCGetCreationInformationTAX.GetItem(objCCustomersTAX.lstCVarCustomersTAX[0].ID);
                    objCVarCustomersTAX.SalesLeadID = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].SalesLeadID;
                    objCVarCustomersTAX.CreatorUserID = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].CreatorUserID;
                    objCVarCustomersTAX.CreationDate = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].CreationDate;
                    objCVarCustomersTAX.EmailOptionAging = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].EmailOptionAging;
                    objCVarCustomersTAX.EmailOptionInvoicesReport = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].EmailOptionInvoicesReport;
                    objCVarCustomersTAX.EmailOptionPartnerStatement = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].EmailOptionPartnerStatement;
                    objCVarCustomersTAX.IsExternal = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].IsExternal;
                    if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
                    {
                        objCVarCustomersTAX.AccountID = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].AccountID;
                        objCVarCustomersTAX.SubAccountID = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].SubAccountID;
                        objCVarCustomersTAX.CostCenterID = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].CostCenterID;
                        objCVarCustomersTAX.SubAccountGroupID = objCGetCreationInformationTAX.lstCVarCustomersTAX[0].SubAccountGroupID;
                    }
                    else
                    {
                        objCVarCustomersTAX.AccountID = objCCustomersTAX.lstCVarCustomersTAX[0].AccountID;
                        objCVarCustomersTAX.SubAccountID = objCCustomersTAX.lstCVarCustomersTAX[0].SubAccountID;
                        objCVarCustomersTAX.CostCenterID = objCCustomersTAX.lstCVarCustomersTAX[0].CostCenterID;
                        objCVarCustomersTAX.SubAccountGroupID = objCCustomersTAX.lstCVarCustomersTAX[0].SubAccountGroupID;
                    }
                    objCVarCustomersTAX.ID = objCCustomersTAX.lstCVarCustomersTAX[0].ID;

                    objCVarCustomersTAX.SalesmanID = pSalesmanID;
                    objCVarCustomersTAX.PaymentTermID = pPaymentTermID;
                    objCVarCustomersTAX.CurrencyID = pCurrencyID;
                    objCVarCustomersTAX.TaxeTypeID = pTaxeTypeID;

                    objCVarCustomersTAX.Code = pCode;
                    objCVarCustomersTAX.Name = pName.Trim().ToUpper();
                    objCVarCustomersTAX.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                    objCVarCustomersTAX.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                    objCVarCustomersTAX.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
                    objCVarCustomersTAX.IsConsignee = pIsConsignee;
                    objCVarCustomersTAX.IsShipper = pIsShipper;
                    objCVarCustomersTAX.IsInternalCustomer = pIsInternalCustomer;
                    objCVarCustomersTAX.IsInactive = pIsInactive;
                    objCVarCustomersTAX.IsDeleted = pIsDeleted;
                    objCVarCustomersTAX.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                    objCVarCustomersTAX.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
                    objCVarCustomersTAX.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
                    objCVarCustomersTAX.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                    objCVarCustomersTAX.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                    objCVarCustomersTAX.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                    objCVarCustomersTAX.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                    objCVarCustomersTAX.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                    objCVarCustomersTAX.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                    objCVarCustomersTAX.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());
                    objCVarCustomersTAX.LockingUserID = pPriceList;
                    objCVarCustomersTAX.ManagerRoleID = 5;
                    objCVarCustomersTAX.AdministratorRoleID = 1;

                    objCVarCustomersTAX.BillingDetails = (pBillingDetails == null ? "" : pBillingDetails.Trim().ToUpper());
                    objCVarCustomersTAX.OriginalCMRbyPost = pIsOriginalCMRbyPost;
                    objCVarCustomersTAX.ShippingDetails = (pCustomerShippingDetails == null ? "" : pCustomerShippingDetails.Trim().ToUpper());

                    objCVarCustomersTAX.TimeLocked = DateTime.Parse("01-01-1900");

                    objCVarCustomersTAX.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarCustomersTAX.ModificationDate = DateTime.Now;
                    objCVarCustomersTAX.CategoryID = pCategoryID;
                    objCCustomersTAX = new CCustomersTAX();
                    objCCustomersTAX.lstCVarCustomersTAX.Add(objCVarCustomersTAX);
                    checkException = objCCustomersTAX.SaveMethodCHMTAX(objCCustomersTAX.lstCVarCustomersTAX);

                }
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else
                { //not unique
                    GlobalVariable.CustID = objCVarCustomers.ID;
                    _result = true;
                    #region Create SubAccount
                    _RowCount = 0;
                    if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                    {
                        #region Get data to insert
                        CA_SubAccountsTAX objCA_SubAccountsTAX = new CA_SubAccountsTAX();
                        CVarA_SubAccountsTAX objCVarA_SubAccountsTAX = new CVarA_SubAccountsTAX();

                        CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                        checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (pSubAccountGroupID == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                        string pNewCode2 = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCodeTax(" + (pSubAccountGroupID == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");

                        #endregion Get data to insert
                        #region Insert
                        CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                        objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                        objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                        objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                        objCVarA_SubAccounts.Parent_ID = pSubAccountGroupID;
                        objCVarA_SubAccounts.IsMain = false;
                        objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                        objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                        objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                        objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                        checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);


                        //Update Customer SubaccountID
                        objCCustomers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarCustomers.ID);

                        if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
                        {
                            

                            objCVarA_SubAccountsTAX.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode2).PadRight(21, '0');
                            objCVarA_SubAccountsTAX.SubAccount_Name = pName.Trim().ToUpper();
                            objCVarA_SubAccountsTAX.SubAccount_EnName = pName.Trim().ToUpper();
                            objCVarA_SubAccountsTAX.Parent_ID = pSubAccountGroupID;
                            objCVarA_SubAccountsTAX.IsMain = false;
                            objCVarA_SubAccountsTAX.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                            objCVarA_SubAccountsTAX.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode2;
                            objCVarA_SubAccountsTAX.User_ID = WebSecurity.CurrentUserId;
                            objCA_SubAccountsTAX.lstCVarA_SubAccounts.Add(objCVarA_SubAccountsTAX);
                            checkException = objCA_SubAccountsTAX.SaveMethod(objCA_SubAccountsTAX.lstCVarA_SubAccounts);

                        }
                        

                        if (checkException == null)
                        {
                            _result = true;
                            int pNewSubAccountID = objCVarA_SubAccounts.ID;
                            //CallCustomizedSP
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                            //Set Parent.IsMain=true
                            objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException != null)
                            {
                                objCA_SubAccountsTAX.UpdateListTAX("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());

                            }
                            #region add Details if exists
                            CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTax = new CA_SubAccounts_DetailsTAX(); //get the parent details

                            checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                            for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                            {
                                //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                            }
                            checkException = objCA_SubAccounts_DetailsTax.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);

                            if ((CompanyName == "CHM" || CompanyName == "OCE") && checkException == null)
                            {
                                for (int i = 0; i < objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details.Count; i++)
                                {
                                    //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                                    objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTAX", "I", objCVarA_SubAccountsTAX.ID, objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                                }

                            }
                           
                            #endregion add Details if exists
                            //CCustomersTAX objCCustomersTAX = new CCustomersTAX();
                            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
                            {
                                objCCustomersTAX.UpdateListTAX("SubAccountID=" + objCVarA_SubAccountsTAX.ID + " WHERE ID=" + objCVarCustomersTAX.ID);

                            }



                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount
                    #region CreateUser
                    var res = false;
                    res = SaveCustomerUser(objCVarCustomers.ID, CustomerUserID, pUserName, pPassword, IsActiveUser);
                    if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
                    {
                        res = SaveCustomerUserTAX(objCVarCustomersTAX.ID, CustomerUserID, pUserName, pPassword, IsActiveUser);

                    }
                    #endregion CreateUser
                }
            } //unique TaxID and CommercialRegister
            return _result;
        }


        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_Customers([FromBody] InsertListFromExcel_Customers InsertListFromExcel_Customers)
        {
            string pReturnedMessage = "";
            Exception checkException = null;
            //int _RowCount = 0;
            int _NumberOfRows = InsertListFromExcel_Customers.pNameList.Split(',').Length;
            //CvwCustomers objCvwCustomers = new CvwCustomers();
            var _ArrName = InsertListFromExcel_Customers.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_Customers.pLocalNameList.Split(',');
            var _ArrAddress = InsertListFromExcel_Customers.pAddressList.Split(',');
            var _ArrEmail = InsertListFromExcel_Customers.pEmailList.Split(',');
            var _ArrPhonesAndFaxes = InsertListFromExcel_Customers.pPhonesAndFaxesList.Split(',');
            var _ArrVATNumber = InsertListFromExcel_Customers.pVATNumberList.Split(',');
            var _ArrCommercialRegistration = InsertListFromExcel_Customers.pCommercialRegistrationList.Split(',');
            //var _ArrCompany = InsertListFromExcel_Customers.pCompanyList.Split(',');
            var _ArrALT = InsertListFromExcel_Customers.pALTList.Split(',');
            var _ArrEUR = InsertListFromExcel_Customers.pEURList.Split(',');
            var _ArrMES = InsertListFromExcel_Customers.pMESList.Split(',');
            var _ArrGLO = InsertListFromExcel_Customers.pGLOList.Split(',');
            var _ArrSAC = InsertListFromExcel_Customers.pSACList.Split(',');

            CDefaults Defaults = new CDefaults();
            int RowCount;
            Defaults.GetListPaging(1, 1, " WHERE 1=1 ", " ID ", out RowCount);
            string UnEditableCompanyName = Defaults.lstCVarDefaults[0].UnEditableCompanyName;
            

            for (int i = 0; i < _NumberOfRows; i++)
            {
                CVarCustomers objCVarCustomers = new CVarCustomers();
                //objCVarCustomers.TareWeight = decimal.Parse(_ArrTareWeight[i]);

                objCVarCustomers.SalesmanID = 0;
                objCVarCustomers.PaymentTermID = 0;
                objCVarCustomers.CurrencyID = Defaults.lstCVarDefaults[0].CurrencyID;
                objCVarCustomers.TaxeTypeID = 0;

                objCVarCustomers.Website = "";
                objCVarCustomers.IsConsignee = false;
                objCVarCustomers.IsShipper = false;
                objCVarCustomers.IsInternalCustomer = false;
                objCVarCustomers.IsConsolidatedInvoice = false;
                objCVarCustomers.BankName = "";
                objCVarCustomers.BankAddress = "";
                objCVarCustomers.Swift = "";
                objCVarCustomers.BankAccountNumber = "";

                objCVarCustomers.BillingDetails = "";
                objCVarCustomers.OriginalCMRbyPost = false;
                objCVarCustomers.ShippingDetails = "";

                objCVarCustomers.Code = 0;
                objCVarCustomers.Name = _ArrName[i];
                objCVarCustomers.LocalName = _ArrLocalName[i];
                objCVarCustomers.Email = _ArrEmail[i];
                objCVarCustomers.IsInactive = false;
                objCVarCustomers.IsDeleted = false;
                objCVarCustomers.Notes = "";
                objCVarCustomers.Address = _ArrAddress[i];
                objCVarCustomers.PhonesAndFaxes = _ArrPhonesAndFaxes[i];
                objCVarCustomers.VATNumber = _ArrVATNumber[i];
                objCVarCustomers.IBANNumber = _ArrCommercialRegistration[i];

                objCVarCustomers.ForeignExporterNo = "0";
                objCVarCustomers.ForeignExporterCountryID = 0;
                objCVarCustomers.AccountID = 0;
                objCVarCustomers.SubAccountID = 0;
                objCVarCustomers.CostCenterID = 0;
                objCVarCustomers.SubAccountGroupID = 0;
                objCVarCustomers.IsShipper = true;
                objCVarCustomers.IsConsignee = true;

                objCVarCustomers.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarCustomers.LockingUserID = 0;

                objCVarCustomers.ManagerRoleID = 5;
                objCVarCustomers.AdministratorRoleID = 1;

                objCVarCustomers.CreatorUserID = objCVarCustomers.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustomers.CreationDate = objCVarCustomers.ModificationDate = DateTime.Now;
                objCVarCustomers.CategoryID = 0;
                objCVarCustomers.crmCode = "";
                objCVarCustomers.AllProductsReserved = false;
                objCVarCustomers.ReservationReason = "";
                objCVarCustomers.MainClientID = 0;
                objCVarCustomers.IsHold = false;
                objCVarCustomers.HoldReason = "";
                objCVarCustomers.Finance365Ref = "";
                objCVarCustomers.OwnerId = 0;
                objCVarCustomers.OwnersIds = "0";
                objCVarCustomers.BranchID = 0;
                objCVarCustomers.DebitorGroupID = 0;
                objCVarCustomers.Mobile = "0";

                if (UnEditableCompanyName == "TOP")
                {
                    if (_ArrALT[i] == "1")
                    {
                        var objCCustomers_ALT = new Models.MasterData.Partners.Customized.CCustomers_DynamicConnection(Helpers.Companies.InternalCompanies.Altun);
                        objCCustomers_ALT.lstCVarCustomers.Add(objCVarCustomers);
                        checkException = objCCustomers_ALT.SaveMethod(objCCustomers_ALT.lstCVarCustomers);
                    }

                    if (_ArrEUR[i] == "1")
                    {
                        Forwarding.MvcApp.Models.MasterData.Partners.CustomizedEUROShipping.CVarCustomers objCVarCustomers_EUR = new Forwarding.MvcApp.Models.MasterData.Partners.CustomizedEUROShipping.CVarCustomers();
                        objCVarCustomers_EUR.SalesmanID = 0;
                        objCVarCustomers_EUR.PaymentTermID = 0;
                        objCVarCustomers_EUR.CurrencyID = Defaults.lstCVarDefaults[0].CurrencyID;
                        objCVarCustomers_EUR.TaxeTypeID = 0;

                        objCVarCustomers_EUR.Code = 0;
                        objCVarCustomers_EUR.Name = _ArrName[i];
                        objCVarCustomers_EUR.LocalName = _ArrLocalName[i];
                        objCVarCustomers_EUR.Website = "";
                        objCVarCustomers_EUR.Email = _ArrEmail[i];
                        objCVarCustomers_EUR.IsConsignee = true;
                        objCVarCustomers_EUR.IsShipper = true;
                        objCVarCustomers_EUR.IsInternalCustomer = false;
                        objCVarCustomers_EUR.IsInactive = false;
                        objCVarCustomers_EUR.IsDeleted = false;
                        objCVarCustomers_EUR.Notes = "";
                        objCVarCustomers_EUR.Address = _ArrAddress[i];
                        objCVarCustomers_EUR.PhonesAndFaxes = _ArrPhonesAndFaxes[i];
                        objCVarCustomers_EUR.VATNumber = _ArrVATNumber[i];
                        objCVarCustomers_EUR.IsConsolidatedInvoice = false;
                        objCVarCustomers_EUR.BankName = "";
                        objCVarCustomers_EUR.BankAddress = "";
                        objCVarCustomers_EUR.Swift = "";
                        objCVarCustomers_EUR.BankAccountNumber = "";
                        objCVarCustomers_EUR.IBANNumber = _ArrCommercialRegistration[i];

                        objCVarCustomers_EUR.BillingDetails = "";
                        objCVarCustomers_EUR.OriginalCMRbyPost = false;
                        objCVarCustomers_EUR.ShippingDetails = "";

                        objCVarCustomers_EUR.SAP_CUSTOMER_CODE = "0";
                        objCVarCustomers_EUR.MSC_CODE = "0";
                        objCVarCustomers_EUR.CUSTOMER_CODE = "0";

                        objCVarCustomers.ForeignExporterNo = "0";
                        objCVarCustomers.ForeignExporterCountryID = 0;
                        objCVarCustomers_EUR.AccountID = 0;
                        objCVarCustomers_EUR.SubAccountID = 0;
                        objCVarCustomers_EUR.CostCenterID = 0;
                        objCVarCustomers_EUR.SubAccountGroupID = 0;

                        objCVarCustomers_EUR.ManagerRoleID = 5;
                        objCVarCustomers_EUR.AdministratorRoleID = 1;

                        objCVarCustomers_EUR.TimeLocked = DateTime.Parse("01-01-1900");
                        objCVarCustomers_EUR.LockingUserID = 0;

                        objCVarCustomers_EUR.CreatorUserID = objCVarCustomers_EUR.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarCustomers_EUR.CreationDate = objCVarCustomers_EUR.ModificationDate = DateTime.Now;
                        objCVarCustomers_EUR.CategoryID = 0;
                       
                        Forwarding.MvcApp.Models.MasterData.Partners.CustomizedEUROShipping.CCustomers objCCustomers_EUR = new Forwarding.MvcApp.Models.MasterData.Partners.CustomizedEUROShipping.CCustomers();
                        objCCustomers_EUR.lstCVarCustomers.Add(objCVarCustomers_EUR);
                        checkException = objCCustomers_EUR.SaveMethod(objCCustomers_EUR.lstCVarCustomers);

                        //var objCCustomers_EUR = new Models.MasterData.Partners.Customized.CCustomers_DynamicConnection(Helpers.Companies.InternalCompanies.EUROShipping);
                        //objCCustomers_EUR.lstCVarCustomers.Add(objCVarCustomers_EUR);
                        //checkException = objCCustomers_EUR.SaveMethod(objCCustomers_EUR.lstCVarCustomers);
                    }

                    if (_ArrMES[i] == "1")
                    {
                        var objCCustomers_MES = new Models.MasterData.Partners.Customized.CCustomers_DynamicConnection(Helpers.Companies.InternalCompanies.MESCO);
                        objCCustomers_MES.lstCVarCustomers.Add(objCVarCustomers);
                        checkException = objCCustomers_MES.SaveMethod(objCCustomers_MES.lstCVarCustomers);
                    }

                    if (_ArrGLO[i] == "1")
                    {
                        var objCCustomers_GLO = new Models.MasterData.Partners.Customized.CCustomers_DynamicConnection(Helpers.Companies.InternalCompanies.GlobeLink);
                        objCCustomers_GLO.lstCVarCustomers.Add(objCVarCustomers);
                        checkException = objCCustomers_GLO.SaveMethod(objCCustomers_GLO.lstCVarCustomers);
                    }

                    if (_ArrSAC[i] == "1")
                    {
                        var objCCustomers_SAC = new Models.MasterData.Partners.Customized.CCustomers_DynamicConnection(Helpers.Companies.InternalCompanies.SACO);
                        objCCustomers_SAC.lstCVarCustomers.Add(objCVarCustomers);
                        checkException = objCCustomers_SAC.SaveMethod(objCCustomers_SAC.lstCVarCustomers);
                    }

                        



                } //EOF if (UnEditableCompanyName == "TOP")
                else //Call own DB
                {
                    CCustomers objCCustomers = new CCustomers();
                    objCCustomers.lstCVarCustomers.Add(objCVarCustomers);
                    checkException = objCCustomers.SaveMethod(objCCustomers.lstCVarCustomers);
                }




                if (checkException != null)
                {
                    pReturnedMessage += "Row " + (i + 1) + " - " + checkException.Message + " \n";
                }
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                pReturnedMessage
            };
        }


        [HttpGet,HttpPost] //House must have only one partner
        public object[] UpdateVATNumber(Int32 pClientIDToUpdateVATNo, string pName, string pVATNumber, Int64 pOperationID
            , Int64 pOperationPartnerID)
        {
            string _ReturnedMessage = "";
            int _RowCount = 0;
            Exception checkException = null;
            CCustomers objCCustomers = new CCustomers();
            CDefaults objCDefaults = new CDefaults();

            objCDefaults.GetListPaging(1, 1, "", "ID", out _RowCount);
            checkException = objCCustomers.GetListPaging(1, 1, "WHERE Name=N'"+pName+ "' or LocalName=N'"+pName+"' or VATNumber=N'" + pVATNumber + "'", "ID", out _RowCount);

            #region Customer does not exist
            if (objCCustomers.lstCVarCustomers.Count == 0)
            {
                #region AddCustomer
                CVarCustomers objCVarCustomers = new CVarCustomers();
                objCVarCustomers.SalesmanID = WebSecurity.CurrentUserId;
                objCVarCustomers.PaymentTermID = 0;
                objCVarCustomers.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                objCVarCustomers.TaxeTypeID = 0;

                objCVarCustomers.Code = 0;
                objCVarCustomers.Name = pName;
                objCVarCustomers.LocalName = pName;
                objCVarCustomers.Website = "0";
                objCVarCustomers.Email = "0";
                objCVarCustomers.IsConsignee = true;
                objCVarCustomers.IsShipper = true;
                objCVarCustomers.IsInternalCustomer = false;
                objCVarCustomers.IsExternal = true;
                objCVarCustomers.IsInactive = false;
                objCVarCustomers.IsDeleted = false;
                objCVarCustomers.Notes = "0";
                objCVarCustomers.Address = "0";
                objCVarCustomers.PhonesAndFaxes = "0";

                objCVarCustomers.VATNumber = pVATNumber;
                objCVarCustomers.IsConsolidatedInvoice = false;
                objCVarCustomers.BankName = "0";
                objCVarCustomers.BankAddress = "0";
                objCVarCustomers.Swift = "0";
                objCVarCustomers.BankAccountNumber = "0";
                objCVarCustomers.IBANNumber = "0";

                objCVarCustomers.ForeignExporterNo = "0";
                objCVarCustomers.ForeignExporterCountryID = 0;
                objCVarCustomers.AccountID = 0;
                objCVarCustomers.SubAccountID = 0;
                objCVarCustomers.CostCenterID = 0;
                objCVarCustomers.SubAccountGroupID = 0;

                objCVarCustomers.ManagerRoleID = 5;
                objCVarCustomers.AdministratorRoleID = 1;
                objCVarCustomers.SalesLeadID = 0;

                objCVarCustomers.BillingDetails = "0";
                objCVarCustomers.ShippingDetails = "0";
                objCVarCustomers.OriginalCMRbyPost = false;

                objCVarCustomers.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarCustomers.LockingUserID = 0;
                objCVarCustomers.crmCode = "";
                objCVarCustomers.AllProductsReserved = false;
                objCVarCustomers.ReservationReason = "";
                objCVarCustomers.MainClientID = 0;
                objCVarCustomers.IsHold = false;
                objCVarCustomers.HoldReason = "";
                objCVarCustomers.Finance365Ref = "";
                objCVarCustomers.OwnerId = 0;
                objCVarCustomers.OwnersIds = "";
                objCVarCustomers.CreatorUserID = objCVarCustomers.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustomers.CreationDate = objCVarCustomers.ModificationDate = DateTime.Now;
                objCVarCustomers.BranchID = 0;
                objCVarCustomers.DebitorGroupID = 0;
                objCVarCustomers.Mobile = "0";

                objCCustomers.lstCVarCustomers.Add(objCVarCustomers);
                checkException = objCCustomers.SaveMethod(objCCustomers.lstCVarCustomers);

                #endregion AddCustomer

                #region Add to OperationPartners
                if (checkException != null)
                    _ReturnedMessage = checkException.Message;
                else {
                    COperationPartners objCOperationPartners = new COperationPartners();
                    checkException = objCOperationPartners.UpdateList("CustomerID=" + objCCustomers.lstCVarCustomers[0].ID + " WHERE ID=" + pOperationPartnerID);
                }
                #endregion Add to OperationPartners

            }
            #endregion Customer does not exist

            #region Customer exists
            else
            {
				#region Add to OperationPartners
				checkException = objCCustomers.UpdateList($"VATNumber='{pVATNumber}' where ID={objCCustomers.lstCVarCustomers[0].ID}");
				COperationPartners objCOperationPartners = new COperationPartners();
                checkException = objCOperationPartners.UpdateList("CustomerID=" + objCCustomers.lstCVarCustomers[0].ID + " WHERE ID=" + pOperationPartnerID);
                #endregion Add to OperationPartners
                _ReturnedMessage = objCCustomers.lstCVarCustomers[0].Name + " is added to invoice.";
            }
            #endregion Customer exists

            return new object[]
            {
                _ReturnedMessage
            };
        }

        [HttpGet, HttpPost]
        public bool InsertCustomerLimit(Int32 pcustomerLimitID, Int32 pCustomerID, Int32 pDefaultCurrencyID, Int32 pLimitID, DateTime pDate)
        {
            bool _result = false;
            int _RowCount = 0;

            _result = true;
            TimeSpan FirsrDayTime = new TimeSpan(19, 0, 0);
            #region insert CustomerCreditLimit
            ///////////Insert In A_Payments//////////////
            CCustomerCreditLimit objCustomerCreditLimit = new CCustomerCreditLimit();
            CVarCustomerCreditLimit ObjCVarCustomerCreditLimit = new CVarCustomerCreditLimit();

            ObjCVarCustomerCreditLimit.ID = pcustomerLimitID;
            ObjCVarCustomerCreditLimit.CurrencyID = pDefaultCurrencyID;
            ObjCVarCustomerCreditLimit.CstomerID = GlobalVariable.CustID; //pClientID;
            ObjCVarCustomerCreditLimit.LimitID = pLimitID;
            ObjCVarCustomerCreditLimit.Date = pDate.Date + FirsrDayTime;



            objCustomerCreditLimit.lstCVarCustomerCreditLimit.Add(ObjCVarCustomerCreditLimit);
            Exception checkException = objCustomerCreditLimit.SaveMethod(objCustomerCreditLimit.lstCVarCustomerCreditLimit);

            if (checkException != null) // an exception is caught in the model
            {
                _result = false;
                //   throw new Exception();
            }
            #region insert log

            #endregion
            CCustomerCreditLimitLog objCustomerCreditLimitLog = new CCustomerCreditLimitLog();
            CVarCustomerCreditLimitLog ObjCVarCustomerCreditLimitLog = new CVarCustomerCreditLimitLog();

            ObjCVarCustomerCreditLimitLog.ID = 0;
            ObjCVarCustomerCreditLimitLog.CustomerID = GlobalVariable.CustID; //pClientID;
            ObjCVarCustomerCreditLimitLog.LimitID = pLimitID;
            ObjCVarCustomerCreditLimitLog.date = pDate.Date + FirsrDayTime; ;

            objCustomerCreditLimitLog.lstCVarCustomerCreditLimitLog.Add(ObjCVarCustomerCreditLimitLog);
            Exception checkException2 = objCustomerCreditLimitLog.SaveMethod(objCustomerCreditLimitLog.lstCVarCustomerCreditLimitLog);
            #endregion


            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pCustomersIDs)
        {
            Exception checkException = null;
            bool _result = false;
            CCustomers objCCustomers = new CCustomers();
            CCustomersTAX objCCustomersTAX = new CCustomersTAX();

            CCustomerCreditLimit objCustomerCreditLimit = new CCustomerCreditLimit();
            CCustomerCreditLimitLog objCustomerCreditLimitLog = new CCustomerCreditLimitLog();
            CSL_CustomerRegions objCustomerSL_Regions = new CSL_CustomerRegions();
            CSL_CustomerSalesMan objCustomerSL_SalesMan = new CSL_CustomerSalesMan();

            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pCustomersIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_Customers.Delete_Fleet_Forwarding_Customer(Convert.ToInt32(currentID),WebSecurity.CurrentUserId);
                    if (checkException != null)
                    {
                        _result = false;
                        break;
                    }
                }
                if (checkException == null)
                    _result = true;
            }
            else
            { 

                if (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI")
                {
                    foreach (var currentID in pCustomersIDs.Split(','))
                    {

                        CCustomersTAX objCCustomersTAX2 = new CCustomersTAX();
                        objCCustomers.GetList("WHERE ID=" + currentID);
                        objCCustomersTAX2.GetList("WHERE Name=N'" + objCCustomers.lstCVarCustomers[0].Name + "'");
                        if (objCCustomersTAX2.lstCVarCustomersTAX.Count > 0)
                        {
                            objCCustomersTAX.lstDeletedCPKCustomersTAX.Add(new CPKCustomersTAX() { ID = objCCustomersTAX2.lstCVarCustomersTAX[0].ID });

                        }


                    }
                    checkException = objCCustomersTAX.DeleteItem(objCCustomersTAX.lstDeletedCPKCustomersTAX);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                }
                foreach (var currentID in pCustomersIDs.Split(','))
                {
                    objCCustomers.lstDeletedCPKCustomers.Add(new CPKCustomers() { ID = Int32.Parse(currentID.Trim()) });
                    var pDeleteClauseDetailes = "";
                    pDeleteClauseDetailes = "WHERE CustomerID In(" + Int32.Parse(currentID.Trim()) + ")";

                    var checkException2 = objCustomerCreditLimitLog.DeleteList(pDeleteClauseDetailes);
                    if (checkException2 != null) // an exception is caught in the model
                    {
                        if (checkException2.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }
                    //delete objCustomerCreditLimit
                    var pDeleteClauseDetailes2 = "";
                    pDeleteClauseDetailes2 = "WHERE CstomerID In(" + Int32.Parse(currentID.Trim()) + ")";
                    checkException2 = objCustomerCreditLimit.DeleteList(pDeleteClauseDetailes2);
                    if (checkException2 != null) // an exception is caught in the model
                    {
                        if (checkException2.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                    //delete objCustomerCreditLimit
                    var pDeleteClauseSL_Regions = "";
                    pDeleteClauseSL_Regions = "WHERE ClientID In(" + Int32.Parse(currentID.Trim()) + ")";
                    checkException2 = objCustomerSL_Regions.DeleteList(pDeleteClauseSL_Regions);
                    if (checkException2 != null) // an exception is caught in the model
                    {
                        if (checkException2.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                    //delete objCustomerCreditLimit
                    var pDeleteClauseSL_SalesMan = "";
                    pDeleteClauseSL_SalesMan = "WHERE ClientID In(" + Int32.Parse(currentID.Trim()) + ")";
                    checkException2 = objCustomerSL_SalesMan.DeleteList(pDeleteClauseSL_SalesMan);
                    if (checkException2 != null) // an exception is caught in the model
                    {
                        if (checkException2.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                }

                checkException = objCCustomers.DeleteItem(objCCustomers.lstDeletedCPKCustomers);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }

                else
                    _result = true;
        }
            
 
            return _result;
            //bool _result = false;
            //CCustomers objCCustomers = new CCustomers();
            //foreach (var currentID in pCustomersIDs.Split(','))
            //{
            //    objCCustomers.lstDeletedCPKCustomers.Add(new CPKCustomers() { ID = Int32.Parse(currentID.Trim()) });
            //}

            //Exception checkException = objCCustomers.DeleteItem(objCCustomers.lstDeletedCPKCustomers);
            //if (checkException != null) // an exception is caught in the model
            //{
            //    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
            //        _result = false;
            //}
            //else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
            //    _result = true;
            //return _result;
        }
        [HttpGet, HttpPost]
        public int CheckIfSubAccountExistInAccounting(String pSubAccountIDs)
        {
            int NumberOfRecords = 0;
            if (pSubAccountIDs != "")
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                string NumberOfA_JVDetails = objCCustomizedDBCall.CallStringFunction("SELECT COUNT(*) FROM A_JVDetails WHERE SubAccount_ID IN ("+ pSubAccountIDs + ")");
                string NumberOfA_VoucherDetails = objCCustomizedDBCall.CallStringFunction("SELECT COUNT(*) FROM A_VoucherDetails WHERE SubAccount_ID IN (" + pSubAccountIDs + ")");
                NumberOfA_JVDetails = NumberOfA_JVDetails == "" ? "0" : NumberOfA_JVDetails;
                NumberOfA_VoucherDetails = NumberOfA_VoucherDetails == "" ? "0" : NumberOfA_VoucherDetails;
                NumberOfRecords = int.Parse(NumberOfA_JVDetails) + int.Parse(NumberOfA_VoucherDetails);
            }

            return NumberOfRecords;
            
        }

        [HttpGet, HttpPost]
        public object[] CRM_TransferToCustomers(Int32 pCRMSalesLeadID, Int64 pQuotationID)
        {
            Exception checkException = new Exception();
            string _MessageReturned = "";
            int _RowCount = 0;
            CCRM_Clients objCCRM_Clients = new CCRM_Clients();
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
            CVarCustomers objCVarCustomers = new CVarCustomers();
            CDefaults objCDefaults = new CDefaults();
            Int64 pContactID = 0;
            string pContactName = "";
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            checkException = objCCRM_Clients.GetListPaging(999999, 1, "WHERE ID=" + pCRMSalesLeadID, "ID", out _RowCount);
            checkException = objCCRM_ContactPersons.GetListPaging(999999, 1, "WHERE CRM_ClientsID=" + pCRMSalesLeadID, "ID", out _RowCount);

            if (objCCRM_Clients.lstCVarCRM_Clients[0].IsAddedToCustomer)
                _MessageReturned = "This sales lead already added to customers.";
            else
            {
                #region AddCustomerHeader
                objCVarCustomers.SalesmanID = objCCRM_Clients.lstCVarCRM_Clients[0].SalesmanID;
                objCVarCustomers.PaymentTermID = objCCRM_Clients.lstCVarCRM_Clients[0].PaymentTermID;
                objCVarCustomers.CurrencyID = objCCRM_Clients.lstCVarCRM_Clients[0].CurrencyID;
                objCVarCustomers.TaxeTypeID = 0;

                objCVarCustomers.Code = 0;
                objCVarCustomers.Name = objCCRM_Clients.lstCVarCRM_Clients[0].Name.Trim().ToUpper();
                objCVarCustomers.LocalName = objCCRM_Clients.lstCVarCRM_Clients[0].LocalName.Trim().ToUpper();
                objCVarCustomers.Website = objCCRM_Clients.lstCVarCRM_Clients[0].WebSite.Trim().ToUpper();
                objCVarCustomers.Email = objCCRM_Clients.lstCVarCRM_Clients[0].Email.Trim().ToUpper();
                objCVarCustomers.IsConsignee = true;
                objCVarCustomers.IsShipper = true;
                objCVarCustomers.IsInternalCustomer = false;
                objCVarCustomers.IsInactive = false;
                objCVarCustomers.IsDeleted = false;
                objCVarCustomers.Notes = objCCRM_Clients.lstCVarCRM_Clients[0].Notes.Trim().ToUpper();
                objCVarCustomers.Address = objCCRM_Clients.lstCVarCRM_Clients[0].Address.Trim().ToUpper();
                objCVarCustomers.PhonesAndFaxes = (objCCRM_Clients.lstCVarCRM_Clients[0].Phone1 == "0" ? objCCRM_Clients.lstCVarCRM_Clients[0].Phone1 : "")
                     + (objCCRM_Clients.lstCVarCRM_Clients[0].Phone2 == "0" ? ("-" + objCCRM_Clients.lstCVarCRM_Clients[0].Phone2) : "")
                     + (objCCRM_Clients.lstCVarCRM_Clients[0].CellPhone == "0" ? ("-" + objCCRM_Clients.lstCVarCRM_Clients[0].CellPhone) : "");

                objCVarCustomers.VATNumber = "0";
                objCVarCustomers.IsConsolidatedInvoice = false;
                objCVarCustomers.BankName = "0";
                objCVarCustomers.BankAddress = "0";
                objCVarCustomers.Swift = "0";
                objCVarCustomers.BankAccountNumber = "0";
                objCVarCustomers.IBANNumber = "0";

                objCVarCustomers.ForeignExporterNo = "0";
                objCVarCustomers.ForeignExporterCountryID = 0;
                objCVarCustomers.AccountID = 0;
                objCVarCustomers.SubAccountID = 0;
                objCVarCustomers.CostCenterID = 0;
                objCVarCustomers.SubAccountGroupID = 0;

                objCVarCustomers.ManagerRoleID = 5;
                objCVarCustomers.AdministratorRoleID = 1;
                objCVarCustomers.SalesLeadID = pCRMSalesLeadID;

                objCVarCustomers.BillingDetails = "0";
                objCVarCustomers.ShippingDetails = "0";
                objCVarCustomers.OriginalCMRbyPost = false;
                objCVarCustomers.crmCode = "";
                objCVarCustomers.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarCustomers.LockingUserID = 0;
                objCVarCustomers.AllProductsReserved = false;
                objCVarCustomers.ReservationReason = "";
                objCVarCustomers.MainClientID = 0;
                objCVarCustomers.IsHold = false;
                objCVarCustomers.HoldReason = "";
                objCVarCustomers.Finance365Ref = "";
                objCVarCustomers.MainClientID = 0;
                objCVarCustomers.OwnerId = 0;
                objCVarCustomers.OwnersIds = "";
                objCVarCustomers.CreatorUserID = objCVarCustomers.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustomers.CreationDate = objCVarCustomers.ModificationDate = DateTime.Now;
                objCVarCustomers.BranchID = 0;
                objCVarCustomers.DebitorGroupID = 0;
                objCVarCustomers.Mobile = "0";

                CCustomers objCCustomers = new CCustomers();
                objCCustomers.lstCVarCustomers.Add(objCVarCustomers);
                checkException = objCCustomers.SaveMethod(objCCustomers.lstCVarCustomers);
                //**************************************************************************************
                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "TMP")
                {

                    CvwUsers objCvwUser_sender = new CvwUsers();
                    objCvwUser_sender.GetListPaging(999999, 1, "WHERE DepartmentID = 1", "ID", out _RowCount);
                    string _Subject = "";
                    string _Body = "";
                    _Body = "<b>Sender : " + objCvwUser_sender.lstCVarvwUsers[0].Email_DisplayName + "</b><br>";
                    _Subject = "Sales Lead Details";
                    _Body = "Sales Lead " + objCVarCustomers.Name + " is Transfared to an actual Client<br />";
                    _Body += "Please Complete his Personal Data . <br />";
                    CVarEmail objCVarEmail = new CVarEmail();
                    CEmail objCEmail = new CEmail();
                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                    objCVarEmail.Subject = _Subject;
                    objCVarEmail.Body = _Body;
                    objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                    objCVarEmail.SendingDate = DateTime.Now;
                    objCEmail.lstCVarEmail.Add(objCVarEmail);
                    checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                    if (checkException == null)
                    {
                        foreach (var i in objCvwUser_sender.lstCVarvwUsers)
                        {
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                            objCVarEmailReceiver.ReceiverUserID = i.ID;
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCVarEmailReceiver.IsAlarm = true;

                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                        }
                        checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                    }
                }
                    //*************************************************************************************
                    if (checkException == null)
                {
                    objCCRM_Clients.UpdateList("IsAddedToCustomer=1 WHERE ID=" + pCRMSalesLeadID);
                }
                else
                    _MessageReturned = checkException.Message;
                #endregion AddCustomerHeader
                #region Contacts
                if (objCCRM_ContactPersons.lstCVarCRM_ContactPersons.Count > 0 && _MessageReturned == "")
                {
                    for (int i = 0; i < objCCRM_ContactPersons.lstCVarCRM_ContactPersons.Count; i++)
                    {
                        CVarContacts objCVarContacts = new CVarContacts();
                        objCVarContacts.PartnerTypeID = 1;
                        objCVarContacts.PartnerID = objCVarCustomers.ID;

                        objCVarContacts.Name = objCCRM_ContactPersons.lstCVarCRM_ContactPersons[i].NameEn.Trim().ToUpper();
                        objCVarContacts.LocalName = objCCRM_ContactPersons.lstCVarCRM_ContactPersons[i].NameAr.Trim().ToUpper();
                        objCVarContacts.Email = objCCRM_ContactPersons.lstCVarCRM_ContactPersons[i].Email.Trim().ToUpper();
                        objCVarContacts.Phone1 = objCCRM_ContactPersons.lstCVarCRM_ContactPersons[i].Telephone.Trim().ToUpper();
                        objCVarContacts.Phone2 = objCCRM_ContactPersons.lstCVarCRM_ContactPersons[i].PersonalPhone.Trim().ToUpper();
                        objCVarContacts.Mobile1 = objCCRM_ContactPersons.lstCVarCRM_ContactPersons[i].CellPhone.Trim().ToUpper();
                        objCVarContacts.Mobile2 = "";
                        objCVarContacts.Fax = "";
                        objCVarContacts.Notes = "";
                        objCVarContacts.IsInactive = false;

                        objCVarContacts.TimeLocked = DateTime.Parse("01-01-1900");

                        objCVarContacts.CreatorUserID = objCVarContacts.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarContacts.CreationDate = objCVarContacts.ModificationDate = DateTime.Now;

                        CContacts objCContacts = new CContacts();
                        objCContacts.lstCVarContacts.Add(objCVarContacts);
                        checkException = objCContacts.SaveMethod(objCContacts.lstCVarContacts);
                    }
                }
                #endregion Contacts
                #region update Quotation with Customer
                if (pQuotationID > 0)
                {
                    CQuotations objCQuotations = new CQuotations();
                    CContacts objCContacts = new CContacts();
                    objCContacts.GetList("WHERE PartnerTypeID=1 AND PartnerID=" + objCVarCustomers.ID);
                    if (objCContacts.lstCVarContacts.Count > 0)
                    {
                        pContactID = objCContacts.lstCVarContacts[0].ID;
                        pContactName = objCContacts.lstCVarContacts[0].Name;
                    }
                    objCQuotations.GetListPaging(999999, 1, "WHERE ID=" + pQuotationID, "ID", out _RowCount);
                    if (objCQuotations.lstCVarQuotations[0].DirectionType == 1)
                        objCQuotations.UpdateList("ConsigneeID=" + objCVarCustomers.ID
                            + ",ConsigneeContactID=" + (pContactID == 0 ? "null" : pContactID.ToString())
                            + " WHERE ID=" + pQuotationID);
                    else
                        objCQuotations.UpdateList("ShipperID=" + objCVarCustomers.ID
                            + ",ShipperContactID=" + (pContactID == 0 ? "null" : pContactID.ToString())
                            + " WHERE ID=" + pQuotationID);
                }
                #endregion update Quotation with Customer
            }
            //Update NewCustomerCreationDate in CRM_Clients after converting to a new customer
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            objCCRM_Clients.UpdateList($"SET NewCustomerCreationDate = '{DateTime.Now.ToString("yyyy-dd-MM")}' WHERE ID = {pCRMSalesLeadID}");
            //objCCustomizedDBCall.ExecuteQuery_ListOfObjects($" UPDATE CRM_Clients SET NewCustomerCreationDate = '{DateTime.Now.ToString("yyyy-dd-MM")}' WHERE ID = {pCRMSalesLeadID}", typeof(CVarCRM_Clients)).Cast<CVarCRM_Clients>().ToList();

            return new object[]
            {
                _MessageReturned //pData[0]
                , objCVarCustomers.ID //pData[1]
                , pContactID //pData[2]
                , pContactName //pData[3]
            };
        }


        [HttpGet, HttpPost]
        public object[] CreateSalesLeadFromCustomers(string pCustomersIDs)
        {

            string _MessageReturned = "";
            int _RowCount = 0;

            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();

            CVarCustomers objCVarCustomers = new CVarCustomers();
            CCRM_Clients cCRM_Clients = new CCRM_Clients();
            CDefaults objCDefaults = new CDefaults();
            CCustomers cCustomers = new CCustomers();


            cCustomers.GetList("Where ID IN(" + pCustomersIDs + ") AND IsNull( SalesLeadID , 0 ) = 0");

            var _Customers = cCustomers.lstCVarCustomers;

            if (_Customers != null && _Customers.Count > 0)
            {

                foreach (var customer in _Customers)
                {
                    Exception checkException = new Exception();
                    CVarCRM_Clients cVarCRM_Clients = new CVarCRM_Clients();

                    cVarCRM_Clients.Name = customer.Name.ToUpper();
                    cVarCRM_Clients.LocalName = customer.LocalName.ToUpper();
                    cVarCRM_Clients.Code = customer.Code;
                    cVarCRM_Clients.CountryID = 0;
                    cVarCRM_Clients.Phone1 = customer.PhonesAndFaxes;
                    cVarCRM_Clients.Phone2 = "0";
                    cVarCRM_Clients.CellPhone = "0";
                    cVarCRM_Clients.Fax = customer.PhonesAndFaxes;
                    cVarCRM_Clients.Email = customer.Email;
                    cVarCRM_Clients.SourceID = 0;
                    cVarCRM_Clients.SourceDate = DateTime.Parse("01-01-1900");
                    cVarCRM_Clients.SourceDescription = "0";
                    cVarCRM_Clients.LostReason = "0";
                    cVarCRM_Clients.WebSite = customer.Website;
                    cVarCRM_Clients.IsIsoTanks = false;
                    cVarCRM_Clients.IsFlexiTanks = false;
                    if (customer.SalesmanID == 0)
                    {
                        _MessageReturned = $"This Customer [{customer.Name.ToUpper()}] don't have salesman. Please Add Salesman to this customer in Masterdata/Customers";
                        break;
                    }
                    cVarCRM_Clients.SalesmanID = customer.SalesmanID;
                    cVarCRM_Clients.CreatorUserID = WebSecurity.CurrentUserId;
                    cVarCRM_Clients.CreationDate = DateTime.Now;
                    cVarCRM_Clients.Notes = customer.Notes;
                    cVarCRM_Clients.CompanyView = 20;
                    cVarCRM_Clients.CompanySize = 20;
                    cVarCRM_Clients.CompanyType = 20;
                    cVarCRM_Clients.ClientStatus = 20;
                    cVarCRM_Clients.ModificationUserID = WebSecurity.CurrentUserId;
                    cVarCRM_Clients.ModificationDate = DateTime.Now;
                    cVarCRM_Clients.EstablishDate = DateTime.Now;
                    cVarCRM_Clients.Address = customer.Address;
                    cVarCRM_Clients.PortID = 0;
                    cVarCRM_Clients.IsAddedToCustomer = true;
                    cVarCRM_Clients.CommodityID = 0;
                    cVarCRM_Clients.ActivityID = 0;
                    cVarCRM_Clients.CurrencyID = customer.CurrencyID;
                    cVarCRM_Clients.Revenue = 0;
                    cVarCRM_Clients.Cost = 0;
                    cVarCRM_Clients.GrossProfit = 0;
                    cVarCRM_Clients.ProfitMargin = 0;
                    cVarCRM_Clients.StartingDate = DateTime.Now;
                    cVarCRM_Clients.ClosingExpectedDate = DateTime.Now;
                    cVarCRM_Clients.TradeLane = "0";
                    cVarCRM_Clients.ContainerTypeID = 0;
                    cVarCRM_Clients.BusinessVolume = 0;
                    cVarCRM_Clients.Competitors = "0";
                    cVarCRM_Clients.PaymentTermID = customer.PaymentTermID;
                    cVarCRM_Clients.PipeLineStageID = 0;
                    cVarCRM_Clients.Comment = customer.Notes;
                    cVarCRM_Clients.IndustryTypeID = 0;

                    cVarCRM_Clients.LostReason = "0";
                    cVarCRM_Clients.EndUserName = "0";
                    cVarCRM_Clients.CustomerID = customer.ID;
                    cVarCRM_Clients.SourceKeyPerson = "0";
                    cVarCRM_Clients.IsFromCustomer = true;
                    cVarCRM_Clients.DealCreationDate = DateTime.Parse("01/01/1900");
                    cVarCRM_Clients.OppurtunityCreationDate = DateTime.Parse("01/01/1900");
                    cVarCRM_Clients.NewCustomerCreationDate = DateTime.Parse("01/01/1900");

                    CCRM_Clients objCCRM_Clients = new CCRM_Clients();
                    objCCRM_Clients.lstCVarCRM_Clients.Add(cVarCRM_Clients);
                    checkException = objCCRM_Clients.SaveMethod(objCCRM_Clients.lstCVarCRM_Clients);

                    if (checkException == null)
                    {
                        var SalesLeadID = cVarCRM_Clients.ID;
                        cCustomers.UpdateList("SalesLeadID=" + SalesLeadID + " WHERE ID=" + customer.ID);
                    }
                    else
                        _MessageReturned += "There is Problem in [" + customer.Name + "] " + checkException.Message;




                }



            }
            else
            {
                _MessageReturned = "Customer Exists in Saleslead Already";
            }

            return new object[]
            {
                _MessageReturned //pData[0]
            };
        }
        
        #region Automail
        [HttpGet, HttpPost]
        public object[] SetAutomailPeriod([FromBody] SetAutomailPeriod setAutomailPeriod)
        {
            var _result = false;
            var Message = "";
            var EmailOption = "";
            if(setAutomailPeriod.pPeriodType == "0")
            {
                setAutomailPeriod.pPeriodType = "NULL";
            }
            if (setAutomailPeriod.pReportName == "Invoice")
            {
                EmailOption = "EmailOptionInvoicesReport = " + setAutomailPeriod.pPeriodType + "";
            }
            else if (setAutomailPeriod.pReportName == "Aging")
            {
                EmailOption = "EmailOptionAging = " + setAutomailPeriod.pPeriodType + "";
               
            }
            else if (setAutomailPeriod.pReportName == "AccountStatement")
            {
                EmailOption = "EmailOptionPartnerStatement = " + setAutomailPeriod.pPeriodType + "";
            }
            
            CCustomers cCustomers = new CCustomers();
            var ex = cCustomers.UpdateList( "" + EmailOption + " WHERE ID IN(" + setAutomailPeriod.pCustomersIDs + ")" );

            if (ex != null)
            {
                Message = ex.Message;
                _result = false;
            }
            else
                _result = true;

            return new object[]
            {
                  _result
                , Message

            };
        }



        [HttpGet, HttpPost]
        public Object[] LoadAutomailCustomers(string pCustomerName , string pPeriodType)
        {

            CCustomers objCCustomers = new CCustomers();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            var WhereClause = "";
            var PeriodType = int.Parse(pPeriodType);
            //*************************************** General Conditions ****************************************************************************************
            var GeneralCondition = "WHERE (Name LIKE N'%" + pCustomerName + "%' OR LocalName LIKE N'%" + pCustomerName + "%')";
            //*************************************** Email Period Options ***************************************************************************************
            var EmailOption  = " isnull(EmailOptionInvoicesReport, 0) = " + pPeriodType + "";
                EmailOption += " OR isnull(EmailOptionAging, 0) = " + pPeriodType + "";
                EmailOption += " OR isnull(EmailOptionPartnerStatement, 0) = " + pPeriodType + "";
            //**************************************** Where Clause , Data Loading **************************************************************************************************
             WhereClause = GeneralCondition + " and (" + (pPeriodType == "-1" ? " 1 = 1 )" : "( " + EmailOption + "))");
             objCCustomers.GetList(WhereClause);
            //************************************************************************************************************************************************************************************


            var InvoiceReport_Customers = new List<CVarCustomers>();
            var AgingReport_Customers = new List<CVarCustomers>();
            var PartnerStatementReport_Customers = new List<CVarCustomers>();
            if (pPeriodType == "-1")
            {
                InvoiceReport_Customers = AgingReport_Customers = PartnerStatementReport_Customers = objCCustomers.lstCVarCustomers  ;
            }
            else
            {
                if (objCCustomers.lstCVarCustomers != null && objCCustomers.lstCVarCustomers.Count > 0)
                {
                    InvoiceReport_Customers = objCCustomers.lstCVarCustomers.Where(x => x.EmailOptionInvoicesReport == PeriodType).ToList();
                    AgingReport_Customers = objCCustomers.lstCVarCustomers.Where(x => x.EmailOptionAging == PeriodType).ToList();
                    PartnerStatementReport_Customers = objCCustomers.lstCVarCustomers.Where(x => x.EmailOptionPartnerStatement == PeriodType).ToList();
                }

            }



            return new Object[] {
                serializer.Serialize(InvoiceReport_Customers) ,  serializer.Serialize(AgingReport_Customers) , serializer.Serialize(PartnerStatementReport_Customers)


            };
        }


        #endregion Automail


        #region CustomerUser

        public bool SaveCustomerUser(int pCustomerID, int pUserID, string pUsername, string pPassword, bool IsActiveUser)
        {
            var res = false;
            //Create New Customer User // For New Or Updated User
            if (pUserID == 0 && pUsername != null && pUsername.Trim() != "" && pUsername.Trim() != "0")
            {
                res = AddCustomerUser(pCustomerID, pUserID, pUsername, pPassword, IsActiveUser);
            }
            //Update Customer User
            else if (pUserID != 0 && pPassword != null && pPassword.Trim() != "" && pPassword.Trim() != "0")
            {

                CUsers cUsers = new CUsers();
                cUsers.UpdateList(" IsInactive = " + ((!IsActiveUser) == true ? 1 : 0) + " , Username = '" + pUsername + "' where ID = " + pUserID + " ");
                // cUsers.lstCVarUsers[0].Username

                res = WebSecurity.ResetPassword(WebSecurity.GeneratePasswordResetToken(pUsername), pPassword);
            }
            else if (pUserID != 0)
            {

                CUsers cUsers = new CUsers();
                cUsers.UpdateList("IsInactive = " + ((!IsActiveUser) == true ? 1 : 0) + " , Username = '" + pUsername + "' where ID = " + pUserID + " ");
                res = true;
            }



            return false;
        }
        public bool SaveCustomerUserTAX(int pCustomerID, int pUserID, string pUsername, string pPassword, bool IsActiveUser)
        {
            var res = false;
            //Create New Customer User // For New Or Updated User
            if (pUserID == 0 && pUsername != null && pUsername.Trim() != "" && pUsername.Trim() != "0")
            {
                res = AddCustomerUser(pCustomerID, pUserID, pUsername, pPassword, IsActiveUser);
            }
            //Update Customer User
            else if (pUserID != 0 && pPassword != null && pPassword.Trim() != "" && pPassword.Trim() != "0")
            {

                CUsers cUsers = new CUsers();
                cUsers.UpdateListTAX(" IsInactive = " + ((!IsActiveUser) == true ? 1 : 0) + " , Username = '" + pUsername + "' where ID = " + pUserID + " ");
                // cUsers.lstCVarUsers[0].Username

                res = WebSecurity.ResetPassword(WebSecurity.GeneratePasswordResetToken(pUsername), pPassword);
            }
            else if (pUserID != 0)
            {

                CUsers cUsers = new CUsers();
                cUsers.UpdateListTAX("IsInactive = " + ((!IsActiveUser) == true ? 1 : 0) + " , Username = '" + pUsername + "' where ID = " + pUserID + " ");
                res = true;
            }



            return false;
        }



        public bool AddCustomerUser(int pCustomerID, int pUserID, string pUsername, string pPassword, bool IsActiveUser)
        {
            var res = false;
            try
            {
                WebSecurity.CreateUserAndAccount(pUsername, pPassword
           , new
           {
               Name = pUsername,
               LocalName = pUsername,
               //BranchID = null,
               //DepartmentID = 0,
               Email = "0",
               Phone1 = "0",
               Phone2 = "0",
               Mobile1 = "0",
               Address = "0",
               Password = "",
               IsInactive = !IsActiveUser,
               Notes = "",
               IsSalesman = false,
               IsAccessAllCharges = false,
               IsHideOthersRecords = true,
               ExpirationDate = DateTime.Parse("01-01-2050"),
               CreatorUserID = WebSecurity.CurrentUserId,
               CreationDate = DateTime.Now,
               ModificatorUserID = WebSecurity.CurrentUserId,
               ModificationDate = DateTime.Now,
               HeartBeatDate = DateTime.Parse("01-01-2015"),
               Email_DisplayName = pUsername,
               Email_Footer = "",
               Email_Header = "",
               Email_Host = "",
               Email_IsSSL = false,
               Email_Password = "0",
               Email_Port = 0,
               CustomerID = pCustomerID //---- 10/10/2020

           }, false);
            }
            catch (Exception ex)
            {
                var a = ex.Message;
            }

            int _ID = WebSecurity.GetUserId(pUsername);


            if (_ID > 0)
                return true;
            else
                return false;



        }


        #endregion CustomerUser

        [HttpGet, HttpPost] 
        public object[] HoldUnHoldCustomer(Int32 pCustomerID, string pIsHold, string pHoldReason)
        {
            string _ReturnedMessage = "";

            Exception checkException = null;
            CCustomers objCCustomers = new CCustomers();
            bool IsHold = Convert.ToBoolean(pIsHold);
            string UpdateStr = "";

            pHoldReason = pHoldReason == null ? "" : pHoldReason;

            if (IsHold)
            {
                UpdateStr = " IsHold = 0,HoldReason='" + pHoldReason.Trim() + "' WHERE ID=" + pCustomerID;
            }
            else
            {
                UpdateStr = " IsHold = 1,HoldReason='" + pHoldReason.Trim() + "' WHERE ID=" + pCustomerID;
            }
            checkException = objCCustomers.UpdateList(UpdateStr);

            if (checkException == null)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_HoldTrans_Log("SP_HoldTransactionLog", WebSecurity.CurrentUserId, "Customer", pCustomerID, (IsHold ? "UH" : "H"), pHoldReason);
            }
            else
            {
                _ReturnedMessage = "Error occurred while changing status";
            }

            return new object[]
            {
                _ReturnedMessage
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllCustomersForSlReadyCustomers(bool pDummy ,string pWhereClauseWithMinimalColumns, string pOrderBy)
        {
            int _RowCount = 0;
            CUsers objCUsers = new CUsers();
            objCUsers.GetListPaging(1, 1, "WHERE  ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);


            if (objCUsers.lstCVarUsers[0].IsHideOthersRecords && objCUsers.lstCVarUsers[0].IsSalesman)
                pWhereClauseWithMinimalColumns += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "USC")
            {
                pWhereClauseWithMinimalColumns += " AND ID IN (Select ID from Customers where SubAccountID is not null)";
            }

            CvwCustomersWithMinimalColumns objCCustomers = new CvwCustomersWithMinimalColumns();
            objCCustomers.GetListPaging(99999, 1, pWhereClauseWithMinimalColumns, pOrderBy, out _RowCount);

            var CustomersMinified = objCCustomers.lstCVarvwCustomersWithMinimalColumns.Select(c => new
            {
                ID = c.ID,
                Name = c.Name
            }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(CustomersMinified)
            };
        }

        [HttpGet]
        public object[] LoadCustomersModalComboBoxes()
        {
            CBranches objCBranches = new CBranches();
            objCBranches.GetList("WHERE 1=1");

            CDebtorGroup objCDebtorGroup = new CDebtorGroup();
            objCDebtorGroup.GetList("WHERE 1=1");

            var serializer = new JavaScriptSerializer();

            return new object[]
            {
                serializer.Serialize(objCBranches.lstCVarBranches), //pData[0]
                serializer.Serialize(objCDebtorGroup.lstCVarDebtorGroup) //pData[1]
            };
        }



        
        [HttpGet]
        public int RefreshInvoicesVATNumber()
        {
            int count = 0;
            SqlTransaction tr = null;

            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();

                Com.Parameters.Add(new SqlParameter("@Count", SqlDbType.Int, 1000, ParameterDirection.Output, false, 12, 3, "ID", DataRowVersion.Default, null));

                Com.CommandText = "[dbo].RefreshInvoicesVATNumber";

                tr = Con.BeginTransaction(IsolationLevel.Serializable);
                Com.CommandType = CommandType.StoredProcedure;


                Com.Transaction = tr;
                Com.Connection = Con;
                Com.ExecuteNonQuery();
                tr.Commit();

                if (Com.Parameters["@Count"].Value != DBNull.Value)
                {
                    count = Convert.ToInt32(Com.Parameters["@Count"].Value);
                }
            }
            catch (Exception ex)
            {
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return count;
        }
    }

    public class InsertListFromExcel_Customers
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pAddressList { get; set; }
        public string pEmailList { get; set; }
        public string pPhonesAndFaxesList { get; set; }
        public string pVATNumberList { get; set; }
        public string pCommercialRegistrationList { get; set; }
        //public string pCompanyList { get; set; }
        public string pALTList { get; set; }
        public string pEURList { get; set; }
        public string pMESList { get; set; }
        public string pGLOList { get; set; }
        public string pSACList { get; set; }
    }

    public class SetAutomailPeriod
    {
        //string pReportName, string pPeriodType, string pCustomersIDs
        public string pReportName { get; set; }
        public string pPeriodType { get; set; }
        public string pCustomersIDs { get; set; }
    }
}
