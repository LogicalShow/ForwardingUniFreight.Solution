using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.Transactions.Generated
{
    [Serializable]
    public class CPKA_Fiscal_Year
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
    public partial class CVarA_Fiscal_Year : CPKA_Fiscal_Year
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mFiscal_Year_Name;
        internal Int32 mUser_ID;
        internal Boolean mConfirmed;
        internal Boolean mClosed;
        internal Int64 mProfitLossClosingJVID;
        internal Int64 mBalanceSheetClosingJVID;
        internal Int64 mBalanceSheetOpeningJVID;
        #endregion

        #region "Methods"
        public String Fiscal_Year_Name
        {
            get { return mFiscal_Year_Name; }
            set { mIsChanges = true; mFiscal_Year_Name = value; }
        }
        public Int32 User_ID
        {
            get { return mUser_ID; }
            set { mIsChanges = true; mUser_ID = value; }
        }
        public Boolean Confirmed
        {
            get { return mConfirmed; }
            set { mIsChanges = true; mConfirmed = value; }
        }
        public Boolean Closed
        {
            get { return mClosed; }
            set { mIsChanges = true; mClosed = value; }
        }
        public Int64 ProfitLossClosingJVID
        {
            get { return mProfitLossClosingJVID; }
            set { mIsChanges = true; mProfitLossClosingJVID = value; }
        }
        public Int64 BalanceSheetClosingJVID
        {
            get { return mBalanceSheetClosingJVID; }
            set { mIsChanges = true; mBalanceSheetClosingJVID = value; }
        }
        public Int64 BalanceSheetOpeningJVID
        {
            get { return mBalanceSheetOpeningJVID; }
            set { mIsChanges = true; mBalanceSheetOpeningJVID = value; }
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

    public partial class CA_Fiscal_Year
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
        public List<CVarA_Fiscal_Year> lstCVarA_Fiscal_Year = new List<CVarA_Fiscal_Year>();
        public List<CPKA_Fiscal_Year> lstDeletedCPKA_Fiscal_Year = new List<CPKA_Fiscal_Year>();
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
            lstCVarA_Fiscal_Year.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_Fiscal_Year";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_Fiscal_Year";
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
                        CVarA_Fiscal_Year ObjCVarA_Fiscal_Year = new CVarA_Fiscal_Year();
                        ObjCVarA_Fiscal_Year.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_Fiscal_Year.mFiscal_Year_Name = Convert.ToString(dr["Fiscal_Year_Name"].ToString());
                        ObjCVarA_Fiscal_Year.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarA_Fiscal_Year.mConfirmed = Convert.ToBoolean(dr["Confirmed"].ToString());
                        ObjCVarA_Fiscal_Year.mClosed = Convert.ToBoolean(dr["Closed"].ToString());
                        ObjCVarA_Fiscal_Year.mProfitLossClosingJVID = Convert.ToInt64(dr["ProfitLossClosingJVID"].ToString());
                        ObjCVarA_Fiscal_Year.mBalanceSheetClosingJVID = Convert.ToInt64(dr["BalanceSheetClosingJVID"].ToString());
                        ObjCVarA_Fiscal_Year.mBalanceSheetOpeningJVID = Convert.ToInt64(dr["BalanceSheetOpeningJVID"].ToString());
                        lstCVarA_Fiscal_Year.Add(ObjCVarA_Fiscal_Year);
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
            lstCVarA_Fiscal_Year.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_Fiscal_Year";
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
                        CVarA_Fiscal_Year ObjCVarA_Fiscal_Year = new CVarA_Fiscal_Year();
                        ObjCVarA_Fiscal_Year.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_Fiscal_Year.mFiscal_Year_Name = Convert.ToString(dr["Fiscal_Year_Name"].ToString());
                        ObjCVarA_Fiscal_Year.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarA_Fiscal_Year.mConfirmed = Convert.ToBoolean(dr["Confirmed"].ToString());
                        ObjCVarA_Fiscal_Year.mClosed = Convert.ToBoolean(dr["Closed"].ToString());
                        ObjCVarA_Fiscal_Year.mProfitLossClosingJVID = Convert.ToInt64(dr["ProfitLossClosingJVID"].ToString());
                        ObjCVarA_Fiscal_Year.mBalanceSheetClosingJVID = Convert.ToInt64(dr["BalanceSheetClosingJVID"].ToString());
                        ObjCVarA_Fiscal_Year.mBalanceSheetOpeningJVID = Convert.ToInt64(dr["BalanceSheetOpeningJVID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_Fiscal_Year.Add(ObjCVarA_Fiscal_Year);
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
                    Com.CommandText = "[dbo].DeleteListA_Fiscal_Year";
                else
                    Com.CommandText = "[dbo].UpdateListA_Fiscal_Year";
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
        public Exception DeleteItem(List<CPKA_Fiscal_Year> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_Fiscal_Year";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_Fiscal_Year ObjCPKA_Fiscal_Year in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_Fiscal_Year.ID);
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
        public Exception SaveMethod(List<CVarA_Fiscal_Year> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Fiscal_Year_Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@User_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Confirmed", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Closed", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ProfitLossClosingJVID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@BalanceSheetClosingJVID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@BalanceSheetOpeningJVID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_Fiscal_Year ObjCVarA_Fiscal_Year in SaveList)
                {
                    if (ObjCVarA_Fiscal_Year.mIsChanges == true)
                    {
                        if (ObjCVarA_Fiscal_Year.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_Fiscal_Year";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_Fiscal_Year.ID != 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_Fiscal_Year";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                       // if (ObjCVarA_Fiscal_Year.ID != 0)
                       // {
                            Com.Parameters["@ID"].Value = ObjCVarA_Fiscal_Year.ID;
                      //  }
                        Com.Parameters["@Fiscal_Year_Name"].Value = ObjCVarA_Fiscal_Year.Fiscal_Year_Name;
                        Com.Parameters["@User_ID"].Value = ObjCVarA_Fiscal_Year.User_ID;
                        Com.Parameters["@Confirmed"].Value = ObjCVarA_Fiscal_Year.Confirmed;
                        Com.Parameters["@Closed"].Value = ObjCVarA_Fiscal_Year.Closed;
                        Com.Parameters["@ProfitLossClosingJVID"].Value = ObjCVarA_Fiscal_Year.ProfitLossClosingJVID;
                        Com.Parameters["@BalanceSheetClosingJVID"].Value = ObjCVarA_Fiscal_Year.BalanceSheetClosingJVID;
                        Com.Parameters["@BalanceSheetOpeningJVID"].Value = ObjCVarA_Fiscal_Year.BalanceSheetOpeningJVID;
                        EndTrans(Com, Con);
                       // if (ObjCVarA_Fiscal_Year.ID == 0)
                       // {
                            ObjCVarA_Fiscal_Year.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                       // }
                        ObjCVarA_Fiscal_Year.mIsChanges = false;
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
