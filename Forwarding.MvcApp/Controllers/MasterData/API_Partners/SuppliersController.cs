//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
using Forwarding.MvcApp.Controllers.DynamicsCRM;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class SuppliersController : ApiController
    {
        //[Route("/api/Suppliers/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CSuppliers objCSuppliers = new CSuppliers();
            objCSuppliers.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarSuppliers) };
        }

        // [Route("/api/Suppliers/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwSuppliers objCvwSuppliers = new CvwSuppliers();
            //objCvwSuppliers.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwSuppliers.lstCVarvwSuppliers.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            //+ " OR ISOCode LIKE '%" + pSearchKey + "%' "
            //+ " OR PrintAs LIKE '%" + pSearchKey + "%' "
            //+ " OR CSizeCode LIKE '%" + pSearchKey + "%' "
            //+ " OR CTypeCode LIKE '%" + pSearchKey + "%' ";

            objCvwSuppliers.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwSuppliers.lstCVarvwSuppliers), _RowCount };
        }
		[HttpGet, HttpPost]
		public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
		{
			CvwSuppliers objCvwSuppliers = new CvwSuppliers();
			Int32 _RowCount = 0;
			objCvwSuppliers.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);

			return new Object[] { new JavaScriptSerializer().Serialize(objCvwSuppliers.lstCVarvwSuppliers), _RowCount };
		}
		// [Route("/api/Suppliers/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
		[HttpGet, HttpPost]
        public Object[] Insert(Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName, string pWebsite, bool pIsInactive, bool pisAuthority, string pNotes,string pFinance365Ref, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false, int pBranchID = 0, int pSalesmanID = 0, int pCreditorGroupID = 0, int pCountryID = 0, int pCityID = 0, string pAddressLine1 = "", string pAddressLine2 = "", string pZipCode = "", string pState = "", string pPhonesAndFaxes = "0")
        {
            bool _result = false;
            int _RowCount2 = 0;
            bool crmResult = false;
            string crmMessage = "";

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CVarSuppliers objCVarSuppliers = new CVarSuppliers();

            objCVarSuppliers.PaymentTermID = pPaymentTermID;
            objCVarSuppliers.CurrencyID = pCurrencyID;
            objCVarSuppliers.TaxeTypeID = pTaxeTypeID;

            objCVarSuppliers.Code = pCode;
            objCVarSuppliers.Name = pName.Trim().ToUpper();
            objCVarSuppliers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarSuppliers.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarSuppliers.IsInactive = pIsInactive;
            objCVarSuppliers.isAuthority = pisAuthority;


            objCVarSuppliers.IsDeleted = pIsDeleted;
            objCVarSuppliers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarSuppliers.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarSuppliers.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarSuppliers.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarSuppliers.TaxExemptToDate = pTaxExemptToDate;
			objCVarSuppliers.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarSuppliers.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarSuppliers.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarSuppliers.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarSuppliers.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarSuppliers.AccountID = pAccountID;
            objCVarSuppliers.SubAccountID = pSubAccountID;
            objCVarSuppliers.CostCenterID = pCostCenterID;
            objCVarSuppliers.SubAccountGroupID = pSubAccountGroupID;

            objCVarSuppliers.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarSuppliers.LockingUserID = 0;
            objCVarSuppliers.Finance365Ref = pFinance365Ref;

            objCVarSuppliers.CreatorUserID = objCVarSuppliers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarSuppliers.CreationDate = objCVarSuppliers.ModificationDate = DateTime.Now;

            objCVarSuppliers.CRM_Code = "0";
            if (CompanyName == "LATT" && pCreditorGroupID != 0)
            {
                CCustomizedDBCall call = new CCustomizedDBCall();
                string NextVendorNumber = call.CallStringFunction("select max(cast(CRM_Code as int))+1 from Suppliers where CreditorGroupID is not null");
                objCVarSuppliers.CRM_Code = NextVendorNumber;
            }
            objCVarSuppliers.BranchID = pBranchID;
            objCVarSuppliers.CreditorGroupID = pCreditorGroupID;
            objCVarSuppliers.PartnerTypeID = 0;
            objCVarSuppliers.SalesmanID = pSalesmanID;
            objCVarSuppliers.PhonesAndFaxes = pPhonesAndFaxes;

            CSuppliers objCSuppliers = new CSuppliers();
            objCSuppliers.lstCVarSuppliers.Add(objCVarSuppliers);
            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                checkException = Fleet_Forwarding_Suppliers.InsertUpdate_Fleet_Forwarding_Suppliers(objCVarSuppliers);
            }
            else
            { 
                checkException = objCSuppliers.SaveMethod(objCSuppliers.lstCVarSuppliers);

                CAddresses objCAddresses = new CAddresses();
                if (checkException == null && pCityID != 0 && (CompanyName == "LAT" || CompanyName == "LATT"))
                {
                    CVarAddresses objCVarAddresses = new CVarAddresses();
                    objCVarAddresses.PartnerTypeID = 8;
                    objCVarAddresses.PartnerID = objCSuppliers.lstCVarSuppliers[0].ID;
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
                if (checkException == null && pCreditorGroupID != 0 && (CompanyName == "LAT" || CompanyName == "LATT"))
                {
                    var DynamicsGPControllerObject = new DynamicsGPController();
                    try
                    {
                        CvwLattSuppliers objCvwLattSuppliers = new CvwLattSuppliers();
                        objCvwLattSuppliers.GetList($"WHERE ID={objCSuppliers.lstCVarSuppliers[0].ID}");

                        if (objCvwLattSuppliers.lstCVarvwLattSuppliers.Count == 1)
                        {
                            APIResponse response = DynamicsGPControllerObject.InsertSupplier(objCvwLattSuppliers.lstCVarvwLattSuppliers[0]);
                            if (response.IsSuccess)
                            {
                                //CSuppliers updateCrmCode = new CSuppliers();
                                //updateCrmCode.UpdateList($"EmailOptionPayablesAging=1 WHERE ID={objCSuppliers.lstCVarSuppliers[0].ID}");
                                crmResult = true;
                            }
                            else
                            {
                                crmResult = false;
                                crmMessage = response.Message;
                            }

                        }
                    }
                    catch (Exception ex)
                    {
                        Exception e2 = ex;
                    }
                }
            }
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                #region Create SubAccount
                int _RowCount = 0;
                if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                {
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
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSubAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update Customer SubaccountID
                        objCSuppliers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarSuppliers.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }

            #region Tax
            
            Int32 supID = 0;
            Int32 supGroupID = 0;
            Int32 AccountID = 0;


            
            
            CSuppliersTax objCCSuppliersTax = new CSuppliersTax();
            objCCSuppliersTax.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

            CA_SubAccountsTAX objCA_SubAccountsTAXOther = new CA_SubAccountsTAX(); //get the parent details
            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTAXOther = new CA_SubAccounts_DetailsTAX(); //get the parent details
            CA_AccountsTAX objCAccountsTAX = new CA_AccountsTAX(); //get the parent details


            //SupAccount
            CA_SubAccounts objCA_SubAccountsSupAccount = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSupAccount.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountID, "ID", out _RowCount2);

            //SupAccountGroup
            CA_SubAccounts objCA_SubAccountsSupAccountGroup = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSupAccountGroup.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID, "ID", out _RowCount2);


            //Account
            CA_Accounts objCACA_Accounts = new CA_Accounts(); //get the parent details
            checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pAccountID, "ID", out _RowCount2);

            if (objCA_SubAccountsSupAccount.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSupAccount.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    supID = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;

                }
            }
            if (objCA_SubAccountsSupAccountGroup.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSupAccountGroup.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    supGroupID = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;
                }

            }
            if (objCACA_Accounts.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_Accounts.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    AccountID = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
            {
                CVarSuppliersTax objCVarSuppliersTax = new CVarSuppliersTax();

                objCVarSuppliersTax.PaymentTermID = pPaymentTermID;
                objCVarSuppliersTax.CurrencyID = pCurrencyID;
                objCVarSuppliersTax.TaxeTypeID = pTaxeTypeID;

                objCVarSuppliersTax.Code = pCode;
                objCVarSuppliersTax.Name = pName.Trim().ToUpper();
                objCVarSuppliersTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarSuppliersTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarSuppliersTax.IsInactive = pIsInactive;
                objCVarSuppliersTax.IsDeleted = pIsDeleted;
                objCVarSuppliersTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarSuppliersTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarSuppliersTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarSuppliersTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarSuppliersTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarSuppliersTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarSuppliersTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarSuppliersTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarSuppliersTax.AccountID = AccountID;
                objCVarSuppliersTax.SubAccountID = 0;
                objCVarSuppliersTax.CostCenterID = 0;
                objCVarSuppliersTax.SubAccountGroupID = supGroupID;

                objCVarSuppliersTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarSuppliersTax.LockingUserID = 0;

                objCVarSuppliersTax.CreatorUserID = objCVarSuppliersTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarSuppliersTax.CreationDate = objCVarSuppliersTax.ModificationDate = DateTime.Now;

                CSuppliersTax objCSuppliersTax = new CSuppliersTax();
                objCSuppliersTax.lstCVarSuppliersTax.Add(objCVarSuppliersTax);
                 checkException = objCSuppliersTax.SaveMethod(objCSuppliersTax.lstCVarSuppliersTax);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else
                { //not unique
                    _result = true;
                    #region Create SubAccount
                    int _RowCount = 0;
                    if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                    {
                        #region Get data to insert
                        CA_SubAccountsTAX objCA_SubAccountsTax = new CA_SubAccountsTAX();
                        checkException = objCA_SubAccountsTax.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCodeTax(" + (pSubAccountGroupID == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                        #endregion Get data to insert
                        #region Insert
                        CVarA_SubAccountsTAX objCVarA_SubAccountsTax = new CVarA_SubAccountsTAX();
                        objCVarA_SubAccountsTax.SubAccount_Number = (objCA_SubAccountsTax.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                        objCVarA_SubAccountsTax.SubAccount_Name = pName.Trim().ToUpper();
                        objCVarA_SubAccountsTax.SubAccount_EnName = pName.Trim().ToUpper();
                        objCVarA_SubAccountsTax.Parent_ID = pSubAccountGroupID;
                        objCVarA_SubAccountsTax.IsMain = false;
                        objCVarA_SubAccountsTax.SubAccLevel = objCA_SubAccountsTax.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                        objCVarA_SubAccountsTax.RealSubAccountCode = objCA_SubAccountsTax.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                        objCVarA_SubAccountsTax.User_ID = WebSecurity.CurrentUserId;
                        objCA_SubAccountsTax.lstCVarA_SubAccounts.Add(objCVarA_SubAccountsTax);
                        checkException = objCA_SubAccountsTax.SaveMethod(objCA_SubAccountsTax.lstCVarA_SubAccounts);
                        if (checkException == null)
                        {
                            _result = true;
                            int pNewSubAccountID = objCVarA_SubAccountsTax.ID;
                            //CallCustomizedSP
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                            //Set Parent.IsMain=true
                            objCA_SubAccountsTax.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                            #region add Details if exists
                            CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                            checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTax = new CA_SubAccounts_DetailsTAX(); //get the parent details
                            checkException = objCA_SubAccounts_DetailsTax.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);

                            for (int i = 0; i < objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details.Count; i++)
                            {
                                //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTAX", "I", pNewSubAccountID, objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                            }
                            #endregion add Details if exists
                            //Update Customer SubaccountID
                            objCSuppliersTax.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarSuppliersTax.ID);
                        }
                        #endregion Insert


                    }
                    #endregion Create SubAccount
                }
            }
            #endregion

            return new object[]
            {
                _result,
                checkException == null ? "" : checkException.Message,
                crmResult,
                crmMessage
            };
            //return _result;
        }

        // [Route("/api/Suppliers/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName, string pWebsite, bool pIsInactive, bool pisAuthority, string pNotes,string pFinance365Ref, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false, int pBranchID = 0, int pSalesmanID = 0, int pCreditorGroupID = 0, string pCRM_Code = "0", string pPhonesAndFaxes = "0")
        {
            bool _result = false;
            CVarSuppliers objCVarSuppliers = new CVarSuppliers();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CSuppliers objCGetCreationInformation = new CSuppliers();
            objCGetCreationInformation.GetItem(pID);
            objCVarSuppliers.CreatorUserID = objCGetCreationInformation.lstCVarSuppliers[0].CreatorUserID;
            objCVarSuppliers.CreationDate = objCGetCreationInformation.lstCVarSuppliers[0].CreationDate;
            objCVarSuppliers.EmailOptionPayablesReport = objCGetCreationInformation.lstCVarSuppliers[0].EmailOptionPayablesReport;
            objCVarSuppliers.EmailOptionPayablesAging = objCGetCreationInformation.lstCVarSuppliers[0].EmailOptionPayablesAging;
            if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarSuppliers.AccountID = objCGetCreationInformation.lstCVarSuppliers[0].AccountID;
                objCVarSuppliers.SubAccountID = objCGetCreationInformation.lstCVarSuppliers[0].SubAccountID;
                objCVarSuppliers.CostCenterID = objCGetCreationInformation.lstCVarSuppliers[0].CostCenterID;
                objCVarSuppliers.SubAccountGroupID = objCGetCreationInformation.lstCVarSuppliers[0].SubAccountGroupID;
            }
            else
            {
                objCVarSuppliers.AccountID = pAccountID;
                objCVarSuppliers.SubAccountID = pSubAccountID;
                objCVarSuppliers.CostCenterID = pCostCenterID;
                objCVarSuppliers.SubAccountGroupID = pSubAccountGroupID;
            }
            objCVarSuppliers.ID = pID;

            objCVarSuppliers.PaymentTermID = pPaymentTermID;
            objCVarSuppliers.CurrencyID = pCurrencyID;
            objCVarSuppliers.TaxeTypeID = pTaxeTypeID;

            objCVarSuppliers.Code = pCode;
            objCVarSuppliers.Name = pName.Trim().ToUpper();
            objCVarSuppliers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarSuppliers.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarSuppliers.IsInactive = pIsInactive;
            objCVarSuppliers.isAuthority = pisAuthority;

            objCVarSuppliers.IsDeleted = pIsDeleted;
            objCVarSuppliers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarSuppliers.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarSuppliers.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarSuppliers.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarSuppliers.TaxExemptToDate = pTaxExemptToDate;
			objCVarSuppliers.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarSuppliers.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarSuppliers.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarSuppliers.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarSuppliers.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarSuppliers.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarSuppliers.LockingUserID = 0;
            objCVarSuppliers.Finance365Ref = pFinance365Ref;

            objCVarSuppliers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarSuppliers.ModificationDate = DateTime.Now;

            objCVarSuppliers.CRM_Code = pCRM_Code;
            objCVarSuppliers.BranchID = pBranchID;
            objCVarSuppliers.CreditorGroupID = pCreditorGroupID;
            objCVarSuppliers.PartnerTypeID = objCGetCreationInformation.lstCVarSuppliers[0].PartnerTypeID;
            objCVarSuppliers.SalesmanID = pSalesmanID;
            objCVarSuppliers.PhonesAndFaxes = pPhonesAndFaxes;

            CSuppliers objCSuppliers = new CSuppliers();
            objCSuppliers.lstCVarSuppliers.Add(objCVarSuppliers);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_Suppliers.InsertUpdate_Fleet_Forwarding_Suppliers(objCVarSuppliers);
            else
                checkException = objCSuppliers.SaveMethod(objCSuppliers.lstCVarSuppliers);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                #region Create SubAccount
                int _RowCount = 0;
                if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                {
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
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSubAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update Customer SubaccountID
                        objCSuppliers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarSuppliers.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }

            #region Tax
            int _RowCount2 = 0;
            Int32 supID = 0;
            Int32 supGroupID = 0;
            Int32 AccountID = 0;


            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            CSuppliersTax objCCSuppliersTax = new CSuppliersTax();
            objCCSuppliersTax.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

            CA_SubAccountsTAX objCA_SubAccountsTAXOther = new CA_SubAccountsTAX(); //get the parent details
            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTAXOther = new CA_SubAccounts_DetailsTAX(); //get the parent details
            CA_AccountsTAX objCAccountsTAX = new CA_AccountsTAX(); //get the parent details


            //SupAccount
            CA_SubAccounts objCA_SubAccountsSupAccount = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSupAccount.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountID, "ID", out _RowCount2);

            //SupAccountGroup
            CA_SubAccounts objCA_SubAccountsSupAccountGroup = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSupAccountGroup.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID, "ID", out _RowCount2);


            //Account
            CA_Accounts objCACA_Accounts = new CA_Accounts(); //get the parent details
            checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pAccountID, "ID", out _RowCount2);

            if (objCA_SubAccountsSupAccount.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSupAccount.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    supID = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;

                }
            }
            if (objCA_SubAccountsSupAccountGroup.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSupAccountGroup.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    supGroupID = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;
                }

            }
            if (objCACA_Accounts.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_Accounts.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    AccountID = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null && objCCSuppliersTax.lstCVarSuppliersTax.Count > 0)
            {
                CVarSuppliersTax objCVarSuppliersTax = new CVarSuppliersTax();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CSuppliersTax objCGetCreationInformationTax = new CSuppliersTax();
                objCGetCreationInformationTax.GetItem(objCCSuppliersTax.lstCVarSuppliersTax[0].ID);
                objCVarSuppliersTax.CreatorUserID = objCGetCreationInformationTax.lstCVarSuppliersTax[0].CreatorUserID;
                objCVarSuppliersTax.CreationDate = objCGetCreationInformationTax.lstCVarSuppliersTax[0].CreationDate;
                objCVarSuppliersTax.EmailOptionPayablesReport = objCGetCreationInformationTax.lstCVarSuppliersTax[0].EmailOptionPayablesReport;
                objCVarSuppliersTax.EmailOptionPayablesAging = objCGetCreationInformationTax.lstCVarSuppliersTax[0].EmailOptionPayablesAging;
                if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
                {

                    objCVarSuppliersTax.AccountID = AccountID > 0 ? AccountID : 0;
                    objCVarSuppliersTax.SubAccountID = supID > 0 ? supID : 0;
                    objCVarSuppliersTax.CostCenterID = 0;
                    objCVarSuppliersTax.SubAccountGroupID = supGroupID;
                }
                else
                {

                    objCVarSuppliersTax.AccountID = objCCSuppliersTax.lstCVarSuppliersTax[0].AccountID != 0 ? objCCSuppliersTax.lstCVarSuppliersTax[0].AccountID : AccountID;
                    objCVarSuppliersTax.SubAccountID = objCCSuppliersTax.lstCVarSuppliersTax[0].SubAccountID != 0 ? objCCSuppliersTax.lstCVarSuppliersTax[0].SubAccountID : supID;
                    objCVarSuppliersTax.CostCenterID = 0;
                    objCVarSuppliersTax.SubAccountGroupID = objCCSuppliersTax.lstCVarSuppliersTax[0].SubAccountGroupID != 0 ? objCCSuppliersTax.lstCVarSuppliersTax[0].SubAccountGroupID : supGroupID;

                }
                objCVarSuppliersTax.ID = objCCSuppliersTax.lstCVarSuppliersTax[0].ID;

                objCVarSuppliersTax.PaymentTermID = pPaymentTermID;
                objCVarSuppliersTax.CurrencyID = pCurrencyID;
                objCVarSuppliersTax.TaxeTypeID = pTaxeTypeID;

                objCVarSuppliersTax.Code = pCode;
                objCVarSuppliersTax.Name = pName.Trim().ToUpper();
                objCVarSuppliersTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarSuppliersTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarSuppliersTax.IsInactive = pIsInactive;
                objCVarSuppliersTax.IsDeleted = pIsDeleted;
                objCVarSuppliersTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarSuppliersTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarSuppliersTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarSuppliersTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarSuppliersTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarSuppliersTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarSuppliersTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarSuppliersTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarSuppliersTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarSuppliersTax.LockingUserID = 0;

                objCVarSuppliersTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarSuppliersTax.ModificationDate = DateTime.Now;

                CSuppliersTax objCSuppliersTax = new CSuppliersTax();
                objCSuppliersTax.lstCVarSuppliersTax.Add(objCVarSuppliersTax);
                checkException = objCSuppliersTax.SaveMethod(objCSuppliersTax.lstCVarSuppliersTax);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else
                { //not unique
                    _result = true;
                    #region Create SubAccount
                    int _RowCount = 0;
                    if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                    {
                        #region Get data to insert
                        CA_SubAccountsTAX objCA_SubAccountsTax = new CA_SubAccountsTAX();
                        checkException = objCA_SubAccountsTax.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCodeTax(" + (pSubAccountGroupID == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                        #endregion Get data to insert
                        #region Insert
                        CVarA_SubAccountsTAX objCVarA_SubAccountsTax = new CVarA_SubAccountsTAX();
                        objCVarA_SubAccountsTax.SubAccount_Number = (objCA_SubAccountsTax.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                        objCVarA_SubAccountsTax.SubAccount_Name = pName.Trim().ToUpper();
                        objCVarA_SubAccountsTax.SubAccount_EnName = pName.Trim().ToUpper();
                        objCVarA_SubAccountsTax.Parent_ID = pSubAccountGroupID;
                        objCVarA_SubAccountsTax.IsMain = false;
                        objCVarA_SubAccountsTax.SubAccLevel = objCA_SubAccountsTax.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                        objCVarA_SubAccountsTax.RealSubAccountCode = objCA_SubAccountsTax.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                        objCVarA_SubAccountsTax.User_ID = WebSecurity.CurrentUserId;
                        objCA_SubAccountsTax.lstCVarA_SubAccounts.Add(objCVarA_SubAccountsTax);
                        checkException = objCA_SubAccountsTax.SaveMethod(objCA_SubAccountsTax.lstCVarA_SubAccounts);
                        if (checkException == null)
                        {
                            _result = true;
                            int pNewSubAccountID = objCVarA_SubAccountsTax.ID;
                            //CallCustomizedSP
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                            //Set Parent.IsMain=true
                            objCA_SubAccountsTax.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                            #region add Details if exists
                            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTax = new CA_SubAccounts_DetailsTAX(); //get the parent details
                            checkException = objCA_SubAccounts_DetailsTax.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                            for (int i = 0; i < objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details.Count; i++)
                            {
                                //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTAX", "I", pNewSubAccountID, objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                            }
                            #endregion add Details if exists
                            //Update Customer SubaccountID
                            objCSuppliersTax.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarSuppliersTax.ID);
                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount
                }
            }
            #endregion
            return _result;
        }

        // [Route("api/Suppliers/Delete/{pSuppliersIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pSuppliersIDs)
        {
            bool _result = false;
            CSuppliers objCSuppliers = new CSuppliers();
            CSuppliersTax objCSuppliersTAX2 = new CSuppliersTax();
            Exception checkException = null;
            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pSuppliersIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_Suppliers.Delete_Fleet_Forwarding_Suppliers(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
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
                    foreach (var currentID in pSuppliersIDs.Split(','))
                    {

                        CSuppliersTax objCSuppliersTAX = new CSuppliersTax();
                        objCSuppliers.GetList("WHERE ID=" + currentID);
                        objCSuppliersTAX.GetList("WHERE Name=N'" + objCSuppliers.lstCVarSuppliers[0].Name + "'");
                        if (objCSuppliersTAX.lstCVarSuppliersTax.Count > 0)
                        {
                            objCSuppliersTAX2.lstDeletedCPKSuppliersTax.Add(new CPKSuppliersTax() { ID = objCSuppliersTAX.lstCVarSuppliersTax[0].ID });

                        }


                    }
                    checkException = objCSuppliersTAX2.DeleteItem(objCSuppliersTAX2.lstDeletedCPKSuppliersTax);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                }

                foreach (var currentID in pSuppliersIDs.Split(','))
                {
                    objCSuppliers.lstDeletedCPKSuppliers.Add(new CPKSuppliers() { ID = Int32.Parse(currentID.Trim()) });
                }

                checkException = objCSuppliers.DeleteItem(objCSuppliers.lstDeletedCPKSuppliers);
            }


            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
                _result = true;
            return _result;
        }
        
        [HttpGet, HttpPost]
        public Object[] LoadSupplierSites(string pWhereClause)
        {
            CSupplierSite objCSupplierSite = new CSupplierSite();
            objCSupplierSite.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSupplierSite.lstCVarSupplierSite) };
        }

        [HttpPost]
        public object[] InsertListFromExcel_Suppliers([FromBody] InsertListFromExcel_Suppliers InsertListFromExcel_Suppliers)
        {
            string pReturnedMessage = "";
            bool _result = true;
            Exception checkException = null;
            int _RowCount = 0;
            int _NumberOfRows = InsertListFromExcel_Suppliers.pNameList.Split(',').Length;
            CvwSuppliers objCvwSuppliers = new CvwSuppliers();
            var _ArrName = InsertListFromExcel_Suppliers.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_Suppliers.pLocalNameList.Split(',');
            var _ArrCompany = InsertListFromExcel_Suppliers.pCompanyList.Split(',');

            bool IsCompanyColumnValid = true;
            CDefaults Defaults = new CDefaults();
            int RowCount;
            Defaults.GetListPaging(1, 1, " WHERE 1=1 ", " ID ", out RowCount);
            string UnEditableCompanyName = Defaults.lstCVarDefaults[0].UnEditableCompanyName;
            if (UnEditableCompanyName == "TOP")
            {
                for (int i = 0; i < _ArrCompany.Length; i++)
                {
                    if (_ArrCompany[i].ToUpper() != "ALT" && _ArrCompany[i].ToUpper() != "EUR" && _ArrCompany[i].ToUpper() != "MES" && _ArrCompany[i].ToUpper() != "GLO" && _ArrCompany[i].ToUpper() != "SAC")
                    {
                        IsCompanyColumnValid = false;
                    }
                }
            }

            if (IsCompanyColumnValid)
            {
                for (int i = 0; i < _NumberOfRows; i++)
                {
                    CVarSuppliers objCVarSuppliers = new CVarSuppliers();
                    //objCVarSuppliers.TareWeight = decimal.Parse(_ArrTareWeight[i]);

                    objCVarSuppliers.PaymentTermID = 0;
                    objCVarSuppliers.CurrencyID = Defaults.lstCVarDefaults[0].CurrencyID;
                    objCVarSuppliers.TaxeTypeID = 0;

                    objCVarSuppliers.Code = 0;
                    objCVarSuppliers.Name = _ArrName[i];
                    objCVarSuppliers.LocalName = _ArrLocalName[i];
                    objCVarSuppliers.Website = "";
                    objCVarSuppliers.IsInactive = false;
                    objCVarSuppliers.IsDeleted = false;
                    objCVarSuppliers.Notes = "";
                    objCVarSuppliers.VATNumber = "";
                    objCVarSuppliers.IsConsolidatedInvoice = false;
                    objCVarSuppliers.BankName = "";
                    objCVarSuppliers.BankAddress = "";
                    objCVarSuppliers.Swift = "";
                    objCVarSuppliers.BankAccountNumber = "";
                    objCVarSuppliers.IBANNumber = "";

                    objCVarSuppliers.AccountID = 0;
                    objCVarSuppliers.SubAccountID = 0;
                    objCVarSuppliers.CostCenterID = 0;
                    objCVarSuppliers.SubAccountGroupID = 0;
                    objCVarSuppliers.Finance365Ref = "0";

                    objCVarSuppliers.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarSuppliers.LockingUserID = 0;
                    objCVarSuppliers.CreatorUserID = objCVarSuppliers.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarSuppliers.CreationDate = objCVarSuppliers.ModificationDate = DateTime.Now;

                    objCVarSuppliers.CRM_Code = "0";
                    objCVarSuppliers.BranchID = 0;
                    objCVarSuppliers.CreditorGroupID = 0;
                    objCVarSuppliers.PartnerTypeID = 0;
                    objCVarSuppliers.SalesmanID = 0;
                    objCVarSuppliers.PhonesAndFaxes = "0";


                    if (UnEditableCompanyName == "TOP")
                    {
                        switch (_ArrCompany[i].ToUpper())
                        {
                            case "ALT":
                                var objCSuppliers_ALT = new Models.MasterData.Partners.Customized.CSuppliers_DynamicConnection(Helpers.Companies.InternalCompanies.Altun);
                                objCSuppliers_ALT.lstCVarSuppliers.Add(objCVarSuppliers);
                                checkException = objCSuppliers_ALT.SaveMethod(objCSuppliers_ALT.lstCVarSuppliers);
                                break;
                            case "EUR":
                                var objCSuppliers_EUR = new Models.MasterData.Partners.Customized.CSuppliers_DynamicConnection(Helpers.Companies.InternalCompanies.EUROShipping);
                                objCSuppliers_EUR.lstCVarSuppliers.Add(objCVarSuppliers);
                                checkException = objCSuppliers_EUR.SaveMethod(objCSuppliers_EUR.lstCVarSuppliers);
                                break;
                            case "MES":
                                var objCSuppliers_MES = new Models.MasterData.Partners.Customized.CSuppliers_DynamicConnection(Helpers.Companies.InternalCompanies.MESCO);
                                objCSuppliers_MES.lstCVarSuppliers.Add(objCVarSuppliers);
                                checkException = objCSuppliers_MES.SaveMethod(objCSuppliers_MES.lstCVarSuppliers);
                                break;
                            case "GLO":
                                var objCSuppliers_GLO = new Models.MasterData.Partners.Customized.CSuppliers_DynamicConnection(Helpers.Companies.InternalCompanies.GlobeLink);
                                objCSuppliers_GLO.lstCVarSuppliers.Add(objCVarSuppliers);
                                checkException = objCSuppliers_GLO.SaveMethod(objCSuppliers_GLO.lstCVarSuppliers);
                                break;
                            case "SAC":
                                var objCSuppliers_SAC = new Models.MasterData.Partners.Customized.CSuppliers_DynamicConnection(Helpers.Companies.InternalCompanies.SACO);
                                objCSuppliers_SAC.lstCVarSuppliers.Add(objCVarSuppliers);
                                checkException = objCSuppliers_SAC.SaveMethod(objCSuppliers_SAC.lstCVarSuppliers);
                                break;
                            default:
                                pReturnedMessage = "Company Column is not valid";
                                break;

                        }



                    }
                    else
                    {
                        CSuppliers objCSuppliers = new CSuppliers();
                        objCSuppliers.lstCVarSuppliers.Add(objCVarSuppliers);
                        checkException = objCSuppliers.SaveMethod(objCSuppliers.lstCVarSuppliers);
                    }

                    if (checkException != null)
                    {
                        pReturnedMessage += "Row " + (i + 1) + " - " + checkException.Message + " \n";
                    }
                }
            }
            else
            {
                pReturnedMessage = "Company Column is not valid";
            }






            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                pReturnedMessage
            };
        }

        [HttpGet]
        public object[] LoadSuppliersModalComboBoxes(bool pDummy)
        {
            CBranches objCBranches = new CBranches();
            objCBranches.GetList("WHERE 1=1");

            CCreditorGroup objCCreditorGroup = new CCreditorGroup();
            objCCreditorGroup.GetList("WHERE 1=1");

            CUsers objCUsers = new CUsers();
            objCUsers.GetList(" where IsInactive=0 and IsSalesman=1");

            var serializer = new JavaScriptSerializer();

            return new object[]
            {
                serializer.Serialize(objCBranches.lstCVarBranches) //pData[0]
                ,serializer.Serialize(objCCreditorGroup.lstCVarCreditorGroup) //pData[1]
                ,serializer.Serialize(objCUsers.lstCVarUsers) //pData[2]
            };
        }
    }

    public class InsertListFromExcel_Suppliers
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pCompanyList { get; set; }
    }
}