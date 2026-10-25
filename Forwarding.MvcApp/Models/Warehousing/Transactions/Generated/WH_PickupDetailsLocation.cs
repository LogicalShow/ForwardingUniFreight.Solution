using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
	[Serializable]
	public class CPKWH_PickupDetailsLocation
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
	public partial class CVarWH_PickupDetailsLocation : CPKWH_PickupDetailsLocation
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mPickupDetailsID;
		internal Int64 mReceiveDetailsID;
		internal Decimal mPickedQuantity;
		internal String mNotes;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Int64 mVehicleActionID;
		internal Decimal mPDL_DemandedQuantity;
		internal Int32 mPDL_LocationID;
		internal String mPDL_PalletID;
		internal Int64 mItemBalanceID;
		#endregion

		#region "Methods"
		public Int64 PickupDetailsID
		{
			get { return mPickupDetailsID; }
			set { mIsChanges = true; mPickupDetailsID = value; }
		}
		public Int64 ReceiveDetailsID
		{
			get { return mReceiveDetailsID; }
			set { mIsChanges = true; mReceiveDetailsID = value; }
		}
		public Decimal PickedQuantity
		{
			get { return mPickedQuantity; }
			set { mIsChanges = true; mPickedQuantity = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mIsChanges = true; mNotes = value; }
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
		public Int64 VehicleActionID
		{
			get { return mVehicleActionID; }
			set { mIsChanges = true; mVehicleActionID = value; }
		}
		public Decimal PDL_DemandedQuantity
		{
			get { return mPDL_DemandedQuantity; }
			set { mIsChanges = true; mPDL_DemandedQuantity = value; }
		}
		public Int32 PDL_LocationID
		{
			get { return mPDL_LocationID; }
			set { mIsChanges = true; mPDL_LocationID = value; }
		}
		public String PDL_PalletID
		{
			get { return mPDL_PalletID; }
			set { mIsChanges = true; mPDL_PalletID = value; }
		}
		public Int64 ItemBalanceID
		{
			get { return mItemBalanceID; }
			set { mIsChanges = true; mItemBalanceID = value; }
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

	public partial class CWH_PickupDetailsLocation
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
		public List<CVarWH_PickupDetailsLocation> lstCVarWH_PickupDetailsLocation = new List<CVarWH_PickupDetailsLocation>();
		public List<CPKWH_PickupDetailsLocation> lstDeletedCPKWH_PickupDetailsLocation = new List<CPKWH_PickupDetailsLocation>();
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
		public Exception GetItem(Int64 ID)
		{
			return DataFill(Convert.ToString(ID), false);
		}
		private Exception DataFill(string Param, Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarWH_PickupDetailsLocation.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_PickupDetailsLocation";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_PickupDetailsLocation";
					Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
					Com.Parameters[0].Value = Convert.ToInt64(Param);
				}
				Com.Transaction = tr;
				Com.Connection = Con;
				dr = Com.ExecuteReader();
				try
				{
					while (dr.Read())
					{
						/*Start DataReader*/
						CVarWH_PickupDetailsLocation ObjCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
						ObjCVarWH_PickupDetailsLocation.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPickupDetailsID = Convert.ToInt64(dr["PickupDetailsID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPickedQuantity = Convert.ToDecimal(dr["PickedQuantity"].ToString());
						ObjCVarWH_PickupDetailsLocation.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarWH_PickupDetailsLocation.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_PickupDetailsLocation.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_PickupDetailsLocation.mVehicleActionID = Convert.ToInt64(dr["VehicleActionID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPDL_DemandedQuantity = Convert.ToDecimal(dr["PDL_DemandedQuantity"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPDL_LocationID = Convert.ToInt32(dr["PDL_LocationID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPDL_PalletID = Convert.ToString(dr["PDL_PalletID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mItemBalanceID = Convert.ToInt64(dr["ItemBalanceID"].ToString());
						lstCVarWH_PickupDetailsLocation.Add(ObjCVarWH_PickupDetailsLocation);
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
			lstCVarWH_PickupDetailsLocation.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_PickupDetailsLocation";
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
						CVarWH_PickupDetailsLocation ObjCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
						ObjCVarWH_PickupDetailsLocation.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPickupDetailsID = Convert.ToInt64(dr["PickupDetailsID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPickedQuantity = Convert.ToDecimal(dr["PickedQuantity"].ToString());
						ObjCVarWH_PickupDetailsLocation.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarWH_PickupDetailsLocation.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_PickupDetailsLocation.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_PickupDetailsLocation.mVehicleActionID = Convert.ToInt64(dr["VehicleActionID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPDL_DemandedQuantity = Convert.ToDecimal(dr["PDL_DemandedQuantity"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPDL_LocationID = Convert.ToInt32(dr["PDL_LocationID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mPDL_PalletID = Convert.ToString(dr["PDL_PalletID"].ToString());
						ObjCVarWH_PickupDetailsLocation.mItemBalanceID = Convert.ToInt64(dr["ItemBalanceID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_PickupDetailsLocation.Add(ObjCVarWH_PickupDetailsLocation);
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
					Com.CommandText = "[dbo].DeleteListWH_PickupDetailsLocation";
				else
					Com.CommandText = "[dbo].UpdateListWH_PickupDetailsLocation";
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
		public Exception DeleteItem(List<CPKWH_PickupDetailsLocation> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_PickupDetailsLocation";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
				foreach (CPKWH_PickupDetailsLocation ObjCPKWH_PickupDetailsLocation in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_PickupDetailsLocation.ID);
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
		public Exception SaveMethod(List<CVarWH_PickupDetailsLocation> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@PickupDetailsID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@ReceiveDetailsID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@PickedQuantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@VehicleActionID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@PDL_DemandedQuantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@PDL_LocationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PDL_PalletID", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@ItemBalanceID", SqlDbType.BigInt));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_PickupDetailsLocation ObjCVarWH_PickupDetailsLocation in SaveList)
				{
					if (ObjCVarWH_PickupDetailsLocation.mIsChanges == true)
					{
						if (ObjCVarWH_PickupDetailsLocation.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_PickupDetailsLocation";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_PickupDetailsLocation.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_PickupDetailsLocation";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_PickupDetailsLocation.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_PickupDetailsLocation.ID;
						}
						Com.Parameters["@PickupDetailsID"].Value = ObjCVarWH_PickupDetailsLocation.PickupDetailsID;
						Com.Parameters["@ReceiveDetailsID"].Value = ObjCVarWH_PickupDetailsLocation.ReceiveDetailsID;
						Com.Parameters["@PickedQuantity"].Value = ObjCVarWH_PickupDetailsLocation.PickedQuantity;
						Com.Parameters["@Notes"].Value = ObjCVarWH_PickupDetailsLocation.Notes;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_PickupDetailsLocation.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_PickupDetailsLocation.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_PickupDetailsLocation.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_PickupDetailsLocation.ModificationDate;
						Com.Parameters["@VehicleActionID"].Value = ObjCVarWH_PickupDetailsLocation.VehicleActionID;
						Com.Parameters["@PDL_DemandedQuantity"].Value = ObjCVarWH_PickupDetailsLocation.PDL_DemandedQuantity;
						Com.Parameters["@PDL_LocationID"].Value = ObjCVarWH_PickupDetailsLocation.PDL_LocationID;
						Com.Parameters["@PDL_PalletID"].Value = ObjCVarWH_PickupDetailsLocation.PDL_PalletID;
						Com.Parameters["@ItemBalanceID"].Value = ObjCVarWH_PickupDetailsLocation.ItemBalanceID;
						EndTrans(Com, Con);
						if (ObjCVarWH_PickupDetailsLocation.ID == 0)
						{
							ObjCVarWH_PickupDetailsLocation.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_PickupDetailsLocation.mIsChanges = false;
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
