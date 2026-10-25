using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Generated
{
    [Serializable]
    public class CPKWarehousingChargeTypes
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
    public partial class CVarWarehousingChargeTypes : CPKWarehousingChargeTypes
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

    public partial class CWarehousingChargeTypes
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
        public List<CVarWarehousingChargeTypes> lstCVarWarehousingChargeTypes = new List<CVarWarehousingChargeTypes>();
        public List<CPKWarehousingChargeTypes> lstDeletedCPKWarehousingChargeTypes = new List<CPKWarehousingChargeTypes>();
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
            lstCVarWarehousingChargeTypes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListWarehousingChargeTypes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemWarehousingChargeTypes";
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
                        CVarWarehousingChargeTypes ObjCVarWarehousingChargeTypes = new CVarWarehousingChargeTypes();
                        ObjCVarWarehousingChargeTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarWarehousingChargeTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarWarehousingChargeTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarWarehousingChargeTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarWarehousingChargeTypes.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarWarehousingChargeTypes.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarWarehousingChargeTypes.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarWarehousingChargeTypes.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarWarehousingChargeTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsUsedInReceivable = Convert.ToBoolean(dr["IsUsedInReceivable"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsUsedInPayable = Convert.ToBoolean(dr["IsUsedInPayable"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsDefaultInQuotation = Convert.ToBoolean(dr["IsDefaultInQuotation"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsDefaultInOperations = Convert.ToBoolean(dr["IsDefaultInOperations"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarWarehousingChargeTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarWarehousingChargeTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarWarehousingChargeTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarWarehousingChargeTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarWarehousingChargeTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarWarehousingChargeTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsOperationChargeType = Convert.ToBoolean(dr["IsOperationChargeType"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsGeneralChargeType = Convert.ToBoolean(dr["IsGeneralChargeType"].ToString());
                        ObjCVarWarehousingChargeTypes.mAccountID_Revenue = Convert.ToInt32(dr["AccountID_Revenue"].ToString());
                        ObjCVarWarehousingChargeTypes.mSubAccountID_Revenue = Convert.ToInt32(dr["SubAccountID_Revenue"].ToString());
                        ObjCVarWarehousingChargeTypes.mCostCenterID_Revenue = Convert.ToInt32(dr["CostCenterID_Revenue"].ToString());
                        ObjCVarWarehousingChargeTypes.mAccountID_Expense = Convert.ToInt32(dr["AccountID_Expense"].ToString());
                        ObjCVarWarehousingChargeTypes.mSubAccountID_Expense = Convert.ToInt32(dr["SubAccountID_Expense"].ToString());
                        ObjCVarWarehousingChargeTypes.mCostCenterID_Expense = Convert.ToInt32(dr["CostCenterID_Expense"].ToString());
                        ObjCVarWarehousingChargeTypes.mTemplateID = Convert.ToInt32(dr["TemplateID"].ToString());
                        ObjCVarWarehousingChargeTypes.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsTank = Convert.ToBoolean(dr["IsTank"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsWarehouseChargeType = Convert.ToBoolean(dr["IsWarehouseChargeType"].ToString());
                        lstCVarWarehousingChargeTypes.Add(ObjCVarWarehousingChargeTypes);
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
            lstCVarWarehousingChargeTypes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingWarehousingChargeTypes";
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
                        CVarWarehousingChargeTypes ObjCVarWarehousingChargeTypes = new CVarWarehousingChargeTypes();
                        ObjCVarWarehousingChargeTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarWarehousingChargeTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarWarehousingChargeTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarWarehousingChargeTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarWarehousingChargeTypes.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        ObjCVarWarehousingChargeTypes.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarWarehousingChargeTypes.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarWarehousingChargeTypes.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarWarehousingChargeTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsUsedInReceivable = Convert.ToBoolean(dr["IsUsedInReceivable"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsUsedInPayable = Convert.ToBoolean(dr["IsUsedInPayable"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsDefaultInQuotation = Convert.ToBoolean(dr["IsDefaultInQuotation"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsDefaultInOperations = Convert.ToBoolean(dr["IsDefaultInOperations"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsAddedManually = Convert.ToBoolean(dr["IsAddedManually"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarWarehousingChargeTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarWarehousingChargeTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarWarehousingChargeTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarWarehousingChargeTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarWarehousingChargeTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarWarehousingChargeTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsOperationChargeType = Convert.ToBoolean(dr["IsOperationChargeType"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsGeneralChargeType = Convert.ToBoolean(dr["IsGeneralChargeType"].ToString());
                        ObjCVarWarehousingChargeTypes.mAccountID_Revenue = Convert.ToInt32(dr["AccountID_Revenue"].ToString());
                        ObjCVarWarehousingChargeTypes.mSubAccountID_Revenue = Convert.ToInt32(dr["SubAccountID_Revenue"].ToString());
                        ObjCVarWarehousingChargeTypes.mCostCenterID_Revenue = Convert.ToInt32(dr["CostCenterID_Revenue"].ToString());
                        ObjCVarWarehousingChargeTypes.mAccountID_Expense = Convert.ToInt32(dr["AccountID_Expense"].ToString());
                        ObjCVarWarehousingChargeTypes.mSubAccountID_Expense = Convert.ToInt32(dr["SubAccountID_Expense"].ToString());
                        ObjCVarWarehousingChargeTypes.mCostCenterID_Expense = Convert.ToInt32(dr["CostCenterID_Expense"].ToString());
                        ObjCVarWarehousingChargeTypes.mTemplateID = Convert.ToInt32(dr["TemplateID"].ToString());
                        ObjCVarWarehousingChargeTypes.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsTank = Convert.ToBoolean(dr["IsTank"].ToString());
                        ObjCVarWarehousingChargeTypes.mIsWarehouseChargeType = Convert.ToBoolean(dr["IsWarehouseChargeType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarWarehousingChargeTypes.Add(ObjCVarWarehousingChargeTypes);
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
                    Com.CommandText = "[dbo].DeleteListWarehousingChargeTypes";
                else
                    Com.CommandText = "[dbo].UpdateListWarehousingChargeTypes";
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
        public Exception DeleteItem(List<CPKWarehousingChargeTypes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemWarehousingChargeTypes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKWarehousingChargeTypes ObjCPKWarehousingChargeTypes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWarehousingChargeTypes.ID);
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
        public Exception SaveMethod(List<CVarWarehousingChargeTypes> SaveList)
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
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarWarehousingChargeTypes ObjCVarWarehousingChargeTypes in SaveList)
                {
                    if (ObjCVarWarehousingChargeTypes.mIsChanges == true)
                    {
                        if (ObjCVarWarehousingChargeTypes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemWarehousingChargeTypes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarWarehousingChargeTypes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemWarehousingChargeTypes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarWarehousingChargeTypes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarWarehousingChargeTypes.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarWarehousingChargeTypes.Code;
                        Com.Parameters["@Name"].Value = ObjCVarWarehousingChargeTypes.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarWarehousingChargeTypes.LocalName;
                        Com.Parameters["@MeasurementID"].Value = ObjCVarWarehousingChargeTypes.MeasurementID;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarWarehousingChargeTypes.TaxeTypeID;
                        Com.Parameters["@InvoiceTypeID"].Value = ObjCVarWarehousingChargeTypes.InvoiceTypeID;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarWarehousingChargeTypes.ViewOrder;
                        Com.Parameters["@Notes"].Value = ObjCVarWarehousingChargeTypes.Notes;
                        Com.Parameters["@IsUsedInReceivable"].Value = ObjCVarWarehousingChargeTypes.IsUsedInReceivable;
                        Com.Parameters["@IsUsedInPayable"].Value = ObjCVarWarehousingChargeTypes.IsUsedInPayable;
                        Com.Parameters["@IsOcean"].Value = ObjCVarWarehousingChargeTypes.IsOcean;
                        Com.Parameters["@IsInland"].Value = ObjCVarWarehousingChargeTypes.IsInland;
                        Com.Parameters["@IsAir"].Value = ObjCVarWarehousingChargeTypes.IsAir;
                        Com.Parameters["@IsDefaultInQuotation"].Value = ObjCVarWarehousingChargeTypes.IsDefaultInQuotation;
                        Com.Parameters["@IsDefaultInOperations"].Value = ObjCVarWarehousingChargeTypes.IsDefaultInOperations;
                        Com.Parameters["@IsAddedManually"].Value = ObjCVarWarehousingChargeTypes.IsAddedManually;
                        Com.Parameters["@IsInactive"].Value = ObjCVarWarehousingChargeTypes.IsInactive;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarWarehousingChargeTypes.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarWarehousingChargeTypes.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarWarehousingChargeTypes.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarWarehousingChargeTypes.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarWarehousingChargeTypes.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarWarehousingChargeTypes.TimeLocked;
                        Com.Parameters["@IsOperationChargeType"].Value = ObjCVarWarehousingChargeTypes.IsOperationChargeType;
                        Com.Parameters["@IsGeneralChargeType"].Value = ObjCVarWarehousingChargeTypes.IsGeneralChargeType;
                        Com.Parameters["@AccountID_Revenue"].Value = ObjCVarWarehousingChargeTypes.AccountID_Revenue;
                        Com.Parameters["@SubAccountID_Revenue"].Value = ObjCVarWarehousingChargeTypes.SubAccountID_Revenue;
                        Com.Parameters["@CostCenterID_Revenue"].Value = ObjCVarWarehousingChargeTypes.CostCenterID_Revenue;
                        Com.Parameters["@AccountID_Expense"].Value = ObjCVarWarehousingChargeTypes.AccountID_Expense;
                        Com.Parameters["@SubAccountID_Expense"].Value = ObjCVarWarehousingChargeTypes.SubAccountID_Expense;
                        Com.Parameters["@CostCenterID_Expense"].Value = ObjCVarWarehousingChargeTypes.CostCenterID_Expense;
                        Com.Parameters["@TemplateID"].Value = ObjCVarWarehousingChargeTypes.TemplateID;
                        Com.Parameters["@PurchaseItemID"].Value = ObjCVarWarehousingChargeTypes.PurchaseItemID;
                        Com.Parameters["@IsTank"].Value = ObjCVarWarehousingChargeTypes.IsTank;
                        Com.Parameters["@IsWarehouseChargeType"].Value = ObjCVarWarehousingChargeTypes.IsWarehouseChargeType;
                        EndTrans(Com, Con);
                        if (ObjCVarWarehousingChargeTypes.ID == 0)
                        {
                            ObjCVarWarehousingChargeTypes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarWarehousingChargeTypes.mIsChanges = false;
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
