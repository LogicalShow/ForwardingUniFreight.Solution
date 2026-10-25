using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.OperAcc.Generated
{
    [Serializable]
    public class CPKvwAccInvoicePaymentDetails
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
    public partial class CVarvwAccInvoicePaymentDetails : CPKvwAccInvoicePaymentDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mSerial;
        internal String mInvoicePaymentNumber;
        internal Int64 mInvoiceID;
        internal String mConcatenatedInvoiceNumber;
        internal Int64 mPaymentID;
        internal String mPaymentCode;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal String mNotes;
        internal Boolean mIsCancelled;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int64 Serial
        {
            get { return mSerial; }
            set { mSerial = value; }
        }
        public String InvoicePaymentNumber
        {
            get { return mInvoicePaymentNumber; }
            set { mInvoicePaymentNumber = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mInvoiceID = value; }
        }
        public String ConcatenatedInvoiceNumber
        {
            get { return mConcatenatedInvoiceNumber; }
            set { mConcatenatedInvoiceNumber = value; }
        }
        public Int64 PaymentID
        {
            get { return mPaymentID; }
            set { mPaymentID = value; }
        }
        public String PaymentCode
        {
            get { return mPaymentCode; }
            set { mPaymentCode = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
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
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsCancelled
        {
            get { return mIsCancelled; }
            set { mIsCancelled = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
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

    public partial class CvwAccInvoicePaymentDetails
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
        public List<CVarvwAccInvoicePaymentDetails> lstCVarvwAccInvoicePaymentDetails = new List<CVarvwAccInvoicePaymentDetails>();
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
            lstCVarvwAccInvoicePaymentDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwAccInvoicePaymentDetails";
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
                        CVarvwAccInvoicePaymentDetails ObjCVarvwAccInvoicePaymentDetails = new CVarvwAccInvoicePaymentDetails();
                        ObjCVarvwAccInvoicePaymentDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mInvoicePaymentNumber = Convert.ToString(dr["InvoicePaymentNumber"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mIsCancelled = Convert.ToBoolean(dr["IsCancelled"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarvwAccInvoicePaymentDetails.Add(ObjCVarvwAccInvoicePaymentDetails);
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
            lstCVarvwAccInvoicePaymentDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAccInvoicePaymentDetails";
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
                        CVarvwAccInvoicePaymentDetails ObjCVarvwAccInvoicePaymentDetails = new CVarvwAccInvoicePaymentDetails();
                        ObjCVarvwAccInvoicePaymentDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mInvoicePaymentNumber = Convert.ToString(dr["InvoicePaymentNumber"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mConcatenatedInvoiceNumber = Convert.ToString(dr["ConcatenatedInvoiceNumber"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mIsCancelled = Convert.ToBoolean(dr["IsCancelled"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccInvoicePaymentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAccInvoicePaymentDetails.Add(ObjCVarvwAccInvoicePaymentDetails);
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
