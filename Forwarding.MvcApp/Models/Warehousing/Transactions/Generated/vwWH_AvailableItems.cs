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
	public partial class CVarvwWH_AvailableItems
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mWarehouseID;
		internal Int32 mCustomerID;
		internal Int32 mOwnerID;
		internal Int64 mPurchaseItemID;
		internal String mPurchaseItemCode;
		internal String mPurchaseItemName;
		internal Int32 mPackageTypeID;
		internal String mPackageTypeCode;
		internal String mPackageTypeName;
		internal Decimal mAvailableQuantity;
		#endregion

		#region "Methods"
		public Int32 WarehouseID
		{
			get { return mWarehouseID; }
			set { mWarehouseID = value; }
		}
		public Int32 CustomerID
		{
			get { return mCustomerID; }
			set { mCustomerID = value; }
		}
		public Int32 OwnerID
		{
			get { return mOwnerID; }
			set { mOwnerID = value; }
		}
		public Int64 PurchaseItemID
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
		public Decimal AvailableQuantity
		{
			get { return mAvailableQuantity; }
			set { mAvailableQuantity = value; }
		}
		#endregion
	}

	public partial class CvwWH_AvailableItems
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
		public List<CVarvwWH_AvailableItems> lstCVarvwWH_AvailableItems = new List<CVarvwWH_AvailableItems>();
		#endregion

		#region "Select Methods"
		public Exception GetList(string WhereClause)
		{
			return DataFill(WhereClause, true);
		}
		private Exception DataFill(string Param, Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarvwWH_AvailableItems.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_AvailableItems";
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
						CVarvwWH_AvailableItems ObjCVarvwWH_AvailableItems = new CVarvwWH_AvailableItems();
						ObjCVarvwWH_AvailableItems.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_AvailableItems.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_AvailableItems.mOwnerID = Convert.ToInt32(dr["OwnerID"].ToString());
						ObjCVarvwWH_AvailableItems.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_AvailableItems.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_AvailableItems.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_AvailableItems.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_AvailableItems.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
						ObjCVarvwWH_AvailableItems.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_AvailableItems.mAvailableQuantity = Convert.ToDecimal(dr["AvailableQuantity"].ToString());
						lstCVarvwWH_AvailableItems.Add(ObjCVarvwWH_AvailableItems);
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