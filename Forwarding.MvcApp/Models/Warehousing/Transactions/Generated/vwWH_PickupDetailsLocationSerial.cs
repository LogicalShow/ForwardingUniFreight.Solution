using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
	[Serializable]
	public partial class CVarvwWH_PickupDetailsLocationSerial
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mPickupID;
		internal String mCode;
		internal Boolean mIsFinalized;
		internal DateTime mRequiredDate;
		internal DateTime mFinalizeDate;
		internal Int32 mCustomerID;
		internal Int64 mPickupDetailsID;
		internal Int64 mPurchaseItemID;
		internal String mPurchaseItemCode;
		internal String mPurchaseItemName;
		internal String mModelNumber;
		internal String mBrandName;
		internal Int32 mPackageTypeID;
		internal String mPartNumber;
		internal String mPackageTypeName;
		internal Decimal mGrossWeight;
		internal String mWeightUnitCode;
		internal Decimal mVolume;
		internal String mVolumeUnitCode;
		internal Int64 mID;
		internal Int64 mReceiveDetailsID;
		internal Decimal mPickedQuantity;
		internal String mNotes;
		internal String mPO;
		internal String mDetailFile;
		internal String mReceiveFrom;
		internal String mInvoice;
		internal String mContainerNumber;
		internal String mLocationCode;
		internal String mPalletID;
		internal String mBatchNumber;
		internal DateTime mExpirationDate;
		internal String mImportedBy;
		internal Decimal mWeightInTons;
		internal String mExtra1;
		internal String mExtra2;
		internal String mExtra3;
		internal String mExtra4;
		internal String mExtra5;
		internal String mExtra6;
		internal String mExtra7;
		internal String mExtra8;
		internal String mExtra9;
		internal String mSerial;
		#endregion

		#region "Methods"
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
		public DateTime RequiredDate
		{
			get { return mRequiredDate; }
			set { mRequiredDate = value; }
		}
		public DateTime FinalizeDate
		{
			get { return mFinalizeDate; }
			set { mFinalizeDate = value; }
		}
		public Int32 CustomerID
		{
			get { return mCustomerID; }
			set { mCustomerID = value; }
		}
		public Int64 PickupDetailsID
		{
			get { return mPickupDetailsID; }
			set { mPickupDetailsID = value; }
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
		public String ModelNumber
		{
			get { return mModelNumber; }
			set { mModelNumber = value; }
		}
		public String BrandName
		{
			get { return mBrandName; }
			set { mBrandName = value; }
		}
		public Int32 PackageTypeID
		{
			get { return mPackageTypeID; }
			set { mPackageTypeID = value; }
		}
		public String PartNumber
		{
			get { return mPartNumber; }
			set { mPartNumber = value; }
		}
		public String PackageTypeName
		{
			get { return mPackageTypeName; }
			set { mPackageTypeName = value; }
		}
		public Decimal GrossWeight
		{
			get { return mGrossWeight; }
			set { mGrossWeight = value; }
		}
		public String WeightUnitCode
		{
			get { return mWeightUnitCode; }
			set { mWeightUnitCode = value; }
		}
		public Decimal Volume
		{
			get { return mVolume; }
			set { mVolume = value; }
		}
		public String VolumeUnitCode
		{
			get { return mVolumeUnitCode; }
			set { mVolumeUnitCode = value; }
		}
		public Int64 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int64 ReceiveDetailsID
		{
			get { return mReceiveDetailsID; }
			set { mReceiveDetailsID = value; }
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
		public String PO
		{
			get { return mPO; }
			set { mPO = value; }
		}
		public String DetailFile
		{
			get { return mDetailFile; }
			set { mDetailFile = value; }
		}
		public String ReceiveFrom
		{
			get { return mReceiveFrom; }
			set { mReceiveFrom = value; }
		}
		public String Invoice
		{
			get { return mInvoice; }
			set { mInvoice = value; }
		}
		public String ContainerNumber
		{
			get { return mContainerNumber; }
			set { mContainerNumber = value; }
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
		public String BatchNumber
		{
			get { return mBatchNumber; }
			set { mBatchNumber = value; }
		}
		public DateTime ExpirationDate
		{
			get { return mExpirationDate; }
			set { mExpirationDate = value; }
		}
		public String ImportedBy
		{
			get { return mImportedBy; }
			set { mImportedBy = value; }
		}
		public Decimal WeightInTons
		{
			get { return mWeightInTons; }
			set { mWeightInTons = value; }
		}
		public String Extra1
		{
			get { return mExtra1; }
			set { mExtra1 = value; }
		}
		public String Extra2
		{
			get { return mExtra2; }
			set { mExtra2 = value; }
		}
		public String Extra3
		{
			get { return mExtra3; }
			set { mExtra3 = value; }
		}
		public String Extra4
		{
			get { return mExtra4; }
			set { mExtra4 = value; }
		}
		public String Extra5
		{
			get { return mExtra5; }
			set { mExtra5 = value; }
		}
		public String Extra6
		{
			get { return mExtra6; }
			set { mExtra6 = value; }
		}
		public String Extra7
		{
			get { return mExtra7; }
			set { mExtra7 = value; }
		}
		public String Extra8
		{
			get { return mExtra8; }
			set { mExtra8 = value; }
		}
		public String Extra9
		{
			get { return mExtra9; }
			set { mExtra9 = value; }
		}
		public String Serial
		{
			get { return mSerial; }
			set { mSerial = value; }
		}
		#endregion
	}

	public partial class CvwWH_PickupDetailsLocationSerial
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
		public List<CVarvwWH_PickupDetailsLocationSerial> lstCVarvwWH_PickupDetailsLocationSerial = new List<CVarvwWH_PickupDetailsLocationSerial>();
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
			lstCVarvwWH_PickupDetailsLocationSerial.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_PickupDetailsLocationSerial";
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
						CVarvwWH_PickupDetailsLocationSerial ObjCVarvwWH_PickupDetailsLocationSerial = new CVarvwWH_PickupDetailsLocationSerial();
						ObjCVarvwWH_PickupDetailsLocationSerial.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mIsFinalized = Convert.ToBoolean(dr["IsFinalized"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mRequiredDate = Convert.ToDateTime(dr["RequiredDate"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mFinalizeDate = Convert.ToDateTime(dr["FinalizeDate"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPickupDetailsID = Convert.ToInt64(dr["PickupDetailsID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mModelNumber = Convert.ToString(dr["ModelNumber"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mBrandName = Convert.ToString(dr["BrandName"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPickedQuantity = Convert.ToDecimal(dr["PickedQuantity"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPO = Convert.ToString(dr["PO"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mDetailFile = Convert.ToString(dr["DetailFile"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mReceiveFrom = Convert.ToString(dr["ReceiveFrom"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mInvoice = Convert.ToString(dr["Invoice"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mImportedBy = Convert.ToString(dr["ImportedBy"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mWeightInTons = Convert.ToDecimal(dr["WeightInTons"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra1 = Convert.ToString(dr["Extra1"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra2 = Convert.ToString(dr["Extra2"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra3 = Convert.ToString(dr["Extra3"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra4 = Convert.ToString(dr["Extra4"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra5 = Convert.ToString(dr["Extra5"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra6 = Convert.ToString(dr["Extra6"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra7 = Convert.ToString(dr["Extra7"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra8 = Convert.ToString(dr["Extra8"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra9 = Convert.ToString(dr["Extra9"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mSerial = Convert.ToString(dr["Serial"].ToString());
						lstCVarvwWH_PickupDetailsLocationSerial.Add(ObjCVarvwWH_PickupDetailsLocationSerial);
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
			lstCVarvwWH_PickupDetailsLocationSerial.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_PickupDetailsLocationSerial";
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
						CVarvwWH_PickupDetailsLocationSerial ObjCVarvwWH_PickupDetailsLocationSerial = new CVarvwWH_PickupDetailsLocationSerial();
						ObjCVarvwWH_PickupDetailsLocationSerial.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mIsFinalized = Convert.ToBoolean(dr["IsFinalized"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mRequiredDate = Convert.ToDateTime(dr["RequiredDate"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mFinalizeDate = Convert.ToDateTime(dr["FinalizeDate"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPickupDetailsID = Convert.ToInt64(dr["PickupDetailsID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPurchaseItemCode = Convert.ToString(dr["PurchaseItemCode"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPurchaseItemName = Convert.ToString(dr["PurchaseItemName"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mModelNumber = Convert.ToString(dr["ModelNumber"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mBrandName = Convert.ToString(dr["BrandName"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mReceiveDetailsID = Convert.ToInt64(dr["ReceiveDetailsID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPickedQuantity = Convert.ToDecimal(dr["PickedQuantity"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPO = Convert.ToString(dr["PO"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mDetailFile = Convert.ToString(dr["DetailFile"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mReceiveFrom = Convert.ToString(dr["ReceiveFrom"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mInvoice = Convert.ToString(dr["Invoice"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mLocationCode = Convert.ToString(dr["LocationCode"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mImportedBy = Convert.ToString(dr["ImportedBy"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mWeightInTons = Convert.ToDecimal(dr["WeightInTons"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra1 = Convert.ToString(dr["Extra1"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra2 = Convert.ToString(dr["Extra2"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra3 = Convert.ToString(dr["Extra3"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra4 = Convert.ToString(dr["Extra4"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra5 = Convert.ToString(dr["Extra5"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra6 = Convert.ToString(dr["Extra6"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra7 = Convert.ToString(dr["Extra7"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra8 = Convert.ToString(dr["Extra8"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mExtra9 = Convert.ToString(dr["Extra9"].ToString());
						ObjCVarvwWH_PickupDetailsLocationSerial.mSerial = Convert.ToString(dr["Serial"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_PickupDetailsLocationSerial.Add(ObjCVarvwWH_PickupDetailsLocationSerial);
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
