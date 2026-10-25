using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CRM.CRM_SalesMenTarget.Generated
{
    [Serializable]
    public class CPKCRM_SalesMenTarget
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
    public partial class CVarCRM_SalesMenTarget : CPKCRM_SalesMenTarget
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mSalesRepID;
        internal Int32 mActionTypeID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModifatorUserID;
        internal DateTime mModificationDate;
        internal String mWeekendDays;
        internal Int32 mVacationsCount;
        internal String mNotes;
        #endregion

        #region "Methods"
        public Int32 SalesRepID
        {
            get { return mSalesRepID; }
            set { mIsChanges = true; mSalesRepID = value; }
        }
        public Int32 ActionTypeID
        {
            get { return mActionTypeID; }
            set { mIsChanges = true; mActionTypeID = value; }
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
        public Int32 ModifatorUserID
        {
            get { return mModifatorUserID; }
            set { mIsChanges = true; mModifatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public String WeekendDays
        {
            get { return mWeekendDays; }
            set { mIsChanges = true; mWeekendDays = value; }
        }
        public Int32 VacationsCount
        {
            get { return mVacationsCount; }
            set { mIsChanges = true; mVacationsCount = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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

    public partial class CCRM_SalesMenTarget
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
        public List<CVarCRM_SalesMenTarget> lstCVarCRM_SalesMenTarget = new List<CVarCRM_SalesMenTarget>();
        public List<CPKCRM_SalesMenTarget> lstDeletedCPKCRM_SalesMenTarget = new List<CPKCRM_SalesMenTarget>();
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
            lstCVarCRM_SalesMenTarget.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCRM_SalesMenTarget";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCRM_SalesMenTarget";
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
                        CVarCRM_SalesMenTarget ObjCVarCRM_SalesMenTarget = new CVarCRM_SalesMenTarget();
                        ObjCVarCRM_SalesMenTarget.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mSalesRepID = Convert.ToInt32(dr["SalesRepID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mActionTypeID = Convert.ToInt32(dr["ActionTypeID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_SalesMenTarget.mModifatorUserID = Convert.ToInt32(dr["ModifatorUserID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_SalesMenTarget.mWeekendDays = Convert.ToString(dr["WeekendDays"].ToString());
                        ObjCVarCRM_SalesMenTarget.mVacationsCount = Convert.ToInt32(dr["VacationsCount"].ToString());
                        ObjCVarCRM_SalesMenTarget.mNotes = Convert.ToString(dr["Notes"].ToString());
                        lstCVarCRM_SalesMenTarget.Add(ObjCVarCRM_SalesMenTarget);
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
            lstCVarCRM_SalesMenTarget.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCRM_SalesMenTarget";
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
                        CVarCRM_SalesMenTarget ObjCVarCRM_SalesMenTarget = new CVarCRM_SalesMenTarget();
                        ObjCVarCRM_SalesMenTarget.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mSalesRepID = Convert.ToInt32(dr["SalesRepID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mActionTypeID = Convert.ToInt32(dr["ActionTypeID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_SalesMenTarget.mModifatorUserID = Convert.ToInt32(dr["ModifatorUserID"].ToString());
                        ObjCVarCRM_SalesMenTarget.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_SalesMenTarget.mWeekendDays = Convert.ToString(dr["WeekendDays"].ToString());
                        ObjCVarCRM_SalesMenTarget.mVacationsCount = Convert.ToInt32(dr["VacationsCount"].ToString());
                        ObjCVarCRM_SalesMenTarget.mNotes = Convert.ToString(dr["Notes"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCRM_SalesMenTarget.Add(ObjCVarCRM_SalesMenTarget);
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
                    Com.CommandText = "[dbo].DeleteListCRM_SalesMenTarget";
                else
                    Com.CommandText = "[dbo].UpdateListCRM_SalesMenTarget";
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
        public Exception DeleteItem(List<CPKCRM_SalesMenTarget> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCRM_SalesMenTarget";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCRM_SalesMenTarget ObjCPKCRM_SalesMenTarget in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCRM_SalesMenTarget.ID);
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
        public Exception SaveMethod(List<CVarCRM_SalesMenTarget> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@SalesRepID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActionTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModifatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@WeekendDays", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@VacationsCount", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCRM_SalesMenTarget ObjCVarCRM_SalesMenTarget in SaveList)
                {
                    if (ObjCVarCRM_SalesMenTarget.mIsChanges == true)
                    {
                        if (ObjCVarCRM_SalesMenTarget.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCRM_SalesMenTarget";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCRM_SalesMenTarget.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCRM_SalesMenTarget";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCRM_SalesMenTarget.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCRM_SalesMenTarget.ID;
                        }
                        Com.Parameters["@SalesRepID"].Value = ObjCVarCRM_SalesMenTarget.SalesRepID;
                        Com.Parameters["@ActionTypeID"].Value = ObjCVarCRM_SalesMenTarget.ActionTypeID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCRM_SalesMenTarget.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCRM_SalesMenTarget.CreationDate;
                        Com.Parameters["@ModifatorUserID"].Value = ObjCVarCRM_SalesMenTarget.ModifatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCRM_SalesMenTarget.ModificationDate;
                        Com.Parameters["@WeekendDays"].Value = ObjCVarCRM_SalesMenTarget.WeekendDays;
                        Com.Parameters["@VacationsCount"].Value = ObjCVarCRM_SalesMenTarget.VacationsCount;
                        Com.Parameters["@Notes"].Value = ObjCVarCRM_SalesMenTarget.Notes;
                        EndTrans(Com, Con);
                        if (ObjCVarCRM_SalesMenTarget.ID == 0)
                        {
                            ObjCVarCRM_SalesMenTarget.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCRM_SalesMenTarget.mIsChanges = false;
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
