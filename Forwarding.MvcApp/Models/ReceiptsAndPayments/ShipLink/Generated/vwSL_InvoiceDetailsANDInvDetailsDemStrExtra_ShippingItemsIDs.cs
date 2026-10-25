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
    public partial class CVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mItemID;
        internal Boolean mIsFreightItem;
        internal Int64 mInvoiceHeaderID;
        #endregion

        #region "Methods"
        public Int32 ItemID
        {
            get { return mItemID; }
            set { mItemID = value; }
        }
        public Boolean IsFreightItem
        {
            get { return mIsFreightItem; }
            set { mIsFreightItem = value; }
        }
        public Int64 InvoiceHeaderID
        {
            get { return mInvoiceHeaderID; }
            set { mInvoiceHeaderID = value; }
        }
        #endregion
    }

    public partial class CvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs
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
        public List<CVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs> lstCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs = new List<CVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs>();
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
            lstCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs";
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
                        CVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs = new CVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs();
                        ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.mItemID = Convert.ToInt32(dr["ItemID"].ToString());
                        ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.mIsFreightItem = Convert.ToBoolean(dr["IsFreightItem"].ToString());
                        ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.mInvoiceHeaderID = Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        lstCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.Add(ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs);
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
            lstCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs";
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
                        CVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs = new CVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs();
                        ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.mItemID = Convert.ToInt32(dr["ItemID"].ToString());
                        ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.mIsFreightItem = Convert.ToBoolean(dr["IsFreightItem"].ToString());
                        ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.mInvoiceHeaderID = Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.Add(ObjCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs);
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
