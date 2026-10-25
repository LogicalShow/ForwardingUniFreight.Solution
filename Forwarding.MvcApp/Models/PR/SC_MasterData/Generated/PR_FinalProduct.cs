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
    public class CPKPR_FinalProduct
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
    public partial class CVarPR_FinalProduct : CPKPR_FinalProduct
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mProductID;
        internal Int32 mFromStoreID;
        internal Int32 mToStoreID;
        internal String mNotes;
        internal Boolean mIsDeleted;
        #endregion

        #region "Methods"
        public Int64 ProductID
        {
            get { return mProductID; }
            set { mIsChanges = true; mProductID = value; }
        }
        public Int32 FromStoreID
        {
            get { return mFromStoreID; }
            set { mIsChanges = true; mFromStoreID = value; }
        }
        public Int32 ToStoreID
        {
            get { return mToStoreID; }
            set { mIsChanges = true; mToStoreID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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

    public partial class CPR_FinalProduct
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
        public List<CVarPR_FinalProduct> lstCVarPR_FinalProduct = new List<CVarPR_FinalProduct>();
        public List<CPKPR_FinalProduct> lstDeletedCPKPR_FinalProduct = new List<CPKPR_FinalProduct>();
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
            lstCVarPR_FinalProduct.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPR_FinalProduct";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPR_FinalProduct";
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
                        CVarPR_FinalProduct ObjCVarPR_FinalProduct = new CVarPR_FinalProduct();
                        ObjCVarPR_FinalProduct.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPR_FinalProduct.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarPR_FinalProduct.mFromStoreID = Convert.ToInt32(dr["FromStoreID"].ToString());
                        ObjCVarPR_FinalProduct.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarPR_FinalProduct.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPR_FinalProduct.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        lstCVarPR_FinalProduct.Add(ObjCVarPR_FinalProduct);
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
            lstCVarPR_FinalProduct.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPR_FinalProduct";
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
                        CVarPR_FinalProduct ObjCVarPR_FinalProduct = new CVarPR_FinalProduct();
                        ObjCVarPR_FinalProduct.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPR_FinalProduct.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarPR_FinalProduct.mFromStoreID = Convert.ToInt32(dr["FromStoreID"].ToString());
                        ObjCVarPR_FinalProduct.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarPR_FinalProduct.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPR_FinalProduct.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPR_FinalProduct.Add(ObjCVarPR_FinalProduct);
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
                    Com.CommandText = "[dbo].DeleteListPR_FinalProduct";
                else
                    Com.CommandText = "[dbo].UpdateListPR_FinalProduct";
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
        public Exception DeleteItem(List<CPKPR_FinalProduct> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPR_FinalProduct";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPR_FinalProduct ObjCPKPR_FinalProduct in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPR_FinalProduct.ID);
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
        public Exception SaveMethod(List<CVarPR_FinalProduct> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ProductID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@FromStoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToStoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPR_FinalProduct ObjCVarPR_FinalProduct in SaveList)
                {
                    if (ObjCVarPR_FinalProduct.mIsChanges == true)
                    {
                        if (ObjCVarPR_FinalProduct.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPR_FinalProduct";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPR_FinalProduct.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPR_FinalProduct";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPR_FinalProduct.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPR_FinalProduct.ID;
                        }
                        Com.Parameters["@ProductID"].Value = ObjCVarPR_FinalProduct.ProductID;
                        Com.Parameters["@FromStoreID"].Value = ObjCVarPR_FinalProduct.FromStoreID;
                        Com.Parameters["@ToStoreID"].Value = ObjCVarPR_FinalProduct.ToStoreID;
                        Com.Parameters["@Notes"].Value = ObjCVarPR_FinalProduct.Notes;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPR_FinalProduct.IsDeleted;
                        EndTrans(Com, Con);
                        if (ObjCVarPR_FinalProduct.ID == 0)
                        {
                            ObjCVarPR_FinalProduct.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPR_FinalProduct.mIsChanges = false;
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
