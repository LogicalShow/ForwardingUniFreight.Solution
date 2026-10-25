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
    public class CPKSL_SupplierSalesMan
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
    public partial class CVarSL_SupplierSalesMan : CPKSL_SupplierSalesMan
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mSupplierID;
        internal Int32 msalesmanID;
        internal Decimal mPercentage;
        internal Boolean misDefault;
        #endregion

        #region "Methods"
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public Int32 salesmanID
        {
            get { return msalesmanID; }
            set { mIsChanges = true; msalesmanID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mIsChanges = true; mPercentage = value; }
        }
        public Boolean isDefault
        {
            get { return misDefault; }
            set { mIsChanges = true; misDefault = value; }
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

    public partial class CSL_SupplierSalesMan
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
        public List<CVarSL_SupplierSalesMan> lstCVarSL_SupplierSalesMan = new List<CVarSL_SupplierSalesMan>();
        public List<CPKSL_SupplierSalesMan> lstDeletedCPKSL_SupplierSalesMan = new List<CPKSL_SupplierSalesMan>();
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
            lstCVarSL_SupplierSalesMan.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_SupplierSalesMan";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_SupplierSalesMan";
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
                        CVarSL_SupplierSalesMan ObjCVarSL_SupplierSalesMan = new CVarSL_SupplierSalesMan();
                        ObjCVarSL_SupplierSalesMan.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_SupplierSalesMan.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarSL_SupplierSalesMan.msalesmanID = Convert.ToInt32(dr["salesmanID"].ToString());
                        ObjCVarSL_SupplierSalesMan.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarSL_SupplierSalesMan.misDefault = Convert.ToBoolean(dr["isDefault"].ToString());
                        lstCVarSL_SupplierSalesMan.Add(ObjCVarSL_SupplierSalesMan);
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
            lstCVarSL_SupplierSalesMan.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_SupplierSalesMan";
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
                        CVarSL_SupplierSalesMan ObjCVarSL_SupplierSalesMan = new CVarSL_SupplierSalesMan();
                        ObjCVarSL_SupplierSalesMan.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_SupplierSalesMan.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarSL_SupplierSalesMan.msalesmanID = Convert.ToInt32(dr["salesmanID"].ToString());
                        ObjCVarSL_SupplierSalesMan.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarSL_SupplierSalesMan.misDefault = Convert.ToBoolean(dr["isDefault"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_SupplierSalesMan.Add(ObjCVarSL_SupplierSalesMan);
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
                    Com.CommandText = "[dbo].DeleteListSL_SupplierSalesMan";
                else
                    Com.CommandText = "[dbo].UpdateListSL_SupplierSalesMan";
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
        public Exception DeleteItem(List<CPKSL_SupplierSalesMan> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_SupplierSalesMan";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSL_SupplierSalesMan ObjCPKSL_SupplierSalesMan in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSL_SupplierSalesMan.ID);
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
        public Exception SaveMethod(List<CVarSL_SupplierSalesMan> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@salesmanID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Percentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@isDefault", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_SupplierSalesMan ObjCVarSL_SupplierSalesMan in SaveList)
                {
                    if (ObjCVarSL_SupplierSalesMan.mIsChanges == true)
                    {
                        if (ObjCVarSL_SupplierSalesMan.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_SupplierSalesMan";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_SupplierSalesMan.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_SupplierSalesMan";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_SupplierSalesMan.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_SupplierSalesMan.ID;
                        }
                        Com.Parameters["@SupplierID"].Value = ObjCVarSL_SupplierSalesMan.SupplierID;
                        Com.Parameters["@salesmanID"].Value = ObjCVarSL_SupplierSalesMan.salesmanID;
                        Com.Parameters["@Percentage"].Value = ObjCVarSL_SupplierSalesMan.Percentage;
                        Com.Parameters["@isDefault"].Value = ObjCVarSL_SupplierSalesMan.isDefault;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_SupplierSalesMan.ID == 0)
                        {
                            ObjCVarSL_SupplierSalesMan.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_SupplierSalesMan.mIsChanges = false;
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
