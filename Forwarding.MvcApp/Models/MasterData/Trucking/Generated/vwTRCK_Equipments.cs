using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Trucking.Generated
{
    [Serializable]
    public class CPKvwTRCK_Equipments
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwTRCK_Equipments : CPKvwTRCK_Equipments
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCode;
        internal String mName;
        internal String mLocalName;
        internal Int32 mOriginCountryID;
        internal DateTime mManufacturDate;
        internal String mPlateNo;
        internal String mChassisNo;
        internal String mLicenseNumber;
        internal DateTime mLicenseNumberExpireDate;
        internal String mColor;
        internal Decimal mLength;
        internal Decimal mWidth;
        internal Decimal mHeight;
        internal Decimal mGrossWeight;
        internal Decimal mAllowedWeight;
        internal Int32 mNoOfPrimaryWheels;
        internal Int32 mNoOfAdditionalWheels;
        internal Int32 mAxeCount;
        internal DateTime mExaminationExpireDate;
        internal DateTime mWorkingDate;
        internal String mInsuranceBill;
        internal Int32 mInsuranceCompanyID;
        internal DateTime mTaxEndDate;
        internal Int32 mEquipmentModelID;
        internal Int32 mServiceCenterID;
        internal String mNotes;
        internal Int32 mTrailerID;
        internal String mMotorNo;
        internal Boolean mIsInactive;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal Boolean mIsDeleted;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;
        internal Int32 mCostCenterID;
        internal Int32 mSubAccountGroupID;
        internal Int32 mFirstCounter;
        internal Decimal mNumberOfChambers;
        internal Decimal mChambersVolumeInLiters;
        internal Decimal mTankerEmptyWeight;
        internal Int32 mOutletID;
        internal Boolean mIsHeating;
        internal Boolean mIsHeatable;
        internal Boolean mIsEpump;
        internal Boolean mIsCompressor;
        internal Boolean mIsGroundOperated;
        internal Boolean mIsATP;
        internal Int32 mEquipmentTypeID;
        internal String mEquipmentTypeName;
        internal Int32 mNumberOfChairs;
        internal String mInsuranceValue;
        internal DateTime mInsuranceDate;
        #endregion

        #region "Methods"
        public Int32 Code
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
        public Int32 OriginCountryID
        {
            get { return mOriginCountryID; }
            set { mOriginCountryID = value; }
        }
        public DateTime ManufacturDate
        {
            get { return mManufacturDate; }
            set { mManufacturDate = value; }
        }
        public String PlateNo
        {
            get { return mPlateNo; }
            set { mPlateNo = value; }
        }
        public String ChassisNo
        {
            get { return mChassisNo; }
            set { mChassisNo = value; }
        }
        public String LicenseNumber
        {
            get { return mLicenseNumber; }
            set { mLicenseNumber = value; }
        }
        public DateTime LicenseNumberExpireDate
        {
            get { return mLicenseNumberExpireDate; }
            set { mLicenseNumberExpireDate = value; }
        }
        public String Color
        {
            get { return mColor; }
            set { mColor = value; }
        }
        public Decimal Length
        {
            get { return mLength; }
            set { mLength = value; }
        }
        public Decimal Width
        {
            get { return mWidth; }
            set { mWidth = value; }
        }
        public Decimal Height
        {
            get { return mHeight; }
            set { mHeight = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mGrossWeight = value; }
        }
        public Decimal AllowedWeight
        {
            get { return mAllowedWeight; }
            set { mAllowedWeight = value; }
        }
        public Int32 NoOfPrimaryWheels
        {
            get { return mNoOfPrimaryWheels; }
            set { mNoOfPrimaryWheels = value; }
        }
        public Int32 NoOfAdditionalWheels
        {
            get { return mNoOfAdditionalWheels; }
            set { mNoOfAdditionalWheels = value; }
        }
        public Int32 AxeCount
        {
            get { return mAxeCount; }
            set { mAxeCount = value; }
        }
        public DateTime ExaminationExpireDate
        {
            get { return mExaminationExpireDate; }
            set { mExaminationExpireDate = value; }
        }
        public DateTime WorkingDate
        {
            get { return mWorkingDate; }
            set { mWorkingDate = value; }
        }
        public String InsuranceBill
        {
            get { return mInsuranceBill; }
            set { mInsuranceBill = value; }
        }
        public Int32 InsuranceCompanyID
        {
            get { return mInsuranceCompanyID; }
            set { mInsuranceCompanyID = value; }
        }
        public DateTime TaxEndDate
        {
            get { return mTaxEndDate; }
            set { mTaxEndDate = value; }
        }
        public Int32 EquipmentModelID
        {
            get { return mEquipmentModelID; }
            set { mEquipmentModelID = value; }
        }
        public Int32 ServiceCenterID
        {
            get { return mServiceCenterID; }
            set { mServiceCenterID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 TrailerID
        {
            get { return mTrailerID; }
            set { mTrailerID = value; }
        }
        public String MotorNo
        {
            get { return mMotorNo; }
            set { mMotorNo = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
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
        public Int32 LockingUserID
        {
            get { return mLockingUserID; }
            set { mLockingUserID = value; }
        }
        public DateTime TimeLocked
        {
            get { return mTimeLocked; }
            set { mTimeLocked = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
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
        public Int32 SubAccountGroupID
        {
            get { return mSubAccountGroupID; }
            set { mSubAccountGroupID = value; }
        }
        public Int32 FirstCounter
        {
            get { return mFirstCounter; }
            set { mFirstCounter = value; }
        }
        public Decimal NumberOfChambers
        {
            get { return mNumberOfChambers; }
            set { mNumberOfChambers = value; }
        }
        public Decimal ChambersVolumeInLiters
        {
            get { return mChambersVolumeInLiters; }
            set { mChambersVolumeInLiters = value; }
        }
        public Decimal TankerEmptyWeight
        {
            get { return mTankerEmptyWeight; }
            set { mTankerEmptyWeight = value; }
        }
        public Int32 OutletID
        {
            get { return mOutletID; }
            set { mOutletID = value; }
        }
        public Boolean IsHeating
        {
            get { return mIsHeating; }
            set { mIsHeating = value; }
        }
        public Boolean IsHeatable
        {
            get { return mIsHeatable; }
            set { mIsHeatable = value; }
        }
        public Boolean IsEpump
        {
            get { return mIsEpump; }
            set { mIsEpump = value; }
        }
        public Boolean IsCompressor
        {
            get { return mIsCompressor; }
            set { mIsCompressor = value; }
        }
        public Boolean IsGroundOperated
        {
            get { return mIsGroundOperated; }
            set { mIsGroundOperated = value; }
        }
        public Boolean IsATP
        {
            get { return mIsATP; }
            set { mIsATP = value; }
        }
        public Int32 EquipmentTypeID
        {
            get { return mEquipmentTypeID; }
            set { mEquipmentTypeID = value; }
        }
        public String EquipmentTypeName
        {
            get { return mEquipmentTypeName; }
            set { mEquipmentTypeName = value; }
        }
        public Int32 NumberOfChairs
        {
            get { return mNumberOfChairs; }
            set { mNumberOfChairs = value; }
        }
        public String InsuranceValue
        {
            get { return mInsuranceValue; }
            set { mInsuranceValue = value; }
        }
        public DateTime InsuranceDate
        {
            get { return mInsuranceDate; }
            set { mInsuranceDate = value; }
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

    public partial class CvwTRCK_Equipments
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
        public List<CVarvwTRCK_Equipments> lstCVarvwTRCK_Equipments = new List<CVarvwTRCK_Equipments>();
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
            lstCVarvwTRCK_Equipments.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwTRCK_Equipments";
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
                        CVarvwTRCK_Equipments ObjCVarvwTRCK_Equipments = new CVarvwTRCK_Equipments();
                        ObjCVarvwTRCK_Equipments.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwTRCK_Equipments.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwTRCK_Equipments.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwTRCK_Equipments.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwTRCK_Equipments.mOriginCountryID = Convert.ToInt32(dr["OriginCountryID"].ToString());
                        ObjCVarvwTRCK_Equipments.mManufacturDate = Convert.ToDateTime(dr["ManufacturDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mPlateNo = Convert.ToString(dr["PlateNo"].ToString());
                        ObjCVarvwTRCK_Equipments.mChassisNo = Convert.ToString(dr["ChassisNo"].ToString());
                        ObjCVarvwTRCK_Equipments.mLicenseNumber = Convert.ToString(dr["LicenseNumber"].ToString());
                        ObjCVarvwTRCK_Equipments.mLicenseNumberExpireDate = Convert.ToDateTime(dr["LicenseNumberExpireDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mColor = Convert.ToString(dr["Color"].ToString());
                        ObjCVarvwTRCK_Equipments.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarvwTRCK_Equipments.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwTRCK_Equipments.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwTRCK_Equipments.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwTRCK_Equipments.mAllowedWeight = Convert.ToDecimal(dr["AllowedWeight"].ToString());
                        ObjCVarvwTRCK_Equipments.mNoOfPrimaryWheels = Convert.ToInt32(dr["NoOfPrimaryWheels"].ToString());
                        ObjCVarvwTRCK_Equipments.mNoOfAdditionalWheels = Convert.ToInt32(dr["NoOfAdditionalWheels"].ToString());
                        ObjCVarvwTRCK_Equipments.mAxeCount = Convert.ToInt32(dr["AxeCount"].ToString());
                        ObjCVarvwTRCK_Equipments.mExaminationExpireDate = Convert.ToDateTime(dr["ExaminationExpireDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mWorkingDate = Convert.ToDateTime(dr["WorkingDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mInsuranceBill = Convert.ToString(dr["InsuranceBill"].ToString());
                        ObjCVarvwTRCK_Equipments.mInsuranceCompanyID = Convert.ToInt32(dr["InsuranceCompanyID"].ToString());
                        ObjCVarvwTRCK_Equipments.mTaxEndDate = Convert.ToDateTime(dr["TaxEndDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarvwTRCK_Equipments.mServiceCenterID = Convert.ToInt32(dr["ServiceCenterID"].ToString());
                        ObjCVarvwTRCK_Equipments.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwTRCK_Equipments.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwTRCK_Equipments.mMotorNo = Convert.ToString(dr["MotorNo"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwTRCK_Equipments.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwTRCK_Equipments.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwTRCK_Equipments.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwTRCK_Equipments.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwTRCK_Equipments.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwTRCK_Equipments.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwTRCK_Equipments.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwTRCK_Equipments.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarvwTRCK_Equipments.mFirstCounter = Convert.ToInt32(dr["FirstCounter"].ToString());
                        ObjCVarvwTRCK_Equipments.mNumberOfChambers = Convert.ToDecimal(dr["NumberOfChambers"].ToString());
                        ObjCVarvwTRCK_Equipments.mChambersVolumeInLiters = Convert.ToDecimal(dr["ChambersVolumeInLiters"].ToString());
                        ObjCVarvwTRCK_Equipments.mTankerEmptyWeight = Convert.ToDecimal(dr["TankerEmptyWeight"].ToString());
                        ObjCVarvwTRCK_Equipments.mOutletID = Convert.ToInt32(dr["OutletID"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsHeating = Convert.ToBoolean(dr["IsHeating"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsHeatable = Convert.ToBoolean(dr["IsHeatable"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsEpump = Convert.ToBoolean(dr["IsEpump"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsCompressor = Convert.ToBoolean(dr["IsCompressor"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsGroundOperated = Convert.ToBoolean(dr["IsGroundOperated"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsATP = Convert.ToBoolean(dr["IsATP"].ToString());
                        ObjCVarvwTRCK_Equipments.mEquipmentTypeID = Convert.ToInt32(dr["EquipmentTypeID"].ToString());
                        ObjCVarvwTRCK_Equipments.mEquipmentTypeName = Convert.ToString(dr["EquipmentTypeName"].ToString());
                        ObjCVarvwTRCK_Equipments.mNumberOfChairs = Convert.ToInt32(dr["NumberOfChairs"].ToString());
                        ObjCVarvwTRCK_Equipments.mInsuranceValue = Convert.ToString(dr["InsuranceValue"].ToString());
                        ObjCVarvwTRCK_Equipments.mInsuranceDate = Convert.ToDateTime(dr["InsuranceDate"].ToString());
                        lstCVarvwTRCK_Equipments.Add(ObjCVarvwTRCK_Equipments);
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
            lstCVarvwTRCK_Equipments.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwTRCK_Equipments";
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
                        CVarvwTRCK_Equipments ObjCVarvwTRCK_Equipments = new CVarvwTRCK_Equipments();
                        ObjCVarvwTRCK_Equipments.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwTRCK_Equipments.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwTRCK_Equipments.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwTRCK_Equipments.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwTRCK_Equipments.mOriginCountryID = Convert.ToInt32(dr["OriginCountryID"].ToString());
                        ObjCVarvwTRCK_Equipments.mManufacturDate = Convert.ToDateTime(dr["ManufacturDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mPlateNo = Convert.ToString(dr["PlateNo"].ToString());
                        ObjCVarvwTRCK_Equipments.mChassisNo = Convert.ToString(dr["ChassisNo"].ToString());
                        ObjCVarvwTRCK_Equipments.mLicenseNumber = Convert.ToString(dr["LicenseNumber"].ToString());
                        ObjCVarvwTRCK_Equipments.mLicenseNumberExpireDate = Convert.ToDateTime(dr["LicenseNumberExpireDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mColor = Convert.ToString(dr["Color"].ToString());
                        ObjCVarvwTRCK_Equipments.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarvwTRCK_Equipments.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwTRCK_Equipments.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwTRCK_Equipments.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwTRCK_Equipments.mAllowedWeight = Convert.ToDecimal(dr["AllowedWeight"].ToString());
                        ObjCVarvwTRCK_Equipments.mNoOfPrimaryWheels = Convert.ToInt32(dr["NoOfPrimaryWheels"].ToString());
                        ObjCVarvwTRCK_Equipments.mNoOfAdditionalWheels = Convert.ToInt32(dr["NoOfAdditionalWheels"].ToString());
                        ObjCVarvwTRCK_Equipments.mAxeCount = Convert.ToInt32(dr["AxeCount"].ToString());
                        ObjCVarvwTRCK_Equipments.mExaminationExpireDate = Convert.ToDateTime(dr["ExaminationExpireDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mWorkingDate = Convert.ToDateTime(dr["WorkingDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mInsuranceBill = Convert.ToString(dr["InsuranceBill"].ToString());
                        ObjCVarvwTRCK_Equipments.mInsuranceCompanyID = Convert.ToInt32(dr["InsuranceCompanyID"].ToString());
                        ObjCVarvwTRCK_Equipments.mTaxEndDate = Convert.ToDateTime(dr["TaxEndDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mEquipmentModelID = Convert.ToInt32(dr["EquipmentModelID"].ToString());
                        ObjCVarvwTRCK_Equipments.mServiceCenterID = Convert.ToInt32(dr["ServiceCenterID"].ToString());
                        ObjCVarvwTRCK_Equipments.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwTRCK_Equipments.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwTRCK_Equipments.mMotorNo = Convert.ToString(dr["MotorNo"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwTRCK_Equipments.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwTRCK_Equipments.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwTRCK_Equipments.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwTRCK_Equipments.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwTRCK_Equipments.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwTRCK_Equipments.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwTRCK_Equipments.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwTRCK_Equipments.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwTRCK_Equipments.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarvwTRCK_Equipments.mFirstCounter = Convert.ToInt32(dr["FirstCounter"].ToString());
                        ObjCVarvwTRCK_Equipments.mNumberOfChambers = Convert.ToDecimal(dr["NumberOfChambers"].ToString());
                        ObjCVarvwTRCK_Equipments.mChambersVolumeInLiters = Convert.ToDecimal(dr["ChambersVolumeInLiters"].ToString());
                        ObjCVarvwTRCK_Equipments.mTankerEmptyWeight = Convert.ToDecimal(dr["TankerEmptyWeight"].ToString());
                        ObjCVarvwTRCK_Equipments.mOutletID = Convert.ToInt32(dr["OutletID"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsHeating = Convert.ToBoolean(dr["IsHeating"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsHeatable = Convert.ToBoolean(dr["IsHeatable"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsEpump = Convert.ToBoolean(dr["IsEpump"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsCompressor = Convert.ToBoolean(dr["IsCompressor"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsGroundOperated = Convert.ToBoolean(dr["IsGroundOperated"].ToString());
                        ObjCVarvwTRCK_Equipments.mIsATP = Convert.ToBoolean(dr["IsATP"].ToString());
                        ObjCVarvwTRCK_Equipments.mEquipmentTypeID = Convert.ToInt32(dr["EquipmentTypeID"].ToString());
                        ObjCVarvwTRCK_Equipments.mEquipmentTypeName = Convert.ToString(dr["EquipmentTypeName"].ToString());
                        ObjCVarvwTRCK_Equipments.mNumberOfChairs = Convert.ToInt32(dr["NumberOfChairs"].ToString());
                        ObjCVarvwTRCK_Equipments.mInsuranceValue = Convert.ToString(dr["InsuranceValue"].ToString());
                        ObjCVarvwTRCK_Equipments.mInsuranceDate = Convert.ToDateTime(dr["InsuranceDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwTRCK_Equipments.Add(ObjCVarvwTRCK_Equipments);
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
