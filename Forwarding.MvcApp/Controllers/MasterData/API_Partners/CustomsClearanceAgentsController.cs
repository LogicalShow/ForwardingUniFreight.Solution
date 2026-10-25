using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized;
//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class CustomsClearanceAgentsController : ApiController
    {
        //[Route("/api/CustomsClearanceAgents/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
            objCCustomsClearanceAgents.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents) };
        }

        // [Route("/api/CustomsClearanceAgents/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwCustomsClearanceAgents objCvwCustomsClearanceAgents = new CvwCustomsClearanceAgents();
            //objCvwCustomsClearanceAgents.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCustomsClearanceAgents.lstCVarvwCustomsClearanceAgents.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            //+ " OR ISOCode LIKE '%" + pSearchKey + "%' "
            //+ " OR PrintAs LIKE '%" + pSearchKey + "%' "
            //+ " OR CSizeCode LIKE '%" + pSearchKey + "%' "
            //+ " OR CTypeCode LIKE '%" + pSearchKey + "%' ";

            objCvwCustomsClearanceAgents.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomsClearanceAgents.lstCVarvwCustomsClearanceAgents), _RowCount };
        }
		[HttpGet, HttpPost]
		public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
		{
			CvwCustomsClearanceAgents objCvwCustomsClearanceAgents = new CvwCustomsClearanceAgents();
			Int32 _RowCount = 0;
			objCvwCustomsClearanceAgents.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);

			return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomsClearanceAgents.lstCVarvwCustomsClearanceAgents), _RowCount };
		}
		// [Route("/api/CustomsClearanceAgents/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
		[HttpGet, HttpPost]
        public bool Insert(Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName, string pWebsite, bool pIsInactive, string pNotes, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarCustomsClearanceAgents objCVarCustomsClearanceAgents = new CVarCustomsClearanceAgents();

            objCVarCustomsClearanceAgents.PaymentTermID = pPaymentTermID;
            objCVarCustomsClearanceAgents.CurrencyID = pCurrencyID;
            objCVarCustomsClearanceAgents.TaxeTypeID = pTaxeTypeID;

            objCVarCustomsClearanceAgents.Code = pCode;
            objCVarCustomsClearanceAgents.Name = pName.Trim().ToUpper();
            objCVarCustomsClearanceAgents.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarCustomsClearanceAgents.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarCustomsClearanceAgents.IsInactive = pIsInactive;
            objCVarCustomsClearanceAgents.IsDeleted = pIsDeleted;
            objCVarCustomsClearanceAgents.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarCustomsClearanceAgents.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarCustomsClearanceAgents.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarCustomsClearanceAgents.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarCustomsClearanceAgents.TaxExemptToDate = pTaxExemptToDate;
			objCVarCustomsClearanceAgents.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarCustomsClearanceAgents.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarCustomsClearanceAgents.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarCustomsClearanceAgents.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarCustomsClearanceAgents.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarCustomsClearanceAgents.AccountID = pAccountID;
            objCVarCustomsClearanceAgents.SubAccountID = pSubAccountID;
            objCVarCustomsClearanceAgents.CostCenterID = pCostCenterID;
            objCVarCustomsClearanceAgents.SubAccountGroupID = pSubAccountGroupID;

            objCVarCustomsClearanceAgents.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarCustomsClearanceAgents.LockingUserID = 0;

            objCVarCustomsClearanceAgents.CreatorUserID = objCVarCustomsClearanceAgents.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustomsClearanceAgents.CreationDate = objCVarCustomsClearanceAgents.ModificationDate = DateTime.Now;

            objCVarCustomsClearanceAgents.CRM_Code = "0";
            objCVarCustomsClearanceAgents.BranchID = 0;
            objCVarCustomsClearanceAgents.SupplierID = 0;
            objCVarCustomsClearanceAgents.SalesmanID = 0;
            objCVarCustomsClearanceAgents.Finance365Ref = "0";

            CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
            objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents.Add(objCVarCustomsClearanceAgents);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_CustomsClearanceAgents.InsertUpdate_Fleet_Forwarding_CustomsClearanceAgents(objCVarCustomsClearanceAgents);
            else
                checkException = objCCustomsClearanceAgents.SaveMethod(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents);

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
                        objCCustomsClearanceAgents.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarCustomsClearanceAgents.ID);
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
            if ((CompanyName == "CHM" || CompanyName == "OCE") && checkException == null)
            {
                CVarCustomsClearanceAgentsTax objCVarCustomsClearanceAgentsTax = new CVarCustomsClearanceAgentsTax();

                objCVarCustomsClearanceAgentsTax.PaymentTermID = pPaymentTermID;
                objCVarCustomsClearanceAgentsTax.CurrencyID = pCurrencyID;
                objCVarCustomsClearanceAgentsTax.TaxeTypeID = pTaxeTypeID;

                objCVarCustomsClearanceAgentsTax.Code = pCode;
                objCVarCustomsClearanceAgentsTax.Name = pName.Trim().ToUpper();
                objCVarCustomsClearanceAgentsTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.IsInactive = pIsInactive;
                objCVarCustomsClearanceAgentsTax.IsDeleted = pIsDeleted;
                objCVarCustomsClearanceAgentsTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarCustomsClearanceAgentsTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarCustomsClearanceAgentsTax.AccountID = AccountID;
                objCVarCustomsClearanceAgentsTax.SubAccountID = 0;
                objCVarCustomsClearanceAgentsTax.CostCenterID = 0;
                objCVarCustomsClearanceAgentsTax.SubAccountGroupID = supGroupID;

                objCVarCustomsClearanceAgentsTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarCustomsClearanceAgentsTax.LockingUserID = 0;

                objCVarCustomsClearanceAgentsTax.CreatorUserID = objCVarCustomsClearanceAgentsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustomsClearanceAgentsTax.CreationDate = objCVarCustomsClearanceAgentsTax.ModificationDate = DateTime.Now;

                CCustomsClearanceAgentsTax objCCustomsClearanceAgentsTax = new CCustomsClearanceAgentsTax();
                objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax.Add(objCVarCustomsClearanceAgentsTax);
                 checkException = objCCustomsClearanceAgentsTax.SaveMethod(objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
            }
            #endregion
            return _result;
        }

        // [Route("/api/CustomsClearanceAgents/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName, string pWebsite, bool pIsInactive, string pNotes, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarCustomsClearanceAgents objCVarCustomsClearanceAgents = new CVarCustomsClearanceAgents();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCustomsClearanceAgents objCGetCreationInformation = new CCustomsClearanceAgents();
            objCGetCreationInformation.GetItem(pID);
            objCVarCustomsClearanceAgents.CreatorUserID = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].CreatorUserID;
            objCVarCustomsClearanceAgents.CreationDate = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].CreationDate;
            if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarCustomsClearanceAgents.AccountID = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].AccountID;
                objCVarCustomsClearanceAgents.SubAccountID = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].SubAccountID;
                objCVarCustomsClearanceAgents.CostCenterID = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].CostCenterID;
                objCVarCustomsClearanceAgents.SubAccountGroupID = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].SubAccountGroupID;
            }
            else
            {
                objCVarCustomsClearanceAgents.AccountID = pAccountID;
                objCVarCustomsClearanceAgents.SubAccountID = pSubAccountID;
                objCVarCustomsClearanceAgents.CostCenterID = pCostCenterID;
                objCVarCustomsClearanceAgents.SubAccountGroupID = pSubAccountGroupID;
            }
            objCVarCustomsClearanceAgents.ID = pID;

            objCVarCustomsClearanceAgents.PaymentTermID = pPaymentTermID;
            objCVarCustomsClearanceAgents.CurrencyID = pCurrencyID;
            objCVarCustomsClearanceAgents.TaxeTypeID = pTaxeTypeID;

            objCVarCustomsClearanceAgents.Code = pCode;
            objCVarCustomsClearanceAgents.Name = pName.Trim().ToUpper();
            objCVarCustomsClearanceAgents.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarCustomsClearanceAgents.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarCustomsClearanceAgents.IsInactive = pIsInactive;
            objCVarCustomsClearanceAgents.IsDeleted = pIsDeleted;
            objCVarCustomsClearanceAgents.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarCustomsClearanceAgents.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarCustomsClearanceAgents.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarCustomsClearanceAgents.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarCustomsClearanceAgents.TaxExemptToDate = pTaxExemptToDate;
			objCVarCustomsClearanceAgents.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarCustomsClearanceAgents.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarCustomsClearanceAgents.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarCustomsClearanceAgents.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarCustomsClearanceAgents.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());
            
            objCVarCustomsClearanceAgents.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarCustomsClearanceAgents.LockingUserID = 0;

            objCVarCustomsClearanceAgents.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustomsClearanceAgents.ModificationDate = DateTime.Now;

            objCVarCustomsClearanceAgents.CRM_Code = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].CRM_Code;
            objCVarCustomsClearanceAgents.BranchID = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].BranchID;
            objCVarCustomsClearanceAgents.SupplierID = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].SupplierID;
            objCVarCustomsClearanceAgents.SalesmanID = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].SalesmanID;
            objCVarCustomsClearanceAgents.Finance365Ref = objCGetCreationInformation.lstCVarCustomsClearanceAgents[0].Finance365Ref;

            CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
            objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents.Add(objCVarCustomsClearanceAgents);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_CustomsClearanceAgents.InsertUpdate_Fleet_Forwarding_CustomsClearanceAgents(objCVarCustomsClearanceAgents);
            else
                checkException = objCCustomsClearanceAgents.SaveMethod(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents);

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
                        objCCustomsClearanceAgents.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarCustomsClearanceAgents.ID);
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
            CCustomsClearanceAgentsTax objCCustomsClearanceAgentsTax = new CCustomsClearanceAgentsTax();
            objCCustomsClearanceAgentsTax.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

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
            if ((CompanyName == "CHM" || CompanyName == "OCE" ) && checkException == null && objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax.Count > 0)
            {
                CVarCustomsClearanceAgentsTax objCVarCustomsClearanceAgentsTax = new CVarCustomsClearanceAgentsTax();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CCustomsClearanceAgentsTax objCGetCreationInformationTax = new CCustomsClearanceAgentsTax();
                objCGetCreationInformationTax.GetItem(objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax[0].ID);
                objCVarCustomsClearanceAgentsTax.CreatorUserID = objCGetCreationInformationTax.lstCVarCustomsClearanceAgentsTax[0].CreatorUserID;
                objCVarCustomsClearanceAgentsTax.CreationDate = objCGetCreationInformationTax.lstCVarCustomsClearanceAgentsTax[0].CreationDate;
                if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
                {
                    objCVarCustomsClearanceAgentsTax.AccountID = AccountID > 0 ? AccountID : 0;
                    objCVarCustomsClearanceAgentsTax.SubAccountID = supID > 0 ? supID : 0;
                    objCVarCustomsClearanceAgentsTax.CostCenterID = 0;
                    objCVarCustomsClearanceAgentsTax.SubAccountGroupID = supGroupID;
                }
                else
                {

                    objCVarCustomsClearanceAgentsTax.AccountID = objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax[0].AccountID != 0 ? objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax[0].AccountID : AccountID;
                    objCVarCustomsClearanceAgentsTax.SubAccountID = objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax[0].SubAccountID != 0 ? objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax[0].SubAccountID : supID;
                    objCVarCustomsClearanceAgentsTax.CostCenterID = 0;
                    objCVarCustomsClearanceAgentsTax.SubAccountGroupID = objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax[0].SubAccountGroupID != 0 ? objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax[0].SubAccountGroupID : supGroupID;


                }
                objCVarCustomsClearanceAgentsTax.ID = objCCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax[0].ID;

                objCVarCustomsClearanceAgentsTax.PaymentTermID = pPaymentTermID;
                objCVarCustomsClearanceAgentsTax.CurrencyID = pCurrencyID;
                objCVarCustomsClearanceAgentsTax.TaxeTypeID = pTaxeTypeID;

                objCVarCustomsClearanceAgentsTax.Code = pCode;
                objCVarCustomsClearanceAgentsTax.Name = pName.Trim().ToUpper();
                objCVarCustomsClearanceAgentsTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.IsInactive = pIsInactive;
                objCVarCustomsClearanceAgentsTax.IsDeleted = pIsDeleted;
                objCVarCustomsClearanceAgentsTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarCustomsClearanceAgentsTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarCustomsClearanceAgentsTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarCustomsClearanceAgentsTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarCustomsClearanceAgentsTax.LockingUserID = 0;

                objCVarCustomsClearanceAgentsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustomsClearanceAgentsTax.ModificationDate = DateTime.Now;

                CCustomsClearanceAgentsTax objCCustomsClearanceAgentsTax2 = new CCustomsClearanceAgentsTax();
                objCCustomsClearanceAgentsTax2.lstCVarCustomsClearanceAgentsTax.Add(objCVarCustomsClearanceAgentsTax);
                 checkException = objCCustomsClearanceAgentsTax2.SaveMethod(objCCustomsClearanceAgentsTax2.lstCVarCustomsClearanceAgentsTax);
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
                            objCCustomsClearanceAgentsTax2.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarCustomsClearanceAgentsTax.ID);
                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount
                }
            }
            #endregion
            return _result;
        }

        // [Route("api/CustomsClearanceAgents/Delete/{pCustomsClearanceAgentsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCustomsClearanceAgentsIDs)
        {
            bool _result = false;
            CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
            CCustomsClearanceAgentsTax objCCustomsClearanceAgentsTax2 = new CCustomsClearanceAgentsTax();
            Exception checkException = null;
            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pCustomsClearanceAgentsIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_CustomsClearanceAgents.Delete_Fleet_Forwarding_CustomsClearanceAgents(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
                    if (checkException != null)
                    {
                        _result = false;
                        break;
                    }
                }

            }
            else
            {
                if (CompanyName == "CHM" || CompanyName == "OCE")
                {
                    foreach (var currentID in pCustomsClearanceAgentsIDs.Split(','))
                    {

                        CCustomsClearanceAgentsTax objCCustomsClearanceAgentsTAX = new CCustomsClearanceAgentsTax();
                        objCCustomsClearanceAgents.GetList("WHERE ID=" + currentID);
                        objCCustomsClearanceAgentsTAX.GetList("WHERE Name=N'" + objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0].Name + "'");
                        if (objCCustomsClearanceAgentsTAX.lstCVarCustomsClearanceAgentsTax.Count > 0)
                        {
                            objCCustomsClearanceAgentsTax2.lstDeletedCPKCustomsClearanceAgentsTax.Add(new CPKCustomsClearanceAgentsTax() { ID = objCCustomsClearanceAgentsTAX.lstCVarCustomsClearanceAgentsTax[0].ID });

                        }


                    }
                    checkException = objCCustomsClearanceAgentsTax2.DeleteItem(objCCustomsClearanceAgentsTax2.lstDeletedCPKCustomsClearanceAgentsTax);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                }
                foreach (var currentID in pCustomsClearanceAgentsIDs.Split(','))
                {
                    objCCustomsClearanceAgents.lstDeletedCPKCustomsClearanceAgents.Add(new CPKCustomsClearanceAgents() { ID = Int32.Parse(currentID.Trim()) });
                }

                 checkException = objCCustomsClearanceAgents.DeleteItem(objCCustomsClearanceAgents.lstDeletedCPKCustomsClearanceAgents);
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

        //[Route("/api/CustomsClearanceAgents/CheckRow/{pCustomsClearanceAgentsID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
            objCCustomsClearanceAgents.GetItem(int.Parse(pID));

            //if (objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0].TimeLocked = DateTime.Now;
                objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0].LockingUserID = WebSecurity.CurrentUserId; ;
                objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents.Add(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0]);
                objCCustomsClearanceAgents.SaveMethod(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/CustomsClearanceAgents/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
                objCCustomsClearanceAgents.GetItem(int.Parse(pID));

                objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0].LockingUserID = 0;
                objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents.Add(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0]);
                objCCustomsClearanceAgents.SaveMethod(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents);
                _result = true;
            }
            catch (Exception ex)
            {
                _result = false;//record is locked
            }
            return _result;
        }
        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_CustomsClearanceAgents([FromBody] InsertListFromExcel_CustomsClearanceAgents InsertListFromExcel_CustomsClearanceAgents)
        {
            string pReturnedMessage = "";
            Exception checkException = null;
            int _NumberOfRows = InsertListFromExcel_CustomsClearanceAgents.pNameList.Split(',').Length;
            CvwCustomsClearanceAgents objCvwCustomsClearanceAgents = new CvwCustomsClearanceAgents();
            var _ArrName = InsertListFromExcel_CustomsClearanceAgents.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_CustomsClearanceAgents.pLocalNameList.Split(',');
            var _ArrCompany = InsertListFromExcel_CustomsClearanceAgents.pCompanyList.Split(',');

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
                    CVarCustomsClearanceAgents objCVarCustomsClearanceAgents = new CVarCustomsClearanceAgents();
                    //objCVarCustomsClearanceAgents.TareWeight = decimal.Parse(_ArrTareWeight[i]);

                    objCVarCustomsClearanceAgents.PaymentTermID = 0;
                    objCVarCustomsClearanceAgents.CurrencyID = Defaults.lstCVarDefaults[0].CurrencyID;
                    objCVarCustomsClearanceAgents.TaxeTypeID = 0;

                    objCVarCustomsClearanceAgents.Code = 0;
                    objCVarCustomsClearanceAgents.Name = _ArrName[i];
                    objCVarCustomsClearanceAgents.LocalName = _ArrLocalName[i];
                    objCVarCustomsClearanceAgents.Website = "";
                    objCVarCustomsClearanceAgents.IsInactive = false;
                    objCVarCustomsClearanceAgents.IsDeleted = false;
                    objCVarCustomsClearanceAgents.Notes = "";
                    objCVarCustomsClearanceAgents.VATNumber = "";
                    objCVarCustomsClearanceAgents.IsConsolidatedInvoice = false;
                    objCVarCustomsClearanceAgents.BankName = "";
                    objCVarCustomsClearanceAgents.BankAddress = "";
                    objCVarCustomsClearanceAgents.Swift = "";
                    objCVarCustomsClearanceAgents.BankAccountNumber = "";
                    objCVarCustomsClearanceAgents.IBANNumber = "";

                    objCVarCustomsClearanceAgents.AccountID = 0;
                    objCVarCustomsClearanceAgents.SubAccountID = 0;
                    objCVarCustomsClearanceAgents.CostCenterID = 0;
                    objCVarCustomsClearanceAgents.SubAccountGroupID = 0;

                    objCVarCustomsClearanceAgents.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarCustomsClearanceAgents.LockingUserID = 0;
                    objCVarCustomsClearanceAgents.CreatorUserID = objCVarCustomsClearanceAgents.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarCustomsClearanceAgents.CreationDate = objCVarCustomsClearanceAgents.ModificationDate = DateTime.Now;

                    objCVarCustomsClearanceAgents.CRM_Code = "0";
                    objCVarCustomsClearanceAgents.BranchID = 0;
                    objCVarCustomsClearanceAgents.SupplierID = 0;
                    objCVarCustomsClearanceAgents.SalesmanID = 0;
                    objCVarCustomsClearanceAgents.Finance365Ref = "0";

                    if (UnEditableCompanyName == "TOP")
                    {
                        switch (_ArrCompany[i].ToUpper())
                        {
                            case "ALT":
                                var objCCustomsClearanceAgents_ALT = new Models.MasterData.Partners.Customized.CCustomsClearanceAgents_DynamicConnection(Helpers.Companies.InternalCompanies.Altun);
                                objCCustomsClearanceAgents_ALT.lstCVarCustomsClearanceAgents.Add(objCVarCustomsClearanceAgents);
                                checkException = objCCustomsClearanceAgents_ALT.SaveMethod(objCCustomsClearanceAgents_ALT.lstCVarCustomsClearanceAgents);
                                break;
                            case "EUR":
                                var objCCustomsClearanceAgents_EUR = new Models.MasterData.Partners.Customized.CCustomsClearanceAgents_DynamicConnection(Helpers.Companies.InternalCompanies.EUROShipping);
                                objCCustomsClearanceAgents_EUR.lstCVarCustomsClearanceAgents.Add(objCVarCustomsClearanceAgents);
                                checkException = objCCustomsClearanceAgents_EUR.SaveMethod(objCCustomsClearanceAgents_EUR.lstCVarCustomsClearanceAgents);
                                break;
                            case "MES":
                                var objCCustomsClearanceAgents_MES = new Models.MasterData.Partners.Customized.CCustomsClearanceAgents_DynamicConnection(Helpers.Companies.InternalCompanies.MESCO);
                                objCCustomsClearanceAgents_MES.lstCVarCustomsClearanceAgents.Add(objCVarCustomsClearanceAgents);
                                checkException = objCCustomsClearanceAgents_MES.SaveMethod(objCCustomsClearanceAgents_MES.lstCVarCustomsClearanceAgents);
                                break;
                            case "GLO":
                                var objCCustomsClearanceAgents_GLO = new Models.MasterData.Partners.Customized.CCustomsClearanceAgents_DynamicConnection(Helpers.Companies.InternalCompanies.GlobeLink);
                                objCCustomsClearanceAgents_GLO.lstCVarCustomsClearanceAgents.Add(objCVarCustomsClearanceAgents);
                                checkException = objCCustomsClearanceAgents_GLO.SaveMethod(objCCustomsClearanceAgents_GLO.lstCVarCustomsClearanceAgents);
                                break;
                            case "SAC":
                                var objCCustomsClearanceAgents_SAC = new Models.MasterData.Partners.Customized.CCustomsClearanceAgents_DynamicConnection(Helpers.Companies.InternalCompanies.SACO);
                                objCCustomsClearanceAgents_SAC.lstCVarCustomsClearanceAgents.Add(objCVarCustomsClearanceAgents);
                                checkException = objCCustomsClearanceAgents_SAC.SaveMethod(objCCustomsClearanceAgents_SAC.lstCVarCustomsClearanceAgents);
                                break;
                            default:
                                pReturnedMessage = "Company Column is not valid";
                                break;

                        }



                    }
                    else
                    {
                        CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
                        objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents.Add(objCVarCustomsClearanceAgents);
                        checkException = objCCustomsClearanceAgents.SaveMethod(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents);
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


    }

    public class InsertListFromExcel_CustomsClearanceAgents
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pCompanyList { get; set; }
    }
}

