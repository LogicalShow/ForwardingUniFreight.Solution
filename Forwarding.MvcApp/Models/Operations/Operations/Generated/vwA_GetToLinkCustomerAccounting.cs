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
    public partial class CVarvwA_GetToLinkCustomerAccounting
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int32 mCustomerID;
        internal String mName;
        internal Boolean mIsExternal;
        internal Int32 mAccountID;
        internal Int32 msubAccountID;
        internal Int32 msubAccountIDGroupID;
        internal Int32 mCustomersubAccountID;
        internal Decimal mExchangeRate;
        internal Int32 mCurrencyID;
        internal Int32 mInvoicesPaymentID;
        internal Int64 mInvoicesVoucherID;
        internal Decimal mAmount;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Boolean IsExternal
        {
            get { return mIsExternal; }
            set { mIsExternal = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public Int32 subAccountID
        {
            get { return msubAccountID; }
            set { msubAccountID = value; }
        }
        public Int32 subAccountIDGroupID
        {
            get { return msubAccountIDGroupID; }
            set { msubAccountIDGroupID = value; }
        }
        public Int32 CustomersubAccountID
        {
            get { return mCustomersubAccountID; }
            set { mCustomersubAccountID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Int32 InvoicesPaymentID
        {
            get { return mInvoicesPaymentID; }
            set { mInvoicesPaymentID = value; }
        }
        public Int64 InvoicesVoucherID
        {
            get { return mInvoicesVoucherID; }
            set { mInvoicesVoucherID = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        #endregion
    }

    public partial class CvwA_GetToLinkCustomerAccounting
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
        public List<CVarvwA_GetToLinkCustomerAccounting> lstCVarvwA_GetToLinkCustomerAccounting = new List<CVarvwA_GetToLinkCustomerAccounting>();
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
            lstCVarvwA_GetToLinkCustomerAccounting.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_GetToLinkCustomerAccounting";
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
                        CVarvwA_GetToLinkCustomerAccounting ObjCVarvwA_GetToLinkCustomerAccounting = new CVarvwA_GetToLinkCustomerAccounting();
                        ObjCVarvwA_GetToLinkCustomerAccounting.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mIsExternal = Convert.ToBoolean(dr["IsExternal"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.msubAccountID = Convert.ToInt32(dr["subAccountID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.msubAccountIDGroupID = Convert.ToInt32(dr["subAccountIDGroupID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mCustomersubAccountID = Convert.ToInt32(dr["CustomersubAccountID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mInvoicesPaymentID = Convert.ToInt32(dr["InvoicesPaymentID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mInvoicesVoucherID = Convert.ToInt64(dr["InvoicesVoucherID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        lstCVarvwA_GetToLinkCustomerAccounting.Add(ObjCVarvwA_GetToLinkCustomerAccounting);
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
            lstCVarvwA_GetToLinkCustomerAccounting.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_GetToLinkCustomerAccounting";
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
                        CVarvwA_GetToLinkCustomerAccounting ObjCVarvwA_GetToLinkCustomerAccounting = new CVarvwA_GetToLinkCustomerAccounting();
                        ObjCVarvwA_GetToLinkCustomerAccounting.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mIsExternal = Convert.ToBoolean(dr["IsExternal"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.msubAccountID = Convert.ToInt32(dr["subAccountID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.msubAccountIDGroupID = Convert.ToInt32(dr["subAccountIDGroupID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mCustomersubAccountID = Convert.ToInt32(dr["CustomersubAccountID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mInvoicesPaymentID = Convert.ToInt32(dr["InvoicesPaymentID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mInvoicesVoucherID = Convert.ToInt64(dr["InvoicesVoucherID"].ToString());
                        ObjCVarvwA_GetToLinkCustomerAccounting.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_GetToLinkCustomerAccounting.Add(ObjCVarvwA_GetToLinkCustomerAccounting);
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
