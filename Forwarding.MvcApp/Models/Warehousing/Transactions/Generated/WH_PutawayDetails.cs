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
	public class CPKWH_PutawayDetails
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
	public partial class CVarWH_PutawayDetails : CPKWH_PutawayDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mReceiveID;
		internal String mPalletID;
		internal Int32 mReceiveLocationID;
		internal Int32 mPutawayLocationID;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mPutawayID;
		#endregion

		#region "Methods"
		public Int32 ReceiveID
		{
			get { return mReceiveID; }
			set { mIsChanges = true; mReceiveID = value; }
		}
		public String PalletID
		{
			get { return mPalletID; }
			set { mIsChanges = true; mPalletID = value; }
		}
		public Int32 ReceiveLocationID
		{
			get { return mReceiveLocationID; }
			set { mIsChanges = true; mReceiveLocationID = value; }
		}
		public Int32 PutawayLocationID
		{
			get { return mPutawayLocationID; }
			set { mIsChanges = true; mPutawayLocationID = value; }
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
		public Int32 PutawayID
		{
			get { return mPutawayID; }
			set { mIsChanges = true; mPutawayID = value; }
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

	public partial class CWH_PutawayDetails
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
		public List<CVarWH_PutawayDetails> lstCVarWH_PutawayDetails = new List<CVarWH_PutawayDetails>();
		public List<CPKWH_PutawayDetails> lstDeletedCPKWH_PutawayDetails = new List<CPKWH_PutawayDetails>();
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
			lstCVarWH_PutawayDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_PutawayDetails";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_PutawayDetails";
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
						CVarWH_PutawayDetails ObjCVarWH_PutawayDetails = new CVarWH_PutawayDetails();
						ObjCVarWH_PutawayDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_PutawayDetails.mReceiveID = Convert.ToInt32(dr["ReceiveID"].ToString());
						ObjCVarWH_PutawayDetails.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarWH_PutawayDetails.mReceiveLocationID = Convert.ToInt32(dr["ReceiveLocationID"].ToString());
						ObjCVarWH_PutawayDetails.mPutawayLocationID = Convert.ToInt32(dr["PutawayLocationID"].ToString());
						ObjCVarWH_PutawayDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_PutawayDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_PutawayDetails.mPutawayID = Convert.ToInt32(dr["PutawayID"].ToString());
						lstCVarWH_PutawayDetails.Add(ObjCVarWH_PutawayDetails);
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
			lstCVarWH_PutawayDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_PutawayDetails";
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
						CVarWH_PutawayDetails ObjCVarWH_PutawayDetails = new CVarWH_PutawayDetails();
						ObjCVarWH_PutawayDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_PutawayDetails.mReceiveID = Convert.ToInt32(dr["ReceiveID"].ToString());
						ObjCVarWH_PutawayDetails.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarWH_PutawayDetails.mReceiveLocationID = Convert.ToInt32(dr["ReceiveLocationID"].ToString());
						ObjCVarWH_PutawayDetails.mPutawayLocationID = Convert.ToInt32(dr["PutawayLocationID"].ToString());
						ObjCVarWH_PutawayDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_PutawayDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_PutawayDetails.mPutawayID = Convert.ToInt32(dr["PutawayID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_PutawayDetails.Add(ObjCVarWH_PutawayDetails);
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
					Com.CommandText = "[dbo].DeleteListWH_PutawayDetails";
				else
					Com.CommandText = "[dbo].UpdateListWH_PutawayDetails";
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
		public Exception DeleteItem(List<CPKWH_PutawayDetails> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_PutawayDetails";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_PutawayDetails ObjCPKWH_PutawayDetails in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_PutawayDetails.ID);
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
		public Exception SaveMethod(List<CVarWH_PutawayDetails> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@ReceiveID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PalletID", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@ReceiveLocationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PutawayLocationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@PutawayID", SqlDbType.Int));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_PutawayDetails ObjCVarWH_PutawayDetails in SaveList)
				{
					if (ObjCVarWH_PutawayDetails.mIsChanges == true)
					{
						if (ObjCVarWH_PutawayDetails.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_PutawayDetails";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_PutawayDetails.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_PutawayDetails";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_PutawayDetails.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_PutawayDetails.ID;
						}
						Com.Parameters["@ReceiveID"].Value = ObjCVarWH_PutawayDetails.ReceiveID;
						Com.Parameters["@PalletID"].Value = ObjCVarWH_PutawayDetails.PalletID;
						Com.Parameters["@ReceiveLocationID"].Value = ObjCVarWH_PutawayDetails.ReceiveLocationID;
						Com.Parameters["@PutawayLocationID"].Value = ObjCVarWH_PutawayDetails.PutawayLocationID;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_PutawayDetails.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_PutawayDetails.CreationDate;
						Com.Parameters["@PutawayID"].Value = ObjCVarWH_PutawayDetails.PutawayID;
						EndTrans(Com, Con);
						if (ObjCVarWH_PutawayDetails.ID == 0)
						{
							ObjCVarWH_PutawayDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_PutawayDetails.mIsChanges = false;
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