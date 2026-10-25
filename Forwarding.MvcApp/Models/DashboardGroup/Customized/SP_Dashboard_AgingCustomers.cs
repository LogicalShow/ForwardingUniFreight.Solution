using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.DashboardGroup.Customized
{
    [Serializable]
    public class CPKSP_Dashboard_AgingCustomers
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSP_Dashboard_AgingCustomers : CPKSP_Dashboard_AgingCustomers
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCustomerName;
        internal String mPartnerTypeCode;
        internal decimal mAmount;
        #endregion

        #region "Methods"
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public String PartnerTypeCode
        {
            get { return mPartnerTypeCode; }
            set { mPartnerTypeCode = value; }
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

    public partial class CSP_Dashboard_AgingCustomers
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
        public List<CVarSP_Dashboard_AgingCustomers> lstCVarSP_Dashboard_AgingCustomers = new List<CVarSP_Dashboard_AgingCustomers>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime pDate)
        {
            return DataFill(pDate, true);
        }
        private Exception DataFill(DateTime pDate, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSP_Dashboard_AgingCustomers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                    Com.CommandText = "[dbo].SP_Dashboard_AgingCustomers";
                    Com.Parameters[0].Value = pDate;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSP_Dashboard_AgingCustomers ObjCVarSP_Dashboard_AgingCustomers = new CVarSP_Dashboard_AgingCustomers();
                        ObjCVarSP_Dashboard_AgingCustomers.mCustomerName = dr["CustomerName"].ToString();
                        ObjCVarSP_Dashboard_AgingCustomers.mPartnerTypeCode = dr["PartnerTypeCode"].ToString();
                        ObjCVarSP_Dashboard_AgingCustomers.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        lstCVarSP_Dashboard_AgingCustomers.Add(ObjCVarSP_Dashboard_AgingCustomers);
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