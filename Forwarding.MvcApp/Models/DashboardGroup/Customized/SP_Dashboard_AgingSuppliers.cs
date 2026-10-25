using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.DashboardGroup.Customized
{
    [Serializable]
    public class CPKSP_Dashboard_AgingSuppliers
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSP_Dashboard_AgingSuppliers : CPKSP_Dashboard_AgingSuppliers
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

    public partial class CSP_Dashboard_AgingSuppliers
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
        public List<CVarSP_Dashboard_AgingSuppliers> lstCVarSP_Dashboard_AgingSuppliers = new List<CVarSP_Dashboard_AgingSuppliers>();
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
            lstCVarSP_Dashboard_AgingSuppliers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                    Com.CommandText = "[dbo].SP_Dashboard_AgingSuppliers";
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
                        CVarSP_Dashboard_AgingSuppliers ObjCVarSP_Dashboard_AgingSuppliers = new CVarSP_Dashboard_AgingSuppliers();
                        ObjCVarSP_Dashboard_AgingSuppliers.mCustomerName = dr["CustomerName"].ToString();
                        ObjCVarSP_Dashboard_AgingSuppliers.mPartnerTypeCode = dr["PartnerTypeCode"].ToString();
                        ObjCVarSP_Dashboard_AgingSuppliers.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        lstCVarSP_Dashboard_AgingSuppliers.Add(ObjCVarSP_Dashboard_AgingSuppliers);
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