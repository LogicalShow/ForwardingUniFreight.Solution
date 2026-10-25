using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
	[Serializable]
	public class CPKA_VoucherInvoicesPayment
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
	public partial class CVarA_VoucherInvoicesPayment : CPKA_VoucherInvoicesPayment
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mVoucherID;
		internal Int32 mInvoiceID;
		internal Decimal mDueAmount;
		internal Int32 mVoucherTypeID;
		internal Int32 mCurrencyID;
		internal Int64 mAccPartnerBalanceID;
		#endregion

		#region "Methods"
		public Int64 VoucherID
		{
			get { return mVoucherID; }
			set { mIsChanges = true ;mVoucherID = value; }
		}
		public Int32 InvoiceID
		{
			get { return mInvoiceID; }
			set { mIsChanges = true ;mInvoiceID = value; }
		}
		public Decimal DueAmount
		{
			get { return mDueAmount; }
			set { mIsChanges = true ;mDueAmount = value; }
		}
		public Int32 VoucherTypeID
		{
			get { return mVoucherTypeID; }
			set { mIsChanges = true ;mVoucherTypeID = value; }
		}
		public Int32 CurrencyID
		{
			get { return mCurrencyID; }
			set { mIsChanges = true ;mCurrencyID = value; }
		}
		public Int64 AccPartnerBalanceID
		{
			get { return mAccPartnerBalanceID; }
			set { mIsChanges = true ;mAccPartnerBalanceID = value; }
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

	public partial class CA_VoucherInvoicesPayment
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
		public List<CVarA_VoucherInvoicesPayment> lstCVarA_VoucherInvoicesPayment= new List<CVarA_VoucherInvoicesPayment>();
		public List<CPKA_VoucherInvoicesPayment> lstDeletedCPKA_VoucherInvoicesPayment = new List<CPKA_VoucherInvoicesPayment>();
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
		public Exception GetItem(Int32 ID)
		{
			return DataFill(Convert.ToString(ID), false);
		}
		private Exception DataFill(string Param , Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarA_VoucherInvoicesPayment.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListA_VoucherInvoicesPayment";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemA_VoucherInvoicesPayment";
					Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
					 Com.Parameters[0].Value = Convert.ToInt32(Param);
				}
				Com.Transaction = tr;
				Com.Connection = Con;
				dr = Com.ExecuteReader();
				try
				{
					while (dr.Read())
					{
						/*Start DataReader*/
						CVarA_VoucherInvoicesPayment ObjCVarA_VoucherInvoicesPayment = new CVarA_VoucherInvoicesPayment();
						ObjCVarA_VoucherInvoicesPayment.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mInvoiceID = Convert.ToInt32(dr["InvoiceID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mDueAmount = Convert.ToDecimal(dr["DueAmount"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mVoucherTypeID = Convert.ToInt32(dr["VoucherTypeID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mAccPartnerBalanceID = Convert.ToInt64(dr["AccPartnerBalanceID"].ToString());
						lstCVarA_VoucherInvoicesPayment.Add(ObjCVarA_VoucherInvoicesPayment);
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
			lstCVarA_VoucherInvoicesPayment.Clear();

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
				Com.CommandText = "[dbo].GetListPagingA_VoucherInvoicesPayment";
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
						CVarA_VoucherInvoicesPayment ObjCVarA_VoucherInvoicesPayment = new CVarA_VoucherInvoicesPayment();
						ObjCVarA_VoucherInvoicesPayment.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mInvoiceID = Convert.ToInt32(dr["InvoiceID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mDueAmount = Convert.ToDecimal(dr["DueAmount"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mVoucherTypeID = Convert.ToInt32(dr["VoucherTypeID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
						ObjCVarA_VoucherInvoicesPayment.mAccPartnerBalanceID = Convert.ToInt64(dr["AccPartnerBalanceID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarA_VoucherInvoicesPayment.Add(ObjCVarA_VoucherInvoicesPayment);
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
							Com.CommandText = "[dbo].DeleteListA_VoucherInvoicesPayment";
							else
							Com.CommandText = "[dbo].UpdateListA_VoucherInvoicesPayment";
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
			public Exception DeleteItem(List<CPKA_VoucherInvoicesPayment> DeleteList)
				{

					Exception Exp = null;
					SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
					SqlCommand Com;
					try
						{
							Con.Open();
							Com = new SqlCommand();
							Com.CommandText = "[dbo].DeleteItemA_VoucherInvoicesPayment";
							Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
							foreach (CPKA_VoucherInvoicesPayment ObjCPKA_VoucherInvoicesPayment in DeleteList)
								{
									BeginTrans(Com,Con);
									 Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_VoucherInvoicesPayment.ID);
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
			public Exception SaveMethod(List<CVarA_VoucherInvoicesPayment> SaveList)
				{
					Exception Exp = null;
					SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
					SqlCommand Com;
					try
						{
							Con.Open();
							Com = new SqlCommand();
							Com.Parameters.Add(new SqlParameter("@VoucherID", SqlDbType.BigInt));
							Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.Int));
							Com.Parameters.Add(new SqlParameter("@DueAmount", SqlDbType.Decimal));
							Com.Parameters.Add(new SqlParameter("@VoucherTypeID", SqlDbType.Int));
							Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
							Com.Parameters.Add(new SqlParameter("@AccPartnerBalanceID", SqlDbType.BigInt));
								SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int , 0,ParameterDirection.Input,false,0,0,"ID",DataRowVersion.Default,null));
							foreach (CVarA_VoucherInvoicesPayment ObjCVarA_VoucherInvoicesPayment in SaveList)
								{
							if(ObjCVarA_VoucherInvoicesPayment.mIsChanges == true)
								{
									if(ObjCVarA_VoucherInvoicesPayment.ID == 0)
									{
										Com.CommandText = "[dbo].InsertItemA_VoucherInvoicesPayment";
								paraID.Direction = ParameterDirection.Output;
									}
								else if(ObjCVarA_VoucherInvoicesPayment.ID!=0)
									{
										Com.CommandText = "[dbo].UpdateItemA_VoucherInvoicesPayment";
								paraID.Direction = ParameterDirection.Input;
									}
										BeginTrans(Com,Con);
								if(ObjCVarA_VoucherInvoicesPayment.ID!=0)
									{
								Com.Parameters["@ID"].Value =ObjCVarA_VoucherInvoicesPayment.ID;
									}
								Com.Parameters["@VoucherID"].Value =ObjCVarA_VoucherInvoicesPayment.VoucherID;
								Com.Parameters["@InvoiceID"].Value =ObjCVarA_VoucherInvoicesPayment.InvoiceID;
								Com.Parameters["@DueAmount"].Value =ObjCVarA_VoucherInvoicesPayment.DueAmount;
								Com.Parameters["@VoucherTypeID"].Value =ObjCVarA_VoucherInvoicesPayment.VoucherTypeID;
								Com.Parameters["@CurrencyID"].Value =ObjCVarA_VoucherInvoicesPayment.CurrencyID;
								Com.Parameters["@AccPartnerBalanceID"].Value =ObjCVarA_VoucherInvoicesPayment.AccPartnerBalanceID;
										EndTrans(Com,Con);
								if(ObjCVarA_VoucherInvoicesPayment.ID==0)
										{
								ObjCVarA_VoucherInvoicesPayment.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
										}
									ObjCVarA_VoucherInvoicesPayment.mIsChanges = false;
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
