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
    public class CPKAirlinesTAX
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
    public partial class CVarAirlinesTAX : CPKAirlinesTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mICAO;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal String mWebsite;
        internal String mPrefix;
        internal String mAccountNumber;
        internal Boolean mIsCheckDigit;
        internal Boolean mIsLimitedLength;
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
        public String ICAO
        {
            get { return mICAO; }
            set { mIsChanges = true; mICAO = value; }
        }
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
        public String Website
        {
            get { return mWebsite; }
            set { mIsChanges = true; mWebsite = value; }
        }
        public String Prefix
        {
            get { return mPrefix; }
            set { mIsChanges = true; mPrefix = value; }
        }
        public String AccountNumber
        {
            get { return mAccountNumber; }
            set { mIsChanges = true; mAccountNumber = value; }
        }
        public Boolean IsCheckDigit
        {
            get { return mIsCheckDigit; }
            set { mIsChanges = true; mIsCheckDigit = value; }
        }
        public Boolean IsLimitedLength
        {
            get { return mIsLimitedLength; }
            set { mIsChanges = true; mIsLimitedLength = value; }
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

    public partial class CAirlinesTAX
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
        public List<CVarAirlinesTAX> lstCVarAirlinesTAX = new List<CVarAirlinesTAX>();
        public List<CPKAirlinesTAX> lstDeletedCPKAirlines = new List<CPKAirlinesTAX>();
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
            lstCVarAirlinesTAX.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAirlinesTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAirlinesTax";
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
                        CVarAirlinesTAX ObjCVarAirlines = new CVarAirlinesTAX();
                        ObjCVarAirlines.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarAirlines.mICAO = Convert.ToString(dr["ICAO"].ToString());
                        ObjCVarAirlines.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarAirlines.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarAirlines.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarAirlines.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarAirlines.mPrefix = Convert.ToString(dr["Prefix"].ToString());
                        ObjCVarAirlines.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarAirlines.mIsCheckDigit = Convert.ToBoolean(dr["IsCheckDigit"].ToString());
                        ObjCVarAirlines.mIsLimitedLength = Convert.ToBoolean(dr["IsLimitedLength"].ToString());
                        ObjCVarAirlines.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarAirlines.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAirlines.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarAirlines.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarAirlines.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAirlines.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarAirlines.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarAirlines.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarAirlines.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarAirlines.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarAirlines.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarAirlines.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarAirlines.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAirlines.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAirlines.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAirlines.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAirlines.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarAirlines.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarAirlines.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAirlines.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarAirlines.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarAirlines.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarAirlines.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        lstCVarAirlinesTAX.Add(ObjCVarAirlines);
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
            lstCVarAirlinesTAX.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAirlines";
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
                        CVarAirlinesTAX ObjCVarAirlines = new CVarAirlinesTAX();
                        ObjCVarAirlines.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarAirlines.mICAO = Convert.ToString(dr["ICAO"].ToString());
                        ObjCVarAirlines.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarAirlines.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarAirlines.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarAirlines.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarAirlines.mPrefix = Convert.ToString(dr["Prefix"].ToString());
                        ObjCVarAirlines.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarAirlines.mIsCheckDigit = Convert.ToBoolean(dr["IsCheckDigit"].ToString());
                        ObjCVarAirlines.mIsLimitedLength = Convert.ToBoolean(dr["IsLimitedLength"].ToString());
                        ObjCVarAirlines.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarAirlines.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAirlines.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarAirlines.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarAirlines.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAirlines.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarAirlines.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarAirlines.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarAirlines.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarAirlines.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarAirlines.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarAirlines.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarAirlines.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAirlines.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAirlines.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAirlines.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAirlines.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarAirlines.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarAirlines.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAirlines.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarAirlines.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarAirlines.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarAirlines.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAirlinesTAX.Add(ObjCVarAirlines);
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
                    Com.CommandText = "[dbo].DeleteListAirlinesTax";
                else
                    Com.CommandText = "[dbo].UpdateListAirlinesTax";
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
        public Exception DeleteItem(List<CPKAirlinesTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAirlinesTax";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKAirlinesTAX ObjCPKAirlines in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKAirlines.ID);
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
        public Exception SaveMethod(List<CVarAirlinesTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ICAO", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Website", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Prefix", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsCheckDigit", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsLimitedLength", SqlDbType.Bit));
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
                foreach (CVarAirlinesTAX ObjCVarAirlines in SaveList)
                {
                    if (ObjCVarAirlines.mIsChanges == true)
                    {
                        if (ObjCVarAirlines.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAirlinesTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAirlines.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAirlinesTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAirlines.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAirlines.ID;
                        }
                        Com.Parameters["@ICAO"].Value = ObjCVarAirlines.ICAO;
                        Com.Parameters["@Code"].Value = ObjCVarAirlines.Code;
                        Com.Parameters["@Name"].Value = ObjCVarAirlines.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarAirlines.LocalName;
                        Com.Parameters["@Website"].Value = ObjCVarAirlines.Website;
                        Com.Parameters["@Prefix"].Value = ObjCVarAirlines.Prefix;
                        Com.Parameters["@AccountNumber"].Value = ObjCVarAirlines.AccountNumber;
                        Com.Parameters["@IsCheckDigit"].Value = ObjCVarAirlines.IsCheckDigit;
                        Com.Parameters["@IsLimitedLength"].Value = ObjCVarAirlines.IsLimitedLength;
                        Com.Parameters["@IsInactive"].Value = ObjCVarAirlines.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarAirlines.Notes;
                        Com.Parameters["@VATNumber"].Value = ObjCVarAirlines.VATNumber;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarAirlines.PaymentTermID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarAirlines.CurrencyID;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarAirlines.TaxeTypeID;
                        Com.Parameters["@IsConsolidatedInvoice"].Value = ObjCVarAirlines.IsConsolidatedInvoice;
                        Com.Parameters["@BankName"].Value = ObjCVarAirlines.BankName;
                        Com.Parameters["@BankAddress"].Value = ObjCVarAirlines.BankAddress;
                        Com.Parameters["@Swift"].Value = ObjCVarAirlines.Swift;
                        Com.Parameters["@BankAccountNumber"].Value = ObjCVarAirlines.BankAccountNumber;
                        Com.Parameters["@IBANNumber"].Value = ObjCVarAirlines.IBANNumber;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarAirlines.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAirlines.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarAirlines.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarAirlines.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarAirlines.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarAirlines.TimeLocked;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarAirlines.IsDeleted;
                        Com.Parameters["@AccountID"].Value = ObjCVarAirlines.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarAirlines.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarAirlines.CostCenterID;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarAirlines.SubAccountGroupID;
                        EndTrans(Com, Con);
                        if (ObjCVarAirlines.ID == 0)
                        {
                            ObjCVarAirlines.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAirlines.mIsChanges = false;
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
