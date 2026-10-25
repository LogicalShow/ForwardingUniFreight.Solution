using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Dashboard.Generated
{
    [Serializable]
    public partial class CVarvwDailySpotLight
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mToday;
        internal Int32 mMTD;
        internal Int32 mYTD;
        internal String mRowName;
        #endregion

        #region "Methods"
        public Int32 Today
        {
            get { return mToday; }
            set { mToday = value; }
        }
        public Int32 MTD
        {
            get { return mMTD; }
            set { mMTD = value; }
        }
        public Int32 YTD
        {
            get { return mYTD; }
            set { mYTD = value; }
        }
        public String RowName
        {
            get { return mRowName; }
            set { mRowName = value; }
        }
        #endregion
    }

    public partial class CvwDailySpotLight
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
        public List<CVarvwDailySpotLight> lstCVarvwDailySpotLight = new List<CVarvwDailySpotLight>();
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
            lstCVarvwDailySpotLight.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwDailySpotLight";
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
                        CVarvwDailySpotLight ObjCVarvwDailySpotLight = new CVarvwDailySpotLight();
                        ObjCVarvwDailySpotLight.mToday = Convert.ToInt32(dr["Today"].ToString());
                        ObjCVarvwDailySpotLight.mMTD = Convert.ToInt32(dr["MTD"].ToString());
                        ObjCVarvwDailySpotLight.mYTD = Convert.ToInt32(dr["YTD"].ToString());
                        ObjCVarvwDailySpotLight.mRowName = Convert.ToString(dr["RowName"].ToString());
                        lstCVarvwDailySpotLight.Add(ObjCVarvwDailySpotLight);
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
            lstCVarvwDailySpotLight.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwDailySpotLight";
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
                        CVarvwDailySpotLight ObjCVarvwDailySpotLight = new CVarvwDailySpotLight();
                        ObjCVarvwDailySpotLight.mToday = Convert.ToInt32(dr["Today"].ToString());
                        ObjCVarvwDailySpotLight.mMTD = Convert.ToInt32(dr["MTD"].ToString());
                        ObjCVarvwDailySpotLight.mYTD = Convert.ToInt32(dr["YTD"].ToString());
                        ObjCVarvwDailySpotLight.mRowName = Convert.ToString(dr["RowName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwDailySpotLight.Add(ObjCVarvwDailySpotLight);
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
