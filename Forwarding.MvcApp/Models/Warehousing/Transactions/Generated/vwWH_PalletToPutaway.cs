using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
	[Serializable]
	public partial class CVarvwWH_PalletToPutaway
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mReceiveID;
		internal String mReceiveCode;
		internal DateTime mReceiveDate;
		internal String mCustomerName;
		internal String mOwnerName;
		internal Int32 mWarehouseID;
		internal String mWarehouseName;
		internal Int32 mLocationID;
		internal String mLocationCode;
		internal String mPalletID;
		#endregion

		#region "Methods"
		public Int64 ReceiveID
		{
			get { return mReceiveID; }
			set { mReceiveID = value; }
		}
		public String ReceiveCode
		{
			get { return mReceiveCode; }
			set { mReceiveCode = value; }
		}
		public DateTime ReceiveDate
		{
			get { return mReceiveDate; }
			set { mReceiveDate = value; }
		}
		public String CustomerName
		{
			get { return mCustomerName; }
			set { mCustomerName = value; }
		}
		public String OwnerName
		{
			get { return mOwnerName; }
			set { mOwnerName = value; }
		}
		public Int32 WarehouseID
		{
			get { return mWarehouseID; }
			set { mWarehouseID = value; }
		}
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		public Int32 LocationID
		{
			get { return mLocationID; }
			set { mLocationID = value; }
		}
		public String LocationCode
		{
			get { return mLocationCode; }
			set { mLocationCode = value; }
		}
		public String PalletID
		{
			get { return mPalletID; }
			set { mPalletID = value; }
		}
		#endregion
	}

	public partial class CvwWH_PalletToPutaway
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
		public List<CVarvwWH_PalletToPutaway> lstCVarvwWH_PalletToPutaway = new List<CVarvwWH_PalletToPutaway>();
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
			lstCVarvwWH_PalletToPutaway.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
					Com.CommandText = "[dbo].GetListvwWH_PalletToPutaway";
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
						CVarvwWH_PalletToPutaway ObjCVarvwWH_PalletToPutaway = new CVarvwWH_PalletToPutaway();
						ObjCVarvwWH_PalletToPutaway.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarvwWH_PalletToPutaway.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_PalletToPutaway.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_PalletToPutaway.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_PalletToPutaway.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_PalletToPutaway.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_PalletToPutaway.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_PalletToPutaway.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarvwWH_PalletToPutaway.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_PalletToPutaway.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						lstCVarvwWH_PalletToPutaway.Add(ObjCVarvwWH_PalletToPutaway);
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
			lstCVarvwWH_PalletToPutaway.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
				Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
				Com.CommandText = "[dbo].GetListPagingvwWH_PalletToPutaway";
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
						CVarvwWH_PalletToPutaway ObjCVarvwWH_PalletToPutaway = new CVarvwWH_PalletToPutaway();
						ObjCVarvwWH_PalletToPutaway.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarvwWH_PalletToPutaway.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_PalletToPutaway.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_PalletToPutaway.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_PalletToPutaway.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_PalletToPutaway.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_PalletToPutaway.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_PalletToPutaway.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarvwWH_PalletToPutaway.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_PalletToPutaway.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_PalletToPutaway.Add(ObjCVarvwWH_PalletToPutaway);
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