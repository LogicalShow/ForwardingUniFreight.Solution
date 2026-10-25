using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
	//Com.CommandTimeout = 3000;

	[Serializable]
	public partial class CVarvwWH_ItemBalance
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mID;
		internal Int32 mPurchaseItemID;
		internal String mPurchaseItemCode;
		internal String mPurchaseItemName;
		internal Int32 mPackageTypeID;
		internal String mPackageTypeCode;
		internal String mPackageTypeName;
		internal Decimal mQuantity;
		internal Decimal mPDL_DemandedQuantity;
		internal Int32 mLocationID;
		internal String mLocationCode;
		internal Int32 mLocationTypeID;
		internal String mPalletID;
		internal Int32 mPalletStatusID;
		internal Int32 mPalletClassID;
		internal Boolean mIsPalletHeld;
		internal String mBatchNumber;
		internal Int32 mBatchStatusID;
		internal Boolean mIsBatchHeld;
		internal DateTime mReceiveDate;
		internal DateTime mProductionDate;
		internal DateTime mExpirationDate;
		internal Int32 mCustomerID;
		internal String mCustomerName;
		internal Int32 mOwnerID;
		internal String mOwnerName;
		internal Int32 mWarehouseID;
		internal String mWarehouseName;
		internal Boolean mIsPicked;
		internal Boolean mByExpireDate;
		internal Boolean mBySerialNo;
		internal Boolean mByLotNo;
		#endregion

		#region "Methods"
		public Int64 ID
		{
			get { return mID; }
			set { mID = value; }
		}
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
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mQuantity = value; }
		}
		public Decimal PDL_DemandedQuantity
		{
			get { return mPDL_DemandedQuantity; }
			set { mPDL_DemandedQuantity = value; }
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
		public Int32 LocationTypeID
		{
			get { return mLocationTypeID; }
			set { mLocationTypeID = value; }
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
		public Int32 PalletClassID
		{
			get { return mPalletClassID; }
			set { mPalletClassID = value; }
		}
		public Boolean IsPalletHeld
		{
			get { return mIsPalletHeld; }
			set { mIsPalletHeld = value; }
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
		public Boolean IsBatchHeld
		{
			get { return mIsBatchHeld; }
			set { mIsBatchHeld = value; }
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
		public Boolean IsPicked
		{
			get { return mIsPicked; }
			set { mIsPicked = value; }
		}
		public Boolean ByExpireDate
		{
			get { return mByExpireDate; }
			set { mByExpireDate = value; }
		}
		public Boolean BySerialNo
		{
			get { return mBySerialNo; }
			set { mBySerialNo = value; }
		}
		public Boolean ByLotNo
		{
			get { return mByLotNo; }
			set { mByLotNo = value; }
		}
		#endregion
	}

	public partial class CvwWH_ItemBalance
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
		public List<CVarvwWH_ItemBalance> lstCVarvwWH_ItemBalance = new List<CVarvwWH_ItemBalance>();
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
			lstCVarvwWH_ItemBalance.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_ItemBalance";
					Com.Parameters[0].Value = Param;
				}
				Com.Transaction = tr;
				Com.Connection = Con;
				Com.CommandTimeout = 3000;
				dr = Com.ExecuteReader();
				try
				{
					while (dr.Read())
					{
						/*Start DataReader*/
						CVarvwWH_ItemBalance ObjCVarvwWH_ItemBalance = new CVarvwWH_ItemBalance();
						ObjCVarvwWH_ItemBalance.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_ItemBalance.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_ItemBalance.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_ItemBalance.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_ItemBalance.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_ItemBalance.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
						ObjCVarvwWH_ItemBalance.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_ItemBalance.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ItemBalance.mPDL_DemandedQuantity = Convert.ToDecimal(dr["PDL_DemandedQuantity"].ToString());
						ObjCVarvwWH_ItemBalance.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarvwWH_ItemBalance.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_ItemBalance.mLocationTypeID = Convert.ToInt32(dr["LocationTypeID"].ToString());
						ObjCVarvwWH_ItemBalance.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_ItemBalance.mPalletStatusID = Convert.ToInt32(dr["PalletStatusID"].ToString());
						ObjCVarvwWH_ItemBalance.mPalletClassID = Convert.ToInt32(dr["PalletClassID"].ToString());
						ObjCVarvwWH_ItemBalance.mIsPalletHeld = Convert.ToBoolean(dr["IsPalletHeld"].ToString());
						ObjCVarvwWH_ItemBalance.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_ItemBalance.mBatchStatusID = Convert.ToInt32(dr["BatchStatusID"].ToString());
						ObjCVarvwWH_ItemBalance.mIsBatchHeld = Convert.ToBoolean(dr["IsBatchHeld"].ToString());
						ObjCVarvwWH_ItemBalance.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_ItemBalance.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_ItemBalance.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_ItemBalance.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_ItemBalance.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_ItemBalance.mOwnerID = Convert.ToInt32(dr["OwnerID"].ToString());
						ObjCVarvwWH_ItemBalance.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_ItemBalance.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_ItemBalance.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_ItemBalance.mIsPicked = Convert.ToBoolean(dr["IsPicked"].ToString());
						ObjCVarvwWH_ItemBalance.mByExpireDate = Convert.ToBoolean(dr["ByExpireDate"].ToString());
						ObjCVarvwWH_ItemBalance.mBySerialNo = Convert.ToBoolean(dr["BySerialNo"].ToString());
						ObjCVarvwWH_ItemBalance.mByLotNo = Convert.ToBoolean(dr["ByLotNo"].ToString());
						lstCVarvwWH_ItemBalance.Add(ObjCVarvwWH_ItemBalance);
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
			lstCVarvwWH_ItemBalance.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_ItemBalance";
				Com.Parameters[0].Value = PageSize;
				Com.Parameters[1].Value = PageNumber;
				Com.Parameters[2].Value = WhereClause;
				Com.Parameters[3].Value = OrderBy;
				Com.Transaction = tr;
				Com.Connection = Con;
				Com.CommandTimeout = 3000;
				dr = Com.ExecuteReader();
				try
				{
					while (dr.Read())
					{
						/*Start DataReader*/
						CVarvwWH_ItemBalance ObjCVarvwWH_ItemBalance = new CVarvwWH_ItemBalance();
						ObjCVarvwWH_ItemBalance.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_ItemBalance.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_ItemBalance.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_ItemBalance.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_ItemBalance.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_ItemBalance.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
						ObjCVarvwWH_ItemBalance.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_ItemBalance.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ItemBalance.mPDL_DemandedQuantity = Convert.ToDecimal(dr["PDL_DemandedQuantity"].ToString());
						ObjCVarvwWH_ItemBalance.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarvwWH_ItemBalance.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_ItemBalance.mLocationTypeID = Convert.ToInt32(dr["LocationTypeID"].ToString());
						ObjCVarvwWH_ItemBalance.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_ItemBalance.mPalletStatusID = Convert.ToInt32(dr["PalletStatusID"].ToString());
						ObjCVarvwWH_ItemBalance.mPalletClassID = Convert.ToInt32(dr["PalletClassID"].ToString());
						ObjCVarvwWH_ItemBalance.mIsPalletHeld = Convert.ToBoolean(dr["IsPalletHeld"].ToString());
						ObjCVarvwWH_ItemBalance.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_ItemBalance.mBatchStatusID = Convert.ToInt32(dr["BatchStatusID"].ToString());
						ObjCVarvwWH_ItemBalance.mIsBatchHeld = Convert.ToBoolean(dr["IsBatchHeld"].ToString());
						ObjCVarvwWH_ItemBalance.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_ItemBalance.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_ItemBalance.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_ItemBalance.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_ItemBalance.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_ItemBalance.mOwnerID = Convert.ToInt32(dr["OwnerID"].ToString());
						ObjCVarvwWH_ItemBalance.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_ItemBalance.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_ItemBalance.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_ItemBalance.mIsPicked = Convert.ToBoolean(dr["IsPicked"].ToString());
						ObjCVarvwWH_ItemBalance.mByExpireDate = Convert.ToBoolean(dr["ByExpireDate"].ToString());
						ObjCVarvwWH_ItemBalance.mBySerialNo = Convert.ToBoolean(dr["BySerialNo"].ToString());
						ObjCVarvwWH_ItemBalance.mByLotNo = Convert.ToBoolean(dr["ByLotNo"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_ItemBalance.Add(ObjCVarvwWH_ItemBalance);
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