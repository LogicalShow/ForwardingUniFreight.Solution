using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Generated
{
	[Serializable]
	public class CPKWH_RowLocation
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
	public partial class CVarWH_RowLocation : CPKWH_RowLocation
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mRowID;
		internal String mCode;
		internal String mLevelNumber;
		internal String mTrayNumber;
		internal Decimal mMaxWeight;
		internal Int32 mWeightUnitID;
		internal Decimal mMaxVolume;
		internal Int32 mVolumeUnitID;
		internal Int32 mStatusID;
		internal Int32 mPickupMethodID;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Boolean mIsUsed;
		internal Decimal mLocationLength;
		internal Decimal mLocationWidth;
		internal Int32 mLengthUnitID;
		internal Int32 mTypeID;
		internal Decimal mMaxHeat;
		internal Boolean mIsDefault;
		#endregion

		#region "Methods"
		public Int32 RowID
		{
			get { return mRowID; }
			set { mIsChanges = true; mRowID = value; }
		}
		public String Code
		{
			get { return mCode; }
			set { mIsChanges = true; mCode = value; }
		}
		public String LevelNumber
		{
			get { return mLevelNumber; }
			set { mIsChanges = true; mLevelNumber = value; }
		}
		public String TrayNumber
		{
			get { return mTrayNumber; }
			set { mIsChanges = true; mTrayNumber = value; }
		}
		public Decimal MaxWeight
		{
			get { return mMaxWeight; }
			set { mIsChanges = true; mMaxWeight = value; }
		}
		public Int32 WeightUnitID
		{
			get { return mWeightUnitID; }
			set { mIsChanges = true; mWeightUnitID = value; }
		}
		public Decimal MaxVolume
		{
			get { return mMaxVolume; }
			set { mIsChanges = true; mMaxVolume = value; }
		}
		public Int32 VolumeUnitID
		{
			get { return mVolumeUnitID; }
			set { mIsChanges = true; mVolumeUnitID = value; }
		}
		public Int32 StatusID
		{
			get { return mStatusID; }
			set { mIsChanges = true; mStatusID = value; }
		}
		public Int32 PickupMethodID
		{
			get { return mPickupMethodID; }
			set { mIsChanges = true; mPickupMethodID = value; }
		}
		public Int32 CreatorUserID
		{
			get { return mCreatorUserID; }
			set { mIsChanges = true; mCreatorUserID = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mIsChanges = true; mCreationDate = value; }
		}
		public Int32 ModificatorUserID
		{
			get { return mModificatorUserID; }
			set { mIsChanges = true; mModificatorUserID = value; }
		}
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mIsChanges = true; mModificationDate = value; }
		}
		public Boolean IsUsed
		{
			get { return mIsUsed; }
			set { mIsChanges = true; mIsUsed = value; }
		}
		public Decimal LocationLength
		{
			get { return mLocationLength; }
			set { mIsChanges = true; mLocationLength = value; }
		}
		public Decimal LocationWidth
		{
			get { return mLocationWidth; }
			set { mIsChanges = true; mLocationWidth = value; }
		}
		public Int32 LengthUnitID
		{
			get { return mLengthUnitID; }
			set { mIsChanges = true; mLengthUnitID = value; }
		}
		public Int32 TypeID
		{
			get { return mTypeID; }
			set { mIsChanges = true; mTypeID = value; }
		}
		public Decimal MaxHeat
		{
			get { return mMaxHeat; }
			set { mIsChanges = true; mMaxHeat = value; }
		}
		public Boolean IsDefault
		{
			get { return mIsDefault; }
			set { mIsChanges = true; mIsDefault = value; }
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

	public partial class CWH_RowLocation
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
		public List<CVarWH_RowLocation> lstCVarWH_RowLocation = new List<CVarWH_RowLocation>();
		public List<CPKWH_RowLocation> lstDeletedCPKWH_RowLocation = new List<CPKWH_RowLocation>();
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
		public Exception GetItem(Int32 ID)
		{
			return DataFill(Convert.ToString(ID), false);
		}
		private Exception DataFill(string Param, Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarWH_RowLocation.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_RowLocation";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_RowLocation";
					Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
					Com.Parameters[0].Value = Convert.ToInt32(Param);
				}
				Com.Transaction = tr;
				Com.Connection = Con;
				dr = Com.ExecuteReader();
				try
				{
					while (dr.Read())
					{
						/*Start DataReader*/
						CVarWH_RowLocation ObjCVarWH_RowLocation = new CVarWH_RowLocation();
						ObjCVarWH_RowLocation.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_RowLocation.mRowID = Convert.ToInt32(dr["RowID"].ToString());
						ObjCVarWH_RowLocation.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarWH_RowLocation.mLevelNumber = Convert.ToString(dr["LevelNumber"].ToString());
						ObjCVarWH_RowLocation.mTrayNumber = Convert.ToString(dr["TrayNumber"].ToString());
						ObjCVarWH_RowLocation.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
						ObjCVarWH_RowLocation.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
						ObjCVarWH_RowLocation.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
						ObjCVarWH_RowLocation.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
						ObjCVarWH_RowLocation.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
						ObjCVarWH_RowLocation.mPickupMethodID = Convert.ToInt32(dr["PickupMethodID"].ToString());
						ObjCVarWH_RowLocation.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_RowLocation.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_RowLocation.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_RowLocation.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_RowLocation.mIsUsed = Convert.ToBoolean(dr["IsUsed"].ToString());
						ObjCVarWH_RowLocation.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
						ObjCVarWH_RowLocation.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
						ObjCVarWH_RowLocation.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
						ObjCVarWH_RowLocation.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						ObjCVarWH_RowLocation.mMaxHeat = Convert.ToDecimal(dr["MaxHeat"].ToString());
						ObjCVarWH_RowLocation.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						lstCVarWH_RowLocation.Add(ObjCVarWH_RowLocation);
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
			lstCVarWH_RowLocation.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_RowLocation";
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
						CVarWH_RowLocation ObjCVarWH_RowLocation = new CVarWH_RowLocation();
						ObjCVarWH_RowLocation.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_RowLocation.mRowID = Convert.ToInt32(dr["RowID"].ToString());
						ObjCVarWH_RowLocation.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarWH_RowLocation.mLevelNumber = Convert.ToString(dr["LevelNumber"].ToString());
						ObjCVarWH_RowLocation.mTrayNumber = Convert.ToString(dr["TrayNumber"].ToString());
						ObjCVarWH_RowLocation.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
						ObjCVarWH_RowLocation.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
						ObjCVarWH_RowLocation.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
						ObjCVarWH_RowLocation.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
						ObjCVarWH_RowLocation.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
						ObjCVarWH_RowLocation.mPickupMethodID = Convert.ToInt32(dr["PickupMethodID"].ToString());
						ObjCVarWH_RowLocation.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_RowLocation.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_RowLocation.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_RowLocation.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_RowLocation.mIsUsed = Convert.ToBoolean(dr["IsUsed"].ToString());
						ObjCVarWH_RowLocation.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
						ObjCVarWH_RowLocation.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
						ObjCVarWH_RowLocation.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
						ObjCVarWH_RowLocation.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						ObjCVarWH_RowLocation.mMaxHeat = Convert.ToDecimal(dr["MaxHeat"].ToString());
						ObjCVarWH_RowLocation.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_RowLocation.Add(ObjCVarWH_RowLocation);
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
		#region "Common Methods"
		private void BeginTrans(SqlCommand Com, SqlConnection Con)
		{

			tr = Con.BeginTransaction(IsolationLevel.Serializable);
			Com.CommandType = CommandType.StoredProcedure;
		}

		private void EndTrans(SqlCommand Com, SqlConnection Con)
		{

			Com.Transaction = tr;
			Com.Connection = Con;
			Com.ExecuteNonQuery();
			tr.Commit();
		}

		#endregion
		#region "Set List Method"
		private Exception SetList(string WhereClause, Boolean IsDelete)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				if (IsDelete == true)
					Com.CommandText = "[dbo].DeleteListWH_RowLocation";
				else
					Com.CommandText = "[dbo].UpdateListWH_RowLocation";
				Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
				BeginTrans(Com, Con);
				Com.Parameters[0].Value = WhereClause;
				EndTrans(Com, Con);
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
		#region "Delete Methods"
		public Exception DeleteItem(List<CPKWH_RowLocation> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_RowLocation";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_RowLocation ObjCPKWH_RowLocation in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_RowLocation.ID);
					EndTrans(Com, Con);
				}
			}
			catch (Exception ex)
			{
				Exp = ex;
			}
			finally
			{
				Con.Close();
				Con.Dispose();
				DeleteList.Clear();
			}
			return Exp;
		}

		public Exception DeleteList(string WhereClause)
		{

			return SetList(WhereClause, true);
		}

		#endregion
		#region "Save Methods"
		public Exception SaveMethod(List<CVarWH_RowLocation> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@RowID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@LevelNumber", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@TrayNumber", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@MaxWeight", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@WeightUnitID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@MaxVolume", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@VolumeUnitID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@StatusID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PickupMethodID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@IsUsed", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@LocationLength", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@LocationWidth", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@LengthUnitID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@TypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@MaxHeat", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@IsDefault", SqlDbType.Bit));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_RowLocation ObjCVarWH_RowLocation in SaveList)
				{
					if (ObjCVarWH_RowLocation.mIsChanges == true)
					{
						if (ObjCVarWH_RowLocation.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_RowLocation";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_RowLocation.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_RowLocation";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_RowLocation.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_RowLocation.ID;
						}
						Com.Parameters["@RowID"].Value = ObjCVarWH_RowLocation.RowID;
						Com.Parameters["@Code"].Value = ObjCVarWH_RowLocation.Code;
						Com.Parameters["@LevelNumber"].Value = ObjCVarWH_RowLocation.LevelNumber;
						Com.Parameters["@TrayNumber"].Value = ObjCVarWH_RowLocation.TrayNumber;
						Com.Parameters["@MaxWeight"].Value = ObjCVarWH_RowLocation.MaxWeight;
						Com.Parameters["@WeightUnitID"].Value = ObjCVarWH_RowLocation.WeightUnitID;
						Com.Parameters["@MaxVolume"].Value = ObjCVarWH_RowLocation.MaxVolume;
						Com.Parameters["@VolumeUnitID"].Value = ObjCVarWH_RowLocation.VolumeUnitID;
						Com.Parameters["@StatusID"].Value = ObjCVarWH_RowLocation.StatusID;
						Com.Parameters["@PickupMethodID"].Value = ObjCVarWH_RowLocation.PickupMethodID;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_RowLocation.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_RowLocation.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_RowLocation.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_RowLocation.ModificationDate;
						Com.Parameters["@IsUsed"].Value = ObjCVarWH_RowLocation.IsUsed;
						Com.Parameters["@LocationLength"].Value = ObjCVarWH_RowLocation.LocationLength;
						Com.Parameters["@LocationWidth"].Value = ObjCVarWH_RowLocation.LocationWidth;
						Com.Parameters["@LengthUnitID"].Value = ObjCVarWH_RowLocation.LengthUnitID;
						Com.Parameters["@TypeID"].Value = ObjCVarWH_RowLocation.TypeID;
						Com.Parameters["@MaxHeat"].Value = ObjCVarWH_RowLocation.MaxHeat;
						Com.Parameters["@IsDefault"].Value = ObjCVarWH_RowLocation.IsDefault;
						EndTrans(Com, Con);
						if (ObjCVarWH_RowLocation.ID == 0)
						{
							ObjCVarWH_RowLocation.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_RowLocation.mIsChanges = false;
					}
				}
			}
			catch (Exception ex)
			{
				Exp = ex;
				if (tr != null)
					tr.Rollback();
			}
			finally
			{
				Con.Close();
				Con.Dispose();
			}
			return Exp;
		}
		#endregion
		#region "Update Methods"
		public Exception UpdateList(string UpdateClause)
		{

			return SetList(UpdateClause, false);
		}

		#endregion
	}

}
