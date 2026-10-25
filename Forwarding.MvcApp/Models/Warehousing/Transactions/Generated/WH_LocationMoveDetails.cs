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
	public class CPKWH_LocationMoveDetails
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
	public partial class CVarWH_LocationMoveDetails : CPKWH_LocationMoveDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mFromLocationID;
		internal Int32 mToLocationID;
		internal String mReason;
		internal Int32 mReceiveID;
		internal String mFromPalletID;
		internal String mToPalletID;
		internal Int32 mToPalletStatusID;
		internal Int32 mPurchaseItemID;
		internal Decimal mMovedQuantity;
		internal Boolean mByPallet;
		internal Boolean mByItem;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mMoveID;
		internal Int64 mItemBalanceID;
		#endregion

		#region "Methods"
		public Int32 FromLocationID
		{
			get { return mFromLocationID; }
			set { mIsChanges = true; mFromLocationID = value; }
		}
		public Int32 ToLocationID
		{
			get { return mToLocationID; }
			set { mIsChanges = true; mToLocationID = value; }
		}
		public String Reason
		{
			get { return mReason; }
			set { mIsChanges = true; mReason = value; }
		}
		public Int32 ReceiveID
		{
			get { return mReceiveID; }
			set { mIsChanges = true; mReceiveID = value; }
		}
		public String FromPalletID
		{
			get { return mFromPalletID; }
			set { mIsChanges = true; mFromPalletID = value; }
		}
		public String ToPalletID
		{
			get { return mToPalletID; }
			set { mIsChanges = true; mToPalletID = value; }
		}
		public Int32 ToPalletStatusID
		{
			get { return mToPalletStatusID; }
			set { mIsChanges = true; mToPalletStatusID = value; }
		}
		public Int32 PurchaseItemID
		{
			get { return mPurchaseItemID; }
			set { mIsChanges = true; mPurchaseItemID = value; }
		}
		public Decimal MovedQuantity
		{
			get { return mMovedQuantity; }
			set { mIsChanges = true; mMovedQuantity = value; }
		}
		public Boolean ByPallet
		{
			get { return mByPallet; }
			set { mIsChanges = true; mByPallet = value; }
		}
		public Boolean ByItem
		{
			get { return mByItem; }
			set { mIsChanges = true; mByItem = value; }
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
		public Int32 MoveID
		{
			get { return mMoveID; }
			set { mIsChanges = true; mMoveID = value; }
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

	public partial class CWH_LocationMoveDetails
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
		public List<CVarWH_LocationMoveDetails> lstCVarWH_LocationMoveDetails = new List<CVarWH_LocationMoveDetails>();
		public List<CPKWH_LocationMoveDetails> lstDeletedCPKWH_LocationMoveDetails = new List<CPKWH_LocationMoveDetails>();
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
			lstCVarWH_LocationMoveDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_LocationMoveDetails";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_LocationMoveDetails";
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
						CVarWH_LocationMoveDetails ObjCVarWH_LocationMoveDetails = new CVarWH_LocationMoveDetails();
						ObjCVarWH_LocationMoveDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_LocationMoveDetails.mFromLocationID = Convert.ToInt32(dr["FromLocationID"].ToString());
						ObjCVarWH_LocationMoveDetails.mToLocationID = Convert.ToInt32(dr["ToLocationID"].ToString());
						ObjCVarWH_LocationMoveDetails.mReason = Convert.ToString(dr["Reason"].ToString());
						ObjCVarWH_LocationMoveDetails.mReceiveID = Convert.ToInt32(dr["ReceiveID"].ToString());
						ObjCVarWH_LocationMoveDetails.mFromPalletID = Convert.ToString(dr["FromPalletID"].ToString());
						ObjCVarWH_LocationMoveDetails.mToPalletID = Convert.ToString(dr["ToPalletID"].ToString());
						ObjCVarWH_LocationMoveDetails.mToPalletStatusID = Convert.ToInt32(dr["ToPalletStatusID"].ToString());
						ObjCVarWH_LocationMoveDetails.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
						ObjCVarWH_LocationMoveDetails.mMovedQuantity = Convert.ToDecimal(dr["MovedQuantity"].ToString());
						ObjCVarWH_LocationMoveDetails.mByPallet = Convert.ToBoolean(dr["ByPallet"].ToString());
						ObjCVarWH_LocationMoveDetails.mByItem = Convert.ToBoolean(dr["ByItem"].ToString());
						ObjCVarWH_LocationMoveDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_LocationMoveDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_LocationMoveDetails.mMoveID = Convert.ToInt32(dr["MoveID"].ToString());
						ObjCVarWH_LocationMoveDetails.mItemBalanceID = Convert.ToInt64(dr["ItemBalanceID"].ToString());
						lstCVarWH_LocationMoveDetails.Add(ObjCVarWH_LocationMoveDetails);
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
			lstCVarWH_LocationMoveDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingWH_LocationMoveDetails";
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
						CVarWH_LocationMoveDetails ObjCVarWH_LocationMoveDetails = new CVarWH_LocationMoveDetails();
						ObjCVarWH_LocationMoveDetails.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_LocationMoveDetails.mFromLocationID = Convert.ToInt32(dr["FromLocationID"].ToString());
						ObjCVarWH_LocationMoveDetails.mToLocationID = Convert.ToInt32(dr["ToLocationID"].ToString());
						ObjCVarWH_LocationMoveDetails.mReason = Convert.ToString(dr["Reason"].ToString());
						ObjCVarWH_LocationMoveDetails.mReceiveID = Convert.ToInt32(dr["ReceiveID"].ToString());
						ObjCVarWH_LocationMoveDetails.mFromPalletID = Convert.ToString(dr["FromPalletID"].ToString());
						ObjCVarWH_LocationMoveDetails.mToPalletID = Convert.ToString(dr["ToPalletID"].ToString());
						ObjCVarWH_LocationMoveDetails.mToPalletStatusID = Convert.ToInt32(dr["ToPalletStatusID"].ToString());
						ObjCVarWH_LocationMoveDetails.mPurchaseItemID = Convert.ToInt32(dr["PurchaseItemID"].ToString());
						ObjCVarWH_LocationMoveDetails.mMovedQuantity = Convert.ToDecimal(dr["MovedQuantity"].ToString());
						ObjCVarWH_LocationMoveDetails.mByPallet = Convert.ToBoolean(dr["ByPallet"].ToString());
						ObjCVarWH_LocationMoveDetails.mByItem = Convert.ToBoolean(dr["ByItem"].ToString());
						ObjCVarWH_LocationMoveDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_LocationMoveDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarWH_LocationMoveDetails.mMoveID = Convert.ToInt32(dr["MoveID"].ToString());
						ObjCVarWH_LocationMoveDetails.mItemBalanceID = Convert.ToInt64(dr["ItemBalanceID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarWH_LocationMoveDetails.Add(ObjCVarWH_LocationMoveDetails);
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
					Com.CommandText = "[dbo].DeleteListWH_LocationMoveDetails";
				else
					Com.CommandText = "[dbo].UpdateListWH_LocationMoveDetails";
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
		public Exception DeleteItem(List<CPKWH_LocationMoveDetails> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemWH_LocationMoveDetails";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKWH_LocationMoveDetails ObjCPKWH_LocationMoveDetails in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_LocationMoveDetails.ID);
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
		public Exception SaveMethod(List<CVarWH_LocationMoveDetails> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@FromLocationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ToLocationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Reason", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@ReceiveID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@FromPalletID", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@ToPalletID", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@ToPalletStatusID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@MovedQuantity", SqlDbType.Decimal));
				Com.Parameters.Add(new SqlParameter("@ByPallet", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@ByItem", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@MoveID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ItemBalanceID", SqlDbType.BigInt));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_LocationMoveDetails ObjCVarWH_LocationMoveDetails in SaveList)
				{
					if (ObjCVarWH_LocationMoveDetails.mIsChanges == true)
					{
						if (ObjCVarWH_LocationMoveDetails.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_LocationMoveDetails";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_LocationMoveDetails.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_LocationMoveDetails";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_LocationMoveDetails.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_LocationMoveDetails.ID;
						}
						Com.Parameters["@FromLocationID"].Value = ObjCVarWH_LocationMoveDetails.FromLocationID;
						Com.Parameters["@ToLocationID"].Value = ObjCVarWH_LocationMoveDetails.ToLocationID;
						Com.Parameters["@Reason"].Value = ObjCVarWH_LocationMoveDetails.Reason;
						Com.Parameters["@ReceiveID"].Value = ObjCVarWH_LocationMoveDetails.ReceiveID;
						Com.Parameters["@FromPalletID"].Value = ObjCVarWH_LocationMoveDetails.FromPalletID;
						Com.Parameters["@ToPalletID"].Value = ObjCVarWH_LocationMoveDetails.ToPalletID;
						Com.Parameters["@ToPalletStatusID"].Value = ObjCVarWH_LocationMoveDetails.ToPalletStatusID;
						Com.Parameters["@PurchaseItemID"].Value = ObjCVarWH_LocationMoveDetails.PurchaseItemID;
						Com.Parameters["@MovedQuantity"].Value = ObjCVarWH_LocationMoveDetails.MovedQuantity;
						Com.Parameters["@ByPallet"].Value = ObjCVarWH_LocationMoveDetails.ByPallet;
						Com.Parameters["@ByItem"].Value = ObjCVarWH_LocationMoveDetails.ByItem;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_LocationMoveDetails.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_LocationMoveDetails.CreationDate;
						Com.Parameters["@MoveID"].Value = ObjCVarWH_LocationMoveDetails.MoveID;
						Com.Parameters["@ItemBalanceID"].Value = ObjCVarWH_LocationMoveDetails.ItemBalanceID;
						EndTrans(Com, Con);
						if (ObjCVarWH_LocationMoveDetails.ID == 0)
						{
							ObjCVarWH_LocationMoveDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_LocationMoveDetails.mIsChanges = false;
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