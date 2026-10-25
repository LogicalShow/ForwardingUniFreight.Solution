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
	public class CPKvwWH_LocationMove
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
	public partial class CVarvwWH_LocationMove : CPKvwWH_LocationMove
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mCodeSerial;
		internal String mCode;
		internal DateTime mCreationDate;
		internal String mReason;
		internal Boolean mByPallet;
		internal Boolean mByItem;
		internal String mMovedBy;
		internal Int32 mFromLocationID;
		internal String mFromLocationCode;
		internal Int32 mToLocationID;
		internal String mToLocationCode;
		internal Int32 mToPalletStatusID;
		internal String mToPalletStatusName;
		#endregion

		#region "Methods"
		public Int32 CodeSerial
		{
			get { return mCodeSerial; }
			set { mCodeSerial = value; }
		}
		public String Code
		{
			get { return mCode; }
			set { mCode = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mCreationDate = value; }
		}
		public String Reason
		{
			get { return mReason; }
			set { mReason = value; }
		}
		public Boolean ByPallet
		{
			get { return mByPallet; }
			set { mByPallet = value; }
		}
		public Boolean ByItem
		{
			get { return mByItem; }
			set { mByItem = value; }
		}
		public String MovedBy
		{
			get { return mMovedBy; }
			set { mMovedBy = value; }
		}
		public Int32 FromLocationID
		{
			get { return mFromLocationID; }
			set { mFromLocationID = value; }
		}
		public String FromLocationCode
		{
			get { return mFromLocationCode; }
			set { mFromLocationCode = value; }
		}
		public Int32 ToLocationID
		{
			get { return mToLocationID; }
			set { mToLocationID = value; }
		}
		public String ToLocationCode
		{
			get { return mToLocationCode; }
			set { mToLocationCode = value; }
		}
		public Int32 ToPalletStatusID
		{
			get { return mToPalletStatusID; }
			set { mToPalletStatusID = value; }
		}
		public String ToPalletStatusName
		{
			get { return mToPalletStatusName; }
			set { mToPalletStatusName = value; }
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

	public partial class CvwWH_LocationMove
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
		public List<CVarvwWH_LocationMove> lstCVarvwWH_LocationMove = new List<CVarvwWH_LocationMove>();
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
			lstCVarvwWH_LocationMove.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwWH_LocationMove";
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
						CVarvwWH_LocationMove ObjCVarvwWH_LocationMove = new CVarvwWH_LocationMove();
						ObjCVarvwWH_LocationMove.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_LocationMove.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwWH_LocationMove.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_LocationMove.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_LocationMove.mReason = Convert.ToString(dr["Reason"].ToString());
						ObjCVarvwWH_LocationMove.mByPallet = Convert.ToBoolean(dr["ByPallet"].ToString());
						ObjCVarvwWH_LocationMove.mByItem = Convert.ToBoolean(dr["ByItem"].ToString());
						ObjCVarvwWH_LocationMove.mMovedBy = Convert.ToString(dr["MovedBy"].ToString());
						ObjCVarvwWH_LocationMove.mFromLocationID = Convert.ToInt32(dr["FromLocationID"].ToString());
						ObjCVarvwWH_LocationMove.mFromLocationCode = Convert.ToString(dr["FromLocationCode"].ToString());
						ObjCVarvwWH_LocationMove.mToLocationID = Convert.ToInt32(dr["ToLocationID"].ToString());
						ObjCVarvwWH_LocationMove.mToLocationCode = Convert.ToString(dr["ToLocationCode"].ToString());
						ObjCVarvwWH_LocationMove.mToPalletStatusID = Convert.ToInt32(dr["ToPalletStatusID"].ToString());
						ObjCVarvwWH_LocationMove.mToPalletStatusName = Convert.ToString(dr["ToPalletStatusName"].ToString());
						lstCVarvwWH_LocationMove.Add(ObjCVarvwWH_LocationMove);
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
			lstCVarvwWH_LocationMove.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwWH_LocationMove";
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
						CVarvwWH_LocationMove ObjCVarvwWH_LocationMove = new CVarvwWH_LocationMove();
						ObjCVarvwWH_LocationMove.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwWH_LocationMove.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
						ObjCVarvwWH_LocationMove.mCode = Convert.ToString(dr["Code"].ToString());
						ObjCVarvwWH_LocationMove.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwWH_LocationMove.mReason = Convert.ToString(dr["Reason"].ToString());
						ObjCVarvwWH_LocationMove.mByPallet = Convert.ToBoolean(dr["ByPallet"].ToString());
						ObjCVarvwWH_LocationMove.mByItem = Convert.ToBoolean(dr["ByItem"].ToString());
						ObjCVarvwWH_LocationMove.mMovedBy = Convert.ToString(dr["MovedBy"].ToString());
						ObjCVarvwWH_LocationMove.mFromLocationID = Convert.ToInt32(dr["FromLocationID"].ToString());
						ObjCVarvwWH_LocationMove.mFromLocationCode = Convert.ToString(dr["FromLocationCode"].ToString());
						ObjCVarvwWH_LocationMove.mToLocationID = Convert.ToInt32(dr["ToLocationID"].ToString());
						ObjCVarvwWH_LocationMove.mToLocationCode = Convert.ToString(dr["ToLocationCode"].ToString());
						ObjCVarvwWH_LocationMove.mToPalletStatusID = Convert.ToInt32(dr["ToPalletStatusID"].ToString());
						ObjCVarvwWH_LocationMove.mToPalletStatusName = Convert.ToString(dr["ToPalletStatusName"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwWH_LocationMove.Add(ObjCVarvwWH_LocationMove);
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