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
	public partial class CVarvwWH_PickupDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mID;
		internal Int64 mPickupID;
		internal String mCode;
		internal Boolean mIsFinalized;
		internal Int64 mPurchaseItemID;
		internal String mPurchaseItemCode;
		internal String mPurchaseItemName;
		internal Int32 mPackageTypeID;
		internal String mPackageTypeName;
		internal Decimal mDemandedQuantity;
		internal Decimal mPickedQuantity;
		internal String mNotes;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal String mModificatorUserName;
		internal DateTime mModificationDate;
		internal Int32 mCustomerID;
		internal Int32 mWarehouseID;
		internal Int32 mCodeSerial;
		internal Decimal mPD_AvailableQuantity;
		internal Int32 mPD_PackageTypeID;
		#endregion

		#region "Methods"
		public Int64 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int64 PickupID
		{
			get { return mPickupID; }
			set { mPickupID = value; }
		}
		public String Code
		{
			get { return mCode; }
			set { mCode = value; }
		}
		public Boolean IsFinalized
		{
			get { return mIsFinalized; }
			set { mIsFinalized = value; }
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
		public String PackageTypeName
		{
			get { return mPackageTypeName; }
			set { mPackageTypeName = value; }
		}
		public Decimal DemandedQuantity
		{
			get { return mDemandedQuantity; }
			set { mDemandedQuantity = value; }
		}
		public Decimal PickedQuantity
		{
			get { return mPickedQuantity; }
			set { mPickedQuantity = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
		}
		public Int32 CreatorUserID
		{
			get { return mCreatorUserID; }
			set { mCreatorUserID = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mCreationDate = value; }
		}
		public Int32 ModificatorUserID
		{
			get { return mModificatorUserID; }
			set { mModificatorUserID = value; }
		}
		public String ModificatorUserName
		{
			get { return mModificatorUserName; }
			set { mModificatorUserName = value; }
		}
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mModificationDate = value; }
		}
		public Int32 CustomerID
		{
			get { return mCustomerID; }
			set { mCustomerID = value; }
		}
		public Int32 WarehouseID
		{
			get { return mWarehouseID; }
			set { mWarehouseID = value; }
		}
		public Int32 CodeSerial
		{
			get { return mCodeSerial; }
			set { mCodeSerial = value; }
		}
		public Decimal PD_AvailableQuantity
		{
			get { return mPD_AvailableQuantity; }
			set { mPD_AvailableQuantity = value; }
		}
		public Int32 PD_PackageTypeID
		{
			get { return mPD_PackageTypeID; }
			set { mPD_PackageTypeID = value; }
		}
		#endregion
	}

	public partial class CvwWH_PickupDetails
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
		public List<CVarvwWH_PickupDetails> lstCVarvwWH_PickupDetails = new List<CVarvwWH_PickupDetails>();
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
			lstCVarvwWH_PickupDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_PickupDetails";
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
						CVarvwWH_PickupDetails ObjCVarvwWH_PickupDetails = new CVarvwWH_PickupDetails();
						ObjCVarvwWH_PickupDetails.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_PickupDetails.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarvwWH_PickupDetails.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_PickupDetails.mIsFinalized = Convert.ToBoolean(dr["IsFinalized"].ToString());
						ObjCVarvwWH_PickupDetails.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_PickupDetails.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_PickupDetails.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_PickupDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_PickupDetails.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_PickupDetails.mDemandedQuantity = Convert.ToDecimal(dr["DemandedQuantity"].ToString());
						ObjCVarvwWH_PickupDetails.mPickedQuantity = Convert.ToDecimal(dr["PickedQuantity"].ToString());
						ObjCVarvwWH_PickupDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_PickupDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwWH_PickupDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_PickupDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwWH_PickupDetails.mModificatorUserName = Convert.ToString(dr["ModificatorUserName"].ToString());
						ObjCVarvwWH_PickupDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwWH_PickupDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_PickupDetails.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_PickupDetails.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwWH_PickupDetails.mPD_AvailableQuantity = Convert.ToDecimal(dr["PD_AvailableQuantity"].ToString());
						ObjCVarvwWH_PickupDetails.mPD_PackageTypeID = Convert.ToInt32(dr["PD_PackageTypeID"].ToString());
						lstCVarvwWH_PickupDetails.Add(ObjCVarvwWH_PickupDetails);
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
			lstCVarvwWH_PickupDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_PickupDetails";
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
						CVarvwWH_PickupDetails ObjCVarvwWH_PickupDetails = new CVarvwWH_PickupDetails();
						ObjCVarvwWH_PickupDetails.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_PickupDetails.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarvwWH_PickupDetails.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_PickupDetails.mIsFinalized = Convert.ToBoolean(dr["IsFinalized"].ToString());
						ObjCVarvwWH_PickupDetails.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_PickupDetails.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_PickupDetails.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_PickupDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_PickupDetails.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_PickupDetails.mDemandedQuantity = Convert.ToDecimal(dr["DemandedQuantity"].ToString());
						ObjCVarvwWH_PickupDetails.mPickedQuantity = Convert.ToDecimal(dr["PickedQuantity"].ToString());
						ObjCVarvwWH_PickupDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_PickupDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwWH_PickupDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_PickupDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwWH_PickupDetails.mModificatorUserName = Convert.ToString(dr["ModificatorUserName"].ToString());
						ObjCVarvwWH_PickupDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwWH_PickupDetails.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_PickupDetails.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						ObjCVarvwWH_PickupDetails.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwWH_PickupDetails.mPD_AvailableQuantity = Convert.ToDecimal(dr["PD_AvailableQuantity"].ToString());
						ObjCVarvwWH_PickupDetails.mPD_PackageTypeID = Convert.ToInt32(dr["PD_PackageTypeID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_PickupDetails.Add(ObjCVarvwWH_PickupDetails);
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
