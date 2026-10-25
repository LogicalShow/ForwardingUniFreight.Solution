using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public class CPKA_SubAccounts
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
    public partial class CVarA_SubAccounts : CPKA_SubAccounts
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mSubAccount_Number;
        internal String mSubAccount_Name;
        internal String mSubAccount_EnName;
        internal Int32 mParent_ID;
        internal Boolean mIsMain;
        internal Int32 mSubAccLevel;
        internal String mRealSubAccountCode;
        internal Decimal mBalance;
        internal Int32 mUser_ID;
        #endregion

        #region "Methods"
        public String SubAccount_Number
        {
            get { return mSubAccount_Number; }
            set { mIsChanges = true; mSubAccount_Number = value; }
        }
        public String SubAccount_Name
        {
            get { return mSubAccount_Name; }
            set { mIsChanges = true; mSubAccount_Name = value; }
        }
        public String SubAccount_EnName
        {
            get { return mSubAccount_EnName; }
            set { mIsChanges = true; mSubAccount_EnName = value; }
        }
        public Int32 Parent_ID
        {
            get { return mParent_ID; }
            set { mIsChanges = true; mParent_ID = value; }
        }
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsChanges = true; mIsMain = value; }
        }
        public Int32 SubAccLevel
        {
            get { return mSubAccLevel; }
            set { mIsChanges = true; mSubAccLevel = value; }
        }
        public String RealSubAccountCode
        {
            get { return mRealSubAccountCode; }
            set { mIsChanges = true; mRealSubAccountCode = value; }
        }
        public Decimal Balance
        {
            get { return mBalance; }
            set { mIsChanges = true; mBalance = value; }
        }
        public Int32 User_ID
        {
            get { return mUser_ID; }
            set { mIsChanges = true; mUser_ID = value; }
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

    public partial class CA_SubAccounts
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
        public List<CVarA_SubAccounts> lstCVarA_SubAccounts = new List<CVarA_SubAccounts>();
        public List<CPKA_SubAccounts> lstDeletedCPKA_SubAccounts = new List<CPKA_SubAccounts>();
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
            lstCVarA_SubAccounts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_SubAccounts";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_SubAccounts";
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
                        CVarA_SubAccounts ObjCVarA_SubAccounts = new CVarA_SubAccounts();
                        ObjCVarA_SubAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_SubAccounts.mSubAccount_Number = Convert.ToString(dr["SubAccount_Number"].ToString());
                        ObjCVarA_SubAccounts.mSubAccount_Name = Convert.ToString(dr["SubAccount_Name"].ToString());
                        ObjCVarA_SubAccounts.mSubAccount_EnName = Convert.ToString(dr["SubAccount_EnName"].ToString());
                        ObjCVarA_SubAccounts.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarA_SubAccounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarA_SubAccounts.mSubAccLevel = Convert.ToInt32(dr["SubAccLevel"].ToString());
                        ObjCVarA_SubAccounts.mRealSubAccountCode = Convert.ToString(dr["RealSubAccountCode"].ToString());
                        ObjCVarA_SubAccounts.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarA_SubAccounts.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        lstCVarA_SubAccounts.Add(ObjCVarA_SubAccounts);
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
            lstCVarA_SubAccounts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_SubAccounts";
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
                        CVarA_SubAccounts ObjCVarA_SubAccounts = new CVarA_SubAccounts();
                        ObjCVarA_SubAccounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_SubAccounts.mSubAccount_Number = Convert.ToString(dr["SubAccount_Number"].ToString());
                        ObjCVarA_SubAccounts.mSubAccount_Name = Convert.ToString(dr["SubAccount_Name"].ToString());
                        ObjCVarA_SubAccounts.mSubAccount_EnName = Convert.ToString(dr["SubAccount_EnName"].ToString());
                        ObjCVarA_SubAccounts.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarA_SubAccounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarA_SubAccounts.mSubAccLevel = Convert.ToInt32(dr["SubAccLevel"].ToString());
                        ObjCVarA_SubAccounts.mRealSubAccountCode = Convert.ToString(dr["RealSubAccountCode"].ToString());
                        ObjCVarA_SubAccounts.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarA_SubAccounts.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_SubAccounts.Add(ObjCVarA_SubAccounts);
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
                    Com.CommandText = "[dbo].DeleteListA_SubAccounts";
                else
                    Com.CommandText = "[dbo].UpdateListA_SubAccounts";
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
        public Exception DeleteItem(List<CPKA_SubAccounts> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_SubAccounts";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_SubAccounts ObjCPKA_SubAccounts in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_SubAccounts.ID);
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
        public Exception SaveMethod(List<CVarA_SubAccounts> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@SubAccount_Number", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SubAccount_Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SubAccount_EnName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Parent_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsMain", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@SubAccLevel", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RealSubAccountCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Balance", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@User_ID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_SubAccounts ObjCVarA_SubAccounts in SaveList)
                {
                    if (ObjCVarA_SubAccounts.mIsChanges == true)
                    {
                        if (ObjCVarA_SubAccounts.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_SubAccounts";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_SubAccounts.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_SubAccounts";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_SubAccounts.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_SubAccounts.ID;
                        }
                        Com.Parameters["@SubAccount_Number"].Value = ObjCVarA_SubAccounts.SubAccount_Number;
                        Com.Parameters["@SubAccount_Name"].Value = ObjCVarA_SubAccounts.SubAccount_Name;
                        Com.Parameters["@SubAccount_EnName"].Value = ObjCVarA_SubAccounts.SubAccount_EnName;
                        Com.Parameters["@Parent_ID"].Value = ObjCVarA_SubAccounts.Parent_ID;
                        Com.Parameters["@IsMain"].Value = ObjCVarA_SubAccounts.IsMain;
                        Com.Parameters["@SubAccLevel"].Value = ObjCVarA_SubAccounts.SubAccLevel;
                        Com.Parameters["@RealSubAccountCode"].Value = ObjCVarA_SubAccounts.RealSubAccountCode;
                        Com.Parameters["@Balance"].Value = ObjCVarA_SubAccounts.Balance;
                        Com.Parameters["@User_ID"].Value = ObjCVarA_SubAccounts.User_ID;
                        EndTrans(Com, Con);
                        if (ObjCVarA_SubAccounts.ID == 0)
                        {
                            ObjCVarA_SubAccounts.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_SubAccounts.mIsChanges = false;
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
