using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKvwOperatorTankCharge
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
    public partial class CVarvwOperatorTankCharge : CPKvwOperatorTankCharge
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int32 mAgentID;
        internal Int32 mChargeTypeID;
        internal String mChargeTypeName;
        internal Decimal mCostPrice;
        internal Int32 mCostCurrencyID;
        internal String mCostCurrencyCode;
        internal Decimal mSalePrice;
        internal Int32 mSaleCurrencyID;
        internal String mSaleCurrencyCode;
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
            set { mCustomerID = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mAgentID = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
        }
        public Decimal CostPrice
        {
            get { return mCostPrice; }
            set { mCostPrice = value; }
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
        public Decimal SalePrice
        {
            get { return mSalePrice; }
            set { mSalePrice = value; }
        }
        public Int32 SaleCurrencyID
        {
            get { return mSaleCurrencyID; }
            set { mSaleCurrencyID = value; }
        }
        public String SaleCurrencyCode
        {
            get { return mSaleCurrencyCode; }
            set { mSaleCurrencyCode = value; }
        }
        public Boolean IsImport
        {
            get { return mIsImport; }
            set { mIsImport = value; }
        }
        public Boolean IsExport
        {
            get { return mIsExport; }
            set { mIsExport = value; }
        }
        public Boolean IsDomestic
        {
            get { return mIsDomestic; }
            set { mIsDomestic = value; }
        }
        public Boolean IsCrossBooking
        {
            get { return mIsCrossBooking; }
            set { mIsCrossBooking = value; }
        }
        public Boolean IsReExport
        {
            get { return mIsReExport; }
            set { mIsReExport = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public Boolean IsLoaded
        {
            get { return mIsLoaded; }
            set { mIsLoaded = value; }
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

    public partial class CvwOperatorTankCharge
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
        public List<CVarvwOperatorTankCharge> lstCVarvwOperatorTankCharge = new List<CVarvwOperatorTankCharge>();
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
            lstCVarvwOperatorTankCharge.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwOperatorTankCharge";
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
                        CVarvwOperatorTankCharge ObjCVarvwOperatorTankCharge = new CVarvwOperatorTankCharge();
                        ObjCVarvwOperatorTankCharge.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwOperatorTankCharge.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwOperatorTankCharge.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwOperatorTankCharge.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwOperatorTankCharge.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwOperatorTankCharge.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwOperatorTankCharge.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarvwOperatorTankCharge.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarvwOperatorTankCharge.mCostCurrencyCode = Convert.ToString(dr["CostCurrencyCode"].ToString());
                        ObjCVarvwOperatorTankCharge.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarvwOperatorTankCharge.mSaleCurrencyID = Convert.ToInt32(dr["SaleCurrencyID"].ToString());
                        ObjCVarvwOperatorTankCharge.mSaleCurrencyCode = Convert.ToString(dr["SaleCurrencyCode"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsCrossBooking = Convert.ToBoolean(dr["IsCrossBooking"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsReExport = Convert.ToBoolean(dr["IsReExport"].ToString());
                        ObjCVarvwOperatorTankCharge.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwOperatorTankCharge.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        lstCVarvwOperatorTankCharge.Add(ObjCVarvwOperatorTankCharge);
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
            lstCVarvwOperatorTankCharge.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwOperatorTankCharge";
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
                        CVarvwOperatorTankCharge ObjCVarvwOperatorTankCharge = new CVarvwOperatorTankCharge();
                        ObjCVarvwOperatorTankCharge.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwOperatorTankCharge.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwOperatorTankCharge.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwOperatorTankCharge.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwOperatorTankCharge.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwOperatorTankCharge.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwOperatorTankCharge.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarvwOperatorTankCharge.mCostCurrencyID = Convert.ToInt32(dr["CostCurrencyID"].ToString());
                        ObjCVarvwOperatorTankCharge.mCostCurrencyCode = Convert.ToString(dr["CostCurrencyCode"].ToString());
                        ObjCVarvwOperatorTankCharge.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarvwOperatorTankCharge.mSaleCurrencyID = Convert.ToInt32(dr["SaleCurrencyID"].ToString());
                        ObjCVarvwOperatorTankCharge.mSaleCurrencyCode = Convert.ToString(dr["SaleCurrencyCode"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsCrossBooking = Convert.ToBoolean(dr["IsCrossBooking"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsReExport = Convert.ToBoolean(dr["IsReExport"].ToString());
                        ObjCVarvwOperatorTankCharge.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwOperatorTankCharge.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwOperatorTankCharge.mIsLoaded = Convert.ToBoolean(dr["IsLoaded"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperatorTankCharge.Add(ObjCVarvwOperatorTankCharge);
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
