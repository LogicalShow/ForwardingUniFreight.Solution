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
    public class ShippingAgentsController : ApiController
    {
        //[Route("/api/ShippingAgents/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CShippingAgents objCShippingAgents = new CShippingAgents();
            objCShippingAgents.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCShippingAgents.lstCVarShippingAgents) };
        }

        // [Route("/api/ShippingAgents/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwShippingAgents objCvwShippingAgents = new CvwShippingAgents();
            //objCvwShippingAgents.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwShippingAgents.lstCVarvwShippingAgents.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            //+ " OR ISOCode LIKE '%" + pSearchKey + "%' "
            //+ " OR PrintAs LIKE '%" + pSearchKey + "%' "
            //+ " OR CSizeCode LIKE '%" + pSearchKey + "%' "
            //+ " OR CTypeCode LIKE '%" + pSearchKey + "%' ";

            objCvwShippingAgents.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwShippingAgents.lstCVarvwShippingAgents), _RowCount };
        }
		[HttpGet, HttpPost]
		public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
		{
			CvwShippingAgents objCvwShippingAgents = new CvwShippingAgents();
			Int32 _RowCount = 0;
			objCvwShippingAgents.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);

			return new Object[] { new JavaScriptSerializer().Serialize(objCvwShippingAgents.lstCVarvwShippingAgents), _RowCount };
		}
		// [Route("/api/ShippingAgents/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
		[HttpGet, HttpPost]
        public bool Insert(Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName
            , string pWebsite, bool pIsInactive, string pNotes, string pForwarderAccountNumber, string pForwarderCreditNumber
            , string pLocalCustomsCode, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress
            , string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate
              , string PNationalID = "", string pKinz_Code = ""
		   , bool pIsDeleted = false)
        {
            bool _result = false;
            CVarShippingAgents objCVarShippingAgents = new CVarShippingAgents();

            objCVarShippingAgents.PaymentTermID = pPaymentTermID;
            objCVarShippingAgents.CurrencyID = pCurrencyID;
            objCVarShippingAgents.TaxeTypeID = pTaxeTypeID;

            objCVarShippingAgents.Code = pCode;
            objCVarShippingAgents.Name = pName.Trim().ToUpper();
            objCVarShippingAgents.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarShippingAgents.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarShippingAgents.IsInactive = pIsInactive;
            objCVarShippingAgents.IsDeleted = pIsDeleted;
            objCVarShippingAgents.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarShippingAgents.ForwarderAccountNumber = (pForwarderAccountNumber == null ? "" : pForwarderAccountNumber.Trim().ToUpper());
            objCVarShippingAgents.ForwarderCreditNumber = (pForwarderCreditNumber == null ? "" : pForwarderCreditNumber.Trim().ToUpper());
            objCVarShippingAgents.LocalCustomsCode = (pLocalCustomsCode == null ? "" : pLocalCustomsCode.Trim().ToUpper());
            objCVarShippingAgents.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarShippingAgents.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarShippingAgents.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarShippingAgents.TaxExemptToDate = pTaxExemptToDate;
			objCVarShippingAgents.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarShippingAgents.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarShippingAgents.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarShippingAgents.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarShippingAgents.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarShippingAgents.AccountID = pAccountID;
            objCVarShippingAgents.SubAccountID = pSubAccountID;
            objCVarShippingAgents.CostCenterID = pCostCenterID;
            objCVarShippingAgents.SubAccountGroupID = pSubAccountGroupID;

            objCVarShippingAgents.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarShippingAgents.LockingUserID = 0;

            objCVarShippingAgents.CreatorUserID = objCVarShippingAgents.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarShippingAgents.CreationDate = objCVarShippingAgents.ModificationDate = DateTime.Now;
            objCVarShippingAgents.National_ID = (PNationalID == null ? "" : PNationalID);
            objCVarShippingAgents.Kinz_Code = (pKinz_Code == null ? "" : pKinz_Code);

            CShippingAgents objCShippingAgents = new CShippingAgents();
            objCShippingAgents.lstCVarShippingAgents.Add(objCVarShippingAgents);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_ShippingAgents.InsertUpdate_Fleet_Forwarding_ShippingAgents(objCVarShippingAgents);
            else
                checkException = objCShippingAgents.SaveMethod(objCShippingAgents.lstCVarShippingAgents);

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
                        objCShippingAgents.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarShippingAgents.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        // [Route("/api/ShippingAgents/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pPaymentTermID, Int32 pCurrencyID, Int32 pTaxeTypeID, Int32 pCode, string pName, string pLocalName, string pWebsite, bool pIsInactive, string pNotes, string pForwarderAccountNumber, string pForwarderCreditNumber, string pLocalCustomsCode, string pVATNumber, bool pIsConsolidatedInvoice, string pBankName, string pBankAddress, string pSwift, string pBankAccountNumber, string pIBANNumber
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, DateTime pTaxExemptFromDate, DateTime pTaxExemptToDate
              , string PNationalID = "", string pKinz_Code = ""
			, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarShippingAgents objCVarShippingAgents = new CVarShippingAgents();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CShippingAgents objCGetCreationInformation = new CShippingAgents();
            objCGetCreationInformation.GetItem(pID);
            objCVarShippingAgents.CreatorUserID = objCGetCreationInformation.lstCVarShippingAgents[0].CreatorUserID;
            objCVarShippingAgents.CreationDate = objCGetCreationInformation.lstCVarShippingAgents[0].CreationDate;
            if (pAccountID == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarShippingAgents.AccountID = objCGetCreationInformation.lstCVarShippingAgents[0].AccountID;
                objCVarShippingAgents.SubAccountID = objCGetCreationInformation.lstCVarShippingAgents[0].SubAccountID;
                objCVarShippingAgents.CostCenterID = objCGetCreationInformation.lstCVarShippingAgents[0].CostCenterID;
                objCVarShippingAgents.SubAccountGroupID = objCGetCreationInformation.lstCVarShippingAgents[0].SubAccountGroupID;
            }
            else
            {
                objCVarShippingAgents.AccountID = pAccountID;
                objCVarShippingAgents.SubAccountID = pSubAccountID;
                objCVarShippingAgents.CostCenterID = pCostCenterID;
                objCVarShippingAgents.SubAccountGroupID = pSubAccountGroupID;
            }
            objCVarShippingAgents.ID = pID;

            objCVarShippingAgents.PaymentTermID = pPaymentTermID;
            objCVarShippingAgents.CurrencyID = pCurrencyID;
            objCVarShippingAgents.TaxeTypeID = pTaxeTypeID;

            objCVarShippingAgents.Code = pCode;
            objCVarShippingAgents.Name = pName.Trim().ToUpper();
            objCVarShippingAgents.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarShippingAgents.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarShippingAgents.IsInactive = pIsInactive;
            objCVarShippingAgents.IsDeleted = pIsDeleted;
            objCVarShippingAgents.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarShippingAgents.ForwarderAccountNumber = (pForwarderAccountNumber == null ? "" : pForwarderAccountNumber.Trim().ToUpper());
            objCVarShippingAgents.ForwarderCreditNumber = (pForwarderCreditNumber == null ? "" : pForwarderCreditNumber.Trim().ToUpper());
            objCVarShippingAgents.LocalCustomsCode = (pLocalCustomsCode == null ? "" : pLocalCustomsCode.Trim().ToUpper());
            objCVarShippingAgents.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarShippingAgents.IsConsolidatedInvoice = pIsConsolidatedInvoice;
			objCVarShippingAgents.TaxExemptFromDate = pTaxExemptFromDate;
			objCVarShippingAgents.TaxExemptToDate = pTaxExemptToDate;
			objCVarShippingAgents.BankName = (pBankName == null ? "" : pBankName.Trim().ToUpper());
            objCVarShippingAgents.BankAddress = (pBankAddress == null ? "" : pBankAddress.Trim().ToUpper());
            objCVarShippingAgents.Swift = (pSwift == null ? "" : pSwift.Trim().ToUpper());
            objCVarShippingAgents.BankAccountNumber = (pBankAccountNumber == null ? "" : pBankAccountNumber.Trim().ToUpper());
            objCVarShippingAgents.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarShippingAgents.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarShippingAgents.LockingUserID = 0;
            objCVarShippingAgents.National_ID = (PNationalID == null ? "" : PNationalID);
            objCVarShippingAgents.Kinz_Code = (pKinz_Code == null ? "" : pKinz_Code);

            objCVarShippingAgents.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarShippingAgents.ModificationDate = DateTime.Now;

            CShippingAgents objCShippingAgents = new CShippingAgents();
            objCShippingAgents.lstCVarShippingAgents.Add(objCVarShippingAgents);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_ShippingAgents.InsertUpdate_Fleet_Forwarding_ShippingAgents(objCVarShippingAgents);
            else
                 checkException = objCShippingAgents.SaveMethod(objCShippingAgents.lstCVarShippingAgents);

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
                        objCShippingAgents.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarShippingAgents.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        // [Route("api/ShippingAgents/Delete/{pShippingAgentsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pShippingAgentsIDs)
        {
            bool _result = false;
            Exception checkException = null;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pShippingAgentsIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_ShippingAgents.Delete_Fleet_Forwarding_ShippingAgents(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
                    if (checkException != null)
                    {
                        _result = false;
                        break;
                    }
                }

            }
            else
            {
                CShippingAgents objCShippingAgents = new CShippingAgents();
                foreach (var currentID in pShippingAgentsIDs.Split(','))
                {
                    objCShippingAgents.lstDeletedCPKShippingAgents.Add(new CPKShippingAgents() { ID = Int32.Parse(currentID.Trim()) });
                }

                 checkException = objCShippingAgents.DeleteItem(objCShippingAgents.lstDeletedCPKShippingAgents);
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

        //[Route("/api/ShippingAgents/CheckRow/{pShippingAgentsID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CShippingAgents objCShippingAgents = new CShippingAgents();
            objCShippingAgents.GetItem(int.Parse(pID));

            //if (objCShippingAgents.lstCVarShippingAgents[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCShippingAgents.lstCVarShippingAgents[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCShippingAgents.lstCVarShippingAgents[0].TimeLocked = DateTime.Now;
                objCShippingAgents.lstCVarShippingAgents[0].LockingUserID = WebSecurity.CurrentUserId; ;
                objCShippingAgents.lstCVarShippingAgents.Add(objCShippingAgents.lstCVarShippingAgents[0]);
                objCShippingAgents.SaveMethod(objCShippingAgents.lstCVarShippingAgents);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/ShippingAgents/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CShippingAgents objCShippingAgents = new CShippingAgents();
                objCShippingAgents.GetItem(int.Parse(pID));

                objCShippingAgents.lstCVarShippingAgents[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCShippingAgents.lstCVarShippingAgents[0].LockingUserID = 0;
                objCShippingAgents.lstCVarShippingAgents.Add(objCShippingAgents.lstCVarShippingAgents[0]);
                objCShippingAgents.SaveMethod(objCShippingAgents.lstCVarShippingAgents);
                _result = true;
            }
            catch (Exception ex)
            {
                _result = false;//record is locked
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_ShippingAgents([FromBody] InsertListFromExcel_ShippingAgents InsertListFromExcel_ShippingAgents)
        {
            string pReturnedMessage = "";
            bool _result = true;
            Exception checkException = null;
            int _RowCount = 0;
            int _NumberOfRows = InsertListFromExcel_ShippingAgents.pNameList.Split(',').Length;
            CvwShippingAgents objCvwShippingAgents = new CvwShippingAgents();
            var _ArrName = InsertListFromExcel_ShippingAgents.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_ShippingAgents.pLocalNameList.Split(',');
            var _ArrCompany = InsertListFromExcel_ShippingAgents.pCompanyList.Split(',');

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
                    CVarShippingAgents objCVarShippingAgents = new CVarShippingAgents();
                    //objCVarShippingAgents.TareWeight = decimal.Parse(_ArrTareWeight[i]);

                    objCVarShippingAgents.PaymentTermID = 0;
                    objCVarShippingAgents.CurrencyID = Defaults.lstCVarDefaults[0].CurrencyID;
                    objCVarShippingAgents.TaxeTypeID = 0;

                    objCVarShippingAgents.ForwarderAccountNumber = "";
                    objCVarShippingAgents.ForwarderCreditNumber = "";
                    objCVarShippingAgents.LocalCustomsCode = "";

                    objCVarShippingAgents.Code = 0;
                    objCVarShippingAgents.Name = _ArrName[i];
                    objCVarShippingAgents.LocalName = _ArrLocalName[i];
                    objCVarShippingAgents.Website = "";
                    objCVarShippingAgents.IsInactive = false;
                    objCVarShippingAgents.IsDeleted = false;
                    objCVarShippingAgents.Notes = "";
                    objCVarShippingAgents.VATNumber = "";
                    objCVarShippingAgents.IsConsolidatedInvoice = false;
                    objCVarShippingAgents.BankName = "";
                    objCVarShippingAgents.BankAddress = "";
                    objCVarShippingAgents.Swift = "";
                    objCVarShippingAgents.BankAccountNumber = "";
                    objCVarShippingAgents.IBANNumber = "";

                    objCVarShippingAgents.AccountID = 0;
                    objCVarShippingAgents.SubAccountID = 0;
                    objCVarShippingAgents.CostCenterID = 0;
                    objCVarShippingAgents.SubAccountGroupID = 0;

                    objCVarShippingAgents.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarShippingAgents.LockingUserID = 0;
                    objCVarShippingAgents.CreatorUserID = objCVarShippingAgents.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarShippingAgents.CreationDate = objCVarShippingAgents.ModificationDate = DateTime.Now;


                    if (UnEditableCompanyName == "TOP")
                    {
                        switch (_ArrCompany[i].ToUpper())
                        {
                            case "ALT":
                                var objCShippingAgents_ALT = new Models.MasterData.Partners.Customized.CShippingAgents_DynamicConnection(Helpers.Companies.InternalCompanies.Altun);
                                objCShippingAgents_ALT.lstCVarShippingAgents.Add(objCVarShippingAgents);
                                checkException = objCShippingAgents_ALT.SaveMethod(objCShippingAgents_ALT.lstCVarShippingAgents);
                                break;
                            case "EUR":
                                var objCShippingAgents_EUR = new Models.MasterData.Partners.Customized.CShippingAgents_DynamicConnection(Helpers.Companies.InternalCompanies.EUROShipping);
                                objCShippingAgents_EUR.lstCVarShippingAgents.Add(objCVarShippingAgents);
                                checkException = objCShippingAgents_EUR.SaveMethod(objCShippingAgents_EUR.lstCVarShippingAgents);
                                break;
                            case "MES":
                                var objCShippingAgents_MES = new Models.MasterData.Partners.Customized.CShippingAgents_DynamicConnection(Helpers.Companies.InternalCompanies.MESCO);
                                objCShippingAgents_MES.lstCVarShippingAgents.Add(objCVarShippingAgents);
                                checkException = objCShippingAgents_MES.SaveMethod(objCShippingAgents_MES.lstCVarShippingAgents);
                                break;
                            case "GLO":
                                var objCShippingAgents_GLO = new Models.MasterData.Partners.Customized.CShippingAgents_DynamicConnection(Helpers.Companies.InternalCompanies.GlobeLink);
                                objCShippingAgents_GLO.lstCVarShippingAgents.Add(objCVarShippingAgents);
                                checkException = objCShippingAgents_GLO.SaveMethod(objCShippingAgents_GLO.lstCVarShippingAgents);
                                break;
                            case "SAC":
                                var objCShippingAgents_SAC = new Models.MasterData.Partners.Customized.CShippingAgents_DynamicConnection(Helpers.Companies.InternalCompanies.SACO);
                                objCShippingAgents_SAC.lstCVarShippingAgents.Add(objCVarShippingAgents);
                                checkException = objCShippingAgents_SAC.SaveMethod(objCShippingAgents_SAC.lstCVarShippingAgents);
                                break;
                            default:
                                pReturnedMessage = "Company Column is not valid";
                                break;

                        }



                    }
                    else
                    {
                        CShippingAgents objCShippingAgents = new CShippingAgents();
                        objCShippingAgents.lstCVarShippingAgents.Add(objCVarShippingAgents);
                        checkException = objCShippingAgents.SaveMethod(objCShippingAgents.lstCVarShippingAgents);
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

    public class InsertListFromExcel_ShippingAgents
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pCompanyList { get; set; }
    }
}

