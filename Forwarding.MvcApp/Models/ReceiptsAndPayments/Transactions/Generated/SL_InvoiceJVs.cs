using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public class CPKSL_InvoiceJVs
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
    public partial class CVarSL_InvoiceJVs : CPKSL_InvoiceJVs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mForwarding_InvoiceID;
        internal Int64 mJVID1;
        internal Int64 mJVID2;
        internal Int64 mVoucherID;
        internal Int32 mVoucherType;
        #endregion

        #region "Methods"
        public Int64 Forwarding_InvoiceID
        {
            get { return mForwarding_InvoiceID; }
            set { mIsChanges = true; mForwarding_InvoiceID = value; }
        }
        public Int64 JVID1
        {
            get { return mJVID1; }
            set { mIsChanges = true; mJVID1 = value; }
        }
        public Int64 JVID2
        {
            get { return mJVID2; }
            set { mIsChanges = true; mJVID2 = value; }
        }
        public Int64 VoucherID
        {
            get { return mVoucherID; }
            set { mIsChanges = true; mVoucherID = value; }
        }
        public Int32 VoucherType
        {
            get { return mVoucherType; }
            set { mIsChanges = true; mVoucherType = value; }
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

    public partial class CSL_InvoiceJVs
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
        public List<CVarSL_InvoiceJVs> lstCVarSL_InvoiceJVs = new List<CVarSL_InvoiceJVs>();
        public List<CPKSL_InvoiceJVs> lstDeletedCPKSL_InvoiceJVs = new List<CPKSL_InvoiceJVs>();
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
            lstCVarSL_InvoiceJVs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_InvoiceJVs";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_InvoiceJVs";
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
                        CVarSL_InvoiceJVs ObjCVarSL_InvoiceJVs = new CVarSL_InvoiceJVs();
                        ObjCVarSL_InvoiceJVs.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_InvoiceJVs.mForwarding_InvoiceID = Convert.ToInt64(dr["Forwarding_InvoiceID"].ToString());
                        ObjCVarSL_InvoiceJVs.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarSL_InvoiceJVs.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarSL_InvoiceJVs.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarSL_InvoiceJVs.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        lstCVarSL_InvoiceJVs.Add(ObjCVarSL_InvoiceJVs);
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
            lstCVarSL_InvoiceJVs.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_InvoiceJVs";
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
                        CVarSL_InvoiceJVs ObjCVarSL_InvoiceJVs = new CVarSL_InvoiceJVs();
                        ObjCVarSL_InvoiceJVs.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_InvoiceJVs.mForwarding_InvoiceID = Convert.ToInt64(dr["Forwarding_InvoiceID"].ToString());
                        ObjCVarSL_InvoiceJVs.mJVID1 = Convert.ToInt64(dr["JVID1"].ToString());
                        ObjCVarSL_InvoiceJVs.mJVID2 = Convert.ToInt64(dr["JVID2"].ToString());
                        ObjCVarSL_InvoiceJVs.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarSL_InvoiceJVs.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_InvoiceJVs.Add(ObjCVarSL_InvoiceJVs);
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
                    Com.CommandText = "[dbo].DeleteListSL_InvoiceJVs";
                else
                    Com.CommandText = "[dbo].UpdateListSL_InvoiceJVs";
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
        public Exception DeleteItem(List<CPKSL_InvoiceJVs> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_InvoiceJVs";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKSL_InvoiceJVs ObjCPKSL_InvoiceJVs in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKSL_InvoiceJVs.ID);
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
        public Exception SaveMethod(List<CVarSL_InvoiceJVs> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Forwarding_InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@JVID1", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@JVID2", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@VoucherID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@VoucherType", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_InvoiceJVs ObjCVarSL_InvoiceJVs in SaveList)
                {
                    if (ObjCVarSL_InvoiceJVs.mIsChanges == true)
                    {
                        if (ObjCVarSL_InvoiceJVs.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_InvoiceJVs";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_InvoiceJVs.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_InvoiceJVs";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_InvoiceJVs.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_InvoiceJVs.ID;
                        }
                        Com.Parameters["@Forwarding_InvoiceID"].Value = ObjCVarSL_InvoiceJVs.Forwarding_InvoiceID;
                        Com.Parameters["@JVID1"].Value = ObjCVarSL_InvoiceJVs.JVID1;
                        Com.Parameters["@JVID2"].Value = ObjCVarSL_InvoiceJVs.JVID2;
                        Com.Parameters["@VoucherID"].Value = ObjCVarSL_InvoiceJVs.VoucherID;
                        Com.Parameters["@VoucherType"].Value = ObjCVarSL_InvoiceJVs.VoucherType;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_InvoiceJVs.ID == 0)
                        {
                            ObjCVarSL_InvoiceJVs.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_InvoiceJVs.mIsChanges = false;
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
