using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.Transactions.Generated
{
    [Serializable]
    public class CPKSC_ExaminationsDetails
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
    public partial class CVarSC_ExaminationsDetails : CPKSC_ExaminationsDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mExaminationID;
        internal Int64 mPurchaseInvoiceID;
        internal Int64 mItemID;
        internal Int32 mUnitID;
        internal Decimal mExaminedQty;
        internal Decimal mAcceptedQty;
        internal String mNotes;
        #endregion

        #region "Methods"
        public Int32 ExaminationID
        {
            get { return mExaminationID; }
            set { mIsChanges = true; mExaminationID = value; }
        }
        public Int64 PurchaseInvoiceID
        {
            get { return mPurchaseInvoiceID; }
            set { mIsChanges = true; mPurchaseInvoiceID = value; }
        }
        public Int64 ItemID
        {
            get { return mItemID; }
            set { mIsChanges = true; mItemID = value; }
        }
        public Int32 UnitID
        {
            get { return mUnitID; }
            set { mIsChanges = true; mUnitID = value; }
        }
        public Decimal ExaminedQty
        {
            get { return mExaminedQty; }
            set { mIsChanges = true; mExaminedQty = value; }
        }
        public Decimal AcceptedQty
        {
            get { return mAcceptedQty; }
            set { mIsChanges = true; mAcceptedQty = value; }
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

    public partial class CSC_ExaminationsDetails
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
        public List<CVarSC_ExaminationsDetails> lstCVarSC_ExaminationsDetails = new List<CVarSC_ExaminationsDetails>();
        public List<CPKSC_ExaminationsDetails> lstDeletedCPKSC_ExaminationsDetails = new List<CPKSC_ExaminationsDetails>();
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
            lstCVarSC_ExaminationsDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSC_ExaminationsDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSC_ExaminationsDetails";
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
                        CVarSC_ExaminationsDetails ObjCVarSC_ExaminationsDetails = new CVarSC_ExaminationsDetails();
                        ObjCVarSC_ExaminationsDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mExaminedQty = Convert.ToDecimal(dr["ExaminedQty"].ToString());
                        ObjCVarSC_ExaminationsDetails.mAcceptedQty = Convert.ToDecimal(dr["AcceptedQty"].ToString());
                        ObjCVarSC_ExaminationsDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        lstCVarSC_ExaminationsDetails.Add(ObjCVarSC_ExaminationsDetails);
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
            lstCVarSC_ExaminationsDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSC_ExaminationsDetails";
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
                        CVarSC_ExaminationsDetails ObjCVarSC_ExaminationsDetails = new CVarSC_ExaminationsDetails();
                        ObjCVarSC_ExaminationsDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mExaminationID = Convert.ToInt32(dr["ExaminationID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarSC_ExaminationsDetails.mExaminedQty = Convert.ToDecimal(dr["ExaminedQty"].ToString());
                        ObjCVarSC_ExaminationsDetails.mAcceptedQty = Convert.ToDecimal(dr["AcceptedQty"].ToString());
                        ObjCVarSC_ExaminationsDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSC_ExaminationsDetails.Add(ObjCVarSC_ExaminationsDetails);
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
                    Com.CommandText = "[dbo].DeleteListSC_ExaminationsDetails";
                else
                    Com.CommandText = "[dbo].UpdateListSC_ExaminationsDetails";
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
        public Exception DeleteItem(List<CPKSC_ExaminationsDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSC_ExaminationsDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSC_ExaminationsDetails ObjCPKSC_ExaminationsDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSC_ExaminationsDetails.ID);
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
        public Exception SaveMethod(List<CVarSC_ExaminationsDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ExaminationID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PurchaseInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@UnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ExaminedQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@AcceptedQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSC_ExaminationsDetails ObjCVarSC_ExaminationsDetails in SaveList)
                {
                    if (ObjCVarSC_ExaminationsDetails.mIsChanges == true)
                    {
                        if (ObjCVarSC_ExaminationsDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSC_ExaminationsDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSC_ExaminationsDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSC_ExaminationsDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSC_ExaminationsDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSC_ExaminationsDetails.ID;
                        }
                        Com.Parameters["@ExaminationID"].Value = ObjCVarSC_ExaminationsDetails.ExaminationID;
                        Com.Parameters["@PurchaseInvoiceID"].Value = ObjCVarSC_ExaminationsDetails.PurchaseInvoiceID;
                        Com.Parameters["@ItemID"].Value = ObjCVarSC_ExaminationsDetails.ItemID;
                        Com.Parameters["@UnitID"].Value = ObjCVarSC_ExaminationsDetails.UnitID;
                        Com.Parameters["@ExaminedQty"].Value = ObjCVarSC_ExaminationsDetails.ExaminedQty;
                        Com.Parameters["@AcceptedQty"].Value = ObjCVarSC_ExaminationsDetails.AcceptedQty;
                        Com.Parameters["@Notes"].Value = ObjCVarSC_ExaminationsDetails.Notes;
                        EndTrans(Com, Con);
                        if (ObjCVarSC_ExaminationsDetails.ID == 0)
                        {
                            ObjCVarSC_ExaminationsDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSC_ExaminationsDetails.mIsChanges = false;
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
