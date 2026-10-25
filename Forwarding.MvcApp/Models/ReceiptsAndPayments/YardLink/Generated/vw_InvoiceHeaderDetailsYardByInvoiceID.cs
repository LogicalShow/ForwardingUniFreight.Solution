using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLink.Generated
{
    [Serializable]
    public partial class CVarvw_InvoiceHeaderDetailsYardByInvoiceID
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int32 mCurrencyID;
        internal DateTime mIssueDate;
        internal Decimal mAmount;
        internal Int32 mChargeTypeID;
        internal Int32 mMeasurementID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIssueDate = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public Int32 MeasurementID
        {
            get { return mMeasurementID; }
            set { mMeasurementID = value; }
        }
        #endregion
    }

    public partial class Cvw_InvoiceHeaderDetailsYardByInvoiceID
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
        public List<CVarvw_InvoiceHeaderDetailsYardByInvoiceID> lstCVarvw_InvoiceHeaderDetailsYardByInvoiceID = new List<CVarvw_InvoiceHeaderDetailsYardByInvoiceID>();
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
            lstCVarvw_InvoiceHeaderDetailsYardByInvoiceID.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvw_InvoiceHeaderDetailsYardByInvoiceID";
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
                        CVarvw_InvoiceHeaderDetailsYardByInvoiceID ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID = new CVarvw_InvoiceHeaderDetailsYardByInvoiceID();
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        lstCVarvw_InvoiceHeaderDetailsYardByInvoiceID.Add(ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID);
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
            lstCVarvw_InvoiceHeaderDetailsYardByInvoiceID.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvw_InvoiceHeaderDetailsYardByInvoiceID";
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
                        CVarvw_InvoiceHeaderDetailsYardByInvoiceID ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID = new CVarvw_InvoiceHeaderDetailsYardByInvoiceID();
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID.mMeasurementID = Convert.ToInt32(dr["MeasurementID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvw_InvoiceHeaderDetailsYardByInvoiceID.Add(ObjCVarvw_InvoiceHeaderDetailsYardByInvoiceID);
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
