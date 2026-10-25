using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
	[Serializable]
	public partial class CVarvwOwners
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mID;
		internal Int32 mCode;
		internal String mName;
		internal String mLocalName;
		internal Int32 mCustomerId;
		internal String mCustomerName;
		internal String mCustomerLocalName;
		#endregion

		#region "Methods"
		public Int32 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int32 Code
		{
			get { return mCode; }
			set { mCode = value; }
		}
		public String Name
		{
			get { return mName; }
			set { mName = value; }
		}
		public String LocalName
		{
			get { return mLocalName; }
			set { mLocalName = value; }
		}
		public Int32 CustomerId
		{
			get { return mCustomerId; }
			set { mCustomerId = value; }
		}
		public String CustomerName
		{
			get { return mCustomerName; }
			set { mCustomerName = value; }
		}
		public String CustomerLocalName
		{
			get { return mCustomerLocalName; }
			set { mCustomerLocalName = value; }
		}
		#endregion
	}

	public partial class CvwOwners
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
		public List<CVarvwOwners> lstCVarvwOwners = new List<CVarvwOwners>();
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
			lstCVarvwOwners.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwOwners";
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
						CVarvwOwners ObjCVarvwOwners = new CVarvwOwners();
						ObjCVarvwOwners.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwOwners.mCode = Convert.ToInt32(dr["Code"].ToString());
						ObjCVarvwOwners.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwOwners.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarvwOwners.mCustomerId = Convert.ToInt32(dr["CustomerId"].ToString());
						ObjCVarvwOwners.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwOwners.mCustomerLocalName = Convert.ToString(dr["CustomerLocalName"].ToString());
						lstCVarvwOwners.Add(ObjCVarvwOwners);
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
			lstCVarvwOwners.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwOwners";
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
						CVarvwOwners ObjCVarvwOwners = new CVarvwOwners();
						ObjCVarvwOwners.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwOwners.mCode = Convert.ToInt32(dr["Code"].ToString());
						ObjCVarvwOwners.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwOwners.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarvwOwners.mCustomerId = Convert.ToInt32(dr["CustomerId"].ToString());
						ObjCVarvwOwners.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwOwners.mCustomerLocalName = Convert.ToString(dr["CustomerLocalName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwOwners.Add(ObjCVarvwOwners);
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