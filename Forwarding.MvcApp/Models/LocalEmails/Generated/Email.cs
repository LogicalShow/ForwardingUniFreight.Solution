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
	public class CPKEmail
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
	public partial class CVarEmail : CPKEmail
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal String mSubject;
		internal String mBody;
		internal Int64 mQuotationRouteID;
		internal Int64 mOperationID;
		internal Int32 mSenderUserID;
		internal DateTime mSendingDate;
		internal Int64 mPricingID;
		internal Int32 mRequestOrReply;
		internal Int64 mQuotationRequestID;
		internal Int64 mQuotationRouteRequestID;
		internal Int64 mParentEmailID;
		internal Int32 mEmailSource;
		#endregion

		#region "Methods"
		public String Subject
		{
			get { return mSubject; }
			set { mIsChanges = true; mSubject = value; }
		}
		public String Body
		{
			get { return mBody; }
			set { mIsChanges = true; mBody = value; }
		}
		public Int64 QuotationRouteID
		{
			get { return mQuotationRouteID; }
			set { mIsChanges = true; mQuotationRouteID = value; }
		}
		public Int64 OperationID
		{
			get { return mOperationID; }
			set { mIsChanges = true; mOperationID = value; }
		}
		public Int32 SenderUserID
		{
			get { return mSenderUserID; }
			set { mIsChanges = true; mSenderUserID = value; }
		}
		public DateTime SendingDate
		{
			get { return mSendingDate; }
			set { mIsChanges = true; mSendingDate = value; }
		}
		public Int64 PricingID
		{
			get { return mPricingID; }
			set { mIsChanges = true; mPricingID = value; }
		}
		public Int32 RequestOrReply
		{
			get { return mRequestOrReply; }
			set { mIsChanges = true; mRequestOrReply = value; }
		}
		public Int64 QuotationRequestID
		{
			get { return mQuotationRequestID; }
			set { mIsChanges = true; mQuotationRequestID = value; }
		}
		public Int64 QuotationRouteRequestID
		{
			get { return mQuotationRouteRequestID; }
			set { mIsChanges = true; mQuotationRouteRequestID = value; }
		}
		public Int64 ParentEmailID
		{
			get { return mParentEmailID; }
			set { mIsChanges = true; mParentEmailID = value; }
		}
		public Int32 EmailSource
		{
			get { return mEmailSource; }
			set { mIsChanges = true; mEmailSource = value; }
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

	public partial class CEmail
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
		public List<CVarEmail> lstCVarEmail = new List<CVarEmail>();
		public List<CPKEmail> lstDeletedCPKEmail = new List<CPKEmail>();
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
			lstCVarEmail.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListEmail";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemEmail";
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
						CVarEmail ObjCVarEmail = new CVarEmail();
						ObjCVarEmail.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarEmail.mSubject = Convert.ToString(dr["Subject"].ToString());
						ObjCVarEmail.mBody = Convert.ToString(dr["Body"].ToString());
						ObjCVarEmail.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
						ObjCVarEmail.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
						ObjCVarEmail.mSenderUserID = Convert.ToInt32(dr["SenderUserID"].ToString());
						ObjCVarEmail.mSendingDate = Convert.ToDateTime(dr["SendingDate"].ToString());
						ObjCVarEmail.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
						ObjCVarEmail.mRequestOrReply = Convert.ToInt32(dr["RequestOrReply"].ToString());
						ObjCVarEmail.mQuotationRequestID = Convert.ToInt64(dr["QuotationRequestID"].ToString());
						ObjCVarEmail.mQuotationRouteRequestID = Convert.ToInt64(dr["QuotationRouteRequestID"].ToString());
						ObjCVarEmail.mParentEmailID = Convert.ToInt64(dr["ParentEmailID"].ToString());
						ObjCVarEmail.mEmailSource = Convert.ToInt32(dr["EmailSource"].ToString());
						lstCVarEmail.Add(ObjCVarEmail);
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
			lstCVarEmail.Clear();

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
				Com.CommandText = "[dbo].GetListPagingEmail";
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
						CVarEmail ObjCVarEmail = new CVarEmail();
						ObjCVarEmail.ID = Convert.ToInt64(dr["ID"].ToString());
						ObjCVarEmail.mSubject = Convert.ToString(dr["Subject"].ToString());
						ObjCVarEmail.mBody = Convert.ToString(dr["Body"].ToString());
						ObjCVarEmail.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
						ObjCVarEmail.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
						ObjCVarEmail.mSenderUserID = Convert.ToInt32(dr["SenderUserID"].ToString());
						ObjCVarEmail.mSendingDate = Convert.ToDateTime(dr["SendingDate"].ToString());
						ObjCVarEmail.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
						ObjCVarEmail.mRequestOrReply = Convert.ToInt32(dr["RequestOrReply"].ToString());
						ObjCVarEmail.mQuotationRequestID = Convert.ToInt64(dr["QuotationRequestID"].ToString());
						ObjCVarEmail.mQuotationRouteRequestID = Convert.ToInt64(dr["QuotationRouteRequestID"].ToString());
						ObjCVarEmail.mParentEmailID = Convert.ToInt64(dr["ParentEmailID"].ToString());
						ObjCVarEmail.mEmailSource = Convert.ToInt32(dr["EmailSource"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarEmail.Add(ObjCVarEmail);
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
					Com.CommandText = "[dbo].DeleteListEmail";
				else
					Com.CommandText = "[dbo].UpdateListEmail";
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
		public Exception DeleteItem(List<CPKEmail> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemEmail";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
				foreach (CPKEmail ObjCPKEmail in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt64(ObjCPKEmail.ID);
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
		public Exception SaveMethod(List<CVarEmail> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@Subject", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Body", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@QuotationRouteID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@SenderUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@SendingDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@PricingID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@RequestOrReply", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@QuotationRequestID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@QuotationRouteRequestID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@ParentEmailID", SqlDbType.BigInt));
				Com.Parameters.Add(new SqlParameter("@EmailSource", SqlDbType.Int));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarEmail ObjCVarEmail in SaveList)
				{
					if (ObjCVarEmail.mIsChanges == true)
					{
						if (ObjCVarEmail.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemEmail";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarEmail.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemEmail";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarEmail.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarEmail.ID;
						}
						Com.Parameters["@Subject"].Value = ObjCVarEmail.Subject;
						Com.Parameters["@Body"].Value = ObjCVarEmail.Body;
						Com.Parameters["@QuotationRouteID"].Value = ObjCVarEmail.QuotationRouteID;
						Com.Parameters["@OperationID"].Value = ObjCVarEmail.OperationID;
						Com.Parameters["@SenderUserID"].Value = ObjCVarEmail.SenderUserID;
						Com.Parameters["@SendingDate"].Value = ObjCVarEmail.SendingDate;
						Com.Parameters["@PricingID"].Value = ObjCVarEmail.PricingID;
						Com.Parameters["@RequestOrReply"].Value = ObjCVarEmail.RequestOrReply;
						Com.Parameters["@QuotationRequestID"].Value = ObjCVarEmail.QuotationRequestID;
						Com.Parameters["@QuotationRouteRequestID"].Value = ObjCVarEmail.QuotationRouteRequestID;
						Com.Parameters["@ParentEmailID"].Value = ObjCVarEmail.ParentEmailID;
						Com.Parameters["@EmailSource"].Value = ObjCVarEmail.EmailSource;
						EndTrans(Com, Con);
						if (ObjCVarEmail.ID == 0)
						{
							ObjCVarEmail.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
						}
						ObjCVarEmail.mIsChanges = false;
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
