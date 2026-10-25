using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKOperatorTankCharge
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
    public partial class CVarOperatorTankCharge : CPKOperatorTankCharge
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCustomerID;
        internal Int32 mAgentID;
        internal Int32 mChargeTypeID;
        internal Decimal mCostPrice;
        internal Int32 mCostCurrencyID;
        internal Decimal mSalePrice;
        internal Int32 mSaleCurrencyID;
        internal Boolean mIsImport;
        internal Boolean mIsExport;
        internal Boolean mIsDomestic;
        internal Boolean mIsCrossBooking;
        internal Boolean mIsReExport;
        internal String mNotes;
        internal Int32 mModificatorUserID;
        internal Boolean mIsLoaded;
        #endregion

        #region "Methods"
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mIsChanges = true; mAgentID = value; }
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
        public Boolean IsImport
        {
            get { return mIsImport; }
            set { mIsChanges = true; mIsImport = value; }
        }
        public Boolean IsExport
        {
            get { return mIsExport; }
            set { mIsChanges = true; mIsExport = value; }
        }
        public Boolean IsDomestic
        {
            get { return mIsDomestic; }
            set { mIsChanges = true; mIsDomestic = value; }
        }
        public Boolean IsCrossBooking
        {
            get { return mIsCrossBooking; }
            set { mIsChanges = true; mIsCrossBooking = value; }
        }
        public Boolean IsReExport
        {
            get { return mIsReExport; }
            set { mIsChanges = true; mIsReExport = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public Boolean IsLoaded
        {
            get { return mIsLoaded; }
            set { mIsChanges = true; mIsLoaded = value; }
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

    public partial class COperatorTankCharge
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
        public List<CVarOperatorTankCharge> lstCVarOperatorTankCharge = new List<CVarOperatorTankCharge>();
        public List<CPKOperatorTankCharge> lstDeletedCPKOperatorTankCharge = new List<CPKOperatorTankCharge>();
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
            lstCVarOperatorTankCharge.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListOperatorTankCharge";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemOperatorTankCharge";
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
                        CVarOperatorTankCharge ObjCVarOperatorTankCharge = new CVarOperatorTankCharge();
                        ObjCVarOperatorTankCharge.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarOperatorTankCharge.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarOperatorTankCharge.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarOperatorTankCharge.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarOperatorTankCharge.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarOperatorTankCharge.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarOperatorTankCharge.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarOperatorTankCharge.mSaleCurrencyID = Convert.ToInt32(dr["SaleCurrencyID"].ToString());
                        ObjCVarOperatorTankCharge.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarOperatorTankCharge.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarOperatorTankCharge.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarOperatorTankCharge.mIsCrossBooking = Convert.ToBoolean(dr["IsCrossBooking"].ToString());
                        ObjCVarOperatorTankCharge.mIsReExport = Convert.ToBoolean(dr["IsReExport"].ToString());
                        ObjCVarOperatorTankCharge.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarOperatorTankCharge.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperatorTankCharge.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        lstCVarOperatorTankCharge.Add(ObjCVarOperatorTankCharge);
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
            lstCVarOperatorTankCharge.Clear();

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
                Com.CommandText = "[dbo].GetListPagingOperatorTankCharge";
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
                        CVarOperatorTankCharge ObjCVarOperatorTankCharge = new CVarOperatorTankCharge();
                        ObjCVarOperatorTankCharge.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarOperatorTankCharge.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarOperatorTankCharge.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarOperatorTankCharge.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarOperatorTankCharge.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarOperatorTankCharge.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarOperatorTankCharge.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarOperatorTankCharge.mSaleCurrencyID = Convert.ToInt32(dr["SaleCurrencyID"].ToString());
                        ObjCVarOperatorTankCharge.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarOperatorTankCharge.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarOperatorTankCharge.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarOperatorTankCharge.mIsCrossBooking = Convert.ToBoolean(dr["IsCrossBooking"].ToString());
                        ObjCVarOperatorTankCharge.mIsReExport = Convert.ToBoolean(dr["IsReExport"].ToString());
                        ObjCVarOperatorTankCharge.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarOperatorTankCharge.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperatorTankCharge.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarOperatorTankCharge.Add(ObjCVarOperatorTankCharge);
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
                    Com.CommandText = "[dbo].DeleteListOperatorTankCharge";
                else
                    Com.CommandText = "[dbo].UpdateListOperatorTankCharge";
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
        public Exception DeleteItem(List<CPKOperatorTankCharge> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemOperatorTankCharge";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKOperatorTankCharge ObjCPKOperatorTankCharge in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKOperatorTankCharge.ID);
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
        public Exception SaveMethod(List<CVarOperatorTankCharge> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AgentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SalePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SaleCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsImport", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsExport", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDomestic", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsCrossBooking", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsReExport", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsLoaded", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarOperatorTankCharge ObjCVarOperatorTankCharge in SaveList)
                {
                    if (ObjCVarOperatorTankCharge.mIsChanges == true)
                    {
                        if (ObjCVarOperatorTankCharge.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemOperatorTankCharge";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarOperatorTankCharge.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemOperatorTankCharge";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarOperatorTankCharge.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarOperatorTankCharge.ID;
                        }
                        Com.Parameters["@CustomerID"].Value = ObjCVarOperatorTankCharge.CustomerID;
                        Com.Parameters["@AgentID"].Value = ObjCVarOperatorTankCharge.AgentID;
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarOperatorTankCharge.ChargeTypeID;
                        Com.Parameters["@CostPrice"].Value = ObjCVarOperatorTankCharge.CostPrice;
                        Com.Parameters["@CostCurrencyID"].Value = ObjCVarOperatorTankCharge.CostCurrencyID;
                        Com.Parameters["@SalePrice"].Value = ObjCVarOperatorTankCharge.SalePrice;
                        Com.Parameters["@SaleCurrencyID"].Value = ObjCVarOperatorTankCharge.SaleCurrencyID;
                        Com.Parameters["@IsImport"].Value = ObjCVarOperatorTankCharge.IsImport;
                        Com.Parameters["@IsExport"].Value = ObjCVarOperatorTankCharge.IsExport;
                        Com.Parameters["@IsDomestic"].Value = ObjCVarOperatorTankCharge.IsDomestic;
                        Com.Parameters["@IsCrossBooking"].Value = ObjCVarOperatorTankCharge.IsCrossBooking;
                        Com.Parameters["@IsReExport"].Value = ObjCVarOperatorTankCharge.IsReExport;
                        Com.Parameters["@Notes"].Value = ObjCVarOperatorTankCharge.Notes;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarOperatorTankCharge.ModificatorUserID;
                        Com.Parameters["@IsLoaded"].Value = ObjCVarOperatorTankCharge.IsLoaded;
                        EndTrans(Com, Con);
                        if (ObjCVarOperatorTankCharge.ID == 0)
                        {
                            ObjCVarOperatorTankCharge.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarOperatorTankCharge.mIsChanges = false;
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
