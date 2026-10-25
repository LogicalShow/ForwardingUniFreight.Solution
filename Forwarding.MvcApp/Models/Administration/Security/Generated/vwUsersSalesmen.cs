using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Security.Generated
{
    [Serializable]
    public class CPKvwUsersSalesmen
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
    public partial class CVarvwUsersSalesmen : CPKvwUsersSalesmen
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal String mUsername;
        internal String mHisSalesmenIDs;
        internal String mHisSalesmenNames;
        internal String mHisUsersIDs;
        internal String mHisUsersNames;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String Username
        {
            get { return mUsername; }
            set { mUsername = value; }
        }
        public String HisSalesmenIDs
        {
            get { return mHisSalesmenIDs; }
            set { mHisSalesmenIDs = value; }
        }
        public String HisSalesmenNames
        {
            get { return mHisSalesmenNames; }
            set { mHisSalesmenNames = value; }
        }
        public String HisUsersIDs
        {
            get { return mHisUsersIDs; }
            set { mHisUsersIDs = value; }
        }
        public String HisUsersNames
        {
            get { return mHisUsersNames; }
            set { mHisUsersNames = value; }
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

    public partial class CvwUsersSalesmen
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
        public List<CVarvwUsersSalesmen> lstCVarvwUsersSalesmen = new List<CVarvwUsersSalesmen>();
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
            lstCVarvwUsersSalesmen.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwUsersSalesmen";
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
                        CVarvwUsersSalesmen ObjCVarvwUsersSalesmen = new CVarvwUsersSalesmen();
                        ObjCVarvwUsersSalesmen.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwUsersSalesmen.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwUsersSalesmen.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwUsersSalesmen.mHisSalesmenIDs = Convert.ToString(dr["HisSalesmenIDs"].ToString());
                        ObjCVarvwUsersSalesmen.mHisSalesmenNames = Convert.ToString(dr["HisSalesmenNames"].ToString());
                        ObjCVarvwUsersSalesmen.mHisUsersIDs = Convert.ToString(dr["HisUsersIDs"].ToString());
                        ObjCVarvwUsersSalesmen.mHisUsersNames = Convert.ToString(dr["HisUsersNames"].ToString());
                        lstCVarvwUsersSalesmen.Add(ObjCVarvwUsersSalesmen);
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
            lstCVarvwUsersSalesmen.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwUsersSalesmen";
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
                        CVarvwUsersSalesmen ObjCVarvwUsersSalesmen = new CVarvwUsersSalesmen();
                        ObjCVarvwUsersSalesmen.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwUsersSalesmen.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwUsersSalesmen.mUsername = Convert.ToString(dr["Username"].ToString());
                        ObjCVarvwUsersSalesmen.mHisSalesmenIDs = Convert.ToString(dr["HisSalesmenIDs"].ToString());
                        ObjCVarvwUsersSalesmen.mHisSalesmenNames = Convert.ToString(dr["HisSalesmenNames"].ToString());
                        ObjCVarvwUsersSalesmen.mHisUsersIDs = Convert.ToString(dr["HisUsersIDs"].ToString());
                        ObjCVarvwUsersSalesmen.mHisUsersNames = Convert.ToString(dr["HisUsersNames"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwUsersSalesmen.Add(ObjCVarvwUsersSalesmen);
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
