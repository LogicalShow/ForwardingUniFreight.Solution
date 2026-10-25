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
    public partial class CVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs
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
        internal Boolean mIsAudited;
        internal Boolean mIsPaid;
        internal String mRemarks;
        internal String mBillNumber;
        internal String mVesselName;
        internal String mJobNo;
        internal Int32 mCostCenterID;
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
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        public String BillNumber
        {
            get { return mBillNumber; }
            set { mBillNumber = value; }
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
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        #endregion
    }

    public partial class CvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs
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
        public List<CVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs> lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs = new List<CVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs>();
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
            lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs";
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
                        CVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs = new CVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs();
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mVoyageID = Convert.ToInt64(dr["VoyageID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mIsAudited = Convert.ToBoolean(dr["IsAudited"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mIsPaid = Convert.ToBoolean(dr["IsPaid"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mJobNo = Convert.ToString(dr["JobNo"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Add(ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs);
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
            lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs";
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
                        CVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs = new CVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs();
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mBillID = Convert.ToInt64(dr["BillID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mVoyageID = Convert.ToInt64(dr["VoyageID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mInvoiceSerial = Convert.ToInt64(dr["InvoiceSerial"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mIsAudited = Convert.ToBoolean(dr["IsAudited"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mIsPaid = Convert.ToBoolean(dr["IsPaid"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mBillNumber = Convert.ToString(dr["BillNumber"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mJobNo = Convert.ToString(dr["JobNo"].ToString());
                        ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs.Add(ObjCVarvwSL_InvoiceHeader_SelectNotPostedJV1By_InvIDs);
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
