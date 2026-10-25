using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Generated
{
    [Serializable]
    public class CPKWH_PackageTypeBarCode
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
    public partial class CVarWH_PackageTypeBarCode : CPKWH_PackageTypeBarCode
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPurchaseItemID;
        internal Int32 mPackageTypeID;
        internal String mBarCode;
        internal String mColor;
        internal String mModel;
        #endregion

        #region "Methods"
        public Int64 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mIsChanges = true; mPurchaseItemID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public String BarCode
        {
            get { return mBarCode; }
            set { mIsChanges = true; mBarCode = value; }
        }
        public String Color
        {
            get { return mColor; }
            set { mIsChanges = true; mColor = value; }
        }
        public String Model
        {
            get { return mModel; }
            set { mIsChanges = true; mModel = value; }
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

    public partial class CWH_PackageTypeBarCode
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
        public List<CVarWH_PackageTypeBarCode> lstCVarWH_PackageTypeBarCode = new List<CVarWH_PackageTypeBarCode>();
        public List<CPKWH_PackageTypeBarCode> lstDeletedCPKWH_PackageTypeBarCode = new List<CPKWH_PackageTypeBarCode>();
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
            lstCVarWH_PackageTypeBarCode.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListWH_PackageTypeBarCode";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemWH_PackageTypeBarCode";
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
                        CVarWH_PackageTypeBarCode ObjCVarWH_PackageTypeBarCode = new CVarWH_PackageTypeBarCode();
                        ObjCVarWH_PackageTypeBarCode.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mColor = Convert.ToString(dr["Color"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mModel = Convert.ToString(dr["Model"].ToString());
                        lstCVarWH_PackageTypeBarCode.Add(ObjCVarWH_PackageTypeBarCode);
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
            lstCVarWH_PackageTypeBarCode.Clear();

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
                Com.CommandText = "[dbo].GetListPagingWH_PackageTypeBarCode";
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
                        CVarWH_PackageTypeBarCode ObjCVarWH_PackageTypeBarCode = new CVarWH_PackageTypeBarCode();
                        ObjCVarWH_PackageTypeBarCode.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mColor = Convert.ToString(dr["Color"].ToString());
                        ObjCVarWH_PackageTypeBarCode.mModel = Convert.ToString(dr["Model"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarWH_PackageTypeBarCode.Add(ObjCVarWH_PackageTypeBarCode);
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
                    Com.CommandText = "[dbo].DeleteListWH_PackageTypeBarCode";
                else
                    Com.CommandText = "[dbo].UpdateListWH_PackageTypeBarCode";
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
        public Exception DeleteItem(List<CPKWH_PackageTypeBarCode> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemWH_PackageTypeBarCode";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKWH_PackageTypeBarCode ObjCPKWH_PackageTypeBarCode in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_PackageTypeBarCode.ID);
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
        public Exception SaveMethod(List<CVarWH_PackageTypeBarCode> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BarCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Color", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Model", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarWH_PackageTypeBarCode ObjCVarWH_PackageTypeBarCode in SaveList)
                {
                    if (ObjCVarWH_PackageTypeBarCode.mIsChanges == true)
                    {
                        if (ObjCVarWH_PackageTypeBarCode.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemWH_PackageTypeBarCode";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarWH_PackageTypeBarCode.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemWH_PackageTypeBarCode";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarWH_PackageTypeBarCode.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarWH_PackageTypeBarCode.ID;
                        }
                        Com.Parameters["@PurchaseItemID"].Value = ObjCVarWH_PackageTypeBarCode.PurchaseItemID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarWH_PackageTypeBarCode.PackageTypeID;
                        Com.Parameters["@BarCode"].Value = ObjCVarWH_PackageTypeBarCode.BarCode;
                        Com.Parameters["@Color"].Value = ObjCVarWH_PackageTypeBarCode.Color;
                        Com.Parameters["@Model"].Value = ObjCVarWH_PackageTypeBarCode.Model;
                        EndTrans(Com, Con);
                        if (ObjCVarWH_PackageTypeBarCode.ID == 0)
                        {
                            ObjCVarWH_PackageTypeBarCode.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarWH_PackageTypeBarCode.mIsChanges = false;
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
