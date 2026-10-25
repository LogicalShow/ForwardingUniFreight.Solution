using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Quotations.Quotations.Generated
{
    [Serializable]
    public class CPKvwQuotationContainersAndPackages
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
    public partial class CVarvwQuotationContainersAndPackages : CPKvwQuotationContainersAndPackages
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mQuotationRouteID;
        internal Int64 mQuotationID;
        internal Int32 mContainerTypeID;
        internal Int32 mPackageTypeID;
        internal Decimal mLength;
        internal Decimal mWidth;
        internal Decimal mHeight;
        internal Decimal mVolume;
        internal Decimal mVolumetricWeight;
        internal Decimal mNetWeight;
        internal Decimal mGrossWeight;
        internal Decimal mChargeableWeight;
        internal Decimal mQuantity;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mContainerTypeCode;
        internal String mContainerTypeName;
        internal String mPackageTypeCode;
        internal String mPackageTypeName;
        internal Int32 mShipmentType;
        #endregion

        #region "Methods"
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mQuotationRouteID = value; }
        }
        public Int64 QuotationID
        {
            get { return mQuotationID; }
            set { mQuotationID = value; }
        }
        public Int32 ContainerTypeID
        {
            get { return mContainerTypeID; }
            set { mContainerTypeID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mPackageTypeID = value; }
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
        public Decimal Quantity
        {
            get { return mQuantity; }
            set { mQuantity = value; }
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
        public String ContainerTypeCode
        {
            get { return mContainerTypeCode; }
            set { mContainerTypeCode = value; }
        }
        public String ContainerTypeName
        {
            get { return mContainerTypeName; }
            set { mContainerTypeName = value; }
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
        public Int32 ShipmentType
        {
            get { return mShipmentType; }
            set { mShipmentType = value; }
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

    public partial class CvwQuotationContainersAndPackages
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
        public List<CVarvwQuotationContainersAndPackages> lstCVarvwQuotationContainersAndPackages = new List<CVarvwQuotationContainersAndPackages>();
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
            lstCVarvwQuotationContainersAndPackages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwQuotationContainersAndPackages";
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
                        CVarvwQuotationContainersAndPackages ObjCVarvwQuotationContainersAndPackages = new CVarvwQuotationContainersAndPackages();
                        ObjCVarvwQuotationContainersAndPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mContainerTypeName = Convert.ToString(dr["ContainerTypeName"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        lstCVarvwQuotationContainersAndPackages.Add(ObjCVarvwQuotationContainersAndPackages);
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
            lstCVarvwQuotationContainersAndPackages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwQuotationContainersAndPackages";
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
                        CVarvwQuotationContainersAndPackages ObjCVarvwQuotationContainersAndPackages = new CVarvwQuotationContainersAndPackages();
                        ObjCVarvwQuotationContainersAndPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mContainerTypeName = Convert.ToString(dr["ContainerTypeName"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwQuotationContainersAndPackages.mShipmentType = Convert.ToInt32(dr["ShipmentType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwQuotationContainersAndPackages.Add(ObjCVarvwQuotationContainersAndPackages);
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
