using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated
{
    [Serializable]
    public class CPKTreasuryTAX
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
    public partial class CVarTreasuryTAX : CPKTreasuryTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Int32 mBranchID;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mAccount_ID;
        internal Int32 mDefaultCurrencyID;
        internal Int32 mInJournalTypeID;
        internal Int32 mOutJournalTypeID;
        internal String mPrintedAs;
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
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
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
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mIsChanges = true; mAccount_ID = value; }
        }
        public Int32 DefaultCurrencyID
        {
            get { return mDefaultCurrencyID; }
            set { mIsChanges = true; mDefaultCurrencyID = value; }
        }
        public Int32 InJournalTypeID
        {
            get { return mInJournalTypeID; }
            set { mIsChanges = true; mInJournalTypeID = value; }
        }
        public Int32 OutJournalTypeID
        {
            get { return mOutJournalTypeID; }
            set { mIsChanges = true; mOutJournalTypeID = value; }
        }
        public String PrintedAs
        {
            get { return mPrintedAs; }
            set { mIsChanges = true; mPrintedAs = value; }
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

    public partial class CTreasuryTAX
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
        public List<CVarTreasuryTAX> lstCVarTreasuryTAX = new List<CVarTreasuryTAX>();
        public List<CPKTreasuryTAX> lstDeletedCPKTreasury = new List<CPKTreasuryTAX>();
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
            lstCVarTreasuryTAX.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListTreasuryTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemTreasuryTax";
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
                        CVarTreasuryTAX ObjCVarTreasury = new CVarTreasuryTAX();
                        ObjCVarTreasury.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarTreasury.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarTreasury.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarTreasury.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarTreasury.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarTreasury.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarTreasury.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarTreasury.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarTreasury.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarTreasury.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarTreasury.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarTreasury.mDefaultCurrencyID = Convert.ToInt32(dr["DefaultCurrencyID"].ToString());
                        ObjCVarTreasury.mInJournalTypeID = Convert.ToInt32(dr["InJournalTypeID"].ToString());
                        ObjCVarTreasury.mOutJournalTypeID = Convert.ToInt32(dr["OutJournalTypeID"].ToString());
                        ObjCVarTreasury.mPrintedAs = Convert.ToString(dr["PrintedAs"].ToString());
                        lstCVarTreasuryTAX.Add(ObjCVarTreasury);
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
            lstCVarTreasuryTAX.Clear();

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
                Com.CommandText = "[dbo].GetListPagingTreasury";
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
                        CVarTreasuryTAX ObjCVarTreasury = new CVarTreasuryTAX();
                        ObjCVarTreasury.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarTreasury.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarTreasury.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarTreasury.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarTreasury.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarTreasury.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarTreasury.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarTreasury.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarTreasury.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarTreasury.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarTreasury.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarTreasury.mDefaultCurrencyID = Convert.ToInt32(dr["DefaultCurrencyID"].ToString());
                        ObjCVarTreasury.mInJournalTypeID = Convert.ToInt32(dr["InJournalTypeID"].ToString());
                        ObjCVarTreasury.mOutJournalTypeID = Convert.ToInt32(dr["OutJournalTypeID"].ToString());
                        ObjCVarTreasury.mPrintedAs = Convert.ToString(dr["PrintedAs"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarTreasuryTAX.Add(ObjCVarTreasury);
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
                    Com.CommandText = "[dbo].DeleteListTreasury";
                else
                    Com.CommandText = "[dbo].UpdateListTreasury";
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
        public Exception DeleteItem(List<CPKTreasuryTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemTreasuryTax";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKTreasuryTAX ObjCPKTreasury in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKTreasury.ID);
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
        public Exception SaveMethod(List<CVarTreasuryTAX> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Account_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DefaultCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InJournalTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OutJournalTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PrintedAs", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarTreasuryTAX ObjCVarTreasury in SaveList)
                {
                    if (ObjCVarTreasury.mIsChanges == true)
                    {
                        if (ObjCVarTreasury.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemTreasuryTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarTreasury.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemTreasuryTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarTreasury.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarTreasury.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarTreasury.Code;
                        Com.Parameters["@Name"].Value = ObjCVarTreasury.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarTreasury.LocalName;
                        Com.Parameters["@BranchID"].Value = ObjCVarTreasury.BranchID;
                        Com.Parameters["@Notes"].Value = ObjCVarTreasury.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarTreasury.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarTreasury.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarTreasury.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarTreasury.ModificationDate;
                        Com.Parameters["@Account_ID"].Value = ObjCVarTreasury.Account_ID;
                        Com.Parameters["@DefaultCurrencyID"].Value = ObjCVarTreasury.DefaultCurrencyID;
                        Com.Parameters["@InJournalTypeID"].Value = ObjCVarTreasury.InJournalTypeID;
                        Com.Parameters["@OutJournalTypeID"].Value = ObjCVarTreasury.OutJournalTypeID;
                        Com.Parameters["@PrintedAs"].Value = ObjCVarTreasury.PrintedAs;
                        EndTrans(Com, Con);
                        if (ObjCVarTreasury.ID == 0)
                        {
                            ObjCVarTreasury.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarTreasury.mIsChanges = false;
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
