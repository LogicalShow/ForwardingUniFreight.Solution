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
	public class CPKvwCustomsClearanceAgents
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
	public partial class CVarvwCustomsClearanceAgents : CPKvwCustomsClearanceAgents
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal Int32 mCode;
		internal String mName;
		internal String mLocalName;
		internal String mWebsite;
		internal Boolean mIsInactive;
		internal Boolean mIsDeleted;
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
		internal DateTime mTimeLocked;
		internal String mPaymentTermCode;
		internal String mCurrencyCode;
		internal String mTaxeTypeCode;
		internal Int32 mAccountID;
		internal String mAccountName;
		internal Int32 mSubAccountID;
		internal String mSubAccountName;
		internal Int32 mCostCenterID;
		internal String mCostCenterName;
		internal Int32 mSubAccountGroupID;
		internal Int32 mOperationCount;
		internal DateTime mTaxExemptFromDate;
		internal DateTime mTaxExemptToDate;
		#endregion

		#region "Methods"
		public Int32 Code
		{
			get { return mCode; }
			set { mCode = value; }
		}
		public String Name
		{
			get { return mName; }
			set { mName = value; }
		}
		public String LocalName
		{
			get { return mLocalName; }
			set { mLocalName = value; }
		}
		public String Website
		{
			get { return mWebsite; }
			set { mWebsite = value; }
		}
		public Boolean IsInactive
		{
			get { return mIsInactive; }
			set { mIsInactive = value; }
		}
		public Boolean IsDeleted
		{
			get { return mIsDeleted; }
			set { mIsDeleted = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
		}
		public String VATNumber
		{
			get { return mVATNumber; }
			set { mVATNumber = value; }
		}
		public Int32 PaymentTermID
		{
			get { return mPaymentTermID; }
			set { mPaymentTermID = value; }
		}
		public Int32 CurrencyID
		{
			get { return mCurrencyID; }
			set { mCurrencyID = value; }
		}
		public Int32 TaxeTypeID
		{
			get { return mTaxeTypeID; }
			set { mTaxeTypeID = value; }
		}
		public Boolean IsConsolidatedInvoice
		{
			get { return mIsConsolidatedInvoice; }
			set { mIsConsolidatedInvoice = value; }
		}
		public String BankName
		{
			get { return mBankName; }
			set { mBankName = value; }
		}
		public String BankAddress
		{
			get { return mBankAddress; }
			set { mBankAddress = value; }
		}
		public String Swift
		{
			get { return mSwift; }
			set { mSwift = value; }
		}
		public String BankAccountNumber
		{
			get { return mBankAccountNumber; }
			set { mBankAccountNumber = value; }
		}
		public String IBANNumber
		{
			get { return mIBANNumber; }
			set { mIBANNumber = value; }
		}
		public DateTime TimeLocked
		{
			get { return mTimeLocked; }
			set { mTimeLocked = value; }
		}
		public String PaymentTermCode
		{
			get { return mPaymentTermCode; }
			set { mPaymentTermCode = value; }
		}
		public String CurrencyCode
		{
			get { return mCurrencyCode; }
			set { mCurrencyCode = value; }
		}
		public String TaxeTypeCode
		{
			get { return mTaxeTypeCode; }
			set { mTaxeTypeCode = value; }
		}
		public Int32 AccountID
		{
			get { return mAccountID; }
			set { mAccountID = value; }
		}
		public String AccountName
		{
			get { return mAccountName; }
			set { mAccountName = value; }
		}
		public Int32 SubAccountID
		{
			get { return mSubAccountID; }
			set { mSubAccountID = value; }
		}
		public String SubAccountName
		{
			get { return mSubAccountName; }
			set { mSubAccountName = value; }
		}
		public Int32 CostCenterID
		{
			get { return mCostCenterID; }
			set { mCostCenterID = value; }
		}
		public String CostCenterName
		{
			get { return mCostCenterName; }
			set { mCostCenterName = value; }
		}
		public Int32 SubAccountGroupID
		{
			get { return mSubAccountGroupID; }
			set { mSubAccountGroupID = value; }
		}
		public Int32 OperationCount
		{
			get { return mOperationCount; }
			set { mOperationCount = value; }
		}
		public DateTime TaxExemptFromDate
		{
			get { return mTaxExemptFromDate; }
			set { mTaxExemptFromDate = value; }
		}
		public DateTime TaxExemptToDate
		{
			get { return mTaxExemptToDate; }
			set { mTaxExemptToDate = value; }
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

	public partial class CvwCustomsClearanceAgents
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
		public List<CVarvwCustomsClearanceAgents> lstCVarvwCustomsClearanceAgents = new List<CVarvwCustomsClearanceAgents>();
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
			SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
			SqlCommand Com;
			SqlDataReader dr;
			lstCVarvwCustomsClearanceAgents.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwCustomsClearanceAgents";
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
						CVarvwCustomsClearanceAgents ObjCVarvwCustomsClearanceAgents = new CVarvwCustomsClearanceAgents();
						ObjCVarvwCustomsClearanceAgents.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCode = Convert.ToInt32(dr["Code"].ToString());
						ObjCVarvwCustomsClearanceAgents.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwCustomsClearanceAgents.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mWebsite = Convert.ToString(dr["Website"].ToString());
						ObjCVarvwCustomsClearanceAgents.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
						ObjCVarvwCustomsClearanceAgents.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
						ObjCVarvwCustomsClearanceAgents.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwCustomsClearanceAgents.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
						ObjCVarvwCustomsClearanceAgents.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
						ObjCVarvwCustomsClearanceAgents.mBankName = Convert.ToString(dr["BankName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
						ObjCVarvwCustomsClearanceAgents.mSwift = Convert.ToString(dr["Swift"].ToString());
						ObjCVarvwCustomsClearanceAgents.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
						ObjCVarvwCustomsClearanceAgents.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
						ObjCVarvwCustomsClearanceAgents.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTaxeTypeCode = Convert.ToString(dr["TaxeTypeCode"].ToString());
						ObjCVarvwCustomsClearanceAgents.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mAccountName = Convert.ToString(dr["AccountName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mOperationCount = Convert.ToInt32(dr["OperationCount"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTaxExemptFromDate = Convert.ToDateTime(dr["TaxExemptFromDate"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTaxExemptToDate = Convert.ToDateTime(dr["TaxExemptToDate"].ToString());
						lstCVarvwCustomsClearanceAgents.Add(ObjCVarvwCustomsClearanceAgents);
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
			lstCVarvwCustomsClearanceAgents.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwCustomsClearanceAgents";
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
						CVarvwCustomsClearanceAgents ObjCVarvwCustomsClearanceAgents = new CVarvwCustomsClearanceAgents();
						ObjCVarvwCustomsClearanceAgents.ID = Convert.ToInt32(dr["ID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCode = Convert.ToInt32(dr["Code"].ToString());
						ObjCVarvwCustomsClearanceAgents.mName = Convert.ToString(dr["Name"].ToString());
						ObjCVarvwCustomsClearanceAgents.mLocalName = Convert.ToString(dr["LocalName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mWebsite = Convert.ToString(dr["Website"].ToString());
						ObjCVarvwCustomsClearanceAgents.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
						ObjCVarvwCustomsClearanceAgents.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
						ObjCVarvwCustomsClearanceAgents.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwCustomsClearanceAgents.mVATNumber = Convert.ToString(dr["VATNumber"].ToString());
						ObjCVarvwCustomsClearanceAgents.mPaymentTermID = Convert.ToInt32(dr["PaymentTermID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mIsConsolidatedInvoice = Convert.ToBoolean(dr["IsConsolidatedInvoice"].ToString());
						ObjCVarvwCustomsClearanceAgents.mBankName = Convert.ToString(dr["BankName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mBankAddress = Convert.ToString(dr["BankAddress"].ToString());
						ObjCVarvwCustomsClearanceAgents.mSwift = Convert.ToString(dr["Swift"].ToString());
						ObjCVarvwCustomsClearanceAgents.mBankAccountNumber = Convert.ToString(dr["BankAccountNumber"].ToString());
						ObjCVarvwCustomsClearanceAgents.mIBANNumber = Convert.ToString(dr["IBANNumber"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
						ObjCVarvwCustomsClearanceAgents.mPaymentTermCode = Convert.ToString(dr["PaymentTermCode"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTaxeTypeCode = Convert.ToString(dr["TaxeTypeCode"].ToString());
						ObjCVarvwCustomsClearanceAgents.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mAccountName = Convert.ToString(dr["AccountName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
						ObjCVarvwCustomsClearanceAgents.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
						ObjCVarvwCustomsClearanceAgents.mOperationCount = Convert.ToInt32(dr["OperationCount"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTaxExemptFromDate = Convert.ToDateTime(dr["TaxExemptFromDate"].ToString());
						ObjCVarvwCustomsClearanceAgents.mTaxExemptToDate = Convert.ToDateTime(dr["TaxExemptToDate"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwCustomsClearanceAgents.Add(ObjCVarvwCustomsClearanceAgents);
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
