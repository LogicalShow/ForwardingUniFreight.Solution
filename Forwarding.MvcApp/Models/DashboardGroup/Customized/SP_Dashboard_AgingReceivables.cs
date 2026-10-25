using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.DashboardGroup.Customized
{
    [Serializable]
    public class CPKSP_Dashboard_AgingReceivables
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSP_Dashboard_AgingReceivables : CPKSP_Dashboard_AgingReceivables
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mDays;
        //internal Int32 mYear;
        internal decimal mAmount;
        #endregion

        #region "Methods"
        public String Days
        {
            get { return mDays; }
            set { mDays = value; }
        }
        //public Int32 Year
        //{
        //    get { return mYear; }
        //    set { mYear = value; }
        //}
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

    public partial class CSP_Dashboard_AgingReceivables
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
        public List<CVarSP_Dashboard_AgingReceivables> lstCVarSP_Dashboard_AgingReceivables = new List<CVarSP_Dashboard_AgingReceivables>();
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
            lstCVarSP_Dashboard_AgingReceivables.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                    Com.CommandText = "[dbo].SP_Dashboard_AgingReceivables";
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
                        CVarSP_Dashboard_AgingReceivables ObjCVarSP_Dashboard_AgingReceivables = new CVarSP_Dashboard_AgingReceivables();
                        ObjCVarSP_Dashboard_AgingReceivables.mDays = dr["Days"].ToString();
                        //ObjCVarSP_Dashboard_AgingReceivables.mYear = Convert.ToInt32(dr["Year"].ToString());
                        ObjCVarSP_Dashboard_AgingReceivables.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        lstCVarSP_Dashboard_AgingReceivables.Add(ObjCVarSP_Dashboard_AgingReceivables);
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