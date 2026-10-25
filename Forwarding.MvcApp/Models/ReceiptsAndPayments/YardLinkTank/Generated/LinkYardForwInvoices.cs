using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLinkTank.Generated
{
    [Serializable]
    public class CPKLinkYardLinkTankForwInvoices
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
    public partial class CVarLinkYardLinkTankForwInvoices : CPKLinkYardLinkTankForwInvoices
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

    public partial class CLinkYardLinkTankForwInvoices
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
        public List<CVarLinkYardLinkTankForwInvoices> lstCVarLinkYardLinkTankForwInvoices = new List<CVarLinkYardLinkTankForwInvoices>();
        public List<CPKLinkYardLinkTankForwInvoices> lstDeletedCPKLinkYardLinkTankForwInvoices = new List<CPKLinkYardLinkTankForwInvoices>();
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
            lstCVarLinkYardLinkTankForwInvoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLinkYardLinkTankForwInvoices";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLinkYardLinkTankForwInvoices";
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
                        CVarLinkYardLinkTankForwInvoices ObjCVarLinkYardLinkTankForwInvoices = new CVarLinkYardLinkTankForwInvoices();
                        ObjCVarLinkYardLinkTankForwInvoices.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLinkYardLinkTankForwInvoices.mForwInvoiceID = Convert.ToInt32(dr["ForwInvoiceID"].ToString());
                        ObjCVarLinkYardLinkTankForwInvoices.mYardInvoiceID = Convert.ToInt32(dr["YardInvoiceID"].ToString());
                        ObjCVarLinkYardLinkTankForwInvoices.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        lstCVarLinkYardLinkTankForwInvoices.Add(ObjCVarLinkYardLinkTankForwInvoices);
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
            lstCVarLinkYardLinkTankForwInvoices.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLinkYardLinkTankForwInvoices";
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
                        CVarLinkYardLinkTankForwInvoices ObjCVarLinkYardLinkTankForwInvoices = new CVarLinkYardLinkTankForwInvoices();
                        ObjCVarLinkYardLinkTankForwInvoices.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLinkYardLinkTankForwInvoices.mForwInvoiceID = Convert.ToInt32(dr["ForwInvoiceID"].ToString());
                        ObjCVarLinkYardLinkTankForwInvoices.mYardInvoiceID = Convert.ToInt32(dr["YardInvoiceID"].ToString());
                        ObjCVarLinkYardLinkTankForwInvoices.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLinkYardLinkTankForwInvoices.Add(ObjCVarLinkYardLinkTankForwInvoices);
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
                    Com.CommandText = "[dbo].DeleteListLinkYardLinkTankForwInvoices";
                else
                    Com.CommandText = "[dbo].UpdateListLinkYardLinkTankForwInvoices";
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
        public Exception DeleteItem(List<CPKLinkYardLinkTankForwInvoices> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLinkYardLinkTankForwInvoices";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLinkYardLinkTankForwInvoices ObjCPKLinkYardLinkTankForwInvoices in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLinkYardLinkTankForwInvoices.ID);
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
        public Exception SaveMethod(List<CVarLinkYardLinkTankForwInvoices> SaveList)
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
                foreach (CVarLinkYardLinkTankForwInvoices ObjCVarLinkYardLinkTankForwInvoices in SaveList)
                {
                    if (ObjCVarLinkYardLinkTankForwInvoices.mIsChanges == true)
                    {
                        if (ObjCVarLinkYardLinkTankForwInvoices.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLinkYardLinkTankForwInvoices";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLinkYardLinkTankForwInvoices.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLinkYardLinkTankForwInvoices";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLinkYardLinkTankForwInvoices.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLinkYardLinkTankForwInvoices.ID;
                        }
                        Com.Parameters["@ForwInvoiceID"].Value = ObjCVarLinkYardLinkTankForwInvoices.ForwInvoiceID;
                        Com.Parameters["@YardInvoiceID"].Value = ObjCVarLinkYardLinkTankForwInvoices.YardInvoiceID;
                        Com.Parameters["@UserID"].Value = ObjCVarLinkYardLinkTankForwInvoices.UserID;
                        EndTrans(Com, Con);
                        if (ObjCVarLinkYardLinkTankForwInvoices.ID == 0)
                        {
                            ObjCVarLinkYardLinkTankForwInvoices.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLinkYardLinkTankForwInvoices.mIsChanges = false;
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
