using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PricingModule.PricingTab
{
    [Serializable]
    public class CPKPricingCharge
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
    public partial class CVarPricingCharge : CPKPricingCharge
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPricingID;
        internal Int32 mChargeTypeID;
        internal Decimal mCostPrice;
        internal Int32 mCostCurrencyID;
        internal Decimal mCostExchangeRate;
        internal Decimal mSalePrice;
        internal Int32 mSaleCurrencyID;
        internal Decimal mSaleExchangeRate;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int64 PricingID
        {
            get { return mPricingID; }
            set { mIsChanges = true; mPricingID = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mIsChanges = true; mChargeTypeID = value; }
        }
        public Decimal CostPrice
        {
            get { return mCostPrice; }
            set { mIsChanges = true; mCostPrice = value; }
        }
        public Int32 CostCurrencyID
        {
            get { return mCostCurrencyID; }
            set { mIsChanges = true; mCostCurrencyID = value; }
        }
        public Decimal CostExchangeRate
        {
            get { return mCostExchangeRate; }
            set { mIsChanges = true; mCostExchangeRate = value; }
        }
        public Decimal SalePrice
        {
            get { return mSalePrice; }
            set { mIsChanges = true; mSalePrice = value; }
        }
        public Int32 SaleCurrencyID
        {
            get { return mSaleCurrencyID; }
            set { mIsChanges = true; mSaleCurrencyID = value; }
        }
        public Decimal SaleExchangeRate
        {
            get { return mSaleExchangeRate; }
            set { mIsChanges = true; mSaleExchangeRate = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
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

    public partial class CPricingCharge
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
        public List<CVarPricingCharge> lstCVarPricingCharge = new List<CVarPricingCharge>();
        public List<CPKPricingCharge> lstDeletedCPKPricingCharge = new List<CPKPricingCharge>();
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
            lstCVarPricingCharge.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPricingCharge";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPricingCharge";
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
                        CVarPricingCharge ObjCVarPricingCharge = new CVarPricingCharge();
                        ObjCVarPricingCharge.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPricingCharge.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarPricingCharge.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarPricingCharge.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarPricingCharge.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarPricingCharge.mCostExchangeRate = Convert.ToDecimal(dr["CostExchangeRate"].ToString());
                        ObjCVarPricingCharge.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarPricingCharge.mSaleCurrencyID = Convert.ToInt32(dr["SaleCurrencyID"].ToString());
                        ObjCVarPricingCharge.mSaleExchangeRate = Convert.ToDecimal(dr["SaleExchangeRate"].ToString());
                        ObjCVarPricingCharge.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPricingCharge.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPricingCharge.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPricingCharge.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarPricingCharge.Add(ObjCVarPricingCharge);
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
            lstCVarPricingCharge.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPricingCharge";
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
                        CVarPricingCharge ObjCVarPricingCharge = new CVarPricingCharge();
                        ObjCVarPricingCharge.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPricingCharge.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarPricingCharge.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarPricingCharge.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarPricingCharge.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarPricingCharge.mCostExchangeRate = Convert.ToDecimal(dr["CostExchangeRate"].ToString());
                        ObjCVarPricingCharge.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarPricingCharge.mSaleCurrencyID = Convert.ToInt32(dr["SaleCurrencyID"].ToString());
                        ObjCVarPricingCharge.mSaleExchangeRate = Convert.ToDecimal(dr["SaleExchangeRate"].ToString());
                        ObjCVarPricingCharge.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPricingCharge.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPricingCharge.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPricingCharge.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPricingCharge.Add(ObjCVarPricingCharge);
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
                    Com.CommandText = "[dbo].DeleteListPricingCharge";
                else
                    Com.CommandText = "[dbo].UpdateListPricingCharge";
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
        public Exception DeleteItem(List<CPKPricingCharge> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPricingCharge";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPricingCharge ObjCPKPricingCharge in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPricingCharge.ID);
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
        public Exception SaveMethod(List<CVarPricingCharge> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PricingID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SalePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SaleCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SaleExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPricingCharge ObjCVarPricingCharge in SaveList)
                {
                    if (ObjCVarPricingCharge.mIsChanges == true)
                    {
                        if (ObjCVarPricingCharge.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPricingCharge";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPricingCharge.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPricingCharge";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPricingCharge.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPricingCharge.ID;
                        }
                        Com.Parameters["@PricingID"].Value = ObjCVarPricingCharge.PricingID;
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarPricingCharge.ChargeTypeID;
                        Com.Parameters["@CostPrice"].Value = ObjCVarPricingCharge.CostPrice;
                        Com.Parameters["@CostCurrencyID"].Value = ObjCVarPricingCharge.CostCurrencyID;
                        Com.Parameters["@CostExchangeRate"].Value = ObjCVarPricingCharge.CostExchangeRate;
                        Com.Parameters["@SalePrice"].Value = ObjCVarPricingCharge.SalePrice;
                        Com.Parameters["@SaleCurrencyID"].Value = ObjCVarPricingCharge.SaleCurrencyID;
                        Com.Parameters["@SaleExchangeRate"].Value = ObjCVarPricingCharge.SaleExchangeRate;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarPricingCharge.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarPricingCharge.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarPricingCharge.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarPricingCharge.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarPricingCharge.ID == 0)
                        {
                            ObjCVarPricingCharge.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPricingCharge.mIsChanges = false;
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
