using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public class CPKvwA_CashFlow
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwA_CashFlow : CPKvwA_CashFlow
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mNoAccessCashFlowID;
        internal String mName;
        internal Boolean misPaid;
        internal String mAccessCashFlowName;
        #endregion

        #region "Methods"
        public Int32 NoAccessCashFlowID
        {
            get { return mNoAccessCashFlowID; }
            set { mNoAccessCashFlowID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Boolean isPaid
        {
            get { return misPaid; }
            set { misPaid = value; }
        }
        public String AccessCashFlowName
        {
            get { return mAccessCashFlowName; }
            set { mAccessCashFlowName = value; }
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

    public partial class CvwA_CashFlow
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
        public List<CVarvwA_CashFlow> lstCVarvwA_CashFlow = new List<CVarvwA_CashFlow>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_CashFlow.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_CashFlow";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_CashFlow ObjCVarvwA_CashFlow = new CVarvwA_CashFlow();
                        ObjCVarvwA_CashFlow.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_CashFlow.mNoAccessCashFlowID = Convert.ToInt32(dr["NoAccessCashFlowID"].ToString());
                        ObjCVarvwA_CashFlow.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_CashFlow.misPaid = Convert.ToBoolean(dr["isPaid"].ToString());
                        ObjCVarvwA_CashFlow.mAccessCashFlowName = Convert.ToString(dr["AccessCashFlowName"].ToString());
                        lstCVarvwA_CashFlow.Add(ObjCVarvwA_CashFlow);
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

        private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_CashFlow.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwA_CashFlow";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_CashFlow ObjCVarvwA_CashFlow = new CVarvwA_CashFlow();
                        ObjCVarvwA_CashFlow.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_CashFlow.mNoAccessCashFlowID = Convert.ToInt32(dr["NoAccessCashFlowID"].ToString());
                        ObjCVarvwA_CashFlow.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_CashFlow.misPaid = Convert.ToBoolean(dr["isPaid"].ToString());
                        ObjCVarvwA_CashFlow.mAccessCashFlowName = Convert.ToString(dr["AccessCashFlowName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_CashFlow.Add(ObjCVarvwA_CashFlow);
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
