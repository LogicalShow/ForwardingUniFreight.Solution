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
	public partial class CVarvwWH_TransServiceForInvoicing
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mCustomerID;
		internal Int64 mReceiveID;
		internal String mReceiveCode;
		internal Int64 mPickupID;
		internal String mPickupCode;
		internal Int32 mTransServiceID;
		internal String mServiceName;
		internal Int32 mChargeTypeID;
		internal String mChargeTypeName;
		internal Decimal mQty;
		internal Decimal mRate;
		internal Decimal mAmount;
		internal DateTime mCreationDate;
		internal DateTime mContractDateFrom;
		internal DateTime mContractDateTo;
		internal Int32 mIsContractApproved;
		internal Int64 mInvoiceID;
		internal Int64 mContractDetailsID;
		internal String mContractCode;
		internal Int32 mSpacePerPallet;
		internal Int32 mDays;
		internal String mNotes;
		#endregion

		#region "Methods"
		public Int32 CustomerID
		{
			get { return mCustomerID; }
			set { mCustomerID = value; }
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
		public Int32 TransServiceID
		{
			get { return mTransServiceID; }
			set { mTransServiceID = value; }
		}
		public String ServiceName
		{
			get { return mServiceName; }
			set { mServiceName = value; }
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
		public Decimal Qty
		{
			get { return mQty; }
			set { mQty = value; }
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
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mCreationDate = value; }
		}
		public DateTime ContractDateFrom
		{
			get { return mContractDateFrom; }
			set { mContractDateFrom = value; }
		}
		public DateTime ContractDateTo
		{
			get { return mContractDateTo; }
			set { mContractDateTo = value; }
		}
		public Int32 IsContractApproved
		{
			get { return mIsContractApproved; }
			set { mIsContractApproved = value; }
		}
		public Int64 InvoiceID
		{
			get { return mInvoiceID; }
			set { mInvoiceID = value; }
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
		public Int32 SpacePerPallet
		{
			get { return mSpacePerPallet; }
			set { mSpacePerPallet = value; }
		}
		public Int32 Days
		{
			get { return mDays; }
			set { mDays = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
		}
		#endregion
	}

	public partial class CvwWH_TransServiceForInvoicing
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
		public List<CVarvwWH_TransServiceForInvoicing> lstCVarvwWH_TransServiceForInvoicing = new List<CVarvwWH_TransServiceForInvoicing>();
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
			lstCVarvwWH_TransServiceForInvoicing.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_TransServiceForInvoicing";
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
						CVarvwWH_TransServiceForInvoicing ObjCVarvwWH_TransServiceForInvoicing = new CVarvwWH_TransServiceForInvoicing();
						ObjCVarvwWH_TransServiceForInvoicing.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mPickupCode = Convert.ToString(dr["PickupCode"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mTransServiceID = Convert.ToInt32(dr["TransServiceID"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mServiceName = Convert.ToString(dr["ServiceName"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mQty = Convert.ToDecimal(dr["Qty"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mRate = Convert.ToDecimal(dr["Rate"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mContractDateFrom = Convert.ToDateTime(dr["ContractDateFrom"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mContractDateTo = Convert.ToDateTime(dr["ContractDateTo"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mIsContractApproved = Convert.ToInt32(dr["IsContractApproved"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mContractDetailsID = Convert.ToInt64(dr["ContractDetailsID"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mContractCode = Convert.ToString(dr["ContractCode"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mSpacePerPallet = Convert.ToInt32(dr["SpacePerPallet"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mDays = Convert.ToInt32(dr["Days"].ToString());
						ObjCVarvwWH_TransServiceForInvoicing.mNotes = Convert.ToString(dr["Notes"].ToString());
						lstCVarvwWH_TransServiceForInvoicing.Add(ObjCVarvwWH_TransServiceForInvoicing);
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