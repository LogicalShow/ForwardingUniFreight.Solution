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
    public class CPKBanks
    {
        #region "variables"
        private Int32 mBankID;
        #endregion

        #region "Methods"
        public Int32 BankID
        {
            get { return mBankID; }
            set { mBankID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarBanks : CPKBanks
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mBankCode;
        internal String mBankNameEn;
        internal String mBankNameAr;
        internal String mBankAccountNo;
        internal Int32 mCurrencyID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        #endregion

        #region "Methods"
        public String BankCode
        {
            get { return mBankCode; }
            set { mIsChanges = true; mBankCode = value; }
        }
        public String BankNameEn
        {
            get { return mBankNameEn; }
            set { mIsChanges = true; mBankNameEn = value; }
        }
        public String BankNameAr
        {
            get { return mBankNameAr; }
            set { mIsChanges = true; mBankNameAr = value; }
        }
        public String BankAccountNo
        {
            get { return mBankAccountNo; }
            set { mIsChanges = true; mBankAccountNo = value; }
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

    public partial class CBanks
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
        public List<CVarBanks> lstCVarBanks = new List<CVarBanks>();
        public List<CPKBanks> lstDeletedCPKBanks = new List<CPKBanks>();
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
        public Exception GetItem(Int32 BankID)
        {
            return DataFill(Convert.ToString(BankID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarBanks.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListBanks";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemBanks";
                    Com.Parameters.Add(new SqlParameter("@BankID", SqlDbType.Int));
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
                        CVarBanks ObjCVarBanks = new CVarBanks();
                        ObjCVarBanks.BankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarBanks.mBankCode = Convert.ToString(dr["BankCode"].ToString());
                        ObjCVarBanks.mBankNameEn = Convert.ToString(dr["BankNameEn"].ToString());
                        ObjCVarBanks.mBankNameAr = Convert.ToString(dr["BankNameAr"].ToString());
                        ObjCVarBanks.mBankAccountNo = Convert.ToString(dr["BankAccountNo"].ToString());
                        ObjCVarBanks.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarBanks.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarBanks.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarBanks.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarBanks.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarBanks.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarBanks.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        lstCVarBanks.Add(ObjCVarBanks);
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
            lstCVarBanks.Clear();

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
                Com.CommandText = "[dbo].GetListPagingBanks";
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
                        CVarBanks ObjCVarBanks = new CVarBanks();
                        ObjCVarBanks.BankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarBanks.mBankCode = Convert.ToString(dr["BankCode"].ToString());
                        ObjCVarBanks.mBankNameEn = Convert.ToString(dr["BankNameEn"].ToString());
                        ObjCVarBanks.mBankNameAr = Convert.ToString(dr["BankNameAr"].ToString());
                        ObjCVarBanks.mBankAccountNo = Convert.ToString(dr["BankAccountNo"].ToString());
                        ObjCVarBanks.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarBanks.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarBanks.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarBanks.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarBanks.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarBanks.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarBanks.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarBanks.Add(ObjCVarBanks);
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
                    Com.CommandText = "[dbo].DeleteListBanks";
                else
                    Com.CommandText = "[dbo].UpdateListBanks";
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
        public Exception DeleteItem(List<CPKBanks> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemBanks";
                Com.Parameters.Add(new SqlParameter("@BankID", SqlDbType.Int));
                foreach (CPKBanks ObjCPKBanks in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKBanks.BankID);
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
        public Exception SaveMethod(List<CVarBanks> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@BankCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankNameEn", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankNameAr", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankAccountNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                SqlParameter paraBankID = Com.Parameters.Add(new SqlParameter("@BankID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "BankID", DataRowVersion.Default, null));
                foreach (CVarBanks ObjCVarBanks in SaveList)
                {
                    if (ObjCVarBanks.mIsChanges == true)
                    {
                        if (ObjCVarBanks.BankID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemBanks";
                            paraBankID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarBanks.BankID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemBanks";
                            paraBankID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarBanks.BankID != 0)
                        {
                            Com.Parameters["@BankID"].Value = ObjCVarBanks.BankID;
                        }
                        Com.Parameters["@BankCode"].Value = ObjCVarBanks.BankCode;
                        Com.Parameters["@BankNameEn"].Value = ObjCVarBanks.BankNameEn;
                        Com.Parameters["@BankNameAr"].Value = ObjCVarBanks.BankNameAr;
                        Com.Parameters["@BankAccountNo"].Value = ObjCVarBanks.BankAccountNo;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarBanks.CurrencyID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarBanks.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarBanks.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarBanks.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarBanks.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarBanks.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarBanks.TimeLocked;
                        EndTrans(Com, Con);
                        if (ObjCVarBanks.BankID == 0)
                        {
                            ObjCVarBanks.BankID = Convert.ToInt32(Com.Parameters["@BankID"].Value);
                        }
                        ObjCVarBanks.mIsChanges = false;
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
