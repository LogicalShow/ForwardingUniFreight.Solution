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
    public class TruckersController : ApiController
    {
        //[Route("/api/Truckers/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CTruckers objCTruckers = new CTruckers();
            objCTruckers.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers) };
        }

        // [Route("/api/Truckers/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwTruckers objCvwTruckers = new CvwTruckers();
            //objCvwTruckers.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwTruckers.lstCVarvwTruckers.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' "
                + " OR VATNumber LIKE N'%" + pSearchKey + "%' ";
            //+ " OR ISOCode LIKE '%" + pSearchKey + "%' "
            //+ " OR PrintAs LIKE '%" + pSearchKey + "%' "
            //+ " OR CSizeCode LIKE '%" + pSearchKey + "%' "
            //+ " OR CTypeCode LIKE '%" + pSearchKey + "%' ";

            objCvwTruckers.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwTruckers.lstCVarvwTruckers), _RowCount };
        }
		[HttpGet, HttpPost]
		public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
		{
			CvwTruckers objCvwTruckers = new CvwTruckers();
			Int32 _RowCount = 0;
			objCvwTruckers.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);

			return new Object[] { new JavaScriptSerializer().Serialize(objCvwTruckers.lstCVarvwTruckers), _RowCount };
		}
		[HttpGet, HttpPost]
        public bool Insert(Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName
            , string pWebsite, bool pIsInactive, string pNotes,string pFinance365Ref, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName
            , string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID
            , string pInsuranceValidity , string pTransportLicenceValidity, string pGMPValidity, string pQUALIMATvalidity, string pISO9001validity
			, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false, string pCRM_Code = "")
        {
            bool _result = false;
            int _rowCount = 0;
            CVarTruckers objCVarTruckers = new CVarTruckers();
            CTruckers objCTrukers = new CTruckers();
            int rowcount = 0;
            CDefaults cDefaults = new CDefaults();
            cDefaults.GetListPaging(1, 1, "where 1=1", "id desc",out rowcount);
            objCTrukers.GetListPaging(99999,1,"WHERE VATNumber = "+pVATNumber , "ID",out _rowCount);
            var CheckExistVATNumber = objCTrukers.lstCVarTruckers.FirstOrDefault();


            if (CheckExistVATNumber != null)
            {
                    _result = false;
            }
            else
            {
                objCVarTruckers.PaymentTermID = pPaymentTermID;
                objCVarTruckers.CurrencyID = pCurrencyID;
                objCVarTruckers.TaxeTypeID = pTaxeTypeID;



                objCVarTruckers.Code = pCode;
                objCVarTruckers.Name = pName.Trim().ToUpper();
                objCVarTruckers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarTruckers.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarTruckers.IsInactive = pIsInactive;
                objCVarTruckers.IsDeleted = pIsDeleted;
                objCVarTruckers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarTruckers.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarTruckers.IsConsolidatedInvoice = pIsConsolidatedInvoice;
				objCVarTruckers.TaxExemptFromDate = pTaxExemptFromDate;
				objCVarTruckers.TaxExemptToDate = pTaxExemptToDate;
				objCVarTruckers.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarTruckers.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarTruckers.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarTruckers.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarTruckers.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                objCVarTruckers.AccountID = pAccountID;
                objCVarTruckers.SubAccountID = pSubAccountID;
                objCVarTruckers.CostCenterID = pCostCenterID;
                objCVarTruckers.SubAccountGroupID = pSubAccountGroupID;

                objCVarTruckers.InsuranceValidity = (pInsuranceValidity == null ? "0" : pInsuranceValidity);
                objCVarTruckers.TransportLicenceValidity = (pTransportLicenceValidity == null ? "0" : pTransportLicenceValidity);
                objCVarTruckers.GMPValidity = (pGMPValidity == null ? "0" : pGMPValidity);
                objCVarTruckers.QUALIMATvalidity = (pQUALIMATvalidity == null ? "0" : pQUALIMATvalidity);
                objCVarTruckers.ISO9001validity = (pISO9001validity == null ? "0" : pISO9001validity);

                objCVarTruckers.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarTruckers.LockingUserID = 0;
                objCVarTruckers.Finance365Ref = pFinance365Ref;

                objCVarTruckers.CreatorUserID = objCVarTruckers.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarTruckers.CreationDate = objCVarTruckers.ModificationDate = DateTime.Now;

                objCVarTruckers.BranchID = 0;
                objCVarTruckers.SalesmanID = 0;
                objCVarTruckers.CRM_Code = cDefaults.lstCVarDefaults[0].UnEditableCompanyName == "AKS"? pCRM_Code: "0";
                objCVarTruckers.SupplierID = 0;

                CTruckers objCTruckers = new CTruckers();
                objCTruckers.lstCVarTruckers.Add(objCVarTruckers);
                CSystemOptions objCSystemOptions = new CSystemOptions();
                objCSystemOptions.GetList("Where OptionID= 195");
                Exception checkException = null;
                if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                    checkException = Fleet_Forwarding_Truckers.InsertUpdate_Fleet_Forwarding_Truckers(objCVarTruckers);
                else
                    checkException = objCTruckers.SaveMethod(objCTruckers.lstCVarTruckers);

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
                            objCTruckers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarTruckers.ID);
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

                CTruckersTAX objCTruckersTTAX = new CTruckersTAX();
                objCTruckersTTAX.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

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
                    CVarTruckersTAX objCVarTruckersTax = new CVarTruckersTAX();

                    objCVarTruckersTax.PaymentTermID = pPaymentTermID;
                    objCVarTruckersTax.CurrencyID = pCurrencyID;
                    objCVarTruckersTax.TaxeTypeID = pTaxeTypeID;

                    objCVarTruckersTax.Code = pCode;
                    objCVarTruckersTax.Name = pName.Trim().ToUpper();
                    objCVarTruckersTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                    objCVarTruckersTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                    objCVarTruckersTax.IsInactive = pIsInactive;
                    objCVarTruckersTax.IsDeleted = pIsDeleted;
                    objCVarTruckersTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                    objCVarTruckersTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                    objCVarTruckersTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                    objCVarTruckersTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                    objCVarTruckersTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                    objCVarTruckersTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                    objCVarTruckersTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                    objCVarTruckersTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

                    objCVarTruckersTax.AccountID = pAccountID;
                    objCVarTruckersTax.SubAccountID = pSubAccountID;
                    objCVarTruckersTax.CostCenterID = pCostCenterID;
                    objCVarTruckersTax.SubAccountGroupID = pSubAccountGroupID;

                    objCVarTruckersTax.InsuranceValidity = (pInsuranceValidity == null ? "0" : pInsuranceValidity);
                    objCVarTruckersTax.TransportLicenceValidity = (pTransportLicenceValidity == null ? "0" : pTransportLicenceValidity);
                    objCVarTruckersTax.GMPValidity = (pGMPValidity == null ? "0" : pGMPValidity);
                    objCVarTruckersTax.QUALIMATvalidity = (pQUALIMATvalidity == null ? "0" : pQUALIMATvalidity);
                    objCVarTruckersTax.ISO9001validity = (pISO9001validity == null ? "0" : pISO9001validity);

                    objCVarTruckersTax.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarTruckersTax.LockingUserID = 0;

                    objCVarTruckersTax.CreatorUserID = objCVarTruckersTax.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarTruckersTax.CreationDate = objCVarTruckersTax.ModificationDate = DateTime.Now;

                    CTruckersTAX objCTruckersTax = new CTruckersTAX();
                    objCTruckersTax.lstCVarTruckers.Add(objCVarTruckersTax);
                    checkException = objCTruckersTax.SaveMethod(objCTruckersTax.lstCVarTruckers);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("UNIQUE"))
                            _result = false;
                    }
                    else
                    {
                        _result = true;

                    }
                }
                #endregion
            }


            return _result;
        }

        // [Route("/api/Truckers/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName, string pWebsite, bool pIsInactive, string pNotes,string pFinance365Ref, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID
            , string pInsuranceValidity, string pTransportLicenceValidity, string pGMPValidity, string pQUALIMATvalidity, string pISO9001validity
			, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate, bool pIsDeleted = false , string pCRM_Code = "")
        {
            bool _result = false;
            CVarTruckers objCVarTruckers = new CVarTruckers();
            int rowcount = 0;
            CDefaults cDefaults = new CDefaults();
            cDefaults.GetListPaging(1, 1, "where 1=1", "id desc",out rowcount);
            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CTruckers objCGetCreationInformation = new CTruckers();
            objCGetCreationInformation.GetItem(pID);
            objCVarTruckers.CreatorUserID = objCGetCreationInformation.lstCVarTruckers[0].CreatorUserID;
            objCVarTruckers.CreationDate = objCGetCreationInformation.lstCVarTruckers[0].CreationDate;
            if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarTruckers.AccountID = objCGetCreationInformation.lstCVarTruckers[0].AccountID;
                objCVarTruckers.SubAccountID = objCGetCreationInformation.lstCVarTruckers[0].SubAccountID;
                objCVarTruckers.CostCenterID = objCGetCreationInformation.lstCVarTruckers[0].CostCenterID;
                objCVarTruckers.SubAccountGroupID = objCGetCreationInformation.lstCVarTruckers[0].SubAccountGroupID;
            }
            else
            {
                objCVarTruckers.AccountID = pAccountID;
                objCVarTruckers.SubAccountID = pSubAccountID;
                objCVarTruckers.CostCenterID = pCostCenterID;
                objCVarTruckers.SubAccountGroupID = pSubAccountGroupID;
            }

            objCVarTruckers.ID = pID;

            objCVarTruckers.PaymentTermID = pPaymentTermID;
            objCVarTruckers.CurrencyID = pCurrencyID;
            objCVarTruckers.TaxeTypeID = pTaxeTypeID;

            objCVarTruckers.Code = pCode;
            objCVarTruckers.Name = pName.Trim().ToUpper();
            objCVarTruckers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarTruckers.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarTruckers.IsInactive = pIsInactive;
            objCVarTruckers.IsDeleted = pIsDeleted;
            objCVarTruckers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarTruckers.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarTruckers.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarTruckers.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarTruckers.TaxExemptToDate = pTaxExemptToDate;
			objCVarTruckers.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarTruckers.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarTruckers.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarTruckers.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarTruckers.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());


            objCVarTruckers.InsuranceValidity = (pInsuranceValidity == null ? "0" : pInsuranceValidity);
            objCVarTruckers.TransportLicenceValidity = (pTransportLicenceValidity == null ? "0" : pTransportLicenceValidity);
            objCVarTruckers.GMPValidity = (pGMPValidity == null ? "0" : pGMPValidity);
            objCVarTruckers.QUALIMATvalidity = (pQUALIMATvalidity == null ? "0" : pQUALIMATvalidity);
            objCVarTruckers.ISO9001validity = (pISO9001validity == null ? "0" : pISO9001validity);
            
            objCVarTruckers.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTruckers.LockingUserID = 0;
            objCVarTruckers.Finance365Ref = pFinance365Ref;

            objCVarTruckers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTruckers.ModificationDate = DateTime.Now;

            objCVarTruckers.BranchID = objCGetCreationInformation.lstCVarTruckers[0].BranchID;
            objCVarTruckers.SalesmanID = objCGetCreationInformation.lstCVarTruckers[0].SalesmanID;
            objCVarTruckers.CRM_Code = cDefaults.lstCVarDefaults[0].UnEditableCompanyName == "AKS" ? pCRM_Code : objCGetCreationInformation.lstCVarTruckers[0].CRM_Code;
            objCVarTruckers.SupplierID = objCGetCreationInformation.lstCVarTruckers[0].SupplierID;

            CTruckers objCTruckers = new CTruckers();
            objCTruckers.lstCVarTruckers.Add(objCVarTruckers);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_Truckers.InsertUpdate_Fleet_Forwarding_Truckers(objCVarTruckers);
            else
                checkException = objCTruckers.SaveMethod(objCTruckers.lstCVarTruckers);

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
                        objCTruckers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarTruckers.ID);
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

            CTruckersTAX objCTruckersTAX = new CTruckersTAX();
            objCTruckersTAX.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

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
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null && objCTruckersTAX.lstCVarTruckers.Count > 0)
            {
               
                CVarTruckersTAX objCVarTruckersTax = new CVarTruckersTAX();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CTruckersTAX objCGetCreationInformationTax = new CTruckersTAX();
                objCGetCreationInformationTax.GetItem(objCTruckersTAX.lstCVarTruckers[0].ID);
                objCVarTruckersTax.CreatorUserID = objCGetCreationInformationTax.lstCVarTruckers[0].CreatorUserID;
                objCVarTruckersTax.CreationDate = objCGetCreationInformationTax.lstCVarTruckers[0].CreationDate;
                if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
                {
                    objCVarTruckersTax.AccountID = AccountID > 0 ? AccountID : 0;
                    objCVarTruckersTax.SubAccountID = supID > 0 ? supID : 0;
                    objCVarTruckersTax.CostCenterID = 0;
                    objCVarTruckersTax.SubAccountGroupID = supGroupID;
                }
                else
                {
                    objCVarTruckersTax.AccountID = objCTruckersTAX.lstCVarTruckers[0].AccountID != 0 ? objCTruckersTAX.lstCVarTruckers[0].AccountID : AccountID; ;
                    objCVarTruckersTax.SubAccountID = objCTruckersTAX.lstCVarTruckers[0].SubAccountID != 0 ? objCTruckersTAX.lstCVarTruckers[0].SubAccountID : supID; ;
                    objCVarTruckersTax.CostCenterID = pCostCenterID;
                    objCVarTruckersTax.SubAccountGroupID = objCTruckersTAX.lstCVarTruckers[0].SubAccountGroupID != 0 ? objCTruckersTAX.lstCVarTruckers[0].SubAccountGroupID : supGroupID; ;
                }

                objCVarTruckersTax.ID = objCGetCreationInformationTax.lstCVarTruckers[0].ID;

                objCVarTruckersTax.PaymentTermID = pPaymentTermID;
                objCVarTruckersTax.CurrencyID = pCurrencyID;
                objCVarTruckersTax.TaxeTypeID = pTaxeTypeID;

                objCVarTruckersTax.Code = pCode;
                objCVarTruckersTax.Name = pName.Trim().ToUpper();
                objCVarTruckersTax.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
                objCVarTruckersTax.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
                objCVarTruckersTax.IsInactive = pIsInactive;
                objCVarTruckersTax.IsDeleted = pIsDeleted;
                objCVarTruckersTax.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
                objCVarTruckersTax.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
                objCVarTruckersTax.IsConsolidatedInvoice = pIsConsolidatedInvoice;
                objCVarTruckersTax.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
                objCVarTruckersTax.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
                objCVarTruckersTax.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
                objCVarTruckersTax.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
                objCVarTruckersTax.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());


                objCVarTruckersTax.InsuranceValidity = (pInsuranceValidity == null ? "0" : pInsuranceValidity);
                objCVarTruckersTax.TransportLicenceValidity = (pTransportLicenceValidity == null ? "0" : pTransportLicenceValidity);
                objCVarTruckersTax.GMPValidity = (pGMPValidity == null ? "0" : pGMPValidity);
                objCVarTruckersTax.QUALIMATvalidity = (pQUALIMATvalidity == null ? "0" : pQUALIMATvalidity);
                objCVarTruckersTax.ISO9001validity = (pISO9001validity == null ? "0" : pISO9001validity);

                objCVarTruckersTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarTruckersTax.LockingUserID = 0;

                objCVarTruckersTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarTruckersTax.ModificationDate = DateTime.Now;

                CTruckersTAX objCTruckersTax = new CTruckersTAX();
                objCTruckersTax.lstCVarTruckers.Add(objCVarTruckersTax);
               checkException = objCTruckersTax.SaveMethod(objCTruckersTax.lstCVarTruckers);
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
                            objCTruckersTax.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarTruckersTax.ID);
                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount
                }
            }
            #endregion
            return _result;
        }

        // [Route("api/Truckers/Delete/{pTruckersIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pTruckersIDs)
        {
            bool _result = false;
            CTruckers objCTruckers = new CTruckers();
            Exception checkException = null;

            CTruckersTAX objCTruckersTAX2 = new CTruckersTAX();

            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;


            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pTruckersIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_Truckers.Delete_Fleet_Forwarding_Truckers(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
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
                    foreach (var currentID in pTruckersIDs.Split(','))
                    {

                        CTruckersTAX objCTruckersTAX = new CTruckersTAX();
                        objCTruckers.GetList("WHERE ID=" + currentID);
                        objCTruckersTAX.GetList("WHERE Name=N'" + objCTruckers.lstCVarTruckers[0].Name + "'");
                        if (objCTruckersTAX.lstCVarTruckers.Count > 0)
                        {
                            objCTruckersTAX2.lstDeletedCPKTruckers.Add(new CPKTruckersTAX() { ID = objCTruckersTAX.lstCVarTruckers[0].ID });

                        }


                    }
                    objCTruckersTAX2.DeleteItem(objCTruckersTAX2.lstDeletedCPKTruckers);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                }


                foreach (var currentID in pTruckersIDs.Split(','))
                {
                    objCTruckers.lstDeletedCPKTruckers.Add(new CPKTruckers() { ID = Int32.Parse(currentID.Trim()) });
                }

                checkException = objCTruckers.DeleteItem(objCTruckers.lstDeletedCPKTruckers);
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
            CVarTruckers objCVarTruckers = new CVarTruckers();
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            objCVarTruckers.PaymentTermID = 0;
            objCVarTruckers.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
            objCVarTruckers.TaxeTypeID = 0;

            objCVarTruckers.Code = 0;
            objCVarTruckers.Name = pNameFromOperations;
            objCVarTruckers.LocalName = pLocalNameFromOperations;
            objCVarTruckers.Website = "";
            objCVarTruckers.IsInactive = false;
            objCVarTruckers.IsDeleted = false;
            objCVarTruckers.Notes = "";
            objCVarTruckers.VATNumber = "";
            objCVarTruckers.IsConsolidatedInvoice = false;
            objCVarTruckers.BankName = "";
            objCVarTruckers.BankAddress = "";
            objCVarTruckers.Swift = "";
            objCVarTruckers.BankAccountNumber = "";
            objCVarTruckers.IBANNumber = "";

            objCVarTruckers.AccountID = 0;
            objCVarTruckers.SubAccountID = 0;
            objCVarTruckers.CostCenterID = 0;
            objCVarTruckers.SubAccountGroupID = 0;

            objCVarTruckers.InsuranceValidity = "0";
            objCVarTruckers.TransportLicenceValidity = "0";
            objCVarTruckers.GMPValidity = "0";
            objCVarTruckers.QUALIMATvalidity = "0";
            objCVarTruckers.ISO9001validity = "0";

            objCVarTruckers.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTruckers.LockingUserID = 0;
            objCVarTruckers.Finance365Ref = "0";

            objCVarTruckers.CreatorUserID = objCVarTruckers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTruckers.CreationDate = objCVarTruckers.ModificationDate = DateTime.Now;

            objCVarTruckers.BranchID = 0;
            objCVarTruckers.SalesmanID = 0;
            objCVarTruckers.CRM_Code = "0";
            objCVarTruckers.SupplierID = 0;

            CTruckers objCTruckers = new CTruckers();
            objCTruckers.lstCVarTruckers.Add(objCVarTruckers);
            Exception checkException = objCTruckers.SaveMethod(objCTruckers.lstCVarTruckers);
            if (checkException == null) //get returned data
            {
                objCTruckers.GetList("WHERE IsInactive=0 ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarTruckers.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCTruckers.lstCVarTruckers) : null //pTruckers = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_Truckers([FromBody] InsertListFromExcel_Truckers InsertListFromExcel_Truckers)
        {
            string pReturnedMessage = "";
            bool _result = true;
            Exception checkException = null;
            int _RowCount = 0;
            int _NumberOfRows = InsertListFromExcel_Truckers.pNameList.Split(',').Length;
            CvwTruckers objCvwTruckers = new CvwTruckers();
            var _ArrName = InsertListFromExcel_Truckers.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_Truckers.pLocalNameList.Split(',');
            var _ArrCompany = InsertListFromExcel_Truckers.pCompanyList.Split(',');

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
                    CVarTruckers objCVarTruckers = new CVarTruckers();
                    //objCVarTruckers.TareWeight = decimal.Parse(_ArrTareWeight[i]);

                    objCVarTruckers.PaymentTermID = 0;
                    objCVarTruckers.CurrencyID = Defaults.lstCVarDefaults[0].CurrencyID;
                    objCVarTruckers.TaxeTypeID = 0;

                    objCVarTruckers.Code = 0;
                    objCVarTruckers.Name = _ArrName[i];
                    objCVarTruckers.LocalName = _ArrLocalName[i];
                    objCVarTruckers.Website = "";
                    objCVarTruckers.IsInactive = false;
                    objCVarTruckers.IsDeleted = false;
                    objCVarTruckers.Notes = "";
                    objCVarTruckers.VATNumber = "";
                    objCVarTruckers.IsConsolidatedInvoice = false;
                    objCVarTruckers.BankName = "";
                    objCVarTruckers.BankAddress = "";
                    objCVarTruckers.Swift = "";
                    objCVarTruckers.BankAccountNumber = "";
                    objCVarTruckers.IBANNumber = "";

                    objCVarTruckers.InsuranceValidity = "0";
                    objCVarTruckers.TransportLicenceValidity = "0";
                    objCVarTruckers.GMPValidity = "0";
                    objCVarTruckers.QUALIMATvalidity = "0";
                    objCVarTruckers.ISO9001validity = "0";

                    objCVarTruckers.AccountID = 0;
                    objCVarTruckers.SubAccountID = 0;
                    objCVarTruckers.CostCenterID = 0;
                    objCVarTruckers.SubAccountGroupID = 0;
                    objCVarTruckers.Finance365Ref = "0";

                    objCVarTruckers.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarTruckers.LockingUserID = 0;
                    objCVarTruckers.CreatorUserID = objCVarTruckers.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarTruckers.CreationDate = objCVarTruckers.ModificationDate = DateTime.Now;

                    objCVarTruckers.BranchID = 0;
                    objCVarTruckers.SalesmanID = 0;
                    objCVarTruckers.CRM_Code = "0";
                    objCVarTruckers.SupplierID = 0;

                    if (UnEditableCompanyName == "TOP")
                    {
                        switch (_ArrCompany[i].ToUpper())
                        {
                            case "ALT":
                                var objCTruckers_ALT = new Models.MasterData.Partners.Customized.CTruckers_DynamicConnection(Helpers.Companies.InternalCompanies.Altun);
                                objCTruckers_ALT.lstCVarTruckers.Add(objCVarTruckers);
                                checkException = objCTruckers_ALT.SaveMethod(objCTruckers_ALT.lstCVarTruckers);
                                break;
                            case "EUR":
                                var objCTruckers_EUR = new Models.MasterData.Partners.Customized.CTruckers_DynamicConnection(Helpers.Companies.InternalCompanies.EUROShipping);
                                objCTruckers_EUR.lstCVarTruckers.Add(objCVarTruckers);
                                checkException = objCTruckers_EUR.SaveMethod(objCTruckers_EUR.lstCVarTruckers);
                                break;
                            case "MES":
                                var objCTruckers_MES = new Models.MasterData.Partners.Customized.CTruckers_DynamicConnection(Helpers.Companies.InternalCompanies.MESCO);
                                objCTruckers_MES.lstCVarTruckers.Add(objCVarTruckers);
                                checkException = objCTruckers_MES.SaveMethod(objCTruckers_MES.lstCVarTruckers);
                                break;
                            case "GLO":
                                var objCTruckers_GLO = new Models.MasterData.Partners.Customized.CTruckers_DynamicConnection(Helpers.Companies.InternalCompanies.GlobeLink);
                                objCTruckers_GLO.lstCVarTruckers.Add(objCVarTruckers);
                                checkException = objCTruckers_GLO.SaveMethod(objCTruckers_GLO.lstCVarTruckers);
                                break;
                            case "SAC":
                                var objCTruckers_SAC = new Models.MasterData.Partners.Customized.CTruckers_DynamicConnection(Helpers.Companies.InternalCompanies.SACO);
                                objCTruckers_SAC.lstCVarTruckers.Add(objCVarTruckers);
                                checkException = objCTruckers_SAC.SaveMethod(objCTruckers_SAC.lstCVarTruckers);
                                break;
                            default:
                                pReturnedMessage = "Company Column is not valid";
                                break;

                        }



                    }
                    else
                    {
                        CTruckers objCTruckers = new CTruckers();
                        objCTruckers.lstCVarTruckers.Add(objCVarTruckers);
                        checkException = objCTruckers.SaveMethod(objCTruckers.lstCVarTruckers);
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

    public class InsertListFromExcel_Truckers
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pCompanyList { get; set; }
    }
}