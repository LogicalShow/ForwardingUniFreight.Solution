using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
	[Serializable]
	public partial class CVarvwWH_ContractDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mID;
		internal Int32 mContractID;
		internal Int32 mChargeTypeID;
		internal String mChargeTypeName;
		internal String mChargeTypeCode;
		internal Int32 mPackageTypeID;
		internal String mPackageTypeCode;
		internal Int32 mPalletClassID;
		internal String mPalletClassName;
		internal Int32 mPaymentTermID;
		internal String mPaymentTermName;
		internal Int32 mTypeID;
		internal String mTypeName;
		internal Decimal mQuantity;
		internal Decimal mCost;
		internal Int32 mQuantityUnitID;
		internal String mQuantityUnitName;
		internal Decimal mRate;
		internal Decimal mMinimumCharge;
		internal Decimal mAdditionalRate;
		internal Int32 mCurrencyID;
		internal String mCurrencyCode;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		#endregion

		#region "Methods"
		public Int64 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int32 ContractID
		{
			get { return mContractID; }
			set { mContractID = value; }
		}
		public Int32 ChargeTypeID
		{
			get { return mChargeTypeID; }
			set { mChargeTypeID = value; }
		}
		public String ChargeTypeName
		{
			get { return mChargeTypeName; }
			set { mChargeTypeName = value; }
		}
		public String ChargeTypeCode
		{
			get { return mChargeTypeCode; }
			set { mChargeTypeCode = value; }
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
		public Int32 PaymentTermID
		{
			get { return mPaymentTermID; }
			set { mPaymentTermID = value; }
		}
		public String PaymentTermName
		{
			get { return mPaymentTermName; }
			set { mPaymentTermName = value; }
		}
		public Int32 TypeID
		{
			get { return mTypeID; }
			set { mTypeID = value; }
		}
		public String TypeName
		{
			get { return mTypeName; }
			set { mTypeName = value; }
		}
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mQuantity = value; }
		}
		public Decimal Cost
		{
			get { return mCost; }
			set { mCost = value; }
		}
		public Int32 QuantityUnitID
		{
			get { return mQuantityUnitID; }
			set { mQuantityUnitID = value; }
		}
		public String QuantityUnitName
		{
			get { return mQuantityUnitName; }
			set { mQuantityUnitName = value; }
		}
		public Decimal Rate
		{
			get { return mRate; }
			set { mRate = value; }
		}
		public Decimal MinimumCharge
		{
			get { return mMinimumCharge; }
			set { mMinimumCharge = value; }
		}
		public Decimal AdditionalRate
		{
			get { return mAdditionalRate; }
			set { mAdditionalRate = value; }
		}
		public Int32 CurrencyID
		{
			get { return mCurrencyID; }
			set { mCurrencyID = value; }
		}
		public String CurrencyCode
		{
			get { return mCurrencyCode; }
			set { mCurrencyCode = value; }
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
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mModificationDate = value; }
		}
		#endregion
	}

	public partial class CvwWH_ContractDetails
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
		public List<CVarvwWH_ContractDetails> lstCVarvwWH_ContractDetails = new List<CVarvwWH_ContractDetails>();
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
			lstCVarvwWH_ContractDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_ContractDetails";
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
						CVarvwWH_ContractDetails ObjCVarvwWH_ContractDetails = new CVarvwWH_ContractDetails();
						ObjCVarvwWH_ContractDetails.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_ContractDetails.mContractID = Convert.ToInt32(dr["ContractID"].ToString());
						ObjCVarvwWH_ContractDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						ObjCVarvwWH_ContractDetails.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
						ObjCVarvwWH_ContractDetails.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
						ObjCVarvwWH_ContractDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_ContractDetails.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
						ObjCVarvwWH_ContractDetails.mPalletClassID = Convert.ToInt32(dr["PalletClassID"].ToString());
						ObjCVarvwWH_ContractDetails.mPalletClassName = Convert.ToString(dr["PalletClassName"].ToString());
						ObjCVarvwWH_ContractDetails.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
						ObjCVarvwWH_ContractDetails.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
						ObjCVarvwWH_ContractDetails.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						ObjCVarvwWH_ContractDetails.mTypeName = Convert.ToString(dr["TypeName"].ToString());
						ObjCVarvwWH_ContractDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ContractDetails.mCost = Convert.ToDecimal(dr["Cost"].ToString());
						ObjCVarvwWH_ContractDetails.mQuantityUnitID = Convert.ToInt32(dr["QuantityUnitID"].ToString());
						ObjCVarvwWH_ContractDetails.mQuantityUnitName = Convert.ToString(dr["QuantityUnitName"].ToString());
						ObjCVarvwWH_ContractDetails.mRate = Convert.ToDecimal(dr["Rate"].ToString());
						ObjCVarvwWH_ContractDetails.mMinimumCharge = Convert.ToDecimal(dr["MinimumCharge"].ToString());
						ObjCVarvwWH_ContractDetails.mAdditionalRate = Convert.ToDecimal(dr["AdditionalRate"].ToString());
						ObjCVarvwWH_ContractDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
						ObjCVarvwWH_ContractDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
						ObjCVarvwWH_ContractDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwWH_ContractDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_ContractDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwWH_ContractDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						lstCVarvwWH_ContractDetails.Add(ObjCVarvwWH_ContractDetails);
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
			lstCVarvwWH_ContractDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_ContractDetails";
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
						CVarvwWH_ContractDetails ObjCVarvwWH_ContractDetails = new CVarvwWH_ContractDetails();
						ObjCVarvwWH_ContractDetails.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_ContractDetails.mContractID = Convert.ToInt32(dr["ContractID"].ToString());
						ObjCVarvwWH_ContractDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						ObjCVarvwWH_ContractDetails.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
						ObjCVarvwWH_ContractDetails.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
						ObjCVarvwWH_ContractDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarvwWH_ContractDetails.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
						ObjCVarvwWH_ContractDetails.mPalletClassID = Convert.ToInt32(dr["PalletClassID"].ToString());
						ObjCVarvwWH_ContractDetails.mPalletClassName = Convert.ToString(dr["PalletClassName"].ToString());
						ObjCVarvwWH_ContractDetails.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
						ObjCVarvwWH_ContractDetails.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
						ObjCVarvwWH_ContractDetails.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						ObjCVarvwWH_ContractDetails.mTypeName = Convert.ToString(dr["TypeName"].ToString());
						ObjCVarvwWH_ContractDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_ContractDetails.mCost = Convert.ToDecimal(dr["Cost"].ToString());
						ObjCVarvwWH_ContractDetails.mQuantityUnitID = Convert.ToInt32(dr["QuantityUnitID"].ToString());
						ObjCVarvwWH_ContractDetails.mQuantityUnitName = Convert.ToString(dr["QuantityUnitName"].ToString());
						ObjCVarvwWH_ContractDetails.mRate = Convert.ToDecimal(dr["Rate"].ToString());
						ObjCVarvwWH_ContractDetails.mMinimumCharge = Convert.ToDecimal(dr["MinimumCharge"].ToString());
						ObjCVarvwWH_ContractDetails.mAdditionalRate = Convert.ToDecimal(dr["AdditionalRate"].ToString());
						ObjCVarvwWH_ContractDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
						ObjCVarvwWH_ContractDetails.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
						ObjCVarvwWH_ContractDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwWH_ContractDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_ContractDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwWH_ContractDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_ContractDetails.Add(ObjCVarvwWH_ContractDetails);
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
