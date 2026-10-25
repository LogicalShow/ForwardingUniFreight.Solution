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
	public partial class CVarvwWH_PutawayDetails
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mID;
		internal Int32 mPutawayID;
		internal String mPutawayCode;
		internal Int32 mReceiveID;
		internal String mReceiveCode;
		internal String mPalletID;
		internal Int32 mReceiveLocationID;
		internal String mReceiveLocationCode;
		internal Int32 mPutawayLocationID;
		internal String mPutawayLocationCode;
		internal DateTime mCreationDate;
		internal Int32 mCreatorUserID;
		internal String mCreatorUserName;
		internal String mOwnerName;
		internal String mWarehouseName;
		#endregion

		#region "Methods"
		public Int32 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public Int32 PutawayID
		{
			get { return mPutawayID; }
			set { mPutawayID = value; }
		}
		public String PutawayCode
		{
			get { return mPutawayCode; }
			set { mPutawayCode = value; }
		}
		public Int32 ReceiveID
		{
			get { return mReceiveID; }
			set { mReceiveID = value; }
		}
		public String ReceiveCode
		{
			get { return mReceiveCode; }
			set { mReceiveCode = value; }
		}
		public String PalletID
		{
			get { return mPalletID; }
			set { mPalletID = value; }
		}
		public Int32 ReceiveLocationID
		{
			get { return mReceiveLocationID; }
			set { mReceiveLocationID = value; }
		}
		public String ReceiveLocationCode
		{
			get { return mReceiveLocationCode; }
			set { mReceiveLocationCode = value; }
		}
		public Int32 PutawayLocationID
		{
			get { return mPutawayLocationID; }
			set { mPutawayLocationID = value; }
		}
		public String PutawayLocationCode
		{
			get { return mPutawayLocationCode; }
			set { mPutawayLocationCode = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mCreationDate = value; }
		}
		public Int32 CreatorUserID
		{
			get { return mCreatorUserID; }
			set { mCreatorUserID = value; }
		}
		public String CreatorUserName
		{
			get { return mCreatorUserName; }
			set { mCreatorUserName = value; }
		}
		public String OwnerName
		{
			get { return mOwnerName; }
			set { mOwnerName = value; }
		}
		public String WarehouseName
		{
			get { return mWarehouseName; }
			set { mWarehouseName = value; }
		}
		#endregion
	}

	public partial class CvwWH_PutawayDetails
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
		public List<CVarvwWH_PutawayDetails> lstCVarvwWH_PutawayDetails = new List<CVarvwWH_PutawayDetails>();
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
			lstCVarvwWH_PutawayDetails.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_PutawayDetails";
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
						CVarvwWH_PutawayDetails ObjCVarvwWH_PutawayDetails = new CVarvwWH_PutawayDetails();
						ObjCVarvwWH_PutawayDetails.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_PutawayDetails.mPutawayID = Convert.ToInt32(dr["PutawayID"].ToString());
						ObjCVarvwWH_PutawayDetails.mPutawayCode = Convert.ToString(dr["PutawayCode"].ToString());
						ObjCVarvwWH_PutawayDetails.mReceiveID = Convert.ToInt32(dr["ReceiveID"].ToString());
						ObjCVarvwWH_PutawayDetails.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_PutawayDetails.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_PutawayDetails.mReceiveLocationID = Convert.ToInt32(dr["ReceiveLocationID"].ToString());
						ObjCVarvwWH_PutawayDetails.mReceiveLocationCode = Convert.ToString(dr["ReceiveLocationCode"].ToString());
						ObjCVarvwWH_PutawayDetails.mPutawayLocationID = Convert.ToInt32(dr["PutawayLocationID"].ToString());
						ObjCVarvwWH_PutawayDetails.mPutawayLocationCode = Convert.ToString(dr["PutawayLocationCode"].ToString());
						ObjCVarvwWH_PutawayDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_PutawayDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwWH_PutawayDetails.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						ObjCVarvwWH_PutawayDetails.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_PutawayDetails.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						lstCVarvwWH_PutawayDetails.Add(ObjCVarvwWH_PutawayDetails);
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
			lstCVarvwWH_PutawayDetails.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_PutawayDetails";
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
						CVarvwWH_PutawayDetails ObjCVarvwWH_PutawayDetails = new CVarvwWH_PutawayDetails();
						ObjCVarvwWH_PutawayDetails.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_PutawayDetails.mPutawayID = Convert.ToInt32(dr["PutawayID"].ToString());
						ObjCVarvwWH_PutawayDetails.mPutawayCode = Convert.ToString(dr["PutawayCode"].ToString());
						ObjCVarvwWH_PutawayDetails.mReceiveID = Convert.ToInt32(dr["ReceiveID"].ToString());
						ObjCVarvwWH_PutawayDetails.mReceiveCode = Convert.ToString(dr["ReceiveCode"].ToString());
						ObjCVarvwWH_PutawayDetails.mPalletID = Convert.ToString(dr["PalletID"].ToString());
						ObjCVarvwWH_PutawayDetails.mReceiveLocationID = Convert.ToInt32(dr["ReceiveLocationID"].ToString());
						ObjCVarvwWH_PutawayDetails.mReceiveLocationCode = Convert.ToString(dr["ReceiveLocationCode"].ToString());
						ObjCVarvwWH_PutawayDetails.mPutawayLocationID = Convert.ToInt32(dr["PutawayLocationID"].ToString());
						ObjCVarvwWH_PutawayDetails.mPutawayLocationCode = Convert.ToString(dr["PutawayLocationCode"].ToString());
						ObjCVarvwWH_PutawayDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_PutawayDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwWH_PutawayDetails.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
						ObjCVarvwWH_PutawayDetails.mOwnerName = Convert.ToString(dr["OwnerName"].ToString());
						ObjCVarvwWH_PutawayDetails.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_PutawayDetails.Add(ObjCVarvwWH_PutawayDetails);
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