using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Others.Generated
{
    [Serializable]
    public class CPKPackageTypes
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
    public partial class CVarPackageTypes : CPKPackageTypes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal String mPrintAs;
        internal String mNotes;
        internal Boolean mIsOcean;
        internal Boolean mIsAir;
        internal Boolean mIsInland;
        internal Boolean mIsInactive;
        internal Boolean mIsAddedManually;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal Boolean mIsCustomsClearance;
        internal Boolean mIsWarehousing;
        internal String mcrmCode;
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
        public String PrintAs
        {
            get { return mPrintAs; }
            set { mIsChanges = true; mPrintAs = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsOcean
        {
            get { return mIsOcean; }
            set { mIsChanges = true; mIsOcean = value; }
        }
        public Boolean IsAir
        {
            get { return mIsAir; }
            set { mIsChanges = true; mIsAir = value; }
        }
        public Boolean IsInland
        {
            get { return mIsInland; }
            set { mIsChanges = true; mIsInland = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
        }
        public Boolean IsAddedManually
        {
            get { return mIsAddedManually; }
            set { mIsChanges = true; mIsAddedManually = value; }
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
        public Boolean IsCustomsClearance
        {
            get { return mIsCustomsClearance; }
            set { mIsChanges = true; mIsCustomsClearance = value; }
        }
        public Boolean IsWarehousing
        {
            get { return mIsWarehousing; }
            set { mIsChanges = true; mIsWarehousing = value; }
        }
        public String crmCode
        {
            get { return mcrmCode; }
            set { mIsChanges = true; mcrmCode = value; }
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

    public partial class CPackageTypes
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
        public List<CVarPackageTypes> lstCVarPackageTypes = new List<CVarPackageTypes>();
        public List<CPKPackageTypes> lstDeletedCPKPackageTypes = new List<CPKPackageTypes>();
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
            lstCVarPackageTypes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPackageTypes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPackageTypes";
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
                        CVarPackageTypes ObjCVarPackageTypes = new CVarPackageTypes();
                        ObjCVarPackageTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPackageTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarPackageTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarPackageTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarPackageTypes.mPrintAs = Convert.ToString(dr["PrintAs"].ToString());
                        ObjCVarPackageTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPackageTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarPackageTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarPackageTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarPackageTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarPackageTypes.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarPackageTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPackageTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPackageTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPackageTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPackageTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarPackageTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarPackageTypes.mIsCustomsClearance = Convert.ToBoolean(dr["IsCustomsClearance"].ToString());
                        ObjCVarPackageTypes.mIsWarehousing = Convert.ToBoolean(dr["IsWarehousing"].ToString());
                        ObjCVarPackageTypes.mcrmCode = Convert.ToString(dr["crmCode"].ToString());
                        lstCVarPackageTypes.Add(ObjCVarPackageTypes);
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
            lstCVarPackageTypes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPackageTypes";
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
                        CVarPackageTypes ObjCVarPackageTypes = new CVarPackageTypes();
                        ObjCVarPackageTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPackageTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarPackageTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarPackageTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarPackageTypes.mPrintAs = Convert.ToString(dr["PrintAs"].ToString());
                        ObjCVarPackageTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPackageTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarPackageTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarPackageTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarPackageTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarPackageTypes.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarPackageTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPackageTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPackageTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPackageTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPackageTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarPackageTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarPackageTypes.mIsCustomsClearance = Convert.ToBoolean(dr["IsCustomsClearance"].ToString());
                        ObjCVarPackageTypes.mIsWarehousing = Convert.ToBoolean(dr["IsWarehousing"].ToString());
                        ObjCVarPackageTypes.mcrmCode = Convert.ToString(dr["crmCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPackageTypes.Add(ObjCVarPackageTypes);
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
                    Com.CommandText = "[dbo].DeleteListPackageTypes";
                else
                    Com.CommandText = "[dbo].UpdateListPackageTypes";
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
        public Exception DeleteItem(List<CPKPackageTypes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPackageTypes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKPackageTypes ObjCPKPackageTypes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKPackageTypes.ID);
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
        public Exception SaveMethod(List<CVarPackageTypes> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@PrintAs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsOcean", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAir", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInland", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAddedManually", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsCustomsClearance", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsWarehousing", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@crmCode", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPackageTypes ObjCVarPackageTypes in SaveList)
                {
                    if (ObjCVarPackageTypes.mIsChanges == true)
                    {
                        if (ObjCVarPackageTypes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPackageTypes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPackageTypes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPackageTypes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPackageTypes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPackageTypes.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarPackageTypes.Code;
                        Com.Parameters["@Name"].Value = ObjCVarPackageTypes.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarPackageTypes.LocalName;
                        Com.Parameters["@PrintAs"].Value = ObjCVarPackageTypes.PrintAs;
                        Com.Parameters["@Notes"].Value = ObjCVarPackageTypes.Notes;
                        Com.Parameters["@IsOcean"].Value = ObjCVarPackageTypes.IsOcean;
                        Com.Parameters["@IsAir"].Value = ObjCVarPackageTypes.IsAir;
                        Com.Parameters["@IsInland"].Value = ObjCVarPackageTypes.IsInland;
                        Com.Parameters["@IsInactive"].Value = ObjCVarPackageTypes.IsInactive;
                        Com.Parameters["@IsAddedManually"].Value = ObjCVarPackageTypes.IsAddedManually;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarPackageTypes.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarPackageTypes.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarPackageTypes.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarPackageTypes.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarPackageTypes.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarPackageTypes.TimeLocked;
                        Com.Parameters["@IsCustomsClearance"].Value = ObjCVarPackageTypes.IsCustomsClearance;
                        Com.Parameters["@IsWarehousing"].Value = ObjCVarPackageTypes.IsWarehousing;
                        Com.Parameters["@crmCode"].Value = ObjCVarPackageTypes.crmCode;
                        EndTrans(Com, Con);
                        if (ObjCVarPackageTypes.ID == 0)
                        {
                            ObjCVarPackageTypes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPackageTypes.mIsChanges = false;
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
