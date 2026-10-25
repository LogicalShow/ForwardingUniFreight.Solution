using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
namespace Forwarding.MvcApp.Models.CRM.Customized
{
    [Serializable]
    public partial class CVarCRM_LastActionToEachSalesLead
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mClientName;
        internal String mActionName;
        internal int mActionOrder;
        internal DateTime mActionDate;

        #endregion

        #region "Methods"
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public String ActionName
        {
            get { return mActionName; }
            set { mActionName = value; }
        }
        public int ActionOrder
        {
            get { return mActionOrder; }
            set { mActionOrder = value; }
        }
        public DateTime ActionDate
        {
            get { return mActionDate; }
            set { mActionDate = value; }
        }
        
        #endregion
    }

    public partial class CCRM_LastActionToEachSalesLead
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
        public List<CVarCRM_LastActionToEachSalesLead> lstCVarCRM_LastActionToEachSalesLead = new List<CVarCRM_LastActionToEachSalesLead>();
        #endregion

        #region "Select Methods"
        public Exception GetList(int SalesRepID)
        {
            return DataFill(SalesRepID, true);
        }
        private Exception DataFill(int Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarCRM_LastActionToEachSalesLead.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@SalesRepID", SqlDbType.Int));
                    Com.CommandText = "[dbo].GetListCRM_LastActionToEachSalesLead";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarCRM_LastActionToEachSalesLead ObjCVarCRM_LastActionToEachSalesLead = new CVarCRM_LastActionToEachSalesLead();
                        ObjCVarCRM_LastActionToEachSalesLead.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarCRM_LastActionToEachSalesLead.mActionName = Convert.ToString(dr["ActionName"].ToString());
                        ObjCVarCRM_LastActionToEachSalesLead.mActionOrder = Convert.ToInt32(Convert.ToDecimal(dr["ActionOrder"].ToString()));
                        ObjCVarCRM_LastActionToEachSalesLead.mActionDate = Convert.ToDateTime(dr["ActionDate"].ToString());
                        
                        lstCVarCRM_LastActionToEachSalesLead.Add(ObjCVarCRM_LastActionToEachSalesLead);
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
