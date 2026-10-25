using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated
{
    [Serializable]
    public class CPKApprovingA_PaymentRequestDetails_log
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
    public partial class CVarApprovingA_PaymentRequestDetails_log : CPKApprovingA_PaymentRequestDetails_log
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mDetailID;
        internal Int64 mHeaderID;
        internal String mHeaderCode;
        internal Int64 mPayableID;
        internal DateTime mDate;
        internal Int32 mUserID;
        internal String mNotes;
        #endregion

        #region "Methods"
        public Int64 DetailID
        {
            get { return mDetailID; }
            set { mIsChanges = true; mDetailID = value; }
        }
        public Int64 HeaderID
        {
            get { return mHeaderID; }
            set { mIsChanges = true; mHeaderID = value; }
        }
        public String HeaderCode
        {
            get { return mHeaderCode; }
            set { mIsChanges = true; mHeaderCode = value; }
        }
        public Int64 PayableID
        {
            get { return mPayableID; }
            set { mIsChanges = true; mPayableID = value; }
        }
        public DateTime Date
        {
            get { return mDate; }
            set { mIsChanges = true; mDate = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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

    public partial class CApprovingA_PaymentRequestDetails_log
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
        public List<CVarApprovingA_PaymentRequestDetails_log> lstCVarApprovingA_PaymentRequestDetails_log = new List<CVarApprovingA_PaymentRequestDetails_log>();
        public List<CPKApprovingA_PaymentRequestDetails_log> lstDeletedCPKApprovingA_PaymentRequestDetails_log = new List<CPKApprovingA_PaymentRequestDetails_log>();
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
            lstCVarApprovingA_PaymentRequestDetails_log.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListApprovingA_PaymentRequestDetails_log";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemApprovingA_PaymentRequestDetails_log";
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
                        CVarApprovingA_PaymentRequestDetails_log ObjCVarApprovingA_PaymentRequestDetails_log = new CVarApprovingA_PaymentRequestDetails_log();
                        ObjCVarApprovingA_PaymentRequestDetails_log.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mDetailID = Convert.ToInt64(dr["DetailID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mHeaderID = Convert.ToInt64(dr["HeaderID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mHeaderCode = Convert.ToString(dr["HeaderCode"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mNotes = Convert.ToString(dr["Notes"].ToString());
                        lstCVarApprovingA_PaymentRequestDetails_log.Add(ObjCVarApprovingA_PaymentRequestDetails_log);
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
            lstCVarApprovingA_PaymentRequestDetails_log.Clear();

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
                Com.CommandText = "[dbo].GetListPagingApprovingA_PaymentRequestDetails_log";
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
                        CVarApprovingA_PaymentRequestDetails_log ObjCVarApprovingA_PaymentRequestDetails_log = new CVarApprovingA_PaymentRequestDetails_log();
                        ObjCVarApprovingA_PaymentRequestDetails_log.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mDetailID = Convert.ToInt64(dr["DetailID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mHeaderID = Convert.ToInt64(dr["HeaderID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mHeaderCode = Convert.ToString(dr["HeaderCode"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mPayableID = Convert.ToInt64(dr["PayableID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mDate = Convert.ToDateTime(dr["Date"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarApprovingA_PaymentRequestDetails_log.mNotes = Convert.ToString(dr["Notes"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarApprovingA_PaymentRequestDetails_log.Add(ObjCVarApprovingA_PaymentRequestDetails_log);
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
                    Com.CommandText = "[dbo].DeleteListApprovingA_PaymentRequestDetails_log";
                else
                    Com.CommandText = "[dbo].UpdateListApprovingA_PaymentRequestDetails_log";
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
        public Exception DeleteItem(List<CPKApprovingA_PaymentRequestDetails_log> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemApprovingA_PaymentRequestDetails_log";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKApprovingA_PaymentRequestDetails_log ObjCPKApprovingA_PaymentRequestDetails_log in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKApprovingA_PaymentRequestDetails_log.ID);
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
        public Exception SaveMethod(List<CVarApprovingA_PaymentRequestDetails_log> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@DetailID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@HeaderID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@HeaderCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PayableID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarApprovingA_PaymentRequestDetails_log ObjCVarApprovingA_PaymentRequestDetails_log in SaveList)
                {
                    if (ObjCVarApprovingA_PaymentRequestDetails_log.mIsChanges == true)
                    {
                        if (ObjCVarApprovingA_PaymentRequestDetails_log.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemApprovingA_PaymentRequestDetails_log";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarApprovingA_PaymentRequestDetails_log.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemApprovingA_PaymentRequestDetails_log";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarApprovingA_PaymentRequestDetails_log.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarApprovingA_PaymentRequestDetails_log.ID;
                        }
                        Com.Parameters["@DetailID"].Value = ObjCVarApprovingA_PaymentRequestDetails_log.DetailID;
                        Com.Parameters["@HeaderID"].Value = ObjCVarApprovingA_PaymentRequestDetails_log.HeaderID;
                        Com.Parameters["@HeaderCode"].Value = ObjCVarApprovingA_PaymentRequestDetails_log.HeaderCode;
                        Com.Parameters["@PayableID"].Value = ObjCVarApprovingA_PaymentRequestDetails_log.PayableID;
                        Com.Parameters["@Date"].Value = ObjCVarApprovingA_PaymentRequestDetails_log.Date;
                        Com.Parameters["@UserID"].Value = ObjCVarApprovingA_PaymentRequestDetails_log.UserID;
                        Com.Parameters["@Notes"].Value = ObjCVarApprovingA_PaymentRequestDetails_log.Notes;
                        EndTrans(Com, Con);
                        if (ObjCVarApprovingA_PaymentRequestDetails_log.ID == 0)
                        {
                            ObjCVarApprovingA_PaymentRequestDetails_log.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarApprovingA_PaymentRequestDetails_log.mIsChanges = false;
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
