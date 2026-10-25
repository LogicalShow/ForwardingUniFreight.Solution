using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Generated
{
	[Serializable]
	public class CPKWH_ItemKittingDetails
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
	public partial class CVarWH_ItemKittingDetails : CPKWH_ItemKittingDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mMasterID;
		internal Int32 mDetailItemID;
		internal Int32 mQty;
		#endregion

		#region "Methods"
		public Int32 MasterID
		{
			get { return mMasterID; }
			set { mIsChanges = true; mMasterID = value; }
		}
		public Int32 DetailItemID
		{
			get { return mDetailItemID; }
			set { mIsChanges = true; mDetailItemID = value; }
		}
		public Int32 Qty
		{
			get { return mQty; }
			set { mIsChanges = true; mQty = value; }
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

	public partial class CWH_ItemKittingDetails
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
		public List<CVarWH_ItemKittingDetails> lstCVarWH_ItemKittingDetails = new List<CVarWH_ItemKittingDetails>();
		public List<CPKWH_ItemKittingDetails> lstDeletedCPKWH_ItemKittingDetails = new List<CPKWH_ItemKittingDetails>();
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
			lstCVarWH_ItemKittingDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_ItemKittingDetails";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_ItemKittingDetails";
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
						CVarWH_ItemKittingDetails ObjCVarWH_ItemKittingDetails = new CVarWH_ItemKittingDetails();
						ObjCVarWH_ItemKittingDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_ItemKittingDetails.mMasterID = Convert.ToInt32(dr["MasterID"].ToString());
						ObjCVarWH_ItemKittingDetails.mDetailItemID = Convert.ToInt32(dr["DetailItemID"].ToString());
						ObjCVarWH_ItemKittingDetails.mQty = Convert.ToInt32(dr["Qty"].ToString());
						lstCVarWH_ItemKittingDetails.Add(ObjCVarWH_ItemKittingDetails);
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
			lstCVarWH_ItemKittingDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_ItemKittingDetails";
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
						CVarWH_ItemKittingDetails ObjCVarWH_ItemKittingDetails = new CVarWH_ItemKittingDetails();
						ObjCVarWH_ItemKittingDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_ItemKittingDetails.mMasterID = Convert.ToInt32(dr["MasterID"].ToString());
						ObjCVarWH_ItemKittingDetails.mDetailItemID = Convert.ToInt32(dr["DetailItemID"].ToString());
						ObjCVarWH_ItemKittingDetails.mQty = Convert.ToInt32(dr["Qty"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_ItemKittingDetails.Add(ObjCVarWH_ItemKittingDetails);
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
					Com.CommandText = "[dbo].DeleteListWH_ItemKittingDetails";
				else
					Com.CommandText = "[dbo].UpdateListWH_ItemKittingDetails";
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
		public Exception DeleteItem(List<CPKWH_ItemKittingDetails> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_ItemKittingDetails";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_ItemKittingDetails ObjCPKWH_ItemKittingDetails in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_ItemKittingDetails.ID);
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
		public Exception SaveMethod(List<CVarWH_ItemKittingDetails> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@MasterID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@DetailItemID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Int));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_ItemKittingDetails ObjCVarWH_ItemKittingDetails in SaveList)
				{
					if (ObjCVarWH_ItemKittingDetails.mIsChanges == true)
					{
						if (ObjCVarWH_ItemKittingDetails.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_ItemKittingDetails";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_ItemKittingDetails.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_ItemKittingDetails";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_ItemKittingDetails.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_ItemKittingDetails.ID;
						}
						Com.Parameters["@MasterID"].Value = ObjCVarWH_ItemKittingDetails.MasterID;
						Com.Parameters["@DetailItemID"].Value = ObjCVarWH_ItemKittingDetails.DetailItemID;
						Com.Parameters["@Qty"].Value = ObjCVarWH_ItemKittingDetails.Qty;
						EndTrans(Com, Con);
						if (ObjCVarWH_ItemKittingDetails.ID == 0)
						{
							ObjCVarWH_ItemKittingDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_ItemKittingDetails.mIsChanges = false;
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