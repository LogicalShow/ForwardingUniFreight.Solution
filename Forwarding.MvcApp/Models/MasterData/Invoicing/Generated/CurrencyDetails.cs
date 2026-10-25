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
	public class CPKCurrencyDetails
	{
		#region "variables"
		private Int64 mID;
		#endregion

		#region "Methods"
		public Int64 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		#endregion
	}
	[Serializable]
	public partial class CVarCurrencyDetails : CPKCurrencyDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mCurrency_ID;
		internal DateTime mFromDate;
		internal DateTime mToDate;
		internal Decimal mExchangeRate;
		internal Decimal mSellingRate;
		#endregion

		#region "Methods"
		public Int32 Currency_ID
		{
			get { return mCurrency_ID; }
			set { mIsChanges = true ;mCurrency_ID = value; }
		}
		public DateTime FromDate
		{
			get { return mFromDate; }
			set { mIsChanges = true ;mFromDate = value; }
		}
		public DateTime ToDate
		{
			get { return mToDate; }
			set { mIsChanges = true ;mToDate = value; }
		}
		public Decimal ExchangeRate
		{
			get { return mExchangeRate; }
			set { mIsChanges = true ;mExchangeRate = value; }
		}
		public Decimal SellingRate
		{
			get { return mSellingRate; }
			set { mIsChanges = true ;mSellingRate = value; }
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

	public partial class CCurrencyDetails
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
		public List<CVarCurrencyDetails> lstCVarCurrencyDetails= new List<CVarCurrencyDetails>();
		public List<CPKCurrencyDetails> lstDeletedCPKCurrencyDetails = new List<CPKCurrencyDetails>();
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
		public Exception GetItem(Int64 ID)
		{
			return DataFill(Convert.ToString(ID), false);
		}
		private Exception DataFill(string Param , Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarCurrencyDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListCurrencyDetails";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemCurrencyDetails";
					Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
					 Com.Parameters[0].Value = Convert.ToInt64(Param);
				}
				Com.Transaction = tr;
				Com.Connection = Con;
				dr = Com.ExecuteReader();
				try
				{
					while (dr.Read())
					{
						/*Start DataReader*/
						CVarCurrencyDetails ObjCVarCurrencyDetails = new CVarCurrencyDetails();
						ObjCVarCurrencyDetails.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarCurrencyDetails.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
						ObjCVarCurrencyDetails.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
						ObjCVarCurrencyDetails.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
						ObjCVarCurrencyDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
						ObjCVarCurrencyDetails.mSellingRate = Convert.ToDecimal(dr["SellingRate"].ToString());
						lstCVarCurrencyDetails.Add(ObjCVarCurrencyDetails);
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
			lstCVarCurrencyDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingCurrencyDetails";
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
						CVarCurrencyDetails ObjCVarCurrencyDetails = new CVarCurrencyDetails();
						ObjCVarCurrencyDetails.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarCurrencyDetails.mCurrency_ID = Convert.ToInt32(dr["Currency_ID"].ToString());
						ObjCVarCurrencyDetails.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
						ObjCVarCurrencyDetails.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
						ObjCVarCurrencyDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
						ObjCVarCurrencyDetails.mSellingRate = Convert.ToDecimal(dr["SellingRate"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarCurrencyDetails.Add(ObjCVarCurrencyDetails);
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
			#region "Common Methods"
			private void BeginTrans(SqlCommand Com,SqlConnection Con)
				{

					tr = Con.BeginTransaction(IsolationLevel.Serializable);
					Com.CommandType = CommandType.StoredProcedure;
				}

			private void EndTrans(SqlCommand Com,SqlConnection Con)
				{

					Com.Transaction = tr;
					Com.Connection = Con;
					Com.ExecuteNonQuery();
					tr.Commit();
				}

			#endregion
			#region "Set List Method"
			private Exception SetList(string WhereClause,Boolean IsDelete)
				{

					Exception Exp = null;
					SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
					SqlCommand Com;
					try
						{
							Con.Open();
							Com = new SqlCommand();
							if(IsDelete == true)
							Com.CommandText = "[dbo].DeleteListCurrencyDetails";
							else
							Com.CommandText = "[dbo].UpdateListCurrencyDetails";
								Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
									BeginTrans(Com,Con);
								Com.Parameters[0].Value = WhereClause;
									EndTrans(Com,Con);
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
			#region "Delete Methods"
			public Exception DeleteItem(List<CPKCurrencyDetails> DeleteList)
				{

					Exception Exp = null;
					SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
					SqlCommand Com;
					try
						{
							Con.Open();
							Com = new SqlCommand();
							Com.CommandText = "[dbo].DeleteItemCurrencyDetails";
							Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
							foreach (CPKCurrencyDetails ObjCPKCurrencyDetails in DeleteList)
								{
									BeginTrans(Com,Con);
									 Com.Parameters[0].Value = Convert.ToInt64(ObjCPKCurrencyDetails.ID);
									EndTrans(Com,Con);
								}
						}
					catch ( Exception ex)
						{
							Exp =ex;
						}
					finally
						{
							Con.Close();
							Con.Dispose();
							DeleteList.Clear();
						}
					return Exp;
				}

			public Exception DeleteList(string WhereClause)
				{

					return SetList(WhereClause,true);
				}

			#endregion
			#region "Save Methods"
			public Exception SaveMethod(List<CVarCurrencyDetails> SaveList)
				{
					Exception Exp = null;
					SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
					SqlCommand Com;
					try
						{
							Con.Open();
							Com = new SqlCommand();
							Com.Parameters.Add(new SqlParameter("@Currency_ID", SqlDbType.Int));
							Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
							Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
							Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
							Com.Parameters.Add(new SqlParameter("@SellingRate", SqlDbType.Decimal));
								SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt , 0,ParameterDirection.Input,false,0,0,"ID",DataRowVersion.Default,null));
							foreach (CVarCurrencyDetails ObjCVarCurrencyDetails in SaveList)
								{
							if(ObjCVarCurrencyDetails.mIsChanges == true)
								{
									if(ObjCVarCurrencyDetails.ID == 0)
									{
										Com.CommandText = "[dbo].InsertItemCurrencyDetails";
								paraID.Direction = ParameterDirection.Output;
									}
								else if(ObjCVarCurrencyDetails.ID!=0)
									{
										Com.CommandText = "[dbo].UpdateItemCurrencyDetails";
								paraID.Direction = ParameterDirection.Input;
									}
										BeginTrans(Com,Con);
								if(ObjCVarCurrencyDetails.ID!=0)
									{
								Com.Parameters["@ID"].Value =ObjCVarCurrencyDetails.ID;
									}
								Com.Parameters["@Currency_ID"].Value =ObjCVarCurrencyDetails.Currency_ID;
								Com.Parameters["@FromDate"].Value =ObjCVarCurrencyDetails.FromDate;
								Com.Parameters["@ToDate"].Value =ObjCVarCurrencyDetails.ToDate;
								Com.Parameters["@ExchangeRate"].Value =ObjCVarCurrencyDetails.ExchangeRate;
								Com.Parameters["@SellingRate"].Value =ObjCVarCurrencyDetails.SellingRate;
										EndTrans(Com,Con);
								if(ObjCVarCurrencyDetails.ID==0)
										{
								ObjCVarCurrencyDetails.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
										}
									ObjCVarCurrencyDetails.mIsChanges = false;
									}
								}
						}
					catch ( Exception ex)
						{
							Exp = ex;
							if (tr != null)
								tr.Rollback();
						}
					finally
						{
							Con.Close();
							Con.Dispose();
						}
					return Exp;
				}
			#endregion
			#region "Update Methods"
			public Exception UpdateList(string UpdateClause)
				{

					return SetList(UpdateClause,false);
				}

			#endregion
		}
}
