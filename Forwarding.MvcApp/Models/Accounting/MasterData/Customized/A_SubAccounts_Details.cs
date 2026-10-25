using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

//Don't Generate Insert or GetItem or updateItem coz the primary key is combined so gives and error (use customized SP)
namespace Forwarding.MvcApp.Models.Accounting.MasterData.Customized
{
    [Serializable]
    public class CPKA_SubAccounts_Details
    {
        #region "variables"
        private Int32 mSubAccount_ID;
        private Int32 mAccount_ID;
        #endregion

        #region "Methods"
        public Int32 SubAccount_ID
        {
            get { return mSubAccount_ID; }
            set { mSubAccount_ID = value; }
        }
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mAccount_ID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarA_SubAccounts_Details : CPKA_SubAccounts_Details
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Boolean mIsMain;
        #endregion

        #region "Methods"
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsChanges = true; mIsMain = value; }
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

    public partial class CA_SubAccounts_Details
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
        public List<CVarA_SubAccounts_Details> lstCVarA_SubAccounts_Details = new List<CVarA_SubAccounts_Details>();
        public List<CPKA_SubAccounts_Details> lstDeletedCPKA_SubAccounts_Details = new List<CPKA_SubAccounts_Details>();
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
        public Exception GetItem(Int32 SubAccount_ID)
        {
            return DataFill(Convert.ToString(SubAccount_ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_SubAccounts_Details.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_SubAccounts_Details";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_SubAccounts_Details";
                    Com.Parameters.Add(new SqlParameter("@SubAccount_ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                    Com.Parameters.Add(new SqlParameter("@Account_ID", SqlDbType.Int));
                    Com.Parameters[1].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarA_SubAccounts_Details ObjCVarA_SubAccounts_Details = new CVarA_SubAccounts_Details();
                        ObjCVarA_SubAccounts_Details.SubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarA_SubAccounts_Details.Account_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarA_SubAccounts_Details.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        lstCVarA_SubAccounts_Details.Add(ObjCVarA_SubAccounts_Details);
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
            lstCVarA_SubAccounts_Details.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_SubAccounts_Details";
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
                        CVarA_SubAccounts_Details ObjCVarA_SubAccounts_Details = new CVarA_SubAccounts_Details();
                        ObjCVarA_SubAccounts_Details.SubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarA_SubAccounts_Details.Account_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarA_SubAccounts_Details.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_SubAccounts_Details.Add(ObjCVarA_SubAccounts_Details);
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
                    Com.CommandText = "[dbo].DeleteListA_SubAccounts_Details";
                else
                    Com.CommandText = "[dbo].UpdateListA_SubAccounts_Details";
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
        public Exception DeleteItem(List<CPKA_SubAccounts_Details> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_SubAccounts_Details";
                Com.Parameters.Add(new SqlParameter("@SubAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Account_ID", SqlDbType.Int));
                foreach (CPKA_SubAccounts_Details ObjCPKA_SubAccounts_Details in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_SubAccounts_Details.SubAccount_ID);
                    Com.Parameters[1].Value = Convert.ToInt32(ObjCPKA_SubAccounts_Details.Account_ID);
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
        public Exception SaveMethod(List<CVarA_SubAccounts_Details> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@IsMain", SqlDbType.Bit));
                SqlParameter paraSubAccount_ID = Com.Parameters.Add(new SqlParameter("@SubAccount_ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "SubAccount_ID", DataRowVersion.Default, null));
                SqlParameter paraAccount_ID = Com.Parameters.Add(new SqlParameter("@Account_ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "Account_ID", DataRowVersion.Default, null));
                foreach (CVarA_SubAccounts_Details ObjCVarA_SubAccounts_Details in SaveList)
                {
                    if (ObjCVarA_SubAccounts_Details.mIsChanges == true)
                    {
                        if (ObjCVarA_SubAccounts_Details.SubAccount_ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_SubAccounts_Details";
                            paraSubAccount_ID.Direction = ParameterDirection.Output;
                            paraAccount_ID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_SubAccounts_Details.SubAccount_ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_SubAccounts_Details";
                            paraSubAccount_ID.Direction = ParameterDirection.Input;
                            paraAccount_ID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_SubAccounts_Details.SubAccount_ID != 0)
                        {
                            Com.Parameters["@SubAccount_ID"].Value = ObjCVarA_SubAccounts_Details.SubAccount_ID;
                            Com.Parameters["@Account_ID"].Value = ObjCVarA_SubAccounts_Details.Account_ID;
                        }
                        Com.Parameters["@IsMain"].Value = ObjCVarA_SubAccounts_Details.IsMain;
                        EndTrans(Com, Con);
                        if (ObjCVarA_SubAccounts_Details.SubAccount_ID == 0)
                        {
                            ObjCVarA_SubAccounts_Details.SubAccount_ID = Convert.ToInt32(Com.Parameters["@SubAccount_ID"].Value);
                            ObjCVarA_SubAccounts_Details.Account_ID = Convert.ToInt32(Com.Parameters["@Account_ID"].Value);
                        }
                        ObjCVarA_SubAccounts_Details.mIsChanges = false;
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
