using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public partial class CVarvwA_JVsPrinting
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
        internal Int64 mJVD;
        internal Int64 mJV_ID;
        internal Int32 mAccount_ID;
        internal Int32 mSubAccount_ID;
        internal Int32 mCostCenter_ID;
        internal Decimal mDebit;
        internal Decimal mCredit;
        internal Int32 mCurrency_ID;
        internal Decimal mExchangeRate;
        internal Decimal mLocalDebit;
        internal Decimal mLocalCredit;
        internal String mDescription;
        internal Boolean misDocumented;
        internal String mAccountName;
        internal String mAccountNumber;
        internal String msubAccountName;
        internal String mSubAccount_Number;
        internal String mCostCenter;
        internal String mCode;
        internal String mJVType_Name;
        internal String mJournal_Name;
        internal String mValueText;
        internal String mUserName;
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
        public Int64 JVD
        {
            get { return mJVD; }
            set { mJVD = value; }
        }
        public Int64 JV_ID
        {
            get { return mJV_ID; }
            set { mJV_ID = value; }
        }
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mAccount_ID = value; }
        }
        public Int32 SubAccount_ID
        {
            get { return mSubAccount_ID; }
            set { mSubAccount_ID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
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
        public Int32 Currency_ID
        {
            get { return mCurrency_ID; }
            set { mCurrency_ID = value; }
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
        public String Description
        {
            get { return mDescription; }
            set { mDescription = value; }
        }
        public Boolean isDocumented
        {
            get { return misDocumented; }
            set { misDocumented = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public String AccountNumber
        {
            get { return mAccountNumber; }
            set { mAccountNumber = value; }
        }
        public String subAccountName
        {
            get { return msubAccountName; }
            set { msubAccountName = value; }
        }
        public String SubAccount_Number
        {
            get { return mSubAccount_Number; }
            set { mSubAccount_Number = value; }
        }
        public String CostCenter
        {
            get { return mCostCenter; }
            set { mCostCenter = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
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
        public String ValueText
        {
            get { return mValueText; }
            set { mValueText = value; }
        }
        public String UserName
        {
            get { return mUserName; }
            set { mUserName = value; }
        }
        #endregion
    }

    public partial class CvwA_JVsPrinting
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
        public List<CVarvwA_JVsPrinting> lstCVarvwA_JVsPrinting = new List<CVarvwA_JVsPrinting>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_JVsPrinting.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_JVsPrinting";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_JVsPrinting ObjCVarvwA_JVsPrinting = new CVarvwA_JVsPrinting();
                        ObjCVarvwA_JVsPrinting.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVDate = Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCVarvwA_JVsPrinting.mTotalDebit = Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarvwA_JVsPrinting.mTotalCredit = Convert.ToDecimal(dr["TotalCredit"].ToString());
                        ObjCVarvwA_JVsPrinting.mJournal_ID = Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVType_ID = Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarvwA_JVsPrinting.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCVarvwA_JVsPrinting.mDeleted = Convert.ToBoolean(dr["Deleted"].ToString());
                        ObjCVarvwA_JVsPrinting.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarvwA_JVsPrinting.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mIsSysJv = Convert.ToBoolean(dr["IsSysJv"].ToString());
                        ObjCVarvwA_JVsPrinting.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVD = Convert.ToInt64(dr["JVD"].ToString());
                        ObjCVarvwA_JVsPrinting.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mDebit = Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCVarvwA_JVsPrinting.mCredit = Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCVarvwA_JVsPrinting.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwA_JVsPrinting.mLocalDebit = Convert.ToDecimal(dr["LocalDebit"].ToString());
                        ObjCVarvwA_JVsPrinting.mLocalCredit = Convert.ToDecimal(dr["LocalCredit"].ToString());
                        ObjCVarvwA_JVsPrinting.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarvwA_JVsPrinting.misDocumented = Convert.ToBoolean(dr["isDocumented"].ToString());
                        ObjCVarvwA_JVsPrinting.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwA_JVsPrinting.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarvwA_JVsPrinting.msubAccountName = Convert.ToString(dr["subAccountName"].ToString());
                        ObjCVarvwA_JVsPrinting.mSubAccount_Number = Convert.ToString(dr["SubAccount_Number"].ToString());
                        ObjCVarvwA_JVsPrinting.mCostCenter = Convert.ToString(dr["CostCenter"].ToString());
                        ObjCVarvwA_JVsPrinting.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVType_Name = Convert.ToString(dr["JVType_Name"].ToString());
                        ObjCVarvwA_JVsPrinting.mJournal_Name = Convert.ToString(dr["Journal_Name"].ToString());
                        ObjCVarvwA_JVsPrinting.mValueText = Convert.ToString(dr["ValueText"].ToString());
                        ObjCVarvwA_JVsPrinting.mUserName = Convert.ToString(dr["UserName"].ToString());
                        lstCVarvwA_JVsPrinting.Add(ObjCVarvwA_JVsPrinting);
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

        private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_JVsPrinting.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwA_JVsPrinting";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_JVsPrinting ObjCVarvwA_JVsPrinting = new CVarvwA_JVsPrinting();
                        ObjCVarvwA_JVsPrinting.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVDate = Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCVarvwA_JVsPrinting.mTotalDebit = Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarvwA_JVsPrinting.mTotalCredit = Convert.ToDecimal(dr["TotalCredit"].ToString());
                        ObjCVarvwA_JVsPrinting.mJournal_ID = Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVType_ID = Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarvwA_JVsPrinting.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCVarvwA_JVsPrinting.mDeleted = Convert.ToBoolean(dr["Deleted"].ToString());
                        ObjCVarvwA_JVsPrinting.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarvwA_JVsPrinting.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mIsSysJv = Convert.ToBoolean(dr["IsSysJv"].ToString());
                        ObjCVarvwA_JVsPrinting.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVD = Convert.ToInt64(dr["JVD"].ToString());
                        ObjCVarvwA_JVsPrinting.mJV_ID = Convert.ToInt64(dr["JV_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mDebit = Convert.ToDecimal(dr["Debit"].ToString());
                        ObjCVarvwA_JVsPrinting.mCredit = Convert.ToDecimal(dr["Credit"].ToString());
                        ObjCVarvwA_JVsPrinting.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
                        ObjCVarvwA_JVsPrinting.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwA_JVsPrinting.mLocalDebit = Convert.ToDecimal(dr["LocalDebit"].ToString());
                        ObjCVarvwA_JVsPrinting.mLocalCredit = Convert.ToDecimal(dr["LocalCredit"].ToString());
                        ObjCVarvwA_JVsPrinting.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarvwA_JVsPrinting.misDocumented = Convert.ToBoolean(dr["isDocumented"].ToString());
                        ObjCVarvwA_JVsPrinting.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwA_JVsPrinting.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarvwA_JVsPrinting.msubAccountName = Convert.ToString(dr["subAccountName"].ToString());
                        ObjCVarvwA_JVsPrinting.mSubAccount_Number = Convert.ToString(dr["SubAccount_Number"].ToString());
                        ObjCVarvwA_JVsPrinting.mCostCenter = Convert.ToString(dr["CostCenter"].ToString());
                        ObjCVarvwA_JVsPrinting.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_JVsPrinting.mJVType_Name = Convert.ToString(dr["JVType_Name"].ToString());
                        ObjCVarvwA_JVsPrinting.mJournal_Name = Convert.ToString(dr["Journal_Name"].ToString());
                        ObjCVarvwA_JVsPrinting.mValueText = Convert.ToString(dr["ValueText"].ToString());
                        ObjCVarvwA_JVsPrinting.mUserName = Convert.ToString(dr["UserName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_JVsPrinting.Add(ObjCVarvwA_JVsPrinting);
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
