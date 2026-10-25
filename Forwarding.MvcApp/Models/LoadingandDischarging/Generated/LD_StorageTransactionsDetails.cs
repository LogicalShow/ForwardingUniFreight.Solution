using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.LoadingandDischarging.Generated
{
    [Serializable]
    public class CPKLD_StorageTransactionsDetails
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
    public partial class CVarLD_StorageTransactionsDetails : CPKLD_StorageTransactionsDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTransID;
        internal Decimal mQty;
        internal DateTime mTransDate;
        internal String mNotes;
        #endregion

        #region "Methods"
        public Int32 TransID
        {
            get { return mTransID; }
            set { mIsChanges = true; mTransID = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mIsChanges = true; mQty = value; }
        }
        public DateTime TransDate
        {
            get { return mTransDate; }
            set { mIsChanges = true; mTransDate = value; }
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

    public partial class CLD_StorageTransactionsDetails
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
        public List<CVarLD_StorageTransactionsDetails> lstCVarLD_StorageTransactionsDetails = new List<CVarLD_StorageTransactionsDetails>();
        public List<CPKLD_StorageTransactionsDetails> lstDeletedCPKLD_StorageTransactionsDetails = new List<CPKLD_StorageTransactionsDetails>();
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
            lstCVarLD_StorageTransactionsDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListLD_StorageTransactionsDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLD_StorageTransactionsDetails";
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
                        CVarLD_StorageTransactionsDetails ObjCVarLD_StorageTransactionsDetails = new CVarLD_StorageTransactionsDetails();
                        ObjCVarLD_StorageTransactionsDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLD_StorageTransactionsDetails.mTransID = Convert.ToInt32(dr["TransID"].ToString());
                        ObjCVarLD_StorageTransactionsDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarLD_StorageTransactionsDetails.mTransDate = Convert.ToDateTime(dr["TransDate"].ToString());
                        ObjCVarLD_StorageTransactionsDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        lstCVarLD_StorageTransactionsDetails.Add(ObjCVarLD_StorageTransactionsDetails);
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
            lstCVarLD_StorageTransactionsDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLD_StorageTransactionsDetails";
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
                        CVarLD_StorageTransactionsDetails ObjCVarLD_StorageTransactionsDetails = new CVarLD_StorageTransactionsDetails();
                        ObjCVarLD_StorageTransactionsDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarLD_StorageTransactionsDetails.mTransID = Convert.ToInt32(dr["TransID"].ToString());
                        ObjCVarLD_StorageTransactionsDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarLD_StorageTransactionsDetails.mTransDate = Convert.ToDateTime(dr["TransDate"].ToString());
                        ObjCVarLD_StorageTransactionsDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLD_StorageTransactionsDetails.Add(ObjCVarLD_StorageTransactionsDetails);
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
                    Com.CommandText = "[dbo].DeleteListLD_StorageTransactionsDetails";
                else
                    Com.CommandText = "[dbo].UpdateListLD_StorageTransactionsDetails";
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
        public Exception DeleteItem(List<CPKLD_StorageTransactionsDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLD_StorageTransactionsDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKLD_StorageTransactionsDetails ObjCPKLD_StorageTransactionsDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLD_StorageTransactionsDetails.ID);
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
        public Exception SaveMethod(List<CVarLD_StorageTransactionsDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TransID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@TransDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarLD_StorageTransactionsDetails ObjCVarLD_StorageTransactionsDetails in SaveList)
                {
                    if (ObjCVarLD_StorageTransactionsDetails.mIsChanges == true)
                    {
                        if (ObjCVarLD_StorageTransactionsDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLD_StorageTransactionsDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLD_StorageTransactionsDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLD_StorageTransactionsDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLD_StorageTransactionsDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarLD_StorageTransactionsDetails.ID;
                        }
                        Com.Parameters["@TransID"].Value = ObjCVarLD_StorageTransactionsDetails.TransID;
                        Com.Parameters["@Qty"].Value = ObjCVarLD_StorageTransactionsDetails.Qty;
                        Com.Parameters["@TransDate"].Value = ObjCVarLD_StorageTransactionsDetails.TransDate;
                        Com.Parameters["@Notes"].Value = ObjCVarLD_StorageTransactionsDetails.Notes;
                        EndTrans(Com, Con);
                        if (ObjCVarLD_StorageTransactionsDetails.ID == 0)
                        {
                            ObjCVarLD_StorageTransactionsDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarLD_StorageTransactionsDetails.mIsChanges = false;
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