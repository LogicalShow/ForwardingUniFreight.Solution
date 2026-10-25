using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Quotations.Quotations.Generated
{
    [Serializable]
    public class CPKvwQuotationRouteWithMinimalColumns
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwQuotationRouteWithMinimalColumns : CPKvwQuotationRouteWithMinimalColumns
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal DateTime mExpirationDate;
        internal Int32 mQuotationStageID;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public DateTime ExpirationDate
        {
            get { return mExpirationDate; }
            set { mExpirationDate = value; }
        }
        public Int32 QuotationStageID
        {
            get { return mQuotationStageID; }
            set { mQuotationStageID = value; }
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

    public partial class CvwQuotationRouteWithMinimalColumns
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
        public List<CVarvwQuotationRouteWithMinimalColumns> lstCVarvwQuotationRouteWithMinimalColumns = new List<CVarvwQuotationRouteWithMinimalColumns>();
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
            lstCVarvwQuotationRouteWithMinimalColumns.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwQuotationRouteWithMinimalColumns";
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
                        CVarvwQuotationRouteWithMinimalColumns ObjCVarvwQuotationRouteWithMinimalColumns = new CVarvwQuotationRouteWithMinimalColumns();
                        ObjCVarvwQuotationRouteWithMinimalColumns.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwQuotationRouteWithMinimalColumns.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwQuotationRouteWithMinimalColumns.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
                        ObjCVarvwQuotationRouteWithMinimalColumns.mQuotationStageID = Convert.ToInt32(dr["QuotationStageID"].ToString());
                        lstCVarvwQuotationRouteWithMinimalColumns.Add(ObjCVarvwQuotationRouteWithMinimalColumns);
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
            lstCVarvwQuotationRouteWithMinimalColumns.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwQuotationRouteWithMinimalColumns";
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
                        CVarvwQuotationRouteWithMinimalColumns ObjCVarvwQuotationRouteWithMinimalColumns = new CVarvwQuotationRouteWithMinimalColumns();
                        ObjCVarvwQuotationRouteWithMinimalColumns.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwQuotationRouteWithMinimalColumns.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwQuotationRouteWithMinimalColumns.mExpirationDate = Convert.ToDateTime(dr["ExpirationDate"].ToString());
                        ObjCVarvwQuotationRouteWithMinimalColumns.mQuotationStageID = Convert.ToInt32(dr["QuotationStageID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwQuotationRouteWithMinimalColumns.Add(ObjCVarvwQuotationRouteWithMinimalColumns);
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
