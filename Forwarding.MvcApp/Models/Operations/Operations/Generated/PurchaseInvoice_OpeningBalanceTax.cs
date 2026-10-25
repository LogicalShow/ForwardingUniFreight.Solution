using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKPurchaseInvoice_OpeningBalanceTax
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarPurchaseInvoice_OpeningBalanceTax : CPKPurchaseInvoice_OpeningBalanceTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mInvoiceNumber;
        internal String mEditableCode;
        internal Int64 mOperationID;
        internal Int64 mClientOperationPartnerID;
        internal Int64 mClientAddressID;
        internal String mClientPrintedAddress;
        internal Int64 mSupplierOperationPartnerID;
        internal Int64 mSupplierAddressID;
        internal String mSupplierPrintedAddress;
        internal Decimal mAmountWithoutVAT;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal DateTime mInvoiceDate;
        internal Int32 mTaxTypeID;
        internal Decimal mTaxPercentage;
        internal Decimal mTaxAmount;
        internal Int32 mDiscountTypeID;
        internal Decimal mDiscountPercentage;
        internal Decimal mDiscountAmount;
        internal Decimal mAmount;
        internal String mNotes;
        internal Int32 mBranchID;
        internal Boolean mIsApproved;
        internal Boolean mIsDeleted;
        internal Int32 mApprovingUserID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mPaymentTermID;
        internal Int64 mJVID1;
        internal Int64 mJVID2;
        internal Int32 mSC_TransactionID;
        #endregion

        #region "Methods"
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mIsChanges = true; mInvoiceNumber = value; }
        }
        public String EditableCode
        {
            get { return mEditableCode; }
            set { mIsChanges = true; mEditableCode = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int64 ClientOperationPartnerID
        {
            get { return mClientOperationPartnerID; }
            set { mIsChanges = true; mClientOperationPartnerID = value; }
        }
        public Int64 ClientAddressID
        {
            get { return mClientAddressID; }
            set { mIsChanges = true; mClientAddressID = value; }
        }
        public String ClientPrintedAddress
        {
            get { return mClientPrintedAddress; }
            set { mIsChanges = true; mClientPrintedAddress = value; }
        }
        public Int64 SupplierOperationPartnerID
        {
            get { return mSupplierOperationPartnerID; }
            set { mIsChanges = true; mSupplierOperationPartnerID = value; }
        }
        public Int64 SupplierAddressID
        {
            get { return mSupplierAddressID; }
            set { mIsChanges = true; mSupplierAddressID = value; }
        }
        public String SupplierPrintedAddress
        {
            get { return mSupplierPrintedAddress; }
            set { mIsChanges = true; mSupplierPrintedAddress = value; }
        }
        public Decimal AmountWithoutVAT
        {
            get { return mAmountWithoutVAT; }
            set { mIsChanges = true; mAmountWithoutVAT = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mIsChanges = true; mInvoiceDate = value; }
        }
        public Int32 TaxTypeID
        {
            get { return mTaxTypeID; }
            set { mIsChanges = true; mTaxTypeID = value; }
        }
        public Decimal TaxPercentage
        {
            get { return mTaxPercentage; }
            set { mIsChanges = true; mTaxPercentage = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mIsChanges = true; mTaxAmount = value; }
        }
        public Int32 DiscountTypeID
        {
            get { return mDiscountTypeID; }
            set { mIsChanges = true; mDiscountTypeID = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mIsChanges = true; mDiscountPercentage = value; }
        }
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mIsChanges = true; mDiscountAmount = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Int32 ApprovingUserID
        {
            get { return mApprovingUserID; }
            set { mIsChanges = true; mApprovingUserID = value; }
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
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mIsChanges = true; mPaymentTermID = value; }
        }
        public Int64 JVID1
        {
            get { return mJVID1; }
            set { mIsChanges = true; mJVID1 = value; }
        }
        public Int64 JVID2
        {
            get { return mJVID2; }
            set { mIsChanges = true; mJVID2 = value; }
        }
        public Int32 SC_TransactionID
        {
            get { return mSC_TransactionID; }
            set { mIsChanges = true; mSC_TransactionID = value; }
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

    public partial class CPurchaseInvoice_OpeningBalanceTax
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
        public List<CVarPurchaseInvoice_OpeningBalanceTax> lstCVarPurchaseInvoice_OpeningBalance = new List<CVarPurchaseInvoice_OpeningBalanceTax>();
        public List<CPKPurchaseInvoice_OpeningBalanceTax> lstDeletedCPKPurchaseInvoice_OpeningBalance = new List<CPKPurchaseInvoice_OpeningBalanceTax>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarPurchaseInvoice_OpeningBalance.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPurchaseInvoice_OpeningBalance";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPurchaseInvoice_OpeningBalance";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarPurchaseInvoice_OpeningBalanceTax ObjCVarPurchaseInvoice_OpeningBalance = new CVarPurchaseInvoice_OpeningBalanceTax();
                        ObjCVarPurchaseInvoice_OpeningBalance.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mEditableCode = Convert.ToString(dr["EditableCode"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mClientOperationPartnerID = Convert.ToInt64(dr["ClientOperationPartnerID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mClientAddressID = Convert.ToInt64(dr["ClientAddressID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mClientPrintedAddress = Convert.ToString(dr["ClientPrintedAddress"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mSupplierOperationPartnerID = Convert.ToInt64(dr["SupplierOperationPartnerID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mSupplierAddressID = Convert.ToInt64(dr["SupplierAddressID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mSupplierPrintedAddress = Convert.ToString(dr["SupplierPrintedAddress"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mSC_TransactionID = Convert.ToInt32(dr["SC_TransactionID"].ToString());
                        lstCVarPurchaseInvoice_OpeningBalance.Add(ObjCVarPurchaseInvoice_OpeningBalance);
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
            lstCVarPurchaseInvoice_OpeningBalance.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPurchaseInvoice_OpeningBalance";
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
                        CVarPurchaseInvoice_OpeningBalanceTax ObjCVarPurchaseInvoice_OpeningBalance = new CVarPurchaseInvoice_OpeningBalanceTax();
                        ObjCVarPurchaseInvoice_OpeningBalance.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mEditableCode = Convert.ToString(dr["EditableCode"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mClientOperationPartnerID = Convert.ToInt64(dr["ClientOperationPartnerID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mClientAddressID = Convert.ToInt64(dr["ClientAddressID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mClientPrintedAddress = Convert.ToString(dr["ClientPrintedAddress"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mSupplierOperationPartnerID = Convert.ToInt64(dr["SupplierOperationPartnerID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mSupplierAddressID = Convert.ToInt64(dr["SupplierAddressID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mSupplierPrintedAddress = Convert.ToString(dr["SupplierPrintedAddress"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarPurchaseInvoice_OpeningBalance.mSC_TransactionID = Convert.ToInt32(dr["SC_TransactionID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPurchaseInvoice_OpeningBalance.Add(ObjCVarPurchaseInvoice_OpeningBalance);
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
                    Com.CommandText = "[dbo].DeleteListPurchaseInvoice_OpeningBalance";
                else
                    Com.CommandText = "[dbo].UpdateListPurchaseInvoice_OpeningBalanceTax";
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
        public Exception DeleteItem(List<CPKPurchaseInvoice_OpeningBalanceTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPurchaseInvoice_OpeningBalance";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPurchaseInvoice_OpeningBalanceTax ObjCPKPurchaseInvoice_OpeningBalance in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPurchaseInvoice_OpeningBalance.ID);
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
        public Exception SaveMethod(List<CVarPurchaseInvoice_OpeningBalanceTax> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@InvoiceNumber", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@EditableCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ClientOperationPartnerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ClientAddressID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ClientPrintedAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SupplierOperationPartnerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SupplierAddressID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SupplierPrintedAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AmountWithoutVAT", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@InvoiceDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TaxTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DiscountPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ApprovingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PaymentTermID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVID1", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@JVID2", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SC_TransactionID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPurchaseInvoice_OpeningBalanceTax ObjCVarPurchaseInvoice_OpeningBalance in SaveList)
                {
                    if (ObjCVarPurchaseInvoice_OpeningBalance.mIsChanges == true)
                    {
                        if (ObjCVarPurchaseInvoice_OpeningBalance.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPurchaseInvoice_OpeningBalanceTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPurchaseInvoice_OpeningBalance.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPurchaseInvoice_OpeningBalanceTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPurchaseInvoice_OpeningBalance.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.ID;
                        }
                        Com.Parameters["@InvoiceNumber"].Value = ObjCVarPurchaseInvoice_OpeningBalance.InvoiceNumber;
                        Com.Parameters["@EditableCode"].Value = ObjCVarPurchaseInvoice_OpeningBalance.EditableCode;
                        Com.Parameters["@OperationID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.OperationID;
                        Com.Parameters["@ClientOperationPartnerID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.ClientOperationPartnerID;
                        Com.Parameters["@ClientAddressID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.ClientAddressID;
                        Com.Parameters["@ClientPrintedAddress"].Value = ObjCVarPurchaseInvoice_OpeningBalance.ClientPrintedAddress;
                        Com.Parameters["@SupplierOperationPartnerID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.SupplierOperationPartnerID;
                        Com.Parameters["@SupplierAddressID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.SupplierAddressID;
                        Com.Parameters["@SupplierPrintedAddress"].Value = ObjCVarPurchaseInvoice_OpeningBalance.SupplierPrintedAddress;
                        Com.Parameters["@AmountWithoutVAT"].Value = ObjCVarPurchaseInvoice_OpeningBalance.AmountWithoutVAT;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarPurchaseInvoice_OpeningBalance.ExchangeRate;
                        Com.Parameters["@InvoiceDate"].Value = ObjCVarPurchaseInvoice_OpeningBalance.InvoiceDate;
                        Com.Parameters["@TaxTypeID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.TaxTypeID;
                        Com.Parameters["@TaxPercentage"].Value = ObjCVarPurchaseInvoice_OpeningBalance.TaxPercentage;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarPurchaseInvoice_OpeningBalance.TaxAmount;
                        Com.Parameters["@DiscountTypeID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.DiscountTypeID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarPurchaseInvoice_OpeningBalance.DiscountPercentage;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarPurchaseInvoice_OpeningBalance.DiscountAmount;
                        Com.Parameters["@Amount"].Value = ObjCVarPurchaseInvoice_OpeningBalance.Amount;
                        Com.Parameters["@Notes"].Value = ObjCVarPurchaseInvoice_OpeningBalance.Notes;
                        Com.Parameters["@BranchID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.BranchID;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPurchaseInvoice_OpeningBalance.IsApproved;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPurchaseInvoice_OpeningBalance.IsDeleted;
                        Com.Parameters["@ApprovingUserID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.ApprovingUserID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarPurchaseInvoice_OpeningBalance.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarPurchaseInvoice_OpeningBalance.ModificationDate;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.PaymentTermID;
                        Com.Parameters["@JVID1"].Value = ObjCVarPurchaseInvoice_OpeningBalance.JVID1;
                        Com.Parameters["@JVID2"].Value = ObjCVarPurchaseInvoice_OpeningBalance.JVID2;
                        Com.Parameters["@SC_TransactionID"].Value = ObjCVarPurchaseInvoice_OpeningBalance.SC_TransactionID;
                        EndTrans(Com, Con);
                        if (ObjCVarPurchaseInvoice_OpeningBalance.ID == 0)
                        {
                            ObjCVarPurchaseInvoice_OpeningBalance.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPurchaseInvoice_OpeningBalance.mIsChanges = false;
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
