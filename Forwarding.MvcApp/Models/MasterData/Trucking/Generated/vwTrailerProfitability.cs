using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Trucking.Generated
{
    [Serializable]
    public class CPKvwTrailerProfitability
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwTrailerProfitability : CPKvwTrailerProfitability
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTrailerID;
        internal String mTrailerName;
        internal Int32 mChargeTypeID;
        internal String mChargeTypeName;
        internal Decimal mPayables;
        internal Decimal mReceivables;
        internal Int32 mCurrencyID;
        internal String mCurrencyCode;
        internal Decimal mExchangeRate;
        internal Int64 mOperationID;
        internal Int64 mMasterOperationID;
        internal String mOperationCode;
        internal DateTime mIssueDate;
        internal Boolean mIsDeleted;
        internal String mGateInPortName;
        internal String mGateOutPortName;
        internal Int32 mDriverID;
        internal String mDriverName;
        internal Int32 mDriverAssistantID;
        internal String mDriverAssistantName;
        #endregion

        #region "Methods"
        public Int32 TrailerID
        {
            get { return mTrailerID; }
            set { mTrailerID = value; }
        }
        public String TrailerName
        {
            get { return mTrailerName; }
            set { mTrailerName = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        public String ChargeTypeName
        {
            get { return mChargeTypeName; }
            set { mChargeTypeName = value; }
        }
        public Decimal Payables
        {
            get { return mPayables; }
            set { mPayables = value; }
        }
        public Decimal Receivables
        {
            get { return mReceivables; }
            set { mReceivables = value; }
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
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int64 MasterOperationID
        {
            get { return mMasterOperationID; }
            set { mMasterOperationID = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public DateTime IssueDate
        {
            get { return mIssueDate; }
            set { mIssueDate = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public String GateInPortName
        {
            get { return mGateInPortName; }
            set { mGateInPortName = value; }
        }
        public String GateOutPortName
        {
            get { return mGateOutPortName; }
            set { mGateOutPortName = value; }
        }
        public Int32 DriverID
        {
            get { return mDriverID; }
            set { mDriverID = value; }
        }
        public String DriverName
        {
            get { return mDriverName; }
            set { mDriverName = value; }
        }
        public Int32 DriverAssistantID
        {
            get { return mDriverAssistantID; }
            set { mDriverAssistantID = value; }
        }
        public String DriverAssistantName
        {
            get { return mDriverAssistantName; }
            set { mDriverAssistantName = value; }
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

    public partial class CvwTrailerProfitability
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
        public List<CVarvwTrailerProfitability> lstCVarvwTrailerProfitability = new List<CVarvwTrailerProfitability>();
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
            lstCVarvwTrailerProfitability.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwTrailerProfitability";
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
                        CVarvwTrailerProfitability ObjCVarvwTrailerProfitability = new CVarvwTrailerProfitability();
                        ObjCVarvwTrailerProfitability.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwTrailerProfitability.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwTrailerProfitability.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwTrailerProfitability.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwTrailerProfitability.mPayables = Convert.ToDecimal(dr["Payables"].ToString());
                        ObjCVarvwTrailerProfitability.mReceivables = Convert.ToDecimal(dr["Receivables"].ToString());
                        ObjCVarvwTrailerProfitability.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwTrailerProfitability.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwTrailerProfitability.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwTrailerProfitability.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwTrailerProfitability.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwTrailerProfitability.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwTrailerProfitability.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwTrailerProfitability.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwTrailerProfitability.mGateInPortName = Convert.ToString(dr["GateInPortName"].ToString());
                        ObjCVarvwTrailerProfitability.mGateOutPortName = Convert.ToString(dr["GateOutPortName"].ToString());
                        ObjCVarvwTrailerProfitability.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarvwTrailerProfitability.mDriverName = Convert.ToString(dr["DriverName"].ToString());
                        ObjCVarvwTrailerProfitability.mDriverAssistantID = Convert.ToInt32(dr["DriverAssistantID"].ToString());
                        ObjCVarvwTrailerProfitability.mDriverAssistantName = Convert.ToString(dr["DriverAssistantName"].ToString());
                        lstCVarvwTrailerProfitability.Add(ObjCVarvwTrailerProfitability);
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
            lstCVarvwTrailerProfitability.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwTrailerProfitability";
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
                        CVarvwTrailerProfitability ObjCVarvwTrailerProfitability = new CVarvwTrailerProfitability();
                        ObjCVarvwTrailerProfitability.mTrailerID = Convert.ToInt32(dr["TrailerID"].ToString());
                        ObjCVarvwTrailerProfitability.mTrailerName = Convert.ToString(dr["TrailerName"].ToString());
                        ObjCVarvwTrailerProfitability.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarvwTrailerProfitability.mChargeTypeName = Convert.ToString(dr["ChargeTypeName"].ToString());
                        ObjCVarvwTrailerProfitability.mPayables = Convert.ToDecimal(dr["Payables"].ToString());
                        ObjCVarvwTrailerProfitability.mReceivables = Convert.ToDecimal(dr["Receivables"].ToString());
                        ObjCVarvwTrailerProfitability.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarvwTrailerProfitability.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarvwTrailerProfitability.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarvwTrailerProfitability.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwTrailerProfitability.mMasterOperationID = Convert.ToInt64(dr["MasterOperationID"].ToString());
                        ObjCVarvwTrailerProfitability.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwTrailerProfitability.mIssueDate = Convert.ToDateTime(dr["IssueDate"].ToString());
                        ObjCVarvwTrailerProfitability.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwTrailerProfitability.mGateInPortName = Convert.ToString(dr["GateInPortName"].ToString());
                        ObjCVarvwTrailerProfitability.mGateOutPortName = Convert.ToString(dr["GateOutPortName"].ToString());
                        ObjCVarvwTrailerProfitability.mDriverID = Convert.ToInt32(dr["DriverID"].ToString());
                        ObjCVarvwTrailerProfitability.mDriverName = Convert.ToString(dr["DriverName"].ToString());
                        ObjCVarvwTrailerProfitability.mDriverAssistantID = Convert.ToInt32(dr["DriverAssistantID"].ToString());
                        ObjCVarvwTrailerProfitability.mDriverAssistantName = Convert.ToString(dr["DriverAssistantName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwTrailerProfitability.Add(ObjCVarvwTrailerProfitability);
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
