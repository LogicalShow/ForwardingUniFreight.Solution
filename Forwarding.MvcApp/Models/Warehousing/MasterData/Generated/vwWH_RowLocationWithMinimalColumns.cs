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
	public partial class CVarvwWH_RowLocationWithMinimalColumns
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mID;
		internal Int32 mRowID;
		internal Int32 mAreaID;
		internal Int32 mWareHouseID;
		internal String mCode;
		internal Boolean mIsUsed;
		internal Boolean mIsDefault;
		internal Int32 mTypeID;
		#endregion

		#region "Methods"
		public Int32 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int32 RowID
		{
			get { return mRowID; }
			set { mRowID = value; }
		}
		public Int32 AreaID
		{
			get { return mAreaID; }
			set { mAreaID = value; }
		}
		public Int32 WareHouseID
		{
			get { return mWareHouseID; }
			set { mWareHouseID = value; }
		}
		public String Code
		{
			get { return mCode; }
			set { mCode = value; }
		}
		public Boolean IsUsed
		{
			get { return mIsUsed; }
			set { mIsUsed = value; }
		}
		public Boolean IsDefault
		{
			get { return mIsDefault; }
			set { mIsDefault = value; }
		}
		public Int32 TypeID
		{
			get { return mTypeID; }
			set { mTypeID = value; }
		}
		#endregion
	}

	public partial class CvwWH_RowLocationWithMinimalColumns
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
		public List<CVarvwWH_RowLocationWithMinimalColumns> lstCVarvwWH_RowLocationWithMinimalColumns = new List<CVarvwWH_RowLocationWithMinimalColumns>();
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
		private Exception DataFill(string Param, Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarvwWH_RowLocationWithMinimalColumns.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_RowLocationWithMinimalColumns";
					Com.Parameters[0].Value = Param;
				}
				Com.Transaction = tr;
				Com.Connection = Con;
				dr = Com.ExecuteReader();
				try
				{
					while (dr.Read())
					{
						/*Start DataReader*/
						CVarvwWH_RowLocationWithMinimalColumns ObjCVarvwWH_RowLocationWithMinimalColumns = new CVarvwWH_RowLocationWithMinimalColumns();
						ObjCVarvwWH_RowLocationWithMinimalColumns.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mRowID = Convert.ToInt32(dr["RowID"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mWareHouseID = Convert.ToInt32(dr["WareHouseID"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mIsUsed = Convert.ToBoolean(dr["IsUsed"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						lstCVarvwWH_RowLocationWithMinimalColumns.Add(ObjCVarvwWH_RowLocationWithMinimalColumns);
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
			lstCVarvwWH_RowLocationWithMinimalColumns.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_RowLocationWithMinimalColumns";
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
						CVarvwWH_RowLocationWithMinimalColumns ObjCVarvwWH_RowLocationWithMinimalColumns = new CVarvwWH_RowLocationWithMinimalColumns();
						ObjCVarvwWH_RowLocationWithMinimalColumns.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mRowID = Convert.ToInt32(dr["RowID"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mWareHouseID = Convert.ToInt32(dr["WareHouseID"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mIsUsed = Convert.ToBoolean(dr["IsUsed"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
						ObjCVarvwWH_RowLocationWithMinimalColumns.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_RowLocationWithMinimalColumns.Add(ObjCVarvwWH_RowLocationWithMinimalColumns);
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
	}

}
