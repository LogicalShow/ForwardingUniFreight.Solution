using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

//Alter manual because of ID order
//Alter manual because of ID order
//Alter manual because of ID order
//Alter manual because of ID order
//Alter manual because of ID order
//Alter manual because of ID order
namespace Forwarding.MvcApp.Models.Warehousing.Reports.Customized
{
    [Serializable]
    public class CPKIST_GBL_ITEMS_TRANSACTIONS
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
    public partial class CVarIST_GBL_ITEMS_TRANSACTIONS : CPKIST_GBL_ITEMS_TRANSACTIONS
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mTRANSACTION_ID;
        internal Int32 mLOT_TRANSACTION_ID;
        internal Int32 mSER_TRANSACTION_ID;
        internal Int32 mTRANSACTION_TYPE_ID;
        internal String mTRANSACTION_TYPE_NAME;
        internal String mITEM_CODE;
        internal String mLOT_NUMBER;
        internal String mSERIAL_NUMBER;
        internal Int32 mTRANSACTION_QUANTITY;
        internal String mSUBINVENTORY_CODE;
        internal DateTime mTRANSACTION_DATE;
        internal String mTRANSFER_SUBINVENTORY;
        internal DateTime mCreation_Date;
        #endregion

        #region "Methods"
        public Int32 TRANSACTION_ID
        {
            get { return mTRANSACTION_ID; }
            set { mIsChanges = true; mTRANSACTION_ID = value; }
        }
        public Int32 LOT_TRANSACTION_ID
        {
            get { return mLOT_TRANSACTION_ID; }
            set { mIsChanges = true; mLOT_TRANSACTION_ID = value; }
        }
        public Int32 SER_TRANSACTION_ID
        {
            get { return mSER_TRANSACTION_ID; }
            set { mIsChanges = true; mSER_TRANSACTION_ID = value; }
        }
        public Int32 TRANSACTION_TYPE_ID
        {
            get { return mTRANSACTION_TYPE_ID; }
            set { mIsChanges = true; mTRANSACTION_TYPE_ID = value; }
        }
        public String TRANSACTION_TYPE_NAME
        {
            get { return mTRANSACTION_TYPE_NAME; }
            set { mIsChanges = true; mTRANSACTION_TYPE_NAME = value; }
        }
        public String ITEM_CODE
        {
            get { return mITEM_CODE; }
            set { mIsChanges = true; mITEM_CODE = value; }
        }
        public String LOT_NUMBER
        {
            get { return mLOT_NUMBER; }
            set { mIsChanges = true; mLOT_NUMBER = value; }
        }
        public String SERIAL_NUMBER
        {
            get { return mSERIAL_NUMBER; }
            set { mIsChanges = true; mSERIAL_NUMBER = value; }
        }
        public Int32 TRANSACTION_QUANTITY
        {
            get { return mTRANSACTION_QUANTITY; }
            set { mIsChanges = true; mTRANSACTION_QUANTITY = value; }
        }
        public String SUBINVENTORY_CODE
        {
            get { return mSUBINVENTORY_CODE; }
            set { mIsChanges = true; mSUBINVENTORY_CODE = value; }
        }
        public DateTime TRANSACTION_DATE
        {
            get { return mTRANSACTION_DATE; }
            set { mIsChanges = true; mTRANSACTION_DATE = value; }
        }
        public String TRANSFER_SUBINVENTORY
        {
            get { return mTRANSFER_SUBINVENTORY; }
            set { mIsChanges = true; mTRANSFER_SUBINVENTORY = value; }
        }
        public DateTime Creation_Date
        {
            get { return mCreation_Date; }
            set { mIsChanges = true; mCreation_Date = value; }
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

    public partial class CIST_GBL_ITEMS_TRANSACTIONS
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
        public List<CVarIST_GBL_ITEMS_TRANSACTIONS> lstCVarIST_GBL_ITEMS_TRANSACTIONS = new List<CVarIST_GBL_ITEMS_TRANSACTIONS>();
        public List<CPKIST_GBL_ITEMS_TRANSACTIONS> lstDeletedCPKIST_GBL_ITEMS_TRANSACTIONS = new List<CPKIST_GBL_ITEMS_TRANSACTIONS>();
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
            lstCVarIST_GBL_ITEMS_TRANSACTIONS.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListIST_GBL_ITEMS_TRANSACTIONS";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemIST_GBL_ITEMS_TRANSACTIONS";
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
                        CVarIST_GBL_ITEMS_TRANSACTIONS ObjCVarIST_GBL_ITEMS_TRANSACTIONS = new CVarIST_GBL_ITEMS_TRANSACTIONS();
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_ID = Convert.ToInt32(dr["TRANSACTION_ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mLOT_TRANSACTION_ID = Convert.ToInt32(dr["LOT_TRANSACTION_ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mSER_TRANSACTION_ID = Convert.ToInt32(dr["SER_TRANSACTION_ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_TYPE_ID = Convert.ToInt32(dr["TRANSACTION_TYPE_ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_TYPE_NAME = Convert.ToString(dr["TRANSACTION_TYPE_NAME"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mITEM_CODE = Convert.ToString(dr["ITEM_CODE"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mLOT_NUMBER = Convert.ToString(dr["LOT_NUMBER"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mSERIAL_NUMBER = Convert.ToString(dr["SERIAL_NUMBER"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_QUANTITY = Convert.ToInt32(dr["TRANSACTION_QUANTITY"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mSUBINVENTORY_CODE = Convert.ToString(dr["SUBINVENTORY_CODE"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_DATE = Convert.ToDateTime(dr["TRANSACTION_DATE"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSFER_SUBINVENTORY = Convert.ToString(dr["TRANSFER_SUBINVENTORY"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mCreation_Date = Convert.ToDateTime(dr["Creation_Date"].ToString());
                        lstCVarIST_GBL_ITEMS_TRANSACTIONS.Add(ObjCVarIST_GBL_ITEMS_TRANSACTIONS);
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
            lstCVarIST_GBL_ITEMS_TRANSACTIONS.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingIST_GBL_ITEMS_TRANSACTIONS";
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
                        CVarIST_GBL_ITEMS_TRANSACTIONS ObjCVarIST_GBL_ITEMS_TRANSACTIONS = new CVarIST_GBL_ITEMS_TRANSACTIONS();
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_ID = Convert.ToInt32(dr["TRANSACTION_ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mLOT_TRANSACTION_ID = Convert.ToInt32(dr["LOT_TRANSACTION_ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mSER_TRANSACTION_ID = Convert.ToInt32(dr["SER_TRANSACTION_ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_TYPE_ID = Convert.ToInt32(dr["TRANSACTION_TYPE_ID"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_TYPE_NAME = Convert.ToString(dr["TRANSACTION_TYPE_NAME"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mITEM_CODE = Convert.ToString(dr["ITEM_CODE"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mLOT_NUMBER = Convert.ToString(dr["LOT_NUMBER"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mSERIAL_NUMBER = Convert.ToString(dr["SERIAL_NUMBER"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_QUANTITY = Convert.ToInt32(dr["TRANSACTION_QUANTITY"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mSUBINVENTORY_CODE = Convert.ToString(dr["SUBINVENTORY_CODE"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSACTION_DATE = Convert.ToDateTime(dr["TRANSACTION_DATE"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mTRANSFER_SUBINVENTORY = Convert.ToString(dr["TRANSFER_SUBINVENTORY"].ToString());
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mCreation_Date = Convert.ToDateTime(dr["Creation_Date"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarIST_GBL_ITEMS_TRANSACTIONS.Add(ObjCVarIST_GBL_ITEMS_TRANSACTIONS);
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
                    Com.CommandText = "[dbo].DeleteListIST_GBL_ITEMS_TRANSACTIONS";
                else
                    Com.CommandText = "[dbo].UpdateListIST_GBL_ITEMS_TRANSACTIONS";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
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
        public Exception DeleteItem(List<CPKIST_GBL_ITEMS_TRANSACTIONS> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemIST_GBL_ITEMS_TRANSACTIONS";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKIST_GBL_ITEMS_TRANSACTIONS ObjCPKIST_GBL_ITEMS_TRANSACTIONS in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKIST_GBL_ITEMS_TRANSACTIONS.ID);
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
        public Exception SaveMethod(List<CVarIST_GBL_ITEMS_TRANSACTIONS> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TRANSACTION_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@LOT_TRANSACTION_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SER_TRANSACTION_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TRANSACTION_TYPE_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TRANSACTION_TYPE_NAME", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ITEM_CODE", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LOT_NUMBER", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SERIAL_NUMBER", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TRANSACTION_QUANTITY", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SUBINVENTORY_CODE", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TRANSACTION_DATE", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TRANSFER_SUBINVENTORY", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Creation_Date", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarIST_GBL_ITEMS_TRANSACTIONS ObjCVarIST_GBL_ITEMS_TRANSACTIONS in SaveList)
                {
                    if (ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mIsChanges == true)
                    {
                        if (ObjCVarIST_GBL_ITEMS_TRANSACTIONS.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemIST_GBL_ITEMS_TRANSACTIONS";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarIST_GBL_ITEMS_TRANSACTIONS.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemIST_GBL_ITEMS_TRANSACTIONS";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarIST_GBL_ITEMS_TRANSACTIONS.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.ID;
                        }
                        Com.Parameters["@TRANSACTION_ID"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.TRANSACTION_ID;
                        Com.Parameters["@LOT_TRANSACTION_ID"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.LOT_TRANSACTION_ID;
                        Com.Parameters["@SER_TRANSACTION_ID"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.SER_TRANSACTION_ID;
                        Com.Parameters["@TRANSACTION_TYPE_ID"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.TRANSACTION_TYPE_ID;
                        Com.Parameters["@TRANSACTION_TYPE_NAME"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.TRANSACTION_TYPE_NAME;
                        Com.Parameters["@ITEM_CODE"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.ITEM_CODE;
                        Com.Parameters["@LOT_NUMBER"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.LOT_NUMBER;
                        Com.Parameters["@SERIAL_NUMBER"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.SERIAL_NUMBER;
                        Com.Parameters["@TRANSACTION_QUANTITY"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.TRANSACTION_QUANTITY;
                        Com.Parameters["@SUBINVENTORY_CODE"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.SUBINVENTORY_CODE;
                        Com.Parameters["@TRANSACTION_DATE"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.TRANSACTION_DATE;
                        Com.Parameters["@TRANSFER_SUBINVENTORY"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.TRANSFER_SUBINVENTORY;
                        Com.Parameters["@Creation_Date"].Value = ObjCVarIST_GBL_ITEMS_TRANSACTIONS.Creation_Date;
                        EndTrans(Com, Con);
                        if (ObjCVarIST_GBL_ITEMS_TRANSACTIONS.ID == 0)
                        {
                            ObjCVarIST_GBL_ITEMS_TRANSACTIONS.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarIST_GBL_ITEMS_TRANSACTIONS.mIsChanges = false;
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
