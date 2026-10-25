using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public partial class CVarvwA_InvoiceItemsByVoucher
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mVoucherID;
        internal Decimal mSaleAmount;
        internal String mBLNumber;
        internal Int64 mInvoiceNumber;
        internal String mOperationNo;
        internal String mItemName;
        #endregion

        #region "Methods"
        public Int64 VoucherID
        {
            get { return mVoucherID; }
            set { mVoucherID = value; }
        }
        public Decimal SaleAmount
        {
            get { return mSaleAmount; }
            set { mSaleAmount = value; }
        }
        public String BLNumber
        {
            get { return mBLNumber; }
            set { mBLNumber = value; }
        }
        public Int64 InvoiceNumber
        {
            get { return mInvoiceNumber; }
            set { mInvoiceNumber = value; }
        }
        public String OperationNo
        {
            get { return mOperationNo; }
            set { mOperationNo = value; }
        }
        public String ItemName
        {
            get { return mItemName; }
            set { mItemName = value; }
        }
        #endregion
    }

    public partial class CvwA_InvoiceItemsByVoucher
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
        public List<CVarvwA_InvoiceItemsByVoucher> lstCVarvwA_InvoiceItemsByVoucher = new List<CVarvwA_InvoiceItemsByVoucher>();
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
            lstCVarvwA_InvoiceItemsByVoucher.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_InvoiceItemsByVoucher";
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
                        CVarvwA_InvoiceItemsByVoucher ObjCVarvwA_InvoiceItemsByVoucher = new CVarvwA_InvoiceItemsByVoucher();
                        ObjCVarvwA_InvoiceItemsByVoucher.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mBLNumber = Convert.ToString(dr["BLNumber"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mOperationNo = Convert.ToString(dr["OperationNo"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        lstCVarvwA_InvoiceItemsByVoucher.Add(ObjCVarvwA_InvoiceItemsByVoucher);
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
            lstCVarvwA_InvoiceItemsByVoucher.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_InvoiceItemsByVoucher";
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
                        CVarvwA_InvoiceItemsByVoucher ObjCVarvwA_InvoiceItemsByVoucher = new CVarvwA_InvoiceItemsByVoucher();
                        ObjCVarvwA_InvoiceItemsByVoucher.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mBLNumber = Convert.ToString(dr["BLNumber"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mInvoiceNumber = Convert.ToInt64(dr["InvoiceNumber"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mOperationNo = Convert.ToString(dr["OperationNo"].ToString());
                        ObjCVarvwA_InvoiceItemsByVoucher.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_InvoiceItemsByVoucher.Add(ObjCVarvwA_InvoiceItemsByVoucher);
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
