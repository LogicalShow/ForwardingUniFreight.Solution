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

    public partial class CvwCustomers_DynamicConnection : Base_DynamicConnection
    {
        public CvwCustomers_DynamicConnection(Helpers.Companies.InternalCompanies Company):base(Company)
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
        public List<CVarvwCustomers> lstCVarvwCustomers = new List<CVarvwCustomers>();
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
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(base.ConStr);
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwCustomers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCustomers";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwCustomers ObjCVarvwCustomers = new CVarvwCustomers();
                        ObjCVarvwCustomers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCustomers.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwCustomers.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwCustomers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwCustomers.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarvwCustomers.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwCustomers.mIsConsignee = Convert.ToBoolean(dr["IsConsignee"].ToString());
                        ObjCVarvwCustomers.mIsShipper = Convert.ToBoolean(dr["IsShipper"].ToString());
                        ObjCVarvwCustomers.mIsinternalCustomer = Convert.ToBoolean(dr["IsinternalCustomer"].ToString());
                        ObjCVarvwCustomers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwCustomers.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwCustomers.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwCustomers.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarvwCustomers.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwCustomers.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwCustomers.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarvwCustomers.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarvwCustomers.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwCustomers.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwCustomers.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarvwCustomers.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarvwCustomers.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarvwCustomers.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarvwCustomers.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwCustomers.mManagerRoleID = Convert.ToInt32(dr["ManagerRoleID"].ToString());
                        ObjCVarvwCustomers.mAdministratorRoleID = Convert.ToInt32(dr["AdministratorRoleID"].ToString());
                        ObjCVarvwCustomers.mSalesmanName = Convert.ToString(dr["SalesmanName"].ToString());
                        ObjCVarvwCustomers.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwCustomers.mPriceListName = Convert.ToString(dr["PriceListName"].ToString());
                        ObjCVarvwCustomers.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        ObjCVarvwCustomers.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwCustomers.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwCustomers.mTaxeTypeCode = Convert.ToString(dr["TaxeTypeCode"].ToString());
                        ObjCVarvwCustomers.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwCustomers.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwCustomers.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwCustomers.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwCustomers.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwCustomers.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwCustomers.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarvwCustomers.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwCustomers.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarvwCustomers.mOperationCount = Convert.ToInt32(dr["OperationCount"].ToString());
                        ObjCVarvwCustomers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCustomers.mSalesLeadID = Convert.ToInt32(dr["SalesLeadID"].ToString());
                        ObjCVarvwCustomers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwCustomers.mSites = Convert.ToString(dr["Sites"].ToString());
                        ObjCVarvwCustomers.mCustomerUserID = Convert.ToInt32(dr["CustomerUserID"].ToString());
                        ObjCVarvwCustomers.mCustomerUserUserName = Convert.ToString(dr["CustomerUserUserName"].ToString());
                        ObjCVarvwCustomers.mCustomerUserName = Convert.ToString(dr["CustomerUserName"].ToString());
                        ObjCVarvwCustomers.mIsInActiveUser = Convert.ToBoolean(dr["IsInActiveUser"].ToString());
                        ObjCVarvwCustomers.mBillingDetails = Convert.ToString(dr["BillingDetails"].ToString());
                        ObjCVarvwCustomers.mShippingDetails = Convert.ToString(dr["ShippingDetails"].ToString());
                        ObjCVarvwCustomers.mOriginalCMRbyPost = Convert.ToBoolean(dr["OriginalCMRbyPost"].ToString());
                        ObjCVarvwCustomers.mCategoryID = Convert.ToInt32(dr["CategoryID"].ToString());
                        ObjCVarvwCustomers.mIsExternal = Convert.ToBoolean(dr["IsExternal"].ToString());
                        lstCVarvwCustomers.Add(ObjCVarvwCustomers);
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
            lstCVarvwCustomers.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCustomers";
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
                        CVarvwCustomers ObjCVarvwCustomers = new CVarvwCustomers();
                        ObjCVarvwCustomers.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCustomers.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarvwCustomers.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwCustomers.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwCustomers.mWebsite = Convert.ToString(dr["Website"].ToString());
                        ObjCVarvwCustomers.mEmail = Convert.ToString(dr["Email"].ToString());
                        ObjCVarvwCustomers.mIsConsignee = Convert.ToBoolean(dr["IsConsignee"].ToString());
                        ObjCVarvwCustomers.mIsShipper = Convert.ToBoolean(dr["IsShipper"].ToString());
                        ObjCVarvwCustomers.mIsinternalCustomer = Convert.ToBoolean(dr["IsinternalCustomer"].ToString());
                        ObjCVarvwCustomers.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarvwCustomers.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwCustomers.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwCustomers.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
                        ObjCVarvwCustomers.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
                        ObjCVarvwCustomers.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwCustomers.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarvwCustomers.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
                        ObjCVarvwCustomers.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwCustomers.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
                        ObjCVarvwCustomers.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
                        ObjCVarvwCustomers.mSwift = Convert.ToString(dr["Swift"].ToString());
                        ObjCVarvwCustomers.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
                        ObjCVarvwCustomers.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
                        ObjCVarvwCustomers.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwCustomers.mManagerRoleID = Convert.ToInt32(dr["ManagerRoleID"].ToString());
                        ObjCVarvwCustomers.mAdministratorRoleID = Convert.ToInt32(dr["AdministratorRoleID"].ToString());
                        ObjCVarvwCustomers.mSalesmanName = Convert.ToString(dr["SalesmanName"].ToString());
                        ObjCVarvwCustomers.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwCustomers.mPriceListName = Convert.ToString(dr["PriceListName"].ToString());
                        ObjCVarvwCustomers.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        ObjCVarvwCustomers.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
                        ObjCVarvwCustomers.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwCustomers.mTaxeTypeCode = Convert.ToString(dr["TaxeTypeCode"].ToString());
                        ObjCVarvwCustomers.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwCustomers.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwCustomers.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwCustomers.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        ObjCVarvwCustomers.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarvwCustomers.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarvwCustomers.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarvwCustomers.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwCustomers.mPhonesAndFaxes = Convert.ToString(dr["PhonesAndFaxes"].ToString());
                        ObjCVarvwCustomers.mOperationCount = Convert.ToInt32(dr["OperationCount"].ToString());
                        ObjCVarvwCustomers.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCustomers.mSalesLeadID = Convert.ToInt32(dr["SalesLeadID"].ToString());
                        ObjCVarvwCustomers.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwCustomers.mSites = Convert.ToString(dr["Sites"].ToString());
                        ObjCVarvwCustomers.mCustomerUserID = Convert.ToInt32(dr["CustomerUserID"].ToString());
                        ObjCVarvwCustomers.mCustomerUserUserName = Convert.ToString(dr["CustomerUserUserName"].ToString());
                        ObjCVarvwCustomers.mCustomerUserName = Convert.ToString(dr["CustomerUserName"].ToString());
                        ObjCVarvwCustomers.mIsInActiveUser = Convert.ToBoolean(dr["IsInActiveUser"].ToString());
                        ObjCVarvwCustomers.mBillingDetails = Convert.ToString(dr["BillingDetails"].ToString());
                        ObjCVarvwCustomers.mShippingDetails = Convert.ToString(dr["ShippingDetails"].ToString());
                        ObjCVarvwCustomers.mOriginalCMRbyPost = Convert.ToBoolean(dr["OriginalCMRbyPost"].ToString());
                        ObjCVarvwCustomers.mCategoryID = Convert.ToInt32(dr["CategoryID"].ToString());
                        ObjCVarvwCustomers.mIsExternal = Convert.ToBoolean(dr["IsExternal"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCustomers.Add(ObjCVarvwCustomers);
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
    }
}
