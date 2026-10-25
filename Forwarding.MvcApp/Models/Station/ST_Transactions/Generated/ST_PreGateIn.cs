using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
    [Serializable]
    public class CPKST_PreGateIn
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
    public partial class CVarST_PreGateIn : CPKST_PreGateIn
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int32 mCustomerID;
        internal DateTime mEntryDate;
        internal String mTruckingOrderNumber;
        internal String mNotes;
        internal Boolean mIsApproved;
        internal String mBoogingNumber;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public DateTime EntryDate
        {
            get { return mEntryDate; }
            set { mIsChanges = true; mEntryDate = value; }
        }
        public String TruckingOrderNumber
        {
            get { return mTruckingOrderNumber; }
            set { mIsChanges = true; mTruckingOrderNumber = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public String BoogingNumber
        {
            get { return mBoogingNumber; }
            set { mIsChanges = true; mBoogingNumber = value; }
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

    public partial class CST_PreGateIn
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
        public List<CVarST_PreGateIn> lstCVarST_PreGateIn = new List<CVarST_PreGateIn>();
        public List<CPKST_PreGateIn> lstDeletedCPKST_PreGateIn = new List<CPKST_PreGateIn>();
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
            lstCVarST_PreGateIn.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListST_PreGateIn";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemST_PreGateIn";
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
                        CVarST_PreGateIn ObjCVarST_PreGateIn = new CVarST_PreGateIn();
                        ObjCVarST_PreGateIn.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_PreGateIn.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarST_PreGateIn.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarST_PreGateIn.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarST_PreGateIn.mTruckingOrderNumber = Convert.ToString(dr["TruckingOrderNumber"].ToString());
                        ObjCVarST_PreGateIn.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarST_PreGateIn.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarST_PreGateIn.mBoogingNumber = Convert.ToString(dr["BoogingNumber"].ToString());
                        lstCVarST_PreGateIn.Add(ObjCVarST_PreGateIn);
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
            lstCVarST_PreGateIn.Clear();

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
                Com.CommandText = "[dbo].GetListPagingST_PreGateIn";
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
                        CVarST_PreGateIn ObjCVarST_PreGateIn = new CVarST_PreGateIn();
                        ObjCVarST_PreGateIn.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_PreGateIn.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarST_PreGateIn.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarST_PreGateIn.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarST_PreGateIn.mTruckingOrderNumber = Convert.ToString(dr["TruckingOrderNumber"].ToString());
                        ObjCVarST_PreGateIn.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarST_PreGateIn.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarST_PreGateIn.mBoogingNumber = Convert.ToString(dr["BoogingNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarST_PreGateIn.Add(ObjCVarST_PreGateIn);
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
                    Com.CommandText = "[dbo].DeleteListST_PreGateIn";
                else
                    Com.CommandText = "[dbo].UpdateListST_PreGateIn";
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
        public Exception DeleteItem(List<CPKST_PreGateIn> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemST_PreGateIn";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKST_PreGateIn ObjCPKST_PreGateIn in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKST_PreGateIn.ID);
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
        public Exception SaveMethod(List<CVarST_PreGateIn> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EntryDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TruckingOrderNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@BoogingNumber", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarST_PreGateIn ObjCVarST_PreGateIn in SaveList)
                {
                    if (ObjCVarST_PreGateIn.mIsChanges == true)
                    {
                        if (ObjCVarST_PreGateIn.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemST_PreGateIn";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarST_PreGateIn.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemST_PreGateIn";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarST_PreGateIn.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarST_PreGateIn.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarST_PreGateIn.OperationID;
                        Com.Parameters["@CustomerID"].Value = ObjCVarST_PreGateIn.CustomerID;
                        Com.Parameters["@EntryDate"].Value = ObjCVarST_PreGateIn.EntryDate;
                        Com.Parameters["@TruckingOrderNumber"].Value = ObjCVarST_PreGateIn.TruckingOrderNumber;
                        Com.Parameters["@Notes"].Value = ObjCVarST_PreGateIn.Notes;
                        Com.Parameters["@IsApproved"].Value = ObjCVarST_PreGateIn.IsApproved;
                        Com.Parameters["@BoogingNumber"].Value = ObjCVarST_PreGateIn.BoogingNumber;
                        EndTrans(Com, Con);
                        if (ObjCVarST_PreGateIn.ID == 0)
                        {
                            ObjCVarST_PreGateIn.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarST_PreGateIn.mIsChanges = false;
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
