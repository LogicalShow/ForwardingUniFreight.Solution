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
    public class CPKA_AllocationCreditNote
    {
        #region "variables"
        private Decimal mID;
        #endregion

        #region "Methods"
        public Decimal ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarA_AllocationCreditNote : CPKA_AllocationCreditNote
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mCreditID;
        internal Int64 mVoucherID;
        internal Int32 mVoucherType;
        #endregion

        #region "Methods"
        public Int64 CreditID
        {
            get { return mCreditID; }
            set { mIsChanges = true; mCreditID = value; }
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

    public partial class CA_AllocationCreditNote
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
        public List<CVarA_AllocationCreditNote> lstCVarA_AllocationCreditNote = new List<CVarA_AllocationCreditNote>();
        public List<CPKA_AllocationCreditNote> lstDeletedCPKA_AllocationCreditNote = new List<CPKA_AllocationCreditNote>();
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
        public Exception GetItem(Decimal ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_AllocationCreditNote.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_AllocationCreditNote";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_AllocationCreditNote";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal));
                    Com.Parameters[0].Value = Convert.ToDecimal(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarA_AllocationCreditNote ObjCVarA_AllocationCreditNote = new CVarA_AllocationCreditNote();
                        ObjCVarA_AllocationCreditNote.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarA_AllocationCreditNote.mCreditID = Convert.ToInt64(dr["CreditID"].ToString());
                        ObjCVarA_AllocationCreditNote.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarA_AllocationCreditNote.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        lstCVarA_AllocationCreditNote.Add(ObjCVarA_AllocationCreditNote);
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
            lstCVarA_AllocationCreditNote.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_AllocationCreditNote";
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
                        CVarA_AllocationCreditNote ObjCVarA_AllocationCreditNote = new CVarA_AllocationCreditNote();
                        ObjCVarA_AllocationCreditNote.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarA_AllocationCreditNote.mCreditID = Convert.ToInt64(dr["CreditID"].ToString());
                        ObjCVarA_AllocationCreditNote.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarA_AllocationCreditNote.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_AllocationCreditNote.Add(ObjCVarA_AllocationCreditNote);
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
                    Com.CommandText = "[dbo].DeleteListA_AllocationCreditNote";
                else
                    Com.CommandText = "[dbo].UpdateListA_AllocationCreditNote";
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
        public Exception DeleteItem(List<CPKA_AllocationCreditNote> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_AllocationCreditNote";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal));
                foreach (CPKA_AllocationCreditNote ObjCPKA_AllocationCreditNote in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToDecimal(ObjCPKA_AllocationCreditNote.ID);
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
        public Exception SaveMethod(List<CVarA_AllocationCreditNote> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CreditID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@VoucherID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@VoucherType", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal, 17, ParameterDirection.Input, false, 18, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_AllocationCreditNote ObjCVarA_AllocationCreditNote in SaveList)
                {
                    if (ObjCVarA_AllocationCreditNote.mIsChanges == true)
                    {
                        if (ObjCVarA_AllocationCreditNote.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_AllocationCreditNote";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_AllocationCreditNote.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_AllocationCreditNote";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_AllocationCreditNote.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_AllocationCreditNote.ID;
                        }
                        Com.Parameters["@CreditID"].Value = ObjCVarA_AllocationCreditNote.CreditID;
                        Com.Parameters["@VoucherID"].Value = ObjCVarA_AllocationCreditNote.VoucherID;
                        Com.Parameters["@VoucherType"].Value = ObjCVarA_AllocationCreditNote.VoucherType;
                        EndTrans(Com, Con);
                        if (ObjCVarA_AllocationCreditNote.ID == 0)
                        {
                            ObjCVarA_AllocationCreditNote.ID = Convert.ToDecimal(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_AllocationCreditNote.mIsChanges = false;
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
