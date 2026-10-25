using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
	[Serializable]
	public class CPKST_Packing
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
	public partial class CVarST_Packing : CPKST_Packing
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mCode;
		internal DateTime mDate;
		internal String mNote;
		internal Int32 mOperationID;
		internal String mPO;
		internal String mLot;
		#endregion

		#region "Methods"
		public Int32 Code
		{
			get { return mCode; }
			set { mIsChanges = true; mCode = value; }
		}
		public DateTime Date
		{
			get { return mDate; }
			set { mIsChanges = true; mDate = value; }
		}
		public String Note
		{
			get { return mNote; }
			set { mIsChanges = true; mNote = value; }
		}
		public Int32 OperationID
		{
			get { return mOperationID; }
			set { mIsChanges = true; mOperationID = value; }
		}
		public String PO
		{
			get { return mPO; }
			set { mIsChanges = true; mPO = value; }
		}
		public String Lot
		{
			get { return mLot; }
			set { mIsChanges = true; mLot = value; }
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

	public partial class CST_Packing
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
		public List<CVarST_Packing> lstCVarST_Packing = new List<CVarST_Packing>();
		public List<CPKST_Packing> lstDeletedCPKST_Packing = new List<CPKST_Packing>();
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
			lstCVarST_Packing.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListST_Packing";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemST_Packing";
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
						CVarST_Packing ObjCVarST_Packing = new CVarST_Packing();
						ObjCVarST_Packing.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarST_Packing.mCode = Convert.ToInt32(dr["Code"].ToString());
						ObjCVarST_Packing.mDate = Convert.ToDateTime(dr["Date"].ToString());
						ObjCVarST_Packing.mNote = Convert.ToString(dr["Note"].ToString());
						ObjCVarST_Packing.mOperationID = Convert.ToInt32(dr["OperationID"].ToString());
						ObjCVarST_Packing.mPO = Convert.ToString(dr["PO"].ToString());
						ObjCVarST_Packing.mLot = Convert.ToString(dr["Lot"].ToString());
						lstCVarST_Packing.Add(ObjCVarST_Packing);
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
			lstCVarST_Packing.Clear();

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
				Com.CommandText = "[dbo].GetListPagingST_Packing";
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
						CVarST_Packing ObjCVarST_Packing = new CVarST_Packing();
						ObjCVarST_Packing.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarST_Packing.mCode = Convert.ToInt32(dr["Code"].ToString());
						ObjCVarST_Packing.mDate = Convert.ToDateTime(dr["Date"].ToString());
						ObjCVarST_Packing.mNote = Convert.ToString(dr["Note"].ToString());
						ObjCVarST_Packing.mOperationID = Convert.ToInt32(dr["OperationID"].ToString());
						ObjCVarST_Packing.mPO = Convert.ToString(dr["PO"].ToString());
						ObjCVarST_Packing.mLot = Convert.ToString(dr["Lot"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarST_Packing.Add(ObjCVarST_Packing);
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
					Com.CommandText = "[dbo].DeleteListST_Packing";
				else
					Com.CommandText = "[dbo].UpdateListST_Packing";
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
		public Exception DeleteItem(List<CPKST_Packing> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemST_Packing";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKST_Packing ObjCPKST_Packing in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKST_Packing.ID);
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
		public Exception SaveMethod(List<CVarST_Packing> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@Note", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PO", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Lot", SqlDbType.NVarChar));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarST_Packing ObjCVarST_Packing in SaveList)
				{
					if (ObjCVarST_Packing.mIsChanges == true)
					{
						if (ObjCVarST_Packing.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemST_Packing";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarST_Packing.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemST_Packing";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarST_Packing.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarST_Packing.ID;
						}
						Com.Parameters["@Code"].Value = ObjCVarST_Packing.Code;
						Com.Parameters["@Date"].Value = ObjCVarST_Packing.Date;
						Com.Parameters["@Note"].Value = ObjCVarST_Packing.Note;
						Com.Parameters["@OperationID"].Value = ObjCVarST_Packing.OperationID;
						Com.Parameters["@PO"].Value = ObjCVarST_Packing.PO;
						Com.Parameters["@Lot"].Value = ObjCVarST_Packing.Lot;
						EndTrans(Com, Con);
						if (ObjCVarST_Packing.ID == 0)
						{
							ObjCVarST_Packing.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarST_Packing.mIsChanges = false;
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
