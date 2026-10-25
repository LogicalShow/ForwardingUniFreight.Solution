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
    public class CPKPS_InvoicesDetailsTAX
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
    public partial class CVarPS_InvoicesDetailsTAX : CPKPS_InvoicesDetailsTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mItemID;
        internal Int64 mServiceID;
        internal Decimal mPrice;
        internal Decimal mDiscount;
        internal Decimal mTotalPrice;
        internal Int32 mStoreID;
        internal Int64 mInvoiceID;
        internal String mNotes;
        internal Decimal mQty;
        internal Decimal mUnitPrice;
        internal Int32 mCostCenterID;
        internal Decimal mRemainQuantity;
        internal Decimal mItemQty;
        internal Int32 mUnitID;
        internal Decimal mUnitFactor;
        internal Decimal mPartnerRemainedQty;
        #endregion

        #region "Methods"
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
        public Decimal Price
        {
            get { return mPrice; }
            set { mIsChanges = true; mPrice = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mIsChanges = true; mDiscount = value; }
        }
        public Decimal TotalPrice
        {
            get { return mTotalPrice; }
            set { mIsChanges = true; mTotalPrice = value; }
        }
        public Int32 StoreID
        {
            get { return mStoreID; }
            set { mIsChanges = true; mStoreID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
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
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Decimal RemainQuantity
        {
            get { return mRemainQuantity; }
            set { mIsChanges = true; mRemainQuantity = value; }
        }
        public Decimal ItemQty
        {
            get { return mItemQty; }
            set { mIsChanges = true; mItemQty = value; }
        }
        public Int32 UnitID
        {
            get { return mUnitID; }
            set { mIsChanges = true; mUnitID = value; }
        }
        public Decimal UnitFactor
        {
            get { return mUnitFactor; }
            set { mIsChanges = true; mUnitFactor = value; }
        }
        public Decimal PartnerRemainedQty
        {
            get { return mPartnerRemainedQty; }
            set { mIsChanges = true; mPartnerRemainedQty = value; }
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

    public partial class CPS_InvoicesDetailsTax
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
        public List<CVarPS_InvoicesDetailsTAX> lstCVarPS_InvoicesDetailsTAX = new List<CVarPS_InvoicesDetailsTAX>();
        public List<CPKPS_InvoicesDetailsTAX> lstDeletedCPKPS_InvoicesDetailsTAX = new List<CPKPS_InvoicesDetailsTAX>();
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
            lstCVarPS_InvoicesDetailsTAX.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_InvoicesDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_InvoicesDetails";
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
                        CVarPS_InvoicesDetailsTAX ObjCVarPS_InvoicesDetailsTAX = new CVarPS_InvoicesDetailsTAX();
                        ObjCVarPS_InvoicesDetailsTAX.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mRemainQuantity = Convert.ToDecimal(dr["RemainQuantity"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mItemQty = Convert.ToDecimal(dr["ItemQty"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mUnitFactor = Convert.ToDecimal(dr["UnitFactor"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mPartnerRemainedQty = Convert.ToDecimal(dr["PartnerRemainedQty"].ToString());
                        lstCVarPS_InvoicesDetailsTAX.Add(ObjCVarPS_InvoicesDetailsTAX);
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
            lstCVarPS_InvoicesDetailsTAX.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_InvoicesDetails";
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
                        CVarPS_InvoicesDetailsTAX ObjCVarPS_InvoicesDetailsTAX = new CVarPS_InvoicesDetailsTAX();
                        ObjCVarPS_InvoicesDetailsTAX.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mRemainQuantity = Convert.ToDecimal(dr["RemainQuantity"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mItemQty = Convert.ToDecimal(dr["ItemQty"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mUnitFactor = Convert.ToDecimal(dr["UnitFactor"].ToString());
                        ObjCVarPS_InvoicesDetailsTAX.mPartnerRemainedQty = Convert.ToDecimal(dr["PartnerRemainedQty"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_InvoicesDetailsTAX.Add(ObjCVarPS_InvoicesDetailsTAX);
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
                    Com.CommandText = "[dbo].DeleteListPS_InvoicesDetailsTax";
                else
                    Com.CommandText = "[dbo].UpdateListPS_InvoicesDetailsTax";
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
        public Exception DeleteItem(List<CPKPS_InvoicesDetailsTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_InvoicesDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKPS_InvoicesDetailsTAX ObjCPKPS_InvoicesDetailsTAX in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKPS_InvoicesDetailsTAX.ID);
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
        public Exception SaveMethod(List<CVarPS_InvoicesDetailsTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ServiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Discount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TotalPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UnitPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RemainQuantity", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ItemQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UnitFactor", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PartnerRemainedQty", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_InvoicesDetailsTAX ObjCVarPS_InvoicesDetailsTAX in SaveList)
                {
                    if (ObjCVarPS_InvoicesDetailsTAX.mIsChanges == true)
                    {
                        if (ObjCVarPS_InvoicesDetailsTAX.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_InvoicesDetailsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_InvoicesDetailsTAX.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_InvoicesDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_InvoicesDetailsTAX.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_InvoicesDetailsTAX.ID;
                        }
                        Com.Parameters["@ItemID"].Value = ObjCVarPS_InvoicesDetailsTAX.ItemID;
                        Com.Parameters["@ServiceID"].Value = ObjCVarPS_InvoicesDetailsTAX.ServiceID;
                        Com.Parameters["@Price"].Value = ObjCVarPS_InvoicesDetailsTAX.Price;
                        Com.Parameters["@Discount"].Value = ObjCVarPS_InvoicesDetailsTAX.Discount;
                        Com.Parameters["@TotalPrice"].Value = ObjCVarPS_InvoicesDetailsTAX.TotalPrice;
                        Com.Parameters["@StoreID"].Value = ObjCVarPS_InvoicesDetailsTAX.StoreID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarPS_InvoicesDetailsTAX.InvoiceID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_InvoicesDetailsTAX.Notes;
                        Com.Parameters["@Qty"].Value = ObjCVarPS_InvoicesDetailsTAX.Qty;
                        Com.Parameters["@UnitPrice"].Value = ObjCVarPS_InvoicesDetailsTAX.UnitPrice;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarPS_InvoicesDetailsTAX.CostCenterID;
                        Com.Parameters["@RemainQuantity"].Value = ObjCVarPS_InvoicesDetailsTAX.RemainQuantity;
                        Com.Parameters["@ItemQty"].Value = ObjCVarPS_InvoicesDetailsTAX.ItemQty;
                        Com.Parameters["@UnitID"].Value = ObjCVarPS_InvoicesDetailsTAX.UnitID;
                        Com.Parameters["@UnitFactor"].Value = ObjCVarPS_InvoicesDetailsTAX.UnitFactor;
                        Com.Parameters["@PartnerRemainedQty"].Value = ObjCVarPS_InvoicesDetailsTAX.PartnerRemainedQty;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_InvoicesDetailsTAX.ID == 0)
                        {
                            ObjCVarPS_InvoicesDetailsTAX.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_InvoicesDetailsTAX.mIsChanges = false;
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
