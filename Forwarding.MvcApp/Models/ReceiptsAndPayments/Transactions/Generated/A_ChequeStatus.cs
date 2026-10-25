using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.Sales.Transactions.Generated.Payments.Generated;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public class CPKA_ChequeStatus
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
    public partial class CVarA_ChequeStatus : CPKA_ChequeStatus
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mVoucherID;
        internal String mChequeNo;
        internal DateTime mChequeDate;
        internal Boolean mType;
        internal Int32 mBankID;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal Boolean mInOut;
        internal DateTime mDueDate;
        internal Int64 mJVID;
        internal Boolean mPosted;
        internal Boolean mUnderCollection;
        internal Boolean mCollected;
        internal Boolean mReturned;
        internal Boolean mToSafe;
        internal Int32 mSafeID;
        internal Int32 mVoucherType;
        #endregion

        #region "Methods"
        public Int64 VoucherID
        {
            get { return mVoucherID; }
            set { mIsChanges = true; mVoucherID = value; }
        }
        public String ChequeNo
        {
            get { return mChequeNo; }
            set { mIsChanges = true; mChequeNo = value; }
        }
        public DateTime ChequeDate
        {
            get { return mChequeDate; }
            set { mIsChanges = true; mChequeDate = value; }
        }
        public Boolean Type
        {
            get { return mType; }
            set { mIsChanges = true; mType = value; }
        }
        public Int32 BankID
        {
            get { return mBankID; }
            set { mIsChanges = true; mBankID = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Boolean InOut
        {
            get { return mInOut; }
            set { mIsChanges = true; mInOut = value; }
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
        public Boolean Posted
        {
            get { return mPosted; }
            set { mIsChanges = true; mPosted = value; }
        }
        public Boolean UnderCollection
        {
            get { return mUnderCollection; }
            set { mIsChanges = true; mUnderCollection = value; }
        }
        public Boolean Collected
        {
            get { return mCollected; }
            set { mIsChanges = true; mCollected = value; }
        }
        public Boolean Returned
        {
            get { return mReturned; }
            set { mIsChanges = true; mReturned = value; }
        }
        public Boolean ToSafe
        {
            get { return mToSafe; }
            set { mIsChanges = true; mToSafe = value; }
        }
        public Int32 SafeID
        {
            get { return mSafeID; }
            set { mIsChanges = true; mSafeID = value; }
        }
        public Int32 VoucherType
        {
            get { return mVoucherType; }
            set { mIsChanges = true; mVoucherType = value; }
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

    public partial class CA_ChequeStatus
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
        public List<CVarA_ChequeStatus> lstCVarA_ChequeStatus = new List<CVarA_ChequeStatus>();
        public List<CPKA_ChequeStatus> lstDeletedCPKA_ChequeStatus = new List<CPKA_ChequeStatus>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_ChequeStatus.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_ChequeStatus";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_ChequeStatus";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarA_ChequeStatus ObjCVarA_ChequeStatus = new CVarA_ChequeStatus();
                        ObjCVarA_ChequeStatus.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_ChequeStatus.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarA_ChequeStatus.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarA_ChequeStatus.mChequeDate = Convert.ToDateTime(dr["ChequeDate"].ToString());
                        ObjCVarA_ChequeStatus.mType = Convert.ToBoolean(dr["Type"].ToString());
                        ObjCVarA_ChequeStatus.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarA_ChequeStatus.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarA_ChequeStatus.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarA_ChequeStatus.mInOut = Convert.ToBoolean(dr["InOut"].ToString());
                        ObjCVarA_ChequeStatus.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarA_ChequeStatus.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarA_ChequeStatus.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarA_ChequeStatus.mUnderCollection = Convert.ToBoolean(dr["UnderCollection"].ToString());
                        ObjCVarA_ChequeStatus.mCollected = Convert.ToBoolean(dr["Collected"].ToString());
                        ObjCVarA_ChequeStatus.mReturned = Convert.ToBoolean(dr["Returned"].ToString());
                        ObjCVarA_ChequeStatus.mToSafe = Convert.ToBoolean(dr["ToSafe"].ToString());
                        ObjCVarA_ChequeStatus.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarA_ChequeStatus.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        lstCVarA_ChequeStatus.Add(ObjCVarA_ChequeStatus);
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
            lstCVarA_ChequeStatus.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_ChequeStatus";
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
                        CVarA_ChequeStatus ObjCVarA_ChequeStatus = new CVarA_ChequeStatus();
                        ObjCVarA_ChequeStatus.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_ChequeStatus.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarA_ChequeStatus.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarA_ChequeStatus.mChequeDate = Convert.ToDateTime(dr["ChequeDate"].ToString());
                        ObjCVarA_ChequeStatus.mType = Convert.ToBoolean(dr["Type"].ToString());
                        ObjCVarA_ChequeStatus.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarA_ChequeStatus.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarA_ChequeStatus.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarA_ChequeStatus.mInOut = Convert.ToBoolean(dr["InOut"].ToString());
                        ObjCVarA_ChequeStatus.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarA_ChequeStatus.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarA_ChequeStatus.mPosted = Convert.ToBoolean(dr["Posted"].ToString());
                        ObjCVarA_ChequeStatus.mUnderCollection = Convert.ToBoolean(dr["UnderCollection"].ToString());
                        ObjCVarA_ChequeStatus.mCollected = Convert.ToBoolean(dr["Collected"].ToString());
                        ObjCVarA_ChequeStatus.mReturned = Convert.ToBoolean(dr["Returned"].ToString());
                        ObjCVarA_ChequeStatus.mToSafe = Convert.ToBoolean(dr["ToSafe"].ToString());
                        ObjCVarA_ChequeStatus.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarA_ChequeStatus.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_ChequeStatus.Add(ObjCVarA_ChequeStatus);
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
                    Com.CommandText = "[dbo].DeleteListA_ChequeStatus";
                else
                    Com.CommandText = "[dbo].UpdateListA_ChequeStatus";
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
        public Exception DeleteItem(List<CPKA_ChequeStatus> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_ChequeStatus";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_ChequeStatus ObjCPKA_ChequeStatus in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_ChequeStatus.ID);
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
        public Exception SaveMethod(List<CVarA_ChequeStatus> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@VoucherID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ChequeNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ChequeDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Type", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@BankID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InOut", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DueDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Posted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@UnderCollection", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Collected", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Returned", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ToSafe", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@SafeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VoucherType", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_ChequeStatus ObjCVarA_ChequeStatus in SaveList)
                {
                    if (ObjCVarA_ChequeStatus.mIsChanges == true)
                    {
                        if (ObjCVarA_ChequeStatus.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_ChequeStatus";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_ChequeStatus.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_ChequeStatus";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_ChequeStatus.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_ChequeStatus.ID;
                        }
                        Com.Parameters["@VoucherID"].Value = ObjCVarA_ChequeStatus.VoucherID;
                        Com.Parameters["@ChequeNo"].Value = ObjCVarA_ChequeStatus.ChequeNo;
                        Com.Parameters["@ChequeDate"].Value = ObjCVarA_ChequeStatus.ChequeDate;
                        Com.Parameters["@Type"].Value = ObjCVarA_ChequeStatus.Type;
                        Com.Parameters["@BankID"].Value = ObjCVarA_ChequeStatus.BankID;
                        Com.Parameters["@Amount"].Value = ObjCVarA_ChequeStatus.Amount;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarA_ChequeStatus.CurrencyID;
                        Com.Parameters["@InOut"].Value = ObjCVarA_ChequeStatus.InOut;
                        Com.Parameters["@DueDate"].Value = ObjCVarA_ChequeStatus.DueDate;
                        Com.Parameters["@JVID"].Value = ObjCVarA_ChequeStatus.JVID;
                        Com.Parameters["@Posted"].Value = ObjCVarA_ChequeStatus.Posted;
                        Com.Parameters["@UnderCollection"].Value = ObjCVarA_ChequeStatus.UnderCollection;
                        Com.Parameters["@Collected"].Value = ObjCVarA_ChequeStatus.Collected;
                        Com.Parameters["@Returned"].Value = ObjCVarA_ChequeStatus.Returned;
                        Com.Parameters["@ToSafe"].Value = ObjCVarA_ChequeStatus.ToSafe;
                        Com.Parameters["@SafeID"].Value = ObjCVarA_ChequeStatus.SafeID;
                        Com.Parameters["@VoucherType"].Value = ObjCVarA_ChequeStatus.VoucherType;
                        EndTrans(Com, Con);
                        if (ObjCVarA_ChequeStatus.ID == 0)
                        {
                            ObjCVarA_ChequeStatus.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_ChequeStatus.mIsChanges = false;
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
        public Exception A_JVUpdateList(string WhereClause)
        {

            Boolean IsDelete = false;
            //GlobalConnection.OpenConnection();
            Exception Exp = null;
            //GlobalConnection.GlobalCon = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;// = GlobalConnection.GlobalCom;
            try
            {
                // GlobalConnection.myTrans = GlobalConnection.myConnection.BeginTransaction(IsolationLevel.ReadUncommitted);
                GlobalConnection.myCommand = new SqlCommand();

                GlobalConnection.myCommand.Connection = GlobalConnection.myConnection;
                GlobalConnection.myCommand.Transaction = GlobalConnection.myTrans;
                GlobalConnection.myCommand.CommandType = CommandType.StoredProcedure;
                Com = GlobalConnection.myCommand;
                //GlobalConnection.GlobalCon.Open();
                //Com = new SqlCommand();

                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListA_ChequeStatus";
                else
                    Com.CommandText = "[dbo].UpdateListA_ChequeStatus";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                //BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                //EndTrans(Com, Con);
                Com.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                //Con.Close();
                //Con.Dispose();
            }
            return Exp;
        }
        #endregion
    }
}
