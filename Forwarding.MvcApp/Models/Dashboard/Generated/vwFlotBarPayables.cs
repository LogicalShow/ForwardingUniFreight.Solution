using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Dashboard.Generated
{
    [Serializable]
    public class CPKvwFlotBarPayables
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwFlotBarPayables : CPKvwFlotBarPayables
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

    public partial class CvwFlotBarPayables
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
        public List<CVarvwFlotBarPayables> lstCVarvwFlotBarPayables = new List<CVarvwFlotBarPayables>();
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
            lstCVarvwFlotBarPayables.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFlotBarPayables";
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
                        CVarvwFlotBarPayables ObjCVarvwFlotBarPayables = new CVarvwFlotBarPayables();
                        ObjCVarvwFlotBarPayables.mCreationMonth = Convert.ToInt32(dr["CreationMonth"].ToString());
                        ObjCVarvwFlotBarPayables.mCreationYear = Convert.ToInt32(dr["CreationYear"].ToString());
                        ObjCVarvwFlotBarPayables.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwFlotBarPayables.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        lstCVarvwFlotBarPayables.Add(ObjCVarvwFlotBarPayables);
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
            lstCVarvwFlotBarPayables.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFlotBarPayables";
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
                        CVarvwFlotBarPayables ObjCVarvwFlotBarPayables = new CVarvwFlotBarPayables();
                        ObjCVarvwFlotBarPayables.mCreationMonth = Convert.ToInt32(dr["CreationMonth"].ToString());
                        ObjCVarvwFlotBarPayables.mCreationYear = Convert.ToInt32(dr["CreationYear"].ToString());
                        ObjCVarvwFlotBarPayables.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarvwFlotBarPayables.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFlotBarPayables.Add(ObjCVarvwFlotBarPayables);
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
