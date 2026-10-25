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
	public partial class CVarvwWH_ItemsLog
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal String mOrderType;
		internal DateTime mOrderDate;
		internal DateTime mCreationDate;
		internal DateTime mModificationDate;
		internal String mOrderNo;
		internal String mNotes;
		internal Int32 mWarehouseID;
		internal String mWarehouseName;
		internal Int32 mCustomerID;
		internal String mCustomerName;
		internal Int32 mOwnerID;
		internal String mOwnerName;
		internal String mItemCode;
		internal String mItemName;
		internal String mUOM;
		internal Decimal mQuantity;
		internal String mBatchNumber;
		internal DateTime mProductionDate;
		internal DateTime mExpirationDate;
		internal String mFromLocationCode;
		internal String mToLocationCode;
		internal String mFromPalletID;
		internal String mToPalletID;
		internal String mUserName;
		internal String mPalletClassName;
		#endregion

		#region "Methods"
		public String OrderType
		{
			get { return mOrderType; }
			set { mOrderType = value; }
		}
		public DateTime OrderDate
		{
			get { return mOrderDate; }
			set { mOrderDate = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mCreationDate = value; }
		}
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mModificationDate = value; }
		}
		public String OrderNo
		{
			get { return mOrderNo; }
			set { mOrderNo = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
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
		public Int32 CustomerID
		{
			get { return mCustomerID; }
			set { mCustomerID = value; }
		}
		public String CustomerName
		{
			get { return mCustomerName; }
			set { mCustomerName = value; }
		}
		public Int32 OwnerID
		{
			get { return mOwnerID; }
			set { mOwnerID = value; }
		}
		public String OwnerName
		{
			get { return mOwnerName; }
			set { mOwnerName = value; }
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
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mQuantity = value; }
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
		public String FromLocationCode
		{
			get { return mFromLocationCode; }
			set { mFromLocationCode = value; }
		}
		public String ToLocationCode
		{
			get { return mToLocationCode; }
			set { mToLocationCode = value; }
		}
		public String FromPalletID
		{
			get { return mFromPalletID; }
			set { mFromPalletID = value; }
		}
		public String ToPalletID
		{
			get { return mToPalletID; }
			set { mToPalletID = value; }
		}
		public String UserName
		{
			get { return mUserName; }
			set { mUserName = value; }
		}
		public String PalletClassName
		{
			get { return mPalletClassName; }
			set { mPalletClassName = value; }
		}
		#endregion
	}

	public partial class CvwWH_ItemsLog
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
		public List<CVarvwWH_ItemsLog> lstCVarvwWH_ItemsLog = new List<CVarvwWH_ItemsLog>();
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
			lstCVarvwWH_ItemsLog.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_ItemsLog";
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
						CVarvwWH_ItemsLog ObjCVarvwWH_ItemsLog = new CVarvwWH_ItemsLog();
						ObjCVarvwWH_ItemsLog.mOrderType = Convert.ToString(dr["OrderType"].ToString());
						ObjCVarvwWH_ItemsLog.mOrderDate = Convert.ToDateTime(dr["OrderDate"].ToString());
						ObjCVarvwWH_ItemsLog.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_ItemsLog.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwWH_ItemsLog.mOrderNo = Convert.ToString(dr["OrderNo"].ToString());
						ObjCVarvwWH_ItemsLog.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_ItemsLog.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_ItemsLog.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_ItemsLog.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_ItemsLog.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_ItemsLog.mOwnerID = Convert.ToInt32(dr["OwnerID"].ToString());
						ObjCVarvwWH_ItemsLog.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_ItemsLog.mItemCode = Convert.ToString(dr["ItemCode"].ToString());
						ObjCVarvwWH_ItemsLog.mItemName = Convert.ToString(dr["ItemName"].ToString());
						ObjCVarvwWH_ItemsLog.mUOM = Convert.ToString(dr["UOM"].ToString());
						ObjCVarvwWH_ItemsLog.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ItemsLog.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_ItemsLog.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_ItemsLog.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_ItemsLog.mFromLocationCode = Convert.ToString(dr["FromLocationCode"].ToString());
						ObjCVarvwWH_ItemsLog.mToLocationCode = Convert.ToString(dr["ToLocationCode"].ToString());
						ObjCVarvwWH_ItemsLog.mFromPalletID = Convert.ToString(dr["FromPalletID"].ToString());
						ObjCVarvwWH_ItemsLog.mToPalletID = Convert.ToString(dr["ToPalletID"].ToString());
						ObjCVarvwWH_ItemsLog.mUserName = Convert.ToString(dr["UserName"].ToString());
						ObjCVarvwWH_ItemsLog.mPalletClassName = Convert.ToString(dr["PalletClassName"].ToString());
						lstCVarvwWH_ItemsLog.Add(ObjCVarvwWH_ItemsLog);
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
			lstCVarvwWH_ItemsLog.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_ItemsLog";
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
						CVarvwWH_ItemsLog ObjCVarvwWH_ItemsLog = new CVarvwWH_ItemsLog();
						ObjCVarvwWH_ItemsLog.mOrderType = Convert.ToString(dr["OrderType"].ToString());
						ObjCVarvwWH_ItemsLog.mOrderDate = Convert.ToDateTime(dr["OrderDate"].ToString());
						ObjCVarvwWH_ItemsLog.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_ItemsLog.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwWH_ItemsLog.mOrderNo = Convert.ToString(dr["OrderNo"].ToString());
						ObjCVarvwWH_ItemsLog.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_ItemsLog.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_ItemsLog.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_ItemsLog.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_ItemsLog.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_ItemsLog.mOwnerID = Convert.ToInt32(dr["OwnerID"].ToString());
						ObjCVarvwWH_ItemsLog.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_ItemsLog.mItemCode = Convert.ToString(dr["ItemCode"].ToString());
						ObjCVarvwWH_ItemsLog.mItemName = Convert.ToString(dr["ItemName"].ToString());
						ObjCVarvwWH_ItemsLog.mUOM = Convert.ToString(dr["UOM"].ToString());
						ObjCVarvwWH_ItemsLog.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ItemsLog.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_ItemsLog.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_ItemsLog.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_ItemsLog.mFromLocationCode = Convert.ToString(dr["FromLocationCode"].ToString());
						ObjCVarvwWH_ItemsLog.mToLocationCode = Convert.ToString(dr["ToLocationCode"].ToString());
						ObjCVarvwWH_ItemsLog.mFromPalletID = Convert.ToString(dr["FromPalletID"].ToString());
						ObjCVarvwWH_ItemsLog.mToPalletID = Convert.ToString(dr["ToPalletID"].ToString());
						ObjCVarvwWH_ItemsLog.mUserName = Convert.ToString(dr["UserName"].ToString());
						ObjCVarvwWH_ItemsLog.mPalletClassName = Convert.ToString(dr["PalletClassName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_ItemsLog.Add(ObjCVarvwWH_ItemsLog);
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