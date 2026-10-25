using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.LoadingAndDischarging.Generated
{
    [Serializable]
    public class CPKLoadingAndDischargingHeaderWorkersDetails
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
    public partial class CVarLoadingAndDischargingHeaderWorkersDetails : CPKLoadingAndDischargingHeaderWorkersDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mHeaderWorkerID;
        internal DateTime mDate;
        internal Decimal mCount;
        internal Decimal mAmount;
        internal Int32 mPeriodID;
        #endregion

        #region "Methods"
        public Int32 HeaderWorkerID
        {
            get { return mHeaderWorkerID; }
            set { mIsChanges = true; mHeaderWorkerID = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mIsChanges = true; mDate = value; }
        }
        public Decimal Count
        {
            get { return mCount; }
            set { mIsChanges = true; mCount = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public Int32 PeriodID
        {
            get { return mPeriodID; }
            set { mIsChanges = true; mPeriodID = value; }
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

    public partial class CLoadingAndDischargingHeaderWorkersDetails
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
        public List<CVarLoadingAndDischargingHeaderWorkersDetails> lstCVarLoadingAndDischargingHeaderWorkersDetails = new List<CVarLoadingAndDischargingHeaderWorkersDetails>();
        public List<CPKLoadingAndDischargingHeaderWorkersDetails> lstDeletedCPKLoadingAndDischargingHeaderWorkersDetails = new List<CPKLoadingAndDischargingHeaderWorkersDetails>();
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
            lstCVarLoadingAndDischargingHeaderWorkersDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLoadingAndDischargingHeaderWorkersDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLoadingAndDischargingHeaderWorkersDetails";
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
                        CVarLoadingAndDischargingHeaderWorkersDetails ObjCVarLoadingAndDischargingHeaderWorkersDetails = new CVarLoadingAndDischargingHeaderWorkersDetails();
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mHeaderWorkerID = Convert.ToInt32(dr["HeaderWorkerID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mCount = Convert.ToDecimal(dr["Count"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mPeriodID = Convert.ToInt32(dr["PeriodID"].ToString());
                        lstCVarLoadingAndDischargingHeaderWorkersDetails.Add(ObjCVarLoadingAndDischargingHeaderWorkersDetails);
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
            lstCVarLoadingAndDischargingHeaderWorkersDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLoadingAndDischargingHeaderWorkersDetails";
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
                        CVarLoadingAndDischargingHeaderWorkersDetails ObjCVarLoadingAndDischargingHeaderWorkersDetails = new CVarLoadingAndDischargingHeaderWorkersDetails();
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mHeaderWorkerID = Convert.ToInt32(dr["HeaderWorkerID"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mCount = Convert.ToDecimal(dr["Count"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mPeriodID = Convert.ToInt32(dr["PeriodID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLoadingAndDischargingHeaderWorkersDetails.Add(ObjCVarLoadingAndDischargingHeaderWorkersDetails);
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
                    Com.CommandText = "[dbo].DeleteListLoadingAndDischargingHeaderWorkersDetails";
                else
                    Com.CommandText = "[dbo].UpdateListLoadingAndDischargingHeaderWorkersDetails";
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
        public Exception DeleteItem(List<CPKLoadingAndDischargingHeaderWorkersDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLoadingAndDischargingHeaderWorkersDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLoadingAndDischargingHeaderWorkersDetails ObjCPKLoadingAndDischargingHeaderWorkersDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLoadingAndDischargingHeaderWorkersDetails.ID);
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
        public Exception SaveMethod(List<CVarLoadingAndDischargingHeaderWorkersDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@HeaderWorkerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Count", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PeriodID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLoadingAndDischargingHeaderWorkersDetails ObjCVarLoadingAndDischargingHeaderWorkersDetails in SaveList)
                {
                    if (ObjCVarLoadingAndDischargingHeaderWorkersDetails.mIsChanges == true)
                    {
                        if (ObjCVarLoadingAndDischargingHeaderWorkersDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLoadingAndDischargingHeaderWorkersDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLoadingAndDischargingHeaderWorkersDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLoadingAndDischargingHeaderWorkersDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaderWorkersDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLoadingAndDischargingHeaderWorkersDetails.ID;
                        }
                        Com.Parameters["@HeaderWorkerID"].Value = ObjCVarLoadingAndDischargingHeaderWorkersDetails.HeaderWorkerID;
                        Com.Parameters["@Date"].Value = ObjCVarLoadingAndDischargingHeaderWorkersDetails.Date;
                        Com.Parameters["@Count"].Value = ObjCVarLoadingAndDischargingHeaderWorkersDetails.Count;
                        Com.Parameters["@Amount"].Value = ObjCVarLoadingAndDischargingHeaderWorkersDetails.Amount;
                        Com.Parameters["@PeriodID"].Value = ObjCVarLoadingAndDischargingHeaderWorkersDetails.PeriodID;
                        EndTrans(Com, Con);
                        if (ObjCVarLoadingAndDischargingHeaderWorkersDetails.ID == 0)
                        {
                            ObjCVarLoadingAndDischargingHeaderWorkersDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLoadingAndDischargingHeaderWorkersDetails.mIsChanges = false;
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
