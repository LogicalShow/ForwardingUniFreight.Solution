using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CRM.vwCRM_SalesMenTarget.Generated
{
    [Serializable]
    public partial class CVarvwCRM_SalesMenTarget
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mSalesRepID;
        internal Int32 mActionTypeID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModifatorUserID;
        internal DateTime mModificationDate;
        internal String mWeekendDays;
        internal Int32 mVacationsCount;
        internal String mNotes;
        internal String mActionName;
        internal String mSalesmanName;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Int32 mSalesMenTargetDetailsID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 SalesRepID
        {
            get { return mSalesRepID; }
            set { mSalesRepID = value; }
        }
        public Int32 ActionTypeID
        {
            get { return mActionTypeID; }
            set { mActionTypeID = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModifatorUserID
        {
            get { return mModifatorUserID; }
            set { mModifatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public String WeekendDays
        {
            get { return mWeekendDays; }
            set { mWeekendDays = value; }
        }
        public Int32 VacationsCount
        {
            get { return mVacationsCount; }
            set { mVacationsCount = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public String ActionName
        {
            get { return mActionName; }
            set { mActionName = value; }
        }
        public String SalesmanName
        {
            get { return mSalesmanName; }
            set { mSalesmanName = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mToDate = value; }
        }
        public Int32 SalesMenTargetDetailsID
        {
            get { return mSalesMenTargetDetailsID; }
            set { mSalesMenTargetDetailsID = value; }
        }
        #endregion
    }

    public partial class CvwCRM_SalesMenTarget
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
        public List<CVarvwCRM_SalesMenTarget> lstCVarvwCRM_SalesMenTarget = new List<CVarvwCRM_SalesMenTarget>();
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
            lstCVarvwCRM_SalesMenTarget.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCRM_SalesMenTarget";
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
                        CVarvwCRM_SalesMenTarget ObjCVarvwCRM_SalesMenTarget = new CVarvwCRM_SalesMenTarget();
                        ObjCVarvwCRM_SalesMenTarget.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mSalesRepID = Convert.ToInt32(dr["SalesRepID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mActionTypeID = Convert.ToInt32(dr["ActionTypeID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mModifatorUserID = Convert.ToInt32(dr["ModifatorUserID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mWeekendDays = Convert.ToString(dr["WeekendDays"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mVacationsCount = Convert.ToInt32(dr["VacationsCount"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mActionName = Convert.ToString(dr["ActionName"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mSalesmanName = Convert.ToString(dr["SalesmanName"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mSalesMenTargetDetailsID = Convert.ToInt32(dr["SalesMenTargetDetailsID"].ToString());
                        lstCVarvwCRM_SalesMenTarget.Add(ObjCVarvwCRM_SalesMenTarget);
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
            lstCVarvwCRM_SalesMenTarget.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCRM_SalesMenTarget";
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
                        CVarvwCRM_SalesMenTarget ObjCVarvwCRM_SalesMenTarget = new CVarvwCRM_SalesMenTarget();
                        ObjCVarvwCRM_SalesMenTarget.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mSalesRepID = Convert.ToInt32(dr["SalesRepID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mActionTypeID = Convert.ToInt32(dr["ActionTypeID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mModifatorUserID = Convert.ToInt32(dr["ModifatorUserID"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mWeekendDays = Convert.ToString(dr["WeekendDays"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mVacationsCount = Convert.ToInt32(dr["VacationsCount"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mActionName = Convert.ToString(dr["ActionName"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mSalesmanName = Convert.ToString(dr["SalesmanName"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwCRM_SalesMenTarget.mSalesMenTargetDetailsID = Convert.ToInt32(dr["SalesMenTargetDetailsID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCRM_SalesMenTarget.Add(ObjCVarvwCRM_SalesMenTarget);
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







