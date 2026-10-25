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
    public class CPKPS_PurchasingOrders
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
    public partial class CVarPS_PurchasingOrders : CPKPS_PurchasingOrders
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mSupplierID;
        internal String mNotes;
        internal DateTime mPurchasingOrderDate;
        internal String mPurchasingOrderNo;
        internal Boolean mIsDeleted;
        internal String mPurchasingOrderNoManual;
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
        public DateTime PurchasingOrderDate
        {
            get { return mPurchasingOrderDate; }
            set { mIsChanges = true; mPurchasingOrderDate = value; }
        }
        public String PurchasingOrderNo
        {
            get { return mPurchasingOrderNo; }
            set { mIsChanges = true; mPurchasingOrderNo = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public String PurchasingOrderNoManual
        {
            get { return mPurchasingOrderNoManual; }
            set { mIsChanges = true; mPurchasingOrderNoManual = value; }
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

    public partial class CPS_PurchasingOrders
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
        public List<CVarPS_PurchasingOrders> lstCVarPS_PurchasingOrders = new List<CVarPS_PurchasingOrders>();
        public List<CPKPS_PurchasingOrders> lstDeletedCPKPS_PurchasingOrders = new List<CPKPS_PurchasingOrders>();
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
            lstCVarPS_PurchasingOrders.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_PurchasingOrders";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_PurchasingOrders";
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
                        CVarPS_PurchasingOrders ObjCVarPS_PurchasingOrders = new CVarPS_PurchasingOrders();
                        ObjCVarPS_PurchasingOrders.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_PurchasingOrders.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_PurchasingOrders.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingOrders.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarPS_PurchasingOrders.mPurchasingOrderNo = Convert.ToString(dr["PurchasingOrderNo"].ToString());
                        ObjCVarPS_PurchasingOrders.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_PurchasingOrders.mPurchasingOrderNoManual = Convert.ToString(dr["PurchasingOrderNoManual"].ToString());
                        ObjCVarPS_PurchasingOrders.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_PurchasingOrders.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarPS_PurchasingOrders.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarPS_PurchasingOrders.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_PurchasingOrders.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_PurchasingOrders.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_PurchasingOrders.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_PurchasingOrders.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_PurchasingOrders.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_PurchasingOrders.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_PurchasingOrders.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPS_PurchasingOrders.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_PurchasingOrders.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        lstCVarPS_PurchasingOrders.Add(ObjCVarPS_PurchasingOrders);
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
            lstCVarPS_PurchasingOrders.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_PurchasingOrders";
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
                        CVarPS_PurchasingOrders ObjCVarPS_PurchasingOrders = new CVarPS_PurchasingOrders();
                        ObjCVarPS_PurchasingOrders.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_PurchasingOrders.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_PurchasingOrders.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingOrders.mPurchasingOrderDate = Convert.ToDateTime(dr["PurchasingOrderDate"].ToString());
                        ObjCVarPS_PurchasingOrders.mPurchasingOrderNo = Convert.ToString(dr["PurchasingOrderNo"].ToString());
                        ObjCVarPS_PurchasingOrders.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_PurchasingOrders.mPurchasingOrderNoManual = Convert.ToString(dr["PurchasingOrderNoManual"].ToString());
                        ObjCVarPS_PurchasingOrders.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_PurchasingOrders.mPS_QuotationsID = Convert.ToInt64(dr["PS_QuotationsID"].ToString());
                        ObjCVarPS_PurchasingOrders.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarPS_PurchasingOrders.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_PurchasingOrders.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_PurchasingOrders.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_PurchasingOrders.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_PurchasingOrders.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_PurchasingOrders.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_PurchasingOrders.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_PurchasingOrders.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPS_PurchasingOrders.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_PurchasingOrders.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_PurchasingOrders.Add(ObjCVarPS_PurchasingOrders);
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
                    Com.CommandText = "[dbo].DeleteListPS_PurchasingOrders";
                else
                    Com.CommandText = "[dbo].UpdateListPS_PurchasingOrders";
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
        public Exception DeleteItem(List<CPKPS_PurchasingOrders> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_PurchasingOrders";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPS_PurchasingOrders ObjCPKPS_PurchasingOrders in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPS_PurchasingOrders.ID);
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
        public Exception SaveMethod(List<CVarPS_PurchasingOrders> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@PurchasingOrderDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PurchasingOrderNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PurchasingOrderNoManual", SqlDbType.NVarChar));
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
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_PurchasingOrders ObjCVarPS_PurchasingOrders in SaveList)
                {
                    if (ObjCVarPS_PurchasingOrders.mIsChanges == true)
                    {
                        if (ObjCVarPS_PurchasingOrders.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_PurchasingOrders";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_PurchasingOrders.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_PurchasingOrders";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_PurchasingOrders.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_PurchasingOrders.ID;
                        }
                        Com.Parameters["@SupplierID"].Value = ObjCVarPS_PurchasingOrders.SupplierID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_PurchasingOrders.Notes;
                        Com.Parameters["@PurchasingOrderDate"].Value = ObjCVarPS_PurchasingOrders.PurchasingOrderDate;
                        Com.Parameters["@PurchasingOrderNo"].Value = ObjCVarPS_PurchasingOrders.PurchasingOrderNo;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPS_PurchasingOrders.IsDeleted;
                        Com.Parameters["@PurchasingOrderNoManual"].Value = ObjCVarPS_PurchasingOrders.PurchasingOrderNoManual;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPS_PurchasingOrders.IsApproved;
                        Com.Parameters["@PS_QuotationsID"].Value = ObjCVarPS_PurchasingOrders.PS_QuotationsID;
                        Com.Parameters["@EditedDate"].Value = ObjCVarPS_PurchasingOrders.EditedDate;
                        Com.Parameters["@CreatedUserID"].Value = ObjCVarPS_PurchasingOrders.CreatedUserID;
                        Com.Parameters["@CreatedDate"].Value = ObjCVarPS_PurchasingOrders.CreatedDate;
                        Com.Parameters["@ApprovedUserID"].Value = ObjCVarPS_PurchasingOrders.ApprovedUserID;
                        Com.Parameters["@ApprovedDate"].Value = ObjCVarPS_PurchasingOrders.ApprovedDate;
                        Com.Parameters["@EditedByUserID"].Value = ObjCVarPS_PurchasingOrders.EditedByUserID;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarPS_PurchasingOrders.CostCenter_ID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPS_PurchasingOrders.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarPS_PurchasingOrders.ExchangeRate;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarPS_PurchasingOrders.DepartmentID;
                        Com.Parameters["@BranchID"].Value = ObjCVarPS_PurchasingOrders.BranchID;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_PurchasingOrders.ID == 0)
                        {
                            ObjCVarPS_PurchasingOrders.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_PurchasingOrders.mIsChanges = false;
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
