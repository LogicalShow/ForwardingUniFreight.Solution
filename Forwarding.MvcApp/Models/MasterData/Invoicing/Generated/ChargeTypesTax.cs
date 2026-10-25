using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Invoicing.Generated
{
    [Serializable]
    public class CPKChargeTypesTAX
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
    public partial class CVarChargeTypesTAX : CPKChargeTypesTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Int32 mMeasurementID;
        internal Int32 mTaxeTypeID;
        internal Int32 mInvoiceTypeID;
        internal Int32 mViewOrder;
        internal String mNotes;
        internal Boolean mIsUsedInReceivable;
        internal Boolean mIsUsedInPayable;
        internal Boolean mIsOcean;
        internal Boolean mIsInland;
        internal Boolean mIsAir;
        internal Boolean mIsDefaultInQuotation;
        internal Boolean mIsDefaultInOperations;
        internal Boolean mIsAddedManually;
        internal Boolean mIsInactive;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal Boolean mIsOperationChargeType;
        internal Boolean mIsGeneralChargeType;
        internal Int32 mAccountID_Revenue;
        internal Int32 mSubAccountID_Revenue;
        internal Int32 mCostCenterID_Revenue;
        internal Int32 mAccountID_Expense;
        internal Int32 mSubAccountID_Expense;
        internal Int32 mCostCenterID_Expense;
        internal Int32 mTemplateID;
        internal Int64 mPurchaseItemID;
        internal Boolean mIsTank;
        internal Boolean mIsWarehouseChargeType;
        internal Boolean mIsExcludeInTruckingOrderPrint;
        internal Int32 mAccountID_Return;
        internal Int32 mSubAccountID_Return;
        internal Boolean mIsOfficial;
        internal String mPreCode;
        internal Int32 mChargeTypeGroupID;
        internal Decimal mCost;
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
        public Int32 MeasurementID
        {
            get { return mMeasurementID; }
            set { mIsChanges = true; mMeasurementID = value; }
        }
        public Int32 TaxeTypeID
        {
            get { return mTaxeTypeID; }
            set { mIsChanges = true; mTaxeTypeID = value; }
        }
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mIsChanges = true; mInvoiceTypeID = value; }
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
        public Boolean IsUsedInReceivable
        {
            get { return mIsUsedInReceivable; }
            set { mIsChanges = true; mIsUsedInReceivable = value; }
        }
        public Boolean IsUsedInPayable
        {
            get { return mIsUsedInPayable; }
            set { mIsChanges = true; mIsUsedInPayable = value; }
        }
        public Boolean IsOcean
        {
            get { return mIsOcean; }
            set { mIsChanges = true; mIsOcean = value; }
        }
        public Boolean IsInland
        {
            get { return mIsInland; }
            set { mIsChanges = true; mIsInland = value; }
        }
        public Boolean IsAir
        {
            get { return mIsAir; }
            set { mIsChanges = true; mIsAir = value; }
        }
        public Boolean IsDefaultInQuotation
        {
            get { return mIsDefaultInQuotation; }
            set { mIsChanges = true; mIsDefaultInQuotation = value; }
        }
        public Boolean IsDefaultInOperations
        {
            get { return mIsDefaultInOperations; }
            set { mIsChanges = true; mIsDefaultInOperations = value; }
        }
        public Boolean IsAddedManually
        {
            get { return mIsAddedManually; }
            set { mIsChanges = true; mIsAddedManually = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
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
        public Int32 LockingUserID
        {
            get { return mLockingUserID; }
            set { mIsChanges = true; mLockingUserID = value; }
        }
        public DateTime TimeLocked
        {
            get { return mTimeLocked; }
            set { mIsChanges = true; mTimeLocked = value; }
        }
        public Boolean IsOperationChargeType
        {
            get { return mIsOperationChargeType; }
            set { mIsChanges = true; mIsOperationChargeType = value; }
        }
        public Boolean IsGeneralChargeType
        {
            get { return mIsGeneralChargeType; }
            set { mIsChanges = true; mIsGeneralChargeType = value; }
        }
        public Int32 AccountID_Revenue
        {
            get { return mAccountID_Revenue; }
            set { mIsChanges = true; mAccountID_Revenue = value; }
        }
        public Int32 SubAccountID_Revenue
        {
            get { return mSubAccountID_Revenue; }
            set { mIsChanges = true; mSubAccountID_Revenue = value; }
        }
        public Int32 CostCenterID_Revenue
        {
            get { return mCostCenterID_Revenue; }
            set { mIsChanges = true; mCostCenterID_Revenue = value; }
        }
        public Int32 AccountID_Expense
        {
            get { return mAccountID_Expense; }
            set { mIsChanges = true; mAccountID_Expense = value; }
        }
        public Int32 SubAccountID_Expense
        {
            get { return mSubAccountID_Expense; }
            set { mIsChanges = true; mSubAccountID_Expense = value; }
        }
        public Int32 CostCenterID_Expense
        {
            get { return mCostCenterID_Expense; }
            set { mIsChanges = true; mCostCenterID_Expense = value; }
        }
        public Int32 TemplateID
        {
            get { return mTemplateID; }
            set { mIsChanges = true; mTemplateID = value; }
        }
        public Int64 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mIsChanges = true; mPurchaseItemID = value; }
        }
        public Boolean IsTank
        {
            get { return mIsTank; }
            set { mIsChanges = true; mIsTank = value; }
        }
        public Boolean IsWarehouseChargeType
        {
            get { return mIsWarehouseChargeType; }
            set { mIsChanges = true; mIsWarehouseChargeType = value; }
        }
        public Boolean IsExcludeInTruckingOrderPrint
        {
            get { return mIsExcludeInTruckingOrderPrint; }
            set { mIsChanges = true; mIsExcludeInTruckingOrderPrint = value; }
        }
        public Int32 AccountID_Return
        {
            get { return mAccountID_Return; }
            set { mIsChanges = true; mAccountID_Return = value; }
        }
        public Int32 SubAccountID_Return
        {
            get { return mSubAccountID_Return; }
            set { mIsChanges = true; mSubAccountID_Return = value; }
        }
        public Boolean IsOfficial
        {
            get { return mIsOfficial; }
            set { mIsChanges = true; mIsOfficial = value; }
        }
        public String PreCode
        {
            get { return mPreCode; }
            set { mIsChanges = true; mPreCode = value; }
        }
        public Int32 ChargeTypeGroupID
        {
            get { return mChargeTypeGroupID; }
            set { mIsChanges = true; mChargeTypeGroupID = value; }
        }
        public Decimal Cost
        {
            get { return mCost; }
            set { mIsChanges = true; mCost = value; }
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

    public partial class CChargeTypesTAX
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
        public List<CVarChargeTypesTAX> lstCVarChargeTypes = new List<CVarChargeTypesTAX>();
        public List<CPKChargeTypesTAX> lstDeletedCPKChargeTypes = new List<CPKChargeTypesTAX>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarChargeTypes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListChargeTypesTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemChargeTypesTax";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarChargeTypesTAX ObjCVarChargeTypes = new CVarChargeTypesTAX();
                        ObjCVarChargeTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarChargeTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarChargeTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarChargeTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarChargeTypes.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarChargeTypes.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarChargeTypes.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarChargeTypes.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarChargeTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarChargeTypes.mIsUsedInReceivable = Convert.ToBoolean(dr["IsUsedInReceivable"].ToString());
                        ObjCVarChargeTypes.mIsUsedInPayable = Convert.ToBoolean(dr["IsUsedInPayable"].ToString());
                        ObjCVarChargeTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarChargeTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarChargeTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarChargeTypes.mIsDefaultInQuotation = Convert.ToBoolean(dr["IsDefaultInQuotation"].ToString());
                        ObjCVarChargeTypes.mIsDefaultInOperations = Convert.ToBoolean(dr["IsDefaultInOperations"].ToString());
                        ObjCVarChargeTypes.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarChargeTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarChargeTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarChargeTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarChargeTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarChargeTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarChargeTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarChargeTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarChargeTypes.mIsOperationChargeType = Convert.ToBoolean(dr["IsOperationChargeType"].ToString());
                        ObjCVarChargeTypes.mIsGeneralChargeType = Convert.ToBoolean(dr["IsGeneralChargeType"].ToString());
                        ObjCVarChargeTypes.mAccountID_Revenue = Convert.ToInt32(dr["AccountID_Revenue"].ToString());
                        ObjCVarChargeTypes.mSubAccountID_Revenue = Convert.ToInt32(dr["SubAccountID_Revenue"].ToString());
                        ObjCVarChargeTypes.mCostCenterID_Revenue = Convert.ToInt32(dr["CostCenterID_Revenue"].ToString());
                        ObjCVarChargeTypes.mAccountID_Expense = Convert.ToInt32(dr["AccountID_Expense"].ToString());
                        ObjCVarChargeTypes.mSubAccountID_Expense = Convert.ToInt32(dr["SubAccountID_Expense"].ToString());
                        ObjCVarChargeTypes.mCostCenterID_Expense = Convert.ToInt32(dr["CostCenterID_Expense"].ToString());
                        ObjCVarChargeTypes.mTemplateID = Convert.ToInt32(dr["TemplateID"].ToString());
                        ObjCVarChargeTypes.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarChargeTypes.mIsTank = Convert.ToBoolean(dr["IsTank"].ToString());
                        ObjCVarChargeTypes.mIsWarehouseChargeType = Convert.ToBoolean(dr["IsWarehouseChargeType"].ToString());
                        ObjCVarChargeTypes.mIsExcludeInTruckingOrderPrint = Convert.ToBoolean(dr["IsExcludeInTruckingOrderPrint"].ToString());
                        ObjCVarChargeTypes.mAccountID_Return = Convert.ToInt32(dr["AccountID_Return"].ToString());
                        ObjCVarChargeTypes.mSubAccountID_Return = Convert.ToInt32(dr["SubAccountID_Return"].ToString());
                        ObjCVarChargeTypes.mIsOfficial = Convert.ToBoolean(dr["IsOfficial"].ToString());
                        ObjCVarChargeTypes.mPreCode = Convert.ToString(dr["PreCode"].ToString());
                        ObjCVarChargeTypes.mChargeTypeGroupID = Convert.ToInt32(dr["ChargeTypeGroupID"].ToString());
                        ObjCVarChargeTypes.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        lstCVarChargeTypes.Add(ObjCVarChargeTypes);
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
            lstCVarChargeTypes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingChargeTypes";
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
                        CVarChargeTypesTAX ObjCVarChargeTypes = new CVarChargeTypesTAX();
                        ObjCVarChargeTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarChargeTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarChargeTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarChargeTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarChargeTypes.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarChargeTypes.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarChargeTypes.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarChargeTypes.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarChargeTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarChargeTypes.mIsUsedInReceivable = Convert.ToBoolean(dr["IsUsedInReceivable"].ToString());
                        ObjCVarChargeTypes.mIsUsedInPayable = Convert.ToBoolean(dr["IsUsedInPayable"].ToString());
                        ObjCVarChargeTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarChargeTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarChargeTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarChargeTypes.mIsDefaultInQuotation = Convert.ToBoolean(dr["IsDefaultInQuotation"].ToString());
                        ObjCVarChargeTypes.mIsDefaultInOperations = Convert.ToBoolean(dr["IsDefaultInOperations"].ToString());
                        ObjCVarChargeTypes.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarChargeTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarChargeTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarChargeTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarChargeTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarChargeTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarChargeTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarChargeTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarChargeTypes.mIsOperationChargeType = Convert.ToBoolean(dr["IsOperationChargeType"].ToString());
                        ObjCVarChargeTypes.mIsGeneralChargeType = Convert.ToBoolean(dr["IsGeneralChargeType"].ToString());
                        ObjCVarChargeTypes.mAccountID_Revenue = Convert.ToInt32(dr["AccountID_Revenue"].ToString());
                        ObjCVarChargeTypes.mSubAccountID_Revenue = Convert.ToInt32(dr["SubAccountID_Revenue"].ToString());
                        ObjCVarChargeTypes.mCostCenterID_Revenue = Convert.ToInt32(dr["CostCenterID_Revenue"].ToString());
                        ObjCVarChargeTypes.mAccountID_Expense = Convert.ToInt32(dr["AccountID_Expense"].ToString());
                        ObjCVarChargeTypes.mSubAccountID_Expense = Convert.ToInt32(dr["SubAccountID_Expense"].ToString());
                        ObjCVarChargeTypes.mCostCenterID_Expense = Convert.ToInt32(dr["CostCenterID_Expense"].ToString());
                        ObjCVarChargeTypes.mTemplateID = Convert.ToInt32(dr["TemplateID"].ToString());
                        ObjCVarChargeTypes.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarChargeTypes.mIsTank = Convert.ToBoolean(dr["IsTank"].ToString());
                        ObjCVarChargeTypes.mIsWarehouseChargeType = Convert.ToBoolean(dr["IsWarehouseChargeType"].ToString());
                        ObjCVarChargeTypes.mIsExcludeInTruckingOrderPrint = Convert.ToBoolean(dr["IsExcludeInTruckingOrderPrint"].ToString());
                        ObjCVarChargeTypes.mAccountID_Return = Convert.ToInt32(dr["AccountID_Return"].ToString());
                        ObjCVarChargeTypes.mSubAccountID_Return = Convert.ToInt32(dr["SubAccountID_Return"].ToString());
                        ObjCVarChargeTypes.mIsOfficial = Convert.ToBoolean(dr["IsOfficial"].ToString());
                        ObjCVarChargeTypes.mPreCode = Convert.ToString(dr["PreCode"].ToString());
                        ObjCVarChargeTypes.mChargeTypeGroupID = Convert.ToInt32(dr["ChargeTypeGroupID"].ToString());
                        ObjCVarChargeTypes.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarChargeTypes.Add(ObjCVarChargeTypes);
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
                    Com.CommandText = "[dbo].DeleteListChargeTypes";
                else
                    Com.CommandText = "[dbo].UpdateListChargeTypes";
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
        public Exception DeleteItem(List<CPKChargeTypesTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemChargeTypesTax";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKChargeTypesTAX ObjCPKChargeTypes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKChargeTypes.ID);
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
        public Exception SaveMethod(List<CVarChargeTypesTAX> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@MeasurementID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoiceTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ViewOrder", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsUsedInReceivable", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsUsedInPayable", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsOcean", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInland", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAir", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDefaultInQuotation", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDefaultInOperations", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAddedManually", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsOperationChargeType", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsGeneralChargeType", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AccountID_Revenue", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID_Revenue", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID_Revenue", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AccountID_Expense", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID_Expense", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID_Expense", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TemplateID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsTank", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsWarehouseChargeType", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsExcludeInTruckingOrderPrint", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AccountID_Return", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID_Return", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsOfficial", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PreCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarChargeTypesTAX ObjCVarChargeTypes in SaveList)
                {
                    if (ObjCVarChargeTypes.mIsChanges == true)
                    {
                        if (ObjCVarChargeTypes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemChargeTypesTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarChargeTypes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemChargeTypesTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarChargeTypes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarChargeTypes.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarChargeTypes.Code;
                        Com.Parameters["@Name"].Value = ObjCVarChargeTypes.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarChargeTypes.LocalName;
                        Com.Parameters["@MeasurementID"].Value = ObjCVarChargeTypes.MeasurementID;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarChargeTypes.TaxeTypeID;
                        Com.Parameters["@InvoiceTypeID"].Value = ObjCVarChargeTypes.InvoiceTypeID;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarChargeTypes.ViewOrder;
                        Com.Parameters["@Notes"].Value = ObjCVarChargeTypes.Notes;
                        Com.Parameters["@IsUsedInReceivable"].Value = ObjCVarChargeTypes.IsUsedInReceivable;
                        Com.Parameters["@IsUsedInPayable"].Value = ObjCVarChargeTypes.IsUsedInPayable;
                        Com.Parameters["@IsOcean"].Value = ObjCVarChargeTypes.IsOcean;
                        Com.Parameters["@IsInland"].Value = ObjCVarChargeTypes.IsInland;
                        Com.Parameters["@IsAir"].Value = ObjCVarChargeTypes.IsAir;
                        Com.Parameters["@IsDefaultInQuotation"].Value = ObjCVarChargeTypes.IsDefaultInQuotation;
                        Com.Parameters["@IsDefaultInOperations"].Value = ObjCVarChargeTypes.IsDefaultInOperations;
                        Com.Parameters["@IsAddedManually"].Value = ObjCVarChargeTypes.IsAddedManually;
                        Com.Parameters["@IsInactive"].Value = ObjCVarChargeTypes.IsInactive;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarChargeTypes.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarChargeTypes.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarChargeTypes.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarChargeTypes.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarChargeTypes.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarChargeTypes.TimeLocked;
                        Com.Parameters["@IsOperationChargeType"].Value = ObjCVarChargeTypes.IsOperationChargeType;
                        Com.Parameters["@IsGeneralChargeType"].Value = ObjCVarChargeTypes.IsGeneralChargeType;
                        Com.Parameters["@AccountID_Revenue"].Value = ObjCVarChargeTypes.AccountID_Revenue;
                        Com.Parameters["@SubAccountID_Revenue"].Value = ObjCVarChargeTypes.SubAccountID_Revenue;
                        Com.Parameters["@CostCenterID_Revenue"].Value = ObjCVarChargeTypes.CostCenterID_Revenue;
                        Com.Parameters["@AccountID_Expense"].Value = ObjCVarChargeTypes.AccountID_Expense;
                        Com.Parameters["@SubAccountID_Expense"].Value = ObjCVarChargeTypes.SubAccountID_Expense;
                        Com.Parameters["@CostCenterID_Expense"].Value = ObjCVarChargeTypes.CostCenterID_Expense;
                        Com.Parameters["@TemplateID"].Value = ObjCVarChargeTypes.TemplateID;
                        Com.Parameters["@PurchaseItemID"].Value = ObjCVarChargeTypes.PurchaseItemID;
                        Com.Parameters["@IsTank"].Value = ObjCVarChargeTypes.IsTank;
                        Com.Parameters["@IsWarehouseChargeType"].Value = ObjCVarChargeTypes.IsWarehouseChargeType;
                        Com.Parameters["@IsExcludeInTruckingOrderPrint"].Value = ObjCVarChargeTypes.IsExcludeInTruckingOrderPrint;
                        Com.Parameters["@AccountID_Return"].Value = ObjCVarChargeTypes.AccountID_Return;
                        Com.Parameters["@SubAccountID_Return"].Value = ObjCVarChargeTypes.SubAccountID_Return;
                        Com.Parameters["@IsOfficial"].Value = ObjCVarChargeTypes.IsOfficial;
                        Com.Parameters["@PreCode"].Value = ObjCVarChargeTypes.PreCode;
                        Com.Parameters["@ChargeTypeGroupID"].Value = ObjCVarChargeTypes.ChargeTypeGroupID;
                        Com.Parameters["@Cost"].Value = ObjCVarChargeTypes.Cost;
                        EndTrans(Com, Con);
                        if (ObjCVarChargeTypes.ID == 0)
                        {
                            ObjCVarChargeTypes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarChargeTypes.mIsChanges = false;
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