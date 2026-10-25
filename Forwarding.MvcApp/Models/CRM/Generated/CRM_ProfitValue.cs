using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CRM.CRM_ContactPersons.Generated
{
    [Serializable]
    public class CPKCRM_ProfitValue
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
    public partial class CVarCRM_ProfitValue : CPKCRM_ProfitValue
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mPaymentTermID;
        internal DateTime mStartingDate;
        internal DateTime mExpectedClosingDate;
        internal String mTradeLane;
        internal String mCompetitors;
        internal String mBusinessVol;
        internal Int32 mCurrencyID;
        internal Decimal mCost;
        internal Decimal mRevenue;
        internal DateTime mCreationDate;
        internal Int32 mCreatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mModificationUserID;
        internal Int32 mClientID;
        internal Decimal mGrossProfit;
        internal Decimal mProfitMargin;
        internal Int32 mPipeLineStageID;
        internal String mComment;
        internal Int32 mIsActualCustomer;
        internal Int32 mContainerTypeID;
        internal Int32 mPerPeriodID;
        internal Int64 mQuotationRouteID;
        internal Decimal mMarginAmount;
        internal Int32 mCostCurrencyID;
        internal Int32 mRevenueCurrencyID;
        internal Int32 mMarginAmountCurrencyID;
        internal Int32 mGrossMarginCurrencyID;
        #endregion

        #region "Methods"
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mIsChanges = true; mPaymentTermID = value; }
        }
        public DateTime StartingDate
        {
            get { return mStartingDate; }
            set { mIsChanges = true; mStartingDate = value; }
        }
        public DateTime ExpectedClosingDate
        {
            get { return mExpectedClosingDate; }
            set { mIsChanges = true; mExpectedClosingDate = value; }
        }
        public String TradeLane
        {
            get { return mTradeLane; }
            set { mIsChanges = true; mTradeLane = value; }
        }
        public String Competitors
        {
            get { return mCompetitors; }
            set { mIsChanges = true; mCompetitors = value; }
        }
        public String BusinessVol
        {
            get { return mBusinessVol; }
            set { mIsChanges = true; mBusinessVol = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Decimal Cost
        {
            get { return mCost; }
            set { mIsChanges = true; mCost = value; }
        }
        public Decimal Revenue
        {
            get { return mRevenue; }
            set { mIsChanges = true; mRevenue = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Int32 ModificationUserID
        {
            get { return mModificationUserID; }
            set { mIsChanges = true; mModificationUserID = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mIsChanges = true; mClientID = value; }
        }
        public Decimal GrossProfit
        {
            get { return mGrossProfit; }
            set { mIsChanges = true; mGrossProfit = value; }
        }
        public Decimal ProfitMargin
        {
            get { return mProfitMargin; }
            set { mIsChanges = true; mProfitMargin = value; }
        }
        public Int32 PipeLineStageID
        {
            get { return mPipeLineStageID; }
            set { mIsChanges = true; mPipeLineStageID = value; }
        }
        public String Comment
        {
            get { return mComment; }
            set { mIsChanges = true; mComment = value; }
        }
        public Int32 IsActualCustomer
        {
            get { return mIsActualCustomer; }
            set { mIsChanges = true; mIsActualCustomer = value; }
        }
        public Int32 ContainerTypeID
        {
            get { return mContainerTypeID; }
            set { mIsChanges = true; mContainerTypeID = value; }
        }
        public Int32 PerPeriodID
        {
            get { return mPerPeriodID; }
            set { mIsChanges = true; mPerPeriodID = value; }
        }
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mIsChanges = true; mQuotationRouteID = value; }
        }
        public Decimal MarginAmount
        {
            get { return mMarginAmount; }
            set { mIsChanges = true; mMarginAmount = value; }
        }
        public Int32 CostCurrencyID
        {
            get { return mCostCurrencyID; }
            set { mIsChanges = true; mCostCurrencyID = value; }
        }
        public Int32 RevenueCurrencyID
        {
            get { return mRevenueCurrencyID; }
            set { mIsChanges = true; mRevenueCurrencyID = value; }
        }
        public Int32 MarginAmountCurrencyID
        {
            get { return mMarginAmountCurrencyID; }
            set { mIsChanges = true; mMarginAmountCurrencyID = value; }
        }
        public Int32 GrossMarginCurrencyID
        {
            get { return mGrossMarginCurrencyID; }
            set { mIsChanges = true; mGrossMarginCurrencyID = value; }
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

    public partial class CCRM_ProfitValue
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
        public List<CVarCRM_ProfitValue> lstCVarCRM_ProfitValue = new List<CVarCRM_ProfitValue>();
        public List<CPKCRM_ProfitValue> lstDeletedCPKCRM_ProfitValue = new List<CPKCRM_ProfitValue>();
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
            lstCVarCRM_ProfitValue.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCRM_ProfitValue";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCRM_ProfitValue";
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
                        CVarCRM_ProfitValue ObjCVarCRM_ProfitValue = new CVarCRM_ProfitValue();
                        ObjCVarCRM_ProfitValue.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_ProfitValue.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarCRM_ProfitValue.mStartingDate = Convert.ToDateTime(dr["StartingDate"].ToString());
                        ObjCVarCRM_ProfitValue.mExpectedClosingDate = Convert.ToDateTime(dr["ExpectedClosingDate"].ToString());
                        ObjCVarCRM_ProfitValue.mTradeLane = Convert.ToString(dr["TradeLane"].ToString());
                        ObjCVarCRM_ProfitValue.mCompetitors = Convert.ToString(dr["Competitors"].ToString());
                        ObjCVarCRM_ProfitValue.mBusinessVol = Convert.ToString(dr["BusinessVol"].ToString());
                        ObjCVarCRM_ProfitValue.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCRM_ProfitValue.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarCRM_ProfitValue.mRevenue = Convert.ToDecimal(dr["Revenue"].ToString());
                        ObjCVarCRM_ProfitValue.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_ProfitValue.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_ProfitValue.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_ProfitValue.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarCRM_ProfitValue.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarCRM_ProfitValue.mGrossProfit = Convert.ToDecimal(dr["GrossProfit"].ToString());
                        ObjCVarCRM_ProfitValue.mProfitMargin = Convert.ToDecimal(dr["ProfitMargin"].ToString());
                        ObjCVarCRM_ProfitValue.mPipeLineStageID = Convert.ToInt32(dr["PipeLineStageID"].ToString());
                        ObjCVarCRM_ProfitValue.mComment = Convert.ToString(dr["Comment"].ToString());
                        ObjCVarCRM_ProfitValue.mIsActualCustomer = Convert.ToInt32(dr["IsActualCustomer"].ToString());
                        ObjCVarCRM_ProfitValue.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarCRM_ProfitValue.mPerPeriodID = Convert.ToInt32(dr["PerPeriodID"].ToString());
                        ObjCVarCRM_ProfitValue.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarCRM_ProfitValue.mMarginAmount = Convert.ToDecimal(dr["MarginAmount"].ToString());
                        ObjCVarCRM_ProfitValue.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarCRM_ProfitValue.mRevenueCurrencyID = Convert.ToInt32(dr["RevenueCurrencyID"].ToString());
                        ObjCVarCRM_ProfitValue.mMarginAmountCurrencyID = Convert.ToInt32(dr["MarginAmountCurrencyID"].ToString());
                        ObjCVarCRM_ProfitValue.mGrossMarginCurrencyID = Convert.ToInt32(dr["GrossMarginCurrencyID"].ToString());
                        lstCVarCRM_ProfitValue.Add(ObjCVarCRM_ProfitValue);
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
            lstCVarCRM_ProfitValue.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCRM_ProfitValue";
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
                        CVarCRM_ProfitValue ObjCVarCRM_ProfitValue = new CVarCRM_ProfitValue();
                        ObjCVarCRM_ProfitValue.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_ProfitValue.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarCRM_ProfitValue.mStartingDate = Convert.ToDateTime(dr["StartingDate"].ToString());
                        ObjCVarCRM_ProfitValue.mExpectedClosingDate = Convert.ToDateTime(dr["ExpectedClosingDate"].ToString());
                        ObjCVarCRM_ProfitValue.mTradeLane = Convert.ToString(dr["TradeLane"].ToString());
                        ObjCVarCRM_ProfitValue.mCompetitors = Convert.ToString(dr["Competitors"].ToString());
                        ObjCVarCRM_ProfitValue.mBusinessVol = Convert.ToString(dr["BusinessVol"].ToString());
                        ObjCVarCRM_ProfitValue.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCRM_ProfitValue.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarCRM_ProfitValue.mRevenue = Convert.ToDecimal(dr["Revenue"].ToString());
                        ObjCVarCRM_ProfitValue.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_ProfitValue.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_ProfitValue.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_ProfitValue.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarCRM_ProfitValue.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarCRM_ProfitValue.mGrossProfit = Convert.ToDecimal(dr["GrossProfit"].ToString());
                        ObjCVarCRM_ProfitValue.mProfitMargin = Convert.ToDecimal(dr["ProfitMargin"].ToString());
                        ObjCVarCRM_ProfitValue.mPipeLineStageID = Convert.ToInt32(dr["PipeLineStageID"].ToString());
                        ObjCVarCRM_ProfitValue.mComment = Convert.ToString(dr["Comment"].ToString());
                        ObjCVarCRM_ProfitValue.mIsActualCustomer = Convert.ToInt32(dr["IsActualCustomer"].ToString());
                        ObjCVarCRM_ProfitValue.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarCRM_ProfitValue.mPerPeriodID = Convert.ToInt32(dr["PerPeriodID"].ToString());
                        ObjCVarCRM_ProfitValue.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarCRM_ProfitValue.mMarginAmount = Convert.ToDecimal(dr["MarginAmount"].ToString());
                        ObjCVarCRM_ProfitValue.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarCRM_ProfitValue.mRevenueCurrencyID = Convert.ToInt32(dr["RevenueCurrencyID"].ToString());
                        ObjCVarCRM_ProfitValue.mMarginAmountCurrencyID = Convert.ToInt32(dr["MarginAmountCurrencyID"].ToString());
                        ObjCVarCRM_ProfitValue.mGrossMarginCurrencyID = Convert.ToInt32(dr["GrossMarginCurrencyID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCRM_ProfitValue.Add(ObjCVarCRM_ProfitValue);
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
                    Com.CommandText = "[dbo].DeleteListCRM_ProfitValue";
                else
                    Com.CommandText = "[dbo].UpdateListCRM_ProfitValue";
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
        public Exception DeleteItem(List<CPKCRM_ProfitValue> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCRM_ProfitValue";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCRM_ProfitValue ObjCPKCRM_ProfitValue in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCRM_ProfitValue.ID);
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
        public Exception SaveMethod(List<CVarCRM_ProfitValue> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PaymentTermID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@StartingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ExpectedClosingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TradeLane", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Competitors", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BusinessVol", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Revenue", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificationUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ClientID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GrossProfit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ProfitMargin", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PipeLineStageID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Comment", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsActualCustomer", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ContainerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PerPeriodID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@QuotationRouteID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@MarginAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RevenueCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MarginAmountCurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GrossMarginCurrencyID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCRM_ProfitValue ObjCVarCRM_ProfitValue in SaveList)
                {
                    if (ObjCVarCRM_ProfitValue.mIsChanges == true)
                    {
                        if (ObjCVarCRM_ProfitValue.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCRM_ProfitValue";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCRM_ProfitValue.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCRM_ProfitValue";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCRM_ProfitValue.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCRM_ProfitValue.ID;
                        }
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarCRM_ProfitValue.PaymentTermID;
                        Com.Parameters["@StartingDate"].Value = ObjCVarCRM_ProfitValue.StartingDate;
                        Com.Parameters["@ExpectedClosingDate"].Value = ObjCVarCRM_ProfitValue.ExpectedClosingDate;
                        Com.Parameters["@TradeLane"].Value = ObjCVarCRM_ProfitValue.TradeLane;
                        Com.Parameters["@Competitors"].Value = ObjCVarCRM_ProfitValue.Competitors;
                        Com.Parameters["@BusinessVol"].Value = ObjCVarCRM_ProfitValue.BusinessVol;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarCRM_ProfitValue.CurrencyID;
                        Com.Parameters["@Cost"].Value = ObjCVarCRM_ProfitValue.Cost;
                        Com.Parameters["@Revenue"].Value = ObjCVarCRM_ProfitValue.Revenue;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCRM_ProfitValue.CreationDate;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCRM_ProfitValue.CreatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCRM_ProfitValue.ModificationDate;
                        Com.Parameters["@ModificationUserID"].Value = ObjCVarCRM_ProfitValue.ModificationUserID;
                        Com.Parameters["@ClientID"].Value = ObjCVarCRM_ProfitValue.ClientID;
                        Com.Parameters["@GrossProfit"].Value = ObjCVarCRM_ProfitValue.GrossProfit;
                        Com.Parameters["@ProfitMargin"].Value = ObjCVarCRM_ProfitValue.ProfitMargin;
                        Com.Parameters["@PipeLineStageID"].Value = ObjCVarCRM_ProfitValue.PipeLineStageID;
                        Com.Parameters["@Comment"].Value = ObjCVarCRM_ProfitValue.Comment;
                        Com.Parameters["@IsActualCustomer"].Value = ObjCVarCRM_ProfitValue.IsActualCustomer;
                        Com.Parameters["@ContainerTypeID"].Value = ObjCVarCRM_ProfitValue.ContainerTypeID;
                        Com.Parameters["@PerPeriodID"].Value = ObjCVarCRM_ProfitValue.PerPeriodID;
                        Com.Parameters["@QuotationRouteID"].Value = ObjCVarCRM_ProfitValue.QuotationRouteID;
                        Com.Parameters["@MarginAmount"].Value = ObjCVarCRM_ProfitValue.MarginAmount;
                        Com.Parameters["@CostCurrencyID"].Value = ObjCVarCRM_ProfitValue.CostCurrencyID;
                        Com.Parameters["@RevenueCurrencyID"].Value = ObjCVarCRM_ProfitValue.RevenueCurrencyID;
                        Com.Parameters["@MarginAmountCurrencyID"].Value = ObjCVarCRM_ProfitValue.MarginAmountCurrencyID;
                        Com.Parameters["@GrossMarginCurrencyID"].Value = ObjCVarCRM_ProfitValue.GrossMarginCurrencyID;
                        EndTrans(Com, Con);
                        if (ObjCVarCRM_ProfitValue.ID == 0)
                        {
                            ObjCVarCRM_ProfitValue.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCRM_ProfitValue.mIsChanges = false;
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
