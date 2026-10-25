using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKPS_SupplyOrders
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
    public partial class CVarPS_SupplyOrders : CPKPS_SupplyOrders
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mSupplierID;
        internal String mNotes;
        internal DateTime mPurchasingSupplyDate;
        internal String mPurchasingSupplyNo;
        internal Boolean mIsDeleted;
        internal String mPurchasingSupplyNoManual;
        internal Boolean mIsApproved;
        internal Int64 mPS_QuotationsID;
        internal DateTime mEditedDate;
        internal Int32 mCreatedUserID;
        internal DateTime mCreatedDate;
        internal Int32 mApprovedUserID;
        internal DateTime mApprovedDate;
        internal Int32 mEditedByUserID;
        internal Int32 mCostCenter_ID;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal Int32 mDepartmentID;
        internal Int32 mBranchID;
        internal Int64 mPS_PurchasingOrdersID;
        internal Int32 mPaymentTermID;
        internal String mPaymentNotes;
        #endregion

        #region "Methods"
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public DateTime PurchasingSupplyDate
        {
            get { return mPurchasingSupplyDate; }
            set { mIsChanges = true; mPurchasingSupplyDate = value; }
        }
        public String PurchasingSupplyNo
        {
            get { return mPurchasingSupplyNo; }
            set { mIsChanges = true; mPurchasingSupplyNo = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public String PurchasingSupplyNoManual
        {
            get { return mPurchasingSupplyNoManual; }
            set { mIsChanges = true; mPurchasingSupplyNoManual = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Int64 PS_QuotationsID
        {
            get { return mPS_QuotationsID; }
            set { mIsChanges = true; mPS_QuotationsID = value; }
        }
        public DateTime EditedDate
        {
            get { return mEditedDate; }
            set { mIsChanges = true; mEditedDate = value; }
        }
        public Int32 CreatedUserID
        {
            get { return mCreatedUserID; }
            set { mIsChanges = true; mCreatedUserID = value; }
        }
        public DateTime CreatedDate
        {
            get { return mCreatedDate; }
            set { mIsChanges = true; mCreatedDate = value; }
        }
        public Int32 ApprovedUserID
        {
            get { return mApprovedUserID; }
            set { mIsChanges = true; mApprovedUserID = value; }
        }
        public DateTime ApprovedDate
        {
            get { return mApprovedDate; }
            set { mIsChanges = true; mApprovedDate = value; }
        }
        public Int32 EditedByUserID
        {
            get { return mEditedByUserID; }
            set { mIsChanges = true; mEditedByUserID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mIsChanges = true; mCostCenter_ID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int64 PS_PurchasingOrdersID
        {
            get { return mPS_PurchasingOrdersID; }
            set { mIsChanges = true; mPS_PurchasingOrdersID = value; }
        }
        public Int32 PaymentTermID
        {
            get { return mPaymentTermID; }
            set { mIsChanges = true; mPaymentTermID = value; }
        }
        public String PaymentNotes
        {
            get { return mPaymentNotes; }
            set { mIsChanges = true; mPaymentNotes = value; }
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

    public partial class CPS_SupplyOrders
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
        public List<CVarPS_SupplyOrders> lstCVarPS_SupplyOrders = new List<CVarPS_SupplyOrders>();
        public List<CPKPS_SupplyOrders> lstDeletedCPKPS_SupplyOrders = new List<CPKPS_SupplyOrders>();
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
            lstCVarPS_SupplyOrders.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_SupplyOrders";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_SupplyOrders";
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
                        CVarPS_SupplyOrders ObjCVarPS_SupplyOrders = new CVarPS_SupplyOrders();
                        ObjCVarPS_SupplyOrders.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_SupplyOrders.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_SupplyOrders.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_SupplyOrders.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarPS_SupplyOrders.mPurchasingSupplyNo = Convert.ToString(dr["PurchasingSupplyNo"].ToString());
                        ObjCVarPS_SupplyOrders.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_SupplyOrders.mPurchasingSupplyNoManual = Convert.ToString(dr["PurchasingSupplyNoManual"].ToString());
                        ObjCVarPS_SupplyOrders.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_SupplyOrders.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarPS_SupplyOrders.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarPS_SupplyOrders.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_SupplyOrders.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_SupplyOrders.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_SupplyOrders.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_SupplyOrders.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_SupplyOrders.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_SupplyOrders.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_SupplyOrders.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPS_SupplyOrders.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_SupplyOrders.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarPS_SupplyOrders.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarPS_SupplyOrders.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarPS_SupplyOrders.mPaymentNotes = Convert.ToString(dr["PaymentNotes"].ToString());
                        lstCVarPS_SupplyOrders.Add(ObjCVarPS_SupplyOrders);
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
            lstCVarPS_SupplyOrders.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_SupplyOrders";
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
                        CVarPS_SupplyOrders ObjCVarPS_SupplyOrders = new CVarPS_SupplyOrders();
                        ObjCVarPS_SupplyOrders.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_SupplyOrders.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_SupplyOrders.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_SupplyOrders.mPurchasingSupplyDate = Convert.ToDateTime(dr["PurchasingSupplyDate"].ToString());
                        ObjCVarPS_SupplyOrders.mPurchasingSupplyNo = Convert.ToString(dr["PurchasingSupplyNo"].ToString());
                        ObjCVarPS_SupplyOrders.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_SupplyOrders.mPurchasingSupplyNoManual = Convert.ToString(dr["PurchasingSupplyNoManual"].ToString());
                        ObjCVarPS_SupplyOrders.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_SupplyOrders.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarPS_SupplyOrders.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarPS_SupplyOrders.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_SupplyOrders.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_SupplyOrders.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_SupplyOrders.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_SupplyOrders.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_SupplyOrders.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_SupplyOrders.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_SupplyOrders.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPS_SupplyOrders.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_SupplyOrders.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarPS_SupplyOrders.mPS_PurchasingOrdersID = Convert.ToInt64(dr["PS_PurchasingOrdersID"].ToString());
                        ObjCVarPS_SupplyOrders.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarPS_SupplyOrders.mPaymentNotes = Convert.ToString(dr["PaymentNotes"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_SupplyOrders.Add(ObjCVarPS_SupplyOrders);
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
                    Com.CommandText = "[dbo].DeleteListPS_SupplyOrders";
                else
                    Com.CommandText = "[dbo].UpdateListPS_SupplyOrders";
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
        public Exception DeleteItem(List<CPKPS_SupplyOrders> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_SupplyOrders";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPS_SupplyOrders ObjCPKPS_SupplyOrders in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPS_SupplyOrders.ID);
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
        public Exception SaveMethod(List<CVarPS_SupplyOrders> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PurchasingSupplyDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PurchasingSupplyNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PurchasingSupplyNoManual", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PS_QuotationsID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@EditedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CreatedUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ApprovedUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ApprovedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@EditedByUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PS_PurchasingOrdersID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PaymentTermID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PaymentNotes", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_SupplyOrders ObjCVarPS_SupplyOrders in SaveList)
                {
                    if (ObjCVarPS_SupplyOrders.mIsChanges == true)
                    {
                        if (ObjCVarPS_SupplyOrders.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_SupplyOrders";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_SupplyOrders.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_SupplyOrders";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_SupplyOrders.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_SupplyOrders.ID;
                        }
                        Com.Parameters["@SupplierID"].Value = ObjCVarPS_SupplyOrders.SupplierID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_SupplyOrders.Notes;
                        Com.Parameters["@PurchasingSupplyDate"].Value = ObjCVarPS_SupplyOrders.PurchasingSupplyDate;
                        Com.Parameters["@PurchasingSupplyNo"].Value = ObjCVarPS_SupplyOrders.PurchasingSupplyNo;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPS_SupplyOrders.IsDeleted;
                        Com.Parameters["@PurchasingSupplyNoManual"].Value = ObjCVarPS_SupplyOrders.PurchasingSupplyNoManual;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPS_SupplyOrders.IsApproved;
                        Com.Parameters["@PS_QuotationsID"].Value = ObjCVarPS_SupplyOrders.PS_QuotationsID;
                        Com.Parameters["@EditedDate"].Value = ObjCVarPS_SupplyOrders.EditedDate;
                        Com.Parameters["@CreatedUserID"].Value = ObjCVarPS_SupplyOrders.CreatedUserID;
                        Com.Parameters["@CreatedDate"].Value = ObjCVarPS_SupplyOrders.CreatedDate;
                        Com.Parameters["@ApprovedUserID"].Value = ObjCVarPS_SupplyOrders.ApprovedUserID;
                        Com.Parameters["@ApprovedDate"].Value = ObjCVarPS_SupplyOrders.ApprovedDate;
                        Com.Parameters["@EditedByUserID"].Value = ObjCVarPS_SupplyOrders.EditedByUserID;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarPS_SupplyOrders.CostCenter_ID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPS_SupplyOrders.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarPS_SupplyOrders.ExchangeRate;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarPS_SupplyOrders.DepartmentID;
                        Com.Parameters["@BranchID"].Value = ObjCVarPS_SupplyOrders.BranchID;
                        Com.Parameters["@PS_PurchasingOrdersID"].Value = ObjCVarPS_SupplyOrders.PS_PurchasingOrdersID;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarPS_SupplyOrders.PaymentTermID;
                        Com.Parameters["@PaymentNotes"].Value = ObjCVarPS_SupplyOrders.PaymentNotes;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_SupplyOrders.ID == 0)
                        {
                            ObjCVarPS_SupplyOrders.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_SupplyOrders.mIsChanges = false;
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
