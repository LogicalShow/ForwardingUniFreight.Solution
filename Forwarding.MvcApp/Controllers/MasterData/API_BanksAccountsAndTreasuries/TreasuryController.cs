using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
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
    public class TreasuryController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CTreasury objCTreasury = new CTreasury();
            objCTreasury.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTreasury.lstCVarTreasury) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            if (pIsLoadArrayOfObjects)
            {
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
            CvwTreasury objCvwTreasury = new CvwTreasury();
            objCvwTreasury.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwTreasury.lstCVarvwTreasury)
                , _RowCount
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //pAccounts = pData[2]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCA_JournalTypes.lstCVarA_JournalTypes) : null //pJournalTypes = pData[3]
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName, string pLocalName, string pNotes
            , Int32 pAccount_ID, Int32 pDefaultCurrencyID, Int32 pInJournalTypeID, Int32 pOutJournalTypeID,
            string pPrintedAs, Int32 pBranchID, Int32 pSafeSubAccountID)
        {
            bool _result = false;

            CVarTreasury objCVarTreasury = new CVarTreasury();

            objCVarTreasury.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            objCVarTreasury.Name = pName.ToUpper();
            objCVarTreasury.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
            objCVarTreasury.Notes = (pNotes == null ? "0" : pNotes.ToUpper());

            objCVarTreasury.Account_ID = pAccount_ID;
            objCVarTreasury.SafeSubAccountID = pSafeSubAccountID;
            objCVarTreasury.DefaultCurrencyID = pDefaultCurrencyID;
            objCVarTreasury.InJournalTypeID = pInJournalTypeID;
            objCVarTreasury.OutJournalTypeID = pOutJournalTypeID;
            objCVarTreasury.BranchID = pBranchID;
            objCVarTreasury.PrintedAs = (pPrintedAs == null ? "0" : pPrintedAs.ToUpper());

            objCVarTreasury.CreatorUserID = objCVarTreasury.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTreasury.CreationDate = objCVarTreasury.ModificationDate = DateTime.Now;

            CTreasury objCTreasury = new CTreasury();
            objCTreasury.lstCVarTreasury.Add(objCVarTreasury);
            Exception checkException = objCTreasury.SaveMethod(objCTreasury.lstCVarTreasury);
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
                CVarTreasuryTAX objCVarTreasuryTax = new CVarTreasuryTAX();

                objCVarTreasuryTax.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
                objCVarTreasuryTax.Name = pName.ToUpper();
                objCVarTreasuryTax.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
                objCVarTreasuryTax.Notes = (pNotes == null ? "0" : pNotes.ToUpper());

                objCVarTreasuryTax.Account_ID = AccountID;
                objCVarTreasuryTax.DefaultCurrencyID = pDefaultCurrencyID;
                objCVarTreasuryTax.InJournalTypeID = pInJournalTypeID;
                objCVarTreasuryTax.OutJournalTypeID = pOutJournalTypeID;
                objCVarTreasuryTax.BranchID = pBranchID;
                objCVarTreasuryTax.PrintedAs = (pPrintedAs == null ? "0" : pPrintedAs.ToUpper());

                objCVarTreasuryTax.CreatorUserID = objCVarTreasuryTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarTreasuryTax.CreationDate = objCVarTreasuryTax.ModificationDate = DateTime.Now;

                CTreasuryTAX objCTreasuryTax = new CTreasuryTAX();
                objCTreasuryTax.lstCVarTreasuryTAX.Add(objCVarTreasuryTax);
                 checkException = objCTreasuryTax.SaveMethod(objCTreasuryTax.lstCVarTreasuryTAX);
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
        public bool Update(Int32 pID, string pCode, string pName, string pLocalName, string pNotes
            , Int32 pAccount_ID, Int32 pDefaultCurrencyID, Int32 pInJournalTypeID, Int32 pOutJournalTypeID
            , string pPrintedAs, Int32 pBranchID, Int32 pSafeSubAccountID)
        {
            bool _result = false;

            CVarTreasury objCVarTreasury = new CVarTreasury();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CTreasury objCGetCreationInformation = new CTreasury();
            objCGetCreationInformation.GetItem(pID);
            objCVarTreasury.CreatorUserID = objCGetCreationInformation.lstCVarTreasury[0].CreatorUserID;
            objCVarTreasury.CreationDate = objCGetCreationInformation.lstCVarTreasury[0].CreationDate;

            objCVarTreasury.ID = pID;
            objCVarTreasury.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            objCVarTreasury.Name = pName.ToUpper();
            objCVarTreasury.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
            objCVarTreasury.Notes = (pNotes == null ? "0" : pNotes.ToUpper());

            objCVarTreasury.Account_ID = pAccount_ID;
            objCVarTreasury.SafeSubAccountID = pSafeSubAccountID;
            objCVarTreasury.DefaultCurrencyID = pDefaultCurrencyID;
            objCVarTreasury.InJournalTypeID = pInJournalTypeID;
            objCVarTreasury.OutJournalTypeID = pOutJournalTypeID;
            objCVarTreasury.BranchID = pBranchID;
            objCVarTreasury.PrintedAs = (pPrintedAs == null ? "0" : pPrintedAs.ToUpper());

            objCVarTreasury.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTreasury.ModificationDate = DateTime.Now;

            CTreasury objCTreasury = new CTreasury();
            objCTreasury.lstCVarTreasury.Add(objCVarTreasury);
            Exception checkException = objCTreasury.SaveMethod(objCTreasury.lstCVarTreasury);
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

            CTreasuryTAX objCTreasuryTAX = new CTreasuryTAX();
            objCTreasuryTAX.GetList("WHERE Name=N'" + pName.Trim().ToUpper() + "'");

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
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null && objCTreasuryTAX.lstCVarTreasuryTAX.Count > 0)
            {
                CVarTreasuryTAX objCVarTreasuryTax = new CVarTreasuryTAX();
                
                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CTreasuryTAX objCGetCreationInformationTax = new CTreasuryTAX();
                objCGetCreationInformationTax.GetItem(objCTreasuryTAX.lstCVarTreasuryTAX[0].ID);
                objCVarTreasuryTax.CreatorUserID = objCGetCreationInformationTax.lstCVarTreasuryTAX[0].CreatorUserID;
                objCVarTreasuryTax.CreationDate = objCGetCreationInformationTax.lstCVarTreasuryTAX[0].CreationDate;

                objCVarTreasuryTax.ID = objCTreasuryTAX.lstCVarTreasuryTAX[0].ID;
                objCVarTreasuryTax.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
                objCVarTreasuryTax.Name = pName.ToUpper();
                objCVarTreasuryTax.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
                objCVarTreasuryTax.Notes = (pNotes == null ? "0" : pNotes.ToUpper());

                objCVarTreasuryTax.Account_ID = AccountID;
                objCVarTreasuryTax.DefaultCurrencyID = pDefaultCurrencyID;
                objCVarTreasuryTax.InJournalTypeID = pInJournalTypeID;
                objCVarTreasuryTax.OutJournalTypeID = pOutJournalTypeID;
                objCVarTreasuryTax.BranchID = pBranchID;
                objCVarTreasuryTax.PrintedAs = (pPrintedAs == null ? "0" : pPrintedAs.ToUpper());

                objCVarTreasuryTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarTreasuryTax.ModificationDate = DateTime.Now;

                CTreasuryTAX objCTreasuryTAX2 = new CTreasuryTAX();
                objCTreasuryTAX2.lstCVarTreasuryTAX.Add(objCVarTreasuryTax);
                 checkException = objCTreasuryTAX2.SaveMethod(objCTreasuryTAX2.lstCVarTreasuryTAX);
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
        public bool Delete(String pTreasuryIDs)
        {
            bool _result = false;
            CTreasury objCTreasury = new CTreasury();

            CTreasuryTAX objCTreasuryTAX2 = new CTreasuryTAX();
            Exception checkException = null;

            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            if (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM")
            {
                foreach (var currentID in pTreasuryIDs.Split(','))
                {

                    CTreasuryTAX objCTruckersTAX = new CTreasuryTAX();
                    objCTreasury.GetList("WHERE ID=" + currentID);
                    objCTruckersTAX.GetList("WHERE Name=N'" + objCTreasury.lstCVarTreasury[0].Name + "'");
                    if (objCTruckersTAX.lstCVarTreasuryTAX.Count > 0)
                    {
                        objCTreasuryTAX2.lstDeletedCPKTreasury.Add(new CPKTreasuryTAX() { ID = objCTruckersTAX.lstCVarTreasuryTAX[0].ID });

                    }


                }
                objCTreasuryTAX2.DeleteItem(objCTreasuryTAX2.lstDeletedCPKTreasury);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }

            }

            foreach (var currentID in pTreasuryIDs.Split(','))
            {
                objCTreasury.lstDeletedCPKTreasury.Add(new CPKTreasury() { ID = Int32.Parse(currentID.Trim()) });
            }

             checkException = objCTreasury.DeleteItem(objCTreasury.lstDeletedCPKTreasury);
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
