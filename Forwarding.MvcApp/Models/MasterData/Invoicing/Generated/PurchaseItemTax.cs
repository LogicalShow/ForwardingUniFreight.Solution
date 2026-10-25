using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Invoicing.Generated
{
    [Serializable]
    public class CPKPurchaseItemTax
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
    public partial class CVarPurchaseItemTax : CPKPurchaseItemTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
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
        internal Boolean mIsFlexi;
        internal Int32 mPreferredAreaID;
        internal Boolean mByExpireDate;
        internal Boolean mBySerialNo;
        internal Boolean mByLotNo;
        internal Boolean mByVehicle;
        internal Int32 mParentGroupID;
        internal Int32 mItemTypeID;
        internal Decimal mMaxQty;
        internal Decimal mMinQty;
        internal String mChassisNumber;
        internal String mLotNumber;
        internal String mSerialNumber;
        internal Int64 mOperationID;
        internal Boolean mIsVehicle;
        internal Int32 mEquipmentModelID;
        internal String mMotorNumber;
        internal Int32 mReturnedItemID;
        internal Decimal mReturnedQuantity;
        internal Decimal mExpectedAlarm;
        internal Decimal mActualAlarm;
        internal Decimal mMinimumLimit;
        internal Decimal mMaximumLimit;
        internal Decimal mReOrderlimit;
        internal String mModelNumber;
        internal String mBrandName;
        internal String mProductType;
        internal Boolean mIsFragile;
        internal Decimal mStockUnitQuantity;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public String LocalName
        {
            get { return mLocalName; }
            set { mIsChanges = true; mLocalName = value; }
        }
        public Decimal Price
        {
            get { return mPrice; }
            set { mIsChanges = true; mPrice = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mIsChanges = true; mViewOrder = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public String PartNumber
        {
            get { return mPartNumber; }
            set { mIsChanges = true; mPartNumber = value; }
        }
        public String HSCode
        {
            get { return mHSCode; }
            set { mIsChanges = true; mHSCode = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mIsChanges = true; mCommodityID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mIsChanges = true; mGrossWeight = value; }
        }
        public Decimal NetWeight
        {
            get { return mNetWeight; }
            set { mIsChanges = true; mNetWeight = value; }
        }
        public Int32 WeightUnitID
        {
            get { return mWeightUnitID; }
            set { mIsChanges = true; mWeightUnitID = value; }
        }
        public Decimal Width
        {
            get { return mWidth; }
            set { mIsChanges = true; mWidth = value; }
        }
        public Decimal Depth
        {
            get { return mDepth; }
            set { mIsChanges = true; mDepth = value; }
        }
        public Decimal Height
        {
            get { return mHeight; }
            set { mIsChanges = true; mHeight = value; }
        }
        public Int32 LengthUnitID
        {
            get { return mLengthUnitID; }
            set { mIsChanges = true; mLengthUnitID = value; }
        }
        public Decimal Volume
        {
            get { return mVolume; }
            set { mIsChanges = true; mVolume = value; }
        }
        public Int32 VolumeUnitID
        {
            get { return mVolumeUnitID; }
            set { mIsChanges = true; mVolumeUnitID = value; }
        }
        public Boolean IsIMO
        {
            get { return mIsIMO; }
            set { mIsChanges = true; mIsIMO = value; }
        }
        public Int32 IMOClassID
        {
            get { return mIMOClassID; }
            set { mIsChanges = true; mIMOClassID = value; }
        }
        public Int32 UN
        {
            get { return mUN; }
            set { mIsChanges = true; mUN = value; }
        }
        public Int32 PG
        {
            get { return mPG; }
            set { mIsChanges = true; mPG = value; }
        }
        public Boolean IsAddedFromExcel
        {
            get { return mIsAddedFromExcel; }
            set { mIsChanges = true; mIsAddedFromExcel = value; }
        }
        public Boolean IsFlexi
        {
            get { return mIsFlexi; }
            set { mIsChanges = true; mIsFlexi = value; }
        }
        public Int32 PreferredAreaID
        {
            get { return mPreferredAreaID; }
            set { mIsChanges = true; mPreferredAreaID = value; }
        }
        public Boolean ByExpireDate
        {
            get { return mByExpireDate; }
            set { mIsChanges = true; mByExpireDate = value; }
        }
        public Boolean BySerialNo
        {
            get { return mBySerialNo; }
            set { mIsChanges = true; mBySerialNo = value; }
        }
        public Boolean ByLotNo
        {
            get { return mByLotNo; }
            set { mIsChanges = true; mByLotNo = value; }
        }
        public Boolean ByVehicle
        {
            get { return mByVehicle; }
            set { mIsChanges = true; mByVehicle = value; }
        }
        public Int32 ParentGroupID
        {
            get { return mParentGroupID; }
            set { mIsChanges = true; mParentGroupID = value; }
        }
        public Int32 ItemTypeID
        {
            get { return mItemTypeID; }
            set { mIsChanges = true; mItemTypeID = value; }
        }
        public Decimal MaxQty
        {
            get { return mMaxQty; }
            set { mIsChanges = true; mMaxQty = value; }
        }
        public Decimal MinQty
        {
            get { return mMinQty; }
            set { mIsChanges = true; mMinQty = value; }
        }
        public String ChassisNumber
        {
            get { return mChassisNumber; }
            set { mIsChanges = true; mChassisNumber = value; }
        }
        public String LotNumber
        {
            get { return mLotNumber; }
            set { mIsChanges = true; mLotNumber = value; }
        }
        public String SerialNumber
        {
            get { return mSerialNumber; }
            set { mIsChanges = true; mSerialNumber = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Boolean IsVehicle
        {
            get { return mIsVehicle; }
            set { mIsChanges = true; mIsVehicle = value; }
        }
        public Int32 EquipmentModelID
        {
            get { return mEquipmentModelID; }
            set { mIsChanges = true; mEquipmentModelID = value; }
        }
        public String MotorNumber
        {
            get { return mMotorNumber; }
            set { mIsChanges = true; mMotorNumber = value; }
        }
        public Int32 ReturnedItemID
        {
            get { return mReturnedItemID; }
            set { mIsChanges = true; mReturnedItemID = value; }
        }
        public Decimal ReturnedQuantity
        {
            get { return mReturnedQuantity; }
            set { mIsChanges = true; mReturnedQuantity = value; }
        }
        public Decimal ExpectedAlarm
        {
            get { return mExpectedAlarm; }
            set { mIsChanges = true; mExpectedAlarm = value; }
        }
        public Decimal ActualAlarm
        {
            get { return mActualAlarm; }
            set { mIsChanges = true; mActualAlarm = value; }
        }
        public Decimal MinimumLimit
        {
            get { return mMinimumLimit; }
            set { mIsChanges = true; mMinimumLimit = value; }
        }
        public Decimal MaximumLimit
        {
            get { return mMaximumLimit; }
            set { mIsChanges = true; mMaximumLimit = value; }
        }
        public Decimal ReOrderlimit
        {
            get { return mReOrderlimit; }
            set { mIsChanges = true; mReOrderlimit = value; }
        }
        public String ModelNumber
        {
            get { return mModelNumber; }
            set { mIsChanges = true; mModelNumber = value; }
        }
        public String BrandName
        {
            get { return mBrandName; }
            set { mIsChanges = true; mBrandName = value; }
        }
        public String ProductType
        {
            get { return mProductType; }
            set { mIsChanges = true; mProductType = value; }
        }
        public Boolean IsFragile
        {
            get { return mIsFragile; }
            set { mIsChanges = true; mIsFragile = value; }
        }
        public Decimal StockUnitQuantity
        {
            get { return mStockUnitQuantity; }
            set { mIsChanges = true; mStockUnitQuantity = value; }
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

    public partial class CPurchaseItemTax
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
        public List<CVarPurchaseItemTax> lstCVarPurchaseItem = new List<CVarPurchaseItemTax>();
        public List<CPKPurchaseItemTax> lstDeletedCPKPurchaseItem = new List<CPKPurchaseItemTax>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarPurchaseItem.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPurchaseItem";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPurchaseItem";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarPurchaseItemTax ObjCVarPurchaseItem = new CVarPurchaseItemTax();
                        ObjCVarPurchaseItem.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPurchaseItem.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarPurchaseItem.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarPurchaseItem.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarPurchaseItem.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarPurchaseItem.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPurchaseItem.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarPurchaseItem.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarPurchaseItem.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPurchaseItem.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarPurchaseItem.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPurchaseItem.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPurchaseItem.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPurchaseItem.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPurchaseItem.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPurchaseItem.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarPurchaseItem.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarPurchaseItem.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarPurchaseItem.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarPurchaseItem.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarPurchaseItem.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarPurchaseItem.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarPurchaseItem.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarPurchaseItem.mDepth = Convert.ToDecimal(dr["Depth"].ToString());
                        ObjCVarPurchaseItem.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarPurchaseItem.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarPurchaseItem.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarPurchaseItem.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarPurchaseItem.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarPurchaseItem.mIMOClassID = Convert.ToInt32(dr["IMOClassID"].ToString());
                        ObjCVarPurchaseItem.mUN = Convert.ToInt32(dr["UN"].ToString());
                        ObjCVarPurchaseItem.mPG = Convert.ToInt32(dr["PG"].ToString());
                        ObjCVarPurchaseItem.mIsAddedFromExcel = Convert.ToBoolean(dr["IsAddedFromExcel"].ToString());
                        ObjCVarPurchaseItem.mIsFlexi = Convert.ToBoolean(dr["IsFlexi"].ToString());
                        ObjCVarPurchaseItem.mPreferredAreaID = Convert.ToInt32(dr["PreferredAreaID"].ToString());
                        ObjCVarPurchaseItem.mByExpireDate = Convert.ToBoolean(dr["ByExpireDate"].ToString());
                        ObjCVarPurchaseItem.mBySerialNo = Convert.ToBoolean(dr["BySerialNo"].ToString());
                        ObjCVarPurchaseItem.mByLotNo = Convert.ToBoolean(dr["ByLotNo"].ToString());
                        ObjCVarPurchaseItem.mByVehicle = Convert.ToBoolean(dr["ByVehicle"].ToString());
                        ObjCVarPurchaseItem.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarPurchaseItem.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarPurchaseItem.mMaxQty = Convert.ToDecimal(dr["MaxQty"].ToString());
                        ObjCVarPurchaseItem.mMinQty = Convert.ToDecimal(dr["MinQty"].ToString());
                        ObjCVarPurchaseItem.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarPurchaseItem.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarPurchaseItem.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
                        ObjCVarPurchaseItem.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarPurchaseItem.mIsVehicle = Convert.ToBoolean(dr["IsVehicle"].ToString());
                        ObjCVarPurchaseItem.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarPurchaseItem.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarPurchaseItem.mReturnedItemID = Convert.ToInt32(dr["ReturnedItemID"].ToString());
                        ObjCVarPurchaseItem.mReturnedQuantity = Convert.ToDecimal(dr["ReturnedQuantity"].ToString());
                        ObjCVarPurchaseItem.mExpectedAlarm = Convert.ToDecimal(dr["ExpectedAlarm"].ToString());
                        ObjCVarPurchaseItem.mActualAlarm = Convert.ToDecimal(dr["ActualAlarm"].ToString());
                        ObjCVarPurchaseItem.mMinimumLimit = Convert.ToDecimal(dr["MinimumLimit"].ToString());
                        ObjCVarPurchaseItem.mMaximumLimit = Convert.ToDecimal(dr["MaximumLimit"].ToString());
                        ObjCVarPurchaseItem.mReOrderlimit = Convert.ToDecimal(dr["ReOrderlimit"].ToString());
                        ObjCVarPurchaseItem.mModelNumber = Convert.ToString(dr["ModelNumber"].ToString());
                        ObjCVarPurchaseItem.mBrandName = Convert.ToString(dr["BrandName"].ToString());
                        ObjCVarPurchaseItem.mProductType = Convert.ToString(dr["ProductType"].ToString());
                        ObjCVarPurchaseItem.mIsFragile = Convert.ToBoolean(dr["IsFragile"].ToString());
                        ObjCVarPurchaseItem.mStockUnitQuantity = Convert.ToDecimal(dr["StockUnitQuantity"].ToString());
                        lstCVarPurchaseItem.Add(ObjCVarPurchaseItem);
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
            lstCVarPurchaseItem.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPurchaseItem";
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
                        CVarPurchaseItemTax ObjCVarPurchaseItem = new CVarPurchaseItemTax();
                        ObjCVarPurchaseItem.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPurchaseItem.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarPurchaseItem.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarPurchaseItem.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarPurchaseItem.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarPurchaseItem.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPurchaseItem.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarPurchaseItem.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarPurchaseItem.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPurchaseItem.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarPurchaseItem.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPurchaseItem.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarPurchaseItem.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarPurchaseItem.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarPurchaseItem.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarPurchaseItem.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarPurchaseItem.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarPurchaseItem.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarPurchaseItem.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarPurchaseItem.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarPurchaseItem.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarPurchaseItem.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarPurchaseItem.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarPurchaseItem.mDepth = Convert.ToDecimal(dr["Depth"].ToString());
                        ObjCVarPurchaseItem.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarPurchaseItem.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarPurchaseItem.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarPurchaseItem.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarPurchaseItem.mIsIMO = Convert.ToBoolean(dr["IsIMO"].ToString());
                        ObjCVarPurchaseItem.mIMOClassID = Convert.ToInt32(dr["IMOClassID"].ToString());
                        ObjCVarPurchaseItem.mUN = Convert.ToInt32(dr["UN"].ToString());
                        ObjCVarPurchaseItem.mPG = Convert.ToInt32(dr["PG"].ToString());
                        ObjCVarPurchaseItem.mIsAddedFromExcel = Convert.ToBoolean(dr["IsAddedFromExcel"].ToString());
                        ObjCVarPurchaseItem.mIsFlexi = Convert.ToBoolean(dr["IsFlexi"].ToString());
                        ObjCVarPurchaseItem.mPreferredAreaID = Convert.ToInt32(dr["PreferredAreaID"].ToString());
                        ObjCVarPurchaseItem.mByExpireDate = Convert.ToBoolean(dr["ByExpireDate"].ToString());
                        ObjCVarPurchaseItem.mBySerialNo = Convert.ToBoolean(dr["BySerialNo"].ToString());
                        ObjCVarPurchaseItem.mByLotNo = Convert.ToBoolean(dr["ByLotNo"].ToString());
                        ObjCVarPurchaseItem.mByVehicle = Convert.ToBoolean(dr["ByVehicle"].ToString());
                        ObjCVarPurchaseItem.mParentGroupID = Convert.ToInt32(dr["ParentGroupID"].ToString());
                        ObjCVarPurchaseItem.mItemTypeID = Convert.ToInt32(dr["ItemTypeID"].ToString());
                        ObjCVarPurchaseItem.mMaxQty = Convert.ToDecimal(dr["MaxQty"].ToString());
                        ObjCVarPurchaseItem.mMinQty = Convert.ToDecimal(dr["MinQty"].ToString());
                        ObjCVarPurchaseItem.mChassisNumber = Convert.ToString(dr["ChassisNumber"].ToString());
                        ObjCVarPurchaseItem.mLotNumber = Convert.ToString(dr["LotNumber"].ToString());
                        ObjCVarPurchaseItem.mSerialNumber = Convert.ToString(dr["SerialNumber"].ToString());
                        ObjCVarPurchaseItem.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarPurchaseItem.mIsVehicle = Convert.ToBoolean(dr["IsVehicle"].ToString());
                        ObjCVarPurchaseItem.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarPurchaseItem.mMotorNumber = Convert.ToString(dr["MotorNumber"].ToString());
                        ObjCVarPurchaseItem.mReturnedItemID = Convert.ToInt32(dr["ReturnedItemID"].ToString());
                        ObjCVarPurchaseItem.mReturnedQuantity = Convert.ToDecimal(dr["ReturnedQuantity"].ToString());
                        ObjCVarPurchaseItem.mExpectedAlarm = Convert.ToDecimal(dr["ExpectedAlarm"].ToString());
                        ObjCVarPurchaseItem.mActualAlarm = Convert.ToDecimal(dr["ActualAlarm"].ToString());
                        ObjCVarPurchaseItem.mMinimumLimit = Convert.ToDecimal(dr["MinimumLimit"].ToString());
                        ObjCVarPurchaseItem.mMaximumLimit = Convert.ToDecimal(dr["MaximumLimit"].ToString());
                        ObjCVarPurchaseItem.mReOrderlimit = Convert.ToDecimal(dr["ReOrderlimit"].ToString());
                        ObjCVarPurchaseItem.mModelNumber = Convert.ToString(dr["ModelNumber"].ToString());
                        ObjCVarPurchaseItem.mBrandName = Convert.ToString(dr["BrandName"].ToString());
                        ObjCVarPurchaseItem.mProductType = Convert.ToString(dr["ProductType"].ToString());
                        ObjCVarPurchaseItem.mIsFragile = Convert.ToBoolean(dr["IsFragile"].ToString());
                        ObjCVarPurchaseItem.mStockUnitQuantity = Convert.ToDecimal(dr["StockUnitQuantity"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPurchaseItem.Add(ObjCVarPurchaseItem);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListPurchaseItem";
                else
                    Com.CommandText = "[dbo].UpdateListPurchaseItem";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKPurchaseItemTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPurchaseItem";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPurchaseItemTax ObjCPKPurchaseItem in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPurchaseItem.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarPurchaseItemTax> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ViewOrder", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PartNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@HSCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CommodityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GrossWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@NetWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@WeightUnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Width", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Depth", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Height", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LengthUnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Volume", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@VolumeUnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsIMO", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IMOClassID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UN", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PG", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsAddedFromExcel", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsFlexi", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PreferredAreaID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ByExpireDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@BySerialNo", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ByLotNo", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ByVehicle", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ParentGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ItemTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MaxQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@MinQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ChassisNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LotNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SerialNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsVehicle", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@EquipmentModelID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MotorNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ReturnedItemID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ReturnedQuantity", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ExpectedAlarm", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ActualAlarm", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@MinimumLimit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@MaximumLimit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ReOrderlimit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ModelNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BrandName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ProductType", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsFragile", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@StockUnitQuantity", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPurchaseItemTax ObjCVarPurchaseItem in SaveList)
                {
                    if (ObjCVarPurchaseItem.mIsChanges == true)
                    {
                        if (ObjCVarPurchaseItem.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPurchaseItemTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPurchaseItem.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPurchaseItemTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPurchaseItem.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPurchaseItem.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarPurchaseItem.Code;
                        Com.Parameters["@Name"].Value = ObjCVarPurchaseItem.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarPurchaseItem.LocalName;
                        Com.Parameters["@Price"].Value = ObjCVarPurchaseItem.Price;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPurchaseItem.CurrencyID;
                        Com.Parameters["@AccountID"].Value = ObjCVarPurchaseItem.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarPurchaseItem.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarPurchaseItem.CostCenterID;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarPurchaseItem.ViewOrder;
                        Com.Parameters["@Notes"].Value = ObjCVarPurchaseItem.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarPurchaseItem.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarPurchaseItem.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarPurchaseItem.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarPurchaseItem.ModificationDate;
                        Com.Parameters["@PartNumber"].Value = ObjCVarPurchaseItem.PartNumber;
                        Com.Parameters["@HSCode"].Value = ObjCVarPurchaseItem.HSCode;
                        Com.Parameters["@CommodityID"].Value = ObjCVarPurchaseItem.CommodityID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarPurchaseItem.PackageTypeID;
                        Com.Parameters["@GrossWeight"].Value = ObjCVarPurchaseItem.GrossWeight;
                        Com.Parameters["@NetWeight"].Value = ObjCVarPurchaseItem.NetWeight;
                        Com.Parameters["@WeightUnitID"].Value = ObjCVarPurchaseItem.WeightUnitID;
                        Com.Parameters["@Width"].Value = ObjCVarPurchaseItem.Width;
                        Com.Parameters["@Depth"].Value = ObjCVarPurchaseItem.Depth;
                        Com.Parameters["@Height"].Value = ObjCVarPurchaseItem.Height;
                        Com.Parameters["@LengthUnitID"].Value = ObjCVarPurchaseItem.LengthUnitID;
                        Com.Parameters["@Volume"].Value = ObjCVarPurchaseItem.Volume;
                        Com.Parameters["@VolumeUnitID"].Value = ObjCVarPurchaseItem.VolumeUnitID;
                        Com.Parameters["@IsIMO"].Value = ObjCVarPurchaseItem.IsIMO;
                        Com.Parameters["@IMOClassID"].Value = ObjCVarPurchaseItem.IMOClassID;
                        Com.Parameters["@UN"].Value = ObjCVarPurchaseItem.UN;
                        Com.Parameters["@PG"].Value = ObjCVarPurchaseItem.PG;
                        Com.Parameters["@IsAddedFromExcel"].Value = ObjCVarPurchaseItem.IsAddedFromExcel;
                        Com.Parameters["@IsFlexi"].Value = ObjCVarPurchaseItem.IsFlexi;
                        Com.Parameters["@PreferredAreaID"].Value = ObjCVarPurchaseItem.PreferredAreaID;
                        Com.Parameters["@ByExpireDate"].Value = ObjCVarPurchaseItem.ByExpireDate;
                        Com.Parameters["@BySerialNo"].Value = ObjCVarPurchaseItem.BySerialNo;
                        Com.Parameters["@ByLotNo"].Value = ObjCVarPurchaseItem.ByLotNo;
                        Com.Parameters["@ByVehicle"].Value = ObjCVarPurchaseItem.ByVehicle;
                        Com.Parameters["@ParentGroupID"].Value = ObjCVarPurchaseItem.ParentGroupID;
                        Com.Parameters["@ItemTypeID"].Value = ObjCVarPurchaseItem.ItemTypeID;
                        Com.Parameters["@MaxQty"].Value = ObjCVarPurchaseItem.MaxQty;
                        Com.Parameters["@MinQty"].Value = ObjCVarPurchaseItem.MinQty;
                        Com.Parameters["@ChassisNumber"].Value = ObjCVarPurchaseItem.ChassisNumber;
                        Com.Parameters["@LotNumber"].Value = ObjCVarPurchaseItem.LotNumber;
                        Com.Parameters["@SerialNumber"].Value = ObjCVarPurchaseItem.SerialNumber;
                        Com.Parameters["@OperationID"].Value = ObjCVarPurchaseItem.OperationID;
                        Com.Parameters["@IsVehicle"].Value = ObjCVarPurchaseItem.IsVehicle;
                        Com.Parameters["@EquipmentModelID"].Value = ObjCVarPurchaseItem.EquipmentModelID;
                        Com.Parameters["@MotorNumber"].Value = ObjCVarPurchaseItem.MotorNumber;
                        Com.Parameters["@ReturnedItemID"].Value = ObjCVarPurchaseItem.ReturnedItemID;
                        Com.Parameters["@ReturnedQuantity"].Value = ObjCVarPurchaseItem.ReturnedQuantity;
                        Com.Parameters["@ExpectedAlarm"].Value = ObjCVarPurchaseItem.ExpectedAlarm;
                        Com.Parameters["@ActualAlarm"].Value = ObjCVarPurchaseItem.ActualAlarm;
                        Com.Parameters["@MinimumLimit"].Value = ObjCVarPurchaseItem.MinimumLimit;
                        Com.Parameters["@MaximumLimit"].Value = ObjCVarPurchaseItem.MaximumLimit;
                        Com.Parameters["@ReOrderlimit"].Value = ObjCVarPurchaseItem.ReOrderlimit;
                        Com.Parameters["@ModelNumber"].Value = ObjCVarPurchaseItem.ModelNumber;
                        Com.Parameters["@BrandName"].Value = ObjCVarPurchaseItem.BrandName;
                        Com.Parameters["@ProductType"].Value = ObjCVarPurchaseItem.ProductType;
                        Com.Parameters["@IsFragile"].Value = ObjCVarPurchaseItem.IsFragile;
                        Com.Parameters["@StockUnitQuantity"].Value = ObjCVarPurchaseItem.StockUnitQuantity;
                        EndTrans(Com, Con);
                        if (ObjCVarPurchaseItem.ID == 0)
                        {
                            ObjCVarPurchaseItem.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPurchaseItem.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }
}
