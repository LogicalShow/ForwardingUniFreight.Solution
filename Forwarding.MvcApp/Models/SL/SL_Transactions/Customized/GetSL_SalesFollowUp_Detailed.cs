using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SL.SL_Transactions.Generated
{
    [Serializable]
    public class CPKGetSL_SalesFollowUp_Detailed
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarGetSL_SalesFollowUp_Detailed : CPKGetSL_SalesFollowUp_Detailed
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mClientName;
        internal String mInvoiceNo;
        internal DateTime mInvoiceDate;
        internal String mItemName;
        internal String mItemCode;
        internal Decimal mQty;
        internal String mUnitName;
        internal Decimal mUnitPrice;
        internal Decimal mPrice;
        internal Decimal mTotalPrice;
        internal String mCurrency_Code;
        internal Decimal mExchangeRate;


        #endregion

        #region "Methods"
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public String InvoiceNo
        {
            get { return mInvoiceNo; }
            set { mInvoiceNo = value; }
        }
        public DateTime InvoiceDate
        {
            get { return mInvoiceDate; }
            set { mInvoiceDate = value; }
        }
        public String ItemName
        {
            get { return mItemName; }
            set { mItemName = value; }
        }
        public String ItemCode
        {
            get { return mItemCode; }
            set { mItemCode = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public String UnitName
        {
            get { return mUnitName; }
            set { mUnitName = value; }
        }
        public Decimal UnitPrice
        {
            get { return mUnitPrice; }
            set { mUnitPrice = value; }
        }
        public Decimal Price
        {
            get { return mPrice; }
            set { mPrice = value; }
        }
        public String Currency_Code
        {
            get { return mCurrency_Code; }
            set { mCurrency_Code = value; }
        }
        public Decimal TotalPrice
        {
            get { return mTotalPrice; }
            set { mTotalPrice = value; }
        }
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mExchangeRate = value; }
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

    public partial class CGetSL_SalesFollowUp_Detailed
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
        public List<CVarGetSL_SalesFollowUp_Detailed> lstCVarGetSL_SalesFollowUp_Detailed = new List<CVarGetSL_SalesFollowUp_Detailed>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime FromDate, DateTime ToDate, string ClientsIDs, string ItemsIDs)
        {
            return DataFill( FromDate,  ToDate,  ClientsIDs, ItemsIDs, true);
        }
        //public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        //{
        //    return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        //}
        private Exception DataFill(DateTime FromDate , DateTime ToDate , string ClientsIDs,string ItemsIDs,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarGetSL_SalesFollowUp_Detailed.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ClientIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@ItemIDs", SqlDbType.NVarChar));

                    Com.CommandText = "[dbo].Rep_SLInvoice_SalesFollowUp_Detailed";
                    Com.Parameters[0].Value = FromDate;
                    Com.Parameters[1].Value = ToDate;
                    Com.Parameters[2].Value = ClientsIDs;
                    Com.Parameters[3].Value = ItemsIDs;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarGetSL_SalesFollowUp_Detailed ObjCVarGetSL_InvoicesTotals = new CVarGetSL_SalesFollowUp_Detailed();
                        ObjCVarGetSL_InvoicesTotals.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mInvoiceDate = Convert.ToDateTime(dr["InvoiceDate"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mItemCode = Convert.ToString(dr["ItemCode"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        ObjCVarGetSL_InvoicesTotals.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());


                        lstCVarGetSL_SalesFollowUp_Detailed.Add(ObjCVarGetSL_InvoicesTotals);
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

        //private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        //{
        //    Exception Exp = null;
        //    TotRecs = 0;
        //    SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
        //    SqlCommand Com;
        //    SqlDataReader dr;
        //    lstCVarGetSL_SalesFollowUp_Detailed.Clear();

        //    try
        //    {
        //        Con.Open();
        //        tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
        //        Com = new SqlCommand();
        //        Com.CommandType = CommandType.StoredProcedure;
        //        Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
        //        Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
        //        Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
        //        Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
        //        Com.CommandText = "[dbo].GetListPagingGetSL_InvoicesTotals";
        //        Com.Parameters[0].Value = PageSize;
        //        Com.Parameters[1].Value = PageNumber;
        //        Com.Parameters[2].Value = WhereClause;
        //        Com.Parameters[3].Value = OrderBy;
        //        Com.Transaction = tr;
        //        Com.Connection = Con;
        //        dr = Com.ExecuteReader();
        //        try
        //        {
        //            while (dr.Read())
        //            {
        //                /*Start DataReader*/
        //                CVarGetSL_SalesFollowUp_Detailed ObjCVarGetSL_InvoicesTotals = new CVarGetSL_SalesFollowUp_Detailed();
        //                ObjCVarGetSL_InvoicesTotals.mClientName = Convert.ToString(dr["ClientName"].ToString());
        //                ObjCVarGetSL_InvoicesTotals.mTotalBeforTax = Convert.ToDecimal(dr["TotalBeforTax"].ToString());
        //                ObjCVarGetSL_InvoicesTotals.mTotalPrice = Convert.ToDecimal(dr["TotalPrice"].ToString());
        //                ObjCVarGetSL_InvoicesTotals.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
        //                ObjCVarGetSL_InvoicesTotals.mTaxesAmount = Convert.ToDecimal(dr["TaxesAmount"].ToString());
        //                ObjCVarGetSL_InvoicesTotals.mItemsAmount = Convert.ToDecimal(dr["ItemsAmount"].ToString());
        //                ObjCVarGetSL_InvoicesTotals.mServicesAmount = Convert.ToDecimal(dr["ServicesAmount"].ToString());
        //                ObjCVarGetSL_InvoicesTotals.mExpensesAmount = Convert.ToDecimal(dr["ExpensesAmount"].ToString());
        //                TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
        //                lstCVarGetSL_SalesFollowUp_Detailed.Add(ObjCVarGetSL_InvoicesTotals);
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            Exp = ex;
        //        }
        //        finally
        //        {
        //            if (dr != null)
        //            {
        //                dr.Close();
        //                dr.Dispose();
        //            }
        //        }
        //        tr.Commit();
        //    }
        //    catch (Exception ex)
        //    {
        //        Exp = ex;
        //    }
        //    finally
        //    {
        //        Con.Close();
        //        Con.Dispose();
        //    }
        //    return Exp;
        //}

        #endregion
    }




}
