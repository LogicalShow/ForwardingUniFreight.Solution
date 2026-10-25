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
	public class CPKWH_InvoiceDetails
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
	public partial class CVarWH_InvoiceDetails : CPKWH_InvoiceDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mInvoiceID;
		internal Int64 mReceiveID;
		internal Int64 mPickupID;
		internal Int32 mChargeTypeID;
		internal Int64 mContractDetailsID;
		internal Decimal mSpacePerPallet;
		internal Int32 mDays;
		internal Decimal mRate;
		internal Decimal mAmount;
		internal String mNotes;
		internal Decimal mQty;
		internal Int32 mTransServiceID;
		#endregion

		#region "Methods"
		public Int64 InvoiceID
		{
			get { return mInvoiceID; }
			set { mIsChanges = true; mInvoiceID = value; }
		}
		public Int64 ReceiveID
		{
			get { return mReceiveID; }
			set { mIsChanges = true; mReceiveID = value; }
		}
		public Int64 PickupID
		{
			get { return mPickupID; }
			set { mIsChanges = true; mPickupID = value; }
		}
		public Int32 ChargeTypeID
		{
			get { return mChargeTypeID; }
			set { mIsChanges = true; mChargeTypeID = value; }
		}
		public Int64 ContractDetailsID
		{
			get { return mContractDetailsID; }
			set { mIsChanges = true; mContractDetailsID = value; }
		}
		public Decimal SpacePerPallet
		{
			get { return mSpacePerPallet; }
			set { mIsChanges = true; mSpacePerPallet = value; }
		}
		public Int32 Days
		{
			get { return mDays; }
			set { mIsChanges = true; mDays = value; }
		}
		public Decimal Rate
		{
			get { return mRate; }
			set { mIsChanges = true; mRate = value; }
		}
		public Decimal Amount
		{
			get { return mAmount; }
			set { mIsChanges = true; mAmount = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mIsChanges = true; mNotes = value; }
		}
		public Decimal Qty
		{
			get { return mQty; }
			set { mIsChanges = true; mQty = value; }
		}
		public Int32 TransServiceID
		{
			get { return mTransServiceID; }
			set { mIsChanges = true; mTransServiceID = value; }
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

	public partial class CWH_InvoiceDetails
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
		public List<CVarWH_InvoiceDetails> lstCVarWH_InvoiceDetails = new List<CVarWH_InvoiceDetails>();
		public List<CPKWH_InvoiceDetails> lstDeletedCPKWH_InvoiceDetails = new List<CPKWH_InvoiceDetails>();
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
		public Exception GetItem(Int64 ID)
		{
			return DataFill(Convert.ToString(ID), false);
		}
		private Exception DataFill(string Param, Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarWH_InvoiceDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_InvoiceDetails";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_InvoiceDetails";
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
						CVarWH_InvoiceDetails ObjCVarWH_InvoiceDetails = new CVarWH_InvoiceDetails();
						ObjCVarWH_InvoiceDetails.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_InvoiceDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
						ObjCVarWH_InvoiceDetails.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarWH_InvoiceDetails.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarWH_InvoiceDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						ObjCVarWH_InvoiceDetails.mContractDetailsID = Convert.ToInt64(dr["ContractDetailsID"].ToString());
						ObjCVarWH_InvoiceDetails.mSpacePerPallet = Convert.ToDecimal(dr["SpacePerPallet"].ToString());
						ObjCVarWH_InvoiceDetails.mDays = Convert.ToInt32(dr["Days"].ToString());
						ObjCVarWH_InvoiceDetails.mRate = Convert.ToDecimal(dr["Rate"].ToString());
						ObjCVarWH_InvoiceDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
						ObjCVarWH_InvoiceDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarWH_InvoiceDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
						ObjCVarWH_InvoiceDetails.mTransServiceID = Convert.ToInt32(dr["TransServiceID"].ToString());
						lstCVarWH_InvoiceDetails.Add(ObjCVarWH_InvoiceDetails);
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
			lstCVarWH_InvoiceDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_InvoiceDetails";
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
						CVarWH_InvoiceDetails ObjCVarWH_InvoiceDetails = new CVarWH_InvoiceDetails();
						ObjCVarWH_InvoiceDetails.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_InvoiceDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
						ObjCVarWH_InvoiceDetails.mReceiveID = Convert.ToInt64(dr["ReceiveID"].ToString());
						ObjCVarWH_InvoiceDetails.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarWH_InvoiceDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						ObjCVarWH_InvoiceDetails.mContractDetailsID = Convert.ToInt64(dr["ContractDetailsID"].ToString());
						ObjCVarWH_InvoiceDetails.mSpacePerPallet = Convert.ToDecimal(dr["SpacePerPallet"].ToString());
						ObjCVarWH_InvoiceDetails.mDays = Convert.ToInt32(dr["Days"].ToString());
						ObjCVarWH_InvoiceDetails.mRate = Convert.ToDecimal(dr["Rate"].ToString());
						ObjCVarWH_InvoiceDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
						ObjCVarWH_InvoiceDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarWH_InvoiceDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
						ObjCVarWH_InvoiceDetails.mTransServiceID = Convert.ToInt32(dr["TransServiceID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_InvoiceDetails.Add(ObjCVarWH_InvoiceDetails);
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
		#region "Common Methods"
		private void BeginTrans(SqlCommand Com, SqlConnection Con)
		{

			tr = Con.BeginTransaction(IsolationLevel.Serializable);
			Com.CommandType = CommandType.StoredProcedure;
		}

		private void EndTrans(SqlCommand Com, SqlConnection Con)
		{

			Com.Transaction = tr;
			Com.Connection = Con;
			Com.ExecuteNonQuery();
			tr.Commit();
		}

		#endregion
		#region "Set List Method"
		private Exception SetList(string WhereClause, Boolean IsDelete)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				if (IsDelete == true)
					Com.CommandText = "[dbo].DeleteListWH_InvoiceDetails";
				else
					Com.CommandText = "[dbo].UpdateListWH_InvoiceDetails";
				Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
				BeginTrans(Com, Con);
				Com.Parameters[0].Value = WhereClause;
				EndTrans(Com, Con);
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
		#region "Delete Methods"
		public Exception DeleteItem(List<CPKWH_InvoiceDetails> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_InvoiceDetails";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
				foreach (CPKWH_InvoiceDetails ObjCPKWH_InvoiceDetails in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_InvoiceDetails.ID);
					EndTrans(Com, Con);
				}
			}
			catch (Exception ex)
			{
				Exp = ex;
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

			return SetList(WhereClause, true);
		}

		#endregion
		#region "Save Methods"
		public Exception SaveMethod(List<CVarWH_InvoiceDetails> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@ReceiveID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@PickupID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ContractDetailsID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@SpacePerPallet", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@Days", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Rate", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@TransServiceID", SqlDbType.Int));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_InvoiceDetails ObjCVarWH_InvoiceDetails in SaveList)
				{
					if (ObjCVarWH_InvoiceDetails.mIsChanges == true)
					{
						if (ObjCVarWH_InvoiceDetails.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_InvoiceDetails";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_InvoiceDetails.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_InvoiceDetails";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_InvoiceDetails.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_InvoiceDetails.ID;
						}
						Com.Parameters["@InvoiceID"].Value = ObjCVarWH_InvoiceDetails.InvoiceID;
						Com.Parameters["@ReceiveID"].Value = ObjCVarWH_InvoiceDetails.ReceiveID;
						Com.Parameters["@PickupID"].Value = ObjCVarWH_InvoiceDetails.PickupID;
						Com.Parameters["@ChargeTypeID"].Value = ObjCVarWH_InvoiceDetails.ChargeTypeID;
						Com.Parameters["@ContractDetailsID"].Value = ObjCVarWH_InvoiceDetails.ContractDetailsID;
						Com.Parameters["@SpacePerPallet"].Value = ObjCVarWH_InvoiceDetails.SpacePerPallet;
						Com.Parameters["@Days"].Value = ObjCVarWH_InvoiceDetails.Days;
						Com.Parameters["@Rate"].Value = ObjCVarWH_InvoiceDetails.Rate;
						Com.Parameters["@Amount"].Value = ObjCVarWH_InvoiceDetails.Amount;
						Com.Parameters["@Notes"].Value = ObjCVarWH_InvoiceDetails.Notes;
						Com.Parameters["@Qty"].Value = ObjCVarWH_InvoiceDetails.Qty;
						Com.Parameters["@TransServiceID"].Value = ObjCVarWH_InvoiceDetails.TransServiceID;
						EndTrans(Com, Con);
						if (ObjCVarWH_InvoiceDetails.ID == 0)
						{
							ObjCVarWH_InvoiceDetails.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_InvoiceDetails.mIsChanges = false;
					}
				}
			}
			catch (Exception ex)
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

			return SetList(UpdateClause, false);
		}

		#endregion
	}

}
