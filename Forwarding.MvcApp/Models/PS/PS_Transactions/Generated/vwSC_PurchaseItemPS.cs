using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public partial class CVarvwSC_PurchaseItemPS
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
        internal Int32 mItemQtyInStore;
        internal Int32 mLastSalePrice;
        internal Int32 mLastPurchasePrice;
        internal Int32 mstrLastPurchasesPrice;
        internal Int32 mItemStoresQty;
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
        public Int32 ItemQtyInStore
        {
            get { return mItemQtyInStore; }
            set { mItemQtyInStore = value; }
        }
        public Int32 LastSalePrice
        {
            get { return mLastSalePrice; }
            set { mLastSalePrice = value; }
        }
        public Int32 LastPurchasePrice
        {
            get { return mLastPurchasePrice; }
            set { mLastPurchasePrice = value; }
        }
        public Int32 strLastPurchasesPrice
        {
            get { return mstrLastPurchasesPrice; }
            set { mstrLastPurchasesPrice = value; }
        }
        public Int32 ItemStoresQty
        {
            get { return mItemStoresQty; }
            set { mItemStoresQty = value; }
        }
        #endregion
    }

    public partial class CvwSC_PurchaseItemPS
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
        public List<CVarvwSC_PurchaseItemPS> lstCVarvwSC_PurchaseItemPS = new List<CVarvwSC_PurchaseItemPS>();
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
            lstCVarvwSC_PurchaseItemPS.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSC_PurchaseItemPS";
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
                        CVarvwSC_PurchaseItemPS ObjCVarvwSC_PurchaseItemPS = new CVarvwSC_PurchaseItemPS();
                        ObjCVarvwSC_PurchaseItemPS.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mDepth = Convert.ToDecimal(dr["Depth"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mIMOClassID = Convert.ToInt32(dr["IMOClassID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mUN = Convert.ToInt32(dr["UN"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPG = Convert.ToInt32(dr["PG"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mIsAddedFromExcel = Convert.ToBoolean(dr["IsAddedFromExcel"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemUnits = Convert.ToString(dr["ItemUnits"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mMaxQty = Convert.ToDecimal(dr["MaxQty"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mMinQty = Convert.ToDecimal(dr["MinQty"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemGroupName = Convert.ToString(dr["ItemGroupName"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemTypeName = Convert.ToString(dr["ItemTypeName"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemQtyInStore = Convert.ToInt32(dr["ItemQtyInStore"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mLastSalePrice = Convert.ToInt32(dr["LastSalePrice"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mLastPurchasePrice = Convert.ToInt32(dr["LastPurchasePrice"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mstrLastPurchasesPrice = Convert.ToInt32(dr["strLastPurchasesPrice"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemStoresQty = Convert.ToInt32(dr["ItemStoresQty"].ToString());
                        lstCVarvwSC_PurchaseItemPS.Add(ObjCVarvwSC_PurchaseItemPS);
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
            lstCVarvwSC_PurchaseItemPS.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSC_PurchaseItemPS";
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
                        CVarvwSC_PurchaseItemPS ObjCVarvwSC_PurchaseItemPS = new CVarvwSC_PurchaseItemPS();
                        ObjCVarvwSC_PurchaseItemPS.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mDepth = Convert.ToDecimal(dr["Depth"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mIMOClassID = Convert.ToInt32(dr["IMOClassID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mUN = Convert.ToInt32(dr["UN"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPG = Convert.ToInt32(dr["PG"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mIsAddedFromExcel = Convert.ToBoolean(dr["IsAddedFromExcel"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemUnits = Convert.ToString(dr["ItemUnits"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mMaxQty = Convert.ToDecimal(dr["MaxQty"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mMinQty = Convert.ToDecimal(dr["MinQty"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemGroupName = Convert.ToString(dr["ItemGroupName"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemTypeName = Convert.ToString(dr["ItemTypeName"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemQtyInStore = Convert.ToInt32(dr["ItemQtyInStore"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mLastSalePrice = Convert.ToInt32(dr["LastSalePrice"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mLastPurchasePrice = Convert.ToInt32(dr["LastPurchasePrice"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mstrLastPurchasesPrice = Convert.ToInt32(dr["strLastPurchasesPrice"].ToString());
                        ObjCVarvwSC_PurchaseItemPS.mItemStoresQty = Convert.ToInt32(dr["ItemStoresQty"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_PurchaseItemPS.Add(ObjCVarvwSC_PurchaseItemPS);
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
