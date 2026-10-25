using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Accounting.Reports.Customized
{
    [Serializable]
    public partial class CVarRep_A_CashFlowStatment
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mParentGroupID;
        internal String mParentGroup;
        internal String mGroupName;
        internal Decimal mBalance;
        #endregion

        #region "Methods"
        public Int32 ParentGroupID
        {
            get { return mParentGroupID; }
            set { mParentGroupID = value; }
        }
        public String ParentGroup
        {
            get { return mParentGroup; }
            set { mParentGroup = value; }
        }
        public String GroupName
        {
            get { return mGroupName; }
            set { mGroupName = value; }
        }
        public Decimal Balance
        {
            get { return mBalance; }
            set { mBalance = value; }
        }
        #endregion
    }

    public partial class CRep_A_CashFlowStatment
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
        public List<CVarRep_A_CashFlowStatment> lstCVarRep_A_CashFlowStatment = new List<CVarRep_A_CashFlowStatment>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime  pFrom_Date, DateTime pTo_Date)
        {
            return DataFill(pFrom_Date,pTo_Date, true);
        }

        private Exception DataFill(DateTime pFrom_Date, DateTime pTo_Date, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarRep_A_CashFlowStatment.Clear();

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
                    //Com.CommandText = "ERP_Web.[dbo].SP_A_Rep_BalanceSheet_E";
                    Com.CommandText = "[dbo].Rep_A_CashFlowStatment";
                    Com.Parameters[0].Value = pFrom_Date;
                    Com.Parameters[1].Value = pTo_Date;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarRep_A_CashFlowStatment ObjCVarRep_A_CashFlowStatment = new CVarRep_A_CashFlowStatment();
                        ObjCVarRep_A_CashFlowStatment.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarRep_A_CashFlowStatment.mParentGroup = Convert.ToString(dr["ParentGroup"].ToString());
                        ObjCVarRep_A_CashFlowStatment.mGroupName = Convert.ToString(dr["GroupName"].ToString());
                        ObjCVarRep_A_CashFlowStatment.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        lstCVarRep_A_CashFlowStatment.Add(ObjCVarRep_A_CashFlowStatment);
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
