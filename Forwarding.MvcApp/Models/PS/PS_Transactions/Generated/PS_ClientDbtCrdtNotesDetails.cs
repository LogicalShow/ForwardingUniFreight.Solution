using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKPS_ClientDbtCrdtNotesDetails
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
    public partial class CVarPS_ClientDbtCrdtNotesDetails : CPKPS_ClientDbtCrdtNotesDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mDbtCrdtNoteID;
        internal Int64 mServiceID;
        internal Int32 mAccountID;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal String mNotes;
        internal Decimal mTaxRatio;
        internal Int32 mWHTRatio;
        #endregion

        #region "Methods"
        public Decimal DbtCrdtNoteID
        {
            get { return mDbtCrdtNoteID; }
            set { mIsChanges = true; mDbtCrdtNoteID = value; }
        }
        public Int64 ServiceID
        {
            get { return mServiceID; }
            set { mIsChanges = true; mServiceID = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Decimal TaxRatio
        {
            get { return mTaxRatio; }
            set { mIsChanges = true; mTaxRatio = value; }
        }
        public Int32 WHTRatio
        {
            get { return mWHTRatio; }
            set { mIsChanges = true; mWHTRatio = value; }
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

    public partial class CPS_ClientDbtCrdtNotesDetails
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
        public List<CVarPS_ClientDbtCrdtNotesDetails> lstCVarPS_ClientDbtCrdtNotesDetails = new List<CVarPS_ClientDbtCrdtNotesDetails>();
        public List<CPKPS_ClientDbtCrdtNotesDetails> lstDeletedCPKPS_ClientDbtCrdtNotesDetails = new List<CPKPS_ClientDbtCrdtNotesDetails>();
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
            lstCVarPS_ClientDbtCrdtNotesDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_ClientDbtCrdtNotesDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_ClientDbtCrdtNotesDetails";
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
                        CVarPS_ClientDbtCrdtNotesDetails ObjCVarPS_ClientDbtCrdtNotesDetails = new CVarPS_ClientDbtCrdtNotesDetails();
                        ObjCVarPS_ClientDbtCrdtNotesDetails.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mDbtCrdtNoteID = Convert.ToDecimal(dr["DbtCrdtNoteID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mTaxRatio = Convert.ToDecimal(dr["TaxRatio"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mWHTRatio = Convert.ToInt32(dr["WHTRatio"].ToString());
                        lstCVarPS_ClientDbtCrdtNotesDetails.Add(ObjCVarPS_ClientDbtCrdtNotesDetails);
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
            lstCVarPS_ClientDbtCrdtNotesDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_ClientDbtCrdtNotesDetails";
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
                        CVarPS_ClientDbtCrdtNotesDetails ObjCVarPS_ClientDbtCrdtNotesDetails = new CVarPS_ClientDbtCrdtNotesDetails();
                        ObjCVarPS_ClientDbtCrdtNotesDetails.ID = Convert.ToDecimal(dr["ID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mDbtCrdtNoteID = Convert.ToDecimal(dr["DbtCrdtNoteID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mServiceID = Convert.ToInt64(dr["ServiceID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mTaxRatio = Convert.ToDecimal(dr["TaxRatio"].ToString());
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mWHTRatio = Convert.ToInt32(dr["WHTRatio"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_ClientDbtCrdtNotesDetails.Add(ObjCVarPS_ClientDbtCrdtNotesDetails);
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
                    Com.CommandText = "[dbo].DeleteListPS_ClientDbtCrdtNotesDetails";
                else
                    Com.CommandText = "[dbo].UpdateListPS_ClientDbtCrdtNotesDetails";
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
        public Exception DeleteItem(List<CPKPS_ClientDbtCrdtNotesDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_ClientDbtCrdtNotesDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal));
                foreach (CPKPS_ClientDbtCrdtNotesDetails ObjCPKPS_ClientDbtCrdtNotesDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToDecimal(ObjCPKPS_ClientDbtCrdtNotesDetails.ID);
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
        public Exception SaveMethod(List<CVarPS_ClientDbtCrdtNotesDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@DbtCrdtNoteID", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ServiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TaxRatio", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@WHTRatio", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Decimal, 17, ParameterDirection.Input, false, 18, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_ClientDbtCrdtNotesDetails ObjCVarPS_ClientDbtCrdtNotesDetails in SaveList)
                {
                    if (ObjCVarPS_ClientDbtCrdtNotesDetails.mIsChanges == true)
                    {
                        if (ObjCVarPS_ClientDbtCrdtNotesDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_ClientDbtCrdtNotesDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_ClientDbtCrdtNotesDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_ClientDbtCrdtNotesDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_ClientDbtCrdtNotesDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_ClientDbtCrdtNotesDetails.ID;
                        }
                        Com.Parameters["@DbtCrdtNoteID"].Value = ObjCVarPS_ClientDbtCrdtNotesDetails.DbtCrdtNoteID;
                        Com.Parameters["@ServiceID"].Value = ObjCVarPS_ClientDbtCrdtNotesDetails.ServiceID;
                        Com.Parameters["@AccountID"].Value = ObjCVarPS_ClientDbtCrdtNotesDetails.AccountID;
                        Com.Parameters["@Amount"].Value = ObjCVarPS_ClientDbtCrdtNotesDetails.Amount;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPS_ClientDbtCrdtNotesDetails.CurrencyID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_ClientDbtCrdtNotesDetails.Notes;
                        Com.Parameters["@TaxRatio"].Value = ObjCVarPS_ClientDbtCrdtNotesDetails.TaxRatio;
                        Com.Parameters["@WHTRatio"].Value = ObjCVarPS_ClientDbtCrdtNotesDetails.WHTRatio;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_ClientDbtCrdtNotesDetails.ID == 0)
                        {
                            ObjCVarPS_ClientDbtCrdtNotesDetails.ID = Convert.ToDecimal(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_ClientDbtCrdtNotesDetails.mIsChanges = false;
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
