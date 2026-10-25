using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.MasterData.Generated
{

    [Serializable]
    public class CPKSC_StoresLevels
    {
        #region "variables"
        private Byte mID;
        #endregion

        #region "Methods"
        public Byte ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarSC_StoresLevels : CPKSC_StoresLevels
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mWidth;
        internal String mLevelName;
        #endregion

        #region "Methods"
        public Int32 Width
        {
            get { return mWidth; }
            set { mIsChanges = true; mWidth = value; }
        }
        public String LevelName
        {
            get { return mLevelName; }
            set { mIsChanges = true; mLevelName = value; }
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

    public partial class CSC_StoresLevels
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
        public List<CVarSC_StoresLevels> lstCVarSC_StoresLevels = new List<CVarSC_StoresLevels>();
        public List<CPKSC_StoresLevels> lstDeletedCPKSC_StoresLevels = new List<CPKSC_StoresLevels>();
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
        public Exception GetItem(Byte ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_StoresLevels.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSC_StoresLevels";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSC_StoresLevels";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.TinyInt));
                    Com.Parameters[0].Value = Convert.ToByte(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSC_StoresLevels ObjCVarSC_StoresLevels = new CVarSC_StoresLevels();
                        ObjCVarSC_StoresLevels.ID = Convert.ToByte(dr["ID"].ToString());
                        ObjCVarSC_StoresLevels.mWidth = Convert.ToInt32(dr["Width"].ToString());
                        ObjCVarSC_StoresLevels.mLevelName = Convert.ToString(dr["LevelName"].ToString());
                        lstCVarSC_StoresLevels.Add(ObjCVarSC_StoresLevels);
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
            lstCVarSC_StoresLevels.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSC_StoresLevels";
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
                        CVarSC_StoresLevels ObjCVarSC_StoresLevels = new CVarSC_StoresLevels();
                        ObjCVarSC_StoresLevels.ID = Convert.ToByte(dr["ID"].ToString());
                        ObjCVarSC_StoresLevels.mWidth = Convert.ToInt32(dr["Width"].ToString());
                        ObjCVarSC_StoresLevels.mLevelName = Convert.ToString(dr["LevelName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSC_StoresLevels.Add(ObjCVarSC_StoresLevels);
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
                    Com.CommandText = "[dbo].DeleteListSC_StoresLevels";
                else
                    Com.CommandText = "[dbo].UpdateListSC_StoresLevels";
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
        public Exception DeleteItem(List<CPKSC_StoresLevels> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSC_StoresLevels";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.TinyInt));
                foreach (CPKSC_StoresLevels ObjCPKSC_StoresLevels in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToByte(ObjCPKSC_StoresLevels.ID);
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
        public Exception SaveMethod(List<CVarSC_StoresLevels> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Width", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@LevelName", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.TinyInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_StoresLevels ObjCVarSC_StoresLevels in SaveList)
                {
                    if (ObjCVarSC_StoresLevels.mIsChanges == true)
                    {
                        if (ObjCVarSC_StoresLevels.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_StoresLevels";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSC_StoresLevels.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSC_StoresLevels";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_StoresLevels.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_StoresLevels.ID;
                        }
                        Com.Parameters["@Width"].Value = ObjCVarSC_StoresLevels.Width;
                        Com.Parameters["@LevelName"].Value = ObjCVarSC_StoresLevels.LevelName;
                        EndTrans(Com, Con);
                        if (ObjCVarSC_StoresLevels.ID == 0)
                        {
                            ObjCVarSC_StoresLevels.ID = Convert.ToByte(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_StoresLevels.mIsChanges = false;
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
