using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.OperAcc.Generated
{
    [Serializable]
    public class CPKAccPaymentDetails
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
    public partial class CVarAccPaymentDetails : CPKAccPaymentDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPaymentID;
        internal Decimal mAmount;
        internal Int32 mCurrencyID;
        internal Decimal mExchangeRate;
        internal Boolean mIsApproved;
        internal Boolean mIsDeleted;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int64 PaymentID
        {
            get { return mPaymentID; }
            set { mIsChanges = true; mPaymentID = value; }
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
        public Decimal ExchangeRate
        {
            get { return mExchangeRate; }
            set { mIsChanges = true; mExchangeRate = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
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

    public partial class CAccPaymentDetails
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
        public List<CVarAccPaymentDetails> lstCVarAccPaymentDetails = new List<CVarAccPaymentDetails>();
        public List<CPKAccPaymentDetails> lstDeletedCPKAccPaymentDetails = new List<CPKAccPaymentDetails>();
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
            lstCVarAccPaymentDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListAccPaymentDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAccPaymentDetails";
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
                        CVarAccPaymentDetails ObjCVarAccPaymentDetails = new CVarAccPaymentDetails();
                        ObjCVarAccPaymentDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccPaymentDetails.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarAccPaymentDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarAccPaymentDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAccPaymentDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarAccPaymentDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarAccPaymentDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAccPaymentDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAccPaymentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccPaymentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccPaymentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccPaymentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarAccPaymentDetails.Add(ObjCVarAccPaymentDetails);
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
            lstCVarAccPaymentDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAccPaymentDetails";
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
                        CVarAccPaymentDetails ObjCVarAccPaymentDetails = new CVarAccPaymentDetails();
                        ObjCVarAccPaymentDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAccPaymentDetails.mPaymentID = Convert.ToInt64(dr["PaymentID"].ToString());
                        ObjCVarAccPaymentDetails.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarAccPaymentDetails.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarAccPaymentDetails.mExchangeRate = Convert.ToDecimal(dr["ExchangeRate"].ToString());
                        ObjCVarAccPaymentDetails.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarAccPaymentDetails.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAccPaymentDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarAccPaymentDetails.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAccPaymentDetails.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAccPaymentDetails.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAccPaymentDetails.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAccPaymentDetails.Add(ObjCVarAccPaymentDetails);
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
                    Com.CommandText = "[dbo].DeleteListAccPaymentDetails";
                else
                    Com.CommandText = "[dbo].UpdateListAccPaymentDetails";
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
        public Exception DeleteItem(List<CPKAccPaymentDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAccPaymentDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKAccPaymentDetails ObjCPKAccPaymentDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKAccPaymentDetails.ID);
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
        public Exception SaveMethod(List<CVarAccPaymentDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PaymentID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExchangeRate", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAccPaymentDetails ObjCVarAccPaymentDetails in SaveList)
                {
                    if (ObjCVarAccPaymentDetails.mIsChanges == true)
                    {
                        if (ObjCVarAccPaymentDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAccPaymentDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAccPaymentDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAccPaymentDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAccPaymentDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAccPaymentDetails.ID;
                        }
                        Com.Parameters["@PaymentID"].Value = ObjCVarAccPaymentDetails.PaymentID;
                        Com.Parameters["@Amount"].Value = ObjCVarAccPaymentDetails.Amount;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarAccPaymentDetails.CurrencyID;
                        Com.Parameters["@ExchangeRate"].Value = ObjCVarAccPaymentDetails.ExchangeRate;
                        Com.Parameters["@IsApproved"].Value = ObjCVarAccPaymentDetails.IsApproved;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarAccPaymentDetails.IsDeleted;
                        Com.Parameters["@Notes"].Value = ObjCVarAccPaymentDetails.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarAccPaymentDetails.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAccPaymentDetails.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarAccPaymentDetails.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarAccPaymentDetails.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarAccPaymentDetails.ID == 0)
                        {
                            ObjCVarAccPaymentDetails.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAccPaymentDetails.mIsChanges = false;
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
