using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.DisbursementLink.Generated
{
    [Serializable]
    public class CPKDAS_vwDisbursementJobs
    {
        #region "variables"
        private Int32 mDisbursementJob_ID;
        #endregion

        #region "Methods"
        public Int32 DisbursementJob_ID
        {
            get { return mDisbursementJob_ID; }
            set { mDisbursementJob_ID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarDAS_vwDisbursementJobs : CPKDAS_vwDisbursementJobs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Boolean mIsSelected;
        internal Int64 mEstimation_ID;
        internal String mJobNumber;
        internal String mJobType;
        internal DateTime mIssueDate;
        internal String mInquiryNumber;
        internal DateTime mInquiryDate;
        internal Int64 mOwnerID;
        internal String mOwnerName;
        internal Int64 mCharterID;
        internal String mCharterName;
        internal Int32 mCargoOperatorID;
        internal String mCargoOperatorName;
        internal Int64 mNominatoreID;
        internal String mNominatoreName;
        internal Boolean mIsClosed;
        internal Int32 mETA_Port_ID;
        internal Boolean mIsNB;
        internal Int32 mVessel_ID;
        internal String mVessel_Name;
        internal DateTime mTransitDate;
        internal DateTime mETADate;
        internal Decimal mTransitSCAEstimationAmount;
        internal String mRebateFileNo;
        internal Decimal mRebatePercentage;
        internal Int32 mRebateNumber;
        internal String mRebateStatus;
        internal Decimal mEstimationClientID;
        internal String mEstimationClient;
        internal String mJobStatus;
        internal Decimal mJobRemittance;
        internal DateTime mJobRemittanceLastDate;
        internal Decimal mJobFDAAmount;
        internal Int64 mLocalAgentID;
        internal String mLocalAgentName;
        internal Boolean mIsRemittanceToLocalAgent;
        internal Boolean mIsLoaded;
        internal DateTime mATA;
        internal DateTime mATD;
        internal Decimal mJobSDRRate;
        internal String mPrintedClientName;
        internal Decimal mPrintedClientID;
        internal Boolean mIsFDAsClosed;
        internal DateTime mBerthingDate;
        internal String mJobRemarks;
        internal Boolean mIsLiner;
        internal String mCO;
        internal String mVoyageNumber;
        internal String mETA_PortName;
        internal String mInquiryStatus;
        internal String mCargoType;
        internal String mVesselType;
        #endregion

        #region "Methods"
        public Boolean IsSelected
        {
            get { return mIsSelected; }
            set { mIsSelected = value; }
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
        public String JobType
        {
            get { return mJobType; }
            set { mJobType = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIssueDate = value; }
        }
        public String InquiryNumber
        {
            get { return mInquiryNumber; }
            set { mInquiryNumber = value; }
        }
        public DateTime InquiryDate
        {
            get { return mInquiryDate; }
            set { mInquiryDate = value; }
        }
        public Int64 OwnerID
        {
            get { return mOwnerID; }
            set { mOwnerID = value; }
        }
        public String OwnerName
        {
            get { return mOwnerName; }
            set { mOwnerName = value; }
        }
        public Int64 CharterID
        {
            get { return mCharterID; }
            set { mCharterID = value; }
        }
        public String CharterName
        {
            get { return mCharterName; }
            set { mCharterName = value; }
        }
        public Int32 CargoOperatorID
        {
            get { return mCargoOperatorID; }
            set { mCargoOperatorID = value; }
        }
        public String CargoOperatorName
        {
            get { return mCargoOperatorName; }
            set { mCargoOperatorName = value; }
        }
        public Int64 NominatoreID
        {
            get { return mNominatoreID; }
            set { mNominatoreID = value; }
        }
        public String NominatoreName
        {
            get { return mNominatoreName; }
            set { mNominatoreName = value; }
        }
        public Boolean IsClosed
        {
            get { return mIsClosed; }
            set { mIsClosed = value; }
        }
        public Int32 ETA_Port_ID
        {
            get { return mETA_Port_ID; }
            set { mETA_Port_ID = value; }
        }
        public Boolean IsNB
        {
            get { return mIsNB; }
            set { mIsNB = value; }
        }
        public Int32 Vessel_ID
        {
            get { return mVessel_ID; }
            set { mVessel_ID = value; }
        }
        public String Vessel_Name
        {
            get { return mVessel_Name; }
            set { mVessel_Name = value; }
        }
        public DateTime TransitDate
        {
            get { return mTransitDate; }
            set { mTransitDate = value; }
        }
        public DateTime ETADate
        {
            get { return mETADate; }
            set { mETADate = value; }
        }
        public Decimal TransitSCAEstimationAmount
        {
            get { return mTransitSCAEstimationAmount; }
            set { mTransitSCAEstimationAmount = value; }
        }
        public String RebateFileNo
        {
            get { return mRebateFileNo; }
            set { mRebateFileNo = value; }
        }
        public Decimal RebatePercentage
        {
            get { return mRebatePercentage; }
            set { mRebatePercentage = value; }
        }
        public Int32 RebateNumber
        {
            get { return mRebateNumber; }
            set { mRebateNumber = value; }
        }
        public String RebateStatus
        {
            get { return mRebateStatus; }
            set { mRebateStatus = value; }
        }
        public Decimal EstimationClientID
        {
            get { return mEstimationClientID; }
            set { mEstimationClientID = value; }
        }
        public String EstimationClient
        {
            get { return mEstimationClient; }
            set { mEstimationClient = value; }
        }
        public String JobStatus
        {
            get { return mJobStatus; }
            set { mJobStatus = value; }
        }
        public Decimal JobRemittance
        {
            get { return mJobRemittance; }
            set { mJobRemittance = value; }
        }
        public DateTime JobRemittanceLastDate
        {
            get { return mJobRemittanceLastDate; }
            set { mJobRemittanceLastDate = value; }
        }
        public Decimal JobFDAAmount
        {
            get { return mJobFDAAmount; }
            set { mJobFDAAmount = value; }
        }
        public Int64 LocalAgentID
        {
            get { return mLocalAgentID; }
            set { mLocalAgentID = value; }
        }
        public String LocalAgentName
        {
            get { return mLocalAgentName; }
            set { mLocalAgentName = value; }
        }
        public Boolean IsRemittanceToLocalAgent
        {
            get { return mIsRemittanceToLocalAgent; }
            set { mIsRemittanceToLocalAgent = value; }
        }
        public Boolean IsLoaded
        {
            get { return mIsLoaded; }
            set { mIsLoaded = value; }
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
        public Decimal JobSDRRate
        {
            get { return mJobSDRRate; }
            set { mJobSDRRate = value; }
        }
        public String PrintedClientName
        {
            get { return mPrintedClientName; }
            set { mPrintedClientName = value; }
        }
        public Decimal PrintedClientID
        {
            get { return mPrintedClientID; }
            set { mPrintedClientID = value; }
        }
        public Boolean IsFDAsClosed
        {
            get { return mIsFDAsClosed; }
            set { mIsFDAsClosed = value; }
        }
        public DateTime BerthingDate
        {
            get { return mBerthingDate; }
            set { mBerthingDate = value; }
        }
        public String JobRemarks
        {
            get { return mJobRemarks; }
            set { mJobRemarks = value; }
        }
        public Boolean IsLiner
        {
            get { return mIsLiner; }
            set { mIsLiner = value; }
        }
        public String CO
        {
            get { return mCO; }
            set { mCO = value; }
        }
        public String VoyageNumber
        {
            get { return mVoyageNumber; }
            set { mVoyageNumber = value; }
        }
        public String ETA_PortName
        {
            get { return mETA_PortName; }
            set { mETA_PortName = value; }
        }
        public String InquiryStatus
        {
            get { return mInquiryStatus; }
            set { mInquiryStatus = value; }
        }
        public String CargoType
        {
            get { return mCargoType; }
            set { mCargoType = value; }
        }
        public String VesselType
        {
            get { return mVesselType; }
            set { mVesselType = value; }
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

    public partial class CDAS_vwDisbursementJobs
    {
        #region "variables"
        /*If "App.Config" isnot exist add it to your Application
		Add this code after <Configuration> tag
		-------------------------------------------------------
		<appsettings>
		<add key="DisbursementConnectionString" value="............"/>
		</appsettings>
		-------------------------------------------------------
		where ".........." is connection string to database server*/
        private SqlTransaction tr;
        public List<CVarDAS_vwDisbursementJobs> lstCVarDAS_vwDisbursementJobs = new List<CVarDAS_vwDisbursementJobs>();
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
        public Exception GetListPagingJobsCbo(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy)
        {
            return DataFillJobCbo(PageSize, PageNumber, WhereClause, OrderBy);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarDAS_vwDisbursementJobs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].DAS_vwDisbursementJobs_GetList";
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
                        CVarDAS_vwDisbursementJobs ObjCVarDAS_vwDisbursementJobs = new CVarDAS_vwDisbursementJobs();
                        ObjCVarDAS_vwDisbursementJobs.mIsSelected = Convert.ToBoolean(dr["IsSelected"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.DisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mEstimation_ID = Convert.ToInt64(dr["Estimation_ID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mJobNumber = Convert.ToString(dr["JobNumber"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mJobType = Convert.ToString(dr["JobType"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mInquiryNumber = Convert.ToString(dr["InquiryNumber"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mInquiryDate = Convert.ToDateTime(dr["InquiryDate"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mOwnerID = Convert.ToInt64(dr["OwnerID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCharterID = Convert.ToInt64(dr["CharterID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCharterName = Convert.ToString(dr["CharterName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCargoOperatorID = Convert.ToInt32(dr["CargoOperatorID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCargoOperatorName = Convert.ToString(dr["CargoOperatorName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mNominatoreID = Convert.ToInt64(dr["NominatoreID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mNominatoreName = Convert.ToString(dr["NominatoreName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mETA_Port_ID = Convert.ToInt32(dr["ETA_Port_ID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsNB = Convert.ToBoolean(dr["IsNB"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mVessel_ID = Convert.ToInt32(dr["Vessel_ID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mVessel_Name = Convert.ToString(dr["Vessel_Name"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mTransitDate = Convert.ToDateTime(dr["TransitDate"].ToString());
                        if (dr["TransitDate"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mTransitDate = Convert.ToDateTime(dr["TransitDate"].ToString());
                        }
                        ObjCVarDAS_vwDisbursementJobs.mETADate = Convert.ToDateTime(dr["ETADate"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mTransitSCAEstimationAmount = Convert.ToDecimal(dr["TransitSCAEstimationAmount"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mRebateFileNo = Convert.ToString(dr["RebateFileNo"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mRebatePercentage = Convert.ToDecimal(dr["RebatePercentage"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mRebateNumber = Convert.ToInt32(dr["RebateNumber"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mRebateStatus = Convert.ToString(dr["RebateStatus"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mEstimationClientID = Convert.ToDecimal(dr["EstimationClientID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mEstimationClient = Convert.ToString(dr["EstimationClient"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mJobStatus = Convert.ToString(dr["JobStatus"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mJobRemittance = Convert.ToDecimal(dr["JobRemittance"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mJobRemittanceLastDate = Convert.ToDateTime(dr["JobRemittanceLastDate"].ToString());
                        if (dr["JobRemittanceLastDate"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mJobRemittanceLastDate = Convert.ToDateTime(dr["JobRemittanceLastDate"].ToString());
                        }
                        ObjCVarDAS_vwDisbursementJobs.mJobFDAAmount = Convert.ToDecimal(dr["JobFDAAmount"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mLocalAgentID = Convert.ToInt64(dr["LocalAgentID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mLocalAgentName = Convert.ToString(dr["LocalAgentName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsRemittanceToLocalAgent = Convert.ToBoolean(dr["IsRemittanceToLocalAgent"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mATA = Convert.ToDateTime(dr["ATA"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mATD = Convert.ToDateTime(dr["ATD"].ToString());
                        if (dr["ATA"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mATA = Convert.ToDateTime(dr["ATA"].ToString());
                        }
                        if (dr["ATD"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mATD = Convert.ToDateTime(dr["ATD"].ToString());
                        }
                        ObjCVarDAS_vwDisbursementJobs.mJobSDRRate = Convert.ToDecimal(dr["JobSDRRate"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mPrintedClientName = Convert.ToString(dr["PrintedClientName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mPrintedClientID = Convert.ToDecimal(dr["PrintedClientID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsFDAsClosed = Convert.ToBoolean(dr["IsFDAsClosed"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mBerthingDate = Convert.ToDateTime(dr["BerthingDate"].ToString());
                        if (dr["BerthingDate"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mBerthingDate = Convert.ToDateTime(dr["BerthingDate"].ToString());
                        }
                        ObjCVarDAS_vwDisbursementJobs.mJobRemarks = Convert.ToString(dr["JobRemarks"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsLiner = Convert.ToBoolean(dr["IsLiner"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCO = Convert.ToString(dr["CO"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mVoyageNumber = Convert.ToString(dr["VoyageNumber"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mETA_PortName = Convert.ToString(dr["ETA_PortName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mInquiryStatus = Convert.ToString(dr["InquiryStatus"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCargoType = Convert.ToString(dr["CargoType"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mVesselType = Convert.ToString(dr["VesselType"].ToString());
                        lstCVarDAS_vwDisbursementJobs.Add(ObjCVarDAS_vwDisbursementJobs);
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
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarDAS_vwDisbursementJobs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingDAS_vwDisbursementJobs";
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
                        CVarDAS_vwDisbursementJobs ObjCVarDAS_vwDisbursementJobs = new CVarDAS_vwDisbursementJobs();
                        ObjCVarDAS_vwDisbursementJobs.mIsSelected = Convert.ToBoolean(dr["IsSelected"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.DisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mEstimation_ID = Convert.ToInt64(dr["Estimation_ID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mJobNumber = Convert.ToString(dr["JobNumber"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mJobType = Convert.ToString(dr["JobType"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mInquiryNumber = Convert.ToString(dr["InquiryNumber"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mInquiryDate = Convert.ToDateTime(dr["InquiryDate"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mOwnerID = Convert.ToInt64(dr["OwnerID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCharterID = Convert.ToInt64(dr["CharterID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCharterName = Convert.ToString(dr["CharterName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCargoOperatorID = Convert.ToInt32(dr["CargoOperatorID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCargoOperatorName = Convert.ToString(dr["CargoOperatorName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mNominatoreID = Convert.ToInt64(dr["NominatoreID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mNominatoreName = Convert.ToString(dr["NominatoreName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mETA_Port_ID = Convert.ToInt32(dr["ETA_Port_ID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsNB = Convert.ToBoolean(dr["IsNB"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mVessel_ID = Convert.ToInt32(dr["Vessel_ID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mVessel_Name = Convert.ToString(dr["Vessel_Name"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mTransitDate = Convert.ToDateTime(dr["TransitDate"].ToString());
                        if (dr["TransitDate"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mTransitDate = Convert.ToDateTime(dr["TransitDate"].ToString());
                        }
                        ObjCVarDAS_vwDisbursementJobs.mETADate = Convert.ToDateTime(dr["ETADate"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mTransitSCAEstimationAmount = Convert.ToDecimal(dr["TransitSCAEstimationAmount"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mRebateFileNo = Convert.ToString(dr["RebateFileNo"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mRebatePercentage = Convert.ToDecimal(dr["RebatePercentage"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mRebateNumber = Convert.ToInt32(dr["RebateNumber"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mRebateStatus = Convert.ToString(dr["RebateStatus"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mEstimationClientID = Convert.ToDecimal(dr["EstimationClientID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mEstimationClient = Convert.ToString(dr["EstimationClient"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mJobStatus = Convert.ToString(dr["JobStatus"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mJobRemittance = Convert.ToDecimal(dr["JobRemittance"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mJobRemittanceLastDate = Convert.ToDateTime(dr["JobRemittanceLastDate"].ToString());
                        if (dr["JobRemittanceLastDate"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mJobRemittanceLastDate = Convert.ToDateTime(dr["JobRemittanceLastDate"].ToString());
                        }
                        ObjCVarDAS_vwDisbursementJobs.mJobFDAAmount = Convert.ToDecimal(dr["JobFDAAmount"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mLocalAgentID = Convert.ToInt64(dr["LocalAgentID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mLocalAgentName = Convert.ToString(dr["LocalAgentName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsRemittanceToLocalAgent = Convert.ToBoolean(dr["IsRemittanceToLocalAgent"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mATA = Convert.ToDateTime(dr["ATA"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mATD = Convert.ToDateTime(dr["ATD"].ToString());
                        if (dr["ATA"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mATA = Convert.ToDateTime(dr["ATA"].ToString());
                        }
                        if (dr["ATD"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mATD = Convert.ToDateTime(dr["ATD"].ToString());
                        }
                        ObjCVarDAS_vwDisbursementJobs.mJobSDRRate = Convert.ToDecimal(dr["JobSDRRate"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mPrintedClientName = Convert.ToString(dr["PrintedClientName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mPrintedClientID = Convert.ToDecimal(dr["PrintedClientID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsFDAsClosed = Convert.ToBoolean(dr["IsFDAsClosed"].ToString());
                        //ObjCVarDAS_vwDisbursementJobs.mBerthingDate = Convert.ToDateTime(dr["BerthingDate"].ToString());
                        if (dr["BerthingDate"] != DBNull.Value)
                        {
                            ObjCVarDAS_vwDisbursementJobs.mBerthingDate = Convert.ToDateTime(dr["BerthingDate"].ToString());
                        }
                        ObjCVarDAS_vwDisbursementJobs.mJobRemarks = Convert.ToString(dr["JobRemarks"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mIsLiner = Convert.ToBoolean(dr["IsLiner"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCO = Convert.ToString(dr["CO"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mVoyageNumber = Convert.ToString(dr["VoyageNumber"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mETA_PortName = Convert.ToString(dr["ETA_PortName"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mInquiryStatus = Convert.ToString(dr["InquiryStatus"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mCargoType = Convert.ToString(dr["CargoType"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mVesselType = Convert.ToString(dr["VesselType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarDAS_vwDisbursementJobs.Add(ObjCVarDAS_vwDisbursementJobs);
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
        private Exception DataFillJobCbo(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarDAS_vwDisbursementJobs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].DAS_GetListPaging_JobsCbo";
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
                        CVarDAS_vwDisbursementJobs ObjCVarDAS_vwDisbursementJobs = new CVarDAS_vwDisbursementJobs();
                        ObjCVarDAS_vwDisbursementJobs.DisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarDAS_vwDisbursementJobs.mJobNumber = Convert.ToString(dr["JobNumber"].ToString());
                        lstCVarDAS_vwDisbursementJobs.Add(ObjCVarDAS_vwDisbursementJobs);
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

        public List<CVarDAS_vwDisbursementJobs> GetListForDebitSearch(string Param)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr=null;
            lstCVarDAS_vwDisbursementJobs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                
               Com.Parameters.Add( new SqlParameter("@WhereClause", SqlDbType.VarChar, 8000));
                
                Com.CommandText="GetListvw_disbursementJobsForDebitSearch";
                Com.Parameters[0].Value = Param;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                while (dr.Read())
                {
                    /*Start DataReader*/
                    CVarDAS_vwDisbursementJobs ObjCVarvw_disbursementJobs = new CVarDAS_vwDisbursementJobs();
                    ObjCVarvw_disbursementJobs.DisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                    ObjCVarvw_disbursementJobs.JobNumber = Convert.ToString(dr["JobNumber"].ToString());
                    lstCVarDAS_vwDisbursementJobs.Add(ObjCVarvw_disbursementJobs);
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (dr != null)
                {
                    dr.Close();
                    dr.Dispose();
                }
            }
            return lstCVarDAS_vwDisbursementJobs;
        }

        public List<CVarDAS_vwDisbursementJobs> GetListForFDASearch(string Param)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr = null;
            lstCVarDAS_vwDisbursementJobs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar, 8000));
                Com.CommandText = "DAS_GetListvw_disbursementJobClientsForFDASearch";
                Com.Parameters[0].Value = Param;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();

                while (dr.Read())
                {
                    /*Start DataReader*/
                    CVarDAS_vwDisbursementJobs ObjCVarvw_disbursementJobs = new CVarDAS_vwDisbursementJobs();
                    ObjCVarvw_disbursementJobs.DisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                    ObjCVarvw_disbursementJobs.JobNumber = Convert.ToString(dr["JobNumber"].ToString());
                    lstCVarDAS_vwDisbursementJobs.Add(ObjCVarvw_disbursementJobs);
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (dr != null)
                {
                    dr.Close();
                    dr.Dispose();
                }
            }
            return lstCVarDAS_vwDisbursementJobs;
        }

        public List<CVarDAS_vwDisbursementJobs> GetListForFDAReports(string Param)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["DisbursementConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr = null;
            lstCVarDAS_vwDisbursementJobs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar, 8000));
                Com.CommandText = "GetListvw_disbursementJobForFDAReports";
                Com.Parameters[0].Value = Param;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();

                while (dr.Read())
                {
                    /*Start DataReader*/
                    CVarDAS_vwDisbursementJobs ObjCVarvw_disbursementJobs = new CVarDAS_vwDisbursementJobs();
                    ObjCVarvw_disbursementJobs.DisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                    ObjCVarvw_disbursementJobs.JobNumber = Convert.ToString(dr["JobNumber"].ToString());
                    lstCVarDAS_vwDisbursementJobs.Add(ObjCVarvw_disbursementJobs);
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (dr != null)
                {
                    dr.Close();
                    dr.Dispose();
                }
            }
            return lstCVarDAS_vwDisbursementJobs;
        }


        #endregion
    }
}
