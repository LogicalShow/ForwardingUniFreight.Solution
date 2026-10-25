using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public partial class CVarvwA_AllocationVoucherpayable
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mCode;
        internal String mChequeNo;
        internal DateTime mVoucherDate;
        internal String mVoucherType;
        internal Int32 mVoucherTypeNo;
        internal Decimal mTotal;
        internal Decimal mRmaining;
        internal Decimal mPaidAmount;
        internal Decimal mQty;
        internal String mCurrencyCode;
        internal Int32 mClient_ID;
        internal Int32 mCurrencyID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String ChequeNo
        {
            get { return mChequeNo; }
            set { mChequeNo = value; }
        }
        public DateTime VoucherDate
        {
            get { return mVoucherDate; }
            set { mVoucherDate = value; }
        }
        public String VoucherType
        {
            get { return mVoucherType; }
            set { mVoucherType = value; }
        }
        public Int32 VoucherTypeNo
        {
            get { return mVoucherTypeNo; }
            set { mVoucherTypeNo = value; }
        }
        public Decimal Total
        {
            get { return mTotal; }
            set { mTotal = value; }
        }
        public Decimal Rmaining
        {
            get { return mRmaining; }
            set { mRmaining = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mPaidAmount = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Int32 Client_ID
        {
            get { return mClient_ID; }
            set { mClient_ID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        #endregion
    }

    public partial class CvwA_AllocationVoucherpayable
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
        public List<CVarvwA_AllocationVoucherpayable> lstCVarvwA_AllocationVoucherpayable = new List<CVarvwA_AllocationVoucherpayable>();
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
            lstCVarvwA_AllocationVoucherpayable.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_AllocationVoucherpayable";
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
                        CVarvwA_AllocationVoucherpayable ObjCVarvwA_AllocationVoucherpayable = new CVarvwA_AllocationVoucherpayable();
                        ObjCVarvwA_AllocationVoucherpayable.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mVoucherDate = Convert.ToDateTime(dr["VoucherDate"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mVoucherType = Convert.ToString(dr["VoucherType"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mVoucherTypeNo = Convert.ToInt32(dr["VoucherTypeNo"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mRmaining = Convert.ToDecimal(dr["Rmaining"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mClient_ID = Convert.ToInt32(dr["Client_ID"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        lstCVarvwA_AllocationVoucherpayable.Add(ObjCVarvwA_AllocationVoucherpayable);
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
            lstCVarvwA_AllocationVoucherpayable.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_AllocationVoucherpayable";
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
                        CVarvwA_AllocationVoucherpayable ObjCVarvwA_AllocationVoucherpayable = new CVarvwA_AllocationVoucherpayable();
                        ObjCVarvwA_AllocationVoucherpayable.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mVoucherDate = Convert.ToDateTime(dr["VoucherDate"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mVoucherType = Convert.ToString(dr["VoucherType"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mVoucherTypeNo = Convert.ToInt32(dr["VoucherTypeNo"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mRmaining = Convert.ToDecimal(dr["Rmaining"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mClient_ID = Convert.ToInt32(dr["Client_ID"].ToString());
                        ObjCVarvwA_AllocationVoucherpayable.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_AllocationVoucherpayable.Add(ObjCVarvwA_AllocationVoucherpayable);
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
