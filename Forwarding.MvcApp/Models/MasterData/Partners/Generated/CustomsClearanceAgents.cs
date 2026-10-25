using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
	[Serializable]
	public class CPKCustomsClearanceAgents
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
	public partial class CVarCustomsClearanceAgents : CPKCustomsClearanceAgents
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mCode;
		internal String mName;
		internal String mLocalName;
		internal String mWebsite;
		internal Boolean mIsInactive;
		internal String mNotes;
		internal String mVATNumber;
		internal Int32 mPaymentTermID;
		internal Int32 mCurrencyID;
		internal Int32 mTaxeTypeID;
		internal Boolean mIsConsolidatedInvoice;
		internal String mBankName;
		internal String mBankAddress;
		internal String mSwift;
		internal String mBankAccountNumber;
		internal String mIBANNumber;
		internal Int32 mCreatorUserID;
		internal DateTime mCreationDate;
		internal Int32 mModificatorUserID;
		internal DateTime mModificationDate;
		internal Int32 mLockingUserID;
		internal DateTime mTimeLocked;
		internal Boolean mIsDeleted;
		internal Int32 mAccountID;
		internal Int32 mSubAccountID;
		internal Int32 mCostCenterID;
		internal Int32 mSubAccountGroupID;
		internal String mCRM_Code;
		internal Int32 mBranchID;
		internal Int32 mSalesmanID;
		internal String mFinance365Ref;
		internal Int32 mSupplierID;
		internal DateTime mTaxExemptFromDate;
		internal DateTime mTaxExemptToDate;
		#endregion

		#region "Methods"
		public Int32 Code
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
		public String Website
		{
			get { return mWebsite; }
			set { mIsChanges = true; mWebsite = value; }
		}
		public Boolean IsInactive
		{
			get { return mIsInactive; }
			set { mIsChanges = true; mIsInactive = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mIsChanges = true; mNotes = value; }
		}
		public String VATNumber
		{
			get { return mVATNumber; }
			set { mIsChanges = true; mVATNumber = value; }
		}
		public Int32 PaymentTermID
		{
			get { return mPaymentTermID; }
			set { mIsChanges = true; mPaymentTermID = value; }
		}
		public Int32 CurrencyID
		{
			get { return mCurrencyID; }
			set { mIsChanges = true; mCurrencyID = value; }
		}
		public Int32 TaxeTypeID
		{
			get { return mTaxeTypeID; }
			set { mIsChanges = true; mTaxeTypeID = value; }
		}
		public Boolean IsConsolidatedInvoice
		{
			get { return mIsConsolidatedInvoice; }
			set { mIsChanges = true; mIsConsolidatedInvoice = value; }
		}
		public String BankName
		{
			get { return mBankName; }
			set { mIsChanges = true; mBankName = value; }
		}
		public String BankAddress
		{
			get { return mBankAddress; }
			set { mIsChanges = true; mBankAddress = value; }
		}
		public String Swift
		{
			get { return mSwift; }
			set { mIsChanges = true; mSwift = value; }
		}
		public String BankAccountNumber
		{
			get { return mBankAccountNumber; }
			set { mIsChanges = true; mBankAccountNumber = value; }
		}
		public String IBANNumber
		{
			get { return mIBANNumber; }
			set { mIsChanges = true; mIBANNumber = value; }
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
		public Boolean IsDeleted
		{
			get { return mIsDeleted; }
			set { mIsChanges = true; mIsDeleted = value; }
		}
		public Int32 AccountID
		{
			get { return mAccountID; }
			set { mIsChanges = true; mAccountID = value; }
		}
		public Int32 SubAccountID
		{
			get { return mSubAccountID; }
			set { mIsChanges = true; mSubAccountID = value; }
		}
		public Int32 CostCenterID
		{
			get { return mCostCenterID; }
			set { mIsChanges = true; mCostCenterID = value; }
		}
		public Int32 SubAccountGroupID
		{
			get { return mSubAccountGroupID; }
			set { mIsChanges = true; mSubAccountGroupID = value; }
		}
		public String CRM_Code
		{
			get { return mCRM_Code; }
			set { mIsChanges = true; mCRM_Code = value; }
		}
		public Int32 BranchID
		{
			get { return mBranchID; }
			set { mIsChanges = true; mBranchID = value; }
		}
		public Int32 SalesmanID
		{
			get { return mSalesmanID; }
			set { mIsChanges = true; mSalesmanID = value; }
		}
		public String Finance365Ref
		{
			get { return mFinance365Ref; }
			set { mIsChanges = true; mFinance365Ref = value; }
		}
		public Int32 SupplierID
		{
			get { return mSupplierID; }
			set { mIsChanges = true; mSupplierID = value; }
		}
		public DateTime TaxExemptFromDate
		{
			get { return mTaxExemptFromDate; }
			set { mIsChanges = true; mTaxExemptFromDate = value; }
		}
		public DateTime TaxExemptToDate
		{
			get { return mTaxExemptToDate; }
			set { mIsChanges = true; mTaxExemptToDate = value; }
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

	public partial class CCustomsClearanceAgents
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
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
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
						ObjCVarCustomsClearanceAgents.mCRM_Code = Convert.ToString(dr["CRM_Code"].ToString());
						ObjCVarCustomsClearanceAgents.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
						ObjCVarCustomsClearanceAgents.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
						ObjCVarCustomsClearanceAgents.mFinance365Ref = Convert.ToString(dr["Finance365Ref"].ToString());
						ObjCVarCustomsClearanceAgents.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
						ObjCVarCustomsClearanceAgents.mTaxExemptFromDate = Convert.ToDateTime(dr["TaxExemptFromDate"].ToString());
						ObjCVarCustomsClearanceAgents.mTaxExemptToDate = Convert.ToDateTime(dr["TaxExemptToDate"].ToString());
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
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
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
						ObjCVarCustomsClearanceAgents.mCRM_Code = Convert.ToString(dr["CRM_Code"].ToString());
						ObjCVarCustomsClearanceAgents.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
						ObjCVarCustomsClearanceAgents.mSalesmanID = Convert.ToInt32(dr["SalesmanID"].ToString());
						ObjCVarCustomsClearanceAgents.mFinance365Ref = Convert.ToString(dr["Finance365Ref"].ToString());
						ObjCVarCustomsClearanceAgents.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
						ObjCVarCustomsClearanceAgents.mTaxExemptFromDate = Convert.ToDateTime(dr["TaxExemptFromDate"].ToString());
						ObjCVarCustomsClearanceAgents.mTaxExemptToDate = Convert.ToDateTime(dr["TaxExemptToDate"].ToString());
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
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
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
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
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
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
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
				Com.Parameters.Add(new SqlParameter("@CRM_Code", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@SalesmanID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@Finance365Ref", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@TaxExemptFromDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@TaxExemptToDate", SqlDbType.DateTime));
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
						Com.Parameters["@CRM_Code"].Value = ObjCVarCustomsClearanceAgents.CRM_Code;
						Com.Parameters["@BranchID"].Value = ObjCVarCustomsClearanceAgents.BranchID;
						Com.Parameters["@SalesmanID"].Value = ObjCVarCustomsClearanceAgents.SalesmanID;
						Com.Parameters["@Finance365Ref"].Value = ObjCVarCustomsClearanceAgents.Finance365Ref;
						Com.Parameters["@SupplierID"].Value = ObjCVarCustomsClearanceAgents.SupplierID;
						Com.Parameters["@TaxExemptFromDate"].Value = ObjCVarCustomsClearanceAgents.TaxExemptFromDate;
						Com.Parameters["@TaxExemptToDate"].Value = ObjCVarCustomsClearanceAgents.TaxExemptToDate;
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
