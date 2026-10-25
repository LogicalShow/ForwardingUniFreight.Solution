using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Invoicing.Generated
{
	[Serializable]
	public class CPKvwCurrencyDetails
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
	public partial class CVarvwCurrencyDetails : CPKvwCurrencyDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mCurrencyDetailID;
		internal String mCode;
		internal DateTime mFromDate;
		internal DateTime mToDate;
		internal Decimal mExchangeRate;
		internal Decimal mSellingRate;
		#endregion

		#region "Methods"
		public Int64 CurrencyDetailID
		{
			get { return mCurrencyDetailID; }
			set { mCurrencyDetailID = value; }
		}
		public String Code
		{
			get { return mCode; }
			set { mCode = value; }
		}
		public DateTime FromDate
		{
			get { return mFromDate; }
			set { mFromDate = value; }
		}
		public DateTime ToDate
		{
			get { return mToDate; }
			set { mToDate = value; }
		}
		public Decimal ExchangeRate
		{
			get { return mExchangeRate; }
			set { mExchangeRate = value; }
		}
		public Decimal SellingRate
		{
			get { return mSellingRate; }
			set { mSellingRate = value; }
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

	public partial class CvwCurrencyDetails
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
		public List<CVarvwCurrencyDetails> lstCVarvwCurrencyDetails= new List<CVarvwCurrencyDetails>();
		#endregion

		#region "Select Methods"
		public Exception GetList(string WhereClause)
		{
			return DataFill(WhereClause,true);
		}
		public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
		{
			return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
		}
		private Exception DataFill(string Param , Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarvwCurrencyDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwCurrencyDetails";
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
						CVarvwCurrencyDetails ObjCVarvwCurrencyDetails = new CVarvwCurrencyDetails();
						ObjCVarvwCurrencyDetails.mCurrencyDetailID = Convert.ToInt64(dr["CurrencyDetailID"].ToString());
						ObjCVarvwCurrencyDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwCurrencyDetails.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwCurrencyDetails.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
						ObjCVarvwCurrencyDetails.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
						ObjCVarvwCurrencyDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
						ObjCVarvwCurrencyDetails.mSellingRate = Convert.ToDecimal(dr["SellingRate"].ToString());
						lstCVarvwCurrencyDetails.Add(ObjCVarvwCurrencyDetails);
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
			catch ( Exception ex)
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
			lstCVarvwCurrencyDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwCurrencyDetails";
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
						CVarvwCurrencyDetails ObjCVarvwCurrencyDetails = new CVarvwCurrencyDetails();
						ObjCVarvwCurrencyDetails.mCurrencyDetailID = Convert.ToInt64(dr["CurrencyDetailID"].ToString());
						ObjCVarvwCurrencyDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwCurrencyDetails.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwCurrencyDetails.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
						ObjCVarvwCurrencyDetails.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
						ObjCVarvwCurrencyDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
						ObjCVarvwCurrencyDetails.mSellingRate = Convert.ToDecimal(dr["SellingRate"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwCurrencyDetails.Add(ObjCVarvwCurrencyDetails);
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
			catch ( Exception ex)
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
