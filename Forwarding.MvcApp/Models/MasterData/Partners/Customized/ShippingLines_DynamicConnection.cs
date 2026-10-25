using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
namespace Forwarding.MvcApp.Models.MasterData.Partners.Customized
{

    public partial class CShippingLines_DynamicConnection : Base_DynamicConnection
    {
        public CShippingLines_DynamicConnection(Helpers.Companies.InternalCompanies Company):base(Company)
        {
        }
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
        public List<CVarShippingLines> lstCVarShippingLines = new List<CVarShippingLines>();
        public List<CPKShippingLines> lstDeletedCPKShippingLines = new List<CPKShippingLines>();
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
            SqlConnection Con = new SqlConnection(base.ConStr);
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarShippingLines.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListShippingLines";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemShippingLines";
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
                        CVarShippingLines ObjCVarShippingLines = new CVarShippingLines();
                        ObjCVarShippingLines.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarShippingLines.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarShippingLines.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarShippingLines.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarShippingLines.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarShippingLines.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarShippingLines.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarShippingLines.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarShippingLines.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarShippingLines.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarShippingLines.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarShippingLines.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarShippingLines.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarShippingLines.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarShippingLines.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarShippingLines.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarShippingLines.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarShippingLines.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarShippingLines.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarShippingLines.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarShippingLines.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarShippingLines.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarShippingLines.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarShippingLines.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarShippingLines.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarShippingLines.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarShippingLines.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarShippingLines.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        lstCVarShippingLines.Add(ObjCVarShippingLines);
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
            SqlConnection Con = new SqlConnection(base.ConStr);
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarShippingLines.Clear();

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
                Com.CommandText = "[dbo].GetListPagingShippingLines";
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
                        CVarShippingLines ObjCVarShippingLines = new CVarShippingLines();
                        ObjCVarShippingLines.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarShippingLines.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarShippingLines.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarShippingLines.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarShippingLines.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarShippingLines.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarShippingLines.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarShippingLines.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarShippingLines.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarShippingLines.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarShippingLines.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarShippingLines.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarShippingLines.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarShippingLines.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarShippingLines.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarShippingLines.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarShippingLines.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarShippingLines.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarShippingLines.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarShippingLines.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarShippingLines.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarShippingLines.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarShippingLines.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarShippingLines.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarShippingLines.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarShippingLines.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarShippingLines.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarShippingLines.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarShippingLines.Add(ObjCVarShippingLines);
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
            SqlConnection Con = new SqlConnection(base.ConStr);
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListShippingLines";
                else
                    Com.CommandText = "[dbo].UpdateListShippingLines";
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
        public Exception DeleteItem(List<CPKShippingLines> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(base.ConStr);
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemShippingLines";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKShippingLines ObjCPKShippingLines in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKShippingLines.ID);
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
        public Exception SaveMethod(List<CVarShippingLines> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(base.ConStr);
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Website", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@VATNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PaymentTermID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsConsolidatedInvoice", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@BankName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Swift", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankAccountNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IBANNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountGroupID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarShippingLines ObjCVarShippingLines in SaveList)
                {
                    if (ObjCVarShippingLines.mIsChanges == true)
                    {
                        if (ObjCVarShippingLines.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemShippingLines";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarShippingLines.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemShippingLines";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarShippingLines.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarShippingLines.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarShippingLines.Code;
                        Com.Parameters["@Name"].Value = ObjCVarShippingLines.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarShippingLines.LocalName;
                        Com.Parameters["@Website"].Value = ObjCVarShippingLines.Website;
                        Com.Parameters["@IsInactive"].Value = ObjCVarShippingLines.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarShippingLines.Notes;
                        Com.Parameters["@VATNumber"].Value = ObjCVarShippingLines.VATNumber;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarShippingLines.PaymentTermID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarShippingLines.CurrencyID;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarShippingLines.TaxeTypeID;
                        Com.Parameters["@IsConsolidatedInvoice"].Value = ObjCVarShippingLines.IsConsolidatedInvoice;
                        Com.Parameters["@BankName"].Value = ObjCVarShippingLines.BankName;
                        Com.Parameters["@BankAddress"].Value = ObjCVarShippingLines.BankAddress;
                        Com.Parameters["@Swift"].Value = ObjCVarShippingLines.Swift;
                        Com.Parameters["@BankAccountNumber"].Value = ObjCVarShippingLines.BankAccountNumber;
                        Com.Parameters["@IBANNumber"].Value = ObjCVarShippingLines.IBANNumber;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarShippingLines.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarShippingLines.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarShippingLines.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarShippingLines.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarShippingLines.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarShippingLines.TimeLocked;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarShippingLines.IsDeleted;
                        Com.Parameters["@AccountID"].Value = ObjCVarShippingLines.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarShippingLines.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarShippingLines.CostCenterID;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarShippingLines.SubAccountGroupID;
                        EndTrans(Com, Con);
                        if (ObjCVarShippingLines.ID == 0)
                        {
                            ObjCVarShippingLines.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarShippingLines.mIsChanges = false;
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
