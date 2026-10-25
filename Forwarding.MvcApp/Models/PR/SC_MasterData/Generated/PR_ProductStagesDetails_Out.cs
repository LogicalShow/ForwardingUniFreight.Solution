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
    public class CPKPR_ProductStagesDetails_Out
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
    public partial class CVarPR_ProductStagesDetails_Out : CPKPR_ProductStagesDetails_Out
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mProductID;
        internal Decimal mPercentage;
        internal Decimal mQty;
        internal Int32 mProductStageID;
        internal Boolean mIsDeleted;
        #endregion

        #region "Methods"
        public Int64 ProductID
        {
            get { return mProductID; }
            set { mIsChanges = true; mProductID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mIsChanges = true; mPercentage = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mIsChanges = true; mQty = value; }
        }
        public Int32 ProductStageID
        {
            get { return mProductStageID; }
            set { mIsChanges = true; mProductStageID = value; }
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

    public partial class CPR_ProductStagesDetails_Out
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
        public List<CVarPR_ProductStagesDetails_Out> lstCVarPR_ProductStagesDetails_Out = new List<CVarPR_ProductStagesDetails_Out>();
        public List<CPKPR_ProductStagesDetails_Out> lstDeletedCPKPR_ProductStagesDetails_Out = new List<CPKPR_ProductStagesDetails_Out>();
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
            lstCVarPR_ProductStagesDetails_Out.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPR_ProductStagesDetails_Out";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPR_ProductStagesDetails_Out";
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
                        CVarPR_ProductStagesDetails_Out ObjCVarPR_ProductStagesDetails_Out = new CVarPR_ProductStagesDetails_Out();
                        ObjCVarPR_ProductStagesDetails_Out.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mProductStageID = Convert.ToInt32(dr["ProductStageID"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        lstCVarPR_ProductStagesDetails_Out.Add(ObjCVarPR_ProductStagesDetails_Out);
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
            lstCVarPR_ProductStagesDetails_Out.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPR_ProductStagesDetails_Out";
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
                        CVarPR_ProductStagesDetails_Out ObjCVarPR_ProductStagesDetails_Out = new CVarPR_ProductStagesDetails_Out();
                        ObjCVarPR_ProductStagesDetails_Out.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mProductStageID = Convert.ToInt32(dr["ProductStageID"].ToString());
                        ObjCVarPR_ProductStagesDetails_Out.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPR_ProductStagesDetails_Out.Add(ObjCVarPR_ProductStagesDetails_Out);
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
                    Com.CommandText = "[dbo].DeleteListPR_ProductStagesDetails_Out";
                else
                    Com.CommandText = "[dbo].UpdateListPR_ProductStagesDetails_Out";
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
        public Exception DeleteItem(List<CPKPR_ProductStagesDetails_Out> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPR_ProductStagesDetails_Out";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKPR_ProductStagesDetails_Out ObjCPKPR_ProductStagesDetails_Out in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKPR_ProductStagesDetails_Out.ID);
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
        public Exception SaveMethod(List<CVarPR_ProductStagesDetails_Out> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ProductID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Percentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ProductStageID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPR_ProductStagesDetails_Out ObjCVarPR_ProductStagesDetails_Out in SaveList)
                {
                    if (ObjCVarPR_ProductStagesDetails_Out.mIsChanges == true)
                    {
                        if (ObjCVarPR_ProductStagesDetails_Out.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPR_ProductStagesDetails_Out";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPR_ProductStagesDetails_Out.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPR_ProductStagesDetails_Out";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPR_ProductStagesDetails_Out.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPR_ProductStagesDetails_Out.ID;
                        }
                        Com.Parameters["@ProductID"].Value = ObjCVarPR_ProductStagesDetails_Out.ProductID;
                        Com.Parameters["@Percentage"].Value = ObjCVarPR_ProductStagesDetails_Out.Percentage;
                        Com.Parameters["@Qty"].Value = ObjCVarPR_ProductStagesDetails_Out.Qty;
                        Com.Parameters["@ProductStageID"].Value = ObjCVarPR_ProductStagesDetails_Out.ProductStageID;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPR_ProductStagesDetails_Out.IsDeleted;
                        EndTrans(Com, Con);
                        if (ObjCVarPR_ProductStagesDetails_Out.ID == 0)
                        {
                            ObjCVarPR_ProductStagesDetails_Out.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPR_ProductStagesDetails_Out.mIsChanges = false;
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
