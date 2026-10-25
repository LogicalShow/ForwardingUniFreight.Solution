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
    public class CPKAccPayment
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
    public partial class CVarAccPayment : CPKAccPayment
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mSerial;
        internal String mPaymentCode;
        internal Int32 mBranchID;
        internal Int32 mPRType;
        internal Int32 mPaymentTypeID;
        internal DateTime mPaymentDate;
        internal DateTime mDueDate;
        internal Int32 mChargeTypeID;
        internal Int32 mTreasuryID;
        internal Int32 mBankAccountID;
        internal Int32 mPartnerTypeID;
        internal Int32 mCustomerID;
        internal Int32 mAgentID;
        internal Int32 mShippingAgentID;
        internal Int32 mCustomsClearanceAgentID;
        internal Int32 mShippingLineID;
        internal Int32 mAirlineID;
        internal Int32 mTruckerID;
        internal Int32 mSupplierID;
        internal Int32 mCustodyID;
        internal String mDealerName;
        internal Decimal mTotalLocalAmount;
        internal String mBankName;
        internal String mChequeOrVisaNo;
        internal Int32 mApprovingUserID;
        internal String mNotes;
        internal Boolean mIsGeneralExpense;
        internal Boolean mIsRefused;
        internal Boolean mIsApproved;
        internal Boolean mIsPosted;
        internal Boolean mIsDeleted;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Decimal mWithHoldingTax;
        #endregion

        #region "Methods"
        public Int64 Serial
        {
            get { return mSerial; }
            set { mIsChanges = true; mSerial = value; }
        }
        public String PaymentCode
        {
            get { return mPaymentCode; }
            set { mIsChanges = true; mPaymentCode = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int32 PRType
        {
            get { return mPRType; }
            set { mIsChanges = true; mPRType = value; }
        }
        public Int32 PaymentTypeID
        {
            get { return mPaymentTypeID; }
            set { mIsChanges = true; mPaymentTypeID = value; }
        }
        public DateTime PaymentDate
        {
            get { return mPaymentDate; }
            set { mIsChanges = true; mPaymentDate = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mIsChanges = true; mDueDate = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mIsChanges = true; mChargeTypeID = value; }
        }
        public Int32 TreasuryID
        {
            get { return mTreasuryID; }
            set { mIsChanges = true; mTreasuryID = value; }
        }
        public Int32 BankAccountID
        {
            get { return mBankAccountID; }
            set { mIsChanges = true; mBankAccountID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mIsChanges = true; mPartnerTypeID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mIsChanges = true; mAgentID = value; }
        }
        public Int32 ShippingAgentID
        {
            get { return mShippingAgentID; }
            set { mIsChanges = true; mShippingAgentID = value; }
        }
        public Int32 CustomsClearanceAgentID
        {
            get { return mCustomsClearanceAgentID; }
            set { mIsChanges = true; mCustomsClearanceAgentID = value; }
        }
        public Int32 ShippingLineID
        {
            get { return mShippingLineID; }
            set { mIsChanges = true; mShippingLineID = value; }
        }
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mIsChanges = true; mAirlineID = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mIsChanges = true; mTruckerID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public Int32 CustodyID
        {
            get { return mCustodyID; }
            set { mIsChanges = true; mCustodyID = value; }
        }
        public String DealerName
        {
            get { return mDealerName; }
            set { mIsChanges = true; mDealerName = value; }
        }
        public Decimal TotalLocalAmount
        {
            get { return mTotalLocalAmount; }
            set { mIsChanges = true; mTotalLocalAmount = value; }
        }
        public String BankName
        {
            get { return mBankName; }
            set { mIsChanges = true; mBankName = value; }
        }
        public String ChequeOrVisaNo
        {
            get { return mChequeOrVisaNo; }
            set { mIsChanges = true; mChequeOrVisaNo = value; }
        }
        public Int32 ApprovingUserID
        {
            get { return mApprovingUserID; }
            set { mIsChanges = true; mApprovingUserID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsGeneralExpense
        {
            get { return mIsGeneralExpense; }
            set { mIsChanges = true; mIsGeneralExpense = value; }
        }
        public Boolean IsRefused
        {
            get { return mIsRefused; }
            set { mIsChanges = true; mIsRefused = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Boolean IsPosted
        {
            get { return mIsPosted; }
            set { mIsChanges = true; mIsPosted = value; }
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
        public Decimal WithHoldingTax
        {
            get { return mWithHoldingTax; }
            set { mIsChanges = true; mWithHoldingTax = value; }
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

    public partial class CAccPayment
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
        public List<CVarAccPayment> lstCVarAccPayment = new List<CVarAccPayment>();
        public List<CPKAccPayment> lstDeletedCPKAccPayment = new List<CPKAccPayment>();
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
            lstCVarAccPayment.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAccPayment";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAccPayment";
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
                        CVarAccPayment ObjCVarAccPayment = new CVarAccPayment();
                        ObjCVarAccPayment.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccPayment.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarAccPayment.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarAccPayment.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarAccPayment.mPRType = Convert.ToInt32(dr["PRType"].ToString());
                        ObjCVarAccPayment.mPaymentTypeID = Convert.ToInt32(dr["PaymentTypeID"].ToString());
                        ObjCVarAccPayment.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarAccPayment.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarAccPayment.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarAccPayment.mTreasuryID = Convert.ToInt32(dr["TreasuryID"].ToString());
                        ObjCVarAccPayment.mBankAccountID = Convert.ToInt32(dr["BankAccountID"].ToString());
                        ObjCVarAccPayment.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarAccPayment.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarAccPayment.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarAccPayment.mShippingAgentID = Convert.ToInt32(dr["ShippingAgentID"].ToString());
                        ObjCVarAccPayment.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
                        ObjCVarAccPayment.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarAccPayment.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarAccPayment.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarAccPayment.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarAccPayment.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarAccPayment.mDealerName = Convert.ToString(dr["DealerName"].ToString());
                        ObjCVarAccPayment.mTotalLocalAmount = Convert.ToDecimal(dr["TotalLocalAmount"].ToString());
                        ObjCVarAccPayment.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarAccPayment.mChequeOrVisaNo = Convert.ToString(dr["ChequeOrVisaNo"].ToString());
                        ObjCVarAccPayment.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarAccPayment.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAccPayment.mIsGeneralExpense = Convert.ToBoolean(dr["IsGeneralExpense"].ToString());
                        ObjCVarAccPayment.mIsRefused = Convert.ToBoolean(dr["IsRefused"].ToString());
                        ObjCVarAccPayment.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarAccPayment.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarAccPayment.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAccPayment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccPayment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccPayment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccPayment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAccPayment.mWithHoldingTax = Convert.ToDecimal(dr["WithHoldingTax"].ToString());
                        lstCVarAccPayment.Add(ObjCVarAccPayment);
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
            lstCVarAccPayment.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAccPayment";
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
                        CVarAccPayment ObjCVarAccPayment = new CVarAccPayment();
                        ObjCVarAccPayment.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccPayment.mSerial = Convert.ToInt64(dr["Serial"].ToString());
                        ObjCVarAccPayment.mPaymentCode = Convert.ToString(dr["PaymentCode"].ToString());
                        ObjCVarAccPayment.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarAccPayment.mPRType = Convert.ToInt32(dr["PRType"].ToString());
                        ObjCVarAccPayment.mPaymentTypeID = Convert.ToInt32(dr["PaymentTypeID"].ToString());
                        ObjCVarAccPayment.mPaymentDate = Convert.ToDateTime(dr["PaymentDate"].ToString());
                        ObjCVarAccPayment.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarAccPayment.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarAccPayment.mTreasuryID = Convert.ToInt32(dr["TreasuryID"].ToString());
                        ObjCVarAccPayment.mBankAccountID = Convert.ToInt32(dr["BankAccountID"].ToString());
                        ObjCVarAccPayment.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarAccPayment.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarAccPayment.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarAccPayment.mShippingAgentID = Convert.ToInt32(dr["ShippingAgentID"].ToString());
                        ObjCVarAccPayment.mCustomsClearanceAgentID = Convert.ToInt32(dr["CustomsClearanceAgentID"].ToString());
                        ObjCVarAccPayment.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarAccPayment.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarAccPayment.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarAccPayment.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarAccPayment.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        ObjCVarAccPayment.mDealerName = Convert.ToString(dr["DealerName"].ToString());
                        ObjCVarAccPayment.mTotalLocalAmount = Convert.ToDecimal(dr["TotalLocalAmount"].ToString());
                        ObjCVarAccPayment.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarAccPayment.mChequeOrVisaNo = Convert.ToString(dr["ChequeOrVisaNo"].ToString());
                        ObjCVarAccPayment.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarAccPayment.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAccPayment.mIsGeneralExpense = Convert.ToBoolean(dr["IsGeneralExpense"].ToString());
                        ObjCVarAccPayment.mIsRefused = Convert.ToBoolean(dr["IsRefused"].ToString());
                        ObjCVarAccPayment.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarAccPayment.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarAccPayment.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAccPayment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccPayment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccPayment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccPayment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAccPayment.mWithHoldingTax = Convert.ToDecimal(dr["WithHoldingTax"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAccPayment.Add(ObjCVarAccPayment);
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
                    Com.CommandText = "[dbo].DeleteListAccPayment";
                else
                    Com.CommandText = "[dbo].UpdateListAccPayment";
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
        public Exception DeleteItem(List<CPKAccPayment> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAccPayment";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKAccPayment ObjCPKAccPayment in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKAccPayment.ID);
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
        public Exception SaveMethod(List<CVarAccPayment> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Serial", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PaymentCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PRType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PaymentTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PaymentDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@DueDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TreasuryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BankAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PartnerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AgentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ShippingAgentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustomsClearanceAgentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ShippingLineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AirlineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TruckerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustodyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DealerName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TotalLocalAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@BankName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ChequeOrVisaNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ApprovingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsGeneralExpense", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsRefused", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsPosted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@WithHoldingTax", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAccPayment ObjCVarAccPayment in SaveList)
                {
                    if (ObjCVarAccPayment.mIsChanges == true)
                    {
                        if (ObjCVarAccPayment.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAccPayment";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAccPayment.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAccPayment";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAccPayment.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAccPayment.ID;
                        }
                        Com.Parameters["@Serial"].Value = ObjCVarAccPayment.Serial;
                        Com.Parameters["@PaymentCode"].Value = ObjCVarAccPayment.PaymentCode;
                        Com.Parameters["@BranchID"].Value = ObjCVarAccPayment.BranchID;
                        Com.Parameters["@PRType"].Value = ObjCVarAccPayment.PRType;
                        Com.Parameters["@PaymentTypeID"].Value = ObjCVarAccPayment.PaymentTypeID;
                        Com.Parameters["@PaymentDate"].Value = ObjCVarAccPayment.PaymentDate;
                        Com.Parameters["@DueDate"].Value = ObjCVarAccPayment.DueDate;
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarAccPayment.ChargeTypeID;
                        Com.Parameters["@TreasuryID"].Value = ObjCVarAccPayment.TreasuryID;
                        Com.Parameters["@BankAccountID"].Value = ObjCVarAccPayment.BankAccountID;
                        Com.Parameters["@PartnerTypeID"].Value = ObjCVarAccPayment.PartnerTypeID;
                        Com.Parameters["@CustomerID"].Value = ObjCVarAccPayment.CustomerID;
                        Com.Parameters["@AgentID"].Value = ObjCVarAccPayment.AgentID;
                        Com.Parameters["@ShippingAgentID"].Value = ObjCVarAccPayment.ShippingAgentID;
                        Com.Parameters["@CustomsClearanceAgentID"].Value = ObjCVarAccPayment.CustomsClearanceAgentID;
                        Com.Parameters["@ShippingLineID"].Value = ObjCVarAccPayment.ShippingLineID;
                        Com.Parameters["@AirlineID"].Value = ObjCVarAccPayment.AirlineID;
                        Com.Parameters["@TruckerID"].Value = ObjCVarAccPayment.TruckerID;
                        Com.Parameters["@SupplierID"].Value = ObjCVarAccPayment.SupplierID;
                        Com.Parameters["@CustodyID"].Value = ObjCVarAccPayment.CustodyID;
                        Com.Parameters["@DealerName"].Value = ObjCVarAccPayment.DealerName;
                        Com.Parameters["@TotalLocalAmount"].Value = ObjCVarAccPayment.TotalLocalAmount;
                        Com.Parameters["@BankName"].Value = ObjCVarAccPayment.BankName;
                        Com.Parameters["@ChequeOrVisaNo"].Value = ObjCVarAccPayment.ChequeOrVisaNo;
                        Com.Parameters["@ApprovingUserID"].Value = ObjCVarAccPayment.ApprovingUserID;
                        Com.Parameters["@Notes"].Value = ObjCVarAccPayment.Notes;
                        Com.Parameters["@IsGeneralExpense"].Value = ObjCVarAccPayment.IsGeneralExpense;
                        Com.Parameters["@IsRefused"].Value = ObjCVarAccPayment.IsRefused;
                        Com.Parameters["@IsApproved"].Value = ObjCVarAccPayment.IsApproved;
                        Com.Parameters["@IsPosted"].Value = ObjCVarAccPayment.IsPosted;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarAccPayment.IsDeleted;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarAccPayment.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAccPayment.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarAccPayment.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarAccPayment.ModificationDate;
                        Com.Parameters["@WithHoldingTax"].Value = ObjCVarAccPayment.WithHoldingTax;
                        EndTrans(Com, Con);
                        if (ObjCVarAccPayment.ID == 0)
                        {
                            ObjCVarAccPayment.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAccPayment.mIsChanges = false;
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
