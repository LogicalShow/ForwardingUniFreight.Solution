using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PR.MasterData.Generated
{
    [Serializable]
    public class CPKPR_ProductStages
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
    public partial class CVarPR_ProductStages : CPKPR_ProductStages
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mStageID;
        internal Int64 mFinalProductID;
        internal Int32 mParentStageID;
        internal Boolean mIsDeleted;
        internal Int32 mOrderNo;
        #endregion

        #region "Methods"
        public Int32 StageID
        {
            get { return mStageID; }
            set { mIsChanges = true; mStageID = value; }
        }
        public Int64 FinalProductID
        {
            get { return mFinalProductID; }
            set { mIsChanges = true; mFinalProductID = value; }
        }
        public Int32 ParentStageID
        {
            get { return mParentStageID; }
            set { mIsChanges = true; mParentStageID = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Int32 OrderNo
        {
            get { return mOrderNo; }
            set { mIsChanges = true; mOrderNo = value; }
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

    public partial class CPR_ProductStages
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
        public List<CVarPR_ProductStages> lstCVarPR_ProductStages = new List<CVarPR_ProductStages>();
        public List<CPKPR_ProductStages> lstDeletedCPKPR_ProductStages = new List<CPKPR_ProductStages>();
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
            lstCVarPR_ProductStages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPR_ProductStages";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPR_ProductStages";
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
                        CVarPR_ProductStages ObjCVarPR_ProductStages = new CVarPR_ProductStages();
                        ObjCVarPR_ProductStages.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPR_ProductStages.mStageID = Convert.ToInt32(dr["StageID"].ToString());
                        ObjCVarPR_ProductStages.mFinalProductID = Convert.ToInt64(dr["FinalProductID"].ToString());
                        ObjCVarPR_ProductStages.mParentStageID = Convert.ToInt32(dr["ParentStageID"].ToString());
                        ObjCVarPR_ProductStages.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPR_ProductStages.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        lstCVarPR_ProductStages.Add(ObjCVarPR_ProductStages);
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
            lstCVarPR_ProductStages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPR_ProductStages";
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
                        CVarPR_ProductStages ObjCVarPR_ProductStages = new CVarPR_ProductStages();
                        ObjCVarPR_ProductStages.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPR_ProductStages.mStageID = Convert.ToInt32(dr["StageID"].ToString());
                        ObjCVarPR_ProductStages.mFinalProductID = Convert.ToInt64(dr["FinalProductID"].ToString());
                        ObjCVarPR_ProductStages.mParentStageID = Convert.ToInt32(dr["ParentStageID"].ToString());
                        ObjCVarPR_ProductStages.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPR_ProductStages.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPR_ProductStages.Add(ObjCVarPR_ProductStages);
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
                    Com.CommandText = "[dbo].DeleteListPR_ProductStages";
                else
                    Com.CommandText = "[dbo].UpdateListPR_ProductStages";
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
        public Exception DeleteItem(List<CPKPR_ProductStages> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPR_ProductStages";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKPR_ProductStages ObjCPKPR_ProductStages in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKPR_ProductStages.ID);
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
        public Exception SaveMethod(List<CVarPR_ProductStages> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@StageID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FinalProductID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ParentStageID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@OrderNo", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPR_ProductStages ObjCVarPR_ProductStages in SaveList)
                {
                    if (ObjCVarPR_ProductStages.mIsChanges == true)
                    {
                        if (ObjCVarPR_ProductStages.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPR_ProductStages";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPR_ProductStages.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPR_ProductStages";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPR_ProductStages.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPR_ProductStages.ID;
                        }
                        Com.Parameters["@StageID"].Value = ObjCVarPR_ProductStages.StageID;
                        Com.Parameters["@FinalProductID"].Value = ObjCVarPR_ProductStages.FinalProductID;
                        Com.Parameters["@ParentStageID"].Value = ObjCVarPR_ProductStages.ParentStageID;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPR_ProductStages.IsDeleted;
                        Com.Parameters["@OrderNo"].Value = ObjCVarPR_ProductStages.OrderNo;
                        EndTrans(Com, Con);
                        if (ObjCVarPR_ProductStages.ID == 0)
                        {
                            ObjCVarPR_ProductStages.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPR_ProductStages.mIsChanges = false;
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
