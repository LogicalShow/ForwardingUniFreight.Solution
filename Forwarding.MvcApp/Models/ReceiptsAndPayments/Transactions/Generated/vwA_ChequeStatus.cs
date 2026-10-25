using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public class CPKvwA_ChequeStatus
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwA_ChequeStatus : CPKvwA_ChequeStatus
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mVoucherID;
        internal Int64 mJVID1;
        internal String mChequeNo;
        internal DateTime mChequeDate;
        internal Boolean mType;
        internal Int32 mBankID;
        internal String mBankName;
        internal Int32 mNotesPayable;
        internal Int32 mNotesPayableUnderCollection;
        internal Int32 mNotesReceivable;
        internal Int32 mNotesReceivableUnderCollection;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Boolean mInOut;
        internal DateTime mDueDate;
        internal Boolean mPosted;
        internal Boolean mUnderCollection;
        internal Boolean mCollected;
        internal Boolean mReturned;
        internal Boolean mToSafe;
        internal String mSafeName;
        internal Int32 mSafeID;
        internal Int32 mVoucherType;
        internal Int32 mTransType_ID;
        #endregion

        #region "Methods"
        public Int64 VoucherID
        {
            get { return mVoucherID; }
            set { mVoucherID = value; }
        }
        public Int64 JVID1
        {
            get { return mJVID1; }
            set { mJVID1 = value; }
        }
        public String ChequeNo
        {
            get { return mChequeNo; }
            set { mChequeNo = value; }
        }
        public DateTime ChequeDate
        {
            get { return mChequeDate; }
            set { mChequeDate = value; }
        }
        public Boolean Type
        {
            get { return mType; }
            set { mType = value; }
        }
        public Int32 BankID
        {
            get { return mBankID; }
            set { mBankID = value; }
        }
        public String BankName
        {
            get { return mBankName; }
            set { mBankName = value; }
        }
        public Int32 NotesPayable
        {
            get { return mNotesPayable; }
            set { mNotesPayable = value; }
        }
        public Int32 NotesPayableUnderCollection
        {
            get { return mNotesPayableUnderCollection; }
            set { mNotesPayableUnderCollection = value; }
        }
        public Int32 NotesReceivable
        {
            get { return mNotesReceivable; }
            set { mNotesReceivable = value; }
        }
        public Int32 NotesReceivableUnderCollection
        {
            get { return mNotesReceivableUnderCollection; }
            set { mNotesReceivableUnderCollection = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Boolean InOut
        {
            get { return mInOut; }
            set { mInOut = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mDueDate = value; }
        }
        public Boolean Posted
        {
            get { return mPosted; }
            set { mPosted = value; }
        }
        public Boolean UnderCollection
        {
            get { return mUnderCollection; }
            set { mUnderCollection = value; }
        }
        public Boolean Collected
        {
            get { return mCollected; }
            set { mCollected = value; }
        }
        public Boolean Returned
        {
            get { return mReturned; }
            set { mReturned = value; }
        }
        public Boolean ToSafe
        {
            get { return mToSafe; }
            set { mToSafe = value; }
        }
        public String SafeName
        {
            get { return mSafeName; }
            set { mSafeName = value; }
        }
        public Int32 SafeID
        {
            get { return mSafeID; }
            set { mSafeID = value; }
        }
        public Int32 VoucherType
        {
            get { return mVoucherType; }
            set { mVoucherType = value; }
        }
        public Int32 TransType_ID
        {
            get { return mTransType_ID; }
            set { mTransType_ID = value; }
        }
        #endregion

        #region Functions
        public Boolean GetIsChange()
        {
            return mIsChanges;
        }
        public void SetIsChange(Boolean IsChange)
        {
            mIsChanges = IsChange;
        }
        #endregion
    }

    public partial class CvwA_ChequeStatus
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
        public List<CVarvwA_ChequeStatus> lstCVarvwA_ChequeStatus = new List<CVarvwA_ChequeStatus>();
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
            lstCVarvwA_ChequeStatus.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_ChequeStatus";
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
                        CVarvwA_ChequeStatus ObjCVarvwA_ChequeStatus = new CVarvwA_ChequeStatus();
                        ObjCVarvwA_ChequeStatus.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_ChequeStatus.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarvwA_ChequeStatus.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarvwA_ChequeStatus.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarvwA_ChequeStatus.mChequeDate = Convert.ToDateTime(dr["ChequeDate"].ToString());
                        ObjCVarvwA_ChequeStatus.mType = Convert.ToBoolean(dr["Type"].ToString());
                        ObjCVarvwA_ChequeStatus.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarvwA_ChequeStatus.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwA_ChequeStatus.mNotesPayable = Convert.ToInt32(dr["NotesPayable"].ToString());
                        ObjCVarvwA_ChequeStatus.mNotesPayableUnderCollection = Convert.ToInt32(dr["NotesPayableUnderCollection"].ToString());
                        ObjCVarvwA_ChequeStatus.mNotesReceivable = Convert.ToInt32(dr["NotesReceivable"].ToString());
                        ObjCVarvwA_ChequeStatus.mNotesReceivableUnderCollection = Convert.ToInt32(dr["NotesReceivableUnderCollection"].ToString());
                        ObjCVarvwA_ChequeStatus.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwA_ChequeStatus.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwA_ChequeStatus.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwA_ChequeStatus.mInOut = Convert.ToBoolean(dr["InOut"].ToString());
                        ObjCVarvwA_ChequeStatus.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwA_ChequeStatus.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarvwA_ChequeStatus.mUnderCollection = Convert.ToBoolean(dr["UnderCollection"].ToString());
                        ObjCVarvwA_ChequeStatus.mCollected = Convert.ToBoolean(dr["Collected"].ToString());
                        ObjCVarvwA_ChequeStatus.mReturned = Convert.ToBoolean(dr["Returned"].ToString());
                        ObjCVarvwA_ChequeStatus.mToSafe = Convert.ToBoolean(dr["ToSafe"].ToString());
                        ObjCVarvwA_ChequeStatus.mSafeName = Convert.ToString(dr["SafeName"].ToString());
                        ObjCVarvwA_ChequeStatus.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwA_ChequeStatus.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        ObjCVarvwA_ChequeStatus.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        lstCVarvwA_ChequeStatus.Add(ObjCVarvwA_ChequeStatus);
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
            lstCVarvwA_ChequeStatus.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_ChequeStatus";
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
                        CVarvwA_ChequeStatus ObjCVarvwA_ChequeStatus = new CVarvwA_ChequeStatus();
                        ObjCVarvwA_ChequeStatus.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_ChequeStatus.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarvwA_ChequeStatus.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarvwA_ChequeStatus.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarvwA_ChequeStatus.mChequeDate = Convert.ToDateTime(dr["ChequeDate"].ToString());
                        ObjCVarvwA_ChequeStatus.mType = Convert.ToBoolean(dr["Type"].ToString());
                        ObjCVarvwA_ChequeStatus.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarvwA_ChequeStatus.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwA_ChequeStatus.mNotesPayable = Convert.ToInt32(dr["NotesPayable"].ToString());
                        ObjCVarvwA_ChequeStatus.mNotesPayableUnderCollection = Convert.ToInt32(dr["NotesPayableUnderCollection"].ToString());
                        ObjCVarvwA_ChequeStatus.mNotesReceivable = Convert.ToInt32(dr["NotesReceivable"].ToString());
                        ObjCVarvwA_ChequeStatus.mNotesReceivableUnderCollection = Convert.ToInt32(dr["NotesReceivableUnderCollection"].ToString());
                        ObjCVarvwA_ChequeStatus.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwA_ChequeStatus.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwA_ChequeStatus.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwA_ChequeStatus.mInOut = Convert.ToBoolean(dr["InOut"].ToString());
                        ObjCVarvwA_ChequeStatus.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwA_ChequeStatus.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarvwA_ChequeStatus.mUnderCollection = Convert.ToBoolean(dr["UnderCollection"].ToString());
                        ObjCVarvwA_ChequeStatus.mCollected = Convert.ToBoolean(dr["Collected"].ToString());
                        ObjCVarvwA_ChequeStatus.mReturned = Convert.ToBoolean(dr["Returned"].ToString());
                        ObjCVarvwA_ChequeStatus.mToSafe = Convert.ToBoolean(dr["ToSafe"].ToString());
                        ObjCVarvwA_ChequeStatus.mSafeName = Convert.ToString(dr["SafeName"].ToString());
                        ObjCVarvwA_ChequeStatus.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwA_ChequeStatus.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        ObjCVarvwA_ChequeStatus.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_ChequeStatus.Add(ObjCVarvwA_ChequeStatus);
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
