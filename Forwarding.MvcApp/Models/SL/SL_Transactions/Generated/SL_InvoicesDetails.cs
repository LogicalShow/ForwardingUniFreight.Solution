using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SL.SL_Transactions.Generated
{
    [Serializable]
    public class CPKSL_InvoicesDetails
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
    public partial class CVarSL_InvoicesDetails : CPKSL_InvoicesDetails
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
        internal Decimal mAveragePrice;
        internal String mPrinted_ItemName;
        internal Decimal mPrinted_Price;
        internal Decimal mPrinted_Qty;
        internal String mPrinted_Unit;
        internal Int64 mBarCode;
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
        public Decimal AveragePrice
        {
            get { return mAveragePrice; }
            set { mIsChanges = true; mAveragePrice = value; }
        }
        public String Printed_ItemName
        {
            get { return mPrinted_ItemName; }
            set { mIsChanges = true; mPrinted_ItemName = value; }
        }
        public Decimal Printed_Price
        {
            get { return mPrinted_Price; }
            set { mIsChanges = true; mPrinted_Price = value; }
        }
        public Decimal Printed_Qty
        {
            get { return mPrinted_Qty; }
            set { mIsChanges = true; mPrinted_Qty = value; }
        }
        public String Printed_Unit
        {
            get { return mPrinted_Unit; }
            set { mIsChanges = true; mPrinted_Unit = value; }
        }
        public Int64 BarCode
        {
            get { return mBarCode; }
            set { mIsChanges = true; mBarCode = value; }
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

    public partial class CSL_InvoicesDetails
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
        public List<CVarSL_InvoicesDetails> lstCVarSL_InvoicesDetails = new List<CVarSL_InvoicesDetails>();
        public List<CPKSL_InvoicesDetails> lstDeletedCPKSL_InvoicesDetails = new List<CPKSL_InvoicesDetails>();
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
            lstCVarSL_InvoicesDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_InvoicesDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_InvoicesDetails";
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
                        CVarSL_InvoicesDetails ObjCVarSL_InvoicesDetails = new CVarSL_InvoicesDetails();
                        ObjCVarSL_InvoicesDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_InvoicesDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarSL_InvoicesDetails.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarSL_InvoicesDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarSL_InvoicesDetails.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarSL_InvoicesDetails.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarSL_InvoicesDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarSL_InvoicesDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSL_InvoicesDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarSL_InvoicesDetails.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarSL_InvoicesDetails.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSL_InvoicesDetails.mRemainQuantity = Convert.ToDecimal(dr["RemainQuantity"].ToString());
                        ObjCVarSL_InvoicesDetails.mItemQty = Convert.ToDecimal(dr["ItemQty"].ToString());
                        ObjCVarSL_InvoicesDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarSL_InvoicesDetails.mUnitFactor = Convert.ToDecimal(dr["UnitFactor"].ToString());
                        ObjCVarSL_InvoicesDetails.mPartnerRemainedQty = Convert.ToDecimal(dr["PartnerRemainedQty"].ToString());
                        ObjCVarSL_InvoicesDetails.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrinted_ItemName = Convert.ToString(dr["Printed_ItemName"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrinted_Price = Convert.ToDecimal(dr["Printed_Price"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrinted_Qty = Convert.ToDecimal(dr["Printed_Qty"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrinted_Unit = Convert.ToString(dr["Printed_Unit"].ToString());
                        ObjCVarSL_InvoicesDetails.mBarCode = Convert.ToInt64(dr["BarCode"].ToString());
                        lstCVarSL_InvoicesDetails.Add(ObjCVarSL_InvoicesDetails);
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
            lstCVarSL_InvoicesDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_InvoicesDetails";
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
                        CVarSL_InvoicesDetails ObjCVarSL_InvoicesDetails = new CVarSL_InvoicesDetails();
                        ObjCVarSL_InvoicesDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_InvoicesDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarSL_InvoicesDetails.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarSL_InvoicesDetails.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarSL_InvoicesDetails.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarSL_InvoicesDetails.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarSL_InvoicesDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarSL_InvoicesDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSL_InvoicesDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarSL_InvoicesDetails.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarSL_InvoicesDetails.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSL_InvoicesDetails.mRemainQuantity = Convert.ToDecimal(dr["RemainQuantity"].ToString());
                        ObjCVarSL_InvoicesDetails.mItemQty = Convert.ToDecimal(dr["ItemQty"].ToString());
                        ObjCVarSL_InvoicesDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarSL_InvoicesDetails.mUnitFactor = Convert.ToDecimal(dr["UnitFactor"].ToString());
                        ObjCVarSL_InvoicesDetails.mPartnerRemainedQty = Convert.ToDecimal(dr["PartnerRemainedQty"].ToString());
                        ObjCVarSL_InvoicesDetails.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrinted_ItemName = Convert.ToString(dr["Printed_ItemName"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrinted_Price = Convert.ToDecimal(dr["Printed_Price"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrinted_Qty = Convert.ToDecimal(dr["Printed_Qty"].ToString());
                        ObjCVarSL_InvoicesDetails.mPrinted_Unit = Convert.ToString(dr["Printed_Unit"].ToString());
                        ObjCVarSL_InvoicesDetails.mBarCode = Convert.ToInt64(dr["BarCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_InvoicesDetails.Add(ObjCVarSL_InvoicesDetails);
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
                    Com.CommandText = "[dbo].DeleteListSL_InvoicesDetails";
                else
                    Com.CommandText = "[dbo].UpdateListSL_InvoicesDetails";
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
        public Exception DeleteItem(List<CPKSL_InvoicesDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_InvoicesDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSL_InvoicesDetails ObjCPKSL_InvoicesDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSL_InvoicesDetails.ID);
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
        public Exception SaveMethod(List<CVarSL_InvoicesDetails> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@AveragePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Printed_ItemName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Printed_Price", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Printed_Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Printed_Unit", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BarCode", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_InvoicesDetails ObjCVarSL_InvoicesDetails in SaveList)
                {
                    if (ObjCVarSL_InvoicesDetails.mIsChanges == true)
                    {
                        if (ObjCVarSL_InvoicesDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_InvoicesDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_InvoicesDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_InvoicesDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_InvoicesDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_InvoicesDetails.ID;
                        }
                        Com.Parameters["@ItemID"].Value = ObjCVarSL_InvoicesDetails.ItemID;
                        Com.Parameters["@ServiceID"].Value = ObjCVarSL_InvoicesDetails.ServiceID;
                        Com.Parameters["@Price"].Value = ObjCVarSL_InvoicesDetails.Price;
                        Com.Parameters["@Discount"].Value = ObjCVarSL_InvoicesDetails.Discount;
                        Com.Parameters["@TotalPrice"].Value = ObjCVarSL_InvoicesDetails.TotalPrice;
                        Com.Parameters["@StoreID"].Value = ObjCVarSL_InvoicesDetails.StoreID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarSL_InvoicesDetails.InvoiceID;
                        Com.Parameters["@Notes"].Value = ObjCVarSL_InvoicesDetails.Notes;
                        Com.Parameters["@Qty"].Value = ObjCVarSL_InvoicesDetails.Qty;
                        Com.Parameters["@UnitPrice"].Value = ObjCVarSL_InvoicesDetails.UnitPrice;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarSL_InvoicesDetails.CostCenterID;
                        Com.Parameters["@RemainQuantity"].Value = ObjCVarSL_InvoicesDetails.RemainQuantity;
                        Com.Parameters["@ItemQty"].Value = ObjCVarSL_InvoicesDetails.ItemQty;
                        Com.Parameters["@UnitID"].Value = ObjCVarSL_InvoicesDetails.UnitID;
                        Com.Parameters["@UnitFactor"].Value = ObjCVarSL_InvoicesDetails.UnitFactor;
                        Com.Parameters["@PartnerRemainedQty"].Value = ObjCVarSL_InvoicesDetails.PartnerRemainedQty;
                        Com.Parameters["@AveragePrice"].Value = ObjCVarSL_InvoicesDetails.AveragePrice;
                        Com.Parameters["@Printed_ItemName"].Value = ObjCVarSL_InvoicesDetails.Printed_ItemName;
                        Com.Parameters["@Printed_Price"].Value = ObjCVarSL_InvoicesDetails.Printed_Price;
                        Com.Parameters["@Printed_Qty"].Value = ObjCVarSL_InvoicesDetails.Printed_Qty;
                        Com.Parameters["@Printed_Unit"].Value = ObjCVarSL_InvoicesDetails.Printed_Unit;
                        Com.Parameters["@BarCode"].Value = ObjCVarSL_InvoicesDetails.BarCode;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_InvoicesDetails.ID == 0)
                        {
                            ObjCVarSL_InvoicesDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_InvoicesDetails.mIsChanges = false;
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
