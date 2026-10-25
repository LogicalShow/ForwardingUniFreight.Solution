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
	public class CPKWH_TransferDetails
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
	public partial class CVarWH_TransferDetails : CPKWH_TransferDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mTransferID;
		internal Int32 mPackageTypeID;
		internal Decimal mQuantity;
		internal String mPalletID;
		internal String mBatchNumber;
		internal DateTime mProductionDate;
		internal DateTime mExpirationDate;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Int32 mLocationID;
		internal Int32 mItemBalanceID;
		#endregion

		#region "Methods"
		public Int32 TransferID
		{
			get { return mTransferID; }
			set { mIsChanges = true; mTransferID = value; }
		}
		public Int32 PackageTypeID
		{
			get { return mPackageTypeID; }
			set { mIsChanges = true; mPackageTypeID = value; }
		}
		public Decimal Quantity
		{
			get { return mQuantity; }
			set { mIsChanges = true; mQuantity = value; }
		}
		public String PalletID
		{
			get { return mPalletID; }
			set { mIsChanges = true; mPalletID = value; }
		}
		public String BatchNumber
		{
			get { return mBatchNumber; }
			set { mIsChanges = true; mBatchNumber = value; }
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
		public Int32 LocationID
		{
			get { return mLocationID; }
			set { mIsChanges = true; mLocationID = value; }
		}
		public Int32 ItemBalanceID
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

	public partial class CWH_TransferDetails
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
		public List<CVarWH_TransferDetails> lstCVarWH_TransferDetails = new List<CVarWH_TransferDetails>();
		public List<CPKWH_TransferDetails> lstDeletedCPKWH_TransferDetails = new List<CPKWH_TransferDetails>();
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
			lstCVarWH_TransferDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_TransferDetails";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_TransferDetails";
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
						CVarWH_TransferDetails ObjCVarWH_TransferDetails = new CVarWH_TransferDetails();
						ObjCVarWH_TransferDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_TransferDetails.mTransferID = Convert.ToInt32(dr["TransferID"].ToString());
						ObjCVarWH_TransferDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarWH_TransferDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarWH_TransferDetails.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarWH_TransferDetails.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarWH_TransferDetails.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarWH_TransferDetails.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarWH_TransferDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_TransferDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_TransferDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_TransferDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_TransferDetails.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarWH_TransferDetails.mItemBalanceID = Convert.ToInt32(dr["ItemBalanceID"].ToString());
						lstCVarWH_TransferDetails.Add(ObjCVarWH_TransferDetails);
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
			lstCVarWH_TransferDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_TransferDetails";
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
						CVarWH_TransferDetails ObjCVarWH_TransferDetails = new CVarWH_TransferDetails();
						ObjCVarWH_TransferDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_TransferDetails.mTransferID = Convert.ToInt32(dr["TransferID"].ToString());
						ObjCVarWH_TransferDetails.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
						ObjCVarWH_TransferDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
						ObjCVarWH_TransferDetails.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarWH_TransferDetails.mBatchNumber = Convert.ToString(dr["BatchNumber"].ToString());
						ObjCVarWH_TransferDetails.mProductionDate = Convert.ToDateTime(dr["ProductionDate"].ToString());
						ObjCVarWH_TransferDetails.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarWH_TransferDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_TransferDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_TransferDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_TransferDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_TransferDetails.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarWH_TransferDetails.mItemBalanceID = Convert.ToInt32(dr["ItemBalanceID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_TransferDetails.Add(ObjCVarWH_TransferDetails);
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
					Com.CommandText = "[dbo].DeleteListWH_TransferDetails";
				else
					Com.CommandText = "[dbo].UpdateListWH_TransferDetails";
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
		public Exception DeleteItem(List<CPKWH_TransferDetails> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_TransferDetails";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_TransferDetails ObjCPKWH_TransferDetails in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_TransferDetails.ID);
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
		public Exception SaveMethod(List<CVarWH_TransferDetails> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@TransferID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@PalletID", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@BatchNumber", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@ProductionDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ExpirationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@LocationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ItemBalanceID", SqlDbType.Int));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_TransferDetails ObjCVarWH_TransferDetails in SaveList)
				{
					if (ObjCVarWH_TransferDetails.mIsChanges == true)
					{
						if (ObjCVarWH_TransferDetails.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_TransferDetails";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_TransferDetails.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_TransferDetails";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_TransferDetails.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_TransferDetails.ID;
						}
						Com.Parameters["@TransferID"].Value = ObjCVarWH_TransferDetails.TransferID;
						Com.Parameters["@PackageTypeID"].Value = ObjCVarWH_TransferDetails.PackageTypeID;
						Com.Parameters["@Quantity"].Value = ObjCVarWH_TransferDetails.Quantity;
						Com.Parameters["@PalletID"].Value = ObjCVarWH_TransferDetails.PalletID;
						Com.Parameters["@BatchNumber"].Value = ObjCVarWH_TransferDetails.BatchNumber;
						Com.Parameters["@ProductionDate"].Value = ObjCVarWH_TransferDetails.ProductionDate;
						Com.Parameters["@ExpirationDate"].Value = ObjCVarWH_TransferDetails.ExpirationDate;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_TransferDetails.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_TransferDetails.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_TransferDetails.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_TransferDetails.ModificationDate;
						Com.Parameters["@LocationID"].Value = ObjCVarWH_TransferDetails.LocationID;
						Com.Parameters["@ItemBalanceID"].Value = ObjCVarWH_TransferDetails.ItemBalanceID;
						EndTrans(Com, Con);
						if (ObjCVarWH_TransferDetails.ID == 0)
						{
							ObjCVarWH_TransferDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_TransferDetails.mIsChanges = false;
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