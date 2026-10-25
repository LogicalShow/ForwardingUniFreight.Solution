using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.FA.Generated
{
    [Serializable]
    public class CPKFA_Transactions
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
    public partial class CVarFA_Transactions : CPKFA_Transactions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTransactionTypeID;
        internal Decimal mAmount;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Int32 mQtyFactor;
        internal Decimal mQty;
        internal Boolean mIsApproved;
        internal String mNotes;
        internal Decimal mPercentage;
        internal Int32 mDepreciationTypeID;
        internal Int32 mAssetID;
        internal Int32 mJVID;
        internal Int32 mBranchID;
        internal Int32 mExludedTypeID;
        internal Int32 mCode;
        internal Boolean mIsDeleted;
        internal Int32 mDepreciationID;
        internal DateTime mCreationDate;
        internal Int32 mUserID;
        internal Int32 mAmountFactor;
        internal Int32 mPeriodType;
        internal Int32 mAdditionAccountID;
        #endregion

        #region "Methods"
        public Int32 TransactionTypeID
        {
            get { return mTransactionTypeID; }
            set { mIsChanges = true; mTransactionTypeID = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mIsChanges = true; mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mIsChanges = true; mToDate = value; }
        }
        public Int32 QtyFactor
        {
            get { return mQtyFactor; }
            set { mIsChanges = true; mQtyFactor = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mIsChanges = true; mQty = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mIsChanges = true; mPercentage = value; }
        }
        public Int32 DepreciationTypeID
        {
            get { return mDepreciationTypeID; }
            set { mIsChanges = true; mDepreciationTypeID = value; }
        }
        public Int32 AssetID
        {
            get { return mAssetID; }
            set { mIsChanges = true; mAssetID = value; }
        }
        public Int32 JVID
        {
            get { return mJVID; }
            set { mIsChanges = true; mJVID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int32 ExludedTypeID
        {
            get { return mExludedTypeID; }
            set { mIsChanges = true; mExludedTypeID = value; }
        }
        public Int32 Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Int32 DepreciationID
        {
            get { return mDepreciationID; }
            set { mIsChanges = true; mDepreciationID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
        }
        public Int32 AmountFactor
        {
            get { return mAmountFactor; }
            set { mIsChanges = true; mAmountFactor = value; }
        }
        public Int32 PeriodType
        {
            get { return mPeriodType; }
            set { mIsChanges = true; mPeriodType = value; }
        }
        public Int32 AdditionAccountID
        {
            get { return mAdditionAccountID; }
            set { mIsChanges = true; mAdditionAccountID = value; }
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

    public partial class CFA_Transactions
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
        public List<CVarFA_Transactions> lstCVarFA_Transactions = new List<CVarFA_Transactions>();
        public List<CPKFA_Transactions> lstDeletedCPKFA_Transactions = new List<CPKFA_Transactions>();
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
            lstCVarFA_Transactions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_Transactions";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFA_Transactions";
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
                        CVarFA_Transactions ObjCVarFA_Transactions = new CVarFA_Transactions();
                        ObjCVarFA_Transactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_Transactions.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarFA_Transactions.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarFA_Transactions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_Transactions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_Transactions.mQtyFactor = Convert.ToInt32(dr["QtyFactor"].ToString());
                        ObjCVarFA_Transactions.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarFA_Transactions.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarFA_Transactions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_Transactions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_Transactions.mDepreciationTypeID = Convert.ToInt32(dr["DepreciationTypeID"].ToString());
                        ObjCVarFA_Transactions.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        ObjCVarFA_Transactions.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarFA_Transactions.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarFA_Transactions.mExludedTypeID = Convert.ToInt32(dr["ExludedTypeID"].ToString());
                        ObjCVarFA_Transactions.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarFA_Transactions.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarFA_Transactions.mDepreciationID = Convert.ToInt32(dr["DepreciationID"].ToString());
                        ObjCVarFA_Transactions.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarFA_Transactions.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarFA_Transactions.mAmountFactor = Convert.ToInt32(dr["AmountFactor"].ToString());
                        ObjCVarFA_Transactions.mPeriodType = Convert.ToInt32(dr["PeriodType"].ToString());
                        ObjCVarFA_Transactions.mAdditionAccountID = Convert.ToInt32(dr["AdditionAccountID"].ToString());
                        lstCVarFA_Transactions.Add(ObjCVarFA_Transactions);
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
            lstCVarFA_Transactions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_Transactions";
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
                        CVarFA_Transactions ObjCVarFA_Transactions = new CVarFA_Transactions();
                        ObjCVarFA_Transactions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_Transactions.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarFA_Transactions.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarFA_Transactions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_Transactions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_Transactions.mQtyFactor = Convert.ToInt32(dr["QtyFactor"].ToString());
                        ObjCVarFA_Transactions.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarFA_Transactions.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarFA_Transactions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_Transactions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_Transactions.mDepreciationTypeID = Convert.ToInt32(dr["DepreciationTypeID"].ToString());
                        ObjCVarFA_Transactions.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        ObjCVarFA_Transactions.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarFA_Transactions.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarFA_Transactions.mExludedTypeID = Convert.ToInt32(dr["ExludedTypeID"].ToString());
                        ObjCVarFA_Transactions.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarFA_Transactions.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarFA_Transactions.mDepreciationID = Convert.ToInt32(dr["DepreciationID"].ToString());
                        ObjCVarFA_Transactions.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarFA_Transactions.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarFA_Transactions.mAmountFactor = Convert.ToInt32(dr["AmountFactor"].ToString());
                        ObjCVarFA_Transactions.mPeriodType = Convert.ToInt32(dr["PeriodType"].ToString());
                        ObjCVarFA_Transactions.mAdditionAccountID = Convert.ToInt32(dr["AdditionAccountID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_Transactions.Add(ObjCVarFA_Transactions);
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
                    Com.CommandText = "[dbo].DeleteListFA_Transactions";
                else
                    Com.CommandText = "[dbo].UpdateListFA_Transactions";
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
        public Exception DeleteItem(List<CPKFA_Transactions> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFA_Transactions";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFA_Transactions ObjCPKFA_Transactions in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFA_Transactions.ID);
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
        public Exception SaveMethod(List<CVarFA_Transactions> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TransactionTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@QtyFactor", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Percentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DepreciationTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AssetID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExludedTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DepreciationID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AmountFactor", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PeriodType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AdditionAccountID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFA_Transactions ObjCVarFA_Transactions in SaveList)
                {
                    if (ObjCVarFA_Transactions.mIsChanges == true)
                    {
                        if (ObjCVarFA_Transactions.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFA_Transactions";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFA_Transactions.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFA_Transactions";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFA_Transactions.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFA_Transactions.ID;
                        }
                        Com.Parameters["@TransactionTypeID"].Value = ObjCVarFA_Transactions.TransactionTypeID;
                        Com.Parameters["@Amount"].Value = ObjCVarFA_Transactions.Amount;
                        Com.Parameters["@FromDate"].Value = ObjCVarFA_Transactions.FromDate;
                        Com.Parameters["@ToDate"].Value = ObjCVarFA_Transactions.ToDate;
                        Com.Parameters["@QtyFactor"].Value = ObjCVarFA_Transactions.QtyFactor;
                        Com.Parameters["@Qty"].Value = ObjCVarFA_Transactions.Qty;
                        Com.Parameters["@IsApproved"].Value = ObjCVarFA_Transactions.IsApproved;
                        Com.Parameters["@Notes"].Value = ObjCVarFA_Transactions.Notes;
                        Com.Parameters["@Percentage"].Value = ObjCVarFA_Transactions.Percentage;
                        Com.Parameters["@DepreciationTypeID"].Value = ObjCVarFA_Transactions.DepreciationTypeID;
                        Com.Parameters["@AssetID"].Value = ObjCVarFA_Transactions.AssetID;
                        Com.Parameters["@JVID"].Value = ObjCVarFA_Transactions.JVID;
                        Com.Parameters["@BranchID"].Value = ObjCVarFA_Transactions.BranchID;
                        Com.Parameters["@ExludedTypeID"].Value = ObjCVarFA_Transactions.ExludedTypeID;
                        Com.Parameters["@Code"].Value = ObjCVarFA_Transactions.Code;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarFA_Transactions.IsDeleted;
                        Com.Parameters["@DepreciationID"].Value = ObjCVarFA_Transactions.DepreciationID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarFA_Transactions.CreationDate;
                        Com.Parameters["@UserID"].Value = ObjCVarFA_Transactions.UserID;
                        Com.Parameters["@AmountFactor"].Value = ObjCVarFA_Transactions.AmountFactor;
                        Com.Parameters["@PeriodType"].Value = ObjCVarFA_Transactions.PeriodType;
                        Com.Parameters["@AdditionAccountID"].Value = ObjCVarFA_Transactions.AdditionAccountID;
                        EndTrans(Com, Con);
                        if (ObjCVarFA_Transactions.ID == 0)
                        {
                            ObjCVarFA_Transactions.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFA_Transactions.mIsChanges = false;
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
