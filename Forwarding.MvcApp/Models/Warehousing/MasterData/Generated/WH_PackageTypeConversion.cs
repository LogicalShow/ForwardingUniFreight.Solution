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
	public class CPKWH_PackageTypeConversion
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
	public partial class CVarWH_PackageTypeConversion : CPKWH_PackageTypeConversion
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mPurchaseItemID;
		internal Int32 mFromPackageTypeID;
		internal Int32 mToPackageTypeID;
		internal Decimal mFactor;
		#endregion

		#region "Methods"
		public Int64 PurchaseItemID
		{
			get { return mPurchaseItemID; }
			set { mIsChanges = true; mPurchaseItemID = value; }
		}
		public Int32 FromPackageTypeID
		{
			get { return mFromPackageTypeID; }
			set { mIsChanges = true; mFromPackageTypeID = value; }
		}
		public Int32 ToPackageTypeID
		{
			get { return mToPackageTypeID; }
			set { mIsChanges = true; mToPackageTypeID = value; }
		}
		public Decimal Factor
		{
			get { return mFactor; }
			set { mIsChanges = true; mFactor = value; }
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

	public partial class CWH_PackageTypeConversion
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
		public List<CVarWH_PackageTypeConversion> lstCVarWH_PackageTypeConversion = new List<CVarWH_PackageTypeConversion>();
		public List<CPKWH_PackageTypeConversion> lstDeletedCPKWH_PackageTypeConversion = new List<CPKWH_PackageTypeConversion>();
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
			lstCVarWH_PackageTypeConversion.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_PackageTypeConversion";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_PackageTypeConversion";
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
						CVarWH_PackageTypeConversion ObjCVarWH_PackageTypeConversion = new CVarWH_PackageTypeConversion();
						ObjCVarWH_PackageTypeConversion.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_PackageTypeConversion.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarWH_PackageTypeConversion.mFromPackageTypeID = Convert.ToInt32(dr["FromPackageTypeID"].ToString());
						ObjCVarWH_PackageTypeConversion.mToPackageTypeID = Convert.ToInt32(dr["ToPackageTypeID"].ToString());
						ObjCVarWH_PackageTypeConversion.mFactor = Convert.ToDecimal(dr["Factor"].ToString());
						lstCVarWH_PackageTypeConversion.Add(ObjCVarWH_PackageTypeConversion);
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
			lstCVarWH_PackageTypeConversion.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_PackageTypeConversion";
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
						CVarWH_PackageTypeConversion ObjCVarWH_PackageTypeConversion = new CVarWH_PackageTypeConversion();
						ObjCVarWH_PackageTypeConversion.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_PackageTypeConversion.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarWH_PackageTypeConversion.mFromPackageTypeID = Convert.ToInt32(dr["FromPackageTypeID"].ToString());
						ObjCVarWH_PackageTypeConversion.mToPackageTypeID = Convert.ToInt32(dr["ToPackageTypeID"].ToString());
						ObjCVarWH_PackageTypeConversion.mFactor = Convert.ToDecimal(dr["Factor"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_PackageTypeConversion.Add(ObjCVarWH_PackageTypeConversion);
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
					Com.CommandText = "[dbo].DeleteListWH_PackageTypeConversion";
				else
					Com.CommandText = "[dbo].UpdateListWH_PackageTypeConversion";
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
		public Exception DeleteItem(List<CPKWH_PackageTypeConversion> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_PackageTypeConversion";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
				foreach (CPKWH_PackageTypeConversion ObjCPKWH_PackageTypeConversion in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_PackageTypeConversion.ID);
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
		public Exception SaveMethod(List<CVarWH_PackageTypeConversion> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@FromPackageTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ToPackageTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Factor", SqlDbType.Decimal));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_PackageTypeConversion ObjCVarWH_PackageTypeConversion in SaveList)
				{
					if (ObjCVarWH_PackageTypeConversion.mIsChanges == true)
					{
						if (ObjCVarWH_PackageTypeConversion.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_PackageTypeConversion";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_PackageTypeConversion.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_PackageTypeConversion";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_PackageTypeConversion.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_PackageTypeConversion.ID;
						}
						Com.Parameters["@PurchaseItemID"].Value = ObjCVarWH_PackageTypeConversion.PurchaseItemID;
						Com.Parameters["@FromPackageTypeID"].Value = ObjCVarWH_PackageTypeConversion.FromPackageTypeID;
						Com.Parameters["@ToPackageTypeID"].Value = ObjCVarWH_PackageTypeConversion.ToPackageTypeID;
						Com.Parameters["@Factor"].Value = ObjCVarWH_PackageTypeConversion.Factor;
						EndTrans(Com, Con);
						if (ObjCVarWH_PackageTypeConversion.ID == 0)
						{
							ObjCVarWH_PackageTypeConversion.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_PackageTypeConversion.mIsChanges = false;
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
