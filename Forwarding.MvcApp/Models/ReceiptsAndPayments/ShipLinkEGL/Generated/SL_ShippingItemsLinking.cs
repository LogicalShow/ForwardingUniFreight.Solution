using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated
{
    [Serializable]
    public class CPKSL_ShippingItemsLinking
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
    public partial class CVarSL_ShippingItemsLinking : CPKSL_ShippingItemsLinking
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mShiplinkItemID;
        internal Int32 mRevenueAccountID;
        internal Int32 mCostCenterID;
        internal Boolean mIsFreightItem;
        internal String mImportExport;
        internal Int32 mVoyageAccountID;
        internal Int32 mVoyageSubAccountID;
        internal Int32 mRevenueSubAccountID20;
        internal Int32 mRevenueSubAccountID40;
        internal Int32 mLineID;
        #endregion

        #region "Methods"
        public Int32 ShiplinkItemID
        {
            get { return mShiplinkItemID; }
            set { mIsChanges = true; mShiplinkItemID = value; }
        }
        public Int32 RevenueAccountID
        {
            get { return mRevenueAccountID; }
            set { mIsChanges = true; mRevenueAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Boolean IsFreightItem
        {
            get { return mIsFreightItem; }
            set { mIsChanges = true; mIsFreightItem = value; }
        }
        public String ImportExport
        {
            get { return mImportExport; }
            set { mIsChanges = true; mImportExport = value; }
        }
        public Int32 VoyageAccountID
        {
            get { return mVoyageAccountID; }
            set { mIsChanges = true; mVoyageAccountID = value; }
        }
        public Int32 VoyageSubAccountID
        {
            get { return mVoyageSubAccountID; }
            set { mIsChanges = true; mVoyageSubAccountID = value; }
        }
        public Int32 RevenueSubAccountID20
        {
            get { return mRevenueSubAccountID20; }
            set { mIsChanges = true; mRevenueSubAccountID20 = value; }
        }
        public Int32 RevenueSubAccountID40
        {
            get { return mRevenueSubAccountID40; }
            set { mIsChanges = true; mRevenueSubAccountID40 = value; }
        }
        public Int32 LineID
        {
            get { return mLineID; }
            set { mIsChanges = true; mLineID = value; }
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

    public partial class CSL_ShippingItemsLinking
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
        public List<CVarSL_ShippingItemsLinking> lstCVarSL_ShippingItemsLinking = new List<CVarSL_ShippingItemsLinking>();
        public List<CPKSL_ShippingItemsLinking> lstDeletedCPKSL_ShippingItemsLinking = new List<CPKSL_ShippingItemsLinking>();
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
            lstCVarSL_ShippingItemsLinking.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_ShippingItemsLinking";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_ShippingItemsLinking";
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
                        CVarSL_ShippingItemsLinking ObjCVarSL_ShippingItemsLinking = new CVarSL_ShippingItemsLinking();
                        ObjCVarSL_ShippingItemsLinking.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mShiplinkItemID = Convert.ToInt32(dr["ShiplinkItemID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mRevenueAccountID = Convert.ToInt32(dr["RevenueAccountID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mIsFreightItem = Convert.ToBoolean(dr["IsFreightItem"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mImportExport = Convert.ToString(dr["ImportExport"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mVoyageAccountID = Convert.ToInt32(dr["VoyageAccountID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mVoyageSubAccountID = Convert.ToInt32(dr["VoyageSubAccountID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mRevenueSubAccountID20 = Convert.ToInt32(dr["RevenueSubAccountID20"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mRevenueSubAccountID40 = Convert.ToInt32(dr["RevenueSubAccountID40"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mLineID = Convert.ToInt32(dr["Line"].ToString());
                        lstCVarSL_ShippingItemsLinking.Add(ObjCVarSL_ShippingItemsLinking);
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
            lstCVarSL_ShippingItemsLinking.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_ShippingItemsLinking";
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
                        CVarSL_ShippingItemsLinking ObjCVarSL_ShippingItemsLinking = new CVarSL_ShippingItemsLinking();
                        ObjCVarSL_ShippingItemsLinking.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mShiplinkItemID = Convert.ToInt32(dr["ShiplinkItemID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mRevenueAccountID = Convert.ToInt32(dr["RevenueAccountID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mIsFreightItem = Convert.ToBoolean(dr["IsFreightItem"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mImportExport = Convert.ToString(dr["ImportExport"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mVoyageAccountID = Convert.ToInt32(dr["VoyageAccountID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mVoyageSubAccountID = Convert.ToInt32(dr["VoyageSubAccountID"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mRevenueSubAccountID20 = Convert.ToInt32(dr["RevenueSubAccountID20"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mRevenueSubAccountID40 = Convert.ToInt32(dr["RevenueSubAccountID40"].ToString());
                        ObjCVarSL_ShippingItemsLinking.mLineID = Convert.ToInt32(dr["Line"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_ShippingItemsLinking.Add(ObjCVarSL_ShippingItemsLinking);
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
                    Com.CommandText = "[dbo].DeleteListSL_ShippingItemsLinking";
                else
                    Com.CommandText = "[dbo].UpdateListSL_ShippingItemsLinking";
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
        public Exception DeleteItem(List<CPKSL_ShippingItemsLinking> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_ShippingItemsLinking";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKSL_ShippingItemsLinking ObjCPKSL_ShippingItemsLinking in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKSL_ShippingItemsLinking.ID);
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
        public Exception SaveMethod(List<CVarSL_ShippingItemsLinking> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ShiplinkItemID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RevenueAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsFreightItem", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ImportExport", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@VoyageAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VoyageSubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RevenueSubAccountID20", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RevenueSubAccountID40", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@LineID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_ShippingItemsLinking ObjCVarSL_ShippingItemsLinking in SaveList)
                {
                    if (ObjCVarSL_ShippingItemsLinking.mIsChanges == true)
                    {
                        if (ObjCVarSL_ShippingItemsLinking.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_ShippingItemsLinking";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_ShippingItemsLinking.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_ShippingItemsLinking";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_ShippingItemsLinking.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_ShippingItemsLinking.ID;
                        }
                        Com.Parameters["@ShiplinkItemID"].Value = ObjCVarSL_ShippingItemsLinking.ShiplinkItemID;
                        Com.Parameters["@RevenueAccountID"].Value = ObjCVarSL_ShippingItemsLinking.RevenueAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarSL_ShippingItemsLinking.CostCenterID;
                        Com.Parameters["@IsFreightItem"].Value = ObjCVarSL_ShippingItemsLinking.IsFreightItem;
                        Com.Parameters["@ImportExport"].Value = ObjCVarSL_ShippingItemsLinking.ImportExport;
                        Com.Parameters["@VoyageAccountID"].Value = ObjCVarSL_ShippingItemsLinking.VoyageAccountID;
                        Com.Parameters["@VoyageSubAccountID"].Value = ObjCVarSL_ShippingItemsLinking.VoyageSubAccountID;
                        Com.Parameters["@RevenueSubAccountID20"].Value = ObjCVarSL_ShippingItemsLinking.RevenueSubAccountID20;
                        Com.Parameters["@RevenueSubAccountID40"].Value = ObjCVarSL_ShippingItemsLinking.RevenueSubAccountID40;
                        Com.Parameters["@LineID"].Value = ObjCVarSL_ShippingItemsLinking.LineID;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_ShippingItemsLinking.ID == 0)
                        {
                            ObjCVarSL_ShippingItemsLinking.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_ShippingItemsLinking.mIsChanges = false;
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
