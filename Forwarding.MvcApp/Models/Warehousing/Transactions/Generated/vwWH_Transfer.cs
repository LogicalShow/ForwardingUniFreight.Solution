using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
	[Serializable]
	public class CPKvwWH_Transfer
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
	public partial class CVarvwWH_Transfer : CPKvwWH_Transfer
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mCodeSerial;
		internal String mCode;
		internal Int32 mWarehouseID;
		internal String mWarehouseName;
		internal Int32 mFromItemID;
		internal String mFromItemCode;
		internal String mFromItemName;
		internal Int32 mToItemID;
		internal String mToItemCode;
		internal String mToItemName;
		internal String mPackageTypeName;
		internal String mPalletID;
		internal String mBatchNumber;
		internal DateTime mProductionDate;
		internal DateTime mExpirationDate;
		internal Decimal mQuantity;
		internal String mLocationCode;
		internal String mCreatorUserName;
		internal DateTime mCreationDate;
		#endregion

		#region "Methods"
		public Int32 CodeSerial
		{
			get { return mCodeSerial; }
			set { mCodeSerial = value; }
		}
		public String Code
		{
			get { return mCode; }
			set { mCode = value; }
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
		public Int32 FromItemID
		{
			get { return mFromItemID; }
			set { mFromItemID = value; }
		}
		public String FromItemCode
		{
			get { return mFromItemCode; }
			set { mFromItemCode = value; }
		}
		public String FromItemName
		{
			get { return mFromItemName; }
			set { mFromItemName = value; }
		}
		public Int32 ToItemID
		{
			get { return mToItemID; }
			set { mToItemID = value; }
		}
		public String ToItemCode
		{
			get { return mToItemCode; }
			set { mToItemCode = value; }
		}
		public String ToItemName
		{
			get { return mToItemName; }
			set { mToItemName = value; }
		}
		public String PackageTypeName
		{
			get { return mPackageTypeName; }
			set { mPackageTypeName = value; }
		}
		public String PalletID
		{
			get { return mPalletID; }
			set { mPalletID = value; }
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

	public partial class CvwWH_Transfer
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
		public List<CVarvwWH_Transfer> lstCVarvwWH_Transfer = new List<CVarvwWH_Transfer>();
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
			lstCVarvwWH_Transfer.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_Transfer";
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
						CVarvwWH_Transfer ObjCVarvwWH_Transfer = new CVarvwWH_Transfer();
						ObjCVarvwWH_Transfer.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_Transfer.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwWH_Transfer.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_Transfer.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_Transfer.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_Transfer.mFromItemID = Convert.ToInt32(dr["FromItemID"].ToString());
						ObjCVarvwWH_Transfer.mFromItemCode = Convert.ToString(dr["FromItemCode"].ToString());
						ObjCVarvwWH_Transfer.mFromItemName = Convert.ToString(dr["FromItemName"].ToString());
						ObjCVarvwWH_Transfer.mToItemID = Convert.ToInt32(dr["ToItemID"].ToString());
						ObjCVarvwWH_Transfer.mToItemCode = Convert.ToString(dr["ToItemCode"].ToString());
						ObjCVarvwWH_Transfer.mToItemName = Convert.ToString(dr["ToItemName"].ToString());
						ObjCVarvwWH_Transfer.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_Transfer.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_Transfer.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_Transfer.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_Transfer.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_Transfer.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_Transfer.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_Transfer.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						ObjCVarvwWH_Transfer.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						lstCVarvwWH_Transfer.Add(ObjCVarvwWH_Transfer);
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
			lstCVarvwWH_Transfer.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_Transfer";
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
						CVarvwWH_Transfer ObjCVarvwWH_Transfer = new CVarvwWH_Transfer();
						ObjCVarvwWH_Transfer.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_Transfer.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwWH_Transfer.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_Transfer.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_Transfer.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_Transfer.mFromItemID = Convert.ToInt32(dr["FromItemID"].ToString());
						ObjCVarvwWH_Transfer.mFromItemCode = Convert.ToString(dr["FromItemCode"].ToString());
						ObjCVarvwWH_Transfer.mFromItemName = Convert.ToString(dr["FromItemName"].ToString());
						ObjCVarvwWH_Transfer.mToItemID = Convert.ToInt32(dr["ToItemID"].ToString());
						ObjCVarvwWH_Transfer.mToItemCode = Convert.ToString(dr["ToItemCode"].ToString());
						ObjCVarvwWH_Transfer.mToItemName = Convert.ToString(dr["ToItemName"].ToString());
						ObjCVarvwWH_Transfer.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_Transfer.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_Transfer.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_Transfer.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarvwWH_Transfer.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_Transfer.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_Transfer.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_Transfer.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						ObjCVarvwWH_Transfer.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_Transfer.Add(ObjCVarvwWH_Transfer);
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