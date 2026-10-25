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
    public partial class CVarvwReceivablesSubTotals
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int64 mMasterOperationID;
        internal Decimal mSalePriceSubTotal;
        internal Decimal mSaleAmountSubTotal;
        internal String mCurrencyCode;
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
        public Decimal SalePriceSubTotal
        {
            get { return mSalePriceSubTotal; }
            set { mSalePriceSubTotal = value; }
        }
        public Decimal SaleAmountSubTotal
        {
            get { return mSaleAmountSubTotal; }
            set { mSaleAmountSubTotal = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        #endregion
    }

    public partial class CvwReceivablesSubTotals
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
        public List<CVarvwReceivablesSubTotals> lstCVarvwReceivablesSubTotals = new List<CVarvwReceivablesSubTotals>();
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
            lstCVarvwReceivablesSubTotals.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwReceivablesSubTotals";
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
                        CVarvwReceivablesSubTotals ObjCVarvwReceivablesSubTotals = new CVarvwReceivablesSubTotals();
                        ObjCVarvwReceivablesSubTotals.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwReceivablesSubTotals.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwReceivablesSubTotals.mSalePriceSubTotal = Convert.ToDecimal(dr["SalePriceSubTotal"].ToString());
                        ObjCVarvwReceivablesSubTotals.mSaleAmountSubTotal = Convert.ToDecimal(dr["SaleAmountSubTotal"].ToString());
                        ObjCVarvwReceivablesSubTotals.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        lstCVarvwReceivablesSubTotals.Add(ObjCVarvwReceivablesSubTotals);
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
            lstCVarvwReceivablesSubTotals.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwReceivablesSubTotals";
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
                        CVarvwReceivablesSubTotals ObjCVarvwReceivablesSubTotals = new CVarvwReceivablesSubTotals();
                        ObjCVarvwReceivablesSubTotals.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwReceivablesSubTotals.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwReceivablesSubTotals.mSalePriceSubTotal = Convert.ToDecimal(dr["SalePriceSubTotal"].ToString());
                        ObjCVarvwReceivablesSubTotals.mSaleAmountSubTotal = Convert.ToDecimal(dr["SaleAmountSubTotal"].ToString());
                        ObjCVarvwReceivablesSubTotals.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwReceivablesSubTotals.Add(ObjCVarvwReceivablesSubTotals);
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
