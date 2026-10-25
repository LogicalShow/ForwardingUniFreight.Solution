using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.FA.Generated
{
    [Serializable]
    public class CPKFA_DestructionsStopsPeriod
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
    public partial class CVarFA_DestructionsStopsPeriod : CPKFA_DestructionsStopsPeriod
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal String mNotes;
        internal Int32 mAssetID;
        #endregion

        #region "Methods"
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mIsChanges = true; mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mIsChanges = true; mToDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 AssetID
        {
            get { return mAssetID; }
            set { mIsChanges = true; mAssetID = value; }
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

    public partial class CFA_DestructionsStopsPeriod
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
        public List<CVarFA_DestructionsStopsPeriod> lstCVarFA_DestructionsStopsPeriod = new List<CVarFA_DestructionsStopsPeriod>();
        public List<CPKFA_DestructionsStopsPeriod> lstDeletedCPKFA_DestructionsStopsPeriod = new List<CPKFA_DestructionsStopsPeriod>();
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
            lstCVarFA_DestructionsStopsPeriod.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_DestructionsStopsPeriod";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFA_DestructionsStopsPeriod";
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
                        CVarFA_DestructionsStopsPeriod ObjCVarFA_DestructionsStopsPeriod = new CVarFA_DestructionsStopsPeriod();
                        ObjCVarFA_DestructionsStopsPeriod.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_DestructionsStopsPeriod.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_DestructionsStopsPeriod.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_DestructionsStopsPeriod.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_DestructionsStopsPeriod.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        lstCVarFA_DestructionsStopsPeriod.Add(ObjCVarFA_DestructionsStopsPeriod);
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
            lstCVarFA_DestructionsStopsPeriod.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_DestructionsStopsPeriod";
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
                        CVarFA_DestructionsStopsPeriod ObjCVarFA_DestructionsStopsPeriod = new CVarFA_DestructionsStopsPeriod();
                        ObjCVarFA_DestructionsStopsPeriod.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_DestructionsStopsPeriod.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_DestructionsStopsPeriod.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_DestructionsStopsPeriod.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_DestructionsStopsPeriod.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_DestructionsStopsPeriod.Add(ObjCVarFA_DestructionsStopsPeriod);
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
                    Com.CommandText = "[dbo].DeleteListFA_DestructionsStopsPeriod";
                else
                    Com.CommandText = "[dbo].UpdateListFA_DestructionsStopsPeriod";
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
        public Exception DeleteItem(List<CPKFA_DestructionsStopsPeriod> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFA_DestructionsStopsPeriod";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFA_DestructionsStopsPeriod ObjCPKFA_DestructionsStopsPeriod in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFA_DestructionsStopsPeriod.ID);
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
        public Exception SaveMethod(List<CVarFA_DestructionsStopsPeriod> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AssetID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFA_DestructionsStopsPeriod ObjCVarFA_DestructionsStopsPeriod in SaveList)
                {
                    if (ObjCVarFA_DestructionsStopsPeriod.mIsChanges == true)
                    {
                        if (ObjCVarFA_DestructionsStopsPeriod.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFA_DestructionsStopsPeriod";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFA_DestructionsStopsPeriod.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFA_DestructionsStopsPeriod";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFA_DestructionsStopsPeriod.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFA_DestructionsStopsPeriod.ID;
                        }
                        Com.Parameters["@FromDate"].Value = ObjCVarFA_DestructionsStopsPeriod.FromDate;
                        Com.Parameters["@ToDate"].Value = ObjCVarFA_DestructionsStopsPeriod.ToDate;
                        Com.Parameters["@Notes"].Value = ObjCVarFA_DestructionsStopsPeriod.Notes;
                        Com.Parameters["@AssetID"].Value = ObjCVarFA_DestructionsStopsPeriod.AssetID;
                        EndTrans(Com, Con);
                        if (ObjCVarFA_DestructionsStopsPeriod.ID == 0)
                        {
                            ObjCVarFA_DestructionsStopsPeriod.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFA_DestructionsStopsPeriod.mIsChanges = false;
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
