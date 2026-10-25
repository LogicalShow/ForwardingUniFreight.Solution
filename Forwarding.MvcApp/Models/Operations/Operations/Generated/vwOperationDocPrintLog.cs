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
	public class CPKvwOperationDocPrintLog
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
	public partial class CVarvwOperationDocPrintLog : CPKvwOperationDocPrintLog
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mOperationID;
		internal Int32 mDocumentTypeID;
		internal Int32 mPrintUserID;
		internal String mPrintUserName;
		internal DateTime mPrintDate;
		#endregion

		#region "Methods"
		public Int32 OperationID
		{
			get { return mOperationID; }
			set { mOperationID = value; }
		}
		public Int32 DocumentTypeID
		{
			get { return mDocumentTypeID; }
			set { mDocumentTypeID = value; }
		}
		public Int32 PrintUserID
		{
			get { return mPrintUserID; }
			set { mPrintUserID = value; }
		}
		public String PrintUserName
		{
			get { return mPrintUserName; }
			set { mPrintUserName = value; }
		}
		public DateTime PrintDate
		{
			get { return mPrintDate; }
			set { mPrintDate = value; }
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

	public partial class CvwOperationDocPrintLog
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
		public List<CVarvwOperationDocPrintLog> lstCVarvwOperationDocPrintLog = new List<CVarvwOperationDocPrintLog>();
		#endregion

		#region "Select Methods"
		public Exception GetList(string WhereClause)
		{
			return DataFill(WhereClause, true);
		}
		private Exception DataFill(string Param, Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarvwOperationDocPrintLog.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwOperationDocPrintLog";
					Com.Parameters[0].Value = Param;
				}
				Com.Transaction = tr;
				Com.Connection = Con;
				dr = Com.ExecuteReader();
				try
				{
					while (dr.Read())
					{
						/*Start DataReader*/
						CVarvwOperationDocPrintLog ObjCVarvwOperationDocPrintLog = new CVarvwOperationDocPrintLog();
						ObjCVarvwOperationDocPrintLog.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwOperationDocPrintLog.mOperationID = Convert.ToInt32(dr["OperationID"].ToString());
						ObjCVarvwOperationDocPrintLog.mDocumentTypeID = Convert.ToInt32(dr["DocumentTypeID"].ToString());
						ObjCVarvwOperationDocPrintLog.mPrintUserID = Convert.ToInt32(dr["PrintUserID"].ToString());
						ObjCVarvwOperationDocPrintLog.mPrintUserName = Convert.ToString(dr["PrintUserName"].ToString());
						ObjCVarvwOperationDocPrintLog.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
						lstCVarvwOperationDocPrintLog.Add(ObjCVarvwOperationDocPrintLog);
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
	}

}