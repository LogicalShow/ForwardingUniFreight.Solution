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
	public class CPKWH_PickupDetails
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
	public partial class CVarWH_PickupDetails : CPKWH_PickupDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mPickupID;
		internal Int64 mPurchaseItemID;
		internal Decimal mDemandedQuantity;
		internal String mNotes;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Decimal mPD_AvailableQuantity;
		internal Int32 mPD_PackageTypeID;
		internal String mCreationSource;
		#endregion

		#region "Methods"
		public Int64 PickupID
		{
			get { return mPickupID; }
			set { mIsChanges = true; mPickupID = value; }
		}
		public Int64 PurchaseItemID
		{
			get { return mPurchaseItemID; }
			set { mIsChanges = true; mPurchaseItemID = value; }
		}
		public Decimal DemandedQuantity
		{
			get { return mDemandedQuantity; }
			set { mIsChanges = true; mDemandedQuantity = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mIsChanges = true; mNotes = value; }
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
		public Decimal PD_AvailableQuantity
		{
			get { return mPD_AvailableQuantity; }
			set { mIsChanges = true; mPD_AvailableQuantity = value; }
		}
		public Int32 PD_PackageTypeID
		{
			get { return mPD_PackageTypeID; }
			set { mIsChanges = true; mPD_PackageTypeID = value; }
		}
		public String CreationSource
		{
			get { return mCreationSource; }
			set { mIsChanges = true; mCreationSource = value; }
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

	public partial class CWH_PickupDetails
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
		public List<CVarWH_PickupDetails> lstCVarWH_PickupDetails = new List<CVarWH_PickupDetails>();
		public List<CPKWH_PickupDetails> lstDeletedCPKWH_PickupDetails = new List<CPKWH_PickupDetails>();
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
			lstCVarWH_PickupDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_PickupDetails";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_PickupDetails";
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
						CVarWH_PickupDetails ObjCVarWH_PickupDetails = new CVarWH_PickupDetails();
						ObjCVarWH_PickupDetails.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_PickupDetails.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarWH_PickupDetails.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarWH_PickupDetails.mDemandedQuantity = Convert.ToDecimal(dr["DemandedQuantity"].ToString());
						ObjCVarWH_PickupDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarWH_PickupDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_PickupDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_PickupDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_PickupDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_PickupDetails.mPD_AvailableQuantity = Convert.ToDecimal(dr["PD_AvailableQuantity"].ToString());
						ObjCVarWH_PickupDetails.mPD_PackageTypeID = Convert.ToInt32(dr["PD_PackageTypeID"].ToString());
						ObjCVarWH_PickupDetails.mCreationSource = Convert.ToString(dr["CreationSource"].ToString());
						lstCVarWH_PickupDetails.Add(ObjCVarWH_PickupDetails);
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
			lstCVarWH_PickupDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_PickupDetails";
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
						CVarWH_PickupDetails ObjCVarWH_PickupDetails = new CVarWH_PickupDetails();
						ObjCVarWH_PickupDetails.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarWH_PickupDetails.mPickupID = Convert.ToInt64(dr["PickupID"].ToString());
						ObjCVarWH_PickupDetails.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
						ObjCVarWH_PickupDetails.mDemandedQuantity = Convert.ToDecimal(dr["DemandedQuantity"].ToString());
						ObjCVarWH_PickupDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarWH_PickupDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_PickupDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_PickupDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarWH_PickupDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarWH_PickupDetails.mPD_AvailableQuantity = Convert.ToDecimal(dr["PD_AvailableQuantity"].ToString());
						ObjCVarWH_PickupDetails.mPD_PackageTypeID = Convert.ToInt32(dr["PD_PackageTypeID"].ToString());
						ObjCVarWH_PickupDetails.mCreationSource = Convert.ToString(dr["CreationSource"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_PickupDetails.Add(ObjCVarWH_PickupDetails);
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
					Com.CommandText = "[dbo].DeleteListWH_PickupDetails";
				else
					Com.CommandText = "[dbo].UpdateListWH_PickupDetails";
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
		public Exception DeleteItem(List<CPKWH_PickupDetails> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_PickupDetails";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
				foreach (CPKWH_PickupDetails ObjCPKWH_PickupDetails in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_PickupDetails.ID);
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
		public Exception SaveMethod(List<CVarWH_PickupDetails> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@PickupID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@DemandedQuantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@PD_AvailableQuantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@PD_PackageTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationSource", SqlDbType.NVarChar));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_PickupDetails ObjCVarWH_PickupDetails in SaveList)
				{
					if (ObjCVarWH_PickupDetails.mIsChanges == true)
					{
						if (ObjCVarWH_PickupDetails.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_PickupDetails";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_PickupDetails.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_PickupDetails";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_PickupDetails.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_PickupDetails.ID;
						}
						Com.Parameters["@PickupID"].Value = ObjCVarWH_PickupDetails.PickupID;
						Com.Parameters["@PurchaseItemID"].Value = ObjCVarWH_PickupDetails.PurchaseItemID;
						Com.Parameters["@DemandedQuantity"].Value = ObjCVarWH_PickupDetails.DemandedQuantity;
						Com.Parameters["@Notes"].Value = ObjCVarWH_PickupDetails.Notes;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_PickupDetails.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_PickupDetails.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_PickupDetails.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarWH_PickupDetails.ModificationDate;
						Com.Parameters["@PD_AvailableQuantity"].Value = ObjCVarWH_PickupDetails.PD_AvailableQuantity;
						Com.Parameters["@PD_PackageTypeID"].Value = ObjCVarWH_PickupDetails.PD_PackageTypeID;
						Com.Parameters["@CreationSource"].Value = ObjCVarWH_PickupDetails.CreationSource;
						EndTrans(Com, Con);
						if (ObjCVarWH_PickupDetails.ID == 0)
						{
							ObjCVarWH_PickupDetails.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_PickupDetails.mIsChanges = false;
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
