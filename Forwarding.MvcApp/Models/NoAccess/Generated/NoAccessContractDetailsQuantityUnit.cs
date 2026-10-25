using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.NoAccess.Generated
{
    [Serializable]
    public class CPKNoAccessContractDetailsQuantityUnit
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
    public partial class CVarNoAccessContractDetailsQuantityUnit : CPKNoAccessContractDetailsQuantityUnit
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal Int32 mViewOrder;
        internal Boolean mIsInactive;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mIsChanges = true; mViewOrder = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
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

    public partial class CNoAccessContractDetailsQuantityUnit
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
        public List<CVarNoAccessContractDetailsQuantityUnit> lstCVarNoAccessContractDetailsQuantityUnit = new List<CVarNoAccessContractDetailsQuantityUnit>();
        public List<CPKNoAccessContractDetailsQuantityUnit> lstDeletedCPKNoAccessContractDetailsQuantityUnit = new List<CPKNoAccessContractDetailsQuantityUnit>();
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
            lstCVarNoAccessContractDetailsQuantityUnit.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListNoAccessContractDetailsQuantityUnit";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemNoAccessContractDetailsQuantityUnit";
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
                        CVarNoAccessContractDetailsQuantityUnit ObjCVarNoAccessContractDetailsQuantityUnit = new CVarNoAccessContractDetailsQuantityUnit();
                        ObjCVarNoAccessContractDetailsQuantityUnit.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessContractDetailsQuantityUnit.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessContractDetailsQuantityUnit.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarNoAccessContractDetailsQuantityUnit.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        lstCVarNoAccessContractDetailsQuantityUnit.Add(ObjCVarNoAccessContractDetailsQuantityUnit);
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
            lstCVarNoAccessContractDetailsQuantityUnit.Clear();

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
                Com.CommandText = "[dbo].GetListPagingNoAccessContractDetailsQuantityUnit";
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
                        CVarNoAccessContractDetailsQuantityUnit ObjCVarNoAccessContractDetailsQuantityUnit = new CVarNoAccessContractDetailsQuantityUnit();
                        ObjCVarNoAccessContractDetailsQuantityUnit.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessContractDetailsQuantityUnit.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessContractDetailsQuantityUnit.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarNoAccessContractDetailsQuantityUnit.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarNoAccessContractDetailsQuantityUnit.Add(ObjCVarNoAccessContractDetailsQuantityUnit);
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
                    Com.CommandText = "[dbo].DeleteListNoAccessContractDetailsQuantityUnit";
                else
                    Com.CommandText = "[dbo].UpdateListNoAccessContractDetailsQuantityUnit";
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
        public Exception DeleteItem(List<CPKNoAccessContractDetailsQuantityUnit> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemNoAccessContractDetailsQuantityUnit";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKNoAccessContractDetailsQuantityUnit ObjCPKNoAccessContractDetailsQuantityUnit in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKNoAccessContractDetailsQuantityUnit.ID);
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
        public Exception SaveMethod(List<CVarNoAccessContractDetailsQuantityUnit> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ViewOrder", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarNoAccessContractDetailsQuantityUnit ObjCVarNoAccessContractDetailsQuantityUnit in SaveList)
                {
                    if (ObjCVarNoAccessContractDetailsQuantityUnit.mIsChanges == true)
                    {
                        if (ObjCVarNoAccessContractDetailsQuantityUnit.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemNoAccessContractDetailsQuantityUnit";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarNoAccessContractDetailsQuantityUnit.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemNoAccessContractDetailsQuantityUnit";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarNoAccessContractDetailsQuantityUnit.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarNoAccessContractDetailsQuantityUnit.ID;
                        }
                        Com.Parameters["@Name"].Value = ObjCVarNoAccessContractDetailsQuantityUnit.Name;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarNoAccessContractDetailsQuantityUnit.ViewOrder;
                        Com.Parameters["@IsInactive"].Value = ObjCVarNoAccessContractDetailsQuantityUnit.IsInactive;
                        EndTrans(Com, Con);
                        if (ObjCVarNoAccessContractDetailsQuantityUnit.ID == 0)
                        {
                            ObjCVarNoAccessContractDetailsQuantityUnit.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarNoAccessContractDetailsQuantityUnit.mIsChanges = false;
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
