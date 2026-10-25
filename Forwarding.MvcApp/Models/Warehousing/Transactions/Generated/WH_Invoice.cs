using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
    [Serializable]
    public class CPKWH_Invoice
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
    public partial class CVarWH_Invoice : CPKWH_Invoice
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCodeSerial;
        internal String mCode;
        internal Int32 mWarehouseID;
        internal Int32 mCustomerID;
        internal Int32 mContractID;
        internal DateTime mInvoiceDate;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal String mNotes;
        internal Boolean mIsPosted;
        internal DateTime mPostDate;
        internal Boolean mIsDeleted;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int32 CodeSerial
        {
            get { return mCodeSerial; }
            set { mIsChanges = true; mCodeSerial = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Int32 WarehouseID
        {
            get { return mWarehouseID; }
            set { mIsChanges = true; mWarehouseID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Int32 ContractID
        {
            get { return mContractID; }
            set { mIsChanges = true; mContractID = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mIsChanges = true; mInvoiceDate = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
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
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsPosted
        {
            get { return mIsPosted; }
            set { mIsChanges = true; mIsPosted = value; }
        }
        public DateTime PostDate
        {
            get { return mPostDate; }
            set { mIsChanges = true; mPostDate = value; }
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

    public partial class CWH_Invoice
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
        public List<CVarWH_Invoice> lstCVarWH_Invoice = new List<CVarWH_Invoice>();
        public List<CPKWH_Invoice> lstDeletedCPKWH_Invoice = new List<CPKWH_Invoice>();
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
            lstCVarWH_Invoice.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListWH_Invoice";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemWH_Invoice";
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
                        CVarWH_Invoice ObjCVarWH_Invoice = new CVarWH_Invoice();
                        ObjCVarWH_Invoice.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_Invoice.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarWH_Invoice.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarWH_Invoice.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarWH_Invoice.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarWH_Invoice.mContractID = Convert.ToInt32(dr["ContractID"].ToString());
                        ObjCVarWH_Invoice.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarWH_Invoice.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarWH_Invoice.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarWH_Invoice.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarWH_Invoice.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarWH_Invoice.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarWH_Invoice.mPostDate = Convert.ToDateTime(dr["PostDate"].ToString());
                        ObjCVarWH_Invoice.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarWH_Invoice.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarWH_Invoice.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarWH_Invoice.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarWH_Invoice.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarWH_Invoice.Add(ObjCVarWH_Invoice);
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
            lstCVarWH_Invoice.Clear();

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
                Com.CommandText = "[dbo].GetListPagingWH_Invoice";
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
                        CVarWH_Invoice ObjCVarWH_Invoice = new CVarWH_Invoice();
                        ObjCVarWH_Invoice.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_Invoice.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarWH_Invoice.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarWH_Invoice.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarWH_Invoice.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarWH_Invoice.mContractID = Convert.ToInt32(dr["ContractID"].ToString());
                        ObjCVarWH_Invoice.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarWH_Invoice.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarWH_Invoice.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarWH_Invoice.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarWH_Invoice.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarWH_Invoice.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarWH_Invoice.mPostDate = Convert.ToDateTime(dr["PostDate"].ToString());
                        ObjCVarWH_Invoice.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarWH_Invoice.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarWH_Invoice.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarWH_Invoice.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarWH_Invoice.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarWH_Invoice.Add(ObjCVarWH_Invoice);
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
                    Com.CommandText = "[dbo].DeleteListWH_Invoice";
                else
                    Com.CommandText = "[dbo].UpdateListWH_Invoice";
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
        public Exception DeleteItem(List<CPKWH_Invoice> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemWH_Invoice";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKWH_Invoice ObjCPKWH_Invoice in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_Invoice.ID);
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
        public Exception SaveMethod(List<CVarWH_Invoice> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CodeSerial", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@WarehouseID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ContractID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoiceDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsPosted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PostDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarWH_Invoice ObjCVarWH_Invoice in SaveList)
                {
                    if (ObjCVarWH_Invoice.mIsChanges == true)
                    {
                        if (ObjCVarWH_Invoice.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemWH_Invoice";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarWH_Invoice.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemWH_Invoice";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarWH_Invoice.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarWH_Invoice.ID;
                        }
                        Com.Parameters["@CodeSerial"].Value = ObjCVarWH_Invoice.CodeSerial;
                        Com.Parameters["@Code"].Value = ObjCVarWH_Invoice.Code;
                        Com.Parameters["@WarehouseID"].Value = ObjCVarWH_Invoice.WarehouseID;
                        Com.Parameters["@CustomerID"].Value = ObjCVarWH_Invoice.CustomerID;
                        Com.Parameters["@ContractID"].Value = ObjCVarWH_Invoice.ContractID;
                        Com.Parameters["@InvoiceDate"].Value = ObjCVarWH_Invoice.InvoiceDate;
                        Com.Parameters["@Amount"].Value = ObjCVarWH_Invoice.Amount;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarWH_Invoice.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarWH_Invoice.ExchangeRate;
                        Com.Parameters["@Notes"].Value = ObjCVarWH_Invoice.Notes;
                        Com.Parameters["@IsPosted"].Value = ObjCVarWH_Invoice.IsPosted;
                        Com.Parameters["@PostDate"].Value = ObjCVarWH_Invoice.PostDate;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarWH_Invoice.IsDeleted;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_Invoice.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarWH_Invoice.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_Invoice.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarWH_Invoice.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarWH_Invoice.ID == 0)
                        {
                            ObjCVarWH_Invoice.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarWH_Invoice.mIsChanges = false;
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
