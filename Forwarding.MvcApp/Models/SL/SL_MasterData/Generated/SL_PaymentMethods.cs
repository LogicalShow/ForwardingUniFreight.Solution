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
    public class CPKSL_PaymentMethods
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
    public partial class CVarSL_PaymentMethods : CPKSL_PaymentMethods
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mPaymentMethodNameA;
        internal String mPaymentMethodNameE;
        internal Int32 mPaymentTime;
        internal Int32 mInstallmensCount;
        #endregion

        #region "Methods"
        public String PaymentMethodNameA
        {
            get { return mPaymentMethodNameA; }
            set { mIsChanges = true; mPaymentMethodNameA = value; }
        }
        public String PaymentMethodNameE
        {
            get { return mPaymentMethodNameE; }
            set { mIsChanges = true; mPaymentMethodNameE = value; }
        }
        public Int32 PaymentTime
        {
            get { return mPaymentTime; }
            set { mIsChanges = true; mPaymentTime = value; }
        }
        public Int32 InstallmensCount
        {
            get { return mInstallmensCount; }
            set { mIsChanges = true; mInstallmensCount = value; }
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

    public partial class CSL_PaymentMethods
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
        public List<CVarSL_PaymentMethods> lstCVarSL_PaymentMethods = new List<CVarSL_PaymentMethods>();
        public List<CPKSL_PaymentMethods> lstDeletedCPKSL_PaymentMethods = new List<CPKSL_PaymentMethods>();
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
            lstCVarSL_PaymentMethods.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_PaymentMethods";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_PaymentMethods";
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
                        CVarSL_PaymentMethods ObjCVarSL_PaymentMethods = new CVarSL_PaymentMethods();
                        ObjCVarSL_PaymentMethods.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_PaymentMethods.mPaymentMethodNameA = Convert.ToString(dr["PaymentMethodNameA"].ToString());
                        ObjCVarSL_PaymentMethods.mPaymentMethodNameE = Convert.ToString(dr["PaymentMethodNameE"].ToString());
                        ObjCVarSL_PaymentMethods.mPaymentTime = Convert.ToInt32(dr["PaymentTime"].ToString());
                        ObjCVarSL_PaymentMethods.mInstallmensCount = Convert.ToInt32(dr["InstallmensCount"].ToString());
                        lstCVarSL_PaymentMethods.Add(ObjCVarSL_PaymentMethods);
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
            lstCVarSL_PaymentMethods.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_PaymentMethods";
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
                        CVarSL_PaymentMethods ObjCVarSL_PaymentMethods = new CVarSL_PaymentMethods();
                        ObjCVarSL_PaymentMethods.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_PaymentMethods.mPaymentMethodNameA = Convert.ToString(dr["PaymentMethodNameA"].ToString());
                        ObjCVarSL_PaymentMethods.mPaymentMethodNameE = Convert.ToString(dr["PaymentMethodNameE"].ToString());
                        ObjCVarSL_PaymentMethods.mPaymentTime = Convert.ToInt32(dr["PaymentTime"].ToString());
                        ObjCVarSL_PaymentMethods.mInstallmensCount = Convert.ToInt32(dr["InstallmensCount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_PaymentMethods.Add(ObjCVarSL_PaymentMethods);
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
                    Com.CommandText = "[dbo].DeleteListSL_PaymentMethods";
                else
                    Com.CommandText = "[dbo].UpdateListSL_PaymentMethods";
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
        public Exception DeleteItem(List<CPKSL_PaymentMethods> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_PaymentMethods";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSL_PaymentMethods ObjCPKSL_PaymentMethods in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSL_PaymentMethods.ID);
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
        public Exception SaveMethod(List<CVarSL_PaymentMethods> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PaymentMethodNameA", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PaymentMethodNameE", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PaymentTime", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InstallmensCount", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_PaymentMethods ObjCVarSL_PaymentMethods in SaveList)
                {
                    if (ObjCVarSL_PaymentMethods.mIsChanges == true)
                    {
                        if (ObjCVarSL_PaymentMethods.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_PaymentMethods";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_PaymentMethods.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_PaymentMethods";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_PaymentMethods.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_PaymentMethods.ID;
                        }
                        Com.Parameters["@PaymentMethodNameA"].Value = ObjCVarSL_PaymentMethods.PaymentMethodNameA;
                        Com.Parameters["@PaymentMethodNameE"].Value = ObjCVarSL_PaymentMethods.PaymentMethodNameE;
                        Com.Parameters["@PaymentTime"].Value = ObjCVarSL_PaymentMethods.PaymentTime;
                        Com.Parameters["@InstallmensCount"].Value = ObjCVarSL_PaymentMethods.InstallmensCount;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_PaymentMethods.ID == 0)
                        {
                            ObjCVarSL_PaymentMethods.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_PaymentMethods.mIsChanges = false;
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
