using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_BanksAccountsAndTreasuries
{
    public class CustodyController : ApiController
    {

        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCustody objCvwCustody = new CvwCustody();
            objCvwCustody.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustody.lstCVarvwCustody) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwCustody objCvwCustody = new CvwCustody();
            //objCCustody.GetList(string.Empty); //GetList() fn loads without paging



            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCvwCustody.lstCVarvwCustody.Count;
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            objCvwCustody.GetListPaging(pPageSize, pPageNumber, whereClause, "Name", out _RowCount);


            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustody.lstCVarvwCustody), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] GetUsers(int type)
        {
            int _RowCount1 = 0;
           CUsers objCUsers = new CUsers();

            if (type==1)
            {
                objCUsers.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount1);

            }
            else
            {
                objCUsers.GetListPaging(999999, 1, "WHERE id NOT IN(SELECT c.UserID FROM Custody AS c WHERE c.UserID IS NOT null)", "ID", out _RowCount1);
            }


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] { serializer.Serialize(objCUsers.lstCVarUsers) };

        }

        [HttpGet, HttpPost]
        public bool Insert(string pName, string pLocalName, string pJob, string pAddress, string pMobile, string pPhone, string pNotes, string pFinance365Ref
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, Int32 pUserID)
        {
            bool _result = false;

            CVarCustody objCVarCustody = new CVarCustody();

            objCVarCustody.Name = pName.ToUpper();
            objCVarCustody.LocalName = pLocalName;
            objCVarCustody.Job = pJob;
            objCVarCustody.Address = pAddress;
            objCVarCustody.Mobile = pMobile;
            objCVarCustody.Phone = pPhone;
            objCVarCustody.Notes = pNotes;

            objCVarCustody.AccountID = pAccountID;
            objCVarCustody.SubAccountID = pSubAccountID;
            objCVarCustody.CostCenterID = pCostCenterID;
            objCVarCustody.SubAccountGroupID = pSubAccountGroupID;
            objCVarCustody.UserID = pUserID;
            objCVarCustody.Finance365Ref = pFinance365Ref;

            objCVarCustody.CreatorUserID = objCVarCustody.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustody.CreationDate = objCVarCustody.ModificationDate = DateTime.Now;

            CCustody objCCustody = new CCustody();
            objCCustody.lstCVarCustody.Add(objCVarCustody);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_Custody.InsertUpdate_Fleet_Forwarding_Custody(objCVarCustody);
            else
                 checkException = objCCustody.SaveMethod(objCCustody.lstCVarCustody);

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
                        int pNewSupAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSupAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSupAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update Customer SubaccountID
                        objCCustody.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarCustody.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }


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
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null)
            {
                CVarCustodyTAX objCVarCustodyTax = new CVarCustodyTAX();

                objCVarCustodyTax.Name = pName.ToUpper();
                objCVarCustodyTax.LocalName = pLocalName;
                objCVarCustodyTax.Job = pJob;
                objCVarCustodyTax.Address = pAddress;
                objCVarCustodyTax.Mobile = pMobile;
                objCVarCustodyTax.Phone = pPhone;
                objCVarCustodyTax.Notes = pNotes;

                objCVarCustodyTax.AccountID = AccountID;
                objCVarCustodyTax.SubAccountID = 0;
                objCVarCustodyTax.CostCenterID = 0;
                objCVarCustodyTax.SubAccountGroupID = supGroupID;
                objCVarCustodyTax.UserID = pUserID;

                objCVarCustodyTax.CreatorUserID = objCVarCustodyTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustodyTax.CreationDate = objCVarCustodyTax.ModificationDate = DateTime.Now;

                CCustodyTAX objCCustodyTax = new CCustodyTAX();
                objCCustodyTax.lstCVarCustodyTAX.Add(objCVarCustodyTax);
                checkException = objCCustodyTax.SaveMethod(objCCustodyTax.lstCVarCustodyTAX);
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
                        checkException = objCA_SubAccountsTax.GetListPaging(9999, 1, "WHERE ID = " + supGroupID.ToString(), "ID", out _RowCount);
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
                            checkException = objCA_SubAccounts_DetailsTax.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + supGroupID.ToString(), "SubAccount_ID", out _RowCount);
                            for (int i = 0; i < objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details.Count; i++)
                            {
                                //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTAX", "I", pNewSubAccountID, objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                            }
                            #endregion add Details if exists
                            //Update Customer SubaccountID
                            objCCustodyTax.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarCustodyTax.ID);
                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount
                }
            }


            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName, string pLocalName, string pJob, string pAddress, string pMobile, string pPhone, string pNotes, string pFinance365Ref
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, Int32 pUserID)
        {
            bool _result = false;

            CVarCustody objCVarCustody = new CVarCustody();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCustody objCGetCreationInformation = new CCustody();
            objCGetCreationInformation.GetItem(pID);
            objCVarCustody.CreatorUserID = objCGetCreationInformation.lstCVarCustody[0].CreatorUserID;
            objCVarCustody.CreationDate = objCGetCreationInformation.lstCVarCustody[0].CreationDate;
            objCVarCustody.Code = objCGetCreationInformation.lstCVarCustody[0].Code;

            objCVarCustody.ID = pID;
            objCVarCustody.Name = pName.ToUpper();
            objCVarCustody.LocalName = pLocalName;
            objCVarCustody.Job = pJob;
            objCVarCustody.Address = pAddress;
            objCVarCustody.Mobile = pMobile;
            objCVarCustody.Phone = pPhone;
            objCVarCustody.Notes = pNotes;
            objCVarCustody.UserID = pUserID;

            objCVarCustody.AccountID = pAccountID;
            objCVarCustody.SubAccountID = pSubAccountID;
            objCVarCustody.CostCenterID = pCostCenterID;
            objCVarCustody.SubAccountGroupID = pSubAccountGroupID;
            objCVarCustody.Finance365Ref = pFinance365Ref;

            objCVarCustody.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustody.ModificationDate = DateTime.Now;

            CCustody objCCustody = new CCustody();
            objCCustody.lstCVarCustody.Add(objCVarCustody);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_Custody.InsertUpdate_Fleet_Forwarding_Custody(objCVarCustody);
            else
                 checkException = objCCustody.SaveMethod(objCCustody.lstCVarCustody);

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
                        int pNewSupAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSupAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSupAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update Customer SubaccountID
                        objCCustody.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarCustody.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }

            int _RowCount2 = 0;
            Int32 supID = 0;
            Int32 supGroupID = 0;
            Int32 AccountID = 0;

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CCustodyTAX objCCustodyTAX = new CCustodyTAX();
            objCCustodyTAX.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

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
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null && objCCustodyTAX.lstCVarCustodyTAX.Count > 0)
            {
                CVarCustodyTAX objCVarCustodyTax = new CVarCustodyTAX();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CCustodyTAX objCGetCreationInformationTax = new CCustodyTAX();
                objCGetCreationInformationTax.GetItem(objCCustodyTAX.lstCVarCustodyTAX[0].ID);
                objCVarCustodyTax.CreatorUserID = objCGetCreationInformationTax.lstCVarCustodyTAX[0].CreatorUserID;
                objCVarCustodyTax.CreationDate = objCGetCreationInformationTax.lstCVarCustodyTAX[0].CreationDate;
                objCVarCustodyTax.Code = objCGetCreationInformationTax.lstCVarCustodyTAX[0].Code;
                
                objCVarCustodyTax.ID = objCCustodyTAX.lstCVarCustodyTAX[0].ID;
                objCVarCustodyTax.Name = pName.ToUpper();
                objCVarCustodyTax.LocalName = pLocalName;
                objCVarCustodyTax.Job = pJob;
                objCVarCustodyTax.Address = pAddress;
                objCVarCustodyTax.Mobile = pMobile;
                objCVarCustodyTax.Phone = pPhone;
                objCVarCustodyTax.Notes = pNotes;
                objCVarCustodyTax.UserID = pUserID;
                
                objCVarCustodyTax.AccountID = AccountID;
                objCVarCustodyTax.SubAccountID = supID;
                objCVarCustodyTax.CostCenterID = 0;
                objCVarCustodyTax.SubAccountGroupID = supGroupID;
                
                objCVarCustodyTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustodyTax.ModificationDate = DateTime.Now;

                CCustodyTAX objCCustodyTax = new CCustodyTAX();
                objCCustodyTax.lstCVarCustodyTAX.Add(objCVarCustodyTax);
                checkException = objCCustodyTax.SaveMethod(objCCustodyTax.lstCVarCustodyTAX);
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
                            objCCustodyTax.UpdateList("SubAccountID=" + objCVarA_SubAccountsTax.ID + " WHERE ID=" + objCVarCustodyTax.ID);
                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount
                }
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pCustodyIDs)
        {
            bool _result = false;
            CCustody objCCustody = new CCustody();

            Exception checkException = null;

            CCustodyTAX objCCustodyTAX2 = new CCustodyTAX();

            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pCustodyIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_Custody.Delete_Fleet_Forwarding_Custody(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
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
                    foreach (var currentID in pCustodyIDs.Split(','))
                    {

                        CCustodyTAX objCTruckersTAX = new CCustodyTAX();
                        objCCustody.GetList("WHERE ID=" + currentID);
                        objCTruckersTAX.GetList("WHERE Name=N'" + objCCustody.lstCVarCustody[0].Name + "'");
                        if (objCTruckersTAX.lstCVarCustodyTAX.Count > 0)
                        {
                            objCCustodyTAX2.lstDeletedCPKCustodyTAX.Add(new CPKCustodyTAX() { ID = objCTruckersTAX.lstCVarCustodyTAX[0].ID });

                        }


                    }
                    objCCustodyTAX2.DeleteItem(objCCustodyTAX2.lstDeletedCPKCustodyTAX);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                            _result = false;
                    }

                }

                foreach (var currentID in pCustodyIDs.Split(','))
                {
                    objCCustody.lstDeletedCPKCustody.Add(new CPKCustody() { ID = Int32.Parse(currentID.Trim()) });
                }

                checkException = objCCustody.DeleteItem(objCCustody.lstDeletedCPKCustody);
            }
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
    }
}
