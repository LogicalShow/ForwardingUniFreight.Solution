using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKCustomsClearanceAgentsTax
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
    public partial class CVarCustomsClearanceAgentsTax : CPKCustomsClearanceAgentsTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCode;
        internal String mName;
        internal String mLocalName;
        internal String mWebsite;
        internal Boolean mIsInactive;
        internal String mNotes;
        internal String mVATNumber;
        internal Int32 mPaymentTermID;
        internal Int32 mCurrencyID;
        internal Int32 mTaxeTypeID;
        internal Boolean mIsConsolidatedInvoice;
        internal String mBankName;
        internal String mBankAddress;
        internal String mSwift;
        internal String mBankAccountNumber;
        internal String mIBANNumber;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal Boolean mIsDeleted;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;
        internal Int32 mCostCenterID;
        internal Int32 mSubAccountGroupID;
        #endregion

        #region "Methods"
        public Int32 Code
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
        public String Website
        {
            get { return mWebsite; }
            set { mIsChanges = true; mWebsite = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public String VATNumber
        {
            get { return mVATNumber; }
            set { mIsChanges = true; mVATNumber = value; }
        }
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mIsChanges = true; mPaymentTermID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Int32 TaxeTypeID
        {
            get { return mTaxeTypeID; }
            set { mIsChanges = true; mTaxeTypeID = value; }
        }
        public Boolean IsConsolidatedInvoice
        {
            get { return mIsConsolidatedInvoice; }
            set { mIsChanges = true; mIsConsolidatedInvoice = value; }
        }
        public String BankName
        {
            get { return mBankName; }
            set { mIsChanges = true; mBankName = value; }
        }
        public String BankAddress
        {
            get { return mBankAddress; }
            set { mIsChanges = true; mBankAddress = value; }
        }
        public String Swift
        {
            get { return mSwift; }
            set { mIsChanges = true; mSwift = value; }
        }
        public String BankAccountNumber
        {
            get { return mBankAccountNumber; }
            set { mIsChanges = true; mBankAccountNumber = value; }
        }
        public String IBANNumber
        {
            get { return mIBANNumber; }
            set { mIsChanges = true; mIBANNumber = value; }
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
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Int32 SubAccountGroupID
        {
            get { return mSubAccountGroupID; }
            set { mIsChanges = true; mSubAccountGroupID = value; }
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

    public partial class CCustomsClearanceAgentsTax
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
        public List<CVarCustomsClearanceAgentsTax> lstCVarCustomsClearanceAgentsTax = new List<CVarCustomsClearanceAgentsTax>();
        public List<CPKCustomsClearanceAgentsTax> lstDeletedCPKCustomsClearanceAgentsTax = new List<CPKCustomsClearanceAgentsTax>();
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
            lstCVarCustomsClearanceAgentsTax.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCustomsClearanceAgentsTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCustomsClearanceAgentsTax";
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
                        CVarCustomsClearanceAgentsTax ObjCVarCustomsClearanceAgentsTax = new CVarCustomsClearanceAgentsTax();
                        ObjCVarCustomsClearanceAgentsTax.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        lstCVarCustomsClearanceAgentsTax.Add(ObjCVarCustomsClearanceAgentsTax);
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
            lstCVarCustomsClearanceAgentsTax.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCustomsClearanceAgents";
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
                        CVarCustomsClearanceAgentsTax ObjCVarCustomsClearanceAgentsTax = new CVarCustomsClearanceAgentsTax();
                        ObjCVarCustomsClearanceAgentsTax.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarCustomsClearanceAgentsTax.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCustomsClearanceAgentsTax.Add(ObjCVarCustomsClearanceAgentsTax);
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
                    Com.CommandText = "[dbo].DeleteListCustomsClearanceAgentsTax";
                else
                    Com.CommandText = "[dbo].UpdateListCustomsClearanceAgentsTax";
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
        public Exception DeleteItem(List<CPKCustomsClearanceAgentsTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCustomsClearanceAgentsTax";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCustomsClearanceAgentsTax ObjCPKCustomsClearanceAgentsTax in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCustomsClearanceAgentsTax.ID);
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
        public Exception SaveMethod(List<CVarCustomsClearanceAgentsTax> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Website", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@VATNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PaymentTermID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsConsolidatedInvoice", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@BankName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Swift", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankAccountNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IBANNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountGroupID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCustomsClearanceAgentsTax ObjCVarCustomsClearanceAgentsTax in SaveList)
                {
                    if (ObjCVarCustomsClearanceAgentsTax.mIsChanges == true)
                    {
                        if (ObjCVarCustomsClearanceAgentsTax.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCustomsClearanceAgentsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCustomsClearanceAgentsTax.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCustomsClearanceAgentsTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCustomsClearanceAgentsTax.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCustomsClearanceAgentsTax.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarCustomsClearanceAgentsTax.Code;
                        Com.Parameters["@Name"].Value = ObjCVarCustomsClearanceAgentsTax.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarCustomsClearanceAgentsTax.LocalName;
                        Com.Parameters["@Website"].Value = ObjCVarCustomsClearanceAgentsTax.Website;
                        Com.Parameters["@IsInactive"].Value = ObjCVarCustomsClearanceAgentsTax.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarCustomsClearanceAgentsTax.Notes;
                        Com.Parameters["@VATNumber"].Value = ObjCVarCustomsClearanceAgentsTax.VATNumber;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarCustomsClearanceAgentsTax.PaymentTermID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarCustomsClearanceAgentsTax.CurrencyID;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarCustomsClearanceAgentsTax.TaxeTypeID;
                        Com.Parameters["@IsConsolidatedInvoice"].Value = ObjCVarCustomsClearanceAgentsTax.IsConsolidatedInvoice;
                        Com.Parameters["@BankName"].Value = ObjCVarCustomsClearanceAgentsTax.BankName;
                        Com.Parameters["@BankAddress"].Value = ObjCVarCustomsClearanceAgentsTax.BankAddress;
                        Com.Parameters["@Swift"].Value = ObjCVarCustomsClearanceAgentsTax.Swift;
                        Com.Parameters["@BankAccountNumber"].Value = ObjCVarCustomsClearanceAgentsTax.BankAccountNumber;
                        Com.Parameters["@IBANNumber"].Value = ObjCVarCustomsClearanceAgentsTax.IBANNumber;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCustomsClearanceAgentsTax.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCustomsClearanceAgentsTax.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarCustomsClearanceAgentsTax.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCustomsClearanceAgentsTax.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarCustomsClearanceAgentsTax.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarCustomsClearanceAgentsTax.TimeLocked;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarCustomsClearanceAgentsTax.IsDeleted;
                        Com.Parameters["@AccountID"].Value = ObjCVarCustomsClearanceAgentsTax.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarCustomsClearanceAgentsTax.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarCustomsClearanceAgentsTax.CostCenterID;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarCustomsClearanceAgentsTax.SubAccountGroupID;
                        EndTrans(Com, Con);
                        if (ObjCVarCustomsClearanceAgentsTax.ID == 0)
                        {
                            ObjCVarCustomsClearanceAgentsTax.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCustomsClearanceAgentsTax.mIsChanges = false;
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
