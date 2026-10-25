using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKvwContainerPackages
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
    public partial class CVarvwContainerPackages : CPKvwContainerPackages
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mHouseOperationID;
        internal Int64 mOperationContainersAndPackagesID;
        internal Int32 mPackageTypeID;
        internal Int32 mQuantity;
        internal Decimal mLength;
        internal Decimal mWidth;
        internal Decimal mHeight;
        internal Decimal mVolume;
        internal Decimal mVolumetricWeight;
        internal Decimal mNetWeight;
        internal Decimal mGrossWeight;
        internal Decimal mChargeableWeight;
        internal String mMarksAndNumbers;
        internal String mDescriptionOfGoods;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int64 mOperationID;
        internal String mPackageTypeCode;
        internal String mPackageTypeName;
        internal String mPackagePrintAs;
        internal String mCreatorName;
        internal String mCreatorLocalName;
        internal String mModificatorName;
        internal String mModificatorLocalName;
        internal String mHouseOperationCode;
        internal Int64 mHouseOCPID;
        #endregion

        #region "Methods"
        public Int64 HouseOperationID
        {
            get { return mHouseOperationID; }
            set { mHouseOperationID = value; }
        }
        public Int64 OperationContainersAndPackagesID
        {
            get { return mOperationContainersAndPackagesID; }
            set { mOperationContainersAndPackagesID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
        }
        public Int32 Quantity
        {
            get { return mQuantity; }
            set { mQuantity = value; }
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
        public Decimal Volume
        {
            get { return mVolume; }
            set { mVolume = value; }
        }
        public Decimal VolumetricWeight
        {
            get { return mVolumetricWeight; }
            set { mVolumetricWeight = value; }
        }
        public Decimal NetWeight
        {
            get { return mNetWeight; }
            set { mNetWeight = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mGrossWeight = value; }
        }
        public Decimal ChargeableWeight
        {
            get { return mChargeableWeight; }
            set { mChargeableWeight = value; }
        }
        public String MarksAndNumbers
        {
            get { return mMarksAndNumbers; }
            set { mMarksAndNumbers = value; }
        }
        public String DescriptionOfGoods
        {
            get { return mDescriptionOfGoods; }
            set { mDescriptionOfGoods = value; }
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
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public String PackageTypeCode
        {
            get { return mPackageTypeCode; }
            set { mPackageTypeCode = value; }
        }
        public String PackageTypeName
        {
            get { return mPackageTypeName; }
            set { mPackageTypeName = value; }
        }
        public String PackagePrintAs
        {
            get { return mPackagePrintAs; }
            set { mPackagePrintAs = value; }
        }
        public String CreatorName
        {
            get { return mCreatorName; }
            set { mCreatorName = value; }
        }
        public String CreatorLocalName
        {
            get { return mCreatorLocalName; }
            set { mCreatorLocalName = value; }
        }
        public String ModificatorName
        {
            get { return mModificatorName; }
            set { mModificatorName = value; }
        }
        public String ModificatorLocalName
        {
            get { return mModificatorLocalName; }
            set { mModificatorLocalName = value; }
        }
        public String HouseOperationCode
        {
            get { return mHouseOperationCode; }
            set { mHouseOperationCode = value; }
        }
        public Int64 HouseOCPID
        {
            get { return mHouseOCPID; }
            set { mHouseOCPID = value; }
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

    public partial class CvwContainerPackages
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
        public List<CVarvwContainerPackages> lstCVarvwContainerPackages = new List<CVarvwContainerPackages>();
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
            lstCVarvwContainerPackages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwContainerPackages";
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
                        CVarvwContainerPackages ObjCVarvwContainerPackages = new CVarvwContainerPackages();
                        ObjCVarvwContainerPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwContainerPackages.mHouseOperationID = Convert.ToInt64(dr["HouseOperationID"].ToString());
                        ObjCVarvwContainerPackages.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarvwContainerPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwContainerPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarvwContainerPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarvwContainerPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwContainerPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwContainerPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwContainerPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarvwContainerPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwContainerPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwContainerPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarvwContainerPackages.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarvwContainerPackages.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarvwContainerPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwContainerPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwContainerPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwContainerPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwContainerPackages.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwContainerPackages.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwContainerPackages.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwContainerPackages.mPackagePrintAs = Convert.ToString(dr["PackagePrintAs"].ToString());
                        ObjCVarvwContainerPackages.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwContainerPackages.mCreatorLocalName = Convert.ToString(dr["CreatorLocalName"].ToString());
                        ObjCVarvwContainerPackages.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwContainerPackages.mModificatorLocalName = Convert.ToString(dr["ModificatorLocalName"].ToString());
                        ObjCVarvwContainerPackages.mHouseOperationCode = Convert.ToString(dr["HouseOperationCode"].ToString());
                        ObjCVarvwContainerPackages.mHouseOCPID = Convert.ToInt64(dr["HouseOCPID"].ToString());
                        lstCVarvwContainerPackages.Add(ObjCVarvwContainerPackages);
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
            lstCVarvwContainerPackages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwContainerPackages";
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
                        CVarvwContainerPackages ObjCVarvwContainerPackages = new CVarvwContainerPackages();
                        ObjCVarvwContainerPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwContainerPackages.mHouseOperationID = Convert.ToInt64(dr["HouseOperationID"].ToString());
                        ObjCVarvwContainerPackages.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarvwContainerPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwContainerPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarvwContainerPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarvwContainerPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwContainerPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwContainerPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwContainerPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarvwContainerPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwContainerPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwContainerPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarvwContainerPackages.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarvwContainerPackages.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarvwContainerPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwContainerPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwContainerPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwContainerPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwContainerPackages.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwContainerPackages.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwContainerPackages.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwContainerPackages.mPackagePrintAs = Convert.ToString(dr["PackagePrintAs"].ToString());
                        ObjCVarvwContainerPackages.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwContainerPackages.mCreatorLocalName = Convert.ToString(dr["CreatorLocalName"].ToString());
                        ObjCVarvwContainerPackages.mModificatorName = Convert.ToString(dr["ModificatorName"].ToString());
                        ObjCVarvwContainerPackages.mModificatorLocalName = Convert.ToString(dr["ModificatorLocalName"].ToString());
                        ObjCVarvwContainerPackages.mHouseOperationCode = Convert.ToString(dr["HouseOperationCode"].ToString());
                        ObjCVarvwContainerPackages.mHouseOCPID = Convert.ToInt64(dr["HouseOCPID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwContainerPackages.Add(ObjCVarvwContainerPackages);
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
