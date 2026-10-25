using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.Reports.Customized
{
    [Serializable]
    public partial class CvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport
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
        internal Int32? mTransType_ID;
        internal Decimal mDebit;
        internal Decimal mCredit;
        internal Decimal mExchangeRate;
        internal Decimal mLocalDebit;
        internal Decimal mLocalCredit;
        internal Int32 mAccount_ID;
        internal String mAccountName;
        internal String mCostCenter;
        internal String mdescription;
        internal String mCurrency_Code;
        internal String mJVType_Name;
        internal String mJournal_Name;
        internal Decimal mOpening_Balance;
        internal String mLocalDebitEGP;
        internal Boolean mIsDocumented;
        internal String mSubAccount_Name;
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
        public Int32? TransType_ID
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
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mAccount_ID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public String CostCenter
        {
            get { return mCostCenter; }
            set { mCostCenter = value; }
        }
        public String description
        {
            get { return mdescription; }
            set { mdescription = value; }
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
        public String LocalDebitEGP
        {
            get { return mLocalDebitEGP; }
            set { mLocalDebitEGP = value; }
        }
        public Boolean IsDocumented
        {
            get { return mIsDocumented; }
            set { mIsDocumented = value; }
        }
        public String SubAccount_Name
        {
            get { return mSubAccount_Name; }
            set { mSubAccount_Name = value; }
        }
        #endregion
    }

    public partial class CvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReport
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
        public List<CvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport> lstCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport = new List<CvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport>();
        #endregion

        #region "Select Methods"

        public Exception GetList(string pJV_IDs, string pAccount_IDs, DateTime pFrom_Date, DateTime pTo_Date,
            Int32 pPosted, bool pShowRevaluateEntry, Int32 pIsDocumented, string pJournal_IDs, Int32 pCurr, 
            string pCostCenter_IDs,string pBranche_IDs,int pSubAccountID)
        {
            return DataFill(pJV_IDs, pAccount_IDs, pFrom_Date, pTo_Date, pPosted, pShowRevaluateEntry, pIsDocumented,
                pJournal_IDs, pCurr, true, pCostCenter_IDs, pBranche_IDs, pSubAccountID);
        }


        private Exception DataFill(string pJV_IDs, string pAccount_IDs, DateTime pFrom_Date, DateTime pTo_Date,
            Int32 pPosted, bool pShowRevaluateEntry, Int32 pIsDocumented, string pJournal_IDs, Int32 pCurr
            , Boolean IsList, string pCostCenter_IDs,string pBranche_IDs, int pSubAccountID)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {

                    Com.Parameters.Add(new SqlParameter("@JV_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Account_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@From_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@To_Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@Posted", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@ShowRevaluateEntry", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@IsDocumented", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Journal_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Curr", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@CostCenter_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Branche_IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));

                    Com.CommandText = "[dbo].SP_A_Ledger_Rep_ForCurr_CostCenterForSubReport";
                    Com.Parameters[0].Value = pJV_IDs;
                    Com.Parameters[1].Value = pAccount_IDs;
                    Com.Parameters[2].Value = pFrom_Date;
                    Com.Parameters[3].Value = pTo_Date;
                    Com.Parameters[4].Value = pPosted;
                    Com.Parameters[5].Value = pShowRevaluateEntry;
                    Com.Parameters[6].Value = pIsDocumented;
                    Com.Parameters[7].Value = pJournal_IDs;
                    Com.Parameters[8].Value = pCurr;
                    Com.Parameters[9].Value = pCostCenter_IDs;
                    Com.Parameters[10].Value =pBranche_IDs;
                    Com.Parameters[11].Value = pSubAccountID;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport = new CvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport();
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mID = dr["ID"].ToString() == "" ? 0 : Convert.ToInt64(dr["ID"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mJVDate = dr["JVDate"].ToString() == "" ? DateTime.Parse("01/01/1900") : Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mTotalDebit = dr["TotalDebit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mTotalCredit = dr["TotalCredit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["TotalCredit"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mJournal_ID =  dr["Journal_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mJVType_ID = dr["JVType_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mDeleted = dr["Deleted"].ToString() == "" ? false : Convert.ToBoolean(dr["Deleted"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mPosted =  dr["Posted"].ToString() == "" ? false : Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mUser_ID = dr["User_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mIsSysJv = dr["IsSysJv"].ToString() == "" ? false :  Convert.ToBoolean(dr["IsSysJv"].ToString());

                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mTransType_ID =
                            dr["TransType_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["TransType_ID"].ToString());


                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mDebit = dr["Debit"].ToString() == "" ? 0 :  Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mCredit = dr["Credit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mExchangeRate = dr["ExchangeRate"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mLocalDebit = dr["LocalDebit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["LocalDebit"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mLocalCredit = dr["LocalCredit"].ToString() == "" ? 0 : Convert.ToDecimal(dr["LocalCredit"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mAccount_ID = dr["Account_ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mCostCenter = Convert.ToString(dr["CostCenter"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mdescription = Convert.ToString(dr["description"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mJVType_Name = Convert.ToString(dr["JVType_Name"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mJournal_Name = Convert.ToString(dr["Journal_Name"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mOpening_Balance = dr["Opening_Balance"].ToString() == "" ? 0 : Convert.ToDecimal(dr["Opening_Balance"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mLocalDebitEGP = Convert.ToString(dr["LocalDebitEGP"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mIsDocumented = dr["IsDocumented"].ToString() == "" ? false : Convert.ToBoolean(dr["IsDocumented"].ToString());
                        ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.mSubAccount_Name = Convert.ToString(dr["SubAccount_Name"].ToString());
                        lstCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport.Add(ObjCvwStructure_SP_A_Ledger_Rep_ForCurr_CostCenterForSubReportForSubReport);
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
