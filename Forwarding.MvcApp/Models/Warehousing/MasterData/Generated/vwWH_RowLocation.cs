using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Generated
{
	[Serializable]
	public class CPKvwWH_RowLocation
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
	public partial class CVarvwWH_RowLocation : CPKvwWH_RowLocation
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mRowID;
		internal String mRowName;
		internal Int32 mAreaID;
		internal String mAreaName;
		internal Int32 mWareHouseID;
		internal String mWarehouseName;
		internal String mCode;
		internal String mLevelNumber;
		internal String mTrayNumber;
		internal Decimal mMaxWeight;
		internal Int32 mWeightUnitID;
		internal String mWeightUnitCode;
		internal Decimal mMaxVolume;
		internal Int32 mVolumeUnitID;
		internal String mVolumeUnitCode;
		internal Decimal mLocationLength;
		internal Decimal mLocationWidth;
		internal Int32 mLengthUnitID;
		internal String mLengthUnitCode;
		internal Int32 mStatusID;
		internal String mStatusName;
		internal Int32 mPickupMethodID;
		internal String mPickupMethodName;
		internal Boolean mIsUsed;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Decimal mMaxHeat;
		internal Int32 mTypeID;
		internal String mTypeName;
		internal Boolean mIsDefault;
		#endregion

		#region "Methods"
		public Int32 RowID
		{
			get { return mRowID; }
			set { mRowID = value; }
		}
		public String RowName
		{
			get { return mRowName; }
			set { mRowName = value; }
		}
		public Int32 AreaID
		{
			get { return mAreaID; }
			set { mAreaID = value; }
		}
		public String AreaName
		{
			get { return mAreaName; }
			set { mAreaName = value; }
		}
		public Int32 WareHouseID
		{
			get { return mWareHouseID; }
			set { mWareHouseID = value; }
		}
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		public String Code
		{
			get { return mCode; }
			set { mCode = value; }
		}
		public String LevelNumber
		{
			get { return mLevelNumber; }
			set { mLevelNumber = value; }
		}
		public String TrayNumber
		{
			get { return mTrayNumber; }
			set { mTrayNumber = value; }
		}
		public Decimal MaxWeight
		{
			get { return mMaxWeight; }
			set { mMaxWeight = value; }
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
		public Decimal LocationLength
		{
			get { return mLocationLength; }
			set { mLocationLength = value; }
		}
		public Decimal LocationWidth
		{
			get { return mLocationWidth; }
			set { mLocationWidth = value; }
		}
		public Int32 LengthUnitID
		{
			get { return mLengthUnitID; }
			set { mLengthUnitID = value; }
		}
		public String LengthUnitCode
		{
			get { return mLengthUnitCode; }
			set { mLengthUnitCode = value; }
		}
		public Int32 StatusID
		{
			get { return mStatusID; }
			set { mStatusID = value; }
		}
		public String StatusName
		{
			get { return mStatusName; }
			set { mStatusName = value; }
		}
		public Int32 PickupMethodID
		{
			get { return mPickupMethodID; }
			set { mPickupMethodID = value; }
		}
		public String PickupMethodName
		{
			get { return mPickupMethodName; }
			set { mPickupMethodName = value; }
		}
		public Boolean IsUsed
		{
			get { return mIsUsed; }
			set { mIsUsed = value; }
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
		public Decimal MaxHeat
		{
			get { return mMaxHeat; }
			set { mMaxHeat = value; }
		}
		public Int32 TypeID
		{
			get { return mTypeID; }
			set { mTypeID = value; }
		}
		public String TypeName
		{
			get { return mTypeName; }
			set { mTypeName = value; }
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

	public partial class CvwWH_RowLocation
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
		public List<CVarvwWH_RowLocation> lstCVarvwWH_RowLocation = new List<CVarvwWH_RowLocation>();
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
			lstCVarvwWH_RowLocation.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_RowLocation";
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
						CVarvwWH_RowLocation ObjCVarvwWH_RowLocation = new CVarvwWH_RowLocation();
						ObjCVarvwWH_RowLocation.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_RowLocation.mRowID = Convert.ToInt32(dr["RowID"].ToString());
						ObjCVarvwWH_RowLocation.mRowName = Convert.ToString(dr["RowName"].ToString());
						ObjCVarvwWH_RowLocation.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
						ObjCVarvwWH_RowLocation.mAreaName = Convert.ToString(dr["AreaName"].ToString());
						ObjCVarvwWH_RowLocation.mWareHouseID = Convert.ToInt32(dr["WareHouseID"].ToString());
						ObjCVarvwWH_RowLocation.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_RowLocation.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_RowLocation.mLevelNumber = Convert.ToString(dr["LevelNumber"].ToString());
						ObjCVarvwWH_RowLocation.mTrayNumber = Convert.ToString(dr["TrayNumber"].ToString());
						ObjCVarvwWH_RowLocation.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
						ObjCVarvwWH_RowLocation.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
						ObjCVarvwWH_RowLocation.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
						ObjCVarvwWH_RowLocation.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
						ObjCVarvwWH_RowLocation.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
						ObjCVarvwWH_RowLocation.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
						ObjCVarvwWH_RowLocation.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
						ObjCVarvwWH_RowLocation.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
						ObjCVarvwWH_RowLocation.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
						ObjCVarvwWH_RowLocation.mLengthUnitCode = Convert.ToString(dr["LengthUnitCode"].ToString());
						ObjCVarvwWH_RowLocation.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
						ObjCVarvwWH_RowLocation.mStatusName = Convert.ToString(dr["StatusName"].ToString());
						ObjCVarvwWH_RowLocation.mPickupMethodID = Convert.ToInt32(dr["PickupMethodID"].ToString());
						ObjCVarvwWH_RowLocation.mPickupMethodName = Convert.ToString(dr["PickupMethodName"].ToString());
						ObjCVarvwWH_RowLocation.mIsUsed = Convert.ToBoolean(dr["IsUsed"].ToString());
						ObjCVarvwWH_RowLocation.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwWH_RowLocation.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_RowLocation.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwWH_RowLocation.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwWH_RowLocation.mMaxHeat = Convert.ToDecimal(dr["MaxHeat"].ToString());
						ObjCVarvwWH_RowLocation.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						ObjCVarvwWH_RowLocation.mTypeName = Convert.ToString(dr["TypeName"].ToString());
						ObjCVarvwWH_RowLocation.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						lstCVarvwWH_RowLocation.Add(ObjCVarvwWH_RowLocation);
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
			lstCVarvwWH_RowLocation.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_RowLocation";
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
						CVarvwWH_RowLocation ObjCVarvwWH_RowLocation = new CVarvwWH_RowLocation();
						ObjCVarvwWH_RowLocation.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_RowLocation.mRowID = Convert.ToInt32(dr["RowID"].ToString());
						ObjCVarvwWH_RowLocation.mRowName = Convert.ToString(dr["RowName"].ToString());
						ObjCVarvwWH_RowLocation.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
						ObjCVarvwWH_RowLocation.mAreaName = Convert.ToString(dr["AreaName"].ToString());
						ObjCVarvwWH_RowLocation.mWareHouseID = Convert.ToInt32(dr["WareHouseID"].ToString());
						ObjCVarvwWH_RowLocation.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_RowLocation.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_RowLocation.mLevelNumber = Convert.ToString(dr["LevelNumber"].ToString());
						ObjCVarvwWH_RowLocation.mTrayNumber = Convert.ToString(dr["TrayNumber"].ToString());
						ObjCVarvwWH_RowLocation.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
						ObjCVarvwWH_RowLocation.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
						ObjCVarvwWH_RowLocation.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
						ObjCVarvwWH_RowLocation.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
						ObjCVarvwWH_RowLocation.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
						ObjCVarvwWH_RowLocation.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
						ObjCVarvwWH_RowLocation.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
						ObjCVarvwWH_RowLocation.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
						ObjCVarvwWH_RowLocation.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
						ObjCVarvwWH_RowLocation.mLengthUnitCode = Convert.ToString(dr["LengthUnitCode"].ToString());
						ObjCVarvwWH_RowLocation.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
						ObjCVarvwWH_RowLocation.mStatusName = Convert.ToString(dr["StatusName"].ToString());
						ObjCVarvwWH_RowLocation.mPickupMethodID = Convert.ToInt32(dr["PickupMethodID"].ToString());
						ObjCVarvwWH_RowLocation.mPickupMethodName = Convert.ToString(dr["PickupMethodName"].ToString());
						ObjCVarvwWH_RowLocation.mIsUsed = Convert.ToBoolean(dr["IsUsed"].ToString());
						ObjCVarvwWH_RowLocation.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwWH_RowLocation.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_RowLocation.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwWH_RowLocation.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwWH_RowLocation.mMaxHeat = Convert.ToDecimal(dr["MaxHeat"].ToString());
						ObjCVarvwWH_RowLocation.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						ObjCVarvwWH_RowLocation.mTypeName = Convert.ToString(dr["TypeName"].ToString());
						ObjCVarvwWH_RowLocation.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_RowLocation.Add(ObjCVarvwWH_RowLocation);
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
