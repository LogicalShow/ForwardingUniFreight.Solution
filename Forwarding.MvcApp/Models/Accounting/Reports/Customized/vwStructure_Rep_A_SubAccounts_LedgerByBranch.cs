using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Accounting.Reports.Customized
{
    [Serializable]
    
    public partial class CVarvwStructure_Rep_A_SubAccounts_LedgerByBranch
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mJVNo;
        internal DateTime mJVDate;
        internal Decimal mTotalDebit;
        internal Decimal mTotalCredit;
        internal Int32 mJournal_ID;
        internal Int32 mJVType_ID;
        internal String mReceiptNo;
        internal String mRemarksHeader;
        internal Boolean mDeleted;
        internal Boolean mPosted;
        internal Int32 mUser_ID;
        internal Boolean mIsSysJv;
        internal Int32 mTransType_ID;
        internal Decimal mDebit;
        internal Decimal mCredit;
        internal Decimal mExchangeRate;
        internal Decimal mLocalDebit;
        internal Decimal mLocalCredit;
        internal String mCostCenterName;
        internal Int32 mCostCenterID;
        internal String mBranchName;
        internal Int32 mBranchID;
        internal Int32 mSubAccountID;
        internal String mAccountName;
        internal String mSubAccountName;
        internal String mDescription;
        internal String mCurrency_Code;
        internal String mJVType_Name;
        internal Decimal mCuNow;
        internal String mJournal_Name;
        internal Decimal mOpening_Balance;
        internal Decimal mOpeningBalanceCurrency;
        internal String mLocalDebitPrice;
        internal String mDescription2;
        internal Boolean mIsDocumented;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String JVNo
        {
            get { return mJVNo; }
            set { mJVNo = value; }
        }
        public DateTime JVDate
        {
            get { return mJVDate; }
            set { mJVDate = value; }
        }
        public Decimal TotalDebit
        {
            get { return mTotalDebit; }
            set { mTotalDebit = value; }
        }
        public Decimal TotalCredit
        {
            get { return mTotalCredit; }
            set { mTotalCredit = value; }
        }
        public Int32 Journal_ID
        {
            get { return mJournal_ID; }
            set { mJournal_ID = value; }
        }
        public Int32 JVType_ID
        {
            get { return mJVType_ID; }
            set { mJVType_ID = value; }
        }
        public String ReceiptNo
        {
            get { return mReceiptNo; }
            set { mReceiptNo = value; }
        }
        public String RemarksHeader
        {
            get { return mRemarksHeader; }
            set { mRemarksHeader = value; }
        }
        public Boolean Deleted
        {
            get { return mDeleted; }
            set { mDeleted = value; }
        }
        public Boolean Posted
        {
            get { return mPosted; }
            set { mPosted = value; }
        }
        public Int32 User_ID
        {
            get { return mUser_ID; }
            set { mUser_ID = value; }
        }
        public Boolean IsSysJv
        {
            get { return mIsSysJv; }
            set { mIsSysJv = value; }
        }
        public Int32 TransType_ID
        {
            get { return mTransType_ID; }
            set { mTransType_ID = value; }
        }
        public Decimal Debit
        {
            get { return mDebit; }
            set { mDebit = value; }
        }
        public Decimal Credit
        {
            get { return mCredit; }
            set { mCredit = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Decimal LocalDebit
        {
            get { return mLocalDebit; }
            set { mLocalDebit = value; }
        }
        public Decimal LocalCredit
        {
            get { return mLocalCredit; }
            set { mLocalCredit = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }

        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public String SubAccountName
        {
            get { return mSubAccountName; }
            set { mSubAccountName = value; }
        }
        public String Description
        {
            get { return mDescription; }
            set { mDescription = value; }
        }
        public String Currency_Code
        {
            get { return mCurrency_Code; }
            set { mCurrency_Code = value; }
        }
        public String JVType_Name
        {
            get { return mJVType_Name; }
            set { mJVType_Name = value; }
        }
        public Decimal CuNow
        {
            get { return mCuNow; }
            set { mCuNow = value; }
        }
        public String Journal_Name
        {
            get { return mJournal_Name; }
            set { mJournal_Name = value; }
        }
        public Decimal Opening_Balance
        {
            get { return mOpening_Balance; }
            set { mOpening_Balance = value; }
        }
        public Decimal OpeningBalanceCurrency
        {
            get { return mOpeningBalanceCurrency; }
            set { mOpeningBalanceCurrency = value; }
        }
        public String LocalDebitPrice
        {
            get { return mLocalDebitPrice; }
            set { mLocalDebitPrice = value; }
        }
        public String Description2
        {
            get { return mDescription2; }
            set { mDescription2 = value; }
        }
        public Boolean IsDocumented
        {
            get { return mIsDocumented; }
            set { mIsDocumented = value; }
        }
        #endregion
    }

    public partial class CvwStructure_Rep_A_SubAccounts_LedgerByBranch
    {
        #region "variables"
        /*If "App.Config" isnot exist add it to your Application
		Add this code after <Configuration> tag
		-------------------------------------------------------
		<appsettings>
		<add key="ConnectionString" value="............"/>
		</appsettings>
		-------------------------------------------------------
		where ".........." is connection string to database server*/
        private SqlTransaction tr;
        public List<CVarvwStructure_Rep_A_SubAccounts_LedgerByBranch> lstCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch = new List<CVarvwStructure_Rep_A_SubAccounts_LedgerByBranch>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pJV_IDs, string pSubAccount_IDs, string pAccountIDs, string pCostCenterIDs, string pBranchIDs, DateTime pFrom_Date, DateTime pTo_Date, bool pShowRevaluateEntry)
        {
            return DataFill(pJV_IDs, pSubAccount_IDs, pAccountIDs, pCostCenterIDs, pBranchIDs, pFrom_Date, pTo_Date, pShowRevaluateEntry, true);
        }
        private Exception DataFill(string pJV_IDs, string pSubAccount_IDs, string pAccountIDs, string pCostCenterIDs, string pBranchIDs, DateTime pFrom_Date, DateTime pTo_Date, bool pShowRevaluateEntry, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@JV_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@SubAccount_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@AccountIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@From_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@To_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ShowRevaluateEntry", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@Branch_ID", SqlDbType.NVarChar));
                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_SubAccounts_LedgerByCC";
                    Com.CommandText = "[dbo].Rep_A_SubAccounts_LedgerByBranch";
                    Com.Parameters[0].Value = pJV_IDs;
                    Com.Parameters[1].Value = pSubAccount_IDs;
                    Com.Parameters[2].Value = pAccountIDs;
                    Com.Parameters[3].Value = pCostCenterIDs;
                    Com.Parameters[4].Value = pFrom_Date;
                    Com.Parameters[5].Value = pTo_Date;
                    Com.Parameters[6].Value = pShowRevaluateEntry;
                    Com.Parameters[7].Value = pBranchIDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_SubAccounts_LedgerByBranch ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch = new CVarvwStructure_Rep_A_SubAccounts_LedgerByBranch();
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mID = dr["ID"].ToString() == "" ? 0 : Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mJVDate = dr["JVDate"].ToString() == "" ? DateTime.Parse("01/01/1900") : Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mTotalDebit = dr["TotalDebit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mTotalCredit = dr["TotalCredit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["TotalCredit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mJournal_ID = dr["Journal_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mJVType_ID = dr["JVType_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mDeleted = dr["Deleted"].ToString() == "" ? false : Convert.ToBoolean(dr["Deleted"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mPosted = dr["Posted"].ToString() == "" ? false : Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mUser_ID = dr["User_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mIsSysJv = dr["IsSysJv"].ToString() == "" ? false : Convert.ToBoolean(dr["IsSysJv"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mTransType_ID = dr["TransType_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mDebit = dr["Debit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mCredit = dr["Credit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mExchangeRate = dr["ExchangeRate"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mLocalDebit = dr["LocalDebit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["LocalDebit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mLocalCredit = dr["LocalCredit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["LocalCredit"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mCostCenterID = dr["CostCenterID"].ToString() == "" ? 0 : Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mBranchID = dr["BranchID"].ToString() == "" ? 0 : Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mSubAccountID = dr["SubAccountID"].ToString() == "" ? 0 : Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mJVType_Name = Convert.ToString(dr["JVType_Name"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mCuNow = dr["CuNow"].ToString() == "" ? 0 : Convert.ToDecimal(dr["CuNow"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mJournal_Name = Convert.ToString(dr["Journal_Name"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mOpening_Balance = dr["Opening_Balance"].ToString() == "" ? 0 : Convert.ToDecimal(dr["Opening_Balance"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mOpeningBalanceCurrency = dr["OpeningBalanceCurrency"].ToString() == "" ? 0 : Convert.ToDecimal(dr["OpeningBalanceCurrency"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mLocalDebitPrice = Convert.ToString(dr["LocalDebitPrice"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mDescription2 = Convert.ToString(dr["Description2"].ToString());
                        ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.mIsDocumented = dr["IsDocumented"].ToString() == "" ? false : Convert.ToBoolean(dr["IsDocumented"].ToString());
                        lstCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch.Add(ObjCVarvwStructure_Rep_A_SubAccounts_LedgerByBranch);
                    }
                }
                catch (Exception ex)
                {
                    Exp = ex;
                }
                finally
                {
                    if (dr != null)
                    {
                        dr.Close();
                        dr.Dispose();
                    }
                }
                tr.Commit();
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }

        #endregion
    }
}