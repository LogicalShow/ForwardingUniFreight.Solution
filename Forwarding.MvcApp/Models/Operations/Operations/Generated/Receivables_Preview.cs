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
    public class CPKReceivables_Preview
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
    public partial class CVarReceivables_Preview : CPKReceivables_Preview
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

    public partial class CReceivables_Preview
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
        public List<CVarReceivables_Preview> lstCVarReceivables_Preview = new List<CVarReceivables_Preview>();
        public List<CPKReceivables_Preview> lstDeletedCPKReceivables_Preview = new List<CPKReceivables_Preview>();
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
            lstCVarReceivables_Preview.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListReceivables_Preview";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemReceivables_Preview";
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
                        CVarReceivables_Preview ObjCVarReceivables_Preview = new CVarReceivables_Preview();
                        ObjCVarReceivables_Preview.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarReceivables_Preview.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarReceivables_Preview.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarReceivables_Preview.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarReceivables_Preview.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarReceivables_Preview.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarReceivables_Preview.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarReceivables_Preview.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarReceivables_Preview.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarReceivables_Preview.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarReceivables_Preview.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarReceivables_Preview.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarReceivables_Preview.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarReceivables_Preview.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarReceivables_Preview.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarReceivables_Preview.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarReceivables_Preview.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarReceivables_Preview.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarReceivables_Preview.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarReceivables_Preview.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarReceivables_Preview.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarReceivables_Preview.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarReceivables_Preview.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarReceivables_Preview.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarReceivables_Preview.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarReceivables_Preview.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarReceivables_Preview.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarReceivables_Preview.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarReceivables_Preview.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarReceivables_Preview.mDraftInvoiceID = Convert.ToInt64(dr["DraftInvoiceID"].ToString());
                        ObjCVarReceivables_Preview.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarReceivables_Preview.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarReceivables_Preview.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarReceivables_Preview.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarReceivables_Preview.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarReceivables_Preview.mHouseBillID = Convert.ToInt64(dr["HouseBillID"].ToString());
                        ObjCVarReceivables_Preview.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarReceivables_Preview.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarReceivables_Preview.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                        ObjCVarReceivables_Preview.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarReceivables_Preview.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarReceivables_Preview.mVehicleAgingReportID = Convert.ToInt64(dr["VehicleAgingReportID"].ToString());
                        lstCVarReceivables_Preview.Add(ObjCVarReceivables_Preview);
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
            lstCVarReceivables_Preview.Clear();

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
                Com.CommandText = "[dbo].GetListPagingReceivables_Preview";
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
                        CVarReceivables_Preview ObjCVarReceivables_Preview = new CVarReceivables_Preview();
                        ObjCVarReceivables_Preview.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarReceivables_Preview.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarReceivables_Preview.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarReceivables_Preview.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarReceivables_Preview.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarReceivables_Preview.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarReceivables_Preview.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarReceivables_Preview.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarReceivables_Preview.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarReceivables_Preview.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarReceivables_Preview.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarReceivables_Preview.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarReceivables_Preview.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarReceivables_Preview.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarReceivables_Preview.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarReceivables_Preview.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarReceivables_Preview.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarReceivables_Preview.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarReceivables_Preview.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarReceivables_Preview.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarReceivables_Preview.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarReceivables_Preview.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarReceivables_Preview.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarReceivables_Preview.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarReceivables_Preview.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarReceivables_Preview.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarReceivables_Preview.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarReceivables_Preview.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarReceivables_Preview.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarReceivables_Preview.mDraftInvoiceID = Convert.ToInt64(dr["DraftInvoiceID"].ToString());
                        ObjCVarReceivables_Preview.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarReceivables_Preview.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarReceivables_Preview.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarReceivables_Preview.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarReceivables_Preview.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarReceivables_Preview.mHouseBillID = Convert.ToInt64(dr["HouseBillID"].ToString());
                        ObjCVarReceivables_Preview.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarReceivables_Preview.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarReceivables_Preview.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                        ObjCVarReceivables_Preview.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarReceivables_Preview.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarReceivables_Preview.mVehicleAgingReportID = Convert.ToInt64(dr["VehicleAgingReportID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarReceivables_Preview.Add(ObjCVarReceivables_Preview);
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
                    Com.CommandText = "[dbo].DeleteListReceivables_Preview";
                else
                    Com.CommandText = "[dbo].UpdateListReceivables_Preview";
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
        public Exception DeleteItem(List<CPKReceivables_Preview> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemReceivables_Preview";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKReceivables_Preview ObjCPKReceivables_Preview in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKReceivables_Preview.ID);
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
        public Exception SaveMethod(List<CVarReceivables_Preview> SaveList)
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
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarReceivables_Preview ObjCVarReceivables_Preview in SaveList)
                {
                    if (ObjCVarReceivables_Preview.mIsChanges == true)
                    {
                        if (ObjCVarReceivables_Preview.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemReceivables_Preview";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarReceivables_Preview.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemReceivables_Preview";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarReceivables_Preview.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarReceivables_Preview.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarReceivables_Preview.OperationID;
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarReceivables_Preview.ChargeTypeID;
                        Com.Parameters["@POrC"].Value = ObjCVarReceivables_Preview.POrC;
                        Com.Parameters["@SupplierID"].Value = ObjCVarReceivables_Preview.SupplierID;
                        Com.Parameters["@MeasurementID"].Value = ObjCVarReceivables_Preview.MeasurementID;
                        Com.Parameters["@ContainerTypeID"].Value = ObjCVarReceivables_Preview.ContainerTypeID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarReceivables_Preview.PackageTypeID;
                        Com.Parameters["@Quantity"].Value = ObjCVarReceivables_Preview.Quantity;
                        Com.Parameters["@CostPrice"].Value = ObjCVarReceivables_Preview.CostPrice;
                        Com.Parameters["@CostAmount"].Value = ObjCVarReceivables_Preview.CostAmount;
                        Com.Parameters["@SalePrice"].Value = ObjCVarReceivables_Preview.SalePrice;
                        Com.Parameters["@SaleAmount"].Value = ObjCVarReceivables_Preview.SaleAmount;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarReceivables_Preview.TaxeTypeID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarReceivables_Preview.InvoiceID;
                        Com.Parameters["@AccNoteID"].Value = ObjCVarReceivables_Preview.AccNoteID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarReceivables_Preview.ExchangeRate;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarReceivables_Preview.CurrencyID;
                        Com.Parameters["@GeneratingQRID"].Value = ObjCVarReceivables_Preview.GeneratingQRID;
                        Com.Parameters["@Notes"].Value = ObjCVarReceivables_Preview.Notes;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarReceivables_Preview.ViewOrder;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarReceivables_Preview.IsDeleted;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarReceivables_Preview.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarReceivables_Preview.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarReceivables_Preview.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarReceivables_Preview.ModificationDate;
                        Com.Parameters["@PayableID"].Value = ObjCVarReceivables_Preview.PayableID;
                        Com.Parameters["@IssueDate"].Value = ObjCVarReceivables_Preview.IssueDate;
                        Com.Parameters["@OperationContainersAndPackagesID"].Value = ObjCVarReceivables_Preview.OperationContainersAndPackagesID;
                        Com.Parameters["@DraftInvoiceID"].Value = ObjCVarReceivables_Preview.DraftInvoiceID;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarReceivables_Preview.TaxAmount;
                        Com.Parameters["@DiscountTypeID"].Value = ObjCVarReceivables_Preview.DiscountTypeID;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarReceivables_Preview.DiscountAmount;
                        Com.Parameters["@AmountWithoutVAT"].Value = ObjCVarReceivables_Preview.AmountWithoutVAT;
                        Com.Parameters["@TaxPercentage"].Value = ObjCVarReceivables_Preview.TaxPercentage;
                        Com.Parameters["@HouseBillID"].Value = ObjCVarReceivables_Preview.HouseBillID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarReceivables_Preview.DiscountPercentage;
                        Com.Parameters["@OperationVehicleID"].Value = ObjCVarReceivables_Preview.OperationVehicleID;
                        Com.Parameters["@TruckingOrderID"].Value = ObjCVarReceivables_Preview.TruckingOrderID;
                        Com.Parameters["@PreviousCutOffDate"].Value = ObjCVarReceivables_Preview.PreviousCutOffDate;
                        Com.Parameters["@CutOffDate"].Value = ObjCVarReceivables_Preview.CutOffDate;
                        Com.Parameters["@VehicleAgingReportID"].Value = ObjCVarReceivables_Preview.VehicleAgingReportID;
                        EndTrans(Com, Con);
                        if (ObjCVarReceivables_Preview.ID == 0)
                        {
                            ObjCVarReceivables_Preview.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarReceivables_Preview.mIsChanges = false;
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
