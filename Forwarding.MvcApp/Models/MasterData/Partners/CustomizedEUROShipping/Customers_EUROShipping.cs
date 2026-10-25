using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.CustomizedEUROShipping
{
    [Serializable]
    public class CPKCustomers
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
    public partial class CVarCustomers : CPKCustomers
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCode;
        internal String mName;
        internal String mLocalName;
        internal Int32 mSalesmanID;
        internal String mWebsite;
        internal String mEmail;
        internal Boolean mIsConsignee;
        internal Boolean mIsShipper;
        internal Boolean mIsInternalCustomer;
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
        internal Int32 mManagerRoleID;
        internal Int32 mAdministratorRoleID;
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
        internal Int32 mSalesLeadID;
        internal Int32 mEmailOptionAging;
        internal Int32 mEmailOptionInvoicesReport;
        internal Int32 mEmailOptionPartnerStatement;
        internal String mBillingDetails;
        internal String mShippingDetails;
        internal Boolean mOriginalCMRbyPost;
        internal Int32 mCategoryID;
        internal Boolean mIsExternal;
        internal String mSAP_CUSTOMER_CODE;
        internal String mMSC_CODE;
        internal String mCUSTOMER_CODE;
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
        public Int32 SalesmanID
        {
            get { return mSalesmanID; }
            set { mIsChanges = true; mSalesmanID = value; }
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
        public Boolean IsConsignee
        {
            get { return mIsConsignee; }
            set { mIsChanges = true; mIsConsignee = value; }
        }
        public Boolean IsShipper
        {
            get { return mIsShipper; }
            set { mIsChanges = true; mIsShipper = value; }
        }
        public Boolean IsInternalCustomer
        {
            get { return mIsInternalCustomer; }
            set { mIsChanges = true; mIsInternalCustomer = value; }
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
        public Int32 ManagerRoleID
        {
            get { return mManagerRoleID; }
            set { mIsChanges = true; mManagerRoleID = value; }
        }
        public Int32 AdministratorRoleID
        {
            get { return mAdministratorRoleID; }
            set { mIsChanges = true; mAdministratorRoleID = value; }
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
        public Int32 SalesLeadID
        {
            get { return mSalesLeadID; }
            set { mIsChanges = true; mSalesLeadID = value; }
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
        public String BillingDetails
        {
            get { return mBillingDetails; }
            set { mIsChanges = true; mBillingDetails = value; }
        }
        public String ShippingDetails
        {
            get { return mShippingDetails; }
            set { mIsChanges = true; mShippingDetails = value; }
        }
        public Boolean OriginalCMRbyPost
        {
            get { return mOriginalCMRbyPost; }
            set { mIsChanges = true; mOriginalCMRbyPost = value; }
        }
        public Int32 CategoryID
        {
            get { return mCategoryID; }
            set { mIsChanges = true; mCategoryID = value; }
        }
        public Boolean IsExternal
        {
            get { return mIsExternal; }
            set { mIsChanges = true; mIsExternal = value; }
        }
        public String SAP_CUSTOMER_CODE
        {
            get { return mSAP_CUSTOMER_CODE; }
            set { mIsChanges = true; mSAP_CUSTOMER_CODE = value; }
        }
        public String MSC_CODE
        {
            get { return mMSC_CODE; }
            set { mIsChanges = true; mMSC_CODE = value; }
        }
        public String CUSTOMER_CODE
        {
            get { return mCUSTOMER_CODE; }
            set { mIsChanges = true; mCUSTOMER_CODE = value; }
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

    public partial class CCustomers
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
        public List<CVarCustomers> lstCVarCustomers = new List<CVarCustomers>();
        public List<CPKCustomers> lstDeletedCPKCustomers = new List<CPKCustomers>();
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
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionStringEUROShipping"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarCustomers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCustomers";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCustomers";
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
                        CVarCustomers ObjCVarCustomers = new CVarCustomers();
                        ObjCVarCustomers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomers.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCustomers.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCustomers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCustomers.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarCustomers.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarCustomers.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarCustomers.mIsConsignee = Convert.ToBoolean(dr["IsConsignee"].ToString());
                        ObjCVarCustomers.mIsShipper = Convert.ToBoolean(dr["IsShipper"].ToString());
                        ObjCVarCustomers.mIsInternalCustomer = Convert.ToBoolean(dr["IsInternalCustomer"].ToString());
                        ObjCVarCustomers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarCustomers.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustomers.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarCustomers.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarCustomers.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCustomers.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarCustomers.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarCustomers.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarCustomers.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarCustomers.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarCustomers.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarCustomers.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarCustomers.mManagerRoleID = Convert.ToInt32(dr["ManagerRoleID"].ToString());
                        ObjCVarCustomers.mAdministratorRoleID = Convert.ToInt32(dr["AdministratorRoleID"].ToString());
                        ObjCVarCustomers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustomers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustomers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustomers.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustomers.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarCustomers.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarCustomers.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarCustomers.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarCustomers.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarCustomers.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarCustomers.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarCustomers.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarCustomers.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarCustomers.mSalesLeadID = Convert.ToInt32(dr["SalesLeadID"].ToString());
                        ObjCVarCustomers.mEmailOptionAging = Convert.ToInt32(dr["EmailOptionAging"].ToString());
                        ObjCVarCustomers.mEmailOptionInvoicesReport = Convert.ToInt32(dr["EmailOptionInvoicesReport"].ToString());
                        ObjCVarCustomers.mEmailOptionPartnerStatement = Convert.ToInt32(dr["EmailOptionPartnerStatement"].ToString());
                        ObjCVarCustomers.mBillingDetails = Convert.ToString(dr["BillingDetails"].ToString());
                        ObjCVarCustomers.mShippingDetails = Convert.ToString(dr["ShippingDetails"].ToString());
                        ObjCVarCustomers.mOriginalCMRbyPost = Convert.ToBoolean(dr["OriginalCMRbyPost"].ToString());
                        ObjCVarCustomers.mCategoryID = Convert.ToInt32(dr["CategoryID"].ToString());
                        ObjCVarCustomers.mIsExternal = Convert.ToBoolean(dr["IsExternal"].ToString());
                        ObjCVarCustomers.mSAP_CUSTOMER_CODE = Convert.ToString(dr["SAP_CUSTOMER_CODE"].ToString());
                        ObjCVarCustomers.mMSC_CODE = Convert.ToString(dr["MSC_CODE"].ToString());
                        ObjCVarCustomers.mCUSTOMER_CODE = Convert.ToString(dr["CUSTOMER_CODE"].ToString());
                        lstCVarCustomers.Add(ObjCVarCustomers);
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
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionStringEUROShipping"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarCustomers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCustomers";
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
                        CVarCustomers ObjCVarCustomers = new CVarCustomers();
                        ObjCVarCustomers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomers.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCustomers.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCustomers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCustomers.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarCustomers.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarCustomers.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarCustomers.mIsConsignee = Convert.ToBoolean(dr["IsConsignee"].ToString());
                        ObjCVarCustomers.mIsShipper = Convert.ToBoolean(dr["IsShipper"].ToString());
                        ObjCVarCustomers.mIsInternalCustomer = Convert.ToBoolean(dr["IsInternalCustomer"].ToString());
                        ObjCVarCustomers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarCustomers.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustomers.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarCustomers.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarCustomers.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCustomers.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarCustomers.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarCustomers.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarCustomers.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarCustomers.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarCustomers.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarCustomers.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarCustomers.mManagerRoleID = Convert.ToInt32(dr["ManagerRoleID"].ToString());
                        ObjCVarCustomers.mAdministratorRoleID = Convert.ToInt32(dr["AdministratorRoleID"].ToString());
                        ObjCVarCustomers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustomers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustomers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustomers.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustomers.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarCustomers.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarCustomers.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarCustomers.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarCustomers.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarCustomers.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarCustomers.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarCustomers.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarCustomers.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarCustomers.mSalesLeadID = Convert.ToInt32(dr["SalesLeadID"].ToString());
                        ObjCVarCustomers.mEmailOptionAging = Convert.ToInt32(dr["EmailOptionAging"].ToString());
                        ObjCVarCustomers.mEmailOptionInvoicesReport = Convert.ToInt32(dr["EmailOptionInvoicesReport"].ToString());
                        ObjCVarCustomers.mEmailOptionPartnerStatement = Convert.ToInt32(dr["EmailOptionPartnerStatement"].ToString());
                        ObjCVarCustomers.mBillingDetails = Convert.ToString(dr["BillingDetails"].ToString());
                        ObjCVarCustomers.mShippingDetails = Convert.ToString(dr["ShippingDetails"].ToString());
                        ObjCVarCustomers.mOriginalCMRbyPost = Convert.ToBoolean(dr["OriginalCMRbyPost"].ToString());
                        ObjCVarCustomers.mCategoryID = Convert.ToInt32(dr["CategoryID"].ToString());
                        ObjCVarCustomers.mIsExternal = Convert.ToBoolean(dr["IsExternal"].ToString());
                        ObjCVarCustomers.mSAP_CUSTOMER_CODE = Convert.ToString(dr["SAP_CUSTOMER_CODE"].ToString());
                        ObjCVarCustomers.mMSC_CODE = Convert.ToString(dr["MSC_CODE"].ToString());
                        ObjCVarCustomers.mCUSTOMER_CODE = Convert.ToString(dr["CUSTOMER_CODE"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCustomers.Add(ObjCVarCustomers);
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
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionStringEUROShipping"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListCustomers";
                else
                    Com.CommandText = "[dbo].UpdateListCustomers";
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
        public Exception DeleteItem(List<CPKCustomers> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionStringEUROShipping"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCustomers";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCustomers ObjCPKCustomers in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCustomers.ID);
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
        public Exception SaveMethod(List<CVarCustomers> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionStringEUROShipping"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SalesmanID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Website", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsConsignee", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsShipper", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInternalCustomer", SqlDbType.Bit));
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
                Com.Parameters.Add(new SqlParameter("@ManagerRoleID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AdministratorRoleID", SqlDbType.Int));
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
                Com.Parameters.Add(new SqlParameter("@SalesLeadID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionAging", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionInvoicesReport", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionPartnerStatement", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BillingDetails", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ShippingDetails", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OriginalCMRbyPost", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CategoryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsExternal", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@SAP_CUSTOMER_CODE", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@MSC_CODE", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CUSTOMER_CODE", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCustomers ObjCVarCustomers in SaveList)
                {
                    if (ObjCVarCustomers.mIsChanges == true)
                    {
                        if (ObjCVarCustomers.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCustomers";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCustomers.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCustomers";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCustomers.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCustomers.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarCustomers.Code;
                        Com.Parameters["@Name"].Value = ObjCVarCustomers.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarCustomers.LocalName;
                        Com.Parameters["@SalesmanID"].Value = ObjCVarCustomers.SalesmanID;
                        Com.Parameters["@Website"].Value = ObjCVarCustomers.Website;
                        Com.Parameters["@Email"].Value = ObjCVarCustomers.Email;
                        Com.Parameters["@IsConsignee"].Value = ObjCVarCustomers.IsConsignee;
                        Com.Parameters["@IsShipper"].Value = ObjCVarCustomers.IsShipper;
                        Com.Parameters["@IsInternalCustomer"].Value = ObjCVarCustomers.IsInternalCustomer;
                        Com.Parameters["@IsInactive"].Value = ObjCVarCustomers.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarCustomers.Notes;
                        Com.Parameters["@VATNumber"].Value = ObjCVarCustomers.VATNumber;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarCustomers.PaymentTermID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarCustomers.CurrencyID;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarCustomers.TaxeTypeID;
                        Com.Parameters["@IsConsolidatedInvoice"].Value = ObjCVarCustomers.IsConsolidatedInvoice;
                        Com.Parameters["@BankName"].Value = ObjCVarCustomers.BankName;
                        Com.Parameters["@BankAddress"].Value = ObjCVarCustomers.BankAddress;
                        Com.Parameters["@Swift"].Value = ObjCVarCustomers.Swift;
                        Com.Parameters["@BankAccountNumber"].Value = ObjCVarCustomers.BankAccountNumber;
                        Com.Parameters["@IBANNumber"].Value = ObjCVarCustomers.IBANNumber;
                        Com.Parameters["@ManagerRoleID"].Value = ObjCVarCustomers.ManagerRoleID;
                        Com.Parameters["@AdministratorRoleID"].Value = ObjCVarCustomers.AdministratorRoleID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCustomers.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCustomers.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarCustomers.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCustomers.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarCustomers.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarCustomers.TimeLocked;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarCustomers.IsDeleted;
                        Com.Parameters["@AccountID"].Value = ObjCVarCustomers.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarCustomers.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarCustomers.CostCenterID;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarCustomers.SubAccountGroupID;
                        Com.Parameters["@Address"].Value = ObjCVarCustomers.Address;
                        Com.Parameters["@PhonesAndFaxes"].Value = ObjCVarCustomers.PhonesAndFaxes;
                        Com.Parameters["@SalesLeadID"].Value = ObjCVarCustomers.SalesLeadID;
                        Com.Parameters["@EmailOptionAging"].Value = ObjCVarCustomers.EmailOptionAging;
                        Com.Parameters["@EmailOptionInvoicesReport"].Value = ObjCVarCustomers.EmailOptionInvoicesReport;
                        Com.Parameters["@EmailOptionPartnerStatement"].Value = ObjCVarCustomers.EmailOptionPartnerStatement;
                        Com.Parameters["@BillingDetails"].Value = ObjCVarCustomers.BillingDetails;
                        Com.Parameters["@ShippingDetails"].Value = ObjCVarCustomers.ShippingDetails;
                        Com.Parameters["@OriginalCMRbyPost"].Value = ObjCVarCustomers.OriginalCMRbyPost;
                        Com.Parameters["@CategoryID"].Value = ObjCVarCustomers.CategoryID;
                        Com.Parameters["@IsExternal"].Value = ObjCVarCustomers.IsExternal;
                        Com.Parameters["@SAP_CUSTOMER_CODE"].Value = ObjCVarCustomers.SAP_CUSTOMER_CODE;
                        Com.Parameters["@MSC_CODE"].Value = ObjCVarCustomers.MSC_CODE;
                        Com.Parameters["@CUSTOMER_CODE"].Value = ObjCVarCustomers.CUSTOMER_CODE;
                        EndTrans(Com, Con);
                        if (ObjCVarCustomers.ID == 0)
                        {
                            ObjCVarCustomers.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCustomers.mIsChanges = false;
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
