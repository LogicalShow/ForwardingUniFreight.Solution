using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKContacts
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
    public partial class CVarContacts : CPKContacts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mPartnerTypeID;
        internal Int64 mPartnerID;
        internal String mName;
        internal String mLocalName;
        internal String mEmail;
        internal String mPhone1;
        internal String mPhone2;
        internal String mMobile1;
        internal String mMobile2;
        internal String mFax;
        internal Boolean mIsInactive;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal Boolean mIsDeleted;
        #endregion

        #region "Methods"
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mIsChanges = true; mPartnerTypeID = value; }
        }
        public Int64 PartnerID
        {
            get { return mPartnerID; }
            set { mIsChanges = true; mPartnerID = value; }
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
        public String Email
        {
            get { return mEmail; }
            set { mIsChanges = true; mEmail = value; }
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
        public String Mobile2
        {
            get { return mMobile2; }
            set { mIsChanges = true; mMobile2 = value; }
        }
        public String Fax
        {
            get { return mFax; }
            set { mIsChanges = true; mFax = value; }
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
        public Int32 LockingUserID
        {
            get { return mLockingUserID; }
            set { mIsChanges = true; mLockingUserID = value; }
        }
        public DateTime TimeLocked
        {
            get { return mTimeLocked; }
            set { mIsChanges = true; mTimeLocked = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
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

    public partial class CContacts
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
        public List<CVarContacts> lstCVarContacts = new List<CVarContacts>();
        public List<CPKContacts> lstDeletedCPKContacts = new List<CPKContacts>();
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
            lstCVarContacts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListContacts";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemContacts";
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
                        CVarContacts ObjCVarContacts = new CVarContacts();
                        ObjCVarContacts.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarContacts.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarContacts.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarContacts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarContacts.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarContacts.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarContacts.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarContacts.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarContacts.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarContacts.mMobile2 = Convert.ToString(dr["Mobile2"].ToString());
                        ObjCVarContacts.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarContacts.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarContacts.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarContacts.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarContacts.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarContacts.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarContacts.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarContacts.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarContacts.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarContacts.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        lstCVarContacts.Add(ObjCVarContacts);
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
            lstCVarContacts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingContacts";
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
                        CVarContacts ObjCVarContacts = new CVarContacts();
                        ObjCVarContacts.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarContacts.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarContacts.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarContacts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarContacts.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarContacts.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarContacts.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarContacts.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarContacts.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarContacts.mMobile2 = Convert.ToString(dr["Mobile2"].ToString());
                        ObjCVarContacts.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarContacts.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarContacts.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarContacts.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarContacts.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarContacts.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarContacts.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarContacts.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarContacts.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarContacts.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarContacts.Add(ObjCVarContacts);
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
                    Com.CommandText = "[dbo].DeleteListContacts";
                else
                    Com.CommandText = "[dbo].UpdateListContacts";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
        public Exception DeleteItem(List<CPKContacts> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemContacts";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKContacts ObjCPKContacts in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKContacts.ID);
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
        public Exception SaveMethod(List<CVarContacts> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PartnerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PartnerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Phone1", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Phone2", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Mobile1", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Mobile2", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Fax", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarContacts ObjCVarContacts in SaveList)
                {
                    if (ObjCVarContacts.mIsChanges == true)
                    {
                        if (ObjCVarContacts.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemContacts";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarContacts.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemContacts";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarContacts.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarContacts.ID;
                        }
                        Com.Parameters["@PartnerTypeID"].Value = ObjCVarContacts.PartnerTypeID;
                        Com.Parameters["@PartnerID"].Value = ObjCVarContacts.PartnerID;
                        Com.Parameters["@Name"].Value = ObjCVarContacts.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarContacts.LocalName;
                        Com.Parameters["@Email"].Value = ObjCVarContacts.Email;
                        Com.Parameters["@Phone1"].Value = ObjCVarContacts.Phone1;
                        Com.Parameters["@Phone2"].Value = ObjCVarContacts.Phone2;
                        Com.Parameters["@Mobile1"].Value = ObjCVarContacts.Mobile1;
                        Com.Parameters["@Mobile2"].Value = ObjCVarContacts.Mobile2;
                        Com.Parameters["@Fax"].Value = ObjCVarContacts.Fax;
                        Com.Parameters["@IsInactive"].Value = ObjCVarContacts.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarContacts.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarContacts.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarContacts.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarContacts.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarContacts.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarContacts.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarContacts.TimeLocked;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarContacts.IsDeleted;
                        EndTrans(Com, Con);
                        if (ObjCVarContacts.ID == 0)
                        {
                            ObjCVarContacts.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarContacts.mIsChanges = false;
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
