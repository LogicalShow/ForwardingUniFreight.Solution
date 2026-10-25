using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.CRM.Generated
{
    [Serializable]
    public partial class CVarvwCRM_SalesReport
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal String mCode;
        internal Int32 mBLType;
        internal String mTransportTypeName;
        internal String mIncotermName;
        internal String mPOLCode;
        internal String mPOLName;
        internal String mPODCode;
        internal String mPODName;
        internal DateTime mOpenDate;
        internal String mClientName;
        internal Decimal mPayables;
        internal Decimal mReceivables;
        internal Int32 mSalesmanID;
        internal Int32 mTargetTypeID;
        internal Decimal mFixedAmount;
        internal Decimal mPercentage;
        internal String mSalesmanName;
        internal Int32 mOperation_Count;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 BLType
        {
            get { return mBLType; }
            set { mBLType = value; }
        }
        public String TransportTypeName
        {
            get { return mTransportTypeName; }
            set { mTransportTypeName = value; }
        }
        public String IncotermName
        {
            get { return mIncotermName; }
            set { mIncotermName = value; }
        }
        public String POLCode
        {
            get { return mPOLCode; }
            set { mPOLCode = value; }
        }
        public String POLName
        {
            get { return mPOLName; }
            set { mPOLName = value; }
        }
        public String PODCode
        {
            get { return mPODCode; }
            set { mPODCode = value; }
        }
        public String PODName
        {
            get { return mPODName; }
            set { mPODName = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public Decimal Payables
        {
            get { return mPayables; }
            set { mPayables = value; }
        }
        public Decimal Receivables
        {
            get { return mReceivables; }
            set { mReceivables = value; }
        }
        public Int32 SalesmanID
        {
            get { return mSalesmanID; }
            set { mSalesmanID = value; }
        }
        public Int32 TargetTypeID
        {
            get { return mTargetTypeID; }
            set { mTargetTypeID = value; }
        }
        public Decimal FixedAmount
        {
            get { return mFixedAmount; }
            set { mFixedAmount = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
        }
        public String SalesmanName
        {
            get { return mSalesmanName; }
            set { mSalesmanName = value; }
        }
        public Int32 Operation_Count
        {
            get { return mOperation_Count; }
            set { mOperation_Count = value; }
        }
        #endregion
    }

    public partial class CvwCRM_SalesReport
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
        public List<CVarvwCRM_SalesReport> lstCVarvwCRM_SalesReport = new List<CVarvwCRM_SalesReport>();
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
            lstCVarvwCRM_SalesReport.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCRM_SalesReport";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwCRM_SalesReport ObjCVarvwCRM_SalesReport = new CVarvwCRM_SalesReport();
                        ObjCVarvwCRM_SalesReport.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwCRM_SalesReport.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwCRM_SalesReport.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwCRM_SalesReport.mTransportTypeName = Convert.ToString(dr["TransportTypeName"].ToString());
                        ObjCVarvwCRM_SalesReport.mIncotermName = Convert.ToString(dr["IncotermName"].ToString());
                        ObjCVarvwCRM_SalesReport.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwCRM_SalesReport.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwCRM_SalesReport.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwCRM_SalesReport.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwCRM_SalesReport.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwCRM_SalesReport.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwCRM_SalesReport.mPayables = Convert.ToDecimal(dr["Payables"].ToString());
                        ObjCVarvwCRM_SalesReport.mReceivables = Convert.ToDecimal(dr["Receivables"].ToString());
                        ObjCVarvwCRM_SalesReport.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwCRM_SalesReport.mTargetTypeID = Convert.ToInt32(dr["TargetTypeID"].ToString());
                        ObjCVarvwCRM_SalesReport.mFixedAmount = Convert.ToDecimal(dr["FixedAmount"].ToString());
                        ObjCVarvwCRM_SalesReport.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwCRM_SalesReport.mSalesmanName = Convert.ToString(dr["SalesmanName"].ToString());
                        ObjCVarvwCRM_SalesReport.mOperation_Count = Convert.ToInt32(dr["Operation_Count"].ToString());
                        lstCVarvwCRM_SalesReport.Add(ObjCVarvwCRM_SalesReport);
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
            lstCVarvwCRM_SalesReport.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCRM_SalesReport";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwCRM_SalesReport ObjCVarvwCRM_SalesReport = new CVarvwCRM_SalesReport();
                        ObjCVarvwCRM_SalesReport.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwCRM_SalesReport.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwCRM_SalesReport.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        ObjCVarvwCRM_SalesReport.mTransportTypeName = Convert.ToString(dr["TransportTypeName"].ToString());
                        ObjCVarvwCRM_SalesReport.mIncotermName = Convert.ToString(dr["IncotermName"].ToString());
                        ObjCVarvwCRM_SalesReport.mPOLCode = Convert.ToString(dr["POLCode"].ToString());
                        ObjCVarvwCRM_SalesReport.mPOLName = Convert.ToString(dr["POLName"].ToString());
                        ObjCVarvwCRM_SalesReport.mPODCode = Convert.ToString(dr["PODCode"].ToString());
                        ObjCVarvwCRM_SalesReport.mPODName = Convert.ToString(dr["PODName"].ToString());
                        ObjCVarvwCRM_SalesReport.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarvwCRM_SalesReport.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwCRM_SalesReport.mPayables = Convert.ToDecimal(dr["Payables"].ToString());
                        ObjCVarvwCRM_SalesReport.mReceivables = Convert.ToDecimal(dr["Receivables"].ToString());
                        ObjCVarvwCRM_SalesReport.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwCRM_SalesReport.mTargetTypeID = Convert.ToInt32(dr["TargetTypeID"].ToString());
                        ObjCVarvwCRM_SalesReport.mFixedAmount = Convert.ToDecimal(dr["FixedAmount"].ToString());
                        ObjCVarvwCRM_SalesReport.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwCRM_SalesReport.mSalesmanName = Convert.ToString(dr["SalesmanName"].ToString());
                        ObjCVarvwCRM_SalesReport.mOperation_Count = Convert.ToInt32(dr["Operation_Count"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCRM_SalesReport.Add(ObjCVarvwCRM_SalesReport);
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
