using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKPartnersBanks
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
    public partial class CVarPartnersBanks : CPKPartnersBanks
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mBankName;
        internal String mBranch;
        internal String mAccountName;
        internal String mAccountNumber;
        internal String mSwiftCode;
        internal Int32 mPartnerID;
        internal Int32 mPartnerTypeID;
        internal Int32 mCurrencyID;
        #endregion

        #region "Methods"
        public String BankName
        {
            get { return mBankName; }
            set { mIsChanges = true; mBankName = value; }
        }
        public String Branch
        {
            get { return mBranch; }
            set { mIsChanges = true; mBranch = value; }
        }
        public String AccountName
        {
            get { return mAccountName; }
            set { mIsChanges = true; mAccountName = value; }
        }
        public String AccountNumber
        {
            get { return mAccountNumber; }
            set { mIsChanges = true; mAccountNumber = value; }
        }
        public String SwiftCode
        {
            get { return mSwiftCode; }
            set { mIsChanges = true; mSwiftCode = value; }
        }
        public Int32 PartnerID
        {
            get { return mPartnerID; }
            set { mIsChanges = true; mPartnerID = value; }
        }
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mIsChanges = true; mPartnerTypeID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
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

    public partial class CPartnersBanks
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
        public List<CVarPartnersBanks> lstCVarPartnersBanks = new List<CVarPartnersBanks>();
        public List<CPKPartnersBanks> lstDeletedCPKPartnersBanks = new List<CPKPartnersBanks>();
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
            lstCVarPartnersBanks.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPartnersBanks";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPartnersBanks";
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
                        CVarPartnersBanks ObjCVarPartnersBanks = new CVarPartnersBanks();
                        ObjCVarPartnersBanks.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPartnersBanks.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarPartnersBanks.mBranch = Convert.ToString(dr["Branch"].ToString());
                        ObjCVarPartnersBanks.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarPartnersBanks.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarPartnersBanks.mSwiftCode = Convert.ToString(dr["SwiftCode"].ToString());
                        ObjCVarPartnersBanks.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarPartnersBanks.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarPartnersBanks.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        lstCVarPartnersBanks.Add(ObjCVarPartnersBanks);
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
            lstCVarPartnersBanks.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPartnersBanks";
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
                        CVarPartnersBanks ObjCVarPartnersBanks = new CVarPartnersBanks();
                        ObjCVarPartnersBanks.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarPartnersBanks.mBankName = Convert.ToString(dr["BankName"].ToString());
                        ObjCVarPartnersBanks.mBranch = Convert.ToString(dr["Branch"].ToString());
                        ObjCVarPartnersBanks.mAccountName = Convert.ToString(dr["AccountName"].ToString());
                        ObjCVarPartnersBanks.mAccountNumber = Convert.ToString(dr["AccountNumber"].ToString());
                        ObjCVarPartnersBanks.mSwiftCode = Convert.ToString(dr["SwiftCode"].ToString());
                        ObjCVarPartnersBanks.mPartnerID = Convert.ToInt32(dr["PartnerID"].ToString());
                        ObjCVarPartnersBanks.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarPartnersBanks.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPartnersBanks.Add(ObjCVarPartnersBanks);
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
                    Com.CommandText = "[dbo].DeleteListPartnersBanks";
                else
                    Com.CommandText = "[dbo].UpdateListPartnersBanks";
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
        public Exception DeleteItem(List<CPKPartnersBanks> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPartnersBanks";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKPartnersBanks ObjCPKPartnersBanks in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKPartnersBanks.ID);
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
        public Exception SaveMethod(List<CVarPartnersBanks> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@BankName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Branch", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SwiftCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PartnerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PartnerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPartnersBanks ObjCVarPartnersBanks in SaveList)
                {
                    if (ObjCVarPartnersBanks.mIsChanges == true)
                    {
                        if (ObjCVarPartnersBanks.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPartnersBanks";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPartnersBanks.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPartnersBanks";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPartnersBanks.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPartnersBanks.ID;
                        }
                        Com.Parameters["@BankName"].Value = ObjCVarPartnersBanks.BankName;
                        Com.Parameters["@Branch"].Value = ObjCVarPartnersBanks.Branch;
                        Com.Parameters["@AccountName"].Value = ObjCVarPartnersBanks.AccountName;
                        Com.Parameters["@AccountNumber"].Value = ObjCVarPartnersBanks.AccountNumber;
                        Com.Parameters["@SwiftCode"].Value = ObjCVarPartnersBanks.SwiftCode;
                        Com.Parameters["@PartnerID"].Value = ObjCVarPartnersBanks.PartnerID;
                        Com.Parameters["@PartnerTypeID"].Value = ObjCVarPartnersBanks.PartnerTypeID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPartnersBanks.CurrencyID;
                        EndTrans(Com, Con);
                        if (ObjCVarPartnersBanks.ID == 0)
                        {
                            ObjCVarPartnersBanks.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPartnersBanks.mIsChanges = false;
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
