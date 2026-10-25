using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Security.Generated
{
	
	[Serializable]
	public class CPKUsers
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
	public partial class CVarUsers : CPKUsers
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal String mUsername;
		internal String mName;
		internal String mLocalName;
		internal Int32 mRoleID;
		internal Int32 mBranchID;
		internal Int32 mDepartmentID;
		internal String mAddress;
		internal String mPhone1;
		internal String mPhone2;
		internal String mMobile1;
		internal String mEmail;
		internal String mPassword;
		internal DateTime mExpirationDate;
		internal Boolean mIsInactive;
		internal String mNotes;
		internal Boolean mIsSalesman;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal DateTime mHeartBeatDate;
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
		#endregion

		#region "Methods"
		public String Username
		{
			get { return mUsername; }
			set { mIsChanges = true; mUsername = value; }
		}
		public String Name
		{
			get { return mName; }
			set { mIsChanges = true; mName = value; }
		}
		public String LocalName
		{
			get { return mLocalName; }
			set { mIsChanges = true; mLocalName = value; }
		}
		public Int32 RoleID
		{
			get { return mRoleID; }
			set { mIsChanges = true; mRoleID = value; }
		}
		public Int32 BranchID
		{
			get { return mBranchID; }
			set { mIsChanges = true; mBranchID = value; }
		}
		public Int32 DepartmentID
		{
			get { return mDepartmentID; }
			set { mIsChanges = true; mDepartmentID = value; }
		}
		public String Address
		{
			get { return mAddress; }
			set { mIsChanges = true; mAddress = value; }
		}
		public String Phone1
		{
			get { return mPhone1; }
			set { mIsChanges = true; mPhone1 = value; }
		}
		public String Phone2
		{
			get { return mPhone2; }
			set { mIsChanges = true; mPhone2 = value; }
		}
		public String Mobile1
		{
			get { return mMobile1; }
			set { mIsChanges = true; mMobile1 = value; }
		}
		public String Email
		{
			get { return mEmail; }
			set { mIsChanges = true; mEmail = value; }
		}
		public String Password
		{
			get { return mPassword; }
			set { mIsChanges = true; mPassword = value; }
		}
		public DateTime ExpirationDate
		{
			get { return mExpirationDate; }
			set { mIsChanges = true; mExpirationDate = value; }
		}
		public Boolean IsInactive
		{
			get { return mIsInactive; }
			set { mIsChanges = true; mIsInactive = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mIsChanges = true; mNotes = value; }
		}
		public Boolean IsSalesman
		{
			get { return mIsSalesman; }
			set { mIsChanges = true; mIsSalesman = value; }
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
		public Int32 ModificatorUserID
		{
			get { return mModificatorUserID; }
			set { mIsChanges = true; mModificatorUserID = value; }
		}
		public DateTime ModificationDate
		{
			get { return mModificationDate; }
			set { mIsChanges = true; mModificationDate = value; }
		}
		public DateTime HeartBeatDate
		{
			get { return mHeartBeatDate; }
			set { mIsChanges = true; mHeartBeatDate = value; }
		}
		public Boolean IsAccessAllCharges
		{
			get { return mIsAccessAllCharges; }
			set { mIsChanges = true; mIsAccessAllCharges = value; }
		}
		public Boolean IsHideOthersRecords
		{
			get { return mIsHideOthersRecords; }
			set { mIsChanges = true; mIsHideOthersRecords = value; }
		}
		public String Email_Password
		{
			get { return mEmail_Password; }
			set { mIsChanges = true; mEmail_Password = value; }
		}
		public String Email_DisplayName
		{
			get { return mEmail_DisplayName; }
			set { mIsChanges = true; mEmail_DisplayName = value; }
		}
		public String Email_Host
		{
			get { return mEmail_Host; }
			set { mIsChanges = true; mEmail_Host = value; }
		}
		public Int32 Email_Port
		{
			get { return mEmail_Port; }
			set { mIsChanges = true; mEmail_Port = value; }
		}
		public Boolean Email_IsSSL
		{
			get { return mEmail_IsSSL; }
			set { mIsChanges = true; mEmail_IsSSL = value; }
		}
		public String Email_Header
		{
			get { return mEmail_Header; }
			set { mIsChanges = true; mEmail_Header = value; }
		}
		public String Email_Footer
		{
			get { return mEmail_Footer; }
			set { mIsChanges = true; mEmail_Footer = value; }
		}
		public Int32 CustomerID
		{
			get { return mCustomerID; }
			set { mIsChanges = true; mCustomerID = value; }
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
	public partial class CUsers
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
		public List<CVarUsers> lstCVarUsers = new List<CVarUsers>();
		public List<CPKUsers> lstDeletedCPKUsers = new List<CPKUsers>();
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
			lstCVarUsers.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListUsers";
					Com.Parameters[0].Value = Param;
				}
				else
				{
					Com.CommandText = "[dbo].GetItemUsers";
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
						CVarUsers ObjCVarUsers = new CVarUsers();
						ObjCVarUsers.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarUsers.mUsername = Convert.ToString(dr["Username"].ToString());
						ObjCVarUsers.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarUsers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarUsers.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
						ObjCVarUsers.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
						ObjCVarUsers.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
						ObjCVarUsers.mAddress = Convert.ToString(dr["Address"].ToString());
						ObjCVarUsers.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
						ObjCVarUsers.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
						ObjCVarUsers.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
						ObjCVarUsers.mEmail = Convert.ToString(dr["Email"].ToString());
						ObjCVarUsers.mPassword = Convert.ToString(dr["Password"].ToString());
						ObjCVarUsers.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarUsers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
						ObjCVarUsers.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarUsers.mIsSalesman = Convert.ToBoolean(dr["IsSalesman"].ToString());
						ObjCVarUsers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarUsers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarUsers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarUsers.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarUsers.mHeartBeatDate = Convert.ToDateTime(dr["HeartBeatDate"].ToString());
						ObjCVarUsers.mIsAccessAllCharges = Convert.ToBoolean(dr["IsAccessAllCharges"].ToString());
						ObjCVarUsers.mIsHideOthersRecords = Convert.ToBoolean(dr["IsHideOthersRecords"].ToString());
						ObjCVarUsers.mEmail_Password = Convert.ToString(dr["Email_Password"].ToString());
						ObjCVarUsers.mEmail_DisplayName = Convert.ToString(dr["Email_DisplayName"].ToString());
						ObjCVarUsers.mEmail_Host = Convert.ToString(dr["Email_Host"].ToString());
						ObjCVarUsers.mEmail_Port = Convert.ToInt32(dr["Email_Port"].ToString());
						ObjCVarUsers.mEmail_IsSSL = Convert.ToBoolean(dr["Email_IsSSL"].ToString());
						ObjCVarUsers.mEmail_Header = Convert.ToString(dr["Email_Header"].ToString());
						ObjCVarUsers.mEmail_Footer = Convert.ToString(dr["Email_Footer"].ToString());
						ObjCVarUsers.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						lstCVarUsers.Add(ObjCVarUsers);
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
			lstCVarUsers.Clear();

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
				Com.CommandText = "[dbo].GetListPagingUsers";
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
						CVarUsers ObjCVarUsers = new CVarUsers();
						ObjCVarUsers.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarUsers.mUsername = Convert.ToString(dr["Username"].ToString());
						ObjCVarUsers.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarUsers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarUsers.mRoleID = Convert.ToInt32(dr["RoleID"].ToString());
						ObjCVarUsers.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
						ObjCVarUsers.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
						ObjCVarUsers.mAddress = Convert.ToString(dr["Address"].ToString());
						ObjCVarUsers.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
						ObjCVarUsers.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
						ObjCVarUsers.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
						ObjCVarUsers.mEmail = Convert.ToString(dr["Email"].ToString());
						ObjCVarUsers.mPassword = Convert.ToString(dr["Password"].ToString());
						ObjCVarUsers.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
						ObjCVarUsers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
						ObjCVarUsers.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarUsers.mIsSalesman = Convert.ToBoolean(dr["IsSalesman"].ToString());
						ObjCVarUsers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
						ObjCVarUsers.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
						ObjCVarUsers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
						ObjCVarUsers.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
						ObjCVarUsers.mHeartBeatDate = Convert.ToDateTime(dr["HeartBeatDate"].ToString());
						ObjCVarUsers.mIsAccessAllCharges = Convert.ToBoolean(dr["IsAccessAllCharges"].ToString());
						ObjCVarUsers.mIsHideOthersRecords = Convert.ToBoolean(dr["IsHideOthersRecords"].ToString());
						ObjCVarUsers.mEmail_Password = Convert.ToString(dr["Email_Password"].ToString());
						ObjCVarUsers.mEmail_DisplayName = Convert.ToString(dr["Email_DisplayName"].ToString());
						ObjCVarUsers.mEmail_Host = Convert.ToString(dr["Email_Host"].ToString());
						ObjCVarUsers.mEmail_Port = Convert.ToInt32(dr["Email_Port"].ToString());
						ObjCVarUsers.mEmail_IsSSL = Convert.ToBoolean(dr["Email_IsSSL"].ToString());
						ObjCVarUsers.mEmail_Header = Convert.ToString(dr["Email_Header"].ToString());
						ObjCVarUsers.mEmail_Footer = Convert.ToString(dr["Email_Footer"].ToString());
						ObjCVarUsers.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarUsers.Add(ObjCVarUsers);
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
					Com.CommandText = "[dbo].DeleteListUsers";
				else
					Com.CommandText = "[dbo].UpdateListUsers";
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
		private Exception SetListTAX(string WhereClause, Boolean IsDelete)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				if (IsDelete == true)
					Com.CommandText = "[dbo].DeleteListUsersTAX";
				else
					Com.CommandText = "[dbo].UpdateListUsersTAX";
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
		public Exception DeleteItem(List<CPKUsers> DeleteList)
		{

			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.CommandText = "[dbo].DeleteItemUsers";
				Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
				foreach (CPKUsers ObjCPKUsers in DeleteList)
				{
					BeginTrans(Com, Con);
					Com.Parameters[0].Value = Convert.ToInt32(ObjCPKUsers.ID);
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
		public Exception SaveMethod(List<CVarUsers> SaveList)
		{
			Exception Exp = null;
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			try
			{
				Con.Open();
				Com = new SqlCommand();
				Com.Parameters.Add(new SqlParameter("@Username", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@RoleID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Phone1", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Phone2", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Mobile1", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Password", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@ExpirationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@IsSalesman", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@HeartBeatDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@IsAccessAllCharges", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@IsHideOthersRecords", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@Email_Password", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Email_DisplayName", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Email_Host", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Email_Port", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Email_IsSSL", SqlDbType.Bit));
				Com.Parameters.Add(new SqlParameter("@Email_Header", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@Email_Footer", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
				foreach (CVarUsers ObjCVarUsers in SaveList)
				{
					if (ObjCVarUsers.mIsChanges == true)
					{
						if (ObjCVarUsers.ID == 0)
						{
							Com.CommandText = "[dbo].InsertItemUsers";
							paraID.Direction = ParameterDirection.Output;
						}
						else if (ObjCVarUsers.ID != 0)
						{
							Com.CommandText = "[dbo].UpdateItemUsers";
							paraID.Direction = ParameterDirection.Input;
						}
						BeginTrans(Com, Con);
						if (ObjCVarUsers.ID != 0)
						{
							Com.Parameters["@ID"].Value = ObjCVarUsers.ID;
						}
						Com.Parameters["@Username"].Value = ObjCVarUsers.Username;
						Com.Parameters["@Name"].Value = ObjCVarUsers.Name;
						Com.Parameters["@LocalName"].Value = ObjCVarUsers.LocalName;
						Com.Parameters["@RoleID"].Value = ObjCVarUsers.RoleID;
						Com.Parameters["@BranchID"].Value = ObjCVarUsers.BranchID;
						Com.Parameters["@DepartmentID"].Value = ObjCVarUsers.DepartmentID;
						Com.Parameters["@Address"].Value = ObjCVarUsers.Address;
						Com.Parameters["@Phone1"].Value = ObjCVarUsers.Phone1;
						Com.Parameters["@Phone2"].Value = ObjCVarUsers.Phone2;
						Com.Parameters["@Mobile1"].Value = ObjCVarUsers.Mobile1;
						Com.Parameters["@Email"].Value = ObjCVarUsers.Email;
						Com.Parameters["@Password"].Value = ObjCVarUsers.Password;
						Com.Parameters["@ExpirationDate"].Value = ObjCVarUsers.ExpirationDate;
						Com.Parameters["@IsInactive"].Value = ObjCVarUsers.IsInactive;
						Com.Parameters["@Notes"].Value = ObjCVarUsers.Notes;
						Com.Parameters["@IsSalesman"].Value = ObjCVarUsers.IsSalesman;
						Com.Parameters["@CreatorUserID"].Value = ObjCVarUsers.CreatorUserID;
						Com.Parameters["@CreationDate"].Value = ObjCVarUsers.CreationDate;
						Com.Parameters["@ModificatorUserID"].Value = ObjCVarUsers.ModificatorUserID;
						Com.Parameters["@ModificationDate"].Value = ObjCVarUsers.ModificationDate;
						Com.Parameters["@HeartBeatDate"].Value = ObjCVarUsers.HeartBeatDate;
						Com.Parameters["@IsAccessAllCharges"].Value = ObjCVarUsers.IsAccessAllCharges;
						Com.Parameters["@IsHideOthersRecords"].Value = ObjCVarUsers.IsHideOthersRecords;
						Com.Parameters["@Email_Password"].Value = ObjCVarUsers.Email_Password;
						Com.Parameters["@Email_DisplayName"].Value = ObjCVarUsers.Email_DisplayName;
						Com.Parameters["@Email_Host"].Value = ObjCVarUsers.Email_Host;
						Com.Parameters["@Email_Port"].Value = ObjCVarUsers.Email_Port;
						Com.Parameters["@Email_IsSSL"].Value = ObjCVarUsers.Email_IsSSL;
						Com.Parameters["@Email_Header"].Value = ObjCVarUsers.Email_Header;
						Com.Parameters["@Email_Footer"].Value = ObjCVarUsers.Email_Footer;
						Com.Parameters["@CustomerID"].Value = ObjCVarUsers.CustomerID;
						EndTrans(Com, Con);
						if (ObjCVarUsers.ID == 0)
						{
							ObjCVarUsers.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
						}
						ObjCVarUsers.mIsChanges = false;
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
		public Exception UpdateListTAX(string UpdateClause)
		{

			return SetListTAX(UpdateClause, false);
		}

		#endregion
	}


	



}
