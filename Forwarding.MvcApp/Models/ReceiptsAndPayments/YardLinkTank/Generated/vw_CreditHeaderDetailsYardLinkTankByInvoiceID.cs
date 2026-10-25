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
    public class CPKvw_CreditHeaderDetailsYardLinkTankByInvoiceID
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID : CPKvw_CreditHeaderDetailsYardLinkTankByInvoiceID
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCreditID;
        internal Int32 mCreditSerial;
        internal DateTime mCreditIssueDate;
        internal Int64 mInvoiceID;
        internal String mInvoiceSerial;
        internal Int32 mCustomerID;
        internal String mCustomerCode;
        internal String mCustomerName;
        internal DateTime mInvoiceDate;
        internal Decimal mInvoiceItemsTotal;
        internal Decimal mSalesTax;
        internal Byte mInvoiceTypeID;
        internal String mInvoiceTypeName;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Int32 mChargeTypeID;
        internal Int32 mMeasurementID;
        #endregion

        #region "Methods"
        public Int32 CreditID
        {
            get { return mCreditID; }
            set { mCreditID = value; }
        }
        public Int32 CreditSerial
        {
            get { return mCreditSerial; }
            set { mCreditSerial = value; }
        }
        public DateTime CreditIssueDate
        {
            get { return mCreditIssueDate; }
            set { mCreditIssueDate = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
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
        public String CustomerCode
        {
            get { return mCustomerCode; }
            set { mCustomerCode = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public Decimal InvoiceItemsTotal
        {
            get { return mInvoiceItemsTotal; }
            set { mInvoiceItemsTotal = value; }
        }
        public Decimal SalesTax
        {
            get { return mSalesTax; }
            set { mSalesTax = value; }
        }
        public Byte InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public String InvoiceTypeName
        {
            get { return mInvoiceTypeName; }
            set { mInvoiceTypeName = value; }
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
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public Int32 MeasurementID
        {
            get { return mMeasurementID; }
            set { mMeasurementID = value; }
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

    public partial class Cvw_CreditHeaderDetailsYardLinkTankByInvoiceID
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
        public List<CVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID> lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID = new List<CVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID>();
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
            lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvw_CreditHeaderDetailsYardLinkTankByInvoiceID";
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
                        CVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID = new CVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID();
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCreditID = Convert.ToInt32(dr["CreditID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCreditSerial = Convert.ToInt32(dr["CreditSerial"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCreditIssueDate = Convert.ToDateTime(dr["CreditIssueDate"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceSerial = Convert.ToString(dr["InvoiceSerial"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCustomerCode = Convert.ToString(dr["CustomerCode"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceItemsTotal = Convert.ToDecimal(dr["InvoiceItemsTotal"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mSalesTax = Convert.ToDecimal(dr["SalesTax"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceTypeID = Convert.ToByte(dr["InvoiceTypeID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.Add(ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID);
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
            lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvw_CreditHeaderDetailsYardLinkTankByInvoiceID";
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
                        CVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID = new CVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID();
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCreditID = Convert.ToInt32(dr["CreditID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCreditSerial = Convert.ToInt32(dr["CreditSerial"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCreditIssueDate = Convert.ToDateTime(dr["CreditIssueDate"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceSerial = Convert.ToString(dr["InvoiceSerial"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCustomerCode = Convert.ToString(dr["CustomerCode"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceItemsTotal = Convert.ToDecimal(dr["InvoiceItemsTotal"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mSalesTax = Convert.ToDecimal(dr["SalesTax"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceTypeID = Convert.ToByte(dr["InvoiceTypeID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID.Add(ObjCVarvw_CreditHeaderDetailsYardLinkTankByInvoiceID);
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
