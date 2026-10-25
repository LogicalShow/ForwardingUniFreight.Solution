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
    public partial class CVarvwSL_GetPaidInvoice_ByCheque
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mCont_Desc;
        internal Boolean mIsAudited;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Cont_Desc
        {
            get { return mCont_Desc; }
            set { mCont_Desc = value; }
        }
        public Boolean IsAudited
        {
            get { return mIsAudited; }
            set { mIsAudited = value; }
        }
        #endregion
    }

    public partial class CvwSL_GetPaidInvoice_ByCheque
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
        public List<CVarvwSL_GetPaidInvoice_ByCheque> lstCVarvwSL_GetPaidInvoice_ByCheque = new List<CVarvwSL_GetPaidInvoice_ByCheque>();
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
            lstCVarvwSL_GetPaidInvoice_ByCheque.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_GetPaidInvoice_ByCheque";
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
                        CVarvwSL_GetPaidInvoice_ByCheque ObjCVarvwSL_GetPaidInvoice_ByCheque = new CVarvwSL_GetPaidInvoice_ByCheque();
                        ObjCVarvwSL_GetPaidInvoice_ByCheque.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_GetPaidInvoice_ByCheque.mCont_Desc = Convert.ToString(dr["Cont_Desc"].ToString());
                        ObjCVarvwSL_GetPaidInvoice_ByCheque.mIsAudited = Convert.ToBoolean(dr["IsAudited"].ToString());
                        lstCVarvwSL_GetPaidInvoice_ByCheque.Add(ObjCVarvwSL_GetPaidInvoice_ByCheque);
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
            lstCVarvwSL_GetPaidInvoice_ByCheque.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_GetPaidInvoice_ByCheque";
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
                        CVarvwSL_GetPaidInvoice_ByCheque ObjCVarvwSL_GetPaidInvoice_ByCheque = new CVarvwSL_GetPaidInvoice_ByCheque();
                        ObjCVarvwSL_GetPaidInvoice_ByCheque.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_GetPaidInvoice_ByCheque.mCont_Desc = Convert.ToString(dr["Cont_Desc"].ToString());
                        ObjCVarvwSL_GetPaidInvoice_ByCheque.mIsAudited = Convert.ToBoolean(dr["IsAudited"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_GetPaidInvoice_ByCheque.Add(ObjCVarvwSL_GetPaidInvoice_ByCheque);
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
