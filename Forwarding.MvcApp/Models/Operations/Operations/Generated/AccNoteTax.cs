using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKAccNoteTax
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
    public partial class CVarAccNoteTax : CPKAccNoteTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mCodeSerial;
        internal String mCode;
        internal Int32 mNoteType;
        internal DateTime mNoteDate;
        internal Int64 mOperationID;
        internal Int64 mOperationPartnerID;
        internal Int64 mInvoiceID;
        internal Int64 mAddressID;
        internal String mPrintedAddress;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal Decimal mAmountWithoutVAT;
        internal Int32 mTaxTypeID;
        internal Decimal mTaxPercentage;
        internal Decimal mTaxAmount;
        internal Int32 mDiscountTypeID;
        internal Decimal mDiscountPercentage;
        internal Decimal mDiscountAmount;
        internal Decimal mAmount;
        internal Decimal mPaidAmount;
        internal Decimal mRemainingAmount;
        internal Int32 mNoteStatusID;
        internal String mRemarks;
        internal Boolean mIsApproved;
        internal Boolean mIsDeleted;
        internal Int32 mApprovingUserID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int64 mJVID;
        internal Int64 mPayableID;
        #endregion

        #region "Methods"
        public Int64 CodeSerial
        {
            get { return mCodeSerial; }
            set { mIsChanges = true; mCodeSerial = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Int32 NoteType
        {
            get { return mNoteType; }
            set { mIsChanges = true; mNoteType = value; }
        }
        public DateTime NoteDate
        {
            get { return mNoteDate; }
            set { mIsChanges = true; mNoteDate = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int64 OperationPartnerID
        {
            get { return mOperationPartnerID; }
            set { mIsChanges = true; mOperationPartnerID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Int64 AddressID
        {
            get { return mAddressID; }
            set { mIsChanges = true; mAddressID = value; }
        }
        public String PrintedAddress
        {
            get { return mPrintedAddress; }
            set { mIsChanges = true; mPrintedAddress = value; }
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
        public Decimal AmountWithoutVAT
        {
            get { return mAmountWithoutVAT; }
            set { mIsChanges = true; mAmountWithoutVAT = value; }
        }
        public Int32 TaxTypeID
        {
            get { return mTaxTypeID; }
            set { mIsChanges = true; mTaxTypeID = value; }
        }
        public Decimal TaxPercentage
        {
            get { return mTaxPercentage; }
            set { mIsChanges = true; mTaxPercentage = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mIsChanges = true; mTaxAmount = value; }
        }
        public Int32 DiscountTypeID
        {
            get { return mDiscountTypeID; }
            set { mIsChanges = true; mDiscountTypeID = value; }
        }
        public Decimal DiscountPercentage
        {
            get { return mDiscountPercentage; }
            set { mIsChanges = true; mDiscountPercentage = value; }
        }
        public Decimal DiscountAmount
        {
            get { return mDiscountAmount; }
            set { mIsChanges = true; mDiscountAmount = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mIsChanges = true; mPaidAmount = value; }
        }
        public Decimal RemainingAmount
        {
            get { return mRemainingAmount; }
            set { mIsChanges = true; mRemainingAmount = value; }
        }
        public Int32 NoteStatusID
        {
            get { return mNoteStatusID; }
            set { mIsChanges = true; mNoteStatusID = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mIsChanges = true; mRemarks = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public Int32 ApprovingUserID
        {
            get { return mApprovingUserID; }
            set { mIsChanges = true; mApprovingUserID = value; }
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
        public Int64 JVID
        {
            get { return mJVID; }
            set { mIsChanges = true; mJVID = value; }
        }
        public Int64 PayableID
        {
            get { return mPayableID; }
            set { mIsChanges = true; mPayableID = value; }
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

    public partial class CAccNoteTax
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
        public List<CVarAccNoteTax> lstCVarAccNoteTax = new List<CVarAccNoteTax>();
        public List<CPKAccNoteTax> lstDeletedCPKAccNoteTax = new List<CPKAccNoteTax>();
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
            lstCVarAccNoteTax.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAccNote";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAccNote";
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
                        CVarAccNoteTax ObjCVarAccNoteTax = new CVarAccNoteTax();
                        ObjCVarAccNoteTax.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccNoteTax.mCodeSerial = Convert.ToInt64(dr["CodeSerial"].ToString());
                        ObjCVarAccNoteTax.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarAccNoteTax.mNoteType = Convert.ToInt32(dr["NoteType"].ToString());
                        ObjCVarAccNoteTax.mNoteDate = Convert.ToDateTime(dr["NoteDate"].ToString());
                        ObjCVarAccNoteTax.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarAccNoteTax.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarAccNoteTax.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarAccNoteTax.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarAccNoteTax.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarAccNoteTax.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAccNoteTax.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarAccNoteTax.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarAccNoteTax.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarAccNoteTax.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarAccNoteTax.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarAccNoteTax.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarAccNoteTax.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarAccNoteTax.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarAccNoteTax.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarAccNoteTax.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarAccNoteTax.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarAccNoteTax.mNoteStatusID = Convert.ToInt32(dr["NoteStatusID"].ToString());
                        ObjCVarAccNoteTax.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarAccNoteTax.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarAccNoteTax.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAccNoteTax.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarAccNoteTax.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccNoteTax.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccNoteTax.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccNoteTax.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAccNoteTax.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarAccNoteTax.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        lstCVarAccNoteTax.Add(ObjCVarAccNoteTax);
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
            lstCVarAccNoteTax.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAccNote";
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
                        CVarAccNoteTax ObjCVarAccNoteTax = new CVarAccNoteTax();
                        ObjCVarAccNoteTax.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccNoteTax.mCodeSerial = Convert.ToInt64(dr["CodeSerial"].ToString());
                        ObjCVarAccNoteTax.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarAccNoteTax.mNoteType = Convert.ToInt32(dr["NoteType"].ToString());
                        ObjCVarAccNoteTax.mNoteDate = Convert.ToDateTime(dr["NoteDate"].ToString());
                        ObjCVarAccNoteTax.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarAccNoteTax.mOperationPartnerID = Convert.ToInt64(dr["OperationPartnerID"].ToString());
                        ObjCVarAccNoteTax.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarAccNoteTax.mAddressID = Convert.ToInt64(dr["AddressID"].ToString());
                        ObjCVarAccNoteTax.mPrintedAddress = Convert.ToString(dr["PrintedAddress"].ToString());
                        ObjCVarAccNoteTax.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAccNoteTax.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarAccNoteTax.mAmountWithoutVAT = Convert.ToDecimal(dr["AmountWithoutVAT"].ToString());
                        ObjCVarAccNoteTax.mTaxTypeID = Convert.ToInt32(dr["TaxTypeID"].ToString());
                        ObjCVarAccNoteTax.mTaxPercentage = Convert.ToDecimal(dr["TaxPercentage"].ToString());
                        ObjCVarAccNoteTax.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarAccNoteTax.mDiscountTypeID = Convert.ToInt32(dr["DiscountTypeID"].ToString());
                        ObjCVarAccNoteTax.mDiscountPercentage = Convert.ToDecimal(dr["DiscountPercentage"].ToString());
                        ObjCVarAccNoteTax.mDiscountAmount = Convert.ToDecimal(dr["DiscountAmount"].ToString());
                        ObjCVarAccNoteTax.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarAccNoteTax.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarAccNoteTax.mRemainingAmount = Convert.ToDecimal(dr["RemainingAmount"].ToString());
                        ObjCVarAccNoteTax.mNoteStatusID = Convert.ToInt32(dr["NoteStatusID"].ToString());
                        ObjCVarAccNoteTax.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarAccNoteTax.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarAccNoteTax.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAccNoteTax.mApprovingUserID = Convert.ToInt32(dr["ApprovingUserID"].ToString());
                        ObjCVarAccNoteTax.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccNoteTax.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccNoteTax.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccNoteTax.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAccNoteTax.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarAccNoteTax.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAccNoteTax.Add(ObjCVarAccNoteTax);
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
                    Com.CommandText = "[dbo].DeleteListAccNote";
                else
                    Com.CommandText = "[dbo].UpdateListAccNoteTax";
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
        public Exception DeleteItem(List<CPKAccNoteTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAccNote";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKAccNoteTax ObjCPKAccNoteTax in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKAccNoteTax.ID);
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
        public Exception SaveMethod(List<CVarAccNoteTax> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CodeSerial", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@NoteType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NoteDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationPartnerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@AddressID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PrintedAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@AmountWithoutVAT", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DiscountPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PaidAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@RemainingAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@NoteStatusID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Remarks", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ApprovingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PayableID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAccNoteTax ObjCVarAccNoteTax in SaveList)
                {
                    if (ObjCVarAccNoteTax.mIsChanges == true)
                    {
                        if (ObjCVarAccNoteTax.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAccNoteTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAccNoteTax.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAccNoteTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAccNoteTax.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAccNoteTax.ID;
                        }
                        Com.Parameters["@CodeSerial"].Value = ObjCVarAccNoteTax.CodeSerial;
                        Com.Parameters["@Code"].Value = ObjCVarAccNoteTax.Code;
                        Com.Parameters["@NoteType"].Value = ObjCVarAccNoteTax.NoteType;
                        Com.Parameters["@NoteDate"].Value = ObjCVarAccNoteTax.NoteDate;
                        Com.Parameters["@OperationID"].Value = ObjCVarAccNoteTax.OperationID;
                        Com.Parameters["@OperationPartnerID"].Value = ObjCVarAccNoteTax.OperationPartnerID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarAccNoteTax.InvoiceID;
                        Com.Parameters["@AddressID"].Value = ObjCVarAccNoteTax.AddressID;
                        Com.Parameters["@PrintedAddress"].Value = ObjCVarAccNoteTax.PrintedAddress;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarAccNoteTax.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarAccNoteTax.ExchangeRate;
                        Com.Parameters["@AmountWithoutVAT"].Value = ObjCVarAccNoteTax.AmountWithoutVAT;
                        Com.Parameters["@TaxTypeID"].Value = ObjCVarAccNoteTax.TaxTypeID;
                        Com.Parameters["@TaxPercentage"].Value = ObjCVarAccNoteTax.TaxPercentage;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarAccNoteTax.TaxAmount;
                        Com.Parameters["@DiscountTypeID"].Value = ObjCVarAccNoteTax.DiscountTypeID;
                        Com.Parameters["@DiscountPercentage"].Value = ObjCVarAccNoteTax.DiscountPercentage;
                        Com.Parameters["@DiscountAmount"].Value = ObjCVarAccNoteTax.DiscountAmount;
                        Com.Parameters["@Amount"].Value = ObjCVarAccNoteTax.Amount;
                        Com.Parameters["@PaidAmount"].Value = ObjCVarAccNoteTax.PaidAmount;
                        Com.Parameters["@RemainingAmount"].Value = ObjCVarAccNoteTax.RemainingAmount;
                        Com.Parameters["@NoteStatusID"].Value = ObjCVarAccNoteTax.NoteStatusID;
                        Com.Parameters["@Remarks"].Value = ObjCVarAccNoteTax.Remarks;
                        Com.Parameters["@IsApproved"].Value = ObjCVarAccNoteTax.IsApproved;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarAccNoteTax.IsDeleted;
                        Com.Parameters["@ApprovingUserID"].Value = ObjCVarAccNoteTax.ApprovingUserID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarAccNoteTax.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAccNoteTax.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarAccNoteTax.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarAccNoteTax.ModificationDate;
                        Com.Parameters["@JVID"].Value = ObjCVarAccNoteTax.JVID;
                        Com.Parameters["@PayableID"].Value = ObjCVarAccNoteTax.PayableID;
                        EndTrans(Com, Con);
                        if (ObjCVarAccNoteTax.ID == 0)
                        {
                            ObjCVarAccNoteTax.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAccNoteTax.mIsChanges = false;
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
