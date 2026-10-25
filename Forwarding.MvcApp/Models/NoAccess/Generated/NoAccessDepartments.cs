using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.NoAccess.Generated
{
    [Serializable]
    public class CPKNoAccessDepartments
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
    public partial class CVarNoAccessDepartments : CPKNoAccessDepartments
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mEmail;
        internal String mEmail_Password;
        internal String mEmail_DisplayName;
        internal String mEmail_Host;
        internal Int32 mEmail_Port;
        internal Boolean mEmail_IsSSL;
        internal String mEmail_Header;
        internal String mEmail_Footer;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
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
        public String Email
        {
            get { return mEmail; }
            set { mIsChanges = true; mEmail = value; }
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

    public partial class CNoAccessDepartments
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
        public List<CVarNoAccessDepartments> lstCVarNoAccessDepartments = new List<CVarNoAccessDepartments>();
        public List<CPKNoAccessDepartments> lstDeletedCPKNoAccessDepartments = new List<CPKNoAccessDepartments>();
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
            lstCVarNoAccessDepartments.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListNoAccessDepartments";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemNoAccessDepartments";
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
                        CVarNoAccessDepartments ObjCVarNoAccessDepartments = new CVarNoAccessDepartments();
                        ObjCVarNoAccessDepartments.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessDepartments.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessDepartments.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessDepartments.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessDepartments.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarNoAccessDepartments.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarNoAccessDepartments.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarNoAccessDepartments.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarNoAccessDepartments.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarNoAccessDepartments.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Password = Convert.ToString(dr["Email_Password"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_DisplayName = Convert.ToString(dr["Email_DisplayName"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Host = Convert.ToString(dr["Email_Host"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Port = Convert.ToInt32(dr["Email_Port"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_IsSSL = Convert.ToBoolean(dr["Email_IsSSL"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Header = Convert.ToString(dr["Email_Header"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Footer = Convert.ToString(dr["Email_Footer"].ToString());
                        lstCVarNoAccessDepartments.Add(ObjCVarNoAccessDepartments);
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
            lstCVarNoAccessDepartments.Clear();

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
                Com.CommandText = "[dbo].GetListPagingNoAccessDepartments";
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
                        CVarNoAccessDepartments ObjCVarNoAccessDepartments = new CVarNoAccessDepartments();
                        ObjCVarNoAccessDepartments.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessDepartments.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessDepartments.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessDepartments.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessDepartments.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarNoAccessDepartments.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarNoAccessDepartments.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarNoAccessDepartments.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarNoAccessDepartments.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarNoAccessDepartments.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Password = Convert.ToString(dr["Email_Password"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_DisplayName = Convert.ToString(dr["Email_DisplayName"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Host = Convert.ToString(dr["Email_Host"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Port = Convert.ToInt32(dr["Email_Port"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_IsSSL = Convert.ToBoolean(dr["Email_IsSSL"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Header = Convert.ToString(dr["Email_Header"].ToString());
                        ObjCVarNoAccessDepartments.mEmail_Footer = Convert.ToString(dr["Email_Footer"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarNoAccessDepartments.Add(ObjCVarNoAccessDepartments);
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
                    Com.CommandText = "[dbo].DeleteListNoAccessDepartments";
                else
                    Com.CommandText = "[dbo].UpdateListNoAccessDepartments";
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
        public Exception DeleteItem(List<CPKNoAccessDepartments> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemNoAccessDepartments";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKNoAccessDepartments ObjCPKNoAccessDepartments in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKNoAccessDepartments.ID);
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
        public Exception SaveMethod(List<CVarNoAccessDepartments> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email_Password", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email_DisplayName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email_Host", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email_Port", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Email_IsSSL", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Email_Header", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email_Footer", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarNoAccessDepartments ObjCVarNoAccessDepartments in SaveList)
                {
                    if (ObjCVarNoAccessDepartments.mIsChanges == true)
                    {
                        if (ObjCVarNoAccessDepartments.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemNoAccessDepartments";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarNoAccessDepartments.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemNoAccessDepartments";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarNoAccessDepartments.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarNoAccessDepartments.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarNoAccessDepartments.Code;
                        Com.Parameters["@Name"].Value = ObjCVarNoAccessDepartments.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarNoAccessDepartments.LocalName;
                        Com.Parameters["@Notes"].Value = ObjCVarNoAccessDepartments.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarNoAccessDepartments.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarNoAccessDepartments.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarNoAccessDepartments.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarNoAccessDepartments.ModificationDate;
                        Com.Parameters["@Email"].Value = ObjCVarNoAccessDepartments.Email;
                        Com.Parameters["@Email_Password"].Value = ObjCVarNoAccessDepartments.Email_Password;
                        Com.Parameters["@Email_DisplayName"].Value = ObjCVarNoAccessDepartments.Email_DisplayName;
                        Com.Parameters["@Email_Host"].Value = ObjCVarNoAccessDepartments.Email_Host;
                        Com.Parameters["@Email_Port"].Value = ObjCVarNoAccessDepartments.Email_Port;
                        Com.Parameters["@Email_IsSSL"].Value = ObjCVarNoAccessDepartments.Email_IsSSL;
                        Com.Parameters["@Email_Header"].Value = ObjCVarNoAccessDepartments.Email_Header;
                        Com.Parameters["@Email_Footer"].Value = ObjCVarNoAccessDepartments.Email_Footer;
                        EndTrans(Com, Con);
                        if (ObjCVarNoAccessDepartments.ID == 0)
                        {
                            ObjCVarNoAccessDepartments.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarNoAccessDepartments.mIsChanges = false;
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
