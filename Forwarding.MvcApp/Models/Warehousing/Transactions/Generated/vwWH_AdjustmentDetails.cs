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
	public partial class CVarvwWH_AdjustmentDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mID;
		internal Int32 mAdjustID;
		internal String mAdjustCode;
		internal String mPurchaseItemCode;
		internal String mPurchaseItemName;
		internal String mPalletID;
		internal String mPackageTypeName;
		internal Decimal mOldQuantity;
		internal Decimal mNewQuantity;
		internal String mLocationCode;
		internal String mCreatorUserName;
		internal DateTime mCreationDate;
		internal DateTime mProductionDate;
		internal DateTime mExpirationDate;
		internal String mWarehouseName;
		#endregion

		#region "Methods"
		public Int32 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int32 AdjustID
		{
			get { return mAdjustID; }
			set { mAdjustID = value; }
		}
		public String AdjustCode
		{
			get { return mAdjustCode; }
			set { mAdjustCode = value; }
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
		public String PalletID
		{
			get { return mPalletID; }
			set { mPalletID = value; }
		}
		public String PackageTypeName
		{
			get { return mPackageTypeName; }
			set { mPackageTypeName = value; }
		}
		public Decimal OldQuantity
		{
			get { return mOldQuantity; }
			set { mOldQuantity = value; }
		}
		public Decimal NewQuantity
		{
			get { return mNewQuantity; }
			set { mNewQuantity = value; }
		}
		public String LocationCode
		{
			get { return mLocationCode; }
			set { mLocationCode = value; }
		}
		public String CreatorUserName
		{
			get { return mCreatorUserName; }
			set { mCreatorUserName = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mCreationDate = value; }
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
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		#endregion
	}

	public partial class CvwWH_AdjustmentDetails
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
		public List<CVarvwWH_AdjustmentDetails> lstCVarvwWH_AdjustmentDetails = new List<CVarvwWH_AdjustmentDetails>();
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
			lstCVarvwWH_AdjustmentDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_AdjustmentDetails";
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
						CVarvwWH_AdjustmentDetails ObjCVarvwWH_AdjustmentDetails = new CVarvwWH_AdjustmentDetails();
						ObjCVarvwWH_AdjustmentDetails.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mAdjustID = Convert.ToInt32(dr["AdjustID"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mAdjustCode = Convert.ToString(dr["AdjustCode"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mOldQuantity = Convert.ToDecimal(dr["OldQuantity"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mNewQuantity = Convert.ToDecimal(dr["NewQuantity"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						lstCVarvwWH_AdjustmentDetails.Add(ObjCVarvwWH_AdjustmentDetails);
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
			lstCVarvwWH_AdjustmentDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_AdjustmentDetails";
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
						CVarvwWH_AdjustmentDetails ObjCVarvwWH_AdjustmentDetails = new CVarvwWH_AdjustmentDetails();
						ObjCVarvwWH_AdjustmentDetails.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mAdjustID = Convert.ToInt32(dr["AdjustID"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mAdjustCode = Convert.ToString(dr["AdjustCode"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mOldQuantity = Convert.ToDecimal(dr["OldQuantity"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mNewQuantity = Convert.ToDecimal(dr["NewQuantity"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_AdjustmentDetails.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_AdjustmentDetails.Add(ObjCVarvwWH_AdjustmentDetails);
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