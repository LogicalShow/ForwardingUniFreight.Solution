using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.EnterpriseServices.CompensatingResourceManager;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Transactions
{
    public class JournalVouchersRepeatedController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            CA_JVTypes objCA_JVTypes = new CA_JVTypes();
            CBranches objCBranches = new CBranches();
            CvwOperationsForCombo objCOperations = new CvwOperationsForCombo();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            if (pIsLoadArrayOfObjects)
            {
                objCvwA_Accounts.GetListPaging(99999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                //objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                
                objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
                if (CompanyName == "BED")
                {
                    objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0  and id NOT IN ( SELECT a.CostCenterID FROM A_LinkOperationWithCostCenter a JOIN Operations AS o ON o.ID=a.OperationID WHERE o.OperationStageID IN(110,120))", "Name, Code", out _RowCount);

                }
                else
                {
                    objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                }


                objCA_JournalTypes.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                objCA_JVTypes.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                objCOperations.GetListPaging(999999, 1, "WHERE BLType<>2", "ID", out _RowCount);

                //if (CompanyName == "SAF")
                //{
                //    objCBranches.GetListPaging(99999, 1, "WHERE 1=1 and isnull(isDepartement,0)=1", "Name", out _RowCount);

                //}
                //else
                //{
                    objCBranches.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
               // }
                
            }
            CvwA_JVRepeated objCvwA_JV = new CvwA_JVRepeated();
            objCvwA_JV.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwA_JV.lstCVarvwA_JVRepeated)
                , _RowCount
                , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //pAccounts = pData[2]
                , pIsLoadArrayOfObjects ?  serializer.Serialize(objCA_JournalTypes.lstCVarA_JournalTypes) : null //pJournalTypes = pData[3]
                , pIsLoadArrayOfObjects ?  serializer.Serialize(objCA_JVTypes.lstCVarA_JVTypes) : null //pJVTypes = pData[4]
                , pIsLoadArrayOfObjects ?  serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) : null //pCostCenters = pData[5]
                , pIsLoadArrayOfObjects ?  serializer.Serialize(objCBranches.lstCVarBranches) : null //pCostCenters = pData[6]
                , pIsLoadArrayOfObjects ?  serializer.Serialize(objCOperations.lstCVarvwOperationsForCombo) : null //pCostCenters = pData[7]
            };


        }

        [HttpGet, HttpPost]
        public Object[] GetCode(DateTime pDate, Int32 pJournalTypeID)
        {
            //int _RowCount = 0;
            //Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = "";
            pNewCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JVRepeated_Get_Code", pDate, WebSecurity.CurrentUserId, pJournalTypeID);
            return new object[] {
                pNewCode //pNewCode = pData[0]
            };
        }

        [HttpGet, HttpPost]
        public object[] GetJournalVouchersDetails(Int32 pPageNumber, Int32 pPageSize, string pWhereClauseJournalVoucherDetails, string pOrderBy, string pWhereClauseCurrencyDetails)
        {
            int _RowCount = 0;
            CvwCurrencyDetails objvwCurrencyDetails = new CvwCurrencyDetails();
            objvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
            CvwA_JVDetailsRepeated objCvwA_JVDetails = new CvwA_JVDetailsRepeated();
            objCvwA_JVDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseJournalVoucherDetails, pOrderBy, out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwA_JVDetails.lstCVarvwA_JVDetailsRepeated)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objvwCurrencyDetails.lstCVarvwCurrencyDetails) //pCurrency = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save([FromBody] SaveParameters saveParameters)
        {
            string pMessageReturned = "";
            CDefaults objCDefaults = new CDefaults();
            int _rowCount = 0;
            objCDefaults.GetListPaging(1,1," WHERE 1=1", "ID",out _rowCount);
            Exception checkException = null;
            CA_Fiscal_Year objCA_Fiscal_Year = new CA_Fiscal_Year();
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();
            CA_JVRepeated objCA_JV = new CA_JVRepeated();
            CA_JVDetailsRepeated objCA_JVDetails = new CA_JVDetailsRepeated();
            CVarA_JVRepeated objCVarA_JV = new CVarA_JVRepeated();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            checkException = objCA_Fiscal_Year.GetList("WHERE Confirmed=1 AND Fiscal_Year_Name=N'" + saveParameters.pJVDate.Year + "'");
            checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + saveParameters.pJVDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date and Closed=1");
            checkException = objCA_JV.GetList("WHERE ID<>" + saveParameters.pID + " AND JVNo=N'" + saveParameters.pJVNo + "' AND DATEPART(yyyy, JVDate)=" + saveParameters.pJVDate.Year); //if return row then code is not unique
            checkException = objCFreezeSystemTransactions.GetList("WHERE TransType='All' AND ('" + saveParameters.pJVDate.ToString("yyyy/MM/dd") + "' BETWEEN FromDate AND ToDate)");

            string JVCODE = "0";
            #region Check FiscalYear is Confirmed and NOT Closed
            if (objCA_Fiscal_Year.lstCVarA_Fiscal_Year.Count == 0)
                pMessageReturned = "This fiscal year is not confirmed.";
            else if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0)
                pMessageReturned = "This fiscal year is closed.";
            #endregion Check FiscalYear is Confirmed and NOT Closed
            #region Check JVCode
            //else if (objCA_JV.lstCVarA_JV.Count > 0)
            //    //pMessageReturned = "This JV No. already exists for this year.";
            #endregion Check JVCode
            #region Check Period is Not Frozen
            else if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count > 0)
                pMessageReturned = "The transactions for this date is frozen.";
            #endregion Check Period is Not Frozen
            #region Save
            else
            {
                #region Save Header

                DateTime Duedate=new DateTime();
                if (saveParameters.pQuarter_ID==2)
                {
                    Duedate = saveParameters.pJVDate.AddMonths(1);
                }
                else if (saveParameters.pQuarter_ID == 3)
                {
                    Duedate = saveParameters.pJVDate.AddMonths(3);
                }
                else if (saveParameters.pQuarter_ID == 4)
                {
                    Duedate = saveParameters.pJVDate.AddMonths(6);
                }
                else if (saveParameters.pQuarter_ID == 5)
                {
                    Duedate = saveParameters.pJVDate.AddMonths(12);
                }

                if (objCA_JV.lstCVarA_JVRepeated.Count > 0)
                    JVCODE = Convert.ToString(GetCode(saveParameters.pJVDate, saveParameters.pJournal_ID)[0]);

                objCVarA_JV.ID = saveParameters.pID;
                objCVarA_JV.JVNo = JVCODE == "0" ? saveParameters.pJVNo : JVCODE;
                objCVarA_JV.JVDate = saveParameters.pJVDate;
                objCVarA_JV.TotalDebit = saveParameters.pTotalDebit;
                objCVarA_JV.TotalCredit = saveParameters.pTotalCredit;
                objCVarA_JV.Journal_ID = saveParameters.pJournal_ID;
                objCVarA_JV.JVType_ID = saveParameters.pJVType_ID;
                objCVarA_JV.ReceiptNo = saveParameters.pReceiptNo == "0" ? "" : saveParameters.pReceiptNo;
                objCVarA_JV.RemarksHeader = saveParameters.pRemarksHeader == "0" ? "" : saveParameters.pRemarksHeader;
                objCVarA_JV.Deleted = saveParameters.pDeleted;
                objCVarA_JV.Posted = saveParameters.pPosted;
                objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                objCVarA_JV.Quarter_ID = saveParameters.pQuarter_ID;
                objCVarA_JV.DueDate= Duedate;
                objCVarA_JV.JVID = 0;



                objCA_JV.lstCVarA_JVRepeated.Add(objCVarA_JV);
                checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JVRepeated);
                #endregion Save Header
                #region Save Details
                if (checkException == null)
                {
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", objCVarA_JV.ID, (saveParameters.pID == 0 ? "I" : "U"));

                    CA_JVDetailsRepeated objCA_JVDetailsOld = new CA_JVDetailsRepeated();
                    objCA_JVDetailsOld.GetList(" WHERE JV_ID = " + saveParameters.pID);
                    List<A_JVDetailsComparisonData> OldRecords =
                        objCA_JVDetailsOld.lstCVarA_JVDetailsRepeated.Select( obj => new A_JVDetailsComparisonData
                        {
                            ID = obj.ID,
                            JVNO = null,
                            AccountID =  obj.Account_ID,
                            SubAccountID =  obj.SubAccount_ID,
                            CostCenterID = obj.CostCenter_ID,
                            Debit = obj.Debit,
                            Credit = obj.Credit
                        }).ToList();
                    List<A_JVDetailsComparisonData> NewRecords = new List<A_JVDetailsComparisonData>();
                    //Delete details
                    checkException = objCA_JVDetails.DeleteList("WHERE JV_ID=" + objCVarA_JV.ID);
                    if (saveParameters.pCreditList != null) //to prevent error in case if no details
                    {
                        int NumberOfDetails = saveParameters.pCreditList.Split(',').Length;
                        for (int i = 0; i < NumberOfDetails; i++)
                        {
                            if (decimal.Parse(saveParameters.pLocalDebitList.Split(',')[i]) != 0 || decimal.Parse(saveParameters.pLocalCreditList.Split(',')[i]) != 0)
                            { //the condition is not to save details with Zero values
                                CVarA_JVDetailsRepeated objCVarA_JVDetails = new CVarA_JVDetailsRepeated();
                                objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;
                                objCVarA_JVDetails.Account_ID = int.Parse(saveParameters.pAccount_IDList.Split(',')[i]);
                                objCVarA_JVDetails.SubAccount_ID = int.Parse(saveParameters.pSubAccount_IDList.Split(',')[i]);
                                objCVarA_JVDetails.CostCenter_ID = int.Parse(saveParameters.pCostCenter_IDList.Split(',')[i]);
                                objCVarA_JVDetails.Branch_ID = int.Parse(saveParameters.pBranch_IDList.Split(',')[i]);
                                objCVarA_JVDetails.Operation_ID = int.Parse(saveParameters.pOperation_IDList.Split(',')[i]);
                                objCVarA_JVDetails.Debit = decimal.Parse(saveParameters.pDebitList.Split(',')[i]);
                                objCVarA_JVDetails.Credit = decimal.Parse(saveParameters.pCreditList.Split(',')[i]);
                                objCVarA_JVDetails.Currency_ID = int.Parse(saveParameters.pCurrency_IDList.Split(',')[i]);
                                objCVarA_JVDetails.ExchangeRate = decimal.Parse(saveParameters.pExchangeRateList.Split(',')[i]);
                                objCVarA_JVDetails.LocalDebit = decimal.Parse(saveParameters.pLocalDebitList.Split(',')[i]);
                                objCVarA_JVDetails.LocalCredit = decimal.Parse(saveParameters.pLocalCreditList.Split(',')[i]);
                                objCVarA_JVDetails.Description = saveParameters.pDescriptionList.Split(',')[i] == "0" ? "" : saveParameters.pDescriptionList.Split(',')[i];
                                objCVarA_JVDetails.IsDocumented = Convert.ToBoolean(saveParameters.pIsDocumentedList.Split(',')[i]);
                                objCA_JVDetails.lstCVarA_JVDetailsRepeated.Add(objCVarA_JVDetails);
                                checkException = objCA_JVDetails.SaveMethod(objCA_JVDetails.lstCVarA_JVDetailsRepeated);

                                NewRecords.Add(new A_JVDetailsComparisonData
                                {
                                    ID = int.Parse(saveParameters.pDetailsIDList.Split(',')[i]),
                                    JVNO = saveParameters.pJVNo,
                                    AccountID = int.Parse(saveParameters.pAccount_IDList.Split(',')[i]),
                                    SubAccountID = int.Parse(saveParameters.pSubAccount_IDList.Split(',')[i]),
                                    CostCenterID = int.Parse(saveParameters.pCostCenter_IDList.Split(',')[i]),
                                    Debit = decimal.Parse(saveParameters.pDebitList.Split(',')[i]),
                                    Credit = decimal.Parse(saveParameters.pCreditList.Split(',')[i])
                                });
                            }
                        }
                        //Log data to VoucherLog table
                        if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "NEW")
                            VoucherLogData(OldRecords, NewRecords);
                    }
                }
                else
                {
                    pMessageReturned = checkException.Message;
                }
                #endregion Save Details
            }
            #endregion Save
            return new object[]
            {
                pMessageReturned
            };
        }

        private void GetAccountName(int AccountID, int SubAccountID, int CostCenterID, out string AccountName, out string SubAccountName, out string CostCenterName)
        {
            CA_Accounts objCA_Accounts = new CA_Accounts();
            objCA_Accounts.GetItem(AccountID);
            AccountName = objCA_Accounts.lstCVarA_Accounts.Count > 0 ? objCA_Accounts.lstCVarA_Accounts[0].Account_Name : "";

            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            objCA_SubAccounts.GetItem(SubAccountID);
            SubAccountName = objCA_SubAccounts.lstCVarA_SubAccounts.Count > 0 ? objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccount_Name : "";

            CA_CostCenters objCA_CostCenters = new CA_CostCenters();
            objCA_CostCenters.GetItem(CostCenterID);
            CostCenterName = objCA_CostCenters.lstCVarA_CostCenters.Count > 0 ? objCA_CostCenters.lstCVarA_CostCenters[0].CostCenterName : "";
        }

        private void VoucherLogData(List<A_JVDetailsComparisonData> OldRecords, List<A_JVDetailsComparisonData> NewRecords)
        {
            List<long> OldIDs = new List<long>();
            List<long> NewIDs = new List<long>();
            foreach (var item in NewRecords)
            {
                NewIDs.Add(item.ID);
            }
            foreach (var item in OldRecords)
            {
                OldIDs.Add(item.ID);
                string AccountName = "";
                string SubAccountName = "";
                string CostCenterName = "";
                GetAccountName((int)item.AccountID, (int)item.SubAccountID, (int)item.CostCenterID, out AccountName, out SubAccountName, out CostCenterName);
                if (!NewIDs.Contains(item.ID)) //delete
                {
                    A_JVDetailsComparisonData Oldrecord = OldRecords.Where(R => R.ID == item.ID).ToList()[0];
                    List<CVarVoucherLog> Record = new List<CVarVoucherLog>();
                    CVarVoucherLog objCVarVoucherLog = new CVarVoucherLog()
                    {
                        A_VoucherCode = "",
                        A_VoucherType = 0,
                        A_JVNO = NewRecords[0].JVNO,
                        OldValue = Oldrecord.Credit == 0m ? Oldrecord.Debit : Oldrecord.Credit,
                        NewValue = 0m,
                        OldAccount = AccountName,
                        NewAccount = "",
                        OldSubAccount = SubAccountName,
                        NewSubAccount = "",
                        OldCostCenter = CostCenterName,
                        NewCostCenter = "",
                        ActionType = "D",
                        ActionDate = DateTime.Now,
                        UserName = WebSecurity.CurrentUserName
                    };
                    Record.Add(objCVarVoucherLog);
                    CVoucherLog objCVoucherLog = new CVoucherLog();
                    objCVoucherLog.SaveMethod(Record);
                }
            }
                //Check ID
                foreach (var item in NewRecords)
                {
                string AccountName = "";
                string SubAccountName = "";
                string CostCenterName = "";
                long MaxOldID = OldIDs.Count() == 0 ? 0 : OldIDs.Max();
                GetAccountName((int)item.AccountID, (int)item.SubAccountID, (int)item.CostCenterID, out AccountName, out SubAccountName, out CostCenterName);
                if (item.ID > MaxOldID) //Insert
                {
                    List<CVarVoucherLog> Record = new List<CVarVoucherLog>();
                    CVarVoucherLog objCVarVoucherLog = new CVarVoucherLog()
                    {
                        A_VoucherCode = "",
                        A_VoucherType = 0,
                        A_JVNO = item.JVNO,
                        OldValue = 0m,
                        NewValue = item.Credit == 0m ? item.Debit : item.Credit,
                        OldAccount = "",
                        NewAccount = AccountName,
                        OldSubAccount = "",
                        NewSubAccount = SubAccountName,
                        OldCostCenter = "",
                        NewCostCenter = CostCenterName,
                        ActionType = "I",
                        ActionDate = DateTime.Now,
                        UserName = WebSecurity.CurrentUserName
                    };
                    Record.Add(objCVarVoucherLog);
                    CVoucherLog objCVoucherLog = new CVoucherLog();
                    objCVoucherLog.SaveMethod(Record);
                }
                else if (OldIDs.Contains(item.ID)) //Update if there is a change
                {
                    bool IsChanged = false;
                    A_JVDetailsComparisonData Oldrecord = OldRecords.Where(R => R.ID == item.ID).ToList()[0];
                    string OldAccountName = "";
                    string OldSubAccountName = "";
                    string OldCenterName = "";
                    string NewAccountName = "";
                    string NewSubAccountName = "";
                    string NewCostCenterName = "";
                    GetAccountName((int)Oldrecord.AccountID, (int)Oldrecord.SubAccountID, (int)Oldrecord.CostCenterID, out OldAccountName, out OldSubAccountName, out OldCenterName);
                    GetAccountName((int)item.AccountID, (int)item.SubAccountID, (int)item.CostCenterID, out NewAccountName, out NewSubAccountName, out NewCostCenterName);
                    if (!(Oldrecord.AccountID == item.AccountID
                        && Oldrecord.SubAccountID == item.SubAccountID
                        && Oldrecord.CostCenterID == item.CostCenterID
                        && Oldrecord.Credit == item.Credit
                        && Oldrecord.Debit == item.Debit))
                        IsChanged = true;
                    if (IsChanged) {
                        List<CVarVoucherLog> Record = new List<CVarVoucherLog>();
                        CVarVoucherLog objCVarVoucherLog = new CVarVoucherLog()
                        {
                            A_VoucherCode = "",
                            A_VoucherType = 0,
                            A_JVNO = item.JVNO,
                            OldValue = Oldrecord.Credit == 0m ? Oldrecord.Debit : Oldrecord.Credit,
                            NewValue = item.Credit == 0m ? item.Debit : item.Credit,
                            OldAccount = OldAccountName,
                            NewAccount = NewAccountName,
                            OldSubAccount = OldSubAccountName,
                            NewSubAccount = NewSubAccountName,
                            OldCostCenter = OldCenterName,
                            NewCostCenter = NewCostCenterName,
                            ActionType = "U",
                            ActionDate = DateTime.Now,
                            UserName = WebSecurity.CurrentUserName
                        };
                        Record.Add(objCVarVoucherLog);
                        CVoucherLog objCVoucherLog = new CVoucherLog();
                        objCVoucherLog.SaveMethod(Record);
                    }
                }
            }
        }


        [HttpGet, HttpPost]
        public object[] Copy(Int64 pIDToCopy, bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {

        

            string strMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CvwA_JV objCvwA_JV = new CvwA_JV();
            CA_JV objCA_JV = new CA_JV();
            DateTime pDate = DateTime.Now;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = "";

            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + pDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date ");

            if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count == 0)
                strMessage = "This fiscal year is not exist.";
            else if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0 && objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period[0].Closed)
                strMessage = "This fiscal year is closed.";
            else
            {
                #region Copying Header
                checkException = objCA_JV.GetList("WHERE ID=" + pIDToCopy); // isa i am sure i ll get only one row
                pNewCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", pDate, WebSecurity.CurrentUserId, objCA_JV.lstCVarA_JV[0].Journal_ID);

                objCA_JV.lstCVarA_JV[0].ID = 0;
                objCA_JV.lstCVarA_JV[0].ReceiptNo = "";
                objCA_JV.lstCVarA_JV[0].IsSysJv = false;
                objCA_JV.lstCVarA_JV[0].Posted = false;
                objCA_JV.lstCVarA_JV[0].JVDate = pDate;
                objCA_JV.lstCVarA_JV[0].User_ID = WebSecurity.CurrentUserId;
                objCA_JV.lstCVarA_JV[0].JVNo = pNewCode;

                checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV Copy", objCA_JV.lstCVarA_JV[0].ID, "C");
                #endregion Copying Header
                #region Copying Details
                CA_JVDetails objCA_JVDetails_Original = new CA_JVDetails();
                CA_JVDetails objCA_JVDetails_Copy = new CA_JVDetails();
                checkException = objCA_JVDetails_Original.GetList("WHERE JV_ID=" + pIDToCopy);
                if (objCA_JVDetails_Original.lstCVarA_JVDetails.Count > 0)
                {
                    for (int i = 0; i < objCA_JVDetails_Original.lstCVarA_JVDetails.Count; i++)
                    {
                        CVarA_JVDetails objCVarA_JVDetails = new CVarA_JVDetails();
                        objCVarA_JVDetails.JV_ID = objCA_JV.lstCVarA_JV[0].ID;
                        objCVarA_JVDetails.Account_ID = objCA_JVDetails_Original.lstCVarA_JVDetails[i].Account_ID;
                        objCVarA_JVDetails.SubAccount_ID = objCA_JVDetails_Original.lstCVarA_JVDetails[i].SubAccount_ID;
                        objCVarA_JVDetails.CostCenter_ID = objCA_JVDetails_Original.lstCVarA_JVDetails[i].CostCenter_ID;
                        objCVarA_JVDetails.Debit = objCA_JVDetails_Original.lstCVarA_JVDetails[i].Debit;
                        objCVarA_JVDetails.Credit = objCA_JVDetails_Original.lstCVarA_JVDetails[i].Credit;
                        objCVarA_JVDetails.Currency_ID = objCA_JVDetails_Original.lstCVarA_JVDetails[i].Currency_ID;
                        objCVarA_JVDetails.ExchangeRate = objCA_JVDetails_Original.lstCVarA_JVDetails[i].ExchangeRate;
                        objCVarA_JVDetails.LocalDebit = objCA_JVDetails_Original.lstCVarA_JVDetails[i].LocalDebit;
                        objCVarA_JVDetails.LocalCredit = objCA_JVDetails_Original.lstCVarA_JVDetails[i].LocalCredit;
                        objCVarA_JVDetails.Description = objCA_JVDetails_Original.lstCVarA_JVDetails[i].Description;
                        objCA_JVDetails_Copy.lstCVarA_JVDetails.Add(objCVarA_JVDetails);
                    }
                    checkException = objCA_JVDetails_Copy.SaveMethod(objCA_JVDetails_Copy.lstCVarA_JVDetails);
                }
                #endregion Copying Details
            }




            if (checkException == null)
                checkException = objCvwA_JV.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            else
                strMessage = checkException.Message;

            return new object[] {
                strMessage
                , strMessage == "" ? new JavaScriptSerializer().Serialize(objCvwA_JV.lstCVarvwA_JV) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] Delete(string pDeletedIDs, string pTrans_Type, bool pCheckFiscalClosed) //pTransType 'F':NotPermanentDelete, 'D':PermanentDelete
        {
            bool _result = true;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CA_JVRepeated objCA_JV = new CA_JVRepeated();
            CA_JVDetailsRepeated objCA_JVDetails = new CA_JVDetailsRepeated();
            CA_Fiscal_Year objCA_Fiscal_Year = new CA_Fiscal_Year();
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();
            checkException = objCA_JV.GetList("WHERE ID IN (" + pDeletedIDs + ")");
            int NumberOfSelectedRows = pDeletedIDs.Split(',').Length;
            var ArrDeletedIDs = pDeletedIDs.Split(',');
            for (int i = 0; i < NumberOfSelectedRows; i++)
            {
                DateTime pJVDate = objCA_JV.lstCVarA_JVRepeated[i].JVDate;
                checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + pJVDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date and Closed=1");
                checkException = objCFreezeSystemTransactions.GetList("WHERE TransType='All' AND ('" + pJVDate.ToString("yyyy/MM/dd") + "' BETWEEN FromDate AND ToDate)");
                if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count == 0
                    && (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count == 0 || !pCheckFiscalClosed)) //not closed nor frozen period so delete
                {
                    if (pTrans_Type == "F") //i.e. Not Permanent Delete
                        checkException = objCA_JV.UpdateList("Deleted=1 WHERE ID=" + ArrDeletedIDs[i]);
                    else if (pTrans_Type == "D") //i.e. PermanentDelete
                    {
                        checkException = objCA_Fiscal_Year.UpdateList("ProfitLossClosingJVID=NULL WHERE ProfitLossClosingJVID=" + ArrDeletedIDs[i]);
                        checkException = objCA_JVDetails.DeleteList("WHERE JV_ID=" + ArrDeletedIDs[i]);
                        checkException = objCA_JV.DeleteList("WHERE ID=" + ArrDeletedIDs[i]);
                    }
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", int.Parse(ArrDeletedIDs[i]), pTrans_Type);
                }
                else
                    _result = false;
            }
            return new object[] {
                _result
            };
        }

        [HttpGet, HttpPost]
        public object[] RestoreList(string pRestoredIDs, bool pCheckFiscalClosed)
        {
            bool _result = true;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CA_JV objCA_JV = new CA_JV();
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();
            checkException = objCA_JV.GetList("WHERE ID IN (" + pRestoredIDs + ")");
            int NumberOfSelectedRows = pRestoredIDs.Split(',').Length;
            var ArrRestoredIDs = pRestoredIDs.Split(',');
            for (int i = 0; i < NumberOfSelectedRows; i++)
            {
                DateTime pJVDate = objCA_JV.lstCVarA_JV[i].JVDate;
                checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + pJVDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date and Closed=1");
                checkException = objCFreezeSystemTransactions.GetList("WHERE TransType='All' AND ('" + pJVDate.ToString("yyyy/MM/dd") + "' BETWEEN FromDate AND ToDate)");
                if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count == 0
                    && (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count == 0 || !pCheckFiscalClosed)) //not closed period nor frozen date
                {
                    checkException = objCA_JV.UpdateList("Deleted=0 WHERE ID=" + ArrRestoredIDs[i]);
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", int.Parse(ArrRestoredIDs[i]), "R");
                }
                else
                    _result = false;
            }
            return new object[] {
                _result
            };
        }

        [HttpGet, HttpPost]
        public object[] SetPostField(string pSelectedIDs, string pValue)
        {
            bool _result = true;
            Exception checkException = null;
            //CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CA_JVRepeated objCA_JV = new CA_JVRepeated();
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();
            checkException = objCA_JV.GetList("WHERE ID IN (" + pSelectedIDs + ")");
            int NumberOfSelectedRows = pSelectedIDs.Split(',').Length;
            var ArrSelectedIDs = pSelectedIDs.Split(',');
            for (int i = 0; i < NumberOfSelectedRows; i++)
            {
                DateTime pJVDate = objCA_JV.lstCVarA_JVRepeated[i].JVDate;
                checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + pJVDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date and Closed=1");
                checkException = objCFreezeSystemTransactions.GetList("WHERE TransType='All' AND ('" + pJVDate.ToString("yyyy/MM/dd") + "' BETWEEN FromDate AND ToDate)");
                if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count == 0
                    && objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count == 0) //not closed and date not frozen
                {
                    checkException = objCA_JV.UpdateList("Posted=" + pValue + " WHERE ID=" + ArrSelectedIDs[i]);
                    //objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JV", int.Parse(ArrSelectedIDs[i]), /*"R"*/);
                }
                else
                    _result = false;
            }
            return new object[] {
                _result
            };
        }

        [HttpGet, HttpPost]
        public object[] GetJournalVoucherDataForPrinting(Int64 pJournalVoucherIDForPrinting)
        {
            bool _result = false;
            Exception checkException = null;
            CvwA_JVForPrintingRepeated objCvwA_JVForPrinting = new CvwA_JVForPrintingRepeated();



            checkException = objCvwA_JVForPrinting.GetList(" WHERE ID = " + pJournalVoucherIDForPrinting.ToString() + "  ORDER BY credit ");
            if (checkException == null)
            {
                _result = true;

            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwA_JVForPrinting.lstCVarvwA_JVForPrintingRepeated[0]) : null
                , _result ? new JavaScriptSerializer().Serialize(objCvwA_JVForPrinting.lstCVarvwA_JVForPrintingRepeated) : null


            };
        }

        [HttpGet, HttpPost]
        public object[] GetJournalVoucherDataForPrintingSelected(String pJournalVoucherIDsForPrintingSelected, bool pIsTotal)
        {

            bool _result = false;
            Exception checkException = null;
            CvwA_JVForPrinting objCvwA_JVForPrinting = new CvwA_JVForPrinting();
            CvwA_JVTotalsForPrinting objCvwA_JVForPrintingTotals = new CvwA_JVTotalsForPrinting();

            if (pIsTotal)
            {
                checkException = objCvwA_JVForPrintingTotals.GetList(" WHERE ID in ( " + pJournalVoucherIDsForPrintingSelected + ")   ");
            }
            else
            {
                checkException = objCvwA_JVForPrinting.GetList(" WHERE ID IN( " + pJournalVoucherIDsForPrintingSelected + ")  ORDER BY JV_ID,credit ");
            }
            var DistinctJVs = objCvwA_JVForPrinting.lstCVarvwA_JVForPrinting.GroupBy(x => x.JV_ID).Select(group => group.First());

            if (checkException == null)
            {
                _result = true;
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(DistinctJVs) : null
                , _result ? new JavaScriptSerializer().Serialize(objCvwA_JVForPrinting.lstCVarvwA_JVForPrinting) : null
                , _result ? new JavaScriptSerializer().Serialize(objCvwA_JVForPrintingTotals.lstCVarvwA_JVTotalsForPrinting) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] GetJournalVoucherDataForPrintingTotals(string pFromDate, string PToDate, string pJournalType, string pJVType)
        {
            bool _result = false;
            if (pFromDate != null && PToDate != null)
            {
                Exception checkException = null;
                CvwA_JVTotalsForPrinting objCvwA_JVForPrintingTotals = new CvwA_JVTotalsForPrinting();

                if (pJournalType == "0" && pJVType == "0")
                {
                    checkException = objCvwA_JVForPrintingTotals.GetList(" WHERE JVDate  between '" +
              DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd")
             + "' and '" + DateTime.ParseExact(PToDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd 23:59:59.999") + "'  ");
                }
                else if (pJournalType != "0" && pJVType != "0")
                {
                    checkException = objCvwA_JVForPrintingTotals.GetList(" WHERE JVDate  between '" +
                          DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd")
                         + "' and '" + DateTime.ParseExact(PToDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd 23:59:59.999") + "'  "
                         + " and Journal_ID = " + pJournalType + " and " + " JVType_ID =" + pJVType);
                }

                if (checkException == null)
                {
                    _result = true;

                }
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
               objCvwA_JVForPrintingTotals.lstCVarvwA_JVTotalsForPrinting.Count > 0 ? _result : false
                , _result ? (objCvwA_JVForPrintingTotals.lstCVarvwA_JVTotalsForPrinting.Count > 0 ? new JavaScriptSerializer().Serialize(objCvwA_JVForPrintingTotals.lstCVarvwA_JVTotalsForPrinting[0]) : null) : null
                , _result ? new JavaScriptSerializer().Serialize(objCvwA_JVForPrintingTotals.lstCVarvwA_JVTotalsForPrinting) : null


            };
            }
            return null;
        }
        [HttpGet, HttpPost]
        public object[] GetJVsDataPrinting(string pFromDate, string PToDate)
        {
            bool _result = false;
            if (pFromDate != null && PToDate != null)
            {
                Exception checkException = null;
                CvwA_JVsPrinting ObjCVarvwA_JVsPrinting = new CvwA_JVsPrinting();
                checkException = ObjCVarvwA_JVsPrinting.GetList(" WHERE JVDate  between '" +
                   DateTime.ParseExact(pFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd")
                    + "' and '" + DateTime.ParseExact(PToDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd 23:59:59.999") + "'  ");
                if (checkException == null)
                {
                    _result = true;

                }
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
               ObjCVarvwA_JVsPrinting.lstCVarvwA_JVsPrinting.Count > 0 ? _result : false
                , _result ? (ObjCVarvwA_JVsPrinting.lstCVarvwA_JVsPrinting.Count > 0 ? new JavaScriptSerializer().Serialize(ObjCVarvwA_JVsPrinting.lstCVarvwA_JVsPrinting[0]) : null) : null
                , _result ? new JavaScriptSerializer().Serialize(ObjCVarvwA_JVsPrinting.lstCVarvwA_JVsPrinting) : null


            };
            }
            return null;
        }
        [HttpGet, HttpPost]
        public object[] GetDynamicExportData(string pExportFromDate, string pExportToDate)
        {
            bool _result = false;
            if (pExportFromDate != null && pExportToDate != null)
            {
                Exception checkException = null;
                CvwSP_A_Rep_Dynamic_Excel ObjCCvwSP_A_Rep_Dynamic_Excel = new CvwSP_A_Rep_Dynamic_Excel();
                checkException = ObjCCvwSP_A_Rep_Dynamic_Excel.GetList(
                    DateTime.ParseExact(pExportFromDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    , DateTime.ParseExact(pExportToDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture)
                    );
                if (checkException == null)
                {
                    _result = true;

                }
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                    serializer.Serialize(   ObjCCvwSP_A_Rep_Dynamic_Excel.lstCVarvwSP_A_Rep_Dynamic_Excel)
                       , _result
            };
            }
            return null;
        }


        public class SaveParameters
        {
            public Int64 pID { get; set; }
            public string pJVNo { get; set; }
            public DateTime pJVDate { get; set; }
            public decimal pTotalDebit { get; set; }
            public decimal pTotalCredit { get; set; }
            public Int32 pJournal_ID { get; set; }
            public Int32 pJVType_ID { get; set; }
            public Int32 pQuarter_ID { get; set; }
            public DateTime pDueDate { get; set; }

            public string pReceiptNo { get; set; }
            public string pRemarksHeader { get; set; }
            public bool pDeleted { get; set; }
            public bool pPosted { get; set; }

            //Details Data
            public string pDetailsIDList { get; set; }
            public string pAccount_IDList { get; set; }
            public string pSubAccount_IDList { get; set; }
            public string pCostCenter_IDList { get; set; }

            public string pOperation_IDList { get; set; }
            public string pBranch_IDList { get; set; }
            public string pDebitList { get; set; }
            public string pCreditList { get; set; }
            public string pCurrency_IDList { get; set; }
            public string pExchangeRateList { get; set; }
            public string pLocalDebitList { get; set; }
            public string pLocalCreditList { get; set; }
            public string pDescriptionList { get; set; }
            public string pIsDocumentedList { get; set; }
        }

        public class A_JVDetailsComparisonData
        {
            public long ID { get; set; }
            public string JVNO { get; set; }
            public long AccountID { get; set; }
            public long SubAccountID { get; set; }
            public long CostCenterID { get; set; }
            public decimal Debit { get; set; }
            public decimal Credit { get; set; }
        }
    }
}
