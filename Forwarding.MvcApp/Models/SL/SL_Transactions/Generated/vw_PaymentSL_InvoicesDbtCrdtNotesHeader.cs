using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Controllers.SL.API_SL_Transactions
{
    [Serializable]
    public class CPKvw_PaymentSL_InvoicesDbtCrdtNotesHeader
    {
        #region "variables"
        private Decimal mID;
        #endregion

        #region "Methods"
        public Decimal ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader : CPKvw_PaymentSL_InvoicesDbtCrdtNotesHeader
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mSerial;
        internal DateTime mDbtCrdtNoteDate;
        internal Int64 mClientID;
        internal String mClientName;
        internal Decimal mTotalAmount;
        internal Boolean mIsApproved;
        internal Int64 mJVID;
        internal Int32 mCurrencyID;
        internal String mCurrency;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal Int32 mDisbursementJob_ID;
        internal Int64 mInvoiceID;
        internal Decimal mQty;
        internal String mInvoiceNo;
        internal Boolean mIsDbt;

        #endregion

        #region "Methods"
        public String Serial
        {
            get { return mSerial; }
            set { mSerial = value; }
        }
        public DateTime DbtCrdtNoteDate
        {
            get { return mDbtCrdtNoteDate; }
            set { mDbtCrdtNoteDate = value; }
        }
        public Int64 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public Decimal TotalAmount
        {
            get { return mTotalAmount; }
            set { mTotalAmount = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public Int64 JVID
        {
            get { return mJVID; }
            set { mJVID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String Currency
        {
            get { return mCurrency; }
            set { mCurrency = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mPaidAmount = value; }
        }
        public Decimal RemainAmount
        {
            get { return mRemainAmount; }
            set { mRemainAmount = value; }
        }
        public Int32 DisbursementJob_ID
        {
            get { return mDisbursementJob_ID; }
            set { mDisbursementJob_ID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public String InvoiceNo
        {
            get { return mInvoiceNo; }
            set { mInvoiceNo = value; }
        }
        public Boolean IsDbt
        {
            get { return mIsDbt; }
            set { mIsDbt = value; }
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

    public partial class Cvw_PaymentSL_InvoicesDbtCrdtNotesHeader
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
        public List<CVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader> lstCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader = new List<CVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader>();
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
            lstCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvw_PaymentSL_InvoicesDbtCrdtNotesHeader";
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
                        CVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader = new CVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader();
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mSerial = Convert.ToString(dr["Serial"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mDbtCrdtNoteDate = Convert.ToDateTime(dr["DbtCrdtNoteDate"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mTotalAmount = Convert.ToDecimal(dr["TotalAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mCurrency = Convert.ToString(dr["Currency"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mIsDbt = Convert.ToBoolean(dr["IsDbt"].ToString());
                        lstCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.Add(ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader);
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
            lstCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvw_PaymentSL_InvoicesDbtCrdtNotesHeader";
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
                        CVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader = new CVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader();
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mSerial = Convert.ToString(dr["Serial"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mDbtCrdtNoteDate = Convert.ToDateTime(dr["DbtCrdtNoteDate"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mTotalAmount = Convert.ToDecimal(dr["TotalAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mCurrency = Convert.ToString(dr["Currency"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.mIsDbt = Convert.ToBoolean(dr["IsDbt"].ToString());

                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader.Add(ObjCVarvw_PaymentSL_InvoicesDbtCrdtNotesHeader);
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