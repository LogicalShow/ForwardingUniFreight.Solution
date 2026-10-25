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
    public class CPKFA_AssetsInventory
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
    public partial class CVarFA_AssetsInventory : CPKFA_AssetsInventory
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mType;
        internal Int32 mBranchID;
        internal Int32 mDevisionID;
        internal Int32 mDepartmentID;
        internal DateTime mDate;
        internal Boolean mIsApproved;
        internal Int32 mUserID;
        internal String mNotes;
        internal Int32 mCode;
        internal Boolean mIsDeleted;
        #endregion

        #region "Methods"
        public Int32 Type
        {
            get { return mType; }
            set { mIsChanges = true; mType = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int32 DevisionID
        {
            get { return mDevisionID; }
            set { mIsChanges = true; mDevisionID = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mIsChanges = true; mDate = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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

    public partial class CFA_AssetsInventory
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
        public List<CVarFA_AssetsInventory> lstCVarFA_AssetsInventory = new List<CVarFA_AssetsInventory>();
        public List<CPKFA_AssetsInventory> lstDeletedCPKFA_AssetsInventory = new List<CPKFA_AssetsInventory>();
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
            lstCVarFA_AssetsInventory.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_AssetsInventory";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFA_AssetsInventory";
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
                        CVarFA_AssetsInventory ObjCVarFA_AssetsInventory = new CVarFA_AssetsInventory();
                        ObjCVarFA_AssetsInventory.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsInventory.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarFA_AssetsInventory.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarFA_AssetsInventory.mDevisionID = Convert.ToInt32(dr["DevisionID"].ToString());
                        ObjCVarFA_AssetsInventory.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarFA_AssetsInventory.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarFA_AssetsInventory.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarFA_AssetsInventory.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarFA_AssetsInventory.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_AssetsInventory.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarFA_AssetsInventory.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        lstCVarFA_AssetsInventory.Add(ObjCVarFA_AssetsInventory);
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
            lstCVarFA_AssetsInventory.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_AssetsInventory";
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
                        CVarFA_AssetsInventory ObjCVarFA_AssetsInventory = new CVarFA_AssetsInventory();
                        ObjCVarFA_AssetsInventory.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsInventory.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarFA_AssetsInventory.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarFA_AssetsInventory.mDevisionID = Convert.ToInt32(dr["DevisionID"].ToString());
                        ObjCVarFA_AssetsInventory.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarFA_AssetsInventory.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarFA_AssetsInventory.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarFA_AssetsInventory.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarFA_AssetsInventory.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_AssetsInventory.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarFA_AssetsInventory.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_AssetsInventory.Add(ObjCVarFA_AssetsInventory);
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
                    Com.CommandText = "[dbo].DeleteListFA_AssetsInventory";
                else
                    Com.CommandText = "[dbo].UpdateListFA_AssetsInventory";
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
        public Exception DeleteItem(List<CPKFA_AssetsInventory> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFA_AssetsInventory";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFA_AssetsInventory ObjCPKFA_AssetsInventory in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFA_AssetsInventory.ID);
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
        public Exception SaveMethod(List<CVarFA_AssetsInventory> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Type", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DevisionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFA_AssetsInventory ObjCVarFA_AssetsInventory in SaveList)
                {
                    if (ObjCVarFA_AssetsInventory.mIsChanges == true)
                    {
                        if (ObjCVarFA_AssetsInventory.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFA_AssetsInventory";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFA_AssetsInventory.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFA_AssetsInventory";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFA_AssetsInventory.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFA_AssetsInventory.ID;
                        }
                        Com.Parameters["@Type"].Value = ObjCVarFA_AssetsInventory.Type;
                        Com.Parameters["@BranchID"].Value = ObjCVarFA_AssetsInventory.BranchID;
                        Com.Parameters["@DevisionID"].Value = ObjCVarFA_AssetsInventory.DevisionID;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarFA_AssetsInventory.DepartmentID;
                        Com.Parameters["@Date"].Value = ObjCVarFA_AssetsInventory.Date;
                        Com.Parameters["@IsApproved"].Value = ObjCVarFA_AssetsInventory.IsApproved;
                        Com.Parameters["@UserID"].Value = ObjCVarFA_AssetsInventory.UserID;
                        Com.Parameters["@Notes"].Value = ObjCVarFA_AssetsInventory.Notes;
                        Com.Parameters["@Code"].Value = ObjCVarFA_AssetsInventory.Code;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarFA_AssetsInventory.IsDeleted;
                        EndTrans(Com, Con);
                        if (ObjCVarFA_AssetsInventory.ID == 0)
                        {
                            ObjCVarFA_AssetsInventory.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFA_AssetsInventory.mIsChanges = false;
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
