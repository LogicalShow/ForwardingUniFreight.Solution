using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKReceivablesTAX
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
    public partial class CVarReceivablesTAX : CPKReceivablesTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int32 mChargeTypeID;
        internal Int32 mPOrC;
        internal Int32 mSupplierID;
        internal Int32 mMeasurementID;
        internal Int32 mContainerTypeID;
        internal Int32 mPackageTypeID;
        internal Decimal mQuantity;
        internal Decimal mCostPrice;
        internal Decimal mCostAmount;
        internal Decimal mSalePrice;
        internal Decimal mSaleAmount;
        internal Int32 mTaxeTypeID;
        internal Int64 mInvoiceID;
        internal Int64 mAccNoteID;
        internal Decimal mExchangeRate;
        internal Int32 mCurrencyID;
        internal Int64 mGeneratingQRID;
        internal String mNotes;
        internal Int32 mViewOrder;
        internal Boolean mIsDeleted;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int64 mPayableID;
        internal DateTime mIssueDate;
        internal Int64 mOperationContainersAndPackagesID;
        internal Int64 mDraftInvoiceID;
        internal Decimal mTaxAmount;
        internal Int32 mDiscountTypeID;
        internal Decimal mDiscountAmount;
        internal Decimal mAmountWithoutVAT;
        internal Decimal mTaxPercentage;
        internal Int64 mHouseBillID;
        internal Decimal mDiscountPercentage;
        internal Int64 mOperationVehicleID;
        internal Int64 mTruckingOrderID;
        internal DateTime mPreviousCutOffDate;
        internal DateTime mCutOffDate;
        internal Int64 mVehicleAgingReportID;
        internal Int64 mCancelledReceivableID;
        internal Boolean mIsReceipt;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mIsChanges = true; mChargeTypeID = value; }
        }
        public Int32 POrC
        {
            get { return mPOrC; }
            set { mIsChanges = true; mPOrC = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public Int32 MeasurementID
        {
            get { return mMeasurementID; }
            set { mIsChanges = true; mMeasurementID = value; }
        }
        public Int32 ContainerTypeID
        {
            get { return mContainerTypeID; }
            set { mIsChanges = true; mContainerTypeID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public Decimal Quantity
        {
            get { return mQuantity; }
            set { mIsChanges = true; mQuantity = value; }
        }
        public Decimal CostPrice
        {
            get { return mCostPrice; }
            set { mIsChanges = true; mCostPrice = value; }
        }
        public Decimal CostAmount
        {
            get { return mCostAmount; }
            set { mIsChanges = true; mCostAmount = value; }
        }
        public Decimal SalePrice
        {
            get { return mSalePrice; }
            set { mIsChanges = true; mSalePrice = value; }
        }
        public Decimal SaleAmount
        {
            get { return mSaleAmount; }
            set { mIsChanges = true; mSaleAmount = value; }
        }
        public Int32 TaxeTypeID
        {
            get { return mTaxeTypeID; }
            set { mIsChanges = true; mTaxeTypeID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Int64 AccNoteID
        {
            get { return mAccNoteID; }
            set { mIsChanges = true; mAccNoteID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Int64 GeneratingQRID
        {
            get { return mGeneratingQRID; }
            set { mIsChanges = true; mGeneratingQRID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mIsChanges = true; mViewOrder = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
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
        public Int64 PayableID
        {
            get { return mPayableID; }
            set { mIsChanges = true; mPayableID = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIsChanges = true; mIssueDate = value; }
        }
        public Int64 OperationContainersAndPackagesID
        {
            get { return mOperationContainersAndPackagesID; }
            set { mIsChanges = true; mOperationContainersAndPackagesID = value; }
        }
        public Int64 DraftInvoiceID
        {
            get { return mDraftInvoiceID; }
            set { mIsChanges = true; mDraftInvoiceID = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mIsChanges = true; mTaxAmount = value; }
        }
        public Int32 DiscountTypeID
        {
            get { return mDiscountTypeID; }
            set { mIsChanges = true; mDiscountTypeID = value; }
        }
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mIsChanges = true; mDiscountAmount = value; }
        }
        public Decimal AmountWithoutVAT
        {
            get { return mAmountWithoutVAT; }
            set { mIsChanges = true; mAmountWithoutVAT = value; }
        }
        public Decimal TaxPercentage
        {
            get { return mTaxPercentage; }
            set { mIsChanges = true; mTaxPercentage = value; }
        }
        public Int64 HouseBillID
        {
            get { return mHouseBillID; }
            set { mIsChanges = true; mHouseBillID = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mIsChanges = true; mDiscountPercentage = value; }
        }
        public Int64 OperationVehicleID
        {
            get { return mOperationVehicleID; }
            set { mIsChanges = true; mOperationVehicleID = value; }
        }
        public Int64 TruckingOrderID
        {
            get { return mTruckingOrderID; }
            set { mIsChanges = true; mTruckingOrderID = value; }
        }
        public DateTime PreviousCutOffDate
        {
            get { return mPreviousCutOffDate; }
            set { mIsChanges = true; mPreviousCutOffDate = value; }
        }
        public DateTime CutOffDate
        {
            get { return mCutOffDate; }
            set { mIsChanges = true; mCutOffDate = value; }
        }
        public Int64 VehicleAgingReportID
        {
            get { return mVehicleAgingReportID; }
            set { mIsChanges = true; mVehicleAgingReportID = value; }
        }
        public Int64 CancelledReceivableID
        {
            get { return mCancelledReceivableID; }
            set { mIsChanges = true; mCancelledReceivableID = value; }
        }
        public Boolean IsReceipt
        {
            get { return mIsReceipt; }
            set { mIsChanges = true; mIsReceipt = value; }
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

    public partial class CReceivablesTax
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
        public List<CVarReceivablesTAX> lstCVarReceivables = new List<CVarReceivablesTAX>();
        public List<CPKReceivablesTAX> lstDeletedCPKReceivables = new List<CPKReceivablesTAX>();
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
            lstCVarReceivables.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListReceivablesTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemReceivablesTax";
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
                        CVarReceivablesTAX ObjCVarReceivables = new CVarReceivablesTAX();
                        ObjCVarReceivables.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarReceivables.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarReceivables.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarReceivables.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarReceivables.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarReceivables.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarReceivables.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarReceivables.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarReceivables.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarReceivables.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarReceivables.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarReceivables.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarReceivables.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarReceivables.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarReceivables.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarReceivables.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarReceivables.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarReceivables.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarReceivables.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarReceivables.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarReceivables.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarReceivables.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarReceivables.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarReceivables.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarReceivables.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarReceivables.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarReceivables.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarReceivables.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarReceivables.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarReceivables.mDraftInvoiceID = Convert.ToInt64(dr["DraftInvoiceID"].ToString());
                        ObjCVarReceivables.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarReceivables.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarReceivables.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarReceivables.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarReceivables.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarReceivables.mHouseBillID = Convert.ToInt64(dr["HouseBillID"].ToString());
                        ObjCVarReceivables.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarReceivables.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarReceivables.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                        ObjCVarReceivables.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarReceivables.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarReceivables.mVehicleAgingReportID = Convert.ToInt64(dr["VehicleAgingReportID"].ToString());
                        ObjCVarReceivables.mCancelledReceivableID = Convert.ToInt64(dr["CancelledReceivableID"].ToString());
                        ObjCVarReceivables.mIsReceipt = Convert.ToBoolean(dr["IsReceipt"].ToString());
                        lstCVarReceivables.Add(ObjCVarReceivables);
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
            lstCVarReceivables.Clear();

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
                Com.CommandText = "[dbo].GetListPagingReceivables";
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
                        CVarReceivablesTAX ObjCVarReceivables = new CVarReceivablesTAX();
                        ObjCVarReceivables.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarReceivables.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarReceivables.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarReceivables.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarReceivables.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarReceivables.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarReceivables.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarReceivables.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarReceivables.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarReceivables.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarReceivables.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarReceivables.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarReceivables.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarReceivables.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarReceivables.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarReceivables.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarReceivables.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarReceivables.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarReceivables.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarReceivables.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarReceivables.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarReceivables.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarReceivables.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarReceivables.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarReceivables.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarReceivables.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarReceivables.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarReceivables.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarReceivables.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarReceivables.mDraftInvoiceID = Convert.ToInt64(dr["DraftInvoiceID"].ToString());
                        ObjCVarReceivables.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarReceivables.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarReceivables.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarReceivables.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarReceivables.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarReceivables.mHouseBillID = Convert.ToInt64(dr["HouseBillID"].ToString());
                        ObjCVarReceivables.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarReceivables.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarReceivables.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                        ObjCVarReceivables.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarReceivables.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarReceivables.mVehicleAgingReportID = Convert.ToInt64(dr["VehicleAgingReportID"].ToString());
                        ObjCVarReceivables.mCancelledReceivableID = Convert.ToInt64(dr["CancelledReceivableID"].ToString());
                        ObjCVarReceivables.mIsReceipt = Convert.ToBoolean(dr["IsReceipt"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarReceivables.Add(ObjCVarReceivables);
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
                    Com.CommandText = "[dbo].DeleteListReceivablesTax";
                else
                    Com.CommandText = "[dbo].UpdateListReceivablesTax";
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
        public Exception DeleteItem(List<CPKReceivablesTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemReceivables";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKReceivablesTAX ObjCPKReceivables in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKReceivables.ID);
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
        public Exception SaveMethod(List<CVarReceivablesTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POrC", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MeasurementID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ContainerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SalePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SaleAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@AccNoteID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GeneratingQRID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ViewOrder", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PayableID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IssueDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@OperationContainersAndPackagesID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@DraftInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DiscountAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@AmountWithoutVAT", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@HouseBillID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@DiscountPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@OperationVehicleID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@TruckingOrderID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PreviousCutOffDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CutOffDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@VehicleAgingReportID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CancelledReceivableID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsReceipt", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarReceivablesTAX ObjCVarReceivables in SaveList)
                {
                    if (ObjCVarReceivables.mIsChanges == true)
                    {
                        if (ObjCVarReceivables.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemReceivablesTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarReceivables.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemReceivablesTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarReceivables.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarReceivables.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarReceivables.OperationID;
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarReceivables.ChargeTypeID;
                        Com.Parameters["@POrC"].Value = ObjCVarReceivables.POrC;
                        Com.Parameters["@SupplierID"].Value = ObjCVarReceivables.SupplierID;
                        Com.Parameters["@MeasurementID"].Value = ObjCVarReceivables.MeasurementID;
                        Com.Parameters["@ContainerTypeID"].Value = ObjCVarReceivables.ContainerTypeID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarReceivables.PackageTypeID;
                        Com.Parameters["@Quantity"].Value = ObjCVarReceivables.Quantity;
                        Com.Parameters["@CostPrice"].Value = ObjCVarReceivables.CostPrice;
                        Com.Parameters["@CostAmount"].Value = ObjCVarReceivables.CostAmount;
                        Com.Parameters["@SalePrice"].Value = ObjCVarReceivables.SalePrice;
                        Com.Parameters["@SaleAmount"].Value = ObjCVarReceivables.SaleAmount;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarReceivables.TaxeTypeID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarReceivables.InvoiceID;
                        Com.Parameters["@AccNoteID"].Value = ObjCVarReceivables.AccNoteID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarReceivables.ExchangeRate;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarReceivables.CurrencyID;
                        Com.Parameters["@GeneratingQRID"].Value = ObjCVarReceivables.GeneratingQRID;
                        Com.Parameters["@Notes"].Value = ObjCVarReceivables.Notes;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarReceivables.ViewOrder;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarReceivables.IsDeleted;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarReceivables.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarReceivables.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarReceivables.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarReceivables.ModificationDate;
                        Com.Parameters["@PayableID"].Value = ObjCVarReceivables.PayableID;
                        Com.Parameters["@IssueDate"].Value = ObjCVarReceivables.IssueDate;
                        Com.Parameters["@OperationContainersAndPackagesID"].Value = ObjCVarReceivables.OperationContainersAndPackagesID;
                        Com.Parameters["@DraftInvoiceID"].Value = ObjCVarReceivables.DraftInvoiceID;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarReceivables.TaxAmount;
                        Com.Parameters["@DiscountTypeID"].Value = ObjCVarReceivables.DiscountTypeID;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarReceivables.DiscountAmount;
                        Com.Parameters["@AmountWithoutVAT"].Value = ObjCVarReceivables.AmountWithoutVAT;
                        Com.Parameters["@TaxPercentage"].Value = ObjCVarReceivables.TaxPercentage;
                        Com.Parameters["@HouseBillID"].Value = ObjCVarReceivables.HouseBillID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarReceivables.DiscountPercentage;
                        Com.Parameters["@OperationVehicleID"].Value = ObjCVarReceivables.OperationVehicleID;
                        Com.Parameters["@TruckingOrderID"].Value = ObjCVarReceivables.TruckingOrderID;
                        Com.Parameters["@PreviousCutOffDate"].Value = ObjCVarReceivables.PreviousCutOffDate;
                        Com.Parameters["@CutOffDate"].Value = ObjCVarReceivables.CutOffDate;
                        Com.Parameters["@VehicleAgingReportID"].Value = ObjCVarReceivables.VehicleAgingReportID;
                        Com.Parameters["@CancelledReceivableID"].Value = ObjCVarReceivables.CancelledReceivableID;
                        Com.Parameters["@IsReceipt"].Value = ObjCVarReceivables.IsReceipt;
                        EndTrans(Com, Con);
                        if (ObjCVarReceivables.ID == 0)
                        {
                            ObjCVarReceivables.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarReceivables.mIsChanges = false;
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
