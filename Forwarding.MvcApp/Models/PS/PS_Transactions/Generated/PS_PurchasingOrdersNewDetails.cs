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
    public class CPKPS_PurchasingOrdersNewDetails
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
    public partial class CVarPS_PurchasingOrdersNewDetails : CPKPS_PurchasingOrdersNewDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mItemID;
        internal Int32 mStoreID;
        internal Int64 mRequestID;
        internal String mNotes;
        internal Decimal mQty;
        internal Decimal mUnitPrice;
        internal Int32 mUnitID;
        internal Boolean mIsPurshase;
        #endregion

        #region "Methods"
        public Int64 ItemID
        {
            get { return mItemID; }
            set { mIsChanges = true; mItemID = value; }
        }
        public Int32 StoreID
        {
            get { return mStoreID; }
            set { mIsChanges = true; mStoreID = value; }
        }
        public Int64 RequestID
        {
            get { return mRequestID; }
            set { mIsChanges = true; mRequestID = value; }
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
        public Decimal UnitPrice
        {
            get { return mUnitPrice; }
            set { mIsChanges = true; mUnitPrice = value; }
        }
        public Int32 UnitID
        {
            get { return mUnitID; }
            set { mIsChanges = true; mUnitID = value; }
        }
        public Boolean IsPurshase
        {
            get { return mIsPurshase; }
            set { mIsChanges = true; mIsPurshase = value; }
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

    public partial class CPS_PurchasingOrdersNewDetails
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
        public List<CVarPS_PurchasingOrdersNewDetails> lstCVarPS_PurchasingOrdersNewDetails = new List<CVarPS_PurchasingOrdersNewDetails>();
        public List<CPKPS_PurchasingOrdersNewDetails> lstDeletedCPKPS_PurchasingOrdersNewDetails = new List<CPKPS_PurchasingOrdersNewDetails>();
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
            lstCVarPS_PurchasingOrdersNewDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_PurchasingOrdersNewDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_PurchasingOrdersNewDetails";
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
                        CVarPS_PurchasingOrdersNewDetails ObjCVarPS_PurchasingOrdersNewDetails = new CVarPS_PurchasingOrdersNewDetails();
                        ObjCVarPS_PurchasingOrdersNewDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mRequestID = Convert.ToInt64(dr["RequestID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mIsPurshase = Convert.ToBoolean(dr["IsPurshase"].ToString());
                        lstCVarPS_PurchasingOrdersNewDetails.Add(ObjCVarPS_PurchasingOrdersNewDetails);
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
            lstCVarPS_PurchasingOrdersNewDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_PurchasingOrdersNewDetails";
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
                        CVarPS_PurchasingOrdersNewDetails ObjCVarPS_PurchasingOrdersNewDetails = new CVarPS_PurchasingOrdersNewDetails();
                        ObjCVarPS_PurchasingOrdersNewDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mRequestID = Convert.ToInt64(dr["RequestID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarPS_PurchasingOrdersNewDetails.mIsPurshase = Convert.ToBoolean(dr["IsPurshase"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_PurchasingOrdersNewDetails.Add(ObjCVarPS_PurchasingOrdersNewDetails);
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
                    Com.CommandText = "[dbo].DeleteListPS_PurchasingOrdersNewDetails";
                else
                    Com.CommandText = "[dbo].UpdateListPS_PurchasingOrdersNewDetails";
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
        public Exception DeleteItem(List<CPKPS_PurchasingOrdersNewDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_PurchasingOrdersNewDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKPS_PurchasingOrdersNewDetails ObjCPKPS_PurchasingOrdersNewDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKPS_PurchasingOrdersNewDetails.ID);
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
        public Exception SaveMethod(List<CVarPS_PurchasingOrdersNewDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RequestID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UnitPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsPurshase", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_PurchasingOrdersNewDetails ObjCVarPS_PurchasingOrdersNewDetails in SaveList)
                {
                    if (ObjCVarPS_PurchasingOrdersNewDetails.mIsChanges == true)
                    {
                        if (ObjCVarPS_PurchasingOrdersNewDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_PurchasingOrdersNewDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_PurchasingOrdersNewDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_PurchasingOrdersNewDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_PurchasingOrdersNewDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_PurchasingOrdersNewDetails.ID;
                        }
                        Com.Parameters["@ItemID"].Value = ObjCVarPS_PurchasingOrdersNewDetails.ItemID;
                        Com.Parameters["@StoreID"].Value = ObjCVarPS_PurchasingOrdersNewDetails.StoreID;
                        Com.Parameters["@RequestID"].Value = ObjCVarPS_PurchasingOrdersNewDetails.RequestID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_PurchasingOrdersNewDetails.Notes;
                        Com.Parameters["@Qty"].Value = ObjCVarPS_PurchasingOrdersNewDetails.Qty;
                        Com.Parameters["@UnitPrice"].Value = ObjCVarPS_PurchasingOrdersNewDetails.UnitPrice;
                        Com.Parameters["@UnitID"].Value = ObjCVarPS_PurchasingOrdersNewDetails.UnitID;
                        Com.Parameters["@IsPurshase"].Value = ObjCVarPS_PurchasingOrdersNewDetails.IsPurshase;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_PurchasingOrdersNewDetails.ID == 0)
                        {
                            ObjCVarPS_PurchasingOrdersNewDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_PurchasingOrdersNewDetails.mIsChanges = false;
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
