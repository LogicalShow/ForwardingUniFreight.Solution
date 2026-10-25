using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated
{
    [Serializable]
    public partial class CVarvwSec_User_DAS_Link
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mUserID;
        internal Int32 mUserDasID;
        internal String mUserName;
        internal String mDasUserName;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mUserID = value; }
        }
        public Int32 UserDasID
        {
            get { return mUserDasID; }
            set { mUserDasID = value; }
        }
        public String UserName
        {
            get { return mUserName; }
            set { mUserName = value; }
        }
        public String DasUserName
        {
            get { return mDasUserName; }
            set { mDasUserName = value; }
        }
        #endregion
    }

    public partial class CvwSec_User_DAS_Link
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
        public List<CVarvwSec_User_DAS_Link> lstCVarvwSec_User_DAS_Link = new List<CVarvwSec_User_DAS_Link>();
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
            lstCVarvwSec_User_DAS_Link.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSec_User_DAS_Link";
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
                        CVarvwSec_User_DAS_Link ObjCVarvwSec_User_DAS_Link = new CVarvwSec_User_DAS_Link();
                        ObjCVarvwSec_User_DAS_Link.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSec_User_DAS_Link.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwSec_User_DAS_Link.mUserDasID = Convert.ToInt32(dr["UserDasID"].ToString());
                        ObjCVarvwSec_User_DAS_Link.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarvwSec_User_DAS_Link.mDasUserName = Convert.ToString(dr["DasUserName"].ToString());
                        lstCVarvwSec_User_DAS_Link.Add(ObjCVarvwSec_User_DAS_Link);
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
            lstCVarvwSec_User_DAS_Link.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSec_User_DAS_LinkEGL";
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
                        CVarvwSec_User_DAS_Link ObjCVarvwSec_User_DAS_Link = new CVarvwSec_User_DAS_Link();
                        ObjCVarvwSec_User_DAS_Link.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSec_User_DAS_Link.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarvwSec_User_DAS_Link.mUserDasID = Convert.ToInt32(dr["UserDasID"].ToString());
                        ObjCVarvwSec_User_DAS_Link.mUserName = Convert.ToString(dr["UserName"].ToString());
                        ObjCVarvwSec_User_DAS_Link.mDasUserName = Convert.ToString(dr["DasUserName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSec_User_DAS_Link.Add(ObjCVarvwSec_User_DAS_Link);
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
