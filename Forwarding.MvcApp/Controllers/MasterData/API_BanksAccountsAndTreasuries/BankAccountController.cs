using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
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
    public class BankAccountController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwBankAccount objCvwBankAccount = new CvwBankAccount();
            objCvwBankAccount.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwBankAccount.lstCVarvwBankAccount) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            if (pIsLoadArrayOfObjects)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                CSystemOptions objCSystemOptions = new CSystemOptions();
                objCSystemOptions.GetList(" Where OptionID=201");
                if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                {
                    //objCvwA_Accounts.GetListPaging(99999, 1, "WHERE IsMain=0 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )", "Name, Code", out _RowCount);
                    objCvwA_Accounts.GetListPaging(99999, 1, "WHERE IsMain=0 And ID in (select AA.AccountID from Users_Activities UA join A_Accounts_Activities AA on AA.ActivityCostCenterID = UA.ActivityCostCenterID where UA.UserID=" + WebSecurity.CurrentUserId + ")", "Name, Code", out _RowCount);

                }
                else
                {
                    objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                }
                  

                objCA_JournalTypes.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
            }
            CvwBankAccount objCvwBankAccount = new CvwBankAccount();
            objCvwBankAccount.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwBankAccount.lstCVarvwBankAccount)
                , _RowCount
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //pAccounts = pData[2]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCA_JournalTypes.lstCVarA_JournalTypes) : null //pJournalTypes = pData[3]
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName, string pLocalName, string pAccountName, string pAccountNumber, int pCurrencyID, string pNotes
            , Int32 pAccount_ID, Int32 pNotesPayable, Int32 pNotesPayableUnderCollection, Int32 pNotesReceivable
            , Int32 pNotesReceivableUnderCollection, Int32 pCollectionExpenses, decimal pBankMinimumLimit
            , Int32 pBankDocumentID, Int32 pInJournalTypeID, Int32 pOutJournalTypeID, string pPrintedAs, Int32 pBankSubAccountID,Int32 pIsOnlineBank)
        {
            bool _result = false;

            CVarBankAccount objCVarBankAccount = new CVarBankAccount();

            objCVarBankAccount.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            objCVarBankAccount.Name = pName.ToUpper();
            objCVarBankAccount.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
            objCVarBankAccount.AccountName = (pAccountName == null ? "0" : pAccountName.ToUpper());
            objCVarBankAccount.AccountNumber = (pAccountNumber == null ? "0" : pAccountNumber.ToUpper());
            objCVarBankAccount.DefaultCurrencyID = pCurrencyID;
            objCVarBankAccount.Notes = (pNotes == null ? "0" : pNotes.ToUpper());

            objCVarBankAccount.Account_ID = pAccount_ID;
            objCVarBankAccount.BankSubAccountID= pBankSubAccountID;
            objCVarBankAccount.NotesPayable = pNotesPayable;
            objCVarBankAccount.NotesPayableUnderCollection = pNotesPayableUnderCollection;
            objCVarBankAccount.NotesReceivable = pNotesReceivable;
            objCVarBankAccount.NotesReceivableUnderCollection = pNotesReceivableUnderCollection;
            objCVarBankAccount.CollectionExpenses = pCollectionExpenses;
            objCVarBankAccount.BankMinimumLimit = pBankMinimumLimit;
            objCVarBankAccount.BankDocumentID = pBankDocumentID;
            objCVarBankAccount.InJournalTypeID = pInJournalTypeID;
            objCVarBankAccount.OutJournalTypeID = pOutJournalTypeID;
            objCVarBankAccount.PrintedAs = (pPrintedAs == null ? "0" : pPrintedAs.ToUpper());
            objCVarBankAccount.IsOnlineBank = pIsOnlineBank;
            

            objCVarBankAccount.CreatorUserID = objCVarBankAccount.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarBankAccount.CreationDate = objCVarBankAccount.ModificationDate = DateTime.Now;

            CBankAccount objCBankAccount = new CBankAccount();
            objCBankAccount.lstCVarBankAccount.Add(objCVarBankAccount);
            Exception checkException = objCBankAccount.SaveMethod(objCBankAccount.lstCVarBankAccount);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;

            #region Tax
            int _RowCount2 = 0;
            Int32 supID = 0;
            Int32 supGroupID = 0;
            Int32 AccountID = 0;

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            //CTruckersTAX objCTruckersTAX = new CTruckersTAX();
            //objCTruckersTAX.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

            CA_AccountsTAX objCAccountsTAX = new CA_AccountsTAX(); //get the parent details


            //Account
            CA_Accounts objCACA_Accounts = new CA_Accounts(); //get the parent details
            checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pAccount_ID, "ID", out _RowCount2);


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
                CVarBankAccountTAX objCVarBankAccountTax = new CVarBankAccountTAX();

                objCVarBankAccountTax.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
                objCVarBankAccountTax.Name = pName.ToUpper();
                objCVarBankAccountTax.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
                objCVarBankAccountTax.AccountName = (pAccountName == null ? "0" : pAccountName.ToUpper());
                objCVarBankAccountTax.AccountNumber = (pAccountNumber == null ? "0" : pAccountNumber.ToUpper());
                objCVarBankAccountTax.DefaultCurrencyID = pCurrencyID;
                objCVarBankAccountTax.Notes = (pNotes == null ? "0" : pNotes.ToUpper());

                objCVarBankAccountTax.Account_ID = AccountID;
                objCVarBankAccountTax.NotesPayable = pNotesPayable;
                objCVarBankAccountTax.NotesPayableUnderCollection = pNotesPayableUnderCollection;
                objCVarBankAccountTax.NotesReceivable = pNotesReceivable;
                objCVarBankAccountTax.NotesReceivableUnderCollection = pNotesReceivableUnderCollection;
                objCVarBankAccountTax.CollectionExpenses = pCollectionExpenses;
                objCVarBankAccountTax.BankMinimumLimit = pBankMinimumLimit;
                objCVarBankAccountTax.BankDocumentID = pBankDocumentID;
                objCVarBankAccountTax.InJournalTypeID = pInJournalTypeID;
                objCVarBankAccountTax.OutJournalTypeID = pOutJournalTypeID;
                objCVarBankAccountTax.PrintedAs = (pPrintedAs == null ? "0" : pPrintedAs.ToUpper());


                objCVarBankAccountTax.CreatorUserID = objCVarBankAccountTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarBankAccountTax.CreationDate = objCVarBankAccountTax.ModificationDate = DateTime.Now;

                CBankAccountTAX objCBankAccountTax = new CBankAccountTAX();
                objCBankAccountTax.lstCVarBankAccount.Add(objCVarBankAccountTax);
                checkException = objCBankAccountTax.SaveMethod(objCBankAccountTax.lstCVarBankAccount);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;

            }

            #endregion

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, string pLocalName, string pAccountName, string pAccountNumber, int pCurrencyID, string pNotes
            , Int32 pAccount_ID, Int32 pNotesPayable, Int32 pNotesPayableUnderCollection, Int32 pNotesReceivable
            , Int32 pNotesReceivableUnderCollection, Int32 pCollectionExpenses, decimal pBankMinimumLimit
            , Int32 pBankDocumentID, Int32 pInJournalTypeID, Int32 pOutJournalTypeID, string pPrintedAs, Int32 pBankSubAccountID,Int32 pIsOnlineBank)
        {
            bool _result = false;

            CVarBankAccount objCVarBankAccount = new CVarBankAccount();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CBankAccount objCGetCreationInformation = new CBankAccount();
            objCGetCreationInformation.GetItem(pID);
            objCVarBankAccount.CreatorUserID = objCGetCreationInformation.lstCVarBankAccount[0].CreatorUserID;
            objCVarBankAccount.CreationDate = objCGetCreationInformation.lstCVarBankAccount[0].CreationDate;

            objCVarBankAccount.ID = pID;
            objCVarBankAccount.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            objCVarBankAccount.Name = pName.ToUpper();
            objCVarBankAccount.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
            objCVarBankAccount.AccountName = (pAccountName == null ? "0" : pAccountName.ToUpper());
            objCVarBankAccount.AccountNumber = (pAccountNumber == null ? "0" : pAccountNumber.ToUpper());
            objCVarBankAccount.DefaultCurrencyID = pCurrencyID;
            objCVarBankAccount.Notes = (pNotes == null ? "0" : pNotes.ToUpper());

            objCVarBankAccount.Account_ID = pAccount_ID;
            objCVarBankAccount.BankSubAccountID = pBankSubAccountID;
            objCVarBankAccount.NotesPayable = pNotesPayable;
            objCVarBankAccount.NotesPayableUnderCollection = pNotesPayableUnderCollection;
            objCVarBankAccount.NotesReceivable = pNotesReceivable;
            objCVarBankAccount.NotesReceivableUnderCollection = pNotesReceivableUnderCollection;
            objCVarBankAccount.CollectionExpenses = pCollectionExpenses;
            objCVarBankAccount.BankMinimumLimit = pBankMinimumLimit;
            objCVarBankAccount.BankDocumentID = pBankDocumentID;
            objCVarBankAccount.InJournalTypeID = pInJournalTypeID;
            objCVarBankAccount.OutJournalTypeID = pOutJournalTypeID;
            objCVarBankAccount.PrintedAs = (pPrintedAs == null ? "0" : pPrintedAs.ToUpper());
            objCVarBankAccount.IsOnlineBank = pIsOnlineBank;
            

            objCVarBankAccount.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarBankAccount.ModificationDate = DateTime.Now;

            CBankAccount objCBankAccount = new CBankAccount();
            objCBankAccount.lstCVarBankAccount.Add(objCVarBankAccount);
            Exception checkException = objCBankAccount.SaveMethod(objCBankAccount.lstCVarBankAccount);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;

            #region Tax
            int _RowCount2 = 0;
            Int32 supID = 0;
            Int32 supGroupID = 0;
            Int32 AccountID = 0;
            Int32 NotesPayable = 0;
            Int32 NotesPayableUnderCollection = 0;
            Int32 NotesReceivable = 0;
            Int32 NotesReceivableUnderCollection = 0;
            Int32 CollectionExpenses = 0;


            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CBankAccountTAX objCBankAccountTAX = new CBankAccountTAX();
            objCBankAccountTAX.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

            CA_AccountsTAX objCAccountsTAX = new CA_AccountsTAX(); //get the parent details


            //Account
            CA_Accounts objCACA_Accounts = new CA_Accounts(); //get the parent details
            checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pAccount_ID, "ID", out _RowCount2);

            if (objCACA_Accounts.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_Accounts.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    AccountID = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            //NotesPayable
            CA_Accounts objCACA_AccountsNotesPayable = new CA_Accounts(); //get the parent details
            checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pNotesPayable, "ID", out _RowCount2);

            if (objCACA_Accounts.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_Accounts.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    NotesPayable = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            //NotesPayableUnderCollection
            CA_Accounts objCACA_AccountsNotesPayableUnderCollection = new CA_Accounts(); //get the parent details
            checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pNotesPayableUnderCollection, "ID", out _RowCount2);

            if (objCACA_Accounts.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_Accounts.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    NotesPayableUnderCollection = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            //pNotesReceivable
            CA_Accounts objCACA_AccountsNotesReceivable = new CA_Accounts(); //get the parent details
            checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pNotesReceivable, "ID", out _RowCount2);

            if (objCACA_Accounts.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_Accounts.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    NotesReceivable = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            //NotesReceivableUnderCollection
            CA_Accounts objCACA_AccountsNotesReceivableUnderCollection = new CA_Accounts(); //get the parent details
            checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pNotesReceivableUnderCollection, "ID", out _RowCount2);

            if (objCACA_Accounts.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_Accounts.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    NotesReceivableUnderCollection = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            //NotesReceivableUnderCollection
            CA_Accounts objCACA_AccountsCollectionExpenses = new CA_Accounts(); //get the parent details
            checkException = objCACA_Accounts.GetListPaging(9999, 1, "WHERE ID = " + pCollectionExpenses, "ID", out _RowCount2);

            if (objCACA_Accounts.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_Accounts.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    CollectionExpenses = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }


            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null && objCBankAccountTAX.lstCVarBankAccount.Count > 0)
            {
                CVarBankAccountTAX objCVarBankAccountTax = new CVarBankAccountTAX();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CBankAccountTAX objCGetCreationInformationTax = new CBankAccountTAX();
                objCGetCreationInformationTax.GetItem(objCBankAccountTAX.lstCVarBankAccount[0].ID);
                objCVarBankAccountTax.CreatorUserID = objCGetCreationInformationTax.lstCVarBankAccount[0].CreatorUserID;
                objCVarBankAccountTax.CreationDate = objCGetCreationInformationTax.lstCVarBankAccount[0].CreationDate;

                objCVarBankAccountTax.ID = objCBankAccountTAX.lstCVarBankAccount[0].ID;
                objCVarBankAccountTax.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
                objCVarBankAccountTax.Name = pName.ToUpper();
                objCVarBankAccountTax.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
                objCVarBankAccountTax.AccountName = (pAccountName == null ? "0" : pAccountName.ToUpper());
                objCVarBankAccountTax.AccountNumber = (pAccountNumber == null ? "0" : pAccountNumber.ToUpper());
                objCVarBankAccountTax.DefaultCurrencyID = pCurrencyID;
                objCVarBankAccountTax.Notes = (pNotes == null ? "0" : pNotes.ToUpper());

                objCVarBankAccountTax.Account_ID = AccountID;
                objCVarBankAccountTax.NotesPayable = NotesPayable;
                objCVarBankAccountTax.NotesPayableUnderCollection = NotesPayableUnderCollection;
                objCVarBankAccountTax.NotesReceivable = NotesReceivable;
                objCVarBankAccountTax.NotesReceivableUnderCollection = NotesReceivableUnderCollection;
                objCVarBankAccountTax.CollectionExpenses = CollectionExpenses;
                objCVarBankAccountTax.BankMinimumLimit = pBankMinimumLimit;
                objCVarBankAccountTax.BankDocumentID = pBankDocumentID;
                objCVarBankAccountTax.InJournalTypeID = pInJournalTypeID;
                objCVarBankAccountTax.OutJournalTypeID = pOutJournalTypeID;
                objCVarBankAccountTax.PrintedAs = (pPrintedAs == null ? "0" : pPrintedAs.ToUpper());


                objCVarBankAccountTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarBankAccountTax.ModificationDate = DateTime.Now;

                CBankAccountTAX objCBankAccountTax2 = new CBankAccountTAX();
                objCBankAccountTax2.lstCVarBankAccount.Add(objCVarBankAccountTax);
                checkException = objCBankAccountTax2.SaveMethod(objCBankAccountTax2.lstCVarBankAccount);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            }
            #endregion

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pBankAccountIDs)
        {
            bool _result = false;
            CBankAccount objCBankAccount = new CBankAccount();

            CBankAccountTAX objCBankAccountTAX2 = new CBankAccountTAX();
            Exception checkException = null;

            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            if (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM")
            {
                foreach (var currentID in pBankAccountIDs.Split(','))
                {

                    CBankAccountTAX objCTruckersTAX = new CBankAccountTAX();
                    objCBankAccount.GetList("WHERE ID=" + currentID);
                    objCTruckersTAX.GetList("WHERE Name=N'" + objCBankAccount.lstCVarBankAccount[0].Name + "'");
                    if (objCTruckersTAX.lstCVarBankAccount.Count > 0)
                    {
                        objCBankAccountTAX2.lstDeletedCPKBankAccount.Add(new CPKBankAccountTAX() { ID = objCTruckersTAX.lstCVarBankAccount[0].ID });

                    }


                }
                objCBankAccountTAX2.DeleteItem(objCBankAccountTAX2.lstDeletedCPKBankAccount);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }

            }


            foreach (var currentID in pBankAccountIDs.Split(','))
            {
                objCBankAccount.lstDeletedCPKBankAccount.Add(new CPKBankAccount() { ID = Int32.Parse(currentID.Trim()) });
            }

             checkException = objCBankAccount.DeleteItem(objCBankAccount.lstDeletedCPKBankAccount);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool CheckIsOnline(Int32 pID , Int32 pIscheck)
        {
            var _result = false;
            CBankAccount objCBankAccount = new CBankAccount();
            objCBankAccount.GetList("where isonlinebank=1 ");
            if (objCBankAccount.lstCVarBankAccount.Count > 0 && objCBankAccount.lstCVarBankAccount[0].ID != pID && pIscheck==1)
                _result = true;
            return _result;
        }
        [HttpGet, HttpPost]
        public bool CheckIsOnlineInsert( Int32 pIscheck)
        {
            var _result = false;
            CBankAccount objCBankAccount = new CBankAccount();
            objCBankAccount.GetList("where isonlinebank=1 ");
            if (objCBankAccount.lstCVarBankAccount.Count > 0  && pIscheck == 1)
                _result = true;
            return _result;
        }
    }
}
