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
    public class CPKvwSL_LinkingInvoiceTypeJournal_Payment
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
    public partial class CVarvwSL_LinkingInvoiceTypeJournal_Payment : CPKvwSL_LinkingInvoiceTypeJournal_Payment
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mInvoiceTypeID;
        internal String mInvoiceTypeName;
        internal Int32 mJournalTypeID;
        internal String mJournalTypeName;
        internal Int32 mJVTypeID;
        internal String mJVTypeName;
        internal Int32 mAccountID;
        internal String mAccountName;
        internal Int32 mSubAccountID;
        internal String mSubAccountName;
        #endregion

        #region "Methods"
        public Int32 InvoiceTypeID
        {
            get { return mInvoiceTypeID; }
            set { mInvoiceTypeID = value; }
        }
        public String InvoiceTypeName
        {
            get { return mInvoiceTypeName; }
            set { mInvoiceTypeName = value; }
        }
        public Int32 JournalTypeID
        {
            get { return mJournalTypeID; }
            set { mJournalTypeID = value; }
        }
        public String JournalTypeName
        {
            get { return mJournalTypeName; }
            set { mJournalTypeName = value; }
        }
        public Int32 JVTypeID
        {
            get { return mJVTypeID; }
            set { mJVTypeID = value; }
        }
        public String JVTypeName
        {
            get { return mJVTypeName; }
            set { mJVTypeName = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public String SubAccountName
        {
            get { return mSubAccountName; }
            set { mSubAccountName = value; }
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

    public partial class CvwSL_LinkingInvoiceTypeJournal_Payment
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
        public List<CVarvwSL_LinkingInvoiceTypeJournal_Payment> lstCVarvwSL_LinkingInvoiceTypeJournal_Payment = new List<CVarvwSL_LinkingInvoiceTypeJournal_Payment>();
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
            lstCVarvwSL_LinkingInvoiceTypeJournal_Payment.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_LinkingInvoiceTypeJournal_Payment";
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
                        CVarvwSL_LinkingInvoiceTypeJournal_Payment ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment = new CVarvwSL_LinkingInvoiceTypeJournal_Payment();
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mJournalTypeID = Convert.ToInt32(dr["JournalTypeID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mJournalTypeName = Convert.ToString(dr["JournalTypeName"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mJVTypeID = Convert.ToInt32(dr["JVTypeID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mJVTypeName = Convert.ToString(dr["JVTypeName"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        lstCVarvwSL_LinkingInvoiceTypeJournal_Payment.Add(ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment);
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
            lstCVarvwSL_LinkingInvoiceTypeJournal_Payment.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_LinkingInvoiceTypeJournal_Payment";
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
                        CVarvwSL_LinkingInvoiceTypeJournal_Payment ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment = new CVarvwSL_LinkingInvoiceTypeJournal_Payment();
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mInvoiceTypeID = Convert.ToInt32(dr["InvoiceTypeID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mInvoiceTypeName = Convert.ToString(dr["InvoiceTypeName"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mJournalTypeID = Convert.ToInt32(dr["JournalTypeID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mJournalTypeName = Convert.ToString(dr["JournalTypeName"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mJVTypeID = Convert.ToInt32(dr["JVTypeID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mJVTypeName = Convert.ToString(dr["JVTypeName"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment.mSubAccountName = Convert.ToString(dr["SubAccountName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_LinkingInvoiceTypeJournal_Payment.Add(ObjCVarvwSL_LinkingInvoiceTypeJournal_Payment);
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
