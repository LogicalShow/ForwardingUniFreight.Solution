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
    public class CPKPurchaseInvoiceTax
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
    public partial class CVarPurchaseInvoiceTax : CPKPurchaseInvoiceTax
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
        internal Int32 mInvoiceTypeID;
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
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mIsChanges = true; mInvoiceTypeID = value; }
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

    public partial class CPurchaseInvoiceTax
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
        public List<CVarPurchaseInvoiceTax> lstCVarPurchaseInvoiceTax = new List<CVarPurchaseInvoiceTax>();
        public List<CPKPurchaseInvoiceTax> lstDeletedCPKPurchaseInvoiceTax = new List<CPKPurchaseInvoiceTax>();
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
            lstCVarPurchaseInvoiceTax.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPurchaseInvoice";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPurchaseInvoice";
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
                        CVarPurchaseInvoiceTax ObjCVarPurchaseInvoiceTax = new CVarPurchaseInvoiceTax();
                        ObjCVarPurchaseInvoiceTax.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarPurchaseInvoiceTax.mEditableCode = Convert.ToString(dr["EditableCode"].ToString());
                        ObjCVarPurchaseInvoiceTax.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mClientOperationPartnerID = Convert.ToInt64(dr["ClientOperationPartnerID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mClientAddressID = Convert.ToInt64(dr["ClientAddressID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mClientPrintedAddress = Convert.ToString(dr["ClientPrintedAddress"].ToString());
                        ObjCVarPurchaseInvoiceTax.mSupplierOperationPartnerID = Convert.ToInt64(dr["SupplierOperationPartnerID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mSupplierAddressID = Convert.ToInt64(dr["SupplierAddressID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mSupplierPrintedAddress = Convert.ToString(dr["SupplierPrintedAddress"].ToString());
                        ObjCVarPurchaseInvoiceTax.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarPurchaseInvoiceTax.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPurchaseInvoiceTax.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarPurchaseInvoiceTax.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarPurchaseInvoiceTax.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarPurchaseInvoiceTax.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarPurchaseInvoiceTax.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarPurchaseInvoiceTax.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarPurchaseInvoiceTax.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPurchaseInvoiceTax.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPurchaseInvoiceTax.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPurchaseInvoiceTax.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPurchaseInvoiceTax.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPurchaseInvoiceTax.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarPurchaseInvoiceTax.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarPurchaseInvoiceTax.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        lstCVarPurchaseInvoiceTax.Add(ObjCVarPurchaseInvoiceTax);
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
            lstCVarPurchaseInvoiceTax.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPurchaseInvoiceTax";
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
                        CVarPurchaseInvoiceTax ObjCVarPurchaseInvoiceTax = new CVarPurchaseInvoiceTax();
                        ObjCVarPurchaseInvoiceTax.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarPurchaseInvoiceTax.mEditableCode = Convert.ToString(dr["EditableCode"].ToString());
                        ObjCVarPurchaseInvoiceTax.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mClientOperationPartnerID = Convert.ToInt64(dr["ClientOperationPartnerID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mClientAddressID = Convert.ToInt64(dr["ClientAddressID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mClientPrintedAddress = Convert.ToString(dr["ClientPrintedAddress"].ToString());
                        ObjCVarPurchaseInvoiceTax.mSupplierOperationPartnerID = Convert.ToInt64(dr["SupplierOperationPartnerID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mSupplierAddressID = Convert.ToInt64(dr["SupplierAddressID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mSupplierPrintedAddress = Convert.ToString(dr["SupplierPrintedAddress"].ToString());
                        ObjCVarPurchaseInvoiceTax.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarPurchaseInvoiceTax.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPurchaseInvoiceTax.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarPurchaseInvoiceTax.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarPurchaseInvoiceTax.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarPurchaseInvoiceTax.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarPurchaseInvoiceTax.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarPurchaseInvoiceTax.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarPurchaseInvoiceTax.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPurchaseInvoiceTax.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPurchaseInvoiceTax.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPurchaseInvoiceTax.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPurchaseInvoiceTax.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPurchaseInvoiceTax.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarPurchaseInvoiceTax.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarPurchaseInvoiceTax.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarPurchaseInvoiceTax.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPurchaseInvoiceTax.Add(ObjCVarPurchaseInvoiceTax);
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
                    Com.CommandText = "[dbo].DeleteListPurchaseInvoice";
                else
                    Com.CommandText = "[dbo].UpdateListPurchaseInvoiceTax";
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
        public Exception DeleteItem(List<CPKPurchaseInvoiceTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPurchaseInvoice";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPurchaseInvoiceTax ObjCPKPurchaseInvoiceTax in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPurchaseInvoiceTax.ID);
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
        public Exception SaveMethod(List<CVarPurchaseInvoiceTax> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@InvoiceTypeID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPurchaseInvoiceTax ObjCVarPurchaseInvoiceTax in SaveList)
                {
                    if (ObjCVarPurchaseInvoiceTax.mIsChanges == true)
                    {
                        if (ObjCVarPurchaseInvoiceTax.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPurchaseInvoiceTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPurchaseInvoiceTax.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPurchaseInvoiceTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPurchaseInvoiceTax.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPurchaseInvoiceTax.ID;
                        }
                        Com.Parameters["@InvoiceNumber"].Value = ObjCVarPurchaseInvoiceTax.InvoiceNumber;
                        Com.Parameters["@EditableCode"].Value = ObjCVarPurchaseInvoiceTax.EditableCode;
                        Com.Parameters["@OperationID"].Value = ObjCVarPurchaseInvoiceTax.OperationID;
                        Com.Parameters["@ClientOperationPartnerID"].Value = ObjCVarPurchaseInvoiceTax.ClientOperationPartnerID;
                        Com.Parameters["@ClientAddressID"].Value = ObjCVarPurchaseInvoiceTax.ClientAddressID;
                        Com.Parameters["@ClientPrintedAddress"].Value = ObjCVarPurchaseInvoiceTax.ClientPrintedAddress;
                        Com.Parameters["@SupplierOperationPartnerID"].Value = ObjCVarPurchaseInvoiceTax.SupplierOperationPartnerID;
                        Com.Parameters["@SupplierAddressID"].Value = ObjCVarPurchaseInvoiceTax.SupplierAddressID;
                        Com.Parameters["@SupplierPrintedAddress"].Value = ObjCVarPurchaseInvoiceTax.SupplierPrintedAddress;
                        Com.Parameters["@AmountWithoutVAT"].Value = ObjCVarPurchaseInvoiceTax.AmountWithoutVAT;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPurchaseInvoiceTax.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarPurchaseInvoiceTax.ExchangeRate;
                        Com.Parameters["@InvoiceDate"].Value = ObjCVarPurchaseInvoiceTax.InvoiceDate;
                        Com.Parameters["@TaxTypeID"].Value = ObjCVarPurchaseInvoiceTax.TaxTypeID;
                        Com.Parameters["@TaxPercentage"].Value = ObjCVarPurchaseInvoiceTax.TaxPercentage;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarPurchaseInvoiceTax.TaxAmount;
                        Com.Parameters["@DiscountTypeID"].Value = ObjCVarPurchaseInvoiceTax.DiscountTypeID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarPurchaseInvoiceTax.DiscountPercentage;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarPurchaseInvoiceTax.DiscountAmount;
                        Com.Parameters["@Amount"].Value = ObjCVarPurchaseInvoiceTax.Amount;
                        Com.Parameters["@Notes"].Value = ObjCVarPurchaseInvoiceTax.Notes;
                        Com.Parameters["@BranchID"].Value = ObjCVarPurchaseInvoiceTax.BranchID;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPurchaseInvoiceTax.IsApproved;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPurchaseInvoiceTax.IsDeleted;
                        Com.Parameters["@ApprovingUserID"].Value = ObjCVarPurchaseInvoiceTax.ApprovingUserID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarPurchaseInvoiceTax.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarPurchaseInvoiceTax.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarPurchaseInvoiceTax.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarPurchaseInvoiceTax.ModificationDate;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarPurchaseInvoiceTax.PaymentTermID;
                        Com.Parameters["@JVID1"].Value = ObjCVarPurchaseInvoiceTax.JVID1;
                        Com.Parameters["@JVID2"].Value = ObjCVarPurchaseInvoiceTax.JVID2;
                        Com.Parameters["@InvoiceTypeID"].Value = ObjCVarPurchaseInvoiceTax.InvoiceTypeID;
                        EndTrans(Com, Con);
                        if (ObjCVarPurchaseInvoiceTax.ID == 0)
                        {
                            ObjCVarPurchaseInvoiceTax.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPurchaseInvoiceTax.mIsChanges = false;
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
