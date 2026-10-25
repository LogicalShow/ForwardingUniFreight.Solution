using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKvwPS_ClientDbtCrdtNotes
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
    public partial class CVarvwPS_ClientDbtCrdtNotes : CPKvwPS_ClientDbtCrdtNotes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal DateTime mDbtCrdtNoteDate;
        internal String mSerial;
        internal Boolean mIsDbt;
        internal Boolean mIsApproved;
        internal String mNotes;
        internal Int64 mInvoiceID;
        internal String mJobNumber;
        internal String mInvoiceNo;
        internal Int32 mSupplierID;
        internal Int32 mCostCenterID;
        internal Int32 mDisbursementJob_ID;
        internal Int64 mJVID;
        internal String mClientName;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal String mJVNo;
        internal Int32 mBankID;
        internal Decimal mTotalPrice;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal DateTime mDueDate;
        internal Decimal mTaxAmount;
        internal Decimal mTotalAfterTax;
        internal Boolean misDiscount;
        internal Decimal mDiscount;
        internal Int32 mDiscountPercentege;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public DateTime DbtCrdtNoteDate
        {
            get { return mDbtCrdtNoteDate; }
            set { mDbtCrdtNoteDate = value; }
        }
        public String Serial
        {
            get { return mSerial; }
            set { mSerial = value; }
        }
        public Boolean IsDbt
        {
            get { return mIsDbt; }
            set { mIsDbt = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        public String JobNumber
        {
            get { return mJobNumber; }
            set { mJobNumber = value; }
        }
        public String InvoiceNo
        {
            get { return mInvoiceNo; }
            set { mInvoiceNo = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mSupplierID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public Int32 DisbursementJob_ID
        {
            get { return mDisbursementJob_ID; }
            set { mDisbursementJob_ID = value; }
        }
        public Int64 JVID
        {
            get { return mJVID; }
            set { mJVID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
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
        public String JVNo
        {
            get { return mJVNo; }
            set { mJVNo = value; }
        }
        public Int32 BankID
        {
            get { return mBankID; }
            set { mBankID = value; }
        }
        public Decimal TotalPrice
        {
            get { return mTotalPrice; }
            set { mTotalPrice = value; }
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
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mDueDate = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mTaxAmount = value; }
        }
        public Decimal TotalAfterTax
        {
            get { return mTotalAfterTax; }
            set { mTotalAfterTax = value; }
        }
        public Boolean isDiscount
        {
            get { return misDiscount; }
            set { misDiscount = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mDiscount = value; }
        }
        public Int32 DiscountPercentege
        {
            get { return mDiscountPercentege; }
            set { mDiscountPercentege = value; }
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

    public partial class CvwPS_ClientDbtCrdtNotes
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
        public List<CVarvwPS_ClientDbtCrdtNotes> lstCVarvwPS_ClientDbtCrdtNotes = new List<CVarvwPS_ClientDbtCrdtNotes>();
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
            lstCVarvwPS_ClientDbtCrdtNotes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPS_ClientDbtCrdtNotes";
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
                        CVarvwPS_ClientDbtCrdtNotes ObjCVarvwPS_ClientDbtCrdtNotes = new CVarvwPS_ClientDbtCrdtNotes();
                        ObjCVarvwPS_ClientDbtCrdtNotes.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDbtCrdtNoteDate = Convert.ToDateTime(dr["DbtCrdtNoteDate"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mSerial = Convert.ToString(dr["Serial"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mIsDbt = Convert.ToBoolean(dr["IsDbt"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mJobNumber = Convert.ToString(dr["JobNumber"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.misDiscount = Convert.ToBoolean(dr["isDiscount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDiscountPercentege = Convert.ToInt32(dr["DiscountPercentege"].ToString());
                        lstCVarvwPS_ClientDbtCrdtNotes.Add(ObjCVarvwPS_ClientDbtCrdtNotes);
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
            lstCVarvwPS_ClientDbtCrdtNotes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPS_ClientDbtCrdtNotes";
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
                        CVarvwPS_ClientDbtCrdtNotes ObjCVarvwPS_ClientDbtCrdtNotes = new CVarvwPS_ClientDbtCrdtNotes();
                        ObjCVarvwPS_ClientDbtCrdtNotes.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDbtCrdtNoteDate = Convert.ToDateTime(dr["DbtCrdtNoteDate"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mSerial = Convert.ToString(dr["Serial"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mIsDbt = Convert.ToBoolean(dr["IsDbt"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mJobNumber = Convert.ToString(dr["JobNumber"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mJVNo = Convert.ToString(dr["JVNo"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.misDiscount = Convert.ToBoolean(dr["isDiscount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwPS_ClientDbtCrdtNotes.mDiscountPercentege = Convert.ToInt32(dr["DiscountPercentege"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPS_ClientDbtCrdtNotes.Add(ObjCVarvwPS_ClientDbtCrdtNotes);
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
