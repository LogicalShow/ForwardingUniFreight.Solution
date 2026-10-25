using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.DashboardGroup.Customized
{
    [Serializable]
    public class CPKProfitabilitySummaryByCustomer_FilterByInvoiceDate
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarProfitabilitySummaryByCustomer_FilterByInvoiceDate : CPKProfitabilitySummaryByCustomer_FilterByInvoiceDate
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal int mCustomerID;
        internal String mCustomerName;
        internal Decimal mPayablesWithoutVAT;
        internal Decimal mReceivablesWithoutVAT;
        internal Decimal mReceivablesUnInvoicedWithoutVAT;

        #endregion

        #region "Methods"
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public Decimal PayablesWithoutVAT
        {
            get { return mPayablesWithoutVAT; }
            set { mPayablesWithoutVAT = value; }
        }
        public Decimal ReceivablesWithoutVAT
        {
            get { return mReceivablesWithoutVAT; }
            set { mReceivablesWithoutVAT = value; }
        }
        public Decimal ReceivablesUnInvoicedWithoutVAT
        {
            get { return mReceivablesUnInvoicedWithoutVAT; }
            set { mReceivablesUnInvoicedWithoutVAT = value; }
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

    public partial class CProfitabilitySummaryByCustomer_FilterByInvoiceDate
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
        public List<CVarProfitabilitySummaryByCustomer_FilterByInvoiceDate> lstCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate = new List<CVarProfitabilitySummaryByCustomer_FilterByInvoiceDate>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime pFromDate, DateTime pToDate,int pCustomerID)
        {
            return DataFill(pFromDate, pToDate,pCustomerID, true);
        }
        private Exception DataFill(DateTime pFromDate, DateTime pToDate, int pCustomerID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate.Clear();

            try
            {
                Con.Open();

                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 250;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                    Com.CommandText = "[dbo].ProfitabilitySummaryByCustomer_FilterByInvoiceDate";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pToDate;
                    Com.Parameters[2].Value = pCustomerID;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarProfitabilitySummaryByCustomer_FilterByInvoiceDate ObjCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate = new CVarProfitabilitySummaryByCustomer_FilterByInvoiceDate();
                        ObjCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate.mCustomerName = dr["CustomerName"].ToString();
                        ObjCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate.mPayablesWithoutVAT = Convert.ToDecimal(dr["PayablesWithoutVAT"]);
                        ObjCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate.mReceivablesWithoutVAT = Convert.ToDecimal(dr["ReceivablesWithoutVAT"].ToString());
                        ObjCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate.mReceivablesUnInvoicedWithoutVAT = Convert.ToDecimal(dr["ReceivablesUnInvoicedWithoutVAT"].ToString());
                        lstCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate.Add(ObjCVarProfitabilitySummaryByCustomer_FilterByInvoiceDate);
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