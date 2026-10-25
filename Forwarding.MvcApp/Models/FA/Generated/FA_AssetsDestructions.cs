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
    public class CPKFA_AssetsDestructions
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
    public partial class CVarFA_AssetsDestructions : CPKFA_AssetsDestructions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mDayAmount;
        internal Decimal mMonthAmount;
        internal Decimal mYearAmount;
        internal Int32 mGroupDestructionID;
        internal Int32 mAssetsID;
        internal Decimal mPercentage;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        #endregion

        #region "Methods"
        public Decimal DayAmount
        {
            get { return mDayAmount; }
            set { mIsChanges = true; mDayAmount = value; }
        }
        public Decimal MonthAmount
        {
            get { return mMonthAmount; }
            set { mIsChanges = true; mMonthAmount = value; }
        }
        public Decimal YearAmount
        {
            get { return mYearAmount; }
            set { mIsChanges = true; mYearAmount = value; }
        }
        public Int32 GroupDestructionID
        {
            get { return mGroupDestructionID; }
            set { mIsChanges = true; mGroupDestructionID = value; }
        }
        public Int32 AssetsID
        {
            get { return mAssetsID; }
            set { mIsChanges = true; mAssetsID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mIsChanges = true; mPercentage = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mIsChanges = true; mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mIsChanges = true; mToDate = value; }
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

    public partial class CFA_AssetsDestructions
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
        public List<CVarFA_AssetsDestructions> lstCVarFA_AssetsDestructions = new List<CVarFA_AssetsDestructions>();
        public List<CPKFA_AssetsDestructions> lstDeletedCPKFA_AssetsDestructions = new List<CPKFA_AssetsDestructions>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarFA_AssetsDestructions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_AssetsDestructions";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFA_AssetsDestructions";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarFA_AssetsDestructions ObjCVarFA_AssetsDestructions = new CVarFA_AssetsDestructions();
                        ObjCVarFA_AssetsDestructions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsDestructions.mDayAmount = Convert.ToDecimal(dr["DayAmount"].ToString());
                        ObjCVarFA_AssetsDestructions.mMonthAmount = Convert.ToDecimal(dr["MonthAmount"].ToString());
                        ObjCVarFA_AssetsDestructions.mYearAmount = Convert.ToDecimal(dr["YearAmount"].ToString());
                        ObjCVarFA_AssetsDestructions.mGroupDestructionID = Convert.ToInt32(dr["GroupDestructionID"].ToString());
                        ObjCVarFA_AssetsDestructions.mAssetsID = Convert.ToInt32(dr["AssetsID"].ToString());
                        ObjCVarFA_AssetsDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_AssetsDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_AssetsDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        lstCVarFA_AssetsDestructions.Add(ObjCVarFA_AssetsDestructions);
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
            lstCVarFA_AssetsDestructions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_AssetsDestructions";
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
                        CVarFA_AssetsDestructions ObjCVarFA_AssetsDestructions = new CVarFA_AssetsDestructions();
                        ObjCVarFA_AssetsDestructions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsDestructions.mDayAmount = Convert.ToDecimal(dr["DayAmount"].ToString());
                        ObjCVarFA_AssetsDestructions.mMonthAmount = Convert.ToDecimal(dr["MonthAmount"].ToString());
                        ObjCVarFA_AssetsDestructions.mYearAmount = Convert.ToDecimal(dr["YearAmount"].ToString());
                        ObjCVarFA_AssetsDestructions.mGroupDestructionID = Convert.ToInt32(dr["GroupDestructionID"].ToString());
                        ObjCVarFA_AssetsDestructions.mAssetsID = Convert.ToInt32(dr["AssetsID"].ToString());
                        ObjCVarFA_AssetsDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_AssetsDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_AssetsDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_AssetsDestructions.Add(ObjCVarFA_AssetsDestructions);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListFA_AssetsDestructions";
                else
                    Com.CommandText = "[dbo].UpdateListFA_AssetsDestructions";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKFA_AssetsDestructions> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFA_AssetsDestructions";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFA_AssetsDestructions ObjCPKFA_AssetsDestructions in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFA_AssetsDestructions.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarFA_AssetsDestructions> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@DayAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@MonthAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@YearAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@GroupDestructionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AssetsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Percentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFA_AssetsDestructions ObjCVarFA_AssetsDestructions in SaveList)
                {
                    if (ObjCVarFA_AssetsDestructions.mIsChanges == true)
                    {
                        if (ObjCVarFA_AssetsDestructions.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFA_AssetsDestructions";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFA_AssetsDestructions.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFA_AssetsDestructions";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFA_AssetsDestructions.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFA_AssetsDestructions.ID;
                        }
                        Com.Parameters["@DayAmount"].Value = ObjCVarFA_AssetsDestructions.DayAmount;
                        Com.Parameters["@MonthAmount"].Value = ObjCVarFA_AssetsDestructions.MonthAmount;
                        Com.Parameters["@YearAmount"].Value = ObjCVarFA_AssetsDestructions.YearAmount;
                        Com.Parameters["@GroupDestructionID"].Value = ObjCVarFA_AssetsDestructions.GroupDestructionID;
                        Com.Parameters["@AssetsID"].Value = ObjCVarFA_AssetsDestructions.AssetsID;
                        Com.Parameters["@Percentage"].Value = ObjCVarFA_AssetsDestructions.Percentage;
                        Com.Parameters["@FromDate"].Value = ObjCVarFA_AssetsDestructions.FromDate;
                        Com.Parameters["@ToDate"].Value = ObjCVarFA_AssetsDestructions.ToDate;
                        EndTrans(Com, Con);
                        if (ObjCVarFA_AssetsDestructions.ID == 0)
                        {
                            ObjCVarFA_AssetsDestructions.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFA_AssetsDestructions.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }





}
