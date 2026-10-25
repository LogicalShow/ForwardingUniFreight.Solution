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
    public class CPKA_AccountsTAX
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
    public partial class CVarA_AccountsTAX : CPKA_AccountsTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mAccount_Number;
        internal String mAccount_Name;
        internal String mAccount_EnName;
        internal Int32 mParent_ID;
        internal Boolean mIsMain;
        internal Int32 mAccLevel;
        internal String mRealAccountCode;
        internal Boolean mIsSub;
        internal Boolean mIsVisible;
        internal Int32 mCostCenter_ID;
        internal Decimal mBalance;
        internal Int32 mUser_ID;
        internal String mCostCenterCalcType;
        internal String mCode;
        #endregion

        #region "Methods"
        public String Account_Number
        {
            get { return mAccount_Number; }
            set { mIsChanges = true; mAccount_Number = value; }
        }
        public String Account_Name
        {
            get { return mAccount_Name; }
            set { mIsChanges = true; mAccount_Name = value; }
        }
        public String Account_EnName
        {
            get { return mAccount_EnName; }
            set { mIsChanges = true; mAccount_EnName = value; }
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
        public Int32 AccLevel
        {
            get { return mAccLevel; }
            set { mIsChanges = true; mAccLevel = value; }
        }
        public String RealAccountCode
        {
            get { return mRealAccountCode; }
            set { mIsChanges = true; mRealAccountCode = value; }
        }
        public Boolean IsSub
        {
            get { return mIsSub; }
            set { mIsChanges = true; mIsSub = value; }
        }
        public Boolean IsVisible
        {
            get { return mIsVisible; }
            set { mIsChanges = true; mIsVisible = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mIsChanges = true; mCostCenter_ID = value; }
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
        public String CostCenterCalcType
        {
            get { return mCostCenterCalcType; }
            set { mIsChanges = true; mCostCenterCalcType = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
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

    public partial class CA_AccountsTAX
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
        public List<CVarA_AccountsTAX> lstCVarA_Accounts = new List<CVarA_AccountsTAX>();
        public List<CPKA_AccountsTAX> lstDeletedCPKA_Accounts = new List<CPKA_AccountsTAX>();
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
            lstCVarA_Accounts.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_AccountsTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_AccountsTax";
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
                        CVarA_AccountsTAX ObjCVarA_Accounts = new CVarA_AccountsTAX();
                        ObjCVarA_Accounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_Accounts.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarA_Accounts.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarA_Accounts.mAccount_EnName = Convert.ToString(dr["Account_EnName"].ToString());
                        ObjCVarA_Accounts.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarA_Accounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarA_Accounts.mAccLevel = Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarA_Accounts.mRealAccountCode = Convert.ToString(dr["RealAccountCode"].ToString());
                        ObjCVarA_Accounts.mIsSub = Convert.ToBoolean(dr["IsSub"].ToString());
                        ObjCVarA_Accounts.mIsVisible = Convert.ToBoolean(dr["IsVisible"].ToString());
                        ObjCVarA_Accounts.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarA_Accounts.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarA_Accounts.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarA_Accounts.mCostCenterCalcType = Convert.ToString(dr["CostCenterCalcType"].ToString());
                        ObjCVarA_Accounts.mCode = Convert.ToString(dr["Code"].ToString());
                        lstCVarA_Accounts.Add(ObjCVarA_Accounts);
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
            lstCVarA_Accounts.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_AccountsTax";
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
                        CVarA_AccountsTAX ObjCVarA_Accounts = new CVarA_AccountsTAX();
                        ObjCVarA_Accounts.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_Accounts.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarA_Accounts.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarA_Accounts.mAccount_EnName = Convert.ToString(dr["Account_EnName"].ToString());
                        ObjCVarA_Accounts.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarA_Accounts.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarA_Accounts.mAccLevel = Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarA_Accounts.mRealAccountCode = Convert.ToString(dr["RealAccountCode"].ToString());
                        ObjCVarA_Accounts.mIsSub = Convert.ToBoolean(dr["IsSub"].ToString());
                        ObjCVarA_Accounts.mIsVisible = Convert.ToBoolean(dr["IsVisible"].ToString());
                        ObjCVarA_Accounts.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarA_Accounts.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarA_Accounts.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarA_Accounts.mCostCenterCalcType = Convert.ToString(dr["CostCenterCalcType"].ToString());
                        ObjCVarA_Accounts.mCode = Convert.ToString(dr["Code"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_Accounts.Add(ObjCVarA_Accounts);
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
                    Com.CommandText = "[dbo].DeleteListA_AccountsTax";
                else
                    Com.CommandText = "[dbo].UpdateListA_AccountsTax";
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
        public Exception DeleteItem(List<CPKA_AccountsTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_Accounts";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_AccountsTAX ObjCPKA_Accounts in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_Accounts.ID);
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
        public Exception SaveMethod(List<CVarA_AccountsTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Account_Number", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Account_Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Account_EnName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Parent_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsMain", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AccLevel", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RealAccountCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsSub", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsVisible", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Balance", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@User_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterCalcType", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_AccountsTAX ObjCVarA_Accounts in SaveList)
                {
                    if (ObjCVarA_Accounts.mIsChanges == true)
                    {
                        if (ObjCVarA_Accounts.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_AccountsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_Accounts.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_AccountsTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_Accounts.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_Accounts.ID;
                        }
                        Com.Parameters["@Account_Number"].Value = ObjCVarA_Accounts.Account_Number;
                        Com.Parameters["@Account_Name"].Value = ObjCVarA_Accounts.Account_Name;
                        Com.Parameters["@Account_EnName"].Value = ObjCVarA_Accounts.Account_EnName;
                        Com.Parameters["@Parent_ID"].Value = ObjCVarA_Accounts.Parent_ID;
                        Com.Parameters["@IsMain"].Value = ObjCVarA_Accounts.IsMain;
                        Com.Parameters["@AccLevel"].Value = ObjCVarA_Accounts.AccLevel;
                        Com.Parameters["@RealAccountCode"].Value = ObjCVarA_Accounts.RealAccountCode;
                        Com.Parameters["@IsSub"].Value = ObjCVarA_Accounts.IsSub;
                        Com.Parameters["@IsVisible"].Value = ObjCVarA_Accounts.IsVisible;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarA_Accounts.CostCenter_ID;
                        Com.Parameters["@Balance"].Value = ObjCVarA_Accounts.Balance;
                        Com.Parameters["@User_ID"].Value = ObjCVarA_Accounts.User_ID;
                        Com.Parameters["@CostCenterCalcType"].Value = ObjCVarA_Accounts.CostCenterCalcType;
                        Com.Parameters["@Code"].Value = ObjCVarA_Accounts.Code;
                        EndTrans(Com, Con);
                        if (ObjCVarA_Accounts.ID == 0)
                        {
                            ObjCVarA_Accounts.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_Accounts.mIsChanges = false;
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
