using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CRM.CRM_Reports.Customized
{
    [Serializable]
    public class CPKvwCRM_SalesMenTargetReport
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwCRM_SalesMenTargetReport : CPKvwCRM_SalesMenTargetReport
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mClientID;
        internal String mClientName;
        internal String mCLientLocalName;
        internal Int32 mClientCode;
        internal Int32 mClientStatus;
        internal DateTime mSourceDate;
        internal String mSourceDescription;
        internal String mUsername;
        internal Int32 mFollowUpID;
        internal DateTime mCreationDate;
        internal DateTime mActionDate;
        internal String mActionName;
        internal Int32 mActionID;
        internal Int32 mSourceID;
        internal String mSourceName;
        internal Int32 mSalesRepID;
        internal String mSalesRepName;
        internal Int32 mTargetDetailsID;
        internal Int32 mTargetCount_OnPeriod;
        internal Int32 mActualTotalTarget;
        #endregion

        #region "Methods"
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public String CLientLocalName
        {
            get { return mCLientLocalName; }
            set { mCLientLocalName = value; }
        }
        public Int32 ClientCode
        {
            get { return mClientCode; }
            set { mClientCode = value; }
        }
        public Int32 ClientStatus
        {
            get { return mClientStatus; }
            set { mClientStatus = value; }
        }
        public DateTime SourceDate
        {
            get { return mSourceDate; }
            set { mSourceDate = value; }
        }
        public String SourceDescription
        {
            get { return mSourceDescription; }
            set { mSourceDescription = value; }
        }
        public String Username
        {
            get { return mUsername; }
            set { mUsername = value; }
        }
        public Int32 FollowUpID
        {
            get { return mFollowUpID; }
            set { mFollowUpID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public DateTime ActionDate
        {
            get { return mActionDate; }
            set { mActionDate = value; }
        }
        public String ActionName
        {
            get { return mActionName; }
            set { mActionName = value; }
        }
        public Int32 ActionID
        {
            get { return mActionID; }
            set { mActionID = value; }
        }
        public Int32 SourceID
        {
            get { return mSourceID; }
            set { mSourceID = value; }
        }
        public String SourceName
        {
            get { return mSourceName; }
            set { mSourceName = value; }
        }
        public Int32 SalesRepID
        {
            get { return mSalesRepID; }
            set { mSalesRepID = value; }
        }
        public String SalesRepName
        {
            get { return mSalesRepName; }
            set { mSalesRepName = value; }
        }
        public Int32 TargetDetailsID
        {
            get { return mTargetDetailsID; }
            set { mTargetDetailsID = value; }
        }
        public Int32 TargetCount_OnPeriod
        {
            get { return mTargetCount_OnPeriod; }
            set { mTargetCount_OnPeriod = value; }
        }
        public Int32 ActualTotalTarget
        {
            get { return mActualTotalTarget; }
            set { mActualTotalTarget = value; }
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

    public partial class CvwCRM_SalesMenTargetReport
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
        public List<CVarvwCRM_SalesMenTargetReport> lstCVarvwCRM_SalesMenTargetReport = new List<CVarvwCRM_SalesMenTargetReport>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime FromDate , DateTime ToDate , string WhereClause )
        {
            return DataFill(FromDate , ToDate , WhereClause, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(DateTime FromDate, DateTime ToDate , string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwCRM_SalesMenTargetReport.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    //@FromDate DATETIME, @ToDate DATETIME , @WhereClause NVarChar(MAX)
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].[GetvwCRM_SalesMenTargetReport]";
                    Com.Parameters[0].Value = FromDate;
                    Com.Parameters[1].Value = ToDate;
                    Com.Parameters[2].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwCRM_SalesMenTargetReport ObjCVarvwCRM_SalesMenTargetReport = new CVarvwCRM_SalesMenTargetReport();
                        ObjCVarvwCRM_SalesMenTargetReport.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mCLientLocalName = Convert.ToString(dr["CLientLocalName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mClientCode = Convert.ToInt32(dr["ClientCode"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mClientStatus = Convert.ToInt32(dr["ClientStatus"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSourceDate = Convert.ToDateTime(dr["SourceDate"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSourceDescription = Convert.ToString(dr["SourceDescription"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mFollowUpID = Convert.ToInt32(dr["FollowUpID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mActionName = Convert.ToString(dr["ActionName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mActionID = Convert.ToInt32(dr["ActionID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSourceID = Convert.ToInt32(dr["SourceID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSourceName = Convert.ToString(dr["SourceName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSalesRepID = Convert.ToInt32(dr["SalesRepID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSalesRepName = Convert.ToString(dr["SalesRepName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mTargetDetailsID = Convert.ToInt32(dr["TargetDetailsID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mTargetCount_OnPeriod = Convert.ToInt32(dr["TargetCount_OnPeriod"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mActualTotalTarget = Convert.ToInt32(dr["ActualTotalTarget"].ToString());
                        lstCVarvwCRM_SalesMenTargetReport.Add(ObjCVarvwCRM_SalesMenTargetReport);
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
            lstCVarvwCRM_SalesMenTargetReport.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCRM_SalesMenTargetReport";
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
                        CVarvwCRM_SalesMenTargetReport ObjCVarvwCRM_SalesMenTargetReport = new CVarvwCRM_SalesMenTargetReport();
                        ObjCVarvwCRM_SalesMenTargetReport.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mCLientLocalName = Convert.ToString(dr["CLientLocalName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mClientCode = Convert.ToInt32(dr["ClientCode"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mClientStatus = Convert.ToInt32(dr["ClientStatus"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSourceDate = Convert.ToDateTime(dr["SourceDate"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSourceDescription = Convert.ToString(dr["SourceDescription"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mFollowUpID = Convert.ToInt32(dr["FollowUpID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mActionName = Convert.ToString(dr["ActionName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mActionID = Convert.ToInt32(dr["ActionID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSourceID = Convert.ToInt32(dr["SourceID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSourceName = Convert.ToString(dr["SourceName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSalesRepID = Convert.ToInt32(dr["SalesRepID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mSalesRepName = Convert.ToString(dr["SalesRepName"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mTargetDetailsID = Convert.ToInt32(dr["TargetDetailsID"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mTargetCount_OnPeriod = Convert.ToInt32(dr["TargetCount_OnPeriod"].ToString());
                        ObjCVarvwCRM_SalesMenTargetReport.mActualTotalTarget = Convert.ToInt32(dr["ActualTotalTarget"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCRM_SalesMenTargetReport.Add(ObjCVarvwCRM_SalesMenTargetReport);
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
