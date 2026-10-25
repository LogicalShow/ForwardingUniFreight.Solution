using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKPS_PurchasingOrdersDetails
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
    public partial class CVarPS_PurchasingOrdersDetails : CPKPS_PurchasingOrdersDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mUnitID;
        internal Int64 mItemID;
        internal Int64 mServiceID;
        internal Int32 mStoreID;
        internal Int64 mPS_PurchasingOrdersID;
        internal String mNotes;
        internal Decimal mQty;
        internal Int32 mCostCenterID;
        internal Decimal mPrice;
        #endregion

        #region "Methods"
        public Int32 UnitID
        {
            get { return mUnitID; }
            set { mIsChanges = true; mUnitID = value; }
        }
        public Int64 ItemID
        {
            get { return mItemID; }
            set { mIsChanges = true; mItemID = value; }
        }
        public Int64 ServiceID
        {
            get { return mServiceID; }
            set { mIsChanges = true; mServiceID = value; }
        }
        public Int32 StoreID
        {
            get { return mStoreID; }
            set { mIsChanges = true; mStoreID = value; }
        }
        public Int64 PS_PurchasingOrdersID
        {
            get { return mPS_PurchasingOrdersID; }
            set { mIsChanges = true; mPS_PurchasingOrdersID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mIsChanges = true; mQty = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Decimal Price
        {
            get { return mPrice; }
            set { mIsChanges = true; mPrice = value; }
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

    public partial class CPS_PurchasingOrdersDetails
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
        public List<CVarPS_PurchasingOrdersDetails> lstCVarPS_PurchasingOrdersDetails = new List<CVarPS_PurchasingOrdersDetails>();
        public List<CPKPS_PurchasingOrdersDetails> lstDeletedCPKPS_PurchasingOrdersDetails = new List<CPKPS_PurchasingOrdersDetails>();
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
            lstCVarPS_PurchasingOrdersDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_PurchasingOrdersDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_PurchasingOrdersDetails";
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
                        CVarPS_PurchasingOrdersDetails ObjCVarPS_PurchasingOrdersDetails = new CVarPS_PurchasingOrdersDetails();
                        ObjCVarPS_PurchasingOrdersDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        lstCVarPS_PurchasingOrdersDetails.Add(ObjCVarPS_PurchasingOrdersDetails);
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
            lstCVarPS_PurchasingOrdersDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_PurchasingOrdersDetails";
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
                        CVarPS_PurchasingOrdersDetails ObjCVarPS_PurchasingOrdersDetails = new CVarPS_PurchasingOrdersDetails();
                        ObjCVarPS_PurchasingOrdersDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPS_PurchasingOrdersDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_PurchasingOrdersDetails.Add(ObjCVarPS_PurchasingOrdersDetails);
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
                    Com.CommandText = "[dbo].DeleteListPS_PurchasingOrdersDetails";
                else
                    Com.CommandText = "[dbo].UpdateListPS_PurchasingOrdersDetails";
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
        public Exception DeleteItem(List<CPKPS_PurchasingOrdersDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_PurchasingOrdersDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKPS_PurchasingOrdersDetails ObjCPKPS_PurchasingOrdersDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKPS_PurchasingOrdersDetails.ID);
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
        public Exception SaveMethod(List<CVarPS_PurchasingOrdersDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@UnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ServiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PS_PurchasingOrdersID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_PurchasingOrdersDetails ObjCVarPS_PurchasingOrdersDetails in SaveList)
                {
                    if (ObjCVarPS_PurchasingOrdersDetails.mIsChanges == true)
                    {
                        if (ObjCVarPS_PurchasingOrdersDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_PurchasingOrdersDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_PurchasingOrdersDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_PurchasingOrdersDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_PurchasingOrdersDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_PurchasingOrdersDetails.ID;
                        }
                        Com.Parameters["@UnitID"].Value = ObjCVarPS_PurchasingOrdersDetails.UnitID;
                        Com.Parameters["@ItemID"].Value = ObjCVarPS_PurchasingOrdersDetails.ItemID;
                        Com.Parameters["@ServiceID"].Value = ObjCVarPS_PurchasingOrdersDetails.ServiceID;
                        Com.Parameters["@StoreID"].Value = ObjCVarPS_PurchasingOrdersDetails.StoreID;
                        Com.Parameters["@PS_PurchasingOrdersID"].Value = ObjCVarPS_PurchasingOrdersDetails.PS_PurchasingOrdersID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_PurchasingOrdersDetails.Notes;
                        Com.Parameters["@Qty"].Value = ObjCVarPS_PurchasingOrdersDetails.Qty;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarPS_PurchasingOrdersDetails.CostCenterID;
                        Com.Parameters["@Price"].Value = ObjCVarPS_PurchasingOrdersDetails.Price;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_PurchasingOrdersDetails.ID == 0)
                        {
                            ObjCVarPS_PurchasingOrdersDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_PurchasingOrdersDetails.mIsChanges = false;
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
