using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.MasterData.CashAndBanks.Generated
{
    [Serializable]
    public class CPKSafes
    {
        #region "variables"
        private Int32 mSafeID;
        #endregion

        #region "Methods"
        public Int32 SafeID
        {
            get { return mSafeID; }
            set { mSafeID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarSafes : CPKSafes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mSafeCode;
        internal String mSafeNameEn;
        internal String mSafeNameAr;
        internal Int32 mCurrencyID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        #endregion

        #region "Methods"
        public String SafeCode
        {
            get { return mSafeCode; }
            set { mIsChanges = true; mSafeCode = value; }
        }
        public String SafeNameEn
        {
            get { return mSafeNameEn; }
            set { mIsChanges = true; mSafeNameEn = value; }
        }
        public String SafeNameAr
        {
            get { return mSafeNameAr; }
            set { mIsChanges = true; mSafeNameAr = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Int32 LockingUserID
        {
            get { return mLockingUserID; }
            set { mIsChanges = true; mLockingUserID = value; }
        }
        public DateTime TimeLocked
        {
            get { return mTimeLocked; }
            set { mIsChanges = true; mTimeLocked = value; }
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

    public partial class CSafes
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
        public List<CVarSafes> lstCVarSafes = new List<CVarSafes>();
        public List<CPKSafes> lstDeletedCPKSafes = new List<CPKSafes>();
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
        public Exception GetItem(Int32 SafeID)
        {
            return DataFill(Convert.ToString(SafeID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSafes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSafes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSafes";
                    Com.Parameters.Add(new SqlParameter("@SafeID", SqlDbType.Int));
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
                        CVarSafes ObjCVarSafes = new CVarSafes();
                        ObjCVarSafes.SafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarSafes.mSafeCode = Convert.ToString(dr["SafeCode"].ToString());
                        ObjCVarSafes.mSafeNameEn = Convert.ToString(dr["SafeNameEn"].ToString());
                        ObjCVarSafes.mSafeNameAr = Convert.ToString(dr["SafeNameAr"].ToString());
                        ObjCVarSafes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSafes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSafes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSafes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSafes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarSafes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarSafes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        lstCVarSafes.Add(ObjCVarSafes);
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
            lstCVarSafes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSafes";
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
                        CVarSafes ObjCVarSafes = new CVarSafes();
                        ObjCVarSafes.SafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarSafes.mSafeCode = Convert.ToString(dr["SafeCode"].ToString());
                        ObjCVarSafes.mSafeNameEn = Convert.ToString(dr["SafeNameEn"].ToString());
                        ObjCVarSafes.mSafeNameAr = Convert.ToString(dr["SafeNameAr"].ToString());
                        ObjCVarSafes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarSafes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSafes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSafes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSafes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarSafes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarSafes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSafes.Add(ObjCVarSafes);
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
                    Com.CommandText = "[dbo].DeleteListSafes";
                else
                    Com.CommandText = "[dbo].UpdateListSafes";
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
        public Exception DeleteItem(List<CPKSafes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSafes";
                Com.Parameters.Add(new SqlParameter("@SafeID", SqlDbType.Int));
                foreach (CPKSafes ObjCPKSafes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSafes.SafeID);
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
        public Exception SaveMethod(List<CVarSafes> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@SafeCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SafeNameEn", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SafeNameAr", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                SqlParameter paraSafeID = Com.Parameters.Add(new SqlParameter("@SafeID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "SafeID", DataRowVersion.Default, null));
                foreach (CVarSafes ObjCVarSafes in SaveList)
                {
                    if (ObjCVarSafes.mIsChanges == true)
                    {
                        if (ObjCVarSafes.SafeID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSafes";
                            paraSafeID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSafes.SafeID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSafes";
                            paraSafeID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSafes.SafeID != 0)
                        {
                            Com.Parameters["@SafeID"].Value = ObjCVarSafes.SafeID;
                        }
                        Com.Parameters["@SafeCode"].Value = ObjCVarSafes.SafeCode;
                        Com.Parameters["@SafeNameEn"].Value = ObjCVarSafes.SafeNameEn;
                        Com.Parameters["@SafeNameAr"].Value = ObjCVarSafes.SafeNameAr;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarSafes.CurrencyID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarSafes.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarSafes.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarSafes.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarSafes.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarSafes.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarSafes.TimeLocked;
                        EndTrans(Com, Con);
                        if (ObjCVarSafes.SafeID == 0)
                        {
                            ObjCVarSafes.SafeID = Convert.ToInt32(Com.Parameters["@SafeID"].Value);
                        }
                        ObjCVarSafes.mIsChanges = false;
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
