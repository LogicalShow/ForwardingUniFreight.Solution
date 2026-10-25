using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Security.Generated
{
	[Serializable]
	public partial class CVarvwUsers
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mID;
		internal String mUsername;
		internal String mName;
		internal String mLocalName;
		internal Int32 mBranchID;
		internal String mUserBranchIDs;
		internal Int32 mDepartmentID;
		internal Int32 mRoleID;
		internal String mAddress;
		internal String mPhone1;
		internal String mPhone2;
		internal String mMobile1;
		internal String mEmail;
		internal String mPassword;
		internal Boolean mIsInactive;
		internal String mNotes;
		internal Boolean mIsSalesman;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal DateTime mExpirationDate;
		internal String mRoleName;
		internal String mBranchCode;
		internal String mBranchName;
		internal String mDepartmentCode;
		internal String mDepartmentName;
		internal DateTime mHeartBeatDate;
		internal Int32 mLastUpdateHeartBeatInSecs;
		internal Int32 mNumberOfLoggedUsers;
		internal Int32 mNumberOfAllowedSessions;
		internal Boolean mIsAccessAllCharges;
		internal Boolean mIsHideOthersRecords;
		internal String mEmail_Password;
		internal String mEmail_DisplayName;
		internal String mEmail_Host;
		internal Int32 mEmail_Port;
		internal Boolean mEmail_IsSSL;
		internal String mEmail_Header;
		internal String mEmail_Footer;
		internal Int32 mCustomerID;
		internal String mCustomerName;
		internal Int32 mSubAccountID;
		internal Int32 mWarehouseID;
		#endregion

		#region "Methods"
		public Int32 ID
		{
			get { return mID; }
			set { mID = value; }
		}
		public String Username
		{
			get { return mUsername; }
			set { mUsername = value; }
		}
		public String Name
		{
			get { return mName; }
			set { mName = value; }
		}
		public String LocalName
		{
			get { return mLocalName; }
			set { mLocalName = value; }
		}
		public Int32 BranchID
		{
			get { return mBranchID; }
			set { mBranchID = value; }
		}
		public String UserBranchIDs
		{
			get { return mUserBranchIDs; }
			set { mUserBranchIDs = value; }
		}
		public Int32 DepartmentID
		{
			get { return mDepartmentID; }
			set { mDepartmentID = value; }
		}
		public Int32 RoleID
		{
			get { return mRoleID; }
			set { mRoleID = value; }
		}
		public String Address
		{
			get { return mAddress; }
			set { mAddress = value; }
		}
		public String Phone1
		{
			get { return mPhone1; }
			set { mPhone1 = value; }
		}
		public String Phone2
		{
			get { return mPhone2; }
			set { mPhone2 = value; }
		}
		public String Mobile1
		{
			get { return mMobile1; }
			set { mMobile1 = value; }
		}
		public String Email
		{
			get { return mEmail; }
			set { mEmail = value; }
		}
		public String Password
		{
			get { return mPassword; }
			set { mPassword = value; }
		}
		public Boolean IsInactive
		{
			get { return mIsInactive; }
			set { mIsInactive = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
		}
		public Boolean IsSalesman
		{
			get { return mIsSalesman; }
			set { mIsSalesman = value; }
		}
		public Int32 CreatorUserID
		{
			get { return mCreatorUserID; }
			set { mCreatorUserID = value; }
		}
		public DateTime CreationDate
		{
			get { return mCreationDate; }
			set { mCreationDate = value; }
		}
		public Int32 ModificatorUserID
		{
			get { return mModificatorUserID; }
			set { mModificatorUserID = value; }
		}
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mModificationDate = value; }
		}
		public DateTime ExpirationDate
		{
			get { return mExpirationDate; }
			set { mExpirationDate = value; }
		}
		public String RoleName
		{
			get { return mRoleName; }
			set { mRoleName = value; }
		}
		public String BranchCode
		{
			get { return mBranchCode; }
			set { mBranchCode = value; }
		}
		public String BranchName
		{
			get { return mBranchName; }
			set { mBranchName = value; }
		}
		public String DepartmentCode
		{
			get { return mDepartmentCode; }
			set { mDepartmentCode = value; }
		}
		public String DepartmentName
		{
			get { return mDepartmentName; }
			set { mDepartmentName = value; }
		}
		public DateTime HeartBeatDate
		{
			get { return mHeartBeatDate; }
			set { mHeartBeatDate = value; }
		}
		public Int32 LastUpdateHeartBeatInSecs
		{
			get { return mLastUpdateHeartBeatInSecs; }
			set { mLastUpdateHeartBeatInSecs = value; }
		}
		public Int32 NumberOfLoggedUsers
		{
			get { return mNumberOfLoggedUsers; }
			set { mNumberOfLoggedUsers = value; }
		}
		public Int32 NumberOfAllowedSessions
		{
			get { return mNumberOfAllowedSessions; }
			set { mNumberOfAllowedSessions = value; }
		}
		public Boolean IsAccessAllCharges
		{
			get { return mIsAccessAllCharges; }
			set { mIsAccessAllCharges = value; }
		}
		public Boolean IsHideOthersRecords
		{
			get { return mIsHideOthersRecords; }
			set { mIsHideOthersRecords = value; }
		}
		public String Email_Password
		{
			get { return mEmail_Password; }
			set { mEmail_Password = value; }
		}
		public String Email_DisplayName
		{
			get { return mEmail_DisplayName; }
			set { mEmail_DisplayName = value; }
		}
		public String Email_Host
		{
			get { return mEmail_Host; }
			set { mEmail_Host = value; }
		}
		public Int32 Email_Port
		{
			get { return mEmail_Port; }
			set { mEmail_Port = value; }
		}
		public Boolean Email_IsSSL
		{
			get { return mEmail_IsSSL; }
			set { mEmail_IsSSL = value; }
		}
		public String Email_Header
		{
			get { return mEmail_Header; }
			set { mEmail_Header = value; }
		}
		public String Email_Footer
		{
			get { return mEmail_Footer; }
			set { mEmail_Footer = value; }
		}
		public Int32 CustomerID
		{
			get { return mCustomerID; }
			set { mCustomerID = value; }
		}
		public String CustomerName
		{
			get { return mCustomerName; }
			set { mCustomerName = value; }
		}
		public Int32 SubAccountID
		{
			get { return mSubAccountID; }
			set { mSubAccountID = value; }
		}
		public Int32 WarehouseID
		{
			get { return mWarehouseID; }
			set { mWarehouseID = value; }
		}
		#endregion
	}

	public partial class CvwUsers
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
		public List<CVarvwUsers> lstCVarvwUsers = new List<CVarvwUsers>();
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
			lstCVarvwUsers.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwUsers";
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
						CVarvwUsers ObjCVarvwUsers = new CVarvwUsers();
						ObjCVarvwUsers.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwUsers.mUsername = Convert.ToString(dr["Username"].ToString());
						ObjCVarvwUsers.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwUsers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarvwUsers.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
						ObjCVarvwUsers.mUserBranchIDs = Convert.ToString(dr["UserBranchIDs"].ToString());
						ObjCVarvwUsers.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
						ObjCVarvwUsers.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
						ObjCVarvwUsers.mAddress = Convert.ToString(dr["Address"].ToString());
						ObjCVarvwUsers.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
						ObjCVarvwUsers.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
						ObjCVarvwUsers.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
						ObjCVarvwUsers.mEmail = Convert.ToString(dr["Email"].ToString());
						ObjCVarvwUsers.mPassword = Convert.ToString(dr["Password"].ToString());
						ObjCVarvwUsers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
						ObjCVarvwUsers.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwUsers.mIsSalesman = Convert.ToBoolean(dr["IsSalesman"].ToString());
						ObjCVarvwUsers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwUsers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwUsers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwUsers.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwUsers.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwUsers.mRoleName = Convert.ToString(dr["RoleName"].ToString());
						ObjCVarvwUsers.mBranchCode = Convert.ToString(dr["BranchCode"].ToString());
						ObjCVarvwUsers.mBranchName = Convert.ToString(dr["BranchName"].ToString());
						ObjCVarvwUsers.mDepartmentCode = Convert.ToString(dr["DepartmentCode"].ToString());
						ObjCVarvwUsers.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
						ObjCVarvwUsers.mHeartBeatDate = Convert.ToDateTime(dr["HeartBeatDate"].ToString());
						ObjCVarvwUsers.mLastUpdateHeartBeatInSecs = Convert.ToInt32(dr["LastUpdateHeartBeatInSecs"].ToString());
						ObjCVarvwUsers.mNumberOfLoggedUsers = Convert.ToInt32(dr["NumberOfLoggedUsers"].ToString());
						ObjCVarvwUsers.mNumberOfAllowedSessions = Convert.ToInt32(dr["NumberOfAllowedSessions"].ToString());
						ObjCVarvwUsers.mIsAccessAllCharges = Convert.ToBoolean(dr["IsAccessAllCharges"].ToString());
						ObjCVarvwUsers.mIsHideOthersRecords = Convert.ToBoolean(dr["IsHideOthersRecords"].ToString());
						ObjCVarvwUsers.mEmail_Password = Convert.ToString(dr["Email_Password"].ToString());
						ObjCVarvwUsers.mEmail_DisplayName = Convert.ToString(dr["Email_DisplayName"].ToString());
						ObjCVarvwUsers.mEmail_Host = Convert.ToString(dr["Email_Host"].ToString());
						ObjCVarvwUsers.mEmail_Port = Convert.ToInt32(dr["Email_Port"].ToString());
						ObjCVarvwUsers.mEmail_IsSSL = Convert.ToBoolean(dr["Email_IsSSL"].ToString());
						ObjCVarvwUsers.mEmail_Header = Convert.ToString(dr["Email_Header"].ToString());
						ObjCVarvwUsers.mEmail_Footer = Convert.ToString(dr["Email_Footer"].ToString());
						ObjCVarvwUsers.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwUsers.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwUsers.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
						ObjCVarvwUsers.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						lstCVarvwUsers.Add(ObjCVarvwUsers);
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
			lstCVarvwUsers.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwUsers";
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
						CVarvwUsers ObjCVarvwUsers = new CVarvwUsers();
						ObjCVarvwUsers.mID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwUsers.mUsername = Convert.ToString(dr["Username"].ToString());
						ObjCVarvwUsers.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwUsers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarvwUsers.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
						ObjCVarvwUsers.mUserBranchIDs = Convert.ToString(dr["UserBranchIDs"].ToString());
						ObjCVarvwUsers.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
						ObjCVarvwUsers.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
						ObjCVarvwUsers.mAddress = Convert.ToString(dr["Address"].ToString());
						ObjCVarvwUsers.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
						ObjCVarvwUsers.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
						ObjCVarvwUsers.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
						ObjCVarvwUsers.mEmail = Convert.ToString(dr["Email"].ToString());
						ObjCVarvwUsers.mPassword = Convert.ToString(dr["Password"].ToString());
						ObjCVarvwUsers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
						ObjCVarvwUsers.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwUsers.mIsSalesman = Convert.ToBoolean(dr["IsSalesman"].ToString());
						ObjCVarvwUsers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarvwUsers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarvwUsers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarvwUsers.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarvwUsers.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarvwUsers.mRoleName = Convert.ToString(dr["RoleName"].ToString());
						ObjCVarvwUsers.mBranchCode = Convert.ToString(dr["BranchCode"].ToString());
						ObjCVarvwUsers.mBranchName = Convert.ToString(dr["BranchName"].ToString());
						ObjCVarvwUsers.mDepartmentCode = Convert.ToString(dr["DepartmentCode"].ToString());
						ObjCVarvwUsers.mDepartmentName = Convert.ToString(dr["DepartmentName"].ToString());
						ObjCVarvwUsers.mHeartBeatDate = Convert.ToDateTime(dr["HeartBeatDate"].ToString());
						ObjCVarvwUsers.mLastUpdateHeartBeatInSecs = Convert.ToInt32(dr["LastUpdateHeartBeatInSecs"].ToString());
						ObjCVarvwUsers.mNumberOfLoggedUsers = Convert.ToInt32(dr["NumberOfLoggedUsers"].ToString());
						ObjCVarvwUsers.mNumberOfAllowedSessions = Convert.ToInt32(dr["NumberOfAllowedSessions"].ToString());
						ObjCVarvwUsers.mIsAccessAllCharges = Convert.ToBoolean(dr["IsAccessAllCharges"].ToString());
						ObjCVarvwUsers.mIsHideOthersRecords = Convert.ToBoolean(dr["IsHideOthersRecords"].ToString());
						ObjCVarvwUsers.mEmail_Password = Convert.ToString(dr["Email_Password"].ToString());
						ObjCVarvwUsers.mEmail_DisplayName = Convert.ToString(dr["Email_DisplayName"].ToString());
						ObjCVarvwUsers.mEmail_Host = Convert.ToString(dr["Email_Host"].ToString());
						ObjCVarvwUsers.mEmail_Port = Convert.ToInt32(dr["Email_Port"].ToString());
						ObjCVarvwUsers.mEmail_IsSSL = Convert.ToBoolean(dr["Email_IsSSL"].ToString());
						ObjCVarvwUsers.mEmail_Header = Convert.ToString(dr["Email_Header"].ToString());
						ObjCVarvwUsers.mEmail_Footer = Convert.ToString(dr["Email_Footer"].ToString());
						ObjCVarvwUsers.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						ObjCVarvwUsers.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
						ObjCVarvwUsers.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
						ObjCVarvwUsers.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwUsers.Add(ObjCVarvwUsers);
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
