using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public class CPKA_AllocationPayableWithVoucher_Invoices
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
    public partial class CVarA_AllocationPayableWithVoucher_Invoices : CPKA_AllocationPayableWithVoucher_Invoices
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAllocationPaymentID;
        internal Int64 mInvoiceDebitID;
        internal String mInvoiceNo;
        internal DateTime mDate;
        internal Int32 mPDType;
        internal Decimal mPaid;
        #endregion

        #region "Methods"
        public Int32 AllocationPaymentID
        {
            get { return mAllocationPaymentID; }
            set { mIsChanges = true; mAllocationPaymentID = value; }
        }
        public Int64 InvoiceDebitID
        {
            get { return mInvoiceDebitID; }
            set { mIsChanges = true; mInvoiceDebitID = value; }
        }
        public String InvoiceNo
        {
            get { return mInvoiceNo; }
            set { mIsChanges = true; mInvoiceNo = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mIsChanges = true; mDate = value; }
        }
        public Int32 PDType
        {
            get { return mPDType; }
            set { mIsChanges = true; mPDType = value; }
        }
        public Decimal Paid
        {
            get { return mPaid; }
            set { mIsChanges = true; mPaid = value; }
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

    public partial class CA_AllocationPayableWithVoucher_Invoices
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
        public List<CVarA_AllocationPayableWithVoucher_Invoices> lstCVarA_AllocationPayableWithVoucher_Invoices = new List<CVarA_AllocationPayableWithVoucher_Invoices>();
        public List<CPKA_AllocationPayableWithVoucher_Invoices> lstDeletedCPKA_AllocationPayableWithVoucher_Invoices = new List<CPKA_AllocationPayableWithVoucher_Invoices>();
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
            lstCVarA_AllocationPayableWithVoucher_Invoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_AllocationPayableWithVoucher_Invoices";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_AllocationPayableWithVoucher_Invoices";
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
                        CVarA_AllocationPayableWithVoucher_Invoices ObjCVarA_AllocationPayableWithVoucher_Invoices = new CVarA_AllocationPayableWithVoucher_Invoices();
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mAllocationPaymentID = Convert.ToInt32(dr["AllocationPaymentID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mInvoiceDebitID = Convert.ToInt64(dr["InvoiceDebitID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mPDType = Convert.ToInt32(dr["PDType"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mPaid = Convert.ToDecimal(dr["Paid"].ToString());
                        lstCVarA_AllocationPayableWithVoucher_Invoices.Add(ObjCVarA_AllocationPayableWithVoucher_Invoices);
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
            lstCVarA_AllocationPayableWithVoucher_Invoices.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_AllocationPayableWithVoucher_Invoices";
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
                        CVarA_AllocationPayableWithVoucher_Invoices ObjCVarA_AllocationPayableWithVoucher_Invoices = new CVarA_AllocationPayableWithVoucher_Invoices();
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mAllocationPaymentID = Convert.ToInt32(dr["AllocationPaymentID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mInvoiceDebitID = Convert.ToInt64(dr["InvoiceDebitID"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mPDType = Convert.ToInt32(dr["PDType"].ToString());
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mPaid = Convert.ToDecimal(dr["Paid"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_AllocationPayableWithVoucher_Invoices.Add(ObjCVarA_AllocationPayableWithVoucher_Invoices);
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
                    Com.CommandText = "[dbo].DeleteListA_AllocationPayableWithVoucher_Invoices";
                else
                    Com.CommandText = "[dbo].UpdateListA_AllocationPayableWithVoucher_Invoices";
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
        public Exception DeleteItem(List<CPKA_AllocationPayableWithVoucher_Invoices> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_AllocationPayableWithVoucher_Invoices";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_AllocationPayableWithVoucher_Invoices ObjCPKA_AllocationPayableWithVoucher_Invoices in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_AllocationPayableWithVoucher_Invoices.ID);
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
        public Exception SaveMethod(List<CVarA_AllocationPayableWithVoucher_Invoices> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@AllocationPaymentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoiceDebitID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@InvoiceNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PDType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Paid", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_AllocationPayableWithVoucher_Invoices ObjCVarA_AllocationPayableWithVoucher_Invoices in SaveList)
                {
                    if (ObjCVarA_AllocationPayableWithVoucher_Invoices.mIsChanges == true)
                    {
                        if (ObjCVarA_AllocationPayableWithVoucher_Invoices.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_AllocationPayableWithVoucher_Invoices";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_AllocationPayableWithVoucher_Invoices.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_AllocationPayableWithVoucher_Invoices";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_AllocationPayableWithVoucher_Invoices.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_AllocationPayableWithVoucher_Invoices.ID;
                        }
                        Com.Parameters["@AllocationPaymentID"].Value = ObjCVarA_AllocationPayableWithVoucher_Invoices.AllocationPaymentID;
                        Com.Parameters["@InvoiceDebitID"].Value = ObjCVarA_AllocationPayableWithVoucher_Invoices.InvoiceDebitID;
                        Com.Parameters["@InvoiceNo"].Value = ObjCVarA_AllocationPayableWithVoucher_Invoices.InvoiceNo;
                        Com.Parameters["@Date"].Value = ObjCVarA_AllocationPayableWithVoucher_Invoices.Date;
                        Com.Parameters["@PDType"].Value = ObjCVarA_AllocationPayableWithVoucher_Invoices.PDType;
                        Com.Parameters["@Paid"].Value = ObjCVarA_AllocationPayableWithVoucher_Invoices.Paid;
                        EndTrans(Com, Con);
                        if (ObjCVarA_AllocationPayableWithVoucher_Invoices.ID == 0)
                        {
                            ObjCVarA_AllocationPayableWithVoucher_Invoices.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_AllocationPayableWithVoucher_Invoices.mIsChanges = false;
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
