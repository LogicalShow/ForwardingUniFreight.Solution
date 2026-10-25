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
    public class AirlinesController : ApiController
    {
        //[Route("/api/Airlines/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CAirlines objCAirlines = new CAirlines();
            objCAirlines.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCAirlines.lstCVarAirlines) };
        }

        // [Route("/api/Airlines/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwAirlines objCvwAirlines = new CvwAirlines();
            //objCvwAirlines.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwAirlines.lstCVarvwAirlines.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            //+ " OR ISOCode LIKE '%" + pSearchKey + "%' "
            //+ " OR PrintAs LIKE '%" + pSearchKey + "%' "
            //+ " OR CSizeCode LIKE '%" + pSearchKey + "%' "
            //+ " OR CTypeCode LIKE '%" + pSearchKey + "%' ";

            objCvwAirlines.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwAirlines.lstCVarvwAirlines), _RowCount };
        }
		[HttpGet, HttpPost]
		public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
		{
			CvwAirlines objCvwAirlines = new CvwAirlines();
			Int32 _RowCount = 0;

			objCvwAirlines.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Name ", out _RowCount);

			return new Object[] { new JavaScriptSerializer().Serialize(objCvwAirlines.lstCVarvwAirlines), _RowCount };
		}
		[HttpGet, HttpPost]
        public bool Insert(Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, string pCode
            , string pICAO, string pName, string pLocalName, string pWebsite, string pPrefix, string pAccountNumber
            , bool pIsCheckDigit, bool pIsLimitedLength, bool pIsInactive, string pNotes,string pcrmCode,string pFinance365Ref, string pVATNumber
            , bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false)
        {
           
            bool _result = false;
            CVarAirlines objCVarAirlines = new CVarAirlines();

            objCVarAirlines.PaymentTermID = pPaymentTermID;
            objCVarAirlines.CurrencyID = pCurrencyID;
            objCVarAirlines.TaxeTypeID = pTaxeTypeID;

            objCVarAirlines.ICAO = (pICAO == null ? "0" : pICAO.Trim().ToUpper());
            objCVarAirlines.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            objCVarAirlines.Name = pName.Trim().ToUpper();
            objCVarAirlines.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarAirlines.Prefix = (pPrefix == null ? "" : pPrefix.Trim().ToUpper());
            objCVarAirlines.AccountNumber = (pAccountNumber == null ? "" : pAccountNumber.Trim().ToUpper());
            objCVarAirlines.IsCheckDigit = pIsCheckDigit;
            objCVarAirlines.IsLimitedLength = pIsLimitedLength;
            objCVarAirlines.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarAirlines.IsInactive = pIsInactive;
            objCVarAirlines.IsDeleted = pIsDeleted;
            objCVarAirlines.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarAirlines.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarAirlines.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarAirlines.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarAirlines.TaxExemptToDate = pTaxExemptToDate;
			objCVarAirlines.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarAirlines.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarAirlines.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarAirlines.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarAirlines.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarAirlines.AccountID = pAccountID;
            objCVarAirlines.SubAccountID = pSubAccountID;
            objCVarAirlines.CostCenterID = pCostCenterID;
            objCVarAirlines.SubAccountGroupID = pSubAccountGroupID;

            objCVarAirlines.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarAirlines.LockingUserID = 0;

            objCVarAirlines.CreatorUserID = objCVarAirlines.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarAirlines.CreationDate = objCVarAirlines.ModificationDate = DateTime.Now;
            objCVarAirlines.crmCode = pcrmCode;
            objCVarAirlines.Finance365Ref = pFinance365Ref;

            CAirlines objCAirlines = new CAirlines();
            objCAirlines.lstCVarAirlines.Add(objCVarAirlines);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_Airlines.InsertUpdate_Fleet_Forwarding_Airlines(objCVarAirlines);
            else
                checkException = objCAirlines.SaveMethod(objCAirlines.lstCVarAirlines);

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
                        objCAirlines.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarAirlines.ID);
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
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null )
            {
                CVarAirlinesTAX objCVarAirlinesTax = new CVarAirlinesTAX();

                objCVarAirlinesTax.PaymentTermID = pPaymentTermID;
                objCVarAirlinesTax.CurrencyID = pCurrencyID;
                objCVarAirlinesTax.TaxeTypeID = pTaxeTypeID;

                objCVarAirlinesTax.ICAO = (pICAO == null ? "0" : pICAO.Trim().ToUpper());
                objCVarAirlinesTax.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
                objCVarAirlinesTax.Name = pName.Trim().ToUpper();
                objCVarAirlinesTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarAirlinesTax.Prefix = (pPrefix == null ? "" : pPrefix.Trim().ToUpper());
                objCVarAirlinesTax.AccountNumber = (pAccountNumber == null ? "" : pAccountNumber.Trim().ToUpper());
                objCVarAirlinesTax.IsCheckDigit = pIsCheckDigit;
                objCVarAirlinesTax.IsLimitedLength = pIsLimitedLength;
                objCVarAirlinesTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarAirlinesTax.IsInactive = pIsInactive;
                objCVarAirlinesTax.IsDeleted = pIsDeleted;
                objCVarAirlinesTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarAirlinesTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarAirlinesTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarAirlinesTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarAirlinesTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarAirlinesTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarAirlinesTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarAirlinesTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarAirlinesTax.AccountID = AccountID;
                objCVarAirlinesTax.SubAccountID = supID;
                objCVarAirlinesTax.CostCenterID = 0;
                objCVarAirlinesTax.SubAccountGroupID = supGroupID;

                objCVarAirlinesTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarAirlinesTax.LockingUserID = 0;

                objCVarAirlinesTax.CreatorUserID = objCVarAirlinesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAirlinesTax.CreationDate = objCVarAirlinesTax.ModificationDate = DateTime.Now;

                CAirlinesTAX objCAirlinesTax = new CAirlinesTAX();
                objCAirlinesTax.lstCVarAirlinesTAX.Add(objCVarAirlinesTax);
                checkException = objCAirlinesTax.SaveMethod(objCAirlinesTax.lstCVarAirlinesTAX);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else
                { //not unique
                    _result = true;
                    #region Create SubAccount
                    //int _RowCount = 0;
                    if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                    {
                        #region Get data to insert
                        CA_SubAccountsTAX objCA_SubAccountsTax = new CA_SubAccountsTAX();
                        checkException = objCA_SubAccountsTax.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount2);
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
                            checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount2);
                            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTax = new CA_SubAccounts_DetailsTAX(); //get the parent details
                            checkException = objCA_SubAccounts_DetailsTax.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount2);

                            for (int i = 0; i < objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details.Count; i++)
                            {
                                //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTAX", "I", pNewSubAccountID, objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                            }
                            #endregion add Details if exists
                            //Update Customer SubaccountID
                            objCAirlinesTax.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarAirlinesTax.ID);
                        }
                        #endregion Insert


                    }
                    #endregion Create SubAccount
                }
            }
            #endregion
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, string pCode, string pICAO, string pName, string pLocalName, string pWebsite, string pPrefix, string pAccountNumber, bool pIsCheckDigit, bool pIsLimitedLength, bool pIsInactive, string pNotes,string pcrmCode,string pFinance365Ref, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarAirlines objCVarAirlines = new CVarAirlines();
            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CAirlines objCGetCreationInformation = new CAirlines();
            objCGetCreationInformation.GetItem(pID);
            objCVarAirlines.CreatorUserID = objCGetCreationInformation.lstCVarAirlines[0].CreatorUserID;
            objCVarAirlines.CreationDate = objCGetCreationInformation.lstCVarAirlines[0].CreationDate;
            if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarAirlines.AccountID = objCGetCreationInformation.lstCVarAirlines[0].AccountID;
                objCVarAirlines.SubAccountID = objCGetCreationInformation.lstCVarAirlines[0].SubAccountID;
                objCVarAirlines.CostCenterID = objCGetCreationInformation.lstCVarAirlines[0].CostCenterID;
                objCVarAirlines.SubAccountGroupID = objCGetCreationInformation.lstCVarAirlines[0].SubAccountGroupID;
            }
            else
            {
                objCVarAirlines.AccountID = pAccountID;
                objCVarAirlines.SubAccountID = pSubAccountID;
                objCVarAirlines.CostCenterID = pCostCenterID;
                objCVarAirlines.SubAccountGroupID = pSubAccountGroupID;
            }
            objCVarAirlines.ID = pID;

            objCVarAirlines.PaymentTermID = pPaymentTermID;
            objCVarAirlines.CurrencyID = pCurrencyID;
            objCVarAirlines.TaxeTypeID = pTaxeTypeID;

            objCVarAirlines.ICAO = (pICAO == null ? "0" : pICAO.Trim().ToUpper());
            objCVarAirlines.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            objCVarAirlines.Name = pName.Trim().ToUpper();
            objCVarAirlines.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarAirlines.Prefix = (pPrefix == null ? "" : pPrefix.Trim().ToUpper());
            objCVarAirlines.AccountNumber = (pAccountNumber == null ? "" : pAccountNumber.Trim().ToUpper());
            objCVarAirlines.IsCheckDigit = pIsCheckDigit;
            objCVarAirlines.IsLimitedLength = pIsLimitedLength;
            objCVarAirlines.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarAirlines.IsInactive = pIsInactive;
            objCVarAirlines.IsDeleted = pIsDeleted;
            objCVarAirlines.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarAirlines.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarAirlines.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarAirlines.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarAirlines.TaxExemptToDate = pTaxExemptToDate;
			objCVarAirlines.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarAirlines.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarAirlines.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarAirlines.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarAirlines.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarAirlines.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarAirlines.LockingUserID = 0;
            objCVarAirlines.crmCode = objCGetCreationInformation.lstCVarAirlines[0].crmCode;
            objCVarAirlines.Finance365Ref = pFinance365Ref;

            objCVarAirlines.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarAirlines.ModificationDate = DateTime.Now;

            CAirlines objCAirlines = new CAirlines();
            objCAirlines.lstCVarAirlines.Add(objCVarAirlines);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_Airlines.InsertUpdate_Fleet_Forwarding_Airlines(objCVarAirlines);
            else
              checkException = objCAirlines.SaveMethod(objCAirlines.lstCVarAirlines);

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
                        objCAirlines.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarAirlines.ID);
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
            CAirlinesTAX objCCAirlinesTax =new CAirlinesTAX();
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

        
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null && objCCAirlinesTax.lstCVarAirlinesTAX.Count > 0)
            {
                CVarAirlinesTAX objCVarAirlinesTax = new CVarAirlinesTAX();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CAirlinesTAX objCGetCreationInformationTax = new CAirlinesTAX();
                objCGetCreationInformationTax.GetItem(objCCAirlinesTax.lstCVarAirlinesTAX[0].ID);
                objCVarAirlinesTax.CreatorUserID = objCGetCreationInformationTax.lstCVarAirlinesTAX[0].CreatorUserID;
                objCVarAirlinesTax.CreationDate = objCGetCreationInformationTax.lstCVarAirlinesTAX[0].CreationDate;
                if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
                {
                    objCVarAirlinesTax.AccountID = AccountID > 0 ? AccountID : 0;
                    objCVarAirlinesTax.SubAccountID = supID > 0 ? supID : 0;
                    objCVarAirlinesTax.CostCenterID = 0;
                    objCVarAirlinesTax.SubAccountGroupID = supGroupID;
                }
                else
                {
                    objCVarAirlinesTax.AccountID =  objCCAirlinesTax.lstCVarAirlinesTAX[0].AccountID != 0 ? objCCAirlinesTax.lstCVarAirlinesTAX[0].AccountID  : AccountID;
                    objCVarAirlinesTax.SubAccountID = objCCAirlinesTax.lstCVarAirlinesTAX[0].SubAccountID != 0 ? objCCAirlinesTax.lstCVarAirlinesTAX[0].SubAccountID : supID;
                    objCVarAirlinesTax.CostCenterID = 0;
                    objCVarAirlinesTax.SubAccountGroupID = objCCAirlinesTax.lstCVarAirlinesTAX[0].SubAccountGroupID != 0 ? objCCAirlinesTax.lstCVarAirlinesTAX[0].SubAccountGroupID : supGroupID;
                }
                objCVarAirlinesTax.ID = objCGetCreationInformationTax.lstCVarAirlinesTAX[0].ID;

                objCVarAirlinesTax.PaymentTermID = pPaymentTermID;
                objCVarAirlinesTax.CurrencyID = pCurrencyID;
                objCVarAirlinesTax.TaxeTypeID = pTaxeTypeID;

                objCVarAirlinesTax.ICAO = (pICAO == null ? "0" : pICAO.Trim().ToUpper());
                objCVarAirlinesTax.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
                objCVarAirlinesTax.Name = pName.Trim().ToUpper();
                objCVarAirlinesTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarAirlinesTax.Prefix = (pPrefix == null ? "" : pPrefix.Trim().ToUpper());
                objCVarAirlinesTax.AccountNumber = (pAccountNumber == null ? "" : pAccountNumber.Trim().ToUpper());
                objCVarAirlinesTax.IsCheckDigit = pIsCheckDigit;
                objCVarAirlinesTax.IsLimitedLength = pIsLimitedLength;
                objCVarAirlinesTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarAirlinesTax.IsInactive = pIsInactive;
                objCVarAirlinesTax.IsDeleted = pIsDeleted;
                objCVarAirlinesTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarAirlinesTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarAirlinesTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarAirlinesTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarAirlinesTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarAirlinesTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarAirlinesTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarAirlinesTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarAirlinesTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarAirlinesTax.LockingUserID = 0;

                objCVarAirlinesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarAirlinesTax.ModificationDate = DateTime.Now;

                CAirlinesTAX objCAirlinesTax = new CAirlinesTAX();
                objCAirlinesTax.lstCVarAirlinesTAX.Add(objCVarAirlinesTax);
                 checkException = objCAirlinesTax.SaveMethod(objCAirlinesTax.lstCVarAirlinesTAX);
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
                            objCAirlinesTax.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarAirlinesTax.ID);
                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount
                }
            }

            #endregion
            return _result;
        }

        // [Route("api/Airlines/Delete/{pAirlinesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pAirlinesIDs)
        {
            bool _result = false;
            CAirlines objCAirlines = new CAirlines();
            CAirlinesTAX objCAirlinesTAX2 = new CAirlinesTAX();
            Exception checkException = null;
            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pAirlinesIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_Airlines.Delete_Fleet_Forwarding_Airlines(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
                    if (checkException != null)
                    {
                        _result = false;
                        break;
                    }
                }

            }
            else
            {
                if (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI")
                {
                    foreach (var currentID in pAirlinesIDs.Split(','))
                    {

                        CAirlinesTAX objCAirlinesTAX = new CAirlinesTAX();
                        objCAirlines.GetList("WHERE ID=" + currentID);
                        objCAirlinesTAX.GetList("WHERE Name=N'" + objCAirlines.lstCVarAirlines[0].Name + "'");
                        if (objCAirlinesTAX.lstCVarAirlinesTAX.Count > 0)
                        {
                            objCAirlinesTAX2.lstDeletedCPKAirlines.Add(new CPKAirlinesTAX() { ID = objCAirlinesTAX.lstCVarAirlinesTAX[0].ID });

                        }


                    }
                    checkException = objCAirlinesTAX2.DeleteItem(objCAirlinesTAX2.lstDeletedCPKAirlines);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                }


                foreach (var currentID in pAirlinesIDs.Split(','))
                {
                    objCAirlines.lstDeletedCPKAirlines.Add(new CPKAirlines() { ID = Int32.Parse(currentID.Trim()) });
                }

                checkException = objCAirlines.DeleteItem(objCAirlines.lstDeletedCPKAirlines);
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
            CVarAirlines objCVarAirlines = new CVarAirlines();
            CAirlines objCAirlines = new CAirlines();
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            objCVarAirlines.PaymentTermID = 0;
            objCVarAirlines.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
            objCVarAirlines.TaxeTypeID = 0;

            objCVarAirlines.ICAO = "0";
            objCVarAirlines.Code = pCodeFromOperations;
            objCVarAirlines.Name = pNameFromOperations;
            objCVarAirlines.LocalName = pLocalNameFromOperations;
            objCVarAirlines.Prefix = pCodeFromOperations;
            objCVarAirlines.AccountNumber = "0";
            objCVarAirlines.IsCheckDigit = false;
            objCVarAirlines.IsLimitedLength = false;
            objCVarAirlines.Website = "";
            objCVarAirlines.IsInactive = false;
            objCVarAirlines.IsDeleted = false;
            objCVarAirlines.Notes = "";
            objCVarAirlines.VATNumber = "";
            objCVarAirlines.IsConsolidatedInvoice = false;
            objCVarAirlines.BankName = "";
            objCVarAirlines.BankAddress = "";
            objCVarAirlines.Swift = "";
            objCVarAirlines.BankAccountNumber = "";
            objCVarAirlines.IBANNumber = "";

            objCVarAirlines.AccountID = 0;
            objCVarAirlines.SubAccountID = 0;
            objCVarAirlines.CostCenterID = 0;
            objCVarAirlines.SubAccountGroupID = 0;

            objCVarAirlines.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarAirlines.LockingUserID = 0;
            objCVarAirlines.crmCode = "0";
            objCVarAirlines.Finance365Ref = "0";

            objCVarAirlines.CreatorUserID = objCVarAirlines.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarAirlines.CreationDate = objCVarAirlines.ModificationDate = DateTime.Now;

            objCAirlines.lstCVarAirlines.Add(objCVarAirlines);
            Exception checkException = objCAirlines.SaveMethod(objCAirlines.lstCVarAirlines);
            if (checkException == null) //get returned data
            {
                objCAirlines.GetList("WHERE IsInactive=0 ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarAirlines.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCAirlines.lstCVarAirlines) : null //pShippingLine = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_Airlines([FromBody] InsertListFromExcel_Airlines InsertListFromExcel_Airlines)
        {
            string pReturnedMessage = "";
            Exception checkException = null;
            int _NumberOfRows = InsertListFromExcel_Airlines.pNameList.Split(',').Length;
            CvwAirlines objCvwAirlines = new CvwAirlines();
            var _ArrName = InsertListFromExcel_Airlines.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_Airlines.pLocalNameList.Split(',');
            var _ArrPrefix = InsertListFromExcel_Airlines.pPrefixList.Split(',');
            var _ArrICAO = InsertListFromExcel_Airlines.pICAOList.Split(',');
            var _ArrIATACode = InsertListFromExcel_Airlines.pIATACodeList.Split(',');
            var _ArrCompany = InsertListFromExcel_Airlines.pCompanyList.Split(',');

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
                    CVarAirlines objCVarAirlines = new CVarAirlines();
                    //objCVarAirlines.TareWeight = decimal.Parse(_ArrTareWeight[i]);

                    objCVarAirlines.PaymentTermID = 0;
                    objCVarAirlines.CurrencyID = Defaults.lstCVarDefaults[0].CurrencyID;
                    objCVarAirlines.TaxeTypeID = 0;

                    objCVarAirlines.Prefix = _ArrPrefix[i];
                    objCVarAirlines.ICAO = _ArrICAO[i];
                    objCVarAirlines.Code = _ArrIATACode[i];
                    objCVarAirlines.Name = _ArrName[i];
                    objCVarAirlines.LocalName = _ArrLocalName[i];

                    objCVarAirlines.AccountNumber = "";
                    objCVarAirlines.IsCheckDigit = false;
                    objCVarAirlines.IsLimitedLength = false;

                    objCVarAirlines.Website = "";
                    objCVarAirlines.IsInactive = false;
                    objCVarAirlines.IsDeleted = false;
                    objCVarAirlines.Notes = "";
                    objCVarAirlines.VATNumber = "";
                    objCVarAirlines.IsConsolidatedInvoice = false;
                    objCVarAirlines.BankName = "";
                    objCVarAirlines.BankAddress = "";
                    objCVarAirlines.Swift = "";
                    objCVarAirlines.BankAccountNumber = "";
                    objCVarAirlines.IBANNumber = "";

                    objCVarAirlines.AccountID = 0;
                    objCVarAirlines.SubAccountID = 0;
                    objCVarAirlines.CostCenterID = 0;
                    objCVarAirlines.SubAccountGroupID = 0;

                    objCVarAirlines.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarAirlines.LockingUserID = 0;
                    objCVarAirlines.crmCode = "0";
                    objCVarAirlines.Finance365Ref = "0";

                    objCVarAirlines.CreatorUserID = objCVarAirlines.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarAirlines.CreationDate = objCVarAirlines.ModificationDate = DateTime.Now;


                    if (UnEditableCompanyName == "TOP")
                    {
                        switch (_ArrCompany[i].ToUpper())
                        {
                            case "ALT":
                                var objCAirlines_ALT = new Models.MasterData.Partners.Customized.CAirlines_DynamicConnection(Helpers.Companies.InternalCompanies.Altun);
                                objCAirlines_ALT.lstCVarAirlines.Add(objCVarAirlines);
                                checkException = objCAirlines_ALT.SaveMethod(objCAirlines_ALT.lstCVarAirlines);
                                break;
                            case "EUR":
                                var objCAirlines_EUR = new Models.MasterData.Partners.Customized.CAirlines_DynamicConnection(Helpers.Companies.InternalCompanies.EUROShipping);
                                objCAirlines_EUR.lstCVarAirlines.Add(objCVarAirlines);
                                checkException = objCAirlines_EUR.SaveMethod(objCAirlines_EUR.lstCVarAirlines);
                                break;
                            case "MES":
                                var objCAirlines_MES = new Models.MasterData.Partners.Customized.CAirlines_DynamicConnection(Helpers.Companies.InternalCompanies.MESCO);
                                objCAirlines_MES.lstCVarAirlines.Add(objCVarAirlines);
                                checkException = objCAirlines_MES.SaveMethod(objCAirlines_MES.lstCVarAirlines);
                                break;
                            case "GLO":
                                var objCAirlines_GLO = new Models.MasterData.Partners.Customized.CAirlines_DynamicConnection(Helpers.Companies.InternalCompanies.GlobeLink);
                                objCAirlines_GLO.lstCVarAirlines.Add(objCVarAirlines);
                                checkException = objCAirlines_GLO.SaveMethod(objCAirlines_GLO.lstCVarAirlines);
                                break;
                            case "SAC":
                                var objCAirlines_SAC = new Models.MasterData.Partners.Customized.CAirlines_DynamicConnection(Helpers.Companies.InternalCompanies.SACO);
                                objCAirlines_SAC.lstCVarAirlines.Add(objCVarAirlines);
                                checkException = objCAirlines_SAC.SaveMethod(objCAirlines_SAC.lstCVarAirlines);
                                break;
                            default:
                                pReturnedMessage = "Company Column is not valid";
                                break;

                        }



                    }
                    else
                    {
                        CAirlines objCAirlines = new CAirlines();
                        objCAirlines.lstCVarAirlines.Add(objCVarAirlines);
                        checkException = objCAirlines.SaveMethod(objCAirlines.lstCVarAirlines);
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

    public class InsertListFromExcel_Airlines
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pPrefixList { get; set; }
        public string pICAOList { get; set; }
        public string pIATACodeList { get; set; }
        public string pCompanyList { get; set; }
    }
}
