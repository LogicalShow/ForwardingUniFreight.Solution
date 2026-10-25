using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.NoAccess.Generated
{
    [Serializable]
    public class CPKNoAccessCSizes
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
    public partial class CVarNoAccessCSizes : CPKNoAccessCSizes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Byte mTeus;
        internal String mNotes;
        internal Boolean mIsInactive;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public String LocalName
        {
            get { return mLocalName; }
            set { mIsChanges = true; mLocalName = value; }
        }
        public Byte Teus
        {
            get { return mTeus; }
            set { mIsChanges = true; mTeus = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
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

    public partial class CNoAccessCSizes
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
        public List<CVarNoAccessCSizes> lstCVarNoAccessCSizes = new List<CVarNoAccessCSizes>();
        public List<CPKNoAccessCSizes> lstDeletedCPKNoAccessCSizes = new List<CPKNoAccessCSizes>();
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
            lstCVarNoAccessCSizes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListNoAccessCSizes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemNoAccessCSizes";
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
                        CVarNoAccessCSizes ObjCVarNoAccessCSizes = new CVarNoAccessCSizes();
                        ObjCVarNoAccessCSizes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessCSizes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessCSizes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessCSizes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessCSizes.mTeus = Convert.ToByte(dr["Teus"].ToString());
                        ObjCVarNoAccessCSizes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarNoAccessCSizes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarNoAccessCSizes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarNoAccessCSizes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarNoAccessCSizes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarNoAccessCSizes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarNoAccessCSizes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarNoAccessCSizes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        lstCVarNoAccessCSizes.Add(ObjCVarNoAccessCSizes);
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
            lstCVarNoAccessCSizes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingNoAccessCSizes";
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
                        CVarNoAccessCSizes ObjCVarNoAccessCSizes = new CVarNoAccessCSizes();
                        ObjCVarNoAccessCSizes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessCSizes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessCSizes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessCSizes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessCSizes.mTeus = Convert.ToByte(dr["Teus"].ToString());
                        ObjCVarNoAccessCSizes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarNoAccessCSizes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarNoAccessCSizes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarNoAccessCSizes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarNoAccessCSizes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarNoAccessCSizes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarNoAccessCSizes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarNoAccessCSizes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarNoAccessCSizes.Add(ObjCVarNoAccessCSizes);
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
                    Com.CommandText = "[dbo].DeleteListNoAccessCSizes";
                else
                    Com.CommandText = "[dbo].UpdateListNoAccessCSizes";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
        public Exception DeleteItem(List<CPKNoAccessCSizes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemNoAccessCSizes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKNoAccessCSizes ObjCPKNoAccessCSizes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKNoAccessCSizes.ID);
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
        public Exception SaveMethod(List<CVarNoAccessCSizes> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Teus", SqlDbType.TinyInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarNoAccessCSizes ObjCVarNoAccessCSizes in SaveList)
                {
                    if (ObjCVarNoAccessCSizes.mIsChanges == true)
                    {
                        if (ObjCVarNoAccessCSizes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemNoAccessCSizes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarNoAccessCSizes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemNoAccessCSizes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarNoAccessCSizes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarNoAccessCSizes.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarNoAccessCSizes.Code;
                        Com.Parameters["@Name"].Value = ObjCVarNoAccessCSizes.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarNoAccessCSizes.LocalName;
                        Com.Parameters["@Teus"].Value = ObjCVarNoAccessCSizes.Teus;
                        Com.Parameters["@Notes"].Value = ObjCVarNoAccessCSizes.Notes;
                        Com.Parameters["@IsInactive"].Value = ObjCVarNoAccessCSizes.IsInactive;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarNoAccessCSizes.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarNoAccessCSizes.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarNoAccessCSizes.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarNoAccessCSizes.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarNoAccessCSizes.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarNoAccessCSizes.TimeLocked;
                        EndTrans(Com, Con);
                        if (ObjCVarNoAccessCSizes.ID == 0)
                        {
                            ObjCVarNoAccessCSizes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarNoAccessCSizes.mIsChanges = false;
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
