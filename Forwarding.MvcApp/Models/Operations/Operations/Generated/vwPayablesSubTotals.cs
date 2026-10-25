using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public partial class CVarvwPayablesSubTotals
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int64 mMasterOperationID;
        internal String mChargeTypeName;
        internal Decimal mAmountWithoutVATSubTotal;
        internal Decimal mQuotationCost;
        internal Decimal mCostPriceSubTotal;
        internal Decimal mCostAmountSubTotal;
        internal String mCurrencyCode;
        internal Int64 mPayableID;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
        }
        public Decimal AmountWithoutVATSubTotal
        {
            get { return mAmountWithoutVATSubTotal; }
            set { mAmountWithoutVATSubTotal = value; }
        }
        public Decimal QuotationCost
        {
            get { return mQuotationCost; }
            set { mQuotationCost = value; }
        }
        public Decimal CostPriceSubTotal
        {
            get { return mCostPriceSubTotal; }
            set { mCostPriceSubTotal = value; }
        }
        public Decimal CostAmountSubTotal
        {
            get { return mCostAmountSubTotal; }
            set { mCostAmountSubTotal = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Int64 PayableID
        {
            get { return mPayableID; }
            set { mPayableID = value; }
        }
        #endregion
    }

    public partial class CvwPayablesSubTotals
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
        public List<CVarvwPayablesSubTotals> lstCVarvwPayablesSubTotals = new List<CVarvwPayablesSubTotals>();
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
            lstCVarvwPayablesSubTotals.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPayablesSubTotals";
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
                        CVarvwPayablesSubTotals ObjCVarvwPayablesSubTotals = new CVarvwPayablesSubTotals();
                        ObjCVarvwPayablesSubTotals.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwPayablesSubTotals.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwPayablesSubTotals.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwPayablesSubTotals.mAmountWithoutVATSubTotal = Convert.ToDecimal(dr["AmountWithoutVATSubTotal"].ToString());
                        ObjCVarvwPayablesSubTotals.mQuotationCost = Convert.ToDecimal(dr["QuotationCost"].ToString());
                        ObjCVarvwPayablesSubTotals.mCostPriceSubTotal = Convert.ToDecimal(dr["CostPriceSubTotal"].ToString());
                        ObjCVarvwPayablesSubTotals.mCostAmountSubTotal = Convert.ToDecimal(dr["CostAmountSubTotal"].ToString());
                        ObjCVarvwPayablesSubTotals.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPayablesSubTotals.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        lstCVarvwPayablesSubTotals.Add(ObjCVarvwPayablesSubTotals);
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
            lstCVarvwPayablesSubTotals.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPayablesSubTotals";
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
                        CVarvwPayablesSubTotals ObjCVarvwPayablesSubTotals = new CVarvwPayablesSubTotals();
                        ObjCVarvwPayablesSubTotals.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwPayablesSubTotals.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwPayablesSubTotals.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwPayablesSubTotals.mAmountWithoutVATSubTotal = Convert.ToDecimal(dr["AmountWithoutVATSubTotal"].ToString());
                        ObjCVarvwPayablesSubTotals.mQuotationCost = Convert.ToDecimal(dr["QuotationCost"].ToString());
                        ObjCVarvwPayablesSubTotals.mCostPriceSubTotal = Convert.ToDecimal(dr["CostPriceSubTotal"].ToString());
                        ObjCVarvwPayablesSubTotals.mCostAmountSubTotal = Convert.ToDecimal(dr["CostAmountSubTotal"].ToString());
                        ObjCVarvwPayablesSubTotals.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwPayablesSubTotals.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPayablesSubTotals.Add(ObjCVarvwPayablesSubTotals);
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
