using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public class CPKJVDefaults
    {
        #region "variables"
        private Int32 mTransTypeID;
        #endregion

        #region "Methods"
        public Int32 TransTypeID
        {
            get { return mTransTypeID; }
            set { mTransTypeID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarJVDefaults : CPKJVDefaults
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mTransTypeName;
        internal Int32 mJournalTypeID;
        internal Int32 mJVTypeID;
        #endregion

        #region "Methods"
        public String TransTypeName
        {
            get { return mTransTypeName; }
            set { mIsChanges = true; mTransTypeName = value; }
        }
        public Int32 JournalTypeID
        {
            get { return mJournalTypeID; }
            set { mIsChanges = true; mJournalTypeID = value; }
        }
        public Int32 JVTypeID
        {
            get { return mJVTypeID; }
            set { mIsChanges = true; mJVTypeID = value; }
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

    public partial class CJVDefaults
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
        public List<CVarJVDefaults> lstCVarJVDefaults = new List<CVarJVDefaults>();
        public List<CPKJVDefaults> lstDeletedCPKJVDefaults = new List<CPKJVDefaults>();
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
        public Exception GetItem(Int32 TransTypeID)
        {
            return DataFill(Convert.ToString(TransTypeID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarJVDefaults.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListJVDefaults";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemJVDefaults";
                    Com.Parameters.Add(new SqlParameter("@TransTypeID", SqlDbType.Int));
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
                        CVarJVDefaults ObjCVarJVDefaults = new CVarJVDefaults();
                        ObjCVarJVDefaults.TransTypeID = Convert.ToInt32(dr["TransTypeID"].ToString());
                        ObjCVarJVDefaults.mTransTypeName = Convert.ToString(dr["TransTypeName"].ToString());
                        ObjCVarJVDefaults.mJournalTypeID = Convert.ToInt32(dr["JournalTypeID"].ToString());
                        ObjCVarJVDefaults.mJVTypeID = Convert.ToInt32(dr["JVTypeID"].ToString());
                        lstCVarJVDefaults.Add(ObjCVarJVDefaults);
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
            lstCVarJVDefaults.Clear();

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
                Com.CommandText = "[dbo].GetListPagingJVDefaults";
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
                        CVarJVDefaults ObjCVarJVDefaults = new CVarJVDefaults();
                        ObjCVarJVDefaults.TransTypeID = Convert.ToInt32(dr["TransTypeID"].ToString());
                        ObjCVarJVDefaults.mTransTypeName = Convert.ToString(dr["TransTypeName"].ToString());
                        ObjCVarJVDefaults.mJournalTypeID = Convert.ToInt32(dr["JournalTypeID"].ToString());
                        ObjCVarJVDefaults.mJVTypeID = Convert.ToInt32(dr["JVTypeID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarJVDefaults.Add(ObjCVarJVDefaults);
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
                    Com.CommandText = "[dbo].DeleteListJVDefaults";
                else
                    Com.CommandText = "[dbo].UpdateListJVDefaults";
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
        public Exception DeleteItem(List<CPKJVDefaults> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemJVDefaults";
                Com.Parameters.Add(new SqlParameter("@TransTypeID", SqlDbType.Int));
                foreach (CPKJVDefaults ObjCPKJVDefaults in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKJVDefaults.TransTypeID);
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
        public Exception SaveMethod(List<CVarJVDefaults> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TransTypeName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@JournalTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVTypeID", SqlDbType.Int));
                SqlParameter paraTransTypeID = Com.Parameters.Add(new SqlParameter("@TransTypeID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "TransTypeID", DataRowVersion.Default, null));
                foreach (CVarJVDefaults ObjCVarJVDefaults in SaveList)
                {
                    if (ObjCVarJVDefaults.mIsChanges == true)
                    {
                        if (ObjCVarJVDefaults.TransTypeID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemJVDefaults";
                            paraTransTypeID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarJVDefaults.TransTypeID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemJVDefaults";
                            paraTransTypeID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarJVDefaults.TransTypeID != 0)
                        {
                            Com.Parameters["@TransTypeID"].Value = ObjCVarJVDefaults.TransTypeID;
                        }
                        Com.Parameters["@TransTypeName"].Value = ObjCVarJVDefaults.TransTypeName;
                        Com.Parameters["@JournalTypeID"].Value = ObjCVarJVDefaults.JournalTypeID;
                        Com.Parameters["@JVTypeID"].Value = ObjCVarJVDefaults.JVTypeID;
                        EndTrans(Com, Con);
                        if (ObjCVarJVDefaults.TransTypeID == 0)
                        {
                            ObjCVarJVDefaults.TransTypeID = Convert.ToInt32(Com.Parameters["@TransTypeID"].Value);
                        }
                        ObjCVarJVDefaults.mIsChanges = false;
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
