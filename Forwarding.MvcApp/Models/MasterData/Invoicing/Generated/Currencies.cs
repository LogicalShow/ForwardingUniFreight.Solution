using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Invoicing.Generated
{
    [Serializable]
    public class CPKCurrencies
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
    public partial class CVarCurrencies : CPKCurrencies
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Decimal mCurrentExchangeRate;
        internal Decimal mCurrentAlternateExchangeRate;
        internal DateTime mCurrentExchangeRateDate;
        internal String mNotes;
        internal Int32 mExternalID;
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
        public Decimal CurrentExchangeRate
        {
            get { return mCurrentExchangeRate; }
            set { mIsChanges = true; mCurrentExchangeRate = value; }
        }
        public Decimal CurrentAlternateExchangeRate
        {
            get { return mCurrentAlternateExchangeRate; }
            set { mIsChanges = true; mCurrentAlternateExchangeRate = value; }
        }
        public DateTime CurrentExchangeRateDate
        {
            get { return mCurrentExchangeRateDate; }
            set { mIsChanges = true; mCurrentExchangeRateDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 ExternalID
        {
            get { return mExternalID; }
            set { mIsChanges = true; mExternalID = value; }
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

    public partial class CCurrencies
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
        public List<CVarCurrencies> lstCVarCurrencies = new List<CVarCurrencies>();
        public List<CPKCurrencies> lstDeletedCPKCurrencies = new List<CPKCurrencies>();
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
            lstCVarCurrencies.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListCurrencies";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCurrencies";
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
                        CVarCurrencies ObjCVarCurrencies = new CVarCurrencies();
                        ObjCVarCurrencies.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCurrencies.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarCurrencies.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCurrencies.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCurrencies.mCurrentExchangeRate = Convert.ToDecimal(dr["CurrentExchangeRate"].ToString());
                        ObjCVarCurrencies.mCurrentAlternateExchangeRate = Convert.ToDecimal(dr["CurrentAlternateExchangeRate"].ToString());
                        ObjCVarCurrencies.mCurrentExchangeRateDate = Convert.ToDateTime(dr["CurrentExchangeRateDate"].ToString());
                        ObjCVarCurrencies.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCurrencies.mExternalID = Convert.ToInt32(dr["ExternalID"].ToString());
                        ObjCVarCurrencies.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarCurrencies.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCurrencies.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCurrencies.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCurrencies.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCurrencies.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarCurrencies.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        lstCVarCurrencies.Add(ObjCVarCurrencies);
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
            lstCVarCurrencies.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCurrencies";
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
                        CVarCurrencies ObjCVarCurrencies = new CVarCurrencies();
                        ObjCVarCurrencies.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCurrencies.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarCurrencies.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCurrencies.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCurrencies.mCurrentExchangeRate = Convert.ToDecimal(dr["CurrentExchangeRate"].ToString());
                        ObjCVarCurrencies.mCurrentAlternateExchangeRate = Convert.ToDecimal(dr["CurrentAlternateExchangeRate"].ToString());
                        ObjCVarCurrencies.mCurrentExchangeRateDate = Convert.ToDateTime(dr["CurrentExchangeRateDate"].ToString());
                        ObjCVarCurrencies.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCurrencies.mExternalID = Convert.ToInt32(dr["ExternalID"].ToString());
                        ObjCVarCurrencies.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarCurrencies.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCurrencies.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCurrencies.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCurrencies.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCurrencies.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarCurrencies.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCurrencies.Add(ObjCVarCurrencies);
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
                    Com.CommandText = "[dbo].DeleteListCurrencies";
                else
                    Com.CommandText = "[dbo].UpdateListCurrencies";
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
        public Exception DeleteItem(List<CPKCurrencies> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCurrencies";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCurrencies ObjCPKCurrencies in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCurrencies.ID);
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
        public Exception SaveMethod(List<CVarCurrencies> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@CurrentExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrentAlternateExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrentExchangeRateDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ExternalID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCurrencies ObjCVarCurrencies in SaveList)
                {
                    if (ObjCVarCurrencies.mIsChanges == true)
                    {
                        if (ObjCVarCurrencies.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCurrencies";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCurrencies.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCurrencies";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCurrencies.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCurrencies.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarCurrencies.Code;
                        Com.Parameters["@Name"].Value = ObjCVarCurrencies.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarCurrencies.LocalName;
                        Com.Parameters["@CurrentExchangeRate"].Value = ObjCVarCurrencies.CurrentExchangeRate;
                        Com.Parameters["@CurrentAlternateExchangeRate"].Value = ObjCVarCurrencies.CurrentAlternateExchangeRate;
                        Com.Parameters["@CurrentExchangeRateDate"].Value = ObjCVarCurrencies.CurrentExchangeRateDate;
                        Com.Parameters["@Notes"].Value = ObjCVarCurrencies.Notes;
                        Com.Parameters["@ExternalID"].Value = ObjCVarCurrencies.ExternalID;
                        Com.Parameters["@IsInactive"].Value = ObjCVarCurrencies.IsInactive;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCurrencies.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCurrencies.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarCurrencies.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCurrencies.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarCurrencies.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarCurrencies.TimeLocked;
                        EndTrans(Com, Con);
                        if (ObjCVarCurrencies.ID == 0)
                        {
                            ObjCVarCurrencies.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCurrencies.mIsChanges = false;
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
