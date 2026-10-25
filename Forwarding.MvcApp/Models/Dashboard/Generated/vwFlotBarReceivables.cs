using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Dashboard.Generated
{
    [Serializable]
    public class CPKvwFlotBarReceivables
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwFlotBarReceivables : CPKvwFlotBarReceivables
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCreationMonth;
        internal Int32 mCreationYear;
        internal Decimal mAmount;
        internal Int32 mCreatorUserID;
        #endregion

        #region "Methods"
        public Int32 CreationMonth
        {
            get { return mCreationMonth; }
            set { mCreationMonth = value; }
        }
        public Int32 CreationYear
        {
            get { return mCreationYear; }
            set { mCreationYear = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mAmount = value; }
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

    public partial class CvwFlotBarReceivables
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
        public List<CVarvwFlotBarReceivables> lstCVarvwFlotBarReceivables = new List<CVarvwFlotBarReceivables>();
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
            lstCVarvwFlotBarReceivables.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFlotBarReceivables";
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
                        CVarvwFlotBarReceivables ObjCVarvwFlotBarReceivables = new CVarvwFlotBarReceivables();
                        ObjCVarvwFlotBarReceivables.mCreationMonth = Convert.ToInt32(dr["CreationMonth"].ToString());
                        ObjCVarvwFlotBarReceivables.mCreationYear = Convert.ToInt32(dr["CreationYear"].ToString());
                        ObjCVarvwFlotBarReceivables.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwFlotBarReceivables.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        lstCVarvwFlotBarReceivables.Add(ObjCVarvwFlotBarReceivables);
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
            lstCVarvwFlotBarReceivables.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFlotBarReceivables";
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
                        CVarvwFlotBarReceivables ObjCVarvwFlotBarReceivables = new CVarvwFlotBarReceivables();
                        ObjCVarvwFlotBarReceivables.mCreationMonth = Convert.ToInt32(dr["CreationMonth"].ToString());
                        ObjCVarvwFlotBarReceivables.mCreationYear = Convert.ToInt32(dr["CreationYear"].ToString());
                        ObjCVarvwFlotBarReceivables.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwFlotBarReceivables.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFlotBarReceivables.Add(ObjCVarvwFlotBarReceivables);
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
