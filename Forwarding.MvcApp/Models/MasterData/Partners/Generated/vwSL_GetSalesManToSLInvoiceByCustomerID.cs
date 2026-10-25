using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public partial class CVarvwSL_GetSalesManToSLInvoiceByCustomerID
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCustomerID;
        internal Int32 mID;
        internal String mName;
        internal Boolean misDefault;
        #endregion

        #region "Methods"
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
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
        public Boolean isDefault
        {
            get { return misDefault; }
            set { misDefault = value; }
        }
        #endregion
    }

    public partial class CvwSL_GetSalesManToSLInvoiceByCustomerID
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
        public List<CVarvwSL_GetSalesManToSLInvoiceByCustomerID> lstCVarvwSL_GetSalesManToSLInvoiceByCustomerID = new List<CVarvwSL_GetSalesManToSLInvoiceByCustomerID>();
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
            lstCVarvwSL_GetSalesManToSLInvoiceByCustomerID.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_GetSalesManToSLInvoiceByCustomerID";
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
                        CVarvwSL_GetSalesManToSLInvoiceByCustomerID ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID = new CVarvwSL_GetSalesManToSLInvoiceByCustomerID();
                        ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID.misDefault = Convert.ToBoolean(dr["isDefault"].ToString());
                        lstCVarvwSL_GetSalesManToSLInvoiceByCustomerID.Add(ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID);
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
            lstCVarvwSL_GetSalesManToSLInvoiceByCustomerID.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_GetSalesManToSLInvoiceByCustomerID";
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
                        CVarvwSL_GetSalesManToSLInvoiceByCustomerID ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID = new CVarvwSL_GetSalesManToSLInvoiceByCustomerID();
                        ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID.misDefault = Convert.ToBoolean(dr["isDefault"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_GetSalesManToSLInvoiceByCustomerID.Add(ObjCVarvwSL_GetSalesManToSLInvoiceByCustomerID);
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
