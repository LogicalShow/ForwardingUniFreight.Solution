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
    public class CPKFA_GetAssetDestructions
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarFA_GetAssetDestructions : CPKFA_GetAssetDestructions
    {
        #region "variables"
        //GD.ID AS GroupDestructionsID , G.SubAccountID , G.ID GroupID , GD.FromDate , GD.ToDate  , GD.Percentage
        internal Boolean mIsChanges = false;
        internal int mGroupDestructionID;
      //  internal int mSubAccountID;
       // internal int mGroupID;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Decimal mPercentage;
      //  internal String mGroupName;
        internal Decimal mDayAmount;
        internal Decimal mMonthAmount;
        internal Decimal mYearAmount;
        internal int mAssetsID;
        internal int mID;
        internal int mDaysCount;
        internal decimal mMonthsCount;
        internal decimal mYearsCount;
        #endregion

        #region "Methods"
        public int GroupDestructionID
        {
            get { return mGroupDestructionID; }
            set { mGroupDestructionID = value; }
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
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
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
            set { mYearAmount  = value; }
        }
        public int AssetsID
        {
            get { return mAssetsID; }
            set { mAssetsID = value; }
        }
        public int ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public int DaysCount
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

    public partial class CFA_GetAssetDestructions
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
        public List<CVarFA_GetAssetDestructions> lstCVarFA_GetAssetDestructions = new List<CVarFA_GetAssetDestructions>();
        #endregion

        #region "Select Methods"

      //  @ID int , @LastAmount DECIMAL(18,4) , @Percentage DECIMAL(18,4) , @StartDepreciateDate datetime
        public Exception GetList(int ID, decimal LastAmount, decimal Percentage , DateTime StartDepreciateDate , bool IsFromHistory)
        {
            return DataFill(ID, LastAmount, Percentage, StartDepreciateDate , IsFromHistory , true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(int ID, decimal LastAmount, decimal Percentage, DateTime StartDepreciateDate , bool IsFromHistory,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarFA_GetAssetDestructions.Clear();

            try
            {

                //@ID int , @LastAmount DECIMAL(18,4) , @Percentage DECIMAL(18,4) , @StartDepreciateDate datetime
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@LastAmount", SqlDbType.Decimal));
                    Com.Parameters.Add(new SqlParameter("@Percentage", SqlDbType.Decimal));
                    Com.Parameters.Add(new SqlParameter("@StartDepreciateDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@IsFromHistory", SqlDbType.Bit));

                    Com.CommandText = "[dbo].FA_GetAssetDestructions";
                    Com.Parameters[0].Value = ID;
                    Com.Parameters[1].Value = LastAmount;
                    Com.Parameters[2].Value = Percentage;
                    Com.Parameters[3].Value = StartDepreciateDate;
                    Com.Parameters[4].Value = IsFromHistory;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                      //  SELECT GD.ID AS GroupDestructionsID , G.SubAccountID , G.ID GroupID, GD.FromDate , GD.ToDate  , GD.Percentage , G.Name GroupName
                        CVarFA_GetAssetDestructions ObjCVarFA_GetAssetDestructions = new CVarFA_GetAssetDestructions();
                        ObjCVarFA_GetAssetDestructions.mGroupDestructionID = Convert.ToInt32(dr["GroupDestructionID"].ToString());
                        ObjCVarFA_GetAssetDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_GetAssetDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_GetAssetDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_GetAssetDestructions.mDayAmount = Convert.ToDecimal(dr["DayAmount"].ToString());
                        ObjCVarFA_GetAssetDestructions.mMonthAmount = Convert.ToDecimal(dr["MonthAmount"].ToString());
                        ObjCVarFA_GetAssetDestructions.mYearAmount = Convert.ToDecimal(dr["YearAmount"].ToString());

                        ObjCVarFA_GetAssetDestructions.mAssetsID = Convert.ToInt32(dr["AssetsID"].ToString());
                        ObjCVarFA_GetAssetDestructions.mID = Convert.ToInt32(dr["ID"].ToString());

                        ObjCVarFA_GetAssetDestructions.mDaysCount = Convert.ToInt32(dr["DaysCount"].ToString());
                        ObjCVarFA_GetAssetDestructions.mMonthsCount = Convert.ToDecimal(dr["MonthsCount"].ToString());
                        ObjCVarFA_GetAssetDestructions.mYearsCount = Convert.ToDecimal(dr["YearsCount"].ToString());


                        lstCVarFA_GetAssetDestructions.Add(ObjCVarFA_GetAssetDestructions);
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
            lstCVarFA_GetAssetDestructions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_GetAssetDestructions";
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
                        CVarFA_GetAssetDestructions ObjCVarFA_GetAssetDestructions = new CVarFA_GetAssetDestructions();
                        ObjCVarFA_GetAssetDestructions.mGroupDestructionID = Convert.ToInt32(dr["GroupDestructionID"].ToString());
                        ObjCVarFA_GetAssetDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_GetAssetDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_GetAssetDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_GetAssetDestructions.mDayAmount = Convert.ToInt32(dr["DayAmount"].ToString());
                        ObjCVarFA_GetAssetDestructions.mMonthAmount = Convert.ToDecimal(dr["MonthAmount"].ToString());
                        ObjCVarFA_GetAssetDestructions.mYearAmount = Convert.ToDecimal(dr["YearAmount"].ToString());

                        ObjCVarFA_GetAssetDestructions.mAssetsID = Convert.ToInt32(dr["AssetsID"].ToString());
                        ObjCVarFA_GetAssetDestructions.mID = Convert.ToInt32(dr["ID"].ToString());

                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_GetAssetDestructions.Add(ObjCVarFA_GetAssetDestructions);
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
