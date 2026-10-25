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
    public class CPKvwPurchaseInvoice
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
    public partial class CVarvwPurchaseInvoice : CPKvwPurchaseInvoice
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mInvoiceNumber;
        internal String mEditableCode;
        internal String mConcatenatedInvoiceNumber;
        internal Int64 mOperationID;
        internal Int64 mMasterOperationID;
        internal String mMasterBL;
        internal String mHouseNumber;
        internal String mOperationCode;
        internal Int32 mOperationCodeSerial;
        internal Int32 mPaymentTermID;
        internal String mPaymentTermName;
        internal Int64 mClientOperationPartnerID;
        internal Int64 mClientAddressID;
        internal String mClientAddressCityName;
        internal String mClientAddressCountryName;
        internal String mClientAddressStreetLine1;
        internal String mClientAddressStreetLine2;
        internal String mClientPrintedAddress;
        internal Int32 mClientPartnerTypeID;
        internal String mClientPartnerTypeCode;
        internal Int32 mClientPartnerID;
        internal String mClientPartnerName;
        internal Int64 mSupplierOperationPartnerID;
        internal Int64 mSupplierAddressID;
        internal String mSupplierPrintedAddress;
        internal String mSupplierAddressCityName;
        internal String mSupplierAddressCountryName;
        internal String mSupplierAddressStreetLine1;
        internal String mSupplierAddressStreetLine2;
        internal Int32 mSupplierPartnerTypeID;
        internal String mSupplierPartnerTypeCode;
        internal Int32 mSupplierPartnerID;
        internal String mSupplierPartnerName;
        internal Decimal mAmountWithoutVAT;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
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
        internal String mBranchName;
        internal Boolean mIsApproved;
        internal Boolean mIsDeleted;
        internal Int32 mApprovingUserID;
        internal String mApprovingUserName;
        internal Int32 mCreatorUserID;
        internal String mCreatorName;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mInvoiceTypeID;
        internal String mInvoiceTypeName;
        #endregion

        #region "Methods"
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mInvoiceNumber = value; }
        }
        public String EditableCode
        {
            get { return mEditableCode; }
            set { mEditableCode = value; }
        }
        public String ConcatenatedInvoiceNumber
        {
            get { return mConcatenatedInvoiceNumber; }
            set { mConcatenatedInvoiceNumber = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }
        public String MasterBL
        {
            get { return mMasterBL; }
            set { mMasterBL = value; }
        }
        public String HouseNumber
        {
            get { return mHouseNumber; }
            set { mHouseNumber = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int32 OperationCodeSerial
        {
            get { return mOperationCodeSerial; }
            set { mOperationCodeSerial = value; }
        }
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mPaymentTermID = value; }
        }
        public String PaymentTermName
        {
            get { return mPaymentTermName; }
            set { mPaymentTermName = value; }
        }
        public Int64 ClientOperationPartnerID
        {
            get { return mClientOperationPartnerID; }
            set { mClientOperationPartnerID = value; }
        }
        public Int64 ClientAddressID
        {
            get { return mClientAddressID; }
            set { mClientAddressID = value; }
        }
        public String ClientAddressCityName
        {
            get { return mClientAddressCityName; }
            set { mClientAddressCityName = value; }
        }
        public String ClientAddressCountryName
        {
            get { return mClientAddressCountryName; }
            set { mClientAddressCountryName = value; }
        }
        public String ClientAddressStreetLine1
        {
            get { return mClientAddressStreetLine1; }
            set { mClientAddressStreetLine1 = value; }
        }
        public String ClientAddressStreetLine2
        {
            get { return mClientAddressStreetLine2; }
            set { mClientAddressStreetLine2 = value; }
        }
        public String ClientPrintedAddress
        {
            get { return mClientPrintedAddress; }
            set { mClientPrintedAddress = value; }
        }
        public Int32 ClientPartnerTypeID
        {
            get { return mClientPartnerTypeID; }
            set { mClientPartnerTypeID = value; }
        }
        public String ClientPartnerTypeCode
        {
            get { return mClientPartnerTypeCode; }
            set { mClientPartnerTypeCode = value; }
        }
        public Int32 ClientPartnerID
        {
            get { return mClientPartnerID; }
            set { mClientPartnerID = value; }
        }
        public String ClientPartnerName
        {
            get { return mClientPartnerName; }
            set { mClientPartnerName = value; }
        }
        public Int64 SupplierOperationPartnerID
        {
            get { return mSupplierOperationPartnerID; }
            set { mSupplierOperationPartnerID = value; }
        }
        public Int64 SupplierAddressID
        {
            get { return mSupplierAddressID; }
            set { mSupplierAddressID = value; }
        }
        public String SupplierPrintedAddress
        {
            get { return mSupplierPrintedAddress; }
            set { mSupplierPrintedAddress = value; }
        }
        public String SupplierAddressCityName
        {
            get { return mSupplierAddressCityName; }
            set { mSupplierAddressCityName = value; }
        }
        public String SupplierAddressCountryName
        {
            get { return mSupplierAddressCountryName; }
            set { mSupplierAddressCountryName = value; }
        }
        public String SupplierAddressStreetLine1
        {
            get { return mSupplierAddressStreetLine1; }
            set { mSupplierAddressStreetLine1 = value; }
        }
        public String SupplierAddressStreetLine2
        {
            get { return mSupplierAddressStreetLine2; }
            set { mSupplierAddressStreetLine2 = value; }
        }
        public Int32 SupplierPartnerTypeID
        {
            get { return mSupplierPartnerTypeID; }
            set { mSupplierPartnerTypeID = value; }
        }
        public String SupplierPartnerTypeCode
        {
            get { return mSupplierPartnerTypeCode; }
            set { mSupplierPartnerTypeCode = value; }
        }
        public Int32 SupplierPartnerID
        {
            get { return mSupplierPartnerID; }
            set { mSupplierPartnerID = value; }
        }
        public String SupplierPartnerName
        {
            get { return mSupplierPartnerName; }
            set { mSupplierPartnerName = value; }
        }
        public Decimal AmountWithoutVAT
        {
            get { return mAmountWithoutVAT; }
            set { mAmountWithoutVAT = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public Int32 TaxTypeID
        {
            get { return mTaxTypeID; }
            set { mTaxTypeID = value; }
        }
        public Decimal TaxPercentage
        {
            get { return mTaxPercentage; }
            set { mTaxPercentage = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mTaxAmount = value; }
        }
        public Int32 DiscountTypeID
        {
            get { return mDiscountTypeID; }
            set { mDiscountTypeID = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mDiscountPercentage = value; }
        }
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mDiscountAmount = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Int32 ApprovingUserID
        {
            get { return mApprovingUserID; }
            set { mApprovingUserID = value; }
        }
        public String ApprovingUserName
        {
            get { return mApprovingUserName; }
            set { mApprovingUserName = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public String CreatorName
        {
            get { return mCreatorName; }
            set { mCreatorName = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public String InvoiceTypeName
        {
            get { return mInvoiceTypeName; }
            set { mInvoiceTypeName = value; }
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

    public partial class CvwPurchaseInvoice
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
        public List<CVarvwPurchaseInvoice> lstCVarvwPurchaseInvoice = new List<CVarvwPurchaseInvoice>();
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
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwPurchaseInvoice.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPurchaseInvoice";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwPurchaseInvoice ObjCVarvwPurchaseInvoice = new CVarvwPurchaseInvoice();
                        ObjCVarvwPurchaseInvoice.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPurchaseInvoice.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwPurchaseInvoice.mEditableCode = Convert.ToString(dr["EditableCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwPurchaseInvoice.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwPurchaseInvoice.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwPurchaseInvoice.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwPurchaseInvoice.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwPurchaseInvoice.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwPurchaseInvoice.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPurchaseInvoice.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientOperationPartnerID = Convert.ToInt64(dr["ClientOperationPartnerID"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressID = Convert.ToInt64(dr["ClientAddressID"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressCityName = Convert.ToString(dr["ClientAddressCityName"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressCountryName = Convert.ToString(dr["ClientAddressCountryName"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressStreetLine1 = Convert.ToString(dr["ClientAddressStreetLine1"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressStreetLine2 = Convert.ToString(dr["ClientAddressStreetLine2"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPrintedAddress = Convert.ToString(dr["ClientPrintedAddress"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPartnerTypeID = Convert.ToInt32(dr["ClientPartnerTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPartnerTypeCode = Convert.ToString(dr["ClientPartnerTypeCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPartnerID = Convert.ToInt32(dr["ClientPartnerID"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPartnerName = Convert.ToString(dr["ClientPartnerName"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierOperationPartnerID = Convert.ToInt64(dr["SupplierOperationPartnerID"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressID = Convert.ToInt64(dr["SupplierAddressID"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPrintedAddress = Convert.ToString(dr["SupplierPrintedAddress"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressCityName = Convert.ToString(dr["SupplierAddressCityName"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressCountryName = Convert.ToString(dr["SupplierAddressCountryName"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressStreetLine1 = Convert.ToString(dr["SupplierAddressStreetLine1"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressStreetLine2 = Convert.ToString(dr["SupplierAddressStreetLine2"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPartnerTypeID = Convert.ToInt32(dr["SupplierPartnerTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPartnerTypeCode = Convert.ToString(dr["SupplierPartnerTypeCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPartnerID = Convert.ToInt32(dr["SupplierPartnerID"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPartnerName = Convert.ToString(dr["SupplierPartnerName"].ToString());
                        ObjCVarvwPurchaseInvoice.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwPurchaseInvoice.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPurchaseInvoice.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPurchaseInvoice.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPurchaseInvoice.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwPurchaseInvoice.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwPurchaseInvoice.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPurchaseInvoice.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwPurchaseInvoice.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwPurchaseInvoice.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPurchaseInvoice.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPurchaseInvoice.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPurchaseInvoice.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPurchaseInvoice.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPurchaseInvoice.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwPurchaseInvoice.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwPurchaseInvoice.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwPurchaseInvoice.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPurchaseInvoice.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwPurchaseInvoice.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwPurchaseInvoice.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwPurchaseInvoice.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        lstCVarvwPurchaseInvoice.Add(ObjCVarvwPurchaseInvoice);
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
            lstCVarvwPurchaseInvoice.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPurchaseInvoice";
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
                        CVarvwPurchaseInvoice ObjCVarvwPurchaseInvoice = new CVarvwPurchaseInvoice();
                        ObjCVarvwPurchaseInvoice.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPurchaseInvoice.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwPurchaseInvoice.mEditableCode = Convert.ToString(dr["EditableCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwPurchaseInvoice.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwPurchaseInvoice.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwPurchaseInvoice.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwPurchaseInvoice.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwPurchaseInvoice.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mOperationCodeSerial = Convert.ToInt32(dr["OperationCodeSerial"].ToString());
                        ObjCVarvwPurchaseInvoice.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwPurchaseInvoice.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientOperationPartnerID = Convert.ToInt64(dr["ClientOperationPartnerID"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressID = Convert.ToInt64(dr["ClientAddressID"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressCityName = Convert.ToString(dr["ClientAddressCityName"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressCountryName = Convert.ToString(dr["ClientAddressCountryName"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressStreetLine1 = Convert.ToString(dr["ClientAddressStreetLine1"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientAddressStreetLine2 = Convert.ToString(dr["ClientAddressStreetLine2"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPrintedAddress = Convert.ToString(dr["ClientPrintedAddress"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPartnerTypeID = Convert.ToInt32(dr["ClientPartnerTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPartnerTypeCode = Convert.ToString(dr["ClientPartnerTypeCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPartnerID = Convert.ToInt32(dr["ClientPartnerID"].ToString());
                        ObjCVarvwPurchaseInvoice.mClientPartnerName = Convert.ToString(dr["ClientPartnerName"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierOperationPartnerID = Convert.ToInt64(dr["SupplierOperationPartnerID"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressID = Convert.ToInt64(dr["SupplierAddressID"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPrintedAddress = Convert.ToString(dr["SupplierPrintedAddress"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressCityName = Convert.ToString(dr["SupplierAddressCityName"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressCountryName = Convert.ToString(dr["SupplierAddressCountryName"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressStreetLine1 = Convert.ToString(dr["SupplierAddressStreetLine1"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierAddressStreetLine2 = Convert.ToString(dr["SupplierAddressStreetLine2"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPartnerTypeID = Convert.ToInt32(dr["SupplierPartnerTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPartnerTypeCode = Convert.ToString(dr["SupplierPartnerTypeCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPartnerID = Convert.ToInt32(dr["SupplierPartnerID"].ToString());
                        ObjCVarvwPurchaseInvoice.mSupplierPartnerName = Convert.ToString(dr["SupplierPartnerName"].ToString());
                        ObjCVarvwPurchaseInvoice.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarvwPurchaseInvoice.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPurchaseInvoice.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPurchaseInvoice.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwPurchaseInvoice.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwPurchaseInvoice.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarvwPurchaseInvoice.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwPurchaseInvoice.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarvwPurchaseInvoice.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarvwPurchaseInvoice.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwPurchaseInvoice.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPurchaseInvoice.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwPurchaseInvoice.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwPurchaseInvoice.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPurchaseInvoice.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPurchaseInvoice.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwPurchaseInvoice.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwPurchaseInvoice.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwPurchaseInvoice.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwPurchaseInvoice.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwPurchaseInvoice.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwPurchaseInvoice.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwPurchaseInvoice.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwPurchaseInvoice.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPurchaseInvoice.Add(ObjCVarvwPurchaseInvoice);
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
    }
}
