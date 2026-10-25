using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Dashboard.Generated
{
    [Serializable]
    public class CPKvwFlotLine
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwFlotLine : CPKvwFlotLine
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mOperationMonth;
        internal Int32 mOperationYear;
        internal Int32 mOperationsCount;
        internal Int32 mCreatorUserID;
        #endregion

        #region "Methods"
        public Int32 OperationMonth
        {
            get { return mOperationMonth; }
            set { mOperationMonth = value; }
        }
        public Int32 OperationYear
        {
            get { return mOperationYear; }
            set { mOperationYear = value; }
        }
        public Int32 OperationsCount
        {
            get { return mOperationsCount; }
            set { mOperationsCount = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
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

    public partial class CvwFlotLine
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
        public List<CVarvwFlotLine> lstCVarvwFlotLine = new List<CVarvwFlotLine>();
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
            lstCVarvwFlotLine.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFlotLine";
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
                        CVarvwFlotLine ObjCVarvwFlotLine = new CVarvwFlotLine();
                        ObjCVarvwFlotLine.mOperationMonth = Convert.ToInt32(dr["OperationMonth"].ToString());
                        ObjCVarvwFlotLine.mOperationYear = Convert.ToInt32(dr["OperationYear"].ToString());
                        ObjCVarvwFlotLine.mOperationsCount = Convert.ToInt32(dr["OperationsCount"].ToString());
                        ObjCVarvwFlotLine.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        lstCVarvwFlotLine.Add(ObjCVarvwFlotLine);
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
            lstCVarvwFlotLine.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFlotLine";
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
                        CVarvwFlotLine ObjCVarvwFlotLine = new CVarvwFlotLine();
                        ObjCVarvwFlotLine.mOperationMonth = Convert.ToInt32(dr["OperationMonth"].ToString());
                        ObjCVarvwFlotLine.mOperationYear = Convert.ToInt32(dr["OperationYear"].ToString());
                        ObjCVarvwFlotLine.mOperationsCount = Convert.ToInt32(dr["OperationsCount"].ToString());
                        ObjCVarvwFlotLine.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFlotLine.Add(ObjCVarvwFlotLine);
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
