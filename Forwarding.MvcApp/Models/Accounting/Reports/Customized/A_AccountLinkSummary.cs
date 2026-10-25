using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
// the Model for connect with [dbo].[GetA_AccountLinkSummary] procedure 
// [dbo].[GetA_AccountLinkSummary] : Merge duplicate items base on Itemtype"customers , subaccounts , ....... etc" 
namespace Forwarding.MvcApp.Models.Accounting.Reports.Customized
{
    [Serializable]
    public class GetA_AccountLinkSummary
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarGetA_AccountLinkSummary : GetA_AccountLinkSummary
    {

        #region "variables"
        internal decimal mTotalDebit;
        internal decimal mTotalCredit;
        internal int mCostCenterID;
        internal string mCostCenterName;
        internal string mName;
        #endregion

        #region "Methods"
        public decimal TotalDebit
        {
            get { return mTotalDebit; }
            set { mTotalDebit = value; }
        }
        public decimal TotalCredit
        {
            get { return mTotalCredit; }
            set { mTotalCredit = value; }
        }
        public int CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }

        public string CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        public string Name
        {
            get { return mName; }
            set { mName = value; }
        }

        #endregion

    }

    public partial class CGetA_AccountLinkSummary
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
        //(@AccountIDs nvarchar(max) ,  @FromDate datetime, @ToDate datetime)
        private SqlTransaction tr;
        public List<CVarGetA_AccountLinkSummary> lstCVarGetA_AccountLinkSummary = new List<CVarGetA_AccountLinkSummary>();
        #endregion
        // Merge(string pItemType, string pDuplicateItems, string pDestinationItem)
        #region "Select Methods"
        public Exception GetList(string CostCenterIDs, DateTime ToDate )
        {
            return DataFill( CostCenterIDs, ToDate,  true);
        }

        private Exception DataFill( string CostCenterIDs , DateTime ToDate ,Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarGetA_AccountLinkSummary.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@CostCenterIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].[GetA_AccountLinkSummary]";

                    Com.Parameters[0].Value = ToDate;
                    Com.Parameters[1].Value = CostCenterIDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarGetA_AccountLinkSummary ObjCVarGetA_AccountLinkSummary = new CVarGetA_AccountLinkSummary();
                        ObjCVarGetA_AccountLinkSummary.mTotalDebit = Convert.ToDecimal(dr["TotalDebit"].ToString());
                        ObjCVarGetA_AccountLinkSummary.mTotalCredit = Convert.ToDecimal(dr["TotalCredit"].ToString());
                        ObjCVarGetA_AccountLinkSummary.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarGetA_AccountLinkSummary.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarGetA_AccountLinkSummary.Name = Convert.ToString(dr["Name"].ToString());


                        lstCVarGetA_AccountLinkSummary.Add(ObjCVarGetA_AccountLinkSummary);
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
