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
    public partial class CVarvwSL_InvoiceHeader_SelectNotPostedForPayment
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Boolean mIsPosted;
        internal Int64 mID;
        internal DateTime mIssueDate;
        internal Int64 mInvoiceSerial;
        internal Decimal mAmount;
        internal String mCurrencyCode;
        internal String mInvTypeName;
        internal String mBillNumber;
        internal String mCont_Desc;
        internal String mClientName;
        internal String mVesselName;
        internal String mJobNo;
        internal Int32 mJournalTypeID;
        internal Int32 mJVTypeID;
        internal Int32 mInvoiceTypeID;
        internal Int32 mJVID1;
        internal Int32 mJVID2;
        internal Int32 mSafeID;
        internal String mSafeName;
        internal Int32 mIsAudited;
        internal DateTime mPaymentDate;
        internal String mVoyageNumber;
        #endregion

        #region "Methods"
        public Boolean IsPosted
        {
            get { return mIsPosted; }
            set { mIsPosted = value; }
        }
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIssueDate = value; }
        }
        public Int64 InvoiceSerial
        {
            get { return mInvoiceSerial; }
            set { mInvoiceSerial = value; }
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
        public String InvTypeName
        {
            get { return mInvTypeName; }
            set { mInvTypeName = value; }
        }
        public String BillNumber
        {
            get { return mBillNumber; }
            set { mBillNumber = value; }
        }
        public String Cont_Desc
        {
            get { return mCont_Desc; }
            set { mCont_Desc = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public String VesselName
        {
            get { return mVesselName; }
            set { mVesselName = value; }
        }
        public String JobNo
        {
            get { return mJobNo; }
            set { mJobNo = value; }
        }
        public Int32 JournalTypeID
        {
            get { return mJournalTypeID; }
            set { mJournalTypeID = value; }
        }
        public Int32 JVTypeID
        {
            get { return mJVTypeID; }
            set { mJVTypeID = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public Int32 JVID1
        {
            get { return mJVID1; }
            set { mJVID1 = value; }
        }
        public Int32 JVID2
        {
            get { return mJVID2; }
            set { mJVID2 = value; }
        }
        public Int32 SafeID
        {
            get { return mSafeID; }
            set { mSafeID = value; }
        }
        public String SafeName
        {
            get { return mSafeName; }
            set { mSafeName = value; }
        }
        public Int32 IsAudited
        {
            get { return mIsAudited; }
            set { mIsAudited = value; }
        }
        public DateTime PaymentDate
        {
            get { return mPaymentDate; }
            set { mPaymentDate = value; }
        }
        public String VoyageNumber
        {
            get { return mVoyageNumber; }
            set { mVoyageNumber = value; }
        }
        #endregion
    }

    public partial class CvwSL_InvoiceHeader_SelectNotPostedForPayment
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
        public List<CVarvwSL_InvoiceHeader_SelectNotPostedForPayment> lstCVarvwSL_InvoiceHeader_SelectNotPostedForPayment = new List<CVarvwSL_InvoiceHeader_SelectNotPostedForPayment>();
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
            lstCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_InvoiceHeader_SelectNotPostedForPayment";
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
                        CVarvwSL_InvoiceHeader_SelectNotPostedForPayment ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment = new CVarvwSL_InvoiceHeader_SelectNotPostedForPayment();
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mInvTypeName = Convert.ToString(dr["InvTypeName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mCont_Desc = Convert.ToString(dr["Cont_Desc"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJobNo = Convert.ToString(dr["JobNo"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJournalTypeID = Convert.ToInt32(dr["JournalTypeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJVTypeID = Convert.ToInt32(dr["JVTypeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJVID1 = Convert.ToInt32(dr["JVID1"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJVID2 = Convert.ToInt32(dr["JVID2"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mSafeName = Convert.ToString(dr["SafeName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mIsAudited = Convert.ToInt32(dr["IsAudited"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mVoyageNumber = Convert.ToString(dr["VoyageNumber"].ToString());
                        lstCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.Add(ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment);
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
            lstCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_InvoiceHeader_SelectNotPostedForPayment";
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
                        CVarvwSL_InvoiceHeader_SelectNotPostedForPayment ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment = new CVarvwSL_InvoiceHeader_SelectNotPostedForPayment();
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mInvTypeName = Convert.ToString(dr["InvTypeName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mCont_Desc = Convert.ToString(dr["Cont_Desc"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJobNo = Convert.ToString(dr["JobNo"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJournalTypeID = Convert.ToInt32(dr["JournalTypeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJVTypeID = Convert.ToInt32(dr["JVTypeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJVID1 = Convert.ToInt32(dr["JVID1"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mJVID2 = Convert.ToInt32(dr["JVID2"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mSafeName = Convert.ToString(dr["SafeName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mIsAudited = Convert.ToInt32(dr["IsAudited"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.mVoyageNumber = Convert.ToString(dr["VoyageNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_InvoiceHeader_SelectNotPostedForPayment.Add(ObjCVarvwSL_InvoiceHeader_SelectNotPostedForPayment);
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
