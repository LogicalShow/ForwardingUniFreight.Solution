using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
	[Serializable]
	public partial class CVarvwTruckingReport
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mRoutingID;
		internal Int64 mOperationID;
		internal String mCode;
		internal Int32 mCodeSerial;
		internal String mCustomerReference;
		internal DateTime mOpenDate;
		internal String mOpNotes;
		internal String mTrNotes;
		internal Int32 mClientID;
		internal String mClientName;
		internal String mBookingNumber;
		internal Int32 mPOL;
		internal String mPOLName;
		internal Int32 mPOD;
		internal String mPODName;
		internal String mLineName;
		internal DateTime mCutOffDate;
		internal String mVoyageOrTruckNumber;
		internal String mBosla;
		internal DateTime mExpectedDeparture;
		internal DateTime mActualDeparture;
		internal String mNumberOfLCL;
		internal DateTime mLoadingDate;
		internal String mLoadingTime;
		internal String mPickupAddress;
		internal String mTruckerName;
		internal Boolean mIsLoaded;
		internal String mIsLoadedStatus;
		internal String mTrNumberOfContainers;
		internal String mOpNumberOfContainers;
		#endregion

		#region "Methods"
		public Int64 RoutingID
		{
			get { return mRoutingID; }
			set { mRoutingID = value; }
		}
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
		public Int32 CodeSerial
		{
			get { return mCodeSerial; }
			set { mCodeSerial = value; }
		}
		public String CustomerReference
		{
			get { return mCustomerReference; }
			set { mCustomerReference = value; }
		}
		public DateTime OpenDate
		{
			get { return mOpenDate; }
			set { mOpenDate = value; }
		}
		public String OpNotes
		{
			get { return mOpNotes; }
			set { mOpNotes = value; }
		}
		public String TrNotes
		{
			get { return mTrNotes; }
			set { mTrNotes = value; }
		}
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
		public String BookingNumber
		{
			get { return mBookingNumber; }
			set { mBookingNumber = value; }
		}
		public Int32 POL
		{
			get { return mPOL; }
			set { mPOL = value; }
		}
		public String POLName
		{
			get { return mPOLName; }
			set { mPOLName = value; }
		}
		public Int32 POD
		{
			get { return mPOD; }
			set { mPOD = value; }
		}
		public String PODName
		{
			get { return mPODName; }
			set { mPODName = value; }
		}
		public String LineName
		{
			get { return mLineName; }
			set { mLineName = value; }
		}
		public DateTime CutOffDate
		{
			get { return mCutOffDate; }
			set { mCutOffDate = value; }
		}
		public String VoyageOrTruckNumber
		{
			get { return mVoyageOrTruckNumber; }
			set { mVoyageOrTruckNumber = value; }
		}
		public String Bosla
		{
			get { return mBosla; }
			set { mBosla = value; }
		}
		public DateTime ExpectedDeparture
		{
			get { return mExpectedDeparture; }
			set { mExpectedDeparture = value; }
		}
		public DateTime ActualDeparture
		{
			get { return mActualDeparture; }
			set { mActualDeparture = value; }
		}
		public String NumberOfLCL
		{
			get { return mNumberOfLCL; }
			set { mNumberOfLCL = value; }
		}
		public DateTime LoadingDate
		{
			get { return mLoadingDate; }
			set { mLoadingDate = value; }
		}
		public String LoadingTime
		{
			get { return mLoadingTime; }
			set { mLoadingTime = value; }
		}
		public String PickupAddress
		{
			get { return mPickupAddress; }
			set { mPickupAddress = value; }
		}
		public String TruckerName
		{
			get { return mTruckerName; }
			set { mTruckerName = value; }
		}
		public Boolean IsLoaded
		{
			get { return mIsLoaded; }
			set { mIsLoaded = value; }
		}
		public String IsLoadedStatus
		{
			get { return mIsLoadedStatus; }
			set { mIsLoadedStatus = value; }
		}
		public String TrNumberOfContainers
		{
			get { return mTrNumberOfContainers; }
			set { mTrNumberOfContainers = value; }
		}
		public String OpNumberOfContainers
		{
			get { return mOpNumberOfContainers; }
			set { mOpNumberOfContainers = value; }
		}
		#endregion
	}

	public partial class CvwTruckingReport
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
		public List<CVarvwTruckingReport> lstCVarvwTruckingReport = new List<CVarvwTruckingReport>();
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
			lstCVarvwTruckingReport.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwTruckingReport";
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
						CVarvwTruckingReport ObjCVarvwTruckingReport = new CVarvwTruckingReport();
						ObjCVarvwTruckingReport.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
						ObjCVarvwTruckingReport.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
						ObjCVarvwTruckingReport.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwTruckingReport.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwTruckingReport.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
						ObjCVarvwTruckingReport.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
						ObjCVarvwTruckingReport.mOpNotes = Convert.ToString(dr["OpNotes"].ToString());
						ObjCVarvwTruckingReport.mTrNotes = Convert.ToString(dr["TrNotes"].ToString());
						ObjCVarvwTruckingReport.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
						ObjCVarvwTruckingReport.mClientName = Convert.ToString(dr["ClientName"].ToString());
						ObjCVarvwTruckingReport.mBookingNumber = Convert.ToString(dr["BookingNumber"].ToString());
						ObjCVarvwTruckingReport.mPOL = Convert.ToInt32(dr["POL"].ToString());
						ObjCVarvwTruckingReport.mPOLName = Convert.ToString(dr["POLName"].ToString());
						ObjCVarvwTruckingReport.mPOD = Convert.ToInt32(dr["POD"].ToString());
						ObjCVarvwTruckingReport.mPODName = Convert.ToString(dr["PODName"].ToString());
						ObjCVarvwTruckingReport.mLineName = Convert.ToString(dr["LineName"].ToString());
						ObjCVarvwTruckingReport.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
						ObjCVarvwTruckingReport.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
						ObjCVarvwTruckingReport.mBosla = Convert.ToString(dr["Bosla"].ToString());
						ObjCVarvwTruckingReport.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
						ObjCVarvwTruckingReport.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
						ObjCVarvwTruckingReport.mNumberOfLCL = Convert.ToString(dr["NumberOfLCL"].ToString());
						ObjCVarvwTruckingReport.mLoadingDate = Convert.ToDateTime(dr["LoadingDate"].ToString());
						ObjCVarvwTruckingReport.mLoadingTime = Convert.ToString(dr["LoadingTime"].ToString());
						ObjCVarvwTruckingReport.mPickupAddress = Convert.ToString(dr["PickupAddress"].ToString());
						ObjCVarvwTruckingReport.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
						ObjCVarvwTruckingReport.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
						ObjCVarvwTruckingReport.mIsLoadedStatus = Convert.ToString(dr["IsLoadedStatus"].ToString());
						ObjCVarvwTruckingReport.mTrNumberOfContainers = Convert.ToString(dr["TrNumberOfContainers"].ToString());
						ObjCVarvwTruckingReport.mOpNumberOfContainers = Convert.ToString(dr["OpNumberOfContainers"].ToString());
						lstCVarvwTruckingReport.Add(ObjCVarvwTruckingReport);
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
			lstCVarvwTruckingReport.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwTruckingReport";
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
						CVarvwTruckingReport ObjCVarvwTruckingReport = new CVarvwTruckingReport();
						ObjCVarvwTruckingReport.mRoutingID = Convert.ToInt64(dr["RoutingID"].ToString());
						ObjCVarvwTruckingReport.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
						ObjCVarvwTruckingReport.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwTruckingReport.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwTruckingReport.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
						ObjCVarvwTruckingReport.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
						ObjCVarvwTruckingReport.mOpNotes = Convert.ToString(dr["OpNotes"].ToString());
						ObjCVarvwTruckingReport.mTrNotes = Convert.ToString(dr["TrNotes"].ToString());
						ObjCVarvwTruckingReport.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
						ObjCVarvwTruckingReport.mClientName = Convert.ToString(dr["ClientName"].ToString());
						ObjCVarvwTruckingReport.mBookingNumber = Convert.ToString(dr["BookingNumber"].ToString());
						ObjCVarvwTruckingReport.mPOL = Convert.ToInt32(dr["POL"].ToString());
						ObjCVarvwTruckingReport.mPOLName = Convert.ToString(dr["POLName"].ToString());
						ObjCVarvwTruckingReport.mPOD = Convert.ToInt32(dr["POD"].ToString());
						ObjCVarvwTruckingReport.mPODName = Convert.ToString(dr["PODName"].ToString());
						ObjCVarvwTruckingReport.mLineName = Convert.ToString(dr["LineName"].ToString());
						ObjCVarvwTruckingReport.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
						ObjCVarvwTruckingReport.mVoyageOrTruckNumber = Convert.ToString(dr["VoyageOrTruckNumber"].ToString());
						ObjCVarvwTruckingReport.mBosla = Convert.ToString(dr["Bosla"].ToString());
						ObjCVarvwTruckingReport.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
						ObjCVarvwTruckingReport.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
						ObjCVarvwTruckingReport.mNumberOfLCL = Convert.ToString(dr["NumberOfLCL"].ToString());
						ObjCVarvwTruckingReport.mLoadingDate = Convert.ToDateTime(dr["LoadingDate"].ToString());
						ObjCVarvwTruckingReport.mLoadingTime = Convert.ToString(dr["LoadingTime"].ToString());
						ObjCVarvwTruckingReport.mPickupAddress = Convert.ToString(dr["PickupAddress"].ToString());
						ObjCVarvwTruckingReport.mTruckerName = Convert.ToString(dr["TruckerName"].ToString());
						ObjCVarvwTruckingReport.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
						ObjCVarvwTruckingReport.mIsLoadedStatus = Convert.ToString(dr["IsLoadedStatus"].ToString());
						ObjCVarvwTruckingReport.mTrNumberOfContainers = Convert.ToString(dr["TrNumberOfContainers"].ToString());
						ObjCVarvwTruckingReport.mOpNumberOfContainers = Convert.ToString(dr["OpNumberOfContainers"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwTruckingReport.Add(ObjCVarvwTruckingReport);
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