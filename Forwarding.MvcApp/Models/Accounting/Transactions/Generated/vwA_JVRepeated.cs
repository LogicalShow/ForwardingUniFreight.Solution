using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.Sales.Transactions.Generated.Payments.Generated;

namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public class CPKvwA_JVRepeated
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwA_JVRepeated : CPKvwA_JVRepeated
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mJVNo;
        internal DateTime mJVDate;
        internal Decimal mTotalDebit;
        internal Decimal mTotalCredit;
        internal Int32 mJournal_ID;
        internal String mJournalTypeName;
        internal Int32 mJVType_ID;
        internal String mJVTypeName;
        internal String mReceiptNo;
        internal String mRemarksHeader;
        internal Boolean mDeleted;
        internal Boolean mPosted;
        internal Int32 mUser_ID;
        internal String mUsername;
        internal Boolean mIsSysJv;
        internal Int32 mTransType_ID;
        internal Int32 mQuarter_ID;
        internal DateTime mDueDate;
        #endregion

        #region "Methods"
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
        public String JournalTypeName
        {
            get { return mJournalTypeName; }
            set { mJournalTypeName = value; }
        }
        public Int32 JVType_ID
        {
            get { return mJVType_ID; }
            set { mJVType_ID = value; }
        }
        public String JVTypeName
        {
            get { return mJVTypeName; }
            set { mJVTypeName = value; }
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
        public String Username
        {
            get { return mUsername; }
            set { mUsername = value; }
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
        public Int32 Quarter_ID
        {
            get { return mQuarter_ID; }
            set { mQuarter_ID = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mDueDate = value; }
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

    public partial class CvwA_JVRepeated
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
        public List<CVarvwA_JVRepeated> lstCVarvwA_JVRepeated = new List<CVarvwA_JVRepeated>();
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
            lstCVarvwA_JVRepeated.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_JVRepeated";
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
                        CVarvwA_JVRepeated ObjCVarvwA_JVRepeated = new CVarvwA_JVRepeated();
                        ObjCVarvwA_JVRepeated.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_JVRepeated.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarvwA_JVRepeated.mJVDate = Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCVarvwA_JVRepeated.mTotalDebit = Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarvwA_JVRepeated.mTotalCredit = Convert.ToDecimal(dr["TotalCredit"].ToString());
                        ObjCVarvwA_JVRepeated.mJournal_ID = Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mJournalTypeName = Convert.ToString(dr["JournalTypeName"].ToString());
                        ObjCVarvwA_JVRepeated.mJVType_ID = Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mJVTypeName = Convert.ToString(dr["JVTypeName"].ToString());
                        ObjCVarvwA_JVRepeated.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarvwA_JVRepeated.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCVarvwA_JVRepeated.mDeleted = Convert.ToBoolean(dr["Deleted"].ToString());
                        ObjCVarvwA_JVRepeated.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarvwA_JVRepeated.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwA_JVRepeated.mIsSysJv = Convert.ToBoolean(dr["IsSysJv"].ToString());
                        ObjCVarvwA_JVRepeated.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mQuarter_ID = Convert.ToInt32(dr["Quarter_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        lstCVarvwA_JVRepeated.Add(ObjCVarvwA_JVRepeated);
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
            lstCVarvwA_JVRepeated.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_JVRepeated";
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
                        CVarvwA_JVRepeated ObjCVarvwA_JVRepeated = new CVarvwA_JVRepeated();
                        ObjCVarvwA_JVRepeated.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_JVRepeated.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarvwA_JVRepeated.mJVDate = Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCVarvwA_JVRepeated.mTotalDebit = Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarvwA_JVRepeated.mTotalCredit = Convert.ToDecimal(dr["TotalCredit"].ToString());
                        ObjCVarvwA_JVRepeated.mJournal_ID = Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mJournalTypeName = Convert.ToString(dr["JournalTypeName"].ToString());
                        ObjCVarvwA_JVRepeated.mJVType_ID = Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mJVTypeName = Convert.ToString(dr["JVTypeName"].ToString());
                        ObjCVarvwA_JVRepeated.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarvwA_JVRepeated.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCVarvwA_JVRepeated.mDeleted = Convert.ToBoolean(dr["Deleted"].ToString());
                        ObjCVarvwA_JVRepeated.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarvwA_JVRepeated.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwA_JVRepeated.mIsSysJv = Convert.ToBoolean(dr["IsSysJv"].ToString());
                        ObjCVarvwA_JVRepeated.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mQuarter_ID = Convert.ToInt32(dr["Quarter_ID"].ToString());
                        ObjCVarvwA_JVRepeated.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_JVRepeated.Add(ObjCVarvwA_JVRepeated);
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
