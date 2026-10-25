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
    public class CPKA_JVRepeated
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
    public partial class CVarA_JVRepeated : CPKA_JVRepeated
    {
        #region "variables"
        internal Boolean mIsChanges = false;
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
        internal Int32 mQuarter_ID;
        internal DateTime mDueDate;
        internal Int64 mJVID;
        #endregion

        #region "Methods"
        public String JVNo
        {
            get { return mJVNo; }
            set { mIsChanges = true; mJVNo = value; }
        }
        public DateTime JVDate
        {
            get { return mJVDate; }
            set { mIsChanges = true; mJVDate = value; }
        }
        public Decimal TotalDebit
        {
            get { return mTotalDebit; }
            set { mIsChanges = true; mTotalDebit = value; }
        }
        public Decimal TotalCredit
        {
            get { return mTotalCredit; }
            set { mIsChanges = true; mTotalCredit = value; }
        }
        public Int32 Journal_ID
        {
            get { return mJournal_ID; }
            set { mIsChanges = true; mJournal_ID = value; }
        }
        public Int32 JVType_ID
        {
            get { return mJVType_ID; }
            set { mIsChanges = true; mJVType_ID = value; }
        }
        public String ReceiptNo
        {
            get { return mReceiptNo; }
            set { mIsChanges = true; mReceiptNo = value; }
        }
        public String RemarksHeader
        {
            get { return mRemarksHeader; }
            set { mIsChanges = true; mRemarksHeader = value; }
        }
        public Boolean Deleted
        {
            get { return mDeleted; }
            set { mIsChanges = true; mDeleted = value; }
        }
        public Boolean Posted
        {
            get { return mPosted; }
            set { mIsChanges = true; mPosted = value; }
        }
        public Int32 User_ID
        {
            get { return mUser_ID; }
            set { mIsChanges = true; mUser_ID = value; }
        }
        public Boolean IsSysJv
        {
            get { return mIsSysJv; }
            set { mIsChanges = true; mIsSysJv = value; }
        }
        public Int32 TransType_ID
        {
            get { return mTransType_ID; }
            set { mIsChanges = true; mTransType_ID = value; }
        }
        public Int32 Quarter_ID
        {
            get { return mQuarter_ID; }
            set { mIsChanges = true; mQuarter_ID = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mIsChanges = true; mDueDate = value; }
        }
        public Int64 JVID
        {
            get { return mJVID; }
            set { mIsChanges = true; mJVID = value; }
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

    public partial class CA_JVRepeated
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
        public List<CVarA_JVRepeated> lstCVarA_JVRepeated = new List<CVarA_JVRepeated>();
        public List<CPKA_JVRepeated> lstDeletedCPKA_JVRepeated = new List<CPKA_JVRepeated>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_JVRepeated.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_JVRepeated";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_JVRepeated";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarA_JVRepeated ObjCVarA_JVRepeated = new CVarA_JVRepeated();
                        ObjCVarA_JVRepeated.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_JVRepeated.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarA_JVRepeated.mJVDate = Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCVarA_JVRepeated.mTotalDebit = Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarA_JVRepeated.mTotalCredit = Convert.ToDecimal(dr["TotalCredit"].ToString());
                        ObjCVarA_JVRepeated.mJournal_ID = Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCVarA_JVRepeated.mJVType_ID = Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCVarA_JVRepeated.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarA_JVRepeated.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCVarA_JVRepeated.mDeleted = Convert.ToBoolean(dr["Deleted"].ToString());
                        ObjCVarA_JVRepeated.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarA_JVRepeated.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarA_JVRepeated.mIsSysJv = Convert.ToBoolean(dr["IsSysJv"].ToString());
                        ObjCVarA_JVRepeated.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarA_JVRepeated.mQuarter_ID = Convert.ToInt32(dr["Quarter_ID"].ToString());
                        ObjCVarA_JVRepeated.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarA_JVRepeated.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        lstCVarA_JVRepeated.Add(ObjCVarA_JVRepeated);
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
            lstCVarA_JVRepeated.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_JVRepeated";
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
                        CVarA_JVRepeated ObjCVarA_JVRepeated = new CVarA_JVRepeated();
                        ObjCVarA_JVRepeated.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_JVRepeated.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarA_JVRepeated.mJVDate = Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCVarA_JVRepeated.mTotalDebit = Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarA_JVRepeated.mTotalCredit = Convert.ToDecimal(dr["TotalCredit"].ToString());
                        ObjCVarA_JVRepeated.mJournal_ID = Convert.ToInt32(dr["Journal_ID"].ToString());
                        ObjCVarA_JVRepeated.mJVType_ID = Convert.ToInt32(dr["JVType_ID"].ToString());
                        ObjCVarA_JVRepeated.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarA_JVRepeated.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCVarA_JVRepeated.mDeleted = Convert.ToBoolean(dr["Deleted"].ToString());
                        ObjCVarA_JVRepeated.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarA_JVRepeated.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarA_JVRepeated.mIsSysJv = Convert.ToBoolean(dr["IsSysJv"].ToString());
                        ObjCVarA_JVRepeated.mTransType_ID = Convert.ToInt32(dr["TransType_ID"].ToString());
                        ObjCVarA_JVRepeated.mQuarter_ID = Convert.ToInt32(dr["Quarter_ID"].ToString());
                        ObjCVarA_JVRepeated.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarA_JVRepeated.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_JVRepeated.Add(ObjCVarA_JVRepeated);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListA_JVRepeated";
                else
                    Com.CommandText = "[dbo].UpdateListA_JVRepeated";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKA_JVRepeated> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_JVRepeated";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKA_JVRepeated ObjCPKA_JVRepeated in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKA_JVRepeated.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarA_JVRepeated> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@JVNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@JVDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TotalDebit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TotalCredit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Journal_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVType_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ReceiptNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RemarksHeader", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Deleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Posted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@User_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsSysJv", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@TransType_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Quarter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DueDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_JVRepeated ObjCVarA_JVRepeated in SaveList)
                {
                    if (ObjCVarA_JVRepeated.mIsChanges == true)
                    {
                        if (ObjCVarA_JVRepeated.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_JVRepeated";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_JVRepeated.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_JVRepeated";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_JVRepeated.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_JVRepeated.ID;
                        }
                        Com.Parameters["@JVNo"].Value = ObjCVarA_JVRepeated.JVNo;
                        Com.Parameters["@JVDate"].Value = ObjCVarA_JVRepeated.JVDate;
                        Com.Parameters["@TotalDebit"].Value = ObjCVarA_JVRepeated.TotalDebit;
                        Com.Parameters["@TotalCredit"].Value = ObjCVarA_JVRepeated.TotalCredit;
                        Com.Parameters["@Journal_ID"].Value = ObjCVarA_JVRepeated.Journal_ID;
                        Com.Parameters["@JVType_ID"].Value = ObjCVarA_JVRepeated.JVType_ID;
                        Com.Parameters["@ReceiptNo"].Value = ObjCVarA_JVRepeated.ReceiptNo;
                        Com.Parameters["@RemarksHeader"].Value = ObjCVarA_JVRepeated.RemarksHeader;
                        Com.Parameters["@Deleted"].Value = ObjCVarA_JVRepeated.Deleted;
                        Com.Parameters["@Posted"].Value = ObjCVarA_JVRepeated.Posted;
                        Com.Parameters["@User_ID"].Value = ObjCVarA_JVRepeated.User_ID;
                        Com.Parameters["@IsSysJv"].Value = ObjCVarA_JVRepeated.IsSysJv;
                        Com.Parameters["@TransType_ID"].Value = ObjCVarA_JVRepeated.TransType_ID;
                        Com.Parameters["@Quarter_ID"].Value = ObjCVarA_JVRepeated.Quarter_ID;
                        Com.Parameters["@DueDate"].Value = ObjCVarA_JVRepeated.DueDate;
                        Com.Parameters["@JVID"].Value = ObjCVarA_JVRepeated.JVID;
                        EndTrans(Com, Con);
                        if (ObjCVarA_JVRepeated.ID == 0)
                        {
                            ObjCVarA_JVRepeated.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_JVRepeated.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }

}
