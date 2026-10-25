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
	public class CPKWH_Putaway
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
	public partial class CVarWH_Putaway : CPKWH_Putaway
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mCodeSerial;
		internal String mCode;
		internal Int64 mReceiveID;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		#endregion

		#region "Methods"
		public Int32 CodeSerial
		{
			get { return mCodeSerial; }
			set { mIsChanges = true; mCodeSerial = value; }
		}
		public String Code
		{
			get { return mCode; }
			set { mIsChanges = true; mCode = value; }
		}
		public Int64 ReceiveID
		{
			get { return mReceiveID; }
			set { mIsChanges = true; mReceiveID = value; }
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

	public partial class CWH_Putaway
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
		public List<CVarWH_Putaway> lstCVarWH_Putaway = new List<CVarWH_Putaway>();
		public List<CPKWH_Putaway> lstDeletedCPKWH_Putaway = new List<CPKWH_Putaway>();
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
			lstCVarWH_Putaway.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_Putaway";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_Putaway";
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
						CVarWH_Putaway ObjCVarWH_Putaway = new CVarWH_Putaway();
						ObjCVarWH_Putaway.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_Putaway.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarWH_Putaway.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarWH_Putaway.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarWH_Putaway.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_Putaway.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_Putaway.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_Putaway.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						lstCVarWH_Putaway.Add(ObjCVarWH_Putaway);
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
			lstCVarWH_Putaway.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_Putaway";
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
						CVarWH_Putaway ObjCVarWH_Putaway = new CVarWH_Putaway();
						ObjCVarWH_Putaway.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_Putaway.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarWH_Putaway.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarWH_Putaway.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarWH_Putaway.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_Putaway.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_Putaway.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_Putaway.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_Putaway.Add(ObjCVarWH_Putaway);
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
					Com.CommandText = "[dbo].DeleteListWH_Putaway";
				else
					Com.CommandText = "[dbo].UpdateListWH_Putaway";
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
		public Exception DeleteItem(List<CPKWH_Putaway> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_Putaway";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_Putaway ObjCPKWH_Putaway in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_Putaway.ID);
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
		public Exception SaveMethod(List<CVarWH_Putaway> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@CodeSerial", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@ReceiveID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_Putaway ObjCVarWH_Putaway in SaveList)
				{
					if (ObjCVarWH_Putaway.mIsChanges == true)
					{
						if (ObjCVarWH_Putaway.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_Putaway";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_Putaway.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_Putaway";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_Putaway.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_Putaway.ID;
						}
						Com.Parameters["@CodeSerial"].Value = ObjCVarWH_Putaway.CodeSerial;
						Com.Parameters["@Code"].Value = ObjCVarWH_Putaway.Code;
						Com.Parameters["@ReceiveID"].Value = ObjCVarWH_Putaway.ReceiveID;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_Putaway.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_Putaway.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_Putaway.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_Putaway.ModificationDate;
						EndTrans(Com, Con);
						if (ObjCVarWH_Putaway.ID == 0)
						{
							ObjCVarWH_Putaway.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_Putaway.mIsChanges = false;
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