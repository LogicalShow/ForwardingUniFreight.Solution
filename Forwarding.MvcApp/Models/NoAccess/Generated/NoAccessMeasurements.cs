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
    public class CPKNoAccessMeasurements
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
    public partial class CVarNoAccessMeasurements : CPKNoAccessMeasurements
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal String mDescription;
        internal Boolean mIsUsedInFCL;
        internal Boolean mIsUsedInLCL;
        internal Boolean mIsUsedInFTL;
        internal Boolean mIsUsedInLTL;
        internal Boolean mIsUsedInConsolidation;
        internal Boolean mIsUsedInAir;
        internal Boolean mIsAddedManually;
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
        public String Description
        {
            get { return mDescription; }
            set { mIsChanges = true; mDescription = value; }
        }
        public Boolean IsUsedInFCL
        {
            get { return mIsUsedInFCL; }
            set { mIsChanges = true; mIsUsedInFCL = value; }
        }
        public Boolean IsUsedInLCL
        {
            get { return mIsUsedInLCL; }
            set { mIsChanges = true; mIsUsedInLCL = value; }
        }
        public Boolean IsUsedInFTL
        {
            get { return mIsUsedInFTL; }
            set { mIsChanges = true; mIsUsedInFTL = value; }
        }
        public Boolean IsUsedInLTL
        {
            get { return mIsUsedInLTL; }
            set { mIsChanges = true; mIsUsedInLTL = value; }
        }
        public Boolean IsUsedInConsolidation
        {
            get { return mIsUsedInConsolidation; }
            set { mIsChanges = true; mIsUsedInConsolidation = value; }
        }
        public Boolean IsUsedInAir
        {
            get { return mIsUsedInAir; }
            set { mIsChanges = true; mIsUsedInAir = value; }
        }
        public Boolean IsAddedManually
        {
            get { return mIsAddedManually; }
            set { mIsChanges = true; mIsAddedManually = value; }
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

    public partial class CNoAccessMeasurements
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
        public List<CVarNoAccessMeasurements> lstCVarNoAccessMeasurements = new List<CVarNoAccessMeasurements>();
        public List<CPKNoAccessMeasurements> lstDeletedCPKNoAccessMeasurements = new List<CPKNoAccessMeasurements>();
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
            lstCVarNoAccessMeasurements.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListNoAccessMeasurements";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemNoAccessMeasurements";
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
                        CVarNoAccessMeasurements ObjCVarNoAccessMeasurements = new CVarNoAccessMeasurements();
                        ObjCVarNoAccessMeasurements.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessMeasurements.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessMeasurements.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessMeasurements.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessMeasurements.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInFCL = Convert.ToBoolean(dr["IsUsedInFCL"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInLCL = Convert.ToBoolean(dr["IsUsedInLCL"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInFTL = Convert.ToBoolean(dr["IsUsedInFTL"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInLTL = Convert.ToBoolean(dr["IsUsedInLTL"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInConsolidation = Convert.ToBoolean(dr["IsUsedInConsolidation"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInAir = Convert.ToBoolean(dr["IsUsedInAir"].ToString());
                        ObjCVarNoAccessMeasurements.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarNoAccessMeasurements.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarNoAccessMeasurements.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarNoAccessMeasurements.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarNoAccessMeasurements.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarNoAccessMeasurements.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarNoAccessMeasurements.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarNoAccessMeasurements.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        lstCVarNoAccessMeasurements.Add(ObjCVarNoAccessMeasurements);
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
            lstCVarNoAccessMeasurements.Clear();

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
                Com.CommandText = "[dbo].GetListPagingNoAccessMeasurements";
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
                        CVarNoAccessMeasurements ObjCVarNoAccessMeasurements = new CVarNoAccessMeasurements();
                        ObjCVarNoAccessMeasurements.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessMeasurements.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessMeasurements.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessMeasurements.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessMeasurements.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInFCL = Convert.ToBoolean(dr["IsUsedInFCL"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInLCL = Convert.ToBoolean(dr["IsUsedInLCL"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInFTL = Convert.ToBoolean(dr["IsUsedInFTL"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInLTL = Convert.ToBoolean(dr["IsUsedInLTL"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInConsolidation = Convert.ToBoolean(dr["IsUsedInConsolidation"].ToString());
                        ObjCVarNoAccessMeasurements.mIsUsedInAir = Convert.ToBoolean(dr["IsUsedInAir"].ToString());
                        ObjCVarNoAccessMeasurements.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarNoAccessMeasurements.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarNoAccessMeasurements.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarNoAccessMeasurements.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarNoAccessMeasurements.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarNoAccessMeasurements.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarNoAccessMeasurements.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarNoAccessMeasurements.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarNoAccessMeasurements.Add(ObjCVarNoAccessMeasurements);
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
                    Com.CommandText = "[dbo].DeleteListNoAccessMeasurements";
                else
                    Com.CommandText = "[dbo].UpdateListNoAccessMeasurements";
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
        public Exception DeleteItem(List<CPKNoAccessMeasurements> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemNoAccessMeasurements";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKNoAccessMeasurements ObjCPKNoAccessMeasurements in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKNoAccessMeasurements.ID);
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
        public Exception SaveMethod(List<CVarNoAccessMeasurements> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@Description", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsUsedInFCL", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsUsedInLCL", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsUsedInFTL", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsUsedInLTL", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsUsedInConsolidation", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsUsedInAir", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAddedManually", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarNoAccessMeasurements ObjCVarNoAccessMeasurements in SaveList)
                {
                    if (ObjCVarNoAccessMeasurements.mIsChanges == true)
                    {
                        if (ObjCVarNoAccessMeasurements.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemNoAccessMeasurements";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarNoAccessMeasurements.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemNoAccessMeasurements";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarNoAccessMeasurements.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarNoAccessMeasurements.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarNoAccessMeasurements.Code;
                        Com.Parameters["@Name"].Value = ObjCVarNoAccessMeasurements.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarNoAccessMeasurements.LocalName;
                        Com.Parameters["@Description"].Value = ObjCVarNoAccessMeasurements.Description;
                        Com.Parameters["@IsUsedInFCL"].Value = ObjCVarNoAccessMeasurements.IsUsedInFCL;
                        Com.Parameters["@IsUsedInLCL"].Value = ObjCVarNoAccessMeasurements.IsUsedInLCL;
                        Com.Parameters["@IsUsedInFTL"].Value = ObjCVarNoAccessMeasurements.IsUsedInFTL;
                        Com.Parameters["@IsUsedInLTL"].Value = ObjCVarNoAccessMeasurements.IsUsedInLTL;
                        Com.Parameters["@IsUsedInConsolidation"].Value = ObjCVarNoAccessMeasurements.IsUsedInConsolidation;
                        Com.Parameters["@IsUsedInAir"].Value = ObjCVarNoAccessMeasurements.IsUsedInAir;
                        Com.Parameters["@IsAddedManually"].Value = ObjCVarNoAccessMeasurements.IsAddedManually;
                        Com.Parameters["@IsInactive"].Value = ObjCVarNoAccessMeasurements.IsInactive;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarNoAccessMeasurements.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarNoAccessMeasurements.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarNoAccessMeasurements.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarNoAccessMeasurements.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarNoAccessMeasurements.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarNoAccessMeasurements.TimeLocked;
                        EndTrans(Com, Con);
                        if (ObjCVarNoAccessMeasurements.ID == 0)
                        {
                            ObjCVarNoAccessMeasurements.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarNoAccessMeasurements.mIsChanges = false;
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
