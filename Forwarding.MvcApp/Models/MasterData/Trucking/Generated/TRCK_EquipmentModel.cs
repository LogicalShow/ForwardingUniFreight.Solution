using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.MasterData.Trucking.Generated
{
    [Serializable]
    public class CPKTRCK_EquipmentModel
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
    public partial class CVarTRCK_EquipmentModel : CPKTRCK_EquipmentModel
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
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

    public partial class CTRCK_EquipmentModel
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
        public List<CVarTRCK_EquipmentModel> lstCVarTRCK_EquipmentModel = new List<CVarTRCK_EquipmentModel>();
        public List<CPKTRCK_EquipmentModel> lstDeletedCPKTRCK_EquipmentModel = new List<CPKTRCK_EquipmentModel>();
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
            lstCVarTRCK_EquipmentModel.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListTRCK_EquipmentModel";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemTRCK_EquipmentModel";
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
                        CVarTRCK_EquipmentModel ObjCVarTRCK_EquipmentModel = new CVarTRCK_EquipmentModel();
                        ObjCVarTRCK_EquipmentModel.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarTRCK_EquipmentModel.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarTRCK_EquipmentModel.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarTRCK_EquipmentModel.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarTRCK_EquipmentModel.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarTRCK_EquipmentModel.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarTRCK_EquipmentModel.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarTRCK_EquipmentModel.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarTRCK_EquipmentModel.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarTRCK_EquipmentModel.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarTRCK_EquipmentModel.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        lstCVarTRCK_EquipmentModel.Add(ObjCVarTRCK_EquipmentModel);
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
            lstCVarTRCK_EquipmentModel.Clear();

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
                Com.CommandText = "[dbo].GetListPagingTRCK_EquipmentModel";
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
                        CVarTRCK_EquipmentModel ObjCVarTRCK_EquipmentModel = new CVarTRCK_EquipmentModel();
                        ObjCVarTRCK_EquipmentModel.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarTRCK_EquipmentModel.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarTRCK_EquipmentModel.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarTRCK_EquipmentModel.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarTRCK_EquipmentModel.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarTRCK_EquipmentModel.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarTRCK_EquipmentModel.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarTRCK_EquipmentModel.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarTRCK_EquipmentModel.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarTRCK_EquipmentModel.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarTRCK_EquipmentModel.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarTRCK_EquipmentModel.Add(ObjCVarTRCK_EquipmentModel);
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
                    Com.CommandText = "[dbo].DeleteListTRCK_EquipmentModel";
                else
                    Com.CommandText = "[dbo].UpdateListTRCK_EquipmentModel";
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
        public Exception DeleteItem(List<CPKTRCK_EquipmentModel> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemTRCK_EquipmentModel";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKTRCK_EquipmentModel ObjCPKTRCK_EquipmentModel in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKTRCK_EquipmentModel.ID);
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
        public Exception SaveMethod(List<CVarTRCK_EquipmentModel> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarTRCK_EquipmentModel ObjCVarTRCK_EquipmentModel in SaveList)
                {
                    if (ObjCVarTRCK_EquipmentModel.mIsChanges == true)
                    {
                        if (ObjCVarTRCK_EquipmentModel.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemTRCK_EquipmentModel";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarTRCK_EquipmentModel.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemTRCK_EquipmentModel";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarTRCK_EquipmentModel.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarTRCK_EquipmentModel.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarTRCK_EquipmentModel.Code;
                        Com.Parameters["@Name"].Value = ObjCVarTRCK_EquipmentModel.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarTRCK_EquipmentModel.LocalName;
                        Com.Parameters["@IsInactive"].Value = ObjCVarTRCK_EquipmentModel.IsInactive;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarTRCK_EquipmentModel.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarTRCK_EquipmentModel.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarTRCK_EquipmentModel.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarTRCK_EquipmentModel.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarTRCK_EquipmentModel.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarTRCK_EquipmentModel.TimeLocked;
                        EndTrans(Com, Con);
                        if (ObjCVarTRCK_EquipmentModel.ID == 0)
                        {
                            ObjCVarTRCK_EquipmentModel.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarTRCK_EquipmentModel.mIsChanges = false;
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

