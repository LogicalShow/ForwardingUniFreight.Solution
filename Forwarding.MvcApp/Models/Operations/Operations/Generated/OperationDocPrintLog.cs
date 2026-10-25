using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
	[Serializable]
	public class CPKOperationDocPrintLog
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
	public partial class CVarOperationDocPrintLog : CPKOperationDocPrintLog
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mOperationID;
		internal Int32 mDocumentTypeID;
		internal Int32 mPrintUserID;
		internal DateTime mPrintDate;
		#endregion

		#region "Methods"
		public Int32 OperationID
		{
			get { return mOperationID; }
			set { mIsChanges = true; mOperationID = value; }
		}
		public Int32 DocumentTypeID
		{
			get { return mDocumentTypeID; }
			set { mIsChanges = true; mDocumentTypeID = value; }
		}
		public Int32 PrintUserID
		{
			get { return mPrintUserID; }
			set { mIsChanges = true; mPrintUserID = value; }
		}
		public DateTime PrintDate
		{
			get { return mPrintDate; }
			set { mIsChanges = true; mPrintDate = value; }
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

	public partial class COperationDocPrintLog
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
		public List<CVarOperationDocPrintLog> lstCVarOperationDocPrintLog = new List<CVarOperationDocPrintLog>();
		public List<CPKOperationDocPrintLog> lstDeletedCPKOperationDocPrintLog = new List<CPKOperationDocPrintLog>();
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
			lstCVarOperationDocPrintLog.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListOperationDocPrintLog";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemOperationDocPrintLog";
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
						CVarOperationDocPrintLog ObjCVarOperationDocPrintLog = new CVarOperationDocPrintLog();
						ObjCVarOperationDocPrintLog.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarOperationDocPrintLog.mOperationID = Convert.ToInt32(dr["OperationID"].ToString());
						ObjCVarOperationDocPrintLog.mDocumentTypeID = Convert.ToInt32(dr["DocumentTypeID"].ToString());
						ObjCVarOperationDocPrintLog.mPrintUserID = Convert.ToInt32(dr["PrintUserID"].ToString());
						ObjCVarOperationDocPrintLog.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
						lstCVarOperationDocPrintLog.Add(ObjCVarOperationDocPrintLog);
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
					Com.CommandText = "[dbo].DeleteListOperationDocPrintLog";
				else
					Com.CommandText = "[dbo].UpdateListOperationDocPrintLog";
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
		#region "Save Methods"
		public Exception SaveMethod(List<CVarOperationDocPrintLog> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@DocumentTypeID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PrintUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@PrintDate", SqlDbType.DateTime));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarOperationDocPrintLog ObjCVarOperationDocPrintLog in SaveList)
				{
					if (ObjCVarOperationDocPrintLog.mIsChanges == true)
					{
						if (ObjCVarOperationDocPrintLog.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemOperationDocPrintLog";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarOperationDocPrintLog.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemOperationDocPrintLog";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarOperationDocPrintLog.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarOperationDocPrintLog.ID;
						}
						Com.Parameters["@OperationID"].Value = ObjCVarOperationDocPrintLog.OperationID;
						Com.Parameters["@DocumentTypeID"].Value = ObjCVarOperationDocPrintLog.DocumentTypeID;
						Com.Parameters["@PrintUserID"].Value = ObjCVarOperationDocPrintLog.PrintUserID;
						Com.Parameters["@PrintDate"].Value = ObjCVarOperationDocPrintLog.PrintDate;
						EndTrans(Com, Con);
						if (ObjCVarOperationDocPrintLog.ID == 0)
						{
							ObjCVarOperationDocPrintLog.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarOperationDocPrintLog.mIsChanges = false;
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