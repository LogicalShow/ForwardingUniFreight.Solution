using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
    [Serializable]
    public partial class CVarvwInvoicesForDashboard
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mInvoiceNumber;
        internal Int32 mInvoiceTypeID;
        internal String mInvoiceTypeCode;
        internal String mInvoiceTypeName;
        internal String mConcatenatedInvoiceNumber;
        internal String mCode;
        internal Int64 mOperationPartnerID;
        internal Int32 mPartnerTypeID;
        internal String mPartnerTypeCode;
        internal String mGeneralPartnerTypeCode;
        internal Int32 mPartnerID;
        internal String mPartnerName;
        internal Decimal mExchangeRate;
        internal Decimal mAmount;
        internal String mCurrencyCode;
        internal DateTime mInvoiceDate;
        internal Boolean mIsApproved;
        internal Boolean mIsDeleted;
        internal Boolean mIs3PL;
        internal Boolean mIsFleet;
        internal Boolean mIsPrintOriginal;
        internal Int64 mCancelledInvoiceID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mInvoiceNumber = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public String InvoiceTypeCode
        {
            get { return mInvoiceTypeCode; }
            set { mInvoiceTypeCode = value; }
        }
        public String InvoiceTypeName
        {
            get { return mInvoiceTypeName; }
            set { mInvoiceTypeName = value; }
        }
        public String ConcatenatedInvoiceNumber
        {
            get { return mConcatenatedInvoiceNumber; }
            set { mConcatenatedInvoiceNumber = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int64 OperationPartnerID
        {
            get { return mOperationPartnerID; }
            set { mOperationPartnerID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public String PartnerTypeCode
        {
            get { return mPartnerTypeCode; }
            set { mPartnerTypeCode = value; }
        }
        public String GeneralPartnerTypeCode
        {
            get { return mGeneralPartnerTypeCode; }
            set { mGeneralPartnerTypeCode = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
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
        public Boolean Is3PL
        {
            get { return mIs3PL; }
            set { mIs3PL = value; }
        }
        public Boolean IsFleet
        {
            get { return mIsFleet; }
            set { mIsFleet = value; }
        }
        public Boolean IsPrintOriginal
        {
            get { return mIsPrintOriginal; }
            set { mIsPrintOriginal = value; }
        }
        public Int64 CancelledInvoiceID
        {
            get { return mCancelledInvoiceID; }
            set { mCancelledInvoiceID = value; }
        }
        #endregion
    }

    public partial class CvwInvoicesForDashboard
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
        public List<CVarvwInvoicesForDashboard> lstCVarvwInvoicesForDashboard = new List<CVarvwInvoicesForDashboard>();
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
            lstCVarvwInvoicesForDashboard.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwInvoicesForDashboard";
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
                        CVarvwInvoicesForDashboard ObjCVarvwInvoicesForDashboard = new CVarvwInvoicesForDashboard();
                        ObjCVarvwInvoicesForDashboard.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesForDashboard.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForDashboard.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwInvoicesForDashboard.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesForDashboard.mGeneralPartnerTypeCode = Convert.ToString(dr["GeneralPartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesForDashboard.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwInvoicesForDashboard.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwInvoicesForDashboard.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwInvoicesForDashboard.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIsPrintOriginal = Convert.ToBoolean(dr["IsPrintOriginal"].ToString());
                        ObjCVarvwInvoicesForDashboard.mCancelledInvoiceID = Convert.ToInt64(dr["CancelledInvoiceID"].ToString());
                        lstCVarvwInvoicesForDashboard.Add(ObjCVarvwInvoicesForDashboard);
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
            lstCVarvwInvoicesForDashboard.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwInvoicesForDashboard";
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
                        CVarvwInvoicesForDashboard ObjCVarvwInvoicesForDashboard = new CVarvwInvoicesForDashboard();
                        ObjCVarvwInvoicesForDashboard.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceTypeCode = Convert.ToString(dr["InvoiceTypeCode"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwInvoicesForDashboard.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwInvoicesForDashboard.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwInvoicesForDashboard.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesForDashboard.mGeneralPartnerTypeCode = Convert.ToString(dr["GeneralPartnerTypeCode"].ToString());
                        ObjCVarvwInvoicesForDashboard.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwInvoicesForDashboard.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwInvoicesForDashboard.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwInvoicesForDashboard.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwInvoicesForDashboard.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwInvoicesForDashboard.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIs3PL = Convert.ToBoolean(dr["Is3PL"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIsFleet = Convert.ToBoolean(dr["IsFleet"].ToString());
                        ObjCVarvwInvoicesForDashboard.mIsPrintOriginal = Convert.ToBoolean(dr["IsPrintOriginal"].ToString());
                        ObjCVarvwInvoicesForDashboard.mCancelledInvoiceID = Convert.ToInt64(dr["CancelledInvoiceID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwInvoicesForDashboard.Add(ObjCVarvwInvoicesForDashboard);
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
