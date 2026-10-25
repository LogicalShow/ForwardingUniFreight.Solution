using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKvwCustomClearanceTracking
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
    public partial class CVarvwCustomClearanceTracking : CPKvwCustomClearanceTracking
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mCustomClearanceRoutingID;
        internal Int32 mTrackingStageID;
        internal String mTrackingStageName;
        internal String mTrackingStageNotes;
        internal Int32 mViewOrder;
        internal DateTime mTrackingDate;
        internal String mStringTrackingDate;
        internal String mNotes;
        internal Boolean mDone;
        internal Int32 mCustodyID;
        internal String mCustodyName;
        internal String mCustodyLocalName;
        internal Int32 mCreatorUserID;
        internal String mCreatorName;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal String mModificatorName;
        internal DateTime mModificationDate;
        internal String mRoutingCode;
        internal String mRoutingName;
        internal Int64 mOperationID;
        internal String mOperationCode;
        internal Int32 mOperationSerial;
        #endregion

        #region "Methods"
        public Int64 CustomClearanceRoutingID
        {
            get { return mCustomClearanceRoutingID; }
            set { mCustomClearanceRoutingID = value; }
        }
        public Int32 TrackingStageID
        {
            get { return mTrackingStageID; }
            set { mTrackingStageID = value; }
        }
        public String TrackingStageName
        {
            get { return mTrackingStageName; }
            set { mTrackingStageName = value; }
        }
        public String TrackingStageNotes
        {
            get { return mTrackingStageNotes; }
            set { mTrackingStageNotes = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mViewOrder = value; }
        }
        public DateTime TrackingDate
        {
            get { return mTrackingDate; }
            set { mTrackingDate = value; }
        }
        public String StringTrackingDate
        {
            get { return mStringTrackingDate; }
            set { mStringTrackingDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean Done
        {
            get { return mDone; }
            set { mDone = value; }
        }
        public Int32 CustodyID
        {
            get { return mCustodyID; }
            set { mCustodyID = value; }
        }
        public String CustodyName
        {
            get { return mCustodyName; }
            set { mCustodyName = value; }
        }
        public String CustodyLocalName
        {
            get { return mCustodyLocalName; }
            set { mCustodyLocalName = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public String CreatorName
        {
            get { return mCreatorName; }
            set { mCreatorName = value; }
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
        public String ModificatorName
        {
            get { return mModificatorName; }
            set { mModificatorName = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public String RoutingCode
        {
            get { return mRoutingCode; }
            set { mRoutingCode = value; }
        }
        public String RoutingName
        {
            get { return mRoutingName; }
            set { mRoutingName = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public Int32 OperationSerial
        {
            get { return mOperationSerial; }
            set { mOperationSerial = value; }
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

    public partial class CvwCustomClearanceTracking
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
        public List<CVarvwCustomClearanceTracking> lstCVarvwCustomClearanceTracking = new List<CVarvwCustomClearanceTracking>();
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
            lstCVarvwCustomClearanceTracking.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCustomClearanceTracking";
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
                        CVarvwCustomClearanceTracking ObjCVarvwCustomClearanceTracking = new CVarvwCustomClearanceTracking();
                        ObjCVarvwCustomClearanceTracking.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCustomClearanceRoutingID = Convert.ToInt64(dr["CustomClearanceRoutingID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mTrackingStageID = Convert.ToInt32(dr["TrackingStageID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mTrackingStageName = Convert.ToString(dr["TrackingStageName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mTrackingStageNotes = Convert.ToString(dr["TrackingStageNotes"].ToString());
                        ObjCVarvwCustomClearanceTracking.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwCustomClearanceTracking.mTrackingDate = Convert.ToDateTime(dr["TrackingDate"].ToString());
                        ObjCVarvwCustomClearanceTracking.mStringTrackingDate = Convert.ToString(dr["StringTrackingDate"].ToString());
                        ObjCVarvwCustomClearanceTracking.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwCustomClearanceTracking.mDone = Convert.ToBoolean(dr["Done"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCustodyName = Convert.ToString(dr["CustodyName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCustodyLocalName = Convert.ToString(dr["CustodyLocalName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCustomClearanceTracking.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwCustomClearanceTracking.mRoutingCode = Convert.ToString(dr["RoutingCode"].ToString());
                        ObjCVarvwCustomClearanceTracking.mRoutingName = Convert.ToString(dr["RoutingName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwCustomClearanceTracking.mOperationSerial = Convert.ToInt32(dr["OperationSerial"].ToString());
                        lstCVarvwCustomClearanceTracking.Add(ObjCVarvwCustomClearanceTracking);
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
            lstCVarvwCustomClearanceTracking.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCustomClearanceTracking";
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
                        CVarvwCustomClearanceTracking ObjCVarvwCustomClearanceTracking = new CVarvwCustomClearanceTracking();
                        ObjCVarvwCustomClearanceTracking.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCustomClearanceRoutingID = Convert.ToInt64(dr["CustomClearanceRoutingID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mTrackingStageID = Convert.ToInt32(dr["TrackingStageID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mTrackingStageName = Convert.ToString(dr["TrackingStageName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mTrackingStageNotes = Convert.ToString(dr["TrackingStageNotes"].ToString());
                        ObjCVarvwCustomClearanceTracking.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwCustomClearanceTracking.mTrackingDate = Convert.ToDateTime(dr["TrackingDate"].ToString());
                        ObjCVarvwCustomClearanceTracking.mStringTrackingDate = Convert.ToString(dr["StringTrackingDate"].ToString());
                        ObjCVarvwCustomClearanceTracking.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwCustomClearanceTracking.mDone = Convert.ToBoolean(dr["Done"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCustodyName = Convert.ToString(dr["CustodyName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCustodyLocalName = Convert.ToString(dr["CustodyLocalName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCustomClearanceTracking.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwCustomClearanceTracking.mRoutingCode = Convert.ToString(dr["RoutingCode"].ToString());
                        ObjCVarvwCustomClearanceTracking.mRoutingName = Convert.ToString(dr["RoutingName"].ToString());
                        ObjCVarvwCustomClearanceTracking.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwCustomClearanceTracking.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwCustomClearanceTracking.mOperationSerial = Convert.ToInt32(dr["OperationSerial"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCustomClearanceTracking.Add(ObjCVarvwCustomClearanceTracking);
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
