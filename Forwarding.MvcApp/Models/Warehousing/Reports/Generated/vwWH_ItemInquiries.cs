using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.Reports.Generated
{
	[Serializable]
	public partial class CVarvwWH_ItemInquiries
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal String mLocationCode;
		internal String mPalletID;
		internal String mItemCode;
		internal String mItemName;
		internal String mUOM;
		internal String mBatchNumber;
		internal DateTime mProductionDate;
		internal DateTime mExpirationDate;
		internal Decimal mQuantity;
		internal String mRecCode;
		internal String mWarehouseName;
		#endregion

		#region "Methods"
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
		public String ItemCode
		{
			get { return mItemCode; }
			set { mItemCode = value; }
		}
		public String ItemName
		{
			get { return mItemName; }
			set { mItemName = value; }
		}
		public String UOM
		{
			get { return mUOM; }
			set { mUOM = value; }
		}
		public String BatchNumber
		{
			get { return mBatchNumber; }
			set { mBatchNumber = value; }
		}
		public DateTime ProductionDate
		{
			get { return mProductionDate; }
			set { mProductionDate = value; }
		}
		public DateTime ExpirationDate
		{
			get { return mExpirationDate; }
			set { mExpirationDate = value; }
		}
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mQuantity = value; }
		}
		public String RecCode
		{
			get { return mRecCode; }
			set { mRecCode = value; }
		}
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		#endregion
	}

	public partial class CvwWH_ItemInquiries
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
		public List<CVarvwWH_ItemInquiries> lstCVarvwWH_ItemInquiries = new List<CVarvwWH_ItemInquiries>();
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
			lstCVarvwWH_ItemInquiries.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_ItemInquiries";
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
						CVarvwWH_ItemInquiries ObjCVarvwWH_ItemInquiries = new CVarvwWH_ItemInquiries();
						ObjCVarvwWH_ItemInquiries.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_ItemInquiries.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_ItemInquiries.mItemCode = Convert.ToString(dr["ItemCode"].ToString());
						ObjCVarvwWH_ItemInquiries.mItemName = Convert.ToString(dr["ItemName"].ToString());
						ObjCVarvwWH_ItemInquiries.mUOM = Convert.ToString(dr["UOM"].ToString());
						ObjCVarvwWH_ItemInquiries.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_ItemInquiries.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_ItemInquiries.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_ItemInquiries.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ItemInquiries.mRecCode = Convert.ToString(dr["RecCode"].ToString());
						ObjCVarvwWH_ItemInquiries.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						lstCVarvwWH_ItemInquiries.Add(ObjCVarvwWH_ItemInquiries);
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
			lstCVarvwWH_ItemInquiries.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_ItemInquiries";
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
						CVarvwWH_ItemInquiries ObjCVarvwWH_ItemInquiries = new CVarvwWH_ItemInquiries();
						ObjCVarvwWH_ItemInquiries.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_ItemInquiries.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_ItemInquiries.mItemCode = Convert.ToString(dr["ItemCode"].ToString());
						ObjCVarvwWH_ItemInquiries.mItemName = Convert.ToString(dr["ItemName"].ToString());
						ObjCVarvwWH_ItemInquiries.mUOM = Convert.ToString(dr["UOM"].ToString());
						ObjCVarvwWH_ItemInquiries.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_ItemInquiries.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_ItemInquiries.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_ItemInquiries.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ItemInquiries.mRecCode = Convert.ToString(dr["RecCode"].ToString());
						ObjCVarvwWH_ItemInquiries.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_ItemInquiries.Add(ObjCVarvwWH_ItemInquiries);
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