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
	public class CPKWH_ItemKitting
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
	public partial class CVarWH_ItemKitting : CPKWH_ItemKitting
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mItemID;
		internal DateTime mDateFrom;
		internal DateTime mDateTo;
		internal String mName;
		internal String mLocalName;
		internal String mNotes;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		#endregion

		#region "Methods"
		public Int32 ItemID
		{
			get { return mItemID; }
			set { mIsChanges = true; mItemID = value; }
		}
		public DateTime DateFrom
		{
			get { return mDateFrom; }
			set { mIsChanges = true; mDateFrom = value; }
		}
		public DateTime DateTo
		{
			get { return mDateTo; }
			set { mIsChanges = true; mDateTo = value; }
		}
		public String Name
		{
			get { return mName; }
			set { mIsChanges = true; mName = value; }
		}
		public String LocalName
		{
			get { return mLocalName; }
			set { mIsChanges = true; mLocalName = value; }
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

	public partial class CWH_ItemKitting
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
		public List<CVarWH_ItemKitting> lstCVarWH_ItemKitting = new List<CVarWH_ItemKitting>();
		public List<CPKWH_ItemKitting> lstDeletedCPKWH_ItemKitting = new List<CPKWH_ItemKitting>();
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
			lstCVarWH_ItemKitting.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_ItemKitting";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_ItemKitting";
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
						CVarWH_ItemKitting ObjCVarWH_ItemKitting = new CVarWH_ItemKitting();
						ObjCVarWH_ItemKitting.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_ItemKitting.mItemID = Convert.ToInt32(dr["ItemID"].ToString());
						ObjCVarWH_ItemKitting.mDateFrom = Convert.ToDateTime(dr["DateFrom"].ToString());
						ObjCVarWH_ItemKitting.mDateTo = Convert.ToDateTime(dr["DateTo"].ToString());
						ObjCVarWH_ItemKitting.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarWH_ItemKitting.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarWH_ItemKitting.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarWH_ItemKitting.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_ItemKitting.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_ItemKitting.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_ItemKitting.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						lstCVarWH_ItemKitting.Add(ObjCVarWH_ItemKitting);
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
			lstCVarWH_ItemKitting.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_ItemKitting";
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
						CVarWH_ItemKitting ObjCVarWH_ItemKitting = new CVarWH_ItemKitting();
						ObjCVarWH_ItemKitting.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_ItemKitting.mItemID = Convert.ToInt32(dr["ItemID"].ToString());
						ObjCVarWH_ItemKitting.mDateFrom = Convert.ToDateTime(dr["DateFrom"].ToString());
						ObjCVarWH_ItemKitting.mDateTo = Convert.ToDateTime(dr["DateTo"].ToString());
						ObjCVarWH_ItemKitting.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarWH_ItemKitting.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarWH_ItemKitting.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarWH_ItemKitting.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_ItemKitting.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_ItemKitting.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_ItemKitting.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_ItemKitting.Add(ObjCVarWH_ItemKitting);
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
					Com.CommandText = "[dbo].DeleteListWH_ItemKitting";
				else
					Com.CommandText = "[dbo].UpdateListWH_ItemKitting";
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
		public Exception DeleteItem(List<CPKWH_ItemKitting> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_ItemKitting";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_ItemKitting ObjCPKWH_ItemKitting in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_ItemKitting.ID);
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
		public Exception SaveMethod(List<CVarWH_ItemKitting> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@DateFrom", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@DateTo", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_ItemKitting ObjCVarWH_ItemKitting in SaveList)
				{
					if (ObjCVarWH_ItemKitting.mIsChanges == true)
					{
						if (ObjCVarWH_ItemKitting.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_ItemKitting";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_ItemKitting.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_ItemKitting";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_ItemKitting.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_ItemKitting.ID;
						}
						Com.Parameters["@ItemID"].Value = ObjCVarWH_ItemKitting.ItemID;
						Com.Parameters["@DateFrom"].Value = ObjCVarWH_ItemKitting.DateFrom;
						Com.Parameters["@DateTo"].Value = ObjCVarWH_ItemKitting.DateTo;
						Com.Parameters["@Name"].Value = ObjCVarWH_ItemKitting.Name;
						Com.Parameters["@LocalName"].Value = ObjCVarWH_ItemKitting.LocalName;
						Com.Parameters["@Notes"].Value = ObjCVarWH_ItemKitting.Notes;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_ItemKitting.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_ItemKitting.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_ItemKitting.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_ItemKitting.ModificationDate;
						EndTrans(Com, Con);
						if (ObjCVarWH_ItemKitting.ID == 0)
						{
							ObjCVarWH_ItemKitting.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_ItemKitting.mIsChanges = false;
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