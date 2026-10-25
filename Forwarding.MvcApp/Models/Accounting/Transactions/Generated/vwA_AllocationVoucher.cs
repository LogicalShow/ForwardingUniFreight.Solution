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
    public class CPKvwA_AllocationVoucher
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
    public partial class CVarvwA_AllocationVoucher : CPKvwA_AllocationVoucher
    {
        #region "variables"
        internal Boolean mIsChanges = false;
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

    public partial class CvwA_AllocationVoucher
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
        public List<CVarvwA_AllocationVoucher> lstCVarvwA_AllocationVoucher = new List<CVarvwA_AllocationVoucher>();
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
            lstCVarvwA_AllocationVoucher.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_AllocationVoucher";
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
                        CVarvwA_AllocationVoucher ObjCVarvwA_AllocationVoucher = new CVarvwA_AllocationVoucher();
                        ObjCVarvwA_AllocationVoucher.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_AllocationVoucher.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_AllocationVoucher.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarvwA_AllocationVoucher.mVoucherDate = Convert.ToDateTime(dr["VoucherDate"].ToString());
                        ObjCVarvwA_AllocationVoucher.mVoucherType = Convert.ToString(dr["VoucherType"].ToString());
                        ObjCVarvwA_AllocationVoucher.mVoucherTypeNo = Convert.ToInt32(dr["VoucherTypeNo"].ToString());
                        ObjCVarvwA_AllocationVoucher.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwA_AllocationVoucher.mRmaining = Convert.ToDecimal(dr["Rmaining"].ToString());
                        ObjCVarvwA_AllocationVoucher.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwA_AllocationVoucher.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwA_AllocationVoucher.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwA_AllocationVoucher.mClient_ID = Convert.ToInt32(dr["Client_ID"].ToString());
                        ObjCVarvwA_AllocationVoucher.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        lstCVarvwA_AllocationVoucher.Add(ObjCVarvwA_AllocationVoucher);
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
            lstCVarvwA_AllocationVoucher.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_AllocationVoucher";
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
                        CVarvwA_AllocationVoucher ObjCVarvwA_AllocationVoucher = new CVarvwA_AllocationVoucher();
                        ObjCVarvwA_AllocationVoucher.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_AllocationVoucher.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_AllocationVoucher.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarvwA_AllocationVoucher.mVoucherDate = Convert.ToDateTime(dr["VoucherDate"].ToString());
                        ObjCVarvwA_AllocationVoucher.mVoucherType = Convert.ToString(dr["VoucherType"].ToString());
                        ObjCVarvwA_AllocationVoucher.mVoucherTypeNo = Convert.ToInt32(dr["VoucherTypeNo"].ToString());
                        ObjCVarvwA_AllocationVoucher.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwA_AllocationVoucher.mRmaining = Convert.ToDecimal(dr["Rmaining"].ToString());
                        ObjCVarvwA_AllocationVoucher.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwA_AllocationVoucher.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwA_AllocationVoucher.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwA_AllocationVoucher.mClient_ID = Convert.ToInt32(dr["Client_ID"].ToString());
                        ObjCVarvwA_AllocationVoucher.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_AllocationVoucher.Add(ObjCVarvwA_AllocationVoucher);
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
