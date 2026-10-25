using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.LocalEmails.Generated
{
	
	[Serializable]
	public class CPKEmailReceiver
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
	public partial class CVarEmailReceiver : CPKEmailReceiver
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int64 mEmailID;
		internal Int32 mReceiverUserID;
		internal Boolean mIsRead;
		internal Boolean mIsAlarm;
		internal Boolean mIsDeleted;
		internal DateTime mReceivingDate;
		internal Int32 mReceivingTime;
		#endregion

		#region "Methods"
		public Int64 EmailID
		{
			get { return mEmailID; }
			set { mIsChanges = true; mEmailID = value; }
		}
		public Int32 ReceiverUserID
		{
			get { return mReceiverUserID; }
			set { mIsChanges = true; mReceiverUserID = value; }
		}
		public Boolean IsRead
		{
			get { return mIsRead; }
			set { mIsChanges = true; mIsRead = value; }
		}
		public Boolean IsAlarm
		{
			get { return mIsAlarm; }
			set { mIsChanges = true; mIsAlarm = value; }
		}
		public Boolean IsDeleted
		{
			get { return mIsDeleted; }
			set { mIsChanges = true; mIsDeleted = value; }
		}
		public DateTime ReceivingDate
		{
			get { return mReceivingDate; }
			set { mIsChanges = true; mReceivingDate = value; }
		}
		public Int32 ReceivingTime
		{
			get { return mReceivingTime; }
			set { mIsChanges = true; mReceivingTime = value; }
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

	public partial class CEmailReceiver
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
		public List<CVarEmailReceiver> lstCVarEmailReceiver = new List<CVarEmailReceiver>();
		public List<CPKEmailReceiver> lstDeletedCPKEmailReceiver = new List<CPKEmailReceiver>();
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
			lstCVarEmailReceiver.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListEmailReceiver";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemEmailReceiver";
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
						CVarEmailReceiver ObjCVarEmailReceiver = new CVarEmailReceiver();
						ObjCVarEmailReceiver.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarEmailReceiver.mEmailID = Convert.ToInt64(dr["EmailID"].ToString());
						ObjCVarEmailReceiver.mReceiverUserID = Convert.ToInt32(dr["ReceiverUserID"].ToString());
						ObjCVarEmailReceiver.mIsRead = Convert.ToBoolean(dr["IsRead"].ToString());
						ObjCVarEmailReceiver.mIsAlarm = Convert.ToBoolean(dr["IsAlarm"].ToString());
						ObjCVarEmailReceiver.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
						ObjCVarEmailReceiver.mReceivingDate = Convert.ToDateTime(dr["ReceivingDate"].ToString());
						ObjCVarEmailReceiver.mReceivingTime = Convert.ToInt32(dr["ReceivingTime"].ToString());
						lstCVarEmailReceiver.Add(ObjCVarEmailReceiver);
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
			lstCVarEmailReceiver.Clear();

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
				Com.CommandText = "[dbo].GetListPagingEmailReceiver";
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
						CVarEmailReceiver ObjCVarEmailReceiver = new CVarEmailReceiver();
						ObjCVarEmailReceiver.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarEmailReceiver.mEmailID = Convert.ToInt64(dr["EmailID"].ToString());
						ObjCVarEmailReceiver.mReceiverUserID = Convert.ToInt32(dr["ReceiverUserID"].ToString());
						ObjCVarEmailReceiver.mIsRead = Convert.ToBoolean(dr["IsRead"].ToString());
						ObjCVarEmailReceiver.mIsAlarm = Convert.ToBoolean(dr["IsAlarm"].ToString());
						ObjCVarEmailReceiver.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
						ObjCVarEmailReceiver.mReceivingDate = Convert.ToDateTime(dr["ReceivingDate"].ToString());
						ObjCVarEmailReceiver.mReceivingTime = Convert.ToInt32(dr["ReceivingTime"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarEmailReceiver.Add(ObjCVarEmailReceiver);
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
					Com.CommandText = "[dbo].DeleteListEmailReceiver";
				else
					Com.CommandText = "[dbo].UpdateListEmailReceiver";
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
		public Exception DeleteItem(List<CPKEmailReceiver> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemEmailReceiver";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
				foreach (CPKEmailReceiver ObjCPKEmailReceiver in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt64(ObjCPKEmailReceiver.ID);
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
		public Exception SaveMethod(List<CVarEmailReceiver> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@EmailID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@ReceiverUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@IsRead", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@IsAlarm", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@ReceivingDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ReceivingTime", SqlDbType.Int));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarEmailReceiver ObjCVarEmailReceiver in SaveList)
				{
					if (ObjCVarEmailReceiver.mIsChanges == true)
					{
						if (ObjCVarEmailReceiver.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemEmailReceiver";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarEmailReceiver.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemEmailReceiver";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarEmailReceiver.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarEmailReceiver.ID;
						}
						Com.Parameters["@EmailID"].Value = ObjCVarEmailReceiver.EmailID;
						Com.Parameters["@ReceiverUserID"].Value = ObjCVarEmailReceiver.ReceiverUserID;
						Com.Parameters["@IsRead"].Value = ObjCVarEmailReceiver.IsRead;
						Com.Parameters["@IsAlarm"].Value = ObjCVarEmailReceiver.IsAlarm;
						Com.Parameters["@IsDeleted"].Value = ObjCVarEmailReceiver.IsDeleted;
						Com.Parameters["@ReceivingDate"].Value = ObjCVarEmailReceiver.ReceivingDate;
						Com.Parameters["@ReceivingTime"].Value = ObjCVarEmailReceiver.ReceivingTime;
						EndTrans(Com, Con);
						if (ObjCVarEmailReceiver.ID == 0)
						{
							ObjCVarEmailReceiver.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
						}
						ObjCVarEmailReceiver.mIsChanges = false;
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
