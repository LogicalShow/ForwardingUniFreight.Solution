using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public partial class CVarvwA_DAS_DisbursementJobs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mDisbursementJob_ID;
        internal Int64 mEstimation_ID;
        internal String mJobNumber;
        internal DateTime mIssueDate;
        internal String mJobType;
        internal Int64 mOwnerID;
        internal Int64 mCharterID;
        internal Int64 mCargoOperatorID;
        internal Int64 mNominatoreID;
        internal Boolean mIsClosed;
        internal Int32 mClosedBy;
        internal DateTime mClosedAt;
        internal DateTime mATA;
        internal DateTime mATD;
        internal DateTime mTransitDate;
        internal Decimal mTransitSCAEstimationAmount;
        internal Int64 mLocalAgentID;
        internal Boolean mIsRemittanceToLocalAgent;
        internal Decimal mJobSDRRate;
        internal Int32 mPrintedClient;
        internal Boolean mIsFDAsClosed;
        internal Int32 mFDAsClosedBy;
        internal DateTime mFDAsClosedAt;
        internal DateTime mBerthingDate;
        internal String mRemarks;
        internal Int32 mCostCenterID;
        internal Int32 mAddedby;
        internal DateTime mAddedAt;
        internal Int32 mUpdatedBy;
        internal DateTime mUpdatedAt;
        internal String mCo;
        internal String mVoyageNumber;
        internal String mVesselName;
        internal Int32 mVessel_ID;
        #endregion

        #region "Methods"
        public Int32 DisbursementJob_ID
        {
            get { return mDisbursementJob_ID; }
            set { mDisbursementJob_ID = value; }
        }
        public Int64 Estimation_ID
        {
            get { return mEstimation_ID; }
            set { mEstimation_ID = value; }
        }
        public String JobNumber
        {
            get { return mJobNumber; }
            set { mJobNumber = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIssueDate = value; }
        }
        public String JobType
        {
            get { return mJobType; }
            set { mJobType = value; }
        }
        public Int64 OwnerID
        {
            get { return mOwnerID; }
            set { mOwnerID = value; }
        }
        public Int64 CharterID
        {
            get { return mCharterID; }
            set { mCharterID = value; }
        }
        public Int64 CargoOperatorID
        {
            get { return mCargoOperatorID; }
            set { mCargoOperatorID = value; }
        }
        public Int64 NominatoreID
        {
            get { return mNominatoreID; }
            set { mNominatoreID = value; }
        }
        public Boolean IsClosed
        {
            get { return mIsClosed; }
            set { mIsClosed = value; }
        }
        public Int32 ClosedBy
        {
            get { return mClosedBy; }
            set { mClosedBy = value; }
        }
        public DateTime ClosedAt
        {
            get { return mClosedAt; }
            set { mClosedAt = value; }
        }
        public DateTime ATA
        {
            get { return mATA; }
            set { mATA = value; }
        }
        public DateTime ATD
        {
            get { return mATD; }
            set { mATD = value; }
        }
        public DateTime TransitDate
        {
            get { return mTransitDate; }
            set { mTransitDate = value; }
        }
        public Decimal TransitSCAEstimationAmount
        {
            get { return mTransitSCAEstimationAmount; }
            set { mTransitSCAEstimationAmount = value; }
        }
        public Int64 LocalAgentID
        {
            get { return mLocalAgentID; }
            set { mLocalAgentID = value; }
        }
        public Boolean IsRemittanceToLocalAgent
        {
            get { return mIsRemittanceToLocalAgent; }
            set { mIsRemittanceToLocalAgent = value; }
        }
        public Decimal JobSDRRate
        {
            get { return mJobSDRRate; }
            set { mJobSDRRate = value; }
        }
        public Int32 PrintedClient
        {
            get { return mPrintedClient; }
            set { mPrintedClient = value; }
        }
        public Boolean IsFDAsClosed
        {
            get { return mIsFDAsClosed; }
            set { mIsFDAsClosed = value; }
        }
        public Int32 FDAsClosedBy
        {
            get { return mFDAsClosedBy; }
            set { mFDAsClosedBy = value; }
        }
        public DateTime FDAsClosedAt
        {
            get { return mFDAsClosedAt; }
            set { mFDAsClosedAt = value; }
        }
        public DateTime BerthingDate
        {
            get { return mBerthingDate; }
            set { mBerthingDate = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public Int32 Addedby
        {
            get { return mAddedby; }
            set { mAddedby = value; }
        }
        public DateTime AddedAt
        {
            get { return mAddedAt; }
            set { mAddedAt = value; }
        }
        public Int32 UpdatedBy
        {
            get { return mUpdatedBy; }
            set { mUpdatedBy = value; }
        }
        public DateTime UpdatedAt
        {
            get { return mUpdatedAt; }
            set { mUpdatedAt = value; }
        }
        public String Co
        {
            get { return mCo; }
            set { mCo = value; }
        }
        public String VoyageNumber
        {
            get { return mVoyageNumber; }
            set { mVoyageNumber = value; }
        }
        public String VesselName
        {
            get { return mVesselName; }
            set { mVesselName = value; }
        }
        public Int32 Vessel_ID
        {
            get { return mVessel_ID; }
            set { mVessel_ID = value; }
        }
        #endregion
    }

    public partial class CvwA_DAS_DisbursementJobs
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
        public List<CVarvwA_DAS_DisbursementJobs> lstCVarvwA_DAS_DisbursementJobs = new List<CVarvwA_DAS_DisbursementJobs>();
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
            lstCVarvwA_DAS_DisbursementJobs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_DAS_DisbursementJobs";
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
                        CVarvwA_DAS_DisbursementJobs ObjCVarvwA_DAS_DisbursementJobs = new CVarvwA_DAS_DisbursementJobs();
                        ObjCVarvwA_DAS_DisbursementJobs.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mEstimation_ID = Convert.ToInt64(dr["Estimation_ID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mJobNumber = Convert.ToString(dr["JobNumber"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mJobType = Convert.ToString(dr["JobType"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mOwnerID = Convert.ToInt64(dr["OwnerID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mCharterID = Convert.ToInt64(dr["CharterID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mCargoOperatorID = Convert.ToInt64(dr["CargoOperatorID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mNominatoreID = Convert.ToInt64(dr["NominatoreID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mClosedBy = Convert.ToInt32(dr["ClosedBy"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mClosedAt = Convert.ToDateTime(dr["ClosedAt"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mATA = Convert.ToDateTime(dr["ATA"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mATD = Convert.ToDateTime(dr["ATD"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mTransitDate = Convert.ToDateTime(dr["TransitDate"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mTransitSCAEstimationAmount = Convert.ToDecimal(dr["TransitSCAEstimationAmount"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mLocalAgentID = Convert.ToInt64(dr["LocalAgentID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mIsRemittanceToLocalAgent = Convert.ToBoolean(dr["IsRemittanceToLocalAgent"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mJobSDRRate = Convert.ToDecimal(dr["JobSDRRate"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mPrintedClient = Convert.ToInt32(dr["PrintedClient"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mIsFDAsClosed = Convert.ToBoolean(dr["IsFDAsClosed"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mFDAsClosedBy = Convert.ToInt32(dr["FDAsClosedBy"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mFDAsClosedAt = Convert.ToDateTime(dr["FDAsClosedAt"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mBerthingDate = Convert.ToDateTime(dr["BerthingDate"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mAddedby = Convert.ToInt32(dr["Addedby"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mAddedAt = Convert.ToDateTime(dr["AddedAt"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mUpdatedBy = Convert.ToInt32(dr["UpdatedBy"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mUpdatedAt = Convert.ToDateTime(dr["UpdatedAt"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mCo = Convert.ToString(dr["Co"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mVoyageNumber = Convert.ToString(dr["VoyageNumber"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mVessel_ID = Convert.ToInt32(dr["Vessel_ID"].ToString());
                        lstCVarvwA_DAS_DisbursementJobs.Add(ObjCVarvwA_DAS_DisbursementJobs);
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
            lstCVarvwA_DAS_DisbursementJobs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_DAS_DisbursementJobs";
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
                        CVarvwA_DAS_DisbursementJobs ObjCVarvwA_DAS_DisbursementJobs = new CVarvwA_DAS_DisbursementJobs();
                        ObjCVarvwA_DAS_DisbursementJobs.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mEstimation_ID = Convert.ToInt64(dr["Estimation_ID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mJobNumber = Convert.ToString(dr["JobNumber"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mJobType = Convert.ToString(dr["JobType"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mOwnerID = Convert.ToInt64(dr["OwnerID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mCharterID = Convert.ToInt64(dr["CharterID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mCargoOperatorID = Convert.ToInt64(dr["CargoOperatorID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mNominatoreID = Convert.ToInt64(dr["NominatoreID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mClosedBy = Convert.ToInt32(dr["ClosedBy"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mClosedAt = Convert.ToDateTime(dr["ClosedAt"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mATA = Convert.ToDateTime(dr["ATA"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mATD = Convert.ToDateTime(dr["ATD"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mTransitDate = Convert.ToDateTime(dr["TransitDate"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mTransitSCAEstimationAmount = Convert.ToDecimal(dr["TransitSCAEstimationAmount"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mLocalAgentID = Convert.ToInt64(dr["LocalAgentID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mIsRemittanceToLocalAgent = Convert.ToBoolean(dr["IsRemittanceToLocalAgent"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mJobSDRRate = Convert.ToDecimal(dr["JobSDRRate"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mPrintedClient = Convert.ToInt32(dr["PrintedClient"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mIsFDAsClosed = Convert.ToBoolean(dr["IsFDAsClosed"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mFDAsClosedBy = Convert.ToInt32(dr["FDAsClosedBy"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mFDAsClosedAt = Convert.ToDateTime(dr["FDAsClosedAt"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mBerthingDate = Convert.ToDateTime(dr["BerthingDate"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mAddedby = Convert.ToInt32(dr["Addedby"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mAddedAt = Convert.ToDateTime(dr["AddedAt"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mUpdatedBy = Convert.ToInt32(dr["UpdatedBy"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mUpdatedAt = Convert.ToDateTime(dr["UpdatedAt"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mCo = Convert.ToString(dr["Co"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mVoyageNumber = Convert.ToString(dr["VoyageNumber"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mVesselName = Convert.ToString(dr["VesselName"].ToString());
                        ObjCVarvwA_DAS_DisbursementJobs.mVessel_ID = Convert.ToInt32(dr["Vessel_ID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_DAS_DisbursementJobs.Add(ObjCVarvwA_DAS_DisbursementJobs);
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
