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
    public class CPKvwStructure_Rep_A_BankJournalDetails
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwStructure_Rep_A_BankJournalDetails : CPKvwStructure_Rep_A_BankJournalDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mType;
        internal String mChequeNo;
        internal String mBank_Name;
        internal DateTime mChequeDate;
        internal Decimal mAmount;
        internal String mCurrency_Code;
        internal Boolean mInOut;
        internal String mChargedPerson;
        internal String mNotes;
        internal String mVoucherNo;
        #endregion

        #region "Methods"
        public String Type
        {
            get { return mType; }
            set { mType = value; }
        }
        public String ChequeNo
        {
            get { return mChequeNo; }
            set { mChequeNo = value; }
        }
        public String Bank_Name
        {
            get { return mBank_Name; }
            set { mBank_Name = value; }
        }
        public DateTime ChequeDate
        {
            get { return mChequeDate; }
            set { mChequeDate = value; }
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

    public partial class CvwStructure_Rep_A_BankJournalDetails
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
        public List<CVarvwStructure_Rep_A_BankJournalDetails> lstCVarvwStructure_Rep_A_BankJournalDetails = new List<CVarvwStructure_Rep_A_BankJournalDetails>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pBankIDs, DateTime pFromDate, DateTime pToDate, string pCurrency_ID, Int32 pCollected, Int32 pPosted, bool pShowRevaluateEntry)
        {
            return DataFill(pBankIDs, pFromDate, pToDate, pCurrency_ID, pCollected, pPosted, pShowRevaluateEntry, true);
        }
        private Exception DataFill(string pBankIDs, DateTime pFromDate, DateTime pToDate, string pCurrency_ID, Int32 pCollected, Int32 pPosted, bool pShowRevaluateEntry, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_Rep_A_BankJournalDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 400;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@BankIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@Currency_ID", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@Collected", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Posted", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@ShowRevaluateEntry", SqlDbType.Bit));
                    //Com.CommandText = "ERP_Web.[dbo].Rep_A_BankJournalDetails"; 
                    Com.CommandText = "[dbo].Rep_A_BankJournalDetails";
                    Com.Parameters[0].Value = pBankIDs;
                    Com.Parameters[1].Value = pFromDate;
                    Com.Parameters[2].Value = pToDate;
                    Com.Parameters[3].Value = pCurrency_ID;
                    Com.Parameters[4].Value = pCollected;
                    Com.Parameters[5].Value = pPosted;
                    Com.Parameters[6].Value = pShowRevaluateEntry;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_Rep_A_BankJournalDetails ObjCVarvwStructure_Rep_A_BankJournalDetails = new CVarvwStructure_Rep_A_BankJournalDetails();
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mType = Convert.ToString(dr["Type"].ToString());
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mChequeNo = Convert.ToString(dr["ChequeNo"].ToString());
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mBank_Name = Convert.ToString(dr["Bank_Name"].ToString());
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mChequeDate = dr["ChequeDate"].ToString() == "" ? DateTime.Parse("01/01/1900") : Convert.ToDateTime(dr["ChequeDate"].ToString());
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mAmount = dr["Amount"].ToString() == "" ? 0 : Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mCurrency_Code = Convert.ToString(dr["Currency_Code"].ToString());
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mInOut = dr["InOut"].ToString() == "" ? false : Convert.ToBoolean(dr["InOut"].ToString());
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mChargedPerson = Convert.ToString(dr["ChargedPerson"].ToString());
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwStructure_Rep_A_BankJournalDetails.mVoucherNo = Convert.ToString(dr["VoucherNo"].ToString());
                        lstCVarvwStructure_Rep_A_BankJournalDetails.Add(ObjCVarvwStructure_Rep_A_BankJournalDetails);
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
