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
	public partial class CVarvwWH_Services
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mID;
		internal String mName;
		internal String mNameLocal;
		internal Decimal mCost;
		internal Decimal mSelling;
		internal Int32 mCalcTypeID;
		internal String mCalcTypeName;
		internal String mCalcTypeNameLocal;
		#endregion

		#region "Methods"
		public Int32 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public String Name
		{
			get { return mName; }
			set { mName = value; }
		}
		public String NameLocal
		{
			get { return mNameLocal; }
			set { mNameLocal = value; }
		}
		public Decimal Cost
		{
			get { return mCost; }
			set { mCost = value; }
		}
		public Decimal Selling
		{
			get { return mSelling; }
			set { mSelling = value; }
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
		public String CalcTypeNameLocal
		{
			get { return mCalcTypeNameLocal; }
			set { mCalcTypeNameLocal = value; }
		}
		#endregion
	}

	public partial class CvwWH_Services
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
		public List<CVarvwWH_Services> lstCVarvwWH_Services = new List<CVarvwWH_Services>();
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
			lstCVarvwWH_Services.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_Services";
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
						CVarvwWH_Services ObjCVarvwWH_Services = new CVarvwWH_Services();
						ObjCVarvwWH_Services.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_Services.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwWH_Services.mNameLocal = Convert.ToString(dr["NameLocal"].ToString());
						ObjCVarvwWH_Services.mCost = Convert.ToDecimal(dr["Cost"].ToString());
						ObjCVarvwWH_Services.mSelling = Convert.ToDecimal(dr["Selling"].ToString());
						ObjCVarvwWH_Services.mCalcTypeID = Convert.ToInt32(dr["CalcTypeID"].ToString());
						ObjCVarvwWH_Services.mCalcTypeName = Convert.ToString(dr["CalcTypeName"].ToString());
						ObjCVarvwWH_Services.mCalcTypeNameLocal = Convert.ToString(dr["CalcTypeNameLocal"].ToString());
						lstCVarvwWH_Services.Add(ObjCVarvwWH_Services);
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
			lstCVarvwWH_Services.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_Services";
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
						CVarvwWH_Services ObjCVarvwWH_Services = new CVarvwWH_Services();
						ObjCVarvwWH_Services.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_Services.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwWH_Services.mNameLocal = Convert.ToString(dr["NameLocal"].ToString());
						ObjCVarvwWH_Services.mCost = Convert.ToDecimal(dr["Cost"].ToString());
						ObjCVarvwWH_Services.mSelling = Convert.ToDecimal(dr["Selling"].ToString());
						ObjCVarvwWH_Services.mCalcTypeID = Convert.ToInt32(dr["CalcTypeID"].ToString());
						ObjCVarvwWH_Services.mCalcTypeName = Convert.ToString(dr["CalcTypeName"].ToString());
						ObjCVarvwWH_Services.mCalcTypeNameLocal = Convert.ToString(dr["CalcTypeNameLocal"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_Services.Add(ObjCVarvwWH_Services);
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