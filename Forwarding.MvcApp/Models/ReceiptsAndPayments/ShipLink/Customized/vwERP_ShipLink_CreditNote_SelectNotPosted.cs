using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Shipping.MvcApp.Models.ShipLink.Transactions.Generated
{
    [Serializable]
    public class CPKvwERP_ShipLink_CreditNote_SelectNotPosted
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
    public partial class CVarvwERP_ShipLink_CreditNote_SelectNotPosted : CPKvwERP_ShipLink_CreditNote_SelectNotPosted
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Boolean mIsPosted;
        internal DateTime mIssueDate;
        internal Int64 mInvoiceSerial;
        internal Decimal mAmount;
        internal String mCurrencyCode;
        internal String mInvTypeName;
        internal String mBillNumber;
        internal String mCont_Desc;
        internal String mClientName;
        internal String mVesselName;
        internal Int32 mInvoiceTypeID;
        internal Int64 mJVID1;
        internal Int32 mSafeID;
        internal String mSafeName;
        internal Boolean mIsAudited;
        internal DateTime mPaymentDate;
        internal DateTime mCreditNoteDate;
        internal String mCreditSer;
        internal Int32 mCreditNote_JVID;
        internal Int64 mInvoiceHeaderID;
        #endregion

        #region "Methods"
        public Boolean IsPosted
        {
            get { return mIsPosted; }
            set { mIsPosted = value; }
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
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public Int64 JVID1
        {
            get { return mJVID1; }
            set { mJVID1 = value; }
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
        public Boolean IsAudited
        {
            get { return mIsAudited; }
            set { mIsAudited = value; }
        }
        public DateTime PaymentDate
        {
            get { return mPaymentDate; }
            set { mPaymentDate = value; }
        }
        public DateTime CreditNoteDate
        {
            get { return mCreditNoteDate; }
            set { mCreditNoteDate = value; }
        }
        public String CreditSer
        {
            get { return mCreditSer; }
            set { mCreditSer = value; }
        }
        public Int32 CreditNote_JVID
        {
            get { return mCreditNote_JVID; }
            set { mCreditNote_JVID = value; }
        }
        public Int64 InvoiceHeaderID
        {
            get { return mInvoiceHeaderID; }
            set { mInvoiceHeaderID = value; }
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

    public partial class CvwERP_ShipLink_CreditNote_SelectNotPosted
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
        public List<CVarvwERP_ShipLink_CreditNote_SelectNotPosted> lstCVarvwERP_ShipLink_CreditNote_SelectNotPosted = new List<CVarvwERP_ShipLink_CreditNote_SelectNotPosted>();
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
            lstCVarvwERP_ShipLink_CreditNote_SelectNotPosted.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwERP_ShipLink_CreditNote_SelectNotPosted";
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
                        CVarvwERP_ShipLink_CreditNote_SelectNotPosted ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted = new CVarvwERP_ShipLink_CreditNote_SelectNotPosted();
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mInvTypeName = Convert.ToString(dr["InvTypeName"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCont_Desc = Convert.ToString(dr["Cont_Desc"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mSafeName = Convert.ToString(dr["SafeName"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mIsAudited = Convert.ToBoolean(dr["IsAudited"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCreditNoteDate = Convert.ToDateTime(dr["CreditNoteDate"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCreditSer = Convert.ToString(dr["CreditSer"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCreditNote_JVID = Convert.ToInt32(dr["CreditNote_JVID"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mInvoiceHeaderID = Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        lstCVarvwERP_ShipLink_CreditNote_SelectNotPosted.Add(ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted);
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
            lstCVarvwERP_ShipLink_CreditNote_SelectNotPosted.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwERP_ShipLink_CreditNote_SelectNotPosted";
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
                        CVarvwERP_ShipLink_CreditNote_SelectNotPosted ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted = new CVarvwERP_ShipLink_CreditNote_SelectNotPosted();
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mInvTypeName = Convert.ToString(dr["InvTypeName"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCont_Desc = Convert.ToString(dr["Cont_Desc"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mSafeName = Convert.ToString(dr["SafeName"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mIsAudited = Convert.ToBoolean(dr["IsAudited"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCreditNoteDate = Convert.ToDateTime(dr["CreditNoteDate"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCreditSer = Convert.ToString(dr["CreditSer"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mCreditNote_JVID = Convert.ToInt32(dr["CreditNote_JVID"].ToString());
                        ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted.mInvoiceHeaderID = Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwERP_ShipLink_CreditNote_SelectNotPosted.Add(ObjCVarvwERP_ShipLink_CreditNote_SelectNotPosted);
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
