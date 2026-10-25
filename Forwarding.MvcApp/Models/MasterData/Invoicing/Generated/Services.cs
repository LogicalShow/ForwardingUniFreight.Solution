using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Invoicing.Generated
{
    [Serializable]
    public class CPKServices
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    } 
    [Serializable]
    public partial class CVarServices : CPKServices
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;
        internal Int32 mCostCenterID;
        internal Int64 mCode;
        internal String mPreCode;
        internal Int32 mAccountID2;
        internal Int32 mSubAccountID2;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Int64 Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public String PreCode
        {
            get { return mPreCode; }
            set { mIsChanges = true; mPreCode = value; }
        }
        public Int32 AccountID2
        {
            get { return mAccountID2; }
            set { mIsChanges = true; mAccountID2 = value; }
        }
        public Int32 SubAccountID2
        {
            get { return mSubAccountID2; }
            set { mIsChanges = true; mSubAccountID2 = value; }
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

    public partial class CServices
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
        public List<CVarServices> lstCVarServices = new List<CVarServices>();
        public List<CPKServices> lstDeletedCPKServices = new List<CPKServices>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarServices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListServices";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemServices";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarServices ObjCVarServices = new CVarServices();
                        ObjCVarServices.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarServices.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarServices.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarServices.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarServices.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarServices.mCode = Convert.ToInt64(dr["Code"].ToString());
                        ObjCVarServices.mPreCode = Convert.ToString(dr["PreCode"].ToString());
                        ObjCVarServices.mAccountID2 = Convert.ToInt32(dr["AccountID2"].ToString());
                        ObjCVarServices.mSubAccountID2 = Convert.ToInt32(dr["SubAccountID2"].ToString());
                        lstCVarServices.Add(ObjCVarServices);
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
            lstCVarServices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingServices";
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
                        CVarServices ObjCVarServices = new CVarServices();
                        ObjCVarServices.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarServices.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarServices.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarServices.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarServices.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarServices.mCode = Convert.ToInt64(dr["Code"].ToString());
                        ObjCVarServices.mPreCode = Convert.ToString(dr["PreCode"].ToString());
                        ObjCVarServices.mAccountID2 = Convert.ToInt32(dr["AccountID2"].ToString());
                        ObjCVarServices.mSubAccountID2 = Convert.ToInt32(dr["SubAccountID2"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarServices.Add(ObjCVarServices);
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
                    Com.CommandText = "[dbo].DeleteListServices";
                else
                    Com.CommandText = "[dbo].UpdateListServices";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
        public Exception DeleteItem(List<CPKServices> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemServices";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKServices ObjCPKServices in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKServices.ID);
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
        public Exception SaveMethod(List<CVarServices> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PreCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountID2", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID2", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarServices ObjCVarServices in SaveList)
                {
                    if (ObjCVarServices.mIsChanges == true)
                    {
                        if (ObjCVarServices.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemServices";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarServices.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemServices";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarServices.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarServices.ID;
                        }
                        Com.Parameters["@Name"].Value = ObjCVarServices.Name;
                        Com.Parameters["@AccountID"].Value = ObjCVarServices.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarServices.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarServices.CostCenterID;
                        Com.Parameters["@Code"].Value = ObjCVarServices.Code;
                        Com.Parameters["@PreCode"].Value = ObjCVarServices.PreCode;
                        Com.Parameters["@AccountID2"].Value = ObjCVarServices.AccountID2;
                        Com.Parameters["@SubAccountID2"].Value = ObjCVarServices.SubAccountID2;
                        EndTrans(Com, Con);
                        if (ObjCVarServices.ID == 0)
                        {
                            ObjCVarServices.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarServices.mIsChanges = false;
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
