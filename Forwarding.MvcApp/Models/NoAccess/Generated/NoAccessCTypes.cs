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
    public class CPKNoAccessCTypes
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
    public partial class CVarNoAccessCTypes : CPKNoAccessCTypes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Boolean mIsDry;
        internal Boolean mIsReefer;
        internal Boolean mIsOOG;
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
        public Boolean IsDry
        {
            get { return mIsDry; }
            set { mIsChanges = true; mIsDry = value; }
        }
        public Boolean IsReefer
        {
            get { return mIsReefer; }
            set { mIsChanges = true; mIsReefer = value; }
        }
        public Boolean IsOOG
        {
            get { return mIsOOG; }
            set { mIsChanges = true; mIsOOG = value; }
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

    public partial class CNoAccessCTypes
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
        public List<CVarNoAccessCTypes> lstCVarNoAccessCTypes = new List<CVarNoAccessCTypes>();
        public List<CPKNoAccessCTypes> lstDeletedCPKNoAccessCTypes = new List<CPKNoAccessCTypes>();
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
            lstCVarNoAccessCTypes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListNoAccessCTypes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemNoAccessCTypes";
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
                        CVarNoAccessCTypes ObjCVarNoAccessCTypes = new CVarNoAccessCTypes();
                        ObjCVarNoAccessCTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessCTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessCTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessCTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessCTypes.mIsDry = Convert.ToBoolean(dr["IsDry"].ToString());
                        ObjCVarNoAccessCTypes.mIsReefer = Convert.ToBoolean(dr["IsReefer"].ToString());
                        ObjCVarNoAccessCTypes.mIsOOG = Convert.ToBoolean(dr["IsOOG"].ToString());
                        ObjCVarNoAccessCTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarNoAccessCTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarNoAccessCTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarNoAccessCTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarNoAccessCTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarNoAccessCTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarNoAccessCTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarNoAccessCTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        lstCVarNoAccessCTypes.Add(ObjCVarNoAccessCTypes);
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
            lstCVarNoAccessCTypes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingNoAccessCTypes";
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
                        CVarNoAccessCTypes ObjCVarNoAccessCTypes = new CVarNoAccessCTypes();
                        ObjCVarNoAccessCTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessCTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessCTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessCTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessCTypes.mIsDry = Convert.ToBoolean(dr["IsDry"].ToString());
                        ObjCVarNoAccessCTypes.mIsReefer = Convert.ToBoolean(dr["IsReefer"].ToString());
                        ObjCVarNoAccessCTypes.mIsOOG = Convert.ToBoolean(dr["IsOOG"].ToString());
                        ObjCVarNoAccessCTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarNoAccessCTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarNoAccessCTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarNoAccessCTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarNoAccessCTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarNoAccessCTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarNoAccessCTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarNoAccessCTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarNoAccessCTypes.Add(ObjCVarNoAccessCTypes);
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
                    Com.CommandText = "[dbo].DeleteListNoAccessCTypes";
                else
                    Com.CommandText = "[dbo].UpdateListNoAccessCTypes";
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
        public Exception DeleteItem(List<CPKNoAccessCTypes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemNoAccessCTypes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKNoAccessCTypes ObjCPKNoAccessCTypes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKNoAccessCTypes.ID);
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
        public Exception SaveMethod(List<CVarNoAccessCTypes> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@IsDry", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsReefer", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsOOG", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarNoAccessCTypes ObjCVarNoAccessCTypes in SaveList)
                {
                    if (ObjCVarNoAccessCTypes.mIsChanges == true)
                    {
                        if (ObjCVarNoAccessCTypes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemNoAccessCTypes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarNoAccessCTypes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemNoAccessCTypes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarNoAccessCTypes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarNoAccessCTypes.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarNoAccessCTypes.Code;
                        Com.Parameters["@Name"].Value = ObjCVarNoAccessCTypes.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarNoAccessCTypes.LocalName;
                        Com.Parameters["@IsDry"].Value = ObjCVarNoAccessCTypes.IsDry;
                        Com.Parameters["@IsReefer"].Value = ObjCVarNoAccessCTypes.IsReefer;
                        Com.Parameters["@IsOOG"].Value = ObjCVarNoAccessCTypes.IsOOG;
                        Com.Parameters["@Notes"].Value = ObjCVarNoAccessCTypes.Notes;
                        Com.Parameters["@IsInactive"].Value = ObjCVarNoAccessCTypes.IsInactive;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarNoAccessCTypes.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarNoAccessCTypes.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarNoAccessCTypes.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarNoAccessCTypes.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarNoAccessCTypes.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarNoAccessCTypes.TimeLocked;
                        EndTrans(Com, Con);
                        if (ObjCVarNoAccessCTypes.ID == 0)
                        {
                            ObjCVarNoAccessCTypes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarNoAccessCTypes.mIsChanges = false;
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
