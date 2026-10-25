using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated
{
    [Serializable]
    public partial class CVarvwSL_InvoiceType
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mCode;
        internal String mName;
        internal Boolean mIsFreightInvoice;
        internal Boolean mIsStorageInvoice;
        internal Boolean mIsDemurrageInvoice;
        internal Decimal mInvoiceSerial;
        internal Int32 mCurrencyID;
        internal Boolean mIsExport;
        internal Boolean mOnePerBill;
        internal String mRemarks;
        internal Boolean mIsForOthers;
        internal Boolean mIsOther;
        internal Boolean mIsEnsInvoice;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Boolean IsFreightInvoice
        {
            get { return mIsFreightInvoice; }
            set { mIsFreightInvoice = value; }
        }
        public Boolean IsStorageInvoice
        {
            get { return mIsStorageInvoice; }
            set { mIsStorageInvoice = value; }
        }
        public Boolean IsDemurrageInvoice
        {
            get { return mIsDemurrageInvoice; }
            set { mIsDemurrageInvoice = value; }
        }
        public Decimal InvoiceSerial
        {
            get { return mInvoiceSerial; }
            set { mInvoiceSerial = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public Boolean IsExport
        {
            get { return mIsExport; }
            set { mIsExport = value; }
        }
        public Boolean OnePerBill
        {
            get { return mOnePerBill; }
            set { mOnePerBill = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        public Boolean IsForOthers
        {
            get { return mIsForOthers; }
            set { mIsForOthers = value; }
        }
        public Boolean IsOther
        {
            get { return mIsOther; }
            set { mIsOther = value; }
        }
        public Boolean IsEnsInvoice
        {
            get { return mIsEnsInvoice; }
            set { mIsEnsInvoice = value; }
        }
        #endregion
    }

    public partial class CvwSL_InvoiceType
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
        public List<CVarvwSL_InvoiceType> lstCVarvwSL_InvoiceType = new List<CVarvwSL_InvoiceType>();
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
            lstCVarvwSL_InvoiceType.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_InvoiceType";
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
                        CVarvwSL_InvoiceType ObjCVarvwSL_InvoiceType = new CVarvwSL_InvoiceType();
                        ObjCVarvwSL_InvoiceType.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_InvoiceType.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSL_InvoiceType.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsFreightInvoice = Convert.ToBoolean(dr["IsFreightInvoice"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsStorageInvoice = Convert.ToBoolean(dr["IsStorageInvoice"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsDemurrageInvoice = Convert.ToBoolean(dr["IsDemurrageInvoice"].ToString());
                        ObjCVarvwSL_InvoiceType.mInvoiceSerial = Convert.ToDecimal(dr["InvoiceSerial"].ToString());
                        ObjCVarvwSL_InvoiceType.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarvwSL_InvoiceType.mOnePerBill = Convert.ToBoolean(dr["OnePerBill"].ToString());
                        ObjCVarvwSL_InvoiceType.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsForOthers = Convert.ToBoolean(dr["IsForOthers"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsOther = Convert.ToBoolean(dr["IsOther"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsEnsInvoice = Convert.ToBoolean(dr["IsEnsInvoice"].ToString());
                        lstCVarvwSL_InvoiceType.Add(ObjCVarvwSL_InvoiceType);
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
            lstCVarvwSL_InvoiceType.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_InvoiceType";
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
                        CVarvwSL_InvoiceType ObjCVarvwSL_InvoiceType = new CVarvwSL_InvoiceType();
                        ObjCVarvwSL_InvoiceType.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_InvoiceType.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSL_InvoiceType.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsFreightInvoice = Convert.ToBoolean(dr["IsFreightInvoice"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsStorageInvoice = Convert.ToBoolean(dr["IsStorageInvoice"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsDemurrageInvoice = Convert.ToBoolean(dr["IsDemurrageInvoice"].ToString());
                        ObjCVarvwSL_InvoiceType.mInvoiceSerial = Convert.ToDecimal(dr["InvoiceSerial"].ToString());
                        ObjCVarvwSL_InvoiceType.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarvwSL_InvoiceType.mOnePerBill = Convert.ToBoolean(dr["OnePerBill"].ToString());
                        ObjCVarvwSL_InvoiceType.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsForOthers = Convert.ToBoolean(dr["IsForOthers"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsOther = Convert.ToBoolean(dr["IsOther"].ToString());
                        ObjCVarvwSL_InvoiceType.mIsEnsInvoice = Convert.ToBoolean(dr["IsEnsInvoice"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_InvoiceType.Add(ObjCVarvwSL_InvoiceType);
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
