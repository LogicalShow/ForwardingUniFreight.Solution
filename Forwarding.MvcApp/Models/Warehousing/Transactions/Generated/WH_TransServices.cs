using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
	[Serializable]
	public class CPKWH_TransServices
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
	public partial class CVarWH_TransServices : CPKWH_TransServices
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mTransSourceID;
		internal Int32 mDirection;
		internal Int32 mServiceID;
		internal Decimal mServiceCost;
		internal Decimal mServiceSelling;
		internal Decimal mQuantity;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal String mNotes;
		#endregion

		#region "Methods"
		public Int32 TransSourceID
		{
			get { return mTransSourceID; }
			set { mIsChanges = true; mTransSourceID = value; }
		}
		public Int32 Direction
		{
			get { return mDirection; }
			set { mIsChanges = true; mDirection = value; }
		}
		public Int32 ServiceID
		{
			get { return mServiceID; }
			set { mIsChanges = true; mServiceID = value; }
		}
		public Decimal ServiceCost
		{
			get { return mServiceCost; }
			set { mIsChanges = true; mServiceCost = value; }
		}
		public Decimal ServiceSelling
		{
			get { return mServiceSelling; }
			set { mIsChanges = true; mServiceSelling = value; }
		}
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mIsChanges = true; mQuantity = value; }
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
		public String Notes
		{
			get { return mNotes; }
			set { mIsChanges = true; mNotes = value; }
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

	public partial class CWH_TransServices
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
		public List<CVarWH_TransServices> lstCVarWH_TransServices = new List<CVarWH_TransServices>();
		public List<CPKWH_TransServices> lstDeletedCPKWH_TransServices = new List<CPKWH_TransServices>();
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
			lstCVarWH_TransServices.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_TransServices";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_TransServices";
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
						CVarWH_TransServices ObjCVarWH_TransServices = new CVarWH_TransServices();
						ObjCVarWH_TransServices.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_TransServices.mTransSourceID = Convert.ToInt32(dr["TransSourceID"].ToString());
						ObjCVarWH_TransServices.mDirection = Convert.ToInt32(dr["Direction"].ToString());
						ObjCVarWH_TransServices.mServiceID = Convert.ToInt32(dr["ServiceID"].ToString());
						ObjCVarWH_TransServices.mServiceCost = Convert.ToDecimal(dr["ServiceCost"].ToString());
						ObjCVarWH_TransServices.mServiceSelling = Convert.ToDecimal(dr["ServiceSelling"].ToString());
						ObjCVarWH_TransServices.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarWH_TransServices.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_TransServices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_TransServices.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_TransServices.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_TransServices.mNotes = Convert.ToString(dr["Notes"].ToString());
						lstCVarWH_TransServices.Add(ObjCVarWH_TransServices);
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
			lstCVarWH_TransServices.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_TransServices";
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
						CVarWH_TransServices ObjCVarWH_TransServices = new CVarWH_TransServices();
						ObjCVarWH_TransServices.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_TransServices.mTransSourceID = Convert.ToInt32(dr["TransSourceID"].ToString());
						ObjCVarWH_TransServices.mDirection = Convert.ToInt32(dr["Direction"].ToString());
						ObjCVarWH_TransServices.mServiceID = Convert.ToInt32(dr["ServiceID"].ToString());
						ObjCVarWH_TransServices.mServiceCost = Convert.ToDecimal(dr["ServiceCost"].ToString());
						ObjCVarWH_TransServices.mServiceSelling = Convert.ToDecimal(dr["ServiceSelling"].ToString());
						ObjCVarWH_TransServices.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarWH_TransServices.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_TransServices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_TransServices.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_TransServices.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_TransServices.mNotes = Convert.ToString(dr["Notes"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_TransServices.Add(ObjCVarWH_TransServices);
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
					Com.CommandText = "[dbo].DeleteListWH_TransServices";
				else
					Com.CommandText = "[dbo].UpdateListWH_TransServices";
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
		public Exception DeleteItem(List<CPKWH_TransServices> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_TransServices";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_TransServices ObjCPKWH_TransServices in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_TransServices.ID);
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
		public Exception SaveMethod(List<CVarWH_TransServices> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@TransSourceID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Direction", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ServiceID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ServiceCost", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@ServiceSelling", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_TransServices ObjCVarWH_TransServices in SaveList)
				{
					if (ObjCVarWH_TransServices.mIsChanges == true)
					{
						if (ObjCVarWH_TransServices.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_TransServices";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_TransServices.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_TransServices";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_TransServices.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_TransServices.ID;
						}
						Com.Parameters["@TransSourceID"].Value = ObjCVarWH_TransServices.TransSourceID;
						Com.Parameters["@Direction"].Value = ObjCVarWH_TransServices.Direction;
						Com.Parameters["@ServiceID"].Value = ObjCVarWH_TransServices.ServiceID;
						Com.Parameters["@ServiceCost"].Value = ObjCVarWH_TransServices.ServiceCost;
						Com.Parameters["@ServiceSelling"].Value = ObjCVarWH_TransServices.ServiceSelling;
						Com.Parameters["@Quantity"].Value = ObjCVarWH_TransServices.Quantity;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_TransServices.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_TransServices.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_TransServices.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_TransServices.ModificationDate;
						Com.Parameters["@Notes"].Value = ObjCVarWH_TransServices.Notes;
						EndTrans(Com, Con);
						if (ObjCVarWH_TransServices.ID == 0)
						{
							ObjCVarWH_TransServices.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_TransServices.mIsChanges = false;
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