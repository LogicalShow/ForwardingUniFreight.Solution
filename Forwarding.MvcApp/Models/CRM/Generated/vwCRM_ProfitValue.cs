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
    public class CPKvwCRM_ProfitValue
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
    public partial class CVarvwCRM_ProfitValue : CPKvwCRM_ProfitValue
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mPaymentTermID;
        internal String mPaymentTermName;
        internal DateTime mStartingDate;
        internal DateTime mExpectedClosingDate;
        internal String mTradeLane;
        internal String mCompetitors;
        internal String mBusinessVol;
        internal Int32 mCurrencyID;
        internal String mCurrencyName;
        internal Decimal mCost;
        internal Decimal mRevenue;
        internal Int32 mClientID;
        internal String mClientName;
        internal Decimal mGrossProfit;
        internal Int32 mContainerTypeID;
        internal Int32 mPerPeriodID;
        internal Decimal mProfitMargin;
        internal DateTime mCreationDate;
        internal Int32 mCreatorUserID;
        internal String mCreatorUserName;
        internal Int32 mModificationUserID;
        internal String mModificationUserName;
        internal Int32 mPipeLineStageID;
        internal String mPipeLineStageName;
        internal String mComment;
        internal Int32 mSalesmanID;
        internal Int32 mIsActualCustomer;
        internal Int64 mQuotationRouteID;
        internal String mQuotationRouteCode;
        internal Decimal mMarginAmount;
        internal Int32 mBusinessVolCurrencyID;
        internal String mBusinessVolCurrencyCode;
        internal Int32 mCostCurrencyID;
        internal String mCostCurrencyCode;
        internal Int32 mRevenueCurrencyID;
        internal String mRenveueCurrencyCode;
        internal Int32 mMarginAmountCurrencyID;
        internal String mMarginAmountCurrencyCode;
        internal Int32 mGrossMarginCurrencyID;
        internal String mGrossMarginCurrencyCode;
        #endregion

        #region "Methods"
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mPaymentTermID = value; }
        }
        public String PaymentTermName
        {
            get { return mPaymentTermName; }
            set { mPaymentTermName = value; }
        }
        public DateTime StartingDate
        {
            get { return mStartingDate; }
            set { mStartingDate = value; }
        }
        public DateTime ExpectedClosingDate
        {
            get { return mExpectedClosingDate; }
            set { mExpectedClosingDate = value; }
        }
        public String TradeLane
        {
            get { return mTradeLane; }
            set { mTradeLane = value; }
        }
        public String Competitors
        {
            get { return mCompetitors; }
            set { mCompetitors = value; }
        }
        public String BusinessVol
        {
            get { return mBusinessVol; }
            set { mBusinessVol = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String CurrencyName
        {
            get { return mCurrencyName; }
            set { mCurrencyName = value; }
        }
        public Decimal Cost
        {
            get { return mCost; }
            set { mCost = value; }
        }
        public Decimal Revenue
        {
            get { return mRevenue; }
            set { mRevenue = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public Decimal GrossProfit
        {
            get { return mGrossProfit; }
            set { mGrossProfit = value; }
        }
        public Int32 ContainerTypeID
        {
            get { return mContainerTypeID; }
            set { mContainerTypeID = value; }
        }
        public Int32 PerPeriodID
        {
            get { return mPerPeriodID; }
            set { mPerPeriodID = value; }
        }
        public Decimal ProfitMargin
        {
            get { return mProfitMargin; }
            set { mProfitMargin = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public String CreatorUserName
        {
            get { return mCreatorUserName; }
            set { mCreatorUserName = value; }
        }
        public Int32 ModificationUserID
        {
            get { return mModificationUserID; }
            set { mModificationUserID = value; }
        }
        public String ModificationUserName
        {
            get { return mModificationUserName; }
            set { mModificationUserName = value; }
        }
        public Int32 PipeLineStageID
        {
            get { return mPipeLineStageID; }
            set { mPipeLineStageID = value; }
        }
        public String PipeLineStageName
        {
            get { return mPipeLineStageName; }
            set { mPipeLineStageName = value; }
        }
        public String Comment
        {
            get { return mComment; }
            set { mComment = value; }
        }
        public Int32 SalesmanID
        {
            get { return mSalesmanID; }
            set { mSalesmanID = value; }
        }
        public Int32 IsActualCustomer
        {
            get { return mIsActualCustomer; }
            set { mIsActualCustomer = value; }
        }
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mQuotationRouteID = value; }
        }
        public String QuotationRouteCode
        {
            get { return mQuotationRouteCode; }
            set { mQuotationRouteCode = value; }
        }
        public Decimal MarginAmount
        {
            get { return mMarginAmount; }
            set { mMarginAmount = value; }
        }
        public Int32 BusinessVolCurrencyID
        {
            get { return mBusinessVolCurrencyID; }
            set { mBusinessVolCurrencyID = value; }
        }
        public String BusinessVolCurrencyCode
        {
            get { return mBusinessVolCurrencyCode; }
            set { mBusinessVolCurrencyCode = value; }
        }
        public Int32 CostCurrencyID
        {
            get { return mCostCurrencyID; }
            set { mCostCurrencyID = value; }
        }
        public String CostCurrencyCode
        {
            get { return mCostCurrencyCode; }
            set { mCostCurrencyCode = value; }
        }
        public Int32 RevenueCurrencyID
        {
            get { return mRevenueCurrencyID; }
            set { mRevenueCurrencyID = value; }
        }
        public String RenveueCurrencyCode
        {
            get { return mRenveueCurrencyCode; }
            set { mRenveueCurrencyCode = value; }
        }
        public Int32 MarginAmountCurrencyID
        {
            get { return mMarginAmountCurrencyID; }
            set { mMarginAmountCurrencyID = value; }
        }
        public String MarginAmountCurrencyCode
        {
            get { return mMarginAmountCurrencyCode; }
            set { mMarginAmountCurrencyCode = value; }
        }
        public Int32 GrossMarginCurrencyID
        {
            get { return mGrossMarginCurrencyID; }
            set { mGrossMarginCurrencyID = value; }
        }
        public String GrossMarginCurrencyCode
        {
            get { return mGrossMarginCurrencyCode; }
            set { mGrossMarginCurrencyCode = value; }
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

    public partial class CvwCRM_ProfitValue
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
        public List<CVarvwCRM_ProfitValue> lstCVarvwCRM_ProfitValue = new List<CVarvwCRM_ProfitValue>();
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
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwCRM_ProfitValue.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCRM_ProfitValue";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwCRM_ProfitValue ObjCVarvwCRM_ProfitValue = new CVarvwCRM_ProfitValue();
                        ObjCVarvwCRM_ProfitValue.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mStartingDate = Convert.ToDateTime(dr["StartingDate"].ToString());
                        ObjCVarvwCRM_ProfitValue.mExpectedClosingDate = Convert.ToDateTime(dr["ExpectedClosingDate"].ToString());
                        ObjCVarvwCRM_ProfitValue.mTradeLane = Convert.ToString(dr["TradeLane"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCompetitors = Convert.ToString(dr["Competitors"].ToString());
                        ObjCVarvwCRM_ProfitValue.mBusinessVol = Convert.ToString(dr["BusinessVol"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarvwCRM_ProfitValue.mRevenue = Convert.ToDecimal(dr["Revenue"].ToString());
                        ObjCVarvwCRM_ProfitValue.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mGrossProfit = Convert.ToDecimal(dr["GrossProfit"].ToString());
                        ObjCVarvwCRM_ProfitValue.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPerPeriodID = Convert.ToInt32(dr["PerPeriodID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mProfitMargin = Convert.ToDecimal(dr["ProfitMargin"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mModificationUserName = Convert.ToString(dr["ModificationUserName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPipeLineStageID = Convert.ToInt32(dr["PipeLineStageID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPipeLineStageName = Convert.ToString(dr["PipeLineStageName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mComment = Convert.ToString(dr["Comment"].ToString());
                        ObjCVarvwCRM_ProfitValue.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mIsActualCustomer = Convert.ToInt32(dr["IsActualCustomer"].ToString());
                        ObjCVarvwCRM_ProfitValue.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mQuotationRouteCode = Convert.ToString(dr["QuotationRouteCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mMarginAmount = Convert.ToDecimal(dr["MarginAmount"].ToString());
                        ObjCVarvwCRM_ProfitValue.mBusinessVolCurrencyID = Convert.ToInt32(dr["BusinessVolCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mBusinessVolCurrencyCode = Convert.ToString(dr["BusinessVolCurrencyCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCostCurrencyCode = Convert.ToString(dr["CostCurrencyCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mRevenueCurrencyID = Convert.ToInt32(dr["RevenueCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mRenveueCurrencyCode = Convert.ToString(dr["RenveueCurrencyCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mMarginAmountCurrencyID = Convert.ToInt32(dr["MarginAmountCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mMarginAmountCurrencyCode = Convert.ToString(dr["MarginAmountCurrencyCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mGrossMarginCurrencyID = Convert.ToInt32(dr["GrossMarginCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mGrossMarginCurrencyCode = Convert.ToString(dr["GrossMarginCurrencyCode"].ToString());
                        lstCVarvwCRM_ProfitValue.Add(ObjCVarvwCRM_ProfitValue);
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
            lstCVarvwCRM_ProfitValue.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCRM_ProfitValue";
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
                        CVarvwCRM_ProfitValue ObjCVarvwCRM_ProfitValue = new CVarvwCRM_ProfitValue();
                        ObjCVarvwCRM_ProfitValue.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPaymentTermName = Convert.ToString(dr["PaymentTermName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mStartingDate = Convert.ToDateTime(dr["StartingDate"].ToString());
                        ObjCVarvwCRM_ProfitValue.mExpectedClosingDate = Convert.ToDateTime(dr["ExpectedClosingDate"].ToString());
                        ObjCVarvwCRM_ProfitValue.mTradeLane = Convert.ToString(dr["TradeLane"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCompetitors = Convert.ToString(dr["Competitors"].ToString());
                        ObjCVarvwCRM_ProfitValue.mBusinessVol = Convert.ToString(dr["BusinessVol"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCurrencyName = Convert.ToString(dr["CurrencyName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarvwCRM_ProfitValue.mRevenue = Convert.ToDecimal(dr["Revenue"].ToString());
                        ObjCVarvwCRM_ProfitValue.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mGrossProfit = Convert.ToDecimal(dr["GrossProfit"].ToString());
                        ObjCVarvwCRM_ProfitValue.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPerPeriodID = Convert.ToInt32(dr["PerPeriodID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mProfitMargin = Convert.ToDecimal(dr["ProfitMargin"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCreatorUserName = Convert.ToString(dr["CreatorUserName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mModificationUserName = Convert.ToString(dr["ModificationUserName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPipeLineStageID = Convert.ToInt32(dr["PipeLineStageID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mPipeLineStageName = Convert.ToString(dr["PipeLineStageName"].ToString());
                        ObjCVarvwCRM_ProfitValue.mComment = Convert.ToString(dr["Comment"].ToString());
                        ObjCVarvwCRM_ProfitValue.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mIsActualCustomer = Convert.ToInt32(dr["IsActualCustomer"].ToString());
                        ObjCVarvwCRM_ProfitValue.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mQuotationRouteCode = Convert.ToString(dr["QuotationRouteCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mMarginAmount = Convert.ToDecimal(dr["MarginAmount"].ToString());
                        ObjCVarvwCRM_ProfitValue.mBusinessVolCurrencyID = Convert.ToInt32(dr["BusinessVolCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mBusinessVolCurrencyCode = Convert.ToString(dr["BusinessVolCurrencyCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mCostCurrencyCode = Convert.ToString(dr["CostCurrencyCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mRevenueCurrencyID = Convert.ToInt32(dr["RevenueCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mRenveueCurrencyCode = Convert.ToString(dr["RenveueCurrencyCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mMarginAmountCurrencyID = Convert.ToInt32(dr["MarginAmountCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mMarginAmountCurrencyCode = Convert.ToString(dr["MarginAmountCurrencyCode"].ToString());
                        ObjCVarvwCRM_ProfitValue.mGrossMarginCurrencyID = Convert.ToInt32(dr["GrossMarginCurrencyID"].ToString());
                        ObjCVarvwCRM_ProfitValue.mGrossMarginCurrencyCode = Convert.ToString(dr["GrossMarginCurrencyCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCRM_ProfitValue.Add(ObjCVarvwCRM_ProfitValue);
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
    }
}
