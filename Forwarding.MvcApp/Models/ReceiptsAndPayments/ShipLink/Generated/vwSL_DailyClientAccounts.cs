using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated
{
    [Serializable]
    public class CPKvwSL_DailyClientAccounts
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
    public partial class CVarvwSL_DailyClientAccounts : CPKvwSL_DailyClientAccounts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAccountID;
        internal String mAccountName;
        internal Int32 mSubAccountID;
        internal String mSubAccountName;
        internal Int64 mClientID;
        internal String mClientName;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        #endregion

        #region "Methods"
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public String SubAccountName
        {
            get { return mSubAccountName; }
            set { mSubAccountName = value; }
        }
        public Int64 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
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

    public partial class CvwSL_DailyClientAccounts
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
        public List<CVarvwSL_DailyClientAccounts> lstCVarvwSL_DailyClientAccounts = new List<CVarvwSL_DailyClientAccounts>();
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
            lstCVarvwSL_DailyClientAccounts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_DailyClientAccounts";
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
                        CVarvwSL_DailyClientAccounts ObjCVarvwSL_DailyClientAccounts = new CVarvwSL_DailyClientAccounts();
                        ObjCVarvwSL_DailyClientAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        lstCVarvwSL_DailyClientAccounts.Add(ObjCVarvwSL_DailyClientAccounts);
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
            lstCVarvwSL_DailyClientAccounts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_DailyClientAccounts";
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
                        CVarvwSL_DailyClientAccounts ObjCVarvwSL_DailyClientAccounts = new CVarvwSL_DailyClientAccounts();
                        ObjCVarvwSL_DailyClientAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mClientID = Convert.ToInt64(dr["ClientID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_DailyClientAccounts.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_DailyClientAccounts.Add(ObjCVarvwSL_DailyClientAccounts);
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
