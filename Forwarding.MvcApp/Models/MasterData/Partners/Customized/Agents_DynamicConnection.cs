using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
namespace Forwarding.MvcApp.Models.MasterData.Partners.Customized
{
    public partial class CAgents_DynamicConnection:Base_DynamicConnection
    {
        
        public CAgents_DynamicConnection(Helpers.Companies.InternalCompanies Company):base(Company)
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
        public List<CVarAgents> lstCVarAgents = new List<CVarAgents>();
        public List<CPKAgents> lstDeletedCPKAgents = new List<CPKAgents>();
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
            lstCVarAgents.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAgents";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAgents";
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
                        CVarAgents ObjCVarAgents = new CVarAgents();
                        ObjCVarAgents.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarAgents.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarAgents.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarAgents.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarAgents.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarAgents.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarAgents.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarAgents.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAgents.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarAgents.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarAgents.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAgents.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarAgents.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarAgents.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarAgents.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarAgents.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarAgents.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarAgents.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarAgents.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAgents.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAgents.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAgents.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAgents.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarAgents.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarAgents.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAgents.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarAgents.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarAgents.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarAgents.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarAgents.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarAgents.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarAgents.mEmailOptionAging = Convert.ToInt32(dr["EmailOptionAging"].ToString());
                        ObjCVarAgents.mEmailOptionInvoicesReport = Convert.ToInt32(dr["EmailOptionInvoicesReport"].ToString());
                        ObjCVarAgents.mEmailOptionPartnerStatement = Convert.ToInt32(dr["EmailOptionPartnerStatement"].ToString());
                        lstCVarAgents.Add(ObjCVarAgents);
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
            lstCVarAgents.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAgents";
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
                        CVarAgents ObjCVarAgents = new CVarAgents();
                        ObjCVarAgents.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarAgents.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarAgents.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarAgents.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarAgents.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarAgents.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarAgents.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarAgents.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAgents.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarAgents.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarAgents.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAgents.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarAgents.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarAgents.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarAgents.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarAgents.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarAgents.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarAgents.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarAgents.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAgents.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAgents.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAgents.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAgents.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarAgents.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarAgents.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAgents.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarAgents.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarAgents.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarAgents.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarAgents.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarAgents.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarAgents.mEmailOptionAging = Convert.ToInt32(dr["EmailOptionAging"].ToString());
                        ObjCVarAgents.mEmailOptionInvoicesReport = Convert.ToInt32(dr["EmailOptionInvoicesReport"].ToString());
                        ObjCVarAgents.mEmailOptionPartnerStatement = Convert.ToInt32(dr["EmailOptionPartnerStatement"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAgents.Add(ObjCVarAgents);
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
                    Com.CommandText = "[dbo].DeleteListAgents";
                else
                    Com.CommandText = "[dbo].UpdateListAgents";
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
        public Exception DeleteItem(List<CPKAgents> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(base.ConStr);
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAgents";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKAgents ObjCPKAgents in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKAgents.ID);
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
        public Exception SaveMethod(List<CVarAgents> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(base.ConStr);
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Website", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar));
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
                Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PhonesAndFaxes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@EmailOptionAging", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionInvoicesReport", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionPartnerStatement", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAgents ObjCVarAgents in SaveList)
                {
                    if (ObjCVarAgents.mIsChanges == true)
                    {
                        if (ObjCVarAgents.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAgents";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAgents.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAgents";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAgents.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAgents.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarAgents.Code;
                        Com.Parameters["@Name"].Value = ObjCVarAgents.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarAgents.LocalName;
                        Com.Parameters["@Website"].Value = ObjCVarAgents.Website;
                        Com.Parameters["@Email"].Value = ObjCVarAgents.Email;
                        Com.Parameters["@IsInactive"].Value = ObjCVarAgents.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarAgents.Notes;
                        Com.Parameters["@VATNumber"].Value = ObjCVarAgents.VATNumber;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarAgents.PaymentTermID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarAgents.CurrencyID;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarAgents.TaxeTypeID;
                        Com.Parameters["@IsConsolidatedInvoice"].Value = ObjCVarAgents.IsConsolidatedInvoice;
                        Com.Parameters["@BankName"].Value = ObjCVarAgents.BankName;
                        Com.Parameters["@BankAddress"].Value = ObjCVarAgents.BankAddress;
                        Com.Parameters["@Swift"].Value = ObjCVarAgents.Swift;
                        Com.Parameters["@BankAccountNumber"].Value = ObjCVarAgents.BankAccountNumber;
                        Com.Parameters["@IBANNumber"].Value = ObjCVarAgents.IBANNumber;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarAgents.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAgents.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarAgents.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarAgents.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarAgents.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarAgents.TimeLocked;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarAgents.IsDeleted;
                        Com.Parameters["@AccountID"].Value = ObjCVarAgents.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarAgents.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarAgents.CostCenterID;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarAgents.SubAccountGroupID;
                        Com.Parameters["@Address"].Value = ObjCVarAgents.Address;
                        Com.Parameters["@PhonesAndFaxes"].Value = ObjCVarAgents.PhonesAndFaxes;
                        Com.Parameters["@EmailOptionAging"].Value = ObjCVarAgents.EmailOptionAging;
                        Com.Parameters["@EmailOptionInvoicesReport"].Value = ObjCVarAgents.EmailOptionInvoicesReport;
                        Com.Parameters["@EmailOptionPartnerStatement"].Value = ObjCVarAgents.EmailOptionPartnerStatement;
                        EndTrans(Com, Con);
                        if (ObjCVarAgents.ID == 0)
                        {
                            ObjCVarAgents.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAgents.mIsChanges = false;
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
