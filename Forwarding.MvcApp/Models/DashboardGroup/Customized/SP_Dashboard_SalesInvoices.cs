using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.DashboardGroup.Customized
{
    [Serializable]
    public class CPKSP_Dashboard_SalesInvoices
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSP_Dashboard_SalesInvoices : CPKSP_Dashboard_SalesInvoices
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mMonth;
        internal Int32 mYear;
        internal decimal mAmount;
        #endregion

        #region "Methods"
        public Int32 Month
        {
            get { return mMonth; }
            set { mMonth = value; }
        }
        public Int32 Year
        {
            get { return mYear; }
            set { mYear = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
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

    public partial class CSP_Dashboard_SalesInvoices
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
        public List<CVarSP_Dashboard_SalesInvoices> lstCVarSP_Dashboard_SalesInvoices = new List<CVarSP_Dashboard_SalesInvoices>();
        #endregion

        #region "Select Methods"
        public Exception GetList(int pYear)
        {
            return DataFill(pYear, true);
        }
        private Exception DataFill(int pYear, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSP_Dashboard_SalesInvoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@Year", SqlDbType.Int));
                    Com.CommandText = "[dbo].SP_Dashboard_SalesInvoices";
                    Com.Parameters[0].Value = pYear;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSP_Dashboard_SalesInvoices ObjCVarSP_Dashboard_SalesInvoices = new CVarSP_Dashboard_SalesInvoices();
                        ObjCVarSP_Dashboard_SalesInvoices.mMonth = Convert.ToInt32(dr["Month"].ToString());
                        ObjCVarSP_Dashboard_SalesInvoices.mYear = Convert.ToInt32(dr["Year"].ToString());
                        ObjCVarSP_Dashboard_SalesInvoices.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        lstCVarSP_Dashboard_SalesInvoices.Add(ObjCVarSP_Dashboard_SalesInvoices);
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