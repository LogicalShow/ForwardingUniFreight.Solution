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
    public class CPKvwOperationCharges
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
    public partial class CVarvwOperationCharges : CPKvwOperationCharges
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int32 mChargeTypeID;
        internal Int32 mContainerTypeID;
        internal Int32 mPackageTypeID;
        internal Int32 mCurrencyID;
        internal Int32 mCostQuantity;
        internal Decimal mCostPrice;
        internal Decimal mCostAmount;
        internal Int32 mSaleQuantity;
        internal Decimal mSalePrice;
        internal Decimal mSaleAmount;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mChargeTypeName;
        internal String mChargeTypeLocalName;
        internal String mChargeTypeCode;
        internal Int32 mMeasurementID;
        internal Boolean mIsDefaultInOperations;
        internal Boolean mIsDefaultInQuotation;
        internal Boolean mIsOcean;
        internal Boolean mIsAir;
        internal Boolean mIsInland;
        internal Boolean mIsInactive;
        internal Boolean mIsUsedInPayable;
        internal Boolean mIsUsedInReceivable;
        internal String mMeasurementCode;
        internal String mMeasurementName;
        internal String mCurrencyCode;
        internal String mPackageTypeCode;
        internal String mPackageTypeName;
        internal String mContainerTypeCode;
        internal String mContainerTypeName;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
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
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Int32 CostQuantity
        {
            get { return mCostQuantity; }
            set { mCostQuantity = value; }
        }
        public Decimal CostPrice
        {
            get { return mCostPrice; }
            set { mCostPrice = value; }
        }
        public Decimal CostAmount
        {
            get { return mCostAmount; }
            set { mCostAmount = value; }
        }
        public Int32 SaleQuantity
        {
            get { return mSaleQuantity; }
            set { mSaleQuantity = value; }
        }
        public Decimal SalePrice
        {
            get { return mSalePrice; }
            set { mSalePrice = value; }
        }
        public Decimal SaleAmount
        {
            get { return mSaleAmount; }
            set { mSaleAmount = value; }
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
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
        }
        public String ChargeTypeLocalName
        {
            get { return mChargeTypeLocalName; }
            set { mChargeTypeLocalName = value; }
        }
        public String ChargeTypeCode
        {
            get { return mChargeTypeCode; }
            set { mChargeTypeCode = value; }
        }
        public Int32 MeasurementID
        {
            get { return mMeasurementID; }
            set { mMeasurementID = value; }
        }
        public Boolean IsDefaultInOperations
        {
            get { return mIsDefaultInOperations; }
            set { mIsDefaultInOperations = value; }
        }
        public Boolean IsDefaultInQuotation
        {
            get { return mIsDefaultInQuotation; }
            set { mIsDefaultInQuotation = value; }
        }
        public Boolean IsOcean
        {
            get { return mIsOcean; }
            set { mIsOcean = value; }
        }
        public Boolean IsAir
        {
            get { return mIsAir; }
            set { mIsAir = value; }
        }
        public Boolean IsInland
        {
            get { return mIsInland; }
            set { mIsInland = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsInactive = value; }
        }
        public Boolean IsUsedInPayable
        {
            get { return mIsUsedInPayable; }
            set { mIsUsedInPayable = value; }
        }
        public Boolean IsUsedInReceivable
        {
            get { return mIsUsedInReceivable; }
            set { mIsUsedInReceivable = value; }
        }
        public String MeasurementCode
        {
            get { return mMeasurementCode; }
            set { mMeasurementCode = value; }
        }
        public String MeasurementName
        {
            get { return mMeasurementName; }
            set { mMeasurementName = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
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

    public partial class CvwOperationCharges
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
        public List<CVarvwOperationCharges> lstCVarvwOperationCharges = new List<CVarvwOperationCharges>();
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
            lstCVarvwOperationCharges.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwOperationCharges";
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
                        CVarvwOperationCharges ObjCVarvwOperationCharges = new CVarvwOperationCharges();
                        ObjCVarvwOperationCharges.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationCharges.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwOperationCharges.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwOperationCharges.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwOperationCharges.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwOperationCharges.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwOperationCharges.mCostQuantity = Convert.ToInt32(dr["CostQuantity"].ToString());
                        ObjCVarvwOperationCharges.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarvwOperationCharges.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarvwOperationCharges.mSaleQuantity = Convert.ToInt32(dr["SaleQuantity"].ToString());
                        ObjCVarvwOperationCharges.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarvwOperationCharges.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarvwOperationCharges.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationCharges.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwOperationCharges.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwOperationCharges.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwOperationCharges.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwOperationCharges.mChargeTypeLocalName = Convert.ToString(dr["ChargeTypeLocalName"].ToString());
                        ObjCVarvwOperationCharges.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
                        ObjCVarvwOperationCharges.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarvwOperationCharges.mIsDefaultInOperations = Convert.ToBoolean(dr["IsDefaultInOperations"].ToString());
                        ObjCVarvwOperationCharges.mIsDefaultInQuotation = Convert.ToBoolean(dr["IsDefaultInQuotation"].ToString());
                        ObjCVarvwOperationCharges.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarvwOperationCharges.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarvwOperationCharges.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarvwOperationCharges.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwOperationCharges.mIsUsedInPayable = Convert.ToBoolean(dr["IsUsedInPayable"].ToString());
                        ObjCVarvwOperationCharges.mIsUsedInReceivable = Convert.ToBoolean(dr["IsUsedInReceivable"].ToString());
                        ObjCVarvwOperationCharges.mMeasurementCode = Convert.ToString(dr["MeasurementCode"].ToString());
                        ObjCVarvwOperationCharges.mMeasurementName = Convert.ToString(dr["MeasurementName"].ToString());
                        ObjCVarvwOperationCharges.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwOperationCharges.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwOperationCharges.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwOperationCharges.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
                        ObjCVarvwOperationCharges.mContainerTypeName = Convert.ToString(dr["ContainerTypeName"].ToString());
                        lstCVarvwOperationCharges.Add(ObjCVarvwOperationCharges);
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
            lstCVarvwOperationCharges.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwOperationCharges";
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
                        CVarvwOperationCharges ObjCVarvwOperationCharges = new CVarvwOperationCharges();
                        ObjCVarvwOperationCharges.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationCharges.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwOperationCharges.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwOperationCharges.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarvwOperationCharges.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarvwOperationCharges.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwOperationCharges.mCostQuantity = Convert.ToInt32(dr["CostQuantity"].ToString());
                        ObjCVarvwOperationCharges.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarvwOperationCharges.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarvwOperationCharges.mSaleQuantity = Convert.ToInt32(dr["SaleQuantity"].ToString());
                        ObjCVarvwOperationCharges.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarvwOperationCharges.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarvwOperationCharges.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationCharges.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwOperationCharges.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwOperationCharges.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwOperationCharges.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwOperationCharges.mChargeTypeLocalName = Convert.ToString(dr["ChargeTypeLocalName"].ToString());
                        ObjCVarvwOperationCharges.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
                        ObjCVarvwOperationCharges.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarvwOperationCharges.mIsDefaultInOperations = Convert.ToBoolean(dr["IsDefaultInOperations"].ToString());
                        ObjCVarvwOperationCharges.mIsDefaultInQuotation = Convert.ToBoolean(dr["IsDefaultInQuotation"].ToString());
                        ObjCVarvwOperationCharges.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarvwOperationCharges.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarvwOperationCharges.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarvwOperationCharges.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwOperationCharges.mIsUsedInPayable = Convert.ToBoolean(dr["IsUsedInPayable"].ToString());
                        ObjCVarvwOperationCharges.mIsUsedInReceivable = Convert.ToBoolean(dr["IsUsedInReceivable"].ToString());
                        ObjCVarvwOperationCharges.mMeasurementCode = Convert.ToString(dr["MeasurementCode"].ToString());
                        ObjCVarvwOperationCharges.mMeasurementName = Convert.ToString(dr["MeasurementName"].ToString());
                        ObjCVarvwOperationCharges.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwOperationCharges.mPackageTypeCode = Convert.ToString(dr["PackageTypeCode"].ToString());
                        ObjCVarvwOperationCharges.mPackageTypeName = Convert.ToString(dr["PackageTypeName"].ToString());
                        ObjCVarvwOperationCharges.mContainerTypeCode = Convert.ToString(dr["ContainerTypeCode"].ToString());
                        ObjCVarvwOperationCharges.mContainerTypeName = Convert.ToString(dr["ContainerTypeName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperationCharges.Add(ObjCVarvwOperationCharges);
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
