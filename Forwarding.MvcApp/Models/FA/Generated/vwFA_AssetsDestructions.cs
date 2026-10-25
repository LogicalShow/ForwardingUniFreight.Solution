using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.FA.Generated
{
    [Serializable]
    public partial class CVarvwFA_AssetsDestructions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Decimal mDayAmount;
        internal Decimal mMonthAmount;
        internal Decimal mYearAmount;
        internal Int32 mGroupDestructionID;
        internal Int32 mAssetsID;
        internal Decimal mPercentage;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Int32 mDaysCount;
        internal decimal mMonthsCount;
        internal decimal mYearsCount;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Decimal DayAmount
        {
            get { return mDayAmount; }
            set { mDayAmount = value; }
        }
        public Decimal MonthAmount
        {
            get { return mMonthAmount; }
            set { mMonthAmount = value; }
        }
        public Decimal YearAmount
        {
            get { return mYearAmount; }
            set { mYearAmount = value; }
        }
        public Int32 GroupDestructionID
        {
            get { return mGroupDestructionID; }
            set { mGroupDestructionID = value; }
        }
        public Int32 AssetsID
        {
            get { return mAssetsID; }
            set { mAssetsID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
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
        public Int32 DaysCount
        {
            get { return mDaysCount; }
            set { mDaysCount = value; }
        }
        public decimal MonthsCount
        {
            get { return mMonthsCount; }
            set { mMonthsCount = value; }
        }
        public decimal YearsCount
        {
            get { return mYearsCount; }
            set { mYearsCount = value; }
        }
        #endregion
    }

    public partial class CvwFA_AssetsDestructions
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
        public List<CVarvwFA_AssetsDestructions> lstCVarvwFA_AssetsDestructions = new List<CVarvwFA_AssetsDestructions>();
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
            lstCVarvwFA_AssetsDestructions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwFA_AssetsDestructions";
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
                        CVarvwFA_AssetsDestructions ObjCVarvwFA_AssetsDestructions = new CVarvwFA_AssetsDestructions();
                        ObjCVarvwFA_AssetsDestructions.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mDayAmount = Convert.ToDecimal(dr["DayAmount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mMonthAmount = Convert.ToDecimal(dr["MonthAmount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mYearAmount = Convert.ToDecimal(dr["YearAmount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mGroupDestructionID = Convert.ToInt32(dr["GroupDestructionID"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mAssetsID = Convert.ToInt32(dr["AssetsID"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mDaysCount = Convert.ToInt32(dr["DaysCount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mMonthsCount = Convert.ToDecimal(dr["MonthsCount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mYearsCount = Convert.ToDecimal(dr["YearsCount"].ToString());
                        lstCVarvwFA_AssetsDestructions.Add(ObjCVarvwFA_AssetsDestructions);
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
            lstCVarvwFA_AssetsDestructions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwFA_AssetsDestructions";
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
                        CVarvwFA_AssetsDestructions ObjCVarvwFA_AssetsDestructions = new CVarvwFA_AssetsDestructions();
                        ObjCVarvwFA_AssetsDestructions.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mDayAmount = Convert.ToDecimal(dr["DayAmount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mMonthAmount = Convert.ToDecimal(dr["MonthAmount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mYearAmount = Convert.ToDecimal(dr["YearAmount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mGroupDestructionID = Convert.ToInt32(dr["GroupDestructionID"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mAssetsID = Convert.ToInt32(dr["AssetsID"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mDaysCount = Convert.ToInt32(dr["DaysCount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mMonthsCount = Convert.ToDecimal(dr["MonthsCount"].ToString());
                        ObjCVarvwFA_AssetsDestructions.mYearsCount = Convert.ToDecimal(dr["YearsCount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwFA_AssetsDestructions.Add(ObjCVarvwFA_AssetsDestructions);
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
