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
	public class CPKWH_QualityActionsLog
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
	public partial class CVarWH_QualityActionsLog : CPKWH_QualityActionsLog
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mReceiveID;
		internal Int32 mLocationID;
		internal String mPalletID;
		internal Int32 mPalletStatusID;
		internal Int32 mPalletClassID;
		internal String mReason;
		internal Boolean mIsPallet;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		#endregion

		#region "Methods"
		public Int32 ReceiveID
		{
			get { return mReceiveID; }
			set { mIsChanges = true; mReceiveID = value; }
		}
		public Int32 LocationID
		{
			get { return mLocationID; }
			set { mIsChanges = true; mLocationID = value; }
		}
		public String PalletID
		{
			get { return mPalletID; }
			set { mIsChanges = true; mPalletID = value; }
		}
		public Int32 PalletStatusID
		{
			get { return mPalletStatusID; }
			set { mIsChanges = true; mPalletStatusID = value; }
		}
		public Int32 PalletClassID
		{
			get { return mPalletClassID; }
			set { mIsChanges = true; mPalletClassID = value; }
		}
		public String Reason
		{
			get { return mReason; }
			set { mIsChanges = true; mReason = value; }
		}
		public Boolean IsPallet
		{
			get { return mIsPallet; }
			set { mIsChanges = true; mIsPallet = value; }
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

	public partial class CWH_QualityActionsLog
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
		public List<CVarWH_QualityActionsLog> lstCVarWH_QualityActionsLog = new List<CVarWH_QualityActionsLog>();
		public List<CPKWH_QualityActionsLog> lstDeletedCPKWH_QualityActionsLog = new List<CPKWH_QualityActionsLog>();
		#endregion

		#region "Select Methods"
		public Exception GetList(string WhereClause)
		{
			return DataFill(WhereClause, true);
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
			lstCVarWH_QualityActionsLog.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListWH_QualityActionsLog";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemWH_QualityActionsLog";
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
						CVarWH_QualityActionsLog ObjCVarWH_QualityActionsLog = new CVarWH_QualityActionsLog();
						ObjCVarWH_QualityActionsLog.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarWH_QualityActionsLog.mReceiveID = Convert.ToInt32(dr["ReceiveID"].ToString());
						ObjCVarWH_QualityActionsLog.mLocationID = Convert.ToInt32(dr["LocationID"].ToString());
						ObjCVarWH_QualityActionsLog.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarWH_QualityActionsLog.mPalletStatusID = Convert.ToInt32(dr["PalletStatusID"].ToString());
						ObjCVarWH_QualityActionsLog.mPalletClassID = Convert.ToInt32(dr["PalletClassID"].ToString());
						ObjCVarWH_QualityActionsLog.mReason = Convert.ToString(dr["Reason"].ToString());
						ObjCVarWH_QualityActionsLog.mIsPallet = Convert.ToBoolean(dr["IsPallet"].ToString());
						ObjCVarWH_QualityActionsLog.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarWH_QualityActionsLog.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						lstCVarWH_QualityActionsLog.Add(ObjCVarWH_QualityActionsLog);
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
		#region "Save Methods"
		public Exception SaveMethod(List<CVarWH_QualityActionsLog> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@ReceiveID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@LocationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PalletID", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@PalletStatusID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PalletClassID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Reason", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@IsPallet", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarWH_QualityActionsLog ObjCVarWH_QualityActionsLog in SaveList)
				{
					if (ObjCVarWH_QualityActionsLog.mIsChanges == true)
					{
						if (ObjCVarWH_QualityActionsLog.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemWH_QualityActionsLog";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarWH_QualityActionsLog.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemWH_QualityActionsLog";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarWH_QualityActionsLog.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarWH_QualityActionsLog.ID;
						}
						Com.Parameters["@ReceiveID"].Value = ObjCVarWH_QualityActionsLog.ReceiveID;
						Com.Parameters["@LocationID"].Value = ObjCVarWH_QualityActionsLog.LocationID;
						Com.Parameters["@PalletID"].Value = ObjCVarWH_QualityActionsLog.PalletID;
						Com.Parameters["@PalletStatusID"].Value = ObjCVarWH_QualityActionsLog.PalletStatusID;
						Com.Parameters["@PalletClassID"].Value = ObjCVarWH_QualityActionsLog.PalletClassID;
						Com.Parameters["@Reason"].Value = ObjCVarWH_QualityActionsLog.Reason;
						Com.Parameters["@IsPallet"].Value = ObjCVarWH_QualityActionsLog.IsPallet;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_QualityActionsLog.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarWH_QualityActionsLog.CreationDate;
						EndTrans(Com, Con);
						if (ObjCVarWH_QualityActionsLog.ID == 0)
						{
							ObjCVarWH_QualityActionsLog.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarWH_QualityActionsLog.mIsChanges = false;
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
	}

}