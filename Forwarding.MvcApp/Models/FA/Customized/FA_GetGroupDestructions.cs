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
    public class CPKFA_GetGroupDestructions
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarFA_GetGroupDestructions : CPKFA_GetGroupDestructions
    {
        #region "variables"
        //GD.ID AS GroupDestructionsID , G.SubAccountID , G.ID GroupID , GD.FromDate , GD.ToDate  , GD.Percentage
        internal Boolean mIsChanges = false;
        internal int mGroupDestructionID;
        internal int mSubAccountID;
        internal int mGroupID;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Decimal mPercentage;
        internal String mGroupName;
        internal Decimal mDayAmount;
        internal Decimal mMonthAmount;
        internal Decimal mYearAmount;
        #endregion

        #region "Methods"
        public int GroupDestructionID
        {
            get { return mGroupDestructionID; }
            set { mGroupDestructionID = value; }
        }
        public int SubAccountID
        {
            get { return mSubAccountID; }
            set { mSubAccountID = value; }
        }
        public int GroupID
        {
            get { return mGroupID; }
            set { mGroupID = value; }
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
        public String GroupName
        {
            get { return mGroupName; }
            set { mGroupName = value; }
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

    public partial class CFA_GetGroupDestructions
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
        public List<CVarFA_GetGroupDestructions> lstCVarFA_GetGroupDestructions = new List<CVarFA_GetGroupDestructions>();
        #endregion

        #region "Select Methods"
        public Exception GetList(int GroupID, int SubAccountID, int ParentSubAccountID)
        {
            return DataFill(GroupID, SubAccountID, ParentSubAccountID, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(int GroupID , int SubAccountID , int ParentSubAccountID,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarFA_GetGroupDestructions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@GroupID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@ParentSubAccountID", SqlDbType.Int));
                    Com.CommandText = "[dbo].FA_GetGroupDestructions";
                    Com.Parameters[0].Value = GroupID;
                    Com.Parameters[1].Value = SubAccountID;
                    Com.Parameters[2].Value = ParentSubAccountID;
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
                        CVarFA_GetGroupDestructions ObjCVarFA_GetGroupDestructions = new CVarFA_GetGroupDestructions();
                        ObjCVarFA_GetGroupDestructions.mGroupDestructionID = Convert.ToInt32(dr["GroupDestructionID"].ToString());
                        ObjCVarFA_GetGroupDestructions.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarFA_GetGroupDestructions.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarFA_GetGroupDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_GetGroupDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_GetGroupDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_GetGroupDestructions.mDayAmount = Convert.ToDecimal(dr["DayAmount"].ToString());
                        ObjCVarFA_GetGroupDestructions.mMonthAmount = Convert.ToDecimal(dr["MonthAmount"].ToString());
                        ObjCVarFA_GetGroupDestructions.mYearAmount = Convert.ToDecimal(dr["YearAmount"].ToString());
                        ObjCVarFA_GetGroupDestructions.mGroupName = Convert.ToString(dr["GroupName"].ToString());
                        lstCVarFA_GetGroupDestructions.Add(ObjCVarFA_GetGroupDestructions);
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
            lstCVarFA_GetGroupDestructions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_GetGroupDestructions";
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
                        CVarFA_GetGroupDestructions ObjCVarFA_GetGroupDestructions = new CVarFA_GetGroupDestructions();
                        ObjCVarFA_GetGroupDestructions.mGroupDestructionID = Convert.ToInt32(dr["GroupDestructionID"].ToString());
                        ObjCVarFA_GetGroupDestructions.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarFA_GetGroupDestructions.mGroupID = Convert.ToInt32(dr["GroupID"].ToString());
                        ObjCVarFA_GetGroupDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_GetGroupDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_GetGroupDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_GetGroupDestructions.mGroupName = Convert.ToString(dr["GroupName"].ToString());
                        ObjCVarFA_GetGroupDestructions.mDayAmount = Convert.ToDecimal(dr["DayAmount"].ToString());
                        ObjCVarFA_GetGroupDestructions.mMonthAmount = Convert.ToDecimal(dr["MonthAmount"].ToString());
                        ObjCVarFA_GetGroupDestructions.mYearAmount = Convert.ToDecimal(dr["YearAmount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_GetGroupDestructions.Add(ObjCVarFA_GetGroupDestructions);
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
