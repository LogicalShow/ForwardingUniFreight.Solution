using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.Transactions.Generated
{
    [Serializable]
    public partial class CVarvwSC_TransactionsTank
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mCode;
        internal DateTime mTransactionDate;
        internal String mNotes;
        internal String mTransType;
        internal String mCustomerName;
        internal Decimal mTotal;
        internal Boolean mIsConfirm;
        internal Boolean mIsDeleted;
        internal Int32 mTypeID;
        internal Int32 mClientID;
        internal String mTankNumber;
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
        public DateTime TransactionDate
        {
            get { return mTransactionDate; }
            set { mTransactionDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String TransType
        {
            get { return mTransType; }
            set { mTransType = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public Decimal Total
        {
            get { return mTotal; }
            set { mTotal = value; }
        }
        public Boolean IsConfirm
        {
            get { return mIsConfirm; }
            set { mIsConfirm = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Int32 TypeID
        {
            get { return mTypeID; }
            set { mTypeID = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public String TankNumber
        {
            get { return mTankNumber; }
            set { mTankNumber = value; }
        }
        #endregion
    }

    public partial class CvwSC_TransactionsTank
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
        public List<CVarvwSC_TransactionsTank> lstCVarvwSC_TransactionsTank = new List<CVarvwSC_TransactionsTank>();
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
            lstCVarvwSC_TransactionsTank.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSC_TransactionsTank";
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
                        CVarvwSC_TransactionsTank ObjCVarvwSC_TransactionsTank = new CVarvwSC_TransactionsTank();
                        ObjCVarvwSC_TransactionsTank.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_TransactionsTank.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwSC_TransactionsTank.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTransType = Convert.ToString(dr["TransType"].ToString());
                        ObjCVarvwSC_TransactionsTank.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwSC_TransactionsTank.mIsConfirm = Convert.ToBoolean(dr["IsConfirm"].ToString());
                        ObjCVarvwSC_TransactionsTank.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwSC_TransactionsTank.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTankNumber = Convert.ToString(dr["TankNumber"].ToString());
                        lstCVarvwSC_TransactionsTank.Add(ObjCVarvwSC_TransactionsTank);
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
            lstCVarvwSC_TransactionsTank.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSC_TransactionsTank";
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
                        CVarvwSC_TransactionsTank ObjCVarvwSC_TransactionsTank = new CVarvwSC_TransactionsTank();
                        ObjCVarvwSC_TransactionsTank.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_TransactionsTank.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTransactionDate = Convert.ToDateTime(dr["TransactionDate"].ToString());
                        ObjCVarvwSC_TransactionsTank.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTransType = Convert.ToString(dr["TransType"].ToString());
                        ObjCVarvwSC_TransactionsTank.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTotal = Convert.ToDecimal(dr["Total"].ToString());
                        ObjCVarvwSC_TransactionsTank.mIsConfirm = Convert.ToBoolean(dr["IsConfirm"].ToString());
                        ObjCVarvwSC_TransactionsTank.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTypeID = Convert.ToInt32(dr["TypeID"].ToString());
                        ObjCVarvwSC_TransactionsTank.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwSC_TransactionsTank.mTankNumber = Convert.ToString(dr["TankNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_TransactionsTank.Add(ObjCVarvwSC_TransactionsTank);
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
