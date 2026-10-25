using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.Reports.Generated
{
	[Serializable]
	public partial class CVarvwWH_SerialInquiries
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal String mSerial;
		internal DateTime mReceiveDate;
		internal DateTime mOrderDate;
		internal String mPalletID;
		internal String mWarehouseName;
		internal DateTime mCreationDate;
		internal String mCreatorUserName;
		internal DateTime mModificationDate;
		internal String mModificatorUserName;
		#endregion

		#region "Methods"
		public String Serial
		{
			get { return mSerial; }
			set { mSerial = value; }
		}
		public DateTime ReceiveDate
		{
			get { return mReceiveDate; }
			set { mReceiveDate = value; }
		}
		public DateTime OrderDate
		{
			get { return mOrderDate; }
			set { mOrderDate = value; }
		}
		public String PalletID
		{
			get { return mPalletID; }
			set { mPalletID = value; }
		}
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mCreationDate = value; }
		}
		public String CreatorUserName
		{
			get { return mCreatorUserName; }
			set { mCreatorUserName = value; }
		}
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mModificationDate = value; }
		}
		public String ModificatorUserName
		{
			get { return mModificatorUserName; }
			set { mModificatorUserName = value; }
		}
		#endregion
	}

	public partial class CvwWH_SerialInquiries
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
		public List<CVarvwWH_SerialInquiries> lstCVarvwWH_SerialInquiries = new List<CVarvwWH_SerialInquiries>();
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
		private Exception DataFill(string Param, Boolean IsList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarvwWH_SerialInquiries.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_SerialInquiries";
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
						CVarvwWH_SerialInquiries ObjCVarvwWH_SerialInquiries = new CVarvwWH_SerialInquiries();
						ObjCVarvwWH_SerialInquiries.mSerial = Convert.ToString(dr["Serial"].ToString());
						ObjCVarvwWH_SerialInquiries.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_SerialInquiries.mOrderDate = Convert.ToDateTime(dr["OrderDate"].ToString());
						ObjCVarvwWH_SerialInquiries.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_SerialInquiries.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_SerialInquiries.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_SerialInquiries.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						ObjCVarvwWH_SerialInquiries.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwWH_SerialInquiries.mModificatorUserName = Convert.ToString(dr["ModificatorUserName"].ToString());
						lstCVarvwWH_SerialInquiries.Add(ObjCVarvwWH_SerialInquiries);
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
			lstCVarvwWH_SerialInquiries.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_SerialInquiries";
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
						CVarvwWH_SerialInquiries ObjCVarvwWH_SerialInquiries = new CVarvwWH_SerialInquiries();
						ObjCVarvwWH_SerialInquiries.mSerial = Convert.ToString(dr["Serial"].ToString());
						ObjCVarvwWH_SerialInquiries.mReceiveDate = Convert.ToDateTime(dr["ReceiveDate"].ToString());
						ObjCVarvwWH_SerialInquiries.mOrderDate = Convert.ToDateTime(dr["OrderDate"].ToString());
						ObjCVarvwWH_SerialInquiries.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_SerialInquiries.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						ObjCVarvwWH_SerialInquiries.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_SerialInquiries.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						ObjCVarvwWH_SerialInquiries.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwWH_SerialInquiries.mModificatorUserName = Convert.ToString(dr["ModificatorUserName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_SerialInquiries.Add(ObjCVarvwWH_SerialInquiries);
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