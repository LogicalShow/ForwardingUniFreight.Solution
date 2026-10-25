using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Shipping.MvcApp.Models.Purchasing.PS_Transactions.Generated
{
    [Serializable]
    public class CPKPS_InvoicesDetailsTemp
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
    public partial class CVarPS_InvoicesDetailsTemp : CPKPS_InvoicesDetailsTemp
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
        internal Decimal mTaxRatio;
        internal Int32 mTaxID;
        internal Decimal mDepartementID;
        internal Int32 mWHTRatio;
        internal Boolean mIsexempt;
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
        public Decimal TaxRatio
        {
            get { return mTaxRatio; }
            set { mIsChanges = true; mTaxRatio = value; }
        }
        public Int32 TaxID
        {
            get { return mTaxID; }
            set { mIsChanges = true; mTaxID = value; }
        }
        public Decimal DepartementID
        {
            get { return mDepartementID; }
            set { mIsChanges = true; mDepartementID = value; }
        }
        public Int32 WHTRatio
        {
            get { return mWHTRatio; }
            set { mIsChanges = true; mWHTRatio = value; }
        }
        public Boolean Isexempt
        {
            get { return mIsexempt; }
            set { mIsChanges = true; mIsexempt = value; }
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

    public partial class CPS_InvoicesDetailsTemp
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
        public List<CVarPS_InvoicesDetailsTemp> lstCVarPS_InvoicesDetailsTemp = new List<CVarPS_InvoicesDetailsTemp>();
        public List<CPKPS_InvoicesDetailsTemp> lstDeletedCPKPS_InvoicesDetailsTemp = new List<CPKPS_InvoicesDetailsTemp>();
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
            lstCVarPS_InvoicesDetailsTemp.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_InvoicesDetailsTemp";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_InvoicesDetailsTemp";
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
                        CVarPS_InvoicesDetailsTemp ObjCVarPS_InvoicesDetailsTemp = new CVarPS_InvoicesDetailsTemp();
                        ObjCVarPS_InvoicesDetailsTemp.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mRemainQuantity = Convert.ToDecimal(dr["RemainQuantity"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mTaxRatio = Convert.ToDecimal(dr["TaxRatio"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mDepartementID = Convert.ToDecimal(dr["DepartementID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mWHTRatio = Convert.ToInt32(dr["WHTRatio"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mIsexempt = Convert.ToBoolean(dr["Isexempt"].ToString());
                        lstCVarPS_InvoicesDetailsTemp.Add(ObjCVarPS_InvoicesDetailsTemp);
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
            lstCVarPS_InvoicesDetailsTemp.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_InvoicesDetailsTemp";
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
                        CVarPS_InvoicesDetailsTemp ObjCVarPS_InvoicesDetailsTemp = new CVarPS_InvoicesDetailsTemp();
                        ObjCVarPS_InvoicesDetailsTemp.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mStoreID = Convert.ToInt32(dr["StoreID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mRemainQuantity = Convert.ToDecimal(dr["RemainQuantity"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mTaxRatio = Convert.ToDecimal(dr["TaxRatio"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mDepartementID = Convert.ToDecimal(dr["DepartementID"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mWHTRatio = Convert.ToInt32(dr["WHTRatio"].ToString());
                        ObjCVarPS_InvoicesDetailsTemp.mIsexempt = Convert.ToBoolean(dr["Isexempt"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_InvoicesDetailsTemp.Add(ObjCVarPS_InvoicesDetailsTemp);
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
                    Com.CommandText = "[dbo].DeleteListPS_InvoicesDetailsTemp";
                else
                    Com.CommandText = "[dbo].UpdateListPS_InvoicesDetailsTemp";
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
        public Exception DeleteItem(List<CPKPS_InvoicesDetailsTemp> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_InvoicesDetailsTemp";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKPS_InvoicesDetailsTemp ObjCPKPS_InvoicesDetailsTemp in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKPS_InvoicesDetailsTemp.ID);
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
        public Exception SaveMethod(List<CVarPS_InvoicesDetailsTemp> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@TaxRatio", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DepartementID", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@WHTRatio", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Isexempt", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_InvoicesDetailsTemp ObjCVarPS_InvoicesDetailsTemp in SaveList)
                {
                    if (ObjCVarPS_InvoicesDetailsTemp.mIsChanges == true)
                    {
                        if (ObjCVarPS_InvoicesDetailsTemp.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_InvoicesDetailsTemp";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_InvoicesDetailsTemp.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_InvoicesDetailsTemp";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_InvoicesDetailsTemp.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_InvoicesDetailsTemp.ID;
                        }
                        Com.Parameters["@ItemID"].Value = ObjCVarPS_InvoicesDetailsTemp.ItemID;
                        Com.Parameters["@ServiceID"].Value = ObjCVarPS_InvoicesDetailsTemp.ServiceID;
                        Com.Parameters["@Price"].Value = ObjCVarPS_InvoicesDetailsTemp.Price;
                        Com.Parameters["@Discount"].Value = ObjCVarPS_InvoicesDetailsTemp.Discount;
                        Com.Parameters["@TotalPrice"].Value = ObjCVarPS_InvoicesDetailsTemp.TotalPrice;
                        Com.Parameters["@StoreID"].Value = ObjCVarPS_InvoicesDetailsTemp.StoreID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarPS_InvoicesDetailsTemp.InvoiceID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_InvoicesDetailsTemp.Notes;
                        Com.Parameters["@Qty"].Value = ObjCVarPS_InvoicesDetailsTemp.Qty;
                        Com.Parameters["@UnitPrice"].Value = ObjCVarPS_InvoicesDetailsTemp.UnitPrice;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarPS_InvoicesDetailsTemp.CostCenterID;
                        Com.Parameters["@RemainQuantity"].Value = ObjCVarPS_InvoicesDetailsTemp.RemainQuantity;
                        Com.Parameters["@TaxRatio"].Value = ObjCVarPS_InvoicesDetailsTemp.TaxRatio;
                        Com.Parameters["@TaxID"].Value = ObjCVarPS_InvoicesDetailsTemp.TaxID;
                        Com.Parameters["@DepartementID"].Value = ObjCVarPS_InvoicesDetailsTemp.DepartementID;
                        Com.Parameters["@WHTRatio"].Value = ObjCVarPS_InvoicesDetailsTemp.WHTRatio;
                        Com.Parameters["@Isexempt"].Value = ObjCVarPS_InvoicesDetailsTemp.Isexempt;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_InvoicesDetailsTemp.ID == 0)
                        {
                            ObjCVarPS_InvoicesDetailsTemp.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_InvoicesDetailsTemp.mIsChanges = false;
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
