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
	public partial class CVarvwWH_InvoiceDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mID;
		internal Int64 mInvoiceID;
		internal Boolean mIsDeleted;
		internal Int64 mReceiveID;
		internal String mReceiveCode;
		internal Int64 mPickupID;
		internal String mPickupCode;
		internal Int32 mChargeTypeID;
		internal String mChargeTypeName;
		internal Int64 mContractDetailsID;
		internal String mContractCode;
		internal Decimal mSpacePerPallet;
		internal Int32 mDays;
		internal Decimal mRate;
		internal Decimal mAmount;
		internal String mNotes;
		internal Decimal mQty;
		internal Int32 mServiceID;
		internal String mServiceName;
		#endregion

		#region "Methods"
		public Int64 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int64 InvoiceID
		{
			get { return mInvoiceID; }
			set { mInvoiceID = value; }
		}
		public Boolean IsDeleted
		{
			get { return mIsDeleted; }
			set { mIsDeleted = value; }
		}
		public Int64 ReceiveID
		{
			get { return mReceiveID; }
			set { mReceiveID = value; }
		}
		public String ReceiveCode
		{
			get { return mReceiveCode; }
			set { mReceiveCode = value; }
		}
		public Int64 PickupID
		{
			get { return mPickupID; }
			set { mPickupID = value; }
		}
		public String PickupCode
		{
			get { return mPickupCode; }
			set { mPickupCode = value; }
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
		public Int64 ContractDetailsID
		{
			get { return mContractDetailsID; }
			set { mContractDetailsID = value; }
		}
		public String ContractCode
		{
			get { return mContractCode; }
			set { mContractCode = value; }
		}
		public Decimal SpacePerPallet
		{
			get { return mSpacePerPallet; }
			set { mSpacePerPallet = value; }
		}
		public Int32 Days
		{
			get { return mDays; }
			set { mDays = value; }
		}
		public Decimal Rate
		{
			get { return mRate; }
			set { mRate = value; }
		}
		public Decimal Amount
		{
			get { return mAmount; }
			set { mAmount = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
		}
		public Decimal Qty
		{
			get { return mQty; }
			set { mQty = value; }
		}
		public Int32 ServiceID
		{
			get { return mServiceID; }
			set { mServiceID = value; }
		}
		public String ServiceName
		{
			get { return mServiceName; }
			set { mServiceName = value; }
		}
		#endregion
	}

	public partial class CvwWH_InvoiceDetails
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
		public List<CVarvwWH_InvoiceDetails> lstCVarvwWH_InvoiceDetails = new List<CVarvwWH_InvoiceDetails>();
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
			lstCVarvwWH_InvoiceDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_InvoiceDetails";
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
						CVarvwWH_InvoiceDetails ObjCVarvwWH_InvoiceDetails = new CVarvwWH_InvoiceDetails();
						ObjCVarvwWH_InvoiceDetails.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
						ObjCVarvwWH_InvoiceDetails.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_InvoiceDetails.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mPickupCode = Convert.ToString(dr["PickupCode"].ToString());
						ObjCVarvwWH_InvoiceDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
						ObjCVarvwWH_InvoiceDetails.mContractDetailsID = Convert.ToInt64(dr["ContractDetailsID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mContractCode = Convert.ToString(dr["ContractCode"].ToString());
						ObjCVarvwWH_InvoiceDetails.mSpacePerPallet = Convert.ToDecimal(dr["SpacePerPallet"].ToString());
						ObjCVarvwWH_InvoiceDetails.mDays = Convert.ToInt32(dr["Days"].ToString());
						ObjCVarvwWH_InvoiceDetails.mRate = Convert.ToDecimal(dr["Rate"].ToString());
						ObjCVarvwWH_InvoiceDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
						ObjCVarvwWH_InvoiceDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_InvoiceDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
						ObjCVarvwWH_InvoiceDetails.mServiceID = Convert.ToInt32(dr["ServiceID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mServiceName = Convert.ToString(dr["ServiceName"].ToString());
						lstCVarvwWH_InvoiceDetails.Add(ObjCVarvwWH_InvoiceDetails);
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
			lstCVarvwWH_InvoiceDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_InvoiceDetails";
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
						CVarvwWH_InvoiceDetails ObjCVarvwWH_InvoiceDetails = new CVarvwWH_InvoiceDetails();
						ObjCVarvwWH_InvoiceDetails.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
						ObjCVarvwWH_InvoiceDetails.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_InvoiceDetails.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mPickupCode = Convert.ToString(dr["PickupCode"].ToString());
						ObjCVarvwWH_InvoiceDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
						ObjCVarvwWH_InvoiceDetails.mContractDetailsID = Convert.ToInt64(dr["ContractDetailsID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mContractCode = Convert.ToString(dr["ContractCode"].ToString());
						ObjCVarvwWH_InvoiceDetails.mSpacePerPallet = Convert.ToDecimal(dr["SpacePerPallet"].ToString());
						ObjCVarvwWH_InvoiceDetails.mDays = Convert.ToInt32(dr["Days"].ToString());
						ObjCVarvwWH_InvoiceDetails.mRate = Convert.ToDecimal(dr["Rate"].ToString());
						ObjCVarvwWH_InvoiceDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
						ObjCVarvwWH_InvoiceDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_InvoiceDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
						ObjCVarvwWH_InvoiceDetails.mServiceID = Convert.ToInt32(dr["ServiceID"].ToString());
						ObjCVarvwWH_InvoiceDetails.mServiceName = Convert.ToString(dr["ServiceName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_InvoiceDetails.Add(ObjCVarvwWH_InvoiceDetails);
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
