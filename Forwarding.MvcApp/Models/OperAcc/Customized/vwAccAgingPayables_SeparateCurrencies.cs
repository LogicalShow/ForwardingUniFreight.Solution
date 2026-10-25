using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
//Com.CommandTimeout = 2000;
namespace Forwarding.MvcApp.Models.OperAcc.Generated
{
    [Serializable]
    public partial class CVarvwAccAgingPayables_SeparateCurrencies
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTransactionType;
        internal Int32 mPartnerID;
        internal Int32 mPartnerTypeID;
        internal String mPartnerName;
        internal String mPartnerTypeCode;
        internal String mLate_USD;
        internal String mLate_EUR;
        internal String mLate_GBP;
        internal String mLate_AED;
        internal String mLate_SAR;
        internal String mLate_EGP;
        internal String mZeroTo30_USD;
        internal String mZeroTo30_EUR;
        internal String mZeroTo30_GBP;
        internal String mZeroTo30_AED;
        internal String mZeroTo30_SAR;
        internal String mZeroTo30_EGP;
        internal String mThirtyOneTo60_USD;
        internal String mThirtyOneTo60_EUR;
        internal String mThirtyOneTo60_GBP;
        internal String mThirtyOneTo60_AED;
        internal String mThirtyOneTo60_SAR;
        internal String mThirtyOneTo60_EGP;
        internal String mSixtyOneTo90_USD;
        internal String mSixtyOneTo90_EUR;
        internal String mSixtyOneTo90_GBP;
        internal String mSixtyOneTo90_AED;
        internal String mSixtyOneTo90_SAR;
        internal String mSixtyOneTo90_EGP;
        #endregion

        #region "Methods"
        public Int32 TransactionType
        {
            get { return mTransactionType; }
            set { mTransactionType = value; }
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
        public String PartnerName
        {
            get { return mPartnerName; }
            set { mPartnerName = value; }
        }
        public String PartnerTypeCode
        {
            get { return mPartnerTypeCode; }
            set { mPartnerTypeCode = value; }
        }
        public String Late_USD
        {
            get { return mLate_USD; }
            set { mLate_USD = value; }
        }
        public String Late_EUR
        {
            get { return mLate_EUR; }
            set { mLate_EUR = value; }
        }
        public String Late_GBP
        {
            get { return mLate_GBP; }
            set { mLate_GBP = value; }
        }
        public String Late_AED
        {
            get { return mLate_AED; }
            set { mLate_AED = value; }
        }
        public String Late_SAR
        {
            get { return mLate_SAR; }
            set { mLate_SAR = value; }
        }
        public String Late_EGP
        {
            get { return mLate_EGP; }
            set { mLate_EGP = value; }
        }
        public String ZeroTo30_USD
        {
            get { return mZeroTo30_USD; }
            set { mZeroTo30_USD = value; }
        }
        public String ZeroTo30_EUR
        {
            get { return mZeroTo30_EUR; }
            set { mZeroTo30_EUR = value; }
        }
        public String ZeroTo30_GBP
        {
            get { return mZeroTo30_GBP; }
            set { mZeroTo30_GBP = value; }
        }
        public String ZeroTo30_AED
        {
            get { return mZeroTo30_AED; }
            set { mZeroTo30_AED = value; }
        }
        public String ZeroTo30_SAR
        {
            get { return mZeroTo30_SAR; }
            set { mZeroTo30_SAR = value; }
        }
        public String ZeroTo30_EGP
        {
            get { return mZeroTo30_EGP; }
            set { mZeroTo30_EGP = value; }
        }
        public String ThirtyOneTo60_USD
        {
            get { return mThirtyOneTo60_USD; }
            set { mThirtyOneTo60_USD = value; }
        }
        public String ThirtyOneTo60_EUR
        {
            get { return mThirtyOneTo60_EUR; }
            set { mThirtyOneTo60_EUR = value; }
        }
        public String ThirtyOneTo60_GBP
        {
            get { return mThirtyOneTo60_GBP; }
            set { mThirtyOneTo60_GBP = value; }
        }
        public String ThirtyOneTo60_AED
        {
            get { return mThirtyOneTo60_AED; }
            set { mThirtyOneTo60_AED = value; }
        }
        public String ThirtyOneTo60_SAR
        {
            get { return mThirtyOneTo60_SAR; }
            set { mThirtyOneTo60_SAR = value; }
        }
        public String ThirtyOneTo60_EGP
        {
            get { return mThirtyOneTo60_EGP; }
            set { mThirtyOneTo60_EGP = value; }
        }
        public String SixtyOneTo90_USD
        {
            get { return mSixtyOneTo90_USD; }
            set { mSixtyOneTo90_USD = value; }
        }
        public String SixtyOneTo90_EUR
        {
            get { return mSixtyOneTo90_EUR; }
            set { mSixtyOneTo90_EUR = value; }
        }
        public String SixtyOneTo90_GBP
        {
            get { return mSixtyOneTo90_GBP; }
            set { mSixtyOneTo90_GBP = value; }
        }
        public String SixtyOneTo90_AED
        {
            get { return mSixtyOneTo90_AED; }
            set { mSixtyOneTo90_AED = value; }
        }
        public String SixtyOneTo90_SAR
        {
            get { return mSixtyOneTo90_SAR; }
            set { mSixtyOneTo90_SAR = value; }
        }
        public String SixtyOneTo90_EGP
        {
            get { return mSixtyOneTo90_EGP; }
            set { mSixtyOneTo90_EGP = value; }
        }
        #endregion
    }

    public partial class CvwAccAgingPayables_SeparateCurrencies
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
        public List<CVarvwAccAgingPayables_SeparateCurrencies> lstCVarvwAccAgingPayables_SeparateCurrencies = new List<CVarvwAccAgingPayables_SeparateCurrencies>();
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
            lstCVarvwAccAgingPayables_SeparateCurrencies.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwAccAgingPayables_SeparateCurrencies";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwAccAgingPayables_SeparateCurrencies ObjCVarvwAccAgingPayables_SeparateCurrencies = new CVarvwAccAgingPayables_SeparateCurrencies();
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_USD = Convert.ToString(dr["Late_USD"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_EUR = Convert.ToString(dr["Late_EUR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_GBP = Convert.ToString(dr["Late_GBP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_AED = Convert.ToString(dr["Late_AED"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_SAR = Convert.ToString(dr["Late_SAR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_EGP = Convert.ToString(dr["Late_EGP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_USD = Convert.ToString(dr["ZeroTo30_USD"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_EUR = Convert.ToString(dr["ZeroTo30_EUR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_GBP = Convert.ToString(dr["ZeroTo30_GBP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_AED = Convert.ToString(dr["ZeroTo30_AED"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_SAR = Convert.ToString(dr["ZeroTo30_SAR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_EGP = Convert.ToString(dr["ZeroTo30_EGP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_USD = Convert.ToString(dr["ThirtyOneTo60_USD"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_EUR = Convert.ToString(dr["ThirtyOneTo60_EUR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_GBP = Convert.ToString(dr["ThirtyOneTo60_GBP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_AED = Convert.ToString(dr["ThirtyOneTo60_AED"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_SAR = Convert.ToString(dr["ThirtyOneTo60_SAR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_EGP = Convert.ToString(dr["ThirtyOneTo60_EGP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_USD = Convert.ToString(dr["SixtyOneTo90_USD"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_EUR = Convert.ToString(dr["SixtyOneTo90_EUR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_GBP = Convert.ToString(dr["SixtyOneTo90_GBP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_AED = Convert.ToString(dr["SixtyOneTo90_AED"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_SAR = Convert.ToString(dr["SixtyOneTo90_SAR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_EGP = Convert.ToString(dr["SixtyOneTo90_EGP"].ToString());
                        lstCVarvwAccAgingPayables_SeparateCurrencies.Add(ObjCVarvwAccAgingPayables_SeparateCurrencies);
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
            lstCVarvwAccAgingPayables_SeparateCurrencies.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAccAgingPayables_SeparateCurrencies";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwAccAgingPayables_SeparateCurrencies ObjCVarvwAccAgingPayables_SeparateCurrencies = new CVarvwAccAgingPayables_SeparateCurrencies();
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mTransactionType = Convert.ToInt32(dr["TransactionType"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mPartnerName = Convert.ToString(dr["PartnerName"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mPartnerTypeCode = Convert.ToString(dr["PartnerTypeCode"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_USD = Convert.ToString(dr["Late_USD"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_EUR = Convert.ToString(dr["Late_EUR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_GBP = Convert.ToString(dr["Late_GBP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_AED = Convert.ToString(dr["Late_AED"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_SAR = Convert.ToString(dr["Late_SAR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mLate_EGP = Convert.ToString(dr["Late_EGP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_USD = Convert.ToString(dr["ZeroTo30_USD"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_EUR = Convert.ToString(dr["ZeroTo30_EUR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_GBP = Convert.ToString(dr["ZeroTo30_GBP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_AED = Convert.ToString(dr["ZeroTo30_AED"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_SAR = Convert.ToString(dr["ZeroTo30_SAR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mZeroTo30_EGP = Convert.ToString(dr["ZeroTo30_EGP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_USD = Convert.ToString(dr["ThirtyOneTo60_USD"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_EUR = Convert.ToString(dr["ThirtyOneTo60_EUR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_GBP = Convert.ToString(dr["ThirtyOneTo60_GBP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_AED = Convert.ToString(dr["ThirtyOneTo60_AED"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_SAR = Convert.ToString(dr["ThirtyOneTo60_SAR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mThirtyOneTo60_EGP = Convert.ToString(dr["ThirtyOneTo60_EGP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_USD = Convert.ToString(dr["SixtyOneTo90_USD"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_EUR = Convert.ToString(dr["SixtyOneTo90_EUR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_GBP = Convert.ToString(dr["SixtyOneTo90_GBP"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_AED = Convert.ToString(dr["SixtyOneTo90_AED"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_SAR = Convert.ToString(dr["SixtyOneTo90_SAR"].ToString());
                        ObjCVarvwAccAgingPayables_SeparateCurrencies.mSixtyOneTo90_EGP = Convert.ToString(dr["SixtyOneTo90_EGP"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAccAgingPayables_SeparateCurrencies.Add(ObjCVarvwAccAgingPayables_SeparateCurrencies);
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
