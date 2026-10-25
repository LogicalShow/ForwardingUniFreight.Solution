using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKAgentsTax
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
    public partial class CVarAgentsTax : CPKAgentsTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCode;
        internal String mName;
        internal String mLocalName;
        internal String mWebsite;
        internal String mEmail;
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
        internal String mAddress;
        internal String mPhonesAndFaxes;
        internal Int32 mEmailOptionAging;
        internal Int32 mEmailOptionInvoicesReport;
        internal Int32 mEmailOptionPartnerStatement;
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
        public String Email
        {
            get { return mEmail; }
            set { mIsChanges = true; mEmail = value; }
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
        public String Address
        {
            get { return mAddress; }
            set { mIsChanges = true; mAddress = value; }
        }
        public String PhonesAndFaxes
        {
            get { return mPhonesAndFaxes; }
            set { mIsChanges = true; mPhonesAndFaxes = value; }
        }
        public Int32 EmailOptionAging
        {
            get { return mEmailOptionAging; }
            set { mIsChanges = true; mEmailOptionAging = value; }
        }
        public Int32 EmailOptionInvoicesReport
        {
            get { return mEmailOptionInvoicesReport; }
            set { mIsChanges = true; mEmailOptionInvoicesReport = value; }
        }
        public Int32 EmailOptionPartnerStatement
        {
            get { return mEmailOptionPartnerStatement; }
            set { mIsChanges = true; mEmailOptionPartnerStatement = value; }
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

    public partial class CAgentsTax
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
        public List<CVarAgentsTax> lstCVarAgentsTax = new List<CVarAgentsTax>();
        public List<CPKAgentsTax> lstDeletedCPKAgentsTax = new List<CPKAgentsTax>();
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
            lstCVarAgentsTax.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAgentsTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAgentsTax";
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
                        CVarAgentsTax ObjCVarAgentsTax = new CVarAgentsTax();
                        ObjCVarAgentsTax.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarAgentsTax.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarAgentsTax.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarAgentsTax.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarAgentsTax.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarAgentsTax.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarAgentsTax.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarAgentsTax.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAgentsTax.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarAgentsTax.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarAgentsTax.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAgentsTax.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarAgentsTax.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarAgentsTax.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarAgentsTax.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarAgentsTax.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarAgentsTax.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarAgentsTax.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarAgentsTax.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAgentsTax.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAgentsTax.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAgentsTax.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAgentsTax.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarAgentsTax.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarAgentsTax.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAgentsTax.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarAgentsTax.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarAgentsTax.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarAgentsTax.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarAgentsTax.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarAgentsTax.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarAgentsTax.mEmailOptionAging = Convert.ToInt32(dr["EmailOptionAging"].ToString());
                        ObjCVarAgentsTax.mEmailOptionInvoicesReport = Convert.ToInt32(dr["EmailOptionInvoicesReport"].ToString());
                        ObjCVarAgentsTax.mEmailOptionPartnerStatement = Convert.ToInt32(dr["EmailOptionPartnerStatement"].ToString());
                        lstCVarAgentsTax.Add(ObjCVarAgentsTax);
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
            lstCVarAgentsTax.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAgents";
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
                        CVarAgentsTax ObjCVarAgentsTax = new CVarAgentsTax();
                        ObjCVarAgentsTax.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarAgentsTax.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarAgentsTax.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarAgentsTax.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarAgentsTax.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarAgentsTax.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarAgentsTax.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarAgentsTax.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAgentsTax.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarAgentsTax.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarAgentsTax.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAgentsTax.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarAgentsTax.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarAgentsTax.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarAgentsTax.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarAgentsTax.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarAgentsTax.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarAgentsTax.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarAgentsTax.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAgentsTax.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAgentsTax.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAgentsTax.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAgentsTax.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarAgentsTax.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarAgentsTax.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAgentsTax.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarAgentsTax.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarAgentsTax.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarAgentsTax.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarAgentsTax.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarAgentsTax.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarAgentsTax.mEmailOptionAging = Convert.ToInt32(dr["EmailOptionAging"].ToString());
                        ObjCVarAgentsTax.mEmailOptionInvoicesReport = Convert.ToInt32(dr["EmailOptionInvoicesReport"].ToString());
                        ObjCVarAgentsTax.mEmailOptionPartnerStatement = Convert.ToInt32(dr["EmailOptionPartnerStatement"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAgentsTax.Add(ObjCVarAgentsTax);
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
                    Com.CommandText = "[dbo].DeleteListAgentsTax";
                else
                    Com.CommandText = "[dbo].UpdateListAgentsTax";
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
        public Exception DeleteItem(List<CPKAgentsTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAgentsTax";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKAgentsTax ObjCPKAgentsTax in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKAgentsTax.ID);
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
        public Exception SaveMethod(List<CVarAgentsTax> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar));
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
                Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PhonesAndFaxes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@EmailOptionAging", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionInvoicesReport", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionPartnerStatement", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAgentsTax ObjCVarAgentsTax in SaveList)
                {
                    if (ObjCVarAgentsTax.mIsChanges == true)
                    {
                        if (ObjCVarAgentsTax.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAgentsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAgentsTax.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAgentsTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAgentsTax.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAgentsTax.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarAgentsTax.Code;
                        Com.Parameters["@Name"].Value = ObjCVarAgentsTax.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarAgentsTax.LocalName;
                        Com.Parameters["@Website"].Value = ObjCVarAgentsTax.Website;
                        Com.Parameters["@Email"].Value = ObjCVarAgentsTax.Email;
                        Com.Parameters["@IsInactive"].Value = ObjCVarAgentsTax.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarAgentsTax.Notes;
                        Com.Parameters["@VATNumber"].Value = ObjCVarAgentsTax.VATNumber;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarAgentsTax.PaymentTermID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarAgentsTax.CurrencyID;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarAgentsTax.TaxeTypeID;
                        Com.Parameters["@IsConsolidatedInvoice"].Value = ObjCVarAgentsTax.IsConsolidatedInvoice;
                        Com.Parameters["@BankName"].Value = ObjCVarAgentsTax.BankName;
                        Com.Parameters["@BankAddress"].Value = ObjCVarAgentsTax.BankAddress;
                        Com.Parameters["@Swift"].Value = ObjCVarAgentsTax.Swift;
                        Com.Parameters["@BankAccountNumber"].Value = ObjCVarAgentsTax.BankAccountNumber;
                        Com.Parameters["@IBANNumber"].Value = ObjCVarAgentsTax.IBANNumber;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarAgentsTax.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAgentsTax.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarAgentsTax.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarAgentsTax.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarAgentsTax.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarAgentsTax.TimeLocked;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarAgentsTax.IsDeleted;
                        Com.Parameters["@AccountID"].Value = ObjCVarAgentsTax.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarAgentsTax.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarAgentsTax.CostCenterID;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarAgentsTax.SubAccountGroupID;
                        Com.Parameters["@Address"].Value = ObjCVarAgentsTax.Address;
                        Com.Parameters["@PhonesAndFaxes"].Value = ObjCVarAgentsTax.PhonesAndFaxes;
                        Com.Parameters["@EmailOptionAging"].Value = ObjCVarAgentsTax.EmailOptionAging;
                        Com.Parameters["@EmailOptionInvoicesReport"].Value = ObjCVarAgentsTax.EmailOptionInvoicesReport;
                        Com.Parameters["@EmailOptionPartnerStatement"].Value = ObjCVarAgentsTax.EmailOptionPartnerStatement;
                        EndTrans(Com, Con);
                        if (ObjCVarAgentsTax.ID == 0)
                        {
                            ObjCVarAgentsTax.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAgentsTax.mIsChanges = false;
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
