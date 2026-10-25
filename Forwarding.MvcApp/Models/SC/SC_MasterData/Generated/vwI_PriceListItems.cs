using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.MasterData.Generated
{
    [Serializable]
    public partial class CVarvwI_PriceListItems
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal String mLastItemPS_InvoiceInfo;
        internal Int32 mPackageTypeID;
        internal String mUnitName;
        internal Int32 mParentGroupID;
        internal Int32 mItemTypeID;
        internal String mItemGroupName;
        internal String mItemTypeName;
        internal Decimal mItemQtyInStore;
        internal String mItemStoresQty;
        internal Int32 mPriceListID;
        internal String mPriceListName;
        internal Decimal mPrice;
        internal Decimal mPriceListValue;
        internal Decimal mPriceListPrice;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String LocalName
        {
            get { return mLocalName; }
            set { mLocalName = value; }
        }
        public String LastItemPS_InvoiceInfo
        {
            get { return mLastItemPS_InvoiceInfo; }
            set { mLastItemPS_InvoiceInfo = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
        }
        public String UnitName
        {
            get { return mUnitName; }
            set { mUnitName = value; }
        }
        public Int32 ParentGroupID
        {
            get { return mParentGroupID; }
            set { mParentGroupID = value; }
        }
        public Int32 ItemTypeID
        {
            get { return mItemTypeID; }
            set { mItemTypeID = value; }
        }
        public String ItemGroupName
        {
            get { return mItemGroupName; }
            set { mItemGroupName = value; }
        }
        public String ItemTypeName
        {
            get { return mItemTypeName; }
            set { mItemTypeName = value; }
        }
        public Decimal ItemQtyInStore
        {
            get { return mItemQtyInStore; }
            set { mItemQtyInStore = value; }
        }
        public String ItemStoresQty
        {
            get { return mItemStoresQty; }
            set { mItemStoresQty = value; }
        }
        public Int32 PriceListID
        {
            get { return mPriceListID; }
            set { mPriceListID = value; }
        }
        public String PriceListName
        {
            get { return mPriceListName; }
            set { mPriceListName = value; }
        }
        public Decimal Price
        {
            get { return mPrice; }
            set { mPrice = value; }
        }
        public Decimal PriceListValue
        {
            get { return mPriceListValue; }
            set { mPriceListValue = value; }
        }
        public Decimal PriceListPrice
        {
            get { return mPriceListPrice; }
            set { mPriceListPrice = value; }
        }
        #endregion
    }

    public partial class CvwI_PriceListItems
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
        public List<CVarvwI_PriceListItems> lstCVarvwI_PriceListItems = new List<CVarvwI_PriceListItems>();
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
            lstCVarvwI_PriceListItems.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwI_PriceListItems";
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
                        CVarvwI_PriceListItems ObjCVarvwI_PriceListItems = new CVarvwI_PriceListItems();
                        ObjCVarvwI_PriceListItems.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwI_PriceListItems.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwI_PriceListItems.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwI_PriceListItems.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwI_PriceListItems.mLastItemPS_InvoiceInfo = Convert.ToString(dr["LastItemPS_InvoiceInfo"].ToString());
                        ObjCVarvwI_PriceListItems.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwI_PriceListItems.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwI_PriceListItems.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwI_PriceListItems.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwI_PriceListItems.mItemGroupName = Convert.ToString(dr["ItemGroupName"].ToString());
                        ObjCVarvwI_PriceListItems.mItemTypeName = Convert.ToString(dr["ItemTypeName"].ToString());
                        ObjCVarvwI_PriceListItems.mItemQtyInStore = Convert.ToDecimal(dr["ItemQtyInStore"].ToString());
                        ObjCVarvwI_PriceListItems.mItemStoresQty = Convert.ToString(dr["ItemStoresQty"].ToString());
                        ObjCVarvwI_PriceListItems.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        ObjCVarvwI_PriceListItems.mPriceListName = Convert.ToString(dr["PriceListName"].ToString());
                        ObjCVarvwI_PriceListItems.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwI_PriceListItems.mPriceListValue = Convert.ToDecimal(dr["PriceListValue"].ToString());
                        ObjCVarvwI_PriceListItems.mPriceListPrice = Convert.ToDecimal(dr["PriceListPrice"].ToString());
                        lstCVarvwI_PriceListItems.Add(ObjCVarvwI_PriceListItems);
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
            lstCVarvwI_PriceListItems.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwI_PriceListItems";
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
                        CVarvwI_PriceListItems ObjCVarvwI_PriceListItems = new CVarvwI_PriceListItems();
                        ObjCVarvwI_PriceListItems.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwI_PriceListItems.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwI_PriceListItems.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwI_PriceListItems.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwI_PriceListItems.mLastItemPS_InvoiceInfo = Convert.ToString(dr["LastItemPS_InvoiceInfo"].ToString());
                        ObjCVarvwI_PriceListItems.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwI_PriceListItems.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwI_PriceListItems.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwI_PriceListItems.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwI_PriceListItems.mItemGroupName = Convert.ToString(dr["ItemGroupName"].ToString());
                        ObjCVarvwI_PriceListItems.mItemTypeName = Convert.ToString(dr["ItemTypeName"].ToString());
                        ObjCVarvwI_PriceListItems.mItemQtyInStore = Convert.ToDecimal(dr["ItemQtyInStore"].ToString());
                        ObjCVarvwI_PriceListItems.mItemStoresQty = Convert.ToString(dr["ItemStoresQty"].ToString());
                        ObjCVarvwI_PriceListItems.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        ObjCVarvwI_PriceListItems.mPriceListName = Convert.ToString(dr["PriceListName"].ToString());
                        ObjCVarvwI_PriceListItems.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwI_PriceListItems.mPriceListValue = Convert.ToDecimal(dr["PriceListValue"].ToString());
                        ObjCVarvwI_PriceListItems.mPriceListPrice = Convert.ToDecimal(dr["PriceListPrice"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwI_PriceListItems.Add(ObjCVarvwI_PriceListItems);
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
