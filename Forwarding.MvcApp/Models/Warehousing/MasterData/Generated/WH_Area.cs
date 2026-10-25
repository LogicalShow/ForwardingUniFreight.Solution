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
	public class CPKWH_Area
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
	public partial class CVarWH_Area : CPKWH_Area
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mWarehouseID;
		internal String mName;
		internal Decimal mMaxWeight;
		internal Decimal mCurrentWeight;
		internal Decimal mAvailableWeight;
		internal Int32 mWeightUnitID;
		internal Decimal mMaxVolume;
		internal Decimal mCurrentVolume;
		internal Decimal mAvailableVolume;
		internal Int32 mVolumeUnitID;
		internal Boolean mIsDefault;
		#endregion

		#region "Methods"
		public Int32 WarehouseID
		{
			get { return mWarehouseID; }
			set { mIsChanges = true; mWarehouseID = value; }
		}
		public String Name
		{
			get { return mName; }
			set { mIsChanges = true; mName = value; }
		}
		public Decimal MaxWeight
		{
			get { return mMaxWeight; }
			set { mIsChanges = true; mMaxWeight = value; }
		}
		public Decimal CurrentWeight
		{
			get { return mCurrentWeight; }
			set { mIsChanges = true; mCurrentWeight = value; }
		}
		public Decimal AvailableWeight
		{
			get { return mAvailableWeight; }
			set { mIsChanges = true; mAvailableWeight = value; }
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
		public Decimal CurrentVolume
		{
			get { return mCurrentVolume; }
			set { mIsChanges = true; mCurrentVolume = value; }
		}
		public Decimal AvailableVolume
		{
			get { return mAvailableVolume; }
			set { mIsChanges = true; mAvailableVolume = value; }
		}
		public Int32 VolumeUnitID
		{
			get { return mVolumeUnitID; }
			set { mIsChanges = true; mVolumeUnitID = value; }
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

	public partial class CWH_Area
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
		public List<CVarWH_Area> lstCVarWH_Area = new List<CVarWH_Area>();
		public List<CPKWH_Area> lstDeletedCPKWH_Area = new List<CPKWH_Area>();
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
			lstCVarWH_Area.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_Area";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_Area";
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
						CVarWH_Area ObjCVarWH_Area = new CVarWH_Area();
						ObjCVarWH_Area.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_Area.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarWH_Area.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarWH_Area.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
						ObjCVarWH_Area.mCurrentWeight = Convert.ToDecimal(dr["CurrentWeight"].ToString());
						ObjCVarWH_Area.mAvailableWeight = Convert.ToDecimal(dr["AvailableWeight"].ToString());
						ObjCVarWH_Area.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
						ObjCVarWH_Area.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
						ObjCVarWH_Area.mCurrentVolume = Convert.ToDecimal(dr["CurrentVolume"].ToString());
						ObjCVarWH_Area.mAvailableVolume = Convert.ToDecimal(dr["AvailableVolume"].ToString());
						ObjCVarWH_Area.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
						ObjCVarWH_Area.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						lstCVarWH_Area.Add(ObjCVarWH_Area);
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
			lstCVarWH_Area.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_Area";
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
						CVarWH_Area ObjCVarWH_Area = new CVarWH_Area();
						ObjCVarWH_Area.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_Area.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarWH_Area.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarWH_Area.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
						ObjCVarWH_Area.mCurrentWeight = Convert.ToDecimal(dr["CurrentWeight"].ToString());
						ObjCVarWH_Area.mAvailableWeight = Convert.ToDecimal(dr["AvailableWeight"].ToString());
						ObjCVarWH_Area.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
						ObjCVarWH_Area.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
						ObjCVarWH_Area.mCurrentVolume = Convert.ToDecimal(dr["CurrentVolume"].ToString());
						ObjCVarWH_Area.mAvailableVolume = Convert.ToDecimal(dr["AvailableVolume"].ToString());
						ObjCVarWH_Area.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
						ObjCVarWH_Area.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_Area.Add(ObjCVarWH_Area);
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
					Com.CommandText = "[dbo].DeleteListWH_Area";
				else
					Com.CommandText = "[dbo].UpdateListWH_Area";
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
		public Exception DeleteItem(List<CPKWH_Area> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_Area";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_Area ObjCPKWH_Area in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_Area.ID);
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
		public Exception SaveMethod(List<CVarWH_Area> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@WarehouseID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@MaxWeight", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@CurrentWeight", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@AvailableWeight", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@WeightUnitID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@MaxVolume", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@CurrentVolume", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@AvailableVolume", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@VolumeUnitID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@IsDefault", SqlDbType.Bit));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_Area ObjCVarWH_Area in SaveList)
				{
					if (ObjCVarWH_Area.mIsChanges == true)
					{
						if (ObjCVarWH_Area.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_Area";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_Area.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_Area";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_Area.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_Area.ID;
						}
						Com.Parameters["@WarehouseID"].Value = ObjCVarWH_Area.WarehouseID;
						Com.Parameters["@Name"].Value = ObjCVarWH_Area.Name;
						Com.Parameters["@MaxWeight"].Value = ObjCVarWH_Area.MaxWeight;
						Com.Parameters["@CurrentWeight"].Value = ObjCVarWH_Area.CurrentWeight;
						Com.Parameters["@AvailableWeight"].Value = ObjCVarWH_Area.AvailableWeight;
						Com.Parameters["@WeightUnitID"].Value = ObjCVarWH_Area.WeightUnitID;
						Com.Parameters["@MaxVolume"].Value = ObjCVarWH_Area.MaxVolume;
						Com.Parameters["@CurrentVolume"].Value = ObjCVarWH_Area.CurrentVolume;
						Com.Parameters["@AvailableVolume"].Value = ObjCVarWH_Area.AvailableVolume;
						Com.Parameters["@VolumeUnitID"].Value = ObjCVarWH_Area.VolumeUnitID;
						Com.Parameters["@IsDefault"].Value = ObjCVarWH_Area.IsDefault;
						EndTrans(Com, Con);
						if (ObjCVarWH_Area.ID == 0)
						{
							ObjCVarWH_Area.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_Area.mIsChanges = false;
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
