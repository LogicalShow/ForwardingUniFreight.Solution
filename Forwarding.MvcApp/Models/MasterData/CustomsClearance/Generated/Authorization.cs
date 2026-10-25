using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Generated.CustomsClearance
{
    [Serializable]
    public class CPKAuthorizations
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
    public partial class CVarAuthorizations : CPKAuthorizations
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mAuthorizationNumber;
        internal Int32 mCustomerID;
        internal String mregistrationNumber;
        internal DateTime mregistration_EndDate;
        internal Int32 mOwnerNumber;
        internal DateTime mStartDate;
        internal DateTime mEndDate;
        internal String mNotes;
        internal DateTime mRegistryDate;
        internal String mFileName;
        #endregion

        #region "Methods"
        public String AuthorizationNumber
        {
            get { return mAuthorizationNumber; }
            set { mIsChanges = true; mAuthorizationNumber = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public String registrationNumber
        {
            get { return mregistrationNumber; }
            set { mIsChanges = true; mregistrationNumber = value; }
        }
        public DateTime registration_EndDate
        {
            get { return mregistration_EndDate; }
            set { mIsChanges = true; mregistration_EndDate = value; }
        }
        public Int32 OwnerNumber
        {
            get { return mOwnerNumber; }
            set { mIsChanges = true; mOwnerNumber = value; }
        }
        public DateTime StartDate
        {
            get { return mStartDate; }
            set { mIsChanges = true; mStartDate = value; }
        }
        public DateTime EndDate
        {
            get { return mEndDate; }
            set { mIsChanges = true; mEndDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public DateTime RegistryDate
        {
            get { return mRegistryDate; }
            set { mIsChanges = true; mRegistryDate = value; }
        }
        public String FileName
        {
            get { return mFileName; }
            set { mIsChanges = true; mFileName = value; }
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

    public partial class CAuthorizations
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
        public List<CVarAuthorizations> lstCVarAuthorizations = new List<CVarAuthorizations>();
        public List<CPKAuthorizations> lstDeletedCPKAuthorizations = new List<CPKAuthorizations>();
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
            lstCVarAuthorizations.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAuthorizations";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAuthorizations";
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
                        CVarAuthorizations ObjCVarAuthorizations = new CVarAuthorizations();
                        ObjCVarAuthorizations.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarAuthorizations.mAuthorizationNumber = Convert.ToString(dr["AuthorizationNumber"].ToString());
                        ObjCVarAuthorizations.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarAuthorizations.mregistrationNumber = Convert.ToString(dr["registrationNumber"].ToString());
                        ObjCVarAuthorizations.mregistration_EndDate = Convert.ToDateTime(dr["registration_EndDate"].ToString());
                        ObjCVarAuthorizations.mOwnerNumber = Convert.ToInt32(dr["OwnerNumber"].ToString());
                        ObjCVarAuthorizations.mStartDate = Convert.ToDateTime(dr["StartDate"].ToString());
                        ObjCVarAuthorizations.mEndDate = Convert.ToDateTime(dr["EndDate"].ToString());
                        ObjCVarAuthorizations.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAuthorizations.mRegistryDate = Convert.ToDateTime(dr["RegistryDate"].ToString());
                        ObjCVarAuthorizations.mFileName = Convert.ToString(dr["FileName"].ToString());
                        lstCVarAuthorizations.Add(ObjCVarAuthorizations);
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
            lstCVarAuthorizations.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.NVarChar));
                Com.CommandText = "[dbo].GetListPagingAuthorizations";
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
                        CVarAuthorizations ObjCVarAuthorizations = new CVarAuthorizations();
                        ObjCVarAuthorizations.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarAuthorizations.mAuthorizationNumber = Convert.ToString(dr["AuthorizationNumber"].ToString());
                        ObjCVarAuthorizations.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarAuthorizations.mregistrationNumber = Convert.ToString(dr["registrationNumber"].ToString());
                        ObjCVarAuthorizations.mregistration_EndDate = Convert.ToDateTime(dr["registration_EndDate"].ToString());
                        ObjCVarAuthorizations.mOwnerNumber = Convert.ToInt32(dr["OwnerNumber"].ToString());
                        ObjCVarAuthorizations.mStartDate = Convert.ToDateTime(dr["StartDate"].ToString());
                        ObjCVarAuthorizations.mEndDate = Convert.ToDateTime(dr["EndDate"].ToString());
                        ObjCVarAuthorizations.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAuthorizations.mRegistryDate = Convert.ToDateTime(dr["RegistryDate"].ToString());
                        ObjCVarAuthorizations.mFileName = Convert.ToString(dr["FileName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAuthorizations.Add(ObjCVarAuthorizations);
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
                    Com.CommandText = "[dbo].DeleteListAuthorizations";
                else
                    Com.CommandText = "[dbo].UpdateListAuthorizations";
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
        public Exception DeleteItem(List<CPKAuthorizations> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAuthorizations";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKAuthorizations ObjCPKAuthorizations in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKAuthorizations.ID);
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
        public Exception SaveMethod(List<CVarAuthorizations> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@AuthorizationNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@registrationNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@registration_EndDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@OwnerNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@StartDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@EndDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RegistryDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@FileName", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAuthorizations ObjCVarAuthorizations in SaveList)
                {
                    if (ObjCVarAuthorizations.mIsChanges == true)
                    {
                        if (ObjCVarAuthorizations.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAuthorizations";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAuthorizations.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAuthorizations";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAuthorizations.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAuthorizations.ID;
                        }
                        Com.Parameters["@AuthorizationNumber"].Value = ObjCVarAuthorizations.AuthorizationNumber;
                        Com.Parameters["@CustomerID"].Value = ObjCVarAuthorizations.CustomerID;
                        Com.Parameters["@registrationNumber"].Value = ObjCVarAuthorizations.registrationNumber;
                        Com.Parameters["@registration_EndDate"].Value = ObjCVarAuthorizations.registration_EndDate;
                        Com.Parameters["@OwnerNumber"].Value = ObjCVarAuthorizations.OwnerNumber;
                        Com.Parameters["@StartDate"].Value = ObjCVarAuthorizations.StartDate;
                        Com.Parameters["@EndDate"].Value = ObjCVarAuthorizations.EndDate;
                        Com.Parameters["@Notes"].Value = ObjCVarAuthorizations.Notes;
                        Com.Parameters["@RegistryDate"].Value = ObjCVarAuthorizations.RegistryDate;
                        Com.Parameters["@FileName"].Value = ObjCVarAuthorizations.FileName;
                        EndTrans(Com, Con);
                        if (ObjCVarAuthorizations.ID == 0)
                        {
                            ObjCVarAuthorizations.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAuthorizations.mIsChanges = false;
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
