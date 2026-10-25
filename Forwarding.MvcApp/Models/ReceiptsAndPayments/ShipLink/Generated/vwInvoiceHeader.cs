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
    public partial class CVarvwInvoiceHeader
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int32 mInvoiceTypeID;
        internal Int64 mBillID;
        internal Int64 mVoyageID;
        internal Int64 mClientID;
        internal String mClientName;
        internal DateTime mIssueDate;
        internal Int64 mInvoiceSerial;
        internal Boolean mIsMaster;
        internal Boolean mIsAudited;
        internal Boolean mIsPaid;
        internal Boolean mIsDeleted;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Int32 mDemStrTariffID;
        internal Int32 mSecurityUserID;
        internal String mRemarks;
        internal Int32 mUpdateUserID;
        internal DateTime mUpdateDate;
        internal Boolean mIsResumption;
        internal Boolean mIsPrinted;
        internal Int32 mPortID;
        internal Decimal mDiscount;
        internal Int32 mPortRatio;
        internal Decimal mImoRatio;
        internal DateTime mPrintDate;
        internal Int32 mInvoiceTemplateID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public Int64 BillID
        {
            get { return mBillID; }
            set { mBillID = value; }
        }
        public Int64 VoyageID
        {
            get { return mVoyageID; }
            set { mVoyageID = value; }
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
        public Boolean IsMaster
        {
            get { return mIsMaster; }
            set { mIsMaster = value; }
        }
        public Boolean IsAudited
        {
            get { return mIsAudited; }
            set { mIsAudited = value; }
        }
        public Boolean IsPaid
        {
            get { return mIsPaid; }
            set { mIsPaid = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mToDate = value; }
        }
        public Int32 DemStrTariffID
        {
            get { return mDemStrTariffID; }
            set { mDemStrTariffID = value; }
        }
        public Int32 SecurityUserID
        {
            get { return mSecurityUserID; }
            set { mSecurityUserID = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        public Int32 UpdateUserID
        {
            get { return mUpdateUserID; }
            set { mUpdateUserID = value; }
        }
        public DateTime UpdateDate
        {
            get { return mUpdateDate; }
            set { mUpdateDate = value; }
        }
        public Boolean IsResumption
        {
            get { return mIsResumption; }
            set { mIsResumption = value; }
        }
        public Boolean IsPrinted
        {
            get { return mIsPrinted; }
            set { mIsPrinted = value; }
        }
        public Int32 PortID
        {
            get { return mPortID; }
            set { mPortID = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mDiscount = value; }
        }
        public Int32 PortRatio
        {
            get { return mPortRatio; }
            set { mPortRatio = value; }
        }
        public Decimal ImoRatio
        {
            get { return mImoRatio; }
            set { mImoRatio = value; }
        }
        public DateTime PrintDate
        {
            get { return mPrintDate; }
            set { mPrintDate = value; }
        }
        public Int32 InvoiceTemplateID
        {
            get { return mInvoiceTemplateID; }
            set { mInvoiceTemplateID = value; }
        }
        #endregion
    }

    public partial class CvwInvoiceHeader
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
        public List<CVarvwInvoiceHeader> lstCVarvwInvoiceHeader = new List<CVarvwInvoiceHeader>();
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
            lstCVarvwInvoiceHeader.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwInvoiceHeader";
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
                        CVarvwInvoiceHeader ObjCVarvwInvoiceHeader = new CVarvwInvoiceHeader();
                        ObjCVarvwInvoiceHeader.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInvoiceHeader.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwInvoiceHeader.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarvwInvoiceHeader.mVoyageID = Convert.ToInt64(dr["VoyageID"].ToString());
                        ObjCVarvwInvoiceHeader.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvwInvoiceHeader.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwInvoiceHeader.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwInvoiceHeader.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwInvoiceHeader.mIsMaster = Convert.ToBoolean(dr["IsMaster"].ToString());
                        ObjCVarvwInvoiceHeader.mIsAudited = Convert.ToBoolean(dr["IsAudited"].ToString());
                        ObjCVarvwInvoiceHeader.mIsPaid = Convert.ToBoolean(dr["IsPaid"].ToString());
                        ObjCVarvwInvoiceHeader.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwInvoiceHeader.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwInvoiceHeader.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwInvoiceHeader.mDemStrTariffID = Convert.ToInt32(dr["DemStrTariffID"].ToString());
                        ObjCVarvwInvoiceHeader.mSecurityUserID = Convert.ToInt32(dr["SecurityUserID"].ToString());
                        ObjCVarvwInvoiceHeader.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwInvoiceHeader.mUpdateUserID = Convert.ToInt32(dr["UpdateUserID"].ToString());
                        ObjCVarvwInvoiceHeader.mUpdateDate = Convert.ToDateTime(dr["UpdateDate"].ToString());
                        ObjCVarvwInvoiceHeader.mIsResumption = Convert.ToBoolean(dr["IsResumption"].ToString());
                        ObjCVarvwInvoiceHeader.mIsPrinted = Convert.ToBoolean(dr["IsPrinted"].ToString());
                        ObjCVarvwInvoiceHeader.mPortID = Convert.ToInt32(dr["PortID"].ToString());
                        ObjCVarvwInvoiceHeader.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwInvoiceHeader.mPortRatio = Convert.ToInt32(dr["PortRatio"].ToString());
                        ObjCVarvwInvoiceHeader.mImoRatio = Convert.ToDecimal(dr["ImoRatio"].ToString());
                        ObjCVarvwInvoiceHeader.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        ObjCVarvwInvoiceHeader.mInvoiceTemplateID = Convert.ToInt32(dr["InvoiceTemplateID"].ToString());
                        lstCVarvwInvoiceHeader.Add(ObjCVarvwInvoiceHeader);
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
            lstCVarvwInvoiceHeader.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwInvoiceHeader";
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
                        CVarvwInvoiceHeader ObjCVarvwInvoiceHeader = new CVarvwInvoiceHeader();
                        ObjCVarvwInvoiceHeader.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwInvoiceHeader.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwInvoiceHeader.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarvwInvoiceHeader.mVoyageID = Convert.ToInt64(dr["VoyageID"].ToString());
                        ObjCVarvwInvoiceHeader.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvwInvoiceHeader.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwInvoiceHeader.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwInvoiceHeader.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwInvoiceHeader.mIsMaster = Convert.ToBoolean(dr["IsMaster"].ToString());
                        ObjCVarvwInvoiceHeader.mIsAudited = Convert.ToBoolean(dr["IsAudited"].ToString());
                        ObjCVarvwInvoiceHeader.mIsPaid = Convert.ToBoolean(dr["IsPaid"].ToString());
                        ObjCVarvwInvoiceHeader.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwInvoiceHeader.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwInvoiceHeader.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwInvoiceHeader.mDemStrTariffID = Convert.ToInt32(dr["DemStrTariffID"].ToString());
                        ObjCVarvwInvoiceHeader.mSecurityUserID = Convert.ToInt32(dr["SecurityUserID"].ToString());
                        ObjCVarvwInvoiceHeader.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwInvoiceHeader.mUpdateUserID = Convert.ToInt32(dr["UpdateUserID"].ToString());
                        ObjCVarvwInvoiceHeader.mUpdateDate = Convert.ToDateTime(dr["UpdateDate"].ToString());
                        ObjCVarvwInvoiceHeader.mIsResumption = Convert.ToBoolean(dr["IsResumption"].ToString());
                        ObjCVarvwInvoiceHeader.mIsPrinted = Convert.ToBoolean(dr["IsPrinted"].ToString());
                        ObjCVarvwInvoiceHeader.mPortID = Convert.ToInt32(dr["PortID"].ToString());
                        ObjCVarvwInvoiceHeader.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarvwInvoiceHeader.mPortRatio = Convert.ToInt32(dr["PortRatio"].ToString());
                        ObjCVarvwInvoiceHeader.mImoRatio = Convert.ToDecimal(dr["ImoRatio"].ToString());
                        ObjCVarvwInvoiceHeader.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        ObjCVarvwInvoiceHeader.mInvoiceTemplateID = Convert.ToInt32(dr["InvoiceTemplateID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwInvoiceHeader.Add(ObjCVarvwInvoiceHeader);
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
