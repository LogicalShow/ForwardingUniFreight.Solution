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
    public class CPKLinkYardLinkTankForwCreditNote
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
    public partial class CVarLinkYardLinkTankForwCreditNote : CPKLinkYardLinkTankForwCreditNote
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mForwCreditID;
        internal Int32 mYardCreditID;
        internal Int32 mUserID;
        #endregion

        #region "Methods"
        public Int32 ForwCreditID
        {
            get { return mForwCreditID; }
            set { mIsChanges = true; mForwCreditID = value; }
        }
        public Int32 YardCreditID
        {
            get { return mYardCreditID; }
            set { mIsChanges = true; mYardCreditID = value; }
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

    public partial class CLinkYardLinkTankForwCreditNote
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
        public List<CVarLinkYardLinkTankForwCreditNote> lstCVarLinkYardLinkTankForwCreditNote = new List<CVarLinkYardLinkTankForwCreditNote>();
        public List<CPKLinkYardLinkTankForwCreditNote> lstDeletedCPKLinkYardLinkTankForwCreditNote = new List<CPKLinkYardLinkTankForwCreditNote>();
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
            lstCVarLinkYardLinkTankForwCreditNote.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLinkYardLinkTankForwCreditNote";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLinkYardLinkTankForwCreditNote";
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
                        CVarLinkYardLinkTankForwCreditNote ObjCVarLinkYardLinkTankForwCreditNote = new CVarLinkYardLinkTankForwCreditNote();
                        ObjCVarLinkYardLinkTankForwCreditNote.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLinkYardLinkTankForwCreditNote.mForwCreditID = Convert.ToInt32(dr["ForwCreditID"].ToString());
                        ObjCVarLinkYardLinkTankForwCreditNote.mYardCreditID = Convert.ToInt32(dr["YardCreditID"].ToString());
                        ObjCVarLinkYardLinkTankForwCreditNote.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        lstCVarLinkYardLinkTankForwCreditNote.Add(ObjCVarLinkYardLinkTankForwCreditNote);
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
            lstCVarLinkYardLinkTankForwCreditNote.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLinkYardLinkTankForwCreditNote";
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
                        CVarLinkYardLinkTankForwCreditNote ObjCVarLinkYardLinkTankForwCreditNote = new CVarLinkYardLinkTankForwCreditNote();
                        ObjCVarLinkYardLinkTankForwCreditNote.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLinkYardLinkTankForwCreditNote.mForwCreditID = Convert.ToInt32(dr["ForwCreditID"].ToString());
                        ObjCVarLinkYardLinkTankForwCreditNote.mYardCreditID = Convert.ToInt32(dr["YardCreditID"].ToString());
                        ObjCVarLinkYardLinkTankForwCreditNote.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLinkYardLinkTankForwCreditNote.Add(ObjCVarLinkYardLinkTankForwCreditNote);
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
                    Com.CommandText = "[dbo].DeleteListLinkYardLinkTankForwCreditNote";
                else
                    Com.CommandText = "[dbo].UpdateListLinkYardLinkTankForwCreditNote";
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
        public Exception DeleteItem(List<CPKLinkYardLinkTankForwCreditNote> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLinkYardLinkTankForwCreditNote";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLinkYardLinkTankForwCreditNote ObjCPKLinkYardLinkTankForwCreditNote in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLinkYardLinkTankForwCreditNote.ID);
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
        public Exception SaveMethod(List<CVarLinkYardLinkTankForwCreditNote> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ForwCreditID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@YardCreditID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLinkYardLinkTankForwCreditNote ObjCVarLinkYardLinkTankForwCreditNote in SaveList)
                {
                    if (ObjCVarLinkYardLinkTankForwCreditNote.mIsChanges == true)
                    {
                        if (ObjCVarLinkYardLinkTankForwCreditNote.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLinkYardLinkTankForwCreditNote";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLinkYardLinkTankForwCreditNote.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLinkYardLinkTankForwCreditNote";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLinkYardLinkTankForwCreditNote.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLinkYardLinkTankForwCreditNote.ID;
                        }
                        Com.Parameters["@ForwCreditID"].Value = ObjCVarLinkYardLinkTankForwCreditNote.ForwCreditID;
                        Com.Parameters["@YardCreditID"].Value = ObjCVarLinkYardLinkTankForwCreditNote.YardCreditID;
                        Com.Parameters["@UserID"].Value = ObjCVarLinkYardLinkTankForwCreditNote.UserID;
                        EndTrans(Com, Con);
                        if (ObjCVarLinkYardLinkTankForwCreditNote.ID == 0)
                        {
                            ObjCVarLinkYardLinkTankForwCreditNote.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLinkYardLinkTankForwCreditNote.mIsChanges = false;
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
