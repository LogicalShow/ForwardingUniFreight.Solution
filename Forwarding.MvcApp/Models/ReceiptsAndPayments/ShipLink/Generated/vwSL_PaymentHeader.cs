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
    public partial class CVarvwSL_PaymentHeader
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal Int64 mReceiptNumber;
        internal Int64 mInvoiceHeaderID;
        internal DateTime mIssueDate;
        internal Int32 mSecurityUserID;
        internal Boolean mIsDeleted;
        internal Boolean mCanUpdate;
        internal String mRemarks;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int64 ReceiptNumber
        {
            get { return mReceiptNumber; }
            set { mReceiptNumber = value; }
        }
        public Int64 InvoiceHeaderID
        {
            get { return mInvoiceHeaderID; }
            set { mInvoiceHeaderID = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIssueDate = value; }
        }
        public Int32 SecurityUserID
        {
            get { return mSecurityUserID; }
            set { mSecurityUserID = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Boolean CanUpdate
        {
            get { return mCanUpdate; }
            set { mCanUpdate = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        #endregion
    }

    public partial class CvwSL_PaymentHeader
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
        public List<CVarvwSL_PaymentHeader> lstCVarvwSL_PaymentHeader = new List<CVarvwSL_PaymentHeader>();
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
            lstCVarvwSL_PaymentHeader.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_PaymentHeader";
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
                        CVarvwSL_PaymentHeader ObjCVarvwSL_PaymentHeader = new CVarvwSL_PaymentHeader();
                        ObjCVarvwSL_PaymentHeader.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_PaymentHeader.mReceiptNumber = Convert.ToInt64(dr["ReceiptNumber"].ToString());
                        ObjCVarvwSL_PaymentHeader.mInvoiceHeaderID = Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        ObjCVarvwSL_PaymentHeader.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwSL_PaymentHeader.mSecurityUserID = Convert.ToInt32(dr["SecurityUserID"].ToString());
                        ObjCVarvwSL_PaymentHeader.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_PaymentHeader.mCanUpdate = Convert.ToBoolean(dr["CanUpdate"].ToString());
                        ObjCVarvwSL_PaymentHeader.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        lstCVarvwSL_PaymentHeader.Add(ObjCVarvwSL_PaymentHeader);
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
            lstCVarvwSL_PaymentHeader.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_PaymentHeader";
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
                        CVarvwSL_PaymentHeader ObjCVarvwSL_PaymentHeader = new CVarvwSL_PaymentHeader();
                        ObjCVarvwSL_PaymentHeader.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwSL_PaymentHeader.mReceiptNumber = Convert.ToInt64(dr["ReceiptNumber"].ToString());
                        ObjCVarvwSL_PaymentHeader.mInvoiceHeaderID = Convert.ToInt64(dr["InvoiceHeaderID"].ToString());
                        ObjCVarvwSL_PaymentHeader.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwSL_PaymentHeader.mSecurityUserID = Convert.ToInt32(dr["SecurityUserID"].ToString());
                        ObjCVarvwSL_PaymentHeader.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSL_PaymentHeader.mCanUpdate = Convert.ToBoolean(dr["CanUpdate"].ToString());
                        ObjCVarvwSL_PaymentHeader.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_PaymentHeader.Add(ObjCVarvwSL_PaymentHeader);
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
