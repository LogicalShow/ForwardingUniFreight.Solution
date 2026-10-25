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
    public class CPKA_VoucherDetailsTax
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
    public partial class CVarA_VoucherDetailsTax : CPKA_VoucherDetailsTax
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mVoucherID;
        internal Decimal mValue;
        internal String mDescription;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;
        internal Int32 mCostCenterID;
        internal Boolean mIsDocumented;
        internal Int64 mInvoiceID;
        internal Int32 mVoucherType;
        internal Int32 mJob_ID;
        internal Int64 mOperationID;
        internal Int64 mHouseID;
        internal Int32 mBranchID;
        internal Int32 mTruckingOrderID;
        #endregion

        #region "Methods"
        public Int64 VoucherID
        {
            get { return mVoucherID; }
            set { mIsChanges = true; mVoucherID = value; }
        }
        public Decimal Value
        {
            get { return mValue; }
            set { mIsChanges = true; mValue = value; }
        }
        public String Description
        {
            get { return mDescription; }
            set { mIsChanges = true; mDescription = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Boolean IsDocumented
        {
            get { return mIsDocumented; }
            set { mIsChanges = true; mIsDocumented = value; }
        }
        public Int64 InvoiceID
        {
            get { return mInvoiceID; }
            set { mIsChanges = true; mInvoiceID = value; }
        }
        public Int32 VoucherType
        {
            get { return mVoucherType; }
            set { mIsChanges = true; mVoucherType = value; }
        }
        public Int32 Job_ID
        {
            get { return mJob_ID; }
            set { mIsChanges = true; mJob_ID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int64 HouseID
        {
            get { return mHouseID; }
            set { mIsChanges = true; mHouseID = value; }
        }
        public Int32 BranchID
        {
            get { return mBranchID; }
            set { mIsChanges = true; mBranchID = value; }
        }
        public Int32 TruckingOrderID
        {
            get { return mTruckingOrderID; }
            set { mIsChanges = true; mTruckingOrderID = value; }
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

    public partial class CA_VoucherDetailsTax
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
        public List<CVarA_VoucherDetailsTax> lstCVarA_VoucherDetails = new List<CVarA_VoucherDetailsTax>();
        public List<CPKA_VoucherDetailsTax> lstDeletedCPKA_VoucherDetails = new List<CPKA_VoucherDetailsTax>();
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
            lstCVarA_VoucherDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_VoucherDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_VoucherDetails";
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
                        CVarA_VoucherDetailsTax ObjCVarA_VoucherDetails = new CVarA_VoucherDetailsTax();
                        ObjCVarA_VoucherDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_VoucherDetails.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarA_VoucherDetails.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        ObjCVarA_VoucherDetails.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarA_VoucherDetails.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarA_VoucherDetails.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarA_VoucherDetails.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarA_VoucherDetails.mIsDocumented = Convert.ToBoolean(dr["IsDocumented"].ToString());
                        ObjCVarA_VoucherDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarA_VoucherDetails.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        ObjCVarA_VoucherDetails.mJob_ID = Convert.ToInt32(dr["Job_ID"].ToString());
                        ObjCVarA_VoucherDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarA_VoucherDetails.mHouseID = Convert.ToInt64(dr["HouseID"].ToString());
                        ObjCVarA_VoucherDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarA_VoucherDetails.mTruckingOrderID = Convert.ToInt32(dr["TruckingOrderID"].ToString());
                        lstCVarA_VoucherDetails.Add(ObjCVarA_VoucherDetails);
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
            lstCVarA_VoucherDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_VoucherDetails";
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
                        CVarA_VoucherDetailsTax ObjCVarA_VoucherDetails = new CVarA_VoucherDetailsTax();
                        ObjCVarA_VoucherDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarA_VoucherDetails.mVoucherID = Convert.ToInt64(dr["VoucherID"].ToString());
                        ObjCVarA_VoucherDetails.mValue = Convert.ToDecimal(dr["Value"].ToString());
                        ObjCVarA_VoucherDetails.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarA_VoucherDetails.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarA_VoucherDetails.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarA_VoucherDetails.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarA_VoucherDetails.mIsDocumented = Convert.ToBoolean(dr["IsDocumented"].ToString());
                        ObjCVarA_VoucherDetails.mInvoiceID = Convert.ToInt64(dr["InvoiceID"].ToString());
                        ObjCVarA_VoucherDetails.mVoucherType = Convert.ToInt32(dr["VoucherType"].ToString());
                        ObjCVarA_VoucherDetails.mJob_ID = Convert.ToInt32(dr["Job_ID"].ToString());
                        ObjCVarA_VoucherDetails.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarA_VoucherDetails.mHouseID = Convert.ToInt64(dr["HouseID"].ToString());
                        ObjCVarA_VoucherDetails.mBranchID = Convert.ToInt32(dr["BranchID"].ToString());
                        ObjCVarA_VoucherDetails.mTruckingOrderID = Convert.ToInt32(dr["TruckingOrderID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_VoucherDetails.Add(ObjCVarA_VoucherDetails);
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
                    Com.CommandText = "[dbo].DeleteListA_VoucherDetails";
                else
                    Com.CommandText = "[dbo].UpdateListA_VoucherDetails";
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
        public Exception DeleteItem(List<CPKA_VoucherDetailsTax> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_VoucherDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKA_VoucherDetailsTax ObjCPKA_VoucherDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKA_VoucherDetails.ID);
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
        public Exception SaveMethod(List<CVarA_VoucherDetailsTax> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@VoucherID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Value", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Description", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDocumented", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@InvoiceID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@VoucherType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Job_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@HouseID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TruckingOrderID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_VoucherDetailsTax ObjCVarA_VoucherDetails in SaveList)
                {
                    if (ObjCVarA_VoucherDetails.mIsChanges == true)
                    {
                        if (ObjCVarA_VoucherDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_VoucherDetailsTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_VoucherDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_VoucherDetailsTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_VoucherDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_VoucherDetails.ID;
                        }
                        Com.Parameters["@VoucherID"].Value = ObjCVarA_VoucherDetails.VoucherID;
                        Com.Parameters["@Value"].Value = ObjCVarA_VoucherDetails.Value;
                        Com.Parameters["@Description"].Value = ObjCVarA_VoucherDetails.Description;
                        Com.Parameters["@AccountID"].Value = ObjCVarA_VoucherDetails.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarA_VoucherDetails.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarA_VoucherDetails.CostCenterID;
                        Com.Parameters["@IsDocumented"].Value = ObjCVarA_VoucherDetails.IsDocumented;
                        Com.Parameters["@InvoiceID"].Value = ObjCVarA_VoucherDetails.InvoiceID;
                        Com.Parameters["@VoucherType"].Value = ObjCVarA_VoucherDetails.VoucherType;
                        Com.Parameters["@Job_ID"].Value = ObjCVarA_VoucherDetails.Job_ID;
                        Com.Parameters["@OperationID"].Value = ObjCVarA_VoucherDetails.OperationID;
                        Com.Parameters["@HouseID"].Value = ObjCVarA_VoucherDetails.HouseID;
                        Com.Parameters["@BranchID"].Value = ObjCVarA_VoucherDetails.BranchID;
                        Com.Parameters["@TruckingOrderID"].Value = ObjCVarA_VoucherDetails.TruckingOrderID;
                        EndTrans(Com, Con);
                        if (ObjCVarA_VoucherDetails.ID == 0)
                        {
                            ObjCVarA_VoucherDetails.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_VoucherDetails.mIsChanges = false;
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
