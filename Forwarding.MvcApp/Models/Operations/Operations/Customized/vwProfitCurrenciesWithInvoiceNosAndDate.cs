using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    //Com.CommandTimeout = 2000;
    [Serializable]
    public partial class CVarvwProfitCurrenciesWithInvoiceNosAndDate
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal Int64 mMasterOperationID;
        internal String mClientName;
        internal String mBookingPartyName;
        internal DateTime mOpenDate;
        internal String mReleaseNumber;
        internal Decimal mChargeableWeightSum;
        internal String mContainerTypes;
        internal DateTime mActualDeparture;
        internal Int32 mBranchID;
        internal Int32 mMoveTypeID;
        internal String mBranchName;
        internal String mInvoiceNumbers;
        internal DateTime mFirstInvoiceDate;
        internal String mPOValue;
        internal DateTime mPODate;
        internal String mShipperName;
        internal String mConsigneeName;
        internal String mMoveTypeName;
        internal String mOperationStageName;
        internal String mPOLCode;
        internal String mPODCode;
        internal String mCurrencyCode;
        internal Int32 mChargeTypeID;
        internal String mChargeTypeName;
        internal Boolean mIsOfficial;
        internal Decimal mQuotationCost;
        internal Decimal mPayablesWithVAT;
        internal Decimal mPayablesWithoutVAT;
        internal Decimal mReceivablesWithVAT;
        internal Decimal mReceivablesWithoutVAT;
        internal Decimal mExchangeRate;
        internal Int32 mIsUsedInOperationStatement;
        internal Decimal mCostAmount;
        internal Decimal mPaidAmount;
        internal Decimal mRemainingAmount;
        internal String mPayableStatus;
        internal Int32 mBillTo;
        internal String mBillToName;
        internal Int32 mPartnerSupplierID;
        internal String mPartnerSupplierName;
        internal DateTime mPayableDate;
        internal DateTime mInvoiceDate;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public String BookingPartyName
        {
            get { return mBookingPartyName; }
            set { mBookingPartyName = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
        }
        public String ReleaseNumber
        {
            get { return mReleaseNumber; }
            set { mReleaseNumber = value; }
        }
        public Decimal ChargeableWeightSum
        {
            get { return mChargeableWeightSum; }
            set { mChargeableWeightSum = value; }
        }
        public String ContainerTypes
        {
            get { return mContainerTypes; }
            set { mContainerTypes = value; }
        }
        public DateTime ActualDeparture
        {
            get { return mActualDeparture; }
            set { mActualDeparture = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public Int32 MoveTypeID
        {
            get { return mMoveTypeID; }
            set { mMoveTypeID = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public String InvoiceNumbers
        {
            get { return mInvoiceNumbers; }
            set { mInvoiceNumbers = value; }
        }
        public DateTime FirstInvoiceDate
        {
            get { return mFirstInvoiceDate; }
            set { mFirstInvoiceDate = value; }
        }
        public String POValue
        {
            get { return mPOValue; }
            set { mPOValue = value; }
        }
        public DateTime PODate
        {
            get { return mPODate; }
            set { mPODate = value; }
        }
        public String ShipperName
        {
            get { return mShipperName; }
            set { mShipperName = value; }
        }
        public String ConsigneeName
        {
            get { return mConsigneeName; }
            set { mConsigneeName = value; }
        }
        public String MoveTypeName
        {
            get { return mMoveTypeName; }
            set { mMoveTypeName = value; }
        }
        public String OperationStageName
        {
            get { return mOperationStageName; }
            set { mOperationStageName = value; }
        }
        public String POLCode
        {
            get { return mPOLCode; }
            set { mPOLCode = value; }
        }
        public String PODCode
        {
            get { return mPODCode; }
            set { mPODCode = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
        }
        public Boolean IsOfficial
        {
            get { return mIsOfficial; }
            set { mIsOfficial = value; }
        }
        public Decimal QuotationCost
        {
            get { return mQuotationCost; }
            set { mQuotationCost = value; }
        }
        public Decimal PayablesWithVAT
        {
            get { return mPayablesWithVAT; }
            set { mPayablesWithVAT = value; }
        }
        public Decimal PayablesWithoutVAT
        {
            get { return mPayablesWithoutVAT; }
            set { mPayablesWithoutVAT = value; }
        }
        public Decimal ReceivablesWithVAT
        {
            get { return mReceivablesWithVAT; }
            set { mReceivablesWithVAT = value; }
        }
        public Decimal ReceivablesWithoutVAT
        {
            get { return mReceivablesWithoutVAT; }
            set { mReceivablesWithoutVAT = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Int32 IsUsedInOperationStatement
        {
            get { return mIsUsedInOperationStatement; }
            set { mIsUsedInOperationStatement = value; }
        }
        public Decimal CostAmount
        {
            get { return mCostAmount; }
            set { mCostAmount = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mPaidAmount = value; }
        }
        public Decimal RemainingAmount
        {
            get { return mRemainingAmount; }
            set { mRemainingAmount = value; }
        }
        public String PayableStatus
        {
            get { return mPayableStatus; }
            set { mPayableStatus = value; }
        }
        public Int32 BillTo
        {
            get { return mBillTo; }
            set { mBillTo = value; }
        }
        public String BillToName
        {
            get { return mBillToName; }
            set { mBillToName = value; }
        }
        public Int32 PartnerSupplierID
        {
            get { return mPartnerSupplierID; }
            set { mPartnerSupplierID = value; }
        }
        public String PartnerSupplierName
        {
            get { return mPartnerSupplierName; }
            set { mPartnerSupplierName = value; }
        }
        public DateTime PayableDate
        {
            get { return mPayableDate; }
            set { mPayableDate = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        #endregion
    }

    public partial class CvwProfitCurrenciesWithInvoiceNosAndDate
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
        public List<CVarvwProfitCurrenciesWithInvoiceNosAndDate> lstCVarvwProfitCurrenciesWithInvoiceNosAndDate = new List<CVarvwProfitCurrenciesWithInvoiceNosAndDate>();
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
            lstCVarvwProfitCurrenciesWithInvoiceNosAndDate.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwProfitCurrenciesWithInvoiceNosAndDate";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwProfitCurrenciesWithInvoiceNosAndDate ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate = new CVarvwProfitCurrenciesWithInvoiceNosAndDate();
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBookingPartyName = Convert.ToString(dr["BookingPartyName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mChargeableWeightSum = Convert.ToDecimal(dr["ChargeableWeightSum"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mContainerTypes = Convert.ToString(dr["ContainerTypes"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mInvoiceNumbers = Convert.ToString(dr["InvoiceNumbers"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mFirstInvoiceDate = Convert.ToDateTime(dr["FirstInvoiceDate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPOValue = Convert.ToString(dr["POValue"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mConsigneeName = Convert.ToString(dr["ConsigneeName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mOperationStageName = Convert.ToString(dr["OperationStageName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mIsOfficial = Convert.ToBoolean(dr["IsOfficial"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mQuotationCost = Convert.ToDecimal(dr["QuotationCost"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPayablesWithVAT = Convert.ToDecimal(dr["PayablesWithVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPayablesWithoutVAT = Convert.ToDecimal(dr["PayablesWithoutVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mReceivablesWithVAT = Convert.ToDecimal(dr["ReceivablesWithVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mReceivablesWithoutVAT = Convert.ToDecimal(dr["ReceivablesWithoutVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mIsUsedInOperationStatement = Convert.ToInt32(dr["IsUsedInOperationStatement"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPayableStatus = Convert.ToString(dr["PayableStatus"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBillTo = Convert.ToInt32(dr["BillTo"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBillToName = Convert.ToString(dr["BillToName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPartnerSupplierID = Convert.ToInt32(dr["PartnerSupplierID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPartnerSupplierName = Convert.ToString(dr["PartnerSupplierName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPayableDate = Convert.ToDateTime(dr["PayableDate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        lstCVarvwProfitCurrenciesWithInvoiceNosAndDate.Add(ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate);
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
            lstCVarvwProfitCurrenciesWithInvoiceNosAndDate.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwProfitCurrenciesWithInvoiceNosAndDate";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwProfitCurrenciesWithInvoiceNosAndDate ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate = new CVarvwProfitCurrenciesWithInvoiceNosAndDate();
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBookingPartyName = Convert.ToString(dr["BookingPartyName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mChargeableWeightSum = Convert.ToDecimal(dr["ChargeableWeightSum"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mContainerTypes = Convert.ToString(dr["ContainerTypes"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mInvoiceNumbers = Convert.ToString(dr["InvoiceNumbers"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mFirstInvoiceDate = Convert.ToDateTime(dr["FirstInvoiceDate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPOValue = Convert.ToString(dr["POValue"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mConsigneeName = Convert.ToString(dr["ConsigneeName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mMoveTypeName = Convert.ToString(dr["MoveTypeName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mOperationStageName = Convert.ToString(dr["OperationStageName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mIsOfficial = Convert.ToBoolean(dr["IsOfficial"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mQuotationCost = Convert.ToDecimal(dr["QuotationCost"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPayablesWithVAT = Convert.ToDecimal(dr["PayablesWithVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPayablesWithoutVAT = Convert.ToDecimal(dr["PayablesWithoutVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mReceivablesWithVAT = Convert.ToDecimal(dr["ReceivablesWithVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mReceivablesWithoutVAT = Convert.ToDecimal(dr["ReceivablesWithoutVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mIsUsedInOperationStatement = Convert.ToInt32(dr["IsUsedInOperationStatement"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPayableStatus = Convert.ToString(dr["PayableStatus"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBillTo = Convert.ToInt32(dr["BillTo"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mBillToName = Convert.ToString(dr["BillToName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPartnerSupplierID = Convert.ToInt32(dr["PartnerSupplierID"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPartnerSupplierName = Convert.ToString(dr["PartnerSupplierName"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mPayableDate = Convert.ToDateTime(dr["PayableDate"].ToString());
                        ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwProfitCurrenciesWithInvoiceNosAndDate.Add(ObjCVarvwProfitCurrenciesWithInvoiceNosAndDate);
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
