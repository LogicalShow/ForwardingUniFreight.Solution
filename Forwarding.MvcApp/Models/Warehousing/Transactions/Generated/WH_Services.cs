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
	public class CPKWH_Services
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
	public partial class CVarWH_Services : CPKWH_Services
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal String mName;
		internal String mNameLocal;
		internal Decimal mCost;
		internal Decimal mSelling;
		internal Int32 mCalcTypeID;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Int32 mChargeTypeID;
		#endregion

		#region "Methods"
		public String Name
		{
			get { return mName; }
			set { mIsChanges = true; mName = value; }
		}
		public String NameLocal
		{
			get { return mNameLocal; }
			set { mIsChanges = true; mNameLocal = value; }
		}
		public Decimal Cost
		{
			get { return mCost; }
			set { mIsChanges = true; mCost = value; }
		}
		public Decimal Selling
		{
			get { return mSelling; }
			set { mIsChanges = true; mSelling = value; }
		}
		public Int32 CalcTypeID
		{
			get { return mCalcTypeID; }
			set { mIsChanges = true; mCalcTypeID = value; }
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
		public Int32 ChargeTypeID
		{
			get { return mChargeTypeID; }
			set { mIsChanges = true; mChargeTypeID = value; }
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

	public partial class CWH_Services
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
		public List<CVarWH_Services> lstCVarWH_Services = new List<CVarWH_Services>();
		public List<CPKWH_Services> lstDeletedCPKWH_Services = new List<CPKWH_Services>();
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
			lstCVarWH_Services.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_Services";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_Services";
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
						CVarWH_Services ObjCVarWH_Services = new CVarWH_Services();
						ObjCVarWH_Services.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_Services.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarWH_Services.mNameLocal = Convert.ToString(dr["NameLocal"].ToString());
						ObjCVarWH_Services.mCost = Convert.ToDecimal(dr["Cost"].ToString());
						ObjCVarWH_Services.mSelling = Convert.ToDecimal(dr["Selling"].ToString());
						ObjCVarWH_Services.mCalcTypeID = Convert.ToInt32(dr["CalcTypeID"].ToString());
						ObjCVarWH_Services.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_Services.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_Services.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_Services.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_Services.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						lstCVarWH_Services.Add(ObjCVarWH_Services);
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
			lstCVarWH_Services.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_Services";
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
						CVarWH_Services ObjCVarWH_Services = new CVarWH_Services();
						ObjCVarWH_Services.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_Services.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarWH_Services.mNameLocal = Convert.ToString(dr["NameLocal"].ToString());
						ObjCVarWH_Services.mCost = Convert.ToDecimal(dr["Cost"].ToString());
						ObjCVarWH_Services.mSelling = Convert.ToDecimal(dr["Selling"].ToString());
						ObjCVarWH_Services.mCalcTypeID = Convert.ToInt32(dr["CalcTypeID"].ToString());
						ObjCVarWH_Services.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_Services.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_Services.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_Services.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_Services.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_Services.Add(ObjCVarWH_Services);
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
					Com.CommandText = "[dbo].DeleteListWH_Services";
				else
					Com.CommandText = "[dbo].UpdateListWH_Services";
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
		public Exception DeleteItem(List<CPKWH_Services> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_Services";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_Services ObjCPKWH_Services in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_Services.ID);
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
		public Exception SaveMethod(List<CVarWH_Services> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@NameLocal", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@Selling", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@CalcTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_Services ObjCVarWH_Services in SaveList)
				{
					if (ObjCVarWH_Services.mIsChanges == true)
					{
						if (ObjCVarWH_Services.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_Services";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_Services.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_Services";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_Services.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_Services.ID;
						}
						Com.Parameters["@Name"].Value = ObjCVarWH_Services.Name;
						Com.Parameters["@NameLocal"].Value = ObjCVarWH_Services.NameLocal;
						Com.Parameters["@Cost"].Value = ObjCVarWH_Services.Cost;
						Com.Parameters["@Selling"].Value = ObjCVarWH_Services.Selling;
						Com.Parameters["@CalcTypeID"].Value = ObjCVarWH_Services.CalcTypeID;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_Services.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_Services.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_Services.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_Services.ModificationDate;
						Com.Parameters["@ChargeTypeID"].Value = ObjCVarWH_Services.ChargeTypeID;
						EndTrans(Com, Con);
						if (ObjCVarWH_Services.ID == 0)
						{
							ObjCVarWH_Services.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_Services.mIsChanges = false;
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