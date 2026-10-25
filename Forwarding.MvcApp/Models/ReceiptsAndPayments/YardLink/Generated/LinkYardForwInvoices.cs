using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLink.Generated
{
    [Serializable]
    public class CPKLinkYardForwInvoices
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
    public partial class CVarLinkYardForwInvoices : CPKLinkYardForwInvoices
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mForwInvoiceID;
        internal Int32 mYardInvoiceID;
        internal Int32 mUserID;
        #endregion

        #region "Methods"
        public Int32 ForwInvoiceID
        {
            get { return mForwInvoiceID; }
            set { mIsChanges = true; mForwInvoiceID = value; }
        }
        public Int32 YardInvoiceID
        {
            get { return mYardInvoiceID; }
            set { mIsChanges = true; mYardInvoiceID = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
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

    public partial class CLinkYardForwInvoices
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
        public List<CVarLinkYardForwInvoices> lstCVarLinkYardForwInvoices = new List<CVarLinkYardForwInvoices>();
        public List<CPKLinkYardForwInvoices> lstDeletedCPKLinkYardForwInvoices = new List<CPKLinkYardForwInvoices>();
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
            lstCVarLinkYardForwInvoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLinkYardForwInvoices";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLinkYardForwInvoices";
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
                        CVarLinkYardForwInvoices ObjCVarLinkYardForwInvoices = new CVarLinkYardForwInvoices();
                        ObjCVarLinkYardForwInvoices.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLinkYardForwInvoices.mForwInvoiceID = Convert.ToInt32(dr["ForwInvoiceID"].ToString());
                        ObjCVarLinkYardForwInvoices.mYardInvoiceID = Convert.ToInt32(dr["YardInvoiceID"].ToString());
                        ObjCVarLinkYardForwInvoices.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        lstCVarLinkYardForwInvoices.Add(ObjCVarLinkYardForwInvoices);
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
            lstCVarLinkYardForwInvoices.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLinkYardForwInvoices";
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
                        CVarLinkYardForwInvoices ObjCVarLinkYardForwInvoices = new CVarLinkYardForwInvoices();
                        ObjCVarLinkYardForwInvoices.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLinkYardForwInvoices.mForwInvoiceID = Convert.ToInt32(dr["ForwInvoiceID"].ToString());
                        ObjCVarLinkYardForwInvoices.mYardInvoiceID = Convert.ToInt32(dr["YardInvoiceID"].ToString());
                        ObjCVarLinkYardForwInvoices.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLinkYardForwInvoices.Add(ObjCVarLinkYardForwInvoices);
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
                    Com.CommandText = "[dbo].DeleteListLinkYardForwInvoices";
                else
                    Com.CommandText = "[dbo].UpdateListLinkYardForwInvoices";
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
        public Exception DeleteItem(List<CPKLinkYardForwInvoices> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLinkYardForwInvoices";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLinkYardForwInvoices ObjCPKLinkYardForwInvoices in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLinkYardForwInvoices.ID);
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
        public Exception SaveMethod(List<CVarLinkYardForwInvoices> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ForwInvoiceID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@YardInvoiceID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLinkYardForwInvoices ObjCVarLinkYardForwInvoices in SaveList)
                {
                    if (ObjCVarLinkYardForwInvoices.mIsChanges == true)
                    {
                        if (ObjCVarLinkYardForwInvoices.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLinkYardForwInvoices";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLinkYardForwInvoices.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLinkYardForwInvoices";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLinkYardForwInvoices.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLinkYardForwInvoices.ID;
                        }
                        Com.Parameters["@ForwInvoiceID"].Value = ObjCVarLinkYardForwInvoices.ForwInvoiceID;
                        Com.Parameters["@YardInvoiceID"].Value = ObjCVarLinkYardForwInvoices.YardInvoiceID;
                        Com.Parameters["@UserID"].Value = ObjCVarLinkYardForwInvoices.UserID;
                        EndTrans(Com, Con);
                        if (ObjCVarLinkYardForwInvoices.ID == 0)
                        {
                            ObjCVarLinkYardForwInvoices.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLinkYardForwInvoices.mIsChanges = false;
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
