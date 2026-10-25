using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Generated
{
    [Serializable]
    public class CPKvwWH_Invoice
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
    public partial class CVarvwWH_Invoice : CPKvwWH_Invoice
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCodeSerial;
        internal String mCode;
        internal Int32 mWarehouseID;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal String mCustomerLocalName;
        internal String mAddress;
        internal Int32 mContractID;
        internal String mContractCode;
        internal DateTime mInvoiceDate;
        internal String mstrInvoiceDate;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal String mNotes;
        internal Boolean mIsPosted;
        internal DateTime mPostDate;
        internal String mstrPostDate;
        internal Boolean mIsDeleted;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int32 CodeSerial
        {
            get { return mCodeSerial; }
            set { mCodeSerial = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 WarehouseID
        {
            get { return mWarehouseID; }
            set { mWarehouseID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public String CustomerLocalName
        {
            get { return mCustomerLocalName; }
            set { mCustomerLocalName = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mAddress = value; }
        }
        public Int32 ContractID
        {
            get { return mContractID; }
            set { mContractID = value; }
        }
        public String ContractCode
        {
            get { return mContractCode; }
            set { mContractCode = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public String strInvoiceDate
        {
            get { return mstrInvoiceDate; }
            set { mstrInvoiceDate = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public String CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsPosted
        {
            get { return mIsPosted; }
            set { mIsPosted = value; }
        }
        public DateTime PostDate
        {
            get { return mPostDate; }
            set { mPostDate = value; }
        }
        public String strPostDate
        {
            get { return mstrPostDate; }
            set { mstrPostDate = value; }
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

    public partial class CvwWH_Invoice
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
        public List<CVarvwWH_Invoice> lstCVarvwWH_Invoice = new List<CVarvwWH_Invoice>();
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
            lstCVarvwWH_Invoice.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwWH_Invoice";
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
                        CVarvwWH_Invoice ObjCVarvwWH_Invoice = new CVarvwWH_Invoice();
                        ObjCVarvwWH_Invoice.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_Invoice.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarvwWH_Invoice.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwWH_Invoice.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarvwWH_Invoice.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwWH_Invoice.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwWH_Invoice.mCustomerLocalName = Convert.ToString(dr["CustomerLocalName"].ToString());
                        ObjCVarvwWH_Invoice.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwWH_Invoice.mContractID = Convert.ToInt32(dr["ContractID"].ToString());
                        ObjCVarvwWH_Invoice.mContractCode = Convert.ToString(dr["ContractCode"].ToString());
                        ObjCVarvwWH_Invoice.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwWH_Invoice.mstrInvoiceDate = Convert.ToString(dr["strInvoiceDate"].ToString());
                        ObjCVarvwWH_Invoice.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwWH_Invoice.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwWH_Invoice.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwWH_Invoice.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwWH_Invoice.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwWH_Invoice.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarvwWH_Invoice.mPostDate = Convert.ToDateTime(dr["PostDate"].ToString());
                        ObjCVarvwWH_Invoice.mstrPostDate = Convert.ToString(dr["strPostDate"].ToString());
                        ObjCVarvwWH_Invoice.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwWH_Invoice.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwWH_Invoice.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwWH_Invoice.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwWH_Invoice.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarvwWH_Invoice.Add(ObjCVarvwWH_Invoice);
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
            lstCVarvwWH_Invoice.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwWH_Invoice";
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
                        CVarvwWH_Invoice ObjCVarvwWH_Invoice = new CVarvwWH_Invoice();
                        ObjCVarvwWH_Invoice.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwWH_Invoice.mCodeSerial = Convert.ToInt32(dr["CodeSerial"].ToString());
                        ObjCVarvwWH_Invoice.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwWH_Invoice.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarvwWH_Invoice.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwWH_Invoice.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwWH_Invoice.mCustomerLocalName = Convert.ToString(dr["CustomerLocalName"].ToString());
                        ObjCVarvwWH_Invoice.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwWH_Invoice.mContractID = Convert.ToInt32(dr["ContractID"].ToString());
                        ObjCVarvwWH_Invoice.mContractCode = Convert.ToString(dr["ContractCode"].ToString());
                        ObjCVarvwWH_Invoice.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarvwWH_Invoice.mstrInvoiceDate = Convert.ToString(dr["strInvoiceDate"].ToString());
                        ObjCVarvwWH_Invoice.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwWH_Invoice.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwWH_Invoice.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwWH_Invoice.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwWH_Invoice.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwWH_Invoice.mIsPosted = Convert.ToBoolean(dr["IsPosted"].ToString());
                        ObjCVarvwWH_Invoice.mPostDate = Convert.ToDateTime(dr["PostDate"].ToString());
                        ObjCVarvwWH_Invoice.mstrPostDate = Convert.ToString(dr["strPostDate"].ToString());
                        ObjCVarvwWH_Invoice.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwWH_Invoice.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwWH_Invoice.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwWH_Invoice.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwWH_Invoice.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwWH_Invoice.Add(ObjCVarvwWH_Invoice);
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
