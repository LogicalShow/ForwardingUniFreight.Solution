using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Administration.Security.Generated
{
	[Serializable]
	public class CPKWH_UsersWarehouses
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
	public partial class CVarWH_UsersWarehouses : CPKWH_UsersWarehouses
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mUserID;
		internal Int32 mWarehouseID;
		internal Boolean mIsDefault;
		internal Int32 mModificatorUserID;
		internal String mModificationDate;
		#endregion

		#region "Methods"
		public Int32 UserID
		{
			get { return mUserID; }
			set { mIsChanges = true; mUserID = value; }
		}
		public Int32 WarehouseID
		{
			get { return mWarehouseID; }
			set { mIsChanges = true; mWarehouseID = value; }
		}
		public Boolean IsDefault
		{
			get { return mIsDefault; }
			set { mIsChanges = true; mIsDefault = value; }
		}
		public Int32 ModificatorUserID
		{
			get { return mModificatorUserID; }
			set { mIsChanges = true; mModificatorUserID = value; }
		}
		public String ModificationDate
		{
			get { return mModificationDate; }
			set { mIsChanges = true; mModificationDate = value; }
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

	public partial class CWH_UsersWarehouses
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
		public List<CVarWH_UsersWarehouses> lstCVarWH_UsersWarehouses = new List<CVarWH_UsersWarehouses>();
		public List<CPKWH_UsersWarehouses> lstDeletedCPKWH_UsersWarehouses = new List<CPKWH_UsersWarehouses>();
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
			lstCVarWH_UsersWarehouses.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_UsersWarehouses";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_UsersWarehouses";
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
						CVarWH_UsersWarehouses ObjCVarWH_UsersWarehouses = new CVarWH_UsersWarehouses();
						ObjCVarWH_UsersWarehouses.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_UsersWarehouses.mUserID = Convert.ToInt32(dr["UserID"].ToString());
						ObjCVarWH_UsersWarehouses.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarWH_UsersWarehouses.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						ObjCVarWH_UsersWarehouses.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_UsersWarehouses.mModificationDate = Convert.ToString(dr["ModificationDate"].ToString());
						lstCVarWH_UsersWarehouses.Add(ObjCVarWH_UsersWarehouses);
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
			lstCVarWH_UsersWarehouses.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_UsersWarehouses";
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
						CVarWH_UsersWarehouses ObjCVarWH_UsersWarehouses = new CVarWH_UsersWarehouses();
						ObjCVarWH_UsersWarehouses.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_UsersWarehouses.mUserID = Convert.ToInt32(dr["UserID"].ToString());
						ObjCVarWH_UsersWarehouses.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarWH_UsersWarehouses.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						ObjCVarWH_UsersWarehouses.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_UsersWarehouses.mModificationDate = Convert.ToString(dr["ModificationDate"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_UsersWarehouses.Add(ObjCVarWH_UsersWarehouses);
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
					Com.CommandText = "[dbo].DeleteListWH_UsersWarehouses";
				else
					Com.CommandText = "[dbo].UpdateListWH_UsersWarehouses";
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
		public Exception DeleteItem(List<CPKWH_UsersWarehouses> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_UsersWarehouses";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_UsersWarehouses ObjCPKWH_UsersWarehouses in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_UsersWarehouses.ID);
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
		public Exception SaveMethod(List<CVarWH_UsersWarehouses> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@WarehouseID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@IsDefault", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.NVarChar));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_UsersWarehouses ObjCVarWH_UsersWarehouses in SaveList)
				{
					if (ObjCVarWH_UsersWarehouses.mIsChanges == true)
					{
						if (ObjCVarWH_UsersWarehouses.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_UsersWarehouses";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_UsersWarehouses.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_UsersWarehouses";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_UsersWarehouses.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_UsersWarehouses.ID;
						}
						Com.Parameters["@UserID"].Value = ObjCVarWH_UsersWarehouses.UserID;
						Com.Parameters["@WarehouseID"].Value = ObjCVarWH_UsersWarehouses.WarehouseID;
						Com.Parameters["@IsDefault"].Value = ObjCVarWH_UsersWarehouses.IsDefault;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_UsersWarehouses.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_UsersWarehouses.ModificationDate;
						EndTrans(Com, Con);
						if (ObjCVarWH_UsersWarehouses.ID == 0)
						{
							ObjCVarWH_UsersWarehouses.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_UsersWarehouses.mIsChanges = false;
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