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
	public partial class CVarvwWH_InventoryBySerial_rpt
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mPurchaseItemID;
		internal String mPurchaseItemCode;
		internal String mPurchaseItemName;
		internal String mSerial;
		internal Int32 mPackageTypeID;
		internal String mPackageTypeCode;
		internal String mPackageTypeName;
		internal String mReceiveCode;
		internal Int32 mWarehouseID;
		internal String mWarehouseName;
		internal Int32 mLocationID;
		internal String mLocationCode;
		internal String mPalletID;
		internal Int32 mPalletStatusID;
		internal String mPalletStatusName;
		internal Int32 mPalletClassID;
		internal String mPalletClassName;
		internal String mBatchNumber;
		internal Int32 mBatchStatusID;
		internal String mBatchStatusName;
		internal DateTime mReceiveDate;
		internal DateTime mProductionDate;
		internal DateTime mExpirationDate;
		internal Int32 mCustomerID;
		internal String mCustomerName;
		internal Int32 mOwnerID;
		internal String mOwnerName;
		internal Decimal mQuantity;
		internal Decimal mDemandedQuantity;
		internal Decimal mAvailableQuantity;
		#endregion

		#region "Methods"
		public Int32 PurchaseItemID
		{
			get { return mPurchaseItemID; }
			set { mPurchaseItemID = value; }
		}
		public String PurchaseItemCode
		{
			get { return mPurchaseItemCode; }
			set { mPurchaseItemCode = value; }
		}
		public String PurchaseItemName
		{
			get { return mPurchaseItemName; }
			set { mPurchaseItemName = value; }
		}
		public String Serial
		{
			get { return mSerial; }
			set { mSerial = value; }
		}
		public Int32 PackageTypeID
		{
			get { return mPackageTypeID; }
			set { mPackageTypeID = value; }
		}
		public String PackageTypeCode
		{
			get { return mPackageTypeCode; }
			set { mPackageTypeCode = value; }
		}
		public String PackageTypeName
		{
			get { return mPackageTypeName; }
			set { mPackageTypeName = value; }
		}
		public String ReceiveCode
		{
			get { return mReceiveCode; }
			set { mReceiveCode = value; }
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
		public Int32 PalletStatusID
		{
			get { return mPalletStatusID; }
			set { mPalletStatusID = value; }
		}
		public String PalletStatusName
		{
			get { return mPalletStatusName; }
			set { mPalletStatusName = value; }
		}
		public Int32 PalletClassID
		{
			get { return mPalletClassID; }
			set { mPalletClassID = value; }
		}
		public String PalletClassName
		{
			get { return mPalletClassName; }
			set { mPalletClassName = value; }
		}
		public String BatchNumber
		{
			get { return mBatchNumber; }
			set { mBatchNumber = value; }
		}
		public Int32 BatchStatusID
		{
			get { return mBatchStatusID; }
			set { mBatchStatusID = value; }
		}
		public String BatchStatusName
		{
			get { return mBatchStatusName; }
			set { mBatchStatusName = value; }
		}
		public DateTime ReceiveDate
		{
			get { return mReceiveDate; }
			set { mReceiveDate = value; }
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
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mQuantity = value; }
		}
		public Decimal DemandedQuantity
		{
			get { return mDemandedQuantity; }
			set { mDemandedQuantity = value; }
		}
		public Decimal AvailableQuantity
		{
			get { return mAvailableQuantity; }
			set { mAvailableQuantity = value; }
		}
		#endregion
	}

	public partial class CvwWH_InventoryBySerial_rpt
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
		public List<CVarvwWH_InventoryBySerial_rpt> lstCVarvwWH_InventoryBySerial_rpt = new List<CVarvwWH_InventoryBySerial_rpt>();
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
			lstCVarvwWH_InventoryBySerial_rpt.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_InventoryBySerial_rpt";
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
						CVarvwWH_InventoryBySerial_rpt ObjCVarvwWH_InventoryBySerial_rpt = new CVarvwWH_InventoryBySerial_rpt();
						ObjCVarvwWH_InventoryBySerial_rpt.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mSerial = Convert.ToString(dr["Serial"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletStatusID = Convert.ToInt32(dr["PalletStatusID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletStatusName = Convert.ToString(dr["PalletStatusName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletClassID = Convert.ToInt32(dr["PalletClassID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletClassName = Convert.ToString(dr["PalletClassName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mBatchStatusID = Convert.ToInt32(dr["BatchStatusID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mBatchStatusName = Convert.ToString(dr["BatchStatusName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mOwnerID = Convert.ToInt32(dr["OwnerID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mDemandedQuantity = Convert.ToDecimal(dr["DemandedQuantity"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mAvailableQuantity = Convert.ToDecimal(dr["AvailableQuantity"].ToString());
						lstCVarvwWH_InventoryBySerial_rpt.Add(ObjCVarvwWH_InventoryBySerial_rpt);
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
			lstCVarvwWH_InventoryBySerial_rpt.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_InventoryBySerial_rpt";
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
						CVarvwWH_InventoryBySerial_rpt ObjCVarvwWH_InventoryBySerial_rpt = new CVarvwWH_InventoryBySerial_rpt();
						ObjCVarvwWH_InventoryBySerial_rpt.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mSerial = Convert.ToString(dr["Serial"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletStatusID = Convert.ToInt32(dr["PalletStatusID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletStatusName = Convert.ToString(dr["PalletStatusName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletClassID = Convert.ToInt32(dr["PalletClassID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mPalletClassName = Convert.ToString(dr["PalletClassName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mBatchStatusID = Convert.ToInt32(dr["BatchStatusID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mBatchStatusName = Convert.ToString(dr["BatchStatusName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mOwnerID = Convert.ToInt32(dr["OwnerID"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mDemandedQuantity = Convert.ToDecimal(dr["DemandedQuantity"].ToString());
						ObjCVarvwWH_InventoryBySerial_rpt.mAvailableQuantity = Convert.ToDecimal(dr["AvailableQuantity"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_InventoryBySerial_rpt.Add(ObjCVarvwWH_InventoryBySerial_rpt);
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