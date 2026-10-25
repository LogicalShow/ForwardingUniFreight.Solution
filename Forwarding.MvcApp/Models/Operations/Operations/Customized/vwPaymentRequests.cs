using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
    [Serializable]
    public partial class CVarvwPaymentRequests
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mChargeTypeName;
        internal Decimal mCostPriceSubTotal;
        internal Decimal mCostAmountSubTotal;
        internal String mCurrencyCode;
        #endregion

        #region "Methods"
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
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
        #endregion
    }

    public partial class CvwPaymentRequests
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
        public List<CVarvwPaymentRequests> lstCVarvwPaymentRequests = new List<CVarvwPaymentRequests>();
        #endregion

        #region "Select Methods"
        public Exception GetList_Customized(string WhereClause)
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
            lstCVarvwPaymentRequests.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwPaymentRequests_Customized";
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
                        CVarvwPaymentRequests ObjCVarvwPaymentRequests = new CVarvwPaymentRequests();
                        ObjCVarvwPaymentRequests.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwPaymentRequests.mCostPriceSubTotal = Convert.ToDecimal(dr["CostPriceSubTotal"].ToString());
                        ObjCVarvwPaymentRequests.mCostAmountSubTotal = Convert.ToDecimal(dr["CostAmountSubTotal"].ToString());
                        ObjCVarvwPaymentRequests.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        lstCVarvwPaymentRequests.Add(ObjCVarvwPaymentRequests);
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
            lstCVarvwPaymentRequests.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwPaymentRequests_Customized";
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
                        CVarvwPaymentRequests ObjCVarvwPaymentRequests = new CVarvwPaymentRequests();
                        ObjCVarvwPaymentRequests.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwPaymentRequests.mCostPriceSubTotal = Convert.ToDecimal(dr["CostPriceSubTotal"].ToString());
                        ObjCVarvwPaymentRequests.mCostAmountSubTotal = Convert.ToDecimal(dr["CostAmountSubTotal"].ToString());
                        ObjCVarvwPaymentRequests.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPaymentRequests.Add(ObjCVarvwPaymentRequests);
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
