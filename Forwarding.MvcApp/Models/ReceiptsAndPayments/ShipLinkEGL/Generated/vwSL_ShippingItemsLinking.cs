using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated
{
    [Serializable]
    public partial class CVarvwSL_ShippingItemsLinking
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int32 mShiplinkItemID;
        internal String mShipLinkItemName;
        internal Int32 mRevenueAccountID;
        internal String mRevenueAccountName;
        internal Int32 mCostCenterID;
        internal String mCostCenterName;
        internal Boolean mIsFreightItem;
        internal String mImportExport;
        internal Int32 mVoyageAccountID;
        internal Int32 mVoyageSubAccountID;
        internal String mVoyageSubAccountName;
        internal Int32 mRevenueSubAccountID20;
        internal String mRevenueSubAccountName20;
        internal Int32 mRevenueSubAccountID40;
        internal String mRevenueSubAccountName40;
        internal Int32 mLineID;
        internal String mLineName;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 ShiplinkItemID
        {
            get { return mShiplinkItemID; }
            set { mShiplinkItemID = value; }
        }
        public String ShipLinkItemName
        {
            get { return mShipLinkItemName; }
            set { mShipLinkItemName = value; }
        }
        public Int32 RevenueAccountID
        {
            get { return mRevenueAccountID; }
            set { mRevenueAccountID = value; }
        }
        public String RevenueAccountName
        {
            get { return mRevenueAccountName; }
            set { mRevenueAccountName = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mCostCenterName = value; }
        }
        public Boolean IsFreightItem
        {
            get { return mIsFreightItem; }
            set { mIsFreightItem = value; }
        }
        public String ImportExport
        {
            get { return mImportExport; }
            set { mImportExport = value; }
        }
        public Int32 VoyageAccountID
        {
            get { return mVoyageAccountID; }
            set { mVoyageAccountID = value; }
        }
        public Int32 VoyageSubAccountID
        {
            get { return mVoyageSubAccountID; }
            set { mVoyageSubAccountID = value; }
        }
        public String VoyageSubAccountName
        {
            get { return mVoyageSubAccountName; }
            set { mVoyageSubAccountName = value; }
        }
        public Int32 RevenueSubAccountID20
        {
            get { return mRevenueSubAccountID20; }
            set { mRevenueSubAccountID20 = value; }
        }
        public String RevenueSubAccountName20
        {
            get { return mRevenueSubAccountName20; }
            set { mRevenueSubAccountName20 = value; }
        }
        public Int32 RevenueSubAccountID40
        {
            get { return mRevenueSubAccountID40; }
            set { mRevenueSubAccountID40 = value; }
        }
        public String RevenueSubAccountName40
        {
            get { return mRevenueSubAccountName40; }
            set { mRevenueSubAccountName40 = value; }
        }

        public Int32 LineID
        {
            get { return mLineID; }
            set { mLineID = value; }
        }
        public String LineName
        {
            get { return mLineName; }
            set { mLineName = value; }
        }
        #endregion
    }

    public partial class CvwSL_ShippingItemsLinking
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
        public List<CVarvwSL_ShippingItemsLinking> lstCVarvwSL_ShippingItemsLinking = new List<CVarvwSL_ShippingItemsLinking>();
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
            lstCVarvwSL_ShippingItemsLinking.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_ShippingItemsLinking";
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
                        CVarvwSL_ShippingItemsLinking ObjCVarvwSL_ShippingItemsLinking = new CVarvwSL_ShippingItemsLinking();
                        ObjCVarvwSL_ShippingItemsLinking.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mShiplinkItemID = Convert.ToInt32(dr["ShiplinkItemID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mShipLinkItemName = Convert.ToString(dr["ShipLinkItemName"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueAccountID = Convert.ToInt32(dr["RevenueAccountID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueAccountName = Convert.ToString(dr["RevenueAccountName"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mIsFreightItem = Convert.ToBoolean(dr["IsFreightItem"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mImportExport = Convert.ToString(dr["ImportExport"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mVoyageAccountID = Convert.ToInt32(dr["VoyageAccountID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mVoyageSubAccountID = Convert.ToInt32(dr["VoyageSubAccountID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mVoyageSubAccountName = Convert.ToString(dr["VoyageSubAccountName"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueSubAccountID20 = Convert.ToInt32(dr["RevenueSubAccountID20"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueSubAccountName20 = Convert.ToString(dr["RevenueSubAccountName20"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueSubAccountID40 = Convert.ToInt32(dr["RevenueSubAccountID40"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueSubAccountName40 = Convert.ToString(dr["RevenueSubAccountName40"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mLineName = Convert.ToString(dr["LineName"].ToString());
                        lstCVarvwSL_ShippingItemsLinking.Add(ObjCVarvwSL_ShippingItemsLinking);
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
            lstCVarvwSL_ShippingItemsLinking.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_ShippingItemsLinking";
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
                        CVarvwSL_ShippingItemsLinking ObjCVarvwSL_ShippingItemsLinking = new CVarvwSL_ShippingItemsLinking();
                        ObjCVarvwSL_ShippingItemsLinking.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mShiplinkItemID = Convert.ToInt32(dr["ShiplinkItemID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mShipLinkItemName = Convert.ToString(dr["ShipLinkItemName"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueAccountID = Convert.ToInt32(dr["RevenueAccountID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueAccountName = Convert.ToString(dr["RevenueAccountName"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mIsFreightItem = Convert.ToBoolean(dr["IsFreightItem"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mImportExport = Convert.ToString(dr["ImportExport"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mVoyageAccountID = Convert.ToInt32(dr["VoyageAccountID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mVoyageSubAccountID = Convert.ToInt32(dr["VoyageSubAccountID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mVoyageSubAccountName = Convert.ToString(dr["VoyageSubAccountName"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueSubAccountID20 = Convert.ToInt32(dr["RevenueSubAccountID20"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueSubAccountName20 = Convert.ToString(dr["RevenueSubAccountName20"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueSubAccountID40 = Convert.ToInt32(dr["RevenueSubAccountID40"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mRevenueSubAccountName40 = Convert.ToString(dr["RevenueSubAccountName40"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwSL_ShippingItemsLinking.mLineName = Convert.ToString(dr["LineName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_ShippingItemsLinking.Add(ObjCVarvwSL_ShippingItemsLinking);
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
