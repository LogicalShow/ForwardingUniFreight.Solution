using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKvwOperationEmailSent
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
    public partial class CVarvwOperationEmailSent : CPKvwOperationEmailSent
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mDepartmentID;
        internal String mDepartmentEmail;
        internal Int64 mOperationID;
        internal Boolean mIsOpenDate;
        internal String mOpenDate;
        internal String mCurrentOpenDate;
        internal Boolean mIsCloseDate;
        internal String mCloseDate;
        internal String mCurrentCloseDate;
        internal Boolean mIsCutOffDate;
        internal String mCutOffDate;
        internal String mCurrentCutOffDate;
        internal Boolean mIsPODate;
        internal String mPODate;
        internal String mCurrentPODate;
        internal Boolean mIsReleaseDate;
        internal String mReleaseDate;
        internal String mCurrentReleaseDate;
        internal Boolean mIsETAPOLDate;
        internal String mETAPOLDate;
        internal String mCurrentETAPOLDate;
        internal Boolean mIsATAPOLDate;
        internal String mATAPOLDate;
        internal String mCurrentATAPOLDate;
        internal Boolean mIsExpectedDeparture;
        internal String mExpectedDeparture;
        internal String mCurrentExpectedDeparture;
        internal Boolean mIsActualDeparture;
        internal String mActualDeparture;
        internal String mCurrentActualDeparture;
        internal Boolean mIsExpectedArrival;
        internal String mExpectedArrival;
        internal String mCurrentExpectedArrival;
        internal Boolean mIsActualArrival;
        internal String mActualArrival;
        internal String mCurrentActualArrival;
        internal Boolean mIsGateInDate;
        internal String mGateInDate;
        internal String mCurrentGateInDate;
        internal Boolean mIsGateOutDate;
        internal String mGateOutDate;
        internal String mCurrentGateOutDate;
        internal Boolean mIsStuffingDate;
        internal String mStuffingDate;
        internal String mCurrentStuffingDate;
        internal Boolean mIsDeliveryDate;
        internal String mDeliveryDate;
        internal String mCurrentDeliveryDate;
        internal Boolean mIsCertificateDate;
        internal String mCertificateDate;
        internal String mCurrentCertificateDate;
        internal Boolean mIsQasimaDate;
        internal String mQasimaDate;
        internal String mCurrentQasimaDate;
        #endregion

        #region "Methods"
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public String DepartmentEmail
        {
            get { return mDepartmentEmail; }
            set { mDepartmentEmail = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Boolean IsOpenDate
        {
            get { return mIsOpenDate; }
            set { mIsOpenDate = value; }
        }
        public String OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
        }
        public String CurrentOpenDate
        {
            get { return mCurrentOpenDate; }
            set { mCurrentOpenDate = value; }
        }
        public Boolean IsCloseDate
        {
            get { return mIsCloseDate; }
            set { mIsCloseDate = value; }
        }
        public String CloseDate
        {
            get { return mCloseDate; }
            set { mCloseDate = value; }
        }
        public String CurrentCloseDate
        {
            get { return mCurrentCloseDate; }
            set { mCurrentCloseDate = value; }
        }
        public Boolean IsCutOffDate
        {
            get { return mIsCutOffDate; }
            set { mIsCutOffDate = value; }
        }
        public String CutOffDate
        {
            get { return mCutOffDate; }
            set { mCutOffDate = value; }
        }
        public String CurrentCutOffDate
        {
            get { return mCurrentCutOffDate; }
            set { mCurrentCutOffDate = value; }
        }
        public Boolean IsPODate
        {
            get { return mIsPODate; }
            set { mIsPODate = value; }
        }
        public String PODate
        {
            get { return mPODate; }
            set { mPODate = value; }
        }
        public String CurrentPODate
        {
            get { return mCurrentPODate; }
            set { mCurrentPODate = value; }
        }
        public Boolean IsReleaseDate
        {
            get { return mIsReleaseDate; }
            set { mIsReleaseDate = value; }
        }
        public String ReleaseDate
        {
            get { return mReleaseDate; }
            set { mReleaseDate = value; }
        }
        public String CurrentReleaseDate
        {
            get { return mCurrentReleaseDate; }
            set { mCurrentReleaseDate = value; }
        }
        public Boolean IsETAPOLDate
        {
            get { return mIsETAPOLDate; }
            set { mIsETAPOLDate = value; }
        }
        public String ETAPOLDate
        {
            get { return mETAPOLDate; }
            set { mETAPOLDate = value; }
        }
        public String CurrentETAPOLDate
        {
            get { return mCurrentETAPOLDate; }
            set { mCurrentETAPOLDate = value; }
        }
        public Boolean IsATAPOLDate
        {
            get { return mIsATAPOLDate; }
            set { mIsATAPOLDate = value; }
        }
        public String ATAPOLDate
        {
            get { return mATAPOLDate; }
            set { mATAPOLDate = value; }
        }
        public String CurrentATAPOLDate
        {
            get { return mCurrentATAPOLDate; }
            set { mCurrentATAPOLDate = value; }
        }
        public Boolean IsExpectedDeparture
        {
            get { return mIsExpectedDeparture; }
            set { mIsExpectedDeparture = value; }
        }
        public String ExpectedDeparture
        {
            get { return mExpectedDeparture; }
            set { mExpectedDeparture = value; }
        }
        public String CurrentExpectedDeparture
        {
            get { return mCurrentExpectedDeparture; }
            set { mCurrentExpectedDeparture = value; }
        }
        public Boolean IsActualDeparture
        {
            get { return mIsActualDeparture; }
            set { mIsActualDeparture = value; }
        }
        public String ActualDeparture
        {
            get { return mActualDeparture; }
            set { mActualDeparture = value; }
        }
        public String CurrentActualDeparture
        {
            get { return mCurrentActualDeparture; }
            set { mCurrentActualDeparture = value; }
        }
        public Boolean IsExpectedArrival
        {
            get { return mIsExpectedArrival; }
            set { mIsExpectedArrival = value; }
        }
        public String ExpectedArrival
        {
            get { return mExpectedArrival; }
            set { mExpectedArrival = value; }
        }
        public String CurrentExpectedArrival
        {
            get { return mCurrentExpectedArrival; }
            set { mCurrentExpectedArrival = value; }
        }
        public Boolean IsActualArrival
        {
            get { return mIsActualArrival; }
            set { mIsActualArrival = value; }
        }
        public String ActualArrival
        {
            get { return mActualArrival; }
            set { mActualArrival = value; }
        }
        public String CurrentActualArrival
        {
            get { return mCurrentActualArrival; }
            set { mCurrentActualArrival = value; }
        }
        public Boolean IsGateInDate
        {
            get { return mIsGateInDate; }
            set { mIsGateInDate = value; }
        }
        public String GateInDate
        {
            get { return mGateInDate; }
            set { mGateInDate = value; }
        }
        public String CurrentGateInDate
        {
            get { return mCurrentGateInDate; }
            set { mCurrentGateInDate = value; }
        }
        public Boolean IsGateOutDate
        {
            get { return mIsGateOutDate; }
            set { mIsGateOutDate = value; }
        }
        public String GateOutDate
        {
            get { return mGateOutDate; }
            set { mGateOutDate = value; }
        }
        public String CurrentGateOutDate
        {
            get { return mCurrentGateOutDate; }
            set { mCurrentGateOutDate = value; }
        }
        public Boolean IsStuffingDate
        {
            get { return mIsStuffingDate; }
            set { mIsStuffingDate = value; }
        }
        public String StuffingDate
        {
            get { return mStuffingDate; }
            set { mStuffingDate = value; }
        }
        public String CurrentStuffingDate
        {
            get { return mCurrentStuffingDate; }
            set { mCurrentStuffingDate = value; }
        }
        public Boolean IsDeliveryDate
        {
            get { return mIsDeliveryDate; }
            set { mIsDeliveryDate = value; }
        }
        public String DeliveryDate
        {
            get { return mDeliveryDate; }
            set { mDeliveryDate = value; }
        }
        public String CurrentDeliveryDate
        {
            get { return mCurrentDeliveryDate; }
            set { mCurrentDeliveryDate = value; }
        }
        public Boolean IsCertificateDate
        {
            get { return mIsCertificateDate; }
            set { mIsCertificateDate = value; }
        }
        public String CertificateDate
        {
            get { return mCertificateDate; }
            set { mCertificateDate = value; }
        }
        public String CurrentCertificateDate
        {
            get { return mCurrentCertificateDate; }
            set { mCurrentCertificateDate = value; }
        }
        public Boolean IsQasimaDate
        {
            get { return mIsQasimaDate; }
            set { mIsQasimaDate = value; }
        }
        public String QasimaDate
        {
            get { return mQasimaDate; }
            set { mQasimaDate = value; }
        }
        public String CurrentQasimaDate
        {
            get { return mCurrentQasimaDate; }
            set { mCurrentQasimaDate = value; }
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

    public partial class CvwOperationEmailSent
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
        public List<CVarvwOperationEmailSent> lstCVarvwOperationEmailSent = new List<CVarvwOperationEmailSent>();
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
            lstCVarvwOperationEmailSent.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwOperationEmailSent";
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
                        CVarvwOperationEmailSent ObjCVarvwOperationEmailSent = new CVarvwOperationEmailSent();
                        ObjCVarvwOperationEmailSent.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationEmailSent.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwOperationEmailSent.mDepartmentEmail = Convert.ToString(dr["DepartmentEmail"].ToString());
                        ObjCVarvwOperationEmailSent.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwOperationEmailSent.mIsOpenDate = Convert.ToBoolean(dr["IsOpenDate"].ToString());
                        ObjCVarvwOperationEmailSent.mOpenDate = Convert.ToString(dr["OpenDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentOpenDate = Convert.ToString(dr["CurrentOpenDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsCloseDate = Convert.ToBoolean(dr["IsCloseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCloseDate = Convert.ToString(dr["CloseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentCloseDate = Convert.ToString(dr["CurrentCloseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsCutOffDate = Convert.ToBoolean(dr["IsCutOffDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCutOffDate = Convert.ToString(dr["CutOffDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentCutOffDate = Convert.ToString(dr["CurrentCutOffDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsPODate = Convert.ToBoolean(dr["IsPODate"].ToString());
                        ObjCVarvwOperationEmailSent.mPODate = Convert.ToString(dr["PODate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentPODate = Convert.ToString(dr["CurrentPODate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsReleaseDate = Convert.ToBoolean(dr["IsReleaseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mReleaseDate = Convert.ToString(dr["ReleaseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentReleaseDate = Convert.ToString(dr["CurrentReleaseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsETAPOLDate = Convert.ToBoolean(dr["IsETAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mETAPOLDate = Convert.ToString(dr["ETAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentETAPOLDate = Convert.ToString(dr["CurrentETAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsATAPOLDate = Convert.ToBoolean(dr["IsATAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mATAPOLDate = Convert.ToString(dr["ATAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentATAPOLDate = Convert.ToString(dr["CurrentATAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsExpectedDeparture = Convert.ToBoolean(dr["IsExpectedDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mExpectedDeparture = Convert.ToString(dr["ExpectedDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentExpectedDeparture = Convert.ToString(dr["CurrentExpectedDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mIsActualDeparture = Convert.ToBoolean(dr["IsActualDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mActualDeparture = Convert.ToString(dr["ActualDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentActualDeparture = Convert.ToString(dr["CurrentActualDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mIsExpectedArrival = Convert.ToBoolean(dr["IsExpectedArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mExpectedArrival = Convert.ToString(dr["ExpectedArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentExpectedArrival = Convert.ToString(dr["CurrentExpectedArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mIsActualArrival = Convert.ToBoolean(dr["IsActualArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mActualArrival = Convert.ToString(dr["ActualArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentActualArrival = Convert.ToString(dr["CurrentActualArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mIsGateInDate = Convert.ToBoolean(dr["IsGateInDate"].ToString());
                        ObjCVarvwOperationEmailSent.mGateInDate = Convert.ToString(dr["GateInDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentGateInDate = Convert.ToString(dr["CurrentGateInDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsGateOutDate = Convert.ToBoolean(dr["IsGateOutDate"].ToString());
                        ObjCVarvwOperationEmailSent.mGateOutDate = Convert.ToString(dr["GateOutDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentGateOutDate = Convert.ToString(dr["CurrentGateOutDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsStuffingDate = Convert.ToBoolean(dr["IsStuffingDate"].ToString());
                        ObjCVarvwOperationEmailSent.mStuffingDate = Convert.ToString(dr["StuffingDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentStuffingDate = Convert.ToString(dr["CurrentStuffingDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsDeliveryDate = Convert.ToBoolean(dr["IsDeliveryDate"].ToString());
                        ObjCVarvwOperationEmailSent.mDeliveryDate = Convert.ToString(dr["DeliveryDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentDeliveryDate = Convert.ToString(dr["CurrentDeliveryDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsCertificateDate = Convert.ToBoolean(dr["IsCertificateDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCertificateDate = Convert.ToString(dr["CertificateDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentCertificateDate = Convert.ToString(dr["CurrentCertificateDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsQasimaDate = Convert.ToBoolean(dr["IsQasimaDate"].ToString());
                        ObjCVarvwOperationEmailSent.mQasimaDate = Convert.ToString(dr["QasimaDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentQasimaDate = Convert.ToString(dr["CurrentQasimaDate"].ToString());
                        lstCVarvwOperationEmailSent.Add(ObjCVarvwOperationEmailSent);
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
            lstCVarvwOperationEmailSent.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwOperationEmailSent";
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
                        CVarvwOperationEmailSent ObjCVarvwOperationEmailSent = new CVarvwOperationEmailSent();
                        ObjCVarvwOperationEmailSent.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationEmailSent.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwOperationEmailSent.mDepartmentEmail = Convert.ToString(dr["DepartmentEmail"].ToString());
                        ObjCVarvwOperationEmailSent.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwOperationEmailSent.mIsOpenDate = Convert.ToBoolean(dr["IsOpenDate"].ToString());
                        ObjCVarvwOperationEmailSent.mOpenDate = Convert.ToString(dr["OpenDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentOpenDate = Convert.ToString(dr["CurrentOpenDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsCloseDate = Convert.ToBoolean(dr["IsCloseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCloseDate = Convert.ToString(dr["CloseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentCloseDate = Convert.ToString(dr["CurrentCloseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsCutOffDate = Convert.ToBoolean(dr["IsCutOffDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCutOffDate = Convert.ToString(dr["CutOffDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentCutOffDate = Convert.ToString(dr["CurrentCutOffDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsPODate = Convert.ToBoolean(dr["IsPODate"].ToString());
                        ObjCVarvwOperationEmailSent.mPODate = Convert.ToString(dr["PODate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentPODate = Convert.ToString(dr["CurrentPODate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsReleaseDate = Convert.ToBoolean(dr["IsReleaseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mReleaseDate = Convert.ToString(dr["ReleaseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentReleaseDate = Convert.ToString(dr["CurrentReleaseDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsETAPOLDate = Convert.ToBoolean(dr["IsETAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mETAPOLDate = Convert.ToString(dr["ETAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentETAPOLDate = Convert.ToString(dr["CurrentETAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsATAPOLDate = Convert.ToBoolean(dr["IsATAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mATAPOLDate = Convert.ToString(dr["ATAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentATAPOLDate = Convert.ToString(dr["CurrentATAPOLDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsExpectedDeparture = Convert.ToBoolean(dr["IsExpectedDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mExpectedDeparture = Convert.ToString(dr["ExpectedDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentExpectedDeparture = Convert.ToString(dr["CurrentExpectedDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mIsActualDeparture = Convert.ToBoolean(dr["IsActualDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mActualDeparture = Convert.ToString(dr["ActualDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentActualDeparture = Convert.ToString(dr["CurrentActualDeparture"].ToString());
                        ObjCVarvwOperationEmailSent.mIsExpectedArrival = Convert.ToBoolean(dr["IsExpectedArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mExpectedArrival = Convert.ToString(dr["ExpectedArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentExpectedArrival = Convert.ToString(dr["CurrentExpectedArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mIsActualArrival = Convert.ToBoolean(dr["IsActualArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mActualArrival = Convert.ToString(dr["ActualArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentActualArrival = Convert.ToString(dr["CurrentActualArrival"].ToString());
                        ObjCVarvwOperationEmailSent.mIsGateInDate = Convert.ToBoolean(dr["IsGateInDate"].ToString());
                        ObjCVarvwOperationEmailSent.mGateInDate = Convert.ToString(dr["GateInDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentGateInDate = Convert.ToString(dr["CurrentGateInDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsGateOutDate = Convert.ToBoolean(dr["IsGateOutDate"].ToString());
                        ObjCVarvwOperationEmailSent.mGateOutDate = Convert.ToString(dr["GateOutDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentGateOutDate = Convert.ToString(dr["CurrentGateOutDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsStuffingDate = Convert.ToBoolean(dr["IsStuffingDate"].ToString());
                        ObjCVarvwOperationEmailSent.mStuffingDate = Convert.ToString(dr["StuffingDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentStuffingDate = Convert.ToString(dr["CurrentStuffingDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsDeliveryDate = Convert.ToBoolean(dr["IsDeliveryDate"].ToString());
                        ObjCVarvwOperationEmailSent.mDeliveryDate = Convert.ToString(dr["DeliveryDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentDeliveryDate = Convert.ToString(dr["CurrentDeliveryDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsCertificateDate = Convert.ToBoolean(dr["IsCertificateDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCertificateDate = Convert.ToString(dr["CertificateDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentCertificateDate = Convert.ToString(dr["CurrentCertificateDate"].ToString());
                        ObjCVarvwOperationEmailSent.mIsQasimaDate = Convert.ToBoolean(dr["IsQasimaDate"].ToString());
                        ObjCVarvwOperationEmailSent.mQasimaDate = Convert.ToString(dr["QasimaDate"].ToString());
                        ObjCVarvwOperationEmailSent.mCurrentQasimaDate = Convert.ToString(dr["CurrentQasimaDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperationEmailSent.Add(ObjCVarvwOperationEmailSent);
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
