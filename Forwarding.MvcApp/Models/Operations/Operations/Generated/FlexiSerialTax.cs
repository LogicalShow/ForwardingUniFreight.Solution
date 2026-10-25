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
    public class CPKFlexiSerialTax
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
    public partial class CVarFlexiSerialTax : CPKFlexiSerialTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mImportPurchaseInvoiceItemID;
        internal Int64 mExportPurchaseInvoiceItemID;
        internal String mCode;
        internal Decimal mExportPrice;
        internal Int64 mContainerID;
        internal String mNotes;
        internal Int64 mImportPurchaseInvoice_OpeningBalanceItemID;
        internal Int64 mExportPurchaseInvoice_OpeningBalanceItemID;
        #endregion

        #region "Methods"
        public Int64 ImportPurchaseInvoiceItemID
        {
            get { return mImportPurchaseInvoiceItemID; }
            set { mIsChanges = true; mImportPurchaseInvoiceItemID = value; }
        }
        public Int64 ExportPurchaseInvoiceItemID
        {
            get { return mExportPurchaseInvoiceItemID; }
            set { mIsChanges = true; mExportPurchaseInvoiceItemID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Decimal ExportPrice
        {
            get { return mExportPrice; }
            set { mIsChanges = true; mExportPrice = value; }
        }
        public Int64 ContainerID
        {
            get { return mContainerID; }
            set { mIsChanges = true; mContainerID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int64 ImportPurchaseInvoice_OpeningBalanceItemID
        {
            get { return mImportPurchaseInvoice_OpeningBalanceItemID; }
            set { mIsChanges = true; mImportPurchaseInvoice_OpeningBalanceItemID = value; }
        }
        public Int64 ExportPurchaseInvoice_OpeningBalanceItemID
        {
            get { return mExportPurchaseInvoice_OpeningBalanceItemID; }
            set { mIsChanges = true; mExportPurchaseInvoice_OpeningBalanceItemID = value; }
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

    public partial class CFlexiSerialTax
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
        public List<CVarFlexiSerialTax> lstCVarFlexiSerial = new List<CVarFlexiSerialTax>();
        public List<CPKFlexiSerialTax> lstDeletedCPKFlexiSerial = new List<CPKFlexiSerialTax>();
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
            lstCVarFlexiSerial.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFlexiSerial";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFlexiSerial";
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
                        CVarFlexiSerialTax ObjCVarFlexiSerial = new CVarFlexiSerialTax();
                        ObjCVarFlexiSerial.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarFlexiSerial.mImportPurchaseInvoiceItemID = Convert.ToInt64(dr["ImportPurchaseInvoiceItemID"].ToString());
                        ObjCVarFlexiSerial.mExportPurchaseInvoiceItemID = Convert.ToInt64(dr["ExportPurchaseInvoiceItemID"].ToString());
                        ObjCVarFlexiSerial.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarFlexiSerial.mExportPrice = Convert.ToDecimal(dr["ExportPrice"].ToString());
                        ObjCVarFlexiSerial.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarFlexiSerial.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFlexiSerial.mImportPurchaseInvoice_OpeningBalanceItemID = Convert.ToInt64(dr["ImportPurchaseInvoice_OpeningBalanceItemID"].ToString());
                        ObjCVarFlexiSerial.mExportPurchaseInvoice_OpeningBalanceItemID = Convert.ToInt64(dr["ExportPurchaseInvoice_OpeningBalanceItemID"].ToString());
                        lstCVarFlexiSerial.Add(ObjCVarFlexiSerial);
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
            lstCVarFlexiSerial.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFlexiSerial";
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
                        CVarFlexiSerialTax ObjCVarFlexiSerial = new CVarFlexiSerialTax();
                        ObjCVarFlexiSerial.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarFlexiSerial.mImportPurchaseInvoiceItemID = Convert.ToInt64(dr["ImportPurchaseInvoiceItemID"].ToString());
                        ObjCVarFlexiSerial.mExportPurchaseInvoiceItemID = Convert.ToInt64(dr["ExportPurchaseInvoiceItemID"].ToString());
                        ObjCVarFlexiSerial.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarFlexiSerial.mExportPrice = Convert.ToDecimal(dr["ExportPrice"].ToString());
                        ObjCVarFlexiSerial.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarFlexiSerial.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFlexiSerial.mImportPurchaseInvoice_OpeningBalanceItemID = Convert.ToInt64(dr["ImportPurchaseInvoice_OpeningBalanceItemID"].ToString());
                        ObjCVarFlexiSerial.mExportPurchaseInvoice_OpeningBalanceItemID = Convert.ToInt64(dr["ExportPurchaseInvoice_OpeningBalanceItemID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFlexiSerial.Add(ObjCVarFlexiSerial);
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
                    Com.CommandText = "[dbo].DeleteListFlexiSerialTax";
                else
                    Com.CommandText = "[dbo].UpdateListFlexiSerialTax";
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
        public Exception DeleteItem(List<CPKFlexiSerialTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFlexiSerial";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKFlexiSerialTax ObjCPKFlexiSerial in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKFlexiSerial.ID);
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
        public Exception SaveMethod(List<CVarFlexiSerialTax> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ImportPurchaseInvoiceItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ExportPurchaseInvoiceItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ExportPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ContainerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ImportPurchaseInvoice_OpeningBalanceItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ExportPurchaseInvoice_OpeningBalanceItemID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFlexiSerialTax ObjCVarFlexiSerial in SaveList)
                {
                    if (ObjCVarFlexiSerial.mIsChanges == true)
                    {
                        if (ObjCVarFlexiSerial.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFlexiSerialTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFlexiSerial.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFlexiSerialTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFlexiSerial.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFlexiSerial.ID;
                        }
                        Com.Parameters["@ImportPurchaseInvoiceItemID"].Value = ObjCVarFlexiSerial.ImportPurchaseInvoiceItemID;
                        Com.Parameters["@ExportPurchaseInvoiceItemID"].Value = ObjCVarFlexiSerial.ExportPurchaseInvoiceItemID;
                        Com.Parameters["@Code"].Value = ObjCVarFlexiSerial.Code;
                        Com.Parameters["@ExportPrice"].Value = ObjCVarFlexiSerial.ExportPrice;
                        Com.Parameters["@ContainerID"].Value = ObjCVarFlexiSerial.ContainerID;
                        Com.Parameters["@Notes"].Value = ObjCVarFlexiSerial.Notes;
                        Com.Parameters["@ImportPurchaseInvoice_OpeningBalanceItemID"].Value = ObjCVarFlexiSerial.ImportPurchaseInvoice_OpeningBalanceItemID;
                        Com.Parameters["@ExportPurchaseInvoice_OpeningBalanceItemID"].Value = ObjCVarFlexiSerial.ExportPurchaseInvoice_OpeningBalanceItemID;
                        EndTrans(Com, Con);
                        if (ObjCVarFlexiSerial.ID == 0)
                        {
                            ObjCVarFlexiSerial.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFlexiSerial.mIsChanges = false;
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
