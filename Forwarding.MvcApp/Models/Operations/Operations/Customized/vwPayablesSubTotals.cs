using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;

namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
    [Serializable]
    public partial class CVarvwPayablesSubTotals
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mAmountWithoutVATSubTotal;
        internal Decimal mQuotationCostSubTotal;
        internal Decimal mCostPriceSubTotal;
        internal Decimal mCostAmountSubTotal;
        internal String mCurrencyCode;
        #endregion

        #region "Methods"
        public Decimal AmountWithoutVATSubTotal
        {
            get { return mAmountWithoutVATSubTotal; }
            set { mAmountWithoutVATSubTotal = value; }
        }
        public Decimal CostPriceSubTotal
        {
            get { return mCostPriceSubTotal; }
            set { mCostPriceSubTotal = value; }
        }
        public Decimal QuotationCostSubTotal
        {
            get { return mQuotationCostSubTotal; }
            set { mQuotationCostSubTotal = value; }
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
        public Exception GetList_Customized(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        //public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        //{
        //    return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        //}
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwPayablesSubTotals.Clear();
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwPayablesSubTotals_Customized";
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
                     
                        if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "IOR")
                        {
                            ObjCVarvwPayablesSubTotals.mAmountWithoutVATSubTotal = Convert.ToDecimal(dr["AmountWithoutVATSubTotal_UnPurchased"].ToString());
                            ObjCVarvwPayablesSubTotals.mQuotationCostSubTotal = Convert.ToDecimal(dr["QuotationCostSubTotal_UnPurchased"].ToString());
                            ObjCVarvwPayablesSubTotals.mCostPriceSubTotal = Convert.ToDecimal(dr["CostPriceSubTotal_UnPurchased"].ToString());
                            ObjCVarvwPayablesSubTotals.mCostAmountSubTotal = Convert.ToDecimal(dr["CostAmountSubTotal_UnPurchased"].ToString());
                        }
                        else
                        {
                            ObjCVarvwPayablesSubTotals.mAmountWithoutVATSubTotal = Convert.ToDecimal(dr["AmountWithoutVATSubTotal"].ToString());
                            ObjCVarvwPayablesSubTotals.mQuotationCostSubTotal = Convert.ToDecimal(dr["QuotationCostSubTotal"].ToString());
                            ObjCVarvwPayablesSubTotals.mCostPriceSubTotal = Convert.ToDecimal(dr["CostPriceSubTotal"].ToString());
                            ObjCVarvwPayablesSubTotals.mCostAmountSubTotal = Convert.ToDecimal(dr["CostAmountSubTotal"].ToString());
                        }
                            ObjCVarvwPayablesSubTotals.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
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

        //private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        //{
        //    Exception Exp = null;
        //    TotRecs = 0;
        //    SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
        //    SqlCommand Com;
        //    SqlDataReader dr;
        //    lstCVarvwPayablesSubTotals.Clear();

        //    try
        //    {
        //        Con.Open();
        //        tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
        //        Com = new SqlCommand();
        //        Com.CommandType = CommandType.StoredProcedure;
        //        Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
        //        Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
        //        Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
        //        Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
        //        Com.CommandText = "[dbo].GetListPagingvwPayablesSubTotals_Customized";
        //        Com.Parameters[0].Value = PageSize;
        //        Com.Parameters[1].Value = PageNumber;
        //        Com.Parameters[2].Value = WhereClause;
        //        Com.Parameters[3].Value = OrderBy;
        //        Com.Transaction = tr;
        //        Com.Connection = Con;
        //        dr = Com.ExecuteReader();
        //        try
        //        {
        //            while (dr.Read())
        //            {
        //                /*Start DataReader*/
        //                CVarvwPayablesSubTotals ObjCVarvwPayablesSubTotals = new CVarvwPayablesSubTotals();
        //                ObjCVarvwPayablesSubTotals.mAmountWithoutVATSubTotal = Convert.ToDecimal(dr["AmountWithoutVATSubTotal"].ToString());
        //                ObjCVarvwPayablesSubTotals.mCostPriceSubTotal = Convert.ToDecimal(dr["CostPriceSubTotal"].ToString());
        //                ObjCVarvwPayablesSubTotals.mCostAmountSubTotal = Convert.ToDecimal(dr["CostAmountSubTotal"].ToString());
        //                ObjCVarvwPayablesSubTotals.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
        //                TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
        //                lstCVarvwPayablesSubTotals.Add(ObjCVarvwPayablesSubTotals);
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            Exp = ex;
        //        }
        //        finally
        //        {
        //            if (dr != null)
        //            {
        //                dr.Close();
        //                dr.Dispose();
        //            }
        //        }
        //        tr.Commit();
        //    }
        //    catch (Exception ex)
        //    {
        //        Exp = ex;
        //    }
        //    finally
        //    {
        //        Con.Close();
        //        Con.Dispose();
        //    }
        //    return Exp;
        //}

        #endregion
    }
}
