using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKPurchaseInvoiceItemTax
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
    public partial class CVarPurchaseInvoiceItemTax : CPKPurchaseInvoiceItemTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPurchaseItemID;
        internal Int64 mPurchaseInvoiceID;
        internal Decimal mAmount;
        internal String mNotes;
        internal Decimal mUnitPrice;
        internal Int32 mQuantity;
        internal String mPartNumber;
        internal Int32 mCountryOfOriginID;
        internal String mHSCode;
        internal Decimal mExportPrice;
        #endregion

        #region "Methods"
        public Int64 PurchaseItemID
        {
            get { return mPurchaseItemID; }
            set { mIsChanges = true; mPurchaseItemID = value; }
        }
        public Int64 PurchaseInvoiceID
        {
            get { return mPurchaseInvoiceID; }
            set { mIsChanges = true; mPurchaseInvoiceID = value; }
        }
        public Decimal Amount
        {
            get { return mAmount; }
            set { mIsChanges = true; mAmount = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Decimal UnitPrice
        {
            get { return mUnitPrice; }
            set { mIsChanges = true; mUnitPrice = value; }
        }
        public Int32 Quantity
        {
            get { return mQuantity; }
            set { mIsChanges = true; mQuantity = value; }
        }
        public String PartNumber
        {
            get { return mPartNumber; }
            set { mIsChanges = true; mPartNumber = value; }
        }
        public Int32 CountryOfOriginID
        {
            get { return mCountryOfOriginID; }
            set { mIsChanges = true; mCountryOfOriginID = value; }
        }
        public String HSCode
        {
            get { return mHSCode; }
            set { mIsChanges = true; mHSCode = value; }
        }
        public Decimal ExportPrice
        {
            get { return mExportPrice; }
            set { mIsChanges = true; mExportPrice = value; }
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

    public partial class CPurchaseInvoiceItemTax
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
        public List<CVarPurchaseInvoiceItemTax> lstCVarPurchaseInvoiceItem = new List<CVarPurchaseInvoiceItemTax>();
        public List<CPKPurchaseInvoiceItemTax> lstDeletedCPKPurchaseInvoiceItem = new List<CPKPurchaseInvoiceItemTax>();
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
            lstCVarPurchaseInvoiceItem.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPurchaseInvoiceItemTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPurchaseInvoiceItem";
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
                        CVarPurchaseInvoiceItemTax ObjCVarPurchaseInvoiceItem = new CVarPurchaseInvoiceItemTax();
                        ObjCVarPurchaseInvoiceItem.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPurchaseInvoiceItem.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarPurchaseInvoiceItem.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarPurchaseInvoiceItem.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarPurchaseInvoiceItem.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPurchaseInvoiceItem.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarPurchaseInvoiceItem.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarPurchaseInvoiceItem.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarPurchaseInvoiceItem.mCountryOfOriginID = Convert.ToInt32(dr["CountryOfOriginID"].ToString());
                        ObjCVarPurchaseInvoiceItem.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarPurchaseInvoiceItem.mExportPrice = Convert.ToDecimal(dr["ExportPrice"].ToString());
                        lstCVarPurchaseInvoiceItem.Add(ObjCVarPurchaseInvoiceItem);
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
            lstCVarPurchaseInvoiceItem.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPurchaseInvoiceItem";
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
                        CVarPurchaseInvoiceItemTax ObjCVarPurchaseInvoiceItem = new CVarPurchaseInvoiceItemTax();
                        ObjCVarPurchaseInvoiceItem.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPurchaseInvoiceItem.mPurchaseItemID = Convert.ToInt64(dr["PurchaseItemID"].ToString());
                        ObjCVarPurchaseInvoiceItem.mPurchaseInvoiceID = Convert.ToInt64(dr["PurchaseInvoiceID"].ToString());
                        ObjCVarPurchaseInvoiceItem.mAmount = Convert.ToDecimal(dr["Amount"].ToString());
                        ObjCVarPurchaseInvoiceItem.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPurchaseInvoiceItem.mUnitPrice = Convert.ToDecimal(dr["UnitPrice"].ToString());
                        ObjCVarPurchaseInvoiceItem.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarPurchaseInvoiceItem.mPartNumber = Convert.ToString(dr["PartNumber"].ToString());
                        ObjCVarPurchaseInvoiceItem.mCountryOfOriginID = Convert.ToInt32(dr["CountryOfOriginID"].ToString());
                        ObjCVarPurchaseInvoiceItem.mHSCode = Convert.ToString(dr["HSCode"].ToString());
                        ObjCVarPurchaseInvoiceItem.mExportPrice = Convert.ToDecimal(dr["ExportPrice"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPurchaseInvoiceItem.Add(ObjCVarPurchaseInvoiceItem);
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
                    Com.CommandText = "[dbo].DeleteListPurchaseInvoiceItem";
                else
                    Com.CommandText = "[dbo].UpdateListPurchaseInvoiceItemTax";
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
        public Exception DeleteItem(List<CPKPurchaseInvoiceItemTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPurchaseInvoiceItem";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPurchaseInvoiceItemTax ObjCPKPurchaseInvoiceItem in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPurchaseInvoiceItem.ID);
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
        public Exception SaveMethod(List<CVarPurchaseInvoiceItemTax> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PurchaseInvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Amount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UnitPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PartNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CountryOfOriginID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@HSCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ExportPrice", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPurchaseInvoiceItemTax ObjCVarPurchaseInvoiceItem in SaveList)
                {
                    if (ObjCVarPurchaseInvoiceItem.mIsChanges == true)
                    {
                        if (ObjCVarPurchaseInvoiceItem.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPurchaseInvoiceItemTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPurchaseInvoiceItem.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPurchaseInvoiceItemTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPurchaseInvoiceItem.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPurchaseInvoiceItem.ID;
                        }
                        Com.Parameters["@PurchaseItemID"].Value = ObjCVarPurchaseInvoiceItem.PurchaseItemID;
                        Com.Parameters["@PurchaseInvoiceID"].Value = ObjCVarPurchaseInvoiceItem.PurchaseInvoiceID;
                        Com.Parameters["@Amount"].Value = ObjCVarPurchaseInvoiceItem.Amount;
                        Com.Parameters["@Notes"].Value = ObjCVarPurchaseInvoiceItem.Notes;
                        Com.Parameters["@UnitPrice"].Value = ObjCVarPurchaseInvoiceItem.UnitPrice;
                        Com.Parameters["@Quantity"].Value = ObjCVarPurchaseInvoiceItem.Quantity;
                        Com.Parameters["@PartNumber"].Value = ObjCVarPurchaseInvoiceItem.PartNumber;
                        Com.Parameters["@CountryOfOriginID"].Value = ObjCVarPurchaseInvoiceItem.CountryOfOriginID;
                        Com.Parameters["@HSCode"].Value = ObjCVarPurchaseInvoiceItem.HSCode;
                        Com.Parameters["@ExportPrice"].Value = ObjCVarPurchaseInvoiceItem.ExportPrice;
                        EndTrans(Com, Con);
                        if (ObjCVarPurchaseInvoiceItem.ID == 0)
                        {
                            ObjCVarPurchaseInvoiceItem.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPurchaseInvoiceItem.mIsChanges = false;
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
