using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLinkTank.Generated
{

    [Serializable]
    public partial class CVarvwCreditHeaderYardLinkTank
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mCrdtSerial;
        internal DateTime mCrdtDate;
        internal Decimal mTotal;
        internal Decimal mCrdtSalaTax;
        internal Decimal mTotalAfterTax;
        internal Int32 mInvoiceHeaderID;
        internal Int64 mOperationID;
        internal Int64 mOperationPartnerID;
        internal Int64 mAddressID;
        internal Int32 mCurrencyID;
        internal Decimal mExchangerate;
        internal String mInvoiceType;
        internal Byte mInvoiceTypeID;
        internal String mCurrencyCode;
        internal String mCustomerName;
        internal Int32 mJVID;
        internal Boolean mCrdtIsPosted;
        internal Int64 mForInvoiceID;
        internal Int32 mCustomerID;
        internal Int32 mHoldingTaxPercentage;
        internal Decimal mHoldingTaxAmount;

        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 CrdtSerial
        {
            get { return mCrdtSerial; }
            set { mCrdtSerial = value; }
        }
        public DateTime CrdtDate
        {
            get { return mCrdtDate; }
            set { mCrdtDate = value; }
        }
        public Decimal Total
        {
            get { return mTotal; }
            set { mTotal = value; }
        }
        public Decimal CrdtSalaTax
        {
            get { return mCrdtSalaTax; }
            set { mCrdtSalaTax = value; }
        }
        public Decimal TotalAfterTax
        {
            get { return mTotalAfterTax; }
            set { mTotalAfterTax = value; }
        }
        public Int32 InvoiceHeaderID
        {
            get { return mInvoiceHeaderID; }
            set { mInvoiceHeaderID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int64 OperationPartnerID
        {
            get { return mOperationPartnerID; }
            set { mOperationPartnerID = value; }
        }
        public Int64 AddressID
        {
            get { return mAddressID; }
            set { mAddressID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Decimal Exchangerate
        {
            get { return mExchangerate; }
            set { mExchangerate = value; }
        }
        public String InvoiceType
        {
            get { return mInvoiceType; }
            set { mInvoiceType = value; }
        }
        public Byte InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public Int32 JVID
        {
            get { return mJVID; }
            set { mJVID = value; }
        }
        public Boolean CrdtIsPosted
        {
            get { return mCrdtIsPosted; }
            set { mCrdtIsPosted = value; }
        }
        public Int64 ForInvoiceID
        {
            get { return mForInvoiceID; }
            set { mForInvoiceID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public Int32 HoldingTaxPercentage
        {
            get { return mHoldingTaxPercentage; }
            set { mHoldingTaxPercentage = value; }
        }
        public Decimal HoldingTaxAmount
        {
            get { return mHoldingTaxAmount; }
            set { mHoldingTaxAmount = value; }
        }
        #endregion
    }

    public partial class CvwCreditHeaderYardLinkTank
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
        public List<CVarvwCreditHeaderYardLinkTank> lstCVarvwCreditHeaderYardLinkTank = new List<CVarvwCreditHeaderYardLinkTank>();
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
            lstCVarvwCreditHeaderYardLinkTank.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCreditHeaderYardLinkTank";
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
                        CVarvwCreditHeaderYardLinkTank ObjCVarvwCreditHeaderYardLinkTank = new CVarvwCreditHeaderYardLinkTank();
                        ObjCVarvwCreditHeaderYardLinkTank.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCrdtSerial = Convert.ToInt32(dr["CrdtSerial"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCrdtDate = Convert.ToDateTime(dr["CrdtDate"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCrdtSalaTax = Convert.ToDecimal(dr["CrdtSalaTax"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mInvoiceHeaderID = Convert.ToInt32(dr["InvoiceHeaderID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mExchangerate = Convert.ToDecimal(dr["Exchangerate"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mInvoiceType = Convert.ToString(dr["InvoiceType"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mInvoiceTypeID = Convert.ToByte(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCrdtIsPosted = Convert.ToBoolean(dr["CrdtIsPosted"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mForInvoiceID = Convert.ToInt64(dr["ForInvoiceID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mHoldingTaxPercentage = Convert.ToInt32(dr["HoldingTaxPercentage"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mHoldingTaxAmount = Convert.ToDecimal(dr["HoldingTaxAmount"].ToString());

                        lstCVarvwCreditHeaderYardLinkTank.Add(ObjCVarvwCreditHeaderYardLinkTank);
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
            lstCVarvwCreditHeaderYardLinkTank.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCreditHeaderYardLinkTank";
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
                        CVarvwCreditHeaderYardLinkTank ObjCVarvwCreditHeaderYardLinkTank = new CVarvwCreditHeaderYardLinkTank();
                        ObjCVarvwCreditHeaderYardLinkTank.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCrdtSerial = Convert.ToInt32(dr["CrdtSerial"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCrdtDate = Convert.ToDateTime(dr["CrdtDate"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCrdtSalaTax = Convert.ToDecimal(dr["CrdtSalaTax"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mInvoiceHeaderID = Convert.ToInt32(dr["InvoiceHeaderID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mExchangerate = Convert.ToDecimal(dr["Exchangerate"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mInvoiceType = Convert.ToString(dr["InvoiceType"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mInvoiceTypeID = Convert.ToByte(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mJVID = Convert.ToInt32(dr["JVID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCrdtIsPosted = Convert.ToBoolean(dr["CrdtIsPosted"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mForInvoiceID = Convert.ToInt64(dr["ForInvoiceID"].ToString());
                        ObjCVarvwCreditHeaderYardLinkTank.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCreditHeaderYardLinkTank.Add(ObjCVarvwCreditHeaderYardLinkTank);
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
