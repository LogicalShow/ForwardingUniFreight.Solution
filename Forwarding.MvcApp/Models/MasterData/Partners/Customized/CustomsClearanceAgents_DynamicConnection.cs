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

    public partial class CCustomsClearanceAgents_DynamicConnection : Base_DynamicConnection
    {
        public CCustomsClearanceAgents_DynamicConnection(Helpers.Companies.InternalCompanies Company):base(Company)
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
        public List<CVarCustomsClearanceAgents> lstCVarCustomsClearanceAgents = new List<CVarCustomsClearanceAgents>();
        public List<CPKCustomsClearanceAgents> lstDeletedCPKCustomsClearanceAgents = new List<CPKCustomsClearanceAgents>();
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
            lstCVarCustomsClearanceAgents.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCustomsClearanceAgents";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCustomsClearanceAgents";
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
                        CVarCustomsClearanceAgents ObjCVarCustomsClearanceAgents = new CVarCustomsClearanceAgents();
                        ObjCVarCustomsClearanceAgents.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomsClearanceAgents.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCustomsClearanceAgents.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCustomsClearanceAgents.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCustomsClearanceAgents.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarCustomsClearanceAgents.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarCustomsClearanceAgents.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustomsClearanceAgents.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarCustomsClearanceAgents.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarCustomsClearanceAgents.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCustomsClearanceAgents.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarCustomsClearanceAgents.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarCustomsClearanceAgents.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarCustomsClearanceAgents.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarCustomsClearanceAgents.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarCustomsClearanceAgents.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarCustomsClearanceAgents.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarCustomsClearanceAgents.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustomsClearanceAgents.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustomsClearanceAgents.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustomsClearanceAgents.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustomsClearanceAgents.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarCustomsClearanceAgents.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarCustomsClearanceAgents.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarCustomsClearanceAgents.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarCustomsClearanceAgents.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarCustomsClearanceAgents.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarCustomsClearanceAgents.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        lstCVarCustomsClearanceAgents.Add(ObjCVarCustomsClearanceAgents);
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
            lstCVarCustomsClearanceAgents.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCustomsClearanceAgents";
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
                        CVarCustomsClearanceAgents ObjCVarCustomsClearanceAgents = new CVarCustomsClearanceAgents();
                        ObjCVarCustomsClearanceAgents.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomsClearanceAgents.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCustomsClearanceAgents.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCustomsClearanceAgents.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCustomsClearanceAgents.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarCustomsClearanceAgents.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarCustomsClearanceAgents.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustomsClearanceAgents.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarCustomsClearanceAgents.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarCustomsClearanceAgents.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarCustomsClearanceAgents.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarCustomsClearanceAgents.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarCustomsClearanceAgents.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarCustomsClearanceAgents.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarCustomsClearanceAgents.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarCustomsClearanceAgents.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarCustomsClearanceAgents.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarCustomsClearanceAgents.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustomsClearanceAgents.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustomsClearanceAgents.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustomsClearanceAgents.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustomsClearanceAgents.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarCustomsClearanceAgents.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarCustomsClearanceAgents.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarCustomsClearanceAgents.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarCustomsClearanceAgents.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarCustomsClearanceAgents.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarCustomsClearanceAgents.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCustomsClearanceAgents.Add(ObjCVarCustomsClearanceAgents);
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
                    Com.CommandText = "[dbo].DeleteListCustomsClearanceAgents";
                else
                    Com.CommandText = "[dbo].UpdateListCustomsClearanceAgents";
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
        public Exception DeleteItem(List<CPKCustomsClearanceAgents> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(base.ConStr);
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCustomsClearanceAgents";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCustomsClearanceAgents ObjCPKCustomsClearanceAgents in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCustomsClearanceAgents.ID);
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
        public Exception SaveMethod(List<CVarCustomsClearanceAgents> SaveList)
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
                foreach (CVarCustomsClearanceAgents ObjCVarCustomsClearanceAgents in SaveList)
                {
                    if (ObjCVarCustomsClearanceAgents.mIsChanges == true)
                    {
                        if (ObjCVarCustomsClearanceAgents.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCustomsClearanceAgents";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCustomsClearanceAgents.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCustomsClearanceAgents";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCustomsClearanceAgents.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCustomsClearanceAgents.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarCustomsClearanceAgents.Code;
                        Com.Parameters["@Name"].Value = ObjCVarCustomsClearanceAgents.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarCustomsClearanceAgents.LocalName;
                        Com.Parameters["@Website"].Value = ObjCVarCustomsClearanceAgents.Website;
                        Com.Parameters["@IsInactive"].Value = ObjCVarCustomsClearanceAgents.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarCustomsClearanceAgents.Notes;
                        Com.Parameters["@VATNumber"].Value = ObjCVarCustomsClearanceAgents.VATNumber;
                        Com.Parameters["@PaymentTermID"].Value = ObjCVarCustomsClearanceAgents.PaymentTermID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarCustomsClearanceAgents.CurrencyID;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarCustomsClearanceAgents.TaxeTypeID;
                        Com.Parameters["@IsConsolidatedInvoice"].Value = ObjCVarCustomsClearanceAgents.IsConsolidatedInvoice;
                        Com.Parameters["@BankName"].Value = ObjCVarCustomsClearanceAgents.BankName;
                        Com.Parameters["@BankAddress"].Value = ObjCVarCustomsClearanceAgents.BankAddress;
                        Com.Parameters["@Swift"].Value = ObjCVarCustomsClearanceAgents.Swift;
                        Com.Parameters["@BankAccountNumber"].Value = ObjCVarCustomsClearanceAgents.BankAccountNumber;
                        Com.Parameters["@IBANNumber"].Value = ObjCVarCustomsClearanceAgents.IBANNumber;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCustomsClearanceAgents.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCustomsClearanceAgents.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarCustomsClearanceAgents.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCustomsClearanceAgents.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarCustomsClearanceAgents.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarCustomsClearanceAgents.TimeLocked;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarCustomsClearanceAgents.IsDeleted;
                        Com.Parameters["@AccountID"].Value = ObjCVarCustomsClearanceAgents.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarCustomsClearanceAgents.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarCustomsClearanceAgents.CostCenterID;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarCustomsClearanceAgents.SubAccountGroupID;
                        EndTrans(Com, Con);
                        if (ObjCVarCustomsClearanceAgents.ID == 0)
                        {
                            ObjCVarCustomsClearanceAgents.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCustomsClearanceAgents.mIsChanges = false;
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
