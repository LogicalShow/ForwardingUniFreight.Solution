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
    public class ShippingLinesController : ApiController
    {
        //[Route("/api/ShippingLines/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CShippingLines objCShippingLines = new CShippingLines();
            objCShippingLines.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines) };
        }

        // [Route("/api/ShippingLines/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwShippingLines objCvwShippingLines = new CvwShippingLines();
            //objCvwShippingLines.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwShippingLines.lstCVarvwShippingLines.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            //+ " OR ISOCode LIKE '%" + pSearchKey + "%' "
            //+ " OR PrintAs LIKE '%" + pSearchKey + "%' "
            //+ " OR CSizeCode LIKE '%" + pSearchKey + "%' "
            //+ " OR CTypeCode LIKE '%" + pSearchKey + "%' ";

            objCvwShippingLines.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwShippingLines.lstCVarvwShippingLines), _RowCount };
        }
		[HttpGet, HttpPost]
		public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
		{
			CvwShippingLines objCvwShippingLines = new CvwShippingLines();

			Int32 _RowCount = 0;
			
			objCvwShippingLines.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);

			return new Object[] { new JavaScriptSerializer().Serialize(objCvwShippingLines.lstCVarvwShippingLines), _RowCount };
		}
		// [Route("/api/ShippingLines/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
		[HttpGet, HttpPost]
        public bool Insert(Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, string pCode
            , string pName, string pLocalName, string pWebsite, bool pIsInactive, string pNotes,string pcrmCode,string pFinance365Ref, string pVATNumber
            , bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarShippingLines objCVarShippingLines = new CVarShippingLines();

            objCVarShippingLines.PaymentTermID = pPaymentTermID;
            objCVarShippingLines.CurrencyID = pCurrencyID;
            objCVarShippingLines.TaxeTypeID = pTaxeTypeID;

            objCVarShippingLines.Code = pCode.Trim().ToUpper();
            objCVarShippingLines.Name = pName.Trim().ToUpper();
            objCVarShippingLines.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarShippingLines.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarShippingLines.IsInactive = pIsInactive;
            objCVarShippingLines.IsDeleted = pIsDeleted;
            objCVarShippingLines.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarShippingLines.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarShippingLines.IsConsolidatedInvoice = pIsConsolidatedInvoice;
            objCVarShippingLines.TaxExemptFromDate = pTaxExemptFromDate;
            objCVarShippingLines.TaxExemptToDate = pTaxExemptToDate;
            objCVarShippingLines.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarShippingLines.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarShippingLines.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarShippingLines.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarShippingLines.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarShippingLines.AccountID = pAccountID;
            objCVarShippingLines.SubAccountID = pSubAccountID;
            objCVarShippingLines.CostCenterID = pCostCenterID;
            objCVarShippingLines.SubAccountGroupID = pSubAccountGroupID;

            objCVarShippingLines.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarShippingLines.LockingUserID = 0;
            objCVarShippingLines.crmCode = pcrmCode;
            objCVarShippingLines.Finance365Ref = pFinance365Ref;

            objCVarShippingLines.CreatorUserID = objCVarShippingLines.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarShippingLines.CreationDate = objCVarShippingLines.ModificationDate = DateTime.Now;

            objCVarShippingLines.BranchID = 0;
            objCVarShippingLines.SupplierID = 0;
            objCVarShippingLines.SalesmanID = 0;

            CShippingLines objCShippingLines = new CShippingLines();
            objCShippingLines.lstCVarShippingLines.Add(objCVarShippingLines);
            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_ShippingLines.InsertUpdate_Fleet_Forwarding_ShippingLines(objCVarShippingLines);
            else
                checkException = objCShippingLines.SaveMethod(objCShippingLines.lstCVarShippingLines);

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
                        objCShippingLines.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarShippingLines.ID);
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

            CShippingLinesTAX objCShippingLinesTAX = new CShippingLinesTAX();
            objCShippingLinesTAX.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

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
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null )
            {

                CVarShippingLinesTAX objCVarShippingLinesTAX = new CVarShippingLinesTAX();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CShippingLinesTAX objCGetCreationInformationTax = new CShippingLinesTAX();
                objCVarShippingLinesTAX.PaymentTermID = pPaymentTermID;
                objCVarShippingLinesTAX.CurrencyID = pCurrencyID;
                objCVarShippingLinesTAX.TaxeTypeID = pTaxeTypeID;

                objCVarShippingLinesTAX.Code = pCode.Trim().ToUpper();
                objCVarShippingLinesTAX.Name = pName.Trim().ToUpper();
                objCVarShippingLinesTAX.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarShippingLinesTAX.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarShippingLinesTAX.IsInactive = pIsInactive;
                objCVarShippingLinesTAX.IsDeleted = pIsDeleted;
                objCVarShippingLinesTAX.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarShippingLinesTAX.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarShippingLinesTAX.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarShippingLinesTAX.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarShippingLinesTAX.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarShippingLinesTAX.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarShippingLinesTAX.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarShippingLinesTAX.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarShippingLinesTAX.AccountID = AccountID;
                objCVarShippingLinesTAX.SubAccountID = supID;
                objCVarShippingLinesTAX.CostCenterID = 0;
                objCVarShippingLinesTAX.SubAccountGroupID = supGroupID;

                objCVarShippingLinesTAX.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarShippingLinesTAX.LockingUserID = 0;

                objCVarShippingLinesTAX.CreatorUserID = objCVarShippingLinesTAX.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarShippingLinesTAX.CreationDate = objCVarShippingLinesTAX.ModificationDate = DateTime.Now;


                CShippingLinesTAX objCShippingLinesTAX2 = new CShippingLinesTAX();
                objCShippingLinesTAX2.lstCVarShippingLines.Add(objCVarShippingLinesTAX);
                checkException = objCShippingLinesTAX2.SaveMethod(objCShippingLinesTAX2.lstCVarShippingLines);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
     
            }
            #endregion

            return _result;
        }

        // [Route("/api/ShippingLines/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, string pCode, string pName, string pLocalName, string pWebsite, bool pIsInactive, string pNotes,string pcrmCode,string pFinance365Ref, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarShippingLines objCVarShippingLines = new CVarShippingLines();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CShippingLines objCGetCreationInformation = new CShippingLines();
            objCGetCreationInformation.GetItem(pID);
            objCVarShippingLines.CreatorUserID = objCGetCreationInformation.lstCVarShippingLines[0].CreatorUserID;
            objCVarShippingLines.CreationDate = objCGetCreationInformation.lstCVarShippingLines[0].CreationDate;
            if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarShippingLines.AccountID = objCGetCreationInformation.lstCVarShippingLines[0].AccountID;
                objCVarShippingLines.SubAccountID = objCGetCreationInformation.lstCVarShippingLines[0].SubAccountID;
                objCVarShippingLines.CostCenterID = objCGetCreationInformation.lstCVarShippingLines[0].CostCenterID;
                objCVarShippingLines.SubAccountGroupID = objCGetCreationInformation.lstCVarShippingLines[0].SubAccountGroupID;
            }
            else
            {
                objCVarShippingLines.AccountID = pAccountID;
                objCVarShippingLines.SubAccountID = pSubAccountID;
                objCVarShippingLines.CostCenterID = pCostCenterID;
                objCVarShippingLines.SubAccountGroupID = pSubAccountGroupID;
            }
            objCVarShippingLines.ID = pID;

            objCVarShippingLines.PaymentTermID = pPaymentTermID;
            objCVarShippingLines.CurrencyID = pCurrencyID;
            objCVarShippingLines.TaxeTypeID = pTaxeTypeID;

            objCVarShippingLines.Code = pCode.Trim().ToUpper();
            objCVarShippingLines.Name = pName.Trim().ToUpper();
            objCVarShippingLines.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarShippingLines.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarShippingLines.IsInactive = pIsInactive;
            objCVarShippingLines.IsDeleted = pIsDeleted;
            objCVarShippingLines.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarShippingLines.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarShippingLines.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarShippingLines.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarShippingLines.TaxExemptToDate = pTaxExemptToDate;
			objCVarShippingLines.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarShippingLines.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarShippingLines.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarShippingLines.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarShippingLines.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarShippingLines.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarShippingLines.LockingUserID = 0;
            objCVarShippingLines.crmCode = objCGetCreationInformation.lstCVarShippingLines[0].crmCode;
            objCVarShippingLines.Finance365Ref = pFinance365Ref;

            objCVarShippingLines.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarShippingLines.ModificationDate = DateTime.Now;

            objCVarShippingLines.BranchID = objCGetCreationInformation.lstCVarShippingLines[0].BranchID;
            objCVarShippingLines.SupplierID = objCGetCreationInformation.lstCVarShippingLines[0].SupplierID;
            objCVarShippingLines.SalesmanID = objCGetCreationInformation.lstCVarShippingLines[0].SalesmanID;

            CShippingLines objCShippingLines = new CShippingLines();
            objCShippingLines.lstCVarShippingLines.Add(objCVarShippingLines);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_ShippingLines.InsertUpdate_Fleet_Forwarding_ShippingLines(objCVarShippingLines);
            else
                 checkException = objCShippingLines.SaveMethod(objCShippingLines.lstCVarShippingLines);

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
                        objCShippingLines.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarShippingLines.ID);
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

            CShippingLinesTAX objCShippingLinesTAX = new CShippingLinesTAX();
            objCShippingLinesTAX.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

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
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null && objCShippingLinesTAX.lstCVarShippingLines.Count > 0)
            {

                CVarShippingLinesTAX objCVarShippingLinesTAX = new CVarShippingLinesTAX();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CShippingLinesTAX objCGetCreationInformationTax = new CShippingLinesTAX();
                objCGetCreationInformationTax.GetItem(objCShippingLinesTAX.lstCVarShippingLines[0].ID);
                objCVarShippingLinesTAX.CreatorUserID = objCGetCreationInformationTax.lstCVarShippingLines[0].CreatorUserID;
                objCVarShippingLinesTAX.CreationDate = objCGetCreationInformationTax.lstCVarShippingLines[0].CreationDate;
                if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
                {
                    objCVarShippingLinesTAX.AccountID = AccountID > 0 ? AccountID : 0;
                    objCVarShippingLinesTAX.SubAccountID = supID > 0 ? supID : 0;
                    objCVarShippingLinesTAX.CostCenterID = 0;
                    objCVarShippingLinesTAX.SubAccountGroupID = supGroupID;
                }
                else
                {


                    objCVarShippingLinesTAX.AccountID = objCShippingLinesTAX.lstCVarShippingLines[0].AccountID != 0 ? objCShippingLinesTAX.lstCVarShippingLines[0].AccountID : AccountID;
                    objCVarShippingLinesTAX.SubAccountID = objCShippingLinesTAX.lstCVarShippingLines[0].SubAccountID != 0 ? objCShippingLinesTAX.lstCVarShippingLines[0].SubAccountID : supID;
                    objCVarShippingLinesTAX.CostCenterID = 0;
                    objCVarShippingLinesTAX.SubAccountGroupID = objCShippingLinesTAX.lstCVarShippingLines[0].SubAccountGroupID != 0 ? objCShippingLinesTAX.lstCVarShippingLines[0].SubAccountGroupID : supGroupID;

                }
                objCVarShippingLinesTAX.ID = objCGetCreationInformationTax.lstCVarShippingLines[0].ID;

                objCVarShippingLinesTAX.PaymentTermID = pPaymentTermID;
                objCVarShippingLinesTAX.CurrencyID = pCurrencyID;
                objCVarShippingLinesTAX.TaxeTypeID = pTaxeTypeID;

                objCVarShippingLinesTAX.Code = pCode.Trim().ToUpper();
                objCVarShippingLinesTAX.Name = pName.Trim().ToUpper();
                objCVarShippingLinesTAX.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarShippingLinesTAX.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarShippingLinesTAX.IsInactive = pIsInactive;
                objCVarShippingLinesTAX.IsDeleted = pIsDeleted;
                objCVarShippingLinesTAX.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarShippingLinesTAX.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarShippingLinesTAX.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarShippingLinesTAX.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarShippingLinesTAX.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarShippingLinesTAX.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarShippingLinesTAX.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarShippingLinesTAX.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarShippingLinesTAX.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarShippingLinesTAX.LockingUserID = 0;

                objCVarShippingLinesTAX.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarShippingLinesTAX.ModificationDate = DateTime.Now;

                CShippingLinesTAX objCShippingLinesTAX2 = new CShippingLinesTAX();
                objCShippingLinesTAX2.lstCVarShippingLines.Add(objCVarShippingLinesTAX);
                checkException = objCShippingLinesTAX2.SaveMethod(objCShippingLinesTAX2.lstCVarShippingLines);
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
                    if (pAccountID != 0 && pSubAccountGroupID != 0 && supID == 0)
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
                            objCShippingLinesTAX2.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarShippingLinesTAX.ID);
                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount
                }
            }
            #endregion
            return _result;
        }

        // [Route("api/ShippingLines/Delete/{pShippingLinesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pShippingLinesIDs)
        {
            bool _result = false;
            CShippingLines objCShippingLines = new CShippingLines();
            Exception checkException = null;
            CShippingLinesTAX objCShippingLinesTAX2 = new CShippingLinesTAX();

            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pShippingLinesIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_ShippingLines.Delete_Fleet_Forwarding_ShippingLines(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
                    if (checkException != null)
                    {
                        _result = false;
                        break;
                    }
                }

            }
            else
            {
                if (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM")
                {
                    foreach (var currentID in pShippingLinesIDs.Split(','))
                    {

                        CShippingLinesTAX objCShippingLinesTAX = new CShippingLinesTAX();
                        objCShippingLines.GetList("WHERE ID=" + currentID);
                        objCShippingLinesTAX.GetList("WHERE Name=N'" + objCShippingLines.lstCVarShippingLines[0].Name + "'");
                        if (objCShippingLinesTAX.lstCVarShippingLines.Count > 0)
                        {
                            objCShippingLinesTAX2.lstDeletedCPKShippingLines.Add(new CPKShippingLinesTAX() { ID = objCShippingLinesTAX.lstCVarShippingLines[0].ID });

                        }


                    }
                    checkException = objCShippingLinesTAX2.DeleteItem(objCShippingLinesTAX2.lstDeletedCPKShippingLines);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                }


                foreach (var currentID in pShippingLinesIDs.Split(','))
                {
                    objCShippingLines.lstDeletedCPKShippingLines.Add(new CPKShippingLines() { ID = Int32.Parse(currentID.Trim()) });
                }

                checkException = objCShippingLines.DeleteItem(objCShippingLines.lstDeletedCPKShippingLines);
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
        public object[] InsertFromOperations(string pCodeFromOperations, string pNameFromOperations, string pLocalNameFromOperations)
        {
            string _MessageReturned = "";
            int _RowCount = 0;
            CVarShippingLines objCVarShippingLines = new CVarShippingLines();
            CShippingLines objCShippingLines = new CShippingLines();
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            objCVarShippingLines.PaymentTermID = 0;
            objCVarShippingLines.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
            objCVarShippingLines.TaxeTypeID = 0;

            objCVarShippingLines.Code = pCodeFromOperations;
            objCVarShippingLines.Name = pNameFromOperations;
            objCVarShippingLines.LocalName = pLocalNameFromOperations;
            objCVarShippingLines.Website = "";
            objCVarShippingLines.IsInactive = false;
            objCVarShippingLines.IsDeleted = false;
            objCVarShippingLines.Notes = "";
            objCVarShippingLines.VATNumber = "";
            objCVarShippingLines.IsConsolidatedInvoice = false;
            objCVarShippingLines.BankName = "";
            objCVarShippingLines.BankAddress = "";
            objCVarShippingLines.Swift = "";
            objCVarShippingLines.BankAccountNumber = "";
            objCVarShippingLines.IBANNumber = "";

            objCVarShippingLines.AccountID = 0;
            objCVarShippingLines.SubAccountID = 0;
            objCVarShippingLines.CostCenterID = 0;
            objCVarShippingLines.SubAccountGroupID = 0;

            objCVarShippingLines.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarShippingLines.LockingUserID = 0;
            objCVarShippingLines.crmCode = "0";
            objCVarShippingLines.Finance365Ref = "0";

            objCVarShippingLines.CreatorUserID = objCVarShippingLines.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarShippingLines.CreationDate = objCVarShippingLines.ModificationDate = DateTime.Now;

            objCVarShippingLines.BranchID = 0;
            objCVarShippingLines.SupplierID = 0;
            objCVarShippingLines.SalesmanID = 0;
			Common.Common.ReplaceNull(objCVarShippingLines);
            objCShippingLines.lstCVarShippingLines.Add(objCVarShippingLines);
            Exception checkException = objCShippingLines.SaveMethod(objCShippingLines.lstCVarShippingLines);
            if (checkException == null) //get returned data
            {
                objCShippingLines.GetList("WHERE IsInactive=0 ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarShippingLines.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCShippingLines.lstCVarShippingLines) : null //pShippingLine = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_ShippingLines([FromBody] InsertListFromExcel_ShippingLines InsertListFromExcel_ShippingLines)
        {
            string pReturnedMessage = "";
            bool _result = true;
            Exception checkException = null;
            int _RowCount = 0;
            int _NumberOfRows = InsertListFromExcel_ShippingLines.pNameList.Split(',').Length;
            CvwShippingLines objCvwShippingLines = new CvwShippingLines();
            var _ArrName = InsertListFromExcel_ShippingLines.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_ShippingLines.pLocalNameList.Split(',');
            var _ArrSCAC_Code = InsertListFromExcel_ShippingLines.pSCAC_CodeList.Split(',');
            var _ArrCompany = InsertListFromExcel_ShippingLines.pCompanyList.Split(',');

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
                    CVarShippingLines objCVarShippingLines = new CVarShippingLines();
                    //objCVarShippingLines.TareWeight = decimal.Parse(_ArrTareWeight[i]);

                    objCVarShippingLines.PaymentTermID = 0;
                    objCVarShippingLines.CurrencyID = Defaults.lstCVarDefaults[0].CurrencyID;
                    objCVarShippingLines.TaxeTypeID = 0;

                    objCVarShippingLines.Code = _ArrSCAC_Code[i];
                    objCVarShippingLines.Name = _ArrName[i];
                    objCVarShippingLines.LocalName = _ArrLocalName[i];
                    objCVarShippingLines.Website = "";
                    objCVarShippingLines.IsInactive = false;
                    objCVarShippingLines.IsDeleted = false;
                    objCVarShippingLines.Notes = "";
                    objCVarShippingLines.VATNumber = "";
                    objCVarShippingLines.IsConsolidatedInvoice = false;
                    objCVarShippingLines.BankName = "";
                    objCVarShippingLines.BankAddress = "";
                    objCVarShippingLines.Swift = "";
                    objCVarShippingLines.BankAccountNumber = "";
                    objCVarShippingLines.IBANNumber = "";

                    objCVarShippingLines.AccountID = 0;
                    objCVarShippingLines.SubAccountID = 0;
                    objCVarShippingLines.CostCenterID = 0;
                    objCVarShippingLines.SubAccountGroupID = 0;

                    objCVarShippingLines.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarShippingLines.LockingUserID = 0;
                    objCVarShippingLines.crmCode = "0";
                    objCVarShippingLines.Finance365Ref = "0";

                    objCVarShippingLines.CreatorUserID = objCVarShippingLines.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarShippingLines.CreationDate = objCVarShippingLines.ModificationDate = DateTime.Now;

                    objCVarShippingLines.BranchID = 0;
                    objCVarShippingLines.SupplierID = 0;
                    objCVarShippingLines.SalesmanID = 0;

                    if (UnEditableCompanyName == "TOP")
                    {
                        switch (_ArrCompany[i].ToUpper())
                        {
                            case "ALT":
                                var objCShippingLines_ALT = new Models.MasterData.Partners.Customized.CShippingLines_DynamicConnection(Helpers.Companies.InternalCompanies.Altun);
                                objCShippingLines_ALT.lstCVarShippingLines.Add(objCVarShippingLines);
                                checkException = objCShippingLines_ALT.SaveMethod(objCShippingLines_ALT.lstCVarShippingLines);
                                break;
                            case "EUR":
                                var objCShippingLines_EUR = new Models.MasterData.Partners.Customized.CShippingLines_DynamicConnection(Helpers.Companies.InternalCompanies.EUROShipping);
                                objCShippingLines_EUR.lstCVarShippingLines.Add(objCVarShippingLines);
                                checkException = objCShippingLines_EUR.SaveMethod(objCShippingLines_EUR.lstCVarShippingLines);
                                break;
                            case "MES":
                                var objCShippingLines_MES = new Models.MasterData.Partners.Customized.CShippingLines_DynamicConnection(Helpers.Companies.InternalCompanies.MESCO);
                                objCShippingLines_MES.lstCVarShippingLines.Add(objCVarShippingLines);
                                checkException = objCShippingLines_MES.SaveMethod(objCShippingLines_MES.lstCVarShippingLines);
                                break;
                            case "GLO":
                                var objCShippingLines_GLO = new Models.MasterData.Partners.Customized.CShippingLines_DynamicConnection(Helpers.Companies.InternalCompanies.GlobeLink);
                                objCShippingLines_GLO.lstCVarShippingLines.Add(objCVarShippingLines);
                                checkException = objCShippingLines_GLO.SaveMethod(objCShippingLines_GLO.lstCVarShippingLines);
                                break;
                            case "SAC":
                                var objCShippingLines_SAC = new Models.MasterData.Partners.Customized.CShippingLines_DynamicConnection(Helpers.Companies.InternalCompanies.SACO);
                                objCShippingLines_SAC.lstCVarShippingLines.Add(objCVarShippingLines);
                                checkException = objCShippingLines_SAC.SaveMethod(objCShippingLines_SAC.lstCVarShippingLines);
                                break;
                            default:
                                pReturnedMessage = "Company Column is not valid";
                                break;

                        }



                    }
                    else
                    {
                        CShippingLines objCShippingLines = new CShippingLines();
                        objCShippingLines.lstCVarShippingLines.Add(objCVarShippingLines);
                        checkException = objCShippingLines.SaveMethod(objCShippingLines.lstCVarShippingLines);
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

    public class InsertListFromExcel_ShippingLines
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pSCAC_CodeList { get; set; }
        public string pCompanyList { get; set; }
    }
}
