using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.Sales.Transactions.Generated.Payments.Generated;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public class CPKA_ExchangeMovement
    {
        #region "variables"
        private Int32 mid;
        #endregion

        #region "Methods"
        public Int32 id
        {
            get { return mid; }
            set { mid = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarA_ExchangeMovement : CPKA_ExchangeMovement
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mvoucherID;
        internal String mnotes;
        internal Boolean mIsAccept;
        #endregion

        #region "Methods"
        public Int64 voucherID
        {
            get { return mvoucherID; }
            set { mIsChanges = true; mvoucherID = value; }
        }
        public String notes
        {
            get { return mnotes; }
            set { mIsChanges = true; mnotes = value; }
        }
        public Boolean IsAccept
        {
            get { return mIsAccept; }
            set { mIsChanges = true; mIsAccept = value; }
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

    public partial class CA_ExchangeMovement
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
        public List<CVarA_ExchangeMovement> lstCVarA_ExchangeMovement = new List<CVarA_ExchangeMovement>();
        public List<CPKA_ExchangeMovement> lstDeletedCPKA_ExchangeMovement = new List<CPKA_ExchangeMovement>();
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
        public Exception GetItem(Int32 id)
        {
            return DataFill(Convert.ToString(id), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_ExchangeMovement.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_ExchangeMovement";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_ExchangeMovement";
                    Com.Parameters.Add(new SqlParameter("@id", SqlDbType.Int));
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
                        CVarA_ExchangeMovement ObjCVarA_ExchangeMovement = new CVarA_ExchangeMovement();
                        ObjCVarA_ExchangeMovement.id = Convert.ToInt32(dr["id"].ToString());
                        ObjCVarA_ExchangeMovement.mvoucherID = Convert.ToInt64(dr["voucherID"].ToString());
                        ObjCVarA_ExchangeMovement.mnotes = Convert.ToString(dr["notes"].ToString());
                        ObjCVarA_ExchangeMovement.mIsAccept = Convert.ToBoolean(dr["IsAccept"].ToString());
                        lstCVarA_ExchangeMovement.Add(ObjCVarA_ExchangeMovement);
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
            lstCVarA_ExchangeMovement.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_ExchangeMovement";
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
                        CVarA_ExchangeMovement ObjCVarA_ExchangeMovement = new CVarA_ExchangeMovement();
                        ObjCVarA_ExchangeMovement.id = Convert.ToInt32(dr["id"].ToString());
                        ObjCVarA_ExchangeMovement.mvoucherID = Convert.ToInt64(dr["voucherID"].ToString());
                        ObjCVarA_ExchangeMovement.mnotes = Convert.ToString(dr["notes"].ToString());
                        ObjCVarA_ExchangeMovement.mIsAccept = Convert.ToBoolean(dr["IsAccept"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_ExchangeMovement.Add(ObjCVarA_ExchangeMovement);
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
                    Com.CommandText = "[dbo].DeleteListA_ExchangeMovement";
                else
                    Com.CommandText = "[dbo].UpdateListA_ExchangeMovement";
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
        public Exception DeleteItem(List<CPKA_ExchangeMovement> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_ExchangeMovement";
                Com.Parameters.Add(new SqlParameter("@id", SqlDbType.Int));
                foreach (CPKA_ExchangeMovement ObjCPKA_ExchangeMovement in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_ExchangeMovement.id);
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
        public Exception SaveMethod(List<CVarA_ExchangeMovement> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@voucherID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@notes", SqlDbType.Text));
                Com.Parameters.Add(new SqlParameter("@IsAccept", SqlDbType.Bit));
                SqlParameter paraid = Com.Parameters.Add(new SqlParameter("@id", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "id", DataRowVersion.Default, null));
                foreach (CVarA_ExchangeMovement ObjCVarA_ExchangeMovement in SaveList)
                {
                    if (ObjCVarA_ExchangeMovement.mIsChanges == true)
                    {
                        if (ObjCVarA_ExchangeMovement.id == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_ExchangeMovement";
                            paraid.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_ExchangeMovement.id != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_ExchangeMovement";
                            paraid.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_ExchangeMovement.id != 0)
                        {
                            Com.Parameters["@id"].Value = ObjCVarA_ExchangeMovement.id;
                        }
                        Com.Parameters["@voucherID"].Value = ObjCVarA_ExchangeMovement.voucherID;
                        Com.Parameters["@notes"].Value = ObjCVarA_ExchangeMovement.notes;
                        Com.Parameters["@IsAccept"].Value = ObjCVarA_ExchangeMovement.IsAccept;
                        EndTrans(Com, Con);
                        if (ObjCVarA_ExchangeMovement.id == 0)
                        {
                            ObjCVarA_ExchangeMovement.id = Convert.ToInt32(Com.Parameters["@id"].Value);
                        }
                        ObjCVarA_ExchangeMovement.mIsChanges = false;
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
