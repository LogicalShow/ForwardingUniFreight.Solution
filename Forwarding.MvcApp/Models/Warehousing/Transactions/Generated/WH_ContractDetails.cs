using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
	[Serializable]
	public class CPKWH_ContractDetails
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
	public partial class CVarWH_ContractDetails : CPKWH_ContractDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mContractID;
		internal Int32 mChargeTypeID;
		internal Decimal mQuantity;
		internal Int32 mQuantityUnitID;
		internal Decimal mRate;
		internal Decimal mMinimumCharge;
		internal Decimal mAdditionalRate;
		internal Int32 mTypeID;
		internal Decimal mCost;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Int32 mPackageTypeID;
		internal Int32 mPalletClassID;
		internal Int32 mPaymentTermID;
		#endregion

		#region "Methods"
		public Int32 ContractID
		{
			get { return mContractID; }
			set { mIsChanges = true; mContractID = value; }
		}
		public Int32 ChargeTypeID
		{
			get { return mChargeTypeID; }
			set { mIsChanges = true; mChargeTypeID = value; }
		}
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mIsChanges = true; mQuantity = value; }
		}
		public Int32 QuantityUnitID
		{
			get { return mQuantityUnitID; }
			set { mIsChanges = true; mQuantityUnitID = value; }
		}
		public Decimal Rate
		{
			get { return mRate; }
			set { mIsChanges = true; mRate = value; }
		}
		public Decimal MinimumCharge
		{
			get { return mMinimumCharge; }
			set { mIsChanges = true; mMinimumCharge = value; }
		}
		public Decimal AdditionalRate
		{
			get { return mAdditionalRate; }
			set { mIsChanges = true; mAdditionalRate = value; }
		}
		public Int32 TypeID
		{
			get { return mTypeID; }
			set { mIsChanges = true; mTypeID = value; }
		}
		public Decimal Cost
		{
			get { return mCost; }
			set { mIsChanges = true; mCost = value; }
		}
		public Int32 CreatorUserID
		{
			get { return mCreatorUserID; }
			set { mIsChanges = true; mCreatorUserID = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mIsChanges = true; mCreationDate = value; }
		}
		public Int32 ModificatorUserID
		{
			get { return mModificatorUserID; }
			set { mIsChanges = true; mModificatorUserID = value; }
		}
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mIsChanges = true; mModificationDate = value; }
		}
		public Int32 PackageTypeID
		{
			get { return mPackageTypeID; }
			set { mIsChanges = true; mPackageTypeID = value; }
		}
		public Int32 PalletClassID
		{
			get { return mPalletClassID; }
			set { mIsChanges = true; mPalletClassID = value; }
		}
		public Int32 PaymentTermID
		{
			get { return mPaymentTermID; }
			set { mIsChanges = true; mPaymentTermID = value; }
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

	public partial class CWH_ContractDetails
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
		public List<CVarWH_ContractDetails> lstCVarWH_ContractDetails = new List<CVarWH_ContractDetails>();
		public List<CPKWH_ContractDetails> lstDeletedCPKWH_ContractDetails = new List<CPKWH_ContractDetails>();
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
			lstCVarWH_ContractDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_ContractDetails";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_ContractDetails";
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
						CVarWH_ContractDetails ObjCVarWH_ContractDetails = new CVarWH_ContractDetails();
						ObjCVarWH_ContractDetails.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_ContractDetails.mContractID = Convert.ToInt32(dr["ContractID"].ToString());
						ObjCVarWH_ContractDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						ObjCVarWH_ContractDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarWH_ContractDetails.mQuantityUnitID = Convert.ToInt32(dr["QuantityUnitID"].ToString());
						ObjCVarWH_ContractDetails.mRate = Convert.ToDecimal(dr["Rate"].ToString());
						ObjCVarWH_ContractDetails.mMinimumCharge = Convert.ToDecimal(dr["MinimumCharge"].ToString());
						ObjCVarWH_ContractDetails.mAdditionalRate = Convert.ToDecimal(dr["AdditionalRate"].ToString());
						ObjCVarWH_ContractDetails.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						ObjCVarWH_ContractDetails.mCost = Convert.ToDecimal(dr["Cost"].ToString());
						ObjCVarWH_ContractDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_ContractDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_ContractDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_ContractDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_ContractDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarWH_ContractDetails.mPalletClassID = Convert.ToInt32(dr["PalletClassID"].ToString());
						ObjCVarWH_ContractDetails.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
						lstCVarWH_ContractDetails.Add(ObjCVarWH_ContractDetails);
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
			lstCVarWH_ContractDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_ContractDetails";
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
						CVarWH_ContractDetails ObjCVarWH_ContractDetails = new CVarWH_ContractDetails();
						ObjCVarWH_ContractDetails.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_ContractDetails.mContractID = Convert.ToInt32(dr["ContractID"].ToString());
						ObjCVarWH_ContractDetails.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
						ObjCVarWH_ContractDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarWH_ContractDetails.mQuantityUnitID = Convert.ToInt32(dr["QuantityUnitID"].ToString());
						ObjCVarWH_ContractDetails.mRate = Convert.ToDecimal(dr["Rate"].ToString());
						ObjCVarWH_ContractDetails.mMinimumCharge = Convert.ToDecimal(dr["MinimumCharge"].ToString());
						ObjCVarWH_ContractDetails.mAdditionalRate = Convert.ToDecimal(dr["AdditionalRate"].ToString());
						ObjCVarWH_ContractDetails.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
						ObjCVarWH_ContractDetails.mCost = Convert.ToDecimal(dr["Cost"].ToString());
						ObjCVarWH_ContractDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_ContractDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_ContractDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_ContractDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_ContractDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarWH_ContractDetails.mPalletClassID = Convert.ToInt32(dr["PalletClassID"].ToString());
						ObjCVarWH_ContractDetails.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_ContractDetails.Add(ObjCVarWH_ContractDetails);
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
					Com.CommandText = "[dbo].DeleteListWH_ContractDetails";
				else
					Com.CommandText = "[dbo].UpdateListWH_ContractDetails";
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
		public Exception DeleteItem(List<CPKWH_ContractDetails> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_ContractDetails";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
				foreach (CPKWH_ContractDetails ObjCPKWH_ContractDetails in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_ContractDetails.ID);
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
		public Exception SaveMethod(List<CVarWH_ContractDetails> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@ContractID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@QuantityUnitID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Rate", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@MinimumCharge", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@AdditionalRate", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@TypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PalletClassID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PaymentTermID", SqlDbType.Int));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_ContractDetails ObjCVarWH_ContractDetails in SaveList)
				{
					if (ObjCVarWH_ContractDetails.mIsChanges == true)
					{
						if (ObjCVarWH_ContractDetails.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_ContractDetails";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_ContractDetails.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_ContractDetails";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_ContractDetails.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_ContractDetails.ID;
						}
						Com.Parameters["@ContractID"].Value = ObjCVarWH_ContractDetails.ContractID;
						Com.Parameters["@ChargeTypeID"].Value = ObjCVarWH_ContractDetails.ChargeTypeID;
						Com.Parameters["@Quantity"].Value = ObjCVarWH_ContractDetails.Quantity;
						Com.Parameters["@QuantityUnitID"].Value = ObjCVarWH_ContractDetails.QuantityUnitID;
						Com.Parameters["@Rate"].Value = ObjCVarWH_ContractDetails.Rate;
						Com.Parameters["@MinimumCharge"].Value = ObjCVarWH_ContractDetails.MinimumCharge;
						Com.Parameters["@AdditionalRate"].Value = ObjCVarWH_ContractDetails.AdditionalRate;
						Com.Parameters["@TypeID"].Value = ObjCVarWH_ContractDetails.TypeID;
						Com.Parameters["@Cost"].Value = ObjCVarWH_ContractDetails.Cost;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_ContractDetails.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_ContractDetails.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_ContractDetails.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_ContractDetails.ModificationDate;
						Com.Parameters["@PackageTypeID"].Value = ObjCVarWH_ContractDetails.PackageTypeID;
						Com.Parameters["@PalletClassID"].Value = ObjCVarWH_ContractDetails.PalletClassID;
						Com.Parameters["@PaymentTermID"].Value = ObjCVarWH_ContractDetails.PaymentTermID;
						EndTrans(Com, Con);
						if (ObjCVarWH_ContractDetails.ID == 0)
						{
							ObjCVarWH_ContractDetails.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_ContractDetails.mIsChanges = false;
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
