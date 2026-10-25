using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    //Com.CommandTimeout = 2000;
    [Serializable]
    public partial class CVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal Int64 mMasterOperationID;
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
        internal String mHouseNumber;
        internal Int64 mInvoiceNumber;
        internal String mInvoiceName;
        internal Int64 mBillID;
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
        public String HouseNumber
        {
            get { return mHouseNumber; }
            set { mHouseNumber = value; }
        }
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mInvoiceNumber = value; }
        }
        public String InvoiceName
        {
            get { return mInvoiceName; }
            set { mInvoiceName = value; }
        }
        public Int64 BillID
        {
            get { return mBillID; }
            set { mBillID = value; }
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

    public partial class CvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL
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
        public List<CVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL> lstCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL = new List<CVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL>();
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
            lstCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL";
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
                        CVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL = new CVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL();
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mIsOfficial = Convert.ToBoolean(dr["IsOfficial"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mQuotationCost = Convert.ToDecimal(dr["QuotationCost"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mPayablesWithVAT = Convert.ToDecimal(dr["PayablesWithVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mPayablesWithoutVAT = Convert.ToDecimal(dr["PayablesWithoutVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mReceivablesWithVAT = Convert.ToDecimal(dr["ReceivablesWithVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mReceivablesWithoutVAT = Convert.ToDecimal(dr["ReceivablesWithoutVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mIsUsedInOperationStatement = Convert.ToInt32(dr["IsUsedInOperationStatement"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mInvoiceName = Convert.ToString(dr["InvoiceName"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mPayableDate = Convert.ToDateTime(dr["PayableDate"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        lstCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.Add(ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL);
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
            lstCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL";
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
                        CVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL = new CVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL();
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mIsOfficial = Convert.ToBoolean(dr["IsOfficial"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mQuotationCost = Convert.ToDecimal(dr["QuotationCost"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mPayablesWithVAT = Convert.ToDecimal(dr["PayablesWithVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mPayablesWithoutVAT = Convert.ToDecimal(dr["PayablesWithoutVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mReceivablesWithVAT = Convert.ToDecimal(dr["ReceivablesWithVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mReceivablesWithoutVAT = Convert.ToDecimal(dr["ReceivablesWithoutVAT"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mIsUsedInOperationStatement = Convert.ToInt32(dr["IsUsedInOperationStatement"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mHouseNumber = Convert.ToString(dr["HouseNumber"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mInvoiceName = Convert.ToString(dr["InvoiceName"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mPayableDate = Convert.ToDateTime(dr["PayableDate"].ToString());
                        ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL.Add(ObjCVarvwProfitCurrenciesWithMinimalColumns_OperationStatement_CL);
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
