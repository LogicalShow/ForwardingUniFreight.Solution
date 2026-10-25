using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Others.Generated
{
    [Serializable]
    public class CPKvwServiceDepartment
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwServiceDepartment : CPKvwServiceDepartment
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mDepartmentID;
        internal String mDepartmentName;
        internal String mEmail;
        internal Int32 mMoveTypeID;
        internal String mServiceCode;
        internal String mServiceName;
        internal String mNotes;
        internal Int32 mViewOrder;
        internal Boolean mOpenDate;
        internal Boolean mCloseDate;
        internal Boolean mCutOffDate;
        internal Boolean mPODate;
        internal Boolean mReleaseDate;
        internal Boolean mETAPOLDate;
        internal Boolean mATAPOLDate;
        internal Boolean mExpectedDeparture;
        internal Boolean mActualDeparture;
        internal Boolean mExpectedArrival;
        internal Boolean mActualArrival;
        internal Boolean mGateInDate;
        internal Boolean mGateOutDate;
        internal Boolean mStuffingDate;
        internal Boolean mDeliveryDate;
        internal Boolean mCertificateDate;
        internal Boolean mQasimaDate;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mDepartmentID = value; }
        }
        public String DepartmentName
        {
            get { return mDepartmentName; }
            set { mDepartmentName = value; }
        }
        public String Email
        {
            get { return mEmail; }
            set { mEmail = value; }
        }
        public Int32 MoveTypeID
        {
            get { return mMoveTypeID; }
            set { mMoveTypeID = value; }
        }
        public String ServiceCode
        {
            get { return mServiceCode; }
            set { mServiceCode = value; }
        }
        public String ServiceName
        {
            get { return mServiceName; }
            set { mServiceName = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mViewOrder = value; }
        }
        public Boolean OpenDate
        {
            get { return mOpenDate; }
            set { mOpenDate = value; }
        }
        public Boolean CloseDate
        {
            get { return mCloseDate; }
            set { mCloseDate = value; }
        }
        public Boolean CutOffDate
        {
            get { return mCutOffDate; }
            set { mCutOffDate = value; }
        }
        public Boolean PODate
        {
            get { return mPODate; }
            set { mPODate = value; }
        }
        public Boolean ReleaseDate
        {
            get { return mReleaseDate; }
            set { mReleaseDate = value; }
        }
        public Boolean ETAPOLDate
        {
            get { return mETAPOLDate; }
            set { mETAPOLDate = value; }
        }
        public Boolean ATAPOLDate
        {
            get { return mATAPOLDate; }
            set { mATAPOLDate = value; }
        }
        public Boolean ExpectedDeparture
        {
            get { return mExpectedDeparture; }
            set { mExpectedDeparture = value; }
        }
        public Boolean ActualDeparture
        {
            get { return mActualDeparture; }
            set { mActualDeparture = value; }
        }
        public Boolean ExpectedArrival
        {
            get { return mExpectedArrival; }
            set { mExpectedArrival = value; }
        }
        public Boolean ActualArrival
        {
            get { return mActualArrival; }
            set { mActualArrival = value; }
        }
        public Boolean GateInDate
        {
            get { return mGateInDate; }
            set { mGateInDate = value; }
        }
        public Boolean GateOutDate
        {
            get { return mGateOutDate; }
            set { mGateOutDate = value; }
        }
        public Boolean StuffingDate
        {
            get { return mStuffingDate; }
            set { mStuffingDate = value; }
        }
        public Boolean DeliveryDate
        {
            get { return mDeliveryDate; }
            set { mDeliveryDate = value; }
        }
        public Boolean CertificateDate
        {
            get { return mCertificateDate; }
            set { mCertificateDate = value; }
        }
        public Boolean QasimaDate
        {
            get { return mQasimaDate; }
            set { mQasimaDate = value; }
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

    public partial class CvwServiceDepartment
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
        public List<CVarvwServiceDepartment> lstCVarvwServiceDepartment = new List<CVarvwServiceDepartment>();
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
            lstCVarvwServiceDepartment.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwServiceDepartment";
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
                        CVarvwServiceDepartment ObjCVarvwServiceDepartment = new CVarvwServiceDepartment();
                        ObjCVarvwServiceDepartment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwServiceDepartment.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwServiceDepartment.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwServiceDepartment.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwServiceDepartment.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwServiceDepartment.mServiceCode = Convert.ToString(dr["ServiceCode"].ToString());
                        ObjCVarvwServiceDepartment.mServiceName = Convert.ToString(dr["ServiceName"].ToString());
                        ObjCVarvwServiceDepartment.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwServiceDepartment.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwServiceDepartment.mOpenDate = Convert.ToBoolean(dr["OpenDate"].ToString());
                        ObjCVarvwServiceDepartment.mCloseDate = Convert.ToBoolean(dr["CloseDate"].ToString());
                        ObjCVarvwServiceDepartment.mCutOffDate = Convert.ToBoolean(dr["CutOffDate"].ToString());
                        ObjCVarvwServiceDepartment.mPODate = Convert.ToBoolean(dr["PODate"].ToString());
                        ObjCVarvwServiceDepartment.mReleaseDate = Convert.ToBoolean(dr["ReleaseDate"].ToString());
                        ObjCVarvwServiceDepartment.mETAPOLDate = Convert.ToBoolean(dr["ETAPOLDate"].ToString());
                        ObjCVarvwServiceDepartment.mATAPOLDate = Convert.ToBoolean(dr["ATAPOLDate"].ToString());
                        ObjCVarvwServiceDepartment.mExpectedDeparture = Convert.ToBoolean(dr["ExpectedDeparture"].ToString());
                        ObjCVarvwServiceDepartment.mActualDeparture = Convert.ToBoolean(dr["ActualDeparture"].ToString());
                        ObjCVarvwServiceDepartment.mExpectedArrival = Convert.ToBoolean(dr["ExpectedArrival"].ToString());
                        ObjCVarvwServiceDepartment.mActualArrival = Convert.ToBoolean(dr["ActualArrival"].ToString());
                        ObjCVarvwServiceDepartment.mGateInDate = Convert.ToBoolean(dr["GateInDate"].ToString());
                        ObjCVarvwServiceDepartment.mGateOutDate = Convert.ToBoolean(dr["GateOutDate"].ToString());
                        ObjCVarvwServiceDepartment.mStuffingDate = Convert.ToBoolean(dr["StuffingDate"].ToString());
                        ObjCVarvwServiceDepartment.mDeliveryDate = Convert.ToBoolean(dr["DeliveryDate"].ToString());
                        ObjCVarvwServiceDepartment.mCertificateDate = Convert.ToBoolean(dr["CertificateDate"].ToString());
                        ObjCVarvwServiceDepartment.mQasimaDate = Convert.ToBoolean(dr["QasimaDate"].ToString());
                        ObjCVarvwServiceDepartment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwServiceDepartment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwServiceDepartment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwServiceDepartment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarvwServiceDepartment.Add(ObjCVarvwServiceDepartment);
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
            lstCVarvwServiceDepartment.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwServiceDepartment";
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
                        CVarvwServiceDepartment ObjCVarvwServiceDepartment = new CVarvwServiceDepartment();
                        ObjCVarvwServiceDepartment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwServiceDepartment.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarvwServiceDepartment.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
                        ObjCVarvwServiceDepartment.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwServiceDepartment.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarvwServiceDepartment.mServiceCode = Convert.ToString(dr["ServiceCode"].ToString());
                        ObjCVarvwServiceDepartment.mServiceName = Convert.ToString(dr["ServiceName"].ToString());
                        ObjCVarvwServiceDepartment.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwServiceDepartment.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwServiceDepartment.mOpenDate = Convert.ToBoolean(dr["OpenDate"].ToString());
                        ObjCVarvwServiceDepartment.mCloseDate = Convert.ToBoolean(dr["CloseDate"].ToString());
                        ObjCVarvwServiceDepartment.mCutOffDate = Convert.ToBoolean(dr["CutOffDate"].ToString());
                        ObjCVarvwServiceDepartment.mPODate = Convert.ToBoolean(dr["PODate"].ToString());
                        ObjCVarvwServiceDepartment.mReleaseDate = Convert.ToBoolean(dr["ReleaseDate"].ToString());
                        ObjCVarvwServiceDepartment.mETAPOLDate = Convert.ToBoolean(dr["ETAPOLDate"].ToString());
                        ObjCVarvwServiceDepartment.mATAPOLDate = Convert.ToBoolean(dr["ATAPOLDate"].ToString());
                        ObjCVarvwServiceDepartment.mExpectedDeparture = Convert.ToBoolean(dr["ExpectedDeparture"].ToString());
                        ObjCVarvwServiceDepartment.mActualDeparture = Convert.ToBoolean(dr["ActualDeparture"].ToString());
                        ObjCVarvwServiceDepartment.mExpectedArrival = Convert.ToBoolean(dr["ExpectedArrival"].ToString());
                        ObjCVarvwServiceDepartment.mActualArrival = Convert.ToBoolean(dr["ActualArrival"].ToString());
                        ObjCVarvwServiceDepartment.mGateInDate = Convert.ToBoolean(dr["GateInDate"].ToString());
                        ObjCVarvwServiceDepartment.mGateOutDate = Convert.ToBoolean(dr["GateOutDate"].ToString());
                        ObjCVarvwServiceDepartment.mStuffingDate = Convert.ToBoolean(dr["StuffingDate"].ToString());
                        ObjCVarvwServiceDepartment.mDeliveryDate = Convert.ToBoolean(dr["DeliveryDate"].ToString());
                        ObjCVarvwServiceDepartment.mCertificateDate = Convert.ToBoolean(dr["CertificateDate"].ToString());
                        ObjCVarvwServiceDepartment.mQasimaDate = Convert.ToBoolean(dr["QasimaDate"].ToString());
                        ObjCVarvwServiceDepartment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwServiceDepartment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwServiceDepartment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwServiceDepartment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwServiceDepartment.Add(ObjCVarvwServiceDepartment);
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
