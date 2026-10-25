using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.OperAcc.Generated
{
    [Serializable]
    public class CPKvwAccPayment
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
    public partial class CVarvwAccPayment : CPKvwAccPayment
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mSerial;
        internal String mPaymentCode;
        internal Int32 mBranchID;
        internal String mBranchName;
        internal Int32 mPRType;
        internal String mPRTypeName;
        internal Int32 mPaymentTypeID;
        internal String mPaymentTypeName;
        internal DateTime mPaymentDate;
        internal DateTime mDueDate;
        internal Int32 mTreasuryID;
        internal String mTreasuryName;
        internal Int32 mBankAccountID;
        internal String mCompanyBankAccountName;
        internal Int32 mPartnerTypeID;
        internal String mPartnerTypeCode;
        internal Int32 mPartnerID;
        internal String mPartnerName;
        internal String mAvailableBalance;
        internal String mDealerName;
        internal Decimal mTotalLocalAmount;
        internal String mBankName;
        internal String mChequeOrVisaNo;
        internal String mNotes;
        internal Int32 mApprovingUserID;
        internal String mApprovingUserName;
        internal Boolean mIsGeneralExpense;
        internal Int32 mChargeTypeID;
        internal String mChargeTypeName;
        internal String mChargeTypeCode;
        internal Boolean mIsRefused;
        internal Boolean mIsApproved;
        internal Boolean mIsPosted;
        internal Boolean mIsDeleted;
        internal Int32 mCreatorUserID;
        internal String mCreatorName;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Decimal mWithHoldingTax;
        #endregion

        #region "Methods"
        public Int64 Serial
        {
            get { return mSerial; }
            set { mSerial = value; }
        }
        public String PaymentCode
        {
            get { return mPaymentCode; }
            set { mPaymentCode = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mBranchID = value; }
        }
        public String BranchName
        {
            get { return mBranchName; }
            set { mBranchName = value; }
        }
        public Int32 PRType
        {
            get { return mPRType; }
            set { mPRType = value; }
        }
        public String PRTypeName
        {
            get { return mPRTypeName; }
            set { mPRTypeName = value; }
        }
        public Int32 PaymentTypeID
        {
            get { return mPaymentTypeID; }
            set { mPaymentTypeID = value; }
        }
        public String PaymentTypeName
        {
            get { return mPaymentTypeName; }
            set { mPaymentTypeName = value; }
        }
        public DateTime PaymentDate
        {
            get { return mPaymentDate; }
            set { mPaymentDate = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mDueDate = value; }
        }
        public Int32 TreasuryID
        {
            get { return mTreasuryID; }
            set { mTreasuryID = value; }
        }
        public String TreasuryName
        {
            get { return mTreasuryName; }
            set { mTreasuryName = value; }
        }
        public Int32 BankAccountID
        {
            get { return mBankAccountID; }
            set { mBankAccountID = value; }
        }
        public String CompanyBankAccountName
        {
            get { return mCompanyBankAccountName; }
            set { mCompanyBankAccountName = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
        }
        public String PartnerTypeCode
        {
            get { return mPartnerTypeCode; }
            set { mPartnerTypeCode = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public String AvailableBalance
        {
            get { return mAvailableBalance; }
            set { mAvailableBalance = value; }
        }
        public String DealerName
        {
            get { return mDealerName; }
            set { mDealerName = value; }
        }
        public Decimal TotalLocalAmount
        {
            get { return mTotalLocalAmount; }
            set { mTotalLocalAmount = value; }
        }
        public String BankName
        {
            get { return mBankName; }
            set { mBankName = value; }
        }
        public String ChequeOrVisaNo
        {
            get { return mChequeOrVisaNo; }
            set { mChequeOrVisaNo = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Int32 ApprovingUserID
        {
            get { return mApprovingUserID; }
            set { mApprovingUserID = value; }
        }
        public String ApprovingUserName
        {
            get { return mApprovingUserName; }
            set { mApprovingUserName = value; }
        }
        public Boolean IsGeneralExpense
        {
            get { return mIsGeneralExpense; }
            set { mIsGeneralExpense = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
        }
        public String ChargeTypeCode
        {
            get { return mChargeTypeCode; }
            set { mChargeTypeCode = value; }
        }
        public Boolean IsRefused
        {
            get { return mIsRefused; }
            set { mIsRefused = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public Boolean IsPosted
        {
            get { return mIsPosted; }
            set { mIsPosted = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public String CreatorName
        {
            get { return mCreatorName; }
            set { mCreatorName = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public Decimal WithHoldingTax
        {
            get { return mWithHoldingTax; }
            set { mWithHoldingTax = value; }
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

    public partial class CvwAccPayment
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
        public List<CVarvwAccPayment> lstCVarvwAccPayment = new List<CVarvwAccPayment>();
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
            lstCVarvwAccPayment.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwAccPayment";
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
                        CVarvwAccPayment ObjCVarvwAccPayment = new CVarvwAccPayment();
                        ObjCVarvwAccPayment.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccPayment.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwAccPayment.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarvwAccPayment.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwAccPayment.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwAccPayment.mPRType = Convert.ToInt32(dr["PRType"].ToString());
                        ObjCVarvwAccPayment.mPRTypeName = Convert.ToString(dr["PRTypeName"].ToString());
                        ObjCVarvwAccPayment.mPaymentTypeID = Convert.ToInt32(dr["PaymentTypeID"].ToString());
                        ObjCVarvwAccPayment.mPaymentTypeName = Convert.ToString(dr["PaymentTypeName"].ToString());
                        ObjCVarvwAccPayment.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwAccPayment.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwAccPayment.mTreasuryID = Convert.ToInt32(dr["TreasuryID"].ToString());
                        ObjCVarvwAccPayment.mTreasuryName = Convert.ToString(dr["TreasuryName"].ToString());
                        ObjCVarvwAccPayment.mBankAccountID = Convert.ToInt32(dr["BankAccountID"].ToString());
                        ObjCVarvwAccPayment.mCompanyBankAccountName = Convert.ToString(dr["CompanyBankAccountName"].ToString());
                        ObjCVarvwAccPayment.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPayment.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccPayment.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccPayment.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccPayment.mAvailableBalance = Convert.ToString(dr["AvailableBalance"].ToString());
                        ObjCVarvwAccPayment.mDealerName = Convert.ToString(dr["DealerName"].ToString());
                        ObjCVarvwAccPayment.mTotalLocalAmount = Convert.ToDecimal(dr["TotalLocalAmount"].ToString());
                        ObjCVarvwAccPayment.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwAccPayment.mChequeOrVisaNo = Convert.ToString(dr["ChequeOrVisaNo"].ToString());
                        ObjCVarvwAccPayment.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccPayment.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwAccPayment.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwAccPayment.mIsGeneralExpense = Convert.ToBoolean(dr["IsGeneralExpense"].ToString());
                        ObjCVarvwAccPayment.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwAccPayment.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwAccPayment.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
                        ObjCVarvwAccPayment.mIsRefused = Convert.ToBoolean(dr["IsRefused"].ToString());
                        ObjCVarvwAccPayment.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwAccPayment.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarvwAccPayment.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAccPayment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccPayment.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwAccPayment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccPayment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccPayment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwAccPayment.mWithHoldingTax = Convert.ToDecimal(dr["WithHoldingTax"].ToString());
                        lstCVarvwAccPayment.Add(ObjCVarvwAccPayment);
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
            lstCVarvwAccPayment.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAccPayment";
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
                        CVarvwAccPayment ObjCVarvwAccPayment = new CVarvwAccPayment();
                        ObjCVarvwAccPayment.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwAccPayment.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarvwAccPayment.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarvwAccPayment.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarvwAccPayment.mBranchName = Convert.ToString(dr["BranchName"].ToString());
                        ObjCVarvwAccPayment.mPRType = Convert.ToInt32(dr["PRType"].ToString());
                        ObjCVarvwAccPayment.mPRTypeName = Convert.ToString(dr["PRTypeName"].ToString());
                        ObjCVarvwAccPayment.mPaymentTypeID = Convert.ToInt32(dr["PaymentTypeID"].ToString());
                        ObjCVarvwAccPayment.mPaymentTypeName = Convert.ToString(dr["PaymentTypeName"].ToString());
                        ObjCVarvwAccPayment.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarvwAccPayment.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarvwAccPayment.mTreasuryID = Convert.ToInt32(dr["TreasuryID"].ToString());
                        ObjCVarvwAccPayment.mTreasuryName = Convert.ToString(dr["TreasuryName"].ToString());
                        ObjCVarvwAccPayment.mBankAccountID = Convert.ToInt32(dr["BankAccountID"].ToString());
                        ObjCVarvwAccPayment.mCompanyBankAccountName = Convert.ToString(dr["CompanyBankAccountName"].ToString());
                        ObjCVarvwAccPayment.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccPayment.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccPayment.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccPayment.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccPayment.mAvailableBalance = Convert.ToString(dr["AvailableBalance"].ToString());
                        ObjCVarvwAccPayment.mDealerName = Convert.ToString(dr["DealerName"].ToString());
                        ObjCVarvwAccPayment.mTotalLocalAmount = Convert.ToDecimal(dr["TotalLocalAmount"].ToString());
                        ObjCVarvwAccPayment.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwAccPayment.mChequeOrVisaNo = Convert.ToString(dr["ChequeOrVisaNo"].ToString());
                        ObjCVarvwAccPayment.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwAccPayment.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarvwAccPayment.mApprovingUserName = Convert.ToString(dr["ApprovingUserName"].ToString());
                        ObjCVarvwAccPayment.mIsGeneralExpense = Convert.ToBoolean(dr["IsGeneralExpense"].ToString());
                        ObjCVarvwAccPayment.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwAccPayment.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwAccPayment.mChargeTypeCode = Convert.ToString(dr["ChargeTypeCode"].ToString());
                        ObjCVarvwAccPayment.mIsRefused = Convert.ToBoolean(dr["IsRefused"].ToString());
                        ObjCVarvwAccPayment.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwAccPayment.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarvwAccPayment.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwAccPayment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwAccPayment.mCreatorName = Convert.ToString(dr["CreatorName"].ToString());
                        ObjCVarvwAccPayment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwAccPayment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwAccPayment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwAccPayment.mWithHoldingTax = Convert.ToDecimal(dr["WithHoldingTax"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAccPayment.Add(ObjCVarvwAccPayment);
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
