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
	public partial class CVarvwWH_TransForServices
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mID;
		internal Int64 mInvoiceID;
		internal String mCode;
		internal DateTime mTransDate;
		internal Boolean mIsReceive;
		internal String mCustomerName;
		internal String mWarehouseName;
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
		public String Code
		{
			get { return mCode; }
			set { mCode = value; }
		}
		public DateTime TransDate
		{
			get { return mTransDate; }
			set { mTransDate = value; }
		}
		public Boolean IsReceive
		{
			get { return mIsReceive; }
			set { mIsReceive = value; }
		}
		public String CustomerName
		{
			get { return mCustomerName; }
			set { mCustomerName = value; }
		}
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		#endregion
	}

	public partial class CvwWH_TransForServices
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
		public List<CVarvwWH_TransForServices> lstCVarvwWH_TransForServices = new List<CVarvwWH_TransForServices>();
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
			lstCVarvwWH_TransForServices.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_TransForServices";
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
						CVarvwWH_TransForServices ObjCVarvwWH_TransForServices = new CVarvwWH_TransForServices();
						ObjCVarvwWH_TransForServices.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_TransForServices.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
						ObjCVarvwWH_TransForServices.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_TransForServices.mTransDate = Convert.ToDateTime(dr["TransDate"].ToString());
						ObjCVarvwWH_TransForServices.mIsReceive = Convert.ToBoolean(dr["IsReceive"].ToString());
						ObjCVarvwWH_TransForServices.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_TransForServices.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						lstCVarvwWH_TransForServices.Add(ObjCVarvwWH_TransForServices);
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
			lstCVarvwWH_TransForServices.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_TransForServices";
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
						CVarvwWH_TransForServices ObjCVarvwWH_TransForServices = new CVarvwWH_TransForServices();
						ObjCVarvwWH_TransForServices.mID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarvwWH_TransForServices.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
						ObjCVarvwWH_TransForServices.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_TransForServices.mTransDate = Convert.ToDateTime(dr["TransDate"].ToString());
						ObjCVarvwWH_TransForServices.mIsReceive = Convert.ToBoolean(dr["IsReceive"].ToString());
						ObjCVarvwWH_TransForServices.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwWH_TransForServices.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_TransForServices.Add(ObjCVarvwWH_TransForServices);
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