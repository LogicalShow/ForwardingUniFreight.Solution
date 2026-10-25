using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Generated
{
	[Serializable]
	public class CPKvwWH_Area
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
	public partial class CVarvwWH_Area : CPKvwWH_Area
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mWarehouseID;
		internal String mWarehouseName;
		internal String mName;
		internal Decimal mMaxWeight;
		internal Decimal mCurrentWeight;
		internal Decimal mAvailableWeight;
		internal Int32 mWeightUnitID;
		internal String mWeightUnitCode;
		internal Decimal mMaxVolume;
		internal Decimal mCurrentVolume;
		internal Decimal mAvailableVolume;
		internal Int32 mVolumeUnitID;
		internal String mVolumeUnitCode;
		internal Boolean mIsDefault;
		#endregion

		#region "Methods"
		public Int32 WarehouseID
		{
			get { return mWarehouseID; }
			set { mWarehouseID = value; }
		}
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		public String Name
		{
			get { return mName; }
			set { mName = value; }
		}
		public Decimal MaxWeight
		{
			get { return mMaxWeight; }
			set { mMaxWeight = value; }
		}
		public Decimal CurrentWeight
		{
			get { return mCurrentWeight; }
			set { mCurrentWeight = value; }
		}
		public Decimal AvailableWeight
		{
			get { return mAvailableWeight; }
			set { mAvailableWeight = value; }
		}
		public Int32 WeightUnitID
		{
			get { return mWeightUnitID; }
			set { mWeightUnitID = value; }
		}
		public String WeightUnitCode
		{
			get { return mWeightUnitCode; }
			set { mWeightUnitCode = value; }
		}
		public Decimal MaxVolume
		{
			get { return mMaxVolume; }
			set { mMaxVolume = value; }
		}
		public Decimal CurrentVolume
		{
			get { return mCurrentVolume; }
			set { mCurrentVolume = value; }
		}
		public Decimal AvailableVolume
		{
			get { return mAvailableVolume; }
			set { mAvailableVolume = value; }
		}
		public Int32 VolumeUnitID
		{
			get { return mVolumeUnitID; }
			set { mVolumeUnitID = value; }
		}
		public String VolumeUnitCode
		{
			get { return mVolumeUnitCode; }
			set { mVolumeUnitCode = value; }
		}
		public Boolean IsDefault
		{
			get { return mIsDefault; }
			set { mIsDefault = value; }
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

	public partial class CvwWH_Area
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
		public List<CVarvwWH_Area> lstCVarvwWH_Area = new List<CVarvwWH_Area>();
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
			lstCVarvwWH_Area.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_Area";
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
						CVarvwWH_Area ObjCVarvwWH_Area = new CVarvwWH_Area();
						ObjCVarvwWH_Area.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_Area.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_Area.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_Area.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwWH_Area.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
						ObjCVarvwWH_Area.mCurrentWeight = Convert.ToDecimal(dr["CurrentWeight"].ToString());
						ObjCVarvwWH_Area.mAvailableWeight = Convert.ToDecimal(dr["AvailableWeight"].ToString());
						ObjCVarvwWH_Area.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
						ObjCVarvwWH_Area.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
						ObjCVarvwWH_Area.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
						ObjCVarvwWH_Area.mCurrentVolume = Convert.ToDecimal(dr["CurrentVolume"].ToString());
						ObjCVarvwWH_Area.mAvailableVolume = Convert.ToDecimal(dr["AvailableVolume"].ToString());
						ObjCVarvwWH_Area.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
						ObjCVarvwWH_Area.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
						ObjCVarvwWH_Area.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						lstCVarvwWH_Area.Add(ObjCVarvwWH_Area);
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
			lstCVarvwWH_Area.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_Area";
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
						CVarvwWH_Area ObjCVarvwWH_Area = new CVarvwWH_Area();
						ObjCVarvwWH_Area.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_Area.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_Area.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_Area.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwWH_Area.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
						ObjCVarvwWH_Area.mCurrentWeight = Convert.ToDecimal(dr["CurrentWeight"].ToString());
						ObjCVarvwWH_Area.mAvailableWeight = Convert.ToDecimal(dr["AvailableWeight"].ToString());
						ObjCVarvwWH_Area.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
						ObjCVarvwWH_Area.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
						ObjCVarvwWH_Area.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
						ObjCVarvwWH_Area.mCurrentVolume = Convert.ToDecimal(dr["CurrentVolume"].ToString());
						ObjCVarvwWH_Area.mAvailableVolume = Convert.ToDecimal(dr["AvailableVolume"].ToString());
						ObjCVarvwWH_Area.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
						ObjCVarvwWH_Area.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
						ObjCVarvwWH_Area.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_Area.Add(ObjCVarvwWH_Area);
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
