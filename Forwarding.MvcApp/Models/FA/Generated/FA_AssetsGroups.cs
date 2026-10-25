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
    public class CPKFA_AssetsGroups
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
    public partial class CVarFA_AssetsGroups : CPKFA_AssetsGroups
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal Int32 mAssetAccount_ID;
        internal Int32 mAssetDepreciationAccount_ID;
        internal Int32 mAssetAccumulatedDepreciationAccount_ID;
        internal Int32 mAssetExpensesAccount_ID;
        internal Int32 mAssetCostCenter_ID;
        internal Int32 mSubAccountID;
        internal Int32 mParentSubAccountID;
        internal Decimal mPercentage;
        internal String mCode;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public Int32 AssetAccount_ID
        {
            get { return mAssetAccount_ID; }
            set { mIsChanges = true; mAssetAccount_ID = value; }
        }
        public Int32 AssetDepreciationAccount_ID
        {
            get { return mAssetDepreciationAccount_ID; }
            set { mIsChanges = true; mAssetDepreciationAccount_ID = value; }
        }
        public Int32 AssetAccumulatedDepreciationAccount_ID
        {
            get { return mAssetAccumulatedDepreciationAccount_ID; }
            set { mIsChanges = true; mAssetAccumulatedDepreciationAccount_ID = value; }
        }
        public Int32 AssetExpensesAccount_ID
        {
            get { return mAssetExpensesAccount_ID; }
            set { mIsChanges = true; mAssetExpensesAccount_ID = value; }
        }
        public Int32 AssetCostCenter_ID
        {
            get { return mAssetCostCenter_ID; }
            set { mIsChanges = true; mAssetCostCenter_ID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Int32 ParentSubAccountID
        {
            get { return mParentSubAccountID; }
            set { mIsChanges = true; mParentSubAccountID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mIsChanges = true; mPercentage = value; }
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

    public partial class CFA_AssetsGroups
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
        public List<CVarFA_AssetsGroups> lstCVarFA_AssetsGroups = new List<CVarFA_AssetsGroups>();
        public List<CPKFA_AssetsGroups> lstDeletedCPKFA_AssetsGroups = new List<CPKFA_AssetsGroups>();
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
            lstCVarFA_AssetsGroups.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_AssetsGroups";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFA_AssetsGroups";
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
                        CVarFA_AssetsGroups ObjCVarFA_AssetsGroups = new CVarFA_AssetsGroups();
                        ObjCVarFA_AssetsGroups.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsGroups.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetAccount_ID = Convert.ToInt32(dr["AssetAccount_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetDepreciationAccount_ID = Convert.ToInt32(dr["AssetDepreciationAccount_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetAccumulatedDepreciationAccount_ID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccount_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetExpensesAccount_ID = Convert.ToInt32(dr["AssetExpensesAccount_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarFA_AssetsGroups.mParentSubAccountID = Convert.ToInt32(dr["ParentSubAccountID"].ToString());
                        ObjCVarFA_AssetsGroups.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_AssetsGroups.mCode = Convert.ToString(dr["Code"].ToString());
                        lstCVarFA_AssetsGroups.Add(ObjCVarFA_AssetsGroups);
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
            lstCVarFA_AssetsGroups.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_AssetsGroups";
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
                        CVarFA_AssetsGroups ObjCVarFA_AssetsGroups = new CVarFA_AssetsGroups();
                        ObjCVarFA_AssetsGroups.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsGroups.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetAccount_ID = Convert.ToInt32(dr["AssetAccount_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetDepreciationAccount_ID = Convert.ToInt32(dr["AssetDepreciationAccount_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetAccumulatedDepreciationAccount_ID = Convert.ToInt32(dr["AssetAccumulatedDepreciationAccount_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetExpensesAccount_ID = Convert.ToInt32(dr["AssetExpensesAccount_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mAssetCostCenter_ID = Convert.ToInt32(dr["AssetCostCenter_ID"].ToString());
                        ObjCVarFA_AssetsGroups.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarFA_AssetsGroups.mParentSubAccountID = Convert.ToInt32(dr["ParentSubAccountID"].ToString());
                        ObjCVarFA_AssetsGroups.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_AssetsGroups.mCode = Convert.ToString(dr["Code"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_AssetsGroups.Add(ObjCVarFA_AssetsGroups);
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
                    Com.CommandText = "[dbo].DeleteListFA_AssetsGroups";
                else
                    Com.CommandText = "[dbo].UpdateListFA_AssetsGroups";
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
        public Exception DeleteItem(List<CPKFA_AssetsGroups> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFA_AssetsGroups";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFA_AssetsGroups ObjCPKFA_AssetsGroups in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFA_AssetsGroups.ID);
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
        public Exception SaveMethod(List<CVarFA_AssetsGroups> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AssetAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AssetDepreciationAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AssetAccumulatedDepreciationAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AssetExpensesAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AssetCostCenter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ParentSubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Percentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFA_AssetsGroups ObjCVarFA_AssetsGroups in SaveList)
                {
                    if (ObjCVarFA_AssetsGroups.mIsChanges == true)
                    {
                        if (ObjCVarFA_AssetsGroups.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFA_AssetsGroups";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFA_AssetsGroups.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFA_AssetsGroups";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFA_AssetsGroups.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFA_AssetsGroups.ID;
                        }
                        Com.Parameters["@Name"].Value = ObjCVarFA_AssetsGroups.Name;
                        Com.Parameters["@AssetAccount_ID"].Value = ObjCVarFA_AssetsGroups.AssetAccount_ID;
                        Com.Parameters["@AssetDepreciationAccount_ID"].Value = ObjCVarFA_AssetsGroups.AssetDepreciationAccount_ID;
                        Com.Parameters["@AssetAccumulatedDepreciationAccount_ID"].Value = ObjCVarFA_AssetsGroups.AssetAccumulatedDepreciationAccount_ID;
                        Com.Parameters["@AssetExpensesAccount_ID"].Value = ObjCVarFA_AssetsGroups.AssetExpensesAccount_ID;
                        Com.Parameters["@AssetCostCenter_ID"].Value = ObjCVarFA_AssetsGroups.AssetCostCenter_ID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarFA_AssetsGroups.SubAccountID;
                        Com.Parameters["@ParentSubAccountID"].Value = ObjCVarFA_AssetsGroups.ParentSubAccountID;
                        Com.Parameters["@Percentage"].Value = ObjCVarFA_AssetsGroups.Percentage;
                        Com.Parameters["@Code"].Value = ObjCVarFA_AssetsGroups.Code;
                        EndTrans(Com, Con);
                        if (ObjCVarFA_AssetsGroups.ID == 0)
                        {
                            ObjCVarFA_AssetsGroups.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFA_AssetsGroups.mIsChanges = false;
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
