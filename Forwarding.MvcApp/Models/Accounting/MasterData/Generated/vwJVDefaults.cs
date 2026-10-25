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
    public partial class CVarvwJVDefaults
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mJournalTypeName;
        internal String mJVTypeName;
        internal Int32 mID;
        internal String mTransTypeName;
        internal Int32 mJournalTypeID;
        internal Int32 mJVTypeID;
        #endregion

        #region "Methods"
        public String JournalTypeName
        {
            get { return mJournalTypeName; }
            set { mJournalTypeName = value; }
        }
        public String JVTypeName
        {
            get { return mJVTypeName; }
            set { mJVTypeName = value; }
        }
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String TransTypeName
        {
            get { return mTransTypeName; }
            set { mTransTypeName = value; }
        }
        public Int32 JournalTypeID
        {
            get { return mJournalTypeID; }
            set { mJournalTypeID = value; }
        }
        public Int32 JVTypeID
        {
            get { return mJVTypeID; }
            set { mJVTypeID = value; }
        }
        #endregion
    }

    public partial class CvwJVDefaults
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
        public List<CVarvwJVDefaults> lstCVarvwJVDefaults = new List<CVarvwJVDefaults>();
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
            lstCVarvwJVDefaults.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwJVDefaults";
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
                        CVarvwJVDefaults ObjCVarvwJVDefaults = new CVarvwJVDefaults();
                        ObjCVarvwJVDefaults.mJournalTypeName = Convert.ToString(dr["JournalTypeName"].ToString());
                        ObjCVarvwJVDefaults.mJVTypeName = Convert.ToString(dr["JVTypeName"].ToString());
                        ObjCVarvwJVDefaults.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwJVDefaults.mTransTypeName = Convert.ToString(dr["TransTypeName"].ToString());
                        ObjCVarvwJVDefaults.mJournalTypeID = Convert.ToInt32(dr["JournalTypeID"].ToString());
                        ObjCVarvwJVDefaults.mJVTypeID = Convert.ToInt32(dr["JVTypeID"].ToString());
                        lstCVarvwJVDefaults.Add(ObjCVarvwJVDefaults);
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
            lstCVarvwJVDefaults.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwJVDefaults";
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
                        CVarvwJVDefaults ObjCVarvwJVDefaults = new CVarvwJVDefaults();
                        ObjCVarvwJVDefaults.mJournalTypeName = Convert.ToString(dr["JournalTypeName"].ToString());
                        ObjCVarvwJVDefaults.mJVTypeName = Convert.ToString(dr["JVTypeName"].ToString());
                        ObjCVarvwJVDefaults.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwJVDefaults.mTransTypeName = Convert.ToString(dr["TransTypeName"].ToString());
                        ObjCVarvwJVDefaults.mJournalTypeID = Convert.ToInt32(dr["JournalTypeID"].ToString());
                        ObjCVarvwJVDefaults.mJVTypeID = Convert.ToInt32(dr["JVTypeID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwJVDefaults.Add(ObjCVarvwJVDefaults);
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
