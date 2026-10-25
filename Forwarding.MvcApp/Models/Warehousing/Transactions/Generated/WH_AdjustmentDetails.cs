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
	public class CPKWH_AdjustmentDetails
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
	public partial class CVarWH_AdjustmentDetails : CPKWH_AdjustmentDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mAdjustID;
		internal Int32 mPurchaseItemID;
		internal Int32 mPackageTypeID;
		internal Decimal mOldQuantity;
		internal Decimal mNewQuantity;
		internal Int32 mLocationID;
		internal String mBatchNumber;
		internal DateTime mReceiveDate;
		internal DateTime mProductionDate;
		internal DateTime mExpirationDate;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Int64 mItemBalanceID;
		#endregion

		#region "Methods"
		public Int32 AdjustID
		{
			get { return mAdjustID; }
			set { mIsChanges = true; mAdjustID = value; }
		}
		public Int32 PurchaseItemID
		{
			get { return mPurchaseItemID; }
			set { mIsChanges = true; mPurchaseItemID = value; }
		}
		public Int32 PackageTypeID
		{
			get { return mPackageTypeID; }
			set { mIsChanges = true; mPackageTypeID = value; }
		}
		public Decimal OldQuantity
		{
			get { return mOldQuantity; }
			set { mIsChanges = true; mOldQuantity = value; }
		}
		public Decimal NewQuantity
		{
			get { return mNewQuantity; }
			set { mIsChanges = true; mNewQuantity = value; }
		}
		public Int32 LocationID
		{
			get { return mLocationID; }
			set { mIsChanges = true; mLocationID = value; }
		}
		public String BatchNumber
		{
			get { return mBatchNumber; }
			set { mIsChanges = true; mBatchNumber = value; }
		}
		public DateTime ReceiveDate
		{
			get { return mReceiveDate; }
			set { mIsChanges = true; mReceiveDate = value; }
		}
		public DateTime ProductionDate
		{
			get { return mProductionDate; }
			set { mIsChanges = true; mProductionDate = value; }
		}
		public DateTime ExpirationDate
		{
			get { return mExpirationDate; }
			set { mIsChanges = true; mExpirationDate = value; }
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
		public Int64 ItemBalanceID
		{
			get { return mItemBalanceID; }
			set { mIsChanges = true; mItemBalanceID = value; }
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

	public partial class CWH_AdjustmentDetails
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
		public List<CVarWH_AdjustmentDetails> lstCVarWH_AdjustmentDetails = new List<CVarWH_AdjustmentDetails>();
		public List<CPKWH_AdjustmentDetails> lstDeletedCPKWH_AdjustmentDetails = new List<CPKWH_AdjustmentDetails>();
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
		public Exception GetItem(Int32 ID)
		{
			return DataFill(Convert.ToString(ID), false);
		}
		private Exception DataFill(string Param, Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarWH_AdjustmentDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_AdjustmentDetails";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_AdjustmentDetails";
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
						CVarWH_AdjustmentDetails ObjCVarWH_AdjustmentDetails = new CVarWH_AdjustmentDetails();
						ObjCVarWH_AdjustmentDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_AdjustmentDetails.mAdjustID = Convert.ToInt32(dr["AdjustID"].ToString());
						ObjCVarWH_AdjustmentDetails.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
						ObjCVarWH_AdjustmentDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarWH_AdjustmentDetails.mOldQuantity = Convert.ToDecimal(dr["OldQuantity"].ToString());
						ObjCVarWH_AdjustmentDetails.mNewQuantity = Convert.ToDecimal(dr["NewQuantity"].ToString());
						ObjCVarWH_AdjustmentDetails.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarWH_AdjustmentDetails.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarWH_AdjustmentDetails.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_AdjustmentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_AdjustmentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mItemBalanceID = Convert.ToInt64(dr["ItemBalanceID"].ToString());
						lstCVarWH_AdjustmentDetails.Add(ObjCVarWH_AdjustmentDetails);
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
			lstCVarWH_AdjustmentDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_AdjustmentDetails";
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
						CVarWH_AdjustmentDetails ObjCVarWH_AdjustmentDetails = new CVarWH_AdjustmentDetails();
						ObjCVarWH_AdjustmentDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_AdjustmentDetails.mAdjustID = Convert.ToInt32(dr["AdjustID"].ToString());
						ObjCVarWH_AdjustmentDetails.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
						ObjCVarWH_AdjustmentDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarWH_AdjustmentDetails.mOldQuantity = Convert.ToDecimal(dr["OldQuantity"].ToString());
						ObjCVarWH_AdjustmentDetails.mNewQuantity = Convert.ToDecimal(dr["NewQuantity"].ToString());
						ObjCVarWH_AdjustmentDetails.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarWH_AdjustmentDetails.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarWH_AdjustmentDetails.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_AdjustmentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_AdjustmentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_AdjustmentDetails.mItemBalanceID = Convert.ToInt64(dr["ItemBalanceID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_AdjustmentDetails.Add(ObjCVarWH_AdjustmentDetails);
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
					Com.CommandText = "[dbo].DeleteListWH_AdjustmentDetails";
				else
					Com.CommandText = "[dbo].UpdateListWH_AdjustmentDetails";
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
		public Exception DeleteItem(List<CPKWH_AdjustmentDetails> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_AdjustmentDetails";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_AdjustmentDetails ObjCPKWH_AdjustmentDetails in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_AdjustmentDetails.ID);
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
		public Exception SaveMethod(List<CVarWH_AdjustmentDetails> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@AdjustID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@OldQuantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@NewQuantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@LocationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@BatchNumber", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@ReceiveDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ProductionDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ExpirationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ItemBalanceID", SqlDbType.BigInt));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_AdjustmentDetails ObjCVarWH_AdjustmentDetails in SaveList)
				{
					if (ObjCVarWH_AdjustmentDetails.mIsChanges == true)
					{
						if (ObjCVarWH_AdjustmentDetails.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_AdjustmentDetails";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_AdjustmentDetails.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_AdjustmentDetails";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_AdjustmentDetails.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_AdjustmentDetails.ID;
						}
						Com.Parameters["@AdjustID"].Value = ObjCVarWH_AdjustmentDetails.AdjustID;
						Com.Parameters["@PurchaseItemID"].Value = ObjCVarWH_AdjustmentDetails.PurchaseItemID;
						Com.Parameters["@PackageTypeID"].Value = ObjCVarWH_AdjustmentDetails.PackageTypeID;
						Com.Parameters["@OldQuantity"].Value = ObjCVarWH_AdjustmentDetails.OldQuantity;
						Com.Parameters["@NewQuantity"].Value = ObjCVarWH_AdjustmentDetails.NewQuantity;
						Com.Parameters["@LocationID"].Value = ObjCVarWH_AdjustmentDetails.LocationID;
						Com.Parameters["@BatchNumber"].Value = ObjCVarWH_AdjustmentDetails.BatchNumber;
						Com.Parameters["@ReceiveDate"].Value = ObjCVarWH_AdjustmentDetails.ReceiveDate;
						Com.Parameters["@ProductionDate"].Value = ObjCVarWH_AdjustmentDetails.ProductionDate;
						Com.Parameters["@ExpirationDate"].Value = ObjCVarWH_AdjustmentDetails.ExpirationDate;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_AdjustmentDetails.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_AdjustmentDetails.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_AdjustmentDetails.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_AdjustmentDetails.ModificationDate;
						Com.Parameters["@ItemBalanceID"].Value = ObjCVarWH_AdjustmentDetails.ItemBalanceID;
						EndTrans(Com, Con);
						if (ObjCVarWH_AdjustmentDetails.ID == 0)
						{
							ObjCVarWH_AdjustmentDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_AdjustmentDetails.mIsChanges = false;
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