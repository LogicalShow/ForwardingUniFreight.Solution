using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKvwPartnersBanks
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
    public partial class CVarvwPartnersBanks : CPKvwPartnersBanks
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mBankName;
        internal String mBranch;
        internal String mAccountName;
        internal String mAccountNumber;
        internal String mSwiftCode;
        internal Int32 mPartnerID;
        internal Int32 mPartnerTypeID;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        #endregion

        #region "Methods"
        public String BankName
        {
            get { return mBankName; }
            set { mBankName = value; }
        }
        public String Branch
        {
            get { return mBranch; }
            set { mBranch = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mAccountName = value; }
        }
        public String AccountNumber
        {
            get { return mAccountNumber; }
            set { mAccountNumber = value; }
        }
        public String SwiftCode
        {
            get { return mSwiftCode; }
            set { mSwiftCode = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mPartnerID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mPartnerTypeID = value; }
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

    public partial class CvwPartnersBanks
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
        public List<CVarvwPartnersBanks> lstCVarvwPartnersBanks = new List<CVarvwPartnersBanks>();
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
            lstCVarvwPartnersBanks.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPartnersBanks";
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
                        CVarvwPartnersBanks ObjCVarvwPartnersBanks = new CVarvwPartnersBanks();
                        ObjCVarvwPartnersBanks.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPartnersBanks.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwPartnersBanks.mBranch = Convert.ToString(dr["Branch"].ToString());
                        ObjCVarvwPartnersBanks.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwPartnersBanks.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarvwPartnersBanks.mSwiftCode = Convert.ToString(dr["SwiftCode"].ToString());
                        ObjCVarvwPartnersBanks.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwPartnersBanks.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwPartnersBanks.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPartnersBanks.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        lstCVarvwPartnersBanks.Add(ObjCVarvwPartnersBanks);
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
            lstCVarvwPartnersBanks.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPartnersBanks";
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
                        CVarvwPartnersBanks ObjCVarvwPartnersBanks = new CVarvwPartnersBanks();
                        ObjCVarvwPartnersBanks.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPartnersBanks.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarvwPartnersBanks.mBranch = Convert.ToString(dr["Branch"].ToString());
                        ObjCVarvwPartnersBanks.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarvwPartnersBanks.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarvwPartnersBanks.mSwiftCode = Convert.ToString(dr["SwiftCode"].ToString());
                        ObjCVarvwPartnersBanks.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwPartnersBanks.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwPartnersBanks.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwPartnersBanks.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPartnersBanks.Add(ObjCVarvwPartnersBanks);
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
