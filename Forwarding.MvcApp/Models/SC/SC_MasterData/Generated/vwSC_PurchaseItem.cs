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
    public partial class CVarvwSC_PurchaseItem
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Decimal mPrice;
        internal Int32 mCurrencyID;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;
        internal Int32 mCostCenterID;
        internal Int32 mViewOrder;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mPartNumber;
        internal String mHSCode;
        internal Int32 mCommodityID;
        internal Int32 mPackageTypeID;
        internal Decimal mGrossWeight;
        internal Decimal mNetWeight;
        internal Int32 mWeightUnitID;
        internal Decimal mWidth;
        internal Decimal mDepth;
        internal Decimal mHeight;
        internal Int32 mLengthUnitID;
        internal Decimal mVolume;
        internal Int32 mVolumeUnitID;
        internal Boolean mIsIMO;
        internal Int32 mIMOClassID;
        internal Int32 mUN;
        internal Int32 mPG;
        internal Boolean mIsAddedFromExcel;
        internal String mItemUnits;
        internal Int32 mItemTypeID;
        internal Int32 mParentGroupID;
        internal Decimal mMaxQty;
        internal Decimal mMinQty;
        internal String mItemGroupName;
        internal String mItemTypeName;
        internal String mPackageTypeName;
        internal Decimal mItemQtyInStore;
        internal Decimal mLastSalePrice;
        internal Decimal mLastPurchasePrice;
        internal String mstrLastPurchasesPrice;
        internal String mItemStoresQty;
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
        public Decimal Price
        {
            get { return mPrice; }
            set { mPrice = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mCostCenterID = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mViewOrder = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public String PartNumber
        {
            get { return mPartNumber; }
            set { mPartNumber = value; }
        }
        public String HSCode
        {
            get { return mHSCode; }
            set { mHSCode = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mCommodityID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mGrossWeight = value; }
        }
        public Decimal NetWeight
        {
            get { return mNetWeight; }
            set { mNetWeight = value; }
        }
        public Int32 WeightUnitID
        {
            get { return mWeightUnitID; }
            set { mWeightUnitID = value; }
        }
        public Decimal Width
        {
            get { return mWidth; }
            set { mWidth = value; }
        }
        public Decimal Depth
        {
            get { return mDepth; }
            set { mDepth = value; }
        }
        public Decimal Height
        {
            get { return mHeight; }
            set { mHeight = value; }
        }
        public Int32 LengthUnitID
        {
            get { return mLengthUnitID; }
            set { mLengthUnitID = value; }
        }
        public Decimal Volume
        {
            get { return mVolume; }
            set { mVolume = value; }
        }
        public Int32 VolumeUnitID
        {
            get { return mVolumeUnitID; }
            set { mVolumeUnitID = value; }
        }
        public Boolean IsIMO
        {
            get { return mIsIMO; }
            set { mIsIMO = value; }
        }
        public Int32 IMOClassID
        {
            get { return mIMOClassID; }
            set { mIMOClassID = value; }
        }
        public Int32 UN
        {
            get { return mUN; }
            set { mUN = value; }
        }
        public Int32 PG
        {
            get { return mPG; }
            set { mPG = value; }
        }
        public Boolean IsAddedFromExcel
        {
            get { return mIsAddedFromExcel; }
            set { mIsAddedFromExcel = value; }
        }
        public String ItemUnits
        {
            get { return mItemUnits; }
            set { mItemUnits = value; }
        }
        public Int32 ItemTypeID
        {
            get { return mItemTypeID; }
            set { mItemTypeID = value; }
        }
        public Int32 ParentGroupID
        {
            get { return mParentGroupID; }
            set { mParentGroupID = value; }
        }
        public Decimal MaxQty
        {
            get { return mMaxQty; }
            set { mMaxQty = value; }
        }
        public Decimal MinQty
        {
            get { return mMinQty; }
            set { mMinQty = value; }
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
        public String PackageTypeName
        {
            get { return mPackageTypeName; }
            set { mPackageTypeName = value; }
        }
        public Decimal ItemQtyInStore
        {
            get { return mItemQtyInStore; }
            set { mItemQtyInStore = value; }
        }
        public Decimal LastSalePrice
        {
            get { return mLastSalePrice; }
            set { mLastSalePrice = value; }
        }
        public Decimal LastPurchasePrice
        {
            get { return mLastPurchasePrice; }
            set { mLastPurchasePrice = value; }
        }
        public String strLastPurchasesPrice
        {
            get { return mstrLastPurchasesPrice; }
            set { mstrLastPurchasesPrice = value; }
        }
        public String ItemStoresQty
        {
            get { return mItemStoresQty; }
            set { mItemStoresQty = value; }
        }
        #endregion
    }

    public partial class CvwSC_PurchaseItem
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
        public List<CVarvwSC_PurchaseItem> lstCVarvwSC_PurchaseItem = new List<CVarvwSC_PurchaseItem>();
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
            lstCVarvwSC_PurchaseItem.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSC_PurchaseItem";
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
                        CVarvwSC_PurchaseItem ObjCVarvwSC_PurchaseItem = new CVarvwSC_PurchaseItem();
                        ObjCVarvwSC_PurchaseItem.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_PurchaseItem.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSC_PurchaseItem.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwSC_PurchaseItem.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSC_PurchaseItem.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarvwSC_PurchaseItem.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwSC_PurchaseItem.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwSC_PurchaseItem.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwSC_PurchaseItem.mDepth = Convert.ToDecimal(dr["Depth"].ToString());
                        ObjCVarvwSC_PurchaseItem.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwSC_PurchaseItem.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwSC_PurchaseItem.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarvwSC_PurchaseItem.mIMOClassID = Convert.ToInt32(dr["IMOClassID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mUN = Convert.ToInt32(dr["UN"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPG = Convert.ToInt32(dr["PG"].ToString());
                        ObjCVarvwSC_PurchaseItem.mIsAddedFromExcel = Convert.ToBoolean(dr["IsAddedFromExcel"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemUnits = Convert.ToString(dr["ItemUnits"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mMaxQty = Convert.ToDecimal(dr["MaxQty"].ToString());
                        ObjCVarvwSC_PurchaseItem.mMinQty = Convert.ToDecimal(dr["MinQty"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemGroupName = Convert.ToString(dr["ItemGroupName"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemTypeName = Convert.ToString(dr["ItemTypeName"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemQtyInStore = Convert.ToDecimal(dr["ItemQtyInStore"].ToString());
                        ObjCVarvwSC_PurchaseItem.mLastSalePrice = Convert.ToDecimal(dr["LastSalePrice"].ToString());
                        ObjCVarvwSC_PurchaseItem.mLastPurchasePrice = Convert.ToDecimal(dr["LastPurchasePrice"].ToString());
                        ObjCVarvwSC_PurchaseItem.mstrLastPurchasesPrice = Convert.ToString(dr["strLastPurchasesPrice"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemStoresQty = Convert.ToString(dr["ItemStoresQty"].ToString());
                        lstCVarvwSC_PurchaseItem.Add(ObjCVarvwSC_PurchaseItem);
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
            lstCVarvwSC_PurchaseItem.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSC_PurchaseItem";
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
                        CVarvwSC_PurchaseItem ObjCVarvwSC_PurchaseItem = new CVarvwSC_PurchaseItem();
                        ObjCVarvwSC_PurchaseItem.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_PurchaseItem.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSC_PurchaseItem.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwSC_PurchaseItem.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSC_PurchaseItem.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarvwSC_PurchaseItem.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarvwSC_PurchaseItem.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwSC_PurchaseItem.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwSC_PurchaseItem.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwSC_PurchaseItem.mDepth = Convert.ToDecimal(dr["Depth"].ToString());
                        ObjCVarvwSC_PurchaseItem.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwSC_PurchaseItem.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwSC_PurchaseItem.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarvwSC_PurchaseItem.mIMOClassID = Convert.ToInt32(dr["IMOClassID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mUN = Convert.ToInt32(dr["UN"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPG = Convert.ToInt32(dr["PG"].ToString());
                        ObjCVarvwSC_PurchaseItem.mIsAddedFromExcel = Convert.ToBoolean(dr["IsAddedFromExcel"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemUnits = Convert.ToString(dr["ItemUnits"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwSC_PurchaseItem.mMaxQty = Convert.ToDecimal(dr["MaxQty"].ToString());
                        ObjCVarvwSC_PurchaseItem.mMinQty = Convert.ToDecimal(dr["MinQty"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemGroupName = Convert.ToString(dr["ItemGroupName"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemTypeName = Convert.ToString(dr["ItemTypeName"].ToString());
                        ObjCVarvwSC_PurchaseItem.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemQtyInStore = Convert.ToDecimal(dr["ItemQtyInStore"].ToString());
                        ObjCVarvwSC_PurchaseItem.mLastSalePrice = Convert.ToDecimal(dr["LastSalePrice"].ToString());
                        ObjCVarvwSC_PurchaseItem.mLastPurchasePrice = Convert.ToDecimal(dr["LastPurchasePrice"].ToString());
                        ObjCVarvwSC_PurchaseItem.mstrLastPurchasesPrice = Convert.ToString(dr["strLastPurchasesPrice"].ToString());
                        ObjCVarvwSC_PurchaseItem.mItemStoresQty = Convert.ToString(dr["ItemStoresQty"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_PurchaseItem.Add(ObjCVarvwSC_PurchaseItem);
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
