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
    public class CPKFA_Depreciations
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
    public partial class CVarFA_Depreciations : CPKFA_Depreciations
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Int32 mBranchID;
        internal Decimal mTotalAmount;
        internal Boolean mIsDeleted;
        internal Int32 mCode;
        internal Boolean mIsApproved;
        internal DateTime mCreationDate;
        internal Int32 mUserID;
        internal Decimal mTotalQty;
        internal Int32 mPeriodType;
        #endregion

        #region "Methods"
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
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Decimal TotalAmount
        {
            get { return mTotalAmount; }
            set { mIsChanges = true; mTotalAmount = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Int32 Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
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
        public Decimal TotalQty
        {
            get { return mTotalQty; }
            set { mIsChanges = true; mTotalQty = value; }
        }
        public Int32 PeriodType
        {
            get { return mPeriodType; }
            set { mIsChanges = true; mPeriodType = value; }
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

    public partial class CFA_Depreciations
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
        public List<CVarFA_Depreciations> lstCVarFA_Depreciations = new List<CVarFA_Depreciations>();
        public List<CPKFA_Depreciations> lstDeletedCPKFA_Depreciations = new List<CPKFA_Depreciations>();
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
            lstCVarFA_Depreciations.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_Depreciations";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFA_Depreciations";
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
                        CVarFA_Depreciations ObjCVarFA_Depreciations = new CVarFA_Depreciations();
                        ObjCVarFA_Depreciations.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_Depreciations.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_Depreciations.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_Depreciations.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarFA_Depreciations.mTotalAmount = Convert.ToDecimal(dr["TotalAmount"].ToString());
                        ObjCVarFA_Depreciations.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarFA_Depreciations.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarFA_Depreciations.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarFA_Depreciations.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarFA_Depreciations.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarFA_Depreciations.mTotalQty = Convert.ToDecimal(dr["TotalQty"].ToString());
                        ObjCVarFA_Depreciations.mPeriodType = Convert.ToInt32(dr["PeriodType"].ToString());
                        lstCVarFA_Depreciations.Add(ObjCVarFA_Depreciations);
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
            lstCVarFA_Depreciations.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_Depreciations";
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
                        CVarFA_Depreciations ObjCVarFA_Depreciations = new CVarFA_Depreciations();
                        ObjCVarFA_Depreciations.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_Depreciations.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_Depreciations.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_Depreciations.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarFA_Depreciations.mTotalAmount = Convert.ToDecimal(dr["TotalAmount"].ToString());
                        ObjCVarFA_Depreciations.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarFA_Depreciations.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarFA_Depreciations.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarFA_Depreciations.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarFA_Depreciations.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarFA_Depreciations.mTotalQty = Convert.ToDecimal(dr["TotalQty"].ToString());
                        ObjCVarFA_Depreciations.mPeriodType = Convert.ToInt32(dr["PeriodType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_Depreciations.Add(ObjCVarFA_Depreciations);
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
                    Com.CommandText = "[dbo].DeleteListFA_Depreciations";
                else
                    Com.CommandText = "[dbo].UpdateListFA_Depreciations";
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
        public Exception DeleteItem(List<CPKFA_Depreciations> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFA_Depreciations";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFA_Depreciations ObjCPKFA_Depreciations in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFA_Depreciations.ID);
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
        public Exception SaveMethod(List<CVarFA_Depreciations> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TotalAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TotalQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PeriodType", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFA_Depreciations ObjCVarFA_Depreciations in SaveList)
                {
                    if (ObjCVarFA_Depreciations.mIsChanges == true)
                    {
                        if (ObjCVarFA_Depreciations.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFA_Depreciations";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFA_Depreciations.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFA_Depreciations";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFA_Depreciations.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFA_Depreciations.ID;
                        }
                        Com.Parameters["@FromDate"].Value = ObjCVarFA_Depreciations.FromDate;
                        Com.Parameters["@ToDate"].Value = ObjCVarFA_Depreciations.ToDate;
                        Com.Parameters["@BranchID"].Value = ObjCVarFA_Depreciations.BranchID;
                        Com.Parameters["@TotalAmount"].Value = ObjCVarFA_Depreciations.TotalAmount;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarFA_Depreciations.IsDeleted;
                        Com.Parameters["@Code"].Value = ObjCVarFA_Depreciations.Code;
                        Com.Parameters["@IsApproved"].Value = ObjCVarFA_Depreciations.IsApproved;
                        Com.Parameters["@CreationDate"].Value = ObjCVarFA_Depreciations.CreationDate;
                        Com.Parameters["@UserID"].Value = ObjCVarFA_Depreciations.UserID;
                        Com.Parameters["@TotalQty"].Value = ObjCVarFA_Depreciations.TotalQty;
                        Com.Parameters["@PeriodType"].Value = ObjCVarFA_Depreciations.PeriodType;
                        EndTrans(Com, Con);
                        if (ObjCVarFA_Depreciations.ID == 0)
                        {
                            ObjCVarFA_Depreciations.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFA_Depreciations.mIsChanges = false;
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
