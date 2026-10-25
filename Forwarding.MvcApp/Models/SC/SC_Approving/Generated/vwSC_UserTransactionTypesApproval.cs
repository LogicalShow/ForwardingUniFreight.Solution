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
    public class CPKvwSC_UserTransactionTypesApproval
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
    public partial class CVarvwSC_UserTransactionTypesApproval : CPKvwSC_UserTransactionTypesApproval
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mUserID;
        internal Int32 mTransactionTypeID;
        internal String mUsername;
        internal String mTransactionTypeName;
        internal String mTransactionTypeNameLocal;
        #endregion

        #region "Methods"
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public Int32 TransactionTypeID
        {
            get { return mTransactionTypeID; }
            set { mTransactionTypeID = value; }
        }
        public String Username
        {
            get { return mUsername; }
            set { mUsername = value; }
        }
        public String TransactionTypeName
        {
            get { return mTransactionTypeName; }
            set { mTransactionTypeName = value; }
        }
        public String TransactionTypeNameLocal
        {
            get { return mTransactionTypeNameLocal; }
            set { mTransactionTypeNameLocal = value; }
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

    public partial class CvwSC_UserTransactionTypesApproval
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
        public List<CVarvwSC_UserTransactionTypesApproval> lstCVarvwSC_UserTransactionTypesApproval = new List<CVarvwSC_UserTransactionTypesApproval>();
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
            lstCVarvwSC_UserTransactionTypesApproval.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSC_UserTransactionTypesApproval";
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
                        CVarvwSC_UserTransactionTypesApproval ObjCVarvwSC_UserTransactionTypesApproval = new CVarvwSC_UserTransactionTypesApproval();
                        ObjCVarvwSC_UserTransactionTypesApproval.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mTransactionTypeName = Convert.ToString(dr["TransactionTypeName"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mTransactionTypeNameLocal = Convert.ToString(dr["TransactionTypeNameLocal"].ToString());
                        lstCVarvwSC_UserTransactionTypesApproval.Add(ObjCVarvwSC_UserTransactionTypesApproval);
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
            lstCVarvwSC_UserTransactionTypesApproval.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSC_UserTransactionTypesApproval";
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
                        CVarvwSC_UserTransactionTypesApproval ObjCVarvwSC_UserTransactionTypesApproval = new CVarvwSC_UserTransactionTypesApproval();
                        ObjCVarvwSC_UserTransactionTypesApproval.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mTransactionTypeID = Convert.ToInt32(dr["TransactionTypeID"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mTransactionTypeName = Convert.ToString(dr["TransactionTypeName"].ToString());
                        ObjCVarvwSC_UserTransactionTypesApproval.mTransactionTypeNameLocal = Convert.ToString(dr["TransactionTypeNameLocal"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSC_UserTransactionTypesApproval.Add(ObjCVarvwSC_UserTransactionTypesApproval);
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
