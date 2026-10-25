using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated
{
    [Serializable]
    public partial class CVarvwSL_PostedInvoiceJVs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mJVNo;
        internal DateTime mJVDate;
        internal Decimal mTotalDebit;
        internal String mReceiptNo;
        internal String mRemarksHeader;
        internal Int64 mInvoiceSerial;
        internal Int32 mInvoiceTypeID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String JVNo
        {
            get { return mJVNo; }
            set { mJVNo = value; }
        }
        public DateTime JVDate
        {
            get { return mJVDate; }
            set { mJVDate = value; }
        }
        public Decimal TotalDebit
        {
            get { return mTotalDebit; }
            set { mTotalDebit = value; }
        }
        public String ReceiptNo
        {
            get { return mReceiptNo; }
            set { mReceiptNo = value; }
        }
        public String RemarksHeader
        {
            get { return mRemarksHeader; }
            set { mRemarksHeader = value; }
        }
        public Int64 InvoiceSerial
        {
            get { return mInvoiceSerial; }
            set { mInvoiceSerial = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        #endregion
    }

    public partial class CvwSL_PostedInvoiceJVs
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
        public List<CVarvwSL_PostedInvoiceJVs> lstCVarvwSL_PostedInvoiceJVs = new List<CVarvwSL_PostedInvoiceJVs>();
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
            lstCVarvwSL_PostedInvoiceJVs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_PostedInvoiceJVs";
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
                        CVarvwSL_PostedInvoiceJVs ObjCVarvwSL_PostedInvoiceJVs = new CVarvwSL_PostedInvoiceJVs();
                        ObjCVarvwSL_PostedInvoiceJVs.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mJVDate = Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mTotalDebit = Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        lstCVarvwSL_PostedInvoiceJVs.Add(ObjCVarvwSL_PostedInvoiceJVs);
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
            lstCVarvwSL_PostedInvoiceJVs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_PostedInvoiceJVs";
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
                        CVarvwSL_PostedInvoiceJVs ObjCVarvwSL_PostedInvoiceJVs = new CVarvwSL_PostedInvoiceJVs();
                        ObjCVarvwSL_PostedInvoiceJVs.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mJVDate = Convert.ToDateTime(dr["JVDate"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mTotalDebit = Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mRemarksHeader = Convert.ToString(dr["RemarksHeader"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwSL_PostedInvoiceJVs.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_PostedInvoiceJVs.Add(ObjCVarvwSL_PostedInvoiceJVs);
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
