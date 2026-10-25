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
    public partial class CVarCRM_PipeLineStageToEachSalesLead
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mClientName;
        internal String mPipeLineStageName;
        internal int mPipeLineStageID;
        internal DateTime mCreationDate;

        #endregion

        #region "Methods"
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public String PipeLineStageName
        {
            get { return mPipeLineStageName; }
            set { mPipeLineStageName = value; }
        }
        public int PipeLineStageID
        {
            get { return mPipeLineStageID; }
            set { mPipeLineStageID = value; }
        }
        
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        #endregion
    }

    public partial class CCRM_PipeLineStageToEachSalesLead
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
        public List<CVarCRM_PipeLineStageToEachSalesLead> lstCVarCRM_PipeLineStageToEachSalesLead = new List<CVarCRM_PipeLineStageToEachSalesLead>();
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
            lstCVarCRM_PipeLineStageToEachSalesLead.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@SalesRepID", SqlDbType.Int));
                    Com.CommandText = "[dbo].GetListCRM_PipeLineStageToEachSalesLead";
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
                        CVarCRM_PipeLineStageToEachSalesLead ObjCVarCRM_PipeLineStageToEachSalesLead = new CVarCRM_PipeLineStageToEachSalesLead();
                        ObjCVarCRM_PipeLineStageToEachSalesLead.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarCRM_PipeLineStageToEachSalesLead.mPipeLineStageName = Convert.ToString(dr["PipeLineStageName"].ToString());
                        ObjCVarCRM_PipeLineStageToEachSalesLead.mPipeLineStageID = Convert.ToInt32( Convert.ToDecimal(dr["PipeLineStageID"].ToString()));
                        ObjCVarCRM_PipeLineStageToEachSalesLead.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        lstCVarCRM_PipeLineStageToEachSalesLead.Add(ObjCVarCRM_PipeLineStageToEachSalesLead);
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
