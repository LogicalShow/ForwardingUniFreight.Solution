using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.Reports.Customized
{
    [Serializable]
    public partial class CVarvwStructure_Rep_A_CostCenterProfit
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCostCenterID;
        internal String mCostCenterName;
        internal String mName;
        internal Decimal mPayables;
        internal Decimal mReceivables;
        #endregion

        #region "Methods"
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Decimal Payables
        {
            get { return mPayables; }
            set { mPayables = value; }
        }
        public Decimal Receivables
        {
            get { return mReceivables; }
            set { mReceivables = value; }
        }
        #endregion
    }

    public partial class CvwStructure_Rep_A_CostCenterProfit
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
        public List<CVarvwStructure_Rep_A_CostCenterProfit> lstCVarvwStructure_Rep_A_CostCenterProfit = new List<CVarvwStructure_Rep_A_CostCenterProfit>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pCostCenterIDs, DateTime pFrom_Date, DateTime pTo_Date)
        {
            return DataFill(pCostCenterIDs,pFrom_Date,pTo_Date, true);
        }
        private Exception DataFill(string pCostCenterIDs, DateTime pFrom_Date, DateTime pTo_Date, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_CostCenterProfit.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@CostCenterIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.CommandText = "Rep_A_CostCenterProfit";
                    Com.Parameters[0].Value = pCostCenterIDs;
                    Com.Parameters[1].Value = pFrom_Date;
                    Com.Parameters[2].Value = pTo_Date;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 120;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_CostCenterProfit ObjCVarvwStructure_Rep_A_CostCenterProfit = new CVarvwStructure_Rep_A_CostCenterProfit();
                        ObjCVarvwStructure_Rep_A_CostCenterProfit.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwStructure_Rep_A_CostCenterProfit.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwStructure_Rep_A_CostCenterProfit.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwStructure_Rep_A_CostCenterProfit.mPayables = Convert.ToDecimal(dr["Payables"].ToString());
                        ObjCVarvwStructure_Rep_A_CostCenterProfit.mReceivables = Convert.ToDecimal(dr["Receivables"].ToString());
                        lstCVarvwStructure_Rep_A_CostCenterProfit.Add(ObjCVarvwStructure_Rep_A_CostCenterProfit);
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
