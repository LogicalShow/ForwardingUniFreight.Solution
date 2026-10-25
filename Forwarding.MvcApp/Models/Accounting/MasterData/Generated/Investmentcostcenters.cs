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
    public class CPKA_InvestmentCostCenters
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
    public partial class CVarA_InvestmentCostCenters : CPKA_InvestmentCostCenters
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCostCenterID;
        internal String mCostCenterName;
        internal Decimal mPart;
        internal Decimal mPartRatio;
        internal Decimal mValue;
        #endregion

        #region "Methods"
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mIsChanges = true; mCostCenterName = value; }
        }
        public Decimal Part
        {
            get { return mPart; }
            set { mIsChanges = true; mPart = value; }
        }
        public Decimal PartRatio
        {
            get { return mPartRatio; }
            set { mIsChanges = true; mPartRatio = value; }
        }
        public Decimal Value
        {
            get { return mValue; }
            set { mIsChanges = true; mValue = value; }
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

    public partial class CA_InvestmentCostCenters
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
        public List<CVarA_InvestmentCostCenters> lstCVarA_InvestmentCostCenters = new List<CVarA_InvestmentCostCenters>();
        public List<CPKA_InvestmentCostCenters> lstDeletedCPKA_InvestmentCostCenters = new List<CPKA_InvestmentCostCenters>();
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
            lstCVarA_InvestmentCostCenters.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_InvestmentCostCenters";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_InvestmentCostCenters";
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
                        CVarA_InvestmentCostCenters ObjCVarA_InvestmentCostCenters = new CVarA_InvestmentCostCenters();
                        ObjCVarA_InvestmentCostCenters.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_InvestmentCostCenters.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarA_InvestmentCostCenters.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarA_InvestmentCostCenters.mPart = Convert.ToDecimal(dr["Part"].ToString());
                        ObjCVarA_InvestmentCostCenters.mPartRatio = Convert.ToDecimal(dr["PartRatio"].ToString());
                        ObjCVarA_InvestmentCostCenters.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        lstCVarA_InvestmentCostCenters.Add(ObjCVarA_InvestmentCostCenters);
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
            lstCVarA_InvestmentCostCenters.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_InvestmentCostCenters";
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
                        CVarA_InvestmentCostCenters ObjCVarA_InvestmentCostCenters = new CVarA_InvestmentCostCenters();
                        ObjCVarA_InvestmentCostCenters.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_InvestmentCostCenters.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarA_InvestmentCostCenters.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarA_InvestmentCostCenters.mPart = Convert.ToDecimal(dr["Part"].ToString());
                        ObjCVarA_InvestmentCostCenters.mPartRatio = Convert.ToDecimal(dr["PartRatio"].ToString());
                        ObjCVarA_InvestmentCostCenters.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_InvestmentCostCenters.Add(ObjCVarA_InvestmentCostCenters);
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
                    Com.CommandText = "[dbo].DeleteListA_InvestmentCostCenters";
                else
                    Com.CommandText = "[dbo].UpdateListA_InvestmentCostCenters";
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
        public Exception DeleteItem(List<CPKA_InvestmentCostCenters> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_InvestmentCostCenters";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_InvestmentCostCenters ObjCPKA_InvestmentCostCenters in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_InvestmentCostCenters.ID);
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
        public Exception SaveMethod(List<CVarA_InvestmentCostCenters> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Part", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PartRatio", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Value", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_InvestmentCostCenters ObjCVarA_InvestmentCostCenters in SaveList)
                {
                    if (ObjCVarA_InvestmentCostCenters.mIsChanges == true)
                    {
                        if (ObjCVarA_InvestmentCostCenters.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_InvestmentCostCenters";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_InvestmentCostCenters.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_InvestmentCostCenters";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_InvestmentCostCenters.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_InvestmentCostCenters.ID;
                        }
                        Com.Parameters["@CostCenterID"].Value = ObjCVarA_InvestmentCostCenters.CostCenterID;
                        Com.Parameters["@CostCenterName"].Value = ObjCVarA_InvestmentCostCenters.CostCenterName;
                        Com.Parameters["@Part"].Value = ObjCVarA_InvestmentCostCenters.Part;
                        Com.Parameters["@PartRatio"].Value = ObjCVarA_InvestmentCostCenters.PartRatio;
                        Com.Parameters["@Value"].Value = ObjCVarA_InvestmentCostCenters.Value;
                        EndTrans(Com, Con);
                        if (ObjCVarA_InvestmentCostCenters.ID == 0)
                        {
                            ObjCVarA_InvestmentCostCenters.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_InvestmentCostCenters.mIsChanges = false;
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
