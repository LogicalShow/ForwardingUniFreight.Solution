using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKGetPS_InvoicesTotals
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarGetPS_InvoicesTotals : CPKGetPS_InvoicesTotals
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mSupplierName;
        internal Decimal mTotalBeforTax;
        internal Decimal mTotalPrice;
        internal Decimal mDiscount;
        internal Decimal mTaxesAmount;
        internal Decimal mItemsAmount;
        internal Decimal mServicesAmount;
        internal Decimal mExpensesAmount;
        #endregion

        #region "Methods"
        public String SupplierName
        {
            get { return mSupplierName; }
            set { mSupplierName = value; }
        }
        public Decimal TotalBeforTax
        {
            get { return mTotalBeforTax; }
            set { mTotalBeforTax = value; }
        }
        public Decimal TotalPrice
        {
            get { return mTotalPrice; }
            set { mTotalPrice = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mDiscount = value; }
        }
        public Decimal TaxesAmount
        {
            get { return mTaxesAmount; }
            set { mTaxesAmount = value; }
        }
        public Decimal ItemsAmount
        {
            get { return mItemsAmount; }
            set { mItemsAmount = value; }
        }
        public Decimal ServicesAmount
        {
            get { return mServicesAmount; }
            set { mServicesAmount = value; }
        }
        public Decimal ExpensesAmount
        {
            get { return mExpensesAmount; }
            set { mExpensesAmount = value; }
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

    public partial class CGetPS_InvoicesTotals
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
        public List<CVarGetPS_InvoicesTotals> lstCVarGetPS_InvoicesTotals = new List<CVarGetPS_InvoicesTotals>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime FromDate, DateTime ToDate, string SuppliersIDs)
        {
            return DataFill( FromDate,  ToDate,  SuppliersIDs , true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(DateTime FromDate , DateTime ToDate , string SuppliersIDs ,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarGetPS_InvoicesTotals.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@IDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetPS_InvoicesTotals";
                    Com.Parameters[0].Value = FromDate;
                    Com.Parameters[1].Value = ToDate;
                    Com.Parameters[2].Value = SuppliersIDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarGetPS_InvoicesTotals ObjCVarGetPS_InvoicesTotals = new CVarGetPS_InvoicesTotals();
                        ObjCVarGetPS_InvoicesTotals.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        lstCVarGetPS_InvoicesTotals.Add(ObjCVarGetPS_InvoicesTotals);
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
            lstCVarGetPS_InvoicesTotals.Clear();

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
                Com.CommandText = "[dbo].GetListPagingGetPS_InvoicesTotals";
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
                        CVarGetPS_InvoicesTotals ObjCVarGetPS_InvoicesTotals = new CVarGetPS_InvoicesTotals();
                        ObjCVarGetPS_InvoicesTotals.mSupplierName = Convert.ToString(dr["SupplierName"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
                        ObjCVarGetPS_InvoicesTotals.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarGetPS_InvoicesTotals.Add(ObjCVarGetPS_InvoicesTotals);
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
