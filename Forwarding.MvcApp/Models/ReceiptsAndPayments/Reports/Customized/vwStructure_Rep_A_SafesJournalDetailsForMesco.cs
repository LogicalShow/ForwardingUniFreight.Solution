using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Reports.Customized
{
    [Serializable]
    public class CPKvwStructure_Rep_A_SafesJournalDetailsForMesco
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwStructure_Rep_A_SafesJournalDetailsForMesco : CPKvwStructure_Rep_A_SafesJournalDetailsForMesco
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal string mSystemName;
        internal String mType;
        internal String mSafe_Name;
        internal DateTime mVoucherDate;
        internal Decimal mAmount;
        internal String mCurrency_Code;
        internal Boolean mInOut;
        internal String mChargedPerson;
        internal String mNotes;
        internal String mVoucherNo;
        internal String mPO;
        internal String mInvoiceNo;
        #endregion

        #region "Methods"
        public String Type
        {
            get { return mType; }
            set { mType = value; }
        }
        public String SystemName
        {
            get { return mSystemName; }
            set { mSystemName = value; }
        }
        public String Safe_Name
        {
            get { return mSafe_Name; }
            set { mSafe_Name = value; }
        }
        public DateTime VoucherDate
        {
            get { return mVoucherDate; }
            set { mVoucherDate = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
        }
        public String Currency_Code
        {
            get { return mCurrency_Code; }
            set { mCurrency_Code = value; }
        }
        public Boolean InOut
        {
            get { return mInOut; }
            set { mInOut = value; }
        }
        public String ChargedPerson
        {
            get { return mChargedPerson; }
            set { mChargedPerson = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String VoucherNo
        {
            get { return mVoucherNo; }
            set { mVoucherNo = value; }
        }
        public String PO
        {
            get { return mPO; }
            set { mPO = value; }
        }
        public String InvoiceNo
        {
            get { return mInvoiceNo; }
            set { mInvoiceNo = value; }
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

    public partial class CvwStructure_Rep_A_SafesJournalDetailsForMesco
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
        public List<CVarvwStructure_Rep_A_SafesJournalDetailsForMesco> lstCVarvwStructure_Rep_A_SafesJournalDetailsForMesco = new List<CVarvwStructure_Rep_A_SafesJournalDetailsForMesco>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pSafeIDs, DateTime pFromDate, DateTime pToDate, string pCurrency_ID, Int32 pPosted, bool pShowRevaluateEntry)
        {
            return DataFill(pSafeIDs, pFromDate, pToDate, pCurrency_ID, pPosted, pShowRevaluateEntry, true);
        }
        private Exception DataFill(string pSafeIDs, DateTime pFromDate, DateTime pToDate, string pCurrency_ID, Int32 pPosted, bool pShowRevaluateEntry, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandTimeout = 400;
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@SafeIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@Currency_ID", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Posted", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@ShowRevaluateEntry", SqlDbType.Bit));
                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_SafesJournalDetails"; 
                    Com.CommandText = "[dbo].Rep_A_SafesJournalDetailsForMesco";
                    Com.Parameters[0].Value = pSafeIDs;
                    Com.Parameters[1].Value = pFromDate;
                    Com.Parameters[2].Value = pToDate;
                    Com.Parameters[3].Value = pCurrency_ID;
                    Com.Parameters[4].Value = pPosted;
                    Com.Parameters[5].Value = pShowRevaluateEntry;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_SafesJournalDetailsForMesco ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco = new CVarvwStructure_Rep_A_SafesJournalDetailsForMesco();
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mSystemName = Convert.ToString(dr["SystemName"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mSafe_Name = Convert.ToString(dr["Safe_Name"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mVoucherDate = Convert.ToDateTime(dr["VoucherDate"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mAmount = dr["Amount"].ToString() == "" ? 0 : Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mInOut = Convert.ToBoolean(dr["InOut"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mChargedPerson = Convert.ToString(dr["ChargedPerson"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mVoucherNo = Convert.ToString(dr["VoucherNo"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mPO = Convert.ToString(dr["PO"].ToString());
                        ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.mInvoiceNo = Convert.ToString(dr["InvoiceNo"].ToString());
                        lstCVarvwStructure_Rep_A_SafesJournalDetailsForMesco.Add(ObjCVarvwStructure_Rep_A_SafesJournalDetailsForMesco);
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
