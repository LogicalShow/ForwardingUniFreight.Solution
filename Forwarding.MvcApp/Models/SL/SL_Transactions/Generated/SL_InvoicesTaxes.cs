using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SL.SL_Transactions.Generated
{
    [Serializable]
    public class CPKSL_InvoicesTaxes
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
    public partial class CVarSL_InvoicesTaxes : CPKSL_InvoicesTaxes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTaxID;
        internal Decimal mTaxValue;
        internal Decimal mTaxAmount;
        internal Int64 mInvoiceID;
        internal Boolean mIsPercentage;
        #endregion

        #region "Methods"
        public Int32 TaxID
        {
            get { return mTaxID; }
            set { mIsChanges = true; mTaxID = value; }
        }
        public Decimal TaxValue
        {
            get { return mTaxValue; }
            set { mIsChanges = true; mTaxValue = value; }
        }
        public Decimal TaxAmount
        {
            get { return mTaxAmount; }
            set { mIsChanges = true; mTaxAmount = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Boolean IsPercentage
        {
            get { return mIsPercentage; }
            set { mIsChanges = true; mIsPercentage = value; }
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

    public partial class CSL_InvoicesTaxes
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
        public List<CVarSL_InvoicesTaxes> lstCVarSL_InvoicesTaxes = new List<CVarSL_InvoicesTaxes>();
        public List<CPKSL_InvoicesTaxes> lstDeletedCPKSL_InvoicesTaxes = new List<CPKSL_InvoicesTaxes>();
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
            lstCVarSL_InvoicesTaxes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_InvoicesTaxes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_InvoicesTaxes";
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
                        CVarSL_InvoicesTaxes ObjCVarSL_InvoicesTaxes = new CVarSL_InvoicesTaxes();
                        ObjCVarSL_InvoicesTaxes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_InvoicesTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarSL_InvoicesTaxes.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarSL_InvoicesTaxes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarSL_InvoicesTaxes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarSL_InvoicesTaxes.mIsPercentage = Convert.ToBoolean(dr["IsPercentage"].ToString());
                        lstCVarSL_InvoicesTaxes.Add(ObjCVarSL_InvoicesTaxes);
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
            lstCVarSL_InvoicesTaxes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_InvoicesTaxes";
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
                        CVarSL_InvoicesTaxes ObjCVarSL_InvoicesTaxes = new CVarSL_InvoicesTaxes();
                        ObjCVarSL_InvoicesTaxes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_InvoicesTaxes.mTaxID = Convert.ToInt32(dr["TaxID"].ToString());
                        ObjCVarSL_InvoicesTaxes.mTaxValue = Convert.ToDecimal(dr["TaxValue"].ToString());
                        ObjCVarSL_InvoicesTaxes.mTaxAmount = Convert.ToDecimal(dr["TaxAmount"].ToString());
                        ObjCVarSL_InvoicesTaxes.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarSL_InvoicesTaxes.mIsPercentage = Convert.ToBoolean(dr["IsPercentage"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_InvoicesTaxes.Add(ObjCVarSL_InvoicesTaxes);
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
                    Com.CommandText = "[dbo].DeleteListSL_InvoicesTaxes";
                else
                    Com.CommandText = "[dbo].UpdateListSL_InvoicesTaxes";
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
        public Exception DeleteItem(List<CPKSL_InvoicesTaxes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_InvoicesTaxes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSL_InvoicesTaxes ObjCPKSL_InvoicesTaxes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSL_InvoicesTaxes.ID);
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
        public Exception SaveMethod(List<CVarSL_InvoicesTaxes> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TaxID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxValue", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TaxAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsPercentage", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_InvoicesTaxes ObjCVarSL_InvoicesTaxes in SaveList)
                {
                    if (ObjCVarSL_InvoicesTaxes.mIsChanges == true)
                    {
                        if (ObjCVarSL_InvoicesTaxes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_InvoicesTaxes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_InvoicesTaxes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_InvoicesTaxes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_InvoicesTaxes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_InvoicesTaxes.ID;
                        }
                        Com.Parameters["@TaxID"].Value = ObjCVarSL_InvoicesTaxes.TaxID;
                        Com.Parameters["@TaxValue"].Value = ObjCVarSL_InvoicesTaxes.TaxValue;
                        Com.Parameters["@TaxAmount"].Value = ObjCVarSL_InvoicesTaxes.TaxAmount;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarSL_InvoicesTaxes.InvoiceID;
                        Com.Parameters["@IsPercentage"].Value = ObjCVarSL_InvoicesTaxes.IsPercentage;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_InvoicesTaxes.ID == 0)
                        {
                            ObjCVarSL_InvoicesTaxes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_InvoicesTaxes.mIsChanges = false;
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
