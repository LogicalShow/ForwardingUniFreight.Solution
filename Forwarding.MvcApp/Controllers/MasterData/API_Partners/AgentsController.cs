//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
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
    public class AgentsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CAgents objCAgents = new CAgents();
            objCAgents.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCAgents.lstCVarAgents) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllForCombo(string pWhereClauseForCombo)
        {
            Exception checkException = null;
            CvwAgentsForCombo objCAgents = new CvwAgentsForCombo();
            checkException = objCAgents.GetList(pWhereClauseForCombo);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCAgents.lstCVarvwAgentsForCombo) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwAgents objCvwAgents = new CvwAgents();
            //objCvwAgents.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwAgents.lstCVarvwAgents.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            //+ " OR ISOCode LIKE '%" + pSearchKey + "%' "
            //+ " OR PrintAs LIKE '%" + pSearchKey + "%' "
            //+ " OR CSizeCode LIKE '%" + pSearchKey + "%' "
            //+ " OR CTypeCode LIKE '%" + pSearchKey + "%' ";

            objCvwAgents.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwAgents.lstCVarvwAgents), _RowCount };
        }
		[HttpGet, HttpPost]
		public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
		{
			CvwAgents objCvwAgents = new CvwAgents();
			Int32 _RowCount = 0;

			objCvwAgents.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);

			return new Object[] { new JavaScriptSerializer().Serialize(objCvwAgents.lstCVarvwAgents), _RowCount };
		}
		[HttpGet, HttpPost]
        public bool Insert(Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName
            , string pLocalName, string pWebsite, string pEmail, bool pIsInactive, string pNotes,string pcrmCode,string pFinance365Ref, string pAddress
            , string pPhonesAndFaxes, string pVATNumber
            , bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarAgents objCVarAgents = new CVarAgents();

            objCVarAgents.PaymentTermID = pPaymentTermID;
            objCVarAgents.CurrencyID = pCurrencyID;
            objCVarAgents.TaxeTypeID = pTaxeTypeID;

            objCVarAgents.Code = pCode;
            objCVarAgents.Name = pName.Trim().ToUpper();
            objCVarAgents.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarAgents.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarAgents.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
            objCVarAgents.IsInactive = pIsInactive;
            objCVarAgents.IsDeleted = pIsDeleted;
            objCVarAgents.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarAgents.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
            objCVarAgents.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
            objCVarAgents.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarAgents.IsConsolidatedInvoice = pIsConsolidatedInvoice;
            objCVarAgents.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarAgents.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarAgents.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarAgents.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarAgents.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarAgents.AccountID = pAccountID;
            objCVarAgents.SubAccountID = pSubAccountID;
            objCVarAgents.CostCenterID = pCostCenterID;
            objCVarAgents.SubAccountGroupID = pSubAccountGroupID;

            objCVarAgents.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarAgents.LockingUserID = 0;

            objCVarAgents.CreatorUserID = objCVarAgents.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarAgents.CreationDate = objCVarAgents.ModificationDate = DateTime.Now;
            objCVarAgents.crmCode = pcrmCode;
            objCVarAgents.Finance365Ref = pFinance365Ref;

            objCVarAgents.SupplierID = 0;
            objCVarAgents.BranchID = 0;
            objCVarAgents.SalesmanID = 0;

            CAgents objCAgents = new CAgents();
            objCAgents.lstCVarAgents.Add(objCVarAgents);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_Agents.InsertUpdate_Fleet_Forwarding_Agents(objCVarAgents);
            else
                checkException = objCAgents.SaveMethod(objCAgents.lstCVarAgents);

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
                        objCAgents.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarAgents.ID);
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
            CAirlinesTAX objCCAirlinesTax = new CAirlinesTAX();
            objCCAirlinesTax.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

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
                CVarAgentsTax objCVarAgentsTax = new CVarAgentsTax();

                objCVarAgentsTax.PaymentTermID = pPaymentTermID;
                objCVarAgentsTax.CurrencyID = pCurrencyID;
                objCVarAgentsTax.TaxeTypeID = pTaxeTypeID;

                objCVarAgentsTax.Code = pCode;
                objCVarAgentsTax.Name = pName.Trim().ToUpper();
                objCVarAgentsTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarAgentsTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarAgentsTax.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
                objCVarAgentsTax.IsInactive = pIsInactive;
                objCVarAgentsTax.IsDeleted = pIsDeleted;
                objCVarAgentsTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarAgentsTax.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
                objCVarAgentsTax.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
                objCVarAgentsTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarAgentsTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarAgentsTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarAgentsTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarAgentsTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarAgentsTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarAgentsTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarAgentsTax.AccountID = AccountID;
                objCVarAgentsTax.SubAccountID = supID;
                objCVarAgentsTax.CostCenterID = 0;
                objCVarAgentsTax.SubAccountGroupID = supGroupID;

                objCVarAgentsTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarAgentsTax.LockingUserID = 0;

                objCVarAgentsTax.CreatorUserID = objCVarAgentsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAgentsTax.CreationDate = objCVarAgentsTax.ModificationDate = DateTime.Now;

                CAgentsTax objCAgentsTax = new CAgentsTax();
                objCAgentsTax.lstCVarAgentsTax.Add(objCVarAgentsTax);
                checkException = objCAgentsTax.SaveMethod(objCAgentsTax.lstCVarAgentsTax);
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
                            objCAgentsTax.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarAgentsTax.ID);
                        }
                        #endregion Insert


                    }
                    #endregion Create SubAccount
                }
                #endregion
            }

            return _result;
        }

        // [Route("/api/Agents/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName, string pWebsite, string pEmail, bool pIsInactive, string pNotes,string pcrmCode,string pFinance365Ref, string pAddress, string pPhonesAndFaxes, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarAgents objCVarAgents = new CVarAgents();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CAgents objCGetCreationInformation = new CAgents();
            objCGetCreationInformation.GetItem(pID);
            objCVarAgents.CreatorUserID = objCGetCreationInformation.lstCVarAgents[0].CreatorUserID;
            objCVarAgents.CreationDate = objCGetCreationInformation.lstCVarAgents[0].CreationDate;
            objCVarAgents.EmailOptionAging = objCGetCreationInformation.lstCVarAgents[0].EmailOptionAging;
            objCVarAgents.EmailOptionInvoicesReport = objCGetCreationInformation.lstCVarAgents[0].EmailOptionInvoicesReport;
            objCVarAgents.EmailOptionPartnerStatement = objCGetCreationInformation.lstCVarAgents[0].EmailOptionPartnerStatement;
            if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarAgents.AccountID = objCGetCreationInformation.lstCVarAgents[0].AccountID;
                objCVarAgents.SubAccountID = objCGetCreationInformation.lstCVarAgents[0].SubAccountID;
                objCVarAgents.CostCenterID = objCGetCreationInformation.lstCVarAgents[0].CostCenterID;
                objCVarAgents.SubAccountGroupID = objCGetCreationInformation.lstCVarAgents[0].SubAccountGroupID;
            }
            else
            {
                objCVarAgents.AccountID = pAccountID;
                objCVarAgents.SubAccountID = pSubAccountID;
                objCVarAgents.CostCenterID = pCostCenterID;
                objCVarAgents.SubAccountGroupID = pSubAccountGroupID;
            }
            objCVarAgents.ID = pID;

            objCVarAgents.PaymentTermID = pPaymentTermID;
            objCVarAgents.CurrencyID = pCurrencyID;
            objCVarAgents.TaxeTypeID = pTaxeTypeID;

            objCVarAgents.Code = pCode;
            objCVarAgents.Name = pName.Trim().ToUpper();
            objCVarAgents.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarAgents.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarAgents.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
            objCVarAgents.IsInactive = pIsInactive;
            objCVarAgents.IsDeleted = pIsDeleted;
            objCVarAgents.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarAgents.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
            objCVarAgents.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
            objCVarAgents.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarAgents.IsConsolidatedInvoice = pIsConsolidatedInvoice;
            objCVarAgents.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarAgents.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarAgents.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarAgents.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarAgents.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarAgents.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarAgents.LockingUserID = 0;

            objCVarAgents.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarAgents.ModificationDate = DateTime.Now;
            objCVarAgents.crmCode = objCGetCreationInformation.lstCVarAgents[0].crmCode;
            objCVarAgents.Finance365Ref = pFinance365Ref;

            objCVarAgents.SupplierID = objCGetCreationInformation.lstCVarAgents[0].SupplierID;
            objCVarAgents.BranchID = objCGetCreationInformation.lstCVarAgents[0].BranchID;
            objCVarAgents.SalesmanID = objCGetCreationInformation.lstCVarAgents[0].SalesmanID;

            CAgents objCAgents = new CAgents();
            objCAgents.lstCVarAgents.Add(objCVarAgents);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_Agents.InsertUpdate_Fleet_Forwarding_Agents(objCVarAgents);
            else
                checkException = objCAgents.SaveMethod(objCAgents.lstCVarAgents);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
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
                        objCAgents.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarAgents.ID);
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
            CAgentsTax objCCAgentsTax = new CAgentsTax();
            objCCAgentsTax.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

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

            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null && objCCAgentsTax.lstCVarAgentsTax.Count > 0)
            {
                CVarAgentsTax objCVarAgentsTax = new CVarAgentsTax();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CAgentsTax objCGetCreationInformationTax = new CAgentsTax();
                objCGetCreationInformationTax.GetItem(objCCAgentsTax.lstCVarAgentsTax[0].ID);
                objCVarAgentsTax.CreatorUserID = objCGetCreationInformationTax.lstCVarAgentsTax[0].CreatorUserID;
                objCVarAgentsTax.CreationDate = objCGetCreationInformationTax.lstCVarAgentsTax[0].CreationDate;
                objCVarAgentsTax.EmailOptionAging = objCGetCreationInformationTax.lstCVarAgentsTax[0].EmailOptionAging;
                objCVarAgentsTax.EmailOptionInvoicesReport = objCGetCreationInformationTax.lstCVarAgentsTax[0].EmailOptionInvoicesReport;
                objCVarAgentsTax.EmailOptionPartnerStatement = objCGetCreationInformationTax.lstCVarAgentsTax[0].EmailOptionPartnerStatement;
                if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
                {
                    objCVarAgentsTax.AccountID = AccountID > 0 ? AccountID : 0;
                    objCVarAgentsTax.SubAccountID = supID > 0 ? supID : 0;
                    objCVarAgentsTax.CostCenterID = 0;
                    objCVarAgentsTax.SubAccountGroupID = supGroupID;


                }
                else
                {
                    objCVarAgentsTax.AccountID = objCCAgentsTax.lstCVarAgentsTax[0].AccountID != 0 ? objCCAgentsTax.lstCVarAgentsTax[0].AccountID : AccountID;
                    objCVarAgentsTax.SubAccountID = objCCAgentsTax.lstCVarAgentsTax[0].SubAccountID != 0 ? objCCAgentsTax.lstCVarAgentsTax[0].SubAccountID : supID;
                    objCVarAgentsTax.CostCenterID = 0;
                    objCVarAgentsTax.SubAccountGroupID = objCCAgentsTax.lstCVarAgentsTax[0].SubAccountGroupID != 0 ? objCCAgentsTax.lstCVarAgentsTax[0].SubAccountGroupID : supGroupID;



                
                }
                objCVarAgentsTax.ID = objCCAgentsTax.lstCVarAgentsTax[0].ID;

                objCVarAgentsTax.PaymentTermID = pPaymentTermID;
                objCVarAgentsTax.CurrencyID = pCurrencyID;
                objCVarAgentsTax.TaxeTypeID = pTaxeTypeID;

                objCVarAgentsTax.Code = pCode;
                objCVarAgentsTax.Name = pName.Trim().ToUpper();
                objCVarAgentsTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarAgentsTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarAgentsTax.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
                objCVarAgentsTax.IsInactive = pIsInactive;
                objCVarAgentsTax.IsDeleted = pIsDeleted;
                objCVarAgentsTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarAgentsTax.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
                objCVarAgentsTax.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
                objCVarAgentsTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarAgentsTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarAgentsTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarAgentsTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarAgentsTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarAgentsTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarAgentsTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarAgentsTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarAgentsTax.LockingUserID = 0;

                objCVarAgentsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAgentsTax.ModificationDate = DateTime.Now;

                CAgentsTax objCAgentsTax = new CAgentsTax();
                objCAgentsTax.lstCVarAgentsTax.Add(objCVarAgentsTax);
                 checkException = objCAgentsTax.SaveMethod(objCAgentsTax.lstCVarAgentsTax);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
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
                            objCAgentsTax.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarAgentsTax.ID);
                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount
                }

            }

            #endregion
            return _result;
        }
        
        // [Route("api/Agents/Delete/{pAgentsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pAgentsIDs)
        {
            bool _result = false;
            CAgents objCAgents = new CAgents();
            CAgentsTax objCAgentsTAX2 = new CAgentsTax();
            Exception checkException = null;
            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pAgentsIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_Agents.Delete_Fleet_Forwarding_Agents(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
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
                    foreach (var currentID in pAgentsIDs.Split(','))
                    {

                        CAgentsTax objCAgentsTAX = new CAgentsTax();
                        objCAgents.GetList("WHERE ID=" + currentID);
                        objCAgentsTAX.GetList("WHERE Name=N'" + objCAgents.lstCVarAgents[0].Name + "'");
                        if (objCAgentsTAX.lstCVarAgentsTax.Count > 0)
                        {
                            objCAgentsTAX2.lstDeletedCPKAgentsTax.Add(new CPKAgentsTax() { ID = objCAgentsTAX.lstCVarAgentsTax[0].ID });

                        }


                    }
                    checkException = objCAgentsTAX2.DeleteItem(objCAgentsTAX2.lstDeletedCPKAgentsTax);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                }



                foreach (var currentID in pAgentsIDs.Split(','))
                {
                    objCAgents.lstDeletedCPKAgents.Add(new CPKAgents() { ID = Int32.Parse(currentID.Trim()) });
                }

                checkException = objCAgents.DeleteItem(objCAgents.lstDeletedCPKAgents);
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
        public object[] InsertListFromExcel_Agents([FromBody] InsertListFromExcel_Agents InsertListFromExcel_Agents)
        {
            string pReturnedMessage = "";
            Exception checkException = null;
            //int _RowCount = 0;
            int _NumberOfRows = InsertListFromExcel_Agents.pNameList.Split(',').Length;
            //CvwAgents objCvwAgents = new CvwAgents();
            var _ArrName = InsertListFromExcel_Agents.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_Agents.pLocalNameList.Split(',');
            var _ArrAddress = InsertListFromExcel_Agents.pAddressList.Split(',');
            var _ArrEmail = InsertListFromExcel_Agents.pEmailList.Split(',');
            var _ArrPhonesAndFaxes = InsertListFromExcel_Agents.pPhonesAndFaxesList.Split(',');
            var _ArrVATNumber = InsertListFromExcel_Agents.pVATNumberList.Split(',');
            var _ArrCommercialRegistration = InsertListFromExcel_Agents.pCommercialRegistrationList.Split(',');
            var _ArrCompany = InsertListFromExcel_Agents.pCompanyList.Split(',');

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
                    CVarAgents objCVarAgents = new CVarAgents();
                    //objCVarAgents.TareWeight = decimal.Parse(_ArrTareWeight[i]);

                    objCVarAgents.PaymentTermID = 0;
                    objCVarAgents.CurrencyID = Defaults.lstCVarDefaults[0].CurrencyID;
                    objCVarAgents.TaxeTypeID = 0;

                    objCVarAgents.Code = 0;
                    objCVarAgents.Name = _ArrName[i];
                    objCVarAgents.LocalName = _ArrLocalName[i];
                    objCVarAgents.Website = "";
                    objCVarAgents.Email = _ArrEmail[i];
                    objCVarAgents.IsInactive = false;
                    objCVarAgents.IsDeleted = false;
                    objCVarAgents.Notes = "";
                    objCVarAgents.Address = _ArrAddress[i];
                    objCVarAgents.PhonesAndFaxes = _ArrPhonesAndFaxes[i];
                    objCVarAgents.VATNumber = _ArrVATNumber[i];
                    objCVarAgents.IsConsolidatedInvoice = false;
                    objCVarAgents.BankName = "";
                    objCVarAgents.BankAddress = "";
                    objCVarAgents.Swift = "";
                    objCVarAgents.BankAccountNumber = "";
                    objCVarAgents.IBANNumber = _ArrCommercialRegistration[i];

                    objCVarAgents.AccountID = 0;
                    objCVarAgents.SubAccountID = 0;
                    objCVarAgents.CostCenterID = 0;
                    objCVarAgents.SubAccountGroupID = 0;

                    objCVarAgents.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarAgents.LockingUserID = 0;

                    objCVarAgents.CreatorUserID = objCVarAgents.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarAgents.CreationDate = objCVarAgents.ModificationDate = DateTime.Now;
                    objCVarAgents.crmCode = "0";
                    objCVarAgents.Finance365Ref = "0";

                    objCVarAgents.SupplierID = 0;
                    objCVarAgents.BranchID = 0;
                    objCVarAgents.SalesmanID = 0;


                    if (UnEditableCompanyName == "TOP")
                    {
                        switch (_ArrCompany[i].ToUpper())
                        {
                            case "ALT":
                                var objCAgents_ALT = new Models.MasterData.Partners.Customized.CAgents_DynamicConnection(Helpers.Companies.InternalCompanies.Altun);
                                objCAgents_ALT.lstCVarAgents.Add(objCVarAgents);
                                checkException = objCAgents_ALT.SaveMethod(objCAgents_ALT.lstCVarAgents);
                                break;
                            case "EUR":
                                var objCAgents_EUR = new Models.MasterData.Partners.Customized.CAgents_DynamicConnection(Helpers.Companies.InternalCompanies.EUROShipping);
                                objCAgents_EUR.lstCVarAgents.Add(objCVarAgents);
                                checkException = objCAgents_EUR.SaveMethod(objCAgents_EUR.lstCVarAgents);
                                break;
                            case "MES":
                                var objCAgents_MES = new Models.MasterData.Partners.Customized.CAgents_DynamicConnection(Helpers.Companies.InternalCompanies.MESCO);
                                objCAgents_MES.lstCVarAgents.Add(objCVarAgents);
                                checkException = objCAgents_MES.SaveMethod(objCAgents_MES.lstCVarAgents);
                                break;
                            case "GLO":
                                var objCAgents_GLO = new Models.MasterData.Partners.Customized.CAgents_DynamicConnection(Helpers.Companies.InternalCompanies.GlobeLink);
                                objCAgents_GLO.lstCVarAgents.Add(objCVarAgents);
                                checkException = objCAgents_GLO.SaveMethod(objCAgents_GLO.lstCVarAgents);
                                break;
                            case "SAC":
                                var objCAgents_SAC = new Models.MasterData.Partners.Customized.CAgents_DynamicConnection(Helpers.Companies.InternalCompanies.SACO);
                                objCAgents_SAC.lstCVarAgents.Add(objCVarAgents);
                                checkException = objCAgents_SAC.SaveMethod(objCAgents_SAC.lstCVarAgents);
                                break;
                            default:
                                pReturnedMessage = "Company Column is not valid";
                                break;

                        }



                    }
                    else
                    {
                        CAgents objCAgents = new CAgents();
                        objCAgents.lstCVarAgents.Add(objCVarAgents);
                        checkException = objCAgents.SaveMethod(objCAgents.lstCVarAgents);
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

        #region OperatorTankCharge
        [HttpGet, HttpPost]
        public object[] OperatorTankCharge_LoadAll(string pWhereClauseOperatorTankCharge)
        {
            Exception checkException = null;
            CvwOperatorTankCharge objCvwOperatorTankCharge = new CvwOperatorTankCharge();
            checkException = objCvwOperatorTankCharge.GetList(pWhereClauseOperatorTankCharge);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwOperatorTankCharge.lstCVarvwOperatorTankCharge)
            };
        }
        [HttpGet, HttpPost]
        public object[] OperatorTankCharge_Save(Int32 pOperatorTankChargeID, Int32 pCustomerID, Int32 pAgentID
            , Int32 pChargeTypeID, decimal pCostPrice, Int32 pCostCurrencyID, decimal pSalePrice, Int32 pSaleCurrencyID
            , bool pIsImport, bool pIsExport, bool pIsDomestic, bool pIsCrossBooking, bool pIsReExport, bool pIsLoaded, string pNotes)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            COperatorTankCharge objCOperatorTankCharge = new COperatorTankCharge();
            CVarOperatorTankCharge objCVarOperatorTankCharge = new CVarOperatorTankCharge();

            objCVarOperatorTankCharge.ID = pOperatorTankChargeID;
            objCVarOperatorTankCharge.CustomerID = pCustomerID;
            objCVarOperatorTankCharge.AgentID = pAgentID;
            objCVarOperatorTankCharge.ChargeTypeID = pChargeTypeID;
            objCVarOperatorTankCharge.CostPrice = pCostPrice;
            objCVarOperatorTankCharge.CostCurrencyID = pCostCurrencyID;
            objCVarOperatorTankCharge.SalePrice = pSalePrice;
            objCVarOperatorTankCharge.SaleCurrencyID = pSaleCurrencyID;
            objCVarOperatorTankCharge.IsImport = pIsImport;
            objCVarOperatorTankCharge.IsExport = pIsExport;
            objCVarOperatorTankCharge.IsDomestic = pIsDomestic;
            objCVarOperatorTankCharge.IsCrossBooking = pIsCrossBooking;
            objCVarOperatorTankCharge.IsReExport = pIsReExport;
            objCVarOperatorTankCharge.IsLoaded = pIsLoaded;
            objCVarOperatorTankCharge.Notes = pNotes;
            objCVarOperatorTankCharge.ModificatorUserID = WebSecurity.CurrentUserId;
            objCOperatorTankCharge.lstCVarOperatorTankCharge.Add(objCVarOperatorTankCharge);
            checkException = objCOperatorTankCharge.SaveMethod(objCOperatorTankCharge.lstCVarOperatorTankCharge);
            if (checkException != null)
                _MessageReturned = checkException.Message;
            CvwOperatorTankCharge objCvwOperatorTankCharge = new CvwOperatorTankCharge();
            objCvwOperatorTankCharge.GetList("WHERE AgentID=" + pAgentID + " ORDER BY ChargeTypeName");
            return new object[] {
                _MessageReturned
                , new JavaScriptSerializer().Serialize(objCvwOperatorTankCharge.lstCVarvwOperatorTankCharge)
            };
        }

        [HttpGet, HttpPost]
        public object[] OperatorTankCharge_DeleteList(string pDeletedOperatorTankChargeIDs, Int32 pAgentID)
        {
            COperatorTankCharge objCOperatorTankCharge = new COperatorTankCharge();
            CvwOperatorTankCharge objCvwOperatorTankCharge = new CvwOperatorTankCharge();
            Exception checkException = new Exception();
            checkException = objCOperatorTankCharge.DeleteList("WHERE ID IN (" + pDeletedOperatorTankChargeIDs + ")");
            checkException = objCvwOperatorTankCharge.GetList("WHERE AgentID=" + pAgentID + " ORDER BY ChargeTypeName");
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwOperatorTankCharge.lstCVarvwOperatorTankCharge)
            };
        }
        #endregion OperatorTankCharge

    }

    public class InsertListFromExcel_Agents
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pAddressList { get; set; }
        public string pEmailList { get; set; }
        public string pPhonesAndFaxesList { get; set; }
        public string pVATNumberList { get; set; }
        public string pCommercialRegistrationList { get; set; }
        public string pCompanyList { get; set; }
    }
}
