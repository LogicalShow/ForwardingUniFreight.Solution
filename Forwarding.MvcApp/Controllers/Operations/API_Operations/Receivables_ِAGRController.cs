using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Entities.Quotations;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    [Serializable]
    public class CPKReceivables_AGR
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
    public partial class CVarReceivables_AGR : CPKReceivables_AGR
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int32 mChargeTypeID;
        internal Int32 mItemID;
        internal String mName;
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
        internal Int64 mInvoiceID_3PL;
        internal Decimal mSalePrice_Foreign;
        internal Int32 mCurrencyID_Foreign;
        internal Decimal mExchangeRate_Foreign;
        internal String mReceiptNo;
        internal DateTime mReceiptDate;
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
        public Int32 ItemID
        {
            get { return mItemID; }
            set { mIsChanges = true; mItemID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
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
        public Int64 InvoiceID_3PL
        {
            get { return mInvoiceID_3PL; }
            set { mIsChanges = true; mInvoiceID_3PL = value; }
        }
        public Decimal SalePrice_Foreign
        {
            get { return mSalePrice_Foreign; }
            set { mIsChanges = true; mSalePrice_Foreign = value; }
        }
        public Int32 CurrencyID_Foreign
        {
            get { return mCurrencyID_Foreign; }
            set { mIsChanges = true; mCurrencyID_Foreign = value; }
        }
        public Decimal ExchangeRate_Foreign
        {
            get { return mExchangeRate_Foreign; }
            set { mIsChanges = true; mExchangeRate_Foreign = value; }
        }
        public String ReceiptNo
        {
            get { return mReceiptNo; }
            set { mIsChanges = true; mReceiptNo = value; }
        }
        public DateTime ReceiptDate
        {
            get { return mReceiptDate; }
            set { mIsChanges = true; mReceiptDate = value; }
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

    public partial class CReceivables_AGR
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
        public List<CVarReceivables_AGR> lstCVarReceivables_AGR = new List<CVarReceivables_AGR>();
        public List<CPKReceivables_AGR> lstDeletedCPKReceivables_AGR = new List<CPKReceivables_AGR>();
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
            lstCVarReceivables_AGR.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListReceivables_AGR";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemReceivables_AGR";
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
                        CVarReceivables_AGR ObjCVarReceivables_AGR = new CVarReceivables_AGR();
                        ObjCVarReceivables_AGR.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarReceivables_AGR.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarReceivables_AGR.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarReceivables_AGR.mItemID = Convert.ToInt32(dr["ItemID"].ToString());
                        ObjCVarReceivables_AGR.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarReceivables_AGR.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarReceivables_AGR.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarReceivables_AGR.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarReceivables_AGR.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarReceivables_AGR.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarReceivables_AGR.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarReceivables_AGR.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarReceivables_AGR.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarReceivables_AGR.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarReceivables_AGR.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarReceivables_AGR.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarReceivables_AGR.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarReceivables_AGR.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarReceivables_AGR.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarReceivables_AGR.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarReceivables_AGR.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarReceivables_AGR.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarReceivables_AGR.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarReceivables_AGR.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarReceivables_AGR.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarReceivables_AGR.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarReceivables_AGR.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarReceivables_AGR.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarReceivables_AGR.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarReceivables_AGR.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarReceivables_AGR.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarReceivables_AGR.mDraftInvoiceID = Convert.ToInt64(dr["DraftInvoiceID"].ToString());
                        ObjCVarReceivables_AGR.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarReceivables_AGR.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarReceivables_AGR.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarReceivables_AGR.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarReceivables_AGR.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarReceivables_AGR.mHouseBillID = Convert.ToInt64(dr["HouseBillID"].ToString());
                        ObjCVarReceivables_AGR.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarReceivables_AGR.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarReceivables_AGR.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                        ObjCVarReceivables_AGR.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarReceivables_AGR.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarReceivables_AGR.mVehicleAgingReportID = Convert.ToInt64(dr["VehicleAgingReportID"].ToString());
                        ObjCVarReceivables_AGR.mCancelledReceivableID = Convert.ToInt64(dr["CancelledReceivableID"].ToString());
                        ObjCVarReceivables_AGR.mIsReceipt = Convert.ToBoolean(dr["IsReceipt"].ToString());
                        ObjCVarReceivables_AGR.mInvoiceID_3PL = Convert.ToInt64(dr["InvoiceID_3PL"].ToString());
                        ObjCVarReceivables_AGR.mSalePrice_Foreign = Convert.ToDecimal(dr["SalePrice_Foreign"].ToString());
                        ObjCVarReceivables_AGR.mCurrencyID_Foreign = Convert.ToInt32(dr["CurrencyID_Foreign"].ToString());
                        ObjCVarReceivables_AGR.mExchangeRate_Foreign = Convert.ToDecimal(dr["ExchangeRate_Foreign"].ToString());
                        ObjCVarReceivables_AGR.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarReceivables_AGR.mReceiptDate = Convert.ToDateTime(dr["ReceiptDate"].ToString());
                        lstCVarReceivables_AGR.Add(ObjCVarReceivables_AGR);
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
            lstCVarReceivables_AGR.Clear();

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
                Com.CommandText = "[dbo].GetListPagingReceivables_AGR";
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
                        CVarReceivables_AGR ObjCVarReceivables_AGR = new CVarReceivables_AGR();
                        ObjCVarReceivables_AGR.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarReceivables_AGR.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarReceivables_AGR.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarReceivables_AGR.mItemID = Convert.ToInt32(dr["ItemID"].ToString());
                        ObjCVarReceivables_AGR.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarReceivables_AGR.mPOrC = Convert.ToInt32(dr["POrC"].ToString());
                        ObjCVarReceivables_AGR.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarReceivables_AGR.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarReceivables_AGR.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarReceivables_AGR.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarReceivables_AGR.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarReceivables_AGR.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarReceivables_AGR.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarReceivables_AGR.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarReceivables_AGR.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarReceivables_AGR.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarReceivables_AGR.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarReceivables_AGR.mAccNoteID = Convert.ToInt64(dr["AccNoteID"].ToString());
                        ObjCVarReceivables_AGR.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarReceivables_AGR.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarReceivables_AGR.mGeneratingQRID = Convert.ToInt64(dr["GeneratingQRID"].ToString());
                        ObjCVarReceivables_AGR.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarReceivables_AGR.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarReceivables_AGR.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarReceivables_AGR.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarReceivables_AGR.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarReceivables_AGR.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarReceivables_AGR.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarReceivables_AGR.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarReceivables_AGR.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarReceivables_AGR.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarReceivables_AGR.mDraftInvoiceID = Convert.ToInt64(dr["DraftInvoiceID"].ToString());
                        ObjCVarReceivables_AGR.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarReceivables_AGR.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarReceivables_AGR.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarReceivables_AGR.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarReceivables_AGR.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarReceivables_AGR.mHouseBillID = Convert.ToInt64(dr["HouseBillID"].ToString());
                        ObjCVarReceivables_AGR.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarReceivables_AGR.mOperationVehicleID = Convert.ToInt64(dr["OperationVehicleID"].ToString());
                        ObjCVarReceivables_AGR.mTruckingOrderID = Convert.ToInt64(dr["TruckingOrderID"].ToString());
                        ObjCVarReceivables_AGR.mPreviousCutOffDate = Convert.ToDateTime(dr["PreviousCutOffDate"].ToString());
                        ObjCVarReceivables_AGR.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarReceivables_AGR.mVehicleAgingReportID = Convert.ToInt64(dr["VehicleAgingReportID"].ToString());
                        ObjCVarReceivables_AGR.mCancelledReceivableID = Convert.ToInt64(dr["CancelledReceivableID"].ToString());
                        ObjCVarReceivables_AGR.mIsReceipt = Convert.ToBoolean(dr["IsReceipt"].ToString());
                        ObjCVarReceivables_AGR.mInvoiceID_3PL = Convert.ToInt64(dr["InvoiceID_3PL"].ToString());
                        ObjCVarReceivables_AGR.mSalePrice_Foreign = Convert.ToDecimal(dr["SalePrice_Foreign"].ToString());
                        ObjCVarReceivables_AGR.mCurrencyID_Foreign = Convert.ToInt32(dr["CurrencyID_Foreign"].ToString());
                        ObjCVarReceivables_AGR.mExchangeRate_Foreign = Convert.ToDecimal(dr["ExchangeRate_Foreign"].ToString());
                        ObjCVarReceivables_AGR.mReceiptNo = Convert.ToString(dr["ReceiptNo"].ToString());
                        ObjCVarReceivables_AGR.mReceiptDate = Convert.ToDateTime(dr["ReceiptDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarReceivables_AGR.Add(ObjCVarReceivables_AGR);
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
                    Com.CommandText = "[dbo].DeleteListReceivables_AGR";
                else
                    Com.CommandText = "[dbo].UpdateListReceivables_AGR";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
        public Exception DeleteItem(List<CPKReceivables_AGR> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemReceivables_AGR";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKReceivables_AGR ObjCPKReceivables_AGR in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKReceivables_AGR.ID);
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
        public Exception SaveMethod(List<CVarReceivables_AGR> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
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
                Com.Parameters.Add(new SqlParameter("@InvoiceID_3PL", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@SalePrice_Foreign", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID_Foreign", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate_Foreign", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ReceiptNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ReceiptDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarReceivables_AGR ObjCVarReceivables_AGR in SaveList)
                {
                    if (ObjCVarReceivables_AGR.mIsChanges == true)
                    {
                        if (ObjCVarReceivables_AGR.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemReceivables_AGR";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarReceivables_AGR.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemReceivables_AGR";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarReceivables_AGR.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarReceivables_AGR.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarReceivables_AGR.OperationID;
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarReceivables_AGR.ChargeTypeID;
                        Com.Parameters["@ItemID"].Value = ObjCVarReceivables_AGR.ItemID;
                        Com.Parameters["@Name"].Value = ObjCVarReceivables_AGR.Name;
                        Com.Parameters["@POrC"].Value = ObjCVarReceivables_AGR.POrC;
                        Com.Parameters["@SupplierID"].Value = ObjCVarReceivables_AGR.SupplierID;
                        Com.Parameters["@MeasurementID"].Value = ObjCVarReceivables_AGR.MeasurementID;
                        Com.Parameters["@ContainerTypeID"].Value = ObjCVarReceivables_AGR.ContainerTypeID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarReceivables_AGR.PackageTypeID;
                        Com.Parameters["@Quantity"].Value = ObjCVarReceivables_AGR.Quantity;
                        Com.Parameters["@CostPrice"].Value = ObjCVarReceivables_AGR.CostPrice;
                        Com.Parameters["@CostAmount"].Value = ObjCVarReceivables_AGR.CostAmount;
                        Com.Parameters["@SalePrice"].Value = ObjCVarReceivables_AGR.SalePrice;
                        Com.Parameters["@SaleAmount"].Value = ObjCVarReceivables_AGR.SaleAmount;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarReceivables_AGR.TaxeTypeID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarReceivables_AGR.InvoiceID;
                        Com.Parameters["@AccNoteID"].Value = ObjCVarReceivables_AGR.AccNoteID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarReceivables_AGR.ExchangeRate;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarReceivables_AGR.CurrencyID;
                        Com.Parameters["@GeneratingQRID"].Value = ObjCVarReceivables_AGR.GeneratingQRID;
                        Com.Parameters["@Notes"].Value = ObjCVarReceivables_AGR.Notes;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarReceivables_AGR.ViewOrder;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarReceivables_AGR.IsDeleted;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarReceivables_AGR.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarReceivables_AGR.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarReceivables_AGR.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarReceivables_AGR.ModificationDate;
                        Com.Parameters["@PayableID"].Value = ObjCVarReceivables_AGR.PayableID;
                        Com.Parameters["@IssueDate"].Value = ObjCVarReceivables_AGR.IssueDate;
                        Com.Parameters["@OperationContainersAndPackagesID"].Value = ObjCVarReceivables_AGR.OperationContainersAndPackagesID;
                        Com.Parameters["@DraftInvoiceID"].Value = ObjCVarReceivables_AGR.DraftInvoiceID;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarReceivables_AGR.TaxAmount;
                        Com.Parameters["@DiscountTypeID"].Value = ObjCVarReceivables_AGR.DiscountTypeID;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarReceivables_AGR.DiscountAmount;
                        Com.Parameters["@AmountWithoutVAT"].Value = ObjCVarReceivables_AGR.AmountWithoutVAT;
                        Com.Parameters["@TaxPercentage"].Value = ObjCVarReceivables_AGR.TaxPercentage;
                        Com.Parameters["@HouseBillID"].Value = ObjCVarReceivables_AGR.HouseBillID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarReceivables_AGR.DiscountPercentage;
                        Com.Parameters["@OperationVehicleID"].Value = ObjCVarReceivables_AGR.OperationVehicleID;
                        Com.Parameters["@TruckingOrderID"].Value = ObjCVarReceivables_AGR.TruckingOrderID;
                        Com.Parameters["@PreviousCutOffDate"].Value = ObjCVarReceivables_AGR.PreviousCutOffDate;
                        Com.Parameters["@CutOffDate"].Value = ObjCVarReceivables_AGR.CutOffDate;
                        Com.Parameters["@VehicleAgingReportID"].Value = ObjCVarReceivables_AGR.VehicleAgingReportID;
                        Com.Parameters["@CancelledReceivableID"].Value = ObjCVarReceivables_AGR.CancelledReceivableID;
                        Com.Parameters["@IsReceipt"].Value = ObjCVarReceivables_AGR.IsReceipt;
                        Com.Parameters["@InvoiceID_3PL"].Value = ObjCVarReceivables_AGR.InvoiceID_3PL;
                        Com.Parameters["@SalePrice_Foreign"].Value = ObjCVarReceivables_AGR.SalePrice_Foreign;
                        Com.Parameters["@CurrencyID_Foreign"].Value = ObjCVarReceivables_AGR.CurrencyID_Foreign;
                        Com.Parameters["@ExchangeRate_Foreign"].Value = ObjCVarReceivables_AGR.ExchangeRate_Foreign;
                        Com.Parameters["@ReceiptNo"].Value = ObjCVarReceivables_AGR.ReceiptNo;
                        Com.Parameters["@ReceiptDate"].Value = ObjCVarReceivables_AGR.ReceiptDate;
                        EndTrans(Com, Con);
                        if (ObjCVarReceivables_AGR.ID == 0)
                        {
                            ObjCVarReceivables_AGR.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarReceivables_AGR.mIsChanges = false;
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
