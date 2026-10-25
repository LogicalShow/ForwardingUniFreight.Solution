using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKPS_ClientDbtCrdtNotes
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
    public partial class CVarPS_ClientDbtCrdtNotes : CPKPS_ClientDbtCrdtNotes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal DateTime mDbtCrdtNoteDate;
        internal String mSerial;
        internal Int32 mCostCenterID;
        internal Boolean mIsDbt;
        internal Int32 mDisbursementJob_ID;
        internal Int32 mSupplierID;
        internal String mNotes;
        internal Boolean mIsApproved;
        internal Int64 mJVID;
        internal Int64 mInvoiceID;
        internal Int32 mCurrencyID;
        internal Decimal mTotalPrice;
        internal Decimal mPaidAmount;
        internal Decimal mRemainAmount;
        internal Int32 mBankID;
        internal DateTime mDueDate;
        internal Decimal mTaxAmount;
        internal Decimal mTotalAfterTax;
        internal Int32 mDiscountPercentege;
        internal Decimal mDiscount;
        internal Boolean misDiscount;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public DateTime DbtCrdtNoteDate
        {
            get { return mDbtCrdtNoteDate; }
            set { mIsChanges = true; mDbtCrdtNoteDate = value; }
        }
        public String Serial
        {
            get { return mSerial; }
            set { mIsChanges = true; mSerial = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Boolean IsDbt
        {
            get { return mIsDbt; }
            set { mIsChanges = true; mIsDbt = value; }
        }
        public Int32 DisbursementJob_ID
        {
            get { return mDisbursementJob_ID; }
            set { mIsChanges = true; mDisbursementJob_ID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Int64 JVID
        {
            get { return mJVID; }
            set { mIsChanges = true; mJVID = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Decimal TotalPrice
        {
            get { return mTotalPrice; }
            set { mIsChanges = true; mTotalPrice = value; }
        }
        public Decimal PaidAmount
        {
            get { return mPaidAmount; }
            set { mIsChanges = true; mPaidAmount = value; }
        }
        public Decimal RemainAmount
        {
            get { return mRemainAmount; }
            set { mIsChanges = true; mRemainAmount = value; }
        }
        public Int32 BankID
        {
            get { return mBankID; }
            set { mIsChanges = true; mBankID = value; }
        }
        public DateTime DueDate
        {
            get { return mDueDate; }
            set { mIsChanges = true; mDueDate = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mIsChanges = true; mTaxAmount = value; }
        }
        public Decimal TotalAfterTax
        {
            get { return mTotalAfterTax; }
            set { mIsChanges = true; mTotalAfterTax = value; }
        }
        public Int32 DiscountPercentege
        {
            get { return mDiscountPercentege; }
            set { mIsChanges = true; mDiscountPercentege = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mIsChanges = true; mDiscount = value; }
        }
        public Boolean isDiscount
        {
            get { return misDiscount; }
            set { mIsChanges = true; misDiscount = value; }
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

    public partial class CPS_ClientDbtCrdtNotes
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
        public List<CVarPS_ClientDbtCrdtNotes> lstCVarPS_ClientDbtCrdtNotes = new List<CVarPS_ClientDbtCrdtNotes>();
        public List<CPKPS_ClientDbtCrdtNotes> lstDeletedCPKPS_ClientDbtCrdtNotes = new List<CPKPS_ClientDbtCrdtNotes>();
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
        public Exception GetItem(Decimal ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarPS_ClientDbtCrdtNotes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_ClientDbtCrdtNotes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_ClientDbtCrdtNotes";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal));
                    Com.Parameters[0].Value = Convert.ToDecimal(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarPS_ClientDbtCrdtNotes ObjCVarPS_ClientDbtCrdtNotes = new CVarPS_ClientDbtCrdtNotes();
                        ObjCVarPS_ClientDbtCrdtNotes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDbtCrdtNoteDate = Convert.ToDateTime(dr["DbtCrdtNoteDate"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mSerial = Convert.ToString(dr["Serial"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mIsDbt = Convert.ToBoolean(dr["IsDbt"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDiscountPercentege = Convert.ToInt32(dr["DiscountPercentege"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.misDiscount = Convert.ToBoolean(dr["isDiscount"].ToString());
                        lstCVarPS_ClientDbtCrdtNotes.Add(ObjCVarPS_ClientDbtCrdtNotes);
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
            lstCVarPS_ClientDbtCrdtNotes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_ClientDbtCrdtNotes";
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
                        CVarPS_ClientDbtCrdtNotes ObjCVarPS_ClientDbtCrdtNotes = new CVarPS_ClientDbtCrdtNotes();
                        ObjCVarPS_ClientDbtCrdtNotes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDbtCrdtNoteDate = Convert.ToDateTime(dr["DbtCrdtNoteDate"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mSerial = Convert.ToString(dr["Serial"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mIsDbt = Convert.ToBoolean(dr["IsDbt"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDisbursementJob_ID = Convert.ToInt32(dr["DisbursementJob_ID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mJVID = Convert.ToInt64(dr["JVID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mPaidAmount = Convert.ToDecimal(dr["PaidAmount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mRemainAmount = Convert.ToDecimal(dr["RemainAmount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mBankID = Convert.ToInt32(dr["BankID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDueDate = Convert.ToDateTime(dr["DueDate"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mTotalAfterTax = Convert.ToDecimal(dr["TotalAfterTax"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDiscountPercentege = Convert.ToInt32(dr["DiscountPercentege"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotes.misDiscount = Convert.ToBoolean(dr["isDiscount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_ClientDbtCrdtNotes.Add(ObjCVarPS_ClientDbtCrdtNotes);
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
                    Com.CommandText = "[dbo].DeleteListPS_ClientDbtCrdtNotes";
                else
                    Com.CommandText = "[dbo].UpdateListPS_ClientDbtCrdtNotes";
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
        public Exception DeleteItem(List<CPKPS_ClientDbtCrdtNotes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_ClientDbtCrdtNotes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal));
                foreach (CPKPS_ClientDbtCrdtNotes ObjCPKPS_ClientDbtCrdtNotes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToDecimal(ObjCPKPS_ClientDbtCrdtNotes.ID);
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
        public Exception SaveMethod(List<CVarPS_ClientDbtCrdtNotes> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@DbtCrdtNoteDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Serial", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDbt", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DisbursementJob_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TotalPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PaidAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@RemainAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@BankID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DueDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TotalAfterTax", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DiscountPercentege", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Discount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@isDiscount", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal, 17, ParameterDirection.Input, false, 18, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_ClientDbtCrdtNotes ObjCVarPS_ClientDbtCrdtNotes in SaveList)
                {
                    if (ObjCVarPS_ClientDbtCrdtNotes.mIsChanges == true)
                    {
                        if (ObjCVarPS_ClientDbtCrdtNotes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_ClientDbtCrdtNotes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_ClientDbtCrdtNotes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_ClientDbtCrdtNotes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_ClientDbtCrdtNotes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_ClientDbtCrdtNotes.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarPS_ClientDbtCrdtNotes.Code;
                        Com.Parameters["@DbtCrdtNoteDate"].Value = ObjCVarPS_ClientDbtCrdtNotes.DbtCrdtNoteDate;
                        Com.Parameters["@Serial"].Value = ObjCVarPS_ClientDbtCrdtNotes.Serial;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarPS_ClientDbtCrdtNotes.CostCenterID;
                        Com.Parameters["@IsDbt"].Value = ObjCVarPS_ClientDbtCrdtNotes.IsDbt;
                        Com.Parameters["@DisbursementJob_ID"].Value = ObjCVarPS_ClientDbtCrdtNotes.DisbursementJob_ID;
                        Com.Parameters["@SupplierID"].Value = ObjCVarPS_ClientDbtCrdtNotes.SupplierID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_ClientDbtCrdtNotes.Notes;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPS_ClientDbtCrdtNotes.IsApproved;
                        Com.Parameters["@JVID"].Value = ObjCVarPS_ClientDbtCrdtNotes.JVID;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarPS_ClientDbtCrdtNotes.InvoiceID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPS_ClientDbtCrdtNotes.CurrencyID;
                        Com.Parameters["@TotalPrice"].Value = ObjCVarPS_ClientDbtCrdtNotes.TotalPrice;
                        Com.Parameters["@PaidAmount"].Value = ObjCVarPS_ClientDbtCrdtNotes.PaidAmount;
                        Com.Parameters["@RemainAmount"].Value = ObjCVarPS_ClientDbtCrdtNotes.RemainAmount;
                        Com.Parameters["@BankID"].Value = ObjCVarPS_ClientDbtCrdtNotes.BankID;
                        Com.Parameters["@DueDate"].Value = ObjCVarPS_ClientDbtCrdtNotes.DueDate;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarPS_ClientDbtCrdtNotes.TaxAmount;
                        Com.Parameters["@TotalAfterTax"].Value = ObjCVarPS_ClientDbtCrdtNotes.TotalAfterTax;
                        Com.Parameters["@DiscountPercentege"].Value = ObjCVarPS_ClientDbtCrdtNotes.DiscountPercentege;
                        Com.Parameters["@Discount"].Value = ObjCVarPS_ClientDbtCrdtNotes.Discount;
                        Com.Parameters["@isDiscount"].Value = ObjCVarPS_ClientDbtCrdtNotes.isDiscount;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_ClientDbtCrdtNotes.ID == 0)
                        {
                            ObjCVarPS_ClientDbtCrdtNotes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_ClientDbtCrdtNotes.mIsChanges = false;
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
