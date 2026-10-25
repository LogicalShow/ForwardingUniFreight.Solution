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
	public partial class CVarvwWH_TransServices
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mID;
		internal Int32 mTransSourceID;
		internal Int32 mDirection;
		internal Int32 mServiceID;
		internal String mServiceName;
		internal Decimal mServiceCost;
		internal Decimal mServiceSelling;
		internal Decimal mQuantity;
		internal Int32 mCalcTypeID;
		internal String mCalcTypeName;
		internal String mChargeTypeName;
		internal DateTime mCreationDate;
		internal DateTime mTransServiceDate;
		internal Decimal mCostAmount;
		internal Decimal mSellingAmount;
		internal String mTransCode;
		internal Int32 mCustomerID;
		internal String mCustomerName;
		internal Int64 mInvoiceID;
		internal String mInvoiceNumber;
		internal String mNotes;
		internal String mOwnerName;
		internal String mWarehouseName;
		internal String mCreatorUserName;
		#endregion

		#region "Methods"
		public Int32 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int32 TransSourceID
		{
			get { return mTransSourceID; }
			set { mTransSourceID = value; }
		}
		public Int32 Direction
		{
			get { return mDirection; }
			set { mDirection = value; }
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
		public Decimal ServiceCost
		{
			get { return mServiceCost; }
			set { mServiceCost = value; }
		}
		public Decimal ServiceSelling
		{
			get { return mServiceSelling; }
			set { mServiceSelling = value; }
		}
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mQuantity = value; }
		}
		public Int32 CalcTypeID
		{
			get { return mCalcTypeID; }
			set { mCalcTypeID = value; }
		}
		public String CalcTypeName
		{
			get { return mCalcTypeName; }
			set { mCalcTypeName = value; }
		}
		public String ChargeTypeName
		{
			get { return mChargeTypeName; }
			set { mChargeTypeName = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mCreationDate = value; }
		}
		public DateTime TransServiceDate
		{
			get { return mTransServiceDate; }
			set { mTransServiceDate = value; }
		}
		public Decimal CostAmount
		{
			get { return mCostAmount; }
			set { mCostAmount = value; }
		}
		public Decimal SellingAmount
		{
			get { return mSellingAmount; }
			set { mSellingAmount = value; }
		}
		public String TransCode
		{
			get { return mTransCode; }
			set { mTransCode = value; }
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
		public Int64 InvoiceID
		{
			get { return mInvoiceID; }
			set { mInvoiceID = value; }
		}
		public String InvoiceNumber
		{
			get { return mInvoiceNumber; }
			set { mInvoiceNumber = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
		}
		public String OwnerName
		{
			get { return mOwnerName; }
			set { mOwnerName = value; }
		}
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		public String CreatorUserName
		{
			get { return mCreatorUserName; }
			set { mCreatorUserName = value; }
		}
		#endregion
	}

	public partial class CvwWH_TransServices
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
		public List<CVarvwWH_TransServices> lstCVarvwWH_TransServices = new List<CVarvwWH_TransServices>();
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
			lstCVarvwWH_TransServices.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_TransServices";
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
						CVarvwWH_TransServices ObjCVarvwWH_TransServices = new CVarvwWH_TransServices();
						ObjCVarvwWH_TransServices.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_TransServices.mTransSourceID = Convert.ToInt32(dr["TransSourceID"].ToString());
						ObjCVarvwWH_TransServices.mDirection = Convert.ToInt32(dr["Direction"].ToString());
						ObjCVarvwWH_TransServices.mServiceID = Convert.ToInt32(dr["ServiceID"].ToString());
						ObjCVarvwWH_TransServices.mServiceName = Convert.ToString(dr["ServiceName"].ToString());
						ObjCVarvwWH_TransServices.mServiceCost = Convert.ToDecimal(dr["ServiceCost"].ToString());
						ObjCVarvwWH_TransServices.mServiceSelling = Convert.ToDecimal(dr["ServiceSelling"].ToString());
						ObjCVarvwWH_TransServices.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_TransServices.mCalcTypeID = Convert.ToInt32(dr["CalcTypeID"].ToString());
						ObjCVarvwWH_TransServices.mCalcTypeName = Convert.ToString(dr["CalcTypeName"].ToString());
						ObjCVarvwWH_TransServices.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
						ObjCVarvwWH_TransServices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_TransServices.mTransServiceDate = Convert.ToDateTime(dr["TransServiceDate"].ToString());
						ObjCVarvwWH_TransServices.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
						ObjCVarvwWH_TransServices.mSellingAmount = Convert.ToDecimal(dr["SellingAmount"].ToString());
						ObjCVarvwWH_TransServices.mTransCode = Convert.ToString(dr["TransCode"].ToString());
						ObjCVarvwWH_TransServices.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_TransServices.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_TransServices.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
						ObjCVarvwWH_TransServices.mInvoiceNumber = Convert.ToString(dr["InvoiceNumber"].ToString());
						ObjCVarvwWH_TransServices.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_TransServices.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_TransServices.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_TransServices.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						lstCVarvwWH_TransServices.Add(ObjCVarvwWH_TransServices);
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
			lstCVarvwWH_TransServices.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_TransServices";
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
						CVarvwWH_TransServices ObjCVarvwWH_TransServices = new CVarvwWH_TransServices();
						ObjCVarvwWH_TransServices.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_TransServices.mTransSourceID = Convert.ToInt32(dr["TransSourceID"].ToString());
						ObjCVarvwWH_TransServices.mDirection = Convert.ToInt32(dr["Direction"].ToString());
						ObjCVarvwWH_TransServices.mServiceID = Convert.ToInt32(dr["ServiceID"].ToString());
						ObjCVarvwWH_TransServices.mServiceName = Convert.ToString(dr["ServiceName"].ToString());
						ObjCVarvwWH_TransServices.mServiceCost = Convert.ToDecimal(dr["ServiceCost"].ToString());
						ObjCVarvwWH_TransServices.mServiceSelling = Convert.ToDecimal(dr["ServiceSelling"].ToString());
						ObjCVarvwWH_TransServices.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarvwWH_TransServices.mCalcTypeID = Convert.ToInt32(dr["CalcTypeID"].ToString());
						ObjCVarvwWH_TransServices.mCalcTypeName = Convert.ToString(dr["CalcTypeName"].ToString());
						ObjCVarvwWH_TransServices.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
						ObjCVarvwWH_TransServices.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_TransServices.mTransServiceDate = Convert.ToDateTime(dr["TransServiceDate"].ToString());
						ObjCVarvwWH_TransServices.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
						ObjCVarvwWH_TransServices.mSellingAmount = Convert.ToDecimal(dr["SellingAmount"].ToString());
						ObjCVarvwWH_TransServices.mTransCode = Convert.ToString(dr["TransCode"].ToString());
						ObjCVarvwWH_TransServices.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_TransServices.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_TransServices.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
						ObjCVarvwWH_TransServices.mInvoiceNumber = Convert.ToString(dr["InvoiceNumber"].ToString());
						ObjCVarvwWH_TransServices.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwWH_TransServices.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_TransServices.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_TransServices.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_TransServices.Add(ObjCVarvwWH_TransServices);
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