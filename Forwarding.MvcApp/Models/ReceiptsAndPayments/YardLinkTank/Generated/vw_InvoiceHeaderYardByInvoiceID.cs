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
    public partial class CVarvw_InvoiceHeaderYardByInvoiceID
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mInvoiceSerial;
        internal Int32 mCustomerID;
        internal DateTime mIssueDate;
        internal Decimal mInvoiceTotal;
        internal Int32 mCurrencyID;
        internal Decimal mDiscount;
        internal Decimal mSalesTax;
        internal String mRemarks;
        internal Decimal mExchangeRate;
        internal Int32 mHoldingTaxPercentage;
        internal Decimal mHoldingTaxAmount;


        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String InvoiceSerial
        {
            get { return mInvoiceSerial; }
            set { mInvoiceSerial = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIssueDate = value; }
        }
        public Decimal InvoiceTotal
        {
            get { return mInvoiceTotal; }
            set { mInvoiceTotal = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mDiscount = value; }
        }
        public Decimal SalesTax
        {
            get { return mSalesTax; }
            set { mSalesTax = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
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

    public partial class Cvw_InvoiceHeaderYardByInvoiceID
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
        public List<CVarvw_InvoiceHeaderYardByInvoiceID> lstCVarvw_InvoiceHeaderYardByInvoiceID = new List<CVarvw_InvoiceHeaderYardByInvoiceID>();
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
            lstCVarvw_InvoiceHeaderYardByInvoiceID.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvw_InvoiceHeaderYardLinkTankByInvoiceID";
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
                        CVarvw_InvoiceHeaderYardByInvoiceID ObjCVarvw_InvoiceHeaderYardByInvoiceID = new CVarvw_InvoiceHeaderYardByInvoiceID();
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mInvoiceSerial = Convert.ToString(dr["InvoiceSerial"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mInvoiceTotal = Convert.ToDecimal(dr["InvoiceTotal"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mSalesTax = Convert.ToDecimal(dr["SalesTax"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mHoldingTaxPercentage = Convert.ToInt32(dr["HoldingTaxPercentage"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mHoldingTaxAmount = Convert.ToDecimal(dr["HoldingTaxAmount"].ToString());

                        lstCVarvw_InvoiceHeaderYardByInvoiceID.Add(ObjCVarvw_InvoiceHeaderYardByInvoiceID);
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
            lstCVarvw_InvoiceHeaderYardByInvoiceID.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvw_InvoiceHeaderYardByInvoiceID";
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
                        CVarvw_InvoiceHeaderYardByInvoiceID ObjCVarvw_InvoiceHeaderYardByInvoiceID = new CVarvw_InvoiceHeaderYardByInvoiceID();
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mInvoiceSerial = Convert.ToString(dr["InvoiceSerial"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mInvoiceTotal = Convert.ToDecimal(dr["InvoiceTotal"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mSalesTax = Convert.ToDecimal(dr["SalesTax"].ToString());
                        ObjCVarvw_InvoiceHeaderYardByInvoiceID.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvw_InvoiceHeaderYardByInvoiceID.Add(ObjCVarvw_InvoiceHeaderYardByInvoiceID);
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
