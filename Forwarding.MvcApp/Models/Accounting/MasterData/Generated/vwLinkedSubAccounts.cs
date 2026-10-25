using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public class CPKvwLinkedSubAccounts
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
    public partial class CVarvwLinkedSubAccounts : CPKvwLinkedSubAccounts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal String mEnName;
        internal String mCode;
        internal Int32 mAccount_ID;
        internal Boolean mIsMain;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String EnName
        {
            get { return mEnName; }
            set { mEnName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mAccount_ID = value; }
        }
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsMain = value; }
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

    public partial class CvwLinkedSubAccounts
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
        public List<CVarvwLinkedSubAccounts> lstCVarvwLinkedSubAccounts = new List<CVarvwLinkedSubAccounts>();
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
            lstCVarvwLinkedSubAccounts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwLinkedSubAccounts";
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
                        CVarvwLinkedSubAccounts ObjCVarvwLinkedSubAccounts = new CVarvwLinkedSubAccounts();
                        ObjCVarvwLinkedSubAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLinkedSubAccounts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwLinkedSubAccounts.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwLinkedSubAccounts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLinkedSubAccounts.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwLinkedSubAccounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        lstCVarvwLinkedSubAccounts.Add(ObjCVarvwLinkedSubAccounts);
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
            lstCVarvwLinkedSubAccounts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwLinkedSubAccounts";
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
                        CVarvwLinkedSubAccounts ObjCVarvwLinkedSubAccounts = new CVarvwLinkedSubAccounts();
                        ObjCVarvwLinkedSubAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwLinkedSubAccounts.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwLinkedSubAccounts.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwLinkedSubAccounts.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwLinkedSubAccounts.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwLinkedSubAccounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwLinkedSubAccounts.Add(ObjCVarvwLinkedSubAccounts);
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
