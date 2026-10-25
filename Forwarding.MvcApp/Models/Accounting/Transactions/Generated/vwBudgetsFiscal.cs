using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public class CPKvwBudgetsFiscal
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
    public partial class CVarvwBudgetsFiscal : CPKvwBudgetsFiscal
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mBudgetID;
        internal Int32 mFiscalYearID;
        internal Int32 mMonthID;
        internal String mName;
        internal String mFiscalYearName;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        #endregion

        #region "Methods"
        public Int32 BudgetID
        {
            get { return mBudgetID; }
            set { mBudgetID = value; }
        }
        public Int32 FiscalYearID
        {
            get { return mFiscalYearID; }
            set { mFiscalYearID = value; }
        }
        public Int32 MonthID
        {
            get { return mMonthID; }
            set { mMonthID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String FiscalYearName
        {
            get { return mFiscalYearName; }
            set { mFiscalYearName = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mToDate = value; }
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

    public partial class CvwBudgetsFiscal
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
        public List<CVarvwBudgetsFiscal> lstCVarvwBudgetsFiscal = new List<CVarvwBudgetsFiscal>();
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
            lstCVarvwBudgetsFiscal.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwBudgetsFiscal";
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
                        CVarvwBudgetsFiscal ObjCVarvwBudgetsFiscal = new CVarvwBudgetsFiscal();
                        ObjCVarvwBudgetsFiscal.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwBudgetsFiscal.mBudgetID = Convert.ToInt32(dr["BudgetID"].ToString());
                        ObjCVarvwBudgetsFiscal.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarvwBudgetsFiscal.mMonthID = Convert.ToInt32(dr["MonthID"].ToString());
                        ObjCVarvwBudgetsFiscal.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwBudgetsFiscal.mFiscalYearName = Convert.ToString(dr["FiscalYearName"].ToString());
                        ObjCVarvwBudgetsFiscal.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwBudgetsFiscal.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        lstCVarvwBudgetsFiscal.Add(ObjCVarvwBudgetsFiscal);
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
            lstCVarvwBudgetsFiscal.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwBudgetsFiscal";
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
                        CVarvwBudgetsFiscal ObjCVarvwBudgetsFiscal = new CVarvwBudgetsFiscal();
                        ObjCVarvwBudgetsFiscal.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwBudgetsFiscal.mBudgetID = Convert.ToInt32(dr["BudgetID"].ToString());
                        ObjCVarvwBudgetsFiscal.mFiscalYearID = Convert.ToInt32(dr["FiscalYearID"].ToString());
                        ObjCVarvwBudgetsFiscal.mMonthID = Convert.ToInt32(dr["MonthID"].ToString());
                        ObjCVarvwBudgetsFiscal.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwBudgetsFiscal.mFiscalYearName = Convert.ToString(dr["FiscalYearName"].ToString());
                        ObjCVarvwBudgetsFiscal.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwBudgetsFiscal.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwBudgetsFiscal.Add(ObjCVarvwBudgetsFiscal);
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
