using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.LoadingAndDischarging.Generated
{
    [Serializable]
    public class CPKLoadingAndDischargingHeaderCranes
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
    public partial class CVarLoadingAndDischargingHeaderCranes : CPKLoadingAndDischargingHeaderCranes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mEquipmentID;
        internal String mNotes;
        internal Int32 mLoadingAndDischargingHeaderID;
        internal DateTime mToDate;
        internal DateTime mFromDate;
        #endregion

        #region "Methods"
        public Int32 EquipmentID
        {
            get { return mEquipmentID; }
            set { mIsChanges = true; mEquipmentID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 LoadingAndDischargingHeaderID
        {
            get { return mLoadingAndDischargingHeaderID; }
            set { mIsChanges = true; mLoadingAndDischargingHeaderID = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mIsChanges = true; mToDate = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mIsChanges = true; mFromDate = value; }
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

    public partial class CLoadingAndDischargingHeaderCranes
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
        public List<CVarLoadingAndDischargingHeaderCranes> lstCVarLoadingAndDischargingHeaderCranes = new List<CVarLoadingAndDischargingHeaderCranes>();
        public List<CPKLoadingAndDischargingHeaderCranes> lstDeletedCPKLoadingAndDischargingHeaderCranes = new List<CPKLoadingAndDischargingHeaderCranes>();
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
            lstCVarLoadingAndDischargingHeaderCranes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLoadingAndDischargingHeaderCranes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLoadingAndDischargingHeaderCranes";
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
                        CVarLoadingAndDischargingHeaderCranes ObjCVarLoadingAndDischargingHeaderCranes = new CVarLoadingAndDischargingHeaderCranes();
                        ObjCVarLoadingAndDischargingHeaderCranes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mLoadingAndDischargingHeaderID = Convert.ToInt32(dr["LoadingAndDischargingHeaderID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        lstCVarLoadingAndDischargingHeaderCranes.Add(ObjCVarLoadingAndDischargingHeaderCranes);
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
            lstCVarLoadingAndDischargingHeaderCranes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLoadingAndDischargingHeaderCranes";
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
                        CVarLoadingAndDischargingHeaderCranes ObjCVarLoadingAndDischargingHeaderCranes = new CVarLoadingAndDischargingHeaderCranes();
                        ObjCVarLoadingAndDischargingHeaderCranes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mLoadingAndDischargingHeaderID = Convert.ToInt32(dr["LoadingAndDischargingHeaderID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarLoadingAndDischargingHeaderCranes.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLoadingAndDischargingHeaderCranes.Add(ObjCVarLoadingAndDischargingHeaderCranes);
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
                    Com.CommandText = "[dbo].DeleteListLoadingAndDischargingHeaderCranes";
                else
                    Com.CommandText = "[dbo].UpdateListLoadingAndDischargingHeaderCranes";
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
        public Exception DeleteItem(List<CPKLoadingAndDischargingHeaderCranes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLoadingAndDischargingHeaderCranes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLoadingAndDischargingHeaderCranes ObjCPKLoadingAndDischargingHeaderCranes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLoadingAndDischargingHeaderCranes.ID);
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
        public Exception SaveMethod(List<CVarLoadingAndDischargingHeaderCranes> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@EquipmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LoadingAndDischargingHeaderID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLoadingAndDischargingHeaderCranes ObjCVarLoadingAndDischargingHeaderCranes in SaveList)
                {
                    if (ObjCVarLoadingAndDischargingHeaderCranes.mIsChanges == true)
                    {
                        if (ObjCVarLoadingAndDischargingHeaderCranes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLoadingAndDischargingHeaderCranes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLoadingAndDischargingHeaderCranes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLoadingAndDischargingHeaderCranes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaderCranes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLoadingAndDischargingHeaderCranes.ID;
                        }
                        Com.Parameters["@EquipmentID"].Value = ObjCVarLoadingAndDischargingHeaderCranes.EquipmentID;
                        Com.Parameters["@Notes"].Value = ObjCVarLoadingAndDischargingHeaderCranes.Notes;
                        Com.Parameters["@LoadingAndDischargingHeaderID"].Value = ObjCVarLoadingAndDischargingHeaderCranes.LoadingAndDischargingHeaderID;
                        Com.Parameters["@ToDate"].Value = ObjCVarLoadingAndDischargingHeaderCranes.ToDate;
                        Com.Parameters["@FromDate"].Value = ObjCVarLoadingAndDischargingHeaderCranes.FromDate;
                        EndTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaderCranes.ID == 0)
                        {
                            ObjCVarLoadingAndDischargingHeaderCranes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLoadingAndDischargingHeaderCranes.mIsChanges = false;
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
