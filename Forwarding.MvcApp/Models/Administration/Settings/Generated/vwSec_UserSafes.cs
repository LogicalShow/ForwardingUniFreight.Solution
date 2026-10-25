using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Settings.Generated
{
    [Serializable]
    public partial class CVarvwSec_UserSafes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mID;
        internal Int32 mUserID;
        internal Int32 mSafeID;
        internal String mUsername;
        internal String mSafename;
        #endregion

        #region "Methods"
        public Decimal ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public Int32 SafeID
        {
            get { return mSafeID; }
            set { mSafeID = value; }
        }
        public String Username
        {
            get { return mUsername; }
            set { mUsername = value; }
        }
        public String Safename
        {
            get { return mSafename; }
            set { mSafename = value; }
        }
        #endregion
    }

    public partial class CvwSec_UserSafes
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
        public List<CVarvwSec_UserSafes> lstCVarvwSec_UserSafes = new List<CVarvwSec_UserSafes>();
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
            lstCVarvwSec_UserSafes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSec_UserSafes";
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
                        CVarvwSec_UserSafes ObjCVarvwSec_UserSafes = new CVarvwSec_UserSafes();
                        ObjCVarvwSec_UserSafes.mID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarvwSec_UserSafes.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwSec_UserSafes.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwSec_UserSafes.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwSec_UserSafes.mSafename = Convert.ToString(dr["Safename"].ToString());
                        lstCVarvwSec_UserSafes.Add(ObjCVarvwSec_UserSafes);
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
            lstCVarvwSec_UserSafes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSec_UserSafes";
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
                        CVarvwSec_UserSafes ObjCVarvwSec_UserSafes = new CVarvwSec_UserSafes();
                        ObjCVarvwSec_UserSafes.mID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarvwSec_UserSafes.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwSec_UserSafes.mSafeID = Convert.ToInt32(dr["SafeID"].ToString());
                        ObjCVarvwSec_UserSafes.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwSec_UserSafes.mSafename = Convert.ToString(dr["Safename"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSec_UserSafes.Add(ObjCVarvwSec_UserSafes);
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
