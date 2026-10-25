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
    public class CPKPS_Quotations
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
    public partial class CVarPS_Quotations : CPKPS_Quotations
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mSupplierID;
        internal String mNotes;
        internal DateTime mQuotationDate;
        internal String mQuotationNo;
        internal Boolean mIsDeleted;
        internal String mQuotationNoManual;
        internal Boolean mIsApproved;
        internal Int64 mPurchasingRequestID;
        internal DateTime mEditedDate;
        internal Int32 mCreatedUserID;
        internal DateTime mCreatedDate;
        internal Int32 mApprovedUserID;
        internal DateTime mApprovedDate;
        internal Int32 mEditedByUserID;
        internal Int32 mCostCenter_ID;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal String mName;

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
        public DateTime QuotationDate
        {
            get { return mQuotationDate; }
            set { mIsChanges = true; mQuotationDate = value; }
        }
        public String QuotationNo
        {
            get { return mQuotationNo; }
            set { mIsChanges = true; mQuotationNo = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public String QuotationNoManual
        {
            get { return mQuotationNoManual; }
            set { mIsChanges = true; mQuotationNoManual = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Int64 PurchasingRequestID
        {
            get { return mPurchasingRequestID; }
            set { mIsChanges = true; mPurchasingRequestID = value; }
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
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
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

    public partial class CPS_Quotations
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
        public List<CVarPS_Quotations> lstCVarPS_Quotations = new List<CVarPS_Quotations>();
        public List<CPKPS_Quotations> lstDeletedCPKPS_Quotations = new List<CPKPS_Quotations>();
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
            lstCVarPS_Quotations.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_Quotations";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_Quotations";
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
                        CVarPS_Quotations ObjCVarPS_Quotations = new CVarPS_Quotations();
                        ObjCVarPS_Quotations.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_Quotations.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_Quotations.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_Quotations.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarPS_Quotations.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarPS_Quotations.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_Quotations.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarPS_Quotations.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_Quotations.mPurchasingRequestID = Convert.ToInt64(dr["PurchasingRequestID"].ToString());
                        ObjCVarPS_Quotations.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarPS_Quotations.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_Quotations.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_Quotations.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_Quotations.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_Quotations.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_Quotations.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_Quotations.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_Quotations.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarPS_Quotations.mName = Convert.ToString(dr["Name"].ToString());

                        lstCVarPS_Quotations.Add(ObjCVarPS_Quotations);
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
            lstCVarPS_Quotations.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_Quotations";
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
                        CVarPS_Quotations ObjCVarPS_Quotations = new CVarPS_Quotations();
                        ObjCVarPS_Quotations.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_Quotations.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_Quotations.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_Quotations.mQuotationDate = Convert.ToDateTime(dr["QuotationDate"].ToString());
                        ObjCVarPS_Quotations.mQuotationNo = Convert.ToString(dr["QuotationNo"].ToString());
                        ObjCVarPS_Quotations.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarPS_Quotations.mQuotationNoManual = Convert.ToString(dr["QuotationNoManual"].ToString());
                        ObjCVarPS_Quotations.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_Quotations.mPurchasingRequestID = Convert.ToInt64(dr["PurchasingRequestID"].ToString());
                        ObjCVarPS_Quotations.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarPS_Quotations.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_Quotations.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_Quotations.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_Quotations.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_Quotations.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_Quotations.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarPS_Quotations.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_Quotations.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_Quotations.Add(ObjCVarPS_Quotations);
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
                    Com.CommandText = "[dbo].DeleteListPS_Quotations";
                else
                    Com.CommandText = "[dbo].UpdateListPS_Quotations";
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
        public Exception DeleteItem(List<CPKPS_Quotations> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_Quotations";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPS_Quotations ObjCPKPS_Quotations in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPS_Quotations.ID);
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
        public Exception SaveMethod(List<CVarPS_Quotations> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@QuotationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@QuotationNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@QuotationNoManual", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PurchasingRequestID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@EditedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CreatedUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ApprovedUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ApprovedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@EditedByUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_Quotations ObjCVarPS_Quotations in SaveList)
                {
                    if (ObjCVarPS_Quotations.mIsChanges == true)
                    {
                        if (ObjCVarPS_Quotations.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_Quotations";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_Quotations.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_Quotations";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_Quotations.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_Quotations.ID;
                        }
                        Com.Parameters["@SupplierID"].Value = ObjCVarPS_Quotations.SupplierID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_Quotations.Notes;
                        Com.Parameters["@QuotationDate"].Value = ObjCVarPS_Quotations.QuotationDate;
                        Com.Parameters["@QuotationNo"].Value = ObjCVarPS_Quotations.QuotationNo;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarPS_Quotations.IsDeleted;
                        Com.Parameters["@QuotationNoManual"].Value = ObjCVarPS_Quotations.QuotationNoManual;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPS_Quotations.IsApproved;
                        Com.Parameters["@PurchasingRequestID"].Value = ObjCVarPS_Quotations.PurchasingRequestID;
                        Com.Parameters["@EditedDate"].Value = ObjCVarPS_Quotations.EditedDate;
                        Com.Parameters["@CreatedUserID"].Value = ObjCVarPS_Quotations.CreatedUserID;
                        Com.Parameters["@CreatedDate"].Value = ObjCVarPS_Quotations.CreatedDate;
                        Com.Parameters["@ApprovedUserID"].Value = ObjCVarPS_Quotations.ApprovedUserID;
                        Com.Parameters["@ApprovedDate"].Value = ObjCVarPS_Quotations.ApprovedDate;
                        Com.Parameters["@EditedByUserID"].Value = ObjCVarPS_Quotations.EditedByUserID;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarPS_Quotations.CostCenter_ID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPS_Quotations.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarPS_Quotations.ExchangeRate;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_Quotations.ID == 0)
                        {
                            ObjCVarPS_Quotations.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_Quotations.mIsChanges = false;
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
