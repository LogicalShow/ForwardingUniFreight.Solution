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
    public partial class CVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mName;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        #endregion
    }

    public partial class CvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID
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
        public List<CVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID> lstCVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID = new List<CVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID>();
        #endregion

        #region "Select Methods"
        public Exception GetList(Int32 pSubAccountID)
        {
            return DataFill(pSubAccountID, true);
        }
        private Exception DataFill(Int32 pSubAccountID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                    //Com.CommandText = "ERP_Web.[dbo].A_SubAccounts_Details_SelectBySubAcountGroupID";
                    Com.CommandText = "[dbo].A_SubAccounts_Details_SelectBySubAcountGroupID";
                    Com.Parameters[0].Value = pSubAccountID;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID ObjCVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID = new CVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID();
                        ObjCVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID.mID = dr["ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID.mName = Convert.ToString(dr["Name"].ToString());
                        lstCVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID.Add(ObjCVarvwStructure_A_SubAccounts_Details_SelectBySubAcountGroupID);
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