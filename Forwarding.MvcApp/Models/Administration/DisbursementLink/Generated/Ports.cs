using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.DisbursementLink.Generated
{
    [Serializable]
    public class CPKPorts
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
    public partial class CVarPorts : CPKPorts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Int32 mCountryID;
        internal Boolean mIsInactive;
        internal Boolean mIsPort;
        internal Boolean mIsAir;
        internal Boolean mIsOcean;
        internal Boolean mIsInland;
        internal Boolean mIsAddedManually;
        internal String mNotes;
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
        public Int32 CountryID
        {
            get { return mCountryID; }
            set { mIsChanges = true; mCountryID = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
        }
        public Boolean IsPort
        {
            get { return mIsPort; }
            set { mIsChanges = true; mIsPort = value; }
        }
        public Boolean IsAir
        {
            get { return mIsAir; }
            set { mIsChanges = true; mIsAir = value; }
        }
        public Boolean IsOcean
        {
            get { return mIsOcean; }
            set { mIsChanges = true; mIsOcean = value; }
        }
        public Boolean IsInland
        {
            get { return mIsInland; }
            set { mIsChanges = true; mIsInland = value; }
        }
        public Boolean IsAddedManually
        {
            get { return mIsAddedManually; }
            set { mIsChanges = true; mIsAddedManually = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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

    public partial class CPorts
    {
        #region "variables"
        /*If "App.Config" isnot exist add it to your Application
		Add this code after <Configuration> tag
		-------------------------------------------------------
		<appsettings>
		<add key="DisbursementConnectionString" value="............"/>
		</appsettings>
		-------------------------------------------------------
		where ".........." is connection string to database server*/
        private SqlTransaction tr;
        public List<CVarPorts> lstCVarPorts = new List<CVarPorts>();
        public List<CPKPorts> lstDeletedCPKPorts = new List<CPKPorts>();
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
        public Exception GetListPagingCbo(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy)
        {
            return DataFillCbo(PageSize, PageNumber, WhereClause, OrderBy);
        }
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarPorts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPorts";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPorts";
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
                        CVarPorts ObjCVarPorts = new CVarPorts();
                        ObjCVarPorts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPorts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarPorts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarPorts.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarPorts.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarPorts.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarPorts.mIsPort = Convert.ToBoolean(dr["IsPort"].ToString());
                        ObjCVarPorts.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarPorts.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarPorts.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarPorts.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarPorts.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPorts.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPorts.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPorts.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPorts.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPorts.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarPorts.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        lstCVarPorts.Add(ObjCVarPorts);
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
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarPorts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPorts";
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
                        CVarPorts ObjCVarPorts = new CVarPorts();
                        ObjCVarPorts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPorts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarPorts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarPorts.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarPorts.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarPorts.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarPorts.mIsPort = Convert.ToBoolean(dr["IsPort"].ToString());
                        ObjCVarPorts.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarPorts.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarPorts.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarPorts.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarPorts.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPorts.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPorts.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPorts.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPorts.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPorts.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarPorts.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPorts.Add(ObjCVarPorts);
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
        private Exception DataFillCbo(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarPorts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPortsCbo";
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
                        CVarPorts ObjCVarPorts = new CVarPorts();
                        ObjCVarPorts.ID = Convert.ToInt32(dr["ETA_Port_ID"].ToString());
                        ObjCVarPorts.mName = Convert.ToString(dr["ETA_Port_Name"].ToString());
                        lstCVarPorts.Add(ObjCVarPorts);
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
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListPorts";
                else
                    Com.CommandText = "[dbo].UpdateListPorts";
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
        public Exception DeleteItem(List<CPKPorts> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPorts";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKPorts ObjCPKPorts in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKPorts.ID);
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
        public Exception SaveMethod(List<CVarPorts> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsPort", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAir", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsOcean", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInland", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAddedManually", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPorts ObjCVarPorts in SaveList)
                {
                    if (ObjCVarPorts.mIsChanges == true)
                    {
                        if (ObjCVarPorts.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPorts";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPorts.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPorts";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPorts.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPorts.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarPorts.Code;
                        Com.Parameters["@Name"].Value = ObjCVarPorts.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarPorts.LocalName;
                        Com.Parameters["@CountryID"].Value = ObjCVarPorts.CountryID;
                        Com.Parameters["@IsInactive"].Value = ObjCVarPorts.IsInactive;
                        Com.Parameters["@IsPort"].Value = ObjCVarPorts.IsPort;
                        Com.Parameters["@IsAir"].Value = ObjCVarPorts.IsAir;
                        Com.Parameters["@IsOcean"].Value = ObjCVarPorts.IsOcean;
                        Com.Parameters["@IsInland"].Value = ObjCVarPorts.IsInland;
                        Com.Parameters["@IsAddedManually"].Value = ObjCVarPorts.IsAddedManually;
                        Com.Parameters["@Notes"].Value = ObjCVarPorts.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarPorts.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarPorts.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarPorts.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarPorts.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarPorts.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarPorts.TimeLocked;
                        EndTrans(Com, Con);
                        if (ObjCVarPorts.ID == 0)
                        {
                            ObjCVarPorts.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPorts.mIsChanges = false;
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
